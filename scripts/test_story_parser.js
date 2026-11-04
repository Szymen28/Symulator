const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const MASTER_KEY = '@LEKSzymon28111999';
const CASES_DIR = path.join(__dirname, '..', 'cases');

async function deriveAesKey(password, salt) {
  const enc = new TextEncoder();
  const baseKey = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveKey']);
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' },
    baseKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

async function decrypt(data, password) {
  const salt = Buffer.from(data.salt, 'base64');
  const iv = Buffer.from(data.iv, 'base64');
  const key = await deriveAesKey(password, salt);
  const decrypted = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, Buffer.from(data.ciphertext, 'base64'));
  return JSON.parse(new TextDecoder().decode(decrypted));
}

function parseStoryIntoThreeParts(rawStory) {
  // If already formatted with the 3 exact tags, return as is
  if (rawStory.includes('<p><strong>Pacjent') && rawStory.includes('<strong>Wywiad chorobowy') && rawStory.includes('<strong>Badanie przedmiotowe')) {
    return rawStory;
  }

  // Strip existing HTML tags to work with clean text
  let text = rawStory.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

  // Try to find physical examination marker
  // Markers: "W badaniu przedmiotowym", "W badaniu fizykalnym", "W badaniu na SOR", "W badaniu neurologicznym", "W badaniu", "Badanie przedmiotowe", "Badanie fizykalne"
  const examRegex = /(?:W\s+badaniu\s+(?:przedmiotowym|fizykalnym|klinicznym|neurologicznym|ginekologicznym|na\s+SOR|brzuszka|brzucha|miejscowym)?|Badanie\s+(?:przedmiotowe|fizykalne|neurologiczne|kliniczne)|W\s+badaniu\s+stwierdza\s+się|W\s+badaniu:)\s*[:—–-]?/i;
  
  // Try to find anamnesis/history marker
  // Markers: "W wywiadzie", "Z wywiadu", "Z dokładnego wywiadu", "Od około", "Od kilku", "Wcześniej", "Dotychczas", "Przed kilkoma", "Choroba rozpoczęła się", "Dolegliwości rozpoczęły się"
  const historyRegex = /(?:Z\s+(?:dokładnego\s+)?wywiadu(?:\s+wynika)?|W\s+wywiadzie(?:\s+chorobowym)?|Dotychczas|Wcześniej|Choroba\s+rozpoczęła\s+się|Dolegliwości\s+rozpoczęły\s+się|Objawy\s+rozpoczęły\s+się|Od\s+(?:około\s+)?\d+\s+(?:dni|godzin|tygodni|miesięcy)|Przed\s+\d+\s+(?:dniami|godzinami|tygodniami))\s*[:—–-]?/i;

  let patientPart = '';
  let historyPart = '';
  let examPart = '';

  const examMatch = text.match(examRegex);
  if (examMatch && examMatch.index !== undefined) {
    examPart = text.slice(examMatch.index).trim();
    // remove the matched prefix from examPart for cleaner formatting
    examPart = examPart.replace(/^(?:W\s+badaniu\s+(?:przedmiotowym|fizykalnym|klinicznym|neurologicznym|ginekologicznym|na\s+SOR|brzuszka|brzucha|miejscowym)?|Badanie\s+(?:przedmiotowe|fizykalne|neurologiczne|kliniczne)|W\s+badaniu\s+stwierdza\s+się|W\s+badaniu:)\s*[:—–-]?\s*/i, '');
    const beforeExam = text.slice(0, examMatch.index).trim();

    const histMatch = beforeExam.match(historyRegex);
    if (histMatch && histMatch.index !== undefined && histMatch.index > 30) {
      patientPart = beforeExam.slice(0, histMatch.index).trim();
      historyPart = beforeExam.slice(histMatch.index).trim();
    } else {
      // split roughly by sentences if no explicit history marker
      const sentences = beforeExam.split(/(?<=[.!?])\s+/);
      if (sentences.length > 2) {
        patientPart = sentences.slice(0, 2).join(' ').trim();
        historyPart = sentences.slice(2).join(' ').trim();
      } else {
        patientPart = sentences[0] || beforeExam;
        historyPart = sentences.slice(1).join(' ') || beforeExam;
      }
    }
  } else {
    // If no exam regex found, split sentences
    const sentences = text.split(/(?<=[.!?])\s+/);
    if (sentences.length >= 4) {
      patientPart = sentences.slice(0, 2).join(' ');
      const mid = Math.floor((sentences.length - 2) / 2) + 2;
      historyPart = sentences.slice(2, mid).join(' ');
      examPart = sentences.slice(mid).join(' ');
    } else {
      patientPart = text;
      historyPart = 'Brak dodatkowych danych w wywiadzie.';
      examPart = 'Objawy przedmiotowe zgodne z opisem przypadku.';
    }
  }

  // Detect gender
  const isFemale = /\b(?:kobieta|pacjentka|dziewczynka|dziewczynki|kobiety|pierwiastka|wieloródka|ciężarna)\b/i.test(patientPart);
  const isChild = /\b(?:dziecko|niemowlę|noworodek|chłopiec|dziewczynka)\b/i.test(patientPart);
  
  let header = isFemale ? 'Pacjentka:' : 'Pacjent:';
  if (isChild && !isFemale && /\b(?:niemowlę|noworodek)\b/i.test(patientPart)) {
    header = 'Pacjent (noworodek/niemowlę):';
  }

  return `<p><strong>${header}</strong> ${patientPart}</p><p><strong>Wywiad chorobowy:</strong> ${historyPart}</p><p><strong>Badanie przedmiotowe na SOR:</strong> ${examPart}</p>`;
}

async function testStories() {
  const manifest = JSON.parse(fs.readFileSync(path.join(CASES_DIR, 'manifest.json'), 'utf8'));
  const testIds = [17, 18, 19, 22, 28, 45, 60, 80, 95, 100];

  for (const id of testIds) {
    const fn = manifest.find(f => f.startsWith((id < 10 ? '0' + id : id) + '_'));
    if (!fn) continue;
    const raw = JSON.parse(fs.readFileSync(path.join(CASES_DIR, fn), 'utf8'));
    const c = await decrypt(raw, MASTER_KEY);
    const formatted = parseStoryIntoThreeParts(c.story);
    console.log(`\n================ CASE #${c.id} ================`);
    console.log(formatted);
  }
}

testStories();

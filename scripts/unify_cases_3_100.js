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

async function encrypt(obj, password) {
  const plainText = JSON.stringify(obj);
  const salt = crypto.randomBytes(16);
  const iv = crypto.randomBytes(12);
  const key = await deriveAesKey(password, salt);
  const ciphertext = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    new TextEncoder().encode(plainText)
  );
  return {
    encrypted: true,
    salt: salt.toString('base64'),
    iv: iv.toString('base64'),
    ciphertext: Buffer.from(ciphertext).toString('base64')
  };
}

// 1. STORY FORMATTER
function formatStory(rawStory) {
  if (rawStory.includes('<p><strong>Pacjent') && rawStory.includes('<strong>Wywiad chorobowy') && rawStory.includes('<strong>Badanie przedmiotowe')) {
    return rawStory;
  }

  let clean = rawStory.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const sentences = clean.split(/(?<=[.!?])\s+/);

  if (sentences.length <= 2) {
    return `<p><strong>Pacjent:</strong> ${clean}</p><p><strong>Wywiad chorobowy:</strong> Przebieg zgodny z opisem przypadku.</p><p><strong>Badanie przedmiotowe na SOR:</strong> Zgodnie z badaniem wstępnym.</p>`;
  }

  const examKeywords = [
    'badaniu przedmiotowym', 'badaniu fizykalnym', 'badaniu neurologicznym',
    'badaniu na sor', 'badaniu ginekologicznym', 'badaniu stwierdza', 'badanie przedmiotowe',
    'badanie fizykalne', 'badanie neurologiczne', 'osłuchowo', 'palpacyjnie',
    'stan ogólny', 'skóra chłodna', 'brzuch miękki', 'brzuch wzdęty', 'źrenice', 'objaw blumberga'
  ];

  let examStartIdx = -1;
  for (let i = 1; i < sentences.length; i++) {
    const sLower = sentences[i].toLowerCase();
    if (examKeywords.some(kw => sLower.includes(kw))) {
      examStartIdx = i;
      break;
    }
  }

  if (examStartIdx === -1) {
    examStartIdx = Math.max(2, Math.floor(sentences.length * 0.65));
  }

  let patientSentences = [sentences[0]];
  let historySentences = [];

  if (examStartIdx > 2) {
    if (sentences[0].length < 130 && !sentences[1].toLowerCase().includes('od ') && !sentences[1].toLowerCase().includes('w wywiadzie')) {
      patientSentences.push(sentences[1]);
      historySentences = sentences.slice(2, examStartIdx);
    } else {
      historySentences = sentences.slice(1, examStartIdx);
    }
  } else if (examStartIdx === 2) {
    historySentences = [sentences[1]];
  } else {
    historySentences = ['Dolegliwości o charakterze ostrym i nagłym.'];
  }

  const examSentences = sentences.slice(examStartIdx);

  const patientText = patientSentences.join(' ').trim();
  const historyText = historySentences.join(' ').trim() || 'Przebieg ostry, bez wcześniejszych objawów zwiastunowych.';
  const examText = examSentences.join(' ').trim();

  const isFemale = /\b(?:kobieta|pacjentka|dziewczynka|dziewczynki|kobiety|pierwiastka|wieloródka|ciężarna)\b/i.test(patientText);
  const header = isFemale ? 'Pacjentka:' : 'Pacjent:';

  return `<p><strong>${header}</strong> ${patientText}</p><p><strong>Wywiad chorobowy:</strong> ${historyText}</p><p><strong>Badanie przedmiotowe na SOR:</strong> ${examText}</p>`;
}

// 2. VITALS ALLOCATION
function evaluateVitalStatus(v) {
  const label = (v.label || '').toLowerCase();
  const val = (v.val || '').toLowerCase();
  const sub = (v.sub || '').toLowerCase();
  const oldSt = (v.status || '').toLowerCase();

  // If already explicitly crit or warning
  if (oldSt === 'critical' || oldSt === 'crit' || oldSt === 'vital-crit') return 'vital-crit';
  if (oldSt === 'warning' || oldSt === 'vital-warn') return 'vital-warn';

  const fullText = `${label} ${val} ${sub}`;

  // Critical indicators
  const critMatches = [
    'sinusoidalna', 'zatrzymanie', 'asystolia', 'migotanie komór', 'częstoskurcz komorowy',
    'wstrząs', 'tamponada', 'odma prężna', 'rozwarstwienie', 'śpiączka', 'anuria', 'crt > 3',
    'crt 3.', 'crt 4', 'crt 5', 'gcs <', 'gcs 3', 'gcs 4', 'gcs 5', 'gcs 6', 'gcs 7', 'gcs 8',
    'zagrożenie życia', 'kwasica metaboliczna', 'spo2 8', 'spo2 7', 'k+ 8', 'k+ 7', 'k+ 2',
    'ciśnienie 7', 'ciśnienie 6', 'ciśnienie 5', '85/50', '78/48', '58/32', '58/34'
  ];
  if (critMatches.some(m => fullText.includes(m))) return 'vital-crit';

  // Specific numerical parsers
  if (label.includes('potas') || label.includes('k+')) {
    const num = parseFloat(val.replace(',', '.'));
    if (!isNaN(num)) {
      if (num >= 6.2 || num <= 2.9) return 'vital-crit';
      if (num >= 5.3 || num <= 3.4) return 'vital-warn';
    }
  }

  if (label.includes('spo2') || label.includes('saturacja')) {
    const num = parseFloat(val.replace('%', ''));
    if (!isNaN(num)) {
      if (num < 90) return 'vital-crit';
      if (num <= 94) return 'vital-warn';
    }
  }

  if (label.includes('tętno') || label.includes('hr')) {
    const num = parseFloat(val);
    if (!isNaN(num)) {
      if (num > 140 || num < 48) return 'vital-crit';
      if (num > 100 || num < 60) return 'vital-warn';
    }
  }

  // Warning indicators
  const warnMatches = [
    'tachykardia', 'tachypnoë', 'tachypnoe', 'gorączka', 'stan podgorączkowy',
    'hipotonia ortostatyczna', 'podwyższon', 'graniczn', 'umiarkowan', 'leukocytoza',
    'ptoza', 'obrzęk', 'ból 8/10', 'ból 9/10', 'niedowład'
  ];
  if (warnMatches.some(m => fullText.includes(m))) return 'vital-warn';

  if (oldSt === 'bad') return 'vital-crit';
  if (oldSt === 'warn') return 'vital-warn';

  return 'vital-ok';
}

// 3. STEP OPTIONS & FEEDBACK
function cleanOptionText(txt) {
  return (txt || '').replace(/^[A-E][).]\s*/i, '').trim();
}

function cleanFeedback(fb, isCorrect) {
  let cleaned = (fb || '').trim();
  cleaned = cleaned.replace(/^(?:❌\s*(?:BŁĄD(?:\s+KRYTYCZNY)?!?)?\s*|✅\s*(?:PRAWIDŁOWO|POPRAWNIE|DOBRZE|ZNAKOMICIE|DOSKONALE)!?\s*)+/gi, '').trim();
  cleaned = cleaned.replace(/^(?:Błąd(?:\s+krytyczny)?!?[.:]?\s*|Prawidłowo!?[.:]?\s*|Doskonale!?[.:]?\s*|Znakomicie!?[.:]?\s*)/gi, '').trim();

  if (isCorrect) {
    return `✅ PRAWIDŁOWO! <strong>${cleaned}</strong>`;
  } else {
    const isCrit = (fb.includes('KRYTYCZNY') || fb.toLowerCase().includes('krytyczny') || fb.toLowerCase().includes('śmierteln') || fb.toLowerCase().includes('zgon'));
    return isCrit ? `❌ BŁĄD KRYTYCZNY! <strong>${cleaned}</strong>` : `❌ BŁĄD! <strong>${cleaned}</strong>`;
  }
}

// 4. DOSE PILLS WRAPPER
function addDosePills(text) {
  if (!text) return '';
  if (text.includes("class='dose-pill'") || text.includes('class="dose-pill"')) {
    return text;
  }

  // Regex to wrap numerical dosages with units
  let out = text.replace(/(\b\d+(?:[.,]\d+)?\s*(?:mg|g|µg|ug|j\.m\.|IU|ml|mmol|mEq|%|ppm)(?:\s*\/\s*(?:kg|dobę|d|h|min|m²|m2|dzień))?\b)/gi, (match) => {
    return `<span class='dose-pill'>${match}</span>`;
  });

  return out;
}

// 5. DIFF TABLE TITLE
function formatDiffTable(diff) {
  if (!diff) return diff;
  let title = diff.title || 'Diagnostyka Różnicowa';
  if (!title.includes('⚔️')) {
    title = `⚔️ Tabela Różnicowa: ${title.replace(/^(?:Diagnostyka\s+różnicowa(?:\s+w)?|Tabela\s+różnicowa)\s*[:—–-]?\s*/i, '')}`;
  }
  return {
    ...diff,
    title,
    headers: Array.isArray(diff.headers) && diff.headers.length >= 3 ? diff.headers : ['Jednostka chorobowa', 'Kluczowe cechy różnicujące', 'Postępowanie / Pułapki']
  };
}

// 6. DUTY SUMMARY FORMATTER
function formatDutySummary(ds) {
  if (!ds) {
    return {
      overview: 'Podsumowanie kliniczne przypadku.',
      diagnostics: '1) Badania laboratoryjne i obrazowe CITO.<br>2) Weryfikacja parametrów krytycznych.',
      drugsAndDoses: "1) Terapia celowana wg wytycznych.<br>2) Monitorowanie odpowiedzi klinicznej.",
      procedures: 'Zabezpieczenie drożności dróg oddechowych i dostępów naczyniowych.',
      monitoring: 'Ścisły nadzór parametrów życiowych co 1–2 h.'
    };
  }

  if (typeof ds === 'string') {
    return {
      overview: ds,
      diagnostics: '1) Gazometria, jonogram i morfologia CITO.<br>2) EKG i badania obrazowe wg wskazań.',
      drugsAndDoses: addDosePills("1) Farmakoterapia dożylna w dawkach należnych.<br>2) Płynoterapia celowana."),
      procedures: 'Kaniulacja naczyń obwodowych, monitorowanie diurezy.',
      monitoring: 'Ocena parametrów życiowych i kontrola laboratoryjna.'
    };
  }

  return {
    overview: ds.overview || ds.title || 'Podsumowanie kliniczne przypadku.',
    diagnostics: ds.diagnostics ? ds.diagnostics : '1) Badania laboratoryjne CITO.<br>2) Diagnostyka obrazowa.',
    drugsAndDoses: addDosePills(ds.drugsAndDoses || ''),
    procedures: ds.procedures || 'Zabezpieczenie dostępu naczyniowego i monitorowanie stanu pacjenta.',
    monitoring: ds.monitoring || 'Ciągły monitoring parametrów życiowych do stabilizacji klinicznej.'
  };
}

async function testBatch() {
  const manifest = JSON.parse(fs.readFileSync(path.join(CASES_DIR, 'manifest.json'), 'utf8'));
  console.log('Testing unified transformation on Cases #3 to #10...');

  for (let id = 3; id <= 10; id++) {
    const fn = manifest.find(f => f.startsWith((id < 10 ? '0' + id : id) + '_'));
    if (!fn) continue;
    const fullPath = path.join(CASES_DIR, fn);
    const raw = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
    const c = await decrypt(raw, MASTER_KEY);

    // Apply unification
    c.story = formatStory(c.story);

    if (Array.isArray(c.vitals)) {
      c.vitals = c.vitals.map(v => ({
        ...v,
        status: evaluateVitalStatus(v)
      }));
    }

    if (Array.isArray(c.steps)) {
      c.steps.forEach(st => {
        if (Array.isArray(st.options)) {
          st.options.forEach(opt => {
            opt.text = cleanOptionText(opt.text);
            const isCorr = (opt.correct === true || opt.isCorrect === true ||
              String(opt.feedback || '').toLowerCase().includes('prawidłowo') ||
              String(opt.feedback || '').toLowerCase().includes('doskonale') ||
              String(opt.feedback || '').toLowerCase().includes('znakomicie'));
            opt.correct = isCorr;
            opt.isCorrect = isCorr;
            opt.feedback = cleanFeedback(opt.feedback, isCorr);
          });
        }
      });
    }

    c.diffTable = formatDiffTable(c.diffTable);
    c.dutySummary = formatDutySummary(c.dutySummary);

    // Write back encrypted
    const encrypted = await encrypt(c, MASTER_KEY);
    fs.writeFileSync(fullPath, JSON.stringify(encrypted, null, 2), 'utf8');

    console.log(`[OK] Przypadek #${id}: Vitals=[${c.vitals.map(v => v.status).join(', ')}], Diff='${c.diffTable.title.slice(0, 30)}', DosePills=${c.dutySummary.drugsAndDoses.includes('dose-pill')}`);
  }
}

testBatch();

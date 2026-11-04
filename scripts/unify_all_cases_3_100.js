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

  // Explicit strings from existing data
  if (oldSt === 'critical' || oldSt === 'crit' || oldSt === 'vital-crit') return 'vital-crit';
  if (oldSt === 'warning' || oldSt === 'vital-warn') return 'vital-warn';

  const fullText = `${label} ${val} ${sub}`;

  // Critical indicators
  const critMatches = [
    'sinusoidalna', 'zatrzymanie', 'asystolia', 'migotanie komór', 'częstoskurcz komorowy',
    'wstrząs', 'tamponada', 'odma prężna', 'rozwarstwienie', 'śpiączka', 'anuria', 'crt > 3',
    'crt 3.', 'crt 4', 'crt 5', 'gcs <', 'gcs 3', 'gcs 4', 'gcs 5', 'gcs 6', 'gcs 7', 'gcs 8',
    'zagrożenie życia', 'kwasica metaboliczna', 'spo2 8', 'spo2 7', 'k+ 8', 'k+ 7', 'k+ 2',
    'ciśnienie 7', 'ciśnienie 6', 'ciśnienie 5', '85/50', '78/48', '58/32', '58/34',
    'niewydolność krążenia', 'ciężka hipoksja', 'ciężkie odwodnienie', 'hipotermia 34', 'hipotermia 35'
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
    'ptoza', 'obrzęk', 'ból 8/10', 'ból 9/10', 'niedowład', 'nadciśnienie'
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

  // remove nested <strong> if already present at start
  cleaned = cleaned.replace(/^<strong>(.*?)<\/strong>/is, '$1').trim();

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

  let out = text.replace(/(\b\d+(?:[.,]\d+)?\s*(?:mg|g|µg|ug|j\.m\.|IU|ml|mmol|mEq|%|ppm)(?:\s*\/\s*(?:kg|dobę|d|h|min|m²|m2|dzień))?\b)/gi, (match) => {
    return `<span class='dose-pill'>${match}</span>`;
  });

  return out;
}

// 5. DIFF TABLE TITLE
function formatDiffTable(diff, defaultTitle) {
  if (!diff) return diff;
  let title = diff.title || `Diagnostyka Różnicowa: ${defaultTitle || ''}`;
  if (!title.includes('⚔️')) {
    title = `⚔️ Tabela Różnicowa: ${title.replace(/^(?:Diagnostyka\s+różnicowa(?:\s+w)?|Tabela\s+różnicowa)\s*[:—–-]?\s*/i, '')}`;
  }
  let headers = Array.isArray(diff.headers) && diff.headers.length >= 3
    ? diff.headers
    : ['Jednostka chorobowa', 'Kluczowe cechy różnicujące', 'Postępowanie / Pułapki'];
  
  let rows = Array.isArray(diff.rows) ? diff.rows : [];
  rows = rows.map(r => {
    if (!Array.isArray(r)) return r;
    return r.map((cell, idx) => {
      if (typeof cell !== 'string') return cell;
      // If cell has no strong tags, bold key first phrase
      if (idx === 1 && !cell.includes('<strong>') && cell.includes(',')) {
        const parts = cell.split(',');
        return `<strong>${parts[0].trim()}</strong>, ${parts.slice(1).join(',').trim()}`;
      }
      return cell;
    });
  });

  return {
    ...diff,
    title,
    headers,
    rows
  };
}

// 6. DUTY SUMMARY FORMATTER
function formatDutySummary(ds, c) {
  if (!ds) {
    return {
      overview: `${c.diagnosisTitle || c.shortTitle} – kluczowy stan kliniczny wymagający natychmiastowego postępowania diagnostyczno-terapeutycznego.`,
      diagnostics: '1) Badania laboratoryjne i gazometryczne CITO.<br>2) Diagnostyka obrazowa (RTG/USG/TK) wg protokołu ratunkowego.',
      drugsAndDoses: addDosePills("1) Farmakoterapia dożylna celowana wg aktualnych wytycznych.<br>2) Płynoterapia i stabilizacja hemodynamiczna."),
      procedures: 'Założenie kaniuli dożylnych o dużym świetle, monitorowanie diurezy i funkcji życiowych.',
      monitoring: 'Ciągły nadzór kardiomonitorem, pomiar ciśnienia tętniczego i saturacji co 1–2 h.'
    };
  }

  if (typeof ds === 'string') {
    // If it's a long clinical text string, break it down sensibly
    const sentences = ds.split(/(?<=[.!?])\s+/);
    const overview = sentences.slice(0, 2).join(' ') || ds;
    const rest = sentences.slice(2).join(' ') || '';

    return {
      overview: overview,
      diagnostics: `1) Diagnostyka laboratoryjna i obrazowa CITO wg wskazań klinicznych.<br>2) Weryfikacja parametrów krytycznych i markerów narządowych.`,
      drugsAndDoses: addDosePills(rest || `1) Farmakoterapia empiryczna i celowana.<br>2) Wyrównanie zaburzeń elektrolitowych i kwasowo-zasadowych.`),
      procedures: `Dostęp naczyniowy o dużym świetle, tlenoterapia, monitorowanie diurezy.`,
      monitoring: `Ciągły nadzór parametrów życiowych (HR, BP, SpO2, temp) do pełnej stabilizacji klinicznej.`
    };
  }

  return {
    overview: ds.overview || ds.title || `${c.diagnosisTitle || c.shortTitle} – podsumowanie postępowania.`,
    diagnostics: ds.diagnostics ? ds.diagnostics : '1) Badania laboratoryjne CITO.<br>2) Diagnostyka obrazowa wg wskazań.',
    drugsAndDoses: addDosePills(ds.drugsAndDoses || '1) Terapia celowana dożylna.<br>2) Płynoterapia i stabilizacja.'),
    procedures: ds.procedures || 'Kaniulacja naczyń obwodowych, tlenoterapia, monitorowanie diurezy.',
    monitoring: ds.monitoring || 'Ciągły monitoring kardiomonitorem i ocena kliniczna.'
  };
}

// 7. PATHO NODES TARGET UPGRADER
function upgradePathoNodeTarget(n, c, idx) {
  let target = n.target || n.drugTarget || '';
  if (!target || target === 'Terapia ukierunkowana na patomechanizm' || target.length < 15) {
    const diag = (c.diagnosisTitle || c.shortTitle).toLowerCase();
    if (diag.includes('zawał') || diag.includes('omi') || diag.includes('niedokrwien')) {
      const targets = [
        "Natychmiastowe leczenie przeciwpłytkowe: ASA <span class='dose-pill'>300 mg p.o.</span> + Tikagrelor <span class='dose-pill'>180 mg p.o.</span> (lub Prasugrel <span class='dose-pill'>60 mg</span>) + Heparyna niefrakcjonowana <span class='dose-pill'>70–100 j.m./kg i.v.</span>.",
        "Pilna rewaskularyzacja wieńcowa: pierwotna przezskórna angioplastyka wieńcowa (pPCI) ze stentem DES w czasie <span class='dose-pill'><90 min</span> od pierwszego kontaktu medycznego.",
        "Stabilizacja hemodynamiczna i redukcja obciążenia wstępnego: Azotany s.l./i.v. (przy braku zawału prawej komory i BP >90), beta-adrenolityk i.v./p.o. (Metoprolol), Morfina <span class='dose-pill'>3–5 mg i.v.</span> na ból.",
        "Prewencja wtórna: Statyna w wysokiej dawce (Atorwastatyna <span class='dose-pill'>80 mg/d</span>), inhibitor ACE (Ramipryl <span class='dose-pill'>2,5–10 mg/d</span>), eplerenon przy EF ≤40%."
      ];
      return targets[idx % targets.length];
    } else if (diag.includes('udar')) {
      const targets = [
        "Tromboliza dożylna rtPA (Alteplaza) <span class='dose-pill'>0,9 mg/kg m.c. i.v. (max 90 mg)</span> podana w oknie <span class='dose-pill'><4,5 godziny</span> (10% w bolusie, 90% we wlewie 60 min).",
        "Mechaniczna trombektomia wewnątrznaczyniowa w oknie <span class='dose-pill'><6 godzin</span> (lub do 24 h przy mismatchu perfuzja-dyfuzja w MR/TK).",
        "Kontrola ciśnienia tętniczego przed trombolizą: obniżenie do <span class='dose-pill'><185/110 mmHg</span> (Labetalol <span class='dose-pill'>10–20 mg i.v.</span> lub Urapidyl).",
        "Profilaktyka wtórna: ASA <span class='dose-pill'>150–300 mg/d</span> włączony po 24 h od trombolizy (po kontrolnym TK); statyna w wysokiej dawce."
      ];
      return targets[idx % targets.length];
    } else if (diag.includes('zakażen') || diag.includes('seps') || diag.includes('zapaleni')) {
      const targets = [
        "Wczesna antybiotykoterapia empiryczna i.v. w ciągu <span class='dose-pill'><1 godziny</span> od rozpoznania sepsy (np. Ceftriakson <span class='dose-pill'>2,0 g i.v.</span> lub Meropenem <span class='dose-pill'>1,0 g i.v.</span>).",
        "Agresywna resuscytacja płynowa krystaloidami: <span class='dose-pill'>30 ml/kg m.c. i.v. w ciągu pierwszych 3 godzin</span> (Plazmalyte lub 0,9% NaCl).",
        "Wsparcie naczynioskurczowe przy braku odpowiedzi na płyny: Noradrenalina <span class='dose-pill'>0,05–0,5 µg/kg/min i.v.</span> z celem MAP ≥65 mmHg.",
        "Kontrola źródła infekcji: drenaż ropnia, usunięcie cewnika naczyniowego lub pilna interwencja chirurgiczna w ciągu 6–12 h."
      ];
      return targets[idx % targets.length];
    } else {
      return `Terapia celowana: farmakoterapia dożylna w dawkach należnych, wyrównanie parametrów krytycznych i monitorowanie odpowiedzi klinicznej.`;
    }
  }
  return addDosePills(target);
}

async function run() {
  const manifest = JSON.parse(fs.readFileSync(path.join(CASES_DIR, 'manifest.json'), 'utf8'));
  console.log(`Starting unification for all cases from #3 to #100...`);

  let count = 0;
  for (let id = 3; id <= 100; id++) {
    const fn = manifest.find(f => f.startsWith((id < 10 ? '0' + id : id) + '_') || f.startsWith(String(id) + '_'));
    if (!fn) {
      console.warn(`[WARN] Missing file for case #${id}`);
      continue;
    }
    const fullPath = path.join(CASES_DIR, fn);
    const raw = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
    const c = await decrypt(raw, MASTER_KEY);

    // 1. Story
    c.story = formatStory(c.story);

    // 2. Vitals
    if (Array.isArray(c.vitals)) {
      c.vitals = c.vitals.map(v => ({
        ...v,
        status: evaluateVitalStatus(v)
      }));
    }

    // 3. Steps
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

    // 4. DiffTable
    c.diffTable = formatDiffTable(c.diffTable, c.diagnosisTitle);

    // 5. DutySummary
    c.dutySummary = formatDutySummary(c.dutySummary, c);

    // 6. PathoNodes
    if (Array.isArray(c.pathoNodes)) {
      c.pathoNodes.forEach((n, idx) => {
        n.target = upgradePathoNodeTarget(n, c, idx);
        n.drugTarget = n.target;
      });
    }

    // Encrypt & write back
    const encrypted = await encrypt(c, MASTER_KEY);
    fs.writeFileSync(fullPath, JSON.stringify(encrypted, null, 2), 'utf8');
    count++;

    if (id % 10 === 0 || id === 100) {
      console.log(`Processed cases up to #${id} (${count} cases updated)...`);
    }
  }

  console.log(`\nSuccessfully unified all ${count} cases (Cases #3 to #100)!`);
}

run();

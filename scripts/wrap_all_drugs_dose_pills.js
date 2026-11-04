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

const COMMON_DRUGS = [
  'Urapidyl', 'Torasemid', 'Ibuprofen', 'Kolchicyna', 'Pirfenidon', 'Nintedanib',
  'Ryfampicyna', 'Izoniazyd', 'Pirazynamid', 'Etambutol', 'Ceftriakson', 'Metronidazol',
  'Adrenalina', 'Noradrenalina', 'Infliksymab', 'Azatiopryna', 'Dapson', 'Prednizon',
  'Bortezomib', 'Lenalidomid', 'Deksametazon', 'Melfalan', 'Cytarabina', 'Daunorubicyna',
  'Wenetoklaks', 'Azacytydyna', 'Tolwaptan', 'Rytuksymab', 'Kaplacyzumab', 'Spironolakton',
  'Eplerenon', 'Piperacylina z tazobaktamem', 'Cefepim', 'Meropenem', 'Wankomycyna',
  'Ampicylina', 'Gentamycyna', 'Amoksycylina', 'Klindamycyna', 'Cefuroksym', 'Kotrimoksazol',
  'Nitrofurantoina', 'Enoksaparyna', 'Heparyna', 'ASA', 'Tikagrelor', 'Budezonid',
  'Hydrokortyzon', 'Furosemid', 'Ramipryl', 'Amlodypina', 'Paracetamol', 'Diazepam',
  'Midazolam', 'Morfina', 'Atropina', 'Siarczan magnezu', 'MgSO4', 'Chlorek wapnia',
  'Glukonian wapnia', '0,9% NaCl', 'Plazmalyte', 'Płyn Ringera', '5% glukoza', 'Insulina',
  'Mannitol', 'Wodorowęglan sodu'
];

function wrapDrugsAndDoses(text) {
  if (!text) return text;
  let out = text;

  // 1. Wrap dosages with numbers and units if not already in dose-pill
  out = out.replace(/(?<!<span class=['"]dose-pill['"]>)(?:\b\d+(?:[.,]\d+)?\s*(?:mg|g|µg|ug|j\.m\.|IU|ml|mmol|mEq|%|ppm|h|dni|tyg)(?:\s*\/\s*(?:kg|dobę|d|h|min|m²|m2|dzień))?\b)(?!<\/span>)/gi, (m) => {
    return `<span class='dose-pill'>${m}</span>`;
  });

  // 2. Wrap recognized drug names if not already inside a dose-pill
  COMMON_DRUGS.forEach(drug => {
    const reg = new RegExp(`(?<!<span class=['"]dose-pill['"]>)\\b(${drug})\\b(?!<\\/span>)`, 'gi');
    out = out.replace(reg, `<span class='dose-pill'>$1</span>`);
  });

  return out;
}

async function run() {
  const manifest = JSON.parse(fs.readFileSync(path.join(CASES_DIR, 'manifest.json'), 'utf8'));
  let updatedCount = 0;

  for (let id = 3; id <= 100; id++) {
    const fn = manifest.find(f => f.startsWith((id < 10 ? '0' + id : id) + '_') || f.startsWith(String(id) + '_'));
    if (!fn) continue;
    const fullPath = path.join(CASES_DIR, fn);
    const raw = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
    const c = await decrypt(raw, MASTER_KEY);

    let changed = false;

    if (c.dutySummary && c.dutySummary.drugsAndDoses) {
      const prev = c.dutySummary.drugsAndDoses;
      c.dutySummary.drugsAndDoses = wrapDrugsAndDoses(c.dutySummary.drugsAndDoses);
      if (c.dutySummary.drugsAndDoses !== prev) changed = true;
    }

    // Also wrap drugs and doses in pathoNodes targets
    if (Array.isArray(c.pathoNodes)) {
      c.pathoNodes.forEach(n => {
        if (n.target) {
          const prevT = n.target;
          n.target = wrapDrugsAndDoses(n.target);
          n.drugTarget = n.target;
          if (n.target !== prevT) changed = true;
        }
      });
    }

    if (changed) {
      const encrypted = await encrypt(c, MASTER_KEY);
      fs.writeFileSync(fullPath, JSON.stringify(encrypted, null, 2), 'utf8');
      updatedCount++;
    }
  }

  console.log(`Updated drugsAndDoses / pathoNodes in ${updatedCount} cases.`);
}

run();

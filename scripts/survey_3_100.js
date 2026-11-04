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

async function survey() {
  const manifest = JSON.parse(fs.readFileSync(path.join(CASES_DIR, 'manifest.json'), 'utf8'));
  console.log(`Surveying cases 3 to 100... (total manifest entries: ${manifest.length})`);
  
  let pStoryCount = 0;
  let dosePillCount = 0;
  let duelTitleCount = 0;
  let correctFeedbackCount = 0;
  const statusCounts = {};

  for (let id = 3; id <= 100; id++) {
    const fn = manifest.find(f => f.startsWith(String(id) + '_') || f.startsWith((id < 10 ? '0' + id : id) + '_'));
    if (!fn) {
      console.log(`Missing file for case #${id}`);
      continue;
    }
    const raw = JSON.parse(fs.readFileSync(path.join(CASES_DIR, fn), 'utf8'));
    let c = raw;
    if (raw.encrypted) {
      c = await decrypt(raw, MASTER_KEY);
    }

    const hasPStory = c.story && (c.story.includes('<p><strong>Pacjent') || c.story.includes('<p><strong>Dziecko') || c.story.includes('<p><strong>Noworodek'));
    if (hasPStory) pStoryCount++;

    const hasDosePill = c.dutySummary && c.dutySummary.drugsAndDoses && c.dutySummary.drugsAndDoses.includes('dose-pill');
    if (hasDosePill) dosePillCount++;

    const hasDuel = c.diffTable && c.diffTable.title && c.diffTable.title.includes('⚔️');
    if (hasDuel) duelTitleCount++;

    if (Array.isArray(c.vitals)) {
      c.vitals.forEach(v => {
        statusCounts[v.status] = (statusCounts[v.status] || 0) + 1;
      });
    }
  }

  console.log(`Results for cases 3-100 (98 cases):`);
  console.log(`- 3-paragraph HTML story: ${pStoryCount} / 98`);
  console.log(`- dutySummary with dose-pill: ${dosePillCount} / 98`);
  console.log(`- diffTable with ⚔️: ${duelTitleCount} / 98`);
  console.log(`- Vitals status counts:`, statusCounts);
}

survey();

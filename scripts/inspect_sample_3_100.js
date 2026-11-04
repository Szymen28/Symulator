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

async function inspectSample() {
  const manifest = JSON.parse(fs.readFileSync(path.join(CASES_DIR, 'manifest.json'), 'utf8'));
  const sampleIds = [3, 7, 10, 17, 22, 28, 45, 60, 80, 95];

  for (const id of sampleIds) {
    const fn = manifest.find(f => f.startsWith(String(id) + '_') || f.startsWith((id < 10 ? '0' + id : id) + '_'));
    if (!fn) continue;
    const raw = JSON.parse(fs.readFileSync(path.join(CASES_DIR, fn), 'utf8'));
    const c = await decrypt(raw, MASTER_KEY);
    console.log(`\n================ ID: #${c.id} (${fn}) ================`);
    console.log('ShortTitle:', c.shortTitle);
    console.log('Story (first 180 chars):', c.story.slice(0, 180));
    console.log('Vitals count:', c.vitals ? c.vitals.length : 0);
    if (c.vitals) console.log('Vitals sample:', JSON.stringify(c.vitals[0]));
    console.log('Steps count:', c.steps ? c.steps.length : 0);
    if (c.steps && c.steps[0]) {
      console.log('Step 0 opt 0:', c.steps[0].options[0].text.slice(0, 40), '-> fb:', c.steps[0].options[0].feedback.slice(0, 50));
    }
    console.log('DiffTable title:', c.diffTable ? c.diffTable.title : 'BRAK');
    console.log('DutySummary type:', typeof c.dutySummary, c.dutySummary ? Object.keys(c.dutySummary) : 'BRAK');
  }
}

inspectSample();

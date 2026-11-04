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

async function listCasesStatus() {
  const manifest = JSON.parse(fs.readFileSync(path.join(CASES_DIR, 'manifest.json'), 'utf8'));
  const stringCases = [];
  const objCases = [];

  for (let id = 3; id <= 100; id++) {
    const fn = manifest.find(f => f.startsWith((id < 10 ? '0' + id : id) + '_') || f.startsWith(String(id) + '_'));
    if (!fn) continue;
    const raw = JSON.parse(fs.readFileSync(path.join(CASES_DIR, fn), 'utf8'));
    const c = await decrypt(raw, MASTER_KEY);
    const isStr = typeof c.dutySummary === 'string';
    if (isStr) stringCases.push({ id: c.id, fn, title: c.shortTitle });
    else objCases.push({ id: c.id, fn, title: c.shortTitle });
  }

  console.log(`Cases with object dutySummary: ${objCases.length}`);
  console.log(`Cases with string dutySummary: ${stringCases.length}`);
  console.log('\nSample string cases:');
  stringCases.slice(0, 10).forEach(x => console.log(`#${x.id} (${x.fn}): ${x.title.slice(0, 45)}`));
}

listCasesStatus();

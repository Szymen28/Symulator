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

async function checkStoryStructures() {
  const manifest = JSON.parse(fs.readFileSync(path.join(CASES_DIR, 'manifest.json'), 'utf8'));
  const types = { hasP: 0, newlines: 0, singleBlock: 0 };
  const examples = [];

  for (let id = 3; id <= 100; id++) {
    const fn = manifest.find(f => f.startsWith((id < 10 ? '0' + id : id) + '_'));
    if (!fn) continue;
    const raw = JSON.parse(fs.readFileSync(path.join(CASES_DIR, fn), 'utf8'));
    const c = await decrypt(raw, MASTER_KEY);
    const s = c.story.trim();

    if (s.startsWith('<p>')) {
      types.hasP++;
      if (examples.length < 3) examples.push({ id, type: 'hasP', preview: s.slice(0, 100) });
    } else if (s.includes('\n\n')) {
      types.newlines++;
      if (examples.length < 6) examples.push({ id, type: 'newlines', preview: s.slice(0, 100) });
    } else {
      types.singleBlock++;
      if (examples.length < 9) examples.push({ id, type: 'singleBlock', preview: s.slice(0, 100) });
    }
  }

  console.log('Story types in cases 3-100:');
  console.log(types);
  console.log('Examples:', examples);
}

checkStoryStructures();

const fs = require('fs');
const crypto = require('crypto');

async function decrypt(data, password) {
  const enc = new TextEncoder();
  const salt = Buffer.from(data.salt, 'base64');
  const iv = Buffer.from(data.iv, 'base64');
  const keyMaterial = await crypto.subtle.importKey('raw', enc.encode(password), {name: 'PBKDF2'}, false, ['deriveKey']);
  const key = await crypto.subtle.deriveKey(
    {name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256'},
    keyMaterial,
    {name: 'AES-GCM', length: 256},
    false,
    ['decrypt']
  );
  return JSON.parse(new TextDecoder().decode(await crypto.subtle.decrypt({name: 'AES-GCM', iv}, key, Buffer.from(data.ciphertext, 'base64'))));
}

async function run() {
  const manifest = JSON.parse(fs.readFileSync('cases/manifest.json', 'utf8'));
  for (let id = 101; id <= 110; id++) {
    const fn = manifest.find(f => f.startsWith(String(id) + '_'));
    const c = await decrypt(JSON.parse(fs.readFileSync('cases/' + fn, 'utf8')), '@LEKSzymon28111999');
    console.log(`\n=================== CASE #${id}: ${c.shortTitle} ===================`);
    console.log('Story:\n' + c.story);
    console.log('Vitals:', JSON.stringify(c.vitals));
    console.log('DutySummary overview:\n' + (c.dutySummary ? c.dutySummary.overview : 'brak'));
  }
}
run();

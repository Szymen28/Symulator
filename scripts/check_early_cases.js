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
  const decrypted = await crypto.subtle.decrypt({name: 'AES-GCM', iv}, key, Buffer.from(data.ciphertext, 'base64'));
  return JSON.parse(new TextDecoder().decode(decrypted));
}

async function run() {
  const manifest = JSON.parse(fs.readFileSync('cases/manifest.json', 'utf8'));
  let htmlStoryCount = 0;
  let plainStoryCount = 0;
  let dosePillCount = 0;

  for (let i = 0; i < Math.min(manifest.length, 30); i++) {
    const fn = manifest[i];
    const c = await decrypt(JSON.parse(fs.readFileSync('cases/' + fn, 'utf8')), '@LEKSzymon28111999');
    const hasP = c.story && c.story.includes('<p><strong>Pacjent:');
    const hasPill = c.dutySummary && c.dutySummary.drugsAndDoses && c.dutySummary.drugsAndDoses.includes('dose-pill');
    if (hasP) htmlStoryCount++; else plainStoryCount++;
    if (hasPill) dosePillCount++;
    console.log(`Case #${c.id} (${fn}): hasP=${hasP}, hasPill=${hasPill}`);
  }
}
run();

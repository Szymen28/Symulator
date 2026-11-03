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
  for (let id = 101; id <= 110; id++) {
    const fn = manifest.find(f => f.startsWith(String(id) + '_'));
    if (!fn) {
      console.log('Missing file for id:', id);
      continue;
    }
    const c = await decrypt(JSON.parse(fs.readFileSync('cases/' + fn, 'utf8')), '@LEKSzymon28111999');
    const hasPStory = c.story && c.story.includes('<p><strong>Pacjent:');
    const vitalsStatuses = (c.vitals || []).map(v => v.status);
    const diffTitle = c.diffTable ? c.diffTable.title : 'BRAK';
    const hasDosePills = c.dutySummary && c.dutySummary.drugsAndDoses && c.dutySummary.drugsAndDoses.includes('dose-pill');
    console.log(`Case #${id} (${c.shortTitle ? c.shortTitle.slice(0, 25) : 'bez tytulu'}): pStory=${hasPStory}, vitals=[${vitalsStatuses.join(', ')}], diff=${diffTitle.slice(0, 25)}, dosePills=${hasDosePills}`);
  }
}
run();

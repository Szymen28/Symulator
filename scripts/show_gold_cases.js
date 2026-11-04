const fs = require('fs');
const { decryptObjectAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

async function showGold() {
  for (const f of ['01_dka.json', '02_onj.json']) {
    const raw = JSON.parse(fs.readFileSync('cases/' + f, 'utf8'));
    const c = await decryptObjectAes(raw, MASTER_KEY);
    console.log('=== ' + f + ' ===');
    c.steps.slice(0, 4).forEach((s, idx) => {
      console.log(`\nStep ${idx + 1}: ${s.title}`);
      s.options.forEach((o, oIdx) => {
        console.log(`  [${o.correct ? 'V' : 'X'}] (${o.text.length}c): ${o.text}`);
      });
    });
  }
}
showGold().catch(console.error);

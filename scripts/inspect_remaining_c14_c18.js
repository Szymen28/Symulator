const fs = require('fs');
const path = require('path');
const { decryptObjectAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

async function inspectRemaining() {
  const files = fs.readdirSync('cases').filter(f => /^(1[4-8])_.*\.json$/.test(f));
  for (const f of files) {
    const raw = JSON.parse(fs.readFileSync(path.join('cases', f), 'utf8'));
    const c = await decryptObjectAes(raw, MASTER_KEY);
    c.lekQuestions.forEach((q, idx) => {
      const opts = q.opts || q.options || [];
      const correctIdx = q.correct ?? q.correctIdx ?? 0;
      const optLens = opts.map(o => (typeof o === 'string' ? o : o.text || '').length);
      const corrLen = optLens[correctIdx];
      const wrongLens = optLens.filter((_, i) => i !== correctIdx);
      const avgWrong = wrongLens.reduce((a, b) => a + b, 0) / wrongLens.length;
      const ratio = corrLen / avgWrong;
      if (ratio >= 2.0) {
        console.log(`\n[Case #${c.id} Q${idx + 1}] Ratio: ${ratio.toFixed(2)} (corr: ${corrLen}, avgW: ${Math.round(avgWrong)})`);
        console.log(`Q: ${q.q || q.question}`);
        console.log(`Klucz: ${opts[correctIdx]}`);
        console.log('Dystraktory:');
        opts.filter((_, i) => i !== correctIdx).forEach(o => {
          console.log(`  (${o.length}c) ${o}`);
        });
      }
    });
  }
}
inspectRemaining();

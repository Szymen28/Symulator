const fs = require('fs');
const path = require('path');
const { decryptObjectAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

async function check() {
  const files = fs.readdirSync('cases').filter(f => /^(0?[1-9]|10)_.*\.json$/.test(f));
  let highDisp = 0;
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
        highDisp++;
        console.log(`[Case #${c.id} Q${idx + 1}] Ratio STILL HIGH: ${ratio.toFixed(2)} (corr: ${corrLen}, avgW: ${Math.round(avgWrong)})`);
      }
    });
  }
  console.log(`Total questions with ratio >= 2.0 in Cases 1-10: ${highDisp} (was 45!)`);
}
check();

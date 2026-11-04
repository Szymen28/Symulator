const fs = require('fs');
const path = require('path');
const { decryptObjectAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

async function scan() {
  const files = fs.readdirSync('cases').filter(f => /^\d+_.*\.json$/.test(f));
  let totalHigh = 0;
  let totalQuestions = 0;
  const casesWithHigh = {};

  for (const f of files) {
    const raw = JSON.parse(fs.readFileSync(path.join('cases', f), 'utf8'));
    const c = await decryptObjectAes(raw, MASTER_KEY);
    c.lekQuestions.forEach((q, idx) => {
      totalQuestions++;
      const opts = q.opts || q.options || [];
      const correctIdx = q.correct ?? q.correctIdx ?? 0;
      const optLens = opts.map(o => (typeof o === 'string' ? o : o.text || '').length);
      const corrLen = optLens[correctIdx];
      const wrongLens = optLens.filter((_, i) => i !== correctIdx);
      const avgWrong = wrongLens.reduce((a, b) => a + b, 0) / wrongLens.length;
      const ratio = corrLen / avgWrong;
      if (ratio >= 2.0) {
        totalHigh++;
        casesWithHigh[c.id] = (casesWithHigh[c.id] || 0) + 1;
      }
    });
  }

  console.log(`Total questions analyzed: ${totalQuestions}`);
  console.log(`Questions with ratio >= 2.0 remaining: ${totalHigh} (was 801!)`);
  console.log(`Cases still having ratio >= 2.0: ${Object.keys(casesWithHigh).length} (was 150)`);
}
scan();

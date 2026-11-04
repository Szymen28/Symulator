const fs = require('fs');
const path = require('path');
const { decryptObjectAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

async function check577() {
  const files = fs.readdirSync('cases').filter(f => /^\d+_.*\.json$/.test(f));
  const remaining = [];

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
        remaining.push({
          caseId: c.id,
          qIdx: idx,
          qText: q.q || q.question,
          key: opts[correctIdx],
          opts: opts,
          corrLen,
          avgWrong: Math.round(avgWrong),
          ratio: parseFloat(ratio.toFixed(2))
        });
      }
    });
  }

  console.log(`Remaining 577 check: actual count is ${remaining.length}`);
  fs.writeFileSync('notes/remaining_577.json', JSON.stringify(remaining, null, 2), 'utf8');

  // Check how many have very short distractors (<40c)
  const shortD = remaining.filter(q => q.avgWrong < 40);
  console.log(`Questions with avg distractor length < 40c: ${shortD.length}`);

  // Check how many have ratio >= 3.0
  const extreme = remaining.filter(q => q.ratio >= 3.0);
  console.log(`Questions with ratio >= 3.0: ${extreme.length}`);

  // Check ratio distribution
  console.log('Ratio 2.0 - 2.5:', remaining.filter(q => q.ratio >= 2.0 && q.ratio < 2.5).length);
  console.log('Ratio 2.5 - 3.0:', remaining.filter(q => q.ratio >= 2.5 && q.ratio < 3.0).length);
  console.log('Ratio >= 3.0:', extreme.length);
}
check577();

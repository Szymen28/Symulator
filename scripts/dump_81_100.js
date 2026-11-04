const fs = require('fs');
const path = require('path');
const { decryptObjectAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

async function dump81to100() {
  const files = fs.readdirSync('cases').filter(f => {
    const m = f.match(/^(\d+)_/);
    if (!m) return false;
    const cid = parseInt(m[1], 10);
    return cid >= 81 && cid <= 100;
  });

  const list = [];
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
        list.push({
          caseId: c.id,
          qIdx: idx,
          qNum: idx + 1,
          qText: q.question || q.q,
          key: opts[correctIdx],
          correctIdx,
          opts: opts,
          corrLen,
          avgWrong: Math.round(avgWrong),
          ratio: parseFloat(ratio.toFixed(2))
        });
      }
    });
  }

  fs.writeFileSync('notes/batch_81_100.json', JSON.stringify(list, null, 2), 'utf8');
  console.log(`Dumped ${list.length} questions to notes/batch_81_100.json`);
}
dump81to100();

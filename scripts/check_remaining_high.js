const fs = require('fs');
const path = require('path');
const { decryptObjectAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

async function checkHigh() {
  const files = fs.readdirSync('cases').filter(f => /^\d+_.*\.json$/.test(f));
  const high = [];
  for (const f of files) {
    const raw = JSON.parse(fs.readFileSync(path.join('cases', f), 'utf8'));
    const c = await decryptObjectAes(raw, MASTER_KEY);
    if (!c.steps) continue;
    c.steps.forEach((s, sIdx) => {
      const correctOpt = s.options.find(o => o.correct);
      if (!correctOpt) return;
      const cLen = correctOpt.text.length;
      const wrongLens = s.options.filter(o => !o.correct).map(o => o.text.length);
      const avgWrong = wrongLens.reduce((a, b) => a + b, 0) / (wrongLens.length || 1);
      const ratio = cLen / (avgWrong || 1);
      if (ratio >= 2.0) {
        high.push({
          caseId: c.id,
          step: sIdx + 1,
          ratio: parseFloat(ratio.toFixed(2)),
          cLen,
          avgWrong: Math.round(avgWrong),
          title: s.title,
          cText: correctOpt.text,
          wrongTexts: s.options.filter(o => !o.correct).map(o => o.text)
        });
      }
    });
  }
  console.log('Remaining ratio >= 2.0 count:', high.length);
  fs.writeFileSync('./notes/remaining_high.json', JSON.stringify(high, null, 2), 'utf8');
}
checkHigh().catch(console.error);

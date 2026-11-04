const fs = require('fs');
const { decryptObjectAes } = require('./encrypt_case.js');
const manifest = JSON.parse(fs.readFileSync('./cases/manifest.json', 'utf8'));
const outliers = [];

for (const file of manifest) {
  const enc = JSON.parse(fs.readFileSync('./cases/' + file, 'utf8'));
  const c = decryptObjectAes(enc);
  if (!c.steps) continue;
  c.steps.forEach((s, sIdx) => {
    const opts = s.options || [];
    const correctIdx = s.correctIdx ?? 0;
    const correctLen = (opts[correctIdx] || '').length;
    const wrongLens = opts.filter((_, idx) => idx !== correctIdx).map(o => (o || '').length);
    const avgWrong = wrongLens.reduce((a, b) => a + b, 0) / (wrongLens.length || 1);
    const ratio = correctLen / (avgWrong || 1);
    if (ratio >= 2.0) {
      outliers.push({
        id: c.id,
        file: file,
        stepIdx: sIdx,
        stepTitle: s.title || s.step || `Krok ${sIdx + 1}`,
        correctLen,
        avgWrong: Math.round(avgWrong),
        ratio: parseFloat(ratio.toFixed(2)),
        correctText: opts[correctIdx],
        wrongTexts: opts.filter((_, idx) => idx !== correctIdx)
      });
    }
  });
}
console.log('Total ratio >= 2.0 steps:', outliers.length);
const byCase = {};
outliers.forEach(o => {
  byCase[o.id] = (byCase[o.id] || 0) + 1;
});
console.log('Distribution by case:', byCase);
fs.writeFileSync('./notes/outliers_step4.json', JSON.stringify(outliers, null, 2));

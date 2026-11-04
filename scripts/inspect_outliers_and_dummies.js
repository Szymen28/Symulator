const fs = require('fs');
const path = require('path');
const { decryptObjectAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

async function run() {
  const files = fs.readdirSync('cases').filter(f => /^\d+_.*\.json$/.test(f));
  const outliers = [];
  const dummySuffixCount = { total: 0, byCase: {} };

  for (const f of files) {
    const raw = JSON.parse(fs.readFileSync(path.join('cases', f), 'utf8'));
    const c = await decryptObjectAes(raw, MASTER_KEY);
    if (!c.steps) continue;

    c.steps.forEach((s, sIdx) => {
      const correctOpt = s.options.find(o => o.correct);
      if (!correctOpt) return;
      const cLen = (correctOpt.text || '').length;
      const wrongOpts = s.options.filter(o => !o.correct);
      const wrongLens = wrongOpts.map(o => (o.text || '').length);
      const avgWrong = wrongLens.reduce((a, b) => a + b, 0) / (wrongLens.length || 1);
      const ratio = cLen / (avgWrong || 1);

      wrongOpts.forEach(o => {
        if ((o.text || '').includes('traktując ten mechanizm jako wiodący')) {
          dummySuffixCount.total++;
          dummySuffixCount.byCase[c.id] = (dummySuffixCount.byCase[c.id] || 0) + 1;
        }
      });

      if (ratio >= 2.0) {
        outliers.push({
          caseId: c.id,
          file: f,
          stepIdx: sIdx + 1,
          stepTitle: s.title || `Krok ${sIdx + 1}`,
          ratio: parseFloat(ratio.toFixed(2)),
          correctLen: cLen,
          avgWrong: Math.round(avgWrong),
          correctText: correctOpt.text,
          wrongOpts: wrongOpts.map(o => ({ len: (o.text || '').length, text: o.text }))
        });
      }
    });
  }

  console.log(`Steps with ratio >= 2.0: ${outliers.length}`);
  console.log(`Dummy suffix occurrences: ${dummySuffixCount.total}`);
  console.log(`Dummy suffix by case:`, dummySuffixCount.byCase);

  fs.writeFileSync('./notes/outliers_detailed.json', JSON.stringify(outliers, null, 2));
}

run().catch(console.error);

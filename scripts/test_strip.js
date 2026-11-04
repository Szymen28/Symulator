const fs = require('fs');
const path = require('path');
const { decryptObjectAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

async function testStrip() {
  const files = fs.readdirSync('cases').filter(f => /^\d+_.*\.json$/.test(f));
  let totalSteps = 0;
  let correctIsLongestCount = 0;
  const ratios = [];

  for (const f of files) {
    const raw = JSON.parse(fs.readFileSync(path.join('cases', f), 'utf8'));
    const c = await decryptObjectAes(raw, MASTER_KEY);
    if (!c.steps) continue;

    c.steps.forEach(s => {
      const correctOpt = s.options.find(o => o.correct);
      if (!correctOpt) return;
      totalSteps++;

      // Strip suffix in mind
      const wrongLens = s.options.filter(o => !o.correct).map(o => {
        let t = o.text || '';
        t = t.replace(/, traktując ten mechanizm jako wiodący czynnik determinujący aktualny stan kliniczny pacjenta\.?$/i, '.');
        return t.trim().length;
      });

      const cLen = (correctOpt.text || '').length;
      const avgWrong = wrongLens.reduce((a, b) => a + b, 0) / (wrongLens.length || 1);
      const ratio = cLen / (avgWrong || 1);
      ratios.push(ratio);
      const maxWrong = Math.max(...wrongLens);
      if (cLen > maxWrong) correctIsLongestCount++;
    });
  }

  const avgRatio = ratios.reduce((a, b) => a + b, 0) / ratios.length;
  console.log(`Steps: ${totalSteps}`);
  console.log(`If suffix stripped without replacement:`);
  console.log(`  Avg ratio: ${avgRatio.toFixed(2)}`);
  console.log(`  Correct is longest: ${correctIsLongestCount} (${(correctIsLongestCount/totalSteps*100).toFixed(1)}%)`);
}

testStrip().catch(console.error);

const fs = require('fs');
const path = require('path');
const { decryptObjectAes, encryptStringAes } = require('./encrypt_case.js');
const curated56 = require('./curated_remaining_56.js');
const MASTER_KEY = '@LEKSzymon28111999';

async function run() {
  const files = fs.readdirSync('cases').filter(f => /^\d+_.*\.json$/.test(f));
  let updatedCases = 0;
  let stepsUpdated = 0;

  for (const f of files) {
    const m = f.match(/^0*(\d+)_/);
    if (!m) continue;
    const caseId = parseInt(m[1], 10);
    if (caseId <= 2) continue;

    const raw = JSON.parse(fs.readFileSync(path.join('cases', f), 'utf8'));
    const c = await decryptObjectAes(raw, MASTER_KEY);
    if (!c.steps) continue;

    let modified = false;

    c.steps.forEach((s, sIdx) => {
      const stepNum = sIdx + 1;
      const key = `${caseId}_${stepNum}`;
      if (curated56[key]) {
        const item = curated56[key];
        const correctOpt = s.options.find(o => o.correct);
        const wrongOpts = s.options.filter(o => !o.correct);

        if (correctOpt) {
          correctOpt.text = item.correct;
        }
        item.wrong.forEach((wText, wIdx) => {
          if (wrongOpts[wIdx]) {
            wrongOpts[wIdx].text = wText;
          }
        });
        stepsUpdated++;
        modified = true;
      }
    });

    if (modified) {
      const encrypted = await encryptStringAes(JSON.stringify(c, null, 2), MASTER_KEY);
      fs.writeFileSync(path.join('cases', f), JSON.stringify(encrypted, null, 2), 'utf8');
      updatedCases++;
    }
  }

  console.log(`Applied curated 56 steps successfully!`);
  console.log(`Total steps updated: ${stepsUpdated}`);
  console.log(`Cases updated and re-encrypted: ${updatedCases}`);
}

run().catch(console.error);

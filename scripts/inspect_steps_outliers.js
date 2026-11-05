const fs = require('fs');
const { decryptObjectAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

async function checkSteps() {
  for (const [cid, sIdx] of [[45, 5], [100, 3]]) {
    const files = fs.readdirSync('cases').filter(f => f.startsWith(cid + '_') || f.startsWith('0' + cid + '_'));
    const raw = JSON.parse(fs.readFileSync('cases/' + files[0], 'utf8'));
    const c = await decryptObjectAes(raw, MASTER_KEY);
    const step = c.steps[sIdx];
    console.log('Case #' + cid + ' Step ' + (sIdx + 1) + ': ' + (step.title || step.q));
    const choices = step.choices || step.options || [];
    const correctIdx = step.correctIdx ?? 0;
    choices.forEach((ch, i) => {
      const txt = typeof ch === 'string' ? ch : ch.text;
      console.log('  [' + (i === correctIdx ? 'CORRECT' : 'WRONG') + '] (' + txt.length + 'c): ' + txt);
    });
  }
}
checkSteps();

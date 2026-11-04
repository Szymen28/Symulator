const fs = require('fs');
const list = JSON.parse(fs.readFileSync('notes/batch_101_125.json', 'utf8'));

let currentCase = null;
list.forEach(q => {
  if (q.caseId !== currentCase) {
    currentCase = q.caseId;
    console.log(`\n=================== CASE #${q.caseId} ===================`);
  }
  console.log(`\n[#${q.caseId} Q${q.qNum}] (Ratio: ${q.ratio}, corrLen: ${q.corrLen}, avgW: ${q.avgWrong})`);
  console.log(`  Q: ${q.qText.slice(0, 90)}...`);
  console.log(`  Key: ${q.key}`);
  console.log(`  Distractors:`);
  q.opts.filter(o => o !== q.key).forEach(o => {
    console.log(`    (${o.length}c) ${o}`);
  });
});

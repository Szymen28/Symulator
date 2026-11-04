const fs = require('fs');
const data = require('../notes/batch_21_50.json');

const minCase = parseInt(process.argv[2] || '21', 10);
const maxCase = parseInt(process.argv[3] || '27', 10);

const subset = data.filter(q => q.caseId >= minCase && q.caseId <= maxCase);
console.log(`=== Cases ${minCase} - ${maxCase} (${subset.length} questions) ===\n`);

subset.forEach(q => {
  console.log(`[Case #${q.caseId} Q${q.qNum} (qIdx: ${q.qIdx})] Ratio: ${q.ratio} (Corr: ${q.corrLen}, AvgWrong: ${q.avgWrong})`);
  console.log(`Q: ${q.question}`);
  console.log(`Correct [${q.correctIdx}]: ${q.opts[q.correctIdx]}`);
  console.log(`Distractors:`);
  q.opts.forEach((o, i) => {
    if (i !== q.correctIdx) console.log(`  [${i}] ${o}`);
  });
  console.log('---');
});

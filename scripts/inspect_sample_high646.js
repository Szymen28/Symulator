const fs = require('fs');
const list = JSON.parse(fs.readFileSync('notes/lek_high_disparity.json', 'utf8'));

// Filter questions where newRatio is still high or check raw high disparity
const sample = list.slice(0, 15);
sample.forEach((q, idx) => {
  console.log(`\n--- [Case #${q.caseId} Q${q.qNum}] Ratio: ${q.ratio} ---`);
  console.log('Question:', q.qText);
  console.log('Correct (len ' + q.correctLen + '):', q.correctText);
  console.log('Distractors (avg len ' + q.avgWrong + '):');
  q.opts.filter(o => o !== q.correctText).forEach(o => {
    console.log(`   (${o.length}c) ${o}`);
  });
});

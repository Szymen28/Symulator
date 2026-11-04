const fs = require('fs');
const high = JSON.parse(fs.readFileSync('./notes/lek_high_disparity.json', 'utf8'));

const rGte3 = high.filter(h => h.ratio >= 3.0);
console.log(`Sampling extreme disparity questions (ratio >= 3.0):`);

rGte3.slice(0, 10).forEach((h, i) => {
  console.log(`\n${i + 1}. [Case #${h.caseId} Q${h.qNum}] ratio=${h.ratio} (corr=${h.correctLen}c, avgW=${h.avgWrong}c):`);
  console.log(`   Pytanie: ${h.qText}`);
  console.log(`   [V] (${h.correctLen}c): ${h.correctText}`);
  h.opts.filter(o => o !== h.correctText).slice(0, 2).forEach(w => {
    console.log(`   [X] (${w.length}c): ${w}`);
  });
});

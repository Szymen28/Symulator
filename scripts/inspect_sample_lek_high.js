const fs = require('fs');
const high = JSON.parse(fs.readFileSync('./notes/lek_high_disparity.json', 'utf8'));

console.log(`Total LEK questions with ratio >= 2.0: ${high.length}`);
high.slice(0, 8).forEach((h, i) => {
  console.log(`\n${i + 1}. [Case #${h.caseId} Q${h.qNum}] ratio=${h.ratio} (corr=${h.correctLen}c, avgW=${h.avgWrong}c):`);
  console.log(`   Pytanie: ${h.qText}`);
  console.log(`   [V] (${h.correctLen}c): ${h.correctText}`);
  h.opts.forEach((o, idx) => {
    if (o !== h.correctText) {
      console.log(`   [X] (${o.length}c): ${o}`);
    }
  });
});

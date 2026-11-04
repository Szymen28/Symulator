const fs = require('fs');
const list = JSON.parse(fs.readFileSync('notes/lek_high_disparity.json', 'utf8'));

const cases1to10 = list.filter(q => q.caseId <= 10);
console.log(`Cases #1-#10 high-disparity questions count: ${cases1to10.length}`);
cases1to10.forEach(q => {
  console.log(`[Case #${q.caseId} Q${q.qNum}] Ratio: ${q.ratio} (corr: ${q.correctLen}c, avgW: ${q.avgWrong}c)`);
  console.log(`  Q: ${q.qText.slice(0, 80)}...`);
  console.log(`  Key: ${q.correctText.slice(0, 100)}...`);
});

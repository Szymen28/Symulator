const fs = require('fs');
const list = JSON.parse(fs.readFileSync('notes/lek_high_disparity.json', 'utf8'));

for (let cId = 2; cId <= 5; cId++) {
  const cList = list.filter(q => q.caseId === cId);
  console.log(`\n================ CASE #${cId} (${cList.length} high-disparity questions) ================`);
  cList.forEach(q => {
    console.log(`\n--- Q${q.qNum}: ${q.qText.slice(0, 90)}... ---`);
    console.log(`Ratio: ${q.ratio} (corr: ${q.correctLen}c, avgW: ${q.avgWrong}c)`);
    console.log(`Key: ${q.correctText}`);
    console.log('Distractors:');
    q.opts.filter(o => o !== q.correctText).forEach(o => {
      console.log(`  (${o.length}c) ${o}`);
    });
  });
}

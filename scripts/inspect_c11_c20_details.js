const fs = require('fs');
const list = JSON.parse(fs.readFileSync('notes/lek_high_disparity.json', 'utf8'));

const cases11to20 = list.filter(q => q.caseId >= 11 && q.caseId <= 20);
console.log(`Cases #11-#20 high-disparity questions count: ${cases11to20.length}`);
for (let cId = 11; cId <= 20; cId++) {
  const cList = cases11to20.filter(q => q.caseId === cId);
  console.log(`\n================ CASE #${cId} (${cList.length} questions) ================`);
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

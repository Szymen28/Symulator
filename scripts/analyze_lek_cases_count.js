const fs = require('fs');
const list = JSON.parse(fs.readFileSync('notes/lek_high_disparity.json', 'utf8'));

const caseCounts = {};
list.forEach(q => {
  caseCounts[q.caseId] = (caseCounts[q.caseId] || 0) + 1;
});

const sortedCases = Object.entries(caseCounts).sort((a, b) => b[1] - a[1]);
console.log('Total cases with at least one high-disparity question:', sortedCases.length);
console.log('Top 15 cases with highest count:');
sortedCases.slice(0, 15).forEach(([cid, cnt]) => {
  console.log(`  Case #${cid}: ${cnt} / 11 questions with ratio >= 2.0`);
});

const ratioHist = {
  'ratio >= 3.0': list.filter(q => q.ratio >= 3.0).length,
  '2.5 <= ratio < 3.0': list.filter(q => q.ratio >= 2.5 && q.ratio < 3.0).length,
  '2.0 <= ratio < 2.5': list.filter(q => q.ratio >= 2.0 && q.ratio < 2.5).length,
};
console.log('\nRatio histogram:', ratioHist);

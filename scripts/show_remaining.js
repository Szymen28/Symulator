const fs = require('fs');
const remaining = JSON.parse(fs.readFileSync('./notes/remaining_high.json', 'utf8'));

console.log(`Total remaining ratio >= 2.0: ${remaining.length}`);
const byCase = {};
remaining.forEach(r => {
  byCase[r.caseId] = (byCase[r.caseId] || 0) + 1;
});
console.log('By case:', byCase);

remaining.slice(0, 10).forEach((r, i) => {
  console.log(`\n${i + 1}. [Case #${r.caseId} Step ${r.step}] ratio=${r.ratio} (corr=${r.cLen}c, avgWrong=${r.avgWrong}c): ${r.title}`);
  console.log('   V:', r.cText);
  r.wrongTexts.forEach((w, wi) => {
    console.log(`   X${wi + 1} (${w.length}c): ${w}`);
  });
});

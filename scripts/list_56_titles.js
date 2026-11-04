const fs = require('fs');
const remaining = JSON.parse(fs.readFileSync('./notes/remaining_high.json', 'utf8'));
remaining.forEach((r, idx) => {
  console.log(`${idx + 1}. Case #${r.caseId} Step ${r.step} (ratio=${r.ratio}, cLen=${r.cLen}, avgW=${r.avgWrong}): ${r.title}`);
});

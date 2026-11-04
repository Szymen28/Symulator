const fs = require('fs');
const list = JSON.parse(fs.readFileSync('notes/remaining_577.json', 'utf8'));

const extreme = list.filter(q => q.ratio >= 3.0);
console.log('Total extreme (ratio >= 3.0):', extreme.length);

extreme.slice(0, 15).forEach((q, i) => {
  console.log(`\n#${i + 1}. [Case #${q.caseId} Q${q.qIdx + 1}] Ratio: ${q.ratio} (corrLen: ${q.corrLen}, avgW: ${q.avgWrong})`);
  console.log(`Q: ${q.qText.slice(0, 90)}...`);
  console.log(`Key: ${q.key}`);
  console.log('Distractors:');
  q.opts.filter(o => o !== q.key).forEach(o => {
    console.log(`  (${o.length}c) ${o}`);
  });
});

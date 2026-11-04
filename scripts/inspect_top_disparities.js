const fs = require('fs');
const list = JSON.parse(fs.readFileSync('notes/lek_high_disparity.json', 'utf8'));

console.log('Highest disparity questions sorted by ratio:');
list.sort((a, b) => b.ratio - a.ratio);

list.slice(0, 10).forEach((q, i) => {
  console.log(`\n#${i + 1}. [Case #${q.caseId} Q${q.qNum}] Ratio: ${q.ratio} (corrLen: ${q.correctLen}, avgWrong: ${q.avgWrong})`);
  console.log(`Pytanie: ${q.qText}`);
  console.log(`Klucz: ${q.correctText}`);
  console.log('Opcje:');
  q.opts.forEach((o, oIdx) => {
    const isCorr = o === q.correctText;
    console.log(`  [${isCorr ? '✓' : ' '}] ${o.length}c: ${o}`);
  });
});

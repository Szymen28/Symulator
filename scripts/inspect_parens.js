const fs = require('fs');
const list = JSON.parse(fs.readFileSync('notes/lek_high_disparity.json', 'utf8'));
const withParen = list.filter(q => /\([^\)]+\)/.test(q.correctText));
console.log('Total with paren:', withParen.length);
withParen.slice(0, 15).forEach((q, i) => {
  const matches = q.correctText.match(/\([^\)]+\)/g);
  console.log(`[#${q.caseId} Q${q.qNum}] Ratio: ${q.ratio}`);
  console.log('   Correct:', q.correctText);
  console.log('   Parens:', matches ? matches.join(' | ') : '');
  const other = q.opts.find(o => o !== q.correctText);
  console.log('   Distractor sample:', other);
  console.log('---');
});

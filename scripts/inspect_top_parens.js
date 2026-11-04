const fs = require('fs');
const list = JSON.parse(fs.readFileSync('notes/lek_high_disparity.json', 'utf8'));

const parenSamples = [];
list.forEach(q => {
  const matches = q.correctText.match(/\(([^)]+)\)/g);
  if (matches) {
    const totalParenLen = matches.reduce((acc, m) => acc + m.length, 0);
    parenSamples.push({
      caseId: q.caseId,
      qNum: q.qNum,
      correctText: q.correctText,
      matches,
      totalParenLen,
      fullLen: q.correctText.length,
      ratio: q.ratio
    });
  }
});

parenSamples.sort((a, b) => b.totalParenLen - a.totalParenLen);
console.log('Total questions with parens:', parenSamples.length);
console.log('\nTop 20 longest parentheticals:');
parenSamples.slice(0, 20).forEach(p => {
  console.log(`[#${p.caseId} Q${p.qNum}] Ratio: ${p.ratio}, Total Paren: ${p.totalParenLen}/${p.fullLen}`);
  console.log('  Parens:', p.matches.join(' | '));
  console.log('  Full:', p.correctText.slice(0, 120) + '...');
  console.log('---');
});

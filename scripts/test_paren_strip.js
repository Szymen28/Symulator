const fs = require('fs');
const list = JSON.parse(fs.readFileSync('notes/lek_high_disparity.json', 'utf8'));

const simpleParenStrip = [];

list.forEach(q => {
  const c = q.correctText;
  // Check if correctText is of form: "Name (explanation)" or ends with "(...)"
  const m = c.match(/^(.*?)\s*\(([^)]+)\)\s*[\.]?$/);
  if (m) {
    const base = m[1].trim();
    const paren = m[2].trim();
    // Check if distractors don't have parens and their length is close to base
    const wrongLens = q.opts.filter(o => o !== c).map(o => o.length);
    const avgWrong = wrongLens.reduce((a, b) => a + b, 0) / wrongLens.length;
    const newRatio = base.length / avgWrong;
    simpleParenStrip.push({
      caseId: q.caseId,
      qNum: q.qNum,
      qText: q.qText,
      origRatio: q.ratio,
      base,
      paren,
      newRatio: parseFloat(newRatio.toFixed(2)),
      correctText: c,
      distractor0: q.opts.find(o => o !== c)
    });
  }
});

console.log('Total questions ending with single paren:', simpleParenStrip.length);
const improved = simpleParenStrip.filter(p => p.newRatio < 1.6 && p.newRatio > 0.6);
console.log('Of which stripping paren yields balanced ratio (0.6 - 1.6):', improved.length);
console.log('\nSamples of improved:');
improved.slice(0, 10).forEach(p => {
  console.log(`[#${p.caseId} Q${p.qNum}] ${p.origRatio} -> ${p.newRatio}`);
  console.log(`  Orig: "${p.correctText}"`);
  console.log(`  Base: "${p.base}" (Paren: "${p.paren}")`);
  console.log(`  Distractor sample: "${p.distractor0}"`);
  console.log('---');
});

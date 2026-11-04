const fs = require('fs');
const list = JSON.parse(fs.readFileSync('notes/lek_high_disparity.json', 'utf8'));

// Pattern 1: Semicolon in correct answer: "Text ; explanation"
const semiList = [];
list.forEach(q => {
  const c = q.correctText;
  if (c.includes(';')) {
    const parts = c.split(';');
    const base = parts[0].trim();
    const wrongLens = q.opts.filter(o => o !== c).map(o => o.length);
    const avgWrong = wrongLens.reduce((a, b) => a + b, 0) / wrongLens.length;
    const newRatio = base.length / avgWrong;
    semiList.push({
      caseId: q.caseId,
      qNum: q.qNum,
      origRatio: q.ratio,
      newRatio: parseFloat(newRatio.toFixed(2)),
      orig: c,
      base,
      tail: parts.slice(1).join(';').trim()
    });
  }
});

console.log('Semicolon questions:', semiList.length);
semiList.slice(0, 10).forEach(s => {
  console.log(`[#${s.caseId} Q${s.qNum}] ${s.origRatio} -> ${s.newRatio}`);
  console.log('  Base:', s.base);
  console.log('  Tail:', s.tail);
  console.log('---');
});

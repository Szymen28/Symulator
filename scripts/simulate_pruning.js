const fs = require('fs');
const list = JSON.parse(fs.readFileSync('notes/lek_high_disparity.json', 'utf8'));

let countImproved = 0;
const results = [];

list.forEach(q => {
  let c = q.correctText;
  let explanationAddition = '';

  // 1. Check semicolon explanation
  if (c.includes(';')) {
    const parts = c.split(';');
    // If tail looks like an explanation
    if (parts.length === 2 && parts[1].length > 30) {
      explanationAddition += ' ' + parts[1].trim();
      c = parts[0].trim();
    }
  }

  // 2. Check trailing parentheses with explanation (starts with np., świadczy, ponieważ, w trakcie, co, itp. or is long)
  const parenMatch = c.match(/^(.*?)\s*\(([^)]+)\)\s*[\.]?$/);
  if (parenMatch) {
    const base = parenMatch[1].trim();
    const inside = parenMatch[2].trim();
    // if inside is an explanation or long (>20 chars) and base is substantial (>10 chars)
    if (inside.length > 20 && base.length > 10) {
      explanationAddition += ` (${inside})`;
      c = base;
    }
  }

  // 3. Check dash explanation: "Base - explanation"
  const dashMatch = c.match(/^(.*?)\s+[-–—]\s+([a-ząćęłńóśźż].{25,})\.?$/);
  if (dashMatch) {
    explanationAddition += ` — ${dashMatch[2].trim()}`;
    c = dashMatch[1].trim();
  }

  const wrongLens = q.opts.filter(o => o !== q.correctText).map(o => o.length);
  const avgWrong = wrongLens.reduce((a, b) => a + b, 0) / wrongLens.length;
  const newRatio = c.length / (avgWrong || 1);

  results.push({
    caseId: q.caseId,
    qNum: q.qNum,
    origRatio: q.ratio,
    newRatio: parseFloat(newRatio.toFixed(2)),
    origCorrect: q.correctText,
    newCorrect: c,
    explanationAddition,
    avgWrong: Math.round(avgWrong)
  });
});

const stillHigh = results.filter(r => r.newRatio >= 2.0);
const moderate = results.filter(r => r.newRatio >= 1.5 && r.newRatio < 2.0);
const good = results.filter(r => r.newRatio < 1.5);

console.log('Total evaluated:', results.length);
console.log('Still ratio >= 2.0:', stillHigh.length);
console.log('Moderate (1.5 <= ratio < 2.0):', moderate.length);
console.log('Good (ratio < 1.5):', good.length);

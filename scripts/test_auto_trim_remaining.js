const fs = require('fs');
const list = JSON.parse(fs.readFileSync('notes/remaining_706.json', 'utf8'));

let resolvedCount = 0;
const resolved = [];

list.forEach(q => {
  let key = q.key;
  let explanationAddition = '';
  let changed = false;

  // 1. Semicolon tail
  if (key.includes(';')) {
    const parts = key.split(';');
    if (parts.length === 2 && parts[1].trim().length > 25) {
      explanationAddition += ' ' + parts[1].trim();
      key = parts[0].trim();
      changed = true;
    }
  }

  // 2. Dash tail
  const dashMatch = key.match(/^(.*?)\s+[-–—]\s+([a-ząćęłńóśźż].{25,})\.?$/);
  if (dashMatch) {
    explanationAddition += ' — ' + dashMatch[2].trim();
    key = dashMatch[1].trim();
    changed = true;
  }

  // 3. Trailing parenthesis
  const parenMatch = key.match(/^(.*?)\s*\(([^)]+)\)\s*[\.]?$/);
  if (parenMatch) {
    const base = parenMatch[1].trim();
    const inside = parenMatch[2].trim();
    // if inside is an explanation or long
    if (inside.length > 15 && base.length > 15) {
      explanationAddition += ` (${inside})`;
      key = base;
      changed = true;
    }
  }

  if (changed) {
    const wrongLens = q.opts.filter(o => o !== q.key).map(o => o.length);
    const avgWrong = wrongLens.reduce((a, b) => a + b, 0) / wrongLens.length;
    const newRatio = key.length / avgWrong;
    if (newRatio < 2.0) {
      resolvedCount++;
      resolved.push({
        caseId: q.caseId,
        qIdx: q.qIdx,
        origRatio: q.ratio,
        newRatio: parseFloat(newRatio.toFixed(2)),
        origKey: q.key,
        newKey: key,
        explanationAddition
      });
    }
  }
});

console.log(`Resolved by clause trimming alone: ${resolvedCount} / 706`);
console.log('Sample of resolved:');
resolved.slice(0, 10).forEach(r => {
  console.log(`[#${r.caseId} Q${r.qIdx + 1}] ${r.origRatio} -> ${r.newRatio}`);
  console.log('  New Key:', r.newKey);
  console.log('  Explanation Add:', r.explanationAddition);
});

const fs = require('fs');
const list = JSON.parse(fs.readFileSync('notes/lek_high_disparity.json', 'utf8'));

const parenTail = list.filter(q => {
  const c = q.correctText;
  const isComb = /Wszystkie wymienione|Żadne z wymienionych|1,\s*2|I,\s*II/i.test(c);
  if (isComb) return false;
  if (c.includes(';') && c.split(';')[1].length > 25) return false;
  if (/\s+[-–—]\s+[a-ząćęłńóśźż]/.test(c)) return false;
  return /\([^)]+\)\s*[\.]?$/.test(c);
});

console.log('Sample of trailing paren questions (first 20):');
parenTail.slice(0, 20).forEach(q => {
  const m = q.correctText.match(/^(.*?)\s*\(([^)]+)\)\s*[\.]?$/);
  const base = m ? m[1] : q.correctText;
  const inside = m ? m[2] : '';
  const avgW = q.avgWrong;
  const newRatio = (base.length / avgW).toFixed(2);
  console.log(`[#${q.caseId} Q${q.qNum}] ${q.ratio} -> ${newRatio}`);
  console.log(`  Base: "${base}"`);
  console.log(`  Inside: "(${inside})"`);
  console.log(`  Distractor sample: "${q.opts.find(o => o !== q.correctText)}"`);
  console.log('---');
});

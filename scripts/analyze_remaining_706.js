const fs = require('fs');
const path = require('path');
const { decryptObjectAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

async function analyzeRemaining706() {
  const files = fs.readdirSync('cases').filter(f => /^\d+_.*\.json$/.test(f));
  const remaining = [];

  for (const f of files) {
    const raw = JSON.parse(fs.readFileSync(path.join('cases', f), 'utf8'));
    const c = await decryptObjectAes(raw, MASTER_KEY);
    c.lekQuestions.forEach((q, idx) => {
      const opts = q.opts || q.options || [];
      const correctIdx = q.correct ?? q.correctIdx ?? 0;
      const optLens = opts.map(o => (typeof o === 'string' ? o : o.text || '').length);
      const corrLen = optLens[correctIdx];
      const wrongLens = optLens.filter((_, i) => i !== correctIdx);
      const avgWrong = wrongLens.reduce((a, b) => a + b, 0) / wrongLens.length;
      const ratio = corrLen / avgWrong;
      if (ratio >= 2.0) {
        remaining.push({
          caseId: c.id,
          qIdx: idx,
          qText: q.q || q.question,
          key: opts[correctIdx],
          opts: opts,
          corrLen,
          avgWrong: Math.round(avgWrong),
          ratio: parseFloat(ratio.toFixed(2))
        });
      }
    });
  }

  console.log(`Total remaining high disparity: ${remaining.length}`);
  fs.writeFileSync('notes/remaining_706.json', JSON.stringify(remaining, null, 2), 'utf8');

  // Pattern statistics
  let trailingParen = 0;
  let semiColon = 0;
  let dash = 0;
  let comb = 0;
  let shortDistractors = 0;

  remaining.forEach(q => {
    const c = q.key;
    if (/Wszystkie wymienione|Żadne z wymienionych|1,\s*2|I,\s*II/i.test(c)) comb++;
    else if (c.includes(';') && c.split(';')[1].length > 25) semiColon++;
    else if (/\s+[-–—]\s+[a-ząćęłńóśźż]/.test(c)) dash++;
    else if (/\([^)]+\)\s*[\.]?$/.test(c)) trailingParen++;
    else if (q.avgWrong < 50 && q.corrLen > 100) shortDistractors++;
  });

  console.log('Patterns in remaining 706:');
  console.log('  1. Trailing Parentheses:', trailingParen);
  console.log('  2. Semicolon:', semiColon);
  console.log('  3. Dash:', dash);
  console.log('  4. Combinatorial:', comb);
  console.log('  5. Short Distractors (<50c vs >100c):', shortDistractors);
}
analyzeRemaining706();

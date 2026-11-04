const fs = require('fs');
const list = JSON.parse(fs.readFileSync('notes/lek_high_disparity.json', 'utf8'));

console.log('Total questions with ratio >= 2.0:', list.length);

let categoryParenTail = 0;
let categorySemiTail = 0;
let categoryDashTail = 0;
let categoryCombinatorial = 0;
let categoryShortDistractors = 0;

list.forEach(q => {
  const c = q.correctText;
  const isComb = /Wszystkie wymienione|Żadne z wymienionych|1,\s*2|I,\s*II/i.test(c);
  if (isComb) {
    categoryCombinatorial++;
    return;
  }
  if (c.includes(';') && c.split(';')[1].length > 25) {
    categorySemiTail++;
    return;
  }
  if (/\s+[-–—]\s+[a-ząćęłńóśźż]/.test(c)) {
    categoryDashTail++;
    return;
  }
  if (/\([^)]+\)\s*[\.]?$/.test(c)) {
    categoryParenTail++;
    return;
  }
  if (q.avgWrong < 50 && q.correctLen > 100) {
    categoryShortDistractors++;
    return;
  }
});

console.log('Categorization:');
console.log('  1. Trailing Parentheses on Key:', categoryParenTail);
console.log('  2. Semicolon Explanation Tail on Key:', categorySemiTail);
console.log('  3. Dash Explanation Tail on Key:', categoryDashTail);
console.log('  4. Combinatorial / All of the above:', categoryCombinatorial);
console.log('  5. Short Distractors (<50c) vs Long Key (>100c):', categoryShortDistractors);
console.log('  Other / Uncategorized:', list.length - (categoryParenTail + categorySemiTail + categoryDashTail + categoryCombinatorial + categoryShortDistractors));

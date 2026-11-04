const fs = require('fs');
const list = JSON.parse(fs.readFileSync('notes/lek_high_disparity.json', 'utf8'));

let withSemicolon = 0;
let withColon = 0;
let withCommaList = 0;
let withParens = 0;
let withTwoSentences = 0;

list.forEach(q => {
  const c = q.correctText;
  if (c.includes(';')) withSemicolon++;
  if (c.includes(':')) withColon++;
  if (/\([^\)]+\)/.test(c)) withParens++;
  if (/[a-ząćęłńóśźż]\.\s+[A-ZĄĆĘŁŃÓŚŹŻ]/.test(c)) withTwoSentences++;
  if (c.split(',').length > 3) withCommaList++;
});

console.log('Total high disparity:', list.length);
console.log('With semicolon (;):', withSemicolon);
console.log('With colon (:):', withColon);
console.log('With parentheses (...):', withParens);
console.log('With multiple sentences (dot + capital letter):', withTwoSentences);
console.log('With long comma lists (>3 items):', withCommaList);

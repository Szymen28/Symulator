const fs = require('fs');
const high = JSON.parse(fs.readFileSync('./notes/lek_high_disparity.json', 'utf8'));

let withSemicolon = 0;
let withDash = 0;
let withParenthesis = 0;
let withComma = 0;

high.forEach(h => {
  const t = h.correctText || '';
  if (t.includes(';')) withSemicolon++;
  if (t.includes(' – ') || t.includes(' - ')) withDash++;
  if (t.includes('(')) withParenthesis++;
});

console.log(`Of 801 high-disparity LEK questions:`);
console.log(`  Contains semicolon (;): ${withSemicolon}`);
console.log(`  Contains dash explanation ( - / – ): ${withDash}`);
console.log(`  Contains parentheses with mini-explanations: ${withParenthesis}`);

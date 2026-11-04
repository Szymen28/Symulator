const fs = require('fs');
const remaining = JSON.parse(fs.readFileSync('./notes/remaining_high.json', 'utf8'));

let out = `Remaining high disparity steps (${remaining.length}):\n\n`;
remaining.forEach((r, i) => {
  out += `// ${i + 1}. Case #${r.caseId} Step ${r.step}: ${r.title}\n`;
  out += `'${r.caseId}_${r.step}': {\n`;
  out += `  correct: '${r.cText.replace(/'/g, "\\'")}',\n`;
  out += `  wrong: [\n`;
  r.wrongTexts.forEach((w, wi) => {
    out += `    '${w.replace(/'/g, "\\'")}'${wi < r.wrongTexts.length - 1 ? ',' : ''}\n`;
  });
  out += `  ]\n},\n\n`;
});

fs.writeFileSync('./notes/remaining_56_template.js', out, 'utf8');
console.log('Dumped 56 steps to ./notes/remaining_56_template.js');

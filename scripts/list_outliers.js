const fs = require('fs');
const outliers = JSON.parse(fs.readFileSync('./notes/outliers_detailed.json', 'utf8'));
let out = `Total outliers: ${outliers.length}\n`;
outliers.forEach((o, i) => {
  out += `\n${i + 1}. [Case #${o.caseId} Step ${o.stepIdx}] ratio=${o.ratio} (corr=${o.correctLen}c, avgWrong=${o.avgWrong}c): ${o.stepTitle}\n`;
  out += `   V: ${o.correctText}\n`;
  o.wrongOpts.forEach((w, wi) => {
    out += `   X${wi + 1} (${w.len}c): ${w.text}\n`;
  });
});
fs.writeFileSync('./notes/outliers_readable.txt', out, 'utf8');
console.log('Saved to ./notes/outliers_readable.txt');

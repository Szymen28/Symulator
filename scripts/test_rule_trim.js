const fs = require('fs');
const list = JSON.parse(fs.readFileSync('notes/lek_high_disparity.json', 'utf8'));

let countBelow1_5 = 0;
let countBelow1_8 = 0;
let countBelow2_0 = 0;

list.forEach(q => {
  let c = q.correctText;
  let explanation = '';

  // 1. Check if correctText ends with parenthesis that looks like an explanation
  // e.g. (np. ...), (świadczy ...), (lub ...), (wskutek ...), (w ...), (Klasa ...)
  const parenMatch = c.match(/^(.*?)\s*\((np\.|świadczy|wskutek|lub|w\s|Klasa|drgawki|stężenie|roztwór|przeciwciała|głównie|zjawisko|cykl|nieprawidłowe|brak|ocena|ponieważ|co\s|minimalny)[^)]*\)\s*[\.]?$/i);
  if (parenMatch) {
    c = parenMatch[1].trim();
  }

  // 2. Check semicolon
  if (c.includes(';')) {
    const parts = c.split(';');
    if (parts.length === 2 && (parts[1].includes('leczenie') || parts[1].includes('zaleca') || parts[1].includes('w trakcie') || parts[1].includes('wzór') || parts[1].length > 40)) {
      c = parts[0].trim();
    }
  }

  const wrongLens = q.opts.filter(o => o !== q.correctText).map(o => o.length);
  const avgWrong = wrongLens.reduce((a, b) => a + b, 0) / wrongLens.length;
  const ratio = c.length / avgWrong;

  if (ratio < 1.5) countBelow1_5++;
  if (ratio < 1.8) countBelow1_8++;
  if (ratio < 2.0) countBelow2_0++;
});

console.log('Total high disparity tested:', list.length);
console.log('Resulting ratio < 1.5:', countBelow1_5);
console.log('Resulting ratio < 1.8:', countBelow1_8);
console.log('Resulting ratio < 2.0:', countBelow2_0);

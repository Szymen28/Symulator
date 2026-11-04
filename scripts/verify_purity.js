const fs = require('fs');
const path = require('path');
const { decryptObjectAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

async function verifyPurity() {
  const files = fs.readdirSync('cases').filter(f => /^\d+_.*\.json$/.test(f));
  let dummyOccurrences = 0;
  let jokeDistractors = 0;

  for (const f of files) {
    const raw = JSON.parse(fs.readFileSync(path.join('cases', f), 'utf8'));
    const c = await decryptObjectAes(raw, MASTER_KEY);
    if (!c.steps) continue;

    c.steps.forEach(s => {
      s.options.forEach(o => {
        const t = o.text || '';
        if (t.includes('traktując ten mechanizm jako wiodący')) {
          dummyOccurrences++;
        }
        if (/ząbkowani|odrósł|kwasu solnego|furosemidu doopłucnowo|bez nerek i pęcherza|odwrócenie trzewi|czysty wlew|pięścią|dożywotnia profilaktyka cyprofloksacyną/i.test(t)) {
          // Exclude valid clinical texts like "zęby trzonowe" or "ząbkowanie" in infant anamnesis
          if (!t.includes('odruch żucia') && !t.includes('stress dose')) {
            jokeDistractors++;
            console.log(`[Case #${c.id}] Suspicious text: ${t}`);
          }
        }
      });
    });
  }

  console.log(`Verification:`);
  console.log(`  Dummy suffix occurrences: ${dummyOccurrences}`);
  console.log(`  Joke distractors remaining: ${jokeDistractors}`);
}

verifyPurity().catch(console.error);

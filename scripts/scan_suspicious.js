const fs = require('fs');
const path = require('path');
const { decryptObjectAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

async function scanDistractors() {
  const files = fs.readdirSync('cases').filter(f => /^\d+_.*\.json$/.test(f));
  const suspicious = [];

  for (const f of files) {
    const raw = JSON.parse(fs.readFileSync(path.join('cases', f), 'utf8'));
    const c = await decryptObjectAes(raw, MASTER_KEY);
    if (!c.steps) continue;

    c.steps.forEach((s, sIdx) => {
      s.options.forEach((o, oIdx) => {
        const t = o.text || '';
        // Check for obviously absurd or placeholder terms
        if (
          /ząbkowani|odrósł|kwasu solnego|furosemidu doopłucnowo|bez nerek i pęcherza|odwrócenie trzewi|czysty wlew|pięścią|dożywotnia profilaktyka cyprofloksacyną/i.test(t)
        ) {
          suspicious.push({
            caseId: c.id,
            caseTitle: c.shortTitle || c.title,
            file: f,
            step: sIdx + 1,
            stepTitle: s.title,
            optIdx: oIdx + 1,
            correct: o.correct,
            text: t
          });
        }
      });
    });
  }

  console.log(`Found ${suspicious.length} suspicious/absurd distractors:`);
  suspicious.forEach(s => {
    console.log(`[Case #${s.caseId} Step ${s.step}] [${s.correct ? 'V' : 'X'}]: ${s.text}`);
  });
}

scanDistractors().catch(console.error);

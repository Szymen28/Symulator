const fs = require('fs');
const path = require('path');
const { decryptObjectAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

async function checkLekLetterPrefixes() {
  const files = fs.readdirSync('cases').filter(f => /^\d+_.*\.json$/.test(f));
  let withLetters = 0;
  let totalOpts = 0;

  for (const f of files) {
    const raw = JSON.parse(fs.readFileSync(path.join('cases', f), 'utf8'));
    const c = await decryptObjectAes(raw, MASTER_KEY);
    (c.lekQuestions || []).forEach(q => {
      (q.opts || q.options || []).forEach(o => {
        totalOpts++;
        const t = typeof o === 'string' ? o : o.text || '';
        if (/^[A-E]\)\s*/i.test(t) || /^[A-E]\.\s*/i.test(t)) {
          withLetters++;
        }
      });
    });
  }

  console.log(`Letter prefixes in LEK options: ${withLetters} / ${totalOpts}`);
}

checkLekLetterPrefixes().catch(console.error);

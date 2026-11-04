const fs = require('fs');
const path = require('path');
const { decryptObjectAes, encryptStringAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

async function checkMismatch() {
  const files = fs.readdirSync('cases').filter(f => /^\d+_.*\.json$/.test(f));
  let mismatches = 0;
  for (const f of files) {
    const raw = JSON.parse(fs.readFileSync(path.join('cases', f), 'utf8'));
    const c = await decryptObjectAes(raw, MASTER_KEY);
    c.lekQuestions.forEach((q, i) => {
      if (q.q && q.question && q.q !== q.question) {
        mismatches++;
        console.log(`Mismatch in ${f} Q${i+1}:`);
        console.log(`  q: ${q.q.slice(0, 60)}...`);
        console.log(`  question: ${q.question.slice(0, 60)}...`);
      }
    });
  }
  console.log('Total mismatches between q and question:', mismatches);
}
checkMismatch();

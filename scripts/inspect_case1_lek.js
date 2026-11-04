const fs = require('fs');
const { decryptObjectAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

async function check() {
  const raw = JSON.parse(fs.readFileSync('cases/01_dka.json', 'utf8'));
  const c = await decryptObjectAes(raw, MASTER_KEY);
  console.log('Case #1 lekQuestions[0]:', JSON.stringify(c.lekQuestions[0], null, 2));
  console.log('Case #1 lekQuestions[1]:', JSON.stringify(c.lekQuestions[1], null, 2));
}
check();

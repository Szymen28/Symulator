const fs = require('fs');
const { decryptObjectAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

async function checkSampleCases() {
  for (const id of [3, 4, 10, 143]) {
    const file = fs.readdirSync('cases').find(f => new RegExp(`^0*${id}_`).test(f));
    const raw = JSON.parse(fs.readFileSync('cases/' + file, 'utf8'));
    const c = await decryptObjectAes(raw, MASTER_KEY);
    console.log(`\n================ CASE #${id} (${c.title}) DIAGNOSTICS ================`);
    console.log(c.dutySummary.diagnostics);
  }
}

checkSampleCases().catch(console.error);

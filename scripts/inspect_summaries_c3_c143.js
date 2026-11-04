const fs = require('fs');
const path = require('path');
const { decryptObjectAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

async function compareSummaries() {
  const f3 = JSON.parse(fs.readFileSync('cases/03_pylorostenoza.json', 'utf8'));
  const c3 = await decryptObjectAes(f3, MASTER_KEY);

  const f143 = JSON.parse(fs.readFileSync('cases/143_objawowe_zwezenie_tetnicy_szyjnej.json', 'utf8'));
  const c143 = await decryptObjectAes(f143, MASTER_KEY);

  console.log('=== CASE #3 SUMMARY STRUCTURE ===');
  console.log(JSON.stringify(c3.dutySummary || c3.summary, null, 2).slice(0, 1000));

  console.log('\n=== CASE #143 SUMMARY STRUCTURE ===');
  console.log(JSON.stringify(c143.dutySummary || c143.summary, null, 2).slice(0, 1000));
}

compareSummaries().catch(console.error);

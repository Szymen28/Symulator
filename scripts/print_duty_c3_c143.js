const fs = require('fs');
const { decryptObjectAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

async function printDutySummaries() {
  const f3 = JSON.parse(fs.readFileSync('cases/03_pylorostenoza.json', 'utf8'));
  const c3 = await decryptObjectAes(f3, MASTER_KEY);

  const f143 = JSON.parse(fs.readFileSync('cases/143_objawowe_zwezenie_tetnicy_szyjnej.json', 'utf8'));
  const c143 = await decryptObjectAes(f143, MASTER_KEY);

  console.log('=== CASE #3 ===');
  console.log('DIAGNOSTICS:\n', c3.dutySummary.diagnostics);
  console.log('\nDRUGS:\n', c3.dutySummary.drugsAndDoses);
  console.log('\nPROCEDURES:\n', c3.dutySummary.procedures);
  console.log('\nMONITORING:\n', c3.dutySummary.monitoring);

  console.log('\n=== CASE #143 ===');
  console.log('DIAGNOSTICS:\n', c143.dutySummary.diagnostics);
  console.log('\nDRUGS:\n', c143.dutySummary.drugsAndDoses);
  console.log('\nPROCEDURES:\n', c143.dutySummary.procedures);
  console.log('\nMONITORING:\n', c143.dutySummary.monitoring);
}

printDutySummaries().catch(console.error);

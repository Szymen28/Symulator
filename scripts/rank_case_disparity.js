const fs = require('fs');
const { decryptObjectAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

async function run() {
  const files = fs.readdirSync('cases').filter(f => /^\d+_.*\.json$/.test(f));
  let caseStats = [];

  for (const f of files) {
    const enc = JSON.parse(fs.readFileSync('cases/' + f, 'utf8'));
    const c = await decryptObjectAes(enc, MASTER_KEY);
    if (!c.steps) continue;
    let ratios = [];
    c.steps.forEach(s => {
      const correctOpt = s.options.find(o => o.correct);
      if (!correctOpt) return;
      const cLen = (correctOpt.text || '').length;
      const wrongLens = s.options.filter(o => !o.correct).map(o => (o.text || '').length);
      const avgW = wrongLens.reduce((a, b) => a + b, 0) / (wrongLens.length || 1);
      ratios.push(cLen / (avgW || 1));
    });
    const avgCaseRatio = ratios.reduce((a, b) => a + b, 0) / (ratios.length || 1);
    caseStats.push({ file: f, id: c.id, dept: c.dept, avgRatio: avgCaseRatio });
  }

  caseStats.sort((a, b) => b.avgRatio - a.avgRatio);
  console.log('Top 15 cases with HIGHEST disparity (easiest to guess by length):');
  caseStats.slice(0, 15).forEach(cs => console.log('  Case #' + cs.id + ' (' + cs.dept + ') - Ratio: ' + cs.avgRatio.toFixed(2) + ' [' + cs.file + ']'));
  console.log('\nTop 15 cases with LOWEST disparity (most balanced):');
  caseStats.slice(-15).reverse().forEach(cs => console.log('  Case #' + cs.id + ' (' + cs.dept + ') - Ratio: ' + cs.avgRatio.toFixed(2) + ' [' + cs.file + ']'));

  const over3 = caseStats.filter(c => c.avgRatio >= 3.0).length;
  const over2 = caseStats.filter(c => c.avgRatio >= 2.0 && c.avgRatio < 3.0).length;
  const under2 = caseStats.filter(c => c.avgRatio < 2.0).length;
  console.log('\nCase Breakdown:');
  console.log('  Cases with Avg Ratio >= 3.0: ' + over3);
  console.log('  Cases with Avg Ratio 2.0 - 2.99: ' + over2);
  console.log('  Cases with Avg Ratio < 2.0: ' + under2);
}

run().catch(console.error);

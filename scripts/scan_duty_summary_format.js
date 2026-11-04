const fs = require('fs');
const path = require('path');
const { decryptObjectAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

async function scanDutySummaryFormatting() {
  const files = fs.readdirSync('cases').filter(f => /^\d+_.*\.json$/.test(f));
  let withSemicolons = 0;
  let withBr = 0;
  let otherFormat = 0;
  const examples = [];

  for (const f of files) {
    const raw = JSON.parse(fs.readFileSync(path.join('cases', f), 'utf8'));
    const c = await decryptObjectAes(raw, MASTER_KEY);
    const ds = c.dutySummary || {};

    const diag = ds.diagnostics || '';
    if (diag.includes('<br>') || diag.includes('<p>')) {
      withBr++;
    } else if (/;\s*\d+[\)\.]/i.test(diag) || /^\s*1[\)\.]/i.test(diag)) {
      withSemicolons++;
      if (examples.length < 5) {
        examples.push({ id: c.id, file: f, diag: diag.slice(0, 100) });
      }
    } else {
      otherFormat++;
    }
  }

  console.log(`DutySummary formatting across 150 cases:`);
  console.log(`  With <br> / <p>: ${withBr}`);
  console.log(`  With semicolons / solid inline text (like Case #3): ${withSemicolons}`);
  console.log(`  Other: ${otherFormat}`);
  console.log('Sample solid cases:', examples);
}

scanDutySummaryFormatting().catch(console.error);

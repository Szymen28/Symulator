const fs = require('fs');
const path = require('path');
const { decryptObjectAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

async function inspectOther() {
  const files = fs.readdirSync('cases').filter(f => /^\d+_.*\.json$/.test(f));
  for (const f of files) {
    const raw = JSON.parse(fs.readFileSync(path.join('cases', f), 'utf8'));
    const c = await decryptObjectAes(raw, MASTER_KEY);
    const ds = c.dutySummary || {};
    const diag = ds.diagnostics || '';
    if (!diag.includes('<br>') && !diag.includes('<p>') && !/;\s*\d+[\)\.]/i.test(diag)) {
      console.log(`[Case #${c.id} ${f}] diag: ${diag.slice(0, 120)}`);
    }
  }
}

inspectOther().catch(console.error);

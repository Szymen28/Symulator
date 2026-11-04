const fs = require('fs');
const { decryptObjectAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

async function inspectSample() {
  const sampleIds = [101, 105, 110, 115, 120, 125, 130, 145, 150];
  const files = fs.readdirSync('cases').filter(f => /^\d+_.*\.json$/.test(f));
  for (const id of sampleIds) {
    const f = files.find(file => {
      const m = file.match(/^0*(\d+)_/);
      return m && parseInt(m[1], 10) === id;
    });
    if (!f) continue;
    const raw = JSON.parse(fs.readFileSync('cases/' + f, 'utf8'));
    const c = await decryptObjectAes(raw, MASTER_KEY);
    console.log('\n=== Przypadek #' + c.id + ': ' + (c.shortTitle || c.title) + ' ===');
    c.pathoNodes.forEach((n, i) => {
      console.log('Node ' + (i+1) + ' (' + n.title + '): ' + (n.target||'').slice(0, 110) + '... [' + (n.target||'').length + 'c]');
    });
  }
}
inspectSample().catch(console.error);

const fs = require('fs');
const { decryptObjectAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

async function inspectDistractors() {
  const sampleIds = [10, 25, 50, 75, 110, 135];
  const files = fs.readdirSync('cases').filter(f => /^\d+_.*\.json$/.test(f));
  for (const id of sampleIds) {
    const f = files.find(file => {
      const m = file.match(/^0*(\d+)_/);
      return m && parseInt(m[1], 10) === id;
    });
    if (!f) continue;
    const raw = JSON.parse(fs.readFileSync('cases/' + f, 'utf8'));
    const c = await decryptObjectAes(raw, MASTER_KEY);
    console.log('\n================ Przypadek #' + c.id + ': ' + (c.shortTitle || c.title) + ' ================');
    c.steps.slice(0, 2).forEach((s, idx) => {
      console.log('--- Krok ' + (idx+1) + ': ' + s.title + ' ---');
      s.options.forEach(o => {
        console.log('  [' + (o.correct ? 'V' : 'X') + ' ' + o.text.length + 'c]: ' + o.text);
        if (!o.correct) {
          console.log('     FB: ' + (o.feedback||'').slice(0, 90) + '...');
        }
      });
    });
  }
}
inspectDistractors().catch(console.error);

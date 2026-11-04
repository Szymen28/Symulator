const fs = require('fs');
const path = require('path');
const { decryptObjectAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

async function countRanges() {
  const files = fs.readdirSync('cases').filter(f => /^\d+_.*\.json$/.test(f));
  const ranges = {
    '1-20': 0,
    '21-50': 0,
    '51-80': 0,
    '81-100': 0,
    '101-125': 0,
    '126-150': 0
  };

  for (const f of files) {
    const cid = parseInt(f.match(/^(\d+)_/)[1], 10);
    const raw = JSON.parse(fs.readFileSync(path.join('cases', f), 'utf8'));
    const c = await decryptObjectAes(raw, MASTER_KEY);
    c.lekQuestions.forEach(q => {
      const opts = q.opts || q.options || [];
      const correctIdx = q.correct ?? q.correctIdx ?? 0;
      const optLens = opts.map(o => (typeof o === 'string' ? o : o.text || '').length);
      const corrLen = optLens[correctIdx];
      const wrongLens = optLens.filter((_, i) => i !== correctIdx);
      const avgWrong = wrongLens.reduce((a, b) => a + b, 0) / wrongLens.length;
      const ratio = corrLen / avgWrong;
      if (ratio >= 2.0) {
        if (cid <= 20) ranges['1-20']++;
        else if (cid <= 50) ranges['21-50']++;
        else if (cid <= 80) ranges['51-80']++;
        else if (cid <= 100) ranges['81-100']++;
        else if (cid <= 125) ranges['101-125']++;
        else ranges['126-150']++;
      }
    });
  }

  console.log('High disparity distribution by range:', ranges);
}
countRanges();

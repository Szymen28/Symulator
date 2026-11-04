const fs = require('fs');
const path = require('path');
const { decryptObjectAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

async function checkSteps123() {
  const files = fs.readdirSync('cases').filter(f => /^\d+_.*\.json$/.test(f));
  let overlongTargets = 0;
  let genericTargets = 0;
  let shortDetails = 0;
  let totalNodes = 0;

  for (const f of files) {
    const raw = JSON.parse(fs.readFileSync(path.join('cases', f), 'utf8'));
    const c = await decryptObjectAes(raw, MASTER_KEY);
    if (!c.pathoNodes) continue;

    c.pathoNodes.forEach(n => {
      totalNodes++;
      const target = n.target || '';
      const detail = n.detail || n.desc || '';

      if (target.length > 220) overlongTargets++;
      if (/Terapia celowana: farmakoterapia dożylna w dawkach należnych/i.test(target)) genericTargets++;
      if (detail.length < 250) shortDetails++;
    });
  }

  console.log(`Total pathoNodes: ${totalNodes}`);
  console.log(`Overlong targets (>220 chars): ${overlongTargets}`);
  console.log(`Generic placeholder targets: ${genericTargets}`);
  console.log(`Short details (<250 chars): ${shortDetails}`);
}

checkSteps123().catch(console.error);

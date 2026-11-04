const fs = require('fs');
const path = require('path');
const { decryptObjectAes, encryptStringAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

const fixes = {
  '120': {
    target: /kwasu solnego/i,
    replacement: 'Wlew 5% roztworu glukozy z dodatkiem 40 mmol/l KCl bez nawadniania 0,9% NaCl jako postępowanie pierwszego rzutu u dziecka z kwasicą.'
  },
  '122': {
    target: /gorączka z ząbkowania/i,
    replacement: 'Pancytopenia wynika z ostrego polekowego uszkodzenia szpiku po antybiotykoterapii, a gorączka z nieswoistej reakcji alergicznej na leki.'
  },
  '12': {
    target: /fizjologiczna fluktuacja dobowa związana z ząbkowaniem/i,
    replacement: 'Ubytek 11% masy ciała to łagodne odwodnienie czynnościowe niewymagające nawadniania parenteralnego ani doustnego w warunkach szpitalnych.'
  },
  '35': {
    target: /Uderzenie pięścią w mostek/i,
    replacement: 'Prowadzenie wyłącznie uciśnięć klatki piersiowej i odroczenie defibrylacji do czasu podania 3 dawek amiodaronu w bolusie dożylnym.'
  },
  '51': {
    target: /odstawienie IPP i podanie kwasu solnego/i,
    replacement: 'Natychmiastowe odstawienie inhibitorów pompy protonowej i podanie doustnych leków prokinetycznych w celu przyspieszenia opróżniania żołądka.'
  }
};

async function fixSpecific() {
  const files = fs.readdirSync('cases').filter(f => /^\d+_.*\.json$/.test(f));
  for (const f of files) {
    const m = f.match(/^0*(\d+)_/);
    if (!m) continue;
    const caseId = m[1];
    if (fixes[caseId]) {
      const cfg = fixes[caseId];
      const raw = JSON.parse(fs.readFileSync(path.join('cases', f), 'utf8'));
      const c = await decryptObjectAes(raw, MASTER_KEY);
      let changed = false;

      c.steps.forEach(s => {
        s.options.forEach(o => {
          if (!o.correct && cfg.target.test(o.text)) {
            o.text = cfg.replacement;
            changed = true;
          }
        });
      });

      if (changed) {
        const encrypted = await encryptStringAes(JSON.stringify(c, null, 2), MASTER_KEY);
        fs.writeFileSync(path.join('cases', f), JSON.stringify(encrypted, null, 2), 'utf8');
        console.log(`Updated Case #${caseId}`);
      }
    }
  }
}

fixSpecific().catch(console.error);

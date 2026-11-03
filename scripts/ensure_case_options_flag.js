const fs = require('fs');
const path = require('path');
const { decryptObjectAes, encryptStringAes } = require('./encrypt_case');

const CASES_DIR = path.join(__dirname, '..', 'cases');
const MASTER_KEY = '@LEKSzymon28111999';

const files = [
  '101_celiakia_dziecko.json',
  '102_abmk_niemowle.json',
  '103_wyrostek_dziecko.json',
  '104_zum_niemowle.json',
  '105_zespol_nerczycowy_mcd.json',
  '106_stec_hus.json',
  '107_odplyw_pecherzowo_moczowodowy_vur.json',
  '108_popaciorkowcowe_kzn_apsgn.json',
  '109_wodonercze_wrodzone_upjo.json',
  '110_odra_morbilli.json'
];

(async () => {
  for (const file of files) {
    const filePath = path.join(CASES_DIR, file);
    const raw = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const caseData = await decryptObjectAes(raw, MASTER_KEY);

    let updated = false;

    // Check steps and options
    if (Array.isArray(caseData.steps)) {
      caseData.steps.forEach(st => {
        if (Array.isArray(st.options)) {
          st.options.forEach(opt => {
            const isCorrect = typeof opt.correct === 'boolean'
              ? opt.correct
              : (typeof opt.feedback === 'string' && (opt.feedback.startsWith('✅') || opt.feedback.includes('PRAWIDŁOWO')));
            if (opt.correct !== isCorrect) {
              opt.correct = isCorrect;
              updated = true;
            }
          });
        }
      });
    }

    if (updated) {
      const jsonStr = JSON.stringify(caseData, null, 2);
      const encryptedObj = await encryptStringAes(jsonStr, MASTER_KEY);
      fs.writeFileSync(filePath, JSON.stringify(encryptedObj, null, 2), 'utf8');
      console.log(`Updated explicit 'correct' flags for: ${file}`);
    } else {
      console.log(`Already has explicit flags: ${file}`);
    }
  }
  console.log("All cases 101-110 verified for explicit option flags!");
})();

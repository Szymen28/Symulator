const fs = require('fs');
const path = require('path');
const { decryptObjectAes, encryptStringAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

async function fix142() {
  const f = fs.readdirSync('cases').find(x => x.startsWith('142_'));
  const raw = JSON.parse(fs.readFileSync(path.join('cases', f), 'utf8'));
  const c = await decryptObjectAes(raw, MASTER_KEY);

  // Q2 (qIdx 1)
  c.lekQuestions[1].opts = [
    "Tętnice podudzia i stopy są silnie uwapnione (stwardnienie Mönckeberga), co uniemożliwia ich ściśnięcie mankietem.",
    "Z powodu wrodzonego braku aparatu zastawkowego w żyłach głębokich oraz żyłach przeszywających goleni.",
    "Wskutek odkładania się mikrokryształów moczanu sodu w stawach stopy i fałszywego przyspieszenia tętna.",
    "Z powodu patologicznego otwarcia przetok tętniczo-żylnych w skórze wywołanego neuropatią autonomiczną.",
    "Z powodu błędu analitycznego wynikającego z obecności przeciwciał przeciwjądrowych i krioglobulin we krwi."
  ];
  c.lekQuestions[1].options = c.lekQuestions[1].opts;

  // Q3 (qIdx 2)
  c.lekQuestions[2].opts = [
    "Pomiar wskaźnika paluch-ramię (TBI) lub przezskórnego ciśnienia parcjalnego tlenu (tcPO2) na grzbiecie stopy.",
    "Wykonanie standaryzowanej próby wysiłkowej na bieżni ruchomej z oceną dystansu chromania naczyniowego.",
    "Dobowa zbiórka moczu na obecność wolnej mioglobiny oraz wskaźnika wydalania albuminy z moczem.",
    "Pletyzmografia impedancyjna klatki piersiowej połączona z elektrokardiograficzną próbą wysiłkową.",
    "Ocena kapilaroskopowa mikrokrążenia wałów paznokciowych palców rąk w świetle mikroskopowym."
  ];
  c.lekQuestions[2].options = c.lekQuestions[2].opts;

  const encrypted = await encryptStringAes(JSON.stringify(c, null, 2), MASTER_KEY);
  fs.writeFileSync(path.join('cases', f), JSON.stringify(encrypted, null, 2), 'utf8');
  console.log('✓ Fixed Case 142 Q2 and Q3');
}
fix142();

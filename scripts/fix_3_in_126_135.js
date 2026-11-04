const fs = require('fs');
const path = require('path');
const { decryptObjectAes, encryptStringAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

const fixes = {
  127: [
    {
      qIdx: 7, // Q8
      newOpts: [
        "Ucisku lub przetoce z szyjki pęcherzyka do przewodu wątrobowego wspólnego przez zaklinowany złóg.",
        "Perforacji wrzodu żołądka do światła pęcherzyka żółciowego z następowym zapaleniem otrzewnej.",
        "Zarośnięciu światła żyły wrotnej przez proces zapalny szerzący się bezpośrednio z pęcherzyka.",
        "Pęknięciu torebki śledziony w przebiegu ostrej infekcji bakteryjnej wstępującej w drogach żółciowych.",
        "Zakrzepicy pni żył wątrobowych z następowym nagłym rozwojem wodobrzusza i martwicy hepatocytów."
      ]
    }
  ],
  134: [
    {
      qIdx: 2, // Q3
      newOpts: [
        "Insuflacja gazu i manipulacja aparatem w kruchej ścianie jelita stwarza wysokie ryzyko jatrogennej perforacji.",
        "Kolonoskopia wywołuje nieodwracalne uszkodzenie aparatu zwieraczowego odbytu i trwałe nietrzymanie stolca.",
        "Światło esicy w ostrym zapaleniu uchyłków ulega całkowitemu zarośnięciu przez włóknienie śródścienne.",
        "Wprowadzenie endoskopu wywołuje natychmiastowy odruchowy skurcz naczyń wieńcowych i ostry zawał serca.",
        "Przygotowanie fosforanami do kolonoskopii prowadzi do nieodwracalnej martwicy błony śluzowej żołądka."
      ]
    },
    {
      qIdx: 7, // Q8
      newOpts: [
        "Resekcji zmienionej esicy, wyłonieniu kolostomii końcowej na powłokach oraz ślepym zaszyciu kikuta odbytnicy.",
        "Całkowitym wycięciu żołądka z zespoleniem Roux-en-Y z pozostawieniem zmienionej esicy bez naruszenia.",
        "Zszyciu otworu uchyłka szwami pojedynczymi bez wycinania jelita i zdrenowaniu jamy miednicy mniejszej.",
        "Wyłonieniu odbarczającej pętlowej jejunostomii na jelicie czczym bez usuwania ogniska zapalnego w miednicy.",
        "Pierwotnej resekcji esicy z natychmiastowym zespoleniem mechanicznym i omentoplastyką bez wyłonienia stomii."
      ]
    }
  ]
};

async function run() {
  const files = fs.readdirSync('cases').filter(f => /^\d+_.*\.json$/.test(f));
  for (const f of files) {
    const m = f.match(/^(\d+)_/);
    if (!m) continue;
    const cid = parseInt(m[1], 10);
    if (!fixes[cid]) continue;

    console.log(`Applying fixes to Case #${cid} (${f})...`);
    const raw = JSON.parse(fs.readFileSync(path.join('cases', f), 'utf8'));
    const c = await decryptObjectAes(raw, MASTER_KEY);

    fixes[cid].forEach(up => {
      const qObj = c.lekQuestions[up.qIdx];
      if (!qObj) return;

      if (up.newOpts) {
        qObj.opts = up.newOpts;
        qObj.options = up.newOpts;
      }
    });

    const encrypted = await encryptStringAes(JSON.stringify(c, null, 2), MASTER_KEY);
    fs.writeFileSync(path.join('cases', f), JSON.stringify(encrypted, null, 2), 'utf8');
    console.log(`✓ Case #${cid} successfully updated and re-encrypted.`);
  }
}

run();

const fs = require('fs');
const path = require('path');
const { decryptObjectAes, encryptStringAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

const fixes = {
  83: [
    {
      qIdx: 8, // Q9
      newOpts: [
        "A) Tofacytynib / Upadacytynib (inhibitory kinaz janusowych JAK1/JAK3).",
        "B) Infliksymab (przeciwciało neutralizujące czynnik martwicy TNF-alfa).",
        "C) Etanercept (rozpuszczalny receptor fuzyjny dla cząsteczek TNF-alfa).",
        "D) Rytuksymab (przeciwciało wiążące antygen powierzchniowy CD20 limfocytów B).",
        "E) Anakinra (rekombinowany antagonista receptora dla interleukiny 1 IL-1R)."
      ]
    }
  ],
  84: [
    {
      qIdx: 0, // Q1
      newOpts: [
        "A) Rozpoznanie ustala się klinicznie i wdraża leczenie bez badań serologicznych (okienko serologiczne).",
        "B) Należy bezwzględnie potwierdzić zakażenie testem Western Blot przed podaniem jakiegokolwiek leku.",
        "C) Należy wykonać badanie molekularne PCR ze śliny kleszcza i odczekać 14 dni na wynik laboratoryjny.",
        "D) Należy pobrać wycinek skóry z brzegu rumienia do badania histopatologicznego z barwieniem srebrem.",
        "E) Należy wykonać diagnostyczne nakłucie lędźwiowe w celu rutynowego wykluczenia zakażenia tężcem."
      ]
    }
  ],
  88: [
    {
      qIdx: 8, // Q9
      newOpts: [
        "A) Zaawansowanym zakażeniu i ucieczce gazu z naczyń śródściennych przez żyły krezkowe do wątroby.",
        "B) Prawidłowej kolonizacji bakteryjnej jelita i fizjologicznym trawieniu laktozy z pokarmu kobiecego.",
        "C) Wrodzonym przetrwałym przewodzie tętniczym Botalla z hemodynamicznym przeciekiem lewo-prawym.",
        "D) Dokomorowym krwawieniu wewnątrzczaszkowym III stopnia wywołanym zaburzeniami krzepnięcia krwi.",
        "E) Artefakcie technicznym wynikającym ze złego ułożenia kliszy rentgenowskiej pod inkubatorem."
      ]
    }
  ],
  89: [
    {
      qIdx: 2, // Q3
      newOpts: [
        "A) Zawsze jest to objaw alarmowy niedrożności przewodu pokarmowego poniżej brodawki Vatera.",
        "B) Świadczy o pełnej dojrzałości enzymatycznej żołądka i fizjologicznym wydzielaniu kwasu solnego.",
        "C) Stanowi przejściową i fizjologiczną reakcję przewodu pokarmowego na domięśniowe podanie witaminy K.",
        "D) Świadczy o obecności mikrozłogów cholesterolowych w świetle pęcherzyka żółciowego u noworodka.",
        "E) Jest to odruchowy objaw ostrego ropnego zapalenia ucha środkowego szerzącego się trąbką słuchową."
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

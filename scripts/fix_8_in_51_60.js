const fs = require('fs');
const path = require('path');
const { decryptObjectAes, encryptStringAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

const fixes = {
  52: [
    {
      qIdx: 5, // Q6
      newOpts: [
        "A) TIPS bezpośrednio kieruje krew wrotną bogatą w amoniak do krążenia ogólnego, nasilając encefalopatię.",
        "B) TIPS wywołuje rozległy zawał śledziony i natychmiastowe załamanie parametrów krzepnięcia krwi.",
        "C) TIPS prowadzi do gwałtownego obniżenia stężenia bilirubiny w surowicy poniżej wartości oznaczalnych.",
        "D) TIPS powoduje mechaniczne zaciśnięcie i całkowite zarośnięcie pnia tętnicy wątrobowej właściwej.",
        "E) Zabieg ten jest bezwzględnie zalecany jako podstawowa metoda pierwszego wyboru w leczeniu śpiączki."
      ]
    },
    {
      qIdx: 9, // Q10
      newOpts: [
        "A) W celu farmakologicznego wywołania bezsenności i stymulacji ośrodka czuwania w podwzgórzu mózgu.",
        "B) Nocna głodówka przy braku glikogenu wyzwala rozpad białek mięśni, nasilając amoniak i sarkopenię.",
        "C) W celu przyspieszenia wydalania jonów potasu z moczem i zapobiegania hiperkaliemii u pacjenta.",
        "D) W celu stymulacji wydzielania kwasów żółciowych i zapobiegania powstawaniu kamicy żółciowej.",
        "E) Aby zneutralizować nocne wydzielanie kwasu solnego w żołądku i zapobiec powstawaniu nadżerek."
      ]
    }
  ],
  53: [
    {
      qIdx: 8, // Q9
      newOpts: [
        "A) Nieserowaciejące ziarniniaki z komórkami olbrzymimi Langhansa zlokalizowane we wszystkich warstwach.",
        "B) Ropnie kryptowe (crypt abscesses) z naciekiem neutrofilowym oraz zniekształcenie architektury krypt.",
        "C) Masywna martwica serowata z obecnością kwasoopornych prątków w barwieniu metodą Ziehl-Neelsena.",
        "D) Odkładanie się zewnątrzkomórkowych mas amyloidu w ścianach tętniczek śluzówki w świetle spolaryzowanym.",
        "E) Całkowity brak jakichkolwiek komórek zapalnych przy nasilonym włóknieniu podśluzówkowym ściany jelita."
      ]
    }
  ],
  58: [
    {
      qIdx: 4, // Q5
      newOpts: [
        "A) Na całkowitym wyeliminowaniu białka zwierzęcego i nabiału na okres co najmniej dziesięciu kolejnych lat.",
        "B) Na czasowym (2-6 tyg.) ograniczeniu produktów bogatych w łatwo fermentujące krótkołańcuchowe węglowodany.",
        "C) Na wyłącznym piciu niepasteryzowanych soków owocowych bogatych we fruktozę przez okres 3 miesięcy.",
        "D) Na całkowitej eliminacji tłuszczów nasyconych i nienasyconych z zastąpieniem ich syntetyczną parafiną.",
        "E) Na spożywaniu wyłącznie surowych nasion roślin strączkowych jako jedynego źródła węglowodanów w diecie."
      ]
    },
    {
      qIdx: 8, // Q9
      newOpts: [
        "A) Wywołują uogólnione pobudzenie psychoruchowe, bezsenność i nasilone drżenia pęczkowe mięśni kończyn.",
        "B) Powodują uzależnienie, atonię jelit, zaparcia oraz paradoksalny ból w narkotycznym zespole jelitowym.",
        "C) Wchodzą w reakcję chemiczną z czynnikiem Castle'a powodując nieodwracalny rozpad witaminy B12 w jelicie.",
        "D) Bezpośrednio wyzwalają ostre zapalenie wyrostka robaczkowego w mechanizmie zakażenia bakteryjnego.",
        "E) Nadmiernie nasilają wchłanianie żelaza w dwunastnicy prowadząc do rozwoju wtórnej hemochromatozy narządowej."
      ]
    },
    {
      qIdx: 10, // Q11
      newOpts: [
        "A) Wykonanie pełnego panelu badań inwazyjnych, dopóki pacjent i lekarz nie wyczerpią wszystkich procedur.",
        "B) Rozpoznanie na podstawie kryteriów Rzym IV i badań wykluczających bez zbędnej, inwazyjnej diagnostyki.",
        "C) Profilaktyczne wdrożenie trójpierścieniowych leków przeciwdepresyjnych u każdego zgłaszającego się chorego.",
        "D) Sugerowanie pacjentowi, że objawy mają charakter urojeniowy i odmowa wystawienia jakichkolwiek zleceń.",
        "E) Całkowite zaniechanie zbierania wywiadu lekarskiego na rzecz automatycznych ankiet elektronicznych w POZ."
      ]
    }
  ],
  59: [
    {
      qIdx: 0, // Q1
      newOpts: [
        "A) Glikemia >600 mg/dl, osmolalność efektywna >320 mOsm/kg, wodorowęglany >18 mmol/l oraz pH >7,30.",
        "B) Glikemia <200 mg/dl, osmolalność w granicach normy oraz ciężka kwasica nieoddechowa z pH <7,10.",
        "C) Obecność masywnej ketonurii (powyżej 4+ w teście paskowym) przy stężeniu glukozy poniżej 250 mg/dl.",
        "D) Wybitnie podwyższona luka anionowa przekraczająca 20 mEq/l z obniżeniem wodorowęglanów poniżej 5 mmol/l.",
        "E) Oddech Kussmaula z silnym zapachem acetonu (zgniłych jabłek) wyczuwalnym z ust u nieprzytomnego chorego."
      ]
    },
    {
      qIdx: 1, // Q2
      newOpts: [
        "A) Insulina w stanie hiperglikemii wywołuje natychmiastową lizę błon erytrocytów w łożysku naczyniowym.",
        "B) Gwałtowne przesunięcie glukozy i wody do komórek wywoła zapaść krążeniową i zgon we wstrząsie hipowolemicznym.",
        "C) Cząsteczki insuliny w obecności wysokiej osmolalności ulegają nieodwracalnej konwersji do czystego mocznika.",
        "D) Szybkie podanie hormonu indukuje natychmiastowe masywne zwapnienie aparatu zastawkowego serca pacjenta.",
        "E) Wysokie stężenie insuliny paradoksalnie stymuluje wątrobową ketogenezę i nasila produkcję acetooctanu."
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

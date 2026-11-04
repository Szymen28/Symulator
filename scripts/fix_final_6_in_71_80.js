const fs = require('fs');
const path = require('path');
const { decryptObjectAes, encryptStringAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

const fixes = {
  74: [
    {
      qIdx: 0,
      opts: [
        "A) Obecność hipersegmentowanych granulocytów obojętnochłonnych (neutrofile z 5 lub więcej płatami jądra)",
        "B) Obecność licznych schistocytów (fragmentocytów) w przebiegu mikroangiopatii zakrzepowej",
        "C) Obecność krwinek tarczowatych (kodocytów) oraz ciałek Howella-Jolly'ego po splenektomii",
        "D) Występowanie mikrocytozy z hipochromią krwinek czerwonych w ciężkim niedoborze żelaza",
        "E) Wyłącznie obecność sferocytów o zwiększonej kruchości osmotycznej w hemolizie wrodzonej"
      ],
      correct: 0,
      exp: "Prawidłowo! Hipersegmentacja granulocytów (obecność ≥ 5% neutrofilów z ≥ 5 płatami lub co najmniej jednego z 6 płatami) jest najwcześniejszym i najbardziej charakterystycznym objawem niedokrwistości megaloblastycznej w rozmazie krwi, wyprzedzającym nawet pojawienie się makrocytozy."
    },
    {
      qIdx: 1,
      opts: [
        "A) Oznaczenie stężenia kwasu metylomalonowego (MMA) w osoczu – jest podwyższone w niedoborze B12 i prawidłowe w niedoborze kwasu foliowego",
        "B) Oznaczenie stężenia ferrytyny oraz całkowitej zdolności wiązania żelaza (TIBC) w surowicy pacjenta",
        "C) Oznaczenie aktywności aminotransferazy alaninowej (AlAT) oraz enzymów cholestatycznych (GGTP, fosfataza zasadowa)",
        "D) Pomiar stężenia bilirubiny całkowitej i frakcji pośredniej w połączeniu z oceną odczynu Coombsa",
        "E) Pomiar stężenia białka C-reaktywnego (CRP) oraz prokalcytoniny w celu wykluczenia tła zapalnego"
      ],
      correct: 0,
      exp: "Prawidłowo! Kwas metylomalonowy (MMA) jest metabolizowany przez mutazę metylomalonylo-CoA zależną od witaminy B12. W niedoborze B12 stężenie MMA (i homocysteiny) rośnie. W niedoborze kwasu foliowego stężenie MMA pozostaje prawidłowe (rośnie jedynie homocysteina)."
    },
    {
      qIdx: 4,
      opts: [
        "A) W mechanizmie nieefektywnej erytropoezy (przedwczesnego rozpadu megaloblastów wewnątrz szpiku kostnego)",
        "B) Wskutek martwicy miąższu trzustki i enzymatycznego uszkodzenia komórek wątrobowych przez lipazę",
        "C) W wyniku zaawansowanej marskości wątroby i upośledzenia sprzęgania bilirubiny przez glukuronylotransferazę",
        "D) Wskutek wewnątrznaczyniowej hemolizy immunologicznej wywołanej obecnością autoprzeciwciał typu zimnego",
        "E) Wskutek ostrego zablokowania przewodu pęcherzykowego przez złogi cholesterolowe i zastoju żółci"
      ],
      correct: 0,
      exp: "Prawidłowo! Z powodu upośledzenia syntezy DNA olbrzymie, nieprawidłowe komórki prekursorowe (megaloblasty) ulegają przedwczesnej apoptozie i lizie w obrębie samego szpiku kostnego (nieefektywna erytropoza). Uwalnia się z nich dehydrogenaza mleczanowa (skrajnie wysokie LDH) oraz hem metabolizowany do wolnej (pośredniej) bilirubiny."
    },
    {
      qIdx: 5,
      opts: [
        "A) Ciężka hipokaliemia (wskutek masywnego napływu potasu do intensywnie syntetyzowanych krwinek)",
        "B) Ciężka hiperkalcemia (wskutek gwałtownej resorpcji kości indukowanej przez erytropoetynę)",
        "C) Ostra hiperfosfatemia (spowodowana upośledzonym wydalaniem fosforanów przez cewki nerkowe)",
        "D) Masywna hipernatremia (w wyniku zatrzymania sodu i wody przez układ renina-angiotensyna)",
        "E) Izolowana hipochloremia (wtórna do alkalozy metabolicznej indukowanej przez megaloblasty)"
      ],
      correct: 0,
      exp: "Prawidłowo! W pierwszych dobach leczenia witaminą B12 dochodzi do gwałtownego 'przełomu retikulocytarnego'. Masywna produkcja nowych komórek zużywa olbrzymie ilości potasu z surowicy, co może wywołać ciężką hipokaliemię grożącą zgonem z powodu arytmii serca. Należy bezwzględnie monitorować potas."
    }
  ],
  76: [
    {
      qIdx: 1,
      opts: [
        "A) Pseudomonas aeruginosa (pałeczka ropy błękitnej)",
        "B) Streptococcus pneumoniae (dwoinka zapalenia płuc)",
        "C) Clostridioides difficile (laseczka beztlenowa)",
        "D) Moraxella catarrhalis (ziarenkowiec Gram-ujemny)",
        "E) Mycoplasma pneumoniae (atypowa bakteria płucna)"
      ],
      correct: 0,
      exp: "Prawidłowo! Zakażenie Gram-ujemną pałeczką Pseudomonas aeruginosa u pacjenta z neutropenią charakteryzuje się niezwykle wysoką śmiertelnością (do 50% w ciągu 48h od wystąpienia gorączki bez leczenia celowanego). Dlatego każdy empiryczny schemat antybiotykoterapii gorączki neutropenicznej musi bezwzględnie obejmować leki przeciw pseudomonasowe (np. cefepim, piperacylina z tazobaktamem, meropenem)."
    },
    {
      qIdx: 7,
      opts: [
        "A) Ponieważ neutrofile są głównym składnikiem nacieku zapalnego i ropy – ich brak uniemożliwia wytworzenie klasycznej odpowiedzi zapalnej",
        "B) Ponieważ bakterie Gram-ujemne wytwarzają enzymy rozszczepiające promieniowanie rentgenowskie w tkance płucnej chorego",
        "C) Ponieważ profilaktycznie podawane antybiotyki całkowicie maskują zmiany radiologiczne bez redukcji namnażania bakterii",
        "D) Ponieważ chemioterapia indukująca trwale zmienia gęstość optyczną kości i tkanek miękkich klatki piersiowej",
        "E) Z powodu braku erytrocytów w kapilarach pęcherzykowych wywołanego skrajną niedokrwistością aplastyczną"
      ],
      correct: 0,
      exp: "Prawidłowo! Prawidłowa reakcja zapalna, formowanie ropy, zacienienia w RTG klatki piersiowej czy cechy ropne w moczu zależą od obecności granulocytów obojętnochłonnych. U pacjenta z głęboką neutropenią (<0,5 G/l) zakażenie może mieć charakter piorunujący bez tworzenia widocznych nacieków zapalnych!"
    }
  ]
};

async function run() {
  const files = fs.readdirSync('cases').filter(f => /^\d+_.*\.json$/.test(f));
  for (const f of files) {
    const cid = parseInt(f.match(/^(\d+)_/)[1], 10);
    if (!fixes[cid]) continue;
    console.log(`Fixing Case #${cid} (${f})...`);
    const raw = JSON.parse(fs.readFileSync(path.join('cases', f), 'utf8'));
    const c = await decryptObjectAes(raw, MASTER_KEY);
    const questions = c.lekQuestions || c.lek_questions || (c.quiz && c.quiz.questions) || [];
    
    fixes[cid].forEach(fix => {
      const q = questions[fix.qIdx];
      if (!q) {
        console.error(`  Error: Q idx ${fix.qIdx} not found in Case #${cid}`);
        return;
      }
      q.opts = fix.opts;
      q.options = fix.opts;
      q.correct = fix.correct;
      q.correctIdx = fix.correct;
      if (fix.exp) {
        q.exp = fix.exp;
        q.expl = fix.exp;
        q.explanation = fix.exp;
      }
      console.log(`  ✓ Updated Q${fix.qIdx + 1}`);
    });

    const encrypted = await encryptStringAes(JSON.stringify(c, null, 2), MASTER_KEY);
    fs.writeFileSync(path.join('cases', f), JSON.stringify(encrypted, null, 2), 'utf8');
    console.log(`✓ Case #${cid} successfully updated and re-encrypted.`);
  }
}

run();

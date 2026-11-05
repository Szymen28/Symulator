const fs = require('fs');
const path = require('path');
const { encryptStringAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

function validateCase(c) {
  const errs = [];
  if (!c.id || !c.file || !c.title || !c.dept || !c.diagnosisTitle) errs.push(`Missing base meta in case ${c.id}`);
  if (!c.vitals || c.vitals.length < 4) errs.push(`Vitals invalid in case ${c.id}`);
  c.vitals.forEach((v, idx) => {
    if (!v.label || !v.val || !v.unit || !v.status) errs.push(`Vital #${idx} missing keys in case ${c.id}`);
  });
  if (!c.story || !c.story.includes('<strong>Pacjent:</strong>') || !c.story.includes('<strong>Wywiad chorobowy:</strong>') || !c.story.includes('<strong>Badanie przedmiotowe:</strong>')) {
    errs.push(`Story does not match 3-part Gold Standard in case ${c.id}`);
  }
  if (!c.steps || c.steps.length < 3) errs.push(`Steps < 3 in case ${c.id}`);
  c.steps.forEach((s, sidx) => {
    if (!s.title || !s.scenario || !s.options || s.options.length < 3) errs.push(`Step #${sidx} invalid in case ${c.id}`);
    const lengths = s.options.map(o => o.text.length);
    const maxL = Math.max(...lengths);
    const minL = Math.min(...lengths);
    const ratio = maxL / (minL || 1);
    if (ratio > 1.5) errs.push(`Step #${sidx} option disparity ratio ${ratio.toFixed(2)} > 1.5 (min: ${minL}, max: ${maxL}) in case ${c.id}`);
    s.options.forEach((o, oidx) => {
      if (typeof o.correct !== 'boolean' || typeof o.isCorrect !== 'boolean' || !o.feedback) {
        errs.push(`Step #${sidx} opt #${oidx} missing boolean correct or feedback in case ${c.id}`);
      }
      if (o.correct && !o.feedback.includes('✅ PRAWIDŁOWO')) errs.push(`Step #${sidx} opt #${oidx} feedback missing ✅ PRAWIDŁOWO`);
      if (!o.correct && !o.feedback.includes('❌ BŁĄD')) errs.push(`Step #${sidx} opt #${oidx} feedback missing ❌ BŁĄD`);
    });
  });
  if (!c.pathoNodes || c.pathoNodes.length !== 3) errs.push(`pathoNodes length is not 3 in case ${c.id}`);
  c.pathoNodes.forEach((pn, pidx) => {
    if (!pn.title || !pn.desc || !pn.target) errs.push(`pathoNode #${pidx} missing fields in case ${c.id}`);
    if (JSON.stringify(pn).includes('dose-pill')) errs.push(`pathoNode #${pidx} contains dose-pill in case ${c.id}`);
  });
  if (!c.dutySummary || !c.dutySummary.diagnostics || !c.dutySummary.drugsAndDoses || !c.dutySummary.pitfalls) {
    errs.push(`dutySummary missing sections in case ${c.id}`);
  }
  if (c.diffTable) {
    if (!c.diffTable.title.startsWith('⚔️ Tabela Różnicowa:')) errs.push(`diffTable title missing ⚔️ prefix in case ${c.id}`);
    if (!c.diffTable.rows || c.diffTable.rows.length < 4) errs.push(`diffTable rows < 4 in case ${c.id}`);
  }
  if (!c.lekQuestions || c.lekQuestions.length !== 11) errs.push(`lekQuestions count is ${c.lekQuestions?.length} != 11 in case ${c.id}`);
  c.lekQuestions.forEach((lq, qidx) => {
    if (lq.q !== lq.question) errs.push(`LEK #${qidx} q !== question in case ${c.id}`);
    if (lq.correct !== lq.correctIdx) errs.push(`LEK #${qidx} correct !== correctIdx in case ${c.id}`);
    if (lq.exp !== lq.expl || lq.exp !== lq.explanation) errs.push(`LEK #${qidx} explanation fields mismatch in case ${c.id}`);
    if (!lq.opts || lq.opts.length !== 5) errs.push(`LEK #${qidx} opts length != 5 in case ${c.id}`);
    const lengths = lq.opts.map(o => o.length);
    const maxL = Math.max(...lengths);
    const minL = Math.min(...lengths);
    const ratio = maxL / (minL || 1);
    if (ratio > 1.5) errs.push(`LEK #${qidx} option disparity ratio ${ratio.toFixed(2)} > 1.5 (min: ${minL}, max: ${maxL}) in case ${c.id}`);
  });
  if (!c.flashcards || c.flashcards.length !== 6) errs.push(`flashcards count != 6 in case ${c.id}`);
  return errs;
}

const casesData = [
  // =========================================================================
  // CASE 171: Ostre Zatrucie Tlenkiem Węgla (CO)
  // =========================================================================
  {
    id: 171,
    file: "171_zatrucie_tlenkiem_wegla_co.json",
    shortTitle: "Zatrucie Tlenkiem Węgla (CO)",
    title: "Toksykologiczny Stan Nagły: Ostre Zatrucie Tlenkiem Węgla (Czad)",
    dept: "Toksykologia / SOR",
    diagnosisTitle: "Ostre Zatrucie Tlenkiem Węgla z Kwasicą Mleczanową i Encefalopatią Niedotlenieniową",
    vitals: [
      { label: "Ciśnienie tętnicze (RR)", val: "138/84", unit: "mmHg", status: "vital-ok" },
      { label: "Częstość akcji serca (HR)", val: "112", unit: "/min", status: "vital-warn" },
      { label: "Częstość oddechów (RR)", val: "22", unit: "/min", status: "vital-warn" },
      { label: "Saturacja (SpO2)", val: "99", unit: "%", status: "vital-ok" },
      { label: "Temperatura ciała", val: "36.6", unit: "°C", status: "vital-ok" }
    ],
    story: "<p><strong>Pacjent:</strong> 28-letnia kobieta w 24. tygodniu ciąży przywieziona na SOR przez ZRM po ewakuacji przez straż pożarną z łazienki w kamienicy ogrzewanej piecykiem gazowym.</p><p><strong>Wywiad chorobowy:</strong> Kobieta brała kąpiel przy zamkniętych szczelnie oknach. Mąż zaniepokojony brakiem kontaktu wyważył drzwi i zastał pacjentkę nieprzytomną na podłodze, po czym sam odczuł silny ból i zawroty głowy. W wywiadzie zebranym od męża: pacjentka przed utratą przytomności skarżyła się na pulsujący ból głowy, nudności, duszność oraz zaburzenia widzenia. Strażacy stwierdzili w łazience stężenie tlenku węgla przekraczające 400 ppm. W karetce odzyskała przytomność, jest podsypiająca, splątana, nie pamięta zdarzenia. Ruchy płodu są słabiej wyczuwalne niż zwykle.</p><p><strong>Badanie przedmiotowe:</strong> Pacjentka podsypiająca, zdezorientowana co do czasu i miejsca (GCS 13: O3V4M6), nudności, tachykardia 112/min, tachypnoë 22/min. Skóra blada, spocona (brak podręcznikowego wiśniowego zabarwienia powłok). Pulsoksymetr standardowy na palcu wskazuje SpO2 99%. W badaniu EKG: tachykardia zatokowa z nieswoistymi obniżeniami odcinka ST o 1 mm w odprowadzeniach przedsercowych V4–V6. Gazometria krwi tętniczej z ko-oksymetrią: pH 7,28, pO2 96 mmHg, pCO2 30 mmHg, HCO3- 16 mmol/l, mleczany 4,2 mmol/l, stężenie karboksyhemoglobiny (COHb) wynosi 28% (norma u osób niepalących <1,5–2%).</p>",
    steps: [
      {
        title: "Krok 1: Natychmiastowa tlenoterapia ratunkowa na SOR",
        scenario: "Pacjentka ma COHb 28%, jest w ciąży, a standardowy pulsoksymetr wskazuje SpO2 99%. Jakie jest natychmiastowe postępowanie tlenowe pierwszego rzutu?",
        options: [
          {
            text: "Wdrożenie 100% tlenoterapii normobarycznej przez szczelną maskę twarzową z rezerwuarem bezzwrotnym z wysokim przepływem tlenu (12–15 l/min) w celu skrócenia okresu półtrwania COHb",
            correct: true,
            isCorrect: true,
            feedback: "✅ PRAWIDŁOWO! Standardowy pulsoksymetr nie odróżnia karboksyhemoglobiny (COHb) od oksyhemoglobiny (HbO2), dając fałszywie prawidłowy wynik SpO2. Podanie 100% tlenu przez maskę z rezerwuarem skraca okres półtrwania COHb z ok. 320 minut (na powietrzu atmosferycznym) do ok. 70–80 minut."
          },
          {
            text: "Zastosowanie tlenoterapii przez wąsy tlenowe z przepływem 2 litrów na minutę z uwagi na prawidłowy odczyt saturacji 99% w rutynowym pulsoksymetrze",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Niska podaż tlenu przez wąsy jest nieskuteczna w wypieraniu CO z hemoglobiny i przedłuża głębokie niedotlenienie tkanek matki oraz płodu."
          },
          {
            text: "Podanie dożylne 100 ml 20% roztworu mannitolu w celu chemicznego związania wolnego tlenku węgla w krążeniu wrotnym bez tlenoterapii",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Mannitol to diuretyk osmotyczny, nie wiąże tlenku węgla i nie leczy hipoksji tkankowej w zatruciu czadem."
          },
          {
            text: "Zalecenie natychmiastowej głębokiej hiperwentylacji powietrzem atmosferycznym bez podawania tlenu medycznego ze źródeł szpitalnych",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Oddychanie powietrzem atmosferycznym wydłuża eliminację COHb do ponad 5–6 godzin, potęgując uszkodzenie płodu i mózgu."
          }
        ]
      },
      {
        title: "Krok 2: Kwalifikacja do komory hiperbarycznej (HBO)",
        scenario: "U pacjentki stwierdzono COHb 28%, epizod utraty przytomności, cechy niedokrwienia w EKG oraz ciążę w 24. tygodniu. Czy chora kwalifikuje się do leczenia tlenem hiperbarycznym (HBO – Hyperbaric Oxygen Therapy)?",
        options: [
          {
            text: "Tak, ciąża, utrata przytomności, cechy niedokrwienia mięśnia sercowego oraz COHb >15–20% stanowią bezwzględne wskazania do pilnej kwalifikacji do tlenoterapii hiperbarycznej (HBO)",
            correct: true,
            isCorrect: true,
            feedback: "✅ PRAWIDŁOWO! Tlen hiperbaryczny (HBO pod ciśnieniem 2,5–3,0 ATA) skraca T1/2 COHb do ok. 20 minut, rozpuszcza tlen fizycznie w osoczu i wypiera CO z cytochromów. Ciąża jest szczególnym wskazaniem, ponieważ hemoglobina płodowa (HbF) wiąże CO silniej niż hemoglobina dorosłych, a eliminacja CO u płodu jest znacznie wolniejsza."
          },
          {
            text: "Nie, ciąża stanowi bezwzględne przeciwwskazanie do terapii w komorze hiperbarycznej z powodu ryzyka przedwczesnego pęknięcia pęcherza płodowego",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Ciąża NIE jest przeciwwskazaniem, lecz jednym z NAJWAŻNIEJSZYCH wskazań do HBO – chroni nienarodzone dziecko przed ciężką encefalopatią i obumarciem wewnątrzmacicznym."
          },
          {
            text: "Nie, leczenie w komorze HBO jest dozwolone wyłącznie u pacjentów ze stężeniem karboksyhemoglobiny przekraczającym 70% w ko-oksymetrii",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! COHb >70% to stężenie śmiertelne; wskazaniem do HBO u dorosłych bez ciąży jest COHb >25%, a w ciąży próg wynosi zaledwie 15%."
          },
          {
            text: "Nie, zamiast komory hiperbarycznej należy wykonać pilną transfuzję wymienną 4 jednostek koncentratu krwinek czerwonych na sali porodowej",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Transfuzja wymienna nie jest rutynową metodą z wyboru u ciężarnej; metodą z wyboru o udowodnionej skuteczności jest HBO."
          }
        ]
      },
      {
        title: "Krok 3: Monitorowanie powikłań późnych – zespół neurologiczny (DNS)",
        scenario: "Stan pacjentki po tlenoterapii poprawił się, a stężenie COHb spadło do 3%. Rodzina pyta o możliwość wypisania do domu. O jakim odległym powikłaniu neurologicznym należy pouczyć pacjentkę i rodzinę?",
        options: [
          {
            text: "O opóźnionym zespole neurologicznym (Delayed Neurological Sequelae - DNS), który może wystąpić po 2–40 dniach 'okna bezobjawowego' w postaci parkinsonizmu i zaburzeń pamięci",
            correct: true,
            isCorrect: true,
            feedback: "✅ PRAWIDŁOWO! Zespół powikłań późnych (DNS) rozwija się u 10–30% chorych po ciężkim zatruciu CO w wyniku demielinizacji istoty białej i martwicy gałek bladych (globus pallidus). Objawia się apatią, zaburzeniami poznawczymi, otępieniem lub objawami pozapiramidowymi po pozornym powrocie do zdrowia."
          },
          {
            text: "O możliwości nagłego rozwoju złośliwego nowotworu kości długich lub mięsaków tkanek miękkich w ciągu pierwszych trzech tygodni od ostrego narażenia na tlenek węgla",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Tlenek węgla nie jest kancerogenem wywołującym mięsaki kości; powikłania dotyczą układu nerwowego i sercowo-naczyniowego."
          },
          {
            text: "O konieczności dożywotniego profilaktycznego przyjmowania leków przeciwdrgawkowych z powodu rzekomo stuprocentowego ryzyka rozwoju lekoopornej padaczki poudarowej",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Rutynowa profilaktyka przeciwpadaczkowa u każdego zatrutego CO bez aktywnych drgawek jest błędem farmakoterapii."
          },
          {
            text: "O całkowitym braku ryzyka jakichkolwiek powikłań odległych, jeśli stężenie karboksyhemoglobiny w szpitalu spadło w badaniach kontrolnych poniżej wartości 5%",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Normalizacja COHb nie wyklucza uszkodzenia enzymów mitochondrialnych i rozwoju opóźnionego zespołu neuropsychiatrycznego."
          }
        ]
      }
    ],
    pathoNodes: [
      {
        id: "patho_1",
        title: "Wysokie powinowactwo do hemoglobiny i efekt Haldane'a",
        desc: "Tlenek węgla (CO) wykazuje ok. 200–250-krotnie większe powinowactwo do hemoglobiny niż tlen. Tworzy karboksyhemoglobinę (COHb), która nie tylko nie transportuje tlenu, ale też zmienia konformację tetrameru Hb, przesuwając krzywą dysocjacji oksyhemoglobiny w lewo i blokując oddawanie tlenu w tkankach.",
        target: "Tlenoterapia normobaryczna 100% i hiperbaryczna (HBO) wypierająca CO z hemoglobiny"
      },
      {
        id: "patho_2",
        title: "Hamowanie mitochondrialnego łańcucha oddechowego",
        desc: "CO wiąże się wewnątrzkomórkowo z hemem oksydazy cytochromowej c (kompleks IV łańcucha oddechowego), blokując fosforylację oksydacyjną i syntezę ATP. Prowadzi to do przejścia na beztlenowy metabolizm glukozy, kwasicy mleczanowej oraz masowej generacji reaktywnych form tlenu (RFT).",
        target: "Tlen hiperbaryczny (HBO 2,5–3 ATA) reaktywujący oksydazę cytochromową"
      },
      {
        id: "patho_3",
        title: "Uszkodzenie struktur bogatych w żelazo i demielinizacja (DNS)",
        desc: "Struktury mózgowia o najwyższym zużyciu tlenu i zawartości żelaza (gałki blade – globus pallidus, hipokamp) ulegają wybiórczej martwicy. Peroksydacja lipidów mieliny i aktywacja mikrogleju prowadzą po 2–40 dniach bezobjawowych do opóźnionej demielinizacji (DNS).",
        target: "Wczesna tlenoterapia HBO zmniejszająca częstość zespołu powikłań późnych"
      }
    ],
    dutySummary: {
      diagnostics: "1. Natychmiastowe badanie gazometryczne krwi tętniczej lub żylnej z KO-OKSYMETRIĄ (pomiar COHb) – standardowy pulsoksymetr SpO2 nie odróżnia HbCO od HbO2 i daje wynik fałszywie prawidłowy.\n\n2. Ocena stężenia mleczanów, elektrolitów, glukozy, gazometrii (kwasica metaboliczna z przerwą anionową) oraz wskaźników nerkowych i wątrobowych.\n\n3. Wykonanie 12-odprowadzeniowego EKG oraz oznaczenie troponiny sercowej (wykrycie niemego niedokrwienia lub zawału mięśnia sercowego indukowanego CO).\n\n4. Badanie ginekologiczno-położnicze z oceną KTG / USG dobrostanu płodu u kobiet ciężarnych.",
      drugsAndDoses: "• Tlenoterapia normobaryczna: <span class=\"dose-pill\">100% tlen przez szczelną maskę z rezerwuarem bezzwrotnym (12–15 l/min)</span> natychmiast do czasu kwalifikacji do HBO.\n• Wskazania do HBO (komora hiperbaryczna, 2,5–3,0 ATA): <span class=\"dose-pill\">utrata przytomności, ciąża (COHb >15%), COHb >25%, cechy niedokrwienia w EKG, kwasica metaboliczna</span>.\n• Wyrównanie kwasicy: <span class=\"dose-pill\">krystaloidy zbilansowane (np. Plasmalyte / Optilyte 1000–2000 ml i.v.)</span>, wodorowęglan sodu wyłącznie przy skrajnej kwasicy pH <7,10.\n• Sedacja przy pobudzeniu: <span class=\"dose-pill\">midazolam 1–2,5 mg i.v. powoli</span> lub diazepam 5 mg i.v. w celu opanowania niepokoju.",
      pitfalls: [
        "Poleganie na odczycie standardowego pulsoksymetru (SpO2) – mierzy on pochłanianie światła przy 660 i 940 nm, myląc COHb z oksyhemoglobiną i pokazując 99–100% u umierającego z niedotlenienia pacjenta.",
        "Oczekiwanie na 'wiśniowoczerwone zabarwienie skóry' – jest to objaw rzadki u żywych pacjentów (<2%), typowy dla zwłok po ciężkim śmiertelnym zaczadzeniu.",
        "Niedocenianie zatrucia CO u kobiety w ciąży – hemoglobina płodowa (HbF) wiąże CO silniej, stężenie COHb u płodu może być o 10–15% wyższe niż u matki, grożąc śmiercią wewnątrzmaciczną mimo dobrego stanu matki.",
        "Zaniechanie poinformowania pacjenta o ryzyku opóźnionego zespołu neuropsychiatrycznego (DNS), który może rozwinąć się po kilku tygodniach bezobjawowych."
      ]
    },
    diffTable: {
      title: "⚔️ Tabela Różnicowa: Ostre Zatrucie CO a Inne Przyczyny Hipoksji i Śpiączki",
      headers: ["Stan chorobowy", "Stężenie COHb (ko-oksymetria)", "Wskazanie standardowego SpO2", "Kluczowa cecha różnicująca", "Leczenie z wyboru"],
      rows: [
        ["Zatrucie tlenkiem węgla (CO)", "Podwyższone (>15–25%)", "Fałszywie prawidłowe (98–100%)", "Ekspozycja na dym/piecyk gazowy, kwasica mleczanowa", "100% tlen normobaryczny, komora HBO"],
        ["Zatrucie cyjankami (HCN)", "Prawidłowe (<2%, chyba że z pożaru)", "Prawidłowe lub obniżone", "Ekstremalna kwasica mleczanowa (>10 mmol/l), zapach gorzkich migdałów", "Hydroksykobalamina (Cyanokit 5 g i.v.)"],
        ["Methemoglobinemia", "Prawidłowe (podwyższone MetHb >10%)", "Fałszywie stałe ok. 85% oporne na tlen", "Czekoladowobrązowa krew, sinica nieustępująca po tlenie", "Błękit metylenowy (1–2 mg/kg i.v.)"],
        ["Ostra niewydolność oddechowa (ARDS)", "Prawidłowe (<2%)", "Rzeczywiście obniżone (<80–85%)", "Ciężkie zaburzenia wymiany gazowej, nacieki w RTG płuc", "Tlenoterapia wysokoprzepływowa (HFNO), wentylacja mechaniczna"],
        ["Zatrucie opioidami (przedawkowanie)", "Prawidłowe (<2%)", "Obniżone w wyniku hipowentylacji", "Triada: śpiączka, szpilkowate źrenice, bezdechy (RR <8)", "Nalokson miareczkowany i.v. do powrotu oddechu"]
      ]
    },
    lekQuestions: [
      {
        id: 1,
        q: "Dlaczego standardowy pulsoksymetr napalcowy (SpO2) jest całkowicie nieprzydatny i niemiarodajny w diagnostyce zatrucia tlenkiem węgla?",
        question: "Dlaczego standardowy pulsoksymetr napalcowy (SpO2) jest całkowicie nieprzydatny i niemiarodajny w diagnostyce zatrucia tlenkiem węgla?",
        opts: [
          "Ponieważ mierzy pochłanianie światła przy dwóch długościach fali i traktuje karboksyhemoglobinę jak oksyhemoglobinę, fałszywie zawyżając saturację",
          "Ponieważ tlenek węgla powoduje natychmiastowe zniszczenie czujników fotometrycznych we wszystkich pulsoksymetrach",
          "Ponieważ CO wywołuje tak silny skurcz naczyń obwodowych, że żaden aparat nie jest w stanie wygenerować fali tętna",
          "Ponieważ standardowe pulsoksymetry wykrywają wyłącznie cząsteczki dwutlenku węgla rozpuszczone w osoczu krwi",
          "Ponieważ tlenek węgla całkowicie eliminuje przepływ krwinek czerwonych przez włośniczki łożyska paznokciowego"
        ],
        options: [
          "Ponieważ mierzy pochłanianie światła przy dwóch długościach fali i traktuje karboksyhemoglobinę jak oksyhemoglobinę, fałszywie zawyżając saturację",
          "Ponieważ tlenek węgla powoduje natychmiastowe zniszczenie czujników fotometrycznych we wszystkich pulsoksymetrach",
          "Ponieważ CO wywołuje tak silny skurcz naczyń obwodowych, że żaden aparat nie jest w stanie wygenerować fali tętna",
          "Ponieważ standardowe pulsoksymetry wykrywają wyłącznie cząsteczki dwutlenku węgla rozpuszczone w osoczu krwi",
          "Ponieważ tlenek węgla całkowicie eliminuje przepływ krwinek czerwonych przez włośniczki łożyska paznokciowego"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Standardowa pulsoksymetria dwufalowa (660 i 940 nm) nie różnicuje oksyhemoglobiny i karboksyhemoglobiny, wykazując prawidłowe lub wysokie SpO2 mimo skrajnego niedotlenienia. Konieczny jest gazometr z ko-oksymetrem.",
        expl: "Standardowa pulsoksymetria dwufalowa (660 i 940 nm) nie różnicuje oksyhemoglobiny i karboksyhemoglobiny, wykazując prawidłowe lub wysokie SpO2 mimo skrajnego niedotlenienia. Konieczny jest gazometr z ko-oksymetrem.",
        explanation: "Standardowa pulsoksymetria dwufalowa (660 i 940 nm) nie różnicuje oksyhemoglobiny i karboksyhemoglobiny, wykazując prawidłowe lub wysokie SpO2 mimo skrajnego niedotlenienia. Konieczny jest gazometr z ko-oksymetrem."
      },
      {
        id: 2,
        q: "Okres półtrwania karboksyhemoglobiny (COHb) przy oddychaniu powietrzem atmosferycznym wynosi ok. 320 minut. Podanie 100% tlenu normobarycznego skraca ten czas do około:",
        question: "Okres półtrwania karboksyhemoglobiny (COHb) przy oddychaniu powietrzem atmosferycznym wynosi ok. 320 minut. Podanie 100% tlenu normobarycznego skraca ten czas do około:",
        opts: [
          "70–80 minut",
          "10–15 minut",
          "200–240 minut",
          "300–320 minut",
          "2–5 minut"
        ],
        options: [
          "70–80 minut",
          "10–15 minut",
          "200–240 minut",
          "300–320 minut",
          "2–5 minut"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Okres półtrwania COHb: na powietrzu atmosferycznym wynosi ok. 300–320 minut, przy 100% tlenie normobarycznym ok. 70–80 minut, a w komorze hiperbarycznej (HBO 3 ATA) ok. 20–25 minut.",
        expl: "Okres półtrwania COHb: na powietrzu atmosferycznym wynosi ok. 300–320 minut, przy 100% tlenie normobarycznym ok. 70–80 minut, a w komorze hiperbarycznej (HBO 3 ATA) ok. 20–25 minut.",
        explanation: "Okres półtrwania COHb: na powietrzu atmosferycznym wynosi ok. 300–320 minut, przy 100% tlenie normobarycznym ok. 70–80 minut, a w komorze hiperbarycznej (HBO 3 ATA) ok. 20–25 minut."
      },
      {
        id: 3,
        q: "Które ze stwierdzeń dotyczących wskazań do tlenoterapii hiperbarycznej (HBO) w zatruciu tlenkiem węgla u kobiety w ciąży jest PRAWDZIWE?",
        question: "Które ze stwierdzeń dotyczących wskazań do tlenoterapii hiperbarycznej (HBO) w zatruciu tlenkiem węgla u kobiety w ciąży jest PRAWDZIWE?",
        opts: [
          "Ciąża jest szczególnym wskazaniem do HBO, a próg stężenia COHb kwalifikujący do komory jest niższy niż u innych chorych (wynosi >15–20%)",
          "Ciąża stanowi bezwzględne przeciwwskazanie do terapii hiperbarycznej z powodu ryzyka teratogennego działania czystego tlenu",
          "U kobiet w ciąży kwalifikację do komory hiperbarycznej rozważa się wyłącznie przy stężeniu karboksyhemoglobiny przekraczającym 60%",
          "Kobieta w ciąży może być leczona w komorze HBO wyłącznie po wcześniejszym wykonaniu elektywnego cięcia cesarskiego",
          "Tlen hiperbaryczny nie przenika przez barierę łożyskową i nie wywiera żadnego wpływu na hemoglobinę płodu (HbF)"
        ],
        options: [
          "Ciąża jest szczególnym wskazaniem do HBO, a próg stężenia COHb kwalifikujący do komory jest niższy niż u innych chorych (wynosi >15–20%)",
          "Ciąża stanowi bezwzględne przeciwwskazanie do terapii hiperbarycznej z powodu ryzyka teratogennego działania czystego tlenu",
          "U kobiet w ciąży kwalifikację do komory hiperbarycznej rozważa się wyłącznie przy stężeniu karboksyhemoglobiny przekraczającym 60%",
          "Kobieta w ciąży może być leczona w komorze HBO wyłącznie po wcześniejszym wykonaniu elektywnego cięcia cesarskiego",
          "Tlen hiperbaryczny nie przenika przez barierę łożyskową i nie wywiera żadnego wpływu na hemoglobinę płodu (HbF)"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Płód jest szczególnie wrażliwy na CO (HbF wiąże CO silniej niż HbA, a oddawanie tlenu w tkankach płodu jest zablokowane). Dlatego ciąża jest silnym wskazaniem do HBO już przy COHb >15% lub objawach klinicznych.",
        expl: "Płód jest szczególnie wrażliwy na CO (HbF wiąże CO silniej niż HbA, a oddawanie tlenu w tkankach płodu jest zablokowane). Dlatego ciąża jest silnym wskazaniem do HBO już przy COHb >15% lub objawach klinicznych.",
        explanation: "Płód jest szczególnie wrażliwy na CO (HbF wiąże CO silniej niż HbA, a oddawanie tlenu w tkankach płodu jest zablokowane). Dlatego ciąża jest silnym wskazaniem do HBO już przy COHb >15% lub objawach klinicznych."
      },
      {
        id: 4,
        q: "W badaniach neuroobrazowych (TK / MR mózgu) u pacjentów po ciężkim zatruciu tlenkiem węgla najbardziej charakterystyczną lokalizacją zmian martwiczych są:",
        question: "W badaniach neuroobrazowych (TK / MR mózgu) u pacjentów po ciężkim zatruciu tlenkiem węgla najbardziej charakterystyczną lokalizacją zmian martwiczych są:",
        opts: [
          "Obustronne symetryczne ogniska hipodensyjne w gałkach bladych (globus pallidus) w jądrach podstawy",
          "Wybiórcze jednostronne uszkodzenie kory bieguna potylicznego bez zajęcia istoty białej",
          "Rozlane zwapnienia podkorowe w okolicy torebki wewnętrznej i wzgórza wzrokowego",
          "Izolowany zanik robaka móżdżku z zachowaniem prawidłowych półkul móżdżku",
          "Ogniskowe stwardnienie tętnic koła Willisa bez jakichkolwiek cech niedokrwienia miąższu"
        ],
        options: [
          "Obustronne symetryczne ogniska hipodensyjne w gałkach bladych (globus pallidus) w jądrach podstawy",
          "Wybiórcze jednostronne uszkodzenie kory bieguna potylicznego bez zajęcia istoty białej",
          "Rozlane zwapnienia podkorowe w okolicy torebki wewnętrznej i wzgórza wzrokowego",
          "Izolowany zanik robaka móżdżku z zachowaniem prawidłowych półkul móżdżku",
          "Ogniskowe stwardnienie tętnic koła Willisa bez jakichkolwiek cech niedokrwienia miąższu"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Gałka blada (globus pallidus) charakteryzuje się bardzo wysokim metabolizmem i zawartością żelaza, dlatego symetryczna obustronna martwica gałek bladych jest klasycznym objawem radiologicznym zatrucia CO.",
        expl: "Gałka blada (globus pallidus) charakteryzuje się bardzo wysokim metabolizmem i zawartością żelaza, dlatego symetryczna obustronna martwica gałek bladych jest klasycznym objawem radiologicznym zatrucia CO.",
        explanation: "Gałka blada (globus pallidus) charakteryzuje się bardzo wysokim metabolizmem i zawartością żelaza, dlatego symetryczna obustronna martwica gałek bladych jest klasycznym objawem radiologicznym zatrucia CO."
      },
      {
        id: 5,
        q: "Które z poniższych zjawisk patofizjologicznych NIE zachodzi pod wpływem toksycznego działania tlenku węgla na organizm ludzki?",
        question: "Które z poniższych zjawisk patofizjologicznych NIE zachodzi pod wpływem toksycznego działania tlenku węgla na organizm ludzki?",
        opts: [
          "Przesunięcie krzywej dysocjacji oksyhemoglobiny w prawo, ułatwiające oddawanie tlenu tkankom obwodowym",
          "Wiązanie CO z hemem oksydazy cytochromowej c i zablokowanie mitochondrialnego łańcucha oddechowego",
          "Tworzenie karboksyhemoglobiny upośledzającej transport tlenu z pęcherzyków płucnych do tkanek",
          "Wzrost stężenia kwasu mlekowego we krwi wskutek dominacji beztlenowej glikolizy w komórkach",
          "Zwiększone wytwarzanie reaktywnych form tlenu (RFT) i nasilenie peroksydacji lipidów mieliny"
        ],
        options: [
          "Przesunięcie krzywej dysocjacji oksyhemoglobiny w prawo, ułatwiające oddawanie tlenu tkankom obwodowym",
          "Wiązanie CO z hemem oksydazy cytochromowej c i zablokowanie mitochondrialnego łańcucha oddechowego",
          "Tworzenie karboksyhemoglobiny upośledzającej transport tlenu z pęcherzyków płucnych do tkanek",
          "Wzrost stężenia kwasu mlekowego we krwi wskutek dominacji beztlenowej glikolizy w komórkach",
          "Zwiększone wytwarzanie reaktywnych form tlenu (RFT) i nasilenie peroksydacji lipidów mieliny"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "CO przesuwa krzywą dysocjacji hemoglobiny W LEWO (efekt Haldane'a), co oznacza, że hemoglobina mocniej wiąże tlen i NIE CHCE go oddawać niedotlenionym komórkom.",
        expl: "CO przesuwa krzywą dysocjacji hemoglobiny W LEWO (efekt Haldane'a), co oznacza, że hemoglobina mocniej wiąże tlen i NIE CHCE go oddawać niedotlenionym komórkom.",
        explanation: "CO przesuwa krzywą dysocjacji hemoglobiny W LEWO (efekt Haldane'a), co oznacza, że hemoglobina mocniej wiąże tlen i NIE CHCE go oddawać niedotlenionym komórkom."
      },
      {
        id: 6,
        q: "Oceń prawdziwość zdań dotyczących ostrego zatrucia tlenkiem węgla:\nI. Opóźniony zespół neurologiczny (DNS) może wystąpić po 2 do 40 dniach od pozornego wyzdrowienia.\nII. Rutynowe stężenie COHb u nałogowych palaczy papierosów może fizjologicznie wynosić do 5–10%.\nIII. Objaw wiśniowoczerwonego zabarwienia skóry występuje powszechnie u ponad 80% żywych chorych.\nIV. Gazometria z ko-oksymetrią jest badaniem z wyboru w diagnostyce zatrucia CO.",
        question: "Oceń prawdziwość zdań dotyczących ostrego zatrucia tlenkiem węgla:\nI. Opóźniony zespół neurologiczny (DNS) może wystąpić po 2 do 40 dniach od pozornego wyzdrowienia.\nII. Rutynowe stężenie COHb u nałogowych palaczy papierosów może fizjologicznie wynosić do 5–10%.\nIII. Objaw wiśniowoczerwonego zabarwienia skóry występuje powszechnie u ponad 80% żywych chorych.\nIV. Gazometria z ko-oksymetrią jest badaniem z wyboru w diagnostyce zatrucia CO.",
        opts: [
          "Prawdziwe są zdania: I, II oraz IV",
          "Prawdziwe są zdania: I, III oraz IV",
          "Prawdziwe są zdania: II, III oraz IV",
          "Prawdziwe są zdania: I, II, III oraz IV",
          "Prawdziwe są wyłącznie zdania: II oraz III"
        ],
        options: [
          "Prawdziwe są zdania: I, II oraz IV",
          "Prawdziwe są zdania: I, III oraz IV",
          "Prawdziwe są zdania: II, III oraz IV",
          "Prawdziwe są zdania: I, II, III oraz IV",
          "Prawdziwe są wyłącznie zdania: II oraz III"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Zdania I, II i IV są prawdziwe. Zdanie III jest fałszywe – wiśniowe zabarwienie skóry występuje u żywych chorych niezmiernie rzadko (<2–3%) i jest głównie objawem sekcyjnym.",
        expl: "Zdania I, II i IV są prawdziwe. Zdanie III jest fałszywe – wiśniowe zabarwienie skóry występuje u żywych chorych niezmiernie rzadko (<2–3%) i jest głównie objawem sekcyjnym.",
        explanation: "Zdania I, II i IV są prawdziwe. Zdanie III jest fałszywe – wiśniowe zabarwienie skóry występuje u żywych chorych niezmiernie rzadko (<2–3%) i jest głównie objawem sekcyjnym."
      },
      {
        id: 7,
        q: "U pacjenta ewakuowanego z pożaru zamkniętego mieszkania z kwasicą mleczanową (mleczany 14 mmol/l) oprócz zatrucia CO należy zawsze podejrzewać jednoczesne zatrucie:",
        question: "U pacjenta ewakuowanego z pożaru zamkniętego mieszkania z kwasicą mleczanową (mleczany 14 mmol/l) oprócz zatrucia CO należy zawsze podejrzewać jednoczesne zatrucie:",
        opts: [
          "Cyjanowodorem (cyjankami) powstającym ze spalania tworzyw sztucznych i poliuretanu",
          "Metanolem spożytym w trakcie pożaru w celach konsumpcyjnych przez poszkodowanego",
          "Glikolem propylenowym ulatniającym się ze stopionych rur instalacji klimatyzacyjnej",
          "Związkami fosforoorganicznymi stosowanymi do impregnacji mebli tapicerowanych",
          "Rtęcią metaliczną uwolnioną ze zniszczonych termometrów i świetlówek domowych"
        ],
        options: [
          "Cyjanowodorem (cyjankami) powstającym ze spalania tworzyw sztucznych i poliuretanu",
          "Metanolem spożytym w trakcie pożaru w celach konsumpcyjnych przez poszkodowanego",
          "Glikolem propylenowym ulatniającym się ze stopionych rur instalacji klimatyzacyjnej",
          "Związkami fosforoorganicznymi stosowanymi do impregnacji mebli tapicerowanych",
          "Rtęcią metaliczną uwolnioną ze zniszczonych termometrów i świetlówek domowych"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Dym pożarowy (zwłaszcza spalanie pianek poliuretanowych, wełny, tworzyw) zawiera cyjanowodór (HCN). Ciężka kwasica mleczanowa (>8–10 mmol/l) po pożarze jest wskazaniem do podania antidotum – hydroksykobalaminy (Cyanokit).",
        expl: "Dym pożarowy (zwłaszcza spalanie pianek poliuretanowych, wełny, tworzyw) zawiera cyjanowodór (HCN). Ciężka kwasica mleczanowa (>8–10 mmol/l) po pożarze jest wskazaniem do podania antidotum – hydroksykobalaminy (Cyanokit).",
        explanation: "Dym pożarowy (zwłaszcza spalanie pianek poliuretanowych, wełny, tworzyw) zawiera cyjanowodór (HCN). Ciężka kwasica mleczanowa (>8–10 mmol/l) po pożarze jest wskazaniem do podania antidotum – hydroksykobalaminy (Cyanokit)."
      },
      {
        id: 8,
        q: "Co jest bezpośrednią przyczyną zgonu płodu w przebiegu ciężkiego zatrucia tlenkiem węgla u matki?",
        question: "Co jest bezpośrednią przyczyną zgonu płodu w przebiegu ciężkiego zatrucia tlenkiem węgla u matki?",
        opts: [
          "Głęboka hipoksja tkankowa płodu spowodowana wyższym powinowactwem HbF do CO i wolniejszą eliminacją CO z krążenia płodowego",
          "Mechaniczne przedwczesne oddzielenie łożyska w wyniku nadmiernej diurezy indukowanej tlenkiem węgla",
          "Wrodzone zarośnięcie przewodu tętniczego Botalla pod wpływem bezpośredniej stymulacji receptorów CO",
          "Piorunujące wewnątrzmaciczne krwawienie dokomorowe wywołane spadkiem syntezy protrombiny w wątrobie płodu",
          "Ostra małowodzie spowodowane zablokowaniem wydzielania moczu przez cewki nerkowe płodu"
        ],
        options: [
          "Głęboka hipoksja tkankowa płodu spowodowana wyższym powinowactwem HbF do CO i wolniejszą eliminacją CO z krążenia płodowego",
          "Mechaniczne przedwczesne oddzielenie łożyska w wyniku nadmiernej diurezy indukowanej tlenkiem węgla",
          "Wrodzone zarośnięcie przewodu tętniczego Botalla pod wpływem bezpośredniej stymulacji receptorów CO",
          "Piorunujące wewnątrzmaciczne krwawienie dokomorowe wywołane spadkiem syntezy protrombiny w wątrobie płodu",
          "Ostra małowodzie spowodowane zablokowaniem wydzielania moczu przez cewki nerkowe płodu"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Hemoglobina płodowa HbF wiąże CO silniej niż HbA, a gradient eliminacji przez łożysko jest niekorzystny dla płodu. Powoduje to wielogodzinną ciężką anoksję mózgu i serca płodu prowadzącą do asfiksji i zgonu.",
        expl: "Hemoglobina płodowa HbF wiąże CO silniej niż HbA, a gradient eliminacji przez łożysko jest niekorzystny dla płodu. Powoduje to wielogodzinną ciężką anoksję mózgu i serca płodu prowadzącą do asfiksji i zgonu.",
        explanation: "Hemoglobina płodowa HbF wiąże CO silniej niż HbA, a gradient eliminacji przez łożysko jest niekorzystny dla płodu. Powoduje to wielogodzinną ciężką anoksję mózgu i serca płodu prowadzącą do asfiksji i zgonu."
      },
      {
        id: 9,
        q: "Który z poniższych parametrów laboratoryjnych pozwala najdokładniej monitorować skuteczność wypierania CO podczas tlenoterapii?",
        question: "Który z poniższych parametrów laboratoryjnych pozwala najdokładniej monitorować skuteczność wypierania CO podczas tlenoterapii?",
        opts: [
          "Seryjne oznaczenia odsetka karboksyhemoglobiny (% COHb) w ko-oksymetrii krwi",
          "Pomiar saturacji hemoglobiny tlenem metodą pulsoksymetrii przezskórnej (SpO2)",
          "Oznaczanie całkowitego stężenia żelaza i ferrytyny w surowicy krwi co 6 godzin",
          "Pomiar stężenia bilirubiny pośredniej i bezpośredniej w dobowej zbiórce moczu",
          "Oznaczenie aktywności aminotransferazy alaninowej (AlAT) w surowicy krwi"
        ],
        options: [
          "Seryjne oznaczenia odsetka karboksyhemoglobiny (% COHb) w ko-oksymetrii krwi",
          "Pomiar saturacji hemoglobiny tlenem metodą pulsoksymetrii przezskórnej (SpO2)",
          "Oznaczanie całkowitego stężenia żelaza i ferrytyny w surowicy krwi co 6 godzin",
          "Pomiar stężenia bilirubiny pośredniej i bezpośredniej w dobowej zbiórce moczu",
          "Oznaczenie aktywności aminotransferazy alaninowej (AlAT) w surowicy krwi"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Jedynym miarodajnym wskaźnikiem eliminacji CO jest seryjny pomiar odsetka COHb w aparacie gazometrycznym z wielofalową ko-oksymetrią.",
        expl: "Jedynym miarodajnym wskaźnikiem eliminacji CO jest seryjny pomiar odsetka COHb w aparacie gazometrycznym z wielofalową ko-oksymetrią.",
        explanation: "Jedynym miarodajnym wskaźnikiem eliminacji CO jest seryjny pomiar odsetka COHb w aparacie gazometrycznym z wielofalową ko-oksymetrią."
      },
      {
        id: 10,
        q: "W sytuacji, gdy lekarz SOR podejrzewa zatrucie tlenkiem węgla u pacjenta zamieszkującego budynek wielorodzinny, zgodnie z zasadami zdrowia publicznego kluczowym działaniem pozaopiekuńczym jest:",
        question: "W sytuacji, gdy lekarz SOR podejrzewa zatrucie tlenkiem węgla u pacjenta zamieszkującego budynek wielorodzinny, zgodnie z zasadami zdrowia publicznego kluczowym działaniem pozaopiekuńczym jest:",
        opts: [
          "Niezwłoczne powiadomienie Państwowej Straży Pożarnej lub zarządcy budynku w celu natychmiastowej ewakuacji i kontroli pozostałych lokatorów",
          "Wstrzymanie się z jakimikolwiek powiadomieniami z uwagi na bezwzględny obowiązek zachowania tajemnicy lekarskiej",
          "Wystawienie mandatu karnego właścicielowi piecyka gazowego na podstawie przepisów kodeksu wykroczeń",
          "Zawiadomienie powiatowej stacji sanitarno-epidemiologicznej w trybie zgłoszenia choroby zakaźnej",
          "Zalecenie pacjentowi samodzielnego sprawdzenia drożności przewodów kominowych po powrocie do domu"
        ],
        options: [
          "Niezwłoczne powiadomienie Państwowej Straży Pożarnej lub zarządcy budynku w celu natychmiastowej ewakuacji i kontroli pozostałych lokatorów",
          "Wstrzymanie się z jakimikolwiek powiadomieniami z uwagi na bezwzględny obowiązek zachowania tajemnicy lekarskiej",
          "Wystawienie mandatu karnego właścicielowi piecyka gazowego na podstawie przepisów kodeksu wykroczeń",
          "Zawiadomienie powiatowej stacji sanitarno-epidemiologicznej w trybie zgłoszenia choroby zakaźnej",
          "Zalecenie pacjentowi samodzielnego sprawdzenia drożności przewodów kominowych po powrocie do domu"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Zatrucie CO w budynku wielorodzinnym stwarza bezpośrednie zagrożenie życia dla sąsiadów (przenikanie czadu przez wentylację). Lekarz może i powinien zaalarmować służby ratunkowe (stan wyższej konieczności uchyla tajemnicę lekarską).",
        expl: "Zatrucie CO w budynku wielorodzinnym stwarza bezpośrednie zagrożenie życia dla sąsiadów (przenikanie czadu przez wentylację). Lekarz może i powinien zaalarmować służby ratunkowe (stan wyższej konieczności uchyla tajemnicę lekarską).",
        explanation: "Zatrucie CO w budynku wielorodzinnym stwarza bezpośrednie zagrożenie życia dla sąsiadów (przenikanie czadu przez wentylację). Lekarz może i powinien zaalarmować służby ratunkowe (stan wyższej konieczności uchyla tajemnicę lekarską)."
      },
      {
        id: 11,
        q: "Które z poniższych wskazań klinicznych jest BEZWZGLĘDNYM kryterium skierowania dorosłego chorego do tlenoterapii hiperbarycznej (HBO)?",
        question: "Które z poniższych wskazań klinicznych jest BEZWZGLĘDNYM kryterium skierowania dorosłego chorego do tlenoterapii hiperbarycznej (HBO)?",
        opts: [
          "Utrata przytomności w wywiadzie, cechy ostrego niedokrwienia serca w EKG lub stężenie COHb przekraczające 25%",
          "Izolowany łagodny ból głowy ustępujący samoistnie po wyjściu na świeże powietrze przy COHb 8%",
          "Wystąpienie pojedynczego epizodu nudności bez wymiotów u wieloletniego palacza tytoniu",
          "Prawidłowy zapis EKG z częstością akcji serca 72/min i brakiem odchyleń neurologicznych",
          "Stężenie karboksyhemoglobiny na poziomie 12% u niebędącego w ciąży dorosłego bez objawów"
        ],
        options: [
          "Utrata przytomności w wywiadzie, cechy ostrego niedokrwienia serca w EKG lub stężenie COHb przekraczające 25%",
          "Izolowany łagodny ból głowy ustępujący samoistnie po wyjściu na świeże powietrze przy COHb 8%",
          "Wystąpienie pojedynczego epizodu nudności bez wymiotów u wieloletniego palacza tytoniu",
          "Prawidłowy zapis EKG z częstością akcji serca 72/min i brakiem odchyleń neurologicznych",
          "Stężenie karboksyhemoglobiny na poziomie 12% u niebędącego w ciąży dorosłego bez objawów"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Główne wskazania do HBO to: utrata przytomności, deficyty neurologiczne, niedokrwienie serca (ból dławicowy, uniesienia/obniżenia ST, wzrost troponin), ciężka kwasica metaboliczna, ciąża (COHb >15%) oraz COHb >25%.",
        expl: "Główne wskazania do HBO to: utrata przytomności, deficyty neurologiczne, niedokrwienie serca (ból dławicowy, uniesienia/obniżenia ST, wzrost troponin), ciężka kwasica metaboliczna, ciąża (COHb >15%) oraz COHb >25%.",
        explanation: "Główne wskazania do HBO to: utrata przytomności, deficyty neurologiczne, niedokrwienie serca (ból dławicowy, uniesienia/obniżenia ST, wzrost troponin), ciężka kwasica metaboliczna, ciąża (COHb >15%) oraz COHb >25%."
      }
    ],
    flashcards: [
      {
        q: "Dlaczego standardowy pulsoksymetr napalcowy (SpO2) jest mylący w zatruciu tlenkiem węgla?",
        a: "Nie odróżnia karboksyhemoglobiny (COHb) od oksyhemoglobiny, dając fałszywie prawidłowy wynik SpO2 99–100%."
      },
      {
        q: "Ile wynosi okres półtrwania COHb na powietrzu, przy 100% tlenie i w komorze HBO?",
        a: "Na powietrzu ok. 320 min; przy 100% tlenie ok. 70–80 min; w komorze HBO (3 ATA) ok. 20 min."
      },
      {
        q: "Jakie są główne wskazania do tlenoterapii hiperbarycznej (HBO)?",
        a: "Utrata przytomności, objawy neurologiczne, ciąża (COHb >15%), COHb >25%, niedokrwienie serca w EKG/troponina."
      },
      {
        q: "Dlaczego ciąża jest szczególnym wskazaniem do komory hiperbarycznej w zatruciu CO?",
        a: "Hemoglobina płodowa (HbF) silniej wiąże CO, a płód eliminuje CO znacznie wolniej, co grozi obumarciem."
      },
      {
        q: "Jaka struktura mózgu ulega najbardziej charakterystycznej martwicy w zatruciu CO?",
        a: "Gałka blada (globus pallidus) w jądrach podstawy (obustronne symetryczne uszkodzenie)."
      },
      {
        q: "Czym jest opóźniony zespół neurologiczny (DNS) po zatruciu CO?",
        a: "Demielinizacją i powikłaniami neuropsychiatrycznymi (parkinsonizm, otępienie) po 2–40 dniach 'okna bezobjawowego'."
      }
    ]
  },
  // =========================================================================
  // CASE 172: Ostre Zatrucie Glikolem Etylenowym
  // =========================================================================
  {
    id: 172,
    file: "172_zatrucie_glikolem_etylenowym.json",
    shortTitle: "Zatrucie Glikolem Etylenowym",
    title: "Toksykologiczny Stan Nagły: Ostre Zatrucie Glikolem Etylenowym",
    dept: "Toksykologia / SOR",
    diagnosisTitle: "Ciężkie Zatrucie Glikolem Etylenowym z Kwasicą z Dużą Luką Anionową i Niewydolnością Nerek",
    vitals: [
      { label: "Ciśnienie tętnicze (RR)", val: "142/88", unit: "mmHg", status: "vital-warn" },
      { label: "Częstość akcji serca (HR)", val: "118", unit: "/min", status: "vital-warn" },
      { label: "Częstość oddechów (RR)", val: "26", unit: "/min", status: "vital-crit" },
      { label: "Saturacja (SpO2)", val: "96", unit: "%", status: "vital-ok" },
      { label: "Temperatura ciała", val: "36.2", unit: "°C", status: "vital-ok" }
    ],
    story: "<p><strong>Pacjent:</strong> 45-letni mężczyzna przywieziony na SOR przez zespół ratownictwa medycznego w stanie głębokiego zaburzenia świadomości i ciężkiej duszności.</p><p><strong>Wywiad chorobowy:</strong> Mężczyzna został znaleziony przez żonę w przydomowym warsztacie obok opróżnionej butelki po samochodowym płynie do chłodnic (zawierającym glikol etylenowy). Początkowo (około 8–10 godzin temu) zachowywał się jak pod wpływem alkoholu, zataczał się i bełkotał, jednak rodzina nie wyczuwała od niego zapachu etanolu. Z czasem pojawiły się silne nudności, obfite wymioty, narastająca senność i apatia. Od kilku godzin oddech stał się niezwykle głęboki, głośny i przyspieszony (oddech Kussmaula). Pacjent oddał zaledwie kilkadziesiąt mililitrów ciemnego moczu. W wywiadzie: uzależnienie od alkoholu, próby samobójcze w przeszłości.</p><p><strong>Badanie przedmiotowe:</strong> Pacjent w stanie stuporu / soporu (GCS 9: O2V2M5), reaguje wyłącznie jękiem na silne bodźce bólowe. Skóra blada, chłodna, bez wykwitów. Oddech Kussmaula (26/min), tachykardia 118/min. W badaniu neurologicznym: symetrycznie wygórowane odruchy głębokie, obecne drżenia pęczkowe mięśni twarzy i kończyn (objaw Chvostka słabo dodatni z powodu hipokalcemii). Źrenice równe, dno oka bez obrzęku tarcz n. II (przemawia przeciw metanolowi). Mocz pobrany przez cewnik wykazuje zielonkawą fluorescencję w świetle lampy Wooda (obecność barwnika fluoresceiny dodawanego do płynów chłodniczych). Badania laboratoryjne: pH 7,06, pCO2 19 mmHg, HCO3- 5,5 mmol/l, BE -23 mmol/l, kwasica z wysoką luką anionową AG = 33 mmol/l (norma 8–12), luka osmolalna = 48 mOsm/kg H2O (norma <10). W osadzie moczu obecne liczne kryształy szczawianu wapnia w kształcie igieł i kopert; kreatynina 3,9 mg/dl, wapń 1,75 mmol/l.</p>",
    steps: [
      {
        title: "Krok 1: Natychmiastowa blokada enzymatyczna dehydrogenazy alkoholowej (ADH)",
        scenario: "Pacjent ma pH 7,06, lukę anionową 33 mmol/l i cechy ostrego zatrucia glikolem etylenowym. Toksyczność glikolu wynika z powstawania kwasu glikolowego i szczawiowego. Jaki schemat farmakoterapii odtrutkowej należy wdrożyć natychmiast na SOR?",
        options: [
          {
            text: "Natychmiastowe podanie swoistego inhibitora dehydrogenazy alkoholowej (fomepizol 15 mg/kg i.v.) lub wlewu 10% etanolu dożylnie (stężenie docelowe 1,0–1,5‰) w celu zahamowania powstawania toksycznych kwasów",
            correct: true,
            isCorrect: true,
            feedback: "✅ PRAWIDŁOWO! Fomepizol (selektywny inhibitor ADH o powinowactwie 8000x większym niż etanol) jest odtrutką z wyboru. Alternatywą jest etanol i.v., który jako substrat o wyższym powinowactwie do ADH blokuje utlenianie glikolu do toksycznego kwasu glikolowego i szczawiowego."
          },
          {
            text: "Podanie dożylne 100 mg flumazenilu w celu natychmiastowego odwrócenia toksycznego wpływu alkoholi niespożywczych na receptory GABA-A bez konieczności stosowania swoistych inhibitorów dehydrogenazy alkoholowej",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Flumazenil to antagonista benzodiazepin; nie wpływa na metabolizm glikolu i może wywołać drgawki u chorego w kwasicy metabolicznej."
          },
          {
            text: "Zastosowanie płukania żołądka węglem aktywowanym po 10 godzinach od spożycia płynu chłodniczego w połączeniu z osmotycznym środkiem przeczyszczającym w postaci siarczanu magnezu w dawce 30 gramów",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Alkohole wchłaniają się w ciągu 30–60 minut i nie wiążą się z węglem aktywowanym; płukanie żołądka po 10h grozi aspiracją i zgonem!"
          },
          {
            text: "Zalecenie wyłącznego intensywnego pojenia chorego doustnym sokiem pomarańczowym w celu dostarczenia witaminy C bez włączania jakichkolwiek leków blokujących dehydrogenazę alkoholową w wątrobie",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Sok pomarańczowy nie hamuje metabolizmu glikolu; opóźnienie wdrożenia fomepizolu/etanolu prowadzi do zgonu pacjenta."
          }
        ]
      },
      {
        title: "Krok 2: Kwalifikacja do hemodializy ratunkowej",
        scenario: "Pacjent prezentuje ciężką kwasicę metaboliczną (pH 7,06), oligurię, stężenie kreatyniny 3,9 mg/dl i zaburzenia świadomości. Jakie jest postępowanie eliminacyjne z wyboru?",
        options: [
          {
            text: "Pilne rozpoczęcie hemodializy przerywanej w celu jednoczesnego usunięcia niezmetabolizowanego glikolu etylenowego, eliminacji toksycznych kwasów organicznych oraz korekcji kwasicy",
            correct: true,
            isCorrect: true,
            feedback: "✅ PRAWIDŁOWO! Hemodializa jest bezwzględnie wskazana przy pH <7,25, kwasicy opornej, ostrej niewydolności nerek (AKI), zaburzeniach elektrolitowych oraz stężeniu glikolu >50 mg/dl. Usuwa cząsteczki glikolu i kwas glikolowy, ratując życie pacjenta."
          },
          {
            text: "Podanie dożylne 200 mg furosemidu w bolusie i oczekiwanie na samoistne wznowienie diurezy przez kolejne 24 godziny z całkowitym zaniechaniem procedur pozaustrojowych",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Furosemid nie odwróci ostrej martwicy cewek nerkowych wywołanej kryształami szczawianów; odwlekanie dializy doprowadzi do zgonu w obrzęku płuc lub hiperkaliemii."
          },
          {
            text: "Wykonanie pilnej plazmaferezy leczniczej w celu odfiltrowania krążących immunoglobulin i kompleksów immunologicznych przeciwko komórkom nabłonka cewek nerkowych",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Uszkodzenie nerek w zatruciu glikolem ma podłoże toksyczno-krystaliczne, a nie autoimmunologiczne; plazmafereza nie eliminuje małych cząsteczek glikolu."
          },
          {
            text: "Wdrożenie wyłącznie forsownej alkalizacji moczu wodorowęglanem sodu do pH moczu >8,5 jako w pełni wystarczającej metody zachowawczej zastępującej procedurę hemodializy",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Alkalizacja moczu nie zastąpi hemodializy w ostrej anurii i ciężkiej kwasicy pH 7,06; kwas szczawiowy krystalizuje niezależnie od pH."
          }
        ]
      },
      {
        title: "Krok 3: Farmakoterapia wspomagająca – kofaktory metaboliczne",
        scenario: "W trakcie dializy i leczenia odtrutkowego należy podać kofaktory enzymatyczne, które kierują metabolizm kwasu glioksalowego na nietoksyczne szlaki. Jaki zestaw witamin należy włączyć do terapii?",
        options: [
          {
            text: "Tiamina (witamina B1 100 mg i.v.) oraz pirydoksyna (witamina B6 100 mg i.v.) podawane co 6 godzin w celu przekierowania glioksalu na szlak glicyny i ketoadypinianu",
            correct: true,
            isCorrect: true,
            feedback: "✅ PRAWIDŁOWO! Tiamina (B1) i pirydoksyna (B6) są kofaktorami enzymów przekształcających toksyczny kwas glioksalowy w nieszkodliwy kwas alfa-hydroksy-beta-ketoadypinowy oraz glicynę, hamując powstawanie kwasu szczawiowego niszczącego nerki."
          },
          {
            text: "Kwas foliowy (lub folinian wapnia) w dawce 50 mg i.v. jako specyficzny i jedyny kofaktor enzymatyczny w zatruciu glikolem",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Kwas foliowy jest kofaktorem w zatruciu METANOLEM (przyspiesza rozkład mrówczanu), natomiast w zatruciu GLIKOLEM stosuje się tiaminę i pirydoksynę (B1 + B6)."
          },
          {
            text: "Witamina K1 w dawce 20 mg i.v. w celu pobudzenia wątrobowej syntezy czynników krzepnięcia zespołu protrombiny",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Witamina K nie wpływa na metabolizm glikolu etylenowego i nie zapobiega nefrotoksyczności szczawianów."
          },
          {
            text: "Witamina D3 w megadawce 100 000 j.m. dożylnie w celu natychmiastowego zredukowania wchłaniania szczawianów w nerkach",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Witamina D3 nie ma zastosowania ratunkowego i mogłaby nasilić hiperkalcemię po związaniu z kryształami."
          }
        ]
      }
    ],
    pathoNodes: [
      {
        id: "patho_1",
        title: "Metabolizm przez dehydrogenazę alkoholową (ADH) i kwas glikolowy",
        desc: "Sam glikol etylenowy jest związkiem o niskiej toksyczności, wywołującym jedynie efekt narkotyczny i lukę osmolalną. Dehydrogenaza alkoholowa (ADH) utlenia go do aldehydu glikolowego, który następnie przekształca się w kwas glikolowy. Kwas glikolowy odpowiada za ciężką kwasicę metaboliczną z luką anionową (HAGMA).",
        target: "Blokada ADH za pomocą fomepizolu lub etanolu hamująca generowanie kwasów"
      },
      {
        id: "patho_2",
        title: "Kwas szczawiowy, hipokalcemia i krystalizacja w cewkach nerkowych",
        desc: "Kwas glioksalowy utlenia się do kwasu szczawiowego, który wiąże jony wapnia, wywołując ciężką hipokalcemię i tężyczkę. Nierozpuszczalne kryształy szczawianu wapnia (monohydrat i dihydrat) odkładają się w świetle cewek nerkowych i naczyniach mózgowych, powodując ostrą martwicę cewek (ATN) i anurię.",
        target: "Hemodializa usuwająca glikol i metabolity oraz substytucja tiaminy i pirydoksyny"
      },
      {
        id: "patho_3",
        title: "Kwasica z luką anionową (HAGMA) i luką osmolalną",
        desc: "We wczesnej fazie dominuje wysoka luka osmolalna (obecność niezmetabolizowanego glikolu). W miarę postępu metabolizmu luka osmolalna maleje, a gwałtownie narasta luka anionowa (stężenie kwasu glikolowego). Prowadzi to do hamowania enzymów oddechowych i zapaści krążeniowej.",
        target: "Wczesna ocena luki anionowej i osmolalnej oraz pilna dializoterapia"
      }
    ],
    dutySummary: {
      diagnostics: "1. Ocena gazometrii tętniczej: ciężka kwasica metaboliczna z głębokim niedoborem zasad (BE), hipokapnia kompensacyjna (oddech Kussmaula).\n\n2. Obliczenie luki anionowej: AG = Na - (Cl + HCO3) [norma 8–12 mmol/l; w zatruciu >25–35 mmol/l] oraz luki osmolalnej: Osm_mierzona - Osm_wyliczona (2*Na + glukoza/18 + mocznik/2.8) [norma <10 mOsm/kg; wczesny wskaźnik >20–50].\n\n3. Badanie ogólne i osadu moczu: ocena obecności kryształów szczawianu wapnia (monohydrat – hantle/wrzeciona, dihydrat – koperty) oraz badanie fluorescencji w świetle lampy Wooda (obecność fluoresceiny z borygo).\n\n4. Badania biochemiczne: stężenie glikolu etylenowego we krwi (metodą chromatografii gazowej), mocznik, kreatynina, wapń całkowity i zjonizowany (hipokalcemia), kinaza kreatynowa (rabdomioliza).",
      drugsAndDoses: "• Fomepizol (odtrutka z wyboru): <span class=\"dose-pill\">dawka nasycająca 15 mg/kg i.v. w 100 ml 0,9% NaCl w ciągu 30 min</span>, następnie 10 mg/kg co 12h (podczas hemodializy podawać co 4h).\n• Etanol 10% i.v. (odtrutka alternatywna): <span class=\"dose-pill\">dawka nasycająca 8–10 ml/kg 10% etanolu w 5% glukozie</span> w ciągu 30 min, następnie wlew podtrzymujący 1–2 ml/kg/h (utrzymywać stężenie we krwi 1,0–1,5‰).\n• Tiamina (witamina B1): <span class=\"dose-pill\">100 mg i.v. co 6 godzin</span> (kofaktor metabolizmu glioksalu do ketoadypinianu).\n• Pirydoksyna (witamina B6): <span class=\"dose-pill\">100 mg i.v. co 6 godzin</span> (kofaktor transaminacji glioksalu do glicyny).\n• Glukonian wapnia 10%: <span class=\"dose-pill\">10–20 ml i.v. powoli</span> wyłącznie w objawowej hipokalcemii (tężyczka, wydłużenie QTc) – unikać rutynowego podawania bez objawów.",
      pitfalls: [
        "Mylenie zatrucia glikolem etylenowym z zatruciem metanolem – glikol uszkadza nerki (kryształy szczawianu wapnia w moczu, fluorescencja w lampie Wooda), podczas gdy metanol wybiórczo niszczy siatkówkę oka i nerw wzrokowy (obrzęk tarczy, mroczki, ślepota).",
        "Opóźnianie podania odtrutki (fomepizolu lub etanolu) w oczekiwaniu na wynik stężenia glikolu z zewnętrznego laboratorium toksykologicznego – przy ciężkiej kwasicy z wysoką luką anionową leczenie należy wdrożyć natychmiast na podstawie obrazu klinicznego.",
        "Rutynowe, agresywne wyrównywanie bezobjawowej hipokalcemii dożylnym wapniem – podaż wapnia nasila powstawanie kryształów szczawianu wapnia i przyspiesza nieodwracalne uszkodzenie nerek.",
        "Zaniechanie zwiększenia dawkowania fomepizolu lub etanolu w trakcie hemodializy – obie substancje są łatwo dializowalne, co bez modyfikacji dawki prowadzi do spadku stężenia odtrutki poniżej progu terapeutycznego."
      ]
    },
    diffTable: {
      title: "⚔️ Tabela Różnicowa: Ostre Zatrucia Alkoholami i Kwasice Metaboliczne",
      headers: ["Czynnik wywołujący", "Główne narządy uszkodzenia", "Charakterystyczne znalezisko laboratoryjne", "Odtrutka swoista", "Wskazanie do hemodializy"],
      rows: [
        ["Glikol etylenowy (płyn chłodniczy)", "Nerki (ostra martwica cewek, anuria)", "Kryształy szczawianu wapnia w moczu, hipokalcemia, fluorescencja w UV", "Fomepizol lub etanol + tiamina i pirydoksyna", "Ciężka kwasica pH <7,25, AKI, stężenie >50 mg/dl"],
        ["Metanol (alkohol metylowy)", "Siatkówka oka, nerw wzrokowy, jądra podstawy", "Obrzęk tarcz n. II, ślepota śnieżna, kwas mrówkowy we krwi", "Fomepizol lub etanol + kwas foliowy / folinowy", "Zaburzenia widzenia, kwasica pH <7,25, stężenie >50 mg/dl"],
        ["Alkohol izopropylowy (izopropanol)", "OUN (głęboka śpiączka, depresja oddechowa)", "Wysoka luka osmolalna, ketonuria/ketonemia BEZ kwasicy (aceton)", "Brak specyficznego antidotum (leczenie objawowe)", "Wyłącznie przy skrajnej niestabilności hemodynamicznej"],
        ["Cukrzycowa kwasica ketonowa (DKA)", "Odwodnienie, zaburzenia elektrolitowe", "Ciężka hiperglikemia (>250–300 mg/dl), obecność acetooctanu w moczu", "Insulinoterapia dożylna + intensywna płynoterapia", "Wyjątkowo rzadko (ciężka oporna mocznica/hiperkaliemia)"],
        ["Kwasica mleczanowa w sepsie/wstrząsie", "Wstrząs, niewydolność wielonarządowa", "Stężenie mleczanów >4–5 mmol/l, prawidłowa luka osmolalna", "Leczenie przyczynowe (antybiotyki, wazopresory, płyny)", "Wskazania nerkowe lub kwasica oporna na leczenie"]
      ]
    },
    lekQuestions: [
      {
        id: 1,
        q: "Obecność kryształów szczawianu wapnia (monohydratu w kształcie hantli lub dihydratu w kształcie kopert) w osadzie moczu u pacjenta z głęboką kwasicą metaboliczną jest patognomoniczna dla zatrucia:",
        question: "Obecność kryształów szczawianu wapnia (monohydratu w kształcie hantli lub dihydratu w kształcie kopert) w osadzie moczu u pacjenta z głęboką kwasicą metaboliczną jest patognomoniczna dla zatrucia:",
        opts: [
          "Glikolem etylenowym (składnikiem płynów do chłodnic samochodowych)",
          "Metanolem (alkoholem metylowym zawartym w skażonych rozpuszczalnikach)",
          "Izopropanolem (alkoholem izopropylowym w płynach do odkażania rąk)",
          "Kwasem acetylosalicylowym przyjętym w bardzo wysokich dawkach toksycznych",
          "Paracetamolem w fazie ostrego uszkodzenia miąższu wątroby i nerek"
        ],
        options: [
          "Glikolem etylenowym (składnikiem płynów do chłodnic samochodowych)",
          "Metanolem (alkoholem metylowym zawartym w skażonych rozpuszczalnikach)",
          "Izopropanolem (alkoholem izopropylowym w płynach do odkażania rąk)",
          "Kwasem acetylosalicylowym przyjętym w bardzo wysokich dawkach toksycznych",
          "Paracetamolem w fazie ostrego uszkodzenia miąższu wątroby i nerek"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Metabolitem glikolu etylenowego jest kwas szczawiowy, który łącząc się z wapniem tworzy kryształy szczawianu wapnia w cewkach nerkowych i osadzie moczu.",
        expl: "Metabolitem glikolu etylenowego jest kwas szczawiowy, który łącząc się z wapniem tworzy kryształy szczawianu wapnia w cewkach nerkowych i osadzie moczu.",
        explanation: "Metabolitem glikolu etylenowego jest kwas szczawiowy, który łącząc się z wapniem tworzy kryształy szczawianu wapnia w cewkach nerkowych i osadzie moczu."
      },
      {
        id: 2,
        q: "Lekiem z wyboru (swoistym inhibitorem dehydrogenazy alkoholowej) stosowanym w zatruciu glikolem etylenowym i metanolem jest:",
        question: "Lekiem z wyboru (swoistym inhibitorem dehydrogenazy alkoholowej) stosowanym w zatruciu glikolem etylenowym i metanolem jest:",
        opts: [
          "Fomepizol (4-metylopirazol podawany w powolnym wlewie i.v.)",
          "Flumazenil (wybiórczy antagonista receptorów benzodiazepin)",
          "Nalokson (czysty antagonista receptorów opioidowych mi)",
          "N-acetylocysteina (prekursor glutationu we wlewie i.v.)",
          "Hydroksykobalamina (związek wiążący cyjanki w krążeniu)"
        ],
        options: [
          "Fomepizol (4-metylopirazol podawany w powolnym wlewie i.v.)",
          "Flumazenil (wybiórczy antagonista receptorów benzodiazepin)",
          "Nalokson (czysty antagonista receptorów opioidowych mi)",
          "N-acetylocysteina (prekursor glutationu we wlewie i.v.)",
          "Hydroksykobalamina (związek wiążący cyjanki w krążeniu)"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Fomepizol jest odtrutką z wyboru – kompetycyjnie blokuje dehydrogenazę alkoholową (ADH) z powinowactwem 8000x większym niż etanol, nie wywołując hipoglikemii ani sedacji.",
        expl: "Fomepizol jest odtrutką z wyboru – kompetycyjnie blokuje dehydrogenazę alkoholową (ADH) z powinowactwem 8000x większym niż etanol, nie wywołując hipoglikemii ani sedacji.",
        explanation: "Fomepizol jest odtrutką z wyboru – kompetycyjnie blokuje dehydrogenazę alkoholową (ADH) z powinowactwem 8000x większym niż etanol, nie wywołując hipoglikemii ani sedacji."
      },
      {
        id: 3,
        q: "Kwasica metaboliczna w zatruciu glikolem etylenowym jest wywołana przede wszystkim kumulacją we krwi:",
        question: "Kwasica metaboliczna w zatruciu glikolem etylenowym jest wywołana przede wszystkim kumulacją we krwi:",
        opts: [
          "Kwasu glikolowego (głównego kwaśnego metabolitu glikolu)",
          "Kwasu mrówkowego (metabolitu alkoholu metylowego)",
          "Kwasu beta-hydroksymasłowego w komórkach miąższu wątroby",
          "Kwasu acetylooctowego wydalanego przez cewki nerkowe",
          "Kwasu hipurowego powstającego po inhalacji toluenu"
        ],
        options: [
          "Kwasu glikolowego (głównego kwaśnego metabolitu glikolu)",
          "Kwasu mrówkowego (metabolitu alkoholu metylowego)",
          "Kwasu beta-hydroksymasłowego w komórkach miąższu wątroby",
          "Kwasu acetylooctowego wydalanego przez cewki nerkowe",
          "Kwasu hipurowego powstającego po inhalacji toluenu"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Za ciężką kwasicę metaboliczną z dużą luką anionową odpowiada kwas glikolowy, powstający z aldehydu glikolowego; kwas szczawiowy odpowiada natomiast za hipokalcemię i nefrotoksyczność.",
        expl: "Za ciężką kwasicę metaboliczną z dużą luką anionową odpowiada kwas glikolowy, powstający z aldehydu glikolowego; kwas szczawiowy odpowiada natomiast za hipokalcemię i nefrotoksyczność.",
        explanation: "Za ciężką kwasicę metaboliczną z dużą luką anionową odpowiada kwas glikolowy, powstający z aldehydu glikolowego; kwas szczawiowy odpowiada natomiast za hipokalcemię i nefrotoksyczność."
      },
      {
        id: 4,
        q: "Który z poniższych kofaktorów enzymatycznych podaje się w zatruciu glikolem etylenowym w celu przekierowania glioksalu na szlak nieszkodliwej glicyny?",
        question: "Który z poniższych kofaktorów enzymatycznych podaje się w zatruciu glikolem etylenowym w celu przekierowania glioksalu na szlak nieszkodliwej glicyny?",
        opts: [
          "Pirydoksynę (witaminę B6 w dawce 100 mg i.v.) oraz tiaminę (witaminę B1)",
          "Kwas foliowy (witaminę B9 w dawce 50 mg i.v.) oraz cyjanokobalaminę",
          "Kwas askorbinowy (witaminę C) w dawce 10 gramów we wlewie dożylnym",
          "Tokoferol (witaminę E) w iniekcjach domięśniowych co 12 godzin",
          "Menadion (witaminę K3) w celu stymulacji dekarboksylacji wątrobowej"
        ],
        options: [
          "Pirydoksynę (witaminę B6 w dawce 100 mg i.v.) oraz tiaminę (witaminę B1)",
          "Kwas foliowy (witaminę B9 w dawce 50 mg i.v.) oraz cyjanokobalaminę",
          "Kwas askorbinowy (witaminę C) w dawce 10 gramów we wlewie dożylnym",
          "Tokoferol (witaminę E) w iniekcjach domięśniowych co 12 godzin",
          "Menadion (witaminę K3) w celu stymulacji dekarboksylacji wątrobowej"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Pirydoksyna (B6) stymuluje transaminazę glioksalanową przekształcającą kwas glioksalowy w glicynę, a tiamina (B1) ułatwia powstawanie alfa-hydroksy-beta-ketoadypinianu.",
        expl: "Pirydoksyna (B6) stymuluje transaminazę glioksalanową przekształcającą kwas glioksalowy w glicynę, a tiamina (B1) ułatwia powstawanie alfa-hydroksy-beta-ketoadypinianu.",
        explanation: "Pirydoksyna (B6) stymuluje transaminazę glioksalanową przekształcającą kwas glioksalowy w glicynę, a tiamina (B1) ułatwia powstawanie alfa-hydroksy-beta-ketoadypinianu."
      },
      {
        id: 5,
        q: "Fluorescencja moczu w świetle lampy Wooda u pacjenta podejrzanego o spożycie płynu do chłodnic wynika z obecności:",
        question: "Fluorescencja moczu w świetle lampy Wooda u pacjenta podejrzanego o spożycie płynu do chłodnic wynika z obecności:",
        opts: [
          "Fluoresceiny sodowej dodawanej przez producentów jako barwnik techniczny do płynów chłodniczych",
          "Bezpośredniej fluorescencji własnej cząsteczek glikolu etylenowego w świetle ultrafioletowym",
          "Fluoryzujących kryształów fosforanu magnezowo-amonowego w zasadowym odczynie moczu",
          "Związków porfirynowych indukowanych gwałtowną blokadą syntazy hemu w erytroblastach",
          "Metabolitów bilirubiny sprzężonej wydalanej z moczem w ostrej martwicy wątroby"
        ],
        options: [
          "Fluoresceiny sodowej dodawanej przez producentów jako barwnik techniczny do płynów chłodniczych",
          "Bezpośredniej fluorescencji własnej cząsteczek glikolu etylenowego w świetle ultrafioletowym",
          "Fluoryzujących kryształów fosforanu magnezowo-amonowego w zasadowym odczynie moczu",
          "Związków porfirynowych indukowanych gwałtowną blokadą syntazy hemu w erytroblastach",
          "Metabolitów bilirubiny sprzężonej wydalanej z moczem w ostrej martwicy wątroby"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Do płynów chłodniczych (np. borygo, petrygo) dodaje się fluoresceinę w celu ułatwienia lokalizacji wycieków w samochodzie. Po spożyciu jest ona wydalana z moczem i fluoryzuje na żółto-zielono w UV.",
        expl: "Do płynów chłodniczych (np. borygo, petrygo) dodaje się fluoresceinę w celu ułatwienia lokalizacji wycieków w samochodzie. Po spożyciu jest ona wydalana z moczem i fluoryzuje na żółto-zielono w UV.",
        explanation: "Do płynów chłodniczych (np. borygo, petrygo) dodaje się fluoresceinę w celu ułatwienia lokalizacji wycieków w samochodzie. Po spożyciu jest ona wydalana z moczem i fluoryzuje na żółto-zielono w UV."
      },
      {
        id: 6,
        q: "Oceń prawdziwość zdań dotyczących zatruć toksycznymi alkoholami:\nI. Luka osmolalna jest najwyższa we wczesnej fazie zatrucia, zanim alkohol ulegnie metabolizmowi.\nII. W zatruciu metanolem kwasica wynika z akumulacji kwasu mrówkowego niszczącego nerw wzrokowy.\nIII. Etanol w stężeniu 1,0–1,5 promila skutecznie blokuje metabolizm glikolu i metanolu.\nIV. Płukanie żołądka z węglem aktywowanym po 6 godzinach od spożycia jest wysoce skuteczne.",
        question: "Oceń prawdziwość zdań dotyczących zatruć toksycznymi alkoholami:\nI. Luka osmolalna jest najwyższa we wczesnej fazie zatrucia, zanim alkohol ulegnie metabolizmowi.\nII. W zatruciu metanolem kwasica wynika z akumulacji kwasu mrówkowego niszczącego nerw wzrokowy.\nIII. Etanol w stężeniu 1,0–1,5 promila skutecznie blokuje metabolizm glikolu i metanolu.\nIV. Płukanie żołądka z węglem aktywowanym po 6 godzinach od spożycia jest wysoce skuteczne.",
        opts: [
          "Prawdziwe są zdania: I, II oraz III",
          "Prawdziwe są zdania: I, III oraz IV",
          "Prawdziwe są zdania: II, III oraz IV",
          "Prawdziwe są zdania: I, II, III oraz IV",
          "Prawdziwe są wyłącznie zdania: I oraz IV"
        ],
        options: [
          "Prawdziwe są zdania: I, II oraz III",
          "Prawdziwe są zdania: I, III oraz IV",
          "Prawdziwe są zdania: II, III oraz IV",
          "Prawdziwe są zdania: I, II, III oraz IV",
          "Prawdziwe są wyłącznie zdania: I oraz IV"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Zdania I, II i III są prawdziwe. Zdanie IV jest fałszywe – alkohole wchłaniają się błyskawicznie i nie wiążą z węglem aktywnym.",
        expl: "Zdania I, II i III są prawdziwe. Zdanie IV jest fałszywe – alkohole wchłaniają się błyskawicznie i nie wiążą z węglem aktywnym.",
        explanation: "Zdania I, II i III są prawdziwe. Zdanie IV jest fałszywe – alkohole wchłaniają się błyskawicznie i nie wiążą z węglem aktywnym."
      },
      {
        id: 7,
        q: "Dlaczego rutynowe podawanie preparatów wapnia w bezobjawowej hipokalcemii w przebiegu zatrucia glikolem etylenowym jest NIEWSKAZANE?",
        question: "Dlaczego rutynowe podawanie preparatów wapnia w bezobjawowej hipokalcemii w przebiegu zatrucia glikolem etylenowym jest NIEWSKAZANE?",
        opts: [
          "Ponieważ dostarczenie jonów wapnia nasila wytrącanie nierozpuszczalnych kryształów szczawianu wapnia i potęguje uszkodzenie nerek",
          "Ponieważ wapń wchodzi w bezpośrednią reakcję chemiczną z fomepizolem, całkowicie unieczynniając odtrutkę",
          "Ponieważ jony wapnia stymulują ekspresję dehydrogenazy alkoholowej w hepatocytach, przyspieszając intoksykację",
          "Ponieważ w kwasicy metabolicznej jony wapnia wywołują natychmiastowe zatrzymanie krążenia w asystolii",
          "Ponieważ sole wapnia uniemożliwiają przeprowadzenie procedury hemodializy przez wykrzepianie dializatora"
        ],
        options: [
          "Ponieważ dostarczenie jonów wapnia nasila wytrącanie nierozpuszczalnych kryształów szczawianu wapnia i potęguje uszkodzenie nerek",
          "Ponieważ wapń wchodzi w bezpośrednią reakcję chemiczną z fomepizolem, całkowicie unieczynniając odtrutkę",
          "Ponieważ jony wapnia stymulują ekspresję dehydrogenazy alkoholowej w hepatocytach, przyspieszając intoksykację",
          "Ponieważ w kwasicy metabolicznej jony wapnia wywołują natychmiastowe zatrzymanie krążenia w asystolii",
          "Ponieważ sole wapnia uniemożliwiają przeprowadzenie procedury hemodializy przez wykrzepianie dializatora"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Podaż wapnia zwiększa produkt rozpuszczalności szczawianu wapnia, powodując masową krystalizację w nerkach, sercu i mózgu. Wapń podaje się wyłącznie przy objawowej tężyczce lub wydłużeniu QTc.",
        expl: "Podaż wapnia zwiększa produkt rozpuszczalności szczawianu wapnia, powodując masową krystalizację w nerkach, sercu i mózgu. Wapń podaje się wyłącznie przy objawowej tężyczce lub wydłużeniu QTc.",
        explanation: "Podaż wapnia zwiększa produkt rozpuszczalności szczawianu wapnia, powodując masową krystalizację w nerkach, sercu i mózgu. Wapń podaje się wyłącznie przy objawowej tężyczce lub wydłużeniu QTc."
      },
      {
        id: 8,
        q: "Wzór na obliczenie luki anionowej w surowicy krwi (Anion Gap - AG) to:",
        question: "Wzór na obliczenie luki anionowej w surowicy krwi (Anion Gap - AG) to:",
        opts: [
          "AG = [Na+] - ([Cl-] + [HCO3-])",
          "AG = ([Na+] + [K+]) - [Cl-]",
          "AG = [Cl-] - ([Na+] + [HCO3-])",
          "AG = [Na+] / ([Cl-] * [HCO3-])",
          "AG = [HCO3-] - ([Na+] - [Cl-])"
        ],
        options: [
          "AG = [Na+] - ([Cl-] + [HCO3-])",
          "AG = ([Na+] + [K+]) - [Cl-]",
          "AG = [Cl-] - ([Na+] + [HCO3-])",
          "AG = [Na+] / ([Cl-] * [HCO3-])",
          "AG = [HCO3-] - ([Na+] - [Cl-])"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Luka anionowa odzwierciedla stężenie niemierzonych anionów (np. mleczanów, szczawianów, mrówczanu, ciał ketonowych). Standardowy wzór: AG = Na+ - (Cl- + HCO3-). Norma wynosi 8–12 mmol/l.",
        expl: "Luka anionowa odzwierciedla stężenie niemierzonych anionów (np. mleczanów, szczawianów, mrówczanu, ciał ketonowych). Standardowy wzór: AG = Na+ - (Cl- + HCO3-). Norma wynosi 8–12 mmol/l.",
        explanation: "Luka anionowa odzwierciedla stężenie niemierzonych anionów (np. mleczanów, szczawianów, mrówczanu, ciał ketonowych). Standardowy wzór: AG = Na+ - (Cl- + HCO3-). Norma wynosi 8–12 mmol/l."
      },
      {
        id: 9,
        q: "Który z poniższych alkoholi NIE powoduje kwasicy metabolicznej, a w procesie metabolizmu przekształca się do acetonu dając izolowaną ketonemię i ketonurię?",
        question: "Który z poniższych alkoholi NIE powoduje kwasicy metabolicznej, a w procesie metabolizmu przekształca się do acetonu dając izolowaną ketonemię i ketonurię?",
        opts: [
          "Alkohol izopropylowy (izopropanol)",
          "Alkohol metylowy (metanol techniczny)",
          "Glikol etylenowy (płyn borygo)",
          "Glikol dietylenowy w hydraulice",
          "Alkohol benzylowy w kosmetykach"
        ],
        options: [
          "Alkohol izopropylowy (izopropanol)",
          "Alkohol metylowy (metanol techniczny)",
          "Glikol etylenowy (płyn borygo)",
          "Glikol dietylenowy w hydraulice",
          "Alkohol benzylowy w kosmetykach"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Izopropanol utlenia się przez ADH do acetonu. Aceton nie jest kwasem, dlatego zatrucie izopropanolem objawia się wysoką luką osmolalną i ketozą, ale BEZ kwasicy metabolicznej.",
        expl: "Izopropanol utlenia się przez ADH do acetonu. Aceton nie jest kwasem, dlatego zatrucie izopropanolem objawia się wysoką luką osmolalną i ketozą, ale BEZ kwasicy metabolicznej.",
        explanation: "Izopropanol utlenia się przez ADH do acetonu. Aceton nie jest kwasem, dlatego zatrucie izopropanolem objawia się wysoką luką osmolalną i ketozą, ale BEZ kwasicy metabolicznej."
      },
      {
        id: 10,
        q: "Zgodnie z przepisami dotyczącymi postępowania z pacjentem po próbie samobójczej poprzez celowe spożycie płynu do chłodnic, po ustabilizowaniu stanu somatycznego:",
        question: "Zgodnie z przepisami dotyczącymi postępowania z pacjentem po próbie samobójczej poprzez celowe spożycie płynu do chłodnic, po ustabilizowaniu stanu somatycznego:",
        opts: [
          "Konieczna jest obligatoryjna konsultacja psychiatryczna w celu oceny ryzyka samobójczego i ewentualnego przyjęcia na oddział psychiatryczny",
          "Pacjent może zostać bezwzględnie wypisany do domu na własne żądanie bez jakiejkolwiek oceny stanu psychicznego",
          "Lekarz ma prawny obowiązek złożyć doniesienie do prokuratury o popełnieniu przestępstwa targnięcia się na własne życie",
          "Szpital ma obowiązek obciążyć pacjenta pełnymi kosztami zużytego fomepizolu i procedury hemodializy",
          "Karta zgonu musi zostać wystawiona in blanco na wypadek późniejszych powikłań nefrologicznych"
        ],
        options: [
          "Konieczna jest obligatoryjna konsultacja psychiatryczna w celu oceny ryzyka samobójczego i ewentualnego przyjęcia na oddział psychiatryczny",
          "Pacjent może zostać bezwzględnie wypisany do domu na własne żądanie bez jakiejkolwiek oceny stanu psychicznego",
          "Lekarz ma prawny obowiązek złożyć doniesienie do prokuratury o popełnieniu przestępstwa targnięcia się na własne życie",
          "Szpital ma obowiązek obciążyć pacjenta pełnymi kosztami zużytego fomepizolu i procedury hemodializy",
          "Karta zgonu musi zostać wystawiona in blanco na wypadek późniejszych powikłań nefrologicznych"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Każda próba samobójcza wymaga bezwzględnej konsultacji psychiatrycznej przed opuszczeniem szpitala w celu oceny ryzyka nawrotu i wskazań do hospitalizacji psychiatrycznej (w tym na podstawie art. 23 lub 24 ustawy o ochronie zdrowia psychicznego).",
        expl: "Każda próba samobójcza wymaga bezwzględnej konsultacji psychiatrycznej przed opuszczeniem szpitala w celu oceny ryzyka nawrotu i wskazań do hospitalizacji psychiatrycznej (w tym na podstawie art. 23 lub 24 ustawy o ochronie zdrowia psychicznego).",
        explanation: "Każda próba samobójcza wymaga bezwzględnej konsultacji psychiatrycznej przed opuszczeniem szpitala w celu oceny ryzyka nawrotu i wskazań do hospitalizacji psychiatrycznej (w tym na podstawie art. 23 lub 24 ustawy o ochronie zdrowia psychicznego)."
      },
      {
        id: 11,
        q: "Podczas jednoczesnego stosowania odtrutki (fomepizolu lub etanolu) oraz wykonywania hemodializy u pacjenta zatrutego glikolem etylenowym należy pamiętać o:",
        question: "Podczas jednoczesnego stosowania odtrutki (fomepizolu lub etanolu) oraz wykonywania hemodializy u pacjenta zatrutego glikolem etylenowym należy pamiętać o:",
        opts: [
          "Konieczności zwiększenia dawkowania odtrutki lub skrócenia odstępów między dawkami, ponieważ fomepizol i etanol są bardzo łatwo usuwane przez dializator",
          "Całkowitym wstrzymaniu podawania odtrutki na czas trwania hemodializy z powodu ryzyka zatkania porów błony dializacyjnej przez cząsteczki leku",
          "Zmniejszeniu dawki etanolu o 80% w celu zapobieżenia gwałtownej kumulacji alkoholu w osoczu w trakcie trwania zabiegu nerkozastępczego",
          "Zastąpieniu dializatora wysokoprzepływowego techniką filtracji osocza na kolumnach węglowych z jednoczesnym podaniem heparyny",
          "Konieczności natychmiastowego przetoczenia 4 jednostek świeżo mrożonego osocza w celu neutralizacji wolnego fomepizolu w surowicy"
        ],
        options: [
          "Konieczności zwiększenia dawkowania odtrutki lub skrócenia odstępów między dawkami, ponieważ fomepizol i etanol są bardzo łatwo usuwane przez dializator",
          "Całkowitym wstrzymaniu podawania odtrutki na czas trwania hemodializy z powodu ryzyka zatkania porów błony dializacyjnej przez cząsteczki leku",
          "Zmniejszeniu dawki etanolu o 80% w celu zapobieżenia gwałtownej kumulacji alkoholu w osoczu w trakcie trwania zabiegu nerkozastępczego",
          "Zastąpieniu dializatora wysokoprzepływowego techniką filtracji osocza na kolumnach węglowych z jednoczesnym podaniem heparyny",
          "Konieczności natychmiastowego przetoczenia 4 jednostek świeżo mrożonego osocza w celu neutralizacji wolnego fomepizolu w surowicy"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Fomepizol i etanol to małe cząsteczki rozpuszczalne w wodzie, które są szybko wypłukiwane podczas hemodializy. Dawkowanie fomepizolu w dializie zwiększa się (podawanie co 4h zamiast co 12h), a wlew etanolu zwiększa się o ok. 50–100%.",
        expl: "Fomepizol i etanol to małe cząsteczki rozpuszczalne w wodzie, które są szybko wypłukiwane podczas hemodializy. Dawkowanie fomepizolu w dializie zwiększa się (podawanie co 4h zamiast co 12h), a wlew etanolu zwiększa się o ok. 50–100%.",
        explanation: "Fomepizol i etanol to małe cząsteczki rozpuszczalne w wodzie, które są szybko wypłukiwane podczas hemodializy. Dawkowanie fomepizolu w dializie zwiększa się (podawanie co 4h zamiast co 12h), a wlew etanolu zwiększa się o ok. 50–100%."
      }
    ],
    flashcards: [
      {
        q: "Który metabolit glikolu etylenowego odpowiada za ciężką kwasicę metaboliczną z luką anionową?",
        a: "Kwas glikolowy (powstający z aldehydu glikolowego pod wpływem dehydrogenazy aldehydowej)."
      },
      {
        q: "Jakie znalezisko w badaniu osadu moczu jest patognomoniczne dla zatrucia glikolem etylenowym?",
        a: "Obecność kryształów szczawianu wapnia (monohydratu w kształcie hantli i dihydratu w kształcie kopert)."
      },
      {
        q: "Jaka jest odtrutka z wyboru w zatruciu glikolem etylenowym i metanolem?",
        a: "Fomepizol (selektywny inhibitor ADH) lub alternatywnie 10% etanol i.v."
      },
      {
        q: "Dlaczego w świetle lampy Wooda mocz zatrutego płynem chłodniczym fluoryzuje?",
        a: "Z powodu fluoresceiny dodawanej przez producentów do płynów chłodniczych (np. borygo)."
      },
      {
        q: "Jakie kofaktory witaminowe podaje się w zatruciu glikolem w celu ochrony nerek?",
        a: "Tiaminę (witaminę B1) i pirydoksynę (witaminę B6) w celu przekierowania glioksalu na szlak glicyny."
      },
      {
        q: "Dlaczego bezobjawowa hipokalcemia w zatruciu glikolem nie powinna być agresywnie korygowana wapniem?",
        a: "Podaż wapnia nasila wytrącanie kryształów szczawianu wapnia w cewkach nerkowych, pogłębiając anurię."
      }
    ]
  }
];

console.log("Validating Case 171...");
casesData.forEach(c => {
  const errs = validateCase(c);
  if (errs.length > 0) {
    console.error(`Errors in case ${c.id}:`, errs);
    process.exit(1);
  }
});

async function run() {
  for (const c of casesData) {
    const enc = await encryptStringAes(JSON.stringify(c, null, 2), MASTER_KEY);
    const outPath = path.join(__dirname, '..', 'cases', c.file);
    fs.writeFileSync(outPath, JSON.stringify(enc, null, 2), 'utf8');
    console.log(`✓ Case #${c.id} (${c.file}) saved and encrypted.`);
  }
}

run().catch(console.error);

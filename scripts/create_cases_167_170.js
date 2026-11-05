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
  // CASE 167: Kolka Nerkowa i Kamica Moczowodowa
  // =========================================================================
  {
    id: 167,
    file: "167_kolka_nerkowa_kamica.json",
    shortTitle: "Kolka Nerkowa (Kamica)",
    title: "Urologiczny Stan Nagły: Ostra Kolka Nerkowa i Kamica Moczowodowa",
    dept: "Urologia / SOR",
    diagnosisTitle: "Ostra Kolka Nerkowa w Przebiegu Zastoinowej Kamicy Moczowodowej (Urolithiasis)",
    vitals: [
      { label: "Ciśnienie tętnicze (RR)", val: "158/92", unit: "mmHg", status: "vital-warn" },
      { label: "Częstość akcji serca (HR)", val: "96", unit: "/min", status: "vital-warn" },
      { label: "Częstość oddechów (RR)", val: "18", unit: "/min", status: "vital-ok" },
      { label: "Saturacja (SpO2)", val: "98", unit: "%", status: "vital-ok" },
      { label: "Temperatura ciała", val: "36.9", unit: "°C", status: "vital-ok" }
    ],
    story: "<p><strong>Pacjent:</strong> 39-letni mężczyzna przywieziony przez zespół ratownictwa medycznego na SOR z powodu ostrego, narastającego bólu okolicy lędźwiowej prawej.</p><p><strong>Wywiad chorobowy:</strong> Ból rozpoczął się nagle wczesnym rankiem (ok. 4:00), ma charakter kurczowy, falowy i niezwykle silny (10/10 w skali NRS). Dolegliwości promieniują wzdłuż moczowodu do prawego dołu biodrowego, pachwiny oraz prawego jądra. Towarzyszą im silne nudności, dwukrotne wymioty treścią pokarmową oraz częste parcie na mocz z oddawaniem zaledwie kilku kropel ciemnego, podbarwionego krwią moczu (krwiomocz mikroskopowy). W wywiadzie: siedzący tryb życia, mała objętość wypijanych płynów (ok. 1 l/dobę), wysokie spożycie białka zwierzęcego i soli; wcześniej nie leczył się na kamicę nerkową.</p><p><strong>Badanie przedmiotowe:</strong> Pacjent skrajnie niespokojny, blady, zlewne poty, nieustannie zmienia pozycję ciała na kozetce (tzw. chory miotający się z bólu, nie znajduje pozycji przynoszącej ulgę). Brzuch miękki, bez objawów otrzewnowych (objaw Blumberga ujemny), występuje wyraźna bolesność uciskowa w prawym śródbrzuszu i podbrzuszu w rzucie moczowodu. Objaw Goldflama po stronie prawej wybitnie dodatni (silny ból wyzwalany nawet delikatnym wstrząsaniem okolicy lędźwiowej), po lewej ujemny. W USG jamy brzusznej wykonanym przyłóżkowo (POCUS): poszerzenie układu kielichowo-miedniczkowego (UKM) prawej nerki (wymiar AP miedniczki 24 mm), w odcinku przypęcherzowym prawego moczowodu widoczny hiperechogeniczny złóg o średnicy 7 mm dający wyraźny cień akustyczny; nerka lewa bez cech zastoju.</p>",
    steps: [
      {
        title: "Krok 1: Wybór leczenia przeciwbólowego I rzutu na SOR",
        scenario: "Pacjent zwija się z bólu (NRS 10/10), wymiotuje i ma podwyższone ciśnienie tętnicze reaktywne na ból (158/92 mmHg). Jaki schemat farmakoterapii przeciwbólowej stanowi leczenie z wyboru według aktualnych wytycznych Europejskiego Towarzystwa Urologicznego (EAU)?",
        options: [
          {
            text: "Dożylne podanie niesteroidowego leku przeciwzapalnego (np. ketoprofen 100 mg i.v. lub diklofenak 75 mg i.m.) w skojarzeniu z lekiem rozkurczowym (drotaweryna) oraz lekiem przeciwwymiotnym",
            correct: true,
            isCorrect: true,
            feedback: "✅ PRAWIDŁOWO! Niesteroidowe leki przeciwzapalne (NLPZ) są lekami I rzutu w ostrej kolce nerkowej. Hamują syntezę prostaglandyn, zmniejszają przepływ krwi przez nerkę, obniżają produkcję moczu i ciśnienie w miedniczce, zapewniając silniejsze i trwalsze działanie przeciwbólowe niż opioidy."
          },
          {
            text: "Natychmiastowe podanie morfiny w ciągłym wlewie dokanałowym bez wcześniejszego stosowania jakichkolwiek leków przeciwzapalnych lub rozkurczających mięśniówkę gładką",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Opioidy dokanałowe nie są metodą I rzutu na SOR w kolce nerkowej; opioidy i.v. rezerwuje się jako leki II rzutu przy przeciwwskazaniach do NLPZ."
          },
          {
            text: "Zlecenie dożylnego forsownego wlewu 3000 ml 0,9% roztworu NaCl połączonego z podaniem 40 mg furosemidu w celu natychmiastowego przepchnięcia złogu moczem",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Forsowna diureza (wlewy płynów + diuretyk pętlowy) w warunkach ostrej niedrożności moczowodu drastycznie zwiększa ciśnienie w UKM, potęguje ból i grozi pęknięciem sklepienia kielicha nerkowego!"
          },
          {
            text: "Zastosowanie wyłącznie doustnego paracetamolu w dawce 500 mg i zalecenie powstrzymania się od jedzenia i picia do czasu samoistnego ustąpienia bólu kolkowego",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Doustny paracetamol w niskiej dawce jest całkowicie nieskuteczny w przerwaniu ostrego ataku kolki nerkowej o natężeniu 10/10 w skali NRS."
          }
        ]
      },
      {
        title: "Krok 2: Badanie obrazowe z wyboru (złoty standard)",
        scenario: "Ból ustąpił po podaniu NLPZ. Lekarz rezydent zastanawia się nad optymalną metodą diagnostyki obrazowej w celu dokładnej oceny wielkości złogu, jego gęstości radiologicznej i ewentualnych powikłań. Jaka metoda stanowi złoty standard?",
        options: [
          {
            text: "Niskodawkowa tomografia komputerowa jamy brzusznej i miednicy bez kontrastu (low-dose non-contrast CT - NCCT)",
            correct: true,
            isCorrect: true,
            feedback: "✅ PRAWIDŁOWO! Niskodawkowa TK bez kontrastu (NCCT) charakteryzuje się czułością i swoistością bliską 98–100%. Uwidacznia niemal każdy typ złogu (w tym moczanowe, niewidoczne w RTG), ocenia gęstość w jednostkach Hounsfielda (HU) i anatomię moczowodu."
          },
          {
            text: "Klasyczna urografia dożylna z podaniem 100 ml jodowego środka cieniującego w trakcie ostrego ataku bólu",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Urografia dożylna to metoda historyczna, obarczona ryzykiem nefropatii kontrastowej i reakcji anafilaktycznej; została wyparta przez NCCT."
          },
          {
            text: "Izotopowa scyntygrafia dynamiczna nerek (renografia DTPA) w celu bezpośredniej wizualizacji średnicy złogu",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Scyntygrafia ocenia funkcję wydzielniczą i odpływ moczu, ale nie służy do lokalizacji ani pomiaru rozmiarów złogów moczowodowych."
          },
          {
            text: "Przeglądowe zdjęcie RTG jamy brzusznej (KUB) jako jedyne i wystarczające badanie wykluczające kamicę moczanową",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Aż 10–20% złogów (zwłaszcza moczanowe i ksantynowe) to złogi całkowicie rentgenocienioujemne, niewidoczne w klasycznym badaniu RTG."
          }
        ]
      },
      {
        title: "Krok 3: Kwalifikacja do leczenia – wskazania do pilnego odbarczenia UKM",
        scenario: "Badanie TK potwierdziło złóg 7 mm w dolnym odcinku prawego moczowodu. Który z poniższych objawów klinicznych stanowi BEZWZGLĘDNE wskazanie do pilnej interwencji urologicznej (wprowadzenie cewnika moczowodowego DJ lub nakłucie nefrostomijne PCN)?",
        options: [
          {
            text: "Rozwój gorączki (>38,5°C) z dreszczami i cechami urosepsy (zakażenie powyżej przeszkody) lub kamica w anatomicznie jedynej nerce z bezmoczem",
            correct: true,
            isCorrect: true,
            feedback: "✅ PRAWIDŁOWO! Zakażone wodonercze (zastój moczu powikłany infekcją) to bezpośredni stan zagrożenia życia prowadzący do sepsy moczowej i wstrząsu septycznego w ciągu paru godzin. Wymaga natychmiastowego pilnego odbarczenia UKM (cewnik typu Double-J lub przezskórna nefrostomia PCN) oraz antybiotykoterapii i.v."
          },
          {
            text: "Wystąpienie mikroskopowego krwiomoczu w badaniu ogólnym moczu bez obecności leukocyturii i gorączki",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Krwiomocz mikroskopowy (erytrocyturia) towarzyszy ponad 90% epizodów kolki nerkowej wskutek podrażnienia śluzówki przez złóg i nie jest wskazaniem do pilnego zabiegu."
          },
          {
            text: "Pojedynczy epizod wymiotów w trakcie ostrego ataku bólu całkowicie ustępujący po podaniu metoklopramidu",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Nudności i wymioty wynikają z odruchu trzewno-błędnego (wspólne unerwienie zwoju trzewnego i splotu nerkowego) i nie wymagają drenażu chirurgicznego."
          },
          {
            text: "Spadek dobowego wydalania kwasu moczowego w moczu poniżej średniej normy laboratoryjnej dla wieku",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Zaburzenia wydalania metabolitów w moczu analizuje się ambulatoryjnie w ramach profilaktyki metafilaktycznej kamicy, a nie w trybie ostrym."
          }
        ]
      }
    ],
    pathoNodes: [
      {
        id: "patho_1",
        title: "Okluzja moczowodu i wzrost ciśnienia śródmiedniczkowego",
        desc: "Zaklinowanie złogu w przewężeniach fizjologicznych moczowodu (połączenie miedniczkowo-moczowodowe, skrzyżowanie z naczyniami biodrowymi, ujście pęcherzowe) powoduje gwałtowny wzrost ciśnienia w układzie kielichowo-miedniczkowym. Rozciąganie torebki nerki pobudza mechanoreceptory i włókna czuciowe typu C.",
        target: "Inhibitory COX (NLPZ) zmniejszające filtrację kłębuszkową i ciśnienie w UKM"
      },
      {
        id: "patho_2",
        title: "Bolesny skurcz mięśniówki gładkiej moczowodu",
        desc: "Miejscowy nacisk złogu wywołuje wzmożoną perystaltykę i spastyczny, tężcowy skurcz miocytów ściany moczowodu powyżej i na poziomie przeszkody. Prowadzi to do niedokrwienia ściany moczowodu, nasilenia bólu kolkowego oraz kwasicy mleczanowej w mięśniówce gładkiej.",
        target: "Alfa-1-blokery (tamsulozyna) oraz leki spazmolityczne rozluźniające moczowód"
      },
      {
        id: "patho_3",
        title: "Kaskada prostaglandynowa i faza naczyniowa",
        desc: "Ostry wzrost ciśnienia w miedniczce stymuluje miejscową syntezę prostaglandyny E2 (PGE2) i prostacykliny, co w pierwszych godzinach wywołuje rozszerzenie tętniczek doprowadzających kłębuszków (przekrwienie nerkowe), nasilając diurezę i potęgując wzrost ciśnienia w zablokowanym układzie.",
        target: "Blokada syntezy PGE2 przez dożylny ketoprofen lub deksketoprofen"
      }
    ],
    dutySummary: {
      diagnostics: "1. Ocena stanu ogólnego pacjenta, parametrów życiowych (szczególnie temperatury ciała i tętna) oraz wykluczenie cech urosepsy.\n\n2. Badania laboratoryjne: morfologia krwi z rozmazem, CRP, mocznik, kreatynina, eGFR, elektrolity (sód, potas) oraz badanie ogólne moczu (erytrocyturia, leukocyturia, pH moczu, obecność azotynów).\n\n3. Badanie ultrasonograficzne układu moczowego (POCUS): ocena stopnia wodonercza (szerokość miedniczki i kielichów), obecności i symetrii wyrzutów moczowodowych w badaniu Power Doppler (ureteral jets) oraz poszukiwanie złogu w nerce lub dystalnym moczowodzie.\n\n4. Niskodawkowa tomografia komputerowa jamy brzusznej i miednicy bez kontrastu (low-dose NCCT) – złoty standard oceniający dokładną wielkość złogu (w mm), gęstość w skali Hounsfielda (HU) oraz odległość od ujścia pęcherzowego.",
      drugsAndDoses: "• Ketoprofen: <span class=\"dose-pill\">100 mg i.v. w 100 ml 0,9% NaCl we wlewie</span> lub diklofenak <span class=\"dose-pill\">75 mg głęboko i.m.</span> (leki I rzutu hamujące syntezę PGE2).\n• Drotaweryna: <span class=\"dose-pill\">40–80 mg i.v. powoli</span> lub hioscyna <span class=\"dose-pill\">20 mg i.v.</span> w celu zwiotczenia mięśniówki gładkiej.\n• Metamizol sodowy: <span class=\"dose-pill\">1000–2500 mg i.v. w powolnym wlewie</span> w razie niewystarczającej kontroli bólu po NLPZ.\n• Tamsulozyna: <span class=\"dose-pill\">0,4 mg p.o. 1 raz na dobę</span> jako medyczna terapia wydalająca (MET) w złogach dystalnego moczowodu o średnicy 5–10 mm.\n• Morfina: <span class=\"dose-pill\">2–5 mg i.v. powoli miareczkowana</span> wyłącznie jako lek ratunkowy przy przeciwwskazaniach do NLPZ lub bólu opornym.",
      pitfalls: [
        "Podawanie forsownej hydroterapii ('wypłukiwanie kamienia' wlewami 2000–3000 ml płynów) w ostrej fazie niedrożności, co prowadzi do gwałtownego wzrostu ciśnienia i ryzyka pęknięcia sklepienia kielicha nerki (fornix rupture).",
        "Przeoczenie objawów urosepsy (gorączka, dreszcze, leukocytoza) u chorego z zastojem moczu i zaniechanie pilnego odbarczenia UKM (cewnik DJ lub PCN), co grozi sepsą urologiczną o wysokiej śmiertelności.",
        "Wykluczenie kamicy na podstawie prawidłowego przeglądowego zdjęcia RTG (KUB) – złogi kwasu moczowego (10–15% przypadków) są całkowicie cienioujemne.",
        "Mylenie kolki nerkowej z pękającym tętniakiem aorty brzusznej (AAA) u osób w podeszłym wieku z nagłym bólem lędźwiowym i niestabilnością hemodynamiczną."
      ]
    },
    diffTable: {
      title: "⚔️ Tabela Różnicowa: Ostra Kolka Nerkowa a Inne Przyczyny Ostrego Bólu",
      headers: ["Jednostka chorobowa", "Charakter bólu", "Objawy towarzyszące", "Badanie przedmiotowe", "Kluczowe badanie diagnostyczne"],
      rows: [
        ["Kolka nerkowa (kamica)", "Falowy, ostry, kurczowy (10/10), promieniuje do pachwiny i moszny", "Nudności, wymioty, dyzuria, krwiomocz, chory niespokojny miota się", "Dodatni objaw Goldflama, brzuch miękki, brak objawów otrzewnowych", "Niskodawkowa TK bez kontrastu (NCCT), USG nerek"],
        ["Ostre zapalenie wyrostka", "Początkowo w nadbrzuszu/pępku, po kilku godzinach stały ból w prawym dole biodrowym", "Jadłowstręt, nudności, stan podgorączkowy, zaparcie lub biegunka", "Bolesność w punkcie McBurneya, dodatni objaw Blumberga i Rovsinga", "USG jamy brzusznej, TK jamy brzusznej z kontrastem"],
        ["Pęknięcie tętniaka aorty (AAA)", "Nagły, rozdzierający, stały ból brzucha i okolicy lędźwiowo-krzyżowej", "Hipotensja, tachykardia, bladość, omdlenie, wstrząs hipowolemiczny", "Tętniący bolesny guz w jamie brzusznej, osłabienie tętna na tętnicach udowych", "Angio-TK aorty brzusznej, natychmiastowe USG bedside"],
        ["Ostre odmiedniczkowe zapalenie (OZZN)", "Tępy, stały ból w okolicy lędźwiowej, narastający od 1–2 dni", "Wysoka gorączka z dreszczami, poty, dyzuria, częstomocz, osłabienie", "Wybitnie dodatni objaw Goldflama, bolesność nerki przy palpacji", "Posiew moczu, leukocytoza, wzrost CRP, USG nerek"],
        ["Kolka żółciowa (kamica pęcherzyka)", "Ostry ból w prawym podżebrzu promieniujący pod prawą łopatkę po tłustym posiłku", "Nudności, wymioty, wzdęcie, niepokój ruchowy chorego", "Dodatni objaw Chełmońskiego i Murphy'ego, brzuch miękki", "USG jamy brzusznej (złogi w pęcherzyku, pogrubiała ściana)"]
      ]
    },
    lekQuestions: [
      {
        id: 1,
        q: "Lekami pierwszego wyboru w uśmierzaniu bólu w ostrym napadzie kolki nerkowej według wytycznych Europejskiego Towarzystwa Urologicznego (EAU) są:",
        question: "Lekami pierwszego wyboru w uśmierzaniu bólu w ostrym napadzie kolki nerkowej według wytycznych Europejskiego Towarzystwa Urologicznego (EAU) są:",
        opts: [
          "Niesteroidowe leki przeciwzapalne (np. ketoprofen, diklofenak, indometacyna)",
          "Agoniści receptorów opioidowych o silnym działaniu (morfina, fentanyl)",
          "Leki parasympatykomimetyczne stymulujące perystaltykę moczowodu",
          "Diuretyki pętlowe stosowane w wysokich dawkach w połączeniu z hydroterapią",
          "Czyste spazmolityki neurotropowe stosowane w monoterapii doustnej"
        ],
        options: [
          "Niesteroidowe leki przeciwzapalne (np. ketoprofen, diklofenak, indometacyna)",
          "Agoniści receptorów opioidowych o silnym działaniu (morfina, fentanyl)",
          "Leki parasympatykomimetyczne stymulujące perystaltykę moczowodu",
          "Diuretyki pętlowe stosowane w wysokich dawkach w połączeniu z hydroterapią",
          "Czyste spazmolityki neurotropowe stosowane w monoterapii doustnej"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Wytyczne EAU wskazują NLPZ jako leki pierwszego rzutu, ponieważ hamują syntezę prostaglandyn, zmniejszają przepływ nerkowy i ciśnienie śródmiedniczkowe, dając trwalszy efekt przeciwbólowy niż opioidy.",
        expl: "Wytyczne EAU wskazują NLPZ jako leki pierwszego rzutu, ponieważ hamują syntezę prostaglandyn, zmniejszają przepływ nerkowy i ciśnienie śródmiedniczkowe, dając trwalszy efekt przeciwbólowy niż opioidy.",
        explanation: "Wytyczne EAU wskazują NLPZ jako leki pierwszego rzutu, ponieważ hamują syntezę prostaglandyn, zmniejszają przepływ nerkowy i ciśnienie śródmiedniczkowe, dając trwalszy efekt przeciwbólowy niż opioidy."
      },
      {
        id: 2,
        q: "Złotym standardem w diagnostyce obrazowej ostrej kolki nerkowej o najwyższej czułości i swoistości przekraczającej 95% jest:",
        question: "Złotym standardem w diagnostyce obrazowej ostrej kolki nerkowej o najwyższej czułości i swoistości przekraczającej 95% jest:",
        opts: [
          "Niskodawkowa tomografia komputerowa bez podania środka cieniującego (NCCT)",
          "Klasyczna urografia dożylna z wielofazowym badaniem radiologicznym",
          "Przeglądowe zdjęcie rentgenowskie jamy brzusznej (RTG KUB)",
          "Scyntygrafia dynamiczna nerek z użyciem radiofarmaceutyku 99mTc-MAG3",
          "Rezonans magnetyczny dróg moczowych (uro-MR) bez kontrastu"
        ],
        options: [
          "Niskodawkowa tomografia komputerowa bez podania środka cieniującego (NCCT)",
          "Klasyczna urografia dożylna z wielofazowym badaniem radiologicznym",
          "Przeglądowe zdjęcie rentgenowskie jamy brzusznej (RTG KUB)",
          "Scyntygrafia dynamiczna nerek z użyciem radiofarmaceutyku 99mTc-MAG3",
          "Rezonans magnetyczny dróg moczowych (uro-MR) bez kontrastu"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Niskodawkowa TK bez kontrastu (low-dose NCCT) jest złotym standardem według EAU – pozwala uwidocznić złóg, określić jego dokładne rozmiary, lokalizację i gęstość w skali HU.",
        expl: "Niskodawkowa TK bez kontrastu (low-dose NCCT) jest złotym standardem według EAU – pozwala uwidocznić złóg, określić jego dokładne rozmiary, lokalizację i gęstość w skali HU.",
        explanation: "Niskodawkowa TK bez kontrastu (low-dose NCCT) jest złotym standardem według EAU – pozwala uwidocznić złóg, określić jego dokładne rozmiary, lokalizację i gęstość w skali HU."
      },
      {
        id: 3,
        q: "Który rodzaj złogów układu moczowego jest całkowicie cienioujemny (niewidoczny w klasycznym przeglądowym badaniu RTG KUB)?",
        question: "Który rodzaj złogów układu moczowego jest całkowicie cienioujemny (niewidoczny w klasycznym przeglądowym badaniu RTG KUB)?",
        opts: [
          "Złogi zbudowane z kwasu moczowego",
          "Złogi ze szczawianu wapnia jednowodnego",
          "Złogi z fosforanu wapnia (apatyty)",
          "Złogi struwitowe (fosforanowo-magnezowo-amonowe)",
          "Złogi ze szczawianu wapnia dwuwodnego"
        ],
        options: [
          "Złogi zbudowane z kwasu moczowego",
          "Złogi ze szczawianu wapnia jednowodnego",
          "Złogi z fosforanu wapnia (apatyty)",
          "Złogi struwitowe (fosforanowo-magnezowo-amonowe)",
          "Złogi ze szczawianu wapnia dwuwodnego"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Złogi z kwasu moczowego oraz ksantynowe nie pochłaniają promieniowania rentgenowskiego i są niewidoczne w RTG, ale są doskonale widoczne w TK (zwykle 300–500 HU).",
        expl: "Złogi z kwasu moczowego oraz ksantynowe nie pochłaniają promieniowania rentgenowskiego i są niewidoczne w RTG, ale są doskonale widoczne w TK (zwykle 300–500 HU).",
        explanation: "Złogi z kwasu moczowego oraz ksantynowe nie pochłaniają promieniowania rentgenowskiego i są niewidoczne w RTG, ale są doskonale widoczne w TK (zwykle 300–500 HU)."
      },
      {
        id: 4,
        q: "Bezwzględnym wskazaniem do natychmiastowego odbarczenia układu moczowego (cewnik DJ lub nefrostomia) w trybie pilnym jest:",
        question: "Bezwzględnym wskazaniem do natychmiastowego odbarczenia układu moczowego (cewnik DJ lub nefrostomia) w trybie pilnym jest:",
        opts: [
          "Zastój moczu powikłany zakażeniem układu moczowego z gorączką lub wodonercze w jedynej nerce",
          "Obecność pojedynczego złogu o średnicy 4 mm w dolnym odcinku moczowodu bez gorączki",
          "Wystąpienie przejściowego krwinkomoczu mikroskopowego bez cech leukocyturii",
          "Zgłaszanie przez chorego nudności w trakcie pierwszego epizodu bólowego",
          "Stwierdzenie w badaniu ogólnym moczu kryształów szczawianu wapnia bez poszerzenia UKM"
        ],
        options: [
          "Zastój moczu powikłany zakażeniem układu moczowego z gorączką lub wodonercze w jedynej nerce",
          "Obecność pojedynczego złogu o średnicy 4 mm w dolnym odcinku moczowodu bez gorączki",
          "Wystąpienie przejściowego krwinkomoczu mikroskopowego bez cech leukocyturii",
          "Zgłaszanie przez chorego nudności w trakcie pierwszego epizodu bólowego",
          "Stwierdzenie w badaniu ogólnym moczu kryształów szczawianu wapnia bez poszerzenia UKM"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Zakażenie zablokowanego układu kielichowo-miedniczkowego grozi piorunującą urosepsą i wstrząsem septycznym; wymaga natychmiastowego drenażu (DJ lub PCN) oraz antybiotykoterapii.",
        expl: "Zakażenie zablokowanego układu kielichowo-miedniczkowego grozi piorunującą urosepsą i wstrząsem septycznym; wymaga natychmiastowego drenażu (DJ lub PCN) oraz antybiotykoterapii.",
        explanation: "Zakażenie zablokowanego układu kielichowo-miedniczkowego grozi piorunującą urosepsą i wstrząsem septycznym; wymaga natychmiastowego drenażu (DJ lub PCN) oraz antybiotykoterapii."
      },
      {
        id: 5,
        q: "Lekiem z wyboru w medycznej terapii wydalającej (MET) u pacjenta ze złogiem w dystalnym odcinku moczowodu o średnicy 5–10 mm jest:",
        question: "Lekiem z wyboru w medycznej terapii wydalającej (MET) u pacjenta ze złogiem w dystalnym odcinku moczowodu o średnicy 5–10 mm jest:",
        opts: [
          "Antagonista receptorów alfa-1-adrenergicznych (np. tamsulozyna w dawce 0,4 mg/d)",
          "Lek moczopędny z grupy tiazydów podawany w skojarzeniu z suplementacją potasu",
          "Inhibitor pompy protonowej podawany w podwójnej dawce dobowej na czczo",
          "Glikozyd nasercowy w celu zwiększenia rzutu serca i perfuzji nerkowej",
          "Nieselektywny beta-adrenolityk podawany w celu obniżenia ciśnienia krwi"
        ],
        options: [
          "Antagonista receptorów alfa-1-adrenergicznych (np. tamsulozyna w dawce 0,4 mg/d)",
          "Lek moczopędny z grupy tiazydów podawany w skojarzeniu z suplementacją potasu",
          "Inhibitor pompy protonowej podawany w podwójnej dawce dobowej na czczo",
          "Glikozyd nasercowy w celu zwiększenia rzutu serca i perfuzji nerkowej",
          "Nieselektywny beta-adrenolityk podawany w celu obniżenia ciśnienia krwi"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Tamsulozyna (alfa-1-bloker) rozkurcza mięśniówkę gładką dystalnego odcinka moczowodu, ułatwiając samoistne wydalenie złogów o średnicy 5–10 mm i skracając czas do pasażu.",
        expl: "Tamsulozyna (alfa-1-bloker) rozkurcza mięśniówkę gładką dystalnego odcinka moczowodu, ułatwiając samoistne wydalenie złogów o średnicy 5–10 mm i skracając czas do pasażu.",
        explanation: "Tamsulozyna (alfa-1-bloker) rozkurcza mięśniówkę gładką dystalnego odcinka moczowodu, ułatwiając samoistne wydalenie złogów o średnicy 5–10 mm i skracając czas do pasażu."
      },
      {
        id: 6,
        q: "Oceń prawdziwość zdań dotyczących ostrej kolki nerkowej:\nI. NLPZ redukują ból poprzez zmniejszenie ciśnienia wewnątrznadnerczowego i hamowanie autoregulacji.\nII. Złogi odlewowe nerek najczęściej powstają w środowisku zasadowego moczu wywołanego bakteriami ureazo-dodatnimi.\nIII. Badaniem obrazowym z wyboru u kobiety w ciąży z podejrzeniem kolki nerkowej jest USG układu moczowego.\nIV. Forsowna hydroterapia jest bezwzględnie zalecana w pierwszych 2 godzinach ostrego ataku kolki.",
        question: "Oceń prawdziwość zdań dotyczących ostrej kolki nerkowej:\nI. NLPZ redukują ból poprzez zmniejszenie ciśnienia wewnątrznadnerczowego i hamowanie autoregulacji.\nII. Złogi odlewowe nerek najczęściej powstają w środowisku zasadowego moczu wywołanego bakteriami ureazo-dodatnimi.\nIII. Badaniem obrazowym z wyboru u kobiety w ciąży z podejrzeniem kolki nerkowej jest USG układu moczowego.\nIV. Forsowna hydroterapia jest bezwzględnie zalecana w pierwszych 2 godzinach ostrego ataku kolki.",
        opts: [
          "Prawdziwe są zdania: I, II, III",
          "Prawdziwe są zdania: II, III, IV",
          "Prawdziwe są zdania: I, III, IV",
          "Prawdziwe są wszystkie zdania (I, II, III, IV)",
          "Prawdziwe są tylko zdania: I oraz IV"
        ],
        options: [
          "Prawdziwe są zdania: I, II, III",
          "Prawdziwe są zdania: II, III, IV",
          "Prawdziwe są zdania: I, III, IV",
          "Prawdziwe są wszystkie zdania (I, II, III, IV)",
          "Prawdziwe są tylko zdania: I oraz IV"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Zdania I, II i III są prawdziwe. Zdanie IV jest fałszywe – podawanie dużej ilości płynów w ostrej okluzji potęguje wzrost ciśnienia w miedniczce i ból.",
        expl: "Zdania I, II i III są prawdziwe. Zdanie IV jest fałszywe – podawanie dużej ilości płynów w ostrej okluzji potęguje wzrost ciśnienia w miedniczce i ból.",
        explanation: "Zdania I, II i III są prawdziwe. Zdanie IV jest fałszywe – podawanie dużej ilości płynów w ostrej okluzji potęguje wzrost ciśnienia w miedniczce i ból."
      },
      {
        id: 7,
        q: "Powstanie kamicy struwitowej (odlewowej) związane jest z przewlekłym zakażeniem układu moczowego drobnoustrojami produkującymi ureazę, takimi jak:",
        question: "Powstanie kamicy struwitowej (odlewowej) związane jest z przewlekłym zakażeniem układu moczowego drobnoustrojami produkującymi ureazę, takimi jak:",
        opts: [
          "Proteus mirabilis, Klebsiella pneumoniae oraz Pseudomonas aeruginosa",
          "Escherichia coli nieprodukująca ureazy oraz Enterococcus faecalis",
          "Streptococcus agalactiae oraz Candida albicans w postaci grzybni",
          "Lactobacillus acidophilus oraz Bifidobacterium adolescentis",
          "Mycoplasma genitalium oraz Chlamydia trachomatis w cewce moczowej"
        ],
        options: [
          "Proteus mirabilis, Klebsiella pneumoniae oraz Pseudomonas aeruginosa",
          "Escherichia coli nieprodukująca ureazy oraz Enterococcus faecalis",
          "Streptococcus agalactiae oraz Candida albicans w postaci grzybni",
          "Lactobacillus acidophilus oraz Bifidobacterium adolescentis",
          "Mycoplasma genitalium oraz Chlamydia trachomatis w cewce moczowej"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Ureaza bakteryjna (np. u Proteus, Klebsiella, Pseudomonas) rozkłada mocznik do amoniaku, alkalizując mocz (pH > 7,2) i powodując wytrącanie fosforanu magnezowo-amonowego (struwitu).",
        expl: "Ureaza bakteryjna (np. u Proteus, Klebsiella, Pseudomonas) rozkłada mocznik do amoniaku, alkalizując mocz (pH > 7,2) i powodując wytrącanie fosforanu magnezowo-amonowego (struwitu).",
        explanation: "Ureaza bakteryjna (np. u Proteus, Klebsiella, Pseudomonas) rozkłada mocznik do amoniaku, alkalizując mocz (pH > 7,2) i powodując wytrącanie fosforanu magnezowo-amonowego (struwitu)."
      },
      {
        id: 8,
        q: "Które z poniższych postępowań stanowi podstawę leczenia zachowawczego (chemio-litylizy) złogów z kwasu moczowego?",
        question: "Które z poniższych postępowań stanowi podstawę leczenia zachowawczego (chemio-litylizy) złogów z kwasu moczowego?",
        opts: [
          "Alkalizacja moczu cytrynianem potasu lub wodorowęglanem sodu do uzyskania pH 6,5–7,2 oraz allopurynol",
          "Zakwaszanie moczu kwasem askorbinowym (witaminą C) do uzyskania pH moczu poniżej 5,0",
          "Ograniczenie podaży płynów dobowych poniżej 1 litra w celu zagęszczenia cytrynianów",
          "Całkowite wyeliminowanie z diety produktów zawierających jony wapnia i magnezu",
          "Podawanie kwasu traneksamowego w celu stabilizacji struktury organicznej złogu"
        ],
        options: [
          "Alkalizacja moczu cytrynianem potasu lub wodorowęglanem sodu do uzyskania pH 6,5–7,2 oraz allopurynol",
          "Zakwaszanie moczu kwasem askorbinowym (witaminą C) do uzyskania pH moczu poniżej 5,0",
          "Ograniczenie podaży płynów dobowych poniżej 1 litra w celu zagęszczenia cytrynianów",
          "Całkowite wyeliminowanie z diety produktów zawierających jony wapnia i magnezu",
          "Podawanie kwasu traneksamowego w celu stabilizacji struktury organicznej złogu"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Kwas moczowy krystalizuje w moczu kwaśnym. Podwyższenie pH moczu do 6,5–7,2 wielokrotnie zwiększa jego rozpuszczalność i pozwala na całkowite rozpuszczenie złogów moczanowych.",
        expl: "Kwas moczowy krystalizuje w moczu kwaśnym. Podwyższenie pH moczu do 6,5–7,2 wielokrotnie zwiększa jego rozpuszczalność i pozwala na całkowite rozpuszczenie złogów moczanowych.",
        explanation: "Kwas moczowy krystalizuje w moczu kwaśnym. Podwyższenie pH moczu do 6,5–7,2 wielokrotnie zwiększa jego rozpuszczalność i pozwala na całkowite rozpuszczenie złogów moczanowych."
      },
      {
        id: 9,
        q: "Najczęstszym składnikiem chemicznym złogów moczowych u dorosłych w populacji europejskiej (ok. 70–80% przypadków) jest:",
        question: "Najczęstszym składnikiem chemicznym złogów moczowych u dorosłych w populacji europejskiej (ok. 70–80% przypadków) jest:",
        opts: [
          "Szczawian wapnia (w postaci wedellitu lub wevellitu)",
          "Fosforan magnezowo-amonowy (struwit tworzący odlewy)",
          "Czysty kwas moczowy w postaci kryształów moczanowych",
          "Cystyna wywołana wrodzonym defektem transportu cewkowego",
          "Ksantyna powstająca przy genetycznym niedoborze oksydazy"
        ],
        options: [
          "Szczawian wapnia (w postaci wedellitu lub wevellitu)",
          "Fosforan magnezowo-amonowy (struwit tworzący odlewy)",
          "Czysty kwas moczowy w postaci kryształów moczanowych",
          "Cystyna wywołana wrodzonym defektem transportu cewkowego",
          "Ksantyna powstająca przy genetycznym niedoborze oksydazy"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Szczawiany wapnia (monohydrat - whewellit i dihydrat - weddellit) odpowiadają za 70–80% wszystkich kamieni moczowych.",
        expl: "Szczawiany wapnia (monohydrat - whewellit i dihydrat - weddellit) odpowiadają za 70–80% wszystkich kamieni moczowych.",
        explanation: "Szczawiany wapnia (monohydrat - whewellit i dihydrat - weddellit) odpowiadają za 70–80% wszystkich kamieni moczowych."
      },
      {
        id: 10,
        q: "Lekarz wystawiający pacjentowi zwolnienie lekarskie (e-ZLA) po ustąpieniu ostrego napadu kolki nerkowej musi pamiętać, że orzeczenie o czasowej niezdolności do pracy:",
        question: "Lekarz wystawiający pacjentowi zwolnienie lekarskie (e-ZLA) po ustąpieniu ostrego napadu kolki nerkowej musi pamiętać, że orzeczenie o czasowej niezdolności do pracy:",
        opts: [
          "Może być wystawione na okres rozpoczynający się nie wcześniej niż 3 dni poprzedzające dzień badania, chyba że wystawia je lekarz psychiatra",
          "Może być wystawione z mocą wsteczną obejmującą dowolny okres do 30 dni wstecz bez orzeczenia lekarza orzecznika ZUS",
          "Nie wymaga przeprowadzenia osobistego badania pacjenta ani teleporady medycznej w przypadku dolegliwości kolkowych",
          "Musi być każdorazowo osobiście zatwierdzone przez kierownika oddziału urologicznego przed przekazaniem do systemu ZUS",
          "Traci ważność w momencie wykupienia przez ubezpieczonego leków przeciwbólowych w aptece ogólnodostępnej"
        ],
        options: [
          "Może być wystawione na okres rozpoczynający się nie wcześniej niż 3 dni poprzedzające dzień badania, chyba że wystawia je lekarz psychiatra",
          "Może być wystawione z mocą wsteczną obejmującą dowolny okres do 30 dni wstecz bez orzeczenia lekarza orzecznika ZUS",
          "Nie wymaga przeprowadzenia osobistego badania pacjenta ani teleporady medycznej w przypadku dolegliwości kolkowych",
          "Musi być każdorazowo osobiście zatwierdzone przez kierownika oddziału urologicznego przed przekazaniem do systemu ZUS",
          "Traci ważność w momencie wykupienia przez ubezpieczonego leków przeciwbólowych w aptece ogólnodostępnej"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Zgodnie z przepisami dotyczącymi orzekania o niezdolności do pracy, lekarz może orzec niezdolność wstecznie maksymalnie do 3 dni poprzedzających badanie (jedynie lekarz psychiatra ma prawo wystawić je na dłuższy okres wstecz).",
        expl: "Zgodnie z przepisami dotyczącymi orzekania o niezdolności do pracy, lekarz może orzec niezdolność wstecznie maksymalnie do 3 dni poprzedzających badanie (jedynie lekarz psychiatra ma prawo wystawić je na dłuższy okres wstecz).",
        explanation: "Zgodnie z przepisami dotyczącymi orzekania o niezdolności do pracy, lekarz może orzec niezdolność wstecznie maksymalnie do 3 dni poprzedzających badanie (jedynie lekarz psychiatra ma prawo wystawić je na dłuższy okres wstecz)."
      },
      {
        id: 11,
        q: "Który z poniższych parametrów laboratoryjnych pobranych na SOR pozwala najwcześniej wychwycić rozwijającą się bakteriemię i wczesną urosepsę u chorego z zastojem moczu?",
        question: "Który z poniższych parametrów laboratoryjnych pobranych na SOR pozwala najwcześniej wychwycić rozwijającą się bakteriemię i wczesną urosepsę u chorego z zastojem moczu?",
        opts: [
          "Podwyższenie stężenia prokalcytoniny (PCT > 0,5 ng/ml) oraz wzrost stężenia mleczanów we krwi",
          "Izolowany wzrost stężenia bilirubiny całkowitej w surowicy krwi bez zmian w enzymach wątrobowych",
          "Spadek stężenia kreatyniny w surowicy krwi poniżej normy laboratoryjnej dla dorosłego mężczyzny",
          "Wystąpienie hiponatremii z hiperkaliemią w gazometrii krwi tętniczej przy prawidłowej leukocytozie",
          "Podwyższenie wskaźnika protrombinowego (INR > 2,0) u pacjenta niestosującego antykoagulantów"
        ],
        options: [
          "Podwyższenie stężenia prokalcytoniny (PCT > 0,5 ng/ml) oraz wzrost stężenia mleczanów we krwi",
          "Izolowany wzrost stężenia bilirubiny całkowitej w surowicy krwi bez zmian w enzymach wątrobowych",
          "Spadek stężenia kreatyniny w surowicy krwi poniżej normy laboratoryjnej dla dorosłego mężczyzny",
          "Wystąpienie hiponatremii z hiperkaliemią w gazometrii krwi tętniczej przy prawidłowej leukocytozie",
          "Podwyższenie wskaźnika protrombinowego (INR > 2,0) u pacjenta niestosującego antykoagulantów"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prokalcytonina (PCT) jest czułym i wczesnym biomarkerem uogólnionej infekcji bakteryjnej i urosepsy, a mleczany wskazują na hipoperfuzję tkankową.",
        expl: "Prokalcytonina (PCT) jest czułym i wczesnym biomarkerem uogólnionej infekcji bakteryjnej i urosepsy, a mleczany wskazują na hipoperfuzję tkankową.",
        explanation: "Prokalcytonina (PCT) jest czułym i wczesnym biomarkerem uogólnionej infekcji bakteryjnej i urosepsy, a mleczany wskazują na hipoperfuzję tkankową."
      }
    ],
    flashcards: [
      {
        q: "Jakie leki stanowią I rzut w zwalczaniu bólu w ostrej kolce nerkowej według wytycznych EAU?",
        a: "Niesteroidowe leki przeciwzapalne (NLPZ, np. ketoprofen 100 mg i.v. lub diklofenak)."
      },
      {
        q: "Dlaczego NLPZ są skuteczniejsze od opioidów w kolce nerkowej?",
        a: "Hamują syntezę prostaglandyn (PGE2), redukując filtrację kłębuszkową i ciśnienie śródmiedniczkowe."
      },
      {
        q: "Jaka metoda obrazowa stanowi złoty standard w diagnostyce kamicy moczowodowej?",
        a: "Niskodawkowa tomografia komputerowa jamy brzusznej i miednicy bez kontrastu (low-dose NCCT)."
      },
      {
        q: "Który rodzaj złogów moczowych jest niewidoczny na klasycznym zdjęciu RTG (cienioujemny)?",
        a: "Złogi z kwasu moczowego (oraz rzadkie złogi ksantynowe)."
      },
      {
        q: "Jakie są 2 bezwzględne wskazania do pilnego odbarczenia UKM (cewnik DJ lub PCN)?",
        a: "Zakażenie zablokowanego UKM (gorączka, urosepsa) oraz przeszkoda w jedynej nerce lub bezmocz."
      },
      {
        q: "Na czym polega medyczna terapia wydalająca (MET) w kamicy dolnego moczowodu?",
        a: "Na stosowaniu alfa-1-blokera (tamsulozyna 0,4 mg/d) rozluźniającego mięśniówkę dystalnego moczowodu."
      }
    ]
  },
  // =========================================================================
  // CASE 168: Ostre Zatrzymanie Moczu (AUR)
  // =========================================================================
  {
    id: 168,
    file: "168_ostre_zatrzymanie_moczu_aur.json",
    shortTitle: "Ostre Zatrzymanie Moczu (AUR)",
    title: "Urologiczny Stan Nagły: Ostre Zatrzymanie Moczu (AUR)",
    dept: "Urologia / SOR",
    diagnosisTitle: "Ostre Zatrzymanie Moczu w Przebiegu Łagodnego Rozrostu Stercza (AUR / BPH)",
    vitals: [
      { label: "Ciśnienie tętnicze (RR)", val: "172/98", unit: "mmHg", status: "vital-crit" },
      { label: "Częstość akcji serca (HR)", val: "104", unit: "/min", status: "vital-warn" },
      { label: "Częstość oddechów (RR)", val: "19", unit: "/min", status: "vital-ok" },
      { label: "Saturacja (SpO2)", val: "97", unit: "%", status: "vital-ok" },
      { label: "Temperatura ciała", val: "36.8", unit: "°C", status: "vital-ok" }
    ],
    story: "<p><strong>Pacjent:</strong> 72-letni mężczyzna zgłasza się na SOR w asyście syna z powodu niemożności oddania moczu od 14 godzin oraz narastającego, rozpierającego bólu w podbrzuszu.</p><p><strong>Wywiad chorobowy:</strong> Pacjent od około roku leczy się nieregularnie z powodu łagodnego rozrostu stercza (BPH); odczuwał osłabienie strumienia moczu, nykturię (3–4 razy w nocy) oraz uczucie niepełnego opróżnienia pęcherza. Wczoraj wieczorem z powodu objawów infekcji grypopodobnej przyjął złożony lek przeciwprzeziębieniowy zawierający pseudoefedrynę oraz chlorfenaminę, po czym wypił dwa piwa. Od wczesnych godzin porannych, pomimo silnego, bolesnego parcia na pęcherz, nie był w stanie wydalić ani kropli moczu. W wywiadzie brak gorączki, dreszczy czy zabiegów urologicznych w przeszłości.</p><p><strong>Badanie przedmiotowe:</strong> Pacjent w stanie silnego niepokoju, spocony, jęczy z bólu, uciska rękami podbrzusze. W badaniu palpacyjnym brzucha: w podbrzuszu obecny wybitnie bolesny, chełboczący, napięty opór sięgający 3 palce powyżej pępka (tzw. globus vesicalis – guz pęcherzowy), z wyraźnym stłumieniem odgłosu opukowego. W badaniu per rectum (DRE): stercz powiększony do wielkości dużej mandarynki, gładki, elastyczny, symetryczny, z zachowaną bruzdą pośrodkową, niebolesny. W przyłóżkowym USG (bladderscan / POCUS): pęcherz moczowy olbrzymi, wypełniony aechogennym płynem o szacowanej objętości 1150 ml; UKM obu nerek bez cech poszerzenia.</p>",
    steps: [
      {
        title: "Krok 1: Natychmiastowe odbarczenie pęcherza moczowego",
        scenario: "Pacjent ma skrajnie przepełniony pęcherz moczowy (1150 ml), wysokie ciśnienie reaktywne na ból (172/98 mmHg) i nie może oddać moczu. Jakie jest natychmiastowe postępowanie pierwszego rzutu na SOR?",
        options: [
          {
            text: "Wprowadzenie cewnika Foleya (14–16 Ch) do pęcherza moczowego w ścisłych warunkach aseptyki po uprzednim znieczuleniu cewki żelem z lidokainą, z napełnieniem balonu dopiero po uzyskaniu wypływu moczu",
            correct: true,
            isCorrect: true,
            feedback: "✅ PRAWIDŁOWO! Cewnikowanie cewki moczowej miękkim cewnikiem Foleya w znieczuleniu miejscowym żelem z lignokainą stanowi natychmiastowe postępowanie I rzutu w ostrym zatrzymaniu moczu. Wypełnienie balonu solą fizjologiczną może nastąpić dopiero po zaobserwowaniu wypływu moczu z drenu, co gwarantuje obecność balonu w świetle pęcherza."
          },
          {
            text: "Natychmiastowe wykonanie pilnej uretrotomii wewnętrznej w znieczuleniu ogólnym na sali operacyjnej bez jakichkolwiek wcześniejszych prób cewnikowania przezcewkowego w warunkach aseptycznych",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Uretrotomia to inwazyjny zabieg nacięcia zwężenia cewki; nie stanowi wstępnego postępowania ratunkowego w niepowikłanym AUR na SOR."
          },
          {
            text: "Podanie dożylne 40 mg furosemidu w celu natychmiastowego wymuszenia mikcji poprzez wzrost gradientu ciśnienia hydrostatycznego w przepełnionym pęcherzu bez cewnikowania",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Diuretyki pętlowe w zatrzymaniu moczu to kardynalny błąd – nasilają wypełnienie zablokowanego pęcherza i grożą jego pęknięciem!"
          },
          {
            text: "Podanie doustne 10 mg finasterydu i natychmiastowe odesłanie pacjenta na ambulatoryjną konsultację urologiczną w rejonowej poradni specjalistycznej w kolejnym tygodniu",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Inhibitory 5-alfa-reduktazy (finasteryd) wymagają 3–6 miesięcy na zmniejszenie objętości stercza; AUR wymaga natychmiastowego drenażu."
          }
        ]
      },
      {
        title: "Krok 2: Nadzór po odbarczeniu – krwiomocz ex vacuo i poliuria poprzeszkodowa",
        scenario: "Po założeniu cewnika Foleya natychmiast wypłynęło 1150 ml ciemnego moczu, a w kolejnych godzinach diureza wynosi 350 ml/h, mocz staje się lekko podbarwiony na różowo. Na jakie zjawiska fizjopatologiczne należy zwrócić szczególną uwagę?",
        options: [
          {
            text: "Poliurię poprzeszkodową (post-obstructive diuresis) wymagającą ścisłego bilansu płynów i elektrolitów oraz łagodny krwiomocz z odbarczenia (haematuria ex vacuo)",
            correct: true,
            isCorrect: true,
            feedback: "✅ PRAWIDŁOWO! Po nagłym odbarczeniu przewlekłego lub podostrego zatrzymania moczu może dojść do krwiomoczu z odbarczenia (pękanie powierzchownych naczyń błony śluzowej pęcherza) oraz poliurii poprzeszkodowej (>200 ml/h) z utratą sodu, potasu i hipowolemią. Wymaga to monitorowania bilansu i dożylnej podaży elektrolitów."
          },
          {
            text: "Ostre poprzetoczeniowe uszkodzenie płuc (TRALI) spowodowane nagłym spadkiem obciążenia wstępnego prawej komory serca",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! TRALI to powikłanie immunologiczne przetaczania preparatów krwi, nie ma związku z odbarczeniem pęcherza moczowego."
          },
          {
            text: "Zespół rozpadu guza (TLS) wywołany masowym przedostaniem się jonów potasu i kwasu moczowego ze ściany pęcherza do krążenia",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! TLS rozwija się w onkologii po chemioterapii nowotworów mieloproliferacyjnych, a nie po cewnikowaniu pęcherza."
          },
          {
            text: "Natychmiastowe zaciśnięcie cewnika kleszczykami Peana na 48 godzin w celu zapobieżenia całkowitej utracie ciśnienia pęcherzowego",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Zaciskanie cewnika po odbarczeniu jest błędem – nie zapobiega krwiomoczowi, a sprzyja zakażeniom i ponownemu wzrostowi ciśnienia."
          }
        ]
      },
      {
        title: "Krok 3: Optymalizacja farmakoterapii i przygotowanie do próby usunięcia cewnika (TWOC)",
        scenario: "Pacjent ma pozostawiony cewnik Foleya na stałe. Jakie leczenie farmakologiczne należy wdrożyć, aby maksymalnie zwiększyć szanse na pomyślną próbę usunięcia cewnika (TWOC – Trial Without Catheter) za kilka dni?",
        options: [
          {
            text: "Wdrożenie selektywnego antagonisty receptora alfa-1-adrenergicznego (np. tamsulozyna 0,4 mg/d) przez co najmniej 2–3 dni przed planowaną próbą usunięcia cewnika",
            correct: true,
            isCorrect: true,
            feedback: "✅ PRAWIDŁOWO! Zgodnie z wytycznymi EAU, podanie alfa-1-blokera (tamsulozyna, alfuzosyna) przez 2–3 dni przed próbą usunięcia cewnika (TWOC) rozluźnia mięśniówkę gładką szyi pęcherza i zrębu stercza, dwukrotnie zwiększając odsetek udanych mikcji po dekaniulacji."
          },
          {
            text: "Podanie dożylne atropiny w dawce 1 mg co 8 godzin w celu wywołania całkowitej relaksacji mięśnia wypieracza pęcherza moczowego",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Atropina i leki cholinolityczne porażają mięsień wypieracz (detrusor) i są jedną z głównych przyczyn wywołujących AUR!"
          },
          {
            text: "Zalecenie podwójnej dawki pseudoefedryny w celu zwiększenia napięcia zwieracza zewnętrznego cewki moczowej przed usunięciem cewnika",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Pseudoefedryna poprzez stymulację receptorów alfa-adrenergicznych kurczy szyję pęcherza i bezpośrednio sprowokowała ten epizod!"
          },
          {
            text: "Natychmiastowe skierowanie na pilną cystektomię radykalną z wytworzeniem wstawki jelitowej Brickera w trybie ostrym",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Cystektomia radykalna to operacja onkologiczna w naciekającym raku pęcherza moczowego, a nie metoda leczenia łagodnego rozrostu stercza."
          }
        ]
      }
    ],
    pathoNodes: [
      {
        id: "patho_1",
        title: "Składowa mechaniczna (statyczna) przeszkody podpęcherzowej",
        desc: "Stopniowy rozrost strefy przejściowej stercza pod wpływem dihydrotestosteronu (DHT) prowadzi do mechanicznego ucisku i wydłużenia cewki moczowej sterczowej. Skutkuje to kompensacyjnym przerostem beleczek mięśnia wypieracza oraz tworzeniem uchyłków rzekomych pęcherza.",
        target: "Inhibitory 5-alfa-reduktazy (finasteryd, dutasteryd) zmniejszające objętość stercza"
      },
      {
        id: "patho_2",
        title: "Składowa dynamiczna i wyzwalacze farmakologiczne",
        desc: "Zwiększone napięcie mięśniówki gładkiej szyi pęcherza i torebki stercza zależne jest od receptorów alfa-1-adrenergicznych. Przyjęcie sympatykomimetyków (pseudoefedryna) potęguje skurcz wyjściowy, a cholinolityki (chlorfenamina) blokują skurcz wypieracza (M2/M3), blokując mikcję.",
        target: "Alfa-1-adrenolityki (tamsulozyna, alfuzosyna) znoszące skurcz szyi pęcherza"
      },
      {
        id: "patho_3",
        title: "Dekompresja pęcherza i poliuria poprzeszkodowa",
        desc: "Nagłe odbarczenie zalegającego moczu (>1000 ml) znosi wysokie ciśnienie hydrostatyczne. Spadek ciśnienia śródściennego prowadzi do pękania kapilar (krwiomocz ex vacuo), a wypłukanie gradientu rdzeniowego i uwalnianie ANP wywołuje masywną poliurię poprzeszkodową.",
        target: "Stopniowe monitorowanie diurezy i wyrównywanie płynów (0,45% NaCl z KCL)"
      }
    ],
    dutySummary: {
      diagnostics: "1. Ocena objawów klinicznych i parametrów życiowych: bolesne, napięte podbrzusze, wyczuwalny chełboczący opór (globus vesicalis) o stłumionym odgłosie opukowym.\n\n2. Badanie ultrasonograficzne (bladderscan / POCUS): pomiar objętości zalegającego moczu w pęcherzu oraz ocena układów kielichowo-miedniczkowych obu nerek pod kątem wodonercza.\n\n3. Badanie per rectum (DRE): ocena wielkości, konsystencji, symetrii i bolesności stercza po uprzednim opróżnieniu pęcherza moczowego.\n\n4. Badania laboratoryjne: stężenie mocznika, kreatyniny, elektrolitów (sód, potas) w surowicy, morfologia krwi oraz badanie ogólne odbarczonego moczu (wykluczenie ZUM).",
      drugsAndDoses: "• Znieczulenie miejscowe cewki: <span class=\"dose-pill\">10–20 ml 2% żelu z lignokainą podane do cewki moczowej</span> z odczekaniem 3–5 minut przed wprowadzeniem cewnika.\n• Tamsulozyna: <span class=\"dose-pill\">0,4 mg p.o. 1 raz na dobę po śniadaniu</span> (alfa-1-bloker z wyboru przed próbą usunięcia cewnika TWOC).\n• Alfuzosyna: <span class=\"dose-pill\">10 mg p.o. 1 raz na dobę</span> jako alternatywny selektywny antagonista receptorów alfa-1.\n• Finasteryd: <span class=\"dose-pill\">5 mg p.o. 1 raz na dobę</span> w długoterminowej terapii skojarzonej BPH przy objętości stercza >40 ml.\n• Płynoterapia w poliurii: <span class=\"dose-pill\">0,45% NaCl lub 0,9% NaCl i.v.</span> w ilości odpowiadającej 50–75% objętości godzinowej diurezy przy utracie >200 ml/h.",
      pitfalls: [
        "Napełnianie balonu cewnika Foleya przed zaobserwowaniem wypływu moczu z cewnika, co prowadzi do rozerwania cewki moczowej sterczowej i masywnego krwotoku.",
        "Podanie leków moczopędnych (furosemid) u pacjenta z ostrym zatrzymaniem moczu, co dramatycznie nasila przepełnienie pęcherza i grozi jego pęknięciem.",
        "Przeoczenie objawów urosepsy lub niewydolności nerkowej pozanerkowej (wzrost kreatyniny, kwasica, hiperkaliemia) w przewlekłym zastoju moczu.",
        "Niekontrolowana poliuria poprzeszkodowa bez substytucji płynów i elektrolitów, prowadząca do hiponatremii, hipokaliemii i wstrząsu hipowolemicznego."
      ]
    },
    diffTable: {
      title: "⚔️ Tabela Różnicowa: Ostre Zatrzymanie Moczu a Inne Zaburzenia Mikcji",
      headers: ["Stan kliniczny", "Objętość pęcherza (USG)", "Odczuwanie parcia na mocz", "Obraz kliniczny i ból", "Postępowanie doraźne"],
      rows: [
        ["Ostre zatrzymanie moczu (AUR)", "Przepełniony (>600–1200 ml)", "Bolesne, niezwykle silne parcie", "Nagły bolesny opór w podbrzuszu (globus vesicalis)", "Pilne cewnikowanie cewki moczowej (Foley 14–16 Ch)"],
        ["Bezmocz (anuria przednerkowa/nerkowa)", "Pusty pęcherz (<20 ml)", "Całkowity brak parcia na mocz", "Brak oporu w podbrzuszu, odwodnienie lub obrzęki", "Diagnostyka przyczyny nerkowej/naczyniowej, dializa"],
        ["Nietrzymanie z przepełnienia (ischuria paradoxa)", "Stale przepełniony (>800–1500 ml)", "Osłabione lub zniesione parcie", "Mimowolne popuszczanie kropel moczu, brak ostrego bólu", "Powolne odbarczenie pęcherza, stały cewnik moczowy"],
        ["Pęcherz neurogenny atoniczny", "Przepełniony przy braku czucia", "Brak czucia wypełnienia pęcherza", "Brak odruchu mikcyjnego, w wywiadzie uraz rdzenia/SM", "Czyste przerywane cewnikowanie (CIC) lub stały cewnik"],
        ["Zatkanie cewnika moczowego skrzepliną", "Przepełniony mimo obecności cewnika", "Nasilone bolesne parcie wokół cewnika", "Brak wypływu moczu do worka, wyciek obok cewnika", "Płukanie cewnika solą fizjologiczną strzykawką Janeta"]
      ]
    },
    lekQuestions: [
      {
        id: 1,
        q: "Najczęstszą przyczyną ostrego zatrzymania moczu (AUR) u mężczyzn po 60. roku życia jest:",
        question: "Najczęstszą przyczyną ostrego zatrzymania moczu (AUR) u mężczyzn po 60. roku życia jest:",
        opts: [
          "Łagodny rozrost stercza (benign prostatic hyperplasia - BPH)",
          "Jatrogenne pooperacyjne uszkodzenie nerwów miednicznych",
          "Złóg zablokowany w przednim odcinku cewki moczowej wiszącej",
          "Naciekający rak urotelialny ściany pęcherza moczowego",
          "Zapalenie opon mózgowo-rdzeniowych z odnerwieniem pęcherza"
        ],
        options: [
          "Łagodny rozrost stercza (benign prostatic hyperplasia - BPH)",
          "Jatrogenne pooperacyjne uszkodzenie nerwów miednicznych",
          "Złóg zablokowany w przednim odcinku cewki moczowej wiszącej",
          "Naciekający rak urotelialny ściany pęcherza moczowego",
          "Zapalenie opon mózgowo-rdzeniowych z odnerwieniem pęcherza"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Łagodny rozrost stercza odpowiada za ponad 60–70% wszystkich epizodów ostrego zatrzymania moczu u starszych mężczyzn.",
        expl: "Łagodny rozrost stercza odpowiada za ponad 60–70% wszystkich epizodów ostrego zatrzymania moczu u starszych mężczyzn.",
        explanation: "Łagodny rozrost stercza odpowiada za ponad 60–70% wszystkich epizodów ostrego zatrzymania moczu u starszych mężczyzn."
      },
      {
        id: 2,
        q: "Które z poniższych leków mogą bezpośrednio wywołać epizod ostrego zatrzymania moczu u mężczyzny z subklinicznym BPH?",
        question: "Które z poniższych leków mogą bezpośrednio wywołać epizod ostrego zatrzymania moczu u mężczyzny z subklinicznym BPH?",
        opts: [
          "Leki przeciwhistaminowe I generacji oraz leki sympatykomimetyczne (np. chlorfenamina, pseudoefedryna)",
          "Inhibitory konwertazy angiotensyny oraz sartany (np. ramipryl, peryndopryl lub walsartan)",
          "Statyny stosowane w pierwotnej i wtórnej prewencji chorób sercowo-naczyniowych (atorwastatyna)",
          "Kardioselektywne leki blokujące receptory beta-1-adrenergiczne (np. bisoprolol lub nebiwolol)",
          "Drobnocząsteczkowe heparyny stosowane podskórnie w standardowych dawkach profilaktycznych"
        ],
        options: [
          "Leki przeciwhistaminowe I generacji oraz leki sympatykomimetyczne (np. chlorfenamina, pseudoefedryna)",
          "Inhibitory konwertazy angiotensyny oraz sartany (np. ramipryl, peryndopryl lub walsartan)",
          "Statyny stosowane w pierwotnej i wtórnej prewencji chorób sercowo-naczyniowych (atorwastatyna)",
          "Kardioselektywne leki blokujące receptory beta-1-adrenergiczne (np. bisoprolol lub nebiwolol)",
          "Drobnocząsteczkowe heparyny stosowane podskórnie w standardowych dawkach profilaktycznych"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Cholinolityki (i leki przeciwhistaminowe I generacji) osłabiają skurcz wypieracza, a alfa-mimetyki (pseudoefedryna) kurczą szyję pęcherza, prowadząc do ostrego zatrzymania moczu.",
        expl: "Cholinolityki (i leki przeciwhistaminowe I generacji) osłabiają skurcz wypieracza, a alfa-mimetyki (pseudoefedryna) kurczą szyję pęcherza, prowadząc do ostrego zatrzymania moczu.",
        explanation: "Cholinolityki (i leki przeciwhistaminowe I generacji) osłabiają skurcz wypieracza, a alfa-mimetyki (pseudoefedryna) kurczą szyję pęcherza, prowadząc do ostrego zatrzymania moczu."
      },
      {
        id: 3,
        q: "Kluczową zasadą bezpieczeństwa podczas zakładania cewnika Foleya u mężczyzny zapobiegającą jatrogennemu uszkodzeniu cewki jest:",
        question: "Kluczową zasadą bezpieczeństwa podczas zakładania cewnika Foleya u mężczyzny zapobiegającą jatrogennemu uszkodzeniu cewki jest:",
        opts: [
          "Wprowadzenie cewnika na pełną długość aż do rozwidlenia i napełnienie balonu dopiero po potwierdzeniu wypływu moczu",
          "Napełnienie balonu uszczelniającego 10 ml soli fizjologicznej na głębokości 5 cm w cewce wiszącej",
          "Użycie maksymalnej siły nacisku w przypadku napotkania oporu w odcinku błoniastym cewki",
          "Zaniechanie podawania znieczulającego żelu z lignokainą w celu oceny zachowania czucia bólu",
          "Wypełnianie balonu cewnika wyłącznie sterylnym powietrzem pod wysokim ciśnieniem"
        ],
        options: [
          "Wprowadzenie cewnika na pełną długość aż do rozwidlenia i napełnienie balonu dopiero po potwierdzeniu wypływu moczu",
          "Napełnienie balonu uszczelniającego 10 ml soli fizjologicznej na głębokości 5 cm w cewce wiszącej",
          "Użycie maksymalnej siły nacisku w przypadku napotkania oporu w odcinku błoniastym cewki",
          "Zaniechanie podawania znieczulającego żelu z lignokainą w celu oceny zachowania czucia bólu",
          "Wypełnianie balonu cewnika wyłącznie sterylnym powietrzem pod wysokim ciśnieniem"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Napełnienie balonu cewnika przed osiągnięciem pęcherza (w świetle cewki sterczowej) prowadzi do rozerwania cewki. Należy wsunąć cewnik do samego rozwidlenia i upewnić się, że mocz płynie swobodnie.",
        expl: "Napełnienie balonu cewnika przed osiągnięciem pęcherza (w świetle cewki sterczowej) prowadzi do rozerwania cewki. Należy wsunąć cewnik do samego rozwidlenia i upewnić się, że mocz płynie swobodnie.",
        explanation: "Napełnienie balonu cewnika przed osiągnięciem pęcherza (w świetle cewki sterczowej) prowadzi do rozerwania cewki. Należy wsunąć cewnik do samego rozwidlenia i upewnić się, że mocz płynie swobodnie."
      },
      {
        id: 4,
        q: "W sytuacji, gdy próba założenia cewnika Foleya przez cewkę moczową u mężczyzny z AUR jest niemożliwa z powodu zwężenia cewki, kolejnym krokiem jest:",
        question: "W sytuacji, gdy próba założenia cewnika Foleya przez cewkę moczową u mężczyzny z AUR jest niemożliwa z powodu zwężenia cewki, kolejnym krokiem jest:",
        opts: [
          "Próba cewnikowania cewnikiem Tiemanna o zagiętym końcu lub wykonanie przezskórnej cystostomii nadłonowej",
          "Wielokrotne forsowne pchanie metalowego zgłębnika cewkowego bez kontroli urologa",
          "Podanie dożylne 100 mg furosemidu w celu wymuszenia pokonania zwężenia przez mocz",
          "Pozostawienie chorego bez leczenia zabiegowego i podanie doustnych leków przeciwbólowych",
          "Natychmiastowe obustronne nakłucie lędźwiowe w celu odbarczenia płynu mózgowo-rdzeniowego"
        ],
        options: [
          "Próba cewnikowania cewnikiem Tiemanna o zagiętym końcu lub wykonanie przezskórnej cystostomii nadłonowej",
          "Wielokrotne forsowne pchanie metalowego zgłębnika cewkowego bez kontroli urologa",
          "Podanie dożylne 100 mg furosemidu w celu wymuszenia pokonania zwężenia przez mocz",
          "Pozostawienie chorego bez leczenia zabiegowego i podanie doustnych leków przeciwbólowych",
          "Natychmiastowe obustronne nakłucie lędźwiowe w celu odbarczenia płynu mózgowo-rdzeniowego"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Przy trudnościach w cewnikowaniu stosuje się cewnik ze stożkowym, zagiętym końcem (Tiemanna). W razie niepowodzenia metodą z wyboru jest punkcja nadłonowa i założenie cystostomii (cystofix).",
        expl: "Przy trudnościach w cewnikowaniu stosuje się cewnik ze stożkowym, zagiętym końcem (Tiemanna). W razie niepowodzenia metodą z wyboru jest punkcja nadłonowa i założenie cystostomii (cystofix).",
        explanation: "Przy trudnościach w cewnikowaniu stosuje się cewnik ze stożkowym, zagiętym końcem (Tiemanna). W razie niepowodzenia metodą z wyboru jest punkcja nadłonowa i założenie cystostomii (cystofix)."
      },
      {
        id: 5,
        q: "Które z poniższych stwierdzeń dotyczących krwiomoczu z odbarczenia (haematuria ex vacuo) po ewakuacji moczu jest PRAWDZIWE?",
        question: "Które z poniższych stwierdzeń dotyczących krwiomoczu z odbarczenia (haematuria ex vacuo) po ewakuacji moczu jest PRAWDZIWE?",
        opts: [
          "Jest to zazwyczaj łagodne, samoograniczające się krwawienie wynikające z gwałtownego obniżenia ciśnienia w śródściennych naczyniach pęcherza",
          "Stanowi bezwzględne wskazanie do natychmiastowej pilnej laparotomii zwiadowczej i całkowitej radykalnej resekcji pęcherza moczowego",
          "Występuje wyłącznie u pacjentów, u których doszło do mechanicznego pęknięcia torebki stercza podczas badania palcem przez odbyt",
          "Można mu całkowicie zapobiec poprzez rutynowe cykliczne zaciskanie drenu cewnika po spuszczeniu każdych kolejnych 100 ml moczu",
          "Wymaga obligatoryjnego przetoczenia co najmniej czterech jednostek koncentratu krwinek czerwonych w ciągu pierwszych dwóch godzin"
        ],
        options: [
          "Jest to zazwyczaj łagodne, samoograniczające się krwawienie wynikające z gwałtownego obniżenia ciśnienia w śródściennych naczyniach pęcherza",
          "Stanowi bezwzględne wskazanie do natychmiastowej pilnej laparotomii zwiadowczej i całkowitej radykalnej resekcji pęcherza moczowego",
          "Występuje wyłącznie u pacjentów, u których doszło do mechanicznego pęknięcia torebki stercza podczas badania palcem przez odbyt",
          "Można mu całkowicie zapobiec poprzez rutynowe cykliczne zaciskanie drenu cewnika po spuszczeniu każdych kolejnych 100 ml moczu",
          "Wymaga obligatoryjnego przetoczenia co najmniej czterech jednostek koncentratu krwinek czerwonych w ciągu pierwszych dwóch godzin"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Haematuria ex vacuo jest wynikiem dekompresji pęcherza i pękania drobnych naczyń śluzówki. Ma charakter przemijający i łagodny. Zgodnie z badaniami etapowe zaciskanie cewnika nie zapobiega temu zjawisku.",
        expl: "Haematuria ex vacuo jest wynikiem dekompresji pęcherza i pękania drobnych naczyń śluzówki. Ma charakter przemijający i łagodny. Zgodnie z badaniami etapowe zaciskanie cewnika nie zapobiega temu zjawisku.",
        explanation: "Haematuria ex vacuo jest wynikiem dekompresji pęcherza i pękania drobnych naczyń śluzówki. Ma charakter przemijający i łagodny. Zgodnie z badaniami etapowe zaciskanie cewnika nie zapobiega temu zjawisku."
      },
      {
        id: 6,
        q: "Oceń prawdziwość stwierdzeń dotyczących próby usunięcia cewnika (TWOC) u chorych po epizodzie AUR w przebiegu BPH:\nI. Zastosowanie alfa-1-blokera przed próbą TWOC istotnie zwiększa szansę na powodzenie mikcji.\nII. Zaleca się utrzymanie leczenia alfa-blokerem przez co najmniej 2–3 dni przed usunięciem cewnika.\nIII. Niepowodzenie próby TWOC jest wskazaniem do ponownego zacewnikowania i kwalifikacji do leczenia zabiegowego (TURP).\nIV. TWOC należy przeprowadzać wyłącznie w znieczuleniu ogólnym na bloku operacyjnym.",
        question: "Oceń prawdziwość stwierdzeń dotyczących próby usunięcia cewnika (TWOC) u chorych po epizodzie AUR w przebiegu BPH:\nI. Zastosowanie alfa-1-blokera przed próbą TWOC istotnie zwiększa szansę na powodzenie mikcji.\nII. Zaleca się utrzymanie leczenia alfa-blokerem przez co najmniej 2–3 dni przed usunięciem cewnika.\nIII. Niepowodzenie próby TWOC jest wskazaniem do ponownego zacewnikowania i kwalifikacji do leczenia zabiegowego (TURP).\nIV. TWOC należy przeprowadzać wyłącznie w znieczuleniu ogólnym na bloku operacyjnym.",
        opts: [
          "Prawdziwe są zdania: I, II, III",
          "Prawdziwe są zdania: II, III, IV",
          "Prawdziwe są zdania: I, III, IV",
          "Prawdziwe są wszystkie zdania (I, II, III, IV)",
          "Prawdziwe są tylko zdania: I oraz IV"
        ],
        options: [
          "Prawdziwe są zdania: I, II, III",
          "Prawdziwe są zdania: II, III, IV",
          "Prawdziwe są zdania: I, III, IV",
          "Prawdziwe są wszystkie zdania (I, II, III, IV)",
          "Prawdziwe są tylko zdania: I oraz IV"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Zdania I, II i III są prawdziwe. Zdanie IV jest fałszywe – TWOC to prosta procedura ambulatoryjna/oddziałowa polegająca na usunięciu cewnika rano i ocenie mikcji.",
        expl: "Zdania I, II i III są prawdziwe. Zdanie IV jest fałszywe – TWOC to prosta procedura ambulatoryjna/oddziałowa polegająca na usunięciu cewnika rano i ocenie mikcji.",
        explanation: "Zdania I, II i III są prawdziwe. Zdanie IV jest fałszywe – TWOC to prosta procedura ambulatoryjna/oddziałowa polegająca na usunięciu cewnika rano i ocenie mikcji."
      },
      {
        id: 7,
        q: "Kiedy rozpoznaje się poliurię poprzeszkodową (post-obstructive diuresis) po odbarczeniu ostrego zatrzymania moczu?",
        question: "Kiedy rozpoznaje się poliurię poprzeszkodową (post-obstructive diuresis) po odbarczeniu ostrego zatrzymania moczu?",
        opts: [
          "Gdy diureza przekracza 200 ml na godzinę przez co najmniej 2 kolejne godziny lub ponad 3000–4000 ml na dobę",
          "Gdy diureza dobowa wynosi od 1000 do 1500 ml przy prawidłowym ciężarze właściwym moczu",
          "Wyłącznie wtedy, gdy stężenie kreatyniny we krwi wzrasta o ponad 100% w pierwszej dobie",
          "Gdy dochodzi do bezmoczu trwającego ponad 6 godzin po usunięciu przeszkody odpływu",
          "Gdy ciężar właściwy moczu przekracza wartość 1,040 g/ml przy prawidłowej glikemii"
        ],
        options: [
          "Gdy diureza przekracza 200 ml na godzinę przez co najmniej 2 kolejne godziny lub ponad 3000–4000 ml na dobę",
          "Gdy diureza dobowa wynosi od 1000 do 1500 ml przy prawidłowym ciężarze właściwym moczu",
          "Wyłącznie wtedy, gdy stężenie kreatyniny we krwi wzrasta o ponad 100% w pierwszej dobie",
          "Gdy dochodzi do bezmoczu trwającego ponad 6 godzin po usunięciu przeszkody odpływu",
          "Gdy ciężar właściwy moczu przekracza wartość 1,040 g/ml przy prawidłowej glikemii"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Poliuria poprzeszkodowa to patologiczne wydalanie moczu >200 ml/h przez ponad 2 kolejne godziny lub >3–4 l/dobę, wywołane wypłukaniem gradientu rdzeniowego i niewrażliwością na ADH.",
        expl: "Poliuria poprzeszkodowa to patologiczne wydalanie moczu >200 ml/h przez ponad 2 kolejne godziny lub >3–4 l/dobę, wywołane wypłukaniem gradientu rdzeniowego i niewrażliwością na ADH.",
        explanation: "Poliuria poprzeszkodowa to patologiczne wydalanie moczu >200 ml/h przez ponad 2 kolejne godziny lub >3–4 l/dobę, wywołane wypłukaniem gradientu rdzeniowego i niewrażliwością na ADH."
      },
      {
        id: 8,
        q: "Złotym standardem leczenia chirurgicznego łagodnego rozrostu stercza o objętości 30–80 ml u chorych z nawrotowym zatrzymaniem moczu pozostaje:",
        question: "Złotym standardem leczenia chirurgicznego łagodnego rozrostu stercza o objętości 30–80 ml u chorych z nawrotowym zatrzymaniem moczu pozostaje:",
        opts: [
          "Przezcewkowa elektroresekcja stercza (TURP - transurethral resection of the prostate)",
          "Radykalna prostatektomia załonowa z obustronną limfadenektomią zasłonową",
          "Obustronna orchiektomia podtorebkowa z następową radioterapią miednicy",
          "Zewnątrzotrzewnowe wyłuszczenie gruczolaka stercza metodą Millina",
          "Otwarta resekcja przedniej ściany pęcherza z plastyką szyi pęcherza"
        ],
        options: [
          "Przezcewkowa elektroresekcja stercza (TURP - transurethral resection of the prostate)",
          "Radykalna prostatektomia załonowa z obustronną limfadenektomią zasłonową",
          "Obustronna orchiektomia podtorebkowa z następową radioterapią miednicy",
          "Zewnątrzotrzewnowe wyłuszczenie gruczolaka stercza metodą Millina",
          "Otwarta resekcja przedniej ściany pęcherza z plastyką szyi pęcherza"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "TURP (transurethral resection of the prostate) pozostaje złotym standardem chirurgicznego leczenia BPH w przedziale objętości 30–80 ml.",
        expl: "TURP (transurethral resection of the prostate) pozostaje złotym standardem chirurgicznego leczenia BPH w przedziale objętości 30–80 ml.",
        explanation: "TURP (transurethral resection of the prostate) pozostaje złotym standardem chirurgicznego leczenia BPH w przedziale objętości 30–80 ml."
      },
      {
        id: 9,
        q: "W zespole poresekcyjnym (TUR syndrome) powikłającym klasyczny monopolarny zabieg TURP kluczowym mechanizmem patofizjologicznym jest:",
        question: "W zespole poresekcyjnym (TUR syndrome) powikłającym klasyczny monopolarny zabieg TURP kluczowym mechanizmem patofizjologicznym jest:",
        opts: [
          "Przewodnienie hipotoniczne z ciężką hiponatremią z rozcieńczenia wskutek wchłonięcia płynu płuczącego (np. glicyny)",
          "Ciężka hipernatremia z hiperosmolalnością wywołana utratą czystej wody w trakcie koagulacji",
          "Masywna zatorowość powietrzna pnia płucnego z nagłym spadkiem saturacji i sinicą",
          "Ostre uszkodzenie nerek spowodowane krystalizacją szczawianu wapnia w cewkach zbiorczych",
          "Piorunująca posocznica gronkowcowa wywołana zakażeniem łożyska naczyniowego stercza"
        ],
        options: [
          "Przewodnienie hipotoniczne z ciężką hiponatremią z rozcieńczenia wskutek wchłonięcia płynu płuczącego (np. glicyny)",
          "Ciężka hipernatremia z hiperosmolalnością wywołana utratą czystej wody w trakcie koagulacji",
          "Masywna zatorowość powietrzna pnia płucnego z nagłym spadkiem saturacji i sinicą",
          "Ostre uszkodzenie nerek spowodowane krystalizacją szczawianu wapnia w cewkach zbiorczych",
          "Piorunująca posocznica gronkowcowa wywołana zakażeniem łożyska naczyniowego stercza"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Zespół TURP wynika z wchłonięcia hipoosmolarnych płynów płuczących (np. roztworu 1,5% glicyny) przez otwarte zatoki żylne stercza, powodując hiponatremię z rozcieńczenia, obrzęk mózgu i zaburzenia neurologiczne.",
        expl: "Zespół TURP wynika z wchłonięcia hipoosmolarnych płynów płuczących (np. roztworu 1,5% glicyny) przez otwarte zatoki żylne stercza, powodując hiponatremię z rozcieńczenia, obrzęk mózgu i zaburzenia neurologiczne.",
        explanation: "Zespół TURP wynika z wchłonięcia hipoosmolarnych płynów płuczących (np. roztworu 1,5% glicyny) przez otwarte zatoki żylne stercza, powodując hiponatremię z rozcieńczenia, obrzęk mózgu i zaburzenia neurologiczne."
      },
      {
        id: 10,
        q: "Zgodnie z ustawą o prawach pacjenta i Rzeczniku Praw Pacjenta, wykonanie nakłucia nadłonowego (cystostomii) u przytomnego chorego wymaga:",
        question: "Zgodnie z ustawą o prawach pacjenta i Rzeczniku Praw Pacjenta, wykonanie nakłucia nadłonowego (cystostomii) u przytomnego chorego wymaga:",
        opts: [
          "Uzyskania pisemnej zgody pacjenta po uprzednim przystępnym poinformowaniu o celu zabiegu i możliwych powikłaniach",
          "Wyłącznie ustnej zgody pacjenta odnotowanej pobieżnie w raporcie pielęgniarskim dyżuru",
          "Zgody najbliższego krewnego pacjenta niezależnie od stanu świadomości samego chorego",
          "Uchwały konsylium trzech lekarzy specjalistów urologii zatwierdzonej przez dyrektora",
          "Zgody sądu opiekuńczego wydanej w trybie pilnym w ciągu 24 godzin od zgłoszenia"
        ],
        options: [
          "Uzyskania pisemnej zgody pacjenta po uprzednim przystępnym poinformowaniu o celu zabiegu i możliwych powikłaniach",
          "Wyłącznie ustnej zgody pacjenta odnotowanej pobieżnie w raporcie pielęgniarskim dyżuru",
          "Zgody najbliższego krewnego pacjenta niezależnie od stanu świadomości samego chorego",
          "Uchwały konsylium trzech lekarzy specjalistów urologii zatwierdzonej przez dyrektora",
          "Zgody sądu opiekuńczego wydanej w trybie pilnym w ciągu 24 godzin od zgłoszenia"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Nakłucie pęcherza moczowego i wytworzenie przetoki nadłonowej jest zabiegiem inwazyjnym o podwyższonym ryzyku, dlatego wymaga pisemnej zgody pacjenta po uprzednim poinformowaniu.",
        expl: "Nakłucie pęcherza moczowego i wytworzenie przetoki nadłonowej jest zabiegiem inwazyjnym o podwyższonym ryzyku, dlatego wymaga pisemnej zgody pacjenta po uprzednim poinformowaniu.",
        explanation: "Nakłucie pęcherza moczowego i wytworzenie przetoki nadłonowej jest zabiegiem inwazyjnym o podwyższonym ryzyku, dlatego wymaga pisemnej zgody pacjenta po uprzednim poinformowaniu."
      },
      {
        id: 11,
        q: "Który z poniższych objawów klinicznych pozwala najpewniej odróżnić ostre zatrzymanie moczu od bezmoczu (anurii) w badaniu fizykalnym?",
        question: "Który z poniższych objawów klinicznych pozwala najpewniej odróżnić ostre zatrzymanie moczu od bezmoczu (anurii) w badaniu fizykalnym?",
        opts: [
          "Obecność bolesnego chełboczącego oporu w podbrzuszu o stłumionym odgłosie opukowym (globus vesicalis) oraz silne parcie",
          "Występowanie nudności i wymiotów o charakterze fusowatym w trakcie badania palpacyjnego brzucha",
          "Wzrost stężenia troponiny sercowej w powtarzanych oznaczeniach laboratoryjnych krwi żylnej",
          "Podwyższenie temperatury ciała powyżej 39°C z towarzyszącą leukopenią poniżej 3000/ul",
          "Obustronne osłabienie odruchów kolanowych i skokowych w badaniu neurologicznym kończyn"
        ],
        options: [
          "Obecność bolesnego chełboczącego oporu w podbrzuszu o stłumionym odgłosie opukowym (globus vesicalis) oraz silne parcie",
          "Występowanie nudności i wymiotów o charakterze fusowatym w trakcie badania palpacyjnego brzucha",
          "Wzrost stężenia troponiny sercowej w powtarzanych oznaczeniach laboratoryjnych krwi żylnej",
          "Podwyższenie temperatury ciała powyżej 39°C z towarzyszącą leukopenią poniżej 3000/ul",
          "Obustronne osłabienie odruchów kolanowych i skokowych w badaniu neurologicznym kończyn"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Globus vesicalis (guz pęcherzowy dający stłumienie opukowe) w połączeniu z bolesnym parciem jednoznacznie wskazuje na zatrzymanie moczu w pęcherzu, w przeciwieństwie do anurii, gdzie pęcherz jest pusty.",
        expl: "Globus vesicalis (guz pęcherzowy dający stłumienie opukowe) w połączeniu z bolesnym parciem jednoznacznie wskazuje na zatrzymanie moczu w pęcherzu, w przeciwieństwie do anurii, gdzie pęcherz jest pusty.",
        explanation: "Globus vesicalis (guz pęcherzowy dający stłumienie opukowe) w połączeniu z bolesnym parciem jednoznacznie wskazuje na zatrzymanie moczu w pęcherzu, w przeciwieństwie do anurii, gdzie pęcherz jest pusty."
      }
    ],
    flashcards: [
      {
        q: "Co to jest globus vesicalis i jak manifestuje się w badaniu fizykalnym?",
        a: "Przepełniony pęcherz moczowy; wyczuwalny jako bolesny opór w podbrzuszu dający stłumienie opukowe."
      },
      {
        q: "Dlaczego pseudoefedryna może wywołać ostre zatrzymanie moczu u chorych z BPH?",
        a: "Stymuluje receptory alfa-1-adrenergiczne, wywołując skurcz mięśniówki gładkiej szyi pęcherza i stercza."
      },
      {
        q: "Kiedy wolno napełnić balon cewnika Foleya podczas cewnikowania mężczyzny?",
        a: "Wyłącznie po wprowadzeniu cewnika na pełną długość i zaobserwowaniu wypływu moczu."
      },
      {
        q: "Co to jest poliuria poprzeszkodowa (post-obstructive diuresis)?",
        a: "Wydalanie moczu >200 ml/h przez >2 kolejne godziny po odbarczeniu ostrej niedrożności dróg moczowych."
      },
      {
        q: "Jaki lek podaje się przed próbą usunięcia cewnika (TWOC) w celu zwiększenia szans na mikcję?",
        a: "Alfa-1-adrenolityk (np. tamsulozynę 0,4 mg/d) przez co najmniej 2–3 dni."
      },
      {
        q: "Co należy zrobić, gdy próba założenia cewnika przezcewkowego w AUR jest nieskuteczna?",
        a: "Użyć cewnika ze zagiętym końcem (Tiemanna), a w razie niepowodzenia wykonać nakłucie nadłonowe (cystostomię)."
      }
    ]
  },
  // =========================================================================
  // CASE 169: Skręt Jądra i Powrózka Nasiennego (Torsio Testis)
  // =========================================================================
  {
    id: 169,
    file: "169_skret_jadra_torsio_testis.json",
    shortTitle: "Skręt Jądra (Torsio Testis)",
    title: "Urologiczny Stan Nagły: Skręt Jądra i Powrózka Nasiennego",
    dept: "Urologia / Chirurgia Dziecięca",
    diagnosisTitle: "Ostre Niedokrwienie Jądra w Przebiegu Skrętu Powrózka Nasiennego (Torsio Testis)",
    vitals: [
      { label: "Ciśnienie tętnicze (RR)", val: "135/85", unit: "mmHg", status: "vital-ok" },
      { label: "Częstość akcji serca (HR)", val: "108", unit: "/min", status: "vital-warn" },
      { label: "Częstość oddechów (RR)", val: "18", unit: "/min", status: "vital-ok" },
      { label: "Saturacja (SpO2)", val: "99", unit: "%", status: "vital-ok" },
      { label: "Temperatura ciała", val: "36.9", unit: "°C", status: "vital-ok" }
    ],
    story: "<p><strong>Pacjent:</strong> 16-letni chłopiec zgłasza się na SOR w asyście rodziców z powodu nagłego, rozdzierającego bólu lewego jądra trwającego od 2 godzin.</p><p><strong>Wywiad chorobowy:</strong> Ból wybudził pacjenta ze snu około godziny 5:00 rano. Dolegliwości mają charakter ciągły, gwałtowny, o skrajnym nasileniu (10/10 w skali NRS), promieniują wzdłuż powrózka nasiennego do lewego dołu biodrowego i podbrzusza. Wystąpiły silne nudności oraz dwukrotne wymioty treścią pokarmową. Rodzice zaprzeczają urazowi mechanicznemu narządów płciowych. Chłopiec nie gorączkuje, nie zgłasza wycieku z cewki moczowej ani objawów dyzurycznych (pieczenia przy oddawaniu moczu).</p><p><strong>Badanie przedmiotowe:</strong> Nastolatek cierpiący, blady, zgięty w pół, stawia ostrożne kroki ze względu na nasilanie się bólu przy jakimkolwiek ruchu lewej kończyny dolnej. W badaniu narządów płciowych: lewa połowa moszny powiększona, obrzęknięta, skóra napięta i zaczerwieniona. Lewe jądro jest wyraźnie uniesione w kierunku pierścienia pachwinowego zewnętrznego i ustawione poprzecznie / horyzontalnie (tzw. objaw Brunzela). Przy próbie uniesienia lewego jądra ku górze ból nasila się lub nie zmienia (ujemny objaw Prehna). Odruch z mięśnia dźwigacza jądra (odruch nosidłowy / cremasteric reflex) po stronie lewej jest całkowicie zniesiony, po stronie prawej zachowany i żywy. Jądro prawe w mosznie ułożone prawidłowo, niebolesne.</p>",
    steps: [
      {
        title: "Krok 1: Strategia postępowania i czynnik czasu (okno 6 godzin)",
        scenario: "Dolegliwości trwają 2 godziny. W badaniu fizykalnym obecne są klasyczne objawy skrętu lewego powrózka nasiennego. Pracownia USG informuje, że badanie Dopplerowskie może odbyć się najwcześniej za 90 minut. Jakie jest prawidłowe postępowanie lekarza SOR?",
        options: [
          {
            text: "Natychmiastowe wezwanie dyżurnego urologa / chirurga dziecięcego i przygotowanie pacjenta do pilnej rewizji chirurgicznej moszny bez zwłoki na badania obrazowe",
            correct: true,
            isCorrect: true,
            feedback: "✅ PRAWIDŁOWO! Skręt powrózka nasiennego to bezwzględny stan nagły, w którym 'czas to narząd'. Złote okno na uratowanie jądra wynosi 6 godzin od początku bólu (odsetek powodzenia >90%, po 12h spada do <20%). Zgodnie z wytycznymi EAU, podejrzenie kliniczne wymaga natychmiastowej eksploracji operacyjnej; nie wolno opóźniać zabiegu w oczekiwaniu na USG!"
          },
          {
            text: "Wstrzymanie jakichkolwiek działań chirurgicznych do czasu wykonania pełnego badania ultrasonograficznego z oceną spektralną przepływów w tętnicach jądrowych",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Czekanie na USG przekroczy okno czasowe 6 godzin i doprowadzi do nieodwracalnej martwicy krwotocznej jądra oraz konieczności orchiektomii!"
          },
          {
            text: "Podanie dożylne ampicyliny z gentamycyną i skierowanie chłopca do rejonowej poradni urologicznej w celu planowej konsultacji w kolejnym dniu",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Antybiotykoterapia nie leczy skrętu powrózka nasiennego; odesłanie pacjenta oznacza utratę jądra i ciężkie okaleczenie nastolatka!"
          },
          {
            text: "Zalecenie ciasnego uniesienia moszny za pomocą suspensorium oraz przyłożenie gorącego kompresu rozgrzewającego na lewą okolicę pachwinową",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Rozgrzewanie niedokrwionego narządu drastycznie zwiększa jego zapotrzebowanie metaboliczne na tlen, przyspieszając obumarcie kanalików nasiennych."
          }
        ]
      },
      {
        title: "Krok 2: Doraźna próba derotacji manualnej na SOR",
        scenario: "W oczekiwaniu na zespół operacyjny (ok. 20–30 minut) lekarz decyduje się na próbę doraźnego odkręcenia jądra metodą zamkniętą. W jakim kierunku należy rotować lewe jądro i jakie są zasady tej procedury?",
        options: [
          {
            text: "Rotacja od wewnątrz na zewnątrz w stronę uda (ruch jak przy otwieraniu książki – dla lewego jądra zgodnie z ruchem wskazówek zegara), pamiętając o konieczności operacji",
            correct: true,
            isCorrect: true,
            feedback: "✅ PRAWIDŁOWO! Ponad 2/3 skrętów następuje do wewnątrz (przyśrodkowo). Doraźna derotacja polega na odkręcaniu jądra na zewnątrz ('open book' – lewe jądro w prawo / zgodnie ze wskazówkami zegara). Nawet przy ustąpieniu bólu zabieg operacyjny jest BEZWZGLĘDNIE KONIECZNY w celu fiksacji jądra!"
          },
          {
            text: "Forsowna rotacja jądra do wewnątrz ku linii pośrodkowej ciała aż do momentu pojawienia się trzasku w powrózku nasiennym",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Rotacja do wewnątrz najczęściej pogłębia skręt powrózka, powodując całkowite zaciśnięcie tętnicy jądrowej i natychmiastowe obumarcie jądra."
          },
          {
            text: "Uznanie, że ustąpienie dolegliwości bólowych po manualnym odkręceniu całkowicie zwalnia z konieczności wykonania zabiegu operacyjnego",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Brak operacyjnej orchidopeksji po manewrze ręcznym wiąże się z niemal 100% ryzykiem ponownego, nawrotowego skrętu w najbliższym czasie."
          },
          {
            text: "Głębokie nakłucie miąższu jądra grubą igłą 14G w celu odbarczenia krwi żylnej przed próbą wykonania jakichkolwiek manewrów rotacyjnych",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Punkcja miąższu jądra jest absolutnie przeciwwskazana – prowadzi do krwiaka śródmiąższowego i zniszczenia bariery krew-jądro."
          }
        ]
      },
      {
        title: "Krok 3: Zakres interwencji chirurgicznej na bloku operacyjnym",
        scenario: "Na sali operacyjnej chirurg odsłonił lewe jądro – było skręcone o 360 stopni, sino-fioletowe. Po odkręceniu i obłożeniu ciepłymi serwetami z 0,9% NaCl przez 15 minut powróciło różowe zabarwienie i aktywne krwawienie po nacięciu osłonki. Jaki powinien być pełny zakres zabiegu?",
        options: [
          {
            text: "Orchidopeksja lewego jądra w mosznie oraz OBLIGATORYJNA profilaktyczna orchidopeksja jądra przeciwległego (prawego) z powodu obustronnej wady anatomicznej 'serca dzwonu'",
            correct: true,
            isCorrect: true,
            feedback: "✅ PRAWIDŁOWO! Wrodzona anomalia anatomiczna sprzyjająca skrętowi (tzw. bell-clapper deformity – wysokie objęcie jądra i najądrza przez osłonkę pochwową) występuje OBUSTRONNIE u ponad 50–80% pacjentów. Dlatego standardem sztuki urologicznej jest zawsze obustronna orchidopeksja, chroniąca chorego przed skrętem jedynego pozostałego jądra w przyszłości!"
          },
          {
            text: "Wyłącznie fiksacja lewego jądra jednym szwem i pozostawienie jądra prawego bez otwierania moszny z uwagi na brak objawów",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Zaniechanie fiksacji jądra przeciwległego to ciężki błąd w sztuce – chory pozostaje w grupie ryzyka utraty drugiego jądra w kolejnym epizodzie skrętu."
          },
          {
            text: "Wykonanie bezwzględnej orchiektomii obustronnej u każdego nastolatka z epizodem skrętu w celu prewencji nowotworów zarodkowych",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Usunięcie żywotnego jądra i jądra zdrowego to okaleczenie prowadzące do bezpłodności i kastracji farmakologiczno-chirurgicznej."
          },
          {
            text: "Pozostawienie jądra lewego swobodnie w mosznie bez przyszywania do osłonek w celu zapewnienia fizjologicznej termoregulacji",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Brak fiksacji (orchidopeksji) gwarantuje ponowny skręt tego samego jądra w ciągu najbliższych tygodni lub miesięcy."
          }
        ]
      }
    ],
    pathoNodes: [
      {
        id: "patho_1",
        title: "Predyspozycja anatomiczna – anomalia serca dzwonu (bell-clapper)",
        desc: "W warunkach prawidłowych osłonka pochwowa jądra przyczepia się do tylno-bocznej powierzchni, unieruchamiając jądro. W anomalii serca dzwonu obejmuje ona jądro, najądrze i dystalny powrózek nasienny, zawieszając jądro swobodnie w jamie osłonki jak serce dzwonu i predysponując do rotacji osiowej.",
        target: "Chirurgiczna obustronna orchidopeksja (fiksacja jądra do ściany moszny)"
      },
      {
        id: "patho_2",
        title: "Okluzja naczyniowa: zastój żylny i niedokrwienie tętnicze",
        desc: "Skręt powrózka o 180–720° w pierwszej kolejności zaciska cienkościenne naczynia żylne splotu wiciowatego (pampiniformis), powodując gwałtowny zastój, krwiotok śródmiąższowy i masywny obrzęk. Wzrost ciśnienia tkankowego zamyka tętnicę jądrową, prowadząc do ostrej hipoksji i martwicy krwotocznej.",
        target: "Pilne odkręcenie powrózka (derotacja manualna lub chirurgiczna w oknie <6h)"
      },
      {
        id: "patho_3",
        title: "Przełamanie bariery krew-jądro i autoimmunizacja",
        desc: "Przedłużone niedokrwienie prowadzi do martwicy komórek nabłonka plemnikotwórczego i uszkodzenia bariery krew-jądro (tworzonej przez obwódki zamykające komórek Sertolego). Ekspozycja antygenów plemnikowych wyzwala powstawanie przeciwciał przeciwplemnikowych (ASA), grożąc niepłodnością.",
        target: "Ocena żywotności i ewentualna orchiektomia jądra martwiczego w celu ochrony drugiego jądra"
      }
    ],
    dutySummary: {
      diagnostics: "1. Natychmiastowe badanie fizykalne narządów płciowych: ocena ułożenia jądra (poprzeczne uniesione – objaw Brunzela), odruchu nosidłowego (zniesiony po stronie chorej) oraz objawu Prehna (ujemny – uniesienie nie łagodzi bólu).\n\n2. Czas to narząd: rozpoznanie skrętu jądra jest rozpoznaniem KLINICZNYM i stanowi bezwzględne wskazanie do pilnej operacji; nie wolno opóźniać zabiegu w oczekiwaniu na badania obrazowe.\n\n3. Badanie ultrasonograficzne moszny z oceną przepływów metodą Color Doppler i Power Doppler (brak przepływu w miąższu jądra, objaw węzła/ślimaka 'whirlpool sign' na powrózku) – wykonywane wyłącznie, jeśli nie powoduje opóźnienia bloku operacyjnego.\n\n4. Przygotowanie do zabiegu w znieczuleniu ogólnym: grupa krwi, morfologia, układ krzepnięcia, status 'na czczo'.",
      drugsAndDoses: "• Analgezja dożylna: <span class=\"dose-pill\">paracetamol 1000 mg i.v.</span> w połączeniu z NLPZ (np. ketoprofen <span class=\"dose-pill\">100 mg i.v.</span> u pacjentów powyżej 15. r.ż.).\n• Analgezja opioidowa: <span class=\"dose-pill\">morfina 2–5 mg i.v. powoli miareczkowana</span> w razie ostrego bólu o natężeniu 10/10 w skali NRS.\n• Miejscowe znieczulenie powrózka nasiennego (blokada powrózka): <span class=\"dose-pill\">5–10 ml 1% lidokainy bez adrenaliny</span> w okolicy pierścienia pachwinowego zewnętrznego przed próbą ręcznej derotacji.\n• Osłona okołooperacyjna: <span class=\"dose-pill\">cefazolina 1–2 g i.v.</span> na 30–60 minut przed nacięciem skóry moszny.",
      pitfalls: [
        "Opóźnianie interwencji chirurgicznej w oczekiwaniu na badanie USG Doppler – po upływie 6 godzin szanse na uratowanie jądra drastycznie spadają z 90% do poniżej 20%.",
        "Mylenie skrętu jądra z ostrym zapaleniem najądrza u nastolatka (zapalenie najądrza jest rzadkie przed rozpoczęciem współżycia, ma dodatni objaw Prehna i zachowany odruch nosidłowy).",
        "Zaniechanie profilaktycznej orchidopeksji jądra przeciwległego (zdrowego) – anomalia anatomiczna predysponująca do skrętu występuje obustronnie u większości chorych.",
        "Uznanie, że udana derotacja manualna na SOR zwalnia z zabiegu operacyjnego – bez chirurgicznej fiksacji ryzyko ponownego skrętu jest niemal stuprocentowe."
      ]
    },
    diffTable: {
      title: "⚔️ Tabela Różnicowa: Ostre Schorzenia Moszny (Ostra Moszna)",
      headers: ["Jednostka chorobowa", "Początek i charakter bólu", "Odruch nosidłowy", "Objaw Prehna", "Postępowanie z wyboru"],
      rows: [
        ["Skręt jądra i powrózka (torsio testis)", "Nagły, rozdzierający (minuty), często wybudza ze snu", "CAŁKOWICIE ZNIESIONY po stronie chorej", "UJEMNY (uniesienie jądra nasila lub nie łagodzi bólu)", "Pilna rewizja chirurgiczna moszny i obustronna orchidopeksja (<6h)"],
        ["Zapalenie najądrza (epididymitis)", "Stopniowy, narastający w ciągu 1–2 dni, gorączka, dyzuria", "PRAWIDŁOWY (zachowany)", "DODATNI (uniesienie jądra przynosi wyraźną ulgę w bólu)", "Antybiotykoterapia celowana (ceftriakson + doksycyklina), leki p-zapalne"],
        ["Skręt przyczepka jądra (Morgagniego)", "Ostry lub podostry, zlokalizowany w górnym biegunie", "PRAWIDŁOWY (zachowany)", "Zmienny / ujemny, objaw 'niebieskiej plamki' (blue dot sign)", "Leczenie zachowawcze (NLPZ, leżenie), zabieg przy wątpliwościach"],
        ["Uwięźnięta przepuklina pachwinowo-mosznowa", "Nagły ból moszny z objawami niedrożności przewodu pokarmowego", "Prawidłowy lub trudny do oceny", "Ujemny, chełboczący opór przechodzący do kanału pachwinowego", "Pilna operacja odprowadzenia przepukliny i plastyki kanału"],
        ["Uraz jądra z pęknięciem osłonki białawej", "Bezpośrednio po urazie tępego moszny, masywny krwiak", "Może być osłabiony przez bolesny krwiak", "Ujemny, obrzęk i zasinienie moszny", "Pilna rewizja chirurgiczna moszny, zaopatrzenie pęknięcia osłonki"]
      ]
    },
    lekQuestions: [
      {
        id: 1,
        q: "Złotym oknem czasowym od wystąpienia pierwszych objawów bólowych, w którym szanse na uratowanie żywotności jądra w skręcie powrózka wynoszą ponad 90%, jest:",
        question: "Złotym oknem czasowym od wystąpienia pierwszych objawów bólowych, w którym szanse na uratowanie żywotności jądra w skręcie powrózka wynoszą ponad 90%, jest:",
        opts: [
          "Pierwsze 6 godzin od początku dolegliwości",
          "Okres od 12 do 24 godzin od wystąpienia bólu",
          "Pierwsze 48 godzin przy stosowaniu zimnych okładów",
          "Dowolny czas do 72 godzin od ustąpienia wymiotów",
          "Pierwsze 5 dni pod warunkiem podania antybiotyku"
        ],
        options: [
          "Pierwsze 6 godzin od początku dolegliwości",
          "Okres od 12 do 24 godzin od wystąpienia bólu",
          "Pierwsze 48 godzin przy stosowaniu zimnych okładów",
          "Dowolny czas do 72 godzin od ustąpienia wymiotów",
          "Pierwsze 5 dni pod warunkiem podania antybiotyku"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Szansa na zachowanie żywotności jądra wynosi >90% w ciągu pierwszych 6 godzin, po 12 godzinach spada poniżej 20%, a po 24 godzinach dochodzi do całkowitej martwicy.",
        expl: "Szansa na zachowanie żywotności jądra wynosi >90% w ciągu pierwszych 6 godzin, po 12 godzinach spada poniżej 20%, a po 24 godzinach dochodzi do całkowitej martwicy.",
        explanation: "Szansa na zachowanie żywotności jądra wynosi >90% w ciągu pierwszych 6 godzin, po 12 godzinach spada poniżej 20%, a po 24 godzinach dochodzi do całkowitej martwicy."
      },
      {
        id: 2,
        q: "Kluczowym objawem w badaniu fizykalnym o czułości bliskiej 100% przemawiającym przeciwko skrętowi jądra jest:",
        question: "Kluczowym objawem w badaniu fizykalnym o czułości bliskiej 100% przemawiającym przeciwko skrętowi jądra jest:",
        opts: [
          "Obecność prawidłowego, żywego odruchu z mięśnia dźwigacza jądra (odruchu nosidłowego)",
          "Występowanie podwyższonej temperatury ciała powyżej 38,5°C z dreszczami",
          "Stwierdzenie bolesności palpacyjnej w rzucie lewego dołu biodrowego",
          "Obecność pojedynczego epizodu wymiotów treścią żołądkową w wywiadzie",
          "Wystąpienie wybroczyn krwotocznych na skórze wewnętrznej powierzchni ud"
        ],
        options: [
          "Obecność prawidłowego, żywego odruchu z mięśnia dźwigacza jądra (odruchu nosidłowego)",
          "Występowanie podwyższonej temperatury ciała powyżej 38,5°C z dreszczami",
          "Stwierdzenie bolesności palpacyjnej w rzucie lewego dołu biodrowego",
          "Obecność pojedynczego epizodu wymiotów treścią żołądkową w wywiadzie",
          "Wystąpienie wybroczyn krwotocznych na skórze wewnętrznej powierzchni ud"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Zachowany, żywy odruch nosidłowy (cremasteric reflex) występuje niezwykle rzadko w skręcie jądra (jego obecność niemal wyklucza skręt, czułość braku odruchu >99%).",
        expl: "Zachowany, żywy odruch nosidłowy (cremasteric reflex) występuje niezwykle rzadko w skręcie jądra (jego obecność niemal wyklucza skręt, czułość braku odruchu >99%).",
        explanation: "Zachowany, żywy odruch nosidłowy (cremasteric reflex) występuje niezwykle rzadko w skręcie jądra (jego obecność niemal wyklucza skręt, czułość braku odruchu >99%)."
      },
      {
        id: 3,
        q: "Ujemny objaw Prehna oznacza, że po uniesieniu jądra ku górze:",
        question: "Ujemny objaw Prehna oznacza, że po uniesieniu jądra ku górze:",
        opts: [
          "Ból nie ulega zmniejszeniu lub ulega nasileniu (co jest charakterystyczne dla skrętu jądra)",
          "Ból natychmiast całkowicie ustępuje (co jednoznacznie potwierdza rozpoznanie skrętu)",
          "Dochodzi do natychmiastowego obkurczenia przeciwległego jądra i moszny",
          "Pojawia się patologiczny odruch zgięciowy w stawie biodrowym i kolanowym",
          "Następuje samoistne oddanie moczu o zabarwieniu ciemnokrwistym"
        ],
        options: [
          "Ból nie ulega zmniejszeniu lub ulega nasileniu (co jest charakterystyczne dla skrętu jądra)",
          "Ból natychmiast całkowicie ustępuje (co jednoznacznie potwierdza rozpoznanie skrętu)",
          "Dochodzi do natychmiastowego obkurczenia przeciwległego jądra i moszny",
          "Pojawia się patologiczny odruch zgięciowy w stawie biodrowym i kolanowym",
          "Następuje samoistne oddanie moczu o zabarwieniu ciemnokrwistym"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Dodatni objaw Prehna (ulga w bólu przy uniesieniu jądra) typowo cechuje zapalenie najądrza. Ujemny objaw Prehna (brak ulgi lub nasilenie bólu) cechuje skręt jądra.",
        expl: "Dodatni objaw Prehna (ulga w bólu przy uniesieniu jądra) typowo cechuje zapalenie najądrza. Ujemny objaw Prehna (brak ulgi lub nasilenie bólu) cechuje skręt jądra.",
        explanation: "Dodatni objaw Prehna (ulga w bólu przy uniesieniu jądra) typowo cechuje zapalenie najądrza. Ujemny objaw Prehna (brak ulgi lub nasilenie bólu) cechuje skręt jądra."
      },
      {
        id: 4,
        q: "Wada anatomiczna predysponująca do skrętu jądra (tzw. zniekształcenie serca dzwonu - bell-clapper anomaly) polega na:",
        question: "Wada anatomiczna predysponująca do skrętu jądra (tzw. zniekształcenie serca dzwonu - bell-clapper anomaly) polega na:",
        opts: [
          "Zbyt wysokim przyczepie osłonki pochwowej obejmującej jądro, najądrze i powrózek nasienny",
          "Całkowitym braku wykształcenia tętnicy jądrowej w okresie rozwoju płodowego",
          "Przetrwałym uchyłku otrzewnej łączącym jamę brzuszną z moszną bez zarośnięcia",
          "Nieprawidłowym odejściu lewej żyły jądrowej pod kątem prostym do żyły nerkowej",
          "Przeroście mięśnia dźwigacza jądra z jego trwałym spastycznym przykurczem"
        ],
        options: [
          "Zbyt wysokim przyczepie osłonki pochwowej obejmującej jądro, najądrze i powrózek nasienny",
          "Całkowitym braku wykształcenia tętnicy jądrowej w okresie rozwoju płodowego",
          "Przetrwałym uchyłku otrzewnej łączącym jamę brzuszną z moszną bez zarośnięcia",
          "Nieprawidłowym odejściu lewej żyły jądrowej pod kątem prostym do żyły nerkowej",
          "Przeroście mięśnia dźwigacza jądra z jego trwałym spastycznym przykurczem"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Anomalia bell-clapper polega na nieprawidłowo wysokim odejściu blaszki ściennej osłonki pochwowej, przez co jądro i najądrze wiszą swobodnie i mogą rotować w osi długiej powrózka.",
        expl: "Anomalia bell-clapper polega na nieprawidłowo wysokim odejściu blaszki ściennej osłonki pochwowej, przez co jądro i najądrze wiszą swobodnie i mogą rotować w osi długiej powrózka.",
        explanation: "Anomalia bell-clapper polega na nieprawidłowo wysokim odejściu blaszki ściennej osłonki pochwowej, przez co jądro i najądrze wiszą swobodnie i mogą rotować w osi długiej powrózka."
      },
      {
        id: 5,
        q: "Dlaczego podczas operacji rewizji moszny z powodu jednostronnego skrętu jądra obligatoryjnie wykonuje się orchidopeksję OBUSTRONNĄ?",
        question: "Dlaczego podczas operacji rewizji moszny z powodu jednostronnego skrętu jądra obligatoryjnie wykonuje się orchidopeksję OBUSTRONNĄ?",
        opts: [
          "Ponieważ anomalia anatomiczna predysponująca do skrętu występuje obustronnie u większości pacjentów",
          "Aby zapobiec rozwojowi raka zarodkowego w przeciwległym jądrze w wieku dorosłym",
          "W celu wyrównania poziomu testosteronu wydzielanego przez komórki śródmiąższowe Leydiga",
          "Z powodu bezwzględnego wymogu prawnego narzuconego przez NFZ w procedurach zabiegowych",
          "Aby umożliwić jednoczesne obustronne pobranie bioptatów do badania genetycznego"
        ],
        options: [
          "Ponieważ anomalia anatomiczna predysponująca do skrętu występuje obustronnie u większości pacjentów",
          "Aby zapobiec rozwojowi raka zarodkowego w przeciwległym jądrze w wieku dorosłym",
          "W celu wyrównania poziomu testosteronu wydzielanego przez komórki śródmiąższowe Leydiga",
          "Z powodu bezwzględnego wymogu prawnego narzuconego przez NFZ w procedurach zabiegowych",
          "Aby umożliwić jednoczesne obustronne pobranie bioptatów do badania genetycznego"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Wada bell-clapper ma charakter obustronny u ponad 50–80% chorych. Zaniechanie fiksacji drugiego jądra niesie ogromne ryzyko jego skrętu i utraty w przyszłości (anarchizm).",
        expl: "Wada bell-clapper ma charakter obustronny u ponad 50–80% chorych. Zaniechanie fiksacji drugiego jądra niesie ogromne ryzyko jego skrętu i utraty w przyszłości (anarchizm).",
        explanation: "Wada bell-clapper ma charakter obustronny u ponad 50–80% chorych. Zaniechanie fiksacji drugiego jądra niesie ogromne ryzyko jego skrętu i utraty w przyszłości (anarchizm)."
      },
      {
        id: 6,
        q: "Oceń prawdziwość zdań dotyczących ostrego skrętu powrózka nasiennego:\nI. Złote okno czasowe do rewizji wynosi do 6 godzin od wystąpienia bólu.\nII. Badanie USG Doppler wykazujące obecność przepływu w 100% wyklucza skręt częściowy.\nIII. Ręczna derotacja (open book) polega na rotacji jądra od przyśrodka ku bokowi.\nIV. Skręt jądra najczęściej występuje u noworodków oraz u chłopców w okresie dojrzewania.",
        question: "Oceń prawdziwość zdań dotyczących ostrego skrętu powrózka nasiennego:\nI. Złote okno czasowe do rewizji wynosi do 6 godzin od wystąpienia bólu.\nII. Badanie USG Doppler wykazujące obecność przepływu w 100% wyklucza skręt częściowy.\nIII. Ręczna derotacja (open book) polega na rotacji jądra od przyśrodka ku bokowi.\nIV. Skręt jądra najczęściej występuje u noworodków oraz u chłopców w okresie dojrzewania.",
        opts: [
          "Prawdziwe są zdania: I, III, IV",
          "Prawdziwe są zdania: I, II, III",
          "Prawdziwe są zdania: II, III, IV",
          "Prawdziwe są wszystkie zdania (I, II, III, IV)",
          "Prawdziwe są tylko zdania: I oraz II"
        ],
        options: [
          "Prawdziwe są zdania: I, III, IV",
          "Prawdziwe są zdania: I, II, III",
          "Prawdziwe są zdania: II, III, IV",
          "Prawdziwe są wszystkie zdania (I, II, III, IV)",
          "Prawdziwe są tylko zdania: I oraz II"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Zdania I, III i IV są prawdziwe. Zdanie II jest fałszywe – we wczesnym lub niepełnym skręcie (skręt <360°) badanie Doppler może wykazać zachowany przepływ (wynik fałszywie ujemny).",
        expl: "Zdania I, III i IV są prawdziwe. Zdanie II jest fałszywe – we wczesnym lub niepełnym skręcie (skręt <360°) badanie Doppler może wykazać zachowany przepływ (wynik fałszywie ujemny).",
        explanation: "Zdania I, III i IV są prawdziwe. Zdanie II jest fałszywe – we wczesnym lub niepełnym skręcie (skręt <360°) badanie Doppler może wykazać zachowany przepływ (wynik fałszywie ujemny)."
      },
      {
        id: 7,
        q: "Obecność małego, twardego, bolesnego guzka w górnym biegunie jądra, przeświecającego przez skórę moszny jako niebieskawy punkt (tzw. objaw niebieskiej plamki - blue dot sign), wskazuje na:",
        question: "Obecność małego, twardego, bolesnego guzka w górnym biegunie jądra, przeświecającego przez skórę moszny jako niebieskawy punkt (tzw. objaw niebieskiej plamki - blue dot sign), wskazuje na:",
        opts: [
          "Skręt przyczepka jądra (appendix testis / przyczepek Morgagniego)",
          "Ostry całkowity skręt całego powrózka nasiennego i jądra",
          "Wodniak komunikujący jamy otrzewnej z osłonką pochwową",
          "Pęknięcie tętniaka tętnicy nasieniowodu w mosznie",
          "Masywne ropne zapalenie obu jąder w przebiegu świnki"
        ],
        options: [
          "Skręt przyczepka jądra (appendix testis / przyczepek Morgagniego)",
          "Ostry całkowity skręt całego powrózka nasiennego i jądra",
          "Wodniak komunikujący jamy otrzewnej z osłonką pochwową",
          "Pęknięcie tętniaka tętnicy nasieniowodu w mosznie",
          "Masywne ropne zapalenie obu jąder w przebiegu świnki"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Blue dot sign to zawał krwotoczny skręconego przyczepka Morgagniego (appendix testis – pozostałość przewodu Müllera), widoczny przez cienką skórę moszny jako bolesny sinoniebieski guzek.",
        expl: "Blue dot sign to zawał krwotoczny skręconego przyczepka Morgagniego (appendix testis – pozostałość przewodu Müllera), widoczny przez cienką skórę moszny jako bolesny sinoniebieski guzek.",
        explanation: "Blue dot sign to zawał krwotoczny skręconego przyczepka Morgagniego (appendix testis – pozostałość przewodu Müllera), widoczny przez cienką skórę moszny jako bolesny sinoniebieski guzek."
      },
      {
        id: 8,
        q: "Najczęstszym patogenem odpowiedzialnym za ostre zapalenie najądrza i jądra u aktywnych seksualnie młodych mężczyzn poniżej 35. roku życia jest:",
        question: "Najczęstszym patogenem odpowiedzialnym za ostre zapalenie najądrza i jądra u aktywnych seksualnie młodych mężczyzn poniżej 35. roku życia jest:",
        opts: [
          "Chlamydia trachomatis oraz Neisseria gonorrhoeae",
          "Escherichia coli oraz Pseudomonas aeruginosa",
          "Mycobacterium tuberculosis w postaci prątkowej",
          "Staphylococcus aureus oporny na metycylinę",
          "Treponema pallidum wywołująca kiłę wczesną"
        ],
        options: [
          "Chlamydia trachomatis oraz Neisseria gonorrhoeae",
          "Escherichia coli oraz Pseudomonas aeruginosa",
          "Mycobacterium tuberculosis w postaci prątkowej",
          "Staphylococcus aureus oporny na metycylinę",
          "Treponema pallidum wywołująca kiłę wczesną"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "U mężczyzn <35 r.ż. zapalenie najądrza jest najczęściej chorobą przenoszoną drogą płciową (Chlamydia trachomatis i dwoinka rzeżączki). U mężczyzn starszych dominują pałeczki jelitowe (E. coli).",
        expl: "U mężczyzn <35 r.ż. zapalenie najądrza jest najczęściej chorobą przenoszoną drogą płciową (Chlamydia trachomatis i dwoinka rzeżączki). U mężczyzn starszych dominują pałeczki jelitowe (E. coli).",
        explanation: "U mężczyzn <35 r.ż. zapalenie najądrza jest najczęściej chorobą przenoszoną drogą płciową (Chlamydia trachomatis i dwoinka rzeżączki). U mężczyzn starszych dominują pałeczki jelitowe (E. coli)."
      },
      {
        id: 9,
        q: "W sytuacji, gdy śródoperacyjnie po odkręceniu powrózka nasiennego jądro pozostaje czarne, nie krwawi po nacięciu osłonki i nie odzyskuje ukrwienia po 20 minutach ogrzewania:",
        question: "W sytuacji, gdy śródoperacyjnie po odkręceniu powrózka nasiennego jądro pozostaje czarne, nie krwawi po nacięciu osłonki i nie odzyskuje ukrwienia po 20 minutach ogrzewania:",
        opts: [
          "Należy wykonać orchiektomię martwiczego jądra oraz orchidopeksję jądra przeciwległego",
          "Należy pozostawić martwicze jądro w mosznie w nadziei na regenerację komórek Sertolego",
          "Należy przeszczepić jądro w powłoki ściany brzucha w celu wytworzenia krążenia obocznego",
          "Należy natychmiast zamknąć mosznę bez jakiejkolwiek interwencji po stronie przeciwległej",
          "Należy podać dożylnie 100 mg alteplazy bezpośrednio do lewej tętnicy nasieniowodu"
        ],
        options: [
          "Należy wykonać orchiektomię martwiczego jądra oraz orchidopeksję jądra przeciwległego",
          "Należy pozostawić martwicze jądro w mosznie w nadziei na regenerację komórek Sertolego",
          "Należy przeszczepić jądro w powłoki ściany brzucha w celu wytworzenia krążenia obocznego",
          "Należy natychmiast zamknąć mosznę bez jakiejkolwiek interwencji po stronie przeciwległej",
          "Należy podać dożylnie 100 mg alteplazy bezpośrednio do lewej tętnicy nasieniowodu"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Nieodwracalnie martwicze jądro należy usunąć (orchiektomia), gdyż pozostawienie zawału krwotocznego prowadzi do powstawania ropnia, sepsy oraz indukcji przeciwciał przeciwplemnikowych niszczących drugie jądro.",
        expl: "Nieodwracalnie martwicze jądro należy usunąć (orchiektomia), gdyż pozostawienie zawału krwotocznego prowadzi do powstawania ropnia, sepsy oraz indukcji przeciwciał przeciwplemnikowych niszczących drugie jądro.",
        explanation: "Nieodwracalnie martwicze jądro należy usunąć (orchiektomia), gdyż pozostawienie zawału krwotocznego prowadzi do powstawania ropnia, sepsy oraz indukcji przeciwciał przeciwplemnikowych niszczących drugie jądro."
      },
      {
        id: 10,
        q: "Zgodnie z przepisami prawa medycznego, jeśli 16-letni pacjent ze skrętem jądra wymaga pilnego zabiegu operacyjnego na bloku, a rodzice są obecni w szpitalu:",
        question: "Zgodnie z przepisami prawa medycznego, jeśli 16-letni pacjent ze skrętem jądra wymaga pilnego zabiegu operacyjnego na bloku, a rodzice są obecni w szpitalu:",
        opts: [
          "Wymagana jest tzw. zgoda podwójna (kumulatywna) – pisemna zgoda przedstawiciela ustawowego oraz samego małoletniego, który ukończył 16 lat",
          "Wystarczająca jest wyłącznie samodzielna pisemna zgoda małoletniego pacjenta z całkowitym pominięciem rodziców",
          "Wystarczająca jest wyłącznie zgoda rodziców, a sprzeciw 16-letniego pacjenta nie ma żadnej mocy prawnej",
          "Zabieg może być wykonany wyłącznie po uprzednim uzyskaniu formalnej zgody sądu rodzinnego i opiekuńczego",
          "Lekarz nie musi odbierać jakiejkolwiek pisemnej zgody powołując się na stan zagrożenia zdrowia"
        ],
        options: [
          "Wymagana jest tzw. zgoda podwójna (kumulatywna) – pisemna zgoda przedstawiciela ustawowego oraz samego małoletniego, który ukończył 16 lat",
          "Wystarczająca jest wyłącznie samodzielna pisemna zgoda małoletniego pacjenta z całkowitym pominięciem rodziców",
          "Wystarczająca jest wyłącznie zgoda rodziców, a sprzeciw 16-letniego pacjenta nie ma żadnej mocy prawnej",
          "Zabieg może być wykonany wyłącznie po uprzednim uzyskaniu formalnej zgody sądu rodzinnego i opiekuńczego",
          "Lekarz nie musi odbierać jakiejkolwiek pisemnej zgody powołując się na stan zagrożenia zdrowia"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Pacjent, który ukończył 16 lat, ma prawo do współdecydowania – do wykonania zabiegu operacyjnego konieczna jest zgoda kumulatywna: przedstawiciela ustawowego oraz małoletniego pacjenta.",
        expl: "Pacjent, który ukończył 16 lat, ma prawo do współdecydowania – do wykonania zabiegu operacyjnego konieczna jest zgoda kumulatywna: przedstawiciela ustawowego oraz małoletniego pacjenta.",
        explanation: "Pacjent, który ukończył 16 lat, ma prawo do współdecydowania – do wykonania zabiegu operacyjnego konieczna jest zgoda kumulatywna: przedstawiciela ustawowego oraz małoletniego pacjenta."
      },
      {
        id: 11,
        q: "W badaniu USG Doppler moszny u pacjenta ze skrętem powrózka nasiennego patognomonicznym objawem skręconych naczyń powrózka jest tzw.:",
        question: "W badaniu USG Doppler moszny u pacjenta ze skrętem powrózka nasiennego patognomonicznym objawem skręconych naczyń powrózka jest tzw.:",
        opts: [
          "Objaw wiru / ślimaka (whirlpool sign) w badaniu w skali szarości i kolorowego Dopplera",
          "Objaw tarczy strzelniczej (target sign) w rzucie najądrza i splotu wiciowatego",
          "Objaw podwójnego konturu torebki jądra z obecnością płynu bezechowego",
          "Objaw gwiazdy polarnej (starry sky) w miąższu obu jąder jednocześnie",
          "Objaw ząbkowanego grzebienia (comb sign) w naczyniach mosznowych"
        ],
        options: [
          "Objaw wiru / ślimaka (whirlpool sign) w badaniu w skali szarości i kolorowego Dopplera",
          "Objaw tarczy strzelniczej (target sign) w rzucie najądrza i splotu wiciowatego",
          "Objaw podwójnego konturu torebki jądra z obecnością płynu bezechowego",
          "Objaw gwiazdy polarnej (starry sky) w miąższu obu jąder jednocześnie",
          "Objaw ząbkowanego grzebienia (comb sign) w naczyniach mosznowych"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Objaw wiru (whirlpool sign) w USG oznacza spiralne skręcenie powrózka nasiennego i jego naczyń – jest najbardziej swoistym objawem skrętu powrózka nasiennego.",
        expl: "Objaw wiru (whirlpool sign) w USG oznacza spiralne skręcenie powrózka nasiennego i jego naczyń – jest najbardziej swoistym objawem skrętu powrózka nasiennego.",
        explanation: "Objaw wiru (whirlpool sign) w USG oznacza spiralne skręcenie powrózka nasiennego i jego naczyń – jest najbardziej swoistym objawem skrętu powrózka nasiennego."
      }
    ],
    flashcards: [
      {
        q: "Ile wynosi 'złote okno czasowe' w skręcie jądra i jak zmienia się rokowanie?",
        a: "Do 6 godzin (>90% szans na uratowanie jądra); po 12h szansa spada <20%, a po 24h następuje martwica."
      },
      {
        q: "Jaki jest status odruchu nosidłowego (cremasteric reflex) w skręcie jądra?",
        a: "Jest całkowicie zniesiony po stronie chorej (obecność żywego odruchu niemal wyklucza skręt)."
      },
      {
        q: "Co oznacza ujemny objaw Prehna?",
        a: "Brak ulgi lub nasilenie bólu przy unoszeniu jądra (charakterystyczny dla skrętu jądra)."
      },
      {
        q: "Na czym polega wada anatomiczna 'serca dzwonu' (bell-clapper)?",
        a: "Na wysokim odejściu osłonki pochwowej obejmującej jądro i powrózek, co umożliwia rotację jądra w osi."
      },
      {
        q: "W jakim kierunku wykonuje się ręczną derotację jądra ('open book')?",
        a: "Od wewnątrz na zewnątrz (dla lewego jądra zgodnie z ruchem wskazówek zegara)."
      },
      {
        q: "Dlaczego operacja skrętu jądra musi obejmować obustronną orchidopeksję?",
        a: "Ponieważ wada predysponująca (bell-clapper) występuje obustronnie u ponad 50–80% chorych."
      }
    ]
  },
  // =========================================================================
  // CASE 170: Priapizm Niedokrwienny (Low-Flow Priapism)
  // =========================================================================
  {
    id: 170,
    file: "170_priapizm_niedokrwienny.json",
    shortTitle: "Priapizm Niedokrwienny",
    title: "Urologiczny Stan Nagły: Priapizm Niedokrwienny (Low-Flow)",
    dept: "Urologia / SOR",
    diagnosisTitle: "Ostre Niedokrwienie Ciał Jamistych Prącia w Przebiegu Priapizmu Niedokrwiennego (Low-Flow Ischemic Priapism)",
    vitals: [
      { label: "Ciśnienie tętnicze (RR)", val: "148/92", unit: "mmHg", status: "vital-warn" },
      { label: "Częstość akcji serca (HR)", val: "94", unit: "/min", status: "vital-ok" },
      { label: "Częstość oddechów (RR)", val: "16", unit: "/min", status: "vital-ok" },
      { label: "Saturacja (SpO2)", val: "99", unit: "%", status: "vital-ok" },
      { label: "Temperatura ciała", val: "36.8", unit: "°C", status: "vital-ok" }
    ],
    story: "<p><strong>Pacjent:</strong> 32-letni mężczyzna zgłasza się na SOR z powodu bolesnego, przetrwałego wzwodu prącia trwającego nieprzerwanie od 6 godzin.</p><p><strong>Wywiad chorobowy:</strong> Wzwód wystąpił samoistnie w środku nocy (około 2:00) bez jakiejkolwiek stymulacji seksualnej. Pacjent od 2 miesięcy leczy się z powodu epizodu depresyjnego i bezsenności, przyjmując przed snem trazodon w dawce 100 mg na dobę. Początkowo oczekiwał samoistnego ustąpienia erekcji, jednak po kilku godzinach pojawił się silny, tępy i rozpierający ból całego trzonu prącia (8/10 w skali NRS). Zastosowane w domu zimne okłady, intensywny wysiłek fizyczny (przysiady) oraz oddanie moczu nie przyniosły żadnego rezultatu. Pacjent zaprzecza urazom krocza lub miednicy, nie choruje na niedokrwistość sierpowatokrwinkową, nie przyjmował leków z grupy inhibitorów PDE-5 (sildenafil) ani iniekcji naczyniorozszerzających do ciał jamistych.</p><p><strong>Badanie przedmiotowe:</strong> Pacjent skrępowany, w wyraźnym dyskomforcie bólowym, porusza się ostrożnie, trzymając ubranie z dala od krocza. W badaniu narządów płciowych: trzon prącia (oba ciała jamiste) jest w pełnym, skrajnie twardym wzwodzie ('twardy jak drewno') i wybitnie bolesny przy jakimkolwiek dotyku. Co charakterystyczne, żołądź prącia (glans penis) oraz ciało gąbczaste cewki moczowej pozostają całkowicie wiotkie, miękkie i niebolesne (klasyczna dysocjacja wzwodu ciał jamistych i żołędzi). Moszna i jądra bez odchyleń. W punkcji diagnostycznej lewego ciała jamistego igłą 19G zaaspirowano gęstą, niemal czarną krew włośniczkowo-żylną. Badanie gazometryczne krwi z ciał jamistych wykazało: pH 7,08, pO2 24 mmHg, pCO2 82 mmHg, sO2 36% (cechy głębokiego niedokrwienia tkankowego i kwasicy).</p>",
    steps: [
      {
        title: "Krok 1: Wstępna dekompresja – aspiracja i płukanie ciał jamistych",
        scenario: "Gazometria krwi z ciał jamistych potwierdza ciężki priapizm niedokrwienny (pH 7,08, pO2 24 mmHg). Ból trwa ponad 6 godzin, co grozi postępującą martwicą miocytów beleczek. Jakie jest natychmiastowe postępowanie inwazyjne I rzutu na SOR?",
        options: [
          {
            text: "Znieczulenie miejscowe nasady prącia, nakłucie ciał jamistych igłą motylkową na godzinie 2 lub 10, aspiracja zastoinowej krwi do uzyskania krwi jasnoczerwonej oraz przepłukanie solą fizjologiczną",
            correct: true,
            isCorrect: true,
            feedback: "✅ PRAWIDŁOWO! Pierwszym krokiem ratunkowym w priapizmie niedokrwiennym jest aspiracja odtlenowanej krwi żylnej z ciał jamistych (z boku trzonu, na godz. 10 lub 2, omijając pęczek grzbietowy i cewkę) oraz płukanie jałowym 0,9% NaCl. Pozwala to obniżyć ciśnienie wewnątrznaczyniowe i przywrócić perfuzję włośniczkową."
          },
          {
            text: "Założenie bardzo ciasnej opaski uciskowej z mankietu ciśnieniomierza na samą nasadę prącia i utrzymywanie ciśnienia 220 mmHg przez co najmniej 4 godziny bez dekompresji",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Opaska uciskowa całkowicie odcina resztkowy dopływ krwi tętniczej, przyspieszając zgorzel i martwicę całego narządu!"
          },
          {
            text: "Podanie dożylne 100 mg sildenafilu w szybkim wlewie kroplowym w celu wymuszenia odruchowego rozszerzenia naczyń żylnych odprowadzających krew z zablokowanych ciał jamistych",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Sildenafil nasila wzwód poprzez blokadę rozpadu cGMP i jest bezwzględnie zakazany w priapizmie!"
          },
          {
            text: "Wykonanie natychmiastowej amputacji prącia z powodu przekroczenia bezpiecznego czasu 4 godzin od początku trwania wzwodu bez jakichkolwiek prób odbarczenia nakłuciem",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Amputacja to okaleczenie; leczenie zawsze rozpoczyna się od aspiracji i leków naczyniozwężających."
          }
        ]
      },
      {
        title: "Krok 2: Farmakoterapia dojamista – wybór leku z wyboru",
        scenario: "Po aspiracji 40 ml ciemnej krwi i wypłukaniu solą fizjologiczną wzwód częściowo zmiękł, ale po chwili ciała jamiste ponownie stwardniały. Jaki lek podawany we wstrzyknięciach dojamistych stanowi leczenie farmakologiczne I rzutu według wytycznych EAU/AUA?",
        options: [
          {
            text: "Dojamiste podanie roztworu fenylefryny (czysty agonista alfa-1) w dawkach 100–200 mcg co 3–5 minut pod ścisłą kontrolą ciśnienia tętniczego i monitora EKG",
            correct: true,
            isCorrect: true,
            feedback: "✅ PRAWIDŁOWO! Fenylefryna to selektywny agonista receptorów alfa-1-adrenergicznych bez wpływu na beta-receptory. Powoduje silny skurcz mięśniówki gładkiej beleczek ciał jamistych, wyciskając krew i otwierając odpływ żylny. Wymaga monitorowania EKG i RR ze względu na ryzyko odruchowej bradykardii i przełomu nadciśnieniowego."
          },
          {
            text: "Dojamiste podanie 50 mg papaweryny w połączeniu z 20 mcg alprostadylu bezpośrednio do prawego ciała jamistego",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Papaweryna i alprostadyl to leki rozkurczające naczynia stosowane w wywoływaniu erekcji; podanie ich w priapizmie pogłębia katastrofalne niedokrwienie!"
          },
          {
            text: "Podanie dożylne 10 000 jednostek heparyny niefrakcjonowanej w celu rozpuszczenia rzekomego zatoru tętnicy sromowej wewnętrznej",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Heparyna nie odwraca skurczu beleczkowego, a zwiększa ryzyko masywnego krwotoku po nakłuciach ciał jamistych."
          },
          {
            text: "Zastosowanie wyłącznie doustnego paracetamolu z kodeiną bez jakichkolwiek iniekcji do prącia i obserwacja przez kolejne 12 godzin",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Pozostawienie pacjenta bez leczenia miejscowego po 12–24 godzinach doprowadzi do nieodwracalnego zwłóknienia i trwałej impotencji."
          }
        ]
      },
      {
        title: "Krok 3: Kwalifikacja do leczenia operacyjnego (przetoki omijające / shunty)",
        scenario: "Mimo wielokrotnych aspiracji, płukania i podania łącznie 1000 mcg fenylefryny w ciągu godziny, prącie pozostaje twarde i bolesne, a czas trwania wzwodu zbliża się do 10 godzin. Jakie jest ostateczne postępowanie ratujące funkcję narządu?",
        options: [
          {
            text: "Pilne skierowanie pacjenta na blok operacyjny w celu chirurgicznego wytworzenia dystalnej przetoki jamisto-gąbczastej (shunt np. Wintera, Ebbehoja lub Al-Ghoraba)",
            correct: true,
            isCorrect: true,
            feedback: "✅ PRAWIDŁOWO! W przypadku braku odpowiedzi na aspirację i fenylefrynę konieczne jest chirurgiczne wykonanie przetoki (shuntu) odprowadzającej krew z niedokrwionych ciał jamistych do ciała gąbczastego lub żołędzi (shunty dystalne: Wintera przez żołądź igłą Tru-Cut, Ebbehoja skalpelem lub Al-Ghoraba z wycięciem okienka osłonki). Zapobiega to całkowitemu zwłóknieniu prącia."
          },
          {
            text: "Podanie kolejnych agresywnych dawek fenylefryny w ilości 5000 mcg co 2 minuty bezpośrednio do ciał jamistych bez względu na monitorowane parametry krążenia",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Przekroczenie maksymalnych dawek fenylefryny grozi zawałem serca, udarem krwotocznym mózgu i zgonem!"
          },
          {
            text: "Zalecenie natychmiastowego podjęcia intensywnego współżycia seksualnego na sali chorych w celu wywołania fizjologicznego wytrysku i odruchowego zwiotczenia prącia",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! W priapizmie niedokrwiennym ejakulacja nie jest możliwa, a współżycie w stanie twardego wzwodu z niedokrwieniem grozi pęknięciem ciał jamistych."
          },
          {
            text: "Założenie sztywnego gipsowego opatrunku unieruchamiającego na całą miednicę i podbrzusze pacjenta na okres 14 dni roboczych bez interwencji chirurgicznej",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Unieruchomienie gipsowe nie ma żadnego uzasadnienia medycznego i doprowadziłoby do martwicy prącia."
          }
        ]
      }
    ],
    pathoNodes: [
      {
        id: "patho_1",
        title: "Zablokowanie odpływu żylnego i zespół ciasnoty ciał jamistych",
        desc: "W priapizmie niedokrwiennym (low-flow) dochodzi do przetrwałego rozkurczu miocytów beleczek jamistych (często wywołanego lekami blokującymi receptory alfa, np. trazodon, neuroleptyki). Rozdęte zatoki jamiste dociskają żyłki podosłonkowe do sztywnej osłonki białawej (tunica albuginea), całkowicie blokując odpływ żylny i tworząc zespół ciasnoty (compartment syndrome).",
        target: "Aspiracja odbarczająca krwi z ciał jamistych i płukanie 0,9% NaCl"
      },
      {
        id: "patho_2",
        title: "Postępująca kwasica, hipoksja i apoptoza komórek mięśniowych",
        desc: "Zatrzymanie mikrokrążenia prowadzi do szybkiego zużycia tlenu (pO2 spada <30 mmHg), retencji dwutlenku węgla (pCO2 wzrasta >60–80 mmHg) i kwasicy mleczanowej (pH spada <7,10). Brak energii w postaci ATP upośledza pompę sodowo-potasową. Po 12h pojawia się obrzęk śródbłonka, a po 24h obumieranie komórek mięśniówki gładkiej ciał jamistych.",
        target: "Miejscowe podanie czystego agonisty alfa-1 (fenylefryna) obkurczającego beleczki"
      },
      {
        id: "patho_3",
        title: "Włóknienie ciał jamistych i utrwalona dysfunkcja erekcyjna",
        desc: "Przetrwanie niedokrwienia powyżej 24–48 godzin skutkuje nieodwracalną martwicą miocytów i ich zastępowaniem przez gęstą tkankę łączną kolagenową (fibroblastyczna metaplazja). Prowadzi to do nieodwracalnego zwłóknienia ciał jamistych, utraty podatności naczyniowej, zniekształcenia prącia i trwałej, całkowitej impotencji.",
        target: "Wytworzenie przetoki jamisto-gąbczastej (shunt dystalny Al-Ghorab lub proksymalny Quackels)"
      }
    ],
    dutySummary: {
      diagnostics: "1. Badanie fizykalne: ocena stopnia twardości trzonu prącia (kamieniste ciała jamiste) oraz stanu żołędzi i ciała gąbczastego (wiotkie i miękkie w priapizmie ischemicznym).\n\n2. Gazometria krwi zaaspirowanej z ciał jamistych: potwierdzenie priapizmu niedokrwiennego (krew ciemna; pH <7,25, pO2 <30 mmHg, pCO2 >60 mmHg) vs nie-niedokrwiennego (krew jasnoczerwona; pH >7,40, pO2 >90 mmHg, pCO2 <40 mmHg).\n\n3. Badanie USG Color Doppler naczyń prącia: brak przepływu w tętnicach jamistych i zatoce jamistej (charakterystyczny dla typu ischemicznego).\n\n4. Badania laboratoryjne: morfologia krwi (wykluczenie białaczki, trombocytozy), badanie w kierunku hemoglobinopatii (sierpowatokrwinkowość), toksykologia moczu (kokaina, amfetamina).",
      drugsAndDoses: "• Blokada prącia (znieczulenie miejscowe): <span class=\"dose-pill\">10–15 ml 1% lidokainy bez adrenaliny</span> podane podskórnie u nasady prącia.\n• Fenylefryna (agonista alfa-1 z wyboru): <span class=\"dose-pill\">100–200 mcg wstrzykiwane do ciał jamistych co 3–5 minut</span> (maks. 1000 mcg w ciągu 1 godziny) pod kontrolą ciśnienia i EKG.\n• Sposób przygotowania fenylefryny: <span class=\"dose-pill\">1 fiolkę 10 mg rozcieńczyć w 100 ml 0,9% NaCl (stężenie 100 mcg/ml)</span>.\n• Płukanie ciał jamistych: <span class=\"dose-pill\">chłodny sterylny 0,9% roztwór NaCl w porcjach po 10–20 ml</span> aż do odzyskania jasnego zabarwienia krwi.\n• Analgezja ogólna: <span class=\"dose-pill\">metamizol 1000 mg i.v.</span> lub ketoprofen <span class=\"dose-pill\">100 mg i.v.</span> w celu zniesienia silnego bólu.",
      pitfalls: [
        "Mylenie priapizmu niedokrwiennego (low-flow – bolesny, twardy trzon, wiotka żołądź, kwasica, stan nagły) z nie-niedokrwiennym (high-flow – pourazowy, bezbolesny, krew tętnicza, nie wymaga pilnej dekompresji).",
        "Opóźnianie leczenia inwazyjnego powyżej 12–24 godzin – nieodwracalne zwłóknienie ciał jamistych prowadzi do całkowitej, trwałej dysfunkcji erekcyjnej.",
        "Podawanie dojamiste leków rozszerzających naczynia (alprostadyl, papaweryna) lub podawanie doustnych inhibitorów PDE-5, co katastrofalnie pogłębia niedokrwienie.",
        "Stosowanie fenylefryny bez ciągłego monitorowania ciśnienia tętniczego i EKG – przedostanie się leku do krążenia ogólnego grozi przełomem nadciśnieniowym i bradykardią odruchową."
      ]
    },
    diffTable: {
      title: "⚔️ Tabela Różnicowa: Postacie Priapizmu i Inne Stany Nagłe Prącia",
      headers: ["Cecha kliniczna", "Priapizm niedokrwienny (low-flow)", "Priapizm nie-niedokrwienny (high-flow)", "Priapizm nawracający (stuttering)", "Złamanie prącia (fractura penis)"],
      rows: [
        ["Mechanizm patofizjologiczny", "Zablokowanie odpływu żylnego (compartment syndrome)", "Nieuregulowany przetokowy napływ tętniczy (fistuła)", "Nawracające epizody niedokrwienne (np. anemia sierpowata)", "Rozerwanie osłonki białawej (tunica albuginea) w erekcji"],
        ["Stopień bólu", "Wybitnie silny, narastający ból (8–10/10 NRS)", "Bezbolesny lub minimalny dyskomfort", "Bolesny w czasie epizodów, ustępuje samoistnie", "Nagły, ostry ból w trakcie stosunku z trzaskiem"],
        ["Twardość narządu", "Trzon skrajnie twardy, wiotka żołądź i cewka", "Wzwód sprężysty, częściowy, żołądź często napięta", "Twardy w trakcie ataku, wiotki pomiędzy atakami", "Natychmiastowe zwiotczenie, deformacja ('krwiak bakłażana')"],
        ["Gazometria aspiratu", "Krew ciemna: pH <7,25, pO2 <30, pCO2 >60", "Krew jasna tętnicza: pH >7,40, pO2 >90, pCO2 <40", "W trakcie napadu cechy kwasicy i hipoksji", "Nie wykonuje się punkcji diagnostycznej"],
        ["Pilność postępowania", "Stan bezpośredniego zagrożenia utratą narządu (<6–12h)", "Nie wymaga pilnego drenażu (często ustępuje samoistnie)", "Leczenie epizodu + profilaktyka hematologiczna", "Pilna operacja zszycia osłonki białawej na ostro"],
        ["Leczenie I rzutu", "Aspiracja krwi + fenylefryna dojamista + ewentualny shunt", "Obserwacja, kompresja, embolizacja gałęzi tętnicy", "Leczenie epizodu jak ischemicznego, agoniści GnRH / hydroksymocznik", "Eksploracja chirurgiczna i ewakuacja krwiaka"]
      ]
    },
    lekQuestions: [
      {
        id: 1,
        q: "Priapizm niedokrwienny (low-flow / ischemic priapism) charakteryzuje się w badaniu gazometrycznym krwi zaaspirowanej z ciał jamistych obecnością:",
        question: "Priapizm niedokrwienny (low-flow / ischemic priapism) charakteryzuje się w badaniu gazometrycznym krwi zaaspirowanej z ciał jamistych obecnością:",
        opts: [
          "Ciężkiej kwasicy (pH < 7,25), głębokiej hipoksji (pO2 < 30 mmHg) oraz hiperkapnii (pCO2 > 60 mmHg)",
          "Zasadowicy oddechowej (pH > 7,50) z prawidłowym ciśnieniem parcjalnym tlenu w ciałach jamistych",
          "Prawidłowego wysycenia tlenem (pO2 > 90 mmHg) przy obniżonym ciśnieniu parcjalnym dwutlenku węgla",
          "Całkowitego braku obecności krwinek czerwonych i płytek krwi w materiale pobranym z punkcji",
          "Wybitnie podwyższonego stężenia wodorowęglanów powyżej 45 mmol/l przy prawidłowym pH aspiratu"
        ],
        options: [
          "Ciężkiej kwasicy (pH < 7,25), głębokiej hipoksji (pO2 < 30 mmHg) oraz hiperkapnii (pCO2 > 60 mmHg)",
          "Zasadowicy oddechowej (pH > 7,50) z prawidłowym ciśnieniem parcjalnym tlenu w ciałach jamistych",
          "Prawidłowego wysycenia tlenem (pO2 > 90 mmHg) przy obniżonym ciśnieniu parcjalnym dwutlenku węgla",
          "Całkowitego braku obecności krwinek czerwonych i płytek krwi w materiale pobranym z punkcji",
          "Wybitnie podwyższonego stężenia wodorowęglanów powyżej 45 mmol/l przy prawidłowym pH aspiratu"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Krew w priapizmie niedokrwiennym ma charakter żylny, odtlenowany: pH <7,25 (często <7,0), pO2 <30 mmHg, pCO2 >60 mmHg. Odpowiada to zastojowi i hipoksji tkankowej.",
        expl: "Krew w priapizmie niedokrwiennym ma charakter żylny, odtlenowany: pH <7,25 (często <7,0), pO2 <30 mmHg, pCO2 >60 mmHg. Odpowiada to zastojowi i hipoksji tkankowej.",
        explanation: "Krew w priapizmie niedokrwiennym ma charakter żylny, odtlenowany: pH <7,25 (często <7,0), pO2 <30 mmHg, pCO2 >60 mmHg. Odpowiada to zastojowi i hipoksji tkankowej."
      },
      {
        id: 2,
        q: "Lekiem z wyboru stosowanym do iniekcji do ciał jamistych w farmakoterapii priapizmu niedokrwiennego według wytycznych urologicznych jest:",
        question: "Lekiem z wyboru stosowanym do iniekcji do ciał jamistych w farmakoterapii priapizmu niedokrwiennego według wytycznych urologicznych jest:",
        opts: [
          "Fenylefryna (selektywny agonista receptora alfa-1-adrenergicznego)",
          "Alprostadyl (syntetyczna prostaglandyna E1 podawana miejscowo)",
          "Papaweryna w połączeniu z fentolaminą i atropiną do ciał jamistych",
          "Sildenafil podawany w postaci wlewu bezpośrednio do żyły grzbietowej",
          "Nitroprusydek sodu w celu wywołania relaksacji tętnic głębokich prącia"
        ],
        options: [
          "Fenylefryna (selektywny agonista receptora alfa-1-adrenergicznego)",
          "Alprostadyl (syntetyczna prostaglandyna E1 podawana miejscowo)",
          "Papaweryna w połączeniu z fentolaminą i atropiną do ciał jamistych",
          "Sildenafil podawany w postaci wlewu bezpośrednio do żyły grzbietowej",
          "Nitroprusydek sodu w celu wywołania relaksacji tętnic głębokich prącia"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Fenylefryna to czysty alfa-1-mimetyk, który silnie obkurcza mięśniówkę gładką beleczek ciał jamistych, wyciskając krew i otwierając drenaż żylny, nie wywierając bezpośredniego wpływu inotropowego na serce.",
        expl: "Fenylefryna to czysty alfa-1-mimetyk, który silnie obkurcza mięśniówkę gładką beleczek ciał jamistych, wyciskając krew i otwierając drenaż żylny, nie wywierając bezpośredniego wpływu inotropowego na serce.",
        explanation: "Fenylefryna to czysty alfa-1-mimetyk, który silnie obkurcza mięśniówkę gładką beleczek ciał jamistych, wyciskając krew i otwierając drenaż żylny, nie wywierając bezpośredniego wpływu inotropowego na serce."
      },
      {
        id: 3,
        q: "Który z poniższych leków przeciwdepresyjnych jest klasyczną i powszechnie znaną przyczyną polekowego priapizmu niedokrwiennego wskutek blokady receptorów alfa-1?",
        question: "Który z poniższych leków przeciwdepresyjnych jest klasyczną i powszechnie znaną przyczyną polekowego priapizmu niedokrwiennego wskutek blokady receptorów alfa-1?",
        opts: [
          "Trazodon (antagonista receptorów serotoninowych 5-HT2 i inhibitor wychwytu serotoniny)",
          "Escytalopram (wybiórczy inhibitor wychwytu zwrotnego serotoniny z grupy leków SSRI)",
          "Wenlafaksyna (selektywny inhibitor wychwytu zwrotnego serotoniny oraz noradrenaliny)",
          "Moklobemid (odwracalny selektywny inhibitor enzymu monoaminooksydazy podtypu A)",
          "Bupropion (selektywny inhibitor neuronalnego wychwytu dopaminy oraz noradrenaliny)"
        ],
        options: [
          "Trazodon (antagonista receptorów serotoninowych 5-HT2 i inhibitor wychwytu serotoniny)",
          "Escytalopram (wybiórczy inhibitor wychwytu zwrotnego serotoniny z grupy leków SSRI)",
          "Wenlafaksyna (selektywny inhibitor wychwytu zwrotnego serotoniny oraz noradrenaliny)",
          "Moklobemid (odwracalny selektywny inhibitor enzymu monoaminooksydazy podtypu A)",
          "Bupropion (selektywny inhibitor neuronalnego wychwytu dopaminy oraz noradrenaliny)"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Trazodon ma silne działanie blokujące receptory alfa-1-adrenergiczne w ciałach jamistych, co znosi toniczny skurcz naczyń i beleczek, wywołując przetrwały wzwód (priapizm).",
        expl: "Trazodon ma silne działanie blokujące receptory alfa-1-adrenergiczne w ciałach jamistych, co znosi toniczny skurcz naczyń i beleczek, wywołując przetrwały wzwód (priapizm).",
        explanation: "Trazodon ma silne działanie blokujące receptory alfa-1-adrenergiczne w ciałach jamistych, co znosi toniczny skurcz naczyń i beleczek, wywołując przetrwały wzwód (priapizm)."
      },
      {
        id: 4,
        q: "W badaniu fizykalnym pacjenta z priapizmem niedokrwiennym (low-flow) typową cechą kliniczną różnicującą go od wzwodu fizjologicznego jest:",
        question: "W badaniu fizykalnym pacjenta z priapizmem niedokrwiennym (low-flow) typową cechą kliniczną różnicującą go od wzwodu fizjologicznego jest:",
        opts: [
          "Kamienista twardość i bolesność obu ciał jamistych przy całkowicie wiotkiej i miękkiej żołędzi prącia",
          "Jednoczesne maksymalne stwardnienie żołędzi, ciała gąbczastego oraz obu jąder w mosznie",
          "Całkowity brak czucia powierzchniowego na skórze moszny i wewnętrznej powierzchni ud",
          "Pojawienie się obfitego ropnego wycieku z zewnętrznego ujścia cewki moczowej",
          "Obecność obustronnego tętniącego krwiaka w okolicy dołów kulszowo-odbytniczych"
        ],
        options: [
          "Kamienista twardość i bolesność obu ciał jamistych przy całkowicie wiotkiej i miękkiej żołędzi prącia",
          "Jednoczesne maksymalne stwardnienie żołędzi, ciała gąbczastego oraz obu jąder w mosznie",
          "Całkowity brak czucia powierzchniowego na skórze moszny i wewnętrznej powierzchni ud",
          "Pojawienie się obfitego ropnego wycieku z zewnętrznego ujścia cewki moczowej",
          "Obecność obustronnego tętniącego krwiaka w okolicy dołów kulszowo-odbytniczych"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "W priapizmie ischemicznym proces dotyczy wyłącznie ciał jamistych (corpora cavernosa), które są skrajnie twarde i bolesne. Żołądź (glans penis) i ciało gąbczaste nie biorą udziału w tym procesie i pozostają wiotkie.",
        expl: "W priapizmie ischemicznym proces dotyczy wyłącznie ciał jamistych (corpora cavernosa), które są skrajnie twarde i bolesne. Żołądź (glans penis) i ciało gąbczaste nie biorą udziału w tym procesie i pozostają wiotkie.",
        explanation: "W priapizmie ischemicznym proces dotyczy wyłącznie ciał jamistych (corpora cavernosa), które są skrajnie twarde i bolesne. Żołądź (glans penis) i ciało gąbczaste nie biorą udziału w tym procesie i pozostają wiotkie."
      },
      {
        id: 5,
        q: "Głównym i najbardziej obciążającym długoterminowym powikłaniem priapizmu niedokrwiennego trwającego powyżej 24–48 godzin bez skutecznego odbarczenia jest:",
        question: "Głównym i najbardziej obciążającym długoterminowym powikłaniem priapizmu niedokrwiennego trwającego powyżej 24–48 godzin bez skutecznego odbarczenia jest:",
        opts: [
          "Nieodwracalne zwłóknienie ciał jamistych ze skrajną trwałą dysfunkcją erekcyjną (impotencją)",
          "Rozwój raka płaskonabłonkowego prącia o wysokim stopniu złośliwości histologicznej",
          "Całkowite zarośnięcie światła moczowodów z następowym wodonerczem obustronnym",
          "Wystąpienie przewlekłego wstecznego wytrysku do światła pęcherza moczowego",
          "Trwałe mimowolne nietrzymanie moczu z powodu uszkodzenia mięśnia zwieracza cewki"
        ],
        options: [
          "Nieodwracalne zwłóknienie ciał jamistych ze skrajną trwałą dysfunkcją erekcyjną (impotencją)",
          "Rozwój raka płaskonabłonkowego prącia o wysokim stopniu złośliwości histologicznej",
          "Całkowite zarośnięcie światła moczowodów z następowym wodonerczem obustronnym",
          "Wystąpienie przewlekłego wstecznego wytrysku do światła pęcherza moczowego",
          "Trwałe mimowolne nietrzymanie moczu z powodu uszkodzenia mięśnia zwieracza cewki"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Hipoksja i kwasica trwająca >24h powodują śmierć komórek mięśniówki gładkiej beleczek i ich zastępowanie przez tkankę łączną włóknistą. Zwłóknienie ciał jamistych skutkuje całkowitą impotencją u >90% chorych.",
        expl: "Hipoksja i kwasica trwająca >24h powodują śmierć komórek mięśniówki gładkiej beleczek i ich zastępowanie przez tkankę łączną włóknistą. Zwłóknienie ciał jamistych skutkuje całkowitą impotencją u >90% chorych.",
        explanation: "Hipoksja i kwasica trwająca >24h powodują śmierć komórek mięśniówki gładkiej beleczek i ich zastępowanie przez tkankę łączną włóknistą. Zwłóknienie ciał jamistych skutkuje całkowitą impotencją u >90% chorych."
      },
      {
        id: 6,
        q: "Oceń prawdziwość zdań dotyczących leczenia priapizmu:\nI. Priapizm nie-niedokrwienny (high-flow) najczęściej jest następstwem tępego urazu krocza i rzadko wymaga natychmiastowej interwencji.\nII. Maksymalna łączna zalecana dawka fenylefryny podawana dojamiste wynosi 1000 mcg w ciągu 1 godziny.\nIII. Shunt dystalny Wintera polega na przezżołędziowym nakłuciu ciał jamistych grubą igłą biopsyjną.\nIV. Priapizm ischemiczny można leczyć podaniem dożylnym wysokich dawek sildenafilu.",
        question: "Oceń prawdziwość zdań dotyczących leczenia priapizmu:\nI. Priapizm nie-niedokrwienny (high-flow) najczęściej jest następstwem tępego urazu krocza i rzadko wymaga natychmiastowej interwencji.\nII. Maksymalna łączna zalecana dawka fenylefryny podawana dojamiste wynosi 1000 mcg w ciągu 1 godziny.\nIII. Shunt dystalny Wintera polega na przezżołędziowym nakłuciu ciał jamistych grubą igłą biopsyjną.\nIV. Priapizm ischemiczny można leczyć podaniem dożylnym wysokich dawek sildenafilu.",
        opts: [
          "Prawdziwe są zdania: I, II, III",
          "Prawdziwe są zdania: II, III, IV",
          "Prawdziwe są zdania: I, III, IV",
          "Prawdziwe są wszystkie zdania (I, II, III, IV)",
          "Prawdziwe są tylko zdania: I oraz IV"
        ],
        options: [
          "Prawdziwe są zdania: I, II, III",
          "Prawdziwe są zdania: II, III, IV",
          "Prawdziwe są zdania: I, III, IV",
          "Prawdziwe są wszystkie zdania (I, II, III, IV)",
          "Prawdziwe są tylko zdania: I oraz IV"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Zdania I, II i III są prawdziwe. Zdanie IV jest fałszywe – inhibitory PDE-5 (sildenafil) potęgują relaksację beleczek i są bezwzględnie przeciwwskazane w ostrym epizodzie priapizmu.",
        expl: "Zdania I, II i III są prawdziwe. Zdanie IV jest fałszywe – inhibitory PDE-5 (sildenafil) potęgują relaksację beleczek i są bezwzględnie przeciwwskazane w ostrym epizodzie priapizmu.",
        explanation: "Zdania I, II i III są prawdziwe. Zdanie IV jest fałszywe – inhibitory PDE-5 (sildenafil) potęgują relaksację beleczek i są bezwzględnie przeciwwskazane w ostrym epizodzie priapizmu."
      },
      {
        id: 7,
        q: "U chłopca z niedokrwistością sierpowatokrwinkową (sickle cell disease), u którego rozwinął się ostry priapizm niedokrwienny, kluczowym postępowaniem ogólnoustrojowym obok aspiracji ciał jamistych jest:",
        question: "U chłopca z niedokrwistością sierpowatokrwinkową (sickle cell disease), u którego rozwinął się ostry priapizm niedokrwienny, kluczowym postępowaniem ogólnoustrojowym obok aspiracji ciał jamistych jest:",
        opts: [
          "Intensywna tlenoterapia, obfite nawodnienie dożylne, analgezja oraz ewentualna transfuzja wymienna krwi",
          "Natychmiastowe podanie heparyny drobnocząsteczkowej w dawkach leczniczych oraz kwasu acetylosalicylowego",
          "Podanie dożylne deferoksaminy w celu natychmiastowego obniżenia stężenia żelaza w surowicy",
          "Zastosowanie doustnego leczenia żelazem dwuwartościowym w połączeniu z kwasem foliowym",
          "Zalecenie kąpieli w lodowatej wodzie w celu odruchowego obkurczenia mikrokrążenia obwodowego"
        ],
        options: [
          "Intensywna tlenoterapia, obfite nawodnienie dożylne, analgezja oraz ewentualna transfuzja wymienna krwi",
          "Natychmiastowe podanie heparyny drobnocząsteczkowej w dawkach leczniczych oraz kwasu acetylosalicylowego",
          "Podanie dożylne deferoksaminy w celu natychmiastowego obniżenia stężenia żelaza w surowicy",
          "Zastosowanie doustnego leczenia żelazem dwuwartościowym w połączeniu z kwasem foliowym",
          "Zalecenie kąpieli w lodowatej wodzie w celu odruchowego obkurczenia mikrokrążenia obwodowego"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "W anemii sierpowatej przyczyną priapizmu jest sekwestracja i zablokowanie naczyń przez sierpowate erytrocyty (HbS). Leczenie ogólne obejmuje nawodnienie, tlenoterapię, alkalizację i transfuzję wymienną (obniżenie stężenia HbS <30%).",
        expl: "W anemii sierpowatej przyczyną priapizmu jest sekwestracja i zablokowanie naczyń przez sierpowate erytrocyty (HbS). Leczenie ogólne obejmuje nawodnienie, tlenoterapię, alkalizację i transfuzję wymienną (obniżenie stężenia HbS <30%).",
        explanation: "W anemii sierpowatej przyczyną priapizmu jest sekwestracja i zablokowanie naczyń przez sierpowate erytrocyty (HbS). Leczenie ogólne obejmuje nawodnienie, tlenoterapię, alkalizację i transfuzję wymienną (obniżenie stężenia HbS <30%)."
      },
      {
        id: 8,
        q: "Która z wymienionych procedur chirurgicznych stanowi przykład dystalnej przetoki omijającej (shuntu dystalnego) stosowanej w opornym priapizmie ischemicznym?",
        question: "Która z wymienionych procedur chirurgicznych stanowi przykład dystalnej przetoki omijającej (shuntu dystalnego) stosowanej w opornym priapizmie ischemicznym?",
        opts: [
          "Przetoka Al-Ghoraba polegająca na wycięciu fragmentu osłonki białawej na szczycie ciał jamistych przez cięcie na żołędzi",
          "Przetoka Quackelsa polegająca na zespoleniu ciała jamistego z ciałem gąbczastym z dostępu przez krocze",
          "Przetoka Grayhacka polegająca na zespoleniu dystalnego końca żyły odpiszczelowej z ciałem jamistym",
          "Operacja Nesbita polegająca na plastyce osłonki białawej z wycięciem elipsy tkankowej",
          "Zabieg Lichtensteina z użyciem siatki polipropylenowej w okolicy kanału pachwinowego"
        ],
        options: [
          "Przetoka Al-Ghoraba polegająca na wycięciu fragmentu osłonki białawej na szczycie ciał jamistych przez cięcie na żołędzi",
          "Przetoka Quackelsa polegająca na zespoleniu ciała jamistego z ciałem gąbczastym z dostępu przez krocze",
          "Przetoka Grayhacka polegająca na zespoleniu dystalnego końca żyły odpiszczelowej z ciałem jamistym",
          "Operacja Nesbita polegająca na plastyce osłonki białawej z wycięciem elipsy tkankowej",
          "Zabieg Lichtensteina z użyciem siatki polipropylenowej w okolicy kanału pachwinowego"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Shunty dystalne wykonuje się przez żołądź: Winter (igła Tru-Cut), Ebbehoj (skalpel), Al-Ghorab (otwarte wycięcie okienka osłonki). Quackels i Grayhack to shunty proksymalne.",
        expl: "Shunty dystalne wykonuje się przez żołądź: Winter (igła Tru-Cut), Ebbehoj (skalpel), Al-Ghorab (otwarte wycięcie okienka osłonki). Quackels i Grayhack to shunty proksymalne.",
        explanation: "Shunty dystalne wykonuje się przez żołądź: Winter (igła Tru-Cut), Ebbehoj (skalpel), Al-Ghorab (otwarte wycięcie okienka osłonki). Quackels i Grayhack to shunty proksymalne."
      },
      {
        id: 9,
        q: "Podczas dojamistego podawania fenylefryny konieczne jest ciągłe monitorowanie ciśnienia tętniczego i rytmu serca z powodu ryzyka:",
        question: "Podczas dojamistego podawania fenylefryny konieczne jest ciągłe monitorowanie ciśnienia tętniczego i rytmu serca z powodu ryzyka:",
        opts: [
          "Gwałtownego przełomu nadciśnieniowego z odruchową ciężką bradykardią lub zawałem mięśnia sercowego",
          "Gwałtownej hipotensji ortostatycznej z tachykardią zatokową przekraczającą 180 uderzeń na minutę",
          "Ostrej niewydolności oddechowej w mechanizmie ciężkiego skurczu oskrzeli indukowanego histaminą",
          "Pojawienia się hiperkaliemii z blokiem odnóg pęczka Hisa na tle rozpadu miocytów szkieletowych",
          "Zaburzeń krzepnięcia krwi w postaci zespołu rozsianego wykrzepiania wewnątrznaczyniowego (DIC)"
        ],
        options: [
          "Gwałtownego przełomu nadciśnieniowego z odruchową ciężką bradykardią lub zawałem mięśnia sercowego",
          "Gwałtownej hipotensji ortostatycznej z tachykardią zatokową przekraczającą 180 uderzeń na minutę",
          "Ostrej niewydolności oddechowej w mechanizmie ciężkiego skurczu oskrzeli indukowanego histaminą",
          "Pojawienia się hiperkaliemii z blokiem odnóg pęczka Hisa na tle rozpadu miocytów szkieletowych",
          "Zaburzeń krzepnięcia krwi w postaci zespołu rozsianego wykrzepiania wewnątrznaczyniowego (DIC)"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Fenylefryna wchłaniając się z ciał jamistych do krążenia ogólnego pobudza receptory alfa-1, powodując skurcz tętnic obwodowych, skok ciśnienia tętniczego i odruchową bradykardię z baroreceptorów.",
        expl: "Fenylefryna wchłaniając się z ciał jamistych do krążenia ogólnego pobudza receptory alfa-1, powodując skurcz tętnic obwodowych, skok ciśnienia tętniczego i odruchową bradykardię z baroreceptorów.",
        explanation: "Fenylefryna wchłaniając się z ciał jamistych do krążenia ogólnego pobudza receptory alfa-1, powodując skurcz tętnic obwodowych, skok ciśnienia tętniczego i odruchową bradykardię z baroreceptorów."
      },
      {
        id: 10,
        q: "Z punktu widzenia etyki lekarskiej i prawa medycznego, jeżeli u pacjenta po 48 godzinach trwania priapizmu doszło do nieodwracalnej martwicy i zwłóknienia:",
        question: "Z punktu widzenia etyki lekarskiej i prawa medycznego, jeżeli u pacjenta po 48 godzinach trwania priapizmu doszło do nieodwracalnej martwicy i zwłóknienia:",
        opts: [
          "Lekarz ma prawny i moralny obowiązek rzetelnego poinformowania pacjenta o rokowaniu co do funkcji seksualnych oraz możliwościach późniejszej implantacji protezy prącia",
          "Lekarz powinien zataić informację o trwałym uszkodzeniu narządu, aby uniknąć załamania psychicznego i depresji u chorego",
          "Lekarz ma prawo odmówić dalszego leczenia pacjenta powołując się na klauzulę sumienia z powodu polekowego tła schorzenia",
          "Personel medyczny może uzależnić wdrożenie zabiegu odbarczającego od uprzedniego uiszczenia opłaty za zużyte igły",
          "Informacja o stanie zdrowia chorego musi zostać bezwzględnie przekazana zakładowi pracy pacjenta w trybie urzędowym"
        ],
        options: [
          "Lekarz ma prawny i moralny obowiązek rzetelnego poinformowania pacjenta o rokowaniu co do funkcji seksualnych oraz możliwościach późniejszej implantacji protezy prącia",
          "Lekarz powinien zataić informację o trwałym uszkodzeniu narządu, aby uniknąć załamania psychicznego i depresji u chorego",
          "Lekarz ma prawo odmówić dalszego leczenia pacjenta powołując się na klauzulę sumienia z powodu polekowego tła schorzenia",
          "Personel medyczny może uzależnić wdrożenie zabiegu odbarczającego od uprzedniego uiszczenia opłaty za zużyte igły",
          "Informacja o stanie zdrowia chorego musi zostać bezwzględnie przekazana zakładowi pracy pacjenta w trybie urzędowym"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Pacjent ma prawo do rzetelnej informacji o swoim stanie zdrowia, rozpoznaniu, rokowaniu oraz dostępnych metodach leczenia rekonstrukcyjnego (np. hydrauliczna proteza prącia).",
        expl: "Pacjent ma prawo do rzetelnej informacji o swoim stanie zdrowia, rozpoznaniu, rokowaniu oraz dostępnych metodach leczenia rekonstrukcyjnego (np. hydrauliczna proteza prącia).",
        explanation: "Pacjent ma prawo do rzetelnej informacji o swoim stanie zdrowia, rozpoznaniu, rokowaniu oraz dostępnych metodach leczenia rekonstrukcyjnego (np. hydrauliczna proteza prącia)."
      },
      {
        id: 11,
        q: "W badaniu USG Color Doppler prącia u pacjenta z priapizmem nie-niedokrwiennym (high-flow / arterial priapism) typowym obrazem jest:",
        question: "W badaniu USG Color Doppler prącia u pacjenta z priapizmem nie-niedokrwiennym (high-flow / arterial priapism) typowym obrazem jest:",
        opts: [
          "Wysoki, turbulentny przepływ krwi tętniczej w tętnicy jamistej z obecnością przetoki tętniczo-jamistej bez cech kwasicy",
          "Całkowity brak jakiegokolwiek przepływu naczyniowego w obrębie tętnic jamistych i splotu wiciowatego prącia",
          "Obecność masywnych skrzeplin zamykających światło żyły grzbietowej prącia z odwróceniem kierunku fali skurczowej",
          "Monofazowy, skrajnie niski opór naczyniowy w naczyniach żołędzi z obecnością tętniaka aorty brzusznej",
          "Obustronne zmniejszenie wymiarów ciał jamistych z obecnością rozległych zwapnień w torebce białawej"
        ],
        options: [
          "Wysoki, turbulentny przepływ krwi tętniczej w tętnicy jamistej z obecnością przetoki tętniczo-jamistej bez cech kwasicy",
          "Całkowity brak jakiegokolwiek przepływu naczyniowego w obrębie tętnic jamistych i splotu wiciowatego prącia",
          "Obecność masywnych skrzeplin zamykających światło żyły grzbietowej prącia z odwróceniem kierunku fali skurczowej",
          "Monofazowy, skrajnie niski opór naczyniowy w naczyniach żołędzi z obecnością tętniaka aorty brzusznej",
          "Obustronne zmniejszenie wymiarów ciał jamistych z obecnością rozległych zwapnień w torebce białawej"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Priapizm high-flow wynika z niekontrolowanego napływu tętniczego (fistulizacja po urazie krocza). W USG widoczny jest turbulentny przepływ tętniczy o dużej prędkości (high velocity), a krew z ciał jamistych ma cechy krwi tętniczej.",
        expl: "Priapizm high-flow wynika z niekontrolowanego napływu tętniczego (fistulizacja po urazie krocza). W USG widoczny jest turbulentny przepływ tętniczy o dużej prędkości (high velocity), a krew z ciał jamistych ma cechy krwi tętniczej.",
        explanation: "Priapizm high-flow wynika z niekontrolowanego napływu tętniczego (fistulizacja po urazie krocza). W USG widoczny jest turbulentny przepływ tętniczy o dużej prędkości (high velocity), a krew z ciał jamistych ma cechy krwi tętniczej."
      }
    ],
    flashcards: [
      {
        q: "Jaki jest profil gazometryczny krwi z ciał jamistych w priapizmie niedokrwiennym (low-flow)?",
        a: "Głęboka kwasica i hipoksja: ciemna krew, pH <7,25, pO2 <30 mmHg, pCO2 >60 mmHg."
      },
      {
        q: "Jak manifestuje się dysocjacja wzwodu w priapizmie ischemicznym?",
        a: "Trzon prącia (corpora cavernosa) jest skrajnie twardy i bolesny, a żołądź i ciało gąbczaste są wiotkie i miękkie."
      },
      {
        q: "Jaki lek stanowi I rzut w iniekcjach dojamistych w priapizmie niedokrwiennym?",
        a: "Fenylefryna (selektywny agonista alfa-1 w dawkach 100–200 mcg co 3–5 min, maks. 1000 mcg/h)."
      },
      {
        q: "Jaki popularny lek przeciwdepresyjny jest częstą przyczyną priapizmu polekowego?",
        a: "Trazodon (ze względu na silne działanie blokujące receptory alfa-1-adrenergiczne)."
      },
      {
        q: "Co dzieje się z ciałami jamistymi, jeśli niedokrwienie trwa powyżej 24–48 godzin?",
        a: "Dochodzi do nieodwracalnej martwicy miocytów, włóknienia ciał jamistych i trwałej utraty wzwodu (impotencji)."
      },
      {
        q: "Na czym polega chirurgiczny shunt dystalny Al-Ghoraba w opornym priapizmie?",
        a: "Na operacyjnym wycięciu okienka w osłonce białawej na szczycie ciał jamistych przez nacięcie żołędzi."
      }
    ]
  }
];

console.log("Validating Case 167...");
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

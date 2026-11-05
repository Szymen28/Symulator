const fs = require('fs');
const path = require('path');
const { encryptStringAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

// Validation helper before encryption
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
    if (ratio > 1.6) errs.push(`Step #${sidx} option disparity ratio ${ratio.toFixed(2)} > 1.6 in case ${c.id}`);
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
    if (ratio > 1.55) errs.push(`LEK #${qidx} option disparity ratio ${ratio.toFixed(2)} > 1.55 in case ${c.id}`);
  });
  if (!c.flashcards || c.flashcards.length !== 6) errs.push(`flashcards count != 6 in case ${c.id}`);
  return errs;
}

const casesData = [
  // =========================================================================
  // CASE 166: Krwawienie z Nosa (Epistaxis)
  // =========================================================================
  {
    id: 166,
    file: "166_krwawienie_z_nosa_epistaxis.json",
    shortTitle: "Krwawienie z Nosa (Epistaxis)",
    title: "Laryngologiczny Stan Nagły: Masywne Krwawienie z Nosa (Epistaxis)",
    dept: "Otolaryngologia / SOR",
    diagnosisTitle: "Masywne Krwawienie z Tylnego Odcinka Jamy Nosowej (Epistaxis Posterior)",
    vitals: [
      { label: "Ciśnienie tętnicze (RR)", val: "185/105", unit: "mmHg", status: "vital-crit" },
      { label: "Częstość akcji serca (HR)", val: "102", unit: "/min", status: "vital-warn" },
      { label: "Częstość oddechów (RR)", val: "18", unit: "/min", status: "vital-ok" },
      { label: "Saturacja (SpO2)", val: "97", unit: "%", status: "vital-ok" },
      { label: "Temperatura ciała", val: "36.7", unit: "°C", status: "vital-ok" }
    ],
    story: "<p><strong>Pacjent:</strong> 68-letni mężczyzna przywieziony przez ZRM na SOR z powodu obfitego, nieustępującego krwawienia z obu przewodów nosowych i jamy ustnej.</p><p><strong>Wywiad chorobowy:</strong> Krwawienie rozpoczęło się nagle 1,5 godziny temu w domu, podczas odpoczynku. Pacjent trzymał głowę odchyloną do tyłu, co spowodowało połykanie i wykrztuszanie dużych ilości świeżej krwi oraz skrzepów. W wywiadzie: wieloletnie, nieregularnie leczone nadciśnienie tętnicze, choroba niedokrwienna serca po implantacji stentu DES 8 miesięcy temu (przyjmuje kwas acetylosalicylowy 75 mg/d oraz klopidogrel 75 mg/d). Zastosowany w karetce ucisk skrzydełek nosa oraz zimne okłady na kark nie przyniosły zahamowania krwawienia. Pacjent czuje osłabienie, zawroty głowy i silny niepokój.</p><p><strong>Badanie przedmiotowe:</strong> Pacjent blady, spocony, wypluwa świeżą krew i skrzepy do miski nerkowatej. Błona śluzowa jamy ustnej i gardła zalana krwią spływającą strugami po tylnej ścianie gardła mimo obustronnego zaciśnięcia skrzydełek nosa. W rynoskopii przedniej po odessaniu skrzepów nie uwidoczniono aktywnego źródła krwawienia na splotu Kiesselbacha (Little'a) na przedniej przegrodzie nosa; krew wypływa obficie pulsacyjnym strumieniem z głębi prawego przewodu nosowego (podejrzenie gałęzi tętnicy klinowo-podniebnej). Ciśnienie tętnicze wynosi 185/105 mmHg, tętno 102/min.</p>",
    steps: [
      {
        title: "Krok 1: Pozycja pacjenta i wstępne zabezpieczenie hemostazy",
        scenario: "Pacjent krwawi z nosa i tylnej ściany gardła, a jego ciśnienie wynosi 185/105 mmHg. Rodzina w domu kazała mu leżeć z głową odchyloną w tył. Jakie jest natychmiastowe postępowanie niefarmakologiczne na SOR?",
        options: [
          {
            text: "Ułożenie pacjenta w pozycji siedzącej z głową lekko pochyloną do przodu, zalecenie wypluwania spływającej krwi, obustronny ucisk skrzydełek nosa przez 10–15 min oraz kaniulacja żyły obwodowej",
            correct: true,
            isCorrect: true,
            feedback: "✅ PRAWIDŁOWO! Pozycja siedząca z głową pochyloną do przodu zapobiega połykaniu krwi (co wywołuje wymioty i wzrost ciśnienia) oraz zachłyśnięciu do dróg oddechowych. Wypluwanie krwi pozwala monitorować jej utratę, a ucisk mechaniczny tamuje krwawienia z przedniego odcinka."
          },
          {
            text: "Ułożenie pacjenta płasko na wznak w pozycji Trendelenburga z nogami uniesionymi powyżej tułowia, połączone z natychmiastowym wlewem dożylnym 500 ml syntetycznego koloidu pod ciśnieniem",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Pozycja leżąca z uniesionymi nogami zwiększa ciśnienie w dorzeczu żyły głównej górnej, nasila krwotok z nosa i stwarza bezpośrednie ryzyko zachłystowego zapalenia płuc."
          },
          {
            text: "Głębokie odchylenie głowy pacjenta ku tyłowi na poduszce wraz z bezwzględnym poleceniem powstrzymywania kaszlu oraz ciągłego połykania wszelkiej krwi gromadzącej się w tylnej części gardła",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Odchylanie głowy w tył to kardynalny błąd – połykana krew drażni błonę śluzową żołądka, wywołuje gwałtowne fusowate wymioty i grozi uduszeniem."
          },
          {
            text: "Natychmiastowe podanie dożylne 40 mg furosemidu w szybkim bolusie w celu nagłego obniżenia ciśnienia tętniczego, z całkowitym zaniechaniem badania fizykalnego jamy nosowej oraz gardła",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Sam moczopędny spadek ciśnienia nie zatamuje krwotoku tętniczego, a odwodnienie pogarsza stan hemodynamiczny pacjenta krwawiącego."
          }
        ]
      },
      {
        title: "Krok 2: Zaopatrzenie krwawienia tylnego – tamponada",
        scenario: "Mimo odessania skrzepów i założenia tamponady przedniej (opatrunek pneumatyczny Rapid Rhino) krew nadal obficie spływa po tylnej ścianie gardła. Wskazuje to na krwawienie z tylnego odcinka jamy nosowej. Jakie jest definitywne postępowanie hemostatyczne?",
        options: [
          {
            text: "Założenie tamponady tylnej (cewnik z podwójnym balonem do krwawień tylnych lub klasyczna tamponada Bellocqa) uzupełnionej przednią, sedacja i pilna konsultacja laryngologiczna",
            correct: true,
            isCorrect: true,
            feedback: "✅ PRAWIDŁOWO! Krwawienie tylne (zwykle tętnica klinowo-podniebna) wymaga uciśnięcia nozdrzy tylnych tamponadą tylną (balon lub tampon Bellocqa dociągany do nosogardła) w połączeniu z tamponadą przednią. Wymaga to bezwzględnej hospitalizacji i monitorowania."
          },
          {
            text: "Usunięcie wszelkich tamponów i zastosowanie wyłącznie maści z antybiotykiem i wazeliną aplikowanej na przednią część przegrody",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Maści i wazelina są skuteczne przy drobnym wysuszeniu splotu Kiesselbacha, ale całkowicie bezradne przy krwawieniu z naczyń tylnych."
          },
          {
            text: "Natychmiastowe obustronne nacięcie błon bębenkowych w celu dekompresji ciśnienia w jamie nosowo-gardłowej i uchu środkowym",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Paracenteza nie ma żadnego zastosowania w leczeniu epistaxis i stanowiłaby jatrogenne okaleczenie pacjenta."
          },
          {
            text: "Płukanie obu przewodów nosowych gorącą wodą o temperaturze 50°C w celu wywołania obkurczenia mięśniówki tętnic sitowych",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Ciepło rozszerza łożysko naczyniowe i dramatycznie nasila krwawienie tętnicze, doprowadzając do wstrząsu hipowolemicznego."
          }
        ]
      },
      {
        title: "Krok 3: Farmakoterapia wspomagająca i postępowanie przeciwnadciśnieniowe",
        scenario: "Pacjent ma ciśnienie 185/105 mmHg, przyjmuje DAPT (ASA + klopidogrel). Tamponada tylna została poprawnie uszczelniona. Jakie leczenie farmakologiczne i monitorowanie należy wdrożyć?",
        options: [
          {
            text: "Opanowanie nadciśnienia tętniczego (np. labetalol lub urapidyl i.v.), kwas traneksamowy 1 g i.v., profilaktyczna antybiotykoterapia przy tamponadzie oraz hospitalizacja z monitorowaniem SpO2 i EKG",
            correct: true,
            isCorrect: true,
            feedback: "✅ PRAWIDŁOWO! Zrównoważone obniżenie ciśnienia tętniczego (do wartości bezpiecznych) zmniejsza ciśnienie perfuzyjne w jamie nosowej. Kwas traneksamowy hamuje fibrynolizę. Tamponada tylna zaburza wentylację (odruch nosowo-płucny, ryzyko hipoksji) i stwarza ryzyko zespołu wstrząsu toksycznego (TSS), dlatego wymaga osłony antybiotykowej i ścisłego nadzoru."
          },
          {
            text: "Podanie heparyny drobnocząsteczkowej w pełnej dawce terapeutycznej i.v. oraz wypisanie pacjenta do domu z zaleceniem wizyty za 48 godzin",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Podanie heparyny u pacjenta krwawiącego i odesłanie go do domu z tamponadą tylną stwarza bezpośrednie zagrożenie życia!"
          },
          {
            text: "Natychmiastowe przetoczenie 4 jednostek koncentratu krwinek płytkowych bez względu na aktualną morfologię i stężenie hemoglobiny",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Rutynowe toczenie KKP przy braku trombocytopenii i braku masywnego krwotoku zagrażającego życiu jest błędem przetoczeniowym."
          },
          {
            text: "Gwałtowne obniżenie ciśnienia tętniczego podjęzykową nifedypiną w kroplach do wartości skurczowej poniżej 90 mmHg w ciągu 10 minut",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Nifedypina krótkodziałająca wywołuje niekontrolowane spadki ciśnienia z tachykardią i ryzykiem udaru niedokrwiennego mózgu lub zawału serca."
          }
        ]
      }
    ],
    pathoNodes: [
      {
        id: "patho_1",
        title: "Unaczynienie jamy nosowej i splot Kiesselbacha",
        desc: "Przedni odcinek przegrody nosa zaopatruje splot Kiesselbacha (Little'a), łączący gałęzie tętnicy szyjnej wewnętrznej (t. sitowa przednia) i zewnętrznej (t. klinowo-podniebna, wargowa górna, podniebienna większa). Stanowi on źródło ponad 90% krwawień, zazwyczaj łagodnych i podatnych na bezpośredni ucisk.",
        target: "Miejscowy ucisk skrzydełek nosa i koagulacja bipolarna splotu Little'a"
      },
      {
        id: "patho_2",
        title: "Krwawienie z tylnego odcinka (arteria sphenopalatina)",
        desc: "Krwawienia tylne pochodzą z gałęzi tętnicy klinowo-podniebnej (z t. szczękowej) lub tętnic sitowych tylnych. Są to naczynia o większym przekroju, w których wysokie ciśnienie hydrostatyczne uniemożliwia samoistny skurcz mięśniówki naczyniowej, generując krwotok spływający do gardła.",
        target: "Tamponada tylna Bellocqa, balon dwukomorowy lub embolizacja naczyniowa"
      },
      {
        id: "patho_3",
        title: "Czynniki zaostrzające: nadciśnienie tętnicze i leki p-płytkowe",
        desc: "Przełom nadciśnieniowy powoduje pękanie kruchych, zmienionych miażdżycowo naczyń śluzówki nosa. Jednoczesna podwójna terapia przeciwpłytkowa (DAPT) uniemożliwia uformowanie stabilnego czopa płytkowego, prowadząc do przewlekłego krwawienia zagrażającego niestabilnością hemodynamiczną.",
        target: "Kontrola ciśnienia tętniczego (urapidyl) i kwas traneksamowy i.v."
      }
    ],
    dutySummary: {
      diagnostics: "1. Ocena drożności dróg oddechowych (ABC) oraz stabilności hemodynamicznej (tętno, ciśnienie tętnicze, saturacja).\n\n2. Badanie rynoskopowe przednie po uprzednim dokładnym odessaniu skrzepów i obkurczeniu śluzówki (lidokaina z fenylefryną/adrenaliną).\n\n3. Badanie gardła i jamy ustnej w celu wykluczenia spływania krwi po tylnej ścianie (różnicowanie krwawienia przedniego z tylnym).\n\n4. Badania laboratoryjne: morfologia krwi, układ krzepnięcia (PT, INR, APTT, fibrynogen), grupa krwi, elektrolity i kreatynina.",
      drugsAndDoses: "• Kwas traneksamowy: <span class=\"dose-pill\">1000 mg i.v. w powolnym wstrzyknięciu (100 mg/min)</span> w celu zahamowania fibrynolizy.\n• Miejscowe obkurczenie naczyń: <span class=\"dose-pill\">gazik nasączony 2% lidokainą z noradrenaliną (1:10 000)</span> na 5–10 minut do przewodu nosowego.\n• Labetalol: <span class=\"dose-pill\">20 mg i.v. w bolusie</span> co 10–15 minut (maks. 200 mg) lub urapidyl <span class=\"dose-pill\">12,5–25 mg i.v.</span> przy nadciśnieniu.\n• Osłona antybiotykowa przy tamponadzie: <span class=\"dose-pill\">amoksycylina z kwasem klawulanowym 1,2 g i.v. co 8h</span> lub cefazolina <span class=\"dose-pill\">1 g i.v. co 8h</span> (profilaktyka TSS i zapalenia zatok).",
      pitfalls: [
        "Odchylanie głowy pacjenta do tyłu, co prowadzi do zachłyśnięcia krwią lub wywołania wymiotów fusowatych wskutek podrażnienia żołądka.",
        "Nierozpoznanie krwawienia tylnego i wypisanie do domu pacjenta z tamponadą przednią, podczas gdy krew niezauważenie spływa do przewodu pokarmowego.",
        "Pozostawienie tamponady tylnej lub przedniej bez antybiotykoterapii powyżej 48 godzin, grożące wstrząsem toksycznym (TSS) i martwicą przegrody nosa.",
        "Zbyt gwałtowne obniżanie ciśnienia tętniczego u starszego pacjenta z miażdżycą, grożące udarem niedokrwiennym mózgu lub zawałem serca."
      ]
    },
    diffTable: {
      title: "⚔️ Tabela Różnicowa: Krwawienie z Przedniego vs Tylnego Odcinka Nosa",
      headers: ["Cecha kliniczna", "Krwawienie przednie (splot Little'a)", "Krwawienie tylne (t. klinowo-podniebna)", "Krwawienie z żylaków przełyku", "Krwioplucie (z drzewa oskrzelowego)"],
      rows: [
        ["Główne źródło", "Splot Kiesselbacha (Little'a)", "Tętnica klinowo-podniebna / sitowe tylne", "Splot podśluzówkowy dolnego przełyku", "Naczynia oskrzelowe (płucne)"],
        ["Częstość występowania", ">90% wszystkich epistaxis", "Około 5–10% przypadków", "Rzadka pomyłka z epistaxis", "Odrębne schorzenie płucne"],
        ["Obraz kliniczny", "Krew wypływa z nozdrzy przednich", "Krew spływa do gardła mimo ucisku nosa", "Masywne wymioty krwiste, brak w nosie", "Krew odkrztuszana z kaszlem, spieniona"],
        ["Skuteczność ucisku skrzydełek", "Bardzo wysoka (często zatrzymuje krwawienie)", "Całkowicie nieskuteczna", "Brak wpływu", "Brak wpływu"],
        ["Leczenie I rzutu", "Ucisk, koagulacja chemiczna/bipolarna, tamponada przednia", "Tamponada tylna Bellocqa / balon, embolizacja", "Sonda Sengstakena, leki wazoaktywne, endoskopia", "Bronchoskopia, zabezpieczenie dróg oddechowych"],
        ["Konieczność hospitalizacji", "Zwykle nie (leczenie ambulatoryjne)", "Bezwzględna hospitalizacja na laryngologii", "Bezwzględny OIT / oddział chorób wewnętrznych", "Oddział pulmonologii / torakochirurgii"]
      ]
    },
    lekQuestions: [
      {
        id: 1,
        q: "Najczęstszą lokalizacją źródła krwawienia z nosa (odpowiadającą za ponad 90% epizodów) jest:",
        question: "Najczęstszą lokalizacją źródła krwawienia z nosa (odpowiadającą za ponad 90% epizodów) jest:",
        opts: [
          "Splot naczyniowy Kiesselbacha (Little'a) na przednio-dolnej części przegrody nosa",
          "Tętnica klinowo-podniebna w okolicy otworu klinowo-podniebnego ściany bocznej",
          "Splot żylny Woodruffa zlokalizowany w tylnej części bocznej ściany jamy nosowej",
          "Tętnica sitowa tylna odchodząca bezpośrednio od tętnicy ocznej w oczodole",
          "Tętnica wargowa dolna zespalająca się z gałęziami tętnicy szczękowej w dnie nosa"
        ],
        options: [
          "Splot naczyniowy Kiesselbacha (Little'a) na przednio-dolnej części przegrody nosa",
          "Tętnica klinowo-podniebna w okolicy otworu klinowo-podniebnego ściany bocznej",
          "Splot żylny Woodruffa zlokalizowany w tylnej części bocznej ściany jamy nosowej",
          "Tętnica sitowa tylna odchodząca bezpośrednio od tętnicy ocznej w oczodole",
          "Tętnica wargowa dolna zespalająca się z gałęziami tętnicy szczękowej w dnie nosa"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Splot Kiesselbacha (Little'a) leży na przednio-dolnej części przegrody nosowej i odpowiada za ponad 90% krwawień z nosa ze względu na powierzchowne położenie naczyń.",
        expl: "Splot Kiesselbacha (Little'a) leży na przednio-dolnej części przegrody nosowej i odpowiada za ponad 90% krwawień z nosa ze względu na powierzchowne położenie naczyń.",
        explanation: "Splot Kiesselbacha (Little'a) leży na przednio-dolnej części przegrody nosowej i odpowiada za ponad 90% krwawień z nosa ze względu na powierzchowne położenie naczyń."
      },
      {
        id: 2,
        q: "W skład splotu Kiesselbacha (Little'a) wchodzą odgałęzienia naczyń krwionośnych z wyjątkiem:",
        question: "W skład splotu Kiesselbacha (Little'a) wchodzą odgałęzienia naczyń krwionośnych z wyjątkiem:",
        opts: [
          "Tętnicy szyjnej wewnętrznej za pośrednictwem odgałęzień tętnicy sitowej tylnej",
          "Tętnicy sitowej przedniej (pochodzącej bezpośrednio z tętnicy ocznej)",
          "Tętnicy klinowo-podniebnej (będącej gałęzią końcową tętnicy szczękowej)",
          "Tętnicy podniebiennej większej (przechodzącej przez kanał przysieczny)",
          "Tętnicy wargowej górnej (pochodzącej bezpośrednio z tętnicy twarzowej)"
        ],
        options: [
          "Tętnicy szyjnej wewnętrznej za pośrednictwem odgałęzień tętnicy sitowej tylnej",
          "Tętnicy sitowej przedniej (pochodzącej bezpośrednio z tętnicy ocznej)",
          "Tętnicy klinowo-podniebnej (będącej gałęzią końcową tętnicy szczękowej)",
          "Tętnicy podniebiennej większej (przechodzącej przez kanał przysieczny)",
          "Tętnicy wargowej górnej (pochodzącej bezpośrednio z tętnicy twarzowej)"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Tętnica sitowa tylna zaopatruje górno-tylną część jamy nosowej i NIE wchodzi w skład splotu Kiesselbacha. W skład splotu wchodzą: t. sitowa przednia, t. klinowo-podniebna, t. podniebienna większa i t. wargowa górna.",
        expl: "Tętnica sitowa tylna zaopatruje górno-tylną część jamy nosowej i NIE wchodzi w skład splotu Kiesselbacha. W skład splotu wchodzą: t. sitowa przednia, t. klinowo-podniebna, t. podniebienna większa i t. wargowa górna.",
        explanation: "Tętnica sitowa tylna zaopatruje górno-tylną część jamy nosowej i NIE wchodzi w skład splotu Kiesselbacha. W skład splotu wchodzą: t. sitowa przednia, t. klinowo-podniebna, t. podniebienna większa i t. wargowa górna."
      },
      {
        id: 3,
        q: "Pierwszorzutowym niefarmakologicznym działaniem ratunkowym w krwawieniu z przedniego odcinka nosa jest:",
        question: "Pierwszorzutowym niefarmakologicznym działaniem ratunkowym w krwawieniu z przedniego odcinka nosa jest:",
        opts: [
          "Ułożenie chorego w pozycji siedzącej z głową lekko pochyloną do przodu i obustronny ucisk skrzydełek nosa przez 10–15 minut",
          "Ułożenie chorego płasko na plecach z głową mocno odchyloną w tył i założenie lodu na okolicę czołową",
          "Natychmiastowe obustronne założenie ciasnej tamponady tylnej Bellocqa bez prób kompresji skrzydełek",
          "Zalecenie intensywnego wydmuchiwania nosa co 2 minuty w celu zapobiegania formowaniu jakichkolwiek skrzepów",
          "Zastosowanie próby Valsalvy przez 5 minut w celu odruchowego obkurczenia obwodowych naczyń głowy"
        ],
        options: [
          "Ułożenie chorego w pozycji siedzącej z głową lekko pochyloną do przodu i obustronny ucisk skrzydełek nosa przez 10–15 minut",
          "Ułożenie chorego płasko na plecach z głową mocno odchyloną w tył i założenie lodu na okolicę czołową",
          "Natychmiastowe obustronne założenie ciasnej tamponady tylnej Bellocqa bez prób kompresji skrzydełek",
          "Zalecenie intensywnego wydmuchiwania nosa co 2 minuty w celu zapobiegania formowaniu jakichkolwiek skrzepów",
          "Zastosowanie próby Valsalvy przez 5 minut w celu odruchowego obkurczenia obwodowych naczyń głowy"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowa pozycja to siedząca z głową pochyloną ku przodowi (sniffing/forward tilt) i ciągły, mocny ucisk skrzydełek nosa palcami przez minimum 10–15 minut.",
        expl: "Prawidłowa pozycja to siedząca z głową pochyloną ku przodowi (sniffing/forward tilt) i ciągły, mocny ucisk skrzydełek nosa palcami przez minimum 10–15 minut.",
        explanation: "Prawidłowa pozycja to siedząca z głową pochyloną ku przodowi (sniffing/forward tilt) i ciągły, mocny ucisk skrzydełek nosa palcami przez minimum 10–15 minut."
      },
      {
        id: 4,
        q: "Tamponada tylna Bellocqa lub cewnik z podwójnym balonem jest bezwzględnie wskazana w przypadku:",
        question: "Tamponada tylna Bellocqa lub cewnik z podwójnym balonem jest bezwzględnie wskazana w przypadku:",
        opts: [
          "Utrzymującego się spływania krwi po tylnej ścianie gardła pomimo prawidłowo założonej tamponady przedniej",
          "Każdego krwawienia z nosa u chorego leczonego antagonistami witaminy K niezależnie od wyniku INR",
          "Drobnego, nawracającego krwawienia ze splotu Little'a u nastolatków w okresie dorastania",
          "Stwierdzenia pojedynczego naczynka krwawiącego na przedniej części przegrody nosowej w rynoskopii",
          "Krwawienia po mechanicznym urazie nosa bez przemieszczenia kości nosowych i bez krwotoku do gardła"
        ],
        options: [
          "Utrzymującego się spływania krwi po tylnej ścianie gardła pomimo prawidłowo założonej tamponady przedniej",
          "Każdego krwawienia z nosa u chorego leczonego antagonistami witaminy K niezależnie od wyniku INR",
          "Drobnego, nawracającego krwawienia ze splotu Little'a u nastolatków w okresie dorastania",
          "Stwierdzenia pojedynczego naczynka krwawiącego na przedniej części przegrody nosowej w rynoskopii",
          "Krwawienia po mechanicznym urazie nosa bez przemieszczenia kości nosowych i bez krwotoku do gardła"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Krwawienie tylne objawia się spływaniem krwi do nosogardła i gardła mimo szczelnej tamponady przedniej; wymaga ono tamponady tylnej.",
        expl: "Krwawienie tylne objawia się spływaniem krwi do nosogardła i gardła mimo szczelnej tamponady przedniej; wymaga ono tamponady tylnej.",
        explanation: "Krwawienie tylne objawia się spływaniem krwi do nosogardła i gardła mimo szczelnej tamponady przedniej; wymaga ono tamponady tylnej."
      },
      {
        id: 5,
        q: "Które z poniższych stwierdzeń dotyczących powikłań tamponady nosa jest PRAWDZIWE?",
        question: "Które z poniższych stwierdzeń dotyczących powikłań tamponady nosa jest PRAWDZIWE?",
        opts: [
          "Tamponada tylna może wywołać odruch nosowo-płucny skutkujący hipowentylacją, hipoksją oraz groźnymi zaburzeniami rytmu serca",
          "Tamponada przednia całkowicie eliminuje jakiekolwiek ryzyko martwicy skrzydełek nosa i przegrody chrzęstnej",
          "Pozostawienie tamponady nosowej powyżej 48 godzin nigdy nie wiąże się z ryzykiem zespołu wstrząsu toksycznego (TSS)",
          "Założenie tamponady tylnej nie wymaga monitorowania kardiologicznego ani pulsoksymetrii u osób w podeszłym wieku",
          "Tamponada nosowa z użyciem setonu gazowego może być bezpiecznie utrzymywana bez wymiany przez 14 dni"
        ],
        options: [
          "Tamponada tylna może wywołać odruch nosowo-płucny skutkujący hipowentylacją, hipoksją oraz groźnymi zaburzeniami rytmu serca",
          "Tamponada przednia całkowicie eliminuje jakiekolwiek ryzyko martwicy skrzydełek nosa i przegrody chrzęstnej",
          "Pozostawienie tamponady nosowej powyżej 48 godzin nigdy nie wiąże się z ryzykiem zespołu wstrząsu toksycznego (TSS)",
          "Założenie tamponady tylnej nie wymaga monitorowania kardiologicznego ani pulsoksymetrii u osób w podeszłym wieku",
          "Tamponada nosowa z użyciem setonu gazowego może być bezpiecznie utrzymywana bez wymiany przez 14 dni"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Tamponada tylna podrażnia zakończenia nerwowe w nosogardle, co przez odruch nosowo-płucny (nasopulmonary reflex) może powodować bradykardię, bezdech i ciężką hipoksję.",
        expl: "Tamponada tylna podrażnia zakończenia nerwowe w nosogardle, co przez odruch nosowo-płucny (nasopulmonary reflex) może powodować bradykardię, bezdech i ciężką hipoksję.",
        explanation: "Tamponada tylna podrażnia zakończenia nerwowe w nosogardle, co przez odruch nosowo-płucny (nasopulmonary reflex) może powodować bradykardię, bezdech i ciężką hipoksję."
      },
      {
        id: 6,
        q: "Oceń prawdziwość zdań dotyczących postępowania w krwawieniu z nosa:\nI. Zastosowanie kwasu traneksamowego miejscowo lub dożylnie wspomaga proces hemostazy.\nII. Rutynowe profilaktyczne stosowanie antybiotyków jest zalecane przy utrzymywaniu tamponady nosowej >24–48h.\nIII. Tamponada tylna jest bezwzględnym wskazaniem do hospitalizacji pacjenta.\nIV. Odchylenie głowy pacjenta w tył jest zalecaną metodą ograniczenia krwawienia.",
        question: "Oceń prawdziwość zdań dotyczących postępowania w krwawieniu z nosa:\nI. Zastosowanie kwasu traneksamowego miejscowo lub dożylnie wspomaga proces hemostazy.\nII. Rutynowe profilaktyczne stosowanie antybiotyków jest zalecane przy utrzymywaniu tamponady nosowej >24–48h.\nIII. Tamponada tylna jest bezwzględnym wskazaniem do hospitalizacji pacjenta.\nIV. Odchylenie głowy pacjenta w tył jest zalecaną metodą ograniczenia krwawienia.",
        opts: [
          "Prawdziwe są zdania: I, II, III",
          "Prawdziwe są zdania: I, III, IV",
          "Prawdziwe są zdania: II, III, IV",
          "Prawdziwe są wszystkie zdania (I, II, III, IV)",
          "Prawdziwe są tylko zdania: I oraz IV"
        ],
        options: [
          "Prawdziwe są zdania: I, II, III",
          "Prawdziwe są zdania: I, III, IV",
          "Prawdziwe są zdania: II, III, IV",
          "Prawdziwe są wszystkie zdania (I, II, III, IV)",
          "Prawdziwe są tylko zdania: I oraz IV"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Zdania I, II i III są prawdziwe. Zdanie IV jest fałszywe – odchylanie głowy w tył jest błędem powodującym połykanie i aspirację krwi.",
        expl: "Zdania I, II i III są prawdziwe. Zdanie IV jest fałszywe – odchylanie głowy w tył jest błędem powodującym połykanie i aspirację krwi.",
        explanation: "Zdania I, II i III są prawdziwe. Zdanie IV jest fałszywe – odchylanie głowy w tył jest błędem powodującym połykanie i aspirację krwi."
      },
      {
        id: 7,
        q: "W przypadku nawrotowych, jednostronnych krwawień z nosa u nastoletniego chłopca, którym towarzyszy jednostronna niedrożność nosa, w pierwszej kolejności należy podejrzewać:",
        question: "W przypadku nawrotowych, jednostronnych krwawień z nosa u nastoletniego chłopca, którym towarzyszy jednostronna niedrożność nosa, w pierwszej kolejności należy podejrzewać:",
        opts: [
          "Młodzieńczego naczyniakowłókniaka podstawy czaszki (angiofibroma iuvenile)",
          "Chorobę Rendu-Oslera-Webera (wrodzoną naczyniakowatość krwotoczną)",
          "Ziarniniakowatość z zapaleniem naczyń (dawniej ziarniniak Wegenera)",
          "Obustronne polipy choanalne w przebiegu mukowiscydozy wieku młodzieńczego",
          "Torbiel zębopochodną wrastającą do zatoki szczękowej i przewodu nosowego"
        ],
        options: [
          "Młodzieńczego naczyniakowłókniaka podstawy czaszki (angiofibroma iuvenile)",
          "Chorobę Rendu-Oslera-Webera (wrodzoną naczyniakowatość krwotoczną)",
          "Ziarniniakowatość z zapaleniem naczyń (dawniej ziarniniak Wegenera)",
          "Obustronne polipy choanalne w przebiegu mukowiscydozy wieku młodzieńczego",
          "Torbiel zębopochodną wrastającą do zatoki szczękowej i przewodu nosowego"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Angiofibroma iuvenile to histologicznie łagodny, lecz miejscowo złośliwy guz silnie unaczyniony, występujący niemal wyłącznie u dorastających chłopców i objawiający się krwawieniami i niedrożnością nosa.",
        expl: "Angiofibroma iuvenile to histologicznie łagodny, lecz miejscowo złośliwy guz silnie unaczyniony, występujący niemal wyłącznie u dorastających chłopców i objawiający się krwawieniami i niedrożnością nosa.",
        explanation: "Angiofibroma iuvenile to histologicznie łagodny, lecz miejscowo złośliwy guz silnie unaczyniony, występujący niemal wyłącznie u dorastających chłopców i objawiający się krwawieniami i niedrożnością nosa."
      },
      {
        id: 8,
        q: "U pacjenta przyjmującego warfarynę z powodu mechanicznej zastawki mitralnej, u którego wystąpiło obfite krwawienie z nosa, a INR wynosi 7,2 bez objawów wstrząsu, właściwym postępowaniem jest:",
        question: "U pacjenta przyjmującego warfarynę z powodu mechanicznej zastawki mitralnej, u którego wystąpiło obfite krwawienie z nosa, a INR wynosi 7,2 bez objawów wstrząsu, właściwym postępowaniem jest:",
        opts: [
          "Miejscowe zaopatrzenie hemostatyczne, wstrzymanie warfaryny i podanie koncentratu czynników zespołu protrombiny (PCC) lub małej dawki witaminy K i.v.",
          "Natychmiastowe podanie 20 mg witaminy K w szybkim bolusie dożylnym z całkowitym zaniechaniem tamponady przedniej i tylnej jamy nosowej",
          "Dalsze bezwzględne kontynuowanie dotychczasowej dawki warfaryny ze względu na obecność sztucznej zastawki mechanicznej serca",
          "Przetoczenie 10 jednostek świeżo mrożonego osocza (FFP) bez wstrzymywania warfaryny i bez tamponady miejscowej krwawiącego nosa",
          "Natychmiastowe skierowanie pacjenta w trybie pilnym do ponownej operacji kardiochirurgicznej sztucznej zastawki mitralnej"
        ],
        options: [
          "Miejscowe zaopatrzenie hemostatyczne, wstrzymanie warfaryny i podanie koncentratu czynników zespołu protrombiny (PCC) lub małej dawki witaminy K i.v.",
          "Natychmiastowe podanie 20 mg witaminy K w szybkim bolusie dożylnym z całkowitym zaniechaniem tamponady przedniej i tylnej jamy nosowej",
          "Dalsze bezwzględne kontynuowanie dotychczasowej dawki warfaryny ze względu na obecność sztucznej zastawki mechanicznej serca",
          "Przetoczenie 10 jednostek świeżo mrożonego osocza (FFP) bez wstrzymywania warfaryny i bez tamponady miejscowej krwawiącego nosa",
          "Natychmiastowe skierowanie pacjenta w trybie pilnym do ponownej operacji kardiochirurgicznej sztucznej zastawki mitralnej"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Przy istotnym krwawieniu i wysokim INR u pacjenta ze sztuczną zastawką wstrzymuje się lek, zaopatruje nos tamponadą i podaje PCC lub ostrożnie witaminę K (1-3 mg i.v.), aby uniknąć oporności na antykoagulację po opanowaniu krwotoku.",
        expl: "Przy istotnym krwawieniu i wysokim INR u pacjenta ze sztuczną zastawką wstrzymuje się lek, zaopatruje nos tamponadą i podaje PCC lub ostrożnie witaminę K (1-3 mg i.v.), aby uniknąć oporności na antykoagulację po opanowaniu krwotoku.",
        explanation: "Przy istotnym krwawieniu i wysokim INR u pacjenta ze sztuczną zastawką wstrzymuje się lek, zaopatruje nos tamponadą i podaje PCC lub ostrożnie witaminę K (1-3 mg i.v.), aby uniknąć oporności na antykoagulację po opanowaniu krwotoku."
      },
      {
        id: 9,
        q: "Który z poniższych leków stosowany do koagulacji chemicznej małego naczynka w splocie Kiesselbacha wymaga uprzedniego znieczulenia miejscowego i nie może być stosowany obustronnie w tym samym miejscu przegrody?",
        question: "Który z poniższych leków stosowany do koagulacji chemicznej małego naczynka w splocie Kiesselbacha wymaga uprzedniego znieczulenia miejscowego i nie może być stosowany obustronnie w tym samym miejscu przegrody?",
        opts: [
          "Azotan srebra (lapis) w stężeniu 75–95%",
          "Kwas acetylosalicylowy w roztworze 10%",
          "Glikol propylenowy w aerozolu nosowym",
          "Chlorek potasu w roztworze nasyconym",
          "Dwuwęglan sodu w postaci maści 5%"
        ],
        options: [
          "Azotan srebra (lapis) w stężeniu 75–95%",
          "Kwas acetylosalicylowy w roztworze 10%",
          "Glikol propylenowy w aerozolu nosowym",
          "Chlorek potasu w roztworze nasyconym",
          "Dwuwęglan sodu w postaci maści 5%"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Azotan srebra (AgNO3) służy do przyżegania naczyń. Nie wolno stosować go obustronnie w odpowiadających sobie punktach przegrody nosowej z powodu ryzyka martwicy i jatrogennej perforacji przegrody.",
        expl: "Azotan srebra (AgNO3) służy do przyżegania naczyń. Nie wolno stosować go obustronnie w odpowiadających sobie punktach przegrody nosowej z powodu ryzyka martwicy i jatrogennej perforacji przegrody.",
        explanation: "Azotan srebra (AgNO3) służy do przyżegania naczyń. Nie wolno stosować go obustronnie w odpowiadających sobie punktach przegrody nosowej z powodu ryzyka martwicy i jatrogennej perforacji przegrody."
      },
      {
        id: 10,
        q: "Zgodnie z przepisami prawa medycznego, jeśli przytomny i w pełni zorientowany pacjent z krwawieniem z nosa odmawia hospitalizacji i założenia tamponady tylnej mimo pouczenia o ryzyku wykrwawienia:",
        question: "Zgodnie z przepisami prawa medycznego, jeśli przytomny i w pełni zorientowany pacjent z krwawieniem z nosa odmawia hospitalizacji i założenia tamponady tylnej mimo pouczenia o ryzyku wykrwawienia:",
        opts: [
          "Lekarz ma obowiązek uszanować wolę pacjenta, odebrać pisemne oświadczenie o odmowie i pouczyć o zagrożeniach oraz możliwości natychmiastowego powrotu",
          "Lekarz ma pełne prawo zastosować tamponadę tylną pod przymusem bezpośrednim na podstawie przepisów ustawy o ochronie zdrowia psychicznego",
          "Lekarz ma prawny obowiązek natychmiastowego wezwania funkcjonariuszy Policji w celu obezwładnienia pacjenta i przymusowego zabiegu",
          "Lekarz ma uprawnienie do farmakologicznego uśpienia chorego bez jego zgody, powołując się przed prokuratorem na bezwzględny stan wyższej konieczności",
          "Fakt odmowy leczenia przez pacjenta całkowicie zwalnia personel lekarski z konieczności sporządzenia jakiejkolwiek adnotacji w dokumentacji"
        ],
        options: [
          "Lekarz ma obowiązek uszanować wolę pacjenta, odebrać pisemne oświadczenie o odmowie i pouczyć o zagrożeniach oraz możliwości natychmiastowego powrotu",
          "Lekarz ma pełne prawo zastosować tamponadę tylną pod przymusem bezpośrednim na podstawie przepisów ustawy o ochronie zdrowia psychicznego",
          "Lekarz ma prawny obowiązek natychmiastowego wezwania funkcjonariuszy Policji w celu obezwładnienia pacjenta i przymusowego zabiegu",
          "Lekarz ma uprawnienie do farmakologicznego uśpienia chorego bez jego zgody, powołując się przed prokuratorem na bezwzględny stan wyższej konieczności",
          "Fakt odmowy leczenia przez pacjenta całkowicie zwalnia personel lekarski z konieczności sporządzenia jakiejkolwiek adnotacji w dokumentacji"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Pacjent przytomny i mający pełną zdolność do czynności prawnych ma prawo odmówić leczenia. Lekarz musi poinformować o skutkach odmowy, odnotować to w dokumentacji i uzyskać podpis lub sporządzić adnotację w obecności świadka.",
        expl: "Pacjent przytomny i mający pełną zdolność do czynności prawnych ma prawo odmówić leczenia. Lekarz musi poinformować o skutkach odmowy, odnotować to w dokumentacji i uzyskać podpis lub sporządzić adnotację w obecności świadka.",
        explanation: "Pacjent przytomny i mający pełną zdolność do czynności prawnych ma prawo odmówić leczenia. Lekarz musi poinformować o skutkach odmowy, odnotować to w dokumentacji i uzyskać podpis lub sporządzić adnotację w obecności świadka."
      },
      {
        id: 11,
        q: "Który z poniższych wskaźników hemodynamicznych najszybciej i najbardziej czule wskazuje na rozwijający się wstrząs hipowolemiczny u młodego pacjenta z utajonym krwawieniem tylnym?",
        question: "Który z poniższych wskaźników hemodynamicznych najszybciej i najbardziej czule wskazuje na rozwijający się wstrząs hipowolemiczny u młodego pacjenta z utajonym krwawieniem tylnym?",
        opts: [
          "Wzrost tętna (tachykardia) oraz podwyższenie wskaźnika szoku (Shock Index > 0,9 = HR/RR skurczowe)",
          "Izolowany spadek stężenia hemoglobiny w morfologii krwi pobranej w 5. minucie krwotoku",
          "Gwałtowny spadek hematokrytu poniżej 20% w pierwszej godzinie ostrej utraty krwi",
          "Pojawienie się obrzęków obwodowych podudzi i zastoju żylnego w naczyniach szyjnych",
          "Obniżenie temperatury ciała poniżej 34,0°C bez zmian w częstości akcji serca"
        ],
        options: [
          "Wzrost tętna (tachykardia) oraz podwyższenie wskaźnika szoku (Shock Index > 0,9 = HR/RR skurczowe)",
          "Izolowany spadek stężenia hemoglobiny w morfologii krwi pobranej w 5. minucie krwotoku",
          "Gwałtowny spadek hematokrytu poniżej 20% w pierwszej godzinie ostrej utraty krwi",
          "Pojawienie się obrzęków obwodowych podudzi i zastoju żylnego w naczyniach szyjnych",
          "Obniżenie temperatury ciała poniżej 34,0°C bez zmian w częstości akcji serca"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "We wczesnej fazie krwotoku stężenie Hb i Ht są prawidłowe z powodu braku hemorozcieńczenia. Najwcześniejszym objawem hipowolemii jest tachykardia i wzrost Shock Index (HR/RRskurcz > 0,9).",
        expl: "We wczesnej fazie krwotoku stężenie Hb i Ht są prawidłowe z powodu braku hemorozcieńczenia. Najwcześniejszym objawem hipowolemii jest tachykardia i wzrost Shock Index (HR/RRskurcz > 0,9).",
        explanation: "We wczesnej fazie krwotoku stężenie Hb i Ht są prawidłowe z powodu braku hemorozcieńczenia. Najwcześniejszym objawem hipowolemii jest tachykardia i wzrost Shock Index (HR/RRskurcz > 0,9)."
      }
    ],
    flashcards: [
      {
        q: "Gdzie lokalizuje się splot Kiesselbacha (Little'a) i jaki odsetek krwawień z nosa z niego pochodzi?",
        a: "W przednio-dolnej części przegrody nosowej; odpowiada za >90% krwawień z nosa."
      },
      {
        q: "Jakie naczynie krwionośne jest najczęstszym źródłem masywnego krwawienia z tylnego odcinka nosa?",
        a: "Tętnica klinowo-podniebna (gałąź końcowa tętnicy szczękowej z układu tętnicy szyjnej zewnętrznej)."
      },
      {
        q: "Jaka jest prawidłowa pozycja pacjenta w trakcie tamowania krwawienia z nosa?",
        a: "Pozycja siedząca z głową lekko pochyloną do przodu, z wypluwaniem krwi i uciskiem skrzydełek nosa."
      },
      {
        q: "Dlaczego azotan srebra nie może być aplikowany obustronnie w tym samym miejscu przegrody nosa?",
        a: "Z powodu ryzyka martwicy chrząstki i jatrogennej perforacji przegrody nosowej."
      },
      {
        q: "Jakie jest główne wskazanie do założenia tamponady tylnej (np. Bellocqa lub podwójnego balonu)?",
        a: "Utrzymujące się spływanie krwi po tylnej ścianie gardła mimo prawidłowej tamponady przedniej."
      },
      {
        q: "Jakie groźne powikłanie ogólnoustrojowe może wywołać tamponada tylna u osób starszych?",
        a: "Odruch nosowo-płucny skutkujący hipowentylacją, bradykardią, hipoksją i zaburzeniami rytmu serca."
      }
    ]
  }
];

console.log("Validating Case 166...");
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

run();

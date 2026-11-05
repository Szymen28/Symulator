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
  // CASE 173: Ostre Przedawkowanie Opioidów (Nalokson)
  // =========================================================================
  {
    id: 173,
    file: "173_zatrucie_opioidami_nalokson.json",
    shortTitle: "Zatrucie Opioidami (Nalokson)",
    title: "Toksykologiczny Stan Nagły: Ostre Przedawkowanie Opioidów",
    dept: "Toksykologia / SOR",
    diagnosisTitle: "Ciężkie Zatrucie Opioidami z Zagrażającą Życiu Depresją Oddechową (Triada Opioidowa)",
    vitals: [
      { label: "Ciśnienie tętnicze (RR)", val: "92/56", unit: "mmHg", status: "vital-warn" },
      { label: "Częstość akcji serca (HR)", val: "54", unit: "/min", status: "vital-warn" },
      { label: "Częstość oddechów (RR)", val: "6", unit: "/min", status: "vital-crit" },
      { label: "Saturacja (SpO2)", val: "78", unit: "%", status: "vital-crit" },
      { label: "Temperatura ciała", val: "35.6", unit: "°C", status: "vital-warn" }
    ],
    story: "<p><strong>Pacjent:</strong> 26-letni mężczyzna przywieziony na SOR przez ZRM w stanie głębokiej śpiączki i skrajnej hipowentylacji.</p><p><strong>Wywiad chorobowy:</strong> Pacjent został znaleziony przez pracownika stacji paliw nieprzytomny na podłodze toalety publicznej z widoczną strzykawką obok i zaciśniętą opaską uciskową na lewym ramieniu (podejrzenie dożylnego przyjęcia heroiny skażonej fentanylem). W chwili przybycia ratowników pacjent był siny, nie reagował na ból, a częstość oddechów wynosiła 4–5 na minutę. Ratownicy podjęli natychmiastową wentylację workiem samorozprężalnym z tlenem, uzyskując częściowy wzrost SpO2 do 78%. W wywiadzie zebranym od rodziny: wieloletnie uzależnienie od opioidów, pacjent przed trzema dniami opuścił stacjonarny oddział detoksykacyjny (istotny spadek tolerancji farmakologicznej na opioidy).</p><p><strong>Badanie przedmiotowe:</strong> Pacjent w stanie głębokiej śpiączki (GCS 3: O1V1M1), całkowicie wiotki, brak odruchów obronnych. Skóra chłodna, bladosina, wzdłuż żył odłokciowych obu przedramion obecne liczne linijne blizny i świeże ślady po nakłuciach igłą (tzw. track marks). Oddech skrajnie rzadki, powierzchowny, charczący (RR 6/min). Źrenice obu oczu maksymalnie zwężone, wielkości łebka od szpilki (miosis, ok. 1 mm średnicy), całkowicie sztywne na światło – obecna pełna klasyczna triada opioidowa (śpiączka, depresja oddechowa, szpilkowate źrenice). W osłuchiwaniu płuc: obustronnie nad polami dolnymi słyszalne rzężenia drobnobańkowe (cechy niekardiogennego obrzęku płuc indukowanego opioidami). Gazometria tętnicza: pH 7,12, pCO2 74 mmHg, pO2 48 mmHg, HCO3- 23 mmol/l, sO2 76% (ciężka kwasica oddechowa z hipoksemią).</p>",
    steps: [
      {
        title: "Krok 1: Priorytet resuscytacyjny – natychmiastowe zabezpieczenie wentylacji (ABC)",
        scenario: "Pacjent ma częstość oddechów 6/min, saturację 78% i pCO2 74 mmHg. Rezydent chce natychmiast wstrzyknąć 2 mg naloksonu w szybkim bolusie dożylnym. Jakie powinno być prawidłowe wstępne postępowanie ratunkowe?",
        options: [
          {
            text: "Udrożnienie dróg oddechowych rękoczynem i natychmiastowa skuteczna wentylacja workiem samorozprężalnym ze 100% tlenem PRZED lub równolegle z podaniem naloksonu",
            correct: true,
            isCorrect: true,
            feedback: "✅ PRAWIDŁOWO! Podstawową przyczyną zgonu w przedawkowaniu opioidów jest asfiksja i zatrzymanie krążenia w mechanizmie hipoksji. Podanie naloksonu bez uprzedniego natlenienia może wywołać gwałtowny wyrzut katecholamin na tle hipoksemii, prowadząc do złośliwych arytmii, obrzęku płuc i asystolii!"
          },
          {
            text: "Natychmiastowe podanie 2 mg naloksonu w szybkim bolusie dożylnym z całkowitym zaniechaniem wentylacji workiem samorozprężalnym z tlenem",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Gwałtowne wybudzenie skrajnie niedotlenionego pacjenta dużą dawką wyzwala piorunujący obrzęk płuc, groźne zaburzenia rytmu i agresję."
          },
          {
            text: "Podanie dożylne 1000 mg aminofiliny w celu bezpośredniej stymulacji neuronów pnia mózgu bez użycia tlenu i bez worka samorozprężalnego",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Aminofilina nie odwraca depresji oddechowej wywołanej opioidami i wywołuje drgawki w warunkach głębokiego niedotlenienia."
          },
          {
            text: "Podanie dożylne 500 ml 20% glukozy z 40 jednostkami insuliny krótkodziałającej w celu przyspieszenia usuwania toksyn z układu krążenia",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Mieszanka polaryzująca nie leczy intoksykacji opioidowej i odwraca uwagę personelu od krytycznej niewydolności oddechowej."
          }
        ]
      },
      {
        title: "Krok 2: Miareczkowane podanie naloksonu – optymalna strategia dawkowania",
        scenario: "Pacjent jest skutecznie wentylowany workiem Ambu, saturacja wzrosła do 94%. Jaka jest prawidłowa technika podania naloksonu u osoby uzależnionej od opioidów?",
        options: [
          {
            text: "Podawanie naloksonu w małych dawkach miareczkowanych (0,04–0,1 mg i.v. co 2–3 minuty) do uzyskania wydolnego oddechu własnego (RR >12/min), a nie pełnego wybudzenia",
            correct: true,
            isCorrect: true,
            feedback: "✅ PRAWIDŁOWO! Celem podania naloksonu jest przywrócenie bezpiecznej wentylacji własnej (RR 12–16/min), a nie natychmiastowe przywrócenie pełnej świadomości. Miareczkowanie małych dawek zapobiega wyzwoleniu ostrego zespołu odstawiennego (wymioty z zachłyśnięciem, drgawki, skrajna agresja)."
          },
          {
            text: "Podanie jednorazowo 4 mg naloksonu w szybkim bolusie dożylnym w celu natychmiastowego pionizowania pacjenta na korytarzu oddziału ratunkowego",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Zbyt duża dawka wstrzyknięta w bolusie wywoła gwałtowny zespół abstynencyjny z wymiotami, zachłyśnięciem i ucieczką chorego z oddziału."
          },
          {
            text: "Dojamiste wstrzyknięcie naloksonu w skojarzeniu z alprostadylem w celu przyspieszenia dystrybucji leku w tkankach obwodowych miednicy",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Nalokson podaje się i.v., i.m., s.c. lub donosowo; iniekcje do narządów płciowych są absurdalnym błędem sztuki lekarskiej."
          },
          {
            text: "Podanie naloksonu wyłącznie w postaci doustnych tabletek o zmodyfikowanym uwalnianiu z zaleceniem ich powolnego żucia przez pacjenta",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Pacjent nieprzytomny nie może połykać tabletek (ryzyko aspiracji), a nalokson per os podlega całkowitemu efektowi pierwszego przejścia!"
          }
        ]
      },
      {
        title: "Krok 3: Nadzór ponarkotyczny i ryzyko nawrotu depresji oddechowej",
        scenario: "Po podaniu łącznie 0,2 mg naloksonu pacjent zaczął oddychać z częstością 14/min, odzyskał kontakt logiczny i domaga się natychmiastowego wypisu na własne żądanie (30 minut po podaniu odtrutki). Jakie jest prawidłowe postępowanie lekarza?",
        options: [
          {
            text: "Bezwzględne zatrzymanie pacjenta na SOR i monitorowanie przez minimum 4–6 godzin (lub dłużej przy podejrzeniu syntetycznych opioidów o długim T1/2)",
            correct: true,
            isCorrect: true,
            feedback: "✅ PRAWIDŁOWO! Czas działania naloksonu wynosi zaledwie 30–60 minut, podczas gdy opioidy (fentanyl, metadon, morfina) działają przez wiele godzin. Po zmetabolizowaniu naloksonu pacjent natychmiast ponownie zapada w śpiączkę z bezdechem (tzw. zjawisko re-narkotyzacji), co grozi zgonem poza szpitalem!"
          },
          {
            text: "Zgoda na natychmiastowe opuszczenie szpitala przez pacjenta pod warunkiem podpisania przez niego standardowego druku odmowy leczenia",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Wypisanie pacjenta 30 minut po naloksonie to bezpośrednie narażenie na śmierć – po ustąpieniu działania leku powróci śmiertelny bezdech."
          },
          {
            text: "Podanie pacjentowi 20 mg doustnego metadonu na drogę w celu zapobieżenia wystąpieniu dolegliwości abstynencyjnych w domu",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Podanie kolejnego silnego opioidu zsyntetyzuje dawkę i spowoduje śmiertelną depresję oddechową zaraz po opuszczeniu izby przyjęć."
          },
          {
            text: "Wykonanie natychmiastowej hemodializy ratunkowej w celu całkowitego oczyszczenia osocza z cząsteczek krążącego fentanylu",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Opioidy mają ogromną objętość dystrybucji i wysokie wiązanie z białkami/tkankami – hemodializa jest całkowicie nieskuteczna w ich usuwaniu."
          }
        ]
      }
    ],
    pathoNodes: [
      {
        id: "patho_1",
        title: "Hamowanie ośrodka oddechowego przez receptory mi-opioidowe",
        desc: "Opioidy (morfina, heroina, fentanyl) pobudzają receptory mi (MOR) sprzężone z białkiem Gi w jądrach pnia mózgu (pre-Bötzinger complex). Prowadzi to do spadku cAMP, zamknięcia kanałów wapniowych i otwarcia kanałów potasowych GIRK, znosząc wrażliwość ośrodka oddechowego na hiperkapnię.",
        target: "Swoisty antagonista kompetycyjny receptorów mi (nalokson i.v./i.m./i.n.)"
      },
      {
        id: "patho_2",
        title: "Odhamowanie jądra Edingera-Westphala (szpilkowate źrenice)",
        desc: "Opioidy wybiórczo blokują hamujące interneurony GABA-ergiczne w śródmózgowiu, co powoduje silne toniczne odhamowanie przywspółczulnego jądra Westphala-Edingera nerwu okoruchowego (III) i permanentny, symetryczny skurcz zwieracza źrenicy (miosis punktowa).",
        target: "Miejscowy i ogólny powrót szerokości źrenic pod wpływem naloksonu"
      },
      {
        id: "patho_3",
        title: "Dysproporcja farmakokinetyczna: pułapka ponownej sedacji",
        desc: "Okres półtrwania naloksonu wynosi ok. 30–60 minut. Większość opioidów (np. fentanyl w tkance tłuszczowej, metadon o T1/2 24–36h) utrzymuje się w organizmie znacznie dłużej. Po odłączeniu naloksonu od receptorów następuje ponowna intoksykacja i nawrót zagrażającego bezdechu.",
        target: "Ciągły wlew dożylny naloksonu lub przedłużona obserwacja na SOR (>4–6h)"
      }
    ],
    dutySummary: {
      diagnostics: "1. Ocena drożności dróg oddechowych i wydolności oddechowej (częstość oddechów, pulsoksymetria, kapnometria EtCO2).\n\n2. Rozpoznanie klasycznej triady opioidowej: śpiączka/zaburzenia świadomości (GCS <8), depresja oddechowa (RR <8–10/min), szpilkowate źrenice (miosis <2 mm).\n\n3. Gazometria krwi tętniczej: potwierdzenie ciężkiej hipoksemii i hiperkapnicznej kwasicy oddechowej (pCO2 >60 mmHg, pH <7,20).\n\n4. Badania dodatkowe: stężenie glukozy we krwi (wykluczenie hipoglikemii), kinaza kreatynowa CK (wykluczenie rabdomiolizy z unieruchomienia), EKG (wydłużenie QTc typowe dla metadonu), test toksykologiczny moczu.",
      drugsAndDoses: "• Natlenianie i wentylacja: <span class=\"dose-pill\">100% tlen przez maskę z workiem Ambu</span> z częstością 10–12 oddechów na minutę PRZED podaniem antidotum.\n• Nalokson i.v. (miareczkowany): <span class=\"dose-pill\">0,04–0,1 mg i.v. co 2–3 minuty</span> aż do uzyskania bezpiecznej częstości oddechów (RR >12/min).\n• Nalokson w NZK lub braku dostępu i.v.: <span class=\"dose-pill\">0,4–0,8 mg i.m. lub 2 mg donosowo (aerozol i.n.)</span> powtórzone po 2–3 minutach.\n• Ciągły wlew naloksonu: <span class=\"dose-pill\">2/3 dawki wybudzającej na godzinę w 500 ml 0,9% NaCl</span> przy zatruciach opioidami długodziałającymi (metadon).\n• Tlenoterapia bierna po wybudzeniu: <span class=\"dose-pill\">maska twarzowa z przepływem 4–6 l/min</span> z monitorowaniem SpO2.",
      pitfalls: [
        "Podanie dużej dawki naloksonu (np. 2–4 mg w bolusie) u osoby uzależnionej – wywołuje gwałtowny zespół odstawienny, agresję, wymioty z aspiracją do płuc oraz niekardiogenny obrzęk płuc.",
        "Wypisanie pacjenta ze szpitala zaraz po odzyskaniu przytomności – czas działania naloksonu to tylko 30–60 minut; po jego ustąpieniu chory ponownie traci przytomność i przestaje oddychać.",
        "Zaniechanie natlenienia przed naloksonem – podanie antagonisty w stanie głębokiej hipoksemii może wywołać nagłe zatrzymanie krążenia w mechanizmie migotania komór lub asystolii.",
        "Pominięcie możliwości zatrucia fentanylem u pacjenta ze szpilkowatymi źrenicami, u którego standardowy test paskowy moczu na opiaty daje wynik fałszywie ujemny (fentanyl wymaga dedykowanego testu)."
      ]
    },
    diffTable: {
      title: "⚔️ Tabela Różnicowa: Ostre Zatrucie Opioidami a Inne Stany Śpiączkowe",
      headers: ["Jednostka chorobowa", "Stan źrenic", "Częstość oddechów (RR)", "Odpowiedź na nalokson", "Cechy charakterystyczne"],
      rows: [
        ["Przedawkowanie opioidów", "Szpilkowate (miosis 1 mm), sztywne", "Wybitnie zwolniony (RR <6–8/min, bezdechy)", "SPEKTAKULARNY POWRÓT ODDECHU w 1–3 min", "Ślady po wkłuciach (track marks), obrzęk płuc, hipotermia"],
        ["Przedawkowanie benzodiazepin", "Prawidłowe lub umiarkowanie rozszerzone", "Prawidłowy lub lekko zwolniony (zwykle RR >10)", "CAŁKOWITY BRAK ODPOWIEDZI", "Izolowana ataksja, sedacja, wiotkość; odtrutka: flumazenil"],
        ["Zatrucie klonidyną / moksonidyną", "Zwężone (mogą imitować opioidy)", "Zwolniony (bradykardia, hipotensja)", "Minimalna lub brak trwałej odpowiedzi", "Głęboka bradykardia i hipotensja u dzieci/dorosłych po lekach RR"],
        ["Udar krwotoczny mostu (pień mózgu)", "Szpilkowate, sztywne (uszkodzenie współczulne)", "Zaburzenia toru oddechowego (Cheyne-Stokes/Biot)", "BRAK ODPOWIEDZI na nalokson", "Nagły początek, porażenie czterokończynowe, hipertermia osiowa"],
        ["Ciężka hipoglikemia (<30 mg/dl)", "Rozszerzone, reaktywne", "Prawidłowy lub przyspieszony z tachykardią", "BRAK ODPOWIEDZI na nalokson", "Zlewne poty, drgawki, natychmiastowa reakcja na 20% glukozę"]
      ]
    },
    lekQuestions: [
      {
        id: 1,
        q: "Klasyczną triadę objawów ostrego zatrucia opioidami (triadę opioidową) stanowią:",
        question: "Klasyczną triadę objawów ostrego zatrucia opioidami (triadę opioidową) stanowią:",
        opts: [
          "Głęboka śpiączka (lub depresja OUN), skrajna depresja oddechowa oraz szpilkowate źrenice",
          "Hipertermia osiowa, uogólniona sztywność mięśniowa oraz labilne ciśnienie tętnicze",
          "Szerokie źrenice, tachykardia zatokowa oraz wzmożona perystaltyka z ulewną biegunką",
          "Drżenia pęczkowe mięśni, obfite ślinienie oraz drgawki toniczno-kloniczne",
          "Kwasica metaboliczna z wysoką luką anionową, hipokalcemia oraz anuria"
        ],
        options: [
          "Głęboka śpiączka (lub depresja OUN), skrajna depresja oddechowa oraz szpilkowate źrenice",
          "Hipertermia osiowa, uogólniona sztywność mięśniowa oraz labilne ciśnienie tętnicze",
          "Szerokie źrenice, tachykardia zatokowa oraz wzmożona perystaltyka z ulewną biegunką",
          "Drżenia pęczkowe mięśni, obfite ślinienie oraz drgawki toniczno-kloniczne",
          "Kwasica metaboliczna z wysoką luką anionową, hipokalcemia oraz anuria"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Triada opioidowa to: śpiączka, depresja oddechowa (częstość oddechów <8–10/min, bezdechy) oraz maksymalne zwężenie źrenic (miosis).",
        expl: "Triada opioidowa to: śpiączka, depresja oddechowa (częstość oddechów <8–10/min, bezdechy) oraz maksymalne zwężenie źrenic (miosis).",
        explanation: "Triada opioidowa to: śpiączka, depresja oddechowa (częstość oddechów <8–10/min, bezdechy) oraz maksymalne zwężenie źrenic (miosis)."
      },
      {
        id: 2,
        q: "Głównym celem terapeutycznym podawania naloksonu u pacjenta z przedawkowaniem opioidów jest:",
        question: "Głównym celem terapeutycznym podawania naloksonu u pacjenta z przedawkowaniem opioidów jest:",
        opts: [
          "Przywrócenie wydolnej, bezpiecznej wentylacji własnej przy zachowaniu komfortu chorego",
          "Natychmiastowe przywrócenie pełnej świadomości i orientacji autopsychicznej",
          "Całkowite rozszerzenie źrenic do średnicy przekraczającej 6 milimetrów",
          "Gwałtowne sprowokowanie ostrego zespołu odstawiennego w celach diagnostycznych",
          "Zahamowanie wchłaniania leków z przewodu pokarmowego przez blokadę perystaltyki"
        ],
        options: [
          "Przywrócenie wydolnej, bezpiecznej wentylacji własnej przy zachowaniu komfortu chorego",
          "Natychmiastowe przywrócenie pełnej świadomości i orientacji autopsychicznej",
          "Całkowite rozszerzenie źrenic do średnicy przekraczającej 6 milimetrów",
          "Gwałtowne sprowokowanie ostrego zespołu odstawiennego w celach diagnostycznych",
          "Zahamowanie wchłaniania leków z przewodu pokarmowego przez blokadę perystaltyki"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Celem leczenia naloksonem jest przywrócenie wydolnego oddechu (RR >12/min) i prawidłowego natlenienia, a NIE gwałtowne wybudzenie pacjenta.",
        expl: "Celem leczenia naloksonem jest przywrócenie wydolnego oddechu (RR >12/min) i prawidłowego natlenienia, a NIE gwałtowne wybudzenie pacjenta.",
        explanation: "Celem leczenia naloksonem jest przywrócenie wydolnego oddechu (RR >12/min) i prawidłowego natlenienia, a NIE gwałtowne wybudzenie pacjenta."
      },
      {
        id: 3,
        q: "Dlaczego po pomyślnym wyprowadzeniu pacjenta z zagrażającej życiu depresji oddechowej naloksonem konieczna jest kilkugodzinna obserwacja na SOR?",
        question: "Dlaczego po pomyślnym wyprowadzeniu pacjenta z zagrażającej życiu depresji oddechowej naloksonem konieczna jest kilkugodzinna obserwacja na SOR?",
        opts: [
          "Ponieważ okres półtrwania naloksonu (30–60 min) jest znacznie krótszy niż większości opioidów, co grozi ponownym zgonem z bezdechu",
          "Ponieważ nalokson po 2 godzinach ulega przemianie biochemicznej do aktywnego agonisty receptorów opioidowych w komórkach wątroby",
          "W celu wykonania rutynowej pełnej inwazyjnej diagnostyki kardiologicznej z cewnikowaniem lewej komory serca na sali hybrydowej",
          "Z uwagi na bezwzględny wymóg prawny nakazujący 48-godzinną kwarantannę sanitarno-epidemiologiczną dla wszystkich osób uzależnionych",
          "Ponieważ u każdego chorego po podaniu naloksonu rozwija się ostra martwica kory nadnerczy wymagająca dożylnej substytucji sterydowej"
        ],
        options: [
          "Ponieważ okres półtrwania naloksonu (30–60 min) jest znacznie krótszy niż większości opioidów, co grozi ponownym zgonem z bezdechu",
          "Ponieważ nalokson po 2 godzinach ulega przemianie biochemicznej do aktywnego agonisty receptorów opioidowych w komórkach wątroby",
          "W celu wykonania rutynowej pełnej inwazyjnej diagnostyki kardiologicznej z cewnikowaniem lewej komory serca na sali hybrydowej",
          "Z uwagi na bezwzględny wymóg prawny nakazujący 48-godzinną kwarantannę sanitarno-epidemiologiczną dla wszystkich osób uzależnionych",
          "Ponieważ u każdego chorego po podaniu naloksonu rozwija się ostra martwica kory nadnerczy wymagająca dożylnej substytucji sterydowej"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Nalokson działa zaledwie 30–60 minut. Opioidy działają od kilku (morfina, heroina) do kilkudziesięciu godzin (metadon, fentanyl), co wywołuje zjawisko powtórnej narkozy po wyjściu ze szpitala.",
        expl: "Nalokson działa zaledwie 30–60 minut. Opioidy działają od kilku (morfina, heroina) do kilkudziesięciu godzin (metadon, fentanyl), co wywołuje zjawisko powtórnej narkozy po wyjściu ze szpitala.",
        explanation: "Nalokson działa zaledwie 30–60 minut. Opioidy działają od kilku (morfina, heroina) do kilkudziesięciu godzin (metadon, fentanyl), co wywołuje zjawisko powtórnej narkozy po wyjściu ze szpitala."
      },
      {
        id: 4,
        q: "Który z poniższych leków opioidowych w przypadku ostrego przedawkowania może wyjątkowo NIE powodować zwężenia źrenic, lecz ich poszerzenie (mydriasis)?",
        question: "Który z poniższych leków opioidowych w przypadku ostrego przedawkowania może wyjątkowo NIE powodować zwężenia źrenic, lecz ich poszerzenie (mydriasis)?",
        opts: [
          "Petydyna (meperydyna – ze względu na współistniejące działanie cholinolityczne)",
          "Siarczan morfiny podawany doustnie w tabletkach o zmodyfikowanym uwalnianiu",
          "Fentanyl aplikowany w postaci przezskórnych systemów transdermalnych",
          "Oksykodon stosowany w połączeniu z naloksonem w terapii bólu przewlekłego",
          "Metadon podawany w programie leczenia substytucyjnego uzależnień"
        ],
        options: [
          "Petydyna (meperydyna – ze względu na współistniejące działanie cholinolityczne)",
          "Siarczan morfiny podawany doustnie w tabletkach o zmodyfikowanym uwalnianiu",
          "Fentanyl aplikowany w postaci przezskórnych systemów transdermalnych",
          "Oksykodon stosowany w połączeniu z naloksonem w terapii bólu przewlekłego",
          "Metadon podawany w programie leczenia substytucyjnego uzależnień"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Petydyna (meperydyna) posiada strukturę zbliżoną do atropiny i wywiera działanie cholinolityczne, dlatego w jej przedawkowaniu źrenice mogą być rozszerzone lub prawidłowe.",
        expl: "Petydyna (meperydyna) posiada strukturę zbliżoną do atropiny i wywiera działanie cholinolityczne, dlatego w jej przedawkowaniu źrenice mogą być rozszerzone lub prawidłowe.",
        explanation: "Petydyna (meperydyna) posiada strukturę zbliżoną do atropiny i wywiera działanie cholinolityczne, dlatego w jej przedawkowaniu źrenice mogą być rozszerzone lub prawidłowe."
      },
      {
        id: 5,
        q: "Zastosowanie zbyt dużej dawki początkowej naloksonu (np. 2 mg i.v. w bolusie) u osoby uzależnionej od opioidów wiąże się z ryzykiem:",
        question: "Zastosowanie zbyt dużej dawki początkowej naloksonu (np. 2 mg i.v. w bolusie) u osoby uzależnionej od opioidów wiąże się z ryzykiem:",
        opts: [
          "Piorunującego zespołu odstawiennego z pobudzeniem, wymiotami, aspiracją i niekardiogennym obrzękiem płuc",
          "Gwałtownej hipotermii z obniżeniem temperatury głębokiej ciała poniżej 28 stopni Celsjusza",
          "Masywnego krwawienia z przewodu pokarmowego w mechanizmie ostrej fibrynolizy",
          "Rozwoju trwałego bloku przedsionkowo-komorowego trzeciego stopnia z asystolią",
          "Pojawienia się zespołu ostrego rozpadu mięśni poprzecznie prążkowanych z mioglobinurią"
        ],
        options: [
          "Piorunującego zespołu odstawiennego z pobudzeniem, wymiotami, aspiracją i niekardiogennym obrzękiem płuc",
          "Gwałtownej hipotermii z obniżeniem temperatury głębokiej ciała poniżej 28 stopni Celsjusza",
          "Masywnego krwawienia z przewodu pokarmowego w mechanizmie ostrej fibrynolizy",
          "Rozwoju trwałego bloku przedsionkowo-komorowego trzeciego stopnia z asystolią",
          "Pojawienia się zespołu ostrego rozpadu mięśni poprzecznie prążkowanych z mioglobinurią"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Duża dawka wyzwala ostry zespół abstynencyjny i masywny wyrzut katecholamin, co prowadzi do gwałtownego wzrostu ciśnienia, arytmii, obrzęku płuc oraz wymiotów z zachłyśnięciem.",
        expl: "Duża dawka wyzwala ostry zespół abstynencyjny i masywny wyrzut katecholamin, co prowadzi do gwałtownego wzrostu ciśnienia, arytmii, obrzęku płuc oraz wymiotów z zachłyśnięciem.",
        explanation: "Duża dawka wyzwala ostry zespół abstynencyjny i masywny wyrzut katecholamin, co prowadzi do gwałtownego wzrostu ciśnienia, arytmii, obrzęku płuc oraz wymiotów z zachłyśnięciem."
      },
      {
        id: 6,
        q: "Oceń prawdziwość zdań dotyczących przedawkowania opioidów:\nI. Standardowe testy moczu na opiaty mogą dawać wynik fałszywie ujemny w zatruciu fentanylem.\nII. Wentylacja ze 100% tlenem powinna poprzedzać podanie naloksonu u niedotlenionego chorego.\nIII. Nalokson podany doustnie wchłania się całkowicie i wykazuje 100% biodostępność ogólnoustrojową.\nIV. Niekardiogenny obrzęk płuc może być powikłaniem zarówno ciężkiego zatrucia, jak i zbyt szybkiego podania naloksonu.",
        question: "Oceń prawdziwość zdań dotyczących przedawkowania opioidów:\nI. Standardowe testy moczu na opiaty mogą dawać wynik fałszywie ujemny w zatruciu fentanylem.\nII. Wentylacja ze 100% tlenem powinna poprzedzać podanie naloksonu u niedotlenionego chorego.\nIII. Nalokson podany doustnie wchłania się całkowicie i wykazuje 100% biodostępność ogólnoustrojową.\nIV. Niekardiogenny obrzęk płuc może być powikłaniem zarówno ciężkiego zatrucia, jak i zbyt szybkiego podania naloksonu.",
        opts: [
          "Prawdziwe są zdania: I, II oraz IV",
          "Prawdziwe są zdania: I, III oraz IV",
          "Prawdziwe są zdania: II, III oraz IV",
          "Prawdziwe są zdania: I, II, III oraz IV",
          "Prawdziwe są wyłącznie zdania: I oraz II"
        ],
        options: [
          "Prawdziwe są zdania: I, II oraz IV",
          "Prawdziwe są zdania: I, III oraz IV",
          "Prawdziwe są zdania: II, III oraz IV",
          "Prawdziwe są zdania: I, II, III oraz IV",
          "Prawdziwe są wyłącznie zdania: I oraz II"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Zdania I, II i IV są prawdziwe. Zdanie III jest fałszywe – nalokson po podaniu doustnym podlega niemal 100% metabolizmowi pierwszego przejścia w wątrobie (biodostępność <2%).",
        expl: "Zdania I, II i IV są prawdziwe. Zdanie III jest fałszywe – nalokson po podaniu doustnym podlega niemal 100% metabolizmowi pierwszego przejścia w wątrobie (biodostępność <2%).",
        explanation: "Zdania I, II i IV są prawdziwe. Zdanie III jest fałszywe – nalokson po podaniu doustnym podlega niemal 100% metabolizmowi pierwszego przejścia w wątrobie (biodostępność <2%)."
      },
      {
        id: 7,
        q: "U pacjenta z przedawkowaniem metadonu, u którego po miareczkowaniu naloksonu powrócił wydolny oddech, optymalnym schematem zapobiegania ponownej depresji oddechowej jest:",
        question: "U pacjenta z przedawkowaniem metadonu, u którego po miareczkowaniu naloksonu powrócił wydolny oddech, optymalnym schematem zapobiegania ponownej depresji oddechowej jest:",
        opts: [
          "Ciągły wlew dożylny naloksonu w dawce odpowiadającej około 2/3 dawki skutecznej wybudzającej na godzinę we wlewie",
          "Podanie pojedynczej doustnej dawki naltreksonu w dawce 50 mg na czczo w celu przedłużonej blokady receptorowej",
          "Zastosowanie jednorazowej dawki domięśniowej flumazenilu w ilości 1 mg w połączeniu z atropiną siarczanem",
          "Wdrożenie forsownej diurezy alkalicznej wodorowęglanem sodu przez 48 godzin bez dalszego podawania naloksonu",
          "Podanie dożylne 10 gramów węgla aktywowanego bezpośrednio do żyły centralnej w celu adsorpcji cząsteczek metadonu"
        ],
        options: [
          "Ciągły wlew dożylny naloksonu w dawce odpowiadającej około 2/3 dawki skutecznej wybudzającej na godzinę we wlewie",
          "Podanie pojedynczej doustnej dawki naltreksonu w dawce 50 mg na czczo w celu przedłużonej blokady receptorowej",
          "Zastosowanie jednorazowej dawki domięśniowej flumazenilu w ilości 1 mg w połączeniu z atropiną siarczanem",
          "Wdrożenie forsownej diurezy alkalicznej wodorowęglanem sodu przez 48 godzin bez dalszego podawania naloksonu",
          "Podanie dożylne 10 gramów węgla aktywowanego bezpośrednio do żyły centralnej w celu adsorpcji cząsteczek metadonu"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "W przypadku opioidów długodziałających (np. metadon) standardem jest ciągły wlew dożylny naloksonu (2/3 skutecznej dawki bolusa na godzinę) z miareczkowaniem do parametrów oddechowych.",
        expl: "W przypadku opioidów długodziałających (np. metadon) standardem jest ciągły wlew dożylny naloksonu (2/3 skutecznej dawki bolusa na godzinę) z miareczkowaniem do parametrów oddechowych.",
        explanation: "W przypadku opioidów długodziałających (np. metadon) standardem jest ciągły wlew dożylny naloksonu (2/3 skutecznej dawki bolusa na godzinę) z miareczkowaniem do parametrów oddechowych."
      },
      {
        id: 8,
        q: "W jaki sposób nalokson może być podany w warunkach przedszpitalnych przez świadków zdarzenia lub służby ratownicze przy braku dostępu naczyniowego?",
        question: "W jaki sposób nalokson może być podany w warunkach przedszpitalnych przez świadków zdarzenia lub służby ratownicze przy braku dostępu naczyniowego?",
        opts: [
          "Donosowo w postaci gotowego aerozolu (spray i.n.) lub domięśniowo za pomocą autowstrzykiwacza",
          "Doodbytniczo w postaci wlewki doodbytniczej w połączeniu ze środkami zmiękczającymi stolec",
          "Wziewnie za pomocą nebulizatora pneumatycznego przez szczelną silikonową maskę krtaniową",
          "Podjęzykowo w postaci proszku do powolnego rozpuszczania na błonie śluzowej jamy ustnej",
          "Dosercowo za pomocą długiej igły punkcyjnej przez czwartą przestrzeń międzyżebrową mostka"
        ],
        options: [
          "Donosowo w postaci gotowego aerozolu (spray i.n.) lub domięśniowo za pomocą autowstrzykiwacza",
          "Doodbytniczo w postaci wlewki doodbytniczej w połączeniu ze środkami zmiękczającymi stolec",
          "Wziewnie za pomocą nebulizatora pneumatycznego przez szczelną silikonową maskę krtaniową",
          "Podjęzykowo w postaci proszku do powolnego rozpuszczania na błonie śluzowej jamy ustnej",
          "Dosercowo za pomocą długiej igły punkcyjnej przez czwartą przestrzeń międzyżebrową mostka"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Nalokson w warunkach pierwszej pomocy i ratownictwa może być podawany donosowo (aerozol donosowy – wysokie wchłanianie przez bogato unaczynioną śluzówkę) lub domięśniowo (autostrzykawka).",
        expl: "Nalokson w warunkach pierwszej pomocy i ratownictwa może być podawany donosowo (aerozol donosowy – wysokie wchłanianie przez bogato unaczynioną śluzówkę) lub domięśniowo (autostrzykawka).",
        explanation: "Nalokson w warunkach pierwszej pomocy i ratownictwa może być podawany donosowo (aerozol donosowy – wysokie wchłanianie przez bogato unaczynioną śluzówkę) lub domięśniowo (autostrzykawka)."
      },
      {
        id: 9,
        q: "Który z poniższych objawów NIE należy do klasycznego ostrego zespołu odstawiennego (zespołu abstynencyjnego) po gwałtownym zablokowaniu receptorów opioidowych naloksonem?",
        question: "Który z poniższych objawów NIE należy do klasycznego ostrego zespołu odstawiennego (zespołu abstynencyjnego) po gwałtownym zablokowaniu receptorów opioidowych naloksonem?",
        opts: [
          "Szpilkowate zwężenie źrenic połączone z ciężkim zaparciem atonicznym i bradykardią",
          "Zlewne poty, gęsia skórka (piloerekcja) oraz rozszerzenie źrenic (mydriasis)",
          "Gwałtowne nudności, wymioty, kurczowe bóle brzucha oraz obfita biegunka",
          "Tachykardia zatokowa ze skokiem ciśnienia tętniczego i silnym niepokojem",
          "Uogólnione bóle mięśniowo-stawowe, ziewanie oraz wyciek wodnisty z nosa"
        ],
        options: [
          "Szpilkowate zwężenie źrenic połączone z ciężkim zaparciem atonicznym i bradykardią",
          "Zlewne poty, gęsia skórka (piloerekcja) oraz rozszerzenie źrenic (mydriasis)",
          "Gwałtowne nudności, wymioty, kurczowe bóle brzucha oraz obfita biegunka",
          "Tachykardia zatokowa ze skokiem ciśnienia tętniczego i silnym niepokojem",
          "Uogólnione bóle mięśniowo-stawowe, ziewanie oraz wyciek wodnisty z nosa"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Szpilkowate źrenice i zaparcie to objawy działania agonistycznego opioidów. Zespół odstawienny charakteryzuje się rozszerzeniem źrenic (mydriasis), biegunką, potami, piloerekcją i pobudzeniem sympatycznym.",
        expl: "Szpilkowate źrenice i zaparcie to objawy działania agonistycznego opioidów. Zespół odstawienny charakteryzuje się rozszerzeniem źrenic (mydriasis), biegunką, potami, piloerekcją i pobudzeniem sympatycznym.",
        explanation: "Szpilkowate źrenice i zaparcie to objawy działania agonistycznego opioidów. Zespół odstawienny charakteryzuje się rozszerzeniem źrenic (mydriasis), biegunką, potami, piloerekcją i pobudzeniem sympatycznym."
      },
      {
        id: 10,
        q: "Zgodnie z przepisami prawa medycznego, jeżeli przytomny pacjent po podaniu naloksonu odmawia dalszej hospitalizacji przed upływem bezpiecznego czasu obserwacji:",
        question: "Zgodnie z przepisami prawa medycznego, jeżeli przytomny pacjent po podaniu naloksonu odmawia dalszej hospitalizacji przed upływem bezpiecznego czasu obserwacji:",
        opts: [
          "Lekarz ma obowiązek ocenić zdolność pacjenta do świadomego wyrażenia woli; jeśli pacjent jest w pełni świadomy, należy odebrać pisemne oświadczenie po uprzedzeniu o ryzyku zgonu",
          "Lekarz ma bezwzględne prawo fizycznie przywiązać pacjenta pasami obezwładniającymi na 24 godziny bez względu na jego aktualny stan psychiczny i zachowanie kontaktu logicznego",
          "Lekarz ma prawny obowiązek natychmiastowego wezwania Policji w celu aresztowania pacjenta pod zarzutem posiadania nielegalnych substancji odurzających w swoim organizmie",
          "Sam fakt uzależnienia od narkotyków automatycznie skutkuje natychmiastowym ubezwłasnowolnieniem chorego z mocy samego prawa bez konieczności jakichkolwiek orzeczeń sądowych",
          "Personel medyczny może bez żadnych konsekwencji prawnych odmówić choremu wydania karty informacyjnej leczenia szpitalnego oraz recept na leki niezbędne do życia"
        ],
        options: [
          "Lekarz ma obowiązek ocenić zdolność pacjenta do świadomego wyrażenia woli; jeśli pacjent jest w pełni świadomy, należy odebrać pisemne oświadczenie po uprzedzeniu o ryzyku zgonu",
          "Lekarz ma bezwzględne prawo fizycznie przywiązać pacjenta pasami obezwładniającymi na 24 godziny bez względu na jego aktualny stan psychiczny i zachowanie kontaktu logicznego",
          "Lekarz ma prawny obowiązek natychmiastowego wezwania Policji w celu aresztowania pacjenta pod zarzutem posiadania nielegalnych substancji odurzających w swoim organizmie",
          "Sam fakt uzależnienia od narkotyków automatycznie skutkuje natychmiastowym ubezwłasnowolnieniem chorego z mocy samego prawa bez konieczności jakichkolwiek orzeczeń sądowych",
          "Personel medyczny może bez żadnych konsekwencji prawnych odmówić choremu wydania karty informacyjnej leczenia szpitalnego oraz recept na leki niezbędne do życia"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Pacjent przytomny i w pełni zorientowany ma prawo odmówić leczenia. Lekarz musi ocenić zdolność do testowania rzeczywistości, dokładnie wyjaśnić śmiertelne ryzyko re-sedacji i udokumentować odmowę.",
        expl: "Pacjent przytomny i w pełni zorientowany ma prawo odmówić leczenia. Lekarz musi ocenić zdolność do testowania rzeczywistości, dokładnie wyjaśnić śmiertelne ryzyko re-sedacji i udokumentować odmowę.",
        explanation: "Pacjent przytomny i w pełni zorientowany ma prawo odmówić leczenia. Lekarz musi ocenić zdolność do testowania rzeczywistości, dokładnie wyjaśnić śmiertelne ryzyko re-sedacji i udokumentować odmowę."
      },
      {
        id: 11,
        q: "U pacjenta zatrutego fentanylem w wywiadzie, u którego standardowa dawka 0,4 mg naloksonu nie przyniosła poprawy wentylacji, właściwym postępowaniem jest:",
        question: "U pacjenta zatrutego fentanylem w wywiadzie, u którego standardowa dawka 0,4 mg naloksonu nie przyniosła poprawy wentylacji, właściwym postępowaniem jest:",
        opts: [
          "Kontynuacja skutecznej wentylacji workiem Ambu i podawanie rosnących dawek naloksonu (do 2–10 mg i.v.), ponieważ pochodne fentanylu wymagają wyższych dawek odtrutki",
          "Natychmiastowe zaniechanie wentylacji i podanie dożylne 100 mg flumazenilu w skojarzeniu z fizostygminą w celu odwrócenia rzekomego bloku cholinergicznego w mózgu",
          "Stwierdzenie nieodwracalnej śmierci mózgu i natychmiastowe odstąpienie od dalszych czynności medycznych z powodu braku reakcji na standardową dawkę odtrutki",
          "Podanie dożylne 40 mg furosemidu w bolusie w celu wymuszenia nerkowego wydalania lipofilnych cząsteczek syntetycznego opioidu bez prowadzenia sztucznej wentylacji",
          "Zastosowanie głębokiej hipotermii terapeutycznej do temperatury 32 stopni Celsjusza jako jedynej udowodnionej metody leczenia zatrucia pochodnymi fentanylu"
        ],
        options: [
          "Kontynuacja skutecznej wentylacji workiem Ambu i podawanie rosnących dawek naloksonu (do 2–10 mg i.v.), ponieważ pochodne fentanylu wymagają wyższych dawek odtrutki",
          "Natychmiastowe zaniechanie wentylacji i podanie dożylne 100 mg flumazenilu w skojarzeniu z fizostygminą w celu odwrócenia rzekomego bloku cholinergicznego w mózgu",
          "Stwierdzenie nieodwracalnej śmierci mózgu i natychmiastowe odstąpienie od dalszych czynności medycznych z powodu braku reakcji na standardową dawkę odtrutki",
          "Podanie dożylne 40 mg furosemidu w bolusie w celu wymuszenia nerkowego wydalania lipofilnych cząsteczek syntetycznego opioidu bez prowadzenia sztucznej wentylacji",
          "Zastosowanie głębokiej hipotermii terapeutycznej do temperatury 32 stopni Celsjusza jako jedynej udowodnionej metody leczenia zatrucia pochodnymi fentanylu"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Syntetyczne opioidy o wysokim powinowactwie do MOR (np. fentanyl, sufentanyl, karfentanyl) wymagają znacznie wyższych dawek naloksonu (nawet do 10 mg i.v.) przy ciągłej sztucznej wentylacji.",
        expl: "Syntetyczne opioidy o wysokim powinowactwie do MOR (np. fentanyl, sufentanyl, karfentanyl) wymagają znacznie wyższych dawek naloksonu (nawet do 10 mg i.v.) przy ciągłej sztucznej wentylacji.",
        explanation: "Syntetyczne opioidy o wysokim powinowactwie do MOR (np. fentanyl, sufentanyl, karfentanyl) wymagają znacznie wyższych dawek naloksonu (nawet do 10 mg i.v.) przy ciągłej sztucznej wentylacji."
      }
    ],
    flashcards: [
      {
        q: "Jakie objawy tworzą klasyczną triadę opioidową w ostrym zatruciu?",
        a: "Głęboka śpiączka (depresja OUN), skrajna depresja oddechowa (RR <8/min, bezdech) oraz szpilkowate źrenice (miosis)."
      },
      {
        q: "Co jest bezwzględnym priorytetem przed podaniem naloksonu u niedotlenionego chorego?",
        a: "Skuteczna wentylacja workiem samorozprężalnym z tlenem (zapobieganie NZK w asystolii i obrzękowi płuc)."
      },
      {
        q: "Jaki jest cel dawkowania naloksonu w zatruciu opioidami?",
        a: "Przywrócenie wydolnej wentylacji własnej (RR >12/min), a nie natychmiastowe wybudzenie do pełnej przytomności."
      },
      {
        q: "Dlaczego pacjent po podaniu naloksonu musi pozostać na SOR na obserwacji?",
        a: "Czas działania naloksonu (30–60 min) jest znacznie krótszy niż opioidów, co grozi ponownym śmiertelnym bezdechem."
      },
      {
        q: "Który opioid w przedawkowaniu może wyjątkowo nie powodować zwężenia źrenic?",
        a: "Petydyna (meperydyna) – ze względu na współistniejące działanie cholinolityczne (atropinopodobne)."
      },
      {
        q: "Jakie drogi podania naloksonu są zalecane w przedszpitalu przy braku dostępu żylnego?",
        a: "Aerozol donosowy (spray i.n.) lub iniekcja domięśniowa (i.m.) za pomocą autostrzykawki."
      }
    ]
  },
  // =========================================================================
  // CASE 174: Złośliwy Zespół Neuroleptyczny (NMS)
  // =========================================================================
  {
    id: 174,
    file: "174_zlosliwy_zespol_neuroleptyczny_nms.json",
    shortTitle: "Złośliwy Zespół Neuroleptyczny",
    title: "Psychiatryczno-Toksykologiczny Stan Nagły: Złośliwy Zespół Neuroleptyczny (NMS)",
    dept: "Psychiatria / SOR / OIT",
    diagnosisTitle: "Złośliwy Zespół Neuroleptyczny Powikłany Ciężką Rabdomiolizą i Hipertermią Osiową",
    vitals: [
      { label: "Ciśnienie tętnicze (RR)", val: "176/106", unit: "mmHg", status: "vital-crit" },
      { label: "Częstość akcji serca (HR)", val: "134", unit: "/min", status: "vital-crit" },
      { label: "Częstość oddechów (RR)", val: "24", unit: "/min", status: "vital-warn" },
      { label: "Saturacja (SpO2)", val: "96", unit: "%", status: "vital-ok" },
      { label: "Temperatura ciała", val: "40.4", unit: "°C", status: "vital-crit" }
    ],
    story: "<p><strong>Pacjent:</strong> 34-letni mężczyzna leczony z powodu schizofrenii paranoidalnej przywieziony na SOR z oddziału psychiatrycznego z powodu nagłego załamania stanu ogólnego, sztywności mięśni i gorączki 40,4°C.</p><p><strong>Wywiad chorobowy:</strong> Pacjent 4 dni temu miał modyfikowaną farmakoterapię z powodu nasilenia omamów słuchowych i agresji – zwiększono dawkę haloperidolu do 15 mg/d i dołączono chlorpromazynę w iniekcjach domięśniowych. Od wczoraj pacjent stał się apatyczny, mutystyczny, przestał przyjmować posiłki i płyny, wystąpiły obfite zlewne poty i tachykardia. Dzisiaj rano personel pielęgniarski zastał pacjenta w stanie bezkontaktu z uogólnioną, deskowatą sztywnością całego ciała i hipertermią sięgającą 40,4°C mierzoną w odbycie. W wywiadzie brak infekcji dróg oddechowych lub moczowych.</p><p><strong>Badanie przedmiotowe:</strong> Pacjent w stanie mutyzmu akinetycznego (leży z otwartymi oczami, nie nawiązuje kontaktu wzrokowego ani słownego, nie spełnia poleceń). Skóra rozpalona, lepka, zlana obfitym potem, widoczne marmurkowanie powłok. Wybitnie wzmożone napięcie mięśniowe – uogólniona, symetryczna sztywność plastyczna typu 'rury ołowianej' (lead-pipe rigidity) oraz objaw koła zębatego w stawach łokciowych i kolanowych. Odruchy ścięgniste są symetrycznie osłabione lub prawidłowe; brak klonusów stóp i brak drżeń gałek ocznych (cecha wybitnie różnicująca z zespołem serotoninowym!). Źrenice równe, leniwe. Tachykardia 134/min, ciśnienie tętnicze wybitnie chwiejne (wahania od 135/85 do 185/110 mmHg). Badania laboratoryjne: kinaza kreatynowa (CK) wybitnie podwyższona: 36 000 IU/l (norma <190), mioglobina w surowicy 4200 ng/ml, leukocytoza 23 500/ul bez cech infekcji bakteryjnej, kreatynina 2,6 mg/dl (ostre uszkodzenie nerek w przebiegu mioglobinurii), potas 5,6 mmol/l.</p>",
    steps: [
      {
        title: "Krok 1: Natychmiastowe odstawienie neuroleptyku i agresywne chłodzenie",
        scenario: "Pacjent ma temperaturę ciała 40,4°C, sztywność rury ołowianej i CK 36 000 IU/l. Jakie jest bezwzględne, natychmiastowe postępowanie pierwszego rzutu?",
        options: [
          {
            text: "Natychmiastowe i bezwzględne odstawienie haloperidolu i wszelkich leków przeciwpsychotycznych, agresywne chłodzenie fizykalne powłok ciała oraz obfita płynoterapia dożylna krystaloidami",
            correct: true,
            isCorrect: true,
            feedback: "✅ PRAWIDŁOWO! Podstawą ratowania chorego z NMS jest natychmiastowe zaprzestanie podawania neuroleptyków, obniżenie temperatury osiowej (chłodne okłady, pachy, pachwiny, schłodzone płyny i.v.) oraz płynoterapia (3–6 litrów/dobę) w celu forsowania diurezy i ochrony nerek przed ostrą martwicą cewek wywołaną mioglobiną."
          },
          {
            text: "Zwiększenie dawki haloperidolu do 30 mg dożylnie w celu natychmiastowego opanowania postępującego pobudzenia katatonicznego u chorego",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Zwiększenie dawki neuroleptyku w NMS jest błędem śmiertelnym – pogłębia blokadę receptorów D2 i doprowadzi do zgonu w zapaści krążeniowej!"
          },
          {
            text: "Podanie dożylne 1000 mg kwasu acetylosalicylowego jako leku pierwszego wyboru w obniżaniu temperatury w złośliwym zespole neuroleptycznym",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Klasyczne leki przeciwgorączkowe (paracetamol, NLPZ) są całkowicie nieskuteczne w NMS, ponieważ hipertermia wynika z pracy mięśni, a nie z prostaglandyn podwzgórza."
          },
          {
            text: "Zalecenie owinięcia pacjenta grubymi kocami wełnianymi w celu wywołania obfitych potów oczyszczających organizm z toksyn lekowych",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Przegrzewanie pacjenta z temperaturą 40,4°C doprowadzi do denaturacji białek tkankowych, obrzęku mózgu i nieodwracalnego zatrzymania krążenia."
          }
        ]
      },
      {
        title: "Krok 2: Swoista farmakoterapia celowana – zwiotczenie miocytów i stymulacja D2",
        scenario: "Mimo chłodzenia fizykalnego sztywność mięśniowa i hipertermia utrzymują się. Jaki zestaw leków celowanych stanowi farmakoterapię pierwszego wyboru w umiarkowanym i ciężkim NMS?",
        options: [
          {
            text: "Podanie dożylne dantrolenu (1–2,5 mg/kg i.v.) w celu zablokowania uwalniania wapnia w mięśniach oraz wdrożenie agonisty dopaminy (bromokryptyna lub amantadyna)",
            correct: true,
            isCorrect: true,
            feedback: "✅ PRAWIDŁOWO! Dantrolen bezpośrednio blokuje receptory rianodynowe (RyR1) w siateczce sarkoplazmatycznej miocytów, przerywając skurcz mięśni i generowanie ciepła. Bromokryptyna (lub amantadyna) działa agonistycznie na zablokowane receptory dopaminowe D2 w podwzgórzu i prążkowiu, przywracając homeostazę termoregulacyjną."
          },
          {
            text: "Podanie dożylne sukcynylocholiny w dawce 2 mg/kg w celu natychmiastowego zwiotczenia mięśni szkieletowych przed intubacją dotchawiczą",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Sukcynylocholina (depolaryzujący lek zwiotczający) jest BEZWZGLĘDNIE PRZECIWWSKAZANA – w rabdomiolizie wyzwala piorunującą hiperkaliemię i asystolię!"
          },
          {
            text: "Wdrożenie leczenia biologicznego przeciwciałami monoklonalnymi anty-TNF w jednorazowym wlewie kroplowym trwającym 4 godziny",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Leki anty-TNF nie mają żadnego zastosowania w złośliwym zespole neuroleptycznym i nie wpływają na przekaźnictwo dopaminergiczne."
          },
          {
            text: "Zastosowanie wyłącznie doustnego węglanu litu w dawkach terapeutycznych w celu stabilizacji nastroju pacjenta na oddziale ratunkowym",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Lit nasila neurotoksyczność neuroleptyków i jest znanym czynnikiem ryzyka wyzwolenia oraz zaostrzenia NMS!"
          }
        ]
      },
      {
        title: "Krok 3: Ochrona nerek przed nefropatią mioglobinową",
        scenario: "Stężenie kinazy kreatynowej wynosi 36 000 IU/l, a mocz pacjenta ma barwę ciemnobrunatną (kolor herbaty / coca-coli). Jakie jest postępowanie nefroprotekcyjne?",
        options: [
          {
            text: "Intensywna płynoterapia krystaloidami z wymuszeniem diurezy (150–200 ml/h) oraz alkalizacja moczu wodorowęglanem sodu (do pH moczu >6,5), chroniąca przed krystalizacją mioglobiny",
            correct: true,
            isCorrect: true,
            feedback: "✅ PRAWIDŁOWO! Mioglobina uwolniona z rozpadających się mięśni krystalizuje w kwaśnym środowisku cewek nerkowych, tworząc z białkiem Tamma-Horsfalla wałeczki blokujące nerki. Diureza i alkalizacja moczu wodorowęglanem sodu (pH >6,5) zapobiegają nefrotoksyczności i chronią przed anurycznym AKI."
          },
          {
            text: "Całkowite restrykcyjne ograniczenie podaży płynów dożylnych do 500 ml na dobę w celu zapobieżenia rzekomemu przewodnieniu hipotonicznemu i obrzękowi miąższu nerek",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Restrykcja płynowa w rabdomiolizie gwarantuje nieodwracalną martwicę cewek nerkowych i zgon z powodu mocznicy i hiperkaliemii."
          },
          {
            text: "Podanie nefrotoksycznych aminoglikozydów (gentamycyna) w wysokich dawkach nasycających w celu rutynowego wyjałowienia mioglobiny zalegającej w pęcherzu moczowym",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Aminoglikozydy są nefrotoksyczne i skojarzone z rabdomiolizą spowodują natychmiastową całkowitą niewydolność nerek."
          },
          {
            text: "Natychmiastowe forsowne zakwaszenie moczu kwasem askorbinowym w megadawkach dożylnych aż do uzyskania kwaśnego odczynu pH moczu poniżej wartości 4,5",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Zakwaszanie moczu dramatycznie przyspiesza wytrącanie wałeczków mioglobinowych i jest bezpośrednim błędem jatrogennym!"
          }
        ]
      }
    ],
    pathoNodes: [
      {
        id: "patho_1",
        title: "Blokada receptorów dopaminergicznych D2 w prążkowiu i podwzgórzu",
        desc: "Neuroleptyki (zwłaszcza I generacji: haloperidol) blokują receptory D2. W szlaku nigrostriatalnym znosi to hamowanie neuronów cholinergicznych, prowadząc do uogólnionego skurczu mięśni (sztywność rury ołowianej). W podwzgórzu blokada D2 rozregulowuje ośrodek termoregulacji, uniemożliwiając rozpraszanie ciepła.",
        target: "Agoniści dopaminy (bromokryptyna, amantadyna) odblokowujący receptory D2"
      },
      {
        id: "patho_2",
        title: "Skurcz miocytów, hipertermia metaboliczna i rabdomioliza",
        desc: "Utrzymujący się spastyczny skurcz mięśni szkieletowych generuje potężną ilość ciepła metabolicznego (temperatura ciała >40°C). Prowadzi to do wyczerpania zapasów ATP, rozpadu sarkolemmy komórek mięśniowych i masowego wyrzutu kinazy kreatynowej (CK), potasu oraz mioglobiny do łożyska naczyniowego.",
        target: "Dantrolen i.v. hamujący uwalnianie wapnia z siateczki sarkoplazmatycznej"
      },
      {
        id: "patho_3",
        title: "Niestabilność autonomiczna i ostra martwica cewek nerkowych",
        desc: "Niedobór dopaminy odhamowuje układ współczulny, wywołując labilne nadciśnienie, tachykardię i zlewne poty. Monomery mioglobiny przesączają się w kłębuszkach i w kwaśnym odczynie moczu polimeryzują, wywołując skurcz naczyń nerkowych i ostrą martwicę cewek (ATN).",
        target: "Intensywna płynoterapia i alkalizacja moczu wodorowęglanem sodu (pH moczu >6,5)"
      }
    ],
    dutySummary: {
      diagnostics: "1. Rozpoznanie klinicznej tetrady NMS: hipertermia (>38–40°C), sztywność mięśniowa typu 'rury ołowianej' (lead-pipe), zaburzenia świadomości (mutyzm akinetyczny, stupor) oraz niestabilność autonomiczna (tachykardia, labilne ciśnienie, poty).\n\n2. Badania laboratoryjne krwi: kinaza kreatynowa (CK >1000–50 000 IU/l), leukocytoza (15 000–30 000/ul bez cech infekcji), mioglobina, elektrolity (hiperkaliemia!), kreatynina, mocznik, AST/ALT, gazometria (kwasica metaboliczna).\n\n3. Badanie ogólne moczu: ocena mioglobinurii (ciemny mocz 'cola', fałszywie dodatni test paskowy na krew przy braku erytrocytów w mikroskopii).\n\n4. Różnicowanie: wykluczenie zespołu serotoninowego (w NMS brak klonusów, odruchy osłabione, początek w ciągu kilku dni, a nie godzin).",
      drugsAndDoses: "• Dantrolen (miorelaksant z wyboru): <span class=\"dose-pill\">1–2,5 mg/kg i.v. w szybkim wlewie</span> powtarzane co 10–15 minut w razie potrzeby (maksymalnie 10 mg/kg na dobę).\n• Bromokryptyna (agonista D2): <span class=\"dose-pill\">2,5–5 mg doustnie lub przez sondę co 8 godzin</span> (maks. 40 mg/dobę) przez 7–14 dni.\n• Amantadyna (alternatywny agonista dopaminy): <span class=\"dose-pill\">100 mg p.o./sonda co 12 godzin</span>.\n• Sedacja benzodiazepinami: <span class=\"dose-pill\">lorazepam 1–2 mg i.v. co 4–6 godzin</span> lub diazepam <span class=\"dose-pill\">5–10 mg i.v. powoli</span> w celu opanowania sztywności i pobudzenia.\n• Płynoterapia i alkalizacja moczu: <span class=\"dose-pill\">3000–6000 ml krystaloidów/dobę z dodatkiem wodorowęglanu sodu 8,4% (50–100 mmol)</span> w celu utrzymania pH moczu >6,5.",
      pitfalls: [
        "Podanie depolaryzujących leków zwiotczających (sukcynylocholina) do intubacji chorego z NMS – wyzwala natychmiastową, śmiertelną hiperkaliemię w wyniku masywnego wypływu potasu z uszkodzonych miocytów.",
        "Mylenie NMS z zespołem serotoninowym – w NMS dominuje sztywność 'ołowiana', hiporefleksja i początek rozwijający się przez kilka dni; w zespole serotoninowym dominują wybitne klonusy, hiperrefleksja, rozszerzenie źrenic i gwałtowny początek (<24h).",
        "Stosowanie klasycznych leków przeciwgorączkowych (paracetamol, NLPZ) – są całkowicie bezskuteczne, gdyż hipertermia wynika z pracy mięśni, a ich metabolizm obciąża uszkodzoną wątrobę i nerki.",
        "Zbyt wczesne wznowienie leczenia neuroleptykiem po ustąpieniu NMS – ponowne włączenie leków przeciwpsychotycznych wymaga co najmniej 2 tygodni przerwy, zastosowania leku atypowego o niskim powinowactwie do D2 (np. klozapina, kwetiapina) i powolnego miareczkowania."
      ]
    },
    diffTable: {
      title: "⚔️ Tabela Różnicowa: Złośliwy Zespół Neuroleptyczny a Inne Stany Hipertermii",
      headers: ["Cecha kliniczna", "Złośliwy zespół neuroleptyczny (NMS)", "Zespół serotoninowy (SS)", "Hipertermia złośliwa (MH)", "Katatonia letalna (ostra)"],
      rows: [
        ["Leki wyzwalające", "Antagoniści receptorów D2 (haloperidol, flufenazyna)", "Leki serotoninergiczne (SSRI, SNRI, tramadol, MDMA)", "Wziewne anestetyki (halotan, sewofluran) + sukcynylocholina", "Brak leków lub nagłe odstawienie leczenia schizofrenii"],
        ["Czas narastania objawów", "Powolny, narasta w ciągu 1–7 dni", "Bardzo szybki, rozwija się w ciągu kilku godzin (<24h)", "Piorunujący, rozwija się w ciągu minut na sali operacyjnej", "Narasta w ciągu kilku dni do tygodni"],
        ["Napięcie mięśniowe i odruchy", "Sztywność 'rury ołowianej', odruchy OSŁABIONE lub w normie", "Wybitne KLONUSY (stóp, oczu), hiperrefleksja (nóg > rąk)", "Uogólniona deska mięśniowa, skurcz mięśni żwaczy", "Sztywność woskowa, katalepsja, objawy negatywizmu"],
        ["Stan źrenic i perystaltyka", "Źrenice prawidłowe/leniwe, perystaltyka osłabiona", "Źrenice ROZSZERZONE (mydriasis), BIEGUNKA i przelewania", "Źrenice prawidłowe, brak biegunki", "Prawidłowe lub zmienne"],
        ["Swoiste leczenie farmakologiczne", "Dantrolen + bromokryptyna / amantadyna + płyny", "Cyproheptadyna (antagonista 5-HT2A) + benzodiazepiny", "Dantrolen natychmiast (2,5 mg/kg i.v.) + chłodzenie", "Elektrowstrząsy (ECT) + wysokie dawki lorazepamu"]
      ]
    },
    lekQuestions: [
      {
        id: 1,
        q: "Kluczowym patomechanizmem odpowiedzialnym za rozwój złośliwego zespołu neuroleptycznego (NMS) jest:",
        question: "Kluczowym patomechanizmem odpowiedzialnym za rozwój złośliwego zespołu neuroleptycznego (NMS) jest:",
        opts: [
          "Ostra blokada receptorów dopaminergicznych D2 w prążkowiu oraz w ośrodku termoregulacji podwzgórza",
          "Nadmierna stymulacja receptorów serotoninowych 5-HT2A w pniu mózgu i rdzeniu kręgowym",
          "Wrodzona mutacja receptora rianodynowego RyR1 w kanalikach siateczki sarkoplazmatycznej",
          "Masywne uwolnienie acetylocholiny w synapsach nerwowo-mięśniowych pod wpływem toksyn",
          "Całkowite zablokowanie receptorów kwasu gamma-aminomasłowego typu A w korze mózgowej"
        ],
        options: [
          "Ostra blokada receptorów dopaminergicznych D2 w prążkowiu oraz w ośrodku termoregulacji podwzgórza",
          "Nadmierna stymulacja receptorów serotoninowych 5-HT2A w pniu mózgu i rdzeniu kręgowym",
          "Wrodzona mutacja receptora rianodynowego RyR1 w kanalikach siateczki sarkoplazmatycznej",
          "Masywne uwolnienie acetylocholiny w synapsach nerwowo-mięśniowych pod wpływem toksyn",
          "Całkowite zablokowanie receptorów kwasu gamma-aminomasłowego typu A w korze mózgowej"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "NMS wynika z gwałtownego spadku przekaźnictwa dopaminergicznego (blokada D2 przez neuroleptyki lub odstawienie leków w chorobie Parkinsona), co wywołuje sztywność mięśni i hipertermię.",
        expl: "Ostra blokada receptorów dopaminergicznych D2 w prążkowiu oraz w ośrodku termoregulacji podwzgórza",
        explanation: "NMS wynika z gwałtownego spadku przekaźnictwa dopaminergicznego (blokada D2 przez neuroleptyki lub odstawienie leków w chorobie Parkinsona), co wywołuje sztywność mięśni i hipertermię."
      },
      {
        id: 2,
        q: "Który z poniższych leków zwiotczających mięśnie szkieletowe jest BEZWZGLĘDNIE PRZECIWWSKAZANY podczas intubacji pacjenta z podejrzeniem NMS i rabdomiolizy?",
        question: "Który z poniższych leków zwiotczających mięśnie szkieletowe jest BEZWZGLĘDNIE PRZECIWWSKAZANY podczas intubacji pacjenta z podejrzeniem NMS i rabdomiolizy?",
        opts: [
          "Sukcynylocholina (chlorek suksametonium – depolaryzujący środek zwiotczający)",
          "Rokuronium (niedepolaryzujący środek zwiotczający o szybkim początku działania)",
          "Wekuronium (niedepolaryzujący środek zwiotczający o pośrednim czasie działania)",
          "Cisatrakurium (lek eliminowany na drodze metabolizmu Hoffmana w osoczu)",
          "Pankuronium (długodziałający steroidowy niedepolaryzujący środek zwiotczający)"
        ],
        options: [
          "Sukcynylocholina (chlorek suksametonium – depolaryzujący środek zwiotczający)",
          "Rokuronium (niedepolaryzujący środek zwiotczający o szybkim początku działania)",
          "Wekuronium (niedepolaryzujący środek zwiotczający o pośrednim czasie działania)",
          "Cisatrakurium (lek eliminowany na drodze metabolizmu Hoffmana w osoczu)",
          "Pankuronium (długodziałający steroidowy niedepolaryzujący środek zwiotczający)"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Sukcynylocholina wywołuje depolaryzację błony komórkowej miocytów. W uszkodzonych mięśniach (rabdomioliza) powoduje gwałtowny wyrzut potasu do osocza, wywołując śmiertelną hiperkaliemię i zatrzymanie krążenia.",
        expl: "Sukcynylocholina (chlorek suksametonium – depolaryzujący środek zwiotczający)",
        explanation: "Sukcynylocholina wywołuje depolaryzację błony komórkowej miocytów. W uszkodzonych mięśniach (rabdomioliza) powoduje gwałtowny wyrzut potasu do osocza, wywołując śmiertelną hiperkaliemię i zatrzymanie krążenia."
      },
      {
        id: 3,
        q: "Która z poniższych cech badania neurologicznego najbardziej jednoznacznie przemawia za złośliwym zespołem neuroleptycznym (NMS), a przeciwko zespołowi serotoninowemu?",
        question: "Która z poniższych cech badania neurologicznego najbardziej jednoznacznie przemawia za złośliwym zespołem neuroleptycznym (NMS), a przeciwko zespołowi serotoninowemu?",
        opts: [
          "Obecność sztywności plastycznej typu 'rury ołowianej' z osłabieniem lub prawidłowością odruchów głębokich",
          "Występowanie wybitnych spontanicznych i indukowanych klonusów stóp oraz gałek ocznych",
          "Symetrycznie wygórowane odruchy ścięgniste (hiperrefleksja 4+) ze stopotrząsem",
          "Znaczne rozszerzenie źrenic (mydriasis) z obfitą perystaltyką jelitową i biegunką",
          "Wystąpienie objawów w ciągu pierwszych 2 godzin od podania pojedynczej dawki leku"
        ],
        options: [
          "Obecność sztywności plastycznej typu 'rury ołowianej' z osłabieniem lub prawidłowością odruchów głębokich",
          "Występowanie wybitnych spontanicznych i indukowanych klonusów stóp oraz gałek ocznych",
          "Symetrycznie wygórowane odruchy ścięgniste (hiperrefleksja 4+) ze stopotrząsem",
          "Znaczne rozszerzenie źrenic (mydriasis) z obfitą perystaltyką jelitową i biegunką",
          "Wystąpienie objawów w ciągu pierwszych 2 godzin od podania pojedynczej dawki leku"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Dla NMS charakterystyczna jest sztywność 'ołowiana' (lead-pipe) i hiporefleksja/normorefleksja. Klonusy, hiperrefleksja, mydriasis i biegunka to cechy osiowe zespołu serotoninowego.",
        expl: "Obecność sztywności plastycznej typu 'rury ołowianej' z osłabieniem lub prawidłowością odruchów głębokich",
        explanation: "Dla NMS charakterystyczna jest sztywność 'ołowiana' (lead-pipe) i hiporefleksja/normorefleksja. Klonusy, hiperrefleksja, mydriasis i biegunka to cechy osiowe zespołu serotoninowego."
      },
      {
        id: 4,
        q: "Lekiem z wyboru o działaniu obwodowym zwiotczającym mięśnie poprzez blokadę receptorów rianodynowych w siateczce sarkoplazmatycznej stosowanym w NMS jest:",
        question: "Lekiem z wyboru o działaniu obwodowym zwiotczającym mięśnie poprzez blokadę receptorów rianodynowych w siateczce sarkoplazmatycznej stosowanym w NMS jest:",
        opts: [
          "Dantrolen podawany dożylnie w dawce 1–2,5 mg/kg masy ciała",
          "Baklofen podawany w postaci wlewu do przestrzeni podpajęczynówkowej",
          "Toksyna botulinowa podawana we wstrzyknięciach domięśniowych",
          "Pirydostygmina w powolnym wstrzyknięciu dożylnym pod kontrolą tętna",
          "Tolperyzon podawany doustnie w jednorazowej dawce nasycającej"
        ],
        options: [
          "Dantrolen podawany dożylnie w dawce 1–2,5 mg/kg masy ciała",
          "Baklofen podawany w postaci wlewu do przestrzeni podpajęczynówkowej",
          "Toksyna botulinowa podawana we wstrzyknięciach domięśniowych",
          "Pirydostygmina w powolnym wstrzyknięciu dożylnym pod kontrolą tętna",
          "Tolperyzon podawany doustnie w jednorazowej dawce nasycającej"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Dantrolen blokuje receptor rianodynowy RyR1, hamując uwalnianie jonów Ca2+ z siateczki sarkoplazmatycznej miocytów, co bezpośrednio znosi skurcz mięśni i zatrzymuje hipertermię.",
        expl: "Dantrolen podawany dożylnie w dawce 1–2,5 mg/kg masy ciała",
        explanation: "Dantrolen blokuje receptor rianodynowy RyR1, hamując uwalnianie jonów Ca2+ z siateczki sarkoplazmatycznej miocytów, co bezpośrednio znosi skurcz mięśni i zatrzymuje hipertermię."
      },
      {
        id: 5,
        q: "W celu przywrócenia przekaźnictwa dopaminergicznego w ośrodkowym układzie nerwowym w przebiegu NMS stosuje się:",
        question: "W celu przywrócenia przekaźnictwa dopaminergicznego w ośrodkowym układzie nerwowym w przebiegu NMS stosuje się:",
        opts: [
          "Bromokryptynę (agonistę receptorów D2) lub amantadynę (stymulującą uwalnianie dopaminy)",
          "Cyproheptadynę (nieselektywnego antagonistę receptorów serotoninowych)",
          "Flumazenil (antagonistę kompleksu receptorowego kwasu gamma-aminomasłowego)",
          "Fizostygminę (ośrodkowo działający inhibitor acetylocholinoesterazy)",
          "Atropinę (kompetycyjnego antagonistę obwodowych receptorów muskarynowych)"
        ],
        options: [
          "Bromokryptynę (agonistę receptorów D2) lub amantadynę (stymulującą uwalnianie dopaminy)",
          "Cyproheptadynę (nieselektywnego antagonistę receptorów serotoninowych)",
          "Flumazenil (antagonistę kompleksu receptorowego kwasu gamma-aminomasłowego)",
          "Fizostygminę (ośrodkowo działający inhibitor acetylocholinoesterazy)",
          "Atropinę (kompetycyjnego antagonistę obwodowych receptorów muskarynowych)"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Bromokryptyna jest agonistą receptorów D2, a amantadyna zwiększa presynaptyczne uwalnianie dopaminy – obie odwracają blokadę dopaminergiczną wywołaną neuroleptykami.",
        expl: "Bromokryptynę (agonistę receptorów D2) lub amantadynę (stymulującą uwalnianie dopaminy)",
        explanation: "Bromokryptyna jest agonistą receptorów D2, a amantadyna zwiększa presynaptyczne uwalnianie dopaminy – obie odwracają blokadę dopaminergiczną wywołaną neuroleptykami."
      },
      {
        id: 6,
        q: "Oceń prawdziwość zdań dotyczących złośliwego zespołu neuroleptycznego (NMS):\nI. NMS może rozwinąć się nie tylko po włączeniu neuroleptyku, ale także po nagłym odstawieniu lewodopy.\nII. Klasyczne leki przeciwgorączkowe (paracetamol, NLPZ) są w pełni skuteczne w normalizacji temperatury w NMS.\nIII. Leukocytoza z przesunięciem w lewo i znaczny wzrost kinazy kreatynowej są typowymi odchyleniami laboratoryjnymi.\nIV. Ponowne włączenie leczenia przeciwpsychotycznego po przebytym NMS wymaga minimum 2 tygodni karencji.",
        question: "Oceń prawdziwość zdań dotyczących złośliwego zespołu neuroleptycznego (NMS):\nI. NMS może rozwinąć się nie tylko po włączeniu neuroleptyku, ale także po nagłym odstawieniu lewodopy.\nII. Klasyczne leki przeciwgorączkowe (paracetamol, NLPZ) są w pełni skuteczne w normalizacji temperatury w NMS.\nIII. Leukocytoza z przesunięciem w lewo i znaczny wzrost kinazy kreatynowej są typowymi odchyleniami laboratoryjnymi.\nIV. Ponowne włączenie leczenia przeciwpsychotycznego po przebytym NMS wymaga minimum 2 tygodni karencji.",
        opts: [
          "Prawdziwe są zdania: I, III oraz IV",
          "Prawdziwe są zdania: I, II oraz III",
          "Prawdziwe są zdania: II, III oraz IV",
          "Prawdziwe są zdania: I, II, III oraz IV",
          "Prawdziwe są wyłącznie zdania: I oraz IV"
        ],
        options: [
          "Prawdziwe są zdania: I, III oraz IV",
          "Prawdziwe są zdania: I, II oraz III",
          "Prawdziwe są zdania: II, III oraz IV",
          "Prawdziwe są zdania: I, II, III oraz IV",
          "Prawdziwe są wyłącznie zdania: I oraz IV"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Zdania I, III i IV są prawdziwe. Zdanie II jest fałszywe – paracetamol i NLPZ są nieskuteczne, ponieważ hipertermia wynika ze skurczu mięśni, a nie z pirogenów.",
        expl: "Prawdziwe są zdania: I, III oraz IV",
        explanation: "Zdania I, III i IV są prawdziwe. Zdanie II jest fałszywe – paracetamol i NLPZ są nieskuteczne, ponieważ hipertermia wynika ze skurczu mięśni, a nie z pirogenów."
      },
      {
        id: 7,
        q: "Dlaczego alkalizacja moczu wodorowęglanem sodu (do uzyskania pH moczu >6,5) jest kluczowym elementem terapii chorych z NMS powikłanym rabdomiolizą?",
        question: "Dlaczego alkalizacja moczu wodorowęglanem sodu (do uzyskania pH moczu >6,5) jest kluczowym elementem terapii chorych z NMS powikłanym rabdomiolizą?",
        opts: [
          "Ponieważ zapobiega rozpadowi mioglobiny do nefrotoksycznej ferrihemiany i hamuje tworzenie wałeczków w cewkach nerkowych",
          "Ponieważ przyspiesza wątrobowy metabolizm haloperidolu i ułatwia jego eliminację przez drogi żółciowe",
          "W celu natychmiastowego obniżenia stężenia wapnia w surowicy krwi i zapobieżenia skurczom mięśni",
          "Ponieważ wodorowęglan sodu bezpośrednio blokuje receptory dopaminergiczne D2 w rdzeniu przedłużonym",
          "W celu wywołania zasadowicy oddechowej kompensującej skurcz oskrzeli wywołany neuroleptykiem"
        ],
        options: [
          "Ponieważ zapobiega rozpadowi mioglobiny do nefrotoksycznej ferrihemiany i hamuje tworzenie wałeczków w cewkach nerkowych",
          "Ponieważ przyspiesza wątrobowy metabolizm haloperidolu i ułatwia jego eliminację przez drogi żółciowe",
          "W celu natychmiastowego obniżenia stężenia wapnia w surowicy krwi i zapobieżenia skurczom mięśni",
          "Ponieważ wodorowęglan sodu bezpośrednio blokuje receptory dopaminergiczne D2 w rdzeniu przedłużonym",
          "W celu wywołania zasadowicy oddechowej kompensującej skurcz oskrzeli wywołany neuroleptykiem"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "W kwaśnym moczu (pH <5,6) mioglobina dysocjuje do globiny i ferrihemiany (hematyny), która działa bezpośrednio cytotoksycznie na nabłonek cewek i tworzy wałeczki z białkiem Tamma-Horsfalla. Alkalizacja (pH >6,5) zapobiega temu procesowi.",
        expl: "Ponieważ zapobiega rozpadowi mioglobiny do nefrotoksycznej ferrihemiany i hamuje tworzenie wałeczków w cewkach nerkowych",
        explanation: "W kwaśnym moczu (pH <5,6) mioglobina dysocjuje do globiny i ferrihemiany (hematyny), która działa bezpośrednio cytotoksycznie na nabłonek cewek i tworzy wałeczki z białkiem Tamma-Horsfalla. Alkalizacja (pH >6,5) zapobiega temu procesowi."
      },
      {
        id: 8,
        q: "Który z poniższych czynników klinicznych stanowi uznany czynnik ryzyka wystąpienia złośliwego zespołu neuroleptycznego podczas leczenia przeciwpsychotycznego?",
        question: "Który z poniższych czynników klinicznych stanowi uznany czynnik ryzyka wystąpienia złośliwego zespołu neuroleptycznego podczas leczenia przeciwpsychotycznego?",
        opts: [
          "Odwodnienie pacjenta, szybkie zwiększanie dawki neuroleptyku oraz parenteralna droga podania (iniekcje i.m.)",
          "Długotrwała terapia małymi dawkami neuroleptyków atypowych przy prawidłowym stanie nawodnienia",
          "Jednoczesne stosowanie leków beta-adrenolitycznych w prewencji zaburzeń rytmu serca",
          "Występowanie łagodnego obrzęku naczynioruchowego Quinckego w wywiadzie rodzinnym",
          "Płeć żeńska w okresie pomenopauzalnym z towarzyszącą osteoporozą uogólnioną"
        ],
        options: [
          "Odwodnienie pacjenta, szybkie zwiększanie dawki neuroleptyku oraz parenteralna droga podania (iniekcje i.m.)",
          "Długotrwała terapia małymi dawkami neuroleptyków atypowych przy prawidłowym stanie nawodnienia",
          "Jednoczesne stosowanie leków beta-adrenolitycznych w prewencji zaburzeń rytmu serca",
          "Występowanie łagodnego obrzęku naczynioruchowego Quinckego w wywiadzie rodzinnym",
          "Płeć żeńska w okresie pomenopauzalnym z towarzyszącą osteoporozą uogólnioną"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Czynnikami ryzyka NMS są: odwodnienie, wyczerpanie fizyczne, nagłe szybkie zwiększanie dawek neuroleptyków klasycznych o silnym powinowactwie do D2 (haloperidol), droga parenteralna (i.m.) oraz terapia skojarzona z litem.",
        expl: "Odwodnienie pacjenta, szybkie zwiększanie dawki neuroleptyku oraz parenteralna droga podania (iniekcje i.m.)",
        explanation: "Czynnikami ryzyka NMS są: odwodnienie, wyczerpanie fizyczne, nagłe szybkie zwiększanie dawek neuroleptyków klasycznych o silnym powinowactwie do D2 (haloperidol), droga parenteralna (i.m.) oraz terapia skojarzona z litem."
      },
      {
        id: 9,
        q: "W sytuacji, gdy farmakoterapia NMS dantrolenem i bromokryptyną okazuje się nieskuteczna, a stan chorego zagraża zgonem, metodą ratunkową z wyboru jest:",
        question: "W sytuacji, gdy farmakoterapia NMS dantrolenem i bromokryptyną okazuje się nieskuteczna, a stan chorego zagraża zgonem, metodą ratunkową z wyboru jest:",
        opts: [
          "Zastosowanie zabiegów elektrowstrząsowych (ECT - electroconvulsive therapy) w znieczuleniu ogólnym",
          "Wykonanie natychmiastowej splenektomii w celu zatrzymania niszczenia krwinek czerwonych",
          "Wdrożenie terapii tlenem hiperbarycznym w komorze HBO pod ciśnieniem 3 atmosfer",
          "Podanie dożylne 100 gramów albuminy ludzkiej w celu związania wolnego neuroleptyku",
          "Wykonanie resekcji przedniego płata przysadki mózgowej z dostępu przezklinowego"
        ],
        options: [
          "Zastosowanie zabiegów elektrowstrząsowych (ECT - electroconvulsive therapy) w znieczuleniu ogólnym",
          "Wykonanie natychmiastowej splenektomii w celu zatrzymania niszczenia krwinek czerwonych",
          "Wdrożenie terapii tlenem hiperbarycznym w komorze HBO pod ciśnieniem 3 atmosfer",
          "Podanie dożylne 100 gramów albuminy ludzkiej w celu związania wolnego neuroleptyku",
          "Wykonanie resekcji przedniego płata przysadki mózgowej z dostępu przezklinowego"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Zabiegi elektrowstrząsowe (ECT) są uznaną i wysoce skuteczną metodą ratunkową w opornym na leczenie NMS oraz w katatonii letalnej, prowadząc do zresetowania receptorów dopaminergicznych.",
        expl: "Zastosowanie zabiegów elektrowstrząsowych (ECT - electroconvulsive therapy) w znieczuleniu ogólnym",
        explanation: "Zabiegi elektrowstrząsowe (ECT) są uznaną i wysoce skuteczną metodą ratunkową w opornym na leczenie NMS oraz w katatonii letalnej, prowadząc do zresetowania receptorów dopaminergicznych."
      },
      {
        id: 10,
        q: "Zgodnie z ustawą o ochronie zdrowia psychicznego, podanie leków ratujących życie pacjentowi z NMS w stanie mutyzmu akinetycznego i braku kontaktu logicznego:",
        question: "Zgodnie z ustawą o ochronie zdrowia psychicznego, podanie leków ratujących życie pacjentowi z NMS w stanie mutyzmu akinetycznego i braku kontaktu logicznego:",
        opts: [
          "Może być wykonane bez zgody pacjenta w ramach stanu bezpośredniego zagrożenia życia na podstawie ustawy o zawodach lekarza i lekarza dentysty",
          "Wymaga bezwzględnego uprzedniego uzyskania pisemnej zgody sądu opiekuńczego przed podaniem jakiejkolwiek kroplówki",
          "Może być wdrożone wyłącznie po osobistej wizycie sędziego orzekającego przy łóżku chorego na oddziale ratunkowym",
          "Jest surowo zakazane przepisami prawa pod rygorem odpowiedzialności karnej za naruszenie nietykalności cielesnej",
          "Wymaga jednogłośnej zgody wszystkich pełnoletnich członków najbliższej rodziny pacjenta potwierdzonej notarialnie"
        ],
        options: [
          "Może być wykonane bez zgody pacjenta w ramach stanu bezpośredniego zagrożenia życia na podstawie ustawy o zawodach lekarza i lekarza dentysty",
          "Wymaga bezwzględnego uprzedniego uzyskania pisemnej zgody sądu opiekuńczego przed podaniem jakiejkolwiek kroplówki",
          "Może być wdrożone wyłącznie po osobistej wizycie sędziego orzekającego przy łóżku chorego na oddziale ratunkowym",
          "Jest surowo zakazane przepisami prawa pod rygorem odpowiedzialności karnej za naruszenie nietykalności cielesnej",
          "Wymaga jednogłośnej zgody wszystkich pełnoletnich członków najbliższej rodziny pacjenta potwierdzonej notarialnie"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Zgodnie z art. 33 i 34 ustawy o zawodach lekarza i lekarza dentysty, w stanie nagłego zagrożenia życia, gdy pacjent jest niezdolny do wyrażenia zgody, lekarz ma obowiązek podjąć natychmiastowe czynności lecznicze ratujące życie.",
        expl: "Może być wykonane bez zgody pacjenta w ramach stanu bezpośredniego zagrożenia życia na podstawie ustawy o zawodach lekarza i lekarza dentysty",
        explanation: "Zgodnie z art. 33 i 34 ustawy o zawodach lekarza i lekarza dentysty, w stanie nagłego zagrożenia życia, gdy pacjent jest niezdolny do wyrażenia zgody, lekarz ma obowiązek podjąć natychmiastowe czynności lecznicze ratujące życie."
      },
      {
        id: 11,
        q: "Jakie stężenie kinazy kreatynowej (CK) w surowicy krwi uznaje się za kryterium laboratoryjne silnie wspierające rozpoznanie NMS w obrazie klinicznym?",
        question: "Jakie stężenie kinazy kreatynowej (CK) w surowicy krwi uznaje się za kryterium laboratoryjne silnie wspierające rozpoznanie NMS w obrazie klinicznym?",
        opts: [
          "Wartości przekraczające co najmniej czterokrotnie górną granicę normy (zwykle >1000 IU/l, często >10 000–50 000 IU/l)",
          "Wartości obniżone poniżej dolnej granicy normy laboratoryjnej dla dorosłych mężczyzn",
          "Izolowany wzrost aktywności CK wyłącznie w przedziale od 200 do 250 IU/l przy prawidłowym EKG",
          "Wzrost stężenia izoenzymu CK-MB bez zmian w całkowitej aktywności kinazy kreatynowej",
          "Wahania stężenia enzymu występujące wyłącznie w godzinach porannych zależne od kortyzolu"
        ],
        options: [
          "Wartości przekraczające co najmniej czterokrotnie górną granicę normy (zwykle >1000 IU/l, często >10 000–50 000 IU/l)",
          "Wartości obniżone poniżej dolnej granicy normy laboratoryjnej dla dorosłych mężczyzn",
          "Izolowany wzrost aktywności CK wyłącznie w przedziale od 200 do 250 IU/l przy prawidłowym EKG",
          "Wzrost stężenia izoenzymu CK-MB bez zmian w całkowitej aktywności kinazy kreatynowej",
          "Wahania stężenia enzymu występujące wyłącznie w godzinach porannych zależne od kortyzolu"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Aktywność CK w NMS jest wybitnie podwyższona w wyniku sztywności i rabdomiolizy – zwykle przekracza 1000 IU/l, a nierzadko osiąga wartości 10 000–100 000 IU/l.",
        expl: "Wartości przekraczające co najmniej czterokrotnie górną granicę normy (zwykle >1000 IU/l, często >10 000–50 000 IU/l)",
        explanation: "Aktywność CK w NMS jest wybitnie podwyższona w wyniku sztywności i rabdomiolizy – zwykle przekracza 1000 IU/l, a nierzadko osiąga wartości 10 000–100 000 IU/l."
      }
    ],
    flashcards: [
      {
        q: "Jaka tetrada objawów klinicznych definiuje złośliwy zespół neuroleptyczny (NMS)?",
        a: "Hipertermia (>38–40°C), sztywność mięśniowa 'rury ołowianej', zaburzenia świadomości i labilność autonomiczna."
      },
      {
        q: "Jaki jest patomechanizm NMS?",
        a: "Gwałtowna blokada receptorów dopaminergicznych D2 w prążkowiu (sztywność) i podwzgórzu (hipertermia)."
      },
      {
        q: "Dlaczego sukcynylocholina jest bezwzględnie zakazana u chorych z NMS?",
        a: "W uszkodzonych mięśniach (rabdomioliza) wyzwala nagłą, śmiertelną hiperkaliemię i asystolię."
      },
      {
        q: "Jaki jest mechanizm działania dantrolenu w NMS?",
        a: "Blokuje receptory rianodynowe (RyR1) siateczki sarkoplazmatycznej, hamując uwalnianie Ca2+ i skurcz miocytów."
      },
      {
        q: "Jakie leki dopaminergiczne stosuje się w farmakoterapii NMS?",
        a: "Bromokryptynę (agonistę D2) lub amantadynę (stymulującą wydzielanie dopaminy)."
      },
      {
        q: "Jak odróżnić NMS od zespołu serotoninowego w badaniu fizykalnym?",
        a: "W NMS: sztywność 'ołowiana' i osłabione odruchy; w zespole serotoninowym: wybitne klonusy, hiperrefleksja i rozszerzone źrenice."
      }
    ]
  },
  // =========================================================================
  // CASE 175: Zespół Serotoninowy (Serotonin Syndrome)
  // =========================================================================
  {
    id: 175,
    file: "175_zespol_serotoninowy.json",
    shortTitle: "Zespół Serotoninowy",
    title: "Psychiatryczno-Toksykologiczny Stan Nagły: Zespół Serotoninowy",
    dept: "Psychiatria / Toksykologia / SOR",
    diagnosisTitle: "Ciężki Zespół Serotoninowy z Klonusami, Hipertermią i Niestabilnością Autonomiczną",
    vitals: [
      { label: "Ciśnienie tętnicze (RR)", val: "168/96", unit: "mmHg", status: "vital-warn" },
      { label: "Częstość akcji serca (HR)", val: "128", unit: "/min", status: "vital-warn" },
      { label: "Częstość oddechów (RR)", val: "22", unit: "/min", status: "vital-warn" },
      { label: "Saturacja (SpO2)", val: "98", unit: "%", status: "vital-ok" },
      { label: "Temperatura ciała", val: "39.5", unit: "°C", status: "vital-crit" }
    ],
    story: "<p><strong>Pacjent:</strong> 24-letnia kobieta przywieziona na SOR przez przyjaciółkę z powodu gwałtownie narastającego niepokoju, drżeń mięśniowych, sztywności nóg i gorączki 39,5°C.</p><p><strong>Wywiad chorobowy:</strong> Pacjentka od 6 miesięcy przyjmuje sertralinę (SSRI) w dawce 100 mg/d z powodu zaburzeń lękowo-depresyjnych. Przedwczoraj z powodu ostrego bólu zęba stomatolog przepisał jej tramadol w dawce 100 mg co 6 godzin, a wczoraj wieczorem pacjentka na imprezie zażyła tabletkę ecstasy (MDMA). Objawy wystąpiły nagle w ciągu 4–6 godzin od imprezy: skrajny niepokój psychoruchowy, obfite zlewne poty, dreszcze, suchość w ustach, rozszerzenie źrenic, biegunka oraz niekontrolowane zrywania i drżenia mięśniowe nóg. W wywiadzie brak chorób przewlekłych poza zaburzeniami nastroju.</p><p><strong>Badanie przedmiotowe:</strong> Pacjentka skrajnie pobudzona, splątana, zdezorientowana, krzyczy, wykonuje niespokojne ruchy na noszach. Skóra gorąca, zaczerwieniona, zlana obfitym potem. W badaniu neurologicznym: obustronne wybitnie szerokie źrenice (mydriasis, ok. 7 mm), słabo reagujące na światło. Obecny spontaniczny oczopląs poziomy i rotacyjny oraz spontaniczne i wyzwalane klonusy stóp (ponad 10 rytmicznych uderzeń stopy przy zgięciu grzbietowym – patognomoniczne klonusy!). Wybitna hiperrefleksja ścięgnista (odruchy kolanowe i skokowe 4+ z poszerzoną strefą), wzmożone napięcie mięśniowe wyraźniejsze w kończynach dolnych niż górnych. Brzuch wzdęty, perystaltyka jelitowa wybitnie wzmożona, słyszalne głośne przelewania (aktywna wodnista biegunka). Tachykardia 128/min, RR 168/96 mmHg. Stan spełnia z nadmiarem kryteria Huntera (przyjęcie leków serotoninergicznych + spontaniczne klonusy + hipertermia + pobudzenie).</p>",
    steps: [
      {
        title: "Krok 1: Natychmiastowe odstawienie leków serotoninergicznych i sedacja benzodiazepinami",
        scenario: "Pacjentka ma 39,5°C, klonusy stóp, szerokie źrenice, biegunkę i przyjęła sertralinę, tramadol oraz MDMA. Jakie jest natychmiastowe postępowanie pierwszego rzutu na SOR?",
        options: [
          {
            text: "Natychmiastowe bezwzględne odstawienie leków serotoninergicznych, wdrożenie dożylnej sedacji benzodiazepinami (diazepam 5–10 mg i.v. lub lorazepam) oraz intensywne chłodzenie",
            correct: true,
            isCorrect: true,
            feedback: "✅ PRAWIDŁOWO! Podstawą leczenia zespołu serotoninowego jest natychmiastowe zaprzestanie podawania wszystkich leków serotoninergicznych oraz agresywna sedacja benzodiazepinami (diazepam, lorazepam). Benzodiazepiny wygaszają nadmierną stymulację układu nerwowego, zmniejszają pobudzenie, znoszą klonusy i hamują generowanie ciepła przez miocyty."
          },
          {
            text: "Podanie dożylne 100 mg tramadolu w celu zniesienia ostrego bólu mięśniowego wywołanego przez zrywania miokloniczne kończyn dolnych",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Tramadol jest silnym lekiem serotoninergicznym – jego podanie to błąd krytyczny prowadzący do zgonu pacjentki w drgawkach i hipertermii!"
          },
          {
            text: "Zastosowanie przymusowego unieruchomienia fizycznego pasami bez podawania jakichkolwiek leków uspokajających lub przeciwlękowych",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Izolowane unieruchomienie bez sedacji potęguje izometryczny skurcz mięśni, drastycznie nasila hipertermię i przyspiesza zgon w kwasicy!"
          },
          {
            text: "Podanie dożylne 1000 mg paracetamolu w powolnym wlewie kroplowym jako leku pierwszego wyboru w zbijaniu gorączki w zespole serotoninowym",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Paracetamol jest całkowicie nieskuteczny w hipertermii serotoninergicznej, a jego metabolizm dodatkowo obciąża wątrobę."
          }
        ]
      },
      {
        title: "Krok 2: Swoista farmakoterapia odtrutkowa – blokada receptorów 5-HT",
        scenario: "Mimo podania 20 mg diazepamu klonusy stóp i tachykardia utrzymują się, a temperatura wynosi 39,2°C. Jaki lek stanowi swoistą odtrutkę (antagonistę receptorów 5-HT2A) w zespole serotoninowym?",
        options: [
          {
            text: "Cyproheptadyna podawana doustnie lub przez zgłębnik żołądkowy (dawka początkowa 12 mg, następnie 2 mg co 2 godziny do opanowania objawów)",
            correct: true,
            isCorrect: true,
            feedback: "✅ PRAWIDŁOWO! Cyproheptadyna to swoisty antagonista receptorów serotoninowych 5-HT2A i 5-HT1A o udowodnionej skuteczności w zespole serotoninowym. Podaje się ją p.o. lub przez zgłębnik żołądkowy (12 mg dawka początkowa, podtrzymująco 8 mg co 6 godzin) do ustąpienia toksyczności."
          },
          {
            text: "Dantrolen w dawce 10 mg/kg i.v. w skojarzeniu z bromokryptyną podawaną domięśniowo co 4 godziny",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Dantrolen i bromokryptyna to schemat w NMS; bromokryptyna ma właściwości serotoninergiczne i może nasilić zespół serotoninowy!"
          },
          {
            text: "Propranolol w wysokich dawkach dożylnych w celu zablokowania receptorów beta-adrenergicznych serca",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Propranolol blokuje autoreceptory 5-HT1A, maskuje tachykardię i grozi zapaścią naczyniową przy niestabilności autonomicznej."
          },
          {
            text: "Haloperidol w dawce 10 mg i.m. w celu opanowania ostrego pobudzenia psychoruchowego u pacjentki",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Neuroleptyki blokują pocenie się i mogą wywołać nałożenie się złośliwego zespołu neuroleptycznego (NMS) na zespół serotoninowy!"
          }
        ]
      },
      {
        title: "Krok 3: Postępowanie w krytycznej hipertermii (>40°C) – zwiotczenie i intubacja",
        scenario: "Temperatura ciała pacjentki wzrasta do 40,2°C, pojawia się wyczerpanie oddechowe i narastająca sztywność. Jakie jest natychmiastowe postępowanie ratujące życie w warunkach OIT/SOR?",
        options: [
          {
            text: "Natychmiastowa intubacja dotchawicza, zwiotczenie NIEDEPOLARYZUJĄCYM lekiem miorelaksacyjnym (np. rokuronium), sedacja i wentylacja mechaniczna z agresywnym chłodzeniem",
            correct: true,
            isCorrect: true,
            feedback: "✅ PRAWIDŁOWO! W krytycznej hipertermii (>40°C) jedynym skutecznym sposobem zatrzymania produkcji ciepła jest chemiczne odłączenie mięśni szkieletowych za pomocą niedepolaryzujących leków zwiotczających (rokuronium, wekuronium). Sukcynylocholina jest BEZWZGLĘDNIE ZAKAZANA z powodu ryzyka hiperkaliemii i rabdomiolizy!"
          },
          {
            text: "Podanie sukcynylocholiny w szybkim bolusie 2 mg/kg dożylnie i pozostawienie pacjentki na oddechu spontanicznym z tlenem przez wąsy nosowe bez intubacji dotchawiczej",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Sukcynylocholina w hipertermii grozi asystolią z hiperkaliemii, a zwiotczenie bez intubacji oznacza natychmiastowe uduszenie!"
          },
          {
            text: "Podanie dożylne 200 mg czystej kofeiny lub teofiliny w celu bezpośredniej stymulacji ośrodka oddechowego w pniu mózgu i wywołania kompensacyjnego tachypnoë",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Kofeina to stymulant nasilający produkcję ciepła, tachykardię i drgawki, prowadzący do zgonu pacjentki."
          },
          {
            text: "Zastosowanie dializy otrzewnowej z użyciem podgrzanego do 42°C płynu dializacyjnego w celu rozszerzenia naczyń krezkowych i wypłukania nadmiaru serotoniny",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Podgrzany płyn dializacyjny w hipertermii 40,2°C spowoduje ugotowanie narządów wewnętrznych i natychmiastową śmierć."
          }
        ]
      }
    ],
    pathoNodes: [
      {
        id: "patho_1",
        title: "Nadmierna stymulacja receptorów 5-HT2A i 5-HT1A w OUN",
        desc: "Skojarzenie leków hamujących wychwyt zwrotny serotoniny (SSRI, tramadol) z substancjami nasilającymi uwalnianie serotoniny (MDMA, amfetamina) lub inhibitorami MAO wywołuje toksyczny nadmiar serotoniny w szczelinach synaptycznych. Pobudzenie receptorów 5-HT2A w pniu mózgu i podwzgórzu generuje hipertermię i pobudzenie psychoruchowe.",
        target: "Antagonista receptorów serotoninowych (cyproheptadyna p.o./sonda)"
      },
      {
        id: "patho_2",
        title: "Nadreaktywność nerwowo-mięśniowa i patognomoniczne klonusy",
        desc: "Pobudzenie zstępujących szlaków serotoninergicznych rdzenia kręgowego wywołuje wybiórcze wzmożenie odruchów rdzeniowych, drżenia mięśniowe, wybitną hiperrefleksję oraz spontaniczne i wyzwalane klonusy (zwłaszcza stóp i gałek ocznych). Napięcie mięśniowe jest wybitniejsze w kończynach dolnych niż górnych.",
        target: "Agresywna sedacja benzodiazepinami (diazepam, lorazepam i.v.)"
      },
      {
        id: "patho_3",
        title: "Odhamowanie układu autonomicznego i przyspieszona perystaltyka",
        desc: "Pobudzenie obwodowych receptorów 5-HT w jelitowym układzie nerwowym (ENS) oraz w układzie współczulnym powoduje wybitne przyspieszenie perystaltyki (wodnista biegunka, przelewania), rozszerzenie źrenic (mydriasis), obfite zlewne poty, tachykardię i labilne ciśnienie tętnicze.",
        target: "Wyrównywanie płynów i elektrolitów oraz zwiotczenie niedepolaryzujące (rokuronium)"
      }
    ],
    dutySummary: {
      diagnostics: "1. Ocena kryteriów Huntera (złoty standard o czułości 84% i swoistości 97%): przyjęcie leku serotoninergicznego ORAZ co najmniej jeden z objawów:\n  - Klonusy spontaniczne\n  - Klonusy wyzwalane + pobudzenie lub zlewne poty\n  - Klonusy oczne + pobudzenie lub zlewne poty\n  - Drżenie mięśniowe + wybitna hiperrefleksja\n  - Hipertermia (>38°C) + wzmożone napięcie mięśniowe + klonusy oczne/wyzwalane.\n\n2. Badanie fizykalne: ocena źrenic (mydriasis), perystaltyki jelitowej (biegunka, przelewania) oraz odruchów ścięgnistych i klonusów (nóg > rąk).\n\n3. Badania laboratoryjne: kinaza kreatynowa CK, elektrolity, gazometria, wskaźniki nerkowe i wątrobowe, układ krzepnięcia (wykluczenie DIC w hipertermii), toksykologia moczu.\n\n4. Monitorowanie parametrów życiowych: ciągłe EKG, ciśnienie tętnicze, kapnometria i pomiar temperatury głębokiej.",
      drugsAndDoses: "• Diazepam: <span class=\"dose-pill\">5–10 mg i.v. powoli co 5–10 minut</span> do uzyskania zadowalającej sedacji i wygaszenia klonusów.\n• Lorazepam: <span class=\"dose-pill\">2–4 mg i.v. powoli</span> jako alternatywna benzodiazepina pierwszego wyboru.\n• Cyproheptadyna (odtrutka z wyboru): <span class=\"dose-pill\">dawka początkowa 12 mg p.o. lub przez zgłębnik żołądkowy</span>, następnie 2 mg co 2h w razie utrzymywania objawów; podtrzymująco 8 mg co 6 godzin.\n• Zwiotczenie do intubacji w hipertermii: <span class=\"dose-pill\">rokuronium 0,6–1,0 mg/kg i.v.</span> (LEK NIEDEPOLARYZUJĄCY – unikać sukcynylocholiny!).\n• Płynoterapia dożylna: <span class=\"dose-pill\">krystaloidy zbilansowane 2000–4000 ml/dobę</span> w celu pokrycia strat z potów i biegunki.",
      pitfalls: [
        "Mylenie zespołu serotoninowego ze złośliwym zespołem neuroleptycznym (NMS) – w zespole serotoninowym dominują klonusy, hiperrefleksja, rozszerzone źrenice, biegunka i gwałtowny początek (<24h); w NMS dominuje sztywność 'rury ołowianej', brak klonusów i powolny początek (dni).",
        "Podanie leków przeciwgorączkowych (paracetamol, NLPZ) – są całkowicie bezskuteczne, gdyż hipertermia wynika z aktywności mięśniowej, a nie ze zmiany nastawienia podwzgórzowego termostatu.",
        "Podanie sukcynylocholiny do intubacji – wyzwala gwałtowną, śmiertelną hiperkaliemię i zaostrza rabdomiolizę; należy stosować wyłącznie leki niedepolaryzujące (rokuronium).",
        "Stosowanie fizycznego unieruchomienia pasami bez sedacji farmakologicznej – pacjent walczący z pasami generuje potężne ilości ciepła w skurczu izometrycznym, co przyspiesza zgon z kwasicy mleczanowej i hipertermii."
      ]
    },
    diffTable: {
      title: "⚔️ Tabela Różnicowa: Zespół Serotoninowy a Inne Ostre Zespoły Toksyczne",
      headers: ["Cecha kliniczna", "Zespół serotoninowy (SS)", "Złośliwy zespół neuroleptyczny (NMS)", "Zatrucie cholinolityczne", "Majaczenie drżenne (delirium tremens)"],
      rows: [
        ["Substancje wywołujące", "SSRI, SNRI, tramadol, MDMA, inhibitory MAO", "Neuroleptyki blokujące receptory D2 (haloperidol)", "Atropina, skopolamina, leki p-histaminowe I gen.", "Nagłe odstawienie alkoholu etylowego u osoby uzależnionej"],
        ["Czas rozwoju objawów", "Błyskawiczny, zwykle w ciągu 2–24 godzin", "Stopniowy, rozwija się w ciągu 1–7 dni", "Szybki, w ciągu 1–3 godzin od spożycia", "Rozwija się po 48–72 godzinach od ostatniego napoju"],
        ["Układ nerwowo-mięśniowy", "Wybitne KLONUSY, hiperrefleksja, zrywania (nogi > ręce)", "Sztywność 'rury ołowianej', hiporefleksja", "Drżenie grubofalowe, odruchy prawidłowe", "Uogólnione drżenie mięśniowe, ataksja, brak klonusów"],
        ["Źrenice i perystaltyka", "Źrenice ROZSZERZONE (mydriasis), BIEGUNKA i przelewania", "Źrenice prawidłowe/leniwe, perystaltyka osłabiona", "Źrenice ROZSZERZONE, skrajna CISZA w brzuchu (atonia)", "Źrenice rozszerzone, perystaltyka zachowana"],
        ["Stan skóry", "Skóra gorąca, zlana obfitym potem (LEPKA)", "Skóra gorąca, obficie spocona (blado-marmurkowa)", "Skóra czerwona, CAŁKOWICIE SUCHA ('suchy jak pieprz')", "Skóra obficie spocona, rozszerzone naczynia"],
        ["Leczenie pierwszego rzutu", "Odstawienie leków, benzodiazepiny, cyproheptadyna", "Odstawienie leków, chłodzenie, dantrolen, bromokryptyna", "Fizostygmina (inhibitor AChE), benzodiazepiny", "Wysokie dawki benzodiazepin (diazepam i.v.), tiamina"]
      ]
    },
    lekQuestions: [
      {
        id: 1,
        q: "Zgodnie z uznanymi kryteriami Huntera (złotym standardem diagnostycznym zespołu serotoninowego), najbardziej swoistym objawem klinicznym u pacjenta przyjmującego leki serotoninergiczne są:",
        question: "Zgodnie z uznanymi kryteriami Huntera (złotym standardem diagnostycznym zespołu serotoninowego), najbardziej swoistym objawem klinicznym u pacjenta przyjmującego leki serotoninergiczne są:",
        opts: [
          "Spontaniczne lub wyzwalane klonusy (w tym klonusy stóp oraz klonusy gałek ocznych)",
          "Uogólniona symetryczna sztywność mięśniowa typu 'rury ołowianej' z osłabieniem odruchów",
          "Całkowita atonia pęcherza moczowego połączona z suchością błon śluzowych i skóry",
          "Wybiórcze zwężenie źrenic do wielkości łebka od szpilki z towarzyszącą bradykardią",
          "Pojawienie się izolowanego obrzęku naczynioruchowego warg oraz krtani bez gorączki"
        ],
        options: [
          "Spontaniczne lub wyzwalane klonusy (w tym klonusy stóp oraz klonusy gałek ocznych)",
          "Uogólniona symetryczna sztywność mięśniowa typu 'rury ołowianej' z osłabieniem odruchów",
          "Całkowita atonia pęcherza moczowego połączona z suchością błon śluzowych i skóry",
          "Wybiórcze zwężenie źrenic do wielkości łebka od szpilki z towarzyszącą bradykardią",
          "Pojawienie się izolowanego obrzęku naczynioruchowego warg oraz krtani bez gorączki"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Kryteria Huntera kładą nacisk na klonusy (spontaniczne, wyzwalane lub oczne) – są one najbardziej swoistym i diagnostycznym objawem nadmiaru serotoniny w OUN.",
        expl: "Spontaniczne lub wyzwalane klonusy (w tym klonusy stóp oraz klonusy gałek ocznych)",
        explanation: "Kryteria Huntera kładą nacisk na klonusy (spontaniczne, wyzwalane lub oczne) – są one najbardziej swoistym i diagnostycznym objawem nadmiaru serotoniny w OUN."
      },
      {
        id: 2,
        q: "Lekiem z wyboru o działaniu swoistego antagonisty receptorów serotoninowych 5-HT2A stosowanym w farmakoterapii zespołu serotoninowego jest:",
        question: "Lekiem z wyboru o działaniu swoistego antagonisty receptorów serotoninowych 5-HT2A stosowanym w farmakoterapii zespołu serotoninowego jest:",
        opts: [
          "Cyproheptadyna podawana doustnie lub przez zgłębnik żołądkowy",
          "Bromokryptyna podawana dożylnie w powolnym wlewie ciągłym",
          "Dantrolen sodowy podawany we wstrzyknięciach domięśniowych",
          "Flumazenil podawany miareczkowany dożylnie co 60 sekund",
          "Nalokson chlorowodorek podawany we wlewie dożylnym kroplowym"
        ],
        options: [
          "Cyproheptadyna podawana doustnie lub przez zgłębnik żołądkowy",
          "Bromokryptyna podawana dożylnie w powolnym wlewie ciągłym",
          "Dantrolen sodowy podawany we wstrzyknięciach domięśniowych",
          "Flumazenil podawany miareczkowany dożylnie co 60 sekund",
          "Nalokson chlorowodorek podawany we wlewie dożylnym kroplowym"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Cyproheptadyna jest lekiem przeciwhistaminowym I generacji o silnym działaniu blokującym receptory serotoninowe 5-HT2A i stanowi odtrutkę z wyboru w zespole serotoninowym.",
        expl: "Cyproheptadyna podawana doustnie lub przez zgłębnik żołądkowy",
        explanation: "Cyproheptadyna jest lekiem przeciwhistaminowym I generacji o silnym działaniu blokującym receptory serotoninowe 5-HT2A i stanowi odtrutkę z wyboru w zespole serotoninowym."
      },
      {
        id: 3,
        q: "Który z poniższych leków przeciwbólowych wykazuje silne działanie hamujące wychwyt zwrotny serotoniny i może wywołać zespół serotoninowy w skojarzeniu z SSRI?",
        question: "Który z poniższych leków przeciwbólowych wykazuje silne działanie hamujące wychwyt zwrotny serotoniny i może wywołać zespół serotoninowy w skojarzeniu z SSRI?",
        opts: [
          "Tramadol (oraz inne syntetyczne opioidy, np. petydyna, tapentadol, metadon)",
          "Ketoprofen podawany w postaci wlewów dożylnych w dawce 100 mg",
          "Metamizol sodowy stosowany doustnie w dawce doraźnej 500 mg",
          "Paracetamol w standardowych dawkach przeciwgorączkowych u dorosłych",
          "Drotaweryna stosowana w stanach spastycznych mięśniówki gładkiej"
        ],
        options: [
          "Tramadol (oraz inne syntetyczne opioidy, np. petydyna, tapentadol, metadon)",
          "Ketoprofen podawany w postaci wlewów dożylnych w dawce 100 mg",
          "Metamizol sodowy stosowany doustnie w dawce doraźnej 500 mg",
          "Paracetamol w standardowych dawkach przeciwgorączkowych u dorosłych",
          "Drotaweryna stosowana w stanach spastycznych mięśniówki gładkiej"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Tramadol (oprócz działania na MOR) silnie hamuje wychwyt zwrotny serotoniny i noradrenaliny. Połączenie go z SSRI/SNRI lub MAOI jest klasyczną przyczyną jatrogennego zespołu serotoninowego.",
        expl: "Tramadol (oraz inne syntetyczne opioidy, np. petydyna, tapentadol, metadon)",
        explanation: "Tramadol (oprócz działania na MOR) silnie hamuje wychwyt zwrotny serotoniny i noradrenaliny. Połączenie go z SSRI/SNRI lub MAOI jest klasyczną przyczyną jatrogennego zespołu serotoninowego."
      },
      {
        id: 4,
        q: "Dlaczego fizyczne krępowanie pacjenta pasami (bez intensywnej sedacji farmakologicznej) jest szczególnie niebezpieczne w zespole serotoninowym?",
        question: "Dlaczego fizyczne krępowanie pacjenta pasami (bez intensywnej sedacji farmakologicznej) jest szczególnie niebezpieczne w zespole serotoninowym?",
        opts: [
          "Ponieważ opór pacjenta i skurcz izometryczny mięśni gwałtownie nasilają hipertermię, rabdomiolizę i kwasicę mleczanową, prowadząc do zgonu",
          "Ponieważ ucisk pasów stymuluje wydzielanie serotoniny z płytek krwi na obwodzie w mechanizmie ucisku mechanicznego",
          "Ponieważ unieruchomienie pacjenta całkowicie eliminuje jakiekolwiek działanie podawanego dożylnie diazepamu",
          "Z uwagi na natychmiastowe zablokowanie przepływu krwi przez naczynia mózgowe pod wpływem samego leżenia",
          "Ponieważ u każdego krępowanego chorego dochodzi do ostrego pęknięcia śledziony w wyniku wzrostu ciśnienia"
        ],
        options: [
          "Ponieważ opór pacjenta i skurcz izometryczny mięśni gwałtownie nasilają hipertermię, rabdomiolizę i kwasicę mleczanową, prowadząc do zgonu",
          "Ponieważ ucisk pasów stymuluje wydzielanie serotoniny z płytek krwi na obwodzie w mechanizmie ucisku mechanicznego",
          "Ponieważ unieruchomienie pacjenta całkowicie eliminuje jakiekolwiek działanie podawanego dożylnie diazepamu",
          "Z uwagi na natychmiastowe zablokowanie przepływu krwi przez naczynia mózgowe pod wpływem samego leżenia",
          "Ponieważ u każdego krępowanego chorego dochodzi do ostrego pęknięcia śledziony w wyniku wzrostu ciśnienia"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Walczenie z pasami to intensywny skurcz izometryczny, który generuje olbrzymie ilości ciepła metabolicznego i kwasu mlekowego. W zespole serotoninowym konieczna jest głęboka sedacja benzodiazepinami.",
        expl: "Ponieważ opór pacjenta i skurcz izometryczny mięśni gwałtownie nasilają hipertermię, rabdomiolizę i kwasicę mleczanową, prowadząc do zgonu",
        explanation: "Walczenie z pasami to intensywny skurcz izometryczny, który generuje olbrzymie ilości ciepła metabolicznego i kwasu mlekowego. W zespole serotoninowym konieczna jest głęboka sedacja benzodiazepinami."
      },
      {
        id: 5,
        q: "Który z poniższych leków przeciwinfekcyjnych jest odwracalnym inhibitorem monoaminooksydazy (MAOI) i może sprowokować śmiertelny zespół serotoninowy u chorego leczonego SSRI?",
        question: "Który z poniższych leków przeciwinfekcyjnych jest odwracalnym inhibitorem monoaminooksydazy (MAOI) i może sprowokować śmiertelny zespół serotoninowy u chorego leczonego SSRI?",
        opts: [
          "Linezolid (antybiotyk oksazolidynonowy stosowany w zakażeniach szczepami MRSA i VRE)",
          "Ciprofloksacyna (fluorochinolon stosowany w powikłanych zakażeniach dróg moczowych)",
          "Amoksycylina z kwasem klawulanowym (aminopenicylina o szerokim spektrum)",
          "Ceftriakson (cefalosporyna trzeciej generacji stosowana w zapaleniach opon)",
          "Metronidazol (pochodna nitroimidazolu stosowana w zakażeniach beztlenowcami)"
        ],
        options: [
          "Linezolid (antybiotyk oksazolidynonowy stosowany w zakażeniach szczepami MRSA i VRE)",
          "Ciprofloksacyna (fluorochinolon stosowany w powikłanych zakażeniach dróg moczowych)",
          "Amoksycylina z kwasem klawulanowym (aminopenicylina o szerokim spektrum)",
          "Ceftriakson (cefalosporyna trzeciej generacji stosowana w zapaleniach opon)",
          "Metronidazol (pochodna nitroimidazolu stosowana w zakażeniach beztlenowcami)"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Linezolid jest odwracalnym, nieselektywnym inhibitorem MAO. Połączenie linezolidu z lekami serotoninergicznymi (SSRI, SNRI) stwarza ogromne ryzyko ciężkiego zespołu serotoninowego.",
        expl: "Linezolid (antybiotyk oksazolidynonowy stosowany w zakażeniach szczepami MRSA i VRE)",
        explanation: "Linezolid jest odwracalnym, nieselektywnym inhibitorem MAO. Połączenie linezolidu z lekami serotoninergicznymi (SSRI, SNRI) stwarza ogromne ryzyko ciężkiego zespołu serotoninowego."
      },
      {
        id: 6,
        q: "Oceń prawdziwość zdań dotyczących zespołu serotoninowego:\nI. Zespół serotoninowy rozwija się zazwyczaj szybko – w ciągu 6–24 godzin od modyfikacji leczenia.\nII. W badaniu fizykalnym typowo stwierdza się wybitne rozszerzenie źrenic (mydriasis) oraz biegunkę.\nIII. Hiperrefleksja i wzmożone napięcie mięśniowe są zazwyczaj znacznie silniej wyrażone w kończynach dolnych niż górnych.\nIV. Standardowe leczenie przeciwgorączkowe paracetamolem jest metodą z wyboru w obniżaniu temperatury.",
        question: "Oceń prawdziwość zdań dotyczących zespołu serotoninowego:\nI. Zespół serotoninowy rozwija się zazwyczaj szybko – w ciągu 6–24 godzin od modyfikacji leczenia.\nII. W badaniu fizykalnym typowo stwierdza się wybitne rozszerzenie źrenic (mydriasis) oraz biegunkę.\nIII. Hiperrefleksja i wzmożone napięcie mięśniowe są zazwyczaj znacznie silniej wyrażone w kończynach dolnych niż górnych.\nIV. Standardowe leczenie przeciwgorączkowe paracetamolem jest metodą z wyboru w obniżaniu temperatury.",
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
        exp: "Zdania I, II i III są prawdziwe. Zdanie IV jest fałszywe – paracetamol jest nieskuteczny, gdyż gorączka ma podłoże mięśniowe.",
        expl: "Prawdziwe są zdania: I, II oraz III",
        explanation: "Zdania I, II i III są prawdziwe. Zdanie IV jest fałszywe – paracetamol jest nieskuteczny, gdyż gorączka ma podłoże mięśniowe."
      },
      {
        id: 7,
        q: "Który z leków stosowanych powszechnie w anestezjologii i na SOR do zwiotczenia mięśni jest BEZWZGLĘDNIE ZAKAZANY u chorego z zespołem serotoninowym i hipertermią?",
        question: "Który z leków stosowanych powszechnie w anestezjologii i na SOR do zwiotczenia mięśni jest BEZWZGLĘDNIE ZAKAZANY u chorego z zespołem serotoninowym i hipertermią?",
        opts: [
          "Sukcynylocholina (z powodu ryzyka zawału komórkowego, rabdomiolizy i nagłej hiperkaliemii)",
          "Rokuronium (z powodu ryzyka trwałego porażenia ośrodka oddechowego w moście)",
          "Wekuronium (ze względu na konieczność monitorowania zwiotczenia metodą TOF)",
          "Cisatrakurium (z uwagi na wydłużony czas eliminacji w kwasicy metabolicznej)",
          "Miwakurium (ze względu na wybiórczy metabolizm przez cholinoesterazę osoczową)"
        ],
        options: [
          "Sukcynylocholina (z powodu ryzyka zawału komórkowego, rabdomiolizy i nagłej hiperkaliemii)",
          "Rokuronium (z powodu ryzyka trwałego porażenia ośrodka oddechowego w moście)",
          "Wekuronium (ze względu na konieczność monitorowania zwiotczenia metodą TOF)",
          "Cisatrakurium (z uwagi na wydłużony czas eliminacji w kwasicy metabolicznej)",
          "Miwakurium (ze względu na wybiórczy metabolizm przez cholinoesterazę osoczową)"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Sukcynylocholina u chorych z hipertermią i rabdomiolizą wyzwala piorunującą hiperkaliemię prowadzącą do zatrzymania krążenia. Należy stosować wyłącznie leki niedepolaryzujące (rokuronium).",
        expl: "Sukcynylocholina (z powodu ryzyka zawału komórkowego, rabdomiolizy i nagłej hiperkaliemii)",
        explanation: "Sukcynylocholina u chorych z hipertermią i rabdomiolizą wyzwala piorunującą hiperkaliemię prowadzącą do zatrzymania krążenia. Należy stosować wyłącznie leki niedepolaryzujące (rokuronium)."
      },
      {
        id: 8,
        q: "Lekiem pierwszego wyboru w kontroli pobudzenia, drżeń, klonusów i łagodnej hipertermii w zespole serotoninowym na SOR są:",
        question: "Lekiem pierwszego wyboru w kontroli pobudzenia, drżeń, klonusów i łagodnej hipertermii w zespole serotoninowym na SOR są:",
        opts: [
          "Benzodiazepiny podawane dożylnie (np. diazepam w dawkach 5–10 mg lub lorazepam)",
          "Leki przeciwpsychotyczne I generacji (np. haloperidol w iniekcjach domięśniowych)",
          "Agoniści receptorów dopaminergicznych (np. bromokryptyna w dawkach doustnych)",
          "Nieselektywne leki beta-adrenolityczne podawane w bolusach (np. propranolol)",
          "Inhibitory pompy protonowej w podwójnych dawkach dobowych we wlewie ciągłym"
        ],
        options: [
          "Benzodiazepiny podawane dożylnie (np. diazepam w dawkach 5–10 mg lub lorazepam)",
          "Leki przeciwpsychotyczne I generacji (np. haloperidol w iniekcjach domięśniowych)",
          "Agoniści receptorów dopaminergicznych (np. bromokryptyna w dawkach doustnych)",
          "Nieselektywne leki beta-adrenolityczne podawane w bolusach (np. propranolol)",
          "Inhibitory pompy protonowej w podwójnych dawkach dobowych we wlewie ciągłym"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Benzodiazepiny są podstawą postępowania – wzmacniają hamowanie GABA-ergiczne, wyciszają układ współczulny, znoszą klonusy i hamują produkcję ciepła.",
        expl: "Benzodiazepiny podawane dożylnie (np. diazepam w dawkach 5–10 mg lub lorazepam)",
        explanation: "Benzodiazepiny są podstawą postępowania – wzmacniają hamowanie GABA-ergiczne, wyciszają układ współczulny, znoszą klonusy i hamują produkcję ciepła."
      },
      {
        id: 9,
        q: "Który z poniższych popularnych leków przeciwkaszlowych dostępnych bez recepty (OTC) wykazuje działanie serotoninergiczne i może wywołać zespół serotoninowy w połączeniu z SSRI?",
        question: "Który z poniższych popularnych leków przeciwkaszlowych dostępnych bez recepty (OTC) wykazuje działanie serotoninergiczne i może wywołać zespół serotoninowy w połączeniu z SSRI?",
        opts: [
          "Dekstrometorfan (pochodna morfiny hamująca wychwyt zwrotny serotoniny)",
          "Butamirat (nieopioidowy lek przeciwkaszlowy o działaniu ośrodkowym)",
          "Lewodropropizyna (obwodowy lek przeciwkaszlowy działający w oskrzelach)",
          "Acetylocysteina (lek mukolityczny rozrywający mostki dwusiarczkowe)",
          "Ambroksol (lek mukokinetyczny stymulujący wydzielanie surfaktantu)"
        ],
        options: [
          "Dekstrometorfan (pochodna morfiny hamująca wychwyt zwrotny serotoniny)",
          "Butamirat (nieopioidowy lek przeciwkaszlowy o działaniu ośrodkowym)",
          "Lewodropropizyna (obwodowy lek przeciwkaszlowy działający w oskrzelach)",
          "Acetylocysteina (lek mukolityczny rozrywający mostki dwusiarczkowe)",
          "Ambroksol (lek mukokinetyczny stymulujący wydzielanie surfaktantu)"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Dekstrometorfan jest inhibitorem wychwytu zwrotnego serotoniny. Przyjęty w dawkach OTC lub rekreacyjnych w połączeniu z SSRI/SNRI może wywołać ostry zespół serotoninowy.",
        expl: "Dekstrometorfan (pochodna morfiny hamująca wychwyt zwrotny serotoniny)",
        explanation: "Dekstrometorfan jest inhibitorem wychwytu zwrotnego serotoniny. Przyjęty w dawkach OTC lub rekreacyjnych w połączeniu z SSRI/SNRI może wywołać ostry zespół serotoninowy."
      },
      {
        id: 10,
        q: "Z punktu widzenia prawa medycznego, jeżeli lekarz rodzinny przepisał pacjentowi przyjmującemu SSRI tramadol w wysokich dawkach bez sprawdzenia interakcji lekowych:",
        question: "Z punktu widzenia prawa medycznego, jeżeli lekarz rodzinny przepisał pacjentowi przyjmującemu SSRI tramadol w wysokich dawkach bez sprawdzenia interakcji lekowych:",
        opts: [
          "Działanie takie stanowi błąd w sztuce lekarskiej (błąd terapeutyczny) wynikający z niedochowania należytej staranności zawodowej",
          "Lekarz jest całkowicie zwolniony z odpowiedzialności, jeśli pacjent nie zapytał wprost o możliwe interakcje w aptece",
          "Odpowiedzialność za wystąpienie zespołu ponosi wyłącznie producent leku, który nie zamieścił ostrzeżenia w ulotce",
          "Zdarzenie to jest traktowane wyłącznie jako niezawinione powikłanie farmakoterapii o charakterze losowym",
          "Odpowiedzialność cywilna lekarza wygasa automatycznie po upływie 24 godzin od wypisania recepty"
        ],
        options: [
          "Działanie takie stanowi błąd w sztuce lekarskiej (błąd terapeutyczny) wynikający z niedochowania należytej staranności zawodowej",
          "Lekarz jest całkowicie zwolniony z odpowiedzialności, jeśli pacjent nie zapytał wprost o możliwe interakcje w aptece",
          "Odpowiedzialność za wystąpienie zespołu ponosi wyłącznie producent leku, który nie zamieścił ostrzeżenia w ulotce",
          "Zdarzenie to jest traktowane wyłącznie jako niezawinione powikłanie farmakoterapii o charakterze losowym",
          "Odpowiedzialność cywilna lekarza wygasa automatycznie po upływie 24 godzin od wypisania recepty"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Przepisanie leków wchodzących w znaną, groźną dla życia interakcję bez weryfikacji leków przyjmowanych przez pacjenta narusza obowiązek wykonywania zawodu z należytą starannością (błąd w sztuce).",
        expl: "Działanie takie stanowi błąd w sztuce lekarskiej (błąd terapeutyczny) wynikający z niedochowania należytej staranności zawodowej",
        explanation: "Przepisanie leków wchodzących w znaną, groźną dla życia interakcję bez weryfikacji leków przyjmowanych przez pacjenta narusza obowiązek wykonywania zawodu z należytą starannością (błąd w sztuce)."
      },
      {
        id: 11,
        q: "W badaniu fizykalnym pacjenta z podejrzeniem zespołu serotoninowego klonusy oczne (ocular clonus) manifestują się jako:",
        question: "W badaniu fizykalnym pacjenta z podejrzeniem zespołu serotoninowego klonusy oczne (ocular clonus) manifestują się jako:",
        opts: [
          "Powolne, ciągłe, rytmiczne ruchy wahadłowe gałek ocznych w płaszczyźnie poziomej i rotacyjnej",
          "Całkowite nieruchome porażenie gałek ocznych w pozycji skrajnego odwiedzenia w lewo",
          "Jednostronne opadanie powieki z jednoczesnym rozszerzeniem źrenicy po stronie chorej",
          "Nagłe kurczowe zaciskanie powiek przy próbie oświetlenia gałki ocznej latarką",
          "Brak jakichkolwiek ruchów gałek ocznych przy zachowanym odruchu rogówkowym"
        ],
        options: [
          "Powolne, ciągłe, rytmiczne ruchy wahadłowe gałek ocznych w płaszczyźnie poziomej i rotacyjnej",
          "Całkowite nieruchome porażenie gałek ocznych w pozycji skrajnego odwiedzenia w lewo",
          "Jednostronne opadanie powieki z jednoczesnym rozszerzeniem źrenicy po stronie chorej",
          "Nagłe kurczowe zaciskanie powiek przy próbie oświetlenia gałki ocznej latarką",
          "Brak jakichkolwiek ruchów gałek ocznych przy zachowanym odruchu rogówkowym"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Klonusy oczne (ocular clonus) to powolne, rytmiczne, wahadłowe ruchy gałek ocznych o charakterze oczopląsopodobnym, wywołane nadmiarem serotoniny w pniu mózgu.",
        expl: "Powolne, ciągłe, rytmiczne ruchy wahadłowe gałek ocznych w płaszczyźnie poziomej i rotacyjnej",
        explanation: "Klonusy oczne (ocular clonus) to powolne, rytmiczne, wahadłowe ruchy gałek ocznych o charakterze oczopląsopodobnym, wywołane nadmiarem serotoniny w pniu mózgu."
      }
    ],
    flashcards: [
      {
        q: "Jaki objaw neurologiczny jest najbardziej swoisty dla zespołu serotoninowego w kryteriach Huntera?",
        a: "Klonusy (spontaniczne, wyzwalane stóp lub oczne) w połączeniu z pobudzeniem lub poceniem."
      },
      {
        q: "Jakie leki stanowią I rzut w opanowywaniu pobudzenia i klonusów w zespole serotoninowym?",
        a: "Benzodiazepiny dożylne (diazepam 5–10 mg i.v. lub lorazepam 2–4 mg i.v.)."
      },
      {
        q: "Jaka jest swoista odtrutka (antagonista 5-HT2A) w zespole serotoninowym?",
        a: "Cyproheptadyna (dawka wstępna 12 mg p.o./sonda, podtrzymująco 8 mg co 6 godzin)."
      },
      {
        q: "Dlaczego tramadol w połączeniu z SSRI stwarza wysokie ryzyko zespołu serotoninowego?",
        a: "Ponieważ tramadol jest silnym inhibitorem wychwytu zwrotnego serotoniny (i noradrenaliny)."
      },
      {
        q: "Dlaczego sukcynylocholina jest bezwzględnie zakazana w intubacji chorego z hipertermią?",
        a: "Wyzwala nagłą, potencjalnie śmiertelną hiperkaliemię i nasila rabdomiolizę."
      },
      {
        q: "Jak różnicować zespół serotoninowy od NMS w badaniu fizykalnym?",
        a: "W SS: klonusy, hiperrefleksja, mydriasis, biegunka, początek <24h; w NMS: sztywność 'ołowiana', hiporefleksja, początek w dniach."
      }
    ]
  }
];

console.log("Validating Cases...");
casesData.forEach(c => {
  if (c.lekQuestions) {
    c.lekQuestions.forEach(q => {
      q.expl = q.exp;
      q.explanation = q.exp;
    });
  }
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

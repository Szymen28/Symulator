const fs = require('fs');
const path = require('path');
const { encryptStringAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

const case141 = {
  id: 141,
  dept: "Chirurgia naczyniowa",
  title: "Ostre niedokrwienie kończyny dolnej (Acute Limb Ischemia – ALI)",
  shortTitle: "68-letni Zygmunt – Nagły, rozdzierający ból prawej stopy i łydki, bladość, chłód i brak tętna (Ostre niedokrwienie kończyny dolnej / ALI)",
  diagnosisTitle: "Ostre niedokrwienie kończyny dolnej prawej (ALI) w przebiegu zatoru tętnicy udowej powierzchownej/podkolanowej – klasyfikacja Rutherforda IIb, pilna embolektomia cewnikiem Fogarty'ego, fasciotomia",
  vitals: [
    { name: "Częstość akcji serca", val: "114/min (niemiarowe)", status: "vital-warn" },
    { name: "Ciśnienie tętnicze", val: "155/90 mmHg", status: "vital-warn" },
    { name: "Temperatura ciała", val: "36.6 °C", status: "vital-ok" },
    { name: "Saturacja SpO2", val: "97%", status: "vital-ok" }
  ],
  vitalsObj: {
    hr: 114,
    bp: "155/90",
    spo2: 97,
    rr: 20,
    temp: 36.6,
    gcs: 15
  },
  story: "<p><strong>Pacjent:</strong> 68-letni mężczyzna został przywieziony przez ZRM na SOR z powodu nagłego, rozdzierającego bólu prawej stopy i podudzia, który wystąpił gwałtownie 3 godziny temu podczas oglądania telewizji i narastał z każdą minutą.</p><p><strong>Wywiad chorobowy:</strong> Pacjent z wieloletnim utrwalonym migotaniem przedsionków (AF), po przebytym udarze niedokrwiennym mózgu przed 3 laty. W wywiadzie nieregularnie przyjmował doustny antykoagulant (apiksaban) – odstawił go samodzielnie 5 dni temu z powodu 'krwawienia z dziąseł przy szczotkowaniu'. W wywiadzie ponadto nadciśnienie tętnicze i hipercholesterolemia. Dotychczas nie miał chromania przestankowego.</p><p><strong>Badanie przedmiotowe na SOR:</strong> Pacjent cierpiący, krzyczy z bólu, trzyma się za prawe podudzie. Prawa stopa i dystalne 2/3 podudzia są trupio blade, marmurkowate, w dotyku lodowato zimne (chłód sięga do poziomu 10 cm poniżej kolana). Tętno na prawej tętnicy udowej we wspólnym pniu jest dobrze wyczuwalne, natomiast brak tętna na tętnicy podkolanowej, grzbietowej stopy i piszczelowej tylnej prawej (na lewej kończynie tętno zachowane na wszystkich piętrach). W badaniu neurologicznym prawej stopy: zniesione czucie powierzchniowe na palcach i grzbiecie stopy (znieczulenie / hypaesthesia), osłabienie siły zgięcia grzbietowego stopy i palucha (niedowład ruchowy stopnia 3/5 w skali Lovetta). Mięśnie łydki są miękkie i sprężyste, bez cech sztywności (brak stężenia pośmiertnego mięśni). W badaniu EKG: migotanie przedsionków z czynnością komór ok. 110-120/min.</p>",
  labs: [
    {
      name: "Morfologia krwi i hemostaza",
      items: [
        { name: "Hemoglobina (Hb)", val: "14.2 g/dl", norm: "13.5 - 17.5 g/dl", flag: "NORMAL" },
        { name: "Hematokryt (Hct)", val: "42.0 %", norm: "40.0 - 52.0 %", flag: "NORMAL" },
        { name: "Leukocyty (WBC)", val: "12.8 G/l", norm: "4.0 - 10.0 G/l", flag: "HIGH" },
        { name: "Płytki krwi (PLT)", val: "220 G/l", norm: "150 - 400 G/l", flag: "NORMAL" },
        { name: "INR", val: "1.05", norm: "0.8 - 1.2", flag: "NORMAL" },
        { name: "APTT", val: "28 s", norm: "26 - 36 s", flag: "NORMAL" }
      ]
    },
    {
      name: "Biochemia i markery uszkodzenia mięśni",
      items: [
        { name: "Kinaza fosfokreatynowa (CPK)", val: "1450 IU/l", norm: "38 - 174 IU/l", flag: "CRIT_HIGH" },
        { name: "Mioglobina w surowicy", val: "380 ng/ml", norm: "28 - 72 ng/ml", flag: "HIGH" },
        { name: "Potas (K+)", val: "4.8 mmol/l", norm: "3.5 - 5.0 mmol/l", flag: "NORMAL" },
        { name: "Kreatynina", val: "1.1 mg/dl", norm: "0.7 - 1.2 mg/dl", flag: "NORMAL" },
        { name: "Mocznik", val: "38 mg/dl", norm: "15 - 45 mg/dl", flag: "NORMAL" },
        { name: "Mleczany", val: "2.8 mmol/l", norm: "0.5 - 1.6 mmol/l", flag: "HIGH" }
      ]
    },
    {
      name: "Gazometria krwi tętniczej",
      items: [
        { name: "pH", val: "7.34", norm: "7.35 - 7.45", flag: "LOW" },
        { name: "HCO3-", val: "20.1 mmol/l", norm: "22.0 - 26.0 mmol/l", flag: "LOW" },
        { name: "Base Excess (BE)", val: "-4.2 mmol/l", norm: "-2.5 - +2.5 mmol/l", flag: "LOW" }
      ]
    }
  ],
  steps: [
    {
      title: "Krok 1: Wstępna ocena kliniczna i reguła 6P",
      text: "Lekarz naczyniowy ocenia pacjenta z podejrzeniem ostrego niedokrwienia kończyny. Jak brzmi klasyczna 'reguła 6P' opisująca kardynalne objawy ostrego niedokrwienia kończyny (ALI)?",
      options: [
        "Pain (silny ból), Pallor (bladość), Pulselessness (brak tętna), Paresthesia (parestezje/zaburzenia czucia), Paralysis (porażenie/niedowład ruchowy), Polar / Perishing cold (lodowate wychłodzenie kończyny)",
        "Pyrexia (gorączka), Purpura (wybroczyny), Pruritus (świąd), Papule (grudka), Polyuria (wielomocz), Polydipsia (polidypsja)",
        "Palpitations (kołatanie), Pleurodynia (ból opłucnowy), Ptosis (opadanie powieki), Polyphagia (polifagia), Pallor, Paresthesia",
        "Poliomyelitis, Pemphigus, Psoriasis, Pertussis, Parotitis, Pharyngitis"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Klasyczna reguła 6P jest kanonem diagnostyki ostrego niedokrwienia kończyn (ALI):</strong><br>1. <strong>Pain</strong> – nagły, potężny, spoczynkowy ból (pierwszy objaw u >80% chorych).<br>2. <strong>Pallor</strong> – kredowa bladość lub marmurkowatość skóry (wskutek braku napływu krwi włośniczkowej).<br>3. <strong>Pulselessness</strong> – brak tętna obwodowo od miejsca przeszkody.<br>4. <strong>Paresthesia</strong> – drętwienie, mrowienie i ubytek czucia (włókna nerwowe czuciowe są skrajnie wrażliwe na hipoksję już po 20-30 min).<br>5. <strong>Paralysis</strong> – niedowład lub porażenie mięśniowe (zwiastun zaawansowanego niedokrwienia tkanki nerwowo-mięśniowej).<br>6. <strong>Polar / Poikilothermia</strong> – obniżenie temperatury skóry, kończyna zimna w dotyku.",
        "❌ BŁĄD! <strong>W ostrym niedokrwieniu kończyny brak gorączki czy wielomoczu.</strong>",
        "❌ BŁĄD! <strong>Opadanie powieki (ptosis) to objaw zespołu Hornera, a nie ALI.</strong>",
        "❌ BŁĄD! <strong>To lista chorób zakaźnych i dermatologicznych.</strong>"
      ]
    },
    {
      title: "Krok 2: Kwalifikacja zaawansowania niedokrwienia wg klasyfikacji Rutherforda",
      text: "Pacjent ma ubytek czucia na grzbiecie stopy oraz lekki niedowład zgięcia grzbietowego stopy (3/5), ale mięśnie łydki są miękkie i sprężyste (brak sztywności mięśniowej). Jaki to stopień zaawansowania ostrego niedokrwienia wg klasyfikacji Rutherforda i co oznacza dla rokowania kończyny?",
      options: [
        "Kategoria IIb (kończyna natychmiastowo zagrożona – marginally threatened to immediately threatened); wymaga natychmiastowej ratunkowej rewaskularyzacji chirurgicznej w ciągu kilku godzin, co daje pełną szansę na uratowanie kończyny",
        "Kategoria I (kończyna żywotna – brak zagrożenia, brak ubytków czuciowych i ruchowych)",
        "Kategoria III (nieodwracalne niedokrwienie – martwica ze sztywnością mięśniową (rigor mortis), kończyna nie do uratowania, wskazanie do pierwotnej amputacji)",
        "Kategoria 0 (stan prawidłowy)"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Klasyfikacja Rutherforda dla ostrego niedokrwienia kończyny (ALI) decyduje o strategii terapeutycznej:</strong><br>- <strong>Kategoria I (kończyna żywotna):</strong> brak ubytków czuciowych i ruchowych, sygnał tętniczy doppler słyszalny obwodowo. Czas na planową diagnostykę.<br>- <strong>Kategoria IIa (brzeżnie zagrożona):</strong> ubytek czucia ograniczony do palców, brak deficytu ruchowego, sygnał tętniczy niesłyszalny, żylny słyszalny. Wymaga pilnej rewaskularyzacji.<br>- <strong>Kategoria IIb (natychmiastowo zagrożona):</strong> <strong>ubytek czucia obejmujący stopę + deficyt ruchowy (niedowład zgięcia stopy/palców)</strong>, słyszalny tylko sygnał żylny. <strong>Wymaga natychmiastowej rewaskularyzacji operacyjnej (w ciągu 4-6 godzin)!</strong><br>- <strong>Kategoria III (nieodwracalna martwica):</strong> głębokie znieczulenie, całkowite porażenie (plegia) oraz <strong>stężenie/sztywność mięśni (marbling + rigor mortis)</strong>. Kończyna nie do uratowania – próba rewaskularyzacji grozi śmiertelną hiperkaliemią i kwasicą; jedynym leczeniem jest pierwotna amputacja!",
        "❌ BŁĄD! <strong>W kategorii I brak jakichkolwiek ubytków neurologicznych.</strong>",
        "❌ BŁĄD! <strong>W kategorii III występuje sztywność mięśniowa (stężenie) i brak sygnałów żylnych; u naszego chorego mięśnie są miękkie i plastyczne!</strong>",
        "❌ BŁĄD! <strong>To stan bezpośredniego zagrożenia utratą nogi.</strong>"
      ]
    },
    {
      title: "Krok 3: Różnicowanie etiologiczne: Zator (Embolus) vs Zakrzepica in situ (Thrombus)",
      text: "Lekarz naczyniowy analizuje mechanizm niedokrwienia. Jakie cechy kliniczne wskazują na zator (embolizm kardiopochodny) jako przyczynę niedokrwienia u tego pacjenta, w przeciwieństwie do zakrzepicy na podłożu miażdżycowym?",
      options: [
        "Nagły początek u chorego z migotaniem przedsionków i odstawioną antykoagulacją, brak wcześniejszego wywiadu chromania przestankowego, prawidłowe tętno na drugiej kończynie oraz brak rozwiniętego krążenia obocznego",
        "Wieloletni wywiad chromania przestankowego na dystansie 50 metrów i brak tętna na obu kończynach",
        "Młody wiek pacjenta i obustronne owrzodzenia troficzne goleni",
        "Obecność żylaków siatkowatych pod kolanem"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>To klasyczne różnicowanie naczyniowe na egzaminie LEK:</strong><br>- <strong>Zator (Embolism – ok. 70-80% kardiopochodny):</strong> <strong>błyskawiczny początek</strong> (pacjent podaje dokładną godzinę), źródło zatorowości (migotanie przedsionków, zawał, skrzeplina w LK), <strong>brak wcześniejszego chromania</strong>, zdrowe naczynia z prawidłowym tętnem na drugiej nodze, brak krążenia obocznego (dlatego niedokrwienie jest dramatycznie ciężkie!). Najczęstsze miejsca uwięźnięcia skrzepliny: rozwidlenie tętnicy udowej (bifurcatio femoris) i podkolanowa.<br>- <strong>Zakrzepica in situ (Thrombosis):</strong> początek podostry, wieloletni wywiad chromania przestankowego (PAD), zmiany miażdżycowe na obu kończynach, obecne krążenie oboczne (dlatego objawy mogą być łagodniejsze).",
        "❌ BŁĄD! <strong>Przewlekłe chromanie i obustronny brak tętna to cechy zakrzepicy na podłożu miażdżycy.</strong>",
        "❌ BŁĄD! <strong>Owrzodzenia to cecha przewlekłej niewydolności żylnej lub zaawansowanego CLTI.</strong>",
        "❌ BŁĄD! <strong>Żylaki to schorzenie układu żylnego.</strong>"
      ]
    },
    {
      title: "Krok 4: Natychmiastowe postępowanie farmakologiczne na SOR",
      text: "Rozpoznano ostre niedokrwienie kończyny dolnej w kategorii IIb Rutherforda. Jaki lek należy podać natychmiast na SOR bez czekania na badania obrazowe i konsultację chirurgiczną?",
      options: [
        "Heparynę niefrakcjonowaną (UFH) w dożylnym bolusie 5000 j.m. (lub 80 j./kg m.c.), a następnie w ciągłym wlewie i.v. pod kontrolą APTT",
        "Aspirynę w czopku doodbytniczym 50 mg",
        "Wankomycynę w powolnym wlewie dożylnym",
        "Doustny preparat żelaza i witaminę B12"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Złotą zasadą leczenia ostrego niedokrwienia kończyn jest: 'Heparyna natychmiast po wysunięciu podejrzenia'!</strong> Podanie <strong>bolusa heparyny niefrakcjonowanej (<span class='dose-pill'>UFH 5000 j. i.v.</span> lub 70-80 j./kg i.v.)</strong> zapobiega postępowaniu skrzepliny (progresji zatoru) w kierunku obwodowego mikrokrążenia oraz hamuje tworzenie zakrzepicy wstecznej z zastoju krwi w łożysku włośniczkowym. Następnie kontynuuje się wlew ciągły (<span class='dose-pill'>UFH 1000-1200 j./h i.v.</span>) celem utrzymania APTT 1,5-2,5x normy. Podanie heparyny nie opóźnia zabiegu operacyjnego i nie zamyka drogi do embolektomii.",
        "❌ BŁĄD! <strong>Aspiryna w małej dawce nie zatrzyma ostrej narastającej skrzepliny zatorowej w tętnicy głównej.</strong>",
        "❌ BŁĄD! <strong>Antybiotyki nie przywracają perfuzji naczyniowej.</strong>",
        "❌ BŁĄD! <strong>Preparaty żelaza nie mają zastosowania w ostrej niedrożności tętniczej.</strong>"
      ]
    },
    {
      title: "Krok 5: Zabieg operacyjny z wyboru – Embolektomia cewnikiem Fogarty'ego",
      text: "Chory z kategorycznym niedokrwieniem IIb zostaje natychmiast zakwalifikowany do pilnego zabiegu operacyjnego w znieczuleniu miejscowym/regionalnym. Jaki zabieg chirurgiczny jest złotym standardem leczenia ostrego zatoru tętnicy udowo-podkolanowej?",
      options: [
        "Chirurgiczna embolektomia przezskórna/otwarta za pomocą cewnika z balonikiem Fogarty'ego (arteriotomia tętnicy udowej wspólnej, wprowadzenie cewnika za zator, wypełnienie balonika i wyciągnięcie mas zatorowych)",
        "Przeszczepienie nerki z jednoczasowym wycięciem tętnicy udowej",
        "Podwiązanie tętnicy biodrowej wspólnej w celu ochrony przed krwotokiem",
        "Wykonanie protezy aortalno-dwunastniczej"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Embolektomia cewnikiem Fogarty'ego (Fogarty balloon catheter embolectomy) wprowadzona w 1963 roku pozostaje jednym z największych triumfów chirurgii naczyniowej i złotym standardem w leczeniu zatorowości obwodowej.</strong> Zabieg wykonuje się najczęściej w znieczuleniu miejscowym z niewielkiego cięcia w pachwinie. Chirurg odsłania tętnicę udową wspólną, głęboką i powierzchowną, wykonuje podłużną lub poprzeczną arteriotomię, wprowadza giętki cewnik z nienapełnionym balonikiem dystalnie poza zator (np. do tętnic podudzia), napełnia balonik jałowym płynem i wycofuje cewnik, usuwając masy zatorowe i skrzepliny wtórne. Zabieg kończy się oceną napływu i odpływu krwi oraz hemostazą.",
        "❌ BŁĄD! <strong>Przeszczep nerki to nieporozumienie.</strong>",
        "❌ BŁĄD! <strong>Podwiązanie tętnicy spowodowałoby natychmiastową martwicę całej kończyny.</strong>",
        "❌ BŁĄD! <strong>Zabieg dotyczy naczyń kończyny dolnej w pachwinie, a nie aorty i dwunastnicy.</strong>"
      ]
    },
    {
      title: "Krok 6: Zespół ciasnoty przedziałów powięziowych (Compartment Syndrome) i Fasciotomia",
      text: "Po udanej embolektomii i usunięciu zatoru przywrócono silne tętno na obwodzie kończyny. Po 2 godzinach łydka staje się twarda jak drewno, potężnie obrzęknięta, a pacjent krzyczy z powodu rozdzierającego bólu nasilającego się przy biernym prostowaniu palców. Co się stało i jakie postępowanie jest natychmiast bezwzględnie konieczne?",
      options: [
        "Rozwinął się pourazowo-poreperfuzyjny zespół ciasnoty przedziałów powięziowych (compartment syndrome) podudzia; bezwzględnym i natychmiastowym wskazaniem jest chirurgiczna 4-przedziałowa fasciotomia podudzia (nacięcie powięzi przedziałów goleni)",
        "Jest to prawidłowy stan pooperacyjny; należy ciasno owinąć nogę bandażem elastycznym",
        "Wystąpiło zakażenie paciorkowcowe wymagające nacięcia skóry na brzuchu",
        "Należy podać leki nasenne i unieść kończynę powyżej poziomu głowy na 48 godzin"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Zespół poreperfuzyjny i zespół ciasnoty przedziałów (Compartment Syndrome) to jedno z najgroźniejszych powikłań po udanym przywróceniu przepływu w niedokrwionej kończynie!</strong> Uszkodzone przez hipoksję naczynia włosowate gwałtownie przeciekają po przywróceniu ciśnienia hydrostatycznego, powodując masywny obrzęk tkanki mięśniowej w sztywnych, nierozciągliwych przedziałach powięziowych podudzia. Wzrost ciśnienia tkankowego (>30 mmHg) zamyka mikrokrążenie, prowadząc do martwicy mięśni i nerwów (zwłaszcza nerwu strzałkowego głębokiego). <strong>Jedynym leczeniem jest natychmiastowa fasciotomia (decompressive fasciotomy) – obustronne cięcia podłużne goleni odbarczające wszystkie 4 przedziały powięziowe: przedni, boczny, powierzchowny tylny i głęboki tylny!</strong>",
        "❌ BŁĄD! <strong>Bandażowanie elastyczne w ciasnocie przedziałów to zbrodnia medyczna –</strong> zwiększa ciśnienie i natychmiast uśmierca mięśnie!",
        "❌ BŁĄD! <strong>Objawy wynikają z obrzęku reperfuzyjnego w zamkniętych powięziach, a nie infekcji paciorkowcowej.</strong>",
        "❌ BŁĄD! <strong>Wysokie uniesienie kończyny obniża ciśnienie perfuzyjne i pogłębia niedokrwienie mięśni.</strong>"
      ]
    },
    {
      title: "Krok 7: Zespół reperfuzji metabolicznej (Zespół rhabdomiolizy reperfuzyjnej)",
      text: "Po przywróceniu krążenia w ciężko niedokrwionej kończynie do krążenia ogólnego zostają uwolnione toksyczne metabolity z rozpadających się miocytów. Jakie zaburzenia metaboliczne i narządowe wchodzą w skład zespołu poresuscytacyjnego/reperfuzji (crush/reperfusion syndrome) i jak im zapobiegać?",
      options: [
        "Zagrażająca życiu hiperkaliemia, ciężka kwasica metaboliczna, mioglobinuria i ostra niewydolność nerek (cewkowa martwica nerek); zapobieganie polega na agresywnej alkalizacji moczu (wodorowęglan sodu i.v.), forsowaniu diurezy płynami i ewentualnej hemodializie",
        "Hiperkalcemia, zasadowica oddechowa i ostre zapalenie płuc",
        "Hipokaliemia z hiponatremią i natychmiastowym ustąpieniem zmęczenia",
        "Wzrost stężenia ferrytyny bez wpływu na nerki i serce"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Zespół reperfuzyjny (Reperfusion Syndrome) może doprowadzić do nagłego zgonu pacjenta tuż po 'udanym' zabiegu naczyniowym!</strong> Krew wypłukuje z niedokrwionych mięśni olbrzymie ilości: <strong>potasu</strong> (śmiertelna hiperkaliemia wywołująca migotanie komór / asystolię), <strong>kwasu mlekowego</strong> (kwasica metaboliczna) oraz <strong>mioglobiny</strong>. Wolna mioglobina w kwaśnym środowisku cewek nerkowych polimeryzuje do tworzyw żelazistych (ferrochelatyny), zatyka cewki i wywołuje toksyczną ostrą martwicę cewek nerkowych (ATN). Zapobieganie obejmuje: <span class='dose-pill'>NaHCO3 8,4% 100-150 ml i.v.</span> (alkalizacja moczu do pH >6,5), obfite nawadnianie krystaloidami (<span class='dose-pill'>Plasmalyte 3000-4000 ml/d i.v.</span>) oraz podawanie furosemidu/mannitolu pod kontrolą diurezy.",
        "❌ BŁĄD! <strong>Reperfuzja wywołuje hiperkaliemię i kwasicę, a nie hipokaliemię czy zasadowicę.</strong>",
        "❌ BŁĄD! <strong>Hiperkaliemia w zespole reperfuzji jest śmiertelnym zagrożeniem arytmicznym.</strong>",
        "❌ BŁĄD! <strong>Mioglobina bezpośrednio niszczy miąższ nerek, prowadząc do ostrej mocznicy.</strong>"
      ]
    },
    {
      title: "Krok 8: Wtórna profilaktyka przeciwzakrzepowa – zapobieganie nawrotom",
      text: "Pacjent przeszedł udaną embolektomię i fasciotomię. W EKG nadal widoczne jest migotanie przedsionków z CHA2DS2-VASc = 4 pkt. Jaka jest długoterminowa terapia przeciwkrzepliwa z wyboru w celu zapobiegania kolejnym rzutom zatorowości obwodowej?",
      options: [
        "Przewlekłe stosowanie bezpośrednich doustnych antykoagulantów (DOAC, np. apiksaban, rywaroksaban, dabigatran) lub antagonisty witaminy K (VKA z INR 2,0-3,0) do końca życia; bezwzględna edukacja chorego o zakazie samowolnego odstawiania leku!",
        "Stosowanie maści z heparyną miejscowo na stopę przez 3 tygodnie",
        "Wyłącznie zażywanie suplementów z czosnkiem i miłorzębem japońskim",
        "Całkowite odstawienie leczenia przeciwkrzepliwego z powodu ryzyka krwawień"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>U chorych po incydencie zatorowości obwodowej w przebiegu migotania przedsionków (niezastawkowego) bezwzględnym standardem do końca życia jest przewlekła antykoagulacja!</strong> Lekami pierwszego rzutu są <strong>doustne antykoagulanty niebędące antagonistami witaminy K (DOAC)</strong>, np. <span class='dose-pill'>Apiksaban 5 mg p.o. 2x/dobę</span> lub <span class='dose-pill'>Rywaroksaban 20 mg p.o. 1x/dobę</span>, ze względu na wyższy profil bezpieczeństwa (mniejsze ryzyko krwawień wewnątrzczaszkowych) i brak konieczności monitorowania INR w porównaniu do warfaryny/acenokumarolu. Chory musi zostać uświadomiony, że samowolne odstawienie leku grozi natychmiastowym nawrotem zatoru i utratą drugiej kończyny lub udarem mózgu.",
        "❌ BŁĄD! <strong>Maści z heparyną nie wchłaniają się ogólnoustrojowo i nie chronią przed zatorami z serca.</strong>",
        "❌ BŁĄD! <strong>Zioła i suplementy nie mają udowodnionej skuteczności przeciwzakrzepowej.</strong>",
        "❌ BŁĄD! <strong>Odstawienie antykoagulacji u pacjenta po udarze i zatorze tętnicy to skazanie chorego na kolejną zapaść zatorową.</strong>"
      ]
    }
  ],
  pathoNodes: [
    {
      badge: "Zator kardiopochodny",
      title: "Uwięźnięcie skrzepliny w rozwidleniu tętniczym",
      short: "Przemieszczenie skrzepliny z lewego uszka serca (LAA) do tętnicy udowej",
      detail: "Strumień krwi niesie skrzeplinę z migoczącego przedsionka aż do miejsca anatomicznego zwężenia naczynia – rozwidlenia tętnicy udowej wspólnej (CFA). Nagłe odcięcie przepływu zatrzymuje perfuzję obwodową.",
      target: "Rozwidlenie tętnicy udowej i podkolanowej",
      drugTarget: "<span class='dose-pill'>UFH 5000 j. i.v. bolus</span> natychmiastowe zahamowanie apozycji skrzepliny"
    },
    {
      badge: "Okienko niedokrwienne",
      title: "Wrażliwość tkanek na niedotlenienie (Ischemic tolerance)",
      short: "Nerwy (20-30 min) -> Mięśnie (4-6 h) -> Skóra i kości (12-24 h)",
      detail: "Pierwsze ulegają uszkodzeniu neurony czuciowe i ruchowe (parestezje, niedowład). Komórki mięśni szkieletowych wytrzymują bez tlenu do 4-6 godzin; przekroczenie tego czasu prowadzi do nieodwracalnej martwicy i stężenia mięśni (rigor mortis).",
      target: "Pnie nerwowe i włókna mięśniowe goleni",
      drugTarget: "<span class='dose-pill'>Embolektomia Fogarty'ego</span> pilne przywrócenie przepływu w <6 h"
    },
    {
      badge: "Obrzęk reperfuzyjny",
      title: "Przeciek kapilarny i zespół ciasnoty przedziałów",
      short: "Wzrost ciśnienia śródtkankowego >30 mmHg w powięziach goleni",
      detail: "Przywrócenie przepływu przez uszkodzone śródbłonki wywołuje masywny obrzęk komórkowy i śródmiąższowy. W zamkniętych przedziałach powięziowych podudzia ciśnienie tkankowe przekracza ciśnienie włośniczkowe, wtórnie zamykając mikrokrążenie.",
      target: "4 przedziały powięziowe goleni",
      drugTarget: "<span class='dose-pill'>Fasciotomia 4-przedziałowa</span> odbarczenie chirurgiczne powięzi"
    },
    {
      badge: "Toksemia reperfuzyjna",
      title: "Wypłukanie potasu, mioglobiny i mleczanów",
      short: "Śmiertelna hiperkaliemia, kwasica metaboliczna i cewkowa nefropatia",
      detail: "Liza sarkolemmy uwalnia do krążenia ogólnego potas i mioglobinę. Prowadzi to do groźnych arytmii komorowych oraz ostrej martwicy cewek nerkowych (ATN) w mechanizmie wytrącania wałeczków mioglobinowych w kwaśnym moczu.",
      target: "Układ przewodzący serca i kłębuszki/cewki nerkowe",
      drugTarget: "<span class='dose-pill'>NaHCO3 8,4% 100 ml i.v.</span> alkalizacja moczu do pH >6,5"
    }
  ],
  diffTable: {
    title: "⚔️ Tabela Różnicowa: Ostre niedokrwienie kończyny vs Inne ostre stany naczyniowe i neurologiczne kończyn",
    headers: ["Cecha kliniczna", "Ostre niedokrwienie (ALI - zator)", "Ostra zakrzepica tętnicza in situ", "Bolesny obrzęk siniczy (Phlegmasia cerulea dolens)", "Rwa kulszowa (Radikulopatia L5/S1)", "Przewlekłe zagrażające niedokrwienie (CLTI)"],
    rows: [
      ["Początek i wywiad", "Nagły (w ułamku sekundy), zator z serca (AF), brak wcześniejszego chromania", "Podostry (godziny/dni), wieloletnie chromanie przestankowe, uogólniona miażdżyca", "Nagły/podostry; masywna zakrzepica żył biodrowo-udowych, choroba nowotworowa", "Nagły ból po wysiłku/dźwignięciu, wywiad dyskopatii kręgosłupa L-S", "Przewlekły (>2 tyg.): spoczynkowy ból stopy nasilający się w nocy, owrzodzenia"],
      ["Zabarwienie i temperatura skóry", "Trupio blada, woskowa, marmurkowata; skóra lodowato zimna (polar)", "Blada lub sinoczerwona, chłodna, cechy przewlekłej atrofii skóry i paznokci", "Intensywnie sina, fioletowa, ciemnoczerwona; skóra początkowo ucieplona/gorąca", "Skóra o prawidłowym zabarwieniu i prawidłowej temperaturze", "Czerwona w pozycji opuszczonej (rubor), blada po uniesieniu; chłodna"],
      ["Tętno obwodowe", "Gwałtowny brak tętna poniżej przeszkody; obecne prawidłowe tętno na drugiej nodze", "Brak tętna obwodowego; często brak tętna również na drugiej kończynie", "Tętno tętnicze może być niebadalne z powodu potężnego, napiętego obrzęku tkanek", "Tętno w pełni zachowane, symetryczne na obu kończynach", "Brak tętna na stopie (t. grzbietowa i piszczelowa tylna) obustronnie lub jednostronnie"],
      ["Obrzęk kończyny", "Brak obrzęku w początkowej fazie (łydka wiotka, zapadnięte żyły powierzchowne)", "Brak obrzęku lub dyskretny; żyły zapadnięte", "Masywny, potężny, twardy jak kamień obrzęk całego uda, podudzia i stopy", "Brak obrzęku obwodowego", "Możliwy obrzęk z grawitacyjnego opuszczania nogi z łóżka"],
      ["Deficyt neurologiczny", "Wczesny ubytek czucia i wczesny niedowład zgięcia stopy (kategoria IIb)", "Późniejszy i wolniej narastający dzięki krążeniu obocznemu", "Późny ubytek czucia z powodu wtórnego ucisku przedziałów naczyniowych", "Ból promieniujący z pośladka po tylnej powierzchni uda; objaw Lasegue'a dodatni", "Przewlekła polineuropatia cukrzycowa, pieczenie stóp w nocy"],
      ["Leczenie pierwszego rzutu", "Pilna embolektomia cewnikiem Fogarty'ego + UFH i.v. w ciągu <6 h", "Tromboliza celowana przezcewnikowa (CDT) lub bypass chirurgiczny w trybie pilnym", "Natychmiastowa pełna antykoagulacja LMWH/UFH + pilna trombektomia / tromboliza żylna", "Rehabilitacja, analgetyki (NLPZ, paracetamol), leki przeciwbólowe neuropatyczne", "Planowa rewaskularyzacja endowaskularna (PTA/stent) lub bypass żylny"]
    ]
  },
  dutySummary: {
    overview: "Ostre niedokrwienie kończyny dolnej (Acute Limb Ischemia – ALI) jest stanem bezpośredniego zagrożenia utratą kończyny i życia pacjenta, definiowanym jako nagły spadek perfuzji kończyny trwający poniżej 14 dni. Złote okno czasowe na przywrócenie krążenia bez nieodwracalnej martwicy mięśni wynosi zaledwie 4-6 godzin. Natychmiastowe wdrożenie heparyny oraz pilna interwencja chirurgiczna decydują o uratowaniu nogi.",
    diagnostics: "1. Ocena kliniczna wg reguły 6P: ból (Pain), bladość (Pallor), brak tętna (Pulselessness), parestezje (Paresthesia), niedowład (Paralysis) i chłód (Polar).<br>2. Pilna stratyfikacja stopnia niedokrwienia wg klasyfikacji Rutherforda (ocena czucia, siły mięśniowej oraz sygnałów dopplerowskich tętniczych i żylnych).<br>3. Przyłóżkowe badanie Dopplerem fal ciągłych (handheld Doppler): ocena obecności sygnału przepływu w tętnicy grzbietowej stopy i piszczelowej tylnej.<br>4. Pilne Angio-TK tętnic kończyn dolnych: wskazane u chorych stabilnych (Rutherford I/IIa); w kategorii IIb chory kierowany jest natychmiast na salę operacyjną bez opóźniania zabiegu tomografią!<br>5. Badania laboratoryjne: CPK i mioglobina (ocena rozpadu mięśni), potas, kreatynina, gazometria i układ krzepnięcia.",
    drugsAndDoses: "1. Heparyna niefrakcjonowana natychmiast na SOR: <span class='dose-pill'>UFH 5000 j.m. i.v. bolus</span> (lub 80 j./kg i.v.), a następnie wlew ciągły <span class='dose-pill'>1000-1200 j./h i.v.</span> pod kontrolą docelowego APTT (1,5-2,5x normy).<br>2. Analgezja opioidowa: <span class='dose-pill'>Morfina 5-10 mg s.c./i.v.</span> lub <span class='dose-pill'>Fentanyl 50-100 µg i.v.</span> w celu opanowania rozdzierającego bólu niedokrwiennego.<br>3. Płynoterapia i alkalizacja moczu przed i w trakcie reperfuzji (ochrona przed zawałem nerek mioglobiną):<br>   - <span class='dose-pill'>Plasmalyte 2500-3500 ml/dobę i.v.</span><br>   - <span class='dose-pill'>Wodorowęglan sodu (NaHCO3) 8,4% 100 ml i.v.</span> we wlewie (cel pH moczu >6,5).<br>4. Długoterminowa antykoagulacja po zabiegu: <span class='dose-pill'>Apiksaban 5 mg p.o. co 12 h</span> lub <span class='dose-pill'>Rywaroksaban 20 mg p.o. raz/dobę</span> do końca życia.",
    procedures: "1. Założenie wkłucia dożylnego o dużym świetle (16-18G) i cewnika Foleya celem ścisłej kontroli diurezy godzinowej (>1 ml/kg/h w zespole mioglobinurii).<br>2. Chirurgiczna embolektomia balonowa cewnikiem Fogarty'ego w znieczuleniu miejscowym/ogólnym z dostępu przez tętnicę udową wspólną w pachwinie.<br>3. Śródoperacyjna angiografia kontrolna celem oceny spływu obwodowego do stopy.<br>4. Pilna 4-przedziałowa fasciotomia podudzia (nacięcie powięzi przedziału przedniego, bocznego, tylnego powierzchownego i głębokiego) w przypadku podejrzenia zespołu ciasnoty przedziałów lub długiego czasu niedokrwienia (>4-6 h).",
    monitoring: "1. Ścisła kontrola tętna obwodowego i nawrotu kapilarnego na operowanej stopie co 1 godzinę przez pierwsze 24 h.<br>2. Regularne badanie napięcia mięśni łydki i ocena bólu przy biernym rozciąganiu palców stóp (wczesne wykrycie ciasnoty powięziowej).<br>3. Oznaczanie stężenia potasu w surowicy krwi co 2-4 godziny w okresie wczesnej reperfuzji (zagrożenie nagłą hiperkaliemią).<br>4. Monitorowanie barwy moczu (ciemnobrunatny mocz koloru 'coca-coli' świadczy o masywnej mioglobinurii) oraz kontrola parametrów nerkowych (mocznik, kreatynina)."
  },
  lekQuestions: [
    {
      question: "Złotą regułą postępowania przedszpitalnego i na szpitalnym oddziale ratunkowym u każdego chorego z podejrzeniem ostrego zatorowego niedokrwienia kończyny dolnej jest:",
      options: [
        "Natychmiastowe dożylne podanie bolusa heparyny niefrakcjonowanej (UFH ok. 5000 j.m. lub 70-80 j./kg)",
        "Podanie kwasu foliowego i doustnego preparatu żelaza",
        "Ciasne obandażowanie kończyny opaską uciskową Esmarcha",
        "Wstrzyknięcie glikokortykosteroidu do stawu kolanowego",
        "Zlecenie badania RTG kości podudzia i oczekiwanie na opis"
      ],
      correct: 0,
      expl: "Zgodnie z międzynarodowymi wytycznymi naczyniowymi, natychmiastowe podanie heparyny niefrakcjonowanej (UFH bolus 5000 j. lub 70-80 j./kg i.v.) jest pierwszym i najważniejszym krokiem leczniczym. Zabezpiecza to przed narastaniem skrzepliny w kierunku obwodowym (apositional thrombosis) i zamykaniem mikrokrążenia przed planowaną interwencją zabiegową."
    },
    {
      question: "Zgodnie z klasyfikacją Rutherforda dla ostrego niedokrwienia kończyny dolnej, obecność ubytku czucia obejmującego więcej niż palce stopy oraz wystąpienie niedowładu mięśniowego (osłabienie zgięcia stopy) kwalifikuje chorego do kategorii:",
      options: [
        "Kategorii IIb (kończyna natychmiastowo zagrożona)",
        "Kategorii I (kończyna żywotna)",
        "Kategorii IIa (kończyna brzeżnie zagrożona)",
        "Kategorii III (nieodwracalne niedokrwienie)",
        "Kategorii IV (niedokrwienie czynnościowe)"
      ],
      correct: 0,
      expl: "Kategoria IIb według Rutherforda oznacza kończynę natychmiastowo zagrożoną (immediately threatened). Charakteryzuje się wystąpieniem deficytu ruchowego (niedowład mięśniowy palców lub stopy) oraz rozleglejszego ubytku czucia. Wymaga natychmiastowej rewaskularyzacji chirurgicznej w ciągu kilku godzin."
    },
    {
      question: "Obecność stężenia pośmiertnego mięśni (sztywności mięśniowej / rigor mortis) oraz marmurkowatego zasinienia skóry nieblednącego pod uciskiem u chorego z ostrym niedokrwieniem kończyny oznacza:",
      options: [
        "Kategorię III Rutherforda – nieodwracalne niedokrwienie i martwicę tkanek będącą bezwzględnym wskazaniem do pierwotnej amputacji",
        "Kategorię I Rutherforda – pełną odwracalność zmian po podaniu leków rozkurczowych",
        "Przejściowy skurcz mięśniowy ustępujący po masażu łydki",
        "Wskazanie do natychmiastowej trombolizy celowanej z dawki podwójnej",
        "Zapalenie stawu skokowego o etiologii dnawawej"
      ],
      correct: 0,
      expl: "Sztywność mięśniowa (stężenie mięśni) świadczy o nieodwracalnej martwicy miocytów (Kategoria III Rutherforda). Próba rewaskularyzacji takiej kończyny jest błędem w sztuce, ponieważ uwolnienie olbrzymich mas mioglobiny, kwasu mlekowego i potasu do krążenia ogólnego prowadzi do zgonu pacjenta w mechanizmie zatrzymania krążenia lub niewydolności nerek. Jedynym leczeniem jest pierwotna amputacja."
    },
    {
      question: "Klasyczna 'reguła 6P' w diagnostyce ostrego niedokrwienia kończyny dolnej obejmuje objawy:",
      options: [
        "Pain, Pallor, Pulselessness, Paresthesia, Paralysis, Polar (poikilothermia)",
        "Proteinuria, Pyuria, Pollakiuria, Polydipsia, Polyphagia, Pallor",
        "Petechiae, Purpura, Pruritus, Pemphigus, Pyrexia, Parotitis",
        "Phlebitis, Pleuritis, Pericarditis, Pancreatitis, Periostitis, Paraplegia",
        "Ptosis, Proptosis, Papilloma, Polyp, Psoriasis, Paralysis"
      ],
      correct: 0,
      expl: "Reguła 6P to: Pain (ból), Pallor (bladość), Pulselessness (brak tętna), Paresthesia (zaburzenia czucia / parestezje), Paralysis (porażenie / niedowład ruchowy) oraz Polar / Poikilothermia (chłód kończyny)."
    },
    {
      question: "Zabiegiem operacyjnym z wyboru o udowodnionej najwyższej skuteczności w leczeniu ostrego zatoru tętnicy udowo-podkolanowej jest:",
      options: [
        "Embolektomia chirurgiczna cewnikiem z balonikiem Fogarty'ego",
        "Planowe wytworzenie przetoki tętniczo-żylnej Cimino-Brescia",
        "Wycięcie mięśnia trójgłowego łydki bez naruszania tętnicy",
        "Zespolenie omijające z tętnicy promieniowej",
        "Wstrzyknięcie sklerozantu w pianie do tętnicy udowej"
      ],
      correct: 0,
      expl: "Chirurgiczna embolektomia za pomocą cewnika balonowego Fogarty'ego (wprowadzonego przez arteriotomię tętnicy udowej wspólnej) pozostaje złotym standardem leczenia ostrej zatorowości tętnic obwodowych. Pozwala na szybkie, mechaniczne usunięcie skrzepliny i przywrócenie perfuzji."
    },
    {
      question: "Gwałtowny obrzęk łydki, potężny ból nasilający się przy biernym rozciąganiu mięśni oraz twardość tkanek podudzia po udanej embolektomii tętniczej świadczą o:",
      options: [
        "Poreperfuzyjnym zespole ciasnoty przedziałów powięziowych (Compartment Syndrome) wymagającym natychmiastowej fasciotomii",
        "Prawidłowej fizjologicznej adaptacji naczyń krwionośnych do tlenu",
        "Róży pęcherzowej wywołanej przez paciorkowce grupy A",
        "Pęknięciu ścięgna Achillesa w trakcie znieczulenia",
        "Odwodnieniu komórkowym wymagającym wstrzymania płynoterapii"
      ],
      correct: 0,
      expl: "Wzrost przepuszczalności kapilar po reperfuzji niedokrwionych mięśni prowadzi do obrzęku w zamkniętych przestrzeniach powięziowych goleni. Wzrost ciśnienia śródtkankowego (>30 mmHg) wywołuje zespół ciasnoty przedziałów (Compartment Syndrome), co wymaga natychmiastowej ratunkowej 4-przedziałowej fasciotomii."
    },
    {
      question: "W celu ochrony nerek przed ostrą martwicą cewek nerkowych (ATN) wywołaną masywną mioglobinurią po przywróceniu przepływu w niedokrwionej kończynie, zaleca się:",
      options: [
        "Intensywne nawadnianie dożylne krystaloidami oraz alkalizację moczu wodorowęglanem sodu (NaHCO3 do pH >6,5)",
        "Zakwaszanie moczu dużymi dawkami kwasu askorbinowego (witaminy C)",
        "Ograniczenie podawania płynów do maksymalnie 500 ml na dobę",
        "Podanie leków obkurczających naczynia nerkowe",
        "Podawanie doustnych soli wapnia bez podawania płynów"
      ],
      correct: 0,
      expl: "Mioglobina uwolniona z uszkodzonych mięśni polimeryzuje i wytrąca się w cewkach nerkowych w środowisku kwaśnym. Alkalizacja moczu za pomocą dożylnego wodorowęglanu sodu (cel pH moczu >6,5) w połączeniu z forsowaną diurezą płynami zbilansowanymi zapobiega nefrotoksyczności mioglobiny."
    },
    {
      question: "Które z poniższych źródeł odpowiada za powstanie ponad 70-80% wszystkich zatorów obwodowych tętnic kończyn dolnych?",
      options: [
        "Serce (migotanie przedsionków, skrzeplina w lewej komorze po zawale, wady zastawkowe)",
        "Żyły głębokie podudzia (zator typowy bez ubytku w przegrodzie)",
        "Tętnice nerkowe z powodu zwężenia miażdżycowego",
        "Żyła wrotna w marskości wątroby",
        "Tętnice mózgowe koła Willisa"
      ],
      correct: 0,
      expl: "Ponad 70-80% zatorów obwodowych ma źródło w jamach serca. Najczęstszą przyczyną jest migotanie przedsionków (skrzeplina formująca się w uszku lewego przedsionka), a kolejnymi: skrzeplina przyścienna lewej komory po zawale serca, tętniak lewej komory oraz wegetacje bakteryjne na zastawkach."
    },
    {
      question: "Wskaż prawidłowy czas tolerancji całkowitego niedokrwienia ciepłego (warm ischemia time) dla poszczególnych tkanek kończyny dolnej w kolejności od najbardziej do najmniej wrażliwej:",
      options: [
        "Włókna nerwowe (20-30 min) -> mięśnie szkieletowe (4-6 godz.) -> tkanka tłuszczowa, skóra i kość (12-24 godz.)",
        "Kość -> skóra -> mięśnie -> nerwy",
        "Wszystkie tkanki mają identyczny czas przeżycia wynoszący dokładnie 12 godzin",
        "Skóra (15 min) -> kość (1 godz.) -> nerwy (24 godz.)",
        "Mięśnie szkieletowe (10 min) -> nerwy (48 godz.) -> skóra (72 godz.)"
      ],
      correct: 0,
      expl: "Tkanka nerwowa jest najbardziej podatna na hipoksję – zaburzenia przewodnictwa pojawiają się już po 20-30 minutach. Mięśnie szkieletowe wykazują nieodwracalne uszkodzenia martwicze po 4-6 godzinach całkowitego niedokrwienia. Skóra, powięzie i kości wykazują najwyższą odporność na brak tlenu (do 12-24 godzin)."
    },
    {
      question: "Jakie jest postępowanie długofalowe z wyboru u pacjenta po udanej embolektomii zatoru tętnicy udowej w przebiegu utrwalonego migotania przedsionków?",
      options: [
        "Przewlekłe stosowanie doustnego antykoagulantu (DOAC lub VKA) do końca życia pod stałą kontrolą lekarską",
        "Podawanie aspiryny w małej dawce przez 14 dni, a następnie zakończenie leczenia",
        "Stosowanie wyłącznie pończoch uciskowych bez farmakoterapii",
        "Okresowe nakłuwanie żył odpiszczelowych celem upustu krwi",
        "Podawanie dożylne heparyny drobnocząsteczkowej raz w miesiącu"
      ],
      correct: 0,
      expl: "Pacjent z migotaniem przedsionków po przebytym powikłaniu zatorowym (CHA2DS2-VASc >=2 u m, >=3 u k) ma bezwzględne wskazanie do przewlekłego, bezterminowego stosowania doustnego leczenia przeciwkrzepliwego (preferencyjnie DOAC: apiksaban, rywaroksaban, dabigatran, edoksaban) celem zapobiegania nawrotom zatorowości i udarowi mózgu."
    },
    {
      question: "Ile przedziałów powięziowych podudzia należy naciąć podczas pełnej odbarczającej fasciotomii podudzia w zespole ciasnoty przedziałów powięziowych?",
      options: [
        "4 przedziały: przedni, boczny, tylny powierzchowny i tylny głęboki",
        "Wyłącznie 1 przedział przedni",
        "2 przedziały: wyłącznie podskórny i skórny",
        "10 przedziałów międzymięśniowych",
        "Fasciotomia polega na nacięciu wyłącznie torebki stawu kolanowego"
      ],
      feedback: "",
      correct: 0,
      expl: "Podudzie dzieli się na 4 odrębne anatomiczne przedziały powięziowe: przedni, boczny, tylny powierzchowny oraz tylny głęboki. Aby skutecznie zlikwidować zespół ciasnoty przedziałów powięziowych, konieczne jest nacięcie powięzi wszystkich 4 przedziałów (standardowo wykonuje się to z dwóch podłużnych cięć skórnych: przednio-bocznego i przyśrodkowego)."
    }
  ],
  flashcards: [
    {
      front: "Co oznacza reguła 6P w ostrym niedokrwieniu kończyny (ALI)?",
      back: "1. Pain (ból),\n2. Pallor (bladość),\n3. Pulselessness (brak tętna),\n4. Paresthesia (drętwienie/ubytek czucia),\n5. Paralysis (porażenie/niedowład),\n6. Polar / Poikilothermia (chłód kończyny)."
    },
    {
      front: "Co oznacza Kategoria IIb w klasyfikacji Rutherforda dla ALI?",
      back: "Kończyna natychmiastowo zagrożona: obecny ubytek czucia obejmujący stopę oraz niedowład ruchowy mięśni. Wskazanie do natychmiastowej rewaskularyzacji operacyjnej w ciągu kilku godzin!"
    },
    {
      front: "Czym różni się Kategoria III Rutherforda i jak się ją leczy?",
      back: "Nieodwracalna martwica tkanek ze sztywnością mięśniową (rigor mortis). Próba rewaskularyzacji grozi śmiertelną hiperkaliemią i kwasicą; jedynym leczeniem jest pierwotna amputacja."
    },
    {
      front: "Jaki lek należy podać natychmiast po wysunięciu podejrzenia ALI?",
      back: "Heparynę niefrakcjonowaną w bolusie i.v. (UFH 5000 j.m. lub 70-80 j./kg i.v.), a następnie wlew ciągły (APTT 1,5-2,5x normy), aby zapobiec narastaniu skrzepliny."
    },
    {
      front: "Co to jest zespół ciasnoty przedziałów (compartment syndrome) po reperfuzji?",
      back: "Wzrost ciśnienia śródtkankowego (>30 mmHg) w powięziach goleni wskutek obrzęku reperfuzyjnego. Objawia się twardością łydki i bólem przy biernym rozciąganiu; wymaga natychmiastowej 4-przedziałowej fasciotomii."
    },
    {
      front: "Jak chronić nerki przed mioglobinurią w zespole reperfuzyjnym?",
      back: "Intensywna płynoterapia zbilansowanymi krystaloidami oraz alkalizacja moczu wodorowęglanem sodu (NaHCO3 i.v.) do osiągnięcia pH moczu >6,5."
    }
  ]
};

async function run() {
  console.log("Generating Case 141: Ostre niedokrwienie kończyny dolnej (ALI)...");
  
  // Mirroring
  case141.steps.forEach(s => {
    s.question = s.title;
    s.explanation = s.feedback ? s.feedback[0] : "";
  });
  
  case141.lekQuestions.forEach(q => {
    q.opts = q.options;
    q.correctIdx = q.correct;
    q.exp = q.expl;
  });
  
  const enc = await encryptStringAes(JSON.stringify(case141, null, 2), MASTER_KEY);
  fs.writeFileSync(path.join('cases', '141_ostre_niedokrwienie_konczyny_dolnej.json'), JSON.stringify(enc, null, 2), 'utf8');
  console.log("[SAVED] Case #141: 141_ostre_niedokrwienie_konczyny_dolnej.json (LEK Qs: " + case141.lekQuestions.length + ", Steps: " + case141.steps.length + ", Flashcards: " + case141.flashcards.length + ")");
}

run();

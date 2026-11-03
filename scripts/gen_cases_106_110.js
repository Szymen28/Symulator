const fs = require('fs');
const { encryptStringAes } = require('./encrypt_case.js');
const PASSWORD = '@LEKSzymon28111999';

const cases = [
  // 106: Typowy STEC-HUS
  {
    id: 106,
    filename: "106_stec_hus.json",
    dept: "Pediatria",
    shortTitle: "4-letni chłopiec – Krwista biegunka, bladość powłok, wybroczyny i bezmocz (Typowy STEC-HUS)",
    diagnosisTitle: "Typowy zespół hemolityczno-mocznicowy zależny od toksyny Shiga (STEC-HUS / D+ HUS)",
    vitals: [
      { label: "HR", val: "138/min", sub: "Tachykardia kompensacyjna", status: "warn" },
      { label: "BP", val: "125/82 mmHg", sub: "Nadciśnienie tętnicze dla wieku", status: "bad" },
      { label: "SpO2", val: "97%", sub: "Prawidłowa", status: "ok" },
      { label: "RR", val: "28/min", sub: "Lekkie przyspieszenie", status: "warn" },
      { label: "Temp", val: "37.4°C", sub: "Stan podgorączkowy", status: "ok" }
    ],
    vitalsObj: { hr: 138, bp: "125/82", spo2: 97, rr: 28, temp: 37.4 },
    story: "4-letni chłopiec został skierowany na SOR w 6. dobie choroby. Przed 5 dniami wystąpiły u niego kurczowe bóle brzucha i wodnista, a od 3 dni silnie krwista biegunka (stolec podbiegnięty świeżą krwią). Dziś matka zauważyła narastające osłabienie, skrajną bladość skóry z woskowym odcieniem, pojedyncze wybroczyny na tułowiu oraz brak mikcji od ponad 12 godzin (pielucha zupełnie sucha). W badaniu fizykalnym: dziecko podsypiające, blado-woskowe zabarwienie powłok, podbiegnięcia krwawe i drobne petocje na skórze kończyn, niewielkie obrzęki powiek. Brzuch wzdęty, bolesny rozlanie, perystaltyka leniwa.",
    labs: [
      {
        category: "Morfologia krwi i rozmaz krwi obwodowej",
        items: [
          { name: "Hemoglobina (Hb)", val: "6.8 g/dL", norm: "11.5–14.5 g/dL", flag: "L" },
          { name: "Hematokryt (Hct)", val: "21%", norm: "34–40%", flag: "L" },
          { name: "Płytki krwi (PLT)", val: "28 G/L", norm: "150–450 G/L", flag: "L" },
          { name: "Leukocyty (WBC)", val: "16.8 G/L", norm: "5.5–15.5 G/L", flag: "H" },
          { name: "Rozmaz mikroskopowy krwi", val: "Liczne schizocyty (fragmenty krwinek 6%), retikulocytoza 7.5%", norm: "Schizocyty nieobecne, retikulocyty <1.5%", flag: "H" }
        ]
      },
      {
        category: "Parametry nerkowe, elektrolity i hemoliza",
        items: [
          { name: "Kreatynina surowicy", val: "3.6 mg/dL", norm: "0.3–0.6 mg/dL", flag: "H" },
          { name: "Mocznik", val: "148 mg/dL", norm: "15–38 mg/dL", flag: "H" },
          { name: "Potas (K+)", val: "6.1 mmol/L", norm: "3.5–5.1 mmol/L", flag: "H" },
          { name: "Bilirubina całkowita (z przewagą wolnej)", val: "3.2 mg/dL", norm: "0.2–1.0 mg/dL", flag: "H" },
          { name: "LDH (dehydrogenaza mleczanowa)", val: "2850 IU/L", norm: "120–300 IU/L", flag: "H" },
          { name: "Haptoglobina", val: "< 0.05 g/L (nieoznaczalna)", norm: "0.3–2.0 g/L", flag: "L" }
        ]
      },
      {
        category: "Układ krzepnięcia i badania mikrobiologiczne",
        items: [
          { name: "Bezpośredni test Coombsa (BTA)", val: "Ujemny", norm: "Ujemny", flag: "N" },
          { name: "INR / APTT", val: "1.05 / 32 s", norm: "0.9–1.2 / 26–36 s", flag: "N" },
          { name: "Fibrynogen", val: "3.4 g/L", norm: "2.0–4.0 g/L", flag: "N" },
          { name: "Toksyna Shiga w kale (PCR / EIA)", val: "Dodatnia (STEC stx1 / stx2)", norm: "Ujemna", flag: "H" }
        ]
      }
    ],
    steps: [
      {
        num: 1,
        title: "Identyfikacja klasycznej triady objawów HUS",
        task: "U 4-letniego dziecka z wywiadem krwistej biegunki stwierdzasz: anemię ze schizocytami, małopłytkowość 28 G/L oraz ostre uszkodzenie nerek (kreatynina 3.6 mg/dL, anuria). Jaką jednostkę chorobową rozpoznajesz?",
        options: [
          { text: "Zespół hemolityczno-mocznicowy (typowy STEC-HUS)", correct: true, feedback: "Prawidłowo! Klasyczna triada HUS to: mikroangiopatyczna niedokrwistość hemolityczna (MAHA, ze schizocytami i ujemnym odczynem Coombsa), małopłytkowość oraz ostre uszkodzenie nerek (AKI). Poprzedzenie objawami krwistej biegunki (D+ HUS) wskazuje na zakażenie STEC." },
          { text: "Rozsiane wykrzepianie wewnątrznaczyniowe (DIC)", correct: false, feedback: "Błąd! W DIC dochodzi do zużycia czynników krzepnięcia (wydłużenie PT/INR i APTT, spadek fibrynogenu), podczas gdy w HUS koagulogram z reguły pozostaje w granicach normy." },
          { text: "Sepsa meningokokowa", correct: false, feedback: "Błąd! Brak gorączki, sztywności karku; obecny typowy wywiad krwistej biegunki z triadą MAHA, trombocytopenii i niewydolności nerek." },
          { text: "Idiopatyczna plamica małopłytkowa (ITP)", correct: false, feedback: "Błąd! W ITP występuje izolowana trombocytopenia bez hemolizy mikroangiopatycznej i bez uszkodzenia nerek." }
        ]
      },
      {
        num: 2,
        title: "Kluczowa decyzja dotycząca antybiotykoterapii",
        task: "Młodszy lekarz dyżurny proponuje natychmiastowe włączenie cyprofloksacyny lub ceftriaksonu w celu eradykacji E. coli z przewodu pokarmowego. Jaka jest prawidłowa decyzja?",
        options: [
          { text: "BEZWZGLĘDNY ZAKAZ podawania antybiotyków w zakażeniu STEC – antybiotykoterapia dramatycznie zwiększa uwalnianie toksyny Shiga i nasila uszkodzenie nerek!", correct: true, feedback: "Kluczowy punkt LEK! Antybiotyki (zwłaszcza bakteriobójcze uszkadzające ścianę komórkową) powodują gwałtowny rozpad pałeczek E. coli i masywny wyrzut toksyny Shiga (Stx-1, Stx-2) do krwioobiegu, istotnie zwiększając ryzyko rozwoju i ciężkość HUS. Podobnie przeciwwskazane są leki hamujące motorykę jelit (loperamid)." },
          { text: "Zgoda na podanie ciprofloksacyny w maksymalnej dawce", correct: false, feedback: "Karygodny błąd! Zwiększa ryzyko zgonu i zaostrzenia HUS." },
          { text: "Podanie gentamycyny z wankomycyną doustnie", correct: false, feedback: "Błąd! Antybiotyki w STEC są przeciwwskazane, a aminoglikozydy dodatkowo nasilają nefrotoksyczność w anurycznym AKI." },
          { text: "Podanie loperamidu w celu zatrzymania biegunki", correct: false, feedback: "Bezwzględnie przeciwwskazane! Loperamid wydłuża kontakt toksyny z błoną śluzową jelita i ułatwia jej wchłanianie do krwioobiegu." }
        ]
      },
      {
        num: 3,
        title: "Postępowanie z hiperkaliemią w anurii",
        task: "Poziom potasu u pacjenta wynosi 6.1 mmol/L, a w EKG widoczne są wysokie, symetryczne załamki T. Dziecko nie oddaje moczu od 12 godzin. Jakie jest pilne postępowanie?",
        options: [
          { text: "Dożylne podanie 10% glukonianu wapnia w celu stabilizacji kardiomiocytów, wlew glukozy z insuliną oraz przygotowanie do leczenia nerkozastępczego", correct: true, feedback: "Znakomicie! Przy hiperkaliemii ze zmianami w EKG priorytetem jest ochrona mięśnia sercowego (glukonian wapnia i.v.), obniżenie kaliemii (insulina + glukoza, nebulizacja z salbutamolu) oraz pilna kwalifikacja do dializoterapii u anurycznego dziecka." },
          { text: "Forsowna diureza za pomocą 100 mg furosemidu bez kontroli", correct: false, feedback: "Błąd! W ostrej martwicy cewek w przebiegu HUS furosemid nie przywróci filtracji, a może wywołać toksyczność uszną." },
          { text: "Wlew 500 ml 0.9% NaCl z dodatkiem chlorku potasu", correct: false, feedback: "Śmiertelny błąd! Dodanie potasu do wlewu u pacjenta z K+ 6.1 mmol/L w bezmoczu doprowadzi do zatrzymania krążenia w asystolii." },
          { text: "Czekanie do rana na powtórzenie badania elektrolitów", correct: false, feedback: "Zagrożenie nagłym zatrzymaniem krążenia!" }
        ]
      },
      {
        num: 4,
        title: "Kwalifikacja do leczenia nerkozastępczego",
        task: "Dziecko ma anurię, kreatyninę 3.6 mg/dL, narastające cechy przewodnienia i oporną hiperkaliemię. Jaka metoda leczenia nerkozastępczego jest najczęściej wybierana u małych dzieci z HUS?",
        options: [
          { text: "Pilna dializa otrzewnowa (lub hemodializa / hemofiltracja ciągła CVVH)", correct: true, feedback: "Prawidłowo! Dializa otrzewnowa jest bezpieczną, nieobciążającą hemodynamicznie i wysoce skuteczną metodą leczenia ostrej niewydolności nerek u małych dzieci w HUS, eliminującą przewodnienie i toksyny mocznicowe." },
          { text: "Przeszczepienie nerki w trybie ratunkowym", correct: false, feedback: "Absurdalne w fazie ostrej aktywnego zakażenia STEC." },
          { text: "Zastosowanie samej wymiany osocza (plazmaferezy) bez dializy", correct: false, feedback: "W typowym STEC-HUS plazmafereza nie ma udowodnionej skuteczności (w przeciwieństwie do atypowego aHUS)." },
          { text: "Ograniczenie podaży jakichkolwiek płynów i leków na 48 godzin", correct: false, feedback: "Nie leczy przyczyny i doprowadzi do zgonu mocznicowego." }
        ]
      },
      {
        num: 5,
        title: "Zasady przetaczania krwi i płytek krwi w HUS",
        task: "Hemoglobina wynosi 6.8 g/dL, a płytki krwi 28 G/L. Pacjent nie krwawi czynnie z ran ani przewodu pokarmowego. Jakie są zasady transfuzji w HUS?",
        options: [
          { text: "Przetoczenie ubogoleukocytarnego koncentratu krwinek czerwonych (KKCz); płytek krwi (KKP) NIE przetacza się rutynowo, chyba że występuje krwawienie zagrażające życiu lub konieczny jest zabieg inwazyjny", correct: true, feedback: "Doskonale! Płytki krwi przetacza się wyłącznie przy masywnym krwawieniu lub przed wkłuciem naczyniowym/zabiegiem operacyjnym. Rutynowa podaż KKP nasila tworzenie mikrozakrzepów w mikrokrążeniu kłębuszkowym ('dolewanie oliwy do ognia'). Niedokrwistość objawową wyrównuje się ostrożnym przetoczeniem KKCz." },
          { text: "Natychmiastowe przetoczenie 3 jednostek KKP, aby podnieść płytki > 100 G/L", correct: false, feedback: "Błąd! Przetoczenie płytek w HUS bez krwawienia zaostrza mikroangiopatię zakrzepową w nerkach." },
          { text: "Przetoczenie krwi pełnej konserwowanej ze świeżym osoczem", correct: false, feedback: "Nieuzasadnione obciążenie płynowe u dziecka z anurią." },
          { text: "Zaniechanie przetoczenia krwinek czerwonych nawet przy Hb < 4 g/dL", correct: false, feedback: "Błąd! Głęboka niedokrwistość zagraża hipoksją tkankową i niewydolnością serca." }
        ]
      },
      {
        num: 6,
        title: "Różnicowanie typowego HUS (STEC-HUS) z atypowym HUS (aHUS)",
        task: "W jakich sytuacjach należy rozważyć atypowy zespół hemolityczno-mocznicowy (aHUS związany z niekontrolowaną aktywacją alternatywnej drogi dopełniacza) i zastosowanie ekulizumabu?",
        options: [
          { text: "Brak wywiadu biegunkowego (D- HUS), ujemne testy na STEC, nawrót epizodu HUS lub brak poprawy po fazie ostrej", correct: true, feedback: "Bardzo dobrze! aHUS (atypowy HUS) wynika z wrodzonych defektów białek regulatorowych dopełniacza (CFH, CFI, MCP, CD46). Nie jest poprzedzony STEC i lekiem z wyboru jest humanizowane przeciwciało monoklonalne anty-C5 (ekulizumab)." },
          { text: "U każdego pacjenta z obecnością toksyny Shiga w kale", correct: false, feedback: "Błąd! Obecność toksyny Shiga definiuje typowy STEC-HUS, w którym ekulizumab nie jest standardem." },
          { text: "Tylko u dorosłych palaczy tytoniu", correct: false, feedback: "Nieprawda – aHUS występuje w każdym wieku, także u noworodków i niemowląt." },
          { text: "Gdy w badaniu moczu nie ma białka", correct: false, feedback: "Nielogiczne – w mikroangiopatii nerkowej zawsze występuje białkomocz i krwinkomocz." }
        ]
      },
      {
        num: 7,
        title: "Płynoterapia i monitorowanie bilansu płynów",
        task: "W fazie anurii, jak należy precyzyjnie bilansować dożylną podaż płynów u dziecka?",
        options: [
          { text: "Płyny ściśle na pokrycie strat bezwzględnych (perspiratio insensibilis: 300–400 mL/m2 pc./d) + objętość oddanego moczu i bieżących strat (wymioty, stolec)", correct: true, feedback: "Znakomicie! W anurii podaż płynów musi być ściśle ograniczona do strat niewidocznych przez skórę i płuca oraz strat patologicznych, aby zapobiec obrzękowi płuc i nadciśnieniu z przewodnienia." },
          { text: "Wlew forsowny 3000 mL/m2 pc./dobę 0.9% NaCl", correct: false, feedback: "Doprowadzi do ostrego obrzęku płuc i zgonu z przewodnienia!" },
          { text: "Całkowity zakaz płynów bez pokrycia strat niewidocznych", correct: false, feedback: "Spowoduje odwodnienie komórkowe i hipernatremię." },
          { text: "Wlew płynów tylko po podaniu 20% mannitolu", correct: false, feedback: "Mannitol w anurii powoduje hiperosmolarność i niewydolność krążenia." }
        ]
      },
      {
        num: 8,
        title: "Odległe rokowanie i powikłania narządowe",
        task: "Jakie jest typowe rokowanie u dzieci po przebyciu STEC-HUS i jakie powikłania wymagają długoterminowego monitorowania nefrologicznego?",
        options: [
          { text: "Większość (>70-85%) dzieci odzyskuje prawidłową funkcję nerek, jednak wymagają wieloletniej kontroli pod kątem nadciśnienia tętniczego, białkomoczu i przewlekłej choroby nerek", correct: true, feedback: "Świetnie! Choć śmiertelność w ostrej fazie spadła poniżej 3-5% dzięki wczesnej dializoterapii, u części dzieci mikrozakrzepy pozostawiają ubytki nefronów skutkujące nadciśnieniem i PChN po latach." },
          { text: "U 100% dzieci dochodzi do natychmiastowego zgonu w ciągu 24 godzin", correct: false, feedback: "Nieprawda – współczesna intensywna terapia nefrologiczna zapewnia bardzo wysoką przeżywalność." },
          { text: "Nigdy nie rozwija się nadciśnienie tętnicze", correct: false, feedback: "Błąd – bliznowacenie kłębuszków jest istotnym czynnikiem ryzyka nadciśnienia." },
          { text: "Choroba nawraca co roku u każdego pacjenta", correct: false, feedback: "STEC-HUS z reguły nie nawraca (wytwarza się odporność na dany szczep Stx); nawroty są cechą charakterystyczną dla aHUS." }
        ]
      }
    ],
    pathoNodes: [
      {
        title: "1. Kolonizacja STEC i wchłonięcie toksyny Shiga",
        desc: "Szczepy E. coli (np. O157:H7) wytwarzają enterotoksyny Shiga (Stx1, Stx2), które przenikają przez uszkodzony nabłonek jelita grubego do krążenia wrotnego i systemowego.",
        drugTarget: "ZAKAZ antybiotyków i loperamidu (zapobieganie masywnemu uwalnianiu toksyny ze ściany bakterii)"
      },
      {
        title: "2. Wiązanie z receptorem Gb3 i uszkodzenie śródbłonka",
        desc: "Toksyna Stx wiąże się z receptorem globotriaozyloceramidowym (Gb3), gęsto obecnym na komórkach śródbłonka kłębuszków nerkowych, hamując syntezę białek i wywołując apoptozę śródbłonka.",
        drugTarget: "Płynoterapia wczesna zapobiegająca niedokrwieniu i hipoperfuzji nerek"
      },
      {
        title: "3. Mikrozakrzepy płytkowe i mechaniczna fragmentacja erytrocytów",
        desc: "Odsłonięcie podścieliska aktywuje płytki krwi tworzące mikrozatory naczyniowe (małopłytkowość z zużycia). Krwinki czerwone przeciskające się przez zwężone naczynia ulegają mechanicznemu pocięciu na schizocyty (MAHA).",
        drugTarget: "Leczenie nerkozastępcze (dializa otrzewnowa) i unikanie zbędnych transfuzji płytek krwi"
      }
    ],
    dutySummary: "STEC-HUS to triada: mikroangiopatyczna niedokrwistość hemolityczna (schizocyty), małopłytkowość i ostre uszkodzenie nerek po krwistej biegunce. Pamiętaj: ANTYBIOTYKI I LOPERAMID SĄ BEZWZGLĘDNIE PRZECIWWSKAZANE! Nie przetaczaj płytek krwi rutynowo (nasilają mikrozakrzepy). W anurii stosuj ścisłą płynoterapię i wczesną dializoterapię.",
    diffTable: [
      { disease: "Zakrzepowa plamica małopłytkowa (TTP)", diff: "Niedobór aktywności enzymu ADAMTS13 (<10%), dominujące objawy neurologiczne, występuje głównie u dorosłych.", test: "Aktywność ADAMTS13, przeciwciała anty-ADAMTS13." },
      { disease: "Rozsiane wykrzepianie wewnątrznaczyniowe (DIC)", diff: "Zużycie czynników krzepnięcia: wydłużony czas PT i APTT, hipofibrynogenemia, podwyższony D-dimer.", test: "Układ krzepnięcia (PT, APTT, fibrynogen)." },
      { disease: "Atypowy zespół hemolityczno-mocznicowy (aHUS)", diff: "Brak wywiadu krwistej biegunki, ujemny wynik toksyny Shiga, defekt białek regulatorowych dopełniacza.", test: "Ocena alternatywnej drogi dopełniacza, badania genetyczne (CFH, CFI), brak Stx." },
      { disease: "Wrzodziejące zapalenie jelita grubego (WZJG)", diff: "Przewlekła krwista biegunka, brak hemolizy mechanicznej ze schizocytami, prawidłowa liczba płytek i kreatynina.", test: "Rozmaz krwi obwodowej, badanie endoskopowe jelita grubego." }
    ],
    lekQuestions: [
      {
        question: "U 3-letniego dziecka z podejrzeniem zakażenia jelitowego szczepem enterokrwotocznym Escherichia coli (STEC O157:H7) stwierdzono krwistą biegunkę i kurczowe bóle brzucha. Wskaż prawidłowe postępowanie farmakologiczne:",
        options: [
          "Wdrożenie empirycznej terapii ciprofloksacyną w celu zapobieżenia powikłaniom nerkowym.",
          "Zastosowanie loperamidu w celu zmniejszenia liczby wypróżnień i utraty elektrolitów.",
          "Bezwzględne unikanie antybiotykoterapii oraz leków hamujących perystaltykę jelit ze względu na ryzyko nasilenia uwalniania toksyny Shiga i rozwoju HUS.",
          "Natychmiastowe doustne podanie wankomycyny.",
          "Wstrzyknięcie glikokortykosteroidów w wysokich dawkach."
        ],
        correct: 2,
        explanation: "W infekcjach STEC antybiotykoterapia (zwłaszcza lekami uszkadzającymi ścianę komórkową, np. fluorochinolony, beta-laktamy) stymuluje bakterie do masowego wytwarzania i uwalniania toksyny Shiga (Stx), drastycznie zwiększając ryzyko rozwoju pełnoobjawowego zespołu hemolityczno-mocznicowego (HUS). Leki hamujące motorykę jelit (loperamid) wydłużają pasaż i kontakt toksyny ze śluzówką, co również nasila wchłanianie toksyny. Podstawą jest odpowiednie nawodnienie dożylne."
      },
      {
        question: "Wskaż cechę laboratoryjną wchodzącą w skład klasycznej triady typowego zespołu hemolityczno-mocznicowego (STEC-HUS):",
        options: [
          "Autoimmunologiczna niedokrwistość hemolityczna z dodatnim odczynem Coombsa (BTA+).",
          "Mikroangiopatyczna niedokrwistość hemolityczna z obecnością schizocytów w rozmazie krwi.",
          "Masywna trombocytoza powyżej 600 G/L.",
          "Wyraźne wydłużenie czasu protrombinowego (PT) i spadek fibrynogenu poniżej 1.0 g/L.",
          "Prawidłowe stężenie dehydrogenazy mleczanowej (LDH) w surowicy."
        ],
        correct: 1,
        explanation: "Triada objawów HUS obejmuje: 1) mikroangiopatyczną niedokrwistość hemolityczną (MAHA) z obecnością schizocytów (fragmentów erytrocytów), podwyższonym LDH, nieoznaczalną haptoglobiną i ujemnym bezpośrednim testem Coombsa (BTA ujemny!); 2) małopłytkowość z zużycia; 3) ostre uszkodzenie nerek (AKI)."
      },
      {
        question: "Które z poniższych stwierdzeń dotyczących przetaczania koncentratu krwinek płytkowych (KKP) w zespole hemolityczno-mocznicowym (HUS) jest PRAWDZIWE?",
        options: [
          "Płytki krwi należy przetaczać rutynowo, gdy ich liczba spadnie poniżej 50 G/L.",
          "Płytek krwi nie należy przetaczać rutynowo, ponieważ nasilają one tworzenie mikrozakrzepów w naczyniach nerkowych; wskazane są jedynie przy czynnym krwawieniu zagrażającym życiu lub przed inwazyjnymi zabiegami.",
          "KKP jest lekiem pierwszego rzutu znoszącym anurię.",
          "Należy przetaczać wyłącznie płytki nienapromieniowane w dawkach uderzeniowych.",
          "Przetoczenie płytek krwi jest bezwzględnie konieczne przed rozpoczęciem dializy otrzewnowej u każdego dziecka."
        ],
        correct: 1,
        explanation: "W HUS patofizjologia polega na tworzeniu mikrozakrzepów płytkowych w mikrokrążeniu kłębuszków. Podanie z zewnątrz krwinek płytkowych bez bezwzględnych wskazań klinicznych (masywne zagrażające życiu krwawienie, konieczność nakłucia dużych pni naczyniowych/operacji) dostarcza 'paliwa' do dalszej mikrozakrzepicy naczyniowej, co może pogłębić uszkodzenie nerek i OUN."
      }
    ],
    flashcards: [
      { q: "Jaka jest triada objawów zespołu hemolityczno-mocznicowego (HUS)?", a: "1. Mikroangiopatyczna niedokrwistość hemolityczna (schizocyty), 2. Małopłytkowość, 3. Ostre uszkodzenie nerek (AKI).", cat: "Pediatria" },
      { q: "Dlaczego w infekcji STEC antybiotyki są przeciwwskazane?", a: "Antybiotyki powodują rozpad bakterii i gwałtowny wyrzut toksyny Shiga, istotnie zwiększając ryzyko i ciężkość HUS.", cat: "Pediatria" },
      { q: "Dlaczego w HUS nie wolno podawać leków przeciwbiegunkowych spowalniających motorykę (np. loperamid)?", a: "Spowolnienie perystaltyki wydłuża kontakt toksyny ze śluzówką jelita i zwiększa jej wchłanianie do krążenia.", cat: "Pediatria" },
      { q: "Jakie są wskazania do przetoczenia koncentratu krwinek płytkowych (KKP) w HUS?", a: "Tylko czynne, zagrażające życiu krwawienie lub przygotowanie do pilnego zabiegu inwazyjnego; rutynowo nie podaje się KKP, bo nasila mikrozakrzepy.", cat: "Pediatria" },
      { q: "Jaki jest wynik bezpośredniego testu Coombsa (BTA) w hemolizie w przebiegu HUS?", a: "Test BTA jest UJEMNY (hemoliza ma charakter nieimmunologiczny, mechaniczny w mikrokrążeniu).", cat: "Pediatria" }
    ]
  },

  // 107: Odpływ pęcherzowo-moczowodowy (VUR)
  {
    id: 107,
    filename: "107_odplyw_pecherzowo_moczowodowy_vur.json",
    dept: "Pediatria",
    shortTitle: "2-letnia dziewczynka – Nawrotowe gorączkowe ZUM i poszerzenie moczowodów (Odpływ pęcherzowo-moczowodowy / VUR)",
    diagnosisTitle: "Odpływ pęcherzowo-moczowodowy wysokiego stopnia (Vesicoureteral Reflux IV stopnia) z nefropatią refluksową",
    vitals: [
      { label: "HR", val: "108/min", sub: "Prawidłowa", status: "ok" },
      { label: "BP", val: "112/74 mmHg", sub: "Podwyższone dla wieku (początek NT)", status: "warn" },
      { label: "SpO2", val: "99%", sub: "Prawidłowa", status: "ok" },
      { label: "RR", val: "24/min", sub: "Prawidłowa", status: "ok" },
      { label: "Temp", val: "36.8°C", sub: "Prawidłowa", status: "ok" }
    ],
    vitalsObj: { hr: 108, bp: "112/74", spo2: 99, rr: 24, temp: 36.8 },
    story: "2-letnia dziewczynka została skierowana do poradni nefrologii dziecięcej po przebyciu 3 epizodów ostrego odmiedniczkowego zapalenia nerek (OOZN) z wysoką gorączką w ciągu ostatnich 8 miesięcy. Każdy epizod wymagał leczenia dożylnego cefalosporynami. W badaniu USG wykonanym po ostatnim epizodzie stwierdzono: obustronne poszerzenie UKM, miedniczka nerkowa prawa 16 mm, lewa 18 mm, poszerzenie moczowodów w odcinku przypęcherzowym oraz ścieńczenie miąższu nerkowego w biegunach górnych. Dziecko obecnie bez gorączki, rozwój fizyczny na poziomie 25. centyla. Ciśnienie tętnicze 112/74 mmHg (>95. centyl dla wieku i płci).",
    labs: [
      {
        category: "Badania moczu i ocena czynności nerek",
        items: [
          { name: "Badanie ogólne moczu", val: "Ciężar 1.015, pH 6.0, białko ślad, leukocyty 2–4 wpw", norm: "Białko nieobecne, L <5 wpw", flag: "N" },
          { name: "Posiew moczu (aktualny)", val: "Jałowy (brak wzrostu bakterii)", norm: "Jałowy", flag: "N" },
          { name: "Wskaźnik białko/kreatynina (UPCR)", val: "0.35 mg/mg", norm: "< 0.20 mg/mg", flag: "H" },
          { name: "Kreatynina surowicy", val: "0.48 mg/dL", norm: "0.20–0.45 mg/dL", flag: "H" },
          { name: "eGFR wg Schwartza", val: "78 mL/min/1.73m2", norm: "> 90 mL/min/1.73m2", flag: "L" }
        ]
      },
      {
        category: "Diagnostyka obrazowa układu moczowego (CUM)",
        items: [
          { name: "Cystourografia mikcyjna (CUM) - stopień refluksu", val: "Obustronny odpływ do UKM z wyraźnym poszerzeniem moczowodów i zatarciem sklepień kielichów (Stopień IV wg klasyfikacji międzynarodowej)", norm: "Brak odpływu", flag: "H" },
          { name: "Ocena szyi pęcherza i cewki w CUM", val: "Cewka moczowa drożna, brak cech zastawek cewki tylnej", norm: "Prawidłowa", flag: "N" },
          { name: "Zaleganie moczu po mikcji", val: "Obecne (niewielkie zaleganie moczu cofającego się z moczowodów)", norm: "0 mL", flag: "H" }
        ]
      },
      {
        category: "Scyntygrafia nerek (DMSA)",
        items: [
          { name: "Scyntygrafia nerek z kwasem dimerkaptobursztynowym (DMSA)", val: "Obecność ubytków gromadzenia znacznika w biegunach górnych obu nerek odpowiadających trwałym bliznom pozapalnym (nefropatia refluksowa)", norm: "Równomierny wychwyt", flag: "H" },
          { name: "Względny udział czynnościowy nerek", val: "Nerka prawa 46%, nerka lewa 54%", norm: "45–55%", flag: "N" }
        ]
      }
    ],
    steps: [
      {
        num: 1,
        title: "Klasyfikacja stopnia odpływu pęcherzowo-moczowodowego w CUM",
        task: "W cystourografii mikcyjnej stwierdzono obustronny odpływ kontrastu do kielichów nerkowych ze znacznym poszerzeniem i krętym przebiegiem moczowodu oraz umiarkowanym zatarciem kątów sklepień kielichów. Jaki to stopień w skali międzynarodowej?",
        options: [
          { text: "Stopień IV odpływu pęcherzowo-moczowodowego", correct: true, feedback: "Prawidłowo! W klasyfikacji międzynarodowej: I – tylko do moczowodu; II – do UKM bez poszerzenia; III – łagodne/umiarkowane poszerzenie moczowodu i kielichów; IV – znaczne poszerzenie i kręty przebieg moczowodu, zatarcie sklepień kielichów; V – skrajne poszerzenie i skręt moczowodu, zanik brodawek nerkowych." },
          { text: "Stopień I", correct: false, feedback: "Błąd! Stopień I dotyczy odpływu tylko do dolnego odcinka moczowodu bez docierania do kielichów." },
          { text: "Stopień II", correct: false, feedback: "Błąd! W stopniu II kontrast dociera do kielichów, ale UKM nie jest poszerzony." },
          { text: "Stopień V", correct: false, feedback: "W stopniu V dochodzi do masywnego poszerzenia z całkowitym zniszczeniem architektury kielichów i odcisków brodawek nerkowych." }
        ]
      },
      {
        num: 2,
        title: "Zrozumienie patogenezy nefropatii refluksowej",
        task: "Dlaczego połączenie odpływu pęcherzowo-moczowodowego wysokiego stopnia z zakażeniem układu moczowego jest szczególnie niebezpieczne dla miąższu nerek?",
        options: [
          { text: "Refluks ułatwia transport zakażonego moczu pod wysokim ciśnieniem mikcyjnym bezpośrednio do cewek zbiorczych (odpływ śródnerkowy), co wywołuje ostre stany zapalne i bliznowacenie miąższu", correct: true, feedback: "Dokładnie tak! Zjawisko refluksu śródnerkowego (intrarenal reflux) w połączeniu z patogenem bakteryjnym prowadzi do ogniskowej destrukcji miąższu nerek i tworzenia blizn włóknistych (nefropatia refluksowa)." },
          { text: "Refluks powoduje bezpośrednią mutację onkogenną w komórkach nabłonka", correct: false, feedback: "Błąd! Refluks nie ma podłoża onkogennego." },
          { text: "Powoduje natychmiastowe zablokowanie tętnicy nerkowej skrzepliną", correct: false, feedback: "Nieprawda – to proces cewkowo-śródmiąższowy." },
          { text: "Doprowadza do wybiórczej hipokaliemii i alkalozy oddechowej", correct: false, feedback: "Brak związku patofizjologicznego." }
        ]
      },
      {
        num: 3,
        title: "Złoty standard oceny blizn nerkowych",
        task: "Które badanie radioizotopowe jest złotym standardem w wykrywaniu ubytków kory nerkowej i trwałych blizn pozapalnych w przebiegu nefropatii refluksowej?",
        options: [
          { text: "Statyczna scyntygrafia nerek z kwasem dimerkaptobursztynowym (99mTc-DMSA)", correct: true, feedback: "Doskonale! Scyntygrafia statyczna 99mTc-DMSA wiąże się w komórkach cewek bliższych i jest złotym standardem wykrywania pozapalnych blizn nerkowych (ognisk braku wychwytu). Wykonuje się ją minimum 4-6 miesięcy po ostrym ZUM." },
          { text: "Dynamiczna scyntygrafia z MAG3 lub DTPA", correct: false, feedback: "Błąd! MAG3 i DTPA służą do oceny odpływu moczu i funkcji wydalniczej (wodonercze), a nie do precyzyjnej oceny blizn korowych." },
          { text: "Scyntygrafia kośćca z technetem", correct: false, feedback: "Badanie służy do wykrywania przerzutów lub zapaleń kości, nie miąższu nerek." },
          { text: "Pozytonowa tomografia emisyjna (PET-CT) z fluorodeoksyglukozą", correct: false, feedback: "Nie ma zastosowania w rutynowej diagnostyce nefropatii refluksowej u dzieci." }
        ]
      },
      {
        num: 4,
        title: "Kwalifikacja do leczenia u 2-letniego dziecka z VUR IV stopnia i bliznami",
        task: "Dziecko ma VUR IV stopnia, przebyte 3 epizody OOZN, świeże blizny w DMSA oraz początek nadciśnienia tętniczego. Jaka jest optymalna strategia leczenia?",
        options: [
          { text: "Leczenie zabiegowe (endoskopowe wstrzyknięcie substancji uszczelniającej ujście moczowodu, np. Deflux, lub reimplantacja moczowodów) pod osłoną profilaktyki przeciwbakteryjnej", correct: true, feedback: "Znakomicie! Wskazaniami do interwencji chirurgicznej/endoskopowej w VUR są: wysoki stopień odpływu (IV–V), nawroty gorączkowych ZUM pomimo profilaktyki oraz postępujące bliznowacenie nerek. Metodą małoinwazyjną z wyboru jest endoskopowe podśluzówkowe wstrzyknięcie kopolimeru dekstranomeru z kwasem hialuronowym (Deflux / STING)." },
          { text: "Wyłącznie leczenie zachowawcze obserwacyjne bez żadnych leków", correct: false, feedback: "Błąd! Dziecko z VUR IV stopnia i nawrotowymi OOZN ma wysokie ryzyko dalszej utraty miąższu nerek i rozwoju schyłkowej PChN." },
          { text: "Natychmiastowe obustronne wycięcie nerek (nefrektomia)", correct: false, feedback: "Kardynalny błąd okaleczający dziecko!" },
          { text: "Wytworzenie stałej urostomii skórnej bez próby leczenia endoskopowego", correct: false, feedback: "Nieuzasadniony, zbyt inwazyjny zabieg okaleczający w dobie chirurgii endoskopowej." }
        ]
      },
      {
        num: 5,
        title: "Profilaktyka przeciwbakteryjna przed i po zabiegu",
        task: "Jaki lek i w jakiej dawce stosuje się w profilaktyce przeciwbakteryjnej u małych dzieci z wysokim stopniem VUR?",
        options: [
          { text: "Furazydyna (lub trimetoprim) w pojedynczej dawce wieczornej stanowiącej 1/3 do 1/4 dawki terapeutycznej", correct: true, feedback: "Prawidłowo! Standardem profilaktyki ZUM jest podawanie furazydyny (1-2 mg/kg mc. na noc) lub trimetoprimu w 1 dawce na noc, co zapewnia stężenie przeciwbakteryjne w pęcherzu w trakcie nocnego zalegania moczu." },
          { text: "Ciprofloksacyna w pełnej dawce terapeutycznej 3 razy dziennie przez 2 lata", correct: false, feedback: "Błąd! Fluorochinolony nie są lekami do długotrwałej profilaktyki u dzieci z uwagi na toksyczność i ryzyko lekooporności." },
          { text: "Gentamycyna domięśniowo co drugi dzień przez rok", correct: false, feedback: "Absolutnie niedopuszczalne ze względu na nefrotoksyczność i bolesność." },
          { text: "Nie stosuje się żadnych leków, podaje się wyłącznie sok z cytryny", correct: false, feedback: "Niewystarczające w VUR wysokiego stopnia z bliznami." }
        ]
      },
      {
        num: 6,
        title: "Postępowanie w zaburzeniach mikcji i zaparciach",
        task: "W wywiadzie matka podaje, że dziewczynka oddaje twardy stolec raz na 4–5 dni, wstrzymuje mikcję i często 'zaciska nóżki'. Dlaczego leczenie zaparć i dysfunkcji pęcherza (BBD) jest kluczowe w VUR?",
        options: [
          { text: "Zaparcia stolca i dysfunkcja mikcji (BBD) powodują ucisk na szyję pęcherza, zwiększają ciśnienie śródpęcherzowe i dramatycznie podwyższają ryzyko nawrotów ZUM oraz niepowodzenia leczenia VUR", correct: true, feedback: "Świetnie! Zespół zaburzeń eliminacji (BBD - Bladder and Bowel Dysfunction) bezpośrednio nasila refluks i sprzyja kolonizacji pęcherza. Skuteczne leczenie zaparć (makrogole/dieta) i reedukacja mikcji są warunkiem koniecznym sukcesu terapii VUR." },
          { text: "Zaparcia całkowicie uniemożliwiają wchłanianie furaginy", correct: false, feedback: "To nie jest główny mechanizm niepowodzenia." },
          { text: "Wstrzymywanie stolca powoduje przedostawanie się kału do moczowodów przez przetokę", correct: false, feedback: "Brak cech przetoki pęcherzowo-odbytniczej." },
          { text: "Zaparcia nie mają żadnego wpływu na drogi moczowe", correct: false, feedback: "Błąd – zależność między pęcherzem a odbytnicą (wspólne unerwienie miedniczne) jest bardzo silna." }
        ]
      },
      {
        num: 7,
        title: "Monitorowanie powikłań: nadciśnienie tętnicze i białkomocz",
        task: "Dziewczynka ma ciśnienie tętnicze 112/74 mmHg (>95 centyla) i śladowy białkomocz. Jakie leczenie hipotensyjne i nefroprotekcyjne jest lekiem z wyboru w nefropatii refluksowej z bliznami?",
        options: [
          { text: "Inhibitor konwertazy angiotensyny (ACE-I, np. enalapryl) z uwagi na działanie hipotensyjne i nefroprotekcyjne zmniejszające hiperfiltrację kłębuszkową", correct: true, feedback: "Doskonale! W nefropatii refluksowej utrata nefronów wywołuje kompensacyjną hiperfiltrację w pozostałych kłębuszkach. ACE-I obniżają ciśnienie wewnątrzkłębuszkowe, redukują białkomocz i spowalniają progresję PChN." },
          { text: "Amlodypina w maksymalnej dawce w monoterapii bez kontroli białkomoczu", correct: false, feedback: "Dihydropirydyny nie mają takiego profilu nefroprotekcyjnego i nie rozszerzają tętniczki odprowadzającej jak ACE-I." },
          { text: "Furosemid doustnie 3 razy dziennie", correct: false, feedback: "Nieuzasadniony w braku obrzęków i może prowadzić do hipowolemii." },
          { text: "Zaniechanie leczenia nadciśnienia, bo 'dzieci z tego wyrastają'", correct: false, feedback: "Karygodny błąd! Nieleczone nadciśnienie tętnicze przyspiesza utratę czynności nerek." }
        ]
      },
      {
        num: 8,
        title: "Długoterminowa opieka nefrologiczna",
        task: "Jakie badania kontrolne należy wykonywać okresowo u dziecka z bliznami nerkowymi po zabiegu korekcji VUR?",
        options: [
          { text: "Okresowe pomiary ciśnienia tętniczego, badanie ogólne moczu (ocena białkomoczu / UPCR), ocena kreatyniny/eGFR oraz USG nerek", correct: true, feedback: "Znakomicie! Pacjenci z bliznami nerkowymi (nefropatia refluksowa) wymagają wieloletniej opieki ze względu na ryzyko późnego rozwoju nadciśnienia tętniczego (nawet w wieku dorosłym) oraz przewlekłej choroby nerek." },
          { text: "Comiesięczna cystourografia mikcyjna przez całe życie", correct: false, feedback: "Niedopuszczalne narażenie na promieniowanie rentgenowskie i cewnikowanie." },
          { text: "Badania kontrolne nie są potrzebne, jeśli dziecko nie gorączkuje", correct: false, feedback: "Błąd – bliznowacenie nerek i nadciśnienie rozwijają się bezobjawowo." },
          { text: "Jedynie oznaczanie enzymów trzustkowych raz w roku", correct: false, feedback: "Brak związku z patologią układu moczowego." }
        ]
      }
    ],
    pathoNodes: [
      {
        title: "1. Niewydolność mechanizmu zastawkowego ujścia moczowodu",
        desc: "Zbyt krótki podśluzówkowy odcinek moczowodu w ścianie pęcherza uniemożliwia jego zaciśnięcie podczas skurczu mięśnia wypieracza moczu, co prowadzi do cofania się moczu pod ciśnieniem.",
        drugTarget: "Korekcja endoskopowa (wstrzyknięcie Deflux) lub operacyjna reimplantacja moczowodu"
      },
      {
        title: "2. Refluks śródnerkowy i wstępujące zakażenie",
        desc: "Cofający się mocz zakażony bakteriami uropatogennymi wnika przez brodawki nerkowe (szczególnie płaskie brodawki biegunowe) do kanalików nerkowych, indukując nacieki neutrofilowe i martwicę.",
        drugTarget: "Przewlekła profilaktyka przeciwbakteryjna w małej dawce na noc (furazydyna, trimetoprim)"
      },
      {
        title: "3. Nefropatia refluksowa i wtórne nadciśnienie",
        desc: "Gojenie zapalenia przez tworzenie blizn włóknistych prowadzi do ubytku nefronów, miejscowego niedokrwienia miąższu, nadprodukcji reniny przez aparat przykłębuszkowy oraz nadciśnienia nerkopochodnego.",
        drugTarget: "Inhibitory ACE (enalapryl) hamujące układ RAA i redukujące białkomocz"
      }
    ],
    dutySummary: "Odpływ pęcherzowo-moczowodowy (VUR) stopniuje się w CUM od I do V stopnia. Stopnie IV–V z nawrotowymi OOZN i bliznami w scyntygrafii DMSA są wskazaniem do leczenia zabiegowego (endoskopowe ostrzyknięcie Deflux lub operacja). Pamiętaj o leczeniu zaparć i zaburzeń mikcji (BBD) oraz kontroli ciśnienia tętniczego pod kątem nefropatii refluksowej.",
    diffTable: [
      { disease: "Zwężenie połączenia miedniczkowo-moczowodowego (UPJO)", diff: "Poszerzenie samej miedniczki nerkowej bez poszerzenia moczowodu; brak cofania kontrastu z pęcherza w CUM.", test: "Scyntygrafia dynamiczna MAG3, brak refluksu w CUM." },
      { disease: "Zastawka cewki tylnej (PUV)", diff: "Występuje wyłącznie u chłopców; obustronne wodonercze, poszerzenie cewki sterczowej i pogrubienie ściany pęcherza w CUM.", test: "Cystourografia mikcyjna (faza mikcyjna cewki u chłopców)." },
      { disease: "Nawracające zapalenie pęcherza moczowego", diff: "Objawy dyzuryczne bez gorączki i bez poszerzenia UKM w USG i CUM; brak blizn w scyntygrafii DMSA.", test: "CUM (prawidłowa), scyntygrafia DMSA (prawidłowa)." },
      { disease: "Moczowód olbrzymi pierwotny (megaureter)", diff: "Poszerzenie moczowodu z powodu dysfunkcji odcinka przypęcherzowego bez odpływu wstecznego w CUM.", test: "CUM bez refluksu, badanie dynamiczne MAG3." }
    ],
    lekQuestions: [
      {
        question: "Wskaż badanie obrazowe będące ZŁOTYM STANDARDEM w diagnostyce i ustalaniu stopnia odpływu pęcherzowo-moczowodowego (VUR) u dzieci:",
        options: [
          "Ultrasonografia jamy brzusznej z opcją Doppler.",
          "Cystourografia mikcyjna (CUM).",
          "Tomografia komputerowa dróg moczowych z kontrastem.",
          "Statyczna scyntygrafia nerek DMSA.",
          "Urografia dożylna klasyczna."
        ],
        correct: 1,
        explanation: "Cystourografia mikcyjna (CUM) jest złotym standardem rozpoznawania i klasyfikacji stopnia zaawansowania odpływu pęcherzowo-moczowodowego (stopnie I–V wg International Reflux Study Committee). Pozwala na dynamiczną ocenę pęcherza, moczowodów i cewki moczowej podczas napełniania i mikcji."
      },
      {
        question: "Do wykrywania trwałych blizn miąższu nerkowego (nefropatii refluksowej) po przebytych odmiedniczkowych zapaleniach nerek u dzieci metodą z wyboru jest:",
        options: [
          "Scyntygrafia dynamiczna z użyciem 99mTc-MAG3.",
          "Scyntygrafia statyczna z użyciem kwasu dimerkaptobursztynowego (99mTc-DMSA).",
          "Przeglądowe zdjęcie RTG jamy brzusznej.",
          "Rezonans magnetyczny miednicy mniejszej.",
          "Cystoskopia diagnostyczna."
        ],
        correct: 1,
        explanation: "Scyntygrafia statyczna 99mTc-DMSA wykazuje najwyższą czułość w obrazowaniu kory nerkowej i wykrywaniu ognisk pozapalnego bliznowacenia (ogniska ubytku gromadzenia radiofarmaceutyku). Wykonuje się ją zwykle po upływie 4–6 miesięcy od ostrego epizodu zakażenia, aby odróżnić ostry obrzęk zapalny od trwałej blizny."
      },
      {
        question: "Wskaż bezwzględne wskazanie do operacyjnego lub endoskopowego leczenia odpływu pęcherzowo-moczowodowego u małego dziecka:",
        options: [
          "Pojedynczy epizod bezgorączkowego zapalenia pęcherza moczowego.",
          "VUR I stopnia bez poszerzenia dróg moczowych.",
          "VUR wysokiego stopnia (IV–V) z nawracającymi epizodami gorączkowego ZUM pomimo profilaktyki przeciwbakteryjnej i nowo powstającymi bliznami nerkowymi.",
          "Obecność fizjologicznego odpływu moczu u bezobjawowego noworodka.",
          "Bakteriomocz bezobjawowy z prawidłowym badaniem DMSA."
        ],
        correct: 2,
        explanation: "Wskazaniami do leczenia inwazyjnego (endoskopowego ostrzyknięcia ujścia moczowodu kopolimerem Deflux lub chirurgicznej reimplantacji moczowodu) są wysokie stopnie refluksu (IV–V), brak tendencji do samoistnego ustępowania, nawroty odmiedniczkowego zapalenia nerek pomimo profilaktyki farmakologicznej oraz progresja uszkodzenia miąższu nerek (nowe blizny w DMSA, spadek eGFR)."
      }
    ],
    flashcards: [
      { q: "Jakie badanie jest złotym standardem rozpoznawania i oceny stopnia VUR?", a: "Cystourografia mikcyjna (CUM).", cat: "Pediatria" },
      { q: "Czym charakteryzuje się IV stopień odpływu pęcherzowo-moczowodowego w CUM?", a: "Znacznym poszerzeniem moczowodu z krętym przebiegiem i zatarciem kątów sklepień kielichów nerkowych.", cat: "Pediatria" },
      { q: "Jakie badanie izotopowe służy do wykrywania blizn nerkowych w nefropatii refluksowej?", a: "Scyntygrafia statyczna nerek 99mTc-DMSA (wykonywana min. 4-6 miesięcy po ostrym ZUM).", cat: "Pediatria" },
      { q: "Na czym polega małoinwazyjne endoskopowe leczenie VUR?", a: "Na podśluzówkowym wstrzyknięciu pasty uszczelniającej ujście moczowodu (np. Deflux / metoda STING).", cat: "Pediatria" },
      { q: "Dlaczego leczenie zaparć jest kluczowe u dzieci z VUR?", a: "Zaparcia i dysfunkcja pęcherza (BBD) podwyższają ciśnienie śródpęcherzowe i sprzyjają nawrotom zakażeń oraz niepowodzeniu leczenia VUR.", cat: "Pediatria" }
    ]
  },

  // 108: Ostre popaciorkowcowe KZN (APSGN)
  {
    id: 108,
    filename: "108_popaciorkowcowe_kzn_apsgn.json",
    dept: "Pediatria",
    shortTitle: "7-letni chłopiec – Ciemny mocz o barwie 'cola', obrzęki powiek i nadciśnienie (Ostre popaciorkowcowe KZN / APSGN)",
    diagnosisTitle: "Ostre popaciorkowcowe kłębuszkowe zapalenie nerek (Glomerulonephritis acuta poststreptococcica - APSGN / Zespół nefrytyczny)",
    vitals: [
      { label: "HR", val: "84/min", sub: "Prawidłowa", status: "ok" },
      { label: "BP", val: "135/88 mmHg", sub: "Wyraźne nadciśnienie (>99 centyla)", status: "bad" },
      { label: "SpO2", val: "99%", sub: "Prawidłowa", status: "ok" },
      { label: "RR", val: "20/min", sub: "Prawidłowa", status: "ok" },
      { label: "Temp", val: "36.6°C", sub: "Prawidłowa", status: "ok" }
    ],
    vitalsObj: { hr: 84, bp: "135/88", spo2: 99, rr: 20, temp: 36.6 },
    story: "7-letni chłopiec został przyprowadzony do izby przyjęć z powodu ciemnoczerwonego moczu o barwie 'coli' / popłuczyn mięsnych od 24 godzin oraz obrzęków powiek i twarzy najbardziej nasilonych rano. W wywiadzie: 2.5 tygodnia temu chłopiec przebył wysokogorączkową anginę ze zmianami nalotowymi na migdałkach leczoną objawowo paracetamolem (rodzice nie zgłosili się wówczas do lekarza, dziecko nie otrzymało antybiotyku). W badaniu fizykalnym: obrzęki okołooczodołowe, ciastowaty obrzęk grzbietów stóp, brak zmian osłuchowych nad płucami, tony serca czyste. Ciśnienie tętnicze 135/88 mmHg (znacznie powyżej 99. centyla dla płci, wieku i wzrostu). Dziecko w ciągu ostatnich 12 godzin oddało tylko 150 mL ciemnego moczu.",
    labs: [
      {
        category: "Badanie ogólne moczu i osad",
        items: [
          { name: "Barwa moczu", val: "Ciemnobrunatna ('coca-cola')", norm: "Słomkowa", flag: "H" },
          { name: "Erytrocyty w osadzie", val: "Gęsto zalegają pole widzenia (>100 wpw), w tym >80% erytrocytów dysmorficznych", norm: "0–3 wpw", flag: "H" },
          { name: "Wałeczki erytrocytarne", val: "Obecne (liczne)", norm: "Nieobecne", flag: "H" },
          { name: "Białko w moczu", val: "1.2 g/L (białkomocz subnerczycowy)", norm: "Nieobecne", flag: "H" },
          { name: "Leukocyty w moczu", val: "5–10 wpw", norm: "0–5 wpw", flag: "N" }
        ]
      },
      {
        category: "Immunologia i serologia paciorkowcowa",
        items: [
          { name: "Odczyn antystreptolizynowy O (ASO)", val: "850 IU/mL", norm: "< 200 IU/mL", flag: "H" },
          { name: "Przeciwciała przeciwko DNazie B (anty-DNaza B)", val: "Podwyższone", norm: "Ujemne", flag: "H" },
          { name: "Składowa C3 dopełniacza", val: "28 mg/dL (znaczny spadek)", norm: "90–180 mg/dL", flag: "L" },
          { name: "Składowa C4 dopełniacza", val: "24 mg/dL", norm: "15–45 mg/dL", flag: "N" },
          { name: "Przeciwciała anty-GBM / ANCA", val: "Ujemne", norm: "Ujemne", flag: "N" }
        ]
      },
      {
        category: "Biochemia krwi i czynność nerek",
        items: [
          { name: "Kreatynina surowicy", val: "0.95 mg/dL", norm: "0.30–0.60 mg/dL", flag: "H" },
          { name: "Mocznik", val: "58 mg/dL", norm: "15–40 mg/dL", flag: "H" },
          { name: "Albumina surowicy", val: "34 g/L", norm: "38–54 g/L", flag: "L" },
          { name: "Potas (K+)", val: "4.8 mmol/L", norm: "3.5–5.0 mmol/L", flag: "N" },
          { name: "Sód (Na+)", val: "139 mmol/L", norm: "135–145 mmol/L", flag: "N" }
        ]
      }
    ],
    steps: [
      {
        num: 1,
        title: "Rozpoznanie ostrego zespołu nefrytycznego",
        task: "Triada: ciemny mocz z wałeczkami erytrocytarnymi, obrzęki okołooczodołowe oraz nadciśnienie tętnicze u dziecka po przebytej anginie. Jaki zespół kliniczny reprezentują te objawy?",
        options: [
          { text: "Ostry zespół nefrytyczny w przebiegu ostrego popaciorkowcowego KZN (APSGN)", correct: true, feedback: "Prawidłowo! Zespół nefrytyczny charakteryzuje się triadą: krwinkomocz/krwiomocz (erytrocyty dysmorficzne, wałeczki erytrocytarne), nadciśnienie tętnicze oraz obrzęki (związane z retencją sodu i wody), często ze skąpomoczem i umiarkowanym białkomoczem." },
          { text: "Czysty zespół nerczycowy", correct: false, feedback: "Błąd! W zespole nerczycowym dominuje masywny selektywny białkomocz bez krwinkomoczu, z głęboką hipoalbuminemią i z reguły prawidłowym ciśnieniem." },
          { text: "Kamica pęcherza moczowego", correct: false, feedback: "Błąd! Kamica nie powoduje obrzęków powiek, wałeczków erytrocytarnych ani hipokomplementemii." },
          { text: "Nawrotowe zakażenie układu moczowego (ZUM)", correct: false, feedback: "Błąd! W ZUM dominuje leukocyturia i bakteriomocz, a nie krwinkomocz kłębuszkowy z wałeczkami i spadkiem C3." }
        ]
      },
      {
        num: 2,
        title: "Kluczowy marker immunologiczny w APSGN",
        task: "Które z poniższych badań immunologicznych wykazuje charakterystyczne odchylenie w ostrej fazie popaciorkowcowego KZN?",
        options: [
          { text: "Znaczne obniżenie stężenia składowej C3 dopełniacza przy prawidłowym C4 (aktywacja drogi alternatywnej)", correct: true, feedback: "Znakomicie! W APSGN dochodzi do aktywacji alternatywnej drogi dopełniacza przez kompleksy immunologiczne, co powoduje przejściowy spadek C3 u >90% chorych. Stężenie C3 samoistnie powraca do normy w ciągu 6–8 tygodni, co jest warunkiem potwierdzenia rozpoznania!" },
          { text: "Trwały spadek składowej C4 do zera", correct: false, feedback: "Błąd! Izolowany spadek C4 jest typowy dla tocznia rumieniowatego lub wrodzonego obrzęku naczynioruchowego, a nie APSGN." },
          { text: "Wysokie miano przeciwciał anty-GBM", correct: false, feedback: "Błąd! Przeciwciała anty-GBM występują w zespole Goodpasture'a." },
          { text: "Głęboki niedobór immunoglobuliny IgA", correct: false, feedback: "Błąd! W nefropatii IgA stężenie IgA w surowicy bywa wręcz podwyższone." }
        ]
      },
      {
        num: 3,
        title: "Czas latencji między infekcją a wystąpieniem APSGN",
        task: "Jaki jest typowy odstęp czasowy między infekcją paciorkowcową (gardła vs skóry) a wystąpieniem objawów APSGN?",
        options: [
          { text: "1–3 tygodnie po zapaleniu gardła (anginie) oraz 3–6 tygodni po zakażeniu skóry (liszajcu)", correct: true, feedback: "Dokładnie tak! Czas latencji wynosi 7–21 dni (średnio 10-14 dni) po anginie paciorkowcowej i 2–6 tygodni po liszajcu zakaźnym (impetigo). Krwiomocz występujący w trakcie samej infekcji (<2-3 dni) wskazuje na nefropatię IgA (chorobę Bergera)!" },
          { text: "Występuje w ciągu pierwszych 24 godzin trwania anginy", correct: false, feedback: "Błąd! Tzw. krwinkomocz synfaryngityczny (w trakcie infekcji) jest cechą nefropatii IgA, a nie APSGN." },
          { text: "Dokładnie 6 miesięcy po infekcji", correct: false, feedback: "Nierealistycznie długi okres latencji." },
          { text: "Infekcja gardła nie ma żadnego związku z nerkami", correct: false, feedback: "Błąd kardynalny – szczepy nefrytogenne Streptococcus pyogenes (np. typ 12 i 49) są przyczyną choroby." }
        ]
      },
      {
        num: 4,
        title: "Kwalifikacja do biopsji nerki w typowym APSGN",
        task: "Czy u 7-latka z typowym wywiadem, podwyższonym ASO i przejściowym spadkiem C3 należy wykonać biopsję nerki w 1. dobie?",
        options: [
          { text: "Nie, w typowym przebiegu APSGN biopsja nerki nie jest wskazana", correct: true, feedback: "Prawidłowo! U dzieci z klasycznym obrazem poinfekcyjnego KZN biopsja nie jest konieczna, chyba że wystąpi gwałtownie postępujące KZN (RPGN/anuria), utrzymywanie się hipokomplementemii C3 > 8 tygodni lub brak poprawy wskaźników nerkowych." },
          { text: "Tak, biopsja nerki jest konieczna w ciągu pierwszych 6 godzin u każdego dziecka", correct: false, feedback: "Błąd! Biopsja nerki jest zabiegiem inwazyjnym i nie jest rutynowo potrzebna w typowym APSGN." },
          { text: "Biopsję należy wykonać tylko wtedy, gdy ASO jest ujemne", correct: false, feedback: "Przy ujemnym ASO (zwłaszcza po liszajcu bada się anty-DNazę B), ale bez cech atypowych nadal obowiązuje obserwacja." },
          { text: "Zamiast biopsji wykonuje się urografię dożylną", correct: false, feedback: "Urografia jest zbędna i przeciwwskazana w ostrym uszkodzeniu nerek." }
        ]
      },
      {
        num: 5,
        title: "Postępowanie niefarmakologiczne i farmakologiczne w fazie ostrej",
        task: "Jakie jest podstawowe leczenie objawowe ostrej fazy APSGN z nadciśnieniem i obrzękami?",
        options: [
          { text: "Ograniczenie podaży sodu i płynów w diecie oraz podanie diuretyku pętlowego (furosemid) w celu redukcji przewodnienia i obniżenia ciśnienia krwi", correct: true, feedback: "Doskonale! W APSGN nie ma swoistego leczenia immunomodulującego; leczenie jest objawowe. Ponieważ nadciśnienie wynika z przewodnienia (retencji sodu i wody przez zmienione zapalnie kłębuszki), restrykcja sodu i diuretyki pętlowe (furosemid) skutecznie usuwają nadmiar płynów i normalizują ciśnienie." },
          { text: "Wlewy dużych objętości płynów wieloelektrolitowych (3000 mL/m2) w celu przepłukania nerek", correct: false, feedback: "Groźny błąd! Forsowna płynoterapia u pacjenta ze skąpomoczem i nadciśnieniem wywoła ostry obrzęk płuc lub encefalopatię nadciśnieniową!" },
          { text: "Wysokie dawki prednizonu i cyklofosfamidu dożylnie", correct: false, feedback: "Błąd! GKS i immunosupresja nie mają zastosowania w niepowikłanym typowym APSGN." },
          { text: "Wdrożenie natychmiastowej plazmaferezy", correct: false, feedback: "Brak wskazań w typowym przebiegu." }
        ]
      },
      {
        num: 6,
        title: "Leczenie nadciśnienia tętniczego opornego na diuretyk",
        task: "Jeśli po podaniu furosemidu ciśnienie tętnicze nadal wynosi 135/88 mmHg, jaki lek hipotensyjny można bezpiecznie dołączyć u dziecka w ostrej fazie ze skąpomoczem?",
        options: [
          { text: "Bloker kanału wapniowego (np. amlodypina lub nifedypina o przedłużonym uwalnianiu)", correct: true, feedback: "Świetnie! Blokery kanałów wapniowych są bezpieczne i wysoce skuteczne w ostrej fazie KZN z retencją płynów. Inhibitory ACE (ACE-I) są stosowane bardzo ostrożnie ze względu na ryzyko hiperkaliemii i pogłębienia spadku GFR w fazie ostrego skąpomoczu." },
          { text: "Inhibitor ACE w maksymalnej dawce u pacjenta z oligurią i hiperkaliemią", correct: false, feedback: "Ryzykowne w ostrej fazie skąpomoczu z uwagi na blokadę tętniczki odprowadzającej i skok potasu." },
          { text: "Dopamina w dawce 'nerkowej'", correct: false, feedback: "Mit medyczny – dawka 'nerkowa' dopaminy nie ma udowodnionego działania nefroprotekcyjnego." },
          { text: "Zaniechanie jakichkolwiek leków", correct: false, feedback: "Grozi powikłaniami naczyniowo-mózgowymi (drgawki, encefalopatia nadciśnieniowa)." }
        ]
      },
      {
        num: 7,
        title: "Rola antybiotykoterapii w momencie rozpoznania APSGN",
        task: "Czy włączenie penicyliny w momencie rozpoznania APSGN leczy toczący się proces zapalny w kłębuszkach nerkowych?",
        options: [
          { text: "Nie – antybiotyk nie wpływa na przebieg samego KZN (które jest procesem immunologicznym), ale służy do eradykacji ewentualnego nosicielstwa paciorkowca i zapobiegania rozprzestrzenianiu szczepu nefrytogennego", correct: true, feedback: "Bardzo dobrze! Uszkodzenie kłębuszków nerkowych ma charakter immunologiczny (odkładanie krążących i formujących się in situ kompleksów antygen-przeciwciało). Antybiotyk (np. fenoksymetylopenicylina) nie odwraca zapalenia nerek, ale eradykuje ewentualne nosicielstwo S. pyogenes w gardle." },
          { text: "Tak – penicylina natychmiast rozpuszcza kompleksy immunologiczne w kłębuszkach", correct: false, feedback: "Nieprawda – penicylina działa bakteriobójczo na ścianę bakterii, nie ma aktywności przeciwciał ani enzymów fibrynolitycznych." },
          { text: "Antybiotyki są całkowicie zakazane w APSGN", correct: false, feedback: "Nie są zakazane; podaje się je, jeśli nadal obecne jest nosicielstwo lub zakażenie paciorkowcowe." },
          { text: "Penicylina jest nefrotoksyczna i wywołuje bezmocz", correct: false, feedback: "Błędne stwierdzenie." }
        ]
      },
      {
        num: 8,
        title: "Odległe rokowanie i kryteria normalizacji parametrów",
        task: "Rodzice są zaniepokojeni przyszłością dziecka. Jakie jest odległe rokowanie w APSGN u dzieci i kiedy normalizują się poszczególne parametry?",
        options: [
          { text: "Rokowanie jest doskonałe (>95% pełnych wyleczeń); obrzęki i nadciśnienie ustępują w ciągu 1–2 tygodni, C3 normalizuje się do 8 tygodni, natomiast mikroskopowy krwinkomocz może utrzymywać się nawet do 1–2 lat", correct: true, feedback: "Znakomicie! Ponad 95% dzieci zdrowieje bez trwałych następstw. Najszybciej ustępuje skąpomocz i nadciśnienie (dni/tygodnie). Spadek C3 musi ustąpić do 6-8 tygodni (utrzymywanie się dłuższego spadku C3 wymaga biopsji w kierunku MPGN!). Izolowany mikroskopowy krwinkomocz może utrzymywać się bezpiecznie przez wiele miesięcy." },
          { text: "U 80% dzieci rozwija się schyłkowa niewydolność nerek wymagająca hemodializ w ciągu roku", correct: false, feedback: "Błąd! Przejście w postać przewlekłą dotyczy <1-2% dzieci (częściej dorosłych)." },
          { text: "Krwiomocz makroskopowy utrzymuje się bez przerwy przez 10 lat", correct: false, feedback: "Krwiomocz makroskopowy ustępuje zwykle w ciągu 1-3 tygodni." },
          { text: "Dziecko nigdy nie może powrócić do aktywności fizycznej", correct: false, feedback: "Po ustąpieniu ostrej fazy i normalizacji ciśnienia dziecko wraca do pełnej aktywności." }
        ]
      }
    ],
    pathoNodes: [
      {
        title: "1. Infekcja gardła lub skóry szczepem nefrytogennym GAS",
        desc: "Streptococcus pyogenes (np. antygeny SpeB, NAPIr) przenikają do krążenia, indukując powstawanie swoistych przeciwciał i krążących kompleksów immunologicznych.",
        drugTarget: "Fenoksymetylopenicylina w fazie infekcji gardła zapobiegająca gorączce reumatycznej (mniej skuteczna w zapobieganiu APSGN)"
      },
      {
        title: "2. Odkładanie podnabłonkowych 'garbów' (humps) i aktywacja dopełniacza",
        desc: "Kompleksy odkładają się w błonie podstawnej kłębuszków nerkowych tworząc charakterystyczne podnabłonkowe depozyty ('humps'). Aktywacja drogi alternatywnej dopełniacza (spadek C3) wywołuje napływ neutrofilów.",
        drugTarget: "Samoograniczająca się kaskada – monitorowanie poziomu C3 dopełniacza (powrót do normy w 6-8 tyg.)"
      },
      {
        title: "3. Spadek GFR, retencja sodu i wody oraz nadciśnienie",
        desc: "Zaczopowanie pętli kłębuszkowych przez komórki zapalne obniża filtrację kłębuszkową (GFR), co prowadzi do retencji sodu i wody, hiperwolemii, obrzęków i nadciśnienia tętniczego.",
        drugTarget: "Diuretyki pętlowe (furosemid) oraz restrykcja sodu i płynów redukujące objętość wewnątrznaczyniową"
      }
    ],
    dutySummary: "APSGN to klasyczny zespół nefrytyczny (krwiomocz 'cola' z wałeczkami erytrocytarnymi, obrzęki, nadciśnienie tętnicze) występujący 1-3 tyg. po anginie lub 3-6 tyg. po liszajcu. Kluczowe odchylenie laboratoryjne: przejściowy spadek składowej C3 dopełniacza (normalizacja do 8 tyg.) i wysokie ASO. Leczenie jest objawowe: restrykcja soli/płynów i furosemid. Rokowanie u dzieci doskonałe (>95% wyleczeń).",
    diffTable: [
      { disease: "Nefropatia IgA (choroba Bergera)", diff: "Krwiomocz makroskopowy występuje równocześnie z infekcją górnych dróg oddechowych (synfaryngitycznie, po 1-2 dniach); stężenie C3 jest prawidłowe.", test: "Czas wystąpienia (1-2 dni vs 2 tyg.), stężenie C3 (prawidłowe w nefropatii IgA)." },
      { disease: "Błoniaszkorozplemowe KZN (MPGN)", diff: "Trwały spadek stężenia C3 utrzymujący się powyżej 8–12 tygodni, postępująca niewydolność nerek.", test: "Utrzymywanie się niskiego C3 >8 tyg. -> wskazanie do biopsji nerki." },
      { disease: "Toczeniowe zapalenie nerek (Lupus nephritis)", diff: "Obniżenie zarówno C3 jak i C4, obecność przeciwciał ANA i anty-dsDNA, objawy wielonarządowe (stawy, skóra).", test: "Przeciwciała ANA, anty-dsDNA, stężenie C4." },
      { disease: "Zespół Alporta", diff: "Uwarunkowany genetycznie (mutacja kolagenu IV), sprzężony z chromosomem X, postępujący niedosłuch odbiorczy i zmiany oczne.", test: "Badanie audiometryczne, wywiad rodzinny, biopsja skóry/nerki (łańcuchy alfa kolagenu IV)." }
    ],
    lekQuestions: [
      {
        question: "7-letni chłopiec zgłosił się z powodu ciemnego moczu o barwie popłuczyn mięsnych, obrzęków powiek i ciśnienia tętniczego 135/90 mmHg. W wywiadzie 2 tygodnie wcześniej przebył ropne zapalenie gardła. Które z poniższych badań laboratoryjnych NAJBARDZIEJ potwierdza rozpoznanie ostrego popaciorkowcowego kłębuszkowego zapalenia nerek (APSGN)?",
        options: [
          "Izolowany wzrost stężenia immunoglobuliny IgE w surowicy.",
          "Znaczne obniżenie stężenia składowej C3 dopełniacza przy podwyższonym mianie ASO.",
          "Obecność przeciwciał przeciwko cytoplazmie neutrofilów (c-ANCA).",
          "Podwyższone stężenie białka całkowitego i albumin w surowicy.",
          "Ujemny posiew moczu bez krwinkomoczu."
        ],
        correct: 1,
        explanation: "W ostrym popaciorkowcowym KZN (APSGN) dochodzi do aktywacji alternatywnej drogi dopełniacza z gwałtownym, przejściowym spadkiem stężenia składowej C3 (u >90% chorych) przy z reguły prawidłowym stężeniu C4. Równocześnie potwierdzeniem przebytego zakażenia paciorkowcowego jest podwyższone miano odczynu antystreptolizynowego O (ASO) lub przeciwciał anty-DNaza B."
      },
      {
        question: "Czym różni się epizod krwiomoczu w przebiegu nefropatii IgA od krwiomoczu w ostrym popaciorkowcowym KZN (APSGN)?",
        options: [
          "W nefropatii IgA krwiomocz pojawia się synfaryngitycznie (w trakcie 1.–2. dnia infekcji gardła), podczas gdy w APSGN występuje po okresie latencji 1–3 tygodni od anginy.",
          "W APSGN stężenie C3 jest stale prawidłowe, a w nefropatii IgA spada poniżej normy.",
          "W nefropatii IgA nigdy nie stwierdza się erytrocytów w moczu.",
          "APSGN występuje wyłącznie u osób dorosłych po 60. roku życia.",
          "Nefropatia IgA jest zawsze powikłaniem liszajca zakaźnego."
        ],
        correct: 0,
        explanation: "Kluczowym kryterium różnicującym na egzaminie LEK jest czas wystąpienia krwiomoczu względem infekcji. W nefropatii IgA krwiomocz makroskopowy występuje w trakcie infekcji dróg oddechowych (synfaryngitycznie – po 24–48 godzinach), a dopełniacz C3 jest w normie. W APSGN występuje wyraźny okres latencji potrzebny na wytworzenie kompleksów immunologicznych: 1–3 tygodnie po anginie i 3–6 tygodni po liszajcu, a C3 ulega obniżeniu."
      },
      {
        question: "Jakie jest podstawowe postępowanie terapeutyczne u dziecka z niepowikłanym ostrym popaciorkowcowym KZN, nadciśnieniem tętniczym i umiarkowanymi obrzękami?",
        options: [
          "Natychmiastowe wdrożenie pulsów metyloprednizolonu i doustnego cyklofosfamidu.",
          "Restrykcja podaży sodu i płynów w diecie oraz podanie diuretyku pętlowego (np. furosemidu).",
          "Forsowne nawadnianie dożylne 0.9% NaCl w dawce 3000 mL/m2 pc./dobę.",
          "Pilna nefrektomia jednostronna.",
          "Wdrożenie przewlekłego leczenia przeciwkrzepliwego warfaryną."
        ],
        correct: 1,
        explanation: "Leczenie typowego APSGN jest wyłącznie objawowe i wspomagające. Z powodu spadku GFR i retencji sodu dochodzi do hiperwolemii, co wywołuje obrzęki i nadciśnienie tętnicze. Ograniczenie spożycia soli i podaży płynów oraz zastosowanie furosemidu odwraca przewodnienie i skutecznie obniża ciśnienie tętnicze. Immunosupresja nie jest wskazana w typowym przebiegu."
      }
    ],
    flashcards: [
      { q: "Jaka jest triada objawów ostrego zespołu nefrytycznego w APSGN?", a: "Krwiomocz (barwa coli / popłuczyn mięsnych, wałeczki erytrocytarne), obrzęki (okołooczodołowe) oraz nadciśnienie tętnicze.", cat: "Pediatria" },
      { q: "Jaki jest okres latencji między anginą a początkiem APSGN?", a: "1–3 tygodnie (średnio 10–14 dni); po zakażeniu skóry (liszajcu) wynosi 3–6 tygodni.", cat: "Pediatria" },
      { q: "Jak zachowuje się składowa C3 dopełniacza w ostrej fazie APSGN?", a: "Ulega gwałtownemu obniżeniu u >90% chorych, po czym samoistnie normalizuje się w ciągu 6–8 tygodni.", cat: "Pediatria" },
      { q: "Jak odróżnić krwiomocz w nefropatii IgA od APSGN?", a: "W nefropatii IgA krwiomocz występuje w 1.–2. dobie infekcji (synfaryngitycznie) i C3 jest prawidłowe; w APSGN po 1–3 tyg. i C3 jest obniżone.", cat: "Pediatria" },
      { q: "Jakie jest leczenie z wyboru ostrej fazy APSGN z nadciśnieniem i obrzękami?", a: "Objawowe: restrykcja sodu i płynów oraz diuretyk pętlowy (furosemid); sterydy nie są rutynowo wskazane.", cat: "Pediatria" }
    ]
  },

  // 109: Wodonercze wrodzone (UPJO)
  {
    id: 109,
    filename: "109_wodonercze_wrodzone_upjo.json",
    dept: "Pediatria",
    shortTitle: "3-miesięczne niemowlę – Poszerzenie miedniczki nerkowej w USG prenatalnym i poporodowym (Wodonercze wrodzone / UPJO)",
    diagnosisTitle: "Wrodzone zwężenie połączenia miedniczkowo-moczowodowego (Ureteropelvic Junction Obstruction - UPJO) powikłane wodonerczem",
    vitals: [
      { label: "HR", val: "124/min", sub: "Prawidłowa dla niemowlęcia", status: "ok" },
      { label: "BP", val: "82/50 mmHg", sub: "Prawidłowe", status: "ok" },
      { label: "SpO2", val: "99%", sub: "Prawidłowa", status: "ok" },
      { label: "RR", val: "30/min", sub: "Prawidłowa", status: "ok" },
      { label: "Temp", val: "36.9°C", sub: "Prawidłowa", status: "ok" }
    ],
    vitalsObj: { hr: 124, bp: "82/50", spo2: 99, rr: 30, temp: 36.9 },
    story: "3-miesięczny chłopiec został skierowany na planową diagnostykę urologiczną z powodu wodonercza lewostronnego podejrzewanego w badaniach USG prenatalnych w III trymestrze ciąży (wymiar przednio-tylny miedniczki APD wynosił 14 mm). Dziecko rozwija się prawidłowo, nie gorączkowało, matka nie obserwowała zaburzeń mikcji. W kontrolnym badaniu USG wykonanym w 1. dobie życia APD wynosiło 16 mm, a w badaniu wykonanym obecnie w 3. miesiącu życia wymiar APD lewej miedniczki wzrósł do 24 mm z wyraźnym poszerzeniem kielichów i ścieńczeniem miąższu nerkowego lewego do 3.5 mm (prawy miąższ 7.5 mm). Moczowód lewy nie jest widoczny/nieposzerzony. Pęcherz moczowy prawidłowy.",
    labs: [
      {
        category: "Badania moczu i wskaźniki zapalne",
        items: [
          { name: "Badanie ogólne moczu", val: "Ciężar 1.010, pH 6.5, białko nieobecne, leukocyty 1–2 wpw", norm: "Prawidłowe", flag: "N" },
          { name: "Posiew moczu", val: "Jałowy (brak wzrostu)", norm: "Jałowy", flag: "N" },
          { name: "CRP / Prokalcytonina", val: "< 1.0 mg/L / < 0.1 ng/mL", norm: "< 5.0 / < 0.5", flag: "N" },
          { name: "Kreatynina surowicy", val: "0.28 mg/dL", norm: "0.20–0.40 mg/dL", flag: "N" }
        ]
      },
      {
        category: "Ultrasonografia układu moczowego (USG)",
        items: [
          { name: "Wymiar przednio-tylny miedniczki (APD) nerki lewej", val: "24 mm (znaczne wodonercze stopień IV wg SFU)", norm: "< 7 mm u niemowląt", flag: "H" },
          { name: "Grubość warstwy miąższowej nerki lewej", val: "3.5 mm (ścieńczenie miąższu)", norm: "6–9 mm", flag: "L" },
          { name: "Moczowód lewy", val: "Niewidoczny / nieposzerzony na całej długości", norm: "Niewidoczny", flag: "N" },
          { name: "Nerka prawa", val: "Długość 56 mm, APD 3 mm, miąższ 7.5 mm, UKM nieposzerzony", norm: "Prawidłowa", flag: "N" }
        ]
      },
      {
        category: "Scyntygrafia dynamiczna nerek (99mTc-MAG3 z testem furosemidowym)",
        items: [
          { name: "Względny udział czynnościowy nerek (DRF)", val: "Nerka lewa 36%, nerka prawa 64% (spadek funkcji nerki lewej < 40%)", norm: "45–55% dla każdej nerki", flag: "L" },
          { name: "Krzywa renograficzna nerki lewej", val: "Krzywa stale narastająca, brak fazy eliminacji", norm: "Prawidłowa trójfazowa", flag: "H" },
          { name: "Czas połowiczej eliminacji znacznika po furosemidzie (T1/2)", val: "> 25 minut (wzorzec przeszkody mechanicznej)", norm: "< 10 minut", flag: "H" }
        ]
      }
    ],
    steps: [
      {
        num: 1,
        title: "Lokalizacja wady anatomicznej na podstawie obrazu USG",
        task: "W badaniu USG stwierdzono duże poszerzenie miedniczki nerkowej (APD 24 mm) oraz kielichów nerki lewej ze ścieńczeniem miąższu, podczas gdy moczowód lewy na całej długości jest nieposzerzony. Gdzie znajduje się przeszkoda w odpływie moczu?",
        options: [
          { text: "W połączeniu miedniczkowo-moczowodowym (UPJO / zwężenie UPJ)", correct: true, feedback: "Prawidłowo! Izolowane poszerzenie miedniczki i kielichów z prawidłowym, nieposzerzonym moczowodem jest patognomonicznym obrazem zwężenia połączenia miedniczkowo-moczowodowego (Ureteropelvic Junction Obstruction - UPJO), które jest najczęstszą przyczyną wrodzonego wodonercza." },
          { text: "W ujściu pęcherzowo-moczowodowym (UVJO)", correct: false, feedback: "Błąd! Przy zwężeniu ujścia pęcherzowo-moczowodowego doszłoby do poszerzenia moczowodu (megaureter)." },
          { text: "W cewce moczowej tylnej (zastawka cewki tylnej)", correct: false, feedback: "Błąd! Zastawka cewki tylnej daje obustronne wodonercze, poszerzenie obu moczowodów oraz pogrubienie ściany pęcherza." },
          { text: "W tętnicy nerkowej lewej", correct: false, feedback: "Zwężenie tętnicy nerkowej daje nadciśnienie naczyniowo-nerkowe, a nie wodonercze." }
        ]
      },
      {
        num: 2,
        title: "Właściwy czas pierwszego badania USG po porodzie",
        task: "Dlaczego USG układu moczowego u noworodka z podejrzeniem wodonercza prenatalnego (bez cech skrajnego bezmoczu) zaleca się wykonać po 48.–72. godzinie życia, a nie w 1. dobie?",
        options: [
          { text: "W pierwszych 48 godzinach życia fizjologiczna oliguria i odwodnienie noworodka mogą maskować wodonercze, dając wyniki fałszywie ujemne", correct: true, feedback: "Znakomicie! W pierwszych 2 dobach życia dochodzi do fizjologicznego spadku diurezy noworodka. Wodonercze może ulec pozornemu zmniejszeniu, co skutkuje niedoszacowaniem stopnia poszerzenia miedniczki nerkowej. Wyjątkiem są podejrzenia zastawki cewki tylnej lub jedyna nerka." },
          { text: "Promieniowanie USG jest zbyt szkodliwe dla noworodka w 1. dobie", correct: false, feedback: "Bzdura! USG wykorzystuje fale ultradźwiękowe, które są w 100% bezpieczne." },
          { text: "Nerki noworodka wykształcają się dopiero w 3. dobie życia", correct: false, feedback: "Absurd embriologiczny." },
          { text: "Konieczne jest uprzednie wykonanie scyntygrafii", correct: false, feedback: "Scyntygrafia jest badaniem wtórnym, wykonywanym najwcześniej po 6.-8. tygodniu życia." }
        ]
      },
      {
        num: 3,
        title: "Interpretacja scyntygrafii dynamicznej z furosemidem (MAG3)",
        task: "W scyntygrafii dynamicznej 99mTc-MAG3 u 3-miesięcznego chłopca czas T1/2 po podaniu furosemidu wynosi >25 minut, a udział czynnościowy nerki lewej spadł do 36%. Jak interpretujesz ten wynik?",
        options: [
          { text: "Istotna mechaniczna przeszkoda w spływie moczu z upośledzeniem czynności miąższu nerki lewej", correct: true, feedback: "Dokładnie tak! Norma T1/2 wynosi <10 minut (brak przeszkody). Wartość T1/2 >20-25 minut świadczy o utrwalonej przeszkodzie mechanicznej (obturacji). Spadek względnego udziału nerki <40% (lub ubytek >5-10% w badaniach seryjnych) dowodzi uszkodzenia miąższu." },
          { text: "Czynnościowa atonia bez przeszkody mechanicznej", correct: false, feedback: "Błąd! W atonii po furosemidzie następuje szybkie wypłukanie znacznika (T1/2 <10 min)." },
          { text: "Całkowity brak czynności nerki prawej", correct: false, feedback: "Nieprawda – nerka prawa odpowiada za 64% funkcji wydalniczej." },
          { text: "Refluks pęcherzowo-moczowodowy V stopnia", correct: false, feedback: "MAG3 nie służy do bezpośredniego stopniowania refluksu; w UPJO brak moczowodu poszerzonego." }
        ]
      },
      {
        num: 4,
        title: "Wskazania do leczenia operacyjnego wodonercza",
        task: "Jakie są bezwzględne wskazania do zabiegu operacyjnego u dziecka z wodonerczem w przebiegu UPJO?",
        options: [
          { text: "Względny udział czynnościowy chorej nerki <40% w scyntygrafii (lub jego spadek w obserwacji), krzywa odpływu o typie przeszkody (T1/2 >20 min), progresja poszerzenia APD w USG lub objawowe epizody OOZN", correct: true, feedback: "Prawidłowo! Wskazania do interwencji to: upośledzenie czynności nerki (DRF <40%), progresja wodonercza w USG (wzrost APD, ścieńczenie miąższu) oraz cechy istotnej obturacji w MAG3." },
          { text: "Każde poszerzenie miedniczki powyżej 5 mm w USG", correct: false, feedback: "Błąd! U większości dzieci poszerzenie 5–10 mm ustępuje samoistnie i wymaga wyłącznie obserwacji." },
          { text: "Obecność prawidłowej diurezy i symetrycznej czynności obu nerek w scyntygrafii", correct: false, feedback: "Przeciwnie – symetryczna funkcja i dobry spływ są wskazaniem do leczenia zachowawczego!" },
          { text: "Wystąpienie fizjologicznej żółtaczki noworodkowej", correct: false, feedback: "Brak jakiegokolwiek związku." }
        ]
      },
      {
        num: 5,
        title: "Metoda operacyjna z wyboru w UPJO",
        task: "Jaki zabieg operacyjny jest złotym standardem leczenia zwężenia połączenia miedniczkowo-moczowodowego?",
        options: [
          { text: "Pieloplastyka sposobem Hynesa-Andersona (resekcja zwężonego odcinka połączenia miedniczkowo-moczowodowego i zespolenie miedniczki z moczowodem)", correct: true, feedback: "Doskonale! Pieloplastyka rozczłonkowana sposobem Hynesa-Andersona (wykonywana metodą otwartą, laparoskopową lub z użyciem robota) jest złotym standardem o skuteczności >95%." },
          { text: "Nefrektomia całkowita lewostronna", correct: false, feedback: "Błąd! Nerka ma 36% funkcji wydalniczej – usunięcie nerki (nefrektomia) rozważa się jedynie przy skrajnym zaniku miąższu i DRF <10%." },
          { text: "Podcięcie wędzidełka napletka", correct: false, feedback: "Absurdalne skojarzenie." },
          { text: "Założenie stałej nefrostomii do końca życia", correct: false, feedback: "Nefrostomia może być zabiegiem doraźnym/ratunkowym w roponerczu, nie ostatecznym u 3-miesięcznego niemowlęcia." }
        ]
      },
      {
        num: 6,
        title: "Profilaktyka przeciwbakteryjna przed zabiegiem",
        task: "Czy u 3-miesięcznego dziecka z APD 24 mm i ścieńczeniem miąższu należy stosować profilaktykę przeciwbakteryjną do czasu operacji?",
        options: [
          { text: "Tak, wodonercze dużego stopnia (SFU 3–4, APD >15 mm) wiąże się z wysokim ryzykiem zakażenia i roponercza – zaleca się profilaktykę (np. amoksycylina lub trimetoprim w małej dawce na noc)", correct: true, feedback: "Świetnie! Zastój moczu sprzyja kolonizacji bakteryjnej. U niemowląt z wodonerczem wysokiego stopnia zaleca się profilaktykę przeciwbakteryjną, aby zapobiec roponerczu i uogólnionej urosepsie." },
          { text: "Nie, profilaktyka jest przeciwwskazana w każdej wadzie układu moczowego", correct: false, feedback: "Błąd! W wadach zaporowych wysokiego stopnia profilaktyka zmniejsza częstość OOZN." },
          { text: "Należy podawać wankomycynę dożylnie przez 3 miesiące", correct: false, feedback: "Niedopuszczalne i toksyczne." },
          { text: "Zaleca się podawanie leków moczopędnych codziennie", correct: false, feedback: "Diuretyki w przeszkodzie mechanicznej mogą wywołać pęknięcie miedniczki lub ból kolkowy." }
        ]
      },
      {
        num: 7,
        title: "Różnicowanie z naczyniem krzyżującym (crossing vessel)",
        task: "U starszych dzieci zwężenie UPJ może manifestować się napadowymi bólami brzucha i wymiotami po obfitym wypiciu płynów (tzw. kryzy Dietla). Co jest najczęstszą przyczyną zewnętrznego ucisku?",
        options: [
          { text: "Dodatkowe naczynie biegunowe dolne (dolnobiegunowa gałąź tętnicy nerkowej krzyżująca moczowód)", correct: true, feedback: "Znakomicie! Dodatkowe naczynie biegunowe (aberrant / crossing vessel) biegnące do dolnego bieguna nerki krzyżuje połączenie miedniczkowo-moczowodowe, powodując zagięcie moczowodu i kryzy Dietla przy wzmożonej diurezie." },
          { text: "Guz chromochłonny nadnercza", correct: false, feedback: "Rzadki guz dający napadowe nadciśnienie, nieuciskający UPJ." },
          { text: "Tętniak aorty zstępującej", correct: false, feedback: "Kazuistyka u dzieci." },
          { text: "Przepuklina oponowo-rdzeniowa", correct: false, feedback: "Wada cewy nerwowej powodująca pęcherz neurogenny, nie naczynie krzyżujące." }
        ]
      },
      {
        num: 8,
        title: "Ocena wyników po pieloplastyce",
        task: "Dziecko przebyło udaną pieloplastykę lewostronną. Jakie badanie obrazowe i kiedy wykonuje się w celu oceny skuteczności odbarczenia wodonercza?",
        options: [
          { text: "USG nerek po 1, 3 i 6 miesiącach od operacji oraz kontrolna scyntygrafia MAG3 po 6–12 miesiącach w celu potwierdzenia poprawy odpływu moczu", correct: true, feedback: "Bardzo dobrze! USG ocenia ewolucję wymiaru APD i grubość miąższu, natomiast MAG3 weryfikuje ustąpienie przeszkody hydrodynamicznej i zachowanie funkcji nerki." },
          { text: "Tomografia komputerowa co 2 tygodnie przez rok", correct: false, feedback: "Niedopuszczalne narażenie niemowlęcia na promieniowanie." },
          { text: "Badania kontrolne nie są wymagane, jeśli rana operacyjna się zagoiła", correct: false, feedback: "Błąd – konieczne jest monitorowanie funkcji i wykluczenie nawrotu zwężenia w zespoleniu." },
          { text: "Jedynie badanie poziomu witaminy D we krwi", correct: false, feedback: "Nie ocenia anatomii ani czynności nerek." }
        ]
      }
    ],
    pathoNodes: [
      {
        title: "1. Zaburzenie budowy ściany UPJ lub ucisk zewnętrzny",
        desc: "Wrodzona dysplazja warstwy mięśniowej (zastąpienie włókien okrężnych podłużnymi lub kolagenem) uniemożliwia propagację fali perystaltycznej z miedniczki do moczowodu, tworząc przeszkodę czynnościową/anatomiczną.",
        drugTarget: "Leczenie operacyjne – pieloplastyka Hynesa-Andersona z wycięciem dysplastycznego odcinka"
      },
      {
        title: "2. Wzrost ciśnienia śródmiedniczkowego i wodonercze",
        desc: "Zastój moczu powoduje rozciąganie miedniczki nerkowej i kielichów, wzrost ciśnienia w kanalikach zbiorczych oraz ucisk na naczynia krwionośne rdzenia nerki.",
        drugTarget: "Monitorowanie USG (wymiar APD) i unikanie leków nasilających diurezę przed zabiegiem"
      },
      {
        title: "3. Atrofia i ubytek miąższu nerkowego",
        desc: "Przewlekłe niedokrwienie i ucisk wywołują apoptozę komórek cewek nerkowych i kłębuszków, prowadząc do ścieńczenia kory i nieodwracalnego spadku filtracji kłębuszkowej (spadek DRF).",
        drugTarget: "Wczesna interwencja chirurgiczna przy DRF <40% zapobiegająca trwałemu zniszczeniu nerki"
      }
    ],
    dutySummary: "UPJO to najczęstsza przyczyna wodonercza wrodzonego. Charakteryzuje się poszerzeniem miedniczki (APD) i kielichów z nieposzerzonym moczowodem. USG poporodowe wykonaj po 48. h życia. Scyntygrafia MAG3 z furosemidem (T1/2 >20 min, spadek udziału <40%) potwierdza mechaniczną obturację. Złoty standard operacyjny to pieloplastyka Hynesa-Andersona.",
    diffTable: [
      { disease: "Odpływ pęcherzowo-moczowodowy (VUR)", diff: "Cofanie moczu z pęcherza widoczne w CUM; poszerzenie miedniczki zmienne w czasie mikcji, moczowód często poszerzony.", test: "Cystourografia mikcyjna (CUM)." },
      { disease: "Pierwotny moczowód olbrzymi (megaureter)", diff: "Poszerzenie moczowodu na całej długości ze zwężeniem w odcinku przypęcherzowym (UVJO).", test: "USG (widoczny poszerzony moczowód nad pęcherzem), scyntygrafia MAG3." },
      { disease: "Wielotorbielowatość nerek (ARPKD / ADPKD)", diff: "Mnogie torbiele w miąższu nerkowym, powiększenie nerek o zaburzonej architekturze kory, brak poszerzenia samej miedniczki.", test: "USG jamy brzusznej (struktura miąższu), wywiad genetyczny." },
      { disease: "Dysplazja wielotorbielowata nerki (MCDK)", diff: "Całkowity brak prawidłowego miąższu nerki, mnogie torbiele różnej wielkości niekomunikujące ze sobą, brak czynności w scyntygrafii (DRF 0%).", test: "USG (brak łączności między torbielami), scyntygrafia DMSA/MAG3 (brak wychwytu)." }
    ],
    lekQuestions: [
      {
        question: "U noworodka płci męskiej w badaniu prenatalnym stwierdzono poszerzenie lewej miedniczki nerkowej. W którym momencie życia optymalnie należy wykonać pierwsze poporodowe USG układu moczowego, przy braku cech bezmoczu i powiększenia pęcherza?",
        options: [
          "W pierwszych 2–4 godzinach po porodzie.",
          "W 1. dobie życia, przed pierwszym karmieniem.",
          "Po ukończeniu 48.–72. godziny życia.",
          "Dopiero po ukończeniu 1. roku życia.",
          "Nie wykonuje się USG, jeśli dziecko nie gorączkuje."
        ],
        correct: 2,
        explanation: "W pierwszych 48 godzinach życia u noworodka występuje fizjologiczny stan względnego odwodnienia i niskiej filtracji kłębuszkowej (oliguria fizjologiczna). Wykonanie USG w tym okresie może nie wykazać pełnego stopnia wodonercza (wynik fałszywie ujemny). Dlatego optymalnym czasem na pierwsze USG jest 3.–5. doba życia (po 48–72h), gdy diureza jest w pełni rozwinięta."
      },
      {
        question: "Wskaż kryterium w scyntygrafii dynamicznej nerek z podaniem furosemidu (99mTc-MAG3) przemawiające za utrwaloną, mechaniczną przeszkodą w odpływie moczu w przebiegu UPJO:",
        options: [
          "Czas połowiczego wypłukania znacznika (T1/2) krótszy niż 5 minut.",
          "Czas połowiczego wypłukania znacznika (T1/2) dłuższy niż 20 minut.",
          "Natychmiastowe obniżenie krzywej renograficznej do zera po iniekcji furosemidu.",
          "Względny udział czynnościowy nerki wynoszący 50% po obu stronach.",
          "Brak wychwytu znacznika przez wątrobę."
        ],
        correct: 1,
        explanation: "W teście furosemidowym (F+20 lub F0) czas T1/2 < 10 minut oznacza brak istotnej przeszkody (prawidłowy spływ), czas 10–20 minut to wynik niejednoznaczny, natomiast T1/2 > 20 minut świadczy o istotnej mechanicznej przeszkodzie w odpływie moczu (obturacji), co przy spadku udziału nerki (<40%) kwalifikuje do zabiegu operacyjnego."
      },
      {
        question: "Który zabieg chirurgiczny jest uznawany za złoty standard operacyjnego leczenia wrodzonego zwężenia połączenia miedniczkowo-moczowodowego (UPJO)?",
        options: [
          "Pieloplastyka sposobem Hynesa-Andersona.",
          "Operacja sposobem Ramstedta.",
          "Zabieg Kasai.",
          "Operacja sposobem Soave.",
          "Ureterosigmoideostomia."
        ],
        correct: 0,
        explanation: "Pieloplastyka rozczłonkowana Hynesa-Andersona polega na wycięciu dysplastycznego, zwężonego odcinka połączenia miedniczkowo-moczowodowego, ewentualnej redukcji nadmiaru miedniczki nerkowej i ponownym szerokim zespoleniu miedniczki z moczowodem. Jest złotym standardem leczenia UPJO."
      }
    ],
    flashcards: [
      { q: "Jaka jest najczęstsza przyczyna wrodzonego wodonercza u noworodków i niemowląt?", a: "Wrodzone zwężenie połączenia miedniczkowo-moczowodowego (UPJO).", cat: "Pediatria" },
      { q: "Dlaczego USG układu moczowego u noworodka z wodonerczem wykonuje się po 48.-72. h życia?", a: "Wcześniejsza fizjologiczna oliguria i względne odwodnienie mogą zaniżać stopień wodonercza (wynik fałszywie ujemny).", cat: "Pediatria" },
      { q: "Jaka wartość T1/2 w scyntygrafii dynamicznej MAG3 świadczy o mechanicznej przeszkodzie w UPJO?", a: "T1/2 > 20 minut po podaniu furosemidu.", cat: "Pediatria" },
      { q: "Jaki zabieg jest złotym standardem leczenia operacyjnego UPJO?", a: "Pieloplastyka sposobem Hynesa-Andersona.", cat: "Pediatria" },
      { q: "Co to są kryzy Dietla u starszych dzieci ze zwężeniem UPJ?", a: "Napadowe bóle brzucha z wymiotami po obfitym spożyciu płynów, często wywołane uciskiem przez dodatkowe naczynie dolnobiegunowe.", cat: "Pediatria" }
    ]
  },

  // 110: Odra (morbilli)
  {
    id: 110,
    filename: "110_odra_morbilli.json",
    dept: "Pediatria",
    shortTitle: "4-letnie nieszczepione dziecko – Gorączka 40°C, kaszel, zapalenie spojówek i zstępująca wysypka (Odra / Morbilli)",
    diagnosisTitle: "Odra (Morbilli / Measles) u dziecka nieszczepionego z plamkami Koplika i nieżytem dróg oddechowych",
    vitals: [
      { label: "HR", val: "144/min", sub: "Tachykardia gorączkowa", status: "warn" },
      { label: "BP", val: "92/58 mmHg", sub: "Prawidłowe", status: "ok" },
      { label: "SpO2", val: "96%", sub: "Prawidłowa", status: "ok" },
      { label: "RR", val: "32/min", sub: "Przyspieszony z powodu gorączki", status: "warn" },
      { label: "Temp", val: "39.9°C", sub: "Bardzo wysoka gorączka", status: "bad" }
    ],
    vitalsObj: { hr: 144, bp: "92/58", spo2: 96, rr: 32, temp: 39.9 },
    story: "4-letni chłopiec, nieszczepiony na prośbę rodziców (brak szczepień MMR), został przywieziony na izbę przyjęć z powodu gorączki sięgającej 40°C, szczekającego suchego kaszlu, obfitego surowiczo-śluzowego kataru oraz silnego światłowstrętu ze łzawieniem oczu utrzymujących się od 4 dni. Dziś rano za uszami i na linii owłosienia czoła pojawiła się czerwona plamisto-grudkowa wysypka, która szybko objęła całą twarz i szyję. Dziecko jest rozbitym, apatycznym, z obrzękiem powiek i przekrwionymi spojówkami. W badaniu jamy ustnej na błonie śluzowej policzków naprzeciw dolnych zębów trzonowych widoczne są drobne, białawe punkciki otoczone czerwoną obwódką wielkości ziaren piasku.",
    labs: [
      {
        category: "Badania serologiczne i molekularne w kierunku odry",
        items: [
          { name: "Przeciwciała anty-Measles IgM", val: "Dodatnie (+)", norm: "Ujemne", flag: "H" },
          { name: "Przeciwciała anty-Measles IgG", val: "Ujemne (-)", norm: "Dodatnie po szczepieniu", flag: "L" },
          { name: "RT-PCR w kierunku wirusa odry (wymaz z nosogardła / mocz)", val: "Dodatni (obecny RNA wirusa odry)", norm: "Ujemny", flag: "H" },
          { name: "Zgłoszenie do Państwowej Inspekcji Sanitarnej (PSSE)", val: "Wymagane natychmiast (formularz ZLK-1)", norm: "Rutynowe", flag: "H" }
        ]
      },
      {
        category: "Morfologia krwi i wskaźniki zapalne",
        items: [
          { name: "Leukocyty (WBC)", val: "3.4 G/L (leukopenia)", norm: "5.5–15.5 G/L", flag: "L" },
          { name: "Limfocyty (bezwzględna liczba)", val: "0.85 G/L (limfopenia)", norm: "1.5–6.0 G/L", flag: "L" },
          { name: "Płytki krwi (PLT)", val: "135 G/L (łagodna małopłytkowość)", norm: "150–450 G/L", flag: "L" },
          { name: "CRP", val: "12 mg/L", norm: "< 5.0 mg/L", flag: "H" }
        ]
      },
      {
        category: "Badania dodatkowe i gazometria",
        items: [
          { name: "RTG klatki piersiowej", val: "Wzmożony rysunek okołooskrzelowy, brak zagęszczeń miąższowych", norm: "Prawidłowy", flag: "N" },
          { name: "AspAT / AlAT", val: "48 / 38 IU/L", norm: "< 40 / < 35 IU/L", flag: "H" },
          { name: "Mocznik / Kreatynina", val: "22 / 0.35 mg/dL", norm: "15–36 / 0.25–0.50", flag: "N" }
        ]
      }
    ],
    steps: [
      {
        num: 1,
        title: "Identyfikacja patognomonicznego objawu wczesnego",
        task: "Drobne białawe plamki otoczone rumieniową obwódką na śluzówce policzków naprzeciw zębów trzonowych, przypominające ziarna piasku, to:",
        options: [
          { text: "Plamki Koplika – objaw patognomoniczny dla odry", correct: true, feedback: "Prawidłowo! Plamki Fiłatowa-Koplika pojawiają się na 1–2 dni przed wysypką i znikają w 2. dobie od jej wystąpienia. Są patognomoniczne dla okresu zwiastunowego odry." },
          { text: "Afty przewlekłe Mikulicza", correct: false, feedback: "Błąd! Afty to bolesne, pojedyncze owrzodzenia z żółtawym nalotem, nie towarzyszą im objawy zwiastunowe odry." },
          { text: "Objaw Forchheimera w różyczce", correct: false, feedback: "Błąd! Plamki Forchheimera to wybroczyny na podniebieniu miękkim w różyczce." },
          { text: "Pleśniawki wywołane przez Candida albicans", correct: false, feedback: "Błąd! Pleśniawki to białe, dające się zetrzeć kożuchowate naloty." }
        ]
      },
      {
        num: 2,
        title: "Okres zwiastunowy (prodromalny) i 'triada C'",
        task: "Jakie objawy składają się na klasyczny nieżytowy okres zwiastunowy odry (tzw. 3 x C w literaturze anglosaskiej)?",
        options: [
          { text: "Cough (kaszel), Coryza (nieżyt nosa / katar), Conjunctivitis (zapalenie spojówek ze światłowstrętem) z wysoką gorączką", correct: true, feedback: "Dokładnie tak! Triada 'C': Cough (suchy, męczący kaszel), Coryza (katar) i Conjunctivitis (zapalenie spojówek ze światłowstrętem i obrzękiem powiek) z gorączką do 40°C tworzą klasyczny obraz nieżytowy odry." },
          { text: "Biegunka, zapalenie ucha i sztywność karku", correct: false, feedback: "Błąd! To nie są typowe objawy prodromalne odry." },
          { text: "Świąd skóry, pokrzywka i obrzęk krtani", correct: false, feedback: "To obraz anafilaksji." },
          { text: "Wole tarczycowe, tachykardia i wytrzeszcz oczu", correct: false, feedback: "To objawy choroby Gravesa-Basedowa." }
        ]
      },
      {
        num: 3,
        title: "Morfologia i ewolucja wysypki odrowej",
        task: "Jaki jest charakterystyczny przebieg i wygląd wysypki w odrze?",
        options: [
          { text: "Gruboplamisto-grudkowa, zlewająca się, o barwie ciemnoczerwonej do ceglastej, o charakterze zstępującym (od głowy i zza uszu, przez tułów na kończyny), ustępująca z brunatnym przebarwieniem i drobnopłatkowym łuszczeniem", correct: true, feedback: "Doskonale! Wysypka odrowa pojawia się na szczycie gorączki, schodzi w dół (kierunek głowowo-ogonowy) w ciągu 2-3 dni, ma tendencję do zlewania się i pozostawia po sobie przebarwienia oraz otrębiaste/drobnopłatkowe łuszczenie naskórka (z wyjątkiem dłoni i stóp)." },
          { text: "Pęcherzyki na podłożu rumieniowym 'krople rosy' przekształcające się w krostki i strupy", correct: false, feedback: "To opis polimorficznej wysypki w ospie wietrznej (VZV)!" },
          { text: "Drobnoplamista wysypka 'papier ścierny' w zgięciach stawowych (linie Pastii)", correct: false, feedback: "To opis wysypki w płonicy (szkarlatynie)!" },
          { text: "Rumień wędrujący z przejaśnieniem w środku", correct: false, feedback: "To rumień wędrujący w boreliozie z Lyme." }
        ]
      },
      {
        num: 4,
        title: "Izolacja i postępowanie epidemiologiczne",
        task: "Wirus odry cechuje się jednym z najwyższych współczynników reprodukcji podstawowej (R0 = 12–18). Jakie środki izolacji i procedury epidemiologiczne należy wdrożyć?",
        options: [
          { text: "Natychmiastowa izolacja powietrzno-kropelkowa w izolatce z podciśnieniem, zgłoszenie podejrzenia do Państwowego Powiatowego Inspektora Sanitarnego (PSSE) oraz dochodzenie epidemiologiczne wśród kontaktów", correct: true, feedback: "Znakomicie! Odra jest chorobą wybitnie zaraźliwą przenoszoną drogą powietrzną. Pacjent wymaga natychmiastowej izolacji, a lekarz ma prawny obowiązek zgłoszenia podejrzenia odry do PSSE w ciągu 24 godzin (formularz ZLK-1)." },
          { text: "Wypisanie do domu komunikacją miejską bez żadnych zaleceń", correct: false, feedback: "Karygodne zagrożenie epidemiologiczne dla setek osób!" },
          { text: "Izolacja kontaktowa wyłącznie przy dotykaniu stolca", correct: false, feedback: "Błąd! Wirus odry rozprzestrzenia się drogą powietrzną z aerozolem oddechowym." },
          { text: "Nie ma obowiązku zgłaszania odry do Sanepidu", correct: false, feedback: "Błąd! Odra podlega obowiązkowemu zgłaszaniu pod rygorem odpowiedzialności karnej." }
        ]
      },
      {
        num: 5,
        title: "Suplementacja witaminy A w leczeniu odry",
        task: "Jakie leczenie wspomagające zaleca Światowa Organizacja Zdrowia (WHO) u wszystkich dzieci z rozpoznaniem odry w celu zmniejszenia ryzyka powikłań i śmiertelności?",
        options: [
          { text: "Doustne podanie witaminy A w wysokiej dawce przez 2 kolejne dni", correct: true, feedback: "Prawidłowo! WHO i AAP zalecają podanie witaminy A u każdego dziecka z odrą (u dzieci >= 1 r.ż. dawka wynosi 200 000 IU p.o. przez 2 kolejne dni). Niedobór witaminy A nasila uszkodzenie nabłonków dróg oddechowych i rogówki, a suplementacja znacząco obniża ryzyko ślepoty i śmiertelność z powodu zapalenia płuc." },
          { text: "Podanie dożylne acyklowiru w wysokich dawkach", correct: false, feedback: "Błąd! Acyklowir działa na herpeswirusy (HSV, VZV), nie ma żadnej aktywności wobec wirusa odry (paramyksowirusa)." },
          { text: "Profilaktyczna antybiotykoterapia ciprofloksacyną", correct: false, feedback: "Antybiotyki nie są wskazane rutynowo w infekcji wirusowej bez bakteryjnego nadkażenia." },
          { text: "Podanie aspiryny w celu zbicia gorączki", correct: false, feedback: "Kardynalny błąd! Kwas acetylosalicylowy u dzieci z infekcją wirusową (odra, ospa, grypa) grozi śmiertelnym zespołem Reye'a!" }
        ]
      },
      {
        num: 6,
        title: "Najczęstsze i najgroźniejsze powikłania odry",
        task: "Co jest najczęstszą przyczyną zgonu z powodu odry u małych dzieci?",
        options: [
          { text: "Zapalenie płuc (odrowe olbrzymiokomórkowe Hechta lub wtórne bakteryjne)", correct: true, feedback: "Świetnie! Powikłania oddechowe (zapalenie płuc) odpowiadają za ponad 60-80% zgonów związanych z odrą u dzieci. Wirus odry powoduje przejściową, ale głęboką immunosupresję (tzw. 'amnezję immunologiczną' trwającą nawet do 2-3 lat), ułatwiając śmiertelne nadkażenia bakteryjne (S. pneumoniae, S. aureus)." },
          { text: "Zawał mięśnia sercowego", correct: false, feedback: "Brak związku." },
          { text: "Niewydolność nerek z powodu kłębuszkowego zapalenia nerek", correct: false, feedback: "Nie jest to typowe powikłanie odry." },
          { text: "Ostre zapalenie wyrostka robaczkowego u każdego chorego", correct: false, feedback: "Błąd merytoryczny." }
        ]
      },
      {
        num: 7,
        title: "Późne powikłanie neurologiczne: SSPE",
        task: "Czym jest podostre stwardniające zapalenie mózgu (SSPE - Subacute Sclerosing Panencephalitis)?",
        options: [
          { text: "Śmiertelną, postępującą chorobą neurodegeneracyjną rozwijającą się po 5–10 latach od przebycia odry w wyniku przetrwałej mutacji wirusa w neuronach OUN", correct: true, feedback: "Doskonale! SSPE to nieuleczalne, w 100% śmiertelne powikłanie odry, rozwijające się średnio 7-10 lat po zachorowaniu (zwłaszcza u dzieci, które przebyły odrę przed 2. rokiem życia). Objawia się spadkiem funkcji poznawczych, miokloniami, otępieniem i zgonem." },
          { text: "Łagodnym zapaleniem nerwu wzrokowego ustępującym w 2 dni", correct: false, feedback: "Błędne i bagatelizujące." },
          { text: "Powikłaniem występującym wyłącznie po szczepieniu MMR", correct: false, feedback: "Kłamstwo antyszczepionkowe – szczepionka MMR nie wywołuje SSPE, lecz przed nim skutecznie chroni!" },
          { text: "Chorobą wywołaną przez prion Creutzfeldta-Jakoba", correct: false, feedback: "SSPE wywołuje przetrwały wirus odry, a nie prion." }
        ]
      },
      {
        num: 8,
        title: "Profilaktyka poekspozycyjna u osób z kontaktu",
        task: "Nieszczepiony 11-miesięczny brat pacjenta miał bezpośredni kontakt z chorym 48 godzin temu. Jakie postępowanie profilaktyczne poekspozycyjne jest wskazane?",
        options: [
          { text: "Podanie żywej atenuowanej szczepionki MMR w ciągu 72 godzin od ekspozycji (lub immunoglobuliny ludzkiej w ciągu 6 dni)", correct: true, feedback: "Znakomicie! Zgodnie z wytycznymi CDC i GIS, u osób nieszczepionych w wieku >= 6 miesięcy podanie szczepionki MMR w ciągu 72 godzin od ekspozycji zapewnia skuteczną ochronę. U niemowląt <6 m.ż., kobiet w ciąży i osób z ciężkim niedoborem odporności podaje się immunoglobulinę i.m. w ciągu do 6 dni od kontaktu." },
          { text: "Podanie wysokich dawek doksycykliny przez 14 dni", correct: false, feedback: "Antybiotyk nie chroni przed zakażeniem wirusowym." },
          { text: "Nie podejmuje się żadnych działań, czeka się na wystąpienie wysypki", correct: false, feedback: "Zaniechanie profilaktyki poekspozycyjnej naraża niemowlę na powikłania." },
          { text: "Natychmiastowa transfuzja wymienna krwi", correct: false, feedback: "Absurdalne postępowanie bez wskazań." }
        ]
      }
    ],
    pathoNodes: [
      {
        title: "1. Wniknięcie wirusa do nabłonka dróg oddechowych i tkanki limfatycznej",
        desc: "Wirus odry (Morbillivirus) wiąże się przez hemaglutyninę z receptorem CD150 (SLAM) na makrofagach i limfocytach oraz CD46/nektryną-4, namnażając się w węzłach chłonnych.",
        drugTarget: "Profilaktyka pierwotna: szczepienie ochronne MMR (dwie dawki zapewniają >97% ochronę)"
      },
      {
        title: "2. Wiremia pierwotna i wtórna oraz okres zwiastunowy",
        desc: "Masywny rozsiew wirusa we krwi prowadzi do zakażenia komórek śródbłonka i nabłonków w całym ustroju, powodując wysiękowe zapalenie spojówek, błon śluzowych (plamki Koplika) i dróg oddechowych.",
        drugTarget: "Suplementacja witaminy A (200 000 IU) regenerująca nabłonki i redukująca powikłania narządowe"
      },
      {
        title: "3. Reakcja immunologiczna i amnezja limfocytarna",
        desc: "Wysypka plamisto-grudkowa wynika z reakcji nadwrażliwości typu komórkowego (limfocyty T cytotoksyczne niszczą zakażone komórki śródbłonka skóry). Wirus niszczy pule limfocytów pamięci B i T (immunosupresja).",
        drugTarget: "Izolacja pacjenta i natychmiastowe zgłoszenie do PSSE (zapobieganie epidemii)"
      }
    ],
    dutySummary: "Odra u nieszczepionego dziecka to triad C (cough, coryza, conjunctivitis), wysoka gorączka do 40°C oraz patognomoniczne plamki Koplika na śluzówce policzków. Zstępująca gruboplamista wysypka zstępuje zza uszu i ustępuje z łuszczeniem. Kluczowe: bezwzględna izolacja, podanie witaminy A przez 2 dni, zgłoszenie do PSSE w 24h oraz profilaktyka poekspozycyjna kontaktów (MMR do 72h lub immunoglobulina do 6 dni).",
    diffTable: [
      { disease: "Różyczka (Rubella)", diff: "Łagodny przebieg, niska gorączka, powiększenie węzłów chłonnych podpotylicznych i karkowych, brak plamiek Koplika, wysypka drobnoplamista nie zlewa się.", test: "Serologia IgM różyczka, brak plamiek Koplika, stan ogólny dobry." },
      { disease: "Płonica (szkarlatyna)", diff: "Etiologia bakteryjna (GAS), zapalenie gardła bez kataru i zapalenia spojówek, malinowy język, wysypka drobnopunktowa w fałdach (Pastia), trójkąt Fiłatowa.", test: "Szybki test Strep-A, posiew z gardła, wysokie leukocyty i neutrofilia." },
      { disease: "Rumień nagły (gorączka trzydniowa / HHV-6)", diff: "Gorączka trwa 3 dni przy dobrym stanie ogólnym; wysypka pojawia się PO nagłym spadku temperatury, brak plamiek Koplika.", test: "Dynamika objawów (wysypka po ustąpieniu gorączki), wiek <2 r.ż." },
      { disease: "Choroba Kawasakiego", diff: "Gorączka >= 5 dni, obrzęki i rumień dłoni/stóp, malinowy język, spierzchnięte wargi, brak kataru i kaszlu, ryzyko tętniaków wieńcowych.", test: "Echo serca, kryteria Kawasakiego, wysokie płytki krwi i CRP." }
    ],
    lekQuestions: [
      {
        question: "U 4-letniego nieszczepionego dziecka z gorączką 39.8°C, suchym kaszlem, obfitym katarem i zapaleniem spojówek ze światłowstrętem, na śluzówce policzków naprzeciw dolnych zębów trzonowych stwierdzono drobne białawe wykwity wielkości ziaren piasku z czerwoną obwódką. Wykwity te to:",
        options: [
          "Plamki Koplika, patognomoniczne dla odry.",
          "Plamki Forchheimera, patognomoniczne dla różyczki.",
          "Afty Bednara, charakterystyczne dla niemowląt.",
          "Objaw Pastii, charakterystyczny dla płonicy.",
          "Wykwity herpanginy w zakażeniu Coxsackie."
        ],
        correct: 0,
        explanation: "Plamki Fiłatowa-Koplika (drobne, białawe grudki na rumieniowym podłożu na wysokości dolnych zębów trzonowych) są patognomonicznym objawem okresu zwiastunowego odry, wyprzedzającym pojawienie się wysypki o 24–48 godzin."
      },
      {
        question: "Zgodnie z zaleceniami WHO, jakie leczenie wspomagające należy podać każdemu dziecku z rozpoznaną odrą w celu redukcji powikłań i śmiertelności?",
        options: [
          "Acyklowir dożylnie przez 7 dni.",
          "Witamina A doustnie w wysokiej dawce przez 2 kolejne dni.",
          "Aspirynę w dawce przeciwzapalnej 100 mg/kg mc./dobę.",
          "Glikokortykosteroidy systemowe w dawce immunosupresyjnej.",
          "Ryfampicynę doustnie."
        ],
        correct: 1,
        explanation: "Światowa Organizacja Zdrowia (WHO) oraz Amerykańska Akademia Pediatrii (AAP) rekomendują podanie witaminy A w wysokiej dawce przez 2 kolejne dni u wszystkich dzieci z odrą. Odra wyczerpuje rezerwy witaminy A, co uszkadza nabłonki i nasila immunosupresję; podaż witaminy A zmniejsza ryzyko ślepoty i śmiertelnych powikłań płucnych."
      },
      {
        question: "U nieszczepionego 10-miesięcznego dziecka, które miało bezpośredni kontakt z chorym na odrę 36 godzin temu, w ramach profilaktyki poekspozycyjnej należy:",
        options: [
          "Podać szczepionkę przeciwko odrze, śwince i różyczce (MMR) w ciągu 72 godzin od ekspozycji.",
          "Podać amoksycylinę doustnie przez 10 dni.",
          "Zastosować profilaktykę acyklowirem przez 14 dni.",
          "Wdrożyć wyłącznie izolację domową bez żadnych interwencji medycznych.",
          "Wykonać natychmiastowe przetoczenie osocza świeżo mrożonego."
        ],
        correct: 0,
        explanation: "W profilaktyce poekspozycyjnej odry u osób nieszczepionych w wieku >= 6 miesięcy zaleca się podanie żywej atenuowanej szczepionki MMR w ciągu 72 godzin od kontaktu. Zapewnia to skuteczną ochronę przed rozwojem choroby lub znacznie łagodzi jej przebieg. U osób z przeciwwskazaniami do MMR (np. kobiety w ciąży, ciężka immunosupresja, niemowlęta <6 m.ż.) podaje się immunoglobulinę ludzką w ciągu 6 dni od ekspozycji."
      }
    ],
    flashcards: [
      { q: "Czym są plamki Koplika i dla jakiej choroby są patognomoniczne?", a: "To drobne, białe wykwity na błonie śluzowej policzków naprzeciw dolnych zębów trzonowych, patognomoniczne dla okresu zwiastunowego odry.", cat: "Pediatria" },
      { q: "Jaka jest triada objawów zwiastunowych w odrze (3 x C)?", a: "Cough (kaszel), Coryza (katar) i Conjunctivitis (zapalenie spojówek ze światłowstrętem) z wysoką gorączką.", cat: "Pediatria" },
      { q: "Jak wygląda i ustępuje wysypka w odrze?", a: "Ciemnoczerwona plamisto-grudkowa, zlewająca się, o kierunku zstępującym (od twarzy na tułów i kończyny), ustępuje z brunatnym przebarwieniem i łuszczeniem.", cat: "Pediatria" },
      { q: "Jakie leczenie wspomagające zaleca WHO u każdego dziecka z odrą?", a: "Suplementację witaminy A w wysokiej dawce przez 2 kolejne dni.", cat: "Pediatria" },
      { q: "Czym jest SSPE po przebyciu odry?", a: "Podostre stwardniające zapalenie mózgu – odległe (po 5–10 latach), śmiertelne powikłanie neurodegeneracyjne wywołane przetrwałym wirusem odry.", cat: "Pediatria" }
    ]
  }
];

async function run() {
  console.log(`Processing cases: ${cases.map(c => c.id).join(', ')}...`);
  for (const c of cases) {
    const raw = JSON.stringify(c, null, 2);
    const enc = await encryptStringAes(raw, PASSWORD);
    fs.writeFileSync(`cases/${c.filename}`, JSON.stringify(enc, null, 2), 'utf8');
    console.log(`Encrypted & saved cases/${c.filename}`);
  }
  console.log('Batch 106-110 finished successfully.');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});

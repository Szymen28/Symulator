const fs = require('fs');
const path = require('path');
const { encryptStringAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

const case144 = {
  id: 144,
  dept: "Chirurgia naczyniowa",
  title: "Zakrzepica żył głębokich (Deep Vein Thrombosis – DVT)",
  shortTitle: "54-letnia Barbara – Bolesny obrzęk i asymetria obwodów lewego podudzia po locie samolotem (Zakrzepica żył głębokich / DVT)",
  diagnosisTitle: "Zakrzepica żył głębokich (DVT) proksymalna żyły udowo-podkolanowej lewej po locie transatlantyckim – triada Virchowa, skala Wellsa, test CUS, terapia DOAC (apiksaban), profilaktyka PTS",
  vitals: [
    { name: "Częstość akcji serca", val: "88/min", status: "vital-ok" },
    { name: "Ciśnienie tętnicze", val: "125/78 mmHg", status: "vital-ok" },
    { name: "Temperatura ciała", val: "37.4 °C", status: "vital-warn" },
    { name: "Saturacja SpO2", val: "98%", status: "vital-ok" }
  ],
  vitalsObj: {
    hr: 88,
    bp: "125/78",
    spo2: 98,
    rr: 16,
    temp: 37.4,
    gcs: 15
  },
  story: "<p><strong>Pacjentka:</strong> 54-letnia kobieta, architekt, zgłosiła się na SOR z powodu narastającego od 2 dni, bolesnego obrzęku lewego podudzia i dołu podkolanowego, połączonego z uczuciem ciężkości i bolesnego rozpierania łydki nasilającego się podczas stania i chodzenia.</p><p><strong>Wywiad chorobowy:</strong> Przed trzema dniami pacjentka powróciła z delegacji służbowej z Chicago – spędziła ponad 11 godzin w samolocie w pozycji siedzącej bez wstawania. W wywiadzie: od 4 lat stosuje doustną hormonalną terapię zastępczą (HTZ: estrogeny z progestagenem), BMI 29,2 kg/m2. W wywiadzie rodzinnym żylaki kończyn dolnych u matki. Pacjentka neguje duszność, ból opłucnowy w klatce piersiowej, kaszel, krwioplucie oraz wcześniejsze epizody żylnej choroby zakrzepowo-zatorowej (ŻChZZ). Nie przyjmuje leków przeciwkrzepliwych.</p><p><strong>Badanie przedmiotowe na SOR:</strong> W badaniu kończyn dolnych: widoczna wyraźna asymetria obwodów – lewe podudzie potężnie obrzęknięte, ciastowate, ze śladem po ucisku palcem. Obwód lewego podudzia (mierzony 10 cm poniżej guzowatości piszczeli) wynosi 41 cm, natomiast prawego podudzia 36 cm (różnica wynosi 5 cm!). Skóra lewej łydki jest cieplejsza o 1,5°C od prawej, lekko lśniąca, z widocznym poszerzeniem powierzchownych żył krążenia obocznego na przedniej powierzchni goleni (tzw. żyły ostrzegawcze Pratta). Wyraźna bolesność palpacyjna mięśni łydki przy ucisku przednio-tylnym (objaw Mayra) oraz ostry ból w dole podkolanowym przy gwałtownym zgięciu grzbietowym stopy przy wyprostowanym kolanie (dodatni objaw Homansa). Tętno na tętnicach grzbietowych stóp i piszczelowych tylnych jest w pełni wyczuwalne i symetryczne na obu kończynach. Tony serca czyste, miarowe 88/min, ciśnienie 125/78 mmHg, osłuchowo nad płucami szmer pęcherzykowy symetryczny.</p>",
  labs: [
    {
      name: "Morfologia krwi i parametry zapalne",
      items: [
        { name: "Hemoglobina (Hb)", val: "13.6 g/dl", norm: "12.0 - 16.0 g/dl", flag: "NORMAL" },
        { name: "Hematokryt (Hct)", val: "40.5 %", norm: "37.0 - 47.0 %", flag: "NORMAL" },
        { name: "Leukocyty (WBC)", val: "8.6 G/l", norm: "4.0 - 10.0 G/l", flag: "NORMAL" },
        { name: "Płytki krwi (PLT)", val: "265 G/l", norm: "150 - 400 G/l", flag: "NORMAL" },
        { name: "CRP", val: "14.2 mg/l", norm: "< 5.0 mg/l", flag: "HIGH" }
      ]
    },
    {
      name: "Koagulologia i marker zakrzepicy",
      items: [
        { name: "D-dimery", val: "3850 ng/ml", norm: "< 500 ng/ml", flag: "CRIT_HIGH" },
        { name: "INR", val: "1.04", norm: "0.8 - 1.2", flag: "NORMAL" },
        { name: "APTT", val: "31 s", norm: "26 - 36 s", flag: "NORMAL" },
        { name: "Fibrynogen", val: "4.1 g/l", norm: "2.0 - 4.0 g/l", flag: "HIGH" }
      ]
    },
    {
      name: "Biochemia i funkcja nerek",
      items: [
        { name: "Kreatynina", val: "0.82 mg/dl", norm: "0.5 - 1.0 mg/dl", flag: "NORMAL" },
        { name: "eGFR", val: "> 90 ml/min/1.73m2", norm: "> 90 ml/min", flag: "NORMAL" },
        { name: "Mocznik", val: "28 mg/dl", norm: "15 - 45 mg/dl", flag: "NORMAL" },
        { name: "ALT", val: "24 IU/l", norm: "< 35 IU/l", flag: "NORMAL" },
        { name: "Bilirubina całkowita", val: "0.7 mg/dl", norm: "0.2 - 1.2 mg/dl", flag: "NORMAL" }
      ]
    }
  ],
  steps: [
    {
      title: "Krok 1: Wstępna ocena kliniczna i Triada Virchowa",
      text: "Lekarz analizuje czynniki ryzyka u pacjentki z jednostronnym obrzękiem podudzia po podróży lotniczej. Jakie trzy patofizjologiczne mechanizmy tworzą klasyczną Triadę Virchowa predysponującą do zakrzepicy żył głębokich (DVT)?",
      options: [
        "Zwolnienie przepływu krwi (zastój żylny), uszkodzenie ściany naczynia (dysfunkcja śródbłonka) oraz nadkrzepliwość krwi (trombofilia wrodzona lub nabyta / stan prozakrzepowy)",
        "Spadek ciśnienia krwi, rozszerzenie źrenic i bradykardia",
        "Kwasica metaboliczna, hiperkaliemia i hipotermia",
        "Wzrost ciśnienia śródczaszkowego, obrzęk tarczy nerwu wzrokowego i bradykardia"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Triada Virchowa (Virchow's Triad) z 1856 roku jest fundamentem patofizjologii zakrzepicy żylnej:</strong><br>1. <strong>Zastój żylny (Stasis):</strong> wielogodzinne unieruchomienie w samolocie w pozycji siedzącej (>6-8 godzin) wyłącza pompę mięśniową łydki, prowadząc do zalegania krwi w zatokach żylnych mięśnia płaszczkowatego.<br>2. <strong>Nadkrzepliwość (Hypercoagulability):</strong> przyjmowanie hormonalnej terapii zastępczej (estrogeny zwiększają syntezę czynników krzepnięcia II, VII, VIII, X w wątrobie i obniżają poziom antytrombiny oraz białka S) w połączeniu z odwodnieniem w kabinie samolotu.<br>3. <strong>Uszkodzenie śródbłonka (Endothelial injury):</strong> mikrourazy wywołane uciskiem krawędzi fotela lotniczego na żyłę podkolanową.",
        "❌ BŁĄD! <strong>To cechy wstrząsu lub wagotonii.</strong>",
        "❌ BŁĄD! <strong>To śmiertelna triada urazowo-krwotoczna, a nie triada Virchowa.</strong>",
        "❌ BŁĄD! <strong>To triada Cushinga w nadciśnieniu śródczaszkowym.</strong>"
      ]
    },
    {
      title: "Krok 2: Badanie fizykalne i objawy zakrzepicy żylnej",
      text: "W badaniu fizykalnym stwierdzono asymetrię obwodów podudzi wynoszącą 5 cm oraz dodatni objaw Homansa i Mayra. Jak bada się te objawy i jaka asymetria obwodu goleni jest klinicznie istotna?",
      options: [
        "Różnica obwodu podudzi >3 cm (mierzona 10 cm poniżej guzowatości piszczeli) jest silnym predyktorem DVT; objaw Homansa to ból łydki przy biernym zgięciu grzbietowym stopy przy wyprostowanym kolanie; objaw Mayra to bolesność uciskowa mięśni łydki przy ucisku z boku",
        "Różnica obwodów musi wynosić co najmniej 15 cm, aby miała znaczenie",
        "Objaw Homansa bada się poprzez uderzenie młoteczkiem neurologicznym w rzepkę",
        "Bolesność łydki ma znaczenie wyłącznie podczas spoczynku w łóżku"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Kluczowe objawy w badaniu przedmiotowym DVT:</strong><br>1. <strong>Asymetria obwodów:</strong> różnica obwodu podudzi <strong>>=3 cm</strong> (mierzona w tym samym punkcie na obu nogach, standardowo 10 cm poniżej guzowatości piszczeli) jest jednym z najważniejszych objawów uwzględnionych w skali Wellsa.<br>2. <strong>Objaw Homansa:</strong> ostry ból w łydce i dole podkolanowym wyzwalany przez energiczne, bierne grzbietowe zgięcie stopy przy wyprostowanym stawie kolanowym (naciąga niedokrwione, objęte zakrzepicą żyły głębokie).<br>3. <strong>Objaw Mayra:</strong> ból przy ucisku przednio-tylnym brzuśca mięśnia trójgłowego łydki do kości piszczelowej.<br>4. <strong>Żyły ostrzegawcze Pratta:</strong> widoczne poszerzenie powierzchownych żył krążenia obocznego na przedniej powierzchni goleni.",
        "❌ BŁĄD! <strong>Próg kliniczny to już >=3 cm różnicy obwodu.</strong>",
        "❌ BŁĄD! <strong>Uderzenie młoteczkiem to odruch kolanowy.</strong>",
        "❌ BŁĄD! <strong>Ból przy chodzeniu i ucisku mięśni to kardynalny objaw DVT.</strong>"
      ]
    },
    {
      title: "Krok 3: Stratyfikacja prawdopodobieństwa klinicznego – Skala Wellsa",
      text: "Lekarz naczyniowy oblicza punktację w skali Wellsa dla zakrzepicy żył głębokich. Ile punktów uzyskuje pacjentka i jak kwalifikuje ją to w algorytmie diagnostycznym ŻChZZ?",
      options: [
        "3 punkty (obrzęk całego podudzia +1, asymetria obwodu podudzia >3 cm +1, zlokalizowana bolesność wzdłuż przebiegu żył głębokich +1) -> wysokie prawdopodobieństwo DVT (grupa DVT probable / likely); badaniem pierwszego rzutu jest natychmiastowe USG z testem uciskowym (CUS)",
        "0 punktów (grupa niskiego ryzyka; wystarczy oznaczyć D-dimery)",
        "-2 punkty (wykluczenie zakrzepicy na podstawie wywiadu)",
        "Skala Wellsa dotyczy wyłącznie zatorowości płucnej, nie stosuje się jej w DVT"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Skala Wellsa dla DVT jest międzynarodowym standardem stratyfikacji prawdopodobieństwa:</strong><br>- Nowotwór złośliwy aktywny (+1)<br>- Porażenie, niedowład lub unieruchomienie gipsem kończyny (+1)<br>- Niedawne unieruchomienie w łóżku >3 dni lub duża operacja w ciągu 12 tyg. (+1)<br>- <strong>Miejscowa bolesność wzdłuż układu żył głębokich (+1)</strong> [u pacjentki obecna]<br>- <strong>Obrzęk całej kończyny dolnej (+1)</strong> [u pacjentki obecny]<br>- <strong>Obwód goleni o >3 cm większy od strony zdrowej (+1)</strong> [u pacjentki 5 cm = +1]<br>- Obrzęk ciastowaty większy na chorej nodze (+1)<br>- Widoczne żyły krążenia obocznego (+1)<br>- Przebyta udokumentowana DVT (+1)<br>- Alternatywne rozpoznanie co najmniej tak samo prawdopodobne (-2)<br>Wynik pacjentki wynosi <strong>3-4 punkty (DVT prawdopodobna / wysokie ryzyko)</strong>. W tej grupie <strong>badaniem pierwszego rzutu jest natychmiastowe USG (CUS)</strong>, a nie same D-dimery!",
        "❌ BŁĄD! <strong>Pacjentka ma ewidentne cechy kliniczne dające minimum 3 punkty.</strong>",
        "❌ BŁĄD! <strong>Punktacja ujemna jest niemożliwa przy tylu objawach DVT.</strong>",
        "❌ BŁĄD! <strong>Istnieją dwie odrębne skale Wellsa: dla DVT (zakrzepicy żył głębokich) oraz dla PE (zatorowości płucnej).</strong>"
      ]
    },
    {
      title: "Krok 4: Złoty standard obrazowania – USG z testem uciskowym (CUS)",
      text: "Lekarz wykonuje przyłóżkowe badanie ultrasonograficzne żył kończyny dolnej. Co jest kluczowym, patognomonicznym kryterium rozpoznania zakrzepicy żył głębokich w ultrasonograficznym teście uciskowym (CUS – Compression Ultrasound)?",
      options: [
        "Brak całkowitej zapadalności (kompresji) światła żyły pod wpływem bezpośredniego ucisku głowicą ultrasonograficzną",
        "Obecność przyspieszonego przepływu krwi w tętnicy udowej powierzchownej",
        "Zanikanie kości piszczelowej w obrazie USG",
        "Wykrycie płynu w jamie opłucnowej"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Ultrasonograficzny test uciskowy (CUS – Compression Ultrasound) jest złotym standardem rozpoznania DVT o czułości i swoistości przekraczającej 95% dla żył proksymalnych:</strong><br>Prawidłowa, zdrowa żyła pod wpływem lekkiego ucisku głowicą przykłada się ścianą przednią do tylnej i całkowicie zapada (kolabuje). <strong>Jeśli w świetle naczynia znajduje się skrzeplina, żyła NIE ZAPADA SIĘ pod uciskiem głowicy!</strong> Dodatkowo w badaniu Dopplerem widoczny jest brak przepływu lub przepływ brzeżny, brak zmienności oddechowej przepływu oraz echogeniczne masy skrzepliny w świetle naczynia.",
        "❌ BŁĄD! <strong>Przepływ w tętnicy nie definiuje zakrzepicy w układzie żylnym.</strong>",
        "❌ BŁĄD! <strong>USG nie służy do oceny gęstości mineralnej kości.</strong>",
        "❌ BŁĄD! <strong>Płyn w opłucnej to cecha zawału płuca/PE, a nie kryterium USG kończyny.</strong>"
      ]
    },
    {
      title: "Krok 5: Różnicowanie anatomiczne: DVT proksymalna vs dystalna",
      text: "W badaniu USG wykazano brak zapadalności żyły podkolanowej i żyły udowej powierzchownej lewej. Jakie znaczenie kliniczne ma podział zakrzepicy na postać proksymalną i dystalną?",
      options: [
        "DVT proksymalna (obejmująca żyłę podkolanową, udową i/lub biodrową) wiąże się z bardzo wysokim ryzykiem zatorowości płucnej (PE) sięgającym 50% i bezwzględnie wymaga pełnego leczenia przeciwkrzepliwego; DVT dystalna (ograniczona do żył goleni poniżej kolana) rzadziej daje PE i ma łagodniejszy przebieg",
        "DVT proksymalna leczy się wyłącznie dietą owocową",
        "DVT dystalna zawsze wymaga natychmiastowej amputacji stopy",
        "Lokalizacja skrzepliny nie ma żadnego znaczenia rokowniczego ani terapeutycznego"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Podział anatomiczny DVT determinuje ryzyko zatorowości płucnej (PE):</strong><br>1. <strong>DVT proksymalna (Proximal DVT) – ok. 80% przypadków:</strong> skrzeplina lokalizuje się w żyle podkolanowej, udowej lub biodrowej. Naczynia te mają duże światło, a skrzepliny są masywne i łatwo ulegają urwaniu – <strong>aż do 50% chorych z nieleczoną proksymalną DVT doznaje objawowej lub niemej zatorowości płucnej (PE)!</strong> Bezwzględnie wymaga natychmiastowej pełnej antykoagulacji.<br>2. <strong>DVT dystalna (Distal / calf DVT):</strong> ograniczona do żył głębokich łydki (strzałkowych, piszczelowych). Ryzyko PE jest niskie (<10%), ale w 15-20% nieleczona skrzeplina wstępuje proksymalnie do żyły podkolanowej.",
        "❌ BŁĄD! <strong>DVT proksymalna to stan bezpośredniego zagrożenia zgonem z zatorowości płucnej!</strong>",
        "❌ BŁĄD! <strong>DVT dystalna nigdy nie jest wskazaniem do amputacji.</strong>",
        "❌ BŁĄD! <strong>Lokalizacja naczyniowa jest najważniejszym czynnikiem stratyfikacji ryzyka PE.</strong>"
      ]
    },
    {
      title: "Krok 6: Współczesne leczenie przeciwkrzepliwe – Wybór leku (DOAC)",
      text: "Pacjentka ma eGFR >90 ml/min i brak przeciwwskazań do antykoagulacji. Jaki schemat leczenia farmakologicznego jest obecnie lekiem pierwszego wyboru wg wytycznych ESC, CHEST i wytycznych polskich?",
      options: [
        "Doustne bezpośrednie antykoagulanty (DOAC) – apiksaban (10 mg 2x/d przez pierwsze 7 dni, następnie 5 mg 2x/d) LUB rywaroksaban (15 mg 2x/d przez 21 dni, następnie 20 mg raz/d) w monoterapii bez konieczności początkowego podawania heparyny i bez monitorowania parametrów krzepnięcia",
        "Sama aspiryna w dawce 75 mg raz na dobę",
        "Podawanie witaminy K w iniekcjach domięśniowych",
        "Warfaryna w monoterapii od pierwszej doby bez heparyny"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Bezpośrednie doustne antykoagulanty (DOAC: apiksaban, rywaroksaban, dabigatran, edoksaban) są lekami pierwszego rzutu w leczeniu DVT u chorych bez nowotworu złośliwego i bez zespołu antyfosfolipidowego!</strong><br>- <strong>Apiksaban:</strong> <span class='dose-pill'>10 mg p.o. 2x/dobę przez 7 dni</span>, następnie dawka podtrzymująca <span class='dose-pill'>5 mg p.o. 2x/dobę</span>.<br>- <strong>Rywaroksaban:</strong> <span class='dose-pill'>15 mg p.o. 2x/dobę przez 21 dni</span>, następnie dawka podtrzymująca <span class='dose-pill'>20 mg p.o. raz/dobę</span> z posiłkiem.<br>Zarówno apiksaban, jak i rywaroksaban stosuje się w tzw. monoterapii doustnej od 1. dnia (single-drug approach) – <strong>nie wymagają wstępnego mostkowania heparyną drobnocząsteczkową ani rutynowej kontroli INR</strong> i cechują się znacznie mniejszym ryzykiem śmiertelnych krwawień wewnątrzczaszkowych niż VKA (warfaryna).",
        "❌ BŁĄD! <strong>Aspiryna jest lekiem przeciwpłytkowym o znikomej skuteczności w ostrej zakrzepicy żylnej.</strong>",
        "❌ BŁĄD! <strong>Witamina K działa prozakrzepowo i znosi działanie VKA.</strong>",
        "❌ BŁĄD! <strong>Monoterapia warfaryną na początku wywołuje przejściowy stan nadkrzepliwości (spadek białka C) i grozi martwicą skóry (warfarin-induced skin necrosis)!</strong>"
      ]
    },
    {
      title: "Krok 7: Czas trwania antykoagulacji i eliminacja czynników ryzyka",
      text: "Epizod DVT u pacjentki został sprowokowany dużym przemijającym czynnikiem ryzyka (lot transatlantycki >8 h) w połączeniu z przyjmowaniem HTZ. Jaki jest zalecany czas trwania leczenia przeciwkrzepliwego oraz jakie zalecenie dotyczące HTZ należy wydać?",
      options: [
        "Leczenie przeciwkrzepliwe przez okres 3 miesięcy oraz bezwzględne i natychmiastowe odstawienie doustnej hormonalnej terapii zastępczej (HTZ)",
        "Leczenie przeciwkrzepliwe przez 2 dni, po czym odstawienie leków",
        "Terapia antykoagulantami przez 30 lat z jednoczesnym podwojeniem dawki HTZ",
        "Zakaz chodzenia i unieruchomienie w łóżku na 6 miesięcy"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Zasady określania czasu trwania antykoagulacji w ŻChZZ:</strong><br>1. <strong>Zakrzepica sprowokowana dużym, przemijającym czynnikiem ryzyka</strong> (lot samolotem >8 h, operacja w znieczuleniu ogólnym, unieruchomienie w gipsie, uraz): standardowy czas leczenia wynosi <strong>dokładnie 3 miesiące</strong>. Po tym czasie ryzyko nawrotu jest niskie (<3% rocznie).<br>2. <strong>Eliminacja czynnika wyzwalającego:</strong> doustna HTZ i antykoncepcja hormonalna zwiększają ryzyko ŻChZZ 3-6-krotnie i muszą zostać natychmiast trwale odstawione!<br>3. <strong>Zakrzepica niesprowokowana (idiopatyczna):</strong> wymaga leczenia przez minimum 3-6 miesięcy, a u wielu chorych przewlekłego (bezterminowego) z powodu 30% ryzyka nawrotu w ciągu 5 lat.",
        "❌ BŁĄD! <strong>2 dni leczenia to natychmiastowy nawrót zatorowości płucnej i zgon.</strong>",
        "❌ BŁĄD! <strong>Utrzymanie HTZ po epizodzie DVT jest kardynalnym błędem i przeciwwskazaniem.</strong>",
        "❌ BŁĄD! <strong>Współczesna flebologia nakazuje wczesną mobilizację, a nie leżenie w łóżku!</strong>"
      ]
    },
    {
      title: "Krok 8: Profilaktyka zespołu pozakrzepowego (PTS) i mobilizacja chorego",
      text: "Pacjentka pyta, czy powinna bezwzględnie leżeć plackiem w łóżku przez 2 tygodnie oraz jak uchronić się przed trwałym obrzękiem i owrzodzeniami nogi w przyszłości. Jakie są zalecenia dotyczące mobilizacji i kompresjoterapii w ostrej DVT?",
      options: [
        "Zaleca się wczesne uruchomienie i regularne chodzenie od pierwszej doby po włączeniu antykoagulacji oraz wdrożenie kompresjoterapii (podkolanówki lub pończochy uciskowe II klasy ucisku 23-32 mmHg) w celu redukcji obrzęku i zapobiegania zespołowi pozakrzepowemu (PTS)",
        "Bezwzględny reżim leżenia w łóżku przez 4 tygodnie bez prawa do opuszczania nóg",
        "Stosowanie gorących kąpieli i masaży leczniczych łydki wibratorem",
        "Pończochy uciskowe są bezwzględnie zakazane w zakrzepicy żył"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Paradygmat leczenia DVT zmienił się diametralnie:</strong><br>1. <strong>Wczesna mobilizacja:</strong> dawny pogląd o konieczności leżenia w łóżku ('bo urwie się skrzeplina') został obalony w badaniach klinicznych! Chodzenie z zachowaną kompresją zewnętrzną usprawnia powrót żylny, zmniejsza ból i obrzęk oraz <strong>nie zwiększa ryzyka zatorowości płucnej</strong> pod warunkiem wdrożenia antykoagulacji.<br>2. <strong>Profilaktyka Zespołu Pozakrzepowego (PTS – Post-Thrombotic Syndrome):</strong> zniszczenie zastawek żylnych i pozakrzepowe nadciśnienie żylne prowadzą u 20-50% chorych do przewlekłego obrzęku, stwardnienia skóry (lipodermatosclerosis) i owrzodzeń podudzia. Zastosowanie <strong>kompresjoterapii stopniowanej (II klasa kompresji: 23-32 mmHg)</strong> redukuje obrzęk i zmniejsza ryzyko rozwoju ciężkiego PTS.",
        "❌ BŁĄD! <strong>Długie leżenie w łóżku nasila zastój krwi i zwiększa ryzyko progresji zakrzepicy.</strong>",
        "❌ BŁĄD! <strong>Gorące kąpiele i masaże łydki w ostrej fazie mogą mechanicznie oderwać skrzeplinę i wywołać zator płucny!</strong>",
        "❌ BŁĄD! <strong>Kompresjoterapia jest jednym z filarów leczenia objawowego i profilaktyki PTS.</strong>"
      ]
    }
  ],
  pathoNodes: [
    {
      badge: "Zastój żylny",
      title: "Spowolnienie przepływu i hipoksja zastawek",
      short: "Zaleganie krwi w kieszonkach zastawek żylnych goleni",
      detail: "Wielogodzinne unieruchomienie w locie lotniczym zatrzymuje pompę mięśniową łydki. Niedotlenienie śródbłonka w dnie zastawek żylnych odsłania podśródbłonkowy kolagen i czynnik tkankowy.",
      target: "Kieszonki zastawek żył głębokich łydki",
      drugTarget: "<span class='dose-pill'>Wczesna mobilizacja</span> regularne napinanie mięśni podudzia"
    },
    {
      badge: "Aktywacja trombiny",
      title: "Wzrost krzepliwości indukowany estrogenami (HTZ)",
      short: "Wzrost czynników krzepnięcia i spadek antytrombiny III",
      detail: "Doustna HTZ nasila wątrobową syntezę protrombiny i fibrynogenu przy jednoczesnym nabytej oporności na aktywowane białko C. Masywna generacja trombiny polimeryzuje fibrynogen w czerwoną skrzeplinę.",
      target: "Kaskada krzepnięcia krwi",
      drugTarget: "<span class='dose-pill'>Apiksaban 10 mg 2x/d</span> bezpośredni inhibitor czynnika Xa"
    },
    {
      badge: "Niedrożność proksymalna",
      title: "Propagacja skrzepliny do żyły udowej",
      short: "Masywna okluzja odpływu żylnego z kończyny dolnej",
      detail: "Skrzeplina narasta proksymalnie do żyły podkolanowej i udowej, całkowicie blokując główny odpływ krwi. Ciśnienie żylne gwałtownie rośnie, powodując wysięk płynu do przestrzeni pozanaczyniowej (obrzęk asymetryczny >3 cm).",
      target: "Żyła podkolanowa i udowa powierzchowna",
      drugTarget: "<span class='dose-pill'>Pończochy uciskowe II klasy (23-32 mmHg)</span> redukcja ciśnienia żylnego"
    },
    {
      badge: "Destrukcja zastawek",
      title: "Zapalenie ściany żyły i zespół pozakrzepowy (PTS)",
      short: "Fibroza i niewydolność zastawek prowadzące do nadciśnienia żylnego",
      detail: "Nawet po rekanalizacji skrzepliny dochodzi do zbliznowacenia i uszkodzenia delikatnych płatków zastawek żylnych. Utrata jednokierunkowości przepływu skutkuje przewlekłym nadciśnieniem żylnym i owrzodzeniami goleni.",
      target: "Aparat zastawkowy żył głębokich",
      drugTarget: "<span class='dose-pill'>Leczenie DOAC przez 3 mies.</span> zapobieganie nawrotom i destrukcji"
    }
  ],
  diffTable: {
    title: "⚔️ Tabela Różnicowa: Zakrzepica żył głębokich vs Inne przyczyny jednostronnego obrzęku i bólu podudzia",
    headers: ["Cecha kliniczna", "Zakrzepica żył głębokich (DVT)", "Pęknięta torbiel Bakera (Pseudothrombophlebitis)", "Róża podudzia (Erysipelas)", "Naderwanie mięśnia brzuchatego (Tennis leg)", "Przewlekły obrzęk limfatyczny (Lymphedema)"],
    rows: [
      ["Początek i wywiad", "Podostry (1-3 dni), długi lot, operacja, HTZ/antykoncepcja, brak urazu", "Nagły ból w dole podkolanowym podczas kucania/wysiłku; wywiad gonartrozy", "Ostry początek: dreszcze, wysoka gorączka (>38,5°C), wrota zakażenia (grzybica)", "Nagły, ostry ból w łydce ('jak uderzenie biczem') podczas sprintu lub gry w tenisa", "Powolny, wielomiesięczny, bezbolesny obrzęk stopy i goleni; wywiad operacji onkologicznej"],
      ["Obraz w badaniu USG", "Brak zapadalności żyły podkolanowej/udowej w teście uciskowym (CUS)", "Płyn w tkance podskórnej łydki spływający z pękniętej torbieli podkolanowej; żyły drożne!", "Prawidłowy obraz układu żył głębokich; obrzęk i pogrubienie skóry właściwej", "Krwiak śródmięśniowy na granicy brzuśca przyśrodkowego i ścięgna; żyły drożne", "Skóra o wyglądzie 'plastra miodu'; naczynia żylne w pełni drożne i zapadające się"],
      ["Zabarwienie i wygląd skóry", "Skóra bladoróżowa lub sinoczerwona, lśniąca, poszerzone żyły powierzchowne Pratta", "Krwiak podskórny poniżej kostki przyśrodkowej (tzw. objaw crescent sign)", "Żywoczerwony, lśniący, ostro odgraniczony rumień z 'wypustkami', skóra gorąca", "Podbiegnięcie krwawe (krwiak) w dolnej części łydki po 24-48 h", "Blada, pogrubiała, stwardniała skóra o typie 'skórki pomarańczowej', objaw Stemmera (+)"],
      ["Gorączka i parametry zapalne", "Stany podgorączkowe (do 37,5°C); umiarkowany wzrost CRP (<20-30 mg/l)", "Brak gorączki; CRP i leukocyty prawidłowe", "Wysoka gorączka z dreszczami, potężna leukocytoza z neutrofilią, CRP >100 mg/l", "Brak gorączki; parametry zapalne prawidłowe", "Brak gorączki i cech stanu zapalnego (chyba że powikłanie różą)"],
      ["Stężenie D-dimerów", "Masywnie podwyższone (często >2000-5000 ng/ml)", "Prawidłowe lub nieznacznie podwyższone z powodu krwiaka", "Często podwyższone nieswoiście w wyniku ostrego stanu zapalnego", "Prawidłowe lub umiarkowanie podwyższone wskutek krwiaka pourazowego", "Prawidłowe"],
      ["Postępowanie z wyboru", "Pełna antykoagulacja (DOAC: apiksaban / rywaroksaban) + kompresjoterapia", "Leczenie zachowawcze (odpoczynek, okłady z lodu, NLPZ, nakłucie torbieli)", "Antybiotykoterapia celowana (Penicylina krystaliczna / Amoksycylina / Cefazolina)", "Protokół RICE (Rest, Ice, Compression, Elevation) + analgetyki", "Kompleksowa terapia udrażniająca (manualny drenaż limfatyczny + kompresja)"]
    ]
  },
  dutySummary: {
    overview: "Zakrzepica żył głębokich (DVT) jest trzecią pod względem częstości chorobą układu krążenia, stanowiącą główną postać żylnej choroby zakrzepowo-zatorowej (ŻChZZ). Najgroźniejszym bezpośrednim powikłaniem proksymalnej DVT jest zatorowość płucna (PE), występująca u nawet 50% nieleczonych chorych. Współczesnym standardem leczenia pierwszego rzutu są bezpośrednie doustne antykoagulanty (DOAC), które zapewniają wysoką skuteczność bez konieczności monitorowania krzepnięcia.",
    diagnostics: "1. Ocena prawdopodobieństwa klinicznego za pomocą skali Wellsa (zakwalifikowanie do grupy 'DVT prawdopodobna' przy >=2 pkt).<br>2. Przyłóżkowy test uciskowy USG (CUS – Compression Ultrasound) żył proksymalnych (brak zapadalności światła żyły pod uciskiem głowicy potwierdza rozpoznanie).<br>3. Oznaczenie stężenia D-dimerów: ma kluczową wartość wykluczającą (wysoka wartość predykcyjna wyniku ujemnego NPV >99% u chorych z niskim prawdopodobieństwem w skali Wellsa).<br>4. Ocena funkcji nerek (stężenie kreatyniny i eGFR) oraz prób wątrobowych przed wdrożeniem leków z grupy DOAC.",
    drugsAndDoses: "1. Doustne bezpośrednie antykoagulanty (DOAC) – leczenie pierwszego wyboru:<br>   - <span class='dose-pill'>Apiksaban 10 mg p.o. 2x/d przez 7 dni</span>, a od 8. doby <span class='dose-pill'>5 mg p.o. 2x/d</span> LUB<br>   - <span class='dose-pill'>Rywaroksaban 15 mg p.o. 2x/d przez 21 dni</span> z posiłkiem, a od 22. doby <span class='dose-pill'>20 mg p.o. raz/d</span>.<br>2. Heparyny drobnocząsteczkowe (LMWH) – preferowane w ciąży, przy skrajnej niewydolności nerek lub w chorobie nowotworowej:<br>   - <span class='dose-pill'>Enoksaparyna 1 mg/kg s.c. co 12 h</span> (lub 1,5 mg/kg s.c. raz/d).<br>3. Analgezja w ostrym bólu: <span class='dose-pill'>Paracetamol 1000 mg p.o. co 6-8 h</span> (unikać doustnych NLPZ w trakcie pełnej antykoagulacji z powodu ryzyka krwawień z przewodu pokarmowego!).<br>4. <span class='dose-pill'>Bezwzględne odstawienie hormonalnej terapii zastępczej (HTZ)</span> lub doustnej antykoncepcji.",
    procedures: "1. Wczesna mobilizacja pacjenta: zalecenie chodzenia i unikania długiego bezruchu natychmiast po rozpoczęciu skutecznej antykoagulacji.<br>2. Wdrożenie stopniowanej kompresjoterapii: podkolanówki lub pończochy uciskowe II klasy ucisku (23-32 mmHg) po ustąpieniu ostrego obrzęku ciastowatego.<br>3. Czas trwania leczenia: 3 miesiące w przypadku DVT sprowokowanej przemijającym czynnikiem ryzyka (lot samolotem >8 h); minimum 3-6 miesięcy lub przewlekle w zakrzepicy niesprowokowanej.<br>4. Tromboliza celowana przezcewnikowa (CDT) lub trombektomia mechaniczna: zarezerwowana wyłącznie dla masywnej zakrzepicy biodrowo-udowej z zagrożeniem zgorzelą żylną (Phlegmasia cerulea dolens).",
    monitoring: "1. Seryjny pomiar obwodu podudzia w celu oceny ustępowania obrzęku pod wpływem leczenia.<br>2. Obserwacja pod kątem objawów zatorowości płucnej (nagła duszność, ból w klatce piersiowej, tachykardia, SpO2 <95%).<br>3. Monitorowanie pod kątem powikłań krwotocznych (krwawienia z dziąseł, krwiomocz, smoliste stolce).<br>4. Okresowa ocena w skali Villalta po 6 i 12 miesiącach w celu wczesnego wykrycia i oceny nasilenia zespołu pozakrzepowego (PTS)."
  },
  lekQuestions: [
    {
      question: "Złotym standardem o najwyższej czułości i swoistości w nieinwazyjnej diagnostyce zakrzepicy żył głębokich (DVT) kończyn dolnych jest:",
      options: [
        "Ultrasonograficzny test uciskowy (CUS – Compression Ultrasound) układu żył głębokich",
        "Pletyzmografia impedancyjna klatki piersiowej",
        "Scyntygrafia perfuzyjna kończyn dolnych",
        "Tradycyjna wenografia wstępująca z kontrastem jodowym",
        "Przeglądowe zdjęcie RTG kości podudzia w projekcji AP"
      ],
      correct: 0,
      expl: "Ultrasonograficzny test uciskowy (CUS) jest badaniem z wyboru w diagnostyce DVT. Polega na ocenie zapadalności światła żyły pod naciskiem głowicy liniowej przyłożonej do skóry. Prawidłowa żyła ulega pełnemu zaciśnięciu; brak zapadalności jest patognomonicznym kryterium obecności skrzepliny w naczyniu żylnym."
    },
    {
      question: "Oznaczenie stężenia D-dimerów w surowicy u pacjenta z podejrzeniem zakrzepicy żył głębokich charakteryzuje się:",
      options: [
        "Bardzo wysoką czułością i wysoką ujemną wartością predykcyjną (NPV), co pozwala na bezpieczne wykluczenie DVT u chorych z niskim prawdopodobieństwem klinicznym",
        "Wysoką swoistością pozwalającą na jednoznaczne potwierdzenie zakrzepicy przy każdym podwyższonym wyniku",
        "Całkowitym brakiem przydatności w diagnostyce żylnej choroby zakrzepowo-zatorowej",
        "Przydatnością wyłącznie u kobiet ciężarnych w III trymestrze",
        "Zależnością wyniku wyłącznie od stężenia cholesterolu we krwi"
      ],
      correct: 0,
      expl: "Test na D-dimery ma bardzo wysoką czułość (>95-98%) i wysoką ujemną wartość prognostyczną (NPV). Prawidłowe (ujemne <500 ng/ml) stężenie D-dimerów u pacjenta z grupy małego lub pośredniego prawdopodobieństwa klinicznego wg skali Wellsa pozwala z niemal 100% pewnością wykluczyć ŻChZZ bez konieczności wykonywania badań obrazowych. Z powodu niskiej swoistości (wzrost w ciąży, zapaleniach, nowotworach, po urazach) wysoki wynik nie potwierdza zakrzepicy!"
    },
    {
      question: "Lekami pierwszego wyboru w nowoczesnym leczeniu niepowikłanej zakrzepicy żył głębokich u pacjentki bez choroby nowotworowej i z prawidłową funkcją nerek są:",
      options: [
        "Doustne bezpośrednie antykoagulanty (DOAC: apiksaban lub rywaroksaban)",
        "Kwas acetylosalicylowy w dawce 75 mg raz na dobę",
        "Tromboliza dożylna za pomocą streptokinazy",
        "Monoterapia warfaryną bez wstępnego podania heparyny",
        "Preparaty rutyny i witaminy C"
      ],
      correct: 0,
      expl: "Wytyczne europejskie (ESC) i amerykańskie (CHEST) rekomendują doustne bezpośrednie antykoagulanty (DOAC: apiksaban, rywaroksaban, dabigatran, edoksaban) jako leki pierwszego wyboru w leczeniu DVT. Apiksaban i rywaroksaban mogą być stosowane od 1. doby w monoterapii doustnej w odpowiednich dawkach nasycających bez konieczności mostkowania heparyną i bez monitorowania parametrów krzepnięcia."
    },
    {
      question: "Jaki jest zalecany czas trwania leczenia przeciwkrzepliwego u pacjentki, u której epizod proksymalnej DVT został sprowokowany dużym przemijającym czynnikiem ryzyka (wielogodzinny lot samolotem, unieruchomienie)?",
      options: [
        "Dokładnie 3 miesiące",
        "5 dni",
        "12 miesięcy",
        "Bezterminowo do końca życia",
        "Wyłącznie do momentu ustąpienia obrzęku nogi (zwykle 2 tygodnie)"
      ],
      correct: 0,
      expl: "U pacjentów z zakrzepicą żył głębokich sprowokowaną dużym, przemijającym czynnikiem ryzyka (np. lot samolotem >8 h, duża operacja, unieruchomienie w gipsie) zalecany czas trwania pełnego leczenia przeciwkrzepliwego wynosi 3 miesiące. Po wyeliminowaniu czynnika ryzyka odsetek nawrotów jest niski."
    },
    {
      question: "Wskaż, który objaw kliniczny NIE jest składową skali Wellsa dla zakrzepicy żył głębokich (DVT):",
      options: [
        "Krwioplucie (Haemoptysis)",
        "Obrzęk całego podudzia",
        "Obwód podudzia po stronie objawowej większy o >3 cm w porównaniu ze stroną zdrową",
        "Zlokalizowana bolesność uciskowa wzdłuż układu żył głębokich",
        "Aktywna choroba nowotworowa (leczona w ciągu ostatnich 6 miesięcy)"
      ],
      correct: 0,
      expl: "Krwioplucie (Haemoptysis) jest składową skali Wellsa dla zatorowości płucnej (PE), natomiast NIE występuje w skali Wellsa dla zakrzepicy żył głębokich (DVT). Składowymi skali DVT są m.in. obrzęk całej kończyny, asymetria obwodu podudzia >3 cm, miejscowa bolesność, obrzęk ciastowaty, żyły krążenia obocznego i nowotwór złośliwy."
    },
    {
      question: "Zastosowanie pończoch lub podkolanówek o stopniowanym ucisku (kompresjoterapii II klasy ucisku 23-32 mmHg) w ostrej DVT ma na celu przede wszystkim:",
      options: [
        "Szybsze ustąpienie bólu i obrzęku oraz zapobieganie rozwojowi zespołu pozakrzepowego (PTS)",
        "Rozpuszczenie skrzepliny w żyle za pomocą ucisku mechanicznego",
        "Zastąpienie konieczności stosowania leków przeciwkrzepliwych",
        "Zwiększenie stężenia płytek krwi w krążeniu obwodowym",
        "Wywołanie sztucznego niedokrwienia skóry celem pobudzenia ziarninowania"
      ],
      correct: 0,
      expl: "Stopniowana kompresjoterapia (pończochy lub podkolanówki II klasy ucisku) redukuje zastój żylny, wspomaga pompę mięśniową łydki, przyspiesza wchłanianie obrzęku oraz istotnie zmniejsza nasilenie i częstość występowania przewlekłego zespołu pozakrzepowego (PTS), będącego trwałym powikłaniem DVT."
    },
    {
      question: "Bolesny obrzęk siniczy (Phlegmasia cerulea dolens) jest najcięższą postacią zakrzepicy żylnej charakteryzującą się:",
      options: [
        "Masywną, całkowitą niedrożnością wszystkich pni żylnych kończyny (biodrowo-udowych), prowadzącą do krytycznego wzrostu ciśnienia tkanek, wtórnego zaciśnięcia tętnic i zgorzeli żylnej",
        "Łagodnym zapaleniem mieszków włosowych podudzia",
        "Wrodzonym brakiem żyły odpiszczelowej",
        "Izolowanym pęknięciem torbieli Bakera bez zakrzepicy",
        "Zakażeniem wirusem półpaśca wzdłuż dermatomu L4"
      ],
      correct: 0,
      expl: "Phlegmasia cerulea dolens (bolesny obrzęk siniczy) to stan bezpośredniego zagrożenia utratą kończyny i życia wywołany masywną, całkowitą okluzją wszystkich naczyń żylnych spływu kończyny dolnej. Zastój żylny jest tak potężny, że ciśnienie śródmiąższowe przewyższa ciśnienie perfuzji tętniczej, prowadząc do zawału żylnego, wtórnego niedokrwienia i zgorzeli żylnej (venous gangrene)."
    },
    {
      question: "Które z poniższych zaleceń dotyczących aktywności fizycznej pacjenta z nowo rozpoznaną DVT po włączeniu pełnego leczenia przeciwkrzepliwego jest zgodne ze współczesnymi wytycznymi?",
      options: [
        "Wczesne uruchomienie i regularne chodzenie w pończochach uciskowych (nie zaleca się unieruchomienia w łóżku)",
        "Ścisłe leżenie w łóżku plackiem przez minimum 21 dni",
        "Unieruchomienie kończyny w opatrunku gipsowym biodrowym",
        "Zakaz wstawania z łóżka nawet do toalety przez 2 tygodnie",
        "Wykonywanie wyłącznie intensywnych podskoków na jednej nodze"
      ],
      correct: 0,
      expl: "Współczesne wytyczne kategorycznie odrzucają dawny dogmat o konieczności leżenia w łóżku. Badania z randomizacją wykazały, że wczesna mobilizacja i chodzenie w połączeniu z kompresjoterapią po wdrożeniu skutecznej antykoagulacji nie zwiększają ryzyka zatorowości płucnej, a przyspieszają ustępowanie obrzęku i bólu."
    },
    {
      question: "U pacjenta z DVT, u którego stwierdza się bezwzględne przeciwwskazanie do antykoagulacji (np. czynny krwotok wewnątrzczaszkowy), procedurą z wyboru w celu ochrony przed śmiertelnym zatorem płucnym jest:",
      options: [
        "Czasowe wprowadzenie filtru do żyły głównej dolnej (IVC filter)",
        "Podanie podwójnej dawki kwasu acetylosalicylowego",
        "Natychmiastowe obustronne wycięcie nerek",
        "Podwiązanie żyły wrotnej na sali operacyjnej",
        "Zastosowanie lewatywy z węglem aktywnym"
      ],
      correct: 0,
      expl: "Filtr do żyły głównej dolnej (IVC filter) jest wskazany wyłącznie u pacjentów z udokumentowaną proksymalną DVT/PE, u których istnieje bezwzględne przeciwwskazanie do leczenia przeciwkrzepliwego (np. świeży krwotok wewnątrzczaszkowy, masywny krwotok z przewodu pokarmowego) lub u których doszło do nawrotu zatorowości mimo terapeutycznej antykoagulacji. Po ustąpieniu przeciwwskazań filtr należy usunąć."
    },
    {
      question: "Objaw Homansa, polegający na wystąpieniu bólu w łydce i dole podkolanowym przy gwałtownym zgięciu grzbietowym stopy:",
      options: [
        "Jest klasycznym objawem zakrzepicy żył głębokich, jednak charakteryzuje się niską swoistością (może występować także w zapaleniach mięśni czy urazach)",
        "Występuje wyłącznie u dzieci z mózgowym porażeniem dziecięcym",
        "Pozwala na 100% wykluczenie zakrzepicy w przypadku wyniku ujemnego",
        "Jest patognomonicznym objawem pęknięcia tętniaka aorty",
        "Wymaga natychmiastowego nakłucia stawu biodrowego"
      ],
      correct: 0,
      expl: "Objaw Homansa (ból łydki przy biernym zgięciu grzbietowym stopy przy wyprostowanym kolanie) jest historycznym i klasycznym objawem DVT. Charakteryzuje się jednak ograniczoną swoistością i czułością – może być dodatni w stanach zapalnych ścięgien, naderwaniu mięśni czy torbieli Bakera, dlatego jego obecność wymaga potwierdzenia badaniem ultrasonograficznym (CUS)."
    },
    {
      question: "Jakie jest postępowanie z doustną hormonalną terapią zastępczą (HTZ) u kobiety, u której wystąpił incydent zakrzepicy żył głębokich?",
      options: [
        "Bezwzględne i natychmiastowe odstawienie preparatu HTZ",
        "Zwiększenie dawki estrogenów o 100%",
        "Zamiana preparatu doustnego na plastry o podwójnej mocy bez antykoagulacji",
        "Kontynuacja leczenia bez zmian, gdyż estrogeny chronią przed miażdżycą",
        "Podawanie HTZ wyłącznie w iniekcjach dożylnych"
      ],
      feedback: "",
      correct: 0,
      expl: "Przebycie epizodu żylnej choroby zakrzepowo-zatorowej (DVT/PE) stanowi bezwzględne przeciwwskazanie do stosowania doustnej hormonalnej terapii zastępczej (HTZ) oraz złożonej antykoncepcji hormonalnej. Preparat należy natychmiast i trwale odstawić, a objawy wypadowe łagodzić metodami niefarmakologicznymi lub niehormonalnymi."
    }
  ],
  flashcards: [
    {
      front: "Jakie są 3 elementy Triady Virchowa predysponujące do DVT?",
      back: "1. Zastój żylny (Stasis – np. lot >8 h, unieruchomienie),\n2. Nadkrzepliwość krwi (Hypercoagulability – np. HTZ, trombofilia, nowotwór),\n3. Uszkodzenie ściany naczynia (Endothelial injury)."
    },
    {
      front: "Co jest złotym standardem obrazowania w diagnostyce DVT?",
      back: "Ultrasonograficzny test uciskowy (CUS – Compression Ultrasound). Brak pełnej zapadalności światła żyły pod naciskiem głowicy potwierdza obecność skrzepliny."
    },
    {
      front: "Jaka asymetria obwodów podudzi jest klinicznie istotna w skali Wellsa?",
      back: "Różnica obwodu >= 3 cm mierzona w tym samym punkcie (10 cm poniżej guzowatości piszczeli) na obu kończynach."
    },
    {
      front: "Jaki jest schemat dawkowania apiksabanu w ostrej DVT?",
      back: "10 mg p.o. 2 razy na dobę przez pierwsze 7 dni, a od 8. doby dawka podtrzymująca 5 mg p.o. 2 razy na dobę (monoterapia doustna od 1. dnia bez konieczności heparyny)."
    },
    {
      front: "Ile trwa leczenie przeciwkrzepliwe w DVT sprowokowanej przemijającym czynnikiem?",
      back: "Dokładnie 3 miesiące (np. po locie >8 h, operacji, urazie). W zakrzepicy niesprowokowanej: minimum 3-6 miesięcy lub bezterminowo."
    },
    {
      front: "Czy pacjent z DVT po włączeniu DOAC powinien leżeć w łóżku?",
      back: "Nie! Zaleca się wczesne uruchomienie i chodzenie w kompresjoterapii (pończochy II klasy ucisku 23-32 mmHg). Zmniejsza to obrzęk i zapobiega zespołowi pozakrzepowemu (PTS)."
    }
  ]
};

async function run() {
  console.log("Generating Case 144: Zakrzepica żył głębokich (DVT)...");
  
  // Mirroring
  case144.steps.forEach(s => {
    s.question = s.title;
    s.explanation = s.feedback ? s.feedback[0] : "";
  });
  
  case144.lekQuestions.forEach(q => {
    q.opts = q.options;
    q.correctIdx = q.correct;
    q.exp = q.expl;
  });
  
  const enc = await encryptStringAes(JSON.stringify(case144, null, 2), MASTER_KEY);
  fs.writeFileSync(path.join('cases', '144_zakrzepica_zyl_glebokich_dvt.json'), JSON.stringify(enc, null, 2), 'utf8');
  console.log("[SAVED] Case #144: 144_zakrzepica_zyl_glebokich_dvt.json (LEK Qs: " + case144.lekQuestions.length + ", Steps: " + case144.steps.length + ", Flashcards: " + case144.flashcards.length + ")");
}

run();

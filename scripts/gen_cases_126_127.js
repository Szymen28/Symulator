const fs = require('fs');
const { encryptStringAes } = require('./encrypt_case.js');
const PASSWORD = '@LEKSzymon28111999';

const cases = [
  // 126: Ostre zapalenie wyrostka robaczkowego u dorosłego
  {
    id: 126,
    filename: "126_wyrostek_dorosly.json",
    dept: "Chirurgia",
    shortTitle: "24-letni mężczyzna – Ból brzucha wędrujący do prawego dołu biodrowego, objaw Blumberga i Rovsinga (Ostre zapalenie wyrostka)",
    diagnosisTitle: "Ostre zgorzelinowe zapalenie wyrostka robaczkowego (Appendicitis acuta phlegmonosa/gangraenosa)",
    vitals: [
      { label: "HR", val: "104/min", sub: "Tachykardia zapalna", status: "warn" },
      { label: "BP", val: "122/76 mmHg", sub: "Prawidłowe", status: "ok" },
      { label: "SpO2", val: "99%", sub: "Prawidłowa", status: "ok" },
      { label: "RR", val: "18/min", sub: "Prawidłowa", status: "ok" },
      { label: "Temp", val: "38.3°C", sub: "Stan podgorączkowy/gorączka", status: "warn" }
    ],
    vitalsObj: { hr: 104, bp: "122/76", spo2: 99, rr: 18, temp: 38.3 },
    story: "24-letni dotychczas zdrowy student zgłosił się na SOR z powodu bólu brzucha trwającego od 18 godzin. Początkowo ból miał charakter rozlany, tępy, zlokalizowany w nadbrzuszu i wokół pępka, po czym po około 8 godzinach przemieścił się i ustalił w prawym dole biodrowym (klasyczny objaw Kochaera). Bólowi towarzyszą nudności, dwukrotne wymioty treścią żołądkową, brak apetytu (jadłowstręt) oraz stan podgorączkowy 38.3°C. W badaniu fizykalnym: chory leży z prawą kończyną dolną lekko zgiętą w stawie biodrowym. W prawym dole biodrowym wyraźna bolesność uciskowa (maksymalna w punkcie McBurneya i Lansza), miejscowa obrona mięśniowa (defense musculaire) oraz dodatni objaw Blumberga, Rovsinga, Jaworskiego (objaw mięśnia lędźwiowo-udowego) oraz objaw z mięśnia zasłonowego. Perystaltyka w prawym dole biodrowym leniwa. W badaniu per rectum bolesność po stronie prawej.",
    labs: [
      {
        category: "Morfologia i wskaźniki zapalne",
        items: [
          { name: "Leukocyty (WBC)", val: "15.8 G/L z przesunięciem w lewo", norm: "4.0–10.0 G/L", flag: "H" },
          { name: "Neutrofile", val: "82%", norm: "40–65%", flag: "H" },
          { name: "CRP", val: "48 mg/L", norm: "< 5.0 mg/L", flag: "H" },
          { name: "Skala Alvarado (MANTRELS)", val: "9 punktów (bardzo wysokie prawdopodobieństwo zapalenia wyrostka)", norm: "< 4 pkt", flag: "H" }
        ]
      },
      {
        category: "Diagnostyka obrazowa (USG jamy brzusznej)",
        items: [
          { name: "USG prawego dołu biodrowego", val: "Widoczna niepodatna na ucisk, ślepo zakończona cewkowata struktura o średnicy 9.5 mm (>6 mm) z pogrubiałą ścianą i obrzękiem okolicznej tkanki tłuszczowej; obecny kamień kałowy (fecalith) w ujściu", norm: "Wyrostek niewidoczny lub śr. < 6 mm podatny na ucisk", flag: "H" },
          { name: "Wolny płyn w jamie otrzewnej", val: "Niewielka ilość wolnego płynu w zachyłku Morisona i w miednicy mniejszej", norm: "Brak", flag: "H" }
        ]
      },
      {
        category: "Badanie moczu i biochemia",
        items: [
          { name: "Badanie ogólne moczu", val: "Ciężar 1.020, białko nieobecne, leukocyty 2–4 wpw, erytrocyty 1–2 wpw", norm: "Prawidłowe", flag: "N" },
          { name: "Kreatynina / Mocznik", val: "0.85 / 28 mg/dL", norm: "0.70–1.20 / 15–40", flag: "N" },
          { name: "Bilirubina / AST / ALT", val: "Prawidłowe", norm: "Prawidłowe", flag: "N" }
        ]
      }
    ],
    steps: [
      {
        num: 1,
        title: "Identyfikacja objawu Kochaera i topografii punktów wyrostkowych",
        task: "Przemieszczenie się bólu brzucha z nadbrzusza/okolicy okołopępkowej do prawego dołu biodrowego to objaw Kochaera. Gdzie dokładnie znajduje się punkt McBurneya?",
        options: [
          { text: "W 1/3 odległości od kolca biodrowego przedniego górnego prawego na linii łączącej go z pępkiem", correct: true, feedback: "Prawidłowo! Punkt McBurneya leży w 1/3 odległości między prawym przednim górnym kolcem biodrowym a pępkiem (od strony kolca). Punkt Lansza leży w 1/3 prawej linii łączącej oba kolce biodrowe przednie górne." },
          { text: "W połowie odległości między wyrostkiem mieczykowatym a pępkiem", correct: false, feedback: "Błąd – to rzut żołądka/trzustki." },
          { text: "W lewym dole biodrowym", correct: false, feedback: "To okolica esicy." },
          { text: "W punkcie przecięcia prawej linii środkowoobojczykowej z łukiem żebrowym", correct: false, feedback: "To punkt Murphy'ego (pęcherzyk żółciowy)." }
        ]
      },
      {
        num: 2,
        title: "Badanie przedmiotowe: objaw Rovsinga i Blumberga",
        task: "Na czym polega dodatni objaw Rovsinga w ostrym zapaleniu wyrostka robaczkowego?",
        options: [
          { text: "Ucisk w lewym dole biodrowym wywołuje ból w prawym dole biodrowym wskutek przemieszczenia gazów wstecznie przez okrężnicę i rozciągnięcia kątnicy", correct: true, feedback: "Dokładnie tak! Objaw Rovsinga polega na uciśnięciu lewego dołu biodrowego (esicy) i przesuwaniu dłoni ku górze – wzrost ciśnienia gazów rozciąga zmienioną zapalnie kątnicę i wyrostek, wywołując ból po stronie prawej." },
          { text: "Ból przy nagłym zwolnieniu ucisku powłok brzusznych", correct: false, feedback: "To objaw Blumberga (podrażnienie otrzewnej ściennej)." },
          { text: "Ból przy uniesieniu wyprostowanej prawej kończyny dolnej", correct: false, feedback: "To objaw Jaworskiego (mięśnia lędźwiowo-udowego)." },
          { text: "Bolesność przy wstrząsaniu okolicy lędźwiowej", correct: false, feedback: "To objaw Goldflama w chorobach nerek." }
        ]
      },
      {
        num: 3,
        title: "Badanie w pozycji zakątniczej wyrostka (objaw Jaworskiego)",
        task: "W przypadku zakątniczego (retrocekalnego) położenia wyrostka robaczkowego klasyczne objawy otrzewnowe mogą być słabo wyrażone. Jaki objaw jest wówczas najbardziej czuły?",
        options: [
          { text: "Objaw Jaworskiego (objaw mięśnia lędźwiowo-udowego / psoas sign)", correct: true, feedback: "Znakomicie! Wyrostek leżący zakątniczo przylega bezpośrednio do mięśnia biodrowo-lędźwiowego. Badający uciska prawy dół biodrowy, a chory unosi wyprostowaną prawą nogę (lub prostuje ją w stawie biodrowym w ułożeniu na lewym boku) – skurcz mięśnia drażni wyrostek, wywołując ostry ból." },
          { text: "Objaw Courvoisiera", correct: false, feedback: "Powiększony, niebolesny pęcherzyk żółciowy z żółtaczką w raku trzustki." },
          { text: "Objaw Chełmońskiego", correct: false, feedback: "Objaw wstrząsania wątroby w zapaleniu pęcherzyka żółciowego." },
          { text: "Objaw Chvostka", correct: false, feedback: "Skurcz mięśni mimicznych w tężyczce hipokalcemicznej." }
        ]
      },
      {
        num: 4,
        title: "Kryteria ultrasonograficzne ostrego zapalenia wyrostka",
        task: "Jakie cechy w USG jamy brzusznej potwierdzają rozpoznanie ostrego zapalenia wyrostka robaczkowego?",
        options: [
          { text: "Średnica zewnętrzna wyrostka > 6 mm, brak podatności na ucisk głowicą, pogrubienie ściany > 2 mm z obrzękiem i przekrwieniem okolicznej tkanki tłuszczowej", correct: true, feedback: "Doskonale! Prawidłowy wyrostek ma średnicę <=6 mm i łatwo zapada się pod uciskiem głowicy. Wyrostek zapalny jest niepodatny, ma średnicę >6 mm (często 8–12 mm), pogrubiałą ścianę o strukturze tarczy strzelniczej oraz wzmożony przepływ naczyniowy w Dopplerze." },
          { text: "Średnica wyrostka < 3 mm", correct: false, feedback: "To wyrostek prawidłowy/zanikowy." },
          { text: "Obecność pęcherzyków gazu w żyle wrotnej", correct: false, feedback: "To cecha martwicy jelit i sepsy, nie izolowanego wyrostka." },
          { text: "Obecność mnogich polipów w świetle żołądka", correct: false, feedback: "Brak związku." }
        ]
      },
      {
        num: 5,
        title: "Metoda leczenia operacyjnego z wyboru",
        task: "Jaka metoda operacyjna jest współcześnie złotym standardem leczenia ostrego zapalenia wyrostka robaczkowego wg wytycznych EAES i WSES?",
        options: [
          { text: "Appendektomia laparoskopowa (laparoscopic appendectomy)", correct: true, feedback: "Prawidłowo! Appendektomia laparoskopowa jest metodą z wyboru ze względu na mniejszy ból pooperacyjny, niższy odsetek zakażeń rany operacyjnej, krótszy czas hospitalizacji i szybszy powrót do aktywności w porównaniu z klasyczną laparotomią (dostępem McBurneya)." },
          { text: "Wyłącznie leczenie zachowawcze aspiryną przez 3 miesiące", correct: false, feedback: "Zagraża zgorzelą, perforacją i kałowym zapaleniem otrzewnej!" },
          { text: "Prawostronna hemikolektomia u każdego pacjenta", correct: false, feedback: "Nieuzasadniona, okaleczająca operacja rezerwowana dla rakowiaków >2 cm lub raka kątnicy." },
          { text: "Założenie przezskórnego drenażu bez usuwania wyrostka", correct: false, feedback: "Drenaż przezskórny stosuje się doraźnie w uformowanym ropniu okołowyrostkowym, a nie w niepowikłanym ostrym zapaleniu." }
        ]
      },
      {
        num: 6,
        title: "Profilaktyka antybiotykowa okołooperacyjna",
        task: "Jakie postępowanie antybiotykowe okołooperacyjne jest standardem w niepowikłanym zapaleniu wyrostka robaczkowego?",
        options: [
          { text: "Pojedyncza dawka dożylnego antybiotyku o szerokim spektrum (np. cefazolina + metronidazol lub ampicylina z sulbaktamem) podana 30–60 minut przed nacięciem skóry", correct: true, feedback: "Znakomicie! Zgodnie z wytycznymi chirurgicznymi, w niepowikłanym zapaleniu wyrostka wystarcza pojedyncza dawka profilaktyki okołooperacyjnej (obejmującej florę Gram-ujemną i beztlenową) podana przed znieczuleniem. Przedłużona antybiotykoterapia pooperacyjna jest zbędna, chyba że doszło do zgorzeli lub perforacji z zapaleniem otrzewnej." },
          { text: "Wankomycyna dożylnie przez 21 dni po operacji", correct: false, feedback: "Nieuzasadnione i szkodliwe szafowanie glikopeptydami." },
          { text: "Całkowite zaniechanie antybiotykoterapii nawet przed operacją", correct: false, feedback: "Profilaktyka przed cięciem istotnie redukuje odsetek ropienia rany." },
          { text: "Podanie doustnej neomycyny na stole operacyjnym", correct: false, feedback: "Pacjent operowany w znieczuleniu ogólnym nie może przyjmować leków p.o." }
        ]
      },
      {
        num: 7,
        title: "Postępowanie w przypadku nacieku okołowyrostkowego (plastycznego)",
        task: "Gdy pacjent zgłasza się po 5–7 dniach od początku objawów i w prawym dole biodrowym wyczuwalny jest bolesny opór bez objawów rozlanego zapalenia otrzewnej (tzw. naciek okołowyrostkowy / plastron), jakie jest postępowanie z wyboru?",
        options: [
          { text: "Leczenie zachowawcze (antybiotykoterapia i.v., dieta ścisła, monitorowanie) i ewentualna odroczona appendektomia po 6–12 tygodniach (interval appendectomy)", correct: true, feedback: "Bardzo dobrze! Próba operacji w fazie plastycznego nacieku okołowyrostkowego wiąże się z wysokim ryzykiem jatrogennego uszkodzenia kruchych pętli jelitowych i konieczności resekcji jelita. Standardem jest leczenie zachowawcze antybiotykami, a przy obecności płynnego ropnia – drenaż przezskórny pod kontrolą USG/TK." },
          { text: "Natychmiastowe rozległe wycięcie jelita cienkiego i grubego", correct: false, feedback: "Błąd jatrogenny." },
          { text: "Zignorowanie pacjenta i odesłanie do domu", correct: false, feedback: "Ryzyko sepsy i pęknięcia ropnia." },
          { text: "Podanie leków przeczyszczających", correct: false, feedback: "Bezwzględnie zakazane – grozi perforacją nacieku!" }
        ]
      },
      {
        num: 8,
        title: "Badanie histopatologiczne po appendektomii",
        task: "Dlaczego KAŻDY usunięty wyrostek robaczkowy musi zostać przesłany na badanie histopatologiczne?",
        options: [
          { text: "W celu wykluczenia nowotworu wyrostka robaczkowego (najczęściej guza neuroendokrynnego – rakowiaka NEN / NET lub gruczolakoraka śluzowego / LAMN)", correct: true, feedback: "Znakomicie! Nowotwory neuroendokrynne (rakowiaki) wyrostka robaczkowego są wykrywane przypadkowo w 0.5–1% usuniętych wyrostków. W zależności od wielkości guza (<1 cm vs >2 cm) i naciekania krezki, sama appendektomia może być wystarczająca lub konieczna może być wtórna prawostronna hemikolektomia." },
          { text: "Tylko w celu potwierdzenia obecności bakterii E. coli", correct: false, feedback: "Bakterie ocenia się w posiewie mikrobiologicznym, nie w histopatologii." },
          { text: "Jest to wymóg wyłącznie formalny bez znaczenia klinicznego", correct: false, feedback: "Błąd – pominięcie rakowiaka grozi rozsiewem nowotworu." },
          { text: "W celu wykazania obecności przeciwciał przeciwjądrowych", correct: false, feedback: "Brak związku." }
        ]
      }
    ],
    pathoNodes: [
      {
        title: "1. Niedrożność światła wyrostka robaczkowego",
        desc: "Zaczopowanie światła wyrostka przez kamień kałowy (fecalith), rozrost tkanki limfatycznej (np. po infekcji wirusowej), pasożyty lub guz neuroendokrynny (rakowiak).",
        drugTarget: "Złoty standard: appendektomia laparoskopowa usuwająca przyczynę obturacji"
      },
      {
        title: "2. Wzrost ciśnienia śródściennego i niedokrwienie",
        desc: "Ciągłe wydzielanie śluzu w zamkniętym świetle wywołuje gwałtowny wzrost ciśnienia, ucisk na naczynia żylne ściany, zakrzepicę, niedokrwienie błony śluzowej i inwazję bakterii (bakterie Gram-ujemne i beztlenowe).",
        drugTarget: "Okołooperacyjna profilaktyka antybiotykowa (cefalosporyna + metronidazol i.v.)"
      },
      {
        title: "3. Zgorzel ściany i perforacja do jamy otrzewnej",
        desc: "Niedokrwienie prowadzi do martwicy pełnej grubości ściany wyrostka (gangraena) i perforacji z wylaniem treści zakażonej, wywołując ograniczone zapalenie otrzewnej (ropień) lub rozlane zapalenie otrzewnej ze wstrząsem septycznym.",
        drugTarget: "Pilna operacja w trybie ostrym zapobiegająca sepsie i powikłaniom wewnątrzbrzusznym"
      }
    ],
    dutySummary: "Ostre zapalenie wyrostka robaczkowego u dorosłego manifestuje się objawem Kochaera (przemieszczenie bólu z nadbrzusza do prawego dołu biodrowego), objawami otrzewnowymi (Blumberg, Rovsing, Jaworski w położeniu zakątniczym). USG wykazuje cewkę >6 mm niepodatną na ucisk. Leczenie z wyboru: laparoskopowa appendektomia. W nacieku okołowyrostkowym (plastronie) stosuje się leczenie zachowawcze antybiotykami. Każdy wyrostek wymaga badania histopatologicznego w celu wykluczenia rakowiaka (NET).",
    diffTable: [
      { disease: "Zapalenie uchyłku Meckela", diff: "Objawy identyczne jak w zapaleniu wyrostka robaczkowego; w trakcie operacji przy prawidłowym wyrostku chirurg ma obowiązek skontrolować ostatnie 100 cm jelita krętego.", test: "Laparoskopia zwiadowcza, scyntygrafia z 99mTc-pertechnetatem." },
      { disease: "Pęknięta ciąża ektopowa / skręt przydatków u kobiet", diff: "Wywiad ginekologiczny (brak miesiączki, dodatnia beta-hCG w ciąży ektopowej), nagły ból z omdleniem, obecność krwi w zagłębieniu Douglasa w USG TV.", test: "Test ciążowy z moczu / beta-hCG z krwi CITO, USG transwaginalne." },
      { disease: "Kamica moczowodowa prawostronna", diff: "Ostry ból kolkowy promieniujący do pachwiny i narządów płciowych, chory niespokojny ruchowo (nie leży nieruchomo jak w zapaleniu otrzewnej), krwinkomocz w badaniu moczu.", test: "Badanie ogólne moczu (erytrocyturia), USG / angio-TK nerek bez kontrastu." },
      { disease: "Zapalenie węzłów chłonnych krezkowych (lymphadenitis mesenterica)", diff: "Częste u młodzieży po przebytej infekcji górnych dróg oddechowych lub zakażeniu Yersinia; powiększone mnogie węzły w USG, wyrostek prawidłowy.", test: "USG jamy brzusznej (ocena wyrostka vs węzłów krezkowych)." }
    ],
    lekQuestions: [
      {
        question: "U 25-letniego mężczyzny podejrzewa się ostre zapalenie wyrostka robaczkowego. Który z poniższych objawów klinicznych polega na wywołaniu bólu w prawym dole biodrowym podczas ucisku w lewym dole biodrowym?",
        options: [
          "Objaw Blumberga.",
          "Objaw Rovsinga.",
          "Objaw Jaworskiego.",
          "Objaw Chełmońskiego.",
          "Objaw Goldflama."
        ],
        correct: 1,
        explanation: "Objaw Rovsinga polega na wywołaniu bólu w prawym dole biodrowym przy ucisku lewego dołu biodrowego z jednoczesnym przesuwaniem dłoni ku górze w kierunku zgięcia śledzionowego. Wzrost ciśnienia gazów przemieszczających się wstecznie w okrężnicy powoduje rozciągnięcie zmienionej zapalnie kątnicy i ból w rzucie wyrostka robaczkowego."
      },
      {
        question: "Wskaż cechę ultrasonograficzną (USG) potwierdzającą ostre zapalenie wyrostka robaczkowego:",
        options: [
          "Średnica zewnętrzna wyrostka robaczkowego powyżej 6 mm z brakiem podatności na ucisk głowicą.",
          "Średnica wyrostka robaczkowego poniżej 3 mm z całkowitą podatnością na ucisk.",
          "Obecność pęcherzyków gazu w naczyniach nerkowych.",
          "Cienka ściana wyrostka robaczkowego poniżej 1 mm.",
          "Brak unaczynienia w badaniu dopplerowskim."
        ],
        correct: 0,
        explanation: "Prawidłowy wyrostek robaczkowy ma średnicę zewnętrzną do 6 mm i jest w pełni podatny na ucisk głowicą ultrasonograficzną. Do ultrasonograficznych kryteriów ostrego zapalenia należą: średnica zewnętrzna > 6 mm (często 8–12 mm), brak podatności na ucisk głowicą (sztywna cewka), pogrubienie ściany > 2 mm oraz obrzęk otaczającej tkanki tłuszczowej."
      },
      {
        question: "Pacjent zgłasza się w 6. dobie od początku dolegliwości bólowych brzucha. W prawym dole biodrowym wyczuwalny jest wyraźny, bolesny opór, a chory jest stabilny hemodynamicznie bez cech rozlanego zapalenia otrzewnej. W badaniu USG stwierdzono naciek okołowyrostkowy (plastron). Prawidłowym postępowaniem z wyboru jest:",
        options: [
          "Natychmiastowa laparotomia z rozległą hemikolektomią prawostronną.",
          "Leczenie zachowawcze (antybiotykoterapia dożylna, ścisły reżim łóżkowy, dieta) i ewentualna odroczona appendektomia po 6–12 tygodniach.",
          "Podanie leków przeczyszczających w celu ewakuacji mas kałowych.",
          "Zastosowanie samej aspiryny doustnie w warunkach ambulatoryjnych.",
          "Wykonanie natychmiastowej kolonoskopii z forsowną insuflacją powietrza."
        ],
        correct: 1,
        explanation: "W przypadku wytworzenia nacieku okołowyrostkowego (plastycznego nacieku zapalnego składającego się z sieci większej i sklejonych pętli jelitowych otaczających zapalny wyrostek) operacja w trybie ostrym wiąże się z wysokim ryzykiem jatrogennego uszkodzenia kruchych tkanek jelita. Standardem jest leczenie zachowawcze antybiotykami dożylnymi, a po wygaszeniu procesu zapalnego rozważa się odroczoną appendektomię (tzw. interval appendectomy) po 6–12 tygodniach."
      }
    ],
    flashcards: [
      { q: "Czym jest objaw Kochaera w zapaleniu wyrostka robaczkowego?", a: "Przemieszczenie się bólu brzucha z nadbrzusza lub okolicy pępka do prawego dołu biodrowego po kilku godzinach.", cat: "Chirurgia" },
      { q: "Czym jest objaw Rovsinga?", a: "Ból w prawym dole biodrowym wywołany uciskiem lewego dołu biodrowego (przesunięcie gazów przez okrężnicę).", cat: "Chirurgia" },
      { q: "Na czym polega objaw Jaworskiego (psoas sign)?", a: "Ból przy unoszeniu wyprostowanej prawej kończyny dolnej w ucisku prawego dołu biodrowego (objaw zakątniczego położenia wyrostka).", cat: "Chirurgia" },
      { q: "Jaka jest metoda operacyjna pierwszego wyboru w zapaleniu wyrostka robaczkowego?", a: "Appendektomia laparoskopowa.", cat: "Chirurgia" },
      { q: "Dlaczego każdy usunięty wyrostek robaczkowy bada się histopatologicznie?", a: "W celu wykluczenia nowotworu neuroendokrynnego (rakowiaka NEN/NET) lub gruczolakoraka.", cat: "Chirurgia" }
    ]
  },

  // 127: Ostre zapalenie pęcherzyka żółciowego (kamica)
  {
    id: 127,
    filename: "127_ostre_zapalenie_pecherzyka_zolciowego.json",
    dept: "Chirurgia",
    shortTitle: "48-letnia kobieta – Ostry ból pod prawym żebrem >6h, objaw Murphy'ego i Chełmońskiego (Ostre zapalenie pęcherzyka)",
    diagnosisTitle: "Ostre kamicze zapalenie pęcherzyka żółciowego (Cholecystitis acuta calculosa)",
    vitals: [
      { label: "HR", val: "98/min", sub: "Tachykardia bólowa", status: "warn" },
      { label: "BP", val: "135/84 mmHg", sub: "Prawidłowe", status: "ok" },
      { label: "SpO2", val: "98%", sub: "Prawidłowa", status: "ok" },
      { label: "RR", val: "20/min", sub: "Prawidłowa", status: "ok" },
      { label: "Temp", val: "38.5°C", sub: "Gorączka", status: "warn" }
    ],
    vitalsObj: { hr: 98, bp: "135/84", spo2: 98, rr: 20, temp: 38.5 },
    story: "48-letnia otyła kobieta (BMI 32 kg/m2, wieloródka – cechy z reguły 5F: female, fat, fertile, forty, fair) została przyjęta na oddział chirurgii ogólnej z powodu silnego, stałego bólu w prawym podżebrzu trwającego od ponad 8 godzin. Ból wystąpił po tłustym posiłku (smażone mięso), promieniuje do prawej łopatki i kręgosłupa piersiowego. Bólowi towarzyszą nudności, wielokrotne wymioty treścią żółciową oraz gorączka 38.5°C z dreszczami. W wywiadzie: nawracające krótkotrwałe epizody 'kolki żółciowej' ustępujące po drotawerynie, jednak obecny ból nie mija mimo leków rozkurczowych. W badaniu fizykalnym: obrona mięśniowa w prawym podżebrzu, silnie dodatni objaw Murphy'ego (zatrzymanie głębokiego wdechu podczas ucisku w punkcie pęcherzykowym z powodu nagłego, ostrego bólu) oraz dodatni objaw Chełmońskiego (bolesność przy wstrząsaniu prawego łuku żebrowego). Twardówki bez cech żółtaczki.",
    labs: [
      {
        category: "Morfologia i parametry zapalne",
        items: [
          { name: "Leukocyty (WBC)", val: "14.6 G/L z neutrofilią (78%)", norm: "4.0–10.0 G/L", flag: "H" },
          { name: "CRP", val: "78 mg/L", norm: "< 5.0 mg/L", flag: "H" },
          { name: "Bilirubina całkowita", val: "1.2 mg/dL (brak istotnej żółtaczki mechanicznej)", norm: "0.2–1.2 mg/dL", flag: "N" },
          { name: "Fosfataza zasadowa (ALP) / GGTP", val: "115 IU/L / 45 IU/L", norm: "30–120 / < 38", flag: "N" }
        ]
      },
      {
        category: "Ultrasonografia jamy brzusznej (kryteria tokijskie TG18)",
        items: [
          { name: "Obraz pęcherzyka żółciowego w USG", val: "Powiększony, napięty pęcherzyk o wymiarach 105 x 48 mm, ściana pogrubiała do 5.5 mm (>4 mm) z rozwarstwieniem ('objaw podwójnego konturu')", norm: "Ściana < 3 mm", flag: "H" },
          { name: "Zawartość pęcherzyka", val: "Mnogie złogi hiperechogenne z cieniem akustycznym, w tym złóg o średnicy 18 mm zaklinowany na stałe w szyjce pęcherza", norm: "Pęcherzyk bezechowy", flag: "H" },
          { name: "Ultrasonograficzny objaw Murphy'ego", val: "Dodatni (maksymalna bolesność przy ucisku głowicą USG bezpośrednio nad pęcherzykiem)", norm: "Ujemny", flag: "H" },
          { name: "Przewód żółciowy wspólny (PŻW / CBD)", val: "Średnica 5.0 mm (nieposzerzony, brak cech kamicy przewodowej)", norm: "< 6 mm", flag: "N" }
        ]
      },
      {
        category: "Enzymy trzustkowe i elektrolity",
        items: [
          { name: "Lipaza surowicy", val: "38 IU/L (wyklucza ostre zapalenie trzustki)", norm: "13–60 IU/L", flag: "N" },
          { name: "Amylaza w surowicy", val: "54 IU/L", norm: "28–100 IU/L", flag: "N" },
          { name: "AspAT / AlAT", val: "32 / 28 IU/L", norm: "< 35 / < 35 IU/L", flag: "N" }
        ]
      }
    ],
    steps: [
      {
        num: 1,
        title: "Różnicowanie kolki żółciowej z ostrym zapaleniem pęcherzyka",
        task: "Jaka jest kluczowa cecha kliniczna odróżniająca niepowikłaną kolkę żółciową od ostrego zapalenia pęcherzyka żółciowego?",
        options: [
          { text: "Czas trwania bólu: w kolce żółciowej ból trwa zwykle 1–5 godzin i ustępuje samoistnie, natomiast w ostrym zapaleniu ból utrzymuje się stale > 6 godzin i dołączają objawy zapalne (gorączka, leukocytoza, obrona mięśniowa)", correct: true, feedback: "Prawidłowo! Kolka żółciowa wynika z przejściowego zatkania przewodu pęcherzykowego i ustępuje w ciągu kilku godzin. Trwałe zaklinowanie złogu (>6 godzin) prowadzi do niedokrwienia ściany, odczynu zapalnego, gorączki, leukocytozy i rozwoju ostrego zapalenia (cholecystitis)." },
          { text: "Obecność kamieni w badaniu USG", correct: false, feedback: "Kamienie występują w obu jednostkach." },
          { text: "Lokalizacja bólu w podbrzuszu", correct: false, feedback: "Ból lokalizuje się w prawym podżebrzu." },
          { text: "Zawsze obecna głęboka żółtaczka mechaniczna", correct: false, feedback: "W izolowanym zapaleniu pęcherzyka PŻW jest drożny i żółtaczka nie występuje lub jest nieznaczna." }
        ]
      },
      {
        num: 2,
        title: "Badanie fizykalne: objaw Murphy'ego",
        task: "Na czym polega klasyczny objaw Murphy'ego badany palpacyjnie w prawym podżebrzu?",
        options: [
          { text: "Badający kładzie dłoń w prawym podżebrzu w punkcie pęcherzykowym i prosi chorego o głęboki wdech – w momencie kontaktu zmienionego pęcherzyka z dłonią pacjent gwałtownie przerywa wdech z powodu ostrego bólu", correct: true, feedback: "Znakomicie! Zatrzymanie wdechu (arrest of inspiration) wywołane ostrym bólem w momencie opadania przepony i pęcherzyka na dłoń badającego to patognomoniczny objaw Murphy'ego (czułość >95% w USG)." },
          { text: "Ból przy opukiwaniu lewej nerki", correct: false, feedback: "To objaw Goldflama." },
          { text: "Wybroczyny wokół pępka", correct: false, feedback: "To objaw Cullena w ostrym zapaleniu trzustki." },
          { text: "Brak wyczuwalnego tętna na tętnicy udowej", correct: false, feedback: "To cecha ostrego niedokrwienia kończyny lub koarktacji aorty." }
        ]
      },
      {
        num: 3,
        title: "Kryteria ultrasonograficzne ostrego zapalenia pęcherzyka (TG18)",
        task: "Jakie cechy ultrasonograficzne wchodzą w skład wytycznych tokijskich (Tokyo Guidelines TG18) potwierdzających ostre zapalenie pęcherzyka?",
        options: [
          { text: "Pogrubienie ściany pęcherzyka > 4 mm, powiększenie wymiarów (>8x4 cm), płyn okołopęcherzykowy, uwięziony złóg w szyjce oraz dodatni ultrasonograficzny objaw Murphy'ego", correct: true, feedback: "Doskonale! Kryteria USG wg TG18 to: pogrubienie ściany >4 mm z objawem 'podwójnego konturu' (obrzęk podsurowiczy), płyn okołopęcherzykowy, powiększenie pęcherzyka i bolesność pod głowicą USG (sonograficzny objaw Murphy'ego)." },
          { text: "Całkowity brak pęcherzyka żółciowego w loży", correct: false, feedback: "To stan po cholecystektomii lub agenezja." },
          { text: "Obecność pęcherzyka o cienkiej ścianie < 1 mm", correct: false, feedback: "To pęcherzyk prawidłowy." },
          { text: "Tylko obecność torbieli bąblowcowej w wątrobie", correct: false, feedback: "To echinokokoza, inna jednostka chorobowa." }
        ]
      },
      {
        num: 4,
        title: "Optymalny czas leczenia operacyjnego (wczesna cholecystektomia)",
        task: "Jaki jest optymalny czas wykonania cholecystektomii laparoskopowej u pacjenta z ostrym zapaleniem pęcherzyka żółciowego?",
        options: [
          { text: "Wczesna cholecystektomia laparoskopowa wykonana w ciągu pierwszych 24–72 godzin od przyjęcia / początku objawów", correct: true, feedback: "Bardzo ważny punkt wytycznych! Badania z randomizacją i wytyczne WSES/TG18 jednoznacznie wskazują, że wczesna cholecystektomia laparoskopowa (<72h od początku objawów) jest bezpieczniejsza, wiąże się z mniejszą liczbą powikłań, krótszą hospitalizacją i niższym odsetkiem konwersji do operacji otwartej w porównaniu z odraczaniem zabiegu o 6 tygodni." },
          { text: "Odroczona operacja po minimum 6 miesiącach leczenia domowego", correct: false, feedback: "Błąd – w okresie odroczenia u 20% chorych dochodzi do nawrotu z zapaleniem otrzewnej lub żółtaczką." },
          { text: "Wyłącznie po wykonaniu 100 zabiegów akupunktury", correct: false, feedback: "Absurd medyczny." },
          { text: "Dopiero gdy pęcherzyk ulegnie przedziurawieniu", correct: false, feedback: "Perforacja pęcherzyka to stan septyczny z wysoką śmiertelnością!" }
        ]
      },
      {
        num: 5,
        title: "Krytyczny element bezpieczeństwa podczas cholecystektomii (CVS)",
        task: "Jaka technika chirurgiczna wprowadzona przez Strasberga jest międzynarodowym standardem bezpieczeństwa zapobiegającym jatrogennemu uszkodzeniu dróg żółciowych podczas cholecystektomii laparoskopowej?",
        options: [
          { text: "Krytyczny widok bezpieczeństwa (Critical View of Safety - CVS: wypreparowanie trójkąta Calota, uwidocznienie dolnej 1/3 loży pęcherzyka i identyfikacja TYLKO dwóch struktur wchodzących do pęcherzyka)", correct: true, feedback: "Znakomicie! Critical View of Safety (CVS) wymaga: 1. Oczyszczenia trójkąta pęcherzykowo-wątrobowego (Calota) z tłuszczu i tkanki włóknistej, 2. Odpreparowania dolnej 1/3 pęcherzyka od loży wątroby, 3. Jednoznacznego uwidocznienia DWOCH i TYLKO DWÓCH struktur wchodzących do pęcherzyka: przewodu pęcherzykowego i tętnicy pęcherzykowej. Klipsowanie przed uzyskaniem CVS jest błędem chirurgicznym!" },
          { text: "Ślepe zakładanie klipsów na wszystkie napotkane struktury", correct: false, feedback: "Kardynalny błąd prowadzący do przecięcia PŻW lub prawej tętnicy wątrobowej!" },
          { text: "Zawsze wycinanie całego płata prawego wątroby", correct: false, feedback: "Absurdalnie niszczące postępowanie." },
          { text: "Zakładanie drenu Redona bez klipsowania przewodu", correct: false, feedback: "Doprowadzi do masywnego żółciowego zapalenia otrzewnej!" }
        ]
      },
      {
        num: 6,
        title: "Wskazania do przezskórnej cholecystostomii",
        task: "U 82-letniego pacjenta z ciężkim zgorzelinowym zapaleniem pęcherzyka żółciowego, po świeżym zawale serca, z ciężką niewydolnością oddechową i niestabilnością hemodynamiczną, jaka procedura ratunkowa jest metodą z wyboru?",
        options: [
          { text: "Przezskórna cholecystostomia pod kontrolą USG (odbarczenie pęcherzyka za pomocą drenu wprowadzonego przez miąższ wątroby w znieczuleniu miejscowym)", correct: true, feedback: "Doskonale! U chorych w stanie krytycznym ze skrajnym ryzykiem znieczulenia ogólnego (ASA IV/V) zabiegiem ratującym życie jest przezskórny drenaż pęcherzyka żółciowego pod kontrolą USG (cholecystostomia przezwątrobowa). Pozwala na ewakuację zakażonej żółci i ropy, opanowanie sepsy i stabilizację chorego." },
          { text: "Wieloetapowa rozległa laparotomia ze znieczuleniem ogólnym", correct: false, feedback: "Skrajne ryzyko zgonu na stole operacyjnym." },
          { text: "Zaniechanie jakichkolwiek procedur inwazyjnych", correct: false, feedback: "Chory umrze z powodu pęknięcia pęcherzyka i sepsy." },
          { text: "Podanie dożylne samej morfiny", correct: false, feedback: "Nie odbarcza ropy z pęcherzyka i nasila skurcz zwieracza Oddiego." }
        ]
      },
      {
        num: 7,
        title: "Zespół Mirizziego jako powikłanie kamicy pęcherzyka",
        task: "Czym jest zespół Mirizziego (Mirizzi syndrome)?",
        options: [
          { text: "Zewnętrznym uciskiem na przewód wątrobowy wspólny przez duży kamień zaklinowany w szyjce pęcherzyka lub przewodzie pęcherzykowym (często z wytworzeniem przetoki pęcherzykowo-przewodowej), powodującym żółtaczkę mechaniczną", correct: true, feedback: "Bardzo dobrze! Zespół Mirizziego to rzadkie powikłanie kamicy: duży kamień w szyjce pęcherzyka lub kieszonce Hartmanna wywołuje odczyn zapalny i uciska od zewnątrz przewód wątrobowy wspólny (typ I) lub wytwarza przetokę żółciowo-żółciową (typ II–IV), imitując raka dróg żółciowych." },
          { text: "Wrodzonym brakiem pęcherzyka żółciowego", correct: false, feedback: "To agenezja pęcherzyka." },
          { text: "Zakażeniem pęcherzyka przez tasiemca bąblowcowego", correct: false, feedback: "To bąblowica." },
          { text: "Przetoką pęcherzykowo-skórną", correct: false, feedback: "Brak związku z definicją zespołu Mirizziego." }
        ]
      },
      {
        num: 8,
        title: "Niedrożność żółciowa jelit (gallstone ileus)",
        task: "U starszej kobiety z długoletnią kamicą żółciową duży kamień przetrawił ścianę pęcherzyka i dwunastnicy (przetoka pęcherzykowo-dwunastnicza), przedostając się do przewodu pokarmowego. Gdzie najczęściej grzęźnie złóg, wywołując mechaniczną niedrożność jelita?",
        options: [
          { text: "W końcowym odcinku jelita krętego (okolica zastawki krętniczo-kątniczej Bauhina – najwęższe miejsce jelita cienkiego)", correct: true, feedback: "Znakomicie! Niedrożność żółciowa jelit (gallstone ileus) to mechaniczna niedrożność wywołana zaklinowaniem dużego złogu (>2.5 cm) w najwęższym odcinku jelita cienkiego – zastawce Bauhina (zastawce krętniczo-kątniczej). W RTG/TK obecna jest triada Riglera (aerobilia, poziomy płynów w jelicie cienkim, widoczny cień złogu w miednicy)." },
          { text: "W przełyku", correct: false, feedback: "Złóg przeszedł do jelita z dwunastnicy, nie cofa się do przełyku." },
          { text: "W odbytnicy", correct: false, feedback: "Odbytnica ma szerokie światło." },
          { text: "W wyrostku robaczkowym", correct: false, feedback: "Wyrostek nie powoduje niedrożności mechanicznej całego przewodu pokarmowego." }
        ]
      }
    ],
    pathoNodes: [
      {
        title: "1. Trwałe uwięźnięcie złogu w przewodzie pęcherzykowym",
        desc: "Kamień żółciowy zamyka odpływ żółci z pęcherzyka, powodując wzrost ciśnienia wewnątrzpęcherzowego, zastój żółci i chemiczne podrażnienie błony śluzowej przez lizolecytynę i kwasy żółciowe.",
        drugTarget: "Wczesna cholecystektomia laparoskopowa (<72h) trwale likwidująca przeszkodę"
      },
      {
        title: "2. Niedokrwienie ściany i wtórna kolonizacja bakteryjna",
        desc: "Obrzęk śródtkankowy upośledza przepływ żylny i tętniczy w ścianie pęcherzyka. W niedokrwionym narządzie dochodzi do wtórnego namnażania bakterii jelitowych (E. coli, Klebsiella, Enterococcus, beztlenowce).",
        drugTarget: "Antybiotykoterapia dożylna o szerokim spektrum (np. ceftriakson + metronidazol lub cyprofloksacyna)"
      },
      {
        title: "3. Martwica, zgorzel (gangrena) i ropniak pęcherzyka",
        desc: "Zaczopowanie tętnicy pęcherzykowej prowadzi do zgorzeli ściany (cholecystitis gangraenosa) i gromadzenia ropy pod ciśnieniem (empyema vesicae felleae), grożąc pęknięciem do jamy otrzewnej.",
        drugTarget: "Pilny zabieg operacyjny lub przezskórna cholecystostomia u chorych w stanie krytycznym"
      }
    ],
    dutySummary: "Ostre zapalenie pęcherzyka żółciowego to ból w prawym podżebrzu >6h, gorączka, leukocytoza oraz dodatni objaw Murphy'ego i Chełmońskiego. W USG: pogrubienie ściany >4 mm, podwójny kontur, uwięziony złóg. Metoda z wyboru: wczesna cholecystektomia laparoskopowa (<72h od początku objawów) z preparowaniem krytycznego widoku bezpieczeństwa (CVS). U chorych skrajnego ryzyka: przezskórna cholecystostomia pod USG.",
    diffTable: [
      { disease: "Ostre zapalenie dróg żółciowych (cholangitis)", diff: "Obecna klasyczna triada Charcota (wysoka gorączka z dreszczami, ból pod prawym żebrem i GŁĘBOKA ŻÓŁTACZKA mechaniczna); PŻW poszerzony w USG.", test: "Bilirubina całkowita, USG (poszerzenie PŻW >8 mm), ECPW." },
      { disease: "Ostre zapalenie trzustki (OZT)", diff: "Ból opasujący w nadbrzuszu promieniujący do pleców, kilkukrotny wzrost lipazy i amylazy w surowicy (>3x GGN).", test: "Lipaza i amylaza w surowicy krwi, TK jamy brzusznej." },
      { disease: "Perforacja wrzodu dwunastnicy", diff: "Nagły 'cios sztyletem', brzuch deskowaty, wolne powietrze pod kopułą przepony w RTG na stojąco.", test: "RTG przeglądowe jamy brzusznej na stojąco (sierp powietrza)." },
      { disease: "Zawał ściany dolnej serca (STEMI)", diff: "Ból w nadbrzuszu z cechami wegetatywnymi u pacjenta kardiologicznego, ale pęcherzyk w USG jest prawidłowy; zmiany w odprowadzeniach II, III, aVF w EKG.", test: "EKG 12-odprowadzeniowe, troponina sercowa CITO." }
    ],
    lekQuestions: [
      {
        question: "46-letnia kobieta zgłasza się z powodu silnego bólu w prawym podżebrzu trwającego od 10 godzin, gorączki 38.6°C i nudności. W badaniu fizykalnym stwierdzono zatrzymanie wdechu podczas ucisku pod prawym łukiem żebrowym (dodatni objaw Murphy'ego). W badaniu USG: pogrubienie ściany pęcherzyka do 5 mm z obecnością uwięzionego złogu w szyjce. Postępowaniem z wyboru jest:",
        options: [
          "Wczesna cholecystektomia laparoskopowa wykonana w ciągu pierwszych 24–72 godzin od przyjęcia.",
          "Wyłącznie antybiotykoterapia doustna i planowa operacja za 12 miesięcy.",
          "Zabieg ECPW z założeniem stentu do przewodu trzustkowego.",
          "Przetoczenie 2 jednostek świeżo mrożonego osocza bez operacji.",
          "Pilna resekcja prawego płata wątroby."
        ],
        correct: 0,
        explanation: "Zgodnie z aktualnymi międzynarodowymi wytycznymi (World Society of Emergency Surgery - WSES oraz Tokyo Guidelines TG18), metodą z wyboru w ostrym kamiczym zapaleniu pęcherzyka żółciowego jest wczesna cholecystektomia laparoskopowa przeprowadzona optymalnie w ciągu pierwszych 24–72 godzin od początku objawów/przyjęcia do szpitala. Postępowanie to zmniejsza ryzyko nawrotu powikłań, skraca czas hospitalizacji i wiąże się z niższym odsetkiem powikłań niż odraczanie zabiegu."
      },
      {
        question: "Czym jest tzw. krytyczny widok bezpieczeństwa (Critical View of Safety - CVS) stosowany podczas cholecystektomii laparoskopowej?",
        options: [
          "Zasada preparowania chirurgicznego wymagająca oczyszczenia trójkąta Calota z tkanki tłuszczowej, odpreparowania dolnej części pęcherzyka od łożyska wątroby oraz uwidocznienia wyłącznie dwóch struktur wchodzących do pęcherzyka przed ich zaklipsowaniem.",
          "Konieczność założenia drenu Redona do każdego otworu trokarowego.",
          "Zasada natychmiastowej konwersji do laparotomii u każdego pacjenta z gorączką.",
          "Technika ślepego podkłuwania szwem mechanicznym naczyń wątrobowych.",
          "Podgląd radiologiczny pęcherzyka za pomocą ramienia C przed nacięciem powłok."
        ],
        correct: 0,
        explanation: "Krytyczny widok bezpieczeństwa (Critical View of Safety wg Strasberga) jest fundamentalną techniką zapobiegającą jatrogennemu uszkodzeniu dróg żółciowych (przecięciu PŻW) podczas cholecystektomii laparoskopowej. Wymaga: 1. Oczyszczenia trójkąta Calota z tkanki tłuszczowej, 2. Odpreparowania dolnej 1/3 pęcherzyka od wątroby, 3. Jednoznacznej identyfikacji dokładnie dwóch struktur (przewodu pęcherzykowego i tętnicy pęcherzykowej) wnikających do pęcherzyka."
      },
      {
        question: "U 84-letniego pacjenta z ciężkim ostrym zapaleniem pęcherzyka żółciowego, niestabilnego hemodynamicznie z powodu wstrząsu kardiogennego w przebiegu świeżego zawału serca, zabiegiem ratującym życie z wyboru jest:",
        options: [
          "Przezskórna cholecystostomia pod kontrolą USG w znieczuleniu miejscowym.",
          "Klasyczna cholecystektomia z szerokiej laparotomii podłużnej w znieczuleniu ogólnym.",
          "Zabieg Whipple'a w trybie ostrym.",
          "Wlew dożylny samej papaweryny bez drenażu.",
          "Podanie leków fibrynolitycznych do pęcherzyka żółciowego."
        ],
        correct: 0,
        explanation: "U pacjentów w stanie krytycznym ze skrajnym ryzykiem operacyjnym i anestezjologicznym (ASA IV/V, wstrząs, niestabilna choroba wieńcowa) zabiegiem z wyboru jest przezskórny drenaż pęcherzyka żółciowego pod kontrolą USG (przezskórna cholecystostomia). Pozwala ona na odbarczenie zakażonej treści pod ciśnieniem w znieczuleniu miejscowym, opanowanie sepsy i stabilizację chorego."
      }
    ],
    flashcards: [
      { q: "Czym różni się ostre zapalenie pęcherzyka żółciowego od kolki żółciowej?", a: "Czasem trwania bólu (kolka ustępuje w <6h, w zapaleniu ból trwa stale >6h) oraz obecnością gorączki i leukocytozy.", cat: "Chirurgia" },
      { q: "Na czym polega objaw Murphy'ego?", a: "Zatrzymanie głębokiego wdechu z powodu nagłego bólu podczas ucisku w punkcie pęcherzykowym w prawym podżebrzu.", cat: "Chirurgia" },
      { q: "Jaki jest optymalny czas wykonania cholecystektomii laparoskopowej w ostrym zapaleniu?", a: "Wczesna cholecystektomia w ciągu 24–72 godzin od początku objawów / przyjęcia.", cat: "Chirurgia" },
      { q: "Czym jest krytyczny widok bezpieczeństwa (CVS)?", a: "Standard preparowania: oczyszczenie trójkąta Calota, uwidocznienie loży i identyfikacja tylko 2 struktur (przewodu i tętnicy pęcherzykowej) przed klipsowaniem.", cat: "Chirurgia" },
      { q: "Jaki zabieg ratunkowy wykonuje się u pacjentów niestabilnych, zdyskwalifikowanych z operacji?", a: "Przezskórną cholecystostomię pod kontrolą USG (drenaż pęcherzyka w znieczuleniu miejscowym).", cat: "Chirurgia" }
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
  console.log('Batch 126-127 finished successfully.');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});

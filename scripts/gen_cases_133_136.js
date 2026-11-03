const fs = require('fs');
const { encryptStringAes } = require('./encrypt_case.js');
const PASSWORD = '@LEKSzymon28111999';

const cases = [
  // 133: Ostre niedokrwienie krezki (zator SMA)
  {
    id: 133,
    filename: "133_ostre_niedokrwienie_krezki_sma.json",
    dept: "Chirurgia",
    shortTitle: "72-letni mężczyzna z migotaniem przedsionków – Skrajny ból brzucha nieproporcjonalny do badania fizykalnego i kwasica mleczanowa (Zator SMA)",
    diagnosisTitle: "Ostre niedokrwienie krezki (Acute Mesenteric Ischemia - AMI) wywołane zatorem tętnicy krezkowej górnej (SMA)",
    vitals: [
      { label: "HR", val: "128/min", sub: "Tachykardia / migotanie przedsionków z RVR", status: "bad" },
      { label: "BP", val: "105/62 mmHg", sub: "Tendencja do hipotonii", status: "warn" },
      { label: "SpO2", val: "96%", sub: "Prawidłowa", status: "ok" },
      { label: "RR", val: "26/min", sub: "Oddech kwasiczy", status: "warn" },
      { label: "Temp", val: "37.5°C", sub: "Stan podgorączkowy", status: "ok" }
    ],
    vitalsObj: { hr: 128, bp: "105/62", spo2: 96, rr: 26, temp: 37.5 },
    story: "72-letni mężczyzna z utrwalonym migotaniem przedsionków (nieprzyjmujący regularnie antykoagulantów), po przebytym zawale serca, został przywieziony na SOR z powodu nagłego, obezwładniającego bólu brzucha trwającego od 4 godzin. Pacjent krzyczy z bólu, zwija się na kozetce, podaje że 'nigdy w życiu nic go tak nie bolało'. Ból jest rozlany w całym śródbrzuszu. Towarzyszyły mu nudności, wymioty oraz jedno obfite wypróżnienie (początkowo luźny stolec, później podbiegnięty krwią). W badaniu fizykalnym: uderzający dysonans kliniczny – skrajnie silny, dramatyczny ból zgłaszany przez pacjenta przy początkowo ZUPEŁNIE MIĘKKIM, niebolesnym palpacyjnie brzuchu, bez obrony mięśniowej i bez objawów otrzewnowych (tzw. 'ból nieproporcjonalny do badania palpacyjnego'). Osłuchowo perystaltyka początkowo bardzo żywa, 'burzliwa', po czym w kolejnych godzinach cichnąca. W EKG migotanie przedsionków z częstością komór 130/min.",
    labs: [
      {
        category: "Mleczany, gazometria i wskaźniki martwicy",
        items: [
          { name: "Mleczany w surowicy (Laktaty CITO)", val: "5.2 mmol/L (ciężka hiperlaktatemia)", norm: "0.5–2.0 mmol/L", flag: "H" },
          { name: "pH krwi tętniczej", val: "7.26 (kwasica metaboliczna)", norm: "7.35–7.45", flag: "L" },
          { name: "Wodorowęglany (HCO3-)", val: "14.5 mmol/L", norm: "22–26 mmol/L", flag: "L" },
          { name: "Niedobór zasad (BE)", val: "-10.2 mmol/L", norm: "-2 do +2", flag: "L" },
          { name: "D-dimer", val: "8400 ug/L (bardzo wysoki)", norm: "< 500 ug/L", flag: "H" }
        ]
      },
      {
        category: "Morfologia i biochemia",
        items: [
          { name: "Leukocyty (WBC)", val: "22.4 G/L z przesunięciem w lewo (88% neutrofili)", norm: "4.0–10.0 G/L", flag: "H" },
          { name: "Hemoglobina / Hematokryt", val: "15.8 g/dL / 48% (zagęszczenie krwi)", norm: "13.0–17.5 / 40–50%", flag: "H" },
          { name: "Kreatynina surowicy", val: "1.45 mg/dL", norm: "0.70–1.20 mg/dL", flag: "H" },
          { name: "Amylaza surowicy", val: "180 IU/L (umiarkowany wzrost odczynowy)", norm: "28–100 IU/L", flag: "H" }
        ]
      },
      {
        category: "Angiografia tomografii komputerowej (Angio-TK trzewne CITO)",
        items: [
          { name: "Angio-TK pnia trzewnego i krezki (faza tętnicza)", val: "Ostry zator (ubytek zakontraktowania) w pniu tętnicy krezkowej górnej (SMA) 4 cm od jej odejścia od aorty, poniżej odejścia tętnicy okrężniczej środkowej", norm: "Naczynia drożne", flag: "H" },
          { name: "Ściana pętli jelita cienkiego w TK", val: "Brak wzmocnienia kontrastowego ściany jelita krętego i czczego, ścieńczenie ściany ('paper-thin wall'), brak wolnego powietrza pod przeponą", norm: "Prawidłowe wzmocnienie", flag: "H" }
        ]
      }
    ],
    steps: [
      {
        num: 1,
        title: "Kluczowa cecha kliniczna ostrego niedokrwienia krezki",
        task: "Jaki jest najbardziej charakterystyczny objaw kliniczny we wczesnej fazie ostrego niedokrwienia krezki wywołanego zatorem tętnicy krezkowej górnej (SMA)?",
        options: [
          { text: "Dramatyczny, skrajnie silny ból brzucha NIEPROPORCJONALNY do ubogich odchyleń w badaniu palpacyjnym (początkowo brzuch jest miękki i niebolesny uciskowo)", correct: true, feedback: "Prawidłowo! To klasyczna triada i 'pułapka' ostrego zatoru SMA: pacjent krzyczy z potwornego bólu niedokrwiennego, podczas gdy w badaniu palpacyjnym brzuch jest miękki, bez obrony mięśniowej i bez objawów otrzewnowych (objawy otrzewnowe pojawiają się dopiero po zgorzeli pełnej grubości ściany jelita – wtedy jest już za późno!)." },
          { text: "Brak jakiegokolwiek bólu", correct: false, feedback: "Ból jest jednym z najsilniejszych w medycynie." },
          { text: "Wczesny brzuch deskowaty od 1. minuty", correct: false, feedback: "Brzuch deskowaty cechuje perforację wrzodu, nie wczesny zator SMA." },
          { text: "Ból zlokalizowany wyłącznie w prawym dole biodrowym", correct: false, feedback: "Ból w niedokrwieniu krezki jest rozlany w całym śródbrzuszu." }
        ]
      },
      {
        num: 2,
        title: "Najczęstsza przyczyna i mechanizm zatoru SMA",
        task: "Co jest najczęstszym źródłem materiału zatorowego w ostrym zatorze tętnicy krezkowej górnej?",
        options: [
          { text: "Skrzeplina z lewego przedsionka serca (najczęściej w przebiegu migotania przedsionków - AF) lub skrzeplina przyścienna lewej komory po zawale serca", correct: true, feedback: "Dokładnie tak! Zator tętniczy (embolia) odpowiada za ~50% przypadków ostrego niedokrwienia krezki. W ponad 80% materiał zatorowy pochodzi z serca u chorych z migotaniem przedsionków (AF). Z powodu ostrego kąta odejścia SMA od aorty i dużego przepływu, zator z aorty kieruje się bezpośrednio do pnia SMA." },
          { text: "Bakterie ze skóry krocza", correct: false, feedback: "Nie tworzą zatorów mechanicznych SMA." },
          { text: "Pasożyty z przewodu pokarmowego", correct: false, feedback: "Brak związku." },
          { text: "Skrzeplina z żył głębokich podudzia", correct: false, feedback: "Skrzeplina z żył kończyn dolnych wędruje do krążenia płucnego (zatorowość płucna), nie do tętnic krezkowych (chyba że przez przetrwały otwór owalny PFO – zator paradoksalny)." }
        ]
      },
      {
        num: 3,
        title: "Badanie obrazowe z wyboru (złoty standard)",
        task: "Które badanie obrazowe jest ZŁOTYM STANDARDEM w natychmiastowym potwierdzeniu ostrego niedokrwienia krezki?",
        options: [
          { text: "Angiografia tomografii komputerowej jamy brzusznej (Angio-TK / wielofazowa TK z kontrastem w fazie tętniczej i żylnej)", correct: true, feedback: "Znakomicie! Wytyczne WSES i ESVS jednoznacznie wskazują Angio-TK jako badanie z wyboru o czułości i swoistości >95%. Pozwala na bezpośrednie uwidocznienie ubytku zakontraktowania w SMA, ocenę perfuzji ściany jelit, pneumatozy ściany i gazu w żyle wrotnej." },
          { text: "Klasyczne RTG przeglądowe jamy brzusznej", correct: false, feedback: "We wczesnej fazie RTG jest całkowicie prawidłowe i nie wyklucza zatoru SMA!" },
          { text: "Kolonoskopia do zagięcia śledzionowego", correct: false, feedback: "Przeciwwskazana – insuflacja powietrza może doprowadzić do perforacji niedokrwionego jelita." },
          { text: "Scyntygrafia z leukocytami znakowanymi indem", correct: false, feedback: "Trwa wiele godzin i nie ma zastosowania w stanach nagłych." }
        ]
      },
      {
        num: 4,
        title: "Znaczenie laboratoryjne kwasicy mleczanowej",
        task: "Dlaczego wysokie stężenie mleczanów we krwi (hiperlaktatemia) i kwasica metaboliczna są kluczowym wskaźnikiem w podejrzeniu zatoru SMA?",
        options: [
          { text: "Mleczany są czułym markerem beztlenowego metabolizmu niedokrwionych tkanek jelita; ich wzrost wskazuje na zaawansowane niedotlenienie i martwicę komórek błony śluzowej", correct: true, feedback: "Doskonale! Choć mleczany mogą być prawidłowe w pierwszych 1–2 godzinach, ich narastanie świadczy o przejściu komórek jelita na glikolizę beztlenową. W połączeniu z silnym bólem brzucha hiperlaktatemia ma ogromną wartość alarmową wzywającą do natychmiastowej interwencji naczyniowej/chirurgicznej!" },
          { text: "Świadczą o wypiciu dużej ilości mleka", correct: false, feedback: "Absurdalne stwierdzenie." },
          { text: "Mleczany rosną wyłącznie w cukrzycy", correct: false, feedback: "Błąd – mleczany są uniwersalnym markerem hipoperfuzji tkankowej." },
          { text: "Wysokie mleczany wykluczają niedokrwienie jelit", correct: false, feedback: "Kardynalny błąd – potwierdzają niedokrwienie!" }
        ]
      },
      {
        num: 5,
        title: "Zasada 'okna czasowego' (time is bowel)",
        task: "Ile wynosi 'złote okno czasowe' od początku objawów, w którym rewaskularyzacja tętnicy krezkowej pozwala na uratowanie jelita przed nieodwracalną martwicą?",
        options: [
          { text: "Około 6–8 godzin (podobnie jak w zawale mięśnia sercowego czy udarze mózgu)", correct: true, feedback: "Znakomicie! 'Czas to jelito' (time is bowel) – nieodwracalna martwica błony śluzowej i mięśniówki jelita cienkiego rozwija się w ciągu 6–8 godzin od zamknięcia pnia SMA. Rozpoznanie i rewaskularyzacja w tym oknie czasowym decydują o przeżyciu pacjenta." },
          { text: "Minimum 14 dni", correct: false, feedback: "Po 14 dniach chory dawno nie żyje." },
          { text: "Dokładnie 72 godziny bez żadnego uszczerbku", correct: false, feedback: "Błąd – po 12–24h całe jelito cienkie ulega zgorzeli." },
          { text: "Jelito cienkie nigdy nie ulega martwicy", correct: false, feedback: "Bzdura medyczna." }
        ]
      },
      {
        num: 6,
        title: "Pilna interwencja: rewaskularyzacja i ocena jelita",
        task: "Jakie jest postępowanie zabiegowe z wyboru u pacjenta ze świeżym zatorem SMA potwierdzonym w Angio-TK bez objawów rozlanego zapalenia otrzewnej?",
        options: [
          { text: "Natychmiastowa heparynizacja i.v., pilna rewaskularyzacja wewnątrznaczyniowa (trombektomia mechaniczna / tromboliza celowana) lub chirurgiczna embolektomia SMA cewnikiem Fogarty'ego połączona z laparotomią i oceną żywotności jelit", correct: true, feedback: "Bardzo dobrze! Natychmiast podaje się niefrakcjonowaną heparynę i.v. w celu zahamowania propagacji skrzepliny. Następnie wykonuje się pilną rewaskularyzację: chirurgiczną embolektomię SMA (z dostępu przez laparotomię) lub trombektomię mechaniczną drogą endowaskularną. Resekuje się wyłącznie odcinki ewidentnie martwicze." },
          { text: "Wyłącznie leczenie zachowawcze paracetamolem", correct: false, feedback: "Chory umrze w ciągu kilkunastu godzin." },
          { text: "Zastosowanie samej kolonoskopii", correct: false, feedback: "Zator dotyczy tętnicy krezkowej górnej zaopatrującej jelito cienkie i prawą połowę okrężnicy – kolonoskopia nie ma zastosowania terapeutycznego." },
          { text: "Podanie dożylne wapnia bez heparyny", correct: false, feedback: "Brak efektu terapeutycznego." }
        ]
      },
      {
        num: 7,
        title: "Koncepcja planowej ponownej laparotomii (Second-Look Surgery)",
        task: "Dlaczego po zabiegu embolektomii SMA i resekcji granicznych odcinków jelita standardem postępowania jest planowa ponowna operacja (second-look laparotomy) po 24–48 godzinach?",
        options: [
          { text: "Aby ocenić stan ukrwienia i żywotność pozostawionych pętli jelita po przywróceniu przepływu naczyniowego i usunąć ewentualne wtórne ogniska martwicy (zapobiega niepotrzebnemu wycięciu jelita, które może się zregenerować)", correct: true, feedback: "Świetnie! Granica między jelitem odwracalnie niedokrwionym a martwym tuż po rewaskularyzacji jest bardzo trudna do oceny. Aby uniknąć wycięcia zbyt dużego fragmentu jelita (ryzyko zespołu krótkiego jelita), chirurg pozostawia pętle wątpliwe, nie wykonuje ostatecznych zespoleń i wykonuje planową re-laparotomię ('second-look') po 24–48 godzinach w celu ostatecznej weryfikacji." },
          { text: "Jest to wymagane przez firmę ubezpieczeniową", correct: false, feedback: "To decyzja czysto medyczna i ratująca życie." },
          { text: "Tylko w celu wymiany rękawiczek chirurgicznych", correct: false, feedback: "Nonsens." },
          { text: "Aby wypłukać jelito wodą destylowaną", correct: false, feedback: "Nie stosuje się takich procedur." }
        ]
      },
      {
        num: 8,
        title: "Inne postacie ostrego niedokrwienia krezki",
        task: "Oprócz zatoru tętniczego, jakie są 3 pozostałe mechanizmy ostrego niedokrwienia krezki?",
        options: [
          { text: "1. Zakrzepica tętnicy krezkowej (na podłożu blaszki miażdżycowej), 2. Niezatorowe niedokrwienie krezki (NOMI – skurcz naczyniowy w ciężkim wstrząsie/po aminach katecholowych), 3. Zakrzepica żyły krezkowej górnej (MVT – w trombofilii)", correct: true, feedback: "Znakomicie! Klasyfikacja AMI: 1. Zator SMA (~50%), 2. Zakrzepica SMA na blaszce miażdżycowej (~25%), 3. NOMI (Non-Occlusive Mesenteric Ischemia ~20% – skurcz naczyń w niewydolności krążenia i po lekach wazokonstrukcyjnych), 4. Zakrzepica żylna MVT (~5% – powolny przebieg u chorych z nadkrzepliwością/marskością)." },
          { text: "Wyłącznie uraz mechaniczny pępka", correct: false, feedback: "Rzadka przyczyna." },
          { text: "Brak innych postaci – istnieje tylko zator", correct: false, feedback: "Nieprawda – zakrzepica i NOMI stanowią połowę przypadków." },
          { text: "Wypicie zbyt dużej ilości kawy", correct: false, feedback: "Kawa nie powoduje zawału jelita." }
        ]
      }
    ],
    pathoNodes: [
      {
        title: "1. Okluzja pnia tętnicy krezkowej górnej (SMA)",
        desc: "Materiał zatorowy z migotającego przedsionka serca zamyka światło SMA, odcinając dopływ krwi utlenowanej do jelita czczego, krętego i prawej połowy okrężnicy.",
        drugTarget: "Natychmiastowa heparynizacja i.v. i pilne Angio-TK tętnic trzewnych"
      },
      {
        title: "2. Przejście na glikolizę beztlenową i złuszczanie kosmków",
        desc: "Komórki nabłonka kosmków jelitowych ulegają martwicy już po 2–3 godzinach hipoksji. Komórki uwalniają mleczany do krążenia wrotnego (hiperlaktatemia i kwasica metaboliczna).",
        drugTarget: "Pilna rewaskularyzacja: embolektomia chirurgiczna lub endowaskularna w oknie <6–8 h"
      },
      {
        title: "3. Martwica pełnej grubości ściany, sepsa i MODS",
        desc: "Zawał mięśniówki i surowicówki prowadzi do utraty szczelności bariery jelitowej, masywnej translokacji bakterii Gram-ujemnych do krwi, wstrząsu septycznego i niewydolności wielonarządowej.",
        drugTarget: "Resekcja martwiczego jelita, antybiotykoterapia szerokowidmowa i laparotomia 'second-look' po 24–48 h"
      }
    ],
    dutySummary: "Ostre niedokrwienie krezki (zator SMA) u pacjenta z migotaniem przedsionków to 'zawał jelita'. Cechuje się skrajnym bólem brzucha nieproporcjonalnym do badania palpacyjnego (początkowo brzuch miękki!), wysokim poziomem mleczanów i leukocytozą. Złoty standard: natychmiastowe Angio-TK naczyń trzewnych. 'Czas to jelito' (<6–8h): pilna heparyna i.v., embolektomia SMA (chirurgiczna/endowaskularna), resekcja martwicy i planowy 'second-look' po 24–48h.",
    diffTable: [
      { disease: "Perforacja wrzodu trawiennego", diff: "Brzuch od początku twardy jak deska z obroną mięśniową i obecnym wolnym gazem pod przeponą w RTG; w zatorze SMA brzuch początkowo miękki.", test: "Badanie palpacyjne brzucha (deska vs miękki), Angio-TK vs RTG klatki piersiowej." },
      { disease: "Ostre zapalenie trzustki (OZT)", diff: "Ból opasujący promieniujący do pleców, kilkukrotny wzrost lipazy we krwi (>3x GGN); w zatorze SMA lipaza w normie lub lekko podwyższona.", test: "Lipaza i amylaza w surowicy, Angio-TK naczyń krezkowych." },
      { disease: "Niedrożność mechaniczna jelita ze zrostów", diff: "Ból kolkowy z przerwami bezbolesnymi, schodkowate poziomy płynów w RTG, mleczany początkowo w normie.", test: "Angio-TK (drożność pnia SMA), charakter bólu." },
      { disease: "Tętniak rozwarstwiający aorty brzusznej", diff: "Ból lędźwiowo-brzuszny, asymetria tętna na tętnicach udowych, w Angio-TK obecny fałd rozwarstwienia w aorcie.", test: "Angio-TK aorty i naczyń trzewnych." }
    ],
    lekQuestions: [
      {
        question: "74-letni pacjent z utrwalonym migotaniem przedsionków zgłasza się z powodu nagłego, obezwładniającego bólu brzucha trwającego od 3 godzin. W badaniu fizykalnym powłoki brzuszne są miękkie, niebolesne przy ucisku, brak objawów otrzewnowych. W gazometrii stwierdzono kwasicę metaboliczną z poziomem mleczanów 4.8 mmol/L. Najbardziej prawdopodobnym rozpoznaniem jest:",
        options: [
          "Ostre niedokrwienie krezki (zator tętnicy krezkowej górnej).",
          "Perforacja wrzodu opuszki dwunastnicy.",
          "Ostre kamicze zapalenie pęcherzyka żółciowego.",
          "Zaostrzenie zespołu jelita drażliwego.",
          "Zapalenie uchyłków esicy Hinchey I."
        ],
        correct: 0,
        explanation: "Połączenie wywiadu kardiologicznego (migotanie przedsionków sprzyjające powstawaniu skrzeplin w lewym przedsionku), nagłego dramatycznego bólu brzucha nieproporcjonalnego do ubogiego badania palpacyjnego (początkowo brzuch miękki i niebolesny uciskowo!) oraz kwasicy metabolicznej ze znaczną hiperlaktatemią jest klasycznym, podręcznikowym obrazem ostrego niedokrwienia krezki wywołanego zatorem tętnicy krezkowej górnej (SMA)."
      },
      {
        question: "Wskaż badanie obrazowe będące ZŁOTYM STANDARDEM w szybkiej diagnostyce podejrzenia ostrego niedokrwienia krezki:",
        options: [
          "Angiografia tomografii komputerowej jamy brzusznej (Angio-TK naczyń trzewnych).",
          "Przeglądowe zdjęcie RTG jamy brzusznej na stojąco.",
          "Przezbrzuszne USG jamy brzusznej bez opcji naczyniowej.",
          "Kolonoskopia diagnostyczna w znieczuleniu miejscowym.",
          "Pasaż przewodu pokarmowego z zawiesiną barytową."
        ],
        correct: 0,
        explanation: "Zgodnie z wytycznymi World Society of Emergency Surgery (WSES) i European Society for Vascular Surgery (ESVS), angiografia tomografii komputerowej (Angio-TK) z wielofazowym kontrastowaniem tętniczym i żylnym jest złotym standardem diagnostyki ostrego niedokrwienia krezki (czułość i swoistość >95%). Umożliwia precyzyjne uwidocznienie zatoru w pniu SMA, ocenę perfuzji ściany jelita i kwalifikację do rewaskularyzacji."
      },
      {
        question: "Dlaczego po zabiegu embolektomii tętnicy krezkowej górnej i wycięciu martwiczego odcinka jelita cienkiego zaleca się zaplanowanie ponownej laparotomii (tzw. second-look laparotomy) po 24–48 godzinach?",
        options: [
          "W celu ponownej oceny żywotności pozostawionych pętli jelita po przywróceniu przepływu krwi i ewentualnego docięcia wtórnie obumarłych tkanek bez wycinania pętli zdolnych do regeneracji.",
          "Aby usunąć wcześniej założony dren Redona.",
          "W celu rutynowego usunięcia śledziony.",
          "Ponieważ każda operacja naczyniowa w jamie brzusznej musi trwać minimum 3 dni.",
          "Jest to postępowanie wymagane wyłącznie w celach naukowych."
        ],
        correct: 0,
        explanation: "W ostrym niedokrwieniu krezki tuż po rewaskularyzacji bardzo trudno jest jednoznacznie ocenić, które pętle jelitowe zregenerują się, a które ulegną nieodwracalnej martwicy. Aby zapobiec wycięciu zbyt dużej długości jelita (co prowadzi do kalectwa w postaci zespołu krótkiego jelita), chirurg usuwa tylko ewidentną martwicę, a jelito o wątpliwej żywotności poddaje ponownej ocenie podczas planowej relaparotomii (tzw. second-look) po 24–48 godzinach."
      }
    ],
    flashcards: [
      { q: "Jaka jest klasyczna cecha kliniczna wczesnej fazy zatoru SMA?", a: "Dramatyczny ból brzucha NIEPROPORCJONALNY do badania fizykalnego (brzuch początkowo całkowicie miękki).", cat: "Chirurgia" },
      { q: "Jaki jest czynnik predysponujący u większości chorych z zatorem SMA?", a: "Migotanie przedsionków (AF) – materiał zatorowy ze skrzepliny w lewym przedsionku serca.", cat: "Chirurgia" },
      { q: "Jakie badanie obrazowe jest złotym standardem rozpoznania zatoru SMA?", a: "Angio-TK tętnic trzewnych (wielofazowa tomografia komputerowa z kontrastem).", cat: "Chirurgia" },
      { q: "Jaki marker laboratoryjny wskazuje na martwicę niedokrwienną jelita w zatorze SMA?", a: "Wysokie stężenie mleczanów we krwi (hiperlaktatemia) i kwasica metaboliczna.", cat: "Chirurgia" },
      { q: "Co to jest operacja 'second-look' w niedokrwieniu krezki?", a: "Planowa ponowna laparotomia po 24–48 godzinach w celu oceny żywotności jelita po rewaskularyzacji.", cat: "Chirurgia" }
    ]
  },

  // 134: Zapalenie uchyłków esicy (Hinchey)
  {
    id: 134,
    filename: "134_zapalenie_uchylkow_esicy_hinchey.json",
    dept: "Chirurgia",
    shortTitle: "60-letnia kobieta – Ból w lewym dole biodrowym, gorączka i ropień okołojelitowy (Zapalenie uchyłków / Hinchey II)",
    diagnosisTitle: "Ostre powikłane zapalenie uchyłków esicy (Diverticulitis acuta sigmoidei) stopień II wg klasyfikacji Hincheya",
    vitals: [
      { label: "HR", val: "104/min", sub: "Tachykardia zapalna", status: "warn" },
      { label: "BP", val: "130/80 mmHg", sub: "Prawidłowe", status: "ok" },
      { label: "SpO2", val: "98%", sub: "Prawidłowa", status: "ok" },
      { label: "RR", val: "18/min", sub: "Prawidłowa", status: "ok" },
      { label: "Temp", val: "38.7°C", sub: "Gorączka z dreszczami", status: "warn" }
    ],
    vitalsObj: { hr: 104, bp: "130/80", spo2: 98, rr: 18, temp: 38.7 },
    story: "60-letnia kobieta z wieloletnią uchyłkowatością jelita grubego w wywiadzie zgłosiła się na izbę przyjęć z powodu silnego, stałego bólu w lewym dole biodrowym trwającego od 3 dni. Ból narastał stopniowo, promieniuje do lewej pachwiny i pleców, towarzyszą mu zaparcia na zmianę z biegunkami, nudności oraz gorączka do 38.8°C z dreszczami (obraz tzw. 'lewostronnego zapalenia wyrostka robaczkowego'). Pacjentka odczuwa również częstomocz i bolesne parcie na pęcherz (odczynowe podrażnienie pęcherza przez zapalną esicę). W badaniu fizykalnym: w lewym dole biodrowym obecna bolesność uciskowa, miejscowa obrona mięśniowa oraz wyczuwalny bolesny opór o charakterze nacieku. Objaw Blumberga dodatni miejscowo po stronie lewej, w pozostałych kwadrantach brzuch miękki i niebolesny. Perystaltyka leniwa.",
    labs: [
      {
        category: "Wskaźniki stanu zapalnego i morfologia",
        items: [
          { name: "Leukocyty (WBC)", val: "16.8 G/L z neutrofilią (82%)", norm: "4.0–10.0 G/L", flag: "H" },
          { name: "CRP", val: "145 mg/L (znaczny odczyn zapalny)", norm: "< 5.0 mg/L", flag: "H" },
          { name: "Prokalcytonina (PCT)", val: "0.85 ng/mL", norm: "< 0.5 ng/mL", flag: "H" },
          { name: "Hemoglobina / Płytki", val: "12.4 g/dL / 380 G/L", norm: "Prawidłowe", flag: "N" }
        ]
      },
      {
        category: "Tomografia komputerowa (TK jamy brzusznej z kontrastem - złoty standard)",
        items: [
          { name: "Obraz esicy w TK", val: "Ostre zapalenie uchyłków esicy: pogrubienie ściany esicy do 8 mm, zagęszczenie i obrzęk okołookrężniczej tkanki tłuszczowej (fat stranding), liczne uchyłki", norm: "Ściana jelita < 3 mm", flag: "H" },
          { name: "Obecność ropnia (Klasyfikacja Hincheya)", val: "Obecność otorbionego zbiornika płynowo-gazowego (ropnia) w miednicy mniejszej o wymiarach 5.2 x 4.5 cm (Ropień miedniczny odległy = Hinchey II)", norm: "Brak zbiorników płynowych", flag: "H" },
          { name: "Wolny gaz w jamie otrzewnej", val: "Brak cech rozlanego pneumoperitoneum (brak perforacji do wolnej jamy otrzewnej)", norm: "Brak", flag: "N" }
        ]
      },
      {
        category: "Badanie moczu i biochemia",
        items: [
          { name: "Badanie ogólne moczu", val: "Leukocyturia odczynowa 10–15 wpw, azotyny ujemne, posiew moczu jałowy", norm: "Prawidłowe", flag: "H" },
          { name: "Kreatynina / Mocznik", val: "0.92 / 32 mg/dL", norm: "Prawidłowe", flag: "N" }
        ]
      }
    ],
    steps: [
      {
        num: 1,
        title: "Rozpoznanie kliniczne i zespół 'lewostronnego wyrostka'",
        task: "Ból w lewym dole biodrowym, gorączka, leukocytoza i wyczuwalny bolesny opór u 60-letniej pacjentki z uchyłkowatością to klasyczny obraz:",
        options: [
          { text: "Ostrego zapalenia uchyłków esicy (Diverticulitis acuta / tzw. lewostronny wyrostek)", correct: true, feedback: "Prawidłowo! Zapalenie uchyłków esicy jest najczęstszą przyczyną ostrego brzucha w lewym dolnym kwadrancie u osób starszych i dlatego bywa nazywane 'lewostronnym zapaleniem wyrostka robaczkowego'. Powstaje na skutek zatkania szyjki uchyłka przez kamień kałowy i mikronadżerki ściany." },
          { text: "Ostrego zapalenia trzustki", correct: false, feedback: "Błąd – ból w OZT lokalizuje się w nadbrzuszu i opasuje." },
          { text: "Wrzodziejącego zapalenia jelita grubego w rzucie łagodnym", diff: "W WZJG dominuje krwista biegunka, brak ropnia miednicznego." },
          { text: "Kamiczego zapalenia pęcherzyka żółciowego", correct: false, feedback: "Ból w zapaleniu pęcherzyka leży pod prawym łukiem żebrowym." }
        ]
      },
      {
        num: 2,
        title: "Klasyfikacja Hincheya w ostrym zapaleniu uchyłków",
        task: "W badaniu TK stwierdzono pogrubienie ściany esicy oraz obecność ropnia w miednicy mniejszej o średnicy 5 cm. Jaki to stopień w klasyfikacji Hincheya?",
        options: [
          { text: "Stopień II wg klasyfikacji Hincheya (ropień odległy w miednicy mniejszej lub przestrzeni zaotrzewnowej)", correct: true, feedback: "Prawidłowo! Klasyfikacja Hincheya: I – ropień okołookrężniczy/w krezce (phlegmona/ropień mały); II – ropień odległy (w miednicy mniejszej lub zaotrzewnowo); III – uogólnione ropne zapalenie otrzewnej; IV – uogólnione kałowe zapalenie otrzewnej (otwarta perforacja)." },
          { text: "Stopień I wg Hincheya", correct: false, feedback: "W stopniu I ropień ogranicza się do krezki esicy lub ściany jelita (okołookrężniczy)." },
          { text: "Stopień III wg Hincheya", correct: false, feedback: "Stopień III to rozlane ropne zapalenie otrzewnej bez otorbienia ropnia." },
          { text: "Stopień IV wg Hincheya", correct: false, feedback: "Stopień IV to kałowe zapalenie otrzewnej z otwartą perforacją." }
        ]
      },
      {
        num: 3,
        title: "Badanie obrazowe z wyboru i bezwzględne przeciwwskazanie",
        task: "Które badanie obrazowe jest ZŁOTYM STANDARDEM diagnostyki ostrego zapalenia uchyłków, a które badanie endoskopowe jest BEZWZGLĘDNIE ZAKAZANE w ostrej fazie?",
        options: [
          { text: "Złoty standard: TK jamy brzusznej z kontrastem dożylnym i doodbytniczym; Bezwzględnie zakazana: KOLONOSKOPIA w fazie ostrej (ryzyko przedziurawienia zmienionego zapalnie uchyłka!)", correct: true, feedback: "Kluczowa zasada na LEK! Badaniem z wyboru jest tomografia komputerowa (TK). Wykonanie kolonoskopii w ostrej fazie zapalenia uchyłków jest BEZWZGLĘDNIE PRZECIWWSKAZANE z powodu ryzyka mechanicznego i ciśnieniowego przedziurawienia ściany (perforacji)! Kolonoskopię wykonuje się planowo dopiero po 6–8 tygodniach od wyleczenia w celu wykluczenia raka jelita grubego." },
          { text: "Złoty standard: kolonoskopia w 1. dobie; przeciwwskazane: badanie USG", correct: false, feedback: "Kardynalny błąd zagrażający perforacją okrężnicy!" },
          { text: "Złoty standard: rezonans magnetyczny; zakazane: badanie moczu", correct: false, feedback: "Błędne stwierdzenie." },
          { text: "Złoty standard: wlew barytowy doodbytniczy pod ciśnieniem", correct: false, feedback: "Wlew barytowy w ostrej fazie jest zakazany (grozi barytowym zapaleniem otrzewnej)." }
        ]
      },
      {
        num: 4,
        title: "Leczenie ropnia miednicznego (Hinchey II, średnica >4–5 cm)",
        task: "Jakie jest postępowanie z wyboru w przypadku ropnia miednicznego o średnicy 5 cm w przebiegu zapalenia uchyłków (Hinchey II) u stabilnej pacjentki?",
        options: [
          { text: "Przezskórny drenaż ropnia pod kontrolą TK lub USG połączony z dożylną antybiotykoterapią o szerokim spektrum", correct: true, feedback: "Dokładnie tak! Zgodnie z wytycznymi WSES i EAES, ropnie o średnicy >= 4–5 cm kwalifikują się do przezskórnego drenażu pod kontrolą TK/USG w połączeniu z antybiotykoterapią dożylną. Pozwala to uniknąć doraźnej operacji i wyłonienia stomii u >80% pacjentów. Ropnie małe (<3–4 cm) leczy się samą antybiotykoterapią." },
          { text: "Natychmiastowa operacja sposobem Hartmanna bez próby drenażu", correct: false, feedback: "U stabilnego chorego drenaż przezskórny jest postępowaniem mniej inwazyjnym i pozwala uniknąć stomii." },
          { text: "Podanie samej aspiryny doustnie", correct: false, feedback: "Niedopuszczalne i nieskuteczne." },
          { text: "Wlewy z rumianku doodbytniczo", correct: false, feedback: "Brak wiedzy medycznej." }
        ]
      },
      {
        num: 5,
        title: "Wskazania do pilnej operacji (Hinchey III i IV)",
        task: "W jakich sytuacjach w przebiegu ostrego zapalenia uchyłków esicy bezwzględnie konieczna jest pilna operacja w trybie ostrym?",
        options: [
          { text: "Rozlane zapalenie otrzewnej (ropne lub kałowe – Hinchey III i IV), wstrząs septyczny, wolna perforacja z pneumoperitoneum lub brak poprawy po drenażu przezskórnym", correct: true, feedback: "Znakomicie! Wskazania do pilnej operacji to uogólnione zapalenie otrzewnej (ropne lub kałowe), wolne powietrze w otrzewnej, niestabilność hemodynamiczna oraz niepowodzenie leczenia zachowawczego i drenażu ropnia." },
          { text: "Każdy pojedynczy epizod niepowikłanego zapalenia uchyłków", correct: false, feedback: "Błąd – niepowikłane zapalenie uchyłków (Hinchey 0/Ia) leczy się zachowawczo (często nawet ambulatoryjnie)." },
          { text: "Wystąpienie świądu skóry po penicylinie", correct: false, feedback: "To alergia, nie wskazanie do laparotomii." },
          { text: "Prawidłowy obraz w badaniu TK", correct: false, feedback: "Nielogiczne." }
        ]
      },
      {
        num: 6,
        title: "Zabieg operacyjny z wyboru w perforacji kałowej (Hinchey IV)",
        task: "Jaki zabieg jest klasyczną operacją z wyboru w przypadku perforacji uchyłków z rozlanym kałowym zapaleniem otrzewnej i wstrząsem (Hinchey IV)?",
        options: [
          { text: "Operacja sposobem Hartmanna (resekcja esicy ze zmianami zapalnymi, zamknięcie kikuta odbytnicy i wyłonienie kolostomii końcowej)", correct: true, feedback: "Doskonale! W kałowym zapaleniu otrzewnej i wstrząsie (Hinchey IV) operacja Hartmanna pozostaje najbezpieczniejszym zabiegiem ratującym życie, eliminującym ryzyko nieszczelności zespolenia. Po wygojeniu i rekonwalescencji (po 3–6 miesiącach) można rozważyć odtworzenie ciągłości przewodu pokarmowego." },
          { text: "Pierwotne zespolenie jelitowe bez stomii ochronnej u wstrząsowego pacjenta", correct: false, feedback: "Skrajnie wysokie ryzyko nieszczelności zespolenia (>30%) i zgonu septycznego!" },
          { text: "Wycięcie żołądka z pęcherzykiem żółciowym", correct: false, feedback: "Brak związku z patologią esicy." },
          { text: "Założenie samego drenu do pachwiny", correct: false, feedback: "Niewystarczające – nie usuwa źródła perforacji kałowej." }
        ]
      },
      {
        num: 7,
        title: "Późne powikłanie przetokowe: przetoka pęcherzowo-okrężnicza",
        task: "Jakie objawy kliniczne wskazują na wytworzenie przetoki pęcherzowo-okrężniczej (fistula colovesicalis) jako powikłania przewlekłego zapalenia uchyłków?",
        options: [
          { text: "Pneumaturia (obecność pęcherzyków gazu w moczu podczas mikcji) oraz fekaluria (obecność cząstek kału w moczu) z nawracającymi ZUM", correct: true, feedback: "Świetnie! Przetoka pęcherzowo-okrężnicza jest najczęstszą przetoką w zapaleniu uchyłków. Prowadzi do przenikania gazów jelitowych do pęcherza (pneumaturia / 'bąbelki gazu przy oddawaniu moczu') oraz treści kałowej (fekaluria) z opornymi zakażeniami florą jelitową (E. coli)." },
          { text: "Krwawienie z nosa i suchość w ustach", correct: false, feedback: "Brak związku." },
          { text: "Wypadanie włosów i łamliwość paznokci", correct: false, feedback: "Cechy niedoborów żywieniowych, nie przetoki." },
          { text: "Masywny krwiomocz z drgawkami", correct: false, feedback: "Nietypowe." }
        ]
      },
      {
        num: 8,
        title: "Planowa kolonoskopia po wygaszeniu stanu zapalnego",
        task: "Dlaczego po 6–8 tygodniach od pełnego wyleczenia ostrego epizodu zapalenia uchyłków ZALECA SIĘ wykonanie pełnej kolonoskopii?",
        options: [
          { text: "W celu wykluczenia raka jelita grubego, który może imitować zapalenie uchyłków w badaniu TK lub współistnieć ze zmianami uchyłkowymi", correct: true, feedback: "Znakomicie! Około 1–3% chorych leczonych z powodu zapalenia uchyłków ma w rzeczywistości raka jelita grubego z perforacją lub zwężeniem. Pogrubienie ściany w TK w ostrej fazie nie pozwala na pewne odróżnienie nacieku zapalnego od guza nowotworowego, dlatego kolonoskopia po 6–8 tygodniach jest standardem onkologicznym." },
          { text: "W celu usunięcia wszystkich uchyłków kleszczykami biopsyjnymi", correct: false, feedback: "Uchyłków nie usuwa się endoskopowo kleszczykami (grozi to perforacją!)." },
          { text: "Aby wypłukać jelito mydłem potasowym", correct: false, feedback: "Nonsens medyczny." },
          { text: "W celu zbadania obecności polipów w żołądku", correct: false, feedback: "Kolonoskopia bada jelito grube, nie żołądek." }
        ]
      }
    ],
    pathoNodes: [
      {
        title: "1. Uchyłkowatość rzekoma jelita grubego",
        desc: "Zwiększone ciśnienie śródścienne w esicy wypycha błonę śluzową i podśluzową przez miejsca wnikania naczyń krwionośnych (vasa recta) w błonie mięśniowej, tworząc uchyłki nabyte (rzekome).",
        drugTarget: "Dieta bogatoresztkowa i regularna aktywność fizyczna zapobiegająca zaparciom"
      },
      {
        title: "2. Zatkanie uchyłka, mikronadżerka i stan zapalny (Diverticulitis)",
        desc: "Złóg kałowy blokuje wąską szyjkę uchyłka, powodując zastój śluzu, namnażanie bakterii, martwicę ściany uchyłka i mikroskopijną perforację do tkanki okołookrężniczej.",
        drugTarget: "Antybiotykoterapia dożylna (ceftriakson + metronidazol lub fluorochinolon) i ścisła dieta"
      },
      {
        title: "3. Powikłania ropne i otrzewnowe (Klasyfikacja Hincheya)",
        desc: "Proces może ulec otorbieniu (ropień Hinchey I/II) lub przedziurawieniu do jamy otrzewnej z zapaleniem ropnym (Hinchey III) lub kałowym (Hinchey IV).",
        drugTarget: "Drenaż przezskórny pod TK (Hinchey II) lub operacja Hartmanna (Hinchey III/IV)"
      }
    ],
    dutySummary: "Zapalenie uchyłków esicy ('lewostronny wyrostek') to ból w lewym dole biodrowym, gorączka i leukocytoza. Złoty standard: TK jamy brzusznej z kontrastem. KOLONOSKOPIA W FAZIE OSTREJ JEST BEZWZGLĘDNIE ZAKAZANA (ryzyko perforacji!). Stopnie Hincheya: I (ropień okołojelitowy), II (ropień miedniczny – lecz drenażem przezskórnym), III (ropne zapalenie otrzewnej), IV (kałowe – pilna operacja Hartmanna). Po 6–8 tyg. wykonaj kolonoskopię w celu wykluczenia raka!",
    diffTable: [
      { disease: "Rak jelita grubego (esicy)", diff: "Może dawać identyczny obraz zwężenia i nacieku w TK; różnicowanie wymaga planowej kolonoskopii z biopsją po 6–8 tygodniach od ustąpienia stanu zapalnego.", test: "Kolonoskopia po 6–8 tyg. z pobraniem wycinków histopatologicznych." },
      { disease: "Ostre zapalenie wyrostka robaczkowego", diff: "Ból w prawym dole biodrowym (chyba że wyrostek jest długi lub przy situs inversus), młodszy wiek, brak uchyłkowatości w TK.", test: "Lokalizacja w TK brzucha (kątnica vs esica)." },
      { disease: "Niedokrwienne zapalenie jelita grubego (ischaemic colitis)", diff: "Przemijający ból z wczesną KRWISTĄ biegunką u starszego miażdżycowego pacjenta; brak ropni okołookrężniczych w TK.", test: "Obecność krwistej biegunki, TK brzucha (obrzęk błony śluzowej bez cech ropnia)." },
      { disease: "Torbiel jajnika skręcona / pęknięta", diff: "Dotyczy kobiet; nagły ból w podbrzuszu, brak gorączki na początku, w USG transwaginalnym zmiana guzowata w rzucie przydatków.", test: "USG ginekologiczne przezpochwowe (TV-USG)." }
    ],
    lekQuestions: [
      {
        question: "U 62-letniej kobiety z podejrzeniem ostrego zapalenia uchyłków esicy (silny ból w lewym dole biodrowym, gorączka 38.8°C, leukocytoza 16.0 G/L) wskaż badanie obrazowe z wyboru oraz procedurę BEZWZGLĘDNIE PRZECIWWSKAZANĄ w fazie ostrej:",
        options: [
          "Badanie z wyboru: tomografia komputerowa (TK) jamy brzusznej z kontrastem; Bezwzględnie przeciwwskazana: pełna kolonoskopia.",
          "Badanie z wyboru: kolonoskopia w 1. dobie; Przeciwwskazana: tomografia komputerowa.",
          "Badanie z wyboru: urografia dożylna; Przeciwwskazana: ultrasonografia.",
          "Badanie z wyboru: scyntygrafia wątroby; Przeciwwskazana: badanie per rectum.",
          "Badanie z wyboru: laparoskopia zwiadowcza u każdego pacjenta; Przeciwwskazana: gazometria."
        ],
        correct: 0,
        explanation: "Zgodnie z wytycznymi chirurgicznymi i gastroenterologicznymi (WSES, ACG), badaniem pierwszego wyboru i złotym standardem diagnostyki ostrego zapalenia uchyłków jest tomografia komputerowa (TK) jamy brzusznej z kontrastem. Z kolei wykonanie kolonoskopii w ostrej fazie jest BEZWZGLĘDNIE PRZECIWWSKAZANE z powodu wysokiego ryzyka perforacji zmienionej zapalnie, kruchej ściany uchyłka pod wpływem insuflacji gazu i manipulacji aparatem. Kolonoskopię odracza się o 6–8 tygodni."
      },
      {
        question: "Zgodnie z klasyfikacją Hincheya, obecność otorbionego ropnia w miednicy mniejszej w przebiegu ostrego zapalenia uchyłków esicy odpowiada:",
        options: [
          "Stopniowi I wg Hincheya.",
          "Stopniowi II wg Hincheya.",
          "Stopniowi III wg Hincheya.",
          "Stopniowi IV wg Hincheya.",
          "Stopniowi 0 wg Hincheya."
        ],
        correct: 1,
        explanation: "Klasyfikacja Hincheya: Stopień I – zapalenie z małym ropniem okołookrężniczym lub w krezce; Stopień II – ropień odległy (w miednicy mniejszej lub przestrzeni zaotrzewnowej); Stopień III – uogólnione ropne zapalenie otrzewnej; Stopień IV – uogólnione kałowe zapalenie otrzewnej."
      },
      {
        question: "U pacjenta z uchyłkowatością esicy wystąpiła pneumaturia (obecność pęcherzyków gazu w moczu) oraz nawracające zakażenia układu moczowego florą jelitową. Objawy te są patognomoniczne dla:",
        options: [
          "Przetoki pęcherzowo-okrężniczej (fistula colovesicalis).",
          "Kamiczego zapalenia nerek.",
          "Raka nerki.",
          "Wodonercza wrodzonego.",
          "Zespołu nerczycowego."
        ],
        correct: 0,
        explanation: "Pneumaturia (wydalanie gazu z moczem) oraz fekaluria (obecność mas kałowych w moczu) w wywiadzie nawracających zapaleń uchyłków są objawami patognomonicznymi dla przetoki pęcherzowo-okrężniczej (fistula colovesicalis), która powstaje na skutek przejścia procesu zapalnego z uchyłka esicy na przylegającą ścianę pęcherza moczowego."
      }
    ],
    flashcards: [
      { q: "Dlaczego ostre zapalenie uchyłków esicy nazywane jest 'lewostronnym wyrostkiem'?", a: "Daje analogiczne objawy zapalenia (ból, obrona mięśniowa, gorączka, leukocytoza), ale w lewym dole biodrowym.", cat: "Chirurgia" },
      { q: "Dlaczego kolonoskopia jest zakazana w ostrej fazie zapalenia uchyłków?", a: "Insuflacja gazu i ucisk aparatu grożą przedziurawieniem (perforacją) zapalnego uchyłka do otrzewnej.", cat: "Chirurgia" },
      { q: "Jak leczy się ropień miedniczny o średnicy >4–5 cm w zapaleniu uchyłków (Hinchey II)?", a: "Przezskórnym drenażem pod kontrolą TK/USG w połączeniu z antybiotykoterapią dożylną.", cat: "Chirurgia" },
      { q: "Jaki zabieg wykonuje się w perforacji kałowej uchyłków (Hinchey IV)?", a: "Pilną operację sposobem Hartmanna (resekcja esicy z kolostomią końcową).", cat: "Chirurgia" },
      { q: "Czym objawia się przetoka pęcherzowo-okrężnicza w zapaleniu uchyłków?", a: "Pneumaturią (bąbelki gazu w moczu) i fekalurią z nawracającymi zakażeniami układu moczowego.", cat: "Chirurgia" }
    ]
  },

  // 135: Krwawienie z dolnego odcinka przewodu pokarmowego (LGIB)
  {
    id: 135,
    filename: "135_krwawienie_dolny_odcinek_lgib.json",
    dept: "Chirurgia",
    shortTitle: "68-letni mężczyzna – Masywne krwawienie z odbytu ciemnoczerwoną krwią i hipotonia (Krwawienie z uchyłków / LGIB)",
    diagnosisTitle: "Masywne krwawienie z dolnego odcinka przewodu pokarmowego (Lower Gastrointestinal Bleeding - LGIB) z uchyłków okrężnicy",
    vitals: [
      { label: "HR", val: "116/min", sub: "Tachykardia kompensacyjna", status: "warn" },
      { label: "BP", val: "94/58 mmHg", sub: "Hipotonia ortostatyczna", status: "warn" },
      { label: "SpO2", val: "97%", sub: "Prawidłowa", status: "ok" },
      { label: "RR", val: "22/min", sub: "Prawidłowa", status: "ok" },
      { label: "Temp", val: "36.6°C", sub: "Prawidłowa", status: "ok" }
    ],
    vitalsObj: { hr: 116, bp: "94/58", spo2: 97, rr: 22, temp: 36.6 },
    story: "68-letni mężczyzna leczący się z powodu nadciśnienia tętniczego i choroby niedokrwiennej serca (przyjmujący przewlekle kwas acetylosalicylowy w dawce 75 mg/d), został przywieziony przez ZRM na SOR z powodu nagłego, obfitego i bezbolesnego oddania dużej ilości ciemnoczerwonej krwi ze skrzepami przez odbyt (hematochezia). Epizod powtórzył się dwukrotnie w ciągu ostatnich 3 godzin. Pacjent odczuwa silne osłabienie, zawroty głowy i szum w uszach przy próbie pionizacji. Nie zgłasza bólów brzucha, wymiotów ani gorączki. W wywiadzie: rozpoznana przed 3 laty uchyłkowatość jelita grubego. W badaniu fizykalnym: chory blady, spocony, tachykardia 116/min, ciśnienie 94/58 mmHg. Brzuch miękki, całkowicie niebolesny palpacyjnie, bez objawów otrzewnowych i bez oporów patologicznych, perystaltyka żywa, przyspieszona (krew działa przeczyszczająco). W badaniu per rectum: obecność obfitej świeżej krwi i ciemnoczerwonych skrzepów na rękawicy, brak guzów kanału odbytu i brak zakrzepicy guzków krwawniczych.",
    labs: [
      {
        category: "Morfologia i grupa krwi CITO",
        items: [
          { name: "Hemoglobina (Hb)", val: "8.4 g/dL (spadek z wyjściowego 14.0 g/dL)", norm: "13.0–17.5 g/dL", flag: "L" },
          { name: "Hematokryt (Hct)", val: "26%", norm: "40–50%", flag: "L" },
          { name: "Płytki krwi (PLT)", val: "185 G/L", norm: "150–450 G/L", flag: "N" },
          { name: "Grupa krwi i próba krzyżowa", val: "Grupa 0 RhD+ (zamówiono 2 jednostki KKCz)", norm: "Zgodna", flag: "N" }
        ]
      },
      {
        category: "Stosunek mocznik/kreatynina i biochemia",
        items: [
          { name: "Mocznik surowicy", val: "38 mg/dL", norm: "15–40 mg/dL", flag: "N" },
          { name: "Kreatynina surowicy", val: "0.95 mg/dL", norm: "0.70–1.20 mg/dL", flag: "N" },
          { name: "Stosunek azot mocznika (BUN) / kreatynina", val: "< 20 (wskazuje na krwawienie z DOLNEGO odcinka przewodu pokarmowego)", norm: "< 20 w LGIB / > 30 w UGIB", flag: "N" },
          { name: "INR / APTT", val: "1.05 / 28 s", norm: "Prawidłowe", flag: "N" }
        ]
      },
      {
        category: "Diagnostyka obrazowa (Angio-TK i endoskopia)",
        items: [
          { name: "Angio-TK jamy brzusznej (faza tętnicza i miąższowa CITO)", val: "Aktywne wynaczynienie środka cieniującego (blushing / extravasation) o intensywności > 0.5 mL/min w obrębie uchyłka w prawej połowie okrężnicy (okrężnica wstępująca)", norm: "Brak wynaczynienia", flag: "H" },
          { name: "Gastroskopia ratunkowa", val: "Czysta żółć w żołądku i dwunastnicy, brak cech krwawienia z górnego odcinka przewodu pokarmowego", norm: "Prawidłowa", flag: "N" }
        ]
      }
    ],
    steps: [
      {
        num: 1,
        title: "Definicja i najczęstsze przyczyny krwawienia z dolnego odcinka (LGIB)",
        task: "Krwawienie z dolnego odcinka przewodu pokarmowego (LGIB) to krwawienie poniżej więzadła Treitza. Jaka jest najczęstsza przyczyna ostrego, masywnego, bezbolesnego krwawienia z dolnego odcinka u osób starszych?",
        options: [
          { text: "Krwawienie z uchyłków jelita grubego (diverticular bleeding) oraz angiodysplazje (malformacje naczyniowe)", correct: true, feedback: "Prawidłowo! Krwawienie z uchyłków odpowiada za 30–50% przypadków masywnego LGIB u dorosłych. W przeciwieństwie do zapalenia uchyłków, krwawienie ma charakter nagły, obfity i BEZBOLESNY (asocjacja z pęknięciem tętniczki brzeżnej vasa recta w szyjce uchyłka). Drugą częstą przyczyną u starszych są angiodysplazje." },
          { text: "Ostre zapalenie wyrostka robaczkowego", correct: false, feedback: "Wyrostek nie daje masywnego krwawienia z odbytu." },
          { text: "Pęknięcie tętniaka tętnicy śledzionowej do żołądka", correct: false, feedback: "To krwawienie z górnego odcinka." },
          { text: "Szkorbut z niedoboru witaminy C", correct: false, feedback: "Kazuistyka w dobie współczesnej." }
        ]
      },
      {
        num: 2,
        title: "Kiedy hematochezja (świeża krew) pochodzi z GÓRNEGO odcinka przewodu pokarmowego?",
        task: "U 10–15% pacjentów oddających obfitą, świeżą lub ciemnoczerwoną krew z odbytu (hematochezja) źródło krwawienia znajduje się w GÓRNYM odcinku przewodu pokarmowego (UGIB). Kiedy należy to podejrzewać?",
        options: [
          { text: "Przy masywnym krwotoku z żołądka/dwunastnicy (np. wrzód trawienny Dieulafoy) z niestabilnością hemodynamiczną (wstrząsem), przyspieszonym pasażem jelitowym oraz podwyższonym stosunkiem mocznik/kreatynina (BUN/Cr > 30)", correct: true, feedback: "Znakomicie! Piorunujący krwotok z wrzodu dwunastnicy działa przeczyszczająco i krew nie zdąży ściemnieć do smolistego stolca. Cechami UGIB są: niestabilność krążeniowa, wysoki stosunek BUN/kreatynina (>30, z trawienia białek krwi) oraz konieczność wykonania pilnej gastroskopii przed procedurami dolnymi!" },
          { text: "Tylko u pacjentów bez zębów", correct: false, feedback: "Brak związku medycznego." },
          { text: "Gdy pacjent ma prawidłowe ciśnienie krwi", correct: false, feedback: "Przeciwnie – masywny krwotok z UGIB dający hematochezję daje wstrząs." },
          { text: "Nigdy – krew z odbytu zawsze pochodzi z odbytnicy", correct: false, feedback: "Niebezpieczny błąd diagnostyczny!" }
        ]
      },
      {
        num: 3,
        title: "Pierwszy krok postępowania ratunkowego: Resuscytacja hemodynamiczna",
        task: "Jaki jest bezwzględny priorytet postępowania u pacjenta z krwawieniem z przewodu pokarmowego, tachykardią 116/min i ciśnieniem 94/58 mmHg?",
        options: [
          { text: "Natychmiastowe zabezpieczenie 2 wkłuć obwodowych dużej średnicy (16G/14G), wlew krystaloidów, pobranie krwi na grupę i próbę krzyżową oraz stabilizacja hemodynamiczna PRZED jakimikolwiek badaniami endoskopowymi", correct: true, feedback: "Dokładnie tak! Zgodnie z wytycznymi ESGE/ACG: 'Najpierw resuscytacja, potem diagnostyka'. Żadnego pacjenta niestabilnego hemodynamicznie nie wolno wysyłać na badania obrazowe ani endoskopowe przed wstępnym wypełnieniem łożyska naczyniowego i zabezpieczeniem krwi do transfuzji!" },
          { text: "Natychmiastowe podanie doustnych środków przeczyszczających do przygotowania jelita", correct: false, feedback: "Błąd u niestabilnego pacjenta grożący zachłyśnięciem i wstrząsem!" },
          { text: "Pionizacja chorego i próba spaceru po korytarzu", correct: false, feedback: "Doprowadzi do omdlenia ortostatycznego i urazu głowy!" },
          { text: "Wstrzyknięcie domięśniowe witaminy K bez płynów", correct: false, feedback: "Witamina K działa po 12–24h i nie zastępuje płynoterapii we wstrząsie." }
        ]
      },
      {
        num: 4,
        title: "Metoda z wyboru w aktywnym, niestabilnym krwawieniu: Angio-TK",
        task: "U pacjenta z masywnym, toczącym się krwawieniem z odbytu i niestabilnością krążeniową, jakie badanie obrazowe jest współcześnie metodą z wyboru do szybkiej lokalizacji źródła krwawienia?",
        options: [
          { text: "Angio-TK jamy brzusznej (wielofazowa TK bez i z kontrastem)", correct: true, feedback: "Znakomicie! Angio-TK wykrywa wynaczynienie kontrastu do światła jelita przy tempie krwawienia zaledwie >0.3–0.5 mL/min. Jest szybka, nieinwazyjna, nie wymaga przygotowania jelita i precyzyjnie wskazuje naczynie zaopatrujące krwawiący uchyłek pod kątem pilnej embolizacji!" },
          { text: "Klasyczny wlew doodbytniczy z barytem", correct: false, feedback: "Bezwzględnie zakazany – baryt uniemożliwi późniejszą embolizację angiograficzną i endoskopię!" },
          { text: "RTG jamy brzusznej na stojąco", correct: false, feedback: "Nie uwidacznia źródła krwawienia z naczyń." },
          { text: "Scyntygrafia z erytrocytami znakowanymi technetem u pacjenta niestabilnego", correct: false, feedback: "Scyntygrafia jest zbyt wolna w stanie nagłym." }
        ]
      },
      {
        num: 5,
        title: "Metoda leczenia celowanego z wyboru: Embolizacja angiograficzna",
        task: "W badaniu Angio-TK zlokalizowano aktywne wynaczynienie kontrastu z gałęzi tętnicy krętniczo-okrężniczej w uchyłku wstępnicy. Jaka jest współcześnie metoda leczenia zabiegowego pierwszego rzutu?",
        options: [
          { text: "Przezcewnikowa selektywna mikroembolizacja angiograficzna (TAE - Transcatheter Angiographic Embolization) wykonana przez radiologa zabiegowego", correct: true, feedback: "Bardzo dobrze! Selektywna embolizacja (wprowadzenie mikrocewek lub cząstek PVA przez cewnik naczyniowy bezpośrednio do gałązki krwawiącego uchyłka) ma skuteczność >85–90% i pozwala uniknąć obciążającej operacji resekcyjnej u osób starszych." },
          { text: "Natychmiastowe wycięcie całej wątroby", correct: false, feedback: "Bzdura medyczna." },
          { text: "Przetoczenie 10 litrów soli fizjologicznej bez tamowania", correct: false, feedback: "Doprowadzi do koagulopatii z rozcieńczenia i obrzęku płuc." },
          { text: "Wycięcie pęcherza moczowego", correct: false, feedback: "Brak związku." }
        ]
      },
      {
        num: 6,
        title: "Rola kolonoskopii w diagnostyce i hemostazie LGIB",
        task: "U pacjenta ustabilizowanego hemodynamicznie, po opanowaniu wstrząsu, kiedy optymalnie wykonuje się kolonoskopię?",
        options: [
          { text: "Po odpowiednim przygotowaniu jelita preparatem makrogoli (PEG) w ciągu pierwszych 24 godzin (wczesna kolonoskopia diagnostyczno-terapeutyczna)", correct: true, feedback: "Świetnie! Po ustabilizowaniu chorego kolonoskopia wykonana po szybkim oczyszczeniu jelita (za pomocą PEG) pozwala na identyfikację źródła (uchyłek, angiodysplazja, polip, rak) i miejscowe zaopatrzenie hemostatyczne (klipsy naczyniowe hemoclips, koagulacja plazmą argonową APC, iniekcja adrenaliny)." },
          { text: "Bez przygotowania jelita na stole operacyjnym w ciemności", correct: false, feedback: "Masy skrzepów i kału uniemożliwiają jakąkolwiek widoczność." },
          { text: "Dopiero po 2 latach od epizodu", correct: false, feedback: "Zbyt późno – nie wyjaśni przyczyny krwawienia." },
          { text: "Kolonoskopia nie ma zastosowania w krwawieniach", correct: false, feedback: "Jest podstawową metodą endoskopową dolnego odcinka." }
        ]
      },
      {
        num: 7,
        title: "Naturalny przebieg krwawienia z uchyłków",
        task: "Jaki odsetek krwawień z uchyłków jelita grubego ustępuje samoistnie w trakcie hospitalizacji pod wpływem leczenia zachowawczego i wyrównania hemodynamicznego?",
        options: [
          { text: "Aż 75–85% krwawień ustępuje samoistnie bez konieczności zabiegów inwazyjnych", correct: true, feedback: "Znakomicie! U zdecydowanej większości pacjentów (ok. 80%) krwawienie z uchyłków ma charakter samoograniczający. Pęknięta tętniczka obkurcza się i zamyka skrzepliną pod wpływem stabilizacji ciśnienia krwi." },
          { text: "0% – każde krwawienie zawsze wymaga natychmiastowej kolektomii", correct: false, feedback: "Błąd – operacja w trybie ostrym jest konieczna u <5–10% chorych." },
          { text: "100% chorych umiera przed dojechaniem do szpitala", correct: false, feedback: "Nieprawda – rokowanie przy prawidłowej resuscytacji jest pomyślne." },
          { text: "Krwawienie ustępuje wyłącznie po podaniu witaminy C", correct: false, feedback: "Brak dowodów naukowych." }
        ]
      },
      {
        num: 8,
        title: "Wskazania do leczenia operacyjnego w LGIB",
        task: "Kiedy chory z krwawieniem z dolnego odcinka przewodu pokarmowego wymaga pilnej operacji chirurgicznej (resekcji jelita)?",
        options: [
          { text: "Utrzymujące się masywne krwawienie z niestabilnością hemodynamiczną oporne na próby hemostazy endoskopowej i embolizacji angiograficznej lub konieczność przetoczenia >4–6 jednostek KKCz w ciągu doby", correct: true, feedback: "Bardzo dobrze! Wskazania do leczenia operacyjnego (resekcji odcinkowej lub subtotalnej kolektomii przy nieznanym punkcie wyjścia) to: masywny krwotok oporny na zabiegi endowaskularne i endoskopię, nawrót krwotoku z niestabilnością krążenia oraz zapotrzebowanie na transfuzje >4–6 jednostek KKCz/dobę." },
          { text: "Każdy bezobjawowy ślad krwi utajonej w kale", correct: false, feedback: "Krew utajona wymaga planowej kolonoskopii, nie pilnej operacji." },
          { text: "Obecność hemoroidów I stopnia", correct: false, feedback: "Leczenie zachowawcze lub ambulatoryjne." },
          { text: "Gdy pacjent odmawia posiłku szpitalnego", correct: false, feedback: "Brak wskazań medycznych." }
        ]
      }
    ],
    pathoNodes: [
      {
        title: "1. Uchyłkowatość okrężnicy i relacja z vasa recta",
        desc: "Wnikające przez ścianę naczynia tętnicze (vasa recta) są ściśle rozciągnięte na kopule uchyłka, oddzielone od światła jedynie cienką warstwą błony śluzowej bez ochrony mięśniówki.",
        drugTarget: "Odstawienie leków przeciwpłytkowych i NLPZ w fazie ostrego krwawienia"
      },
      {
        title: "2. Przewlekłe drażnienie, ścieńczenie ściany i pęknięcie tętniczki",
        desc: "Miejscowy uraz mechaniczny przez twarde masy kałowe prowadzi do asymetrycznego pęknięcia tętnicy śródściennej, wywołując nagły, masywny krwotok tętniczy do światła jelita (hematochezia).",
        drugTarget: "Resuscytacja płynowa krystaloidami i przetoczenie KKCz przy niestabilności"
      },
      {
        title: "3. Selektywna hemostaza naczyniowa",
        desc: "Zatrzymanie krwotoku poprzez mechaniczne zamknięcie pękniętego naczynia zapobiega wstrząsowi hipowolemicznemu i zgonowi z wykrwawienia.",
        drugTarget: "Angio-TK i selektywna mikroembolizacja angiograficzna (TAE) lub klipsowanie endoskopowe"
      }
    ],
    dutySummary: "Krwawienie z dolnego odcinka przewodu pokarmowego (LGIB) najczęściej wynika z uchyłków (nagłe, obfite, bezbolesne krwawienie świeżą/ciemnoczerwoną krwią) lub angiodysplazji. U niestabilnych chorych wyklucz piorunujący krwotok z górnego odcinka (gastroskopia!). Priorytet: resuscytacja płynowa i transfuzja KKCz. W aktywnym krwawieniu metodą z wyboru jest Angio-TK i selektywna mikroembolizacja angiograficzna (TAE). Kolonoskopię wykonuje się po ustabilizowaniu i przygotowaniu jelita.",
    diffTable: [
      { disease: "Krwawienie z górnego odcinka przewodu pokarmowego (UGIB)", diff: "Smolisty stolec (melena) lub hematochezja przy wstrząsie, stosunek mocznik/kreatynina (BUN/Cr > 30), obecność krwi w żołądku w gastroskopii.", test: "Gastroskopia ratunkowa, stosunek mocznik/kreatynina." },
      { disease: "Krwawiące guzki krwawnicze (hemoroidy)", diff: "Jasnoczerwona krew na papierze toaletowym lub kapiąca do muszli pod koniec defekacji, krew nie jest wymieszana ze stolcem, brak wstrząsu.", test: "Badanie per rectum, anoskopia." },
      { disease: "Rak jelita grubego / polip krwawiący", diff: "Przewlekłe mikroskopijne krwawienie utajone z niedokrwistością z niedoboru żelaza, rzadziej ostry masywny krwotok ze skrzepami.", test: "Kolonoskopia planowa, badanie histopatologiczne guza." },
      { disease: "Niedokrwienne zapalenie jelita grubego", diff: "Skurczowy ból brzucha w lewym dole biodrowym POPRZEDZAJĄCY krwawą biegunkę, zwykle samoograniczające się, bez masywnej utraty krwi.", test: "TK brzucha, kolonoskopia (obrzęk i wybroczyny śluzówki)." }
    ],
    lekQuestions: [
      {
        question: "70-letni mężczyzna został przywieziony na SOR z powodu nagłego, obfitego i bezbolesnego oddania ciemnoczerwonej krwi ze skrzepami z odbytu. W badaniu: HR 118/min, BP 90/55 mmHg, brzuch miękki i niebolesny. Jaki powinien być PIERWSZY krok postępowania lekarskiego?",
        options: [
          "Założenie dwóch wkłuć obwodowych dużej średnicy, intensywna płynoterapia krystaloidami i zamówienie próby krzyżowej krwi.",
          "Natychmiastowe podanie doustnych środków przeczyszczających do przygotowania do kolonoskopii.",
          "Wykonanie pilnego wlewu doodbytniczego z barytu.",
          "Zastosowanie samej witaminy K domięśniowo i odesłanie do poradni.",
          "Podanie dożylne paracetamolu."
        ],
        correct: 0,
        explanation: "Zgodnie ze wszystkimi wytycznymi postępowania w krwawieniach z przewodu pokarmowego (ESGE, ACG), u pacjenta z masywnym krwawieniem i cechami niestabilności hemodynamicznej (tachykardia, hipotonia) bezwzględnym priorytetem jest natychmiastowa resuscytacja hemodynamiczna: dwa wkłucia o dużej średnicy (14–16G), szybki wlew krystaloidów, zabezpieczenie krwi do transfuzji i stabilizacja układu krążenia PRZED przystąpieniem do jakiejkolwiek diagnostyki obrazowej czy endoskopowej."
      },
      {
        question: "U pacjenta z masywnym krwawieniem z dolnego odcinka przewodu pokarmowego, u którego w Angio-TK uwidoczniono aktywne wynaczynienie kontrastu w uchyłku wstępnicy, metodą leczenia zabiegowego z wyboru jest:",
        options: [
          "Przezcewnikowa selektywna mikroembolizacja angiograficzna (TAE).",
          "Natychmiastowa całkowita proktokolektomia.",
          "Zastosowanie leków fibrynolitycznych dożylnie.",
          "Drenaż jamy otrzewnej.",
          "Podanie dożylne furosemidu."
        ],
        correct: 0,
        explanation: "W przypadku zlokalizowania aktywnego źródła krwawienia tętniczego w Angio-TK metodą pierwszego rzutu u pacjentów z masywnym krwawieniem z dolnego odcinka przewodu pokarmowego jest selektywna przezcewnikowa mikroembolizacja angiograficzna (TAE) wykonywana przez radiologa zabiegowego. Pozwala ona na zatrzymanie krwotoku z minimalną inwazyjnością i uniknięcie rozległej resekcji jelita u osób starszych."
      },
      {
        question: "Jaka cecha kliniczna i laboratoryjna wskazuje, że masywna hematochezja (świeża krew z odbytu) u wstrząsowego pacjenta może pochodzić z GÓRNEGO odcinka przewodu pokarmowego?",
        options: [
          "Wysoki stosunek azotu mocznika do kreatyniny (BUN/Cr > 30) wywołany trawieniem i wchłanianiem białek krwi w jelicie cienkim.",
          "Izolowany wzrost stężenia bilirubiny wolnej powyżej 10 mg/dL.",
          "Obecność białkomoczu powyżej 5 g na dobę.",
          "Spadek stężenia kwasu moczowego w surowicy.",
          "Prawidłowy hematokryt."
        ],
        correct: 0,
        explanation: "Około 10–15% przypadków masywnej hematochezji (krwi z odbytu) u pacjentów we wstrząsie pochodzi z górnego odcinka przewodu pokarmowego (np. krwawiący wrzód dwunastnicy). Krwawienie z górnego odcinka charakteryzuje się trawieniem i resorpcją białek krwi w jelicie cienkim, co skutkuje dysproporcjonalnym wzrostem azotu mocznika względem kreatyniny (stosunek BUN/kreatynina > 30 lub mocznik/kreatynina w mmol > 100), co stanowi bezwzględne wskazanie do pilnej gastroskopii."
      }
    ],
    flashcards: [
      { q: "Jaka jest najczęstsza przyczyna masywnego, bezbolesnego krwawienia z dolnego odcinka (LGIB)?", a: "Krwawienie z uchyłków jelita grubego (pęknięcie vasa recta na kopule uchyłka) oraz angiodysplazje.", cat: "Chirurgia" },
      { q: "Jaki jest pierwszy krok postępowania u pacjenta z krwawieniem z przewodu pokarmowego i hipotonią?", a: "Natychmiastowa resuscytacja hemodynamiczna (2 grube kaniule, krystaloidy, próba krzyżowa krwi).", cat: "Chirurgia" },
      { q: "Kiedy krew z odbytu (hematochezja) pochodzi z górnego odcinka (UGIB)?", a: "Przy masywnym krwotoku (wrzód) z szybkim pasażem, niestabilnością krążenia i stosunkiem BUN/kreatynina > 30.", cat: "Chirurgia" },
      { q: "Jakie badanie obrazowe lokalizuje aktywne krwawienie z uchyłka u niestabilnego chorego?", a: "Angio-TK jamy brzusznej (wykrywa krwawienie >0.3–0.5 mL/min).", cat: "Chirurgia" },
      { q: "Jaka metoda zabiegowa jest leczeniem z wyboru przy krwawieniu uchyłkowym w Angio-TK?", a: "Selektywna mikroembolizacja angiograficzna (TAE) przez radiologa zabiegowego.", cat: "Chirurgia" }
    ]
  },

  // 136: Ropień i przetoka odbytu
  {
    id: 136,
    filename: "136_ropien_i_przetoka_odbytu.json",
    dept: "Chirurgia",
    shortTitle: "42-letni mężczyzna – Ostry, pulsujący ból okolicy odbytu nasilający się przy siadaniu i gorączka (Ropień okołoodbytowy)",
    diagnosisTitle: "Ostre zapalenie krypt odbytu z uformowaniem ropnia okołoodbytowego (Abscessus perianalis) i wtórną przetoką odbytu (Fistula perianalis)",
    vitals: [
      { label: "HR", val: "96/min", sub: "Prawidłowa / ból", status: "ok" },
      { label: "BP", val: "128/78 mmHg", sub: "Prawidłowe", status: "ok" },
      { label: "SpO2", val: "99%", sub: "Prawidłowa", status: "ok" },
      { label: "RR", val: "18/min", sub: "Prawidłowa", status: "ok" },
      { label: "Temp", val: "38.4°C", sub: "Gorączka", status: "warn" }
    ],
    vitalsObj: { hr: 96, bp: "128/78", spo2: 96, rr: 18, temp: 38.4 },
    story: "42-letni mężczyzna, pracownik biurowy, zgłosił się do ambulatorium chirurgicznego z powodu silnego, pulsującego bólu w okolicy odbytu trwającego od 3 dni. Ból narastał stopniowo, uniemożliwia choremu siadanie na krześle, znacznie nasila się podczas defekacji i kaszlu, a od wczoraj towarzyszy mu gorączka 38.4°C z uczuciem rozbicia. Pacjent przez 2 dni stosował maści przeciw chorobie hemoroidalnej z hydrokortyzonem bez jakiejkolwiek poprawy. W badaniu proktologicznym w ułożeniu na boku (lub pozycji kolankowo-łokciowej): w odległości 2.5 cm od brzegu odbytu na godzinie 5 widoczne jest żywoczerwone, wzmożone ucieplone, ostro bolesne uwypuklenie o średnicy 4 cm z obecnością chełbotania w części centralnej (objaw dodatni). Badanie per rectum ze względu na silną bolesność wykonano z zachowaniem ostrożności – wyczuwalne bolesne uwypuklenie ściany kanału odbytu na tej samej wysokości, zwieracz odbytu o wzmożonym napięciu spastycznym.",
    labs: [
      {
        category: "Morfologia i parametry ostrej fazy",
        items: [
          { name: "Leukocyty (WBC)", val: "15.2 G/L z neutrofilią (78%)", norm: "4.0–10.0 G/L", flag: "H" },
          { name: "CRP", val: "68 mg/L", norm: "< 5.0 mg/L", flag: "H" },
          { name: "Glukoza we krwi na czczo", val: "96 mg/dL (wykluczenie nierozpoznanej cukrzycy)", norm: "70–99 mg/dL", flag: "N" },
          { name: "Kreatynina surowicy", val: "0.85 mg/dL", norm: "0.70–1.20 mg/dL", flag: "N" }
        ]
      },
      {
        category: "Posiew ropy i mikrobiologia",
        items: [
          { name: "Posiew treści ropnej pobranej śródoperacyjnie", val: "Flora mieszana jelitowa: Escherichia coli, Bacteroides fragilis, Enterococcus faecalis", norm: "Jałowy", flag: "H" },
          { name: "Ocena pod kątem zgorzeli Fourniera", val: "Brak trzeszczenia podskórnego, brak martwicy powięzi krocza i moszny", norm: "Brak zgorzeli", flag: "N" }
        ]
      },
      {
        category: "Diagnostyka obrazowa (w przypadkach powikłanych)",
        items: [
          { name: "USG przezodbytnicze (EAUS / TRUS)", val: "Hipoechogenny zbiornik płynowy w przestrzeni podskórnej i międzyzwieraczowej odpowiadający ropniowi okołoodbytowemu", norm: "Prawidłowy aparat zwieraczowy", flag: "H" },
          { name: "MR miednicy mniejszej (ocena przetoki)", val: "Wskazany planowo po wygojeniu ropnia przy podejrzeniu przetoki złożonej", norm: "Prawidłowy", flag: "N" }
        ]
      }
    ],
    steps: [
      {
        num: 1,
        title: "Etiopatogeneza ropni odbytu: teoria kryptogendowa Parksa",
        task: "Co jest pierwotnym punktem wyjścia i przyczyną rozwoju ponad 90% ropni i przetok okołoodbytowych?",
        options: [
          { text: "Zakażenie i zatkanie gruczołów odbytowych uchodzących do krypt Morgagniego na linii grzebieniastej (teoria kryptogendowa Parksa)", correct: true, feedback: "Prawidłowo! Zgodnie z teorią kryptogendową Parksa, zakażenie rozpoczyna się w gruczołach odbytowych (proctodeal glands) leżących w przestrzeni międzyzwieraczowej i uchodzących do krypt na linii zębatej. Zablokowanie ujścia krypty prowadzi do namnażania flory jelitowej i szerzenia się ropy wzdłuż przestrzeni anatomicznych krocza." },
          { text: "Ukąszenie przez kleszcza", correct: false, feedback: "Brak związku." },
          { text: "Ciało obce w żołądku", correct: false, feedback: "Ropa powstaje w kryptach odbytu." },
          { text: "Wrodzony brak zwieracza zewnętrznego odbytu", correct: false, feedback: "Błąd anatomiczny." }
        ]
      },
      {
        num: 2,
        title: "Kardynalna zasada chirurgiczna: nacięcie i drenaż",
        task: "Jakie jest postępowanie lecznicze z wyboru u pacjenta ze stwierdzonym chełboczącym ropniem okołoodbytowym?",
        options: [
          { text: "Pilne chirurgiczne nacięcie i drenaż ropnia w znieczuleniu (miejscowym/ogólnym/przewodowym) – antybiotykoterapia bez nacięcia jest BEZWZGLĘDNYM BŁĘDEM!", correct: true, feedback: "Znakomicie! 'Ubi pus, ibi evacua' (gdzie ropa, tam opróżnij). Leczenie ropnia odbytu jest wyłącznie CHIRURGICZNE: szerokie nacięcie (często z wycięciem rąbka skóry – odbarczenie), zerwanie przegród i drenaż. Stosowanie samej antybiotykoterapii bez drenażu jest błędem sztuki, prowadzącym do rozprzestrzeniania się ropy w przestrzeni kulszowo-odbytowej i sepsy!" },
          { text: "Monoterapia doustną amoksycyliną przez 14 dni bez zabiegu", correct: false, feedback: "Kardynalny błąd proktologiczny!" },
          { text: "Smarowanie maściami ze sterydami", correct: false, feedback: "Sterydy miejscowe tłumią odporność i nasilają ropowicę." },
          { text: "Zalecenie nasiadówek z kory dębu jako jedynego leczenia", correct: false, feedback: "Nasiadówki nie zastąpią nacięcia chirurgicznego." }
        ]
      },
      {
        num: 3,
        title: "Zagrożenie powikłaniem piorunującym: Zgorzel Fourniera",
        task: "Jakie piorunujące, zagrażające życiu powikłanie martwicze tkanek krocza i moszny może rozwinąć się z nieleczonego ropnia odbytu, szczególnie u chorych z cukrzycą lub immunosupresją?",
        options: [
          { text: "Zgorzel Fourniera (martwicze zapalenie powięzi krocza i narządów płciowych - necrotizing fasciitis)", correct: true, feedback: "Dokładnie tak! Zgorzel Fourniera to piorunujące martwicze zakażenie powięzi krocza wywołane florą beztlenową i tlenową. Objawia się trzeszczeniem podskórnym (gaz w tkankach), zasinieniem skóry, wstrząsem septycznym i śmiertelnością sięgającą 20–40%. Wymaga natychmiastowego, radykalnego wycięcia tkanek martwiczych (necrosectomia) na bloku operacyjnym!" },
          { text: "Choroba Hirschsprunga", correct: false, feedback: "To wrodzona wada unerwienia jelita u noworodków." },
          { text: "Rak drobnokomórkowy płuca", correct: false, feedback: "Brak związku." },
          { text: "Polipowatość rodzinna FAP", correct: false, feedback: "Choroba uwarunkowana genetycznie (mutacja APC)." }
        ]
      },
      {
        num: 4,
        title: "Związek ropnia z przetoką odbytu (Fistula in ano)",
        task: "Jaki odsetek pacjentów po nacięciu i drenażu ostrego ropnia odbytu rozwija w kolejnych miesiącach przewlekłą przetokę odbytu?",
        options: [
          { text: "Około 30–50% pacjentów (przetoka stanowi przewlekłą fazę tej samej choroby kryptogendowej)", correct: true, feedback: "Bardzo ważny fakt proktologiczny! Ropień i przetoka odbytu to dwie fazy tego samego procesu: faza ostra (ropień) i faza przewlekła (przetoka). U 1/3 do 1/2 chorych po zagojeniu nacięcia skóry pozostaje kanał przetoki łączący zakażoną kryptę (ujście wewnętrzne) ze skórą krocza (ujście zewnętrzne), z którego okresowo sączy się treść ropna." },
          { text: "0% – po nacięciu ropnia przetoka nigdy nie powstaje", correct: false, feedback: "Błąd – przetoka powstaje u niemal połowy chorych." },
          { text: "Dokładnie 100% u każdego pacjenta", correct: false, feedback: "U części chorych ropień goi się całkowicie." },
          { text: "Przetoka dotyczy wyłącznie osób palących cygara", correct: false, feedback: "Brak związku." }
        ]
      },
      {
        num: 5,
        title: "Reguła Goodsalla w określaniu przebiegu kanału przetoki",
        task: "Na czym polega chirurgiczna reguła Goodsalla stosowana do przewidywania przebiegu kanału przetoki odbytu na podstawie położenia jej ujścia zewnętrznego?",
        options: [
          { text: "Przetoki z ujściem zewnętrznym leżącym do tyłu od linii poprzecznej odbytu biegną łukowato do tylnej linii pośrodkowej na godz. 6, natomiast przetoki z ujściem do przodu biegną prostoliniowo promieniście do najbliższej krypty", correct: true, feedback: "Znakomicie! Klasyczna reguła Goodsalla: ujście zewnętrzne z tyłu od linii poprzecznej odbytu -> kanał zakrzywiony do krypty tylnej (godzina 6); ujście z przodu od linii poprzecznej -> kanał prosty radialny. Wyjątkiem są ujścia przednie leżące dalej niż 3 cm od brzegu odbytu (które często biegną łukowato do tyłu)." },
          { text: "Każda przetoka biegnie zawsze pionowo ku górze do wątroby", correct: false, feedback: "Błąd anatomiczny." },
          { text: "Reguła Goodsalla dotyczy wyłącznie przetok oskrzelowo-płucnych", correct: false, feedback: "To reguła czysto proktologiczna." },
          { text: "Wszystkie przetoki łączą się z pęcherzem moczowym", correct: false, feedback: "To cecha przetoki pęcherzowej, nie prostej przetoki odbytu." }
        ]
      },
      {
        num: 6,
        title: "Klasyfikacja przetok wg Parksa a ryzyko nietrzymania stolca",
        task: "W zależności od stosunku kanału przetoki do mięśnia zwieracza zewnętrznego odbytu (klasyfikacja Parksa), dlaczego proste przecięcie kanału przetoki (fistulotomia) jest przeciwwskazane w przetokach wysokich (przezzwieraczowych i nadzwieraczowych)?",
        options: [
          { text: "Przecięcie dużej części mięśnia zwieracza zewnętrznego odbytu grozi nieodwracalnym, trwałym nietrzymaniem stolca i gazów (inkontynencją)", correct: true, feedback: "Kluczowa zasada bezpieczeństwa proktologicznego! W przetokach niskich podśluzówkowych/podskórnych fistulotomia jest bezpieczna. W przetokach wysokich (obejmujących >30% zwieracza zewnętrznego) proste przecięcie zniszczy aparat zwieraczowy i wywoła kałowe nietrzymanie. Stosuje się metody oszczędzające zwieracze: luźny seton (dren nitkowy), płat przesunięty (advancement flap), klej fibrynowy, laser (FiLaC) lub LIFT (podwiązanie kanału w przestrzeni międzyzwieraczowej)." },
          { text: "Ponieważ przecięcie zwieracza wywołuje zaparcia", correct: false, feedback: "Przeciwnie – wywołuje nietrzymanie stolca!" },
          { text: "Zwieracze odbytu nie mają znaczenia dla trzymania stolca", correct: false, feedback: "To fundamentalny mięsień trzymania stolca." },
          { text: "Fistulotomia jest zakazana u mężczyzn", correct: false, feedback: "Brak zróżnicowania płciowego." }
        ]
      },
      {
        num: 7,
        title: "Diagnostyka chorób zapalnych jelit (Choroba Leśniowskiego-Crohna)",
        task: "U młodego pacjenta z nawracającymi, mnogimi, złożonymi przetokami odbytu ze szczelinami i wyciekiem ropnym, jaką chorobę zapalną jelit należy bezwzględnie wykluczyć?",
        options: [
          { text: "Chorobę Leśniowskiego-Crohna (postać okołoodbytową)", correct: true, feedback: "Bardzo ważny punkt LEK! Zmiany okołoodbytowe (mnogie nietypowe przetoki, ropnie, owrzodzenia, przerośnięte fałdy skórne) występują u około 30–40% chorych z chorobą Leśniowskiego-Crohna i mogą wyprzedzać objawy jelitowe o wiele miesięcy. Wskazana jest pełna kolonoskopia z oceną jelita krętego!" },
          { text: "Celiakię", correct: false, feedback: "Celiakia to enteropatia jelita cienkiego, nie wywołuje przetok odbytu." },
          { text: "Chorobę refluksową przełyku (GERD)", correct: false, feedback: "Brak związku." },
          { text: "Zespół jelita drażliwego (IBS)", correct: false, feedback: "IBS to choroba czynnościowa bez zmian organicznych i bez przetok." }
        ]
      },
      {
        num: 8,
        title: "Zastosowanie antybiotykoterapii po drenażu ropnia",
        task: "Czy u młodego, zdrowego pacjenta bez chorób towarzyszących po prawidłowym nacięciu i zdrenowaniu prostego ropnia okołoodbytowego konieczne jest rutynowe stosowanie antybiotykoterapii ogólnej?",
        options: [
          { text: "NIE – u pacjentów immunokompetentnych bez cech uogólnionego zakażenia prawidłowy drenaż chirurgiczny jest całkowicie wystarczający; antybiotyki rezerwuje się dla chorych z sepsą, rozległym zapaleniem tkanek miękkich (cellulitis), cukrzycą, neutropenią lub sztucznymi zastawkami serca", correct: true, feedback: "Znakomicie! Wytyczne proktologiczne (ASCRS) podkreślają: u chorych bez obciążeń nacięcie i drenaż są samowystarczalne. Antybiotykoterapia po drenażu jest wskazana przy: rozległym odczynie zapalnym skóry (cellulitis), cukrzycy, immunosupresji, sepsie oraz profilaktyce IZW u pacjentów z protezami zastawek serca." },
          { text: "Tak – każdy pacjent musi przyjmować 3 antybiotyki przez 6 miesięcy", correct: false, feedback: "Błąd – nieuzasadnione narażenie na lekooporność i C. difficile." },
          { text: "Antybiotyki podaje się wyłącznie w postaci wlewek doodbytniczych z miodem", correct: false, feedback: "Bzdura medyczna." },
          { text: "Antybiotyki stosuje się zamiast operacji", correct: false, feedback: "To błąd sztuki." }
        ]
      }
    ],
    pathoNodes: [
      {
        title: "1. Zakażenie krypt i gruczołów odbytowych (kryptogendowe)",
        desc: "Zaczopowanie ujścia gruczołu w krypcie Morgagniego na linii zębatej prowadzi do namnażania bakterii jelitowych (beztlenowce, E. coli) i powstania pierwotnego ogniska ropnego w przestrzeni międzyzwieraczowej.",
        drugTarget: "Prawidłowa higiena wypróżnień i unikanie przewlekłych zaparć/biegunek"
      },
      {
        title: "2. Propagacja ropy i formowanie ropnia okołoodbytowego",
        desc: "Ropa penetruje wzdłuż powięzi ku dołowi (ropień podskórny/okołoodbytowy), ku bokowi (ropień kulszowo-odbytowy) lub ku górze (ropień podśluzówkowy lub naddźwigaczowy), wywołując silny ból pulsujący i chełbotanie.",
        drugTarget: "PILNE chirurgiczne nacięcie i drenaż ropnia (odbarczenie ciśnienia zapobiegające martwicy tkanek)"
      },
      {
        title: "3. Przetrwały kanał przetoki odbytu (Fistula in ano)",
        desc: "Niewygaszone zakażenie gruczołu w krypcie (ujście wewnętrzne) utrzymuje przetokę komunikującą się ze skórą (ujście zewnętrzne), wymagając planowego leczenia oszczędzającego zwieracze.",
        drugTarget: "Zabiegi oszczędzające zwieracze: luźny seton drenujący, metoda LIFT, płat przesuwalny"
      }
    ],
    dutySummary: "Ropień okołoodbytowy to pulsujący ból odbytu, chełbotanie i gorączka (źródło w zakażonych kryptach Morgagniego). Leczeniem z wyboru jest PILNE CHIRURGICZNE NACIĘCIE I DRENAŻ (antybiotyki bez nacięcia to błąd!). U cukrzyków wyklucz zgorzel Fourniera. Po drenażu u 30–50% powstaje przetoka odbytu. Przetoki wysokie wymagają metod oszczędzających zwieracze (seton, LIFT), aby zapobiec nietrzymaniu stolca. Mnogie przetoki budzą podejrzenie choroby Leśniowskiego-Crohna.",
    diffTable: [
      { disease: "Zakrzepica splotu okołoodbytowego (zakrzep brzeżny)", diff: "Nagły, siny, twardy guzek na brzegu odbytu po wysiłku/zaparciu, brak chełbotania i brak gorączki, ból ostry bez uogólnionego odczynu zapalnego.", test: "Badanie proktologiczne (siny zakrzep vs chełboczący ropień), brak leukocytozy." },
      { disease: "Szczelina odbytu (fissura ani)", diff: "Ostry, piekący ból 'jak cięcie żyletką' podczas defekacji z kroplą świeżej krwi na stolcu; widoczne pęknięcie anodermy w linii środkowej tylnej, brak guza i chełbotania.", test: "Oglądanie anodermy (linijne pęknięcie), brak zbiornika płynowego w USG." },
      { disease: "Zgorzel Fourniera", diff: "Piorunujące martwicze zapalenie powięzi krocza, trzeszczenie podskórne (gaz), czarne plamy martwicy, wstrząs septyczny, konieczność pilnej nekrosektomii.", test: "Badanie fizykalne krocza (trzeszczenie gazu, martwica skóry), stan ogólny." },
      { disease: "Torbiel włosowa (pilonidalis)", diff: "Ropień zlokalizowany wyżej, w szparze pośladkowej nad kością krzyżową/guziczną, zawiera wrastające włosy; kanał odbytu jest wolny od zmian.", test: "Lokalizacja anatomiczna (szpara pośladkowa vs brzeg odbytu)." }
    ],
    lekQuestions: [
      {
        question: "40-letni mężczyzna zgłosił się z powodu silnego, pulsującego bólu w okolicy odbytu trwającego od 3 dni, gorączki 38.5°C i trudności z siadaniem. W badaniu fizykalnym stwierdzono bolesne, zaczerwienione uwypuklenie z chełbotaniem na brzegu odbytu. Prawidłowym postępowaniem z wyboru jest:",
        options: [
          "Pilne chirurgiczne nacięcie i drenaż ropnia w znieczuleniu.",
          "Zastosowanie doustnej ciprofloksacyny przez 14 dni bez interwencji chirurgicznej.",
          "Miejscowe stosowanie czopków z hydrokortyzonem.",
          "Wykonanie pilnej sigmoidoskopii z biopsją.",
          "Zalecenie wyłącznie ciepłych kąpieli nasiadowych z rumianku."
        ],
        correct: 0,
        explanation: "Obecność chełboczącego ropnia okołoodbytowego jest bezwzględnym wskazaniem do natychmiastowego nacięcia chirurgicznego i drenażu w znieczuleniu. Podstawową zasadą chirurgiczną w obecności zbiornika ropy jest jego ewakuacja ('ubi pus, ibi evacua'). Stosowanie samej antybiotykoterapii bez drenażu jest postępowaniem błędnym, grożącym szerzeniem się ropnia do przestrzeni kulszowo-odbytniczej i rozwojem sepsy lub zgorzeli Fourniera."
      },
      {
        question: "Na czym polega teoria kryptogendowa Parksa wyjaśniająca patogenezę większości ropni i przetok odbytu?",
        options: [
          "Zakażenie rozpoczyna się w gruczołach odbytowych uchodzących do krypt Morgagniego na linii grzebieniastej i szerzy się wzdłuż przestrzeni powięziowych krocza.",
          "Przetoki powstają wyłącznie w wyniku bezpośredniego urazu mechanicznego kości miednicy.",
          "Jest to proces autoimmunologiczny wywołany przeciwciałami przeciwko keratynie.",
          "Wynika z wrodzonego zarośnięcia odbytnicy.",
          "Jest to powikłanie wyłącznie nieleczonej rzeżączki."
        ],
        correct: 0,
        explanation: "Według powszechnie akceptowanej teorii kryptogendowej Parksa, ponad 90% ropni i przetok odbytu wywodzi się z zakażenia gruczołów odbytowych (proctodeal glands) leżących w przestrzeni międzyzwieraczowej. Zatkanie ujścia gruczołu w krypcie Morgagniego (na poziomie linii zębatej) prowadzi do namnażania bakterii flory jelitowej, formowania ropnia i jego penetracji do przestrzeni podskórnej lub kulszowo-odbytowej."
      },
      {
        question: "Dlaczego proste przecięcie kanału przetoki (fistulotomia) jest przeciwwskazane w leczeniu przetok odbytu o wysokim przebiegu przezzwieraczowym lub nadzwieraczowym?",
        options: [
          "Ponieważ przecięcie dużej części mięśnia zwieracza zewnętrznego odbytu grozi trwałym nietrzymaniem stolca i gazów.",
          "Z powodu braku gojenia się ran w obrębie anodermy.",
          "Ponieważ fistulotomia wywołuje natychmiastowe zwężenie odźwiernika żołądka.",
          "Z uwagi na ryzyko rozwoju czerniaka złośliwego w bliźnie.",
          "Jest to zabieg zabroniony ze względów anestezjologicznych."
        ],
        correct: 0,
        explanation: "Proste rozcięcie kanału przetoki (fistulotomia) w przetokach obejmujących znaczną część (>30%) mięśnia zwieracza zewnętrznego odbytu prowadzi do nieodwracalnego uszkodzenia aparatu zwieraczowego i jatrogennego nietrzymania stolca (fecal incontinence). W przetokach wysokich konieczne jest stosowanie technik oszczędzających zwieracze (np. luźny seton drenujący, metoda LIFT, płat przesuwalny)."
      }
    ],
    flashcards: [
      { q: "Co jest przyczyną większości ropni okołoodbytowych wg teorii Parksa?", a: "Zakażenie i zatkanie gruczołów odbytowych uchodzących do krypt Morgagniego na linii zębatej.", cat: "Chirurgia" },
      { q: "Jakie jest leczenie z wyboru ropnia okołoodbytowego?", a: "Pilne chirurgiczne nacięcie i drenaż w znieczuleniu (antybiotykoterapia bez nacięcia to błąd!).", cat: "Chirurgia" },
      { q: "Czym jest zgorzel Fourniera?", a: "Piorunującym martwiczym zapaleniem powięzi krocza i moszny o wysokiej śmiertelności (wymaga pilnej nekrosektomii).", cat: "Chirurgia" },
      { q: "Jaki odsetek ropni odbytu przekształca się w przewlekłą przetokę odbytu?", a: "Około 30–50% pacjentów.", cat: "Chirurgia" },
      { q: "Dlaczego w przetokach wysokich przezzwieraczowych nie wykonuje się fistulotomii?", a: "Przecięcie zwieracza zewnętrznego grozi trwałym nietrzymaniem stolca i gazów (inkontynencją).", cat: "Chirurgia" }
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
  console.log('Batch 133-136 finished successfully.');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});

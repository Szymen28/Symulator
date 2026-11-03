const fs = require('fs');
const { encryptStringAes } = require('./encrypt_case.js');
const PASSWORD = '@LEKSzymon28111999';

const cases = [
  // 147: Zespół podkradania tętnicy podobojczykowej
  {
    id: 147,
    filename: "147_zespol_podkradania_tetnicy_podobojczykowej.json",
    dept: "Chirurgia",
    shortTitle: "62-letni stolarz – Zawroty głowy, widzenie podwójne i osłabienie lewej ręki podczas pracy fizycznej z uniesionymi ramionami (Subclavian Steal)",
    diagnosisTitle: "Zespół podkradania tętnicy podobojczykowej lewej (Subclavian Steal Syndrome - SSS) z odwróceniem przepływu w lewej tętnicy kręgowej",
    vitals: [
      { label: "HR", val: "72/min", sub: "Miarowy", status: "ok" },
      { label: "BP (prawe ramię)", val: "148/88 mmHg", sub: "Prawidłowe/nadciśnienie łagodne", status: "ok" },
      { label: "BP (lewe ramię)", val: "108/64 mmHg", sub: "Asymetria ciśnień = 40 mmHg!", status: "bad" },
      { label: "SpO2", val: "97%", sub: "Prawidłowa", status: "ok" },
      { label: "Temp", val: "36.6°C", sub: "Prawidłowa", status: "ok" }
    ],
    vitalsObj: { hr: 72, bp: "148/88", spo2: 97, rr: 16, temp: 36.6 },
    story: "62-letni mężczyzna, stolarz, palacz tytoniu od 30 lat, zgłasza nawracające od kilku miesięcy epizody silnych zawrotów głowy, niestabilności chodu, widzenia podwójnego (diplopia) i szumów usznych. Zauważył, że dolegliwości te pojawiają się niemal wyłącznie w trakcie intensywnej pracy fizycznej lewą ręką (np. piłowanie drewna, wbijanie gwoździ ponad głową), której towarzyszy szybkie zmęczenie i bolesność lewego przedramienia. Po opuszczeniu ręki i odpoczynku objawy ustępują w ciągu kilku minut. W badaniu fizykalnym: tętno na lewej tętnicy promieniowej i ramiennej jest wyraźnie słabsze i opóźnione w stosunku do tętna na prawej kończynie górnej. Ciśnienie skurczowe na prawym ramieniu wynosi 148 mmHg, a na lewym zaledwie 108 mmHg (różnica 40 mmHg). Osłuchowo słyszalny szmer skurczowy w lewym dole nadobojczykowym.",
    labs: [
      {
        category: "Badania ultrasonograficzne naczyń dogłowowych (Doppler CITO)",
        items: [
          { name: "Przepływ w lewej tętnicy kręgowej (Vertebral Artery)", val: "Całkowite odwrócenie kierunku przepływu krwi (przepływ wsteczny / odgłowowy w stronę tętnicy podobojczykowej)", norm: "Przepływ dogłowowy (antegrade)", flag: "H" },
          { name: "Próba mankietowa (reaktywne przekrwienie lewego ramienia)", val: "Nasilenie przepływu wstecznego w lewej tętnicy kręgowej po zwolnieniu mankietu ciśnieniomierza na ramieniu", norm: "Brak wpływu", flag: "H" },
          { name: "Tętnica kręgowa prawa", val: "Poszerzona, przyspieszony przepływ kompensacyjny dogłowowy", norm: "Prawidłowy", flag: "N" }
        ]
      },
      {
        category: "Angiografia tomografii komputerowej (Angio-TK łuku aorty)",
        items: [
          { name: "Pień lewej tętnicy podobojczykowej", val: "Wysokiego stopnia, 90% zwężenie miażdżycowe odcinka przedkręgowego (proksymalnego do odejścia tętnicy kręgowej lewej). Dystalny odcinek tętnicy wypełnia się wstecznie od lewej tętnicy kręgowej", norm: "Naczynie drożne", flag: "H" },
          { name: "Koło tętnicze Willisa w TK", val: "Prawidłowo wykształcone, drożne tętnice łączące tylne i przednie", norm: "Prawidłowa anatomia", flag: "N" }
        ]
      },
      {
        category: "Profil lipidowy i biochemiczny",
        items: [
          { name: "Cholesterol LDL", val: "162 mg/dL", norm: "< 55 mg/dL", flag: "H" },
          { name: "Kreatynina / Glikemia", val: "0.9 mg/dL / 98 mg/dL", norm: "0.7–1.2 / 70–99", flag: "N" }
        ]
      }
    ],
    steps: [
      {
        num: 1,
        title: "Hemodynamiczny mechanizm 'podkradania'",
        task: "Na czym polega zjawisko hemodynamiczne zespołu podkradania tętnicy podobojczykowej (Subclavian Steal Syndrome)?",
        options: [
          { text: "Ciężkie zwężenie lub niedrożność tętnicy podobojczykowej proksymalnie do odejścia tętnicy kręgowej powoduje spadek ciśnienia dystalnie od przeszkody; podczas pracy kończyny górnej krew jest 'zasysana' wstecznie z koła Willisa przez tętnicę kręgową do naczynia ramiennego, wywołując niedokrwienie pnia mózgu i móżdżku", correct: true, feedback: "Prawidłowo! To klasyczny mechanizm podkradania: tętnica kręgowa tożstronna zamiast doprowadzać krew do pnia podstawnego mózgu, odwraca kierunek przepływu (retrograde flow) i zasila pracującą kończynę górną. Powoduje to objawy niedokrwienia tylnego dołu czaszki (układu kręgowo-podstawnego)." },
          { text: "Tętnica podobojczykowa uciska mechanicznie rdzeń kręgowy w szyi", correct: false, feedback: "Nie ma takiego ucisku." },
          { text: "Krew z serca omija płuca przez przetrwały otwór owalny", correct: false, feedback: "To przeciek wewnątrzsercowy (PFO), nie SSS." },
          { text: "Serce zatrzymuje się przy uniesieniu ręki", correct: false, feedback: "Absurd." }
        ]
      },
      {
        num: 2,
        title: "Kluczowa cecha w badaniu fizykalnym",
        task: "Jakie proste badanie przyłóżkowe budzi natychmiastowe podejrzenie zwężenia tętnicy podobojczykowej?",
        options: [
          { text: "Pomiar ciśnienia tętniczego na OBU ramionach – stwierdzenie asymetrii ciśnienia skurczowego przekraczającej 15–20 mmHg (często >30–40 mmHg) oraz osłabienie tętna na kończynie z niższym ciśnieniem", correct: true, feedback: "Prawidłowo! Zgodnie z wytycznymi naczyniowymi i kardiologicznymi, rutynowy pomiar ciśnienia na obu ramionach jest obowiązkowy. Różnica SBP >15-20 mmHg wskazuje na istotne zwężenie tętnicy podobojczykowej lub pnia ramienno-głowowego (lub rozwarstwienie aorty)." },
          { text: "Opukiwanie klatki piersiowej młoteczkiem neurologicznym", correct: false, feedback: "Nie daje żadnych informacji naczyniowych." },
          { text: "Próba palec-nos przy zamkniętych oczach", correct: false, feedback: "Bada móżdżek, ale nie wykaże zwężenia tętnicy podobojczykowej." },
          { text: "Pomiar obwodu głowy taśmą centymetrową", correct: false, feedback: "Brak wartości u dorosłego." }
        ]
      },
      {
        num: 3,
        title: "Spektrum objawów neurologicznych (zespół kręgowo-podstawny)",
        task: "Jakie objawy kliniczne ze strony ośrodkowego układu nerwowego wywołuje 'podkradanie' krwi z krążenia mózgowego?",
        options: [
          { text: "Zawroty głowy pochodzenia ośrodkowego (vertigo), niestabilność chodu (ataksja), widzenie podwójne (diplopia), oczopląs, zamglone widzenie, szumy uszne i nagłe upadki bez utraty przytomności (tzw. drop attacks)", correct: true, feedback: "Prawidłowo! To klasyczne objawy niedokrwienia unaczynienia kręgowo-podstawnego (vertebrobasilar insufficiency): móżdżek odpowiada za równowagę i koordynację, jądra nerwów czaszkowych w pniu mózgu – za ruchy gałek ocznych i słuch." },
          { text: "Afazja czuciowa Wernickego i całkowity paraliż połowiczy", correct: false, feedback: "Cechuje zawał w zakresie tętnicy środkowej mózgu (MCA) z krążenia przedniego." },
          { text: "Utrata węchu i smaku w obu nozdrzach", correct: false, feedback: "Nietypowe." },
          { text: "Omamy wzrokowe i słuchowe o treści religijnej", correct: false, feedback: "Objawy psychotyczne." }
        ]
      },
      {
        num: 4,
        title: "Zjawisko podkradania wieńcowo-podobojczykowego (Coronary-Subclavian Steal)",
        task: "Do jakiego groźnego zjawiska może dojść u pacjenta ze zwężeniem lewej tętnicy podobojczykowej, który przebył pomostowanie aortalno-wieńcowe z użyciem lewej tętnicy piersiowej wewnętrznej (LIMA-LAD bypass)?",
        options: [
          { text: "Do podkradania wieńcowo-podobojczykowego: krew z tętnicy międzykomorowej przedniej (LAD) serca cofa się przez pomost LIMA do lewej ręki, wywołując dławicę piersiową lub zawał serca podczas wysiłku lewego ramienia", correct: true, feedback: "Prawidłowo! Tętnica piersiowa wewnętrzna (LIMA) odchodzi od tętnicy podobojczykowej. Gdy tętnica podobojczykowa jest zwężona u odejścia, a chory wykonuje pracę lewą ręką, spadek oporu obwodowego powoduje odwrócenie przepływu w pomoście LIMA – serce traci krew na rzecz ramienia (zespół podkradania wieńcowo-podobojczykowego)!" },
          { text: "Do natychmiastowego pęknięcia serca", correct: false, feedback: "Zbyt drastyczne; dochodzi do niedokrwienia i dławicy." },
          { text: "Do samoistnego rozpuszczenia blaszek miażdżycowych", correct: false, feedback: "Brak takiego mechanizmu." },
          { text: "Do trwałego braku tętna na prawej nodze", correct: false, feedback: "Nie dotyczy kończyn dolnych." }
        ]
      },
      {
        num: 5,
        title: "Złoty standard diagnostyki ultrasonograficznej",
        task: "Co stwierdza się w badaniu USG Doppler tętnic dogłowowych w pełnym zespole podkradania tętnicy podobojczykowej?",
        options: [
          { text: "Całkowity ciągły odwrócony przepływ krwi w tożstronnej tętnicy kręgowej (krew płynie w dół szyi), który dodatkowo ulega przyspieszeniu po teście reaktywnego przekrwienia ramienia (próba mankietowa)", correct: true, feedback: "Prawidłowo! W badaniu dopplerowskim ocenia się kierunek fali: przepływ w tętnicy kręgowej jest w pełni odwrócony (retrograde). W postaciach łagodniejszych obserwuje się obraz 'królika' (bunny waveform) lub przepływ naprzemienny, a w pełnym zespole – stały przepływ wsteczny." },
          { text: "Całkowity brak jakichkolwiek naczyń krwionośnych w szyi", correct: false, feedback: "Absurd." },
          { text: "Obecność powietrza w świetle tętnicy szyjnej", correct: false, feedback: "To odma/zator powietrzny." },
          { text: "Żyłę wrotną biegnącą przez ucho", correct: false, feedback: "Niedorzeczne." }
        ]
      },
      {
        num: 6,
        title: "Leczenie inwazyjne z wyboru – Angioplastyka ze stentem (PTA / Stenting)",
        task: "Jaka metoda leczenia zabiegowego jest obecnie postępowaniem pierwszego wyboru w objawowym zwężeniu tętnicy podobojczykowej?",
        options: [
          { text: "Przezskórna angioplastyka balonowa ze wszczepieniem stentu (PTA + stent) do odcinka przedkręgowego tętnicy podobojczykowej", correct: true, feedback: "Prawidłowo! Zabieg wewnątrznaczyniowy (endovascular stenting) tętnicy podobojczykowej charakteryzuje się bardzo wysoką skutecznością pierwotną (>95%), niskim odsetkiem powikłań i krótką hospitalizacją. Jest metodą z wyboru u zdecydowanej większości chorych." },
          { text: "Klasyczna torakotomia otwarta z wycięciem łuku aorty", correct: false, feedback: "Zabieg o skrajnej inwazyjności, niestosowany w izolowanym zwężeniu." },
          { text: "Amputacja lewej kończyny górnej w stawie ramiennym", correct: false, feedback: "Niedopuszczalne okaleczenie." },
          { text: "Podanie penicyliny krystalicznej przez 3 tygodnie", correct: false, feedback: "Antybiotyk nie leczy miażdżycy." }
        ]
      },
      {
        num: 7,
        title: "Alternatywa chirurgiczna – Pomost szyjno-podobojczykowy (Carotid-Subclavian Bypass)",
        task: "Kiedy i jaki zabieg chirurgii otwartej wykonuje się w przypadku niepowodzenia leczenia wewnątrznaczyniowego tętnicy podobojczykowej?",
        options: [
          { text: "Pozaklatkowy pomost omijający szyjno-podobojczykowy (carotid-subclavian bypass) lub transpozycja tętnicy podobojczykowej do tętnicy szyjnej wspólnej z dostępu nadobojczykowego", correct: true, feedback: "Prawidłowo! Zabiegi pozaklatkowe z cięcia nad obojczykiem (bypass szyjno-podobojczykowy z użyciem protezy PTFE/Dacron lub reimplantacja) są bezpieczne, nie wymagają otwierania klatki piersiowej (torakotomii) i charakteryzują się wieloletnią doskonałą drożnością." },
          { text: "Wytworzenie przetoki tętniczo-żylnej Cimino-Brescia", correct: false, feedback: "To dostęp do hemodializ." },
          { text: "Przeszczepienie wątroby", correct: false, feedback: "Brak związku." },
          { text: "Wycięcie tarczycy", correct: false, feedback: "To strumektomia." }
        ]
      },
      {
        num: 8,
        title: "Podsumowanie postępowania i farmakoterapia wspomagająca",
        task: "Jakie leczenie zachowawcze musi otrzymać pacjent po udrożnieniu tętnicy podobojczykowej?",
        options: [
          { text: "Długoterminowe leczenie przeciwpłytkowe (kwas acetylosalicylowy lub klopidogrel), wysokodawkowa statyna (LDL <55 mg/dL), rzucenie palenia tytoniu i kontrola ciśnienia tętniczego", correct: true, feedback: "Prawidłowo! Zwężenie tętnicy podobojczykowej jest manifestacją uogólnionej miażdżycy. Kompleksowa wtórna prewencja sercowo-naczyniowa chroni przed restenozą stentu oraz incydentami wieńcowymi i mózgowymi." },
          { text: "Zakaz uprawiania jakichkolwiek sportów do końca życia", correct: false, feedback: "Po zabiegu chory może w pełni obciążać kończynę." },
          { text: "Doustne żelazo w wysokich dawkach", correct: false, feedback: "Nie ma wskazań." },
          { text: "Odstawienie wszystkich leków", correct: false, feedback: "Doprowadziłoby do ponownego zarośnięcia naczynia." }
        ]
      }
    ],
    pathoNodes: [
      { id: "p1", label: "Blaszka miażdżycowa w tętnicy podobojczykowej", desc: "Zwężenie proksymalne do odejścia a. vertebralis obniża ciśnienie perfuzyjne w ramieniu." },
      { id: "p2", label: "Odwrócenie gradientu ciśnień", desc: "Ciśnienie w tętnicy kręgowej przewyższa ciśnienie w pniu podobojczykowym za zwężeniem." },
      { id: "p3", label: "Podkradanie krwi z koła Willisa", desc: "Wysiłek ręki wywołuje przepływ wsteczny w tętnicy kręgowej, wywołując hipoperfuzję móżdżku i pnia mózgu." }
    ],
    diffTable: [
      { disease: "Zespół podkradania tętnicy podobojczykowej (SSS)", feature: "Asymetria ciśnień na ramionach >20 mmHg, objawy móżdżkowe przy pracy ręką, odwrócony przepływ w USG tętnicy kręgowej" },
      { disease: "Zespół uciskowy górnego otworu klatki (TOS)", feature: "Ucisk splotu ramiennego i naczyń przez żebro szyjne/m. pochyły, objawy czuciowo-ruchowe ręki, brak objawów pniowych" },
      { disease: "Łagodne napadowe położeniowe zawroty głowy (BPPV)", feature: "Krótkie napady wirowania przy zmianie pozycji głowy (próba Dix-Hallpike'a dodatnia), brak asymetrii ciśnienia" },
      { disease: "Choroba Meniere'a", feature: "Triada: epizody zawrotów głowy + postępujący odbiorczy niedosłuch + szum uszny, stałe ciśnienie tętnicze" }
    ],
    dutySummary: "Pacjent 62-letni z objawowym zespołem podkradania lewej tętnicy podobojczykowej (SSS) wywołanym 90% zwężeniem przedkręgowego odcinka tętnicy podobojczykowej, manifestującym się asymetrią ciśnień (różnica 40 mmHg) oraz objawami niedokrwienia pnia mózgu podczas pracy fizycznej lewą ręką. Zakwalifikowany do przezskórnej angioplastyki ze stentem (PTA + stent) z wdrożeniem leczenia przeciwpłytkowego i wysokodawkowej statyny.",
    lekQuestions: [
      {
        question: "W zespole podkradania tętnicy podobojczykowej (Subclavian Steal Syndrome) zwężenie naczynia zlokalizowane jest:",
        options: [
          "W tętnicy podobojczykowej proksymalnie do odejścia tętnicy kręgowej",
          "W tętnicy kręgowej w odcinku śródczaszkowym",
          "W tętnicy podstawnej mózgu",
          "W tętnicy szyjnej wewnętrznej w obrębie syfonu",
          "W tętnicy ramiennej w dole łokciowym"
        ],
        answer: "W tętnicy podobojczykowej proksymalnie do odejścia tętnicy kręgowej",
        explanation: "Warunkiem zaistnienia zjawiska podkradania jest zwężenie lub niedrożność pnia tętnicy podobojczykowej przed odejściem tętnicy kręgowej (odcinek przedkręgowy), co powoduje spadek ciśnienia dystalnie i odwrócenie przepływu w tętnicy kręgowej."
      },
      {
        question: "Który z poniższych objawów klinicznych jest najbardziej charakterystyczny dla zespołu podkradania tętnicy podobojczykowej?",
        options: [
          "Asymetria ciśnienia tętniczego skurczowego między kończynami górnymi przekraczająca 15–20 mmHg",
          "Obustronne opadanie powiek i rozszerzenie źrenic",
          "Masywne powiększenie obwodu podudzia z objawem Homansa",
          "Ostry ból za mostkiem promieniujący do żuchwy",
          "Bębenkowy odgłos opukowy nad całą jamą brzuszną"
        ],
        answer: "Asymetria ciśnienia tętniczego skurczowego między kończynami górnymi przekraczająca 15–20 mmHg",
        explanation: "Zwężenie proksymalnego odcinka tętnicy podobojczykowej manifestuje się istotną asymetrią ciśnienia tętniczego na ramionach (>15–20 mmHg) oraz osłabieniem tętna po stronie chorej."
      },
      {
        question: "Leczeniem inwazyjnym pierwszego wyboru u pacjenta z objawowym zespołem podkradania tętnicy podobojczykowej jest:",
        options: [
          "Przezskórna angioplastyka ze stentem (PTA + stent) tętnicy podobojczykowej",
          "Całkowite podwiązanie tożstronnej tętnicy kręgowej",
          "Wszczepienie kardiowertera-defibrylatora (ICD)",
          "Torakotomia lewostronna z usunięciem łuku aorty",
          "Zewnątrzczaszkowo-wewnątrzczaszkowe zespolenie tętnicze EC-IC"
        ],
        answer: "Przezskórna angioplastyka ze stentem (PTA + stent) tętnicy podobojczykowej",
        explanation: "Zabieg wewnątrznaczyniowy ze stentem w odcinku przedkręgowym tętnicy podobojczykowej jest bezpieczną i wysoce skuteczną metodą z wyboru w likwidacji zjawiska podkradania."
      }
    ],
    flashcards: [
      { front: "Gdzie znajduje się zwężenie w zespole podkradania tętnicy podobojczykowej?", back: "W pniu tętnicy podobojczykowej proksymalnie (przed) do odejścia tożstronnej tętnicy kręgowej." },
      { front: "Jaki jest kierunek przepływu w tętnicy kręgowej w pełnym zespole SSS?", back: "Odwrócony (wsteczny, odgłowowy) – krew płynie z mózgu w dół szyi do naczynia ramiennego." },
      { front: "Jaka asymetria ciśnienia na ramionach sugeruje zwężenie tętnicy podobojczykowej?", back: "Różnica skurczowego ciśnienia tętniczego > 15–20 mmHg (z niższym ciśnieniem po stronie chorej)." },
      { front: "Kiedy nasilają się objawy mózgowe w SSS?", back: "Podczas intensywnej pracy fizycznej kończyną górną po stronie zwężenia (spadek oporu naczyniowego 'zasysa' krew z mózgu)." },
      { front: "Jaka jest metoda leczenia inwazyjnego pierwszego wyboru w SSS?", back: "Przezskórna angioplastyka balonowa ze stentem (PTA + stent) tętnicy podobojczykowej." }
    ]
  },

  // 148: Polytrauma (Uraz wielonarządowy)
  {
    id: 148,
    filename: "148_polytrauma_uraz_wielonarzadowy.json",
    dept: "Chirurgia",
    shortTitle: "34-letni motocyklista po zderzeniu czołowym – Wstrząs krwotoczny, niestabilna miednica, eFAST dodatni (ATLS ABCDE / MTP 1:1:1 / Damage Control)",
    diagnosisTitle: "Uraz wielonarządowy (Polytrauma, ISS >25) ze wstrząsem krwotocznym IV stopnia, niestabilnym złamaniem miednicy i krwawieniem dootrzewnowym",
    vitals: [
      { label: "HR", val: "138/min", sub: "Ciężka tachykardia / tętno nitkowate", status: "bad" },
      { label: "BP", val: "72/40 mmHg", sub: "Głęboka hipotensja wstrząsowa", status: "bad" },
      { label: "SpO2", val: "91%", sub: "Na masce z rezerwuarem 15 l/min", status: "bad" },
      { label: "RR", val: "32/min", sub: "Tachypnoe", status: "bad" },
      { label: "Temp", val: "35.2°C", sub: "Hipotermia pourazowa", status: "bad" }
    ],
    vitalsObj: { hr: 138, bp: "72/40", spo2: 91, rr: 32, temp: 35.2 },
    story: "34-letni motocyklista uległ zderzeniu czołowemu z samochodem ciężarowym przy dużej prędkości. Został odrzucony na odległość kilkunastu metrów. ZRM przywiózł poszkodowanego w kołnierzu ortopedycznym, na desce ortopedycznej, z wkłuciem doszpikowym i podawanym tlenem. Pacjent podsypiający, jęczący z bólu, blady, z oblaną zimnym potem powłoką skórną. GCS 11 (O3V3M5). W badaniu wstępnym ATLS: drogi oddechowe drożne, szmer pęcherzykowy symetryczny, ale ściszony u podstaw, tachypnoe 32/min. Tętno nitkowate, nawrót kapilarny >4 sekundy. Brzuch deskowato napięty, wzdęty. Przy delikatnym teście kompresji obręczy miednicy wyczuwalna patologiczna ruchomość i trzeszczenie odłamów (złamanie typu 'otwarta księga' - open book). Otwarte złamanie lewego podudzia z widocznymi odłamami kości.",
    labs: [
      {
        category: "Morfologia i gazometria tętnicza CITO",
        items: [
          { name: "Hemoglobina (Hb) CITO", val: "6.8 g/dL (ciężka ostra anemia krwotoczna)", norm: "13.5–17.5 g/dL", flag: "L" },
          { name: "Mleczany w gazometrii", val: "7.8 mmol/L (krytyczna hipoperfuzja tkankowa)", norm: "0.5–2.0 mmol/L", flag: "H" },
          { name: "pH krwi tętniczej / BE", val: "7.15 / -14.2 mmol/L (ciężka kwasica metaboliczna)", norm: "7.35–7.45 / -2 do +2", flag: "L" },
          { name: "Fibrynogen / Płytki krwi", val: "1.2 g/L / 85 G/L (koagulopatia pourazowa TIC)", norm: "2.0–4.0 / 150–400", flag: "L" }
        ]
      },
      {
        category: "Protokół USG eFAST przyłóżkowo na Trauma Room",
        items: [
          { name: "Zachyłek Morisona i okolica śledzionowa", val: "Masywna obecność wolnego płynu bezechowego (krew) w zachyłku wątrobowo-nerkowym i okołośledzionowym", norm: "Brak płynu", flag: "H" },
          { name: "Miednica mniejsza (zachyłek Douglasa/za pęcherzem)", val: "Duża ilość wolnej krwi w miednicy", norm: "Brak", flag: "H" },
          { name: "Pola płucne i worek osierdziowy w eFAST", val: "Obustronny objaw ślizgania opłucnej obecny (brak odmy prężnej), worek osierdziowy wolny od płynu (brak tamponady)", norm: "Prawidłowy", flag: "N" }
        ]
      },
      {
        category: "Ocena 'Triady Śmierci' (Lethal Triad)",
        items: [
          { name: "Hipotermia", val: "35.2°C (zaburzenia enzymów kaskady krzepnięcia)", norm: "> 36.0°C", flag: "L" },
          { name: "Kwasica metaboliczna", val: "pH 7.15, Mleczany 7.8 mmol/L", norm: "pH > 7.35", flag: "L" },
          { name: "Koagulopatia pourazowa (TIC)", val: "Fibrynogen 1.2 g/L, INR 1.7", norm: "Norma", flag: "H" }
        ]
      }
    ],
    steps: [
      {
        num: 1,
        title: "Priorytety badania wstępnego wg schematu ABCDE",
        task: "Jaka jest nadrzędna zasada postępowania w badaniu wstępnym pacjenta z urazem wielonarządowym wg wytycznych ATLS (Advanced Trauma Life Support)?",
        options: [
          { text: "Ustrukturyzowane podejście ABCDE (Airway z ochroną kręgosłupa szyjnego, Breathing, Circulation z kontrolą krwawień, Disability, Exposure z ochroną przed hipotermią); natychmiastowe leczenie stanów zagrożenia życia przed przejściem do kolejnego punktu", correct: true, feedback: "Prawidłowo! Schemat ATLS ABCDE: nie przechodzimy do kolejnej litery, dopóki stan bezpośrednio zagrażający życiu w punkcie wcześniejszym nie zostanie opanowany. W przypadku masywnego krwotoku zewnętrznego dopuszcza się schemat <C>ABC (najpierw zaopatrzenie krwotoku opaską uciskową stazą taktyczną)." },
          { text: "Natychmiastowe wykonanie pełnego tomografu ciała (polytrauma-CT) u niestabilnego pacjenta", correct: false, feedback: "Niestabilny hemodynamicznie pacjent nie może jechać do pracowni TK ('death in CT suite') – wymaga natychmiastowej sali operacyjnej!" },
          { text: "Zaopatrzenie otwartego złamania podudzia w pierwszej minucie", correct: false, feedback: "Złamanie kończyny leży w punkcie E i nie ma pierwszeństwa przed wstrząsem i drogami oddechowymi." },
          { text: "Pobranie szczegółowego wywiadu rodzinnego od świadków", correct: false, feedback: "Wywiad (SAMPLE) zbiera się w badaniu wtórnym." }
        ]
      },
      {
        num: 2,
        title: "Koncepcja 'Zabójczej Triady' (Lethal Triad)",
        task: "Jakie trzy sprzężone zwrotnie zjawiska patofizjologiczne tworzą tzw. 'Triadę Śmierci' u pacjenta po ciężkim urazie wielonarządowym?",
        options: [
          { text: "Hipotermia (<35°C), kwasica metaboliczna (pH <7.20, wysokie mleczany) oraz koagulopatia (Trauma-Induced Coagulopathy - TIC)", correct: true, feedback: "Prawidłowo! Lethal Triad napędza błędne koło: kwasica i niska temperatura hamują aktywność enzymów krzepnięcia krwi, co nasila krwawienie. Krwawienie pogłębia wstrząs, kwasicę i hipotermię. Przerwanie tej triady jest celem resuscytacji kontrolującej uszkodzenia (Damage Control Resuscitation)." },
          { text: "Ból głowy, nudności i wymioty", correct: false, feedback: "To objawy wzmożonego ciśnienia śródczaszkowego." },
          { text: "Cukrzyca, nadciśnienie i hiperlipidemia", correct: false, feedback: "To zespół metaboliczny." },
          { text: "Tachykardia, oliguria i żółtaczka", correct: false, feedback: "Nie tworzą klasycznej zabójczej triady pourazowej." }
        ]
      },
      {
        num: 3,
        title: "Protokół Masywnej Transfuzji (MTP 1:1:1)",
        task: "Jaki jest optymalny stosunek składników krwi podczas uruchomienia Protokołu Masywnej Transfuzji (MTP) w ciężkim wstrząsie krwotocznym wg wytycznych ATLS i europejskich wytycznych urazowych?",
        options: [
          { text: "Zrównoważone przetaczanie w proporcji 1:1:1 (1 jednostka Koncentratu Krwinek Czerwonych KKCz : 1 jednostka Osocza Świeżo Mrożonego FFP : 1 dawka Koncentratu Krwinek Płytkowych KKP)", correct: true, feedback: "Prawidłowo! Nowoczesna resuscytacja hemostatyczna (Damage Control Resuscitation) unika agresywnego podawania krystaloidów, które wywołują koagulopatię z rozcieńczenia i hipotermię. Zamiast tego podaje się krew i jej składniki w fizjologicznej proporcji 1:1:1." },
          { text: "Podanie wyłącznie 6 litrów 0.9% NaCl w ciągu 15 minut", correct: false, feedback: "Masywne wlewy soli wywołują kwasicę hiperchloremiczną, rozcieńczają czynniki krzepnięcia i zabijają chorego." },
          { text: "Podanie wyłącznie albuminy ludzkiej 20%", correct: false, feedback: "Nie zaopatruje nośnika tlenu ani czynników krzepnięcia." },
          { text: "Podanie wyłącznie koncentratu czynnika VII", correct: false, feedback: "Rekombinowany czynnik VIIa to lek ratunkowy ostatecznej szansy, nie baza MTP." }
        ]
      },
      {
        num: 4,
        title: "Kwas traneksamowy (TXA) – Okno czasowe badania CRASH-2",
        task: "Kiedy i w jakiej dawce należy podać kwas traneksamowy (TXA) u pacjenta we wstrząsie krwotocznym pourazowym?",
        options: [
          { text: "Jak najszybciej, bezwzględnie w ciągu pierwszych 3 godzin od urazu: 1 g i.v. w bolusie w ciągu 10 minut, a następnie wlew 1 g przez kolejne 8 godzin", correct: true, feedback: "Prawidłowo! Przełomowe badanie CRASH-2 wykazało, że podanie TXA (leku antyfibrynolitycznego) w pierwszych 3 godzinach od urazu istotnie zmniejsza śmiertelność z powodu wykrwawienia. Podanie TXA po upływie 3 godzin od urazu ZWIĘKSZA ryzyko zgonu i jest przeciwwskazane!" },
          { text: "Dopiero po 24 godzinach od wypadku", correct: false, feedback: "Podanie po >3h zwiększa śmiertelność." },
          { text: "W dawce 50 gramów jednorazowo w bolusie", correct: false, feedback: "Dawka toksyczna, wywołująca drgawki." },
          { text: "Kwas traneksamowy jest bezwzględnie zakazany w urazach", correct: false, feedback: "TXA to lek ratujący życie o klasie zaleceń IA." }
        ]
      },
      {
        num: 5,
        title: "Postępowanie w niestabilnym złamaniu miednicy",
        task: "Jaki jest natychmiastowy priorytetowy krok mechaniczny w opanowaniu krwawienia ze złamanej niestabilnej miednicy ('open book') na Trauma Room?",
        options: [
          { text: "Natychmiastowe założenie nieelastycznego pasa miedniczego (Pelvic Binder) na wysokości krętarzy większych kości udowych w celu zamknięcia i mechanicznej stabilizacji objętości miednicy", correct: true, feedback: "Prawidłowo! Złamanie typu open-book gwałtownie zwiększa objętość miednicy mniejszej, uniemożliwiając wytworzenie tamponady krwiaka z uszkodzonego splotu żylnego przedkrzyżowego i tętnic biodrowych. Założenie pasa na krętarze większe (częsty błąd to zakładanie na talerze biodrowe!) redukuje objętość miednicy i tamuje krwawienie." },
          { text: "Natychmiastowe rozciąganie kończyn dolnych w odwróceniu", correct: false, feedback: "Zwiększa rozerwanie miednicy i nasila krwawienie." },
          { text: "Zignorowanie miednicy i założenie opatrunku na głowę", correct: false, feedback: "Pacjent wykrwawi się do przestrzeni zaotrzewnowej miednicy." },
          { text: "Podanie leków moczopędnych", correct: false, feedback: "Pogłębia wstrząs." }
        ]
      },
      {
        num: 6,
        title: "Filozofia chirurgii kontroli uszkodzeń (Damage Control Surgery - DCS)",
        task: "Na czym polega chirurgia kontroli uszkodzeń (DCS) u niestabilnego pacjenta z polytraumą w porównaniu z klasyczną operacją definitywną?",
        options: [
          { text: "Etap 1: Szybka laparotomia skrócona (tamowanie krwotoku przez upakowanie chustami 'packing', zaopatrzenie uszkodzeń jelit bez zespoleń, pozostawienie otwartego brzucha – laparostomia); Etap 2: Resuscytacja na OIT (ogrzanie, wyrównanie koagulopatii); Etap 3: Planowa reoperacja definitywna po 24–48h", correct: true, feedback: "Prawidłowo! DCS to triumf fizjologii nad anatomią: przedłużająca się operacja definitywna (wielogodzinne rekonstrukcje) u wyziębionego pacjenta w kwasicy i koagulopatii kończy się zgonem na stole. Celem DCS jest zatrzymanie krwotoku i skażenia w <60 minut, powrót na OIT i ostateczna naprawa dopiero po ustabilizowaniu parametrów." },
          { text: "Wykonanie wszystkich możliwych zespoleń i operacji plastycznych podczas jednego 12-godzinnego zabiegu", correct: false, feedback: "To pewna śmierć chorego w zabójczej triadzie." },
          { text: "Zaniechanie jakiejkolwiek operacji i leczenie wyłącznie tlenoterapią", correct: false, feedback: "Krwotok dootrzewnowy wymaga zatrzymania chirurgicznego." },
          { text: "Przeprowadzenie operacji przez telefon", correct: false, feedback: "Niedorzeczne." }
        ]
      },
      {
        num: 7,
        title: "Hipotensja permisywna w polytraumie – wyjątek urazu czaszkowo-mózgowego",
        task: "Jaki jest cel ciśnienia tętniczego w resuscytacji hipotensyjnej u pacjenta po urazie wielonarządowym z WSPÓŁISTNIEJĄCYM ciężkim urazem mózgu (TBI)?",
        options: [
          { text: "U pacjentów z ciężkim TBI hipotensja permisywna jest PRZECIWWSKAZANA; należy utrzymać skurczowe ciśnienie tętnicze SBP >= 100–110 mmHg (lub MAP >= 80 mmHg), aby zapewnić ciśnienie perfuzji mózgowej (CPP >60 mmHg)", correct: true, feedback: "Prawidłowo! Choć w czystym wstrząsie krwotocznym celujemy w SBP 70–90 mmHg (hipotensja permisywna), to mózg z obrzękiem i krwiakiem wewnątrzczaszkowym nie toleruje hipotonii (nawet pojedynczy epizod SBP <90 mmHg podwaja śmiertelność w urazach mózgu!). Dlatego przy TBI celujemy w wyższe ciśnienia perfuzyjne." },
          { text: "Dążymy do ciśnienia skurczowego 40 mmHg", correct: false, feedback: "Spowodowałoby natychmiastowe niedokrwienie i śmierć mózgu." },
          { text: "Ciśnienie krwi nie ma znaczenia dla mózgu", correct: false, feedback: "Ciśnienie perfuzji mózgu CPP = MAP - ICP jest kluczowe." },
          { text: "W urazie mózgu krew należy całkowicie spuścić z organizmu", correct: false, feedback: "Absurd." }
        ]
      },
      {
        num: 8,
        title: "Podsumowanie – Organizacja opieki w Trauma Center",
        task: "Co stanowi klucz do sukcesu przeżycia pacjenta w stanie skrajnej polytraumy w Centrum Urazowym?",
        options: [
          { text: "Skoordynowana praca multidyscyplinarnego Trauma Teamu (chirurg urazowy, anestezjolog, ortopeda, neurochirurg, radiolog interwencyjny), natychmiastowa aktywacja MTP, hemostaza Damage Control i ścisłe monitorowanie parametrów koagulacji (np. ROTEM/TEG)", correct: true, feedback: "Prawidłowo! Leczenie politraumy to gra zespołowa na najwyższym poziomie intensywnej terapii i chirurgii ratunkowej. Nowoczesne systemy ROTEM/TEG (tromboelastometria) pozwalają na celowane uzupełnianie fibrynogenu, płytek i czynników krzepnięcia." },
          { text: "Przekazanie pacjenta do lokalnej przychodni POZ", correct: false, feedback: "Pacjent w takim stanie wymaga Centrum Urazowego najwyższego stopnia referencyjności." },
          { text: "Czekanie na wyniki rutynowego posiewu moczu", correct: false, feedback: "Zgon nastąpiłby w ciągu minut." },
          { text: "Stosowanie leków homeopatycznych", correct: false, feedback: "Niedorzeczne." }
        ]
      }
    ],
    pathoNodes: [
      { id: "p1", label: "Masywny krwotok wewnętrzny", desc: "Złamanie miednicy i pęknięcie narządów miąższowych prowadzą do utraty >40% objętości krwi krążącej." },
      { id: "p2", label: "Rozwój Triady Śmierci", desc: "Hipotermia + Kwasica mleczanowa + Koagulopatia pourazowa (TIC) wzajemnie się napędzają." },
      { id: "p3", label: "Strategia Damage Control", desc: "Szybka hemostaza operacyjna (packing), pas miedniczy, MTP 1:1:1 i TXA przerywają błędne koło wstrząsu." }
    ],
    diffTable: [
      { disease: "Wstrząs krwotoczny (hipowolemiczny)", feature: "Tachykardia, hipotensja, bladość, wąskie ciśnienie tętna, wysokie mleczany, eFAST dodatni" },
      { disease: "Odma prężna (Tension pneumothorax)", feature: "Duszność, asymetria osłuchowa, brak ślizgania opłucnej w eFAST, nadmiernie bębenkowy odgłos, poszerzone żyły szyjne" },
      { disease: "Tamponada serca", feature: "Triada Becka (hipotonia, ciche tony, poszerzone żyły szyjne), płyn w osierdziu w eFAST, tętno dziwaczne" },
      { disease: "Wstrząs neurogenny", feature: "Uraz rdzenia kręgowego, HIPOTENSJA z BRADIKARDIĄ lub brakiem tachykardii, skóra ciepła i sucha poniżej uszkodzenia" }
    ],
    dutySummary: "Pacjent 34-letni po wypadku motocyklowym w skrajnym wstrząsie krwotocznym IV stopnia z niestabilnym złamaniem miednicy i krwawieniem dootrzewnowym. Zastosowano protokół ATLS: założono pas miedniczy na krętarze większe, podano kwas traneksamowy (TXA 1g bolus) i aktywowano protokół masywnej transfuzji (MTP 1:1:1). Na bloku operacyjnym wykonano laparotomię kontrolującą obrażenia (Damage Control Laparotomy – packing loży wątroby i śledziony, laparostomia) z transferem na OIT w celu wyrównania kwasicy i hipotermii.",
    lekQuestions: [
      {
        question: "W skład tzw. 'Triady Śmierci' (Lethal Triad) u pacjenta z ciężkim urazem wielonarządowym wchodzą:",
        options: [
          "Hipotermia, kwasica metaboliczna, koagulopatia",
          "Tachykardia, hipotensja, sinica",
          "Obrzęk mózgu, skąpomocz, żółtaczka",
          "Hipertermia, zasadowica oddechowa, trombocytoza",
          "Ból głowy, wymioty, obrzęk tarczy nerwu wzrokowego"
        ],
        answer: "Hipotermia, kwasica metaboliczna, koagulopatia",
        explanation: "Zabójcza triada pourazowa obejmuje hipotermię, kwasicę i koagulopatię. Zjawiska te wzajemnie napędzają się, prowadząc do nieodwracalnego załamania hemostazy i zgonu chorego."
      },
      {
        question: "Zgodnie z wynikami badania CRASH-2 kwas traneksamowy (TXA) u pacjenta po urazie ze wstrząsem krwotocznym należy podać:",
        options: [
          "Jak najszybciej, optymalnie w ciągu pierwszych 3 godzin od urazu",
          "Dopiero po 6 godzinach od ustabilizowania ciśnienia",
          "Wyłącznie drogą domięśniową po 24 godzinach",
          "Tylko w przypadku współistnienia ostrego zapalenia trzustki",
          "Kwas traneksamowy nie ma zastosowania w urazach"
        ],
        answer: "Jak najszybciej, optymalnie w ciągu pierwszych 3 godzin od urazu",
        explanation: "Badanie CRASH-2 udowodniło redukcję śmiertelności przy podaniu TXA w oknie do 3 godzin od urazu. Podanie leku po upływie 3 godzin wiąże się ze wzrostem ryzyka zgonu."
      },
      {
        question: "W przypadku niestabilnego złamania miednicy typu 'otwarta księga' (open-book) pas miedniczy powinien być prawidłowo zapięty na wysokości:",
        options: [
          "Krętarzy większych kości udowych",
          "Talerzy kości biodrowych (grzebieni biodrowych)",
          "Dolnych żeber",
          "Pępka",
          "Środkowej części ud"
        ],
        answer: "Krętarzy większych kości udowych",
        explanation: "Prawidłowe założenie pasa miedniczego na poziomie krętarzy większych kości udowych pozwala uzyskać właściwą dźwignię biomechaniczną, zbliżyć odłamy miednicy i zredukować jej objętość, co tamuje krwotok z naczyń zaotrzewnowych."
      }
    ],
    flashcards: [
      { front: "Co wchodzi w skład pourazowej Zabójczej Triady (Lethal Triad)?", back: "1. Hipotermia (<35°C), 2. Kwasica metaboliczna, 3. Koagulopatia pourazowa (TIC)." },
      { front: "Jaki jest stosunek składników krwi w Protokole Masywnej Transfuzji (MTP)?", back: "1:1:1 (1 jedn. KKCz : 1 jedn. FFP : 1 dawka KKP)." },
      { front: "W jakim czasie od urazu należy podać kwas traneksamowy (TXA)?", back: "W ciągu pierwszych 3 godzin od urazu (dawka: 1 g i.v. w bolusie w 10 min + 1 g we wlewie przez 8 h)." },
      { front: "Gdzie należy założyć pas miedniczy w złamaniu miednicy?", back: "Na wysokości krętarzy większych kości udowych (a NIE na grzebieniach biodrowych!)." },
      { front: "Na czym polega Damage Control Surgery (DCS)?", back: "Skrócona operacja ratunkowa (<60 min) ograniczona do zaopatrzenia krwotoku (packing) i skażeń + laparostomia -> transfer na OIT -> definitywna operacja po 24–48 h." }
    ]
  },

  // 149: Wiotka klatka piersiowa (Flail chest)
  {
    id: 149,
    filename: "149_wiotka_klatka_piersiowa_flail_chest.json",
    dept: "Chirurgia",
    shortTitle: "58-letni pracownik budowlany po upadku z rusztowania – Złamanie 4 kolejnych żeber z paradoksalnym ruchem oddechowym ściany klatki piersiowej i stłuczeniem płuca",
    diagnosisTitle: "Wiotka klatka piersiowa (Flail chest) ze stłuczeniem miąższu płuca prawego (Contusio pulmonis) i ostrą niewydolnością oddechową",
    vitals: [
      { label: "HR", val: "114/min", sub: "Tachykardia oddechowo-bólowa", status: "warn" },
      { label: "BP", val: "135/82 mmHg", sub: "Prawidłowe", status: "ok" },
      { label: "SpO2", val: "88%", sub: "Ciężka hipoksemia (na powietrzu)", status: "bad" },
      { label: "RR", val: "28/min", sub: "Płytki, szybki, bolesny oddech", status: "bad" },
      { label: "Temp", val: "36.7°C", sub: "Prawidłowa", status: "ok" }
    ],
    vitalsObj: { hr: 114, bp: "135/82", spo2: 88, rr: 28, temp: 36.7 },
    story: "58-letni robotnik budowlany spadł z rusztowania z wysokości około 3.5 metra, uderzając prawą połową klatki piersiowej o betonową belkę. Przywieziony na SOR z powodu duszności, obezwładniającego bólu w prawej połowie klatki piersiowej uniemożliwiającego nabranie powietrza oraz krwioplucia (odkrztuszanie różowej, pienistej wydzieliny). W badaniu fizykalnym: widoczna asymetria ruchów oddechowych klatki piersiowej – w trakcie wdechu fragment przednio-bocznej ściany prawej klatki piersiowej ZAPADA SIĘ do wewnątrz, a podczas wydechu WYPUKLA SIĘ na zewnątrz (ruch paradoksalny klatki piersiowej). Nad prawym polem płucnym wyczuwalne bolesne trzeszczenia odłamów kostnych i rozedma podskórna, osłuchowo ściszenie szmeru pęcherzykowego i liczne wilgotne rzężenia nad prawym płucem. Brzuch miękki, miednica stabilna.",
    labs: [
      {
        category: "Gazometria krwi tętniczej CITO (przy tlenoterapii biernej)",
        items: [
          { name: "PaO2 (ciśnienie cząstkowe tlenu)", val: "54 mmHg (ciężka hipoksemia, niewydolność oddechowa)", norm: "75–100 mmHg", flag: "L" },
          { name: "PaCO2", val: "48 mmHg (narastająca hiperkapnia zmęczeniowa)", norm: "35–45 mmHg", flag: "H" },
          { name: "pH krwi tętniczej", val: "7.31", norm: "7.35–7.45", flag: "L" },
          { name: "Wskaźnik oksygenacji (PaO2 / FiO2)", val: "180 (kryterium umiarkowanego ARDS pourazowego)", norm: "> 400", flag: "L" }
        ]
      },
      {
        category: "Badania obrazowe (RTG i TK klatki piersiowej CITO)",
        items: [
          { name: "TK klatki piersiowej (Angio-TK / Trauma-CT)", val: "Wielomiejscowe złamanie żeber IV, V, VI i VII po stronie prawej w dwóch liniach (pachowej przedniej i tylnej) z wytworzeniem wiotkiego fragmentu ściany (flail chest). Rozległe stłuczenie miąższu płuca prawego (contusio pulmonis) obejmujące płat środkowy i dolny. Niewielka odma opłucnowa (15 mm) i umiarkowany krwiak opłucnej", norm: "Kościec i miąższ płucny bez zmian pourazowych", flag: "H" },
          { name: "RTG klatki piersiowej przyłóżkowo", val: "Widoczne podwójne złamania żeber IV–VII, plamiste zagęszczenia stłuczeniowe prawego płuca", norm: "Pola płucne wolne", flag: "H" }
        ]
      },
      {
        category: "USG eFAST / BLUE protocol (klatka piersiowa)",
        items: [
          { name: "USG płuc (POCUS)", val: "Obecność licznych linii B (B-lines) zlewających się w obraz 'białego płuca' nad stłuczonym miąższem, punkty płucne (lung point) w polu przednim prawym", norm: "Prawidłowy profil A (linie A)", flag: "H" }
        ]
      }
    ],
    steps: [
      {
        num: 1,
        title: "Definicja anatomiczna wiotkiej klatki piersiowej",
        task: "Jak definiuje się wiotką klatkę piersiową (flail chest)?",
        options: [
          { text: "Złamanie co najmniej 3 sąsiednich żeber w co najmniej 2 miejscach każde, co powoduje powstanie wolnego, odizolowanego segmentu ściany klatki piersiowej poruszającego się paradoksalnie", correct: true, feedback: "Prawidłowo! Flail chest to mechaniczne odłączenie fragmentu ściany klatki piersiowej od reszty kośćca wskutek podwójnych złamań co najmniej trzech kolejnych żeber (lub żeber i mostka)." },
          { text: "Pojedyncze pęknięcie jednego żebra bez przemieszczenia", correct: false, feedback: "To zwykłe złamanie żebra." },
          { text: "Zwichnięcie obojczyka", correct: false, feedback: "Nie ma związku z wiotkością klatki piersiowej." },
          { text: "Rozdęcie płuc w przewlekłej rozedmie", correct: false, feedback: "To choroba internistyczna, nie uraz kośćca." }
        ]
      },
      {
        num: 2,
        title: "Fizjologia paradoksalnego ruchu oddechowego",
        task: "Dlaczego odizolowany wiotki fragment ściany klatki piersiowej porusza się 'na odwrót' (paradoksalnie)?",
        options: [
          { text: "Podczas wdechu ujemne ciśnienie w klatce piersiowej zasysa wiotki fragment do wewnątrz; podczas wydechu wzrost ciśnienia w jamie opłucnej wypycha ten fragment na zewnątrz", correct: true, feedback: "Prawidłowo! Wdech generuje podciśnienie w opłucnej, co powoduje zapadanie się wiotkiego segmentu (paradoxical inward movement). Podczas wydechu ciśnienie rośnie i fragment uwypukla się na zewnątrz. Prowadzi to do spadku objętości oddechowej i ogromnego wydatku energetycznego mięśni oddechowych." },
          { text: "Ponieważ mięśnie międzyżebrowe odwracają swój metabolizm", correct: false, feedback: "To zjawisko czysto mechaniczne, wynikające z ciśnień w jamie opłucnej." },
          { text: "Krew płynie w przeciwnym kierunku w aorcie", correct: false, feedback: "Absurd." },
          { text: "Przepona przestaje się kurczyć całkowicie", correct: false, feedback: "Przepona kurczy się, wytwarzając podciśnienie." }
        ]
      },
      {
        num: 3,
        title: "Główna przyczyna zgonu i hipoksemii – Stłuczenie płuca (Contusio pulmonis)",
        task: "Co jest faktyczną, główną bezpośrednią przyczyną hipoksemii i niewydolności oddechowej u pacjentów z wiotką klatką piersiową?",
        options: [
          { text: "Współistniejące stłuczenie miąższu płuca (contusio pulmonis) znajdującego się pod złamanym segmentem, prowadzące do obrzęku pęcherzyków, krwawienia pęcherzykowego, niedodmy i ciężkiego przecieku płucnego (shunt)", correct: true, feedback: "Prawidłowo! Kluczowy fakt kliniczny: to NIE sam ruch paradoksalny żeber zabija pacjenta, lecz ciężkie stłuczenie miąższu płucnego leżącego pod uderzonym fragmentem. Krew i obrzęk wypełniają pęcherzyki, wywołując masywny fizjologiczny przeciek płucny (krew przepływa przez nieupowietrznione pęcherzyki bez utlenowania)." },
          { text: "Złamanie kości udowej", correct: false, feedback: "Nie wpływa bezpośrednio na wymianę gazową." },
          { text: "Niedobór surfaktantu wywołany stresem psychicznym", correct: false, feedback: "Brak takiego mechanizmu pourazowego." },
          { text: "Zapalenie wyrostka robaczkowego", correct: false, feedback: "Brak związku." }
        ]
      },
      {
        num: 4,
        title: "Filary leczenia zachowawczego – Agresywna analgezja",
        task: "Jaki jest najważniejszy element leczenia zachowawczego wiotkiej klatki piersiowej i stłuczenia płuca, zapobiegający intubacji?",
        options: [
          { text: "Skuteczna analgezja regionalna (np. ciągła blokada zewnątrzoponowa piersiowa TEA, blokada powięziowa m. prostownika grzbietu ESPB lub blokada przykręgowa) połączona z toaletą drzewa oskrzelowego i fizjoterapią oddechową", correct: true, feedback: "Prawidłowo! Ból jest głównym czynnikiem napędzającym niewydolność oddechową: pacjent z powodu potwornego bólu płytko oddycha, nie odkrztusza wydzieliny, co prowadzi do retencji śluzu, niedodmy i septycznego zapalenia płuc. Zlikwidowanie bólu analgezją regionalną umożliwia głębokie oddychanie i odkrztuszanie." },
          { text: "Ścisłe obandażowanie klatki piersiowej opaską elastyczną naokoło", correct: false, feedback: "Błąd w sztuce! Bandażowanie ogranicza ruchomość klatki piersiowej, nasila niedodmę i przyspiesza zgon z niewydolności oddechowej." },
          { text: "Podanie leków nasennych i przeciwkaszlowych (kodeina) w dużych dawkach", correct: false, feedback: "Hamowanie odruchu kaszlowego zaleje płuca krwią i śluzem." },
          { text: "Całkowity zakaz podawania leków przeciwbólowych", correct: false, feedback: "Nieludzkie i zabójcze postępowanie." }
        ]
      },
      {
        num: 5,
        title: "Restrykcyjna płynoterapia w stłuczeniu płuca",
        task: "Dlaczego u pacjenta ze stłuczeniem płuca należy zachować szczególną ostrożność podczas dożylnej podaży płynów (fluid restriction)?",
        options: [
          { text: "Uszkodzone naczynia włosowate stłuczonego płuca mają zwiększoną przepuszczalność; nadmierna płynoterapia krystaloidowa szybko prowadzi do masywnego obrzęku płuc i załamania wymiany gazowej", correct: true, feedback: "Prawidłowo! W stłuczeniu płuca bariera włośniczkowo-pęcherzykowa jest zniszczona. Każdy nadmiar przetoczonych płynów natychmiast przesiąka do pęcherzyków stłuczonego płuca, dramatycznie pogłębiając hipoksemię (tzw. 'mokre płuco'). Płynoterapię należy prowadzić w sposób ściśle restrykcyjny (euvolemia)." },
          { text: "Płyny dożylne powodują rozpad kości żeber", correct: false, feedback: "Nonsens." },
          { text: "Krystaloidy zamieniają się w pęcherzykach w kwas siarkowy", correct: false, feedback: "Absurd." },
          { text: "Płuco nie potrzebuje wody do funkcjonowania", correct: false, feedback: "Nieprawda." }
        ]
      },
      {
        num: 6,
        title: "Wskazania do intubacji i wentylacji mechanicznej (wewnętrzna stabilizacja pneumatyczna)",
        task: "Kiedy pacjent z wiotką klatką piersiową wymaga pilnej intubacji dotchawiczej i wentylacji mechanicznej z dodatnim ciśnieniem końcowowydechowym (PEEP)?",
        options: [
          { text: "W przypadku narastającej hipoksemii (PaO2 <60 mmHg na tlenie), ciężkiego tachypnoe (RR >35/min), hiperkapnii z kwasicą oddechową (PaCO2 >50 mmHg) lub wyczerpania mięśni oddechowych chorego", correct: true, feedback: "Prawidłowo! Wentylacja z dodatnim ciśnieniem (IPPV z PEEP) działa jak 'wewnętrzna szyna pneumatyczna' (internal pneumatic splinting): rozpręża pęcherzyki od środka, koryguje ruch paradoksalny i zapewnia utlenowanie tkanek." },
          { text: "Każdy pacjent ze złamaniem żebra musi być intubowany", correct: false, feedback: "Intubuje się tylko pacjentów z niewydolnością oddechową." },
          { text: "Intubacja jest bezwzględnie zakazana w urazach klatki", correct: false, feedback: "Jest procedurą ratującą życie." },
          { text: "Tylko w przypadku zasinienia paznokci u stóp", correct: false, feedback: "Brak specyfiki." }
        ]
      },
      {
        num: 7,
        title: "Operacyjna stabilizacja żeber (SSRF)",
        task: "Jakie są wskazania do chirurgicznej stabilizacji złamań żeber (Surgical Stabilization of Rib Fractures - SSRF) przy użyciu tytanowych płytek i śrub?",
        options: [
          { text: "Ciężka wiotka klatka piersiowa oporna na analgezję z niemożnością odłączenia od respiratora (weaning failure), znaczne przemieszczenie odłamów z deformacją klatki piersiowej lub torakotomia wykonywana z innych wskazań", correct: true, feedback: "Prawidłowo! SSRF (osteosynteza żeber płytkami tytanowymi) skraca czas wentylacji mechanicznej, pobyt na OIT, redukuje ryzyko zapalenia płuc oraz przewlekłych deformacji i bólu u chorych z wiotką klatką piersiową." },
          { text: "Pojedyncze bezbólowe pęknięcie żebra", correct: false, feedback: "Pojedynczych pęknięć się nie operuje." },
          { text: "Wszyscy pacjenci powyżej 18. roku życia", correct: false, feedback: "Brak takich wskazań." },
          { text: "Chęć poprawy sylwetki w celach estetycznych", correct: false, feedback: "SSRF to zabieg chirurgii urazowej ratujący funkcję płuc." }
        ]
      },
      {
        num: 8,
        title: "Podsumowanie postępowania terapeutycznego",
        task: "Jakie postępowanie wdrożono u opisywanego pacjenta na SOR?",
        options: [
          { text: "Tlenoterapia wysokoprzepływowa (HFNO) / nieinwazyjna wentylacja (NIV), założenie ciągłego znieczulenia zewnątrzoponowego (TEA), drenaż opłucnej z powodu odmy oraz restrykcyjna płynoterapia z kwalifikacją do osteosyntezy SSRF", correct: true, feedback: "Prawidłowo! Kompleksowe leczenie: skuteczne uśmierzenie bólu blokadą regionalną, tlenoterapia, odbarczenie odmy drenażem i rozważenie stabilizacji operacyjnej płytkami tytanowymi stanowi współczesny kanon leczenia flail chest." },
          { text: "Wypisanie do domu z zaleceniem odpoczynku", correct: false, feedback: "Pacjent w hipoksemii zmarłby w domu z niewydolności oddechowej." },
          { text: "Podanie dożylne 5 litrów glukozy", correct: false, feedback: "Pogłębiłoby stłuczenie płuc i obrzęk." },
          { text: "Założenie gipsu na cały tułów", correct: false, feedback: "Śmiertelny błąd." }
        ]
      }
    ],
    pathoNodes: [
      { id: "p1", label: "Wielomiejscowe złamania żeber", desc: "Utrata ciągłości ściany klatki piersiowej wywołuje ruch paradoksalny segmentu wiotkiego." },
      { id: "p2", label: "Stłuczenie miąższu płuca (Contusio)", desc: "Wylewy krwi i obrzęk pęcherzyków płucnych pod uderzonym segmentem tworzą potężny przeciek płucny." },
      { id: "p3", label: "Niewydolność oddechowa i zmęczenie mięśni", desc: "Ból hamuje kaszel -> niedodma, retencja wydzieliny i hipoksemia wymagająca analgezji i wentylacji." }
    ],
    diffTable: [
      { disease: "Wiotka klatka piersiowa (Flail chest)", feature: "Ruch paradoksalny ściany (zapadanie we wdechu), >=3 sąsiednie żebra złamane w >=2 miejscach, stłuczenie płuca" },
      { disease: "Odma prężna (Tension pneumothorax)", feature: "Zniesienie szmerów, poszerzone żyły szyjne, przesunięcie tchawicy, natychmiastowe załamanie hemodynamiczne" },
      { disease: "Zwykłe złamanie żeber (1–2 żebra)", feature: "Ból miejscowy, brak ruchu paradoksalnego ściany, zachowana prawidłowa wymiana gazowa" },
      { disease: "Pęknięcie przepony z przemieszczeniem trzewi", feature: "Tony perystaltyki jelit słyszalne w klatce piersiowej, uniesienie kopuły przepony w RTG" }
    ],
    dutySummary: "Pacjent 58-letni z wiotką klatką piersiową (flail chest po złamaniu żeber IV–VII w dwóch liniach) oraz ciężkim stłuczeniem płuca prawego powikłanym ostrą niewydolnością oddechową (PaO2 54 mmHg). Zastosowano tlenoterapię bierną, wdrożono znieczulenie zewnątrzoponowe piersiowe (TEA) celem uśmierzenia bólu i umożliwienia głębokiego oddychania, zdrenowano odmę i zakwalifikowano pacjenta do chirurgicznej stabilizacji żeber płytkami tytanowymi (SSRF).",
    lekQuestions: [
      {
        question: "Wiotka klatka piersiowa (flail chest) jest definiowana jako złamanie:",
        options: [
          "Co najmniej 3 sąsiednich żeber w co najmniej 2 miejscach każde",
          "Dwóch kolejnych żeber w jednym miejscu",
          "Mostka wraz z obojczykiem",
          "Żebra I i II z uszkodzeniem tętnicy podobojczykowej",
          "Wszystkich żeber rzekomych po stronie lewej"
        ],
        answer: "Co najmniej 3 sąsiednich żeber w co najmniej 2 miejscach każde",
        explanation: "Warunkiem anatomicznym wiotkiej klatki piersiowej jest złamanie minimum trzech sąsiednich żeber w co najmniej dwóch miejscach, co izoluje segment ściany klatki i pozwala na jego paradoksalny ruch."
      },
      {
        question: "Główną bezpośrednią przyczyną hipoksemii i załamania wymiany gazowej u chorych z wiotką klatką piersiową jest:",
        options: [
          "Współistniejące stłuczenie miąższu płuca (contusio pulmonis)",
          "Zwichnięcie stawu mostkowo-obojczykowego",
          "Pęknięcie opłucnej ściennej",
          "Zaburzenie perystaltyki żołądka",
          "Ucisk nerwu błędnego przez połamane żebra"
        ],
        answer: "Współistniejące stłuczenie miąższu płuca (contusio pulmonis)",
        explanation: "To stłuczenie płuca (krwawienie i obrzęk pęcherzyków płucnych), a nie sam ruch paradoksalny żeber, odpowiada za upośledzenie utlenowania krwi i przeciek płucny w flail chest."
      },
      {
        question: "Które z poniższych działań jest BŁĘDEM w postępowaniu przedszpitalnym i szpitalnym u pacjenta z wiotką klatką piersiową?",
        options: [
          "Ciasne opasanie klatki piersiowej opaską elastyczną wokół całego tułowia",
          "Wdrożenie skutecznej analgezji regionalnej (np. blokada zewnątrzoponowa piersiowa)",
          "Tlenoterapia w celu utrzymania saturacji >92%",
          "Drenaż jamy opłucnej w przypadku towarzyszącej odmy opłucnowej",
          "Ostrożna, restrykcyjna płynoterapia dożylna"
        ],
        answer: "Ciasne opasanie klatki piersiowej opaską elastyczną wokół całego tułowia",
        explanation: "Opasanie klatki piersiowej uniemożliwia prawidłową wentylację, drastycznie zmniejsza pojemność życiową płuc, nasila niedodmę i przyspiesza niewydolność oddechową."
      }
    ],
    flashcards: [
      { front: "Jak definiuje się wiotką klatkę piersiową (flail chest)?", back: "Złamanie >=3 sąsiednich żeber w >=2 miejscach każde, powodujące odizolowanie fragmentu ściany poruszającego się paradoksalnie." },
      { front: "Jak porusza się wiotki segment klatki piersiowej podczas oddychania?", back: "Paradoksalnie: zapada się do wnętrza podczas wdechu (ujemne ciśnienie w klatce) i uwypukla na zewnątrz podczas wydechu." },
      { front: "Co jest główną przyczyną hipoksemii w flail chest?", back: "Stłuczenie leżącego pod spodem miąższu płuca (contusio pulmonis) powodujące przeciek płucny i upośledzenie dyfuzji." },
      { front: "Dlaczego ciasne bandażowanie klatki piersiowej w flail chest jest błędem?", back: "Ogranicza ruchomość klatki, uniemożliwia głęboki oddech, nasila niedodmę i retencję wydzieliny, przyspieszając zgon z niewydolności oddechowej." },
      { front: "Co oznacza skrót SSRF w chirurgii klatki piersiowej?", back: "Surgical Stabilization of Rib Fractures – operacyjna osteosynteza złamanych żeber za pomocą płytek tytanowych." }
    ]
  },

  // 150: Masywny krwiak opłucnej (Haemothorax)
  {
    id: 150,
    filename: "150_masywny_krwiak_oplucnej_haemothorax.json",
    dept: "Chirurgia",
    shortTitle: "30-letni mężczyzna po ranie kłutej klatki piersiowej – Stłumienie wypuku, brak szmerów oddechowych i ewakuacja 1600 ml krwi po drenażu (Wskazanie do torakotomii)",
    diagnosisTitle: "Masywny krwiak prawej jamy opłucnej (Haemothorax massivus) po ranie kłutej klatki piersiowej z uszkodzeniem tętnicy międzyżebrowej",
    vitals: [
      { label: "HR", val: "128/min", sub: "Tachykardia kompensacyjna", status: "bad" },
      { label: "BP", val: "84/50 mmHg", sub: "Hipotensja wstrząsowa", status: "bad" },
      { label: "SpO2", val: "92%", sub: "Na tlenie 10 l/min przez maskę", status: "warn" },
      { label: "RR", val: "26/min", sub: "Tachypnoe", status: "warn" },
      { label: "Temp", val: "36.2°C", sub: "Chłodna skóra", status: "ok" }
    ],
    vitalsObj: { hr: 128, bp: "84/50", spo2: 92, rr: 26, temp: 36.2 },
    story: "30-letni mężczyzna został przywieziony na SOR po napadzie z użyciem noża. Doznał rany kłutej w V przestrzeni międzyżebrowej w linii pachowej przedniej prawej. Pacjent blady, wlany zimnym potem, zgłasza duszność i osłabienie. W badaniu fizykalnym: rana kłuta o długości 3 cm z sączeniem ciemnoczerwonej krwi. Nad prawą połową klatki piersiowej od połowy wysokości ku dołowi stwierdza się STŁUMIENIE odgłosu opukowego oraz CAŁKOWITY BRAK szmerów oddechowych (cisza oddechowa). Żyły szyjne zapadnięte (cecha hipowolemii). Tchawica w linii pośrodkowej. Brzuch miękki, niebolesny.",
    labs: [
      {
        category: "Morfologia i gazometria krwi tętniczej CITO",
        items: [
          { name: "Hemoglobina (Hb) CITO", val: "8.2 g/dL (ostra niedokrwistość pokrwotoczna)", norm: "13.5–17.5 g/dL", flag: "L" },
          { name: "Hematokryt (Hct)", val: "25%", norm: "40–52%", flag: "L" },
          { name: "Mleczany w gazometrii", val: "4.8 mmol/L (kwasica mleczanowa)", norm: "0.5–2.0 mmol/L", flag: "H" },
          { name: "Grupa krwi i próba zgodności CITO", val: "Pobrano natychmiast – zamówienie 4 jednostek KKCz CITO", norm: "Wykonano", flag: "N" }
        ]
      },
      {
        category: "Badania obrazowe (RTG klatki piersiowej i eFAST CITO)",
        items: [
          { name: "USG eFAST (jama opłucnowa prawa)", val: "Masywna, bezechowa warstwa płynu (krew) w prawej jamie opłucnej o grubości >6 cm, uciskająca dolny i środkowy płat płuca", norm: "Brak płynu w jamie opłucnej", flag: "H" },
          { name: "RTG klatki piersiowej na siedząco / w pozycji półwysokiej", val: "Jednolite masywne zacienienie prawej połowy klatki piersiowej sięgające powyżej połowy wysokości z zatarciem kąta przeponowo-żebrowego i prawej kopuły przepony", norm: "Pola płucne przejrzyste", flag: "H" }
        ]
      },
      {
        category: "Ocena objętości drenażu jamy opłucnej CITO",
        items: [
          { name: "Wstępna objętość krwi po założeniu drenu (Bülau)", val: "1650 ml krwi wypłynęło natychmiast po wprowadzeniu drenu do jamy opłucnej", norm: "0 ml", flag: "H" },
          { name: "Dalszy drenaż w ciągu kolejnej godziny", val: "280 ml świeżej krwi w zbiorniku zastawkowym", norm: "0 ml", flag: "H" }
        ]
      }
    ],
    steps: [
      {
        num: 1,
        title: "Rozpoznanie fizykalne: Odma prężna vs Krwiak opłucnej",
        task: "Jak odróżnić w badaniu przedmiotowym krwiaka opłucnej od odmy prężnej u pacjenta po urazie klatki piersiowej we wstrząsie?",
        options: [
          { text: "W krwiaku opłucnej stwierdza się STŁUMIONY odgłos opukowy oraz zapadnięte żyły szyjne (hipowolemia); w odmie prężnej odgłos opukowy jest BĘBENKOWY (hiperrezonans), a żyły szyjne są nadmiernie wypełnione wskutek utrudnienia powrotu żylnego", correct: true, feedback: "Prawidłowo! To kardynalne różnicowanie w ATLS: oba stany powodują jednostronną ciszę osłuchową i wstrząs, ale odgłos opukowy (stłumiony w płynie vs bębenkowy w odmie gazowej) oraz stan żył szyjnych (zapadnięte w hipowolemii vs poszerzone w ucisku na żyłę główną) natychmiast pozwalają na właściwe rozpoznanie!" },
          { text: "W obu stanach odgłos opukowy jest zawsze metaliczny", correct: false, feedback: "Płyn daje odgłos stłumiony, nie bębenkowy." },
          { text: "Nie da się ich odróżnić bez tomografii komputerowej", correct: false, feedback: "W stanach zagrożenia życia badanie fizykalne decyduje o natychmiastowej interwencji." },
          { text: "W krwiaku opłucnej żyły szyjne zawsze tętnią z częstością 300/min", correct: false, feedback: "Brak takiego objawu." }
        ]
      },
      {
        num: 2,
        title: "Pierwszy krok leczniczy – Drenaż jamy opłucnej (Torakostomia)",
        task: "Jaki jest natychmiastowy krok terapeutyczny u pacjenta z objawami krwiaka opłucnej i wstrząsu?",
        options: [
          { text: "Założenie grubego drenu do jamy opłucnej (28–32 Fr) w V przestrzeni międzyżebrowej w linii pachowej środkowej/przedniej tuż nad górnym brzegiem żebra (drenaż Bülaua z systemem zastawkowym)", correct: true, feedback: "Prawidłowo! Założenie grubego drenu (chest tube) pozwala odbarczyć płuco, przywrócić wentylację oraz monitorować tempo i objętość krwawienia. Dren wprowadza się nad górnym brzegiem żebra, aby uniknąć uszkodzenia pęczka naczyniowo-nerwowego biegnącego pod dolnym brzegiem żebra." },
          { text: "Podanie dożylne heparyny w celu rozpuszczenia krwi", correct: false, feedback: "Doprowadziłoby do śmiertelnego wykrwawienia!" },
          { text: "Założenie gipsu na klatkę piersiową", correct: false, feedback: "Absurd." },
          { text: "Nakłucie pęcherza moczowego igłą", correct: false, feedback: "Brak związku." }
        ]
      },
      {
        num: 3,
        title: "Wskazania do natychmiastowej torakotomii ratunkowej (Kryteria ATLS)",
        task: "Jakie są klasyczne kryteria objętościowe drenażu opłucnowego kwalifikujące pacjenta do NATYCHMIASTOWEJ torakotomii ratunkowej na bloku operacyjnym?",
        options: [
          { text: "Ewakuacja natychmiastowa >1500 ml krwi bezpośrednio po założeniu drenu LUB utrzymujące się krwawienie >200–250 ml/godzinę przez 2–4 kolejne godziny (lub konieczność ciągłych transfuzji krwi)", correct: true, feedback: "Prawidłowo! To 'złota zasada' chirurgii urazowej: >1500 ml krwi natychmiast lub >200-250 ml/h przez kolejne 2-4 godziny świadczy o uszkodzeniu dużego naczynia krwionośnego (tętnica międzyżebrowa, tętnica piersiowa wewnętrzna, naczynia wnęki płuca) i jest bezwzględnym wskazaniem do pilnego otwarcia klatki piersiowej (torakotomii)." },
          { text: "Wypłynięcie 50 ml płynu w ciągu 24 godzin", correct: false, feedback: "50 ml nie wymaga torakotomii." },
          { text: "Każdy krwiak opłucnej niezależnie od objętości (nawet 100 ml)", correct: false, feedback: ">85% krwiaków leczy się wyłącznie samym drenażem opłucnowym." },
          { text: "Wypłynięcie czystego powietrza", correct: false, feedback: "To odma, a nie masywny krwiak." }
        ]
      },
      {
        num: 4,
        title: "Źródła krwawienia w urazach klatki piersiowej",
        task: "Które naczynia krwionośne są najczęstszą przyczyną masywnego, tętniczego krwawienia opłucnowego wymagającego torakotomii?",
        options: [
          { text: "Tętnice międzyżebrowe oraz tętnica piersiowa wewnętrzna (krążenie systemowe o wysokim ciśnieniu)", correct: true, feedback: "Prawidłowo! Krwawienie z miąższu płucnego (naczynia płucne) jest niskociśnieniowe i często ustępuje samoistnie po rozprężeniu płuca przez drenaż (tamponada miąższowa). Natomiast krwawienie z tętnic międzyżebrowych lub piersiowych wewnętrznych pochodzi z krążenia systemowego pod wysokim ciśnieniem i nie ustaje samoistnie – wymaga chirurgicznego podkłucia lub zaopatrzenia." },
          { text: "Żyła odpiszczelowa wielka", correct: false, feedback: "To żyła kończyny dolnej." },
          { text: "Tętnica krezkowa górna", correct: false, feedback: "To naczynie jamy brzusznej." },
          { text: "Tętnica promieniowa", correct: false, feedback: "Naczynie przedramienia." }
        ]
      },
      {
        num: 5,
        title: "Zastosowanie autotransfuzji (Cell Saver)",
        task: "Jaką nowoczesną metodę uzupełnienia utraconej krwi można zastosować u pacjenta ze świeżym, niepowikłanym krwiakiem opłucnej?",
        options: [
          { text: "Autotransfuzję – odzyskanie, przefiltrowanie i ponowne przetoczenie pacjentowi jego własnej wynaczynionej krwi z jamy opłucnej przy użyciu certyfikowanego zestawu do autotransfuzji (Cell Saver)", correct: true, feedback: "Prawidłowo! Krew z czystej jamy opłucnej (bez skażenia treścią żołądkowo-jelitową z pękniętej przepony) jest jałowa i idealnie zoptymalizowana immunologicznie. Autotransfuzja natychmiast uzupełnia utraconą objętość krwinek bez ryzyka niezgodności serologicznej." },
          { text: "Podanie krwi wypływającej z rany doustnie do wypicia", correct: false, feedback: "Niedorzeczne i nieskuteczne." },
          { text: "Przetoczenie krwi pacjenta sąsiadowi z sali", correct: false, feedback: "Niedopuszczalne." },
          { text: "Wylanie krwi do kosza bez pomiaru", correct: false, feedback: "Należy dokładnie zmierzyć objętość drenażu." }
        ]
      },
      {
        num: 6,
        title: "Późne powikłanie nieodprowadzonego krwiaka – Zorganizowany krwiak i ropniak",
        task: "Co może się stać, jeśli krwiak opłucnej nie zostanie całkowicie zdrenowany we wczesnej fazie pourazowej?",
        options: [
          { text: "Dochodzi do zakażenia bakteryjnego krwiaka (ropniak opłucnej - empyema) oraz organizacji włóknika tworzącego gruby pancerz opłucnowy uniemożliwiający rozprężenie płuca (fibrothorax), co wymaga późniejszej dekortykacji płuca", correct: true, feedback: "Prawidłowo! Skrzepła krew w ciepłej jamie opłucnej jest doskonałą pożywką dla bakterii. Brak skutecznej ewakuacji prowadzi do ropniaka opłucnej oraz zwłóknienia (fibrothorax) z uwięzieniem płuca ('trapped lung')." },
          { text: "Krew zamienia się w nową nerkę", correct: false, feedback: "Absurd." },
          { text: "Płuco zyskuje podwójną pojemność", correct: false, feedback: "Płuco ulega trwałej niedodmie." },
          { text: "Wytwarza się odporność na zakażenia", correct: false, feedback: "Nieprawda." }
        ]
      },
      {
        num: 7,
        title: "Dostęp operacyjny – Torakotomia przednio-boczna ratunkowa",
        task: "Jaki dostęp chirurgiczny wykonuje się na sali operacyjnej / na Trauma Room w przypadku konieczności natychmiastowej torakotomii ratunkowej?",
        options: [
          { text: "Torakotomię przednio-boczną w IV lub V przestrzeni międzyżebrowej (z możliwością przedłużenia przez mostek do torakotomii obustronnej typu 'clamshell')", correct: true, feedback: "Prawidłowo! Torakotomia przednio-boczna (anterolateral thoracotomy) w IV/V przestrzeni międzyżebrowej po stronie urazu umożliwia najszybsze wejście do klatki piersiowej (<1-2 minuty) u pacjenta leżącego na plecach, z możliwością natychmiastowego poszerzenia przez mostek (clamshell) dla odsłonięcia serca i obu jam opłucnowych." },
          { text: "Niewielkie cięcie na czole", correct: false, feedback: "Brak dostępu do klatki." },
          { text: "Laparotomię poprzeczną w podbrzuszu", correct: false, feedback: "To dostęp do miednicy, nie do klatki piersiowej." },
          { text: "Tylno-boczną torakotomię z resekcją trzech żeber w ułożeniu na boku u niestabilnego pacjenta", correct: false, feedback: "Układanie niestabilnego chorego na boku grozi zatrzymaniem krążenia; rezerwuje się ją dla planowych zabiegów torakochirurgicznych." }
        ]
      },
      {
        num: 8,
        title: "Podsumowanie postępowania w tym przypadku",
        task: "U naszego pacjenta wypłynęło natychmiast 1650 ml krwi, a w kolejnej godzinie kolejne 280 ml. Jakie jest natychmiastowe postępowanie?",
        options: [
          { text: "Natychmiastowe przekazanie chorego na blok operacyjny do pilnej torakotomii w celu chirurgicznego zaopatrzenia źródła krwawienia (podkłucie uszkodzonej tętnicy międzyżebrowej) wraz z kontynuacją transfuzji krwi", correct: true, feedback: "Prawidłowo! Spełnione zostały oba kryteria operacyjne (>1500 ml jednorazowo oraz >200 ml/h). Zwlekanie z torakotomią doprowadziłoby do zgonu pacjenta z wykrwawienia." },
          { text: "Zaciśnięcie drenu kleszczykami i obserwacja do rana", correct: false, feedback: "Zaciśnięcie drenu zamieni krwiaka w krwiaka prężnego ze zgonem chorego!" },
          { text: "Wypisanie do domu na żądanie", correct: false, feedback: "Błąd zagrażający życiu." },
          { text: "Podanie witaminy C w kroplówce", correct: false, feedback: "Nieskuteczne." }
        ]
      }
    ],
    pathoNodes: [
      { id: "p1", label: "Rana kłuta i uszkodzenie tętnicy", desc: "Przecięcie tętnicy międzyżebrowej w V przestrzeni powoduje gwałtowny wypływ krwi pod wysokim ciśnieniem." },
      { id: "p2", label: "Akumulacja krwi w jamie opłucnej", desc: "Zapadanie płuca prawego, utrata >1500 ml krwi krążącej i wstrząs hipowolemiczny." },
      { id: "p3", label: "Wskazanie do torakotomii ratunkowej", desc: "Kryterium >1500 ml wstępnie lub >200 ml/h wymaga bezpośredniego podkłucia krwawiącego naczynia na bloku." }
    ],
    diffTable: [
      { disease: "Masywny krwiak opłucnej (Haemothorax)", feature: "Stłumiony wypuk, cisza osłuchowa, zapadnięte żyły szyjne, >1500 ml krwi w drenie, wstrząs hipowolemiczny" },
      { disease: "Odma prężna (Tension pneumothorax)", feature: "Bębenkowy wypuk, cisza osłuchowa, poszerzone żyły szyjne, przesunięcie tchawicy, wstrząs obstrukcyjny" },
      { disease: "Tamponada osierdzia", feature: "Triada Becka, szmery oddechowe symetryczne, płyn w worku osierdziowym w USG, mała objętość krwi w klatce" },
      { disease: "Niedodma płuca", feature: "Stłumienie wypuku, brak szmerów, ale tchawica przemieszczona W STRONĘ chorego, brak wstrząsu" }
    ],
    dutySummary: "Pacjent 30-letni po ranie kłutej klatki piersiowej z masywnym krwiakiem prawej jamy opłucnej i wstrząsem hipowolemicznym. Wprowadzono grube dreny opłucnowe (32 Fr) uzyskując natychmiastową ewakuację 1650 ml krwi oraz dalszy drenaż 280 ml/h. Z uwagi na spełnienie kryteriów ATLS pacjenta natychmiast przekazano na blok operacyjny do torakotomii ratunkowej, gdzie podkłuto uszkodzoną prawą tętnicę międzyżebrową i opanowano krwawienie.",
    lekQuestions: [
      {
        question: "Które z poniższych kryteriów drenażu jamy opłucnej stanowi bezwzględne wskazanie do pilnej torakotomii ratunkowej u pacjenta po urazie klatki piersiowej?",
        options: [
          "Wstępna ewakuacja krwi w objętości przekraczającej 1500 ml bezpośrednio po założeniu drenu",
          "Wypływ 100 ml krwi w ciągu pierwszych 24 godzin",
          "Obecność pęcherzyków powietrza w układzie drenażowym przez 10 minut",
          "Ewakuacja 300 ml płynu surowiczego o żółtym zabarwieniu",
          "Brak wypływu jakiegokolwiek płynu z jamy opłucnej"
        ],
        answer: "Wstępna ewakuacja krwi w objętości przekraczającej 1500 ml bezpośrednio po założeniu drenu",
        explanation: "Zgodnie z wytycznymi ATLS ewakuacja >1500 ml krwi bezpośrednio po założeniu drenażu lub stałe krwawienie >200–250 ml/godzinę przez kolejne 2–4 godziny jest wskazaniem do natychmiastowej torakotomii."
      },
      {
        question: "Różnicując w badaniu fizykalnym krwiaka opłucnej od odmy prężnej, za krwiakiem przemawia:",
        options: [
          "Stłumiony odgłos opukowy oraz zapadnięte żyły szyjne",
          "Wypuk bębenkowy oraz poszerzenie żył szyjnych",
          "Głośny świst krtaniowy (stridor)",
          "Obecność szmeru skurczowego nad koniuszkiem serca",
          "Wyłącznie obecność rozedmy podskórnej"
        ],
        answer: "Stłumiony odgłos opukowy oraz zapadnięte żyły szyjne",
        explanation: "Obecność krwi w jamie opłucnej powoduje stłumienie odgłosu opukowego, a utrata krwi prowadzi do hipowolemii objawiającej się zapadnięciem żył szyjnych."
      },
      {
        question: "Prawidłowym miejscem wprowadzenia drenu do jamy opłucnej w celu ewakuacji krwiaka jest:",
        options: [
          "V przestrzeń międzyżebrowa w linii pachowej środkowej/przedniej, tuż nad górnym brzegiem żebra",
          "II przestrzeń międzyżebrowa w linii środkowoobojczykowej, tuż pod dolnym brzegiem żebra",
          "VIII przestrzeń międzyżebrowa w linii przykręgosłupowej",
          "I przestrzeń międzyżebrowa pod obojczykiem",
          "Bezpośrednio przez rękojeść mostka"
        ],
        answer: "V przestrzeń międzyżebrowa w linii pachowej środkowej/przedniej, tuż nad górnym brzegiem żebra",
        explanation: "Dren wprowadza się w V przestrzeni międzyżebrowej w linii pachowej przedniej lub środkowej (tzw. trójkąt bezpieczeństwa), prowadząc go nad górnym brzegiem dolnego żebra, by uniknąć uszkodzenia pęczka naczyniowo-nerwowego międzyżebrowego."
      }
    ],
    flashcards: [
      { front: "Jakie objętości drenażu w urazowym krwiaku opłucnej kwalifikują do torakotomii ratunkowej?", back: "1. Ewakuacja >1500 ml krwi bezpośrednio po zaoczkowaniu drenu LUB 2. Krwawienie >200–250 ml/h przez kolejne 2–4 godziny." },
      { front: "Jak odróżnić krwiaka opłucnej od odmy prężnej w badaniu fizykalnym?", back: "Krwiak: stłumiony wypuk + zapadnięte żyły szyjne (hipowolemia). Odma prężna: wypuk bębenkowy + poszerzone żyły szyjne." },
      { front: "Gdzie i jak wprowadza się dren opłucnowy w krwiaku?", back: "W V przestrzeni międzyżebrowej w linii pachowej środkowej/przedniej (trójkąt bezpieczeństwa), tuż NAD górnym brzegiem żebra." },
      { front: "Dlaczego dren wprowadza się nad górnym brzegiem żebra?", back: "Aby uniknąć uszkodzenia tętnicy, żyły i nerwu międzyżebrowego, które biegną w bruździe pod DOLNYM brzegiem żebra." },
      { front: "Czym grozi pozostawienie niewyprowadzonego krwiaka w jamie opłucnej?", back: "Ropniakiem opłucnej (empyema) oraz zwłóknieniem i pancerzem opłucnowym (fibrothorax) więżącym płuco." }
    ]
  }
];

async function run() {
  console.log("Processing cases: " + cases.map(c => c.id).join(", ") + "...");
  for (const caseData of cases) {
    const jsonString = JSON.stringify(caseData, null, 2);
    const encrypted = await encryptStringAes(jsonString, PASSWORD);
    const outPath = `cases/${caseData.filename}`;
    fs.writeFileSync(outPath, JSON.stringify(encrypted, null, 2), 'utf8');
    console.log(`Encrypted & saved ${outPath}`);
  }
  console.log("Batch 147-150 finished successfully.");
}
run().catch(console.error);

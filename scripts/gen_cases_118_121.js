const fs = require('fs');
const { encryptStringAes } = require('./encrypt_case.js');
const PASSWORD = '@LEKSzymon28111999';

const cases = [
  // 118: Drgawki gorączkowe proste vs złożone
  {
    id: 118,
    filename: "118_drgawki_goraczkowe.json",
    dept: "Pediatria",
    shortTitle: "18-miesięczny chłopiec – Uogólniony napad toniczno-kloniczny przy gorączce 39.4°C (Drgawki gorączkowe)",
    diagnosisTitle: "Proste drgawki gorączkowe (Febrile Seizures) u 18-miesięcznego dziecka w przebiegu infekcji wirusowej",
    vitals: [
      { label: "HR", val: "135/min", sub: "Tachykardia ponapadowa/gorączkowa", status: "warn" },
      { label: "BP", val: "90/58 mmHg", sub: "Prawidłowe", status: "ok" },
      { label: "SpO2", val: "98%", sub: "Prawidłowa", status: "ok" },
      { label: "RR", val: "26/min", sub: "Prawidłowa", status: "ok" },
      { label: "Temp", val: "39.4°C", sub: "Wysoka gorączka", status: "bad" }
    ],
    vitalsObj: { hr: 135, bp: "90/58", spo2: 98, rr: 26, temp: 39.4 },
    story: "18-miesięczny chłopiec został przywieziony przez ZRM na SOR po pierwszym w życiu napadzie drgawek. Przed 3 godzinami u dziecka nagle wzrosła temperatura do 39.5°C w przebiegu ostrego nieżytu nosa. Około 30 minut temu, podczas snu, dziecko zesztywniało, wywróciło gałki oczne do góry, a następnie wystąpiły symetryczne, uogólnione drgania kloniczne wszystkich czterech kończyn z sinicą wokół ust i ślinotokiem. Napad trwał około 2–3 minut i ustąpił samoistnie przed przyjazdem karetki. W chwili badania na SOR: dziecko podsypiające, wybudzalne, reaguje na głos rodziców, bez deficytów ogniskowych (porusza symetrycznie wszystkimi kończynami). Ciemię przednie zarośnięte. Brak sztywności karku i objawów oponowych. Gardło lekko zaczerwienione, wyciek surowiczy z nosa.",
    labs: [
      {
        category: "Morfologia i biochemia CITO",
        items: [
          { name: "Glukoza we krwi (glukometr)", val: "98 mg/dL", norm: "70–100 mg/dL", flag: "N" },
          { name: "Sód (Na+) / Potas (K+)", val: "138 / 4.2 mmol/L", norm: "135–145 / 3.5–5.0", flag: "N" },
          { name: "Wapń zjonizowany", val: "1.22 mmol/L", norm: "1.15–1.30 mmol/L", flag: "N" },
          { name: "Leukocyty (WBC) / CRP", val: "9.2 G/L / 6.4 mg/L", norm: "6.0–17.5 / < 5.0", flag: "N" }
        ]
      },
      {
        category: "Badanie moczu i diagnostyka różnicowa",
        items: [
          { name: "Badanie ogólne moczu", val: "Prawidłowe, brak cech ZUM", norm: "Prawidłowe", flag: "N" },
          { name: "Ocena objawów oponowych", val: "Ujemne (brak sztywności karku, objaw Brudzińskiego ujemny)", norm: "Ujemne", flag: "N" },
          { name: "Wskazania do punkcji lędźwiowej (LP)", val: "Brak wskazań u dziecka >12 m.ż. z prostym napadem i brakiem cech ZOMR", norm: "Brak", flag: "N" }
        ]
      },
      {
        category: "Neuroobrazowanie i EEG",
        items: [
          { name: "Badanie EEG / TK głowy", val: "Niewskazane w prostych drgawkach gorączkowych", norm: "Niewskazane", flag: "N" },
          { name: "Ocena neurologiczna", val: "Brak niedowładu Todda, odruchy symetryczne", norm: "Prawidłowa", flag: "N" }
        ]
      }
    ],
    steps: [
      {
        num: 1,
        title: "Definicja i różnicowanie: drgawki proste vs złożone",
        task: "Napad u 18-miesięcznego dziecka był uogólniony, trwał poniżej 15 minut (2-3 minuty), wystąpił jeden raz w ciągu 24 godzin i nie pozostawił deficytów neurologicznych. Jak klasyfikujesz te drgawki?",
        options: [
          { text: "Proste drgawki gorączkowe (Simple Febrile Seizures)", correct: true, feedback: "Prawidłowo! Kryteria prostych drgawek gorączkowych: napad uogólniony (nieogniskowy), czas trwania < 15 minut, pojedynczy epizod w ciągu 24 godzin (brak nawrotu w tej samej dobie) oraz brak przejściowego niedowładu ponapadowego (brak niedowładu Todda). Dotyczą dzieci w wieku 6–60 miesięcy." },
          { text: "Złożone drgawki gorączkowe", correct: false, feedback: "Błąd! Złożone drgawki gorączkowe trwają > 15 minut, mają charakter ogniskowy (jednostronny), nawracają w ciągu 24 godzin lub pozostawiają niedowład Todda." },
          { text: "Stan padaczkowy z definicji", correct: false, feedback: "Błąd! Stan padaczkowy drgawkowy rozpoznaje się przy czasie trwania drgawek >= 5 minut." },
          { text: "Zapalenie opon mózgowo-rdzeniowych", correct: false, feedback: "Błąd! Dziecko jest w pełni przytomne, brak objawów oponowych i cech neuroinfekcji." }
        ]
      },
      {
        num: 2,
        title: "Kwalifikacja do nakłucia lędźwiowego (LP)",
        task: "Kiedy u gorączkującego dziecka z drgawkami bezwzględnie konieczne jest wykonanie punkcji lędźwiowej?",
        options: [
          { text: "Przy obecności objawów oponowych, podejrzeniu neuroinfekcji (ZOMR), u niemowląt <6.–12. miesiąca życia nieszczepionych przeciw Hib i S. pneumoniae lub po wcześniejszym leczeniu antybiotykiem maskującym objawy ZOMR", correct: true, feedback: "Dokładnie tak! Wskazania do LP wg AAP: objawy oponowe, zaburzenia świadomości po ustąpieniu fazy ponapadowej, niemowlęta <12 m.ż. (zwłaszcza <6 m.ż. lub nieszczepione przeciw Hib/pneumokokom) oraz wcześniejsza antybiotykoterapia, która może maskować objawy ropnego ZOMR." },
          { text: "U każdego dziecka z jakimikolwiek drgawkami gorączkowymi bez wyjątku", correct: false, feedback: "Błąd! Rutynowa punkcja lędźwiowa w typowych prostych drgawkach gorączkowych u zaszczepionego dziecka >12 m.ż. jest niewskazana." },
          { text: "Tylko wtedy, gdy dziecko ma biegunkę", correct: false, feedback: "Brak związku." },
          { text: "Nakłucie lędźwiowe jest całkowicie zakazane u dzieci do 5. r.ż.", correct: false, feedback: "Bzdura medyczna." }
        ]
      },
      {
        num: 3,
        title: "Wskazania do neuroobrazowania (TK/MR) i EEG",
        task: "Czy u 18-miesięcznego dziecka z pierwszym w życiu, niepowikłanym prostym napadem drgawek gorączkowych należy wykonać pilną tomografię komputerową głowy lub badanie EEG?",
        options: [
          { text: "Nie – u dziecka z prostym napadem drgawek gorączkowych w dobrym stanie ogólnym badania neuroobrazowe (TK/MR) oraz rutynowe EEG NIE SĄ WSKAZANE", correct: true, feedback: "Znakomicie! Wytyczne AAP i Polskiego Towarzystwa Neurologów Dziecięcych jednoznacznie podkreślają: proste drgawki gorączkowe nie wymagają rutynowego EEG ani TK głowy (brak wpływu na postępowanie i rokowanie, zbędna sedacja i narażenie na promieniowanie rentgenowskie)." },
          { text: "Tak – pilna tomografia komputerowa jest bezwzględnie wymagana w ciągu 1 godziny", correct: false, feedback: "Błąd! Naraża dziecko na niepotrzebne promieniowanie jonizujące." },
          { text: "Tak – EEG w fazie ostrej ma 100% czułość w rozpoznawaniu padaczki", correct: false, feedback: "Błąd! EEG wykonane w trakcie gorączki wykazuje nieswoiste zwolnienie fal i nie prognozuje ryzyka padaczki." },
          { text: "Należy wykonać arteriografię naczyń mózgowych", correct: false, feedback: "Badanie skrajnie inwazyjne i bezpodstawne." }
        ]
      },
      {
        num: 4,
        title: "Postępowanie w ostrym, przedłużającym się napadzie",
        task: "Gdyby napad drgawek gorączkowych nie ustąpił samoistnie i trwał powyżej 5 minut, jaki lek i jaką drogą jest lekiem pierwszego rzutu do przerwania napadu?",
        options: [
          { text: "Benzodiazepina: diazepam doodbytniczo (0.5 mg/kg mc., mikrowlewka) lub midazolam na błonę śluzową policzka (0.2–0.3 mg/kg mc.)", correct: true, feedback: "Doskonale! W napadzie trwającym >5 minut lekiem z wyboru poza szpitalem jest midazolam podpoliczkowo (oromucosal) lub diazepam doodbytniczo (wlewka). W warunkach szpitalnych przy wkłuciu i.v. lekiem z wyboru jest lorazepam lub diazepam i.v." },
          { text: "Fenytoina doustnie", correct: false, feedback: "Fenytoina w tabletkach nie nadaje się do przerywania ostrego napadu drgawkowego." },
          { text: "Wstrzyknięcie domięśniowe paracetamolu", correct: false, feedback: "Leki przeciwgorączkowe nie przerywają trwającego napadu drgawkowego!" },
          { text: "Włożenie metalowej łyżki między zęby dziecka", correct: false, feedback: "Karygodny błąd pierwszej pomocy! Grozi wyłamaniem zębów i aspiracją do dróg oddechowych!" }
        ]
      },
      {
        num: 5,
        title: "Rola leków przeciwgorączkowych w zapobieganiu nawrotom drgawek",
        task: "Czy regularne podawanie paracetamolu lub ibuprofenu podczas kolejnych infekcji gorączkowych zapobiega wystąpieniu kolejnego napadu drgawek gorączkowych?",
        options: [
          { text: "Nie – badania kliniczne wykazały, że leki przeciwgorączkowe poprawiają komfort dziecka, ale NIE ZAPOBIEGAJĄ wystąpieniu napadu drgawek gorączkowych", correct: true, feedback: "Kluczowy fakt na LEK! Drgawki gorączkowe zależą od tempa wzrostu temperatury i niedojrzałości OUN. Leki przeciwgorączkowe podaje się w celu poprawy samopoczucia dziecka, jednak nie wykazano ich skuteczności w redukcji ryzyka wystąpienia kolejnego napadu!" },
          { text: "Tak – regularne podawanie paracetamolu gwarantuje 100% ochronę przed drgawkami", correct: false, feedback: "Fałszywe przekonanie obalone w próbach z randomizacją." },
          { text: "Zaleca się naprzemienne podawanie aspiryny z ibuprofenem co 2 godziny", correct: false, feedback: "Kardynalny błąd! Aspiryna grozi zespołem Reye'a!" },
          { text: "Należy dziecko obkładać lodem i podawać furosemid", correct: false, feedback: "Groźne dla dziecka wychłodzenie i odwodnienie." }
        ]
      },
      {
        num: 6,
        title: "Ryzyko nawrotu drgawek gorączkowych i rozwoju padaczki",
        task: "Rodzice są przerażeni, że ich dziecko zachoruje na padaczkę. Jakie jest ryzyko rozwoju padaczki po pojedynczym napadzie prostych drgawek gorączkowych?",
        options: [
          { text: "Ryzyko rozwoju padaczki jest nieznacznie wyższe niż w populacji ogólnej i wynosi zaledwie około 1–2% (wobec 0.5–1% w populacji ogólnej)", correct: true, feedback: "Świetnie! Po prostych drgawkach gorączkowych ryzyko padaczki wynosi ok. 1-2%. Ryzyko nawrotu SAMYCH drgawek gorączkowych przy kolejnych gorączkach wynosi ok. 30% (wyższe u dzieci <12 m.ż. i z obciążonym wywiadem rodzinnym). Rokowanie rozwojowe jest doskonałe." },
          { text: "Ryzyko padaczki wynosi 95%", correct: false, feedback: "Nieuzasadnione straszenie rodziców, nieprawda." },
          { text: "Dziecko z pewnością będzie miało opóźnienie rozwoju umysłowego", correct: false, feedback: "Proste drgawki gorączkowe nie powodują uszkodzenia mózgu ani deficytów intelektualnych." },
          { text: "Drgawki gorączkowe to po prostu ukryty guz mózgu", correct: false, feedback: "Nonsens medyczny." }
        ]
      },
      {
        num: 7,
        title: "Przewlekła profilaktyka przeciwpadaczkowa",
        task: "Czy po przebyciu prostych drgawek gorączkowych zaleca się przewlekłe stosowanie leków przeciwpadaczkowych (np. kwasu walproinowego lub karbamazepiny)?",
        options: [
          { text: "Nie – przewlekłe leczenie przeciwpadaczkowe jest bezwzględnie NIEWSKAZANE z uwagi na łagodny charakter drgawek i działania niepożądane leków", correct: true, feedback: "Prawidłowo! Zarówno AAP, jak i PTND odradzają przewlekłą farmakoterapię przeciwpadaczkową (walproiniany, fenobarbital). Działania niepożądane leków (hepatotoksyczność, zaburzenia funkcji poznawczych) znacznie przewyższają jakiekolwiek potencjalne korzyści." },
          { text: "Tak – należy podawać fenobarbital przez 5 lat", correct: false, feedback: "Przestarzałe, szkodliwe postępowanie zaniechane dekady temu." },
          { text: "Zaleca się codzienną profilaktykę fenytoiną do 18. roku życia", correct: false, feedback: "Błąd kardynalny." },
          { text: "Należy wdrożyć dietę ketogenną od zaraz", correct: false, feedback: "Dieta ketogenna jest metodą leczenia padaczki lekoopornej, nie prostych drgawek gorączkowych." }
        ]
      },
      {
        num: 8,
        title: "Edukacja rodziców i postępowanie domowe",
        task: "Jakie zalecenia pierwszej pomocy przekażesz rodzicom na wypadek ponownego napadu drgawek w domu?",
        options: [
          { text: "Ułożyć dziecko na boku w pozycji bezpiecznej na miękkim podłożu, zabezpieczyć przed urazem, nie wkładać niczego do ust, mierzyć czas napadu i wezwać ZRM (tel. 112/999), jeśli napad trwa > 5 minut (lub podać przepisany midazolam/diazepam)", correct: true, feedback: "Znakomicie! Prawidłowa pierwsza pomoc: pozycja bezpieczna, drożność dróg oddechowych, ochrona przed urazem mechanicznym, bezwzględny zakaz krępowania ruchów i wkładania przedmiotów do ust. Jeśli napad trwa >5 min – podać lek doraźny (midazolam podpoliczkowo lub diazepam wlewka doodbytnicza) i wezwać pogotowie." },
          { text: "Włożyć trzonek łyżki do ust, aby zapobiec 'połknięciu języka'", correct: false, feedback: "Groźny błąd – nie można połknąć własnego języka, a wkładanie przedmiotów łamie zęby i grozi zadławieniem!" },
          { text: "Podać doustnie tabletkę paracetamolu w trakcie drgawek", correct: false, feedback: "Kategorycznie zakazane podawanie leków doustnych w trakcie drgawek z powodu ryzyka zachłyśnięcia!" },
          { text: "Polać głowę dziecka lodowatą wodą w trakcie napadu", correct: false, feedback: "Niebezpieczne i nieskuteczne." }
        ]
      }
    ],
    pathoNodes: [
      {
        title: "1. Niedojrzałość OUN i obniżony próg drgawkowy",
        desc: "Mózg dziecka między 6. a 60. miesiącem życia charakteryzuje się zwiększoną pobudliwością neuronalną, niedojrzałością układu GABA-ergicznego i wzmożoną wrażliwością na nagły skok temperatury.",
        drugTarget: "Okresowe występowanie – drgawki gorączkowe samoistnie ustępują wraz z dojrzewaniem mózgu po 5. r.ż."
      },
      {
        title: "2. Pirogeny endogenne i cytokiny w OUN",
        desc: "W trakcie infekcji cytokiny prozapalne (IL-1beta, TNF-alfa, IL-6) działają na ośrodek termoregulacji w podwzgórzu oraz bezpośrednio zwiększają pobudliwość synaptyczną neuronów kory mózgowej.",
        drugTarget: "Paracetamol lub ibuprofen (poprawa komfortu dziecka, choć nie zapobiegają drgawkom)"
      },
      {
        title: "3. Faza napadu i powrót do normy",
        desc: "Wyładowanie synchroniczne neuronów prowadzi do uogólnionego napadu toniczno-klonicznego, po którym następuje faza wyciszenia i sen ponapadowy bez trwałych ubytków neurologicznych.",
        drugTarget: "Midazolam na śluzówkę policzka lub diazepam p.r. wyłącznie w napadzie przedłużającym się >5 min"
      }
    ],
    dutySummary: "Proste drgawki gorączkowe (6–60 m.ż.) to napad uogólniony trwający <15 min, pojedynczy w ciągu 24h, bez deficytu ponapadowego. Nie wymagają rutynowego EEG ani TK głowy! Leki przeciwgorączkowe NIE zapobiegają drgawkom. LP wskazana przy podejrzeniu ZOMR lub u nieszczepionych niemowląt <12 m.ż. W napadzie >5 min podaj midazolam podpoliczkowo lub diazepam doodbytniczo. Ryzyko padaczki po prostych drgawkach wynosi zaledwie 1–2%.",
    diffTable: [
      { disease: "Złożone drgawki gorączkowe", diff: "Napad ogniskowy (jednostronny), czas trwania > 15 minut, wielokrotne epizody w ciągu 24h lub obecność niedowładu Todda.", test: "Czas trwania, asymetria, nawrotowość w 24h -> wskazanie do pilnej diagnostyki." },
      { disease: "Zapalenie opon mózgowo-rdzeniowych (ZOMR)", diff: "Obecne objawy oponowe, zaburzenia świadomości po ustąpieniu fazy ponapadowej, wybroczyny na skórze, tętniące ciemię.", test: "Nakłucie lędźwiowe i badanie płynu mózgowo-rdzeniowego." },
      { disease: "Drgawki hipoglikemiczne", diff: "Występują w hipoglikemii (<50 mg/dL), pocenie się, bladość, tachykardia, ustępują natychmiast po dożylnym podaniu glukozy.", test: "Pomiar glikemii glukometrem CITO." },
      { disease: "Dreszcze gorączkowe (rigor)", diff: "Drobne drżenia mięśniowe w trakcie narastania temperatury, dziecko jest w PEŁNI PRZYTOMNE i nawiązuje logiczny kontakt.", test: "Ocena stanu świadomości w trakcie epizodu (przytomne vs nieprzytomne)." }
    ],
    lekQuestions: [
      {
        question: "Do cech prostych drgawek gorączkowych u dzieci NALEŻY:",
        options: [
          "Czas trwania powyżej 20 minut.",
          "Ogniskowy (częściowy) charakter napadu.",
          "Wystąpienie napadu uogólnionego trwającego krócej niż 15 minut, pojedynczego w ciągu 24 godzin, u dziecka w wieku 6–60 miesięcy.",
          "Obecność przemijającego niedowładu kończyny po napadzie (niedowład Todda).",
          "Występowanie wyłącznie u noworodków w pierwszych 7 dobach życia."
        ],
        correct: 2,
        explanation: "Proste drgawki gorączkowe charakteryzują się: wiekiem dziecka między 6. a 60. miesiącem życia, uogólnionym charakterem wyładowań (symetryczne drżenia kloniczne lub toniczno-kloniczne), czasem trwania poniżej 15 minut, pojedynczym wystąpieniem w ciągu 24 godzin oraz brakiem jakichkolwiek ubytkowych objawów neurologicznych po napadzie (brak niedowładu Todda)."
      },
      {
        question: "Wskaż lek z wyboru i drogę jego podania w warunkach przedszpitalnych w celu przerwania przedłużającego się napadu drgawek gorączkowych trwającego powyżej 5 minut u małego dziecka:",
        options: [
          "Midazolam w roztworze podany na błonę śluzową policzka (lub diazepam we wlewce doodbytniczej).",
          "Kwas walproinowy doustnie w syropie.",
          "Paracetamol w czopku doodbytniczym.",
          "Fenobarbital w powolnym wlewie dożylnym.",
          "Adrenalina domięśniowo."
        ],
        correct: 0,
        explanation: "W warunkach pozaszpitalnych lekiem pierwszego rzutu do przerwania napadu drgawkowego trwającego >5 minut u dziecka jest midazolam w postaci roztworu na błonę śluzową policzka (oromucosal) lub diazepam podany w mikrowlewce doodbytniczo (rectiole). Leki te charakteryzują się szybkim wchłanianiem i wysoką skutecznością."
      },
      {
        question: "Wskaż PRAWDZIWE stwierdzenie dotyczące profilaktyki i rokowania u dzieci z prostymi drgawkami gorączkowymi:",
        options: [
          "Profilaktyczne podawanie leków przeciwgorączkowych (paracetamolu/ibuprofenu) całkowicie zapobiega wystąpieniu napadów drgawek w trakcie gorączki.",
          "Po przebyciu prostego napadu drgawek gorączkowych konieczne jest włączenie przewlekłej terapii karbamazepiną przez minimum 2 lata.",
          "Ryzyko rozwoju padaczki u dzieci po przebyciu prostych drgawek gorączkowych wynosi zaledwie około 1–2% i jest zbliżone do ryzyka w populacji ogólnej.",
          "U każdego dziecka z prostymi drgawkami gorączkowymi należy wykonać pilną tomografię komputerową głowy z kontrastem.",
          "Drgawki gorączkowe zawsze prowadzą do trwałego upośledzenia rozwoju umysłowego."
        ],
        correct: 2,
        explanation: "Proste drgawki gorączkowe mają doskonałe odległe rokowanie. Ryzyko rozwoju padaczki w przyszłości wynosi zaledwie 1–2% (niewiele więcej niż w populacji ogólnej: ok. 0.5–1%). Leki przeciwgorączkowe nie zapobiegają napadom (zmniejszają dyskomfort dziecka), nie ma wskazań do przewlekłego leczenia przeciwpadaczkowego ani rutynowej neurodiagnostyki obrazowej."
      }
    ],
    flashcards: [
      { q: "Jakie są kryteria prostych drgawek gorączkowych?", a: "Wiek 6–60 m.ż., napad uogólniony, czas trwania <15 min, pojedynczy w ciągu 24h, brak niedowładu Todda.", cat: "Pediatria" },
      { q: "Czym różnią się złożone drgawki gorączkowe od prostych?", a: "Czas trwania >15 min, charakter ogniskowy (asymetryczny), wielokrotne w ciągu 24h lub obecny niedowład po napadzie.", cat: "Pediatria" },
      { q: "Jaki lek przerywa przedłużający się napad drgawek (>5 min) poza szpitalem?", a: "Midazolam na błonę śluzową policzka (0.2–0.3 mg/kg mc.) lub diazepam doodbytniczo (0.5 mg/kg mc.).", cat: "Pediatria" },
      { q: "Czy paracetamol i ibuprofen zapobiegają wystąpieniu drgawek gorączkowych?", a: "NIE – leki przeciwgorączkowe poprawiają komfort dziecka, ale nie zapobiegają napadom drgawek gorączkowych.", cat: "Pediatria" },
      { q: "Jakie jest ryzyko rozwoju padaczki po prostych drgawkach gorączkowych?", a: "Około 1–2% (bardzo niskie, zbliżone do populacji ogólnej).", cat: "Pediatria" }
    ]
  },

  // 119: Wrodzony przerost nadnerczy (WPN, 21-OHD)
  {
    id: 119,
    filename: "119_wpn_przerost_nadnerczy_21ohd.json",
    dept: "Pediatria",
    shortTitle: "2-tygodniowy noworodek – Wymioty, spadek masy ciała, hiponatremia i hiperkaliemia (Wrodzony przerost nadnerczy / WPN)",
    diagnosisTitle: "Wrodzony przerost nadnerczy (Congenital Adrenal Hyperplasia - CAH / WPN) z niedoboru 21-hydroksylazy (postać klasyczna z utratą soli)",
    vitals: [
      { label: "HR", val: "172/min", sub: "Ciężka tachykardia hipowolemiczna", status: "bad" },
      { label: "BP", val: "62/34 mmHg", sub: "Głęboka hipotonia (wstrząs hipowolemiczny)", status: "bad" },
      { label: "SpO2", val: "96%", sub: "Prawidłowa", status: "ok" },
      { label: "RR", val: "48/min", sub: "Oddech kwasiczy", status: "warn" },
      { label: "Temp", val: "36.2°C", sub: "Hipotermia", status: "warn" }
    ],
    vitalsObj: { hr: 172, bp: "62/34", spo2: 96, rr: 48, temp: 36.2 },
    story: "14-dniowy noworodek płci żeńskiej (wg dokumentacji wypisowej ze szpitala położniczego) został przywieziony w stanie ciężkim do oddziału ratunkowego. Matka podaje, że od 4 dni dziecko słabo ssie pierś, jest apatyczne, ma chlustające wymioty po każdym karmieniu i luźne stolce. Masa ciała urodzeniowa wynosiła 3400 g, obecnie 2850 g (ubytek >16%). W badaniu fizykalnym: noworodek podsypiający, wiotki, cechy ciężkiego odwodnienia (zapadnięte ciemię, suche błony śluzowe, wiotka skóra, nawrót kapilarny CRT 4 sekundy), marmurkowata chłodna skóra kończyn. W badaniu narządów płciowych zewnętrznych stwierdza się cechy wirylizacji (obojnacze narządy płciowe): przerost łechtaczki przypominający prącie, częściowy zrost warg sromowych większych imitujący mosznę z brunatną hiperpigmentacją krocza, brak wyczuwalnych jąder w worku mosznowym/wargach sromowych.",
    labs: [
      {
        category: "Elektrolity i gazometria krwi (zespół utraty soli)",
        items: [
          { name: "Sód (Na+)", val: "118 mmol/L (ciężka hiponatremia)", norm: "135–145 mmol/L", flag: "L" },
          { name: "Potas (K+)", val: "7.8 mmol/L (zagrażająca życiu hiperkaliemia)", norm: "3.7–5.5 mmol/L", flag: "H" },
          { name: "Chlorki (Cl-)", val: "84 mmol/L", norm: "96–106 mmol/L", flag: "L" },
          { name: "Glukoza we krwi", val: "48 mg/dL (hipoglikemia)", norm: "60–99 mg/dL", flag: "L" },
          { name: "pH krwi / HCO3- / BE", val: "7.22 / 12 mmol/L / -14 mmol/L (kwasica metaboliczna)", norm: "7.35–7.45 / 22–26 / -2 do +2", flag: "L" }
        ]
      },
      {
        category: "Profil hormonalny nadnerczy i metabolity",
        items: [
          { name: "17-hydroksyprogesteron (17-OHP) w surowicy", val: "185 ng/mL (masywny wzrost)", norm: "< 2.0 ng/mL", flag: "H" },
          { name: "Kortyzol poranny", val: "1.8 ug/dL (głęboki niedobór)", norm: "5–20 ug/dL", flag: "L" },
          { name: "Aldosteron", val: "Niewykrywalny (< 10 pg/mL)", norm: "50–500 pg/mL", flag: "L" },
          { name: "Aktywność reninowa osocza (ARO) / Renina", val: "> 50 ng/mL/h (skrajnie podwyższona)", norm: "2–10 ng/mL/h", flag: "H" },
          { name: "Testosteron / DHEA-S", val: "Wyraźnie podwyższone", norm: "Niskie u noworodka", flag: "H" }
        ]
      },
      {
        category: "Genetyka i USG miednicy mniejszej",
        items: [
          { name: "Kariotyp", val: "46,XX (genetyczna dziewczynka)", norm: "46,XX", flag: "N" },
          { name: "USG miednicy mniejszej", val: "Obecność macicy i jajników, brak jąder w jamie brzusznej i pachwinach", norm: "Prawidłowe narządy żeńskie", flag: "N" },
          { name: "USG nadnerczy", val: "Obustronny przerost kory nadnerczy ('obraz pofałdowany / mózgowaty')", norm: "Prawidłowe", flag: "H" }
        ]
      }
    ],
    steps: [
      {
        num: 1,
        title: "Identyfikacja zagrażającego życiu przełomu nadnerczowego",
        task: "U 2-tygodniowego noworodka z wymiotami, wstrząsem hipowolemicznym, hiponatremią (118 mmol/L), hiperkaliemią (7.8 mmol/L) i hipoglikemią występuje stan bezpośredniego zagrożenia życia. Co jest przyczyną tych zaburzeń?",
        options: [
          { text: "Ostry przełom nadnerczowy w przebiegu wrodzonego przerostu nadnerczy z utratą soli (niedobór 21-hydroksylazy)", correct: true, feedback: "Prawidłowo! Zespół utraty soli (brak aldosteronu -> hiponatremia, hiperkaliemia, kwasica, hipowolemia) w połączeniu z brakiem kortyzolu (hipotonia, hipoglikemia, wstrząs) w 2. tygodniu życia to klasyczny, zagrażający zgonem przełom nadnerczowy w klasycznej postaci WPN." },
          { text: "Przerostowe zwężenie odźwiernika (pylorostenoza)", correct: false, feedback: "Błąd! W pylorostonozie wymioty wywołują ZASADOWICĘ hipochloremiczną z HIPOKALIEMIĄ, a tutaj mamy kwasicę z ciężką HIPERKALIEMIĄ!" },
          { text: "Wstrząs septyczny wywołany przez GBS", correct: false, feedback: "W sepsie może być wstrząs, ale nie ma tak skrajnej hiperkaliemii 7.8 mmol/L z hiponatremią i cechami wirylizacji narządów płciowych." },
          { text: "Cukrzyca noworodkowa", correct: false, feedback: "Błąd – glikemia wynosi 48 mg/dL (hipoglikemia), a nie hiperglikemia." }
        ]
      },
      {
        num: 2,
        title: "Pilne postępowanie ratunkowe w hiperkaliemii i wstrząsie",
        task: "Poziom potasu wynosi 7.8 mmol/L, a ciśnienie tętnicze 62/34 mmHg. Jakie natychmiastowe leczenie resuscytacyjne wdrożysz?",
        options: [
          { text: "Bolus płynowy 0.9% NaCl z 10% glukozą, dożylny glukonian wapnia (ochrona kardiomiocytów) oraz natychmiastowe podanie hydrokortyzonu i.v. w dawce uderzeniowej", correct: true, feedback: "Znakomicie! Priorytetem jest: ochrona serca przed asystolią w hiperkaliemii (10% Calcium gluconicum i.v.), wyrównanie hipowolemii bolusem 0.9% NaCl (bez potasu!), podanie glukozy na hipoglikemię oraz natychmiastowy dożylny hydrokortyzon (zastępuje brakujący kortyzol i działa mineralokortykoidowo w wysokiej dawce)." },
          { text: "Wlew płynu z dodatkiem 40 mmol KCl", correct: false, feedback: "Śmiertelny błąd! Dodanie potasu u pacjenta z potasem 7.8 mmol/L wywoła natychmiastowe zatrzymanie krążenia!" },
          { text: "Podanie dożylne spironolaktonu", correct: false, feedback: "Błąd! Spironolakton blokuje aldosteron i pogłębia hiperkaliemię." },
          { text: "Podanie samej insuliny bez glukozy", correct: false, feedback: "Doprowadzi do śmiertelnej neuroglikopenii u dziecka z glukozą 48 mg/dL." }
        ]
      },
      {
        num: 3,
        title: "Najczęstszy defekt enzymatyczny w WPN",
        task: "Niedobór którego enzymu odpowiada za ponad 90–95% wszystkich przypadków wrodzonego przerostu nadnerczy?",
        options: [
          { text: "21-hydroksylazy (CYP21A2)", correct: true, feedback: "Dokładnie tak! Niedobór 21-hydroksylazy stanowi >90-95% przypadków WPN. Blokuje konwersję 17-OH-progesteronu do 11-deoksykortyzolu (szlak kortyzolu) oraz progesteronu do 11-deoksykortykosteronu (szlak aldosteronu)." },
          { text: "11-beta-hydroksylazy (CYP11B1)", correct: false, feedback: "Odpowiada za ok. 5% przypadków (przebiega z nadciśnieniem tętniczym z powodu kumulacji 11-deoksykortykosteronu DOC!)." },
          { text: "17-alfa-hydroksylazy", correct: false, feedback: "Bardzo rzadki defekt (hipogonadyzm i nadciśnienie)." },
          { text: "Aromatazy łożyskowej", correct: false, feedback: "Brak związku z syntezą kortyzolu." }
        ]
      },
      {
        num: 4,
        title: "Diagnostyczny marker laboratoryjny WPN",
        task: "Jaki metabolit steroidowy gromadzi się w skrajnie wysokich stężeniach przed blokiem enzymatycznym 21-hydroksylazy i służy jako złoty standard w badaniach przesiewowych noworodków?",
        options: [
          { text: "17-hydroksyprogesteron (17-OHP)", correct: true, feedback: "Znakomicie! Zablokowanie 21-hydroksylacji powoduje kumulację substratu – 17-hydroksyprogesteronu (17-OHP). Oznaczenie 17-OHP z suchej kropli krwi na bibule jest podstawą powszechnego badania przesiewowego noworodków w Polsce." },
          { text: "Aldosteron", correct: false, feedback: "Aldosteron leży ZA blokiem i jego poziom jest skrajnie obniżony lub niewykrywalny." },
          { text: "Kortyzol", correct: false, feedback: "Kortyzol leży ZA blokiem i jest głęboko obniżony." },
          { text: "Estradiol", correct: false, feedback: "Nie jest bezpośrednim markerem bloku 21-OHD." }
        ]
      },
      {
        num: 5,
        title: "Patomechanizm wirylizacji narządów płciowych u dziewczynek",
        task: "Dlaczego u noworodka z kariotypem 46,XX w niedoborze 21-hydroksylazy dochodzi do wirylizacji narządów płciowych (rzekome obojnactwo żeńskie)?",
        options: [
          { text: "Brak kortyzolu znosi ujemne sprzężenie zwrotne na przysadkę, co powoduje masywny wyrzut ACTH, stymulację kory nadnerczy i 'ucieczkę' nagromadzonych prekursorów w jedyny otwarty szlak – syntezę androgenów nadnerczowych (androstendion, testosteron)", correct: true, feedback: "Doskonale! Spadek kortyzolu stymuluje przysadkę do ciągłego wydzielania ACTH (przerost nadnerczy). Nadmiar 17-OHP i progesteronu nie może przekształcić się w kortyzol ani aldosteron, więc zostaje przekierowany do szlaku androgenowego, powodując prenatalną wirylizację płodu żeńskiego." },
          { text: "Dochodzi do obecności ukrytego chromosomu Y", correct: false, feedback: "Błąd – kariotyp wynosi 46,XX." },
          { text: "Noworodek wytwarza estrogeny w nadmiarze", correct: false, feedback: "To androgeny (testosteron), a nie estrogeny, wirylizują narządy płciowe." },
          { text: "Wynika to ze zrostu warg sromowych pod wpływem moczu", correct: false, feedback: "Brak wiedzy embriologicznej." }
        ]
      },
      {
        num: 6,
        title: "Dlaczego u chłopców WPN bywa rozpoznawany później?",
        task: "Dlaczego chłopcy (46,XY) z postacią z utratą soli nie wykazują nieprawidłowości narządów płciowych przy urodzeniu i trafiają do szpitala w stanie ciężkiego wstrząsu w 2.–3. tygodniu życia?",
        options: [
          { text: "U chłopców nadmiar androgenów nie zaburza męskiej budowy narządów płciowych zewnętrznych (narządy wyglądają prawidłowo, czasem z lekką hiperpigmentacją), stąd brak podejrzenia wady do momentu wystąpienia przełomu solnego", correct: true, feedback: "Kluczowa pułapka kliniczna! U chłopców narządy płciowe są ukształtowane prawidłowo (męskie). Bez powszechnego skriningu 17-OHP noworodek płci męskiej był wypisywany ze szpitala jako 'zdrowy' i wracał w 2.–3. tygodniu życia w zapaści krążeniowej z błędnym podejrzeniem sepsy lub wady przewodu pokarmowego!" },
          { text: "Chłopcy w ogóle nie chorują na postać z utratą soli", correct: false, feedback: "Błąd – WPN dziedziczy się autosomalnie recesywnie i występuje równie często u obu płci." },
          { text: "U chłopców aldosteron jest produkowany w jądrach", correct: false, feedback: "Jądra nie produkują aldosteronu." },
          { text: "Chłopcy mają fizjologicznie wysoki potas", correct: false, feedback: "Potas 7.8 mmol/L jest śmiertelny dla każdego noworodka." }
        ]
      },
      {
        num: 7,
        title: "Przewlekła substytucja hormonalna",
        task: "Jakie dwa leki hormonalne stanowią podstawę dożywotniej terapii zastępczej u dziecka z klasyczną postacią WPN z utratą soli?",
        options: [
          { text: "Hydrokortyzon (substytucja glikokortykoidowa hamująca ACTH) oraz fludrokortyzon (substytucja mineralokortykoidowa) + suplementacja chlorku sodu (NaCl) w okresie niemowlęcym", correct: true, feedback: "Znakomicie! Hydrokortyzon zastępuje brakujący kortyzol i obniża stężenie ACTH (co hamuje nadprodukcję androgenów). Fludrokortyzon (Cortineff) zastępuje aldosteron, zatrzymując sód i normalizując potas. W 1. roku życia konieczna jest dodatkowa podaż soli kuchennej (NaCl doustnie)." },
          { text: "Deksametazon z furosemidem", correct: false, feedback: "Furosemid nasiliłby utratę soli i zgon!" },
          { text: "Testosteron domięśniowo raz w miesiącu", correct: false, feedback: "Pacjent ma już nadmiar androgenów!" },
          { text: "Spironolakton ze sproszkowaną tarczycą", correct: false, feedback: "Błąd zagrażający życiu." }
        ]
      },
      {
        num: 8,
        title: "Zasady postępowania w stresie (infekcja, gorączka, operacja)",
        task: "Jakie zalecenie dotyczące dawkowania hydrokortyzonu otrzymują rodzice na wypadek ostrej infekcji z gorączką >38.5°C lub zabiegu operacyjnego?",
        options: [
          { text: "Natychmiastowe 2–3-krotne zwiększenie dobowej dawki hydrokortyzonu (tzw. stress dose), a przy wymiotach pilne podanie hydrokortyzonu domięśniowo/dożylnie w szpitalu", correct: true, feedback: "Bardzo dobrze! W warunkach stresu fizjologicznego (gorączka, uraz, zabieg) zapotrzebowanie na glikokortykoidy gwałtownie rośnie. Ponieważ nadnercza pacjenta nie potrafią zwiększyć produkcji kortyzolu, brak podwojenia/potrojenia dawki doprowadzi do ostrego, śmiertelnego przełomu nadnerczowego!" },
          { text: "Całkowite odstawienie hydrokortyzonu na czas gorączki", correct: false, feedback: "Śmiertelny błąd! Odstawienie sterydu w infekcji wywoła natychmiastowy wstrząs i zgon." },
          { text: "Zmniejszenie dawki o połowę", correct: false, feedback: "Błąd zagrażający życiu." },
          { text: "Podanie podwójnej dawki aspiryny", correct: false, feedback: "Aspiryna jest przeciwwskazana u niemowląt." }
        ]
      }
    ],
    pathoNodes: [
      {
        title: "1. Mutacja genu CYP21A2 i blokada 21-hydroksylazy",
        desc: "Defekt enzymu uniemożliwia biosyntezę kortyzolu i aldosteronu w korze nadnerczy, co prowadzi do utraty ujemnego sprzężenia zwrotnego na osi przysadka-nadnercza i masywnego wyrzutu ACTH.",
        drugTarget: "Hydrokortyzon p.o. – substytucja kortyzolu hamująca wydzielanie ACTH i rozrost nadnerczy"
      },
      {
        title: "2. Zespół utraty soli (brak aldosteronu)",
        desc: "Brak aldosteronu w cewkach dalszych nerek uniemożliwia wchłanianie sodu w zamian za potas i wodór, skutkując masywnym nerkowym wydalaniem sodu (hiponatremia), zatrzymaniem potasu (hiperkaliemia) i wstrząsem hipowolemicznym.",
        drugTarget: "Fludrokortyzon (mineralokortykoid) + doustna suplementacja NaCl w diecie niemowlęcia"
      },
      {
        title: "3. Nadprodukcja androgenów i prenatalna wirylizacja",
        desc: "Nadmiar 17-OHP ucieka w szlak syntezy DHEA, androstendionu i testosteronu. U płodów żeńskich (46,XX) wywołuje to wirylizację narządów płciowych (przerost łechtaczki, zrost warg), a u obojga płci przyspieszenie wieku kostnego.",
        drugTarget: "Prawidłowa kontrola 17-OHP i androgenów zapobiegająca przedwczesnemu zarastaniu nasad kości"
      }
    ],
    dutySummary: "Klasyczny WPN z utratą soli (niedobór 21-hydroksylazy) to stan zagrożenia życia w 2. tyg. życia: wymioty, hiponatremia, hiperkaliemia, kwasica metaboliczna i wstrząs hipowolemiczny. U dziewczynek występują obojnacze narządy płciowe (wirylizacja). Markerem w przesiewie i diagnostyce jest 17-OHP. W przełomie: 0.9% NaCl + glukoza + glukonian wapnia i.v. + hydrokortyzon i.v. Dożywotnio: hydrokortyzon + fludrokortyzon + NaCl (podwajanie dawek w stresie!).",
    diffTable: [
      { disease: "Przerostowe zwężenie odźwiernika (pylorostenoza)", diff: "Chlustające wymioty bez żółci, ale zaburzenia elektrolitowe są ODWROTNE: zasadowica metaboliczna hipochloremiczna z HIPOKALIEMIĄ (a nie hiperkaliemią!).", test: "Gazometria i jonogram (hipokaliemia vs hiperkaliemia), USG odźwiernika." },
      { disease: "Sepsa noworodkowa", diff: "Wstrząs, ale brak izolowanego zespołu utraty soli z potasem >7 mmol/L, podwyższone CRP/PCT, brak wirylizacji narządów płciowych.", test: "17-OH-progesteron, prokalcytonina, posiewy krwi." },
      { disease: "Wrodzona wada serca przewodozależna", diff: "Wstrząs po zamknięciu przewodu Botalla w 1.–2. tyg. życia, sinica oporna na tlen, prawidłowe stężenie 17-OHP i brak wirylizacji.", test: "Echo serca CITO, test hiperoksji." },
      { disease: "Niedobór 11-beta-hydroksylazy (rzadka postać WPN)", diff: "Wirylizacja u dziewczynek, ale zamiast hipotonii i utraty soli występuje NADCIŚNIENIE tętnicze i hipokaliemia (akumulacja DOC).", test: "Ciśnienie krwi, stężenie 11-deoksykortyzolu i DOC w surowicy." }
    ],
    lekQuestions: [
      {
        question: "U 2-tygodniowego noworodka z obojnaczymi narządami płciowymi (wirylizacja łechtaczki) stwierdzono chlustające wymioty, odwodnienie, ciśnienie 60/35 mmHg, Na+ 118 mmol/L, K+ 7.6 mmol/L oraz kwasicę metaboliczną. Najbardziej prawdopodobnym rozpoznaniem jest:",
        options: [
          "Przerostowe zwężenie odźwiernika.",
          "Wrodzony przerost nadnerczy z niedoboru 21-hydroksylazy (postać z utratą soli).",
          "Moczówka prosta ośrodkowa.",
          "Zespół nerczycowy wrodzony.",
          "Zakażenie rotawirusowe."
        ],
        correct: 1,
        explanation: "Połączenie wirylizacji zewnętrznych narządów płciowych u noworodka z zespołem utraty soli (ciężka hiponatremia, hiperkaliemia, kwasica metaboliczna, wstrząs hipowolemiczny) występującym typowo w 2.–3. tygodniu życia jest klasycznym obrazem ostrego przełomu nadnerczowego w przebiegu wrodzonego przerostu nadnerczy z niedoboru 21-hydroksylazy."
      },
      {
        question: "Który metabolit steroidowy jest kluczowym markerem diagnostycznym oznaczanym w surowicy krwi oraz w badaniach przesiewowych noworodków w kierunku najczęstszej postaci wrodzonego przerostu nadnerczy?",
        options: [
          "17-hydroksyprogesteron (17-OHP).",
          "Aldosteron.",
          "Kortyzol wolny.",
          "Estradiol.",
          "Kalcytriol."
        ],
        correct: 0,
        explanation: "Niedobór 21-hydroksylazy (stanowiący ponad 90–95% przypadków WPN) blokuje konwersję 17-hydroksyprogesteronu (17-OHP) do 11-deoksykortyzolu. Skutkuje to masywną kumulacją 17-OHP we krwi, co stanowi podstawę diagnostyki laboratoryjnej oraz powszechnego skriningu noworodkowego z suchej kropli krwi."
      },
      {
        question: "Jakie leki stanowią podstawę przewlekłego leczenia substytucyjnego u dziecka z klasyczną postacią wrodzonego przerostu nadnerczy z utratą soli?",
        options: [
          "Hydrokortyzon i fludrokortyzon (oraz suplementacja chlorku sodu w okresie niemowlęcym).",
          "Deksametazon i spironolakton.",
          "Prednizon i furosemid.",
          "Karbamazepina i sól potasowa.",
          "Metoprolol i enalapryl."
        ],
        correct: 0,
        explanation: "Podstawą leczenia klasycznego WPN z utratą soli jest skojarzenie substytucji glikokortykoidowej (hydrokortyzon – uzupełnia niedobór kortyzolu i hamuje nadmierne wydzielanie ACTH z przysadki) oraz substytucji mineralokortykoidowej (fludrokortyzon – uzupełnia brakujący aldosteron i zapobiega ucieczce sodu). U niemowląt konieczna jest również doustna podaż chlorku sodu (NaCl)."
      }
    ],
    flashcards: [
      { q: "Jaki jest najczęstszy defekt enzymatyczny we wrodzonym przeroście nadnerczy (WPN)?", a: "Niedobór 21-hydroksylazy (CYP21A2), odpowiadający za >90–95% przypadków.", cat: "Pediatria" },
      { q: "Jaka triada zaburzeń elektrolitowych i kwasowo-zasadowych cechuje zespół utraty soli w WPN?", a: "Ciężka hiponatremia, zagrażająca życiu hiperkaliemia oraz kwasica metaboliczna.", cat: "Pediatria" },
      { q: "Jaki metabolit bada się w skriningu noworodkowym w kierunku WPN?", a: "17-hydroksyprogesteron (17-OHP).", cat: "Pediatria" },
      { q: "Dlaczego u dziewczynek z WPN dochodzi do wirylizacji narządów płciowych?", a: "Brak kortyzolu wyzwala nadmiar ACTH, a nagromadzone prekursory (17-OHP) uciekają w szlak syntezy androgenów nadnerczowych.", cat: "Pediatria" },
      { q: "Co należy zrobić z dawką hydrokortyzonu u pacjenta z WPN w trakcie ostrej infekcji z gorączką?", a: "Zwiększyć dawkę 2–3-krotnie (tzw. stress dose), aby zapobiec przełomowi nadnerczowemu.", cat: "Pediatria" }
    ]
  },

  // 120: Cukrzyca typu 1 / DKA u dziecka
  {
    id: 120,
    filename: "120_cukrzyca_t1_dka_dziecko.json",
    dept: "Pediatria",
    shortTitle: "8-letnia dziewczynka – Oddech Kussmaula, zapach acetonu, odwodnienie i kwasica ketonowa (Debiut cukrzycy t. 1 / DKA)",
    diagnosisTitle: "Cukrzyca typu 1 (Diabetes Mellitus Typ 1) debiutująca kwasicą ketonową (Diabetic Ketoacidosis - DKA)",
    vitals: [
      { label: "HR", val: "136/min", sub: "Tachykardia kompensacyjna", status: "warn" },
      { label: "BP", val: "86/52 mmHg", sub: "Hipotonia ortostatyczna", status: "warn" },
      { label: "SpO2", val: "99%", sub: "Prawidłowa", status: "ok" },
      { label: "RR", val: "36/min", sub: "Głęboki, przyspieszony oddech Kussmaula", status: "bad" },
      { label: "Temp", val: "36.6°C", sub: "Prawidłowa", status: "ok" }
    ],
    vitalsObj: { hr: 136, bp: "86/52", spo2: 99, rr: 36, temp: 36.6 },
    story: "8-letnia dotychczas zdrowa dziewczynka została przywieziona na SOR z powodu postępującego od 3 dni osłabienia, bólów brzucha, nudności i wymiotów oraz senności. W wywiadzie zebranym od rodziców: od około 4–5 tygodni dziecko piło ogromne ilości płynów (polidypsja do 4 litrów dziennie), wstawało wielokrotnie w nocy do toalety, pojawiło się moczenie nocne (wtórne enuresis), a mimo dobrego początkowo apetytu schudło 4 kg. W badaniu fizykalnym: dziewczynka podsypiająca, ale logiczna, cechy odwodnienia (suche, spierzchnięte wargi, zapadnięte gałki oczne, suchy obłożony język). Z ust wyczuwalny wyraźny, słodkawy zapach pieczonych jabłek / acetonu. Oddech bardzo głęboki, głośny i przyspieszony (oddech Kussmaula). Brzuch tkliwy rozlanie w badaniu palpacyjnym, perystaltyka leniwa (obraz rzekomego ostrego brzucha / pseudoperitonitis diabetica).",
    labs: [
      {
        category: "Glikemia, ketony i gazometria CITO",
        items: [
          { name: "Glikemia przyłóżkowa (glukometr)", val: "485 mg/dL (26.9 mmol/L)", norm: "70–99 mg/dL", flag: "H" },
          { name: "Ciała ketonowe we krwi (beta-hydroksymaślan)", val: "5.8 mmol/L", norm: "< 0.5 mmol/L", flag: "H" },
          { name: "pH krwi tętniczej / włośniczkowej", val: "7.14 (ciężka kwasica)", norm: "7.35–7.45", flag: "L" },
          { name: "Wodorowęglany (HCO3-)", val: "8.2 mmol/L", norm: "22–26 mmol/L", flag: "L" },
          { name: "Luka anionowa (Anion Gap)", val: "24 mmol/L (kwasica z podwyższoną luką)", norm: "8–16 mmol/L", flag: "H" }
        ]
      },
      {
        category: "Badanie moczu i elektrolity",
        items: [
          { name: "Glukozuria w moczu", val: "++++ (> 1000 mg/dL)", norm: "Nieobecna", flag: "H" },
          { name: "Ketonuria w moczu", val: "++++ (masywna)", norm: "Nieobecna", flag: "H" },
          { name: "Sód (Na+) zmierzony", val: "130 mmol/L (skorygowany Na+ = 136 mmol/L)", norm: "135–145 mmol/L", flag: "L" },
          { name: "Potas (K+)", val: "4.6 mmol/L (pozornie prawidłowy z powodu kwasicy)", norm: "3.5–5.0 mmol/L", flag: "N" },
          { name: "Mocznik / Kreatynina", val: "46 / 0.85 mg/dL (cechy przednerkowego AKI)", norm: "15–36 / 0.30–0.60", flag: "H" }
        ]
      },
      {
        category: "Badania autoimmunologiczne i HbA1c",
        items: [
          { name: "Hemoglobina glikowana (HbA1c)", val: "12.4%", norm: "< 5.7%", flag: "H" },
          { name: "Przeciwciała anty-GAD65 / anty-IA2 / anty-ZnT8", val: "Dodatnie (potwierdzenie autoimmunologicznej t. 1)", norm: "Ujemne", flag: "H" },
          { name: "Peptyd C na czczo", val: "0.15 ng/mL (skrajny niedobór insuliny endogennej)", norm: "0.8–3.1 ng/mL", flag: "L" }
        ]
      }
    ],
    steps: [
      {
        num: 1,
        title: "Kryteria rozpoznania kwasicy ketonowej (DKA)",
        task: "Jakie są 3 obowiązkowe kryteria biochemiczne rozpoznania kwasicy ketonowej (DKA) wg wytycznych ISPAD i PTD?",
        options: [
          { text: "1. Hiperglikemia (> 200 mg/dL / 11 mmol/L), 2. Kwasica metaboliczna (pH < 7.30 lub HCO3- < 18 mmol/L), 3. Ketonemia (beta-hydroksymaślan we krwi >= 3.0 mmol/L) lub ketonuria", correct: true, feedback: "Prawidłowo! Triada DKA wg ISPAD: hiperglikemia >200 mg/dL, kwasica (pH <7.30 lub HCO3- <18 mmol/L) oraz obecność ciał ketonowych we krwi (beta-hydroksymaślan >= 3.0 mmol/L) lub moczu." },
          { text: "Glikemia > 600 mg/dL bez ciał ketonowych", correct: false, feedback: "To kryterium zespołu hiperglikemiczno-hiperosmolarnego (HHS)." },
          { text: "Mleczany > 5.0 mmol/L bez kwasicy", correct: false, feedback: "To kryterium kwasicy mleczanowej." },
          { text: "Białkomocz nerczycowy z hipoalbuminemią", correct: false, feedback: "To zespół nerczycowy." }
        ]
      },
      {
        num: 2,
        title: "Pierwszy krok resuscytacji w DKA: Płynoterapia przed insuliną",
        task: "Pielęgniarka przygotowała pompę z insuliną i pyta, czy natychmiast podać bolus insuliny. Jaka jest prawidłowa kolejność postępowania w DKA wg ISPAD?",
        options: [
          { text: "BEZWZGLĘDNY ZAKAZ bolusów insuliny! Pierwszą godzinę przeznacza się WYŁĄCZNIE na nawadnianie dożylne (0.9% NaCl 10–20 mL/kg mc. przez 1 h). Wlew insuliny rozpoczyna się dopiero PO 1–2 godzinach płynoterapii!", correct: true, feedback: "Kluczowy punkt LEK i ISPAD! Podanie bolusa insuliny lub włączenie insuliny przed wstępnym nawodnieniem dramatycznie zwiększa ryzyko wstrząsu hipowolemicznego (gwałtowny spadek osmolarności surowicy i ucieczka wody do komórek) oraz grozi śmiertelnym obrzękiem mózgu i nagłą hipokaliemią!" },
          { text: "Natychmiastowe podanie dożylne bolusa 10 jednostek insuliny krótko działającej", correct: false, feedback: "Kardynalny błąd zagrażający wstrząsem hipowolemicznym i obrzękiem mózgu!" },
          { text: "Podanie doustne metforminy", correct: false, feedback: "Metformina jest przeciwwskazana w kwasicy i w cukrzycy typu 1." },
          { text: "Podanie insuliny podskórnie w udo co 15 minut", correct: false, feedback: "Błąd – w DKA ze złą perfuzją obwodową wchłanianie podskórne jest nieprzewidywalne." }
        ]
      },
      {
        num: 3,
        title: "Dawkowanie i zasady ciągłego wlewu insuliny",
        task: "Po 1 godzinie wstępnego nawadniania włączasz ciągły dożylny wlew insuliny krótko działającej / analogu szybkodziałającego. Jaka jest zalecana dawka początkowa?",
        options: [
          { text: "Ciągły wlew dożylny 0.05–0.1 j./kg mc./godzinę (bez bolusa wstępnego!)", correct: true, feedback: "Znakomicie! Standard ISPAD zakłada ciągły wlew dożylny insuliny w dawce 0.05–0.1 j./kg mc./h. Celem jest powolne, kontrolowane obniżanie glikemii (maksymalnie o 50–90 mg/dL/h / 3–5 mmol/L/h) oraz zahamowanie lipolizy i ketogenezy." },
          { text: "Szybki wlew 1.0 j./kg mc./godzinę", correct: false, feedback: "Błąd! Zbyt duża dawka wywoła zbyt gwałtowny spadek osmolarności i obrzęk mózgu." },
          { text: "Wlew insuliny NPH o przedłużonym działaniu", correct: false, feedback: "Wlew dożylny prowadzi się wyłącznie z insuliny rozpuszczalnej (zwykłej/krótkodziałającej)." },
          { text: "Podanie jednorazowo insuliny degludec i.v.", correct: false, feedback: "Błąd śmiertelny." }
        ]
      },
      {
        num: 4,
        title: "Pułapka potasowa: suplementacja potasu",
        task: "Wyjściowe stężenie potasu u pacjentki wynosi 4.6 mmol/L. Kiedy i dlaczego należy rozpocząć dożylną suplementację potasu w DKA?",
        options: [
          { text: "Włączenie potasu do płynów infuzyjnych jest konieczne od momentu rozpoczęcia insulinoterapii (pod warunkiem potwierdzonej diurezy), ponieważ insulina i wyrównanie kwasicy gwałtownie przesuwają potas do wnętrza komórek", correct: true, feedback: "Bardzo ważny punkt! Mimo pozornie prawidłowego poziomu potasu we krwi (4.6 mmol/L), całkowite zasoby potasu w organizmie są drastycznie wyczerpane przez diurezę osmotyczną. Kwasica wypycha potas na zewnątrz komórek. W momencie podania insuliny i nawodnienia następuje masywny wychwyt potasu przez komórki, co bez suplementacji doprowadzi do śmiertelnej hipokaliemii i zatrzymania krążenia!" },
          { text: "Potasu nie podaje się wcale, bo norma to 3.5–5.0 mmol/L", correct: false, feedback: "Groźny błąd prowadzący do ciężkiej jatrogennej hipokaliemii i zaburzeń rytmu!" },
          { text: "Potas podaje się dopiero w 3. dobie hospitalizacji", correct: false, feedback: "Za późno – pacjent rozwinie hipokaliemię w ciągu kilku godzin." },
          { text: "Potas podaje się wyłącznie w szybkim bolusie dożylnym", correct: false, feedback: "Szybki bolus potasu powoduje zatrzymanie serca w asystolii!" }
        ]
      },
      {
        num: 5,
        title: "Dołączenie glukozy do płynoterapii: zapobieganie obrzękowi mózgu",
        task: "W 4. godzinie terapii glikemia obniżyła się do 250 mg/dL (14 mmol/L), jednak kwasica ketonowa nadal się utrzymuje (pH 7.22, ketonemia 3.4 mmol/L). Co należy zrobić z płynami i insuliną?",
        options: [
          { text: "Do płynów dożylnych DOŁĄCZYĆ 5% lub 10% glukozę, kontynuując wlew insuliny, aby bezpiecznie dokończyć leczenie kwasicy i ketonemii bez ryzyka hipoglikemii i obrzęku mózgu", correct: true, feedback: "Dokładnie tak! Kluczowa zasada ISPAD: celem leczenia DKA nie jest sama normalizacja glikemii, lecz wygaszenie kwasicy i ketogenezy. Gdy glikemia spadnie do 250–300 mg/dL, nie zatrzymuje się insuliny, lecz dodaje glukozę do wlewu (0.9% NaCl + 5% lub 10% glukoza w stosunku 1:1), utrzymując glikemię 150–200 mg/dL do pełnego wyrównania pH i ciał ketonowych!" },
          { text: "Natychmiast wyłączyć pompę insulinową i wypisać dziecko", correct: false, feedback: "Błąd! Kwasica ketonowa nie ustąpiła i bez insuliny natychmiast ulegnie zaostrzeniu." },
          { text: "Zwiększyć dawkę insuliny czterokrotnie, aby glikemia spadła do 50 mg/dL", correct: false, feedback: "Grozi śmiertelną hipoglikemią i obrzękiem mózgu." },
          { text: "Odstawić wszystkie płyny dożylne", correct: false, feedback: "Pacjentka nadal jest odwodniona." }
        ]
      },
      {
        num: 6,
        title: "Najgroźniejsze powikłanie leczenia DKA: Obrzęk mózgu",
        task: "Co jest najczęstszą przyczyną zgonu dzieci leczonych z powodu kwasicy ketonowej i jakie są jego wczesne objawy alarmowe?",
        options: [
          { text: "Obrzęk mózgu (Cerebral Edema) – narastający ból głowy, zwolnienie akcji serca (bradykardia), wzrost ciśnienia krwi, wymioty, ponowne zaburzenia świadomości i asymetria źrenic", correct: true, feedback: "Znakomicie! Obrzęk mózgu odpowiada za 60–90% zgonów w DKA u dzieci. Czynnikami ryzyka są: zbyt szybkie obniżanie glikemii i osmolarności, nadmierna objętość płynów w pierwszych godzinach oraz bolusy insuliny. Objawy: triada Cushinga (bradykardia, nadciśnienie, zaburzenia oddychania), ból głowy, wymioty, senność." },
          { text: "Ostre zapalenie wyrostka robaczkowego", correct: false, feedback: "Bóle brzucha w DKA (pseudoperitonitis) ustępują po wyrównaniu kwasicy." },
          { text: "Zawał mięśnia sercowego", correct: false, feedback: "Kazuistyka u 8-letniego dziecka." },
          { text: "Pęknięcie wątroby", correct: false, feedback: "Brak związku." }
        ]
      },
      {
        num: 7,
        title: "Leczenie ratunkowe obrzęku mózgu w przebiegu DKA",
        task: "U dziewczynki w 6. godzinie leczenia pojawia się silny ból głowy, zwolnienie tętna do 52/min, wzrost ciśnienia do 130/85 mmHg i śpiączka. Jakie natychmiastowe leczenie wdrożysz przed wykonaniem tomografii głowy?",
        options: [
          { text: "Natychmiastowe podanie 3% NaCl (3–5 mL/kg mc. w ciągu 10–15 min) lub 20% mannitolu (0.5–1.0 g/kg mc. i.v.), uniesienie wezgłowia łóżka o 30° i redukcja płynów o 50%", correct: true, feedback: "Prawidłowo! Przy podejrzeniu obrzęku mózgu leczenie osmotyczne (3% NaCl lub mannitol) musi być wdrożone NATYCHMIAST przy łóżku pacjenta, bez opóźniania na transport i wykonanie TK głowy! Liczy się każda minuta." },
          { text: "Oczekiwanie na wynik badania okulistycznego dna oka", correct: false, feedback: "Karygodna zwłoka prowadząca do wgłobienia pnia mózgu i zgonu!" },
          { text: "Wlew 1000 mL czystej wody destylowanej", correct: false, feedback: "Śmiertelny błąd nasilający obrzęk komórek glejowych!" },
          { text: "Wykonanie natychmiastowej punkcji lędźwiowej", correct: false, feedback: "Bezwzględnie przeciwwskazana przy wzroście ciśnienia wewnątrzczaszkowego – grozi natychmiastowym wgłobieniem migdałków móżdżku!" }
        ]
      },
      {
        num: 8,
        title: "Kiedy stosuje się wodorowęglan sodu (NaHCO3) w DKA?",
        task: "Czy w leczeniu kwasicy ketonowej u dzieci rutynowo stosuje się wlewy wodorowęglanu sodu (NaHCO3)?",
        options: [
          { text: "NIE – rutynowe stosowanie wodorowęglanów jest ZAKAZANE; NaHCO3 rozważa się wyłącznie w skrajnej kwasicy zagrażającej życiu (pH < 6.90 z niestabilnością hemodynamiczną), ponieważ nasila paradoksalną kwasicę OUN i zwiększa ryzyko obrzęku mózgu", correct: true, feedback: "Znakomicie! ISPAD i PTD kategorycznie odradzają rutynowe stosowanie NaHCO3. Wodorowęglan sodu generuje CO2, który łatwo przenika przez barierę krew-mózg, wywołując paradoksalne zakwaszenie płynu mózgowo-rdzeniowego, opóźnia ustępowanie ketonemii, wywołuje hipokaliemię i istotnie zwiększa ryzyko obrzęku mózgu!" },
          { text: "Tak – wodorowęglan sodu podaje się każdemu dziecku z pH < 7.30", correct: false, feedback: "Błąd kardynalny, dawno wycofany z medycyny opartej na faktach." },
          { text: "NaHCO3 jest lekiem z wyboru obniżającym poziom glukozy", correct: false, feedback: "Bzdura medyczna." },
          { text: "Wodorowęglan sodu podaje się w nebulizacji", correct: false, feedback: "Brak takiego zastosowania." }
        ]
      }
    ],
    pathoNodes: [
      {
        title: "1. Autoimmunologiczna destrukcja komórek beta trzustki",
        desc: "Przeciwciała (anty-GAD, IA-2, ZnT8) i autoreaktywne limfocyty T niszczą wyspy trzustkowe, prowadząc do bezwzględnego braku insuliny przy względnym nadmiarze glukagonu, kortyzolu i katecholamin.",
        drugTarget: "Dożywotnia substytucja insuliny (początkowo pompa dożylna, docelowo osobista pompa insulinowa lub pen)"
      },
      {
        title: "2. Niekontrolowana lipoliza i ketogeneza w wątrobie",
        desc: "Brak insuliny aktywuje lipazę hormonozależną w tkance tłuszczowej. Wolne kwasy tłuszczowe docierają do wątroby, gdzie ulegają utlenianiu do ciał ketonowych (kwas acetooctowy, beta-hydroksymaślan), wywołując kwasicę metaboliczną i oddech Kussmaula.",
        drugTarget: "Ciągły wlew insuliny 0.05–0.1 j./kg/h (hamuje lipolizę i ketogenezę wątrobową)"
      },
      {
        title: "3. Diureza osmotyczna, utrata elektrolitów i obrzęk mózgu",
        desc: "Glikemia przekraczająca próg nerkowy (180 mg/dL) wywołuje masywną diurezę osmotyczną, odwodnienie i ucieczkę elektrolitów. Zbyt gwałtowny spadek osmolarności w trakcie leczenia powoduje napływ wody do mózgu.",
        drugTarget: "Płynoterapia ostrożna (0.9% NaCl, dołączenie glukozy przy glikemii <250 mg/dL) i wczesna suplementacja potasu"
      }
    ],
    dutySummary: "DKA to triada: glikemia >200 mg/dL, kwasica (pH <7.30 / HCO3 <18) i ketonemia/ketonuria. Objawy: oddech Kussmaula, zapach acetonu, rzekomy ostry brzuch. Pierwsza godzina to TYLKO płyny (0.9% NaCl 10–20 ml/kg), NIGDY bolus insuliny! Insulina w stałym wlewie 0.05–0.1 j./kg/h od 2. godziny. Dołącz potas zaraz po włączeniu insuliny. Przy glikemii <250 mg/dL dodaj 5-10% glukozę. Najgroźniejsze powikłanie: obrzęk mózgu (lecz natychmiast 3% NaCl lub mannitolem).",
    diffTable: [
      { disease: "Ostre zapalenie wyrostka robaczkowego", diff: "Bóle brzucha, wymioty i leukocytoza w DKA ('rzekomy ostry brzuch' / pseudoperitonitis diabetica) ustępują samoistnie po nawodnieniu i wyrównaniu kwasicy; badanie moczu natychmiast ujawnia glukozę i ketony.", test: "Badanie glikemii i ciał ketonowych w moczu CITO." },
      { disease: "Kwasica mleczanowa", diff: "Ciężka kwasica metaboliczna, ale stężenie mleczanów > 5 mmol/L, a ciała ketonowe w normie; występuje we wstrząsie septycznym lub toksyczności metforminy.", test: "Stężenie kwasu mlekowego we krwi, beta-hydroksymaślan." },
      { disease: "Stan astmatyczny", diff: "Duszność i tachypnoe, ale osłuchowo dominują świsty wydechowe i furczenia; w DKA oddech Kussmaula jest czysty osłuchowo, głęboki i 'chapiący'.", test: "Osłuchiwanie klatki piersiowej, glikemia, gazometria." },
      { disease: "Zatrucie salicylanami (aspiryną)", diff: "Początkowo zasadowica oddechowa, potem kwasica metaboliczna, szumy uszne, hiperwentylacja, brak hiperglikemii >400 mg/dL.", test: "Glikemia, stężenie salicylanów w surowicy." }
    ],
    lekQuestions: [
      {
        question: "U 7-letniego dziecka z podejrzeniem debiutu cukrzycy typu 1 i kwasicy ketonowej (glikemia 460 mg/dL, pH 7.15, ketonuria ++++) pierwszym krokiem postępowania terapeutycznego powinno być:",
        options: [
          "Dożylne podanie bolusa insuliny w dawce 0.5 j./kg mc.",
          "Rozpoczęcie dożylnego nawadniania 0.9% NaCl (10–20 mL/kg mc. w ciągu pierwszej godziny) bez podawania insuliny w bolusie.",
          "Podanie wodorowęglanu sodu (NaHCO3) w szybkim bolusie.",
          "Natychmiastowe podanie insuliny podskórnie w dawkach frakcjonowanych.",
          "Podanie 20% glukozy z potasem."
        ],
        correct: 1,
        explanation: "Zgodnie z aktualnymi wytycznymi ISPAD i Polskiego Towarzystwa Diabetologicznego (PTD), leczenie DKA u dzieci ZAWSZE rozpoczyna się od dożylnej resuscytacji płynowej (0.9% NaCl 10–20 mL/kg mc. w pierwszej godzinie). Podanie insuliny w bolusie jest BEZWZGLĘDNIE PRZECIWWSKAZANE, ponieważ gwałtowny spadek osmolarności surowicy drastycznie zwiększa ryzyko obrzęku mózgu oraz zapaści naczyniowej. Wlew insuliny włącza się dopiero po 1–2 godzinach płynoterapii."
      },
      {
        question: "Wskaż najczęstszą przyczynę zgonu dzieci leczonych z powodu cukrzycowej kwasicy ketonowej (DKA):",
        options: [
          "Obrzęk mózgu.",
          "Masywny zawał mięśnia sercowego.",
          "Krwawienie z wrzodu żołądka.",
          "Niewydolność oddechowa w przebiegu ropniaka opłucnej.",
          "Zatorowość tętnicy krezkowej."
        ],
        correct: 0,
        explanation: "Obrzęk mózgu jest najgroźniejszym powikłaniem kwasicy ketonowej u dzieci i odpowiada za 60–90% wszystkich zgonów w przebiegu DKA. Rozwija się najczęściej między 4. a 12. godziną leczenia w wyniku zbyt szybkiego spadku osmolarności osocza, nadmiernej podaży płynów hipotonicznych lub stosowania bolusów insuliny."
      },
      {
        question: "W trakcie leczenia kwasicy ketonowej u 9-letniego dziecka glikemia obniżyła się do 240 mg/dL, jednak kwasica nadal się utrzymuje (pH 7.21, HCO3- 11 mmol/L). Wskaż prawidłowe postępowanie:",
        options: [
          "Natychmiastowe odstawienie insuliny.",
          "Dołączenie 5% lub 10% glukozy do płynów infuzyjnych i kontynuacja wlewu insuliny do czasu ustąpienia kwasicy i ketonemii.",
          "Podanie insuliny w bolusie w celu dalszego szybkiego obniżenia glikemii poniżej 70 mg/dL.",
          "Wdrożenie dializoterapii otrzewnowej.",
          "Zakończenie płynoterapii dożylnej i podanie posiłku węglowodanowego."
        ],
        correct: 1,
        explanation: "Celem leczenia DKA jest ustąpienie kwasicy metabolicznej i ketonemii, a nie jedynie obniżenie poziomu cukru. Gdy glikemia osiągnie stężenie około 250–300 mg/dL (14–17 mmol/L), do płynów dożylnych należy dołączyć glukozę (5% lub 10% roztwór), aby zapobiec hipoglikemii i gwałtownym zmianom osmolarności, kontynuując wlew insuliny aż do całkowitego wyleczenia kwasicy (pH > 7.30, HCO3- > 18 mmol/L, ketonemia < 0.5 mmol/L)."
      }
    ],
    flashcards: [
      { q: "Jaka jest triada kryteriów rozpoznania kwasicy ketonowej (DKA)?", a: "Hiperglikemia (>200 mg/dL / 11 mmol/L), kwasica metaboliczna (pH <7.30 lub HCO3 <18 mmol/L) oraz ketonemia (beta-hydroksymaślan >= 3 mmol/L) lub ketonuria.", cat: "Pediatria" },
      { q: "Dlaczego w DKA u dzieci bolusy insuliny są bezwzględnie zakazane?", a: "Zwiększają ryzyko nagłego spadku osmolarności, wstrząsu hipowolemicznego i śmiertelnego obrzęku mózgu.", cat: "Pediatria" },
      { q: "Kiedy rozpoczyna się wlew insuliny w DKA u dziecka?", a: "Dopiero po 1–2 godzinach wstępnego nawadniania dożylnego (dawka: 0.05–0.1 j./kg mc./h w stałym wlewie).", cat: "Pediatria" },
      { q: "Co należy zrobić z płynami, gdy glikemia w DKA spadnie poniżej 250 mg/dL?", a: "Dodać 5% lub 10% glukozę do wlewu, kontynuując podawanie insuliny do czasu wygaszenia kwasicy i ketonemii.", cat: "Pediatria" },
      { q: "Jakie leki osmotyczne stosuje się natychmiast przy podejrzeniu obrzęku mózgu w DKA?", a: "3% NaCl (3–5 mL/kg mc.) lub 20% mannitol (0.5–1.0 g/kg mc. i.v.).", cat: "Pediatria" }
    ]
  },

  // 121: Wrodzona niedoczynność tarczycy
  {
    id: 121,
    filename: "121_wrodzona_niedoczynnosc_tarczycy.json",
    dept: "Pediatria",
    shortTitle: "3-tygodniowy noworodek – Przedłużona żółtaczka, duży język, przepuklina pępkowa i zaparcia (Wrodzona niedoczynność tarczycy)",
    diagnosisTitle: "Wrodzona niedoczynność tarczycy (Congenital Hypothyroidism - CHT) z dysgenezją tarczycy wykryta w badaniach przesiewowych",
    vitals: [
      { label: "HR", val: "94/min", sub: "Tendencja do bradykardii u noworodka", status: "warn" },
      { label: "BP", val: "72/45 mmHg", sub: "Prawidłowe", status: "ok" },
      { label: "SpO2", val: "98%", sub: "Prawidłowa", status: "ok" },
      { label: "RR", val: "28/min", sub: "Spokojny", status: "ok" },
      { label: "Temp", val: "35.8°C", sub: "Skłonność do hipotermii", status: "warn" }
    ],
    vitalsObj: { hr: 94, bp: "72/45", spo2: 98, rr: 28, temp: 35.8 },
    story: "3-tygodniowy noworodek został pilnie wezwany do poradni endokrynologii dziecięcej w związku z nieprawidłowym wynikiem testu przesiewowego (podwyższone TSH w teście suchej kropli krwi pobranej w 3. dobie życia). W wywiadzie zebranym od matki: poród o czasie, masa urodzeniowa 4100 g (makrosomia), ciąża przenoszona o 10 dni. Od wypisu ze szpitala dziecko jest 'zbyt grzeczne' – ciągle śpi, budzi się rzadko na karmienia, ssie ospale i wolno, krztusi się, ma chrypliwy cichy płacz. Matka zauważyła, że dziecko oddaje twardy stolec raz na 3–4 dni (uporczywe zaparcia) i nadal ma zażółconą skórę (przedłużająca się żółtaczka fizjologiczna). W badaniu fizykalnym: skóra sucha, chłodna, marmurkowata, z żółtaczkowym odcieniem. Duże ciemię przednie (4x4 cm) oraz otwarte ciemię tylne (>1 cm). Twarz obrzęknięta ('nalana'), powiększony, gruby język wysuwający się z ust (macroglossia). Duży, wzdęty brzuch z obecnością przepukliny pępkowej o średnicy 2.5 cm. Napięcie mięśniowe obniżone (hipotonia mięśniowa).",
    labs: [
      {
        category: "Profil tarczycowy surowicy (badania weryfikacyjne CITO)",
        items: [
          { name: "TSH w surowicy", val: "88.0 uIU/mL (skrajnie podwyższone)", norm: "0.8–6.0 uIU/mL w 3. tyg.", flag: "H" },
          { name: "Wolna tyroksyna (fT4)", val: "4.2 pmol/L (głęboki deficyt)", norm: "12.0–25.0 pmol/L", flag: "L" },
          { name: "Wolna trójjodotyronina (fT3)", val: "2.1 pmol/L", norm: "3.5–7.5 pmol/L", flag: "L" },
          { name: "TSH z bibuły w badaniu przesiewowym", val: "48 uIU/mL (norma < 12–15 uIU/mL)", norm: "< 12 uIU/mL", flag: "H" }
        ]
      },
      {
        category: "Biochemia krwi i żółtaczka",
        items: [
          { name: "Bilirubina całkowita", val: "11.2 mg/dL", norm: "< 2.0 mg/dL", flag: "H" },
          { name: "Bilirubina pośrednia (wolna)", val: "10.4 mg/dL (hiperbilirubinemia niesprzężona)", norm: "< 1.5 mg/dL", flag: "H" },
          { name: "Cholesterol całkowity", val: "240 mg/dL", norm: "< 170 mg/dL", flag: "H" },
          { name: "Morfologia krwi", val: "Hb 13.2 g/dL, erytrocyty normocytarne", norm: "13.0–18.0 g/dL", flag: "N" }
        ]
      },
      {
        category: "Badania obrazowe (USG i scyntygrafia)",
        items: [
          { name: "USG tarczycy", val: "Brak tkanki tarczycowej w typowym położeniu anatomicznym na szyi (agenezja/aplazja tarczycy lub ektopia)", norm: "Obecna tarczyca o objętości 0.5–1.0 mL", flag: "H" },
          { name: "Scyntygrafia tarczycy z 99mTc (lub 123-I)", val: "Ognisko ektopowej tkanki tarczycowej u nasady języka (tarczyca językowa - lingua thyroidea)", norm: "Prawidłowe położenie", flag: "H" },
          { name: "RTG stawów kolanowych", val: "Brak jąder kostnienia nasady dalszej kości udowej (opóźnienie dojrzałości szkieletowej / wieku kostnego)", norm: "Obecne jądro kostnienia Beclarda przy urodzeniu", flag: "L" }
        ]
      }
    ],
    steps: [
      {
        num: 1,
        title: "Rozpoznanie kliniczne i fenotyp wrodzonej niedoczynności tarczycy",
        task: "Klasyczny zespół objawów: przedłużająca się żółtaczka, makroglosja (duży język), przepuklina pępkowa, zaparcia, hipotonia i senność u 3-tygodniowego noworodka wskazuje na:",
        options: [
          { text: "Wrodzoną niedoczynność tarczycy (Congenital Hypothyroidism - CHT / dawniej kretynizm tarczycowy)", correct: true, feedback: "Prawidłowo! To klasyczny, pełnoobjawowy obraz wrodzonej niedoczynności tarczycy. Przed erą badań przesiewowych dzieci te rozwijały nieodwracalne upośledzenie umysłowe (kretynizm tarczycowy) i karłowatość." },
          { text: "Zespół Downa (trisomia 21)", correct: false, feedback: "W zespole Downa również występuje duży język i hipotonia, ale nie tłumaczy to TSH 88 uIU/mL i braku tarczycy (choć dzieci z trisomią 21 mają wyższe ryzyko CHT)." },
          { text: "Chorobę Hirschsprunga", correct: false, feedback: "W chorobie Hirschsprunga występują zaparcia i wzdęcie brzucha, ale fT4 jest w normie, brak makroglosji i zmian tarczycowych." },
          { text: "Wrodzone zwężenie odźwiernika", correct: false, feedback: "W pylorostonozie dominują chlustające wymioty treścią żołądkową po każdym posiłku." }
        ]
      },
      {
        num: 2,
        title: "Kluczowe ramy czasowe wdrożenia leczenia",
        task: "W jakim maksymalnym czasie od urodzenia należy włączyć substytucję lewotyroksyną, aby zapobiec nieodwracalnemu uszkodzeniu mózgu i upośledzeniu rozwoju intelektualnego?",
        options: [
          { text: "Przed ukończeniem 14. dnia życia (optymalnie w pierwszych 7–14 dniach życia)", correct: true, feedback: "Kluczowy punkt LEK! Hormony tarczycy są bezwzględnie niezbędne do mielinizacji włókien nerwowych i rozwoju kory mózgowej w pierwszych miesiącach życia. Wdrożenie leczenia lewotyroksyną przed 14. d.ż. gwarantuje prawidłowy rozwój intelektualny (IQ w normie). Każdy tydzień opóźnienia powyżej 2.–3. tygodnia skutkuje nieodwracalną utratą punktów IQ!" },
          { text: "Dopiero po ukończeniu 6. miesiąca życia", correct: false, feedback: "Kardynalny błąd! Po 6 miesiącach dziecko rozwinie głęboki, nieodwracalny niedorozwój umysłowy." },
          { text: "W wieku przedszkolnym (około 3. roku życia)", correct: false, feedback: "Całkowicie za późno." },
          { text: "Czas rozpoczęcia leczenia nie ma żadnego znaczenia dla mózgu", correct: false, feedback: "Bzdura medyczna." }
        ]
      },
      {
        num: 3,
        title: "Najczęstsza przyczyna wrodzonej niedoczynności tarczycy",
        task: "Co jest najczęstszą przyczyną pierwotnej wrodzonej niedoczynności tarczycy (odpowiadającą za ok. 85% przypadków)?",
        options: [
          { text: "Dysgenezja tarczycy (ektopia tkanki tarczycowej, aplazja/agenezja lub hipoplazja gruczołu)", correct: true, feedback: "Dokładnie tak! Wady rozwojowe gruczołu tarczowego (dysgenezja tarczycy) stanowią ~85% przypadków, z czego najczęstsza jest ektopia (np. tarczyca podjęzykowa) oraz agenezja. Pozostałe 10–15% to wrodzone defekty syntezy hormonów (dyshormonogeneza, dziedziczona autosomalnie recesywnie, często z wolem)." },
          { text: "Autoimmunologiczne zapalenie tarczycy Hashimoto", correct: false, feedback: "Hashimoto to najczęstsza przyczyna NABYTEJ niedoczynności u starszych dzieci i dorosłych, nie wrodzonej." },
          { text: "Wrodzony gruczolak przysadki", correct: false, feedback: "Wyjątkowa rzadkość u noworodków." },
          { text: "Rak rdzeniasty tarczycy", correct: false, feedback: "Nowotwór wieku późniejszego związany z MEN2." }
        ]
      },
      {
        num: 4,
        title: "Zasady badania przesiewowego noworodków w Polsce",
        task: "Jak zorganizowany jest powszechny skrining wrodzonej niedoczynności tarczycy w Polsce?",
        options: [
          { text: "Oznaczenie stężenia TSH z krwi włośniczkowej pobranej na bibułę filtracyjną w 3.–5. dobie życia noworodka (nie wcześniej niż po 48. h życia z powodu fizjologicznego poporodowego wyrzutu TSH)", correct: true, feedback: "Znakomicie! Krew pobiera się z pięty noworodka na specjalną bibułę w 3.–5. dobie życia. Pobranie przed 48. godziną życia dałoby wynik fałszywie dodatni z powodu fizjologicznego poporodowego wyrzutu TSH (neonatal TSH surge) wywołanego stresem porodowym i ochłodzeniem." },
          { text: "Pobranie krwi pępowinowej natychmiast po przecięciu pępowiny", correct: false, feedback: "Krew pępowinowa nie jest rutynowo stosowana w powszechnym polskim skriningu TSH z powodu zmienności poporodowej." },
          { text: "Badanie USG tarczycy u każdego noworodka na sali porodowej", correct: false, feedback: "Niewykonalne logistycznie i nieuzasadnione ekonomicznie." },
          { text: "Skrining wykonuje się tylko u dzieci z objawami klinicznymi", correct: false, feedback: "Błąd! >95% noworodków z CHT przy urodzeniu NIE MA ŻADNYCH OBJAWÓW (dzięki przejściowej ochronie przez matczyne hormony)." }
        ]
      },
      {
        num: 5,
        title: "Dawkowanie i substytucja lewotyroksyny (L-T4)",
        task: "Jaki lek i w jakiej dawce początkowej należy natychmiast wdrożyć po potwierdzeniu wrodzonej niedoczynności tarczycy?",
        options: [
          { text: "Lewotyroksyna sodowa (L-T4) doustnie w wysokiej dawce początkowej 10–15 ug/kg mc./dobę rano na czczo", correct: true, feedback: "Doskonale! Dawka u noworodków z CHT jest znacznie wyższa w przeliczeniu na masę ciała niż u dorosłych (10–15 ug/kg mc./d wobec 1.6 ug/kg u dorosłych). Celem jest gwałtowne wysycenie tkanek i normalizacja fT4 w ciągu 3–5 dni oraz normalizacja TSH w ciągu 2–4 tygodni." },
          { text: "L-tyroksyna w dawce 1.0 ug/kg mc./dobę", correct: false, feedback: "Za mała dawka – nie zapewni szybkiej ochrony rozwijającego się mózgu." },
          { text: "Płyn Lugola doustnie w kroplach", correct: false, feedback: "Płyn Lugola zablokuje resztkową syntezę hormonów (efekt Wolffa-Chaikoffa)!" },
          { text: "Tiamazol doustnie", correct: false, feedback: "Błąd śmiertelny – tiamazol to tyreostatyk hamujący tarczycę!" }
        ]
      },
      {
        num: 6,
        title: "Prawidłowa technika podawania leku u niemowlęcia",
        task: "Matka pyta, jak prawidłowo podawać tabletkę L-tyroksyny 3-tygodniowemu niemowlęciu. Jakie są zalecenia?",
        options: [
          { text: "Tabletkę należy rozgnieść na łyżeczce, zawiesić w kilku kroplach wody lub pokarmu kobiecego i podać bezpośrednio do ust dziecka; NIE WOLNO mieszać ze sztuczną mieszanką sojową, żelazem ani wapniem", correct: true, feedback: "Świetnie! L-tyroksynę podaje się rozgniecioną z małą objętością wody/mleka matki bezpośrednio do ust przed karmieniem. Soja, żelazo i wapń silnie wiążą tyroksynę w świetle jelita, uniemożliwiając jej wchłanianie." },
          { text: "Dodać całą tabletkę do butelki z 200 ml mleka sojowego z żelazem", correct: false, feedback: "Kardynalny błąd! Dziecko może nie dopić butelki, a soja i żelazo całkowicie zablokują wchłanianie leku!" },
          { text: "Podać lek doodbytniczo", correct: false, feedback: "Brak wchłaniania z czopków." },
          { text: "Podawać lek wyłącznie raz w miesiącu", correct: false, feedback: "Wymaga codziennego, systematycznego podawania rano." }
        ]
      },
      {
        num: 7,
        title: "Monitorowanie leczenia w 1. roku życia",
        task: "Jak często należy kontrolować stężenia TSH i fT4 w pierwszym roku życia u dziecka leczonego z powodu CHT?",
        options: [
          { text: "Co 1–2 miesiące w pierwszym półroczu, następnie co 2–3 miesiące do ukończenia 1. roku życia (oraz po każdej zmianie dawki)", correct: true, feedback: "Bardzo dobrze! Niemowlę w 1. roku życia gwałtownie rośnie i przybiera na masie, dlatego dawka na masę ciała wymaga częstej korekty (kontrole co 4–6 tygodni w 1. półroczu). Celem jest utrzymanie fT4 w górnej połowie normy i TSH < 2.5 uIU/mL." },
          { text: "Wystarczy jedna kontrola w wieku 18 lat", correct: false, feedback: "Absurdalne zaniedbanie medyczne." },
          { text: "Codzienne pobieranie krwi z żyły szyjnej", correct: false, feedback: "Zbyteczne i obciążające niemowlę." },
          { text: "Tylko wtedy, gdy dziecko znowu zacznie mieć zaparcia", correct: false, feedback: "Błąd – monitorowanie laboratoryjne musi wyprzedzać objawy kliniczne." }
        ]
      },
      {
        num: 8,
        title: "Ocena trwałości niedoczynności tarczycy (próba odstawienia leku)",
        task: "U dziecka z prawidłowo położoną tarczycą w USG (podejrzenie przejściowej niedoczynności noworodkowej) w jakim wieku można podjąć próbę czasowego odstawienia L-T4 w celu weryfikacji trwałości choroby?",
        options: [
          { text: "Dopiero po ukończeniu 3. roku życia, gdy proces mielinizacji i rozwoju mózgu jest w pełni zakończony", correct: true, feedback: "Znakomicie! Do ukończenia 3. roku życia tarczyca ma krytyczne znaczenie dla neurogenezy. Jakakolwiek próba odstawienia leku przed 3. r.ż. jest bezwzględnie przeciwwskazana z powodu ryzyka uszkodzenia mózgu. Po 3. r.ż. można bezpiecznie odstawić lek na 4–6 tygodni i ocenić TSH/fT4." },
          { text: "W 2. miesiącu życia", correct: false, feedback: "Kategorycznie zakazane – grozi nieodwracalnym spadkiem IQ!" },
          { text: "Nigdy w życiu – nawet przy podejrzeniu przejściowej niedoczynności", correct: false, feedback: "Przy dysgenezji leczenie jest dożywotnie, ale przy tarczycy prawidłowej po 3. r.ż. wykonuje się próbę odstawienia w celu wykluczenia postaci przejściowej." },
          { text: "W 1. dobie po rozpoczęciu leczenia", correct: false, feedback: "Nonsens." }
        ]
      }
    ],
    pathoNodes: [
      {
        title: "1. Zaburzenie embriogenezy tarczycy (dysgenezja)",
        desc: "Mutacje genów PAX8, FOXE1, NKX2-1 lub czynniki środowiskowe zaburzają zstępowanie zawiązka tarczycy z dna gardła (otworu ślepego języka) do przedniej części szyi, prowadząc do ektopii lub aplazji.",
        drugTarget: "Scyntygrafia 99mTc i USG szyi weryfikujące obecność i położenie tkanki tarczycowej"
      },
      {
        title: "2. Głęboki deficyt T4 i T3 w tkankach docelowych",
        desc: "Brak hormonów tarczycy spowalnia metabolizm podstawowy (hipotermia, bradykardia), zmniejsza perystaltykę jelit (zaparcia) oraz obniża aktywność transferazy glukuronylowej w wątrobie (przedłużona żółtaczka).",
        drugTarget: "Lewotyroksyna (L-T4) w dawce 10–15 ug/kg/d – natychmiastowe wyrównanie poziomu fT4 w surowicy"
      },
      {
        title: "3. Uszkodzenie mielinizacji i kory mózgowej bez wczesnego leczenia",
        desc: "T3 odpowiada za mielinizację aksonów, rozwój dendrytów i synaptogenezę w OUN. Brak leczenia w oknie pierwszych 2–4 tygodni życia skutkuje nieodwracalnym uszkodzeniem neuronów i kretynizmem tarczycowym.",
        drugTarget: "Włączenie lewotyroksyny PRZED 14. dniem życia dzięki powszechnemu skriningowi TSH na bibule"
      }
    ],
    dutySummary: "Wrodzona niedoczynność tarczycy (CHT) to najczęstsza uleczalna przyczyna nieodwracalnego niedorozwoju umysłowego. Objawy: przedłużona żółtaczka, duży język, przepuklina pępkowa, zaparcia, 'zbyt grzeczne dziecko'. W Polsce powszechny skrining bada TSH z bibuły w 3.–5. dobie życia. Leczenie: Lewotyroksyna (L-T4) 10–15 ug/kg/d doustnie WDROŻONA PRZED 14. DNIEM ŻYCIA! Badanie kontrolne fT4 i TSH co miesiąc w pierwszym półroczu.",
    diffTable: [
      { disease: "Fizjologiczna żółtaczka noworodków", diff: "Ustępuje do 10.–14. doby życia u noworodka donoszonego; dziecko jest aktywne, prawidłowo przybiera na wadze, TSH w normie.", test: "Czas trwania żółtaczki, stężenie TSH i fT4 w surowicy." },
      { disease: "Choroba Hirschsprunga", diff: "Wrodzony brak zwojów nerwowych w splotach jelita; ciężkie zaparcia, brak oddania smółki w 48h, wymioty zielone; tarczyca i hormony prawidłowe.", test: "Biopsja ssąca odbytnicy (brak zwojów), TSH w normie." },
      { disease: "Zespół Downa (trisomia 21)", diff: "Obecność cech dysmorfii (skośne szpary powiekowe, bruzda poprzeczna dłoni, plamki Brushfielda); wymaga jednak rutynowego badania TSH z uwagi na częste współistnienie CHT.", test: "Kariotyp genetyczny, TSH/fT4." },
      { disease: "Żółtaczka pokarmu kobiecego", diff: "Utrzymuje się u zdrowego dziecka karmionego piersią do 4–12 tyg., ale dziecko doskonale przybiera na wadze, ma prawidłowe TSH i fT4.", test: "Prawidłowy profil TSH i fT4." }
    ],
    lekQuestions: [
      {
        question: "Wskaż najczęstszą przyczynę pierwotnej wrodzonej niedoczynności tarczycy u noworodków:",
        options: [
          "Autoimmunologiczne zapalenie tarczycy Hashimoto.",
          "Dysgenezja tarczycy (aplazja, hipoplazja lub ektopia gruczołu).",
          "Wrodzony niedobór jodu w diecie matki w Polsce.",
          "Wrodzona niedoczynność przysadki mózgowej.",
          "Przeciwciała blokujące receptor TSH u każdego dziecka."
        ],
        correct: 1,
        explanation: "Wrodzona dysgenezja tarczycy (obejmująca ektopię tkanki tarczycowej, np. tarczycę językową, aplazję/agenezję lub hipoplazję gruczołu) odpowiada za około 85% wszystkich przypadków wrodzonej niedoczynności tarczycy u noworodków. Pozostałe 15% to wrodzone defekty enzymatyczne syntezy hormonów (dyshormonogeneza)."
      },
      {
        question: "Aby zapobiec nieodwracalnemu uszkodzeniu ośrodkowego układu nerwowego i trwałemu niedorozwojowi umysłowemu u noworodka z wrodzoną niedoczynnością tarczycy, leczenie substytucyjne lewotyroksyną należy wdrożyć:",
        options: [
          "Przed ukończeniem 14. dnia życia.",
          "Dopiero po ukończeniu 3. miesiąca życia.",
          "W 1. roku życia po zakończeniu szczepień obowiązkowych.",
          "W momencie pojawienia się zębów mlecznych.",
          "Dopiero w razie stwierdzenia opóźnienia rozwoju psychomotorycznego."
        ],
        correct: 0,
        explanation: "Hormony tarczycy są krytyczne dla wczesnego rozwoju mózgu (mielinizacja, proliferacja komórek glejowych, synaptogeneza). Kluczowe okno terapeutyczne to pierwsze 2 tygodnie życia. Wdrożenie substytucji lewotyroksyną (L-T4) przed 14. dniem życia pozwala na osiągnięcie w pełni prawidłowego rozwoju intelektualnego (norma IQ)."
      },
      {
        question: "Który z poniższych objawów klinicznych NIE JEST charakterystyczny dla nieleczonej wrodzonej niedoczynności tarczycy u 4-tygodniowego niemowlęcia?",
        options: [
          "Przedłużająca się żółtaczka noworodkowa.",
          "Powiększenie języka (macroglossia) i chrypliwy płacz.",
          "Częste, obfite, wodniste biegunki z hipokaliemią.",
          "Przepuklina pępkowa i obniżone napięcie mięśniowe (hipotonia).",
          "Nadmierna senność, trudności w karmieniu i obniżona temperatura ciała."
        ],
        correct: 2,
        explanation: "W niedoczynności tarczycy perystaltyka przewodu pokarmowego jest znacznie spowolniona, co prowadzi do uporczywych zaparć, a nie biegunek! Do klasycznych objawów CHT należą: przedłużona żółtaczka, makroglosja, przepuklina pępkowa, wzdęty brzuch, hipotonia mięśniowa, chłodna marmurkowata skóra, senność i ochrypły płacz."
      }
    ],
    flashcards: [
      { q: "Jaka jest najczęstsza przyczyna wrodzonej niedoczynności tarczycy (CHT)?", a: "Dysgenezja tarczycy (ektopia, agenezja lub hipoplazja gruczołu), stanowiąca ~85% przypadków.", cat: "Pediatria" },
      { q: "W jakim czasie od urodzenia należy włączyć lewotyroksynę w CHT, aby uniknąć spadku IQ?", a: "Przed ukończeniem 14. dnia życia.", cat: "Pediatria" },
      { q: "Jakie są wczesne objawy kliniczne wrodzonej niedoczynności tarczycy?", a: "Przedłużająca się żółtaczka, duży język (makroglosja), przepuklina pępkowa, zaparcia, hipotonia, sucha skóra i senność.", cat: "Pediatria" },
      { q: "Kiedy i jak wykonuje się badanie przesiewowe w kierunku CHT w Polsce?", a: "W 3.–5. dobie życia z krwi włośniczkowej pobranej na bibułę (oznaczenie TSH).", cat: "Pediatria" },
      { q: "Jaka jest dawka początkowa lewotyroksyny (L-T4) u noworodka z CHT?", a: "10–15 ug/kg mc./dobę doustnie (wysoka dawka nasycająca).", cat: "Pediatria" }
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
  console.log('Batch 118-121 finished successfully.');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});

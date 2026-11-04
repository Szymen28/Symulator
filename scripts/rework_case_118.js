const fs = require('fs');
const path = require('path');
const { encryptStringAes } = require('./encrypt_case.js');

const MASTER_KEY = '@LEKSzymon28111999';
const CASES_DIR = path.join(__dirname, '..', 'cases');

console.log("Saving Case 118: Drgawki gorączkowe u dziecka...");

async function saveCase(caseData) {
  const filePath = path.join(CASES_DIR, caseData.filename);
  const jsonStr = JSON.stringify(caseData, null, 2);
  const encrypted = await encryptStringAes(jsonStr, MASTER_KEY);
  fs.writeFileSync(filePath, JSON.stringify(encrypted, null, 2), 'utf8');
  console.log(`[SAVED] Case #${caseData.id}: ${caseData.filename} (LEK Qs: ${caseData.lekQuestions.length}, Steps: ${caseData.steps.length}, Flashcards: ${caseData.flashcards.length})`);
}

const case118 = {
  id: 118,
  filename: "118_drgawki_goraczkowe.json",
  dept: "Pediatria",
  shortTitle: "18-miesięczny Jaś – Pierwszy w życiu napad drgawek przy gorączce 39,4°C (Drgawki gorączkowe)",
  diagnosisTitle: "Drgawki gorączkowe proste (Simple febrile seizures) u 18-miesięcznego dziecka w przebiegu ostrej infekcji wirusowej górnych dróg oddechowych",
  vitals: [
    { label: "Temperatura ciała", val: "39,4°C", sub: "Gwałtowny skok gorączki przed napadem", status: "vital-crit" },
    { label: "Akcja serca (HR)", val: "142/min", sub: "Tachykardia zatokowa adekwatna do gorączki", status: "vital-warn" },
    { label: "Saturacja SpO2 / GCS", val: "98% | GCS 14-15", sub: "Wybudzony ze snu ponapadowego", status: "vital-ok" },
    { label: "Ciśnienie tętnicze / RR", val: "94/58 mmHg | 28/min", sub: "Stabilność krążeniowo-oddechowa", status: "vital-ok" }
  ],
  vitalsObj: { hr: 142, bp: "94/58", spo2: 98, rr: 28, temp: 39.4, gcs: 15 },
  story: `<p><strong>Pacjent:</strong> 18-miesięczny Jaś (masa ciała 12 kg) został przywieziony przez zespół ratownictwa medycznego na szpitalny oddział ratunkowy po pierwszym w życiu napadzie drgawek z utratą przytomności, który wystąpił w domu podczas gwałtownego narastania gorączki do 39,4°C.</p><p><strong>Wywiad chorobowy:</strong> Od wczorajszego wieczora u chłopca występował łagodny katar i pokasływanie. Około godziny 14:00 matka zauważyła, że dziecko stało się rozpalone, a termometr wskazał 39,4°C. Kilkanaście minut po podaniu syropu z paracetamolem Jaś nagle zesztywniał, stracił kontakt z otoczeniem, doszło do wywrócenia gałek ocznych ku górze, sinicy wokół ust, ślinotoku oraz rytmicznych, symetrycznych skurczów klonicznych wszystkich czterech kończyn. Napad trwał około 3 minut i ustąpił samoistnie przed przyjazdem karetki. Po napadzie dziecko było wiotkie, senne i niereagujące przez około 15 minut (sen ponapadowy). Dotychczasowy rozwój psychomotoryczny chłopca był całkowicie prawidłowy, szczepienia realizowane zgodnie z PSO, wywiad rodzinny w kierunku padaczki ujemny (ojciec miał drgawki gorączkowe w dzieciństwie).</p><p><strong>Badanie przedmiotowe na SOR:</strong> Dziecko wybudzone ze snu ponapadowego, początkowo marudne, płacze na widok personelu, po chwili uspokaja się na rękach matki i nawiązuje prawidłowy kontakt wzrokowy (GCS 15). Źrenice równe, okrągłe, prawidłowo reagują na światło. Napięcie mięśniowe prawidłowe, symetryczne, odruchy głębokie symetryczne, odruch Babińskiego obustronnie ujemny, brak objawów ogniskowych (brak niedowładu kończyn – brak porażenia Todda). Ciemiączko przednie zarośnięte. Objawy oponowe (sztywność karku, objaw Brudzińskiego, objaw Kerniga) jednoznacznie ujemne. W badaniu laryngologicznym: błona śluzowa gardła przekrwiona, łuki podniebienne zaczerwienione, bez nalotów ropnych na migdałkach. Błony bębenkowe perłowoszare, bez cech ostrego zapalenia ucha środkowego. Osłuchowo nad płucami szmer pęcherzykowy prawidłowy, bez rzężeń. Brzuch miękki, niebolesny, wątroba i śledziona niewyczuwalne. Skóra czysta, bez wybroczyn, wykwitów i plamicy.</p>`,
  labs: {
    "Parametry biochemiczne i morfologia": [
      { name: "Glukoza przyłóżkowa (glukometr)", val: "94 mg/dl", norm: "70 - 105 mg/dl", flag: "NORMAL" },
      { name: "Sód (Na+)", val: "138 mmol/l", norm: "135 - 145 mmol/l", flag: "NORMAL" },
      { name: "Potas (K+)", val: "4,4 mmol/l", norm: "3,5 - 5,1 mmol/l", flag: "NORMAL" },
      { name: "Wapń zjonizowany", val: "1,22 mmol/l", norm: "1,15 - 1,32 mmol/l", flag: "NORMAL" },
      { name: "Leukocyty (WBC)", val: "9,4 G/L", norm: "6,0 - 15,0 G/L", flag: "NORMAL" },
      { name: "CRP", val: "4,2 mg/l", norm: "< 5,0 mg/l", flag: "NORMAL" },
      { name: "Mocz badanie ogólne", val: "Leukocyty 1-2 wpw, białko ujemne, azotyny ujemne", norm: "Prawidłowy", flag: "NORMAL" }
    ],
    "Diagnostyka różnicowa OUN (ocena wskazań)": [
      { name: "Stan neurologiczny", val: "Prawidłowy, brak objawów oponowych, GCS 15", norm: "Prawidłowy", flag: "NORMAL" },
      { name: "Nakłucie lędźwiowe (LP)", val: "Brak wskazań klinicznych (drgawki proste, brak objawów ZOMR)", norm: "Niewymagane", flag: "NORMAL" }
    ]
  },
  steps: [
    {
      stepNum: 1,
      title: "Krok 1: Wstępna ocena ABC i wykluczenie bezpośrednich stanów zagrożenia życia",
      desc: "Jaś trafia na SOR po 3-minutowym napadzie drgawek gorączkowych w domu. Jest wybudzony, ma gorączkę 39,4°C. Jakie parametry i badania przyłóżkowe musisz zweryfikować w pierwszej kolejności w ramach procedury ABCDE?",
      scenario: "Jaś trafia na SOR po 3-minutowym napadzie drgawek gorączkowych w domu. Jest wybudzony, ma gorączkę 39,4°C. Jakie parametry i badania przyłóżkowe musisz zweryfikować w pierwszej kolejności w ramach procedury ABCDE?",
      options: [
        {
          text: "Ocena drożności dróg oddechowych, oddechu (SpO2) i krążenia (tętno, nawrót kapilarny), natychmiastowe oznaczenie glikemii przyłóżkowej z nakłucia palca (wykluczenie hipoglikemii!) oraz zbadanie obecności wybroczyn na skórze (wykluczenie posocznicy meningokokowej)",
          correct: true,
          isCorrect: true,
          feedback: "✅ PRAWIDŁOWO! <strong>Złoty standard postępowania w ostrym dyżurze pediatrycznym!</strong> U każdego dziecka po napadzie drgawek bezwzględnym priorytetem jest natychmiastowe zbadanie poziomu glukozy we krwi (glikemia przyłóżkowa) w celu wykluczenia hipoglikemii, która może imitować lub wywoływać drgawki i prowadzić do trwałego uszkodzenia mózgu. Równocześnie należy ocenić skórę całego dziecka pod kątem wybroczyn (petechiae/purpura), które wskazywałyby na inwazyjną chorobę meningokokową z ZOMR."
        },
        {
          text: "Natychmiastowe wykonanie rezonansu magnetycznego głowy w znieczuleniu ogólnym",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>MRI nie jest badaniem pierwszego rzutu</strong> i nie wykonuje się go w trybie ostrym w typowych drgawkach gorączkowych."
        },
        {
          text: "Wstrzyknięcie 10 jednostek insuliny dożylnie",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD KRYTYCZNY! <strong>Wywołałoby śmiertelną hipoglikemię!</strong>"
        },
        {
          text: "Pobranie wycinka skóry z pośladka do badania histopatologicznego",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Całkowicie nieuzasadniona procedura.</strong>"
        }
      ]
    },
    {
      stepNum: 2,
      title: "Krok 2: Klasyfikacja napadu – drgawki gorączkowe proste vs złożone",
      desc: "Napad trwał 3 minuty, był uogólniony (symetryczny), wystąpił jeden raz w ciągu doby u 18-miesięcznego dziecka, a po napadzie nie ma żadnych ubytków neurologicznych (brak niedowładu Todda). Jak klasyfikujesz ten epizod?",
      scenario: "Napad trwał 3 minuty, był uogólniony (symetryczny), wystąpił jeden raz w ciągu doby u 18-miesięcznego dziecka, a po napadzie nie ma żadnych ubytków neurologicznych (brak niedowładu Todda). Jak klasyfikujesz ten epizod?",
      options: [
        {
          text: "Drgawki gorączkowe proste (simple febrile seizure) – uogólnione, trwające <15 minut, pojedynczy epizod w ciągu 24 godzin (lub w jednym rzucie gorączki), bez deficytu neurologicznego po napadzie, u dziecka między 6. miesiącem a 5. rokiem życia",
          correct: true,
          isCorrect: true,
          feedback: "✅ PRAWIDŁOWO! <strong>Podręcznikowa definicja drgawek gorączkowych prostych!</strong> Kryteria drgawek prostych: 1. Wiek 6 mies. – 5 lat, 2. Charakter uogólniony (toniczno-kloniczny), 3. Czas trwania <15 minut (najczęściej 1-3 minuty), 4. Pojedynczy napad w ciągu 24 h, 5. Brak ogniskowych objawów neurologicznych (brak porażenia Todda). Drgawki złożone (atypowe) to takie, które są ogniskowe, trwają >15 min LUB powtarzają się w ciągu 24 h."
        },
        {
          text: "Drgawki gorączkowe złożone (complex febrile seizure)",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Drgawki u Jasia spełniają wszystkie kryteria drgawek prostych</strong> (uogólnione, <15 min, pojedyncze)."
        },
        {
          text: "Stan padaczkowy lekooporny",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Stan padaczkowy definiuje się jako napad trwający >30 minut</strong> (lub >5 minut ciągłej aktywności drgawkowej)."
        },
        {
          text: "Napad afektywnego bezdechu siniczego",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Napad afektywnego bezdechu</strong> występuje w odpowiedzi na złość, ból lub płacz dziecka bez gorączki i bez rytmicznych drgawek klonicznych."
        }
      ]
    },
    {
      stepNum: 3,
      title: "Krok 3: Kwalifikacja do nakłucia lędźwiowego (LP) – wykluczenie ZOMR",
      desc: "Mama pyta z lękiem: 'Panie doktorze, czy trzeba będzie pobierać płyn z kręgosłupa? Słyszałam, że to może być zapalenie opon mózgowych!'. Jakie są aktualne, precyzyjne wskazania do wykonania nakłucia lędźwiowego (LP) u dziecka z drgawkami przy gorączce wg AAP i PTN?",
      scenario: "Mama pyta z lękiem: 'Panie doktorze, czy trzeba będzie pobierać płyn z kręgosłupa? Słyszałam, że to może być zapalenie opon mózgowych!'. Jakie są aktualne, precyzyjne wskazania do wykonania nakłucia lędźwiowego (LP) u dziecka z drgawkami przy gorączce wg AAP i PTN?",
      options: [
        {
          text: "Nakłucie lędźwiowe jest bezwzględnie wskazane w przypadku obecności objawów oponowych, przedłużających się zaburzeń świadomości po napadzie, u dzieci wcześniej leczonych antybiotykami (które mogą maskować ZOMR) oraz silnie rozważane u niemowląt <12. (a szczególnie <6.) miesiąca życia. U 18-miesięcznego Jasia w pełnym kontakcie logicznym i bez objawów oponowych LP NIE JEST wskazane!",
          correct: true,
          isCorrect: true,
          feedback: "✅ PRAWIDŁOWO! <strong>Żelazne wytyczne pediatryczne dotyczące nakłucia lędźwiowego!</strong> Wskazania do LP przy drgawkach z gorączką: 1. Obecność objawów oponowych (sztywność karku, objaw Kerniga/Brudzińskiego), 2. Utrzymujące się zaburzenia świadomości (GCS <15, apatia, patologiczna senność), 3. Wcześniejsza antybiotykoterapia (może maskować ropne ZOMR – 'dekapitowane ZOMR'), 4. Wiek <6-12 miesięcy (słabo wyrażone objawy oponowe), 5. Stan drgawkowy. U 18-miesięcznego Jasia bez wywiadu antybiotykowego, z prawidłowym stanem neurologicznym i ujemnymi objawami oponowymi, nakłucie lędźwiowe jest całkowicie bezzasadne."
        },
        {
          text: "Nakłucie lędźwiowe musi być wykonane u każdego dziecka po każdym napadzie drgawek bez wyjątku",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>W drgawkach prostych u dzieci >12. m.ż. rutynowe LP jest przeciwwskazane</strong> ze względu na brak korzyści i inwazyjność procedury."
        },
        {
          text: "Nakłucie lędźwiowe wykonuje się wyłącznie wtedy, gdy dziecko ma złamaną nogę",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Absurdalna przesłanka.</strong>"
        },
        {
          text: "Nakłucie lędźwiowe jest prawnie zakazane w Polsce u osób poniżej 18. roku życia",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>LP jest standardową procedurą ratującą życie w podejrzeniu neuroinfekcji.</strong>"
        }
      ]
    },
    {
      stepNum: 4,
      title: "Krok 4: Postępowanie farmakologiczne w napadzie przedłużającym się (>5 minut)",
      desc: "Chociaż u Jasia napad trwał 3 minuty i ustąpił samoistnie, musisz poinstruować zespół ratownictwa i rodziców, jaki lek i w jakiej dawce należy natychmiast podać, jeśli kolejny napad drgawek nie ustąpi samoistnie w ciągu 5 minut. Jaki jest lek pierwszego wyboru do podania doraźnego?",
      scenario: "Chociaż u Jasia napad trwał 3 minuty i ustąpił samoistnie, musisz poinstruować zespół ratownictwa i rodziców, jaki lek i w jakiej dawce należy natychmiast podać, jeśli kolejny napad drgawek nie ustąpi samoistnie w ciągu 5 minut. Jaki jest lek pierwszego wyboru do podania doraźnego?",
      options: [
        {
          text: "Doraźnie lek z grupy benzodiazepin: Diazepam doodbytniczo w postaci wlewki (0,5 mg/kg m.c. p.r.) LUB Midazolam na błonę śluzową policzka (0,2-0,3 mg/kg m.c. buccal midazolam / Buccolam); dożylnie w warunkach SOR Diazepam 0,2-0,3 mg/kg i.v. lub Midazolam 0,15-0,2 mg/kg i.v.",
          correct: true,
          isCorrect: true,
          feedback: "✅ PRAWIDŁOWO! <strong>Standard przerwania napadu drgawkowego (algorytm EPALS/APLS)!</strong> Większość drgawek gorączkowych ustępuje w ciągu 2-3 minut i nie wymaga leków przeciwdrgawkowych. Jeśli jednak napad trwa >5 minut, należy go przerwać, aby nie dopuścić do stanu padaczkowego. Lekami I rzutu w warunkach pozaszpitalnych są: 1. Midazolam dopoliczkowy (Buccolam 0,2-0,3 mg/kg m.c., preferowany współcześnie za łatwość i dyskrecję podania), 2. Diazepam doodbytniczo w mikrowlewce (0,5 mg/kg p.r. – u dzieci <10-15 kg dawka 5 mg, >15 kg dawka 10 mg). W dostępie dożylnym podaje się Diazepam i.v. (0,2-0,3 mg/kg) lub Midazolam i.v. (0,15-0,2 mg/kg)."
        },
        {
          text: "Kwas acetylosalicylowy dożylnie w szybkim bolusie",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD KRYTYCZNY! <strong>Aspiryna u małego dziecka grozi śmiertelnym zespołem Reye'a</strong> i nie ma żadnego działania przeciwdrgawkowego!"
        },
        {
          text: "Fenytoina doustnie w proszku wsypana do ust w trakcie drgawek",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD KRYTYCZNY! <strong>Nigdy nie wolno wkładać niczego do ust drgającego dziecka!</strong> Grozi to zadławieniem i aspiracją."
        },
        {
          text: "Wstrzyknięcie adrenaliny domięśniowo",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Adrenalina i.m. jest lekiem I rzutu w anafilaksji</strong>, a nie w drgawkach gorączkowych."
        }
      ]
    },
    {
      stepNum: 5,
      title: "Krok 5: Rola leków przeciwgorączkowych – kluczowy mit medyczny",
      desc: "Rodzice są przekonani, że gdyby podali paracetamol pół godziny wcześniej, do drgawek w ogóle by nie doszło. Pytają, czy agresywne podawanie leków przeciwgorączkowych przy każdej temperaturze >37,5°C uchroni Jasia przed kolejnym napadem w przyszłości. Co im wyjaśniasz zgodnie z EBM?",
      scenario: "Rodzice są przekonani, że gdyby podali paracetamol pół godziny wcześniej, do drgawek w ogóle by nie doszło. Pytają, czy agresywne podawanie leków przeciwgorączkowych przy każdej temperaturze >37,5°C uchroni Jasia przed kolejnym napadem w przyszłości. Co im wyjaśniasz zgodnie z EBM?",
      options: [
        {
          text: "Leki przeciwgorączkowe (Paracetamol, Ibuprofen) poprawiają komfort dziecka, ale NIE ZAPOBIEGAJĄ wystąpieniu ani nawrotom drgawek gorączkowych, ponieważ drgawki zależą od gwałtownego tempa narastania temperatury w pierwszej fazie infekcji i indywidualnego, uwarunkowanego genetycznie progu drgawkowego, a nie od bezwzględnej wartości szczytowej",
          correct: true,
          isCorrect: true,
          feedback: "✅ PRAWIDŁOWO! <strong>Jeden z najważniejszych faktów EBM i stałe pytanie na egzaminie LEK!</strong> Liczne prospektywne badania kliniczne z randomizacją wykazały jednoznacznie, że profilaktyczne lub agresywne podawanie leków przeciwgorączkowych (nawet naprzemiennie w maksymalnych dawkach) NIE zmniejsza częstości nawrotów drgawek gorączkowych. Drgawki często występują jako PIERWSZY objaw choroby, w fazie gwałtownego wzrostu temperatury, zanim rodzice zdążą w ogóle zorientować się, że dziecko ma gorączkę. Leki przeciwgorączkowe należy podawać w celu poprawy samopoczucia dziecka, a nie w iluzorycznej nadziei na zapobieganie drgawkom."
        },
        {
          text: "Tak, podawanie paracetamolu co 2 godziny przez cały rok daje 100% gwarancję braku drgawek",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD KRYTYCZNY! <strong>Doprowadziłoby to do śmiertelnej martwicy wątroby z przedawkowania paracetamolu!</strong>"
        },
        {
          text: "Leki przeciwgorączkowe są całkowicie zakazane u dzieci z drgawkami",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Leki podaje się objawowo w celu zmniejszenia cierpienia i obniżenia gorączki.</strong>"
        },
        {
          text: "Jedynym skutecznym lekiem zapobiegającym drgawkom jest codzienne picie octu jabłkowego",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Medycyna alternatywna bez wartości naukowej.</strong>"
        }
      ]
    },
    {
      stepNum: 6,
      title: "Krok 6: Ocena ryzyka rozwoju padaczki w przyszłości",
      desc: "Przerażeni rodzice pytają: 'Panie doktorze, czy nasz syn ma teraz padaczkę i czy będzie chory neurologicznie przez całe życie?'. Jakie jest rzeczywiste rokowanie i ryzyko rozwoju padaczki po przebyciu prostych drgawek gorączkowych?",
      scenario: "Przerażeni rodzice pytają: 'Panie doktorze, czy nasz syn ma teraz padaczkę i czy będzie chory neurologicznie przez całe życie?'. Jakie jest rzeczywiste rokowanie i ryzyko rozwoju padaczki po przebyciu prostych drgawek gorączkowych?",
      options: [
        {
          text: "Rokowanie jest doskonałe: drgawki gorączkowe proste NIE są padaczką i nie powodują uszkodzenia mózgu; ryzyko rozwoju padaczki w przyszłości wynosi zaledwie 1-2% (jest tylko minimalnie wyższe niż w populacji ogólnej, gdzie wynosi ok. 1%)",
          correct: true,
          isCorrect: true,
          feedback: "✅ PRAWIDŁOWO! <strong>Edukacja i uspokojenie rodziców!</strong> Drgawki gorączkowe proste są zjawiskiem wiekowo zależnym (niedojrzałość OUN) i ustępują samoistnie przed ukończeniem 5.-6. roku życia. Nie powodują uszkodzeń neuronów, deficytów intelektualnych ani trudności w nauce. Ryzyko padaczki wzrasta istotnie (do 5-10%) jedynie u dzieci z drgawkami złożonymi (ogniskowymi, przedłużającymi się), nieprawidłowym rozwojem neurologicznym przed napadem lub obciążonym wywiadem rodzinnym w kierunku padaczki."
        },
        {
          text: "Ryzyko padaczki wynosi 100% i dziecko musi natychmiast otrzymać rentę inwalidzką",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Drgawki gorączkowe proste to nie padaczka!</strong>"
        },
        {
          text: "Drgawki gorączkowe zawsze wywołują głębokie upośledzenie umysłowe w ciągu 3 dni",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Drgawki proste nie uszkadzają struktur mózgowia.</strong>"
        },
        {
          text: "Ryzyko wynosi dokładnie 50% i zależy od grupy krwi ojca",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Brak takiego związku.</strong>"
        }
      ]
    },
    {
      stepNum: 7,
      title: "Krok 7: Zasadność przewlekłego leczenia przeciwpadaczkowego",
      desc: "Lekarz rodzinny sugeruje włączenie u Jasia przewlekłego leczenia przeciwpadaczkowego (np. kwasu walproinowego lub karbamazepiny) przez okres 2 lat 'na wszelki wypadek'. Jakie jest oficjalne stanowisko Polskiego Towarzystwa Neurologów Dziecięcych i ILAE?",
      scenario: "Lekarz rodzinny sugeruje włączenie u Jasia przewlekłego leczenia przeciwpadaczkowego (np. kwasu walproinowego lub karbamazepiny) przez okres 2 lat 'na wszelki wypadek'. Jakie jest oficjalne stanowisko Polskiego Towarzystwa Neurologów Dziecięcych i ILAE?",
      options: [
        {
          text: "Przewlekłe stosowanie leków przeciwpadaczkowych w drgawkach gorączkowych prostych jest BEZWZGLĘDNIE PRZECIWWSKAZANE i niezgodne z wytycznymi; ryzyko działań niepożądanych leków (hepatotoksyczność, zaburzenia poznawcze) znacznie przewyższa potencjalne korzyści",
          correct: true,
          isCorrect: true,
          feedback: "✅ PRAWIDŁOWO! <strong>Żelazna zasada neurologii dziecięcej!</strong> W drgawkach gorączkowych prostych NIE stosuje się przewlekłego leczenia lekami przeciwpadaczkowymi (ani walproinianów, ani fenobarbitalu, ani karbamazepiny). Leki te nie zapobiegają rozwojowi ewentualnej padaczki w przyszłości, a wywierają liczne działania niepożądane na rozwijający się mózg dziecka (sedacja, hepatotoksyczność, zaburzenia funkcji poznawczych). Jedynym zabezpieczeniem jest posiadanie w domu leku doraźnego (doodbytniczego diazepamu lub dopoliczkowego midazolamu) na wypadek napadu przedłużającego się >5 minut."
        },
        {
          text: "Należy wdrożyć trójlekową terapię przeciwpadaczkową do 18. roku życia",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD KRYTYCZNY! <strong>Ciężki błąd w sztuce lekarskiej!</strong>"
        },
        {
          text: "Zaleca się wyłącznie leczenie neurochirurgiczne – resekcję płata skroniowego",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Absurdalna i okaleczająca propozycja.</strong>"
        },
        {
          text: "Konieczne jest podawanie dożylnych wlewów z tiopentalu w każdą środę",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Tiopental to barbituran stosowany w anestezjologii i śpiączce farmakologicznej.</strong>"
        }
      ]
    },
    {
      stepNum: 8,
      title: "Krok 8: Wypis ze szpitala i instruktaż pierwszej pomocy dla rodziców",
      desc: "Jaś po 4 godzinach obserwacji na SOR czuje się doskonale, pije, bawi się, a badanie przedmiotowe nie wykazuje odchyleń poza wirusowym zapaleniem gardła. Wypisujesz dziecko do domu. Jaki instruktaż pierwszej pomocy w razie nawrotu napadu musisz przekazać rodzicom?",
      scenario: "Jaś po 4 godzinach obserwacji na SOR czuje się doskonale, pije, bawi się, a badanie przedmiotowe nie wykazuje odchyleń poza wirusowym zapaleniem gardła. Wypisujesz dziecko do domu. Jaki instruktaż pierwszej pomocy w razie nawrotu napadu musisz przekazać rodzicom?",
      options: [
        {
          text: "Ułożyć dziecko na boku w pozycji bezpiecznej na miękkim podłożu, chronić głowę przed urazem, udrożnić drogi oddechowe, nie wkładać niczego do ust i nie powstrzymywać drgawek siłą; kontrolować czas trwania napadu – jeśli trwa >5 minut, podać doodbytniczo wlewkę z Diazepamu (5 mg) lub dopoliczkowo Midazolam (Buccolam 2,5 mg) i wezwać ZRM (tel. 112/999)",
          correct: true,
          isCorrect: true,
          feedback: "✅ PRAWIDŁOWO! <strong>Kompletny i profesjonalny instruktaż ratowniczy dla rodziców!</strong> Kluczowe zasady: 1. Zachować spokój i spojrzeć na zegarek (pomiar czasu to kluczowa informacja!), 2. Bezpieczna pozycja boczna (ochrona przed aspiracją śliny/wymiocin), 3. Ochrona głowy, 4. Bezwzględny zakaz wkładania przedmiotów między zęby i zakaz krępowania ruchów, 5. Jeśli napad przekroczy 5 minut – podanie leku ratunkowego (Midazolam buccal lub Diazepam p.r.) i pilne wezwanie ZRM."
        },
        {
          text: "Włożyć metalową łyżkę między zęby dziecka i trzymać na siłę ręce i nogi",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD KRYTYCZNY! <strong>Niebezpieczny i powszechny błąd laika!</strong> Wkładanie łyżki do ust grozi wyłamaniem zębów, uszkodzeniem jamy ustnej i aspiracją ciał obcych do dróg oddechowych!"
        },
        {
          text: "Zanurzyć drgające dziecko w wannie z lodowatą wodą w celu schłodzenia",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD KRYTYCZNY! <strong>Grozi utonięciem, skurczem krtani i szokiem termicznym!</strong>"
        },
        {
          text: "Podać dziecku w trakcie drgawek tabletkę paracetamolu do połknięcia",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD KRYTYCZNY! <strong>Doprowadzi do zadławienia i zgonu przez aspirację do dróg oddechowych!</strong>"
        }
      ]
    }
  ],
  pathoNodes: [
    {
      badge: "OGNIWO 1 • Niedojrzałość OUN i obniżony próg drgawkowy",
      title: "Niezakończona mielinizacja, przewaga neuroprzekaźnictwa pobudzającego (NMDA/GABA)",
      short: "Rozwijający się mózg niemowlęcia cechuje się fizjologicznie obniżonym progiem drgawkowym.",
      detail: "Mózg dziecka między 6. miesiącem a 5. rokiem życia znajduje się w fazie intensywnej neurogenezy, synaptogenezy i mielinizacji. W tym okresie występuje fizjologiczna przewaga mechanizmów pobudzających (wysoka gęstość i wrażliwość receptorów glutaminergicznych NMDA i AMPA) nad mechanizmami hamującymi (układ kwasu gamma-aminomasłowego – GABA nie ma jeszcze w pełni ukształtowanej funkcji hiperpolaryzacyjnej). Sprawia to, że próg pobudliwości neuronów kory mózgowej jest obniżony, co u predysponowanych genetycznie dzieci sprzyja synchronicznym wyładowaniom bioelektrycznym w warunkach stresu metabolicznego.",
      target: "Leczenie doraźne napadu przedłużającego się: <span class='dose-pill'>Midazolam 0,2-0,3 mg/kg m.c. na błonę śluzową policzka (Buccolam)</span> lub <span class='dose-pill'>Diazepam 0,5 mg/kg m.c. p.r.</span> (aktywacja receptorów GABA-A).",
      desc: "Niezakończona mielinizacja, przewaga neuroprzekaźnictwa pobudzającego (NMDA/GABA).",
      drugTarget: "Leczenie doraźne napadu przedłużającego się: <span class='dose-pill'>Midazolam 0,2-0,3 mg/kg m.c. na błonę śluzową policzka (Buccolam)</span> lub <span class='dose-pill'>Diazepam 0,5 mg/kg m.c. p.r.</span> (aktywacja receptorów GABA-A)."
    },
    {
      badge: "OGNIWO 2 • Cytokiny prozapalne i stromy skok temperatury",
      title: "Wyrzut IL-1beta i TNF-alfa w infekcji, przestawienie termostatu i hiperwentylacja",
      short: "Gwałtowny wyrzut cytokin prozapalnych bezpośrednio zwiększa pobudliwość kory mózgu.",
      detail: "W trakcie infekcji wirusowej (zwłaszcza HHV-6, wirus grypy, adenowirusy) aktywowane komórki układu odpornościowego uwalniają do krwioobiegu duże ilości pirogenów endogennych: interleukiny-1beta (IL-1beta), interleukiny-6 (IL-6) oraz TNF-alfa. Cytokiny te przenikają przez narządy okołokomorowe do podwzgórza, indukując syntezę prostaglandyny E2 (PGE2) i gwałtowny skok temperatury. Równocześnie IL-1beta bezpośrednio nasila transmisję glutaminergiczną w neuronach hipokampa. Gwałtowna hipertermia wywołuje przyspieszenie metabolizmu mózgowego, alkalozę oddechową wskutek hiperwentylacji oraz aktywację kanałów sodowych wrażliwych na temperaturę (np. kanału SCN1A).",
      target: "Objawowa kontrola gorączki dla komfortu: <span class='dose-pill'>Paracetamol 15 mg/kg m.c. p.o.</span> co 4-6 h naprzemiennie z <span class='dose-pill'>Ibuprofenem 10 mg/kg m.c. p.o.</span> co 8 h; letnie okłady.",
      desc: "Wyrzut IL-1beta i TNF-alfa w infekcji, przestawienie termostatu i hiperwentylacja.",
      drugTarget: "Objawowa kontrola gorączki dla komfortu: <span class='dose-pill'>Paracetamol 15 mg/kg m.c. p.o.</span> co 4-6 h naprzemiennie z <span class='dose-pill'>Ibuprofenem 10 mg/kg m.c. p.o.</span> co 8 h; letnie okłady."
    },
    {
      badge: "OGNIWO 3 • Wyładowanie toniczno-kloniczne i hipoksja ponapadowa",
      title: "Uogólnione wyładowanie kory, bezdech, desaturacja i faza wiotka (sen ponapadowy)",
      short: "Synchroniczne wyładowanie neuronów wywołuje skurcz toniczny, fazę kloniczną i sen ponapadowy.",
      detail: "Zsynchronizowana depolaryzacja dużych populacji neuronów kory ruchowej wyzwala fazę toniczną: nagły uogólniony skurcz mięśni szkieletowych, wywrócenie gałek ocznych, zaciśnięcie szczęk i bezdech wskutek skurczu mięśni oddechowych i głośni, prowadzący do sinicy wokół ust i spadku SpO2. Następnie, w miarę naprzemiennego hamowania przez neurony GABA-ergiczne, dochodzi do fazy klonicznej (rytmicznych skurczów i rozkurczów kończyn). Po wyczerpaniu zapasów ATP i glukozy w neuronach następuje nagłe wygaśnięcie wyładowań i głębokie zahamowanie czynności kory (faza ponapadowa), manifestująca się uogólnioną wiotkością mięśniową i snem ponapadowym trwającym zwykle 10-30 minut.",
      target: "Zabezpieczenie drożności dróg oddechowych: <span class='dose-pill'>pozycja bezpieczna na boku</span>, <span class='dose-pill'>tlenoterapia bierna 100% tlenem</span> w masce z rezerwuarem, ochrona przed aspiracją.",
      desc: "Uogólnione wyładowanie kory, bezdech, desaturacja i faza wiotka (sen ponapadowy).",
      drugTarget: "Zabezpieczenie drożności dróg oddechowych: <span class='dose-pill'>pozycja bezpieczna na boku</span>, <span class='dose-pill'>tlenoterapia bierna 100% tlenem</span> w masce z rezerwuarem, ochrona przed aspiracją."
    },
    {
      badge: "OGNIWO 4 • Predyspozycja genetyczna i polimorfizmy kanałowe",
      title: "Wielogenowe dziedziczenie wrażliwości na gorączkę (SCN1A, SCN1B, GABRG2)",
      short: "Dodatni wywiad rodzinny wiąże się z mutacjami genów kodujących kanały jonowe neuronów.",
      detail: "Drgawki gorączkowe wykazują wyraźną agregację rodzinną. U ponad 25-40% pacjentów stwierdza się drgawki gorączkowe w wywiadzie u rodziców lub rodzeństwa. Odpowiada za to dziedziczenie wielogenowe z niepełną penetracją, związane z polimorfizmami genów kodujących podjednostki napięciowozależnych kanałów sodowych (SCN1A, SCN1B) oraz podjednostkę gamma-2 receptora GABA-A (GABRG2). Mutacje te sprawiają, że kanały jonowe przy wzroście temperatury powyżej 38,5°C wykazują zaburzenia inaktywacji, prowadząc do przedłużonej depolaryzacji błony neuronu. W rzadkich przypadkach ciężkie mutacje de novo genu SCN1A odpowiadają za zespół Dravet (ciężką miokloniczną padaczkę niemowląt).",
      target: "Edukacja genetyczna i profilaktyka: <span class='dose-pill'>brak wskazań do przewlekłych leków przeciwpadaczkowych</span>; recepta na doraźny <span class='dose-pill'>Midazolam (Buccolam 2,5 mg)</span> do apteczki domowej.",
      desc: "Wielogenowe dziedziczenie wrażliwości na gorączkę (SCN1A, SCN1B, GABRG2).",
      drugTarget: "Edukacja genetyczna i profilaktyka: <span class='dose-pill'>brak wskazań do przewlekłych leków przeciwpadaczkowych</span>; recepta na doraźny <span class='dose-pill'>Midazolam (Buccolam 2,5 mg)</span> do apteczki domowej."
    }
  ],
  diffTable: {
    title: "⚔️ Tabela Różnicowa: Drgawki gorączkowe proste vs Drgawki gorączkowe złożone vs Ropne ZOMR vs Padaczka",
    headers: ["Cecha kliniczna", "Drgawki gorączkowe proste", "Drgawki gorączkowe złożone", "Zapalenie opon mózgowo-rdzeniowych", "Padaczka (Epilepsja)"],
    rows: [
      ["Wiek pacjenta", "6 miesięcy – 5 lat (szczyt 18 m.ż.)", "Dowolny wiek niemowlęcy/dziecięcy", "W każdym wieku (zwłaszcza niemowlęta)", "W każdym wieku"],
      ["Charakter napadu", "Uogólniony (symetryczny toniczno-kloniczny)", "Ogniskowy (asymetryczny) lub początek ogniskowy", "Różny (uogólniony, ogniskowy lub brak drgawek)", "Zależny od zespołu padaczkowego"],
      ["Czas trwania", "Krótki: <15 minut (zwykle 1-3 minuty)", "Przedłużony: >15 minut (lub stan padaczkowy)", "Zróżnicowany, często przedłużający się", "Różny (zwykle 1-3 minuty)"],
      ["Liczba napadów w dobie", "Pojedynczy napad w ciągu 24 h (w jednym epizodzie)", "Nawracający (>=2 napady w ciągu 24 h)", "Mogą powtarzać się wielokrotnie", "Nawracające napady bezgorączkowe"],
      ["Stan neurologiczny po napadzie", "Szybki powrót do normy (brak niedowładu Todda)", "Możliwy przejściowy niedowład (porażenie Todda)", "Utrzymujące się zaburzenia świadomości, senność patologiczna", "Zależny od napadu (możliwy niedowład Todda)"],
      ["Objawy oponowe", "BEZWZGLĘDNIE UJEMNE", "Zazwyczaj ujemne (chyba że współistnieje ZOMR)", "DODATNIE (sztywność karku, Kernig, Brudziński)", "Ujemne"],
      ["Wskazania do LP", "Brak wskazań u dzieci >12 m.ż. w pełnym kontakcie", "Wskazane rozważenie (często wykonywane)", "BEZWZGLĘDNIE WSKAZANE w trybie pilnym", "Brak wskazań w rutynowej diagnostyce"],
      ["Leczenie przewlekłe", "BEZWZGLĘDNIE PRZECIWWSKAZANE", "Zazwyczaj brak wskazań (indywidualne)", "Antybiotykoterapia empiryczna i.v. + Deksametazon", "Przewlekłe leki przeciwpadaczkowe (LPP)"]
    ]
  },
  dutySummary: {
    overview: "Drgawki gorączkowe proste są najczęstszą postacią napadów drgawkowych u dzieci w wieku od 6 miesięcy do 5 lat. Występują podczas nagłego wzrostu temperatury ciała w przebiegu infekcji pozamózgowych u dzieci bez wcześniejszych uszkodzeń neurologicznych. Charakteryzują się uogólnionym charakterem, krótkim czasem trwania (<15 min) i brakiem ubytków poudarowych. Mają doskonałe rokowanie i nie wymagają przewlekłego leczenia przeciwpadaczkowego ani rutynowego nakłucia lędźwiowego.",
    diagnostics: "1. Natychmiastowe oznaczenie glikemii przyłóżkowej z palca (wykluczenie hipoglikemii).<br>2. Dokładne badanie przedmiotowe pod kątem ogniska gorączki (gardło, uszy, płuca, układ moczowy) oraz ocena skóry pod kątem wybroczyn i plamicy (wykluczenie posocznicy meningokokowej).<br>3. Badanie neurologiczne z bezwzględną oceną objawów oponowych i symetrii odruchów.<br>4. Badanie ogólne moczu (wykluczenie zakażenia układu moczowego).<br>5. Nakłucie lędźwiowe (LP) – wykonywane wyłącznie przy obecności objawów oponowych, przedłużających się zaburzeniach świadomości, u dzieci po antybiotykoterapii lub u niemowląt <6-12 m.ż.",
    drugsAndDoses: "1. W razie napadu przedłużającego się (>5 minut) przedszpitalnie: <span class='dose-pill'>Diazepam 0,5 mg/kg m.c. p.r.</span> (wlewka doodbytnicza 5 mg u dzieci <15 kg; 10 mg u dzieci >15 kg) lub <span class='dose-pill'>Midazolam 0,2-0,3 mg/kg m.c. na błonę śluzową policzka (Buccolam)</span>.<br>2. W SOR przy obecnym kaniuli dożylnej: <span class='dose-pill'>Diazepam 0,2-0,3 mg/kg m.c. i.v.</span> powoli lub <span class='dose-pill'>Midazolam 0,15-0,2 mg/kg m.c. i.v.</span>.<br>3. Kontrola gorączki po wybudzeniu (dla komfortu pacjenta): <span class='dose-pill'>Paracetamol 15 mg/kg m.c. p.o./p.r.</span> co 4-6 h naprzemiennie z <span class='dose-pill'>Ibuprofenem 10 mg/kg m.c. p.o.</span> co 8 h.<br>4. KATEGORYCZNY ZAKAZ: nie wdrażać przewlekłego leczenia przeciwpadaczkowego w drgawkach prostych!",
    procedures: "1. Prawidłowe ułożenie dziecka w pozycji bezpiecznej na boku w trakcie napadu.<br>2. Zapewnienie drożności dróg oddechowych i odsysanie wydzieliny/śliny z jamy ustnej.<br>3. Bezwzględny zakaz wkładania jakichkolwiek przedmiotów (łyżki, palce) między zęby dziecka.<br>4. Spokojna obserwacja i dokładny pomiar czasu trwania napadu.<br>5. Wypisanie recepty na lek ratunkowy (Buccolam lub Diazepam wlewki) do apteczki domowej.",
    monitoring: "1. Monitorowanie parametrów życiowych (SpO2, tętno, ciśnienie) do czasu pełnego wybudzenia ze snu ponapadowego.<br>2. Obserwacja neurologiczna pod kątem ewentualnego porażenia Todda (ocena symetrii ruchów kończyn).<br>3. Kontrola temperatury ciała i ocena reakcji na leki przeciwgorączkowe.<br>4. Edukacja rodziców co do postępowania w razie kolejnego epizodu gorączkowego."
  },
  lekQuestions: [
    {
      id: 1,
      q: "Które z poniższych kryteriów charakteryzuje tzw. drgawki gorączkowe proste (simple febrile seizures)?",
      opts: [
        "A. Napad uogólniony, czas trwania poniżej 15 minut, pojedynczy epizod w ciągu 24 godzin, brak niedowładu po napadzie",
        "B. Napad ogniskowy trwający powyżej 30 minut z niedowładem połowiczym",
        "C. Napady powtarzające się co 2 godziny u noworodka w 2. dobie życia",
        "D. Drgawki występujące bez podwyższenia temperatury ciała u dziecka z wodogłowiem",
        "E. Napad miokloniczny z utratą słuchu i obrzękiem tarczy nerwu wzrokowego"
      ],
      options: [
        "A. Napad uogólniony, czas trwania poniżej 15 minut, pojedynczy epizod w ciągu 24 godzin, brak niedowładu po napadzie",
        "B. Napad ogniskowy trwający powyżej 30 minut z niedowładem połowiczym",
        "C. Napady powtarzające się co 2 godziny u noworodka w 2. dobie życia",
        "D. Drgawki występujące bez podwyższenia temperatury ciała u dziecka z wodogłowiem",
        "E. Napad miokloniczny z utratą słuchu i obrzękiem tarczy nerwu wzrokowego"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Prawidłowa odpowiedź: A. Drgawki gorączkowe proste to napady uogólnione, trwające krócej niż 15 minut, występujące pojedynczo w ciągu 24 godzin (w jednym rzucie gorączki), u dzieci w wieku od 6 miesięcy do 5 lat, bez objawów ogniskowych w okresie ponapadowym.",
      expl: "Prawidłowa odpowiedź: A. Drgawki gorączkowe proste to napady uogólnione, trwające krócej niż 15 minut, występujące pojedynczo w ciągu 24 godzin (w jednym rzucie gorączki), u dzieci w wieku od 6 miesięcy do 5 lat, bez objawów ogniskowych w okresie ponapadowym."
    },
    {
      id: 2,
      q: "Czy agresywne profilaktyczne stosowanie leków przeciwgorączkowych (paracetamolu, ibuprofenu) zapobiega nawrotom drgawek gorączkowych u predysponowanego dziecka?",
      opts: [
        "A. Nie, leki przeciwgorączkowe poprawiają samopoczucie dziecka, ale nie zmniejszają ryzyka wystąpienia ani nawrotu drgawek gorączkowych",
        "B. Tak, podawanie paracetamolu całkowicie eliminuje ryzyko drgawek w 100% przypadków",
        "C. Zapobiega, ale tylko pod warunkiem podawania leków dożylnie co 2 godziny",
        "D. Zapobiega wyłącznie u dziewczynek",
        "E. Tak, o ile lek zostanie podany w postaci aerozolu do nosa"
      ],
      options: [
        "A. Nie, leki przeciwgorączkowe poprawiają samopoczucie dziecka, ale nie zmniejszają ryzyka wystąpienia ani nawrotu drgawek gorączkowych",
        "B. Tak, podawanie paracetamolu całkowicie eliminuje ryzyko drgawek w 100% przypadków",
        "C. Zapobiega, ale tylko pod warunkiem podawania leków dożylnie co 2 godziny",
        "D. Zapobiega wyłącznie u dziewczynek",
        "E. Tak, o ile lek zostanie podany w postaci aerozolu do nosa"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Prawidłowa odpowiedź: A. Kluczowy fakt EBM: badania z randomizacją dowiodły, że leki przeciwgorączkowe nie zapobiegają drgawkom gorączkowym (drgawki zależą od gwałtownego tempa skoku temperatury i progu drgawkowego, często pojawiając się przed zaobserwowaniem gorączki).",
      expl: "Prawidłowa odpowiedź: A. Nie, leki przeciwgorączkowe poprawiają samopoczucie dziecka, ale nie zmniejszają ryzyka wystąpienia ani nawrotu drgawek gorączkowych",
      expl: "Prawidłowa odpowiedź: A. Kluczowy fakt EBM: badania z randomizacją dowiodły, że leki przeciwgorączkowe nie zapobiegają drgawkom gorączkowym (drgawki zależą od gwałtownego tempa skoku temperatury i progu drgawkowego, często pojawiając się przed zaobserwowaniem gorączki)."
    },
    {
      id: 3,
      q: "Jaki lek pierwszego rzutu należy podać przedszpitalnie w celu przerwania napadu drgawek gorączkowych trwającego powyżej 5 minut?",
      opts: [
        "A. Midazolam na błonę śluzową policzka (lub Diazepam wlewka doodbytnicza)",
        "B. Kwas walproinowy doustnie",
        "C. Karbamazepinę w czopku",
        "D. Paracetamol w czopku",
        "E. Fenobarbital doustnie"
      ],
      options: [
        "A. Midazolam na błonę śluzową policzka (lub Diazepam wlewka doodbytnicza)",
        "B. Kwas walproinowy doustnie",
        "C. Karbamazepinę w czopku",
        "D. Paracetamol w czopku",
        "E. Fenobarbital doustnie"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Prawidłowa odpowiedź: A. Lekiem I wyboru w napadzie przedłużającym się (>5 min) w warunkach pozaszpitalnych jest midazolam podawany na błonę śluzową policzka (Buccolam 0,2-0,3 mg/kg) lub diazepam doodbytniczo we wlewce (0,5 mg/kg).",
      expl: "Prawidłowa odpowiedź: A. Midazolam na błonę śluzową policzka (lub Diazepam wlewka doodbytnicza)",
      expl: "Prawidłowa odpowiedź: A. Lekiem I wyboru w napadzie przedłużającym się (>5 min) w warunkach pozaszpitalnych jest midazolam podawany na błonę śluzową policzka (Buccolam 0,2-0,3 mg/kg) lub diazepam doodbytniczo we wlewce (0,5 mg/kg)."
    },
    {
      id: 4,
      q: "U 18-miesięcznego dziecka z pierwszym w życiu, typowym, 2-minutowym uogólnionym napadem drgawek gorączkowych, które po napadzie jest w pełni przytomne i nie wykazuje objawów oponowych, nakłucie lędźwiowe:",
      opts: [
        "A. NIE JEST wskazane",
        "B. Jest bezwzględnie konieczne w trybie natychmiastowym",
        "C. Należy wykonać po uprzednim podaniu mannitolu",
        "D. Powinno być wykonane wyłącznie w znieczuleniu ogólnym",
        "E. Zastępuje badanie ogólne moczu"
      ],
      options: [
        "A. NIE JEST wskazane",
        "B. Jest bezwzględnie konieczne w trybie natychmiastowym",
        "C. Należy wykonać po uprzednim podaniu mannitolu",
        "D. Powinno być wykonane wyłącznie w znieczuleniu ogólnym",
        "E. Zastępuje badanie ogólne moczu"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Prawidłowa odpowiedź: A. Zgodnie z wytycznymi AAP i PTN rutynowe nakłucie lędźwiowe u dzieci powyżej 12. miesiąca życia z typowymi drgawkami gorączkowymi prostymi i brakiem objawów oponowych oraz zaburzeń świadomości nie jest zalecane.",
      expl: "Prawidłowa odpowiedź: A. NIE JEST wskazane",
      expl: "Prawidłowa odpowiedź: A. Zgodnie z wytycznymi AAP i PTN rutynowe nakłucie lędźwiowe u dzieci powyżej 12. miesiąca życia z typowymi drgawkami gorączkowymi prostymi i brakiem objawów oponowych oraz zaburzeń świadomości nie jest zalecane."
    },
    {
      id: 5,
      q: "Jakie jest ryzyko rozwoju padaczki w przyszłości u dziecka po przebyciu pojedynczego epizodu prostych drgawek gorączkowych?",
      opts: [
        "A. Niskie, wynosi około 1-2% (porównywalne z ryzykiem w populacji ogólnej)",
        "B. Wynosi dokładnie 50%",
        "C. Wynosi 100%",
        "D. Wynosi 25-30%",
        "E. Zero procent – drgawki gorączkowe całkowicie chronią przed padaczką"
      ],
      options: [
        "A. Niskie, wynosi około 1-2% (porównywalne z ryzykiem w populacji ogólnej)",
        "B. Wynosi dokładnie 50%",
        "C. Wynosi 100%",
        "D. Wynosi 25-30%",
        "E. Zero procent – drgawki gorączkowe całkowicie chronią przed padaczką"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Prawidłowa odpowiedź: A. Dziecko z drgawkami prostymi ma znakomite rokowanie – ryzyko rozwoju padaczki wynosi 1-2% (podczas gdy w populacji ogólnej wynosi ok. 1%).",
      expl: "Prawidłowa odpowiedź: A. Niskie, wynosi około 1-2% (porównywalne z ryzykiem w populacji ogólnej)",
      expl: "Prawidłowa odpowiedź: A. Dziecko z drgawkami prostymi ma znakomite rokowanie – ryzyko rozwoju padaczki wynosi 1-2% (podczas gdy w populacji ogólnej wynosi ok. 1%)."
    },
    {
      id: 6,
      q: "Czym jest tzw. porażenie (niedowład) Todda?",
      opts: [
        "A. Przejściowy, najczęściej połowiczy niedowład kończyn występujący w okresie ponapadowym po drgawkach o charakterze ogniskowym",
        "B. Trwałe uszkodzenie nerwu twarzowego po porodzie kleszczowym",
        "C. Wrodzona wiotkość stawów kolanowych",
        "D. Porażenie mięśni krtani w krztuścu",
        "E. Brak czucia w obu stopach po zakażeniu tężcem"
      ],
      options: [
        "A. Przejściowy, najczęściej połowiczy niedowład kończyn występujący w okresie ponapadowym po drgawkach o charakterze ogniskowym",
        "B. Trwałe uszkodzenie nerwu twarzowego po porodzie kleszczowym",
        "C. Wrodzona wiotkość stawów kolanowych",
        "D. Porażenie mięśni krtani w krztuścu",
        "E. Brak czucia w obu stopach po zakażeniu tężcem"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Prawidłowa odpowiedź: A. Niedowład Todda to przejściowy deficyt neurologiczny (najczęściej niedowład połowiczy) po napadzie padaczkowym/drgawkowym o charakterze ogniskowym, ustępujący samoistnie w ciągu kilku do 24 godzin. Jego obecność definiuje drgawki jako złożone.",
      expl: "Prawidłowa odpowiedź: A. Przejściowy, najczęściej połowiczy niedowład kończyn występujący w okresie ponapadowym po drgawkach o charakterze ogniskowym",
      expl: "Prawidłowa odpowiedź: A. Niedowład Todda to przejściowy deficyt neurologiczny (najczęściej niedowład połowiczy) po napadzie padaczkowym/drgawkowym o charakterze ogniskowym, ustępujący samoistnie w ciągu kilku do 24 godzin. Jego obecność definiuje drgawki jako złożone."
    },
    {
      id: 7,
      q: "W jakim przedziale wiekowym typowo występują drgawki gorączkowe u dzieci?",
      opts: [
        "A. Od 6. miesiąca życia do 5. roku życia",
        "B. Od 1. do 7. doby życia",
        "C. Od 10. do 18. roku życia",
        "D. W dowolnym wieku powyżej 20 lat",
        "E. Wyłącznie w pierwszym miesiącu życia"
      ],
      options: [
        "A. Od 6. miesiąca życia do 5. roku życia",
        "B. Od 1. do 7. doby życia",
        "C. Od 10. do 18. roku życia",
        "D. W dowolnym wieku powyżej 20 lat",
        "E. Wyłącznie w pierwszym miesiącu życia"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Prawidłowa odpowiedź: A. Z definicji drgawki gorączkowe rozpoznaje się u dzieci między 6. miesiącem a 5. rokiem życia (ze szczytem zapadalności w 18. miesiącu życia). Drgawki z gorączką u noworodka (<1 m.ż.) lub niemowlęcia <6 m.ż. wymagają pilnej diagnostyki w kierunku neuroinfekcji lub wad metabolicznych.",
      expl: "Prawidłowa odpowiedź: A. Od 6. miesiąca życia do 5. roku życia",
      expl: "Prawidłowa odpowiedź: A. Z definicji drgawki gorączkowe rozpoznaje się u dzieci między 6. miesiącem a 5. rokiem życia (ze szczytem zapadalności w 18. miesiącu życia). Drgawki z gorączką u noworodka (<1 m.ż.) lub niemowlęcia <6 m.ż. wymagają pilnej diagnostyki w kierunku neuroinfekcji lub wad metabolicznych."
    },
    {
      id: 8,
      q: "Które z poniższych postępowań w trakcie ostrego napadu drgawek u dziecka w domu jest BŁĘDNE i niebezpieczne?",
      opts: [
        "A. Wkładanie twardych przedmiotów (łyżki, patyczka) do jamy ustnej dziecka w celu 'ochrony przed przygryzieniem języka'",
        "B. Ułożenie dziecka na boku w pozycji bezpiecznej",
        "C. Zabezpieczenie głowy przed uderzeniem o twarde podłoże",
        "D. Sprawdzenie godziny i kontrolowanie czasu trwania napadu",
        "E. Wezwanie zespołu ratownictwa medycznego, jeśli napad trwa ponad 5 minut"
      ],
      options: [
        "A. Wkładanie twardych przedmiotów (łyżki, patyczka) do jamy ustnej dziecka w celu 'ochrony przed przygryzieniem języka'",
        "B. Ułożenie dziecka na boku w pozycji bezpiecznej",
        "C. Zabezpieczenie głowy przed uderzeniem o twarde podłoże",
        "D. Sprawdzenie godziny i kontrolowanie czasu trwania napadu",
        "E. Wezwanie zespołu ratownictwa medycznego, jeśli napad trwa ponad 5 minut"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Prawidłowa odpowiedź: A. Wkładanie jakichkolwiek przedmiotów do ust drgającego dziecka jest bezwzględnie zakazane! Może spowodować wyłamanie zębów, uszkodzenie tkanek miękkich oraz śmiertelne zaaspirowanie ciała obcego lub krwi do dróg oddechowych.",
      expl: "Prawidłowa odpowiedź: A. Wkładanie twardych przedmiotów (łyżki, patyczka) do jamy ustnej dziecka w celu 'ochrony przed przygryzieniem języka'",
      expl: "Prawidłowa odpowiedź: A. Wkładanie jakichkolwiek przedmiotów do ust drgającego dziecka jest bezwzględnie zakazane! Może spowodować wyłamanie zębów, uszkodzenie tkanek miękkich oraz śmiertelne zaaspirowanie ciała obcego lub krwi do dróg oddechowych."
    },
    {
      id: 9,
      q: "Czy po przebyciu pierwszego epizodu prostych drgawek gorączkowych zaleca się włączenie przewlekłej terapii przeciwpadaczkowej (np. walproinianem sodu)?",
      opts: [
        "A. Nie, przewlekła terapia przeciwpadaczkowa w drgawkach gorączkowych prostych jest przeciwwskazana",
        "B. Tak, jest bezwzględnym standardem przez co najmniej 3 lata",
        "C. Tak, pod warunkiem stosowania politerapii trójlekowej",
        "D. Zaleca się wyłącznie fenobarbital w dawkach toksycznych",
        "E. Zależy to od stężenia dehydrogenazy mleczanowej"
      ],
      options: [
        "A. Nie, przewlekła terapia przeciwpadaczkowa w drgawkach gorączkowych prostych jest przeciwwskazana",
        "B. Tak, jest bezwzględnym standardem przez co najmniej 3 lata",
        "C. Tak, pod warunkiem stosowania politerapii trójlekowej",
        "D. Zaleca się wyłącznie fenobarbital w dawkach toksycznych",
        "E. Zależy to od stężenia dehydrogenazy mleczanowej"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Prawidłowa odpowiedź: A. Przewlekłe leczenie przeciwpadaczkowe w drgawkach prostych nie przynosi korzyści, nie zapobiega padaczce i wiąże się ze znacznym ryzykiem powikłań farmakoterapii – jest całkowicie niewskazane.",
      expl: "Prawidłowa odpowiedź: A. Nie, przewlekła terapia przeciwpadaczkowa w drgawkach gorączkowych prostych jest przeciwwskazana",
      expl: "Prawidłowa odpowiedź: A. Przewlekłe leczenie przeciwpadaczkowe w drgawkach prostych nie przynosi korzyści, nie zapobiega padaczce i wiąże się ze znacznym ryzykiem powikłań farmakoterapii – jest całkowicie niewskazane."
    },
    {
      id: 10,
      q: "Jakie jest ryzyko powtórzenia się (nawrotu) drgawek gorączkowych przy kolejnych epizodach gorączki u dziecka, które przebyło pierwszy napad?",
      opts: [
        "A. Około 30-35% (wyższe, gdy pierwszy napad wystąpił przed 1. rokiem życia)",
        "B. Zero procent – drgawki nigdy nie nawracają",
        "C. Sto procent przy każdej infekcji",
        "D. Dokładnie 95% u chłopców i 5% u dziewczynek",
        "E. Ryzyko występuje tylko w przypadku zakażenia wirusem wścieklizny"
      ],
      options: [
        "A. Około 30-35% (wyższe, gdy pierwszy napad wystąpił przed 1. rokiem życia)",
        "B. Zero procent – drgawki nigdy nie nawracają",
        "C. Sto procent przy każdej infekcji",
        "D. Dokładnie 95% u chłopców i 5% u dziewczynek",
        "E. Ryzyko występuje tylko w przypadku zakażenia wirusem wścieklizny"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Prawidłowa odpowiedź: A. U około 1/3 (30-35%) dzieci, które przebyły pierwszy napad drgawek gorączkowych, dojdzie do nawrotu przy kolejnej gorączce. Ryzyko nawrotu sięga 50%, jeśli pierwszy napad wystąpił u niemowlęcia poniżej 12. miesiąca życia.",
      expl: "Prawidłowa odpowiedź: A. Około 30-35% (wyższe, gdy pierwszy napad wystąpił przed 1. rokiem życia)",
      expl: "Prawidłowa odpowiedź: A. U około 1/3 (30-35%) dzieci, które przebyły pierwszy napad drgawek gorączkowych, dojdzie do nawrotu przy kolejnej gorączce. Ryzyko nawrotu sięga 50%, jeśli pierwszy napad wystąpił u niemowlęcia poniżej 12. miesiąca życia."
    },
    {
      id: 11,
      q: "U dziecka z drgawkami przy gorączce obecność wybroczyn (petechiae) na skórze tułowia i kończyn nakazuje w pierwszej kolejności pilne podejrzenie:",
      opts: [
        "A. Inwazyjnej choroby meningokokowej (posocznicy / ZOMR wywołanego przez Neisseria meningitidis)",
        "B. Pokrzywki cieplnej",
        "C. Skazy krwotocznej w przebiegu hemofilii B",
        "D. Zwykłego odczynu poszczepiennego",
        "E. Zespołu nerczycowego"
      ],
      options: [
        "A. Inwazyjnej choroby meningokokowej (posocznicy / ZOMR wywołanego przez Neisseria meningitidis)",
        "B. Pokrzywki cieplnej",
        "C. Skazy krwotocznej w przebiegu hemofilii B",
        "D. Zwykłego odczynu poszczepiennego",
        "E. Zespołu nerczycowego"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Prawidłowa odpowiedź: A. Połączenie gorączki, drgawek i wybroczyn na skórze to alarmowy objaw inwazyjnej choroby meningokokowej (sepsy meningokokowej / ZOMR), wymagający natychmiastowego podania ceftriaksonu i intensywnej terapii.",
      expl: "Prawidłowa odpowiedź: A. Inwazyjnej choroby meningokokowej (posocznicy / ZOMR wywołanego przez Neisseria meningitidis)",
      expl: "Prawidłowa odpowiedź: A. Połączenie gorączki, drgawek i wybroczyn na skórze to alarmowy objaw inwazyjnej choroby meningokokowej (sepsy meningokokowej / ZOMR), wymagający natychmiastowego podania ceftriaksonu i intensywnej terapii."
    }
  ],
  flashcards: [
    {
      front: "Jakie są 4 główne kryteria drgawek gorączkowych prostych?",
      back: "• Napad uogólniony (symetryczny toniczno-kloniczny).<br>• Czas trwania <15 minut (zwykle 1-3 min).<br>• Pojedynczy napad w ciągu 24 h (w jednym epizodzie gorączki).<br>• Brak ubytków neurologicznych po napadzie (brak porażenia Todda)."
    },
    {
      front: "Czy leki przeciwgorączkowe zapobiegają drgawkom gorączkowym?",
      back: "• NIE! Badania EBM jednoznacznie wykazały, że Paracetamol/Ibuprofen NIE zapobiegają drgawkom.<br>• Drgawki zależą od tempa skoku temperatury i progu drgawkowego, a nie od leków.<br>• Leki podaje się wyłącznie dla poprawy komfortu dziecka."
    },
    {
      front: "Jaki lek pierwszego rzutu podaje się w napadzie drgawek trwającym >5 min?",
      back: "• Przedszpitalnie: Midazolam dopoliczkowy (Buccolam 0,2-0,3 mg/kg) LUB Diazepam doodbytniczo (wlewka 0,5 mg/kg p.r.).<br>• W szpitalu (i.v.): Diazepam 0,2-0,3 mg/kg i.v. lub Midazolam 0,15-0,2 mg/kg i.v."
    },
    {
      front: "Kiedy w drgawkach z gorączką bezwzględnie wykonać nakłucie lędźwiowe (LP)?",
      back: "• Obecność objawów oponowych (sztywność karku, Kernig, Brudziński).<br>• Przedłużające się zaburzenia świadomości (senność patologiczna, GCS <15).<br>• Dziecko wcześniej leczone antybiotykiem (maskowanie ZOMR).<br>• Niemowlęta <6-12. miesiąca życia."
    },
    {
      front: "Jakie jest ryzyko rozwoju padaczki po drgawkach gorączkowych prostych?",
      back: "• Zaledwie 1-2% (porównywalne z populacją ogólną).<br>• Drgawki gorączkowe proste to NIE jest padaczka i nie powodują uszkodzenia mózgu!"
    },
    {
      front: "Czego KATEGORYCZNIE NIE WOLNO robić w trakcie napadu drgawek?",
      back: "• NIE wkładać niczego do ust (łyżki, palców) – ryzyko wyłamania zębów i uduszenia!<br>• NIE krępować ruchów na siłę.<br>• NIE zanurzać w zimnej wodzie.<br>• NIE podawać leków/płynów doustnie."
    }
  ]
};

async function main() {
  await saveCase(case118);
}
main();

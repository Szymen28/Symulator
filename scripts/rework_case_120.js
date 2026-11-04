const fs = require('fs');
const path = require('path');
const { encryptStringAes } = require('./encrypt_case.js');

const MASTER_KEY = '@LEKSzymon28111999';
const CASES_DIR = path.join(__dirname, '..', 'cases');

console.log("Saving Case 120: Cukrzyca typu 1 u dziecka z kwasicą ketonową (DKA)...");

async function saveCase(caseData) {
  const filePath = path.join(CASES_DIR, caseData.filename);
  const jsonStr = JSON.stringify(caseData, null, 2);
  const encrypted = await encryptStringAes(jsonStr, MASTER_KEY);
  fs.writeFileSync(filePath, JSON.stringify(encrypted, null, 2), 'utf8');
  console.log(`[SAVED] Case #${caseData.id}: ${caseData.filename} (LEK Qs: ${caseData.lekQuestions.length}, Steps: ${caseData.steps.length}, Flashcards: ${caseData.flashcards.length})`);
}

const case120 = {
  id: 120,
  filename: "120_cukrzyca_t1_dka_dziecko.json",
  dept: "Pediatria",
  shortTitle: "8-letnia Emilka – Oddech Kussmaula, ból brzucha i kwasica ketonowa (Cukrzyca T1 / DKA)",
  diagnosisTitle: "Cukrzyca typu 1 (T1D) po raz pierwszy ujawniona u dziecka, powikłana ciężką kwasicą ketonową (DKA – Diabetic Ketoacidosis) i odwodnieniem II stopnia",
  vitals: [
    { label: "Glikemia / Ketonemia", val: "486 mg/dl | 5,8 mmol/l", sub: "Ciężka hiperglikemia i wysoka ketonemia", status: "vital-crit" },
    { label: "Gazometria (pH / HCO3)", val: "pH 7,12 | HCO3- 7,8 mmol/l", sub: "Ciężka kwasica metaboliczna z luką anionową", status: "vital-crit" },
    { label: "Akcja serca (HR) / Oddech", val: "138/min | RR 36/min", sub: "Tachykardia i oddech Kussmaula (kwasiczy)", status: "vital-crit" },
    { label: "Ciśnienie tętnicze / SpO2", val: "88/52 mmHg | 99%", sub: "Hipotensja w przebiegu odwodnienia", status: "vital-warn" }
  ],
  vitalsObj: { hr: 138, bp: "88/52", spo2: 99, rr: 36, temp: 36.6, gcs: 13 },
  story: `<p><strong>Pacjentka:</strong> 8-letnia Emilka (masa ciała 25 kg, wyjściowo przed chorobą 28 kg – ubytek masy ciała o >10%) została przywieziona przez zespół ratownictwa medycznego na szpitalny oddział ratunkowy z powodu postępującej apatii, utrudnionego kontaktu słownego, silnego bólu brzucha z wymiotami oraz bardzo głębokiego, głośnego i przyspieszonego oddechu.</p><p><strong>Wywiad chorobowy:</strong> Od około 3-4 tygodni rodzice obserwowali u córki wzmożone pragnienie (polidypsja – dziewczynka wypijała ponad 4 litry wody na dobę, wstawała pić w nocy) oraz oddawanie olbrzymich ilości moczu (poliuria i nykturia; pojawiło się wtórne moczenie nocne, mimo że od 3. roku życia kontrolowała mikcję). Mimo wzmożonego apetytu Emilka wyraźnie schudła, a żebra stały się widoczne pod skórą. Wczoraj rano pojawiło się osłabienie, jadłowstręt, a od nocy dołączyły wymioty treścią żołądkową i silny ból całego brzucha. Lekarz POZ podejrzewał ostre zapalenie wyrostka robaczkowego lub zatrucie pokarmowe i wezwał karetkę. W wywiadzie rodzinnym: brak cukrzycy u rodziców, dziadek choruje na cukrzycę typu 2.</p><p><strong>Badanie przedmiotowe na SOR:</strong> Dziewczynka w stanie ogólnym ciężkim, podsypiająca, reaguje na głos z opóźnieniem, zdezorientowana co do czasu (GCS 13). Cechy ciężkiego odwodnienia (ok. 8-10% ubytku płynów): skóra szara, sucha, chłodna, fałd skórny na brzuchu rozprostowuje się powoli (>2 sekundy), gałki oczne zapadnięte, podsychające języka i spierzchnięte wargi, tętno obwodowe słabo napięte, nawrót kapilarny CRT 3 sekundy. Układ oddechowy: obecny klasyczny oddech Kussmaula – głośny, głęboki, miarowy oddech kwasiczy z westchnieniami o częstości 36/min; w powietrzu wydechowym uderzający, intensywny, słodkawy zapach acetonu (gnijących jabłek). Osłuchowo nad płucami szmer pęcherzykowy prawidłowy, bez rzężeń i świstów. W badaniu jamy brzusznej: brzuch deskowaty, wzmożone napięcie powłok z rozlaną bolesnością palpacyjną (objaw rzekomego ostrego brzucha / pseudoappendicitis), objawy otrzewnowe wątpliwe, perystaltyka skąpa, leniwa. Brak ogniskowych ubytków neurologicznych, źrenice równe, objawy oponowe ujemne.</p>`,
  labs: {
    "Parametry biochemiczne i gazometria (obraz DKA)": [
      { name: "Glukoza przyłóżkowa z krwi", val: "486 mg/dl (27,0 mmol/l)", norm: "70 - 105 mg/dl", flag: "CRIT_HIGH" },
      { name: "pH krwi (gazometria włośniczkowa/żylna)", val: "7,12", norm: "7,35 - 7,45", flag: "CRIT_LOW" },
      { name: "Wodorowęglany aktualne (HCO3-)", val: "7,8 mmol/l", norm: "22 - 26 mmol/l", flag: "CRIT_LOW" },
      { name: "Nadmiar zasad (BE)", val: "-21,4 mmol/l", norm: "-2,5 do +2,5 mmol/l", flag: "CRIT_LOW" },
      { name: "pCO2 (kompensacja oddechowa)", val: "22 mmHg", norm: "35 - 45 mmHg", flag: "LOW" },
      { name: "Beta-hydroksymaślan we krwi (ketonemia)", val: "5,8 mmol/l", norm: "< 0,5 mmol/l (DKA >3,0)", flag: "CRIT_HIGH" },
      { name: "Luka anionowa (Anion Gap)", val: "28,2 mEq/l", norm: "8 - 16 mEq/l", flag: "CRIT_HIGH" }
    ],
    "Elektrolity i parametry nerkowe": [
      { name: "Sód w surowicy (Na+ oznaczony)", val: "132 mmol/l", norm: "135 - 145 mmol/l", flag: "LOW" },
      { name: "Sód skorygowany o glikemię (Na_kor)", val: "138,2 mmol/l", norm: "135 - 145 mmol/l", flag: "NORMAL" },
      { name: "Potas w surowicy (K+)", val: "4,8 mmol/l", norm: "3,5 - 5,1 mmol/l", flag: "NORMAL" },
      { name: "Chlorki (Cl-)", val: "96 mmol/l", norm: "98 - 107 mmol/l", flag: "LOW" },
      { name: "Mocznik", val: "52 mg/dl", norm: "15 - 36 mg/dl", flag: "HIGH" },
      { name: "Kreatynina", val: "1,2 mg/dl", norm: "0,4 - 0,7 mg/dl", flag: "HIGH" },
      { name: "Mocz badanie ogólne - glukoza", val: "Obecna (>1000 mg/dl, ++++)", norm: "Nieobecna", flag: "CRIT_HIGH" },
      { name: "Mocz badanie ogólne - ciała ketonowe", val: "Obecne (++++, silnie dodatnie)", norm: "Nieobecne", flag: "CRIT_HIGH" }
    ]
  },
  steps: [
    {
      stepNum: 1,
      title: "Krok 1: Weryfikacja kryteriów rozpoznania kwasicy ketonowej (DKA)",
      desc: "U 8-letniej Emilki stwierdzasz glikemię 486 mg/dl, pH 7,12, HCO3- 7,8 mmol/l oraz beta-hydroksymaślan 5,8 mmol/l. Jakie są trzy bezwzględne kryteria rozpoznania cukrzycowej kwasicy ketonowej (DKA) wg wytycznych ISPAD i PTPD oraz jak oceniasz jej ciężkość?",
      scenario: "U 8-letniej Emilki stwierdzasz glikemię 486 mg/dl, pH 7,12, HCO3- 7,8 mmol/l oraz beta-hydroksymaślan 5,8 mmol/l. Jakie są trzy bezwzględne kryteria rozpoznania cukrzycowej kwasicy ketonowej (DKA) wg wytycznych ISPAD i PTPD oraz jak oceniasz jej ciężkość?",
      options: [
        {
          text: "Triada DKA: 1. Hiperglikemia (>200 mg/dl / 11 mmol/l), 2. Kwasica metaboliczna (pH <7,30 lub HCO3- <18 mmol/l), 3. Ketonemia (beta-hydroksymaślan >3,0 mmol/l) lub ketonuria. Przy pH 7,12 i HCO3- 7,8 mmol/l jest to kwasica ketonowa o stopniu UMIARKOWANYM (poniżej 7,10 byłaby ciężka)",
          correct: true,
          isCorrect: true,
          feedback: "✅ PRAWIDŁOWO! <strong>Kluczowe kryteria ISPAD/PTPD i stałe pytanie LEK!</strong> Rozpoznanie DKA wymaga współistnienia: hiperglikemii (>200 mg/dl), kwasicy metabolicznej (pH <7,30 lub HCO3- <18 mmol/l) oraz ketonemii (beta-hydroksymaślan we krwi >3,0 mmol/l lub ketonuria w moczu). Stopnie ciężkości DKA wg pH: 1. Łagodna (pH 7,20-7,29, HCO3- 10-17), 2. Umiarkowana (pH 7,10-7,19, HCO3- 5-9), 3. Ciężka (pH <7,10, HCO3- <5 mmol/l). U Emilki mamy postać umiarkowaną graniczącą z ciężką, wymagającą intensywnego nadzoru."
        },
        {
          text: "Wystarczy sama hiperglikemia powyżej 150 mg/dl bez obecności kwasicy i ciał ketonowych",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Sama hiperglikemia to nie DKA!</strong> W DKA konieczna jest kwasica ketonowa ze zwiększoną luką anionową."
        },
        {
          text: "DKA rozpoznaje się wyłącznie wtedy, gdy glikemia przekracza 1000 mg/dl",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Istnieje nawet euglikemiczna DKA (euDKA)</strong> przy glikemii prawidłowej lub nieznacznie podwyższonej (np. w ciąży, głodzeniu lub przy stosowaniu flozyn)!"
        },
        {
          text: "Kryterium DKA to zasadowica oddechowa z ujemnymi ketonami",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>W DKA występuje kwasica metaboliczna z ketonemią.</strong>"
        }
      ]
    },
    {
      stepNum: 2,
      title: "Krok 2: Pierwszy krok terapeutyczny – rehydratacja w pierwszej godzinie",
      desc: "Zabezpieczasz dwa obwodowe wkłucia dożylne. Jaki płyn, w jakiej objętości i przez jaki czas podasz Emilce w pierwszej godzinie terapii wg aktualnych wytycznych ISPAD?",
      scenario: "Zabezpieczasz dwa obwodowe wkłucia dożylne. Jaki płyn, w jakiej objętości i przez jaki czas podasz Emilce w pierwszej godzinie terapii wg aktualnych wytycznych ISPAD?",
      options: [
        {
          text: "0,9% roztwór chlorku sodu (NaCl) lub zrównoważony krystaloid w objętości 10-20 ml/kg m.c. (dla Emilki 250-500 ml) podany we wlewie dożylnym w ciągu pełnych 60 minut; BEZ insuliny w pierwszej godzinie!",
          correct: true,
          isCorrect: true,
          feedback: "✅ PRAWIDŁOWO! <strong>Złota zasada pierwszej godziny w DKA u dzieci!</strong> Celem pierwszej godziny jest wyłącznie bezpieczna wstępna ekspansja łożyska naczyniowego i przywrócenie perfuzji nerkowej. Podaje się 0,9% NaCl w dawce 10-20 ml/kg (u Emilki 10 ml/kg = 250 ml lub 20 ml/kg = 500 ml) powoli w ciągu 60 minut. Kategorycznie NIE podaje się insuliny w pierwszej godzinie nawadniania!"
        },
        {
          text: "Czysta woda do wstrzykiwań w bolusie 50 ml/kg w 5 minut",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD KRYTYCZNY! <strong>Woda bez elektrolitów wywoła masywną hemolizę i zgon!</strong>"
        },
        {
          text: "10% Glukoza w bolusie z 40 jednostkami insuliny podskórnie",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD KRYTYCZNY! <strong>Podanie glukozy w hiperglikemii 486 mg/dl to błąd w sztuce!</strong>"
        },
        {
          text: "Płyn Ringera z mleczanami w bolusie 100 ml/kg w pompie ciśnieniowej",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD KRYTYCZNY! <strong>Zbyt szybka i agresywna płynoterapia u dziecka z DKA bezpośrednio wywołuje śmiertelny obrzęk mózgu!</strong>"
        }
      ]
    },
    {
      stepNum: 3,
      title: "Krok 3: Zasady wdrożenia insulinoterapii – ZAKAZ bolusów!",
      desc: "Po zakończeniu pierwszej godziny nawadniania wdrożysz insulinoterapię dożylną. Jaki rodzaj insuliny, w jakiej dawce i w jaki sposób należy podać dziecku z DKA wg wytycznych ISPAD?",
      scenario: "Po zakończeniu pierwszej godziny nawadniania wdrożysz insulinoterapię dożylną. Jaki rodzaj insuliny, w jakiej dawce i w jaki sposób należy podać dziecku z DKA wg wytycznych ISPAD?",
      options: [
        {
          text: "Ciągły wlew dożylny insuliny krótko działającej (ludzkiej krystalicznej) w dawce 0,05-0,1 j./kg m.c./godzinę (dla Emilki 1,25-2,5 j./h) w pompie infuzyjnej; KATEGORYCZNIE ZAKAZANE jest podawanie wstępnego bolusa insuliny u dzieci ze względu na ryzyko obrzęku mózgu!",
          correct: true,
          isCorrect: true,
          feedback: "✅ PRAWIDŁOWO! <strong>Fundamentalna zasada bezpieczeństwa pediatrycznego w DKA!</strong> W DKA u dzieci insulinę podaje się WYŁĄCZNIE w ciągłym wlewie dożylnym w dawce 0,05–0,1 j./kg/h (rozpoczynanym po 1-2 godzinach nawadniania płynowego). Podanie wstępnego bolusa dożylnego (tzw. bolus insulinowy) jest u dzieci BEZWZGLĘDNIE ZAKAZANE! Bolus wywołuje gwałtowny spadek osmolalności osocza, co skutkuje masywnym napływem wody do wnętrza komórek nerwowych mózgowia i śmiertelnym obrzękiem mózgu!"
        },
        {
          text: "Podanie wstępnego bolusa dożylnego insuliny w dawce 0,5 j./kg m.c. w szybkim strzale",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD KRYTYCZNY! <strong>Podanie bolusa insuliny u dziecka z DKA to kardynalny błąd medyczny grożący zgonem w obrzęku mózgu!</strong>"
        },
        {
          text: "Insulina o przedłużonym działaniu (Glargina) domięśniowo co 30 minut",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>W ostrej fazie DKA stosuje się wyłącznie insulinę krótko działającą w ciągłym wlewie i.v.</strong>"
        },
        {
          text: "Doustne tabletki metforminy rozkruszone w mleku",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD KRYTYCZNY! <strong>Metformina w kwasicy wywoła śmiertelną kwasicę mleczanową!</strong> W cukrzycy typu 1 jedynym lekiem jest insulina."
        }
      ]
    },
    {
      stepNum: 4,
      title: "Krok 4: Gospodarka potasowa w DKA – pułapka pozornej normokaliemii",
      desc: "Wyjściowy poziom potasu u Emilki wynosi 4,8 mmol/l (w granicach normy). Dlaczego w DKA występuje masywny ogólnoustrojowy niedobór potasu mimo prawidłowego stężenia w surowicy i kiedy należy rozpocząć suplementację KCl?",
      scenario: "Wyjściowy poziom potasu u Emilki wynosi 4,8 mmol/l (w granicach normy). Dlaczego w DKA występuje masywny ogólnoustrojowy niedobór potasu mimo prawidłowego stężenia w surowicy i kiedy należy rozpocząć suplementację KCl?",
      options: [
        {
          text: "Kwasica (wymiana H+ na K+) i brak insuliny wypychają potas z komórek do krwi, a diureza osmotyczna powoduje masywną utratę potasu z moczem – całkowity potas w organizmie jest drastycznie obniżony! Wdrożenie insuliny i nawadniania przemieszcza potas z powrotem do komórek; KCl należy dodać do płynów (20-40 mmol/l) ZARAZ po rozpoczęciu insulinoterapii i potwierdzeniu diurezy",
          correct: true,
          isCorrect: true,
          feedback: "✅ PRAWIDŁOWO! <strong>Żelazna patofizjologia kwasicy i hipokaliemii na LEK!</strong> W DKA dochodzi do potężnego ogólnoustrojowego niedoboru potasu (3-5 mmol/kg m.c.) utraconego z moczem. Jednak w surowicy potas wydaje się prawidłowy lub podwyższony, bo jony H+ wnikają do komórek w zamian za jony K+, a brak insuliny blokuje pompę Na+/K+-ATPazę. W momencie rozpoczęcia insulinoterapii i ustępowania kwasicy potas gwałtownie ucieka z krwi do komórek. Brak suplementacji potasu w płynach infuzyjnych (stężenie 20-40 mmol/l płynu) doprowadziłby w ciągu kilku godzin do ciężkiej, śmiertelnej hipokaliemii (<2,5 mmol/l) i zatrzymania krążenia w migotaniu komór!"
        },
        {
          text: "Potas jest w normie, więc podawanie jakiegokolwiek potasu przez najbliższe 5 dni jest zakazane",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD KRYTYCZNY! <strong>Doprowadzi do jatrogennej śmierci w mechanizmie ciężkiej hipokaliemii!</strong>"
        },
        {
          text: "Potas należy podawać wyłącznie w postaci czystego nierozcieńczonego chlorku potasu w szybkim bolusie i.v.",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD KRYTYCZNY! <strong>Nierozcieńczony KCl podany w bolusie wywołuje natychmiastowe zatrzymanie krążenia w asystolii!</strong>"
        },
        {
          text: "W DKA potas jest zawsze trwale związany z cząsteczkami acetonu",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Brak takiego zjawiska.</strong>"
        }
      ]
    },
    {
      stepNum: 5,
      title: "Krok 5: Rola wodorowęglanów (NaHCO3) – KONTROWERSJA I ZALECENIA",
      desc: "Lekarz rezydent proponuje podanie Emilce wlewu z wodorowęglanu sodu (8,4% NaHCO3) w celu szybkiego 'odkwaszenia krwi' z pH 7,12. Jakie jest oficjalne stanowisko ISPAD, ADA i PTPD wobec stosowania wodorowęglanów w DKA?",
      scenario: "Lekarz rezydent proponuje wlewu z wodorowęglanu sodu (8,4% NaHCO3) w celu szybkiego 'odkwaszenia krwi' z pH 7,12. Jakie jest oficjalne stanowisko ISPAD, ADA i PTPD wobec stosowania wodorowęglanów w DKA?",
      options: [
        {
          text: "Podawanie wodorowęglanów (NaHCO3) jest w rutynowym leczeniu DKA BEZWZGLĘDNIE PRZECIWWSKAZANE! Zwiększa ryzyko obrzęku mózgu, wywołuje paradoksalną kwasicę wewnątrzkomórkową OUN (CO2 łatwo dyfunduje przez barierę krew-mózg, a HCO3- nie), nasila hipokaliemię i opóźnia ustępowanie ketonemii. Może być rozważane jedynie w skrajnych stanach zagrożenia życia przy pH <6,9 z wstrząsem opornym na katecholaminy",
          correct: true,
          isCorrect: true,
          feedback: "✅ PRAWIDŁOWO! <strong>Kluczowy dogmat intensywnej terapii DKA!</strong> Podanie wodorowęglanów nie poprawia rokowania, natomiast generuje ciężkie powikłania: 1. Paradoksalną kwasicę mózgową (reakcja HCO3- + H+ tworzy CO2, który natychmiast przenika do płynu mózgowo-rdzeniowego, zakwaszając neurony), 2. Zwiększa częstość występowania obrzęku mózgu, 3. Pogłębia hipokaliemię, 4. Upośledza uwalnianie tlenu w tkankach (efekt Bohra). Kwasica ustępuje samoistnie pod wpływem insuliny i nawadniania, które blokują ketogenezę!"
        },
        {
          text: "Wodorowęglany należy podać każdemu dziecku, u którego pH jest niższe niż 7,30",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD KRYTYCZNY! <strong>Przestarzała i szkodliwa praktyka zwiększająca śmiertelność dzieci z DKA!</strong>"
        },
        {
          text: "Wodorowęglany są jedynym lekiem leczącym cukrzycę typu 1",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Jedynym leczeniem jest insulina.</strong>"
        },
        {
          text: "Należy podać 1000 ml czystego kwasu solnego w celu neutralizacji zasad",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD KRYTYCZNY! <strong>Absurdalna i śmiertelna propozycja.</strong>"
        }
      ]
    },
    {
      stepNum: 6,
      title: "Krok 6: Moment dołączenia glukozy do płynów infuzyjnych",
      desc: "Po 4 godzinach terapii glikemia Emilki spada z 486 mg/dl do 240 mg/dl (13,3 mmol/l), jednak w gazometrii pH wynosi nadal 7,24, a beta-hydroksymaślan wynosi 3,6 mmol/l (kwasica ketonowa nie ustąpiła). Jaki manewr terapeutyczny musisz teraz wykonać?",
      scenario: "Po 4 godzinach terapii glikemia Emilki spada z 486 mg/dl do 240 mg/dl (13,3 mmol/l), jednak w gazometrii pH wynosi nadal 7,24, a beta-hydroksymaślan wynosi 3,6 mmol/l (kwasica ketonowa nie ustąpiła). Jaki manewr terapeutyczny musisz teraz wykonać?",
      options: [
        {
          text: "Do płynu infuzyjnego należy DOŁĄCZYĆ glukozę (zmienić płyn na 5% lub 10% glukozę w 0,45-0,9% NaCl) i KONTYNUOWAĆ ciągły wlew insuliny, aby bezpiecznie zlikwidować ketonemię i kwasicę bez wywołania hipoglikemii i gwałtownego spadku osmolalności",
          correct: true,
          isCorrect: true,
          feedback: "✅ PRAWIDŁOWO! <strong>Żelazna reguła prowadzenia kwasicy ketonowej!</strong> Insulina w DKA służy nie tylko do obniżenia cukru, ale przede wszystkim do ZAHAMOWANIA LIPOLIZY I KETOGENEZY. Jeśli glikemia spadnie poniżej 250-300 mg/dl (14-17 mmol/l), a kwasica ketonowa nadal trwa (pH <7,30, HCO3- <15), KATEGORYCZNIE NIE WOLNO ZATRZYMYWAĆ INSULINY! Należy dołączyć 5-10% glukozę do płynów infuzyjnych (tzw. płyn 2:1 lub 1:1) i utrzymać wlew insuliny aż do pełnego zamknięcia luki anionowej i ustąpienia kwasicy!"
        },
        {
          text: "Natychmiast całkowicie wyłączyć pompę z insuliną i podać obfity obiad z ziemniakami",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD KRYTYCZNY! <strong>Wyłączenie insuliny spowoduje nawrót ketogenezy i załamanie stanu dziecka!</strong>"
        },
        {
          text: "Zwiększyć dawkę insuliny 5-krotnie, aby glikemia spadła poniżej 20 mg/dl",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD KRYTYCZNY! <strong>Wywoła śmiertelną hipoglikemię i drgawki!</strong>"
        },
        {
          text: "Podać glukagon domięśniowo",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Glukagon nasila ketogenezę i jest przeciwwskazany w DKA.</strong>"
        }
      ]
    },
    {
      stepNum: 7,
      title: "Krok 7: Najgroźniejsze powikłanie DKA – obrzęk mózgu (cerebral edema)",
      desc: "W 6. godzinie leczenia Emilka zaczyna skarżyć się na silny ból głowy, staje się senna, wymiotuje, a na kardiomonitorze częstość tętna spada ze 110/min do 54/min (bradykardia) przy wzroście ciśnienia tętniczego do 125/80 mmHg (odruch Cushinga). Jakie powikłanie natychmiast podejrzewasz i jak reagujesz w ciągu 60 sekund?",
      scenario: "W 6. godzinie leczenia Emilka zaczyna skarżyć się na silny ból głowy, staje się senna, wymiotuje, a na kardiomonitorze częstość tętna spada ze 110/min do 54/min (bradykardia) przy wzroście ciśnienia tętniczego do 125/80 mmHg (odruch Cushinga). Jakie powikłanie natychmiast podejrzewasz i jak reagujesz w ciągu 60 sekund?",
      options: [
        {
          text: "Obrzęk mózgu (najgroźniejsze powikłanie DKA, główna przyczyna zgonów dzieci z cukrzycą!); NATYCHMIAST: 1. Uniesienie wezgłowia łóżka o 30 stopni, 2. Natychmiastowy wlew 20% Mannitolu (0,5-1,0 g/kg m.c. w 20 minut) LUB 3% NaCl (3-5 ml/kg m.c.), 3. Zmniejszenie tempa wlewu płynów o 1/3; leczenie wdrożyć natychmiast PRZED wykonaniem tomografii komputerowej!",
          correct: true,
          isCorrect: true,
          feedback: "✅ PRAWIDŁOWO! <strong>Życiowo najważniejszy stan nagły w diabetologii dziecięcej!</strong> Obrzęk mózgu występuje u 0,5-1% dzieci leczonych z powodu DKA (najczęściej w 4.-12. godzinie terapii) i odpowiada za >60-80% wszystkich zgonów w DKA. Objawy alarmowe: ból głowy, spadek tętna (bradykardia), wzrost ciśnienia (triada Cushinga), wymioty, senność, anizokoria. Leczenie hiperosmotyczne (Mannitol 20% w dawce 0,5-1 g/kg lub 3% NaCl 3-5 ml/kg) musi być podane NATYCHMIAST przy łóżku pacjenta – oczekiwanie na tomografię komputerową prowadzi do wklinowania pnia mózgu i nieodwracalnego zgonu!"
        },
        {
          text: "Spokojnie skierować dziecko na tomografię komputerową głowy za 4 godziny bez podawania jakichkolwiek leków",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD KRYTYCZNY! <strong>Zwlekanie z leczeniem obrzęku mózgu kończy się śmiercią mózgu i wklinowaniem migdałków móżdżku w otwór wielki!</strong>"
        },
        {
          text: "Podać czysty wlew z heparyny drobnocząsteczkowej",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Heparyna nie leczy obrzęku mózgu.</strong>"
        },
        {
          text: "Wstrzyknąć 100 mg furosemidu doopłucnowo",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD KRYTYCZNY! <strong>Grozi odmą opłucnową i zapaścią krążeniową!</strong>"
        }
      ]
    },
    {
      stepNum: 8,
      title: "Krok 8: Stabilizacja i przejście na model funkcjonalnej insulinoterapii",
      desc: "Po 24 godzinach intensywnej terapii kwasica ketonowa u Emilki w pełni ustąpiła: pH 7,39, HCO3- 23 mmol/l, beta-hydroksymaślan 0,3 mmol/l, dziewczynka jest w pełni przytomna, głodna i chętnie pije. Jak przeprowadza się bezpieczne przejście z wlewu dożylnego na podskórną insulinoterapię?",
      scenario: "Po 24 godzinach intensywnej terapii kwasica ketonowa u Emilki w pełni ustąpiła: pH 7,39, HCO3- 23 mmol/l, beta-hydroksymaślan 0,3 mmol/l, dziewczynka jest w pełni przytomna, głodna i chętnie pije. Jak przeprowadza się bezpieczne przejście z wlewu dożylnego na podskórną insulinoterapię?",
      options: [
        {
          text: "Pierwszą dawkę analogu insuliny szybkodziałającej (lub krótko działającej) podskórnie podaje się na 15-30 minut przed pierwszym posiłkiem, a wlew dożylny insuliny wyłącza się DOPIERO po tym posiłku (aby uniknąć przerwy w insulinizacji i nawrotu hiperglikemii/ketozy)",
          correct: true,
          isCorrect: true,
          feedback: "✅ PRAWIDŁOWO! <strong>Prawidłowa technika przejścia z i.v. na s.c.!</strong> Okres półtrwania insuliny dożylnej we krwi wynosi zaledwie 4-5 minut. Zatrzymanie wlewu dożylnego PRZED podaniem dawki podskórnej powoduje natychmiastowe zniknięcie insuliny z krążenia i gwałtowny skok glikemii z nawrotem ketogenezy. Prawidłowy schemat: podanie insuliny podskórnej przed posiłkiem -> spożycie posiłku -> zatrzymanie wlewu i.v. po 30-60 minutach od iniekcji podskórnej."
        },
        {
          text: "Wyłącza się wlew dożylny o 6:00 rano, a pierwszą dawkę podskórną podaje się o 22:00 w nocy",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD KRYTYCZNY! <strong>Spowoduje nawrót ciężkiej kwasicy ketonowej w ciągu kilku godzin!</strong>"
        },
        {
          text: "Wypisuje się dziecko do domu bez jakiejkolwiek insuliny z zaleceniem picia ziół",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD KRYTYCZNY! <strong>Cukrzyca typu 1 to bezwzględny, dożywotni brak insuliny endogennej!</strong>"
        },
        {
          text: "Podaje się insulinę wyłącznie w dni parzyste",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Insulinoterapia w T1D jest ciągła i codzienna.</strong>"
        }
      ]
    }
  ],
  pathoNodes: [
    {
      badge: "OGNIWO 1 • Autoimmunologiczna destrukcja komórek beta trzustki",
      title: "Infiltracja wysp (insulitis), autoprzeciwciała (anty-GAD, IA-2, ZnT8) i bezwzględny brak insuliny",
      short: "Autoreaktywne limfocyty T niszczą komórki beta wysp Langerhansa, prowadząc do zaniku insuliny.",
      detail: "Cukrzyca typu 1 rozwija się u osób z predyspozycją genetyczną (antygeny HLA-DR3-DQ2 i DR4-DQ8) pod wpływem czynników środowiskowych (infekcje enterowirusowe, mikrobiota). Dochodzi do załamania autotolerancji immunologicznej i przewlekłego zapalenia wysp trzustkowych (insulitis) z udziałem cytotoksycznych limfocytów CD8+. W surowicy pojawiają się autoprzeciwciała: przeciw dekarboksylazie kwasu glutaminowego (anty-GAD65), przeciw fosfatazom tyrozynowym (IA-2), przeciw transporterowi cynku 8 (ZnT8) oraz przeciwciała przeciwinsulinowe (IAA). Gdy zniszczeniu ulegnie >80-90% komórek beta, dochodzi do bezwzględnego braku insuliny.",
      target: "Dożywotnia substytucja insulinowa: <span class='dose-pill'>funkcjonalna intensywna insulinoterapia (MDI)</span> lub <span class='dose-pill'>osobista pompa insulinowa (CSII)</span>.",
      desc: "Infiltracja wysp (insulitis), autoprzeciwciała (anty-GAD, IA-2, ZnT8) i bezwzględny brak insuliny.",
      drugTarget: "Dożywotnia substytucja insulinowa: <span class='dose-pill'>funkcjonalna intensywna insulinoterapia (MDI)</span> lub <span class='dose-pill'>osobista pompa insulinowa (CSII)</span>."
    },
    {
      badge: "OGNIWO 2 • Hiperglikemia, diureza osmotyczna i wstrząs hipowolemiczny",
      title: "Zahamowanie wychwytu glukozy przez GLUT4, glikogenoliza, poliuria i ubytek elektrolitów",
      short: "Brak insuliny uniemożliwia wnikanie glukozy do tkanek, wywołując ucieczkę wody przez nerki.",
      detail: "Brak insuliny uniemożliwia translokację transporterów GLUT4 do błony komórkowej mięśni i tkanki tłuszczowej, hamując obwodowy wychwyt glukozy. W wątrobie brak hamowania glukagonu wyzwala niepohamowaną glikogenolizę i glukoneogenezę. Glikemia gwałtownie rośnie (>300-500 mg/dl), przekraczając próg nerkowy (180 mg/dl). Niefiltrowana glukoza w moczu działa jako potężny diuretyk osmotyczny, pociągając za sobą ogromne objętości wody i elektrolitów (sodu, potasu, magnezu, fosforanów). Prowadzi to do poliurii, polidypsji, odwodnienia hipowolemicznego i spadku filtracji kłębuszkowej.",
      target: "Resuscytacja płynowa: <span class='dose-pill'>0,9% NaCl 10-20 ml/kg m.c. i.v.</span> w 1. godzinie; powolne uzupełnianie deficytu płynów przez <span class='dose-pill'>48 godzin</span>.",
      desc: "Zahamowanie wychwytu glukozy przez GLUT4, glikogenoliza, poliuria i ubytek elektrolitów.",
      drugTarget: "Resuscytacja płynowa: <span class='dose-pill'>0,9% NaCl 10-20 ml/kg m.c. i.v.</span> w 1. godzinie; powolne uzupełnianie deficytu płynów przez <span class='dose-pill'>48 godzin</span>."
    },
    {
      badge: "OGNIWO 3 • Niekontrolowana lipoliza, ketogeneza i kwasica metaboliczna",
      title: "Aktywacja lipazy hormonowrażliwej (HSL), transport WKT przez CPT-1 i synteza ciał ketonowych",
      short: "Brak insuliny odblokowuje lipolizę – wątroba zalewana jest kwasami tłuszczowymi i produkuje ketony.",
      detail: "Wobec braku insuliny w adipocytach zniesione zostaje hamowanie lipazy hormonowrażliwej (HSL). Dochodzi do gwałtownej lipolizy i uwolnienia do krwioobiegu wolnych kwasów tłuszczowych (WKT). W wątrobie WKT są transportowane przez acylotransferazę karnitynową 1 (CPT-1) do mitochondriów, gdzie ulegają beta-oksydacji do acetylo-CoA. Nadmiar acetylo-CoA przewyższa pojemność cyklu Krebsa i jest kierowany do szlaku ketogenezy: powstaje kwas acetooctowy, beta-hydroksymaślany oraz lotny aceton. Uwolnione jony wodorowe zużywają bufor wodorowęglanowy (spadek HCO3- <10-15 mmol/l), generując ciężką kwasicę metaboliczną ze zwiększoną luką anionową (HAGMA).",
      target: "Blokada ketogenezy: ciągły wlew dożylny <span class='dose-pill'>Insuliny krótko działającej 0,05-0,1 j./kg m.c./godzinę</span>; dodanie <span class='dose-pill'>5% Glukozy</span> przy spadku glikemii <250 mg/dl.",
      desc: "Aktywacja lipazy hormonowrażliwej (HSL), transport WKT przez CPT-1 i synteza ciał ketonowych.",
      drugTarget: "Blokada ketogenezy: ciągły wlew dożylny <span class='dose-pill'>Insuliny krótko działającej 0,05-0,1 j./kg m.c./godzinę</span>; dodanie <span class='dose-pill'>5% Glukozy</span> przy spadku glikemii <250 mg/dl."
    },
    {
      badge: "OGNIWO 4 • Zespół oddechowy Kussmaula i obrzęk mózgu",
      title: "Stymulacja chemoreceptorów, hiperwentylacja oraz osmolarne ryzyko w komórkach glejowych",
      short: "Kwasica wyzwala oddech Kussmaula; nagłe zmiany osmolalności podczas terapii grożą obrzękiem mózgu.",
      detail: "Jony H+ bezpośrednio drażnią obwodowe chemoreceptory kłębków szyjnych oraz ośrodek oddechowy w pniu mózgu. Uruchamia się maksymalna kompensacja oddechowa kwasicy metabolicznej: oddech Kussmaula (głębokie, głośne wdechy i wydechy z westchnieniami) mający na celu 'wydmuchanie' CO2 i obniżenie pCO2 (<20-25 mmHg). Równocześnie w neuronach i komórkach glejowych w warunkach hiperosmolalności syntetyzowane są wewnątrzkomórkowe osmolity (tauryna, inozytol). Zbyt szybki spadek stężenia glukozy i sodu we krwi podczas leczenia odwraca gradient osmotyczny, wywołując gwałtowny napływ wody do neuronów i obrzęk mózgu.",
      target: "Leczenie obrzęku mózgu: <span class='dose-pill'>Mannitol 20% 0,5-1,0 g/kg m.c. i.v.</span> w 20 min lub <span class='dose-pill'>3% NaCl 3-5 ml/kg m.c. i.v.</span>; uniesienie głowy o 30 stopni.",
      desc: "Stymulacja chemoreceptorów, hiperwentylacja oraz osmolarne ryzyko w komórkach glejowych.",
      drugTarget: "Leczenie obrzęku mózgu: <span class='dose-pill'>Mannitol 20% 0,5-1,0 g/kg m.c. i.v.</span> w 20 min lub <span class='dose-pill'>3% NaCl 3-5 ml/kg m.c. i.v.</span>; uniesienie głowy o 30 stopni."
    }
  ],
  diffTable: {
    title: "⚔️ Tabela Różnicowa: Cukrzycowa kwasica ketonowa (DKA) vs Stan hiperglikemiczno-hiperosmolalny (HHS) vs Zapalenie wyrostka robaczkowego vs Zatrucie salicylanami",
    headers: ["Cecha kliniczna", "Kwasica ketonowa (DKA)", "Stan hiperosmolalny (HHS)", "Zapalenie wyrostka (Appendicitis)", "Zatrucie salicylanami (Aspiryną)"],
    rows: [
      ["Glikemia", "Wysoka (zwykle 250 - 600 mg/dl)", "EKSTREMALNA (>600 - 1000 mg/dl)", "Prawidłowa", "Prawidłowa lub łagodna hipoglikemia"],
      ["Ciała ketonowe / Ketonemia", "BARDZO WYSOKIE (beta-OHB >3,0 mmol/l, mocz ++++)", "Nieobecne lub śladowe (beta-OHB <3,0)", "Nieobecne", "Nieobecne (chyba że z głodzenia)"],
      ["Równowaga kwasowo-zasadowa", "Ciężka KWASICA metaboliczna (pH <7,30, HCO3- <15)", "Prawidłowe pH (>7,30) lub łagodna kwasica", "Prawidłowa (pH w normie)", "Wczesna zasadowica oddechowa -> kwasica metaboliczna"],
      ["Luka anionowa (Anion Gap)", "ZNACZNIE PODWYŻSZONA (>16-25 mEq/l)", "Prawidłowa lub lekko podwyższona", "Prawidłowa", "Podwyższona (kwas salicylowy + kwasica mleczanowa)"],
      ["Ból brzucha / Pseudo-ostry brzuch", "Bardzo częsty (pseudoappendicitis ustępujący po insulinie)", "Rzadki", "Ból w prawym dole biodrowym (McBurney, Blumberg)", "Ból w nadbrzuszu, wymioty krwiste"],
      ["Oddech", "Oddech Kussmaula (głęboki, głośny, zapach acetonu)", "Oddech płytki, przyspieszony (brak zapachu acetonu)", "Prawidłowy szmer oddechowy", "Hiperwentylacja (stymulacja ośrodka oddechowego)"],
      ["Osmolalność efektywna osocza", "Zmienna (<320 mOsm/kg)", "EKSTREMALNIE WYSOKA (>320 mOsm/kg)", "Prawidłowa", "Prawidłowa"],
      ["Leczenie I rzutu", "Nawadnianie 0,9% NaCl + ciągły wlew insuliny i.v. + KCl", "Masywna rehydratacja 0,9% i 0,45% NaCl + małe dawki insuliny", "Pilna apendektomia laparoskopowa", "Płukanie żołądka, węgiel aktywowany, alkalizacja moczu"]
    ]
  },
  dutySummary: {
    overview: "Cukrzycowa kwasica ketonowa (DKA) jest ostrym, bezpośrednio zagrażającym życiu powikłaniem bezwzględnego niedoboru insuliny, stanowiącym manifestację nowo rozpoznanej cukrzycy typu 1 u 25-40% dzieci w Polsce. Charakteryzuje się triadą: hiperglikemią, kwasicą metaboliczną z podwyższoną luką anionową oraz ketonemią/ketonurią. Objawia się oddechem Kussmaula, zapachem acetonu, bólem brzucha i ciężkim odwodnieniem. Podstawą terapii jest powolne nawadnianie, ciągły wlew insuliny i.v. (bez bolusa!) oraz wczesna suplementacja potasu pod ścisłym nadzorem pod kątem obrzęku mózgu.",
    diagnostics: "1. Natychmiastowe oznaczenie glikemii i ketonemii (beta-hydroksymaślan z krwi z palca) oraz gazometrii (krew włośniczkowa/żylna).<br>2. Obliczenie luki anionowej: AG = Na+ - (Cl- + HCO3-) [norma <12-16 mEq/l; w DKA >20-25 mEq/l].<br>3. Oznaczenie stężenia elektrolitów (Na+, K+, Cl-) i wyliczenie sodu skorygowanego o glikemię: Na_kor = Na_ozn + 1,6 * [(Glukoza - 100) / 100].<br>4. Badanie ogólne moczu (ocena glukozurii i ketonurii).<br>5. Oznaczenie autoprzeciwciał cukrzycowych (anty-GAD65, IA-2, ZnT8) i peptydu C po wyprowadzeniu z kwasicy w celu potwierdzenia etiologii autoimmunologicznej.",
    drugsAndDoses: "1. Pierwsza godzina nawadniania: <span class='dose-pill'>0,9% NaCl 10-20 ml/kg m.c. i.v. w ciągu 60 minut</span> (dla Emilki 250-500 ml).<br>2. Insulinoterapia ciągła (od 2. godziny): <span class='dose-pill'>Insulina krótko działająca 0,05-0,1 j./kg m.c./godzinę i.v.</span> w pompie strzykawkowej; KATEGORYCZNY ZAKAZ BOLUSA INSULINY!<br>3. Suplementacja potasu: <span class='dose-pill'>KCl 20-40 mmol/l płynu infuzyjnego</span> włączana zaraz po rozpoczęciu wlewu insuliny i potwierdzeniu diurezy.<br>4. Dołączenie glukozy do płynów przy spadku glikemii <250-300 mg/dl: <span class='dose-pill'>5% lub 10% Glukoza w 0,45% NaCl z KCl</span> przy utrzymaniu wlewu insuliny.<br>5. Leczenie obrzęku mózgu w razie objawów alarmowych: <span class='dose-pill'>Mannitol 20% 0,5-1,0 g/kg m.c. i.v. w 20 minut</span> LUB <span class='dose-pill'>3% NaCl 3-5 ml/kg m.c. i.v.</span>.",
    procedures: "1. Założenie dwóch obwodowych wkłuć naczyniowych (jedno na płynoterapię i potas, drugie na wlew insuliny w pompie).<br>2. Ciągłe kardiomonitorowanie (rytm serca, ocena załamków T pod kątem hipo- i hiperkaliemii).<br>3. Ułożenie z uniesionym wezgłowiem (pozycja półsiedząca 30 stopni) w celu profilaktyki aspiracji w wymiotach i ochrony przed obrzękiem mózgu.<br>4. Założenie cewnika do pęcherza w przypadku zaburzeń świadomości i braku spontanicznej mikcji.<br>5. Prowadzenie karty bilansu płynów i ścisłej rozpiski godzinowej glikemii i gazometrii.",
    monitoring: "1. Pomiar glikemii przyłóżkowej co 1 godzinę (bezpieczny spadek glikemii: 50-75 mg/dl/godzinę, nie szybciej niż 90 mg/dl/h!).<br>2. Kontrola gazometrii, elektrolitów (Na+, K+) i beta-hydroksymaślanu co 2-4 godziny.<br>3. Ciągła ocena neurologiczna w skali Glasgow (GCS) pod kątem bólu głowy, bradykardii, wymiotów i anizokorii (wczesne objawy obrzęku mózgu!).<br>4. Monitorowanie zniknięcia kwasicy (zamknięcie luki anionowej AG <12 mEq/l, HCO3- >15-18 mmol/l, pH >7,30)."
  },
  lekQuestions: [
    {
      id: 1,
      q: "Który z poniższych zestawów parametrów biochemicznych stanowi triadę diagnostyczną cukrzycowej kwasicy ketonowej (DKA) wg wytycznych ISPAD i PTPD?",
      opts: [
        "A. Hiperglikemia (>200 mg/dl), kwasica metaboliczna (pH <7,30 lub HCO3- <18 mmol/l) oraz ketonemia (beta-hydroksymaślan we krwi >3,0 mmol/l lub ketonuria)",
        "B. Hiperglikemia (>600 mg/dl), pH krwi >7,35 oraz osmolalność efektywna >320 mOsm/kg",
        "C. Hipoglikemia (<50 mg/dl), zasadowica metaboliczna oraz brak ciał ketonowych",
        "D. Prawidłowa glikemia, pH <7,00 oraz izolowana hiperurykemia",
        "E. Hiperglikemia z hiperkaliemią bez kwasicy metabolicznej"
      ],
      options: [
        "A. Hiperglikemia (>200 mg/dl), kwasica metaboliczna (pH <7,30 lub HCO3- <18 mmol/l) oraz ketonemia (beta-hydroksymaślan we krwi >3,0 mmol/l lub ketonuria)",
        "B. Hiperglikemia (>600 mg/dl), pH krwi >7,35 oraz osmolalność efektywna >320 mOsm/kg",
        "C. Hipoglikemia (<50 mg/dl), zasadowica metaboliczna oraz brak ciał ketonowych",
        "D. Prawidłowa glikemia, pH <7,00 oraz izolowana hiperurykemia",
        "E. Hiperglikemia z hiperkaliemią bez kwasicy metabolicznej"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Prawidłowa odpowiedź: A. Kryteria DKA u dzieci wg ISPAD: 1. Hiperglikemia (>11 mmol/l / 200 mg/dl), 2. Kwasica żylna/włośniczkowa (pH <7,30 lub wodorowęglany <18 mmol/l), 3. Ketonemia (stężenie beta-hydroksymaślanu we krwi >=3,0 mmol/l) lub umiarkowana/duża ketonuria.",
      expl: "Prawidłowa odpowiedź: A. Hiperglikemia (>200 mg/dl), kwasica metaboliczna (pH <7,30 lub HCO3- <18 mmol/l) oraz ketonemia (beta-hydroksymaślan we krwi >3,0 mmol/l lub ketonuria)",
      expl: "Prawidłowa odpowiedź: A. Kryteria DKA u dzieci wg ISPAD: 1. Hiperglikemia (>11 mmol/l / 200 mg/dl), 2. Kwasica żylna/włośniczkowa (pH <7,30 lub wodorowęglany <18 mmol/l), 3. Ketonemia (stężenie beta-hydroksymaślanu we krwi >=3,0 mmol/l) lub umiarkowana/duża ketonuria."
    },
    {
      id: 2,
      q: "Dlaczego w leczeniu DKA u dzieci BEZWZGLĘDNIE ZAKAZANE jest podawanie wstępnego bolusa insuliny dożylnej?",
      opts: [
        "A. Gwałtowny spadek glikemii i osmolalności osocza indukuje masywny napływ wody do neuronów i grozi śmiertelnym obrzękiem mózgu",
        "B. Bolus insuliny natychmiastowo niszczy mięsień sercowy",
        "C. Insulina w bolusie powoduje trwałą ślepotę",
        "D. Wywołuje nieodwracalną martwicę cewek nerkowych",
        "E. U dzieci insulina w bolusie ulega zablokowaniu przez albuminy"
      ],
      options: [
        "A. Gwałtowny spadek glikemii i osmolalności osocza indukuje masywny napływ wody do neuronów i grozi śmiertelnym obrzękiem mózgu",
        "B. Bolus insuliny natychmiastowo niszczy mięsień sercowy",
        "C. Insulina w bolusie powoduje trwałą ślepotę",
        "D. Wywołuje nieodwracalną martwicę cewek nerkowych",
        "E. U dzieci insulina w bolusie ulega zablokowaniu przez albuminy"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Prawidłowa odpowiedź: A. Bolus insuliny powoduje załamanie gradientu osmotycznego między przestrzenią wewnątrznaczyniową a tkanką mózgową, co dramatycznie zwiększa ryzyko obrzęku mózgu (głównej przyczyny zgonu dzieci z DKA). Insulinę podaje się wyłącznie w powolnym ciągłym wlewie (0,05-0,1 j./kg/h).",
      expl: "Prawidłowa odpowiedź: A. Gwałtowny spadek glikemii i osmolalności osocza indukuje masywny napływ wody do neuronów i grozi śmiertelnym obrzękiem mózgu",
      expl: "Prawidłowa odpowiedź: A. Bolus insuliny powoduje załamanie gradientu osmotycznego między przestrzenią wewnątrznaczyniową a tkanką mózgową, co dramatycznie zwiększa ryzyko obrzęku mózgu (głównej przyczyny zgonu dzieci z DKA). Insulinę podaje się wyłącznie w powolnym ciągłym wlewie (0,05-0,1 j./kg/h)."
    },
    {
      id: 3,
      q: "Kiedy wg wytycznych ISPAD/PTPD należy rozpocząć podawanie insuliny dożylnej u dziecka z DKA?",
      opts: [
        "A. Dopiero po 1-2 godzinach od rozpoczęcia nawadniania płynowego (po zakończeniu wlewu 0,9% NaCl w pierwszej godzinie)",
        "B. Przed podaniem jakichkolwiek płynów, natychmiast w karetce",
        "C. Dopiero po 24 godzinach od przyjęcia do szpitala",
        "D. Wyłącznie wtedy, gdy glikemia wzrośnie powyżej 800 mg/dl",
        "E. Po wykonaniu gastroskopii"
      ],
      options: [
        "A. Dopiero po 1-2 godzinach od rozpoczęcia nawadniania płynowego (po zakończeniu wlewu 0,9% NaCl w pierwszej godzinie)",
        "B. Przed podaniem jakichkolwiek płynów, natychmiast w karetce",
        "C. Dopiero po 24 godzinach od przyjęcia do szpitala",
        "D. Wyłącznie wtedy, gdy glikemia wzrośnie powyżej 800 mg/dl",
        "E. Po wykonaniu gastroskopii"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Prawidłowa odpowiedź: A. Pierwsza godzina leczenia to wyłącznie wstępne nawadnianie krystaloidami (10-20 ml/kg 0,9% NaCl). Insulinoterapię dożylną włącza się dopiero po 1-2 godzinach rehydratacji.",
      expl: "Prawidłowa odpowiedź: A. Dopiero po 1-2 godzinach od rozpoczęcia nawadniania płynowego (po zakończeniu wlewu 0,9% NaCl w pierwszej godzinie)",
      expl: "Prawidłowa odpowiedź: A. Pierwsza godzina leczenia to wyłącznie wstępne nawadnianie krystaloidami (10-20 ml/kg 0,9% NaCl). Insulinoterapię dożylną włącza się dopiero po 1-2 godzinach rehydratacji."
    },
    {
      id: 4,
      q: "Co należy zrobić, gdy podczas leczenia DKA stężenie glukozy we krwi obniży się do około 250-300 mg/dl (14-17 mmol/l), a kwasica metaboliczna i ketonemia nadal trwają?",
      opts: [
        "A. Do płynów infuzyjnych należy dołączyć glukozę (płyn 5-10% glukozy z elektrolitami) i kontynuować wlew insuliny aż do ustąpienia kwasicy i ketonemii",
        "B. Całkowicie wyłączyć wlew insuliny",
        "C. Zwiększyć dawkę insuliny trzykrotnie",
        "D. Podać wodorowęglan sodu w bolusie",
        "E. Wypisać pacjenta ze szpitala"
      ],
      options: [
        "A. Do płynów infuzyjnych należy dołączyć glukozę (płyn 5-10% glukozy z elektrolitami) i kontynuować wlew insuliny aż do ustąpienia kwasicy i ketonemii",
        "B. Całkowicie wyłączyć wlew insuliny",
        "C. Zwiększyć dawkę insuliny trzykrotnie",
        "D. Podać wodorowęglan sodu w bolusie",
        "E. Wypisać pacjenta ze szpitala"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Prawidłowa odpowiedź: A. Celem leczenia DKA jest likwidacja kwasicy i ketogenezy, co wymaga ciągłej obecności insuliny. Aby uniknąć hipoglikemii przy stężeniu glukozy <250-300 mg/dl, podłącza się wlew glukozy (5-10%) i kontynuuje insulinoterapię.",
      expl: "Prawidłowa odpowiedź: A. Do płynów infuzyjnych należy dołączyć glukozę (płyn 5-10% glukozy z elektrolitami) i kontynuować wlew insuliny aż do ustąpienia kwasicy i ketonemii",
      expl: "Prawidłowa odpowiedź: A. Celem leczenia DKA jest likwidacja kwasicy i ketogenezy, co wymaga ciągłej obecności insuliny. Aby uniknąć hipoglikemii przy stężeniu glukozy <250-300 mg/dl, podłącza się wlew glukozy (5-10%) i kontynuuje insulinoterapię."
    },
    {
      id: 5,
      q: "Dlaczego rutynowe stosowanie wodorowęglanu sodu (NaHCO3) w DKA u dzieci jest PRZECIWWSKAZANE?",
      opts: [
        "A. Zwiększa ryzyko obrzęku mózgu, wywołuje paradoksalną kwasicę wewnątrzkomórkową OUN i nasila hipokaliemię",
        "B. Powoduje natychmiastowe zniszczenie wątroby",
        "C. Wywołuje skazę krwotoczną hemofilopodobną",
        "D. Neutralizuje cząsteczki potasu",
        "E. Jest wskazane i stanowi lek I rzutu w każdym DKA"
      ],
      options: [
        "A. Zwiększa ryzyko obrzęku mózgu, wywołuje paradoksalną kwasicę wewnątrzkomórkową OUN i nasila hipokaliemię",
        "B. Powoduje natychmiastowe zniszczenie wątroby",
        "C. Wywołuje skazę krwotoczną hemofilopodobną",
        "D. Neutralizuje cząsteczki potasu",
        "E. Jest wskazane i stanowi lek I rzutu w każdym DKA"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Prawidłowa odpowiedź: A. Wytyczne ISPAD jednoznacznie odradzają wodorowęglany w DKA: nie poprawiają one przeżywalności, natomiast sprzyjają obrzękowi mózgu, paradoksalnemu zakwaszeniu płynu mózgowo-rdzeniowego (przenikanie CO2) oraz groźnej hipokaliemii.",
      expl: "Prawidłowa odpowiedź: A. Zwiększa ryzyko obrzęku mózgu, wywołuje paradoksalną kwasicę wewnątrzkomórkową OUN i nasila hipokaliemię",
      expl: "Prawidłowa odpowiedź: A. Wytyczne ISPAD jednoznacznie odradzają wodorowęglany w DKA: nie poprawiają one przeżywalności, natomiast sprzyjają obrzękowi mózgu, paradoksalnemu zakwaszeniu płynu mózgowo-rdzeniowego (przenikanie CO2) oraz groźnej hipokaliemii."
    },
    {
      id: 6,
      q: "Który objaw kliniczny u dziecka leczonego z powodu DKA powinien wzbudzić natychmiastowe podejrzenie rozwijającego się obrzęku mózgu?",
      opts: [
        "A. Ból głowy, wymioty, zwolnienie akcji serca (bradykardia), wzrost ciśnienia tętniczego oraz pogorszenie kontaktu słownego (spadek GCS)",
        "B. Zblednięcie skóry wokół ust z zachowanym doskonałym kontaktem",
        "C. Wzrost łaknienia i prośba o jedzenie",
        "D. Obfite oddawanie moczu o jasnej barwie",
        "E. Spadek temperatury ciała o 0,2°C"
      ],
      options: [
        "A. Ból głowy, wymioty, zwolnienie akcji serca (bradykardia), wzrost ciśnienia tętniczego oraz pogorszenie kontaktu słownego (spadek GCS)",
        "B. Zblednięcie skóry wokół ust z zachowanym doskonałym kontaktem",
        "C. Wzrost łaknienia i prośba o jedzenie",
        "D. Obfite oddawanie moczu o jasnej barwie",
        "E. Spadek temperatury ciała o 0,2°C"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Prawidłowa odpowiedź: A. Objawy alarmowe obrzęku mózgu obejmują: ból głowy, letarg, spadek GCS, wymioty oraz odruch Cushinga (bradykardia i nadciśnienie tętnicze) ze spadkiem saturacji. Wymagają natychmiastowego podania mannitolu lub hipertonicznego NaCl.",
      expl: "Prawidłowa odpowiedź: A. Ból głowy, wymioty, zwolnienie akcji serca (bradykardia), wzrost ciśnienia tętniczego oraz pogorszenie kontaktu słownego (spadek GCS)",
      expl: "Prawidłowa odpowiedź: A. Objawy alarmowe obrzęku mózgu obejmują: ból głowy, letarg, spadek GCS, wymioty oraz odruch Cushinga (bradykardia i nadciśnienie tętnicze) ze spadkiem saturacji. Wymagają natychmiastowego podania mannitolu lub hipertonicznego NaCl."
    },
    {
      id: 7,
      q: "Lekiem pierwszego rzutu w leczeniu obrzęku mózgu w przebiegu DKA u dziecka jest:",
      opts: [
        "A. 20% Mannitol dożylnie (0,5-1,0 g/kg m.c. w 20 minut) LUB 3% NaCl (3-5 ml/kg m.c.)",
        "B. Deksametazon w wysokiej dawce dożylnej",
        "C. Furosemid w bolusie 5 mg/kg",
        "D. Heparyna niefrakcjonowana",
        "E. Czysta woda we wlewie doszpikowym"
      ],
      options: [
        "A. 20% Mannitol dożylnie (0,5-1,0 g/kg m.c. w 20 minut) LUB 3% NaCl (3-5 ml/kg m.c.)",
        "B. Deksametazon w wysokiej dawce dożylnej",
        "C. Furosemid w bolusie 5 mg/kg",
        "D. Heparyna niefrakcjonowana",
        "E. Czysta woda we wlewie doszpikowym"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Prawidłowa odpowiedź: A. W obrzęku mózgu w DKA stosuje się środki hiperosmolarne: 20% Mannitol (0,5-1 g/kg w 20 min) lub 3% NaCl (3-5 ml/kg). Glikokortykosteroidy (deksametazon) są nieskuteczne w obrzęku cytotoksycznym/osmotycznym w DKA i są przeciwwskazane.",
      expl: "Prawidłowa odpowiedź: A. 20% Mannitol dożylnie (0,5-1,0 g/kg m.c. w 20 minut) LUB 3% NaCl (3-5 ml/kg m.c.)",
      expl: "Prawidłowa odpowiedź: A. W obrzęku mózgu w DKA stosuje się środki hiperosmolarne: 20% Mannitol (0,5-1 g/kg w 20 min) lub 3% NaCl (3-5 ml/kg). Glikokortykosteroidy (deksametazon) są nieskuteczne w obrzęku cytotoksycznym/osmotycznym w DKA i są przeciwwskazane."
    },
    {
      id: 8,
      q: "Jaki jest patomechanizm oddechu Kussmaula obserwowanego w kwasicy ketonowej?",
      opts: [
        "A. Kompensacja oddechowa kwasicy metabolicznej – jony H+ stymulują chemoreceptory, wyzwalając głębokie, częste oddechy w celu eliminacji CO2 (hipokapnii)",
        "B. Skurcz oskrzeli wywołany alergiczną reakcją na insulinę",
        "C. Porażenie przepony przez toksyny ketonowe",
        "D. Zwężenie głośni w wyniku obrzęku krtani",
        "E. Odruch z receptorów w pęcherzyku żółciowym"
      ],
      options: [
        "A. Kompensacja oddechowa kwasicy metabolicznej – jony H+ stymulują chemoreceptory, wyzwalając głębokie, częste oddechy w celu eliminacji CO2 (hipokapnii)",
        "B. Skurcz oskrzeli wywołany alergiczną reakcją na insulinę",
        "C. Porażenie przepony przez toksyny ketonowe",
        "D. Zwężenie głośni w wyniku obrzęku krtani",
        "E. Odruch z receptorów w pęcherzyku żółciowym"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Prawidłowa odpowiedź: A. Oddech Kussmaula to głęboki, głośny oddech kwasiczy będący najsilniejszym fizjologicznym mechanizmem kompensacji kwasicy metabolicznej przez usuwanie lotnego kwasu węglowego w postaci dwutlenku węgla (CO2).",
      expl: "Prawidłowa odpowiedź: A. Kompensacja oddechowa kwasicy metabolicznej – jony H+ stymulują chemoreceptory, wyzwalając głębokie, częste oddechy w celu eliminacji CO2 (hipokapnii)",
      expl: "Prawidłowa odpowiedź: A. Oddech Kussmaula to głęboki, głośny oddech kwasiczy będący najsilniejszym fizjologicznym mechanizmem kompensacji kwasicy metabolicznej przez usuwanie lotnego kwasu węglowego w postaci dwutlenku węgla (CO2)."
    },
    {
      id: 9,
      q: "Czym jest tzw. pseudo-ostry brzuch (pseudoappendicitis) w przebiegu kwasicy ketonowej u dzieci?",
      opts: [
        "A. Bolesność palpacyjna i obrona mięśniowa brzucha wywołane kwasicą, odwodnieniem, hipokaliemią i spowolnieniem perystaltyki jelit, ustępujące całkowicie po wyrównaniu DKA bez interwencji chirurgicznej",
        "B. Prawdziwe zapalenie wyrostka wymagające pilnej operacji w 1. godzinie",
        "C. Perforacja żołądka pod wpływem ciał ketonowych",
        "D. Skręt sieci większej",
        "E. Wylew krwawy do mięśni prostych brzucha"
      ],
      options: [
        "A. Bolesność palpacyjna i obrona mięśniowa brzucha wywołane kwasicą, odwodnieniem, hipokaliemią i spowolnieniem perystaltyki jelit, ustępujące całkowicie po wyrównaniu DKA bez interwencji chirurgicznej",
        "B. Prawdziwe zapalenie wyrostka wymagające pilnej operacji w 1. godzinie",
        "C. Perforacja żołądka pod wpływem ciał ketonowych",
        "D. Skręt sieci większej",
        "E. Wylew krwawy do mięśni prostych brzucha"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Prawidłowa odpowiedź: A. Ból brzucha i objawy rzekomo otrzewnowe występują u wielu dzieci z DKA w wyniku hipoperfuzji krezkowej, rozciągnięcia torebki wątroby i kwasicy. Objawy te znikają bez śladu po wdrożeniu insuliny i nawodnienia.",
      expl: "Prawidłowa odpowiedź: A. Bolesność palpacyjna i obrona mięśniowa brzucha wywołane kwasicą, odwodnieniem, hipokaliemią i spowolnieniem perystaltyki jelit, ustępujące całkowicie po wyrównaniu DKA bez interwencji chirurgicznej",
      expl: "Prawidłowa odpowiedź: A. Ból brzucha i objawy rzekomo otrzewnowe występują u wielu dzieci z DKA w wyniku hipoperfuzji krezkowej, rozciągnięcia torebki wątroby i kwasicy. Objawy te znikają bez śladu po wdrożeniu insuliny i nawodnienia."
    },
    {
      id: 10,
      q: "Jakie jest bezpieczne docelowe tempo obniżania glikemii podczas insulinoterapii dożylnej w DKA?",
      opts: [
        "A. 50 - 75 mg/dl na godzinę (nie szybciej niż 90 mg/dl/h)",
        "B. Co najmniej 300 mg/dl na godzinę",
        "C. 5 mg/dl na godzinę",
        "D. Glikemia powinna spaść do zera w ciągu pierwszych 10 minut",
        "E. Tempo spadku nie ma żadnego znaczenia rokowniczego"
      ],
      options: [
        "A. 50 - 75 mg/dl na godzinę (nie szybciej niż 90 mg/dl/h)",
        "B. Co najmniej 300 mg/dl na godzinę",
        "C. 5 mg/dl na godzinę",
        "D. Glikemia powinna spaść do zera w ciągu pierwszych 10 minut",
        "E. Tempo spadku nie ma żadnego znaczenia rokowniczego"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Prawidłowa odpowiedź: A. Bezpieczne tempo spadku glikemii to około 50-75 mg/dl/h (3-4 mmol/l/h). Spadek szybszy niż 90-100 mg/dl/h stwarza groźne ryzyko gwałtownego spadku osmolalności i obrzęku mózgu.",
      expl: "Prawidłowa odpowiedź: A. 50 - 75 mg/dl na godzinę (nie szybciej niż 90 mg/dl/h)",
      expl: "Prawidłowa odpowiedź: A. Bezpieczne tempo spadku glikemii to około 50-75 mg/dl/h (3-4 mmol/l/h). Spadek szybszy niż 90-100 mg/dl/h stwarza groźne ryzyko gwałtownego spadku osmolalności i obrzęku mózgu."
    },
    {
      id: 11,
      q: "Które autoprzeciwciała są najczęściej oznaczane w celu potwierdzenia autoimmunologicznego podłoża cukrzycy typu 1 u dzieci?",
      opts: [
        "A. Anty-GAD65, anty-IA2, anty-ZnT8 oraz przeciwciała przeciwinsulinowe (IAA)",
        "B. Przeciwciała przeciwjądrowe (ANA) i anty-dsDNA",
        "C. Przeciwciała przeciw transglutaminazie tkankowej (anty-tTG IgA)",
        "D. Odczyn Paula-Bunnella-Davidsohna",
        "E. Przeciwciała anty-TPO i anty-TG"
      ],
      options: [
        "A. Anty-GAD65, anty-IA2, anty-ZnT8 oraz przeciwciała przeciwinsulinowe (IAA)",
        "B. Przeciwciała przeciwjądrowe (ANA) i anty-dsDNA",
        "C. Przeciwciała przeciw transglutaminazie tkankowej (anty-tTG IgA)",
        "D. Odczyn Paula-Bunnella-Davidsohna",
        "E. Przeciwciała anty-TPO i anty-TG"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Prawidłowa odpowiedź: A. W cukrzycy typu 1 (autoimmunologicznej) oznacza się panel przeciwciał skierowanych przeciwko antygenom komórek beta: anty-GAD65, anty-IA-2, anty-ZnT8 oraz przeciwciała przeciwinsulinowe (IAA).",
      expl: "Prawidłowa odpowiedź: A. Anty-GAD65, anty-IA2, anty-ZnT8 oraz przeciwciała przeciwinsulinowe (IAA)",
      expl: "Prawidłowa odpowiedź: A. W cukrzycy typu 1 (autoimmunologicznej) oznacza się panel przeciwciał skierowanych przeciwko antygenom komórek beta: anty-GAD65, anty-IA-2, anty-ZnT8 oraz przeciwciała przeciwinsulinowe (IAA)."
    }
  ],
  flashcards: [
    {
      front: "Jakie są 3 kryteria rozpoznania cukrzycowej kwasicy ketonowej (DKA) wg ISPAD?",
      back: "• Hiperglikemia >200 mg/dl (11 mmol/l).<br>• Kwasica metaboliczna: pH <7,30 lub HCO3- <18 mmol/l.<br>• Ketonemia (beta-hydroksymaślan >3,0 mmol/l) lub silna ketonuria."
    },
    {
      front: "Dlaczego w DKA u dzieci BEZWZGLĘDNIE ZAKAZANY jest bolus insuliny?",
      back: "• Wywołuje gwałtowny spadek osmolalności osocza.<br>• Prowadzi do masywnego obrzęku mózgu (główna przyczyna zgonów dzieci z DKA!).<br>• Insulinę podaje się wyłącznie w ciągłym wlewie i.v. (0,05-0,1 j./kg/h) po 1-2 h nawadniania."
    },
    {
      front: "Co zrobić, gdy w DKA glikemia spadnie do 250 mg/dl, a kwasica nadal trwa?",
      back: "• Do płynów dołączyć glukozę (5-10% glukoza w 0,45% NaCl z KCl).<br>• KONTYNUOWAĆ wlew insuliny aż do ustąpienia kwasicy (HCO3- >15, pH >7,30) i zamknięcia luki anionowej!"
    },
    {
      front: "Dlaczego w DKA u dzieci nie stosuje się wodorowęglanu sodu (NaHCO3)?",
      back: "• Zwiększa ryzyko śmiertelnego obrzęku mózgu.<br>• Powoduje paradoksalną kwasicę OUN (przenikanie CO2 do mózgu).<br>• Pogłębia groźną hipokaliemię."
    },
    {
      front: "Jakie są wczesne objawy obrzęku mózgu w DKA i jak natychmiast reagować?",
      back: "• Objawy: ból głowy, bradykardia, wzrost ciśnienia (Cushing), senność, wymioty.<br>• Postępowanie: uniesienie głowy 30°, natychmiast Mannitol 20% (0,5-1 g/kg w 20 min) lub 3% NaCl (3-5 ml/kg) PRZED tomografią!"
    },
    {
      front: "Kiedy rozpocząć suplementację potasu (KCl) w DKA?",
      back: "• Zaraz po włączeniu insuliny i potwierdzeniu diurezy (jeśli K+ <5,5 mmol/l).<br>• Insulina przemieszcza potas do wnętrza komórek – brak suplementacji KCl grozi śmiertelną hipokaliemią!"
    }
  ]
};

async function main() {
  await saveCase(case120);
}
main();

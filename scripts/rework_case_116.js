const fs = require('fs');
const path = require('path');
const { encryptStringAes } = require('./encrypt_case.js');

const MASTER_KEY = '@LEKSzymon28111999';
const CASES_DIR = path.join(__dirname, '..', 'cases');

console.log("Saving Case 116: Gorączka trzydniowa / Rumień nagły (HHV-6)...");

async function saveCase(caseData) {
  const filePath = path.join(CASES_DIR, caseData.filename);
  const jsonStr = JSON.stringify(caseData, null, 2);
  const encrypted = await encryptStringAes(jsonStr, MASTER_KEY);
  fs.writeFileSync(filePath, JSON.stringify(encrypted, null, 2), 'utf8');
  console.log(`[SAVED] Case #${caseData.id}: ${caseData.filename} (LEK Qs: ${caseData.lekQuestions.length}, Steps: ${caseData.steps.length}, Flashcards: ${caseData.flashcards.length})`);
}

const case116 = {
  id: 116,
  filename: "116_goraczka_trzydniowa_hhv6.json",
  dept: "Pediatria",
  shortTitle: "10-miesięczna Maja – Wysoka gorączka bez ogniska i wysypka po jej spadku (Rumień nagły)",
  diagnosisTitle: "Rumień nagły (Exanthema subitum / Gorączka trzydniowa / Szósta choroba) wywołany przez ludzki herpeswirus typu 6 (HHV-6)",
  vitals: [
    { label: "Temperatura ciała", val: "36,7°C (po 3 dniach 39,8°C)", sub: "Nagły spadek gorączki (kryzys termiczny)", status: "vital-ok" },
    { label: "Akcja serca (HR)", val: "116/min", sub: "Prawidłowa dla niemowlęcia", status: "vital-ok" },
    { label: "Częstość oddechów (RR)", val: "24/min", sub: "Oddech miarowy", status: "vital-ok" },
    { label: "Ciśnienie tętnicze / SpO2", val: "90/55 mmHg | 99%", sub: "W normie", status: "vital-ok" }
  ],
  vitalsObj: { hr: 116, bp: "90/55", spo2: 99, rr: 24, temp: 36.7, gcs: 15 },
  story: `<p><strong>Pacjentka:</strong> 10-miesięczna Maja została przyprowadzona przez rodziców do poradni pediatrycznej z powodu pojawienia się bladoróżowej, drobnoplamistej wysypki na tułowiu i szyi, która wystąpiła dziś rano – dokładnie po nagłym ustąpieniu bardzo wysokiej gorączki trwającej przez ostatnie 3 dni.</p><p><strong>Wywiad chorobowy:</strong> Trzy dni temu u dotychczas całkowicie zdrowej dziewczynki nagle wystąpiła gorączka do 39,5–40,0°C bez żadnych objawów kataralnych, kaszlu, wymiotów czy biegunki. Rodzice byli dwukrotnie na dyżurze nocnym: badanie moczu, osłuchiwanie płuc i badanie otoskopowe uszu nie wykazały żadnego uchwytnego ogniska infekcji. Dziewczynka w okresach działania leków przeciwgorączkowych (Paracetamolu i Ibuprofenu) czuła się zaskakująco dobrze, bawiła się i piła płyny. Dziś w nocy gorączka gwałtownie spadła do 36,7°C (kryzys termiczny), a rano na skórze klatki piersiowej, brzucha i szyi pojawiła się gęsta, drobna, różowa wysypka. Rodzice obawiają się sepsy lub nagłej alergii na leki przeciwgorączkowe.</p><p><strong>Badanie przedmiotowe na SOR:</strong> Niemowlę w stanie ogólnym bardzo dobrym, pogodne, uśmiechnięte, w pełni zrehydratowane. Na skórze tułowia (klatka piersiowa, brzuch, plecy) oraz szyi widoczna jest bladoróżowa, drobnoplamista i plamisto-grudkowa osutka o średnicy 2-3 mm, blednąca całkowicie pod uciskiem szpatułki, niepozostawiająca śladu. Wysypka w minimalnym stopniu obejmuje bliższe odcinki kończyn, a całkowicie oszczędza twarz, dłonie i podeszwy stóp. Śluzówka jamy ustnej wilgotna; na podniebieniu miękkim i języczku widoczne są nieliczne drobne, czerwonawe grudki i owrzodzenia (tzw. plamki Nagayamy). Błony bębenkowe perłowoszare, refleksy świetlne zachowane. Węzły chłonne potyliczne i zauszne wyczuwalne, drobne (<1 cm), niebolesne. Osłuchowo nad płucami szmer pęcherzykowy prawidłowy. Brzuch miękki, wątroba i śledziona niepowiększone. Ciemiączko przednie w poziomie kości czaszki, miękkie, niepulsujące. Objawy oponowe ujemne.</p>`,
  labs: {
    "Morfologia krwi obwodowej i biochemia": [
      { name: "Leukocyty (WBC)", val: "4,6 G/L", norm: "6,0 - 16,0 G/L", flag: "LOW" },
      { name: "Limfocyty ogółem", val: "72%", norm: "45 - 65%", flag: "HIGH" },
      { name: "Neutrofile", val: "21%", norm: "25 - 45%", flag: "LOW" },
      { name: "Hemoglobina (Hb)", val: "12,1 g/dl", norm: "10,5 - 13,5 g/dl", flag: "NORMAL" },
      { name: "Płytki krwi (PLT)", val: "210 G/L", norm: "150 - 450 G/L", flag: "NORMAL" },
      { name: "CRP", val: "3,8 mg/l", norm: "< 5,0 mg/l", flag: "NORMAL" },
      { name: "Mocz badanie ogólne", val: "Ciężar 1.018, leukocyty 1-3 wpw, białko ujemne, azotyny ujemne", norm: "Prawidłowy", flag: "NORMAL" }
    ],
    "Diagnostyka wirusologiczna (retrospektywna)": [
      { name: "Przeciwciała anty-HHV-6 IgM", val: "DODATNI (+)", norm: "Ujemny", flag: "CRIT_HIGH" },
      { name: "PCR DNA HHV-6 we krwi", val: "Wykryto DNA ludzkiego herpeswirusa typu 6", norm: "Ujemny", flag: "HIGH" }
    ]
  },
  steps: [
    {
      stepNum: 1,
      title: "Krok 1: Rozpoznanie sekwencji czasowej objawów – gorączka a wysypka",
      desc: "Analizujesz dynamikę choroby 10-miesięcznej Mai: 3 dni bardzo wysokiej gorączki (do 40°C) bez ogniska z nagłym spadkiem temperatury i następowym pojawieniem się bladoróżowej wysypki na tułowiu. Jaka jest najbardziej prawdopodobna diagnoza?",
      scenario: "Analizujesz dynamikę choroby 10-miesięcznej Mai: 3 dni bardzo wysokiej gorączki (do 40°C) bez ogniska z nagłym spadkiem temperatury i następowym pojawieniem się bladoróżowej wysypki na tułowiu. Jaka jest najbardziej prawdopodobna diagnoza?",
      options: [
        {
          text: "Rumień nagły (Gorączka trzydniowa / Exanthema subitum / szósta choroba) wywołany zakażeniem wirusem HHV-6",
          correct: true,
          isCorrect: true,
          feedback: "✅ PRAWIDŁOWO! <strong>Patognomoniczna sekwencja gorączki trzydniowej!</strong> Rumień nagły cechuje się unikalną chronologią: 1. Wysoka gorączka (39-40°C) trwająca ściśle 3 do 4 dni u niemowlęcia w dobrym stanie ogólnym bez uchwytnego ogniska infekcji, 2. Gwałtowny spadek temperatury do normy (kryzys termiczny), 3. Natychmiastowy wysiew bladoróżowej, drobnoplamistej osutki na tułowiu i szyi. W żadnej innej chorobie wysypkowej wysypka nie pojawia się DOPIERO PO całkowitym ustąpieniu gorączki!"
        },
        {
          text: "Odra powikłana posocznicą gronkowcową",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>W odrze wysypka pojawia się W SZCZYCIE gorączki</strong> i objawów kataralnych, a stan dziecka gwałtownie się pogarsza."
        },
        {
          text: "Alergia na paracetamol i ibuprofen z obrzękiem naczynioruchowym",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Wysypka plamisto-grudkowa po 3 dniach leczenia po ustąpieniu gorączki to klasyczny rumień nagły</strong>, a nie pokrzywka alergiczna (która powstałaby w ciągu minut/godzin od leku i swędziała)."
        },
        {
          text: "Wrodzona kiła objawowa z pęcherzycą dłoni",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Pęcherzyca kiłowa występuje u noworodków na dłoniach i podeszwach</strong> z sapką kiłową i powiększeniem wątroby."
        }
      ]
    },
    {
      stepNum: 2,
      title: "Krok 2: Czynnik etiologiczny i biologia wirusa",
      desc: "Jaki patogen odpowiada za wywołanie ponad 90% przypadków gorączki trzydniowej (rumienia nagłego) u niemowląt?",
      scenario: "Jaki patogen odpowiada za wywołanie ponad 90% przypadków gorączki trzydniowej (rumienia nagłego) u niemowląt?",
      options: [
        {
          text: "Ludzki herpeswirus typu 6 (HHV-6, głównie wariant B); w niewielkim odsetku przypadków ludzki herpeswirus typu 7 (HHV-7)",
          correct: true,
          isCorrect: true,
          feedback: "✅ PRAWIDŁOWO! <strong>Etiologia rumienia nagłego!</strong> Wirus HHV-6B (Human Herpesvirus 6B z rodziny Herpesviridae, podrodziny Betaherpesvirinae) odpowiada za niemal wszystkie zachorowania na gorączkę trzydniową u dzieci w wieku od 6 do 18 miesięcy. Wirus przenosi się głównie ze śliną bezobjawowych dorosłych domowników. Po zakażeniu pierwotnym wirus pozostaje w stanie dożywotniej latencji w limfocytach i makrofagach."
        },
        {
          text: "Parwowirus B19",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Parwowirus B19 wywołuje rumień zakaźny (piątą chorobę)</strong> z objawem spoliczkowanego dziecka."
        },
        {
          text: "Wirus odry (Morbillivirus)",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Wirus odry wywołuje odrę (morbilli).</strong>"
        },
        {
          text: "Streptococcus pneumoniae",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Pneumokok to bakteria wywołująca zapalenie płuc, ucha i ZOMR.</strong>"
        }
      ]
    },
    {
      stepNum: 3,
      title: "Krok 3: Badanie enanthemy w jamie ustnej – plamki Nagayamy",
      desc: "W trakcie badania gardła Mai zauważasz drobne, czerwone plamki i grudki na błonie śluzowej podniebienia miękkiego i języczka. Jak nazywa się ten objaw enanthemy w rumieniu nagłym?",
      scenario: "W trakcie badania gardła Mai zauważasz drobne, czerwone plamki i grudki na błonie śluzowej podniebienia miękkiego i języczka. Jak nazywa się ten objaw enanthemy w rumieniu nagłym?",
      options: [
        {
          text: "Plamki Nagayamy (Nagayama's spots) – rumieniowe grudki i owrzodzenia na granicy podniebienia miękkiego i języczka obserwowane u części chorych na rumień nagły",
          correct: true,
          isCorrect: true,
          feedback: "✅ PRAWIDŁOWO! <strong>Cenny detal semiotyczny pediatrii!</strong> Plamki Nagayamy to rumieniowe grudki lub drobne owrzodzenia zlokalizowane na języczku i podniebieniu miękkim, obecne u ok. 30-50% niemowląt z zakażeniem HHV-6 w fazie prodromalnej lub wczesnej wysypkowej. Należy je odróżnić od plamek Koplika (odra) oraz plamek Forchheimera (różyczka)."
        },
        {
          text: "Plamki Koplika",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Plamki Koplika to białe, przypominające ziarna piasku zmiany na błonie śluzowej policzków w odrze!</strong>"
        },
        {
          text: "Plamki Rotha",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Plamki Rotha to wybroczyny w siatkówce oka</strong> w infekcyjnym zapaleniu wsierdzia (IE)."
        },
        {
          text: "Węzły Oslera",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Węzły Oslera to bolesne guzki na opuszkach palców</strong> w infekcyjnym zapaleniu wsierdzia."
        }
      ]
    },
    {
      stepNum: 4,
      title: "Krok 4: Najczęstsze powikłanie ostrej fazy – drgawki gorączkowe",
      desc: "Mama pyta, czy wysoka gorączka 40°C mogła zagrażać życiu Mai. Z jakim powikłaniem neurologicznym zakażenie HHV-6 wiąże się częściej niż jakikolwiek inny wirus wieku niemowlęcego?",
      scenario: "Mama pyta, czy wysoka gorączka 40°C mogła zagrażać życiu Mai. Z jakim powikłaniem neurologicznym zakażenie HHV-6 wiąże się częściej niż jakikolwiek inny wirus wieku niemowlęcego?",
      options: [
        {
          text: "Drgawki gorączkowe (występujące u 10-15% chorych niemowląt w fazie szybkiego narastania temperatury; HHV-6 odpowiada za około 1/3 wszystkich drgawek gorączkowych w 1. roku życia)",
          correct: true,
          isCorrect: true,
          feedback: "✅ PRAWIDŁOWO! <strong>Kluczowe powiązanie neurologiczno-wirusologiczne!</strong> Ze względu na neurotropizm wirusa HHV-6 oraz gwałtowny, stromy skok temperatury ciała (do 40°C), zakażenie HHV-6 jest najczęstszą pojedynczą przyczyną drgawek gorączkowych u niemowląt i małych dzieci (odpowiada za 20-35% pierwszych w życiu epizodów drgawek gorączkowych). Same drgawki gorączkowe proste mają jednak doskonałe rokowanie i nie prowadzą do uszkodzenia mózgu."
        },
        {
          text: "Młodzieńczy udar krwotoczny z porażeniem czterokończynowym",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>HHV-6 u zdrowych niemowląt nie wywołuje udarów mózgu.</strong>"
        },
        {
          text: "Całkowita utrata wzroku w mechanizmie atrofii nerwów wzrokowych",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Brak takiego powikłania w niepowikłanym rumieniu nagłym.</strong>"
        },
        {
          text: "Porażenie wiotkie mięśni oddechowych na wzór polio",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Porażenia wywołują enterowirusy (polio), a nie HHV-6.</strong>"
        }
      ]
    },
    {
      stepNum: 5,
      title: "Krok 5: Analiza leukopenii w morfologii krwi",
      desc: "W morfologii krwi Mai pobranej w 4. dobie stwierdzono leukopenię (WBC 4,6 G/L) z limfocytozą (72%) i neutropenią przy prawidłowym CRP (3,8 mg/l). O czym świadczy taki obraz?",
      scenario: "W morfologii krwi Mai pobranej w 4. dobie stwierdzono leukopenię (WBC 4,6 G/L) z limfocytozą (72%) i neutropenią przy prawidłowym CRP (3,8 mg/l). O czym świadczy taki obraz?",
      options: [
        {
          text: "Jest to typowy odczyn krwiotwórczy dla zakażenia HHV-6 – wirus wykazuje przejściowy tropizm hamujący wczesne prekursory szpikowe i neutrofile, co skutkuje leukopenią ze względną limfocytozą w momencie spadku gorączki; nie wymaga żadnego leczenia hematologicznego",
          correct: true,
          isCorrect: true,
          feedback: "✅ PRAWIDŁOWO! <strong>Fizjologia laboratoryjna rumienia nagłego!</strong> W pierwszych 24-48 godzinach zakażenia HHV-6 może występować przejściowa leukocytoza, ale od 3.-4. doby charakterystyczny staje się spadek liczby leukocytów (leukopenia 3-5 G/L) z wyraźną neutropenią i względną limfocytozą. Przy niskim stężeniu CRP i ujemnym posiewie moczu wyklucza to zakażenie bakteryjne i potwierdza wirusowy charakter choroby."
        },
        {
          text: "Świadczy o ostrej białaczce szpikowej wymagającej natychmiastowej chemioterapii indukującej",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>W rozmazie krwi brak blastów nowotworowych</strong>, a przejściowa leukopenia w infekcji wirusowej jest zjawiskiem powszechnym."
        },
        {
          text: "Oznacza sepsę meningokokową z agranulocytozą piorunującą",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>W sepsie dziecko byłoby we wstrząsie</strong> z wybroczynami i skrajnie wysokim CRP/prokalcytoniną."
        },
        {
          text: "Wskazuje na zatrucie ołowiem",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Zatrucie ołowiem daje anemię mikrocytarną z nakrapianiem zasadochłonnym erytrocytów.</strong>"
        }
      ]
    },
    {
      stepNum: 6,
      title: "Krok 6: Postępowanie terapeutyczne w rumieniu nagłym",
      desc: "Jakie leczenie farmakologiczne i niefarmakologiczne należy zalecić rodzicom Mai po postawieniu rozpoznania rumienia nagłego w fazie wysypkowej?",
      scenario: "Jakie leczenie farmakologiczne i niefarmakologiczne należy zalecić rodzicom Mai po postawieniu rozpoznania rumienia nagłego w fazie wysypkowej?",
      options: [
        {
          text: "Brak konieczności stosowania jakichkolwiek leków w fazie wysypkowej; choroba jest samoograniczająca się, wysypka ustąpi samoistnie w ciągu 1-2 dni bez śladu. Zaleca się prawidłowe nawodnienie doustne, normalną dietę i powrót do codziennych aktywności",
          correct: true,
          isCorrect: true,
          feedback: "✅ PRAWIDŁOWO! <strong>Postępowanie zgodne z EBM!</strong> W fazie wysypkowej dziecko jest już apyretyczne i zdrowe. Osutka nie swędzi, nie łuszczy się i ustępuje bez śladu w ciągu 24-48 godzin. Leki przeciwwirusowe (np. gancyklowir, foscarnet) są stosowane wyłącznie u pacjentów ze skrajnym niedoborem odporności (np. po przeszczepieniu szpiku) z zapaleniem mózgu HHV-6, a u niemowląt immunokompetentnych są bezwzględnie zbędne i szkodliwe."
        },
        {
          text: "Podanie dożylnego Gancyklowiru przez 21 dni w warunkach OIT",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Gancyklowir jest toksyczny (mielosupresja)</strong> i zarezerwowany wyłącznie dla ciężkich zakażeń u pacjentów potransplantacyjnych."
        },
        {
          text: "Wdrożenie doustnego sterydu (Deksametazonu) w celu przyspieszenia zanikania plamek",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Sterydy są całkowicie przeciwwskazane</strong> w łagodnych zakażeniach wirusowych."
        },
        {
          text: "Podanie Cefaleksyny doustnie w celu 'ochrony przed nadkażeniem wysypki'",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Antybiotyki nie działają na wirusy</strong> i ich profilaktyczne stosowanie w rumieniu nagłym jest błędem sztuki."
        }
      ]
    },
    {
      stepNum: 7,
      title: "Krok 7: Diagnostyka różnicowa – dlaczego to nie jest odra ani różyczka?",
      desc: "Lekarz stażysta zastanawia się, po czym najszybciej odróżnić rumień nagły od odry i różyczki. Jaka jest kluczowa cecha różnicująca rumień nagły?",
      scenario: "Lekarz stażysta zastanawia się, po czym najszybciej odróżnić rumień nagły od odry i różyczki. Jaka jest kluczowa cecha różnicująca rumień nagły?",
      options: [
        {
          text: "Czas pojawienia się wysypki względem gorączki (wysypka pojawia się PO krytycznym spadku temperatury do normy, podczas gdy w odrze i różyczce występuje w trakcie trwania gorączki) oraz lokalizacja (w rumieniu nagłym głównie na tułowiu z oszczędzeniem twarzy, w odrze i różyczce zaczyna się od twarzy i zstępuje)",
          correct: true,
          isCorrect: true,
          feedback: "✅ PRAWIDŁOWO! <strong>Żelazna reguła różnicowania chorób wysypkowych!</strong> W odrze gorączka narasta wraz z wysypką (która ma charakter gruboplamisty, zlewający się i zstępuje od linii włosów). W różyczce wysypka również zaczyna się na twarzy w obecności powiększonych węzłów potylicznych. W rumieniu nagłym wysypka wysiewa się nagle, gdy gorączka spada do zera, i dominuje na tułowiu, oszczędzając twarz."
        },
        {
          text: "Rumień nagły występuje wyłącznie u osób po 80. roku życia",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Rumień nagły to typowa choroba niemowląt (szczyt 6-15 m.ż.)!</strong>"
        },
        {
          text: "W odrze nie występuje nigdy gorączka ani kaszel",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>W odrze gorączka sięga 40°C i towarzyszy jej szczekający kaszel i światłowstręt.</strong>"
        },
        {
          text: "W różyczce zawsze dochodzi do martwicy kości długich",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Różyczka ma łagodny przebieg u dzieci.</strong>"
        }
      ]
    },
    {
      stepNum: 8,
      title: "Krok 8: Edukacja rodziców i zakaźność",
      desc: "Mama pyta, czy Maja może wyjść na spacer i czy zakaża inne dzieci na placu zabaw. Co odpowiesz rodzicom?",
      scenario: "Mama pyta, czy Maja może wyjść na spacer i czy zakaża inne dzieci na placu zabaw. Co odpowiesz rodzicom?",
      options: [
        {
          text: "Dziewczynka jest w doskonałym stanie ogólnym, nie gorączkuje i może wyjść na spacer; zakaźność w fazie wysypkowej jest znikoma, a retransmisja wirusa zachodzi głównie przez ślinę bezobjawowych dorosłych nosicieli",
          correct: true,
          isCorrect: true,
          feedback: "✅ PRAWIDŁOWO! <strong>Zdroworozsądkowe i zgodne z wiedzą medyczną zalecenie!</strong> Dziecko po spadku gorączki czuje się dobrze i nie ma żadnych przeciwwskazań do spacerów na świeżym powietrzu. Większość dorosłych (ponad 95% populacji) jest nosicielami wirusa HHV-6 i wydala go okresowo w ślinie – to właśnie dorośli opiekunowie są źródłem zakażenia dla niemowląt, a nie inne dzieci w fazie wysypki."
        },
        {
          text: "Dziecko musi leżeć w całkowitej ciemności przez 6 tygodni",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Nieuzasadnione ograniczenie!</strong>"
        },
        {
          text: "Należy spalić wszystkie ubrania i zabawki dziecka",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Herpeswirusy są wrażliwe na zwykłe mydło i detergenty.</strong>"
        },
        {
          text: "Wysypka przeobrazi się jutro w zgorzel gazową",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Wysypka znika samoistnie po 24-48 godzinach.</strong>"
        }
      ]
    }
  ],
  pathoNodes: [
    {
      badge: "OGNIWO 1 • Zakażenie pierwotne HHV-6 drogą ślinową",
      title: "Transmisja od bezobjawowych nosicieli, wnikanie przez receptor CD46",
      short: "Wirus HHV-6 przenosi się ze śliną opiekunów, wnikając do leukocytów przez receptor CD46.",
      detail: "Ludzki herpeswirus typu 6 (HHV-6B) jest wirusem dsDNA o budowie otoczkowej. Ponad 95% dorosłych jest bezobjawowymi nosicielami wirusa wydalanymi okresowo w ślinie. Niemowlę po wygaśnięciu matczynych przeciwciał IgG (zwykle w 6.-9. miesiącu życia) ulega zakażeniu drogą kropelkową lub przez kontakt ze śliną rodziców. Wirus wykorzystuje jako receptor wejściowy cząsteczkę CD46 (błonowy kofaktor białkowy dopełniacza) obecną na powierzchni niemal wszystkich komórek jądrzastych, ze szczególnym tropizmem do limfocytów T CD4+ oraz komórek prekursorowych szpiku i gleju.",
      target: "Leczenie przeciwgorączkowe w fazie wiremii: <span class='dose-pill'>Paracetamol 15 mg/kg m.c. p.o.</span> co 4-6 h lub <span class='dose-pill'>Ibuprofen 10 mg/kg m.c. p.o.</span> co 8 h; intensywne nawadnianie.",
      desc: "Transmisja od bezobjawowych nosicieli, wnikanie przez receptor CD46.",
      drugTarget: "Leczenie przeciwgorączkowe w fazie wiremii: <span class='dose-pill'>Paracetamol 15 mg/kg m.c. p.o.</span> co 4-6 h lub <span class='dose-pill'>Ibuprofen 10 mg/kg m.c. p.o.</span> co 8 h; intensywne nawadnianie."
    },
    {
      badge: "OGNIWO 2 • Wiremia, cytokiny i stromy skok gorączki",
      title: "Replikacja w układzie siateczkowo-śródbłonkowym i wyrzut pirogenów (IL-1, TNF)",
      short: "Masywna replikacja wirusa indukuje wyrzut cytokin i wysoką gorączkę do 40°C.",
      detail: "W fazie ostrej replikacji dochodzi do wysokiej wiremii we krwi obwodowej. Zakażone makrofagi i monocyty wydzielają do krążenia wysokie stężenia endogennych pirogenów: interleukiny-1 (IL-1beta), czynnika martwicy nowotworów (TNF-alfa) oraz interferonu gamma (IFN-gamma). Pirogeny te przestawiają punkt nastawczy w podwzgórzu, wywołując gwałtowny skok temperatury ciała do 39,5-40,0°C. Szybkie tempo narastania temperatury w połączeniu z predyspozycją genetyczną i neurotropizmem wirusa obniża próg drgawkowy, sprzyjając drgawkom gorączkowym.",
      target: "Kontrola termiczna i neuroprotekcja: <span class='dose-pill'>chłodne okłady</span>, <span class='dose-pill'>nawadnianie doustne 100-150 ml/kg/dobę</span>; w razie drgawek >5 min: <span class='dose-pill'>Diazepam 0,5 mg/kg p.r.</span> lub <span class='dose-pill'>Midazolam 0,2-0,3 mg/kg na śluzówkę policzka</span>.",
      desc: "Replikacja w układzie siateczkowo-śródbłonkowym i wyrzut pirogenów (IL-1, TNF).",
      drugTarget: "Kontrola termiczna i neuroprotekcja: <span class='dose-pill'>chłodne okłady</span>, <span class='dose-pill'>nawadnianie doustne 100-150 ml/kg/dobę</span>; w razie drgawek >5 min: <span class='dose-pill'>Diazepam 0,5 mg/kg p.r.</span> lub <span class='dose-pill'>Midazolam 0,2-0,3 mg/kg na śluzówkę policzka</span>."
    },
    {
      badge: "OGNIWO 3 • Neutralizacja wirusa i krytyczny spadek temperatury",
      title: "Synteza przeciwciał anty-HHV-6 IgM/IgG i eliminacja wiremii z krążenia",
      short: "W 3.-4. dobie pojawiają się przeciwciała neutralizujące, a gorączka gwałtownie spada.",
      detail: "Około 3.-4. doby od początku gorączki układ odpornościowy dziecka syntetyzuje wysokie miana swoistych przeciwciał neutralizujących klasy IgM oraz aktywuje swoiste limfocyty cytotoksyczne. Prowadzi to do gwałtownego zahamowania replikacji wirusowej i nagłego oczyszczenia krwi z krążących wirionów. Produkcja cytokin prozapalnych natychmiast ustaje, a temperatura ciała w ciągu kilku godzin krytycznie powraca do normy (kryzys termiczny).",
      target: "Terapia podtrzymująca: <span class='dose-pill'>odstawienie leków przeciwgorączkowych</span> po normalizacji temperatury; obserwacja powłok skórnych.",
      desc: "Synteza przeciwciał anty-HHV-6 IgM/IgG i eliminacja wiremii z krążenia.",
      drugTarget: "Terapia podtrzymująca: <span class='dose-pill'>odstawienie leków przeciwgorączkowych</span> po normalizacji temperatury; obserwacja powłok skórnych."
    },
    {
      badge: "OGNIWO 4 • Naczynioruchowa osutka plamista na tułowiu",
      title: "Odkładanie kompleksów immunologicznych w naczyniach skóry i plamki Nagayamy",
      short: "Poszerzenie naczyń skóry pod wpływem kompleksów immunologicznych tworzy różową wysypkę.",
      detail: "Połączenie antygenów wirusowych ze swoistymi przeciwciałami tworzy krążące kompleksy immunologiczne, które odkładają się w łożysku naczyniowym skóry właściwej tułowia i szyi oraz w błonie śluzowej podniebienia miękkiego. Powoduje to miejscowe rozszerzenie kapilar i łagodny obrzęk okołonaczyniowy bez martwicy i bez wynaczynień, manifestujący się jako bladoróżowa, drobnoplamista osutka całkowicie blednąca pod uciskiem oraz plamki Nagayamy w jamie ustnej. Zmiany ustępują bez pozostawienia łuszczenia ani przebarwień.",
      target: "Pielęgnacja skóry: <span class='dose-pill'>lekkie emulsje nawilżające</span>; brak konieczności stosowania leków przeciwhistaminowych (brak świądu).",
      desc: "Odkładanie kompleksów immunologicznych w naczyniach skóry i plamki Nagayamy.",
      drugTarget: "Pielęgnacja skóry: <span class='dose-pill'>lekkie emulsje nawilżające</span>; brak konieczności stosowania leków przeciwhistaminowych (brak świądu)."
    }
  ],
  diffTable: {
    title: "⚔️ Tabela Różnicowa: Rumień nagły vs Odra vs Różyczka vs Płonica",
    headers: ["Cecha kliniczna", "Rumień nagły (HHV-6)", "Odra (Morbilli)", "Różyczka (Rubella)", "Płonica (Szkarlatyna)"],
    rows: [
      ["Etiologia", "Ludzki herpeswirus 6 (HHV-6B)", "Wirus odry (Paramyxoviridae)", "Wirus różyczki (Matonaviridae)", "Streptococcus pyogenes (GAS)"],
      ["Zależność czasowa wysypki", "Wysypka pojawia się PO SPADKU GORĄCZKI (kryzysie)", "Wysypka pojawia się W SZCZYCIE gorączki (40°C)", "Wysypka w 1.-2. dobie łagodnej gorączki", "Wysypka w 1.-2. dobie wysokiej gorączki"],
      ["Rozmieszczenie zmian", "Głównie tułów i szyja; twarz i kończyny wolne", "Zstępująca: linia włosów -> twarz -> tułów -> stopy", "Twarz -> tułów -> kończyny; szybkie ustępowanie", "Tułów, zgięcia stawowe (Pastia), twarz (Fiłatow)"],
      ["Charakter wykwitów", "Bladoróżowe, drobnoplamiste, niezlewające się", "Gruboplamisto-grudkowe, ciemnoczerwone, zlewające się", "Drobnoplamiste, różowe, niezlewające się", "Drobnoplamiste, szorstkie jak papier ścierny"],
      ["Objawy w jamie ustnej", "Plamki Nagayamy na języczku i podniebieniu", "Plamki Koplika na śluzówce policzków", "Plamki Forchheimera na podniebieniu", "Język malinowy, ropna angina na migdałkach"],
      ["Objawy towarzyszące", "Stan ogólny dobry; drgawki gorączkowe", "Ciężki katar, szczekający kaszel, światłowstręt", "Bolesne powiększenie węzłów potylicznych", "Ból gardła, wymioty, ból brzucha"],
      ["Ewolucja po ustąpieniu", "Ustępuje bez śladu (brak łuszczenia, brak plam)", "Brunatne przebarwienia i otrębiaste łuszczenie", "Ustępuje bez śladu w ciągu 2-3 dni", "Drobnopłatkowe na twarzy, grubopłatkowe dłoni i stóp"],
      ["Leczenie przyczynowe", "Objawowe (leki przeciwgorączkowe w I fazie)", "Objawowe + wysokie dawki Witaminy A", "Wyłącznie leczenie objawowe", "Penicylina V doustnie przez 10 dni"]
    ]
  },
  dutySummary: {
    overview: "Rumień nagły (gorączka trzydniowa / exanthema subitum / szósta choroba) jest łagodną, powszechną chorobą wirusową niemowląt wywołaną przez wirus HHV-6B. Charakteryzuje się nagłą, wysoką gorączką (39-40°C) bez ogniska trwającą 3-4 dni, po której następuje gwałtowny spadek temperatury do normy (kryzys termiczny) i natychmiastowy wysiew bladoróżowej, drobnoplamistej osutki na tułowiu i szyi. W ostrej fazie gorączkowej istnieje ryzyko drgawek gorączkowych; w fazie wysypkowej choroba nie wymaga leczenia.",
    diagnostics: "1. Rozpoznanie kliniczne oparte na charakterystycznej sekwencji: wysypka pojawiająca się dokładnie po spadku 3-dniowej gorączki.<br>2. Morfologia krwi z rozmazem: wykazanie leukopenii ze względną limfocytozą i neutropenią oraz prawidłowego CRP (pomaga wykluczyć posocznicę bakteryjną).<br>3. Badanie ogólne moczu (wykluczenie zakażenia układu moczowego ZUM jako przyczyny gorączki bez ogniska).<br>4. Oglądanie podniebienia miękkiego pod kątem plamek Nagayamy.",
    drugsAndDoses: "1. Kontrola gorączki w fazie prodromalnej (pierwsze 3 dni): <span class='dose-pill'>Paracetamol 15 mg/kg m.c. p.o./p.r.</span> co 4-6 h (max. 60 mg/kg/d) lub <span class='dose-pill'>Ibuprofen 10 mg/kg m.c. p.o.</span> co 8 h (max. 30 mg/kg/d).<br>2. W fazie wysypkowej: <span class='dose-pill'>brak wskazań do jakiejkolwiek farmakoterapii</span>.<br>3. W razie drgawek gorączkowych trwających >5 minut: <span class='dose-pill'>Diazepam 0,5 mg/kg m.c. p.r.</span> (wlewka doodbytnicza) lub <span class='dose-pill'>Midazolam 0,2-0,3 mg/kg m.c. na błonę śluzową policzka</span>.<br>4. KATEGORYCZNY ZAKAZ: nie wdrażać antybiotyków ani leków przeciwwirusowych (Gancyklowiru) u dzieci immunokompetentnych!",
    procedures: "1. Zapewnienie obfitej podaży płynów doustnych (letnia woda, mleko, elektrolity) w okresie wysokiej gorączki.<br>2. Fizykalne metody ochładzania (kąpiel o temperaturze o 1-2°C niższej od temperatury ciała, chłodne okłady na czoło i pachwiny).<br>3. Edukacja rodziców co do łagodnego, samoograniczającego się charakteru osutki.<br>4. Brak konieczności kwarantanny po ustąpieniu gorączki (dziecko może wychodzić na spacery).",
    monitoring: "1. Obserwacja neurologiczna niemowlęcia w fazie szybkiego narastania gorączki pod kątem drgawek gorączkowych.<br>2. Monitorowanie stanu nawodnienia (napięcie ciemiączka, elastyczność skóry, diureza, wilgotność śluzówek).<br>3. Kontrola ustępowania wysypki (powinna zniknąć samoistnie w ciągu 24-48 godzin bez pozostawiania śladu).<br>4. Ponowna ocena lekarska w razie braku ustąpienia gorączki po 4. dobie (poszukiwanie innych przyczyn: ZUM, zapalenie płuc, bakteriemia ukryta)."
  },
  lekQuestions: [
    {
      id: 1,
      q: "Która cecha przebiegu klinicznego jest najbardziej charakterystyczna dla rumienia nagłego (gorączki trzydniowej)?",
      opts: [
        "A. Pojawienie się wysypki dokładnie w momencie gwałtownego spadku wysokiej gorączki do normy (kryzysu termicznego)",
        "B. Pojawienie się wysypki w szczycie gorączki 40°C i jej narastanie z każdym kolejnym dniem",
        "C. Brak gorączki przez cały okres trwania choroby",
        "D. Występowanie wykwitów wyłącznie na owłosionej skórze głowy",
        "E. Współistnienie ropnego zapalenia spojówek z owrzodzeniem rogówki"
      ],
      options: [
        "A. Pojawienie się wysypki dokładnie w momencie gwałtownego spadku wysokiej gorączki do normy (kryzysu termicznego)",
        "B. Pojawienie się wysypki w szczycie gorączki 40°C i jej narastanie z każdym kolejnym dniem",
        "C. Brak gorączki przez cały okres trwania choroby",
        "D. Występowanie wykwitów wyłącznie na owłosionej skórze głowy",
        "E. Współistnienie ropnego zapalenia spojówek z owrzodzeniem rogówki"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Prawidłowa odpowiedź: A. Patognomoniczną cechą rumienia nagłego jest sekwencja: 3-4 dni wysokiej gorączki bez uchwytnego ogniska, po czym następuje gwałtowny spadek temperatury i równoległe pojawienie się bladoróżowej wysypki na tułowiu.",
      expl: "Prawidłowa odpowiedź: A. Patognomoniczną cechą rumienia nagłego jest sekwencja: 3-4 dni wysokiej gorączki bez uchwytnego ogniska, po czym następuje gwałtowny spadek temperatury i równoległe pojawienie się bladoróżowej wysypki na tułowiu."
    },
    {
      id: 2,
      q: "Głównym czynnikiem etiologicznym gorączki trzydniowej (exanthema subitum) jest:",
      opts: [
        "A. Ludzki herpeswirus typu 6 (HHV-6)",
        "B. Parwowirus B19",
        "C. Wirus różyczki",
        "D. Wirus odry",
        "E. Wirus Epsteina-Barr (EBV)"
      ],
      options: [
        "A. Ludzki herpeswirus typu 6 (HHV-6)",
        "B. Parwowirus B19",
        "C. Wirus różyczki",
        "D. Wirus odry",
        "E. Wirus Epsteina-Barr (EBV)"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Prawidłowa odpowiedź: A. Czynnikiem etiologicznym rumienia nagłego w >90% przypadków jest ludzki herpeswirus typu 6 (HHV-6B), rzadziej HHV-7.",
      expl: "Prawidłowa odpowiedź: A. Czynnikiem etiologicznym rumienia nagłego w >90% przypadków jest ludzki herpeswirus typu 6 (HHV-6B), rzadziej HHV-7."
    },
    {
      id: 3,
      q: "Jakie jest najczęstsze powikłanie występujące w fazie gorączkowej rumienia nagłego u niemowląt?",
      opts: [
        "A. Drgawki gorączkowe",
        "B. Martwica cewek nerkowych",
        "C. Pęknięcie śledziony",
        "D. Zatorowość płucna",
        "E. Zapalenie mięśnia sercowego ze wstrząsem kardiogennym"
      ],
      options: [
        "A. Drgawki gorączkowe",
        "B. Martwica cewek nerkowych",
        "C. Pęknięcie śledziony",
        "D. Zatorowość płucna",
        "E. Zapalenie mięśnia sercowego ze wstrząsem kardiogennym"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Prawidłowa odpowiedź: A. Ze względu na szybki wzrost temperatury do 40°C oraz neurotropizm HHV-6, drgawki gorączkowe występują u ok. 10-15% chorych niemowląt (HHV-6 jest najczęstszą wirusową przyczyną drgawek gorączkowych w tej grupie wiekowej).",
      expl: "Prawidłowa odpowiedź: A. Ze względu na szybki wzrost temperatury do 40°C oraz neurotropizm HHV-6, drgawki gorączkowe występują u ok. 10-15% chorych niemowląt (HHV-6 jest najczęstszą wirusową przyczyną drgawek gorączkowych w tej grupie wiekowej)."
    },
    {
      id: 4,
      q: "Czym są tzw. plamki Nagayamy obserwowane w przebiegu rumienia nagłego?",
      opts: [
        "A. Rumieniowe grudki i owrzodzenia na błonie śluzowej języczka i podniebienia miękkiego",
        "B. Białawe naloty w kryptach migdałków",
        "C. Wybroczyny pod paznokciami rąk",
        "D. Niebieskawe plamy w okolicy kości krzyżowej",
        "E. Zmiany pęcherzykowe wokół odbytu"
      ],
      options: [
        "A. Rumieniowe grudki i owrzodzenia na błonie śluzowej języczka i podniebienia miękkiego",
        "B. Białawe naloty w kryptach migdałków",
        "C. Wybroczyny pod paznokciami rąk",
        "D. Niebieskawe plamy w okolicy kości krzyżowej",
        "E. Zmiany pęcherzykowe wokół odbytu"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Prawidłowa odpowiedź: A. Plamki Nagayamy to enanthema w postaci drobnych rumieniowych grudek i owrzodzeń na języczku i podniebieniu miękkim u dzieci chorych na rumień nagły.",
      expl: "Prawidłowa odpowiedź: A. Plamki Nagayamy to enanthema w postaci drobnych rumieniowych grudek i owrzodzeń na języczku i podniebieniu miękkim u dzieci chorych na rumień nagły."
    },
    {
      id: 5,
      q: "Gdzie typowo zlokalizowana jest wysypka w rumieniu nagłym?",
      opts: [
        "A. Przede wszystkim na tułowiu i szyi, w znacznie mniejszym stopniu na kończynach, zazwyczaj oszczędza twarz",
        "B. Wyłącznie na twarzy i dłoniach",
        "C. Ściśle na podeszwach stóp",
        "D. W fałdach łokciowych w postaci linii Pastii",
        "E. Wzdłuż pojedynczego dermatomu na klatce piersiowej"
      ],
      options: [
        "A. Przede wszystkim na tułowiu i szyi, w znacznie mniejszym stopniu na kończynach, zazwyczaj oszczędza twarz",
        "B. Wyłącznie na twarzy i dłoniach",
        "C. Ściśle na podeszwach stóp",
        "D. W fałdach łokciowych w postaci linii Pastii",
        "E. Wzdłuż pojedynczego dermatomu na klatce piersiowej"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Prawidłowa odpowiedź: A. Osutka w rumieniu nagłym ma charakter odśrodkowy – pojawia się na tułowiu i szyi, może przejść na dosiebne odcinki kończyn, natomiast twarz i części dystalne kończyn pozostają wolne od zmian.",
      expl: "Prawidłowa odpowiedź: A. Osutka w rumieniu nagłym ma charakter odśrodkowy – pojawia się na tułowiu i szyi, może przejść na dosiebne odcinki kończyn, natomiast twarz i części dystalne kończyn pozostają wolne od zmian."
    },
    {
      id: 6,
      q: "W morfologii krwi obwodowej w momencie pojawienia się wysypki w rumieniu nagłym typowo obserwuje się:",
      opts: [
        "A. Leukopenię ze względną limfocytozą i neutropenią",
        "B. Masywną leukocytozę z neutrofilią >90%",
        "C. Ciężką trombocytopenię <10 G/L",
        "D. Eozynofilię >50%",
        "E. Anemię hemolityczną z retikulocytami >150 promili"
      ],
      options: [
        "A. Leukopenię ze względną limfocytozą i neutropenią",
        "B. Masywną leukocytozę z neutrofilią >90%",
        "C. Ciężką trombocytopenię <10 G/L",
        "D. Eozynofilię >50%",
        "E. Anemię hemolityczną z retikulocytami >150 promili"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Prawidłowa odpowiedź: A. Dla zakażenia HHV-6 typowa jest leukopenia z neutropenią i względną limfocytozą, rozwijająca się pod koniec fazy gorączkowej i w fazie wysypkowej.",
      expl: "Prawidłowa odpowiedź: A. Dla zakażenia HHV-6 typowa jest leukopenia z neutropenią i względną limfocytozą, rozwijająca się pod koniec fazy gorączkowej i w fazie wysypkowej."
    },
    {
      id: 7,
      q: "W jakim wieku najczęściej dochodzi do zachorowania na rumień nagły?",
      opts: [
        "A. Między 6. a 15.-18. miesiącem życia (niemowlęta i małe dzieci)",
        "B. W pierwszym tygodniu życia noworodka",
        "C. W wieku 14-18 lat",
        "D. U osób powyżej 65. roku życia",
        "E. Zachorowania rozkładają się równomiernie we wszystkich grupach wiekowych"
      ],
      options: [
        "A. Między 6. a 15.-18. miesiącem życia (niemowlęta i małe dzieci)",
        "B. W pierwszym tygodniu życia noworodka",
        "C. W wieku 14-18 lat",
        "D. U osób powyżej 65. roku życia",
        "E. Zachorowania rozkładają się równomiernie we wszystkich grupach wiekowych"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Prawidłowa odpowiedź: A. Szczyt zachorowań na rumień nagły przypada na wiek 6-15 miesięcy, gdy zanikają ochronne przeciwciała matczyne IgG. Do 2.-3. roku życia niemal 100% dzieci ulega zakażeniu HHV-6.",
      expl: "Prawidłowa odpowiedź: A. Szczyt zachorowań na rumień nagły przypada na wiek 6-15 miesięcy, gdy zanikają ochronne przeciwciała matczyne IgG. Do 2.-3. roku życia niemal 100% dzieci ulega zakażeniu HHV-6."
    },
    {
      id: 8,
      q: "Jakie leczenie należy zastosować u niemowlęcia z rumieniem nagłym w fazie pojawienia się wysypki?",
      opts: [
        "A. Nie stosuje się żadnego leczenia farmakologicznego; choroba ustępuje samoistnie",
        "B. Gancyklowir dożylnie przez 14 dni",
        "C. Amoksycylinę z kwasem klawulanowym",
        "D. Prednizon doustnie",
        "E. Wankomycynę w ciągłym wlewie"
      ],
      options: [
        "A. Nie stosuje się żadnego leczenia farmakologicznego; choroba ustępuje samoistnie",
        "B. Gancyklowir dożylnie przez 14 dni",
        "C. Amoksycylinę z kwasem klawulanowym",
        "D. Prednizon doustnie",
        "E. Wankomycynę w ciągłym wlewie"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Prawidłowa odpowiedź: A. W fazie wysypkowej temperatura ciała jest prawidłowa, a dziecko czuje się dobrze. Osutka ustępuje samoistnie w ciągu 24-48 godzin bez pozostawienia śladu – nie wymaga żadnego leczenia.",
      expl: "Prawidłowa odpowiedź: A. W fazie wysypkowej temperatura ciała jest prawidłowa, a dziecko czuje się dobrze. Osutka ustępuje samoistnie w ciągu 24-48 godzin bez pozostawienia śladu – nie wymaga żadnego leczenia."
    },
    {
      id: 9,
      q: "Jak dochodzi do transmisji wirusa HHV-6 wywołującego rumień nagły u niemowląt?",
      opts: [
        "A. Głównie drogą kontaktu ze śliną bezobjawowych dorosłych domowników (nosicieli)",
        "B. Przez ukąszenia pluskiew domowych",
        "C. Drogą pokarmową przez surowe mięso wieprzowe",
        "D. Wyłącznie podczas transfuzji koncentratu krwinek płytkowych",
        "E. Przez kontakt ze zwierzętami gospodarskimi"
      ],
      options: [
        "A. Głównie drogą kontaktu ze śliną bezobjawowych dorosłych domowników (nosicieli)",
        "B. Przez ukąszenia pluskiew domowych",
        "C. Drogą pokarmową przez surowe mięso wieprzowe",
        "D. Wyłącznie podczas transfuzji koncentratu krwinek płytkowych",
        "E. Przez kontakt ze zwierzętami gospodarskimi"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Prawidłowa odpowiedź: A. Większość dorosłych okresowo wydala HHV-6 w ślinie; transmisja na niemowlę zachodzi przez bezpośredni kontakt ze śliną rodziców lub opiekunów.",
      expl: "Prawidłowa odpowiedź: A. Większość dorosłych okresowo wydala HHV-6 w ślinie; transmisja na niemowlę zachodzi przez bezpośredni kontakt ze śliną rodziców lub opiekunów."
    },
    {
      id: 10,
      q: "Czym skutkuje przebycie pierwotnego zakażenia wirusem HHV-6?",
      opts: [
        "A. Dożywotnią latencją wirusa w komórkach jednojądrzastych krwi i śliniankach",
        "B. Trwałym brakiem odporności i nawrotami rumienia nagłego co miesiąc",
        "C. Zawsze rozwojem stwardnienia rozsianego w wieku 10 lat",
        "D. Całkowitym usunięciem materiału genetycznego wirusa z organizmu",
        "E. Koniecznością usunięcia ślinianek przyusznych"
      ],
      options: [
        "A. Dożywotnią latencją wirusa w komórkach jednojądrzastych krwi i śliniankach",
        "B. Trwałym brakiem odporności i nawrotami rumienia nagłego co miesiąc",
        "C. Zawsze rozwojem stwardnienia rozsianego w wieku 10 lat",
        "D. Całkowitym usunięciem materiału genetycznego wirusa z organizmu",
        "E. Koniecznością usunięcia ślinianek przyusznych"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Prawidłowa odpowiedź: A. Podobnie jak inne herpeswirusy, HHV-6 po zakażeniu pierwotnym przechodzi w stan dożywotniej latencji (u ok. 1% populacji dochodzi nawet do integracji z telomerami chromosomów – ciHHV-6).",
      expl: "Prawidłowa odpowiedź: A. Podobnie jak inne herpeswirusy, HHV-6 po zakażeniu pierwotnym przechodzi w stan dożywotniej latencji (u ok. 1% populacji dochodzi nawet do integracji z telomerami chromosomów – ciHHV-6)."
    },
    {
      id: 11,
      q: "Czy po ustąpieniu wysypki w rumieniu nagłym dochodzi do łuszczenia skóry?",
      opts: [
        "A. Nie, wysypka ustępuje szybko i bez śladu, nie pozostawiając łuszczenia ani przebarwień",
        "B. Tak, dochodzi do grubopłatkowego łuszczenia dłoni i stóp jak w płonicy",
        "C. Dochodzi do powstawania głębokich blizn zanikowych",
        "D. Naskórek spełza płatami w zespole Lyella",
        "E. Na skórze pozostają trwałe ciemnobrunatne plamy soczewicowate"
      ],
      options: [
        "A. Nie, wysypka ustępuje szybko i bez śladu, nie pozostawiając łuszczenia ani przebarwień",
        "B. Tak, dochodzi do grubopłatkowego łuszczenia dłoni i stóp jak w płonicy",
        "C. Dochodzi do powstawania głębokich blizn zanikowych",
        "D. Naskórek spełza płatami w zespole Lyella",
        "E. Na skórze pozostają trwałe ciemnobrunatne plamy soczewicowate"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Prawidłowa odpowiedź: A. Wykwity w rumieniu nagłym znikają w ciągu 24-48 godzin bez pozostawienia jakichkolwiek śladów, łuszczenia czy przebarwień.",
      expl: "Prawidłowa odpowiedź: A. Wykwity w rumieniu nagłym znikają w ciągu 24-48 godzin bez pozostawienia jakichkolwiek śladów, łuszczenia czy przebarwień."
    }
  ],
  flashcards: [
    {
      front: "Jaka jest charakterystyczna sekwencja czasowa objawów w rumieniu nagłym?",
      back: "• 3-4 dni bardzo wysokiej gorączki (39-40°C) bez ogniska infekcji.<br>• Nagły, krytyczny spadek temperatury do normy.<br>• Natychmiastowy wysiew bladoróżowej, drobnoplamistej wysypki na tułowiu i szyi."
    },
    {
      front: "Jaki patogen wywołuje rumień nagły (gorączkę trzydniową)?",
      back: "• Ludzki herpeswirus typu 6 (HHV-6, wariant B).<br>• Rzadziej ludzki herpeswirus typu 7 (HHV-7).<br>• Wirus przenosi się ze śliną dorosłych nosicieli."
    },
    {
      front: "Co to są plamki Nagayamy w rumieniu nagłym?",
      back: "• Enanthema na błonie śluzowej języczka i podniebienia miękkiego.<br>• Mają postać drobnych rumieniowych grudek i owrzodzeń.<br>• Występują u ok. 30-50% chorych niemowląt."
    },
    {
      front: "Jakie jest najczęstsze powikłanie fazy gorączkowej rumienia nagłego?",
      back: "• Drgawki gorączkowe (u 10-15% chorych).<br>• HHV-6 jest najczęstszą wirusową przyczyną drgawek gorączkowych w 1. roku życia.<br>• Związane ze stromym narastaniem gorączki i neurotropizmem wirusa."
    },
    {
      front: "Gdzie lokalizuje się wysypka w rumieniu nagłym i jak ustępuje?",
      back: "• Lokalizacja: głównie tułów i szyja; twarz i kończyny są zazwyczaj wolne od zmian.<br>• Ustępowanie: znika w ciągu 24-48 godzin BEZ łuszczenia i BEZ przebarwień."
    },
    {
      front: "Jakie leczenie stosuje się w fazie wysypkowej rumienia nagłego?",
      back: "• BRAK leczenia farmakologicznego!<br>• Choroba jest samoograniczająca się.<br>• Dziecko czuje się dobrze, nie wymaga kwarantanny ani antybiotyków."
    }
  ]
};

async function main() {
  await saveCase(case116);
}
main();

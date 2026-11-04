const fs = require('fs');
const path = require('path');
const { encryptStringAes } = require('./encrypt_case.js');

const MASTER_KEY = '@LEKSzymon28111999';
const CASES_DIR = path.join(__dirname, '..', 'cases');

console.log("Saving Case 113: Mononukleoza zakaźna (EBV)...");

async function saveCase(caseData) {
  const filePath = path.join(CASES_DIR, caseData.filename);
  const jsonStr = JSON.stringify(caseData, null, 2);
  const encrypted = await encryptStringAes(jsonStr, MASTER_KEY);
  fs.writeFileSync(filePath, JSON.stringify(encrypted, null, 2), 'utf8');
  console.log(`[SAVED] Case #${caseData.id}: ${caseData.filename} (LEK Qs: ${caseData.lekQuestions.length}, Steps: ${caseData.steps.length}, Flashcards: ${caseData.flashcards.length})`);
}

const case113 = {
  id: 113,
  filename: "113_mononukleoza_ebv.json",
  dept: "Pediatria",
  shortTitle: "17-letni Michał – Ból gardła z nalotami, osutka po amoksycylinie i splenomegalia (Mononukleoza)",
  diagnosisTitle: "Mononukleoza zakaźna (Infectious Mononucleosis) wywołana przez wirus Epsteina-Barr (EBV / HHV-4) powikłana toksyczno-alergiczną osutką poampicylinową",
  vitals: [
    { label: "Temperatura ciała", val: "38,9°C", sub: "Gorączka septyczna od 8 dni", status: "vital-warn" },
    { label: "Akcja serca (HR)", val: "106/min", sub: "Miarowa tachykardia zatokowa", status: "vital-ok" },
    { label: "Częstość oddechów (RR)", val: "18/min", sub: "W normie, mowa 'kluskowata'", status: "vital-ok" },
    { label: "Ciśnienie tętnicze / SpO2", val: "118/74 mmHg | 98%", sub: "Prawidłowe wysycenie tlenem", status: "vital-ok" }
  ],
  vitalsObj: { hr: 106, bp: "118/74", spo2: 98, rr: 18, temp: 38.9, gcs: 15 },
  story: `<p><strong>Pacjent:</strong> 17-letni Michał, uczeń liceum, zgłosił się na izbę przyjęć szpitala zakaźnego z powodu utrzymującej się od ponad tygodnia wysokiej gorączki do 39,2°C, narastającego silnego bólu gardła z trudnością w przełykaniu śliny, znacznego powiększenia węzłów chłonnych szyi oraz nowo powstałej, swędzącej, zlewnej wysypki na całym ciele.</p><p><strong>Wywiad chorobowy:</strong> Początek dolegliwości 8 dni temu z narastającym osłabieniem, bólami mięśni i głowy. 4 dni temu lekarz POZ rozpoznał anginę ropną i wdrożył Amoksycylinę w dawce 1000 mg co 8 godzin. Po 48 godzinach od pierwszej dawki antybiotyku na skórze tułowia i twarzy pojawiła się intensywnie czerwona, plamisto-grudkowa wysypka, która szybko rozprzestrzeniła się na całe ciało. Ból gardła zamiast ustępować, znacznie się nasilił, pojawiły się trudności w połykaniu stałych pokarmów oraz chrapanie w nocy. Rodzina podaje, że chłopak ma dziewczynę, z którą często się spotyka (tzw. choroba pocałunków / kissing disease).</p><p><strong>Badanie przedmiotowe na SOR:</strong> Nastolatek blady, z cechami umiarkowanego odwodnienia, mówi z charakterystycznym 'kluskowatym' zabarwieniem głosu (hot potato voice). Obrzęk powiek i nasady nosa (objaw Glanzmana). W jamie ustnej: błona śluzowa gardła przekrwiona, łuki podniebienne obrzęknięte. Migdałki podniebienne olbrzymie, niemal stykające się w linii pośrodkowej ('kissing tonsils'), pokryte grubym, mazistym, szarobiałym nalotem włóknikowo-ropnym w kryptach o mdławym, stęchłym zapachu. Wybroczyny na granicy podniebienia twardego i miękkiego. Węzły chłonne szyjne przednie, tylne (wzdłuż mięśnia MOS) oraz kąta żuchwy masywnie powiększone (pakiety do 3-4 cm), twarde, bolesne przy palpacji; wyczuwalne również powiększone węzły pachowe i pachwinowe. Na skórze twarzy, tułowia i kończyn obecna uogólniona, polimorficzna osutka plamisto-grudkowa o charakterze odropodobnym, zlewająca się na ramionach i klatce piersiowej. W badaniu brzucha: śledziona wyczuwalna 3 cm poniżej lewego łuku żebrowego, miękka, wrażliwa na dotyk (splenomegalia); wątroba powiększona 2 cm poniżej łuku żebrowego. Objawy oponowe ujemne.</p>`,
  labs: {
    "Morfologia krwi obwodowej i rozmaz manualny": [
      { name: "Leukocyty (WBC)", val: "15,4 G/L", norm: "4,0 - 10,0 G/L", flag: "HIGH" },
      { name: "Limfocyty ogółem", val: "68%", norm: "20 - 45%", flag: "CRIT_HIGH" },
      { name: "Atypowe limfocyty (komórki Downeya)", val: "24%", norm: "0 - 5% (norma <10%)", flag: "CRIT_HIGH" },
      { name: "Neutrofile", val: "22%", norm: "45 - 70%", flag: "LOW" },
      { name: "Hemoglobina (Hb)", val: "13,9 g/dl", norm: "13,0 - 17,5 g/dl", flag: "NORMAL" },
      { name: "Płytki krwi (PLT)", val: "128 G/L", norm: "150 - 400 G/L", flag: "LOW" }
    ],
    "Biochemia i próby wątrobowe": [
      { name: "Aminotransferaza ALT", val: "168 IU/l", norm: "< 45 IU/l", flag: "HIGH" },
      { name: "Aminotransferaza AST", val: "132 IU/l", norm: "< 40 IU/l", flag: "HIGH" },
      { name: "Bilirubina całkowita", val: "1,4 mg/dl", norm: "0,2 - 1,2 mg/dl", flag: "HIGH" },
      { name: "CRP", val: "28 mg/l", norm: "< 5,0 mg/l", flag: "HIGH" }
    ],
    "Diagnostyka serologiczna EBV": [
      { name: "Przeciwciała heterofilne (odczyn Paula-Bunnella-Davidsohna / Monospot)", val: "DODATNI (+)", norm: "Ujemny", flag: "CRIT_HIGH" },
      { name: "Anty-VCA IgM (antygen kapsydowy wirusa)", val: "DODATNI (+) [miano wysokie]", norm: "Ujemny", flag: "CRIT_HIGH" },
      { name: "Anty-VCA IgG", val: "DODATNI (+)", norm: "Ujemny", flag: "HIGH" },
      { name: "Anty-EBNA (antygen jądrowy wirusa)", val: "UJEMNY (-)", norm: "Ujemny w ostrej fazie", flag: "NORMAL" }
    ]
  },
  steps: [
    {
      stepNum: 1,
      title: "Krok 1: Rozpoznanie triady mononukleozowej i wywiadu klinicznego",
      desc: "17-letni Michał zgłasza się z przedłużającą się gorączką, masywnym zapaleniem gardła z szarobiałymi nalotami na migdałkach, obustronnym powiększeniem węzłów chłonnych szyjnych tylnych oraz powiększeniem śledziony i wątroby. Jaka triada objawów tworzy klasyczny zespół mononukleozowy?",
      scenario: "17-letni Michał zgłasza się z przedłużającą się gorączką, masywnym zapaleniem gardła z szarobiałymi nalotami na migdałkach, obustronnym powiększeniem węzłów chłonnych szyjnych tylnych oraz powiększeniem śledziony i wątroby. Jaka triada objawów tworzy klasyczny zespół mononukleozowy?",
      options: [
        {
          text: "Wysoka gorączka, ostre zapalenie gardła i migdałków podniebiennych z nalotami oraz uogólnione powiększenie węzłów chłonnych (limfadenopatia, szczególnie szyjnych tylnych)",
          correct: true,
          isCorrect: true,
          feedback: "✅ PRAWIDŁOWO! <strong>Klasyczna triada mononukleozowa!</strong> Mononukleoza zakaźna (gorączka gruczołowa / kissing disease) wywołana przez EBV manifestuje się triadą: 1. Gorączka (często >38,5-39°C trwająca 1-2 tyg.), 2. Zapalenie gardła z obrzękiem i grubymi szarobiałymi nalotami na migdałkach, 3. Symetryczna limfadenopatia (zwłaszcza węzły szyjne tylne, karkowe i kąta żuchwy). U >50% chorych dołącza splenomegalia, a u 30-50% hepatomegalia."
        },
        {
          text: "Kaszel, katar i zapalenie spojówek ze światłowstrętem",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>To triada nieżytowa odry (morbilli)!</strong>"
        },
        {
          text: "Ból głowy, sztywność karku i wybroczyny na kończynach dolnych",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>To objawy inwazyjnej choroby meningokokowej!</strong>"
        },
        {
          text: "Biegunka tłuszczowa, bębnica brzuszna i atrofia pośladków",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>To triada zespołu złego wchłaniania w celiakii!</strong>"
        }
      ]
    },
    {
      stepNum: 2,
      title: "Krok 2: Mechanizm i znaczenie wysypki po amoksycylinie",
      desc: "U Michała po 48 godzinach od podania amoksycyliny wystąpiła zlewna, swędząca osutka plamisto-grudkowa. Rodzice pytają, czy syn jest do końca życia uczulony na penicyliny. Jak brzmi prawidłowe wyjaśnienie tego zjawiska?",
      scenario: "U Michała po 48 godzinach od podania amoksycyliny wystąpiła zlewna, swędząca osutka plamisto-grudkowa. Rodzice pytają, czy syn jest do końca życia uczulony na penicyliny. Jak brzmi prawidłowe wyjaśnienie tego zjawiska?",
      options: [
        {
          text: "Wysypka po ampicylinie/amoksycylinie występuje u 80-90% chorych z mononukleozą EBV i jest przejściową, immunologiczną reakcją nadwrażliwości indukowaną obecnością wirusa; NIE oznacza trwałej alergii IgE-zależnej na penicyliny i nie stanowi bezwzględnego przeciwwskazania do ich stosowania w przyszłości",
          correct: true,
          isCorrect: true,
          feedback: "✅ PRAWIDŁOWO! <strong>Złota zasada zakażeń i częsty błąd diagnostyczny!</strong> Zjawisko to (tzw. osutka poaminopenicylinowa) wynika z poliklonalnej aktywacji limfocytów B przez EBV oraz przejściowej nadreaktywności limfocytów T na antygeny aminopenicylin. Nie jest to klasyczna reakcja anafilaktyczna IgE-zależna. Po wyzdrowieniu z mononukleozy większość pacjentów może bezpiecznie przyjmować penicyliny bez ryzyka nawrotu wysypki."
        },
        {
          text: "Wysypka dowodzi wstrząsu anafilaktycznego IV stopnia i oznacza bezwzględny zakaz wszystkich antybiotyków na zawsze",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Osutka plamisto-grudkowa po 48h to nie wstrząs anafilaktyczny!</strong> Anafilaksja rozwija się w ciągu kilku minut i przebiega z hipotensją i obturacją dróg oddechowych."
        },
        {
          text: "Wysypka powstała, ponieważ amoksycylina zmutowała wirusa EBV w wirusa ospy prawdziwej",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Absurd biologiczny.</strong>"
        },
        {
          text: "Antybiotyk natychmiast wyleczył mononukleozę, a wysypka to oznaka całkowitej odporności",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Amoksycylina nie działa na wirusy!</strong> Jej podanie było błędem sztuki w infekcji wirusowej."
        }
      ]
    },
    {
      stepNum: 3,
      title: "Krok 3: Analiza rozmazu krwi obwodowej – komórki Downeya",
      desc: "W rozmazie krwi manualnym stwierdzono 24% 'atypowych limfocytów'. Czym z punktu widzenia immunologii są te komórki i jaka jest ich funkcja?",
      scenario: "W rozmazie krwi manualnym stwierdzono 24% 'atypowych limfocytów'. Czym z punktu widzenia immunologii są te komórki i jaka jest ich funkcja?",
      options: [
        {
          text: "Są to pobudzone limfocyty T cytotoksyczne (CD8+) oraz komórki NK (tzw. komórki Downeya), które reagują na zakażone przez EBV limfocyty B i niszczą je; ich obecność w odsetku >10% jest silną wskazówką mononukleozy",
          correct: true,
          isCorrect: true,
          feedback: "✅ PRAWIDŁOWO! <strong>Fizjologia i hematologia zakażeń EBV!</strong> Wirus EBV infekuje limfocyty B poprzez receptor CD21 (CR2). W odpowiedzi na to organizm mobilizuje olbrzymią liczbę limfocytów T cytotoksycznych (CD8+), które ulegają aktywacji blastycznej – stają się duże, mają obfitą, zasadochłonną cytoplazmę 'opływającą' sąsiednie erytrocyty. To właśnie te pobudzone limfocyty CD8+ są opisywane w rozmazie jako 'atypowe limfocyty' (komórki Downeya)."
        },
        {
          text: "Są to komórki nowotworowe ostrej białaczki szpikowej naciekające krew obwodową",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>To odczynowe limfocyty T, a nie blasty białaczkowe!</strong> W białaczce obserwuje się blasty o wysokim indeksie jądrowo-cytoplazmatycznym z zatrzymaniem dojrzewania."
        },
        {
          text: "Są to dojrzałe erytrocyty, które utraciły hemoglobinę pod wpływem wirusa",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>To komórki linii białokrwinkowej (limfocyty).</strong>"
        },
        {
          text: "Są to neutrofile pochłaniające kompleksy penicylinowe",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>W mononukleozie obserwuje się neutropenię ze względną i bezwzględną limfocytozą!</strong>"
        }
      ]
    },
    {
      stepNum: 4,
      title: "Krok 4: Interpretacja serologii EBV – faza ostra vs przebyte zakażenie",
      desc: "Otrzymujesz wyniki panelu serologicznego EBV: Anty-VCA IgM (+), Anty-VCA IgG (+), Anty-EBNA (-). Jak zinterpretujesz ten profil przeciwciał?",
      scenario: "Otrzymujesz wyniki panelu serologicznego EBV: Anty-VCA IgM (+), Anty-VCA IgG (+), Anty-EBNA (-). Jak zinterpretujesz ten profil przeciwciał?",
      options: [
        {
          text: "Świeże, ostre pierwotne zakażenie wirusem EBV (obecność anty-VCA IgM przy jednoczesnej nieobecności anty-EBNA, które pojawiają się dopiero po 6-8 tygodniach od zakażenia)",
          correct: true,
          isCorrect: true,
          feedback: "✅ PRAWIDŁOWO! <strong>Pewniak egzaminacyjny z serologii wirusowej!</strong> Przeciwciała przeciw antygenowi kapsydowemu w klasie IgM (anty-VCA IgM) pojawiają się wcześnie i zanikają po 2-3 miesiącach – są markerem świeżej infekcji. Anty-EBNA (przeciw antygenowi jądrowemu) syntetyzowane są późno, dopiero po 6-8 tygodniach (a nawet kilku miesiącach) od zachorowania i utrzymują się do końca życia. Brak anty-EBNA przy dodatnich VCA IgM jednoznacznie potwierdza ostrą fazę choroby!"
        },
        {
          text: "Przebyte w przeszłości zakażenie EBV w stanie pełnej latencji bez cech ostrej infekcji",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Przebyte zakażenie cechuje się obecnością anty-EBNA (+) i anty-VCA IgG (+) przy ujemnych anty-VCA IgM (-)!</strong>"
        },
        {
          text: "Fałszywie dodatni wynik wywołany zakażeniem rotawirusem",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>To swoisty profil serologiczny EBV.</strong>"
        },
        {
          text: "Wrodzony brak odporności humoralnej i brak zdolności do wytwarzania przeciwciał",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Obecność przeciwciał IgM i IgG świadczy o sprawnej odpowiedzi humoralnej!</strong>"
        }
      ]
    },
    {
      stepNum: 5,
      title: "Krok 5: Splenomegalia i krytyczne zalecenie dotyczące aktywności fizycznej",
      desc: "U Michała śledziona wystaje 3 cm poniżej łuku żebrowego i jest tkliwa. Jakie jest najgroźniejsze powikłanie narządowe mononukleozy i jakie bezwzględne zalecenie musisz wydać pacjentowi przy wypisie?",
      scenario: "U Michała śledziona wystaje 3 cm poniżej łuku żebrowego i jest tkliwa. Jakie jest najgroźniejsze powikłanie narządowe mononukleozy i jakie bezwzględne zalecenie musisz wydać pacjentowi przy wypisie?",
      options: [
        {
          text: "Pęknięcie śledziony (spontaniczne lub pod wpływem mikrourazu); bezwzględny zakaz uprawiania sportów kontaktowych, podnoszenia ciężarów i intensywnego wysiłku fizycznego przez co najmniej 3-4 tygodnie (lub do czasu normalizacji wielkości śledziony w USG)",
          correct: true,
          isCorrect: true,
          feedback: "✅ PRAWIDŁOWO! <strong>Życiowo ważne zalecenie i stałe pytanie LEK!</strong> W przebiegu mononukleozy dochodzi do masywnego nacieczenia miazgi śledziony przez pobudzone limfocyty. Torebka śledziony ulega znacznemu napięciu i ścieńczeniu, co grozi jej pęknięciem (najczęściej w 2.-3. tygodniu choroby). Pęknięcie śledziony przebiega z krwawieniem do jamy otrzewnej, wstrząsem hipowolemicznym i może być śmiertelne! Dlatego bezwzględny zakaz sportów kontaktowych i dźwigania przez minimum 3-4 tygodnie to obowiązek każdego lekarza."
        },
        {
          text: "Natychmiastowe skierowanie na planową splenektomię w celu uniknięcia pęknięcia",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Splenektomia profilaktyczna jest błędem sztuki!</strong> Śledziona ulega samoistnej inwolucji w miarę wygasania zakażenia."
        },
        {
          text: "Zalecenie codziennych intensywnych zapasów i boksu w celu wzmocnienia mięśni brzucha",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD KRYTYCZNY! <strong>Sporty kontaktowe niosą bezpośrednie ryzyko śmiertelnego pęknięcia śledziony!</strong>"
        },
        {
          text: "Nakaz leżenia w łóżku bez ruchu przez kolejne 5 lat",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Nieuzasadniony rygor; wystarczy unikanie urazów brzucha i sportów przez 3-4 tygodnie.</strong>"
        }
      ]
    },
    {
      stepNum: 6,
      title: "Krok 6: Wskazania do zastosowania glikokortykosteroidów w mononukleozie",
      desc: "Mama Michała pyta, czy syn powinien otrzymać sterydy (np. Deksametazon lub Prednizon), aby szybciej zmniejszyć migdałki. W jakich ściśle określonych sytuacjach klinicznych dopuszcza się podanie GKS w przebiegu mononukleozy?",
      scenario: "Mama Michała pyta, czy syn powinien otrzymać sterydy (np. Deksametazon lub Prednizon), aby szybciej zmniejszyć migdałki. W jakich ściśle określonych sytuacjach klinicznych dopuszcza się podanie GKS w przebiegu mononukleozy?",
      options: [
        {
          text: "Sterydy są zarezerwowane wyłącznie dla stanów zagrażających powikłaniami: ostrej obturacji dróg oddechowych przez olbrzymie migdałki, ciężkich powikłań hematologicznych (autoimmunohemolityczna niedokrwistość AIHA, małopłytkowość immunologiczna <20-50 G/L) oraz powikłań neurologicznych (zapalenie mózgu, polineuropatia)",
          correct: true,
          isCorrect: true,
          feedback: "✅ PRAWIDŁOWO! <strong>Bardzo ważne wytyczne kliniczne!</strong> GKS nie są rutynowo zalecane w niepowikłanej mononukleozie (hamują naturalną odpowiedź komórkową gospodarza i sprzyjają latencji wirusa). Wskazania do krótkiego kursu GKS (np. Prednizon 1 mg/kg m.c. przez 4-7 dni z szybką redukcją) obejmują: 1. Krytyczne zwężenie cieśni gardła i dróg oddechowych (stridor, duszność), 2. Ciężką małopłytkowość lub niedokrwistość hemolityczną, 3. Powikłania neurologiczne i kardiologiczne (zapalenie mięśnia sercowego)."
        },
        {
          text: "GKS podaje się każdemu choremu z mononukleozą dożylnie przez minimum 6 miesięcy",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Przewlekła sterydoterapia wywołałaby ciężkie powikłania jatrogenne</strong> (zespół Cushinga, immunosupresję)."
        },
        {
          text: "Glikokortykosteroidy są absolutnie zakazane pod rygorem odpowiedzialności karnej w każdym przypadku",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>W obturacji dróg oddechowych sterydy ratują życie</strong> zapobiegając intubacji i tracheotomii."
        },
        {
          text: "GKS stosuje się wyłącznie w celu wybielenia nalotu na języku",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Wskazania kosmetyczne nie istnieją w intensywnej terapii zakażeń.</strong>"
        }
      ]
    },
    {
      stepNum: 7,
      title: "Krok 7: Ocena roli leków przeciwwirusowych (Acyklowir/Gancyklowir)",
      desc: "Lekarz stażysta proponuje włączenie Acyklowiru doustnie w dawce 5x800 mg na 7 dni w celu eradykacji wirusa EBV. Jakie jest stanowisko towarzystw naukowych wobec takiego postępowania?",
      scenario: "Lekarz stażysta proponuje włączenie Acyklowiru doustnie w dawce 5x800 mg na 7 dni w celu eradykacji wirusa EBV. Jakie jest stanowisko towarzystw naukowych wobec takiego postępowania?",
      options: [
        {
          text: "Leki przeciwwirusowe (Acyklowir, Walacyklowir) NIE są zalecane w leczeniu mononukleozy zakaźnej; hamują wprawdzie wydalanie wirusa w ślinie podczas ich przyjmowania, ale nie wpływają na czas trwania gorączki, nasilenie bólu gardła, wielkość migdałków ani na rezerwuar wirusa w limfocytach B",
          correct: true,
          isCorrect: true,
          feedback: "✅ PRAWIDŁOWO! <strong>EBM w praktyce klinicznej!</strong> Badania kliniczne z randomizacją wykazały, że acyklowir nie przynosi żadnych istotnych korzyści klinicznych u chorych na mononukleozę zakaźną. Po odstawieniu leku wydalanie wirusa w jamie ustnej powraca do poziomu wyjściowego. Leczenie opiera się wyłącznie na postępowaniu objawowym (odpoczynek, nawodnienie, paracetamol/ibuprofen)."
        },
        {
          text: "Acyklowir jest bezwzględnie konieczny i całkowicie usuwa wirusa EBV z organizmu w ciągu 24 godzin",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Wirus EBV po zakażeniu pierwotnym pozostaje w stanie dożywotniej latencji w limfocytach B gospodarza!</strong> Żaden lek nie usuwa go z organizmu."
        },
        {
          text: "Acyklowir powoduje natychmiastową transformację nowotworową limfocytów B",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Lek nie wykazuje działania mutagennego ani onkogennego.</strong>"
        },
        {
          text: "Należy zastosować Oseltamiwir w podwójnej dawce",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Oseltamiwir to inhibitor neuraminidazy wirusa grypy</strong>, całkowicie nieaktywny wobec wirusów Herpes."
        }
      ]
    },
    {
      stepNum: 8,
      title: "Krok 8: Długofalowe następstwa zakażenia EBV i onkogeneza",
      desc: "Z jakimi nowotworami złośliwymi i chorobami limfoproliferacyjnymi udokumentowano bezpośredni związek przyczynowo-skutkowy przebytego zakażenia wirusem Epsteina-Barr (EBV)?",
      scenario: "Z jakimi nowotworami złośliwymi i chorobami limfoproliferacyjnymi udokumentowano bezpośredni związek przyczynowo-skutkowy przebytego zakażenia wirusem Epsteina-Barr (EBV)?",
      options: [
        {
          text: "Chłoniak Burkitta (postać endemiczna w Afryce), rak nosogardła (nasopharyngeal carcinoma – NPC), chłoniak Hodgkina (ziarnica złośliwa) oraz potransplantacyjna choroba limfoproliferacyjna (PTLD)",
          correct: true,
          isCorrect: true,
          feedback: "✅ PRAWIDŁOWO! <strong>Klasyczny fakt onkologii i wirusologii!</strong> EBV był pierwszym opisanym u ludzi wirusem onkogennym (odkrytym w komórkach chłoniaka Burkitta w 1964 r.). Białka utajenia wirusa (LMP-1, EBNA-2) stymulują proliferację limfocytów B i hamują apoptozę. EBV wiąże się etiologicznie z chłoniakiem Burkitta, rakiem jamy nosowo-gardłowej (NPC), podtypami chłoniaka Hodgkina, chłoniakami u pacjentów z HIV oraz PTLD u biorców przeszczepów."
        },
        {
          text: "Rak drobnokomórkowy płuca i czerniak złośliwy skóry",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Rak drobnokomórkowy zależy od dymu tytoniowego, a czerniak od promieniowania UV.</strong>"
        },
        {
          text: "Glejak wielopostaciowy (glioblastoma) i potworniak jajnika",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Nowotwory te nie mają związku z EBV.</strong>"
        },
        {
          text: "Rak jasnokomórkowy nerki i rak pęcherza moczowego",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Rak nerki związany jest m.in. z mutacjami genu VHL, a nie z wirusem EBV.</strong>"
        }
      ]
    }
  ],
  pathoNodes: [
    {
      badge: "OGNIWO 1 • Tropizm do nabłonka gardła i limfocytów B (CD21)",
      title: "Transmisja ze śliną, wnikanie przez receptor CR2 (CD21) i immortalizacja limfocytów B",
      short: "Wirus EBV wnika ze śliną, zakaża komórki nabłonkowe nosogardła i limfocyty B.",
      detail: "Wirus Epsteina-Barr (EBV / Human Herpesvirus 4 – HHV-4) przenosi się drogą kropelkową i przez kontakt bezpośredni ze śliną chorego lub bezobjawowego nosiciela ('choroba pocałunków'). Glikoproteina gp350/220 otoczki wirusa wiąże się z receptorem dopełniacza CR2 (CD21) obecnym na spoczynkowych limfocytach B w tkance limfatycznej gardła (migdałkach). Wirus przenika do wnętrza komórki i transportuje swoje DNA do jądra komórkowego, gdzie przyjmuje formę kolistego plazmidu (episomu). Ekspresja wirusowych genów latencji (LMP-1, LMP-2, EBNA-1, EBNA-2) stymuluje limfocyty B do niekontrolowanej proliferacji, syntezy przeciwciał i unikania apoptozy (immortalizacja limfocytów B).",
      target: "Terapia objawowa w fazie replikacji: odpoczynek w łóżku, nawodnienie dożylne <span class='dose-pill'>Płyn wieloelektrolitowy (PWE) 1500–2000 ml/dobę i.v.</span>; brak wskazań do acyklowiru.",
      desc: "Transmisja ze śliną, wnikanie przez receptor CR2 (CD21) i immortalizacja limfocytów B.",
      drugTarget: "Terapia objawowa w fazie replikacji: odpoczynek w łóżku, nawodnienie dożylne <span class='dose-pill'>Płyn wieloelektrolitowy (PWE) 1500–2000 ml/dobę i.v.</span>; brak wskazań do acyklowiru."
    },
    {
      badge: "OGNIWO 2 • Odpowiedź cytotoksyczna CD8+ i komórki Downeya",
      title: "Masywna mobilizacja limfocytów T CD8+, limfocytoza i uszkodzenie wątroby",
      short: "Organizm mobilizuje armię limfocytów T cytotoksycznych (komórki Downeya), by niszczyć zakażone komórki B.",
      detail: "Gospodarz odpowiada potężną, swoistą odpowiedzią komórkową. Limfocyty T cytotoksyczne (CD8+) oraz komórki NK rozpoznają wirusowe antygeny EBNA i LMP na zakażonych limfocytach B, ulegając gwałtownej stymulacji klonalnej. W krwi obwodowej pojawia się masywna leukocytoza z przewagą limfocytów (>50%) oraz obecnością odczynowych, wielopostaciowych limfocytów atypowych (komórek Downeya) stanowiących >10-20% rozmazu. Nacieczenie miąższu wątroby przez pobudzone limfocyty cytotoksyczne wywołuje przejściowe, bezżółtaczkowe zapalenie wątroby ze wzrostem aktywności ALT i AST u 80-90% chorych.",
      target: "Leczenie przeciwbólowe i hepatoprotekcyjne: <span class='dose-pill'>Paracetamol 500-1000 mg p.o.</span> co 6-8 h (ostrożnie przy wysokim ALT) lub <span class='dose-pill'>Ibuprofen 400 mg p.o.</span> co 8 h; monitorowanie aminotransferaz.",
      desc: "Masywna mobilizacja limfocytów T CD8+, limfocytoza i uszkodzenie wątroby.",
      drugTarget: "Leczenie przeciwbólowe i hepatoprotekcyjne: <span class='dose-pill'>Paracetamol 500-1000 mg p.o.</span> co 6-8 h (ostrożnie przy wysokim ALT) lub <span class='dose-pill'>Ibuprofen 400 mg p.o.</span> co 8 h; monitorowanie aminotransferaz."
    },
    {
      badge: "OGNIWO 3 • Naciekanie narządów i ryzyko pęknięcia śledziony",
      title: "Hiperplazja miazgi czerwonej śledziony, ścieńczenie torebki i wstrząs krwotoczny",
      short: "Masywny naciek limfocytarny rozciąga torebkę śledziony, stwarzając ryzyko zagrażającego życiu pęknięcia.",
      detail: "Intensywna akumulacja pobudzonych limfocytów T i komórek B w układzie siateczkowo-śródbłonkowym prowadzi do uogólnionego powiększenia węzłów chłonnych (limfadenopatii) oraz obrzęku śledziony (splenomegalii). Miazga czerwona i zatoki śledziony ulegają przekrwieniu i gwałtownemu powiększeniu objętościowemu. Torebka narządu ulega znacznemu napięciu, ścieńczeniu i utracie elastyczności. W 2.-3. tygodniu choroby nawet minimalny mikrouraz powłok brzusznych, napięcie tłoczni brzusznej (kaszel, defekacja) lub proces spontaniczny mogą doprowadzić do pęknięcia torebki i masywnego krwotoku do jamy otrzewnej.",
      target: "Profilaktyka pęknięcia narządu: <span class='dose-pill'>bezwzględny zakaz sportów i dźwigania przez 4 tygodnie</span>; w razie pęknięcia pilna laparotomia ratunkowa i <span class='dose-pill'>splenorafia lub splenektomia</span>.",
      desc: "Hiperplazja miazgi czerwonej śledziony, ścieńczenie torebki i wstrząs krwotoczny.",
      drugTarget: "Profilaktyka pęknięcia narządu: <span class='dose-pill'>bezwzględny zakaz sportów i dźwigania przez 4 tygodnie</span>; w razie pęknięcia pilna laparotomia ratunkowa i <span class='dose-pill'>splenorafia lub splenektomia</span>."
    },
    {
      badge: "OGNIWO 4 • Reakcja immunologiczna po amoksycylinie",
      title: "Interakcja aminopenicylin z pobudzonym układem immunologicznym i osutka",
      short: "Poliklonalna stymulacja limfocytów B i T indukuje nadwrażliwość na antybiotyki aminopenicylinowe.",
      detail: "Pod wpływem EBV dochodzi do poliklonalnej, nieswoistej aktywacji układu odpornościowego i produkcji przeciwciał heterofilnych oraz autoprzeciwciał. Podanie amoksycyliny lub ampicyliny w tym okresie prowadzi do powstania kompleksów lek-białko, które są rozpoznawane przez nadreaktywne limfocyty T jako silny bodziec antygenowy. Dochodzi do uwolnienia cytokin prozapalnych i gwałtownej reakcji późnej nadwrażliwości w skórze właściwej. Manifestuje się to u 80-90% pacjentów zlewającą się osutką plamisto-grudkową w 7.-10. dobie leczenia lub po 48 h od pierwszej dawki. Reakcja ta nie ma charakteru IgE-zależnego.",
      target: "Postępowanie: <span class='dose-pill'>natychmiastowe odstawienie Amoksycyliny</span>; leki przeciwhistaminowe: <span class='dose-pill'>Cetyryzyna 10 mg p.o.</span> raz na dobę; kremy łagodzące.",
      desc: "Interakcja aminopenicylin z pobudzonym układem immunologicznym i osutka.",
      drugTarget: "Postępowanie: <span class='dose-pill'>natychmiastowe odstawienie Amoksycyliny</span>; leki przeciwhistaminowe: <span class='dose-pill'>Cetyryzyna 10 mg p.o.</span> raz na dobę; kremy łagodzące."
    }
  ],
  diffTable: {
    title: "⚔️ Tabela Różnicowa: Mononukleoza zakaźna (EBV) vs Angina paciorkowcowa (GAS) vs Ostra choroba retrowirusowa (HIV) vs Zakażenie CMV",
    headers: ["Cecha kliniczna", "Mononukleoza (EBV)", "Angina paciorkowcowa (GAS)", "Ostra choroba retrowirusowa (HIV)", "Zakażenie CMV (zespół mononukleozopodobny)"],
    rows: [
      ["Etiologia", "Epstein-Barr Virus (EBV / HHV-4)", "Streptococcus pyogenes (GAS)", "Ludzki wirus niedoboru odporności (HIV-1)", "Cytomegalovirus (CMV / HHV-5)"],
      ["Zmiany w gardle", "Olbrzymie migdałki z grubym szarobiałym nalotem, kissing tonsils", "Płomienne gardło, ropne czopy w kryptach migdałków", "Zapalenie gardła bez nalotów, bolesne owrzodzenia śluzówek", "Zapalenie gardła łagodne, rzadko obecne naloty"],
      ["Limfadenopatia", "Uogólniona, symetryczna, głównie szyjna tylna i karkowa", "Ograniczona: szyjna przednia i podżuchwowa, bolesna", "Uogólniona, niebolesna limfadenopatia", "Miernie nasilona lub nieobecna"],
      ["Powiększenie śledziony", "Bardzo częste (>50%), ryzyko pęknięcia!", "Nie występuje", "Obecne u ok. 10-20% chorych", "Częste (splenomegalia), łagodny przebieg"],
      ["Morfologia krwi", "Leukocytoza z limfocytozą >50%, atypowe limfocyty >10%", "Leukocytoza z neutrofilią i odmłodzeniem obrazu (pałeczki)", "Leukopenia z limfopenią, małopłytkowość", "Limfocytoza z obecnością atypowych limfocytów"],
      ["Reakcja na amoksycylinę", "Osutka plamisto-grudkowa u 80-90% leczonych", "Prawidłowa odpowiedź lecznicza (eradykacja)", "Możliwa nieswoista osutka polekowa", "Możliwa osutka poampicylinowa (rzadziej niż w EBV)"],
      ["Testy serologiczne", "Przeciwciała heterofilne (+), anty-VCA IgM (+), anty-EBNA (-)", "Szybki test antygenowy PBHA (Streptest) (+)", "Test combo HIV Ag/Ab (antygen p24 + przeciwciała)", "Ujemne przeciwciała heterofilne; anty-CMV IgM (+)"],
      ["Leczenie przyczynowe", "Objawowe (odpoczynek, zakaz sportu; GKS w obturacji)", "Penicylina V doustnie przez 10 dni", "Pilne wdrożenie terapii cART (leki antyretrowirusowe)", "Objawowe; Gancyklowir w ciężkich powikłaniach u immunosupresyjnych"]
    ]
  },
  dutySummary: {
    overview: "Mononukleoza zakaźna jest ostrą chorobą limfoproliferacyjną wywołaną przez wirus Epsteina-Barr (EBV). Charakteryzuje się klasyczną triadą: gorączką, masywnym zapaleniem gardła z szarobiałymi nalotami na migdałkach oraz symetryczną limfadenopatią (zwłaszcza węzłów karkowych i szyjnych tylnych). U ponad połowy chorych występuje splenomegalia stwarzająca ryzyko pęknięcia śledziony. Nieuzasadnione podanie amoksycyliny indukuje u 80-90% pacjentów charakterystyczną odropodobną osutkę.",
    diagnostics: "1. Morfologia z rozmazem krwi obwodowej: leukocytoza z limfocytozą >50% oraz obecnością atypowych limfocytów (komórek Downeya) >10%.<br>2. Próby wątrobowe: podwyższenie aktywności aminotransferaz ALT i AST (u 80-90% chorych).<br>3. Przeciwciała heterofilne (odczyn Paula-Bunnella-Davidsohna / szybki test lateksowy Monospot).<br>4. Serologia swoista EBV: w ostrej fazie obecne przeciwciała anty-VCA IgM oraz anty-VCA IgG przy braku przeciwciał anty-EBNA (które pojawiają się dopiero po 6-8 tygodniach).<br>5. USG jamy brzusznej w celu oceny wielkości śledziony i wątroby.",
    drugsAndDoses: "1. Leczenie objawowe I rzutu: <span class='dose-pill'>Paracetamol 500-1000 mg p.o.</span> co 6-8 h lub <span class='dose-pill'>Ibuprofen 400 mg p.o.</span> co 8 h; intensywne nawodnienie doustne lub dożylne.<br>2. Natychmiastowe odstawienie amoksycyliny/ampicyliny.<br>3. W razie świądu po osutce polekowej: <span class='dose-pill'>Cetyryzyna 10 mg p.o.</span> raz na dobę lub <span class='dose-pill'>Klemastyna 1 mg p.o.</span> co 12 h.<br>4. Wskazania do GKS (wyłącznie w ciężkiej obturacji dróg oddechowych, małopłytkowości <20 G/L, anemii hemolitycznej): <span class='dose-pill'>Prednizon 1 mg/kg m.c./dobę p.o. (max. 60 mg)</span> przez <span class='dose-pill'>4-7 dni</span> ze stopniową redukcją dawki lub <span class='dose-pill'>Deksametazon 8-16 mg i.v.</span> w stanach naglących.<br>5. Leki przeciwwirusowe (Acyklowir) NIE są zalecane w monoterapii.",
    procedures: "1. Bezwzględny zakaz uprawiania sportów kontaktowych, podnoszenia ciężarów i wysiłku fizycznego przez co najmniej 3-4 tygodnie z uwagi na ryzyko pęknięcia śledziony.<br>2. Prawidłowe pobranie rozmazu manualnego krwi obwodowej.<br>3. Zapewnienie drożności dróg oddechowych w przypadku 'kissing tonsils' (pozycja półsiedząca, tlenoterapia, przygotowanie do ewentualnej intubacji).<br>4. Ochrona przed wtórnymi infekcjami bakteryjnymi.",
    monitoring: "1. Codzienna kontrola drożności dróg oddechowych (obserwacja pod kątem stridoru krtaniowego, bezdechów sennych i duszności).<br>2. Monitorowanie parametrów życiowych pod kątem wstrząsu hipowolemicznego (nagły ból w lewym podżebrzu, bladość, tachykardia, hipotensja = natychmiastowe podejrzenie pęknięcia śledziony!).<br>3. Okresowa kontrola prób wątrobowych (ALT, AST, bilirubina) do czasu ich pełnej normalizacji.<br>4. Kontrolne badanie USG śledziony przed dopuszczeniem pacjenta do wyczynowego sportu."
  },
  lekQuestions: [
    {
      id: 1,
      q: "Który z poniższych zestawów objawów klinicznych stanowi tzw. klasyczną triadę mononukleozową w przebiegu pierwotnego zakażenia wirusem Epsteina-Barr (EBV)?",
      opts: [
        "A. Gorączka, zapalenie gardła i migdałków z nalotami oraz uogólnione powiększenie węzłów chłonnych",
        "B. Kaszel, katar i zapalenie spojówek ze światłowstrętem",
        "C. Biegunka, wymioty i obniżenie napięcia mięśniowego",
        "D. Ból głowy, światłowstręt i sztywność karku",
        "E. Żółtaczka, świąd skóry i odbarwione stolce"
      ],
      options: [
        "A. Gorączka, zapalenie gardła i migdałków z nalotami oraz uogólnione powiększenie węzłów chłonnych",
        "B. Kaszel, katar i zapalenie spojówek ze światłowstrętem",
        "C. Biegunka, wymioty i obniżenie napięcia mięśniowego",
        "D. Ból głowy, światłowstręt i sztywność karku",
        "E. Żółtaczka, świąd skóry i odbarwione stolce"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Prawidłowa odpowiedź: A. Triada mononukleozowa obejmuje: wysoką gorączkę, zapalenie gardła (często z masywnym obrzękiem i szarobiałymi nalotami w kryptach) oraz limfadenopatię (szczególnie węzłów szyjnych tylnych i kąta żuchwy).",
      expl: "Prawidłowa odpowiedź: A. Triada mononukleozowa obejmuje: wysoką gorączkę, zapalenie gardła (często z masywnym obrzękiem i szarobiałymi nalotami w kryptach) oraz limfadenopatię (szczególnie węzłów szyjnych tylnych i kąta żuchwy)."
    },
    {
      id: 2,
      q: "Wystąpienie uogólnionej, swędzącej osutki plamisto-grudkowej po podaniu amoksycyliny u nastolatka z mononukleozą zakaźną:",
      opts: [
        "A. Wskazuje na ciężką alergię IgE-zależną i stanowi bezwzględne przeciwwskazanie do stosowania penicylin do końca życia",
        "B. Jest zjawiskiem immunologicznym indukowanym obecnością wirusa EBV u 80-90% leczonych i nie oznacza trwałej alergii na penicyliny",
        "C. Świadczy o zakażeniu gronkowcem złocistym opornym na metycylinę (MRSA)",
        "D. Jest bezpośrednim dowodem na rozwój zespołu Stevensa-Johnsona",
        "E. Wymaga natychmiastowego przetoczenia 4 jednostek osocza świeżo mrożonego"
      ],
      options: [
        "A. Wskazuje na ciężką alergię IgE-zależną i stanowi bezwzględne przeciwwskazanie do stosowania penicylin do końca życia",
        "B. Jest zjawiskiem immunologicznym indukowanym obecnością wirusa EBV u 80-90% leczonych i nie oznacza trwałej alergii na penicyliny",
        "C. Świadczy o zakażeniu gronkowcem złocistym opornym na metycylinę (MRSA)",
        "D. Jest bezpośrednim dowodem na rozwój zespołu Stevensa-Johnsona",
        "E. Wymaga natychmiastowego przetoczenia 4 jednostek osocza świeżo mrożonego"
      ],
      correctIdx: 1,
      correct: 1,
      exp: "Prawidłowa odpowiedź: B. Osutka poampicylinowa/poamoksycylinowa w mononukleozie wynika z przejściowej nadreaktywności immunologicznej w przebiegu ostrej wiremii EBV. Nie jest to alergia IgE-zależna i nie dyskwalifikuje pacjenta ze stosowania penicylin w przyszłości po ustąpieniu choroby.",
      expl: "Prawidłowa odpowiedź: B. Osutka poampicylinowa/poamoksycylinowa w mononukleozie wynika z przejściowej nadreaktywności immunologicznej w przebiegu ostrej wiremii EBV. Nie jest to alergia IgE-zależna i nie dyskwalifikuje pacjenta ze stosowania penicylin w przyszłości po ustąpieniu choroby."
    },
    {
      id: 3,
      q: "Tzw. komórki Downeya (atypowe limfocyty) obecne w rozmazie krwi obwodowej chorych na mononukleozę to w rzeczywistości:",
      opts: [
        "A. Pobudzone, odczynowe limfocyty T cytotoksyczne (CD8+) reagujące na zakażone komórki B",
        "B. Zdegenerowane limfocyty B ulegające martwicy pod wpływem toksyn",
        "C. Nowotworowe komórki ostrej białaczki limfoblastycznej",
        "D. Dojrzałe makrofagi obładowane hemosyderyną",
        "E. Eozynofile, które utraciły ziarnistości kwasochłonne"
      ],
      options: [
        "A. Pobudzone, odczynowe limfocyty T cytotoksyczne (CD8+) reagujące na zakażone komórki B",
        "B. Zdegenerowane limfocyty B ulegające martwicy pod wpływem toksyn",
        "C. Nowotworowe komórki ostrej białaczki limfoblastycznej",
        "D. Dojrzałe makrofagi obładowane hemosyderyną",
        "E. Eozynofile, które utraciły ziarnistości kwasochłonne"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Prawidłowa odpowiedź: A. Atypowe limfocyty (komórki Downeya) to aktywowane limfocyty T cytotoksyczne (głównie CD8+) oraz komórki NK, które organizm produkuje w odpowiedzi na proliferację zakażonych przez EBV limfocytów B.",
      expl: "Prawidłowa odpowiedź: A. Atypowe limfocyty (komórki Downeya) to aktywowane limfocyty T cytotoksyczne (głównie CD8+) oraz komórki NK, które organizm produkuje w odpowiedzi na proliferację zakażonych przez EBV limfocytów B."
    },
    {
      id: 4,
      q: "Który profil serologiczny jednoznacznie potwierdza ŚWIEŻE (ostre pierwotne) zakażenie wirusem EBV?",
      opts: [
        "A. Anty-VCA IgM (+), Anty-VCA IgG (+), Anty-EBNA (-)",
        "B. Anty-VCA IgM (-), Anty-VCA IgG (+), Anty-EBNA (+)",
        "C. Anty-VCA IgM (-), Anty-VCA IgG (-), Anty-EBNA (-)",
        "D. Anty-VCA IgM (-), Anty-VCA IgG (-), Anty-EBNA (+)",
        "E. Anty-VCA IgM (+), Anty-VCA IgG (-), Anty-EBNA (+)"
      ],
      options: [
        "A. Anty-VCA IgM (+), Anty-VCA IgG (+), Anty-EBNA (-)",
        "B. Anty-VCA IgM (-), Anty-VCA IgG (+), Anty-EBNA (+)",
        "C. Anty-VCA IgM (-), Anty-VCA IgG (-), Anty-EBNA (-)",
        "D. Anty-VCA IgM (-), Anty-VCA IgG (-), Anty-EBNA (+)",
        "E. Anty-VCA IgM (+), Anty-VCA IgG (-), Anty-EBNA (+)"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Prawidłowa odpowiedź: A. Obecność przeciwciał przeciw antygenowi kapsydowemu w klasie IgM (anty-VCA IgM) przy jednoczesnym BRAKU przeciwciał przeciw antygenowi jądrowemu (anty-EBNA) jest kryterium ostrej pierwotnej infekcji EBV. Anty-EBNA pojawiają się dopiero po 6-8 tygodniach od zachorowania.",
      expl: "Prawidłowa odpowiedź: A. Obecność przeciwciał przeciw antygenowi kapsydowemu w klasie IgM (anty-VCA IgM) przy jednoczesnym BRAKU przeciwciał przeciw antygenowi jądrowemu (anty-EBNA) jest kryterium ostrej pierwotnej infekcji EBV. Anty-EBNA pojawiają się dopiero po 6-8 tygodniach od zachorowania."
    },
    {
      id: 5,
      q: "Dlaczego u pacjenta z mononukleozą zakaźną bezwzględnie zakazuje się uprawiania sportów kontaktowych i podnoszenia ciężarów przez minimum 3-4 tygodnie?",
      opts: [
        "A. Z powodu ryzyka samoistnego lub pourazowego pęknięcia powiększonej śledziony",
        "B. Z uwagi na ryzyko złamania kości udowej pod wpływem toksyn",
        "C. Ze względu na możliwość natychmiastowego rozwoju cukrzycy",
        "D. Aby zapobiec wypadaniu zastawek serca",
        "E. Z powodu ryzyka utraty słuchu wywołanej wysiłkiem fizycznym"
      ],
      options: [
        "A. Z powodu ryzyka samoistnego lub pourazowego pęknięcia powiększonej śledziony",
        "B. Z uwagi na ryzyko złamania kości udowej pod wpływem toksyn",
        "C. Ze względu na możliwość natychmiastowego rozwoju cukrzycy",
        "D. Aby zapobiec wypadaniu zastawek serca",
        "E. Z powodu ryzyka utraty słuchu wywołanej wysiłkiem fizycznym"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Prawidłowa odpowiedź: A. Śledziona w przebiegu mononukleozy ulega gwałtownemu powiększeniu, a jej torebka ścieńczeniu, co stwarza bezpośrednie ryzyko zagrażającego życiu pęknięcia narządu i krwawienia do jamy otrzewnej, najczęściej między 2. a 3. tygodniem od zachorowania.",
      expl: "Prawidłowa odpowiedź: A. Śledziona w przebiegu mononukleozy ulega gwałtownemu powiększeniu, a jej torebka ścieńczeniu, co stwarza bezpośrednie ryzyko zagrażającego życiu pęknięcia narządu i krwawienia do jamy otrzewnej, najczęściej między 2. a 3. tygodniem od zachorowania."
    },
    {
      id: 6,
      q: "Wskaż bezwzględne wskazanie do zastosowania glikokortykosteroidów u pacjenta z mononukleozą zakaźną:",
      opts: [
        "A. Zagrażająca obturacja dróg oddechowych spowodowana masywnym powiększeniem migdałków podniebiennych",
        "B. Obecność szarobiałego nalotu na migdałkach bez duszności",
        "C. Umiarkowane powiększenie węzłów chłonnych szyi do 2 cm",
        "D. Gorączka 38,2°C trwająca 3 dni",
        "E. Izolowane podwyższenie aktywności ALT do 90 IU/l"
      ],
      options: [
        "A. Zagrażająca obturacja dróg oddechowych spowodowana masywnym powiększeniem migdałków podniebiennych",
        "B. Obecność szarobiałego nalotu na migdałkach bez duszności",
        "C. Umiarkowane powiększenie węzłów chłonnych szyi do 2 cm",
        "D. Gorączka 38,2°C trwająca 3 dni",
        "E. Izolowane podwyższenie aktywności ALT do 90 IU/l"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Prawidłowa odpowiedź: A. Glikokortykosteroidy w mononukleozie stosuje się jedynie w sytuacjach powikłanych: ostrej obturacji dróg oddechowych (stridor, kissing tonsils utrudniające oddychanie), ciężkiej małopłytkowości autoimmunologicznej, niedokrwistości hemolitycznej oraz powikłaniach neurologicznych.",
      expl: "Prawidłowa odpowiedź: A. Glikokortykosteroidy w mononukleozie stosuje się jedynie w sytuacjach powikłanych: ostrej obturacji dróg oddechowych (stridor, kissing tonsils utrudniające oddychanie), ciężkiej małopłytkowości autoimmunologicznej, niedokrwistości hemolitycznej oraz powikłaniach neurologicznych."
    },
    {
      id: 7,
      q: "Czym jest objaw Glanzmana obserwowany w mononukleozie zakaźnej?",
      opts: [
        "A. Obrzęk powiek i nasady nosa",
        "B. Plamki bieliste na śluzówce policzków",
        "C. Bolesność przy ucisku wyrostka sutkowatego",
        "D. Linijne wybroczyny pod paznokciami",
        "E. Zasinienie wokół pępka"
      ],
      options: [
        "A. Obrzęk powiek i nasady nosa",
        "B. Plamki bieliste na śluzówce policzków",
        "C. Bolesność przy ucisku wyrostka sutkowatego",
        "D. Linijne wybroczyny pod paznokciami",
        "E. Zasinienie wokół pępka"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Prawidłowa odpowiedź: A. Objaw Glanzmana to obrzęk powiek górnych, łuków brwiowych oraz nasady nosa występujący u części chorych we wczesnym okresie mononukleozy zakaźnej w wyniku zaburzenia odpływu chłonki.",
      expl: "Prawidłowa odpowiedź: A. Objaw Glanzmana to obrzęk powiek górnych, łuków brwiowych oraz nasady nosa występujący u części chorych we wczesnym okresie mononukleozy zakaźnej w wyniku zaburzenia odpływu chłonki."
    },
    {
      id: 8,
      q: "Wirus Epsteina-Barr (EBV) łączy się z docelową komórką układu odpornościowego za pośrednictwem cząsteczki powierzchniowej:",
      opts: [
        "A. CD4 na limfocytach T pomocniczych",
        "B. CD21 (receptor dla składnika C3d dopełniacza / CR2) na limfocytach B",
        "C. CD8 na limfocytach cytotoksycznych",
        "D. CD14 na monocytach",
        "E. Cząsteczki ACE-2 na pneumocytach"
      ],
      options: [
        "A. CD4 na limfocytach T pomocniczych",
        "B. CD21 (receptor dla składnika C3d dopełniacza / CR2) na limfocytach B",
        "C. CD8 na limfocytach cytotoksycznych",
        "D. CD14 na monocytach",
        "E. Cząsteczki ACE-2 na pneumocytach"
      ],
      correctIdx: 1,
      correct: 1,
      exp: "Prawidłowa odpowiedź: B. EBV wykazuje swoisty tropizm do limfocytów B, wnikając do nich po związaniu białka otoczkowego gp350/220 z cząsteczką CD21 (receptorem CR2).",
      expl: "Prawidłowa odpowiedź: B. EBV wykazuje swoisty tropizm do limfocytów B, wnikając do nich po związaniu białka otoczkowego gp350/220 z cząsteczką CD21 (receptorem CR2)."
    },
    {
      id: 9,
      q: "Z którym nowotworem złośliwym wirus EBV wykazuje udokumentowany związek etiopatogenetyczny?",
      opts: [
        "A. Chłoniak Burkitta",
        "B. Rak nosogardła (NPC - nasopharyngeal carcinoma)",
        "C. Chłoniak Hodgkina",
        "D. Potransplantacyjny zespół limfoproliferacyjny (PTLD)",
        "E. Wszystkie wymienione"
      ],
      options: [
        "A. Chłoniak Burkitta",
        "B. Rak nosogardła (NPC - nasopharyngeal carcinoma)",
        "C. Chłoniak Hodgkina",
        "D. Potransplantacyjny zespół limfoproliferacyjny (PTLD)",
        "E. Wszystkie wymienione"
      ],
      correctIdx: 4,
      correct: 4,
      exp: "Prawidłowa odpowiedź: E. EBV jest wirusem onkogennym związanym z etiopatogenezą chłoniaka Burkitta, raka nosogardła, klasycznego chłoniaka Hodgkina, chłoniaków u osób zakażonych HIV oraz PTLD.",
      expl: "Prawidłowa odpowiedź: E. EBV jest wirusem onkogennym związanym z etiopatogenezą chłoniaka Burkitta, raka nosogardła, klasycznego chłoniaka Hodgkina, chłoniaków u osób zakażonych HIV oraz PTLD."
    },
    {
      id: 10,
      q: "Które z poniższych stwierdzeń dotyczących odczynu Paula-Bunnella-Davidsohna (przeciwciał heterofilnych) jest PRAWDZIWE?",
      opts: [
        "A. U dzieci poniżej 4.-5. roku życia test ten często daje wyniki fałszywie ujemne (nawet w 50-80% przypadków)",
        "B. Przeciwciała heterofilne to swoiste przeciwciała skierowane przeciwko białku kapsydowemu VCA",
        "C. Test jest dodatni wyłącznie u osób zakażonych wirusem grypy typu A",
        "D. Dodatni odczyn utrzymuje się niezmiennie przez całe życie pacjenta",
        "E. Przeciwciała te powodują hemolizę erytrocytów wyłącznie w temperaturze 4°C"
      ],
      options: [
        "A. U dzieci poniżej 4.-5. roku życia test ten często daje wyniki fałszywie ujemne (nawet w 50-80% przypadków)",
        "B. Przeciwciała heterofilne to swoiste przeciwciała skierowane przeciwko białku kapsydowemu VCA",
        "C. Test jest dodatni wyłącznie u osób zakażonych wirusem grypy typu A",
        "D. Dodatni odczyn utrzymuje się niezmiennie przez całe życie pacjenta",
        "E. Przeciwciała te powodują hemolizę erytrocytów wyłącznie w temperaturze 4°C"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Prawidłowa odpowiedź: A. Odczyn na przeciwciała heterofilne aglutynujące erytrocyty baranie lub końskie (Monospot / PBD) jest bardzo użyteczny u młodzieży i dorosłych, ale u dzieci poniżej 4. roku życia jego czułość jest niska (<20-50%), dlatego u małych dzieci diagnostykę opiera się na przeciwciałach swoistych (anty-VCA IgM).",
      expl: "Prawidłowa odpowiedź: A. Odczyn na przeciwciała heterofilne aglutynujące erytrocyty baranie lub końskie (Monospot / PBD) jest bardzo użyteczny u młodzieży i dorosłych, ale u dzieci poniżej 4. roku życia jego czułość jest niska (<20-50%), dlatego u małych dzieci diagnostykę opiera się na przeciwciałach swoistych (anty-VCA IgM)."
    },
    {
      id: 11,
      q: "Jakie jest postępowanie przyczynowe z wyboru w niepowikłanej mononukleozie zakaźnej u uprzednio zdrowego nastolatka?",
      opts: [
        "A. Dożylny Acyklowir w dawce 15 mg/kg co 8 godzin",
        "B. Wyłącznie leczenie objawowe (odpoczynek, nawodnienie, paracetamol/ibuprofen); brak wskazań do rutynowego leczenia przeciwwirusowego i antybiotykoterapii",
        "C. Klindamycyna doustnie przez 14 dni",
        "D. Natychmiastowa tonsillektomia obustronna",
        "E. Wlewy z immunoglobulin wieloważnych (IVIG) w dawce 2 g/kg"
      ],
      options: [
        "A. Dożylny Acyklowir w dawce 15 mg/kg co 8 godzin",
        "B. Wyłącznie leczenie objawowe (odpoczynek, nawodnienie, paracetamol/ibuprofen); brak wskazań do rutynowego leczenia przeciwwirusowego i antybiotykoterapii",
        "C. Klindamycyna doustnie przez 14 dni",
        "D. Natychmiastowa tonsillektomia obustronna",
        "E. Wlewy z immunoglobulin wieloważnych (IVIG) w dawce 2 g/kg"
      ],
      correctIdx: 1,
      correct: 1,
      exp: "Prawidłowa odpowiedź: B. W niepowikłanej mononukleozie zakaźnej podstawą jest leczenie objawowe (odpoczynek, nawadnianie, paracetamol lub ibuprofen). Acyklowir nie wpływa na przebieg kliniczny, a antybiotyki są nieskuteczne i niewskazane.",
      expl: "Prawidłowa odpowiedź: B. W niepowikłanej mononukleozie zakaźnej podstawą jest leczenie objawowe (odpoczynek, nawadnianie, paracetamol lub ibuprofen). Acyklowir nie wpływa na przebieg kliniczny, a antybiotyki są nieskuteczne i niewskazane."
    }
  ],
  flashcards: [
    {
      front: "Czym jest klasyczna triada mononukleozowa w zakażeniu EBV?",
      back: "• Wysoka gorączka (często >38,5-39°C trwająca 1-2 tyg.).<br>• Zapalenie gardła z obrzękiem i szarobiałym nalotem na migdałkach.<br>• Uogólniona symetryczna limfadenopatia (zwłaszcza węzły karkowe i szyjne tylne).<br>• Często współistnieje powiększenie śledziony (splenomegalia) i wątroby."
    },
    {
      front: "Jak interpretować wysypkę po amoksycylinie w przebiegu mononukleozy?",
      back: "• Zjawisko immunologiczne wywołane nadreaktywnością limfocytów pod wpływem EBV (występuje u 80-90% leczonych).<br>• NIE oznacza trwałej alergii IgE-zależnej na penicyliny!<br>• W przyszłości pacjent może bezpiecznie przyjmować penicyliny."
    },
    {
      front: "Co to są komórki Downeya w rozmazie krwi?",
      back: "• Atypowe, pobudzone limfocyty T cytotoksyczne (CD8+) i komórki NK.<br>• Reagują na zakażone przez EBV limfocyty B i niszczą je.<br>• Stanowią >10% leukocytów w rozmazie w mononukleozie."
    },
    {
      front: "Jak interpretować panel serologiczny EBV w ostrej fazie infekcji?",
      back: "• Anty-VCA IgM: DODATNI (marker świeżej fazy zakażenia).<br>• Anty-VCA IgG: DODATNI.<br>• Anty-EBNA: UJEMNY (pojawiają się dopiero po 6-8 tygodniach od zachorowania i trwają całe życie)."
    },
    {
      front: "Dlaczego w mononukleozie obowiązuje zakaz sportów kontaktowych przez 3-4 tyg.?",
      back: "• Z powodu ryzyka samoistnego lub pourazowego pęknięcia śledziony (najgroźniejsze w 2.-3. tygodniu).<br>• Pęknięcie prowadzi do wstrząsu krwotocznego i zagrożenia życia."
    },
    {
      front: "Kiedy w mononukleozie dopuszcza się podanie glikokortykosteroidów (GKS)?",
      back: "• Wyłącznie w stanach zagrażających:<br>1. Obturacja dróg oddechowych przez olbrzymie migdałki ('kissing tonsils', stridor).<br>2. Ciężkie powikłania hematologiczne (małopłytkowość immunologiczna, anemia autoimmunohemolityczna).<br>3. Powikłania neurologiczne i kardiologiczne."
    }
  ]
};

async function main() {
  await saveCase(case113);
}
main();

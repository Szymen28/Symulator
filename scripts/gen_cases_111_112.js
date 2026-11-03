const fs = require('fs');
const { encryptStringAes } = require('./encrypt_case.js');
const PASSWORD = '@LEKSzymon28111999';

const cases = [
  // 111: Płonica (szkarlatyna)
  {
    id: 111,
    filename: "111_plonica_szkarlatyna.json",
    dept: "Pediatria",
    shortTitle: "5-letnia dziewczynka – Ból gardła, malinowy język, wysypka 'papier ścierny' i linie Pastii (Płonica / Szkarlatyna)",
    diagnosisTitle: "Płonica / Szkarlatyna (Scarlatina) wywołana przez paciorkowce grupy A (Streptococcus pyogenes)",
    vitals: [
      { label: "HR", val: "128/min", sub: "Tachykardia gorączkowa", status: "warn" },
      { label: "BP", val: "96/60 mmHg", sub: "Prawidłowe", status: "ok" },
      { label: "SpO2", val: "98%", sub: "Prawidłowa", status: "ok" },
      { label: "RR", val: "24/min", sub: "Prawidłowa", status: "ok" },
      { label: "Temp", val: "39.1°C", sub: "Wysoka gorączka", status: "bad" }
    ],
    vitalsObj: { hr: 128, bp: "96/60", spo2: 98, rr: 24, temp: 39.1 },
    story: "5-letnia dziewczynka została przyprowadzona do gabinetu pediatrycznego z powodu ostrego początku choroby przed 24 godzinami: wysokiej gorączki do 39.5°C, silnego bólu gardła utrudniającego połykanie, wymiotów i bólu głowy. Rodzice nie zauważyli kaszlu ani kataru. Dziś rano na ciele dziecka pojawiła się drobnoplamisto-grudkowa, szorstka wysypka przypominająca w dotyku papier ścierny. W badaniu fizykalnym: błona śluzowa gardła i migdałki żywoczerwone ('płomienne gardło') z ropnym nalotem w kryptach, wybroczyny na podniebieniu. Język początkowo pokryty grubym białym nalotem z obrzękiem brodawek, z łuszczącymi się brzegami (obraz malinowego języka w trakcie ewolucji). Wysypka najbardziej nasilona w dołach pachowych, pachwinach i zgięciach łokciowych z obecnością ciemnoczerwonych linijnych wybroczyn (linie Pastii). Trójkąt wokół ust i nosa jest wolny od wykwitów i blady (trójkąt Fiłatowa). Powiększone, bolesne węzły chłonne szyjne przednie.",
    labs: [
      {
        category: "Diagnostyka mikrobiologiczna i szybkie testy",
        items: [
          { name: "Szybki test antygenowy w kierunku GAS (Strep-A test)", val: "Dodatni (+)", norm: "Ujemny", flag: "H" },
          { name: "Posiew wymazu z gardła i migdałków", val: "Obfity wzrost Streptococcus pyogenes (Grupa A)", norm: "Flora fizjologiczna", flag: "H" },
          { name: "Wrażliwość na penicylinę", val: "100% wrażliwy (brak oporności na penicylinę u GAS)", norm: "Wrażliwy", flag: "N" }
        ]
      },
      {
        category: "Morfologia krwi i parametry zapalne",
        items: [
          { name: "Leukocyty (WBC)", val: "16.2 G/L", norm: "5.5–15.5 G/L", flag: "H" },
          { name: "Neutrofile", val: "78%", norm: "35–55%", flag: "H" },
          { name: "CRP", val: "54 mg/L", norm: "< 5.0 mg/L", flag: "H" },
          { name: "Odczyn Biernackiego (OB)", val: "48 mm/h", norm: "< 15 mm/h", flag: "H" }
        ]
      },
      {
        category: "Badanie moczu i serologia (kontrola)",
        items: [
          { name: "Badanie ogólne moczu", val: "Białko nieobecne, erytrocyty 0–1 wpw, leukocyty 1–3 wpw", norm: "Prawidłowe", flag: "N" },
          { name: "Odczyn ASO (faza wczesna)", val: "120 IU/mL (wzrost po 2–3 tyg.)", norm: "< 200 IU/mL", flag: "N" }
        ]
      }
    ],
    steps: [
      {
        num: 1,
        title: "Rozpoznanie kliniczne na podstawie zespołu objawów",
        task: "Połączenie ostrego zapalenia gardła, szorstkiej drobnoplamistej wysypki (papier ścierny), linii Pastii, trójkąta Fiłatowa i malinowego języka jednoznacznie wskazuje na:",
        options: [
          { text: "Płonicę (szkarlatynę)", correct: true, feedback: "Prawidłowo! To klasyczny obraz płonicy wywołanej przez paciorkowca beta-hemolizującego grupy A (GAS, Streptococcus pyogenes) wytwarzającego pirogenne egzotoksyny (erytrogenne A, B lub C)." },
          { text: "Odrę", correct: false, feedback: "Błąd! W odrze występuje gruboplamista zlewająca się wysypka, plamki Koplika oraz zapalenie spojówek i nieżyt nosa." },
          { text: "Chorobę dłoni, stóp i jamy ustnej (HFMD)", correct: false, feedback: "Błąd! W HFMD występują pęcherzyki na dłoniach, podeszwach i afty w jamie ustnej, brak szorstkiej uogólnionej wysypki i linii Pastii." },
          { text: "Mononukleozę zakaźną", correct: false, feedback: "Błąd! W mononukleozie wysypka pojawia się z reguły dopiero po podaniu amoksycyliny, towarzyszy jej splenomegalia i limfocytoza atypowa." }
        ]
      },
      {
        num: 2,
        title: "Charakterystyczne objawy przedmiotowe płonicy",
        task: "Co to są 'linie Pastii' (objaw Pastii) stwierdzane w badaniu fizykalnym dziecka z płonicą?",
        options: [
          { text: "Linijne ściemnienia i wybroczyny w naturalnych fałdach skórnych (zgięcia łokciowe, podkolanowe, pachwiny) powstałe wskutek łamliwości naczyń włosowatych", correct: true, feedback: "Dokładnie tak! W naturalnych załamaniach skóry (łokcie, pachy, pachwiny) wysypka ulega zagęszczeniu, a drobne naczynia pękają pod wpływem toksyny erytrogennej, tworząc linijne wybroczyny zwane objawem lub liniami Pastii." },
          { text: "Białe plamki na błonie śluzowej policzków", correct: false, feedback: "To plamki Koplika w odrze." },
          { text: "Brak wysypki wokół ust i nosa", correct: false, feedback: "To trójkąt Fiłatowa." },
          { text: "Rumień w kształcie motyla na twarzy", correct: false, feedback: "To objaw tocznia rumieniowatego układowego." }
        ]
      },
      {
        num: 3,
        title: "Ewolucja wyglądu języka w płonicy",
        task: "Jak zmienia się wygląd języka w przebiegu płonicy w kolejnych dobach choroby?",
        options: [
          { text: "W pierwszych dobach język jest pokryty grubym białym nalotem ('język obłożony'), a od 4.–5. doby nalot ustępuje od brzegów, odsłaniając żywoczerwone powiększone brodawki ('język malinowy')", correct: true, feedback: "Znakomicie! Klasyczna ewolucja: w 1.–2. dobie język 'biały truskawkowy' (obłożony białym nalotem z wystającymi brodawkami), od 3.–4. doby oczyszcza się od brzegów, stając się 'językiem malinowym' (żywoczerwony z przerośniętymi brodawkami brodawkowatymi)." },
          { text: "Język jest stale siny i pokryty owrzodzeniami", correct: false, feedback: "Błąd merytoryczny." },
          { text: "Język staje się czarny i owłosiony", correct: false, feedback: "To lingua villosa nigra, wynik palenia lub zaburzeń flory, nie płonicy." },
          { text: "Język ulega atrofii i wygładzeniu od 1. godziny", correct: false, feedback: "Wygładzenie języka Huntera występuje w niedoborze witaminy B12." }
        ]
      },
      {
        num: 4,
        title: "Antybiotykoterapia pierwszego rzutu",
        task: "Jaki jest lek pierwszego rzutu w leczeniu płonicy u dziecka bez wywiadu alergii na penicylinę i jak długo powinna trwać kuracja?",
        options: [
          { text: "Fenoksymetylopenicylina (penicylina V) doustnie przez pełne 10 dni", correct: true, feedback: "Doskonale! Zgodnie z wytycznymi NPOA i polskich towarzystw pediatrycznych, lekiem z wyboru jest fenoksymetylopenicylina podawana w 2 dawkach podzielonych przez 10 dni. Szczepy S. pyogenes są w 100% wrażliwe na penicylinę. Utrzymanie pełnego 10-dniowego kursu jest niezbędne do eradykacji i zapobiegania gorączce reumatycznej!" },
          { text: "Amoksycylina z kwasem klawulanowym przez 3 dni", correct: false, feedback: "Błąd! Kwas klawulanowy jest zbędny (GAS nie wytwarza beta-laktamaz), a 3 dni to zbyt krótki czas, grożący nawrotem i powikłaniami." },
          { text: "Azytromycyna przez 3 dni", correct: false, feedback: "Błąd! Makrolidy są lekiem drugiego rzutu wyłącznie przy nadwrażliwości natychmiastowej na penicyliny, a odsetek oporności GAS na makrolidy w Polsce sięga 15-20%." },
          { text: "Cyprofloksacyna doustnie przez 7 dni", correct: false, feedback: "Błąd! Fluorochinolony nie są lekiem na zakażenia paciorkowcowe u dzieci." }
        ]
      },
      {
        num: 5,
        title: "Postępowanie w przypadku alergii na penicylinę",
        task: "Dziecko z potwierdzoną ciężką natychmiastową reakcją anafilaktyczną na penicylinę w wywiadzie choruje na płonicę. Jaki antybiotyk zastosujesz?",
        options: [
          { text: "Makrolid (np. klarytromycyna przez 10 dni lub azytromycyna przez 5 dni) lub klindamycyna", correct: true, feedback: "Świetnie! U chorych z anafilaksją na penicyliny (reakcja IgE-zależna) przeciwwskazane są wszystkie antybiotyki beta-laktamowe. Lekiem z wyboru jest makrolid (klarytromycyna/azytromycyna) lub linkozamid (klindamycyna)." },
          { text: "Cefalosporyna I generacji (np. cefaleksyna)", correct: false, feedback: "Błąd! W reakcji anafilaktycznej (ciężkiej) na penicyliny istnieje ryzyko reakcji krzyżowej; cefalosporyny można rozważyć jedynie w łagodnych reakcjach nienatychmiastowych." },
          { text: "Wankomycyna dożylnie w warunkach domowych", correct: false, feedback: "Nieuzasadniony błąd w zakażeniu niepowikłanym." },
          { text: "Zaniechanie leczenia przeciwbakteryjnego", correct: false, feedback: "Grozi powikłaniami ropnymi (ropień okołomigdałkowy) oraz gorączką reumatyczną." }
        ]
      },
      {
        num: 6,
        title: "Okres zakaźności i powrót do przedszkola",
        task: "Kiedy dziecko leczone penicyliną z powodu płonicy przestaje być zakaźne dla otoczenia i może bezpiecznie wrócić do przedszkola?",
        options: [
          { text: "Po 24 godzinach od podania pierwszej dawki skutecznego antybiotyku (pod warunkiem ustąpienia gorączki i poprawy samopoczucia)", correct: true, feedback: "Prawidłowo! Prawidłowo prowadzona antybiotykoterapia penicylinowa eliminuje zakaźność GAS z gardła po 24 godzinach. Bez antybiotyku zakaźność utrzymuje się przez 2–3 tygodnie!" },
          { text: "Dopiero po całkowitym złuszczeniu naskórka (po 4–6 tygodniach)", correct: false, feedback: "Błąd! Łuszczenie naskórka jest zjawiskiem pozapalnym, naskórek nie zawiera bakterii i nie jest zakaźny." },
          { text: "Natychmiast po połknięciu pierwszej tabletki", correct: false, feedback: "Potrzeba około 24h na eradykację patogenu z wydzieliny gardła." },
          { text: "Dziecko pozostaje zakaźne do końca życia", correct: false, feedback: "Bzdura medyczna." }
        ]
      },
      {
        num: 7,
        title: "Późne łuszczenie się naskórka",
        task: "W 2.–3. tygodniu od początku choroby rodzice zauważają płatowe schodzenie skóry z opuszek palców rąk i stóp. Co oznacza ten objaw?",
        options: [
          { text: "Charakterystyczne grubopłatowe łuszczenie naskórka na dłoniach i stopach (oraz drobnopłatkowe na tułowiu), będące naturalnym etapem zejścia płonicy", correct: true, feedback: "Znakomicie! Łuszczenie skóry rozpoczyna się w 2. tygodniu choroby: na twarzy otrębiaste, na tułowiu drobnopłatkowe, a na dłoniach i stopach grubopłatowe (palce, podeszwy). Jest to zjawisko całkowicie fizjologiczne dla płonicy." },
          { text: "Zespół Stevensa-Johnsona wywołany penicyliną", correct: false, feedback: "Błąd! W SJS dochodzi do powstawania pęcherzy i spełzania naskórka z błon śluzowych w ostrej fazie, a nie izolowanego łuszczenia opuszek po 2 tygodniach." },
          { text: "Ostra grzybica dłoni i stóp", correct: false, feedback: "Brak związku." },
          { text: "Niepowodzenie leczenia antybiotykiem i konieczność hospitalizacji", correct: false, feedback: "Nieprawda – to typowy przebieg rekonwalescencji." }
        ]
      },
      {
        num: 8,
        title: "Późne powikłania immunologiczne płonicy",
        task: "Jakie dwa główne nieropne powikłania późne mogą rozwinąć się po przebyciu zakażenia Streptococcus pyogenes?",
        options: [
          { text: "Gorączka reumatyczna (Carditis, pląsawica, zapalenie stawów) oraz ostre popaciorkowcowe kłębuszkowe zapalenie nerek (APSGN)", correct: true, feedback: "Bardzo dobrze! Gorączka reumatyczna (kryteria Jonesa) rozwija się po 2-4 tygodniach wyłącznie po paciorkowcowym zapaleniu gardła (antybiotykoterapia jej zapobiega!). APSGN rozwija się po zapaleniu gardła lub skóry (antybiotykoterapia w fazie ostrej nie zapobiega w 100% APSGN)." },
          { text: "Zespół Guillaina-Barrégo i stwardnienie rozsiane", correct: false, feedback: "Nie są typowymi późnymi powikłaniami GAS." },
          { text: "Marskość wątroby i wrzodziejące zapalenie jelita", correct: false, feedback: "Brak związku patogenetycznego." },
          { text: "Cukrzyca typu 1 i choroba Hashimoto", correct: false, feedback: "Brak bezpośredniego związku z GAS." }
        ]
      }
    ],
    pathoNodes: [
      {
        title: "1. Kolonizacja gardła przez Streptococcus pyogenes (GAS)",
        desc: "Bakterie przylegają do komórek nabłonka gardła za pomocą białka M i kwasu lipotejchojowego, wywołując miejscowy odczyn zapalny, ból gardła i wysięk ropny na migdałkach.",
        drugTarget: "Fenoksymetylopenicylina (10 dni) – hamuje biosyntezę ściany komórkowej GAS"
      },
      {
        title: "2. Wytwarzanie pirogennych egzotoksyn paciorkowcowych (SpeA, SpeC)",
        desc: "Egzotoksyny erytrogenne (pirogenne) działają jako superantygeny, aktywując nieswoiście limfocyty T i wyzwalając masywny wyrzut cytokin prozapalnych oraz uszkodzenie śródbłonka naczyń skóry.",
        drugTarget: "Odpowiedź immunologiczna wytwarzająca swoiste przeciwciała neutralizujące toksynę (trwała odporność na dany typ toksyny)"
      },
      {
        title: "3. Uszkodzenie naczyniowe, wysypka i późne złuszczanie",
        desc: "Miejscowe rozszerzenie i wzmożona przepuszczalność naczyń skóry skutkuje drobnoplamistą wysypką ('papier ścierny') oraz wybroczynami (linie Pastii). Po obumarciu komórek naskórka następuje jego płatowe złuszczanie.",
        drugTarget: "Leczenie objawowe przeciwgorączkowe (paracetamol, ibuprofen) i odpowiednie nawodnienie"
      }
    ],
    dutySummary: "Płonica to zakażenie GAS produkującym toksynę erytrogenną: zapalenie gardła + szorstka wysypka (papier ścierny) + trójkąt Fiłatowa + linie Pastii + malinowy język. Lekiem z wyboru jest fenoksymetylopenicylina przez 10 dni (zakaźność ustępuje po 24h). W 2.–3. tyg. występuje płatowe łuszczenie skóry dłoni i stóp. Główne powikłania późne: gorączka reumatyczna i APSGN.",
    diffTable: [
      { disease: "Odra (morbilli)", diff: "Etiologia wirusowa, wysoka gorączka z katarem, suchym kaszlem i zapaleniem spojówek, plamki Koplika, wysypka gruboplamista zlewająca się.", test: "Brak plamiek Koplika w płonicy, dodatni szybki test Strep-A." },
      { disease: "Różyczka", diff: "Wysypka różowa drobnoplamista niezlewająca się, powiększenie węzłów chłonnych karkowych i potylicznych, brak malinowego języka i linii Pastii.", test: "Ujemny Strep-A, powiększone węzły podpotyliczne." },
      { disease: "Choroba Kawasakiego", diff: "Gorączka >= 5 dni oporna na antybiotyk, przekrwienie spojówek bez wysięku, obrzęki rąk i stóp, malinowy język, ryzyko tętniaków wieńcowych.", test: "Echo serca, ujemny posiew z gardła, brak reakcji na penicylinę." },
      { disease: "Osutka polekowa (po amoksycylinie)", diff: "Pojawia się u pacjenta z mononukleozą zakaźną po podaniu amoksycyliny; wysypka plamisto-grudkowa swędząca, uogólniona limfadenopatia, splenomegalia.", test: "Test na mononukleozę (EBV IgM), aminotransferazy." }
    ],
    lekQuestions: [
      {
        question: "U 6-letniego dziecka z podejrzeniem płonicy (szkarlatyny) potwierdzono obecność Streptococcus pyogenes w wymazie z gardła. Dziecko nie ma alergii na leki. Wskaż leczenie z wyboru i zalecany czas jego trwania:",
        options: [
          "Amoksycylina z kwasem klawulanowym doustnie przez 5 dni.",
          "Fenoksymetylopenicylina doustnie przez 10 dni.",
          "Azytromycyna doustnie przez 3 dni.",
          "Cefuroksym aksetyl doustnie przez 7 dni.",
          "Kotrimoksazol doustnie przez 14 dni."
        ],
        correct: 1,
        explanation: "Lekiem pierwszego rzutu w zakażeniach wywołanych przez Streptococcus pyogenes (w tym w płonicy) jest fenoksymetylopenicylina podawana doustnie przez 10 dni. Wszelkie szczepy GAS wykazują 100% wrażliwość na penicylinę. Utrzymanie pełnego 10-dniowego okresu leczenia jest niezbędne do pełnej eradykacji paciorkowca z gardła i zapobiegania powikłaniom nieropnym, w tym ostrej gorączce reumatycznej."
      },
      {
        question: "Wskaż cechę kliniczną charakteryzującą wysypkę w przebiegu płonicy (szkarlatyny):",
        options: [
          "Wykwity mają postać pęcherzyków na rumieniowym podłożu, przypominających krople rosy.",
          "Wysypka jest drobnoplamista, szorstka w dotyku (obraz 'papieru ściernego'), zagęszcza się w zgięciach stawowych tworząc linie Pastii, z wolnym od wykwitów trójkątem Fiłatowa.",
          "Wysypka jest gruboplamista, ciemnoczerwona i zlewa się ze sobą, schodząc od linii owłosienia głowy ku dołowi.",
          "Wysypka ma charakter pęcherzowo-ropny i pozostawia miodowożółte strupy.",
          "Wysypka ma postać rumienia wędrującego z centralnym przejaśnieniem."
        ],
        correct: 1,
        explanation: "Dla płonicy charakterystyczna jest drobnoplamista lub drobnogrudkowa wysypka, dająca wrażenie szorstkości skóry ('papier ścierny'). W naturalnych fałdach skórnych (zgięcia łokciowe, pachwiny) pod wpływem łamliwości naczyń wywołanej toksyną tworzą się linijne wybroczyny (linie Pastii). Skóra wokół ust i nosa pozostaje blada i wolna od wykwitów (trójkąt Fiłatowa)."
      },
      {
        question: "Dziecko z płonicą rozpoczęło przyjmowanie doustnej penicyliny. Po jakim czasie od pierwszej dawki antybiotyku pacjent przestaje być zakaźny dla innych dzieci w przedszkolu?",
        options: [
          "Po 2 godzinach.",
          "Po 24 godzinach prawidłowej antybiotykoterapii.",
          "Dopiero po zakończeniu 10-dniowej kuracji.",
          "Po ustąpieniu łuszczenia skóry na dłoniach i stopach.",
          "Dziecko nie jest zakaźne od momentu pojawienia się wysypki."
        ],
        correct: 1,
        explanation: "Zgodnie z zasadami epidemiologii i wytycznymi pediatrycznymi, chory na anginę paciorkowcową lub płonicę przestaje być źródłem zakażenia dla otoczenia po 24 godzinach od rozpoczęcia skutecznej antybiotykoterapii penicylinowej (przy braku leczenia zakaźność utrzymuje się przez 2–3 tygodnie)."
      }
    ],
    flashcards: [
      { q: "Jaki patogen i jakie toksyny wywołują płonicę (szkarlatynę)?", a: "Streptococcus pyogenes (GAS) wytwarzający pirogenne egzotoksyny paciorkowcowe (toksyny erytrogenne SpeA, SpeB, SpeC).", cat: "Pediatria" },
      { q: "Czym są linie Pastii w płonicy?", a: "To linijne wybroczyny w naturalnych fałdach skórnych (np. zgięcia łokci, pachy, pachwiny) na skutek łamliwości naczyń włosowatych.", cat: "Pediatria" },
      { q: "Czym jest trójkąt Fiłatowa?", a: "Blady obszar skóry wokół ust i nosa, wolny od wysypki płoniczej.", cat: "Pediatria" },
      { q: "Jaki jest lek z wyboru i czas trwania terapii w płonicy?", a: "Fenoksymetylopenicylina (penicylina V) doustnie przez pełne 10 dni.", cat: "Pediatria" },
      { q: "Kiedy występuje i jak wygląda łuszczenie naskórka po płonicy?", a: "W 2.–3. tygodniu choroby: otrębiaste na twarzy, drobnopłatkowe na tułowiu, grubopłatowe na dłoniach i stopach.", cat: "Pediatria" }
    ]
  },

  // 112: Ospa wietrzna (VZV)
  {
    id: 112,
    filename: "112_ospa_wietrzna_vzv.json",
    dept: "Pediatria",
    shortTitle: "3-letni chłopiec – Swędząca polimorficzna wysypka 'krople rosy', gorączka i powikłania skórne (Ospa wietrzna / Varicella)",
    diagnosisTitle: "Ospa wietrzna (Varicella) wywołana przez wirus ospy wietrznej i półpaśca (VZV) z wtórnym nadkażeniem bakteryjnym skóry",
    vitals: [
      { label: "HR", val: "120/min", sub: "Tachykardia gorączkowa", status: "warn" },
      { label: "BP", val: "90/55 mmHg", sub: "Prawidłowe", status: "ok" },
      { label: "SpO2", val: "99%", sub: "Prawidłowa", status: "ok" },
      { label: "RR", val: "22/min", sub: "Prawidłowa", status: "ok" },
      { label: "Temp", val: "38.6°C", sub: "Gorączka", status: "warn" }
    ],
    vitalsObj: { hr: 120, bp: "90/55", spo2: 99, rr: 22, temp: 38.6 },
    story: "3-letni nieszczepiony chłopiec został przyprowadzony do lekarza POZ z powodu silnie swędzącej wysypki obecnej na całym ciele oraz gorączki do 38.8°C od 3 dni. W wywiadzie: w przedszkolu przed 2 tygodniami panowała ospa wietrzna. W badaniu fizykalnym: na owłosionej skórze głowy, twarzy, tułowiu i kończynach widoczne są wykwity w różnym stadium rozwoju: rumieniowe plamki, grudki, pęcherzyki wypełnione przejrzystym płynem na rumieniowym podłożu ('krople rosy na płatkach róży'), krostki oraz przysychające brunatne strupki (tzw. polimorfizm wysypki / obraz 'gwiaździstego nieba'). Kilka wykwitów obecnych jest również na podniebieniu miękkim. Matka podaje, że dziecko intensywnie się drapie; w okolicy lędźwiowej jeden z pęcherzyków stał się bolesny, powiększony do 2 cm, z otaczającym go żywoczerwonym rumieniem, wzmożonym uciepleniem i ropną treścią pod strupem.",
    labs: [
      {
        category: "Ocena mikrobiologiczna i wirusologiczna",
        items: [
          { name: "Obraz kliniczny ospy wietrznej", val: "Klasyczny polimorfizm wykwitów (rozpoznanie kliniczne)", norm: "Prawidłowy", flag: "H" },
          { name: "Posiew z ropnego wykwitu w okolicy lędźwiowej", val: "Staphylococcus aureus (MSSA) wrażliwy na kloksacylinę", norm: "Jałowy", flag: "H" },
          { name: "PCR VZV z płynu pęcherzykowego (w przypadkach wątpliwych)", val: "Dodatni (obecny DNA VZV)", norm: "Ujemny", flag: "H" }
        ]
      },
      {
        category: "Morfologia krwi i wskaźniki zapalne",
        items: [
          { name: "Leukocyty (WBC)", val: "11.4 G/L", norm: "5.5–15.5 G/L", flag: "N" },
          { name: "Neutrofile", val: "62%", norm: "35–55%", flag: "H" },
          { name: "CRP", val: "28 mg/L (podwyższone wtórną infekcją)", norm: "< 5.0 mg/L", flag: "H" },
          { name: "Płytki krwi (PLT)", val: "210 G/L", norm: "150–450 G/L", flag: "N" }
        ]
      },
      {
        category: "Enzymy wątrobowe i parametry ogólne",
        items: [
          { name: "AspAT / AlAT", val: "32 / 24 IU/L", norm: "< 40 / < 35 IU/L", flag: "N" },
          { name: "Badanie ogólne moczu", val: "Prawidłowe, brak cech ZUM", norm: "Prawidłowe", flag: "N" }
        ]
      }
    ],
    steps: [
      {
        num: 1,
        title: "Identyfikacja wielopostaciowości wysypki",
        task: "Występowanie jednocześnie na skórze plamek, grudek, pęcherzyków ('kropli rosy') i strupków (tzw. obraz gwiaździstego nieba) na tułowiu i owłosionej skórze głowy jest charakterystyczne dla:",
        options: [
          { text: "Ospy wietrznej (varicella)", correct: true, feedback: "Prawidłowo! Rzutowy wysiew wykwitów w ospie wietrznej prowadzi do jednoczesnej obecności zmian w różnych stadiach rozwoju (polimorfizm wysypki). Wykwity zajmują również owłosioną skórę głowy i błony śluzowe." },
          { text: "Ospy prawdziwej (variola vera)", correct: false, feedback: "Błąd! W ospie prawdziwej wszystkie wykwity w danej okolicy ciała są w DOKŁADNIE TYM SAMYM stadium ewolucji (monomorfizm), a wysypka dominuje na twarzy i dystalnych częściach kończyn." },
          { text: "Choroby dłoni, stóp i jamy ustnej (HFMD)", correct: false, feedback: "Błąd! W HFMD wykwity pęcherzykowe lokalizują się głównie na podeszwach stóp i dłoniach, a nie na owłosionej skórze głowy." },
          { text: "Liszajca zakaźnego w postaci pęcherzowej", correct: false, feedback: "Liszajec to zakażenie bakteryjne ograniczone zwykle do twarzy/okolicy ust ze strupami miodowożółtymi, bez uogólnionego rzutu pęcherzykowego z gorączką." }
        ]
      },
      {
        num: 2,
        title: "Okres zakaźności ospy wietrznej",
        task: "Od kiedy i do jakiego momentu pacjent z ospą wietrzną jest zakaźny dla otoczenia?",
        options: [
          { text: "Od 1–2 dni przed pojawieniem się pierwszych wykwitów skórnych aż do przyschnięcia wszystkich pęcherzyków w strupki", correct: true, feedback: "Dokładnie tak! Zakaźność VZV zaczyna się 24-48h przed pojawieniem się wysypki i trwa do momentu, gdy ostatni pęcherzyk przekształci się w suchy strupek (zwykle około 6-7 dni od początku wysypki). Strupy nie są zakaźne!" },
          { text: "Zakaźność występuje wyłącznie w momencie odpadania suchych strupów", correct: false, feedback: "Błąd! Strupy nie zawierają zakaźnego wirusa." },
          { text: "Pacjent jest zakaźny tylko przez pierwsze 12 godzin gorączki", correct: false, feedback: "Niedoszacowanie okresu zakaźności." },
          { text: "Wirus nie przenosi się między dziećmi", correct: false, feedback: "VZV jest jednym z najbardziej zakaźnych wirusów (transmisja kropelkowa i powietrzna)." }
        ]
      },
      {
        num: 3,
        title: "Kluczowy zakaz farmakologiczny: kwas acetylosalicylowy i ibuprofen",
        task: "Dlaczego u dzieci z ospą wietrzną bezwzględnie ZAKAZANE jest stosowanie aspiryny, a odradza się stosowanie ibuprofenu?",
        options: [
          { text: "Aspiryna grozi śmiertelnym zespołem Reye'a, natomiast ibuprofen i NLPZ zwiększają ryzyko ciężkich martwiczych zakażeń bakteryjnych skóry i tkanek miękkich (w tym martwiczego zapalenia powięzi)", correct: true, feedback: "Kluczowy punkt LEK! Kwas acetylosalicylowy (aspiryna) w infekcjach VZV i grypie wywołuje encefalopatię i stłuszczenie wątroby (zespół Reye'a). Z kolei NLPZ (ibuprofen) w ospie wiążą się ze zwiększonym ryzykiem rozwoju paciorkowcowej i gronkowcowej martwicy skóry/powięzi (fasciitis necroticans). Jedynym bezpiecznym lekiem przeciwgorączkowym z wyboru jest PARACETAMOL!" },
          { text: "Aspiryna powoduje natychmiastowe wypadanie zębów mlecznych", correct: false, feedback: "Nonsens medyczny." },
          { text: "Ibuprofen nasila świąd wywołując pokrzywkę barwnikową", correct: false, feedback: "To nie jest powód ostrzeżenia klinicznego." },
          { text: "NLPZ neutralizują przeciwciała przeciwko VZV", correct: false, feedback: "Nieprawda." }
        ]
      },
      {
        num: 4,
        title: "Rozpoznanie i leczenie powikłania bakteryjnego",
        task: "Bolesny, powiększony do 2 cm wykwit w okolicy lędźwiowej z żywoczerwonym obrzękiem i ropą to wtórne bakteryjne nadkażenie skóry (cellulitis / zliszajcowacenie wywołane przez S. aureus lub S. pyogenes). Jakie leczenie wdrożysz?",
        options: [
          { text: "Miejscowa i ogólna antybiotykoterapia przeciwgronkowcowa (np. cefaleksyna lub kloksacylina p.o., a miejscowo mupirocyna)", correct: true, feedback: "Znakomicie! Wtórne infekcje bakteryjne skóry (wywołane przez drapanie brudnymi rękami) są najczęstszym powikłaniem ospy wietrznej u dzieci. Wymagają antybiotyku aktywnego wobec S. aureus i S. pyogenes (kloksacylina, cefalosporyna I gen. lub amoksycylina z kwasem klawulanowym)." },
          { text: "Smarowanie wykwitu płynnym pudrem z cynkiem (Puderrocyna)", correct: false, feedback: "Błąd kardynalny! Stosowanie papek i płynnych pudrów wysuszających jest WSPÓŁCZEŚNIE ZAKAZANE w ospie wietrznej, ponieważ sprzyja tworzeniu środowiska beztlenowego i ciężkim zakażeniom bakteryjnym!" },
          { text: "Podanie dożylne amfoterycyny B", correct: false, feedback: "Błąd – to lek przeciwgrzybiczy." },
          { text: "Nacięcie chirurgiczne bez antybiotykoterapii", correct: false, feedback: "Nie ma uformowanego głębokiego ropnia, nacięcie bez antybiotyku grozi uogólnieniem infekcji." }
        ]
      },
      {
        num: 5,
        title: "Wskazania do leczenia acyklowirem u dzieci",
        task: "Czy u 3-letniego dotychczas zdrowego dziecka z niepowikłaną ospą wietrzną wskazane jest rutynowe włączenie acyklowiru doustnie?",
        options: [
          { text: "Nie – u zdrowych dzieci do 12. r.ż. ospa wietrzna przebiega łagodnie i acyklowir nie jest rutynowo zalecany; wskazaniem do acyklowiru jest wiek >12 lat, przewlekłe choroby skóry (AZS), płuc, terapia sterydowa lub niedobory odporności", correct: true, feedback: "Doskonale! Zgodnie z wytycznymi AAP i PTMR, rutynowe podawanie acyklowiru u zdrowych małych dzieci nie jest rekomendowane. Acyklowir włącza się u osób z grup wysokiego ryzyka powikłań: niemowlęta, młodzież >12 r.ż., dorośli, pacjenci z AZS, przewlekłymi chorobami płuc, leczeni przewlekle salicylanami oraz osoby z immunosupresją (wtedy i.v.)." },
          { text: "Tak – acyklowir musi otrzymać każde dziecko bez względu na wiek w ciągu 5 minut od gorączki", correct: false, feedback: "Błąd! Nie ma takich rekomendacji." },
          { text: "Acyklowir podaje się wyłącznie po 10. dobie choroby", correct: false, feedback: "Błąd – jeśli acyklowir ma zadziałać, musi być podany w ciągu pierwszych 24–48 godzin od pojawienia się wysypki." },
          { text: "Acyklowir jest bezwzględnie nieskuteczny wobec VZV", correct: false, feedback: "Nieprawda – VZV koduje kinazę tymidynową wrażliwą na acyklowir." }
        ]
      },
      {
        num: 6,
        title: "Pielęgnacja skóry i łagodzenie świądu",
        task: "Jakie są prawidłowe, współczesne zalecenia pielęgnacyjne w ospie wietrznej?",
        options: [
          { text: "Codzienne krótkie kąpiele w letniej wodzie (np. z dodatkiem nadmanganianu potasu), delikatne osuszanie skóry ręcznikiem jednorazowym (bez tarcia), obcięcie paznokci na krótko oraz doustne leki przeciwhistaminowe I generacji (np. hydroksyzyna, dimetinden)", correct: true, feedback: "Świetnie! Mit 'zakazu kąpieli' w ospie jest niebezpieczny – brak higieny sprzyja zakażeniom bakteryjnym skóry. Krótka kąpiel oczyszcza skórę. Leki przeciwhistaminowe i obcięcie paznokci zapobiegają drapaniu." },
          { text: "Bezwzględny zakaz mycia dziecka przez 3 tygodnie", correct: false, feedback: "Przestarzały, szkodliwy mit medyczny sprzyjający zakażeniom gronkowcowym!" },
          { text: "Nacieranie całego ciała spirytusem salicylowym", correct: false, feedback: "Okrutne i niebezpieczne – bolesne podrażnienie i wchłanianie alkoholu." },
          { text: "Szczelne owijanie folią spożywczą", correct: false, feedback: "Błąd nasilający macerację i rozwój bakterii beztlenowych." }
        ]
      },
      {
        num: 7,
        title: "Powikłania neurologiczne ospy wietrznej",
        task: "U 5-letniego dziecka w 7. dobie ospy wietrznej pojawia się chwiejny chód, oczopląs, zaburzenia równowagi i dyzartria, bez gorączki i bez objawów oponowych. Jakie jest najbardziej prawdopodobne powikłanie?",
        options: [
          { text: "Ostre zapalenie móżdżku (cerebellitis acuta) – łagodne, samoistnie ustępujące powikłanie ospy", correct: true, feedback: "Bardzo dobrze! Ostre poinfekcyjne zapalenie móżdżku (ataksja móżdżkowa) jest najczęstszym powikłaniem neurologicznym ospy u dzieci. Występuje zwykle pod koniec 1. lub w 2. tygodniu choroby i ma pomyślne rokowanie (ustępuje samoistnie w ciągu kilku tygodni)." },
          { text: "Udar krwotoczny mózgu", correct: false, feedback: "Niezwykle rzadki, objawiałby się nagłym niedowładem połowiczym." },
          { text: "Złamanie obu kości udowych", correct: false, feedback: "Niedorzeczne rozpoznanie." },
          { text: "Guz rdzenia kręgowego", correct: false, feedback: "Objawy guza narastają tygodniami/miesiącami, a nie nagle w trakcie ospy." }
        ]
      },
      {
        num: 8,
        title: "Profilaktyka poekspozycyjna ospy wietrznej",
        task: "Nieszczepiona 28-letnia ciężarna w 14. tygodniu ciąży bez przebytej ospy w wywiadzie miała bliski kontakt z chorym synem. Jakie postępowanie profilaktyczne poekspozycyjne jest bezwzględnie wskazane?",
        options: [
          { text: "Podanie swoistej immunoglobuliny przeciw VZV (VZIG / Varitect) domięśniowo lub dożylnie w ciągu do 96 godzin (maks. do 10 dni) od kontaktu", correct: true, feedback: "Znakomicie! U osób podatnych z grup wysokiego ryzyka (kobiety w ciąży bez odporności, noworodki matek, które zachorowały na ospę w okresie 5 dni przed do 2 dni po porodzie, osoby z ciężkim niedoborem odporności) metodą z wyboru jest podanie swoistej immunoglobuliny VZIG w celu zapobieżenia ospie wrodzonej i ciężkiemu przebiegowi." },
          { text: "Podanie żywej szczepionki przeciw ospie wietrznej", correct: false, feedback: "Błąd kardynalny! Żywa szczepionka przeciw ospie jest BEZWZGLĘDNIE PRZECIWWSKAZANA w ciąży!" },
          { text: "Podanie penicyliny fenoksymetylowej", correct: false, feedback: "Penicylina nie działa na wirusy." },
          { text: "Wykonanie cięcia cesarskiego w 14. tygodniu", correct: false, feedback: "Niedorzeczne i niewykonalne w 14. hbd." }
        ]
      }
    ],
    pathoNodes: [
      {
        title: "1. Transmisja oddechowa i pierwotna wiremia VZV",
        desc: "Wirus ospy wietrznej i półpaśca (VZV, Herpesviridae) wnika przez błonę śluzową górnych dróg oddechowych, namnaża się w migdałkach i węzłach chłonnych, po czym przez układ siateczkowo-śródbłonkowy wywołuje wiremię.",
        drugTarget: "Profilaktyka pierwotna: 2 dawki żywej atenuowanej szczepionki przeciw ospie wietrznej"
      },
      {
        title: "2. Wtórna wiremia i rzutowy wysiew do naskórka",
        desc: "Komórki jednojądrzaste transportują wirus do śródbłonka naczyń skóry i keratynocytów, wywołując zwyrodnienie balonowate komórek naskórka, powstawanie pęcherzyków śródnaskórkowych i intensywny świąd.",
        drugTarget: "Leczenie przeciwhistaminowe I gen. (hydroksyzyna) oraz acyklowir w grupach ryzyka"
      },
      {
        title: "3. Latencja w zwojach czuciowych i ryzyko reaktywacji",
        desc: "Po ustąpieniu wysypki VZV przemieszcza się wstecznie wzdłuż nerwów czuciowych do zwojów korzeni grzbietowych (DRG) i zwoju Gassera, gdzie pozostaje w stanie uśpienia do końca życia (reaktywacja = półpasiec).",
        drugTarget: "Prawidłowa toaleta skóry (kąpiele, obcięcie paznokci, unikanie papek z cynkiem zapobiegające nadkażeniom bakteryjnym)"
      }
    ],
    dutySummary: "Ospa wietrzna (VZV) to wysoce zakaźna choroba z polimorfizmem wysypki (plamka, grudka, pęcherzyk 'kropla rosy', strupek) i zajęciem owłosionej skóry głowy. Zakaźność: 1-2 dni przed wysypką do przyschnięcia wszystkich strupków. Kwas acetylosalicylowy jest ZAKAZANY (zespół Reye'a), unikaj ibuprofenu (martwicze zapalenie powięzi). Stosuj paracetamol, krótkie kąpiele i leki przeciwhistaminowe. U nieszczepionych ciężarnych po kontakcie: podaj VZIG do 96h.",
    diffTable: [
      { disease: "Ospa prawdziwa (variola vera)", diff: "Śmiertelna choroba eradykowana; monomorfizm wysypki (wszystkie zmiany w tej samej fazie), lokalizacja odśrodkowa (twarz, ręce, stopy), brak na tułowiu.", test: "Monomorfizm vs polimorfizm, wywiad epidemiologiczny." },
      { disease: "Choroba dłoni, stóp i jamy ustnej (HFMD)", diff: "Pęcherzyki podłużne na dłoniach, podeszwach i afty w jamie ustnej; brak wykwitów na owłosionej skórze głowy, łagodniejszy świąd.", test: "Lokalizacja zmian, brak zmian na owłosionej skórze głowy." },
      { disease: "Uogólnione zakażenie wirusem opryszczki (Eczema herpeticum)", diff: "Występuje u dzieci z atopowym zapaleniem skóry; skupiska drobnych pęcherzyków z pępkowatym zagłębieniem w miejscach zmian atopowych.", test: "Wymaz w kierunku HSV-1 PCR, obecność AZS." },
      { disease: "Liszajec pęcherzowy (Impetigo bullosa)", diff: "Etiologia bakteryjna (S. aureus, toksyna eksfoliatywna); wiotkie pęcherze pękające z tworzeniem miodowożółtych strupów, brak uogólnionego rzutu.", test: "Posiew bakteriologiczny ze zmian, brak świądu uogólnionego." }
    ],
    lekQuestions: [
      {
        question: "U 4-letniego dziecka z rozpoznaną ospą wietrzną i gorączką 39°C matka pyta o bezpieczny lek przeciwgorączkowy. Którego z poniższych leków należy BEZWZGLĘDNIE UNIKAĆ ze względu na ryzyko zespołu Reye'a?",
        options: [
          "Paracetamolu.",
          "Kwasu acetylosalicylowego.",
          "Cefaleksyny.",
          "Acyklowiru.",
          "Hydroksyzyny."
        ],
        correct: 1,
        explanation: "Stosowanie kwasu acetylosalicylowego (aspiryny) oraz innych salicylanów u dzieci w przebiegu infekcji wirusowych (zwłaszcza ospy wietrznej oraz grypy) wiąże się z wysokim ryzykiem rozwoju zespołu Reye'a – ostrej, zagrażającej życiu encefalopatii połączonej ze stłuszczeniem wątroby i niewydolnością wielonarządową. Jedynym w pełni bezpiecznym lekiem przeciwgorączkowym z wyboru w ospie jest paracetamol."
      },
      {
        question: "Wskaż cechę kliniczną odróżniającą wysypkę w ospie wietrznej od wysypki w ospie prawdziwej:",
        options: [
          "W ospie wietrznej wykwity mają charakter monomorficzny, podczas gdy w ospie prawdziwej – polimorficzny.",
          "W ospie wietrznej występuje polimorfizm wykwitów (równoczesna obecność plamek, pęcherzyków i strupków) oraz zajęcie owłosionej skóry głowy.",
          "W ospie wietrznej wykwity lokalizują się wyłącznie na podeszwach stóp i dłoniach.",
          "Ospa wietrzna nie powoduje powstawania pęcherzyków z płynem.",
          "Wirus ospy wietrznej nigdy nie wywołuje świądu skóry."
        ],
        correct: 1,
        explanation: "Dla ospy wietrznej charakterystyczny jest tzw. polimorfizm wysypki (obraz 'gwiaździstego nieba'): rzutowy charakter wysiewu sprawia, że w tym samym czasie na skórze widoczne są plamki, grudki, pęcherzyki ('krople rosy') i przysychające strupki. Wykwity zajmują tułów, twarz, owłosioną skórę głowy i błony śluzowe. W ospie prawdziwej (eradykowanej) wszystkie wykwity były w tym samym stadium (monomorfizm) i dominowały na twarzy i dystalnych częściach kończyn."
      },
      {
        question: "Nieszczepiona 26-letnia kobieta w 10. tygodniu ciąży, która nigdy nie chorowała na ospę wietrzną, miała bezpośredni kontakt z dzieckiem chorym na ospę wietrzną 48 godzin temu. Jakie jest prawidłowe postępowanie profilaktyczne poekspozycyjne?",
        options: [
          "Podanie żywej atenuowanej szczepionki przeciw ospie wietrznej.",
          "Podanie swoistej immunoglobuliny przeciwko wirusowi ospy wietrznej i półpaśca (VZIG) domięśniowo lub dożylnie w ciągu do 96 godzin od kontaktu.",
          "Zastosowanie doustnej amoksycyliny przez 14 dni.",
          "Zalecenie natychmiastowej izolacji bez jakiejkolwiek interwencji farmakologicznej.",
          "Wdrożenie chemioterapii przeciwwirusowej gancyklowirem."
        ],
        correct: 1,
        explanation: "Żywa szczepionka przeciwko ospie wietrznej jest bezwzględnie przeciwwskazana u kobiet w ciąży (ryzyko teratogenności). Dlatego u podatnych na zakażenie kobiet w ciąży po ekspozycji na VZV jedyną skuteczną i bezpieczną metodą profilaktyki poekspozycyjnej jest podanie swoistej immunoglobuliny przeciw VZV (VZIG) w ciągu do 96 godzin (optymalnie) do maksymalnie 10 dni od kontaktu."
      }
    ],
    flashcards: [
      { q: "Na czym polega polimorfizm wysypki w ospie wietrznej?", a: "Równoczesna obecność na skórze wykwitów w różnym stadium rozwoju: plamki, grudki, pęcherzyki ('krople rosy na płatkach róży') i strupki (obraz 'gwiaździstego nieba').", cat: "Pediatria" },
      { q: "Jaki jest okres zakaźności chorego na ospę wietrzną?", a: "Od 1–2 dni przed pojawieniem się wysypki do przyschnięcia wszystkich pęcherzyków w strupki.", cat: "Pediatria" },
      { q: "Dlaczego w ospie wietrznej zakazany jest kwas acetylosalicylowy i odradzany ibuprofen?", a: "Aspiryna grozi śmiertelnym zespołem Reye'a; ibuprofen zwiększa ryzyko martwiczych zakażeń bakteryjnych tkanek miękkich.", cat: "Pediatria" },
      { q: "Jakie jest najczęstsze powikłanie neurologiczne ospy wietrznej u dzieci?", a: "Ostre poinfekcyjne zapalenie móżdżku (ataksja móżdżkowa, zaburzenia chodu i równowagi), z reguły samoistnie ustępujące.", cat: "Pediatria" },
      { q: "Co podaje się nieszczepionej ciężarnej bez odporności po kontakcie z chorym na ospę?", a: "Swoistą immunoglobulinę przeciw VZV (VZIG) do 96 godzin od ekspozycji (szczepionka żywa jest bezwzględnie przeciwwskazana w ciąży).", cat: "Pediatria" }
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
  console.log('Batch 111-112 finished successfully.');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});

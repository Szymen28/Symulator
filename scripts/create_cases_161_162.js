const fs = require('fs');
const path = require('path');
const { encryptStringAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

const casesData = [
  // =========================================================================
  // CASE 161: Zespół Wallenberga (PICA)
  // =========================================================================
  {
    id: 161,
    file: "161_zespol_wallenberga_pica.json",
    shortTitle: "Zespół Wallenberga (PICA)",
    title: "Udar Niedokrwienny Pnia Mózgu: Boczny Zespół Opuszki (Zespół Wallenberga)",
    dept: "Neurologia",
    diagnosisTitle: "Zawał Bocznej Części Opuszki w dorzeczu Tętnicy Tylnej Dolnej Móżdżku (PICA) – Zespół Wallenberga",
    vitals: [
      { label: "Ciśnienie tętnicze (RR)", val: "170/100", unit: "mmHg", status: "vital-warn" },
      { label: "Częstość akcji serca (HR)", val: "82", unit: "/min", status: "vital-ok" },
      { label: "Częstość oddechów (RR)", val: "18", unit: "/min", status: "vital-ok" },
      { label: "Saturacja (SpO2)", val: "96", unit: "%", status: "vital-ok" },
      { label: "Temperatura ciała", val: "36.9", unit: "°C", status: "vital-ok" }
    ],
    story: "<p><strong>Pacjent:</strong> 56-letni mężczyzna przywieziony na SOR z powodu nagłych, gwałtownych zawrotów głowy z nudnościami i zaburzeniami połykania.</p><p><strong>Wywiad chorobowy:</strong> Objawy wystąpiły 90 minut temu podczas śniadania. Pacjent poczuł silne wirowanie otoczenia (vertigo), wystąpiły obfite wymioty oraz niemożność utrzymania równowagi z przewracaniem się na prawą stronę. Dodatkowo pojawiła się chrypka, trudności z połykaniem śliny (dysfagia) oraz uczucie drętwienia prawej połowy twarzy. W wywiadzie: nikotynizm, nadciśnienie tętnicze i hiperlipidemia.</p><p><strong>Badanie przedmiotowe:</strong> Pacjent zdezorientowany przestrzennie, wymiotujący, z zamkniętymi oczami. W badaniu neurologicznym: oczopląs poziomo-obrotowy nasilający się przy patrzeniu w prawo. Po stronie prawej: opadnięcie powieki, zwężenie źrenicy i zapadnięcie gałki ocznej (zespół Hornera prawostronny), zniesienie czucia bólu i temperatury na twarzy (uszkodzenie nerwu V), osłabienie odruchu rogówkowego, opadnięcie prawego łuku podniebiennego i brak odruchu wymiotnego po prawej stronie (uszkodzenie nerwów IX i X), ataksja prawych kończyn (dysmetria w próbie palec-nos). Po stronie lewej: zniesienie czucia bólu i temperatury na tułowiu i kończynach (naprzemienny zespół czuciowy!). Siła mięśniowa w kończynach prawidłowa (brak niedowładu!).</p>",
    steps: [
      {
        title: "Krok 1: Rozpoznanie naprzemiennego zespołu pniowego i badanie obrazowe z wyboru",
        scenario: "Pacjent prezentuje klasyczny naprzemienny boczny zespół opuszki (zespół Wallenberga). Zwykła TK głowy w pierwszych godzinach udaru pnia mózgu jest w ponad 80% ujemna ze względu na artefakty kostne dołu tylnego. Jakie badanie neuroobrazowe jest metodą z wyboru w celu potwierdzenia świeżego ogniska zawałowego?",
        options: [
          {
            text: "Rezonans magnetyczny (MRI) mózgowia z sekwencją dyfuzyjną (DWI) oraz badaniem naczyniowym (Angio-MRI/Angio-TK tętnic kręgowych)",
            correct: true,
            isCorrect: true,
            feedback: "✅ PRAWIDŁOWO! MRI w sekwencji DWI jest złotym standardem detekcji niedokrwienia pnia mózgu i móżdżku (dół tylny czaszki jest słabo widoczny w TK z powodu artefaktów od piramid kości skroniowych). Ocena naczyń pozwala wykryć zamknięcie tętnicy PICA lub rozwarstwienie tętnicy kręgowej."
          },
          {
            text: "Powtórzenie przeglądowej TK głowy co 30 minut aż do momentu uwidocznienia ogniska martwicy",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Wielokrotne powtarzanie TK bezcelowo naraża pacjenta na promieniowanie i opóźnia leczenie."
          },
          {
            text: "Wykonanie próby kalorycznej błędnika zimną i ciepłą wodą na sali ratunkowej",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Próba kaloryczna w ostrej fazie udaru pnia jest niewskazana i nasili męczące wymioty."
          },
          {
            text: "Zlecenie RTG kręgosłupa szyjnego w projekcji czynnościowej zginania i prostowania",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Badania czynnościowe szyi mogą pogłębić ewentualne rozwarstwienie tętnicy kręgowej."
          }
        ]
      },
      {
        title: "Krok 2: Kwalifikacja do leczenia reperfuzyjnego (okno czasowe)",
        scenario: "Pacjent trafił do szpitala w 100. minucie od wystąpienia objawów. W badaniu wykluczono krwawienie śródczaszkowe. Ciśnienie tętnicze wynosi 170/100 mmHg, glikemia 125 mg/dl, brak przeciwwskazań. Jakie leczenie reperfuzyjne należy wdrożyć natychmiast?",
        options: [
          {
            text: "Dożylna tromboliza alteplazą (rt-PA) w dawce 0,9 mg/kg m.c. (10% bolus, 90% we wlewie 60-minutowym) w oknie do 4,5 godziny",
            correct: true,
            isCorrect: true,
            feedback: "✅ PRAWIDŁOWO! Udar pnia mózgu w oknie czasowym do 4,5 godziny od początku objawów bez przeciwwskazań kwalifikuje się do natychmiastowego leczenia trombolitycznego rt-PA. W razie współistnienia niedrożności dużej tętnicy (np. t. kręgowej lub podstawnej) rozważa się trombektomię mechaniczną."
          },
          {
            text: "Podanie dożylnego bolusu heparyny niefrakcjonowanej 10 000 j.m. bez kwalifikacji do trombolizy",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Pełnodawkowa heparyna w ostrej fazie udaru niedokrwiennego nie poprawia rokowania i zwiększa ryzyko krwawień."
          },
          {
            text: "Oczekiwanie 24 godziny na samoistną rekanalizację naczynia pod osłoną wlewów z glukozy 5%",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Zwłoka w oknie trombolitycznym prowadzi do utrwalenia nieodwracalnego inwalidztwa."
          },
          {
            text: "Podanie dożylne wlewu z mannitolu jako jedynej formy terapii przyczynowej",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Mannitol nie rozpuszcza skrzepliny i nie jest lekiem reperfuzyjnym."
          }
        ]
      },
      {
        title: "Krok 3: Zabezpieczenie przed zachłystowym zapaleniem płuc (bezwzględny priorytet)",
        scenario: "Ze względu na porażenie nerwów czaszkowych IX i X (nerw językowo-gardłowy i błędny) pacjent ma zniesiony odruch połykania i odruch wymiotny. Położna pyta o podanie doustnych leków i herbaty. Jaka jest bezwzględna decyzja lekarska?",
        options: [
          {
            text: "Całkowity zakaz podawania czegokolwiek drogą doustną (reżim 'nic doustnie' / NPO), pilne założenie zgłębnika nosowo-żołądkowego pod kontrolą wzroku i formalna ocena dysfagii",
            correct: true,
            isCorrect: true,
            feedback: "✅ PRAWIDŁOWO! Uszkodzenie jądra dwuznacznego (nucleus ambiguus) nerwów IX i X w zespole Wallenberga wywołuje ciężką dysfagię. Podanie płynów lub leków p.o. prowadzi do natychmiastowej aspiracji do drzewa oskrzelowego, zachłystowego zapalenia płuc i zgonu. Założenie sondy żołądkowej jest procedurą ratującą życie."
          },
          {
            text: "Zezwolenie na picie płynów przez słomkę w pozycji leżącej na płasko",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Płyny podane w pozycji leżącej trafią bezpośrednio do tchawicy i płuc."
          },
          {
            text: "Podanie pacjentowi sucharków do żucia w celu rehabilitacji mięśni żwaczy",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Chory z porażeniem podniebienia zadławi się cząstkami stałymi."
          },
          {
            text: "Wymuszenie połykania tabletek z dużą ilością wody gazowanej",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Woda gazowana wywoła skurcz krtani i aspirację do płuc."
          }
        ]
      },
      {
        title: "Krok 4: Wtórna prewencja i postępowanie w rozwarstwieniu tętnicy kręgowej",
        scenario: "W badaniu Angio-MRI uwidoczniono obraz 'podwójnego światła' i krwiak śródścienny w prawej tętnicy kręgowej, co potwierdza jej rozwarstwienie (dissectio arteriae vertebralis) po gwałtownym skręcie szyi. Jakie leczenie farmakologiczne zalecają wytyczne neurologiczne?",
        options: [
          {
            text: "Wdrożenie leczenia przeciwkrzepliwego (antykoagulacja heparyną/NOAC) LUB leczenia przeciwpłytkowego (ASA) przez okres co najmniej 3–6 miesięcy pod kontrolą naczyniową",
            correct: true,
            isCorrect: true,
            feedback: "✅ PRAWIDŁOWO! W rozwarstwieniu tętnic szyjnych i kręgowych (badanie CADISS) leczenie przeciwpłytkowe i antykoagulacyjne wykazują porównywalną skuteczność w zapobieganiu nawrotom zatorowości atero-embolicznej. Terapię prowadzi się przez 3–6 miesięcy do czasu zagojenia ściany naczynia."
          },
          {
            text: "Natychmiastowe chirurgiczne podwiązanie obu tętnic kręgowych na poziomie kręgu C2",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Podwiązanie tętnic kręgowych doprowadzi do całkowitego niedokrwienia pnia mózgu i zgonu."
          },
          {
            text: "Zastosowanie masaży kręgosłupa szyjnego z gwałtownymi manipulacjami rotacyjnymi głowy",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Manipulacje kręgarskie szyi są jedną z głównych przyczyn rozwarstwienia tętnic i są bezwzględnie zakazane."
          },
          {
            text: "Zalecenie całkowitego unieruchomienia pacjenta w gipsowym gorsecie na okres 5 lat",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Długotrwałe unieruchomienie nie ma uzasadnienia medycznego i grozi zakrzepicą żył głębokich."
          }
        ]
      }
    ],
    pathoNodes: [
      {
        title: "Zamknięcie tętnicy PICA lub tętnicy kręgowej",
        desc: "Boczna część opuszki (rdzenia przedłużonego) jest unaczyniona przez tętnicę tylną dolną móżdżku (PICA) lub bezpośrednie gałęzie tętnicy kręgowej.",
        detail: "Zakrzepica miażdżycowa, zator sercowopochodny lub rozwarstwienie ściany tętnicy kręgowej odcina dopływ krwi do struktur bocznego pola opuszki, powodując zawał niedokrwienny.",
        target: "Punkt uchwytu leczenia: Rekanalizacja farmakologiczna alteplazą (rt-PA) w oknie do 4,5h oraz leczenie p-płytkowe / antykoagulacyjne."
      },
      {
        title: "Uszkodzenie jąder i dróg nerwowych pnia mózgu",
        desc: "Niewielkie anatomicznie ognisko zawału niszczy kluczowe struktury skupione na małej przestrzeni opuszki.",
        detail: "1. Jądro dwuznaczne (n. IX, X) -> dysfagia, dyzartria, opadnięcie podniebienia;\n2. Jądro i pasmo rdzeniowe nerwu trójdzielnego (n. V) -> utrata czucia bólu/temp. na tożstronnej twarzy;\n3. Wstępujący szlak współczulny -> tożstronny zespół Hornera;\n4. Dolny konar móżdżku -> tożstronna ataksja i zbaczanie;\n5. Jądra przedsionkowe -> gwałtowne vertigo i oczopląs.",
        target: "Punkt uchwytu leczenia: Reżim NPO, zgłębnik żołądkowy, intensywna wczesna neurorehabilitacja logopedyczna."
      },
      {
        title: "Naprzemienny zespół czuciowy (rozszczepienie pniowe)",
        desc: "Zajęcie szlaku rdzeniowo-wzgórzowego bocznego przy jednoczesnym uszkodzeniu pasma nerwu V.",
        detail: "Szlak rdzeniowo-wzgórzowy przewodzi czucie bólu i temperatury ze skrzyżowanych dróg z przeciwległej połowy ciała (stąd ubytek po stronie przeciwnej do ogniska), natomiast pasmo n. V nie jest jeszcze skrzyżowane (stąd ubytek na twarzy po stronie ogniska).",
        target: "Punkt uchwytu diagnostyki: Dokładne badanie czucia bólu i temperatury igłą/probówkami termicznymi różnicujące udar pnia od kory."
      }
    ],
    dutySummary: {
      overview: "Zespół Wallenberga (boczny zespół opuszki) to klasyczny udar pnia mózgu w dorzeczu tętnicy PICA lub tętnicy kręgowej. Cechuje się naprzemiennym zespołem czuciowym (tożstronne zniesienie czucia na twarzy i przeciwstronne na ciele), tożstronnym zespołem Hornera, ataksją móżdżkową oraz dysfagią i chrypką. Siła mięśniowa jest zazwyczaj zachowana.",
      diagnostics: "1. Rezonans magnetyczny (MRI) głowy z sekwencją DWI – badanie z wyboru (TK często fałszywie ujemna w dole tylnym).\n\n2. Angio-TK lub Angio-MRI tętnic szyjnych i kręgowych – poszukiwanie rozwarstwienia tętnicy kręgowej lub zatoru PICA.\n\n3. Ocena połykania przy łóżku chorego – bezwzględny test przed podaniem jakichkolwiek płynów/leków p.o.!\n\n4. Monitorowanie kardiologiczne (Holter EKG, echo serca) w celu poszukiwania zatorowości sercopochodnej.",
      drugsAndDoses: "• Faza ostra (<4,5h): <span class=\"dose-pill\">Alteplaza (rt-PA): 0,9 mg/kg m.c. dożylnie</span> (maks. 90 mg; 10% dawki w bolusie w 1 min, reszta we wlewie 60-minutowym).\n• Prewencja wtórna po wykluczeniu krwawienia: <span class=\"dose-pill\">Kwas acetylosalicylowy: 150–300 mg/dobę</span> lub klopidogrel 75 mg/dobę.\n• W razie rozwarstwienia naczynia: <span class=\"dose-pill\">Heparyna drobnocząsteczkowa lub ASA</span> przez 3–6 miesięcy.\n• Leki przeciwwymiotne i przeciwwzawrotowe w ostrej fazie: <span class=\"dose-pill\">Ondansetron: 4–8 mg i.v.</span> lub tietylperazyna (Torecan) 6,5 mg i.m.",
      procedures: "Natychmiastowe założenie zgłębnika nosowo-żołądkowego (reżim NPO w celu prewencji aspiracji), zabezpieczenie drożności dróg oddechowych, unikanie gwałtownych ruchów głową, wczesna rehabilitacja ruchowa i logopedyczna.",
      monitoring: "Nadzór na Oddziale Udarowym: monitorowanie parametrów życiowych, saturacji, rytmu serca, dynamiki objawów opuszkowych (zagrożenie zaburzeniami rytmu oddechowego w zawałach pnia mózgu)."
    },
    diffTable: {
      title: "⚔️ Tabela Różnicowa: Zespół Wallenberga vs Łagodne Położeniowe Zawroty Głowy (BPPV) vs Zapalenie Nerwu Przedsionkowego vs Udar Półkulowy MCA",
      headers: ["Cecha kliniczna", "Zespół Wallenberga (PICA)", "BPPV (Kamicowa)", "Zapalenie Nerwu Przedsionkowego", "Udar Półkulowy (MCA)"],
      rows: [
        ["Typ zawrotów głowy", "Ciągłe, silne vertigo z wymiotami", "Krótkie epizody (<1 min) po zmianie pozycji", "Ciągłe silne vertigo trwające kilka dni", "Rzadko zawroty, głównie zaburzenia widzenia"],
        ["Deficyt czuciowy", "NAPRZEMIENNY: twarz tożstronnie, ciało przeciwstronnie", "Brak jakichkolwiek zaburzeń czucia", "Brak zaburzeń czucia", "Jednostronny połowiczy ubytek czucia (twarz + ciało)"],
        ["Zespół Hornera", "Obecny po stronie zawału (tożstronny)", "Nieobecny", "Nieobecny", "Nieobecny"],
        ["Połykanie i mowa", "Ciężka dysfagia, chrypka, opadnięcie podniebienia", "Prawidłowe", "Prawidłowe", "Afazja lub dyzartria, połykanie zmienne"],
        ["Niedowład kończyn", "BRAK niedowładu (siła 5/5, obecna ataksja)", "Brak niedowładu", "Brak niedowładu", "Porażenie połowicze (hemiplegia)"],
        ["Badanie neuroobrazowe", "Świeże ognisko w MRI DWI w bocznej opuszce", "Prawidłowe", "Prawidłowe", "Ognisko zawałowe w półkuli mózgu"]
      ]
    },
    lekQuestions: [
      {
        q: "Które z poniższych naczyń tętniczych mózgowia ulega NAJCZĘŚCIEJ zamknięciu w przebiegu klasycznego bocznego zespołu opuszki (zespołu Wallenberga)?",
        question: "Które z poniższych naczyń tętniczych mózgowia ulega NAJCZĘŚCIEJ zamknięciu w przebiegu klasycznego bocznego zespołu opuszki (zespołu Wallenberga)?",
        opts: [
          "A) Tętnica tylna dolna móżdżku (PICA) lub tętnica kręgowa",
          "B) Tętnica łącząca przednia (AComA)",
          "C) Tętnica naczyniówkowa przednia",
          "D) Główny pień tętnicy środkowej mózgu (MCA)",
          "E) Tętnica oponowa środkowa"
        ],
        options: [
          "A) Tętnica tylna dolna móżdżku (PICA) lub tętnica kręgowa",
          "B) Tętnica łącząca przednia (AComA)",
          "C) Tętnica naczyniówkowa przednia",
          "D) Główny pień tętnicy środkowej mózgu (MCA)",
          "E) Tętnica oponowa środkowa"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Zespół Wallenberga (boczny zespół opuszki) jest najczęściej wywołany zakrzepicą lub rozwarstwieniem tętnicy kręgowej (ok. 65–70%) bądź zamknięciem odchodzącej od niej tętnicy tylnej dolnej móżdżku (PICA – posterior inferior cerebellar artery, ok. 30%).",
        expl: "Prawidłowo! Zespół Wallenberga (boczny zespół opuszki) jest najczęściej wywołany zakrzepicą lub rozwarstwieniem tętnicy kręgowej (ok. 65–70%) bądź zamknięciem odchodzącej od niej tętnicy tylnej dolnej móżdżku (PICA – posterior inferior cerebellar artery, ok. 30%).",
        explanation: "Prawidłowo! Zespół Wallenberga (boczny zespół opuszki) jest najczęściej wywołany zakrzepicą lub rozwarstwieniem tętnicy kręgowej (ok. 65–70%) bądź zamknięciem odchodzącej od niej tętnicy tylnej dolnej móżdżku (PICA – posterior inferior cerebellar artery, ok. 30%)."
      },
      {
        q: "Dlaczego w zespole Wallenberga występuje tzw. naprzemienny zespół czuciowy (rozszczepiony ubytek czucia)?",
        question: "Dlaczego w zespole Wallenberga występuje tzw. naprzemienny zespół czuciowy (rozszczepiony ubytek czucia)?",
        opts: [
          "A) Uszkodzenie jądra pasma rdzeniowego n. V powoduje ubytek na twarzy po stronie ogniska, a uszkodzenie drogi rdzeniowo-wzgórzowej ubytek na ciele po stronie przeciwnej",
          "B) Ponieważ nerwy czuciowe ulegają skrzyżowaniu dopiero na poziomie stożka rdzeniowego",
          "C) Z powodu wybiórczego uszkodzenia kory ciemieniowej lewej półkuli mózgu",
          "D) W wyniku jednoczesnego zawału nerwów obwodowych splotu ramiennego",
          "E) Ponieważ zawał boczny opuszki wybiórczo oszczędza wszystkie wstępujące drogi czuciowe"
        ],
        options: [
          "A) Uszkodzenie jądra pasma rdzeniowego n. V powoduje ubytek na twarzy po stronie ogniska, a uszkodzenie drogi rdzeniowo-wzgórzowej ubytek na ciele po stronie przeciwnej",
          "B) Ponieważ nerwy czuciowe ulegają skrzyżowaniu dopiero na poziomie stożka rdzeniowego",
          "C) Z powodu wybiórczego uszkodzenia kory ciemieniowej lewej półkuli mózgu",
          "D) W wyniku jednoczesnego zawału nerwów obwodowych splotu ramiennego",
          "E) Ponieważ zawał boczny opuszki wybiórczo oszczędza wszystkie wstępujące drogi czuciowe"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Pasmo rdzeniowe nerwu trójdzielnego (n. V) schodzi w opuszce nieskrzyżowane – jego uszkodzenie daje zniesienie czucia bólu i temperatury na twarzy po stronie uszkodzenia (ipsilateralnie). Natomiast boczna droga rdzeniowo-wzgórzowa uległa skrzyżowaniu w rdzeniu kręgowym i prowadzi czucie z przeciwległej połowy ciała (stąd ubytek kontralateralny na tułowiu i kończynach).",
        expl: "Prawidłowo! Pasmo rdzeniowe nerwu trójdzielnego (n. V) schodzi w opuszce nieskrzyżowane – jego uszkodzenie daje zniesienie czucia bólu i temperatury na twarzy po stronie uszkodzenia (ipsilateralnie). Natomiast boczna droga rdzeniowo-wzgórzowa uległa skrzyżowaniu w rdzeniu kręgowym i prowadzi czucie z przeciwległej połowy ciała (stąd ubytek kontralateralny na tułowiu i kończynach).",
        explanation: "Prawidłowo! Pasmo rdzeniowe nerwu trójdzielnego (n. V) schodzi w opuszce nieskrzyżowane – jego uszkodzenie daje zniesienie czucia bólu i temperatury na twarzy po stronie uszkodzenia (ipsilateralnie). Natomiast boczna droga rdzeniowo-wzgórzowa uległa skrzyżowaniu w rdzeniu kręgowym i prowadzi czucie z przeciwległej połowy ciała (stąd ubytek kontralateralny na tułowiu i kończynach)."
      },
      {
        q: "Które jądro pnia mózgu ulega uszkodzeniu w zespole Wallenberga, powodując porażenie podniebienia miękkiego, dysfagię i chrypkę?",
        question: "Które jądro pnia mózgu ulega uszkodzeniu w zespole Wallenberga, powodując porażenie podniebienia miękkiego, dysfagię i chrypkę?",
        opts: [
          "A) Jądro dwuznaczne (nucleus ambiguus)",
          "B) Jądro pasma samotnego (nucleus solitarius)",
          "C) Jądro czerwienne (nucleus ruber)",
          "D) Jądro zębate móżdżku (nucleus dentatus)",
          "E) Istota czarna (substantia nigra)"
        ],
        options: [
          "A) Jądro dwuznaczne (nucleus ambiguus)",
          "B) Jądro pasma samotnego (nucleus solitarius)",
          "C) Jądro czerwienne (nucleus ruber)",
          "D) Jądro zębate móżdżku (nucleus dentatus)",
          "E) Istota czarna (substantia nigra)"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Jądro dwuznaczne (nucleus ambiguus) zawiera neurony ruchowe dla nerwu językowo-gardłowego (IX) i błędnego (X), zaopatrujące mięśnie gardła, krtani i podniebienia miękkiego. Jego uszkodzenie w zespole Wallenberga prowadzi do porażenia strun głosowych (chrypka), opadnięcia podniebienia i ciężkich zaburzeń połykania (dysfagia).",
        expl: "Prawidłowo! Jądro dwuznaczne (nucleus ambiguus) zawiera neurony ruchowe dla nerwu językowo-gardłowego (IX) i błędnego (X), zaopatrujące mięśnie gardła, krtani i podniebienia miękkiego. Jego uszkodzenie w zespole Wallenberga prowadzi do porażenia strun głosowych (chrypka), opadnięcia podniebienia i ciężkich zaburzeń połykania (dysfagia).",
        explanation: "Prawidłowo! Jądro dwuznaczne (nucleus ambiguus) zawiera neurony ruchowe dla nerwu językowo-gardłowego (IX) i błędnego (X), zaopatrujące mięśnie gardła, krtani i podniebienia miękkiego. Jego uszkodzenie w zespole Wallenberga prowadzi do porażenia strun głosowych (chrypka), opadnięcia podniebienia i ciężkich zaburzeń połykania (dysfagia)."
      },
      {
        q: "Wskaż zestaw twierdzeń PRAWDZIWYCH dotyczących zespołu Wallenberga:\n1. Siła mięśniowa w kończynach jest z reguły zachowana (brak niedowładu połowiczego).\n2. Zespół Hornera występuje po stronie tożstronnej do uszkodzenia.\n3. Do częstych przyczyn u młodych pacjentów należy rozwarstwienie tętnicy kręgowej.\n4. Z powodu ciężkiej dysfagii chory wymaga natychmiastowego wdrożenia reżimu 'nic doustnie' (NPO).\n5. Badaniem z wyboru o najwyższej czułości w pierwszych godzinach jest tomografia komputerowa bez kontrastu.",
        question: "Wskaż zestaw twierdzeń PRAWDZIWYCH dotyczących zespołu Wallenberga:\n1. Siła mięśniowa w kończynach jest z reguły zachowana (brak niedowładu połowiczego).\n2. Zespół Hornera występuje po stronie tożstronnej do uszkodzenia.\n3. Do częstych przyczyn u młodych pacjentów należy rozwarstwienie tętnicy kręgowej.\n4. Z powodu ciężkiej dysfagii chory wymaga natychmiastowego wdrożenia reżimu 'nic doustnie' (NPO).\n5. Badaniem z wyboru o najwyższej czułości w pierwszych godzinach jest tomografia komputerowa bez kontrastu.",
        opts: [
          "A) 1, 2, 3, 4",
          "B) 1, 2, 5",
          "C) 2, 3, 4, 5",
          "D) 1, 3, 5",
          "E) Tylko 1 i 4"
        ],
        options: [
          "A) 1, 2, 3, 4",
          "B) 1, 2, 5",
          "C) 2, 3, 4, 5",
          "D) 1, 3, 5",
          "E) Tylko 1 i 4"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Zdania 1, 2, 3 i 4 są prawdziwe. Drogi piramidowe biegną w przedniej części opuszki (piramidach), dlatego boczny udar opuszki NIE wywołuje niedowładu połowiczego! Zdanie 5 jest fałszywe: TK głowy ma bardzo niską czułość w pniu mózgu; badaniem z wyboru jest rezonans magnetyczny (MRI DWI).",
        expl: "Prawidłowo! Zdania 1, 2, 3 i 4 są prawdziwe. Drogi piramidowe biegną w przedniej części opuszki (piramidach), dlatego boczny udar opuszki NIE wywołuje niedowładu połowiczego! Zdanie 5 jest fałszywe: TK głowy ma bardzo niską czułość w pniu mózgu; badaniem z wyboru jest rezonans magnetyczny (MRI DWI).",
        explanation: "Prawidłowo! Zdania 1, 2, 3 i 4 są prawdziwe. Drogi piramidowe biegną w przedniej części opuszki (piramidach), dlatego boczny udar opuszki NIE wywołuje niedowładu połowiczego! Zdanie 5 jest fałszywe: TK głowy ma bardzo niską czułość w pniu mózgu; badaniem z wyboru jest rezonans magnetyczny (MRI DWI)."
      },
      {
        q: "Wskaż zdanie FAŁSZYWE dotyczące zespołu Wallenberga:",
        question: "Wskaż zdanie FAŁSZYWE dotyczące zespołu Wallenberga:",
        opts: [
          "A) Obecność głębokiego niedowładu spastycznego połowiczego jest stałą i konieczną cechą zespołu",
          "B) Oczopląs i zawroty głowy wynikają z uszkodzenia jąder przedsionkowych w bocznej opuszce",
          "C) Ataksja móżdżkowa i zbaczanie występują po stronie tożstronnej do uszkodzenia wskutek zajęcia dolnego konaru móżdżku",
          "D) Uszkodzenie zstępujących włókien współczulnych wywołuje tożstronną ptozę, miozę i anhydrozę",
          "E) Pacjenci z zespołem Wallenberga kwalifikują się do dożylnej trombolizy w oknie do 4,5 godziny"
        ],
        options: [
          "A) Obecność głębokiego niedowładu spastycznego połowiczego jest stałą i konieczną cechą zespołu",
          "B) Oczopląs i zawroty głowy wynikają z uszkodzenia jąder przedsionkowych w bocznej opuszce",
          "C) Ataksja móżdżkowa i zbaczanie występują po stronie tożstronnej do uszkodzenia wskutek zajęcia dolnego konaru móżdżku",
          "D) Uszkodzenie zstępujących włókien współczulnych wywołuje tożstronną ptozę, miozę i anhydrozę",
          "E) Pacjenci z zespołem Wallenberga kwalifikują się do dożylnej trombolizy w oknie do 4,5 godziny"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Zdanie A jest bezwzględnie fałszywe. W zespole Wallenberga drogi piramidowe (ruchowe) są nienaruszone, dlatego pacjent NIE MA niedowładu kończyn. Występowanie niedowładu połowiczego przemawia za zespołem przyśrodkowym opuszki (zespół Dejerine'a) lub udarem półkulowym.",
        expl: "Prawidłowo! Zdanie A jest bezwzględnie fałszywe. W zespole Wallenberga drogi piramidowe (ruchowe) są nienaruszone, dlatego pacjent NIE MA niedowładu kończyn. Występowanie niedowładu połowiczego przemawia za zespołem przyśrodkowym opuszki (zespół Dejerine'a) lub udarem półkulowym.",
        explanation: "Prawidłowo! Zdanie A jest bezwzględnie fałszywe. W zespole Wallenberga drogi piramidowe (ruchowe) są nienaruszone, dlatego pacjent NIE MA niedowładu kończyn. Występowanie niedowładu połowiczego przemawia za zespołem przyśrodkowym opuszki (zespół Dejerine'a) lub udarem półkulowym."
      },
      {
        q: "Jakie działanie z zakresu opieki pielęgniarskiej i lekarskiej jest najważniejsze w pierwszych dobach u pacjenta z zespołem Wallenberga w celu zapobieżenia najczęstszej przyczynie zgonu w tej grupie chorych?",
        question: "Jakie działanie z zakresu opieki pielęgniarskiej i lekarskiej jest najważniejsze w pierwszych dobach u pacjenta z zespołem Wallenberga w celu zapobieżenia najczęstszej przyczynie zgonu w tej grupie chorych?",
        opts: [
          "A) Wdrożenie ścisłego reżimu NPO (nic doustnie) i żywienie przez zgłębnik żołądkowy w celu prewencji zachłystowego zapalenia płuc",
          "B) Podawanie wyłącznie stałych posiłków w pozycji leżącej na wznak",
          "C) Codzienne wykonywanie nakłucia lędźwiowego w celu odbarczenia płynu",
          "D) Płukanie żołądka zimną wodą co 4 godziny w celu stymulacji nerwu błędnego",
          "E) Zastosowanie opasek uciskowych na tętnice szyjne"
        ],
        options: [
          "A) Wdrożenie ścisłego reżimu NPO (nic doustnie) i żywienie przez zgłębnik żołądkowy w celu prewencji zachłystowego zapalenia płuc",
          "B) Podawanie wyłącznie stałych posiłków w pozycji leżącej na wznak",
          "C) Codzienne wykonywanie nakłucia lędźwiowego w celu odbarczenia płynu",
          "D) Płukanie żołądka zimną wodą co 4 godziny w celu stymulacji nerwu błędnego",
          "E) Zastosowanie opasek uciskowych na tętnice szyjne"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Najczęstszym śmiertelnym powikłaniem wczesnego okresu zespołu Wallenberga jest aspiracja treści pokarmowej/śliny i ciężkie zachłystowe zapalenie płuc (aspiration pneumonia) wywołane porażeniem opuszkowym. Bezwzględny zakaz żywienia doustnego i szybkie założenie sondy żołądkowej zapobiega zgonowi.",
        expl: "Prawidłowo! Najczęstszym śmiertelnym powikłaniem wczesnego okresu zespołu Wallenberga jest aspiracja treści pokarmowej/śliny i ciężkie zachłystowe zapalenie płuc (aspiration pneumonia) wywołane porażeniem opuszkowym. Bezwzględny zakaz żywienia doustnego i szybkie założenie sondy żołądkowej zapobiega zgonowi.",
        explanation: "Prawidłowo! Najczęstszym śmiertelnym powikłaniem wczesnego okresu zespołu Wallenberga jest aspiracja treści pokarmowej/śliny i ciężkie zachłystowe zapalenie płuc (aspiration pneumonia) wywołane porażeniem opuszkowym. Bezwzględny zakaz żywienia doustnego i szybkie założenie sondy żołądkowej zapobiega zgonowi."
      },
      {
        q: "Czym objawia się tożstronny zespół Hornera wchodzący w skład zespołu Wallenberga?",
        question: "Czym objawia się tożstronny zespół Hornera wchodzący w skład zespołu Wallenberga?",
        opts: [
          "A) Opadnięciem powieki (ptosis), zwężeniem źrenicy (miosis) i upośledzeniem potliwości połowy twarzy (anhidrosis)",
          "B) Rozszerzeniem źrenicy, wytrzeszczem gałki ocznej i obfitym łzawieniem",
          "C) Całkowitą ślepotą jednooczną z zanikiem tarczy nerwu wzrokowego",
          "D) Skurczem powiek połączonym z mimowolnymi ruchami języka",
          "E) Porażeniem mięśni żwaczy z opadnięciem żuchwy"
        ],
        options: [
          "A) Opadnięciem powieki (ptosis), zwężeniem źrenicy (miosis) i upośledzeniem potliwości połowy twarzy (anhidrosis)",
          "B) Rozszerzeniem źrenicy, wytrzeszczem gałki ocznej i obfitym łzawieniem",
          "C) Całkowitą ślepotą jednooczną z zanikiem tarczy nerwu wzrokowego",
          "D) Skurczem powiek połączonym z mimowolnymi ruchami języka",
          "E) Porażeniem mięśni żwaczy z opadnięciem żuchwy"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Triada Hornera obejmuje: ptosis (opadnięcie powieki przez porażenie mięśnia tarczkowego Müllera), miosis (zwężenie źrenicy z przewagą układu przywspółczulnego) oraz anhidrosis (brak potliwości tożstronnej połowy twarzy) w wyniku przerwania zstępujących dróg współczulnych w bocznej części opuszki.",
        expl: "Prawidłowo! Triada Hornera obejmuje: ptosis (opadnięcie powieki przez porażenie mięśnia tarczkowego Müllera), miosis (zwężenie źrenicy z przewagą układu przywspółczulnego) oraz anhidrosis (brak potliwości tożstronnej połowy twarzy) w wyniku przerwania zstępujących dróg współczulnych w bocznej części opuszki.",
        explanation: "Prawidłowo! Triada Hornera obejmuje: ptosis (opadnięcie powieki przez porażenie mięśnia tarczkowego Müllera), miosis (zwężenie źrenicy z przewagą układu przywspółczulnego) oraz anhidrosis (brak potliwości tożstronnej połowy twarzy) w wyniku przerwania zstępujących dróg współczulnych w bocznej części opuszki."
      },
      {
        q: "Jaki jest mechanizm powstawania czkawki (singultus) u chorych z zespołem Wallenberga, która może być uciążliwa i trwać wiele dni?",
        question: "Jaki jest mechanizm powstawania czkawki (singultus) u chorych z zespołem Wallenberga, która może być uciążliwa i trwać wiele dni?",
        opts: [
          "A) Podrażnienie ośrodka oddechowego w tworze siatkowatym opuszki oraz uszkodzenie jądra nerwu błędnego",
          "B) Pęknięcie pęcherzyka żółciowego z wyciekiem żółci pod przeponę",
          "C) Odruchowe podrażnienie receptorów w błonie bębenkowej przez woskowinę",
          "D) Wzrost stężenia troponiny sercowej w osoczu krwi",
          "E) Niedobór witaminy B1 (tiaminy) w komórkach zwojowych siatkówki"
        ],
        options: [
          "A) Podrażnienie ośrodka oddechowego w tworze siatkowatym opuszki oraz uszkodzenie jądra nerwu błędnego",
          "B) Pęknięcie pęcherzyka żółciowego z wyciekiem żółci pod przeponę",
          "C) Odruchowe podrażnienie receptorów w błonie bębenkowej przez woskowinę",
          "D) Wzrost stężenia troponiny sercowej w osoczu krwi",
          "E) Niedobór witaminy B1 (tiaminy) w komórkach zwojowych siatkówki"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Uporczywa czkawka jest znanym objawem zawału bocznej części opuszki. Wynika z niedokrwienia i patologicznego pobudzenia ośrodka czkawki w tworze siatkowatym rdzenia przedłużonego oraz z uszkodzenia dróg nerwu błędnego.",
        expl: "Prawidłowo! Uporczywa czkawka jest znanym objawem zawału bocznej części opuszki. Wynika z niedokrwienia i patologicznego pobudzenia ośrodka czkawki w tworze siatkowatym rdzenia przedłużonego oraz z uszkodzenia dróg nerwu błędnego.",
        explanation: "Prawidłowo! Uporczywa czkawka jest znanym objawem zawału bocznej części opuszki. Wynika z niedokrwienia i patologicznego pobudzenia ośrodka czkawki w tworze siatkowatym rdzenia przedłużonego oraz z uszkodzenia dróg nerwu błędnego."
      },
      {
        q: "Który lek przeciwwymiotny jest lekiem z wyboru w opanowywaniu ostrych, wyniszczających nudności i wymiotów w udarze pnia mózgu?",
        question: "Który lek przeciwwymiotny jest lekiem z wyboru w opanowywaniu ostrych, wyniszczających nudności i wymiotów w udarze pnia mózgu?",
        opts: [
          "A) Ondansetron (antagonista receptora 5-HT3) dożylnie",
          "B) Doustny węgiel aktywowany w zawiesinie",
          "C) Sole bizmutu podawane doodbytniczo",
          "D) Olej rycynowy we wlewie kropelkowym",
          "E) Syrop z ipekakuany w wysokiej dawce"
        ],
        options: [
          "A) Ondansetron (antagonista receptora 5-HT3) dożylnie",
          "B) Doustny węgiel aktywowany w zawiesinie",
          "C) Sole bizmutu podawane doodbytniczo",
          "D) Olej rycynowy we wlewie kropelkowym",
          "E) Syrop z ipekakuany w wysokiej dawce"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Ondansetron (4–8 mg i.v.) skutecznie hamuje ośrodek wymiotny w pniu mózgu (strefę chemoreceptorową area postrema) bez wywoływania sedacji ani objawów pozapiramidowych, co ułatwia monitorowanie stanu neurologicznego chorego.",
        expl: "Prawidłowo! Ondansetron (4–8 mg i.v.) skutecznie hamuje ośrodek wymiotny w pniu mózgu (strefę chemoreceptorową area postrema) bez wywoływania sedacji ani objawów pozapiramidowych, co ułatwia monitorowanie stanu neurologicznego chorego.",
        explanation: "Prawidłowo! Ondansetron (4–8 mg i.v.) skutecznie hamuje ośrodek wymiotny w pniu mózgu (strefę chemoreceptorową area postrema) bez wywoływania sedacji ani objawów pozapiramidowych, co ułatwia monitorowanie stanu neurologicznego chorego."
      },
      {
        q: "Co charakteryzuje ataksję kończynową występującą w zespole Wallenberga?",
        question: "Co charakteryzuje ataksję kończynową występującą w zespole Wallenberga?",
        opts: [
          "A) Występuje po stronie tożstronnej do uszkodzenia wskutek zawału dolnego konaru móżdżku",
          "B) Występuje po stronie przeciwległej do uszkodzenia pnia",
          "C) Obejmuje wyłącznie mięśnie języka bez wpływu na kończyny",
          "D) Pojawia się dopiero po upływie 2 lat od incydentu naczyniowego",
          "E) Ustępuje natychmiast po zamknięciu powiek przez pacjenta"
        ],
        options: [
          "A) Występuje po stronie tożstronnej do uszkodzenia wskutek zawału dolnego konaru móżdżku",
          "B) Występuje po stronie przeciwległej do uszkodzenia pnia",
          "C) Obejmuje wyłącznie mięśnie języka bez wpływu na kończyny",
          "D) Pojawia się dopiero po upływie 2 lat od incydentu naczyniowego",
          "E) Ustępuje natychmiast po zamknięciu powiek przez pacjenta"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Drogi móżdżkowe (w tym dolny konar móżdżku – corpus restiforme) łączą się z tożstronną półkulą móżdżku. Zawał bocznej części opuszki niszczy te włókna, powodując tożstronną hemiataksję, dysmetrię w próbie palec-nos i zbaczanie podczas chodu w stronę ogniska.",
        expl: "Prawidłowo! Drogi móżdżkowe (w tym dolny konar móżdżku – corpus restiforme) łączą się z tożstronną półkulą móżdżku. Zawał bocznej części opuszki niszczy te włókna, powodując tożstronną hemiataksję, dysmetrię w próbie palec-nos i zbaczanie podczas chodu w stronę ogniska.",
        explanation: "Prawidłowo! Drogi móżdżkowe (w tym dolny konar móżdżku – corpus restiforme) łączą się z tożstronną półkulą móżdżku. Zawał bocznej części opuszki niszczy te włókna, powodując tożstronną hemiataksję, dysmetrię w próbie palec-nos i zbaczanie podczas chodu w stronę ogniska."
      },
      {
        q: "Jakie powikłanie oddechowe może wystąpić w rozległym zawale opuszki mózgu i wymaga natychmiastowej intubacji dotchawiczej?",
        question: "Jakie powikłanie oddechowe może wystąpić w rozległym zawale opuszki mózgu i wymaga natychmiastowej intubacji dotchawiczej?",
        opts: [
          "A) Niewydolność automatycznej kontroli oddychania podczas snu (zespół klątwy Ondyny) lub nagłe bezdechy",
          "B) Izolowane porażenie fałdów głosowych w pozycji maksymalnego rozszerzenia",
          "C) Pęknięcie pęcherza rozedmowego płuca pod wpływem kaszlu",
          "D) Skurcz oskrzeli zależny od komórek tucznych opłucnej",
          "E) Zatkanie lewego oskrzela głównego przez ciało obce"
        ],
        options: [
          "A) Niewydolność automatycznej kontroli oddychania podczas snu (zespół klątwy Ondyny) lub nagłe bezdechy",
          "B) Izolowane porażenie fałdów głosowych w pozycji maksymalnego rozszerzenia",
          "C) Pęknięcie pęcherza rozedmowego płuca pod wpływem kaszlu",
          "D) Skurcz oskrzeli zależny od komórek tucznych opłucnej",
          "E) Zatkanie lewego oskrzela głównego przez ciało obce"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! W opuszce zlokalizowany jest główny ośrodek oddechowy sterujący automatycznym rytmem oddychania. Rozległe zawały dolnej części pnia mózgu mogą prowadzić do utraty automatycznej kontroli oddechu (zespół klątwy Ondyny), nagłych epizodów bezdechu i zgonu podczas snu.",
        expl: "Prawidłowo! W opuszce zlokalizowany jest główny ośrodek oddechowy sterujący automatycznym rytmem oddychania. Rozległe zawały dolnej części pnia mózgu mogą prowadzić do utraty automatycznej kontroli oddechu (zespół klątwy Ondyny), nagłych epizodów bezdechu i zgonu podczas snu.",
        explanation: "Prawidłowo! W opuszce zlokalizowany jest główny ośrodek oddechowy sterujący automatycznym rytmem oddychania. Rozległe zawały dolnej części pnia mózgu mogą prowadzić do utraty automatycznej kontroli oddechu (zespół klątwy Ondyny), nagłych epizodów bezdechu i zgonu podczas snu."
      }
    ],
    flashcards: [
      { q: "Które naczynia ulegają zamknięciu w zespole Wallenberga?", a: "Tętnica tylna dolna móżdżku (PICA) lub tętnica kręgowa." },
      { q: "Na czym polega naprzemienny zespół czuciowy w zespole Wallenberga?", a: "Zniesienie czucia bólu i temperatury na twarzy tożstronnie (n. V) oraz na tułowiu i kończynach przeciwstronnie (droga rdzeniowo-wzgórzowa)." },
      { q: "Dlaczego w zespole Wallenberga nie ma niedowładu połowiczego?", a: "Drogi piramidowe biegną w przedniej części opuszki (piramidach), która jest unaczyniona przez tętnicę rdzeniową przednią i tętnicę podstawną." },
      { q: "Jakie jest najgroźniejsze powikłanie wczesne zespołu Wallenberga?", a: "Aspiracja treści pokarmowej i zachłystowe zapalenie płuc z powodu ciężkiej dysfagii (porażenie n. IX i X)." },
      { q: "Jakie badanie obrazowe jest złotym standardem rozpoznania zawału pnia mózgu?", a: "Rezonans magnetyczny (MRI) głowy z sekwencją dyfuzji DWI (TK ma niską czułość w dole tylnym)." },
      { q: "Co wchodzi w skład zespołu Hornera obecnego w zespole Wallenberga?", a: "Tożstronna ptoza (opadnięcie powieki), mioza (zwężenie źrenicy) i anhydroza (brak potliwości twarzy)." }
    ]
  },

  // =========================================================================
  // CASE 162: Krwiak Nadtwardówkowy (EDH)
  // =========================================================================
  {
    id: 162,
    file: "162_krwiak_nadtwardowkowy_edh.json",
    shortTitle: "Krwiak Nadtwardówkowy (EDH)",
    title: "Uraz Czaszkowo-Mózgowy: Ostry Krwiak Nadtwardówkowy z Odstępem Jasnym (EDH)",
    dept: "Neurochirurgia i Medycyna Ratunkowa",
    diagnosisTitle: "Ostry Krwiak Nadtwardówkowy okolicy skroniowo-ciemieniowej prawej z wgłobieniem podnamiotowym (EDH)",
    vitals: [
      { label: "Ciśnienie tętnicze (RR)", val: "165/95", unit: "mmHg", status: "vital-warn" },
      { label: "Częstość akcji serca (HR)", val: "52", unit: "/min", status: "vital-crit" },
      { label: "Częstość oddechów (RR)", val: "12", unit: "/min", status: "vital-warn" },
      { label: "Saturacja (SpO2)", val: "97", unit: "%", status: "vital-ok" },
      { label: "Temperatura ciała", val: "36.7", unit: "°C", status: "vital-ok" }
    ],
    story: "<p><strong>Pacjent:</strong> 24-letni mężczyzna przywieziony na SOR przez ZRM w stanie postępującej utraty przytomności po urazie głowy.</p><p><strong>Wywiad chorobowy:</strong> 3 godziny temu pacjent jadący na hulajnodze elektrycznej bez kasku przewrócił się i uderzył prawą okolicą skroniową o betonowy krawężnik. Bezpośrednio po urazie stracił przytomność na około 2 minuty. Po ocknięciu się wstał, czuł się dobrze, logicznie rozmawiał ze świadkami i odmówił wezwania pogotowia (tzw. odstęp jasny – lucid interval). Po 2 godzinach w domu wystąpił nagły, gwałtowny ból głowy, wielokrotne wymioty i narastająca senność. Rodzina wezwała ZRM.</p><p><strong>Badanie przedmiotowe:</strong> Pacjent w stanie śpiączki, reaguje wyprostnie na bodźce bólowe (GCS 6: O1, V2, M3). W prawej okolicy skroniowej widoczny krwiak podbiegły powłok czaszki z otarciem naskórka. Bradykardia 52/min, ciśnienie tętnicze 165/95 mmHg, nieregularny tor oddychania (triada Cushinga). W badaniu neurologicznym: prawa źrenica szeroka, sztywna, niereagująca na światło (objaw Hutchinsona!), lewa źrenica wąska (anizokoria). Po stronie lewej głęboki niedowład spastyczny kończyn z dodatnim objawem Babińskiego.</p>",
    steps: [
      {
        title: "Krok 1: Natychmiastowe zabezpieczenie dróg oddechowych i neuroprotekcja",
        scenario: "Pacjent jest w głębokiej śpiączce (GCS 6), z anizokorią i triadą Cushinga (nadciśnienie, bradykardia, zaburzenia oddechu) wskazującą na gwałtowny wzrost ciśnienia śródczaszkowego. Jaka jest natychmiastowa procedura na sali reanimacyjnej SOR?",
        options: [
          {
            text: "Pilna intubacja dotchawicza w szybkiej indukcji znieczulenia (RSI), uniesienie wezgłowia łóżka do 30° oraz natychmiastowe wykonanie pilnej TK głowy bez kontrastu",
            correct: true,
            isCorrect: true,
            feedback: "✅ PRAWIDŁOWO! Pacjent z GCS ≤8 bezwzględnie wymaga intubacji dotchawiczej w celu ochrony dróg oddechowych i zapobiegania wtórnemu uszkodzeniu mózgu (hipoksji i hiperkapnii). Uniesienie wezgłowia ułatwia drenaż żylny z czaszki, a priorytetem diagnostycznym jest natychmiastowa TK głowy w trybie pilnym."
          },
          {
            text: "Podanie dożylnego bolusu atropiny w celu przyspieszenia tętna i odesłanie pacjenta na oddział obserwacyjny",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Bradykardia jest elementem triady Cushinga świadczącym o wklinowaniu mózgu; leczenie samej bradykardii bez odbarczenia ciasnoty śródczaszkowej doprowadzi do zgonu."
          },
          {
            text: "Wykonanie próby pionizacji pacjenta w celu sprawdzenia chodu i koordynacji",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Próba pionizacji nieprzytomnego pacjenta z GCS 6 jest rażącym absurdem medycznym."
          },
          {
            text: "Zlecenie tomografii rezonansu magnetycznego z czasem badania 90 minut w celu oceny pnia mózgu",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Rezonans magnetyczny trwa zbyt długo; w ostrym urazie czaszkowo-mózgowym badaniem z wyboru jest natychmiastowa tomografia komputerowa (TK)."
          }
        ]
      },
      {
        title: "Krok 2: Rozpoznanie radiologiczne krwiaka nadtwardówkowego (EDH)",
        scenario: "W wykonanej natychmiast TK głowy bez kontrastu widoczne jest pęknięcie łuski prawej kości skroniowej. Jaki jest klasyczny, patognomoniczny obraz krwiaka nadtwardówkowego w badaniu TK?",
        options: [
          {
            text: "Hiperdensyjna, dwuwypukła (soczewkowata) masa przylegająca do kości czaszki, NIEPRZEKRACZAJĄCA linii szwów czaszkowych",
            correct: true,
            isCorrect: true,
            feedback: "✅ PRAWIDŁOWO! Krew w przestrzeni nadtwardówkowej gromadzi się między kością a blaszką opony twardej. Ponieważ opona twarda ściśle zrasta się z kośćmi czaszki na liniach szwów kostnych, krwiak nadtwardówkowy (EDH) ma kształt dwuwypukłej soczewki i NIE przekracza szwów czaszkowych (w przeciwieństwie do krwiaka podtwardówkowego SDH, który ma kształt sierpowaty i swobodnie przekracza szwy)."
          },
          {
            text: "Sierpowata masa pod oponą twardą swobodnie przekraczająca linie szwów czaszkowych wzdłuż całej półkuli",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Kształt półksiężycowaty/sierpowaty jest typowy dla krwiaka podtwardówkowego (SDH), a nie nadtwardówkowego."
          },
          {
            text: "Obecność licznych punktowych wybroczyn krwawych na granicy istoty białej i szarej bez efektu masy",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Wybroczyny na granicy kory i istoty białej odpowiadają rozlanemu uszkodzeniu aksonalnemu (DAI)."
          },
          {
            text: "Całkowity brak jakichkolwiek zmian z obecnością poszerzenia wszystkich komór mózgu",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Krwiak nadtwardówkowy jest ewidentną, ostro odgraniczoną hiperdensyjną masą."
          }
        ]
      },
      {
        title: "Krok 3: Doraźna osmoterapia i postępowanie pomostowe",
        scenario: "W TK krwiak ma objętość 45 ml, grubość 22 mm, przemieszczenie linii pośrodkowej wynosi 9 mm (wklinowanie podnamiotowe). Zespół neurochirurgiczny przygotowuje salę operacyjną (czas do cięcia: 15 minut). Jakie leczenie farmakologiczne obniżające ICP należy wdrożyć natychmiast na stole?",
        options: [
          {
            text: "Mannitol 20% dożylnie w dawce 1,0 g/kg m.c. w szybkim wlewie (lub 3% roztwór NaCl) oraz kontrolowana łagodna hiperwentylacja (PaCO2 30–35 mmHg)",
            correct: true,
            isCorrect: true,
            feedback: "✅ PRAWIDŁOWO! Osmoterapia mannitolem lub hipertonicznym NaCl odciąga wodę z nieuszkodzonego miąższu mózgu do łożyska naczyniowego, gwałtownie obniżając ciśnienie śródczaszkowe (ICP) i kupując cenny czas przed otwarciem czaszki. Hiperwentylacja powoduje hipokapniczny skurcz naczyń mózgowych i redukcję objętości krwi krążącej w mózgu."
          },
          {
            text: "Dożylne podanie 5000 ml 5% glukozy w celu wymuszenia diurezy osmotycznej",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! 5% glukoza jest płynem hipotonicznym in vivo; jej podanie wywoła katastrofalny obrzęk mózgu i natychmiastowy zgon."
          },
          {
            text: "Podanie dożylne heparyny drobnocząsteczkowej w celu rozpuszczenia skrzepu nadtwardówkowego",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Antykoagulacja nasili krwawienie tętnicze i doprowadzi do natychmiastowego wykrwawienia mózgowia."
          },
          {
            text: "Ułożenie pacjenta w pozycji płaskiej na brzuchu z głową skręconą w prawo",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Pozycja na brzuchu ze skrętem szyi zaciska żyły szyjne i drastycznie podnosi ICP."
          }
        ]
      },
      {
        title: "Krok 4: Definitywne leczenie neurochirurgiczne",
        scenario: "Pacjent trafia natychmiast na blok operacyjny. Jaka procedura chirurgiczna jest złotym standardem leczenia ostrego objawowego krwiaka nadtwardówkowego?",
        options: [
          {
            text: "Pilna kraniotomia skroniowo-ciemieniowa z ewakuacją krwiaka, koagulacją uszkodzonej tętnicy oponowej środkowej i podwieszeniem opony twardej",
            correct: true,
            isCorrect: true,
            feedback: "✅ PRAWIDŁOWO! Złotym standardem w ostrym krwiaku nadtwardówkowym o grubości >15 mm lub objętości >30 ml (oraz przy ubytkach neurologicznych) jest natychmiastowa kraniotomia, usunięcie skrzepów krwi, identyfikacja i zaopatrzenie źródła krwawienia (najczęściej gałęzi tętnicy oponowej środkowej) oraz podwieszenie opony twardej do brzegów kości czaszki w celu zapobiegania nawrotom."
          },
          {
            text: "Założenie zewnętrznego drenażu komorowego bez otwierania kości czaszki nad krwiakiem",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Drenaż komorowy nie odbarcza krwiaka zlokalizowanego na zewnątrz opony twardej."
          },
          {
            text: "Zamknięcie powłok i obserwacja w warunkach domowych przez lekarza rodzinnego",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Nieleczony krwiak nadtwardówkowy z wklinowaniem kończy się zgonem w 100% przypadków."
          },
          {
            text: "Wykonanie punkcji lędźwiowej w celu zassania krwiaka drogą rdzeniową",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Punkcja lędźwiowa w ciasnocie śródczaszkowej powoduje natychmiastowe wklinowanie migdałków móżdżku i zgon."
          }
        ]
      }
    ],
    pathoNodes: [
      {
        title: "Złamanie kości skroniowej i rozerwanie tętnicy oponowej środkowej",
        desc: "Uderzenie w cienką łuskę kości skroniowej (w okolicy pterionu) powoduje jej pęknięcie przebiegające przez bruzdę tętniczą.",
        detail: "Tętnica oponowa środkowa (arteria meningea media – gałąź tętnicy szczękowej) lub jej gałęzie przednie ulegają rozerwaniu pod wpływem odłamów kostnych. Krew pod ciśnieniem tętniczym odkleja blaszkę opony twardej od wewnętrznej powierzchni kości czaszki.",
        target: "Punkt uchwytu leczenia: Pilna kraniotomia i hemostaza (koagulacja dwubiegunowa lub podkłucie) tętnicy oponowej środkowej."
      },
      {
        title: "Odstęp jasny (lucid interval) i dekompensacja objętościowa",
        desc: "Początkowy wstrząs mózgu ustępuje, po czym narastający krwiak tętniczy wyczerpuje rezerwy kompensacyjne czaszki.",
        detail: "Zgodnie z doktryną Monro-Kelliego przemieszczenie płynu mózgowo-rdzeniowego i krwi żylnej kompensuje objętość krwiaka tylko do pewnego progu. Po przekroczeniu punktu załamania ciśnienie śródczaszkowe (ICP) gwałtownie szybuje w górę, prowadząc do zapaści świadomości i dekompensacji.",
        target: "Punkt uchwytu diagnostyki: Czujność kliniczna u każdego pacjenta po urazie głowy, który po przejściowej utracie przytomności 'wraca do normy'."
      },
      {
        title: "Wklinowanie haka hipokampa (uncus herniation) i ucisk pnia mózgu",
        desc: "Krwiak w okolicy skroniowej spycha przyśrodkową część płata skroniowego (hak zakrętu przyhipokampowego) przez wcięcie namiotu móżdżku.",
        detail: "Hak namiotu bezpośrednio uciska nerw okoruchowy (n. III), porażając włókna przywspółczulne zwieracza źrenicy (stąd tożstronne poszerzenie źrenicy – objaw Hutchinsona), oraz uciska konar mózgu i pień, wywołując przeciwstronny niedowład spastyczny, a w końcowej fazie triadę Cushinga i asystolię.",
        target: "Punkt uchwytu leczenia: Natychmiastowe odbarczenie operacyjne; rokowanie pogarsza się dramatycznie, gdy anizokoria utrzymuje się >60–90 minut."
      }
    ],
    dutySummary: {
      overview: "Krwiak nadtwardówkowy (EDH) to nagromadzenie krwi między wewnętrzną powierzchnią kości czaszki a oponą twardą, najczęściej w wyniku pourazowego uszkodzenia tętnicy oponowej środkowej w okolicy skroniowej. Charakteryzuje się klasycznym 'odstępem jasnym' (lucid interval) oraz błyskawiczną dekompensacją neurologiczną z poszerzeniem źrenicy (objaw Hutchinsona). Wymaga natychmiastowej ewakuacji chirurgicznej.",
      diagnostics: "1. Pilna tomografia komputerowa (TK) głowy bez kontrastu: soczewkowaty, dwuwypukły krwiak hiperdensyjny nieprzekraczający szwów czaszkowych, często ze złamaniem kości skroniowej.\n\n2. Ocena kliniczna: GCS, szerokość i reaktywność źrenic co 15 minut, poszukiwanie triady Cushinga (nadciśnienie tętnicze + bradykardia + nieregularny oddech).\n\n3. Wykluczenie innych obrażeń w protokole urazowym (uraz kręgosłupa szyjnego – kołnierz ortopedyczny).\n\n4. Badania laboratoryjne pilne: morfologia, grupa krwi i próba krzyżowa, koagulogram (INR, APTT).",
      drugsAndDoses: "• Faza przedoperacyjna (pomostowa do sali operacyjnej): <span class=\"dose-pill\">Mannitol 20%: 1,0 g/kg i.v. w ciągu 15–20 min</span> lub roztwór NaCl 3% (250 ml i.v.).\n• Intubacja w szybkiej indukcji (RSI): etomidat lub ketamina + rokuronium (zabezpieczenie kręgosłupa szyjnego!).\n• BEZWZGLĘDNY ZAKAZ podawania płynów hipotonicznych (glukozy 5%) oraz leków przeciwkrzepliwych.\n• W razie drgawek: <span class=\"dose-pill\">Lewetyracetam: 20–40 mg/kg i.v.</span> w celu profilaktyki napadów pourazowych.",
      procedures: "Pilna kraniotomia skroniowa z ewakuacją krwiaka i hemostazą tętnicy oponowej środkowej (w skrajnych przypadkach braku dostępu do neurochirurga – otwór trepanacyjny 'burr hole' w punkcie skroniowym w celu odbarczenia ratującego życie).",
      monitoring: "Nadzór na OIT neurochirurgicznym: ciągły pomiar ICP (cel <20–22 mmHg), ciśnienia perfuzji mózgowej (CPP = MAP - ICP, cel 60–70 mmHg), kontrolne badanie TK głowy po zabiegu."
    },
    diffTable: {
      title: "⚔️ Tabela Różnicowa: Krwiak Nadtwardówkowy (EDH) vs Ostre Krwiak Podtwardówkowy (SDH) vs Przewlekły SDH vs Krwotok Podpajęczynówkowy (tSAH)",
      headers: ["Cecha kliniczna", "Krwiak Nadtwardówkowy (EDH)", "Ostry Krwiak Podtwardówkowy (SDH)", "Przewlekły Krwiak Podtwardówkowy", "Pourazowy SAH (tSAH)"],
      rows: [
        ["Źródło krwawienia", "Tętnica oponowa środkowa (tętnicze)", "Żyły mostkowe (żylne o niskim ciśnieniu)", "Kruche naczynia torebki krwiaka", "Drobne naczynia przestrzeni podpajęczynówkowej"],
        ["Obraz w TK głowy", "Dwuwypukła, soczewkowata masa, NIE przekracza szwów", "Sierpowata (półksiężycowata) masa, PRZEKRACZA szwy", "Hipodensyjna/izodensyjna masa sierpowata", "Hiperdensyjna krew w bruzdach i zbiornikach"],
        ["Dynamika objawów", "Odstęp jasny (lucid interval) -> nagła dekompensacja", "Ciężki stan od początku urazu bez odstępu jasnego", "Podstępny, narastający tygodniami (otępienie, chód)", "Ostry ból głowy, światłowstręt, zespół oponowy"],
        ["Typowa populacja", "Młodzi dorośli po wypadkach, upadkach", "Ciężkie urazy komunikacyjne, uderzenia o dużej energii", "Osoby starsze z zanikiem mózgu, alkoholicy", "Każdy uraz czaszkowo-mózgowy"],
        ["Uszkodzenie tkanki mózgu", "Mózg często nieuszkodzony (dobre rokowanie po operacji)", "Masywne stłuczenie mózgowia (złe rokowanie)", "Minimalne uszkodzenie pierwotne", "Zmienne, zależne od energii urazu"],
        ["Leczenie z wyboru", "Natychmiastowa kraniotomia skroniowa", "Pilna kraniektomia odbarczająca", "Trepanacja czaszki (burr-hole) z drenażem", "Leczenie zachowawcze (obserwacja, nimodypina)"]
      ]
    },
    lekQuestions: [
      {
        q: "Które naczynie krwionośne ulega najczęściej uszkodzeniu w przebiegu urazowego ostrego krwiaka nadtwardówkowego (EDH)?",
        question: "Które naczynie krwionośne ulega najczęściej uszkodzeniu w przebiegu urazowego ostrego krwiaka nadtwardówkowego (EDH)?",
        opts: [
          "A) Tętnica oponowa środkowa (arteria meningea media)",
          "B) Żyły mostkowe (bridging veins) wpadające do zatoki strzałkowej",
          "C) Żyła wielka mózgu Galena",
          "D) Tętnica podstawna w bruździe mostu",
          "E) Tętnica szyjna wewnętrzna w odcinku jamistym"
        ],
        options: [
          "A) Tętnica oponowa środkowa (arteria meningea media)",
          "B) Żyły mostkowe (bridging veins) wpadające do zatoki strzałkowej",
          "C) Żyła wielka mózgu Galena",
          "D) Tętnica podstawna w bruździe mostu",
          "E) Tętnica szyjna wewnętrzna w odcinku jamistym"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! W ponad 85% przypadków krwiaka nadtwardówkowego źródłem krwawienia jest tętnica oponowa środkowa (lub jej gałęzie przednie), przebiegająca pod cienką łuską kości skroniowej w okolicy pterionu. (Z kolei żyły mostkowe są źródłem krwiaka podtwardówkowego SDH).",
        expl: "Prawidłowo! W ponad 85% przypadków krwiaka nadtwardówkowego źródłem krwawienia jest tętnica oponowa środkowa (lub jej gałęzie przednie), przebiegająca pod cienką łuską kości skroniowej w okolicy pterionu. (Z kolei żyły mostkowe są źródłem krwiaka podtwardówkowego SDH).",
        explanation: "Prawidłowo! W ponad 85% przypadków krwiaka nadtwardówkowego źródłem krwawienia jest tętnica oponowa środkowa (lub jej gałęzie przednie), przebiegająca pod cienką łuską kości skroniowej w okolicy pterionu. (Z kolei żyły mostkowe są źródłem krwiaka podtwardówkowego SDH)."
      },
      {
        q: "Dlaczego krwiak nadtwardówkowy (EDH) w badaniu tomografii komputerowej ma kształt dwuwypukłej soczewki i NIE przekracza linii szwów czaszkowych?",
        question: "Dlaczego krwiak nadtwardówkowy (EDH) w badaniu tomografii komputerowej ma kształt dwuwypukłej soczewki i NIE przekracza linii szwów czaszkowych?",
        opts: [
          "A) Ponieważ opona twarda jest ściśle zrośnięta z kośćmi czaszki na liniach szwów czaszkowych, co ogranicza rozprzestrzenianie się krwiaka",
          "B) Z powodu natychmiastowego obkurczenia kości pokrywy czaszki pod wpływem krwi",
          "C) Ponieważ ciśnienie atmosferyczne dociska oponę miękką do kory mózgowej",
          "D) Ze względu na obecność zastawek żylnych w obrębie blaszki wewnętrznej opony twardej",
          "E) Kształt soczewki wynika wyłącznie ze zjawiska załamania wiązki rentgenowskiej w tomografie"
        ],
        options: [
          "A) Ponieważ opona twarda jest ściśle zrośnięta z kośćmi czaszki na liniach szwów czaszkowych, co ogranicza rozprzestrzenianie się krwiaka",
          "B) Z powodu natychmiastowego obkurczenia kości pokrywy czaszki pod wpływem krwi",
          "C) Ponieważ ciśnienie atmosferyczne dociska oponę miękką do kory mózgowej",
          "D) Ze względu na obecność zastawek żylnych w obrębie blaszki wewnętrznej opony twardej",
          "E) Kształt soczewki wynika wyłącznie ze zjawiska załamania wiązki rentgenowskiej w tomografie"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Blaszka zewnętrzna opony twardej pełni jednocześnie rolę okostnej wewnętrznej kości czaszki i jest zrośnięta z kośćmi na liniach szwów czaszkowych. Krew gromadząca się w przestrzeni nadtwardówkowej odwarstwia oponę od kości, ale zatrzymuje się na szwach czaszkowych, co nadaje krwiakowi charakterystyczny kształt dwuwypukłej soczewki.",
        expl: "Prawidłowo! Blaszka zewnętrzna opony twardej pełni jednocześnie rolę okostnej wewnętrznej kości czaszki i jest zrośnięta z kośćmi na liniach szwów czaszkowych. Krew gromadząca się w przestrzeni nadtwardówkowej odwarstwia oponę od kości, ale zatrzymuje się na szwach czaszkowych, co nadaje krwiakowi charakterystyczny kształt dwuwypukłej soczewki.",
        explanation: "Prawidłowo! Blaszka zewnętrzna opony twardej pełni jednocześnie rolę okostnej wewnętrznej kości czaszki i jest zrośnięta z kośćmi na liniach szwów czaszkowych. Krew gromadząca się w przestrzeni nadtwardówkowej odwarstwia oponę od kości, ale zatrzymuje się na szwach czaszkowych, co nadaje krwiakowi charakterystyczny kształt dwuwypukłej soczewki."
      },
      {
        q: "Co oznacza pojęcie tzw. 'odstępu jasnego' (lucid interval) w wywiadzie u pacjenta po urazie głowy?",
        question: "Co oznacza pojęcie tzw. 'odstępu jasnego' (lucid interval) w wywiadzie u pacjenta po urazie głowy?",
        opts: [
          "A) Okres prawidłowego stanu świadomości pomiędzy wstępną pourazową utratą przytomności a wtórną dekompensacją neurologiczną wywołaną narastaniem krwiaka",
          "B) Czas pomiędzy podaniem leku znieczulającego a wybudzeniem chorego na sali operacyjnej",
          "C) Przerwę między pierwszym a drugim napadem drgawek toniczno-klonicznych",
          "D) Przejściową utratę wzroku ustępującą po wypiciu wody",
          "E) Stan euforii wywołany nagłym spadkiem ciśnienia tętniczego"
        ],
        options: [
          "A) Okres prawidłowego stanu świadomości pomiędzy wstępną pourazową utratą przytomności a wtórną dekompensacją neurologiczną wywołaną narastaniem krwiaka",
          "B) Czas pomiędzy podaniem leku znieczulającego a wybudzeniem chorego na sali operacyjnej",
          "C) Przerwę między pierwszym a drugim napadem drgawek toniczno-klonicznych",
          "D) Przejściową utratę wzroku ustępującą po wypiciu wody",
          "E) Stan euforii wywołany nagłym spadkiem ciśnienia tętniczego"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Odstęp jasny (lucid interval) występuje u ok. 20–50% chorych z ostrym krwiakiem nadtwardówkowym. Pacjent po urazie doznaje krótkotrwałej utraty przytomności (wstrząśnienie mózgu), po czym odzyskuje pełną przytomność i logiczny kontakt na kilka godzin, po czym gwałtownie traci przytomność wskutek ucisku mózgu przez narastający krwiak tętniczy.",
        expl: "Prawidłowo! Odstęp jasny (lucid interval) występuje u ok. 20–50% chorych z ostrym krwiakiem nadtwardówkowym. Pacjent po urazie doznaje krótkotrwałej utraty przytomności (wstrząśnienie mózgu), po czym odzyskuje pełną przytomność i logiczny kontakt na kilka godzin, po czym gwałtownie traci przytomność wskutek ucisku mózgu przez narastający krwiak tętniczy.",
        explanation: "Prawidłowo! Odstęp jasny (lucid interval) występuje u ok. 20–50% chorych z ostrym krwiakiem nadtwardówkowym. Pacjent po urazie doznaje krótkotrwałej utraty przytomności (wstrząśnienie mózgu), po czym odzyskuje pełną przytomność i logiczny kontakt na kilka godzin, po czym gwałtownie traci przytomność wskutek ucisku mózgu przez narastający krwiak tętniczy."
      },
      {
        q: "Wskaż zestaw objawów tworzących klasyczną triadę Cushinga świadczącą o krytycznym nadciśnieniu śródczaszkowym i zagrażającym wgłobieniu mózgu:\n1. Nadciśnienie tętnicze (ze wzrostem ciśnienia tętna / ciśnienia skurczowego).\n2. Bradykardia (spowolnienie akcji serca).\n3. Nieregularny, zaburzony tor oddychania (np. oddech Cheyne'a-Stokesa lub bezdechy).\n4. Gorączka powyżej 40°C.\n5. Obustronne zwężenie źrenic do wielkości główki od szpilki.",
        question: "Wskaż zestaw objawów tworzących klasyczną triadę Cushinga świadczącą o krytycznym nadciśnieniu śródczaszkowym i zagrażającym wgłobieniu mózgu:\n1. Nadciśnienie tętnicze (ze wzrostem ciśnienia tętna / ciśnienia skurczowego).\n2. Bradykardia (spowolnienie akcji serca).\n3. Nieregularny, zaburzony tor oddychania (np. oddech Cheyne'a-Stokesa lub bezdechy).\n4. Gorączka powyżej 40°C.\n5. Obustronne zwężenie źrenic do wielkości główki od szpilki.",
        opts: [
          "A) 1, 2, 3",
          "B) 1, 3, 5",
          "C) 2, 3, 4",
          "D) 1, 2, 4, 5",
          "E) Tylko 1 i 2"
        ],
        options: [
          "A) 1, 2, 3",
          "B) 1, 3, 5",
          "C) 2, 3, 4",
          "D) 1, 2, 4, 5",
          "E) Tylko 1 i 2"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Triada Cushinga to odruch fizjologiczny na niedokrwienie pnia mózgu wywołane krytycznym wzrostem ICP: 1. Nadciśnienie tętnicze (odruchowy wyrzut współczulny w celu utrzymania perfuzji CPP); 2. Bradykardia (odruch z baroreceptorów na skrajne nadciśnienie); 3. Zaburzenia rytmu oddechowego (ucisk ośrodka oddechowego w opuszce).",
        expl: "Prawidłowo! Triada Cushinga to odruch fizjologiczny na niedokrwienie pnia mózgu wywołane krytycznym wzrostem ICP: 1. Nadciśnienie tętnicze (odruchowy wyrzut współczulny w celu utrzymania perfuzji CPP); 2. Bradykardia (odruch z baroreceptorów na skrajne nadciśnienie); 3. Zaburzenia rytmu oddechowego (ucisk ośrodka oddechowego w opuszce).",
        explanation: "Prawidłowo! Triada Cushinga to odruch fizjologiczny na niedokrwienie pnia mózgu wywołane krytycznym wzrostem ICP: 1. Nadciśnienie tętnicze (odruchowy wyrzut współczulny w celu utrzymania perfuzji CPP); 2. Bradykardia (odruch z baroreceptorów na skrajne nadciśnienie); 3. Zaburzenia rytmu oddechowego (ucisk ośrodka oddechowego w opuszce)."
      },
      {
        q: "Wskaż zdanie FAŁSZYWE dotyczące krwiaka nadtwardówkowego (EDH):",
        question: "Wskaż zdanie FAŁSZYWE dotyczące krwiaka nadtwardówkowego (EDH):",
        opts: [
          "A) Poszerzenie źrenicy (anizokoria) występuje typowo po stronie PRZECIWNEJ do zlokalizowanego krwiaka",
          "B) Odbarczenie operacyjne krwiaka wykonane przed wystąpieniem obustronnego rozszerzenia źrenic daje znakomite rokowanie neurologiczne",
          "C) Krew w krwiaku nadtwardówkowym gromadzi się między kością czaszki a zewnętrzną blaszką opony twardej",
          "D) Złamanie kości skroniowej występuje u ponad 80–90% dorosłych pacjentów z EDH",
          "E) Objętość krwiaka przekraczająca 30 ml stanowi bezwzględne wskazanie do leczenia operacyjnego"
        ],
        options: [
          "A) Poszerzenie źrenicy (anizokoria) występuje typowo po stronie PRZECIWNEJ do zlokalizowanego krwiaka",
          "B) Odbarczenie operacyjne krwiaka wykonane przed wystąpieniem obustronnego rozszerzenia źrenic daje znakomite rokowanie neurologiczne",
          "C) Krew w krwiaku nadtwardówkowym gromadzi się między kością czaszki a zewnętrzną blaszką opony twardej",
          "D) Złamanie kości skroniowej występuje u ponad 80–90% dorosłych pacjentów z EDH",
          "E) Objętość krwiaka przekraczająca 30 ml stanowi bezwzględne wskazanie do leczenia operacyjnego"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Zdanie A jest bezwzględnie fałszywe. Poszerzenie źrenicy (objaw Hutchinsona) występuje TOŻSTRONNIE (po tej samej stronie co krwiak), ponieważ hak zakrętu hipokampa uciska nerw okoruchowy (n. III) bezpośrednio po stronie wgłobienia. Natomiast niedowład kończyn występuje PRZECIWSTRONNIE (wskutek ucisku dróg piramidowych przed ich skrzyżowaniem).",
        expl: "Prawidłowo! Zdanie A jest bezwzględnie fałszywe. Poszerzenie źrenicy (objaw Hutchinsona) występuje TOŻSTRONNIE (po tej samej stronie co krwiak), ponieważ hak zakrętu hipokampa uciska nerw okoruchowy (n. III) bezpośrednio po stronie wgłobienia. Natomiast niedowład kończyn występuje PRZECIWSTRONNIE (wskutek ucisku dróg piramidowych przed ich skrzyżowaniem).",
        explanation: "Prawidłowo! Zdanie A jest bezwzględnie fałszywe. Poszerzenie źrenicy (objaw Hutchinsona) występuje TOŻSTRONNIE (po tej samej stronie co krwiak), ponieważ hak zakrętu hipokampa uciska nerw okoruchowy (n. III) bezpośrednio po stronie wgłobienia. Natomiast niedowład kończyn występuje PRZECIWSTRONNIE (wskutek ucisku dróg piramidowych przed ich skrzyżowaniem)."
      },
      {
        q: "Co to jest zjawisko Kernohana (Kernohan's notch phenomenon) mogące zmylić badającego w ostrym krwiaku przymózgowym?",
        question: "Co to jest zjawisko Kernohana (Kernohan's notch phenomenon) mogące zmylić badającego w ostrym krwiaku przymózgowym?",
        opts: [
          "A) Wystąpienie niedowładu po stronie KRWIAKA w wyniku zepchnięcia przeciwległego konara mózgu na wolny brzeg namiotu",
          "B) Natychmiastowe zrośnięcie kości sklepienia czaszki pod wpływem krwiaka",
          "C) Zanik czucia w obu kończynach dolnych wywołany uciskiem rdzenia kręgowego",
          "D) Jednostronna utrata słuchu po stronie przeciwnej do złamania kości",
          "E) Wystąpienie obustronnego obrzęku płuc po urazie mózgu"
        ],
        options: [
          "A) Wystąpienie niedowładu po stronie KRWIAKA w wyniku zepchnięcia przeciwległego konara mózgu na wolny brzeg namiotu",
          "B) Natychmiastowe zrośnięcie kości sklepienia czaszki pod wpływem krwiaka",
          "C) Zanik czucia w obu kończynach dolnych wywołany uciskiem rdzenia kręgowego",
          "D) Jednostronna utrata słuchu po stronie przeciwnej do złamania kości",
          "E) Wystąpienie obustronnego obrzęku płuc po urazie mózgu"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Zjawisko wcięcia Kernohana polega na tym, że masywny krwiak przemieszcza cały pień mózgu w stronę przeciwną, powodując dociśnięcie przeciwległego konara mózgu (zawierającego nieskrzyżowane drogi piramidowe) do twardego brzegu namiotu móżdżku. Skutkuje to fałszywym niedowładem połowiczym po tej samej stronie co krwiak (tzw. objaw fałszywie lokalizujący).",
        expl: "Prawidłowo! Zjawisko wcięcia Kernohana polega na tym, że masywny krwiak przemieszcza cały pień mózgu w stronę przeciwną, powodując dociśnięcie przeciwległego konara mózgu (zawierającego nieskrzyżowane drogi piramidowe) do twardego brzegu namiotu móżdżku. Skutkuje to fałszywym niedowładem połowiczym po tej samej stronie co krwiak (tzw. objaw fałszywie lokalizujący).",
        explanation: "Prawidłowo! Zjawisko wcięcia Kernohana polega na tym, że masywny krwiak przemieszcza cały pień mózgu w stronę przeciwną, powodując dociśnięcie przeciwległego konara mózgu (zawierającego nieskrzyżowane drogi piramidowe) do twardego brzegu namiotu móżdżku. Skutkuje to fałszywym niedowładem połowiczym po tej samej stronie co krwiak (tzw. objaw fałszywie lokalizujący)."
      },
      {
        q: "Zgodnie z wytycznymi Brain Trauma Foundation, jakie parametry krwiaka nadtwardówkowego w TK głowy kwalifikują pacjenta do BEZWZGLĘDNEJ operacji neurochirurgicznej, niezależnie od punktacji w skali GCS?",
        question: "Zgodnie z wytycznymi Brain Trauma Foundation, jakie parametry krwiaka nadtwardówkowego w TK głowy kwalifikują pacjenta do BEZWZGLĘDNEJ operacji neurochirurgicznej, niezależnie od punktacji w skali GCS?",
        opts: [
          "A) Objętość krwiaka >30 cm³ (lub grubość >15 mm / przemieszczenie linii pośrodkowej >5 mm)",
          "B) Jakakolwiek widoczna ilość krwi o objętości powyżej 1 mililitra",
          "C) Objętość krwiaka przekraczająca 200 mililitrów",
          "D) Wyłącznie krwiaki zlokalizowane w płacie czołowym o grubości powyżej 50 mm",
          "E) Obecność złamania kości nosowych bez krwiaka śródczaszkowego"
        ],
        options: [
          "A) Objętość krwiaka >30 cm³ (lub grubość >15 mm / przemieszczenie linii pośrodkowej >5 mm)",
          "B) Jakakolwiek widoczna ilość krwi o objętości powyżej 1 mililitra",
          "C) Objętość krwiaka przekraczająca 200 mililitrów",
          "D) Wyłącznie krwiaki zlokalizowane w płacie czołowym o grubości powyżej 50 mm",
          "E) Obecność złamania kości nosowych bez krwiaka śródczaszkowego"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Wytyczne Brain Trauma Foundation jednoznacznie nakazują ewakuację chirurgiczną każdego krwiaka nadtwardówkowego o objętości >30 ml, niezależnie od wyjściowego GCS pacjenta. Ponadto operuje się krwiaki o grubości >15 mm, z przemieszczeniem linii pośrodkowej >5 mm lub przy GCS <9 z anizokorią.",
        expl: "Prawidłowo! Wytyczne Brain Trauma Foundation jednoznacznie nakazują ewakuację chirurgiczną każdego krwiaka nadtwardówkowego o objętości >30 ml, niezależnie od wyjściowego GCS pacjenta. Ponadto operuje się krwiaki o grubości >15 mm, z przemieszczeniem linii pośrodkowej >5 mm lub przy GCS <9 z anizokorią.",
        explanation: "Prawidłowo! Wytyczne Brain Trauma Foundation jednoznacznie nakazują ewakuację chirurgiczną każdego krwiaka nadtwardówkowego o objętości >30 ml, niezależnie od wyjściowego GCS pacjenta. Ponadto operuje się krwiaki o grubości >15 mm, z przemieszczeniem linii pośrodkowej >5 mm lub przy GCS <9 z anizokorią."
      },
      {
        q: "Dlaczego rokowanie u pacjentów z izolowanym ostrym krwiakiem nadtwardówkowym (EDH), u których przeprowadzono szybkie odbarczenie chirurgiczne, jest ZNACZNIE LEPSZE niż w ostrym krwiaku podtwardówkowym (SDH)?",
        question: "Dlaczego rokowanie u pacjentów z izolowanym ostrym krwiakiem nadtwardówkowym (EDH), u których przeprowadzono szybkie odbarczenie chirurgiczne, jest ZNACZNIE LEPSZE niż w ostrym krwiaku podtwardówkowym (SDH)?",
        opts: [
          "A) Ponieważ w EDH sam miąższ mózgu pod oponą twardą jest często nieuszkodzony pierwotnie, podczas gdy w ostrym SDH współistnieje masywne pierwotne stłuczenie mózgu",
          "B) Ponieważ tętnica oponowa środkowa regeneruje się samoistnie w ciągu kilku godzin",
          "C) Ze względu na to, że opona twarda wydziela substancje neuroprotekcyjne do krwiaka",
          "D) Ponieważ krew tętnicza nie zawiera leukocytów ani enzymów proteolitycznych",
          "E) Rokowanie w EDH jest w rzeczywistości znacznie gorsze niż w SDH"
        ],
        options: [
          "A) Ponieważ w EDH sam miąższ mózgu pod oponą twardą jest często nieuszkodzony pierwotnie, podczas gdy w ostrym SDH współistnieje masywne pierwotne stłuczenie mózgu",
          "B) Ponieważ tętnica oponowa środkowa regeneruje się samoistnie w ciągu kilku godzin",
          "C) Ze względu na to, że opona twarda wydziela substancje neuroprotekcyjne do krwiaka",
          "D) Ponieważ krew tętnicza nie zawiera leukocytów ani enzymów proteolitycznych",
          "E) Rokowanie w EDH jest w rzeczywistości znacznie gorsze niż w SDH"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! W krwiaku nadtwardówkowym uszkodzenie mózgu ma charakter wtórny (z ucisku przez powiększającą się masę krwiaka). Jeśli odbarczenie nastąpi przed trwałym niedokrwieniem pnia mózgu, tkanka mózgowa ulega pełnej dekompresji i pacjent może powrócić do całkowitego zdrowia (śmiertelność <5–10% w ośrodkach neurochirurgicznych). W ostrym SDH uraz o dużej energii niszczy samą korę mózgu (stłuczenia, obrzęk), stąd śmiertelność w SDH przekracza 50–60%.",
        expl: "Prawidłowo! W krwiaku nadtwardówkowym uszkodzenie mózgu ma charakter wtórny (z ucisku przez powiększającą się masę krwiaka). Jeśli odbarczenie nastąpi przed trwałym niedokrwieniem pnia mózgu, tkanka mózgowa ulega pełnej dekompresji i pacjent może powrócić do całkowitego zdrowia (śmiertelność <5–10% w ośrodkach neurochirurgicznych). W ostrym SDH uraz o dużej energii niszczy samą korę mózgu (stłuczenia, obrzęk), stąd śmiertelność w SDH przekracza 50–60%.",
        explanation: "Prawidłowo! W krwiaku nadtwardówkowym uszkodzenie mózgu ma charakter wtórny (z ucisku przez powiększającą się masę krwiaka). Jeśli odbarczenie nastąpi przed trwałym niedokrwieniem pnia mózgu, tkanka mózgowa ulega pełnej dekompresji i pacjent może powrócić do całkowitego zdrowia (śmiertelność <5–10% w ośrodkach neurochirurgicznych). W ostrym SDH uraz o dużej energii niszczy samą korę mózgu (stłuczenia, obrzęk), stąd śmiertelność w SDH przekracza 50–60%."
      },
      {
        q: "Co to jest punkt skroniowy (pterion) i dlaczego ma kluczowe znaczenie w patogenezie krwiaków nadtwardówkowych?",
        question: "Co to jest punkt skroniowy (pterion) i dlaczego ma kluczowe znaczenie w patogenezie krwiaków nadtwardówkowych?",
        opts: [
          "A) Miejsce połączenia kości czołowej, ciemieniowej, skroniowej i klinowej w kształcie litery H, pod którym bezpośrednio przebiega gałąź przednia tętnicy oponowej środkowej",
          "B) Miejsce ujścia żyły szyjnej wewnętrznej w dole szyjnym podstawy czaszki",
          "C) Punkt przecięcia szwu wieńcowego ze szwem strzałkowym na szczycie czaszki",
          "D) Otwór w kości potylicznej, przez który przechodzi rdzeń przedłużony",
          "E) Guzowatość potyliczna zewnętrzna będąca miejscem przyczepu więzadła karkowego"
        ],
        options: [
          "A) Miejsce połączenia kości czołowej, ciemieniowej, skroniowej i klinowej w kształcie litery H, pod którym bezpośrednio przebiega gałąź przednia tętnicy oponowej środkowej",
          "B) Miejsce ujścia żyły szyjnej wewnętrznej w dole szyjnym podstawy czaszki",
          "C) Punkt przecięcia szwu wieńcowego ze szwem strzałkowym na szczycie czaszki",
          "D) Otwór w kości potylicznej, przez który przechodzi rdzeń przedłużony",
          "E) Guzowatość potyliczna zewnętrzna będąca miejscem przyczepu więzadła karkowego"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Pterion to najcieńszy obszar bocznej ściany czaszki, gdzie stykają się 4 kości (czołowa, ciemieniowa, łuska skroniowej i skrzydło większe klinowej). Bezpośrednio po wewnętrznej stronie pterionu przebiega przednia gałąź tętnicy oponowej środkowej, co czyni to miejsce wyjątkowo podatnym na urazowe pęknięcie naczynia.",
        expl: "Prawidłowo! Pterion to najcieńszy obszar bocznej ściany czaszki, gdzie stykają się 4 kości (czołowa, ciemieniowa, łuska skroniowej i skrzydło większe klinowej). Bezpośrednio po wewnętrznej stronie pterionu przebiega przednia gałąź tętnicy oponowej środkowej, co czyni to miejsce wyjątkowo podatnym na urazowe pęknięcie naczynia.",
        explanation: "Prawidłowo! Pterion to najcieńszy obszar bocznej ściany czaszki, gdzie stykają się 4 kości (czołowa, ciemieniowa, łuska skroniowej i skrzydło większe klinowej). Bezpośrednio po wewnętrznej stronie pterionu przebiega przednia gałąź tętnicy oponowej środkowej, co czyni to miejsce wyjątkowo podatnym na urazowe pęknięcie naczynia."
      },
      {
        q: "Kiedy wyjątkowo dopuszcza się leczenie ZACHOWAWCZE ostrego krwiaka nadtwardówkowego?",
        question: "Kiedy wyjątkowo dopuszcza się leczenie ZACHOWAWCZE ostrego krwiaka nadtwardówkowego?",
        opts: [
          "A) U pacjenta przytomnego (GCS >12) z krwiakiem o objętości <30 ml, grubości <15 mm i przesunięciu linii pośrodkowej <5 mm, przy ścisłym monitorowaniu neurologicznym",
          "B) U każdego pacjenta w śpiączce z obustronnie sztywnymi źrenicami",
          "C) W każdym przypadku, gdy ciśnienie tętnicze przekracza 200 mmHg",
          "D) Zawsze, gdy krwiak powstał w wyniku rany postrzałowej czaszki",
          "E) Wyłącznie u chorych ze współistniejącą hemofilią powikłaną zakażeniem HIV"
        ],
        options: [
          "A) U pacjenta przytomnego (GCS >12) z krwiakiem o objętości <30 ml, grubości <15 mm i przesunięciu linii pośrodkowej <5 mm, przy ścisłym monitorowaniu neurologicznym",
          "B) U każdego pacjenta w śpiączce z obustronnie sztywnymi źrenicami",
          "C) W każdym przypadku, gdy ciśnienie tętnicze przekracza 200 mmHg",
          "D) Zawsze, gdy krwiak powstał w wyniku rany postrzałowej czaszki",
          "E) Wyłącznie u chorych ze współistniejącą hemofilią powikłaną zakażeniem HIV"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Postępowanie zachowawcze (ścisły nadzór na OIT, seryjna kontrola GCS i kontrolna TK głowy w ciągu 6–8h) jest dopuszczalne WYŁĄCZNIE u stabilnych, przytomnych pacjentów bez ubytków ogniskowych, u których krwiak ma objętość <30 ml, grubość <15 mm i brak istotnego przesunięcia linii pośrodkowej (<5 mm). Jakiekolwiek pogorszenie stanu nakazuje natychmiastową operację.",
        expl: "Prawidłowo! Postępowanie zachowawcze (ścisły nadzór na OIT, seryjna kontrola GCS i kontrolna TK głowy w ciągu 6–8h) jest dopuszczalne WYŁĄCZNIE u stabilnych, przytomnych pacjentów bez ubytków ogniskowych, u których krwiak ma objętość <30 ml, grubość <15 mm i brak istotnego przesunięcia linii pośrodkowej (<5 mm). Jakiekolwiek pogorszenie stanu nakazuje natychmiastową operację.",
        explanation: "Prawidłowo! Postępowanie zachowawcze (ścisły nadzór na OIT, seryjna kontrola GCS i kontrolna TK głowy w ciągu 6–8h) jest dopuszczalne WYŁĄCZNIE u stabilnych, przytomnych pacjentów bez ubytków ogniskowych, u których krwiak ma objętość <30 ml, grubość <15 mm i brak istotnego przesunięcia linii pośrodkowej (<5 mm). Jakiekolwiek pogorszenie stanu nakazuje natychmiastową operację."
      },
      {
        q: "Dlaczego krwiak nadtwardówkowy występuje BARDZO RZADKO u małych dzieci (<2. roku życia) oraz u osób w bardzo podeszłym wieku (>75. roku życia)?",
        question: "Dlaczego krwiak nadtwardówkowy występuje BARDZO RZADKO u małych dzieci (<2. roku życia) oraz u osób w bardzo podeszłym wieku (>75. roku życia)?",
        opts: [
          "A) U niemowląt kości czaszki są plastyczne i brak głębokich bruzd tętniczych, a u osób starszych opona twarda ulega mocnemu zwłóknieniu i ściśle zrasta się z kośćmi czaszki",
          "B) Ponieważ tętnica oponowa środkowa wykształca się dopiero w okresie pokwitania",
          "C) U osób starszych ciśnienie w naczyniach mózgowych spada do zera",
          "D) Z powodu całkowitej niewrażliwości kości czaszki na urazy w tych grupach wiekowych",
          "E) Ponieważ u noworodków opona twarda nie posiada unaczynienia tętniczego"
        ],
        options: [
          "A) U niemowląt kości czaszki są plastyczne i brak głębokich bruzd tętniczych, a u osób starszych opona twarda ulega mocnemu zwłóknieniu i ściśle zrasta się z kośćmi czaszki",
          "B) Ponieważ tętnica oponowa środkowa wykształca się dopiero w okresie pokwitania",
          "C) U osób starszych ciśnienie w naczyniach mózgowych spada do zera",
          "D) Z powodu całkowitej niewrażliwości kości czaszki na urazy w tych grupach wiekowych",
          "E) Ponieważ u noworodków opona twarda nie posiada unaczynienia tętniczego"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! U małych dzieci kości czaszki są miękkie i elastyczne, a tętnica nie jest jeszcze zagłębiona w bruzdach kostnych (łamie się kość bez rozdarcia naczynia). U osób w podeszłym wieku opona twarda ulega fizjologicznemu zwłóknieniu i ściśle zrasta się z kośćmi sklepienia czaszki, co uniemożliwia jej odwarstwienie przez wynaczynioną krew (dlatego u osób starszych dominuje krwiak podtwardówkowy SDH).",
        expl: "Prawidłowo! U małych dzieci kości czaszki są miękkie i elastyczne, a tętnica nie jest jeszcze zagłębiona w bruzdach kostnych (łamie się kość bez rozdarcia naczynia). U osób w podeszłym wieku opona twarda ulega fizjologicznemu zwłóknieniu i ściśle zrasta się z kośćmi sklepienia czaszki, co uniemożliwia jej odwarstwienie przez wynaczynioną krew (dlatego u osób starszych dominuje krwiak podtwardówkowy SDH).",
        explanation: "Prawidłowo! U małych dzieci kości czaszki są miękkie i elastyczne, a tętnica nie jest jeszcze zagłębiona w bruzdach kostnych (łamie się kość bez rozdarcia naczynia). U osób w podeszłym wieku opona twarda ulega fizjologicznemu zwłóknieniu i ściśle zrasta się z kośćmi sklepienia czaszki, co uniemożliwia jej odwarstwienie przez wynaczynioną krew (dlatego u osób starszych dominuje krwiak podtwardówkowy SDH)."
      }
    ],
    flashcards: [
      { q: "Jakie jest najczęstsze źródło krwawienia w krwiaku nadtwardówkowym (EDH)?", a: "Tętnica oponowa środkowa (arteria meningea media) po złamaniu kości skroniowej w okolicy pterionu." },
      { q: "Jaki jest patognomoniczny obraz EDH w badaniu TK głowy?", a: "Dwuwypukła (soczewkowata), hiperdensyjna masa, która NIE przekracza linii szwów czaszkowych." },
      { q: "Czym jest 'odstęp jasny' (lucid interval)?", a: "Okresem pełnej przytomności i dobrego samopoczucia po urazie, poprzedzającym gwałtowną dekompensację neurologiczną." },
      { q: "Co oznacza poszerzenie jednej źrenicy (objaw Hutchinsona) po urazie głowy?", a: "Wklinowanie haka hipokampa uciskające nerw okoruchowy (n. III) po stronie krwiaka (anizokoria tożstronna)." },
      { q: "Co wchodzi w skład triady Cushinga w ciasnocie śródczaszkowej?", a: "Nadciśnienie tętnicze, bradykardia oraz nieregularny tor oddychania." },
      { q: "Jakie jest definitywne leczenie ratujące życie w objawowym EDH?", a: "Pilna kraniotomia z ewakuacją krwiaka i hemostazą tętnicy oponowej środkowej." }
    ]
  }
];

async function run() {
  console.log('Writing and encrypting Cases 161 and 162...');
  for (const c of casesData) {
    const enc = await encryptStringAes(JSON.stringify(c, null, 2), MASTER_KEY);
    fs.writeFileSync(path.join('cases', c.file), JSON.stringify(enc, null, 2), 'utf8');
    console.log(`✓ Case #${c.id} (${c.file}) saved and encrypted.`);
  }
}

run().catch(console.error);

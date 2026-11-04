const fs = require('fs');
const path = require('path');
const { encryptStringAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

const case149 = {
  id: 149,
  dept: "Medycyna ratunkowa",
  title: "Wiotka klatka piersiowa / Flail Chest (Pulmonary Contusion & Thoracic Trauma)",
  shortTitle: "46-letni Bogdan – Złamanie żeber po upadku z rusztowania, paradoksalne ruchy ściany klatki piersiowej i duszność (Wiotka klatka piersiowa / Flail chest)",
  diagnosisTitle: "Wiotka klatka piersiowa (Flail Chest) – złamanie żeber IV–VIII w dwóch miejscach z wyłamaniem wiotkiego segmentu, stłuczenie płuca lewego (pulmonary contusion), niewydolność oddechowa hipoksemiczna, analgezja regionalna (TEA/ESPB), CPAP / stabilizacja chirurgiczna żeber (SSRF)",
  vitals: [
    { name: "Częstość akcji serca", val: "118/min", status: "vital-warn" },
    { name: "Ciśnienie tętnicze", val: "130/80 mmHg", status: "vital-ok" },
    { name: "Temperatura ciała", val: "36.8 °C", status: "vital-ok" },
    { name: "Saturacja SpO2", val: "86% (powietrze atmosferyczne)", status: "vital-crit" }
  ],
  vitalsObj: {
    hr: 118,
    bp: "130/80",
    spo2: 86,
    rr: 30,
    temp: 36.8,
    gcs: 14
  },
  story: "<p><strong>Pacjent:</strong> 46-letni pracownik budowlany Bogdan został przetransportowany przez zespół ratownictwa medycznego (ZRM) na Szpitalny Oddział Ratunkowy (Centrum Urazowe) po upadku z rusztowania z wysokości około 4 metrów na twarde podłoże i uderzeniu lewym bokiem klatki piersiowej o drewniane belki konstrukcyjne.</p><p><strong>Wywiad chorobowy:</strong> Do zdarzenia doszło około 45 minut temu. Pacjent przytomny, silnie cierpiący, zgłasza rozdzierający, kłujący ból lewej połowy klatki piersiowej dramatycznie nasilający się przy każdej próbie głębszego wdechu oraz postępującą, ciężką duszność. W wywiadzie od pacjenta: nie pamięta dokładnie momentu zderzenia z podłożem (krótkotrwała utrata przytomności bez amnezji wstecznej), dotychczas nie leczył się przewlekle, neguje przyjmowanie leków na stałe, nie ma alergii. Na miejscu zdarzenia ZRM podał <span class='dose-pill'>Fentanyl 0,1 mg i.v.</span> oraz wdrożył tlenoterapię przez wąsy tlenowe 4 l/min, uzyskując jedynie znikomą ulgę bólową.</p><p><strong>Badanie przedmiotowe na SOR:</strong> Pacjent w pozycji półsiedzącej, z wyraźnym tachypnoë (RR 30/min), zasinieniem warg i zaangażowaniem dodatkowych mięśni oddechowych (mostkowo-obojczykowo-sutkowych). Przy oglądaniu klatki piersiowej widoczny klasyczny oddech paradoksalny po stronie lewej: w trakcie wdechu anterolateralny segment ściany klatki piersiowej (w rzucie żeber IV–VIII) zapada się do wnętrza klatki piersiowej, natomiast podczas wydechu gwałtownie uwypukla się na zewnątrz. W badaniu palpacyjnym wyczuwalne bolesne trzeszczenie odłamów kostnych (krepitacje) w linii pachowej przedniej i środkowej po stronie lewej oraz podskórna rozedma (emphysema subcutaneum) w okolicy lewego dołu pachowego. Osłuchowo: pęcherzykowy szmer oddechowy po stronie lewej jest znacznie ściszony, z obecnością grubobańkowych rzężeń i trzeszczeń u podstawy (stłuczenie miąższu płucnego); po stronie prawej szmer pęcherzykowy symetryczny, prawidłowy. Tony serca miarowe, czyste, bez cech tamponady. Brzuch miękki, niebolesny, perystaltyka zachowana. Miednica stabilna. HR 118/min, BP 130/80 mmHg, SpO2 86% na powietrzu (92% na masce z rezerwuarem 15 l/min), temp. 36.8°C, GCS 14 pkt (E4V4M6 – zdezorientowany co do czasu z powodu cierpienia).</p>",
  labs: [
    {
      name: "Morfologia krwi i parametry krytyczne (Trauma Lab)",
      items: [
        { name: "Hemoglobina (Hb)", val: "13.2 g/dl", norm: "13.5 - 17.5 g/dl", flag: "LOW" },
        { name: "Hematokryt (Hct)", val: "39.5 %", norm: "40.0 - 52.0 %", flag: "LOW" },
        { name: "Leukocyty (WBC)", val: "14.2 G/l", norm: "4.0 - 10.0 G/l", flag: "HIGH" },
        { name: "Płytki krwi (PLT)", val: "230 G/l", norm: "150 - 400 G/l", flag: "NORMAL" }
      ]
    },
    {
      name: "Gazometria krwi tętniczej (hipoksemiczna niewydolność oddechowa)",
      items: [
        { name: "pH", val: "7.31", norm: "7.35 - 7.45", flag: "LOW" },
        { name: "pO2", val: "54 mmHg", norm: "80 - 100 mmHg", flag: "CRIT_LOW" },
        { name: "pCO2", val: "48 mmHg", norm: "35 - 45 mmHg", flag: "HIGH" },
        { name: "HCO3-", val: "23.8 mmol/l", norm: "22.0 - 26.0 mmol/l", flag: "NORMAL" },
        { name: "Saturacja O2 (SaO2)", val: "86.2 %", norm: "95.0 - 98.0 %", flag: "CRIT_LOW" },
        { name: "Mleczany (Lactate)", val: "2.4 mmol/l", norm: "0.5 - 1.6 mmol/l", flag: "HIGH" }
      ]
    },
    {
      name: "Biochemia, serologia i koagulologia",
      items: [
        { name: "Kreatynina", val: "0.92 mg/dl", norm: "0.7 - 1.2 mg/dl", flag: "NORMAL" },
        { name: "Troponina I hs", val: "8 ng/l (brak stłuczenia mięśnia sercowego)", norm: "< 14 ng/l", flag: "NORMAL" },
        { name: "CK-MB", val: "18 U/l", norm: "< 24 U/l", flag: "NORMAL" },
        { name: "INR", val: "1.05", norm: "0.8 - 1.2", flag: "NORMAL" },
        { name: "Fibrynogen", val: "3.2 g/l", norm: "2.0 - 4.0 g/l", flag: "NORMAL" }
      ]
    }
  ],
  steps: [
    {
      step: 1,
      title: "Krok 1: Wstępna ocena na Trauma Bay i kryteria rozpoznania wiotkiej klatki piersiowej (Flail Chest)",
      question: "Krok 1: Wstępna ocena na Trauma Bay i kryteria rozpoznania wiotkiej klatki piersiowej (Flail Chest)",
      text: "Pacjent Bogdan leży na sali urazowej z wyraźnym paradoksalnym ruchem ściany klatki piersiowej i hipoksemią. Co stanowi anatomiczne kryterium wiotkiej klatki piersiowej i jaki jest mechanizm oddechu paradoksalnego?",
      explanation: "✅ PRAWIDŁOWO! <strong>Kryterium wiotkiej klatki piersiowej (Flail Chest):</strong> Stan ten definiuje się jako anatomiczne złamanie co najmniej 3 sąsiednich żeber w co najmniej dwóch miejscach (lub złamanie obustronne żeber z oddzieleniem mostka), co powoduje powstanie wolnego, ruchomego segmentu ściany klatki piersiowej. W czasie wdechu ujemne ciśnienie w klatce piersiowej zasysa segment do wewnątrz, a podczas wydechu dodatnie ciśnienie wypycha go na zewnątrz (oddech paradoksalny).",
      options: [
        "A. Złamanie co najmniej 3 sąsiednich żeber w co najmniej 2 miejscach, powodujące wyłamanie wolnego segmentu poruszającego się paradoksalnie (zapadanie we wdechu, uwypuklanie w wydechu).",
        "B. Złamanie pojedynczego żebra z obecnością odmy opłucnowej i rozedmy podskórnej.",
        "C. Złamanie mostka bez współistniejącego uszkodzenia żeber, powodujące spadek rzutu serca.",
        "D. Pęknięcie opłucnej ściennej z ucieczką powietrza do tkanek miękkich bez złamań kostnych.",
        "E. Złamanie wyrostków poprzecznych kręgów piersiowych Th4-Th8 z uszkodzeniem rdzenia kręgowego."
      ],
      correct: 0,
      correctIdx: 0,
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Kryterium wiotkiej klatki piersiowej (Flail Chest):</strong> Stan ten definiuje się jako anatomiczne złamanie co najmniej 3 sąsiednich żeber w co najmniej dwóch miejscach (lub złamanie obustronne żeber z oddzieleniem mostka), co powoduje powstanie wolnego, ruchomego segmentu ściany klatki piersiowej. W czasie wdechu ujemne ciśnienie w klatce piersiowej zasysa segment do wewnątrz, a podczas wydechu dodatnie ciśnienie wypycha go na zewnątrz (oddech paradoksalny).",
        "❌ BŁĄD! Złamanie pojedynczego żebra, nawet z odmą, nie tworzy wiotkiej klatki piersiowej – brakuje wyłamanego, ruchomego segmentu ściany.",
        "❌ BŁĄD! Izolowane złamanie mostka nie spełnia kryteriów flail chest, choć może towarzyszyć stłuczeniu serca.",
        "❌ BŁĄD! Sama rozedma podskórna to objaw wycieku powietrza, a nie definicja mechanicznej wiotkości ściany kostnej.",
        "❌ BŁĄD! Złamania wyrostków poprzecznych nie powodują paradoksalnej ruchomości przednio-bocznej ściany klatki piersiowej."
      ]
    },
    {
      step: 2,
      title: "Krok 2: Główny mechanizm patofizjologiczny zagrażającej życiu hipoksemii",
      question: "Krok 2: Główny mechanizm patofizjologiczny zagrażającej życiu hipoksemii",
      text: "Choć wiotka ściana porusza się paradoksalnie, co jest bezpośrednią, główną przyczyną ciężkich zaburzeń wymiany gazowej i hipoksemii u pacjenta Bogdan?",
      explanation: "✅ PRAWIDŁOWO! <strong>Stłuczenie płuca (Pulmonary Contusion) jako główny czynnik hipoksemii:</strong> Główną przyczyną zaburzeń wymiany gazowej u chorych z flail chest nie jest sam mechaniczny ruch paradoksalny (choć zwiększa on pracę oddechową), lecz towarzyszące ciężkie stłuczenie miąższu płucnego pod wyłamanym segmentem. Dochodzi do uszkodzenia włośniczek płucnych, krwawienia śródpęcherzykowego, obrzęku śródmiąższowego, utraty surfaktantu, niedodmy i masywnego przecieku płucnego (prawy-lewy shunt) bez utlenowania krwi.",
      options: [
        "A. Skurcz oskrzeli wywołany wyrzutem histaminy z uszkodzonej opłucnej ściennej.",
        "B. Bezpośrednie stłuczenie płuca (pulmonary contusion) pod wyłamanym segmentem z krwawieniem śródpęcherzykowym, obrzękiem, niedodmą i masywnym przeciekiem płucnym.",
        "C. Ostra niedomykalność zastawki aortalnej na skutek gwałtownego wzrostu ciśnienia śródpiersiowego.",
        "D. Porażenie nerwu przeponowego i całkowity paraliż lewej kopuły przepony.",
        "E. Mechaniczne uwięźnięcie powietrza w żołądku uciskające płuco lewe."
      ],
      correct: 1,
      correctIdx: 1,
      feedback: [
        "❌ BŁĄD! Skurcz oskrzeli nie jest głównym mechanizmem hipoksemii pourazowej w flail chest.",
        "✅ PRAWIDŁOWO! <strong>Stłuczenie płuca (Pulmonary Contusion) jako główny czynnik hipoksemii:</strong> Główną przyczyną zaburzeń wymiany gazowej u chorych z flail chest nie jest sam mechaniczny ruch paradoksalny (choć zwiększa on pracę oddechową), lecz towarzyszące ciężkie stłuczenie miąższu płucnego pod wyłamanym segmentem. Dochodzi do uszkodzenia włośniczek płucnych, krwawienia śródpęcherzykowego, obrzęku śródmiąższowego, utraty surfaktantu, niedodmy i masywnego przecieku płucnego (prawy-lewy shunt) bez utlenowania krwi.",
        "❌ BŁĄD! Niedomykalność zastawki aortalnej to rzadkie powikłanie pęknięcia aorty lub urazu deceleracyjnego, niebędące typową przyczyną duszności w flail chest.",
        "❌ BŁĄD! Porażenie nerwu przeponowego jest rzadkie i nie tłumaczy rzężeń, trzeszczeń i ognisk stłuczenia miąższu.",
        "❌ BŁĄD! Rozdęcie żołądka może unosić przeponę, ale nie jest pierwotną przyczyną hipoksemii w tępym urazie klatki."
      ]
    },
    {
      step: 3,
      title: "Krok 3: Pilna diagnostyka obrazowa – protokół Trauma Bay",
      question: "Krok 3: Pilna diagnostyka obrazowa – protokół Trauma Bay",
      text: "Pacjent jest stabilny hemodynamicznie (BP 130/80 mmHg, HR 118/min). Jakie postępowanie diagnostyczne należy wdrożyć natychmiast na sali reanimacyjnej?",
      explanation: "✅ PRAWIDŁOWO! <strong>Badanie e-FAST i pilna Tomografia Komputerowa (TK klatki piersiowej):</strong> Natychmiastowe przyłóżkowe USG e-FAST pozwala wykluczyć odmę prężną, krwiak opłucnej i płyn w worku osierdziowym. Następnie złotym standardem oceny rozległości złamań, dyslokacji odłamów kostnych i objętości stłuczenia płuc jest tomografia komputerowa klatki piersiowej (Angio-TK / Trauma-Scan) z rekonstrukcjami wielopłaszczyznowymi i trójwymiarowymi 3D.",
      options: [
        "A. Przyłóżkowe USG e-FAST (wykluczenie odmy i płynu), a następnie pilna tomografia komputerowa (TK) klatki piersiowej z rekonstrukcją 3D ściany klatki i oceną stłuczenia płuc.",
        "B. Jedynie zdjęcie RTG klatki piersiowej w projekcji AP, odstępując od TK ze względu na dawkę promieniowania.",
        "C. Pilny rezonans magnetyczny (MRI) klatki piersiowej w celu oceny nerwów międzyżebrowych.",
        "D. Pielęgnacyjne usztywnienie klatki piersiowej opaską gipsową bez wykonywania badań obrazowych.",
        "E. Nakłucie jamy opłucnej igłą 14G w II międzyżebrzu przed wykonaniem jakichkolwiek badań."
      ],
      correct: 0,
      correctIdx: 0,
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Badanie e-FAST i pilna Tomografia Komputerowa (TK klatki piersiowej):</strong> Natychmiastowe przyłóżkowe USG e-FAST pozwala wykluczyć odmę prężną, krwiak opłucnej i płyn w worku osierdziowym. Następnie złotym standardem oceny rozległości złamań, dyslokacji odłamów kostnych i objętości stłuczenia płuc jest tomografia komputerowa klatki piersiowej (Angio-TK / Trauma-Scan) z rekonstrukcjami wielopłaszczyznowymi i trójwymiarowymi 3D.",
        "❌ BŁĄD! Klasyczne RTG nie docenia aż 50% złamań żeber oraz nie pozwala precyzyjnie oszacować objętości stłuczenia płuca ani zakwalifikować do operacji SSRF.",
        "❌ BŁĄD! MRI w ostrym urazie jest przeciwwskazane ze względu na długi czas trwania i brak monitorowania pacjenta w stanie zagrożenia życia.",
        "❌ BŁĄD! Zewnętrzne unieruchomienie gipsem lub ciasnym bandażowaniem jest historycznym błędem – ogranicza ruchomość klatki, pogłębia niedodmę i drastycznie zwiększa śmiertelność!",
        "❌ BŁĄD! Nakłucie odbarczające w ciemno wykonuje się wyłącznie przy klinicznych objawach zagrażającej życiu odmy prężnej."
      ]
    },
    {
      step: 4,
      title: "Krok 4: Kluczowy filar leczenia nieinwazyjnego – strategia kontroli bólu (analgezja)",
      question: "Krok 4: Kluczowy filar leczenia nieinwazyjnego – strategia kontroli bólu (analgezja)",
      text: "Ból przy flail chest uniemożliwia efektywny wdech i kaszel, prowadząc do retencji wydzieliny i zapalenia płuc. Jaka metoda analgezji stanowi złoty standard według wytycznych towarzystw urazowych (EAST / WSES)?",
      explanation: "✅ PRAWIDŁOWO! <strong>Regionalna analgezja (TEA / Blokady przykręgowe / ESPB):</strong> Ciągła analgezja zewnątrzoponowa na poziomie piersiowym (TEA – Thoracic Epidural Analgesia) lub ciągła blokada przykręgowa (PVB) bądź blokada przedziału prostownika grzbietu (ESPB / Serratus plane block) stanowi złoty standard leczenia. Zapewnia doskonałe zniesienie bólu bez tłumienia napędu oddechowego i bez sedacji wywoływanej przez wysokie dawki opioidów.",
      options: [
        "A. Ciągła analgezja regionalna: piersiowa znieczulenie zewnątrzoponowe (TEA) lub blokada przykręgowa (PVB) / ESPB, uzupełniona paracetamolem i metamizolem.",
        "B. Wysokie dawki morfiny w bolusach i.v. w celu wywołania głębokiej sedacji pacjenta.",
        "C. Unieruchomienie klatki piersiowej szerokim plastrem sprężystym i rezygnacja z analgezji farmakologicznej.",
        "D. Podawanie wyłącznie niesteroidowych leków przeciwzapalnych w maściach miejscowych.",
        "E. Doopłucnowe wstrzyknięcie 100 ml 2% roztworu lignokainy."
      ],
      correct: 0,
      correctIdx: 0,
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Regionalna analgezja (TEA / Blokady przykręgowe / ESPB):</strong> Ciągła analgezja zewnątrzoponowa na poziomie piersiowym (TEA – Thoracic Epidural Analgesia) lub ciągła blokada przykręgowa (PVB) bądź blokada przedziału prostownika grzbietu (ESPB / Serratus plane block) stanowi złoty standard leczenia. Zapewnia doskonałe zniesienie bólu bez tłumienia napędu oddechowego i bez sedacji wywoływanej przez wysokie dawki opioidów.",
        "❌ BŁĄD! Monoterapia dużymi dawkami opioidów i.v. wywołuje sedację, depresję oddechową, tłumi odruch kaszlowy i sprzyja niedodmie oraz ciężkiemu zapaleniu płuc.",
        "❌ BŁĄD! Oklejanie plastrami lub bandażowanie klatki jest bezwzględnie przeciwwskazane, gdyż upośledza mechanikę wentylacji i prowadzi do zgonu z powodu powikłań oddechowych.",
        "❌ BŁĄD! Maści NLPZ są całkowicie nieskuteczne w tak potężnym bólu związanym z mnogimi złamaniami żeber.",
        "❌ BŁĄD! Doopłucnowe podanie tak dużej dawki lignokainy niesie wysokie ryzyko śmiertelnej toksyczności układowej (LAST)."
      ]
    },
    {
      step: 5,
      title: "Krok 5: Wsparcie oddechowe – koncepcja wewnętrznej pneumatycznej stabilizacji",
      question: "Krok 5: Wsparcie oddechowe – koncepcja wewnętrznej pneumatycznej stabilizacji",
      text: "Pacjent Bogdan jest wydolny świadomościowo, lecz jego SpO2 wynosi 86-90%, a praca oddechowa jest znacznie nasilona. Jaka forma wsparcia oddechowego powinna być wdrożona w pierwszej kolejności?",
      explanation: "✅ PRAWIDŁOWO! <strong>Nieinwazyjna wentylacja dodatnim ciśnieniem (CPAP / NIV) jako pneumatyczne usztywnienie:</strong> Dodatnie ciśnienie w drogach oddechowych (PEEP 5–10 cmH2O) rozpręża pęcherzyki płucne w stłuczonym płucu, zapobiega niedodmie, zmniejsza przeciek płucny oraz działa jak 'wewnętrzna pneumatyczna szyna' (internal pneumatic splinting), która stabilizuje wyłamany segment klatki piersiowej od wewnątrz. Pozwala to uniknąć intubacji u większości chorych.",
      options: [
        "A. Nieinwazyjna wentylacja dodatnim ciśnieniem (NIV / CPAP z PEEP 5-10 cmH2O) jako wewnętrzne pneumatyczne usztywnienie segmentu wiotkiego i rekrutacja pęcherzyków.",
        "B. Natychmiastowa intubacja dotchawicza i wentylacja z objętością oddechową 15 ml/kg.",
        "C. Zastosowanie worka samorozprężalnego Ambu przez 12 godzin bez tlenu.",
        "D. Wykonanie pilnej tracheostomii chirurgicznej w znieczuleniu miejscowym.",
        "E. Tlenoterapia bierna wąsami tlenowymi 1 l/min i oczekiwanie na samoistną poprawę."
      ],
      correct: 0,
      correctIdx: 0,
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Nieinwazyjna wentylacja dodatnim ciśnieniem (CPAP / NIV) jako pneumatyczne usztywnienie:</strong> Dodatnie ciśnienie w drogach oddechowych (PEEP 5–10 cmH2O) rozpręża pęcherzyki płucne w stłuczonym płucu, zapobiega niedodmie, zmniejsza przeciek płucny oraz działa jak 'wewnętrzna pneumatyczna szyna' (internal pneumatic splinting), która stabilizuje wyłamany segment klatki piersiowej od wewnątrz. Pozwala to uniknąć intubacji u większości chorych.",
        "❌ BŁĄD! Natychmiastowa intubacja nie jest bezwzględnie konieczna, jeśli pacjent współpracuje; dodatkowo objętość 15 ml/kg wywołałaby ciężki barotrauma i uszkodzenie stłuczonego płuca (VILI).",
        "❌ BŁĄD! Ręczna wentylacja workiem Ambu u przytomnego chorego jest błędem sztuki i nie zapewnia stabilnego ciśnienia PEEP.",
        "❌ BŁĄD! Wczesna tracheostomia nie jest procedurą pierwszego rzutu na Trauma Bay w ostrym urazie klatki.",
        "❌ BŁĄD! Niskoprzepływowa tlenoterapia wąsami (1 l/min) jest rażąco niewystarczająca przy SpO2 86% i stłuczeniu płuc."
      ]
    },
    {
      step: 6,
      title: "Krok 6: Strategia płynoterapii u chorego ze stłuczeniem płuc",
      question: "Krok 6: Strategia płynoterapii u chorego ze stłuczeniem płuc",
      text: "Pacjent nie krwawi aktywnie, a ciśnienie tętnicze wynosi 130/80 mmHg. Jakie zasady podaży płynów dożylnych należy zastosować u chorego ze współistniejącym stłuczeniem płuc?",
      explanation: "✅ PRAWIDŁOWO! <strong>Restrykcyjna płynoterapia dożylna:</strong> W stłuczonym miąższu płucnym przepuszczalność bariery włośniczkowo-pęcherzykowej jest patologicznie zwiększona. Agresywne przetaczanie krystaloidów dramatycznie nasila przesięk do pęcherzyków, wywołuje masywny obrzęk płuc i przyspiesza rozwój ARDS. Obowiązuje restrykcyjna strategia płynowa (normowolemia lub celowane ograniczenie podaży krystaloidów do 1.0–1.5 ml/kg/h) pod ścisłą kontrolą diurezy i parametrów hemodynamicznych.",
      options: [
        "A. Agresywne przetoczenie 4000 ml 0,9% NaCl w ciągu pierwszych 2 godzin w celu zapobieżenia hipotensji.",
        "B. Restrykcyjna, zrównoważona płynoterapia (unikanie przewodnienia), gdyż obrzęk naczyniowy stłuczonego płuca łatwo przekształca się w ciężki ARDS.",
        "C. Całkowite odstawienie płynów na 48 godzin bez względu na diurezę i funkcję nerek.",
        "D. Podanie 1500 ml 20% mannitolu i.v. w celu osuszenia płuc.",
        "E. Rutynowe przetoczenie 4 jednostek osocza świeżo mrożonego bez cech koagulopatii."
      ],
      correct: 1,
      correctIdx: 1,
      feedback: [
        "❌ BŁĄD! Agresywne przewodnienie krystaloidami to kardynalny błąd – u chorego ze stłuczeniem płuc doprowadzi do natychmiastowego obrzęku pęcherzykowego i zgonu w mechanizmie ARDS!",
        "✅ PRAWIDŁOWO! <strong>Restrykcyjna płynoterapia dożylna:</strong> W stłuczonym miąższu płucnym przepuszczalność bariery włośniczkowo-pęcherzykowej jest patologicznie zwiększona. Agresywne przetaczanie krystaloidów dramatycznie nasila przesięk do pęcherzyków, wywołuje masywny obrzęk płuc i przyspiesza rozwój ARDS. Obowiązuje restrykcyjna strategia płynowa (normowolemia lub celowane ograniczenie podaży krystaloidów do 1.0–1.5 ml/kg/h) pod ścisłą kontrolą diurezy i parametrów hemodynamicznych.",
        "❌ BŁĄD! Całkowite wstrzymanie płynów doprowadziłoby do przednerkowego uszkodzenia nerek i hipowolemii.",
        "❌ BŁĄD! Mannitol nie jest lekiem stosowanym w obrzęku płuc po urazie – grozi hipowolemią i zaburzeniami elektrolitowymi.",
        "❌ BŁĄD! Osocze (FFP) podaje się w koagulopatii ze wskazań hemostatycznych, a nie jako rutynowy płyn resuscytacyjny."
      ]
    },
    {
      step: 7,
      title: "Krok 7: Kwalifikacja do operacyjnej stabilizacji klatki piersiowej (SSRF)",
      question: "Krok 7: Kwalifikacja do operacyjnej stabilizacji klatki piersiowej (SSRF)",
      text: "W tomografii komputerowej stwierdzono wieloodłamowe złamania żeber IV–VIII z przemieszczeniem >1 szerokości żebra oraz postępujące zapadanie segmentu wiotkiego. Jakie są aktualne wskazania do operacyjnej stabilizacji żeber (SSRF – Surgical Stabilization of Rib Fractures)?",
      explanation: "✅ PRAWIDŁOWO! <strong>Wskazania do operacyjnej stabilizacji klatki piersiowej (SSRF):</strong> Wskazaniami do zespolenia żeber płytkami tytanowymi są: wiotka klatka piersiowa z niewydolnością oddechową i trudnością w odłączeniu od respiratora (failure to wean), ciężkie przemieszczenie odłamów kostnych (>1 szerokości żebra), deformacja klatki piersiowej z utratą objętości płuca, konieczność torakotomii z innych przyczyn urazowych oraz silny, oporny ból klatki piersiowej mimo blokad regionalnych.",
      options: [
        "A. Wiotka klatka piersiowa z niestabilnością i deformacją ściany, trudności w odłączeniu od respiratora, przemieszczenie odłamów >1 szerokości żebra oraz oporny ból.",
        "B. Każde izolowane złamanie jednego żebra bez przemieszczenia u pacjenta młodego.",
        "C. Wyłącznie u chorych w wieku powyżej 80 lat ze współistniejącą zaawansowaną osteoporozą.",
        "D. Brak jakichkolwiek wskazań, ponieważ chirurgia żeber jest procedurą historyczną i zarzuconą.",
        "E. Obecność łagodnej rozedmy podskórnej bez złamań kostnych."
      ],
      correct: 0,
      correctIdx: 0,
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Wskazania do operacyjnej stabilizacji klatki piersiowej (SSRF):</strong> Wskazaniami do zespolenia żeber płytkami tytanowymi są: wiotka klatka piersiowa z niewydolnością oddechową i trudnością w odłączeniu od respiratora (failure to wean), ciężkie przemieszczenie odłamów kostnych (>1 szerokości żebra), deformacja klatki piersiowej z utratą objętości płuca, konieczność torakotomii z innych przyczyn urazowych oraz silny, oporny ból klatki piersiowej mimo blokad regionalnych.",
        "❌ BŁĄD! Izolowane złamanie bez przemieszczenia leczy się wyłącznie zachowawczo analgezją.",
        "❌ BŁĄD! Ciężka osteoporoza stanowi wręcz wyzwanie techniczne dla stabilizacji płytkami, nie jest to jedyne wskazanie.",
        "❌ BŁĄD! Wręcz przeciwnie – SSRF przeżywa renesans dzięki tytanowym płytkom anatomicznym i dowiedzionemu skracaniu czasu wentylacji mechanicznej i pobytu na OIT.",
        "❌ BŁĄD! Rozedma podskórna nie jest wskazaniem do operacji żeber."
      ]
    },
    {
      step: 8,
      title: "Krok 8: Profilaktyka powikłań płucnych i kompleksowa toaleta oskrzelowa",
      question: "Krok 8: Profilaktyka powikłań płucnych i kompleksowa toaleta oskrzelowa",
      text: "Po ustabilizowaniu pacjenta i założeniu ciągłej analgezji zewnątrzoponowej, jakie interwencje mają kluczowe znaczenie dla zapobieżenia zapaleniu płuc i niewydolności oddechowej?",
      explanation: "✅ PRAWIDŁOWO! <strong>Fizjoterapia oddechowa i toaleta drzewa oskrzelowego:</strong> Kluczem do sukcesu jest wczesna, agresywna fizjoterapia oddechowa (ćwiczenia ze spirometrią motywacyjną, inhalacje soli fizjologicznej), toaleta drzewa oskrzelowego (odsysanie wydzieliny, w razie czopów śluzowych bronchofiberoskopia terapeutyczna), wczesna pionizacja pacjenta oraz profilaktyka przeciwzakrzepowa (LMWH po wykluczeniu aktywnego krwawienia).",
      options: [
        "A. Wczesna agresywna fizjoterapia oddechowa (spirometria motywacyjna), toaleta oskrzelowa (w razie konieczności bronchofiberoskopia), pionizacja i profilaktyka przeciwzakrzepowa LMWH.",
        "B. Bezwzględne unieruchomienie w łóżku na płasko przez 3 tygodnie oraz zakaz kaszlu.",
        "C. Rutynowe profilaktyczne podawanie antybiotyków o szerokim spektrum (np. karbapenemów) przez 14 dni bez objawów infekcji.",
        "D. Prowadzenie ciągłego drenażu ułożeniowego z głową ułożoną poniżej tułowia (pozycja Trendelenburga) przez całą dobę.",
        "E. Podanie leków przeciwkaszlowych (kodeina) w celu całkowitego zahamowania kaszlu."
      ],
      correct: 0,
      correctIdx: 0,
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Fizjoterapia oddechowa i toaleta drzewa oskrzelowego:</strong> Kluczem do sukcesu jest wczesna, agresywna fizjoterapia oddechowa (ćwiczenia ze spirometrią motywacyjną, inhalacje soli fizjologicznej), toaleta drzewa oskrzelowego (odsysanie wydzieliny, w razie czopów śluzowych bronchofiberoskopia terapeutyczna), wczesna pionizacja pacjenta oraz profilaktyka przeciwzakrzepowa (LMWH po wykluczeniu aktywnego krwawienia).",
        "❌ BŁĄD! Długotrwałe leżenie na płasko i tłumienie kaszlu to prosta droga do masywnej niedodmy i śmiertelnego szpitalnego zapalenia płuc (VAP/HAP).",
        "❌ BŁĄD! Rutynowa profilaktyka antybiotykowa w urazach klatki piersiowej bez rany drążącej jest przeciwwskazana – selekcjonuje florę wielolekooporną.",
        "❌ BŁĄD! Długotrwała pozycja Trendelenburga upośledza ruchy przepony i wentylację stłuczonego płuca.",
        "❌ BŁĄD! Leki hamujące kaszel (np. kodeina) są wysoce szkodliwe – zalegająca w oskrzelach wydzielina i krew prowadzą do niedodmy i ropnego zapalenia płuc."
      ]
    }
  ],
  pathoNodes: [
    {
      badge: "Kluczowy defekt mechaniczny",
      title: "Wieloodłamowe złamanie ściany klatki i oddech paradoksalny",
      short: "Utrata sztywności ściany kostnej z powodu złamania >=3 sąsiednich żeber w >=2 miejscach prowadzi do wciągania segmentu przy wdechu i wypychania przy wydechu.",
      detail: "Zaburzenie mechaniki generowania ujemnego ciśnienia wewnątrzpłucnowego prowadzi do drastycznego wzrostu pracy oddechowej, zmęczenia mięśni przepony i hipowentylacji pęcherzykowej.",
      target: "Stabilizacja ściany klatki piersiowej",
      drugTarget: "<span class='dose-pill'>CPAP 5-10 cmH2O (pneumatyczne usztywnienie)</span> lub <span class='dose-pill'>Operacyjna osteosynteza SSRF płytkami tytanowymi</span>"
    },
    {
      badge: "Główny czynnik hipoksemii",
      title: "Stłuczenie płuca (Pulmonary Contusion) i przeciek płucny",
      short: "Przemoc tępa wywołuje uszkodzenie kapilar pęcherzykowych, krwiaki śródmiąższowe, obrzęk i inaktywację surfaktantu.",
      detail: "Obszary stłuczenia są perfundowane, lecz niewentylowane (V/Q = 0), co tworzy fizjologiczny przeciek płucny prawo-lewo (shunt), prowadząc do ciężkiej hipoksemii opornej na samą tlenoterapię bierną.",
      target: "Rekrutacja pęcherzyków i ograniczenie obrzęku",
      drugTarget: "<span class='dose-pill'>Restrykcyjna płynoterapia krystaloidami 1.0-1.5 ml/kg/h</span> oraz <span class='dose-pill'>Wentylacja protekcyjna Vt 6 ml/kg z PEEP 8-12 cmH2O</span>"
    },
    {
      badge: "Bariera oddechowa",
      title: "Potężny ból opłucnowy i płytki oddech (Splinting)",
      short: "Drażnienie nerwów międzyżebrowych przez ruchome odłamy kostne powoduje odruchowe spłycenie oddechu i zaniechanie kaszlu.",
      detail: "Zaleganie wydzieliny śluzowej i krwi w oskrzelach w połączeniu z brakiem głębokich wdechów prowadzi do wtórnej niedodmy resorpcyjnej i bakteryjnego zapalenia płuc w ciągu 48-72 godzin.",
      target: "Przerwanie przewodnictwa bólowego nerwów międzyżebrowych",
      drugTarget: "<span class='dose-pill'>Ciągła analgezja zewnątrzoponowa (TEA) ropiwakainą 0,2% z fentanylem 2 mcg/ml (4-8 ml/h)</span> lub <span class='dose-pill'>Blokada ESPB bupiwakainą 0,375% 20 ml</span>"
    },
    {
      badge: "Zagrożenie ogólnoustrojowe",
      title: "Niewydolność oddechowa i zespół ostrej niewydolności oddechowej (ARDS)",
      short: "Wyrzut cytokin prozapalnych (IL-1, IL-6, TNF-alfa) ze stłuczonego płuca indukuje uogólnioną reakcję zapalną.",
      detail: "Proces może rozprzestrzenić się na płuco przeciwległe, prowadząc do pourazowego zespołu ARDS, uogólnionego wykrzepiania włośniczkowego i konieczności długotrwałej wentylacji inwazyjnej.",
      target: "Protektomika płucna i toaleta oskrzelowa",
      drugTarget: "<span class='dose-pill'>Spirometria motywacyjna 10 wdechów/godzinę</span> oraz <span class='dose-pill'>Bronchofiberoskopia odsysająca</span> i <span class='dose-pill'>Enoksaparyna 40 mg s.c. po wykluczeniu krwawienia</span>"
    }
  ],
  diffTable: {
    title: "⚔️ Tabela Różnicowa: Ostre stany pourazowe klatki piersiowej",
    headers: [
      "Cecha kliniczna",
      "Wiotka klatka piersiowa (Flail chest)",
      "Odma prężna (Tension pneumothorax)",
      "Masywny krwiak opłucnej (Haemothorax)",
      "Tamponada osierdzia",
      "Odma otwarta (Sucking chest wound)",
      "Złamanie pojedynczych żeber"
    ],
    rows: [
      [
        "Mechanizm anatomiczny",
        "Złamanie >=3 sąsiednich żeber w >=2 miejscach z wyłamaniem ruchomego segmentu",
        "Mechanizm zastawkowy: ucieczka powietrza do opłucnej bez możliwości powrotu",
        "Masywne krwawienie (>1500 ml) do jamy opłucnej z naczyń międzyżebrowych / piersiowych",
        "Nagromadzenie krwi w worku osierdziowym uciskające komory serca",
        "Ubytek ściany klatki piersiowej (>2/3 średnicy tchawicy) łączący opłucną z otoczeniem",
        "Pojedyncze linijne pęknięcie żebra bez utraty stabilności klatki"
      ],
      [
        "Ruchomość ściany klatki",
        "Ruch paradoksalny (zapadanie we wdechu, uwypuklanie w wydechu)",
        "Symetryczna lub zmniejszona po stronie odmy, klatka 'rozdęta'",
        "Osłabiona ruchomość po stronie krwiaka",
        "Prawidłowa ruchomość ściany klatki piersiowej",
        "Świszczący przepływ powietrza przez ranę klatki piersiowej (ssąca rana)",
        "Ograniczona bólowo, bez ruchu paradoksalnego"
      ],
      [
        "Wypuk nad polami płucnymi",
        "Prawidłowy lub stłumiony w rzucie stłuczenia płuca",
        "Wybitnie bębenkowy (nadmiernie jawny) po stronie odmy",
        "Wybitnie stłumiony po stronie krwiaka od dołu ku górze",
        "Prawidłowy nad oboma polami płucnymi",
        "Bębenkowy po stronie rany drążącej",
        "Prawidłowy (jawny) symetrycznie"
      ],
      [
        "Szmer pęcherzykowy",
        "Ściszony z obecnością rzężeń i trzeszczeń (stłuczenie)",
        "Całkowicie zniesiony po stronie odmy prężnej",
        "Całkowicie zniesiony po stronie krwiaka",
        "Zachowany, symetryczny nad oboma polami płucnymi",
        "Znacznie osłabiony lub zniesiony po stronie rany",
        "Prawidłowy, symetryczny"
      ],
      [
        "Stan układu krążenia i żyły szyjne",
        "Zwykle stabilny (chyba że współistnieje wstrząs krwotoczny)",
        "Wstrząs obstrukcyjny, poszerzone żyły szyjne, przesunięcie tchawicy",
        "Wstrząs krwotoczny (hipowolemiczny), żyły szyjne zapadnięte!",
        "Triada Becka: hipotensja, ciche tony, poszerzone żyły szyjne (obstrukcja)",
        "Zależny od wielkości rany i hipoksji, spadek powrotu żylnego",
        "Prawidłowe ciśnienie i tętno, żyły szyjne prawidłowe"
      ],
      [
        "Natychmiastowe postępowanie ratunkowe",
        "Analgezja regionalna (TEA/ESPB) + CPAP/NIV (wewnętrzna szyna) + ewentualnie SSRF",
        "Natychmiastowe odbarczenie igłowe (II lub V m-żebrze), potem gruby dren",
        "Gruby dren 28-32F w V m-żebrzu + przetoczenia 1:1:1 + torakotomia przy >1500 ml",
        "Pilna perikardiocenteza odbarczająca lub okienko osierdziowe / sternotomia",
        "Opatrunek trójstronny (zastawkowy), a następnie dren opłucnowy i zaopatrzenie rany",
        "Doraźna analgezja doustna/dożylna, ćwiczenia oddechowe, leczenie ambulatoryjne"
      ]
    ]
  },
  dutySummary: {
    overview: "Wiotka klatka piersiowa (Flail Chest) to ciężki uraz ściany klatki piersiowej ze złamaniem co najmniej 3 sąsiednich żeber w co najmniej dwóch miejscach, tworzący ruchomy segment o oddechu paradoksalnym. Głównym motorem hipoksemii i zgonu jest podлежаce stłuczenie płuca (pulmonary contusion), w połączeniu z hipowentylacją wywołaną silnym bólem opłucnowym.",
    diagnostics: "1. Badanie e-FAST na Trauma Bay – natychmiastowe wykluczenie odmy prężnej i krwiaka opłucnej.<br>2. Tomografia komputerowa (TK klatki piersiowej z rekonstrukcjami 3D) – ocena dokładnej liczby i przemieszczenia złamanych żeber oraz objętości stłuczenia płuc.<br>3. Seryjna gazometria krwi tętniczej – monitorowanie wskaźnika oksygenacji PaO2/FiO2 i retencji CO2.<br>4. EKG i troponina I hs – wykluczenie stłuczenia mięśnia sercowego (myocardial contusion) w urazach tępych przedniej ściany.",
    drugsAndDoses: "1. Analgezja regionalna: Ciągła analgezja zewnątrzoponowa (TEA) z użyciem <span class='dose-pill'>Ropiwakaina 0,2% z Fentanylem 2 mcg/ml w ciągłym wlewie 4-8 ml/h</span> lub blokada prostownika grzbietu <span class='dose-pill'>ESPB: Bupiwakaina 0,375% 20 ml jednorazowo lub w cewniku</span>.<br>2. Analgezja systemowa: <span class='dose-pill'>Paracetamol 1000 mg i.v. co 6 h</span> w skojarzeniu z <span class='dose-pill'>Metamizol 1000 mg i.v. co 8 h</span>; opioidy doraźnie w małych dawkach <span class='dose-pill'>Fentanyl 25-50 mcg i.v.</span>.<br>3. Płynoterapia restrykcyjna: Zrównoważone krystaloidy (np. Plasmalyte / Sterofundin) w objętości <span class='dose-pill'>1.0-1.5 ml/kg m.c./godz.</span> pod kontrolą bilansu płynów i diurezy (>0.5 ml/kg/h).<br>4. Profilaktyka przeciwzakrzepowa: <span class='dose-pill'>Enoksaparyna 40 mg s.c. raz na dobę</span> po wykluczeniu krwawienia w TK.",
    procedures: "1. Nieinwazyjne wsparcie oddychania: <span class='dose-pill'>CPAP / NIV z PEEP 5-10 cmH2O</span> jako wewnętrzne usztywnienie pneumatyczne zapobiegające zapadaniu się segmentu.<br>2. Intubacja dotchawicza i wentylacja mechaniczna: Wskazana przy PaO2 < 60 mmHg na FiO2 > 0.5, kwasicy oddechowej pH < 7.25 lub wyczerpaniu mięśni oddechowych – stosowanie wentylacji protekcyjnej (<span class='dose-pill'>Vt 6 ml/kg pbw, PEEP 8-12 cmH2O</span>).<br>3. Operacyjna stabilizacja klatki piersiowej (SSRF): Zespolenie żeber tytanowymi płytkami anatomicznymi w pierwszych 24-72 h od urazu w przypadku dużej niestabilności, braku możliwości odłączenia od respiratora lub przemieszczeń odłamów.<br>4. Agresywna fizjoterapia oddechowa: Spirometria motywacyjna (minimum 10 cykli na godzinę), toaleta drzewa oskrzelowego, w razie potrzeby lecznicza bronchofiberoskopia odsysająca.",
    monitoring: "1. Ciągłe monitorowanie SpO2, EKG i częstości oddechów (RR).<br>2. Kontrola ciśnienia tętniczego metodą krwawą (linia tętnicza).<br>3. Ocena nasilenia bólu w skali NRS co 2-4 godziny (cel: NRS < 3 przy głębokim wdechu i kaszlu).<br>4. Codzienne kontrolne RTG klatki piersiowej w celu wykrycia późnych niedodm, zakażeń płucnych lub płynu w opłucnej."
  },
  lekQuestions: [
    {
      question: "Definicja wiotkiej klatki piersiowej (flail chest) obejmuje:",
      options: [
        "A. Złamanie co najmniej trzech sąsiednich żeber w co najmniej dwóch miejscach.",
        "B. Złamanie dowolnych dwóch żeber z obecnością odmy opłucnowej.",
        "C. Złamanie mostka połączone z pęknięciem obojczyka.",
        "D. Pęknięcie co najmniej czterech żeber po przeciwnych stronach klatki piersiowej.",
        "E. Uszkodzenie chrząstek żebrowych bez naruszenia ciągłości kości."
      ],
      correct: 0,
      correctIdx: 0,
      expl: "Prawidłowa odpowiedź to A. Wiotka klatka piersiowa (flail chest) jest definiowana anatomicznie jako złamanie co najmniej 3 kolejnych (sąsiednich) żeber w co najmniej dwóch miejscach każde, co powoduje wyłamanie wolnego, ruchomego fragmentu ściany klatki piersiowej."
    },
    {
      question: "Główną i bezpośrednią przyczyną zagrażającej życiu hipoksemii u pacjenta z wiotką klatką piersiową jest:",
      options: [
        "A. Odruchowy skurcz naczyń wieńcowych wywołany bólem.",
        "B. Współistniejące stłuczenie płuca (pulmonary contusion) pod wyłamanym segmentem klatki piersiowej.",
        "C. Porażenie strun głosowych na skutek urazu krtani.",
        "D. Przemieszczenie wątroby do klatki piersiowej przez pękniętą przeponę.",
        "E. Zator tłuszczowy ze złamanych kości żeber."
      ],
      correct: 1,
      correctIdx: 1,
      expl: "Prawidłowa odpowiedź to B. Choć sam paradoksalny ruch ściany klatki piersiowej zwiększa wysiłek oddechowy, to kluczowym mechanizmem ciężkiej hipoksemii jest podлежаce stłuczenie płuca (pulmonary contusion), w którym obrzęk, krwawienie śródpęcherzykowe i niedodma tworzą olbrzymi przeciek płucny prawo-lewo."
    },
    {
      question: "Złotym standardem kontroli bólu u pacjenta z mnogimi złamaniami żeber i wiotką klatką piersiową według wytycznych towarzystw urazowych jest:",
      options: [
        "A. Ciągła analgezja regionalna (np. piersiowe znieczulenie zewnątrzoponowe TEA lub blokada przykręgowa PVB / ESPB).",
        "B. Monoterapia morfiną podawaną domięśniowo co 4 godziny.",
        "C. Oklejenie klatki piersiowej szerokim plastrem sprężystym w celu unieruchomienia.",
        "D. Podawanie paracetamolu w monoterapii doustnej.",
        "E. Zastosowanie gipsowego gorsetu tułowiowego."
      ],
      correct: 0,
      correctIdx: 0,
      expl: "Prawidłowa odpowiedź to A. Złotym standardem w leczeniu przeciwbólowym mnogich złamań żeber i flail chest jest analgezja regionalna (zewnątrzoponowa piersiowa TEA, przykręgowa PVB lub blokada płaszczyzny mięśnia prostownika grzbietu ESPB). Zapewnia ona skuteczne zniesienie bólu bez depresji oddechowej i nadmiernej sedacji związanej z opioidami."
    },
    {
      question: "Wskaż prawidłową zasadę dotyczącą płynoterapii u pacjenta ze stłuczeniem płuc po tępym urazie klatki piersiowej bez aktywnego masywnego krwawienia:",
      options: [
        "A. Należy wdrożyć agresywne przetaczanie krystaloidów (>3000 ml w pierwszych 2 godzinach).",
        "B. Obowiązuje restrykcyjna strategia płynowa z unikaniem przewodnienia, ponieważ nadmiar płynów nasila obrzęk stłuczonego płuca i przyspiesza rozwój ARDS.",
        "C. Płyny dożylne są bezwzględnie przeciwwskazane przez pierwsze 72 godziny.",
        "D. Płynem z wyboru jest wyłącznie 10% roztwór glukozy.",
        "E. Rutynowo podaje się 2000 ml 20% albuminy w pierwszych 6 godzinach."
      ],
      correct: 1,
      correctIdx: 1,
      expl: "Prawidłowa odpowiedź to B. W stłuczonym płucu dochodzi do zwiększenia przepuszczalności bariery naczyniowo-pęcherzykowej. Nadmierna podaż płynów powoduje szybkie przesiąkanie krystaloidów do pęcherzyków, pogłębiając obrzęk płuc i nasilając hipoksemię, dlatego zalecana jest celowana, restrykcyjna płynoterapia."
    },
    {
      question: "Na czym polega zjawisko 'wewnętrznej pneumatycznej stabilizacji' (internal pneumatic splinting) w leczeniu wiotkiej klatki piersiowej?",
      options: [
        "A. Na chirurgicznym wprowadzeniu balonów do jam opłucnowych.",
        "B. Na zastosowaniu nieinwazyjnego dodatniego ciśnienia w drogach oddechowych (CPAP / PEEP), które rozpręża płuco i od wewnątrz stabilizuje wyłamany segment ściany klatki piersiowej.",
        "C. Na dooskrzelowym podaniu surfaktantu syntetycznego.",
        "D. Na wypełnieniu żołądka powietrzem przez sondę żołądkową w celu podparcia przepony.",
        "E. Na zastosowaniu kamizelki pneumatycznej uciskającej klatkę od zewnątrz."
      ],
      correct: 1,
      correctIdx: 1,
      expl: "Prawidłowa odpowiedź to B. Zastosowanie dodatniego ciśnienia w drogach oddechowych (CPAP z PEEP 5-10 cmH2O) wytwarza dodatnie ciśnienie przez cały cykl oddechowy, które działa jak 'pneumatyczna szyna', stabilizując ruchomy segment kostny od wewnątrz i zapobiegając jego zapadaniu podczas wdechu."
    },
    {
      question: "Które z poniższych stwierdzeń dotyczących operacyjnej stabilizacji klatki piersiowej (SSRF – Surgical Stabilization of Rib Fractures) jest PRAWDZIWE?",
      options: [
        "A. Jest bezwzględnie przeciwwskazana u pacjentów wentylowanych mechanicznie.",
        "B. Może zmniejszać czas wentylacji mechanicznej, skracać pobyt na OIT i redukować ryzyko zapalenia płuc u wyselekcjonowanych chorych z wiotką klatką piersiową.",
        "C. Wykonuje się ją wyłącznie po upływie 3 miesięcy od urazu po wytworzeniu zrostu kostnego.",
        "D. Polega na usunięciu złamanych żeber bez odtwarzania ciągłości ściany.",
        "E. Nie ma żadnych dowodów na korzyść kliniczną ze stabilizacji żeber w stosunku do samego leczenia zachowawczego."
      ],
      correct: 1,
      correctIdx: 1,
      expl: "Prawidłowa odpowiedź to B. Nowoczesne badania kliniczne (w tym metaanalizy i wytyczne EAST/WSES) wykazały, że wczesna operacyjna stabilizacja żeber (SSRF) płytkami tytanowymi u chorych z flail chest i ciężką deformacją znacząco skraca czas intubacji, zmniejsza częstość powikłań płucnych (w tym zapalenia płuc) oraz śmiertelność."
    },
    {
      question: "W badaniu fizykalnym pacjenta z wiotką klatką piersiową obserwuje się tzw. oddech paradoksalny. Polega on na:",
      options: [
        "A. Zapadaniu się wiotkiego segmentu klatki piersiowej podczas wdechu i jego uwypuklaniu podczas wydechu.",
        "B. Uwypuklaniu się całej klatki piersiowej w fazie wydechu bez ruchów w fazie wdechu.",
        "C. Zapadaniu się obu dołów nadobojczykowych podczas spokojnego wydechu.",
        "D. Nieruchomości przepony podczas próby głębokiego wdechu.",
        "E. Naprzemiennym unoszeniu się prawej i lewej połowy klatki piersiowej w kolejnych cyklach oddechowych."
      ],
      correct: 0,
      correctIdx: 0,
      expl: "Prawidłowa odpowiedź to A. W czasie wdechu obniżenie przepony wytwarza ujemne ciśnienie w klatce piersiowej, co powoduje zassanie ruchomego, odłączonego segmentu ściany do środka; z kolei podczas wydechu wzrost ciśnienia śródpiersiowego wypycha segment na zewnątrz."
    },
    {
      question: "Które postępowanie w leczeniu wiotkiej klatki piersiowej jest obecnie uznawane za BŁĄD SZTUKI i jest bezwzględnie PRZECIWWSKAZANE?",
      options: [
        "A. Oklejanie klatki piersiowej szerokim przylepcem lub ciasne bandażowanie w celu unieruchomienia segmentu.",
        "B. Stosowanie blokady przedziału prostownika grzbietu (ESPB).",
        "C. Prowadzenie tlenoterapii wysokoprzepływowej (HFNO).",
        "D. Wczesne wdrażanie spirometrii motywacyjnej po znieczuleniu regionalnym.",
        "E. Wykonanie tomografii komputerowej klatki piersiowej z rekonstrukcjami 3D."
      ],
      correct: 0,
      correctIdx: 0,
      expl: "Prawidłowa odpowiedź to A. Zewnętrzne bandażowanie, unieruchamianie opaskami czy oklejanie plastrami ściany klatki piersiowej drastycznie ogranicza ruchomość klatki, promuje gwałtowny rozwój niedodmy, retencję wydzieliny i śmiertelne zapalenie płuc. Metoda ta jest historyczna i bezwzględnie zarzucona."
    },
    {
      question: "Najczęstszym późnym powikłaniem płucnym u pacjentów ze stłuczeniem płuc i mnogimi złamaniami żeber jest:",
      options: [
        "A. Zapalenie płuc (pneumonia).",
        "B. Zatorowość tłuszczowa mózgu.",
        "C. Zwężenie tchawicy.",
        "D. Pęknięcie pęcherzyka rozedmowego po stronie przeciwnej.",
        "E. Ziarniniak krtani."
      ],
      correct: 0,
      correctIdx: 0,
      expl: "Prawidłowa odpowiedź to A. Zapalenie płuc rozwija się u niemal 30-50% pacjentów z ciężkim urazem ściany klatki piersiowej na skutek niedodmy, zalegania krwi i wydzieliny w drogach oddechowych oraz upośledzonego kaszlu wywołanego bólem."
    },
    {
      question: "U 46-letniego pacjenta z wiotką klatką piersiową i stłuczeniem płuca dochodzi do nagłego pogorszenia: gwałtowny spadek SpO2 do 75%, tachykardia 140/min, spadek ciśnienia tętniczego do 70/40 mmHg oraz jednostronny bębenkowy wypuk i zniesienie szmerów oddechowych po stronie urazu. Najbardziej prawdopodobnym powikłaniem jest:",
      options: [
        "A. Odma prężna (tension pneumothorax).",
        "B. Zawał mięśnia sercowego ze wstrząsem kardiogennym.",
        "C. Tamponada osierdzia.",
        "D. Pęknięcie przepony.",
        "E. Zator tętnicy płucnej skrzepliną z kończyn dolnych."
      ],
      correct: 0,
      correctIdx: 0,
      expl: "Prawidłowa odpowiedź to A. Nagła niestabilność hemodynamiczna (hipotensja, tachykardia) połączona z jednostronnym bębenkowym wypukiem i zniesieniem szmeru oddechowego u pacjenta po tępym urazie klatki piersiowej to klasyczny obraz rozwijającej się odmy prężnej (tension pneumothorax), wymagającej natychmiastowego odbarczenia."
    },
    {
      question: "Wskaż badanie obrazowe o najwyższej czułości i dokładności w diagnostyce mnogich złamań żeber, wiotkiej klatki piersiowej oraz stłuczenia płuc:",
      options: [
        "A. Tomografia komputerowa (TK) klatki piersiowej z rekonstrukcjami trójwymiarowymi (3D).",
        "B. Klasyczne zdjęcie rentgenowskie klatki piersiowej w projekcji PA.",
        "C. Zdjęcie rentgenowskie klatki piersiowej w projekcji bocznej.",
        "D. Badanie scyntygraficzne kośćca z użyciem technetu-99m.",
        "E. Badanie USG przezprzełykowe (TEE)."
      ],
      correct: 0,
      correctIdx: 0,
      expl: "Prawidłowa odpowiedź to A. Tomografia komputerowa klatki piersiowej z rekonstrukcjami 3D jest złotym standardem obrazowania w urazach klatki piersiowej; pozwala wykryć złamania niewidoczne w klasycznym RTG (klasyczne RTG przeocza aż do 50% złamań) oraz precyzyjnie ocenić zasięg i stopień stłuczenia miąższu płucnego."
    }
  ],
  flashcards: [
    {
      front: "Jak definiuje się wiotką klatkę piersiową (Flail Chest)?",
      back: "Złamanie co najmniej 3 sąsiednich żeber w co najmniej 2 miejscach (lub obustronne złamanie żeber ze złamaniem mostka), co powoduje powstanie wolnego, ruchomego segmentu ściany klatki poruszającego się paradoksalnie (zapadanie we wdechu, wypychanie w wydechu)."
    },
    {
      front: "Co stanowi główną przyczynę ciężkiej hipoksemii w przebiegu wiotkiej klatki piersiowej?",
      back: "Towarzyszące stłuczenie płuca (pulmonary contusion) pod wyłamanym segmentem. Krwawienie śródpęcherzykowe, obrzęk i niedodma tworzą duży przeciek płucny prawo-lewo (shunt), upośledzając utlenowanie krwi."
    },
    {
      front: "Jaka metoda leczenia bólu jest złotym standardem w mnogich złamaniach żeber i dlaczego?",
      back: "Analgezja regionalna: ciągłe znieczulenie zewnątrzoponowe piersiowe (TEA) lub blokada przykręgowa (PVB) / ESPB. Zapewnia doskonałą kontrolę bólu bez depresji oddechowej i nadmiernej sedacji związanej z opioidami."
    },
    {
      front: "Na czym polega zasada 'wewnętrznej pneumatycznej stabilizacji' w flail chest?",
      back: "Na zastosowaniu wentylacji z dodatnim ciśnieniem (CPAP / NIV z PEEP 5-10 cmH2O). Ciśnienie rozpręża płuco i od wewnątrz stabilizuje wyłamany segment ściany klatki, zapobiegając jego zapadaniu i niedodmie."
    },
    {
      front: "Dlaczego w stłuczeniu płuc obowiązuje restrykcyjna płynoterapia krystaloidami?",
      back: "Uszkodzone kapilary w stłuczonym miąższu płucnym mają patologicznie zwiększoną przepuszczalność. Nadmierna podaż płynów gwałtownie nasila obrzęk pęcherzykowy i przyspiesza rozwój pourazowego zespołu ARDS."
    },
    {
      front: "Dlaczego ciasne bandażowanie lub oklejanie plastrami wiotkiej klatki piersiowej jest błędem sztuki?",
      back: "Ogranicza ruchomość klatki piersiowej, pogłębia hipowentylację, drastycznie nasila niedodmę, upośledza odkrztuszanie wydzieliny i prowadzi do śmiertelnego bakteryjnego zapalenia płuc."
    }
  ]
};

// Mirroring fields for dual-layer compatibility
case149.steps.forEach(s => {
  s.question = s.title;
  s.explanation = s.feedback[s.correct];
});

case149.lekQuestions.forEach(q => {
  q.opts = q.options;
  q.correctIdx = q.correct;
  q.exp = q.expl;
});

async function main() {
  const targetPath = path.join(__dirname, '../cases/149_wiotka_klatka_piersiowa_flail_chest.json');
  console.log(`Writing and encrypting Case 149 to ${targetPath}...`);
  const encrypted = await encryptStringAes(JSON.stringify(case149, null, 2), MASTER_KEY);
  fs.writeFileSync(targetPath, JSON.stringify(encrypted, null, 2), 'utf-8');
  console.log(`[SAVED] Case #149: 149_wiotka_klatka_piersiowa_flail_chest.json (LEK Qs: ${case149.lekQuestions.length}, Steps: ${case149.steps.length}, Flashcards: ${case149.flashcards.length})`);
}

main().catch(err => {
  console.error("Error generating Case 149:", err);
  process.exit(1);
});

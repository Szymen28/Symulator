const fs = require('fs');
const path = require('path');
const { encryptStringAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

const case150 = {
  id: 150,
  dept: "Medycyna ratunkowa",
  title: "Masywny krwiak opłucnej / Haemothorax (Thoracic Trauma & Massive Hemothorax)",
  shortTitle: "29-letni Kamil – Rana kłuta lewej strony klatki piersiowej, bladość, stłumienie wypuku i wstrząs krwotoczny (Masywny krwiak opłucnej / Haemothorax)",
  diagnosisTitle: "Masywny krwiak lewej jamy opłucnej (Massive Left Haemothorax) po urazie drążącym (rana kłuta klatki piersiowej) – uszkodzenie lewej tętnicy międzyżebrowej, wstrząs krwotoczny stopnia III, pilny drenaż klatki piersiowej 28-32F, autotransfuzja, wskazania do natychmiastowej torakotomii ratunkowej",
  vitals: [
    { name: "Częstość akcji serca", val: "128/min", status: "vital-crit" },
    { name: "Ciśnienie tętnicze", val: "82/50 mmHg", status: "vital-crit" },
    { name: "Temperatura ciała", val: "36.2 °C", status: "vital-ok" },
    { name: "Saturacja SpO2", val: "90% (tlen 10 l/min maska)", status: "vital-warn" }
  ],
  vitalsObj: {
    hr: 128,
    bp: "82/50",
    spo2: 90,
    rr: 28,
    temp: 36.2,
    gcs: 13
  },
  story: "<p><strong>Pacjent:</strong> 29-letni Kamil został przetransportowany przez zespół ratownictwa medycznego (ZRM) na Szpitalny Oddział Ratunkowy (Centrum Urazowe) w kodzie pilności 1 (czerwonym) po napaści z użyciem ostrego narzędzia (nóż sprężynowy) przed klubem nocnym.</p><p><strong>Wywiad chorobowy:</strong> Do zdarzenia doszło około 25 minut temu. Według relacji świadków napastnik zadał poszkodowanemu jeden cios nożem w lewy bok klatki piersiowej. Pacjent natychmiast osunął się na chodnik, zgłaszając gwałtowny, rwący ból w boku, nasilającą się duszność, mroczki przed oczami oraz skrajne osłabienie. W chwili przyjazdu ZRM: blady, zlewne poty, BP 90/55 mmHg, HR 125/min. Ratownicy zabezpieczyli ranę jałowym opatrunkiem uciskowym, założyli dwa kaniule dożylne 16G, wdrożyli tlenoterapię bierną przez maskę z rezerwuarem oraz rozpoczęli powolny wlew 500 ml roztworu krystaloidów. W wywiadzie od pacjenta (udziela krótkich, jednozdaniowych odpowiedzi): dotychczas całkowicie zdrowy, nie chorował przewlekle, nie przyjmuje żadnych leków na stałe, uczuleń brak; przed napadem spożywał piwo.</p><p><strong>Badanie przedmiotowe na SOR (Trauma Bay):</strong> Pacjent w ułożeniu na wznak z wezgłowiem uniesionym pod kątem 30 stopni. Skóra woskowa, chłodna, obficie pokryta lepkim potem. Pacjent splątany, podsypiający, otwiera oczy na głos, odpowiada pojedynczymi słowami (GCS 13 pkt – E3V4M6). Drogi oddechowe drożne, tchawica położona pośrodkowo, bez ewidentnego przemieszczenia na stronę prawą. Żyły szyjne zapadnięte (cecha ciężkiej hipowolemii, kluczowa w różnicowaniu z odmą prężną i tamponadą serca!). W V przestrzeni międzyżebrowej w lewej linii pachowej przedniej widoczna czysta, linijna rana kłuta o długości około 3 cm, z której stale sączy się ciemnoczerwona krew; rana nie zasysa powietrza atmosferycznego. W badaniu klatki piersiowej: wypuk po stronie lewej od IV międzyżebrza w dół wybitnie stłumiony (odpowiada obecności dużej ilości płynu), powyżej wypuk jawny; po stronie prawej wypuk jawny. Osłuchowo: szmer pęcherzykowy po stronie lewej w polach dolnych i środkowych całkowicie niesłyszalny, po stronie prawej szmer pęcherzykowy prawidłowy, symetryczny. Tony serca głuche, tachykardia 128/min, bez słyszalnego tarcia osierdziowego. Brzuch miękki, niebolesny, bez objawów otrzewnowych, perystaltyka leniwa. Miednica stabilna. Tętno na tętnicach promieniowych ledwo wyczuwalne, nitkowate. Nawrót kapilarny wydłużony do 4 sekund. HR 128/min, BP 82/50 mmHg, SpO2 90% na masce tlenowej, RR 28/min, temperatura głęboka 36.2°C.</p>",
  labs: [
    {
      name: "Morfologia krwi i hemostaza (Trauma Lab Cito)",
      items: [
        { name: "Hemoglobina (Hb)", val: "8.1 g/dl", norm: "13.5 - 17.5 g/dl", flag: "CRIT_LOW" },
        { name: "Hematokryt (Hct)", val: "24.8 %", norm: "40.0 - 52.0 %", flag: "CRIT_LOW" },
        { name: "Płytki krwi (PLT)", val: "115 G/l", norm: "150 - 400 G/l", flag: "LOW" },
        { name: "Leukocyty (WBC)", val: "13.8 G/l", norm: "4.0 - 10.0 G/l", flag: "HIGH" },
        { name: "Fibrynogen", val: "1.3 g/l", norm: "2.0 - 4.0 g/l", flag: "CRIT_LOW" },
        { name: "INR", val: "1.52", norm: "0.8 - 1.2", flag: "CRIT_HIGH" },
        { name: "APTT", val: "48 s", norm: "26 - 36 s", flag: "CRIT_HIGH" }
      ]
    },
    {
      name: "Gazometria krwi tętniczej (wstrząs krwotoczny)",
      items: [
        { name: "pH", val: "7.22", norm: "7.35 - 7.45", flag: "CRIT_LOW" },
        { name: "pO2", val: "65 mmHg", norm: "80 - 100 mmHg", flag: "LOW" },
        { name: "pCO2", val: "33 mmHg", norm: "35 - 45 mmHg", flag: "LOW" },
        { name: "HCO3-", val: "13.5 mmol/l", norm: "22.0 - 26.0 mmol/l", flag: "CRIT_LOW" },
        { name: "Base Excess (BE)", val: "-12.0 mmol/l", norm: "-2.5 - +2.5 mmol/l", flag: "CRIT_LOW" },
        { name: "Mleczany (Lactate)", val: "5.8 mmol/l", norm: "0.5 - 1.6 mmol/l", flag: "CRIT_HIGH" }
      ]
    },
    {
      name: "Biochemia, elektrolity i próba krzyżowa",
      items: [
        { name: "Kreatynina", val: "1.25 mg/dl", norm: "0.7 - 1.2 mg/dl", flag: "HIGH" },
        { name: "Wapń zjonizowany (Ca2+)", val: "0.92 mmol/l", norm: "1.15 - 1.30 mmol/l", flag: "CRIT_LOW" },
        { name: "Potas (K+)", val: "4.8 mmol/l", norm: "3.5 - 5.0 mmol/l", flag: "NORMAL" },
        { name: "Grupa krwi", val: "A RhD-dodatni (aktywacja MTP 1:1:1 w toku)", norm: "-", flag: "NORMAL" }
      ]
    }
  ],
  steps: [
    {
      step: 1,
      title: "Krok 1: Badanie fizykalne i natychmiastowe różnicowanie wstrząsu na Trauma Bay",
      question: "Krok 1: Badanie fizykalne i natychmiastowe różnicowanie wstrząsu na Trauma Bay",
      text: "Pacjent Kamil leży w stanie wstrząsu (BP 82/50 mmHg, HR 128/min) po ranie kłutej lewego boku. Stwierdzasz stłumienie wypuku i brak szmeru po lewej stronie oraz ZAPADNIĘTE żyły szyjne. Jakie rozpoznanie jest najbardziej prawdopodobne i co decyduje o wykluczeniu odmy prężnej oraz tamponady serca?",
      explanation: "✅ PRAWIDŁOWO! <strong>Różnicowanie wstrząsu na Trauma Bay:</strong> Połączenie stłumionego wypuku, zniesienia szmeru pęcherzykowego i zapadniętych żył szyjnych wskazuje na masywny krwiak opłucnej (masywną utratę krwi do opłucnej i wstrząs hipowolemiczny). W odmie prężnej wypuk jest bębenkowy, a żyły szyjne są mocno wypełnione (zastój żylny); z kolei w tamponadzie osierdzia szmery oddechowe są symetryczne, a żyły szyjne poszerzone (triada Becka).",
      options: [
        "A. Masywny krwiak opłucnej (stłumiony wypuk, brak szmeru, wstrząs hipowolemiczny z zapadniętymi żyłami szyjnymi).",
        "B. Odma prężna lewostronna, w której stłumienie wypuku wynika z obecności powietrza pod ciśnieniem.",
        "C. Izolowana ostra tamponada osierdzia, która zawsze charakteryzuje się jednostronnym brakiem szmeru oddechowego.",
        "D. Wstrząs neurogenny z powodu odruchowego porażenia nerwu błędnego po urazie ściany klatki.",
        "E. Pourazowe pęknięcie pęcherzyka żółciowego z żółciowym zapaleniem otrzewnej."
      ],
      correct: 0,
      correctIdx: 0,
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Różnicowanie wstrząsu na Trauma Bay:</strong> Połączenie stłumionego wypuku, zniesienia szmeru pęcherzykowego i zapadniętych żył szyjnych wskazuje na masywny krwiak opłucnej (masywną utratę krwi do opłucnej i wstrząs hipowolemiczny). W odmie prężnej wypuk jest bębenkowy, a żyły szyjne są mocno wypełnione (zastój żylny); z kolei w tamponadzie osierdzia szmery oddechowe są symetryczne, a żyły szyjne poszerzone (triada Becka).",
        "❌ BŁĄD! W odmie prężnej wypuk jest bębenkowy (hiperrezonantny), a żyły szyjne są poszerzone wskutek ucisku na żyłę główną górną i dolną.",
        "❌ BŁĄD! W tamponadzie szmer pęcherzykowy jest symetryczny i prawidłowy, a żyły szyjne są silnie wypełnione.",
        "❌ BŁĄD! We wstrząsie neurogennym występuje hipotensja z bradykardią (nie tachykardią!) i ocieplona skóra, a nie bladość i stłumienie wypuku w klatce.",
        "❌ BŁĄD! Pęknięcie pęcherzyka żółciowego nie tłumaczy stłumienia wypuku w lewej jamie opłucnej ani ostrego wstrząsu krwotocznego po ranie klatki."
      ]
    },
    {
      step: 2,
      title: "Krok 2: Definicja masywnego krwiaka opłucnej (Massive Haemothorax)",
      question: "Krok 2: Definicja masywnego krwiaka opłucnej (Massive Haemothorax)",
      text: "Jak definiuje się masywny krwiak opłucnej (Massive Haemothorax) według wytycznych ATLS (Advanced Trauma Life Support)?",
      explanation: "✅ PRAWIDŁOWO! <strong>Definicja masywnego krwiaka opłucnej:</strong> Stan ten definiuje się jako nagłe nagromadzenie w jamie opłucnowej ponad 1500 ml krwi (lub >1/3 objętości krwi krążącej pacjenta, a u dzieci >20 ml/kg m.c.). Skutkuje to jednoczesnym głębokim wstrząsem hipowolemicznym (krwotocznym) oraz kompresją miąższu płucnego z ciężką hipoksją i przemieszczeniem śródpiersia.",
      options: [
        "A. Nagromadzenie ponad 1500 ml krwi w jamie opłucnowej (lub >1/3 wolemii pacjenta).",
        "B. Obecność jakiejkolwiek ilości krwi w opłucnej potwierdzona w badaniu USG.",
        "C. Utrata ponad 300 ml krwi w ciągu 24 godzin z drenu opłucnowego.",
        "D. Krwiak opłucnej z towarzyszącym złamaniem co najmniej 5 żeber.",
        "E. Krwawienie z miąższu płuca o objętości przekraczającej 100 ml."
      ],
      correct: 0,
      correctIdx: 0,
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Definicja masywnego krwiaka opłucnej:</strong> Stan ten definiuje się jako nagłe nagromadzenie w jamie opłucnowej ponad 1500 ml krwi (lub >1/3 objętości krwi krążącej pacjenta, a u dzieci >20 ml/kg m.c.). Skutkuje to jednoczesnym głębokim wstrząsem hipowolemicznym (krwotocznym) oraz kompresją miąższu płucnego z ciężką hipoksją i przemieszczeniem śródpiersia.",
        "❌ BŁĄD! Niewielka ilość krwi (<300-500 ml) to krwiak mały, niekwalifikujący się do definicji 'masywnego'.",
        "❌ BŁĄD! 300 ml na dobę to powolne krwawienie, niewyczerpujące kryteriów masywnego krwotoku.",
        "❌ BŁĄD! Definicja opiera się na utraconej objętości krwi i niestabilności hemodynamicznej, a nie na liczbie złamanych żeber.",
        "❌ BŁĄD! 100 ml krwi nie stanowi zagrożenia życia ani nie definiuje masywnego krwiaka."
      ]
    },
    {
      step: 3,
      title: "Krok 3: Wdrożenie pilnego drenażu jamy opłucnowej (Chest Tube)",
      question: "Krok 3: Wdrożenie pilnego drenażu jamy opłucnowej (Chest Tube)",
      text: "Na sali reanimacyjnej podejmowana jest decyzja o odbarczeniu krwiaka. Jaka jest prawidłowa technika, rozmiar drenu i lokalizacja anatomiczna jego wprowadzenia?",
      explanation: "✅ PRAWIDŁOWO! <strong>Drenaż jamy opłucnowej w masywnym krwiaku:</strong> Wskazane jest założenie grubego drenu klatki piersiowej (o średnicy 28–32F, u dorosłych mężczyzn nawet 36F, aby zapobiec zatkaniu przez skrzepy krwi) w V przestrzeni międzyżebrowej, nieco do przodu od linii pachowej środkowej (w trójkącie bezpieczeństwa), prowadząc dren po górnym brzegu dolnego żebra (ochrona pęczka naczyniowo-nerwowego międzyżebrowego) w kierunku szczytowo-tylnym.",
      options: [
        "A. Gruby dren (28–32F) w V przestrzeni międzyżebrowej, do przodu od linii pachowej środkowej, po górnym brzegu dolnego żebra, podłączony do układu trójkomorowego.",
        "B. Cienki cewnik typu Pigtail (8F) w II przestrzeni międzyżebrowej w linii środkowo-obojczykowej.",
        "C. Dren 12F wprowadzony w VIII międzyżebrzu w linii przykręgosłupowej po dolnym brzegu żebra.",
        "D. Nakłucie igłą biopsyjną 21G i aspiracja 20 ml strzykawką.",
        "E. Wprowadzenie kaniuli naczyniowej do światła rany kłutej w celu jej poszerzenia."
      ],
      correct: 0,
      correctIdx: 0,
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Drenaż jamy opłucnowej w masywnym krwiaku:</strong> Wskazane jest założenie grubego drenu klatki piersiowej (o średnicy 28–32F, u dorosłych mężczyzn nawet 36F, aby zapobiec zatkaniu przez skrzepy krwi) w V przestrzeni międzyżebrowej, nieco do przodu od linii pachowej środkowej (w trójkącie bezpieczeństwa), prowadząc dren po górnym brzegu dolnego żebra (ochrona pęczka naczyniowo-nerwowego międzyżebrowego) w kierunku szczytowo-tylnym.",
        "❌ BŁĄD! Cienki dren Pigtail (8-14F) natychmiast zatka się gęstymi skrzepami krwi; ponadto II międzyżebrze to miejsce odbarczania odmy, a nie krwiaka leżącego grawitacyjnie na dole.",
        "❌ BŁĄD! Prowadzenie drenu po dolnym brzegu żebra grozi jatrogennym uszkodzeniem tętnicy międzyżebrowej; VIII międzyżebrze grozi uszkodzeniem przepony i śledziony!",
        "❌ BŁĄD! Nakłucie igłą 21G jest całkowicie nieskuteczne w ewakuacji litrów gęstej krwi.",
        "❌ BŁĄD! Nigdy nie drenuje się jamy opłucnej przez samą ranę urazową – sprzyja to infekcji, zafałszowaniu kanału i powikłaniom."
      ]
    },
    {
      step: 4,
      title: "Krok 4: Wskazania do natychmiastowej torakotomii ratunkowej (Emergency Thoracotomy)",
      question: "Krok 4: Wskazania do natychmiastowej torakotomii ratunkowej (Emergency Thoracotomy)",
      text: "Po wprowadzeniu drenu 32F do butli natychmiast wytoczyło się 1600 ml ciemnoczerwonej krwi, a w ciągu kolejnych 15 minut z drenu napłynęło kolejne 250 ml. Jakie są bezwzględne wskazania drenażowe do pilnej torakotomii operacyjnej według wytycznych ATLS?",
      explanation: "✅ PRAWIDŁOWO! <strong>Kryteria torakotomii ratunkowej w krwiaku opłucnej:</strong> Wskazaniami do natychmiastowej operacji są: 1) Natychmiastowe utoczenie z drenu >1500 ml krwi (lub >20 ml/kg m.c.); 2) Utrzymujące się krwawienie z drenu >200–250 ml/h przez kolejne 2–4 godziny; 3) Niestabilność hemodynamiczna mimo agresywnej resuscytacji płynowo-krwiowej; 4) Masywny przeciek powietrza uniemożliwiający rozprężenie płuca.",
      options: [
        "A. Natychmiastowy drenaż >1500 ml krwi LUB stały wypływ >200–250 ml/h przez 2–4 godziny LUB utrzymująca się niestabilność hemodynamiczna.",
        "B. Wypływ powyżej 50 ml krwi w ciągu pierwszych 12 godzin od urazu.",
        "C. Wyłącznie zatrzymanie akcji serca w mechanizmie asystolii trwające powyżej 30 minut.",
        "D. Każda obecność skrzepów w butli drenażowej bez względu na objętość.",
        "E. Wskazaniem jest wyłącznie życzenie pacjenta lub jego rodziny."
      ],
      correct: 0,
      correctIdx: 0,
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Kryteria torakotomii ratunkowej w krwiaku opłucnej:</strong> Wskazaniami do natychmiastowej operacji są: 1) Natychmiastowe utoczenie z drenu >1500 ml krwi (lub >20 ml/kg m.c.); 2) Utrzymujące się krwawienie z drenu >200–250 ml/h przez kolejne 2–4 godziny; 3) Niestabilność hemodynamiczna mimo agresywnej resuscytacji płynowo-krwiowej; 4) Masywny przeciek powietrza uniemożliwiający rozprężenie płuca.",
        "❌ BŁĄD! 50 ml krwi to minimalny drenaż, kwalifikujący się do obserwacji i leczenia zachowawczego.",
        "❌ BŁĄD! Zatrzymanie akcji serca trwające >30 min bez oznak życia stanowi kryterium zaniechania resuscytacji, a nie wskazanie do planowej torakotomii.",
        "❌ BŁĄD! Skrzepy są zjawiskiem naturalnym; liczy się dynamika krwotoku i utracona wolemia.",
        "❌ BŁĄD! Wskazania chirurgiczne wynikają ściśle ze stanu klinicznego i kryteriów EBM."
      ]
    },
    {
      step: 5,
      title: "Krok 5: Wykorzystanie krwi z jamy opłucnej do autotransfuzji (Cell Saver)",
      question: "Krok 5: Wykorzystanie krwi z jamy opłucnej do autotransfuzji (Cell Saver)",
      text: "W trakcie przygotowań do bloku operacyjnego zespół decyduje o podłączeniu drenu do systemu autotransfuzji krwi. Dlaczego krew z jamy opłucnej w czystym urazie klatki piersiowej jest idealnym materiałem do retransfuzji?",
      explanation: "✅ PRAWIDŁOWO! <strong>Autotransfuzja z drenażu opłucnowego:</strong> Krew gromadząca się w jamie opłucnowej ulega fizjologicznej defibrynacji na skutek mechanicznego ruchu płuc i serca, dzięki czemu nie krzepnie, zachowuje temperaturę 37°C, ma właściwości nośnika tlenu i jest idealnie zgodna antygenowo. Podanie własnej krwi eliminuje ryzyko odczynów poprzetoczeniowych i zakażeń wirusowych oraz jest natychmiast dostępne na sali operacyjnej/SOR.",
      options: [
        "A. Krew w jamie opłucnej ulega mechanicznej defibrynacji przez ruchy serca i płuc (nie krzepnie), ma temperaturę ciała, jest idealnie zgodna antygenowo i natychmiast dostępna.",
        "B. Krew opłucnowa zawiera 10-krotnie więcej leukocytów, co chroni pacjenta przed sepsą.",
        "C. Zawiera wysokie stężenie heparyny syntetyzowanej przez mezotelium opłucnej.",
        "D. Może być podana bez żadnego filtrowania, nawet jeśli doszło do pęknięcia żołądka i obecności treści pokarmowej.",
        "E. Nie niesie żadnych korzyści i jest zakazana przez wytyczne europejskie."
      ],
      correct: 0,
      correctIdx: 0,
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Autotransfuzja z drenażu opłucnowego:</strong> Krew gromadząca się w jamie opłucnowej ulega fizjologicznej defibrynacji na skutek mechanicznego ruchu płuc i serca, dzięki czemu nie krzepnie, zachowuje temperaturę 37°C, ma właściwości nośnika tlenu i jest idealnie zgodna antygenowo. Podanie własnej krwi eliminuje ryzyko odczynów poprzetoczeniowych i zakażeń wirusowych oraz jest natychmiast dostępne na sali operacyjnej/SOR.",
        "❌ BŁĄD! Krew ta nie ma nadmiernej liczby leukocytów chroniących przed sepsą.",
        "❌ BŁĄD! Mezotelium nie wytwarza heparyny; defibrynacja zachodzi mechanicznie poprzez odkładanie fibryny na powierzchniach opłucnej.",
        "❌ BŁĄD! Współistniejące skażenie treścią przewodu pokarmowego (np. przy pęknięciu przepony i żołądka) stanowi bezwzględne przeciwwskazanie do autotransfuzji bez specjalistycznego płukania!",
        "❌ BŁĄD! Autotransfuzja jest zalecaną procedurą ratującą życie w ATLS."
      ]
    },
    {
      step: 6,
      title: "Krok 6: Resuscytacja hemostatyczna i zapobieganie letalnej triadzie",
      question: "Krok 6: Resuscytacja hemostatyczna i zapobieganie letalnej triadzie",
      text: "Pacjent jest w głębokim wstrząsie krwotocznym (Hb 8.1 g/dl, mleczany 5.8 mmol/l, pH 7.22). Jakie farmakologiczne i transfuzjologiczne działania należy wdrożyć natychmiast przed cięciem chirurgicznym?",
      explanation: "✅ PRAWIDŁOWO! <strong>Resuscytacja hemostatyczna i kwas traneksamowy:</strong> Kluczowe jest podanie kwasu traneksamowego (TXA) <span class='dose-pill'>1 g i.v. we wlewie w 10 minut</span> (w oknie <3 h od urazu), natychmiastowe wdrożenie Protokołu Masywnej Transfuzji (MTP) w zbalansowanej proporcji 1:1:1 (KKCz : FFP : KKP), podgrzewanie płynów i pacjenta (zapobieganie hipotermii), suplementacja wapnia (<span class='dose-pill'>Calcium chloratum 1 g i.v.</span>) oraz unikanie nadmiernej krystaloidoterapii.",
      options: [
        "A. Natychmiastowe podanie kwasu traneksamowego (TXA 1 g i.v. w 10 min), aktywacja MTP 1:1:1 (KKCz : FFP : KKP), ogrzewanie płynów i suplementacja wapnia.",
        "B. Przetoczenie 4000 ml zimnego 0,9% NaCl w ciągu 15 minut.",
        "C. Podanie heparyny drobnocząsteczkowej 1 mg/kg w celu zapobieżenia zakrzepicy żył głębokich.",
        "D. Podaż wyłącznie roztworu 20% mannitolu z wodorowęglanem sodu.",
        "E. Podanie rekombinowanego aktywatora plazminogenu (rtPA) doopłucnowo."
      ],
      correct: 0,
      correctIdx: 0,
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Resuscytacja hemostatyczna i kwas traneksamowy:</strong> Kluczowe jest podanie kwasu traneksamowego (TXA) <span class='dose-pill'>1 g i.v. we wlewie w 10 minut</span> (w oknie <3 h od urazu), natychmiastowe wdrożenie Protokołu Masywnej Transfuzji (MTP) w zbalansowanej proporcji 1:1:1 (KKCz : FFP : KKP), podgrzewanie płynów i pacjenta (zapobieganie hipotermii), suplementacja wapnia (<span class='dose-pill'>Calcium chloratum 1 g i.v.</span>) oraz unikanie nadmiernej krystaloidoterapii.",
        "❌ BŁĄD! Szybkie wlanie 4 litrów zimnego krystaloidu wywoła hipotermię, koagulopatię z rozcieńczenia i kwasicę hiperchloremiczną – to prosta droga do 'letalnej triady' i zgonu!",
        "❌ BŁĄD! Heparyna u pacjenta z aktywnym krwotokiem do opłucnej spowoduje natychmiastowe wykrwawienie.",
        "❌ BŁĄD! Mannitol nasili hipowolemię i wstrząs krwotoczny.",
        "❌ BŁĄD! rtPA to lek fibrynolityczny – jego podanie w ostrym krwotoku zniszczy skrzepy hemostatyczne i doprowadzi do śmierci chorego!"
      ]
    },
    {
      step: 7,
      title: "Krok 7: Źródła anatomiczne masywnego krwawienia – krążenie systemowe vs płucne",
      question: "Krok 7: Źródła anatomiczne masywnego krwawienia – krążenie systemowe vs płucne",
      text: "Na bloku operacyjnym torakochirurg wykonuje torakotomię przednio-boczną. Co z punktu widzenia fizjologii i anatomii naczyniowej klatki piersiowej jest najczęstszą przyczyną krwawienia wymagającego torakotomii?",
      explanation: "✅ PRAWIDŁOWO! <strong>Źródła anatomiczne krwotoku w klatce piersiowej:</strong> Krwawienia opłucnowe wymagające torakotomii pochodzą w przeważającej mierze z naczyń krążenia układowego (systemowego) pod wysokim ciśnieniem (ciśnienie tętnicze ~120 mmHg) – najczęściej z tętnicy międzyżebrowej (arteria intercostalis) lub tętnicy piersiowej wewnętrznej (arteria thoracica interna). Krwawienia z miąższu płucnego pochodzą z krążenia płucnego niskociśnieniowego (~20-25 mmHg) i niemal zawsze samoistnie ustępują po rozprężeniu płuca drenem.",
      options: [
        "A. Uszkodzenie naczyń krążenia układowego pod wysokim ciśnieniem (tętnice międzyżebrowe lub tętnica piersiowa wewnętrzna), które nie ustaje samoistnie.",
        "B. Drobne powierzchowne otarcie opłucnej płucnej pod ciśnieniem 5 mmHg.",
        "C. Pęknięcie żyły pępkowej przetrwałej w więzadle obłym.",
        "D. Przerwanie przewodu piersiowego z wypływem chłonki.",
        "E. Krwawienie z naczyń włosowatych skóry wokół rany kłutej."
      ],
      correct: 0,
      correctIdx: 0,
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Źródła anatomiczne krwotoku w klatce piersiowej:</strong> Krwawienia opłucnowe wymagające torakotomii pochodzą w przeważającej mierze z naczyń krążenia układowego (systemowego) pod wysokim ciśnieniem (ciśnienie tętnicze ~120 mmHg) – najczęściej z tętnicy międzyżebrowej (arteria intercostalis) lub tętnicy piersiowej wewnętrznej (arteria thoracica interna). Krwawienia z miąższu płucnego pochodzą z krążenia płucnego niskociśnieniowego (~20-25 mmHg) i niemal zawsze samoistnie ustępują po rozprężeniu płuca drenem.",
        "❌ BŁĄD! Drobne krwawienia z miąższu płucnego samoistnie ustępują pod wpływem tamponady rozprężonego płuca w opłucnej.",
        "❌ BŁĄD! Żyła pępkowa znajduje się w jamie brzusznej i nie ma związku z klatką piersiową.",
        "❌ BŁĄD! Uszkodzenie przewodu piersiowego powoduje chylothorax (chłonkotok), a nie ostry masywny wstrząs krwotoczny.",
        "❌ BŁĄD! Krwawienie ze skóry nie prowadzi do wytoczenia 1600 ml krwi z wnętrza opłucnej."
      ]
    },
    {
      step: 8,
      title: "Krok 8: Powikłania przetrwałego i niedostatecznie zdrenowanego krwiaka (Fibrothorax)",
      question: "Krok 8: Powikłania przetrwałego i niedostatecznie zdrenowanego krwiaka (Fibrothorax)",
      text: "Śródoperacyjnie zaklipsowano krwawiącą lewą tętnicę międzyżebrową V i ewakuowano skrzepy. Jakie odległe powikłania rozwijają się, jeśli zalegająca w opłucnej krew nie zostanie całkowicie usunięta?",
      explanation: "✅ PRAWIDŁOWO! <strong>Powikłania przetrwałego krwiaka opłucnej (Retained Hemothorax):</strong> Niezewakuowana krew ulega wtórnemu zakażeniu bakteryjnemu, prowadząc do ropniaka opłucnej (empyema pleurae) w 10–30% przypadków. Ponadto odkładająca się fibryna ulega organizacji i włóknieniu, tworząc grubą, sztywną pancerzową powłokę (fibrothorax), która więzi płuco ('trapped lung'), trwale upośledza wentylację i wymaga później rozległej operacji dekortykacji płuca.",
      options: [
        "A. Zakażenie krwiaka i ropniak opłucnej (empyema) oraz organizacja skrzepów z rozwojem włóknienia opłucnej (fibrothorax / trapped lung) wymagającego dekortykacji.",
        "B. Całkowite wchłonięcie krwi w ciągu 24 godzin bez jakichkolwiek następstw klinicznych.",
        "C. Przekształcenie krwiaka w złośliwego międzybłoniaka opłucnej.",
        "D. Rozwój pierwotnego nadciśnienia płucnego tętniczego.",
        "E. Samoistna przetoka oskrzelowo-przełykowa."
      ],
      correct: 0,
      correctIdx: 0,
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Powikłania przetrwałego krwiaka opłucnej (Retained Hemothorax):</strong> Niezewakuowana krew ulega wtórnemu zakażeniu bakteryjnemu, prowadząc do ropniaka opłucnej (empyema pleurae) w 10–30% przypadków. Ponadto odkładająca się fibryna ulega organizacji i włóknieniu, tworząc grubą, sztywną pancerzową powłokę (fibrothorax), która więzi płuco ('trapped lung'), trwale upośledza wentylację i wymaga później rozległej operacji dekortykacji płuca.",
        "❌ BŁĄD! Duże skrzepy w jamie opłucnej nie ulegają szybkiemu wchłonięciu, lecz organizują się we włóknik.",
        "❌ BŁĄD! Międzybłoniak opłucnej to nowotwór złośliwy wywoływany ekspozycją na azbest, a nie obecnością krwi pourazowej.",
        "❌ BŁĄD! Przetrwały krwiak powoduje restrykcję płucną, a nie izolowane pierwotne PAH tętnicze.",
        "❌ BŁĄD! Przetoka oskrzelowo-przełykowa jest powikłaniem urazów tępych tchawicy/przełyku lub nowotworów, a nie powikłaniem przetrwałej krwi w jamie opłucnej."
      ]
    }
  ],
  pathoNodes: [
    {
      badge: "Źródło krwotoku",
      title: "Przecięcie naczynia systemowego (Tętnica międzyżebrowa / Piersiowa wewnętrzna)",
      short: "Penetrujące ostrze noża przecina tętnicę krążenia systemowego, generując masywny krwotok pod ciśnieniem tętniczym.",
      detail: "W przeciwieństwie do miąższu płuca (niskie ciśnienie 15-20 mmHg), naczynia ściany klatki piersiowej pompują krew pod ciśnieniem systemowym, uniemożliwiając samoistną hemostazę i prowadząc do utraty >1500 ml krwi w kilkadziesiąt minut.",
      target: "Chirurgiczne zamknięcie uszkodzonego naczynia tętniczego",
      drugTarget: "<span class='dose-pill'>Pilna torakotomia przednio-boczna i podwiązanie naczynia szwem hemostatycznym 3-0 / klipsami naczyniowymi</span>"
    },
    {
      badge: "Zaburzenia mechaniczne i wentylacyjne",
      title: "Masywna kompresja płuca i ucisk łożyska żylnego",
      short: "Duża objętość krwi w jamie opłucnowej uciska miąższ płucny, wywołując całkowitą niedodmę i przesunięcie śródpiersia.",
      detail: "Zapadnięcie pęcherzyków płucnych generuje przeciek wewnątrzpłucny (shunt), a ucisk na żyłę główną i serce ogranicza powrót żylny, nasilając wstrząs hipowolemiczny o komponentę obturacyjną.",
      target: "Odbarczenie jamy opłucnej i reekspansja płuca",
      drugTarget: "<span class='dose-pill'>Drenaż klatki piersiowej drenem 28-32F z podciśnieniem -20 cmH2O</span>"
    },
    {
      badge: "Zaburzenia hemostazy",
      title: "Utrata wolemii, hipokalcemia i koagulopatia ze zużycia",
      short: "Utrata ponad 30% wolemii indukuje kwasicę mleczanową, hipotermię i wypłukanie czynników krzepnięcia.",
      detail: "Defibrynacja krwi w opłucnej oraz spadek poziomu fibrynogenu (<1.5 g/l) i zjonizowanego wapnia (<1.0 mmol/l) napędzają letalną triadę wstrząsu, prowadząc do uogólnionego krwawienia miąższowego.",
      target: "Resuscytacja hemostatyczna i antyfibrynoliza",
      drugTarget: "<span class='dose-pill'>Kwas traneksamowy (TXA) 1 g i.v. w 10 min, potem 1 g w 8 h</span> oraz <span class='dose-pill'>MTP 1:1:1 (KKCz : FFP : KKP) + Calcium chloratum 1 g i.v.</span>"
    },
    {
      badge: "Późne powikłanie tkankowe",
      title: "Organizacja skrzepu opłucnowego i włóknienie (Fibrothorax)",
      short: "Pozostawiona krew w jamie opłucnowej stymuluje migrację fibroblastów i tworzenie zbitych pasm włóknika.",
      detail: "Po 7-14 dniach powstaje gruba, nieelastyczna 'skorupa' (peel) pokrywająca opłucną trzewną, uniemożliwiająca rozprężenie płuca (uwięzione płuco) i tworząca pożywkę dla ropniaka opłucnej (empyema).",
      target: "Profilaktyka zakażeń i wczesna dekortykacja",
      drugTarget: "<span class='dose-pill'>Cefazolina 2 g i.v. profilaktycznie</span> oraz <span class='dose-pill'>Wczesna wideotorakoskopia (VATS) w 3-5 dobie w razie zalegania skrzepów</span>"
    }
  ],
  diffTable: {
    title: "⚔️ Tabela Różnicowa: Ostre stany po urazie penetrującym klatki piersiowej",
    headers: [
      "Cecha kliniczna",
      "Masywny krwiak opłucnej (Haemothorax)",
      "Odma prężna (Tension pneumothorax)",
      "Tamponada osierdzia",
      "Pęknięcie przepony z przemieszczeniem",
      "Odma opłucnowa prosta",
      "Wstrząs neurogenny"
    ],
    rows: [
      [
        "Główny patomechanizm",
        "Masywny krwotok tętniczy (>1500 ml) do jamy opłucnej, wstrząs hipowolemiczny",
        "Mechanizm zastawkowy, wzrost ciśnienia w opłucnej, wstrząs obturacyjny",
        "Krew w worku osierdziowym uciskająca komory, wstrząs kardiogenny/obturacyjny",
        "Przedarcie przepony i wniknięcie trzewi brzusznych do klatki piersiowej",
        "Powietrze w jamie opłucnej bez wzrostu ciśnienia i bez ucisku śródpiersia",
        "Utrata napięcia współczulnego po uszkodzeniu rdzenia kręgowego powyżej Th6"
      ],
      [
        "Wypuk nad uszkodzoną stroną",
        "Wybitnie stłumiony (odpowiada płynowi/krwi w jamie opłucnej)",
        "Wybitnie bębenkowy (nadmiernie jawny w całej połowie klatki)",
        "Prawidłowy (jawny) symetrycznie nad oboma płucami",
        "Bębenkowy (żołądek/jelita) lub stłumiony (wątroba/śledziona)",
        "Bębenkowy w polach szczytowych",
        "Prawidłowy, symetryczny"
      ],
      [
        "Szmery oddechowe",
        "Całkowicie zniesione lub znacznie osłabione w polach dolnych",
        "Całkowicie zniesione po stronie odmy",
        "Zachowane, symetryczne nad oboma polami płucnymi",
        "Ściszone, obecność perystaltyki jelitowej w klatce piersiowej!",
        "Ściszone po stronie odmy",
        "Prawidłowe, symetryczne"
      ],
      [
        "Stan żył szyjnych",
        "Zapadnięte! (skrajna hipowolemia i utrata krwi krążącej)",
        "Silnie poszerzone i napięte (utrudniony powrót żylny do serca)",
        "Silnie poszerzone (triada Becka – utrudniony napływ do prawej komory)",
        "Zwykle prawidłowe lub nieznacznie poszerzone",
        "Prawidłowe (brak zaburzeń hemodynamicznych)",
        "Zapadnięte lub prawidłowe (rozszerzenie łożyska naczyniowego)"
      ],
      [
        "Parametry krążenia (HR / BP)",
        "Hipotensja (BP <90) + ciężka tachykardia (HR >120) – wstrząs krwotoczny",
        "Głęboka hipotensja + tachykardia + sinica – wstrząs obturacyjny",
        "Hipotensja + tachykardia + ciche tony serca + tętno paradoksalne",
        "Zmienne, możliwa duszność i tachykardia",
        "Prawidłowe ciśnienie tętnicze i prawidłowa akcja serca",
        "Hipotensja z paradoksalną BRADYKARDIĄ i ciepłą suchą skórą!"
      ],
      [
        "Pierwszorzutowe postępowanie ratunkowe",
        "Gruby dren 28-32F w V międzyżebrzu + MTP 1:1:1 + TXA + torakotomia przy >1500 ml",
        "Natychmiastowe odbarczenie igłowe (II lub V m-żebrze), następnie dren",
        "Pilna perikardiocenteza pod kontrolą USG lub okienko osierdziowe / sternotomia",
        "Dekompresja żołądka sondą NG, pilna laparotomia / torakotomia naprawcza",
        "Tlenoterapia bierna, drenaż cienkim drenem (16-24F) w razie duszności",
        "Ostrowska płynoterapia celowana, wazopresory (noradrenalina), unieruchomienie kręgosłupa"
      ]
    ]
  },
  dutySummary: {
    overview: "Masywny krwiak opłucnej (Massive Haemothorax) to stan bezpośredniego zagrożenia życia wywołany nagłą utratą >1500 ml krwi do jamy opłucnowej, najczęściej z przecięcia naczyń krążenia systemowego (tętnice międzyżebrowe, tętnica piersiowa wewnętrzna) w urazie drążącym klatki piersiowej. Prowadzi do wstrząsu krwotocznego połączonego z kompresyjną niedodmą płuca.",
    diagnostics: "1. Badanie fizykalne na Trauma Bay – stłumienie wypuku, brak szmeru pęcherzykowego i zapadnięte żyły szyjne różnicują krwiak z odmą prężną i tamponadą.<br>2. Przyłóżkowe USG e-FAST – natychmiastowa identyfikacja płynu (krwi) w jamie opłucnowej (objaw 'planktonu' lub bezechowej przestrzeni) i wykluczenie tamponady.<br>3. Monitorowanie objętości drenażu – pomiar natychmiastowej utraty krwi oraz tempa drenażu co godzinę.<br>4. Pilne badania laboratoryjne: Grupa krwi, próba krzyżowa, morfologia (Hb, Hct, PLT), gazometria (mleczany, deficyt zasad), koagulologia (INR, APTT, fibrynogen).",
    drugsAndDoses: "1. Kwas traneksamowy: <span class='dose-pill'>TXA 1 g i.v. we wlewie w 10 min</span> (w oknie <3 h od urazu), następnie <span class='dose-pill'>1 g i.v. we wlewie ciągłym przez 8 h</span>.<br>2. Protokół Masywnej Transfuzji (MTP 1:1:1): Natychmiastowe przetaczanie <span class='dose-pill'>KKCz : FFP : KKP w proporcji 1:1:1</span> ogrzewaczem przepływowym pod ciśnieniem.<br>3. Koncentrat fibrynogenu: <span class='dose-pill'>Fibrynogen 2-4 g i.v.</span> przy stężeniu <1.5-2.0 g/l w koagulogramie lub w badaniu ROTEM.<br>4. Uzupełnianie wapnia zjonizowanego: <span class='dose-pill'>Calcium chloratum 1 g (10 ml 10%) i.v. powoli</span> na każde 4 jednostki przetoczonych preparatów krwi (zapobieganie toksyczności cytrynianu).<br>5. Profilaktyka antybiotykowa: <span class='dose-pill'>Cefazolina 2 g i.v.</span> jednorazowo przy zakładaniu drenu w urazie kłutym.",
    procedures: "1. Gruby drenaż jamy opłucnowej: Wprowadzenie drenu <span class='dose-pill'>28-32F (lub 36F) w V przestrzeni międzyżebrowej</span> w linii pachowej przedniej/środkowej, po górnym brzegu dolnego żebra.<br>2. Autotransfuzja krwi (Cell Saver): Zbieranie krwi z drenu do jałowego układu retransfuzyjnego z filtrem mikroagregatowym i natychmiastowe przetoczenie choremu.<br>3. Pilna torakotomia ratunkowa: Wskazana przy drenażu >1500 ml krwi na wstępie LUB >200-250 ml/h przez 2-4 kolejne godziny LUB niestabilności hemodynamicznej mimo transfuzji.<br>4. Zaopatrzenie hemostatyczne: Identyfikacja i podwiązanie tętnicy międzyżebrowej lub piersiowej wewnętrznej szwem ósemkowym lub klipsami naczyniowymi.",
    monitoring: "1. Ciągły pomiar inwazyjnego ciśnienia tętniczego (linia tętnicza).<br>2. Godzinowy pomiar objętości i charakteru drenażu opłucnowego na dedykowanej skali butli drenażowej.<br>3. Seryjna kontrola gazometrii tętniczej (stężenie mleczanów, BE, hematokryt, Ca2+ zjonizowany).<br>4. Pomiar temperatury głębokiej ciała (utrzymanie normotermii >36.0°C za pomocą mat grzewczych i podgrzewaczy płynów)."
  },
  lekQuestions: [
    {
      question: "Zgodnie z wytycznymi ATLS (Advanced Trauma Life Support), masywny krwiak opłucnej (massive hemothorax) definiuje się jako nagłe nagromadzenie w jamie opłucnowej co najmniej:",
      options: [
        "A. 1500 ml krwi (lub >1/3 objętości krwi krążącej pacjenta).",
        "B. 500 ml krwi.",
        "C. 300 ml krwi.",
        "D. 100 ml krwi z obecnością skrzepów.",
        "E. 2500 ml krwi."
      ],
      correct: 0,
      correctIdx: 0,
      expl: "Prawidłowa odpowiedź to A. Masywny krwiak opłucnej definiuje się jako obecność co najmniej 1500 ml krwi (lub ponad 1/3 wolemii pacjenta, a u dzieci >20 ml/kg) w jamie opłucnowej, co manifestuje się jednoczesnym wstrząsem hipowolemicznym oraz objawami ucisku płuca i śródpiersia."
    },
    {
      question: "Który z poniższych objawów klinicznych pozwala najpewniej odróżnić masywny krwiak opłucnej od odmy prężnej (tension pneumothorax) w badaniu fizykalnym na sali reanimacyjnej?",
      options: [
        "A. Odgłos opukowy (stłumiony w krwiaku opłucnej vs bębenkowy w odmie prężnej) oraz wypełnienie żył szyjnych (zapadnięte w krwiaku vs silnie poszerzone w odmie).",
        "B. Wartość saturacji krwi tętniczej SpO2 (obniżona tylko w odmie).",
        "C. Obecność tachykardii powyżej 100/min (obecna tylko w krwiaku).",
        "D. Temperatura ciała mierzona w odbytnicy.",
        "E. Liczba płytek krwi w morfologii."
      ],
      correct: 0,
      correctIdx: 0,
      expl: "Prawidłowa odpowiedź to A. W masywnym krwiaku opłucnej obecność płynu powoduje wybitne stłumienie wypuku, a wstrząs hipowolemiczny skutkuje zapadnięciem żył szyjnych. W odmie prężnej wypuk jest bębenkowy (nadmiernie jawny), a zastój żylny na skutek ucisku śródpiersia prowadzi do silnego poszerzenia żył szyjnych."
    },
    {
      question: "Wskaż prawidłową lokalizację anatomiczną oraz zalecany rozmiar drenu opłucnowego stosowanego w leczeniu masywnego krwiaka opłucnej u osoby dorosłej:",
      options: [
        "A. Gruby dren o rozmiarze 28–32F (lub do 36F) wprowadzony w V przestrzeni międzyżebrowej, nieco do przodu od linii pachowej środkowej, po górnym brzegu dolnego żebra.",
        "B. Cienki cewnik Pigtail 8F wprowadzony w II przestrzeni międzyżebrowej w linii środkowo-obojczykowej.",
        "C. Igła 14G wprowadzona w VIII przestrzeni międzyżebrowej w linii łopatkowej.",
        "D. Kaniula 18G wprowadzona w dołku podsercowym.",
        "E. Dren 10F prowadzony bezpośrednio przez ranę kłutą klatki piersiowej."
      ],
      correct: 0,
      correctIdx: 0,
      expl: "Prawidłowa odpowiedź to A. W celu skutecznego odbarczenia krwiaka opłucnej i uniknięcia zatkania drenu przez skrzepy krwi stosuje się gruby dren (28–32F lub 36F) w V międzyżebrzu w tzw. trójkącie bezpieczeństwa (do przodu od linii pachowej środkowej). Wprowadza się go po górnym brzegu dolnego żebra, by uniknąć pęczka naczyniowo-nerwowego biegnącego pod dolnym brzegiem żebra."
    },
    {
      question: "Które z poniższych kryteriów drenażowych stanowi bezwzględne wskazanie do pilnej torakotomii ratunkowej u pacjenta z krwiakiem opłucnej po urazie klatki piersiowej?",
      options: [
        "A. Natychmiastowe utoczenie po założeniu drenu >1500 ml krwi LUB utrzymujące się krwawienie z drenu >200–250 ml/h przez kolejne 2–4 godziny.",
        "B. Drenaż 50 ml krwi w ciągu pierwszych 6 godzin.",
        "C. Utrzymujące się krwawienie o natężeniu 30 ml/h przez 12 godzin.",
        "D. Drenaż 500 ml krwi z całkowitą stabilizacją ciśnienia tętniczego.",
        "E. Obecność pojedynczego skrzepu w butli drenażowej."
      ],
      correct: 0,
      correctIdx: 0,
      expl: "Prawidłowa odpowiedź to A. Zgodnie z wytycznymi ATLS i towarzystw torakochirurgicznych, wskazaniem do torakotomii w krwiaku opłucnej jest natychmiastowe utoczenie >1500 ml krwi po drenażu lub utrzymujące się krwawienie >200-250 ml/h przez 2 do 4 kolejnych godzin, a także utrzymująca się niestabilność hemodynamiczna mimo resuscytacji krwią."
    },
    {
      question: "Które naczynia krwionośne najczęściej odpowiadają za masywne krwawienie do jamy opłucnej wymagające interwencji chirurgicznej (torakotomii)?",
      options: [
        "A. Naczynia krążenia układowego wysokociśnieniowego: tętnice międzyżebrowe oraz tętnica piersiowa wewnętrzna.",
        "B. Włośniczki miąższu płucnego krążenia małego.",
        "C. Żyła odpromieniowa.",
        "D. Drobne żyły powierzchowne skóry.",
        "E. Tętnica krezkowa dolna."
      ],
      correct: 0,
      correctIdx: 0,
      expl: "Prawidłowa odpowiedź to A. Krwawienia z miąższu płucnego (krążenie niskociśnieniowe 15-20 mmHg) zazwyczaj ustępują samoistnie po rozprężeniu płuca. Krwotoki masywne, nieustające i wymagające torakotomii, pochodzą z naczyń krążenia systemowego wysokociśnieniowego (~120 mmHg), głównie z tętnic międzyżebrowych (a. intercostalis) lub tętnicy piersiowej wewnętrznej (a. thoracica interna)."
    },
    {
      question: "Wskaż PRAWDZIWE stwierdzenie dotyczące autotransfuzji krwi utoczonej z jamy opłucnowej (np. za pomocą systemu Cell Saver) w urazach klatki piersiowej:",
      options: [
        "A. Krew opłucnowa w czystym urazie klatki ulega naturalnej defibrynacji przez ruchy serca i płuc, co ułatwia jej bezpieczną retransfuzję po przefiltrowaniu.",
        "B. Autotransfuzja jest bezwzględnie zakazana w medycynie ratunkowej ze względu na stuprocentowe ryzyko wstrząsu anafilaktycznego.",
        "C. Krew z opłucnej przed podaniem musi być napromieniona dawką 25 Gy.",
        "D. Współistniejące skażenie treścią żołądkową nie stanowi żadnego przeciwwskazania do bezpośredniej autotransfuzji.",
        "E. Krew autologiczna z drenażu opłucnej nie zawiera erytrocytów zdolnych do przenoszenia tlenu."
      ],
      correct: 0,
      correctIdx: 0,
      expl: "Prawidłowa odpowiedź to A. Krew w jamie opłucnowej jest poddawana ciągłemu mechanicznemu ruchowi (płuca, serce), co powoduje odkładanie się fibryny na opłucnej (defibrynację), dzięki czemu krew ta nie krzepnie w drenie. Jest natychmiast dostępna, ciepła i zgodna antygenowo, stanowiąc doskonały surowiec do autotransfuzji."
    },
    {
      question: "W resuscytacji hemostatycznej pacjenta z masywnym krwiakiem opłucnej i wstrząsem krwotocznym lekiem antyfibrynolitycznym o udowodnionym wpływie na redukcję śmiertelności (badanie CRASH-2) jest:",
      options: [
        "A. Kwas traneksamowy (TXA) podany w dawce 1 g i.v. w ciągu pierwszych 3 godzin od urazu.",
        "B. Heparyna niefrakcjonowana w bolusie 5000 j.m.",
        "C. Alteplaza (rtPA) we wlewie dożylnym.",
        "D. Kwas acetylosalicylowy w dawce 300 mg p.o.",
        "E. Klopidogrel w dawce nasycającej 600 mg."
      ],
      correct: 0,
      correctIdx: 0,
      expl: "Prawidłowa odpowiedź to A. Zgodnie z badaniem CRASH-2 i wytycznymi europejskimi ds. krwawień pourazowych, podanie kwasu traneksamowego (TXA) w dawce 1 g i.v. w ciągu pierwszych 3 godzin od urazu (a następnie wlewu 1 g w ciągu 8 godzin) istotnie zmniejsza śmiertelność z powodu wykrwawienia."
    },
    {
      question: "Jakie jest najczęstsze późne powikłanie niedostatecznie ewakuowanego lub przetrwałego krwiaka jamy opłucnej (retained hemothorax)?",
      options: [
        "A. Ropniak opłucnej (empyema pleurae) oraz zwłóknienie opłucnej (fibrothorax) z uwięzieniem płuca.",
        "B. Pęknięcie aorty wstępującej.",
        "C. Ostra białaczka limfoblastyczna.",
        "D. Odruchowy obrzęk Quinckego.",
        "E. Kamica pęcherzyka żółciowego."
      ],
      correct: 0,
      correctIdx: 0,
      expl: "Prawidłowa odpowiedź to A. Skrzepy i zalegająca krew w jamie opłucnowej stanowią doskonałą pożywkę bakteryjną, prowadząc do rozwoju ropniaka opłucnej (empyema). Ponadto organizacja włóknika tworzy sztywny pancerz opłucnowy (fibrothorax), który więzi płuco ('trapped lung') i uniemożliwia jego rozprężenie, wymagając dekortykacji."
    },
    {
      question: "Dlaczego podczas zakładania drenażu klatki piersiowej dren należy wprowadzać zawsze PO GÓRNYM BRZEGU żebra leżącego poniżej wybranej przestrzeni międzyżebrowej?",
      options: [
        "A. Ponieważ pęczek naczyniowo-nerwowy (żyła, tętnica i nerw międzyżebrowy) biegnie w bruździe przy dolnym brzegu żebra wyższego.",
        "B. Aby uniknąć przebicia przepony w każdym przypadku.",
        "C. Ponieważ chrząstka żebrowa znajduje się tylko na górnym brzegu.",
        "D. Ponieważ dolny brzeg żebra zawiera komórki macierzyste szpiku.",
        "E. Nie ma to znaczenia anatomicznego, nakłucie wykonuje się dowolnie."
      ],
      correct: 0,
      correctIdx: 0,
      expl: "Prawidłowa odpowiedź to A. W bruździe żebra (sulcus costae) biegnącej wzdłuż dolnego brzegu każdego żebra znajduje się pęczek naczyniowo-nerwowy (od góry: żyła, tętnica, nerw – akronim VAN). Prowadzenie trokaru lub narzędzia po górnym brzegu dolnego żebra chroni te naczynia przed jatrogennym uszkodzeniem i krwotokiem."
    },
    {
      question: "W protokole Masywnej Transfuzji (MTP) stosowanym we wstrząsie krwotocznym w przebiegu urazów penetrujących klatki piersiowej optymalny stosunek koncentratu krwinek czerwonych (KKCz), osocza świeżo mrożonego (FFP) oraz koncentratu krwinek płytkowych (KKP) wynosi:",
      options: [
        "A. 1 : 1 : 1 (zbalansowana hemostatyczna resuscytacja).",
        "B. 10 : 1 : 0.",
        "C. 4 : 0 : 0 (wyłącznie KKCz bez osocza).",
        "D. 1 : 4 : 8.",
        "E. 0 : 2 : 5."
      ],
      correct: 0,
      correctIdx: 0,
      expl: "Prawidłowa odpowiedź to A. Nowoczesna resuscytacja hemostatyczna (zgodnie z badaniem PROPPR i wytycznymi ATLS/TCCC) opiera się na strategii 1:1:1 (1 jednostka KKCz na 1 jednostkę FFP i 1 dawkę terapeutyczną KKP na 6 jednostek KKCz), co odtwarza pełną krew, zapobiega koagulopatii z rozcieńczenia i redukuje śmiertelność."
    },
    {
      question: "U chorego po ranie kłutej klatki piersiowej z masywnym krwiakiem opłucnej podczas masywnego przetaczania preparatów krwi (KKCz i FFP) występuje poszerzenie zespołu QRS, wydłużenie odstępu QT i spadek kurczliwości mięśnia sercowego. Zaburzenie to wynika najprawdopodobniej z:",
      options: [
        "A. Hipokalcemii wywołanej wiązaniem jonów wapnia przez cytrynian obecny jako antykoagulant w preparatach krwi.",
        "B. Hiperwitaminozy D.",
        "C. Nadmiaru sodu w roztworze krystaloidów.",
        "D. Toksyczności kwasu traneksamowego.",
        "E. Niedoboru żelaza."
      ],
      correct: 0,
      correctIdx: 0,
      expl: "Prawidłowa odpowiedź to A. Preparaty krwi konserwowane są cytrynianem sodu, który chelatuje wolny zjonizowany wapń (Ca2+). Przy szybkiej masywnej transfuzji dochodzi do ostrej hipokalcemii, która upośledza krzepnięcie, osłabia kurczliwość serca i wywołuje groźne arytmie; wymaga to dożylnej suplementacji soli wapnia (chlorek lub glukonian wapnia)."
    }
  ],
  flashcards: [
    {
      front: "Jak definiuje się masywny krwiak opłucnej (Massive Haemothorax) wg ATLS?",
      back: "Nagromadzenie w jamie opłucnowej ponad 1500 ml krwi (lub >1/3 objętości krwi krążącej pacjenta), powodujące jednoczesny wstrząs hipowolemiczny oraz ucisk miąższu płucnego i śródpiersia."
    },
    {
      front: "Jak odróżnić masywny krwiak opłucnej od odmy prężnej w badaniu fizykalnym?",
      back: "Wypuk: w krwiaku jest wybitnie stłumiony, a w odmie bębenkowy. Żyły szyjne: w krwiaku są zapadnięte (hipowolemia), a w odmie prężnej mocno poszerzone (zastój żylny)."
    },
    {
      front: "Jakie są drenażowe wskazania do pilnej torakotomii ratunkowej w krwiaku opłucnej?",
      back: "1. Natychmiastowe utoczenie z drenu >1500 ml krwi.<br>2. Utrzymujące się krwawienie >200-250 ml/h przez 2-4 kolejne godziny.<br>3. Utrzymująca się niestabilność hemodynamiczna mimo resuscytacji krwią."
    },
    {
      front: "Które naczynia krwionośne odpowiadają za krwawienie opłucnowe wymagające operacji?",
      back: "Naczynia krążenia układowego wysokociśnieniowego: tętnice międzyżebrowe (a. intercostalis) oraz tętnica piersiowa wewnętrzna (a. thoracica interna). Krwawienia z miąższu płucnego (niskociśnieniowe) zazwyczaj ustępują samoistnie."
    },
    {
      front: "Dlaczego krew z jamy opłucnej nadaje się do natychmiastowej autotransfuzji (Cell Saver)?",
      back: "Ruchy serca i płuc powodują jej naturalną defibrynację (nie krzepnie w drenie). Jest natychmiast dostępna, ma temperaturę 37°C, jest w 100% zgodna grupowo i nie niesie ryzyka zakażeń wirusowych."
    },
    {
      front: "Jakie są odległe powikłania niedostatecznie ewakuowanego krwiaka opłucnej (retained hemothorax)?",
      back: "1. Zakażenie krwiaka i ropniak opłucnej (empyema pleurae).<br>2. Organizacja skrzepu i zwłóknienie opłucnej (fibrothorax) tworzące tzw. uwięzione płuco (trapped lung), wymagające dekortykacji."
    }
  ]
};

// Mirroring fields for dual-layer compatibility
case150.steps.forEach(s => {
  s.question = s.title;
  s.explanation = s.feedback[s.correct];
});

case150.lekQuestions.forEach(q => {
  q.opts = q.options;
  q.correctIdx = q.correct;
  q.exp = q.expl;
});

async function main() {
  const targetPath = path.join(__dirname, '../cases/150_masywny_krwiak_oplucnej_haemothorax.json');
  console.log(`Writing and encrypting Case 150 to ${targetPath}...`);
  const encrypted = await encryptStringAes(JSON.stringify(case150, null, 2), MASTER_KEY);
  fs.writeFileSync(targetPath, JSON.stringify(encrypted, null, 2), 'utf-8');
  console.log(`[SAVED] Case #150: 150_masywny_krwiak_oplucnej_haemothorax.json (LEK Qs: ${case150.lekQuestions.length}, Steps: ${case150.steps.length}, Flashcards: ${case150.flashcards.length})`);
}

main().catch(err => {
  console.error("Error generating Case 150:", err);
  process.exit(1);
});

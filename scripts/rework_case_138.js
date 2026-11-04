const fs = require('fs');
const path = require('path');
const { encryptStringAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

const case138 = {
  id: 138,
  dept: "Chirurgia ogólna",
  title: "Niedrożność w przebiegu raka jelita grubego (Obstructing Colorectal Cancer)",
  shortTitle: "67-letni Waldemar – Zatrzymanie gazów i stolca od 4 dni, bolesne wzdęcie brzucha i wymioty (Niedrożność mechaniczna w raku okrężnicy)",
  diagnosisTitle: "Mechaniczna niedrożność jelita grubego w przebiegu obturacyjnego raka zstępnicy/zgięcia śledzionowego – zamknięta pętla, prawo Laplace'a, stentowanie SEMS vs operacja Hartmanna",
  vitals: [
    { name: "Częstość akcji serca", val: "104/min", status: "vital-warn" },
    { name: "Ciśnienie tętnicze", val: "110/70 mmHg", status: "vital-ok" },
    { name: "Temperatura ciała", val: "37.8 °C", status: "vital-warn" },
    { name: "Saturacja SpO2", val: "96%", status: "vital-ok" }
  ],
  vitalsObj: {
    hr: 104,
    bp: "110/70",
    spo2: 96,
    rr: 20,
    temp: 37.8,
    gcs: 15
  },
  story: "<p><strong>Pacjent:</strong> 67-letni mężczyzna został przywieziony przez rodzinę na SOR z powodu całkowitego zatrzymania oddawania gazów i stolca od 4 dni, narastającego, bolesnego wzdęcia brzucha oraz nudności i wymiotów treścią zastoinową i jelitową.</p><p><strong>Wywiad chorobowy:</strong> W wywiadzie od ok. 5 miesięcy zmiana rytmu wypróżnień (naprzemienne zaparcia i biegunki), pasmowata domieszka ciemnej krwi w kale oraz niezamierzony ubytek masy ciała o 9 kg. Pacjent nie zgłaszał się do lekarza, nigdy nie miał wykonywanej kolonoskopii. Leczony przewlekle na nadciśnienie tętnicze. Nikotynizm 35 paczkolat.</p><p><strong>Badanie przedmiotowe na SOR:</strong> Pacjent podsypiający, w stanie średnio-ciężkim, z cechami odwodnienia (suche śluzówki, podkrążone oczy, spadek turgoru skóry). Brzuch potężnie, bębenkowo wzdęty, bolesny w całości, jednak z wyraźnym punktem maksymalnej bolesności i napięcia w prawym dole biodrowym (w rzucie rozdętej kątnicy). Obrona mięśniowa nieznaczna, objaw Blumberga ujemny. Osłuchowo perystaltyka o charakterze metalicznym, z okresami ciszy. W badaniu per rectum (DRE): pusta, szeroka bańka odbytnicy, na rękawiczce śluz i ciemna krew, nie wyczuwa się oporu w zasięgu palca.</p>",
  labs: [
    {
      name: "Morfologia krwi i parametry zapalne",
      items: [
        { name: "Hemoglobina (Hb)", val: "9.8 g/dl", norm: "13.5 - 17.5 g/dl", flag: "LOW" },
        { name: "Hematokryt (Hct)", val: "30.4 %", norm: "40.0 - 52.0 %", flag: "LOW" },
        { name: "MCV", val: "74 fl", norm: "80 - 100 fl", flag: "LOW" },
        { name: "MCH", val: "24 pg", norm: "27 - 34 pg", flag: "LOW" },
        { name: "Leukocyty (WBC)", val: "13.8 G/l", norm: "4.0 - 10.0 G/l", flag: "HIGH" },
        { name: "Płytki krwi (PLT)", val: "480 G/l", norm: "150 - 400 G/l", flag: "HIGH" },
        { name: "CRP", val: "88 mg/l", norm: "< 5.0 mg/l", flag: "HIGH" }
      ]
    },
    {
      name: "Biochemia i elektrolity",
      items: [
        { name: "Sód (Na+)", val: "133 mmol/l", norm: "135 - 145 mmol/l", flag: "LOW" },
        { name: "Potas (K+)", val: "3.2 mmol/l", norm: "3.5 - 5.0 mmol/l", flag: "LOW" },
        { name: "Chlorki (Cl-)", val: "94 mmol/l", norm: "98 - 106 mmol/l", flag: "LOW" },
        { name: "Mocznik", val: "68 mg/dl", norm: "15 - 45 mg/dl", flag: "HIGH" },
        { name: "Kreatynina", val: "1.45 mg/dl", norm: "0.7 - 1.2 mg/dl", flag: "HIGH" },
        { name: "CEA (antygen rakowo-płodowy)", val: "46.2 ng/ml", norm: "< 5.0 ng/ml", flag: "HIGH" }
      ]
    },
    {
      name: "Gazometria i krzepnięcie",
      items: [
        { name: "pH", val: "7.33", norm: "7.35 - 7.45", flag: "LOW" },
        { name: "HCO3-", val: "19.2 mmol/l", norm: "22.0 - 26.0 mmol/l", flag: "LOW" },
        { name: "Mleczany", val: "2.4 mmol/l", norm: "0.5 - 1.6 mmol/l", flag: "HIGH" },
        { name: "INR", val: "1.12", norm: "0.8 - 1.2", flag: "NORMAL" }
      ]
    }
  ],
  steps: [
    {
      title: "Krok 1: Wstępna ocena kliniczna i wywiad onkologiczny",
      text: "Lekarz analizuje obraz kliniczny: starszy mężczyzna z zatrzymaniem stolca, wymiotami i wzdęciem, u którego w wywiadzie występuje chudnięcie i niedokrwistość mikrocytarna. Czym różni się typowy obraz kliniczny raka prawej połowy okrężnicy od raka lewej połowy?",
      options: [
        "Rak lewej połowy okrężnicy rośnie okrężnie zwężająco, powodując objawy ostrej mechanicznej niedrożności jelit i zmianę rytmu wypróżnień (stolce ołówkowate, pasma krwi); rak prawej połowy rośnie egzofitycznie do szerokiego światła kątnicy i manifestuje się głównie utajonym krwawieniem, ciężką niedokrwistością mikrocytarną z niedoboru żelaza i osłabieniem",
        "Rak prawej połowy zawsze daje wczesną niedrożność ze względu na wąskie światło kątnicy",
        "Rak lewej połowy nigdy nie daje przerzutów do wątroby",
        "W raku lewej połowy okrężnicy stężenie CEA wynosi zawsze zero"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>To kardynalny podział kliniczny w gastroenterologii i chirurgii:</strong><br>- <strong>Rak lewej połowy (zstępnica, esica):</strong> światło jelita jest węższe, a stolec uformowany. Guz rośnie okrężnie naciekająco ('serwetkowy' / napkin-ring), co prowadzi do zwężenia światła, zmiany rytmu wypróżnień, stolców ołówkowatych i <strong>ostrej niedrożności mechanicznej</strong>.<br>- <strong>Rak prawej połowy (kątnica, wstępnica):</strong> światło jelita jest bardzo szerokie, a treść płynna. Guz rośnie jako kalafiorowaty, polipowaty twór (egzofitycznie), rzadko dając wczesną niedrożność. Objawia się przewlekłym mikroskopijnym krwawieniem prowadzącym do <strong>ciężkiej anemii mikrocytarnej z niedoboru żelaza</strong>, utraty masy ciała i wyczuwalnego oporu w prawym dole biodrowym.",
        "❌ BŁĄD! <strong>Kątnica ma najszersze światło w całym jelicie grubym (>6-8 cm), więc guz rzadko daje wczesną niedrożność.</strong>",
        "❌ BŁĄD! <strong>Okrężnica drenuje przez żyłę wrotną –</strong> zarówno prawa jak i lewa połowa daje przerzuty do wątroby.",
        "❌ BŁĄD! <strong>Stężenie CEA jest podwyższone w zaawansowanych rakach obu połów okrężnicy.</strong>"
      ]
    },
    {
      title: "Krok 2: Radiogram przeglądowy i fizyka pęknięcia kątnicy – Prawo Laplace'a",
      text: "W RTG przeglądowym jamy brzusznej na stojąco widoczne są szerokie poziomy płynów w okrężnicy, a kątnica ma średnicę aż 11 cm. Dlaczego w mechanicznej niedrożności lewej połowy okrężnicy to właśnie kątnica jest najbardziej narażona na niedokrwienie i pęknięcie (prawo Laplace'a)?",
      options: [
        "Zgodnie z prawem Laplace'a napięcie ściany cylindra (T) jest wprost proporcjonalne do ciśnienia wewnątrz jelita (P) i promienia jelita (r) [T = P × r]; ponieważ kątnica ma największy promień w całym przewodzie pokarmowym, panuje w niej najwyższe napięcie ściany, co przy średnicy >9-12 cm prowadzi do zawału ściany i perforacji",
        "Kątnica pęka, ponieważ nie posiada unaczynienia tętniczego",
        "Kątnica pęka z powodu braku komórek mięśniowych w jej ścianie",
        "Prawo Laplace'a dotyczy wyłącznie mechaniki przepływu krwi w aorcie piersiowej"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Prawo Laplace'a (Wall Tension = Pressure × Radius / Wall Thickness) wyjaśnia, dlaczego kątnica jest 'piętą achillesową' okrężnicy.</strong> Jeśli zastawka krętniczo-kątnicza (Bauhina) jest wydolna (kompetentna), tworzy się 'mechanizm zamkniętej pętli' (closed loop) między zastawką a dystalnym guzem esicy. Wzrost ciśnienia rozkłada się równomiernie, ale <strong>największe napięcie ściany występuje tam, gdzie promień r jest największy – czyli w kątnicy!</strong> Przekroczenie średnicy 9-10 cm stwarza krytyczne ryzyko niedokrwienia, a przy >12 cm ryzyko pęknięcia kątnicy z kałowym zapaleniem otrzewnej przekracza 50%!",
        "❌ BŁĄD! <strong>Kątnica jest unaczyniona przez tętnicę krętniczo-okrężniczą (gałąź SMA).</strong>",
        "❌ BŁĄD! <strong>Kątnica posiada prawidłowe warstwy mięśniowe (okrężną i podłużną w postaci taśm).</strong>",
        "❌ BŁĄD! <strong>Prawo Laplace'a opisuje napięcie ścian wszelkich sprężystych struktur cylindrycznych i kulistych, w tym jelit i pęcherzyków płucnych.</strong>"
      ]
    },
    {
      title: "Krok 3: Badanie obrazowe z wyboru – Tomografia komputerowa (TK)",
      text: "Lekarz zleca badanie obrazowe celem ustalenia dokładnego miejsca przeszkody i oceny zaawansowania onkologicznego. Jakie badanie jest złotym standardem i jaki objaw radiologiczny jest typowy dla zwężającego raka jelita grubego?",
      options: [
        "Tomografia komputerowa (TK) jamy brzusznej i miednicy z kontrastem dożylnym i ewentualnie doodbytniczym; typowy jest objaw 'ogryzka jabłka' (apple-core sign) wywołany okrężnym zwężeniem światła przez naciek nowotworowy",
        "Przeglądowe USG jamy brzusznej przez powłoki jako jedyne badanie definitywne",
        "Wlew doodbytniczy z gęstej zawiesiny siarczanu baru",
        "Pilna scyntygrafia przewodu pokarmowego z technetem"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Tomografia komputerowa jamy brzusznej i miednicy z dożylnym podaniem kontrastu jest badaniem z wyboru w ostrej niedrożności jelita grubego.</strong> Pozwala zlokalizować poziom przeszkody, ocenić stopień rozdęcia kątnicy, wykluczyć perforację (wolny gaz) oraz zawał jelita (brak wzmocnienia ściany). Obraz <strong>'ogryzka jabłka' (apple core sign)</strong> odzwierciedla krótki, asymetryczny, okrężny naciek ściany drążący do światła. <em>Uwaga:</em> Podawanie barytu doodbytniczo w ostrej niedrożności jest bezwzględnie zakazane ze względu na ryzyko zapalenia otrzewnej w razie perforacji!",
        "❌ BŁĄD! <strong>USG w potężnym wzdęciu gazowym ma bardzo ograniczoną wartość diagnostyczną.</strong>",
        "❌ BŁĄD! <strong>Baryt (siarczan baru) w ostrej niedrożności jest przeciwwskazany –</strong> wylanie barytu do otrzewnej powoduje śmiertelne chemiczne i zrostowe zapalenie otrzewnej.",
        "❌ BŁĄD! <strong>Scyntygrafia nie ma zastosowania w diagnostyce ostrej przeszkody mechanicznej.</strong>"
      ]
    },
    {
      title: "Krok 4: Wstępna resuscytacja i przygotowanie przedoperacyjne",
      text: "Przed jakąkolwiek ingerencją zabiegową pacjent wymaga pilnej stabilizacji metabolicznej. Jakie działania resuscytacyjne należy wdrożyć w pierwszej kolejności na SOR?",
      options: [
        "Założenie zgłębnika nosowo-żołądkowego z czynnym odbarczeniem treści zastoinowej, zbilansowana krystaloidoterapia i.v. pod kontrolą diurezy (cewnik Foleya), wyrównanie hipokaliemii i podanie antybiotyków o szerokim spektrum i.v.",
        "Podanie 4 tabletek bisakodylu i wlewki przeczyszczającej doodbytniczo",
        "Natychmiastowe doustne nawadnianie pacjenta 3 litrami płynu z elektrolitami",
        "Podanie dożylne neostygminy w celu przyspieszenia perystaltyki przeciwko przeszkodzie mechanicznej"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Resuscytacja w ostrej niedrożności opiera się na 4 filarach:</strong><br>1. <strong>Dekompresja żołądkowo-jelitowa:</strong> założenie sondy nosowo-żołądkowej zapobiega zachłyśnięciu cuchnącą treścią (zespół Mendelsona) i odbarcza przewód pokarmowy.<br>2. <strong>Intensywna płynoterapia:</strong> przetoczenie zbilansowanych krystaloidów (<span class='dose-pill'>Plasmalyte 2000-3000 ml/d i.v.</span>) w celu uzupełnienia strat do 'trzeciej przestrzeni'.<br>3. <strong>Wyrównanie elektrolitów:</strong> suplementacja potasu (<span class='dose-pill'>KCl 20-40 mmol/l wlewu</span>).<br>4. <strong>Antybiotykoterapia:</strong> osłona przed translokacją bakteryjną i bakteriemią (<span class='dose-pill'>Ceftriakson 2 g i.v.</span> + <span class='dose-pill'>Metronidazol 500 mg i.v.</span>).<br><em>Pamiętaj:</em> Leki przeczyszczające i prokinetyki są w niedrożności mechanicznej bezwzględnie zakazane!",
        "❌ BŁĄD! <strong>Leki przeczyszczające przy przeszkodzie mechanicznej doprowadzą do natychmiastowego pęknięcia jelita!</strong>",
        "❌ BŁĄD! <strong>Pojenie doustne pacjenta z niedrożnością wywoła wymioty i zachłyśnięcie.</strong>",
        "❌ BŁĄD! <strong>Neostygmina jest lekiem na rzekomą niedrożność (zespół Ogilviego); podana w przeszkodzie mechanicznej grozi pęknięciem kątnicy!</strong>"
      ]
    },
    {
      title: "Krok 5: Opcje terapeutyczne – Samorozprężalny stent metalowy (SEMS)",
      text: "U pacjenta nie stwierdza się cech zapalenia otrzewnej, perforacji ani zawału ściany jelita. Zespół omawia możliwość założenia samorozprężalnego stentu metalowego (SEMS – Self-Expanding Metal Stent) jako tzw. pomostu do operacji (bridge to surgery). Na czym polega ta metoda i jakie są jej zalety?",
      options: [
        "Wprowadzenie pod kontrolą endoskopowo-fluoroskopową metalowego stentu w miejsce zwężenia przez guz w celu natychmiastowego odbarczenia niedrożności; pozwala to uniknąć operacji w trybie ostrym, umożliwia wyrównanie stanu chorego, pełną ocenę onkologiczną i wykonanie planowej, jednoetapowej resekcji (często laparoskopowej) bez konieczności wyłaniania stomii",
        "Wprowadzenie stentu ma na celu całkowite zniszczenie komórek nowotworowych za pomocą promieniowania gamma",
        "Stentowanie zastępuje na stałe konieczność jakiegokolwiek leczenia operacyjnego u każdego chorego",
        "Stent zakłada się przez nacięcie powłok brzusznych w znieczuleniu miejscowym"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Stentowanie okrężnicy (SEMS) jako 'bridge to surgery' jest uznaną alternatywą dla pilnej operacji u stabilnych chorych z niedrożnością w lewej połowie okrężnicy bez cech zapalenia otrzewnej.</strong> Endoskopowo przez zwężenie wprowadza się prowadnik i rozpręża stent nitinolowy, który udrażnia przewód pokarmowy. Pozwala to na: ustąpienie wzdęcia, przygotowanie jelita, wykonanie pełnego stagingu onkologicznego i przeprowadzenie po 1-2 tygodniach <strong>planowej resekcji z pierwotnym zespoleniem (często laparoskopowo), redukując odsetek stomii z 70% do poniżej 20%!</strong>",
        "❌ BŁĄD! <strong>Standardowe stenty SEMS nie emitują promieniowania.</strong>",
        "❌ BŁĄD! <strong>U chorych z potencjalnie wyleczalnym rakiem stent jest jedynie pomostem do planowej radykalnej operacji resekcyjnej.</strong>",
        "❌ BŁĄD! <strong>SEMS wprowadza się drogą dolnej endoskopii (kolonoskopii) pod kontrolą rentgenowską (ramię C).</strong>"
      ]
    },
    {
      title: "Krok 6: Postępowanie operacyjne w trybie ostrym – Operacja Hartmanna",
      text: "Jeżeli stentowanie nie jest dostępne lub doszło do powikłań (lub kątnica jest zagrożona perforacją), konieczna jest pilna operacja. Jaki zabieg operacyjny jest klasycznym postępowaniem ratunkowym w niedrożności w przebiegu raka esicy/zstępnicy?",
      options: [
        "Operacja Hartmanna – onkologiczna resekcja odcinka jelita z guzem, wyłonienie bliższego końca w postaci pojedynczej kolostomii końcowej na lewym boku oraz ślepe zaszycie i pozostawienie w miednicy kikuta odbytnicy",
        "Wycięcie samego guza z pozostawieniem obu końców jelita luzem w jamie otrzewnej",
        "Proste nacięcie kątnicy bez wycinania guza",
        "Wykonanie zespolenia żołądkowo-esiczego bez usuwania przeszkody"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Operacja sposobem Hartmanna pozostaje klasycznym zabiegiem ratunkowym w pilnej chirurgii lewej połowy okrężnicy.</strong> Wykonuje się resekcję zmienionego nowotworowo odcinka wraz z regionalnymi węzłami chłonnymi, zamyka na głuche kikut dystalny (odbytnicę) i pozostawia w miednicy, a bliższy koniec wyprowadza jako końcową kolostomię (sztuczny odbyt) w lewym dole biodrowym. Pozwala to na uniknięcie pierwotnego zespolenia jelitowego w warunkach nieprzygotowanego, rozdętego i niedokrwionego jelita, co wiązałoby się ze skrajnym ryzykiem rozejścia zespolenia i posocznicy kałowej.",
        "❌ BŁĄD! <strong>Pozostawienie otwartych końców jelita w jamie otrzewnej spowodowałoby natychmiastowe kałowe zapalenie otrzewnej i zgon.</strong>",
        "❌ BŁĄD! <strong>Sama cekostomia bez usunięcia nowotworu jest postępowaniem przestarzałym i nieonkologicznym.</strong>",
        "❌ BŁĄD! <strong>Zespolenie żołądka z esicą to błąd anatomiczny.</strong>"
      ]
    },
    {
      title: "Krok 7: Zagrożenie perforacją z rozdęcia (diastatyczną)",
      text: "Śródoperacyjnie chirurg stwierdza, że kątnica ma średnicę 13 cm, a na jej przedniej ścianie widoczne są pęknięcia surowicówki i ogniska martwicy (perforatio diastatica imminens). Jakie postępowanie chirurgiczne jest wówczas bezwzględnie konieczne?",
      options: [
        "Wykonanie kolektomii subtotalnej (usunięcie całej okrężnicy od kątnicy do miejsca za guzem) z wytworzeniem zespolenia krętniczo-odbytniczego (lub ileostomii końcowej)",
        "Pozostawienie niedokrwionej kątnicy i założenie wyłącznie drenu gumowego do miednicy",
        "Zszycie pęknięć surowicówki kątnicy pojedynczym szwem jedwabnym i zamknięcie powłok",
        "Podanie leków obkurczających naczynia bezpośrednio do krezki jelita"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Jeśli w wyniku niedrożności doszło do diastatycznego uszkodzenia lub martwicy kątnicy (niedokrwienie z rozdęcia wg prawa Laplace'a), wykonanie samej resekcji lewostronnej jest kardynalnym błędem!</strong> Pozostawiona martwicza kątnica ulegnie perforacji w ciągu kilku godzin. W takiej sytuacji standardem jest wykonanie <strong>kolektomii subtotalnej (lub totalnej)</strong> – czyli usunięcie całej prawej okrężnicy, poprzecznicy i zstępnicy z guzem, z wykonaniem pierwotnego zespolenia końcowo-końcowego jelita krętego ze zdrowym kikutem odbytnicy (zespolenie krętniczo-odbytnicze) lub wyłonieniem ileostomii.",
        "❌ BŁĄD! <strong>Pozostawienie martwiczej ściany kątnicy prowadzi do 100% śmiertelności z powodu rozlanego zapalenia otrzewnej.</strong>",
        "❌ BŁĄD! <strong>Szycie niedokrwionej ściany pod napięciem nie zapobiega zgorzeli.</strong>",
        "❌ BŁĄD! <strong>Wazopresory nasilają martwicę jelita.</strong>"
      ]
    },
    {
      title: "Krok 8: Onkologiczne zasady resekcji raka jelita grubego (CME)",
      text: "Podczas operacji resekcyjnej raka okrężnicy chirurg musi przestrzegać zasad radykalności onkologicznej. Co oznacza koncepcja całkowitego wycięcia krezki okrężnicy (CME – Complete Mesocolic Excision) i jaka jest minimalna wymagana liczba zbadanych węzłów chłonnych do prawidłowego stagingu pN?",
      options: [
        "Preparowanie w nienaruszonej warstwie powięzi embrionalnej z usunięciem nienaruszonego pakietu krezki zawierającego naczynia i węzły, z wysokim podwiązaniem szypuły naczyniowej u ujścia; do wiarygodnego stagingu konieczne jest zbadanie minimum 12 regionalnych węzłów chłonnych",
        "Wycięcie wyłącznie samego guza z marginesem 1 mm bez usuwania tkanki tłuszczowej i węzłów",
        "Zbadanie minimum 2 węzłów chłonnych wystarcza do pełnej oceny stopnia zaawansowania",
        "Resekcja krezki okrężnicy wraz z wycięciem obu nerek i trzonu macicy"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Koncepcja CME (Complete Mesocolic Excision), analogiczna do TME w raku odbytnicy, opiera się na preparowaniu wzdłuż embrionalnych płaszczyzn powięziowych (powięź Toldta).</strong> Pozwala to na usunięcie guza wraz z kompletną, nienaruszoną krezką i całym spływem chłonnym. Podwiązanie pnia naczyniowego (Central Vascular Ligation - CVL) u jego odejścia od aorty/SMA gwarantuje usunięcie węzłów wierzchołkowych. Zgodnie z wytycznymi TNM i histopatologicznymi, <strong>minimalna liczba węzłów chłonnych niezbędna do wiarygodnego wykluczenia przerzutów (kategoria pN0) wynosi co najmniej 12!</strong>",
        "❌ BŁĄD! <strong>Wycięcie guza bez krezki i węzłów jest rażącym naruszeniem zasad onkologii.</strong>",
        "❌ BŁĄD! <strong>Badanie poniżej 12 węzłów stwarza ryzyko niedoszacowania stopnia zaawansowania (understaging).</strong>",
        "❌ BŁĄD! <strong>Standardowe CME nie wymaga resekcji nerek ani narządu rodnego, jeśli nie ma bezpośredniego nacieku.</strong>"
      ]
    }
  ],
  pathoNodes: [
    {
      badge: "Obturacja nowotworowa",
      title: "Okrężne zwężenie światła jelita grubego",
      short: "Naciek typu 'ogryzka jabłka' blokujący pasaż mas kałowych",
      detail: "Gruczolakorak lewej połowy okrężnicy rośnie okrężnie, zwężając sztywne światło jelita. Prowadzi to do całkowitej blokady mechanicznej dla uformowanego stolca i gazów.",
      target: "Światło i ściana esicy/zstępnicy",
      drugTarget: "<span class='dose-pill'>Stent SEMS</span> lub <span class='dose-pill'>operacja Hartmanna</span> odbarczenie przeszkody"
    },
    {
      badge: "Zamknięta pętla",
      title: "Wydolna zastawka Bauhina i uwięzienie gazu",
      short: "Brak możliwości dekompresji wstecznej do jelita cienkiego",
      detail: "Gdy zastawka Bauhina zapobiega cofaniu treści do jelita cienkiego, odcinek między zastawką a guzem staje się zamkniętą przestrzenią ciśnieniową. Dochodzi do potężnego rozdęcia kątnicy i wstępnicy.",
      target: "Zastawka krętniczo-kątnicza i okrężnica",
      drugTarget: "<span class='dose-pill'>Sonda nosowo-żołądkowa</span> odbarczenie zalegania żołądkowego"
    },
    {
      badge: "Prawo Laplace'a",
      title: "Krytyczne napięcie ściany i zawał kątnicy",
      short: "Napięcie T = P x r; zaciśnięcie mikronaczyń przy średnicy >10-12 cm",
      detail: "Największy promień kątnicy generuje najwyższe naprężenia mechaniczne w jej ścianie. Przekroczenie ciśnienia perfuzyjnego mikronaczyń prowadzi do martwicy diastatycznej i perforacji kałowej.",
      target: "Ściana kątnicy w prawym dole biodrowym",
      drugTarget: "<span class='dose-pill'>Kolektomia subtotalna</span> w razie martwicy kątnicy"
    },
    {
      badge: "Translokacja bakteryjna",
      title: "Nieszczelność bariery śluzówkowej i sepsa",
      short: "Przenikanie pałeczek jelitowych i beztlenowców do krwiobiegu",
      detail: "Niedokrwiona śluzówka jelita traci ciągłość, co umożliwia wnikanie E. coli, Klebsiella i Bacteroides fragilis do żyły wrotnej i krążenia ogólnego, prowadząc do uogólnionego SIRS.",
      target: "Bariera krew-światło jelita",
      drugTarget: "<span class='dose-pill'>Ceftriakson 2 g i.v.</span> + <span class='dose-pill'>Metronidazol 500 mg i.v.</span> osłona przeciwbakteryjna"
    }
  ],
  diffTable: {
    title: "⚔️ Tabela Różnicowa: Niedrożność w raku jelita grubego vs Inne przyczyny niedrożności okrężnicy",
    headers: ["Cecha kliniczna", "Rak lewej połowy okrężnicy", "Skręt esicy (Sigmoid volvulus)", "Zapalenie uchyłków esicy (zwężenie)", "Rzekoma niedrożność (Zespół Ogilviego)", "Zrostowa niedrożność jelita cienkiego (SBO)"],
    rows: [
      ["Początek i dynamika objawów", "Podostry, narastający od tygodni (zmiana rytmu stolca, anemia), nagła dekompensacja do niedrożności", "Nagły ból, potężne wzdęcie w ciągu 24-48 h u starszej osoby leżącej", "Nawracające epizody bólu w lewym dole biodrowym, gorączka, późne zbliznowacenie", "Bezbolesne lub skąpoobjawowe wzdęcie u chorego na OIT po operacjach/urazach", "Ostry początek: kolkowy ból w śródbrzuszu, wczesne obfite wymioty, szybkie odwodnienie"],
      ["Obraz w RTG / TK", "Objaw 'ogryzka jabłka' (apple core), asymetryczny naciek, poszerzenie prawej okrężnicy", "Objaw 'ziarna kawy' (coffee bean) / odwróconego U, brak haustracji", "Odcinkowe zgrubienie ściany esicy z uchyłkami i naciekiem tłuszczu okołojelitowego", "Masywne poszerzenie całej okrężnicy (kątnica >10-12 cm) bez przeszkody mechanicznej", "Liczne poziomy płynów w jelicie cienkim (obraz 'drabiny'), puste jelito grube"],
      ["Wymioty treścią jelitową", "Późne, poprzedzone kilkudniowym brakiem gazów i potężnym wzdęciem", "Rzadkie, występują późno przy niewydolnej zastawce Bauhina", "Rzadkie, chyba że współistnieje ropień drenujący do otrzewnej", "Rzadkie lub nieobecne, przeważa potężne wzdęcie powłok", "Bardzo wczesne, chlustające, z domieszką żółci, szybko jelitowe"],
      ["Badanie per rectum i krew w stolcu", "Pusta bańka; często krew utajona lub widoczna na rękawiczce", "Pusta, zapadnięta bańka odbytnicy; brak krwi w stolcu", "Bolesność w sklepieniu lewym; rzadko krew", "Pusta, wiotka bańka odbytnicy; brak krwi", "Pusta bańka odbytnicy; brak świeżej krwi"],
      ["Leczenie pierwszego rzutu", "Dekompresja SEMS ('bridge to surgery') lub operacja Hartmanna", "Endoskopowa derotacja (sigmoidoskopia) + rurka doodbytnicza", "Konserwatywne w ostrym stadium (antybiotyki); planowa resekcja zwężenia", "Leczenie zachowawcze (neostygmina i.v., dekompresja kolonoskopowa)", "Leczenie zachowawcze z testem Gastrografinem (70-80%) lub laparotomia"],
      ["Postępowanie onkologiczne", "Radykalna resekcja z mezokolonem (CME) i zbadaniem >=12 węzłów", "Choroba łagodna – brak wymogów onkologicznych", "Choroba łagodna – resekcja zwężonego odcinka bez limfadenektomii", "Choroba czynnościowa – brak podłoża nowotworowego", "Choroba nienowotworowa – uwolnienie zrostów (adhesiolysis)"]
    ]
  },
  dutySummary: {
    overview: "Rak jelita grubego jest najczęstszą przyczyną (ok. 60-70%) mechanicznej niedrożności jelita grubego u osób dorosłych. Najczęściej dotyczy guzów zlokalizowanych w lewej połowie okrężnicy (zstępnica, esica, zgięcie śledzionowe). Głównym zagrożeniem z tego mechanizmu zamkniętej pętli jest diastatyczne pęknięcie kątnicy (prawo Laplace'a), niosące śmiertelność przekraczającą 40%.",
    diagnostics: "1. Ocena kliniczna: potężne wzdęcie, bolesność palpacyjna w prawym dole biodrowym (zagrożenie kątnicy), pusta bańka odbytnicy w DRE.<br>2. Pilne RTG przeglądowe jamy brzusznej na stojąco: ocena poziomów płynów i średnicy kątnicy (krytyczna wartość >9-12 cm).<br>3. Tomografia komputerowa (TK) jamy brzusznej i miednicy z kontrastem i.v. – ocena objawu 'ogryzka jabłka', wykluczenie wolnego gazu podprzeponowego (perforacji) i ocena stagingu wątrobowego.<br>4. Badania laboratoryjne: morfologia krwi (niedokrwistość mikrocytarna), mocznik i kreatynina (przednerkowe uszkodzenie nerek), elektrolity (hipokaliemia), gazometria (mleczany, kwasica).",
    drugsAndDoses: "1. Intensywne nawadnianie krystaloidowe: <span class='dose-pill'>Plasmalyte / Ringer 2500-3000 ml/dobę i.v.</span> pod kontrolą bilansu płynów i diurezy godzinowej.<br>2. Wyrównanie niedoborów potasu: <span class='dose-pill'>KCl 20-40 mmol/l płynu infuzyjnego i.v.</span> (nie przekraczać 20 mmol/h wlewu obwodowego).<br>3. Antybiotykoterapia o szerokim spektrum (osłona przed translokacją i bakteriemią):<br>   - <span class='dose-pill'>Ceftriakson 2 g i.v. raz/dobę</span> + <span class='dose-pill'>Metronidazol 500 mg i.v. co 8 h</span> LUB<br>   - <span class='dose-pill'>Piperacylina z tazobaktamem 4,5 g i.v. co 8 h</span>.<br>4. <span class='dose-pill'>Bezwzględny zakaz stosowania leków przeczyszczających</span>, wlewów fosforanowych oraz neostygminy w przeszkodzie mechanicznej!",
    procedures: "1. Założenie zgłębnika nosowo-żołądkowego do czynnego odbarczenia treści żołądkowej (ochrona przed zachłyśnięciem).<br>2. Wprowadzenie cewnika Foleya do pęcherza moczowego celem monitorowania diurezy godzinowej (>0,5 ml/kg/h).<br>3. Endoskopowe założenie stentu metalowego (SEMS) jako 'bridge to surgery' u stabilnych chorych bez cech zapalenia otrzewnej.<br>4. Operacja Hartmanna w trybie pilnym w przypadku braku możliwości stentowania, niedokrwienia lub perforacji.<br>5. Kolektomia subtotalna w przypadku martwicy z rozdęcia kątnicy (diastatic perforation).",
    monitoring: "1. Seryjne badanie brzucha pod kątem narastania objawów otrzewnowych (Blumberg, obrona mięśniowa).<br>2. Kontrola parametrów nerkowych i elektrolitów co 12 godzin do czasu zabiegu.<br>3. Monitorowanie stężenia mleczanów we krwi tętniczej jako wskaźnika martwicy jelita.<br>4. Planowanie kompleksowego leczenia onkologicznego (staging TNM, konsylium onkologiczne po wypisie)."
  },
  lekQuestions: [
    {
      question: "W mechanicznej niedrożności lewej połowy okrężnicy z wydolną zastawką krętniczo-kątniczą narządem najbardziej podatnym na pęknięcie z rozdęcia jest kątnica. Zjawisko to wynika bezpośrednio z:",
      options: [
        "Prawa Laplace'a – naprężenie ściany jest wprost proporcjonalne do ciśnienia i promienia narządu, który w kątnicy jest największy",
        "Prawa Starlinga dotyczącego frakcji wyrzutowej lewej komory",
        "Prawa Ficka opisującego dyfuzję gazów przez pęcherzyki płucne",
        "Braku zaopatrzenia tętniczego ściany kątnicy przez krezkę",
        "Wrodzonego braku komórek zwojowych w kątnicy"
      ],
      correct: 0,
      expl: "Zgodnie z prawem Laplace'a napięcie ściany cylindra T = P × r (gdzie P to ciśnienie śródjelitowe, a r to promień). Kątnica jest najszerszym odcinkiem przewodu pokarmowego (największy promień r), dlatego przy wzroście ciśnienia w zamkniętej pętli panuje w niej największe napięcie ściany, co prowadzi do jej niedokrwienia i perforacji diastatycznej przy średnicy >9-12 cm."
    },
    {
      question: "Typowym objawem radiologicznym raka okrężnicy o wzroście zwężającym, widocznym w tomografii komputerowej z kontrastem, jest:",
      options: [
        "Objaw 'ogryzka jabłka' (apple core sign)",
        "Objaw 'kocich łbów' (cobblestoning)",
        "Objaw 'struny' Cantora",
        "Objaw 'tarczy strzeleckiej' w USG",
        "Objaw 'ziarna kawy'"
      ],
      correct: 0,
      expl: "Objaw 'ogryzka jabłka' (apple core sign) odpowiada krótkiemu, okrężnemu zwężeniu światła jelita grubego przez naciekający raka gruczołowy z podrytymi, nawisającymi brzegami zdrowej śluzówki powyżej i poniżej guza."
    },
    {
      question: "Wskaż cechę kliniczną charakterystyczną dla raka prawej połowy okrężnicy (kątnicy i wstępnicy) w porównaniu do raka lewej połowy:",
      options: [
        "Przewlekłe utajone krwawienie prowadzące do ciężkiej niedokrwistości mikrocytarnej z niedoboru żelaza",
        "Wczesne wystąpienie mechanicznej niedrożności jelit",
        "Stolce ołówkowate i częste parcie naglące",
        "Wyłącznie łagodny przebieg bez skłonności do przerzutów",
        "Brak konieczności leczenia operacyjnego"
      ],
      correct: 0,
      expl: "Rak prawej połowy okrężnicy rośnie egzofitycznie do szerokiego światła jelita, w którym treść jest płynna. Z tego powodu rzadko daje wczesną niedrożność, a manifestuje się przewlekłym mikroskopijnym krwawieniem, męczliwością, osłabieniem i głęboką anemią mikrocytarną (z niedoboru żelaza)."
    },
    {
      question: "Wprowadzenie samorozprężalnego stentu metalowego (SEMS) w niedrożności lewej połowy okrężnicy jako 'bridge to surgery' pozwala na:",
      options: [
        "Odbarczenie niedrożności, przygotowanie jelita i wykonanie planowej resekcji z zespoleniem, co znacząco zmniejsza odsetek wyłanianych stomii",
        "Całkowite wyleczenie raka bez konieczności resekcji chirurgicznej",
        "Natychmiastowe zniszczenie wszystkich przerzutów w wątrobie",
        "Zastąpienie radioterapii i chemioterapii adiuwantowej",
        "Trwałe zamknięcie ujścia wyrostka robaczkowego"
      ],
      correct: 0,
      expl: "SEMS jako 'pomost do operacji' (bridge to surgery) pozwala na dekompresję jelita w trybie ostrym, ustabilizowanie stanu pacjenta, wyrównanie zaburzeń metabolicznych oraz przeprowadzenie planowej operacji onkologicznej w warunkach przygotowanego jelita, co drastycznie redukuje konieczność wyłaniania stomii (operacji Hartmanna)."
    },
    {
      question: "Operacja sposobem Hartmanna polega na:",
      options: [
        "Resekcji odcinka jelita z guzem, ślepym zaszyciu kikuta odbytnicy i wyłonieniu bliższego końca w postaci kolostomii końcowej",
        "Resekcji guza z natychmiastowym zespoleniem i wycięciem żołądka",
        "Wycięciu całej wątroby i śledziony bez usuwania guza pierwotnego",
        "Założeniu opaski uciskowej na aortę brzuszną",
        "Zespoleniu omijającym omijającym kątnicę z pęcherzem moczowym"
      ],
      correct: 0,
      expl: "Klasyczna operacja Hartmanna polega na wycięciu zmienionego chorobowo odcinka esicy/odbytnicy, ślepym zamknięciu kikuta dystalnego pozostawionego w miednicy mniejszej oraz wyprowadzeniu bliższego końca jelita jako jednolufowej końcowej kolostomii w lewym dole biodrowym."
    },
    {
      question: "Zgodnie z międzynarodowymi standardami histopatologicznymi, minimalna liczba regionalnych węzłów chłonnych, jaka musi zostać zbadana w preparacie po resekcji raka okrężnicy dla wiarygodnego określenia cechy pN0, wynosi:",
      options: [
        "12",
        "1",
        "3",
        "5",
        "50"
      ],
      correct: 0,
      expl: "Zgodnie z wytycznymi UICC/AJCC oraz polskich i europejskich towarzystw onkologicznych, do wiarygodnego wykluczenia przerzutów w węzłach chłonnych (kategoria pN0) konieczne jest zbadanie w preparacie operacyjnym co najmniej 12 regionalnych węzłów chłonnych."
    },
    {
      question: "Który lek jest bezwzględnie PRZECIWWSKAZANY u pacjenta z ostrą mechaniczną niedrożnością jelita grubego spowodowaną guzem?",
      options: [
        "Bisakodyl i leki osmotycznie przeczyszczające",
        "Krystaloidy zbilansowane (np. Plasmalyte)",
        "Ceftriakson w dawce 2 g dożylnie",
        "Metronidazol w dawce 500 mg dożylnie",
        "Chlorek potasu we wlewie dożylnym"
      ],
      correct: 0,
      expl: "Stosowanie leków przeczyszczających (bisakodyl, sennozydy, laktuloza, makrogole) lub prokinetycznych w mechanicznej niedrożności jelit jest bezwzględnie przeciwwskazane, gdyż stymulacja perystaltyki przeciwko nieprzekraczalnej przeszkodzie gwałtownie podnosi ciśnienie i prowadzi do pęknięcia jelita."
    },
    {
      question: "Jeśli w trakcie laparotomii z powodu obturacyjnego raka esicy stwierdza się pęknięcie diastatyczne zgorzelinowej kątnicy, operacją z wyboru jest:",
      options: [
        "Kolektomia subtotalna z usunięciem okrężnicy od kątnicy do guza i zespoleniem krętniczo-odbytniczym lub ileostomią",
        "Wyłącznie resekcja esicy z pozostawieniem pękniętej kątnicy",
        "Zaszycie pęknięcia kątnicy pojedynczym szwem wchłanialnym bez resekcji",
        "Wprowadzenie rurki Sengstakena-Blakemore'a do kątnicy",
        "Założenie stentu metalowego do kątnicy przez powłoki brzuszne"
      ],
      correct: 0,
      expl: "W przypadku martwicy lub perforacji diastatycznej kątnicy jedynym bezpiecznym postępowaniem jest resekcja całej zmienionej niedokrwiennie okrężnicy wraz z guzem (kolektomia subtotalna). Pozostawienie martwiczej kątnicy wiąże się ze 100% śmiertelnością z powodu sepsy kałowej."
    },
    {
      question: "Koncepcja CME (Complete Mesocolic Excision) w chirurgii raka okrężnicy zakłada:",
      options: [
        "Preparowanie w nienaruszonej embrionalnej warstwie powięziowej z centralnym podwiązaniem naczyń krezkowych u ich odejścia",
        "Częściowe usunięcie krezki bez naruszania węzłów chłonnych",
        "Usunięcie guza bez marginesu jelitowego",
        "Planowe wycięcie śledziony i lewego nadnercza przy każdym raku jelita",
        "Stosowanie wyłącznie elektrokoagulacji bez użycia noża chirurgicznego"
      ],
      correct: 0,
      expl: "CME (całkowite wycięcie krezki okrężnicy) polega na precyzyjnym preparowaniu wzdłuż embrionalnych płaszczyzn powięziowych z zachowaniem nienaruszonej torebki mezokolonu oraz centralnym podwiązaniu naczyń (CVL) u ich odejścia od aorty i SMA/IMA, co maksymalizuje liczbę usuniętych węzłów chłonnych i poprawia przeżycie."
    },
    {
      question: "Podwyższone stężenie antygenu rakowo-płodowego (CEA) w surowicy u chorego z rakiem jelita grubego służy przede wszystkim do:",
      options: [
        "Monitorowania skuteczności leczenia i wczesnego wykrywania wznowy lub przerzutów po operacji",
        "Pierwotnego przesiewowego rozpoznawania raka u osób bezobjawowych",
        "Różnicowania między wrzodem żołądka a wrzodem dwunastnicy",
        "Oceny stopnia wydolności nerek przed podaniem kontrastu",
        "Określenia wrażliwości bakterii jelitowych na antybiotyki"
      ],
      correct: 0,
      expl: "Antygen rakowo-płodowy (CEA) nie nadaje się do badań przesiewowych (zbyt niska swoistość i czułość we wczesnych stadiach). Jego głównym zastosowaniem jest ocena rokowania, wyznaczenie wartości wyjściowej oraz seryjne monitorowanie po leczeniu operacyjnym w celu wczesnego wykrycia nawrotu choroby nowotworowej."
    },
    {
      question: "Który z poniższych czynników stanowi bezwzględne przeciwwskazanie do próby założenia stentu metalowego (SEMS) w niedrożności okrężnicy?",
      options: [
        "Obecność klinicznych i radiologicznych cech perforacji jelita lub zapalenia otrzewnej",
        "Lokalizacja guza w zstępnicy",
        "Wiek chorego powyżej 65 lat",
        "Stężenie hemoglobiny 10 g/dl",
        "Współistnienie nadciśnienia tętniczego"
      ],
      feedback: "",
      correct: 0,
      expl: "Kliniczne lub radiologiczne objawy perforacji przewodu pokarmowego (wolny gaz pod przeponą, objawy rozlanego zapalenia otrzewnej, wstrząs septyczny) stanowią bezwzględne przeciwwskazanie do procedur endoskopowych (w tym stentu SEMS) i wymagają natychmiastowej laparotomii ratunkowej."
    }
  ],
  flashcards: [
    {
      front: "Dlaczego w niedrożności lewej połowy okrężnicy kątnica pęka najszybciej (prawo Laplace'a)?",
      back: "Zgodnie z prawem Laplace'a napięcie ściany T = P × r. Kątnica ma największy promień (r), dlatego przy wzroście ciśnienia w zamkniętej pętli panuje w niej największe napięcie ściany, co przy średnicy >9-12 cm prowadzi do niedokrwienia i perforacji."
    },
    {
      front: "Czym różni się klinika raka prawej połowy okrężnicy od lewej?",
      back: "Prawa połowa: szerokie światło, płynny stolec -> przewlekłe krwawienie, anemia mikrocytarna z niedoboru żelaza, chudnięcie.\nLewa połowa: wąskie światło, uformowany stolec -> objawy zwężenia, zmiana rytmu stolca, stolce ołówkowate, ostra mechaniczna niedrożność."
    },
    {
      front: "Co to jest 'apple core sign' (objaw ogryzka jabłka) w TK?",
      back: "Krótkie, asymetryczne, okrężne zwężenie światła okrężnicy przez naciekający guz nowotworowy z nawisającymi brzegami zdrowej śluzówki powyżej i poniżej przeszkody."
    },
    {
      front: "Na czym polega zastosowanie stentu SEMS jako 'bridge to surgery'?",
      back: "Endoskopowe rozprężenie stentu metalowego udrażniające jelito w ostrym stadium; pozwala na uniknięcie pilnej operacji i wyłonienia stomii oraz umożliwia planową resekcję po 1-2 tyg."
    },
    {
      front: "Na czym polega operacja Hartmanna?",
      back: "Resekcja zmienionego odcinka jelita z guzem, ślepe zaszycie kikuta odbytnicy w miednicy mniejszej oraz wyłonienie pojedynczej końcowej kolostomii na lewym boku."
    },
    {
      front: "Ile węzłów chłonnych należy zbadać w preparacie po resekcji raka okrężnicy?",
      back: "Minimum 12 regionalnych węzłów chłonnych, co jest warunkiem koniecznym do wiarygodnego ustalenia cechy pN0."
    }
  ]
};

async function run() {
  console.log("Generating Case 138: Niedrożność w raku jelita grubego...");
  
  // Mirroring
  case138.steps.forEach(s => {
    s.question = s.title;
    s.explanation = s.feedback ? s.feedback[0] : "";
  });
  
  case138.lekQuestions.forEach(q => {
    q.opts = q.options;
    q.correctIdx = q.correct;
    q.exp = q.expl;
  });
  
  const enc = await encryptStringAes(JSON.stringify(case138, null, 2), MASTER_KEY);
  fs.writeFileSync(path.join('cases', '138_niedroznosc_rak_jelita_grubego.json'), JSON.stringify(enc, null, 2), 'utf8');
  console.log("[SAVED] Case #138: 138_niedroznosc_rak_jelita_grubego.json (LEK Qs: " + case138.lekQuestions.length + ", Steps: " + case138.steps.length + ", Flashcards: " + case138.flashcards.length + ")");
}

run();

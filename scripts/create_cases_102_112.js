const fs = require('fs');

const cases102_112 = [
  // 102: ABMK
  {
    id: 102,
    filename: "102_abmk_niemowle.json",
    dept: "Pediatria",
    shortTitle: "3-miesięczne niemowlę – Krew i śluz w stolcu, kolki oraz wyprysk atopowy (Alergia na białka mleka krowiego / ABMK)",
    diagnosisTitle: "Alergia na białka mleka krowiego (ABMK / CMPA) – postać żołądkowo-jelitowa (alergiczne zapalenie prostnicy i okrężnicy)",
    vitals: [
      { label: "HR", val: "134/min", sub: "Prawidłowe dla niemowlęcia", status: "ok" },
      { label: "BP", val: "82/48 mmHg", sub: "Prawidłowe", status: "ok" },
      { label: "SpO2", val: "99%", sub: "Prawidłowa", status: "ok" },
      { label: "RR", val: "32/min", sub: "Prawidłowy", status: "ok" },
      { label: "Temp", val: "36.8°C", sub: "Prawidłowa", status: "ok" },
      { label: "Masa ciała", val: "5.8 kg (50. centyl)", sub: "Rozwój somatyczny zachowany", status: "ok" }
    ],
    vitalsObj: { hr: 134, bp: "82/48", spo2: 99, rr: 32, temp: 36.8, gcs: 15 },
    story: "Rodzice zgłaszają się na wizytę z 3-miesięcznym niemowlęciem karmionym mlekiem modyfikowanym standardowym. Od 3 tygodni w stolcach pojawiają się widoczne pasemka świeżej krwi i obfity śluz. Dziecko jest niespokojne podczas karmień, pręży się, ma nasilone kolki gazowe, a na policzkach i w zgięciach łokciowych widoczne są sączące zmiany o charakterze wyprysku atopowego. Stan ogólny dziecka jest dobry, przybiera na wadze prawidłowo.",
    labs: [
      ["Hemoglobina (Hb)", "10.8 g/dl", "norma: 10.0 - 13.0 g/dl (Prawidłowa fizjologiczna)"],
      ["Leukocyty (WBC)", "9.8 G/l", "norma: 6.0 - 14.0 G/l"],
      ["Eozynofile", "7.5%", "norma: 1.0 - 5.0% (Lekka eozynofilia obwodowa)"],
      ["Płytki krwi (PLT)", "380 G/l", "norma: 200 - 450 G/l (Wyklucza małopłytkowość)"],
      ["CRP", "<1.0 mg/l", "norma: <5.0 mg/l (Brak cech infekcji bakteryjnej)"],
      ["Kalprotektyna w kale", "180 µg/g", "norma: <50 µg/g (Umiarkowany stan zapalny śluzówki jelita)"],
      ["Posiew stolca", "Fizjologiczna flora jelitowa", "norma: ujemny w kierunku Salmonella/Shigella/Campylobacter"]
    ],
    steps: [
      {
        title: "Krok 1: Wstępna ocena obecności krwi w stolcu niemowlęcia",
        desc: "Świeża krew (hematochezia) i śluz w stolcu u dobrze rozwijającego się niemowlęcia bez gorączki najczęściej wskazują na alergiczne zapalenie prostnicy i okrężnicy wywołane białkami pokarmowymi (FPIAP - food protein-induced allergic proctocolitis). Jakie jest Twoje natychmiastowe postępowanie diagnostyczne?",
        scenario: "Świeża krew (hematochezia) i śluz w stolcu u dobrze rozwijającego się niemowlęcia bez gorączki najczęściej wskazują na alergiczne zapalenie prostnicy i okrężnicy wywołane białkami pokarmowymi (FPIAP - food protein-induced allergic proctocolitis). Jakie jest Twoje natychmiastowe postępowanie diagnostyczne?",
        options: [
          {
            text: "Wykluczenie przyczyn infekcyjnych (posiew kału) i chirurgicznych (szczelina odbytu, wgłobienie) oraz postawienie roboczego rozpoznania ABMK.",
            correct: true,
            feedback: "Znakomicie! Przed ustaleniem rozpoznania ABMK należy dokładnie obejrzeć odbyt w celu wykluczenia szczeliny odbytu oraz wykluczyć infekcje jelitowe."
          },
          {
            text: "Natychmiastowe skierowanie dziecka na pilną rektosigmoidoskopię z biopsją w znieczuleniu.",
            correct: false,
            feedback: "Błąd. U stabilnego niemowlęcia z podejrzeniem FPIAP endoskopia jest przeciwwskazana i niepotrzebna; diagnostyka opiera się na próbie eliminacji i prowokacji."
          },
          {
            text: "Zlecenie testów skórnych punktowych (Prick-test) i sIgE w celu wykluczenia alergii.",
            correct: false,
            feedback: "FPIAP jest w większości postacią NIEZALEŻNĄ od IgE (nie-IgE-zależną), dlatego testy sIgE i punktowe skórne są ujemne u ponad 80% niemowląt!"
          },
          {
            text: "Zalecenie podawania naparu z rumianku i węgla aktywowanego.",
            correct: false,
            feedback: "Brak jakiejkolwiek skuteczności medycznej, ryzyko alergizacji i zaburzeń wchłaniania."
          }
        ]
      },
      {
        title: "Krok 2: Wdrożenie próby eliminacyjnej",
        desc: "Dziecko jest karmione mlekiem modyfikowanym standardowym. Jaki preparat mlekozastępczy jest preparatem I rzutu w leczeniu ABMK wg wytycznych ESPGHAN i Polskiego Towarzystwa Pediatrycznego?",
        scenario: "Dziecko jest karmione mlekiem modyfikowanym standardowym. Jaki preparat mlekozastępczy jest preparatem I rzutu w leczeniu ABMK wg wytycznych ESPGHAN i Polskiego Towarzystwa Pediatrycznego?",
        options: [
          {
            text: "Mieszanka o wysokim (znacznym) stopniu hydrolizy kazeiny lub białek serwatkowych (eHF – extensively hydrolysed formula) na okres 2–4 tygodni.",
            correct: true,
            feedback: "Dokładnie tak! Preparatem I wyboru u niemowląt z łagodną lub umiarkowaną ABMK karmionych sztucznie jest hydrolizat o wysokim stopniu hydrolizy (eHF), skuteczny u >90% dzieci."
          },
          {
            text: "Mleko hipoalergiczne typu HA (częściowy hydrolizat białka).",
            correct: false,
            feedback: "Błąd kardynalny! Mleka typu HA (częściowe hydrolizaty) służą wyłącznie do profilaktyki u dzieci zdrowych z grupy ryzyka, są bezwzględnie PRZECIWWSKAZANE w leczeniu stwierdzonej ABMK, gdyż zawierają duże fragmenty antygenowe wywołujące reakcję!"
          },
          {
            text: "Mleko kozie lub sojowe jako naturalny zamiennik mleka krowiego.",
            correct: false,
            feedback: "Błąd! Mleko kozie i owcze wykazuje ponad 90% reaktywności krzyżowej z mlekiem krowim. Mleko sojowe nie jest zalecane przed 6. miesiącem życia ze względu na fitoestrogeny i ryzyko krzyżowej alergizacji."
          },
          {
            text: "Mieszanka elementarna (aminokwasowa – AAF) jako lek I rzutu u każdego dziecka.",
            correct: false,
            feedback: "Mieszanki aminokwasowe (AAF) są preparatami II rzutu, zarezerwowanymi dla ciężkiej postaci (wstrząs anafilaktyczny, zespół FPIES z odwodnieniem, zahamowanie wzrostu) lub braku tolerancji eHF."
          }
        ]
      },
      {
        title: "Krok 3: Postępowanie w przypadku karmienia piersią",
        desc: "Matka pyta, co należałoby zrobić, gdyby dziecko było karmione wyłącznie piersią. Jaka jest prawidłowa strategia postępowania wg ESPGHAN?",
        scenario: "Matka pyta, co należałoby zrobić, gdyby dziecko było karmione wyłącznie piersią. Jaka jest prawidłowa strategia postępowania wg ESPGHAN?",
        options: [
          {
            text: "Kontynuacja karmienia piersią z bezwzględnym wyeliminowaniem z diety matki mleka krowiego i jego przetworów oraz suplementacją wapnia (1000 mg/d) i witaminy D3 u matki.",
            correct: true,
            feedback: "Znakomicie! Zawsze dążymy do utrzymania karmienia piersią. Matka stosuje dietę bezmleczną przez 2–4 tygodnie, pamiętając o suplementacji wapnia."
          },
          {
            text: "Natychmiastowe odstawienie dziecka od piersi i przejście na mieszankę modyfikowaną.",
            correct: false,
            feedback: "Błąd! Karmienie naturalne jest optymalnym sposobem żywienia i nie należy go przerywać; wystarczy dieta eliminacyjna u matki."
          },
          {
            text: "Zalecenie podawania matce leków przeciwhistaminowych bez modyfikacji diety.",
            correct: false,
            feedback: "Leki przeciwhistaminowe nie zapobiegają przenikaniu białek mleka krowiego do pokarmu matki."
          },
          {
            text: "Pasteryzacja odciąganego pokarmu kobiecego przed każdym karmieniem.",
            correct: false,
            feedback: "Brak jakiegokolwiek uzasadnienia klinicznego."
          }
        ]
      },
      {
        title: "Krok 4: Czas oczekiwania na ustąpienie objawów",
        desc: "Po jakim czasie od włączenia mieszanki eHF u niemowlęcia powinno nastąpić ustąpienie krwawienia ze stolca i złagodzenie objawów brzuszkowych?",
        scenario: "Po jakim czasie od włączenia mieszanki eHF u niemowlęcia powinno nastąpić ustąpienie krwawienia ze stolca i złagodzenie objawów brzuszkowych?",
        options: [
          {
            text: "Ustąpienie świeżej krwi ze stolca następuje zwykle w ciągu 48–72 godzin, a całkowita normalizacja stolców i wyciszenie zapalenia jelita w ciągu 2–4 tygodni.",
            correct: true,
            feedback: "Prawidłowo! Widoczne krwawienie ustępuje szybko (do 3 dni), natomiast pełna regeneracja śluzówki i ustąpienie zmian skórnych wymaga do 4 tygodni."
          },
          {
            text: "Krew powinna ustąpić w ciągu 1 godziny po pierwszym podaniu butelki.",
            correct: false,
            feedback: "Nierealne fizjologicznie – treść jelitowa i śluzówka potrzebują minimum kilkudziesięciu godzin na ewakuację antygenu."
          },
          {
            text: "Objawy ustępują dopiero po ukończeniu 3. roku życia.",
            correct: false,
            feedback: "Błędne założenie. Poprawa po eliminacji antygenu jest szybka."
          },
          {
            text: "Krew w stolcu ulega nasileniu przez pierwsze 2 tygodnie w wyniku zjawiska lizy.",
            correct: false,
            feedback: "Brak takiego zjawiska; nasilenie krwawienia wymagałoby weryfikacji rozpoznania."
          }
        ]
      },
      {
        title: "Krok 5: Złoty standard potwierdzenia rozpoznania – próba prowokacji",
        desc: "Po 4 tygodniach stosowania eHF krew i śluz całkowicie zniknęły, a dziecko jest spokojne. Co stanowi 'złoty standard' ostatecznego potwierdzenia ABMK wg EBM?",
        scenario: "Po 4 tygodniach stosowania eHF krew i śluz całkowicie zniknęły, a dziecko jest spokojne. Co stanowi 'złoty standard' ostatecznego potwierdzenia ABMK wg EBM?",
        options: [
          {
            text: "Próba ponownego wprowadzenia białka mleka krowiego (doustna próba prowokacji) – nawrót objawów potwierdza rozpoznanie, a ich brak wyklucza ABMK.",
            correct: true,
            feedback: "Wybitnie! Złotym standardem w diagnostyce nie-IgE-zależnej ABMK jest ustąpienie objawów w próbie eliminacji oraz ich nawrót po ponownej prowokacji pokarmowej białkiem mleka krowiego."
          },
          {
            text: "Wykonanie tomografii komputerowej jamy brzusznej.",
            correct: false,
            feedback: "Badanie całkowicie nieprzydatne w diagnostyce alergii pokarmowej."
          },
          {
            text: "Oznaczenie przeciwciał przeciwjądrowych ANA w mianie >1:160.",
            correct: false,
            feedback: "ANA nie ma związku z alergią na białka mleka krowiego."
          },
          {
            text: "Oznaczenie całkowitej immunoglobuliny E (IgE) w surowicy.",
            correct: false,
            feedback: "Całkowite IgE jest parametrem nieswoistym i w postaci nie-IgE-zależnej pozostaje w normie."
          }
        ]
      },
      {
        title: "Krok 6: Kiedy należy sięgnąć po mieszankę aminokwasową (AAF)?",
        desc: "U dziecka z podejrzeniem ABMK po 4 tygodniach stosowania eHF nadal utrzymują się smużki krwi w stolcu i spadek masy ciała. Jaki jest kolejny krok?",
        scenario: "U dziecka z podejrzeniem ABMK po 4 tygodniach stosowania eHF nadal utrzymują się smużki krwi w stolcu i spadek masy ciała. Jaki jest kolejny krok?",
        options: [
          {
            text: "Zamiana hydrolizatu znacznego stopnia (eHF) na mieszankę czystych syntetycznych aminokwasów (AAF – amino acid-based formula).",
            correct: true,
            feedback: "Doskonale! Około 5-10% niemowląt z cięższą postacią ABMK nie toleruje nawet drobnych peptydów w eHF i wymaga mieszanki aminokwasowej (AAF), która jest całkowicie nieimmunogenna."
          },
          {
            text: "Włączenie doustnego metronidazolu na 6 miesięcy.",
            correct: false,
            feedback: "Brak wskazań do przewlekłej antybiotykoterapii."
          },
          {
            text: "Powrót do standardowego mleka krowiego modyfikowanego.",
            correct: false,
            feedback: "Pogorszy stan zapalny i nasili utratę krwi."
          },
          {
            text: "Wykonanie pilnej kolostomii odbarczającej.",
            correct: false,
            feedback: "Zabieg okaleczający, całkowicie bezzasadny."
          }
        ]
      },
      {
        title: "Krok 7: Naturalna historia choroby i nabywanie tolerancji",
        desc: "Rodzice martwią się, czy ich dziecko będzie musiało unikać nabiału przez całe dorosłe życie. Jakie rokowanie przedstawiasz w oparciu o statystyki kliniczne?",
        scenario: "Rodzice martwią się, czy ich dziecko będzie musiało unikać nabiału przez całe dorosłe życie. Jakie rokowanie przedstawiasz w oparciu o statystyki kliniczne?",
        options: [
          {
            text: "Rokowanie jest doskonałe: ok. 80–90% dzieci z nie-IgE zależną ABMK nabywa pełną tolerancję kliniczną na białka mleka krowiego do 1.–3. roku życia.",
            correct: true,
            feedback: "Bardzo pokrzepiająca i prawdziwa informacja! Alergia na białka mleka krowiego u niemowląt ma charakter przejściowy – większość dzieci 'wyrasta' z niej w ciągu pierwszych 2-3 lat życia."
          },
          {
            text: "ABMK jest chorobą nieuleczalną i trwa do końca życia u 100% chorych.",
            correct: false,
            feedback: "Mylisz ABMK z celiakią. W celiakii dieta trwa całe życie, w ABMK tolerancja powraca u większości dzieci."
          },
          {
            text: "Tolerancja pojawia się dopiero w okresie dojrzewania płciowego.",
            correct: false,
            feedback: "Większość dzieci toleruje mleko już w wieku przedszkolnym."
          },
          {
            text: "Nabycie tolerancji jest niemożliwe bez odczulania podjęzykowego.",
            correct: false,
            feedback: "Tolerancja w FPIAP pojawia się spontanicznie drogą naturalnego dojrzewania układu odpornościowego GALT."
          }
        ]
      },
      {
        title: "Krok 8: Podsumowanie dyżurowe i plan ponownej oceny",
        desc: "Kończysz konsultację. Jaki jest plan monitorowania i kiedy planujesz pierwszą próbę prowokacji mlekiem po okresie eliminacji?",
        scenario: "Kończysz konsultację. Jaki jest plan monitorowania i kiedy planujesz pierwszą próbę prowokacji mlekiem po okresie eliminacji?",
        options: [
          {
            text: "Stosowanie eHF przez co najmniej 6 miesięcy lub do ukończenia 9.–12. miesiąca życia, po czym wykonanie kontrolowanej próby prowokacji w celu oceny nabycia tolerancji.",
            correct: true,
            feedback: "Wybitnie! Standardem jest utrzymanie diety eliminacyjnej przez 6 miesięcy (lub do 9-12 m.ż.), a następnie ponowna próba prowokacji pod nadzorem lekarskim (np. drabina mleczna - milk ladder)."
          },
          {
            text: "Wykonywanie próby prowokacji co 2 dni w domu rodziców.",
            correct: false,
            feedback: "Zbyt częsta prowokacja nie pozwala na wygojenie jelita."
          },
          {
            text: "Przejście od razu na mleko krowie niepasteryzowane ze wsi.",
            correct: false,
            feedback: "Niepasteryzowane mleko stwarza dodatkowe ryzyko zakażeń odzwierzęcych (listerioza, campylobacter)."
          },
          {
            text: "Podawanie probiotyków wieloszczepowych w megadawkach bez diety.",
            correct: false,
            feedback: "Probiotyki mogą stanowić terapię uzupełniającą, ale nie zastępują eliminacji antygenu."
          }
        ]
      }
    ],
    pathoNodes: [
      {
        badge: "Reakcja immunologiczna",
        title: "Alergiczne zapalenie prostnicy i okrężnicy (FPIAP)",
        short: "Reakcja nie-IgE-zależna z udziałem limfocytów T i naciekiem eozynofilowym w błonie śluzowej jelita grubego.",
        detail: "Główne alergeny mleka krowiego to kazeina (frakcje alfa-s1, alfa-s2, beta, kappa) oraz białka serwatkowe (beta-laktoglobulina, alfa-laktoalbumina). W postaci jelitowej (FPIAP) patomechanizm opiera się na reakcji komórkowej (nie-IgE-zależnej). Antygeny mleka wywołują aktywację limfocytów T w kępkach Peyera, uwalnianie cytokin prozapalnych (IL-4, IL-5, TNF) oraz rekrutację eozynofilów do błony śluzowej prostnicy i esicy, co prowadzi do mikronadżerek i krwawienia.",
        target: "Frakcje białek mleka krowiego (kazeina i beta-laktoglobulina) i naciek eozynofilowy",
        desc: "Brak przeciwciał IgE – reakcja komórkowa z eozynofilią tkankową dystalnego odcinka jelita grubego."
      },
      {
        badge: "Niedojrzałość bariery",
        title: "Niedojrzałość bariery jelitowej niemowlęcia",
        short: "Wysoka przepuszczalność ścisłych złączy (tight junctions) w pierwszych miesiącach życia ułatwia przenikanie nienaruszonych białek.",
        detail: "U noworodków i wczesnych niemowląt bariera jelitowa wykazuje fizjologiczną niedojrzałość: niższe wydzielanie kwasu solnego w żołądku, mniejsza aktywność pepsyny i proteaz trzustkowych oraz luźniejsze połączenia zamykające (zonula occludens). Pozwala to nienaruszonym cząsteczkom makroprotein na penetrację do tkanki limfatycznej GALT.",
        target: "Bariera jelitowa i złącza zamykające enterocytów",
        desc: "Zwiększona przepuszczalność błony śluzowej sprzyja prezentacji antygenu komórkom dendrytycznym."
      },
      {
        badge: "Nabywanie tolerancji",
        title: "Indukcja tolerancji immunologicznej przez limfocyty Treg",
        short: "Dojrzewanie układu GALT i namnażanie limfocytów regulatorowych Treg (FoxP3+) prowadzi do wygaszenia nadwrażliwości.",
        detail: "W miarę dojrzewania układu pokarmowego i kolonizacji przez prawidłowy mikrobiom jelitowy dochodzi do indukcji anergi klonalnej oraz namnażania antygenowo swoistych limfocytów regulatorowych Treg (CD4+CD25+FoxP3+), produkujących IL-10 i TGF-beta. Skutkuje to wygaszeniem reakcji zapalnej i uzyskaniem pełnej tolerancji doustnej u ponad 85% dzieci w wieku 12-36 miesięcy.",
        target: "Limfocyty regulatorowe Treg i produkcja IL-10 / TGF-beta",
        desc: "Dojrzewanie układu odpornościowego prowadzi do spontanicznego wyzdrowienia u większości dzieci."
      }
    ],
    dutySummary: {
      overview: "Alergia na białka mleka krowiego (ABMK) u niemowląt najczęściej przebiega pod postacią alergicznego zapalenia prostnicy i okrężnicy (FPIAP - nie-IgE-zależnego), objawiającego się krwią i śluzem w stolcu u dobrze rozwijającego się niemowlęcia, ustępującego po eliminacji białek mleka krowiego.",
      diagnostics: "1. Obraz kliniczny: smużki krwi w stolcu, śluz, kolki, bez gorączki i bez cech infekcji.<br>2. Oglądanie odbytu (wykluczenie szczeliny).<br>3. Brak rutynowej potrzeby badań IgE/testów skórnych w postaci FPIAP.<br>4. Rozpoznanie potwierdza: próba eliminacji (2–4 tyg.) + doustna próba prowokacji (złoty standard).",
      drugsAndDoses: "• Mieszanka o wysokim stopniu hydrolizy (eHF - Bebilon Pepti, Nutramigen LGG) jako I rzut u karmionych sztucznie.<br>• Przy braku poprawy po eHF: mieszanka aminokwasowa (AAF - Neocate LCP, Nutramigen Puramino).<br>• Karmienie piersią: eliminacja mleka i przetworów z diety matki + suplementacja u matki Ca 1000 mg/d i wit. D3.<br>• BEZWZGLĘDNY ZAKAZ mlek typu HA, sojowych (<6 m.ż.) i kozich/owczych.",
      procedures: "• Edukacja rodziców w zakresie prawidłowego przygotowywania mieszanki leczniczej.<br>• Monitorowanie przyrostów masy ciała na siatkach centylowych WHO.<br>• Kontrolowana próba prowokacji po 6 miesiącach diety eliminacyjnej.",
      monitoring: "• Ocena ustąpienia krwawienia po 72 godzinach.<br>• Ocena przyrostu masy ciała po 2 i 4 tygodniach.<br>• Próba prowokacji pokarmowej w 9.–12. miesiącu życia."
    },
    diffTable: {
      title: "Diagnostyka różnicowa krwi w stolcu u niemowlęcia",
      headers: ["Jednostka chorobowa", "Stan ogólny / Masa ciała", "Charakter krwawienia", "Dodatkowe objawy", "Postępowanie z wyboru"],
      rows: [
        [
          "ABMK (FPIAP - postać jelitowa)",
          "Dobry, prawidłowy przyrost mc.",
          "Pasemka/smużki świeżej krwi zmieszane ze śluzem",
          "Kolki, niepokój, często atopowe zapalenie skóry (AZS)",
          "Hydrolizat znacznego stopnia (eHF) lub dieta eliminacyjna matki"
        ],
        [
          "Szczelina odbytu (Fissura ani)",
          "Bardzo dobry",
          "Krople świeżej krwi na zewnątrz uformowanego stolca",
          "Ból przy defekacji, widoczne pęknięcie na godz. 6 lub 12",
          "Miejscowo maści natłuszczające, pielęgnacja, zmiękczanie stolca"
        ],
        [
          "Wgłobienie jelita (Intussusceptio)",
          "Ciężki / wstrząsowy",
          "Stolec o wyglądzie 'galaretki porzeczkowej' (późny objaw)",
          "Napadowy kolkowy ból z podkurczaniem nóżek, bladość, wymioty",
          "Pilne USG ('tarcza strzelnicza') + odwgłobienie pneumatyczne"
        ],
        [
          "Infekcyjne zapalenie jelit (Salmonella/Campylobacter)",
          "Umiarkowany / zły",
          "Krwisto-śluzowa obfita biegunka",
          "Gorączka, odwodnienie, wysokie CRP i leukocytoza",
          "Nawadnianie, posiew kału, antybiotykoterapia we wskazaniach"
        ]
      ]
    },
    lekQuestions: [
      {
        q: "Lekiem I rzutu w leczeniu żywieniowym stwierdzonej alergii na białka mleka krowiego o łagodnym lub umiarkowanym przebiegu u 2-miesięcznego niemowlęcia karmionego sztucznie jest:",
        opts: [
          "A) Mieszanka o wysokim stopniu hydrolizy kazeiny lub serwatki (eHF).",
          "B) Częściowy hydrolizat białka serwatkowego (mieszanka typu HA).",
          "C) Mleko sojowe wzbogacane w wapń i witaminy.",
          "D) Mleko kozie modyfikowane ze względu na mniejszą zawartość laktozy.",
          "E) Woda ryżowa z dodatkiem elektrolitów i glukozy."
        ],
        correctIdx: 0,
        exp: "Zgodnie z wytycznymi ESPGHAN i polskich ekspertów, u niemowląt karmionych sztucznie z łagodną do umiarkowanej postacią ABMK lekiem I rzutu jest mieszanka o wysokim (znacznym) stopniu hydrolizy białka (eHF). Mieszanki HA są zakazane w terapii (służą tylko do profilaktyki), a mleka sojowe i kozie nie są zalecane.",
        options: [
          "A) Mieszanka o wysokim stopniu hydrolizy kazeiny lub serwatki (eHF).",
          "B) Częściowy hydrolizat białka serwatkowego (mieszanka typu HA).",
          "C) Mleko sojowe wzbogacane w wapń i witaminy.",
          "D) Mleko kozie modyfikowane ze względu na mniejszą zawartość laktozy.",
          "E) Woda ryżowa z dodatkiem elektrolitów i glukozy."
        ],
        correct: 0,
        expl: "Zgodnie z wytycznymi ESPGHAN i polskich ekspertów, u niemowląt karmionych sztucznie z łagodną do umiarkowanej postacią ABMK lekiem I rzutu jest mieszanka o wysokim (znacznym) stopniu hydrolizy białka (eHF). Mieszanki HA są zakazane w terapii (służą tylko do profilaktyki), a mleka sojowe i kozie nie są zalecane."
      },
      {
        q: "W jakiej sytuacji klinicznej u niemowlęcia z alergią na białka mleka krowiego bezwzględnie zalecane jest zastosowanie mieszanki elementarnej opartej na wolnych aminokwasach (AAF) zamiast hydrolizatu eHF?",
        opts: [
          "A) Wystąpienie wstrząsu anafilaktycznego wywołanego mlekiem lub ciężkiego zespołu FPIES z hipotensją i zaburzeniami rozwoju.",
          "B) Wystąpienie pojedynczego epizodu ciemnozielonego stolca.",
          "C) U każdego niemowlęcia poniżej 6. miesiąca życia.",
          "D) Zawsze, gdy dziecko nie lubi gorzkiego smaku eHF.",
          "E) Przy współistnieniu ciemieniuchy na owłosionej skórze głowy."
        ],
        correctIdx: 0,
        exp: "Mieszanka aminokwasowa (AAF) jest wskazana jako preparat I rzutu w stanach zagrożenia życia (anafilaksja, ciężki FPIES z hipowolemią i kwasicą, enteropatia z ciężkim zahamowaniem wzrastania) lub gdy brak jest poprawy po 2-4 tygodniach stosowania mieszanki eHF.",
        options: [
          "A) Wystąpienie wstrząsu anafilaktycznego wywołanego mlekiem lub ciężkiego zespołu FPIES z hipotensją i zaburzeniami rozwoju.",
          "B) Wystąpienie pojedynczego epizodu ciemnozielonego stolca.",
          "C) U każdego niemowlęcia poniżej 6. miesiąca życia.",
          "D) Zawsze, gdy dziecko nie lubi gorzkiego smaku eHF.",
          "E) Przy współistnieniu ciemieniuchy na owłosionej skórze głowy."
        ],
        correct: 0,
        expl: "Mieszanka aminokwasowa (AAF) jest wskazana jako preparat I rzutu w stanach zagrożenia życia (anafilaksja, ciężki FPIES z hipowolemią i kwasicą, enteropatia z ciężkim zahamowaniem wzrastania) lub gdy brak jest poprawy po 2-4 tygodniach stosowania mieszanki eHF."
      }
    ],
    flashcards: [
      {
        cat: "Pediatria",
        q: "Jaka jest różnica w zastosowaniu mieszanek typu eHF i HA?",
        a: "eHF (hydrolizat znacznego stopnia) = LECZENIE stwierdzonej ABMK; HA (częściowy hydrolizat) = wyłącznie PROFILAKTYKA u dzieci zdrowych, ZAKAZANA w leczeniu!"
      },
      {
        cat: "Pediatria",
        q: "Dlaczego mleko kozie i owcze jest przeciwwskazane u dzieci z ABMK?",
        a: "Wykazuje >90% reakcji krzyżowej z białkami mleka krowiego i może wywołać ciężką reakcję alergiczną."
      },
      {
        cat: "Pediatria",
        q: "Co jest 'złotym standardem' rozpoznania nie-IgE-zależnej postaci ABMK (FPIAP)?",
        a: "Ustąpienie objawów po próbie eliminacji (2–4 tyg.) oraz ich ponowny nawrót w doustnej próbie prowokacji."
      },
      {
        cat: "Pediatria",
        q: "Kiedy u niemowlęcia z ABMK stosuje się mieszankę aminokwasową (AAF)?",
        a: "W anafilaksji, ciężkim FPIES z zaburzeniami wzrastania lub przy braku tolerancji/poprawy po eHF."
      },
      {
        cat: "Pediatria",
        q: "Jaki odsetek dzieci z ABMK nabywa tolerancję do 3. roku życia?",
        a: "Około 80–90% dzieci nabywa pełną tolerancję kliniczną (choroba w większości samoograniczająca się)."
      }
    ]
  }
];

// Read existing and push
const existingPath = 'scripts/data_cases_101_112.js';
let existing = require('./data_cases_101_112.js');
existing.push(cases102_112[0]);
fs.writeFileSync(existingPath, 'module.exports = ' + JSON.stringify(existing, null, 2) + ';', 'utf8');
console.log('Added case 102 to data_cases_101_112.js, total now:', existing.length);

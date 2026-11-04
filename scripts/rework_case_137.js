const fs = require('fs');
const path = require('path');
const { encryptStringAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

const case137 = {
  id: 137,
  dept: "Chirurgia ogólna",
  title: "Pęknięcie śledziony / Tępy uraz brzucha (Splenic Rupture)",
  shortTitle: "28-letni Tomasz – Tępy uraz lewego podżebrza po upadku z roweru, ból lewego barku (objaw Kehra) i hipotensja (Pęknięcie śledziony)",
  diagnosisTitle: "Pęknięcie śledziony stopnia III/IV wg AAST w przebiegu tępego urazu brzucha – krwawienie dootrzewnowe, wstrząs hipowolemiczny, protokół FAST, embolizacja SAE vs splenektomia, profilaktyka OPSI",
  vitals: [
    { name: "Częstość akcji serca", val: "118/min", status: "vital-warn" },
    { name: "Ciśnienie tętnicze", val: "90/60 mmHg", status: "vital-crit" },
    { name: "Temperatura ciała", val: "36.4 °C", status: "vital-ok" },
    { name: "Saturacja SpO2", val: "95%", status: "vital-ok" }
  ],
  vitalsObj: {
    hr: 118,
    bp: "90/60",
    spo2: 95,
    rr: 22,
    temp: 36.4,
    gcs: 14
  },
  story: "<p><strong>Pacjent:</strong> 28-letni mężczyzna, zapalony kolarz górski, został przywieziony przez zespół ratownictwa medycznego (ZRM) na SOR po upadku z roweru przy zjeździe ze stromej ścieżki i uderzeniu lewym bokiem tułowia o wystający pień drzewa i rączkę kierownicy ok. 90 minut temu.</p><p><strong>Wywiad chorobowy:</strong> Pacjent przytomny, logiczny, blady i zlewający się zimnym potem. Zgłasza ostry ból w lewym podżebrzu, który nasila się przy każdym głębszym wdechu i promieniuje do lewego barku (objaw Kehra). Odczuwa narastające osłabienie, pragnienie oraz mroczki przed oczami. Dotychczas zdrowy, nie przyjmuje żadnych leków, nie zgłasza alergii.</p><p><strong>Badanie przedmiotowe na SOR:</strong> Bladość powłok skórnych, chłodne dystalne części kończyn, nawrót kapilarny wydłużony do 3,5 sekundy. W rzucie IX-XI żebra lewego po stronie bocznej obecne bolesne otarcie naskórka i krwiak podskórny; wyczuwalne bolesne trzeszczenie żeber (złamanie żeber IX-X). Brzuch nieznacznie wzdęty, deska mięśniowa i bolesność palpacyjna wyraźnie zlokalizowana w lewym nadbrzuszu, dodatni objaw Blumberga. Odgłos opukowy stłumiony w lewym boku, nieprzemieszczający się przy ułożeniu pacjenta na prawym boku (objaw Ballance'a). Perystaltyka leniwa. HR 118/min, BP 90/60 mmHg, RR 22/min, SpO2 95% na powietrzu atmosferycznym.</p>",
  labs: [
    {
      name: "Morfologia krwi i hemostaza",
      items: [
        { name: "Hemoglobina (Hb)", val: "10.4 g/dl", norm: "13.5 - 17.5 g/dl", flag: "LOW" },
        { name: "Hematokryt (Hct)", val: "31.2 %", norm: "40.0 - 52.0 %", flag: "LOW" },
        { name: "Erytrocyty (RBC)", val: "3.4 T/l", norm: "4.3 - 5.9 T/l", flag: "LOW" },
        { name: "Leukocyty (WBC)", val: "14.2 G/l", norm: "4.0 - 10.0 G/l", flag: "HIGH" },
        { name: "Płytki krwi (PLT)", val: "175 G/l", norm: "150 - 400 G/l", flag: "NORMAL" },
        { name: "Fibrynogen", val: "1.9 g/l", norm: "2.0 - 4.0 g/l", flag: "LOW" },
        { name: "INR", val: "1.25", norm: "0.8 - 1.2", flag: "HIGH" }
      ]
    },
    {
      name: "Gazometria krwi tętniczej (ocena perfuzji)",
      items: [
        { name: "pH", val: "7.31", norm: "7.35 - 7.45", flag: "LOW" },
        { name: "pCO2", val: "33 mmHg", norm: "35 - 45 mmHg", flag: "LOW" },
        { name: "HCO3-", val: "17.4 mmol/l", norm: "22.0 - 26.0 mmol/l", flag: "LOW" },
        { name: "Base Excess (BE)", val: "-6.8 mmol/l", norm: "-2.5 - +2.5 mmol/l", flag: "LOW" },
        { name: "Mleczany (Lactate)", val: "3.8 mmol/l", norm: "0.5 - 1.6 mmol/l", flag: "HIGH" }
      ]
    },
    {
      name: "Biochemia i grupa krwi",
      items: [
        { name: "Kreatynina", val: "1.1 mg/dl", norm: "0.7 - 1.2 mg/dl", flag: "NORMAL" },
        { name: "Aminotransferaza asparaginianowa (AST)", val: "48 IU/l", norm: "< 35 IU/l", flag: "HIGH" },
        { name: "Aminotransferaza alaninowa (ALT)", val: "36 IU/l", norm: "< 45 IU/l", flag: "NORMAL" },
        { name: "Grupa krwi", val: "A RhD-ujemny (krew zamówiona na cito)", norm: "-", flag: "NORMAL" }
      ]
    }
  ],
  steps: [
    {
      title: "Krok 1: Wstępna ocena w protokole ATLS i objaw Kehra",
      text: "Lekarz trauma teamu ocenia pacjenta zgodnie z protokołem cABCDE. Pacjent zgłasza silny ból lewego barku przy braku jakichkolwiek urazów klatki piersiowej powyżej obojczyka. Czym jest objaw Kehra i jaki mechanizm odpowiada za jego wystąpienie?",
      options: [
        "Objaw Kehra to ból rzutowany do lewego barku wywołany podrażnieniem dolnej powierzchni lewej kopuły przepony przez wynaczynioną krew (unerwienie czuciowe przez nerw przeponowy C3-C5)",
        "Objaw Kehra to zwichnięcie stawu barkowo-obojczykowego w wyniku upadku z roweru",
        "Objaw Kehra to odruchowy skurcz mięśnia naramiennego wywołany niedotlenieniem serca",
        "Objaw Kehra to zapalenie ścięgna głowy długiej mięśnia dwugłowego ramienia"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Objaw Kehra (Kehr's sign) jest klasycznym objawem krwawienia dootrzewnowego z pękniętej śledziony.</strong> Krew gromadząca się w lewym podżebrzu podrażnia otrzewną pokrywającą dolną powierzchnię lewej kopuły przepony. Ponieważ przepona jest unerwiana czuciowo przez <strong>nerw przeponowy (segmenty rdzeniowe C3-C5)</strong>, dośrodkowe impulsy bólowe są interpretowane w ośrodkowym układzie nerwowym jako pochodzące z dermatomów C3-C5 zaopatrujących lewy bark i okolicę nadobojczykową.",
        "❌ BŁĄD! <strong>W badaniu przedmiotowym staw barkowy jest całkowicie niebolesny i ma pełny zakres ruchów biernych.</strong>",
        "❌ BŁĄD! <strong>Objaw Kehra wynika z podrażnienia przepony przez krew ze śledziony, a nie z niedokrwienia mięśnia sercowego.</strong>",
        "❌ BŁĄD! <strong>To nie jest lokalne uszkodzenie ścięgna mięśnia naramiennego/dwugłowego.</strong>"
      ]
    },
    {
      title: "Krok 2: Badanie ultrasonograficzne przyłóżkowe – Protokół FAST",
      text: "W sali reanimacyjnej natychmiast wykonuje się badanie E-FAST (Extended Focused Assessment with Sonography for Trauma). W których anatomicznych zachyłkach jamy otrzewnej poszukuje się płynu wolnego (krwi) w standardowym badaniu FAST?",
      options: [
        "W zachyłku wątrobowo-nerkowym (przestrzeń Morisona), śledzionowo-nerkowym (przestrzeń Kollera), zachyłku pęcherzowo-odbytniczym/Douglasa oraz w worku osierdziowym i jamach opłucnowych",
        "Wyłącznie w świetle żołądka i dwunastnicy",
        "W pęcherzyku żółciowym i drogach żółciowych zewnątrzorganowych",
        "Wewnątrz rdzenia kręgowego i kanale kręgowym odcinka lędźwiowego"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Badanie FAST (Focused Assessment with Sonography for Trauma) ocenia obecność wolnego płynu w 4 kluczowych oknach akustycznych:</strong><br>1. <strong>Przestrzeń Morisona (wątrobowo-nerkowa)</strong> – najbardziej zależne miejsce jamy brzusznej w pozycji leżącej na wznak, gdzie gromadzi się krew z większości narządów.<br>2. <strong>Przestrzeń Kollera (śledzionowo-nerkowa)</strong> – kluczowa w urazach śledziony.<br>3. <strong>Miednica mniejsza (zachyłek pęcherzowo-odbytniczy u mężczyzn / Douglasa u kobiet)</strong>.<br>4. <strong>Worek osierdziowy (okno podmostkowe)</strong> – wykluczenie tamponady serca.<br>Protokół <em>E-FAST</em> rozszerza badanie o przednie i boczne pola opłucnowe celem wykluczenia odmy i krwiaka opłucnej.",
        "❌ BŁĄD! <strong>FAST ocenia płyn wolny w jamie otrzewnej, a nie zawartość w świetle przewodu pokarmowego.</strong>",
        "❌ BŁĄD! <strong>Pęcherzyk żółciowy nie jest zachyłkiem detekcji krwiaka pourazowego.</strong>",
        "❌ BŁĄD! <strong>USG przezbrzuszne nie służy do oceny kanału kręgowego.</strong>"
      ]
    },
    {
      title: "Krok 3: Kwalifikacja diagnostyczna: Tomografia komputerowa (TK) vs Laparotomia",
      text: "USG FAST uwidoczniło obfity płyn w przestrzeni śledzionowo-nerkowej oraz w miednicy mniejszej. Po podaniu w bolusie 1000 ml zbilansowanego krystaloidu ciśnienie wzrosło do 105/70 mmHg, a HR zwolniło do 98/min (pacjent stabilny hemodynamicznie / responder). Jaka jest dalsza procedura diagnostyczna z wyboru?",
      options: [
        "Pilna wielofazowa tomografia komputerowa (TK) jamy brzusznej i miednicy z kontrastem dożylnym (faza tętnicza, wrotna i opóźniona)",
        "Natychmiastowe otwarcie brzucha (laparotomia) na korytarzu bez badań obrazowych",
        "Zlecenie scyntygrafii śledziony znakowanymi krwinkami i oczekiwanie na wynik do rana",
        "Przeglądowe zdjęcie RTG brzucha na leżąco i odesłanie chorego na oddział wewnętrzny"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Złotą zasadą traumatologii jest: pacjent STABILNY hemodynamicznie (lub który ustabilizował się po początkowej płynoterapii – responder) z podejrzeniem urazu narządów miąższowych kwalifikuje się do natychmiastowej tomografii komputerowej (TK) z kontrastem dożylnym.</strong> TK pozwala precyzyjnie ocenić stopień uszkodzenia śledziony wg AAST, objętość krwiaka oraz – co krytyczne – obecność aktywnego wynaczynienia kontrastu (tzw. 'contrast blush'), co decyduje o możliwości leczenia nieoperacyjnego (NOM) lub embolizacji angio (SAE). Laparotomia bez TK jest zarezerwowana dla chorych NIESTABILNYCH hemodynamicznie (non-responders).",
        "❌ BŁĄD! <strong>Pacjent ustabilizował się po płynach, więc pilna TK jest złotym standardem i chroni przed niepotrzebną splenektomią!</strong>",
        "❌ BŁĄD! <strong>Scyntygrafia nie ma żadnego zastosowania w ostrym urazie wielonarządowym.</strong>",
        "❌ BŁĄD! <strong>Zwykłe RTG nie uwidoczni miąższu śledziony ani wynaczynienia krwi.</strong>"
      ]
    },
    {
      title: "Krok 4: Klasyfikacja uszkodzeń śledziony według AAST",
      text: "TK ujawniło: pęknięcie torebki i miąższu śledziony o głębokości 4 cm obejmujące naczynia segmentowe, z krwiakiem podtorebkowym obejmującym 40% powierzchni, z obecnością małego ogniska aktywnego wynaczynienia kontrastu (contrast blush) w fazie tętniczej. Jaki to stopień uszkodzenia według skali AAST?",
      options: [
        "Stopień III / IV wg skali AAST (uszkodzenie naczyń segmentowych lub głębokie pęknięcie miąższu >3 cm z unaczynieniem)",
        "Stopień I (otarcia torebki <1 cm głębokości)",
        "Stopień V (całkowicie pofragmentowana, zmiażdżona śledziona z wyrwaniem szypuły naczyniowej)",
        "Stopień 0 (brak zmian pourazowych)"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Klasyfikacja AAST (American Association for the Surgery of Trauma) dla urazów śledziony:</strong><br>- <strong>Stopień I:</strong> krwiak podtorebkowy <10% powierzchni; pęknięcie miąższu <1 cm głębokości.<br>- <strong>Stopień II:</strong> krwiak podtorebkowy 10-50%; krwiak śródmiąższowy <5 cm; pęknięcie 1-3 cm bez uszkodzenia naczyń trabekularnych.<br>- <strong>Stopień III:</strong> krwiak podtorebkowy >50% lub pęknięty krwiak; krwiak śródmiąższowy >5 cm; pęknięcie >3 cm głębokości lub obejmujące naczynia trabekularne.<br>- <strong>Stopień IV:</strong> pęknięcie obejmujące naczynia segmentowe lub wnękowe prowadzące do odnaczynienia >25% śledziony.<br>- <strong>Stopień V:</strong> całkowite zmiażdżenie / rozfragmentowanie śledziony lub całkowite oderwanie szypuły naczyniowej śledziony.",
        "❌ BŁĄD! <strong>Stopień I to minimalne podbiegnięcie <1 cm.</strong>",
        "❌ BŁĄD! <strong>Stopień V to całkowite zmiażdżenie lub oderwanie szypuły naczyniowej ze zgonem z wykrwawienia w kilka minut.</strong>",
        "❌ BŁĄD! <strong>Uraz jest ewidentny i głęboki.</strong>"
      ]
    },
    {
      title: "Krok 5: Postępowanie zachowawcze (NOM) i rola embolizacji tętnicy śledzionowej (SAE)",
      text: "Pacjent pozostaje stabilny hemodynamicznie (BP 115/75 mmHg), ale w TK stwierdzono aktywny wyciek kontrastu (contrast blush). Jaka jest obecnie preferowana, małoinwazyjna strategia zachowania śledziony (NOM – Non-Operative Management)?",
      options: [
        "Pilna angiografia naczyniowa i przezcewnikowa embolizacja tętnicy śledzionowej (SAE – Splenic Artery Embolization) z następowym ścisłym monitorowaniem na OIT/chirurgii",
        "Natychmiastowe profilaktyczne wycięcie śledziony, lewej nerki i ogona trzustki",
        "Podanie leków fibrynolitycznych (alteplaza) w celu rozpuszczenia skrzepów w śledzionie",
        "Zastosowanie lewatywy z soli fizjologicznej i pionizacja pacjenta"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>U stabilnych hemodynamicznie pacjentów z urazem śledziony stopnia III-IV wg AAST i obecnością aktywnego wynaczynienia kontrastu (contrast blush) złotym standardem leczenia zachowawczego (NOM) jest przezcewnikowa embolizacja tętnicy śledzionowej (SAE).</strong> Zabieg wykonuje radiolog zabiegowy, zamykając sprężynkami wewnątrznaczyniowymi (coils) pień tętnicy śledzionowej (embolizacja proksymalna) lub selektywnie naczynie krwawiące (embolizacja dystalna). Zapewnia to hemostazę przy jednoczesnym zachowaniu żywotności i funkcji immunologicznej narządu dzięki unaczynieniu obocznemu (tętnice żołądkowe krótkie).",
        "❌ BŁĄD! <strong>Współczesna chirurgia dąży do zachowania narządu; usuwanie śledziony i sąsiednich narządów u stabilnego chorego to jatrogenna dewastacja.</strong>",
        "❌ BŁĄD! <strong>Fibrynoliza w aktywnym krwotoku spowodowałaby natychmiastowe wykrwawienie i zgon!</strong>",
        "❌ BŁĄD! <strong>Pionizacja i wlewki doodbytnicze są w urazie brzucha przeciwwskazane.</strong>"
      ]
    },
    {
      title: "Krok 6: Wskazania do ratunkowej splenektomii",
      text: "W jakiej sytuacji klinicznej próba leczenia zachowawczego (NOM / SAE) musi zostać natychmiast porzucona na rzecz pilnej laparotomii ratunkowej i splenektomii?",
      options: [
        "Utrzymująca się lub nawracająca niestabilność hemodynamiczna (hipotensja, kwasica, brak odpowiedzi na płynoterapię i krew) lub objawy rozlanego zapalenia otrzewnej",
        "Wzrost stężenia płytek krwi powyżej 200 G/l",
        "Zgłoszenie przez pacjenta nudności po wypiciu wody",
        "Obecność krwiaka podskórnego na lewym ramieniu"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Głównym i bezwzględnym wskazaniem do natychmiastowej laparotomii jest niestabilność hemodynamiczna niereagująca na resuscytację płynową (wstrząs krwotoczny stopnia III/IV) lub wystąpienie powikłań otrzewnowych (np. współistniejąca perforacja przewodu pokarmowego).</strong> Podczas operacji ratunkowej wykonuje się splenektomię (lub splenorafię / zaopatrzenie hemostatyczne przy mniejszych pęknięciach).",
        "❌ BŁĄD! <strong>Płytki krwi 200 G/l to wartość prawidłowa.</strong>",
        "❌ BŁĄD! <strong>Same nudności nie są wskazaniem do otwarcia jamy brzusznej.</strong>",
        "❌ BŁĄD! <strong>Krwiak ramienia nie ma związku z koniecznością operacji brzusznej.</strong>"
      ]
    },
    {
      title: "Krok 7: Piorunująca posocznica po usunięciu śledziony (OPSI)",
      text: "Dlaczego chirurdzy tak usilnie dążą do zachowania śledziony? Czym jest zespół OPSI (Overwhelming Post-Splenectomy Infection) i jakie patogeny są za niego odpowiedzialne?",
      options: [
        "Piorunująca bakteriemia i sepsa o śmiertelności do 50-70%, wywoływana przez bakterie otoczkowe (Streptococcus pneumoniae, Neisseria meningitidis, Haemophilus influenzae typ b)",
        "Zakażenie grzybicze paznokci stóp o przewlekłym charakterze",
        "Wirusowe zapalenie wątroby typu C przenoszone przez komary",
        "Odkleszczowe zapalenie opon mózgowo-rdzeniowych o łagodnym przebiegu"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Śledziona jest największym narządem limfatycznym organizmu, odpowiedzialnym za usuwanie z krążenia bakterii otoczkowych oraz produkcję opsonin (tuftsyna, properdyna) i przeciwciał IgM przez limfocyty strefy brzeżnej.</strong> Po splenektomii pacjent jest do końca życia obarczony ryzykiem zespołu <strong>OPSI (Overwhelming Post-Splenectomy Infection)</strong>. OPSI rozwija się w ciągu kilku godzin od objawów grypopodobnych do wstrząsu septycznego z DIC i niewydolnością wielonarządową. Ponad 50-70% przypadków wywołuje <em>Streptococcus pneumoniae</em> (pneumokoki), a pozostałe <em>Neisseria meningitidis</em> i <em>Haemophilus influenzae</em> typu b.",
        "❌ BŁĄD! <strong>OPSI to zagrażająca życiu uogólniona posocznica bakteryjna, a nie grzybica paznokci.</strong>",
        "❌ BŁĄD! <strong>HCV nie jest związane z brakiem śledziony.</strong>",
        "❌ BŁĄD! <strong>OPSI to piorunująca infekcja bakteryjna o dramatycznie wysokiej śmiertelności.</strong>"
      ]
    },
    {
      title: "Krok 8: Profilaktyka po splenektomii (Szczepienia i zasady)",
      text: "Gdyby u pacjenta konieczne było usunięcie śledziony (splenektomia), jaki jest prawidłowy schemat i optymalny czas podania szczepień ochronnych po zabiegu w trybie ostrym?",
      options: [
        "Szczepienia przeciwko pneumokokom (PCV20/PCV15 + PPSV23), meningokokom (MenACWY + MenB) oraz Hib podaje się optymalnie ok. 14. doby po operacji (lub przed wypisem ze szpitala)",
        "Szczepionki należy podać natychmiast na stole operacyjnym w trakcie zszywania powłok brzusznych",
        "Szczepienia są całkowicie przeciwwskazane po wycięciu śledziony z powodu braku produkcji przeciwciał",
        "Podaje się wyłącznie szczepionkę przeciw wściekliźnie po 12 miesiącach"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Zgodnie z wytycznymi, u pacjentów po pilnej splenektomii szczepienia podaje się optymalnie po ok. 14 dniach (10-14 dni) od zabiegu.</strong> W tym okresie dochodzi do ustąpienia ostrej immunosupresji pourazowej i pooperacyjnej, co pozwala na wykształcenie optymalnej odpowiedzi immunologicznej. Jeśli istnieje ryzyko, że pacjent nie zgłosi się na kontrolę, szczepienia podaje się przed wypisem ze szpitala. Obowiązkowy pakiet obejmuje: szczepionki skoniugowane przeciw pneumokokom, meningokokom grup A, C, W, Y oraz serogrupie B, a także pałeczce hemofilnej typu b (Hib), uzupełnione o coroczne szczepienie przeciw grypie.",
        "❌ BŁĄD! <strong>Podanie szczepionki w trakcie operacji jest nieskuteczne –</strong> wstrząs i stres operacyjny blokują syntezę przeciwciał.",
        "❌ BŁĄD! <strong>Szczepienia są bezwzględnym, ratującym życie obowiązkiem u aspleników!</strong>",
        "❌ BŁĄD! <strong>Wścieklizna nie należy do rutynowego pakietu po splenektomii.</strong>"
      ]
    }
  ],
  pathoNodes: [
    {
      badge: "Tępy uraz",
      title: "Zmiażdżenie i dekompresja miąższu śledziony",
      short: "Pęknięcie torebki i naczyń beleczkowych w dolnym biegunie",
      detail: "Uderzenie w lewe dolne żebra powoduje ich złamanie lub bezpośrednie przekazanie fali uderzeniowej na kruchy, bogatokrwisty miąższ śledziony. Pęknięcie torebki włóknistej prowadzi do masywnego krwawienia do jamy otrzewnej.",
      target: "Miąższ i torebka śledziony",
      drugTarget: "<span class='dose-pill'>Płynoterapia zbilansowana 1000 ml i.v.</span> resuscytacja wstrząsu hipowolemicznego"
    },
    {
      badge: "Hemoperitoneum",
      title: "Wynaczynienie krwi i podrażnienie otrzewnej",
      short: "Krew w przestrzeni Kollera i zachyłku podprzeponowym lewym",
      detail: "Wynaczyniona krew spływa do lewego zachyłku podprzeponowego, wywołując podrażnienie nerwu przeponowego C3-C5 (objaw Kehra) oraz do przestrzeni śledzionowo-nerkowej i miednicy mniejszej (widoczne w USG FAST).",
      target: "Otrzewna ścienna i przeponowa",
      drugTarget: "<span class='dose-pill'>Kwas traneksamowy 1 g i.v.</span> we wlewie w ciągu pierwszych 3 h od urazu"
    },
    {
      badge: "Odbarczenie naczyniowe",
      title: "Selektywna hemostaza wewnątrznaczyniowa (SAE)",
      short: "Zamknięcie tętnicy śledzionowej sprężynkami embolizacyjnymi",
      detail: "Embolizacja pnia tętnicy śledzionowej (coiling) obniża ciśnienie perfuzyjne w śledzionie o >50%, umożliwiając wytworzenie trwałego skrzepu w miejscu pęknięcia, podczas gdy krążenie oboczne chroni miąższ przed martwicą.",
      target: "Tętnica śledzionowa (Arteria lienalis)",
      drugTarget: "<span class='dose-pill'>Embolizacja SAE (coils)</span> hemostaza w pracowni radiologii zabiegowej"
    },
    {
      badge: "Immunodeficyt aspleniczny",
      title: "Utrata filtracji bakteryjnej i ryzyko posocznicy OPSI",
      short: "Brak opsonizacji i fagocytozy bakterii otoczkowych przez makrofagi",
      detail: "Śledziona eliminuje słabo opsonizowane drobnoustroje otoczkowe. Brak śledziony powoduje brak properdyny i tuftsyny, prowadząc do niekontrolowanego namnażania pneumokoków w łożysku naczyniowym i piorunującej sepsy.",
      target: "Układ siateczkowo-śródbłonkowy i odporność humoralna",
      drugTarget: "<span class='dose-pill'>Szczepienia: PCV20 + MenACWY/MenB + Hib</span> w 14. dobie po zabiegu"
    }
  ],
  diffTable: {
    title: "⚔️ Tabela Różnicowa: Pęknięcie śledziony vs Inne urazy narządów jamy brzusznej i wstrząs",
    headers: ["Cecha kliniczna", "Pęknięcie śledziony", "Pęknięcie wątroby", "Pęknięcie jelita cienkiego / krezki", "Pęknięcie nerki", "Krwiak zaotrzewnowy przy złamaniu miednicy"],
    rows: [
      ["Typowy mechanizm i lokalizacja urazu", "Tępy uraz lewego podżebrza, złamanie żeber IX-XI po stronie lewej", "Tępy uraz prawego podżebrza, złamanie dolnych żeber po prawej, uraz od pasów bezpieczeństwa", "Uraz kierownicą w okolicę pępka, kompresja jelita o kręgosłup", "Uraz okolicy lędźwiowej, tępy cios w bok tułowia", "Uraz wysokoenergetyczny (potrącenie pieszego, upadek z wysokości), zgniecenie miednicy"],
      ["Rzutowanie bólu i objawy swoiste", "Objaw Kehra (ból lewego barku), objaw Saegessera, objaw Ballance'a", "Ból promieniujący do prawego barku, żółtaczka w późniejszym etapie (hemobilia)", "Wczesne narastające rozlane objawy otrzewnowe (peritonitis), wolny gaz w jamie otrzewnej", "Krwiomocz (makro- lub mikroskopowy), bolesny opór w loży nerkowej", "Niestabilność obręczy miednicy, krwiak w okolicy krocza i moszny/warg sromowych"],
      ["Obraz w USG FAST", "Płyn w przestrzeni śledzionowo-nerkowej (Koller) i zachyłku Douglasa", "Płyn w przestrzeni wątrobowo-nerkowej (Morison) i wokół wątroby", "Często FAST ujemny we wczesnym etapie (mała objętość płynu); możliwy płyn między pętlami", "Krew w przestrzeni zaotrzewnowej okołonerkowej (FAST może nie wykryć krwiaka ściśle zaotrzewnowego)", "Płyn w miednicy mniejszej przedpęcherzowo (przestrzeń Retziusa) i w dołach biodrowych"],
      ["Aktywne wynaczynienie (TK)", "Contrast blush z gałęzi tętnicy śledzionowej w fazie tętniczej", "Contrast blush z gałęzi tętnicy wątrobowej lub żyły wrotnej", "Przerwanie ciągłości ściany jelita, ekstrawazacja kontrastu doustnego, odnaczynienie krezki", "Wyciek moczu z kontrastem w fazie opóźnionej urograficznej (uszkodzenie UKM)", "Masywne wynaczynienie z gałęzi tętnicy biodrowej wewnętrznej"],
      ["Leczenie pierwszego rzutu u stabilnego", "Leczenie zachowawcze (NOM) + embolizacja SAE w razie contrast blush", "Leczenie zachowawcze (NOM) + embolizacja tętnicy wątrobowej (TAE)", "Pilna laparotomia eksploratywna (NOM przeciwwskazany przy perforacji jelita!)", "Leczenie zachowawcze (NOM); stenty moczowodowe lub embolizacja w krwawieniu", "Stabilizacja mechaniczna miednicy pasem miednicznym + pilna embolizacja naczyniowa (TAE)"],
      ["Specyficzne zagrożenie odległe", "Piorunująca posocznica OPSI (Streptococcus pneumoniae) w przypadku splenektomii", "Martwica wątroby, ropień wątroby, przetoki żółciowe, krwawienie do dróg żółciowych", "Zapalenie otrzewnej, zrosty wewnątrzotrzewnowe, przetoki jelitowe", "Zwężenie moczowodu, nadciśnienie naczyniowo-nerkowe (nerka Page'a)", "Zatorowość tłuszczowa, masywna zakrzepica żylna miednicy, przetoki moczowo-płciowe"]
    ]
  },
  dutySummary: {
    overview: "Śledziona jest najczęściej uszkadzanym narządem miąższowym w tępych urazach jamy brzusznej (ok. 30-40% przypadków). Współczesnym standardem postępowania u pacjentów stabilnych hemodynamicznie jest leczenie zachowawcze (NOM) z ewentualną embolizacją naczyniową (SAE), co pozwala na uratowanie narządu i uniknięcie powikłań asplenii (w tym śmiertelnej sepsy OPSI).",
    diagnostics: "1. Ocena w protokole ATLS (cABCDE): drożność dróg, oddech, hemostaza i resuscytacja krążeniowa.<br>2. USG przyłóżkowe E-FAST: ocena płynu wolnego w zachyłku Kollera, Morisona, Douglasa oraz wykluczenie odmy/krwiaka opłucnej i tamponady serca.<br>3. Wielofazowa tomografia komputerowa (TK) jamy brzusznej i miednicy z kontrastem i.v. u chorego stabilnego – złoty standard oceny stopnia wg AAST i wykrycia 'contrast blush'.<br>4. Monitorowanie laboratoryjne: hemoglobina, hematokryt, kwasica metaboliczna i stężenie mleczanów w gazometrii krwi tętniczej.",
    drugsAndDoses: "1. Zbilansowana krystaloidoterapia we wstrząsie: <span class='dose-pill'>Plasmalyte / Sterofundin 1000 ml i.v.</span> w szybkim wlewie (unikać przewodnienia, hipotensja kontrolowana SBP 80-90 mmHg do opanowania krwotoku).<br>2. Kwas traneksamowy: <span class='dose-pill'>Tranexamic acid 1 g i.v. w ciągu 10 min</span>, a następnie wlew <span class='dose-pill'>1 g i.v. przez 8 godzin</span> (podany w ciągu 3 h od urazu wg badania CRASH-2).<br>3. Analgezja: <span class='dose-pill'>Fentanyl 50-100 µg i.v.</span> miareczkowany pod kontrolą parametrów krążeniowo-oddechowych.<br>4. W przypadku splenektomii – pakiet szczepień w 14. dobie:<br>   - <span class='dose-pill'>PCV20 0,5 ml i.m.</span> (szczepionka przeciw pneumokokom)<br>   - <span class='dose-pill'>MenACWY + MenB i.m.</span> (szczepionki przeciw meningokokom)<br>   - <span class='dose-pill'>Hib 0,5 ml i.m.</span> (szczepionka przeciw H. influenzae typ b).",
    procedures: "1. Założenie 2 obwodowych kaniul o dużym świetle (14-16G) i natychmiastowe zabezpieczenie próby krzyżowej oraz aktywacja protokołu masywnej transfuzji (MTP 1:1:1) w razie niestabilności.<br>2. Angiografia i przezcewnikowa embolizacja tętnicy śledzionowej (SAE) w pracowni naczyniowej u chorych stabilnych z aktywnym wynaczynieniem w TK.<br>3. Pilna laparotomia zwiadowcza w linii pośrodkowej: wskazana u chorych z niestabilnością hemodynamiczną niereagującą na resuscytację (splenorafia vs splenektomia).<br>4. Autotransplantacja fragmentów śledziony do sieci większej w wybranych przypadkach młodych chorych po splenektomii.",
    monitoring: "1. Ciągły monitoring hemodynamiczny (kardiomonitor, inwazyjny pomiar ciśnienia tętniczego IBP).<br>2. Seryjne oznaczenia morfologii krwi (Hb/Hct) i mleczanów co 4-6 godzin przez pierwsze 24-48 h.<br>3. Ścisły reżim łóżkowy przez minimum 48-72 godziny w leczeniu zachowawczym (NOM).<br>4. Edukacja pacjenta i wydanie karty asplenika z zaleceniem natychmiastowego zgłoszenia się do szpitala i wdrożenia antybiotykoterapii w razie jakiejkolwiek gorączki >38°C."
  },
  lekQuestions: [
    {
      question: "Objaw Kehra, polegający na występowaniu ostrego bólu rzutowanego do lewego barku u pacjenta po tępym urazie brzucha, świadczy o:",
      options: [
        "Pęknięciu śledziony z obecnością krwiaka podprzeponowego drażniącego nerw przeponowy (C3-C5)",
        "Złamaniu obojczyka z uciskiem na splot ramienny",
        "Pęknięciu pęcherza moczowego do przestrzeni zaotrzewnowej",
        "Pourazowym zakażeniu kaletki podbarkowej bakteriami beztlenowymi",
        "Odmie opłucnowej prężnej po stronie prawej"
      ],
      correct: 0,
      expl: "Objaw Kehra to silny ból lewego barku wywołany podrażnieniem otrzewnej dolnej powierzchni przepony przez wynaczynioną krew po pęknięciu śledziony. Przepona jest unerwiana przez gałęzie czuciowe nerwu przeponowego wywodzącego się z segmentów C3-C5 rdzenia kręgowego, co powoduje rzutowanie bólu na dermatomy okolicy lewego barku."
    },
    {
      question: "Badanie USG w protokole FAST (Focused Assessment with Sonography for Trauma) wykonywane na SOR u pacjenta po tępym urazie jamy brzusznej służy przede wszystkim do:",
      options: [
        "Szybkiego wykrycia wolnego płynu (krwi) w worku osierdziowym i jamie otrzewnej",
        "Oceny histopatologicznej miąższu wątroby i śledziony",
        "Dokładnego pomiaru ciśnienia w żyle wrotnej metodą dopplerowską",
        "Wykrycia mikroskopijnych pęknięć torebki trzustki bez płynu",
        "Oceny refluksu żołądkowo-przełykowego po urazie"
      ],
      correct: 0,
      expl: "Protokół FAST jest szybkim, przyłóżkowym badaniem ultrasonograficznym mającym na celu detekcję wolnego płynu (krwiaka) w worku osierdziowym oraz w trzech anatomicznych zachyłkach otrzewnej: przestrzeni Morisona (wątrobowo-nerkowej), przestrzeni Kollera (śledzionowo-nerkowej) i w miednicy mniejszej (zachyłku pęcherzowo-odbytniczym / Douglasa)."
    },
    {
      question: "Pacjent po wypadku komunikacyjnym jest stabilny hemodynamicznie (BP 125/80 mmHg, HR 82/min), a w badaniu FAST stwierdzono obecność płynu w lewym podżebrzu. Badaniem z wyboru w celu ustalenia dalszego postępowania jest:",
      options: [
        "Wielofazowa tomografia komputerowa (TK) jamy brzusznej z kontrastem dożylnym",
        "Natychmiastowa laparotomia zwiadowcza w znieczuleniu ogólnym",
        "Pielograficzna scyntygrafia nerek",
        "Gastroskopia diagnostyczna w trybie ostrym",
        "Wykonanie diagnostycznego płukania otrzewnej (DPL)"
      ],
      correct: 0,
      expl: "U każdego pacjenta po urazie tępego brzucha, który jest STABILNY hemodynamicznie (lub ustabilizował się po początkowej płynoterapii), badaniem z wyboru o najwyższej dokładności diagnostycznej jest tomografia komputerowa z dożylnym środkiem cieniującym. Pozwala ona precyzyjnie ocenić stopień urazu narządów miąższowych i kwalifikować do leczenia zachowawczego."
    },
    {
      question: "Wskaż sytuację, w której u pacjenta z pęknięciem śledziony bezwzględnie konieczne jest odstąpienie od leczenia zachowawczego (NOM) i wykonanie natychmiastowej laparotomii:",
      options: [
        "Utrzymująca się niestabilność hemodynamiczna niereagująca na przetoczenie płynów i preparatów krwi",
        "Obecność krwiaka podtorebkowego obejmującego 20% powierzchni śledziony w TK",
        "Obecność złamania lewego podudzia wymagającego zespolenia",
        "Podwyższona leukocytoza do 13 G/l w pierwszej dobie",
        "Wiek chorego powyżej 40. roku życia przy stabilnych parametrach życiowych"
      ],
      correct: 0,
      expl: "Jedynym bezwzględnym wskazaniem do natychmiastowej interwencji operacyjnej (laparotomii) w urazach śledziony jest niestabilność hemodynamiczna (wstrząs krwotoczny oporny na resuscytację płynową) lub współistnienie objawów zapalenia otrzewnej wskazujących na perforację narządu drążącego."
    },
    {
      question: "Obecność tzw. 'contrast blush' (aktywnego wynaczynienia środka cieniującego w fazie tętniczej) w TK u stabilnego chorego z urazem śledziony wskazuje na:",
      options: [
        "Aktywne krwawienie tętnicze będące wskazaniem do przezcewnikowej embolizacji tętnicy śledzionowej (SAE) lub operacji",
        "Prawidłowe, fizjologiczne unaczynienie miazgi białej śledziony",
        "Przebyte w dzieciństwie zapalenie wątroby typu A",
        "Wrodzoną torbiel bąblowcową śledziony",
        "Brak konieczności jakiejkolwiek hospitalizacji i możliwość wypisu do domu"
      ],
      correct: 0,
      expl: "'Contrast blush' w tomografii komputerowej odpowiada aktywnemu wynaczynieniu krwi z uszkodzonego naczynia tętniczego. U pacjenta stabilnego hemodynamicznie jest to klasyczne wskazanie do pilnej endowaskularnej embolizacji tętnicy śledzionowej (SAE), co pozwala na hemostazę z zachowaniem śledziony."
    },
    {
      question: "Zespół OPSI (Overwhelming Post-Splenectomy Infection) jest piorunującą posocznicą, która u pacjentów z asplenią wywoływana jest najczęściej przez:",
      options: [
        "Streptococcus pneumoniae (pneumokoki)",
        "Pseudomonas aeruginosa",
        "Clostridioides difficile",
        "Mycobacterium tuberculosis",
        "Candida albicans"
      ],
      correct: 0,
      expl: "Pneumokoki (Streptococcus pneumoniae) odpowiadają za ponad 50-70% wszystkich przypadków OPSI. Kolejnymi pod względem częstości patogenami są inne bakterie posiadające otoczkę polisacharydową: Neisseria meningitidis oraz Haemophilus influenzae typ b."
    },
    {
      question: "Jaki jest optymalny czas podania szczepień ochronnych przeciwko bakteriom otoczkowym u pacjenta po pilnej splenektomii pourazowej?",
      options: [
        "Około 14. doby po operacji (lub przed wypisem ze szpitala)",
        "Przed rozpoczęciem znieczulenia na sali operacyjnej",
        "Po 5 latach od usunięcia śledziony",
        "W pierwszej dobie po zabiegu do drenu otrzewnowego",
        "Szczepienia są całkowicie przeciwwskazane u osób bez śledziony"
      ],
      correct: 0,
      expl: "W przypadku pilnej splenektomii pourazowej optymalnym czasem szczepienia jest ok. 14. doba po zabiegu (10-14 dni). Odroczenie szczepienia wynika z faktu, że bezpośrednio po ciężkim urazie i zabiegu odpowiedź humoralna na antygeny szczepionkowe jest znacznie osłabiona. Jeśli chory ma być wypisany wcześniej, szczepi się go przed wypisem."
    },
    {
      question: "Zgodnie z klasyfikacją AAST, uszkodzenie śledziony stopnia V oznacza:",
      options: [
        "Całkowite zmiażdżenie narządu lub wyrwanie szypuły naczyniowej z odnaczynieniem całej śledziony",
        "Izolowane pęknięcie torebki śledziony o głębokości do 1 cm",
        "Krwiak podtorebkowy obejmujący od 10% do 50% powierzchni",
        "Pęknięcie miąższu o głębokości do 3 cm bez uszkodzenia naczyń segmentowych",
        "Pojedynczą torbiel rzekomą bez cech krwawienia"
      ],
      correct: 0,
      expl: "Stopień V według skali AAST jest najcięższym uszkodzeniem śledziony i oznacza jej całkowite anatomiczne rozfragmentowanie (zmiażdżenie) lub całkowite awulsyjne oderwanie szypuły naczyniowej, co powoduje masywny krwotok zagrażający zgonem w ciągu kilkunastu minut."
    },
    {
      question: "W badaniu laboratoryjnym krwi u pacjenta po usunięciu śledziony charakterystycznymi odchyleniami utrzymującymi się przez dłuższy czas są:",
      options: [
        "Nadpłytkowość (trombocytoza) oraz obecność ciałek Howella-Jolly'ego w erytrocytach",
        "Głęboka trombocytopenia poniżej 20 G/l",
        "Pancytopenia ze skrajną aplazją szpiku kostnego",
        "Brak jakichkolwiek zmian morfotycznych we krwi obwodowej",
        "Wzrost stężenia ferrytyny powyżej 10 000 µg/l"
      ],
      correct: 0,
      expl: "Fizjologicznie śledziona sekwestruje około 1/3 puli płytek krwi oraz usuwa zestarzałe krwinki i inkluzje wewnątrzkomórkowe. Po splenektomii typowym zjawiskiem jest przejściowa lub przewlekła nadpłytkowość (trombocytoza, niekiedy >600-1000 G/l) oraz obecność ciałek Howella-Jolly'ego (resztki chromatyny jądrowej) w erytrocytach w rozmazie krwi."
    },
    {
      question: "Kwas traneksamowy (TXA) podany we wstrząsie krwotocznym w ciągu 3 godzin od urazu (badanie CRASH-2):",
      options: [
        "Zmniejsza śmiertelność z powodu wykrwawienia poprzez hamowanie fibrynolizy (blokowanie przejścia plazminogenu w plazminę)",
        "Działa silnie rozkurczająco na mięśniówkę gładką naczyń krwionośnych",
        "Jest bezpośrednim inhibitorem trombiny stosowanym do rozpuszczania skrzepów",
        "Zastępuje konieczność przetaczania koncentratu krwinek czerwonych",
        "Powoduje natychmiastowe rozszerzenie źrenic i spadek ciśnienia śródczaszkowego"
      ],
      correct: 0,
      expl: "Badanie kliniczne CRASH-2 wykazało, że wczesne podanie kwasu traneksamowego (TXA – syntetyczny inhibitor fibrynolizy blokujący wiązanie plazminogenu z fibryną) w dawce 1 g w ciągu 10 min, a następnie 1 g we wlewie przez 8 godzin, w ciągu pierwszych 3 godzin od urazu istotnie redukuje śmiertelność z powodu krwotoku pourazowego."
    },
    {
      question: "Jakie postępowanie profilaktyczne jest zalecane u pacjenta po splenektomii w przypadku wystąpienia nagłej gorączki lub objawów infekcji dróg oddechowych?",
      options: [
        "Natychmiastowe przyjęcie doustnego antybiotyku o szerokim spektrum (np. amoksycylina z kwasem klawulanowym) z domowej 'rezerwy ratunkowej' i pilny kontakt ze szpitalem",
        "Wyłącznie zażycie kwasu acetylosalicylowego i oczekiwanie na samoistne ustąpienie objawów przez 7 dni",
        "Zastosowanie diety beztłuszczowej i lewatywy czyszczącej",
        "Bezwzględny zakaz przyjmowania antybiotyków z powodu ryzyka aplazji szpiku",
        "Podanie dożylne heparyny drobnocząsteczkowej w podwójnej dawce leczniczej"
      ],
      feedback: "",
      correct: 0,
      expl: "Wszyscy pacjenci po splenektomii powinni posiadać przy sobie tzw. 'antybiotyk ratunkowy' (stand-by antibiotics, np. amoksycylinę z klawulanianem lub cefuroksym / lewofloksacynę) i w razie nagłej gorączki (>38°C) lub dreszczy natychmiast przyjąć pierwszą dawkę leku w drodze na szpitalny oddział ratunkowy, aby zapobiec rozwinięciu śmiertelnej posocznicy OPSI."
    }
  ],
  flashcards: [
    {
      front: "Co to jest objaw Kehra i jaki mechanizm odpowiada za jego powstawanie?",
      back: "Ból rzutowany do lewego barku wywołany podrażnieniem dolnej powierzchni lewej kopuły przepony przez krew ze śledziony; przewodzi go nerw przeponowy (C3-C5)."
    },
    {
      front: "Jakie są 4 standardowe okna akustyczne w badaniu USG FAST?",
      back: "1. Przestrzeń Morisona (wątrobowo-nerkowa),\n2. Przestrzeń Kollera (śledzionowo-nerkowa),\n3. Zachyłek pęcherzowo-odbytniczy / Douglasa (miednica),\n4. Worek osierdziowy (okno podmostkowe)."
    },
    {
      front: "Kiedy pacjent z urazem śledziony kwalifikuje się do leczenia zachowawczego (NOM)?",
      back: "Gdy jest STABILNY hemodynamicznie (lub jest responderem na wstępną płynoterapię) oraz nie ma wskazań do operacji z powodu innych narządów (brak zapalenia otrzewnej)."
    },
    {
      front: "Czym jest 'contrast blush' w TK śledziony i jak się go leczy u stabilnego chorego?",
      back: "Aktywne wynaczynienie środka cieniującego w fazie tętniczej świadczące o krwawieniu. U chorego stabilnego wskazana jest pilna embolizacja tętnicy śledzionowej (SAE)."
    },
    {
      front: "Czym jest zespół OPSI i jakie patogeny są za niego odpowiedzialne?",
      back: "Piorunująca posocznica aspleniczna o śmiertelności 50-70%. Najczęstsze patogeny otoczkowe: Streptococcus pneumoniae (>50-70%), Neisseria meningitidis, Haemophilus influenzae typ b."
    },
    {
      front: "Kiedy i jakie szczepienia należy podać po pilnej splenektomii pourazowej?",
      back: "Optymalnie w 14. dobie po operacji (po wygaszeniu immunosupresji pooperacyjnej) lub przed wypisem: przeciw pneumokokom (PCV20), meningokokom (MenACWY + MenB) oraz Hib."
    }
  ]
};

async function run() {
  console.log("Generating Case 137: Pęknięcie śledziony...");
  
  // Mirroring
  case137.steps.forEach(s => {
    s.question = s.title;
    s.explanation = s.feedback ? s.feedback[0] : "";
  });
  
  case137.lekQuestions.forEach(q => {
    q.opts = q.options;
    q.correctIdx = q.correct;
    q.exp = q.expl;
  });
  
  const enc = await encryptStringAes(JSON.stringify(case137, null, 2), MASTER_KEY);
  fs.writeFileSync(path.join('cases', '137_pekniecie_sledziony_uraz.json'), JSON.stringify(enc, null, 2), 'utf8');
  console.log("[SAVED] Case #137: 137_pekniecie_sledziony_uraz.json (LEK Qs: " + case137.lekQuestions.length + ", Steps: " + case137.steps.length + ", Flashcards: " + case137.flashcards.length + ")");
}

run();

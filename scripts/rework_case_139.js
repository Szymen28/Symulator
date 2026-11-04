const fs = require('fs');
const path = require('path');
const { encryptStringAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

const case139 = {
  id: 139,
  dept: "Chirurgia ogólna",
  title: "Niedokrwienne zapalenie jelita grubego (Ischemic Colitis)",
  shortTitle: "72-letnia Stanisława – Nagły, kurczowy ból w lewym boku, naglące parcie i obfity krwisty stolec po hipotonii (Niedokrwienne zapalenie jelita grubego)",
  diagnosisTitle: "Niedokrwienne zapalenie jelita grubego (Ischemic Colitis) – postać przemijająca niegorzelinowa, punkty Griffithsa i Sudecka, wczesna sigmoidoskopia, leczenie zachowawcze",
  vitals: [
    { name: "Częstość akcji serca", val: "96/min", status: "vital-ok" },
    { name: "Ciśnienie tętnicze", val: "105/65 mmHg", status: "vital-warn" },
    { name: "Temperatura ciała", val: "37.6 °C", status: "vital-warn" },
    { name: "Saturacja SpO2", val: "97%", status: "vital-ok" }
  ],
  vitalsObj: {
    hr: 96,
    bp: "105/65",
    spo2: 97,
    rr: 18,
    temp: 37.6,
    gcs: 15
  },
  story: "<p><strong>Pacjentka:</strong> 72-letnia kobieta, emerytowana nauczycielka, została przywieziona przez ZRM na SOR z powodu nagłego, kurczowego bólu w lewym dole biodrowym i lewym boku brzucha, po którym w ciągu 2 godzin wystąpiło gwałtowne parcie na stolec i oddanie luźnego stolca ze znaczną domieszką ciemnoczerwonej krwi i skrzepów.</p><p><strong>Wywiad chorobowy:</strong> W wywiadzie wieloletnie nadciśnienie tętnicze, uogólniona miażdżyca naczyń, choroba niedokrwienna serca oraz niewydolność serca z zachowaną frakcją wyrzutową (HFpEF). W dniu poprzedzającym zachorowanie przebyła ostry nieżyt żołądkowo-jelitowy z wymiotami, biegunką i odwodnieniem. Z powodu osłabienia mierzyła ciśnienie w domu – odnotowała spadek do 85/50 mmHg po przyjęciu porannej dawki peryndoprylu i furosemidu. Neguje chorobę wrzodową, utratę masy ciała oraz wywiad nowotworowy.</p><p><strong>Badanie przedmiotowe na SOR:</strong> Pacjentka blada, podsypiająca, z cechami umiarkowanego odwodnienia (suchy język, opóźniony nawrót kapilarny). Brzuch symetryczny, miękki, wyraźnie tkliwy w lewym dole biodrowym i w rzucie zstępnicy, bez obrony mięśniowej i bez objawów otrzewnowych (objaw Blumberga ujemny). Perystaltyka słyszalna, żywa. W badaniu per rectum (DRE): na rękawiczce obecna ciemnoczerwona krew ze śluzem i drobnymi skrzepami; bańka odbytnicy bez oporów patologicznych. HR 96/min miarowe, BP 105/65 mmHg, temp. 37.6°C, SpO2 97% na powietrzu atmosferycznym.</p>",
  labs: [
    {
      name: "Morfologia krwi i parametry zapalne",
      items: [
        { name: "Hemoglobina (Hb)", val: "11.2 g/dl", norm: "12.0 - 16.0 g/dl", flag: "LOW" },
        { name: "Hematokryt (Hct)", val: "34.5 %", norm: "37.0 - 47.0 %", flag: "LOW" },
        { name: "Leukocyty (WBC)", val: "13.4 G/l", norm: "4.0 - 10.0 G/l", flag: "HIGH" },
        { name: "Neutrofile", val: "78 %", norm: "45 - 70 %", flag: "HIGH" },
        { name: "Płytki krwi (PLT)", val: "260 G/l", norm: "150 - 400 G/l", flag: "NORMAL" },
        { name: "CRP", val: "64 mg/l", norm: "< 5.0 mg/l", flag: "HIGH" }
      ]
    },
    {
      name: "Biochemia i gazometria",
      items: [
        { name: "Mocznik", val: "58 mg/dl", norm: "15 - 45 mg/dl", flag: "HIGH" },
        { name: "Kreatynina", val: "1.32 mg/dl", norm: "0.5 - 1.0 mg/dl", flag: "HIGH" },
        { name: "Sód (Na+)", val: "136 mmol/l", norm: "135 - 145 mmol/l", flag: "NORMAL" },
        { name: "Potas (K+)", val: "4.0 mmol/l", norm: "3.5 - 5.0 mmol/l", flag: "NORMAL" },
        { name: "Mleczany (Lactate)", val: "1.8 mmol/l", norm: "0.5 - 1.6 mmol/l", flag: "HIGH" },
        { name: "pH", val: "7.37", norm: "7.35 - 7.45", flag: "NORMAL" }
      ]
    },
    {
      name: "Koagulologia",
      items: [
        { name: "INR", val: "1.08", norm: "0.8 - 1.2", flag: "NORMAL" },
        { name: "APTT", val: "31 s", norm: "26 - 36 s", flag: "NORMAL" },
        { name: "D-dimery", val: "1250 ng/ml", norm: "< 500 ng/ml", flag: "HIGH" }
      ]
    }
  ],
  steps: [
    {
      title: "Krok 1: Wstępna ocena kliniczna i patomechanizm hipoperfuzji",
      text: "Lekarz analizuje przypadek: starsza pacjentka z chorobą naczyniową, u której po incydencie odwodnienia i hipotonii wystąpił ból lewego dołu biodrowego i krwisty stolec. Jaki patomechanizm jest najczęstszą przyczyną niedokrwiennego zapalenia jelita grubego (Ischemic Colitis)?",
      options: [
        "Nieokluzyjna hipoperfuzja mikrokrążenia krezkowego (non-occlusive mesenteric ischemia – NOMI) w obszarach 'działu wodnego' w następstwie hipotonii ogólnoustrojowej, odwodnienia lub niewydolności krążenia",
        "Masywny zator tętnicy krezkowej górnej materiałem ze skrzepliny w lewym przedsionku",
        "Wrodzone zapalenie tętnic Takayasu obejmujące tętnice esicze",
        "Toksyczne uszkodzenie śluzówki przez ameby czerwonkowe w strefie tropikalnej"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Niedokrwienne zapalenie jelita grubego (Ischemic Colitis – IC) jest najczęstszą postacią niedokrwienia przewodu pokarmowego (stanowi >75% wszystkich przypadków ischemic bowel disease).</strong> W przeciwieństwie do ostrego niedokrwienia krezki (AMI), które wynika z zatoru pnia tętniczego, IC w ponad 90% ma charakter <strong>nieokluzyjny (NOMI)</strong>. Dochodzi do niego w wyniku przejściowego spadku rzutu serca, odwodnienia, hipotonii polekowej (np. ACEI, diuretyki) lub wstrząsu u osób z istniejącą miażdżycą małych naczyń krążenia krezkowego.",
        "❌ BŁĄD! <strong>Zator pnia SMA wywołuje ostre niedokrwienie jelita cienkiego (Acute Mesenteric Ischemia), a nie typowe niedokrwienne zapalenie okrężnicy.</strong>",
        "❌ BŁĄD! <strong>Choroba Takayasu dotyczy aorty i jej głównych odgałęzień u młodych kobiet.</strong>",
        "❌ BŁĄD! <strong>Brak wywiadu podróżnego –</strong> to klasyczny chory geriatryczny z chorobą naczyniową.",
        "❌ BŁĄD! <strong>Zator pnia SMA dotyczy jelita cienkiego i prawej połowy okrężnicy.</strong>"
      ]
    },
    {
      title: "Krok 2: Anatomiczne punkty krytyczne unaczynienia okrężnicy (Watershed areas)",
      text: "Niedokrwienie okrężnicy dotyczy najczęściej określonych stref anatomicznych o najsłabszym krążeniu obocznym. Czym są punkt Griffithsa oraz punkt Sudecka?",
      options: [
        "Punkt Griffithsa to zgięcie śledzionowe okrężnicy (strefa graniczna między spływem SMA a IMA); punkt Sudecka to zgięcie odbytniczo-esicze (strefa graniczna między gałęziami IMA a tętnicami biodrowymi wewnętrznymi)",
        "Punkt Griffithsa to kątnica, a punkt Sudecka to wyrostek robaczkowy",
        "Punkt Griffithsa to brodawka Vatera, a punkt Sudecka to wpust żołądka",
        "Są to punkty uciskowe w diagnostyce zapalenia opon mózgowo-rdzeniowych"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Okrężnica posiada dwa kluczowe 'działy wodne' (watershed areas) o skąpym unaczynieniu obocznym, najbardziej podatne na niedokrwienie przy spadku ciśnienia tętniczego:</strong><br>1. <strong>Punkt Griffithsa (Griffiths' point):</strong> zgięcie śledzionowe okrężnicy (flexura coli sinistra) – strefa styku unaczynienia z tętnicy krezkowej górnej (SMA, t. okrężnicza środkowa) i dolnej (IMA, t. okrężnicza lewa). Zespolenie przez łuk Riolana lub tętnicę brzeżną Drummonda bywa w tym miejscu wąskie lub niewydolne.<br>2. <strong>Punkt Sudecka (Sudeck's point):</strong> połączenie odbytniczo-esicze (rectosigmoid junction) – strefa styku najniższej tętnicy esiczej (z IMA) z tętnicą odbytniczą górną i gałęziami tętnicy biodrowej wewnętrznej.",
        "❌ BŁĄD! <strong>Kątnica jest bogato zaopatrywana przez tętnicę krętniczo-okrężniczą.</strong>",
        "❌ BŁĄD! <strong>Punkty te leżą w jelicie grubym, a nie w górnym odcinku przewodu pokarmowego.</strong>",
        "❌ BŁĄD! <strong>Nie mają nic wspólnego z neurologią.</strong>"
      ]
    },
    {
      title: "Krok 3: Różnicowanie: Niedokrwienne zapalenie okrężnicy vs Ostre niedokrwienie krezki (AMI)",
      text: "Lekarz na SOR musi odróżnić niedokrwienne zapalenie jelita grubego (IC) od ostrego niedokrwienia jelita cienkiego z zatoru tętnicy krezkowej górnej (AMI). Które zestawienie cech prawidłowo różnicuje te dwa stany?",
      options: [
        "W ostrej zatorowości SMA występuje rozdzierający ból w śródbrzuszu nieproporcjonalny do skąpych objawów w badaniu brzucha, bez wczesnego krwawienia, ze wstrząsem i wczesną kwasicą mleczanową; w niedokrwiennym zapaleniu okrężnicy ból jest łagodniejszy, kurczowy w lewym boku, z wczesnym krwistym stolcem i zwykle bez wczesnej kwasicy",
        "W zatorze SMA zawsze występuje masywne krwawienie z odbytu w pierwszych 10 minutach",
        "W niedokrwiennym zapaleniu okrężnicy śmiertelność wynosi 100% w ciągu 6 godzin",
        "W niedokrwiennym zapaleniu okrężnicy stężenie mleczanów przekracza zawsze 15 mmol/l"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>To fundamentalne różnicowanie na egzaminie LEK i w praktyce ostrego dyżuru:</strong><br>- <strong>Ostre niedokrwienie krezki (AMI, zator SMA):</strong> 'ból nieproporcjonalny do badania fizykalnego' (rozdzierający ból przy miękkim brzuchu), brak wczesnego krwawienia, gwałtowny rozwój zgorzeli jelita cienkiego, kwasica mleczanowa, zapaść hemodynamiczna – stan o śmiertelności >60-80% wymagający natychmiastowej embolektomii/laparotomii.<br>- <strong>Niedokrwienne zapalenie okrężnicy (IC):</strong> ból kurczowy w lewym dole biodrowym, po którym w ciągu kilku godzin pojawia się <strong>biegunka z krwią (krwisty stolec / hematochezia)</strong>, brzuch jest tkliwy miejscowo, stan ogólny stabilny, kwasica rzadka – w >80-85% postać łagodna przemijająca poddająca się leczeniu zachowawczemu.",
        "❌ BŁĄD! <strong>W zatorze SMA krew w stolcu pojawia się bardzo późno (jako objaw zaawansowanej martwicy śluzówki).</strong>",
        "❌ BŁĄD! <strong>Większość przypadków niedokrwiennego zapalenia okrężnicy ma przebieg samoograniczający się.</strong>",
        "❌ BŁĄD! <strong>Wysokie mleczany >5 mmol/l to cecha zaawansowanego zawału krezki, a nie łagodnego IC.</strong>"
      ]
    },
    {
      title: "Krok 4: Diagnostyka obrazowa – Tomografia komputerowa (Angio-TK)",
      text: "Lekarz zleca wielofazową tomografię komputerową (TK) jamy brzusznej i miednicy z kontrastem dożylnym. Jakie są typowe znaleziska w TK potwierdzające niedokrwienne zapalenie okrężnicy i wykluczające zator głównych pni?",
      options: [
        "Odcinkowe pogrubienie ściany zgięcia śledzionowego lub zstępnicy z objawem 'tarczy strzeleckiej' (halo sign / target sign) w wyniku obrzęku podśluzówki, przymglenie okolicznego tłuszczu oraz w pełni drożne pnie SMA i IMA",
        "Całkowity brak zakontrastowania pnia tętnicy krezkowej górnej",
        "Masywna odma otrzewnowa z zapadnięciem obu płuc",
        "Obecność mnogich kamieni barwnikowych w pęcherzyku żółciowym"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Tomografia komputerowa (Angio-TK) jest badaniem pierwszego rzutu u pacjenta z ostrym bólem brzucha i krwawieniem.</strong> W niedokrwiennym zapaleniu jelita grubego wykazuje odcinkowe, symetryczne pogrubienie ściany jelita (często >5-10 mm) z warstwowym wzmocnieniem po kontraście – tzw. <strong>objaw tarczy strzeleckiej / tarczy strzelniczej (target sign)</strong> spowodowany obrzękiem i przekrwieniem błony podśluzowej. Angio-TK pozwala także potwierdzić drożność głównych pni naczyniowych (SMA, IMA) oraz wykluczyć perforację i odmę ściany jelita (pneumatosis intestinalis).",
        "❌ BŁĄD! <strong>Brak kontrastowania SMA to cecha zatoru pnia tętnicy krezkowej, a nie nieokluzyjnego IC.</strong>",
        "❌ BŁĄD! <strong>Odma otrzewnowa to powikłanie perforacji, a nie typowy obraz niepowikłanego zapalenia.</strong>",
        "❌ BŁĄD! <strong>Kamica pęcherzyka to przypadkowe znalezisko bez związku z krwawym stolcem.</strong>"
      ]
    },
    {
      title: "Krok 5: Rola endoskopii w diagnostyce – Wczesna sigmoidoskopia",
      text: "U pacjentki wykluczono perforację i zawał pełnej grubości ściany w TK. W jakim celu i w jaki sposób wykonuje się badanie endoskopowe w niedokrwiennym zapaleniu okrężnicy?",
      options: [
        "Wczesna, ostrożna sigmoidoskopia (w ciągu 48 h) z minimalną insuflacją CO2 (lub bez insuflacji) w celu bezpośredniej oceny śluzówki (obrzęk, bladość, wybroczyny, podłużne owrzodzenia); unika się pełnej kolonoskopii ze względu na ryzyko perforacji osłabionej ściany",
        "Pełna forsowna kolonoskopia z agresywnym rozdmuchiwaniem powietrza aż do kątnicy",
        "Endoskopia jest bezwzględnie zakazana w każdym stadium niedokrwienia jelit",
        "Wykonuje się wyłącznie gastroskopię w celu poszukiwania wrzodu żołądka"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Ostrożna sigmoidoskopia wykonana w ciągu 48 godzin od zachorowania jest złotym standardem potwierdzenia rozpoznania i oceny głębokości uszkodzenia śluzówki.</strong> Typowy obraz obejmuje: obrzęk, bladość przeplataną z sinoczerwonymi wybroczynami, kruchość błony śluzowej oraz <strong>podłużne, linijne owrzodzenia biegnące wzdłuż taśm okrężnicy</strong>. Badanie należy prowadzić z minimalną insuflacją (najlepiej dwutlenkiem węgla CO2, który szybko się wchłania) i przerwać przy napotkaniu zmian zgorzelinowych, aby nie doprowadzić do jatrogennej perforacji!",
        "❌ BŁĄD! <strong>Forsowna kolonoskopia z agresywnym rozdymaniem powietrzem osłabionej, niedokrwionej ściany grozi pęknięciem jelita.</strong>",
        "❌ BŁĄD! <strong>Ostrożna sigmoidoskopia jest rekomendowana w wytycznych do oceny stopnia uszkodzenia.</strong>",
        "❌ BŁĄD! <strong>Objawy dotyczą lewej połowy okrężnicy, gastroskopia nie ocenia zstępnicy i esicy.</strong>"
      ]
    },
    {
      title: "Krok 6: Podział kliniczny: Postać niegorzelinowa vs zgorzelinowa",
      text: "Niedokrwienne zapalenie okrężnicy przebiega w dwóch głównych postaciach klinicznych. Jakie są cechy postaci niegorzelinowej (przemijającej) w porównaniu do postaci zgorzelinowej?",
      options: [
        "Postać niegorzelinowa (80-85% chorych) obejmuje jedynie błonę śluzową i podśluzową, ma przebieg łagodny, samoograniczający się i goi się samoistnie w ciągu 1-2 tygodni; postać zgorzelinowa (15%) obejmuje martwicę pełnej grubości ściany, prowadzi do sepsy, perforacji i wymaga pilnej operacji",
        "Postać niegorzelinowa dotyczy wyłącznie dzieci poniżej 5. roku życia",
        "W postaci niegorzelinowej zawsze dochodzi do zwężenia przełyku",
        "Postać zgorzelinowa leczy się wyłącznie dietą bogatoresztkową"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Rokowanie w niedokrwiennym zapaleniu jelita grubego zależy od głębokości uszkodzenia ściany:</strong><br>1. <strong>Postać niegorzelinowa (przemijająca) – 80-85% przypadków:</strong> niedokrwienie ogranicza się do podatnej na hipoksję błony śluzowej i podśluzowej. Po wyrównaniu wolemii i perfuzji dochodzi do pełnej regeneracji nabłonka w ciągu kilkunastu dni bez powikłań (lub rzadko do późnego zwężenia pozapalnego).<br>2. <strong>Postać zgorzelinowa (gangrenous colitis) – ok. 15%:</strong> martwica dotyczy pełnej grubości ściany (transmural necrosis), prowadząc do zgorzeli, przedziurawienia ściany, rozlanego kałowego zapalenia otrzewnej i wstrząsu septycznego o śmiertelności >50%.",
        "❌ BŁĄD! <strong>Niedokrwienne zapalenie okrężnicy to choroba osób w podeszłym wieku z miażdżycą.</strong>",
        "❌ BŁĄD! <strong>Przełyk nie bierze udziału w tym procesie.</strong>",
        "❌ BŁĄD! <strong>Postać zgorzelinowa to bezwzględne wskazanie do pilnej laparotomii ratunkowej.</strong>"
      ]
    },
    {
      title: "Krok 7: Strategia leczenia zachowawczego postaci łagodnej",
      text: "U pacjentki potwierdzono postać niegorzelinową (brzuch miękki, brak objawów otrzewnowych, parametry stabilne). Jaki jest prawidłowy schemat leczenia zachowawczego na oddziale chirurgii?",
      options: [
        "Ścisła dieta ścisła (NPO), intensywne dożylne nawadnianie krystaloidami w celu optymalizacji perfuzji jelita, czasowe odstawienie leków wazokonstrykcyjnych i diuretyków, antybiotyki o szerokim spektrum i.v. oraz monitorowanie parametrów życiowych i brzucha",
        "Podanie leków obkurczających naczynia (adrenalina we wlewie ciągłym) celem zmniejszenia krwawienia",
        "Wykonanie pilnej lewatywy czyszczącej z soli glauberskiej",
        "Podanie kwasu acetylosalicylowego w dawce 1000 mg i natychmiastowe wypisanie do domu"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Leczenie niegorzelinowego niedokrwiennego zapalenia okrężnicy jest zachowawcze i przynosi wyleczenie u zdecydowanej większości chorych:</strong><br>1. <strong>Optymalizacja perfuzji:</strong> dożylna płynoterapia zbilansowanymi krystaloidami (<span class='dose-pill'>Plasmalyte 2000-2500 ml/d i.v.</span>) celem utrzymania średniego ciśnienia tętniczego MAP >65-70 mmHg.<br>2. <strong>Eliminacja czynników wyzwalających:</strong> natychmiastowe odstawienie diuretyków, leków hipotensyjnych, digoksyny i NLPZ.<br>3. <strong>Odpoczynek jelita:</strong> wstrzymanie żywienia doustnego (dieta zerowa NPO) na 2-3 dni, następnie dieta płynna i lekkostrawna.<br>4. <strong>Antybiotykoterapia:</strong> profilaktyka translokacji bakteryjnej (<span class='dose-pill'>Ceftriakson 2 g i.v.</span> + <span class='dose-pill'>Metronidazol 500 mg i.v.</span>).",
        "❌ BŁĄD! <strong>Leki wazokonstrykcyjne pogłębiają skurcz naczyń krezkowych i wywołają zgorzel jelita!</strong>",
        "❌ BŁĄD! <strong>Wlewki doodbytnicze podnoszą ciśnienie w jelicie i grożą perforacją.</strong>",
        "❌ BŁĄD! <strong>Wypisanie do domu chorej z krwawieniem z przewodu pokarmowego jest błędem sztuki.</strong>"
      ]
    },
    {
      title: "Krok 8: Wskazania do pilnej konwersji do leczenia operacyjnego",
      text: "Podczas 48-godzinnej obserwacji na oddziale, jakie objawy kliniczne lub wyniki badań laboratoryjnych stanowią bezwzględne wskazanie do pilnej laparotomii ratunkowej?",
      options: [
        "Wystąpienie objawów zapalenia otrzewnej (obrona mięśniowa, objaw Blumberga), narastająca kwasica metaboliczna z hiperlaktatemią (>2,5-3 mmol/l), wstrząs septyczny lub wolny gaz w jamie otrzewnej w badaniach obrazowych",
        "Pojawienie się apetytu i prośba pacjenta o herbatę",
        "Spadek leukocytozy do wartości prawidłowych 6,5 G/l",
        "Normalizacja ciśnienia tętniczego do 120/80 mmHg"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Około 15-20% chorych z niedokrwiennym zapaleniem okrężnicy ulega pogorszeniu i wymaga pilnej interwencji chirurgicznej.</strong> Wskazaniami do ratunkowej laparotomii są: pojawienie się objawów otrzewnowych (Blumberg, obrona mięśniowa), cechy zgorzeli w endoskopii lub TK, narastająca kwasica mleczanowa, oporna hipotensja/wstrząs septyczny lub radiologiczne cechy martwicy/perforacji (pneumatosis intestinalis, gaz w żyle wrotnej, pneumoperitoneum). Standardowym zabiegiem jest resekcja martwiczego odcinka jelita grubego z wyłonieniem stomii (np. operacja Hartmanna).",
        "❌ BŁĄD! <strong>Powrót apetytu to objaw zdrowienia, a nie wskazanie do operacji.</strong>",
        "❌ BŁĄD! <strong>Normalizacja parametrów zapalnych świadczy o skuteczności leczenia zachowawczego.</strong>",
        "❌ BŁĄD! <strong>Prawidłowe ciśnienie krwi to cel terapeutyczny.</strong>"
      ]
    }
  ],
  pathoNodes: [
    {
      badge: "Hipoperfuzja NOMI",
      title: "Spadek ciśnienia i skurcz mikrokrążenia",
      short: "Spadek rzutu serca i perfuzji w obszarach działu wodnego",
      detail: "Odwodnienie i hipotermia/leki hipotensyjne uruchamiają odruchowy skurcz naczyń trzewnych w celu ochrony perfuzji mózgu i serca. Prowadzi to do ostrego niedokrwienia stref brzeżnych okrężnicy.",
      target: "Mikrokrążenie zstępnicy i esicy",
      drugTarget: "<span class='dose-pill'>Plasmalyte 2000 ml/d i.v.</span> utrzymanie perfuzji MAP >65-70 mmHg"
    },
    {
      badge: "Punkty wrażliwe",
      title: "Anatomiczne strefy graniczne (Griffiths i Sudeck)",
      short: "Niewydolność połączeń krążenia obocznego SMA-IMA",
      detail: "Zgięcie śledzionowe (punkt Griffithsa) oraz połączenie odbytniczo-esicze (punkt Sudecka) mają najsłabsze połączenia naczyniowe, co czyni je pierwszym celem uszkodzenia niedokrwiennego.",
      target: "Zgięcie śledzionowe i esica",
      drugTarget: "<span class='dose-pill'>Odstawienie leków wazokonstrykcyjnych</span> i diuretyków"
    },
    {
      badge: "Złuszczanie śluzówki",
      title: "Martwica nabłonka i krwawienie śródścienne",
      short: "Obrzęk podśluzówki i linijne owrzodzenia wzdłuż taśm",
      detail: "Niedotlenienie powoduje lityczną martwicę powierzchownej warstwy śluzówki, wybroczyny krwotoczne i powstanie podłużnych owrzodzeń, co objawia się nagłą hematochezją i kurczowym bólem.",
      target: "Błona śluzowa i podśluzowa jelita grubego",
      drugTarget: "<span class='dose-pill'>Dieta zerowa NPO</span> odpoczynek czynnościowy jelita"
    },
    {
      badge: "Zgorzel vs Regeneracja",
      title: "Postać przemijająca vs martwica pełnościenna",
      short: "Równowaga między szybką naprawą a perforacją jelita",
      detail: "W postaci niegorzelinowej (85%) po przywróceniu przepływu dochodzi do reepitelializacji w 7-14 dni. W postaci zgorzelinowej (15%) martwica obejmuje błonę mięśniową, grożąc perforacją.",
      target: "Pełna grubość ściany jelita grubego",
      drugTarget: "<span class='dose-pill'>Ceftriakson 2 g i.v.</span> + <span class='dose-pill'>Metronidazol 500 mg i.v.</span> profilaktyka sepsy"
    }
  ],
  diffTable: {
    title: "⚔️ Tabela Różnicowa: Niedokrwienne zapalenie okrężnicy vs Inne przyczyny bólu i krwawienia z dolnego odcinka",
    headers: ["Cecha kliniczna", "Niedokrwienne zapalenie okrężnicy (IC)", "Ostre niedokrwienie krezki (AMI - zator SMA)", "Krwawienie z uchyłków okrężnicy", "Wrzodziejące zapalenie jelita grubego (UC)", "Rak okrężnicy lewej (obturacyjny)"],
    rows: [
      ["Początek i wywiad", "Nagły kurczowy ból w lewym boku, po którym występuje krwawy stolec; starszy wiek, epizod hipotonii", "Nagły, potężny ból w śródbrzuszu, migotanie przedsionków; brak wczesnego krwawienia", "Nagłe, bezbolesne, obfite krwawienie ze skrzepami (hematochezia); starszy wiek", "Przewlekłe krwiste stolce z domieszką śluzu, parcie naglące, nawracający przebieg; młodszy wiek", "Podostry: zmiana rytmu wypróżnień, chudnięcie, stolce ołówkowate, wzdęcie brzucha"],
      ["Badanie brzucha", "Tkliwość w lewym dole biodrowym; brzuch miękki, bez objawów otrzewnowych (w postaci łagodnej)", "Dysocjacja kliniczna: potężny ból zgłaszany przez chorego przy całkowicie miękkim brzuchu", "Brzuch całkowicie miękki, niebolesny, bez oporów palpacyjnych", "Bolesność wzdłuż rzutu okrężnicy, brak objawów otrzewnowych (chyba że megacolon)", "Bolesne wzdęcie w prawym dole biodrowym (rozdęta kątnica), objaw 'stawiania się pętli'"],
      ["Obraz w TK / Angio-TK", "Pogrubienie ściany zgięcia śledzionowego / zstępnicy z objawem 'tarczy strzeleckiej' (target sign); drożne pnie SMA/IMA", "Brak kontrastowania pnia tętnicy krezkowej górnej (SMA), brak wzmocnienia ściany jelita cienkiego", "Liczne uchyłki bez zgrubienia ściany; contrast blush z szyi uchyłka w fazie tętniczej", "Ciągłe, symetryczne zgrubienie ściany odbytnicy i lewej okrężnicy z utratą haustracji", "Krótki, asymetryczny naciek typu 'ogryzka jabłka' (apple core sign) zwężający światło"],
      ["Obraz w endoskopii", "Bladość, obrzęk, wybroczyny i podłużne owrzodzenia wzdłuż taśm zstępnicy; odbytnica zaoszczędzona!", "Wczesna endoskopia bez zmian (proces dotyczy jelita cienkiego); późna – martwica śluzówki", "Świeża krew w uchyłkach; brak zmian zapalnych śluzówki między uchyłkami", "Ciągły stan zapalny od odbytnicy: zatarcie rysunku naczyniowego, kruchość, owrzodzenia", "Egzofityczny guz o nierównej powierzchni zwężający światło jelita"],
      ["Kwasica i mleczany", "Mleczany prawidłowe lub nieznacznie podwyższone; brak kwasicy w postaci niegorzelinowej", "Wczesna, gwałtownie narastająca kwasica metaboliczna z hiperlaktatemią (>4-8 mmol/l)", "Mleczany prawidłowe; brak kwasicy (chyba że wstrząs krwotoczny)", "Mleczany prawidłowe; brak kwasicy", "Mleczany prawidłowe; kwasica późna w razie perforacji kątnicy"],
      ["Postępowanie pierwszego rzutu", "Leczenie zachowawcze (nawodnienie i.v., NPO, odstawienie leków hipotensyjnych, antybiotyki) w 80-85%", "Pilna laparotomia z embolektomią cewnikiem Fogarty'ego lub trombektomia endowaskularna", "Stabilizacja hemodynamiczna; w krwotoku embolizacja TAE lub kolonoskopia hemostatyczna", "Leczenie przeciwzapalne (pochodne 5-ASA, glikokortykosteroidy i.v./p.o.)", "Stentowanie SEMS jako bridge to surgery lub operacja Hartmanna"]
    ]
  },
  dutySummary: {
    overview: "Niedokrwienne zapalenie jelita grubego (Ischemic Colitis – IC) jest najczęstszą chorobą niedokrwienną przewodu pokarmowego, stanowiącą ponad 75% wszystkich przypadków niedokrwienia jelit. Występuje typowo u chorych w podeszłym wieku z obciążeniami sercowo-naczyniowymi w mechanizmie przejściowej hipoperfuzji (NOMI). W 80-85% przypadków ma przebieg łagodny, przemijający (niegorzelinowy) i wymaga leczenia zachowawczego.",
    diagnostics: "1. Ocena kliniczna: nagły kurczowy ból w lewym boku, po którym pojawia się parcie i krew w stolcu (hematochezia) po epizodzie hipotonii lub odwodnienia.<br>2. Pilna tomografia komputerowa (Angio-TK) jamy brzusznej i miednicy z kontrastem i.v.: ocena pogrubienia ściany zstępnicy/zgięcia śledzionowego ('objaw tarczy strzeleckiej'), wykluczenie wolnego gazu oraz potwierdzenie drożności głównych pni naczyniowych (SMA, IMA).<br>3. Wczesna, ostrożna sigmoidoskopia (do 48 h) z insuflacją CO2: ocena bladości, obrzęku, wybroczyn i podłużnych owrzodzeń śluzówki (unikać forsownej kolonoskopii).<br>4. Monitorowanie laboratoryjne: hemoglobina, leukocytoza, CRP, kreatynina i mocznik oraz stężenie mleczanów i gazometria tętnicza.",
    drugsAndDoses: "1. Intensywne nawadnianie krystaloidowe: <span class='dose-pill'>Plasmalyte / Ringer 2000-2500 ml/dobę i.v.</span> celem utrzymania MAP >65-70 mmHg i optymalizacji rzutu serca.<br>2. Profilaktyka antybiotykowa (osłona przed translokacją bakteryjną przez uszkodzoną śluzówkę):<br>   - <span class='dose-pill'>Ceftriakson 2 g i.v. raz/dobę</span> + <span class='dose-pill'>Metronidazol 500 mg i.v. co 8 h</span> LUB<br>   - <span class='dose-pill'>Ciprofloksacyna 400 mg i.v. co 12 h</span> + <span class='dose-pill'>Metronidazol 500 mg i.v. co 8 h</span>.<br>3. <span class='dose-pill'>Natychmiastowe odstawienie leków wyzwalających hipoperfuzję</span>: leków hipotensyjnych (ACEI, ARB), leków moczopędnych (furosemid) oraz leków wazokonstrykcyjnych.<br>4. Analgezja nienarkotyczna: <span class='dose-pill'>Paracetamol 1000 mg i.v. co 6 h</span> (unikać NLPZ ze względu na toksyczność nerkową i śluzówkową).",
    procedures: "1. Czasowe wstrzymanie żywienia doustnego (NPO – dieta zerowa) przez pierwsze 48-72 godziny celem odbarczenia jelita.<br>2. Zabezpieczenie wkłucia obwodowego o dużym świetle oraz cewnikowanie pęcherza moczowego celem ścisłej kontroli diurezy godzinowej (>0,5 ml/kg/h).<br>3. Pilna laparotomia ratunkowa: wskazana wyłącznie w postaci zgorzelinowej (15%) w przypadku objawów otrzewnowych, narastającej kwasicy mleczanowej, sepsy lub perforacji (resekcja martwiczego odcinka jelita z kolostomią sposobem Hartmanna).",
    monitoring: "1. Seryjne badanie fizykalne jamy brzusznej co 4-6 godzin pod kątem pojawienia się obrony mięśniowej i objawu Blumberga.<br>2. Kontrola parametrów hemodynamicznych (BP, HR, diureza, nawrót kapilarny).<br>3. Oznaczanie stężenia mleczanów we krwi tętniczej co 12 godzin (wzrost sugeruje zawał transmuralny i konieczność operacji).<br>4. Stopniowe rozszerzanie diety od płynnej do lekkostrawnej po ustąpieniu bólu brzucha i krwawienia ze stolcem."
  },
  lekQuestions: [
    {
      question: "Najczęstszą postacią niedokrwienia przewodu pokarmowego, stanowiącą ponad 75% wszystkich przypadków chorób niedokrwiennych jelit, jest:",
      options: [
        "Niedokrwienne zapalenie jelita grubego (Ischemic Colitis)",
        "Ostre zatorowe niedokrwienie tętnicy krezkowej górnej (SMA)",
        "Zakrzepica żyły krezkowej górnej (MVT)",
        "Zawał żołądka w przebiegu ucisku przez pień trzewny",
        "Przewlekłe niedokrwienie dwunastnicy"
      ],
      correct: 0,
      expl: "Niedokrwienne zapalenie jelita grubego (Ischemic Colitis) jest zdecydowanie najczęstszą formą niedokrwienia przewodu pokarmowego (>75% przypadków). Występuje typowo u starszych osób z miażdżycą i w większości ma podłoże nieokluzyjnej hipoperfuzji (NOMI)."
    },
    {
      question: "Które z poniższych miejsc anatomicznych w jelicie grubym stanowią tzw. 'działy wodne' (watershed areas) o najwyższej podatności na niedokrwienie przy spadku ciśnienia tętniczego?",
      options: [
        "Zgięcie śledzionowe (punkt Griffithsa) oraz połączenie odbytniczo-esicze (punkt Sudecka)",
        "Kątnica i wyrostek robaczkowy",
        "Zgięcie wątrobowe okrężnicy i poprzecznica",
        "Środkowa część odbytnicy i kanał odbytu",
        "Dno żołądka i odźwiernik"
      ],
      correct: 0,
      expl: "Punkt Griffithsa (zgięcie śledzionowe okrężnicy – granica dorzecza SMA i IMA) oraz punkt Sudecka (połączenie odbytniczo-esicze – granica dorzecza IMA i tętnic biodrowych) to klasyczne strefy graniczne (watershed areas), w których unaczynienie oboczne jest najsłabsze, co czyni je najbardziej podatnymi na niedokrwienie przy spadku rzutu serca i ciśnienia perfuzyjnego."
    },
    {
      question: "Klasyczna triada objawów w niedokrwiennym zapaleniu jelita grubego obejmuje:",
      options: [
        "Nagły kurczowy ból w lewym boku brzucha, naglące parcie na stolec oraz krwisty stolec (hematochezia) po epizodzie hipotonii",
        "Wysoką gorączkę, żółtaczkę mechaniczną oraz wodobrzusze",
        "Chlustające wymioty treścią żołądkową, ból głowy i światłowstręt",
        "Całkowity brak bólu, masywne krwawienie z górnego odcinka i melenę",
        "Ból w prawym dole biodrowym promieniujący do prawego jądra"
      ],
      correct: 0,
      expl: "Klasyczny obraz niedokrwiennego zapalenia okrężnicy to nagły, kurczowy ból w lewym dole biodrowym/lewym boku brzucha, po którym w ciągu kilku godzin pojawia się naglące parcie na stolec i oddanie luźnego stolca podbarwionego ciemną lub jasną krwią ze śluzem (hematochezia), często poprzedzone epizodem odwodnienia, hipotonii lub zaburzeń rytmu serca."
    },
    {
      question: "Czym różni się niedokrwienne zapalenie okrężnicy (IC) od ostrego niedokrwienia jelita cienkiego w przebiegu zatoru tętnicy krezkowej górnej (AMI)?",
      options: [
        "W niedokrwiennym zapaleniu okrężnicy ból jest łagodniejszy, wcześnie występuje krew w stolcu, a większość przypadków (80-85%) przebiega łagodnie i leczy się zachowawczo; w zatorze SMA ból jest potężny i nieproporcjonalny do badania brzucha, brak wczesnej krwi, a stan wymaga natychmiastowej operacji",
        "W zatorze SMA krew w stolcu pojawia się zawsze w pierwszych 5 minutach",
        "Niedokrwienne zapalenie okrężnicy dotyczy wyłącznie dzieci, a zator SMA osób dorosłych",
        "W niedokrwiennym zapaleniu okrężnicy kwasica mleczanowa wynosi zawsze powyżej 10 mmol/l",
        "Oba stany mają identyczny przebieg i leczy się je wyłącznie doustnymi probiotykami"
      ],
      correct: 0,
      expl: "W ostrym zatorze SMA proces dotyczy jelita cienkiego: ból jest rozdzierający i nieproporcjonalny do braku zmian palpacyjnych na początku, krew w stolcu pojawia się bardzo późno, a chory szybko wpada we wstrząs z wysoką kwasicą. W niedokrwiennym zapaleniu okrężnicy ból jest kurczowy w lewym dole, wcześnie występuje hematochezia, brzuch jest miejscowo tkliwy, a większość chorych odpowiada na leczenie zachowawcze."
    },
    {
      question: "Badaniem z wyboru w potwierdzeniu rozpoznania i ocenie rozległości zmian błony śluzowej w podejrzeniu niedokrwiennego zapalenia okrężnicy jest:",
      options: [
        "Wczesna, ostrożna sigmoidoskopia (do 48 h) z minimalną insuflacją CO2",
        "Wlew doodbytniczy z gęstego siarczanu baru pod wysokim ciśnieniem",
        "Głęboka enteroskopia dwubalonowa jelita czczego",
        "Scyntygrafia znakowanymi erytrocytami po 7 dniach",
        "Biopsja aspiracyjna szpiku kostnego"
      ],
      correct: 0,
      expl: "Ostrożna sigmoidoskopia (wykonana w ciągu pierwszych 48 godzin, z minimalnym nadmuchiwaniem CO2) jest badaniem z wyboru pozwalającym na bezpośrednią ocenę błony śluzowej lewej okrężnicy (bladość, wybroczyny, linijne owrzodzenia wzdłuż taśm). Pełna kolonoskopia nie jest zalecana ze względu na ryzyko jatrogennej perforacji."
    },
    {
      question: "Podstawą leczenia zachowawczego u pacjenta z niegorzelinową (przemijającą) postacią niedokrwiennego zapalenia okrężnicy jest:",
      options: [
        "Płynoterapia dożylna, odstawienie leków hipotensyjnych/diuretyków, odpoczynek jelita (dieta zerowa) oraz antybiotykoterapia o szerokim spektrum",
        "Natychmiastowe podanie leków silnie obkurczających naczynia krwionośne",
        "Podanie dożylne leków trombolitycznych (np. alteplazy)",
        "Zalecenie spożywania dużej ilości surowych warzyw i otrębów pszennych",
        "Wypisanie do domu z zaleceniem zażywania węgla leczniczego"
      ],
      correct: 0,
      expl: "Leczenie zachowawcze opiera się na: intensywnym nawodnieniu i.v. w celu optymalizacji ciśnienia perfuzyjnego (MAP >65 mmHg), odstawieniu leków naczyniozwężających i obniżających ciśnienie, czasowej diecie ścisłej (NPO) oraz antybiotykach chroniących przed sepsą wywołaną translokacją bakteryjną."
    },
    {
      question: "Wskaż objaw będący bezwzględnym wskazaniem do natychmiastowej interwencji operacyjnej (laparotomii) u chorego z niedokrwiennym zapaleniem jelita grubego:",
      options: [
        "Pojawienie się objawów rozlanego zapalenia otrzewnej, perforacji lub wstrząsu septycznego z narastającą kwasicą mleczanową",
        "Oddanie jednego luźnego stolca o zabarwieniu ciemnobrązowym",
        "Spadek częstości tętna ze 100/min do 75/min po nawodnieniu",
        "Ustąpienie nudności po podaniu leków przeciwwymiotnych",
        "Prawidłowy wynik stężenia hemoglobiny w badaniu kontrolnym"
      ],
      correct: 0,
      expl: "Bezwzględnymi wskazaniami do pilnej operacji (zwykle resekcji zmienionego odcinka okrężnicy ze stomią) są: objawy zapalenia otrzewnej (obrona mięśniowa, objaw Blumberga), radiologiczne cechy perforacji (pneumoperitoneum) lub martwicy ściany (pneumatosis intestinalis, gaz we wrotach), a także wstrząs septyczny z narastającą kwasicą mleczanową oporny na resuscytację."
    },
    {
      question: "Objaw 'tarczy strzeleckiej' (target sign / halo sign) widoczny w tomografii komputerowej ściany okrężnicy w niedokrwiennym zapaleniu jelit odpowiada:",
      options: [
        "Wyraźnemu obrzękowi błony podśluzowej ze wzmocnieniem kontrastowym przekrwionej śluzówki i surowicówki",
        "Obecności guza nowotworowego o średnicy 15 cm",
        "Obecności ciała obcego o kształcie tarczy w świetle jelita",
        "Wrodzonemu zarośnięciu odbytnicy",
        "Torbieli bąblowcowej w ścianie jelita grubego"
      ],
      correct: 0,
      expl: "Objaw tarczy strzeleckiej (target sign / halo sign) w TK jest spowodowany intensywnym obrzękiem warstwy podśluzowej (która ma niską gęstość rentgenowską), ujętej pomiędzy intensywnie wzmacniającą się po podaniu kontrastu błoną śluzową a warstwą mięśniowo-surowiczą. Jest to typowy, choć nieswoisty objaw ostrego zapalenia lub niedokrwienia ściany."
    },
    {
      question: "Dlaczego w niedokrwiennym zapaleniu jelita grubego błona śluzowa odbytnicy jest niemal zawsze całkowicie oszczędzona (nie wykazuje cech niedokrwienia)?",
      options: [
        "Odbytnica posiada podwójne, niezwykle bogate unaczynienie tętnicze (z tętnicy krezkowej dolnej oraz z obu tętnic biodrowych wewnętrznych)",
        "Odbytnica nie potrzebuje tlenu do prawidłowego metabolizmu",
        "Odbytnica jest zaopatrywana bezpośrednio przez pień trzewny",
        "Odbytnica posiada własne krążenie płucne",
        "W odbytnicy ciśnienie krwi wynosi stale 200 mmHg"
      ],
      correct: 0,
      expl: "Odbytnica ma wyjątkowo bogate, wielopiętrowe unaczynienie tętnicze: tętnicę odbytniczą górną (z IMA) oraz tętnice odbytnicze środkowe i dolne (odgałęzienia tętnic biodrowych wewnętrznych). Dzięki temu niezwykle bogatemu krążeniu obocznemu odbytnica jest praktycznie odporna na niedokrwienie nieokluzyjne i pozostaje nienaruszona w badaniu endoskopowym."
    },
    {
      question: "Późnym powikłaniem przebytego epizodu ciężkiego niedokrwiennego zapalenia jelita grubego, rozwijającym się po kilku tygodniach lub miesiącach, może być:",
      options: [
        "Pozapalne włókniste zwężenie jelita grubego (ischaemic stricture)",
        "Wypadanie płatka zastawki trójdzielnej",
        "Przewlekłe zapalenie tarczycy Hashimoto",
        "Choroba zwyrodnieniowa stawów kolanowych",
        "Wrodzona niedrożność dróg żółciowych"
      ],
      correct: 0,
      expl: "U części chorych (ok. 10-15%), u których niedokrwienie uszkodziło głębsze warstwy ściany, proces gojenia przez ziarninowanie i włóknienie prowadzi do powstania bliznowatego, pierścieniowatego zwężenia światła okrężnicy (ischaemic stricture), co może po tygodniach manifestować się nawracającymi objawami podniedrożności."
    },
    {
      question: "Który lek stosowany w kardiologii może bezpośrednio predysponować do rozwoju nieokluzyjnego niedokrwienia jelita grubego (NOMI)?",
      options: [
        "Digoksyna oraz silne leki obkurczające naczynia (np. norepinefryna)",
        "Witamina C w tabletkach",
        "Magnez z witaminą B6",
        "Paracetamol w dawce 500 mg",
        "Kwas foliowy"
      ],
      feedback: "",
      correct: 0,
      expl: "Digoksyna wywiera bezpośredni wpływ wazokonstrykcyjny na mięśniówkę gładką naczyń krezkowych, redukując przepływ krwi w mikrokrążeniu trzewnym. W połączeniu z lekami moczopędnymi (hipowolemia) oraz lekami wazopresyjnymi stanowi klasyczny czynnik ryzyka wyzwalający epizod niedokrwiennego zapalenia okrężnicy."
    }
  ],
  flashcards: [
    {
      front: "Co to jest punkt Griffithsa i punkt Sudecka w okrężnicy?",
      back: "Punkty 'działu wodnego' (watershed areas) o skąpym unaczynieniu obocznym:\n- Punkt Griffithsa: zgięcie śledzionowe (styk SMA i IMA),\n- Punkt Sudecka: połączenie odbytniczo-esicze (styk IMA i tt. biodrowych wewn.)."
    },
    {
      front: "Jaka jest klasyczna triada objawów niedokrwiennego zapalenia okrężnicy (IC)?",
      back: "1. Nagły, kurczowy ból w lewym dole biodrowym,\n2. Naglące parcie na stolec,\n3. Krwisty stolec (hematochezia) występujący w ciągu kilku godzin po epizodzie hipotonii/odwodnienia."
    },
    {
      front: "Czym różni się niedokrwienne zapalenie okrężnicy od ostrego zatoru SMA?",
      back: "IC dotyczy lewej okrężnicy: ból kurczowy w lewym boku, wczesna krew w stolcu, w 85% przebieg łagodny.\nZator SMA dotyczy jelita cienkiego: ból rozdzierający nieproporcjonalny do badania brzucha, brak wczesnej krwi, gwałtowna zgorzel i kwasica."
    },
    {
      front: "Dlaczego odbytnica jest zaoszczędzona w niedokrwiennym zapaleniu okrężnicy?",
      back: "Ponieważ posiada podwójne, bogate unaczynienie tętnicze: z tętnicy krezkowej dolnej (t. odbytnicza górna) oraz z tętnic biodrowych wewnętrznych (tt. odbytnicze środkowe i dolne)."
    },
    {
      front: "Jakie badanie endoskopowe jest zalecane w podejrzeniu IC?",
      back: "Wczesna, delikatna sigmoidoskopia (do 48 h) z insuflacją CO2. Wykazuje obrzęk, bladość, wybroczyny i podłużne owrzodzenia. Pełna kolonoskopia jest przeciwwskazana z powodu ryzyka perforacji."
    },
    {
      front: "Jakie jest leczenie z wyboru w postaci niegorzelinowej (85% przypadków)?",
      back: "Leczenie zachowawcze: dożylne nawadnianie krystaloidami (MAP >65 mmHg), odstawienie leków hipotensyjnych/diuretyków, odpoczynek jelita (NPO) oraz antybiotyki szerokospektralne (ceftriakson + metronidazol)."
    }
  ]
};

async function run() {
  console.log("Generating Case 139: Niedokrwienne zapalenie jelita grubego...");
  
  // Mirroring
  case139.steps.forEach(s => {
    s.question = s.title;
    s.explanation = s.feedback ? s.feedback[0] : "";
  });
  
  case139.lekQuestions.forEach(q => {
    q.opts = q.options;
    q.correctIdx = q.correct;
    q.exp = q.expl;
  });
  
  const enc = await encryptStringAes(JSON.stringify(case139, null, 2), MASTER_KEY);
  fs.writeFileSync(path.join('cases', '139_niedokrwienne_zapalenie_jelita_grubego.json'), JSON.stringify(enc, null, 2), 'utf8');
  console.log("[SAVED] Case #139: 139_niedokrwienne_zapalenie_jelita_grubego.json (LEK Qs: " + case139.lekQuestions.length + ", Steps: " + case139.steps.length + ", Flashcards: " + case139.flashcards.length + ")");
}

run();

const fs = require('fs');
const path = require('path');
const { encryptStringAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

const case148 = {
  id: 148,
  dept: "Medycyna ratunkowa",
  title: "Uraz wielonarządowy / Polytrauma (Severe Polytrauma & Hemorrhagic Shock)",
  shortTitle: "32-letni Piotr – Ciężki uraz wielonarządowy po zderzeniu czołowym, niestabilność miednicy i głęboki wstrząs (Polytrauma / ATLS)",
  diagnosisTitle: "Ciężki uraz wielonarządowy (Polytrauma, ISS 34) – wstrząs krwotoczny stopnia IV, niestabilne złamanie miednicy 'otwarta księga', protokół cABCDE, Damage Control Surgery (DCS), MTP 1:1:1",
  vitals: [
    { name: "Częstość akcji serca", val: "135/min", status: "vital-crit" },
    { name: "Ciśnienie tętnicze", val: "75/40 mmHg", status: "vital-crit" },
    { name: "Temperatura ciała", val: "35.1 °C", status: "vital-crit" },
    { name: "Saturacja SpO2", val: "89% (maska z rezerwuarem)", status: "vital-crit" }
  ],
  vitalsObj: {
    hr: 135,
    bp: "75/40",
    spo2: 89,
    rr: 28,
    temp: 35.1,
    gcs: 11
  },
  story: "<p><strong>Pacjent:</strong> 32-letni kierowca samochodu osobowego został przywieziony przez Lotnicze Pogotowie Ratunkowe (LPR) do Centrum Urazowego (SOR) bezpośrednio po zderzeniu czołowym z ciężarówką z dużą prędkością; był zakleszczony w pojeździe przez 45 minut.</p><p><strong>Wywiad chorobowy:</strong> Z wywiadu od ratowników: zderzenie wysokoenergetyczne, deformacja kabiny >50 cm, wystrzelone poduszki powietrzne, pasy bezpieczeństwa zapięte. Na miejscu zdarzenia pacjent był splątany, jęczący, z tachykardią 130/min i ciśnieniem 80/50 mmHg. Wstępnie założono kołnierz ortopedyczny, podano tlen i przetoczono 1000 ml krystaloidów. W wywiadzie zebranym od rodziny przez telefon: dotychczas zdrowy, brak chorób przewlekłych, nie przyjmował leków.</p><p><strong>Badanie przedmiotowe na SOR (Trauma Bay):</strong> Pacjent blady, podsypiający, otwierający oczy na bolesny bodziec, mamroczący niezrozumiałe słowa, lokalizujący ból (GCS 11 pkt – E3V3M5). Drogi oddechowe wolne, symetryczny szmer pęcherzykowy nad oboma polami płucnymi z trzeszczeniami u podstawy płuca prawego (stłuczenie płuca), saturacja SpO2 89% rosnąca do 93% na tlenie 15 l/min. Na klatce piersiowej podbiegnięcie od pasów. Brzuch wzdęty, deskowato napięty, bolesny przy palpacji. W rzucie miednicy: wyraźna niestabilność i patologiczna ruchomość obręczy miednicy przy jednorazowym delikatnym ucisku kolców biodrowych (złamanie typu 'otwarta księga' / open book); krwiak w okolicy krocza i moszny, obecność krwi w ujściu zewnętrznym cewki moczowej (podejrzenie pęknięcia cewki). Kończyny chłodne, nawrót kapilarny >4 sekundy. Tętno na tętnicach obwodowych nitkowate. HR 135/min, BP 75/40 mmHg, temp. głęboka 35,1°C.</p>",
  labs: [
    {
      name: "Morfologia krwi i koagulologia (gazometria cito)",
      items: [
        { name: "Hemoglobina (Hb)", val: "7.2 g/dl", norm: "13.5 - 17.5 g/dl", flag: "CRIT_LOW" },
        { name: "Hematokryt (Hct)", val: "22.4 %", norm: "40.0 - 52.0 %", flag: "CRIT_LOW" },
        { name: "Płytki krwi (PLT)", val: "94 G/l", norm: "150 - 400 G/l", flag: "CRIT_LOW" },
        { name: "Fibrynogen", val: "1.1 g/l", norm: "2.0 - 4.0 g/l", flag: "CRIT_LOW" },
        { name: "INR", val: "1.65", norm: "0.8 - 1.2", flag: "CRIT_HIGH" },
        { name: "APTT", val: "52 s", norm: "26 - 36 s", flag: "CRIT_HIGH" }
      ]
    },
    {
      name: "Gazometria krwi tętniczej (wstrząs krwotoczny)",
      items: [
        { name: "pH", val: "7.18", norm: "7.35 - 7.45", flag: "CRIT_LOW" },
        { name: "pCO2", val: "32 mmHg", norm: "35 - 45 mmHg", flag: "LOW" },
        { name: "pO2", val: "68 mmHg", norm: "80 - 100 mmHg", flag: "LOW" },
        { name: "HCO3-", val: "11.8 mmol/l", norm: "22.0 - 26.0 mmol/l", flag: "CRIT_LOW" },
        { name: "Base Excess (BE)", val: "-14.4 mmol/l", norm: "-2.5 - +2.5 mmol/l", flag: "CRIT_LOW" },
        { name: "Mleczany (Lactate)", val: "6.8 mmol/l", norm: "0.5 - 1.6 mmol/l", flag: "CRIT_HIGH" }
      ]
    },
    {
      name: "Biochemia i grupa krwi",
      items: [
        { name: "Kreatynina", val: "1.55 mg/dl", norm: "0.7 - 1.2 mg/dl", flag: "HIGH" },
        { name: "Potas (K+)", val: "5.1 mmol/l", norm: "3.5 - 5.0 mmol/l", flag: "HIGH" },
        { name: "Wapń zjonizowany (Ca2+)", val: "0.88 mmol/l", norm: "1.15 - 1.30 mmol/l", flag: "CRIT_LOW" },
        { name: "Grupa krwi", val: "0 RhD-ujemna (aktywacja MTP 1:1:1 na cito)", norm: "-", flag: "NORMAL" }
      ]
    }
  ],
  steps: [
    {
      title: "Krok 1: Wstępna ocena w protokole ATLS – Schemat cABCDE",
      text: "Lider zespołu urazowego (Trauma Team) przejmuje pacjenta. W jakiej kolejności priorytetów należy prowadzić resuscytację i badanie wstępne (Primary Survey) w najnowszej wersji protokołu ATLS?",
      options: [
        "cABCDE: c – catastrophic hemorrhage (zatrzymanie masywnych krwotoków zewnętrznych), A – airway (drogi oddechowe ze stabilizacją kręgosłupa szyjnego), B – breathing (oddychanie i wentylacja), C – circulation (krążenie i wstrząs), D – disability (stan neurologiczny GCS/źrenice), E – exposure/environment (rozebranie i ochrona przed hipotermią)",
        "ABCDE bez uwzględniania krwawień zewnętrznych",
        "Rozpoczęcie od natychmiastowego zespolenia złamań kończyn w znieczuleniu miejscowym",
        "Kolejność alfabetyczna od badania uszu i gardła"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Nowoczesny protokół ATLS (Advanced Trauma Life Support) przyjmuje schemat cABCDE:</strong><br>1. <strong>'c' (Catastrophic external hemorrhage):</strong> natychmiastowe zaopatrzenie masywnych krwotoków zagrażających wykrwawieniem w kilkadziesiąt sekund (stazy taktyczne, opatrunki hemostatyczne).<br>2. <strong>'A' (Airway & C-spine):</strong> ocena drożności dróg oddechowych z jednoczesną manualną stabilizacją osiową kręgosłupa szyjnego (kołnierz sztywny).<br>3. <strong>'B' (Breathing):</strong> wykluczenie bezpośrednich stanów zagrożenia życia (odma prężna, wiotka klatka piersiowa, masywny krwiak opłucnej).<br>4. <strong>'C' (Circulation & Bleeding):</strong> rozpoznanie wstrząsu, ocena 4 głównych ukrytych jam krwawienia ('krew na podłodze i 4 jamy': klatka piersiowa, jama otrzewnej, miednica, kości długie), stabilizacja miednicy pasem, dostęp dożylny.<br>5. <strong>'D' (Disability):</strong> skala GCS i reakcja źrenic na światło.<br>6. <strong>'E' (Exposure & Hypothermia):</strong> pełna ekspozycja ciała z natychmiastowym ogrzewaniem!",
        "❌ BŁĄD! <strong>Ignorowanie krwotoku zewnętrznego 'c' doprowadzi do wykrwawienia zanim zabezpieczy się drogi oddechowe!</strong>",
        "❌ BŁĄD! <strong>Zaopatrywanie złamań obwodowych to etap secondary survey po opanowaniu zagrożenia życia.</strong>",
        "❌ BŁĄD! <strong>To schemat ratowniczy o ścisłej hierarchii według zagrożenia zgonem.</strong>"
      ]
    },
    {
      title: "Krok 2: Zaopatrzenie niestabilnego złamania miednicy – Pas miedniczny (Pelvic Binder)",
      text: "W badaniu fizykalnym stwierdzono niestabilność miednicy typu 'otwarta księga' (rozejście spojenia łonowego). Jakie jest prawidłowe, natychmiastowe postępowanie na sali reanimacyjnej?",
      options: [
        "Natychmiastowe założenie nieelastycznego pasa miednicznego (Pelvic Binder) na wysokości krętarzy większych kości udowych (trochanters) w celu zamknięcia objętości miednicy; bezwzględny zakaz powtórnego 'bujania' i testowania stabilności miednicy!",
        "Założenie pasa miednicznego na wysokości talerzy biodrowych i pępka",
        "Wielokrotne mocne ściskanie i rozpychanie miednicy co 5 minut przez każdego członka zespołu",
        "Podanie leków moczopędnych celem zmniejszenia obrzęku miednicy"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Złamanie miednicy typu 'open book' powoduje potężny wzrost objętości prawdziwej miednicy mniejszej, w której może zmieścić się cała objętość krwi krążącej (masywne krwawienie z przedkrzyżowego splotu żylnego i gałęzi tętnicy biodrowej wewnętrznej)!</strong><br>1. <strong>Wysokość założenia pasa:</strong> pas miedniczny (commercial pelvic binder lub prześcieradło) MUSI zostać zapięty <strong>na wysokości krętarzy większych kości udowych (greater trochanters) i spojenia łonowego</strong>! Założenie go wyżej (na talerze biodrowe) jest kardynalnym błędem i może pogłębić złamanie.<br>2. <strong>Zakaz wielokrotnego badania:</strong> badanie stabilności miednicy wykonuje się <strong>tylko RAZ</strong> – powtarzalne uciskanie niszczy świeżo uformowane skrzepy i nasila śmiertelny krwotok zaotrzewnowy!",
        "❌ BŁĄD! <strong>Pas miedniczny na wysokości pępka nie stabilizuje kości miednicy i może uszkodzić narządy brzucha.</strong>",
        "❌ BŁĄD! <strong>Powtarzanie badania stabilności miednicy niszczy skrzepy i zabija pacjenta!</strong>",
        "❌ BŁĄD! <strong>Leki moczopędne we wstrząsie krwotocznym są zabójcze.</strong>"
      ]
    },
    {
      title: "Krok 3: 'Śmiertelna triada urazowa' (Lethal Triad) i hipotensja przyzwalająca",
      text: "Pacjent ma temperaturę 35,1°C, pH 7,18, mleczany 6,8 mmol/l oraz INR 1,65. Jakie zjawisko patofizjologiczne reprezentują te parametry i jaka jest zasada płynoterapii u pacjenta bez ciężkiego urazu mózgu?",
      options: [
        "Śmiertelna triada urazowa (Lethal Triad: hipotermia, kwasica, koagulopatia); celem resuscytacji jest hipotensja przyzwalająca (permissive hypotension cel SBP 80-90 mmHg / MAP 50-65 mmHg) z ograniczeniem krystaloidów i aktywnym ogrzewaniem chorego do czasu chirurgicznego opanowania krwotoku",
        "Jest to sepsa oddechowa wymagająca podania 5 litrów zimnej soli fizjologicznej",
        "Należy agresywnie podnieść ciśnienie skurczowe do >160 mmHg za pomocą wlewu noradrenaliny",
        "Zaburzenia te są bez znaczenia klinicznego"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>'Śmiertelna triada urazowa' (Lethal Triad of Trauma):</strong><br>1. <strong>Hipotermia (<35°C):</strong> paraliżuje kaskadę enzymatyczną krzepnięcia krwi (aktywność spada o 10% na każdy 1°C spadku temp.).<br>2. <strong>Kwasica (pH <7,20, wysokie mleczany):</strong> hamuje czynność skurczową serca i uniemożliwia prawidłowe formowanie fibryny.<br>3. <strong>Koagulopatia (zużycie i rozcieńczenie czynników):</strong> prowadzi do niekontrolowanego krwawienia kapilarnego.<br><strong>Zasada Permissive Hypotension:</strong> przetaczanie litrów krystaloidów przed hemostazą wypłukuje skrzepy ('pop the clot') i nasila rozcieńczeniową koagulopatię. Utrzymuje się <strong>SBP 80-90 mmHg (lub wyczuwalne tętno na t. promieniowej)</strong> do czasu chirurgicznego zaopatrzenia naczyń (<em>Uwaga:</em> w ciężkim urazie czaszkowo-mózgowym TBI cel SBP wynosi >100-110 mmHg celem utrzymania CPP).",
        "❌ BŁĄD! <strong>Przetoczenie zimnych krystaloidów pogłębi hipotermię, rozcieńczy krew i doprowadzi do zgonu!</strong>",
        "❌ BŁĄD! <strong>Wysokie ciśnienie przed hemostazą zerwie skrzepy w naczyniach miednicy i wątroby.</strong>",
        "❌ BŁĄD! <strong>Lethal Triad jest główną przyczyną zgonów pourazowych w pierwszych godzinach.</strong>"
      ]
    },
    {
      title: "Krok 4: Protokół masywnej transfuzji (MTP) i kwas traneksamowy (TXA)",
      text: "U pacjenta aktywowano protokół masywnej transfuzji (Massive Transfusion Protocol – MTP). Jaki jest prawidłowy stosunek przetaczania składników krwi oraz jakie są wytyczne dotyczące podania kwasu traneksamowego (badanie CRASH-2)?",
      options: [
        "Zrównoważona transfuzja KKCz : FFP : KKP w stosunku 1:1:1 z podgrzewacza krwi, natychmiastowe podanie kwasu traneksamowego (TXA) 1 g i.v. w ciągu 10 min (podane w ciągu pierwszych 3 h od urazu), a następnie 1 g we wlewie przez 8 h oraz suplementacja wapnia (CaCl2)",
        "Przetoczenie 10 jednostek KKCz bez podawania osocza i płytek",
        "Podanie kwasu traneksamowego dopiero po 6 godzinach od urazu",
        "Podawanie albumin ludzkich w bolusie 2000 ml"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Resuscytacja hemostatyczna (Damage Control Resuscitation – DCR) w ciężkim krwotoku opiera się na 4 filarach:</strong><br>1. <strong>Proporcja 1:1:1:</strong> przetaczanie Koncentratu Krwinek Czerwonych (KKCz), Świeżo Mrożonego Osocza (FFP) i Koncentratu Krwinek Płytkowych (KKP) w zrównoważonym stosunku 1:1:1 zapobiega koagulopatii z rozcieńczenia.<br>2. <strong>Kwas traneksamowy (TXA):</strong> <span class='dose-pill'>TXA 1 g i.v. bolus</span> w ciągu pierwszych 3 godzin od urazu (wg badania CRASH-2 redukuje śmiertelność o 15-20%; podany >3 h zwiększa śmiertelność!), następnie wlew <span class='dose-pill'>1 g i.v. przez 8 h</span>.<br>3. <strong>Suplementacja wapnia:</strong> <span class='dose-pill'>Chlorek wapnia (CaCl2) 1-2 g i.v.</span> (cytrynian w preparatach krwi chelatuje Ca2+, a hipokalcemia wywołuje atonię serca i blokuje krzepnięcie).<br>4. <strong>Substytucja fibrynogenu:</strong> <span class='dose-pill'>Koncentrat fibrynogenu 2-4 g i.v.</span> (lub krioprecypitat), aby utrzymać stężenie >1,5-2,0 g/l.",
        "❌ BŁĄD! <strong>Przetaczanie samego KKCz bez osocza i płytek to najczęstsza jatrogenna przyczyna śmiertelnej koagulopatii!</strong>",
        "❌ BŁĄD! <strong>Podanie TXA po upływie 3 godzin od urazu jest szkodliwe i zwiększa ryzyko zgonu!</strong>",
        "❌ BŁĄD! <strong>Albuminy nie mają zastosowania w ostrej resuscytacji krwotocznej ATLS.</strong>"
      ]
    },
    {
      title: "Krok 5: Przyłóżkowe badanie ultrasonograficzne – Protokół E-FAST",
      text: "Podczas trwającej resuscytacji wykonuje się badanie E-FAST (Extended Focused Assessment with Sonography for Trauma). Wykazuje ono obfity płyn w przestrzeni Morisona, przestrzeni śledzionowo-nerkowej oraz cechy płynu w miednicy mniejszej; brak odmy i tamponady. Pacjent pozostaje niestabilny (BP 75/40 mmHg mimo przetoczenia krwi). Jaka jest dalsza decyzja operacyjna?",
      options: [
        "Natychmiastowy transport na blok operacyjny do ratunkowej laparotomii zwiadowczej w koncepcji Damage Control Surgery (DCS); bezwzględny zakaz transportu niestabilnego chorego do pracowni tomografii komputerowej (TK)!",
        "Transport pacjenta do pracowni TK celem wykonania badania całego ciała (pan-scan)",
        "Odesłanie chorego na oddział ortopedii celem planowego zaopatrzenia miednicy za 3 dni",
        "Podanie leków nasennych i oczekiwanie na ustabilizowanie parametrów na sali SOR"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Kardynalna zasada traumatologii ratunkowej: 'Niestabilny pacjent z dodatnim FAST NIE JEDZIE do pracowni tomografii komputerowej!' (tzw. The CT scanner is the tunnel of death!).</strong> Tomografia komputerowa (angio-TK) jest zarezerwowana wyłącznie dla pacjentów stabilnych hemodynamicznie. Chory we wstrząsie z potwierdzonym krwawieniem dootrzewnowym (hemoperitoneum w FAST) wymaga <strong>natychmiastowej ratunkowej laparotomii na bloku operacyjnym (Damage Control Surgery)</strong>. Minuty spędzone w skanerze TK u niestabilnego pacjenta kończą się zatrzymaniem krążenia na stole tomografu.",
        "❌ BŁĄD! <strong>Transport niestabilnego chorego do TK to częsty błąd jatrogenny prowadzący do zgonu!</strong>",
        "❌ BŁĄD! <strong>Pacjent umrze z wykrwawienia w ciągu kilkunastu minut bez hemostazy chirurgicznej.</strong>",
        "❌ BŁĄD! <strong>Brak interwencji w krwotoku to 100% śmiertelności.</strong>"
      ]
    },
    {
      title: "Krok 6: Strategia operacyjna – Damage Control Surgery (DCS)",
      text: "Chirurg na bloku operacyjnym otwiera jamę brzuszną i podejmuje decyzję o taktyce operacyjnej. Czym różni się chirurgia kontroli uszkodzeń (Damage Control Surgery – DCS) od ostatecznego jednoczasowego zaopatrzenia (Early Total Care – ETC)?",
      options: [
        "DCS to skrócona operacja ratunkowa ograniczona wyłącznie do opanowania krwotoku (packing wątroby/miednicy, opaski, szwy hemostatyczne) i zapobiegania skażeniu (zaopatrzenie perforacji jelit na głuche bez zespoleń) z pozostawieniem 'brzucha otwartego' (laparostomia VAC); ostateczne rekonstrukcje odracza się na 24-48 h do czasu wyrównania letalnej triady na OIT",
        "DCS polega na wykonaniu wszystkich operacji rekonstrukcyjnych narządów i kości w trakcie jednego 10-godzinnego zabiegu",
        "DCS to zabieg wykonywany wyłącznie laparoskopowo przez 1 port",
        "DCS oznacza leczenie wyłącznie lekami bez dotykania tkanek chirurgicznie"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Damage Control Surgery (DCS) jest jedną z najważniejszych koncepcji nowoczesnej chirurgii urazowej:</strong><br>U pacjenta z wyczerpaną rezerwą fizjologiczną (hipotermia, kwasica, koagulopatia) wielogodzinna operacja definitywna (Early Total Care) prowadzi do zgonu na stole operacyjnym. DCS składa się z 3 etapów:<br>1. <strong>Etap I (Blok operacyjny, <60-90 min):</strong> natychmiastowe zatrzymanie krwotoku (packing jamami brzusznymi chustami, hemostaza naczyniowa) + zatrzymanie skażenia treścią jelitową (podwiązanie/zaszycie pętli jelita bez czasochłonnych zespoleń) + tymczasowe zamknięcie powłok metodą podciśnieniową (laparostomia VAC).<br>2. <strong>Etap II (OIT, 24-48 h):</strong> intensywna resuscytacja, ogrzanie pacjenta (>36°C), wyrównanie kwasicy i koagulopatii.<br>3. <strong>Etap III (Reoperacja):</strong> usunięcie chust (depacking), definitywna rekonstrukcja przewodu pokarmowego i zamknięcie powłok brzusznych.",
        "❌ BŁĄD! <strong>Wielogodzinna operacja jednoczasowa (ETC) u chorego z letalną triadą to wyrok śmierci.</strong>",
        "❌ BŁĄD! <strong>Wstrząs krwotoczny w politraumie wymaga natychmiastowej szerokiej laparotomii pośrodkowej.</strong>",
        "❌ BŁĄD! <strong>DCS to inwazyjna strategia chirurgiczna ratująca życie.</strong>"
      ]
    },
    {
      title: "Krok 7: Zaopatrzenie krwotoku miednicznego – Preperitoneal Pelvic Packing i Embolizacja (TAE)",
      text: "Po otwarciu brzucha stwierdzono, że źródłem masywnego krwotoku jest pęknięty zaotrzewnowy krwiak miednicy ze złamaniem kości. Jakie techniki hemostatyczne stosuje się w opanowaniu krwotoku miednicznego w politraumie?",
      options: [
        "Przedotrzewnowe upakowanie miednicy chustami chirurgicznymi (Preperitoneal Pelvic Packing – PPP) z dostępu podbrzusznego oraz przezcewnikowa embolizacja tętnicza (TAE) gałęzi tętnicy biodrowej wewnętrznej w pracowni angiografii",
        "Całkowite usunięcie kości miednicy i obu kończyn dolnych",
        "Wyłącznie założenie opatrunku z gazy na skórę krocza",
        "Wprowadzenie rurki intubacyjnej do odbytnicy"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Krwotok w złamaniach miednicy pochodzi w 85% ze splotów żylnych przedkrzyżowych i odłamów kostnych, a w 15% z gałęzi tętnicy biodrowej wewnętrznej (np. t. pośladkowa górna, t. sromowa):</strong><br>1. <strong>Stabilizacja mechaniczna:</strong> pas miedniczny (Pelvic Binder) lub zewnętrzny stabilizator miednicy (C-clamp / External Fixator).<br>2. <strong>Preperitoneal Pelvic Packing (PPP):</strong> z małego nacięcia pośrodkowego powyżej spojenia łonowego bez otwierania jamy otrzewnej wprowadza się ciasno 3-6 dużych chust chirurgicznych w przestrzeń załonową i okołopęcherzową (tamponada żylna).<br>3. <strong>Angioembolizacja (TAE):</strong> w przypadku podejrzenia krwawienia tętniczego chory po stabilizacji miednicy trafia do pracowni naczyniowej, gdzie radiolog zabiegowy zamyka krwawiące gałęzie tętnicze za pomocą sprężynek (coils) lub gąbki żelatynowej (Gelfoam).",
        "❌ BŁĄD! <strong>Medyczny absurd.</strong>",
        "❌ BŁĄD! <strong>Krwawienie toczy się głęboko w przestrzeni zaotrzewnowej miednicy mniejszej.</strong>",
        "❌ BŁĄD! <strong>Rurka doodbytnicza nie ma wpływu na krwiak miednicy.</strong>"
      ]
    },
    {
      title: "Krok 8: Profilaktyka powikłań pooperacyjnych na OIT – Zespół ciasnoty i ŻChZZ",
      text: "Po operacji DCS pacjent trafia na OIT z otwartym brzuchem zabezpieczonym opatrunkiem VAC. Na jakie dwa kluczowe powikłania zagrażające życiu w pierwszych dobach na OIT należy zwrócić szczególną uwagę?",
      options: [
        "Nawracający zespół ciasnoty wewnątrzbrzusznej (ACS – monitorowanie ciśnienia IAP w pęcherzu moczowym) oraz żylną chorobę zakrzepowo-zatorową (konieczność mechanicznej kompresji pneumatycznej IPC, a po opanowaniu hemostazy wdrożenia LMWH)",
        "Rozwój próchnicy zębów i łupieżu",
        "Przerost prostaty wymagający natychmiastowej resekcji TURP",
        "Zapalenie ścięgna podeszwowego stóp"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Opieka na OIT w politraumie skupia się na zapobieganiu niewydolności wielonarządowej (MODS):</strong><br>1. <strong>Zespół ciasnoty wewnątrzbrzusznej (ACS):</strong> masywna płynoterapia, packing i obrzęk jelit stwarzają skrajne ryzyko ACS. Pozostawienie 'brzucha otwartego' (laparostomia VAC) odbarcza jamę brzuszną, jednak wymaga <strong>stałego monitorowania ciśnienia śródbrzusznego (IAP) przez cewnik Foleya (cel IAP <15-20 mmHg)</strong>.<br>2. <strong>Żylna choroba zakrzepowo-zatorowa (ŻChZZ):</strong> politrauma, złamania miednicy i unieruchomienie niosą >50% ryzyko zakrzepicy żył głębokich i zatoru płucnego! Natychmiast stosuje się <strong>mechaniczną kompresję pneumatyczną (IPC)</strong> na niepołamane kończyny, a <strong>w ciągu 24-48 godzin po zatrzymaniu krwawienia włącza się profilaktyczną dawkę LMWH</strong>.",
        "❌ BŁĄD! <strong>To nie są powikłania stanów krytycznych.</strong>",
        "❌ BŁĄD! <strong>Planowe procedury urologiczne są przeciwwskazane w ostrym wstrząsie.</strong>",
        "❌ BŁĄD! <strong>Głównym zagrożeniem po urazie jest zgon z powodu niewydolności wielonarządowej i zatorowości.</strong>"
      ]
    }
  ],
  pathoNodes: [
    {
      badge: "Wstrząs krwotoczny",
      title: "Hipoperfuzja tkankowa i dług tlenowy",
      short: "Masywna utrata krwi z naczyń miednicy i narządów miąższowych",
      detail: "Utrata >40% wolemii (wstrząs stopnia IV) załamuje powrót żylny i rzut serca. Niedotlenienie komórek wymusza metabolizm beztlenowy, generując potężną kwasicę mleczanową (mleczany >6 mmol/l).",
      target: "Łożysko naczyniowe i mikrokrążenie narządowe",
      drugTarget: "<span class='dose-pill'>MTP 1:1:1 (KKCz:FFP:KKP)</span> zbilansowana resuscytacja krążeniowa"
    },
    {
      badge: "Lethal Triad",
      title: "Hipotermia, kwasica i koagulopatia urazowa (TIC)",
      short: "Samonapędzający się krąg śmierci w ciężkim urazie",
      detail: "Spadek temperatury <35°C blokuje kompleksy enzymatyczne krzepnięcia. Kwasica niszczy fibrynogen, a masywne zużycie płytek i fibrynoliza wywołują ostrą koagulopatię urazową (Trauma-Induced Coagulopathy).",
      target: "Układ enzymatyczny hemostazy i śródbłonek",
      drugTarget: "<span class='dose-pill'>TXA 1 g i.v. bolus</span> + <span class='dose-pill'>Aktywne ogrzewanie >36°C</span> + <span class='dose-pill'>CaCl2 1 g i.v.</span>"
    },
    {
      badge: "Niestabilna miednica",
      title: "Zwiększenie objętości i krwotok zaotrzewnowy",
      short: "Rozerwanie splotów żylnych przedkrzyżowych i gałęzi biodrowych",
      detail: "Złamanie typu 'otwarta księga' znosi efekt tamponady kostnej. Miednica mieści litry krwi z rozerwanych splotów żylnych i tętnic pośladkowych, doprowadzając do zgonu bez mechanicznego zamknięcia.",
      target: "Przestrzeń zaotrzewnowa miednicy mniejszej",
      drugTarget: "<span class='dose-pill'>Pas miedniczny (Pelvic Binder)</span> na krętarze większe"
    },
    {
      badge: "Damage Control",
      title: "Przerwanie operacji przed załamaniem fizjologicznym",
      short: "Szybka hemostaza i packing zamiast operacji definitywnej",
      detail: "Wyczerpanie rezerw biologicznych uniemożliwia wielogodzinną operację. Packing chustami chirurgicznymi i czasowe zamknięcie powłok (laparostomia VAC) pozwalają na resuscytację na OIT.",
      target: "Jama otrzewnej i loże narządowe",
      drugTarget: "<span class='dose-pill'>Laparostomia podciśnieniowa VAC</span> odbarczenie ciśnienia IAP"
    }
  ],
  diffTable: {
    title: "⚔️ Tabela Różnicowa: Wstrząs krwotoczny pourazowy vs Kardiogenny (tamponada) vs Neurogenny vs Odma prężna",
    headers: ["Cecha kliniczna", "Wstrząs krwotoczny (Hypovolemic)", "Tamponada serca (Obstructive)", "Odma prężna (Tension pneumothorax)", "Wstrząs neurogenny (Spinal cord)", "Wstrząs septyczny (Distributive)"],
    rows: [
      ["Wypełnienie żył szyjnych (JVP)", "Zapadnięte, niewidoczne żyły szyjne (hipowolemia ogólna)", "Masywnie poszerzone, wypełnione żyły szyjne (objaw Kussmaula)", "Poszerzone żyły szyjne; przesunięcie tchawicy na stronę przeciwną", "Płaskie lub prawidłowe; brak reakcji odruchowej", "Początkowo prawidłowe; w fazie późnej zapadnięte"],
      ["Osłuchiwanie klatki piersiowej", "Szmer pęcherzykowy symetryczny (chyba że współistnieje stłuczenie płuca)", "Tony serca ciche, głuche, odległe (triada Becka); szmer pęcherzykowy symetryczny", "Całkowity brak szmeru pęcherzykowego po stronie odmy, wypuk bębenkowy!", "Prawidłowy, symetryczny szmer pęcherzykowy", "Szmer pęcherzykowy symetryczny; możliwe rzężenia"],
      ["Temperatura i ucieplenie skóry", "Skóra blada, woskowa, chłodna, lepki zimny pot; nawrót kapilarny >4 s", "Skóra chłodna, blada, zlana potem, sinica obwodowa", "Skóra chłodna, sinica centralna i obwodowa, poty", "Skóra ciepła, różowa, sucha poniżej poziomu uszkodzenia rdzenia! (brak potu)", "Skóra gorąca, różowa w fazie wczesnej (warm shock); chłodna w późnej"],
      ["Częstość akcji serca (HR)", "Ciężka tachykardia (>120-140/min) – odpowiedź kompensacyjna", "Tachykardia z paradoksalnym tętnem (pulsus paradoxus >10 mmHg)", "Skrajna tachykardia z postępującą bradykardią przed zatrzymaniem", "Paradoksalna bradykardia (brak współczulnego unerwienia serca Th1-Th4)!", "Tachykardia o zmiennym nasileniu"],
      ["Obraz w badaniu FAST", "Wolny płyn w zachyłku Morisona, Kollera i miednicy; puste serce", "Płyn w worku osierdziowym, zapadanie się prawego przedsionka/komory", "Brak 'objawu ślizgania płuca' (lung sliding), obecny 'punkt płucny' (lung point)", "Brak wolnego płynu; prawidłowa kurczliwość jam serca", "Brak płynu wolnego w jamach surowiczych"],
      ["Postępowanie pierwszego rzutu", "Hemostaza chirurgiczna/DCS + protokół MTP 1:1:1 + TXA + pas miedniczny", "Pilna perikardiocenteza odbarczająca lub okienko osierdziowe / torakotomia", "Natychmiastowe odbarczenie igłowe (kankula 14G w II międzyżebrzu) -> drenaż", "Płynoterapia ostrożna + wazopresory (noradrenalina) + atropina w bradykardii", "Wczesna antybiotykoterapia o szerokim spektrum + krystaloidy + noradrenalina"]
    ]
  },
  dutySummary: {
    overview: "Uraz wielonarządowy (Polytrauma) jest definiowany jako jednoczesne uszkodzenie co najmniej dwóch jam ciała lub układów narządowych, z których przynajmniej jedno stanowi bezpośrednie zagrożenie życia (ISS > 15-16 pkt). Wczesna śmiertelność wynika z wykrwawienia i niekontrolowanego wstrząsu. Standardem postępowania ratunkowego jest protokół cABCDE (ATLS), hemostatyczna resuscytacja (DCR) oraz chirurgia kontroli uszkodzeń (Damage Control Surgery).",
    diagnostics: "1. Ocena w protokole cABCDE: zatrzymanie krwotoków zewnętrznych (stazy taktyczne), unieruchomienie kręgosłupa szyjnego, ocena drożności dróg i wentylacji.<br>2. Szybka diagnostyka przyłóżkowa: USG E-FAST (wykluczenie odmy, tamponady i płynu w jamie otrzewnej) w ciągu 2 minut na sali reanimacyjnej.<br>3. Przeglądowe zdjęcia RTG przyłóżkowe: RTG klatki piersiowej w projekcji AP oraz RTG miednicy.<br>4. Pilne badania laboratoryjne: gazometria tętnicza (pH, mleczany, Base Excess), hemoglobina, hematokryt, płytki krwi, fibrynogen, INR/APTT, grupa krwi i próba krzyżowa.<br>5. Złota zasada: pacjent niestabilny hemodynamicznie NIE JEDZIE do TK – natychmiastowy transport na blok operacyjny do laparotomii ratunkowej!",
    drugsAndDoses: "1. Kwas traneksamowy: <span class='dose-pill'>TXA 1 g i.v. bolus w ciągu 10 min</span> (w ciągu 3 h od urazu), a następnie <span class='dose-pill'>1 g i.v. wlew przez 8 h</span>.<br>2. Protokół MTP 1:1:1: zrównoważone przetaczanie <span class='dose-pill'>KKCz + FFP + KKP</span> w stosunku 1:1:1 przez szybki podgrzewacz płynów (Level 1).<br>3. Suplementacja jonów wapnia w masywnej transfuzji:<br>   - <span class='dose-pill'>Chlorek wapnia (CaCl2) 1-2 g i.v.</span> (cel Ca2+ zjonizowany >1,1-1,2 mmol/l).<br>4. Koncentrat fibrynogenu: <span class='dose-pill'>Fibrynogen 2-4 g i.v.</span> przy stężeniu <1,5-2,0 g/l.<br>5. Płynoterapia krystaloidowa: restrykcyjna (<span class='dose-pill'>Plasmalyte <1000-1500 ml</span>) z utrzymaniem hipotensji przyzwalającej SBP 80-90 mmHg.",
    procedures: "1. Założenie nieelastycznego pasa miednicznego (Pelvic Binder) na wysokości krętarzy większych kości udowych w złamaniach miednicy (zamknięcie objętości miednicy).<br>2. Zabezpieczenie dróg oddechowych: intubacja dotchawicza w sekwencji RSI z ręczną stabilizacją osiową szyi (MILS).<br>3. Dostęp naczyniowy o dużym przepływie: 2 kaniule obwodowe 14-16G lub wkłucie do naczynia centralnego z introduktorem naczyniowym (np. cewnik dializacyjny).<br>4. Laparotomia ratunkowa w koncepcji Damage Control Surgery (DCS): packing wątroby i loży narządowych, opanowanie skażenia jelitowego, laparostomia podciśnieniowa (VAC).<br>5. Preperitoneal Pelvic Packing (PPP) i przezcewnikowa embolizacja tętnicza (TAE) w masywnych krwotokach miednicznych.",
    monitoring: "1. Ciągły pomiar inwazyjnego ciśnienia tętniczego (linia tętnicza IBP w tętnicy promieniowej lub udowej).<br>2. Pomiar temperatury głębokiej ciała (sonda przełykowa lub pęcherzowa) – bezwzględne dążenie do normotermii >36,0°C.<br>3. Seryjna kontrola gazometrii tętniczej (mleczany, BE) co 1-2 godziny celem oceny spłaty długu tlenowego.<br>4. Ciągłe monitorowanie ciśnienia wewnątrzbrzusznego (IAP) przez cewnik w pęcherzu moczowym w celu zapobiegania zespołowi ciasnoty (ACS)."
  },
  lekQuestions: [
    {
      question: "Zgodnie z zasadami protokołu ATLS (Advanced Trauma Life Support), badanie wstępne (Primary Survey) u pacjenta po ciężkim urazie wielonarządowym rozpoczyna się od litery 'c', która oznacza:",
      options: [
        "Natychmiastowe zaopatrzenie katastrofalnych, masywnych krwotoków zewnętrznych zagrażających wykrwawieniem w kilkadziesiąt sekund",
        "Podanie leków przeciwbólowych i uspokajających",
        "Wykonanie przeglądowego zdjęcia rentgenowskiego czaszki",
        "Pobranie wymazu z gardła w kierunku koronawirusa",
        "Wprowadzenie zgłębnika żołądkowego celem odbarczenia"
      ],
      correct: 0,
      expl: "Współczesny protokół ATLS/PHTLS stosuje algorytm 'cABCDE'. Małe 'c' na początku oznacza natychmiastowe zaopatrzenie katastrofalnych krwotoków zewnętrznych (Catastrophic external bleeding – np. amputacja urazowa, rozerwanie tętnicy udowej) za pomocą opasek uciskowych (staz taktycznych) lub hemostatycznego upakowania rany, ponieważ masywny krwotok tętniczy prowadzi do zgonu chorego w ciągu 1-2 minut, zanim zdoła się udrożnić drogi oddechowe."
    },
    {
      question: "Gdzie należy prawidłowo założyć pas miedniczny (Pelvic Binder) u pacjenta z podejrzeniem niestabilnego złamania miednicy typu 'otwarta księga'?",
      options: [
        "Na wysokości krętarzy większych kości udowych (trochanters) i spojenia łonowego",
        "W talii na wysokości pępka i grzebieni talerzy biodrowych",
        "Wokół klatki piersiowej na wysokości wyrostka mieczykowatego",
        "Poniżej kolan wokół podudzi",
        "Wokół szyi i karku"
      ],
      correct: 0,
      expl: "Prawidłowym miejscem aplikacji pasa miednicznego (pelvic binder) jest poziom krętarzy większych kości udowych (greater trochanters). Działa on jak dźwignia zamykająca rozejście kości łonowych i redukująca objętość miednicy mniejszej. Założenie pasa zbyt wysoko (na talerze biodrowe lub pępek) nie stabilizuje miednicy, może pogłębić przemieszczenie odłamów i wywołać uszkodzenia narządów jamy brzusznej."
    },
    {
      question: "Jakie zaburzenia wchodzą w skład tzw. 'śmiertelnej triady urazowej' (Lethal Triad of Trauma), będącej główną przyczyną zgonów we wczesnej fazie ciężkiego urazu?",
      options: [
        "Hipotermia, kwasica metaboliczna oraz koagulopatia urazowa",
        "Hipertermia, zasadowica oddechowa i trombocytoza",
        "Niewydolność nerek, żółtaczka i zapalenie trzustki",
        "Drgawki, wytrzeszcz oczu i śpiączka cukrzycowa",
        "Obrzęk płuc, tamponada serca i odma prężna"
      ],
      correct: 0,
      expl: "Śmiertelna triada urazowa (Lethal Triad) to wzajemnie napędzający się zespół trzech zaburzeń: Hipotermia (spadek temp. ciała <35°C blokujący enzymy krzepnięcia), Kwasica (pH <7,20 wynikające z hipoperfuzji tkankowej i produkcji kwasu mlekowego) oraz Koagulopatia (Trauma-Induced Coagulopathy wywołana zużyciem czynników krzepnięcia, rozcieńczeniem i fibrynolizą)."
    },
    {
      question: "Zgodnie z wynikami przełomowego badania klinicznego CRASH-2, kwas traneksamowy (TXA) podany we wstrząsie krwotocznym pourazowym istotnie zmniejsza śmiertelność, pod warunkiem że zostanie podany:",
      options: [
        "W ciągu pierwszych 3 godzin od momentu urazu (dawka 1 g i.v. w ciągu 10 min, następnie 1 g we wlewie przez 8 h)",
        "Dopiero po 24 godzinach od urazu po wykonaniu pełnej diagnostyki",
        "W dawce 50 g doustnie przed przyjazdem do szpitala",
        "Wyłącznie pacjentom powyżej 80. roku życia",
        "Kwas traneksamowy nie ma udowodnionego wpływu na przeżycie w urazach"
      ],
      correct: 0,
      expl: "Badanie CRASH-2 jednoznacznie udowodniło, że wczesne podanie kwasu traneksamowego (TXA) w dawce 1 g bolus w 10 min + 1 g we wlewie przez 8 godzin w ciągu pierwszych 3 godzin od urazu zmniejsza śmiertelność z powodu wykrwawienia o blisko 20%. Co krytyczne, podanie TXA po upływie 3 godzin od urazu jest szkodliwe i zwiększa ryzyko zgonu!"
    },
    {
      question: "Pacjent po ciężkim urazie komunikacyjnym jest niestabilny hemodynamicznie (BP 70/40 mmHg, HR 135/min), a w przyłóżkowym badaniu USG E-FAST stwierdzono obecność obfitego płynu w jamie otrzewnej. Właściwym postępowaniem jest:",
      options: [
        "Natychmiastowy transport pacjenta na blok operacyjny do ratunkowej laparotomii zwiadowczej (DCS)",
        "Transport pacjenta do pracowni tomografii komputerowej celem wykonania pan-scanu TK",
        "Zlecenie badania RTG jamy brzusznej z kontrastem barytowym",
        "Podanie 4 litrów zimnej soli fizjologicznej i oczekiwanie na SOR",
        "Wykonanie gastroskopii celem poszukiwania wrzodu żołądka"
      ],
      correct: 0,
      expl: "Niestabilny hemodynamicznie pacjent z dodatnim wynikiem badania FAST (potwierdzony krwotok dootrzewnowy) ma bezwzględne wskazanie do natychmiastowej operacji ratunkowej (laparotomii DCS). Transport takiego chorego do tomografii komputerowej (TK) jest kardynalnym błędem sztuki (tomograf w takich sytuacjach bywa nazywany 'tunelem śmierci')."
    },
    {
      question: "Koncepcja Damage Control Surgery (chirurgii kontroli uszkodzeń) u pacjenta w ciężkim wstrząsie urazowym polega na:",
      options: [
        "Szybkim opanowaniu krwotoku i skażenia jelitowego oraz czasowym zamknięciu powłok, z odroczeniem ostatecznych rekonstrukcji narządowych do czasu ustabilizowania stanu chorego na OIT",
        "Wykonaniu wszystkich definitywnych rekonstrukcji narządowych i zespoleń kostnych podczas pierwszej operacji",
        "Stosowaniu wyłącznie nieinwazyjnych metod zachowawczych bez otwierania powłok",
        "Zastosowaniu znieczulenia miejscowego i wypisie chorego do domu",
        "Podwiązaniu aorty piersiowej na stałe"
      ],
      correct: 0,
      expl: "Damage Control Surgery (DCS) to wieloetapowa strategia operacyjna. W I etapie wykonuje się wyłącznie procedury ratujące życie (zatrzymanie krwotoku poprzez packing i podwiązki naczyniowe oraz zaopatrzenie perforacji przewodu pokarmowego szwami lub staplerami bez wykonywania czasochłonnych zespoleń), po czym jamę brzuszną zamyka się tymczasowo (laparostomia podciśnieniowa). Ostateczną rekonstrukcję przeprowadza się po 24-48 h po wyrównaniu hipotermii, kwasicy i koagulopatii na OIT."
    },
    {
      question: "Protokół masywnej transfuzji (MTP) w ciężkim wstrząsie krwotocznym zakłada jednoczesne przetaczanie preparatów krwi w zrównoważonym stosunku:",
      options: [
        "1 jednostka KKCz : 1 jednostka FFP : 1 jednostka KKP (stosunek 1:1:1)",
        "10 jednostek KKCz : 1 jednostka FFP : brak płytek krwi",
        "Wyłącznie krystaloidy i koloidy sztuczne bez krwi",
        "5 jednostek FFP na 1 jednostkę KKCz",
        "Przetaczanie wyłącznie pełnej krwi konserwowanej z 1980 roku"
      ],
      correct: 0,
      expl: "Nowoczesna resuscytacja hemostatyczna (Damage Control Resuscitation) wymaga przetaczania koncentratu krwinek czerwonych (KKCz), świeżo mrożonego osocza (FFP) oraz koncentratu krwinek płytkowych (KKP) w zrównoważonych proporcjach 1:1:1. Zapobiega to rozcieńczeniu płytek krwi i osoczowych czynników krzepnięcia oraz odtwarza skład krwi pełnej."
    },
    {
      question: "Wskaż docelową wartość skurczowego ciśnienia tętniczego (SBP) w ramach tzw. hipotensji przyzwalającej (permissive hypotension) u pacjenta z krwotokiem pourazowym BEZ podejrzenia ciężkiego urazu czaszkowo-mózgowego:",
      options: [
        "80 - 90 mmHg (lub wyczuwalne tętno na tętnicy promieniowej)",
        "130 - 150 mmHg",
        "Powyżej 160 mmHg",
        "Poniżej 40 mmHg",
        "Dokładnie 120/80 mmHg"
      ],
      correct: 0,
      expl: "W krwotoku pourazowym bez towarzyszącego urazu mózgu dąży się do utrzymania skurczowego ciśnienia tętniczego na poziomie 80-90 mmHg (lub średniego MAP ok. 50-65 mmHg). Pozwala to na zachowanie perfuzji narządów krytycznych bez ryzyka 'wypłukania' świeżo uformowanych skrzepów w uszkodzonych naczyniach. W urazie czaszkowo-mózgowym (TBI) cel jest wyższy (SBP >100-110 mmHg) celem ochrony ciśnienia perfuzji mózgowej (CPP)."
    },
    {
      question: "Podczas masywnej transfuzji krwi u pacjenta po urazie wielonarządowym konieczne jest seryjne monitorowanie i dożylna suplementacja którego elektrolitu?",
      options: [
        "Wapnia zjonizowanego (Ca2+)",
        "Cynku",
        "Miedzi",
        "Żelaza",
        "Manganu"
      ],
      correct: 0,
      expl: "Cytrynian sodu zawarty jako antykoagulant w preparatach krwi (zwłaszcza w FFP i KKCz) wiąże (chelatuje) wolne jony wapnia we krwi biorcy, prowadząc do gwałtownej hipokalcemii. Spadek stężenia Ca2+ zjonizowanego paraliżuje kaskadę krzepnięcia krwi (wapń to czynnik IV) oraz wywołuje atonię mięśnia sercowego i wazodylatację. Niezbędne jest seryjne podawanie chlorku lub glukonianu wapnia i.v."
    },
    {
      question: "Jakie postępowanie jest przeciwwskazane podczas badania fizykalnego u pacjenta z podejrzeniem niestabilnego złamania miednicy?",
      options: [
        "Wielokrotne, forsowne uciskanie i rozpychanie talerzy biodrowych w celu sprawdzania ruchomości miednicy",
        "Oglądanie krocza i moszny pod kątem obecności krwiaka",
        "Ocena obecności krwi w ujściu zewnętrznym cewki moczowej",
        "Jednorazowe delikatne zbadanie stabilności obręczy miednicy",
        "Zbadanie tętna na tętnicach udowych"
      ],
      correct: 0,
      expl: "Wielokrotne manualne testowanie stabilności miednicy ('bujanie miednicą' przez kolejnych badających) jest kardynalnym błędem. Każdy ruch odłamów kostnych powoduje rozrywanie uformowanych skrzepów w przedkrzyżowym splocie żylnym i gałęziach tętnicy biodrowej, wywołując gwałtowne zaostrzenie śmiertelnego krwotoku zaotrzewnowego."
    },
    {
      question: "Metoda Preperitoneal Pelvic Packing (PPP) w chirurgii urazowej polega na:",
      options: [
        "Ciasnym upakowaniu chust chirurgicznych w przestrzeni załonowej i okołopęcherzowej z małego nacięcia nad spojeniem łonowym bez otwierania jamy otrzewnej",
        "Wprowadzeniu chust do światła pęcherza moczowego",
        "Zaszyciu skóry krocza szwem ciągłym",
        "Założeniu gipsu biodrowego na sali operacyjnej",
        "Wstrzyknięciu kleju tkankowego do aorty brzusznej"
      ],
      feedback: "",
      correct: 0,
      expl: "Preperitoneal Pelvic Packing (PPP) to ratunkowa procedura chirurgiczna opanowania masywnego krwotoku miednicznego. Z małego nacięcia pośrodkowego powyżej spojenia łonowego chirurg dociera do przestrzeni przedotrzewnowej (Retziusa) i ciasno upakowuje 3-6 chust operacyjnych po obu stronach pęcherza moczowego i wzdłuż kości miednicy, uzyskując bezpośrednią tamponadę krwawienia żylnego."
    }
  ],
  flashcards: [
    {
      front: "Co oznacza schemat cABCDE w protokole ATLS?",
      back: "c – catastrophic bleeding (krwotok zewnętrzny),\nA – airway & C-spine (drogi oddechowe i szyja),\nB – breathing (wentylacja),\nC – circulation (wstrząs, hemostaza),\nD – disability (GCS, źrenice),\nE – exposure/hypothermia."
    },
    {
      front: "Jakie zaburzenia tworzą tzw. śmiertelną triadę urazową (Lethal Triad)?",
      back: "1. Hipotermia (<35°C),\n2. Kwasica metaboliczna (pH <7,20, wysokie mleczany),\n3. Koagulopatia urazowa (Trauma-Induced Coagulopathy)."
    },
    {
      front: "Gdzie i jak należy założyć pas miedniczny (Pelvic Binder)?",
      back: "Na wysokości KRĘTARZY WIĘKSZYCH kości udowych (trochanters) i spojenia łonowego (nie na talerze biodrowe!). Stabilność miednicy bada się manualnie tylko RAZ!"
    },
    {
      front: "Jaki jest schemat podania kwasu traneksamowego (TXA) wg badania CRASH-2?",
      back: "1 g i.v. w ciągu 10 min w ciągu pierwszych 3 godzin od urazu, a następnie 1 g we wlewie przez 8 godzin. Podanie >3 h po urazie zwiększa śmiertelność!"
    },
    {
      front: "Na czym polega Damage Control Surgery (DCS)?",
      back: "Krótka operacja ratunkowa: opanowanie krwotoku (packing) i zatrzymanie skażenia treścią jelitową (bez zespoleń) + laparostomia VAC. Definitywna rekonstrukcja dopiero po 24-48 h na OIT."
    },
    {
      front: "W jakich proporcjach przetacza się krew w protokole MTP?",
      back: "W zrównoważonym stosunku 1:1:1 (1 j. KKCz : 1 j. FFP : 1 j. KKP) z podgrzewacza płynów + suplementacja chlorku wapnia (CaCl2) i fibrynogenu."
    }
  ]
};

async function run() {
  console.log("Generating Case 148: Ciężki uraz wielonarządowy (Polytrauma)...");
  
  // Mirroring
  case148.steps.forEach(s => {
    s.correct = 0;
    s.correctIdx = 0;
    s.question = s.title;
    s.explanation = s.feedback ? s.feedback[0] : "";
  });
  
  case148.lekQuestions.forEach(q => {
    q.opts = q.options;
    q.correctIdx = q.correct;
    q.exp = q.expl;
  });
  
  const enc = await encryptStringAes(JSON.stringify(case148, null, 2), MASTER_KEY);
  fs.writeFileSync(path.join('cases', '148_polytrauma_uraz_wielonarzadowy.json'), JSON.stringify(enc, null, 2), 'utf8');
  console.log("[SAVED] Case #148: 148_polytrauma_uraz_wielonarzadowy.json (LEK Qs: " + case148.lekQuestions.length + ", Steps: " + case148.steps.length + ", Flashcards: " + case148.flashcards.length + ")");
}

run();

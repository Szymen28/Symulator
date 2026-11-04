const fs = require('fs');
const path = require('path');
const { encryptStringAes } = require('./encrypt_case.js');

const MASTER_KEY = '@LEKSzymon28111999';
const CASES_DIR = path.join(__dirname, '..', 'cases');

console.log("Generating Case 135: Krwawienie z dolnego odcinka przewodu pokarmowego (LGIB)...");

async function saveCase(caseData) {
  const filePath = path.join(CASES_DIR, caseData.filename);
  const jsonStr = JSON.stringify(caseData, null, 2);
  const encrypted = await encryptStringAes(jsonStr, MASTER_KEY);
  fs.writeFileSync(filePath, JSON.stringify(encrypted, null, 2), 'utf8');
  console.log(`[SAVED] Case #${caseData.id}: ${caseData.filename} (LEK Qs: ${caseData.lekQuestions.length}, Steps: ${caseData.steps.length}, Flashcards: ${caseData.flashcards.length})`);
}

const case135 = {
  id: 135,
  filename: "135_krwawienie_dolny_odcinek_lgib.json",
  dept: "Chirurgia ogólna",
  shortTitle: "74-letnia Danuta – Nagłe, obfite krwawienie z odbytu (hematochezia), bladość i hipotensja (Krwawienie z uchyłków okrężnicy / LGIB)",
  diagnosisTitle: "Masywne krwawienie z dolnego odcinka przewodu pokarmowego (Lower Gastrointestinal Bleeding – LGIB) w przebiegu krwawiącego uchyłka prawej połowy okrężnicy, powikłane wstrząsem hipowolemicznym",
  vitals: [
    { label: "Ciśnienie tętnicze (RR)", val: "88/54 mmHg", sub: "Hipotensja ortostatyczna w przebiegu wstrząsu krwotocznego", status: "vital-crit" },
    { label: "Częstość akcji serca (HR)", val: "118/min", sub: "Tachykardia kompensacyjna", status: "vital-crit" },
    { label: "Hemoglobina (Hb)", val: "7,4 g/dl", sub: "Ciężka niedokrwistość pokrwotoczna", status: "vital-crit" },
    { label: "Wypróżnienie (stolec)", val: "Hematochezia", sub: "Obfity stolec ze świeżą krwią i skrzepami", status: "vital-crit" }
  ],
  vitalsObj: { hr: 118, bp: "88/54", spo2: 96, rr: 20, temp: 36.4, gcs: 14 },
  story: `<p><strong>Pacjentka:</strong> 74-letnia Danuta (emerytowana pielęgniarka, masa ciała 68 kg) została pilnie przywieziona przez zespół ratownictwa medycznego na szpitalny oddział ratunkowy po epizodzie nagłego zasłabnięcia w toalecie, poprzedzonego dwukrotnym obfitym oddaniem ciemnoczerwonej krwi ze skrzepami (hematochezia).</p><p><strong>Wywiad chorobowy:</strong> Dzisiaj około godziny 06:00 rano pacjentkę obudziło nagłe, bezbolesne parcie na stolec. W toalecie oddała około 500-600 ml płynnej, ciemnoczerwonej krwi z dużymi bordowymi skrzepami bez domieszki mas kałowych. Krwawieniu nie towarzyszył żaden ból brzucha (krwawienie całkowicie bezbólowe). Około godziny 07:30 nastąpił drugi, równie obfity rzut krwawienia z odbytu, po którym pacjentka zbladła, zalała się zimnym potem i na krótko straciła przytomność przy próbie wstania (omdlenie ortostatyczne). Córka wezwała pogotowie. W wywiadzie: nadciśnienie tętnicze, choroba niedokrwienna serca (stan po zawale serca przed 5 laty, przyjmuje kwas acetylosalicylowy w dawce 75 mg/d), przewlekłe zaparcia z potwierdzoną przed 4 laty uchyłkowatością okrężnicy. Neguje wcześniejsze krwawienia, wymioty krwawe i fusowate.</p><p><strong>Badanie przedmiotowe na SOR:</strong> Kobieta w stanie ogólnym średnio-ciężkim, skrajnie blada, podsypiająca, powłoki skórne chłodne, wilgotne, nawrót kapilarny CRT 3,5 sekundy. Tachykardia miarowa 118/min, hipotensja 88/54 mmHg (wstrząs hipowolemiczny stopnia II/III). Brzuch miękki, całkowicie niebolesny palpacyjnie, bez oporów i bez objawów otrzewnowych (Blumberg ujemny), perystaltyka żywa, okresowo wzmożona (krew działa przeczyszczająco na jelita). W badaniu per rectum (DRE): brak żylaków odbytu, bańka odbytnicy wypełniona płynną, ciemnoczerwoną krwią i świeżymi bordowymi skrzepami; na rękawiczce obfite ślady świeżej krwi (hematochezia). Brak bolesności w rzucie zwieraczy.</p>`,
  labs: {
    "Morfologia i wskaźniki czerwonokrwinkowe": [
      { name: "Hemoglobina (Hb)", val: "7,4 g/dl", norm: "12,0 - 16,0 g/dl", flag: "CRIT_LOW" },
      { name: "Hematokryt (Ht)", val: "22,8 %", norm: "36 - 46 %", flag: "CRIT_LOW" },
      { name: "Erytrocyty (RBC)", val: "2,55 mln/µl", norm: "4,0 - 5,2 mln/µl", flag: "CRIT_LOW" },
      { name: "Płytki krwi (PLT)", val: "185 tys./µl", norm: "150 - 450 tys./µl", flag: "NORMAL" },
      { name: "Leukocyty (WBC)", val: "9,8 tys./µl", norm: "4,0 - 10,0 tys./µl", flag: "NORMAL" },
      { name: "MCV", val: "89 fl", norm: "82 - 98 fl", flag: "NORMAL" }
    ],
    "Biochemia i układ krzepnięcia": [
      { name: "Mocznik", val: "48 mg/dl", norm: "15 - 45 mg/dl", flag: "HIGH" },
      { name: "Kreatynina w surowicy", val: "0,95 mg/dl", norm: "0,50 - 0,90 mg/dl", flag: "NORMAL" },
      { name: "Stosunek mocznika do kreatyniny (BUN/Cr)", val: "21,5", norm: "< 25 (przemawia za LGIB)", flag: "NORMAL" },
      { name: "Kwas mlekowy (mleczany)", val: "2,6 mmol/l", norm: "0,5 - 2,0 mmol/l", flag: "HIGH" },
      { name: "INR", val: "1,08", norm: "0,9 - 1,2", flag: "NORMAL" },
      { name: "APTT", val: "28 s", norm: "26 - 36 s", flag: "NORMAL" },
      { name: "Sód (Na+)", val: "139 mmol/l", norm: "135 - 145 mmol/l", flag: "NORMAL" },
      { name: "Potas (K+)", val: "3,8 mmol/l", norm: "3,5 - 5,1 mmol/l", flag: "NORMAL" }
    ],
    "Przyłóżkowe badanie sondą żołądkową (wykluczenie UGIB)": [
      { name: "Treść żołądkowa z odessania", val: "Czysta, przezroczysta treść podbarwiona żółcią (brak krwi, brak skrzepów i fusów)", norm: "Prawidłowa żółć", flag: "NORMAL" }
    ]
  },
  steps: [
    {
      title: "Krok 1: Wstępna ocena niestabilności hemodynamicznej i resuscytacja ('ABC')",
      text: "Pacjentka trafia na salę reanimacyjną SOR z ciśnieniem 88/54 mmHg, HR 118/min, blada, po utracie ok. 1000 ml krwi z odbytu (Hb 7,4 g/dl). Co stanowi absolutny, natychmiastowy priorytet w pierwszych minutach postępowania?",
      options: [
        "Zabezpieczenie dwóch kaniul dożylnych o dużym świetle (14-16G), rozpoczęcie szybkiego wlewu krystaloidów (1000-1500 ml PWE), pobranie krwi na próbę krzyżową (zamówienie 2-4 jednostek KKCz) oraz monitorowanie rzutu serca i saturacji",
        "Natychmiastowe podanie doustnych środków przeczyszczających w celu przygotowania jelita do kolonoskopii",
        "Wstrzyknięcie domięśniowe żelaza i wypisanie do poradni gastroenterologicznej",
        "Wykonanie pilnego RTG czaszki i klatki piersiowej na stojąco"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>U każdego chorego z masywnym krwawieniem z przewodu pokarmowego priorytetem jest stabilizacja hemodynamiczna (resuscytacja krążeniowa):</strong> 1. Zabezpieczenie dwóch grubych dostępów naczyniowych (14G lub 16G), 2. Natychmiastowy wlew płynów wieloelektrolitowych (<span class='dose-pill'>PWE 1000-1500 ml i.v. pod ciśnieniem</span>), 3. Pobranie grupy krwi i próby krzyżowej z pilnym zamówieniem koncentratu krwinek czerwonych (<span class='dose-pill'>KKCz 2-4 jednostki</span>), 4. Tlenoterapia i ciągłe monitorowanie EKG, ciśnienia i diurezy. Żadna diagnostyka inwazyjna nie może być prowadzona przed ustabilizowaniem wstrząsu!",
        "❌ BŁĄD! <strong>Podawanie płynów przeczyszczających niestabilnej pacjentce we wstrząsie wywoła zachłyśnięcie i zgon!</strong>",
        "❌ BŁĄD! <strong>Domięśniowe żelazo w ostrym wstrząsie hipowolemicznym nie ratuje życia –</strong> pacjentka wymaga natychmiastowej transfuzji krwi i płynów.",
        "❌ BŁĄD! <strong>Badania RTG głowy nie mają związku z krwotokiem z odbytu.</strong>"
      ]
    },
    {
      title: "Krok 2: Wykluczenie masywnego krwawienia z górnego odcinka (UGIB)",
      text: "Pacjentka oddaje świeżą, ciemnoczerwoną krew ze skrzepami (hematochezia). Dlaczego u pacjenta we wstrząsie z hematochezją bezwzględnie konieczne jest wykluczenie krwawienia z górnego odcinka przewodu pokarmowego (UGIB) i jak to szybko zweryfikować przy łóżku chorego?",
      options: [
        "Około 10-15% przypadków masywnej hematochezji ze wstrząsem wynika z piorunującego krwawienia z górnego odcinka (np. wrzód dwunastnicy niszczący tętnicę), przy którym krew przepływa przez jelita tak szybko, że nie ulega strawieniu; założenie sondy żołądkowej i odessanie żółci bez śladów krwi wyklucza aktywne krwawienie z żołądka i opuszki dwunastnicy",
        "Krwawienie z górnego odcinka zawsze objawia się wyłącznie wymiotami fusowatymi i nigdy nie daje hematochezji",
        "Wystarczy zapytać pacjenta, czy boli go gardło",
        "Nie ma konieczności badania górnego odcinka, krew z odbytu w 100% pochodzi z odbytnicy"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>To kardynalna pułapka na SOR i egzaminie LEK:</strong> aż 10-15% chorych z masywną hematochezją (świeża krew z odbytu) i niestabilnością hemodynamiczną krwawi w rzeczywistości z GÓRNEGO odcinka przewodu pokarmowego (UGIB)! Masywny krwotok tętniczy (np. wrzód penetrujący do a. gastroduodenalis) działa silnie przeczyszczająco i krew pokonuje przewód pokarmowy w kilkadziesiąt minut, nie ulegając strawieniu do smolistego stolca. Założenie sondy żołądkowej z odessaniem żółci (potwierdza aspirację z dwunastnicy) bez domieszki krwi lub pilna gastroskopia wykluczają UGIB.",
        "❌ BŁĄD! <strong>Przekonanie, że krew z odbytu to zawsze dolny odcinek, jest śmiertelnym błędem diagnostycznym!</strong>",
        "❌ BŁĄD! <strong>Wywiad dotyczący gardła nie ma wartości w krwotoku z przewodu pokarmowego.</strong>",
        "❌ BŁĄD! <strong>Stosunek mocznika do kreatyniny (BUN/Cr <25) oraz czysta żółć z sondy u Danuty potwierdzają źródło w dolnym odcinku (LGIB).</strong>"
      ]
    },
    {
      title: "Krok 3: Analiza przyczyn krwawienia z dolnego odcinka – uchyłki okrężnicy",
      text: "Sonda żołądkowa potwierdziła czystą żółć bez krwi, brzuch jest miękki i niebolesny, a krwawienie było bezbólowe. Jaka jest statystycznie najczęstsza przyczyna masywnego, bezbólowego krwawienia z dolnego odcinka przewodu pokarmowego u osób starszych?",
      options: [
        "Krwawienie z uchyłków jelita grubego (diverticular bleeding), odpowiadające za 30-50% przypadków ostrego LGIB",
        "Ostre ropne zapalenie wyrostka robaczkowego",
        "Wrzodziejące zapalenie jelita grubego w stadium septycznym",
        "Ciało obce w żołądku"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Krwawienie z uchyłków okrężnicy (diverticular bleeding) jest najczęstszą przyczyną ostrego, masywnego krwawienia z dolnego odcinka przewodu pokarmowego u dorosłych (30-50% przypadków).</strong> Cechuje się: nagłym początkiem, bezbólowym przebiegiem, obfitą hematochezią ze skrzepami oraz tendencją do samoistnego zatrzymania u ok. 75-80% chorych. W przeciwieństwie do zapalenia uchyłków (diverticulitis), w krwawieniu uchyłkowym NIE MA procesu zapalnego ani bólu brzucha!",
        "❌ BŁĄD! <strong>Zapalenie wyrostka nie wywołuje masywnej hematochezji i wstrząsu krwotocznego.</strong>",
        "❌ BŁĄD! <strong>Wrzodziejące zapalenie (CU) przebiega z przewlekłą, bolesną biegunką z ropą i krwią,</strong> a nie nagłym, bezbólowym krwotokiem u 74-latki bez wywiadu.",
        "❌ BŁĄD! <strong>Ciało obce w żołądku to górny odcinek przewodu pokarmowego.</strong>"
      ]
    },
    {
      title: "Krok 4: Patomechanizm krwawienia uchyłkowego – rola naczyń prostych (vasa recta)",
      text: "Lekarz stażysta pyta: 'Dlaczego uchyłek krwawi tak obficie, skoro to tylko małe uwypuklenie ściany?' Jaki jest anatomiczny i naczyniowy mechanizm krwawienia uchyłkowego?",
      options: [
        "W miejscu powstawania uchyłka naczynie proste (vasa recta) przechodzi przez warstwę mięśniową bezpośrednio na kopułę uchyłka; z wiekiem, pod wpływem tarcia mas kałowych i naprężeń dochodzi do asymetrycznego poszerzenia i pęknięcia ściany tego naczynia tętniczego",
        "Krwawienie wynika z pęknięcia żylaków odbytu do jamy otrzewnej",
        "Krwawienie jest spowodowane rozpadem raka tarczycy z przerzutem do esicy",
        "Krew sączy się z mięśni poprzecznie prążkowanych krocza"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Anatomia krwawienia uchyłkowego jest fascynująca:</strong> uchyłki rzekome powstają w miejscach wnikania tętniczek prostych (vasa recta) przez ścianę okrężnicy. W miarę wypychania uchyłka naczynie tętnicze zostaje rozciągnięte i leży bezpośrednio na jego kopule lub szyi, oddzielone od światła jelita jedynie cienką warstwą śluzówki. Przewlekłe naprężenia mechaniczne i tarcie twardych mas kałowych powodują przerost błony wewnętrznej naczynia, osłabienie ściany i w konsekwencji <strong>pęknięcie tętniczki</strong>, co wywołuje gwałtowne krwawienie tętnicze.",
        "❌ BŁĄD! <strong>Żylaki odbytu leżą w kanale odbytu i krwawią krwią jasnoczerwoną przy defekacji,</strong> rzadko dając wstrząs hipowolemiczny.",
        "❌ BŁĄD! <strong>Rak tarczycy nie przerzutuje do uchyłków esicy.</strong>",
        "❌ BŁĄD! <strong>Krwawienie pochodzi z łożyska tętniczego krezkowego,</strong> a nie mięśni szkieletowych."
      ]
    },
    {
      title: "Krok 5: Cele transfuzji krwi – Restrykcyjna strategia przetoczeń",
      text: "Hemoglobina u pacjentki wynosi 7,4 g/dl, a w wywiadzie występuje przebyty zawał serca i stabilna choroba wieńcowa. Jaki jest docelowy próg stężenia hemoglobiny w trakcie transfuzji KKCz wg wytycznych BSG i ESGE (2021)?",
      options: [
        "U pacjentów z chorobami układu krążenia (ChNS / przebyty zawał serca) celem jest utrzymanie Hb >8,0-8,5 g/dl (u chorych bez obciążeń kardiologicznych restrykcyjny próg wynosi 7,0-8,0 g/dl)",
        "Należy dążyć do natychmiastowego przetoczenia krwi do uzyskania Hb >15,0 g/dl",
        "Nie należy przetaczać krwi dopóki hemoglobina nie spadnie poniżej 3,0 g/dl",
        "Przetacza się wyłącznie osocze świeżo mrożone bez krwinek czerwonych"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Wytyczne dotyczące krwawień z przewodu pokarmowego (ESGE, BSG) zalecają restrykcyjną strategię przetaczania koncentratu krwinek czerwonych (KKCz):</strong><br>- U pacjentów bez istotnych obciążeń kardiologicznych: przetaczać, gdy <strong>Hb <7,0 g/dl</strong> (utrzymując cel 7,0-8,0 g/dl).<br>- U pacjentów z czynną chorobą układu krążenia (np. przebyty zawał, choroba wieńcowa, niewydolność serca – jak u Danuty): przetaczać przy <strong>Hb <8,0 g/dl</strong> (utrzymując cel <strong>>8,0-8,5 g/dl</strong>), aby zapobiec niedotlenieniu mięśnia sercowego (zawałowi typu 2). Przetaczanie 'na zapas' do wartości >10-12 g/dl zwiększa ryzyko nawrotu krwawienia i powikłań przeciążeniowych (TACO)!",
        "❌ BŁĄD! <strong>Przetaczanie do Hb >15 g/dl jest szkodliwe i grozi obrzękiem płuc oraz zakrzepicą.</strong>",
        "❌ BŁĄD! <strong>Czekanie na Hb <3 g/dl prowadzi do zatrzymania krążenia z hipoksji.</strong>",
        "❌ BŁĄD! <strong>Samo FFP nie przenosi tlenu;</strong> podaje się KKCz."
      ]
    },
    {
      title: "Krok 6: Diagnostyka obrazowa w aktywnym krwawieniu – Angio-TK vs Kolonoskopia",
      text: "Pacjentka została wstępnie ustabilizowana (RR 105/65 mmHg po 1500 ml PWE i 2 j. KKCz), jednak w toalecie ponownie oddała 300 ml świeżej krwi ze skrzepami. Jakie badanie obrazowe jest obecnie rekomendowane jako badanie pierwszego rzutu u chorego z aktywnym, niestabilnym hemodynamicznie krwawieniem z dolnego odcinka przewodu pokarmowego?",
      options: [
        "Angio-TK jamy brzusznej i miednicy (wieloowocowa tomografia z fazą tętniczą) – jest badaniem szybkim, nieinwazyjnym, niewymagającym przygotowania jelita, wykrywającym aktywne wynaczynienie krwi o tempie już od 0,3-0,5 ml/min",
        "Kolonoskopia natychmiastowa bez jakiegokolwiek przygotowania jelita",
        "RTG klatki piersiowej na stojąco",
        "Scyntygrafia kośćca z technetem"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Zgodnie z aktualnymi wytycznymi ESGE i BSG (2021) u pacjentów z podejrzeniem aktywnego, masywnego krwawienia z dolnego odcinka przewodu pokarmowego badaniem pierwszego rzutu jest Angio-TK jamy brzusznej i miednicy.</strong> Badanie to wykonuje się natychmiast (trwa kilkadziesiąt sekund), nie wymaga wielogodzinnego przygotowania jelita preparatami przeczyszczającymi, wykrywa wynaczynienie kontrastu do światła jelita (blush naczyniowy) przy krwawieniu >=0,3-0,5 ml/min i precyzyjnie lokalizuje gałąź tętniczą, stanowiąc mapę dla radiologa zabiegowego lub chirurga!",
        "❌ BŁĄD! <strong>Kolonoskopia bez przygotowania w jelicie wypełnionym krwią i skrzepami ma znikomą wartość diagnostyczną</strong> (zerowa widoczność, ryzyko perforacji).",
        "❌ BŁĄD! <strong>RTG klatki nie wykaże źródła krwawienia w jelicie grubym.</strong>",
        "❌ BŁĄD! <strong>Scyntygrafia kości nie ocenia przewodu pokarmowego.</strong>"
      ]
    },
    {
      title: "Krok 7: Radiologia zabiegowa – selektywna embolizacja naczyniowa (TAE)",
      text: "W badaniu Angio-TK uwidoczniono aktywne wynaczynienie kontrastu (blush) w świetle uchyłka wstępnicy zaopatrywanego przez gałąź tętnicy krętniczo-okrężniczej (odgałęzienie SMA). Jaka procedura małoinwazyjna jest obecnie leczeniem z wyboru w celu trwałego zatrzymania krwawienia bez otwierania jamy brzusznej?",
      options: [
        "Przezcewnikowa selektywna embolizacja naczyniowa (Transcatheter Angiographic Embolization – TAE) w pracowni radiologii zabiegowej z użyciem mikrosprężynek (mikrocoils) lub cząstek żelatynowych",
        "Laparotomia z wycięciem całej wątroby",
        "Wprowadzenie rurki Sengstakena-Blakemore'a do odbytnicy",
        "Podanie dożylne 10 litrów zimnej soli fizjologicznej"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Superselektywna embolizacja naczyniowa (TAE – Transcatheter Arterial Embolization) w pracowni radiologii zabiegowej jest metodą z wyboru u chorych z krwawieniem zlokalizowanym w Angio-TK.</strong> Radiolog zabiegowy wprowadza mikrocewnik przez tętnicę udową aż do końcowej gałązki zaopatrującej krwawiący uchyłek i zamyka naczynie za pomocą mikrosprężynek (coils) lub cząstek żelatynowych (gelfoam). Skuteczność hemostatyczna przekracza 85-95%, przy minimalnym (<2-5%) ryzyku martwicy ściany jelita dzięki bogatemu unaczynieniu obocznemu.",
        "❌ BŁĄD! <strong>Wycięcie wątroby to śmiertelny absurd medyczny.</strong>",
        "❌ BŁĄD! <strong>Sonda Sengstakena służy do tamponady żylaków przełyku i żołądka,</strong> a nie jelita grubego.",
        "❌ BŁĄD! <strong>Zimna sól nie zatamuje krwotoku tętniczego,</strong> a wywoła hipotermię i zaburzenia krzepnięcia."
      ]
    },
    {
      title: "Krok 8: Wskazania do leczenia operacyjnego (kolektomii)",
      text: "W jakiej sytuacji u pacjenta z krwawieniem z dolnego odcinka przewodu pokarmowego konieczne jest podjęcie decyzji o pilnej operacji chirurgicznej (resekcji jelita)?",
      options: [
        "W przypadku masywnego, zagrażającego życiu krwotoku opornego na zabiegi endoskopowe i radiologię zabiegową (niepowodzenie lub niedostępność embolizacji) z utrzymującą się niestabilnością hemodynamiczną mimo przetoczenia >4-6 jednostek KKCz",
        "U każdego chorego z uchyłkowatością natychmiast po pierwszym krwawieniu",
        "Gdy stolec pacjenta ma kolor brązowy zamiast żółtego",
        "W przypadku ustąpienia krwawienia po 2 godzinach"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Wskazaniami do pilnej operacji chirurgicznej w LGIB są:</strong> 1. Utrzymujące się masywne krwawienie ze wstrząsem mimo intensywnej resuscytacji (>4-6 j. KKCz w ciągu 24 h), 2. Niepowodzenie lub brak możliwości wykonania embolizacji naczyniowej (TAE) oraz hemostazy endoskopowej, 3. Nawrót masywnego krwawienia po zabiegach małoinwazyjnych. Jeśli źródło jest precyzyjnie zlokalizowane (np. w prawej okrężnicy w Angio-TK), wykonuje się <strong>celowaną prawostronną hemikolektomię</strong>; jeśli źródło jest nieznane, a krwotok zagraża życiu, operacją ratunkową jest <strong>kolektomia subtotalna</strong> z zespoleniem krętniczo-odbytniczym (tzw. ślepa resekcja segmentowa jest zabroniona z powodu 50% ryzyka ponownego krwawienia!).",
        "❌ BŁĄD! <strong>Ponad 80% krwawień uchyłkowych ustępuje samoistnie lub po embolizacji;</strong> rutynowa operacja po pierwszym epizodzie jest błędem.",
        "❌ BŁĄD! <strong>Brązowy stolec to norma fizjologiczna.</strong>",
        "❌ BŁĄD! <strong>Ustąpienie krwawienia jest sukcesem leczenia zachowawczego</strong> i nie wymaga operacji w trybie ostrym."
      ]
    }
  ],
  pathoNodes: [
    {
      badge: "Naczynia proste",
      title: "Rozciągnięcie vasa recta na kopule uchyłka",
      short: "Anatomiczna bliskość tętniczki i światła jelita",
      detail: "Uchyłek wpukla się w miejscu przejścia tętnicy prostej (vasa recta) przez ścianę mięśniową. Tętniczka zostaje rozciągnięta i spłaszczona na szczycie uchyłka, oddzielona od stolca jedynie cienkim nabłonkiem.",
      target: "Tętniczki vasa recta gałęzi krezkowych",
      drugTarget: "<span class='dose-pill'>Superselektywna embolizacja (TAE)</span> zamknięcie krwawiącej tętniczki mikrosprężynkami"
    },
    {
      badge: "Uszkodzenie ściany",
      title: "Przerost błony wewnętrznej i pęknięcie naczynia",
      short: "Tarcie mas kałowych i pęknięcie tętniczki",
      detail: "Naprężenia mechaniczne wywołują ekscentryczny przerost błony wewnętrznej i ścieńczenie błony środkowej naczynia. Dochodzi do pęknięcia ściany tętniczki i gwałtownego krwawienia tętniczego pod wysokim ciśnieniem.",
      target: "Błona wewnętrzna i środkowa vasa recta",
      drugTarget: "<span class='dose-pill'>Klipsy hemostatyczne (TTS)</span> mechaniczne zaopatrzenie w kolonoskopii"
    },
    {
      badge: "Wstrząs krwotoczny",
      title: "Hipowolemia, spadek perfuzji i tachykardia",
      short: "Utrata >20-30% objętości krwi krążącej",
      detail: "Nagła utrata krwi obniża powrót żylny i rzut serca. Uruchamia się wyrzut katecholamin, dając tachykardię i obkurczenie naczyń obwodowych. Spadek perfuzji wieńcowej grozi zawałem typu 2.",
      target: "Układ krążenia i transport tlenu",
      drugTarget: "<span class='dose-pill'>Transfuzja KKCz (cel Hb >8 g/dl)</span> + <span class='dose-pill'>PWE 1500 ml i.v.</span>"
    },
    {
      badge: "Lokalizacja w Angio-TK",
      title: "Wynaczynienie kontrastu do światła okrężnicy",
      short: "Wizualizacja 'blushu' naczyniowego (>=0,3 ml/min)",
      detail: "Szybki wlew kontrastu dożylnego pozwala uwidocznić jego ucieczkę poza łożysko naczyniowe do światła kątnicy lub wstępnicy. Daje to precyzyjną mapę anatomiczną do celowanego leczenia zabiegowego.",
      target: "Pracownia radiologii zabiegowej / Angio-TK",
      drugTarget: "<span class='dose-pill'>Angio-TK jamy brzusznej z kontrastem</span> złoty standard w aktywnym krwawieniu"
    }
  ],
  diffTable: {
    title: "⚔️ Tabela Różnicowa: Krwawienie z uchyłków vs Inne przyczyny krwawienia z dolnego odcinka przewodu pokarmowego",
    headers: ["Cecha kliniczna", "Krwawienie z uchyłków okrężnicy", "Angiodysplazje (wady naczyniowe)", "Rak jelita grubego (rak prawej/lewej okrężnicy)", "Niedokrwienne zapalenie jelita grubego", "Choroba hemoroidalna (krwawnice)"],
    rows: [
      ["Charakter krwawienia", "Nagłe, bezbólowe, obfite (często wstrząs), świeża krew ze skrzepami", "Nawracające, powolne lub umiarkowane, rzadziej masywny wstrząs", "Przewlekłe krwawienie utajone (anemia mikrocytarna) lub pasma krwi na stolcu", "Nagły ból kurczowy brzucha, po którym występuje krwista biegunka", "Krew jasnoczerwona na papierze toaletowym lub muszli po oddaniu stolca, bez skrzepów"],
      ["Bolesność brzucha", "Całkowity brak bólu brzucha (krwawienie bezbólowe!)", "Całkowity brak bólu brzucha", "Początkowo bezbólowe, w zaawansowanym ból i zmiana rytmu wypróżnień", "Wyraźny kurczowy ból w lewym dole biodrowym i boku", "Brak bólu brzucha; możliwy dyskomfort w odbycie (ból przy zakrzepicy)"],
      ["Typowa lokalizacja", "Uchyłki prawej połowy okrężnicy (mimo że uchyłki częściej są w esicy!)", "Prawa połowa okrężnicy (kątnica i wstępnica) u osób starszych", "Odbytnica, esica (krew jawna); kątnica (krew utajona, anemia)", "Okrężnica zstępująca i zgięcie śledzionowe (punkt Griffithsa)", "Kanał odbytu (sploty żylne powyżej linii grzebieniastej)"],
      ["Wiek pacjentów", "Osoby starsze (>60-70 lat), częściej na lekach NLPZ/ASA", "Podeszły wiek (>70 lat), skojarzone ze stenozą aortalną (zespół Heyde'a)", "Zwykle >50 lat (choć rośnie u młodych)", "Osoby starsze z chorobą naczyniową lub po spadku ciśnienia/operacji", "Każdy wiek (często dorośli w wieku 20-50 lat, ciąża)"],
      ["Obraz w badaniu endoskopowym", "Krew sącząca się z ujścia uchyłka, brak cech zapalenia śluzówki", "Drobne, drzewkowate, czerwone ektazje naczyniowe w śluzówce kątnicy", "Owrzodziały guz zwężający światło jelita (obraz 'ogryzka jabłka')", "Obrzęk, sinica i podłużne nadżerki śluzówki z ostrym odgraniczeniem", "Powiększone, sinoniebieskie sploty żylne w kanale odbytu"],
      ["Podstawowe leczenie", "Stabilizacja, Angio-TK -> embolizacja naczyniowa (TAE) / klipsy w kolonoskopii", "Koagulacja plazmą argonową (APC) w kolonoskopii; analogi somatostatyny", "Onkologiczna resekcja jelita (hemikolektomia / resekcja przednia)", "Leczenie zachowawcze (nawodnienie, tlenoterapia, optymalizacja RR)", "Leczenie zachowawcze (dieta, flawonoidy), gumkowanie sposobem Barrona"]
    ]
  },
  dutySummary: {
    overview: "Krwawienie z dolnego odcinka przewodu pokarmowego (LGIB) to krwawienie ze źródła zlokalizowanego dystalnie od więzadła Treitza (w 85-90% z okrężnicy). Najczęstszą przyczyną ostrego masywnego LGIB u dorosłych jest krwawienie z uchyłków jelita grubego (30-50%). U pacjentów niestabilnych hemodynamicznie priorytetem jest natychmiastowa resuscytacja płynowa i transfuzje, a badaniem pierwszego rzutu Angio-TK z następową superselektywną embolizacją naczyniową (TAE).",
    diagnostics: "1. Ocena stabilności hemodynamicznej (tętno, ciśnienie, nawrót kapilarny, diureza) i stratyfikacja ryzyka (skala Oakland).<br>2. Badanie per rectum (DRE) – ocena charakteru krwi (świeża krew, skrzepy, smolisty stolec) i wykluczenie zmian w kanale odbytu.<br>3. Wykluczenie krwawienia z górnego odcinka (UGIB): aspiracja treści żołądkowej sondą (czysta żółć bez krwi wyklucza aktywne UGIB) lub pilna gastroskopia przy ciężkim wstrząsie.<br>4. Morfologia i koagulologia: stężenie Hb, Ht, płytki krwi, INR, APTT, grupa krwi i próba krzyżowa.<br>5. Angio-TK jamy brzusznej i miednicy z fazą tętniczą (złoty standard w aktywnym krwawieniu) – wykrywa wynaczynienie od 0,3 ml/min.<br>6. Kolonoskopia w ciągu 24 h po ustabilizowaniu i przygotowaniu jelita roztworem glikolu polietylenowego (PEG).",
    drugsAndDoses: "1. Płynoterapia krystaloidowa: <span class='dose-pill'>Płyn wieloelektrolitowy (PWE) 1000-2000 ml i.v. pod ciśnieniem</span> w celu przywrócenia wolemii.<br>2. Transfuzja koncentratu krwinek czerwonych: <span class='dose-pill'>Przetoczenie 2-4 jednostek UKKCz</span> – restrykcyjna strategia: cel Hb >7,0-8,0 g/dl (u chorych z chorobą wieńcową cel Hb >8,0-8,5 g/dl).<br>3. Zabezpieczenie hemostazy: przetoczenie KKP przy PLT <50 tys./µl lub osocza (FFP) przy INR >1,5.<br>4. Leki hemostatyczne miejscowe w kolonoskopii: ostrzyknięcie <span class='dose-pill'>Adrenaliną 1:10 000 miejscowo</span> w połączeniu z mechanicznym klipsowaniem naczynia (klipsy TTS).<br>5. <span class='dose-pill'>Odstawienie leków przeciwpłytkowych (ASA)</span> i antykoagulantów w ostrej fazie krwotoku.",
    procedures: "1. Kaniulacja dwóch żył obwodowych igłami o dużym przekroju (14G lub 16G).<br>2. Założenie sondy żołądkowej (wykluczenie krwi w żołądku) oraz cewnika Foleya (kontrola diurezy).<br>3. Superselektywna embolizacja naczyniowa (TAE) w pracowni radiologii zabiegowej – małoinwazyjny zabieg z wyboru zamykający krwawiącą gałązkę vasa recta mikrosprężynkami (coils).<br>4. Kolonoskopia terapeutyczna: zaopatrzenie krwawiącego uchyłka klipsami hemostatycznymi, opaskowaniem endoskopowym (EBL) lub hemostazą termiczną (sonda cieplna / APC).<br>5. Pilna laparotomia z resekcją jelita (celowana hemikolektomia lub kolektomia subtotalna) w przypadku niepowodzenia metod małoinwazyjnych i utraty >6 j. KKCz.",
    monitoring: "1. Ciągłe monitorowanie parametrów życiowych (ciśnienie tętnicze, tętno, saturacja) na sali intensywnego nadzoru.<br>2. Seryjna kontrola morfologii krwi (Hb i Ht) co 4-6 godzin w pierwszej dobie.<br>3. Obserwacja wypróżnień (ustąpienie hematochezji i powrót normalnego stolca).<br>4. Weryfikacja wskazań do ponownego włączenia kwasu acetylosalicylowego po zagojeniu (u chorych po zawale serca powrót do małej dawki ASA zalecany jest w ciągu 3-5 dni po opanowaniu krwawienia ze względu na ryzyko powikłań sercowo-naczyniowych)."
  },
  lekQuestions: [
    {
      question: "Najczęstszą przyczyną ostrego, masywnego, bezbólowego krwawienia z dolnego odcinka przewodu pokarmowego u osób w wieku podeszłym jest:",
      options: [
        "Krwawienie z uchyłków jelita grubego (diverticular bleeding)",
        "Ostre zapalenie wyrostka robaczkowego",
        "Przewlekła szczelina odbytu",
        "Wrzodziejące zapalenie jelita grubego",
        "Polip młodzieńczy żołądka"
      ],
      correct: 0,
      expl: "Krwawienie z uchyłków okrężnicy odpowiada za 30-50% wszystkich przypadków ostrego krwawienia z dolnego odcinka przewodu pokarmowego (LGIB). Charakteryzuje się nagłym początkiem, brakiem dolegliwości bólowych brzucha oraz wydaleniem dużej ilości świeżej lub ciemnoczerwonej krwi ze skrzepami (hematochezia)."
    },
    {
      question: "U pacjenta z masywną hematochezją (świeża krew z odbytu) i wstrząsem hipowolemicznym należy bezwzględnie w pierwszej kolejności:",
      options: [
        "Wdrożyć agresywną resuscytację płynową oraz wykluczyć krwawienie z górnego odcinka przewodu pokarmowego (np. sondą żołądkową lub gastroskopią)",
        "Wykonać pilną kolonoskopię bez przygotowania jelita",
        "Zlecić wlew doodbytniczy z zawiesiny barytowej",
        "Podać dożylnie leki przeczyszczające i odesłać do domu",
        "Wykonać rezonans magnetyczny miednicy mniejszej"
      ],
      correct: 0,
      expl: "Około 10-15% chorych z masywną hematochezją i niestabilnością hemodynamiczną krwawi w rzeczywistości z górnego odcinka przewodu pokarmowego (masywny krwotok z wrzodu żołądka lub dwunastnicy z przyspieszonym pasażem). Priorytetem jest stabilizacja krążenia (płyny, krew) oraz wykluczenie UGIB za pomocą sondy żołądkowej lub pilnej gastroskopii."
    },
    {
      question: "Zgodnie z wytycznymi ESGE i BSG (2021) u pacjenta z chorobą niedokrwienną serca (stanem po zawale mięśnia sercowego) w trakcie ostrego krwawienia z przewodu pokarmowego docelowe stężenie hemoglobiny podczas transfuzji KKCz wynosi:",
      options: [
        "> 8,0 - 8,5 g/dl",
        "> 14,0 g/dl",
        "< 5,0 g/dl",
        "Dokładnie 10,0 g/dl u każdego chorego",
        "Stężenie hemoglobiny nie ma znaczenia klinicznego"
      ],
      correct: 0,
      expl: "W krwawieniach z przewodu pokarmowego stosuje się strategię restrykcyjną: u pacjentów z chorobą układu krążenia (przebyty zawał, choroba wieńcowa) celem transfuzji KKCz jest utrzymanie stężenia hemoglobiny powyżej 8,0-8,5 g/dl, co zapobiega zawałowi serca typu 2 z niedotlenienia. U osób bez obciążeń kardiologicznych docelowy poziom to 7,0-8,0 g/dl."
    },
    {
      question: "Badaniem obrazowym pierwszego wyboru u pacjenta z aktywnym, niestabilnym hemodynamicznie krwawieniem z dolnego odcinka przewodu pokarmowego po wstępnej stabilizacji jest:",
      options: [
        "Angio-TK jamy brzusznej i miednicy z fazą tętniczą",
        "Klasyczne przeglądowe RTG jamy brzusznej",
        "Kolonoskopia bez przygotowania jelita",
        "Ultrasonografia jamy brzusznej bez opcji naczyniowej",
        "Scyntygrafia z użyciem technetu Tc-99m po 48 godzinach"
      ],
      correct: 0,
      expl: "Angio-TK jest badaniem z wyboru u chorych z aktywnym, ciężkim krwawieniem z dolnego odcinka (LGIB). Wykrywa aktywne wynaczynienie kontrastu (blush) przy krwawieniu od 0,3-0,5 ml/min, nie wymaga przygotowania jelita preparatami przeczyszczającymi i pozwala na natychmiastowe skierowanie pacjenta do celowanej embolizacji naczyniowej (TAE)."
    },
    {
      question: "Superselektywna embolizacja naczyniowa (TAE) w pracowni radiologii zabiegowej w leczeniu krwawienia uchyłkowego polega na:",
      options: [
        "Wprowadzeniu mikrocewnika i zamknięciu krwawiącej gałązki tętniczej (vasa recta) za pomocą mikrosprężynek naczyniowych (coils) lub cząstek żelatynowych",
        "Wstrzyknięciu kleju tkankowego do aorty brzusznej",
        "Całkowitym zablokowaniu pnia tętnicy krezkowej górnej balonem",
        "Podwiązaniu żyły wrotnej nicią chirurgiczną",
        "Wycięciu prawej połowy okrężnicy przez nakłucie tętnicy udowej"
      ],
      correct: 0,
      expl: "Superselektywna embolizacja przezcewnikowa (TAE) to metoda małoinwazyjna z wyboru: pod kontrolą fluoroskopii mikrocewnik wprowadzany jest do naczynia prostego (vasa recta) bezpośrednio zaopatrującego krwawiący uchyłek, po czym podaje się mikrosprężynki (coils). Skuteczność hemostazy wynosi >85-90% przy minimalnym ryzyku niedokrwienia ściany jelita."
    },
    {
      question: "Z jakiego powodu krwawienie z uchyłków okrężnicy częściej dotyczy prawej połowy okrężnicy, mimo że sama uchyłkowatość występuje najliczniej w esicy?",
      options: [
        "Uchyłki w prawej połowie okrężnicy mają szersze szyje i cieńszą ścianę, a zaopatrujące je naczynia proste (vasa recta) są dłuższe i bardziej podatne na naprężenia mechaniczne i pęknięcie",
        "Prawa połowa okrężnicy nie ma w ogóle ściany mięśniowej",
        "Treść w kątnicy jest całkowicie sucha, co niszczy naczynia krwionośne",
        "W prawej połowie okrężnicy ciśnienie krwi wynosi 300 mmHg",
        "Jest to zjawisko całkowicie przypadkowe bez podłoża anatomicznego"
      ],
      correct: 0,
      expl: "Chociaż ponad 80-90% uchyłków w populacji zachodniej lokalizuje się w esicy i zstępnicy, to ponad 50-60% masywnych krwawień uchyłkowych pochodzi z prawej połowy okrężnicy (kątnica, wstępnica). Uchyłki prawej okrężnicy mają szersze wrota, cieńszą ścianę, a gałązki vasa recta są dłuższe i podlegają większym naprężeniom ścinającym, co predysponuje je do pęknięcia."
    },
    {
      question: "Wskaźnik mocznika do kreatyniny w surowicy krwi (BUN/kreatynina) w krwawieniu z DOLNEGO odcinka przewodu pokarmowego typowo wynosi:",
      options: [
        "< 20 - 25 (brak trawienia i wchłaniania białek krwi w jelicie cienkim)",
        "> 35 - 40 (wysoki wskaźnik)",
        "> 100 u każdego chorego",
        "Zawsze dokładnie 0",
        "Wskaźnik ten nie zależy od poziomu krwawienia"
      ],
      correct: 0,
      expl: "W krwawieniach z górnego odcinka (UGIB) krew ulega trawieniu i wchłanianiu w jelicie cienkim, co wywołuje podwyższenie stężenia mocznika i wskaźnika BUN/kreatynina >30-35. W krwawieniu z dolnego odcinka (LGIB) krew nie przechodzi przez jelito cienkie i nie ulega trawieniu, dlatego wskaźnik BUN/kreatynina pozostaje niski (<20-25), co stanowi cenną wskazówkę różnicową."
    },
    {
      question: "Skala Oakland jest nowoczesnym narzędziem klinicznym rekomendowanym przez wytyczne BSG/ESGE służącym do:",
      options: [
        "Stratyfikacji ryzyka w krwawieniu z dolnego odcinka przewodu pokarmowego i identyfikacji pacjentów o niskim ryzyku, którzy mogą być bezpiecznie wypisani do diagnostyki ambulatoryjnej",
        "Oceny stopnia zaawansowania raka trzustki",
        "Kwalifikacji do natychmiastowego przeszczepu wątroby",
        "Oceny ryzyka pęknięcia tętniaka aorty",
        "Wyboru dawki paracetamolu u noworodków"
      ],
      correct: 0,
      expl: "Skala Oakland (rekomendowana przez BSG 2019 i ESGE 2021) służy do stratyfikacji ryzyka u pacjentów z krwawieniem z dolnego odcinka przewodu pokarmowego (LGIB). Uwzględnia wiek, płeć, wcześniejsze przyjęcia z krwawieniem, badanie DRE, tętno, ciśnienie i stężenie hemoglobiny. Wynik <=8 punktów pozwala na bezpieczne odesłanie chorego ze szpitala i planową diagnostykę ambulatoryjną."
    },
    {
      question: "Wskaż fałszywe stwierdzenie dotyczące krwawienia z uchyłków jelita grubego:",
      options: [
        "Krwawieniu z uchyłków okrężnicy zawsze towarzyszy ostry ból w lewym dole biodrowym oraz wysoka gorączka",
        "Krwawienie uchyłkowe ma charakter bezbólowy i najczęściej ustępuje samoistnie",
        "Stosowanie kwasu acetylosalicylowego i NLPZ zwiększa ryzyko krwawienia uchyłkowego",
        "Krwawienie uchyłkowe ma charakter tętniczy",
        "Po opanowaniu krwawienia u pacjenta po zawale serca należy szybko powrócić do stosowania małej dawki ASA"
      ],
      correct: 0,
      expl: "Stwierdzenie pierwsze jest fałszywe. Krwawienie z uchyłków okrężnicy jest z definicji krwawieniem BEZBÓLOWYM i nie towarzyszy mu gorączka ani stan zapalny (w przeciwieństwie do diverticulitis, gdzie dominuje ostry ból i gorączka, a krwawienie jawne występuje rzadko). Pozostałe zdania są prawdziwe."
    },
    {
      question: "Podczas kolonoskopii u chorego z krwawiącym uchyłkiem esicy uwidoczniono aktywnie pulsujące naczynie na krawędzi uchyłka. Metodą endoskopowej hemostazy o najwyższej skuteczności jest:",
      options: [
        "Mechaniczne zaopatrzenie naczynia klipsami hemostatycznymi (klipsy TTS) lub opaskowanie endoskopowe (EBL)",
        "Płukanie uchyłka 5 litrami zimnej wody",
        "Wycięcie uchyłka pętlą diatermiczną",
        "Zasypanie uchyłka sproszkowanym węglem leczniczym",
        "Podanie dożylne ampicyliny"
      ],
      correct: 0,
      expl: "Mechaniczne zamknięcie krwawiącego naczynia za pomocą metalowych klipsów hemostatycznych (Through-The-Scope clips – TTS) bezpośrednio na naczyniu lub zamknięcie szyi uchyłka klipsami albo założenie opaski elastycznej (Endoscopic Band Ligation – EBL) jest najskuteczniejszą i najbezpieczniejszą metodą hemostazy endoskopowej w krwawieniu uchyłkowym, charakteryzującą się niskim odsetkiem nawrotów i brakiem ryzyka perforacji termicznej."
    },
    {
      question: "Operacją ratunkową z wyboru u pacjenta z masywnym, zagrażającym życiu krwawieniem z dolnego odcinka przewodu pokarmowego, u którego mimo usilnych prób nie udało się zlokalizować źródła krwotoku (źródło nieznane), jest:",
      options: [
        "Kolektomia subtotalna (usunięcie niemal całego jelita grubego z zespoleniem krętniczo-odbytniczym)",
        "Ślepa prawostronna hemikolektomia",
        "Ślepa resekcja esicy",
        "Wyłonienie pętlowej kolostomii bez wycinania jelita",
        "Wycięcie wyrostka robaczkowego"
      ],
      correct: 0,
      expl: "W rzadkich przypadkach, gdy masywny krwotok zagraża życiu chorego, a źródła nie udało się zlokalizować ani w Angio-TK, ani w endoskopii, operacją z wyboru jest kolektomia subtotalna (usunięcie całej okrężnicy z zespoleniem jelita krętego z odbytnicą). Wykonywanie tzw. 'ślepych' resekcji segmentowych (np. ślepej hemikolektomii) jest błędem w sztuce ze względu na ponad 50% odsetek nawrotu krwotoku z pozostawionego jelita i śmiertelność sięgającą 30-50%."
    }
  ],
  flashcards: [
    {
      front: "Co to jest hematochezia i kiedy może pochodzić z górnego odcinka przewodu pokarmowego (UGIB)?",
      back: "Hematochezia to oddawanie świeżej/ciemnoczerwonej krwi ze skrzepami z odbytu. W 10-15% przypadków masywnego wstrząsowego krwotoku źródło leży w UGIB (wrzód dwunastnicy z przyspieszonym pasażem). Wymaga wykluczenia sondą żołądkową lub gastroskopią!"
    },
    {
      front: "Jaka jest najczęstsza przyczyna ostrego, masywnego, bezbólowego krwawienia z dolnego odcinka (LGIB)?",
      back: "Krwawienie z uchyłków jelita grubego (diverticular bleeding ~30-50%). Wynika z pęknięcia tętniczki vasa recta na kopule uchyłka (często w prawej okrężnicy)."
    },
    {
      front: "Jaki jest docelowy poziom hemoglobiny przy transfuzji krwi w krwawieniu z przewodu pokarmowego?",
      back: "Strategia restrykcyjna: cel Hb >7,0-8,0 g/dl u większości chorych; u pacjentów z chorobą wieńcową (przebyty zawał serca) cel Hb >8,0-8,5 g/dl (zapobieganie zawałowi typu 2)."
    },
    {
      front: "Jakie badanie obrazowe jest badaniem pierwszego rzutu u niestabilnego pacjenta z aktywnym krwawieniem z dolnego odcinka?",
      back: "Angio-TK jamy brzusznej i miednicy z fazą tętniczą (wykrywa wynaczynienie od 0,3 ml/min, nie wymaga przygotowania jelita, daje mapę naczyniową)."
    },
    {
      front: "Jaka procedura radiologii zabiegowej jest metodą z wyboru w aktywnym krwawieniu uchyłkowym?",
      back: "Superselektywna przezcewnikowa embolizacja naczyniowa (TAE) mikrosprężynkami (coils) – zamyka krwawiącą gałązkę vasa recta ze skutecznością >90%."
    },
    {
      front: "Do czego służy skala Oakland w krwawieniach z dolnego odcinka przewodu pokarmowego?",
      back: "Do stratyfikacji ryzyka u chorych z LGIB – wynik <=8 punktów pozwala na bezpieczne wypisanie pacjenta ze szpitala do diagnostyki ambulatoryjnej."
    }
  ]
};

// Mirror fields for schema compatibility
case135.steps.forEach(step => {
  step.question = step.title;
  step.explanation = step.feedback;
});
case135.lekQuestions.forEach(q => {
  q.opts = q.options;
  q.correctIdx = q.correct;
  q.exp = q.expl;
});

saveCase(case135);

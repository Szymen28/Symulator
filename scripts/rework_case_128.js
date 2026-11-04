const fs = require('fs');
const path = require('path');
const { encryptStringAes } = require('./encrypt_case.js');

const MASTER_KEY = '@LEKSzymon28111999';
const CASES_DIR = path.join(__dirname, '..', 'cases');

console.log("Generating Case 128: Ostre zapalenie dróg żółciowych (Cholangitis)...");

async function saveCase(caseData) {
  const filePath = path.join(CASES_DIR, caseData.filename);
  const jsonStr = JSON.stringify(caseData, null, 2);
  const encrypted = await encryptStringAes(jsonStr, MASTER_KEY);
  fs.writeFileSync(filePath, JSON.stringify(encrypted, null, 2), 'utf8');
  console.log(`[SAVED] Case #${caseData.id}: ${caseData.filename} (LEK Qs: ${caseData.lekQuestions.length}, Steps: ${caseData.steps.length}, Flashcards: ${caseData.flashcards.length})`);
}

const case128 = {
  id: 128,
  filename: "128_ostre_zapalenie_drog_zolciowych_cholangitis.json",
  dept: "Chirurgia ogólna",
  shortTitle: "68-letni Tadeusz – Gorączka z dreszczami, żółtaczka i hipotensja (Ostre zapalenie dróg żółciowych / Pentada Reynoldsa)",
  diagnosisTitle: "Ostre wstępujące ropne zapalenie dróg żółciowych (Acute Cholangitis – stopień III wg Tokyo Guidelines TG18) w przebiegu kamicy przewodowej (choledocholithiasis) powikłane wstrząsem septycznym",
  vitals: [
    { label: "Temperatura ciała", val: "39,6 °C", sub: "Gorączka hektyczna z uogólnionymi dreszczami", status: "vital-crit" },
    { label: "Ciśnienie tętnicze (RR)", val: "84/48 mmHg", sub: "Hipotensja septyczna (MAP 60 mmHg)", status: "vital-crit" },
    { label: "Częstość akcji serca (HR)", val: "126/min", sub: "Tachykardia w przebiegu wstrząsu septycznego", status: "vital-crit" },
    { label: "Bilirubina całkowita", val: "8,6 mg/dl", sub: "Ciężka żółtaczka mechaniczna", status: "vital-crit" }
  ],
  vitalsObj: { hr: 126, bp: "84/48", spo2: 95, rr: 24, temp: 39.6, gcs: 13 },
  story: `<p><strong>Pacjent:</strong> 68-letni Tadeusz został przywieziony przez zespół ratownictwa medycznego na szpitalny oddział ratunkowy w stanie ciężkim z powodu nagłej, wysokiej gorączki z dreszczami (do 39,8°C), narastającego zażółcenia powłok skórnych i białkówek, silnego bólu w prawym podżebrzu oraz splątania i spadku ciśnienia tętniczego.</p><p><strong>Wywiad chorobowy:</strong> Przed trzema dniami u pacjenta pojawił się ból w nadbrzuszu o charakterze kolki żółciowej połączony z ciemnym zabarwieniem moczu ('koloru piwa') i odbarwieniem stolca ('stolec gliniasty'). Wczoraj wieczorem rodzina zauważyła wyraźną żółtaczkę na twarzy i oczach chorego. Od dzisiejszego poranka wystąpiły silne dreszcze, temperatura skoczyła do 39,8°C, a pacjent zaczął bełkotać, stał się podsypiający i nie poznawał najbliższych. W wywiadzie: stan po cholecystektomii laparoskopowej przed 6 laty (usunięty pęcherzyk żółciowy), utrwalone migotanie przedsionków leczone rywaroksabanem, cukrzyca typu 2.</p><p><strong>Badanie przedmiotowe na SOR:</strong> Chory w stanie ogólnym bardzo ciężkim, podsypiający, zdezorientowany co do miejsca i czasu (GCS 13). Wyraźne, intensywnie żółto-oliwkowe zażółcenie skóry całego ciała i twardówek oczu (żółtaczka mechaniczna). Skóra gorąca, wilgotna, obwodowy nawrót kapilarny CRT 3,5 sekundy. Tachykardia miarowa 126/min, ciśnienie tętnicze 84/48 mmHg (hipotensja wstrząsowa). Brzuch miękki, wyraźnie bolesny palpacyjnie w prawym podżebrzu i nadbrzuszu, z obroną mięśniową, bez objawów rozlanego zapalenia otrzewnej. Wątroba niepowiększona, perystaltyka leniwa. Blizny po laparoskopii bez cech powikłań. Obecna klasyczna <em>Pentada Reynoldsa</em> (triada Charcota: ból + żółtaczka + gorączka/dreszcze ORAZ wstrząs hipotensyjny + zaburzenia świadomości) – zwiastun ostrego ropnego zapalenia dróg żółciowych pod wysokim ciśnieniem!</p>`,
  labs: {
    "Profil wątrobowy i cholestaza": [
      { name: "Bilirubina całkowita", val: "8,6 mg/dl", norm: "< 1,2 mg/dl", flag: "CRIT_HIGH" },
      { name: "Bilirubina bezpośrednia (sprzężona)", val: "7,1 mg/dl", norm: "< 0,3 mg/dl", flag: "CRIT_HIGH" },
      { name: "Fosfataza zasadowa (ALP)", val: "385 U/l", norm: "35 - 105 U/l", flag: "CRIT_HIGH" },
      { name: "Gamma-glutamylotranspeptydaza (GGTP)", val: "420 U/l", norm: "< 40 U/l", flag: "CRIT_HIGH" },
      { name: "Aminotransferaza alaninowa (ALT)", val: "168 U/l", norm: "< 45 U/l", flag: "HIGH" },
      { name: "Aminotransferaza asparaginianowa (AST)", val: "142 U/l", norm: "< 40 U/l", flag: "HIGH" },
      { name: "Amylaza w surowicy", val: "78 U/l", norm: "28 - 100 U/l", flag: "NORMAL" }
    ],
    "Wskaźniki septyczne i hemostaza": [
      { name: "Leukocyty (WBC)", val: "22,4 tys./µl", norm: "4,0 - 10,0 tys./µl", flag: "CRIT_HIGH" },
      { name: "Granulocyty obojętnochłonne (NEUT)", val: "91 % (20,4 tys./µl)", norm: "45 - 70 %", flag: "CRIT_HIGH" },
      { name: "Przesunięcie w lewo (pałeczki)", val: "16 %", norm: "< 5 %", flag: "CRIT_HIGH" },
      { name: "Prokalcytonina (PCT)", val: "18,4 ng/ml", norm: "< 0,5 ng/ml", flag: "CRIT_HIGH" },
      { name: "Białko C-reaktywne (CRP)", val: "215,0 mg/l", norm: "< 5,0 mg/l", flag: "CRIT_HIGH" },
      { name: "Kwas mlekowy (mleczany we krwi)", val: "3,8 mmol/l", norm: "0,5 - 2,0 mmol/l", flag: "CRIT_HIGH" },
      { name: "Płytki krwi (PLT)", val: "110 tys./µl", norm: "150 - 450 tys./µl", flag: "LOW" },
      { name: "Czas protrombinowy (INR)", val: "1,58", norm: "0,9 - 1,2", flag: "HIGH" }
    ],
    "Biochemia nerkowa i gazometria": [
      { name: "Kreatynina w surowicy", val: "2,1 mg/dl", norm: "0,7 - 1,2 mg/dl", flag: "CRIT_HIGH" },
      { name: "Mocznik", val: "78 mg/dl", norm: "15 - 45 mg/dl", flag: "HIGH" },
      { name: "Sód (Na+)", val: "133 mmol/l", norm: "135 - 145 mmol/l", flag: "LOW" },
      { name: "Potas (K+)", val: "4,7 mmol/l", norm: "3,5 - 5,1 mmol/l", flag: "NORMAL" },
      { name: "Gazometria krwi tętniczej pH", val: "7,31", norm: "7,35 - 7,45", flag: "LOW" },
      { name: "HCO3-", val: "18,2 mmol/l", norm: "22 - 26 mmol/l", flag: "LOW" }
    ]
  },
  steps: [
    {
      title: "Krok 1: Identyfikacja triady Charcota i pentady Reynoldsa",
      text: "U 68-letniego pacjenta stwierdzasz ból w prawym podżebrzu, żółtaczkę mechaniczną, gorączkę 39,6°C z dreszczami, a dodatkowo hipotensję 84/48 mmHg i splątanie (GCS 13). Jakie zespoły objawów klinicznych reprezentuje ten stan?",
      options: [
        "Obecna jest triada Charcota (ból + żółtaczka + gorączka/dreszcze), która wraz z hipotensją i zaburzeniami świadomości tworzy Pentadę Reynoldsa – zwiastun piorunującego, ropnego zapalenia dróg żółciowych ze wstrząsem septycznym",
        "Triada Virchowa wskazująca na zatorowość płucną",
        "Triada Becka wskazująca na tamponadę worka osierdziowego",
        "Triada Whipple'a wskazująca na wyspiaka trzustki (insulinoma)"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Triada Charcota (ból w prawym podżebrzu, żółtaczka mechaniczna, gorączka z dreszczami) to klasyczny obraz ostrego zapalenia dróg żółciowych (cholangitis).</strong> Dołączenie dwóch kolejnych cech: wstrząsu hemodynamicznego (hipotensja) oraz zaburzeń świadomości/encefalopatii septycznej tworzy <strong>Pentadę Reynoldsa</strong>, która definiuje ostre zaporowe ropne zapalenie dróg żółciowych (AOSC) o śmiertelności bliskiej 100% bez natychmiastowego odbarczenia!",
        "❌ BŁĄD! <strong>Triada Virchowa</strong> dotyczy czynników ryzyka zakrzepicy żylnej (uszkodzenie śródbłonka, zastój krwi, trombofilia).",
        "❌ BŁĄD! <strong>Triada Becka</strong> dotyczy tamponady serca (hipotensja, ciche tony serca, poszerzenie żył szyjnych).",
        "❌ BŁĄD! <strong>Triada Whipple'a</strong> dotyczy hipoglikemii w insulinoma."
      ]
    },
    {
      title: "Krok 2: Stratyfikacja ciężkości wg Tokyo Guidelines TG18",
      text: "Pacjent ma hipotensję wymagającą wazopresorów (RR 84/48, MAP 60 mmHg), splątanie (GCS 13), kreatyninę 2,1 mg/dl oraz INR 1,58. Do którego stopnia ciężkości kwalifikuje się chory wg wytycznych TG18?",
      options: [
        "Stopień III (Grade III – ciężkie ostre zapalenie dróg żółciowych), z powodu obecności dysfunkcji wielonarządowej (niewydolność krążenia, OUN, nerek i układu krzepnięcia)",
        "Stopień I (Grade I – łagodne zapalenie)",
        "Stopień II (Grade II – umiarkowane zapalenie)",
        "Pacjent nie ma zapalenia dróg żółciowych, to wstrząs kardiogenny"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Według Tokyo Guidelines TG18 Grade III (ciężkie zapalenie dróg żółciowych) definiuje obecność dysfunkcji co najmniej jednego układu narządowego:</strong><br>1. Krążenie (hipotensja na noradrenalinie),<br>2. OUN (zaburzenia świadomości),<br>3. Oddech (PaO2/FiO2 <300),<br>4. Nerki (oliguria lub kreatynina >2,0 mg/dl),<br>5. Wątroba (INR >1,5),<br>6. Krzepnięcie (PLT <100 tys./µl). U Tadeusza występuje dysfunkcja aż czterech narządów!",
        "❌ BŁĄD! <strong>Grade I to zapalenie bez niewydolności narządowej i bez kryteriów stopnia II.</strong>",
        "❌ BŁĄD! <strong>Grade II to zapalenie umiarkowane</strong> (np. wysoka leukocytoza, bilirubina >5 mg/dl, wiek >75 lat), ale BEZ niewydolności narządowej.",
        "❌ BŁĄD! <strong>Masywna cholestaza, wysoka gorączka z PCT 18 ng/ml i triada Charcota jednoznacznie wskazują na sepsę żółciową.</strong>"
      ]
    },
    {
      title: "Krok 3: Resuscytacja hemodynamiczna i wdrożenie antybiotykoterapii ('złota godzina')",
      text: "Tadeusz ma MAP 60 mmHg, mleczany 3,8 mmol/l i cechy wstrząsu septycznego. Jakie są natychmiastowe priorytety resuscytacyjne w pierwszej godzinie na SOR wg wytycznych Surviving Sepsis Campaign?",
      options: [
        "Pilne pobranie posiewów krwi, natychmiastowa płynoterapia krystaloidowa (30 ml/kg PWE w ciągu pierwszych 3 godzin), włączenie wlewu noradrenaliny przy braku powrotu MAP >=65 mmHg oraz dożylna antybiotykoterapia o szerokim spektrum (np. piperacylina z tazobaktamem lub meropenem) w ciągu pierwszej godziny",
        "Wyłącznie podanie doustnego paracetamolu i odroczenie płynoterapii do czasu wykonania ECPW",
        "Przetoczenie 4 jednostek koncentratu krwinek czerwonych bez podawania krystaloidów",
        "Wstrzyknięcie domięśniowe furosemidu w celu wymuszenia diurezy"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Standardem postępowania we wstrząsie septycznym w punkcie wyjścia z dróg żółciowych jest pakiet 'godziny 1':</strong> 1. Pobranie posiewów krwi (przed antybiotykiem), 2. Natychmiastowe podanie bakteriobójczego antybiotyku o szerokim spektrum przeciw pałeczkom Gram-ujemnym i beztlenowcom (<span class='dose-pill'>Piperacylina z tazobaktamem 4,5 g i.v.</span> lub <span class='dose-pill'>Meropenem 1 g i.v.</span>), 3. Resuscytacja płynowa krystaloidami (<span class='dose-pill'>PWE 30 ml/kg i.v.</span>), 4. Wlew wazopresora (<span class='dose-pill'>Noradrenalina w ciągłym wlewie i.v.</span>) w celu utrzymania MAP >=65 mmHg.",
        "❌ BŁĄD! <strong>Doustne leki są nieskuteczne we wstrząsie septycznym;</strong> opóźnienie płynów i antybiotyku zwiększa śmiertelność o kilkanaście procent na każdą godzinę!",
        "❌ BŁĄD! <strong>Hemoglobina wynosi 13,6 g/dl;</strong> przetaczanie krwi jest bezcelowe i niebezpieczne.",
        "❌ BŁĄD! <strong>Podanie furosemidu przy hipowolemii septycznej zniszczy nerki i doprowadzi do natychmiastowego zgonu w mechanizmie wstrząsu!</strong>"
      ]
    },
    {
      title: "Krok 4: Badanie ultrasonograficzne jamy brzusznej na SOR",
      text: "Wykonujesz pilne przyłóżkowe USG jamy brzusznej (POCUS). Pacjent nie ma pęcherzyka żółciowego (stan po cholecystektomii). Jakich zmian w drogach żółciowych spodziewasz się w USG?",
      options: [
        "Masywnego poszerzenia zewnątrzwątrobowych dróg żółciowych (przewód żółciowy wspólny PŻW poszerzony do 14-18 mm) oraz poszerzenia przewodów wewnątrzwątrobowych, z widocznym hiperechogenicznym złogiem dającym cień akustyczny w dystalnym odcinku PŻW",
        "Całkowitego zapadnięcia się przewodu żółciowego wspólnego o średnicy poniżej 2 mm",
        "Prawidłowych, niewidocznych dróg żółciowych bez obecności płynu",
        "Wodonercza lewostronnego z obecnością kamienia w moczowodzie"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>W kamicy przewodowej (choledocholithiasis) złóg blokuje odpływ żółci w okolicy brodawki Vatera, co prowadzi do gwałtownego zastoju pod wysokim ciśnieniem.</strong> W USG stwierdza się poszerzenie przewodu żółciowego wspólnego (PŻW >10-12 mm, u pacjentów po cholecystektomii często >14 mm) oraz wewnątrzwątrobowych dróg żółciowych (obraz 'podwójnej lufy' obok gałęzi żyły wrotnej), a u ok. 50-70% chorych udaje się bezpośrednio uwidocznić złóg w dystalnym PŻW.",
        "❌ BŁĄD! <strong>W przeszkodzie mechanicznej drogi żółciowe ulegają poszerzeniu powyżej przeszkody,</strong> a nie zapadnięciu.",
        "❌ BŁĄD! <strong>Brak poszerzenia dróg przy bilirubinie 8,6 mg/dl występuje jedynie w żółtaczkach miąższowych lub hemolitycznych,</strong> a nie w kamicy przewodowej.",
        "❌ BŁĄD! <strong>Wodonercze dotyczy układu moczowego,</strong> nie ma związku z triadą Charcota."
      ]
    },
    {
      title: "Krok 5: Zabieg z wyboru odbarczający drogi żółciowe (Biliary Decompression)",
      text: "Zgodnie z wytycznymi Tokyo Guidelines TG18, co jest ZŁOTYM STANDARDEM i zabiegiem ratującym życie w ciężkim ostrym zapaleniu dróg żółciowych (Grade III)?",
      options: [
        "Pilne endoskopowe odbarczenie dróg żółciowych metodą ECPW (ERCP) z papillotomią / sfinkterotomią endoskopową i ewakuacją złogów lub protezowaniem dróg żółciowych (stent / ENBD) wykonane w trybie pilnym (<12-24 h)",
        "Otwarta operacja chirurgiczna z nacięciem PŻW (choledochotomia) w znieczuleniu ogólnym",
        "Wstrzyknięcie dożylne 100 ml heparyny celem rozpuszczenia skrzepów w żółci",
        "Kontynuacja samej antybiotykoterapii przez 14 dni bez jakichkolwiek procedur inwazyjnych"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>W ciężkim ostrym zapaleniu dróg żółciowych pod wysokim ciśnieniem (Grade III) śmiertelność bez odbarczenia wynosi blisko 100%.</strong> Pilna endoskopowa cholangiopankreatografia wsteczna (ECPW / ERCP) wykonana natychmiast po wstępnej stabilizacji (<12-24 godzin) ze sfinkterotomią brodawki Vatera i usunięciem złogów lub założeniem stentu żółciowego / drenażu nosowo-żółciowego (ENBD) jest zabiegiem z wyboru ratującym życie. Otwarta chirurgia u niestabilnego chorego wiąże się ze śmiertelnością >30-40%!",
        "❌ BŁĄD! <strong>Otwarta choledochotomia jest zabiegiem drugiego rzutu,</strong> obarczonym ogromną śmiertelnością w fazie sepsy; ECPW jest procedurą małoinwazyjną.",
        "❌ BŁĄD! <strong>Heparyna nie rozpuszcza kamieni żółciowych,</strong> a u chorego z zaburzeniami krzepnięcia (INR 1,58) wywoła śmiertelny krwotok.",
        "❌ BŁĄD! <strong>Sama antybiotykoterapia nie penetruje do zablokowanych dróg żółciowych pod wysokim ciśnieniem</strong> (ciśnienie wydzielnicze wątroby ustaje przy ciśnieniu >30 cm H2O). Bez odbarczenia chory umrze w ciągu kilkunastu godzin!"
      ]
    },
    {
      title: "Krok 6: Przygotowanie do ECPW a zaburzenia hemostazy (rywaroksaban i wysoki INR)",
      text: "Pacjent przyjmuje przewlekle doustny antykoagulant (rywaroksaban – inhibitor czynnika Xa), a jego INR wynosi 1,58 przy PLT 110 tys./µl. Jak bezpiecznie przeprowadzić endoskopowe odbarczenie dróg żółciowych u chorego z ryzykiem krwawienia po nacięciu brodawki?",
      options: [
        "W przypadku pilnej konieczności odbarczenia dróg żółciowych przy zaburzeniach krzepnięcia można założyć plastikowy stent żółciowy lub dren nosowo-żółciowy (ENBD) BEZ wykonywania sfinkterotomii brodawki (nacięcia), co całkowicie eliminuje ryzyko krwawienia i odbarcza ropę pod ciśnieniem",
        "Należy odroczyć zabieg o 7 dni do czasu całkowitej eliminacji rywaroksabanu z ustroju",
        "Wykonać szerokie nacięcie brodawki na długości 2 cm bez podawania preparatów krwi",
        "Podać dożylnie kwas traneksamowy w dawce 10 g i nie badać hemostazy"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>To kluczowa perła kliniczna: odbarczenie dróg żółciowych NIE wymaga obligatoryjnego rozcinania brodawki Vatera (sfinkterotomii)!</strong> U pacjenta na antykoagulacji lub z koagulopatią septyczną (wysoki INR, małopłytkowość) wprowadza się prowadnik przez zwieracz i zakłada plastikowy stent żółciowy (biliary stent) lub dren nosowo-żółciowy (ENBD) bez nacięcia zwieracza. Zapewnia to natychmiastowy odpływ ropnej żółci, ratuje życie przed sepsą i całkowicie unika ryzyka krwawienia. Usunięcie złogu ze sfinkterotomią odkłada się do czasu normalizacji hemostazy.",
        "❌ BŁĄD! <strong>Czekanie 7 dni przy sepsie żółciowej oznacza 100% zgon pacjenta.</strong>",
        "❌ BŁĄD! <strong>Nacięcie brodawki przy aktywnym rywaroksabanie i koagulopatii wywoła masywny krwotok z t. trzustkowo-dwunastniczej.</strong>",
        "❌ BŁĄD! <strong>Kwas traneksamowy w dawce 10 g to toksyczne przedawkowanie (ryzyko drgawek),</strong> a stentowanie bez nacięcia jest znacznie bezpieczniejsze."
      ]
    },
    {
      title: "Krok 7: Zjawisko refluksu żółciowo-żylnego (Cholangio-venous reflux)",
      text: "Dlaczego zablokowanie przewodu żółciowego pod wysokim ciśnieniem prowadzi do tak piorunującej bakteriemii i wstrząsu septycznego w ciągu zaledwie kilku godzin?",
      options: [
        "Gdy ciśnienie w drogach żółciowych przekroczy 25-30 cm H2O, dochodzi do pęknięcia połączeń między kanalikami żółciowymi a zatokami wątrobowymi (tzw. refluks żółciowo-żylny), co powoduje bezpośredni wylew miliardów bakterii i endotoksyn do krążenia wrotnego i ogólnoustrojowego",
        "Bakterie z dróg żółciowych przemieszczają się przez skórę do krwi obwodowej",
        "Bakterie ulegają fotosyntezie pod wpływem promieni słonecznych",
        "Wątroba całkowicie przestaje produkować białka odpornościowe w ciągu 5 minut"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Fizjologiczne ciśnienie wydzielnicze żółci wynosi 15-20 cm H2O.</strong> Gdy przeszkoda w PŻW spowoduje wzrost ciśnienia powyżej 25-30 cm H2O, bariera krew-żółć (połączenia zamykające tight junctions między hepatocytami a kanalikami) ulega mechanicznemu rozerwaniu. Dochodzi do <strong>refluksu żółciowo-żylnego (cholangio-venous reflux)</strong> i bezpośredniego wtłoczenia zakażonej żółci z bakteriami i lipopolisacharydem (LPS) do sinusoid wątrobowych i żyły głównej dolnej, wywołując masywną bakteriemię, burzę cytokinową i wstrząs septyczny.",
        "❌ BŁĄD! <strong>Bakterie nie penetrują przez powłoki skórne.</strong>",
        "❌ BŁĄD! <strong>Bakterie jelitowe nie prowadzą fotosyntezy.</strong>",
        "❌ BŁĄD! <strong>To mechaniczny refluks do naczyń wątroby,</strong> a nie nagłe zatrzymanie produkcji immunoglobulin, jest sednem patofizjologicznym."
      ]
    },
    {
      title: "Krok 8: Postępowanie po udanym odbarczeniu endoskopowym",
      text: "Po założeniu stentu żółciowego w trakcie ECPW z dróg żółciowych wypłynęła pod ciśnieniem mętna, ropna żółć. Pacjent wrócił na OIT, po 12 godzinach ciśnienie tętnicze znormalizowało się, a gorączka spadła do 37,4°C. Jakie są dalsze kroki postępowania?",
      options: [
        "Kontynuacja dożylnej antybiotykoterapii celowanej (na podstawie posiewu żółci i krwi) przez 4-7 dni, nawadnianie, a po pełnym ustabilizowaniu i odstawieniu antykoagulantów planowe usunięcie złogu z PŻW metodą ECPW ze sfinkterotomią",
        "Natychmiastowe odstawienie antybiotyków po ustąpieniu gorączki",
        "Wykonanie natychmiastowej splenektomii w 2. dobie",
        "Pozostawienie stentu żółciowego bezterminowo bez kontroli gastroenterologicznej"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Po odbarczeniu ropy i ustąpieniu wstrząsu septycznego leczenie obejmuje:</strong> celowaną antybiotykoterapię i.v. przez 4-7 dni od opanowania sepsy i odbarczenia, monitorowanie wskaźników cholestazy i stanu zapalnego, a w drugim etapie (po odstawieniu rywaroksabanu lub wyrównaniu hemostazy) planowe ECPW celem usunięcia pozostawionego złogu (ekstrakcja koszykiem Dormia) i usunięcia stentu tymczasowego.",
        "❌ BŁĄD! <strong>Zbyt wczesne odstawienie antybiotyków grozi natychmiastowym nawrotem posocznicy.</strong>",
        "❌ BŁĄD! <strong>Śledziona nie bierze udziału w patogenezie kamicy przewodowej;</strong> splenektomia jest bezsensowna.",
        "❌ BŁĄD! <strong>Plastikowy stent żółciowy zarasta biofilmem bakteryjnym po 2-3 miesiącach,</strong> co doprowadziłoby do ponownego zapalenia dróg żółciowych!"
      ]
    }
  ],
  pathoNodes: [
    {
      badge: "Zastój pod ciśnieniem",
      title: "Obturacja PŻW i wzrost ciśnienia żółci",
      short: "Złóg w bańce wątrobowo-trzustkowej (brodawce Vatera)",
      detail: "Kamień blokuje odpływ żółci. Ciśnienie w przewodach żółciowych gwałtownie rośnie powyżej fizjologicznego progu 20 cm H2O, zatrzymując wydzielanie żółci przez hepatocyty.",
      target: "Przewód żółciowy wspólny (PŻW)",
      drugTarget: "<span class='dose-pill'>Pilne ECPW / ERCP z odbarczeniem</span> mechaniczne zniesienie przeszkody pod ciśnieniem"
    },
    {
      badge: "Zakażenie wstępujące",
      title: "Namnażanie bakterii jelitowych w żółci",
      short: "Flora Gram-ujemna i beztlenowa (E. coli, Klebsiella)",
      detail: "Zastój żółci eliminuje mechanizm samooczyszczania dróg żółciowych. Bakterie wstępujące z dwunastnicy gwałtownie namnażają się, zamieniając zastałą żółć w ropną treść (ropne zapalenie dróg żółciowych).",
      target: "Bakterie Enterobacteriaceae i Bacteroides w żółci",
      drugTarget: "<span class='dose-pill'>Piperacylina z tazobaktamem 4,5 g i.v.</span> lub <span class='dose-pill'>Meropenem 1 g i.v.</span>"
    },
    {
      badge: "Przełamanie bariery",
      title: "Refluks żółciowo-żylny (Cholangio-venous reflux)",
      short: "Przerwanie połączeń zamykających (tight junctions)",
      detail: "Gdy ciśnienie żółci przekroczy 25-30 cm H2O, dochodzi do rozerwania połączeń między kanalikami żółciowymi a zatokami wątrobowymi. Bakterie i endotoksyny (LPS) zostają bezpośrednio wtłoczone do żył wątrobowych.",
      target: "Zatoki wątrobowe i bariera żółć-krew",
      drugTarget: "<span class='dose-pill'>Drenaż dróg żółciowych (stent / ENBD)</span> redukcja ciśnienia <20 cm H2O"
    },
    {
      badge: "Wstrząs septyczny",
      title: "Uogólniona kaskada cytokinowa i wstrząs",
      short: "Pentada Reynoldsa: hipotensja i zaburzenia OUN",
      detail: "Masywna endotoksemia wyzwala wyrzut TNF-alfa, IL-1 i tlenku azotu (NO), prowadząc do rozszerzenia łożyska naczyniowego, krytycznej hipotensji, niedotlenienia tkanek i kwasicy mleczanowej.",
      target: "Naczynia oporowe i perfuzja narządowa",
      drugTarget: "<span class='dose-pill'>PWE 30 ml/kg i.v.</span> + <span class='dose-pill'>Noradrenalina i.v. (cel MAP >=65)</span>"
    }
  ],
  diffTable: {
    title: "⚔️ Tabela Różnicowa: Ostre zapalenie dróg żółciowych vs Inne ostre stany z żółtaczką i bólem brzucha",
    headers: ["Cecha kliniczna", "Ostre zapalenie dróg żółciowych (Cholangitis)", "Ostre zapalenie pęcherzyka żółciowego", "Ostre zapalenie trzustki (żółciopochodne)", "Piorunujące wirusowe zapalenie wątroby", "Guz głowy trzustki (rak zaporowy)"],
    rows: [
      ["Triada objawów wiodących", "Triada Charcota: ból w prawym podżebrzu + żółtaczka + wysoka gorączka z dreszczami", "Ból w prawym podżebrzu + gorączka + objaw Murphy'ego; brak żółtaczki", "Silny ból opasujący nadbrzusza promieniujący do pleców + nudności/wymioty", "Masywna żółtaczka + encefalopatia wątrobowa + skaza krwotoczna; ból mierny", "Bezbólowa narastająca żółtaczka mechaniczna + utrata masy ciała (objaw Courvoisiera)"],
      ["Gorączka i posocznica", "Bardzo wysoka, hektyczna gorączka (39-40°C) z dreszczami i ryzykiem wstrząsu (Pentada)", "Stan podgorączkowy lub gorączka do 38,5°C bez wstrząsu", "Gorączka związana z martwicą/SIRS w 2-3 dobie", "Brak wysokiej gorączki septycznej (chyba że zakażenie wtórne)", "Brak gorączki (chyba że wtórne zapalenie dróg żółciowych)"],
      ["Enzymy wątrobowe i bilirubina", "Wybitna cholestaza: bilirubina >5-10 mg/dl, bardzo wysokie ALP i GGTP", "Bilirubina zwykle w normie (<1,5-2 mg/dl), enzymy cholestatyczne miernie podwyższone", "Bilirubina podwyższona w kamicy PŻW; lipaza/amylaza >3-krotnie podwyższona", "Ekstremalny wzrost aminotransferaz: ALT/AST >1000-5000 U/l, bilirubina wysoka", "Bardzo wysoka bilirubina sprzężona, ALP i GGTP wysokie, ALT/AST w normie"],
      ["Szerokość dróg żółciowych w USG", "Masywne poszerzenie PŻW (>12-18 mm) i przewodów wewnątrzwątrobowych, złóg w PŻW", "Prawidłowa szerokość PŻW (<6-7 mm), powiększony pęcherzyk z pogrubiałą ścianą", "Możliwe poszerzenie PŻW przy zaklinowaniu złogu w brodawce; obrzęk trzustki", "Drogi żółciowe prawidłowe, nieposzerzone; miąższ wątroby obrzęknięty", "Poszerzenie PŻW i przewodu Wirsunga (objaw podwójnego przewodu / double duct sign)"],
      ["Zaburzenia świadomości / wstrząs", "Częste w postaci ostrej ropnej (Pentada Reynoldsa) – wstrząs septyczny", "Wyjątkowo rzadkie (tylko w zgorzelinowej perforacji)", "Wstrząs hipowolemiczny w ciężkim OZT z przesiękiem płynów", "Encefalopatia wątrobowa metaboliczna (wzrost amoniaku)", "Brak zaburzeń świadomości do fazy schyłkowej"],
      ["Postępowanie z wyboru", "Pilne endoskopowe odbarczenie (ECPW / ERCP do 12-24 h) + antybiotyki i.v.", "Wczesna cholecystektomia laparoskopowa (ELC do 72 h)", "Intensywne nawadnianie i.v., analgezja; ECPW tylko w żółtaczkowym OZT z cholangitis", "Leczenie na OIT, N-acetylocysteina, kwalifikacja do pilnego przeszczepu wątroby", "Protezowanie dróg żółciowych (stent samorozprężalny SEMS) lub operacja Whipple'a"]
    ]
  },
  dutySummary: {
    overview: "Ostre zapalenie dróg żółciowych (Acute Cholangitis) to zagrażająca życiu infekcja wstępująca zablokowanych dróg żółciowych pod wysokim ciśnieniem. Najczęstszą przyczyną jest kamica przewodowa (choledocholithiasis ~70%). Wzrost ciśnienia >25 cm H2O wywołuje refluks żółciowo-żylny, powodując piorunującą bakteriemię i wstrząs septyczny (Pentada Reynoldsa). Podstawą terapii jest natychmiastowe odbarczenie dróg żółciowych metodą ECPW (ERCP).",
    diagnostics: "1. Ocena objawów klinicznych: Triada Charcota (ból w prawym podżebrzu + żółtaczka + gorączka z dreszczami) oraz Pentada Reynoldsa (+ wstrząs hipotensyjny i encefalopatia).<br>2. Pilne badania laboratoryjne: próby wątrobowe (wysoka bilirubina z przewagą bezpośredniej, wysokie ALP i GGTP), morfologia (ciężka leukocytoza z pałeczkami), prokalcytonina (PCT >10 ng/ml), mleczany, koagulologia (INR) i parametry nerkowe.<br>3. Posiewy krwi – natychmiastowe pobranie 2-3 zestawów posiewów przed antybiotykiem.<br>4. USG jamy brzusznej (POCUS) – ocena szerokości PŻW (>10-15 mm), poszerzenia dróg wewnątrzwątrobowych i identyfikacja złogu w PŻW.<br>5. TK jamy brzusznej z kontrastem lub MRCP – w razie wątpliwości diagnostycznych u stabilnego pacjenta.",
    drugsAndDoses: "1. Antybiotykoterapia empiryczna o szerokim spektrum (pakiet 1. godziny w sepsie):<br>   - <span class='dose-pill'>Piperacylina z tazobaktamem 4,5 g i.v. co 8 h</span> LUB<br>   - <span class='dose-pill'>Meropenem 1 g i.v. co 8 h</span> (w sepsie ze wstrząsem) LUB<br>   - <span class='dose-pill'>Ceftriakson 2 g i.v. raz na dobę</span> + <span class='dose-pill'>Metronidazol 500 mg i.v. co 8 h</span>.<br>2. Resuscytacja hemodynamiczna: <span class='dose-pill'>Płyn wieloelektrolitowy (PWE) 30 ml/kg i.v.</span> w ciągu pierwszych 3 godzin.<br>3. Leczenie wazopresyjne: <span class='dose-pill'>Noradrenalina w ciągłym wlewie i.v.</span> (cel MAP >=65 mmHg).",
    procedures: "1. Pilna endoskopowa cholangiopankreatografia wsteczna (ECPW / ERCP) – zabieg z wyboru wykonywany natychmiast (<12-24 h od przyjęcia).<br>2. Metody odbarczenia: nacięcie brodawki (sfinkterotomia) i usunięcie złogów koszykiem Dormia LUB wprowadzenie plastikowego stentu żółciowego / drenu nosowo-żółciowego (ENBD) bez nacięcia brodawki u chorych z zaburzeniami hemostazy.<br>3. Przezskórny przezwątrobowy drenaż dróg żółciowych (PTBD) pod kontrolą USG/fluoroskopii – metoda ratunkowa w razie niepowodzenia ECPW.<br>4. Planowa cholecystektomia (jeśli pęcherzyk jest obecny) po wyleczeniu ostrego zapalenia dróg żółciowych.",
    monitoring: "1. Ciągłe monitorowanie parametrów hemodynamicznych (BP, HR, SpO2) i diurezy godzinowej (cewnik Foleya).<br>2. Ocena stężenia mleczanów we krwi tętniczej co 2-4 godziny do czasu normalizacji.<br>3. Monitorowanie powikłań po ECPW: krwawienie z brodawki Vatera, perforacja zaotrzewnowa dwunastnicy, ostre pozabiegowe zapalenie trzustki (PEP).<br>4. Kontrola stężenia bilirubiny i enzymów wątrobowych po zabiegu (spadek bilirubiny potwierdza drożność drenażu)."
  },
  lekQuestions: [
    {
      question: "Klasyczna triada Charcota, charakterystyczna dla ostrego zapalenia dróg żółciowych, obejmuje:",
      options: [
        "Ból w prawym podżebrzu, żółtaczkę mechaniczną oraz gorączkę z dreszczami",
        "Ból głowy, nudności oraz obrzęk tarczy nerwu wzrokowego",
        "Brak tętna, bladość oraz parestezje kończyny dolnej",
        "Hipotensję, ciche tony serca oraz poszerzenie żył szyjnych",
        "Białkomocz, hipoalbuminemię oraz uogólnione obrzęki"
      ],
      correct: 0,
      expl: "Triada Charcota jest klasycznym zespołem objawów ostrego zapalenia dróg żółciowych (cholangitis). Składa się z: 1. Bólu w prawym podżebrzu, 2. Żółtaczki mechanicznej, 3. Wysokiej gorączki z dreszczami. Występuje u około 50-70% pacjentów."
    },
    {
      question: "Pentada Reynoldsa, świadcząca o ostrym ropnym zapaleniu dróg żółciowych i bezpośrednim zagrożeniu życia, powstaje przez dołączenie do triady Charcota:",
      options: [
        "Wstrząsu (hipotensji) oraz zaburzeń świadomości / splątania",
        "Wymiotów krwawych oraz smolistych stolców",
        "Duszności kwasiczej oraz zapachu acetonu z ust",
        "Zatrzymania gazów i stolca oraz objawu chełbotania",
        "Braków tętna na tętnicach obwodowych oraz sinicy kończyn"
      ],
      correct: 0,
      expl: "Pentada Reynoldsa to rozwinięcie triady Charcota o cechy wstrząsu septycznego i encefalopatii: triada Charcota (ból + żółtaczka + gorączka/dreszcze) + hipotensja (wstrząs) + zaburzenia świadomości (splątanie, śpiączka). Wskazuje na obecność ropy pod wysokim ciśnieniem w drogach żółciowych i bez natychmiastowego odbarczenia wiąże się ze 100% śmiertelnością."
    },
    {
      question: "Zabiegiem z wyboru i standardem ratującym życie w ciężkim ostrym zapaleniu dróg żółciowych (Tokyo Guidelines TG18 Grade III) jest:",
      options: [
        "Pilne endoskopowe odbarczenie dróg żółciowych metodą ECPW (ERCP) z papillotomią lub protezowaniem dróg żółciowych",
        "Otwarta cholecystektomia z drenażem jamy otrzewnej",
        "Laparotomia zwiadowcza z resekcją prawej połowy wątroby",
        "Planowe wykonanie MRCP po 6 tygodniach antybiotykoterapii",
        "Doraźne nakłucie śledziony w znieczuleniu miejscowym"
      ],
      correct: 0,
      expl: "Zgodnie z wytycznymi TG18 zabiegiem z wyboru w ciężkim ostrym zapaleniu dróg żółciowych jest pilne odbarczenie endoskopowe drogą ECPW (ERCP). Umożliwia ono natychmiastowe odprowadzenie ropy pod ciśnieniem (przez sfinkterotomię, ekstrakcję kamieni lub założenie stentu żółciowego / drenu nosowo-żółciowego), co prowadzi do szybkiego przerwania bakteriemii."
    },
    {
      question: "Zjawisko refluksu żółciowo-żylnego (cholangio-venous reflux) w ostrym zapaleniu dróg żółciowych polega na:",
      options: [
        "Przerwaniu połączeń zamykających (tight junctions) między kanalikami żółciowymi a naczyniami zatokowymi wątroby przy wzroście ciśnienia żółci >25-30 cm H2O, co prowadzi do masywnego przenikania bakterii do krwiobiegu",
        "Zarastaniu żyły wrotnej przez proces zapalny wychodzący z pęcherzyka",
        "Cofaniu się krwi z żyły głównej dolnej do pęcherzyka żółciowego",
        "Przedostawaniu się żółci do światła żołądka przez odźwiernik",
        "Przetoczeniu zakażonej żółci do aorty brzusznej"
      ],
      correct: 0,
      expl: "Fizjologiczne ciśnienie wydzielnicze żółci to 15-20 cm H2O. Gdy ciśnienie w zablokowanych drogach przekroczy 25-30 cm H2O, dochodzi do mechanicznego rozerwania bariery krew-żółć (tight junctions) w zrazikach wątrobowych. Skutkuje to zjawiskiem refluksu żółciowo-żylnego – masywnym przedostawaniem się bakterii jelitowych i endotoksyn do krążenia ogólnego, wywołując posocznicę i wstrząs."
    },
    {
      question: "Najczęstszą przyczyną ostrego zapalenia dróg żółciowych u dorosłych jest:",
      options: [
        "Kamica przewodu żółciowego wspólnego (choledocholithiasis)",
        "Wrodzone torbiele dróg żółciowych (choroba Carolego)",
        "Zakażenie wirusem zapalenia wątroby typu B",
        "Przypadkowe połknięcie tasiemca uzbrojonego",
        "Przewlekłe stosowanie paracetamolu"
      ],
      correct: 0,
      expl: "Około 70% przypadków ostrego zapalenia dróg żółciowych jest spowodowane kamicą przewodu żółciowego wspólnego (choledocholithiasis) – kamienie przemieszczają się z pęcherzyka żółciowego lub tworzą de novo w drogach żółciowych, blokując ujście w brodawce Vatera. Inne przyczyny to łagodne i nowotworowe zwężenia oraz zablokowane stenty."
    },
    {
      question: "U pacjenta z ciężkim zapaleniem dróg żółciowych przyjmującego przewlekle doustny antykoagulant (np. rywaroksaban) z wysokim ryzykiem krwawienia, najbezpieczniejszą metodą natychmiastowego odbarczenia dróg w ECPW jest:",
      options: [
        "Wprowadzenie plastikowego stentu żółciowego lub drenu nosowo-żółciowego (ENBD) bez wykonywania sfinkterotomii brodawki",
        "Wykonanie szerokiego rozcięcia brodawki Vatera nożem igłowym",
        "Odroczenie odbarczenia o 5 dni do czasu całkowitego odstawienia leku",
        "Natychmiastowe otwarcie brzucha i wycięcie brodawki Vatera",
        "Podanie leków fibrynolitycznych w celu rozpuszczenia skrzepów"
      ],
      correct: 0,
      expl: "Odbarczenie dróg żółciowych nie wymaga sfinkterotomii (nacięcia brodawki). U chorych z koagulopatią lub przyjmujących antykoagulanty wprowadza się przez nienaciętą brodawkę plastikowy stent żółciowy lub dren nosowo-żółciowy (ENBD). Zapewnia to natychmiastowy drenaż ropy, opanowanie wstrząsu i całkowicie eliminuje ryzyko krwotoku."
    },
    {
      question: "Który zestaw bakterii jest najczęściej odpowiedzialny za ostre zakażenie dróg żółciowych?",
      options: [
        "Escherichia coli, Klebsiella pneumoniae, Enterococcus faecalis oraz Bacteroides fragilis",
        "Mycobacterium tuberculosis i Legionella pneumophila",
        "Treponema pallidum i Neisseria gonorrhoeae",
        "Streptococcus pneumoniae i Mycoplasma pneumoniae",
        "Staphylococcus epidermidis w monoterapii"
      ],
      correct: 0,
      expl: "Zakażenie dróg żółciowych ma niemal zawsze charakter wstępujący z dwunastnicy i jest florą mieszaną: dominują pałeczki jelitowe Gram-ujemne (Escherichia coli ~40%, Klebsiella pneumoniae ~20%), enterokoki (Enterococcus ~15%) oraz beztlenowce (Bacteroides fragilis, Clostridium)."
    },
    {
      question: "Zgodnie z wytycznymi Tokyo Guidelines (TG18) kryterium definiującym ciężkie zapalenie dróg żółciowych (Grade III) jest:",
      options: [
        "Obecność dysfunkcji co najmniej jednego narządu (krążenia, OUN, oddechowego, nerek, wątroby lub krzepnięcia)",
        "Stwierdzenie złogu o średnicy powyżej 5 mm w USG",
        "Wiek pacjenta poniżej 40. roku życia",
        "Utrzymywanie się bólu brzucha dłużej niż 12 godzin",
        "Podwyższona aktywność transaminaz (ALT) powyżej 50 U/l"
      ],
      correct: 0,
      expl: "Stopień III (Grade III) w klasyfikacji ciężkości TG18 definiowany jest przez wystąpienie dysfunkcji narządowej w przynajmniej jednym z 6 układów: układ krążenia (hipotensja wymagająca dopaminy/noradrenaliny), OUN (zaburzenia świadomości), układ oddechowy (PaO2/FiO2 <300), nerki (kreatynina >2 mg/dl), wątroba (INR >1,5) lub układ krzepnięcia (płytki <100 tys./µl)."
    },
    {
      question: "W przypadku braku możliwości wykonania ECPW (np. u pacjenta po operacji Roux-en-Y lub z naciekiem nowotworowym dwunastnicy) alternatywną metodą pilnego odbarczenia dróg żółciowych jest:",
      options: [
        "Przezskórny przezwątrobowy drenaż dróg żółciowych (PTBD / PTD)",
        "Założenie sondy żołądkowej Sengstakena-Blakemore'a",
        "Punkcja lędźwiowa z drenażem płynu m-r",
        "Intubacja dotchawicza i wentylacja z wysokim PEEP",
        "Wstrzyknięcie glukagonu podskórnie"
      ],
      correct: 0,
      expl: "Gdy ECPW jest niemożliwe z przyczyn anatomicznych (zmieniona anatomia po operacjach żołądka/jelit, naciek nowotworowy brodawki), metodą ratunkową z wyboru jest przezskórny przezwątrobowy drenaż dróg żółciowych (PTBD – Percutaneous Transhepatic Biliary Drainage) wykonywany pod kontrolą USG i fluoroskopii."
    },
    {
      question: "Wskaż fałszywe stwierdzenie dotyczące ostrego zapalenia dróg żółciowych:",
      options: [
        "Antybiotykoterapia bez mechanicznego odbarczenia dróg żółciowych jest w pełni wystarczająca do wyleczenia ostrego ropnego zapalenia dróg żółciowych",
        "Posiewy krwi są dodatnie u ponad 40-50% pacjentów z zapaleniem dróg żółciowych",
        "Bilirubina w surowicy wzrasta głównie w frakcji sprzężonej (bezpośredniej)",
        "Kamica przewodu żółciowego może rozwinąć się u pacjenta po uprzednio przebytej cholecystektomii",
        "Podstawą leczenia wstrząsu septycznego w cholangitis jest agresywna resuscytacja płynowa krystaloidami"
      ],
      correct: 0,
      expl: "Stwierdzenie pierwsze jest fałszywe. Przy zablokowanych drogach żółciowych i ciśnieniu >25-30 cm H2O antybiotyki nie penetrują do światła przewodów żółciowych w stężeniach terapeutycznych. Sama antybiotykoterapia bez odbarczenia zaporowej żółci i ropy jest nieskuteczna i prowadzi do zgonu chorego we wstrząsie septycznym."
    },
    {
      question: "Jaki jest cel docelowy średniego ciśnienia tętniczego (MAP) w resuscytacji płynowej i aminowej we wstrząsie septycznym w przebiegu cholangitis wg Surviving Sepsis Campaign?",
      options: [
        "MAP >= 65 mmHg",
        "MAP >= 100 mmHg",
        "MAP między 40 a 50 mmHg",
        "Ciśnienie skurczowe dokładnie 180 mmHg",
        "Parametr MAP nie ma znaczenia klinicznego"
      ],
      correct: 0,
      expl: "Wytyczne Surviving Sepsis Campaign (SSC) jednoznacznie wskazują, że celem hemodynamicznym w resuscytacji sepsy i wstrząsu septycznego jest osiągnięcie i utrzymanie średniego ciśnienia tętniczego (MAP – Mean Arterial Pressure) na poziomie co najmniej 65 mmHg, co zapewnia prawidłową autoregulację i perfuzję narządów życiowo ważnych (mózg, nerki, serce)."
    }
  ],
  flashcards: [
    {
      front: "Co wchodzi w skład triady Charcota w ostrym zapaleniu dróg żółciowych?",
      back: "1. Ból w prawym podżebrzu\n2. Żółtaczka mechaniczna\n3. Wysoka gorączka z dreszczami."
    },
    {
      front: "Co to jest Pentada Reynoldsa i o czym świadczy?",
      back: "Triada Charcota (ból + żółtaczka + gorączka/dreszcze) + Wstrząs (hipotensja) + Zaburzenia świadomości (splątanie).\nŚwiadczy o ostrym ropnym zapaleniu dróg żółciowych pod wysokim ciśnieniem (100% śmiertelność bez natychmiastowego odbarczenia!)."
    },
    {
      front: "Jaki jest zabieg z wyboru i złoty standard leczenia ostrego zapalenia dróg żółciowych?",
      back: "Pilne endoskopowe odbarczenie dróg żółciowych metodą ECPW (ERCP) z papillotomią/sfinkterotomią lub protezowaniem (stent/ENBD) w ciągu pierwszych 12-24 h."
    },
    {
      front: "Jak bezpiecznie odbarczyć drogi żółciowe w ECPW u pacjenta z zaburzeniami krzepnięcia krwi (np. na rywaroksabanie)?",
      back: "Założyć plastikowy stent żółciowy lub dren nosowo-żółciowy (ENBD) BEZ nacinania brodawki (bez sfinkterotomii). Odbarcza to ropę pod ciśnieniem i całkowicie eliminuje ryzyko krwawienia."
    },
    {
      front: "Na czym polega zjawisko refluksu żółciowo-żylnego (cholangio-venous reflux)?",
      back: "Wzrost ciśnienia żółci >25-30 cm H2O rozrywa połączenia zamykające między kanalikami a zatokami wątroby, wtłaczając zakażoną żółć i bakterie bezpośrednio do krwiobiegu (piorunująca posocznica)."
    },
    {
      front: "Jakie antybiotyki empiryczne dożylne zaleca się w sepsie w przebiegu cholangitis?",
      back: "Piperacylina z tazobaktamem (4,5 g i.v. co 8 h) LUB Meropenem (1 g i.v. co 8 h) LUB Ceftriakson (2 g i.v.) + Metronidazol (500 mg i.v.)."
    }
  ]
};

// Mirror fields for schema compatibility
case128.steps.forEach(step => {
  step.question = step.title;
  step.explanation = step.feedback;
});
case128.lekQuestions.forEach(q => {
  q.opts = q.options;
  q.correctIdx = q.correct;
  q.exp = q.expl;
});

saveCase(case128);

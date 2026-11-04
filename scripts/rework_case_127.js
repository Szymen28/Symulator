const fs = require('fs');
const path = require('path');
const { encryptStringAes } = require('./encrypt_case.js');

const MASTER_KEY = '@LEKSzymon28111999';
const CASES_DIR = path.join(__dirname, '..', 'cases');

console.log("Generating Case 127: Ostre kamicze zapalenie pęcherzyka żółciowego...");

async function saveCase(caseData) {
  const filePath = path.join(CASES_DIR, caseData.filename);
  const jsonStr = JSON.stringify(caseData, null, 2);
  const encrypted = await encryptStringAes(jsonStr, MASTER_KEY);
  fs.writeFileSync(filePath, JSON.stringify(encrypted, null, 2), 'utf8');
  console.log(`[SAVED] Case #${caseData.id}: ${caseData.filename} (LEK Qs: ${caseData.lekQuestions.length}, Steps: ${caseData.steps.length}, Flashcards: ${caseData.flashcards.length})`);
}

const case127 = {
  id: 127,
  filename: "127_ostre_zapalenie_pecherzyka_zolciowego.json",
  dept: "Chirurgia ogólna",
  shortTitle: "52-letnia Grażyna – Ostry ból prawego podżebrza po tłustym posiłku, objaw Murphy'ego i gorączka (Ostre kamicze zapalenie pęcherzyka żółciowego)",
  diagnosisTitle: "Ostre kamicze zapalenie pęcherzyka żółciowego (Acute Calculous Cholecystitis – stopień II wg Tokyo Guidelines TG18) ze złogiem uwięźniętym w szyjce pęcherzyka",
  vitals: [
    { label: "Temperatura ciała", val: "38,7 °C", sub: "Gorączka septyczna w ostrej fazie zapalenia", status: "vital-crit" },
    { label: "Częstość akcji serca (HR)", val: "108/min", sub: "Tachykardia zatokowa z bólu i gorączki", status: "vital-warn" },
    { label: "Białko C-reaktywne (CRP)", val: "135,0 mg/l", sub: "Wysoki ogólnoustrojowy odczyn zapalny", status: "vital-crit" },
    { label: "Objaw Murphy'ego", val: "Wyraźnie dodatni", sub: "Zatrzymanie wdechu przy palpacji prawego podżebrza", status: "vital-crit" }
  ],
  vitalsObj: { hr: 108, bp: "138/85", spo2: 97, rr: 20, temp: 38.7, gcs: 15 },
  story: `<p><strong>Pacjentka:</strong> 52-letnia Grażyna (BMI 32 kg/m², otyłość I stopnia) zgłosiła się na szpitalny oddział ratunkowy z powodu silnego, nieustępującego od ponad 28 godzin bólu w prawym podżebrzu, promieniującego pod prawą łopatkę, wysokiej gorączki z dreszczami oraz wielokrotnych wymiotów treścią żołądkową i żółciową.</p><p><strong>Wywiad chorobowy:</strong> Dolegliwości rozpoczęły się wczoraj wieczorem, około 2 godziny po obfitej kolacji (smażony schabowy z kapustą). Początkowo pacjentka sądziła, że to kolejny, typowy napad kolki żółciowej, na które miewała sporadyczne epizody w ciągu ostatnich 3 lat (dotychczas ból ustępował samoistnie po 2-4 godzinach i przyjęciu drotaweryny). Tym razem ból nie ustąpił, lecz stał się stały, piekący i pulsujący, nasilający się przy każdym głębszym wdechu i ruchu. W nocy dołączyły dreszcze i gorączka do 38,8°C. Leki rozkurczowe i paracetamol nie przyniosły żadnej poprawy. W wywiadzie: nadciśnienie tętnicze leczone amlodypiną, stan po dwóch ciążach, brak innych operacji brzusznych.</p><p><strong>Badanie przedmiotowe na SOR:</strong> Kobieta z widocznym cierpieniem, spłycony tor oddechowy z powodu bólu w prawym podżebrzu. Skóra i twardówki bez żółtaczki (twardówki białe). Brzuch wysklepiony powyżej poziomu klatki piersiowej (otyłość brzuszna), symetryczny. W prawym podżebrzu obecna wyraźna bolesność palpacyjna, miejscowa obrona mięśniowa oraz silnie dodatni objaw Murphy'ego (podczas głębokiego wdechu przy palpacji pod prawym łukiem żebrowym dochodzi do nagłego zatrzymania wdechu z powodu ostrego bólu). Dodatni objaw Chełmońskiego (bolesność przy wstrząsaniu prawego łuku żebrowego). W badaniu palpacyjnym pod prawym łukiem wyczuwalny bolesny, napięty opór (powiększony, zablokowany pęcherzyk żółciowy). Objaw Blumberga ujemny w pozostałych kwadrantach brzucha, perystaltyka jelitowa leniwa. Objaw Goldflama obustronnie ujemny.</p>`,
  labs: {
    "Morfologia i wskaźniki zapalne": [
      { name: "Leukocyty (WBC)", val: "16,4 tys./µl", norm: "4,0 - 10,0 tys./µl", flag: "CRIT_HIGH" },
      { name: "Granulocyty obojętnochłonne (NEUT)", val: "85 % (13,9 tys./µl)", norm: "45 - 70 %", flag: "CRIT_HIGH" },
      { name: "Przesunięcie w lewo (pałeczki)", val: "10 %", norm: "< 5 %", flag: "HIGH" },
      { name: "Białko C-reaktywne (CRP)", val: "135,0 mg/l", norm: "< 5,0 mg/l", flag: "CRIT_HIGH" },
      { name: "Prokalcytonina (PCT)", val: "0,65 ng/ml", norm: "< 0,50 ng/ml", flag: "HIGH" },
      { name: "Hemoglobina (Hb)", val: "13,6 g/dl", norm: "12,0 - 16,0 g/dl", flag: "NORMAL" },
      { name: "Płytki krwi (PLT)", val: "290 tys./µl", norm: "150 - 450 tys./µl", flag: "NORMAL" }
    ],
    "Profil wątrobowy i enzymy trzustkowe (wykluczenie zapalenia dróg żółciowych i OZT)": [
      { name: "Bilirubina całkowita", val: "1,3 mg/dl", norm: "< 1,2 mg/dl", flag: "NORMAL" },
      { name: "Bilirubina bezpośrednia", val: "0,4 mg/dl", norm: "< 0,3 mg/dl", flag: "NORMAL" },
      { name: "Fosfataza zasadowa (ALP)", val: "115 U/l", norm: "35 - 105 U/l", flag: "HIGH" },
      { name: "Gamma-glutamylotranspeptydaza (GGTP)", val: "68 U/l", norm: "< 40 U/l", flag: "HIGH" },
      { name: "Aminotransferaza alaninowa (ALT)", val: "42 U/l", norm: "< 35 U/l", flag: "HIGH" },
      { name: "Aminotransferaza asparaginianowa (AST)", val: "38 U/l", norm: "< 35 U/l", flag: "NORMAL" },
      { name: "Amylaza w surowicy", val: "62 U/l", norm: "28 - 100 U/l", flag: "NORMAL" },
      { name: "Lipaza w surowicy", val: "45 U/l", norm: "13 - 60 U/l", flag: "NORMAL" }
    ],
    "Biochemia i parametry nerkowe": [
      { name: "Kreatynina w surowicy", val: "0,82 mg/dl", norm: "0,50 - 0,90 mg/dl", flag: "NORMAL" },
      { name: "Sód (Na+)", val: "139 mmol/l", norm: "135 - 145 mmol/l", flag: "NORMAL" },
      { name: "Potas (K+)", val: "3,9 mmol/l", norm: "3,5 - 5,1 mmol/l", flag: "NORMAL" },
      { name: "INR", val: "1,04", norm: "0,9 - 1,2", flag: "NORMAL" }
    ]
  },
  steps: [
    {
      title: "Krok 1: Weryfikacja kryteriów diagnostycznych Tokyo Guidelines (TG18)",
      text: "Pacjentka prezentuje ostry ból w prawym podżebrzu z dodatnim objawem Murphy'ego, gorączkę 38,7°C, leukocytozę 16,4 tys./µl oraz CRP 135 mg/l. Jakie kryteria według wytycznych Tokyo Guidelines TG18 są wymagane do postawienia pewnego rozpoznania ostrego zapalenia pęcherzyka żółciowego?",
      options: [
        "Kryteria TG18 wymagają jednoczesnego spełnienia cech z trzech grup: A (miejscowe objawy zapalne: objaw Murphy'ego lub bolesny opór w prawym podżebrzu) + B (ogólnoustrojowe objawy zapalne: gorączka, wysokie CRP lub leukocytoza) + C (cechy ostrego zapalenia w badaniu obrazowym, np. USG)",
        "Wymagane jest wyłącznie stwierdzenie żółtaczki z bilirubiną >10 mg/dl",
        "Wystarczy obecność bezobjawowych kamieni w pęcherzyku w USG bez objawów klinicznych",
        "Konieczne jest wykonanie otwartej biopsji wątroby"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Tokyo Guidelines 2018 (TG18) definiują rozpoznanie ostrego zapalenia pęcherzyka żółciowego na podstawie triady kryteriów:</strong><br>A. Miejscowe objawy zapalne: objaw Murphy'ego, ból, bolesność palpacyjna lub opór w prawym podżebrzu.<br>B. Ogólnoustrojowe objawy zapalne: gorączka (>38°C), leukocytoza lub podwyższone CRP.<br>C. Potwierdzenie obrazowe (USG/TK/MRCP). Rozpoznanie pewne stawia się przy obecności A + B + C.",
        "❌ BŁĄD! <strong>Żółtaczka nie jest typowym objawem niepowikłanego zapalenia pęcherzyka;</strong> jej obecność wskazuje na jednoczesną kamicę przewodową (choledocholithiasis), zapalenie dróg żółciowych (cholangitis) lub zespół Mirizziego.",
        "❌ BŁĄD! <strong>Bezobjawowa kamica żółciowa nie spełnia kryteriów ostrego zapalenia i nie wymaga operacji.</strong>",
        "❌ BŁĄD! <strong>Biopsja wątroby jest całkowicie zbędna i groźna w ostrym zapaleniu pęcherzyka.</strong>"
      ]
    },
    {
      title: "Krok 2: Badanie ultrasonograficzne (USG) jamy brzusznej – cechy patognomoniczne",
      text: "Zlecasz pilne badanie USG jamy brzusznej. Jakie cechy sonograficzne potwierdzają ostre zapalenie pęcherzyka żółciowego?",
      options: [
        "Pogrubienie ściany pęcherzyka żółciowego >4 mm, rozwarstwienie ściany (zjawisko podwójnego konturu), obecność uwięźniętego złogu w szyjce lub przewodzie pęcherzykowym, płyn w loży pęcherzyka oraz sonograficzny objaw Murphy'ego",
        "Cienka ściana pęcherzyka (<2 mm) i obkurczony pęcherzyk bez zawartości płynowej",
        "Poszerzenie przewodu żółciowego wspólnego (PŻW) do 20 mm bez obecności kamieni",
        "Obecność pęcherzyków gazu w żyle głównej dolnej"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Główne ultrasonograficzne kryteria ostrego zapalenia pęcherzyka żółciowego (TG18) obejmują:</strong> 1. Pogrubienie ściany pęcherzyka >4-5 mm, 2. Obrzęk i rozwarstwienie ściany ('objaw podwójnego konturu' / double-rim sign), 3. Uwięźnięty złóg w szyjce pęcherzyka lub przewodzie pęcherzykowym (brak przemieszczania przy zmianie pozycji ciała), 4. Sonograficzny objaw Murphy'ego (maksymalny ból wywołany bezpośrednim uciskiem pęcherzyka głowicą USG), 5. Płyn w loży pęcherzyka (pericholecystic fluid) oraz powiększenie wymiarów pęcherzyka (>8x4 cm).",
        "❌ BŁĄD! <strong>Cienka ściana (<2 mm) to cecha zdrowego pęcherzyka żółciowego.</strong>",
        "❌ BŁĄD! <strong>Poszerzenie PŻW do 20 mm sugeruje przeszkodę w przewodzie żółciowym wspólnym (kamica przewodowa, guz brodawki Vatera),</strong> a nie izolowane zapalenie pęcherzyka.",
        "❌ BŁĄD! <strong>Gaz w żyle głównej to objaw zatoru powietrznego,</strong> a nie cecha USG pęcherzyka."
      ]
    },
    {
      title: "Krok 3: Różnicowanie z kolką żółciową",
      text: "Pacjentka wielokrotnie miewała kolkę żółciową. Jaka jest fundamentalna różnica w przebiegu klinicznym i patofizjologii między niepowikłaną kolką żółciową a ostrym zapaleniem pęcherzyka żółciowego?",
      options: [
        "Kolka żółciowa to ból przemijający, trwający zazwyczaj poniżej 4-6 godzin, bez gorączki i bez leukocytozy (przejściowy skurcz); w ostrym zapaleniu złóg trwale więźnie w szyjce pęcherzyka, ból trwa stale >6-24 godzin, dołącza gorączka, leukocytoza i zapalenie ściany",
        "W kolce żółciowej temperatura ciała przekracza 40°C, a w zapaleniu pęcherzyka wynosi zawsze <36°C",
        "Kolka żółciowa wymaga natychmiastowej laparotomii, a ostre zapalenie leczy się wyłącznie dietą",
        "Nie ma żadnych różnic, to są synonimy tej samej jednostki chorobowej"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>W niepowikłanej kolce żółciowej (biliary colic) złóg przejściowo zatyka ujście pęcherzyka w czasie skurczu wywołanego cholecystokininą (CCK po posiłku),</strong> po czym samoistnie cofa się do dna pęcherzyka – ból ma charakter fali, trwa zwykle od 30 min do 4-6 h, nie ma gorączki ani podwyższonych parametrów zapalnych. Gdy złóg ulegnie trwałemu zaklinowaniu, dochodzi do niedokrwienia, jałowego a potem bakteryjnego zapalenia ściany – ból trwa stale >6-12 h i dołączają objawy ogólne (gorączka, leukocytoza, wysokie CRP).",
        "❌ BŁĄD! <strong>W kolce żółciowej nie ma gorączki;</strong> gorączka i dreszcze świadczą o powikłaniu zapalnym.",
        "❌ BŁĄD! <strong>Kolka jest wskazaniem do planowej cholecystektomii,</strong> a ostre zapalenie wymaga pilnej hospitalizacji i operacji w trybie ostrym.",
        "❌ BŁĄD! <strong>To odrębne stany kliniczne o zupełnie innym postępowaniu i rokowaniu.</strong>"
      ]
    },
    {
      title: "Krok 4: Klasyfikacja ciężkości wg Tokyo Guidelines (Grade I, II, III)",
      text: "U Grażyny objawy trwają 28 godzin, leukocytoza wynosi 16,4 tys./µl, wyczuwalny jest bolesny opór w prawym podżebrzu, ale parametry nerkowe, krążeniowe (BP 138/85), oddechowe (SpO2 97%) i neurologiczne (GCS 15) są prawidłowe. Do którego stopnia ciężkości (Severity Grade) kwalifikuje się pacjentka wg TG18?",
      options: [
        "Stopień II (Grade II – umiarkowane zapalenie pęcherzyka żółciowego), charakteryzujący się brakiem niewydolności narządowej, ale obecnością cech nasilonego zapalenia miejscowego (wyczuwalny opór pod łukiem, leukocytoza)",
        "Stopień I (Grade I – łagodne zapalenie)",
        "Stopień III (Grade III – ciężkie zapalenie z niewydolnością wielonarządową)",
        "Stan agonalny wymagający natychmiastowego ECMO"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Według Tokyo Guidelines TG18:</strong><br>- <strong>Grade III (ciężkie):</strong> ostre zapalenie z dysfunkcją co najmniej jednego narządu (krążenie, OUN, oddech, nerki, wątroba, krzepnięcie).<br>- <strong>Grade II (umiarkowane):</strong> brak dysfunkcji narządowej, ale obecność co najmniej jednej z cech: WBC >18 tys., wyczuwalny opór w prawym podżebrzu, czas trwania objawów >72 h, wyraźne zapalenie miejscowe (zgorzel, ropień).<br>- <strong>Grade I (łagodne):</strong> brak kryteriów dla Grade II i III u pacjenta stabilnego.",
        "❌ BŁĄD! <strong>Wyczuwalny opór i wysokie wskaźniki zapalne kwalifikują chorą do stopnia umiarkowanego (Grade II).</strong>",
        "❌ BŁĄD! <strong>Grade III wymaga dysfunkcji narządowej (np. hipotensji na aminach, dializoterapii, trombocytopenii <100 tys., encefalopatii).</strong>",
        "❌ BŁĄD! <strong>Pacjentka jest przytomna, stabilna krążeniowo, nie ma wskazań do ECMO.</strong>"
      ]
    },
    {
      title: "Krok 5: Optymalny czas wykonania cholecystektomii (Timing of Cholecystectomy)",
      text: "Jaki jest optymalny czas wykonania cholecystektomii laparoskopowej u chorych z ostrym zapaleniem pęcherzyka żółciowego (Grade I i II) wg aktualnych wytycznych Tokyo Guidelines TG18 i WSES?",
      options: [
        "Wczesna cholecystektomia laparoskopowa (Early Laparoscopic Cholecystectomy – ELC) wykonana jak najszybciej od przyjęcia, najlepiej w ciągu pierwszych 72 godzin od początku objawów (dopuszczalna do 7-10 dni)",
        "Zawsze odroczenie zabiegu o 6-8 tygodni ('leczenie na zimno') po uprzedniej 2-miesięcznej antybiotykoterapii",
        "Wykonanie operacji dopiero w przypadku perforacji pęcherzyka do jamy otrzewnej",
        "Operację należy wykonać dokładnie po 1 roku od pierwszego ataku kolki"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Współczesne wytyczne oparte na EBM (TG18, WSES) jednoznacznie rekomendują WCZESNĄ cholecystektomię laparoskopową (ELC) przeprowadzoną jak najszybciej, optymalnie w ciągu pierwszych 72 godzin od początku objawów.</strong> W tym wczesnym oknie czasowym obrzęk tkanek ułatwia preparowanie w trójkącie Calota (tkanki rozwarstwiają się 'na tępo'), co skutkuje mniejszą liczbą powikłań, krótszą hospitalizacją i mniejszym odsetkiem konwersji do laparotomii niż odraczanie operacji na 6-8 tygodni.",
        "❌ BŁĄD! <strong>Strategia rutynowego odraczania operacji o 6-8 tygodni jest przestarzała;</strong> badania wykazały, że u 20% chorych leczonych zachowawczo dochodzi do nawrotu lub ciężkich powikłań w okresie oczekiwania.",
        "❌ BŁĄD! <strong>Czekanie na perforację pęcherzyka to doprowadzenie do rozlanego żółciowego zapalenia otrzewnej i sepsy ze śmiertelnością sięgającą kilkunastu procent.</strong>",
        "❌ BŁĄD! <strong>Roczne odraczanie zabiegu w ostrym stanie zapalnym jest niedopuszczalne.</strong>"
      ]
    },
    {
      title: "Krok 6: Postępowanie w przypadku braku kwalifikacji do znieczulenia ogólnego (np. Grade III u chorego obciążonego)",
      text: "Gdyby pacjentka była w podeszłym wieku, z ciężką niewydolnością serca, we wstrząsie septycznym i z bezwzględnymi przeciwwskazaniami anestezjologicznymi do pilnej operacji w narkozie, jaką procedurę ratunkową zaleca TG18?",
      options: [
        "Przezskórną przezwątrobową cholecystostomię (PTGBD – Percutaneous Transhepatic Gallbladder Drainage) pod kontrolą USG w znieczuleniu miejscowym celem odbarczenia ropy pod ciśnieniem",
        "Natychmiastową laparotomię z cięcia podżebrowego Kochera w znieczuleniu miejscowym",
        "Podanie leków rozpuszczających kamienie (kwas ursodeoksycholowy) dożylnie",
        "Wlew przeczyszczający i leczenie uzdrowiskowe wodami mineralnymi"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>U chorych z ostrym zapaleniem pęcherzyka o wysokim ryzyku operacyjnym (Grade III, ciężka sepsa, ASA IV, wstrząs) zabiegiem ratującym życie jest przezskórny drenaż pęcherzyka żółciowego (PTGBD).</strong> Pod kontrolą USG nakłuwa się pęcherzyk przez miąższ wątroby (co zapobiega wyciekowi żółci do otrzewnej) i wprowadza cewnik typu 'pig-tail', co odbarcza zakażoną żółć i ropę, umożliwiając opanowanie posocznicy.",
        "❌ BŁĄD! <strong>Otwarta laparotomia u niestabilnego hemodynamicznie chorego z ciężką niewydolnością narządową wiąże się ze śmiertelnością rzędu 30-50%.</strong>",
        "❌ BŁĄD! <strong>Kwas UDCA działa powoli (miesiące/lata) i nie rozpuszcza kamieni w zablokowanym ropniaku pęcherzyka.</strong>",
        "❌ BŁĄD! <strong>Zabiegi uzdrowiskowe są absurdalne w sepsie brzusznej.</strong>"
      ]
    },
    {
      title: "Krok 7: Zabezpieczenie dróg żółciowych podczas cholecystektomii – Critical View of Safety (CVS)",
      text: "W trakcie laparoskopowej cholecystektomii chirurg preparuje pole operacyjne. Jaka technika preparowania struktur trójkąta Calota jest uznana za międzynarodowy standard zapobiegający jatrogennemu uszkodzeniu przewodu żółciowego wspólnego (BDI)?",
      options: [
        "Krytyczny Widok Bezpieczeństwa (Critical View of Safety – CVS wg Strasberga), wymagający oczyszczenia trójkąta wątrobowo-pęcherzykowego z tkanki tłuszczowej, odpreparowania dolnej 1/3 pęcherzyka od łoża wątroby i uwidocznienia DOKŁADNIE DWÓCH struktur wchodzących do pęcherzyka: tętnicy pęcherzykowej i przewodu pęcherzykowego",
        "Szybkie założenie klipsów na wszystkie pasma tkankowe w okolicy wnęki wątroby bez preparowania",
        "Identyfikacja przewodu żółciowego wspólnego i przecięcie go tuż pod pęcherzykiem",
        "Wprowadzenie noża harmonicznego w głąb miąższu wątroby"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Koncepcja Critical View of Safety (CVS) wprowadzona przez Strasberga jest kardynalną zasadą bezpieczeństwa cholecystektomii.</strong> Wymaga spełnienia 3 kryteriów przed założeniem klipsów i przecięciem jakiejkolwiek struktury:<br>1. Trójkąt wątrobowo-pęcherzykowy (Calota) jest całkowicie oczyszczony z tkanki tłuszczowej i włóknistej.<br>2. Dolna 1/3 pęcherzyka żółciowego jest odpreparowana od łoża wątroby (płytki pęcherzykowej).<br>3. Widoczne są DOKŁADNIE i WYŁĄCZNIE dwie struktury wnikające do pęcherzyka: przewód pęcherzykowy (cystic duct) i tętnica pęcherzykowa (cystic artery). Spełnienie CVS redukuje jatrogenne uszkodzenia dróg żółciowych niemal do zera.",
        "❌ BŁĄD! <strong>Ślepe klipsowanie struktur to główna przyczyna jatrogennego zaklipowania i przecięcia przewodu żółciowego wspólnego (BDI) lub prawej tętnicy wątrobowej!</strong>",
        "❌ BŁĄD! <strong>Przecięcie przewodu żółciowego wspólnego to katastrofalne powikłanie wymagające natychmiastowej rekonstrukcji (zespolenia Roux-en-Y).</strong>",
        "❌ BŁĄD! <strong>Cięcie miąższu wątroby grozi masywnym krwotokiem.</strong>"
      ]
    },
    {
      title: "Krok 8: Antybiotykoterapia empiryczna i postępowanie pooperacyjne",
      text: "Grażyna ma wdrożoną płynoterapię. Jaka antybiotykoterapia dożylna jest rekomendowana w stopniu umiarkowanym (Grade II) ostrego kamiczego zapalenia pęcherzyka żółciowego wg TG18?",
      options: [
        "Cefalosporyna III generacji (np. Ceftriakson 2 g i.v. raz na dobę) w skojarzeniu z Metronidazolem (500 mg i.v. co 8 h) LUB fluorochinolon z metronidazolem",
        "Doustna amoksycylina w małej dawce raz na 3 dni",
        "Wankomycyna z kolistyną i flukonazolem u każdego chorego",
        "Całkowite zaniechanie podawania antybiotyków, ponieważ żółć jest płynem sterylnym"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>W ostrym zapaleniu pęcherzyka dominują bakterie Gram-ujemne przewodu pokarmowego (E. coli, Klebsiella pneumoniae) oraz beztlenowce (Bacteroides fragilis, Clostridium).</strong> Wytyczne TG18 zalecają leczenie parenteralne cefalosporynami II lub III generacji (np. <span class='dose-pill'>Ceftriakson 2 g i.v. raz/dobę</span>) w skojarzeniu z lekiem przeciwrzęsistkowym/przeciwbeztlenowym (<span class='dose-pill'>Metronidazol 500 mg i.v. co 8 h</span>) lub monoterapię inhibitorową (np. piperacylina z tazobaktamem). Po pomyślnej niepowikłanej cholecystektomii antybiotykoterapię można odstawić po 24 godzinach od operacji.",
        "❌ BŁĄD! <strong>Doustna amoksycylina jest niewystarczająca i nie osiąga odpowiednich stężeń w zmienionych zapalnie drogach żółciowych.</strong>",
        "❌ BŁĄD! <strong>Wankomycyna i kolistyna to leki ostatniej szansy na szczepy wielolekooporne (MRSA, CRE),</strong> nie stosuje się ich empirycznie w rutynowym zapaleniu pęcherzyka.",
        "❌ BŁĄD! <strong>W ostrym zapaleniu pęcherzyka dochodzi do translokacji bakteryjnej i posiewy żółci są dodatnie w ponad 50-70% przypadków!</strong>"
      ]
    }
  ],
  pathoNodes: [
    {
      badge: "Uwięźnięcie złogu",
      title: "Mechaniczna obturacja przewodu pęcherzykowego",
      short: "Zaklinowanie kamienia w szyjce (zachyłku Hartmanna)",
      detail: "Kamień cholesterolowy lub barwnikowy blokuje odpływ żółci. Błona śluzowa pęcherzyka nadal wydziela śluz, powodując gwałtowny wzrost ciśnienia śródpęcherzykowego i bolesne rozdęcie (hydrops / wodniak pęcherzyka).",
      target: "Szyjka pęcherzyka i przewód pęcherzykowy",
      drugTarget: "<span class='dose-pill'>Cholecystektomia laparoskopowa</span> mechaniczne usunięcie przeszkody i pęcherzyka"
    },
    {
      badge: "Zapalenie chemiczne",
      title: "Działanie lizolecytyny i mediatorów zapalnych",
      short: "Konwersja lecytyny do cytotoksycznej lizolecytyny",
      detail: "Fosfolipaza A2 uwalniana ze śluzówki przekształca lecytynę żółci w lizolecytynę. Niszczy to glikokaliks i wywołuje silny obrzęk ściany, uwolnienie prostaglandyn (PGE2, PGI2) i ból zapalny.",
      target: "Śluzówka pęcherzyka i syntaza prostaglandyn",
      drugTarget: "<span class='dose-pill'>Ketoprofen 100 mg i.v.</span> lub paracetamol – hamowanie syntezy prostaglandyn"
    },
    {
      badge: "Zakażenie bakteryjne",
      title: "Translokacja flory jelitowej do światła pęcherzyka",
      short: "Kolonizacja przez E. coli, Klebsiella i beztlenowce",
      detail: "Zastój żółci i uszkodzenie śluzówki sprzyjają namnażaniu się bakterii wstępujących z dwunastnicy lub docierających naczyniami wrotnymi. Dochodzi do powstania ropniaka pęcherzyka żółciowego (empyema).",
      target: "Enterobacteriaceae i Bacteroides w żółci",
      drugTarget: "<span class='dose-pill'>Ceftriakson 2 g i.v.</span> + <span class='dose-pill'>Metronidazol 500 mg i.v.</span> eradykacja patogenów"
    },
    {
      badge: "Niedokrwienie i martwica",
      title: "Zakrzepica tętnicy pęcherzykowej i zgorzel",
      short: "Zgorzelinowe zapalenie i perforacja ściany pęcherzyka",
      detail: "Wysokie ciśnienie wewnątrzpęcherzykowe przekracza ciśnienie perfuzji w ścianie pęcherzyka. Dochodzi do ogniskowej martwicy niedokrwiennej dna pęcherzyka (gangrena), perforacji i żółciowego zapalenia otrzewnej.",
      target: "Mikrokrążenie ściany pęcherzyka",
      drugTarget: "<span class='dose-pill'>Pilna operacja w ciągu 72 h</span> zapobieganie powikłaniom zgorzelinowym"
    }
  ],
  diffTable: {
    title: "⚔️ Tabela Różnicowa: Ostre zapalenie pęcherzyka żółciowego vs Inne przyczyny bólu w nadbrzuszu i podżebrzu",
    headers: ["Cecha kliniczna", "Ostre zapalenie pęcherzyka (Cholecystitis)", "Kolka żółciowa niepowikłana", "Ostre zapalenie dróg żółciowych (Cholangitis)", "Ostre zapalenie trzustki (OZT)", "Perforacja wrzodu trawiennego"],
    rows: [
      ["Czas trwania bólu", "Ból stały, nieustępujący, trwający stale >6-24 godzin", "Ból napadowy, narasta falowo, ustępuje samoistnie do 4-6 h", "Ból w prawym podżebrzu towarzyszący wysokiej gorączce i żółtaczce", "Ostry ból opasujący w nadbrzuszu promieniujący do kręgosłupa", "Nagły, potworny ból jak 'uderzenie nożem' w całym nadbrzuszu"],
      ["Gorączka i wskaźniki zapalne", "Gorączka (38-39°C), wysokie CRP, leukocytoza neutrofilowa", "Brak gorączki, prawidłowa leukocytoza i CRP", "Wysoka gorączka z dreszczami (składowa triady Charcota)", "Gorączka, wysoka leukocytoza, bardzo wysokie CRP", "Początkowo parametry w normie, szybko narasta leukocytoza w sepsie"],
      ["Żółtaczka i bilirubina", "Zwykle nieobecna lub nieznaczna (<2 mg/dl)", "Całkowicie nieobecna", "Zawsze obecna, wybitna żółtaczka mechaniczna (hiperbilirubinemia)", "Możliwa w postaci żółciopochodnej (kamica PŻW)", "Nieobecna"],
      ["Enzymy trzustkowe (lipaza/amylaza)", "Prawidłowe (lub minimalny odczynowy wzrost)", "W normie", "W normie lub lekko podwyższone", "Krytycznie podwyższone (lipaza/amylaza >=3-krotnie powyżej normy)", "Prawidłowe lub mierny wzrost z powodu przesięku do otrzewnej"],
      ["Obraz w badaniach obrazowych", "Pogrubiała ściana pęcherzyka >4 mm, uwięźnięty złóg, objaw podwójnego konturu", "Złogi w świetle pęcherzyka, ściana cienka (<3 mm), brak obrzęku", "Poszerzenie dróg żółciowych wewnątrzwątrobowych i PŻW (często złóg w PŻW)", "Obrzęk miąższu trzustki, zatarcie granic, nacieki okołotrzustkowe", "Sierp wolnego gazu pod kopułą przepony w RTG na stojąco / TK"],
      ["Podstawowe leczenie", "Wczesna cholecystektomia laparoskopowa (ELC do 72 h) + antybiotyki", "Leczenie przeciwbólowe/rozkurczowe; planowa cholecystektomia", "Pilne odbarczenie dróg żółciowych drogą ECPW (ERCP) ze sfinkterotomią", "Intensywna płynoterapia dożylna, analgezja, wczesne żywienie dojelitowe", "Pilna operacja chirurgiczna – laparotomia i zszycie perforacji wrzodu"]
    ]
  },
  dutySummary: {
    overview: "Ostre kamicze zapalenie pęcherzyka żółciowego (Acute Calculous Cholecystitis) rozwija się w 90-95% wskutek zaklinowania złogu w szyjce pęcherzyka lub przewodzie pęcherzykowym. Prowadzi to do zastoju, obrzęku ściany, niedokrwienia i wtórnej infekcji bakteryjnej. Zgodnie z międzynarodowymi wytycznymi Tokyo Guidelines (TG18) złotym standardem leczenia jest wczesna cholecystektomia laparoskopowa (ELC) przeprowadzona optymalnie w ciągu pierwszych 72 godzin od zachorowania.",
    diagnostics: "1. Weryfikacja kryteriów Tokyo Guidelines TG18: ocena objawów miejscowych (objaw Murphy'ego), ogólnych (gorączka, leukocytoza, CRP) oraz obrazowych.<br>2. USG jamy brzusznej (badanie z wyboru): ocena grubości ściany pęcherzyka (>4 mm), objawu podwójnego konturu, obecności uwięzionego złogu w szyjce i płynu w loży pęcherzyka.<br>3. Próby wątrobowe i enzymy trzustkowe (bilirubina, ALP, GGTP, ALT, AST, lipaza/amylaza) – wykluczenie kamicy przewodowej (choledocholithiasis), zapalenia dróg żółciowych (cholangitis) i ostrego zapalenia trzustki (OZT).<br>4. Ocena niewydolności narządowej (ciśnienie, diureza, PaO2/FiO2, kreatynina, INR, płytki) – stratyfikacja ciężkości do stopnia Grade I, II lub III wg TG18.",
    drugsAndDoses: "1. Antybiotykoterapia empiryczna dożylna w zapaleniu pęcherzyka (TG18 Grade II):<br>   - <span class='dose-pill'>Ceftriakson 2 g i.v. raz na dobę</span> w połączeniu z <span class='dose-pill'>Metronidazol 500 mg i.v. co 8 h</span> LUB<br>   - <span class='dose-pill'>Cyprofloksacyna 400 mg i.v. co 12 h</span> + Metronidazol (u chorych z alergią na beta-laktamy) LUB<br>   - <span class='dose-pill'>Piperacylina z tazobaktamem 4,5 g i.v. co 8 h</span> w ciężkich postaciach.<br>2. Płynoterapia krystaloidowa: <span class='dose-pill'>Płyn wieloelektrolitowy (PWE) 2000-2500 ml/dobę i.v.</span>.<br>3. Analgezja: <span class='dose-pill'>Paracetamol 1 g i.v. co 6 h</span> + NLPZ (<span class='dose-pill'>Ketoprofen 100 mg i.v.</span>) lub opioidy w silnym bólu.",
    procedures: "1. Wczesna cholecystektomia laparoskopowa (ELC) w ciągu pierwszych 72 godzin od początku objawów.<br>2. Ścisłe przestrzeganie zasad Critical View of Safety (CVS wg Strasberga) w celu ochrony przewodu żółciowego wspólnego przed jatrogennym uszkodzeniem.<br>3. Zabieg ratunkowy u chorych z Grade III i skrajnym ryzykiem operacyjnym: przezskórna przezwątrobowa cholecystostomia (PTGBD) pod kontrolą USG w znieczuleniu miejscowym.<br>4. Konwersja do operacji otwartej w przypadku braku możliwości bezpiecznej identyfikacji struktur w trójkącie Calota (zasada 'safety first').",
    monitoring: "1. Monitorowanie parametrów życiowych, diurezy i cech uogólnionej reakcji zapalnej / sepsy.<br>2. Kontrola pooperacyjna stężenia bilirubiny i enzymów wątrobowych (wykluczenie jatrogennego zaklipowania PŻW lub wycieku żółci).<br>3. Obserwacja zawartości drenu podwątrobowego (jeśli został pozostawiony) w poszukiwaniu żółci.<br>4. Uruchomienie pacjentki i włączenie płynów doustnych w 1. dobie pooperacyjnej."
  },
  lekQuestions: [
    {
      question: "Zgodnie z wytycznymi Tokyo Guidelines (TG18) do postawienia pewnego rozpoznania ostrego zapalenia pęcherzyka żółciowego wymagane jest jednoczesne stwierdzenie:",
      options: [
        "Objawów miejscowych (np. objaw Murphy'ego), objawów ogólnych (gorączka, leukocytoza lub wysokie CRP) oraz potwierdzenia w badaniu obrazowym (np. USG)",
        "Wyłącznie bezobjawowej kamicy żółciowej w USG",
        "Wysokiej żółtaczki z bilirubiną całkowitą >15 mg/dl i odbarwionych stolców",
        "Trzykrotnego wzrostu aktywności amylazy i lipazy w surowicy",
        "Obecności powietrza pod kopułą przepony w RTG klatki piersiowej"
      ],
      correct: 0,
      expl: "Kryteria Tokyo Guidelines 2018 (TG18) wymagają obecności co najmniej jednej cechy z grupy A (objawy miejscowe: bolesność w prawym podżebrzu, objaw Murphy'ego, wyczuwalny opór), jednej z grupy B (objawy uogólnione: gorączka >38°C, leukocytoza, wzrost CRP) oraz cech ostrego zapalenia w badaniu obrazowym (grupa C: USG/TK/MRCP). Spełnienie A + B + C daje pewne rozpoznanie."
    },
    {
      question: "Dodatni objaw Murphy'ego w badaniu fizykalnym jamy brzusznej polega na:",
      options: [
        "Nagłym zatrzymaniu głębokiego wdechu przez pacjenta z powodu ostrego bólu podczas głębokiej palpacji prawego podżebrza",
        "Bolesności przy wstrząsaniu prawego łuku żebrowego dłonią badającego",
        "Bolesności w prawym dole biodrowym przy ucisku lewego dołu",
        "Obecności niebolesnego, powiększonego pęcherzyka żółciowego u chorego z żółtaczką",
        "Zanikaniu tętna na tętnicy promieniowej podczas głębokiego wdechu"
      ],
      correct: 0,
      expl: "Objaw Murphy'ego polega na przyłożeniu ręki badającego pod prawym łukiem żebrowym w linii środkowoobojczykowej i poproszeniu pacjenta o wykonanie głębokiego wdechu. Obniżająca się w dół przepona spycha zapalnie zmieniony pęcherzyk na palce badającego, co wywołuje nagły, silny ból i odruchowe zatrzymanie wdechu (tzw. 'arrest of inspiration')."
    },
    {
      question: "Który z poniższych obrazów ultrasonograficznych (USG) NIE jest typowy dla ostrego kamiczego zapalenia pęcherzyka żółciowego?",
      options: [
        "Prawidłowa grubość ściany pęcherzyka poniżej 2 mm bez obecności złogów",
        "Pogrubienie ściany pęcherzyka powyżej 4-5 mm z obrzękiem",
        "Rozwarstwienie ściany pęcherzyka dające obraz 'podwójnego konturu'",
        "Obecność uwięźniętego złogu w szyjce pęcherzyka lub przewodzie pęcherzykowym",
        "Obecność płynu w loży pęcherzyka żółciowego oraz sonograficzny objaw Murphy'ego"
      ],
      correct: 0,
      expl: "Prawidłowa ściana pęcherzyka żółciowego jest cienka, gładka i nie przekracza 2-3 mm grubości. Pogrubienie ściany >4 mm, rozwarstwienie (podwójny kontur), płyn okołopęcherzykowy, zablokowany złóg i sonograficzny objaw Murphy'ego to klasyczne cechy ostrego zapalenia pęcherzyka."
    },
    {
      question: "Optymalnym postępowaniem z wyboru u pacjenta w dobrym stanie ogólnym z ostrym zapaleniem pęcherzyka żółciowego trwającym 36 godzin (TG18 Grade I lub II) jest:",
      options: [
        "Wczesna cholecystektomia laparoskopowa (ELC) wykonana jak najszybciej od przyjęcia (optymalnie do 72 godzin od początku objawów)",
        "Odroczenie operacji o 8-12 tygodni i leczenie wyłącznie doustną amoksycyliną",
        "Laparotomia z cięcia pośrodkowego z jednoczasową resekcją prawego płata wątroby",
        "Wykonanie pilnego ECPW z przecięciem brodawki Vatera jako jedynego leczenia",
        "Podanie leków rozpuszczających złogi i wypisanie do domu"
      ],
      feedback: "",
      correct: 0,
      expl: "Zgodnie z wytycznymi Tokyo Guidelines (TG18) oraz WSES wczesna cholecystektomia laparoskopowa (Early Laparoscopic Cholecystectomy – ELC) wykonana w ciągu pierwszych 72 godzin (i do 7-10 dni od początku objawów) jest złotym standardem leczenia. Wiąże się z mniejszą zachorowalnością, krótszym pobytem w szpitalu i niższymi kosztami niż odraczanie zabiegu."
    },
    {
      question: "Koncepcja Krytycznego Widoku Bezpieczeństwa (Critical View of Safety – CVS wg Strasberga) podczas cholecystektomii laparoskopowej ma na celu:",
      options: [
        "Zapobieżenie jatrogennemu uszkodzeniu dróg żółciowych (przewodu żółciowego wspólnego) oraz prawej tętnicy wątrobowej",
        "Przyspieszenie zabiegu operacyjnego do mniej niż 15 minut",
        "Umożliwienie usunięcia pęcherzyka bez znieczulenia ogólnego",
        "Ocena obecności kamieni w drogach moczowych",
        "Zapobieżenie krwawieniu z żylaków przełyku"
      ],
      correct: 0,
      expl: "Critical View of Safety (CVS) to technika preparowania trójkąta Calota polegająca na oczyszczeniu trójkąta z tkanek włóknisto-tłuszczowych, odpreparowaniu dolnej 1/3 pęcherzyka od wątroby i uwidocznieniu wyłącznie dwóch struktur wnikających do pęcherzyka (przewodu pęcherzykowego i tętnicy pęcherzykowej). Jest najskuteczniejszą metodą zapobiegania jatrogennym uszkodzeniom dróg żółciowych (BDI)."
    },
    {
      question: "U 84-letniego pacjenta z ciężkim ostrym zapaleniem pęcherzyka żółciowego (TG18 Grade III), we wstrząsie septycznym i z niewydolnością oddechową, zabiegiem ratującym życie z wyboru jest:",
      options: [
        "Przezskórna przezwątrobowa cholecystostomia (PTGBD) pod kontrolą USG w znieczuleniu miejscowym",
        "Pilna otwarta cholecystektomia w znieczuleniu ogólnym",
        "Dożylna podaż paracetamolu bez jakichkolwiek procedur inwazyjnych",
        "Przeszczepienie wątroby w trybie pilnym",
        "Gastrostomia odżywcza (PEG)"
      ],
      correct: 0,
      expl: "U chorych w stanie krytycznym (Grade III z niewydolnością narządową) lub ze skrajnym ryzykiem operacyjnym i anestezjologicznym zabiegiem z wyboru wg TG18 jest przezskórny drenaż pęcherzyka żółciowego (PTGBD). Zabieg ten odbarcza ropę i zakażoną żółć w znieczuleniu miejscowym, pozwalając na stabilizację pacjenta."
    },
    {
      question: "Obecność objawu Courvoisiera (powiększony, napięty, niebolesny pęcherzyk żółciowy u pacjenta z bezbólową, narastającą żółtaczką mechaniczną) przemawia za:",
      options: [
        "Guzem okolicy trzustkowo-dwunastniczej (np. rakiem głowy trzustki lub brodawki Vatera uciskającym PŻW)",
        "Ostrym kamiczym zapaleniem pęcherzyka żółciowego",
        "Wrzodziejącym zapaleniem jelita grubego",
        "Ostrą zatorowością płucną",
        "Pierwotnym stwardniającym zapaleniem dróg żółciowych u dziecka"
      ],
      correct: 0,
      expl: "Objaw Courvoisiera to obecność powiększonego, gładkiego, wyczuwalnego palpacyjnie i NIEBOLESNEGO pęcherzyka żółciowego u chorego z narastającą żółtaczką mechaniczną. Jest klasycznym objawem nowotworów uciskających zewnątrzwątrobowe drogi żółciowe od zewnątrz (najczęściej rak głowy trzustki). W ostrym zapaleniu pęcherzyk jest skrajnie bolesny!"
    },
    {
      question: "Zespół Mirizziego jest powikłaniem kamicy pęcherzykowej polegającym na:",
      options: [
        "Ucisku lub przetoki z przewodu pęcherzykowego/szyjki pęcherzyka do przewodu wątrobowego wspólnego wywołanym przez duży zaklinowany złóg",
        "Perforacji wrzodu żołądka do światła pęcherzyka żółciowego",
        "Zarośnięciu żyły wrotnej przez proces zapalny",
        "Pęknięciu śledziony w przebiegu żółtaczki",
        "Zakrzepicy żył wątrobowych (zespół Budda-Chiariego)"
      ],
      correct: 0,
      expl: "Zespół Mirizziego to rzadkie powikłanie kamicy żółciowej, w którym duży złóg uwięźnięty w szyjce pęcherzyka żółciowego lub przewodzie pęcherzykowym wywołuje zewnętrzny ucisk na sąsiadujący przewód wątrobowy wspólny (CHD), prowadząc do żółtaczki mechanicznej, a w zaawansowanych stadiach do powstania przetoki pęcherzykowo-przewodowej."
    },
    {
      question: "Główną przyczyną martwicy ściany pęcherzyka żółciowego (gangrenous cholecystitis) w przebiegu ostrego zapalenia jest:",
      options: [
        "Niedokrwienie śródścienne wywołane wysokim ciśnieniem płynu w zablokowanym pęcherzyku przekraczającym ciśnienie perfuzji kapilarnej",
        "Trawienie ściany pęcherzyka przez kwas solny z żołądka",
        "Atak cytotoksycznych limfocytów CD8+ w reakcji przeszczep przeciw gospodarzowi",
        "Działanie toksyny botulinowej w drogach żółciowych",
        "Przedawkowanie witaminy K"
      ],
      correct: 0,
      expl: "Wzrost ciśnienia hydrostatycznego w świetle zablokowanego pęcherzyka prowadzi do kompresji naczyń mikrokrążenia śródściennego, zastoju żylnego i ostatecznie zablokowania przepływu w gałęziach tętnicy pęcherzykowej. Powoduje to ogniskowe niedokrwienie, martwicę zgorzelinową (zgorzel) ściany i ryzyko perforacji."
    },
    {
      question: "Który antybiotyk lub schemat antybiotykoterapii jest zalecany w leczeniu empirycznym ostrego zapalenia pęcherzyka żółciowego o umiarkowanym przebiegu (TG18 Grade II)?",
      options: [
        "Ceftriakson w skojarzeniu z metronidazolem dożylnie",
        "Doustna azytromycyna w pojedynczej dawce",
        "Gentamycyna w monoterapii doustnej",
        "Flukonazol z nystatyną",
        "Penicylina krystaliczna co 4 godziny"
      ],
      correct: 0,
      expl: "Flora bakteryjna w zapaleniu dróg żółciowych i pęcherzyka to najczęściej tlenowe pałeczki Gram-ujemne (E. coli, Klebsiella) oraz beztlenowce (Bacteroides fragilis). Zgodnie z wytycznymi TG18 schematem pierwszego rzutu jest cefalosporyna III generacji (ceftriakson) w połączeniu z metronidazolem lub inhibitorowe penicyliny (piperacylina z tazobaktamem)."
    },
    {
      question: "Jakie jest postępowanie w przypadku przypadkowego stwierdzenia w badaniu histopatologicznym raka pęcherzyka żółciowego w stadium T1a (rak naciekający wyłącznie blaszkę właściwą śluzówki) po przebytej laparoskopowej cholecystektomii?",
      options: [
        "Prosta cholecystektomia jest zabiegiem doszczętnym onkologicznie i nie wymaga poszerzania operacji (o ile marginesy są wolne)",
        "Konieczna jest natychmiastowa reoperacja z usunięciem całego prawego płata wątroby",
        "Wymagana jest natychmiastowa radioterapia całego ciała",
        "Należy wdrożyć chemioterapię paliatywną 6 cykli",
        "Należy usunąć żołądek i dwunastnicę"
      ],
      correct: 0,
      expl: "W przypadku przypadkowego raka pęcherzyka żółciowego (incidental gallbladder cancer) w stadium T1a (rak ograniczony do blaszki właściwej błony śluzowej, lamina propria) prosta cholecystektomia (o ile margines w kikucie przewodu pęcherzykowego był ujemny) jest zabiegiem w 100% doszczętnym onkologicznie i nie wymaga reoperacji. Od stadium T1b/T2 konieczna jest reoperacja z resekcją łoża pęcherzyka (segmentów IVb/V) i limfadenektomią."
    }
  ],
  flashcards: [
    {
      front: "Wymień kryteria diagnostyczne ostrego zapalenia pęcherzyka żółciowego wg Tokyo Guidelines (TG18).",
      back: "Pewne rozpoznanie wymaga obecności cech z 3 grup:\nA. Objawy miejscowe (objaw Murphy'ego, ból/opór w prawym podżebrzu)\nB. Objawy ogólne (gorączka >38°C, leukocytoza, wysokie CRP)\nC. Badania obrazowe (cechy zapalenia w USG/TK/MRCP)."
    },
    {
      front: "Wymień 4 kluczowe ultrasonograficzne cechy ostrego zapalenia pęcherzyka żółciowego.",
      back: "1. Pogrubienie ściany pęcherzyka >4 mm\n2. Rozwarstwienie ściany ('objaw podwójnego konturu' / double-rim sign)\n3. Uwięźnięty złóg w szyjce/przewodzie pęcherzykowym\n4. Płyn w loży pęcherzyka oraz sonograficzny objaw Murphy'ego."
    },
    {
      front: "Jaki jest optymalny czas wykonania cholecystektomii laparoskopowej w ostrym zapaleniu pęcherzyka wg wytycznych?",
      back: "Wczesna cholecystektomia laparoskopowa (ELC) wykonana jak najszybciej, optymalnie w ciągu pierwszych 72 godzin od początku objawów (dopuszczalna do 7-10 dni)."
    },
    {
      front: "Co to jest Krytyczny Widok Bezpieczeństwa (Critical View of Safety – CVS wg Strasberga)?",
      back: "Technika preparowania w trójkącie Calota: 1. Oczyszczenie trójkąta z tłuszczu, 2. Odpreparowanie dolnej 1/3 pęcherzyka od łoża wątroby, 3. Uwidocznienie DOKŁADNIE DWÓCH struktur wchodzących do pęcherzyka: t. pęcherzykowej i przewodu pęcherzykowego (chroni PŻW)."
    },
    {
      front: "Jakie jest postępowanie u niestabilnego pacjenta z ciężkim zapaleniem pęcherzyka (Grade III), u którego operacja w narkozie grozi zgonem?",
      back: "Przezskórna przezwątrobowa cholecystostomia (PTGBD) pod kontrolą USG w znieczuleniu miejscowym – odbarcza ropę i zakażoną żółć, umożliwiając opanowanie wstrząsu septycznego."
    },
    {
      front: "Czym różni się objaw Murphy'ego od objawu Courvoisiera?",
      back: "Objaw Murphy'ego: ostry ból i zatrzymanie wdechu przy ucisku podżebrza (zapalenie pęcherzyka).\nObjaw Courvoisiera: powiększony, NIEBOLESNY pęcherzyk z żółtaczką mechaniczną (rak głowy trzustki uciskający PŻW)."
    }
  ]
};

// Mirror fields for schema compatibility
case127.steps.forEach(step => {
  step.question = step.title;
  step.explanation = step.feedback;
});
case127.lekQuestions.forEach(q => {
  q.opts = q.options;
  q.correctIdx = q.correct;
  q.exp = q.expl;
});

saveCase(case127);

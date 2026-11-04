const fs = require('fs');
const path = require('path');
const { encryptStringAes } = require('./encrypt_case.js');

const MASTER_KEY = '@LEKSzymon28111999';
const CASES_DIR = path.join(__dirname, '..', 'cases');

console.log("Generating Case 126: Ostre zapalenie wyrostka robaczkowego u dorosłego...");

async function saveCase(caseData) {
  const filePath = path.join(CASES_DIR, caseData.filename);
  const jsonStr = JSON.stringify(caseData, null, 2);
  const encrypted = await encryptStringAes(jsonStr, MASTER_KEY);
  fs.writeFileSync(filePath, JSON.stringify(encrypted, null, 2), 'utf8');
  console.log(`[SAVED] Case #${caseData.id}: ${caseData.filename} (LEK Qs: ${caseData.lekQuestions.length}, Steps: ${caseData.steps.length}, Flashcards: ${caseData.flashcards.length})`);
}

const case126 = {
  id: 126,
  filename: "126_wyrostek_dorosly.json",
  dept: "Chirurgia ogólna",
  shortTitle: "26-letni Michał – Wędrujący ból brzucha do prawego dołu biodrowego, nudności i objaw Blumberga (Ostre zapalenie wyrostka robaczkowego)",
  diagnosisTitle: "Ostre ropowicze zapalenie wyrostka robaczkowego (Acute Appendicitis) powikłane miejscowym zapaleniem otrzewnej u dorosłego, kwalifikowane do pilnej apendektomii laparoskopowej",
  vitals: [
    { label: "Temperatura ciała", val: "38,2 °C", sub: "Stan podgorączkowy / gorączka zapalna", status: "vital-warn" },
    { label: "Częstość akcji serca (HR)", val: "102/min", sub: "Tachykardia zatokowa z bólu i stanu zapalnego", status: "vital-warn" },
    { label: "Ciśnienie tętnicze (RR)", val: "125/80 mmHg", sub: "Prawidłowe ciśnienie tętnicze", status: "vital-ok" },
    { label: "Skala Alvarado (MANTRELS)", val: "9 / 10 punktów", sub: "Bardzo wysokie prawdopodobieństwo zapalenia wyrostka", status: "vital-crit" }
  ],
  vitalsObj: { hr: 102, bp: "125/80", spo2: 99, rr: 18, temp: 38.2, gcs: 15 },
  story: `<p><strong>Pacjent:</strong> 26-letni Michał, programista, dotychczas zdrowy, zgłosił się na szpitalny oddział ratunkowy w godzinach nocnych z powodu ostrego, narastającego bólu brzucha w prawym dole biodrowym, nudności, jadłowstrętu oraz stanu podgorączkowego.</p><p><strong>Wywiad chorobowy:</strong> Ból rozpoczął się wczoraj około godziny 14:00 jako tępy, rozlany, trudny do zlokalizowania dyskomfort w nadbrzuszu i wokół pępka. Pacjent przypuszczał, że zjadł nieświeży obiad w pracy. Wieczorem dołączył całkowity brak apetytu (anoreksja) oraz nudności i jednorazowe wymioty treścią żołądkową. Około godziny 22:00 charakter bólu uległ diametralnej zmianie – stał się ostry, kłujący, nasilający się przy każdym kroku, kaszlu i wstrząsach samochodu w drodze do szpitala, oraz wyraźnie przemieścił się do prawego dołu biodrowego (klasyczny objaw Kocha / wędrujący ból). Chory przyjął dwie tabletki drotaweryny (No-Spa), co nie przyniosło żadnej ulgi. W wywiadzie brak chorób przewlekłych, nie pali, neguje zaburzenia mikcji i biegunkę.</p><p><strong>Badanie przedmiotowe na SOR:</strong> Młody mężczyzna leżący na kozetce na wznak z podkurczonym prawym udem, z wyraźnym grymasem bólu przy próbie wyprostowania nogi lub kaszlu. Brzuch wysklepiony w poziomie klatki piersiowej, symetryczny, słabiej ruchomy oddechowo w dolnym prawym kwadrancie. Przy powierzchownej i głębokiej palpacji stwierdza się wyraźną bolesność uciskową w punkcie McBurneya (w 1/3 odległości między prawym kolcem biodrowym przednim górnym a pępkiem) oraz punkcie Lanza. W prawym dole biodrowym obecna wyraźna obrona mięśniowa (défense musculaire) oraz silnie dodatni objaw Blumberga (ostry ból przy nagłym zwolnieniu ucisku – miejscowe zapalenie otrzewnej). Dodatni objaw Rovsinga (ucisk lewego dołu biodrowego prowokuje ból po stronie prawej). Dodatni objaw Jaworskiego (nasilenie bólu w prawym dole biodrowym podczas opuszczania wyprostowanej prawej kończyny dolnej). Perystaltyka jelitowa leniwa, osłabiona. Objaw Chełmońskiego i Goldflama obustronnie ujemne. W badaniu per rectum (DRE): bolesność ściany odbytnicy po stronie prawej. W pachwinach brak przepuklin.</p>`,
  labs: {
    "Morfologia i wskaźniki zapalne": [
      { name: "Leukocyty (WBC)", val: "15,8 tys./µl", norm: "4,0 - 10,0 tys./µl", flag: "CRIT_HIGH" },
      { name: "Granulocyty obojętnochłonne (NEUT)", val: "84 % (13,3 tys./µl)", norm: "45 - 70 %", flag: "CRIT_HIGH" },
      { name: "Przesunięcie w lewo (pałeczkowate)", val: "12 %", norm: "< 5 %", flag: "HIGH" },
      { name: "Białko C-reaktywne (CRP)", val: "68,0 mg/l", norm: "< 5,0 mg/l", flag: "CRIT_HIGH" },
      { name: "Hemoglobina (Hb)", val: "14,8 g/dl", norm: "13,5 - 17,5 g/dl", flag: "NORMAL" },
      { name: "Płytki krwi (PLT)", val: "245 tys./µl", norm: "150 - 450 tys./µl", flag: "NORMAL" }
    ],
    "Biochemia i parametry nerkowe": [
      { name: "Kreatynina w surowicy", val: "0,88 mg/dl", norm: "0,70 - 1,20 mg/dl", flag: "NORMAL" },
      { name: "Mocznik", val: "32 mg/dl", norm: "15 - 45 mg/dl", flag: "NORMAL" },
      { name: "Sód (Na+)", val: "140 mmol/l", norm: "135 - 145 mmol/l", flag: "NORMAL" },
      { name: "Potas (K+)", val: "4,2 mmol/l", norm: "3,5 - 5,1 mmol/l", flag: "NORMAL" },
      { name: "Bilirubina całkowita", val: "1,2 mg/dl", norm: "< 1,2 mg/dl", flag: "NORMAL" },
      { name: "Amylaza w surowicy", val: "54 U/l", norm: "28 - 100 U/l", flag: "NORMAL" }
    ],
    "Badanie ogólne moczu": [
      { name: "Ciężar właściwy", val: "1,024 g/ml", norm: "1,015 - 1,025 g/ml", flag: "NORMAL" },
      { name: "Leukocyty w moczu", val: "2-4 wpw", norm: "0 - 5 wpw", flag: "NORMAL" },
      { name: "Erytrocyty w moczu", val: "0-1 wpw", norm: "0 - 3 wpw", flag: "NORMAL" },
      { name: "Białko / Azotyny", val: "Nieobecne", norm: "Nieobecne", flag: "NORMAL" }
    ]
  },
  steps: [
    {
      title: "Krok 1: Analiza ewolucji bólu (objaw Kocha) i badanie fizykalne",
      text: "Pacjent podaje, że ból początkowo miał charakter tępy w okolicy okołopępkowej, a po 8 godzinach przeniósł się do prawego dołu biodrowego i stał się ostry. Jakie jest patofizjologiczne wytłumaczenie tego zjawiska (objawu Kocha)?",
      options: [
        "Początkowy ból trzewny wynika z rozdęcia wyrostka i jest przewodzony włóknami współczulnymi (Th8-Th10) dając ból rzutowany wokół pępka; po objęciu procesem zapalnym otrzewnej ściennej dołącza ból somatyczny (nerwy międzyżebrowe), precyzyjnie zlokalizowany w prawym dole biodrowym",
        "Ból wędrujący oznacza, że kamień kałowy przemieścił się z żołądka przez całe jelito cienkie do kątnicy",
        "Jest to typowy objaw kolki nerkowej wędrującej od nerki wzdłuż moczowodu do pęcherza",
        "Przejście bólu wynika ze skrętu sieci większej wokół wyrostka robaczkowego"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Klasyczny objaw Kocha (wędrujący ból) wynika z podwójnego unerwienia jamy brzusznej.</strong> Niedrożność światła wyrostka wywołuje niedokrwienie i rozdęcie błony śluzowej – impulsacja trzewna biegnie włóknami autonomicznymi do segmentów Th8-Th10 rdzenia (ból tępy wokół pępka). Gdy zapalenie ropowicze penetruje całą ścianę i nacieka otrzewną ścienną (parietal peritoneum), pobudzone zostają somatyczne włókna czuciowe n. rdzeniowych Th11-L1, dając ból ostry, nasilający się przy ruchu i kaszlu, precyzyjnie w prawym dole biodrowym.",
        "❌ BŁĄD! <strong>Kamień kałowy (appendicolith) tworzy się bezpośrednio w wyrostku lub świetle kątnicy,</strong> a nie wędruje z żołądka.",
        "❌ BŁĄD! <strong>W kolce nerkowej ból promieniuje do pachwiny i narządów płciowych,</strong> mocz wykazuje krwinkomocz, a objaw Goldflama jest dodatni.",
        "❌ BŁĄD! <strong>Skręt sieci większej to rzadkie zjawisko,</strong> nie dające klasycznej sekwencji bólu trzewnego i somatycznego."
      ]
    },
    {
      title: "Krok 2: Badanie objawów otrzewnowych i specyficznych objawów zapalenia wyrostka",
      text: "W badaniu fizykalnym stwierdzasz dodatni objaw Blumberga, Rovsinga oraz Jaworskiego. Co oznacza dodatni objaw Jaworskiego (psoas sign)?",
      options: [
        "Ból w prawym dole biodrowym podczas opuszczania uprzednio uniesionej prawej kończyny dolnej w pozycji leżącej na wznak, świadczący o zakątniczym położeniu zapalnie zmienionego wyrostka przylegającego do mięśnia biodrowo-lędźwiowego",
        "Ból przy opukiwaniu prawego podżebrza na szczycie wdechu świadczący o kamicy pęcherzyka żółciowego",
        "Ból w lewym dole biodrowym przy gwałtownym ucisku wyrostka mieczykowatego",
        "Wzmożenie perystaltyki po podaniu doustnym 200 ml wody"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Objaw Jaworskiego (w piśmiennictwie anglosaskim psoas sign) polega na wywołaniu bólu przy rozciąganiu lub napinaniu mięśnia lędźwiowo-biodrowego (m. iliopsoas)</strong> – u pacjenta leżącego na wznak uciska się prawy dół biodrowy i poleca opuszczać wyprostowaną, uniesioną nogę. Dodatni objaw wskazuje na zakątnicze (retrocekalne) położenie zapalnie zmienionego wyrostka robaczkowego.",
        "❌ BŁĄD! <strong>Ból przy opukiwaniu prawego podżebrza na wdechu to objaw Chełmońskiego</strong> (lub objaw Murphy'ego przy palpacji).",
        "❌ BŁĄD! <strong>Ból w prawym dole biodrowym przy ucisku lewego dołu to objaw Rovsinga,</strong> a nie Jaworskiego.",
        "❌ BŁĄD! <strong>Podawanie wody pacjentowi z podejrzeniem ostrego brzucha kwalifikowanemu do operacji jest przeciwwskazane!</strong>"
      ]
    },
    {
      title: "Krok 3: Ocena w skali Alvarado (MANTRELS)",
      text: "Obliczasz punktację w skali Alvarado dla Michała: wędrujący ból (1), anoreksja (1), nudności/wymioty (1), bolesność w prawym dole biodrowym (2), objaw Blumberga (1), temperatura >37,3°C (1), leukocytoza >10 tys. (2), przesunięcie rozmazu w lewo (1). Wynik wynosi 9/10 punktów. Jaka jest interpretacja i rekomendacja kliniczna?",
      options: [
        "Wynik >=7 (a zwłaszcza 9-10) oznacza bardzo wysokie prawdopodobieństwo ostrego zapalenia wyrostka robaczkowego i stanowi bezpośrednie wskazanie do pilnej kwalifikacji do operacji chirurgicznej",
        "Wynik oznacza brak zapalenia wyrostka i pacjent może zostać bezpiecznie wypisany do domu",
        "Wymagana jest 7-dniowa obserwacja w POZ z powtórzeniem skali za tydzień",
        "Konieczna jest pilna kolonoskopia z intubacją kątnicy przed wezwaniem chirurga"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Skala Alvarado (MANTRELS) ocenia ryzyko ostrego zapalenia wyrostka:</strong><br>- <=4 pkt: niskie ryzyko (zapalenie mało prawdopodobne, diagnostyka innych przyczyn),<br>- 5-6 pkt: podejrzenie zapalenia (wymagana diagnostyka obrazowa USG/TK lub hospitalizacja z obserwacją),<br>- >=7 pkt: wysokie ryzyko (zalecana natychmiastowa konsultacja chirurgiczna i operacja). Wynik 9/10 u młodego mężczyzny jest niemal jednoznaczny z rozpoznaniem.",
        "❌ BŁĄD! <strong>Wynik 9/10 to niemal pewne ostre zapalenie wyrostka robaczkowego;</strong> odesłanie do domu grozi perforacją i rozlanym zapaleniem otrzewnej.",
        "❌ BŁĄD! <strong>Zapalenie wyrostka rozwija się w ciągu 24-48 godzin;</strong> odroczenie o 7 dni to błąd sztuki.",
        "❌ BŁĄD! <strong>Kolonoskopia w ostrym zapaleniu wyrostka i otrzewnej jest bezwzględnie przeciwwskazana</strong> z powodu ryzyka perforacji ścian kątnicy i wyrostka!"
      ]
    },
    {
      title: "Krok 4: Diagnostyka obrazowa – USG vs Tomografia komputerowa (TK)",
      text: "Zgodnie z wytycznymi WSES (World Society of Emergency Surgery) 2020 dotyczącymi diagnostyki ostrego zapalenia wyrostka robaczkowego, jakie badanie obrazowe jest zalecane jako badanie pierwszego rzutu u młodego dorosłego mężczyzny, a jakie w razie niejednoznacznego wyniku?",
      options: [
        "USG jamy brzusznej jako badanie pierwszego wyboru; w przypadku braku uwidocznienia wyrostka lub wątpliwości klinicznych – tomografia komputerowa (TK) jamy brzusznej i miednicy z kontrastem i.v.",
        "RTG przeglądowe klatki piersiowej na leżąco jako jedyne wymagane badanie",
        "Magnetyczny rezonans jądrowy z podaniem kontrastu dooponowego",
        "Scyntygrafia z użyciem znakowanych erytrocytów Tc-99m"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Wytyczne WSES zalecają ultrasonografię (USG) jamy brzusznej jako badanie pierwszego rzutu (bezinwazyjne, brak promieniowania).</strong> Jeśli USG jednoznacznie potwierdza zapalenie wyrostka (nieściśliwa struktura >6 mm, pogrubiała ściana >3 mm, bolesność pod głowicą), pacjent kwalifikuje się do operacji. Jeśli wyrostek nie jest widoczny (częste w położeniu zakątniczym) lub obraz jest niejednoznaczny, badaniem o najwyższej czułości i swoistości (>95%) jest tomografia komputerowa (TK) z kontrastem i.v.",
        "❌ BŁĄD! <strong>RTG na leżąco nie pozwala uwidocznić wyrostka robaczkowego;</strong> może jedynie wykluczyć perforację wrzodu (wolny sierp powietrza w RTG na stojąco).",
        "❌ BŁĄD! <strong>MRI bez kontrastu stosuje się głównie u kobiet w ciąży,</strong> kontrast dooponowy nie ma żadnego zastosowania.",
        "❌ BŁĄD! <strong>Scyntygrafia znakowanymi krwinkami służy do poszukiwania uchyłku Meckela lub krwawień,</strong> a nie ostrego wyrostka."
      ]
    },
    {
      title: "Krok 5: Kryteria ultrasonograficzne ostrego zapalenia wyrostka",
      text: "Wykonujesz przyłóżkowe badanie USG jamy brzusznej w prawym dole biodrowym. Który zestaw cech w USG potwierdza ostre zapalenie wyrostka robaczkowego?",
      options: [
        "Średnica zewnętrzna wyrostka w przekroju poprzecznym >6 mm, brak ściśliwości pod uciskiem głowicy, pogrubienie ściany >2-3 mm, wzmożone unaczynienie w opcji Doppler (pierścień ognia) oraz obecność hiperechogenicznego cienia (appendicolith)",
        "Średnica wyrostka <4 mm, łatwo zapadające się światło pod uciskiem, brak płynu w miednicy",
        "Poszerzenie pętli jelita grubego powyżej 10 cm z obecnością zrostów",
        "Zmniejszenie grubości ściany kątnicy poniżej 1 mm z intensywną perystaltyką"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Klasyczne kryteria sonograficzne ostrego zapalenia wyrostka robaczkowego obejmują:</strong> 1. Średnicę poprzeczną >6 mm (często 8-12 mm), 2. Brak podatności na ucisk głowicą (sztywna, nieściśliwa struktura – tzw. 'objaw tarczy' w przekroju poprzecznym), 3. Pogrubienie ściany wyrostka >2-3 mm, 4. Przekrwienie ściany w badaniu Color Doppler, 5. Obrzęk i wzmożoną echogeniczność okolicznej tkanki tłuszczowej, 6. Obecność kamienia kałowego (appendicolith / koprolit) dającego cień akustyczny.",
        "❌ BŁĄD! <strong>Średnica <4 mm i pełna ściśliwość to cechy prawidłowego, niezmienionego zapalnie wyrostka.</strong>",
        "❌ BŁĄD! <strong>Poszerzenie okrężnicy >10 cm to cecha megacolon toxicum lub niedrożności jelita grubego.</strong>",
        "❌ BŁĄD! <strong>W zapaleniu ściana ulega obrzękowi i pogrubieniu,</strong> a nie ścieńczeniu."
      ]
    },
    {
      title: "Krok 6: Przygotowanie przedoperacyjne i profilaktyka antybiotykowa",
      text: "Chirurg kwalifikuje Michała do pilnej apendektomii laparoskopowej. Jakie postępowanie farmakologiczne i przygotowawcze należy wdrożyć bezpośrednio przed zabiegiem zgodnie z wytycznymi chirurgicznymi?",
      options: [
        "Ścisła dieta ścisła (NPO), dożylna płynoterapia krystaloidowa wyrównująca wolemię, analgezja (paracetamol/opioid) oraz pojedyncza dawka antybiotykoprofilaktyki dożylnej o spektrum przeciw beztlenowcom i pałeczkom jelitowym podana 30-60 min przed nacięciem skóry (np. Cefazolina + Metronidazol lub Amoksycylina z klawulanianem)",
        "Podanie silnych leków przeczyszczających i wykonanie wlewu przeczyszczającego (lewatywy) w celu oczyszczenia jelita grubego przed narkozą",
        "Całkowity zakaz podawania leków przeciwbólowych aż do nacięcia skóry, aby 'nie zamazać obrazu brzucha'",
        "Podanie doustnej wankomycyny przez 5 dni i odroczenie zabiegu do kolejnego tygodnia"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Zasady nowoczesnego przygotowania do pilnej apendektomii obejmują:</strong> status NPO (nic doustnie), nawodnienie płynami wieloelektrolitowymi (PWE), skuteczne leczenie przeciwbólowe (mit o 'zacieraniu obrazu' przez analgezję został dawno obalony przez EBM!) oraz <strong>pojedynczą profilaktyczną dawkę antybiotyku o szerokim spektrum przeciw bakteriom Gram-ujemnym i beztlenowcom</strong> (np. <span class='dose-pill'>Cefazolina 2 g i.v.</span> + <span class='dose-pill'>Metronidazol 500 mg i.v.</span> lub <span class='dose-pill'>Amoksycylina z kwasem klawulanowym 1,2 g i.v.</span>) podaną w ciągu 30-60 minut przed cięciem chirurgicznym.",
        "❌ BŁĄD! <strong>Leki przeczyszczające i lewatywy w ostrym zapaleniu wyrostka są BEZWZGLĘDNIE PRZECIWWSKAZANE!</strong> Gwałtowny wzrost ciśnienia w świetle jelita może doprowadzić do natychmiastowej perforacji zmienionej martwiczo ściany wyrostka i kałowego zapalenia otrzewnej!",
        "❌ BŁĄD! <strong>Współczesna medycyna nakazuje humanitarne i skuteczne leczenie bólu;</strong> podanie analgetyku nie utrudnia podjęcia decyzji o operacji.",
        "❌ BŁĄD! <strong>Doustna wankomycyna leczy C. difficile i nie wchłania się do krwi;</strong> opóźnienie operacji doprowadzi do ropowicy i sepsy."
      ]
    },
    {
      title: "Krok 7: Wybór metody operacyjnej – laparoskopia vs laparotomia",
      text: "Jaka metoda operacyjna jest obecnie 'złotym standardem' leczenia ostrego zapalenia wyrostka robaczkowego wg wytycznych WSES i EAES?",
      options: [
        "Apendektomia laparoskopowa – wiąże się z mniejszym bólem pooperacyjnym, mniejszym odsetkiem zakażeń miejsca brudnego (SSI), krótszą hospitalizacją i szybszym powrotem do pełnej aktywności",
        "Apendektomia otwarta z szerokiego cięcia pośrodkowego od mostka do spojenia łonowego",
        "Zabieg wyłącznie drogą NOTES (przez naturalne otwory ciała: żołądek lub pochwę)",
        "Nacięcie i drenaż jamy brzusznej w znieczuleniu miejscowym bez usuwania wyrostka"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Apendektomia laparoskopowa jest uznana za metodę z wyboru (złoty standard) u większości chorych z ostrym zapaleniem wyrostka robaczkowego.</strong> Zapewnia doskonałą wizualizację całej jamy otrzewnej (ułatwia diagnostykę różnicową u kobiet i młodych dorosłych), istotnie zmniejsza nasilenie bólu pooperacyjnego, redukuje ryzyko zakażenia rany operacyjnej i powstawania przepuklin w bliźnie oraz skraca czas pobytu w szpitalu.",
        "❌ BŁĄD! <strong>Cięcie pośrodkowe stosuje się w urazach wielonarządowych lub rozlanym kałowym zapaleniu otrzewnej,</strong> a nie w rutynowym zapaleniu wyrostka.",
        "❌ BŁĄD! <strong>NOTES to metoda eksperymentalna,</strong> nie stanowi standardu klinicznego.",
        "❌ BŁĄD! <strong>Nacięcie bez usunięcia wyrostka (apendektomii)</strong> doprowadziłoby do przetrwałej martwicy i przetoki jelitowej."
      ]
    },
    {
      title: "Krok 8: Powikłania pooperacyjne i badanie histopatologiczne",
      text: "Podczas laparoskopii usunięto zgorzelinowo zmieniony wyrostek robaczkowy. Zgodnie z procedurą wyrostek został wysłany na badanie histopatologiczne. Dlaczego rutynowe badanie histopatologiczne każdego usuniętego wyrostka jest bezwzględnym standardem prawno-medycznym?",
      options: [
        "W celu ostatecznego potwierdzenia zapalenia oraz wykluczenia nowotworów wyrostka robaczkowego (przede wszystkim guza neuroendokrynnego NEN / rakowiaka oraz gruczolakoraka lub nowotworu śluzowego LAMN)",
        "Wyłącznie w celu policzenia liczby połkniętych pestek owoców",
        "Badanie histopatologiczne nie jest wymagane i wykonuje się je tylko na życzenie chorego",
        "Aby ocenić, czy pacjent stosował dietę wegetariańską"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Każdy usunięty wyrostek robaczkowy musi zostać poddany rutynowemu badaniu histopatologicznemu.</strong> W około 1-2% przypadków makroskopowo typowe zapalenie wyrostka kryje podłoże nowotworowe – najczęściej guz neuroendokrynny (NEN, dawniej rakowiak / carcinoid) lub śluzak (LAMN) czy gruczolakorak. W przypadku guza NEN o średnicy >2 cm lub naciekającego krezeczkę konieczna jest wtórna operacja – prawostronna hemikolektomia onkologiczna!",
        "❌ BŁĄD! <strong>Badanie histopatologiczne służy onkologii i diagnostyce tkankowej,</strong> a nie wykrywaniu niestrawionego pokarmu.",
        "❌ BŁĄD! <strong>Brak wysłania preparatu do badania histopatologicznego jest rażącym błędem i naruszeniem standardów opieki chirurgicznej.</strong>",
        "❌ BŁĄD! <strong>Histopatologia nie służy weryfikacji preferencji kulinarnych pacjenta.</strong>"
      ]
    }
  ],
  pathoNodes: [
    {
      badge: "Zaczopowanie światła",
      title: "Obturacja i wzrost ciśnienia wewnątrznaczyniowego",
      short: "Kamień kałowy (appendicolith) lub rozrost tkanki limfatycznej",
      detail: "Zablokowanie światła wyrostka przez kamień kałowy (u dorosłych) lub rozrost grudek chłonnych (u dzieci) uniemożliwia odpływ śluzu. Ciśnienie wewnątrz światła rośnie, przekraczając ciśnienie w żyłkach śródściennych.",
      target: "Światło wyrostka i śluzówka",
      drugTarget: "<span class='dose-pill'>Pilna apendektomia laparoskopowa</span> mechaniczne usunięcie przyczyny obturacji"
    },
    {
      badge: "Zastój i niedokrwienie",
      title: "Niedokrwienie ściany i inwazja bakteryjna",
      short: "Ucisk mikronaczyń i translokacja flory beztlenowej",
      detail: "Zastój żylny prowadzi do obrzęku ściany i niedokrwienia błony śluzowej. Dochodzi do załamania bariery śluzówkowej i masywnej inwazji bakterii jelitowych (E. coli, Bacteroides fragilis) z wytworzeniem wysięku ropnego.",
      target: "Bakterie jelitowe i śródbłonek mikronaczyń",
      drugTarget: "<span class='dose-pill'>Cefazolina 2 g i.v.</span> + <span class='dose-pill'>Metronidazol 500 mg i.v.</span> profilaktyka okołooperacyjna"
    },
    {
      badge: "Przejście na otrzewną",
      title: "Martwica zgorzelinowa i zapalenie otrzewnej",
      short: "Penetracja stanu zapalnego do otrzewnej ściennej",
      detail: "Zakrzepica tętnicy wyrostkowej (odgałęzienie t. krętniczo-okrężniczej) powoduje zawał ściany wyrostka i zgorzel (gangrena). Naciekanie otrzewnej ściennej wyzwala ból somatyczny, obronę mięśniową i objaw Blumberga.",
      target: "Otrzewna ścienna prawego dołu biodrowego",
      drugTarget: "<span class='dose-pill'>Paracetamol 1 g i.v.</span> + <span class='dose-pill'>Morfina 5-10 mg s.c./i.v.</span> multimodalna analgezja"
    },
    {
      badge: "Perforacja",
      title: "Pęknięcie ściany i rozlane zapalenie otrzewnej",
      short: "Wylanie treści ropno-kałowej do jamy otrzewnej",
      detail: "Brak interwencji w ciągu 24-48 h prowadzi do perforacji w miejscu martwicy. Skutkuje to powstaniem nacieku okołowyrostkowego (plastyron), ropnia okołowyrostkowego lub rozlanego kałowego zapalenia otrzewnej i sepsy.",
      target: "Jama otrzewnej i krezka jelitowa",
      drugTarget: "<span class='dose-pill'>Płukanie otrzewnej solą fizjologiczną</span> toaleta jamy otrzewnej w trakcie laparoskopii"
    }
  ],
  diffTable: {
    title: "⚔️ Tabela Różnicowa: Ostre zapalenie wyrostka robaczkowego vs Inne przyczyny ostrego bólu w prawym dole biodrowym",
    headers: ["Cecha kliniczna", "Ostre zapalenie wyrostka robaczkowego", "Zapalenie uchyłków prawej połowy okrężnicy / kątnicy", "Zapalenie węzłów chłonnych krezki (Lymphadenitis)", "Pęknięta ciąża pozamaciczna / Torbiel jajnika", "Kolka nerkowa prawostronna"],
    rows: [
      ["Początek i charakter bólu", "Początkowo tępy wokół pępka, po kilku h ostry w prawym dole biodrowym", "Ostry ból od początku w prawym dole biodrowym, częściej u starszych / Azjatów", "Tępy ból w prawym dole biodrowym, poprzedzony infekcją dróg oddechowych", "Nagły, przeszywający ból podbrzusza z zasłabnięciem / wstrząsem hipowolemicznym", "Bardzo silny ból kolkowy w okolicy lędźwiowej promieniujący do pachwiny"],
      ["Gorączka i wskaźniki zapalne", "Stan podgorączkowy (37,5-38,5°C), leukocytoza 12-18 tys., wysokie CRP", "Gorączka, leukocytoza neutrofilowa, wysokie CRP", "Umiarkowana leukocytoza, CRP lekko podwyższone, ustępuje samoistnie", "Brak gorączki (chyba że zakażenie), leukocytoza może być prawidłowa", "Brak gorączki (chyba że powikłana ZUM), parametry zapalne w normie"],
      ["Objawy otrzewnowe", "Wyraźnie dodatnie w prawym dole biodrowym (Blumberg, obrona mięśniowa)", "Obecne miejscowo nad kątnicą lub uchyłkiem", "Brak lub słabo zaznaczona obrona mięśniowa, brak Blumberga", "Silnie dodatni objaw Blumberga przy krwiaku w miednicy mniejszej", "Brak objawów otrzewnowych; pacjent niespokojny ruchowo"],
      ["Badanie moczu", "Prawidłowe lub pojedyncze krwinki/leukocyty przy podrażnieniu moczowodu", "Zwykle prawidłowe", "Prawidłowe", "Ujemne krwinkomocz; próba ciążowa (beta-hCG) DODATNIA w ciąży ektopowej", "Krwinkomocz lub krwiomocz mikroskopowy/makroskopowy w >90%"],
      ["Obraz w USG / TK", "Nieściśliwy wyrostek >6 mm, pogrubiała ściana >3 mm, appendicolith", "Zapalnie zmieniony uchyłek kątnicy z rąbkiem płynu, wyrostek prawidłowy", "Pakiety powiększonych (>8-10 mm) owalnych węzłów chłonnych krezkowych, wyrostek prawidłowy", "Płyn w zatoce Douglasa, puste endometrium, masa w przydatkach w USG TV", "Zastój w UKM nerki (wodonercze), uwidoczniony złóg w moczowodzie"],
      ["Postępowanie z wyboru", "Pilna apendektomia laparoskopowa", "Antybiotykoterapia zachowawcza vs resekcja uchyłku/kątnicy", "Leczenie zachowawcze (odpoczynek, nawodnienie, analgetyki)", "Pilna laparoskopia ginekologiczna (salpingostomia / salpingektomia)", "NLPZ i.v., nawodnienie, leki spazmolityczne, ewentualnie drenaż DJ / URS-L"]
    ]
  },
  dutySummary: {
    overview: "Ostre zapalenie wyrostka robaczkowego jest najczęstszą przyczyną ostrego brzucha wymagającą pilnej operacji chirurgicznej (ryzyko w ciągu życia ok. 7-8%, szczyt w 2. i 3. dekadzie życia). Rozpoczyna się zatkaniem światła (najczęściej przez kamień kałowy lub rozrost tkanki chłonnej), co prowadzi do niedokrwienia, inwazji bakteryjnej i zgorzeli. Złotym standardem leczenia jest apendektomia laparoskopowa.",
    diagnostics: "1. Ocena kliniczna i wyliczenie skali Alvarado (MANTRELS) – wynik >=7 wskazuje na wysokie prawdopodobieństwo zapalenia wyrostka.<br>2. Badanie fizykalne: ocena bolesności w punkcie McBurneya i Lanza oraz objawów Blumberga, Rovsinga, Jaworskiego (psoas sign) i zasłonowego.<br>3. Morfologia krwi z rozmazem (leukocytoza z neutrofilią i przesunięciem w lewo) oraz stężenie CRP.<br>4. USG jamy brzusznej – badanie pierwszego rzutu (kryteria: nieściśliwy wyrostek >6 mm, ściana >3 mm, obecność appendicolithu).<br>5. Tomografia komputerowa (TK) jamy brzusznej i miednicy z kontrastem i.v. – badanie o najwyższej czułości (>95%) w przypadkach wątpliwych i u osób starszych.<br>6. Test ciążowy (beta-hCG z moczu lub surowicy) – obligatoryjny u każdej kobiety w wieku rozrodczym!",
    drugsAndDoses: "1. Antybiotykoprofilaktyka okołooperacyjna (pojedyncza dawka i.v. 30-60 min przed nacięciem skóry):<br>   - <span class='dose-pill'>Cefazolina 2 g i.v.</span> + <span class='dose-pill'>Metronidazol 500 mg i.v.</span> LUB<br>   - <span class='dose-pill'>Amoksycylina z kwasem klawulanowym 1,2 g i.v.</span>.<br>2. Płynoterapia dożylna przedoperacyjna: <span class='dose-pill'>Płyn wieloelektrolitowy (PWE) 1000-1500 ml i.v.</span> celem wyrównania wolemii.<br>3. Analgezja multimodalna: <span class='dose-pill'>Paracetamol 1 g i.v. co 6 h</span> + w razie silnego bólu <span class='dose-pill'>Morfina 5-10 mg s.c./i.v.</span>.<br>4. <span class='dose-pill'>Całkowity zakaz podawania leków przeczyszczających i lewatyw</span> z uwagi na ryzyko perforacji!",
    procedures: "1. Apendektomia laparoskopowa (złoty standard) – wprowadzenie 3 troakarów, podwiązanie naczyń krezeczki (t. wyrostkowa) klipsami lub bipolarem, zaopatrzenie podstawy wyrostka pętlą Roedera / endoloopem lub staplerem endoskopowym.<br>2. Płukanie i odessanie wysięku ropnego z prawego dołu biodrowego i miednicy mniejszej solą fizjologiczną.<br>3. Usunięcie wyrostka w specjalnym worku endoskopowym (endo-catch) celem uniknięcia zakażenia rany operacyjnej.<br>4. Obligatoryjne przesłanie całego wyrostka do badania histopatologicznego.",
    monitoring: "1. Monitorowanie powikłań wczesnych pooperacyjnych: krwawienie z krezeczki wyrostka, nieszczelność kikuta wyrostka.<br>2. Kontrola temperatury ciała i wskaźników zapalnych w dobie po zabiegu.<br>3. Wczesne uruchomienie pacjenta i powrót do płynów doustnych w 1. dobie pooperacyjnej zgodnie z protokołem ERAS (Enhanced Recovery After Surgery).<br>4. Wypis do domu zazwyczaj w 1-2. dobie po laparoskopii; weryfikacja wyniku badania histopatologicznego po 2-3 tygodniach."
  },
  lekQuestions: [
    {
      question: "Wskaż prawidłowy mechanizm powstawania wędrującego bólu brzucha (objawu Kocha) w przebiegu ostrego zapalenia wyrostka robaczkowego:",
      options: [
        "Początkowy ból trzewny z rozdęcia wyrostka jest przewodzony włóknami autonomicznymi Th8-Th10 do nadbrzusza/pępka, a po objęciu otrzewnej ściennej ból staje się somatyczny i lokalizuje się precyzyjnie w prawym dole biodrowym",
        "Ból wędruje wskutek przesuwania się kamienia kałowego wzdłuż taśm okrężnicy",
        "Wędrówka bólu wynika z migracji bakterii drogą naczyń chłonnych do wątroby",
        "Początkowy ból wynika z zapalenia żołądka, które następnie przenosi się na jelito kręte",
        "Ból wędrujący jest zjawiskiem czysto psychogennym bez podłoża anatomicznego"
      ],
      correct: 0,
      expl: "Rozdęcie wyrostka przez uwięziony śluz stymuluje włókna trzewne biegnące ze splotem krezkowym do rdzenia (Th8-Th10), co mózg interpretuje jako rozlany, tępy ból w linii pośrodkowej ciała (nadbrzusze, pępek). Gdy stan zapalny przekracza ścianę wyrostka i dochodzi do podrażnienia unerwionej somatycznie otrzewnej ściennej (parietal peritoneum), ból staje się ostry, silny i lokalizuje się w prawym dole biodrowym."
    },
    {
      question: "Ból w prawym dole biodrowym pojawiający się podczas powolnego opuszczania uniesionej prawej kończyny dolnej w stawie biodrowym u leżącego na wznak pacjenta to objaw:",
      options: [
        "Jaworskiego (objaw mięśnia biodrowo-lędźwiowego / psoas sign)",
        "Rovsinga",
        "Blumberga",
        "Chełmońskiego",
        "Courvoisiera"
      ],
      correct: 0,
      expl: "Objaw Jaworskiego (w piśmiennictwie międzynarodowym psoas sign) polega na wywołaniu bólu przy rozciąganiu m. biodrowo-lędźwiowego podczas opuszczania wyprostowanej prawej nogi przy jednoczesnym ucisku prawego dołu biodrowego. Świadczy o zapaleniu wyrostka robaczkowego w położeniu zakątniczym (retrocekalnym)."
    },
    {
      question: "Który z poniższych objawów klinicznych polega na wywołaniu bólu w prawym dole biodrowym podczas ucisku lewego dołu biodrowego?",
      options: [
        "Objaw Rovsinga",
        "Objaw Blumberga",
        "Objaw zasłonowy (obturator sign)",
        "Objaw Murphy'ego",
        "Objaw Goldflama"
      ],
      correct: 0,
      expl: "Objaw Rovsinga polega na uciskaniu i przesuwaniu powłok w lewym dole biodrowym w kierunku antyperystaltycznym. Wywołuje to wzrost ciśnienia gazów w okrężnicy zstępującej, poprzecznicy i wstępnicy aż do kątnicy, co prowadzi do jej rozdęcia i nagłego bólu w prawym dole biodrowym w miejscu zapalnie zmienionego wyrostka."
    },
    {
      question: "Wskaż kryterium ultrasonograficzne (USG) potwierdzające rozpoznanie ostrego zapalenia wyrostka robaczkowego:",
      options: [
        "Nieściśliwa pod uciskiem głowicy struktura o średnicy zewnętrznej w przekroju poprzecznym powyżej 6 mm z pogrubieniem ściany",
        "Średnica wyrostka robaczkowego poniżej 4 mm w przekroju podłużnym",
        "Pełne zapadanie się światła wyrostka pod delikatnym uciskiem głowicy",
        "Obecność pęcherzyków gazu w żyle wrotnej",
        "Zanik unaczynienia ściany kątnicy w opcji Color Doppler"
      ],
      correct: 0,
      expl: "Prawidłowy wyrostek robaczkowy ma średnicę do 6 mm i jest w pełni ściśliwy pod uciskiem głowicy USG. W ostrym zapaleniu wyrostek staje się obrzęknięty, sztywny, nieściśliwy (non-compressible), a jego średnica zewnętrzna przekracza 6 mm (często 8-12 mm), z pogrubieniem ściany powyżej 2-3 mm i obecnością wzmożonego przepływu w badaniu naczyniowym Doppler."
    },
    {
      question: "U pacjenta z podejrzeniem ostrego zapalenia wyrostka robaczkowego i silnym bólem brzucha BEZWZGLĘDNIE PRZECIWWSKAZANE jest:",
      options: [
        "Podanie leków przeczyszczających lub wykonanie lewatywy oczyszczającej",
        "Podanie dożylne paracetamolu w dawce 1 g",
        "Wykonanie ultrasonografii jamy brzusznej",
        "Nawadnianie dożylne płynem wieloelektrolitowym",
        "Pobranie krwi na morfologię i CRP"
      ],
      correct: 0,
      expl: "Stosowanie leków przeczyszczających lub lewatyw u chorego z ostrym zapaleniem wyrostka jest kardynalnym błędem i bezwzględnym przeciwwskazaniem! Pobudzenie perystaltyki i wzrost ciśnienia wewnątrz światła zmienionego martwiczo wyrostka prowadzi bezpośrednio do jego pęknięcia (perforacji) i kałowego zapalenia otrzewnej."
    },
    {
      question: "Zgodnie z wytycznymi WSES złotym standardem leczenia operacyjnego ostrego zapalenia wyrostka robaczkowego jest obecnie:",
      options: [
        "Apendektomia laparoskopowa",
        "Apendektomia otwarta z cięcia przyprostnego",
        "Przewlekła antybiotykoterapia doustna amoksycyliną przez 6 miesięcy",
        "Laparotomia zwiadowcza z szerokiego cięcia pośrodkowego",
        "Drenaż przezskórny pod kontrolą USG bez usuwania wyrostka"
      ],
      correct: 0,
      expl: "Apendektomia laparoskopowa jest rekomendowaną metodą z wyboru (złotym standardem) w leczeniu ostrego zapalenia wyrostka robaczkowego u dorosłych i dzieci. Zapewnia mniejszy ból pooperacyjny, krótszy czas hospitalizacji, niższy odsetek zakażeń miejsca operowanego (SSI) oraz umożliwia pełną eksplorację jamy otrzewnej."
    },
    {
      question: "Prawidłowe postępowanie dotyczące antybiotykoprofilaktyki przed planowaną apendektomią w niepowikłanym zapaleniu wyrostka robaczkowego polega na:",
      options: [
        "Podaniu pojedynczej dawki dożylnej antybiotyku o spektrum beztlenowym i tlenowym (np. cefazolina z metronidazolem) w ciągu 30-60 minut przed nacięciem skóry",
        "Podawaniu antybiotyków doustnie przez 7 dni przed zabiegiem",
        "Podaniu antybiotyku dopiero w 3. dobie po operacji w razie wystąpienia gorączki",
        "Rutynowym stosowaniu wankomycyny z gentamycyną przez 14 dni",
        "Całkowitym zaniechaniu antybiotykoterapii, gdyż operacje brzuszne są jałowe"
      ],
      correct: 0,
      expl: "Przedoperacyjna profilaktyka antybiotykowa w chirurgii ostrej brzusznej polega na podaniu pojedynczej dożylnej dawki antybiotyku o spektrum pokrywającym florę jelitową (pałeczki Gram-ujemne i beztlenowce, np. Cefazolina + Metronidazol lub Amoksycylina z klawulanianem) na 30-60 minut przed cięciem skóry. W niepowikłanym zapaleniu wyrostka nie ma wskazań do kontynuowania antybiotyków po zabiegu."
    },
    {
      question: "Dlaczego każdy usunięty operacyjnie wyrostek robaczkowy musi zostać obligatoryjnie przekazany do badania histopatologicznego?",
      options: [
        "W celu weryfikacji rozpoznania oraz wykluczenia nowotworów wyrostka, głównie guzów neuroendokrynnych (NEN / dawniej rakowiaków) i nowotworów śluzowych",
        "Aby potwierdzić, czy pacjent nie połknął toksycznych substancji",
        "W celu wykonania posiewu bakteriologicznego na obecność prątków gruźlicy",
        "Jest to wymagane wyłącznie u pacjentów powyżej 80. roku życia",
        "Badanie histopatologiczne wykonuje się tylko wtedy, gdy wyrostek był makroskopowo niezmieniony"
      ],
      correct: 0,
      expl: "Rutynowe badanie histopatologiczne każdego wyrostka jest obligatoryjnym standardem medycznym. U ok. 1-2% chorych przyczyną zapalenia lub przypadkowym znaleziskiem w wyrostku jest nowotwór – najczęściej guz neuroendokrynny (NEN, rakowiak) lub neoplazja śluzowa (LAMN) czy gruczolakorak, co może decydować o konieczności reoperacji (prawostronnej hemikolektomii)."
    },
    {
      question: "Punkt McBurneya na powłokach jamy brzusznej zlokalizowany jest:",
      options: [
        "W 1/3 odległości na linii łączącej prawy kolec biodrowy przedni górny z pępkiem (bliżej kolca biodrowego)",
        "W 1/3 odległości między oboma kolcami biodrowymi przednimi górnymi po stronie prawej",
        "W punkcie przecięcia linii środkowoobojczykowej prawej z łukiem żebrowym",
        "Dokładnie 2 cm powyżej spojenia łonowego w linii pośrodkowej",
        "W lewym dole biodrowym w połowie odległości do pępka"
      ],
      correct: 0,
      expl: "Punkt McBurneya leży w 1/3 odległości na linii łączącej prawy przedni górny kolec biodrowy z pępkiem, mierząc od strony kolca biodrowego (odpowiada zazwyczaj anatomicznemu odejściu wyrostka od kątnicy). Punkt Lanza z kolei leży w 1/3 odległości na linii łączącej oba kolce biodrowe przednie górne (od strony prawej)."
    },
    {
      question: "Główną przyczyną zatkania światła wyrostka robaczkowego inicjującą ostre zapalenie u osób dorosłych jest:",
      options: [
        "Kamień kałowy (koprolit / appendicolith)",
        "Rozrost grudek chłonnych w przebiegu infekcji wirusowej",
        "Uwięźnięcie pasożytów (np. owsików)",
        "Ciało obce w postaci połkniętej ości rybiej",
        "Skurcz zwieracza Gerlacha"
      ],
      correct: 0,
      expl: "U osób dorosłych najczęstszą przyczyną niedrożności światła wyrostka robaczkowego jest kamień kałowy (koprolit, appendicolith) – zbity fragment treści kałowej wysycony solami wapnia i magnezu. Z kolei u dzieci i młodzieży dominującą przyczyną obturacji jest odczynowy przerost tkanki limfatycznej podśluzówkowej po infekcjach."
    },
    {
      question: "U 24-letniej kobiety z podejrzeniem ostrego zapalenia wyrostka robaczkowego przed podjęciem decyzji o operacji lub diagnostyce TK bezwzględnie należy wykonać:",
      options: [
        "Test ciążowy (oznaczenie beta-hCG w moczu lub surowicy)",
        "Gastroskopię w znieczuleniu miejscowym",
        "Scyntygrafię nerek z DTPA",
        "Test obciążenia glukozą (OGTT)",
        "Kolonoskopię z oceną zastawek"
      ],
      correct: 0,
      expl: "U każdej kobiety w wieku prokreacyjnym z ostrym bólem w podbrzuszu obligatoryjne jest natychmiastowe wykonanie testu ciążowego (beta-hCG). Pęknięta ciąża pozamaciczna w jajowodzie prawym doskonale imituje ostre zapalenie wyrostka, a narażenie rozwijającej się wczesnej ciąży na promieniowanie TK wymaga szczególnej ostrożności i wdrożenia USG/MRI."
    }
  ],
  flashcards: [
    {
      front: "Wyjaśnij mechanizm objawu Kocha (wędrującego bólu) w ostrym zapaleniu wyrostka robaczkowego.",
      back: "Początkowy ból tępy wokół pępka to ból trzewny (rozciągnięcie wyrostka, włókna Th8-Th10). Po objęciu zapaleniem otrzewnej ściennej ból staje się somatyczny (ostry, kłujący) i precyzyjnie lokalizuje się w prawym dole biodrowym."
    },
    {
      front: "Co to jest objaw Jaworskiego (psoas sign) i o czym świadczy jego obecność?",
      back: "Ból w prawym dole biodrowym przy opuszczaniu uprzednio uniesionej prawej kończyny dolnej w stawie biodrowym na wznak. Świadczy o zapaleniu wyrostka w położeniu zakątniczym (podrażnienie m. biodrowo-lędźwiowego)."
    },
    {
      front: "Wymień 4 kluczowe kryteria ostrego zapalenia wyrostka robaczkowego w badaniu USG.",
      back: "1. Średnica zewnętrzna w przekroju poprzecznym >6 mm\n2. Brak ściśliwości pod uciskiem głowicy\n3. Pogrubienie ściany >2-3 mm (objaw tarczy / tarczy strzelniczej)\n4. Obecność kamienia kałowego (appendicolith) dającego cień akustyczny."
    },
    {
      front: "Dlaczego u pacjenta z podejrzeniem ostrego wyrostka leki przeczyszczające i lewatywy są BEZWZGLĘDNIE PRZECIWWSKAZANE?",
      back: "Zwiększają ciśnienie wewnątrzjelitowe i nasilają perystaltykę, co bezpośrednio grozi pęknięciem (perforacją) martwiczej ściany wyrostka i kałowym zapaleniem otrzewnej."
    },
    {
      front: "Jakie jest postępowanie w profilaktyce antybiotykowej przed niepowikłaną apendektomią?",
      back: "Pojedyncza dawka dożylna antybiotyku o spektrum beztlenowym i tlenowym (np. Cefazolina 2 g + Metronidazol 500 mg i.v.) podana 30-60 min przed nacięciem skóry."
    },
    {
      front: "Dlaczego każdy usunięty wyrostek robaczkowy musi być poddany badaniu histopatologicznemu?",
      back: "Aby wykluczyć nowotwory wyrostka robaczkowego (w 1-2% przypadków stwierdza się guz neuroendokrynny NEN / rakowiak lub nowotwór śluzowy LAMN / gruczolakorak, co może wymagać hemikolektomii)."
    }
  ]
};

// Mirror fields for schema compatibility
case126.steps.forEach(step => {
  step.question = step.title;
  step.explanation = step.feedback;
});
case126.lekQuestions.forEach(q => {
  q.opts = q.options;
  q.correctIdx = q.correct;
  q.exp = q.expl;
});

saveCase(case126);

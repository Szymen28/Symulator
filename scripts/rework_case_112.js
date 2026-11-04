const fs = require('fs');
const path = require('path');
const { encryptStringAes } = require('./encrypt_case.js');

const MASTER_KEY = '@LEKSzymon28111999';
const CASES_DIR = path.join(__dirname, '..', 'cases');

console.log("Saving Case 112: Ospa wietrzna (VZV)...");

async function saveCase(caseData) {
  const filePath = path.join(CASES_DIR, caseData.filename);
  const jsonStr = JSON.stringify(caseData, null, 2);
  const encrypted = await encryptStringAes(jsonStr, MASTER_KEY);
  fs.writeFileSync(filePath, JSON.stringify(encrypted, null, 2), 'utf8');
  console.log(`[SAVED] Case #${caseData.id}: ${caseData.filename} (LEK Qs: ${caseData.lekQuestions.length}, Steps: ${caseData.steps.length}, Flashcards: ${caseData.flashcards.length})`);
}

const case112 = {
  id: 112,
  filename: "112_ospa_wietrzna_vzv.json",
  dept: "Pediatria",
  shortTitle: "4-letni Jaś – Wielopostaciowa wysypka 'kropli rosy', świąd i gorączka (Ospa wietrzna)",
  diagnosisTitle: "Ospa wietrzna (Varicella) o typowym przebiegu u dziecka, wywołana pierwotnym zakażeniem wirusem ospy wietrznej i półpaśca (VZV)",
  vitals: [
    { label: "Temperatura ciała", val: "38,6°C", sub: "Gorączka umiarkowana", status: "vital-warn" },
    { label: "Akcja serca (HR)", val: "124/min", sub: "Tachykardia adekwatna do gorączki", status: "vital-ok" },
    { label: "Częstość oddechów (RR)", val: "22/min", sub: "Oddech miarowy, bez duszności", status: "vital-ok" },
    { label: "Saturacja SpO2 / BP", val: "99% | 100/62 mmHg", sub: "Parametry krążeniowo-oddechowe w normie", status: "vital-ok" }
  ],
  vitalsObj: { hr: 124, bp: "100/62", spo2: 99, rr: 22, temp: 38.6, gcs: 15 },
  story: `<p><strong>Pacjent:</strong> 4-letni Jaś został przyprowadzony do gabinetu pediatrycznego przez rodziców z powodu wystąpienia intensywnie swędzącej wysypki pęcherzykowej na całym ciele, powiększenia węzłów chłonnych oraz gorączki do 38,7°C trwającej od dwóch dni.</p><p><strong>Wywiad chorobowy:</strong> Dwa dni temu u chłopca pojawiły się objawy zwiastunowe: gorsze samopoczucie, ból głowy i brak apetytu. Wczoraj rano na tułowiu i owłosionej skórze głowy zauważono drobne, czerwone plamki i grudki, które w ciągu kilkunastu godzin przekształciły się w pęcherzyki wypełnione przejrzystym płynem, przypominające 'krople rosy na płatkach róży'. Dziś rano wysypka zajęła twarz, kończyny oraz błonę śluzową jamy ustnej. Chłopiec bardzo intensywnie się drapie, jest niespokojny. W przedszkolu Jasia trwa ognisko ospy wietrznej (zachorowało już 8 dzieci). Chłopiec nie był szczepiony przeciwko ospie wietrznej.</p><p><strong>Badanie przedmiotowe na SOR:</strong> Dziecko w stanie ogólnym dobrym, rozdrażnione świądem. Na skórze całego ciała – w tym na owłosionej skórze głowy, tułowiu, twarzy i bliższych odcinkach kończyn – widoczne są wykwity w różnych stadiach ewolucji: rumieniowe plamki, grudki, wiotkie pęcherzyki o średnicy 2-4 mm z przezroczystym, a częściowo mętnym płynem, krostki oraz przysychające brunatne strupki (klasyczny polimorfizm rzekomy / obraz 'gwiaździstego nieba'). Kilka drobnych nadżerek po pękniętych pęcherzykach obecnych na podniebieniu miękkim i łukach podniebiennych. Brak objawów wtórnego zakażenia bakteryjnego (brak miodowo-żółtych strupów i nasilonego odczynu zapalnego wokół wykwitów). Węzły chłonne potyliczne i szyjne powiększone do 1,5 cm, przesuwalne, miernie tkliwe. Osłuchowo nad płucami szmer pęcherzykowy prawidłowy, bez rzężeń. Brzuch miękki, niebolesny, wątroba i śledziona niewyczuwalne. Objawy oponowe ujemne.</p>`,
  labs: {
    "Morfologia krwi obwodowej i biochemia": [
      { name: "Leukocyty (WBC)", val: "5,8 G/L", norm: "5,5 - 15,5 G/L", flag: "NORMAL" },
      { name: "Limfocyty", val: "54%", norm: "40 - 60%", flag: "NORMAL" },
      { name: "Hemoglobina (Hb)", val: "12,8 g/dl", norm: "11,5 - 14,5 g/dl", flag: "NORMAL" },
      { name: "Płytki krwi (PLT)", val: "220 G/L", norm: "150 - 450 G/L", flag: "NORMAL" },
      { name: "CRP", val: "4,2 mg/l", norm: "< 5,0 mg/l", flag: "NORMAL" },
      { name: "Aminotransferaza ALT", val: "24 IU/l", norm: "< 35 IU/l", flag: "NORMAL" }
    ],
    "Diagnostyka wirusologiczna (weryfikacja)": [
      { name: "Ocena kliniczna wykwitów", val: "Jednoznaczny obraz ospy wietrznej (obraz 'gwiaździstego nieba')", norm: "Brak wykwitów", flag: "HIGH" },
      { name: "PCR VZV z płynu pęcherzykowego (opcjonalny)", val: "Wykryto DNA wirusa Varicella Zoster", norm: "Ujemny", flag: "HIGH" }
    ]
  },
  steps: [
    {
      stepNum: 1,
      title: "Krok 1: Identyfikacja morfologii wykwitów i polimorfizmu rzekomego",
      desc: "Oglądasz skórę 4-letniego Jasia. Widzisz wykwity w rozmaitych stadiach rozwoju: plamki, grudki, pęcherzyki o wyglądzie kropli rosy, krosty i strupki zlokalizowane równocześnie na tułowiu, twarzy i owłosionej skórze głowy. Jak nazywa się to charakterystyczne zjawisko kliniczne?",
      scenario: "Oglądasz skórę 4-letniego Jasia. Widzisz wykwity w rozmaitych stadiach rozwoju: plamki, grudki, pęcherzyki o wyglądzie kropli rosy, krosty i strupki zlokalizowane równocześnie na tułowiu, twarzy i owłosionej skórze głowy. Jak nazywa się to charakterystyczne zjawisko kliniczne?",
      options: [
        {
          text: "Polimorfizm rzekomy (obraz 'gwiaździstego nieba') – jednoczesne występowanie kolejnych stadiów ewolucyjnych tego samego wykwitu (plamka -> grudka -> pęcherzyk -> krosta -> strupek) w wyniku rzutowego wysiewu zmian",
          correct: true,
          isCorrect: true,
          feedback: "✅ PRAWIDŁOWO! <strong>Kardynalna cecha ospy wietrznej!</strong> Rzutowy wysiew wykwitów (nowe zmiany pojawiają się falami co 24-48 godzin) powoduje, że obok siebie na tym samym obszarze skóry widoczne są świeże plamki i pęcherzyki oraz przysychające krosty i strupki. Nazywa się to polimorfizmem rzekomym (obraz gwiaździstego nieba) i pozwala odróżnić ospę wietrzną od ospy prawdziwej (gdzie wykwity były monomorficzne – wszystkie w tym samym stadium)."
        },
        {
          text: "Polimorfizm prawdziwy – jednoczesne powstawanie różnych pierwotnych wykwitów o odmiennej etiologii genetycznej",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>To nie jest polimorfizm prawdziwy!</strong> W ospie każdy wykwit przechodzi tę samą sekwencję rozwojową, a ich różnorodność na skórze wynika z fali kolejnych wysiewów (polimorfizm rzekomy)."
        },
        {
          text: "Objaw Nikolskiego – spełzanie naskórka pod wpływem ucisku palcem",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Objaw Nikolskiego</strong> jest typowy dla pęcherzycy zwykłej lub zespołu SSSS/TEN, a nie dla typowej ospy wietrznej."
        },
        {
          text: "Objaw Auspitza – punkcikowate krwawienie po zdrapaniu łuski",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Objaw Auspitza</strong> to cecha łuszczycy plackowatej."
        }
      ]
    },
    {
      stepNum: 2,
      title: "Krok 2: Znaczenie lokalizacji wykwitów na owłosionej skórze głowy",
      desc: "Zauważasz liczne pęcherzyki i strupki we włosach na głowie chłopca. Dlaczego obecność wykwitów na owłosionej skórze głowy ma tak istotne znaczenie w diagnostyce różnicowej wysypek dziecięcych?",
      scenario: "Zauważasz liczne pęcherzyki i strupki we włosach na głowie chłopca. Dlaczego obecność wykwitów na owłosionej skórze głowy ma tak istotne znaczenie w diagnostyce różnicowej wysypek dziecięcych?",
      options: [
        {
          text: "Zajęcie owłosionej skóry głowy oraz błon śluzowych jamy ustnej jest wysoce swoiste dla ospy wietrznej i pozwala odróżnić ją od większości innych wysypek wirusowych oraz ukąszeń owadów",
          correct: true,
          isCorrect: true,
          feedback: "✅ PRAWIDŁOWO! <strong>Pewniak kliniczny!</strong> Ospa wietrzna niemal zawsze zajmuje skórę owłosioną głowy (gdzie często pojawiają się pierwsze wykwity) oraz błony śluzowe (jama ustna, spojówki, narządy płciowe). Większość innych chorób wysypkowych (np. różyczka, rumień nagły, rumień zakaźny czy reakcje na ukąszenia owadów) oszczędza skórę owłosioną głowy."
        },
        {
          text: "Świadczy o natychmiastowym przejściu wirusa do komórek mózgu i konieczności pilnej kraniektomii",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Brak takiego powiązania!</strong> Zajęcie skóry głowy jest naturalnym elementem uogólnionego wysiewu i nie oznacza bezpośredniego zapalenia mózgu."
        },
        {
          text: "Jest patognomoniczne wyłącznie dla wszy głowowej powikłanej czyracznością",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Błędne rozpoznanie!</strong>"
        },
        {
          text: "Wskazuje na to, że pacjent nie choruje na ospę, lecz na łojotokowe zapalenie skóry",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>ŁZS nie daje pęcherzyków z gorączką i wysypką na całym ciele!</strong>"
        }
      ]
    },
    {
      stepNum: 3,
      title: "Krok 3: Okres zakaźności i zasady izolacji epidemiologicznej",
      desc: "Rodzice pytają, jak długo Jaś zaraża inne dzieci i od kiedy do kiedy pacjent z ospą wietrzną jest źródłem zakażenia dla otoczenia. Co im wyjaśniasz?",
      scenario: "Rodzice pytają, jak długo Jaś zaraża inne dzieci i od kiedy do kiedy pacjent z ospą wietrzną jest źródłem zakażenia dla otoczenia. Co im wyjaśniasz?",
      options: [
        {
          text: "Pacjent zakaża od 1-2 dni przed pojawieniem się pierwszych wykwitów wysypkowych aż do momentu przyschnięcia wszystkich pęcherzyków w strupki (zazwyczaj około 6-8 dni od początku wysypki)",
          correct: true,
          isCorrect: true,
          feedback: "✅ PRAWIDŁOWO! <strong>Kluczowe pytanie każdego LEK i kanon epidemiologii!</strong> VZV cechuje się bardzo wysoką zakaźnością (wskaźnik R0 = 10-12, ryzyko zakażenia podatnego domownika wynosi >90%). Chory zakaża drogą kropelkową i przez kontakt bezpośredni już na 24-48 godzin PRZED wystąpieniem wysypki, a przestaje zakażać dopiero wtedy, gdy WSZYSTKIE pęcherzyki zamienią się w suche strupki. Same suche strupki nie są już zakaźne!"
        },
        {
          text: "Zakaźność pojawia się dopiero po odpadnięciu wszystkich strupów i trwa przez rok w kale",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Opadłe strupki nie zawierają zakaźnego wirusa</strong>, a wirus nie eliminuje się z kałem przez rok."
        },
        {
          text: "Zakaźność trwa tylko przez pierwsze 3 godziny od wystąpienia pierwszego pęcherzyka",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Zakaźność trwa wiele dni</strong>, dopóki występują świeże pęcherzyki z płynem bogatym w wiriony VZV."
        },
        {
          text: "Ospa wietrzna nie przenosi się drogą kropelkową, a jedynie przez krew",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Ospa jest wybitnie zaraźliwa drogą kropelkową i powietrzną</strong> (wirus rozprzestrzenia się z prądami powietrza na odległość kilkunastu metrów!)."
        }
      ]
    },
    {
      stepNum: 4,
      title: "Krok 4: Postępowanie przeciwgorączkowe – KRYTYCZNE ostrzeżenie lekarskie",
      desc: "Jaś gorączkuje do 38,7°C. Mama pyta, jaki lek przeciwgorączkowy może podawać. Przed jakim powszechnie stosowanym lekiem przeciwgorączkowym/przeciwzapalnym musisz KATEGORYCZNIE ostrzec rodziców dziecka z ospą wietrzną?",
      scenario: "Jaś gorączkuje do 38,7°C. Mama pyta, jaki lek przeciwgorączkowy może podawać. Przed jakim powszechnie stosowanym lekiem przeciwgorączkowym/przeciwzapalnym musisz KATEGORYCZNIE ostrzec rodziców dziecka z ospą wietrzną?",
      options: [
        {
          text: "Należy bezwzględnie unikać Ibuprofenu (oraz innych NLPZ) ze względu na udokumentowane zwiększone ryzyko ciężkich, inwazyjnych zakażeń tkanek miękkich wywołanych przez paciorkowce i gronkowce (w tym martwiczego zapalenia powięzi – necrotizing fasciitis); lekiem z wyboru jest Paracetamol. Bezwzględnie przeciwwskazana jest też aspiryna (zespół Reye'a)!",
          correct: true,
          isCorrect: true,
          feedback: "✅ PRAWIDŁOWO! <strong>Kluczowy alert bezpieczeństwa klinicznego i częste pytanie LEK!</strong> Stosowanie ibuprofenu w przebiegu ospy wietrznej wiąże się ze statystycznie istotnym wzrostem ryzyka powikłań bakteryjnych skóry i tkanki podskórnej, zwłaszcza inwazyjnego zakażenia paciorkowcowego i martwiczego zapalenia powięzi (necrotizing fasciitis), które jest stanem zagrożenia życia! Z tego powodu jedynym zalecanym lekiem przeciwgorączkowym w ospie u dzieci jest PARACETAMOL. Ponadto kwas acetylosalicylowy (aspiryna) jest bezwzględnie zakazany ze względu na śmiertelne ryzyko zespołu Reye'a."
        },
        {
          text: "Należy unikać Paracetamolu, a lekiem pierwszego rzutu z wyboru jest wyłącznie kwas acetylosalicylowy (aspiryna)",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD KRYTYCZNY! <strong>Aspiryna u dziecka z ospą wywołuje zespół Reye'a</strong> (ostre stłuszczenie wątroby z encefalopatią i śmiertelnością >40%)!"
        },
        {
          text: "Można bez żadnych ograniczeń podawać naprzemiennie ibuprofen z ketoprofenem w maksymalnych dawkach",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD KRYTYCZNY! <strong>NLPZ w ospie drastycznie podnoszą ryzyko martwiczego zapalenia powięzi!</strong>"
        },
        {
          text: "Gorączki w ospie nie wolno w ogóle obniżać farmakologicznie, pacjenta należy okładać wyłącznie suchym lodem",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Gorączkę obniża się bezpiecznie paracetamolem</strong>, a suchy lód doprowadziłby do odmrożeń i martwicy skóry!"
        }
      ]
    },
    {
      stepNum: 5,
      title: "Krok 5: Prawidłowa pielęgnacja skóry i walka z przestarzałymi mitami",
      desc: "Babcia Jasia radzi rodzicom, aby 'nie kąpali dziecka przez 2 tygodnie' oraz smarowali wszystkie pęcherzyki grubą warstwą białej papki pudrowej z cynkiem (puder płynny). Jak brzmi współczesne, zgodne z EBM stanowisko pediatrów i dermatologów?",
      scenario: "Babcia Jasia radzi rodzicom, aby 'nie kąpali dziecka przez 2 tygodnie' oraz smarowali wszystkie pęcherzyki grubą warstwą białej papki pudrowej z cynkiem (puder płynny). Jak brzmi współczesne, zgodne z EBM stanowisko pediatrów i dermatologów?",
      options: [
        {
          text: "Zaleca się codzienne, krótkie kąpiele higieniczne w letniej wodzie (np. z dodatkiem nadmanganianu potasu) i delikatne osuszanie ręcznikiem bez pocierania. Stosowanie papek pudrowych i płynnych pudrów jest PRZECIWWSKAZANE, ponieważ tworzą one okluzyjną skorupę sprzyjającą beztlenowym zakażeniom bakteryjnym i utrudniają ocenę wykwitów",
          correct: true,
          isCorrect: true,
          feedback: "✅ PRAWIDŁOWO! <strong>Współczesny standard leczenia ospy wietrznej!</strong> Mity o unikaniu kąpieli prowadzą do brudu i masywnych nadkażeń gronkowcowo-paciorkowcowych. Kąpiel higieniczna jest bezwzględnie zalecana. Z kolei płynne pudry i papki cynkowe wysychają w twardą skorupę, pod którą namnażają się bakterie beztlenowe i dochodzi do głębokiej martwicy naskórka z powstaniem trwałych blizn. W celu złagodzenia świądu stosuje się leki przeciwhistaminowe doustnie oraz ewentualnie miejscowe preparaty antyseptyczne (np. Octenisept)."
        },
        {
          text: "Papka pudrowa z hydrokortyzonem powinna być nakładana grubością 1 cm na całe ciało",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Miejscowe sterydy są przeciwwskazane</strong> w czynnej infekcji wirusowej skóry (sprzyjają rozsiewowi zakażenia)."
        },
        {
          text: "Kąpiele są zakazane do 18. roku życia, skórę czyści się wyłącznie benzyną ekstrakcyjną",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Absurdalna i niebezpieczna procedura!</strong>"
        },
        {
          text: "Należy przekłuwać wszystkie pęcherzyki igłą, aby przyspieszyć ich gojenie",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Nigdy nie wolno przekłuwać ani zdrapywać pęcherzyków!</strong> Zwiększa to ryzyko wtórnej infekcji bakteryjnej i pozostawienia trwałych blizn ospowych."
        }
      ]
    },
    {
      stepNum: 6,
      title: "Krok 6: Wskazania do leczenia przeciwwirusowego Acyklowirem",
      desc: "Mama pyta, czy Jaś powinien natychmiast otrzymać doustny lek przeciwwirusowy – Acyklowir. U jakich pacjentów wg zaleceń PTN i AAP rutynowo wdraża się Acyklowir w ospie wietrznej?",
      scenario: "Mama pyta, czy Jaś powinien natychmiast otrzymać doustny lek przeciwwirusowy – Acyklowir. U jakich pacjentów wg zaleceń PTN i AAP rutynowo wdraża się Acyklowir w ospie wietrznej?",
      options: [
        {
          text: "Acyklowir NIE jest rutynowo zalecany u uprzednio zdrowych dzieci do 12. roku życia o łagodnym przebiegu. Jest bezwzględnie wskazany u osób z niedoborami odporności, noworodków, młodzieży >12 lat, dorosłych, kobiet w ciąży, pacjentów z ciężkimi chorobami przewlekłymi skóry (np. AZS) lub płuc, a także w powikłaniach ospy",
          correct: true,
          isCorrect: true,
          feedback: "✅ PRAWIDŁOWO! <strong>Precyzyjne wytyczne stosowania Acyklowiru!</strong> U zdrowych małych dzieci ospa wietrzna ma przebieg łagodny i samoograniczający się; acyklowir skraca gorączkę jedynie o ok. 24 godziny i nie zapobiega latencji wirusa w zwojach czuciowych. Dlatego leczenie przeciwwirusowe rezerwuje się dla grup podwyższonego ryzyka ciężkiego przebiegu: dzieci >12 r.ż., dorośli, ciąża, osoby z niedoborami odporności, przewlekłą sterydoterapią, przewlekłymi chorobami skóry (ryzyko eczema herpeticum / vaccinatum) oraz przy powikłaniach (zapalenie płuc, zapalenie mózgu)."
        },
        {
          text: "Acyklowir musi otrzymać każde dziecko w pierwszych 5 minutach od wystąpienia gorączki pod rygorem zgonu",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Ospa u zdrowego 4-latka ma zazwyczaj łagodny charakter</strong> i wymaga leczenia objawowego."
        },
        {
          text: "Acyklowir jest zakazany w ospie wietrznej, ponieważ działa wyłącznie na wirusy grypy",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Acyklowir jest lekiem z wyboru wobec wirusów Herpes (HSV-1, HSV-2, VZV)!</strong> Na grypę działają inhibitory neuraminidazy (Oseltamiwir)."
        },
        {
          text: "Acyklowir podaje się wyłącznie pacjentom, którzy wcześniej przebyli półpasiec",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Półpasiec jest reaktywacją zakażenia utajonego</strong>, a nie wskazaniem wstępnym do leczenia ospy pierwotnej."
        }
      ]
    },
    {
      stepNum: 7,
      title: "Krok 7: Rozpoznawanie powikłań neurologicznych (ostra ataksja móżdżkowa)",
      desc: "W 8. dobie od wysypki Jaś zaczyna się chwiać przy chodzeniu, ma chód na szerokiej podstawie ('marynarski'), drżenie rąk i mowę skandowaną, bez gorączki i bez objawów oponowych. Jakie jest najbardziej prawdopodobne powikłanie ospy i jakie jest rokowanie?",
      scenario: "W 8. dobie od wysypki Jaś zaczyna się chwiać przy chodzeniu, ma chód na szerokiej podstawie ('marynarski'), drżenie rąk i mowę skandowaną, bez gorączki i bez objawów oponowych. Jakie jest najbardziej prawdopodobne powikłanie ospy i jakie jest rokowanie?",
      options: [
        {
          text: "Ostre zapalenie móżdżku (ostra ataksja móżdżkowa / cerebellitis) – najczęstsze powikłanie neurologiczne ospy u dzieci; rokowanie jest bardzo dobre, objawy ustępują samoistnie w ciągu kilku tygodni bez trwałych ubytków neurologicznych",
          correct: true,
          isCorrect: true,
          feedback: "✅ PRAWIDŁOWO! <strong>Klasyczny obraz cerebellitis po ospie!</strong> Ostra ataksja móżdżkowa rozwija się zazwyczaj pod koniec 1. lub w 2. tygodniu choroby (częstość ok. 1:4000 przypadków u dzieci). Manifestuje się zaburzeniami równowagi, chodem na szerokiej podstawie, oczopląsem i dysmetrią. Ma podłoże immunologiczne (postinfekcyjne) i charakteryzuje się doskonałym rokowaniem – pełne wyzdrowienie następuje samoistnie w ciągu 2-4 tygodni. Należy ją odróżnić od groźnego, wczesnego zapalenia mózgu (encephalitis), które przebiega z zaburzeniami świadomości i drgawkami."
        },
        {
          text: "Udar krwotoczny pnia mózgu wymagający pilnej kraniotomii odbarczającej",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Zaburzenia chodu u dziecka po ospie</strong> o symetrycznym charakterze to niemal zawsze ostra ataksja móżdżkowa, a nie udar."
        },
        {
          text: "Stwardnienie zanikowe boczne o piorunującym początku",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>SLA nie występuje u 4-letnich dzieci</strong> po infekcjach wirusowych."
        },
        {
          text: "Zwyrodnienie soczewkowate Wilsona",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Choroba Wilsona</strong> to wrodzone zaburzenie metabolizmu miedzi ujawniające się w starszym wieku objawami wątrobowymi i pozapiramidowymi."
        }
      ]
    },
    {
      stepNum: 8,
      title: "Krok 8: Profilaktyka poekspozycyjna u osób z kontaktu",
      desc: "Mama Jasia jest w 14. tygodniu ciąży i nie pamięta, czy chorowała w dzieciństwie na ospę wietrzną. Badanie serologiczne wykonane w trybie pilnym wykazało brak przeciwciał anty-VZV IgG (kobieta jest seroujemna / podatna na zakażenie). Jakie postępowanie profilaktyczne poekspozycyjne jest bezwzględnie wskazane u ciężarnej?",
      scenario: "Mama Jasia jest w 14. tygodniu ciąży i nie pamięta, czy chorowała w dzieciństwie na ospę wietrzną. Badanie serologiczne wykonane w trybie pilnym wykazało brak przeciwciał anty-VZV IgG (kobieta jest seroujemna / podatna na zakażenie). Jakie postępowanie profilaktyczne poekspozycyjne jest bezwzględnie wskazane u ciężarnej?",
      options: [
        {
          text: "Podanie swoistej immunoglobuliny przeciwko wirusowi ospy wietrznej i półpaśca (VZIG / Varitect) domięśniowo lub dożylnie tak szybko jak to możliwe, optymalnie do 96 godzin (maksymalnie do 10 dni) od ekspozycji; szczepionka żywa jest w ciąży BEZWZGLĘDNIE PRZECIWWSKAZANA!",
          correct: true,
          isCorrect: true,
          feedback: "✅ PRAWIDŁOWO! <strong>Życiowo ważna decyzja kliniczna i pewniak LEK!</strong> U osób z grup wysokiego ryzyka powikłań ospy (kobiety w ciąży bez odporności, noworodki matek, które zachorowały na ospę 5 dni przed lub 2 dni po porodzie, pacjenci z ciężkim niedoborem odporności) po kontakcie z chorym należy jak najszybciej podać swoistą immunoglobulinę VZIG (do 96 godzin, dopuszczalnie do 10 dni). Żywa atenuowana szczepionka przeciwko ospie wietrznej jest w ciąży BEZWZGLĘDNIE PRZECIWWSKAZANA (ryzyko teratogenności wirusa szczepionkowego)."
        },
        {
          text: "Natychmiastowe podanie żywej atenuowanej szczepionki przeciw ospie wietrznej w podwójnej dawce",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD KRYTYCZNY! <strong>Żywe szczepionki są bezwzględnie przeciwwskazane w ciąży!</strong> Szczepionkę można podać po ekspozycji osobom zdrowym niebędącym w ciąży do 72 godzin od kontaktu."
        },
        {
          text: "Zalecenie natychmiastowego przerwania ciąży ze względów epidemiologicznych",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Ekspozycja na ospę nie jest wskazaniem do terminacji ciąży!</strong> Podanie VZIG skutecznie chroni matkę i płód."
        },
        {
          text: "Całkowity brak jakichkolwiek działań i oczekiwanie na poród",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD KRYTYCZNY! <strong>Ospa u nieszczepionej ciężarnej wiąże się z 10-20% ryzykiem ciężkiego ospowego zapalenia płuc o wysokiej śmiertelności</strong> oraz zespołem ospy wrodzonej u płodu (blizny skórne, hipoplazja kończyn, wady OUN i oka)."
        }
      ]
    }
  ],
  pathoNodes: [
    {
      badge: "OGNIWO 1 • Wrota zakażenia i pierwotna wiremia VZV",
      title: "Inhalacja kropelkowa, replikacja w tkance limfatycznej nosogardła i rozsiew",
      short: "Wirus VZV wnika drogą oddechową, namnaża się w migdałkach i wywołuje pierwotną wiremię.",
      detail: "Wirus ospy wietrznej i półpaśca (Varicella Zoster Virus – VZV, ludzki herpeswirus typu 3 – HHV-3) wnika do organizmu podatnego gospodarza drogą kropelkową lub wziewną (aerozol z pęcherzyków skórnych). Replikuje się w komórkach nabłonkowych górnych dróg oddechowych oraz w regionalnej tkance limfatycznej pierścienia Waldeyera. Następnie dochodzi do pierwotnej wiremii (4.-6. dzień po zakażeniu), podczas której wirus wędruje za pośrednictwem zakażonych limfocytów T do komórek układu siateczkowo-śródbłonkowego wątroby i śledziony, gdzie ulega dalszej, intensywnej multiplikacji w okresie wylęgania (10-21 dni).",
      target: "Profilaktyka pierwotna: <span class='dose-pill'>Szczepionka przeciw VZV (żywa atenuowana)</span> w schemacie 2-dawkowym (podskórnie od 9. m.ż., odstęp min. 6 tyg.).",
      desc: "Inhalacja kropelkowa, replikacja w tkance limfatycznej nosogardła i rozsiew.",
      drugTarget: "Profilaktyka pierwotna: <span class='dose-pill'>Szczepionka przeciw VZV (żywa atenuowana)</span> w schemacie 2-dawkowym (podskórnie od 9. m.ż., odstęp min. 6 tyg.)."
    },
    {
      badge: "OGNIWO 2 • Wtórna wiremia i tropizm do naskórka",
      title: "Zakażenie komórek warstwy podstawnej naskórka i powstawanie pęcherzyków",
      short: "Wtórna wiremia prowadzi do inwazji komórek naskórka i tworzenia pęcherzyków śródnaskórkowych.",
      detail: "Około 10.-14. dnia dochodzi do wtórnej wiremii. Zakażone limfocyty T transportują wirus do śródbłonka naczyń włosowatych skóry i komórek nabłonkowych mieszków włosowych oraz warstwy podstawnej naskórka. VZV wywołuje zwyrodnienie balonowate keratynocytów, akantolizę oraz powstawanie wielojądrowych komórek olbrzymich z wewnątrzjądrowymi ciałkami wtrętowymi (kwasochłonne ciałka Cowdry typu A). Płyn wysiękowy gromadzi się pod warstwą rogową, tworząc jednokomorowe, cienkościenne pęcherzyki wypełnione płynem bogatym w zakaźne wiriony ('krople rosy na płatkach róży').",
      target: "Leczenie przeciwwirusowe w grupach ryzyka: <span class='dose-pill'>Acyklowir 20 mg/kg m.c. p.o. (max. 800 mg)</span> 4 razy na dobę przez <span class='dose-pill'>5-7 dni</span> lub <span class='dose-pill'>10-15 mg/kg m.c. i.v.</span> co 8 h w ciężkich powikłaniach.",
      desc: "Zakażenie komórek warstwy podstawnej naskórka i powstawanie pęcherzyków.",
      drugTarget: "Leczenie przeciwwirusowe w grupach ryzyka: <span class='dose-pill'>Acyklowir 20 mg/kg m.c. p.o. (max. 800 mg)</span> 4 razy na dobę przez <span class='dose-pill'>5-7 dni</span> lub <span class='dose-pill'>10-15 mg/kg m.c. i.v.</span> co 8 h w ciężkich powikłaniach."
    },
    {
      badge: "OGNIWO 3 • Świąd i wrota wtórnych nadkażeń bakteryjnych",
      title: "Drażnienie wolnych zakończeń nerwowych, świąd i inwazja gronkowcowo-paciorkowcowa",
      short: "Uwalnianie mediatorów zapalnych wywołuje intensywny świąd, a drapanie otwiera wrota bakteriom.",
      detail: "Miejscowy proces zapalny i liza keratynocytów stymulują uwalnianie histaminy, neuropeptydów i cytokin prozapalnych, które drażnią skórne włókna nerwowe typu C, wywołując silny, męczący świąd. Drapanie wykwitów prowadzi do mechanicznego przerwania ciągłości naskórka, co stwarza bezpośrednie wrota dla bakterii kolonizujących skórę (Staphylococcus aureus, Streptococcus pyogenes). Może to prowadzić do liszajca zakaźnego, ropowicy, a pod wpływem stosowania NLPZ (ibuprofenu) – do zagrażającego życiu martwiczego zapalenia powięzi (necrotizing fasciitis).",
      target: "Kontrola świądu i aseptyka: <span class='dose-pill'>Hydroksyzyna 1-2 mg/kg m.c./dobę p.o.</span> lub <span class='dose-pill'>Dimetynden p.o.</span>; codzienna letnia kąpiel, krótko obcięte paznokcie; <span class='dose-pill'>zakaz Ibuprofenu!</span>",
      desc: "Drażnienie wolnych zakończeń nerwowych, świąd i inwazja gronkowcowo-paciorkowcowa.",
      drugTarget: "Kontrola świądu i aseptyka: <span class='dose-pill'>Hydroksyzyna 1-2 mg/kg m.c./dobę p.o.</span> lub <span class='dose-pill'>Dimetynden p.o.</span>; codzienna letnia kąpiel, krótko obcięte paznokcie; <span class='dose-pill'>zakaz Ibuprofenu!</span>"
    },
    {
      badge: "OGNIWO 4 • Latencja wirusa w zwojach nerwowych i półpasiec",
      title: "Wsteczny transport aksonalny do zwojów rdzeniowych i nerwów czaszkowych",
      short: "Wirus wnika do zakończeń nerwowych czuciowych i przechodzi w stan uśpienia (latencji).",
      detail: "Podczas wysypki wiriony VZV wnikają do zakończeń czuciowych nerwów obwodowych w skórze i drogą wstecznego transportu aksonalnego przemieszczają się do ciał neuronów w zwojach korzeni grzbietowych rdzenia kręgowego (DRG) oraz zwojach czuciowych nerwów czaszkowych (zwłaszcza zwoju Gassera n. V). Tam wirus przechodzi w stan dożywotniej latencji w postaci episomalnego DNA. W warunkach spadku odporności komórkowej (starzenie się układu immunologicznego, immunosupresja, stres) dochodzi do reaktywacji wirusa, jego namnożenia i zstępującej wędrówki wzdłuż dermatomu, co manifestuje się jako półpasiec (herpes zoster).",
      target: "Profilaktyka półpaśca u dorosłych: <span class='dose-pill'>Rekombinowana szczepionka podjednostkowa Shingrix (2 dawki)</span> zalecana dla osób >=50. r.ż. oraz dorosłych z grup ryzyka.",
      desc: "Wsteczny transport aksonalny do zwojów rdzeniowych i nerwów czaszkowych.",
      drugTarget: "Profilaktyka półpaśca u dorosłych: <span class='dose-pill'>Rekombinowana szczepionka podjednostkowa Shingrix (2 dawki)</span> zalecana dla osób >=50. r.ż. oraz dorosłych z grup ryzyka."
    }
  ],
  diffTable: {
    title: "⚔️ Tabela Różnicowa: Ospa wietrzna vs Ospa prawdziwa vs Choroba dłoni, stóp i jamy ustnej (HFMD) vs Liszajec zakaźny",
    headers: ["Cecha kliniczna", "Ospa wietrzna (Varicella)", "Ospa prawdziwa (Variola)", "HFMD (Choroba bostońska)", "Liszajec zakaźny (Impetigo)"],
    rows: [
      ["Etiologia", "Varicella Zoster Virus (VZV)", "Variola virus (Poxviridae - eradykowana)", "Enterowirusy (Coxsackie A16, Enterowirus 71)", "S. aureus, S. pyogenes"],
      ["Ewolucja wykwitów", "Polimorfizm rzekomy ('gwiaździste niebo' - plamka, pęcherzyk, strup na raz)", "Monomorfizm (wszystkie wykwity w tym samym stadium na danym obszarze)", "Monomorficzne grudki i pęcherzyki o podłużnym kształcie", "Pęcherze wiotkie szybko pękające, tworzące strupy"],
      ["Rozmieszczenie zmian", "Ośrodkowe (tułów > twarz > kończyny); obecne na głowie owłosionej i śluzówkach", "Odśrodkowe (twarz i dystalne części kończyn > tułów)", "Dłonie, podeszwy stóp, pośladki, błona śluzowa jamy ustnej", "Okolice otworów naturalnych twarzy (nos, usta) i rąk"],
      ["Charakter pęcherzyka", "Cienkościenny, wiotki, jednokomorowy ('kropla rosy')", "Grubościenny, twardy, głęboki, wielokomorowy, pępkowaty", "Podłużny, otoczony czerwoną obwódką, niepękający łatwo", "Miodowo-żółte, nawarstwione strupy"],
      ["Zajęcie owłosionej głowy", "BARDZO TYPOWE (niemal u 100% chorych)", "Obecne, ale mniej dominujące niż na twarzy", "Niezwykle rzadkie / brak", "Możliwe przy liszajcu owłosionej skóry głowy"],
      ["Świąd skóry", "Bardzo silny, uporczywy", "Bolesność zmian przeważa nad świądem", "Umiarkowany lub brak świądu (bolesność jamy ustnej)", "Umiarkowany świąd"],
      ["Leczenie przyczynowe", "Objawowe; Acyklowir w grupach ryzyka", "Leki przeciwwirusowe (Tecovirimat) - eradykowana", "Wyłącznie leczenie objawowe", "Miejscowo Mupirocyna/Retapamulina; Cefaleksyna p.o."],
      ["Profilaktyka poekspozycyjna", "Szczepionka do 72h lub VZIG do 96h (u grup ryzyka)", "Szczepienie krowianką (Vaccinia)", "Brak swoistej profilaktyki", "Higiena rąk, izolacja wykwitów"]
    ]
  },
  dutySummary: {
    overview: "Ospa wietrzna (varicella) jest wysoce zakaźną pierwotną infekcją wywołaną przez VZV. Charakteryzuje się nagłym wysiewem swędzącej osutki pęcherzykowej o charakterze polimorfizmu rzekomego ('gwiaździste niebo'), obejmującej tułów, twarz, błony śluzowe i owłosioną skórę głowy. U zdrowych dzieci przebiega łagodnie, wymagając leczenia objawowego (paracetamol, higiena skóry). Bezwzględnie zakazany jest ibuprofen (ryzyko martwiczego zapalenia powięzi) oraz aspiryna (zespół Reye'a).",
    diagnostics: "1. Rozpoznanie kliniczne: typowy rzutowy obraz wykwitów (plamka -> grudka -> pęcherzyk 'kropli rosy' -> krosta -> strupek) z zajęciem owłosionej skóry głowy.<br>2. W przypadkach wątpliwych lub powikłanych: badanie PCR VZV z płynu pobranego ze świeżego pęcherzyka.<br>3. Ocena w kierunku powikłań bakteryjnych (rumień, obrzęk, miodowe strupy, bolesność tkanek miękkich).<br>4. Monitorowanie neurologiczne: wykluczenie ataksji móżdżkowej (cerebellitis) oraz zapalenia mózgu.",
    drugsAndDoses: "1. Lek przeciwgorączkowy I rzutu: <span class='dose-pill'>Paracetamol 15 mg/kg m.c. p.o./p.r.</span> co 4-6 h (max. 60 mg/kg/dobę).<br>2. KATEGORYCZNY ZAKAZ: <span class='dose-pill'>Ibuprofen i inne NLPZ</span> (ryzyko necrotizing fasciitis!) oraz <span class='dose-pill'>Kwas acetylosalicylowy</span> (ryzyko zespołu Reye'a!).<br>3. Leki przeciwświądowe: <span class='dose-pill'>Hydroksyzyna 1-2 mg/kg m.c./dobę p.o.</span> w dawkach podzielonych lub <span class='dose-pill'>Cetyryzyna 5-10 mg p.o.</span> raz na dobę.<br>4. Leczenie przeciwwirusowe (w grupach ryzyka: >12 r.ż., AZS, przewlekła sterydoterapia, dorośli): <span class='dose-pill'>Acyklowir 20 mg/kg m.c. p.o. (max. 800 mg)</span> 4 razy na dobę przez <span class='dose-pill'>5-7 dni</span>; w postaciach ciężkich i powikłanych: <span class='dose-pill'>Acyklowir 10-15 mg/kg m.c. i.v.</span> co 8 h.<br>5. Profilaktyka poekspozycyjna u ciężarnych seroujemnych i noworodków: <span class='dose-pill'>Swoista immunoglobulina VZIG (Varitect) 1 ml/kg m.c. i.v.</span> w ciągu pierwszych 96 godzin od kontaktu.",
    procedures: "1. Codzienna higiena skóry: krótkie kąpiele w letniej wodzie (można dodać roztwór nadmanganianu potasu o barwie bladoróżowej), delikatne osuszanie ręcznikiem przez przykładanie bez tarcia.<br>2. Bezwzględny zakaz stosowania papek pudrowych, płynnych pudrów i maści cynkowych na pęcherzyki (ryzyko beztlenowego nadkażenia i martwicy!).<br>3. Krótkie obcięcie paznokci dziecka i zakładanie bawełnianych rękawiczek na noc w celu ograniczenia drapania.<br>4. Izolacja chorego do czasu przyschnięcia wszystkich pęcherzyków w suche strupki.",
    monitoring: "1. Kontrola gojenia wykwitów skórnych i wczesne wykrywanie wtórnych nadkażeń bakteryjnych (liszajec, ropowica).<br>2. Monitorowanie stanu ogólnego pod kątem powikłań płucnych (kaszel, duszność, tachypnoe – podejrzenie ospowego zapalenia płuc).<br>3. Obserwacja neurologiczna w 2. tygodniu choroby: ocena chodu, równowagi i mowy pod kątem ostrej ataksji móżdżkowej.<br>4. Nadzór nad domownikami i osobami z kontaktu, zwłaszcza kobietami ciężarnymi i niemowlętami."
  },
  lekQuestions: [
    {
      id: 1,
      q: "Który lek przeciwgorączkowy jest BEZWZGLĘDNIE PRZECIWWSKAZANY u dzieci z ospą wietrzną ze względu na ryzyko inwazyjnych zakażeń paciorkowcowych i martwiczego zapalenia powięzi?",
      opts: [
        "A. Paracetamol",
        "B. Ibuprofen",
        "C. Metamizol",
        "D. Petydyna",
        "E. Morfina"
      ],
      options: [
        "A. Paracetamol",
        "B. Ibuprofen",
        "C. Metamizol",
        "D. Petydyna",
        "E. Morfina"
      ],
      correctIdx: 1,
      correct: 1,
      exp: "Prawidłowa odpowiedź: B. Ibuprofen oraz inne niesteroidowe leki przeciwzapalne (NLPZ) są przeciwwskazane w ospie wietrznej z uwagi na udowodnione wielokrotnie wyższe ryzyko rozwoju ciężkich zakażeń bakteryjnych tkanek miękkich, w tym martwiczego zapalenia powięzi (necrotizing fasciitis). Jedynym bezpiecznym lekiem I rzutu jest paracetamol.",
      expl: "Prawidłowa odpowiedź: B. Ibuprofen oraz inne niesteroidowe leki przeciwzapalne (NLPZ) są przeciwwskazane w ospie wietrznej z uwagi na udowodnione wielokrotnie wyższe ryzyko rozwoju ciężkich zakażeń bakteryjnych tkanek miękkich, w tym martwiczego zapalenia powięzi (necrotizing fasciitis). Jedynym bezpiecznym lekiem I rzutu jest paracetamol."
    },
    {
      id: 2,
      q: "Jak długo pacjent z ospą wietrzną jest zakaźny dla otoczenia?",
      opts: [
        "A. Od momentu pojawienia się pierwszego pęcherzyka przez 24 godziny",
        "B. Od 1-2 dni przed pojawieniem się wysypki aż do przyschnięcia wszystkich wykwitów w strupki",
        "C. Przez cały okres wylęgania (od 1. do 21. dnia)",
        "D. Od odpadnięcia ostatniego strupka przez kolejne 30 dni",
        "E. Wyłącznie w fazie gorączkowej trwającej pierwsze 48 godzin"
      ],
      options: [
        "A. Od momentu pojawienia się pierwszego pęcherzyka przez 24 godziny",
        "B. Od 1-2 dni przed pojawieniem się wysypki aż do przyschnięcia wszystkich wykwitów w strupki",
        "C. Przez cały okres wylęgania (od 1. do 21. dnia)",
        "D. Od odpadnięcia ostatniego strupka przez kolejne 30 dni",
        "E. Wyłącznie w fazie gorączkowej trwającej pierwsze 48 godzin"
      ],
      correctIdx: 1,
      correct: 1,
      exp: "Prawidłowa odpowiedź: B. Zakaźność ospy wietrznej rozpoczyna się na 1-2 dni przed pojawieniem się osutki i kończy się z chwilą, gdy wszystkie pęcherzyki zaschną w strupki (zwykle po 6-8 dniach). Suche strupy nie są już źródłem zakażenia.",
      expl: "Prawidłowa odpowiedź: B. Zakaźność ospy wietrznej rozpoczyna się na 1-2 dni przed pojawieniem się osutki i kończy się z chwilą, gdy wszystkie pęcherzyki zaschną w strupki (zwykle po 6-8 dniach). Suche strupy nie są już źródłem zakażenia."
    },
    {
      id: 3,
      q: "Co oznacza pojęcie 'polimorfizmu rzekomego' w odniesieniu do wysypki w ospie wietrznej?",
      opts: [
        "A. Współistnienie na skórze zmian wywołanych przez różne wirusy",
        "B. Obecność na tym samym obszarze skóry wykwitów w różnych stadiach ewolucji (plamka, grudka, pęcherzyk, strup) z powodu rzutowego wysiewu zmian",
        "C. Zmienność barwy wysypki pod wpływem temperatury otoczenia",
        "D. Obecność wykwitów wyłącznie na podeszwach stóp i dłoniach",
        "E. Przekształcanie się pęcherzyków w trwałe teleangiektazje naczyniowe"
      ],
      options: [
        "A. Współistnienie na skórze zmian wywołanych przez różne wirusy",
        "B. Obecność na tym samym obszarze skóry wykwitów w różnych stadiach ewolucji (plamka, grudka, pęcherzyk, strup) z powodu rzutowego wysiewu zmian",
        "C. Zmienność barwy wysypki pod wpływem temperatury otoczenia",
        "D. Obecność wykwitów wyłącznie na podeszwach stóp i dłoniach",
        "E. Przekształcanie się pęcherzyków w trwałe teleangiektazje naczyniowe"
      ],
      correctIdx: 1,
      correct: 1,
      exp: "Prawidłowa odpowiedź: B. Polimorfizm rzekomy (obraz 'gwiaździstego nieba') polega na tym, że każdy wykwit przechodzi tę samą drogę rozwoju, ale ponieważ wysiew następuje falami, w danym momencie na skórze widoczne są jednocześnie świeże plamki, pęcherzyki, krosty i strupki.",
      expl: "Prawidłowa odpowiedź: B. Polimorfizm rzekomy (obraz 'gwiaździstego nieba') polega na tym, że każdy wykwit przechodzi tę samą drogę rozwoju, ale ponieważ wysiew następuje falami, w danym momencie na skórze widoczne są jednocześnie świeże plamki, pęcherzyki, krosty i strupki."
    },
    {
      id: 4,
      q: "Najczęstszym powikłaniem neurologicznym ospy wietrznej u dzieci, charakteryzującym się nagłą ataksją, chodem na szerokiej podstawie i bardzo dobrym rokowaniem, jest:",
      opts: [
        "A. Ostre zapalenie móżdżku (cerebellitis)",
        "B. Ropień płata czołowego mózgu",
        "C. Zespół Guillaina-Barrégo o piorunującym przebiegu",
        "D. Zakrzepica zatoki strzałkowej górnej",
        "E. Pląsawica Sydenhama"
      ],
      options: [
        "A. Ostre zapalenie móżdżku (cerebellitis)",
        "B. Ropień płata czołowego mózgu",
        "C. Zespół Guillaina-Barrégo o piorunującym przebiegu",
        "D. Zakrzepica zatoki strzałkowej górnej",
        "E. Pląsawica Sydenhama"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Prawidłowa odpowiedź: A. Ostre zapalenie móżdżku (ataksja móżdżkowa) rozwija się zwykle pod koniec 1. lub w 2. tygodniu ospy (częstość 1:4000). Objawia się zaburzeniami równowagi, chwiejnym chodem i mową skandowaną. Ustępuje całkowicie samoistnie w ciągu kilku tygodni.",
      expl: "Prawidłowa odpowiedź: A. Ostre zapalenie móżdżku (ataksja móżdżkowa) rozwija się zwykle pod koniec 1. lub w 2. tygodniu ospy (częstość 1:4000). Objawia się zaburzeniami równowagi, chwiejnym chodem i mową skandowaną. Ustępuje całkowicie samoistnie w ciągu kilku tygodni."
    },
    {
      id: 5,
      q: "U kobiety w 16. tygodniu ciąży bez wywiadu ospy wietrznej (seroujemna w kierunku anty-VZV IgG), która miała bliski kontakt z chorym dzieckiem, postępowaniem poekspozycyjnym z wyboru jest:",
      opts: [
        "A. Podanie żywej szczepionki przeciwko ospie wietrznej w ciągu 72 godzin",
        "B. Podanie swoistej immunoglobuliny przeciwko VZV (VZIG) w ciągu 96 godzin od ekspozycji",
        "C. Podanie deksametazonu domięśniowo",
        "D. Wdrożenie amoksycyliny z kwasem klawulanowym",
        "E. Wyłącznie obserwacja, ponieważ wirus VZV nie stanowi żadnego zagrożenia w ciąży"
      ],
      options: [
        "A. Podanie żywej szczepionki przeciwko ospie wietrznej w ciągu 72 godzin",
        "B. Podanie swoistej immunoglobuliny przeciwko VZV (VZIG) w ciągu 96 godzin od ekspozycji",
        "C. Podanie deksametazonu domięśniowo",
        "D. Wdrożenie amoksycyliny z kwasem klawulanowym",
        "E. Wyłącznie obserwacja, ponieważ wirus VZV nie stanowi żadnego zagrożenia w ciąży"
      ],
      correctIdx: 1,
      correct: 1,
      exp: "Prawidłowa odpowiedź: B. Ciężarne seroujemne po kontakcie z VZV powinny jak najszybciej (do 96 h, maks. do 10 dni) otrzymać swoistą immunoglobulinę VZIG. Żywa szczepionka jest w ciąży bezwzględnie przeciwwskazana.",
      expl: "Prawidłowa odpowiedź: B. Ciężarne seroujemne po kontakcie z VZV powinny jak najszybciej (do 96 h, maks. do 10 dni) otrzymać swoistą immunoglobulinę VZIG. Żywa szczepionka jest w ciąży bezwzględnie przeciwwskazana."
    },
    {
      id: 6,
      q: "Dlaczego współcześnie odradza się smarowanie wykwitów w ospie wietrznej papkami pudrowymi i płynnymi pudrami z cynkiem?",
      opts: [
        "A. Ponieważ zawierają ołów powodujący ołowicę",
        "B. Tworzą na skórze nieprzepuszczalną skorupę, pod którą dochodzi do namnażania bakterii beztlenowych i ciężkich zakażeń ropnych naskórka",
        "C. Blokują wydzielanie potu prowadząc do udaru cieplnego u każdego dziecka",
        "D. Barwią skórę na zielono uniemożliwiając ocenę żółtaczki",
        "E. Wchodzą w interakcję chemiczną z acyklowirem neutralizując jego działanie"
      ],
      options: [
        "A. Ponieważ zawierają ołów powodujący ołowicę",
        "B. Tworzą na skórze nieprzepuszczalną skorupę, pod którą dochodzi do namnażania bakterii beztlenowych i ciężkich zakażeń ropnych naskórka",
        "C. Blokują wydzielanie potu prowadząc do udaru cieplnego u każdego dziecka",
        "D. Barwią skórę na zielono uniemożliwiając ocenę żółtaczki",
        "E. Wchodzą w interakcję chemiczną z acyklowirem neutralizując jego działanie"
      ],
      correctIdx: 1,
      correct: 1,
      exp: "Prawidłowa odpowiedź: B. Papki pudrowe zasychają w szczelną powłokę, stwarzając warunki okluzyjne idealne do rozwoju bakterii (zwłaszcza beztlenowych), co zwiększa ryzyko wtórnego zakażenia bakteryjnego i powstawania szpecących blizn.",
      expl: "Prawidłowa odpowiedź: B. Papki pudrowe zasychają w szczelną powłokę, stwarzając warunki okluzyjne idealne do rozwoju bakterii (zwłaszcza beztlenowych), co zwiększa ryzyko wtórnego zakażenia bakteryjnego i powstawania szpecących blizn."
    },
    {
      id: 7,
      q: "U którego z poniższych pacjentów chorych na ospę wietrzną NIE ma bezwzględnego wskazania do wdrożenia acyklowiru?",
      opts: [
        "A. Dotychczas całkowicie zdrowy 4-letni chłopiec z łagodnym przebiegiem choroby",
        "B. 16-letni nastolatek z gorączką 39°C i obfitą wysypką",
        "C. 5-letnie dziecko z ciężkim atopowym zapaleniem skóry (AZS)",
        "D. 7-letnie dziecko leczone przewlekle ogólnoustrojowymi glikokortykosteroidami",
        "E. Dorosły 35-letni mężczyzna z dusznością i podejrzeniem ospowego zapalenia płuc"
      ],
      options: [
        "A. Dotychczas całkowicie zdrowy 4-letni chłopiec z łagodnym przebiegiem choroby",
        "B. 16-letni nastolatek z gorączką 39°C i obfitą wysypką",
        "C. 5-letnie dziecko z ciężkim atopowym zapaleniem skóry (AZS)",
        "D. 7-letnie dziecko leczone przewlekle ogólnoustrojowymi glikokortykosteroidami",
        "E. Dorosły 35-letni mężczyzna z dusznością i podejrzeniem ospowego zapalenia płuc"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Prawidłowa odpowiedź: A. U zdrowych dzieci w wieku od 1 do 12 lat o łagodnym przebiegu ospy wietrznej rutynowe stosowanie acyklowiru nie jest zalecane (leczenie jest objawowe). Acyklowir jest wskazany u osób >12 r.ż., dorosłych, pacjentów z AZS, immunosupresją oraz w powikłaniach.",
      expl: "Prawidłowa odpowiedź: A. U zdrowych dzieci w wieku od 1 do 12 lat o łagodnym przebiegu ospy wietrznej rutynowe stosowanie acyklowiru nie jest zalecane (leczenie jest objawowe). Acyklowir jest wskazany u osób >12 r.ż., dorosłych, pacjentów z AZS, immunosupresją oraz w powikłaniach."
    },
    {
      id: 8,
      q: "W jakich strukturach układu nerwowego wirus ospy wietrznej i półpaśca (VZV) przechodzi w stan dożywotniej latencji?",
      opts: [
        "A. W neuronach rogów przednich rdzenia kręgowego",
        "B. W zwojach czuciowych korzeni grzbietowych (DRG) i zwojach czuciowych nerwów czaszkowych",
        "C. W komórkach mikrogleju kory wzrokowej",
        "D. W komórkach Purkinjego kory móżdżku",
        "E. W zwojach współczulnych pnia współczulnego"
      ],
      options: [
        "A. W neuronach rogów przednich rdzenia kręgowego",
        "B. W zwojach czuciowych korzeni grzbietowych (DRG) i zwojach czuciowych nerwów czaszkowych",
        "C. W komórkach mikrogleju kory wzrokowej",
        "D. W komórkach Purkinjego kory móżdżku",
        "E. W zwojach współczulnych pnia współczulnego"
      ],
      correctIdx: 1,
      correct: 1,
      exp: "Prawidłowa odpowiedź: B. VZV przemieszcza się wstecznie aksonami czuciowymi do zwojów korzeni grzbietowych (dorsal root ganglia) oraz czuciowych zwojów nerwów czaszkowych (np. zwoju trójdzielnego Gassera), gdzie przechodzi w stan uśpienia (latencji). Jego reaktywacja wywołuje półpasiec.",
      expl: "Prawidłowa odpowiedź: B. VZV przemieszcza się wstecznie aksonami czuciowymi do zwojów korzeni grzbietowych (dorsal root ganglia) oraz czuciowych zwojów nerwów czaszkowych (np. zwoju trójdzielnego Gassera), gdzie przechodzi w stan uśpienia (latencji). Jego reaktywacja wywołuje półpasiec."
    },
    {
      id: 9,
      q: "Najczęstszym ciężkim narządowym powikłaniem ospy wietrznej u osób dorosłych i kobiet w ciąży jest:",
      opts: [
        "A. Ostre kłębuszkowe zapalenie nerek",
        "B. Wirusowe (ospowe) zapalenie płuc",
        "C. Zatorowość tętnicy płucnej",
        "D. Martwica cewek nerkowych",
        "E. Zespół rozpadu nowotworu"
      ],
      options: [
        "A. Ostre kłębuszkowe zapalenie nerek",
        "B. Wirusowe (ospowe) zapalenie płuc",
        "C. Zatorowość tętnicy płucnej",
        "D. Martwica cewek nerkowych",
        "E. Zespół rozpadu nowotworu"
      ],
      correctIdx: 1,
      correct: 1,
      exp: "Prawidłowa odpowiedź: B. Ospowe zapalenie płuc występuje u nawet 10-20% chorych dorosłych (zwłaszcza u palaczy tytoniu i ciężarnych). Objawia się kaszlem, dusznością i hipoksemią w 3.-5. dobie wysypki; charakteryzuje się wysoką śmiertelnością i wymaga pilnego dożylnego podania acyklowiru.",
      expl: "Prawidłowa odpowiedź: B. Ospowe zapalenie płuc występuje u nawet 10-20% chorych dorosłych (zwłaszcza u palaczy tytoniu i ciężarnych). Objawia się kaszlem, dusznością i hipoksemią w 3.-5. dobie wysypki; charakteryzuje się wysoką śmiertelnością i wymaga pilnego dożylnego podania acyklowiru."
    },
    {
      id: 10,
      q: "Która z wymienionych cech różnicuje wysypkę w ospie wietrznej od wysypki w przebiegu ospy prawdziwej (czarnej ospy)?",
      opts: [
        "A. W ospie wietrznej pęcherzyki są jednokomorowe i wiotkie, a w ospie prawdziwej były wielokomorowe i twarde z pępkowatym zagłębieniem",
        "B. Ospa wietrzna ma układ ośrodkowy (tułów > twarz i kończyny), a ospa prawdziwa odśrodkowy (twarz i kończyny > tułów)",
        "C. W ospie wietrznej występuje polimorfizm rzekomy, a w ospie prawdziwej wykwity były monomorficzne",
        "D. W ospie wietrznej wykwity typowo zajmują owłosioną skórę głowy",
        "E. Wszystkie powyższe odpowiedzi są prawdziwe"
      ],
      options: [
        "A. W ospie wietrznej pęcherzyki są jednokomorowe i wiotkie, a w ospie prawdziwej były wielokomorowe i twarde z pępkowatym zagłębieniem",
        "B. Ospa wietrzna ma układ ośrodkowy (tułów > twarz i kończyny), a ospa prawdziwa odśrodkowy (twarz i kończyny > tułów)",
        "C. W ospie wietrznej występuje polimorfizm rzekomy, a w ospie prawdziwej wykwity były monomorficzne",
        "D. W ospie wietrznej wykwity typowo zajmują owłosioną skórę głowy",
        "E. Wszystkie powyższe odpowiedzi są prawdziwe"
      ],
      correctIdx: 4,
      correct: 4,
      exp: "Prawidłowa odpowiedź: E. Wszystkie wymienione cechy stanowią klasyczne kryteria różnicowania ospy wietrznej od ospy prawdziwej (eradykowanej w 1980 r.): charakter pęcherzyków, rozmieszczenie (ośrodkowe vs odśrodkowe), ewolucja (polimorfizm vs monomorfizm) oraz zajęcie owłosionej skóry głowy.",
      expl: "Prawidłowa odpowiedź: E. Wszystkie wymienione cechy stanowią klasyczne kryteria różnicowania ospy wietrznej od ospy prawdziwej (eradykowanej w 1980 r.): charakter pęcherzyków, rozmieszczenie (ośrodkowe vs odśrodkowe), ewolucja (polimorfizm vs monomorfizm) oraz zajęcie owłosionej skóry głowy."
    },
    {
      id: 11,
      q: "U nieszczepionego dotychczas zdrowego 3-letniego dziecka, które miało kontakt z ospą wietrzną 48 godzin temu, najskuteczniejszą metodą profilaktyki poekspozycyjnej jest:",
      opts: [
        "A. Podanie pojedynczej dawki szczepionki przeciwko ospie wietrznej w ciągu 72 godzin od ekspozycji",
        "B. Wdrożenie amoksycyliny doustnie na 14 dni",
        "C. Doustna witamina C w dawce 5 g na dobę",
        "D. Płukanie jamy ustnej chlorheksydyną",
        "E. Profilaktyka poekspozycyjna u dzieci jest zabroniona"
      ],
      options: [
        "A. Podanie pojedynczej dawki szczepionki przeciwko ospie wietrznej w ciągu 72 godzin od ekspozycji",
        "B. Wdrożenie amoksycyliny doustnie na 14 dni",
        "C. Doustna witamina C w dawce 5 g na dobę",
        "D. Płukanie jamy ustnej chlorheksydyną",
        "E. Profilaktyka poekspozycyjna u dzieci jest zabroniona"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Prawidłowa odpowiedź: A. Podanie żywej atenuowanej szczepionki przeciwko ospie wietrznej w ciągu 72 godzin (wg niektórych danych do 5 dni) od ekspozycji zapobiega zachorowaniu lub znacząco łagodzi jego przebieg u osób bez przeciwwskazań.",
      expl: "Prawidłowa odpowiedź: A. Podanie żywej atenuowanej szczepionki przeciwko ospie wietrznej w ciągu 72 godzin (wg niektórych danych do 5 dni) od ekspozycji zapobiega zachorowaniu lub znacząco łagodzi jego przebieg u osób bez przeciwwskazań."
    }
  ],
  flashcards: [
    {
      front: "Co charakteryzuje wysypkę w ospie wietrznej (obraz 'gwiaździstego nieba')?",
      back: "• Polimorfizm rzekomy: jednoczesna obecność plamek, grudek, pęcherzyków ('krople rosy'), krostek i strupków.<br>• Rzutowy, falowy wysiew nowych zmian co 24-48 h.<br>• Zajęcie owłosionej skóry głowy i błon śluzowych.<br>• Rozmieszczenie ośrodkowe (najwięcej na tułowiu)."
    },
    {
      front: "Dlaczego Ibuprofen jest KATEGORYCZNIE zakazany w ospie wietrznej?",
      back: "• Zwiększa ryzyko ciężkich, inwazyjnych zakażeń tkanek miękkich wywołanych przez paciorkowce/gronkowce.<br>• Może prowadzić do martwiczego zapalenia powięzi (necrotizing fasciitis).<br>• Jedynym lekiem przeciwgorączkowym z wyboru jest Paracetamol."
    },
    {
      front: "Jaki jest okres zakaźności chorego na ospę wietrzną?",
      back: "• Od 1-2 dni PRZED wystąpieniem pierwszych wykwitów.<br>• Do momentu zaschnięcia WSZYSTKICH pęcherzyków w suche strupki (ok. 6-8 dni).<br>• Same suche strupy NIE są już zakaźne."
    },
    {
      front: "Dlaczego odradza się stosowanie papek pudrowych i płynnych pudrów w ospie?",
      back: "• Tworzą szczelną skorupę okluzyjną na skórze.<br>• Sprzyjają rozwojowi bakterii beztlenowych pod strupem.<br>• Prowadzą do głębokich nadkażeń ropnych i trwałych blizn ospowych."
    },
    {
      front: "U kogo wskazane jest podanie Acyklowiru w ospie wietrznej?",
      back: "• Nie u zdrowych dzieci <12 r.ż. o łagodnym przebiegu!<br>• Wskazany u: młodzieży >12 r.ż., dorosłych, kobiet w ciąży, osób z niedoborami odporności, chorych z ciężkim AZS, przewlekle leczonych sterydami oraz przy powikłaniach."
    },
    {
      front: "Jak wygląda profilaktyka poekspozycyjna ospy wietrznej?",
      back: "• Osoby zdrowe podatne: szczepionka przeciw VZV podana do 72 h od kontaktu.<br>• Osoby z grup wysokiego ryzyka (ciężarne seroujemne, noworodki, ciężka immunosupresja): swoista immunoglobulina VZIG do 96 h (maks. do 10 dni)."
    }
  ]
};

async function main() {
  await saveCase(case112);
}
main();

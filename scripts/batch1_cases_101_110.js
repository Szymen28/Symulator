const fs = require('fs');
const { encryptStringAes } = require('./encrypt_case.js');

const PASSWORD = '@LEKSzymon28111999';

// Import existing 101 and 102 from data_cases_101_112.js
const baseCases = require('./data_cases_101_112.js');

const newCases103_110 = [
  // 103: Wyrostek u małego dziecka
  {
    id: 103,
    filename: "103_wyrostek_dziecko.json",
    dept: "Pediatria",
    shortTitle: "3-letnie dziecko – Ból brzucha, drażliwość, gorączka i wymioty (Zapalenie wyrostka u małego dziecka)",
    diagnosisTitle: "Ostre zapalenie wyrostka robaczkowego (Appendicitis acuta) u małego dziecka z wczesnym zapaleniem otrzewnej",
    vitals: [
      { label: "HR", val: "142/min", sub: "Tachykardia gorączkowa", status: "bad" },
      { label: "BP", val: "92/58 mmHg", sub: "Prawidłowe", status: "ok" },
      { label: "SpO2", val: "98%", sub: "Prawidłowa", status: "ok" },
      { label: "RR", val: "34/min", sub: "Przyspieszony, spłycony", status: "bad" },
      { label: "Temp", val: "38.9°C", sub: "Wysoka gorączka", status: "bad" },
      { label: "GCS", val: "14", sub: "Drażliwe, płaczliwe", status: "bad" }
    ],
    vitalsObj: { hr: 142, bp: "92/58", spo2: 98, rr: 34, temp: 38.9, gcs: 14 },
    story: "Matka przywozi na SOR 3-letnią dziewczynkę z powodu silnego bólu brzucha trwającego od 24 godzin, gorączki 38.9°C i trzykrotnych wymiotów treścią pokarmową. Dziecko leży na prawym boku z podkurczonymi nóżkami, broni się przed dotknięciem brzucha, odmawia chodzenia (utyka na prawą nogę lub płacze przy próbie postawienia na nogi). W badaniu przedmiotowym stwierdza się obronę mięśniową i dodatni objaw Blumberga w prawym dole biodrowym.",
    labs: [
      ["Leukocyty (WBC)", "17.4 G/l", "norma: 5.0 - 12.0 G/l (Znaczna leukocytoza)"],
      ["Neutrofile", "84%", "norma: 35 - 55% (Przesunięcie w lewo)"],
      ["CRP", "78 mg/l", "norma: <5 mg/l (Wysokie stężenie zapalne)"],
      ["Prokalcytonina (PCT)", "0.85 ng/ml", "norma: <0.5 ng/ml (Podwyższona)"],
      ["Badanie ogólne moczu", "Pojedyncze leukocyty (2-4 wpw)", "norma: 0-5 wpw (Wyklucza ZUM)"],
      ["USG jamy brzusznej", "Nieściśliwy wyrostek o śr. 8.5 mm z płynem w miednicy", "Cechy ostrego zapalenia z perforacją"]
    ],
    steps: [
      {
        title: "Krok 1: Odrębności kliniczne zapalenia wyrostka u małych dzieci (<4 r.ż.)",
        desc: "Zapalenie wyrostka u dzieci poniżej 4. roku życia ma nietypowy, podstępny przebieg ze względu na niezdolność do lokalizacji bólu i krótką sieć większą. Co jest najczęstszym powikłaniem wynikającym z opóźnienia rozpoznania?",
        scenario: "Zapalenie wyrostka u dzieci poniżej 4. roku życia ma nietypowy, podstępny przebieg ze względu na niezdolność do lokalizacji bólu i krótką sieć większą. Co jest najczęstszym powikłaniem wynikającym z opóźnienia rozpoznania?",
        options: [
          {
            text: "Wczesna perforacja (u 50–80% dzieci <3 r.ż.) i rozlane zapalenie otrzewnej z powodu słabo rozwiniętej sieci większej, która nie odgranicza zapalenia.",
            correct: true,
            feedback: "Znakomicie! U małych dzieci cienka ściana wyrostka i krótka, słabo rozwinięta sieć większa sprawiają, że do perforacji dochodzi w ciągu 24–48 godzin, prowadząc bezpośrednio do rozlanego zapalenia otrzewnej."
          },
          {
            text: "Samoistne wchłonięcie się wyrostka bez leczenia operacyjnego u 90% pacjentów.",
            correct: false,
            feedback: "Błąd kardynalny. Zapalenie wyrostka u małego dziecka nie cofa się samoistnie i bez operacji prowadzi do sepsy."
          },
          {
            text: "Przejście w bezobjawowe przewlekłe zapalenie jelita grubego.",
            correct: false,
            feedback: "Nieprawidłowe. Wyrostek robaczkowy u dziecka ma charakter ostry i gwałtowny."
          },
          {
            text: "Zawsze wytworzenie dobrze odgraniczonego ropnia okołowyrostkowego bez gorączki.",
            correct: false,
            feedback: "Wytworzenie nacieku/ropnia wymaga sprawnej sieci większej, której małe dziecko jeszcze nie posiada."
          }
        ]
      },
      {
        title: "Krok 2: Badanie przedmiotowe małego dziecka z 'ostrym brzuchem'",
        desc: "Dziecko gwałtownie płacze i napina mięśnie brzucha przy każdej próbie badania ręką lekarza. Jaki manewr kliniczny pozwala odróżnić rzeczywistą obronę mięśniową (defensa muscularis) od lęku?",
        scenario: "Dziecko gwałtownie płacze i napina mięśnie brzucha przy każdej próbie badania ręką lekarza. Jaki manewr kliniczny pozwala odróżnić rzeczywistą obronę mięśniową (defensa muscularis) od lęku?",
        options: [
          {
            text: "Badanie brzucha dłonią rodzica pod kontrolą ręki lekarza, badanie podczas snu/wydechu lub ocena bolesności przy delikatnym opukiwaniu (objaw wstrząsania / próba kaszlowa / skakanie na prawej nodze).",
            correct: true,
            feedback: "Prawidłowo! Zastosowanie ręki rodzica, badanie we śnie lub próba skakania/wstrząsania pozwala odróżnić obronę mimowolną (odczyn otrzewnowy) od obrony dowolnej wynikającej ze strachu przed badaniem."
          },
          {
            text: "Podanie dożylne leków zwiotczających mięśnie poprzecznie prążkowane na sali ogólnej.",
            correct: false,
            feedback: "Leki zwiotczające powodują zatrzymanie oddechu i wymagają natychmiastowej intubacji; nie służą do badania brzucha!"
          },
          {
            text: "Wymuszenie leżenia na wznak z unieruchomieniem kończyn pasami.",
            correct: false,
            feedback: "Niedopuszczalne i traumatyzujące; nasila płacz i dowolne napięcie powłok."
          },
          {
            text: "Zalecenie natychmiastowego wykonania lewatywy z soli fizjologicznej.",
            correct: false,
            feedback: "Lewatywa przy podejrzeniu zapalenia wyrostka grozi natychmiastową jatrogenną perforacją!"
          }
        ]
      },
      {
        title: "Krok 3: Badanie obrazowe I rzutu w pediatrii",
        desc: "Jakie badanie obrazowe jest badaniem I wyboru w diagnostyce ostrego zapalenia wyrostka u dzieci wg wytycznych PTChD i ESPR?",
        scenario: "Jakie badanie obrazowe jest badaniem I wyboru w diagnostyce ostrego zapalenia wyrostka u dzieci wg wytycznych PTChD i ESPR?",
        options: [
          {
            text: "Ultrasonografia (USG) jamy brzusznej z użyciem głowicy liniowej techniką stopniowanego ucisku (graded compression).",
            correct: true,
            feedback: "Wybitnie! USG jest badaniem I rzutu ze względu na brak promieniowania jonizującego. Cechy zapalenia: nieściśliwa cewka >6 mm, pogrubienie ściany, kamień kałowy (appendicolith), wzmożony przepływ w Dopplerze i płyn wokół wyrostka."
          },
          {
            text: "Rutynowa wielofazowa tomografia komputerowa (TK) jamy brzusznej i miednicy z kontrastem.",
            correct: false,
            feedback: "TK u dzieci rezerwuje się wyłącznie na przypadki wątpliwe lub powikłane po niediagnostycznym USG (ochrona przed promieniowaniem)."
          },
          {
            text: "Zdjęcie przeglądowe RTG jamy brzusznej na leżąco bez przygotowania.",
            correct: false,
            feedback: "RTG ma niską czułość w wyrostku; może jedynie wykazać wolny gaz pod przeponą przy perforacji lub kamień kałowy."
          },
          {
            text: "Scyntygrafia znakowanymi leukocytami.",
            correct: false,
            feedback: "Badanie zbyt czasochłonne i niedostępne w trybie ostrego dyżuru chirurgicznego."
          }
        ]
      },
      {
        title: "Krok 4: Przygotowanie przedoperacyjne – stabilizacja",
        desc: "USG potwierdza zapalenie wyrostka o średnicy 8.5 mm z wolnym płynem w jamie otrzewnej. Jakie czynności podejmujesz przed przekazaniem dziecka na blok operacyjny?",
        scenario: "USG potwierdza zapalenie wyrostka o średnicy 8.5 mm z wolnym płynem w jamie otrzewnej. Jakie czynności podejmujesz przed przekazaniem dziecka na blok operacyjny?",
        options: [
          {
            text: "Ścisła dieta zero, wkłucie obwodowe, płynoterapia krystaloidowa i.v. (wyrównanie odwodnienia), dożylna analgezja (paracetamol/opioid) oraz antybiotykoterapia o szerokim spektrum (np. ceftriakson + metronidazol).",
            correct: true,
            feedback: "Doskonale! Przygotowanie do operacji: nawodnienie, uśmierzenie bólu (leki przeciwbólowe NIE zamazują obrazu otrzewnowego!), antybiotykoterapia pokrywająca florę jelitową (pałeczki Gram-ujemne i beztlenowce)."
          },
          {
            text: "Podanie dziecku doustnego syropu z paracetamolem i soku jabłkowego do picia.",
            correct: false,
            feedback: "Zakaz podawania czegokolwiek doustnie (ryzyko aspiracji treści żołądkowej podczas intubacji do znieczulenia ogólnego!)."
          },
          {
            text: "Czekanie z antybiotykiem do pobrania posiewu z krwi po 24 godzinach.",
            correct: false,
            feedback: "Błąd. Antybiotyk profilaktyczny/terapeutyczny należy podać przed nacięciem skóry (optymalnie w ciągu 60 minut przed zabiegiem)."
          },
          {
            text: "Podanie dożylne hydrokortyzonu w dawce 500 mg.",
            correct: false,
            feedback: "Sterydy są przeciwwskazane w ostrym bakteryjnym zapaleniu otrzewnej."
          }
        ]
      },
      {
        title: "Krok 5: Wybór metody operacyjnej",
        desc: "Konsultujący chirurg dziecięcy planuje operację. Jaka technika jest współcześnie złotym standardem u dzieci?",
        scenario: "Konsultujący chirurg dziecięcy planuje operację. Jaka technika jest współcześnie złotym standardem u dzieci?",
        options: [
          {
            text: "Appendektomia laparoskopowa (laparoscopic appendectomy) – mniejszy ból pooperacyjny, mniejsze ryzyko zakażenia rany, krótsza hospitalizacja i doskonała wizualizacja całej jamy otrzewnej.",
            correct: true,
            feedback: "Znakomicie! Laparoskopia jest metodą z wyboru u dzieci, umożliwiając również dokładne przepłukanie jamy otrzewnej przy perforacji."
          },
          {
            text: "Laparotomia pośrodkowa od wyrostka mieczykowatego do spojenia łonowego u każdego dziecka.",
            correct: false,
            feedback: "Zbyt inwazyjny dostęp, zarezerwowany dla skrajnych przypadków wstrząsu septycznego z mnogimi ropniami."
          },
          {
            text: "Wyłącznie leczenie zachowawcze antybiotykami bez operacji u 3-latka z płynem w otrzewnej.",
            correct: false,
            feedback: "Przy cechach perforacji i płynie w otrzewnej leczenie operacyjne jest bezwzględnie konieczne."
          },
          {
            text: "Drenaż wyrostka przez nakłucie przezpochwowe.",
            correct: false,
            feedback: "Anatomicznie absurdalne u małego dziecka."
          }
        ]
      },
      {
        title: "Krok 6: Postępowanie pooperacyjne – powikłany wyrostek",
        desc: "Podczas operacji stwierdzono zgorzelinowy wyrostek z mikroperforacją i mętnym wysiękiem w miednicy mniejszej. Jak długo kontynuujesz antybiotykoterapię po zabiegu?",
        scenario: "Podczas operacji stwierdzono zgorzelinowy wyrostek z mikroperforacją i mętnym wysiękiem w miednicy mniejszej. Jak długo kontynuujesz antybiotykoterapię po zabiegu?",
        options: [
          {
            text: "Antybiotykoterapię dożylną kontynuuje się przez 3–5 dni (do ustąpienia gorączki, normalizacji leukocytozy i powrotu perystaltyki jelit).",
            correct: true,
            feedback: "Prawidłowo! W powikłanym zapaleniu wyrostka (perforacja, zgorzel) standardem jest celowana antybiotykoterapia przez 3–5 dni pod kontrolą parametrów zapalnych i stanu klinicznego."
          },
          {
            text: "Odstawia się antybiotyki natychmiast po wycięciu wyrostka na sali operacyjnej.",
            correct: false,
            feedback: "W powikłanym zapaleniu z obecnością ropy/wysięku jednorazowa dawka profilaktyczna nie wystarcza – grozi ropniem wewnątrzbrzusznym!"
          },
          {
            text: "Antybiotykoterapię należy bezwzględnie prowadzić przez 6 miesięcy.",
            correct: false,
            feedback: "Zbyt długi czas – ryzyko lekooporności i biegunki zakaźnej C. difficile."
          },
          {
            text: "Podaje się wyłącznie nystatynę doustnie.",
            correct: false,
            feedback: "Nystatyna to lek przeciwgrzybiczy, nieskuteczny w zapaleniu otrzewnej."
          }
        ]
      },
      {
        title: "Krok 7: Najczęstsze powikłanie wczesne po appendektomii powikłanej",
        desc: "W 6. dobie po operacji u dziecka ponownie pojawia się gorączka 38.5°C, ból podbrzusza i bolesne parcie na stolec. Co podejrzewasz w pierwszej kolejności?",
        scenario: "W 6. dobie po operacji u dziecka ponownie pojawia się gorączka 38.5°C, ból podbrzusza i bolesne parcie na stolec. Co podejrzewasz w pierwszej kolejności?",
        options: [
          {
            text: "Ropień wewnątrzbrzuszny (najczęściej w zatoce Douglasa / zagłębieniu odbytniczo-pęcherzowym) – wskazane pilne USG/TK jamy brzusznej.",
            correct: true,
            feedback: "Wybitnie! Ropień w zatoce Douglasa jest klasycznym powikłaniem po perforacji wyrostka; uciskając na odbytnicę wywołuje gorączkę septyczną, bolesne parcie na stolec (tenesmus) i biegunkę z luźnymi stolcami."
          },
          {
            text: "Prawidłowy odczyn zapalny niewymagający żadnej diagnostyki.",
            correct: false,
            feedback: "Nawrót gorączki po okresie bezgorączkowym zawsze wymaga diagnostyki powikłań ropnych!"
          },
          {
            text: "Wirusowe zapalenie wątroby typu A.",
            correct: false,
            feedback: "Objawy są miejscowe w miednicy mniejszej."
          },
          {
            text: "Ostrą niewydolność kory nadnerczy.",
            correct: false,
            feedback: "Obraz kliniczny wskazuje na powikłanie chirurgiczne w loży po wyrostku/miednicy."
          }
        ]
      },
      {
        title: "Krok 8: Podsumowanie dyżurowe i punkty kluczowe LEK",
        desc: "Dziecko zostało wyleczone i wypisane do domu w stanie dobrym. Jakie kluczowe wnioski zapamiętasz do egzaminu LEK?",
        scenario: "Dziecko zostało wyleczone i wypisane do domu w stanie dobrym. Jakie kluczowe wnioski zapamiętasz do egzaminu LEK?",
        options: [
          {
            text: "U małych dzieci objawy wyrostka są nieswoiste (drażliwość, wymioty, utykanie na prawą nogę); odsetek perforacji jest bardzo wysoki (>50%), USG jest badaniem I wyboru, a leczeniem z wyboru laparoskopia.",
            correct: true,
            feedback: "Doskonałe podsumowanie! Wszystkie te elementy stanowią filary pytań testowych CEM z chirurgii dziecięcej i pediatrii."
          },
          {
            text: "Każdy ból brzucha u dziecka poniżej 4. roku życia jest spowodowany kolką niemowlęcą.",
            correct: false,
            feedback: "Błąd lekceważenia ostrego brzucha."
          },
          {
            text: "Zapalenie wyrostka u dzieci rozpoznaje się wyłącznie na podstawie poziomu amylazy w moczu.",
            correct: false,
            feedback: "Amylaza służy do diagnostyki zapalenia trzustki."
          },
          {
            text: "Badanie palpacyjne brzucha u dziecka powinno być wykonywane z użyciem głębokiego i gwałtownego ucisku.",
            correct: false,
            feedback: "Badanie musi być delikatne, rozpoczynając od okolic najmniej bolesnych."
          }
        ]
      }
    ],
    pathoNodes: [
      {
        badge: "Zatkanie światła",
        title: "Zamknięcie światła wyrostka i wzrost ciśnienia wewnątrzświetlnego",
        short: "Przerost tkanki limfatycznej lub kamień kałowy (appendicolith) zamyka odpływ śluzu.",
        detail: "Wyrostek robaczkowy u dzieci zawiera obfitą tkankę limfatyczną w błonie podśluzowej. W odpowiedzi na infekcję wirusową dochodzi do hiperplazji grudek chłonnych lub uwięźnięcia kamienia kałowego (koprolitu). Śluz stale produkowany przez nabłonek gromadzi się w zamkniętym świetle narządu, powodując gwałtowny wzrost ciśnienia wewnątrzświetlnego (>60 cm H2O), który przewyższa ciśnienie żylne i prowadzi do zastoju żylnego.",
        target: "Tkanka limfatyczna podśluzówkowa i światło wyrostka robaczkowego",
        desc: "Zastój śluzu i wzrost ciśnienia prowadzi do niedokrwienia ściany wyrostka."
      },
      {
        badge: "Inwazja bakteryjna",
        title: "Niedokrwienie ściany, zgorzel i perforacja",
        short: "Przekroczenie ciśnienia perfuzji tętniczej wywołuje martwicę transmuralną i perforację.",
        detail: "Wzrost ciśnienia powoduje uciśnięcie gałązek tętnicy wyrostkowej (arteria appendicularis – naczynie końcowe bez krążenia obocznego). Niedotlenienie i martwica śluzówki umożliwiają inwazję bakterii jelitowych (E. coli, Bacteroides fragilis, Pseudomonas) w głąb ściany. U małych dzieci cienka warstwa mięśniowa ulega szybkiej martwicy zgorzelinowej, doprowadzając do perforacji w ciągu 24-36 godzin.",
        target: "Tętnica wyrostkowa i ściana wyrostka robaczkowego",
        desc: "Niedokrwienie naczyniowe i kolonizacja beztlenowa prowadzą do martwicy pełnościennej."
      },
      {
        badge: "Zapalenie otrzewnej",
        title: "Brak bariery sieci większej i rozlane zapalenie otrzewnej",
        short: "Krótka sieć większa u dzieci <4 r.ż. nie odgranicza przedziurawienia.",
        detail: "U dorosłych sieć większa przemieszcza się w kierunku ogniska zapalnego i 'okleja' wyrostek, tworząc naciek lub ropień okołowyrostkowy. U niemowląt i dzieci poniżej 4. roku życia sieć większa jest anatomicznie krótka, cienka i nie sięga do prawego dołu biodrowego. Perforacja skutkuje natychmiastowym wylaniem treści kałowej do wolnej jamy otrzewnej, rozlanym peritonitis i wstrząsem septycznym.",
        target: "Sieć większa (omentum majus) i jama otrzewnej",
        desc: "Anatomiczna niedojrzałość sieci uniemożliwia lokalne odgraniczenie zapalenia."
      }
    ],
    dutySummary: {
      overview: "Ostre zapalenie wyrostka robaczkowego u małych dzieci (<4 r.ż.) to stan nagły o atypowym przebiegu, cechujący się bardzo wysokim odsetkiem perforacji (50–80%) i rozlanego zapalenia otrzewnej ze względu na anatomicznie krótką sieć większą.",
      diagnostics: "1. Objawy: drażliwość, odmowa chodzenia (utykanie na prawą nogę), gorączka, wymioty, bolesność brzucha.<br>2. USG jamy brzusznej (metoda z wyboru): nieściśliwa cewka >6 mm, płyn w miednicy, appendicolith.<br>3. Badania laboratoryjne: leukocytoza z neutrofilią, wysokie CRP.<br>4. Różnicowanie: zapalenie węzłów krezkowych, wgłobienie jelita, ZUM, zapalenie płuc z odczynem brzusznym.",
      drugsAndDoses: "• Ścisła dieta zero (przygotowanie do znieczulenia ogólnego).<br>• Nawadnianie i.v.: płyn wieloelektrolitowy (PWE) lub 0.9% NaCl z 5% glukozą wg zapotrzebowania Holiday-Segara.<br>• Antybiotykoterapia i.v. o szerokim spektrum: np. Ceftriakson 50–75 mg/kg/d + Metronidazol 30 mg/kg/d w 3 dawkach.<br>• Przeciwbólowo: Paracetamol i.v. 15 mg/kg co 6h, w silnym bólu Nalbufina lub Morfina 0.05–0.1 mg/kg i.v.",
      procedures: "• Pilna appendektomia laparoskopowa (złoty standard) z płukaniem jamy otrzewnej.<br>• Unikanie lewatyw i środków przeczyszczających (ryzyko perforacji!).",
      monitoring: "• Kontrola tętna, ciśnienia, temperatury i diurezy co 2–4 h.<br>• Obserwacja w kierunku ropnia wewnątrzbrzusznego (ponowny wzrost gorączki, bolesne parcie na stolec w 5.–7. dobie)."
    },
    diffTable: {
      title: "Diagnostyka różnicowa ostrego bólu brzucha u małego dziecka",
      headers: ["Jednostka chorobowa", "Objawy kliniczne", "Obraz USG", "Badania laboratoryjne", "Postępowanie"],
      rows: [
        [
          "Ostre zapalenie wyrostka robaczkowego",
          "Ból w prawym dole, utykanie na prawą nogę, gorączka, wymioty po bólu",
          "Wyrostek >6 mm, nieściśliwy, płyn wokół, kamień kałowy",
          "Wysoka leukocytoza z neutrofilią, CRP >50 mg/l",
          "Pilna operacja (appendektomia laparoskopowa) + antybiotyki"
        ],
        [
          "Zapalenie węzłów chłonnych krezki (Lymphadenitis mesenterica)",
          "Ból brzucha po przebytej infekcji górnych dróg oddechowych, stan ogólny dobry",
          "Wyrostek robaczkowy prawidłowy (<6 mm); pakiety powiększonych węzłów krezkowych",
          "Leukocyty w normie lub miernie podwyższone, CRP umiarkowane",
          "Leczenie objawowe zachowawcze (nawadnianie, przeciwbólowe)"
        ],
        [
          "Wgłobienie jelita (Intussusceptio)",
          "Napadowe bóle kolkowe, podkurczanie nóżek, stolec 'galaretka porzeczkowa'",
          "Objaw tarczy strzelniczej / tarczy kokardy (target sign), brak przepływu",
          "Początkowo parametry zapalne prawidłowe",
          "Pilne odwgłobienie pneumatyczne/hydrostatyczne pod USG"
        ],
        [
          "Zakażenie układu moczowego (ZUM / Pyelonephritis)",
          "Wysoka gorączka bez wyraźnego źródła, niepokój przy mikcji, wymioty",
          "Obrzęk miąższu nerki lub cechy zastoju; wyrostek prawidłowy",
          "Leukocyturia, bakteriuria w moczu, dodatni posiew moczu",
          "Antybiotykoterapia celowana dożylna/doustna"
        ]
      ]
    },
    lekQuestions: [
      {
        q: "Dlaczego u dzieci poniżej 3. roku życia ostre zapalenie wyrostka robaczkowego znacznie częściej niż u dorosłych prowadzi do wczesnego, rozlanego zapalenia otrzewnej?",
        opts: [
          "A) Z powodu anatomicznie krótkiej i cienkiej sieci większej, która nie jest w stanie odgraniczyć ogniska zapalnego, oraz cieńszej ściany wyrostka.",
          "B) Z powodu braku flory beztlenowej w przewodzie pokarmowym u małych dzieci.",
          "C) Z powodu nadmiernej długości wyrostka robaczkowego sięgającego do lewego podżebrza.",
          "D) Z powodu fizjologicznej hiperalbuminemii nasilającej wysięk zapalny.",
          "E) Z powodu braku receptorów bólowych w otrzewnej ściennej u dzieci."
        ],
        correctIdx: 0,
        exp: "U małych dzieci (<3-4 r.ż.) ściana wyrostka jest bardzo cienka i szybko ulega martwicy, a sieć większa (omentum majus) jest krótka i słabo rozwinięta, przez co nie sięga do prawego dołu biodrowego i nie tworzy nacieku ograniczającego perforację, co skutkuje wczesnym rozlanym zapaleniem otrzewnej.",
        options: [
          "A) Z powodu anatomicznie krótkiej i cienkiej sieci większej, która nie jest w stanie odgraniczyć ogniska zapalnego, oraz cieńszej ściany wyrostka.",
          "B) Z powodu braku flory beztlenowej w przewodzie pokarmowym u małych dzieci.",
          "C) Z powodu nadmiernej długości wyrostka robaczkowego sięgającego do lewego podżebrza.",
          "D) Z powodu fizjologicznej hiperalbuminemii nasilającej wysięk zapalny.",
          "E) Z powodu braku receptorów bólowych w otrzewnej ściennej u dzieci."
        ],
        correct: 0,
        expl: "U małych dzieci (<3-4 r.ż.) ściana wyrostka jest bardzo cienka i szybko ulega martwicy, a sieć większa (omentum majus) jest krótka i słabo rozwinięta, przez co nie sięga do prawego dołu biodrowego i nie tworzy nacieku ograniczającego perforację, co skutkuje wczesnym rozlanym zapaleniem otrzewnej."
      },
      {
        q: "Badaniem obrazowym I wyboru u dziecka z podejrzeniem ostrego zapalenia wyrostka robaczkowego jest:",
        opts: [
          "A) Ultrasonografia jamy brzusznej (USG) techniką stopniowanego ucisku.",
          "B) Tomografia komputerowa jamy brzusznej z podwójnym kontrastem.",
          "C) Rezonans magnetyczny jamy brzusznej w sekwencji T1 i T2.",
          "D) Zdjęcie rentgenowskie przeglądowe jamy brzusznej na stojąco.",
          "E) Scyntygrafia z użyciem technetu 99mTc."
        ],
        correctIdx: 0,
        exp: "Zgodnie z zasadą ALARA i wytycznymi chirurgii dziecięcej, badaniem I wyboru u dzieci jest badanie USG techniką stopniowanego ucisku (graded compression). Cechy zapalenia to średnica >6 mm, brak podatności na ucisk i płyn okołowyrostkowy. TK stosuje się jedynie w przypadkach wątpliwych.",
        options: [
          "A) Ultrasonografia jamy brzusznej (USG) techniką stopniowanego ucisku.",
          "B) Tomografia komputerowa jamy brzusznej z podwójnym kontrastem.",
          "C) Rezonans magnetyczny jamy brzusznej w sekwencji T1 i T2.",
          "D) Zdjęcie rentgenowskie przeglądowe jamy brzusznej na stojąco.",
          "E) Scyntygrafia z użyciem technetu 99mTc."
        ],
        correct: 0,
        expl: "Zgodnie z zasadą ALARA i wytycznymi chirurgii dziecięcej, badaniem I wyboru u dzieci jest badanie USG techniką stopniowanego ucisku (graded compression). Cechy zapalenia to średnica >6 mm, brak podatności na ucisk i płyn okołowyrostkowy. TK stosuje się jedynie w przypadkach wątpliwych."
      }
    ],
    flashcards: [
      {
        cat: "Pediatria",
        q: "Jaki jest odsetek perforacji wyrostka robaczkowego u dzieci poniżej 3. roku życia?",
        a: "Aż 50–80% (wynika z trudności diagnostycznych, cienkiej ściany wyrostka i krótkiej sieci większej)."
      },
      {
        cat: "Pediatria",
        q: "Dlaczego sieć większa u małego dziecka nie odgranicza zapalenia wyrostka?",
        a: "Jest anatomicznie za krótka i cienka – nie sięga do prawego dołu biodrowego, co sprzyja rozlanemu peritonitis."
      },
      {
        cat: "Pediatria",
        q: "Jaka średnica wyrostka w badaniu USG u dziecka przemawia za zapaleniem?",
        a: ">6 mm przy braku podatności na ucisk głowicą (nieściśliwość wyrostka)."
      },
      {
        cat: "Pediatria",
        q: "Czy podanie leków przeciwbólowych przed operacją u dziecka 'zamazuje obraz' ostrego brzucha?",
        a: "NIE! Skuteczna analgezja zmniejsza cierpienie dziecka i ułatwia badanie palpacyjne bez maskowania objawów otrzewnowych."
      },
      {
        cat: "Pediatria",
        q: "Jakie jest najczęstsze ropne powikłanie po operacji powikłanego wyrostka w 5.–7. dobie?",
        a: "Ropień w jamie Douglasa (objawia się nawrotem gorączki i bolesnym parciem na stolec – tenesmus)."
      }
    ]
  }
];

// Combine all 101-103
let allCases = [...baseCases, ...newCases103_110];
fs.writeFileSync('scripts/data_cases_101_112.js', 'module.exports = ' + JSON.stringify(allCases, null, 2) + ';', 'utf8');
console.log('Saved 101, 102, 103 to data_cases_101_112.js. Total:', allCases.length);

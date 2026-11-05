const fs = require('fs');
const path = require('path');
const { encryptStringAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

const casesData = [
  // =========================================================================
  // CASE 159: Krwotok Śródmózgowy (ICH)
  // =========================================================================
  {
    id: 159,
    file: "159_krwotok_srodmozgowy_ich.json",
    shortTitle: "Krwotok Śródmózgowy (ICH)",
    title: "Ostre Krwawienie Śródmózgowe Nadciśnieniowe do Torebki Wewnętrznej (ICH)",
    dept: "Neurologia i Neurochirurgia",
    diagnosisTitle: "Krwotok Śródmózgowy do Jąder Podkorowych i Torebki Wewnętrznej lewej półkuli (ICH)",
    vitals: [
      { label: "Ciśnienie tętnicze (RR)", val: "215/120", unit: "mmHg", status: "vital-crit" },
      { label: "Częstość akcji serca (HR)", val: "88", unit: "/min", status: "vital-ok" },
      { label: "Częstość oddechów (RR)", val: "20", unit: "/min", status: "vital-warn" },
      { label: "Saturacja (SpO2)", val: "96", unit: "%", status: "vital-ok" },
      { label: "Temperatura ciała", val: "37.0", unit: "°C", status: "vital-ok" }
    ],
    story: "<p><strong>Pacjent:</strong> 62-letni mężczyzna przywieziony na SOR przez zespół ratownictwa medycznego z powodu nagłego niedowładu połowiczego i utraty mowy.</p><p><strong>Wywiad chorobowy:</strong> Objawy wystąpiły nagle 70 minut temu podczas kopania grządek w ogrodzie. Pacjent poczuł silny, rozsadzający ból głowy, po czym osunął się na ziemię. Wystąpiły nudności i dwukrotne wymioty. W wywiadzie: wieloletnie, nieregularnie leczone nadciśnienie tętnicze (odmówił przyjmowania leków 6 miesięcy temu). Pacjent nie przyjmuje leków przeciwkrzepliwych.</p><p><strong>Badanie przedmiotowe:</strong> Pacjent podsypiający, otwiera oczy na głos, zdezorientowany (GCS 12). Ciśnienie tętnicze 215/120 mmHg. W badaniu neurologicznym: głęboki niedowład wiotki prawych kończyn (siła mięśniowa 0/5 wg skali Lovetta), opadnięty prawy kącik ust (ośrodkowe porażenie nerwu VII), głęboka afazja motoryczna (chory rozumie proste polecenia, lecz nie potrafi wypowiedzieć słów), zwrot gałek ocznych w stronę uszkodzonej lewej półkuli mózgu. Objaw Babińskiego po stronie prawej dodatni.</p>",
    steps: [
      {
        title: "Krok 1: Pilna diagnostyka różnicowa udaru mózgu",
        scenario: "Pacjent prezentuje ostry zespół ubytkowy sugerujący udar mózgu w oknie trombolitycznym. Jaka procedura neuroobrazowa jest procedurą pierwszego rzutu z wyboru w celu natychmiastowego odróżnienia udaru niedokrwiennego od krwotocznego?",
        options: [
          {
            text: "Pilna tomografia komputerowa (TK) głowy bez podania środka cieniującego w trybie 'kod udarowy'",
            correct: true,
            isCorrect: true,
            feedback: "✅ PRAWIDŁOWO! Niekontrastowa TK głowy (NCCT) pozwala w ciągu kilku minut z niemal 100% czułością wykryć obecność ostrego wynaczynienia krwi (hiperdensyjne ognisko o gęstości 60–80 j.H.), różnicując krwotok śródmózgowy (ICH) od udaru niedokrwiennego i decydując o dalszym leczeniu."
          },
          {
            text: "Podanie dożylnego bolusu alteplazy (rt-PA) w dawce 0,9 mg/kg przed wykonaniem jakichkolwiek badań obrazowych",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Podanie trombolizy w krwotoku śródmózgowym jest błędem śmiertelnym i doprowadzi do natychmiastowego masywnego wylewu i zgonu chorego."
          },
          {
            text: "Wykonanie nakłucia lędźwiowego na sali przyjęć w celu zmierzenia ciśnienia otwarcia płynu",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Nakłucie lędźwiowe przy obecności ciasnoty wewnątrzczaszkowej wywołanej krwiakiem grozi natychmiastowym śmiertelnym wklinowaniem mózgu!"
          },
          {
            text: "Zlecenie badania RTG czaszki z oceną symetrii kości klinowej",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! RTG czaszki nie uwidacznia krwiaków mózgu."
          }
        ]
      },
      {
        title: "Krok 2: Agresywna kontrola ciśnienia tętniczego w ostrej fazie",
        scenario: "W TK głowy stwierdzono krwiak śródmózgowy o objętości 25 ml w lewej torebce wewnętrznej i jądrach podstawy z miernym efektem masy. Ciśnienie tętnicze wynosi 215/120 mmHg. Do jakich wartości docelowych i jakimi lekami należy natychmiast obniżyć ciśnienie wg wytycznych ESO/AHA?",
        options: [
          {
            text: "Natychmiastowe, ostrożne obniżenie ciśnienia skurczowego (SBP) do przedziału 130–140 mmHg za pomocą dożylnego labetalolu lub urapidylu",
            correct: true,
            isCorrect: true,
            feedback: "✅ PRAWIDŁOWO! Zgodnie z badaniami INTERACT-2 i ATACH-2 oraz wytycznymi ESO/AHA, u chorych z ostrym ICH i SBP >150 mmHg zaleca się pilne, płynne obniżenie SBP do 130–140 mmHg (unikając spadków <130 mmHg) przy użyciu leków i.v. (labetalol, urapidyl), co hamuje powiększanie się krwiaka (hematoma expansion) w pierwszych godzinach."
          },
          {
            text: "Utrzymywanie skrajnego nadciśnienia >200 mmHg w celu wymuszenia hiperperfuzji mózgowia",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Utrzymywanie SBP >200 mmHg bezpośrednio napędza ekspansję krwiaka i prowadzi do zgonu."
          },
          {
            text: "Podanie podjęzykowej nifedypiny w kroplach w celu gwałtownego obniżenia ciśnienia skurczowego poniżej 90 mmHg",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Podjęzykowa nifedypina o szybkim uwalnianiu wywołuje niekontrolowany spadek ciśnienia, zapaść wieńcową i zawał mózgu."
          },
          {
            text: "Całkowite zaniechanie leczenia hipotensyjnego przez pierwsze 7 dni od incydentu",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Brak leczenia nadciśnienia w ICH prowadzi do zgonu we wklinowaniu u ponad połowy pacjentów."
          }
        ]
      },
      {
        title: "Krok 3: Ocena i odwracanie potencjalnej koagulopatii",
        scenario: "Gdyby pacjent z krwotokiem śródmózgowym przyjmował doustny antykoagulant z grupy bezpośrednich inhibitorów czynnika Xa (np. riwaroksaban lub apiksaban), jaka substancja jest swoistym antidotum lub lekiem hemostatycznym pierwszego rzutu?",
        options: [
          {
            text: "Andeksanet alfa (Andexanet alfa) LUB 4-czynnikowy koncentrat kompleksu protrombiny (4F-PCC w dawce 25–50 j.m./kg)",
            correct: true,
            isCorrect: true,
            feedback: "✅ PRAWIDŁOWO! Swoistym antidotum dla inhibitorów czynnika Xa jest andeksanet alfa. W razie jego braku wytyczne nakazują natychmiastowe podanie 4-czynnikowego koncentratu kompleksu protrombiny (4F-PCC: czynniki II, VII, IX, X) w celu natychmiastowego przywrócenia hemostazy (dla dabigatranu swoistym antidotum jest idarucizumab, a dla VKA – PCC + witamina K)."
          },
          {
            text: "Podanie dożylne siarczanu protaminy w dawce 500 mg w skojarzeniu z witaminą C",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Siarczan protaminy odwraca wyłącznie działanie heparyny, a nie inhibitorów czynnika Xa."
          },
          {
            text: "Przetoczenie 10 jednostek świeżej krwi pełnej od dawcy z grupą krwi 0 Rh-ujemną",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Krew pełna nie zawiera terapeutycznych stężeń czynników krzepnięcia i wywoła przeciążenie krążenia (TACO)."
          },
          {
            text: "Podanie dożylne wlewu z glikolu polietylenowego w celu adsorpcji leku w nerkach",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Glikol polietylenowy jest środkiem przeczyszczającym i nie odwraca antykoagulacji."
          }
        ]
      },
      {
        title: "Krok 4: Nadzór nad obrzękiem mózgu i kwalifikacja neurochirurgiczna",
        scenario: "W 2. dobie u pacjenta dochodzi do pogorszenia stanu świadomości (GCS spada z 12 do 9). W kontrolnej TK widoczny jest masywny okołokrwiakowy obrzęk naczyniopochodny z przemieszczeniem struktur linii pośrodkowej o 6 mm. Jaki zestaw działań przeciwobrzękowych i decyzji zabiegowych należy wdrożyć?",
        options: [
          {
            text: "Uniesienie wezgłowia łóżka do 30°, sedacja, osmoterapia dożylna (mannitol 20% lub hipertoniczny roztwór NaCl 3%) oraz pilna konsultacja neurochirurgiczna",
            correct: true,
            isCorrect: true,
            feedback: "✅ PRAWIDŁOWO! Postępowanie w obrzęku mózgu obejmuje ułożenie z uniesieniem głowy do 30° (ułatwienie odpływu żylnego), unikanie płynów hipotonicznych, osmoterapie (mannitol lub NaCl 3%) oraz ocenę neurochirurgiczną pod kątem hemikraniektomii odbarczającej lub ewakuacji krwiaka (bezwzględne wskazanie do operacji stanowi krwiak móżdżku >3 cm uciskający pień mózgu)."
          },
          {
            text: "Rutynowe podanie wysokich dawek deksametazonu (16 mg i.v.) w celu redukcji obrzęku cytotoksycznego",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Glikokortykosteroidy w udarze krwotocznym są BEZWZGLĘDNIE PRZECIWWSKAZANE – nie zmniejszają obrzęku, a istotnie zwiększają śmiertelność (infekcje, powikłania krwotoczne z przewodu pokarmowego, hiperglikemia)."
          },
          {
            text: "Ułożenie pacjenta w pozycji Trendelenburga z głową opuszczoną poniżej poziomu nóg",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Pozycja z opuszczoną głową drastycznie zwiększa ciśnienie śródczaszkowe i przyspiesza wklinowanie mózgu."
          },
          {
            text: "Wykonanie agresywnego odbarczenia płynu mózgowo-rdzeniowego przez punkcję lędźwiową",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Punkcja lędźwiowa przy przemieszczeniu linii pośrodkowej wywoła natychmiastowe wklinowanie migdałków móżdżku w otwór wielki i zgon."
          }
        ]
      }
    ],
    pathoNodes: [
      {
        title: "Lipohialinoza i tętniaki Charcota-Boucharda",
        desc: "Przewlekłe nadciśnienie tętnicze prowadzi do zwyrodnienia szklistego i stwardnienia ścian małych tętnic przeszywających mózgu.",
        detail: "Tętnice soczewkowo-prążkowiowe (lenticulostriate arteries) odchodzące bezpośrednio od tętnicy środkowej mózgu są poddawane stałemu uderzeniu fali tętna. W osłabionej ścianie powstają mikrotętniaki Charcota-Boucharda, które pękają pod wpływem skoku ciśnienia.",
        target: "Punkt uchwytu profilaktyki i leczenia: Ścisła, przewlekła kontrola ciśnienia tętniczego (cel <130/80 mmHg)."
      },
      {
        title: "Ekspansja krwiaka (hematoma expansion) i efekt masy",
        desc: "Krwawienie tętnicze nie ulega natychmiastowemu zatrzymaniu, prowadząc do mechanicznego rozrywania istoty białej mózgowia.",
        detail: "U około 30–40% chorych objętość krwiaka istotnie powiększa się w ciągu pierwszych 3–6 godzin od incydentu. Wynaczyniona krew uciska drogi piramidowe w torebce wewnętrznej, powodując porażenie połowicze i wgłobienie.",
        target: "Punkt uchwytu leczenia: Natychmiastowe obniżenie ciśnienia skurczowego do 130–140 mmHg oraz odwrócenie koagulopatii w pierwszych godzinach."
      },
      {
        title: "Toksyczność okołokrwiakowa i obrzęk mózgu",
        desc: "Liza erytrocytów uwalnia hemoglobinę, żelazo i trombinę, które indukują śmierć komórek nerwowych.",
        detail: "Aktywacja mikrogleju i wolnych rodników tlenowych niszczy barierę krew-mózg, wywołując potężny naczyniopochodny obrzęk okołokrwiakowy narastający przez pierwsze 7–14 dni i nasilający nadciśnienie śródczaszkowe.",
        target: "Punkt uchwytu leczenia: Osmoterapia (mannitol / NaCl 3%), uniesienie wezgłowia 30° i ewentualna kraniektomia odbarczająca."
      }
    ],
    dutySummary: {
      overview: "Krwotok śródmózgowy (ICH) to nieurazowe wynaczynienie krwi do miąższu mózgu, stanowiące ok. 10–15% wszystkich udarów mózgu, obarczone blisko 40% śmiertelnością. Najczęstszą przyczyną (ok. 80%) jest przewlekłe nadciśnienie tętnicze prowadzące do pęknięcia tętnic przeszywających (typowe lokalizacje: jądra podkorowe, torebka wewnętrzna, wzgórze, most, móżdżek).",
      diagnostics: "1. Pilna tomografia komputerowa (TK) głowy bez kontrastu (NCCT) – badanie z wyboru w 'kodzie udarowym'.\n\n2. Angio-TK (CTA) – poszukiwanie naczyniowych przyczyn krwawienia (tętniaki, AVM) oraz obecności objawu plamy ('spot sign' – predyktor ekspansji krwiaka).\n\n3. Badania laboratoryjne pilne: morfologia (PLT), INR, APTT, fibrynogen, elektrolity, kreatynina, glikemia, toksykologia.\n\n4. Ocena skalami klinicznymi: NIHSS, GCS oraz ICH Score (ocena rokowania śmiertelności na podstawie wieku, GCS, objętości krwiaka, obecności krwi w komorach i lokalizacji podnamiotowej).",
      drugsAndDoses: "• Kontrola ciśnienia tętniczego (cel SBP 130–140 mmHg): <span class=\"dose-pill\">Urapidyl: 10–25 mg i.v. powoli</span>, następnie wlew ciągły <span class=\"dose-pill\">5–40 mg/h</span> LUB <span class=\"dose-pill\">Labetalol: 10–20 mg i.v.</span> w ciągu 2 min.\n• Odwracanie antykoagulacji (w razie stosowania leków):\n  - Witamina K: <span class=\"dose-pill\">10 mg i.v. powoli</span> + <span class=\"dose-pill\">4F-PCC: 25–50 j.m./kg i.v.</span> przy VKA (INR >1,4)\n  - Dabigatran: <span class=\"dose-pill\">Idarucizumab: 5,0 g i.v.</span> (2 dawki po 2,5 g)\n  - Rywaroksaban / apiksaban: <span class=\"dose-pill\">Andeksanet alfa</span> lub <span class=\"dose-pill\">4F-PCC: 50 j.m./kg i.v.</span>\n• Osmoterapia w obrzęku mózgu: <span class=\"dose-pill\">Mannitol 20%: 0,5–1,0 g/kg i.v. w ciągu 20–30 min</span> lub roztwór NaCl 3%.\n• BEZWZGLĘDNY ZAKAZ podawania glikokortykosteroidów (deksametazonu)!",
      procedures: "Uniesienie wezgłowia łóżka do 30°, zabezpieczenie dróg oddechowych (intubacja przy GCS ≤8), pilna operacja neurochirurgiczna w krwiakach móżdżku >3 cm lub kraniektomia odbarczająca w krwiakach półkulowych z efektem masy.",
      monitoring: "Ciągły nadzór na Oddziale Udarowym / OIT: automatyczny pomiar ciśnienia tętniczego co 15 minut do stabilizacji, ścisłe monitorowanie GCS i źrenic, kontrola glikemii (cel 140–180 mg/dl) i normotermii (<37,5°C)."
    },
    diffTable: {
      title: "⚔️ Tabela Różnicowa: Krwotok Śródmózgowy Nadciśnieniowy (ICH) vs Mózgowa Angiopatia Amyloidowa (CAA) vs Udar Niedokrwienny vs Krwotok z AVM",
      headers: ["Cecha kliniczna", "ICH Nadciśnieniowy", "Mózgowa Angiopatia Amyloidowa (CAA)", "Udar Niedokrwienny", "Malformacja Tętniczo-Żylna (AVM)"],
      rows: [
        ["Typowa lokalizacja", "Głęboka (jądra podkorowe, torebka, most, móżdżek)", "Płatowa (powierzchowna, kora i podkorowa istota biała)", "Dorzecze naczyniowe (np. t. środkowa mózgu MCA)", "Różna, często podkorowa u młodych pacjentów"],
        ["Wiek pacjentów", "Zazwyczaj 50–75 lat z nadciśnieniem", "Osoby starsze (>70–75 lat), bez wywiadu NT", "Każdy wiek, głównie >65 lat z miażdżycą", "Młodzi dorośli (20–40 lat)"],
        ["Obraz w TK głowy", "Okrągły hiperdensyjny krwiak w głębi mózgu", "Kora/płaty mózgu, często nawrotowe krwawienia", "Wczesne cechy hipodensji (zatarcia granic)", "Nieregularny krwiak z patologicznymi naczyniami"],
        ["Współistniejące cechy", "Przerost lewej komory serca, nefropatia", "Otępienie (Alzheimer), mikrokrwawienia w MRI GRE", "Migotanie przedsionków, blaszki w tętnicach szyjnych", "Drgawki w wywiadzie, szmer nad czaszką"],
        ["Ryzyko nawrotu", "Umiarkowane (zależne od kontroli RR)", "Bardzo wysokie (nawrotowe udary płatowe)", "Wysokie bez prewencji wtórnej", "Bardzo wysokie do momentu embolizacji/resekcji"],
        ["Leczenie swoiste", "Obniżenie SBP <140 mmHg + ewentualna operacja", "Unikanie antykoagulantów i leków p-płytkowych", "Tromboliza dożylna rt-PA / trombektomia", "Embolizacja wewnątrznaczyniowa / resekcja AVM"]
      ]
    },
    lekQuestions: [
      {
        q: "Do jakich docelowych wartości ciśnienia skurczowego (SBP) zaleca się obniżyć ciśnienie tętnicze w ciągu pierwszych godzin od wystąpienia ostrego krwotoku śródmózgowego (ICH) wg wytycznych ESO i AHA/ASA?",
        question: "Do jakich docelowych wartości ciśnienia skurczowego (SBP) zaleca się obniżyć ciśnienie tętnicze w ciągu pierwszych godzin od wystąpienia ostrego krwotoku śródmózgowego (ICH) wg wytycznych ESO i AHA/ASA?",
        opts: [
          "A) Do przedziału 130–140 mmHg (z unikaniem spadków ciśnienia poniżej 130 mmHg)",
          "B) Do wartości poniżej 90 mmHg w celu całkowitego odbarczenia naczyń",
          "C) Nie należy obniżać ciśnienia, utrzymując SBP powyżej 220 mmHg przez pierwsze 48 godzin",
          "D) Do wartości dokładnie 160–180 mmHg bez użycia leków dożylnych",
          "E) Ciśnienie skurczowe należy zrównać z wartością ciśnienia żylnego ośrodkowego"
        ],
        options: [
          "A) Do przedziału 130–140 mmHg (z unikaniem spadków ciśnienia poniżej 130 mmHg)",
          "B) Do wartości poniżej 90 mmHg w celu całkowitego odbarczenia naczyń",
          "C) Nie należy obniżać ciśnienia, utrzymując SBP powyżej 220 mmHg przez pierwsze 48 godzin",
          "D) Do wartości dokładnie 160–180 mmHg bez użycia leków dożylnych",
          "E) Ciśnienie skurczowe należy zrównać z wartością ciśnienia żylnego ośrodkowego"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Zgodnie z badaniami klinicznymi (INTERACT-2) i wytycznymi ESO/AHA, u pacjentów zgłaszających się z SBP 150–220 mmHg wczesne i bezpieczne obniżenie ciśnienia skurczowego do wartości 130–140 mmHg (przy unikaniu gwałtownych spadków <130 mmHg) skutecznie hamuje powiększanie się krwiaka (hematoma expansion) bez pogarszania perfuzji mózgowia.",
        expl: "Prawidłowo! Zgodnie z badaniami klinicznymi (INTERACT-2) i wytycznymi ESO/AHA, u pacjentów zgłaszających się z SBP 150–220 mmHg wczesne i bezpieczne obniżenie ciśnienia skurczowego do wartości 130–140 mmHg (przy unikaniu gwałtownych spadków <130 mmHg) skutecznie hamuje powiększanie się krwiaka (hematoma expansion) bez pogarszania perfuzji mózgowia.",
        explanation: "Prawidłowo! Zgodnie z badaniami klinicznymi (INTERACT-2) i wytycznymi ESO/AHA, u pacjentów zgłaszających się z SBP 150–220 mmHg wczesne i bezpieczne obniżenie ciśnienia skurczowego do wartości 130–140 mmHg (przy unikaniu gwałtownych spadków <130 mmHg) skutecznie hamuje powiększanie się krwiaka (hematoma expansion) bez pogarszania perfuzji mózgowia."
      },
      {
        q: "Dlaczego stosowanie glikokortykosteroidów (np. deksametazonu) w leczeniu obrzęku mózgu w przebiegu ostrego udaru krwotocznego jest BEZWZGLĘDNIE PRZECIWWSKAZANE?",
        question: "Dlaczego stosowanie glikokortykosteroidów (np. deksametazonu) w leczeniu obrzęku mózgu w przebiegu ostrego udaru krwotocznego jest BEZWZGLĘDNIE PRZECIWWSKAZANE?",
        opts: [
          "A) Ponieważ sterydy nie zmniejszają obrzęku w udarze, a istotnie zwiększają śmiertelność (infekcje, powikłania krwotoczne z przewodu pokarmowego, hiperglikemia)",
          "B) Ponieważ wywołują natychmiastowe stwardnienie kości czaszki i uniemożliwiają kraniektomię",
          "C) Ze względu na bezpośrednie blokowanie wydzielania erytropoetyny w nerkach chorego",
          "D) Ponieważ powodują zrośnięcie komór bocznych mózgu w ciągu pierwszych 2 godzin",
          "E) Z powodu wybiórczego niszczenia komórek kory móżdżku przez związki steroidowe"
        ],
        options: [
          "A) Ponieważ sterydy nie zmniejszają obrzęku w udarze, a istotnie zwiększają śmiertelność (infekcje, powikłania krwotoczne z przewodu pokarmowego, hiperglikemia)",
          "B) Ponieważ wywołują natychmiastowe stwardnienie kości czaszki i uniemożliwiają kraniektomię",
          "C) Ze względu na bezpośrednie blokowanie wydzielania erytropoetyny w nerkach chorego",
          "D) Ponieważ powodują zrośnięcie komór bocznych mózgu w ciągu pierwszych 2 godzin",
          "E) Z powodu wybiórczego niszczenia komórek kory móżdżku przez związki steroidowe"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! W licznych badaniach z randomizacją wykazano, że podawanie sterydów (deksametazonu) w udarze mózgu (niedokrwiennym i krwotocznym) nie przynosi korzyści w redukcji obrzęku, natomiast drastycznie zwiększa ryzyko ciężkich zakażeń szpitalnych (zapalenie płuc, sepsa), krwawień z przewodu pokarmowego oraz niekontrolowanej hiperglikemii, prowadząc do wzrostu śmiertelności.",
        expl: "Prawidłowo! W licznych badaniach z randomizacją wykazano, że podawanie sterydów (deksametazonu) w udarze mózgu (niedokrwiennym i krwotocznym) nie przynosi korzyści w redukcji obrzęku, natomiast drastycznie zwiększa ryzyko ciężkich zakażeń szpitalnych (zapalenie płuc, sepsa), krwawień z przewodu pokarmowego oraz niekontrolowanej hiperglikemii, prowadząc do wzrostu śmiertelności.",
        explanation: "Prawidłowo! W licznych badaniach z randomizacją wykazano, że podawanie sterydów (deksametazonu) w udarze mózgu (niedokrwiennym i krwotocznym) nie przynosi korzyści w redukcji obrzęku, natomiast drastycznie zwiększa ryzyko ciężkich zakażeń szpitalnych (zapalenie płuc, sepsa), krwawień z przewodu pokarmowego oraz niekontrolowanej hiperglikemii, prowadząc do wzrostu śmiertelności."
      },
      {
        q: "Który stan kliniczny stanowi BEZWZGLĘDNE wskazanie do pilnej operacji neurochirurgicznej w udarze krwotocznym mózgu?",
        question: "Który stan kliniczny stanowi BEZWZGLĘDNE wskazanie do pilnej operacji neurochirurgicznej w udarze krwotocznym mózgu?",
        opts: [
          "A) Krwiak móżdżku o średnicy >3 cm wywołujący ucisk pnia mózgu lub ostre wodogłowie",
          "B) Mały krwiak torebki wewnętrznej o objętości 5 ml u przytomnego pacjenta",
          "C) Izolowany mikrowylew krwawy w korze płata skroniowego bez obrzęku",
          "D) Płytki krwiak przymózgowy o grubości 2 milimetrów bez przemieszczenia linii pośrodkowej",
          "E) Krwotok do mostu u pacjenta w stadium głębokiej śmierci mózgu"
        ],
        options: [
          "A) Krwiak móżdżku o średnicy >3 cm wywołujący ucisk pnia mózgu lub ostre wodogłowie",
          "B) Mały krwiak torebki wewnętrznej o objętości 5 ml u przytomnego pacjenta",
          "C) Izolowany mikrowylew krwawy w korze płata skroniowego bez obrzęku",
          "D) Płytki krwiak przymózgowy o grubości 2 milimetrów bez przemieszczenia linii pośrodkowej",
          "E) Krwotok do mostu u pacjenta w stadium głębokiej śmierci mózgu"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Krwiaki móżdżku o średnicy >3 cm (lub z uciskiem pnia mózgu i zablokowaniem komory czwartej z wodogłowiem) stanowią bezwzględne wskazanie do natychmiastowej ewakuacji chirurgicznej (podpotylicznej kraniektomii odbarczającej). Pozostawienie takiego krwiaka prowadzi do bezpośredniego wklinowania i zgonu w mechanizmie ucisku ośrodka oddechowego i krążeniowego.",
        expl: "Prawidłowo! Krwiaki móżdżku o średnicy >3 cm (lub z uciskiem pnia mózgu i zablokowaniem komory czwartej z wodogłowiem) stanowią bezwzględne wskazanie do natychmiastowej ewakuacji chirurgicznej (podpotylicznej kraniektomii odbarczającej). Pozostawienie takiego krwiaka prowadzi do bezpośredniego wklinowania i zgonu w mechanizmie ucisku ośrodka oddechowego i krążeniowego.",
        explanation: "Prawidłowo! Krwiaki móżdżku o średnicy >3 cm (lub z uciskiem pnia mózgu i zablokowaniem komory czwartej z wodogłowiem) stanowią bezwzględne wskazanie do natychmiastowej ewakuacji chirurgicznej (podpotylicznej kraniektomii odbarczającej). Pozostawienie takiego krwiaka prowadzi do bezpośredniego wklinowania i zgonu w mechanizmie ucisku ośrodka oddechowego i krążeniowego."
      },
      {
        q: "Wskaż zestaw twierdzeń PRAWDZIWYCH dotyczących krwotoku śródmózgowego (ICH):\n1. Przewlekłe nadciśnienie tętnicze odpowiada za większość pierwotnych krwawień śródmózgowych.\n2. Do typowych lokalizacji krwotoków nadciśnieniowych należą jądra podstawy, torebka wewnętrzna i móżdżek.\n3. U pacjentów stosujących antagonistów witaminy K (warfaryna) lekiem pierwszego rzutu jest 4F-PCC wraz z witaminą K.\n4. Nakłucie lędźwiowe jest bezwzględnym badaniem pierwszego rzutu przed wykonaniem TK głowy.\n5. Objaw plamy ('spot sign') w badaniu Angio-TK jest silnym predyktorem powiększania się krwiaka.",
        question: "Wskaż zestaw twierdzeń PRAWDZIWYCH dotyczących krwotoku śródmózgowego (ICH):\n1. Przewlekłe nadciśnienie tętnicze odpowiada za większość pierwotnych krwawień śródmózgowych.\n2. Do typowych lokalizacji krwotoków nadciśnieniowych należą jądra podstawy, torebka wewnętrzna i móżdżek.\n3. U pacjentów stosujących antagonistów witaminy K (warfaryna) lekiem pierwszego rzutu jest 4F-PCC wraz z witaminą K.\n4. Nakłucie lędźwiowe jest bezwzględnym badaniem pierwszego rzutu przed wykonaniem TK głowy.\n5. Objaw plamy ('spot sign') w badaniu Angio-TK jest silnym predyktorem powiększania się krwiaka.",
        opts: [
          "A) 1, 2, 3, 5",
          "B) 1, 2, 4",
          "C) 2, 3, 4, 5",
          "D) 1, 3, 4",
          "E) Tylko 1 i 2"
        ],
        options: [
          "A) 1, 2, 3, 5",
          "B) 1, 2, 4",
          "C) 2, 3, 4, 5",
          "D) 1, 3, 4",
          "E) Tylko 1 i 2"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Zdania 1, 2, 3 i 5 są prawdziwe. Zdanie 4 jest całkowicie błędne: nakłucie lędźwiowe bez uprzedniego wykonania TK głowy jest śmiertelnie niebezpieczne ze względu na ryzyko wgłobienia migdałków móżdżku w otwór wielki (ciasnota śródczaszkowa).",
        expl: "Prawidłowo! Zdania 1, 2, 3 i 5 są prawdziwe. Zdanie 4 jest całkowicie błędne: nakłucie lędźwiowe bez uprzedniego wykonania TK głowy jest śmiertelnie niebezpieczne ze względu na ryzyko wgłobienia migdałków móżdżku w otwór wielki (ciasnota śródczaszkowa).",
        explanation: "Prawidłowo! Zdania 1, 2, 3 i 5 są prawdziwe. Zdanie 4 jest całkowicie błędne: nakłucie lędźwiowe bez uprzedniego wykonania TK głowy jest śmiertelnie niebezpieczne ze względu na ryzyko wgłobienia migdałków móżdżku w otwór wielki (ciasnota śródczaszkowa)."
      },
      {
        q: "Wskaż zdanie FAŁSZYWE dotyczące mózgowej angiopatii amyloidowej (Cerebral Amyloid Angiopathy – CAA):",
        question: "Wskaż zdanie FAŁSZYWE dotyczące mózgowej angiopatii amyloidowej (Cerebral Amyloid Angiopathy – CAA):",
        opts: [
          "A) Krwawienia w przebiegu CAA lokalizują się typowo w głębokich strukturach mózgowia, takich jak most i jądra podkorowe",
          "B) CAA występuje typowo u pacjentów w podeszłym wieku (>70 lat) i wiąże się z odkładaniem amyloidu beta w ścianach naczyń korowych",
          "C) Charakterystyczną cechą CAA są nawrotowe krwawienia płatowe (korowo-podkorowe)",
          "D) W badaniu MRI w sekwencjach T2* lub SWI widoczne są liczne korowe mikrowylewy krwawe (cerebral microbleeds)",
          "E) U pacjentów z CAA i migotaniem przedsionków stosowanie antykoagulacji wiąże się ze skrajnie wysokim ryzykiem zgonu z powodu krwotoku mózgowego"
        ],
        options: [
          "A) Krwawienia w przebiegu CAA lokalizują się typowo w głębokich strukturach mózgowia, takich jak most i jądra podkorowe",
          "B) CAA występuje typowo u pacjentów w podeszłym wieku (>70 lat) i wiąże się z odkładaniem amyloidu beta w ścianach naczyń korowych",
          "C) Charakterystyczną cechą CAA są nawrotowe krwawienia płatowe (korowo-podkorowe)",
          "D) W badaniu MRI w sekwencjach T2* lub SWI widoczne są liczne korowe mikrowylewy krwawe (cerebral microbleeds)",
          "E) U pacjentów z CAA i migotaniem przedsionków stosowanie antykoagulacji wiąże się ze skrajnie wysokim ryzykiem zgonu z powodu krwotoku mózgowego"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Zdanie A jest fałszywe. Krwawienia w przebiegu mózgowej angiopatii amyloidowej (CAA) lokalizują się POWIERZCHOWNIE w płatach mózgu (krwawienia płatowe: potyliczne, ciemieniowe, czołowe). Lokalizacja głęboka (jądra podkorowe, torebka wewnętrzna, pień mózgu) jest domeną angiopatii nadciśnieniowej.",
        expl: "Prawidłowo! Zdanie A jest fałszywe. Krwawienia w przebiegu mózgowej angiopatii amyloidowej (CAA) lokalizują się POWIERZCHOWNIE w płatach mózgu (krwawienia płatowe: potyliczne, ciemieniowe, czołowe). Lokalizacja głęboka (jądra podkorowe, torebka wewnętrzna, pień mózgu) jest domeną angiopatii nadciśnieniowej.",
        explanation: "Prawidłowo! Zdanie A jest fałszywe. Krwawienia w przebiegu mózgowej angiopatii amyloidowej (CAA) lokalizują się POWIERZCHOWNIE w płatach mózgu (krwawienia płatowe: potyliczne, ciemieniowe, czołowe). Lokalizacja głęboka (jądra podkorowe, torebka wewnętrzna, pień mózgu) jest domeną angiopatii nadciśnieniowej."
      },
      {
        q: "U nieprzytomnego pacjenta z masywnym krwotokiem śródmózgowym i wklinowaniem mózgu rodzina żąda zaprzestania terapii twierdząc, że 'pacjent nie chciałby tak wegetować', lecz brak jest jakiegokolwiek dokumentu oświadczenia woli. Zgodnie z polskim prawem:",
        question: "U nieprzytomnego pacjenta z masywnym krwotokiem śródmózgowym i wklinowaniem mózgu rodzina żąda zaprzestania terapii twierdząc, że 'pacjent nie chciałby tak wegetować', lecz brak jest jakiegokolwiek dokumentu oświadczenia woli. Zgodnie z polskim prawem:",
        opts: [
          "A) Decyzję o ograniczeniu terapii daremnej podejmuje konsylium lekarskie na podstawie oceny medycznej braku szans na przeżycie, kierując się aktualną wiedzą medyczną",
          "B) Rodzina pacjenta ma wyłączne prawo zarządzić natychmiastowe odłączenie respiratora wbrew opinii lekarzy",
          "C) Lekarz musi bezwzględnie kontynuować resuscytację krążeniowo-oddechową bez limitu czasu, nawet po stwierdzeniu zgonu",
          "D) Sprawa wymaga skierowania do Europejskiego Trybunału Praw Człowieka w Strasburgu w trybie 24-godzinnym",
          "E) Oświadczenie ustne sąsiada pacjenta ma wyższą moc prawną niż orzeczenie komisji lekarskiej"
        ],
        options: [
          "A) Decyzję o ograniczeniu terapii daremnej podejmuje konsylium lekarskie na podstawie oceny medycznej braku szans na przeżycie, kierując się aktualną wiedzą medyczną",
          "B) Rodzina pacjenta ma wyłączne prawo zarządzić natychmiastowe odłączenie respiratora wbrew opinii lekarzy",
          "C) Lekarz musi bezwzględnie kontynuować resuscytację krążeniowo-oddechową bez limitu czasu, nawet po stwierdzeniu zgonu",
          "D) Sprawa wymaga skierowania do Europejskiego Trybunału Praw Człowieka w Strasburgu w trybie 24-godzinnym",
          "E) Oświadczenie ustne sąsiada pacjenta ma wyższą moc prawną niż orzeczenie komisji lekarskiej"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! W polskim prawie rodzina dorosłego pacjenta nie jest jego przedstawicielem ustawowym i nie ma prawa decydować o zaprzestaniu leczenia. Jeżeli leczenie staje się terapią daremną (uporczywą), decyzję o odstąpieniu od czynności podtrzymujących funkcje narządowe podejmuje konsylium lekarskie zgodnie z wytycznymi medycznymi i Kodeksem Etyki Lekarskiej.",
        expl: "Prawidłowo! W polskim prawie rodzina dorosłego pacjenta nie jest jego przedstawicielem ustawowym i nie ma prawa decydować o zaprzestaniu leczenia. Jeżeli leczenie staje się terapią daremną (uporczywą), decyzję o odstąpieniu od czynności podtrzymujących funkcje narządowe podejmuje konsylium lekarskie zgodnie z wytycznymi medycznymi i Kodeksem Etyki Lekarskiej.",
        explanation: "Prawidłowo! W polskim prawie rodzina dorosłego pacjenta nie jest jego przedstawicielem ustawowym i nie ma prawa decydować o zaprzestaniu leczenia. Jeżeli leczenie staje się terapią daremną (uporczywą), decyzję o odstąpieniu od czynności podtrzymujących funkcje narządowe podejmuje konsylium lekarskie zgodnie z wytycznymi medycznymi i Kodeksem Etyki Lekarskiej."
      },
      {
        q: "Co oznacza obecność objawu plamy ('spot sign') w wielofazowym badaniu Angio-TK głowy u chorego z ostrym krwotokiem śródmózgowym?",
        question: "Co oznacza obecność objawu plamy ('spot sign') w wielofazowym badaniu Angio-TK głowy u chorego z ostrym krwotokiem śródmózgowym?",
        opts: [
          "A) Aktywne wynaczynianie się środka kontrastowego wewnątrz krwiaka, oznaczające wysokie ryzyko dalszej ekspansji krwiaka i zgonu",
          "B) Całkowite zamknięcie tętnicy szyjnej wewnętrznej z następową rekanalizacją",
          "C) Prawidłowe zrównoważenie odpływu krwi żylnej z zatoki esowatej",
          "D) Obecność zwapniałych blaszek miażdżycowych w ścianie tętnicy podstawnej",
          "E) Samoistne wchłonięcie krwiaka w ciągu pierwszych 30 minut od incydentu"
        ],
        options: [
          "A) Aktywne wynaczynianie się środka kontrastowego wewnątrz krwiaka, oznaczające wysokie ryzyko dalszej ekspansji krwiaka i zgonu",
          "B) Całkowite zamknięcie tętnicy szyjnej wewnętrznej z następową rekanalizacją",
          "C) Prawidłowe zrównoważenie odpływu krwi żylnej z zatoki esowatej",
          "D) Obecność zwapniałych blaszek miażdżycowych w ścianie tętnicy podstawnej",
          "E) Samoistne wchłonięcie krwiaka w ciągu pierwszych 30 minut od incydentu"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! 'Spot sign' to ognisko wynaczynienia kontrastu (ang. contrast extravasation) wewnątrz masy krwiaka widoczne w badaniu Angio-TK (CTA). Wskazuje na trwające, aktywne krwawienie tętnicze i jest najsilniejszym radiologicznym predyktorem powiększania się krwiaka (hematoma expansion) oraz wczesnej śmiertelności.",
        expl: "Prawidłowo! 'Spot sign' to ognisko wynaczynienia kontrastu (ang. contrast extravasation) wewnątrz masy krwiaka widoczne w badaniu Angio-TK (CTA). Wskazuje na trwające, aktywne krwawienie tętnicze i jest najsilniejszym radiologicznym predyktorem powiększania się krwiaka (hematoma expansion) oraz wczesnej śmiertelności.",
        explanation: "Prawidłowo! 'Spot sign' to ognisko wynaczynienia kontrastu (ang. contrast extravasation) wewnątrz masy krwiaka widoczne w badaniu Angio-TK (CTA). Wskazuje na trwające, aktywne krwawienie tętnicze i jest najsilniejszym radiologicznym predyktorem powiększania się krwiaka (hematoma expansion) oraz wczesnej śmiertelności."
      },
      {
        q: "Który lek hipotensyjny jest PREFEROWANY w leczeniu ostrych przełomów nadciśnieniowych w udarze krwotocznym ze względu na szybki początek działania, krótki czas półtrwania i brak wpływu na wzrost ciśnienia śródczaszkowego?",
        question: "Który lek hipotensyjny jest PREFEROWANY w leczeniu ostrych przełomów nadciśnieniowych w udarze krwotocznym ze względu na szybki początek działania, krótki czas półtrwania i brak wpływu na wzrost ciśnienia śródczaszkowego?",
        opts: [
          "A) Urapidyl i.v. lub labetalol i.v.",
          "B) Nitroprusydek sodu w szybkim bolusie",
          "C) Nitroogliceryna we wlewie ciągłym o wysokim stężeniu",
          "D) Hydralazyna w wysokich dawkach domięśniowych",
          "E) Rezerpina podawana doustnie"
        ],
        options: [
          "A) Urapidyl i.v. lub labetalol i.v.",
          "B) Nitroprusydek sodu w szybkim bolusie",
          "C) Nitroogliceryna we wlewie ciągłym o wysokim stężeniu",
          "D) Hydralazyna w wysokich dawkach domięśniowych",
          "E) Rezerpina podawana doustnie"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Labetalol (bloker receptorów alfa-1 i beta) oraz urapidyl (antagonista receptorów alfa-1 i agonista 5-HT1A) są lekami pierwszego wyboru w obniżaniu ciśnienia w ostrym ICH. W przeciwieństwie do nitroprusydku i nitrogliceryny nie wywołują one rozszerzenia naczyń żylnych mózgu ani groźnego wzrostu ciśnienia śródczaszkowego (ICP).",
        expl: "Prawidłowo! Labetalol (bloker receptorów alfa-1 i beta) oraz urapidyl (antagonista receptorów alfa-1 i agonista 5-HT1A) są lekami pierwszego wyboru w obniżaniu ciśnienia w ostrym ICH. W przeciwieństwie do nitroprusydku i nitrogliceryny nie wywołują one rozszerzenia naczyń żylnych mózgu ani groźnego wzrostu ciśnienia śródczaszkowego (ICP).",
        explanation: "Prawidłowo! Labetalol (bloker receptorów alfa-1 i beta) oraz urapidyl (antagonista receptorów alfa-1 i agonista 5-HT1A) są lekami pierwszego wyboru w obniżaniu ciśnienia w ostrym ICH. W przeciwieństwie do nitroprusydku i nitrogliceryny nie wywołują one rozszerzenia naczyń żylnych mózgu ani groźnego wzrostu ciśnienia śródczaszkowego (ICP)."
      },
      {
        q: "Co ocenia skala ICH Score (Hemphill et al.) stosowana powszechnie na oddziałach neurologicznych?",
        question: "Co ocenia skala ICH Score (Hemphill et al.) stosowana powszechnie na oddziałach neurologicznych?",
        opts: [
          "A) 30-dniową śmiertelność pacjenta z krwotokiem śródmózgowym na podstawie parametrów klinicznych i radiologicznych",
          "B) Ryzyko wystąpienia zawału serca w ciągu najbliższych 10 lat",
          "C) Stopień uszkodzenia wątroby w skali punktowej Childa-Pugha",
          "D) Czułość bakterii na antybiotyki aminoglikozydowe",
          "E) Odsetek zniszczenia komórek beta trzustki"
        ],
        options: [
          "A) 30-dniową śmiertelność pacjenta z krwotokiem śródmózgowym na podstawie parametrów klinicznych i radiologicznych",
          "B) Ryzyko wystąpienia zawału serca w ciągu najbliższych 10 lat",
          "C) Stopień uszkodzenia wątroby w skali punktowej Childa-Pugha",
          "D) Czułość bakterii na antybiotyki aminoglikozydowe",
          "E) Odsetek zniszczenia komórek beta trzustki"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Skala ICH Score (0–6 punktów) ocenia 30-dniową śmiertelność w krwotoku śródmózgowym. Uwzględnia: punktację GCS (3–4 = 2 pkt, 5–12 = 1 pkt), objętość krwiaka (≥30 ml = 1 pkt), obecność krwi w komorach IVH (1 pkt), lokalizację podnamiotową (1 pkt) oraz wiek ≥80 lat (1 pkt). Wynik 0 pkt oznacza śmiertelność ok. 0%, a wynik 5–6 pkt blisko 100%.",
        expl: "Prawidłowo! Skala ICH Score (0–6 punktów) ocenia 30-dniową śmiertelność w krwotoku śródmózgowym. Uwzględnia: punktację GCS (3–4 = 2 pkt, 5–12 = 1 pkt), objętość krwiaka (≥30 ml = 1 pkt), obecność krwi w komorach IVH (1 pkt), lokalizację podnamiotową (1 pkt) oraz wiek ≥80 lat (1 pkt). Wynik 0 pkt oznacza śmiertelność ok. 0%, a wynik 5–6 pkt blisko 100%.",
        explanation: "Prawidłowo! Skala ICH Score (0–6 punktów) ocenia 30-dniową śmiertelność w krwotoku śródmózgowym. Uwzględnia: punktację GCS (3–4 = 2 pkt, 5–12 = 1 pkt), objętość krwiaka (≥30 ml = 1 pkt), obecność krwi w komorach IVH (1 pkt), lokalizację podnamiotową (1 pkt) oraz wiek ≥80 lat (1 pkt). Wynik 0 pkt oznacza śmiertelność ok. 0%, a wynik 5–6 pkt blisko 100%."
      },
      {
        q: "W jaki sposób wylicza się w przybliżeniu objętość krwiaka śródmózgowego w tomografii komputerowej przy użyciu prostej metody ABC/2?",
        question: "W jaki sposób wylicza się w przybliżeniu objętość krwiaka śródmózgowego w tomografii komputerowej przy użyciu prostej metody ABC/2?",
        opts: [
          "A) Iloczyn największego wymiaru krwiaka (A), wymiaru prostopadłego (B) i grubości w osi pionowej (C) podzielony przez 2",
          "B) Dodanie do siebie trzech wymiarów i pomnożenie przez współczynnik gęstości radiologicznej",
          "C) Zmierzenie obwodu głowy pacjenta i podzielenie przez wiek w latach",
          "D) Odjęcie stężenia hemoglobiny od wartości ciśnienia skurczowego",
          "E) Podzielenie powierzchni przekroju komory czwartej przez liczbę leukocytów"
        ],
        options: [
          "A) Iloczyn największego wymiaru krwiaka (A), wymiaru prostopadłego (B) i grubości w osi pionowej (C) podzielony przez 2",
          "B) Dodanie do siebie trzech wymiarów i pomnożenie przez współczynnik gęstości radiologicznej",
          "C) Zmierzenie obwodu głowy pacjenta i podzielenie przez wiek w latach",
          "D) Odjęcie stężenia hemoglobiny od wartości ciśnienia skurczowego",
          "E) Podzielenie powierzchni przekroju komory czwartej przez liczbę leukocytów"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Formuła Kwaskiewicza (ABC/2) traktuje krwiak jako elipsoidę: A to największa średnica krwiaka w osi TK, B to średnica prostopadła do A w tej samej warstwie, a C to pionowa wysokość krwiaka (liczba warstw pomnożona przez ich grubość). Wzór (A × B × C) / 2 daje szybkie i dokładne oszacowanie objętości krwiaka w ml (cm³).",
        expl: "Prawidłowo! Formuła Kwaskiewicza (ABC/2) traktuje krwiak jako elipsoidę: A to największa średnica krwiaka w osi TK, B to średnica prostopadła do A w tej samej warstwie, a C to pionowa wysokość krwiaka (liczba warstw pomnożona przez ich grubość). Wzór (A × B × C) / 2 daje szybkie i dokładne oszacowanie objętości krwiaka w ml (cm³).",
        explanation: "Prawidłowo! Formuła Kwaskiewicza (ABC/2) traktuje krwiak jako elipsoidę: A to największa średnica krwiaka w osi TK, B to średnica prostopadła do A w tej samej warstwie, a C to pionowa wysokość krwiaka (liczba warstw pomnożona przez ich grubość). Wzór (A × B × C) / 2 daje szybkie i dokładne oszacowanie objętości krwiaka w ml (cm³)."
      },
      {
        q: "Kiedy najwcześniej po przebytym krwotoku śródmózgowym można bezpiecznie rozważyć wznowienie profilaktyki przeciwkrzepliwej u chorego z migotaniem przedsionków i wysokim ryzykiem zatorowym (CHA2DS2-VASc ≥4)?",
        question: "Kiedy najwcześniej po przebytym krwotoku śródmózgowym można bezpiecznie rozważyć wznowienie profilaktyki przeciwkrzepliwej u chorego z migotaniem przedsionków i wysokim ryzykiem zatorowym (CHA2DS2-VASc ≥4)?",
        opts: [
          "A) Zazwyczaj po 4–8 tygodniach od incydentu po udokumentowaniu pełnej stabilizacji i resorpcji krwiaka oraz wykluczeniu CAA",
          "B) W ciągu pierwszych 15 minut od przyjęcia na oddział ratunkowy",
          "C) Dokładnie w 2. dobie po zabiegu kraniektomii",
          "D) Nigdy w życiu pacjenta, niezależnie od ryzyka zatorowości obwodowej",
          "E) Dopiero po ukończeniu przez chorego 95. roku życia"
        ],
        options: [
          "A) Zazwyczaj po 4–8 tygodniach od incydentu po udokumentowaniu pełnej stabilizacji i resorpcji krwiaka oraz wykluczeniu CAA",
          "B) W ciągu pierwszych 15 minut od przyjęcia na oddział ratunkowy",
          "C) Dokładnie w 2. dobie po zabiegu kraniektomii",
          "D) Nigdy w życiu pacjenta, niezależnie od ryzyka zatorowości obwodowej",
          "E) Dopiero po ukończeniu przez chorego 95. roku życia"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Zgodnie z wytycznymi ESO i ESC, wznowienie antykoagulacji u chorych z AF po przebytym ICH (niezwiązanym z angiopatią amyloidową) rozważa się najwcześniej po 4–8 tygodniach od krwawienia przy ścisłej kontroli ciśnienia tętniczego. Alternatywą o wysokim profilu bezpieczeństwa jest przezskórne zamknięcie uszka lewego przedsionka (LAAO).",
        expl: "Prawidłowo! Zgodnie z wytycznymi ESO i ESC, wznowienie antykoagulacji u chorych z AF po przebytym ICH (niezwiązanym z angiopatią amyloidową) rozważa się najwcześniej po 4–8 tygodniach od krwawienia przy ścisłej kontroli ciśnienia tętniczego. Alternatywą o wysokim profilu bezpieczeństwa jest przezskórne zamknięcie uszka lewego przedsionka (LAAO).",
        explanation: "Prawidłowo! Zgodnie z wytycznymi ESO i ESC, wznowienie antykoagulacji u chorych z AF po przebytym ICH (niezwiązanym z angiopatią amyloidową) rozważa się najwcześniej po 4–8 tygodniach od krwawienia przy ścisłej kontroli ciśnienia tętniczego. Alternatywą o wysokim profilu bezpieczeństwa jest przezskórne zamknięcie uszka lewego przedsionka (LAAO)."
      }
    ],
    flashcards: [
      { q: "Jaka jest najczęstsza przyczyna pierwotnego krwotoku śródmózgowego (ICH)?", a: "Przewlekłe nadciśnienie tętnicze prowadzące do lipohialinozy tętnic przeszywających (jądra podstawy, torebka wewnętrzna)." },
      { q: "Do jakiej wartości docelowej należy obniżyć SBP w ostrej fazie ICH?", a: "Do 130–140 mmHg w ciągu pierwszych godzin (unikać spadków <130 mmHg)." },
      { q: "Dlaczego glikokortykosteroidy są zakazane w udarze krwotocznym mózgu?", a: "Nie zmniejszają obrzęku mózgu, a istotnie zwiększają śmiertelność (infekcje, hiperglikemia, krwawienia z przewodu pokarmowego)." },
      { q: "Jaki jest bezwzględny stan wymagający pilnej operacji neurochirurgicznej w ICH?", a: "Krwiak móżdżku o średnicy >3 cm uciskający pień mózgu lub wywołujący ostre wodogłowie." },
      { q: "Czym jest objaw plamy ('spot sign') w Angio-TK?", a: "Ogniskiem wynaczynienia kontrastu wewnątrz krwiaka, świadczącym o aktywnym krwawieniu i wysokim ryzyku ekspansji krwiaka." },
      { q: "Co jest swoistym antidotum dla dabigatranu w razie krwotoku mózgowego?", a: "Idarucizumab (5 g i.v. w dwóch dawkach po 2,5 g)." }
    ]
  },

  // =========================================================================
  // CASE 160: Przemijający Napad Niedokrwienny Mózgu (TIA)
  // =========================================================================
  {
    id: 160,
    file: "160_przemijajacy_napad_tia.json",
    shortTitle: "Przemijający Napad Niedokrwienny (TIA)",
    title: "Przemijający Napad Niedokrwienny Mózgu (TIA) z Wysokim Ryzykiem Udarowym w Skali ABCD2",
    dept: "Neurologia",
    diagnosisTitle: "Przemijający Napad Niedokrwienny w dorzeczu Lewej Tętnicy Środkowej Mózgu (TIA, ABCD2 = 6 punktów)",
    vitals: [
      { label: "Ciśnienie tętnicze (RR)", val: "165/95", unit: "mmHg", status: "vital-warn" },
      { label: "Częstość akcji serca (HR)", val: "78", unit: "/min", status: "vital-ok" },
      { label: "Częstość oddechów (RR)", val: "15", unit: "/min", status: "vital-ok" },
      { label: "Saturacja (SpO2)", val: "98", unit: "%", status: "vital-ok" },
      { label: "Temperatura ciała", val: "36.6", unit: "°C", status: "vital-ok" }
    ],
    story: "<p><strong>Pacjent:</strong> 67-letni mężczyzna przywieziony na SOR przez zespół ratownictwa medycznego z powodu nagłego, przejściowego epizodu osłabienia kończyn i zaburzeń mowy.</p><p><strong>Wywiad chorobowy:</strong> 90 minut temu podczas rozmowy telefonicznej pacjent nagle zaczął bełkotać, nie mógł dobrać słów, a telefon wypadł mu z bezwładnej prawej ręki. Wystąpiło również opadnięcie prawego kącika ust i osłabienie prawej nogi. Objawy ustąpiły całkowicie samoistnie po 35 minutach od wystąpienia, jeszcze przed przybyciem ZRM do domu chorego. W wywiadzie: cukrzyca typu 2, hipercholesterolemia, nikotynizm (30 paczkolat). Nigdy wcześniej nie miał takich objawów.</p><p><strong>Badanie przedmiotowe:</strong> Pacjent w chwili badania na SOR czuje się całkowicie dobrze, w pełnym kontakcie logicznym. W badaniu neurologicznym brak ubytków neurologicznych (mowa prawidłowa, siła mięśniowa symetryczna 5/5, nerwy czaszkowe bez asymetrii, NIHSS = 0). Nad lewą tętnicą szyjną słyszalny cichy szmer skurczowy. Ciśnienie tętnicze 165/95 mmHg, akcja serca miarowa 78/min.</p>",
    steps: [
      {
        title: "Krok 1: Stratyfikacja ryzyka wczesnego udaru w skali ABCD2 i decyzja o hospitalizacji",
        scenario: "Mimo całkowitego ustąpienia objawów neurologicznych (NIHSS = 0), pacjent wymaga natychmiastowej oceny ryzyka wystąpienia dokonanego udaru mózgu w ciągu najbliższych 48 godzin. Ile punktów uzyskuje pacjent w skali ABCD2 i jakie jest postępowanie organizacyjne?",
        options: [
          {
            text: "6 punktów (Wiek ≥60: 1 pkt, Ciśnienie ≥140/90: 1 pkt, Niedowład jednostronny: 2 pkt, Czas trwania 10–59 min: 1 pkt, Cukrzyca: 1 pkt) – kategoria wysokiego ryzyka (>8% ryzyko udaru w 48h), wskazanie do natychmiastowej hospitalizacji",
            correct: true,
            isCorrect: true,
            feedback: "✅ PRAWIDŁOWO! Skala ABCD2: Age (≥60 = 1 pkt), Blood pressure (≥140/90 = 1 pkt), Clinical features (niedowład jednostronny = 2 pkt, same zaburzenia mowy = 1 pkt), Duration (≥60 min = 2 pkt, 10–59 min = 1 pkt), Diabetes (1 pkt). Pacjent otrzymuje 6 punktów (grupa wysokiego ryzyka), co oznacza konieczność natychmiastowej hospitalizacji na Oddziale Udarowym."
          },
          {
            text: "1 punkt – kategoria znikomego ryzyka, pacjenta należy wypisać do domu z zaleceniem picia melisy",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Niedowład połowiczy sam w sobie daje 2 punkty; błąd w kalkulacji naraża chorego na dokonany udar inwalidyzujący."
          },
          {
            text: "0 punktów, ponieważ w chwili badania na SOR pacjent nie ma żadnych objawów neurologicznych",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Skala ABCD2 ocenia objawy w trakcie epizodu, a nie stan po jego ustąpieniu."
          },
          {
            text: "4 punkty – pacjent może być diagnozowany ambulatoryjnie w ciągu najbliższych 3 miesięcy",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Wynik wynosi 6 punktów, a ryzyko wczesnego udaru jest najwyższe w pierwszych 24–48 godzinach."
          }
        ]
      },
      {
        title: "Krok 2: Nowoczesna diagnostyka neuroobrazowa (definicja tkankowa TIA)",
        scenario: "Współczesna definicja TIA opiera się na kryterium tkankowym (brak ostrego ogniska martwicy mózgowia), a nie wyłącznie czasowym (<24h). Jaka metoda neuroobrazowania cechuje się najwyższą czułością w wykrywaniu świeżego niedokrwienia u chorych z klinicznym TIA?",
        options: [
          {
            text: "Rezonans magnetyczny (MRI) mózgowia z sekwencją dyfuzji (DWI – Diffusion-Weighted Imaging)",
            correct: true,
            isCorrect: true,
            feedback: "✅ PRAWIDŁOWO! Rezonans magnetyczny w sekwencji DWI jest złotym standardem detekcji ostrego niedokrwienia mózgu (wykrywa restrykcję dyfuzji cząsteczek wody w obrzęku cytotoksycznym już w pierwszych minutach). U około 30–40% chorych z klinicznym ustąpieniem objawów TIA w badaniu DWI stwierdza się obecność małego dokonanego ogniska zawałowego mózgu (udar mózgu z pełnym wycofaniem objawów klinicznych)."
          },
          {
            text: "Przeglądowe zdjęcie RTG czaszki w projekcji osiowej i skośnej",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! RTG czaszki nie uwidacznia tkanki mózgowej ani ognisk niedokrwienia."
          },
          {
            text: "Elektromiografia (EMG) mięśni przedramienia i kłębu kciuka",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! EMG bada obwodowy układ nerwowy i mięśnie, a nie ośrodkowe ogniska naczyniowe."
          },
          {
            text: "Pozytonowa tomografia emisyjna (PET) całego ciała z fluorodeoksyglukozą",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! PET jest badaniem onkologicznym niemającym zastosowania w diagnostyce ostrej TIA."
          }
        ]
      },
      {
        title: "Krok 3: Pilna diagnostyka etiologiczna (naczynia szyjne i serce)",
        scenario: "W badaniu fizykalnym wysłuchano szmer nad lewą tętnicą szyjną. W pilnym badaniu USG Doppler tętnic domózgowych stwierdzono zwężenie lewej tętnicy szyjnej wewnętrznej (ICA) rzędu 75% z obecnością nieregularnej, owrzodziałej blaszki miażdżycowej. Jaka jest kwalifikacja zabiegowa i okno czasowe wg wytycznych ESVS/ESO?",
        options: [
          {
            text: "Pilna endarterektomia szyjna (CEA) lub stentowanie (CAS) wykonane w ciągu pierwszych 14 dni (optymalnie w ciągu pierwszych 48–72 godzin) od wystąpienia TIA",
            correct: true,
            isCorrect: true,
            feedback: "✅ PRAWIDŁOWO! Objawowe zwężenie tętnicy szyjnej wewnętrznej 70–99% po TIA wiąże się ze skrajnie wysokim ryzykiem udaru dokonanego. Zabieg rewaskularyzacyjny (endarterektomia tętnicy szyjnej – CEA jako złoty standard) wykonany pilnie w ciągu 48h–14 dni redukuje ryzyko udaru o ponad 70%."
          },
          {
            text: "Odrocznie operacji naczyniowej o 12 miesięcy w celu oceny stabilności blaszki miażdżycowej",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Odroczenie zabiegu doprowadzi do dokonanego udaru inwalidyzującego w ciągu kilku dni."
          },
          {
            text: "Wykonanie natychmiastowej amputacji lewego płata tarczycy w celu dekompresji naczynia",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Tyreoidectomia nie ma żadnego związku ze zwężeniem miażdżycowym światła tętnicy szyjnej."
          },
          {
            text: "Podanie dożylnego wlewu z witaminy B12 w celu rozpuszczenia blaszek miażdżycowych",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Witaminy nie rozpuszczają blaszek miażdżycowych."
          }
        ]
      },
      {
        title: "Krok 4: Wtórna prewencja farmakologiczna wg najnowszych wytycznych",
        scenario: "Pacjent ma TIA wysokiego ryzyka (ABCD2 = 6) na podłożu miażdżycowym. Nie ma migotania przedsionków w monitorowaniu EKG. Jakie nowoczesne leczenie przeciwpłytkowe i hipolipemizujące należy wdrożyć natychmiast wg wytycznych ESO (badania CHANCE i POINT)?",
        options: [
          {
            text: "Podwójna terapia przeciwpłytkowa (DAPT): kwas acetylosalicylowy (ASA 100 mg) + klopidogrel (300 mg dawka nasycająca, potem 75 mg/d) przez 21 dni, a następnie monoterapia, wraz z intensywną statynoterapią (atorwastatyna 80 mg)",
            correct: true,
            isCorrect: true,
            feedback: "✅ PRAWIDŁOWO! Badania CHANCE i POINT oraz wytyczne ESO jednoznacznie zalecają krótkoterminową podwójną terapię przeciwpłytkową (DAPT: ASA + klopidogrel) rozpoczętą w ciągu pierwszych 24 godzin i kontynuowaną przez 21 dni u pacjentów z TIA wysokiego ryzyka (ABCD2 ≥4) lub łagodnym udarem (NIHSS ≤3). Po 21 dniach przechodzi się na monoterapię, co minimalizuje ryzyko powikłań krwotocznych. Wysokodawkowa statyna stabilizuje blaszkę miażdżycową."
          },
          {
            text: "Przewlekła doustna antykoagulacja riwaroksabanem w pełnej dawce 20 mg na dobę bez leków przeciwpłytkowych",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Antykoagulacja jest wskazana w udarze zatorowym sercowopochodnym (np. w AF), a nie w miażdżycy tętnic szyjnych."
          },
          {
            text: "Zalecenie picia zielonej herbaty i odstawienie wszystkich leków kardiologicznych",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Brak farmakoterapii przeciwpłytkowej skutkuje wczesnym udarem niedokrwiennym mózgu."
          },
          {
            text: "Stosowanie trójlekowego schematu przeciwkrzepliwego (ASA + klopidogrel + warfaryna) przez 10 lat",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Terapia potrójna wiąże się z katastrofalnym ryzykiem śmiertelnych krwawień śródczaszkowych i układowych."
          }
        ]
      }
    ],
    pathoNodes: [
      {
        title: "Embolizacja atero-emboliczna lub hipoperfuzja hemodynamiczna",
        desc: "Pęknięcie niestabilnej blaszki miażdżycowej w tętnicy szyjnej lub łuku aorty uwalnia mikrozatory płytkowo-włóknikowe.",
        detail: "Zatory zamykają dystalne gałęzie tętnicy środkowej mózgu (MCA), powodując przejściowe niedokrwienie obszaru kory i torebki wewnętrznej odpowiedzialnego za mowę i funkcje ruchowe.",
        target: "Punkt uchwytu diagnostyki i leczenia: USG Doppler tętnic szyjnych, angio-TK i pilna endarterektomia (CEA) lub stentowanie (CAS)."
      },
      {
        title: "Samoistna rekanalizacja i ratowanie penumbry ischemicznej",
        desc: "Endogenny układ fibrynolizy rozpuszcza mikrozakrzep przed wystąpieniem nieodwracalnej martwicy neuronów.",
        detail: "Reperfuzja ogniska półcienia (penumbra) w ciągu kilkunastu-kilkudziesięciu minut przywraca metabolizm komórkowy i ustąpienie objawów ubytkowych bez trwałego uszkodzenia tkanki w konwencjonalnej TK.",
        target: "Punkt uchwytu diagnostyki: MRI DWI – wykrywa 'nieme' mikrozawały u ok. 30% pacjentów z klinicznym TIA."
      },
      {
        title: "Niestabilność blaszki i wysokie wczesne ryzyko udaru dokonanego",
        desc: "Odsłonięty rdzeń lipidowy pękniętej blaszki sprzyja nawrotowemu tworzeniu zakrzepów przyściennych.",
        detail: "Ryzyko wystąpienia pełnościennego, inwalidyzującego udaru niedokrwiennego mózgu jest najwyższe w pierwszych 48 godzinach po TIA (sięga 8–12% u chorych z ABCD2 ≥4).",
        target: "Punkt uchwytu leczenia: Podwójna terapia przeciwpłytkowa (DAPT: ASA + klopidogrel przez 21 dni) oraz wysoka dawka statyny (atorwastatyna 80 mg)."
      }
    ],
    dutySummary: {
      overview: "Przemijający napad niedokrwienny mózgu (TIA) to przemijający epizod dysfunkcji neurologicznej spowodowany ogniskowym niedokrwieniem mózgu, rdzenia kręgowego lub siatkówki, bez obecności ostrego ogniska zawałowego w neuroobrazowaniu (definicja tkankowa). TIA jest stanem bezpośredniego zagrożenia udarem mózgu i wymaga pilnej hospitalizacji i diagnostyki.",
      diagnostics: "1. Stratyfikacja ryzyka w skali ABCD2 (Age, BP, Clinical, Duration, Diabetes) – wynik ≥4 pkt kwalifikuje do grupy wysokiego ryzyka wymagającej natychmiastowej hospitalizacji udarowej.\n\n2. Neuroobrazowanie z wyboru: Rezonans magnetyczny (MRI) z sekwencją DWI (lub TK głowy wykluczające krwawienie i inne patologie).\n\n3. Diagnostyka naczyniowa pilna: USG Doppler tętnic szyjnych i kręgowych lub Angio-TK/Angio-MRI w poszukiwaniu zwężeń tętnic domózgowych.\n\n4. Diagnostyka kardiologiczna: EKG, telemetria/Holter EKG (wykluczenie napadowego AF), echokardiografia przezklatkowa (TTE) lub przezprzełykowa (TEE).\n\n5. Badania laboratoryjne: profil lipidowy, glikemia, HbA1c, elektrolity, układ krzepnięcia.",
      drugsAndDoses: "• Pacjenci wysokiego ryzyka (ABCD2 ≥4) lub z łagodnym udarem: <span class=\"dose-pill\">DAPT: Kwas acetylosalicylowy (ASA) 100 mg/d + Klopidogrel 300 mg nasycająca, potem 75 mg/d</span> przez pierwsze 21 dni, następnie monoterapia.\n• Alternatywnie u pacjentów ze zwężeniem tętnic: ASA + Tikagrelor (badanie THALES).\n• Intensywna terapia hipolipemizująca: <span class=\"dose-pill\">Atorwastatyna: 80 mg doustnie raz na dobę</span> (cel LDL <55 mg/dl i redukcja o ≥50%).\n• W razie wykrycia migotania przedsionków: wdrożenie doustnego antykoagulantu (NOAC: apiksaban, riwaroksaban, dabigatran) zamiast leków p-płytkowych.\n• Kontrola ciśnienia tętniczego: inhibitory ACE (np. peryndopryl) i diuretyk tiazydopodobny (indapamid).",
      procedures: "Pilna endarterektomia szyjna (CEA) u pacjentów z objawowym zwężeniem ICA 70–99% wykonana w ciągu 48h–14 dni od wystąpienia TIA; rzucenie palenia tytoniu, redukcja masy ciała, modyfikacja stylu życia.",
      monitoring: "Ciągłe monitorowanie rytmu serca (telemetria min. 24–48h na oddziale udarowym), kontrola ciśnienia tętniczego i glikemii, edukacja pacjenta w zakresie objawów udaru FAST (Face, Arm, Speech, Time)."
    },
    diffTable: {
      title: "⚔️ Tabela Różnicowa: Przemijający Napad Niedokrwienny (TIA) vs Aura Migrenowa vs Napad Padaczkowy z Porażeniem Todda vs Hipoglikemia vs Przejściowa Amnezja Ogólna (TGA)",
      headers: ["Cecha kliniczna", "TIA", "Aura Migrenowa", "Porażenie Todda (Padaczka)", "Hipoglikemia", "Przejściowa Amnezja (TGA)"],
      rows: [
        ["Typ objawów", "Ubytkowe (niedowład, utrata mowy, czucia)", "Pozytywne/drażnieniowe (błyski, zygzaki, parestezje)", "Ruchowe drgawki, po których następuje wiotki niedowład", "Uogólnione (poty, drżenie, splątanie, ogniskowe)", "Czysta utrata pamięci świeżej, powtarzanie pytań"],
        ["Dynamika początku", "Nagły, natychmiastowy (w sekundy)", "Stopniowe narastanie i 'marsz' objawów (>5–20 min)", "Początek napadowy z utratą przytomności/drgawkami", "Narasta w ciągu kilkunastu minut/godzin", "Nagła dezorientacja pamięciowa"],
        ["Czas trwania", "Zazwyczaj krótki: 10–60 minut (maks. 24h)", "20–60 minut, po czym występuje ból głowy", "Niedowład ustępuje w ciągu godzin/doby", "Ustępuje natychmiast po podaniu glukozy", "4–12 godzin (całkowity powrót po 24h)"],
        ["Charakterystyczne tło", "Czynniki sercowo-naczyniowe (NT, DM, tytoń)", "Młody wiek, wywiad rodzinny migreny", "Wywiad padaczki, uszkodzenie kory mózgu", "Cukrzyca leczona insuliną lub sulfonylomocznikiem", "Silny stres emocjonalny, zimna kąpiel"],
        ["Obraz w MRI DWI", "Ujemny lub małe ognisko w 30% chorych", "Całkowicie ujemny", "Ujemny (brak cech niedokrwienia)", "Ujemny (chyba że głęboka śpiączka)", "Punktowe ognisko w hipokampie po 24–48h"],
        ["Leczenie pierwszego rzutu", "DAPT (ASA + klopidogrel) + statyna + CEA", "Tryptany, NLPZ, leki profilaktyczne", "Leki przeciwpadaczkowe (lewetyracetam)", "Glukoza dożylnie (20–40% roztwór glukozy)", "Uspokojenie, obserwacja, brak leczenia farmakologicznego"]
      ]
    },
    lekQuestions: [
      {
        q: "Jaka jest współczesna definicja tkankowa przemijającego napadu niedokrwiennego mózgu (TIA) wg wytycznych AHA/ASA i ESO?",
        question: "Jaka jest współczesna definicja tkankowa przemijającego napadu niedokrwiennego mózgu (TIA) wg wytycznych AHA/ASA i ESO?",
        opts: [
          "A) Przemijający epizod dysfunkcji neurologicznej wywołany ogniskowym niedokrwieniem mózgu, rdzenia kręgowego lub siatkówki, bez obecności ostrego ogniska zawałowego w neuroobrazowaniu",
          "B) Jakikolwiek ubytek neurologiczny, który ustępuje w ciągu dokładnie 24 godzin, niezależnie od obecności martwicy w rezonansie",
          "C) Utrata przytomności trwająca dłużej niż 3 dni z następowym powrotem pamięci",
          "D) Izolowane zaburzenie widzenia obuocznego trwające nieprzerwanie przez 14 dni",
          "E) Porażenie nerwu twarzowego ustępujące samoistnie po 6 miesiącach od infekcji"
        ],
        options: [
          "A) Przemijający epizod dysfunkcji neurologicznej wywołany ogniskowym niedokrwieniem mózgu, rdzenia kręgowego lub siatkówki, bez obecności ostrego ogniska zawałowego w neuroobrazowaniu",
          "B) Jakikolwiek ubytek neurologiczny, który ustępuje w ciągu dokładnie 24 godzin, niezależnie od obecności martwicy w rezonansie",
          "C) Utrata przytomności trwająca dłużej niż 3 dni z następowym powrotem pamięci",
          "D) Izolowane zaburzenie widzenia obuocznego trwające nieprzerwanie przez 14 dni",
          "E) Porażenie nerwu twarzowego ustępujące samoistnie po 6 miesiącach od infekcji"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Współczesna definicja TIA odeszła od arbitralnego kryterium czasowego (<24 godzin) na rzecz kryterium tkankowego (tissue-based definition). TIA definiuje się jako przejściowy epizod dysfunkcji neurologicznej spowodowany niedokrwieniem bez obecności świeżego ogniska zawału w badaniach neuroobrazowych (przede wszystkim w MRI DWI). Jeśli w MRI obecne jest ognisko zawałowe, rozpoznaje się udar niedokrwienny mózgu, nawet jeśli objawy ustąpiły w ciągu kilkunastu minut.",
        expl: "Prawidłowo! Współczesna definicja TIA odeszła od arbitralnego kryterium czasowego (<24 godzin) na rzecz kryterium tkankowego (tissue-based definition). TIA definiuje się jako przejściowy epizod dysfunkcji neurologicznej spowodowany niedokrwieniem bez obecności świeżego ogniska zawału w badaniach neuroobrazowych (przede wszystkim w MRI DWI). Jeśli w MRI obecne jest ognisko zawałowe, rozpoznaje się udar niedokrwienny mózgu, nawet jeśli objawy ustąpiły w ciągu kilkunastu minut.",
        explanation: "Prawidłowo! Współczesna definicja TIA odeszła od arbitralnego kryterium czasowego (<24 godzin) na rzecz kryterium tkankowego (tissue-based definition). TIA definiuje się jako przejściowy epizod dysfunkcji neurologicznej spowodowany niedokrwieniem bez obecności świeżego ogniska zawału w badaniach neuroobrazowych (przede wszystkim w MRI DWI). Jeśli w MRI obecne jest ognisko zawałowe, rozpoznaje się udar niedokrwienny mózgu, nawet jeśli objawy ustąpiły w ciągu kilkunastu minut."
      },
      {
        q: "Ile punktów w skali ABCD2 przyznaje się za jednostronny niedowład kończyny (np. osłabienie ręki lub nogi) w trakcie epizodu TIA?",
        question: "Ile punktów w skali ABCD2 przyznaje się za jednostronny niedowład kończyny (np. osłabienie ręki lub nogi) w trakcie epizodu TIA?",
        opts: [
          "A) 2 punkty",
          "B) 1 punkt",
          "C) 0 punktów",
          "D) 3 punkty",
          "E) 4 punkty"
        ],
        options: [
          "A) 2 punkty",
          "B) 1 punkt",
          "C) 0 punktów",
          "D) 3 punkty",
          "E) 4 punkty"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! W skali ABCD2 za cechy kliniczne (Clinical features) przyznaje się: 2 punkty za jednostronny niedowład kończyny (z zaburzeniami mowy lub bez nich) oraz 1 punkt za izolowane zaburzenia mowy bez niedowładu kończyn.",
        expl: "Prawidłowo! W skali ABCD2 za cechy kliniczne (Clinical features) przyznaje się: 2 punkty za jednostronny niedowład kończyny (z zaburzeniami mowy lub bez nich) oraz 1 punkt za izolowane zaburzenia mowy bez niedowładu kończyn.",
        explanation: "Prawidłowo! W skali ABCD2 za cechy kliniczne (Clinical features) przyznaje się: 2 punkty za jednostronny niedowład kończyny (z zaburzeniami mowy lub bez nich) oraz 1 punkt za izolowane zaburzenia mowy bez niedowładu kończyn."
      },
      {
        q: "Jaki jest zalecany czas trwania podwójnej terapii przeciwpłytkowej (DAPT: kwas acetylosalicylowy + klopidogrel) u pacjenta po napadzie TIA wysokiego ryzyka (ABCD2 ≥4) wg wyników badań CHANCE i POINT oraz wytycznych ESO?",
        question: "Jaki jest zalecany czas trwania podwójnej terapii przeciwpłytkowej (DAPT: kwas acetylosalicylowy + klopidogrel) u pacjenta po napadzie TIA wysokiego ryzyka (ABCD2 ≥4) wg wyników badań CHANCE i POINT oraz wytycznych ESO?",
        opts: [
          "A) Przez pierwsze 21 dni od wystąpienia incydentu, po czym przechodzi się na monoterapię",
          "B) Przez dokładnie 12 miesięcy bez przerwy",
          "C) Przez całe życie pacjenta bez możliwości odstawienia",
          "D) Wyłącznie przez pierwsze 24 godziny od przyjęcia na SOR",
          "E) Stosowanie DAPT jest całkowicie przeciwwskazane w TIA"
        ],
        options: [
          "A) Przez pierwsze 21 dni od wystąpienia incydentu, po czym przechodzi się na monoterapię",
          "B) Przez dokładnie 12 miesięcy bez przerwy",
          "C) Przez całe życie pacjenta bez możliwości odstawienia",
          "D) Wyłącznie przez pierwsze 24 godziny od przyjęcia na SOR",
          "E) Stosowanie DAPT jest całkowicie przeciwwskazane w TIA"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Badania CHANCE i POINT jednoznacznie wykazały, że korzyści ze stosowania DAPT (ASA + klopidogrel) w redukcji ryzyka wczesnego udaru kumulują się w ciągu pierwszych 21 dni. Przedłużenie DAPT poza 21 dni (np. do 90 dni) nie zmniejsza już istotnie ryzyka udaru niedokrwiennego, natomiast znacząco zwiększa ryzyko ciężkich krwawień, w tym krwotoków śródczaszkowych.",
        expl: "Prawidłowo! Badania CHANCE i POINT jednoznacznie wykazały, że korzyści ze stosowania DAPT (ASA + klopidogrel) w redukcji ryzyka wczesnego udaru kumulują się w ciągu pierwszych 21 dni. Przedłużenie DAPT poza 21 dni (np. do 90 dni) nie zmniejsza już istotnie ryzyka udaru niedokrwiennego, natomiast znacząco zwiększa ryzyko ciężkich krwawień, w tym krwotoków śródczaszkowych.",
        explanation: "Prawidłowo! Badania CHANCE i POINT jednoznacznie wykazały, że korzyści ze stosowania DAPT (ASA + klopidogrel) w redukcji ryzyka wczesnego udaru kumulują się w ciągu pierwszych 21 dni. Przedłużenie DAPT poza 21 dni (np. do 90 dni) nie zmniejsza już istotnie ryzyka udaru niedokrwiennego, natomiast znacząco zwiększa ryzyko ciężkich krwawień, w tym krwotoków śródczaszkowych."
      },
      {
        q: "Wskaż zestaw twierdzeń PRAWDZIWYCH dotyczących TIA:\n1. Skala ABCD2 służy do stratyfikacji ryzyka wystąpienia udaru niedokrwiennego mózgu w ciągu 48h.\n2. Wynik ≥4 punktów w skali ABCD2 oznacza wysokie ryzyko udaru i nakazuje pilną hospitalizację.\n3. U chorych z objawowym zwężeniem tętnicy szyjnej 70–99% zabieg CEA powinien być wykonany w ciągu pierwszych 14 dni.\n4. Napadowe migotanie przedsionków (AF) jest wskazaniem do wdrożenia antykoagulacji, a nie leczenia przeciwpłytkowego.\n5. Objawy TIA trwające dłużej niż 60 minut wykluczają rozpoznanie TIA i nakazują rozpoznanie stwardnienia rozsianego.",
        question: "Wskaż zestaw twierdzeń PRAWDZIWYCH dotyczących TIA:\n1. Skala ABCD2 służy do stratyfikacji ryzyka wystąpienia udaru niedokrwiennego mózgu w ciągu 48h.\n2. Wynik ≥4 punktów w skali ABCD2 oznacza wysokie ryzyko udaru i nakazuje pilną hospitalizację.\n3. U chorych z objawowym zwężeniem tętnicy szyjnej 70–99% zabieg CEA powinien być wykonany w ciągu pierwszych 14 dni.\n4. Napadowe migotanie przedsionków (AF) jest wskazaniem do wdrożenia antykoagulacji, a nie leczenia przeciwpłytkowego.\n5. Objawy TIA trwające dłużej niż 60 minut wykluczają rozpoznanie TIA i nakazują rozpoznanie stwardnienia rozsianego.",
        opts: [
          "A) 1, 2, 3, 4",
          "B) 1, 2, 5",
          "C) 2, 3, 4, 5",
          "D) 1, 3, 5",
          "E) Tylko 1 i 2"
        ],
        options: [
          "A) 1, 2, 3, 4",
          "B) 1, 2, 5",
          "C) 2, 3, 4, 5",
          "D) 1, 3, 5",
          "E) Tylko 1 i 2"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Zdania 1, 2, 3 i 4 są prawdziwe. Zdanie 5 jest fałszywe: czas trwania objawów >60 minut daje w skali ABCD2 2 punkty za czas trwania, ale nie wyklucza TIA, o ile objawy ustąpią i w neuroobrazowaniu nie stwierdza się ogniska zawału.",
        expl: "Prawidłowo! Zdania 1, 2, 3 i 4 są prawdziwe. Zdanie 5 jest fałszywe: czas trwania objawów >60 minut daje w skali ABCD2 2 punkty za czas trwania, ale nie wyklucza TIA, o ile objawy ustąpią i w neuroobrazowaniu nie stwierdza się ogniska zawału.",
        explanation: "Prawidłowo! Zdania 1, 2, 3 i 4 są prawdziwe. Zdanie 5 jest fałszywe: czas trwania objawów >60 minut daje w skali ABCD2 2 punkty za czas trwania, ale nie wyklucza TIA, o ile objawy ustąpią i w neuroobrazowaniu nie stwierdza się ogniska zawału."
      },
      {
        q: "Wskaż zdanie FAŁSZYWE dotyczące przemijającego napadu niedokrwiennego (TIA):",
        question: "Wskaż zdanie FAŁSZYWE dotyczące przemijającego napadu niedokrwiennego (TIA):",
        opts: [
          "A) Amaurosis fugax (przemijająca ślepota jednooczna) jest typowym objawem zatorowości w dorzeczu tętnicy kręgowej",
          "B) Wykrycie napadowego migotania przedsionków wymaga wdrożenia doustnego antykoagulantu (NOAC)",
          "C) W sekwencji DWI rezonansu magnetycznego świeże niedokrwienie charakteryzuje się hiperintensywnym sygnałem",
          "D) TIA jest silnym czynnikiem zwiastunowym dokonanego udaru mózgu – nawet 10–15% chorych doznaje udaru w ciągu 90 dni",
          "E) Intensywna statynoterapia z celem LDL <55 mg/dl jest rekomendowana w prewencji wtórnej po TIA tła miażdżycowego"
        ],
        options: [
          "A) Amaurosis fugax (przemijająca ślepota jednooczna) jest typowym objawem zatorowości w dorzeczu tętnicy kręgowej",
          "B) Wykrycie napadowego migotania przedsionków wymaga wdrożenia doustnego antykoagulantu (NOAC)",
          "C) W sekwencji DWI rezonansu magnetycznego świeże niedokrwienie charakteryzuje się hiperintensywnym sygnałem",
          "D) TIA jest silnym czynnikiem zwiastunowym dokonanego udaru mózgu – nawet 10–15% chorych doznaje udaru w ciągu 90 dni",
          "E) Intensywna statynoterapia z celem LDL <55 mg/dl jest rekomendowana w prewencji wtórnej po TIA tła miażdżycowego"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Zdanie A jest fałszywe. Amaurosis fugax (przemijające jednooczne zaniewidzenie, opisane jako 'zasłona opadająca na jedno oko') jest typowym objawem zatorowości do tętnicy środkowej siatkówki pochodzącej z tętnicy szyjnej wewnętrznej (ICA – dorzecze przednie krążenia mózgowego), a NIE z tętnicy kręgowej (która zasila krążenie tylne).",
        expl: "Prawidłowo! Zdanie A jest fałszywe. Amaurosis fugax (przemijające jednooczne zaniewidzenie, opisane jako 'zasłona opadająca na jedno oko') jest typowym objawem zatorowości do tętnicy środkowej siatkówki pochodzącej z tętnicy szyjnej wewnętrznej (ICA – dorzecze przednie krążenia mózgowego), a NIE z tętnicy kręgowej (która zasila krążenie tylne).",
        explanation: "Prawidłowo! Zdanie A jest fałszywe. Amaurosis fugax (przemijające jednooczne zaniewidzenie, opisane jako 'zasłona opadająca na jedno oko') jest typowym objawem zatorowości do tętnicy środkowej siatkówki pochodzącej z tętnicy szyjnej wewnętrznej (ICA – dorzecze przednie krążenia mózgowego), a NIE z tętnicy kręgowej (która zasila krążenie tylne)."
      },
      {
        q: "Zgodnie z polskimi przepisami o kierujących pojazdami, jakie zalecenia dotyczące prowadzenia pojazdów mechanicznych kategorii B powinien otrzymać pacjent po przebytym napadzie TIA?",
        question: "Zgodnie z polskimi przepisami o kierujących pojazdami, jakie zalecenia dotyczące prowadzenia pojazdów mechanicznych kategorii B powinien otrzymać pacjent po przebytym napadzie TIA?",
        opts: [
          "A) Bezwzględny zakaz prowadzenia pojazdów przez co najmniej 1 miesiąc od incydentu z koniecznością kontrolnej oceny lekarskiej",
          "B) Zezwolenie na natychmiastowe prowadzenie pojazdów zaraz po ustąpieniu objawów na SOR",
          "C) Dożywotnie odebranie uprawnień do kierowania jakimikolwiek pojazdami",
          "D) Obowiązek zdania ponownego egzaminu państwowego na prawo jazdy w WORD w ciągu 7 dni",
          "E) Zezwolenie na prowadzenie pojazdów wyłącznie pod nadzorem instruktora nauki jazdy"
        ],
        options: [
          "A) Bezwzględny zakaz prowadzenia pojazdów przez co najmniej 1 miesiąc od incydentu z koniecznością kontrolnej oceny lekarskiej",
          "B) Zezwolenie na natychmiastowe prowadzenie pojazdów zaraz po ustąpieniu objawów na SOR",
          "C) Dożywotnie odebranie uprawnień do kierowania jakimikolwiek pojazdami",
          "D) Obowiązek zdania ponownego egzaminu państwowego na prawo jazdy w WORD w ciągu 7 dni",
          "E) Zezwolenie na prowadzenie pojazdów wyłącznie pod nadzorem instruktora nauki jazdy"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Zgodnie z rozporządzeniem Ministra Zdrowia w sprawie badań lekarskich osób ubiegających się o uprawnienia do kierowania pojazdami, po przebytym TIA lub udarze mózgu obowiązuje zakaz prowadzenia pojazdów kategorii B przez minimum 1 miesiąc (dla kierowców zawodowych kat. C/D minimum 3–6 miesięcy) oraz wymóg uzyskania pozytywnej opinii neurologa.",
        expl: "Prawidłowo! Zgodnie z rozporządzeniem Ministra Zdrowia w sprawie badań lekarskich osób ubiegających się o uprawnienia do kierowania pojazdami, po przebytym TIA lub udarze mózgu obowiązuje zakaz prowadzenia pojazdów kategorii B przez minimum 1 miesiąc (dla kierowców zawodowych kat. C/D minimum 3–6 miesięcy) oraz wymóg uzyskania pozytywnej opinii neurologa.",
        explanation: "Prawidłowo! Zgodnie z rozporządzeniem Ministra Zdrowia w sprawie badań lekarskich osób ubiegających się o uprawnienia do kierowania pojazdami, po przebytym TIA lub udarze mózgu obowiązuje zakaz prowadzenia pojazdów kategorii B przez minimum 1 miesiąc (dla kierowców zawodowych kat. C/D minimum 3–6 miesięcy) oraz wymóg uzyskania pozytywnej opinii neurologa."
      },
      {
        q: "Co to jest tzw. porażenie Todda (Todd's paresis) imitujące napad TIA?",
        question: "Co to jest tzw. porażenie Todda (Todd's paresis) imitujące napad TIA?",
        opts: [
          "A) Przejściowy niedowład wiotki kończyny występujący bezpośrednio po ogniskowym napadzie padaczkowym",
          "B) Porażenie czterokończynowe wywołane obustronnym zatorem tętnicy nerkowej",
          "C) Porażenie nerwu strzałkowego wspólnego po ucisku gipsu na podudzie",
          "D) Porażenie mięśni okoruchowych w przebiegu ostrego zatrucia jadem kiełbasianym",
          "E) Skurcz tężcowy mięśni żwaczy w przebiegu zakażenia Clostridium tetani"
        ],
        options: [
          "A) Przejściowy niedowład wiotki kończyny występujący bezpośrednio po ogniskowym napadzie padaczkowym",
          "B) Porażenie czterokończynowe wywołane obustronnym zatorem tętnicy nerkowej",
          "C) Porażenie nerwu strzałkowego wspólnego po ucisku gipsu na podudzie",
          "D) Porażenie mięśni okoruchowych w przebiegu ostrego zatrucia jadem kiełbasianym",
          "E) Skurcz tężcowy mięśni żwaczy w przebiegu zakażenia Clostridium tetani"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Porażenie Todda to przejściowy deficyt neurologiczny (najczęściej niedowład połowiczy lub afazja) występujący bezpośrednio po napadzie padaczkowym w strefie kory mózgowej objętej wyładowaniem. Ustępuje zazwyczaj w ciągu kilku godzin (maks. 24–48h) i jest jedną z najczęstszych masek TIA (stroke mimic).",
        expl: "Prawidłowo! Porażenie Todda to przejściowy deficyt neurologiczny (najczęściej niedowład połowiczy lub afazja) występujący bezpośrednio po napadzie padaczkowym w strefie kory mózgowej objętej wyładowaniem. Ustępuje zazwyczaj w ciągu kilku godzin (maks. 24–48h) i jest jedną z najczęstszych masek TIA (stroke mimic).",
        explanation: "Prawidłowo! Porażenie Todda to przejściowy deficyt neurologiczny (najczęściej niedowład połowiczy lub afazja) występujący bezpośrednio po napadzie padaczkowym w strefie kory mózgowej objętej wyładowaniem. Ustępuje zazwyczaj w ciągu kilku godzin (maks. 24–48h) i jest jedną z najczęstszych masek TIA (stroke mimic)."
      },
      {
        q: "Jaki jest docelowy poziom cholesterolu frakcji LDL w surowicy krwi u pacjenta po przebytym TIA o podłożu miażdżycowym wg aktualnych wytycznych ESC/EAS?",
        question: "Jaki jest docelowy poziom cholesterolu frakcji LDL w surowicy krwi u pacjenta po przebytym TIA o podłożu miażdżycowym wg aktualnych wytycznych ESC/EAS?",
        opts: [
          "A) Stężenie LDL <55 mg/dl (1,4 mmol/l) oraz redukcja o co najmniej 50% w stosunku do wartości wyjściowych",
          "B) Stężenie LDL poniżej 160 mg/dl bez konieczności redukcji procentowej",
          "C) Wartość LDL między 100 a 130 mg/dl przy prawidłowej masie ciała",
          "D) Obniżenie LDL poniżej 10 mg/dl pod kontrolą biopsji wątroby",
          "E) Poziom cholesterolu nie ma znaczenia w prewencji wtórnej po TIA"
        ],
        options: [
          "A) Stężenie LDL <55 mg/dl (1,4 mmol/l) oraz redukcja o co najmniej 50% w stosunku do wartości wyjściowych",
          "B) Stężenie LDL poniżej 160 mg/dl bez konieczności redukcji procentowej",
          "C) Wartość LDL między 100 a 130 mg/dl przy prawidłowej masie ciała",
          "D) Obniżenie LDL poniżej 10 mg/dl pod kontrolą biopsji wątroby",
          "E) Poziom cholesterolu nie ma znaczenia w prewencji wtórnej po TIA"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Pacjent po TIA lub udarze niedokrwiennym o podłożu miażdżycowym znajduje się w grupie ekstremalnie wysokiego ryzyka sercowo-naczyniowego. Zgodnie z wytycznymi ESC/EAS, cel terapeutyczny to obniżenie LDL <55 mg/dl (<1,4 mmol/l) oraz redukcja o ≥50% w stosunku do wartości wyjściowej, co osiąga się za pomocą statyn o wysokiej sile działania (atorwastatyna 80 mg lub rozuwastatyna 40 mg) w skojarzeniu z ezetymibem.",
        expl: "Prawidłowo! Pacjent po TIA lub udarze niedokrwiennym o podłożu miażdżycowym znajduje się w grupie ekstremalnie wysokiego ryzyka sercowo-naczyniowego. Zgodnie z wytycznymi ESC/EAS, cel terapeutyczny to obniżenie LDL <55 mg/dl (<1,4 mmol/l) oraz redukcja o ≥50% w stosunku do wartości wyjściowej, co osiąga się za pomocą statyn o wysokiej sile działania (atorwastatyna 80 mg lub rozuwastatyna 40 mg) w skojarzeniu z ezetymibem.",
        explanation: "Prawidłowo! Pacjent po TIA lub udarze niedokrwiennym o podłożu miażdżycowym znajduje się w grupie ekstremalnie wysokiego ryzyka sercowo-naczyniowego. Zgodnie z wytycznymi ESC/EAS, cel terapeutyczny to obniżenie LDL <55 mg/dl (<1,4 mmol/l) oraz redukcja o ≥50% w stosunku do wartości wyjściowej, co osiąga się za pomocą statyn o wysokiej sile działania (atorwastatyna 80 mg lub rozuwastatyna 40 mg) w skojarzeniu z ezetymibem."
      },
      {
        q: "Co charakteryzuje zespół przemijającej amnezji ogólnej (Transient Global Amnesia – TGA) w odróżnieniu od TIA?",
        question: "Co charakteryzuje zespół przemijającej amnezji ogólnej (Transient Global Amnesia – TGA) w odróżnieniu od TIA?",
        opts: [
          "A) Izolowana, ostra niepamięć następcza z ciągłym powtarzaniem tych samych pytań przy zachowanej tożsamości własnej i braku ubytków ruchowych",
          "B) Porażenie połowicze z afazją ruchową i śpiączką mózgową",
          "C) Uogólnione drgawki toniczno-kloniczne z bezmoczem i sinicą",
          "D) Przemijające zaniewidzenie jednooczne z bólem gałki ocznej",
          "E) Gwałtowny spadek ciśnienia skurczowego poniżej 60 mmHg z bladością"
        ],
        options: [
          "A) Izolowana, ostra niepamięć następcza z ciągłym powtarzaniem tych samych pytań przy zachowanej tożsamości własnej i braku ubytków ruchowych",
          "B) Porażenie połowicze z afazją ruchową i śpiączką mózgową",
          "C) Uogólnione drgawki toniczno-kloniczne z bezmoczem i sinicą",
          "D) Przemijające zaniewidzenie jednooczne z bólem gałki ocznej",
          "E) Gwałtowny spadek ciśnienia skurczowego poniżej 60 mmHg z bladością"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! TGA to łagodny, samoograniczający się zespół charakteryzujący się nagłą, głęboką niepamięcią świeżą (chory wielokrotnie zadaje te same pytania: 'Gdzie jestem?', 'Co się stało?'). Świadomość, tożsamość własna i funkcje ruchowo-czuciowe są w pełni zachowane. Napad trwa typowo 4–12 godzin i ustępuje bez leczenia.",
        expl: "Prawidłowo! TGA to łagodny, samoograniczający się zespół charakteryzujący się nagłą, głęboką niepamięcią świeżą (chory wielokrotnie zadaje te same pytania: 'Gdzie jestem?', 'Co się stało?'). Świadomość, tożsamość własna i funkcje ruchowo-czuciowe są w pełni zachowane. Napad trwa typowo 4–12 godzin i ustępuje bez leczenia.",
        explanation: "Prawidłowo! TGA to łagodny, samoograniczający się zespół charakteryzujący się nagłą, głęboką niepamięcią świeżą (chory wielokrotnie zadaje te same pytania: 'Gdzie jestem?', 'Co się stało?'). Świadomość, tożsamość własna i funkcje ruchowo-czuciowe są w pełni zachowane. Napad trwa typowo 4–12 godzin i ustępuje bez leczenia."
      },
      {
        q: "Dlaczego u chorych po TIA nie zaleca się rutynowego stosowania leków przeciwdrgawkowych w profilaktyce pierwotnej napadów padaczkowych?",
        question: "Dlaczego u chorych po TIA nie zaleca się rutynowego stosowania leków przeciwdrgawkowych w profilaktyce pierwotnej napadów padaczkowych?",
        opts: [
          "A) Ponieważ ryzyko napadów drgawkowych po TIA jest znikome, a leki przeciwpadaczkowe wywołują działania niepożądane i pogarszają funkcje poznawcze",
          "B) Ze względu na to, że leki przeciwdrgawkowe wywołują natychmiastowe zrośnięcie zastawek serca",
          "C) Ponieważ leki te całkowicie znoszą przeciwpłytkowe działanie aspiryny",
          "D) Z powodu ryzyka wywołania ostrego krwotoku podpajęczynówkowego",
          "E) Ponieważ leki przeciwpadaczkowe są zakazane u osób powyżej 50. roku życia"
        ],
        options: [
          "A) Ponieważ ryzyko napadów drgawkowych po TIA jest znikome, a leki przeciwpadaczkowe wywołują działania niepożądane i pogarszają funkcje poznawcze",
          "B) Ze względu na to, że leki przeciwdrgawkowe wywołują natychmiastowe zrośnięcie zastawek serca",
          "C) Ponieważ leki te całkowicie znoszą przeciwpłytkowe działanie aspiryny",
          "D) Z powodu ryzyka wywołania ostrego krwotoku podpajęczynówkowego",
          "E) Ponieważ leki przeciwpadaczkowe są zakazane u osób powyżej 50. roku życia"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! W TIA nie dochodzi do trwałego uszkodzenia kory mózgowej tworzącego ognisko padaczkorodne. Ryzyko padaczki poudarowej jest znikome, a rutynowa profilaktyka nie przynosi korzyści klinicznych i naraża chorego na sedację, zaburzenia równowagi i interakcje lekowe.",
        expl: "Prawidłowo! W TIA nie dochodzi do trwałego uszkodzenia kory mózgowej tworzącego ognisko padaczkorodne. Ryzyko padaczki poudarowej jest znikome, a rutynowa profilaktyka nie przynosi korzyści klinicznych i naraża chorego na sedację, zaburzenia równowagi i interakcje lekowe.",
        explanation: "Prawidłowo! W TIA nie dochodzi do trwałego uszkodzenia kory mózgowej tworzącego ognisko padaczkorodne. Ryzyko padaczki poudarowej jest znikome, a rutynowa profilaktyka nie przynosi korzyści klinicznych i naraża chorego na sedację, zaburzenia równowagi i interakcje lekowe."
      },
      {
        q: "Który lek przeciwpłytkowy może być stosowany jako alternatywa dla klopidogrelu w schemacie DAPT z kwasem acetylosalicylowym w ciągu pierwszych 30 dni po TIA wysokiego ryzyka na podstawie badania THALES?",
        question: "Który lek przeciwpłytkowy może być stosowany jako alternatywa dla klopidogrelu w schemacie DAPT z kwasem acetylosalicylowym w ciągu pierwszych 30 dni po TIA wysokiego ryzyka na podstawie badania THALES?",
        opts: [
          "A) Tikagrelor (Ticagrelor)",
          "B) Prasugrel (bezwzględnie przeciwwskazany po udarze/TIA)",
          "C) Dipirydamol w monoterapii doustnej",
          "D) Tiklopidyna w dawce 1000 mg",
          "E) Abcyksymab we wlewie ciągłym przez 30 dni"
        ],
        options: [
          "A) Tikagrelor (Ticagrelor)",
          "B) Prasugrel (bezwzględnie przeciwwskazany po udarze/TIA)",
          "C) Dipirydamol w monoterapii doustnej",
          "D) Tiklopidyna w dawce 1000 mg",
          "E) Abcyksymab we wlewie ciągłym przez 30 dni"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Badanie THALES wykazało skuteczność skojarzenia ASA z tikagrelorem (90 mg 2x/d po dawce nasycającej 180 mg) przez 30 dni w redukcji udaru i zgonu po TIA wysokiego ryzyka lub łagodnym udarze. Uwaga: Prasugrel jest bezwzględnie przeciwwskazany u pacjentów z przebytym udarem lub TIA ze względu na wysokie ryzyko krwawień śródczaszkowych!",
        expl: "Prawidłowo! Badanie THALES wykazało skuteczność skojarzenia ASA z tikagrelorem (90 mg 2x/d po dawce nasycającej 180 mg) przez 30 dni w redukcji udaru i zgonu po TIA wysokiego ryzyka lub łagodnym udarze. Uwaga: Prasugrel jest bezwzględnie przeciwwskazany u pacjentów z przebytym udarem lub TIA ze względu na wysokie ryzyko krwawień śródczaszkowych!",
        explanation: "Prawidłowo! Badanie THALES wykazało skuteczność skojarzenia ASA z tikagrelorem (90 mg 2x/d po dawce nasycającej 180 mg) przez 30 dni w redukcji udaru i zgonu po TIA wysokiego ryzyka lub łagodnym udarze. Uwaga: Prasugrel jest bezwzględnie przeciwwskazany u pacjentów z przebytym udarem lub TIA ze względu na wysokie ryzyko krwawień śródczaszkowych!"
      }
    ],
    flashcards: [
      { q: "Czym różni się współczesna definicja tkankowa TIA od tradycyjnej czasowej?", a: "Definicja tkankowa wymaga braku świeżego ogniska zawału w neuroobrazowaniu (MRI DWI), niezależnie od czasu trwania objawów klinicznych." },
      { q: "Co oznacza wynik ≥4 punktów w skali ABCD2?", a: "Wysokie ryzyko udaru mózgu w ciągu 48 godzin (>8%) i bezwzględne wskazanie do hospitalizacji na oddziale udarowym." },
      { q: "Jaki jest zalecany schemat leczenia przeciwpłytkowego w TIA wysokiego ryzyka?", a: "DAPT: Kwas acetylosalicylowy (ASA 100 mg) + klopidogrel (75 mg po dawce 300 mg) przez 21 dni, a potem monoterapia." },
      { q: "W jakim czasie należy wykonać endarterektomię (CEA) przy objawowym zwężeniu tętnicy szyjnej 70–99%?", a: "Pilnie w ciągu pierwszych 14 dni (optymalnie w ciągu 48–72 godzin) od wystąpienia TIA." },
      { q: "Czym jest amaurosis fugax?", a: "Przemijającą ślepotą jednooczną (zator tętnicy siatkówkowej) spowodowaną zatorowością z tętnicy szyjnej wewnętrznej (ICA)." },
      { q: "Jaki lek przeciwpłytkowy jest bezwzględnie przeciwwskazany po przebytym TIA lub udarze mózgu?", a: "Prasugrel – ze względu na wysokie ryzyko śmiertelnych krwotoków śródczaszkowych." }
    ]
  }
];

async function run() {
  console.log('Writing and encrypting Cases 159 and 160...');
  for (const c of casesData) {
    const enc = await encryptStringAes(JSON.stringify(c, null, 2), MASTER_KEY);
    fs.writeFileSync(path.join('cases', c.file), JSON.stringify(enc, null, 2), 'utf8');
    console.log(`✓ Case #${c.id} (${c.file}) saved and encrypted.`);
  }
}

run().catch(console.error);

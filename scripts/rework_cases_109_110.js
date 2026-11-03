const fs = require('fs');
const path = require('path');
const { decryptObjectAes, encryptStringAes } = require('./encrypt_case');

const CASES_DIR = path.join(__dirname, '..', 'cases');
const MASTER_KEY = '@LEKSzymon28111999';

console.log("Reworking Cases 109 and 110 to Gold Standard...");

// ==========================================
// CASE 109: UPJO u 3-miesięcznego Tymona
// ==========================================
const case109Data = {
  id: 109,
  filename: "109_wodonercze_wrodzone_upjo.json",
  dept: "Chirurgia dziecięca",
  shortTitle: "3-miesięczny Tymon – Poszerzenie miedniczki w USG prenatalnym, guz w jamie brzusznej i wodonercze (UPJO)",
  diagnosisTitle: "Wrodzone zwężenie połączenia miedniczkowo-moczowodowego (UPJO – Ureteropelvic Junction Obstruction) lewostronne powikłane wodonerczem stopnia IV wg SFU",
  vitals: [
    { label: "Akcja serca (HR)", val: "132/min", sub: "Prawidłowa dla niemowlęcia", status: "ok" },
    { label: "Ciśnienie tętnicze", val: "84/52 mmHg", sub: "W normie", status: "ok" },
    { label: "Saturacja SpO2", val: "99%", sub: "W normie", status: "ok" },
    { label: "Częstość oddechów", val: "28/min", sub: "W normie", status: "ok" },
    { label: "Temperatura ciała", val: "36.8°C", sub: "Normotermia", status: "ok" }
  ],
  vitalsObj: { hr: 132, bp: "84/52", spo2: 99, rr: 28, temp: 36.8, gcs: 15 },
  story: "3-miesięczny Tymon został przyjęty na Oddział Chirurgii i Urologii Dziecięcej w celu planowej diagnostyki i leczenia wodonercza nerki lewej. W wywiadzie położniczym: w badaniu USG płodu w 32. tygodniu ciąży stwierdzono poszerzenie miedniczki nerkowej lewej do 14 mm (prenatal hydronephrosis). W pierwszym kontrolnym badaniu USG po porodzie w 5. dobie życia wymiar przednio-tylny miedniczki nerkowej (APD) wynosił 22 mm. W kontrolnym USG w 3. miesiącu życia stwierdzono progresję zastoju: APD miedniczki nerkowej lewej wynosi aż 35 mm, kielichy są balonowato poszerzone, a warstwa miąższowa kory nerki uległa znacznemu ścieńczeniu do 2.8 mm (stopień IV wg klasyfikacji Society for Fetal Urology – SFU). Podczas badania palpacyjnego jamy brzusznej w lewym podżebrzu i jamie biodrowej wyczuwa się gładki, elastyczny, niebolesny opór (balotująca powiększona nerka). Moczowód lewy w USG jest całkowicie niewidoczny na całej długości. Chłopiec rozwija się prawidłowo, nie gorączkował, przyrosty masy ciała są prawidłowe.",
  labs: {
    "Mocz i biochemia krwi": [
      { name: "Mocz badanie ogólne - leukocyty", val: "0-2 w polu widzenia", norm: "0-5 wpw", flag: "NORMAL" },
      { name: "Mocz badanie ogólne - erytrocyty", val: "0 w polu widzenia", norm: "0-3 wpw", flag: "NORMAL" },
      { name: "Białko w moczu", val: "Nieobecne", norm: "Nieobecne", flag: "NORMAL" },
      { name: "Posiew moczu", val: "Jałowy", norm: "Jałowy", flag: "NORMAL" },
      { name: "Kreatynina w surowicy", val: "0.26 mg/dl", norm: "0.20 - 0.40 mg/dl", flag: "NORMAL" },
      { name: "Mocznik", val: "19 mg/dl", norm: "15 - 36 mg/dl", flag: "NORMAL" },
      { name: "Sód (Na+)", val: "139 mmol/l", norm: "135 - 145 mmol/l", flag: "NORMAL" },
      { name: "Potas (K+)", val: "4.8 mmol/l", norm: "3.5 - 5.3 mmol/l", flag: "NORMAL" }
    ],
    "Badania obrazowe i radioizotopowe": [
      { name: "USG układu moczowego (3. m.ż.)", val: "Nerka lewa 85 mm (powiększona), APD miedniczki 35 mm, kielichy balonowate, kora ścienczała do 2.8 mm (SFU IV). Moczowód lewy niewidoczny. Nerka prawa 56 mm, prawidłowa.", norm: "Miedniczka APD <7-10 mm, miąższ >7-8 mm", flag: "CRIT_HIGH" },
      { name: "Cystouretrografia mikcyjna (CUM)", val: "Pęcherz moczowy o gładkich zarysach, pojemność prawidłowa, brak wstecznego odpływu kontrastu do moczowodów (VUR wykluczony).", norm: "Brak odpływu wstecznego", flag: "NORMAL" },
      { name: "Scyntygrafia dynamiczna 99mTc-MAG3 (F+20)", val: "Nerka lewa: krzywa zaporowa, stała akumulacja znacznika bez fazy wydalania po Furosemidzie (T1/2 >30 min). Udział w funkcji nerkowej (DRF): nerka lewa 34%, nerka prawa 66%.", norm: "T1/2 <10 min (norma); krzywa zaporowa T1/2 >20 min; DRF 45-55%", flag: "CRIT_LOW" }
    ]
  },
  steps: [
    {
      stepNum: 1,
      title: "Krok 1: Wstępna ocena poszerzenia miedniczki nerkowej wykrytego prenatalnie",
      desc: "Do Twojej poradni urologicznej trafia 3-miesięczne niemowlę z prenatalnie wykrytym wodonerczem lewostronnym. Wymiar APD miedniczki narósł z 14 mm w ciąży do 35 mm obecnie. Matka pyta, dlaczego w szpitalu położniczym pierwsze USG wykonano dopiero w 5. dobie życia, a nie w pierwszych godzinach po porodzie. Jak brzmi prawidłowe uzasadnienie fizjologiczne?",
      scenario: "Do Twojej poradni urologicznej trafia 3-miesięczne niemowlę z prenatalnie wykrytym wodonerczem lewostronnym. Wymiar APD miedniczki narósł z 14 mm w ciąży do 35 mm obecnie. Matka pyta, dlaczego w szpitalu położniczym pierwsze USG wykonano dopiero w 5. dobie życia, a nie w pierwszych godzinach po porodzie. Jak brzmi prawidłowe uzasadnienie fizjologiczne?",
      options: [
        {
          text: "W pierwszych 48 godzinach życia noworodek znajduje się w stanie fizjologicznej oligurii i odwodnienia, co może zaniżyć wymiary miedniczki nerkowej i dać wynik fałszywie ujemny; USG wykonuje się standardowo po 3.–7. dobie życia",
          feedback: "✅ PRAWIDŁOWO! ZŁOTA REGUŁA NEONATOLOGICZNA I PYTANIE LEK! W 1. i 2. dobie życia rzutu noworodka filtracja kłębuszkowa jest niska, a diureza minimalna (fizjologiczna oliguria i odwodnienie poporodowe). Wykonanie USG w tym okresie może nie wykazać nawet ciężkiego wodonercza (miedniczka jest zapadnięta). Standardem jest wykonanie USG po 3.–7. dobie (lub po 1. tygodniu życia), gdy diureza ulega pełnej stabilizacji. Wyjątkiem wymagającym pilnego USG w 1. dobie jest podejrzenie zastawki cewki tylnej (PUV) u chłopca z obustronnym wodonerczem i powiększonym pęcherzem."
        },
        {
          text: "USG w 1. dobie życia jest prawnie zakazane ze względu na promieniowanie ultradźwiękowe",
          feedback: "❌ BŁĄD! USG nie emituje promieniowania jonizującego i jest całkowicie bezpieczne."
        },
        {
          text: "Aparat USG nie jest w stanie uwidocznić nerek noworodka przed ukończeniem 1. miesiąca życia",
          feedback: "❌ BŁĄD! Nerki noworodka są doskonale widoczne w USG od pierwszej minuty życia."
        },
        {
          text: "Wodonercze prenatalne zawsze ustępuje w 1. dobie życia, a potem pojawia się na nowo",
          feedback: "❌ BŁĄD! Wodonercze anatomiczne (UPJO) nie znika fizjologicznie w 1. dobie."
        }
      ]
    },
    {
      stepNum: 2,
      title: "Krok 2: Badanie fizykalne niemowlęcia – diagnostyka różnicowa wyczuwalnego oporu",
      desc: "W badaniu palpacyjnym powłok brzusznych wyczuwasz w lewym podżebrzu gładki, elastyczny, przesuwalny opór o wymiarach ok. 7x5 cm, balotujący przy badaniu oburęcznym. Jaka jest najczęstsza przyczyna wyczuwalnego guza w jamie brzusznej u noworodka i młodego niemowlęcia?",
      scenario: "W badaniu palpacyjnym powłok brzusznych wyczuwasz w lewym podżebrzu gładki, elastyczny, przesuwalny opór o wymiarach ok. 7x5 cm, balotujący przy badaniu oburęcznym. Jaka jest najczęstsza przyczyna wyczuwalnego guza w jamie brzusznej u noworodka i młodego niemowlęcia?",
      options: [
        {
          text: "Wodonercze wrodzone (zwężenie połączenia miedniczkowo-moczowodowego UPJO lub wielotorbielowatość dysplastyczna nerki MCDK)",
          feedback: "✅ PRAWIDŁOWO! KARDYNALNE ZAGADNIENIE PEDIATRYCZNE! Najczęstszą przyczyną wyczuwalnej masy patologicznej ('guza') w jamie brzusznej u noworodków i niemowląt są wady układu moczowego (odpowiadają za >50-60% mas brzusznych), a na pierwszym miejscu znajduje się wodonercze (UPJO) oraz wielotorbielowata dysplazja nerki (MCDK). Guzy lite (nerwiak zarodkowy – neuroblastoma, nerczak zarodkowy – guz Wilmsa / nephroblastoma) występują zazwyczaj w późniejszym wieku (guz Wilmsa szczyt w 3.–4. r.ż.)."
        },
        {
          text: "Guz Wilmsa (nephroblastoma) stanowiący ponad 90% mas brzusznych u 3-miesięcznych dzieci",
          feedback: "❌ BŁĄD! Guz Wilmsa u niemowląt poniżej 6. miesiąca życia jest rzadkością (szczyt zapadalności to 3-4 lata)."
        },
        {
          text: "Potworniak dojrzały krezki jelita cienkiego",
          feedback: "❌ BŁĄD! Potworniaki jamy brzusznej to kazuistyka w porównaniu z wadami układu moczowego."
        },
        {
          text: "Powiększenie śledziony w przebiegu wrodzonej białaczki szpikowej",
          feedback: "❌ BŁĄD! Śledziona ma ostry brzeg i nie wykazuje balotowania lędźwiowego typowego dla nerki."
        }
      ]
    },
    {
      stepNum: 3,
      title: "Krok 3: Wybór badania rozstrzygającego o przeszkodzie mechanicznej",
      desc: "USG potwierdza APD miedniczki 35 mm i ścieńczenie kory (SFU IV). Badanie CUM wykluczyło refluks (VUR). Jakie badanie jest złotym standardem oceny drożności i funkcji filtracyjnej w podejrzeniu zwężenia UPJO?",
      scenario: "USG potwierdza APD miedniczki 35 mm i ścieńczenie kory (SFU IV). Badanie CUM wykluczyło refluks (VUR). Jakie badanie jest złotym standardem oceny drożności i funkcji filtracyjnej w podejrzeniu zwężenia UPJO?",
      options: [
        {
          text: "Scyntygrafia dynamiczna nerek (renografia) z użyciem 99mTc-MAG3 z testem furosemidowym (protokół F+20)",
          feedback: "✅ PRAWIDŁOWO! Złotym standardem w różnicowaniu anatomicznej przeszkody zaporowej od nieobturacyjnego poszerzenia układu kielichowo-miedniczkowego jest dynamiczna scyntygrafia nerek (renografia) z użyciem merkaptoacetylo-triglicyny (99mTc-MAG3) z testem diuretycznym po podaniu Furosemidu w 20. minucie (protokół F+20). Pozwala ona na: 1) ocenę krzywej eliminacji radioznacznika (krzywa zaporowa z T1/2 >20 min świadczy o przeszkodzie mechanicznej), 2) precyzyjny pomiar względnego udziału każdej nerki w globalnej funkcji filtracyjnej (DRF – Differential Renal Function)."
        },
        {
          text: "Urografia dożylna z podaniem 50 ml jodowego kontrastu jonowego",
          feedback: "❌ BŁĄD! Urografia dożylna u niemowląt jest obecnie badaniem historycznym, stwarza wysokie ryzyko nefrotoksyczności i nie pozwala na ilościową ocenę klirensu nerkowego."
        },
        {
          text: "Statyczna scyntygrafia nerek 99mTc-DMSA bez podawania diuretyku",
          feedback: "❌ BŁĄD! DMSA ocenia korę nerkową i blizny, ale NIE ocenia dynamiki odpływu moczu i nie pozwala zdiagnozować przeszkody mechanicznej."
        },
        {
          text: "Tomografia komputerowa wielorzędowa z potrójną fazą naczyniową",
          feedback: "❌ BŁĄD! TK wiąże się ze zbyt dużą dawką promieniowania i nie daje dynamicznej krzywej eliminacji diuretycznej."
        }
      ]
    },
    {
      stepNum: 4,
      title: "Krok 4: Analiza wyników scyntygrafii MAG3 i kwalifikacja do operacji wg EAU/ESPU",
      desc: "Wynik renografii 99mTc-MAG3 (F+20) wykazuje: stałą, narastającą akumulację znacznika w lewej nerce bez jakiejkolwiek eliminacji po Furosemidzie (krzywa zaporowa, T1/2 >30 minut) oraz udział lewej nerki w funkcji globalnej DRF = 34% (udział nerki prawej 66%). Jakie decyzje terapeutyczne nakazują wytyczne Europejskiego Towarzystwa Urologii Dziecięcej (ESPU)?",
      scenario: "Wynik renografii 99mTc-MAG3 (F+20) wykazuje: stałą, narastającą akumulację znacznika w lewej nerce bez jakiejkolwiek eliminacji po Furosemidzie (krzywa zaporowa, T1/2 >30 minut) oraz udział lewej nerki w funkcji globalnej DRF = 34% (udział nerki prawej 66%). Jakie decyzje terapeutyczne nakazują wytyczne Europejskiego Towarzystwa Urologii Dziecięcej (ESPU)?",
      options: [
        {
          text: "Istnieją bezwzględne wskazania do leczenia operacyjnego (pieloplastyki) w celu ratowania miąższu nerki lewej (DRF <40%, APD >30 mm, SFU IV oraz zaporowa krzywa scyntygraficzna)",
          feedback: "✅ PRAWIDŁOWO! Zgodnie z wytycznymi ESPU i PTNFD wskazaniami do leczenia operacyjnego wodonercza w przebiegu UPJO są: 1) obniżenie względnej funkcji chorej nerki DRF poniżej 40% (u Tymona 34%), 2) spadek DRF o >5% w kolejnych badaniach kontrolnych, 3) wodonercze stopnia IV wg SFU z APD miedniczki >20-30 mm, 4) krzywa zaporowa z czasem półtrwania wydalania T1/2 >20 minut po furosemidzie, 5) wystąpienie objawowego ZUM lub dolegliwości bólowych. Pozostawienie pacjenta bez operacji doprowadzi do całkowitej utraty funkcji nerki!"
        },
        {
          text: "Wskazana jest wyłącznie dalsza obserwacja zachowawcza przez kolejne 2 lata, gdyż wodonercze SFU IV zawsze ustępuje samoistnie",
          feedback: "❌ BŁĄD! Przy DRF 34%, ścienczeniu miąższu do 2.8 mm i pełnej krzywej zaporowej zwlekanie z operacją grozi nieodwracalnym zniszczeniem nerki."
        },
        {
          text: "Wskazana jest natychmiastowa nefrektomia (usunięcie nerki lewej), ponieważ nerka z DRF 34% jest bezużyteczna",
          feedback: "❌ BŁĄD! KARDYNALNA PUŁAPKA! Nefrektomię rozważa się jedynie w skrajnych przypadkach, gdy funkcja nerki spada poniżej 10–15%. Nerka z zachowaną 34% funkcją u niemowlęcia po odbarczeniu ma ogromny potencjał regeneracyjny!"
        },
        {
          text: "Należy wdrożyć przewlekłe podawanie leków moczopędnych (hydrochlorotiazyd z furosemidem) przez 12 miesięcy",
          feedback: "❌ BŁĄD! Diuretyki w obecności mechanicznej przeszkody zaporowej zwiększają ciśnienie w miedniczce, nasilają wodonercze i mogą doprowadzić do pęknięcia miedniczki nerkowej!"
        }
      ]
    },
    {
      stepNum: 5,
      title: "Krok 5: Wybór metody operacyjnej – złoty standard chirurgii rekonstrukcyjnej",
      desc: "Tymon został zakwalifikowany do operacji. Jaka procedura chirurgiczna stanowi uznany na całym świecie złoty standard w leczeniu zwężenia połączenia miedniczkowo-moczowodowego?",
      scenario: "Tymon został zakwalifikowany do operacji. Jaka procedura chirurgiczna stanowi uznany na całym świecie złoty standard w leczeniu zwężenia połączenia miedniczkowo-moczowodowego?",
      options: [
        {
          text: "Pieloplastyka sposobem Hynesa-Andersona (resekcyjna plastyka połączenia miedniczkowo-moczowodowego) z dostępu klasycznego lub laparoskopowego/retroperitoneoskopowego",
          feedback: "✅ PRAWIDŁOWO! Złotym standardem chirurgii UPJO jest operacja Hynesa-Andersona (dismembered pyeloplasty). Polega ona na wycięciu zwężonego, zmienionego chorobowo i aperystaltycznego odcinka połączenia miedniczkowo-moczowodowego, resekcji nadmiaru rozciągniętej ściany miedniczki nerkowej, podłużnym nacięciu zdrowego moczowodu (spatulation) oraz wytworzeniu szerokiego, lejkowatego zespolenia miedniczkowo-moczowodowego. Skuteczność zabiegu przekracza 95%."
        },
        {
          text: "Endoskopowe nacięcie ujścia pęcherzowego moczowodu (meatotomia)",
          feedback: "❌ BŁĄD! Zwężenie dotyczy górnego odcinka moczowodu (połączenia z miedniczką), a nie ujścia w pęcherzu."
        },
        {
          text: "Przeszczepienie moczowodu do pętli jelita krętego (wstawka Brickera)",
          feedback: "❌ BŁĄD! Wstawkę jelitową stosuje się po usunięciu pęcherza w raku urotelialnym u dorosłych."
        },
        {
          text: "Balonowa dylatacja cewki moczowej",
          feedback: "❌ BŁĄD! Wada dotyczy nerki i moczowodu, a nie cewki moczowej."
        }
      ]
    },
    {
      stepNum: 6,
      title: "Krok 6: Rola drenażu wewnętrznego – cewnik Double-J (JJ)",
      desc: "Podczas operacji Hynesa-Andersona operator wprowadza do moczowodu cewnik samoutrzymujący się typu Double-J (JJ) ze zwojami w miedniczce i pęcherzu. Jaki jest cel założenia stentu JJ i kiedy planuje się jego usunięcie?",
      scenario: "Podczas operacji Hynesa-Andersona operator wprowadza do moczowodu cewnik samoutrzymujący się typu Double-J (JJ) ze zwojami w miedniczce i pęcherzu. Jaki jest cel założenia stentu JJ i kiedy planuje się jego usunięcie?",
      options: [
        {
          text: "Zabezpieczenie zespolenia przed przeciekiem moczu, obrzękiem i wtórnym zarośnięciem oraz zapewnienie swobodnego odpływu moczu w okresie gojenia; usuwa się go po 4–6 tygodniach w trakcie krótkiej cystoskopii",
          feedback: "✅ PRAWIDŁOWO! Szynowanie zespolenia stentem Double-J (JJ) odbarcza linię szwów przed wysokim ciśnieniem hydrostatycznym moczu, zapobiega wyciekowi moczu do przestrzeni zaotrzewnowej, obrzękowi tkanek i zwężeniu bliznowatemu w miejscu zespolenia. Stent usuwa się planowo po 4 do 6 tygodniach podczas krótkiego zabiegu cystoskopowego pod płytkim znieczuleniem."
        },
        {
          text: "Stent Double-J zakłada się na stałe i nie usuwa się go przez całe życie",
          feedback: "❌ BŁĄD! Pozostawienie stentu JJ na stałe prowadzi do jego inkrustacji solami mineralnymi, zablokowania złogami, urosepsy i zniszczenia nerki."
        },
        {
          text: "Cewnik JJ służy wyłącznie do podawania leków znieczulających bezpośrednio do kory nerki",
          feedback: "❌ BŁĄD! Stent JJ jest biernym drenem zapewniającym swobodny przepływ moczu."
        },
        {
          text: "Stent należy usunąć w 1. dobie po operacji pociągając za cewnik Foleya",
          feedback: "❌ BŁĄD! Zespolenie goi się przez kilka tygodni; usunięcie stentu w 1. dobie grozi rozejściem się szwów i zaciekiem moczowym."
        }
      ]
    },
    {
      stepNum: 7,
      title: "Krok 7: Diagnostyka przyczyn zewnętrznych UPJO – naczynie biegunowe dolne",
      desc: "Starszy asystent omawia z rezydentami odmienności etiopatogenetyczne UPJO u małych dzieci i młodzieży. Co to jest naczynie biegunowe dolne (aberrant lower pole vessel) i jaki jest charakterystyczny obraz kliniczny u starszych dzieci (zespół Dietla)?",
      scenario: "Starszy asystent omawia z rezydentami odmienności etiopatogenetyczne UPJO u małych dzieci i młodzieży. Co to jest naczynie biegunowe dolne (aberrant lower pole vessel) i jaki jest charakterystyczny obraz kliniczny u starszych dzieci (zespół Dietla)?",
      options: [
        {
          text: "Dodatkowe naczynie tętnicze/żylne do dolnego bieguna nerki krzyżujące i uciskające moczowód od zewnątrz; u starszych dzieci wywołuje tzw. przełomy Dietla (napadowy silny ból brzucha/wymioty po wypiciu dużej ilości płynów)",
          feedback: "✅ PRAWIDŁOWO! BARDZO CZĘSTE ZAGADNIENIE EGZAMINACYJNE! U niemowląt dominuje przyczyna wewnętrzna (wrodzone zwężenie/dysplazja mięśniówki). U starszych dzieci i młodzieży przyczyną UPJO często bywa naczynie biegunowe dolne (aberrant vessel – dodatkowa gałąź od aorty lub tętnicy nerkowej biegnąca do dolnego bieguna nerki), która krzyżuje moczowód od przodu i uciska go mechanicznie. Objawia się to tzw. przełomami Dietla (Dietl's crisis) – epizodami ostrego bólu brzucha i wymiotów występującymi po spożyciu dużej ilości płynów (nagły rzut diurezy powoduje rozdęcie miedniczki, zagięcie moczowodu na naczyniu i ostry zastój)."
        },
        {
          text: "Przetoka tętniczo-żylna w dolnym biegunie śledziony wywołująca krwiomocz uogólniony",
          feedback: "❌ BŁĄD! Naczynie biegunowe dolne to wada naczyniowa unaczynienia nerki."
        },
        {
          text: "Zwężenie żyły głównej dolnej uciskającej lewą nerkę w zespole dziadka do orzechów",
          feedback: "❌ BŁĄD! W zespole dziadka do orzechów (nutcracker syndrome) lewa żyła nerkowa jest uciskana między aortą a tętnicą krezkową górną, powodując krwiomocz i żylaki powrózka nasiennego, a nie wodonercze UPJO."
        },
        {
          text: "Naczynie to występuje wyłącznie u pacjentów ze stwardnieniem guzowatym",
          feedback: "❌ BŁĄD! Naczynie dodatkowe dolnego bieguna jest powszechnym wariantem anatomicznym (występuje u kilkunastu procent populacji)."
        }
      ]
    },
    {
      stepNum: 8,
      title: "Krok 8: Długofalowa kontrola pooperacyjna, regeneracja miąższu i rokowanie",
      desc: "Zabieg pieloplastyki u Tymona przebiegł bez powikłań, stent JJ usunięto w 6. tygodniu. W kontrolnym USG po 6 miesiącach od operacji APD miedniczki zmniejszyło się do 11 mm, a grubość miąższu kory wzrosła z 2.8 mm do 7.5 mm. W kontrolnej renografii MAG3 udział nerki wzrósł z 34% do 46%. Jak wytłumaczysz rodzicom tę spektakularną poprawę?",
      scenario: "Zabieg pieloplastyki u Tymona przebiegł bez powikłań, stent JJ usunięto w 6. tygodniu. W kontrolnym USG po 6 miesiącach od operacji APD miedniczki zmniejszyło się do 11 mm, a grubość miąższu kory wzrosła z 2.8 mm do 7.5 mm. W kontrolnej renografii MAG3 udział nerki wzrósł z 34% do 46%. Jak wytłumaczysz rodzicom tę spektakularną poprawę?",
      options: [
        {
          text: "Miąższ nerki u niemowląt charakteryzuje się niezwykłą plastycznością i zdolnością do przerostu kompensacyjnego oraz nefroniogenezy; wczesne odbarczenie wysokiego ciśnienia pozwala na niemal całkowitą regenerację funkcji nerki",
          feedback: "✅ PRAWIDŁOWO! Niezwykła cecha nefrologii i urologii dziecięcej: u niemowląt nefrony nie uległy jeszcze nieodwracalnemu zbliznowaceniu, lecz znajdowały się w stanie ucisku i uśpienia czynnościowego pod wpływem wysokiego ciśnienia hydrostatycznego. Skuteczne odbarczenie zastoju (pieloplastyka) przed 6.–12. miesiącem życia umożliwia prawidłowy dalszy rozwój kory nerkowej, proliferację cewek i powrót funkcji filtracyjnej do normy (wzrost z 34% do 46%). Rokowanie odległe jest znakomite (>95% pełnego sukcesu)."
        },
        {
          text: "Wynik USG jest błędem pomiarowym, zniszczony miąższ nerki nigdy nie ulega powiększeniu",
          feedback: "❌ BŁĄD! U małych dzieci odbarczenie wodonercza prowadzi do rzeczywistego, udokumentowanego pogrubienia miąższu nerkowego."
        },
        {
          text: "Wzrost miąższu świadczy o transformacji nowotworowej w nerczaka zarodkowego",
          feedback: "❌ BŁĄD! Pogrubienie kory nerkowej po pieloplastyce to fizjologiczna regeneracja, a nie proces nowotworowy."
        },
        {
          text: "Należy profilaktycznie usunąć drugą nerkę, aby nie obciążała zregenerowanej nerki lewej",
          feedback: "❌ BŁĄD! Niedorzeczna propozycja okaleczenia zdrowego dziecka."
        }
      ]
    }
  ],
  pathoNodes: [
    {
      badge: "KROK 1: ZABURZENIE MORFOGENEZY MOCZOWODU",
      title: "Dysplazja połączenia miedniczkowo-moczowodowego",
      short: "Aperystaltyczny odcinek i przewaga włókien kolagenowych",
      detail: "W 10.–12. tygodniu embriogenezy dochodzi do zaburzenia rekanalizacji światła moczowodu lub nieprawidłowego różnicowania komórek mięśniówki gładkiej w miejscu połączenia miedniczki z moczowodem. Pęczki mięśniowe o przebiegu podłużnym i spiralnym zostają zastąpione przez nieelastyczną tkankę łączną bogatokolagenową. Powstaje sztywny, aperystaltyczny odcinek, który nie przekazuje fali skurczowej.",
      target: "Połączenie miedniczkowo-moczowodowe (UPJ)",
      desc: "Brak fali perystaltycznej tworzy czynnościową i anatomiczną przeszkodę dla odpływu moczu."
    },
    {
      badge: "KROK 2: WZROST CIŚNIENIA I WODONERCZE",
      title: "Retencja moczu i rozstrzeń miedniczki (wodonercze)",
      short: "Wzrost ciśnienia hydrostatycznego w UKM (SFU I-IV)",
      detail: "Niemożność sprawnego przepchnięcia moczu do moczowodu prowadzi do jego gromadzenia w miedniczce nerkowej. Ciśnienie hydrostatyczne w UKM gwałtownie wzrasta, powodując rozciągnięcie i powiększenie miedniczki (APD >20-35 mm) oraz balonowate poszerzenie kielichów nerkowych z odgięciem i zatarciem brodawek nerkowych.",
      target: "Układ kielichowo-miedniczkowy (UKM)",
      desc: "Balonowate rozdęcie miedniczki i kielichów z uciskiem brodawek nerkowych."
    },
    {
      badge: "KROK 3: TRANSMISJA WSTECZNA I ISCHEMIA KORY",
      title: "Ucisk mikrokrążenia i apoptoza cewek nerkowych",
      short: "Niedotlenienie miąższu nerkowego i spadek GFR",
      detail: "Wysokie ciśnienie przenosi się wstecznie na cewki zbiorcze i nefrony. Dochodzi do ucisku naczyń włosowatych okołocewkowych i tętniczek międzypłacikowych w korze nerki. Przewlekłe niedokrwienie (hipoksja) indukuje wydzielanie TGF-beta, apoptozę komórek nabłonka cewek nerkowych, ścieńczenie warstwy miąższowej kory nerkowej (<3 mm) oraz spadek filtracji kłębuszkowej (DRF <40%).",
      target: "Cewki nerkowe i mikrokrążenie kory nerek",
      desc: "Ścieńczenie miąższu nerkowego i postępująca utrata nefronów."
    },
    {
      badge: "KROK 4: REGENERACJA PO PIELOPLASTYCE",
      title: "Odbarczenie ciśnienia i plastyczność niemowlęca",
      short: "Przerost kompensacyjny i odbudowa kory nerkowej",
      detail: "Wczesne chirurgiczne odbarczenie przeszkody (pieloplastyka Hynesa-Andersona) przed wystąpieniem nieodwracalnego zwłóknienia usuwa wysokie ciśnienie wsteczne. U niemowląt, dzięki wysokiemu potencjałowi proliferacyjnemu i plastyczności rosnących nefronów, dochodzi do ustąpienia obrzęku, wznowienia filtracji i wyraźnego pogrubienia warstwy miąższowej nerek (wzrost DRF).",
      target: "Kora nerki po zabiegu rekonstrukcyjnym",
      desc: "Znakomity potencjał regeneracyjny kory nerkowej u niemowląt po wczesnym zabiegu."
    }
  ],
  diffTable: {
    title: "Diagnostyka różnicowa poszerzenia układu moczowego i mas brzusznych u niemowląt",
    headers: ["Cecha", "Zwężenie UPJO", "Odpływ wsteczny (VUR)", "Zwężenie UVJO (Megaureter)", "Dysplazja wielotorbielowata (MCDK)"],
    rows: [
      ["Lokalizacja przeszkody", "Połączenie miedniczkowo-moczowodowe", "Ujście pęcherzowo-moczowodowe", "Połączenie moczowodowo-pęcherzowe", "Całkowity brak drożności dróg moczowych"],
      ["Obraz USG moczowodu", "Moczowód NIEWIDOCZNY (wąski)", "Moczowód poszerzony i kręty", "Moczowód szeroki na całym przebiegu", "Brak typowego UKM; mnogie niekomunikujące się torbiele"],
      ["CUM (VCUG)", "Prawidłowy (brak odpływu)", "Odpływ kontrastu (stopnie I-V)", "Brak odpływu (lub wtórny)", "Zwykle brak odpływu"],
      ["Scyntygrafia MAG3", "Krzywa zaporowa nerki badanej (T1/2 >20 min)", "Prawidłowy klirens lub zaleganie wsteczne", "Zastój w moczowodzie", "Nerka niema scyntygraficznie (funkcja 0%)"],
      ["Czynność nerki (DRF)", "Zachowana, obniżona (30-45%)", "Prawidłowa lub obniżona przy bliznach", "Zazwyczaj zachowana", "Funkcja 0% (brak czynnego miąższu)"],
      ["Leczenie z wyboru", "Pieloplastyka sposobem Hynesa-Andersona", "Profilaktyka (CAP), zabieg STING", "Obserwacja, reimplantacja moczowodu", "Postępowanie zachowawcze (inwolucja torbieli)"]
    ]
  },
  dutySummary: {
    overview: "3-miesięczny Tymon z wrodzonym wodonerczem nerki lewej (UPJO) stopnia IV wg SFU, wykrytym prenatalnie i potwierdzonym po porodzie, z wyczuwalnym elastycznym oporem w lewym podżebrzu. Progresja APD do 35 mm ze ścieńczeniem miąższu kory do 2.8 mm. Scyntygrafia dynamiczna 99mTc-MAG3 (F+20) wykazała bezwzględną mechaniczną krzywą zaporową i spadek funkcji nerki lewej do 34%. Zakwalifikowany do pilnej pieloplastyki sposobem Hynesa-Andersona z czasowym szynowaniem moczowodu stentem Double-J, co doprowadziło do pełnego wyleczenia i regeneracji miąższu nerkowego.",
    diagnostics: "USG układu moczowego w 5. dobie i 3. miesiącu życia, renografia dynamiczna 99mTc-MAG3 z testem furosemidowym F+20, cystouretrografia mikcyjna (wykluczenie VUR), posiew moczu, kreatynina i mocznik.",
    drugsAndDoses: "1. Profilaktyka przeciwbakteryjna do czasu operacji: <span class='dose-pill'>Amoksycylina p.o. 10 mg/kg mc.</span> raz na dobę na noc (lub Cefadroksyl).<br>2. Śródoperacyjnie: <span class='dose-pill'>Cefazolina i.v. 50 mg/kg mc.</span> w profilaktyce okołooperacyjnej.<br>3. Analgezja pooperacyjna: <span class='dose-pill'>Paracetamol i.v. 15 mg/kg mc.</span> co 6h + Ibuprofen p.o.",
    procedures: "Operacja pieloplastyki sposobem Hynesa-Andersona (resekcja zwężenia UPJ z wytworzeniem szerokiego zespolenia miedniczkowo-moczowodowego), założenie stentu Double-J (JJ) do lewego moczowodu, cystoskopowe usunięcie stentu po 6 tygodniach.",
    monitoring: "Kontrola USG układu moczowego po 1, 3, 6 i 12 miesiącach od zabiegu, kontrolna scyntygrafia MAG3 po 6-12 miesiącach, pomiar ciśnienia tętniczego, monitorowanie diurezy."
  },
  lekQuestions: [
    {
      tag: "Optymalny czas USG po porodzie",
      q: "U noworodka z prenatalnie rozpoznanym wodonerczem lewostronnym, bez cech wady drugiej nerki ani pęcherza moczowego, pierwsze kontrolne USG jamy brzusznej po urodzeniu należy planowo wykonać:",
      opts: [
        "A. Między 3. a 7. dobą życia (po ustąpieniu fizjologicznej oligurii noworodkowej)",
        "B. W pierwszych 2 godzinach po porodzie",
        "C. Dopiero po ukończeniu 1. roku życia",
        "D. W 12. miesiącu życia przed podaniem szczepionki MMR",
        "E. Badanie USG po porodzie nie jest wskazane, jeśli dziecko oddaje mocz"
      ],
      options: [
        "A. Między 3. a 7. dobą życia (po ustąpieniu fizjologicznej oligurii noworodkowej)",
        "B. W pierwszych 2 godzinach po porodzie",
        "C. Dopiero po ukończeniu 1. roku życia",
        "D. W 12. miesiącu życia przed podaniem szczepionki MMR",
        "E. Badanie USG po porodzie nie jest wskazane, jeśli dziecko oddaje mocz"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "W pierwszych 48 godzinach życia noworodek wykazuje fizjologiczną oligurię i przejściowe odwodnienie, co powoduje zapadnięcie się miedniczek nerkowych i może skutkować fałszywie ujemnym wynikiem USG. Dlatego pierwsze planowe badanie wykonuje się standardowo między 3. a 7. dobą życia. Wyjątkiem jest podejrzenie zastawki cewki tylnej (PUV) u chłopców z obustronnym wodonerczem i powiększonym pęcherzem, gdzie USG wykonuje się natychmiast w 1. dobie.",
      expl: "W pierwszych 48 godzinach życia noworodek wykazuje fizjologiczną oligurię i przejściowe odwodnienie, co powoduje zapadnięcie się miedniczek nerkowych i może skutkować fałszywie ujemnym wynikiem USG. Dlatego pierwsze planowe badanie wykonuje się standardowo między 3. a 7. dobą życia. Wyjątkiem jest podejrzenie zastawki cewki tylnej (PUV) u chłopców z obustronnym wodonerczem i powiększonym pęcherzem, gdzie USG wykonuje się natychmiast w 1. dobie."
    },
    {
      tag: "Najczęstsza masa w jamie brzusznej",
      q: "Najczęstszą przyczyną wyczuwalnego oporu ('guza') w jamie brzusznej u noworodków i młodych niemowląt są:",
      opts: [
        "A. Wady wrodzone układu moczowego (przede wszystkim wodonercze i wielotorbielowata dysplazja nerki)",
        "B. Nerczak płodowy (guz Wilmsa)",
        "C. Nerwiak zarodkowy współczulny (neuroblastoma)",
        "D. Wątrobiak zarodkowy (hepatoblastoma)",
        "E. Potworniak dojrzały jajnika"
      ],
      options: [
        "A. Wady wrodzone układu moczowego (przede wszystkim wodonercze i wielotorbielowata dysplazja nerki)",
        "B. Nerczak płodowy (guz Wilmsa)",
        "C. Nerwiak zarodkowy współczulny (neuroblastoma)",
        "D. Wątrobiak zarodkowy (hepatoblastoma)",
        "E. Potworniak dojrzały jajnika"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Ponad 50-60% wszystkich wyczuwalnych mas w jamie brzusznej u noworodków i małych niemowląt stanowią anomalie nerkowe o charakterze nienowotworowym: wodonercze (UPJO) oraz wielotorbielowata dysplazja nerki (MCDK). Guzy lite wieku dziecięcego (neuroblastoma, guz Wilmsa) występują u starszych niemowląt i dzieci.",
      expl: "Ponad 50-60% wszystkich wyczuwalnych mas w jamie brzusznej u noworodków i małych niemowląt stanowią anomalie nerkowe o charakterze nienowotworowym: wodonercze (UPJO) oraz wielotorbielowata dysplazja nerki (MCDK). Guzy lite wieku dziecięcego (neuroblastoma, guz Wilmsa) występują u starszych niemowląt i dzieci."
    },
    {
      tag: "Złoty standard diagnostyki przeszkody",
      q: "Złotym standardem w różnicowaniu anatomicznej przeszkody zaporowej od nieobturacyjnego poszerzenia miedniczki nerkowej u dzieci jest:",
      opts: [
        "A. Dynamiczna scyntygrafia nerek (renografia) 99mTc-MAG3 z testem furosemidowym (F+20)",
        "B. Statyczna scyntygrafia nerek 99mTc-DMSA",
        "C. Cystouretrografia mikcyjna (CUM)",
        "D. Rezonans magnetyczny z kontrastem hepatotropowym",
        "E. Przeglądowe zdjęcie RTG jamy brzusznej na stojąco"
      ],
      options: [
        "A. Dynamiczna scyntygrafia nerek (renografia) 99mTc-MAG3 z testem furosemidowym (F+20)",
        "B. Statyczna scyntygrafia nerek 99mTc-DMSA",
        "C. Cystouretrografia mikcyjna (CUM)",
        "D. Rezonans magnetyczny z kontrastem hepatotropowym",
        "E. Przeglądowe zdjęcie RTG jamy brzusznej na stojąco"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Renografia dynamiczna z użyciem radioznacznika wydalanego przez cewki (99mTc-MAG3) w połączeniu z podaniem Furosemidu (protokół F+20) pozwala jednoznacznie ocenić kinetikę opróżniania UKM. Czas półtrwania wydalania T1/2 >20 minut po podaniu diuretyku i narastająca krzywa zaporowa potwierdzają mechaniczną przeszkodę w UPJO.",
      expl: "Renografia dynamiczna z użyciem radioznacznika wydalanego przez cewki (99mTc-MAG3) w połączeniu z podaniem Furosemidu (protokół F+20) pozwala jednoznacznie ocenić kinetikę opróżniania UKM. Czas półtrwania wydalania T1/2 >20 minut po podaniu diuretyku i narastająca krzywa zaporowa potwierdzają mechaniczną przeszkodę w UPJO."
    },
    {
      tag: "Wskazania do leczenia operacyjnego UPJO",
      q: "Które z poniższych kryteriów stanowi bezwzględne wskazanie do wykonania pieloplastyki u dziecka ze zwężeniem UPJO?",
      opts: [
        "A. Spadek względnego udziału chorej nerki w funkcji globalnej (DRF) poniżej 40% lub spadek o >5% w kolejnych badaniach scyntygraficznych",
        "B. Obecność poszerzenia miedniczki nerkowej o wymiarze APD 6 mm w 1. dobie życia",
        "C. Czas półtrwania wydalania T1/2 w renografii wynoszący 8 minut",
        "D. Prawidłowy symetryczny rozkład funkcji nerek 50% : 50% w scyntygrafii",
        "E. Izolowane zasinienie powłok brzusznych podczas płaczu"
      ],
      options: [
        "A. Spadek względnego udziału chorej nerki w funkcji globalnej (DRF) poniżej 40% lub spadek o >5% w kolejnych badaniach scyntygraficznych",
        "B. Obecność poszerzenia miedniczki nerkowej o wymiarze APD 6 mm w 1. dobie życia",
        "C. Czas półtrwania wydalania T1/2 w renografii wynoszący 8 minut",
        "D. Prawidłowy symetryczny rozkład funkcji nerek 50% : 50% w scyntygrafii",
        "E. Izolowane zasinienie powłok brzusznych podczas płaczu"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Wskazaniami do leczenia operacyjnego (pieloplastyki) wg ESPU są: 1) upośledzenie funkcji chorej nerki DRF <40%, 2) progresywny spadek DRF o >5% w powtarzanych badaniach, 3) krzywa zaporowa z T1/2 >20 min, 4) ciężkie wodonercze IV stopnia wg SFU z APD >20-30 mm, 5) objawy kliniczne (bóle, gorączkowe ZUM, kamica wtórna).",
      expl: "Wskazaniami do leczenia operacyjnego (pieloplastyki) wg ESPU są: 1) upośledzenie funkcji chorej nerki DRF <40%, 2) progresywny spadek DRF o >5% w powtarzanych badaniach, 3) krzywa zaporowa z T1/2 >20 min, 4) ciężkie wodonercze IV stopnia wg SFU z APD >20-30 mm, 5) objawy kliniczne (bóle, gorączkowe ZUM, kamica wtórna)."
    },
    {
      tag: "Technika operacyjna z wyboru",
      q: "Złotym standardem chirurgicznego leczenia wrodzonego zwężenia połączenia miedniczkowo-moczowodowego (UPJO) jest:",
      opts: [
        "A. Pieloplastyka sposobem Hynesa-Andersona (dismembered pyeloplasty)",
        "B. Pielotomia podłużna bez resekcji zwężenia",
        "C. Pętlowa uretrostomia skórna",
        "D. Podwieszenie nerki sposobem Rivoira",
        "E. Zabieg STING z wstrzyknięciem pasty Deflux"
      ],
      options: [
        "A. Pieloplastyka sposobem Hynesa-Andersona (dismembered pyeloplasty)",
        "B. Pielotomia podłużna bez resekcji zwężenia",
        "C. Pętlowa uretrostomia skórna",
        "D. Podwieszenie nerki sposobem Rivoira",
        "E. Zabieg STING z wstrzyknięciem pasty Deflux"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Pieloplastyka sposobem Hynesa-Andersona polega na wycięciu zwężonego, zmienionego chorobowo fragmentu połączenia miedniczkowo-moczowodowego, usunięciu nadmiaru ściany miedniczki nerkowej i ponownym, szerokim zespoleniu moczowodu z miedniczką. Skuteczność wynosi >95%.",
      expl: "Pieloplastyka sposobem Hynesa-Andersona polega na wycięciu zwężonego, zmienionego chorobowo fragmentu połączenia miedniczkowo-moczowodowego, usunięciu nadmiaru ściany miedniczki nerkowej i ponownym, szerokim zespoleniu moczowodu z miedniczką. Skuteczność wynosi >95%."
    },
    {
      tag: "Naczynie biegunowe dolne / Zespół Dietla",
      q: "U 11-letniego chłopca występują napadowe, silne bóle lewego boku i wymioty pojawiające się po wypiciu dużej ilości płynów (tzw. przełomy Dietla). W USG w trakcie bólu widoczne jest wodonercze lewostronne. Najbardziej prawdopodobną przyczyną tych dolegliwości jest:",
      opts: [
        "A. Zewnętrzny ucisk połączenia miedniczkowo-moczowodowego przez dodatkowe naczynie biegunowe dolne nerki",
        "B. Zastawka cewki tylnej",
        "C. Zespół nerczycowy o zmianach minimalnych",
        "D. Pęknięcie torbieli jajnika",
        "E. Odpływ pęcherzowo-moczowodowy I stopnia"
      ],
      options: [
        "A. Zewnętrzny ucisk połączenia miedniczkowo-moczowodowego przez dodatkowe naczynie biegunowe dolne nerki",
        "B. Zastawka cewki tylnej",
        "C. Zespół nerczycowy o zmianach minimalnych",
        "D. Pęknięcie torbieli jajnika",
        "E. Odpływ pęcherzowo-moczowodowy I stopnia"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Klasyczny opis przełomu Dietla (Dietl's crisis) u starszych dzieci i młodzieży: napadowe rozdęcie miedniczki i ostry ból w boku z wymiotami indukowany obfitym spożyciem płynów (nagła poliuria), spowodowany zagięciem moczowodu na krzyżującym go od przodu naczyniu biegunowym dolnym nerki (aberrant lower pole vessel).",
      expl: "Klasyczny opis przełomu Dietla (Dietl's crisis) u starszych dzieci i młodzieży: napadowe rozdęcie miedniczki i ostry ból w boku z wymiotami indukowany obfitym spożyciem płynów (nagła poliuria), spowodowany zagięciem moczowodu na krzyżującym go od przodu naczyniu biegunowym dolnym nerki (aberrant lower pole vessel)."
    },
    {
      tag: "Klasyfikacja SFU wodonercza",
      q: "Czwarty (IV) stopień wodonercza wg klasyfikacji Society for Fetal Urology (SFU) charakteryzuje się:",
      opts: [
        "A. Poszerzeniem miedniczki i wszystkich kielichów ze znacznym ścieńczeniem miąższu kory nerki",
        "B. Izolowanym poszerzeniem miedniczki nerkowej bez poszerzenia kielichów",
        "C. Prawidłowym układem kielichowo-miedniczkowym",
        "D. Poszerzeniem miedniczki i jedynie kilku kielichów z prawidłową grubością kory",
        "E. Całkowitym zanikiem nerki i brakiem unaczynienia"
      ],
      options: [
        "A. Poszerzeniem miedniczki i wszystkich kielichów ze znacznym ścieńczeniem miąższu kory nerki",
        "B. Izolowanym poszerzeniem miedniczki nerkowej bez poszerzenia kielichów",
        "C. Prawidłowym układem kielichowo-miedniczkowym",
        "D. Poszerzeniem miedniczki i jedynie kilku kielichów z prawidłową grubością kory",
        "E. Całkowitym zanikiem nerki i brakiem unaczynienia"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Klasyfikacja SFU: Stopień 0: norma; Stopień I: poszerzenie samej miedniczki; Stopień II: poszerzenie miedniczki i kilku kielichów; Stopień III: poszerzenie miedniczki i wszystkich kielichów z zachowanym prawidłowym miąższem kory; Stopień IV: poszerzenie miedniczki i wszystkich kielichów z wyraźnym ścieńczeniem miąższu nerkowego (redukcja grubości kory).",
      expl: "Klasyfikacja SFU: Stopień 0: norma; Stopień I: poszerzenie samej miedniczki; Stopień II: poszerzenie miedniczki i kilku kielichów; Stopień III: poszerzenie miedniczki i wszystkich kielichów z zachowanym prawidłowym miąższem kory; Stopień IV: poszerzenie miedniczki i wszystkich kielichów z wyraźnym ścieńczeniem miąższu nerkowego (redukcja grubości kory)."
    },
    {
      tag: "Rola stentu Double-J (JJ)",
      q: "W jakim celu podczas operacji pieloplastyki wprowadza się do moczowodu stent typu Double-J (JJ)?",
      opts: [
        "A. Aby zapewnić drożność i zabezpieczyć zespolenie miedniczkowo-moczowodowe przed wyciekiem moczu i zarośnięciem bliznowatym w okresie gojenia",
        "B. W celu stałego rozszerzania cewki moczowej u chłopców",
        "C. Jako nośnik dla chemioterapii przeciwnowotworowej",
        "D. Aby zablokować całkowicie odpływ moczu z operowanej nerki",
        "E. Stent zakłada się w celu pobierania wymazów bakteriologicznych co 12 godzin"
      ],
      options: [
        "A. Aby zapewnić drożność i zabezpieczyć zespolenie miedniczkowo-moczowodowe przed wyciekiem moczu i zarośnięciem bliznowatym w okresie gojenia",
        "B. W celu stałego rozszerzania cewki moczowej u chłopców",
        "C. Jako nośnik dla chemioterapii przeciwnowotworowej",
        "D. Aby zablokować całkowicie odpływ moczu z operowanej nerki",
        "E. Stent zakłada się w celu pobierania wymazów bakteriologicznych co 12 godzin"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Cewnik moczowodowy Double-J szynuje zespolenie chirurgiczne, odbarcza linię szwów przed nadmiernym ciśnieniem hydrostatycznym, zapobiega powstawaniu zacieku moczowego w przestrzeni zaotrzewnowej oraz przeciwdziała wtórnemu zwężeniu bliznowatemu.",
      expl: "Cewnik moczowodowy Double-J szynuje zespolenie chirurgiczne, odbarcza linię szwów przed nadmiernym ciśnieniem hydrostatycznym, zapobiega powstawaniu zacieku moczowego w przestrzeni zaotrzewnowej oraz przeciwdziała wtórnemu zwężeniu bliznowatemu."
    },
    {
      tag: "Wskaż zdanie fałszywe / UPJO u dzieci",
      q: "Wskaż zdanie FAŁSZYWE dotyczące wrodzonego zwężenia połączenia miedniczkowo-moczowodowego (UPJO):",
      opts: [
        "A. W badaniu USG moczowód poniżej zwężenia jest zazwyczaj poszerzony i poskręcany na całej długości",
        "B. Zwężenie UPJO jest najczęstszą przyczyną wodonercza u noworodków i niemowląt",
        "C. Wada występuje częściej u chłopców i częściej dotyczy nerki lewej",
        "D. U niemowląt po skutecznym odbarczeniu przeszkody możliwa jest znaczna regeneracja grubości miąższu nerkowego",
        "E. Renografia dynamiczna MAG3 pozwala na jednoczesną ocenę odpływu moczu i względnej funkcji nerek"
      ],
      options: [
        "A. W badaniu USG moczowód poniżej zwężenia jest zazwyczaj poszerzony i poskręcany na całej długości",
        "B. Zwężenie UPJO jest najczęstszą przyczyną wodonercza u noworodków i niemowląt",
        "C. Wada występuje częściej u chłopców i częściej dotyczy nerki lewej",
        "D. U niemowląt po skutecznym odbarczeniu przeszkody możliwa jest znaczna regeneracja grubości miąższu nerkowego",
        "E. Renografia dynamiczna MAG3 pozwala na jednoczesną ocenę odpływu moczu i względnej funkcji nerek"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Zdanie A jest FAŁSZYWE (i stanowi poprawną odpowiedź). W UPJO przeszkoda znajduje się na szczycie moczowodu (w miejscu połączenia z miedniczką), dlatego moczowód poniżej przeszkody jest WĄSKI, NIEPOSZERZONY i w USG całkowicie niewidoczny. Poszerzenie moczowodu (megaureter) występuje w refluksie (VUR) lub przeszkodzie na poziomie połączenia z pęcherzem (UVJO).",
      expl: "Zdanie A jest FAŁSZYWE (i stanowi poprawną odpowiedź). W UPJO przeszkoda znajduje się na szczycie moczowodu (w miejscu połączenia z miedniczką), dlatego moczowód poniżej przeszkody jest WĄSKI, NIEPOSZERZONY i w USG całkowicie niewidoczny. Poszerzenie moczowodu (megaureter) występuje w refluksie (VUR) lub przeszkodzie na poziomie połączenia z pęcherzem (UVJO)."
    },
    {
      tag: "Wskazania do nefrektomii",
      q: "Pierwotne wycięcie nerki (nefrektomię) u dziecka z jednostronnym wodonerczem w przebiegu UPJO rozważa się wyłącznie w przypadku:",
      opts: [
        "A. Spadku udziału chorej nerki w funkcji globalnej (DRF) poniżej 10–15% w połączeniu z ciężką dysplazją/ścieńczeniem miąższu i prawidłową nerką przeciwległą",
        "B. Każdego przypadku wodonercza stopnia IV wg SFU",
        "C. Wystąpienia pojedynczego epizodu zakażenia układu moczowego",
        "D. Obecności naczynia biegunowego dolnego",
        "E. Gdy wymiar APD miedniczki przekroczy 20 mm"
      ],
      options: [
        "A. Spadku udziału chorej nerki w funkcji globalnej (DRF) poniżej 10–15% w połączeniu z ciężką dysplazją/ścieńczeniem miąższu i prawidłową nerką przeciwległą",
        "B. Każdego przypadku wodonercza stopnia IV wg SFU",
        "C. Wystąpienia pojedynczego epizodu zakażenia układu moczowego",
        "D. Obecności naczynia biegunowego dolnego",
        "E. Gdy wymiar APD miedniczki przekroczy 20 mm"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Nefrektomia jest zabiegiem ostatecznym i w urologii dziecięcej wykonuje się ją wyjątkowo rzadko – wyłącznie wtedy, gdy chora nerka wykazuje znikomą funkcję resztkową (DRF <10-15%), a nerka przeciwległa jest całkowicie zdrowa. Każda nerka z zachowaną funkcją >15-20% kwalifikuje się do operacji rekonstrukcyjnej (pieloplastyki).",
      expl: "Nefrektomia jest zabiegiem ostatecznym i w urologii dziecięcej wykonuje się ją wyjątkowo rzadko – wyłącznie wtedy, gdy chora nerka wykazuje znikomą funkcję resztkową (DRF <10-15%), a nerka przeciwległa jest całkowicie zdrowa. Każda nerka z zachowaną funkcją >15-20% kwalifikuje się do operacji rekonstrukcyjnej (pieloplastyki)."
    },
    {
      tag: "Drenaż odbarczający w pyonephrosis",
      q: "U niemowlęcia z wodonerczem UPJO dochodzi do nagłego wzrostu gorączki do 40°C, posocznicy i pojawienia się gęstej ropy w miedniczce nerkowej (ropomocz / pyonephrosis). Postępowaniem ratunkowym z wyboru jest:",
      opts: [
        "A. Pilne przezskórne założenie nefrostomii odbarczającej (lub pilne założenie stentu moczowodowego) pod osłoną antybiotykoterapii",
        "B. Natychmiastowa wielogodzinna planowa rekonstrukcja metodą Hynesa-Andersona",
        "C. Podanie leków przeciwbólowych i obserwacja domowa",
        "D. Doustna terapia furazydyną przez 30 dni",
        "E. Wykonanie biopsji kory nerki"
      ],
      options: [
        "A. Pilne przezskórne założenie nefrostomii odbarczającej (lub pilne założenie stentu moczowodowego) pod osłoną antybiotykoterapii",
        "B. Natychmiastowa wielogodzinna planowa rekonstrukcja metodą Hynesa-Andersona",
        "C. Podanie leków przeciwbólowych i obserwacja domowa",
        "D. Doustna terapia furazydyną przez 30 dni",
        "E. Wykonanie biopsji kory nerki"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Zakażone wodonercze pod ciśnieniem (ropowica UKM / pyonephrosis) w obecności przeszkody zaporowej jest bezpośrednim zagrożeniem życia z powodu urosepsy i wstrząsu septycznego. Wymaga natychmiastowego odbarczenia zastoju drogą nakłucia przezskórnego nerki (nefrostomia przezskórna – PCN) lub założenia stentu JJ oraz dożylnej antybiotykoterapii o szerokim spektrum. Operację rekonstrukcyjną odracza się do pełnego wyleczenia sepsy.",
      expl: "Zakażone wodonercze pod ciśnieniem (ropowica UKM / pyonephrosis) w obecności przeszkody zaporowej jest bezpośrednim zagrożeniem życia z powodu urosepsy i wstrząsu septycznego. Wymaga natychmiastowego odbarczenia zastoju drogą nakłucia przezskórnego nerki (nefrostomia przezskórna – PCN) lub założenia stentu JJ oraz dożylnej antybiotykoterapii o szerokim spektrum. Operację rekonstrukcyjną odracza się do pełnego wyleczenia sepsy."
    }
  ],
  flashcards: [
    {
      q: "Dlaczego pierwsze USG u noworodka z prenatalnym wodonerczem wykonuje się po 3.–7. dobie życia?",
      a: "Ponieważ w pierwszych 48 godzinach życia noworodek znajduje się w stanie fizjologicznej oligurii, co obniża wypełnienie miedniczek i może dać wynik fałszywie ujemny."
    },
    {
      q: "Jakie badanie jest złotym standardem oceny przeszkody zaporowej w UPJO?",
      a: "Dynamiczna scyntygrafia nerek 99mTc-MAG3 z testem furosemidowym (protokół F+20) – krzywa zaporowa z T1/2 >20 min potwierdza przeszkodę mechaniczną."
    },
    {
      q: "Jakie są główne wskazania do operacji w UPJO wg ESPU?",
      a: "1. Spadek względnej funkcji chorej nerki DRF <40% (lub spadek >5% w dynamice)\n2. Wodonercze IV stopnia wg SFU (APD >20–30 mm)\n3. T1/2 >20 min w MAG3\n4. Objawy kliniczne (ZUM, ból)."
    },
    {
      q: "Jaka jest operacja z wyboru w zwężeniu połączenia miedniczkowo-moczowodowego?",
      a: "Pieloplastyka sposobem Hynesa-Andersona (resekcyjne wycięcie zwężenia i wytworzenie szerokiego zespolenia miedniczkowo-moczowodowego)."
    },
    {
      q: "Czym jest przełom Dietla (Dietl's crisis)?",
      a: "Napadowy ból boku i wymioty po wypiciu dużej ilości płynów u starszych dzieci z UPJO, najczęściej w wyniku ucisku moczowodu przez naczynie biegunowe dolne nerki."
    },
    {
      q: "Dlaczego moczowód w czystym UPJO jest niewidoczny w badaniu USG?",
      a: "Ponieważ przeszkoda zlokalizowana jest na samym szczycie moczowodu (w połączeniu z miedniczką), więc moczowód poniżej jest wiotki i nieposzerzony."
    }
  ]
};

// ==========================================
// CASE 110: Odra u nieszczepionego 4-latka
// ==========================================
const case110Data = {
  id: 110,
  filename: "110_odra_morbilli.json",
  dept: "Choroby zakaźne",
  shortTitle: "4-letni Antoś – Wysoka gorączka, triada '3C', plamki Koplika i zstępująca osutka (Odra / Morbilli)",
  diagnosisTitle: "Odra (Morbilli / Measles) o ciężkim przebiegu powikłana wczesnym odrowym zapaleniem płuc u nieszczepionego dziecka",
  vitals: [
    { label: "Akcja serca (HR)", val: "142/min", sub: "Tachykardia (gorączka i hipoksemia)", status: "warn" },
    { label: "Ciśnienie tętnicze", val: "96/60 mmHg", sub: "W normie", status: "ok" },
    { label: "Saturacja SpO2", val: "93%", sub: "Hipoksemia na powietrzu atmosferycznym", status: "crit" },
    { label: "Częstość oddechów", val: "36/min", sub: "Tachypnoe / duszność", status: "crit" },
    { label: "Temperatura ciała", val: "39.8°C", sub: "Wysoka gorączka", status: "crit" }
  ],
  vitalsObj: { hr: 142, bp: "96/60", spo2: 93, rr: 36, temp: 39.8, gcs: 14 },
  story: "4-letni Antoś został przyjęty na Oddział Obserwacyjno-Zakaźny Dziecięcy w stanie średnio-ciężkim. Od 4 dni chłopiec wysoko gorączkuje do 39.5–40.0°C, ma męczący, szczekający kaszel, obfity surowiczy katar oraz intensywne obustronne zapalenie spojówek ze światłowstrętem i obrzękiem powiek (klasyczna triada prodromalna '3C': Cough, Coryza, Conjunctivitis). Dziecko płacze przy zapaleniu światła i chowa twarz w poduszkę. 2 dni temu matka zauważyła na wewnętrznej stronie policzków drobne białawe grudki. Dziś rano za uszami i na linii owłosienia głowy pojawiła się ciemnoczerwona, gruboplamisto-grudkowa wysypka, która szybko zstępuje na twarz, szyję i klatkę piersiową. W ciągu ostatnich godzin chłopiec stał się podsypiający, a oddech stał się przyspieszony i spłycony (RR 36/min, SpO2 93%). W wywiadzie: rodzice odmówili szczepień ochronnych – dziecko nie otrzymało żadnej dawki szczepionki przeciwko odrze (MMR). 10 dni temu rodzina wróciła z wakacji w rejonie o niskim wskaźniku wyszczepienia.",
  labs: {
    "Morfologia i biochemia": [
      { name: "Leukocyty (WBC)", val: "3.1 G/L", norm: "5.5 - 12.0 G/L", flag: "CRIT_LOW" },
      { name: "Limfocyty", val: "0.9 G/L", norm: "1.5 - 5.0 G/L (limfopenia odrowa)", flag: "CRIT_LOW" },
      { name: "Neutrofile", val: "1.9 G/L", norm: "2.0 - 6.0 G/L", flag: "L" },
      { name: "Płytki krwi (PLT)", val: "135 G/L", norm: "150 - 450 G/L", flag: "L" },
      { name: "Hemoglobina", val: "12.3 g/dl", norm: "11.5 - 13.5 g/dl", flag: "NORMAL" },
      { name: "CRP (białko C-reaktywne)", val: "16 mg/l", norm: "<5.0 mg/l (wirusowe zapalenie)", flag: "H" },
      { name: "Prokalcytonina", val: "0.12 ng/ml", norm: "<0.5 ng/ml (brak sepsy bakteryjnej)", flag: "NORMAL" },
      { name: "ALT / AST", val: "48 / 54 U/l", norm: "<35 U/l (łagodne odrowe zapalenie wątroby)", flag: "H" }
    ],
    "Wirusologia i diagnostyka mikrobiologiczna": [
      { name: "Wymaz z nosogardła RT-PCR wirus odry", val: "DODATNI (wykryto RNA Measles virus)", norm: "Ujemny", flag: "CRIT_HIGH" },
      { name: "Swoiste przeciwciała anty-Measles IgM", val: "DODATNIE (indeks 4.8)", norm: "Ujemne (<0.9)", flag: "CRIT_HIGH" },
      { name: "Swoiste przeciwciała anty-Measles IgG", val: "UJEMNE (brak przeciwciał poszczepiennych/przebytych)", norm: "Dodatnie przy odporności", flag: "NORMAL" },
      { name: "Cytologia plwociny", val: "Obecne wielojądrzaste komórki olbrzymie Warthina-Finkeldeya", norm: "Nieobecne", flag: "CRIT_HIGH" },
      { name: "RTG klatki piersiowej", val: "Obustronne śródmiąższowe zagęszczenia siateczkowate, okołowzmożony rysunek naczyniowy – odrowe zapalenie płuc Hechta.", norm: "Prawidłowy miąższ płucny", flag: "CRIT_HIGH" }
    ]
  },
  steps: [
    {
      stepNum: 1,
      title: "Krok 1: Wstępna ocena kliniczna okresu prodromalnego – triada '3C'",
      desc: "Do oddziału trafia nieszczepiony 4-letni chłopiec z gorączką 39.8°C, męczącym szczekającym kaszlem, obfitym katarzem oraz obustronnym zapaleniem spojówek z intensywnym światłowstrętem. Chłopiec chowa twarz w poduszkę przy próbie zaświecenia latarki. Jaka klasyczna triada objawów zwiastunowych (prodromalnych) nasuwa natychmiastowe podejrzenie odry?",
      scenario: "Do oddziału trafia nieszczepiony 4-letni chłopiec z gorączką 39.8°C, męczącym szczekającym kaszlem, obfitym katarzem oraz obustronnym zapaleniem spojówek z intensywnym światłowstrętem. Chłopiec chowa twarz w poduszkę przy próbie zaświecenia latarki. Jaka klasyczna triada objawów zwiastunowych (prodromalnych) nasuwa natychmiastowe podejrzenie odry?",
      options: [
        {
          text: "Triada '3C': kaszel (Cough), nieżyt nosa (Coryza) oraz zapalenie spojówek ze światłowstrętem (Conjunctivitis)",
          feedback: "✅ PRAWIDŁOWO! Podręcznikowy obraz prodromalny odry (trwający zwykle 2–4 dni przed wysypką)! Charakteryzuje się wysoką gorączką i klasyczną triadą '3C': 1) kaszel (Cough) – suchy, męczący, szczekający, 2) nieżyt nosa (Coryza) – obfity surowiczo-śluzowy wyciek, 3) zapalenie spojówek (Conjunctivitis) – intensywny światłowstręt (photophobia), obrzęk powiek i łzawienie. U nieszczepionego dziecka w połączeniu z wywiadem podróży triada 3C jest wysoce swoista."
        },
        {
          text: "Triada Cushinga: nadciśnienie tętnicze, bradykardia i nieregularny oddech",
          feedback: "❌ BŁĄD! Triada Cushinga wskazuje na ciasnotę wewnątrzczaszkową i wgłobienie mózgu, a nie na chorobę wysypkową."
        },
        {
          text: "Triada Charcota: ból w prawym podżebrzu, żółtaczka i gorączka z dreszczami",
          feedback: "❌ BŁĄD! Triada Charcota to objaw ostrego zapalenia dróg żółciowych."
        },
        {
          text: "Triada Hutchinsona: zęby Hutchinsona, głuchota błędnikowa i śródmiąższowe zapalenie rogówki",
          feedback: "❌ BŁĄD! Triada Hutchinsona jest późnym objawem kiły wrodzonej."
        }
      ]
    },
    {
      stepNum: 2,
      title: "Krok 2: Badanie jamy ustnej i identyfikacja objawu patognomonicznego",
      desc: "Przystępujesz do badania jamy ustnej Antosia. Na błonie śluzowej policzków, na wysokości dolnych zębów trzonowych i przedtrzonowych, dostrzegasz liczne, drobne białawe plamki wielkości ziaren piasku, otoczone żywoczerwoną obwódką rumieniową. Co to za objaw i jakie ma znaczenie kliniczne?",
      scenario: "Przystępujesz do badania jamy ustnej Antosia. Na błonie śluzowej policzków, na wysokości dolnych zębów trzonowych i przedtrzonowych, dostrzegasz liczne, drobne białawe plamki wielkości ziaren piasku, otoczone żywoczerwoną obwódką rumieniową. Co to za objaw i jakie ma znaczenie kliniczne?",
      options: [
        {
          text: "Są to plamki Koplika (plamki Fiłatowa-Koplika) – patognomoniczny objaw odry wyprzedzający wysypkę o 24–48 godzin",
          feedback: "✅ PRAWIDŁOWO! KARDYNALNE PYTANIE LEK! Plamki Koplika są objawem PATOGNOMONICZNYM dla odry (ich obecność przesądza o rozpoznaniu). Mają postać drobnych biało-szarych grudek ('ziarenka soli/piasku') na rumieniowym podłożu na śluzówce policzków naprzeciw zębów trzonowych. Pojawiają się na 1–2 dni przed wysypką skórną i szybko znikają (ulegają złuszczeniu) w 1.–2. dobie od pojawienia się osutki na skórze."
        },
        {
          text: "Są to plamki Forchheimera typowe dla różyczki",
          feedback: "❌ BŁĄD! Plamki Forchheimera to drobne wybroczyny na podniebieniu miękkim występujące w różyczce (nie są patognomoniczne)."
        },
        {
          text: "Są to afty drożdżakowe (pleśniawki) wywołane zakażeniem Candida albicans",
          feedback: "❌ BŁĄD! Pleśniawki tworzą białe serowate naloty na języku i podniebieniu dające się zetrzeć szpatułką. Plamki Koplika to grudki naczyniowe ze stanem martwiczym nabłonka."
        },
        {
          text: "Są to objawy wścieklizny w jamie ustnej",
          feedback: "❌ BŁĄD! Wścieklizna nie daje białych grudek na błonie śluzowej policzków."
        }
      ]
    },
    {
      stepNum: 3,
      title: "Krok 3: Analiza morfologii i dynamiki osutki odrowej",
      desc: "Wysypka pojawiła się dziś rano: zaczęła się za uszami i na czole wzdłuż linii włosów, po czym szybko zstępuje na twarz, szyję i klatkę piersiową. Wykwity są gruboplamiste i grudkowe, barwy żywoczerwonej, miejscami zlewają się ze sobą, a skóra pomiędzy nimi jest zmieniona zapalnie. Jak będzie ewoluować ta osutka w kolejnych dobach?",
      scenario: "Wysypka pojawiła się dziś rano: zaczęła się za uszami i na czole wzdłuż linii włosów, po czym szybko zstępuje na twarz, szyję i klatkę piersiową. Wykwity są gruboplamiste i grudkowe, barwy żywoczerwonej, miejscami zlewają się ze sobą, a skóra pomiędzy nimi jest zmieniona zapalnie. Jak będzie ewoluować ta osutka w kolejnych dobach?",
      options: [
        {
          text: "Wysypka zstępuje w dół ciała (tułów, kończyny do dłoni i stóp), po czym ustępuje w tej samej kolejności, ciemniejąc (barwa miedziana/brunatna) i pozostawiając drobne, otrębiaste łuszczenie naskórka",
          feedback: "✅ PRAWIDŁOWO! Klasyczna dynamika osutki odrowej: 1) zstępujący charakter (od głowy i zausznej linii włosów, przez szyję, tułów, aż po kończyny w ciągu 2-3 dni), 2) wykwity gruboplamisto-grudkowe o tendencji do zlewania się ('twarz odrowa'), 3) ustępowanie po 3-5 dniach w tej samej kolejności z charakterystycznymi brunatno-miedzianymi przebarwieniami (pozapalna hemosyderoza) oraz drobnym otrębiastym łuszczeniem się naskórka (pityriasis)."
        },
        {
          text: "Wysypka w ciągu 12 godzin przekształca się w pęcherzyki wypełnione płynem, a następnie w miodowe strupy",
          feedback: "❌ BŁĄD! Przekształcanie się plamek w grudki, pęcherzyki i strupy (obraz 'gwieździstego nieba') jest patognomoniczne dla ospy wietrznej (Varicella), a nie odry!"
        },
        {
          text: "Wysypka dotyczy wyłącznie powierzchni wyprostnych kończyn i ustępuje bez śladu w ciągu 2 godzin",
          feedback: "❌ BŁĄD! Taki obraz odpowiada pokrzywce lub rumieniowi wielopostaciowemu."
        },
        {
          text: "Wysypka jest drobno-plamista jak 'ukłucia igłą' i gromadzi się w fałdach skórnych (linie Pastii)",
          feedback: "❌ BŁĄD! Drobno-plamista wysypka ('papier ścierny') z liniami Pastii i 'malinowym językiem' to płonica (szkarlatyna wywołana przez paciorkowca grupy A)."
        }
      ]
    },
    {
      stepNum: 4,
      title: "Krok 4: Skrajna zakaźność, wskaźnik R0 i natychmiastowa izolacja pacjenta",
      desc: "Rozpoznajesz odrę. Jaka jest zakaźność wirusa odry (wskaźnik R0), jaka jest droga transmisji i w jakim przedziale czasowym pacjent zakaża otoczenie?",
      scenario: "Rozpoznajesz odrę. Jaka jest zakaźność wirusa odry (wskaźnik R0), jaka jest droga transmisji i w jakim przedziale czasowym pacjent zakaża otoczenie?",
      options: [
        {
          text: "Wirus odry jest jednym z najbardziej zakaźnych patogenów świata (R0 = 12–18), przenosi się drogą powietrzną i kropelkową; chory zakaża od 4 dni przed pojawieniem się wysypki do 4 dni po jej wystąpieniu – wymaga natychmiastowej izolacji w izolatce z podciśnieniem",
          feedback: "✅ PRAWIDŁOWO! KARDYNALNA WIEDZA EPIDEMIOLOGICZNA! Wirus odry cechuje się skrajnie wysokim wskaźnikiem reprodukcji R0 wynoszącym 12–18 (jeden chory zakaża średnio 12-18 osób podatnych!). Aerozol wirusowy unosi się w powietrzu pomieszczenia nawet do 2 godzin po wyjściu chorego! Okres zakaźności trwa od 4 dni PRZED pojawieniem się wysypki skórnej do 4 dni PO jej wystąpieniu. Wymaga bezwzględnej izolacji powietrzno-kropelkowej (najlepiej w izolatce z ujemnym ciśnieniem), a personel musi stosować maski FFP2/FFP3."
        },
        {
          text: "Odra przenosi się wyłącznie drogą płciową, chory nie zakaża drogą oddechową",
          feedback: "❌ BŁĄD! Odra przenosi się drogą powietrzno-kropelkową i przez aerozole."
        },
        {
          text: "Zakaźność wynosi R0 = 1, a pacjent zakaża tylko przez 1 godzinę na szczycie gorączki",
          feedback: "❌ BŁĄD! Zakaźność odry jest najwyższa spośród powszechnych chorób zakaźnych (R0 12-18)."
        },
        {
          text: "Pacjent przestaje zakażać z chwilą pojawienia się pierwszych wykwitów na skórze",
          feedback: "❌ BŁĄD! Pacjent zakaża jeszcze przez 4 dni po wystąpieniu wysypki!"
        }
      ]
    },
    {
      stepNum: 5,
      title: "Krok 5: Farmakoterapia celowana wg wytycznych WHO – podanie witaminy A",
      desc: "Antoś został przyjęty na oddział z potwierdzoną odrą. Jaki lek ma udowodnioną skuteczność i jest BEZWZGLĘDNIE ZALECANY przez Światową Organizację Zdrowia (WHO) oraz ESPID u każdego dziecka z rozpoznaną odrą?",
      scenario: "Antoś został przyjęty na oddział z potwierdzoną odrą. Jaki lek ma udowodnioną skuteczność i jest BEZWZGLĘDNIE ZALECANY przez Światową Organizację Zdrowia (WHO) oraz ESPID u każdego dziecka z rozpoznaną odrą?",
      options: [
        {
          text: "Witamina A (retinol) doustnie w dawce zależnej od wieku (dla 4-latka: 200 000 j.m. raz na dobę przez 2 kolejne dni)",
          feedback: "✅ PRAWIDŁOWO! BARDZO CZĘSTE PYTANIE LEK! Wytyczne WHO zalecają podanie witaminy A u WSZYSTKICH dzieci z rozpoznaną odrą, niezależnie od kraju zamieszkania. Odra wywołuje gwałtowny spadek stężenia retinolu w surowicy, co prowadzi do uszkodzenia nabłonków, ślepoty (keratomalacja) oraz upośledzenia odporności. Suplementacja witaminy A redukuje śmiertelność w odrze o ponad 50% oraz znacząco zmniejsza ryzyko powikłań płucnych! Dawkowanie: niemowlęta <6 m.ż. – 50 000 j.m., 6–11 m.ż. – 100 000 j.m., dzieci >=12 m.ż. – 200 000 j.m. doustnie przez 2 kolejne dni."
        },
        {
          text: "Acyklowir dożylnie w dawce 500 mg/m² co 8 godzin przez 14 dni",
          feedback: "❌ BŁĄD! Acyklowir działa na wirusy grupy Herpes (HSV, VZV), nie ma żadnej aktywności wobec wirusa odry (Paramyxoviridae)."
        },
        {
          text: "Oseltamiwir doustnie w dawce 75 mg dwa razy na dobę",
          feedback: "❌ BŁĄD! Oseltamiwir jest inhibitorem neuraminidazy wirusa grypy, nie działa na odrę."
        },
        {
          text: "Glikokortykosteroidy ogólnoustrojowo (Deksametazon 1 mg/kg) w celu zahamowania wysypki",
          feedback: "❌ BŁĄD! Rutynowe podawanie sterydów w odrze jest przeciwwskazane, gdyż pogłębia indukowaną przez wirusa immunosupresję i zwiększa ryzyko śmiertelnych nadkażeń bakteryjnych."
        }
      ]
    },
    {
      stepNum: 6,
      title: "Krok 6: Rozpoznanie i postępowanie w powikłaniach oddechowych",
      desc: "U Antosia saturacja wynosi 93% na powietrzu atmosferycznym, częstość oddechów 36/min, a w RTG klatki piersiowej widoczne są obustronne śródmiąższowe zagęszczenia siateczkowate. W cytologii plwociny stwierdzono komórki olbrzymie Warthina-Finkeldeya. Jak kwalifikujesz to powikłanie i jakie jest postępowanie?",
      scenario: "U Antosia saturacja wynosi 93% na powietrzu atmosferycznym, częstość oddechów 36/min, a w RTG klatki piersiowej widoczne są obustronne śródmiąższowe zagęszczenia siateczkowate. W cytologii plwociny stwierdzono komórki olbrzymie Warthina-Finkeldeya. Jak kwalifikujesz to powikłanie i jakie jest postępowanie?",
      options: [
        {
          text: "Pierwotne odrowe olbrzymiokomórkowe zapalenie płuc (zapalenie płuc Hechta); wymaga tlenoterapii biernej, nawilżania dróg oddechowych i monitorowania gazometrii; antybiotykoterapię włącza się tylko przy cechach wtórnego nadkażenia bakteryjnego",
          feedback: "✅ PRAWIDŁOWO! Zapalenie płuc jest najczęstszą przyczyną zgonu w przebiegu odry u dzieci. Może mieć charakter pierwotnego wirusowego zapalenia płuc (zapalenie olbrzymiokomórkowe Hechta z komórkami Warthina-Finkeldeya) lub wtórnego nadkażenia bakteryjnego (S. pneumoniae, S. aureus, H. influenzae). U Antosia niski poziom prokalcytoniny (0.12) i leukopenia wskazują na proces pierwotnie wirusowy. Podstawą jest tlenoterapia, toaleta drzewa oskrzelowego i ścisły nadzór. W razie pogorszenia i wzrostu PCT włącza się antybiotyk celowany."
        },
        {
          text: "Gruźlica prosówkowa płuc wymagająca natychmiastowej terapii 4 lekami przeciwprątkowymi",
          feedback: "❌ BŁĄD! Obraz jest typowy dla odrowego zapalenia płuc Hechta (komórki olbrzymie Warthina-Finkeldeya to zlane komórki zakażone wirusem odry pod wpływem białka F)."
        },
        {
          text: "Zatorowość płucna wymagająca natychmiastowej trombolizy alteplazą",
          feedback: "❌ BŁĄD! Zatorowość płucna u 4-letniego dziecka z odrą i wysypką jest rozpoznaniem błędnym."
        },
        {
          text: "Odma opłucnowa prężna wymagająca natychmiastowego nakłucia igłą w II przestrzeni międzyżebrowej",
          feedback: "❌ BŁĄD! Szmer pęcherzykowy jest symetryczny, a w RTG nie ma cech odmy."
        }
      ]
    },
    {
      stepNum: 7,
      title: "Krok 7: Prawne i epidemiologiczne obowiązki lekarza – profilaktyka poekspozycyjna kontaktu",
      desc: "Mama Antosia przyznaje, że w domu został 8-miesięczny brat Antosia (nieszczepiony na MMR z powodu wieku) oraz 28-letnia ciotka w 14. tygodniu ciąży, która nigdy nie chorowała na odrę i nie była szczepiona. Jakie pilne działania profilaktyki poekspozycyjnej (PEP) oraz obowiązki prawne musisz podjąć w ciągu 24 godzin?",
      scenario: "Mama Antosia przyznaje, że w domu został 8-miesięczny brat Antosia (nieszczepiony na MMR z powodu wieku) oraz 28-letnia ciotka w 14. tygodniu ciąży, która nigdy nie chorowała na odrę i nie była szczepiona. Jakie pilne działania profilaktyki poekspozycyjnej (PEP) oraz obowiązki prawne musisz podjąć w ciągu 24 godzin?",
      options: [
        {
          text: "Prawne zgłoszenie podejrzenia odry do PSSE w ciągu 24h (formularz ZLK-1). Profilaktyka poekspozycyjna: 8-miesięczny brat może otrzymać szczepionkę MMR do 72h od kontaktu LUB immunoglobulinę ludzką (HNIG) do 6 dni; ciężarna ciotka ma bezwzględne przeciwwskazanie do szczepionki żywej MMR i musi otrzymać immunoglobulinę (HNIG) do 6 dni od ekspozycji",
          feedback: "✅ PRAWIDŁOWO! KARDYNALNA WIEDZA PRAWNO-EPIDEMIOLOGICZNA! 1) Obowiązek prawny: Zgodnie z ustawą o chorobach zakaźnych lekarz ma prawny obowiązek zgłoszenia podejrzenia/rozpoznania odry do Państwowego Powiatowego Inspektora Sanitarnego (formularz ZLK-1) w ciągu 24 godzin! 2) Profilaktyka poekspozycyjna (PEP): Szczepionka MMR podana do 72 godzin od kontaktu chroni przed zachorowaniem u osób >=6.–9. miesiąca życia. Dla niemowląt <6 m.ż., kobiet w ciąży (dla których szczepionka żywa MMR jest BEZWZGLĘDNIE PRZECIWWSKAZANA) oraz osób z ciężkim niedoborem odporności metodą z wyboru jest podanie swoistej lub standardowej immunoglobuliny ludzkiej (HNIG) domięśniowo w ciągu 6 dni od ekspozycji."
        },
        {
          text: "Ciężarna ciotka powinna natychmiast przyjąć potrójną dawkę szczepionki żywej MMR",
          feedback: "❌ BŁĄD! KARDYNALNA PUŁAPKA! Żywe szczepionki (w tym MMR) są BEZWZGLĘDNIE PRZECIWWSKAZANE w ciąży ze względu na ryzyko teratogenności i infekcji płodu!"
        },
        {
          text: "Brak obowiązku zgłaszania odry do Sanepidu, gdyż choroba została wyeliminowana w Polsce",
          feedback: "❌ BŁĄD! Odra podlega ścisłemu, natychmiastowemu obowiązkowi rejestracji epidemiologicznej każdego przypadku."
        },
        {
          text: "Osobom z kontaktu należy podać profilaktycznie azytromycynę przez 14 dni",
          feedback: "❌ BŁĄD! Antybiotyki nie zapobiegają zakażeniu wirusem odry."
        }
      ]
    },
    {
      stepNum: 8,
      title: "Krok 8: Odległe powikłania neurologiczne i amnezja immunologiczna",
      desc: "Antoś powoli wraca do zdrowia. Podczas wypisu rodzice pytają o odległe konsekwencje przebycia odry. O jakich dwóch dramatycznych, odległych następstwach odry musi wiedzieć każdy lekarz (SSPE oraz tzw. amnezja immunologiczna)?",
      scenario: "Antoś powoli wraca do zdrowia. Podczas wypisu rodzice pytają o odległe konsekwencje przebycia odry. O jakich dwóch dramatycznych, odległych następstwach odry musi wiedzieć każdy lekarz (SSPE oraz tzw. amnezja immunologiczna)?",
      options: [
        {
          text: "1) Podostre stwardniające zapalenie mózgu (SSPE) rozwijające się po 5–10 latach jako śmiertelna encefalopatia, oraz 2) Amnezja immunologiczna (measles immune amnesia) kasująca pamięć limfocytów B i T na inne patogeny na 2–3 lata",
          feedback: "✅ PRAWIDŁOWO! FENOMENALNE I KLUCZOWE ASPEKTY WIEDZY O ODRZE! 1) SSPE (Subacute Sclerosing Panencephalitis) to rzadkie (1:10 000, ale u niemowląt nawet 1:1000) późne powikłanie rozwijające się po 5–10 latach wskutek przetrwałego, zmutowanego wirusa odry w neuronach; prowadzi do postępującego otępienia, mioklonii i 100% zgonu w ciągu 1–3 lat. 2) Amnezja immunologiczna (measles immune amnesia): wirus odry infekuje komórki CD150+ i niszczy od 20% do nawet 70% puli komórek pamięci immunologicznej (limfocytów B i T pamięci). Dziecko po przechorowaniu odry traci nabytą wcześniej odporność na grypę, pneumokoki czy rotawirusy i przez 2–3 lata wykazuje drastycznie wyższą śmiertelność z powodu innych powszechnych infekcji!"
        },
        {
          text: "Odra nie daje żadnych odległych powikłań, a jej przebycie trwale wzmacnia odporność na wszystkie inne wirusy i bakterie",
          feedback: "❌ BŁĄD! Przekonanie o 'wzmacniającym' wpływie odry to mit antyszczepionkowy; odra niszczy pamięć immunologiczną (amnezja immunologiczna)."
        },
        {
          text: "Głównym odległym powikłaniem jest rozwój cukrzycy typu 2 w ciągu 3 miesięcy",
          feedback: "❌ BŁĄD! Odra nie jest bezpośrednią przyczyną cukrzycy typu 2."
        },
        {
          text: "Po przebyciu odry pacjent musi być dializowany co roku przez 10 lat",
          feedback: "❌ BŁĄD! Odra rzadko atakuje nerki bezpośrednio."
        }
      ]
    }
  ],
  pathoNodes: [
    {
      badge: "KROK 1: INFEKCJA UKŁADU ODDECHOWEGO I RECEPTOR CD150",
      title: "Wiązanie z receptorem SLAM (CD150)",
      short: "Inwazja makrofagów płucnych i komórek dendrytycznych",
      detail: "Wirus odry (ssRNA-, rodzina Paramyxoviridae) wnika drogą kropelkową do dróg oddechowych. Glikoproteina hemaglutynina (H) wirusa wiąże się swoiście z receptorem SLAM (CD150) obecnym na makrofagach pęcherzykowych i komórkach dendrytycznych. Dochodzi do fuzji błon za pośrednictwem białka F i replikacji wirusa.",
      target: "Makrofagi pęcherzykowe i komórki dendrytyczne",
      desc: "Pierwotna replikacja w tkance limfatycznej układu oddechowego."
    },
    {
      badge: "KROK 2: WIREMIA I ROZSIEW WIELONARZĄDOWY",
      title: "Komórki Warthina-Finkeldeya i wiremia wtórna",
      short: "Fuzja komórek pod wpływem białka F (syncytia)",
      detail: "Zakażone komórki dendrytyczne migrują do regionalnych węzłów chłonnych, skąd wirus przez krew (wiremia pierwotna) rozsiewa się do śledziony, szpiku, wątroby i nabłonków dróg oddechowych (wiązanie z receptorem nektryną-4). W tkankach limfatycznych powstają patognomoniczne wielojądrzaste komórki olbrzymie Warthina-Finkeldeya z kwasochłonnymi wtrętami.",
      target: "Węzły chłonne, śledziona i nabłonek oddechowy",
      desc: "Masywna wiremia wtórna wyzwalająca objawy prodromalne triady 3C."
    },
    {
      badge: "KROK 3: OSUTKA SKÓRNA I ODPOWIEDŹ CYTOTOKSYCZNA",
      title: "Zapalenie mikronaczyń i plamki Koplika",
      short: "Odpowiedź limfocytów Tc (CD8+) na antygeny wirusa",
      detail: "Wirus odry zakaża komórki śródbłonka naczyń skóry i błon śluzowych. Pojawienie się plamek Koplika i osutki zbiega się z rozwojem swoistej odpowiedzi komórkowej: limfocyty cytotoksyczne CD8+ atakują zakażone komórki śródbłonka, wywołując wysięk zapalny, poszerzenie naczyń i wynaczynienie erytrocytów (stąd zlewający się charakter i miedziane przebarwienia z hemosyderyny). U osób z brakiem limfocytów T wysypka nie pojawia się wcale, lecz umierają oni na piorunujące zapalenie płuc!",
      target: "Śródbłonek naczyń skóry i błon śluzowych",
      desc: "Wysypka jest wynikiem walki układu odpornościowego z zakażonym śródbłonkiem."
    },
    {
      badge: "KROK 4: AMNEZJA IMMUNOLOGICZNA I SSPE",
      title: "Niszczenie limfocytów pamięci i przetrwała infekcja OUN",
      short: "Kasowanie pamięci immunologicznej i ryzyko SSPE",
      detail: "Wirus odry wywołuje masywną apoptozę komórek pamięci CD45RO+ (limfocytów B i T), powodując tzw. amnezję immunologiczną (utratę nabytej odporności na inne patogeny trwającą 2-3 lata). U części chorych zmutowany wirus odry o defektywnym białku M przełamuje barierę krew-mózg, przechodzi z neuronu do neuronu bez wiremii i po 5-10 latach wywołuje podostre stwardniające zapalenie mózgu (SSPE).",
      target: "Układ odpornościowy (komórki pamięci) i neurony mózgu",
      desc: "Długofalowa podatność na zakażenia i śmiertelne powikłanie neurologiczne."
    }
  ],
  diffTable: {
    title: "Diagnostyka różnicowa chorób wysypkowych wieku dziecięcego",
    headers: ["Cecha", "Odra (Morbilli)", "Różyczka (Rubella)", "Ospa wietrzna (Varicella)", "Szkarlatyna (Płonica)"],
    rows: [
      ["Etiologia", "Measles virus (Paramyxoviridae, ssRNA-)", "Rubella virus (Matonaviridae, ssRNA+)", "Varicella-Zoster Virus (VZV, Herpesviridae)", "Streptococcus pyogenes (GAS, pirogenne egzotoksyny)"],
      ["Okres wylęgania", "10–12 dni (do wysypki 14 dni)", "14–21 dni", "10–21 dni (zwykle 14 dni)", "1–5 dni"],
      ["Objaw patognomoniczny", "Plamki Koplika na policzkach", "Bolesne powiększenie węzłów potylicznych i karkowych", "Polimorfizm osutki (plamka->grudka->pęcherzyk->strup)", "'Trójkąt Fiłatowa', linie Pastii, 'malinowy język'"],
      ["Morfologia wysypki", "Gruboplamisto-grudkowa, zlewająca się, żywoczerwona", "Drobnoróżowa, niezlewająca się, bladoróżowa", "Pęcherzykowa ('krople rosy na płatku róży')", "Drobnoplamista jak 'papier ścierny', czerwona"],
      ["Dynamika wysypki", "Zstępująca (od uszu w dół), ustępuje z łuszczeniem i miedzią", "Szybko zstępuje i znika w 3 dni bez śladu", "Rzutowa (nowe pęcherzyki), tułów -> twarz -> kończyny", "Uogólniona, ustępuje płatowym łuszczeniem dłoni i stóp"],
      ["Leczenie swoiste", "Witamina A (retinol doustnie) + leczenie objawowe", "Wyłącznie objawowe", "Acyklowir (w grupach ryzyka) + objawowe", "Penicylina fenoksymetylowa przez 10 dni"],
      ["Odległe powikłania", "SSPE (po 5-10 latach), amnezja immunologiczna", "Zespół różyczki wrodzonej (Gregga) u płodu", "Półpasiec (Herpes zoster), ataksja móżdżkowa", "Gorączka reumatyczna, ostre kłębuszkowe zapalenie nerek"]
    ]
  },
  dutySummary: {
    overview: "4-letni Antoś, całkowicie nieszczepiony (odmowa rodziców), z ciężkim przebiegiem odry powikłanej pierwotnym odrowym zapaleniem płuc Hechta (SpO2 93%, RR 36/min, nacieki w RTG). Pełny obraz kliniczny: triada 3C (kaszel, katar, zapalenie spojówek ze światłowstrętem), patognomoniczne plamki Koplika na śluzówce policzków oraz żywoczerwona zstępująca osutka gruboplamista. Zastosowano izolację powietrzną, tlenoterapię oraz leczenie witaminą A wg protokołu WHO. Wdrożono profilaktykę poekspozycyjną dla nieszczepionego brata i ciężarnej ciotki oraz zgłoszono ognisko do Sanepidu.",
    diagnostics: "Wymaz z nosogardła RT-PCR na obecność wirusa odry, serologia anty-Measles IgM i IgG, badanie cytologiczne plwociny (komórki olbrzymie Warthina-Finkeldeya), RTG klatki piersiowej, morfologia (leukopenia, limfopenia), prokalcytonina.",
    drugsAndDoses: "1. Protokół WHO: <span class='dose-pill'>Witamina A (retinol) p.o. 200 000 j.m.</span> raz na dobę przez 2 kolejne dni.<br>2. Tlenoterapia bierna wąsami tlenowymi do SpO2 >95%.<br>3. Leki przeciwgorączkowe: <span class='dose-pill'>Paracetamol p.o. 15 mg/kg mc.</span> co 6h naprzemiennie z <span class='dose-pill'>Ibuprofen p.o. 10 mg/kg mc.</span>.<br>4. KARDYNALNY ZAKAZ: glikokortykosteroidy ogólne są przeciwwskazane z powodu pogłębiania immunosupresji!",
    procedures: "Natychmiastowa izolacja w izolatce ze śluzą i podciśnieniem (transmisja powietrzna R0=12-18), stosowanie masek FFP3 przez personel, przyciemnienie sali ze względu na światłowstręt.",
    monitoring: "Ciągły pulsoksymetr, kontrola częstości oddechów, monitorowanie ewentualnych nadkażeń bakteryjnych (ucho, płuca), formularz ZLK-1 przesłany do PSSE w ciągu 24h."
  },
  lekQuestions: [
    {
      tag: "Objaw patognomoniczny odry",
      q: "Obecność drobnych, białawo-szarych plamek przypominających ziarna piasku, otoczonych czerwoną obwódką, zlokalizowanych na błonie śluzowej policzków naprzeciw dolnych zębów trzonowych, to patognomoniczny dla odry objaw znany jako:",
      opts: [
        "A. Plamki Koplika (plamki Fiłatowa-Koplika)",
        "B. Plamki Forchheimera",
        "C. Plamki Rotha",
        "D. Trójkąt Fiłatowa",
        "E. Objaw Pastii"
      ],
      options: [
        "A. Plamki Koplika (plamki Fiłatowa-Koplika)",
        "B. Plamki Forchheimera",
        "C. Plamki Rotha",
        "D. Trójkąt Fiłatowa",
        "E. Objaw Pastii"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Plamki Koplika (Fiłatowa-Koplika) to patognomoniczny wykwit enantemiczny w jamie ustnej w przebiegu odry. Pojawiają się na 24-48 godzin przed wystąpieniem wysypki skórnej i znikają w 1.-2. dobie jej trwania. Plamki Forchheimera występują w różyczce, plamki Rotha w IZW, trójkąt Fiłatowa i linie Pastii w płonicy.",
      expl: "Plamki Koplika (Fiłatowa-Koplika) to patognomoniczny wykwit enantemiczny w jamie ustnej w przebiegu odry. Pojawiają się na 24-48 godzin przed wystąpieniem wysypki skórnej i znikają w 1.-2. dobie jej trwania. Plamki Forchheimera występują w różyczce, plamki Rotha w IZW, trójkąt Fiłatowa i linie Pastii w płonicy."
    },
    {
      tag: "Okres prodromalny / Triada 3C",
      q: "Klasyczna triada objawów w okresie zwiastunowym (prodromalnym) odry obejmuje:",
      opts: [
        "A. Kaszel (Cough), nieżyt nosa (Coryza) oraz zapalenie spojówek ze światłowstrętem (Conjunctivitis)",
        "B. Gorączkę, żółtaczkę oraz powiększenie wątroby",
        "C. Ból gardła, powiększenie śledziony oraz limfocytozę atypową",
        "D. Wymioty, biegunkę oraz drgawki gorączkowe",
        "E. Obrzęki powiek, krwiomocz oraz nadciśnienie tętnicze"
      ],
      options: [
        "A. Kaszel (Cough), nieżyt nosa (Coryza) oraz zapalenie spojówek ze światłowstrętem (Conjunctivitis)",
        "B. Gorączkę, żółtaczkę oraz powiększenie wątroby",
        "C. Ból gardła, powiększenie śledziony oraz limfocytozę atypową",
        "D. Wymioty, biegunkę oraz drgawki gorączkowe",
        "E. Obrzęki powiek, krwiomocz oraz nadciśnienie tętnicze"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Okres nieżytowy (prodromalny) odry trwający 2-4 dni charakteryzuje się wysoką gorączką oraz triadą '3C': suchy męczący kaszel (Cough), obfity katar (Coryza) oraz obustronne zapalenie spojówek ze światłowstrętem, łzawieniem i obrzękiem powiek (Conjunctivitis).",
      expl: "Okres nieżytowy (prodromalny) odry trwający 2-4 dni charakteryzuje się wysoką gorączką oraz triadą '3C': suchy męczący kaszel (Cough), obfity katar (Coryza) oraz obustronne zapalenie spojówek ze światłowstrętem, łzawieniem i obrzękiem powiek (Conjunctivitis)."
    },
    {
      tag: "Leczenie wg WHO / Witamina A",
      q: "Zgodnie z wytycznymi Światowej Organizacji Zdrowia (WHO), lekiem o udowodnionej skuteczności zmniejszającym śmiertelność i ryzyko powikłań, który należy podać każdemu dziecku z rozpoznaną odrą, jest:",
      opts: [
        "A. Witamina A (retinol) doustnie przez 2 kolejne dni",
        "B. Acyklowir dożylnie przez 7 dni",
        "C. Witamina C w megadawkach dożylnie",
        "D. Deksametazon doustnie w dawce immunosupresyjnej",
        "E. Azytromycyna w pojedynczej dawce uderzeniowej"
      ],
      options: [
        "A. Witamina A (retinol) doustnie przez 2 kolejne dni",
        "B. Acyklowir dożylnie przez 7 dni",
        "C. Witamina C w megadawkach dożylnie",
        "D. Deksametazon doustnie w dawce immunosupresyjnej",
        "E. Azytromycyna w pojedynczej dawce uderzeniowej"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "WHO i ESPID zalecają natychmiastowe podanie witaminy A u wszystkich dzieci chorych na odrę (niezależnie od statusu odżywienia). Wirus odry powoduje gwałtowne zużycie retinolu. Suplementacja witaminy A (200 000 j.m. dla dzieci >=12 m.ż. przez 2 dni) redukuje śmiertelność o >50%, chroni nabłonki przed martwicą i zapobiega ślepocie oraz powikłaniom płucnym.",
      expl: "WHO i ESPID zalecają natychmiastowe podanie witaminy A u wszystkich dzieci chorych na odrę (niezależnie od statusu odżywienia). Wirus odry powoduje gwałtowne zużycie retinolu. Suplementacja witaminy A (200 000 j.m. dla dzieci >=12 m.ż. przez 2 dni) redukuje śmiertelność o >50%, chroni nabłonki przed martwicą i zapobiega ślepocie oraz powikłaniom płucnym."
    },
    {
      tag: "Epidemiologia / Okres zakaźności",
      q: "Chory na odrę zakaża osoby z otoczenia w okresie:",
      opts: [
        "A. Od 4 dni przed pojawieniem się wysypki do 4 dni po jej wystąpieniu",
        "B. Wyłącznie w trakcie trwania gorączki, zanim pojawi się wysypka",
        "C. Przez 30 dni od ustąpienia wysypki",
        "D. Wyłącznie w momencie obecności plamek Koplika",
        "E. Przez cały okres życia w sposób bezobjawowy"
      ],
      options: [
        "A. Od 4 dni przed pojawieniem się wysypki do 4 dni po jej wystąpieniu",
        "B. Wyłącznie w trakcie trwania gorączki, zanim pojawi się wysypka",
        "C. Przez 30 dni od ustąpienia wysypki",
        "D. Wyłącznie w momencie obecności plamek Koplika",
        "E. Przez cały okres życia w sposób bezobjawowy"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Pacjent z odrą wydala wirusa i jest wysoce zakaźny od około 4 dni PRZED pojawieniem się wysypki na skórze (w okresie nieżytowym, gdy nikt jeszcze nie podejrzewa odry!) do 4 dni PO jej pojawieniu się. U osób z ciężkim niedoborem odporności siewstwo wirusa może trwać dłużej.",
      expl: "Pacjent z odrą wydala wirusa i jest wysoce zakaźny od około 4 dni PRZED pojawieniem się wysypki na skórze (w okresie nieżytowym, gdy nikt jeszcze nie podejrzewa odry!) do 4 dni PO jej pojawieniu się. U osób z ciężkim niedoborem odporności siewstwo wirusa może trwać dłużej."
    },
    {
      tag: "Profilaktyka poekspozycyjna (PEP)",
      q: "U nieszczepionego 15-miesięcznego dziecka, które miało bezpośredni kontakt z chorym na odrę 48 godzin temu, najwłaściwszym postępowaniem w ramach profilaktyki poekspozycyjnej jest:",
      opts: [
        "A. Natychmiastowe podanie pierwszej dawki szczepionki MMR (w ciągu 72 godzin od ekspozycji)",
        "B. Podanie dożylne acyklowiru",
        "C. Odczekanie na pojawienie się objawów i podanie paracetamolu",
        "D. Pobranie biopsji węzłów chłonnych",
        "E. Wdrożenie kwarantanny bez podawania jakichkolwiek preparatów"
      ],
      options: [
        "A. Natychmiastowe podanie pierwszej dawki szczepionki MMR (w ciągu 72 godzin od ekspozycji)",
        "B. Podanie dożylne acyklowiru",
        "C. Odczekanie na pojawienie się objawów i podanie paracetamolu",
        "D. Pobranie biopsji węzłów chłonnych",
        "E. Wdrożenie kwarantanny bez podawania jakichkolwiek preparatów"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Szczepionka przeciwko odrze (MMR) podana osobie nieszczepionej (powyżej 6.-9. m.ż.) w ciągu 72 godzin od kontaktu z chorym zapewnia skuteczną ochronę przed zachorowaniem lub znacznie łagodzi przebieg kliniczny odry. Po przekroczeniu 72 godzin (do 6 dni) lub u osób z przeciwwskazaniami do żywej szczepionki (kobiety w ciąży, niemowlęta <6 m.ż., immunosupresja) stosuje się immunoglobulinę ludzką (HNIG).",
      expl: "Szczepionka przeciwko odrze (MMR) podana osobie nieszczepionej (powyżej 6.-9. m.ż.) w ciągu 72 godzin od kontaktu z chorym zapewnia skuteczną ochronę przed zachorowaniem lub znacznie łagodzi przebieg kliniczny odry. Po przekroczeniu 72 godzin (do 6 dni) lub u osób z przeciwwskazaniami do żywej szczepionki (kobiety w ciąży, niemowlęta <6 m.ż., immunosupresja) stosuje się immunoglobulinę ludzką (HNIG)."
    },
    {
      tag: "Profilaktyka u ciężarnych po ekspozycji",
      q: "Nieszczepiona kobieta w 16. tygodniu ciąży miała kontakt z chorym na odrę 3 dni temu. Prawidłowym postępowaniem profilaktycznym jest:",
      opts: [
        "A. Podanie standardowej immunoglobuliny ludzkiej (HNIG) domięśniowo w ciągu 6 dni od ekspozycji (szczepionka MMR jest bezwzględnie przeciwwskazana)",
        "B. Natychmiastowe zaszczepienie szczepionką MMR",
        "C. Podanie doustnej szczepionki przeciw polio",
        "D. Wykonanie natychmiastowego cięcia cesarskiego",
        "E. Podanie amoksycyliny z kwasem klawulanowym"
      ],
      options: [
        "A. Podanie standardowej immunoglobuliny ludzkiej (HNIG) domięśniowo w ciągu 6 dni od ekspozycji (szczepionka MMR jest bezwzględnie przeciwwskazana)",
        "B. Natychmiastowe zaszczepienie szczepionką MMR",
        "C. Podanie doustnej szczepionki przeciw polio",
        "D. Wykonanie natychmiastowego cięcia cesarskiego",
        "E. Podanie amoksycyliny z kwasem klawulanowym"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Szczepionka MMR zawiera żywe atenuowane wirusy i jest BEZWZGLĘDNIE PRZECIWWSKAZANA w ciąży. W razie narażenia podatnej ciężarnej na zakażenie odrą jedyną dozwoloną i skuteczną metodą profilaktyki poekspozycyjnej jest podanie immunoglobuliny ludzkiej (HNIG) w dawce 0.5 ml/kg mc. i.m. (maks. 15 ml) w ciągu 6 dni od ekspozycji.",
      expl: "Szczepionka MMR zawiera żywe atenuowane wirusy i jest BEZWZGLĘDNIE PRZECIWWSKAZANA w ciąży. W razie narażenia podatnej ciężarnej na zakażenie odrą jedyną dozwoloną i skuteczną metodą profilaktyki poekspozycyjnej jest podanie immunoglobuliny ludzkiej (HNIG) w dawce 0.5 ml/kg mc. i.m. (maks. 15 ml) w ciągu 6 dni od ekspozycji."
    },
    {
      tag: "Odległe powikłania neurologiczne / SSPE",
      q: "Podostre stwardniające zapalenie mózgu (SSPE – Subacute Sclerosing Panencephalitis) jest rzadkim, postępującym i nieuleczalnym powikłaniem odry, które ujawnia się zazwyczaj po:",
      opts: [
        "A. 5 do 10 latach od przebycia odry",
        "B. 24 do 48 godzinach od wystąpienia wysypki",
        "C. 2 tygodniach od zakończenia gorączki",
        "D. 30 dniach od ustąpienia kataru",
        "E. Wyłącznie w trakcie życia płodowego"
      ],
      options: [
        "A. 5 do 10 latach od przebycia odry",
        "B. 24 do 48 godzinach od wystąpienia wysypki",
        "C. 2 tygodniach od zakończenia gorączki",
        "D. 30 dniach od ustąpienia kataru",
        "E. Wyłącznie w trakcie życia płodowego"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "SSPE rozwija się średnio po 5-10 latach (zakres 1-15 lat) od zachorowania na odrę (szczególnie jeśli odrę przebyto przed 2. rokiem życia). Jest to wolna, postępująca infekcja OUN wywołana przetrwałym, zmutowanym wirusem odry. Prowadzi do regresu rozwoju, otępienia, mioklonii i 100% zgonu w ciągu 1-3 lat od początku objawów neurologicznych.",
      expl: "SSPE rozwija się średnio po 5-10 latach (zakres 1-15 lat) od zachorowania na odrę (szczególnie jeśli odrę przebyto przed 2. rokiem życia). Jest to wolna, postępująca infekcja OUN wywołana przetrwałym, zmutowanym wirusem odry. Prowadzi do regresu rozwoju, otępienia, mioklonii i 100% zgonu w ciągu 1-3 lat od początku objawów neurologicznych."
    },
    {
      tag: "Cytologia / Komórki Warthina-Finkeldeya",
      q: "Obecność wielojądrzastych komórek olbrzymich z wewnątrzjądrowymi i cytoplazmatycznymi wtrętami (tzw. komórek Warthina-Finkeldeya) w badaniu histologicznym lub cytologicznym jest cechą charakterystyczną zakażenia:",
      opts: [
        "A. Wirusem odry (Measles virus)",
        "B. Wirusem opryszczki pospolitej (HSV-1)",
        "C. Wirusem wścieklizny (Rabies virus)",
        "D. Prątkiem gruźlicy (Mycobacterium tuberculosis)",
        "E. Cytomegalowirusem (CMV)"
      ],
      options: [
        "A. Wirusem odry (Measles virus)",
        "B. Wirusem opryszczki pospolitej (HSV-1)",
        "C. Wirusem wścieklizny (Rabies virus)",
        "D. Prątkiem gruźlicy (Mycobacterium tuberculosis)",
        "E. Cytomegalowirusem (CMV)"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Komórki Warthina-Finkeldeya to olbrzymie komórki wielojądrzaste (zawierające nawet do kilkudziesięciu jąder) powstające w wyniku fuzji zakażonych limfocytów pod wpływem wirusowego białka F. Są patognomonicznym znaleziskiem w tkance limfatycznej i wydzielinie dróg oddechowych u pacjentów z odrą.",
      expl: "Komórki Warthina-Finkeldeya to olbrzymie komórki wielojądrzaste (zawierające nawet do kilkudziesięciu jąder) powstające w wyniku fuzji zakażonych limfocytów pod wpływem wirusowego białka F. Są patognomonicznym znaleziskiem w tkance limfatycznej i wydzielinie dróg oddechowych u pacjentów z odrą."
    },
    {
      tag: "Amnezja immunologiczna po odrze",
      q: "Zjawisko tzw. 'amnezji immunologicznej' (immune amnesia) po przebyciu odry polega na:",
      opts: [
        "A. Infekcji i zniszczeniu przez wirusa odry komórek pamięci immunologicznej (limfocytów B i T), co prowadzi do utraty nabytej wcześniej odporności na inne patogeny na okres 2–3 lat",
        "B. Trwałej utracie pamięci świeżej u pacjenta na skutek zapalenia hipokampa",
        "C. Trwałej niezdolności do wytwarzania przeciwciał klasy IgE przeciwko alergenom",
        "D. Zniszczeniu szpiku kostnego wymagającym pilnego przeszczepienia komórek macierzystych",
        "E. Utracie zdolności rozpoznawania własnych antygenów i masowej autoagresji"
      ],
      options: [
        "A. Infekcji i zniszczeniu przez wirusa odry komórek pamięci immunologicznej (limfocytów B i T), co prowadzi do utraty nabytej wcześniej odporności na inne patogeny na okres 2–3 lat",
        "B. Trwałej utracie pamięci świeżej u pacjenta na skutek zapalenia hipokampa",
        "C. Trwałej niezdolności do wytwarzania przeciwciał klasy IgE przeciwko alergenom",
        "D. Zniszczeniu szpiku kostnego wymagającym pilnego przeszczepienia komórek macierzystych",
        "E. Utracie zdolności rozpoznawania własnych antygenów i masowej autoagresji"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Wirus odry wykazuje szczególny tropizm do komórek z receptorem CD150 (SLAM), który występuje na limfocytach T i B pamięci. Wirus infekuje je i niszczy od 20% do 70% nabytego repertuaru przeciwciał. Po przechorowaniu odry organizm 'zapomina' wcześniej wykształconą odporność na grypę, pneumokoki czy rotawirusy, co drastycznie zwiększa podatność na inne infekcje i śmiertelność przez kolejne 2-3 lata.",
      expl: "Wirus odry wykazuje szczególny tropizm do komórek z receptorem CD150 (SLAM), który występuje na limfocytach T i B pamięci. Wirus infekuje je i niszczy od 20% do 70% nabytego repertuaru przeciwciał. Po przechorowaniu odry organizm 'zapomina' wcześniej wykształconą odporność na grypę, pneumokoki czy rotawirusy, co drastycznie zwiększa podatność na inne infekcje i śmiertelność przez kolejne 2-3 lata."
    },
    {
      tag: "Wskaż zdanie fałszywe / Odra i szczepienia",
      q: "Wskaż zdanie FAŁSZYWE dotyczące odry i szczepień przeciwko odrze:",
      opts: [
        "A. Odra jest łagodną chorobą wieku dziecięcego niewymagającą rejestracji epidemiologicznej ani izolacji",
        "B. Szczepionka MMR jest szczepionką żywą atenuowaną podawaną podskórnie lub domięśniowo",
        "C. Zgodnie z Programem Szczepień Ochronnych (PSO) w Polsce szczepienie MMR podaje się w 13.–15. miesiącu życia oraz w 6. roku życia",
        "D. Do uzyskania odporności populacyjnej (stadnej) przeciwko odrze wymagany jest poziom zaszczepienia co najmniej 95% społeczeństwa",
        "E. Najczęstszym powikłaniem odry prowadzącym do zgonu u małych dzieci jest zapalenie płuc"
      ],
      options: [
        "A. Odra jest łagodną chorobą wieku dziecięcego niewymagającą rejestracji epidemiologicznej ani izolacji",
        "B. Szczepionka MMR jest szczepionką żywą atenuowaną podawaną podskórnie lub domięśniowo",
        "C. Zgodnie z Programem Szczepień Ochronnych (PSO) w Polsce szczepienie MMR podaje się w 13.–15. miesiącu życia oraz w 6. roku życia",
        "D. Do uzyskania odporności populacyjnej (stadnej) przeciwko odrze wymagany jest poziom zaszczepienia co najmniej 95% społeczeństwa",
        "E. Najczęstszym powikłaniem odry prowadzącym do zgonu u małych dzieci jest zapalenie płuc"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Zdanie A jest FAŁSZYWE (i stanowi poprawną odpowiedź). Odra jest ciężką, potencjalnie śmiertelną układową chorobą wirusową obarczoną ryzykiem powikłań płucnych i neurologicznych. Każde podejrzenie odry podlega BEZWZGLĘDNEMU, NATYCHMIASTOWEMU obowiązkowi zgłoszenia do Państwowej Inspekcji Sanitarnej w ciągu 24h oraz ścisłej izolacji pacjenta.",
      expl: "Zdanie A jest FAŁSZYWE (i stanowi poprawną odpowiedź). Odra jest ciężką, potencjalnie śmiertelną układową chorobą wirusową obarczoną ryzykiem powikłań płucnych i neurologicznych. Każde podejrzenie odry podlega BEZWZGLĘDNEMU, NATYCHMIASTOWEMU obowiązkowi zgłoszenia do Państwowej Inspekcji Sanitarnej w ciągu 24h oraz ścisłej izolacji pacjenta."
    },
    {
      tag: "Aspekty prawne / Obowiązki lekarza",
      q: "Lekarz, który podejrzewa lub rozpoznaje przypadek odry, ma ustawowy obowiązek:",
      opts: [
        "A. Zgłoszenia tego faktu do właściwego Państwowego Powiatowego Inspektora Sanitarnego (formularz ZLK-1) w ciągu 24 godzin od powzięcia podejrzenia",
        "B. Zgłoszenia dopiero po laboratoryjnym potwierdzeniu obecności przeciwciał IgM za 14 dni",
        "C. Poinformowania mediów lokalnych przed zgłoszeniem do Sanepidu",
        "D. Zgłoszenia wyłącznie wtedy, gdy dziecko nie było szczepione",
        "E. Lekarz w POZ nie ma obowiązku zgłaszania chorób zakaźnych"
      ],
      options: [
        "A. Zgłoszenia tego faktu do właściwego Państwowego Powiatowego Inspektora Sanitarnego (formularz ZLK-1) w ciągu 24 godzin od powzięcia podejrzenia",
        "B. Zgłoszenia dopiero po laboratoryjnym potwierdzeniu obecności przeciwciał IgM za 14 dni",
        "C. Poinformowania mediów lokalnych przed zgłoszeniem do Sanepidu",
        "D. Zgłoszenia wyłącznie wtedy, gdy dziecko nie było szczepione",
        "E. Lekarz w POZ nie ma obowiązku zgłaszania chorób zakaźnych"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Zgodnie z art. 27 Ustawy o zapobieganiu oraz zwalczaniu zakażeń i chorób zakaźnych u ludzi, lekarz ma obowiązek zgłosić każde PODEJRZENIE lub ROZPOZNANIE odry do Państwowego Powiatowego Inspektora Sanitarnego w ciągu 24 godzin (formularz ZLK-1). Zgłoszenia dokonuje się natychmiast na podstawie obrazu klinicznego, nie czekając na wyniki serologii czy PCR.",
      expl: "Zgodnie z art. 27 Ustawy o zapobieganiu oraz zwalczaniu zakażeń i chorób zakaźnych u ludzi, lekarz ma obowiązek zgłosić każde PODEJRZENIE lub ROZPOZNANIE odry do Państwowego Powiatowego Inspektora Sanitarnego w ciągu 24 godzin (formularz ZLK-1). Zgłoszenia dokonuje się natychmiast na podstawie obrazu klinicznego, nie czekając na wyniki serologii czy PCR."
    }
  ],
  flashcards: [
    {
      q: "Czym są plamki Koplika i kiedy występują?",
      a: "Białawo-szare wykwity ('ziarna piasku') na rumieniowym podłożu na śluzówce policzków naprzeciw zębów trzonowych. Są patognomoniczne dla odry, wyprzedzają wysypkę o 24–48h i znikają po jej wystąpieniu."
    },
    {
      q: "Co składa się na triadę prodromalną '3C' w odrze?",
      a: "1. Cough (suchy, męczący kaszel)\n2. Coryza (obfity nieżyt nosa)\n3. Conjunctivitis (zapalenie spojówek z intensywnym światłowstrętem)."
    },
    {
      q: "Jaki lek jest bezwzględnie zalecany przez WHO u każdego dziecka z odrą?",
      a: "Witamina A (retinol) doustnie przez 2 kolejne dni (dawka dla >=12 m.ż. to 200 000 j.m./d) – zmniejsza śmiertelność o >50% i zapobiega powikłaniom."
    },
    {
      q: "Jaki jest okres zakaźności chorego na odrę?",
      a: "Od 4 dni przed pojawieniem się wysypki do 4 dni po jej wystąpieniu. Wskaźnik R0 wynosi 12–18 (skrajna zakaźność drogą powietrzną!)."
    },
    {
      q: "Czym jest amnezja immunologiczna wywołana przez wirus odry?",
      a: "Zniszczenie komórek pamięci CD150+ (limfocytów B i T), powodujące 'wykasowanie' nabytej wcześniej odporności na inne patogeny na okres 2–3 lat."
    },
    {
      q: "Jak wygląda profilaktyka poekspozycyjna u ciężarnej podatnej na odrę?",
      a: "Bezwzględny zakaz szczepionki żywej MMR! Podaje się domięśniowo immunoglobulinę ludzką (HNIG) w ciągu 6 dni od ekspozycji."
    }
  ]
};

async function saveAndEncryptCase(caseData, filename) {
  const filePath = path.join(CASES_DIR, filename);
  const jsonStr = JSON.stringify(caseData, null, 2);
  const encryptedObj = await encryptStringAes(jsonStr, MASTER_KEY);
  fs.writeFileSync(filePath, JSON.stringify(encryptedObj, null, 2), 'utf8');
  console.log(`Successfully reworked: ${filename} (LEK Q count: ${caseData.lekQuestions.length}, steps: ${caseData.steps.length})`);
}

(async () => {
  await saveAndEncryptCase(case109Data, '109_wodonercze_wrodzone_upjo.json');
  await saveAndEncryptCase(case110Data, '110_odra_morbilli.json');
  console.log("Cases 109 and 110 rework completed successfully!");
})();

const fs = require('fs');
const { decryptObjectAes, encryptStringAes } = require('./encrypt_case.js');
const PASSWORD = '@LEKSzymon28111999';

async function upgradeCase(fname, updater) {
  const enc = JSON.parse(fs.readFileSync('cases/' + fname, 'utf8'));
  const c = await decryptObjectAes(enc, PASSWORD);
  updater(c);
  if (!c.vitalsObj) {
    c.vitalsObj = { hr: 110, bp: "100/60", spo2: 98, rr: 22, temp: 37.5, gcs: 15 };
  }
  const reEnc = await encryptStringAes(JSON.stringify(c, null, 2), PASSWORD);
  fs.writeFileSync('cases/' + fname, JSON.stringify(reEnc, null, 2), 'utf8');
  console.log(`Upgraded clinical storytelling: ${fname}`);
}

async function run() {
  console.log("Starting deep clinical upgrade for cases 111-115...");

  // ==========================================
  // CASE 111: Płonica / Szkarlatyna
  // ==========================================
  await upgradeCase('111_plonica_szkarlatyna.json', (c) => {
    c.steps = [
      {
        stepNum: 1,
        title: "Krok 1: Wstępna ocena w gabinecie POZ – 5-latka z ostrym bólem gardła, gorączką i wymiotami",
        desc: "Do Twojego gabinetu POZ rodzice przyprowadzają 5-letnią dziewczynkę, która uczęszcza do przedszkola. Od wczorajszego wieczora dziecko ma wysoką gorączkę do 39.4°C, dreszcze, skarży się na silny ból gardła przy połykaniu, ból brzucha i dwukrotnie zwymiotowało. W badaniu przedmiotowym: HR 130/min, temp. 39.2°C, węzły chłonne szyjne przednie i podżuchwowe są znacznie powiększone, twarde i tkliwe. Dziewczynka nie ma kaszlu ani kataru. Jaka jest Twoja wstępna hipoteza kliniczna w skali Centora/McIsaaca?",
        scenario: "Do Twojego gabinetu POZ rodzice przyprowadzają 5-letnią dziewczynkę, która uczęszcza do przedszkola. Od wczorajszego wieczora dziecko ma wysoką gorączkę do 39.4°C, dreszcze, skarży się na silny ból gardła przy połykaniu, ból brzucha i dwukrotnie zwymiotowało. W badaniu przedmiotowym: HR 130/min, temp. 39.2°C, węzły chłonne szyjne przednie i podżuchwowe są znacznie powiększone, twarde i tkliwe. Dziewczynka nie ma kaszlu ani kataru. Jaka jest Twoja wstępna hipoteza kliniczna w skali Centora/McIsaaca?",
        options: [
          {
            text: "Podejrzewasz ostre paciorkowcowe zapalenie gardła i migdałków wywołane przez Streptococcus pyogenes (GAS - paciorkowiec grupy A; 4 punkty w skali Centora/McIsaaca) lub rozwijającą się płonicę (szkarlatynę); kwalifikujesz dziecko do szybkiego testu antygenowego (Strep-test / RADT) lub posiewu z gardła.",
            correct: true,
            feedback: "Znakomicie! Klasyczna ostra manifestacja paciorkowcowego zapalenia gardła i migdałków u dziecka w wieku przedszkolnym/wczesnoszkolnym: nagły początek, wysoka gorączka, ból gardła, powiększenie i tkliwość węzłów szyjnych przednich, brak kaszlu i nieżytu nosa (4 punkty w skali McIsaaca = >50-60% ryzyka GAS). Towarzyszące bóle brzucha i wymioty są bardzo typowe dla dzieci. Wskazany szybki test RADT."
          },
          {
            text: "Rozpoznajesz infekcję wirusową (przeziębienie) i zalecasz wyłącznie syrop z prawoślazu.",
            correct: false,
            feedback: "Kardynalny błąd! Brak kaszlu i kataru przy gorączce 39.5°C i tkliwej limfadenopatii szyjnej wyklucza typowe przeziębienie."
          },
          {
            text: "Kierujesz dziecko na cito do szpitala z podejrzeniem ostrego zapalenia trzustki.",
            correct: false,
            feedback: "Bóle brzucha i wymioty u małych dzieci są częstym objawem ogólnym anginy paciorkowcowej."
          },
          {
            text: "Zalecasz natychmiastową profilaktyczną appendektomię.",
            correct: false,
            feedback: "Brak jakichkolwiek wskazań chirurgicznych."
          }
        ]
      },
      {
        stepNum: 2,
        title: "Krok 2: Badanie gardła i ewolucja języka – Od języka obłożonego do 'języka malinowego'",
        desc: "Oglądasz jamę ustną i gardło dziewczynki. Widzisz żywoczerwone, rozpulchnione łuki podniebienne, powiększone migdałki z kryptami wypełnionymi kremowo-żółtą wydzieliną ropną oraz drobne wybroczyny na podniebieniu miękkim. Język w pierwszych 2 dobach pokryty jest grubym, białoszarym nalotem. Jaka charakterystyczna przemiana wyglądu języka zachodzi w kolejnych dobach płonicy?",
        scenario: "Oglądasz jamę ustną i gardło dziewczynki. Widzisz żywoczerwone, rozpulchnione łuki podniebienne, powiększone migdałki z kryptami wypełnionymi kremowo-żółtą wydzieliną ropną oraz drobne wybroczyny na podniebieniu miękkim. Język w pierwszych 2 dobach pokryty jest grubym, białoszarym nalotem. Jaka charakterystyczna przemiana wyglądu języka zachodzi w kolejnych dobach płonicy?",
        options: [
          {
            text: "Od 3.–4. doby nalot ustępuje od brzegu ku środkowi, odsłaniając żywoczerwoną powierzchnię z wydatnymi, powiększonymi brodawkami grzybowatymi – klasyczny 'język malinowy' (lub truskawkowy).",
            correct: true,
            feedback: "Doskonale! Ewolucja języka w płonicy (częste pytanie LEK): w 1.–2. dobie język jest 'obłożony' grubym, białym nalotem (język biały truskawkowy), a od 3.–4. doby nalot złuszcza się, ukazując żywoczerwony, lśniący język z obrzękniętymi, czerwonymi brodawkami brodawkowatymi – tzw. 'język malinowy' (strawberry tongue). Utrzymuje się przez kilka dni."
          },
          {
            text: "Język staje się czarny, włochaty i pokryty grzybnią.",
            correct: false,
            feedback: "To czarny język włochaty (lingua villosa nigra), zmiana niezwiązana ze szkarlatyną."
          },
          {
            text: "Na języku pojawiają się plamki Koplika z czerwoną obwódką.",
            correct: false,
            feedback: "Plamki Koplika występują na błonie śluzowej policzków w odrze, nie na języku w płonicy."
          },
          {
            text: "Język ulega martwicy i wymaga wycięcia chirurgicznego.",
            correct: false,
            feedback: "Niedorzeczne i medycznie bezpodstawne."
          }
        ]
      },
      {
        stepNum: 3,
        title: "Krok 3: Cechy osutki płoniczej – 'Papier ścierny', trójkąt Fiłatowa i linie Pastii",
        desc: "W 2. dobie choroby na ciele dziecka pojawia się charakterystyczna wysypka wywołana pirogenną toksyną erytrogenną (SpeA, SpeB, SpeC) Streptococcus pyogenes. Jakie są trzy kluczowe cechy kliniczne tej osutki sprawdzane na egzaminach lekarskich?",
        scenario: "W 2. dobie choroby na ciele dziecka pojawia się charakterystyczna wysypka wywołana pirogenną toksyną erytrogenną (SpeA, SpeB, SpeC) Streptococcus pyogenes. Jakie są trzy kluczowe cechy kliniczne tej osutki sprawdzane na egzaminach lekarskich?",
        options: [
          {
            text: "1) Drobnoplamisto-grudkowa (w dotyku szorstka jak papier ścierny lub 'gęsia skórka'), najgęstsza w dołach pachowych i pachwinach; 2) Trójkąt Fiłatowa (bladość skóry wokół ust i nosa na tle zaróżowionych policzków); 3) Linie Pastii (linijne wybroczyny w naturalnych zgięciach skóry, np. w zgięciach łokciowych).",
            correct: true,
            feedback: "Wybitnie! Klasyczna triada cech wysypki w płonicy: 1) Szorstka drobnoplamista osutka wielkości łebka od szpilki (papier ścierny / gęsia skórka), blednąca pod uciskiem; 2) Trójkąt Fiłatowa – uderzająca bladość skóry wokół ust i skrzydełek nosa przy intensywnie czerwonych rumianych policzkach; 3) Objaw Pastii (linie Pastii) – w fałdach skórnych (łokcie, pachy, pachwiny) kruche naczynia pękają pod wpływem ucisku, tworząc poprzeczne, wybroczynowe pasma naczyniowe."
          },
          {
            text: "Wykwity pęcherzykowe z mętną ropną treścią rozmieszczone wzdłuż dermatomów.",
            correct: false,
            feedback: "To opis półpaśca (Herpes zoster)."
          },
          {
            text: "Gruboplamiste ciemnoczerwone wykwity zlewające się za uszami.",
            correct: false,
            feedback: "To opis osutki odrowej."
          },
          {
            text: "Tarczowate zmiany z sinym centrum (rumień wielopostaciowy).",
            correct: false,
            feedback: "To opis rumienia wielopostaciowego (erythema multiforme)."
          }
        ]
      },
      {
        stepNum: 4,
        title: "Krok 4: Diagnostyka mikrobiologiczna – Strep-test vs Posiew wymazu z gardła",
        desc: "Wykonujesz w gabinecie szybki test antygenowy w kierunku paciorkowca grupy A (RADT / Strep-test) pobierając wymaz z obu migdałków i tylnej ściany gardła (omijając język i zęby). Wynik po 5 minutach jest wybitnie DODATNI (dwie linie). Jak interpretujesz ten wynik?",
        scenario: "Wykonujesz w gabinecie szybki test antygenowy w kierunku paciorkowca grupy A (RADT / Strep-test) pobierając wymaz z obu migdałków i tylnej ściany gardła (omijając język i zęby). Wynik po 5 minutach jest wybitnie DODATNI (dwie linie). Jak interpretujesz ten wynik?",
        options: [
          {
            text: "Wynik dodatni testu RADT ma swoistość >95–98% i natychmiast potwierdza etiologię paciorkowcową (GAS); nie wymaga wykonywania weryfikacyjnego posiewu z gardła i upoważnia do wdrożenia celowanej antybiotykoterapii.",
            correct: true,
            feedback: "Prawidłowo! Zgodnie z rekomendacjami NPOA/KORLD: szybkie testy antygenowe (RADT) charakteryzują się bardzo wysoką swoistością (>95%). Dodatni wynik testu u pacjenta z typowymi objawami klinicznymi jest w 100% wystarczający do postawienia diagnozy paciorkowcowego zapalenia gardła / płonicy i nie wymaga posiewu. (U dzieci w przypadku UJEMNEGO wyniku RADT przy wysokim prawdopodobieństwie klinicznym zaleca się pobranie posiewu, ze względu na czułość testów rzędu 85%)."
          },
          {
            text: "Wynik dodatni jest zawsze błędem laboratoryjnym i wymaga odstawienia leków.",
            correct: false,
            feedback: "Brak logiki medycznej."
          },
          {
            text: "Dodatni Strep-test oznacza nosicielstwo wirusa EBV.",
            correct: false,
            feedback: "Test wykrywa antygen wielocukrowy ściany paciorkowca grupy A (GAS), nie wirusy."
          },
          {
            text: "Test jest nieważny, ponieważ wymaz należy pobrać ze spojówek.",
            correct: false,
            feedback: "Wymaz w anginie/płonicy pobiera się wyłącznie z migdałków i tylnej ściany gardła."
          }
        ]
      },
      {
        stepNum: 5,
        title: "Krok 5: Leczenie przyczynowe I rzutu z wyboru – Zasady antybiotykoterapii wg NPOA",
        desc: "Kwalifikujesz dziewczynkę do natychmiastowego leczenia przeciwbakteryjnego. Jaki antybiotyk, w jakiej dawce i przez jaki DOKŁADNIE czas jest lekiem z wyboru zgodnie z Narodowym Programem Ochrony Antybiotyków (NPOA)?",
        scenario: "Kwalifikujesz dziewczynkę do natychmiastowego leczenia przeciwbakteryjnego. Jaki antybiotyk, w jakiej dawce i przez jaki DOKŁADNIE czas jest lekiem z wyboru zgodnie z Narodowym Programem Ochrony Antybiotyków (NPOA)?",
        options: [
          {
            text: "FENOKSYMETYLOPENICYLINA (penicylina V doustnie w dawce 100 000–150 000 IU/kg mc./dobę w 2 dawkach podzielonych co 12h) przez PEŁNE 10 DNI.",
            correct: true,
            feedback: "Znakomicie! To żelazny kanon LEK i NPOA: lekiem z wyboru w płonicy i anginie paciorkowcowej jest penicylina fenoksymetylowa (fenoksymetylopenicylina / Ospen). Streptococcus pyogenes pozostaje w 100% wrażliwy na penicylinę (nie stwierdzono na świecie ani jednego szczepu opornego!). Kluczowy warunek: leczenie musi trwać DOKŁADNIE 10 DNI, aby w 100% eradykować szczep z gardła i zapobiec gorączce reumatycznej! W przypadku trudności z compliance dopuszczalna pojedyncza dawka penicyliny benzatynowej i.m."
          },
          {
            text: "Azytromycyna doustnie przez 3 dni jako lek pierwszego rzutu.",
            correct: false,
            feedback: "Kardynalny błąd! Makrolidy NIE są lekami I rzutu; w Polsce oporność GAS na makrolidy wynosi 15-20%, a krótka kuracja niesie ryzyko nawrotu i gorączki reumatycznej."
          },
          {
            text: "Ciprofloksacyna dożylnie przez 21 dni.",
            correct: false,
            feedback: "Chinolony są nieskuteczne wobec paciorkowców i przeciwwskazane u małych dzieci."
          },
          {
            text: "Amoksycylina z kwasem klawulanowym przez 3 dni.",
            correct: false,
            feedback: "Kwas klawulanowy jest zbędny (GAS nie wytwarza beta-laktamaz!), a czas 3 dni jest zbyt krótki i grozi powikłaniami."
          }
        ]
      },
      {
        stepNum: 6,
        title: "Krok 6: Zakaźność, izolacja i bezpieczny powrót do przedszkola",
        desc: "Matka pyta, jak długo dziecko zakaża rodzeństwo i rówieśników w przedszkolu oraz kiedy może bezpiecznie wrócić do grupy.",
        scenario: "Matka pyta, jak długo dziecko zakaża rodzeństwo i rówieśników w przedszkolu oraz kiedy może bezpiecznie wrócić do grupy.",
        options: [
          {
            text: "Pacjentka przestaje być zakaźna dla otoczenia po 24 godzinach od przyjęcia pierwszej dawki skutecznej penicyliny; po ustąpieniu gorączki i poprawie samopoczucia może wrócić do przedszkola po min. 24–48h, kontynuując antybiotykoterapię do 10. dnia.",
            correct: true,
            feedback: "Doskonale! Bez leczenia chory na płonicę zakaża przez cały okres objawowy i do 2–3 tygodni po ustąpieniu objawów. Podanie skutecznej penicyliny eliminuje zakaźność paciorkowca już po 24 godzinach od pierwszej dawki! Dziecko może wrócić do przedszkola, pod warunkiem dobrego stanu ogólnego i systematycznego dokończenia 10-dniowego kursu antybiotyku w domu."
          },
          {
            text: "Dziecko zakaża przez 6 miesięcy bez względu na leczenie.",
            correct: false,
            feedback: "Nieprawda, penicylina eradykuje zakaźność w ciągu 24 godzin."
          },
          {
            text: "Płonica nie jest chorobą zakaźną i dziecko może iść do przedszkola z gorączką 39.5°C.",
            correct: false,
            feedback: "Płonica jest wysoce zakaźna drogą kropelkową."
          },
          {
            text: "Wymagana jest 3-letnia kwarantanna całej rodziny pod nadzorem policji.",
            correct: false,
            feedback: "Absurdalne zalecenie."
          }
        ]
      },
      {
        stepNum: 7,
        title: "Krok 7: Faza rekonwalescencji – Charakterystyczne łuszczenie naskórka",
        desc: "Po 10 dniach matka przychodzi na wizytę kontrolną. Dziewczynka czuje się świetnie, gardło jest blade, ale matka jest zaniepokojona, ponieważ skóra na dłoniach i stopach dziecka zaczęła schodzić 'wielkimi płatami'. Jakie wyjaśnienie przekazujesz matce?",
        scenario: "Po 10 dniach matka przychodzi na wizytę kontrolną. Dziewczynka czuje się świetnie, gardło jest blade, ale matka jest zaniepokojona, ponieważ skóra na dłoniach i stopach dziecka zaczęła schodzić 'wielkimi płatami'. Jakie wyjaśnienie przekazujesz matce?",
        options: [
          {
            text: "Uspokajasz matkę: jest to typowe dla płonicy grubopłatowe łuszczenie naskórka (desquamatio), rozpoczynające się po 1–2 tygodniach od wysypki, najsilniej wyrażone na dłoniach i podeszwach stóp (gdzie schodzi płatami), a na tułowiu drobnopłatkowo; jest to naturalny proces gojenia.",
            correct: true,
            feedback: "Znakomicie! Klasyczna ewolucja płonicy: w 2.–3. tygodniu od początku choroby dochodzi do charakterystycznego łuszczenia naskórka: na twarzy drobne, otrębiaste, na tułowiu płatkowe, a na dłoniach i stopach – GRUBOPŁATOWE (często skóra schodzi 'jak rękawiczki' lub 'skarpetki'). Jest to zjawisko całkowicie łagodne, wtórne do działania toksyny erytrogennej."
          },
          {
            text: "Rozpoznajesz martwicze toksyczne oddzielanie się naskórka (zespół Lyella / TEN) i kierujesz dziecko na OIT.",
            correct: false,
            feedback: "Błąd: dziecko jest bezgorączkowe, bez pęcherzy i w stanie ogólnym bardzo dobrym; to typowe płonicze łuszczenie."
          },
          {
            text: "Podejrzewasz poparzenie chemiczne kwasem siarkowym w przedszkolu.",
            correct: false,
            feedback: "Brak podstaw z wywiadu, zmiany są obustronne i symetryczne po przebytej szkarlatynie."
          },
          {
            text: "Zalecasz natychmiastowe przeszczepienie skóry na obu dłoniach.",
            correct: false,
            feedback: "Niedorzeczna i szkodliwa propozycja."
          }
        ]
      },
      {
        stepNum: 8,
        title: "Krok 8: Powikłania wczesne vs późne powikłania immunologiczne paciorkowca",
        desc: "Podczas wizyty podsumowującej omawiasz z rezydentem powikłania zakażeń GAS. Które powikłanie późne jest skutecznie zapobiegane przez 10-dniową terapię penicyliną, a które może wystąpić NIEZALEŻNIE od antybiotykoterapii?",
        scenario: "Podczas wizyty podsumowującej omawiasz z rezydentem powikłania zakażeń GAS. Które powikłanie późne jest skutecznie zapobiegane przez 10-dniową terapię penicyliną, a które może wystąpić NIEZALEŻNIE od antybiotykoterapii?",
        options: [
          {
            text: "Pełna 10-dniowa kuracja penicyliną w 100% zapobiega gorączce reumatycznej (powikłaniu sercowemu wg kryteriów Jonesa); NIE ZAPOBIEGA natomiast ostrego popaciorkowcowemu kłębuszkowemu zapaleniu nerek (APSGN), które może rozwinąć się mimo prawidłowego leczenia.",
            correct: true,
            feedback: "Wybitnie! To jeden z najważniejszych i najczęściej powtarzanych faktów na LEK: eradykacja paciorkowca za pomocą 10 dni penicyliny niemal do zera redukuje ryzyko GORĄCZKI REUMATYCZNEJ (oraz wczesnych powikłań ropnych: ropnia okołomigdałkowego, zapalenia ucha, wyrostka sutkowatego). Jednakże antybiotykoterapia NIE CHRONI przed ostrym popaciorkowcowym KZN (APSGN), które jest wyzwalane przez antygeny nefrytogenne (SpeB) odłożone w kłębuszkach na wczesnym etapie."
          },
          {
            text: "Penicylina zapobiega APSGN, ale zwiększa ryzyko gorączki reumatycznej.",
            correct: false,
            feedback: "Zupełne odwrócenie faktów medycznych."
          },
          {
            text: "Paciorkowce grupy A nigdy nie dają żadnych powikłań narządowych.",
            correct: false,
            feedback: "Fałsz: GAS może wywołać zapalenie wsierdzia, pląsawicę Sydenhama i niewydolność nerek."
          },
          {
            text: "Każde dziecko po płonicy musi mieć profilaktycznie wycięte nerki.",
            correct: false,
            feedback: "Absurdalna i szkodliwa teza."
          }
        ]
      }
    ];
  });

  // ==========================================
  // CASE 112: Ospa wietrzna (VZV)
  // ==========================================
  await upgradeCase('112_ospa_wietrzna_vzv.json', (c) => {
    c.steps = [
      {
        stepNum: 1,
        title: "Krok 1: Wstępna ocena w gabinecie – 3-latek z polimorficzną, swędzącą wysypką",
        desc: "Do przychodni zgłasza się matka z 3-letnim chłopcem. 2 dni temu dziecko miało stan podgorączkowy (38.0°C) i osłabienie apetytu. Wczoraj na owłosionej skórze głowy i na klatce piersiowej pojawiły się pierwsze czerwone plamki, które szybko przekształciły się w pęcherzyki. Dziś nowe wykwity pojawiły się na plecach, brzuchu, twarzy i kończynach. Dziecko uporczywie drapie skórę i płacze. W badaniu: HR 112/min, temp. 38.3°C, wykwity obecne również w jamie ustnej na podniebieniu. Jaka jest Twoja wstępna diagnoza?",
        scenario: "Do przychodni zgłasza się matka z 3-letnim chłopcem. 2 dni temu dziecko miało stan podgorączkowy (38.0°C) i osłabienie apetytu. Wczoraj na owłosionej skórze głowy i na klatce piersiowej pojawiły się pierwsze czerwone plamki, które szybko przekształciły się w pęcherzyki. Dziś nowe wykwity pojawiły się na plecach, brzuchu, twarzy i kończynach. Dziecko uporczywie drapie skórę i płacze. W badaniu: HR 112/min, temp. 38.3°C, wykwity obecne również w jamie ustnej na podniebieniu. Jaka jest Twoja wstępna diagnoza?",
        options: [
          {
            text: "Rozpoznajesz ospę wietrzną (Varicella) wywołaną przez pierwotne zakażenie wirusem ospy wietrznej i półpaśca (VZV - Human Herpesvirus 3); wykwity w rzucie owłosionej skóry głowy, tułowia i śluzówek są wysoce charakterystyczne.",
            correct: true,
            feedback: "Znakomicie! Klasyczny początek ospy wietrznej: krótki okres prodromalny, po którym następuje wysiew swędzącej osutki pęcherzykowej. Kluczowe cechy lokalizacyjne: obecność wykwitów na owłosionej skórze głowy (scalp) oraz na błonach śluzowych jamy ustnej to niemal pewny znak rozpoznawczy ospy wietrznej, różnicujący ją z wieloma innymi osutkami dziecięcymi."
          },
          {
            text: "Rozpoznajesz świerzb powikłany atopowym zapaleniem skóry.",
            correct: false,
            feedback: "Świerzb ma przewlekły przebieg z norami świerzbowcowymi, nie daje nagłego wysiewu pęcherzyków z gorączką na owłosionej skórze głowy."
          },
          {
            text: "Stawiasz rozpoznanie półpaśca uogólnionego u 3-latka.",
            correct: false,
            feedback: "Półpasiec to reaktywacja latentnego wirusa z układem dermatomowym; pierwotne zakażenie VZV manifestuje się ospą wietrzną."
          },
          {
            text: "Uznajesz, że to pokrzywka po spożyciu czekolady.",
            correct: false,
            feedback: "Pokrzywka daje bąble pokrzywkowe znikające po kilku godzinach, a nie pęcherzyki z płynem i strupki."
          }
        ]
      },
      {
        stepNum: 2,
        title: "Krok 2: Morfologia osutki i zjawisko 'gwieździstego nieba'",
        desc: "Oglądasz dokładnie skórę klatki piersiowej i pleców chłopca. Dostrzegasz jednoczesną obecność: małych rumieniowych plamek, grudek, drobnych pęcherzyków wypełnionych przejrzystym płynem ('kropla rosy na płatku róży'), krostek oraz przysychających strupków. Jak nazywa się to zjawisko kliniczne patognomoniczne dla ospy wietrznej?",
        scenario: "Oglądasz dokładnie skórę klatki piersiowej i pleców chłopca. Dostrzegasz jednoczesną obecność: małych rumieniowych plamek, grudek, drobnych pęcherzyków wypełnionych przejrzystym płynem ('kropla rosy na płatku róży'), krostek oraz przysychających strupków. Jak nazywa się to zjawisko kliniczne patognomoniczne dla ospy wietrznej?",
        options: [
          {
            text: "Polimorfizm osutki i rzutowy charakter wysiewów, tworzący obraz tzw. 'gwieździstego nieba' (starry sky) – współistnienie w tym samym czasie i na tym samym obszarze ciała wszystkich stadiów rozwojowych wykwitu.",
            correct: true,
            feedback: "Doskonale! Ewolucja pojedynczego wykwitu w ospie: plamka -> grudka -> pęcherzyk (o cienkich ściankach z klarownym płynem - kropla rosy na płatku róży) -> krostka -> strupek. Ponieważ wysiewy następują rzutami co 24–48 godzin, w danym momencie na skórze widzimy obok siebie wszystkie stadia ewolucyjne – jest to klasyczny obraz 'gwieździstego nieba' (obraz polimorficzny)."
          },
          {
            text: "Monotematyczny monomorfizm osutki o jednoczesnym przysychaniu.",
            correct: false,
            feedback: "Monotematyczna wysypka (wszystkie wykwity w tym samym stadium) cechuje ospę prawdziwą (Variola vera), a nie ospę wietrzną!"
          },
          {
            text: "Objaw Nikolskiego z spełzaniem naskórka pod lekkim uciskiem palca.",
            correct: false,
            feedback: "Objaw Nikolskiego występuje w pęcherzycy i zespole SSSS/TEN, nie w ospie."
          },
          {
            text: "Objaw Auspitza ze skrawaniem łuski wosku.",
            correct: false,
            feedback: "Objaw Auspitza jest typowy dla łuszczycy."
          }
        ]
      },
      {
        stepNum: 3,
        title: "Krok 3: Leki przeciwgorączkowe w ospie – Bezwzględne zakazy: ASA i IBUPROFEN!",
        desc: "Matka pyta, jak zbić gorączkę u syna. Mówi, że w domowej apteczce ma aspirynę w tabletkach oraz syrop z ibuprofenem. Jakich bezwzględnych instrukcji farmakologicznych udzielasz i dlaczego?",
        scenario: "Matka pyta, jak zbić gorączkę u syna. Mówi, że w domowej apteczce ma aspirynę w tabletkach oraz syrop z ibuprofenem. Jakich bezwzględnych instrukcji farmakologicznych udzielasz i dlaczego?",
        options: [
          {
            text: "Lekiem przeciwgorączkowym z wyboru jest PARACETAMOL! Kategorycznie ZAKAZUJESZ kwasu acetylosalicylowego (ASA - ryzyko śmiertelnego zespołu Reye'a) oraz IBUPROFENU i innych NLPZ (dramatycznie zwiększają ryzyko ciężkich inwazyjnych zakażeń paciorkowcowych skóry, tkanki podskórnej i martwiczego zapalenia powięzi - necrotizing fasciitis)!",
            correct: true,
            feedback: "Wybitnie! To jedno z najważniejszych pytań ostrzegawczych w pediatrii i na LEK: 1) Kwas acetylosalicylowy (aspiryna) u dzieci z infekcją wirusową (ospa, grypa) wywołuje ZESPÓŁ REYE'A (stłuszczenie wątroby, obrzęk mózgu, śmiertelność >30–50%); 2) Ibuprofen i inne NLPZ w ospie wietrznej zaburzają migrację neutrofilów w skórze i dramatycznie podnoszą ryzyko inwazyjnych zakażeń Streptococcus pyogenes (GAS), w tym martwiczego zapalenia powięzi (necrotizing fasciitis) oraz ropowicy. Jedynym bezpiecznym lekiem przeciwgorączkowym w ospie jest paracetamol!"
          },
          {
            text: "Zalecasz naprzemienne podawanie aspiryny i ibuprofenu co 2 godziny w końskich dawkach.",
            correct: false,
            feedback: "Kardynalny błąd zagrażający życiu dziecka!"
          },
          {
            text: "Zalecasz pyralginę domięśniowo i zakazujesz paracetamolu.",
            correct: false,
            feedback: "Paracetamol jest lekiem I wyboru w ospie."
          },
          {
            text: "Zakazujesz jakichkolwiek leków przeciwgorączkowych i nakazujesz gorączkę 41°C.",
            correct: false,
            feedback: "Brak kontroli wysokiej gorączki grozi drgawkami gorączkowymi i odwodnieniem."
          }
        ]
      },
      {
        stepNum: 4,
        title: "Krok 4: Pielęgnacja skóry i leczenie świądu – Błąd stosowania 'pudrodermu'",
        desc: "Babcia dziecka doradza posmarowanie wszystkich pęcherzyków białą płynną zawiesiną z cynkiem i mentolem ('Pudroderm' / płynny puder). Jakie jest aktualne oficjalne stanowisko pediatrów i dermatologów w tej sprawie?",
        scenario: "Babcia dziecka doradza posmarowanie wszystkich pęcherzyków białą płynną zawiesiną z cynkiem i mentolem ('Pudroderm' / płynny puder). Jakie jest aktualne oficjalne stanowisko pediatrów i dermatologów w tej sprawie?",
        options: [
          {
            text: "Zdecydowanie ODRZUCASZ stosowanie płynnych pudrów i papek cynkowych! 'Pudroderm' tworzy nieprzepuszczalną skorupę, pod którą powstaje beztlenowe środowisko sprzyjające namnażaniu bakterii i głębokim zakażeniom ropnym; zalecasz krótkie kąpiele w letniej wodzie z nadmanganianem potasu, delikatne osuszanie ręcznikiem, obcinanie paznokci i doustne leki przeciwhistaminowe.",
            correct: true,
            feedback: "Znakomicie! Klasyczny błąd pielęgnacyjny z przeszłości: pudry płynne, papki i maści wysuszające zaklejają pęcherzyki, uniemożliwiają parowanie, macerują naskórek i tworzą idealną pożywkę beztlenową dla gronkowców i paciorkowców, prowadząc do zakażeń skóry i szpecących blizn! Prawidłowa pielęgnacja to codzienna krótka kąpiel higieniczna (lub prysznic) w roztworze nadmanganianu potasu (jasnoróżowym) lub z dodatkiem emolientu, osuszanie przez dotyk (bez tarcia), miejscowe środki odkażające na bazie oktenidyny oraz leki przeciwhistaminowe p.o. na świąd."
          },
          {
            text: "Zalecasz smarowanie całego ciała grubą warstwą mazi dziegciowej z cementem.",
            correct: false,
            feedback: "Toksyczne i szkodliwe."
          },
          {
            text: "Zakazujesz kąpieli dziecka przez 3 miesiące od wystąpienia wysypki.",
            correct: false,
            feedback: "Brak higieny dramatycznie zwiększa ryzyko nadkażeń bakteryjnych."
          },
          {
            text: "Nakazujesz przekłuwanie każdego pęcherzyka igłą krawiecką.",
            correct: false,
            feedback: "Kardynalny błąd: otwiera wrota dla ciężkich zakażeń bakteryjnych i tworzenia głębokich blizn."
          }
        ]
      },
      {
        stepNum: 5,
        title: "Krok 5: Wskazania do włączenia acyklowiru – Kto wymaga leczenia przeciwwirusowego?",
        desc: "Rezydent pyta, czy u tego dotychczas zdrowego 3-letniego chłopca z łagodnym przebiegiem ospy należy włączyć acyklowir dożylnie lub doustnie. Jakie są aktualne wytyczne dotyczące wskazań do acyklowiru w ospie wietrznej?",
        scenario: "Rezydent pyta, czy u tego dotychczas zdrowego 3-letniego chłopca z łagodnym przebiegiem ospy należy włączyć acyklowir dożylnie lub doustnie. Jakie są aktualne wytyczne dotyczące wskazań do acyklowiru w ospie wietrznej?",
        options: [
          {
            text: "U zdrowego 3-latka z łagodną ospą acyklowir NIE JEST WSKAZANY; wskazaniami do doustnego acyklowiru są: wiek >12 lat, choroby przewlekłe (astma, AZS), przewlekła sterydoterapia lub salicylany, powikłania oraz tzw. przypadek wtórny w rodzinie (cięższy przebieg); postać dożylną rezerwuje się dla niedoborów odporności, zapalenia płuc lub mózgu.",
            correct: true,
            feedback: "Doskonale! Według wytycznych ESPID i AAP: u dzieci <12 r.ż. z prawidłową odpornością ospa ma przebieg samoograniczający się i rutynowe podawanie acyklowiru nie jest rekomendowane (skraca czas gorączki o zaledwie 24h bez wpływu na powikłania). Wskazania do acyklowiru: pacjenci >12 r.ż., przewlekłe choroby płuc i skóry (AZS), przewlekła terapia sterydami, drugi przypadek w domu (zakażenie wewnątrzrodzinne ma cięższy przebieg z powodu wyższego inoculum). Dożylny acyklowir stosuje się bezwzględnie w immunosupresji, ospie powikłanej zapaleniem płuc lub mózgu oraz u noworodków."
          },
          {
            text: "Acyklowir dożylnie musi otrzymać każde dziecko bez względu na stan i wiek.",
            correct: false,
            feedback: "Nadmierna hospitalizacja i brak wskazań EBM."
          },
          {
            text: "Acyklowir jest nieskuteczny wobec wirusa ospy wietrznej.",
            correct: false,
            feedback: "VZV koduje kinazę tymidynową i jest wysoce wrażliwy na acyklowir."
          },
          {
            text: "Acyklowir podaje się wyłącznie kobietom po menopauzie.",
            correct: false,
            feedback: "Brak związku z tematem."
          }
        ]
      },
      {
        stepNum: 6,
        title: "Krok 6: Wczesne powikłania bakteryjne – Nadkażenia gronkowcowe i paciorkowcowe",
        desc: "W 5. dobie choroby na podudziu chłopca wokół kilku podrapanych wykwitów pojawia się rozlany, żywoczerwony, ucieplony, obrzęknięty rumień o średnicy 8 cm z sączącą się żółtą ropną treścią, a gorączka ponownie rośnie do 39.8°C. Jakie powikłanie rozpoznajesz i jakie leczenie wdrażasz?",
        scenario: "W 5. dobie choroby na podudziu chłopca wokół kilku podrapanych wykwitów pojawia się rozlany, żywoczerwony, ucieplony, obrzęknięty rumień o średnicy 8 cm z sączącą się żółtą ropną treścią, a gorączka ponownie rośnie do 39.8°C. Jakie powikłanie rozpoznajesz i jakie leczenie wdrażasz?",
        options: [
          {
            text: "Rozpoznajesz wtórne bakteryjne zapalenie skóry i tkanki podskórnej (cellulitis / ropowicę / liszajcowacenie wywołane przez S. aureus lub S. pyogenes) – najczęstsze powikłanie ospy; wdrażasz celowaną antybiotykoterapię przeciwbakteryjną parenteralną (np. cefazolina lub kloksacylina / amoksycylina z kwasem klawulanowym).",
            correct: true,
            feedback: "Znakomicie! Wtórne bakteryjne nadkażenia skóry (impetiginisatio, cellulitis, ropnie, róża) wywołane przez Staphylococcus aureus i Streptococcus pyogenes są NAJCZĘSTSZYM powikłaniem ospy wietrznej u dzieci (>50% wszystkich powikłań hospitalizowanych). Wrota zakażenia stanowią uszkodzone przez świąd i drapanie pęcherzyki. Nawrót gorączki po kilku dobach to klasyczny sygnał alarmowy nadkażenia bakteryjnego wymagający antybiotyku przeciwgronkowcowego."
          },
          {
            text: "Uznajesz to za naturalną ewolucję pęcherzyków i nie zlecasz antybiotykoterapii.",
            correct: false,
            feedback: "Kardynalny błąd! Nieleczony cellulitis u małego dziecka może przejść w sepsę gronkowcową lub martwicze zapalenie powięzi."
          },
          {
            text: "Rozpoznajesz wstrząs kardiogenny i kwalifikujesz pacjenta do pilnego ECMO.",
            correct: false,
            feedback: "Brak cech wstrząsu sercowego, objawy są miejscowe zakaźne."
          },
          {
            text: "Smarujesz zmienione zapalnie miejsce spirytusem salicylowym 95%.",
            correct: false,
            feedback: "Wywoła oparzenie chemiczne tkanek i martwicę."
          }
        ]
      },
      {
        stepNum: 7,
        title: "Krok 7: Powikłania neurologiczne – Ostre zapalenie móżdżku (Cerebellitis) vs Zapalenie mózgu",
        desc: "Konsultujesz na oddziale innego pacjenta: 5-letnią dziewczynkę w 8. dobie ospy wietrznej. Matka zauważyła, że córka 'chodzi jak pijana', zatacza się, ma szeroki chód, drżenie rąk przy sięganiu po kubek i oczopląs poziomy, ale jest w pełni przytomna i logiczna. Jakie swoiste powikłanie neurologiczne ospy rozpoznajesz i jakie jest jego rokowanie?",
        scenario: "Konsultujesz na oddziale innego pacjenta: 5-letnią dziewczynkę w 8. dobie ospy wietrznej. Matka zauważyła, że córka 'chodzi jak pijana', zatacza się, ma szeroki chód, drżenie rąk przy sięganiu po kubek i oczopląs poziomy, ale jest w pełni przytomna i logiczna. Jakie swoiste powikłanie neurologiczne ospy rozpoznajesz i jakie jest jego rokowanie?",
        options: [
          {
            text: "Ostre zapalenie móżdżku (acute cerebellitis / ataksja móżdżkowa poospowa); jest najczęstszym powikłaniem neurologicznym ospy u dzieci, ma charakter autoimmunologiczny poinfekcyjny i cechuje się DOSKONAŁYM rokowaniem (całkowite samoistne ustąpienie w ciągu kilku tygodni).",
            correct: true,
            feedback: "Wybitnie! Klasyczne pytanie egzaminacyjne LEK: ostra ataksja móżdżkowa (acute cerebellar ataxia / cerebellitis) występuje u ok. 1 na 4000 dzieci z ospą wietrzną, zazwyczaj pod koniec 1. lub w 2. tygodniu choroby. Objawia się nagłą ataksją tułowia i chodu (chód marynarski/na szerokiej podstawie), drżeniem zamiarowym, dyzartrią i oczopląsem, bez zaburzeń świadomości. Rokowanie jest wyśmienite – u >95% dzieci objawy ustępują całkowicie bez trwałych ubytków. (W odróżnieniu od ostrego zapalenia mózgu - encephalitis, które występuje rzadziej, przebiega z drgawkami, śpiączką i ma ciężkie rokowanie)."
          },
          {
            text: "Udar krwotoczny pnia mózgu o śmiertelnym rokowaniu.",
            correct: false,
            feedback: "Skrajnie nieprawdopodobne; wywiad ospy i czysta ataksja to typowy obraz poospowego zapalenia móżdżku."
          },
          {
            text: "Guz rdzenia kręgowego rozwijający się w 24 godziny.",
            correct: false,
            feedback: "Guzy OUN nie rozwijają się w ciągu 1 doby."
          },
          {
            text: "Histeria dziecięca niewymagająca żadnej uwagi.",
            correct: false,
            feedback: "Objawy móżdżkowe (oczopląs, ataksja) są organicznym powikłaniem neurologicznym."
          }
        ]
      },
      {
        stepNum: 8,
        title: "Krok 8: Okres zakaźności, izolacja i profilaktyka poekspozycyjna",
        desc: "Matka 3-letniego chłopca pyta: 1) Jak długo syn zakaża inne dzieci? 2) W domu jest jej 28-letnia siostra w 14. tygodniu ciąży, która nigdy nie chorowała na ospę i miała kontakt z chłopcem 2 dni temu. Jakie są zasady zakaźności i ratunkowa profilaktyka poekspozycyjna?",
        scenario: "Matka 3-letniego chłopca pyta: 1) Jak długo syn zakaża inne dzieci? 2) W domu jest jej 28-letnia siostra w 14. tygodniu ciąży, która nigdy nie chorowała na ospę i miała kontakt z chłopcem 2 dni temu. Jakie są zasady zakaźności i ratunkowa profilaktyka poekspozycyjna?",
        options: [
          {
            text: "Pacjent zakaża od 1–2 dni PRZED wystąpieniem wysypki do czasu ZASCHNIĘCIA OSTATNICH PĘCHERZYKÓW W STRUPKI (odpadające strupki nie są zakaźne); seroujemna kobieta w ciąży wymaga pilnego podania swoistej immunoglobuliny przeciw VZV (VZIG / Varitect) do 96–120 godzin po ekspozycji; szczepionka żywa jest u ciężarnych PRZECIWWSKAZANA!",
            correct: true,
            feedback: "Doskonale! Pewniak egzaminacyjny LEK: 1) Okres zakaźności ospy wietrznej trwa od 24–48 godzin PRZED pojawieniem się pierwszego wykwitu do momentu, gdy WSZYSTKIE pęcherzyki zamienią się w suche strupki (zazwyczaj 6–8 dni). Suche strupki NIE zawierają zakaźnego wirusa; 2) Profilaktyka poekspozycyjna u osób z wysokiego ryzyka powikłań (kobiety w ciąży bez odporności, noworodki matek chorujących okołoporodowo, osoby z niedoborem odporności): podanie swoistej immunoglobuliny VZIG w ciągu 96h (maks. do 10 dni wg CDC). Szczepionka przeciw VZV jest szczepionką żywą atenuowaną – BEZWZGLĘDNIE PRZECIWWSKAZANĄ w ciąży!"
          },
          {
            text: "Dziecko zakaża tylko wtedy, gdy strupki całkowicie odpadną od skóry.",
            correct: false,
            feedback: "Zupełna nieprawda: strupki nie są zakaźne, zakaźny jest płyn pęcherzykowy i wydzielina dróg oddechowych."
          },
          {
            text: "Kobieta w ciąży powinna natychmiast otrzymać żywą szczepionkę przeciw VZV.",
            correct: false,
            feedback: "Kardynalny błąd! Żywa szczepionka jest bezwzględnie przeciwwskazana w ciąży ze względu na ryzyko ospy wrodzonej."
          },
          {
            text: "VZV nie jest wirusem zakaźnym drogą powietrzną.",
            correct: false,
            feedback: "Ospa wietrzna (ang. chickenpox, stąd polska nazwa 'wietrzna') przenosi się z prądami powietrza na duże odległości (wysoka zaraźliwość)."
          }
        ]
      }
    ];
  });

  // ==========================================
  // CASE 113: Mononukleoza zakaźna (EBV)
  // ==========================================
  await upgradeCase('113_mononukleoza_ebv.json', (c) => {
    c.steps = [
      {
        stepNum: 1,
        title: "Krok 1: Wstępna ocena na oddziale – 15-latek z gorączką, 'angina' i powiększeniem szyi",
        desc: "Do oddziału pediatrycznego zostaje przyjęty 15-letni licealista. Od 7 dni ma wysoką gorączkę do 39.5°C ze zlewnymi potami, skrajne osłabienie (astenia), trudności w połykaniu z powodu bólu gardła oraz chrapanie w nocy z uczuciem 'duszności'. W badaniu fizykalnym: HR 105/min, temp. 38.8°C, masywnie powiększone, rozpulchnione migdałki podniebienne stykające się niemal w linii pośrodkowej ('kissing tonsils') pokryte grubymi szarobiałymi nalotami włóknikowymi, obrzęk powiek (objaw Glanzmana) oraz uogólnione, bolesne powiększenie węzłów chłonnych, zwłaszcza wzdłuż tylnej krawędzi mięśnia mostkowo-obojczykowo-sutkowego (węzły szyjne tylne) i karkowe. Jaka jest Twoja wstępna diagnoza?",
        scenario: "Do oddziału pediatrycznego zostaje przyjęty 15-letni licealista. Od 7 dni ma wysoką gorączkę do 39.5°C ze zlewnymi potami, skrajne osłabienie (astenia), trudności w połykaniu z powodu bólu gardła oraz chrapanie w nocy z uczuciem 'duszności'. W badaniu fizykalnym: HR 105/min, temp. 38.8°C, masywnie powiększone, rozpulchnione migdałki podniebienne stykające się niemal w linii pośrodkowej ('kissing tonsils') pokryte grubymi szarobiałymi nalotami włóknikowymi, obrzęk powiek (objaw Glanzmana) oraz uogólnione, bolesne powiększenie węzłów chłonnych, zwłaszcza wzdłuż tylnej krawędzi mięśnia mostkowo-obojczykowo-sutkowego (węzły szyjne tylne) i karkowe. Jaka jest Twoja wstępna diagnoza?",
        options: [
          {
            text: "Podejrzewasz mononukleozę zakaźną (Infectious Mononucleosis / 'chorobę pocałunków') wywołaną przez wirus Epsteina-Barr (EBV / HHV-4); klasyczna triada objawów: wysoka gorączka, zapalenie gardła i migdałków z nalotami oraz uogólniona limfadenopatia (zwłaszcza węzły szyjne tylne i karkowe).",
            correct: true,
            feedback: "Znakomicie! Klasyczna prezentacja mononukleozy zakaźnej u nastolatków: triada mononukleozowa (gorączka + pseudobłoniasta angina + limfadenopatia). Kluczowy szczegół różnicujący z anginą paciorkowcową: w mononukleozie powiększone są przede wszystkim węzły chłonne SZYJNE TYLNE i karkowe (w anginie bakteryjnej – podżuchwowe i szyjne przednie). Ponadto obrzęk powiek i nasady nosa (objaw Glanzmana) występuje u 30% chorych."
          },
          {
            text: "Rozpoznajesz klasyczną anginę paciorkowcową i od razu wypisujesz pacjenta do domu.",
            correct: false,
            feedback: "Błąd: zajęcie węzłów szyjnych tylnych, tygodniowy czas trwania gorączki i objaw Glanzmana silnie przemawiają za mononukleozą."
          },
          {
            text: "Stawiasz rozpoznanie błonicy krtani i podajesz surowicę końską.",
            correct: false,
            feedback: "Błonica występuje skrajnie rzadko w populacji szczepionej, brak szczekającego kaszlu i stridoru krtaniowego."
          },
          {
            text: "Podejrzewasz raka migdałka podniebiennego u 15-latka.",
            correct: false,
            feedback: "Zmiany są obustronne, ostre, z wysoką gorączką i uogólnioną limfadenopatią – to ostra choroba zakaźna."
          }
        ]
      },
      {
        stepNum: 2,
        title: "Krok 2: Badanie brzucha – Powiększenie śledziony i wątroby",
        desc: "Podczas badania palpacyjnego jamy brzusznej wyczuwasz dolny biegun śledziony wystający 4 cm poniżej lewego łuku żebrowego (splenomegalia), tkliwy przy palpacji. Wątroba jest wyczuwalna 2 cm poniżej prawego łuku żebrowego (hepatomegalia). Dlaczego obecność splenomegalii ma tak fundamentalne znaczenie w mononukleozie?",
        scenario: "Podczas badania palpacyjnego jamy brzusznej wyczuwasz dolny biegun śledziony wystający 4 cm poniżej lewego łuku żebrowego (splenomegalia), tkliwy przy palpacji. Wątroba jest wyczuwalna 2 cm poniżej prawego łuku żebrowego (hepatomegalia). Dlaczego obecność splenomegalii ma tak fundamentalne znaczenie w mononukleozie?",
        options: [
          {
            text: "Splenomegalia występuje u >50–60% chorych z mononukleozą EBV; powiększona śledziona jest obrzęknięta, przekrwiona i ma cienką torebkę, co stwarza śmiertelne ryzyko PĘKNIĘCIA ŚLEDZIONY (spontanicznego lub po minimalnym urazie); bezwzględnie wymaga ograniczenia wysiłku fizycznego i unikania sportów kontaktowych.",
            correct: true,
            feedback: "Doskonale! Pęknięcie śledziony jest najczęstszą przyczyną zgonu w przebiegu mononukleozy zakaźnej (występuje u 0.1–0.5% chorych, najczęściej między 2. a 3. tygodniem choroby). Śledziona powiększa się wskutek masywnej infiltracji limfocytarnej, a jej torebka staje się napięta i krucha. Wymaga to delikatnego badania brzucha (zakaz głębokiej bolesnej palpacji!) i rygorystycznego zakazu uprawiania sportu."
          },
          {
            text: "Splenomegalia oznacza konieczność natychmiastowej planowej splenektomii profilaktycznej.",
            correct: false,
            feedback: "Splenektomia profilaktyczna jest błędem w sztuce; powiększenie śledziony ustępuje samoistnie po kilku tygodniach."
          },
          {
            text: "Śledziona w mononukleozie ulega całkowitemu zwapnieniu i zanika.",
            correct: false,
            feedback: "Niedorzeczne."
          },
          {
            text: "Powiększenie śledziony wyklucza zakażenie wirusowe.",
            correct: false,
            feedback: "Wirusy limfotropowe (EBV, CMV) są klasyczną przyczyną powiększenia śledziony i wątroby."
          }
        ]
      },
      {
        stepNum: 3,
        title: "Krok 3: Morfologia krwi obwodowej – Atypowe limfocyty (virocyty Downeya)",
        desc: "Otrzymujesz wynik morfologii krwi z rozmazem mikroskopowym: Leukocytoza 16.4 G/l, limfocytoza bezwzględna 68% (norma 20–45%), obecność 24% ATYPOWYCH LIMFOCYTÓW (komórek mononuklearnych / virocytów / komórek Downeya). Hemoglobina 14.1 g/dl, płytki krwi 135 G/l. Aminotransferazy: ALT 185 IU/l, AST 160 IU/l. Co oznaczają te 'atypowe limfocyty' w rozmazie?",
        scenario: "Otrzymujesz wynik morfologii krwi z rozmazem mikroskopowym: Leukocytoza 16.4 G/l, limfocytoza bezwzględna 68% (norma 20–45%), obecność 24% ATYPOWYCH LIMFOCYTÓW (komórek mononuklearnych / virocytów / komórek Downeya). Hemoglobina 14.1 g/dl, płytki krwi 135 G/l. Aminotransferazy: ALT 185 IU/l, AST 160 IU/l. Co oznaczają te 'atypowe limfocyty' w rozmazie?",
        options: [
          {
            text: "Atypowe limfocyty (>10% w rozmazie) to pobudzone, aktywowane limfocyty T cytotoksyczne (CD8+), które proliferują w odpowiedzi na zakażenie limfocytów B przez wirus EBV; jest to hematologiczny znak rozpoznawczy mononukleozy zakaźnej.",
            correct: true,
            feedback: "Wybitnie! Choć wirus EBV infekuje i transformuje limfocyty B (poprzez receptor CD21), to widoczne w rozmazie krwi 'atypowe limfocyty' (virocyty Downeya) to w rzeczywistości aktywowane limfocyty T (głównie cytotoksyczne CD8+), walczące z zakażonymi limfocytami B! Limfocytoza >50% z obecnością >10% atypowych limfocytów w połączeniu z podwyższonymi aminotransferazami (zapalenie wątroby w EBV występuje u >80% chorych) to klasyczny zestaw LEK."
          },
          {
            text: "Atypowe limfocyty to blasty białaczkowe jednoznacznie potwierdzające ostrą białaczkę szpikową (AML).",
            correct: false,
            feedback: "Błąd: virocyty w mononukleozie to poliklonalne dojrzałe aktywowane komórki T, nie komórki blastyczne białaczki."
          },
          {
            text: "Świadczą o zakażeniu tasiemcem uzbrojonym.",
            correct: false,
            feedback: "Brak związku."
          },
          {
            text: "Oznaczają wrodzoną agammaglobulinemię Brutona.",
            correct: false,
            feedback: "W chorobie Brutona limfocytów B w ogóle brak, tu mamy masywną limfocytozę."
          }
        ]
      },
      {
        stepNum: 4,
        title: "Krok 4: Klasyczny błąd jatrogenny – Osutka po amoksycylinie / ampicylinie",
        desc: "Przeglądasz dokumentację: 3 dni temu lekarz w poradni nocnej uznał naloty na migdałkach za anginę ropną i zapisał pacjentowi amoksycylinę 1000 mg 2 razy dziennie. Dziś na całym ciele chłopca (twarz, tułów, kończyny) pojawiła się uogólniona, żywoczerwona, swędząca osutka plamisto-grudkowa (odropodobna). Jak interpretujesz tę wysypkę i o czym informujesz pacjenta?",
        scenario: "Przeglądasz dokumentację: 3 dni temu lekarz w poradni nocnej uznał naloty na migdałkach za anginę ropną i zapisał pacjentowi amoksycylinę 1000 mg 2 razy dziennie. Dziś na całym ciele chłopca (twarz, tułów, kończyny) pojawiła się uogólniona, żywoczerwona, swędząca osutka plamisto-grudkowa (odropodobna). Jak interpretujesz tę wysypkę i o czym informujesz pacjenta?",
        options: [
          {
            text: "Jest to swoista osutka polekowa po aminopenicylinach w przebiegu mononukleozy EBV (występuje u 80–90% pacjentów leczonych amoksycyliną w ostrym EBV); NIE JEST to prawdziwa alergia zależna od IgE na penicyliny, lecz przejściowa reakcja immunologiczna związana z poliklonalną aktywacją limfocytów przez wirus.",
            correct: true,
            feedback: "Znakomicie! To jeden z najsłynniejszych fenomenów w medycynie i pewniak na każdym LEK: podanie aminopenicyliny (amoksycyliny, ampicyliny) pacjentowi z mononukleozą EBV w 80–90% przypadków wywołuje w ciągu 7–10 dni (lub szybciej) odropodobną, zlewającą się osutkę plamisto-grudkową. Kluczowy fakt kliniczny: to NIE oznacza trwałej alergii na penicylinę! Po wyleczeniu mononukleozy pacjent w przyszłości może bezpiecznie przyjmować penicyliny (brak mechanizmu IgE-zależnego). Natychmiast odstawiamy amoksycylinę."
          },
          {
            text: "Rozpoznajesz wstrząs anafilaktyczny i natychmiast wstrzykujesz 10 ampułek adrenaliny dożylnie.",
            correct: false,
            feedback: "Brak duszności krtaniowej, brak spadku ciśnienia tętniczego; to łagodna osutka plamisto-grudkowa, nie anafilaksja."
          },
          {
            text: "Wpisujesz bezwzględną, dożywotnią dyskwalifikację ze wszystkich antybiotyków beta-laktamowych.",
            correct: false,
            feedback: "Błąd: to nie jest trwała alergia na beta-laktamy, występuje tylko w ostrej fazie infekcji EBV."
          },
          {
            text: "Zwiększasz dawkę amoksycyliny do 6 gramów na dobę, aby zwalczyć wysypkę.",
            correct: false,
            feedback: "Zwiększenie dawki nasiliłoby toksyczność i zmiany skórne."
          }
        ]
      },
      {
        stepNum: 5,
        title: "Krok 5: Diagnostyka serologiczna – Przeciwciała heterofilne i swoiste anty-EBV",
        desc: "W celu potwierdzenia etiologii zlecana jest diagnostyka serologiczna. Jakie testy serologiczne stosuje się w diagnostyce mononukleozy EBV i jak interpretujesz obecność poszczególnych przeciwciał?",
        scenario: "W celu oceny potwierdzenia etiologii zlecana jest diagnostyka serologiczna. Jakie testy serologiczne stosuje się w diagnostyce mononukleozy EBV i jak interpretujesz obecność poszczególnych przeciwciał?",
        options: [
          {
            text: "Test na przeciwciała heterofilne (odczyn Paula-Bunnella-Davidsohna / szybki Monospot test) – dodatni u nastolatków/dorosłych; potwierdzenie swoiste: obecność anty-VCA IgM (wczesny marker świeżej infekcji) oraz anty-VCA IgG przy BRAKU anty-EBNA (przeciwciała przeciw antygenowi jądrowemu EBNA pojawiają się dopiero po 2–3 miesiącach od zakażenia).",
            correct: true,
            feedback: "Doskonale! Profil serologiczny w mononukleozie EBV (żelazne reguły LEK): 1) Przeciwciała heterofilne (aglutynacja krwinek barana/konia) – swoiste dla EBV u nastolatków i dorosłych (u małych dzieci często fałszywie ujemne); 2) Swoiste przeciwciała anty-EBV: W świeżym, ostrym zakażeniu obecne są przeciwciała anty-VCA IgM (antygen kapsydowy) oraz anty-VCA IgG. Klucz: przeciwciała przeciw antygenowi jądrowemu anty-EBNA pojawiają się BARDZO PÓŹNO (po 6–12 tygodniach od zachorowania) i utrzymują do końca życia. Obecność anty-VCA IgM (+) i anty-EBNA (-) to 100% dowód ostrej mononukleozy!"
          },
          {
            text: "Obecność wyłącznie anty-EBNA IgG świadczy o ostrym zakażeniu w pierwszym tygodniu.",
            correct: false,
            feedback: "Błąd: anty-EBNA pojawiają się dopiero po miesiącach; ich obecność świadczy o zakażeniu przebytym dawno temu."
          },
          {
            text: "Ujemny odczyn Paula-Bunnella u 2-latka wyklucza mononukleozę w 100%.",
            correct: false,
            feedback: "U dzieci <4-5 r.ż. przeciwciała heterofilne są ujemne u >50% chorych (wymagana swoista serologia anty-VCA)."
          },
          {
            text: "Jedyną metodą diagnostyki jest punkcja szpiku kostnego.",
            correct: false,
            feedback: "Punkcja szpiku jest zbędna i inwazyjna."
          }
        ]
      },
      {
        stepNum: 6,
        title: "Krok 6: Postępowanie terapeutyczne i ścisłe wskazania do glikokortykosteroidów",
        desc: "W 3. dobie hospitalizacji migdałki chłopca powiększają się tak znacznie, że występuje narastający stridor oddechowy, duszność w spoczynku i niemożność przełknięcia śliny. Czy w mononukleozie rutynowo stosuje się sterydy i jakie są bezwzględne wskazania do ich włączenia?",
        scenario: "W 3. dobie hospitalizacji migdałki chłopca powiększają się tak znacznie, że występuje narastający stridor oddechowy, duszność w spoczynku i niemożność przełknięcia śliny. Czy w mononukleozie rutynowo stosuje się sterydy i jakie są bezwzględne wskazania do ich włączenia?",
        options: [
          {
            text: "Sterydów NIE STOSUJE SIĘ rutynowo; bezwzględnymi wskazaniami do krótkiego kursu GKS (np. prednizon lub deksametazon) są: zagrażająca obturacja dróg oddechowych przez obrzęk migdałków i tkanki gardła, powikłania neurologiczne (zapalenie mózgu, polineuropatia), ostra niedokrwistość hemolityczna autoimmunologiczna (AIHA) lub ciężka małopłytkowość.",
            correct: true,
            feedback: "Prawidłowo! Mononukleoza zakaźna to choroba samoograniczająca się, w której leczenie jest objawowe (paracetamol/ibuprofen, nawodnienie). Glikokortykosteroidy są przeciwwskazane w rutynowym przebiegu, ponieważ osłabiają odpowiedź przeciwwirusową. Jednak w sytuacjach powikłań zagrażających życiu – takich jak obturacja dróg oddechowych przez olbrzymie migdałki (jak u naszego pacjenta), autoimmunologiczna anemia hemolityczna, skrajna trombocytopenia czy zapalenie mózgu – krótki kurs GKS (prednizon 1 mg/kg/d przez 5-7 dni) jest lekiem ratującym życie."
          },
          {
            text: "Glikokortykosteroidy podaje się rutynowo każdemu choremu z EBV przez okres 1 roku.",
            correct: false,
            feedback: "Szkodliwe i bezpodstawne narażenie na powikłania posteroidowe."
          },
          {
            text: "Wskazaniem do sterydów jest wyłącznie obecność łagodnego bólu gardła.",
            correct: false,
            feedback: "Łagodny ból gardła leczy się paracetamolem i płukankami, nie sterydami ogólnoustrojowymi."
          },
          {
            text: "Należy natychmiast wdrożyć leczenie gancyklowirem i f盤karnetem w monoterapii.",
            correct: false,
            feedback: "Leki przeciwwirusowe nie wykazują istotnej skuteczności klinicznej w mononukleozie EBV u pacjentów immunokompetentnych."
          }
        ]
      },
      {
        stepNum: 7,
        title: "Krok 7: Zagrożenie pęknięciem śledziony i ograniczenia aktywności fizycznej",
        desc: "Duszność ustąpiła po wlewie deksametazonu. Po tygodniu leczenia pacjent czuje się znacznie lepiej, gorączka spadła do 37.2°C. Chłopiec jest kapitanem szkolnej drużyny piłki nożnej i pyta, kiedy może wrócić do treningów i meczów ligowych. Jakiej kategorycznej odpowiedzi udzielasz zgodnie z wytycznymi medycyny sportowej?",
        scenario: "Duszność ustąpiła po wlewie deksametazonu. Po tygodniu leczenia pacjent czuje się znacznie lepiej, gorączka spadła do 37.2°C. Chłopiec jest kapitanem szkolnej drużyny piłki nożnej i pyta, kiedy może wrócić do treningów i meczów ligowych. Jakiej kategorycznej odpowiedzi udzielasz zgodnie z wytycznymi medycyny sportowej?",
        options: [
          {
            text: "Kategoryczny zakaz uprawiania sportów kontaktowych, podnoszenia ciężarów i intensywnego wysiłku fizycznego przez MINIMUM 3–4 TYGODNIE (a optymalnie do pełnej normalizacji wielkości śledziony w kontrolnym badaniu USG); pęknięcie śledziony grozi nagłym, śmiertelnym krwotokiem do jamy otrzewnej.",
            correct: true,
            feedback: "Wybitnie! To żelazna reguła LEK: w mononukleozie zakaźnej pęknięcie śledziony najczęściej zdarza się w ciągu pierwszych 3-4 tygodni od początku objawów, nierzadko po błahym urazie brzucha lub nagłym wzroście tłoczni brzusznej. Powrót do sportów kontaktowych (piłka nożna, sztuki walki, koszykówka) jest dozwolony najwcześniej po 4 tygodniach od początku choroby i wyłącznie pod warunkiem braku powiększenia śledziony w badaniu USG!"
          },
          {
            text: "Zezwalasz na udział w meczu piłkarskim już następnego dnia po wypisie.",
            correct: false,
            feedback: "Śmiertelny błąd! Kopnięcie piłką lub starcie z rywalem może doprowadzić do pęknięcia śledziony i zgonu w drodze do szpitala."
          },
          {
            text: "Zakaz uprawiania sportu obowiązuje do końca życia (dożywotnia dyskwalifikacja sportowa).",
            correct: false,
            feedback: "Przesada: po wygojeniu i powrocie śledziony do normy pacjent może w pełni powrócić do sportu wyczynowego."
          },
          {
            text: "Zalecasz intensywny boks i zapasy w celu wzmocnienia torebki śledziony.",
            correct: false,
            feedback: "Absurdalne i bezpośrednio zagrażające życiu."
          }
        ]
      },
      {
        stepNum: 8,
        title: "Krok 8: Diagnostyka różnicowa zespołu mononukleozopodobnego",
        desc: "Rezydent pyta, jakie inne patogeny należy brać pod uwagę, gdy pacjent ma obraz mononukleozy (gorączka, ból gardła, limfadenopatia, atypowe limfocyty), ale testy na przeciwciała heterofilne i swoiste EBV są ujemne (tzw. zespół mononukleozopodobny).",
        scenario: "Rezydent pyta, jakie inne patogeny należy brać pod uwagę, gdy pacjent ma obraz mononukleozy (gorączka, ból gardła, limfadenopatia, atypowe limfocyty), ale testy na przeciwciała heterofilne i swoiste EBV są ujemne (tzw. zespół mononukleozopodobny).",
        options: [
          {
            text: "Najczęstszą przyczyną zespołu mononukleozopodobnego (EBV-ujemnego) jest CYTOMEGALOWIRUS (CMV - u 50-70% przypadków); inne przyczyny: pierwotne zakażenie HIV (ostra choroba retrowirusowa), toksoplazmoza (Toxoplasma gondii), wirus HHV-6 oraz wirusowe zapalenia wątroby.",
            correct: true,
            feedback: "Doskonale! Pewniak egzaminacyjny LEK: Zespół mononukleozopodobny z ujemnymi testami na EBV (heterofilne i swoiste ujemne) najczęściej jest wywołany przez Cytomegalowirus (CMV). W mononukleozie CMV rzadziej występuje ciężkie zapalenie gardła, a dominuje gorączka, powiększenie wątroby i śledziony oraz limfocytoza z atypowymi komórkami. Inne krytyczne rozpoznanie różnicowe to ostra choroba retrowirusowa w pierwotnym zakażeniu HIV (wymaga badania antygenu p24/RNA HIV) oraz toksoplazmoza nabyta."
          },
          {
            text: "Zespół mononukleozopodobny zawsze oznacza zakażenie wścieklizną.",
            correct: false,
            feedback: "Wścieklizna to śmiertelne zapalenie mózgu, nie zespół mononukleozowy."
          },
          {
            text: "Ujemny wynik na EBV w 100% wyklucza jakąkolwiek chorobę infekcyjną.",
            correct: false,
            feedback: "Fałsz: CMV i HIV dają identyczny obraz kliniczny."
          },
          {
            text: "Przyczyną jest wyłącznie zatrucie ołowiem.",
            correct: false,
            feedback: "Ołowica daje anemię z nakrapianiem zasadochłonnym, kolkę ołowiczą i rąbek ołowiczy, nie zapalenie gardła i virocyty."
          }
        ]
      }
    ];
  });

  // ==========================================
  // CASE 114: Krztusiec (Pertussis)
  // ==========================================
  await upgradeCase('114_krztusiec_pertussis.json', (c) => {
    c.steps = [
      {
        stepNum: 1,
        title: "Krok 1: Wstępna ocena na SOR – 2-miesięczne niemowlę z dławiącym kaszlem i bezdechami",
        desc: "Dyżurujesz na SOR dziecięcym. Przerażeni rodzice przywożą 2-miesięczne niemowlę. Dziecko urodziło się o czasie, nie otrzymało jeszcze pierwszej dawki szczepienia DTP (odroczone z powodu kataru). Od 10 dni dziecko miało łagodne objawy przeziębienia (katar, pokasływanie bez gorączki). Od 3 dni kaszel stał się napadowy: serie 10–15 gwałtownych wydechowych kaszlnięć na jednym wydechu, dziecko sinieje na twarzy, wysuwa język, łzawi, a na koniec napadu bierze głośny, świszczący, piskliwy wdech przypominający 'pianie koguta' (whoop), po czym wymiotuje gęstym śluzem. W trakcie napadu na Twoich oczach występuje 15-sekundowy bezdech ze spadkiem SpO2 do 74% i bradykardią 70/min. Jakie jest Twoje natychmiastowe podejrzenie?",
        scenario: "Dyżurujesz na SOR dziecięcym. Przerażeni rodzice przywożą 2-miesięczne niemowlę. Dziecko urodziło się o czasie, nie otrzymało jeszcze pierwszej dawki szczepienia DTP (odroczone z powodu kataru). Od 10 dni dziecko miało łagodne objawy przeziębienia (katar, pokasływanie bez gorączki). Od 3 dni kaszel stał się napadowy: serie 10–15 gwałtownych wydechowych kaszlnięć na jednym wydechu, dziecko sinieje na twarzy, wysuwa język, łzawi, a na koniec napadu bierze głośny, świszczący, piskliwy wdech przypominający 'pianie koguta' (whoop), po czym wymiotuje gęstym śluzem. W trakcie napadu na Twoich oczach występuje 15-sekundowy bezdech ze spadkiem SpO2 do 74% i bradykardią 70/min. Jakie jest Twoje natychmiastowe podejrzenie?",
        options: [
          {
            text: "Rozpoznajesz krztusiec (Pertussis / koklusz) w fazie napadowej wywołany przez Bordetella pertussis u nieszczepionego niemowlęcia; zagrażający życiu stan wymagający natychmiastowej tlenoterapii biernej, odśluzowania dróg oddechowych, kardiomonitoringu i hospitalizacji.",
            correct: true,
            feedback: "Znakomicie! Klasyczny, dramatyczny przebieg krztuśca u małego niemowlęcia przed ukończeniem cyklu szczepień podstawowych. Krztusiec u niemowląt <3–6. m.ż. jest chorobą śmiertelnie niebezpieczną: napady kaszlu często nie kończą się klasycznym 'pianiem' (z powodu wiotkości krtani), lecz bezpośrednim BEZDECHEM (apnea), sinicą, bradykardią i drgawkami hipoksyjnymi. Wymaga natychmiastowego monitorowania parametrów życiowych i tlenoterapii."
          },
          {
            text: "Rozpoznajesz zwykłą kolkę niemowlęcą i zalecasz krople z simetikonem.",
            correct: false,
            feedback: "Kardynalny błąd! Bezdechy ze spadkiem SpO2 do 74% i sinicą to bezpośrednie zagrożenie zatrzymaniem krążenia."
          },
          {
            text: "Podejrzewasz refluks żołądkowo-przełykowy i odsyłasz dziecko do domu z zagęszczaczem pokarmu.",
            correct: false,
            feedback: "Błąd: napady kaszlu z 'pianiem' i bezdechem to objaw ciężkiej infekcji dróg oddechowych (krztuśca)."
          },
          {
            text: "Stawiasz rozpoznanie astmy oskrzelowej i podajesz wziewny formoterol.",
            correct: false,
            feedback: "Astmy nie rozpoznaje się u 2-miesięcznego niemowlęcia, a leki beta-2-mimetyczne nie leczą krztuśca."
          }
        ]
      },
      {
        stepNum: 2,
        title: "Krok 2: Badania laboratoryjne CITO – Fenomen spektakularnej limfocytozy",
        desc: "Pobierasz krew na cito. Wyniki: Leukocytoza 38.5 G/l z bezwzględną limfocytozą 76% (limfocyty 29.2 G/l, małe dojrzałe limfocyty o prawidłowej morfologii). Hemoglobina 11.8 g/dl, płytki 420 G/l. CRP 3.2 mg/l (w normie!), prokalcytonina ujemna. Brak gorączki (temp. 36.8°C). Jak tłumaczysz ten uderzający obraz laboratoryjny?",
        scenario: "Pobierasz krew na cito. Wyniki: Leukocytoza 38.5 G/l z bezwzględną limfocytozą 76% (limfocyty 29.2 G/l, małe dojrzałe limfocyty o prawidłowej morfologii). Hemoglobina 11.8 g/dl, płytki 420 G/l. CRP 3.2 mg/l (w normie!), prokalcytonina ujemna. Brak gorączki (temp. 36.8°C). Jak tłumaczysz ten uderzający obraz laboratoryjny?",
        options: [
          {
            text: "Ekstremalna leukocytoza z bezwzględną limfocytozą przy prawidłowym CRP i braku gorączki jest patognomonicznym objawem krztuśca; wynika z działania TOKSYNY KRZTUŚCOWEJ (PT - Pertussis Toxin), która blokuje wnikanie limfocytów z krwioobiegu do węzłów chłonnych (efekt limfocytozy).",
            correct: true,
            feedback: "Doskonale! Pewniak egzaminacyjny LEK: Toksyna krztuścowa (białko o aktywności ADP-rybozylotransferazy białek G) hamuje migrację (homing) krążących limfocytów T i B przez śródbłonek do tkanki limfatycznej węzłów chłonnych. W efekcie limfocyty kumulują się we krwi obwodowej, dając gigantyczną leukocytozę (często 30–50 G/l) z dominacją dojrzałych limfocytów, przy braku wysokiego CRP i braku gorączki! Leukocytoza >30 G/l u niemowlęcia jest ponadto negatywnym czynnikiem rokowniczym (ryzyko nadciśnienia płucnego z leukostazą)."
          },
          {
            text: "Jest to dowód ostrej białaczki limfoblastycznej (ALL) i wymaga natychmiastowej chemioterapii indukcyjnej.",
            correct: false,
            feedback: "Błąd: limfocyty w krztuścu są morfologicznie dojrzałe, brak blastów, brak niedokrwistości i brak małopłytkowości typowych dla ALL."
          },
          {
            text: "Taki wynik świadczy o posocznicy paciorkowcowej z neutrofilią.",
            correct: false,
            feedback: "W posocznicy paciorkowcowej rośnie CRP i dominują neutrofile, a nie limfocyty."
          },
          {
            text: "Jest to fizjologiczna norma u każdego noworodka i niemowlęcia.",
            correct: false,
            feedback: "Leukocytoza 38.5 G/l jest wartością skrajnie patologiczną."
          }
        ]
      },
      {
        stepNum: 3,
        title: "Krok 3: Potwierdzenie mikrobiologiczne – Złoty standard PCR z nosogardła",
        desc: "Pielęgniarka pyta, jaki materiał i do jakiego badania należy pobrać w celu laboratoryjnego potwierdzenia zakażenia Bordetella pertussis. Jaką procedurę zlecasz?",
        scenario: "Pielęgniarka pyta, jaki materiał i do jakiego badania należy pobrać w celu laboratoryjnego potwierdzenia zakażenia Bordetella pertussis. Jaką procedurę zlecasz?",
        options: [
          {
            text: "Głęboki wymaz z tylnej ściany nosogardła (pobrany cienką wymazówką dakronową lub nylonową wprowadzoną przez nozdrze) na badanie molekularne metodą PCR (złoty standard w pierwszych 3–4 tygodniach infekcji) lub posiew na podłoże Regan-Lowe / Bordet-Gengou.",
            correct: true,
            feedback: "Znakomicie! Wytyczne diagnostyczne krztuśca: materiałem z wyboru jest WYMAZ Z TYLNEJ ŚCIANY NOSOGARDŁA (B. pertussis wykazuje tropizm do rzęskowego nabłonka nosogardła). Wymaz z gardła lub jamy ustnej jest bezwartościowy! Badaniem z wyboru o najwyższej czułości w pierwszych 3-4 tygodniach choroby jest test genetyczny PCR (wykrycie DNA Bordetella). Posiew bakteryjny na specjalne podłoże (Regan-Lowe z węglem aktywowanym i krwią) ma 100% swoistość, ale małą czułość i wymaga do 7-10 dni inkubacji."
          },
          {
            text: "Wymaz z języka pobrany suchą watówką bawełnianą na podłoże agarowe.",
            correct: false,
            feedback: "Bakterie bytują w nosogardle, bawełna zawiera kwasy tłuszczowe hamujące wzrost krztuśca."
          },
          {
            text: "Posiew moczu na podłoże Chapmana.",
            correct: false,
            feedback: "Krztusiec nie jest wydalany z moczem."
          },
          {
            text: "Oznaczenie ASO w surowicy krwi.",
            correct: false,
            feedback: "ASO to marker paciorkowca GAS, nie krztuśca."
          }
        ]
      },
      {
        stepNum: 4,
        title: "Krok 4: Antybiotykoterapia I rzutu z wyboru – Grupa makrolidów",
        desc: "Zlecasz natychmiastowe wdrożenie celowanej antybiotykoterapii. Jaka grupa antybiotyków jest lekiem pierwszego wyboru w leczeniu i profilaktyce krztuśca i jaki lek wybierasz dla 2-miesięcznego niemowlęcia?",
        scenario: "Zlecasz natychmiastowe wdrożenie celowanej antybiotykoterapii. Jaka grupa antybiotyków jest lekiem pierwszego wyboru w leczeniu i profilaktyce krztuśca i jaki lek wybierasz dla 2-miesięcznego niemowlęcia?",
        options: [
          {
            text: "MAKROLIDY – lekiem pierwszego wyboru jest AZYTROMYCYNA (10 mg/kg mc./dobę w pojedynczej dawce raz na dobę przez 5 dni) lub KLARYTROMYCYNA (15 mg/kg mc./d w 2 dawkach przez 7 dni).",
            correct: true,
            feedback: "Prawidłowo! Złoty standard eradykacji Bordetella pertussis: makrolidy są lekami I rzutu. U niemowląt lekiem z wyboru jest azytromycyna (10 mg/kg mc. raz dziennie przez 5 dni). U pacjentów z nadwrażliwością lub nietolerancją makrolidów lekiem II rzutu u dzieci >2. m.ż. jest kotrimoksazol (TMP-SMX). Ważne: amoksycylina i cefalosporyny są NIESKUTECZNE w krztuścu!"
          },
          {
            text: "Amoksycylina doustnie w syropie przez 14 dni.",
            correct: false,
            feedback: "Kardynalny błąd! Beta-laktamy nie penetrują do wnętrza komórek rzęskowych i są całkowicie nieskuteczne w eliminacji Bordetella pertussis."
          },
          {
            text: "Ciprofloksacyna w zastrzykach domięśniowych.",
            correct: false,
            feedback: "Chinolony nie są lekami z wyboru i są przeciwwskazane u niemowląt."
          },
          {
            text: "Metronidazol w czopkach doodbytniczych.",
            correct: false,
            feedback: "Metronidazol działa na beztlenowce i pierwotniaki, nie działa na tlenową pałeczkę krztuśca."
          }
        ]
      },
      {
        stepNum: 5,
        title: "Krok 5: Paradoks działania antybiotyku w fazie napadowej a ryzyko HPS u noworodków",
        desc: "Rodzice pytają z nadzieją: 'Panie Doktorze, po ilu godzinach od podania azytromycyny skończą się te straszne napady dławiącego kaszlu?'. Co musisz wyjaśnić rodzicom na temat mechanizmu objawów w fazie napadowej oraz dlaczego u noworodków unika się erytromycyny?",
        scenario: "Rodzice pytają z nadzieją: 'Panie Doktorze, po ilu godzinach od podania azytromycyny skończą się te straszne napady dławiącego kaszlu?'. Co musisz wyjaśnić rodzicom na temat mechanizmu objawów w fazie napadowej oraz dlaczego u noworodków unika się erytromycyny?",
        options: [
          {
            text: "Tłumaczysz, że antybiotyk podany w fazie napadowej NIE ZATRZYMA natychmiast kaszlu (toksyny już zniszczyły aparat rzęskowy, a regeneracja trwa 6–10 tygodni), ale w ciągu 5 dni ELIMINUJE ZAKAŹNOŚĆ i pałeczki z dróg oddechowych; ponadto erytromycyna jest przeciwwskazana u najmłodszych z powodu ryzyka przerostowego zwężenia odźwiernika (HPS), dlatego lekiem z wyboru jest azytromycyna.",
            correct: true,
            feedback: "Wybitnie! Kluczowe zagadnienie patofizjologiczne i egzaminacyjne: 1) Krztusiec to choroba 'toksynowa' – toksyna tchawicza i cytotoksyny powodują złuszczenie i martwicę komórek rzęskowych. W fazie napadowej antybiotyk nie skraca już czasu trwania kaszlu (tzw. kaszel 100-dniowy musi samoistnie wygasnąć w miarę regeneracji nabłonka), ale niszczy bakterie, zapobiega powikłaniom bakteryjnym i przerywa zakażanie otoczenia! 2) Stosowanie erytromycyny u noworodków i niemowląt <1. m.ż. wiąże się ze statystycznie istotnym ryzykiem przerostowego zwężenia odźwiernika (IHPS) – azytromycyna ma znacznie lepszy profil bezpieczeństwa."
          },
          {
            text: "Zapewniasz, że po 1 dawce antybiotyku kaszel ustąpi w ciągu 15 minut.",
            correct: false,
            feedback: "Nieprawda i wprowadzanie rodziców w błąd; napady kaszlu będą trwały jeszcze tygodniami."
          },
          {
            text: "Twierdzisz, że antybiotyki w krztuścu są zabronione przez prawo.",
            correct: false,
            feedback: "Fałsz: antybiotykoterapia makrolidem jest standardem postępowania."
          },
          {
            text: "Zalecasz podanie syropu z kodeiną u 2-miesięcznego niemowlęcia.",
            correct: false,
            feedback: "Kardynalny błąd! Opioidy u niemowląt wywołują śmiertelną depresję ośrodka oddechowego!"
          }
        ]
      },
      {
        stepNum: 6,
        title: "Krok 6: Monitorowanie i leczenie powikłań krztuśca u niemowlęcia",
        desc: "Dziecko zostaje przyjęte na pododdział wzmożonego nadzoru pediatrycznego. Jakie zasady monitorowania i postępowania wspomagającego wdrażasz w ostrej fazie napadowej?",
        scenario: "Dziecko zostaje przyjęte na pododdział wzmożonego nadzoru pediatrycznego. Jakie zasady monitorowania i postępowania wspomagającego wdrażasz w ostrej fazie napadowej?",
        options: [
          {
            text: "Ciągły kardiomonitoring i pulsoksymetria (ryzyko nagłych bezdechów i bradykardii), zapewnienie spokoju i unikanie bodźców prowokujących napady kaszlu (hałas, jasne światło, bolesne procedury), tlenoterapia nawilżonym tlenem w trakcie napadów, karmienie przez zgłębnik żołądkowy przy ryzyku aspiracji i wymiotach pokaszlowych.",
            correct: true,
            feedback: "Znakomicie! U niemowląt <6. m.ż. hospitalizacja na oddziale z możliwością kardiomonitoringu jest obowiązkowa ze względu na ryzyko nagłego zgonu z powodu bezdechu! Napady krztuścowe są wyzwalane przez minimalne bodźce zmysłowe (badanie gardła szpatułką, hałas, płacz, karmienie) – zaleca się maksymalne ograniczenie manipulacji medycznych (tzw. minimal handling). Wymioty po napadach grożą zachłyśnięciem i niedożywieniem, co wymaga karmienia sondą."
          },
          {
            text: "Intensywna fizjoterapia klatki piersiowej i oklepywanie pleców co 15 minut.",
            correct: false,
            feedback: "Błąd: oklepywanie i mechaniczne drażnienie klatki u niemowlęcia z krztuścem bezpośrednio prowokuje ciężkie napady duszności i bezdechy!"
          },
          {
            text: "Pozostawienie dziecka w ciemnym pokoju bez żadnego monitora ani personelu.",
            correct: false,
            feedback: "Narażenie dziecka na zgon w bezdechu bez pomocy medycznej."
          },
          {
            text: "Podawanie zimnej wody lodowej do picia w trakcie napadu kaszlu.",
            correct: false,
            feedback: "Wywoła masywne zachłyśnięcie płucne i skurcz krtani."
          }
        ]
      },
      {
        stepNum: 7,
        title: "Krok 7: Postępowanie poekspozycyjne w otoczeniu chorego (PEP)",
        desc: "W domu z chorym niemowlęciem mieszkają rodzice (szczepieni w dzieciństwie ponad 20 lat temu) oraz 4-letnia siostra (zaszczepiona 4 dawkami DTP). Rodzice pytają, co należy zrobić z resztą rodziny.",
        scenario: "W domu z chorym niemowlęciem mieszkają rodzice (szczepieni w dzieciństwie ponad 20 lat temu) oraz 4-letnia siostra (zaszczepiona 4 dawkami DTP). Rodzice pytają, co należy zrobić z resztą rodziny.",
        options: [
          {
            text: "Wdrażasz chemioprofilaktykę poekspozycyjną (PEP) makrolidem (azytromycyna przez 5 dni) u WSZYSTKICH osób z bliskiego kontaktu domowego, NIEZALEŻNIE od ich wcześniejszego statusu szczepień ochronnych.",
            correct: true,
            feedback: "Doskonale! Pewniak epidemiologiczny LEK: Odporność poszczepienna przeciw krztuścowi zanika po 5–10 latach od ostatniej dawki szczepionki. W przypadku potwierdzenia krztuśca chemioprofilaktykę poekspozycyjną makrolidem (azytromycyna przez 5 dni lub klarytromycyna przez 7 dni) zaleca się WSZYSTKIM domownikom i bliskim kontaktom bez względu na wiek i status szczepień (ponieważ nawet osoby w pełni zaszczepione mogą bezobjawowo kolonizować drogi oddechowe i transmitować pałeczkę na wrażliwe niemowlęta)."
          },
          {
            text: "Zalecasz natychmiastowe wyrzucenie całej rodziny z domu do lasu bez leków.",
            correct: false,
            feedback: "Niedorzeczne."
          },
          {
            text: "Chemioprofilaktykę podaje się tylko osobom, które mają gorączkę >40°C.",
            correct: false,
            feedback: "Błąd: profilaktyka poekspozycyjna dotyczy osób bezobjawowych z kontaktu."
          },
          {
            text: "U osób szczepionych krztusiec nigdy nie występuje, więc nie podejmuje się żadnych działań.",
            correct: false,
            feedback: "Mit: odporność poszczepienna i pochorobowa NIE jest trwała i wygasa po kilku-kilkunastu latach."
          }
        ]
      },
      {
        stepNum: 8,
        title: "Krok 8: Program Szczepień Ochronnych (PSO) i 'strategia kokonowa'",
        desc: "Podczas wypisu omawiasz z rodzicami kalendarz szczepień. Dlaczego tak ważna jest dawka przypominająca dla młodzieży i dorosłych (dTpa) oraz tzw. 'strategia kokonowa' u kobiet w ciąży?",
        scenario: "Podczas wypisu omawiasz z rodzicami kalendarz szczepień. Dlaczego tak ważna jest dawka przypominająca dla młodzieży i dorosłych (dTpa) oraz tzw. 'strategia kokonowa' u kobiet w ciąży?",
        options: [
          {
            text: "Odporność po szczepieniu i przechorowaniu wygasa po 5–10 latach; dorośli chorują z 'maskowanym' przewlekłym kaszlem i są głównym źródłem zakażenia dla nieuodpornionych niemowląt; 'strategia kokonowa' (szczepienie kobiety w 27–36. tyg. ciąży szczepionką dTpa) zapewnia przezłożyskowe przekazanie ochronnych przeciwciał IgG matczynych, chroniąc niemowlę w pierwszych miesiącach życia.",
            correct: true,
            feedback: "Wybitnie! Kluczowe zalecenia PSO i WHO: 1) Niemowlęta do ukończenia 6. miesiąca życia nie mają pełnej odporności własnej, a krztusiec jest dla nich stanem śmiertelnym. 2) Dorośli i młodzież chorują na krztusiec atypowo (uporczywy suchy kaszel trwający tygodniami, bez piania) i stanowią rezerwuar zakażeń (aż 70-80% niemowląt zaraża się od rodziców/rodzeństwa!). 3) Zalecenie dTpa dla kobiet w ciąży w III trymestrze (27–36 hbd) pozwala na maksymalny transfer matczynych przeciwciał IgG przez łożysko, co chroni noworodka w krytycznym oknie przed pierwszym szczepieniem w 2. m.ż.!"
          },
          {
            text: "Jedno szczepienie w 2. miesiącu życia daje stuprocentową odporność do 100. roku życia.",
            correct: false,
            feedback: "Nieprawda: odporność poszczepienna na krztusiec zanika bardzo szybko."
          },
          {
            text: "Szczepienia przeciw krztuścowi są zabronione u kobiet w ciąży.",
            correct: false,
            feedback: "Błąd: szczepionka dTpa w ciąży (szczepionka inaktywowana, bezkomórkowa) jest BEZWZGLĘDNIE ZALECANA na całym świecie!"
          },
          {
            text: "Krztusiec został całkowicie wyeradykowany z kuli ziemskiej i nie występuje.",
            correct: false,
            feedback: "Krztusiec jest chorobą powracającą (re-emerging disease) z tysiącami zachorowań rocznie w Polsce."
          }
        ]
      }
    ];
  });

  // ==========================================
  // CASE 115: Rumień zakaźny (Parwowirus B19)
  // ==========================================
  await upgradeCase('115_rumien_zakazny_parwowirus_b19.json', (c) => {
    c.steps = [
      {
        stepNum: 1,
        title: "Krok 1: Wstępna ocena w gabinecie POZ – 6-latka z 'uderzonymi policzkami'",
        desc: "Do Twojego gabinetu lekarza rodzinnego matka przyprowadza 6-letnią córkę. Dziecko czuje się dobrze, jest wesołe, bawi się w gabinecie, nie gorączkuje. Od wczoraj na obu policzkach pojawił się intensywnie czerwony, lśniący, lekko obrzęknięty rumień, wyraźnie odgraniczony od bladej skóry wokół ust i nasady nosa. Matka mówi, że dziecko wygląda tak, jakby 'ktoś spoliczkował je w twarz z obu stron' (slapped cheek appearance). W badaniu przedmiotowym brak cech infekcji gardła, węzły chłonne niepowiększone, płuca osłuchowo czyste. Jaka jest Twoja wstępna diagnoza?",
        scenario: "Do Twojego gabinetu lekarza rodzinnego matka przyprowadza 6-letnią córkę. Dziecko czuje się dobrze, jest wesołe, bawi się w gabinecie, nie gorączkuje. Od wczoraj na obu policzkach pojawił się intensywnie czerwony, lśniący, lekko obrzęknięty rumień, wyraźnie odgraniczony od bladej skóry wokół ust i nasady nosa. Matka mówi, że dziecko wygląda tak, jakby 'ktoś spoliczkował je w twarz z obu stron' (slapped cheek appearance). W badaniu przedmiotowym brak cech infekcji gardła, węzły chłonne niepowiększone, płuca osłuchowo czyste. Jaka jest Twoja wstępna diagnoza?",
        options: [
          {
            text: "Rozpoznajesz rumień zakaźny (Erythema infectiosum / 'piątą chorobę') wywołany przez zakażenie Parwowirusem B19; objaw 'spoliczkowanych policzków' (slapped cheek) przy dobrym stanie ogólnym jest patognomonicznym początkiem tej choroby.",
            correct: true,
            feedback: "Znakomicie! Klasyczny początek rumienia zakaźnego (tzw. piątej choroby wysypkowej wieku dziecięcego): wywołana przez jednoniciowy wirus DNA Parwowirus B19. Najczęściej dotyczy dzieci w wieku przedszkolnym i szkolnym. Cechuje się łagodnym przebiegiem (często bezgorączkowym lub z minimalnym stanem podgorączkowym) i spektakularnym, ostro odgraniczonym rumieniem obu policzków ('twarz spoliczkowanego dziecka') z zachowaniem bladości wokół ust."
          },
          {
            text: "Podejrzewasz natychmiast przemoc w rodzinie (zespół dziecka maltretowanego) i wzywasz policję.",
            correct: false,
            feedback: "Pomyłka diagnostyczna! Symetryczny, ostro odgraniczony rumień policzków w rumieniu zakaźnym bywa mylony ze śladami uderzenia, ale jest to klasyczny objaw infekcji Parwowirusem B19."
          },
          {
            text: "Rozpoznajesz toczeń rumieniowaty układowy (SLE) i kwalifikujesz 6-latkę do chemioterapii.",
            correct: false,
            feedback: "U 6-latki bez objawów ogólnych nagły rumień policzków to typowa infekcja parwowirusowa, a nie rzadki toczeń układowy."
          },
          {
            text: "Stawiasz rozpoznanie oparzenia termicznego II stopnia po opalaniu.",
            correct: false,
            feedback: "Brak wywiadu ekspozycji na słońce; rumień jest symetryczny i typowy dla piątej choroby."
          }
        ]
      },
      {
        stepNum: 2,
        title: "Krok 2: Druga faza osutki – Koronkowata i girlandowata wysypka na kończynach",
        desc: "Po 2 dniach matka dzwoni zaniepokojona, ponieważ rumień na twarzy zaczął blednąć, ale na ramionach, udach i pośladkach pojawiła się nowa, rozległa wysypka. Jakie cechy morfologiczne wykazuje wysypka w II stadium rumienia zakaźnego?",
        scenario: "Po 2 dniach matka dzwoni zaniepokojona, ponieważ rumień na twarzy zaczął blednąć, ale na ramionach, udach i pośladkach pojawiła się nowa, rozległa wysypka. Jakie cechy morfologiczne wykazuje wysypka w II stadium rumienia zakaźnego?",
        options: [
          {
            text: "Plamisto-grudkowa, czerwonoróżowa osutka, która przejaśnia się w części centralnej, tworząc charakterystyczny układ siateczkowaty, koronkowaty lub girlandowaty, zajmujący głównie wyprostne powierzchnie kończyn i pośladki (zazwyczaj omijający dłonie i podeszwy stóp).",
            correct: true,
            feedback: "Doskonale! Klasyczna morfologia II stadium rumienia zakaźnego: po ustąpieniu rumienia na twarzy pojawia się wysypka na dystalnych i proksymalnych częściach kończyn oraz pośladkach. Zmiany bledną od środka, przybierając układ 'koronki', 'siateczki' lub 'girlandy'. Osutka nie pozostawia blizn ani łuszczenia naskórka."
          },
          {
            text: "Masywne pęcherze z ropną treścią pękające z tworzeniem miodowych strupów.",
            correct: false,
            feedback: "To opis liszajca zakaźnego (impetigo contagiosa)."
          },
          {
            text: "Wybroczyny krwotoczne nieblednące pod uciskiem na podudziach.",
            correct: false,
            feedback: "To opis plamicy unaczynionej lub sepsy meningokokowej."
          },
          {
            text: "Łuszczące się srebrzyste blaszki na łokciach i kolanach.",
            correct: false,
            feedback: "To opis łuszczycy zwyczajnej."
          }
        ]
      },
      {
        stepNum: 3,
        title: "Krok 3: III stadium – Zmienność wysypki pod wpływem bodźców fizycznych",
        desc: "Matka zauważa, że wysypka u córki już prawie zniknęła, ale po gorącej kąpieli w wannie oraz po bieganiu na placu zabaw nagle ponownie się 'zaogniła' i stała się intensywnie widoczna. Co wyjaśniasz rodzicom?",
        scenario: "Matka zauważa, że wysypka u córki już prawie zniknęła, ale po gorącej kąpieli w wannie oraz po bieganiu na placu zabaw nagle ponownie się 'zaogniła' i stała się intensywnie widoczna. Co wyjaśniasz rodzicom?",
        options: [
          {
            text: "Uspokajasz matkę: jest to typowa cecha III stadium rumienia zakaźnego; wysypka może nawracać i zaostrzać się przez kolejne 1–3 tygodnie pod wpływem ciepła (gorąca kąpiel, słońce), wysiłku fizycznego, stresu lub pocierania skóry, co nie oznacza nawrotu infekcji.",
            correct: true,
            feedback: "Prawidłowo! To specyficzna cecha parwowirusa B19: faza ustępowania i nawrotowości (III faza). Osutka ma charakter falujący – może znikać i nawracać pod wpływem czynników rozszerzających naczynia krwionośne skóry (ogrzanie ciała, gorąca kąpiel, nasłonecznienie, wysiłek fizyczny, emocje). Zjawisko to może utrzymywać się od tygodnia do nawet miesiąca i jest w pełni łagodne."
          },
          {
            text: "Informujesz, że kąpiel wywołała nieodwracalne zakażenie krwi i wstrząs.",
            correct: false,
            feedback: "Brak jakichkolwiek podstaw do takich wniosków."
          },
          {
            text: "Kierujesz dziecko na natychmiastową amputację kończyn.",
            correct: false,
            feedback: "Niedorzeczne i absurdalne."
          },
          {
            text: "Zalecasz podanie sterydów doustnych w maksymalnej dawce przez 6 miesięcy.",
            correct: false,
            feedback: "Brak wskazań do sterydoterapii w łagodnym rumieniu zakaźnym."
          }
        ]
      },
      {
        stepNum: 4,
        title: "Krok 4: Paradoks zakaźności Parwowirusa B19 – Kiedy dziecko może iść do przedszkola?",
        desc: "Dyrektorka przedszkola nie chce wpuścić dziewczynki do grupy z powodu widocznej wysypki na ciele i żąda zaświadczenia lekarskiego. Kiedy pacjent z rumieniem zakaźnym jest zakaźny dla otoczenia i czy obecność wysypki stanowi przeciwwskazanie do uczęszczania do przedszkola?",
        scenario: "Dyrektorka przedszkola nie chce wpuścić dziewczynki do grupy z powodu widocznej wysypki na ciele i żąda zaświadczenia lekarskiego. Kiedy pacjent z rumieniem zakaźnym jest zakaźny dla otoczenia i czy obecność wysypki stanowi przeciwwskazanie do uczęszczania do przedszkola?",
        options: [
          {
            text: "Pacjent jest zakaźny w fazie wiremii PRZED pojawieniem się wysypki; w momencie pojawienia się osutki (która jest zjawiskiem immunologicznym z odkładaniem kompleksów) wiremia wygasa i PACJENT NIE JEST JUŻ ZAKAŹNY! Dziecko czujące się dobrze może bez przeszkód chodzić do przedszkola i szkoły.",
            correct: true,
            feedback: "Wybitnie! To jeden z najważniejszych paradoksów zakaźnictwa sprawdzanych na LEK: w rumieniu zakaźnym pacjent zakaża drogą kropelkową na około 7–10 dni PRZED wystąpieniem wysypki (w okresie nieswoistych objawów prodromalnych i wiremii). Z chwilą pojawienia się 'spoliczkowanych policzków' i osutki girlandowatej (która jest wynikiem odkładania się kompleksów immunologicznych wirus-przeciwciała w skórze) pacjent przestaje być zakaźny! Izolacja dziecka z wysypką jest całkowicie bezcelowa."
          },
          {
            text: "Dziecko zakaża najbardziej wtedy, gdy wysypka ma kolor najciemniejszy i wymaga 6-miesięcznej izolacji w szpitalu zakaźnym.",
            correct: false,
            feedback: "Błąd: obecność wysypki oznacza koniec zakaźności."
          },
          {
            text: "Parwowirus B19 zakaża przez całe życie pacjenta.",
            correct: false,
            feedback: "Zakażenie u osób immunokompetentnych jest ostre i samoograniczające się."
          },
          {
            text: "Dziecko nigdy nie było zakaźne, bo parwowirus to zakażenie przenoszone tylko przez ugryzienie kleszcza.",
            correct: false,
            feedback: "Parwowirus przenosi się drogą kropelkową i przez łożysko, nie przez kleszcze."
          }
        ]
      },
      {
        stepNum: 5,
        title: "Krok 5: Tropizm wirusa do układu krwiotwórczego – Receptor antygenu P",
        desc: "Do jakich komórek ludzkiego organizmu Parwowirus B19 wykazuje wybiórczy tropizm i za pośrednictwem jakiego receptora wnika do wnętrza komórki?",
        scenario: "Do jakich komórek ludzkiego organizmu Parwowirus B19 wykazuje wybiórczy tropizm i za pośrednictwem jakiego receptora wnika do wnętrza komórki?",
        options: [
          {
            text: "Do prekursorów linii czerwonokrwinkowej (erytroblastów) w szpiku kostnym za pośrednictwem komórkowego receptora antygenu P (globozydu); wirus replikuje w erytroblastach, prowadząc do ich lizy i przejściowego zahamowania erytropoezy (retikulocytopenii).",
            correct: true,
            feedback: "Doskonale! Biologia molekularna Parwowirusa B19 (pytanie z fizjologii/patologii LEK): wirus wiąże się swoiście z antygenem P grupy krwi (globozydem), który występuje w dużej gęstości na komórkach prekursorowych układu czerwonokrwinkowego (pronormoblastach i normoblastach) w szpiku kostnym oraz na komórkach śródbłonka. Lityczne namnażanie wirusa powoduje przejściowe wstrzymanie wytwarzania krwinek czerwonych na 7-10 dni (widoczne jako nagły spadek retikulocytów)."
          },
          {
            text: "Do limfocytów CD4 za pośrednictwem receptora CXCR4.",
            correct: false,
            feedback: "To tropizm wirusa HIV, a nie Parwowirusa B19."
          },
          {
            text: "Do neuronów ruchowych rogów przednich rdzenia za pośrednictwem CD155.",
            correct: false,
            feedback: "To tropizm wirusa Polio."
          },
          {
            text: "Do osteoklastów za pośrednictwem receptora RANK.",
            correct: false,
            feedback: "Brak związku z parwowirusem."
          }
        ]
      },
      {
        stepNum: 6,
        title: "Krok 6: Groźne powikłanie hematologiczne – Przełom aplastyczny w niedokrwistkach hemolitycznych",
        desc: "Dlaczego Parwowirus B19 stanowi śmiertelne zagrożenie dla pacjentów z wrodzonymi przewlekłymi niedokrwistościami hemolitycznymi (np. sferocytozą wrodzoną, anemią sierpowatokrwinkową, talasemią)?",
        scenario: "Dlaczego Parwowirus B19 stanowi śmiertelne zagrożenie dla pacjentów z wrodzonymi przewlekłymi niedokrwistościami hemolitycznymi (np. sferocytozą wrodzoną, anemią sierpowatokrwinkową, talasemią)?",
        options: [
          {
            text: "Wywołuje OSTRY PRZEŁOM APLASTYCZNY (transient aplastic crisis); u chorych z hemolizą czas przeżycia erytrocytów jest skrócony do 10–20 dni (zamiast 120 dni) – kilkudniowe zatrzymanie erytropoezy przez wirus B19 prowadzi do gwałtownego, zagrażającego życiu spadku hemoglobiny (często <3–4 g/dl) ze zniknięciem retikulocytów (retikulocyty 0%).",
            correct: true,
            feedback: "Wybitnie! Klasyczny pewniak egzaminacyjny LEK: u osoby zdrowej erytrocyt żyje 120 dni, więc 7-dniowe zahamowanie produkcji szpiku przez B19 daje jedynie niezauważalny spadek Hb o 0.5–1 g/dl. Natomiast u chorych ze sferocytozą wrodzoną lub anemią sierpowatą erytrocyty żyją zaledwie kilkanaście dni – zatrzymanie erytropoezy wywołuje gwałtowne załamanie: ciężki przełom aplastyczny z głęboką anemią, wstrząsem hipowolemicznym i zerową liczbą retikulocytów (wymaga pilnych przetoczeń KKCz)."
          },
          {
            text: "Parwowirus wywołuje natychmiastową transformację sferocytozy w ostrą białaczkę szpikową.",
            correct: false,
            feedback: "Brak związku onkogennego."
          },
          {
            text: "Powoduje gwałtowny wzrost retikulocytów do 99% i zakrzepicę.",
            correct: false,
            feedback: "Błąd: w przełomie aplastycznym retikulocyty spadają niemal do zera."
          },
          {
            text: "Parwowirus B19 jest lekiem leczącym sferocytozę wrodzoną.",
            correct: false,
            feedback: "Niedorzeczne i sprzeczne z faktami medycznymi."
          }
        ]
      },
      {
        stepNum: 7,
        title: "Krok 7: Zagrożenie dla kobiet w ciąży – Obrzęk uogólniony płodu (Hydrops fetalis)",
        desc: "Matka 6-latki jest w 18. tygodniu ciąży i obawia się, że mogła zarazić się parwowirusem od córki. Jakie jest ryzyko dla płodu w przypadku zakażenia pierwotnego ciężarnej i jak wygląda monitorowanie?",
        scenario: "Matka 6-latki jest w 18. tygodniu ciąży i obawia się, że mogła zarazić się parwowirusem od córki. Jakie jest ryzyko dla płodu w przypadku zakażenia pierwotnego ciężarnej i jak wygląda monitorowanie?",
        options: [
          {
            text: "Zakażenie Parwowirusem B19 przed 20.–22. tyg. ciąży może wywołać ciężką niedokrwistość płodu, niewydolność serca o wysokim rzucie, uogólniony obrzęk płodu (hydrops fetalis) i wewnątrzmaciczne obumarcie płodu; monitorowanie opiera się na seryjnym USG z pomiarem szczytowej prędkości skurczowej w tętnicy środkowej mózgu (MCA-PSV), a leczenie to dopłodowa transfuzja dopępowkowa KKCz.",
            correct: true,
            feedback: "Doskonale! Zakażenie wertykalne Parwowirusem B19 w ciąży: wirus przechodzi przez łożysko (w ok. 30% przypadków) i infekuje wątrobowe komórki krwiotwórcze płodu. Prowadzi to do ciężkiej anemii płodowej, obrzęku uogólnionego płodu (hydrops fetalis) i zgonu wewnątrzmacicznego (zwłaszcza przy infekcji w I i II trymestrze). Wirus nie wykazuje działania teratogennego (nie wywołuje wad wrodzonych). Narzędziem diagnostycznym jest Doppler MCA-PSV (prędkość przepływu w tętnicy środkowej mózgu rośnie proporcjonalnie do anemii), a leczeniem ratującym życie płodu – kordocenteza i transfuzja dopłociowa."
          },
          {
            text: "Parwowirus B19 wywołuje u płodu wrodzoną wadę serca pod postacią ubytku przegrody i głuchotę.",
            correct: false,
            feedback: "Wady wrodzone (zaćma, głuchota, PDA) to triada Gregga w różyczce wrodzonej, a nie w parwowirusie!"
          },
          {
            text: "Wirus nie przenika przez barierę łożyskową i jest w 100% bezpieczny dla płodu.",
            correct: false,
            feedback: "Fałsz: zakażenie B19 w ciąży grozi ciężkim obrzękiem uogólnionym płodu."
          },
          {
            text: "Zalecasz natychmiastowe usunięcie ciąży bez żadnych badań.",
            correct: false,
            feedback: "Niedopuszczalne i bezpodstawne; większość płodów zdrowieje samoistnie lub po transfuzji dopłodowej."
          }
        ]
      },
      {
        stepNum: 8,
        title: "Krok 8: Manifestacja kliniczna u dorosłych – Zespół reumatoidalny i leczenie",
        desc: "Matka 6-latki zgłasza, że 10 dni po pojawieniu się wysypki u córki sama zaczęła odczuwać silny, symetryczny ból i obrzęk stawów międzypaliczkowych rąk, nadgarstków i kolan ze sztywnością poranną (imitujący RZS), bez wysypki na twarzy. Jak interpretujesz tę manifestację u dorosłych i jakie jest rokowanie?",
        scenario: "Matka 6-latki zgłasza, że 10 dni po pojawieniu się wysypki u córki sama zaczęła odczuwać silny, symetryczny ból i obrzęk stawów międzypaliczkowych rąk, nadgarstków i kolan ze sztywnością poranną (imitujący RZS), bez wysypki na twarzy. Jak interpretujesz tę manifestację u dorosłych i jakie jest rokowanie?",
        options: [
          {
            text: "Ostra symetryczna poliatropatia / zapalenie wielostawowe po zakażeniu Parwowirusem B19 (występuje u >50–60% dorosłych kobiet z B19); doskonale imituje reumatoidalne zapalenie stawów (RZS), ale ma charakter samoograniczający się i ustępuje całkowicie w ciągu 2–4 tygodni bez jakiejkolwiek destrukcji stawów; leczenie jest wyłącznie objawowe (NLPZ).",
            correct: true,
            feedback: "Wybitnie! Klasyczna odmienność wiekowa w zakażeniach Parwowirusem B19: u dzieci dominuje osutka ('spoliczkowane policzki'), a stawy są zajęte rzadko (<10%). Natomiast u dorosłych (szczególnie kobiet) osutka występuje rzadko lub jest słabo widoczna, za to u ponad połowy rozwija się ostre, symetryczne zapalenie drobnych stawów rąk i kolan z obrzękiem i sztywnością poranną, często z obecnością przeciwciał anty-CCP lub RF w niskich mianach (tzw. post-viral arthritis). Rokowanie jest znakomite – objawy ustępują bez niszczenia chrząstki i kości."
          },
          {
            text: "Jest to nieodwracalny toczeń układowy z koniecznością natychmiastowej allogenicznej transplantacji szpiku.",
            correct: false,
            feedback: "Błąd: wirusowe zapalenie stawów ustępuje samoistnie po kilku tygodniach."
          },
          {
            text: "Zalecasz wymianę obu stawów kolanowych na endoprotezy w trybie ostrodyżurowym.",
            correct: false,
            feedback: "Absurdalna i okaleczająca propozycja."
          },
          {
            text: "Zalecasz antybiotykoterapię wankomycyną przez 3 miesiące.",
            correct: false,
            feedback: "Parwowirus to wirus, antybiotyki są całkowicie nieskuteczne."
          }
        ]
      }
    ];
  });

  console.log("Cases 111-115 upgraded!");
}

run().catch(console.error);

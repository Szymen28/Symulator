const fs = require('fs');
const { decryptObjectAes, encryptStringAes } = require('./encrypt_case.js');
const PASSWORD = '@LEKSzymon28111999';

async function upgradeCase(fname, updater) {
  const enc = JSON.parse(fs.readFileSync('cases/' + fname, 'utf8'));
  const c = await decryptObjectAes(enc, PASSWORD);
  updater(c);
  if (!c.vitalsObj) {
    c.vitalsObj = { hr: 90, bp: "120/80", spo2: 98, rr: 16, temp: 37.8, gcs: 15 };
  }
  const reEnc = await encryptStringAes(JSON.stringify(c, null, 2), PASSWORD);
  fs.writeFileSync('cases/' + fname, JSON.stringify(reEnc, null, 2), 'utf8');
  console.log(`Upgraded clinical storytelling: ${fname}`);
}

async function run() {
  console.log("Starting deep clinical upgrade for cases 132-136 (Surgery Part 2)...");

  // ==========================================
  // CASE 132: Uwięźnięta przepuklina pachwinowa
  // ==========================================
  await upgradeCase('132_uwieznieta_przepuklina_pachwinowa.json', (c) => {
    c.steps = [
      {
        stepNum: 1,
        title: "Krok 1: Wstępna ocena na SOR – 62-letni mężczyzna z bolesnym, twardym guzem w pachwinie",
        desc: "Dyżurujesz na chirurgicznym SOR. Zgłasza się 62-letni mężczyzna. Pacjent od 3 lat miał w prawej pachwinie miękki guz, który pojawiał się przy kaszlu i dźwiganiu, a w pozycji leżącej swobodnie odprowadzał się do brzucha. Dziś rano, podczas przenoszenia ciężkich worków z cementem, guz nagle powiększył się, stał się twardy jak kamień, skrajnie bolesny i nie daje się odprowadzić mimo wielokrotnych prób ręcznego wciskania przez pacjenta. Od 4 godzin dołączyły silne bóle kurczowe brzucha, nudności, dwukrotne wymioty treścią żołądkową oraz zatrzymanie gazów i stolca. W badaniu: HR 108/min, RR 140/90 mmHg, temp. 37.8°C. W prawej okolicy pachwinowo-mosznowej widoczny jest guz wielkości pomarańczy, napięty, żywo bolesny przy dotyku, skóra nad nim jest lekko zaczerwieniona i ucieplona. Jaka jest Twoja natychmiastowa diagnoza kliniczna?",
        scenario: "Dyżurujesz na chirurgicznym SOR. Zgłasza się 62-letni mężczyzna. Pacjent od 3 lat miał w prawej pachwinie miękki guz, który pojawiał się przy kaszlu i dźwiganiu, a w pozycji leżącej swobodnie odprowadzał się do brzucha. Dziś rano, podczas przenoszenia ciężkich worków z cementem, guz nagle powiększył się, stał się twardy jak kamień, skrajnie bolesny i nie daje się odprowadzić mimo wielokrotnych prób ręcznego wciskania przez pacjenta. Od 4 godzin dołączyły silne bóle kurczowe brzucha, nudności, dwukrotne wymioty treścią żołądkową oraz zatrzymanie gazów i stolca. W badaniu: HR 108/min, RR 140/90 mmHg, temp. 37.8°C. W prawej okolicy pachwinowo-mosznowej widoczny jest guz wielkości pomarańczy, napięty, żywo bolesny przy dotyku, skóra nad nim jest lekko zaczerwieniona i ucieplona. Jaka jest Twoja natychmiastowa diagnoza kliniczna?",
        options: [
          {
            text: "Rozpoznajesz uwięźniętą i potencjalnie zadzierzgniętą przepuklinę pachwinową prawostronną (Hernia inguinalis incarcerata et strangulata) powikłaną mechaniczną niedrożnością jelit; stan bezpośredniego zagrożenia martwicą ściany jelita i perforacją wymagający pilnej interwencji chirurgicznej.",
            correct: true,
            feedback: "Znakomicie! Klasyczny, dramatyczny obraz uwięźnięcia przepukliny (incarceratio): zawartość worka przepuklinowego (najczęściej pętla jelita cienkiego) ulega zaklinowaniu w wąskim pierścieniu przepuklinowym. Brak możliwości odprowadzenia + silny ból guza + objawy mechanicznej niedrożności jelit (wymioty, zatrzymanie gazów) definiują uwięźnięcie. Zaczerwienienie i ocieplenie skóry nad workiem oraz tachykardia sugerują ZADZIERZGNIĘCIE (strangulatio – uciśnięcie naczyń krezkowych, niedokrwienie i groźbę zgorzeli jelita)."
          },
          {
            text: "Rozpoznajesz wodniaka jądra i kierujesz pacjenta na planowy zabieg za 6 miesięcy.",
            correct: false,
            feedback: "Kardynalny błąd! Wodniak jądra jest niebolesny, nie daje wymiotów ani niedrożności jelit."
          },
          {
            text: "Stawiasz rozpoznanie ostrego zapalenia pęcherzyka żółciowego.",
            correct: false,
            feedback: "Pęcherzyk leży w prawym podżebrzu, a pacjent ma bolesnego guza w pachwinie."
          },
          {
            text: "Podejrzewasz powiększenie węzła chłonnego w przebiegu grypy.",
            correct: false,
            feedback: "Wymioty i zatrzymanie gazów wykluczają prostą limfadenopatię."
          }
        ]
      },
      {
        stepNum: 2,
        title: "Krok 2: Badanie przedmiotowe przepukliny i brak 'impulsu kaszlowego'",
        desc: "Przystępujesz do badania palpacyjnego okolicy pachwinowej. Co dzieje się z fizjologicznym 'impulsem kaszlowym' (objawem kaszlowym) w przypadku uwięźnięcia przepukliny?",
        scenario: "Przystępujesz do badania palpacyjnego okolicy pachwinowej. Co dzieje się z fizjologicznym 'impulsem kaszlowym' (objawem kaszlowym) w przypadku uwięźnięcia przepukliny?",
        options: [
          {
            text: "Objaw kaszlowy (impuls kaszlowy) ZANIKA; pętla jelitowa zaklinowana w pierścieniu jest odcięta od jamy otrzewnej – wzrost ciśnienia w jamie brzusznej podczas kaszlu nie przenosi się na zawartość worka przepuklinowego.",
            correct: true,
            feedback: "Doskonale! Pewniak semiotyczny LEK: W przepuklinie odprowadzalnej podczas kaszlu badający palec przyłożony do kanału pachwinowego wyczuwa wyraźne uderzenie (dodatni impuls kaszlowy). W chwili uwięźnięcia pierścień zaciska szyjkę worka przepuklinowego – impuls kaszlowy całkowicie zanika! Guz staje się twardy, nieściśliwy i nie reaguje na tłocznię brzuszną."
          },
          {
            text: "Impuls kaszlowy staje się 100-krotnie silniejszy i rozsadza mosznę.",
            correct: false,
            feedback: "W uwięźnięciu impuls kaszlowy zanika z powodu mechanicznego zaklinowania wrót."
          },
          {
            text: "Kaszel powoduje natychmiastowe samoczynne wciągnięcie guza do klatki piersiowej.",
            correct: false,
            feedback: "Niedorzeczne."
          },
          {
            text: "Badanie impulsu kaszlowego wykonuje się wyłącznie przez ucho.",
            correct: false,
            feedback: "Absurdalna opcja."
          }
        ]
      },
      {
        stepNum: 3,
        title: "Krok 3: Kategoryczny zakaz forsownego odprowadzania (Taksis)!",
        desc: "Młodszy rezydent próbuje oburącz z dużą siłą wciskać bolesny guz przepuklinowy w głąb jamy brzusznej pacjenta (ręczna repozycja / taksis). Dlaczego forsowne odprowadzanie uwięźniętej przepukliny trwającej >4–6 godzin jest BEZWZGLĘDNIE ZAKAZANE?",
        scenario: "Młodszy rezydent próbuje oburącz z dużą siłą wciskać bolesny guz przepuklinowy w głąb jamy brzusznej pacjenta (ręczna repozycja / taksis). Dlaczego forsowne odprowadzanie uwięźniętej przepukliny trwającej >4–6 godzin jest BEZWZGLĘDNIE ZAKAZANE?",
        options: [
          {
            text: "Forsowny taksis grozi: 1) Pęknięciem niedokrwionej ściany jelita; 2) Odprowadzeniem zgorzelinowej, martwiczej pętli jelita do jamy otrzewnej ze śmiertelnym kałowym zapaleniem otrzewnej; 3) 'Rzekomym odprowadzeniem' (reduction en masse – wciśnięciem worka przepuklinowego wraz z zaciśniętym pierścieniem do przestrzeni przedotrzewnowej bez zniesienia uwięźnięcia!).",
            correct: true,
            feedback: "Wybitnie! To kardynalna zasada chirurgii ratunkowej (pewniak LEK): Forsowne odprowadzanie uwięzionej przepukliny (taxis) jest absolutnie ZAKAZANE, jeśli od uwięźnięcia minęło >4-6 godzin lub występują objawy miejscowego stanu zapalnego (zaczerwienienie skóry, wysoka bolesność)! Wciśnięcie martwiczego jelita do brzucha kończy się wstrząsem septycznym i zgonem. Ponadto brutalny ucisk może wywołać tzw. 'odprowadzenie rzekome' (reduction en masse) – guz znika z pachwiny, ale jelito w jamie brzusznej nadal jest zaciśnięte w szyjce worka i ulega martwicy!"
          },
          {
            text: "Ponieważ taksis wywołuje natychmiastowy zawał mięśnia sercowego.",
            correct: false,
            feedback: "Głównym zagrożeniem jest pęknięcie martwiczego jelita i zapalenie otrzewnej."
          },
          {
            text: "Taksis jest zabiegiem zawsze w 100% bezpiecznym i zalecanym przez 24 godziny.",
            correct: false,
            feedback: "Kardynalny błąd: forsowny taksis w zadzierzgnięciu jest błędem w sztuce."
          },
          {
            text: "Zakaz wynika wyłącznie z braku zgody NFZ na procedurę.",
            correct: false,
            feedback: "Zakaz wynika z bezpośredniego zagrożenia życia pacjenta."
          }
        ]
      },
      {
        stepNum: 4,
        title: "Krok 4: Anatomia kanału pachwinowego – Przepuklina skośna vs prosta",
        desc: "Przypominasz rezydentowi anatomię pachwiny. Jakie naczynia krwionośne stanowią anatomiczną granicę między przepukliną pachwinową skośną (boczną) a prostą (przyśrodkową) i która z nich znacznie częściej ulega uwięźnięciu?",
        scenario: "Przypominasz rezydentowi anatomię pachwiny. Jakie naczynia krwionośne stanowią anatomiczną granicę między przepukliną pachwinową skośną (boczną) a prostą (przyśrodkową) i która z nich znacznie częściej ulega uwięźnięciu?",
        options: [
          {
            text: "NACZYNIA NABRZUSZNE DOLNE (arteria et vena epigastrica inferior); przepuklina SKOŚNA (boczna) wychodzi bocznie od naczyń nabrzusznych dolnych przez pierścień pachwinowy głęboki i schodzi wzdłuż powrózka nasiennego do moszny – to ona ZNACZNIE CZĘŚCIEJ ULEGA UWIĘŹNIĘCIU z powodu wąskiej szyjki worka; przepuklina PROSTA (przyśrodkowa) wychodzi przyśrodkowo od naczyń przez trójkąt Hesselbacha i więźnie rzadko (szerokie wrota).",
            correct: true,
            feedback: "Doskonale! Klasyczna anatomia chirurgiczna (częste pytanie na LEK): Punktem odniesienia są naczynia nabrzuszne dolne (gałęzie naczyń biodrowych zewnętrznych): 1) Przepuklina skośna (indirect / lateral): wnika do kanału pachwinowego przez pierścień pachwinowy głęboki (bocznie od naczyń nabrzusznych dolnych), biegnie wewnątrz powrózka nasiennego, schodzi do moszny. Posiada wąski pierścień włóknisty, dlatego UWIĘŹNIE BARDZO CZĘSTO! 2) Przepuklina prosta (direct / medial): wypycha powięź poprzeczną w trójkącie Hesselbacha (przyśrodkowo od naczyń nabrzusznych dolnych), ma szerokie wrota i rzadko ulega uwięźnięciu."
          },
          {
            text: "Tętnica krezkowa dolna stanowi granicę między przepukliną skośną a prostą.",
            correct: false,
            feedback: "Tętnica krezkowa dolna leży w jamie brzusznej (zaotrzewnowo), nie w pachwinie."
          },
          {
            text: "Żyła odpiszczelowa wielka dzieli przepukliny na skośne i proste.",
            correct: false,
            feedback: "Żyła odpiszczelowa to naczynie powierzchowne kończyny dolnej."
          },
          {
            text: "Przepuklina prosta więźnie w 100% przypadków, a skośna nigdy.",
            correct: false,
            feedback: "Dokładnie na odwrót: to przepuklina skośna ma wąską szyjkę i najczęściej więźnie."
          }
        ]
      },
      {
        stepNum: 5,
        title: "Krok 5: Przygotowanie przedoperacyjne na bloku ratunkowym",
        desc: "Kwalifikujesz pacjenta do natychmiastowej operacji w trybie ostrym. Jakie procedury ratunkowe wdrażasz przed wprowadzeniem do znieczulenia ogólnego?",
        scenario: "Kwalifikujesz pacjenta do natychmiastowej operacji w trybie ostrym. Jakie procedury ratunkowe wdrażasz przed wprowadzeniem do znieczulenia ogólnego?",
        options: [
          {
            text: "Założenie zgłębnika nosowo-żołądkowego (odessanie zalegającej treści żołądkowo-jelitowej i ochrona przed zachłyśnięciem przy intubacji), agresywna płynoterapia krystaloidowa i.v., podanie dożylne antybiotyku o szerokim spektrum (np. cefazolina + metronidazol) oraz pilna próba krzyżowa krwi.",
            correct: true,
            feedback: "Znakomicie! Przygotowanie do operacji uwięźniętej przepukliny: pacjent ma niedrożność mechaniczną i pełny żołądek – zgłębnik żołądkowy (sonda Levina) jest kluczowy dla anestezjologa podczas szybkiej indukcji znieczulenia (RSI - rapid sequence induction) w celu ochrony przed śmiertelnym zachłyśnięciem. Wyrównanie wolemii i profilaktyka antybiotykowa są obowiązkowe."
          },
          {
            text: "Podanie pacjentowi obfitej kolacji ze stekiem wołowym.",
            correct: false,
            feedback: "Śmiertelny błąd: pełny żołądek doprowadzi do aspiracji i zgonu podczas intubacji."
          },
          {
            text: "Zalecenie kąpieli w gorącej wodzie przez 5 godzin.",
            correct: false,
            feedback: "Niepotrzebna zwłoka pogłębiająca martwicę jelita."
          },
          {
            text: "Podanie wlewki doodbytniczej z 5 litrów wody mydlanej.",
            correct: false,
            feedback: "Zabronione w ostrej niedrożności jelit."
          }
        ]
      },
      {
        stepNum: 6,
        title: "Krok 6: Kluczowa zasada techniki operacyjnej – Otwarcie worka przed nacięciem pierścienia",
        desc: "Chirurg wykonuje cięcie w prawej pachwinie i odsłania napięty, siny worek przepuklinowy. Jaka jest żelazna zasada operacyjna dotycząca kolejności czynności przy uwięźniętej przepuklinie?",
        scenario: "Chirurg wykonuje cięcie w prawej pachwinie i odsłania napięty, siny worek przepuklinowy. Jaka jest żelazna zasada operacyjna dotycząca kolejności czynności przy uwięźniętej przepuklinie?",
        options: [
          {
            text: "NAJPIERW OTWORZYĆ WOREK PRZEPUKLINOWY i uchwycić uwięzioną pętlę jelitową, a DOPIERO POTEM naciąć pierścień uwięźnienia; zapobiega to dwóm katastrofom: 1) Ucieczce niedokrwionego/martwiczego jelita w głąb jamy brzusznej przed oceną jego żywotności; 2) Wlaniu się zakażonego, septycznego płynu przepuklinowego do jamy otrzewnej!",
            correct: true,
            feedback: "Prawidłowo! To absolutny dogmat techniki operacyjnej w uwięźniętej przepuklinie (pewniak każdego chirurga i egzaminu LEK): Jeśli chirurg najpierw przetnie zaciśnięty pierścień pachwinowy, niedokrwiona pętla jelitowa może natychmiast cofnąć się (uciec) do wnętrza jamy brzusznej, uniemożliwiając ocenę jej żywotności (co wymusiłoby wykonanie dodatkowej laparotomii pośrodkowej!). Dlatego najpierw otwiera się dno worka, odsysa toksyczny płyn przepuklinowy, stabilizuje pętlę jelitową kleszczykami i dopiero wtedy przecina pierścień zaciskający!"
          },
          {
            text: "Najpierw przeciąć wszystkie naczynia krwionośne, a worek wyrzucić bez otwierania.",
            correct: false,
            feedback: "Kardynalny błąd w sztuce."
          },
          {
            text: "Wstrzyknąć 500 ml kleju tkankowego do wnętrza worka przed cięciem.",
            correct: false,
            feedback: "Absurdalne."
          },
          {
            text: "Zaszyć skórę z powrotem bez dotykania przepukliny.",
            correct: false,
            feedback: "Pozostawiłoby pacjenta z martwicą jelita."
          }
        ]
      },
      {
        stepNum: 7,
        title: "Krok 7: Ocena żywotności jelita i dylemat stosowania siatek syntetycznych",
        desc: "Po nacięciu pierścienia uwolniona pętla jelita cienkiego jest ciemnofioletowa i nie wykazuje perystaltyki. Chirurg obkłada jelito wilgotnymi, ciepłymi gazami z solą fizjologiczną, a anestezjolog zwiększa FiO2 do 100%. Po 15 minutach pętla różowieje, pojawia się wyraźna perystaltyka i wyczuwalne tętno w tętniczkach krezkowych. Czy w operacji uwięźniętej przepukliny można bezpiecznie zastosować siatkę syntetyczną?",
        scenario: "Po nacięciu pierścienia uwolniona pętla jelita cienkiego jest ciemnofioletowa i nie wykazuje perystaltyki. Chirurg obkłada jelito wilgotnymi, ciepłymi gazami z solą fizjologiczną, a anestezjolog zwiększa FiO2 do 100%. Po 15 minutach pętla różowieje, pojawia się wyraźna perystaltyka i wyczuwalne tętno w tętniczkach krezkowych. Czy w operacji uwięźniętej przepukliny można bezpiecznie zastosować siatkę syntetyczną?",
        options: [
          {
            text: "Gdy jelito jest żywe (brak martwicy i brak zakażenia/perforacji), można bezpiecznie wykonać plastykę beznapięciową z użyciem siatki syntetycznej (metodą Lichtensteina); natomiast w przypadku stwierdzenia martwicy jelita i konieczności jego resekcji (pole skażone/brudne) unika się klasycznych siatek polipropylenowych z powodu ryzyka zakażenia ciała obcego i stosuje się plastykę tkankową (metodą Shouldice'a lub Bassiniego) lub siatki biologiczne.",
            correct: true,
            feedback: "Znakomicie! Wytyczne HerniaSurge: 1) Jelito żywe (odzyskało różową barwę, perystaltykę i tętno brzeżne): pole operacyjne jest czyste – można zastosować złoty standard zaopatrzenia przepuklin, czyli beznapięciową plastykę z siatką metodą Lichtensteina. 2) Jelito martwicze (wymagające resekcji jelita cienkiego): otwarcie światła przewodu pokarmowego powoduje skażenie bakteryjne rany. Wszczepienie siatki syntetycznej niesie wysokie ryzyko jej ropnego zakażenia i konieczności usunięcia. W takich sytuacjach preferuje się plastykę napięciową tkankami własnymi (metoda Shouldice'a)!"
          },
          {
            text: "Siatkę polipropylenową należy bezwzględnie wszyć bezpośrednio do światła jelita cienkiego.",
            correct: false,
            feedback: "Śmiertelny błąd: wywoła masywną przetokę jelitową i ropowicę."
          },
          {
            text: "Nawet przy w 100% martwym jelicie nie wykonuje się resekcji, tylko pozostawia je w brzuchu.",
            correct: false,
            feedback: "Pozostawienie martwiczego jelita prowadzi do nieuchronnego zgonu z sepsy."
          },
          {
            text: "Wszczepianie siatek w przepuklinach jest w Polsce zabronione prawem.",
            correct: false,
            feedback: "Plastyka z siatką (Lichtenstein) jest złotym standardem na świecie."
          }
        ]
      },
      {
        stepNum: 8,
        title: "Krok 8: Nietypowe odmiany przepuklin uwięźniętych – Przepuklina Richtera, Littrego i Amyanda",
        desc: "Omawiasz z zespołem szczególne typy przepuklin uwięźniętych często sprawdzane na egzaminach LEK. Czym charakteryzuje się podstępna PRZEPUKLINA RICHTERA (przepuklina ścienna)?",
        scenario: "Omawiasz z zespołem szczególne typy przepuklin uwięźniętych często sprawdzane na egzaminach LEK. Czym charakteryzuje się podstępna PRZEPUKLINA RICHTERA (przepuklina ścienna)?",
        options: [
          {
            text: "Przepuklina RICHTERA (hernia parietalis) polega na uwięźnięciu TYLKO CZĘŚCI OBWODU ŚCIANY jelita (przeciwległej do krezki); światło jelita pozostaje częściowo drożne, dlatego NIE WYSTĘPUJĄ pełne objawy mechanicznej niedrożności jelit; stwarza to ogromne ryzyko opóźnienia diagnozy, martwicy ściany i cichej perforacji z kałowym zapaleniem otrzewnej!",
            correct: true,
            feedback: "Wybitnie! Klasyczne eponymy przepuklinowe na LEK: 1) Przepuklina RICHTERA: uwięźnięcie tylko fragmentu ściany jelita (antimesenteric border). Z powodu zachowanej drożności światła pacjent może oddawać gazy i stolec, co usypia czujność lekarza – uwięziona ściana ulega cichej martwicy i perforacji! 2) Przepuklina LITTREGO: obecność uchyłka Meckela w worku przepuklinowym; 3) Przepuklina AMYANDA: obecność wyrostka robaczkowego w worku przepukliny pachwinowej; 4) Przepuklina GARENGEOTA: obecność wyrostka robaczkowego w worku przepukliny udowej; 5) Przepuklina MAYDLA (w kształcie litery W): pętla pośrednia w jamie brzusznej ulega martwicy, podczas gdy pętle w worku są żywe!"
          },
          {
            text: "Przepuklina Richtera to przepuklina zawierająca wyłącznie serce i płuco.",
            correct: false,
            feedback: "Absurdalna opcja anatomiczna."
          },
          {
            text: "Przepuklina Richtera występuje tylko u niemowląt płci żeńskiej w jamie ustnej.",
            correct: false,
            feedback: "Błędne."
          },
          {
            text: "W przepuklinie Richtera dochodzi do natychmiastowego zwapnienia całego jelita.",
            correct: false,
            feedback: "Niedorzeczne."
          }
        ]
      }
    ];
  });

  // ==========================================
  // CASE 133: Ostre niedokrwienie krezki (AMI / Zator SMA)
  // ==========================================
  await upgradeCase('133_ostre_niedokrwienie_krezki_sma.json', (c) => {
    c.steps = [
      {
        stepNum: 1,
        title: "Krok 1: Wstępna ocena na SOR – 72-latek z migotaniem przedsionków i nagłym skrajnym bólem brzucha",
        desc: "Dyżurujesz na chirurgicznym SOR. Pogotowie przywozi 72-letniego mężczyznę. Dokładnie 2.5 godziny temu, bez żadnego uchwytnego urazu, u pacjenta wystąpił nagły, katastrofalny, niewyobrażalnie silny ból brzucha w śródbrzuszu, który chory ocenia na 10/10 w skali NRS. Bólowi towarzyszyły obfite wymioty oraz gwałtowne, jednokrotne opróżnienie jelit (masywny płynny stolec). Pacjent krzyczy z bólu, zwija się na noszach, zlewa zimnym potem. Z wywiadu kardiologicznego: pacjent ma utrwalone migotanie przedsionków (AF), ale 3 miesiące temu samowolnie odstawił leki przeciwkrzepliwe (NOAC/acenokumarol). W badaniu przedmiotowym: tętno niemiarowe, tachykardia 130/min, RR 150/95 mmHg. Gdy przystępujesz do badania palpacyjnego brzucha, ku Twojemu zaskoczeniu stwierdzasz, że powłoki brzuszne są MIĘKKIE, brak obrony mięśniowej, a bolesność przy dotyku jest minimalna w porównaniu z krzykiem pacjenta! Jaka patognomoniczna rozbieżność kliniczna zachodzi u tego chorego?",
        scenario: "Dyżurujesz na chirurgicznym SOR. Pogotowie przywozi 72-letniego mężczyznę. Dokładnie 2.5 godziny temu, bez żadnego uchwytnego urazu, u pacjenta wystąpił nagły, katastrofalny, niewyobrażalnie silny ból brzucha w śródbrzuszu, który chory ocenia na 10/10 w skali NRS. Bólowi towarzyszyły obfite wymioty oraz gwałtowne, jednokrotne opróżnienie jelit (masywny płynny stolec). Pacjent krzyczy z bólu, zwija się na noszach, zlewa zimnym potem. Z wywiadu kardiologicznego: pacjent ma utrwalone migotanie przedsionków (AF), ale 3 miesiące temu samowolnie odstawił leki przeciwkrzepliwe (NOAC/acenokumarol). W badaniu przedmiotowym: tętno niemiarowe, tachykardia 130/min, RR 150/95 mmHg. Gdy przystępujesz do badania palpacyjnego brzucha, ku Twojemu zaskoczeniu stwierdzasz, że powłoki brzuszne są MIĘKKIE, brak obrony mięśniowej, a bolesność przy dotyku jest minimalna w porównaniu z krzykiem pacjenta! Jaka patognomoniczna rozbieżność kliniczna zachodzi u tego chorego?",
        options: [
          {
            text: "Rozpoznajesz ostre niedokrwienie krezki (Acute Mesenteric Ischemia - AMI) najpewniej wywołane ZATOREM TĘTNICY KREZKOWEJ GÓRNEJ (SMA); patognomoniczna cecha: 'BÓL BRZUCHA SKRAJNIE NIEPROPORCJONALNY DO WYNIKÓW BADANIA FIZYKALNEGO' (potężny ból trzewny przy miękkim brzuchu bez objawów otrzewnowych we wczesnej fazie) u chorego z migotaniem przedsionków bez antykoagulacji.",
            correct: true,
            feedback: "Znakomicie! Złoty objaw wczesnego ostrego niedokrwienia krezki (AMI): 'Ból nieproporcjonalny do badania fizykalnego' (pain out of proportion to physical exam findings) to najważniejszy dogmat chirurgiczny na LEK! We wczesnej fazie (pierwsze 2–6 godzin) dochodzi do ostrego niedokrwienia śluzówki jelita, co wywołuje potworny, rozdzierający ból trzewny. Otrzewna ścienna nie jest jeszcze podrażniona, dlatego brzuch pozostaje miękki, wiotki i mało tkliwy. Lekarze nieświadomi tej zasady nagminnie odsyłają chorych z rozpoznaniem 'bólu czynnościowego' lub 'nerwicy', co prowadzi do martwicy jelit i zgonu!"
          },
          {
            text: "Uznajesz, że skoro brzuch jest miękki, pacjent symuluje ból w celu wyłudzenia opioidów.",
            correct: false,
            feedback: "Kardynalny błąd śmiertelny! 'Miękki brzuch' w pierwszych godzinach zatoru SMA to klasyczna pułapka diagnostyczna; opóźnienie rozpoznania kończy się 80% śmiertelnością."
          },
          {
            text: "Rozpoznajesz ostre zapalenie żołądka i podajesz pacjentowi tabletkę ranigasty.",
            correct: false,
            feedback: "Ból 10/10 z migotaniem przedsionków to stan bezpośredniego zagrożenia martwicą jelita."
          },
          {
            text: "Stawiasz rozpoznanie pęknięcia macicy u 72-letniego mężczyzny.",
            correct: false,
            feedback: "Absurdalna opcja."
          }
        ]
      },
      {
        stepNum: 2,
        title: "Krok 2: Badania laboratoryjne CITO – Hiperlaktatemia i kwasica metaboliczna",
        desc: "Pobierasz krew na cito: Gazometria tętnicza: pH 7.24, HCO3- 14 mmol/l, BE -11 mmol/l (kwasica metaboliczna z wysoką luką anionową), KWAS MLEKOWY (mleczany): 4.8 mmol/l (znacznie podwyższony, norma <1.6 mmol/l). Morfologia: Leukocytoza 24.2 G/l z neutrofilią 89% (silna leukocytoza), D-dimery >10 000 ng/ml. Jakie znaczenie prognostyczne i patofizjologiczne ma wysokie stężenie mleczanów w ostrym brzuchu?",
        scenario: "Pobierasz krew na cito: Gazometria tętnicza: pH 7.24, HCO3- 14 mmol/l, BE -11 mmol/l (kwasica metaboliczna z wysoką luką anionową), KWAS MLEKOWY (mleczany): 4.8 mmol/l (znacznie podwyższony, norma <1.6 mmol/l). Morfologia: Leukocytoza 24.2 G/l z neutrofilią 89% (silna leukocytoza), D-dimery >10 000 ng/ml. Jakie znaczenie prognostyczne i patofizjologiczne ma wysokie stężenie mleczanów w ostrym brzuchu?",
        options: [
          {
            text: "Hiperlaktatemia (>2–3 mmol/l) w połączeniu z kwasicą metaboliczną i wysoką leukocytozą jest kluczowym laboratoryjnym wskaźnikiem niedotlenienia tkanek, beztlenowej glikolizy i ROZWIJAJĄCEJ SIĘ MARTWICY ŚCIANY JELITA (zaawansowane niedokrwienie); prawidłowe stężenie mleczanów we wczesnej fazie nie wyklucza jednak AMI!",
            correct: true,
            feedback: "Doskonale! Pewniak egzaminacyjny LEK: Kwas mlekowy (mleczany) to najważniejszy marker biochemiczny niedokrwienia krezki. Wskutek odcięcia dopływu krwi przez zator SMA enterocyty przechodzą na metabolizm beztlenowy, produkując masowo L-mleczany wylewające się do krążenia wrotnego. Wzrost mleczanów >2.5–3 mmol/l silnie koreluje z nieodwracalnym uszkodzeniem i martwicą ściany jelita! Pamiętaj: we wczesnej fazie (<2h) mleczany mogą być jeszcze w normie – nie wolno czekać na ich wzrost przed zleceniem angio-TK!"
          },
          {
            text: "Hiperlaktatemia 4.8 mmol/l oznacza, że pacjent wypił zbyt dużo mleka krowiego.",
            correct: false,
            feedback: "Absurdalna interpretacja: mleczany to produkt glikolizy beztlenowej."
          },
          {
            text: "Kwasica metaboliczna w 100% wyklucza chorobę naczyń.",
            correct: false,
            feedback: "Kwasica to bezpośrednie następstwo uogólnionej hipoperfuzji jelitowej."
          },
          {
            text: "Wysokie D-dimery świadczą wyłącznie o żylakach podudzi.",
            correct: false,
            feedback: "D-dimery w zatorze krezkowym są czułym (choć nieswoistym) markerem zakrzepowo-zatorowym."
          }
        ]
      },
      {
        stepNum: 3,
        title: "Krok 3: Cztery mechanizmy ostrego niedokrwienia krezki",
        desc: "Rezydent pyta o klasyfikację przyczyn ostrego niedokrwienia krezki. Jakie 4 główne mechanizmy patofizjologiczne wywołują ostre niedokrwienie jelit i który z nich jest najczęstszy?",
        scenario: "Rezydent pyta o klasyfikację przyczyn ostrego niedokrwienia krezki. Jakie 4 główne mechanizmy patofizjologiczne wywołują ostre niedokrwienie jelit i który z nich jest najczęstszy?",
        options: [
          {
            text: "1) ZATOR TĘTNICY KREZKOWEJ GÓRNEJ (SMA Embolism – najczęstszy, ok. 50% przypadków; materiał zatorowy z serca w AF); 2) ZAKRZEPICA TĘTNICY KREZKOWEJ GÓRNEJ (SMA Thrombosis – ok. 25%; nałożona na blaszkę miażdżycową w ujściu SMA); 3) NIEOKLUZYJNE NIEDOKRWIENIE KREZKI (NOMI – ok. 20%; wazospazm u chorych we wstrząsie kardiogennym na aminach); 4) ZAKRZEPICA ŻYŁY KREZKOWEJ GÓRNEJ (MVT – ok. 5–10%; u chorych z trombofilią i nadciśnieniem wrotnym).",
            correct: true,
            feedback: "Wybitnie! Klasyfikacja ostrego niedokrwienia krezki (AMI) wg wytycznych WSES/ESVS: 1) Zator SMA (50%): nagły początek, materiał z lewego przedsionka/ucha w migotaniu przedsionków; zator więźnie typowo 3–8 cm od odejścia SMA, oszczędzając tętnicę okrężniczą środkową; 2) Zakrzepica tętnicza (25%): powolniejszy początek, chory z wywiadem 'dusznicy brzusznej' (bóle poposiłkowe i ubytek wagi); 3) NOMI (20%): u chorych na OIT po reanimacji, we wstrząsie sercowym pod wpływem potężnego skurczu tętniczek (noradrenalina); 4) Zakrzepica żylna (MVT, 10%): rozwój w ciągu dni/tygodni u chorych z nadkrzepliwością."
          },
          {
            text: "Wszystkie niedokrwienia krezki wynikają wyłącznie z połknięcia tasiemca uzbrojonego.",
            correct: false,
            feedback: "Absurdalna opcja."
          },
          {
            text: "Niedokrwienie krezki występuje tylko u dzieci z alergią na gluten.",
            correct: false,
            feedback: "Celiakia nie powoduje ostrego zatoru naczyniowego tętnicy krezkowej."
          },
          {
            text: "Etiologia jest nieznana i nie istnieje podział na mechanizmy.",
            correct: false,
            feedback: "Klasyfikacja na zator, zakrzepicę tętniczą, NOMI i zakrzepicę żylną to podstawa leczenia."
          }
        ]
      },
      {
        stepNum: 4,
        title: "Krok 4: Złoty standard diagnostyki obrazowej – ANGIO-TK jamy brzusznej (CTA)",
        desc: "Jakie badanie obrazowe jest ZŁOTYM STANDARDEM z wyboru o czułości i swoistości >95% w podejrzeniu ostrego niedokrwienia krezki i dlaczego zwykłe USG Doppler lub RTG nie mogą opóźniać jego wykonania?",
        scenario: "Jakie badanie obrazowe jest ZŁOTYM STANDARDEM z wyboru o czułości i swoistości >95% w podejrzeniu ostrego niedokrwienia krezki i dlaczego zwykłe USG Doppler lub RTG nie mogą opóźniać jego wykonania?",
        options: [
          {
            text: "ANGIOGRAFIA TOMOGRAFII KOMPUTEROWEJ (Angio-TK / CTA) jamy brzusznej z wielofazowym kontrastem dożylnym (faza tętnicza i wrotna); bezpośrednio uwidacznia miejsce zamknięcia pnia SMA przez zator, brak wzmocnienia ściany pętli jelitowych, obrzęk krezki oraz objawy zaawansowanej martwicy (odmę ściany jelita – pneumatosis intestinalis i gaz w żyle wrotnej).",
            correct: true,
            feedback: "Znakomicie! Złoty standard diagnostyczny (wytyczne WSES): Angio-TK (biphasic CTA) jamy brzusznej jest badaniem pierwszego rzutu i podstawą rozpoznania! Uwidacznia ubytek zakontrastowania w SMA (dokładną lokalizację zatoru przed operacją), grubość i unaczynienie ściany jelit. RTG przeglądowe jest bezużyteczne we wczesnej fazie. USG Doppler jest wybitnie utrudnione przez gazy jelitowe. Czas to jelito ('Time is bowel'): wykonanie Angio-TK powinno nastąpić natychmiast!"
          },
          {
            text: "Kolonoskopia z biopsją błony śluzowej odbytnicy.",
            correct: false,
            feedback: "Kolonoskopia nie diagnozuje zatoru SMA, a insuflacja powietrza może doprowadzić do perforacji martwiczego jelita!"
          },
          {
            text: "Klasyczne zdjęcie RTG klatki piersiowej na leżąco.",
            correct: false,
            feedback: "Nie uwidacznia naczyń krezkowych ani niedokrwienia."
          },
          {
            text: "Scyntygrafia tarczycy z jodem radioaktywnym.",
            correct: false,
            feedback: "Absurdalna opcja."
          }
        ]
      },
      {
        stepNum: 5,
        title: "Krok 5: Wstępna farmakoterapia ratunkowa – Antykoagulacja heparyną niefrakcjonowaną",
        desc: "W angio-TK potwierdzono zator pnia tętnicy krezkowej górnej (SMA) 4 cm od odejścia. Pacjent jest przygotowywany do pilnego bloku operacyjnego. Jaki lek przeciwkrzepliwy podajesz NATYCHMIAST dożylnie i dlaczego?",
        scenario: "W angio-TK potwierdzono zator pnia tętnicy krezkowej górnej (SMA) 4 cm od odejścia. Pacjent jest przygotowywany do pilnego bloku operacyjnego. Jaki lek przeciwkrzepliwy podajesz NATYCHMIAST dożylnie i dlaczego?",
        options: [
          {
            text: "HEPARYNA NIEFRAKCJONOWANA (UFH) w bolusie dożylnym (np. 5000 j.m. lub 80 j./kg i.v.); natychmiast zapobiega narastaniu zakrzepu dystalnie od zatoru w mikrokrążeniu krezkowym oraz zmniejsza ryzyko wtórnej zakrzepicy w układzie wrotnym.",
            correct: true,
            feedback: "Doskonale! Standard postepowania przedoperacyjnego w AMI: Natychmiast po wysunięciu podejrzenia / potwierdzenia zatoru SMA należy podać bolus dożylny heparyny niefrakcjonowanej (UFH). Zator w pniu SMA wywołuje zastój krwi w obwodowych gałęziach jelitowych, co prowadzi do lawinowej zakrzepicy wstecznej i niszczenia mikrokrążenia (tzw. no-reflow phenomenon). UFH hamuje propagację zakrzepu i może być natychmiast zneutralizowana siarczanem protaminy przed ewentualnym krwawieniem śródoperacyjnym."
          },
          {
            text: "Kwas traneksamowy (Exacyl) w celu zahamowania krwawienia.",
            correct: false,
            feedback: "Kardynalny błąd śmiertelny! Kwas traneksamowy to lek przeciwfibrynolityczny – nasili zakrzepicę naczyniową i przyspieszy martwicę całego jelita!"
          },
          {
            text: "Podanie doustnej warfaryny w dawce jednorazowej.",
            correct: false,
            feedback: "Warfaryna zaczyna działać po 3-5 dniach, a w pierwszych dobach wykazuje przejściowy efekt prozakrzepowy (spadek białka C)."
          },
          {
            text: "Zalecenie picia zielonej herbaty z imbirem.",
            correct: false,
            feedback: "Niedorzeczne."
          }
        ]
      },
      {
        stepNum: 6,
        title: "Krok 6: Postępowanie operacyjne – Embolektomia tętnicza cewnikiem Fogarty'ego",
        desc: "Chory trafia na salę operacyjną w trybie pilnym (laparotomia ratunkowa). Po otwarciu otrzewnej chirurg stwierdza zblednięcie i wiotkość jelita czczego i krętego. Jaką procedurę naczyniową wykonuje się w celu przywrócenia perfuzji w SMA?",
        scenario: "Chory trafia na salę operacyjną w trybie pilnym (laparotomia ratunkowa). Po otwarciu otrzewnej chirurg stwierdza zblednięcie i wiotkość jelita czczego i krętego. Jaką procedurę naczyniową wykonuje się w celu przywrócenia perfuzji w SMA?",
        options: [
          {
            text: "Odsłonięcie pnia SMA u nasady krezki poprzecznicy, podłużna arteriotomia i chirurgiczna EMBOLEKTOMIA CEWNIKIEM FOGARTY'EGO (wprowadzenie cewnika balonowego poza zator, napełnienie balonu i wyciągnięcie skrzepliny) z następowym zamknięciem tętnicy szwem naczyniowym z łatą (patch angioplasty); alternatywą w ośrodkach hybrydowych jest embolektomia aspiracyjna endowaskularna.",
            correct: true,
            feedback: "Wybitnie! Klasyczna operacja naczyniowa w zatorze SMA: Chirurg preparuje tętnicę krezkową górną tuż poniżej dolnego brzegu trzustki, nacina naczynie (arteriotomia) i wprowadza cewnik Fogarty'ego (nr 3 lub 4F) obwodowo i dośrodkowo. Po napełnieniu balonika ewakuuje materiał zatorowy, uzyskując potężny napływ krwi i tętno obwodowe. Kluczowa zasada: NAJPIERW PRZYWRÓCIĆ PRZEPŁYW (rewaskularyzacja), a DOPIERO POTEM oceniać, co w jelicie faktycznie obumarło i wymaga wycięcia!"
          },
          {
            text: "Natychmiastowe wycięcie całego jelita cienkiego i grubego bez dotykania naczyń.",
            correct: false,
            feedback: "Błąd okaleczający: usunięcie całego jelita skazuje pacjenta na śmierć lub całkowitą niewydolność jelit."
          },
          {
            text: "Zaszycie powłok i podanie wlewki z mydła.",
            correct: false,
            feedback: "Brak rewaskularyzacji oznacza 100% zgon pacjenta."
          },
          {
            text: "Podwiązanie aorty brzusznej powyżej pnia trzewnego.",
            correct: false,
            feedback: "Natychmiastowa śmierć chorego."
          }
        ]
      },
      {
        stepNum: 7,
        title: "Krok 7: Ocena żywotności jelita i strategia 'Second-Look Laparotomy'",
        desc: "Po udanej embolektomii i powrocie tętna w krezce część jelita cienkiego różowieje, ale środkowy odcinek o długości 80 cm pozostaje siny, o wątpliwej żywotności. Jaką nowoczesną strategię chirurgiczną ('Second-Look') wdraża chirurg, aby uniknąć zespołu krótkiego jelita?",
        scenario: "Po udanej embolektomii i powrocie tętna w krezce część jelita cienkiego różowieje, ale środkowy odcinek o długości 80 cm pozostaje siny, o wątpliwej żywotności. Jaką nowoczesną strategię chirurgiczną ('Second-Look') wdraża chirurg, aby uniknąć zespołu krótkiego jelita?",
        options: [
          {
            text: "Oszczędzająca resekcja wyłącznie odcinków ewidentnie martwiczych (czarnych, perforowanych), pozostawienie odcinków o wątpliwym ukrwieniu i zaplanowanie OBOWIĄZKOWEJ REOPERACJI ZA 24–48 GODZIN (Second-Look Laparotomy / relaparotomia programowana) w celu ostatecznej weryfikacji granicy żywotności jelita.",
            correct: true,
            feedback: "Doskonale! Złota reguła postępowania w niedokrwieniu krezki (Second-Look surgery): Po rewaskularyzacji pętla jelitowa potrzebuje wielu godzin na regenerację (odwrócenie skurczu naczyniowego i powrót mikrokrążenia). Wycinanie na zapas pętli 'o wątpliwej żywotności' skazuje chorego na zespół krótkiego jelita (Short Bowel Syndrome - SBS) i zależność od żywienia pozajelitowego. Standardem jest: wyciąć tylko martwicę, zamknąć brzuch tymczasowo (np. z użyciem terapii podciśnieniowej NPWT/laparostomii) i wejść do brzucha ponownie dokładnie po 24-48h (second-look) – w tym czasie odwracalnie niedokrwione pętle w pełni regenerują!"
          },
          {
            text: "Pozostawienie brzucha otwartego bez opatrunku na 3 miesiące.",
            correct: false,
            feedback: "Brak zabezpieczenia trzewi doprowadzi do wysychania i przetok jelitowych."
          },
          {
            text: "Zalecenie natychmiastowego rozpoczęcia diety z dużą zawartością schabowych.",
            correct: false,
            feedback: "Jelito jest w stanie ciężkiego niedokrwienia, chory wymaga żywienia pozajelitowego."
          },
          {
            text: "Uznanie, że 'second-look' jest procedurą zakazaną w chirurgii.",
            correct: false,
            feedback: "Relaparotomia second-look jest standardem o udowodnionej skuteczności ratującej jelito."
          }
        ]
      },
      {
        stepNum: 8,
        title: "Krok 8: Profilaktyka wtórna – Antykoagulacja do końca życia",
        desc: "W trakcie 'second-look' po 36h stwierdzono pełną rekanalizację i zaróżowienie pozostawionego odcinka jelita. Zespolono jelito. Jakie leczenie farmakologiczne pacjent z utrwalonym migotaniem przedsionków musi bezwzględnie przyjmować do końca życia?",
        scenario: "W trakcie 'second-look' po 36h stwierdzono pełną rekanalizację i zaróżowienie pozostawionego odcinka jelita. Zespolono jelito. Jakie leczenie farmakologiczne pacjent z utrwalonym migotaniem przedsionków musi bezwzględnie przyjmować do końca życia?",
        options: [
          {
            text: "Przewlekła doustna ANTYKOAGULACJA DO KOŃCA ŻYCIA (doustne antykoagulanty niebędące antagonistami witaminy K - NOAC: rywaroksaban, apiksaban, dabigatran LUB antagonista witaminy K - VKA pod kontrolą INR 2.0–3.0) w celu zapobiegania kolejnym zatorom do tętnic krezkowych, mózgowych i obwodowych.",
            correct: true,
            feedback: "Wybitnie! Kluczowe zalecenia kardiologiczno-chirurgiczne: Zator tętnicy krezkowej górnej (SMA) u pacjenta z migotaniem przedsionków jest powikłaniem zakrzepowo-zatorowym o najwyższym ryzyku (punktacja CHA2DS2-VASc >=2). Odstawienie leczenia przeciwkrzepliwego przez pacjenta było bezpośrednią przyczyną tego śmiertelnego incydentu. Po ustąpieniu ryzyka krwawienia pooperacyjnego chory musi natychmiast powrócić do przewlekłej, bezterminowej antykoagulacji doustnej (NOAC/VKA)!"
          },
          {
            text: "Zalecenie podawania wyłącznie witaminy K w celu krzepnięcia krwi.",
            correct: false,
            feedback: "Podanie witaminy K wywoła nawrót zatorowości i kolejny zator!"
          },
          {
            text: "Kategoryczny zakaz jakichkolwiek leków przeciwkrzepliwych na zawsze.",
            correct: false,
            feedback: "Doprowadzi do udaru mózgu lub kolejnego śmiertelnego zatoru krezkowego."
          },
          {
            text: "Antykoagulację stosuje się tylko przez 3 dni po wypisie.",
            correct: false,
            feedback: "Migotanie przedsionków jest utrwalone, leczenie trwa do końca życia."
          }
        ]
      }
    ];
  });

  // ==========================================
  // CASE 134: Zapalenie uchyłków esicy (Hinchey II)
  // ==========================================
  await upgradeCase('134_zapalenie_uchylkow_esicy_hinchey.json', (c) => {
    c.steps = [
      {
        stepNum: 1,
        title: "Krok 1: Wstępna ocena na SOR – 60-letnia kobieta z bólem w lewym dole biodrowym ('lewy wyrostek')",
        desc: "Dyżurujesz na chirurgicznym SOR. Zgłasza się 60-letnia kobieta. Od 3 dni odczuwa narastający ból w lewym dolnym kwadrancie brzucha (w lewym dole biodrowym), któremu towarzyszy stan podgorączkowy do 38.4°C, wzdęcia, nudności oraz zmiana rytmu wypróżnień (uporczywe zaparcia na zmianę z biegunką z domieszką śluzu). Pacjentka ma w wywiadzie uchyłkowatość jelita grubego rozpoznaną w kolonoskopii 4 lata temu. W badaniu przedmiotowym: HR 96/min, RR 130/80 mmHg, temp. 38.3°C. Brzuch w lewym dole biodrowym jest wyraźnie bolesny przy palpacji, obecna miejscowa obrona mięśniowa oraz dodatni objaw Blumberga po stronie lewej, wyczuwalny bolesny, nieostro odgraniczony opór. Jaka jest Twoja wstępna diagnoza?",
        scenario: "Dyżurujesz na chirurgicznym SOR. Zgłasza się 60-letnia kobieta. Od 3 dni odczuwa narastający ból w lewym dolnym kwadrancie brzucha (w lewym dole biodrowym), któremu towarzyszy stan podgorączkowy do 38.4°C, wzdęcia, nudności oraz zmiana rytmu wypróżnień (uporczywe zaparcia na zmianę z biegunką z domieszką śluzu). Pacjentka ma w wywiadzie uchyłkowatość jelita grubego rozpoznaną w kolonoskopii 4 lata temu. W badaniu przedmiotowym: HR 96/min, RR 130/80 mmHg, temp. 38.3°C. Brzuch w lewym dole biodrowym jest wyraźnie bolesny przy palpacji, obecna miejscowa obrona mięśniowa oraz dodatni objaw Blumberga po stronie lewej, wyczuwalny bolesny, nieostro odgraniczony opór. Jaka jest Twoja wstępna diagnoza?",
        options: [
          {
            text: "Rozpoznajesz ostre zapalenie uchyłków esicy (Diverticulitis acuta sigmoidei); klasyczny obraz tzw. 'lewostronnego zapalenia wyrostka robaczkowego' (left-sided appendicitis): ból w lewym dole biodrowym + gorączka + leukocytoza i miejscowe objawy otrzewnowe u osoby z uchyłkowatością okrężnicy.",
            correct: true,
            feedback: "Znakomicie! Klasyczna manifestacja ostrego zapalenia uchyłków esicy (diverticulitis): esica jest najczęstszą lokalizacją uchyłków rzekomych nabytej uchyłkowatości w populacji zachodniej (>90%). Zapalenie rozwija się wskutek zatkania szyjki uchyłka przez kamień kałowy (fecalith), erozji ściany i mikroniedokrwienia. Ze względu na zbieżność obrazu klinicznego z zapaleniem wyrostka, ale po lewej stronie, choroba jest tradycyjnie nazywana 'lewostronnym zapaleniem wyrostka robaczkowego'."
          },
          {
            text: "Rozpoznajesz zespół jelita drażliwego (IBS) i zalecasz dietę bezresztkową.",
            correct: false,
            feedback: "Kardynalny błąd! Gorączka 38.4°C, obrona mięśniowa i objaw Blumberga wykluczają czynnościowy IBS."
          },
          {
            text: "Stawiasz rozpoznanie ostrego zapalenia pęcherzyka żółciowego.",
            correct: false,
            feedback: "Pęcherzyk żółciowy leży pod prawym łukiem żebrowym, a objawy są w lewym dole biodrowym."
          },
          {
            text: "Podejrzewasz skręt szypuły jajnika lewego u pacjentki bez jajników.",
            correct: false,
            feedback: "Niedorzeczne."
          }
        ]
      },
      {
        stepNum: 2,
        title: "Krok 2: Złoty standard diagnostyki obrazowej – Tomografia komputerowa (TK) jamy brzusznej",
        desc: "Jakie badanie obrazowe jest ZŁOTYM STANDARDEM z wyboru w diagnostyce ostrego zapalenia uchyłków esicy wg wytycznych WSES i ASCRS?",
        scenario: "Jakie badanie obrazowe jest ZŁOTYM STANDARDEM z wyboru w diagnostyce ostrego zapalenia uchyłków esicy wg wytycznych WSES i ASCRS?",
        options: [
          {
            text: "TOMOGRAFIA KOMPUTEROWA (TK) jamy brzusznej i miednicy z kontrastem dożylnym (i opcjonalnie doodbytniczym); pozwala na potwierdzenie zapalenia (pogrubienie ściany esicy >4 mm, naciek zapalny tłuszczu okołojelitowego) oraz dokładną klasyfikację powikłań wg skali Hincheya (ropnie, przetoki, perforacja z wolnym gazem).",
            correct: true,
            feedback: "Doskonale! Złoty standard obrazowy: Tomografia komputerowa (TK) z kontrastem dożylnym ma czułość i swoistość >95–98% w ostrym zapaleniu uchyłków. Uwidacznia: 1) Pogrubienie ściany esicy (>4-5 mm); 2) Zamglenie i nacieczenie tkanki tłuszczowej okołookrężniczej (pericolic fat stranding); 3) Obecność powikłań: ropni wewnątrzbrzusznych, przetok (np. pęcherzowo-okrężniczej) oraz pęcherzyków wolnego gazu pozajelitowego."
          },
          {
            text: "Zdjęcie rentgenowskie przeglądowe klatki piersiowej na stojąco jako jedyne badanie.",
            correct: false,
            feedback: "RTG nie uwidacznia ściany uchyłków ani ropni."
          },
          {
            text: "Scyntygrafia kości z technetem.",
            correct: false,
            feedback: "Brak związku."
          },
          {
            text: "Urografia dożylna z kontrastem jodowym.",
            correct: false,
            feedback: "Urografia ocenia układ moczowy, nie jelito grube."
          }
        ]
      },
      {
        stepNum: 3,
        title: "Krok 3: BEZWZGLĘDNE PRZECIWWSKAZANIE do kolonoskopii w ostrej fazie!",
        desc: "Młodszy stażysta proponuje wykonanie pilnej pełnej kolonoskopii u pacjentki, aby 'dokładnie obejrzeć zmienione zapalnie uchyłki od środka'. Dlaczego kolonoskopia w ostrej fazie zapalenia uchyłków jest BEZWZGLĘDNIE ZAKAZANA?",
        scenario: "Młodszy stażysta proponuje wykonanie pilnej pełnej kolonoskopii u pacjentki, aby 'dokładnie obejrzeć zmienione zapalnie uchyłki od środka'. Dlaczego kolonoskopia w ostrej fazie zapalenia uchyłków jest BEZWZGLĘDNIE ZAKAZANA?",
        options: [
          {
            text: "Kategorycznie i bezwzględnie ZAKAZUJESZ kolonoskopii w ostrej fazie! Zmieniona zapalnie, krucha i ścieńczała ściana uchyłka pod wpływem insuflacji powietrza i manipulacji endoskopem ulega natychmiastowemu PRZEDZIURAWIENIU (perforacji jatrogennej), co prowadzi do masywnego kałowego zapalenia otrzewnej i wstrząsu septycznego!",
            correct: true,
            feedback: "Wybitnie! To żelazna reguła gastroenterologii i chirurgii (pewniak każdego LEK): KOLONOSKOPIA W OSTREJ FAZIE DIVERTICULITIS JEST BEZWZGLĘDNIE PRZECIWWSKAZANA! Uchyłki okrężnicy to uchyłki rzekome (pozbawione warstwy mięśniowej, składające się jedynie ze śluzówki i surowicówki). W ostrym stanie zapalnym ściana uchyłka jest martwicza i krucha – wdmuchanie powietrza przez kolonoskop natychmiast rozrywa uchyłek! Kolonoskopię wykonuje się bezpiecznie dopiero po 6–8 TYGODNIACH od pełnego wygaszenia stanu zapalnego (aby wykluczyć raka jelita grubego, który może dawać identyczny obraz kliniczny i radiologiczny)."
          },
          {
            text: "Zgadzasz się i podajesz pacjentce 5 litrów płynu do przygotowania jelita na cito.",
            correct: false,
            feedback: "Kardynalny błąd: forsowne przeczyszczanie w ostrym zapaleniu grozi perforacją."
          },
          {
            text: "Kolonoskopia jest zakazana tylko w poniedziałki i piątki.",
            correct: false,
            feedback: "Absurdalna opcja."
          },
          {
            text: "Zakaz wynika z braku refundacji kolonoskopii u kobiet.",
            correct: false,
            feedback: "Zakaz ma podłoże ściśle biologiczne: ryzyko śmiertelnej perforacji."
          }
        ]
      },
      {
        stepNum: 4,
        title: "Krok 4: Klasyfikacja ciężkości powikłań wg skali Hincheya",
        desc: "W wykonanym badaniu TK radiolog opisuje: w lewym dole biodrowym, w sąsiedztwie zmienionej zapalnie esicy z licznymi uchyłkami, widoczny jest dobrze odgraniczony, grubościenny zbiornik płynowo-gazowy o wymiarach 5.5 x 4.8 cm, zlokalizowany w miednicy mniejszej w sąsiedztwie lewego jajowodu (odległy ropień miedniczy). Brak wolnego powietrza pod przeponą. Jaki stopień zaawansowania rozpoznajesz wg klasyfikacji Hincheya?",
        scenario: "W wykonanym badaniu TK radiolog opisuje: w lewym dole biodrowym, w sąsiedztwie zmienionej zapalnie esicy z licznymi uchyłkami, widoczny jest dobrze odgraniczony, grubościenny zbiornik płynowo-gazowy o wymiarach 5.5 x 4.8 cm, zlokalizowany w miednicy mniejszej w sąsiedztwie lewego jajowodu (odległy ropień miedniczy). Brak wolnego powietrza pod przeponą. Jaki stopień zaawansowania rozpoznajesz wg klasyfikacji Hincheya?",
        options: [
          {
            text: "Stopień II wg klasyfikacji Hincheya (Hinchey II) – zapalenie uchyłków powikłane ODLEGŁYM ROPIENIEM (w miednicy mniejszej lub przestrzeni zaotrzewnowej).",
            correct: true,
            feedback: "Znakomicie! Klasyfikacja Hincheya w ostrym powikłanym zapaleniu uchyłków (klasyk LEK): 1) Hinchey I: zapalenie okołookrężnicze ograniczone (Ia: flegmona / naciek zapalny; Ib: ropień okołookrężniczy / pericolic abscess); 2) Hinchey II: ropień odległy miedniczy (pelvic abscess), w jamie brzusznej lub zaotrzewnowy (jak u naszej pacjentki, ropień 5.5 cm w miednicy); 3) Hinchey III: uogólnione ropne zapalenie otrzewnej (brak wycieku kału); 4) Hinchey IV: uogólnione kałowe zapalenie otrzewnej (otwarta perforacja z masywnym kałem w otrzewnej)."
          },
          {
            text: "Stopień IV wg Hincheya z kałowym zapaleniem otrzewnej.",
            correct: false,
            feedback: "W stopniu IV obecny jest wolny kał i rozlane zapalenie otrzewnej, a tu zbiornik jest ograniczonym ropniem."
          },
          {
            text: "Stopień Ia wg Hincheya bez powikłań ropnych.",
            correct: false,
            feedback: "Obecność ropnia 5.5 cm w miednicy mniejszej to z definicji Hinchey II."
          },
          {
            text: "Stopień 0 – całkowicie zdrowa okrężnica.",
            correct: false,
            feedback: "Pacjentka ma ropień miedniczy wymagający interwencji."
          }
        ]
      },
      {
        stepNum: 5,
        title: "Krok 5: Nowoczesne leczenie Hinchey II – Drenaż przezskórny pod kontrolą TK/USG",
        desc: "Pacjentka ma ropień o średnicy 5.5 cm w miednicy mniejszej (Hinchey II), jest stabilna hemodynamicznie, bez rozlanego zapalenia otrzewnej. Jakie postępowanie terapeutyczne jest ZŁOTYM STANDARDEM wg wytycznych WSES/ASCRS?",
        scenario: "Pacjentka ma ropień o średnicy 5.5 cm w miednicy mniejszej (Hinchey II), jest stabilna hemodynamicznie, bez rozlanego zapalenia otrzewnej. Jakie postępowanie terapeutyczne jest ZŁOTYM STANDARDEM wg wytycznych WSES/ASCRS?",
        options: [
          {
            text: "PRZEZSKÓRNY DRENAŻ ROPNIA pod kontrolą tomografii komputerowej (lub USG) z założeniem drenu typu pigtail w połączeniu z dożylną antybiotykoterapią o szerokim spektrum (np. ceftriakson + metronidazol lub piperacylina z tazobaktamem); pozwala na opanowanie sepsy i uniknięcie pilnej okaleczającej operacji ze stomią!",
            correct: true,
            feedback: "Doskonale! Nowoczesny paradygmat chirurgiczny w Hinchey II: w przypadku ropni o średnicy >=4–5 cm metodą pierwszego wyboru jest małoinwazyjny drenaż przezskórny pod kontrolą TK (percutaneous CT-guided drainage). Ewakuacja ropy i antybiotykoterapia prowadzą do całkowitego wyleczenia u >80% chorych. Dzięki temu pacjent UNIKA pilnej operacji w warunkach zapalenia (która niemal zawsze kończy się operacją Hartmanna i wyłonieniem stomii!). Drenaż przezskórny stanowi pomost do ewentualnej planowej, bezpiecznej resekcji esicy z pierwotnym zespoleniem po wygojeniu ropnia."
          },
          {
            text: "Natychmiastowa laparotomia z wycięciem całej okrężnicy i żołądka.",
            correct: false,
            feedback: "Zbyt inwazyjne: drenaż przezskórny jest leczeniem z wyboru w Hinchey II."
          },
          {
            text: "Wyłącznie leczenie domowe syropem z malin bez antybiotyków.",
            correct: false,
            feedback: "Ropień 5.5 cm bez drenażu i antybiotyków pęknie, wywołując śmiertelne zapalenie otrzewnej."
          },
          {
            text: "Podanie pacjentce leków moczopędnych w wysokiej dawce.",
            correct: false,
            feedback: "Brak wpływu na ropień miednicy."
          }
        ]
      },
      {
        stepNum: 6,
        title: "Krok 6: Wskazania do pilnej operacji i operacja Hartmanna (Hinchey III/IV)",
        desc: "Kiedy zapalenie uchyłków esicy wymaga natychmiastowej, ratunkowej interwencji chirurgicznej i jaka operacja jest klasycznym standardem w uogólnionym zapaleniu otrzewnej?",
        scenario: "Kiedy zapalenie uchyłków esicy wymaga natychmiastowej, ratunkowej interwencji chirurgicznej i jaka operacja jest klasycznym standardem w uogólnionym zapaleniu otrzewnej?",
        options: [
          {
            text: "Wskazania: uogólnione zapalenie otrzewnej (Hinchey III - ropne, Hinchey IV - kałowe), wolna perforacja z odmą otrzewnową, wstrząs septyczny lub brak możliwości / niepowodzenie drenażu przezskórnego; klasycznym zabiegiem ratującym życie jest OPERACJA HARTMANNA (resekcja esicy ze stomią końcową).",
            correct: true,
            feedback: "Wybitnie! Standard operacyjny w powikłanym diverticulitis: Pilna operacja jest bezwzględnie konieczna przy rozlanym zapaleniu otrzewnej (brzuch deskowaty, sepsa). W Hinchey IV (kał w brzuchu) operacją z wyboru o najwyższym profilu bezpieczeństwa jest OPERACJA HARTMANNA (wycięcie przedziurawionej esicy, zamknięcie kikuta odbytnicy i kolostomia końcowa jednolufowa). W Hinchey III u wybranych stabilnych chorych dopuszcza się resekcję z pierwotnym zespoleniem i ileostomią pętlową (ochronną) lub laparoskopowe płukanie otrzewnej."
          },
          {
            text: "Operacja jest wskazana u każdego człowieka z uchyłkami, nawet bez żadnych objawów.",
            correct: false,
            feedback: "Błąd: bezobjawowa uchyłkowatość (diverticulosis) nie wymaga żadnego leczenia operacyjnego."
          },
          {
            text: "Wskazaniem do operacji jest wyłącznie ból zęba.",
            correct: false,
            feedback: "Absurdalna opcja."
          },
          {
            text: "W kałowym zapaleniu otrzewnej wystarczy podać czopek z gliceryną.",
            correct: false,
            feedback: "Kałowe zapalenie otrzewnej bez operacji jest w 100% śmiertelne."
          }
        ]
      },
      {
        stepNum: 7,
        title: "Krok 7: Diagnostyka po wygojeniu – Konieczność weryfikacji kolonoskopowej po 6–8 tygodniach",
        desc: "Drenaż przezskórny i antybiotykoterapia przyniosły pełny sukces: ropień zniknął, parametry zapalne znormalizowały się, dren usunięto, a pacjentka w stanie bardzo dobrym opuszcza szpital. Jakie badanie diagnostyczne i kiedy ZALECA SIĘ wykonać po wypisie i dlaczego?",
        scenario: "Drenaż przezskórny i antybiotykoterapia przyniosły pełny sukces: ropień zniknął, parametry zapalne znormalizowały się, dren usunięto, a pacjentka w stanie bardzo dobrym opuszcza szpital. Jakie badanie diagnostyczne i kiedy ZALECA SIĘ wykonać po wypisie i dlaczego?",
        options: [
          {
            text: "KOLONOSKOPIA po upływie 6–8 TYGODNI od ustąpienia objawów ostrego zapalenia; badanie jest konieczne w celu wykluczenia RAKA OKRĘŻNICY (gruczolakoraka), który u 1–3% chorych może dawać identyczny obraz kliniczny i radiologiczny w TK (zwężenie światła, naciek ściany).",
            correct: true,
            feedback: "Znakomicie! Złota zasada onkologiczna: Po przebyciu powikłanego zapalenia uchyłków (szczególnie z ropniem, zwężeniem lub pogrubieniem ściany w TK) obowiązuje wykonanie planowej kolonoskopii po 6–8 tygodniach od wyzdrowienia. Rak jelita grubego (esicy) może perforować i tworzyć ropień okołojelitowy, dając w tomografii obraz nie do odróżnienia od łagodnego diverticulitis! Odroczenie kolonoskopii o 6-8 tygodni zapewnia bezpieczeństwo (ściana jelita zdążyła się wygoić i nie pęknie przy badaniu)."
          },
          {
            text: "Gastroskopia następnego dnia po wypisie w celu wykluczenia próchnicy zębów.",
            correct: false,
            feedback: "Gastroskopia ocenia żołądek, nie esicę."
          },
          {
            text: "Całkowity zakaz jakichkolwiek badań endoskopowych do końca życia.",
            correct: false,
            feedback: "Grozi przeoczeniem złośliwego nowotworu jelita grubego."
          },
          {
            text: "Tomografia komputerowa mózgu co 2 tygodnie przez 10 lat.",
            correct: false,
            feedback: "Brak jakichkolwiek wskazań."
          }
        ]
      },
      {
        stepNum: 8,
        title: "Krok 8: Profilaktyka nawrotów – Obalenie medycznego mitu 'orzechów i pestek'",
        desc: "Podczas wizyty kontrolnej pacjentka pyta o dietę: 'Panie Doktorze, czy to prawda, że już nigdy w życiu nie wolno mi zjeść ani jednego orzecha, nasionka słonecznika, truskawki ani pomidora z pestkami, bo wpadną do uchyłka i wywołają zapalenie?'. Co odpowiadasz pacjentce zgodnie z wynikami wielkich badań EBM?",
        scenario: "Podczas wizyty kontrolnej pacjentka pyta o dietę: 'Panie Doktorze, czy to prawda, że już nigdy w życiu nie wolno mi zjeść ani jednego orzecha, nasionka słonecznika, truskawki ani pomidora z pestkami, bo wpadną do uchyłka i wywołają zapalenie?'. Co odpowiadasz pacjentce zgodnie z wynikami wielkich badań EBM?",
        options: [
          {
            text: "Wyjaśniasz, że to PRZESTARZAŁY MIT MEDYCZNY obalony przez badania EBM; spożywanie orzechów, nasion, kukurydzy i pestek owoców NIE ZWIĘKSZA ryzyka zapalenia uchyłków ani krwawienia (a wręcz wiąże się z niższym ryzykiem!); zalecasz dietę bogatobłonnikową (błonnik rozpuszczalny i nierozpuszczalny >30 g/d), obfite nawodnienie, regularną aktywność fizyczną i redukcję masy ciała.",
            correct: true,
            feedback: "Wybitnie! Klasyczne pytanie z zaleceń dietetycznych i EBM na LEK: Przez dekady lekarze nakazywali pacjentom z uchyłkowatością unikanie orzechów, pestek pomidorów, truskawek, kukurydzy i nasion w obawie, że 'utkną w uchyłku'. Przełomowe prospektywne badanie Health Professionals Follow-up Study (HPFS, ponad 47 000 pacjentów) definitywnie obaliło ten mit! Spożywanie orzechów i nasion NIE zwiększa ryzyka zapalenia ani krwawienia z uchyłków. Prawdziwa profilaktyka opiera się na: diecie bogatoresztkowej (błonnik >30 g/dobę), piciu dużej ilości wody, aktywności fizycznej (przyspiesza pasaż i zapobiega zaparciom) oraz unikaniu otyłości i palenia tytoniu."
          },
          {
            text: "Potwierdzasz: zjedzenie jednego nasionka maku doprowadzi do natychmiastowej śmierci.",
            correct: false,
            feedback: "Nieprawda i nieuzasadnione ograniczanie wartościowych składników diety."
          },
          {
            text: "Zalecasz dietę złożoną wyłącznie ze smalcu i czystego cukru rafinowanego.",
            correct: false,
            feedback: "Dieta ubogoresztkowa sprzyja zaparciom i powstawaniu kolejnych uchyłków."
          },
          {
            text: "Zalecasz leżenie w łóżku przez 24 godziny na dobę.",
            correct: false,
            feedback: "Brak ruchu nasila zaparcia i pogarsza motorykę przewodu pokarmowego."
          }
        ]
      }
    ];
  });

  // ==========================================
  // CASE 135: Krwawienie z dolnego odcinka przewodu pokarmowego (LGIB)
  // ==========================================
  await upgradeCase('135_krwawienie_dolny_odcinek_lgib.json', (c) => {
    c.steps = [
      {
        stepNum: 1,
        title: "Krok 1: Wstępna ocena na SOR – 68-letni mężczyzna z obfitym krwawieniem z odbytu",
        desc: "Dyżurujesz na chirurgicznym SOR. Zespół ratownictwa przywozi 68-letniego mężczyznę. Godzinę temu, podczas porannego oddawania stolca, pacjent nagle oddał do muszli klozetowej około 500–800 ml ciemnoczerwonej krwi ze skrzepami (hematochezia), po czym doznał zasłabnięcia (epizod presyncope) i upadł na podłogę łazienki. Nie odczuwał wcześniejszego bólu brzucha. W wywiadzie: nadciśnienie tętnicze, choroba niedokrwienna serca leczona aspiryną (ASA 75 mg/d), stwierdzona w przeszłości uchyłkowatość jelita grubego. W badaniu przedmiotowym: HR 115/min (tachykardia), RR 92/58 mmHg (hipotonia ortostatyczna), skóra blada, chłodna, spocona. Brzuch miękki, całkowicie niebolesny, bez objawów otrzewnowych. W badaniu per rectum (PR): na rękawicy obecna duża ilość świeżej, ciemnoczerwonej krwi ze skrzepami. Jaka jest Twoja wstępna diagnoza?",
        scenario: "Dyżurujesz na chirurgicznym SOR. Zgłasza się 68-letni mężczyzna przywieziony przez pogotowie z powodu obfitego krwawienia z odbytu. Godzinę temu nagle oddał do muszli klozetowej około 500–800 ml ciemnoczerwonej krwi ze skrzepami (hematochezia), po czym doznał zasłabnięcia. W wywiadzie: uchyłkowatość, aspiryna. W badaniu: HR 115/min, RR 92/58 mmHg, brzuch miękki, niebolesny, w badaniu per rectum świeża krew ze skrzepami. Jaka jest Twoja wstępna diagnoza?",
        options: [
          {
            text: "Rozpoznajesz ostre masywne krwawienie z dolnego odcinka przewodu pokarmowego (Lower Gastrointestinal Bleeding - LGIB) najpewniej z uchyłków okrężnicy u pacjenta niestabilnego hemodynamicznie; stan nagłego zagrożenia życia wstrząsem hipowolemicznym.",
            correct: true,
            feedback: "Znakomicie! Klasyczny obraz masywnego krwawienia z dolnego odcinka przewodu pokarmowego (LGIB): Krwawienie z uchyłków okrężnicy jest NAJCZĘSTSZĄ przyczyną masywnego LGIB u dorosłych (odpowiada za >30–50% wszystkich przypadków). Cechuje się: nagłym początkiem, bezbolesnym oddaniem dużej ilości świeżej lub ciemnoczerwonej krwi ze skrzepami (hematochezja) oraz niestabilnością hemodynamiczną (hipotonia, tachykardia). Wynika z erozji i pęknięcia tętniczki prostej (vasa recta) w szyjce uchyłka. Stosowanie NLPZ lub aspiryny jest głównym czynnikiem wyzwalającym."
          },
          {
            text: "Rozpoznajesz krwawienie z guzków krwawniczych (hemoroidów) I stopnia i wypisujesz pacjenta z maścią doodbytniczą.",
            correct: false,
            feedback: "Kardynalny błąd śmiertelny! Krwawienie ze wstrząsem hipowolemicznym (RR 92/58, HR 115) i utratą 800 ml krwi nigdy nie jest zwykłym krwawieniem z hemoroidów."
          },
          {
            text: "Stawiasz rozpoznanie ostrego zapalenia pęcherzyka żółciowego.",
            correct: false,
            feedback: "Brak związku: pacjent ma krwawienie z odbytu, nie ból pod prawym żebrem."
          },
          {
            text: "Uznajesz, że krew to sok z buraków i odsyłasz pacjenta do domu.",
            correct: false,
            feedback: "Obecność skrzepów i hipotonia dowodzą masywnego krwawienia zagrażającego zgonem."
          }
        ]
      },
      {
        stepNum: 2,
        title: "Krok 2: Resuscytacja hemodynamiczna (ABCDE) – Dostęp naczyniowy i płynoterapia",
        desc: "Pacjent ma tachykardię 115/min i ciśnienie 92/58 mmHg. Jakie natychmiastowe działania resuscytacji krążeniowej wdrażasz w pierwszych minutach na SOR?",
        scenario: "Pacjent ma tachykardię 115/min i ciśnienie 92/58 mmHg. Jakie natychmiastowe działania resuscytacji krążeniowej wdrażasz w pierwszych minutach na SOR?",
        options: [
          {
            text: "Założenie dwóch obwodowych kaniul dożylnych dużej średnicy (14G lub 16G), natychmiastowy wlew zbilansowanych krystaloidów (np. Plasmalyte / Ringer 1000–1500 ml), pobranie krwi na grupę krwi i próbę krzyżową (zamówienie 4 jednostek KKCz), morfologię, koagulogram i gazometrię oraz monitorowanie parametrów życiowych i diurezy (cewnik Foleya).",
            correct: true,
            feedback: "Doskonale! Złota zasada postępowania w krwawieniu z przewodu pokarmowego: STABILIZACJA HEMODYNAMICZNA ZAWSZE WYPRZEDZA DIAGNOSTYKĘ ENDOSKOPOWĄ! Pacjent z krwawieniem nie może trafić do pracowni endoskopowej ani na tomografię we wstrząsie. Podstawą jest agresywna płynoterapia przez grube wenflony (14G pomarańczowy, 16G szary) i natychmiastowe zabezpieczenie krwi do transfuzji."
          },
          {
            text: "Czekasz 3 godziny na wynik badania kału na obecność pasożytów bez zakładania wkłucia.",
            correct: false,
            feedback: "Pacjent wykrwawi się na śmierć w poczekalni SOR."
          },
          {
            text: "Podajesz 10 jednostek insuliny dożylnie.",
            correct: false,
            feedback: "Insulina wywoła śmiertelną hipoglikemię."
          },
          {
            text: "Wlewasz dożylnie 10 litrów czystej wody destylowanej.",
            correct: false,
            feedback: "Spowoduje to masywną hemolizę i zgon."
          }
        ]
      },
      {
        stepNum: 3,
        title: "Krok 3: Kluczowe różnicowanie – Wykluczenie krwawienia z GÓRNEGO odcinka (UGIB)",
        desc: "U ok. 10–15% pacjentów z masywną hematochezją (świeżą krwią z odbytu) i niestabilnością hemodynamiczną źródło krwawienia znajduje się w GÓRNYM odcinku przewodu pokarmowego (np. masywnie krwawiący wrzód opuszki dwunastnicy z gwałtownym pasażem krwi). Jakie szybkie procedury przyłóżkowe pozwalają wykluczyć UGIB?",
        scenario: "U ok. 10–15% pacjentów z masywną hematochezją (świeżą krwią z odbytu) i niestabilnością hemodynamiczną źródło krwawienia znajduje się w GÓRNYM odcinku przewodu pokarmowego (np. masywnie krwawiący wrzód opuszki dwunastnicy z gwałtownym pasażem krwi). Jakie szybkie procedury przyłóżkowe pozwalają wykluczyć UGIB?",
        options: [
          {
            text: "1) Założenie zgłębnika nosowo-żołądkowego i aspiracja treści żołądkowej (obecność krwi/fusów potwierdza UGIB; treść żółciowa bez krwi silnie przemawia przeciwko UGIB); 2) Ocena stosunku mocznika do kreatyniny (w UGIB wskaźnik BUN/Cr jest wybitnie podwyższony >30 z powodu trawienia i wchłaniania białek krwi w jelicie); 3) W razie wątpliwości – PILNA GASTROSKOPIA przed kolonoskopią!",
            correct: true,
            feedback: "Znakomicie! Kluczowa reguła różnicowania krwawień na LEK: Masywna hematochezja (świeża krew z odbytu) u niestabilnego pacjenta może być objawem piorunującego krwawienia z wrzodu dwunastnicy (krew działa przeczyszczająco i przelatuje przez jelita w kilkadziesiąt minut bez czasu na wytworzenie smolistego stolca!). Wskaźnik BUN/kreatynina (mocznik/kreatynina): w krwawieniu z górnego odcinka ulega podwojeniu z powodu trawienia hemoglobiny ('posiłek białkowy'). Gastroskopia jest badaniem szybszym i łatwiejszym do wykonania bez wcześniejszego przygotowania jelita."
          },
          {
            text: "Wykonanie rezonansu magnetycznego kolana.",
            correct: false,
            feedback: "Brak jakiegokolwiek związku."
          },
          {
            text: "Podanie pacjentowi papki barytowej do żołądka.",
            correct: false,
            feedback: "Kardynalny błąd: uniemożliwi jakąkolwiek późniejszą endoskopię i angiografię!"
          },
          {
            text: "Świeża krew z odbytu w 100% gwarantuje, że żołądek jest zdrowy.",
            correct: false,
            feedback: "Fałsz: aż 10-15% hematochezji ze wstrząsem to krwotoki z żołądka lub dwunastnicy."
          }
        ]
      },
      {
        stepNum: 4,
        title: "Krok 4: Postępowanie diagnostyczne u pacjenta stabilnego vs niestabilnego",
        desc: "Zgłębnik żołądkowy zaaspirował czystą treść żółciową (wykluczono UGIB). Po wlewie 1500 ml krystaloidów i 2 jednostek KKCz ciśnienie pacjenta ustabilizowało się na poziomie 120/75 mmHg, a tętno wynosi 82/min. Jakie badanie diagnostyczne pierwszego rzutu należy zaplanować po wstępnej stabilizacji chorego wg wytycznych ESGE?",
        scenario: "Zgłębnik żołądkowy zaaspirował czystą treść żółciową (wykluczono UGIB). Po wlewie 1500 ml krystaloidów i 2 jednostek KKCz ciśnienie pacjenta ustabilizowało się na poziomie 120/75 mmHg, a tętno wynosi 82/min. Jakie badanie diagnostyczne pierwszego rzutu należy zaplanować po wstępnej stabilizacji chorego wg wytycznych ESGE?",
        options: [
          {
            text: "KOLONOSKOPIA po szybkim przygotowaniu jelita roztworem polietylenoglikolu (PEG – 4 litry w ciągu 3–4h przez sondę lub doustnie); pozwala na lokalizację źródła krwawienia i wykonanie hemostazy endoskopowej (klipsy hemostatyczne, opaskowanie, koagulacja).",
            correct: true,
            feedback: "Prawidłowo! Wytyczne ESGE/ACG w krwawieniach z dolnego odcinka przewodu pokarmowego: U pacjenta ustabilizowanego hemodynamicznie badaniem z wyboru jest wczesna kolonoskopia (w ciągu pierwszych 24h). Warunkiem koniecznym jest dobre przygotowanie jelita (wypłukanie skrzepów i resztek stolca za pomocą PEG), ponieważ próba kolonoskopii w jelicie zalanym skrzepami nie pozwala na uwidocznienie krwawiącego uchyłka i niesie wysokie ryzyko powikłań. W trakcie kolonoskopii krwawiący uchyłek zaopatruje się klipsami mechanicznymi (hemostatic clips / hemostaza mechaniczna) lub opaskowaniem (endoscopic band ligation)."
          },
          {
            text: "Kolonoskopia bez żadnego przygotowania na 'brudnym' jelicie w pierwszej minucie.",
            correct: false,
            feedback: "Błąd: widoczność w nieprzygotowanym jelicie ze skrzepami wynosi 0%, a ryzyko perforacji jest wysokie."
          },
          {
            text: "Wypisanie pacjenta do domu, ponieważ ciśnienie wróciło do normy.",
            correct: false,
            feedback: "Krwawienie z uchyłków ma charakter nawrotowy i grozi ponownym krwotokiem w domu."
          },
          {
            text: "Pilna laparotomia z usunięciem całej wątroby.",
            correct: false,
            feedback: "Niedorzeczne."
          }
        ]
      },
      {
        stepNum: 5,
        title: "Krok 5: Postępowanie w krwawieniu masywnym, niestabilnym – Rola Angio-TK i Arteriografii z embolizacją",
        desc: "Co należy zrobić, jeśli mimo przetaczania płynów i krwi pacjent nadal masywnie krwawi z odbytu, pozostaje niestabilny hemodynamicznie (RR 80/50 mmHg) i nie ma czasu na 4-godzinne przygotowanie jelita do kolonoskopii? Jaka procedura interwencyjna jest metodą z wyboru?",
        scenario: "Co należy zrobić, jeśli mimo przetaczania płynów i krwi pacjent nadal masywnie krwawi z odbytu, pozostaje niestabilny hemodynamicznie (RR 80/50 mmHg) i nie ma czasu na 4-godzinne przygotowanie jelita do kolonoskopii? Jaka procedura interwencyjna jest metodą z wyboru?",
        options: [
          {
            text: "ANGIO-TK jamy brzusznej (wykrywa aktywne krwawienie o tempie >=0.3–0.5 ml/min), a następnie natychmiastowa SELEKTYWNA ANGIOGRAFIA TRANSCATHETER Z EMBOLIZACJĄ (TAE) krwawiącego naczynia mikrosprężynami (coils) lub cząstkami želatynowymi w pracowni radiologii zabiegowej.",
            correct: true,
            feedback: "Doskonale! Złoty standard ratunkowy w masywnym niestabilnym LGIB: Jeśli krwotok jest zbyt gwałtowny na kolonoskopię, wykonuje się natychmiastowe Angio-TK (wykrywa wynaczynienie kontrastu do światła jelita - 'extravasation' / 'blush'). Pacjent trafia prosto na stół angiograficzny: radiolog interwencyjny kaniuluje tętnicę krezkową dolną (IMA) lub górną (SMA), wprowadza mikrokateter bezpośrednio do gałązki zaopatrującej krwawiący uchyłek i zamyka naczynie sprężynkami naczyniowymi (superselective coil embolization). Skuteczność hemostazy wynosi >85-90% bez konieczności otwierania brzucha!"
          },
          {
            text: "Podanie dożylnie 500 mg witaminy C i oczekiwanie na cud.",
            correct: false,
            feedback: "Brak skuteczności, chory umrze we wstrząsie krwotocznym."
          },
          {
            text: "Zalecenie picia wrzącej wody z solą.",
            correct: false,
            feedback: "Niedorzeczne i szkodliwe."
          },
          {
            text: "Założenie opaski uciskowej Esmarcha na szyję pacjenta.",
            correct: false,
            feedback: "Śmiertelne uduszenie chorego."
          }
        ]
      },
      {
        stepNum: 6,
        title: "Krok 6: Wskazania do leczenia operacyjnego w krwawieniu z dolnego odcinka",
        desc: "Kiedy masywne krwawienie z dolnego odcinka przewodu pokarmowego wymaga ratunkowego leczenia chirurgicznego (laparotomii)?",
        scenario: "Kiedy masywne krwawienie z dolnego odcinka przewodu pokarmowego wymaga ratunkowego leczenia chirurgicznego (laparotomii)?",
        options: [
          {
            text: "Wskazania do operacji: 1) Utrzymująca się niestabilność hemodynamiczna mimo agresywnej resuscytacji; 2) Niepowodzenie lub niedostępność hemostazy endoskopowej i embolizacji angiograficznej; 3) Masywne krwawienie nawrotowe wymagające przetoczenia >4–6 jednostek KKCz w ciągu 24 godzin.",
            correct: true,
            feedback: "Znakomicie! Wskazania do pilnej interwencji chirurgicznej w LGIB: Dzięki rozwojowi kolonoskopii i radiologii zabiegowej (embolizacji) obecnie mniej niż 5–10% pacjentów z LGIB wymaga leczenia operacyjnego. Wskazaniem do pilnej laparotomii jest krwotok nie do opanowania metodami małoinwazyjnymi lub masywne zapotrzebowanie na krew (>6 jednostek KKCz/dobę) zagrażające zgonem chorego."
          },
          {
            text: "Każde krwawienie z obecnością choćby jednej kropli krwi w stolcu musi być natychmiast operowane.",
            correct: false,
            feedback: "Większość krwawień z uchyłków (ponad 80%) ustępuje samoistnie bez żadnej operacji."
          },
          {
            text: "Chirurgia w krwawieniach jest bezwzględnie zakazana przez prawo unijne.",
            correct: false,
            feedback: "Operacja ratunkowa jest procedurą ostateczną ratującą życie."
          },
          {
            text: "Wskazaniem jest wyłącznie płeć męska pacjenta.",
            correct: false,
            feedback: "Płeć nie decyduje o wskazaniach operacyjnych."
          }
        ]
      },
      {
        stepNum: 7,
        title: "Krok 7: Wybór metody operacyjnej – Kolektomia odcinkowa vs Kolektomia subtotalna",
        desc: "Chirurg musi podjąć decyzję o zakresie resekcji jelita u pacjenta kwalifikowanego do pilnej operacji. Jaka jest fundamentalna różnica w postępowaniu, gdy miejsce krwawienia zostało wcześniej zlokalizowane (np. w angio-TK) w porównaniu z sytuacją, gdy źródło krwawienia jest nieznane?",
        scenario: "Chirurg musi podjąć decyzję o zakresie resekcji jelita u pacjenta kwalifikowanego do pilnej operacji. Jaka jest fundamentalna różnica w postępowaniu, gdy miejsce krwawienia zostało wcześniej zlokalizowane (np. w angio-TK) w porównaniu z sytuacją, gdy źródło krwawienia jest nieznane?",
        options: [
          {
            text: "Gdy źródło jest ZLOKALIZOWANE (np. uchyłek w esicy) – wykonuje się bezpieczną ODCINKOWĄ RESEKCJĘ (segmental colectomy / sigmoidektomię); gdy źródło jest NIEZNANE (krwawienie z całego jelita bez lokalizacji) – metodą z wyboru ratującą życie jest KOLEKTOMIA SUBTOTALNA (usunięcie całej okrężnicy z zespoleniem krętniczo-odbytniczym); 'ślepe' resekcje odcinkowe są ZAKAZANE z powodu śmiertelności >30% i ryzyka ponownego krwawienia!",
            correct: true,
            feedback: "Wybitnie! Klasyczna reguła chirurgiczna LEK: 1) Precyzyjnie zlokalizowane krwawienie: wykonuje się resekcję celowaną (np. hemikolektomię prawą lub lewą) o niskiej śmiertelności. 2) Źródło nieustalone (nieznane): próba wykonania 'ślepej' resekcji odcinkowej (ang. blind segmental resection – wycięcie na chybił-trafił) wiąże się z 50% ryzykiem błędu, nawrotem krwotoku i śmiertelnością >30-40%! W takich dramatycznych sytuacjach jedynym prawidłowym postępowaniem jest kolektomia subtotalna (subtotal colectomy: usunięcie całej okrężnicy od kątnicy do esicy i zespolenie jelita krętego z odbytnicą)."
          },
          {
            text: "Gdy źródło jest nieznane, wycina się tylko wyrostek robaczkowy.",
            correct: false,
            feedback: "Wycięcie wyrostka nie zatrzyma krwotoku z uchyłków okrężnicy."
          },
          {
            text: "Wycina się cały żołądek i dwunastnicę.",
            correct: false,
            feedback: "Krwawienie dotyczy dolnego odcinka przewodu pokarmowego."
          },
          {
            text: "Zakłada się klamrę na przełyk.",
            correct: false,
            feedback: "Niedorzeczne."
          }
        ]
      },
      {
        stepNum: 8,
        title: "Krok 8: Naturalny przebieg i modyfikacja leków przeciwpłytkowych/przeciwkrzepliwych",
        desc: "Krwawienie u pacjenta ustąpiło po udanej embolizacji angiograficznej naczynia uchyłkowego. W kolejnych dobach stolec prawidłowy, morfologia stabilna. Pacjent pyta o przyjmowaną dotychczas aspirynę (ASA 75 mg/d). Jakie są zasady postępowania z lekami przeciwpłytkowymi i przeciwkrzepliwymi po krwawieniu z uchyłków?",
        scenario: "Krwawienie u pacjenta ustąpiło po udanej embolizacji angiograficznej naczynia uchyłkowego. W kolejnych dobach stolec prawidłowy, morfologia stabilna. Pacjent pyta o przyjmowaną dotychczas aspirynę (ASA 75 mg/d). Jakie są zasady postępowania z lekami przeciwpłytkowymi i przeciwkrzepliwymi po krwawieniu z uchyłków?",
        options: [
          {
            text: "NLPZ należy bezwzględnie odstawić na stałe; aspiryna (ASA) stosowana w profilaktyce PIERWOTNEJ chorób serca powinna zostać trwale odstawiona; jeśli ASA jest stosowana w profilaktyce WTÓRNEJ (np. po zawale serca lub stencie wieńcowym), należy ją wznowić możliwie szybko (w ciągu 3–5 dni od ustąpienia krwawienia), ponieważ korzyści sercowo-naczyniowe przewyższają ryzyko nawrotu krwawienia.",
            correct: true,
            feedback: "Doskonale! Wytyczne kardiologiczno-gastroenterologiczne (ESGE/ESC): 1) Klasyczne NLPZ (ketoprofen, ibuprofen, diklofenak) drastycznie zwiększają ryzyko ponownego krwawienia z uchyłków i powinny być trwale odstawione. 2) Kwas acetylosalicylowy (aspiryna): jeśli pacjent brał ASA 'profilaktycznie bez przebytego incydentu' (prewencja pierwotna) – lek odstawia się na stałe. Jeśli jednak chory ma stent w tętnicy wieńcowej lub przebył zawał (prewencja wtórna) – odstawienie ASA grozi śmiertelną zakrzepicą w stencie i zawałem! ASA wznawia się w najniższej dawce natychmiast po uzyskaniu hemostazy (zwykle w ciągu 3-5 dni)."
          },
          {
            text: "Zalecasz potrojenie dawki aspiryny do 1000 mg na dobę.",
            correct: false,
            feedback: "Zwiększenie dawki wywoła natychmiastowy nawrót krwotoku."
          },
          {
            text: "Krwawienie z uchyłków nigdy nie ma związku z lekami.",
            correct: false,
            feedback: "NLPZ i aspiryna to jedne z głównych czynników wyzwalających krwawienie z uchyłków."
          },
          {
            text: "Pacjent musi otrzymywać dożylną heparynę bezterminowo przez 20 lat.",
            correct: false,
            feedback: "Nieuzasadnione i niebezpieczne."
          }
        ]
      }
    ];
  });

  // ==========================================
  // CASE 136: Ropień i przetoka odbytu
  // ==========================================
  await upgradeCase('136_ropien_i_przetoka_odbytu.json', (c) => {
    c.steps = [
      {
        stepNum: 1,
        title: "Krok 1: Wstępna ocena w gabinecie proktologicznym/SOR – 42-letni mężczyzna z ostrym bólem odbytu",
        desc: "Do Twojego gabinetu chirurgicznego zgłasza się 42-letni mężczyzna. Od 3 dni odczuwa stale narastający, silny, pulsujący, rozpierający ból w okolicy odbytu i krocza. Ból stał się tak dotkliwy, że pacjent nie może usiąść na krześle (stoi lub opiera się na jednym pośladku), odczuwa potworny ból przy chodzeniu, a próba oddania stolca wywołuje krzyk. Od wczoraj dołączyły dreszcze i gorączka do 38.4°C. Lekarz POz 2 dni temu zapisał pacjentowi czopki na hemoroidy, które nie przyniosły żadnej ulgi. W badaniu ogólnym: HR 98/min, temp. 38.3°C. Jaka jest Twoja natychmiastowa diagnoza kliniczna?",
        scenario: "Do Twojego gabinetu chirurgicznego zgłasza się 42-letni mężczyzna. Od 3 dni odczuwa stale narastający, silny, pulsujący, rozpierający ból w okolicy odbytu i krocza. Ból stał się tak dotkliwy, że pacjent nie może usiąść na krześle, odczuwa ból przy chodzeniu, ma gorączkę 38.4°C. Czopki na hemoroidy nie pomogły. Jaka jest Twoja natychmiastowa diagnoza kliniczna?",
        options: [
          {
            text: "Rozpoznajesz ropień okołoodbytowy (Abscessus perianalis); ostry proces ropny w przestrzeniach tkankowych wokół kanału odbytu; pulsujący ból uniemożliwiający siadanie połączony z gorączką jest typowym obrazem ropnia i wymaga natychmiastowej oceny proktologicznej.",
            correct: true,
            feedback: "Znakomicie! Klasyczny początek ropnia okołoodbytowego: pulsujący, narastający ból okolicy odbytu nasilający się przy siadaniu, kaszlu i defekacji, połączony z gorączką. Błędem jatrogennym w POZ jest nagminne mylenie ropnia z chorobą hemoroidalną i zapisywanie maści lub czopków przeciwhemoroidalnych, co odwleka właściwe leczenie zabiegowe i grozi szerzeniem się zakażenia na dół kulszowo-odbytniczy, a nawet martwiczym zapaleniem powięzi krocza (zgorzelą Fourniera)!"
          },
          {
            text: "Rozpoznajesz chorobę hemoroidalną IV stopnia i zalecasz ciepłe nasiadówki z kory dębu.",
            correct: false,
            feedback: "Kardynalny błąd! Ciepłe nasiadówki przy ropniu nasilają obrzęk i rozprzestrzeniają proces ropny!"
          },
          {
            text: "Stawiasz rozpoznanie pęknięcia tętniaka aorty brzusznej.",
            correct: false,
            feedback: "Brak związku: objawy są ściśle zlokalizowane w kanale odbytu i kroczu."
          },
          {
            text: "Podejrzewasz rzekome bóle fantomowe.",
            correct: false,
            feedback: "Pacjent ma realny, ostry proces zapalny bakteryjny krocza."
          }
        ]
      },
      {
        stepNum: 2,
        title: "Krok 2: Badanie proktologiczne – Oglądanie i badanie per rectum (PR)",
        desc: "Układasz pacjenta w pozycji leżącej na lewym boku z podgiętymi nogami (pozycja Sims) i delikatnie rozchylasz pośladki. Jaki obraz w badaniu miejscowym i per rectum potwierdza ropień okołoodbytowy?",
        scenario: "Układasz pacjenta w pozycji leżącej na lewym boku z podgiętymi nogami (pozycja Sims) i delikatnie rozchylasz pośladki. Jaki obraz w badaniu miejscowym i per rectum potwierdza ropień okołoodbytowy?",
        options: [
          {
            text: "W odległości 2–3 cm od brzegu odbytu widoczne jest żywoczerwone, ucieplone, asymetryczne uwypuklenie skóry o średnicy 4 cm, skrajnie bolesne, z wyczuwalnym chełbotaniem pod palcem (fluctuatio); w badaniu per rectum (wykonywanym bardzo delikatnie) napięty, bolesny naciek w dolnym odcinku kanału odbytu.",
            correct: true,
            feedback: "Doskonale! Klasyczne objawy miejscowe ropnia okołoodbytowego (rubor, calor, dolor, tumor, functio laesa): skóra nad ropniem jest napięta, żywoczerwona, lśniąca, a w centrum wyczuwalne jest chełbotanie (objaw obecności płynnej treści ropnej pod ciśnieniem). Badanie per rectum potwierdza kierunek penetracji nacieku zapalnego w ścianie kanału odbytu."
          },
          {
            text: "Całkowicie blada, wiotka skóra bez jakichkolwiek uwypukleń.",
            correct: false,
            feedback: "Ropień daje wyraźny zapalny guz z chełbotaniem."
          },
          {
            text: "Obecność prawidłowej śluzówki jamy ustnej w odbycie.",
            correct: false,
            feedback: "Absurdalna opcja."
          },
          {
            text: "Wypadanie całej wątroby przez odbyt.",
            correct: false,
            feedback: "Anatomicznie niemożliwe."
          }
        ]
      },
      {
        stepNum: 3,
        title: "Krok 3: Patogeneza ropni odbytu – Teoria kryptoglandularna Parksa",
        desc: "Jaka jest pierwotna przyczyna powstawania ropni i przetok odbytu wg powszechnie uznanej teorii kryptoglandularnej Parksa?",
        scenario: "Jaka jest pierwotna przyczyna powstawania ropni i przetok odbytu wg powszechnie uznanej teorii kryptoglandularnej Parksa?",
        options: [
          {
            text: "Zakażenie i zablokowanie gruczołów odbytowych (gruczołów Chiari-Hermanna) uchodzących do krypt Morgagniego na linii grzebieniastej (dentate line); proces zapalny rozpoczyna się w przestrzeni międzyzwieraczowej i rozprzestrzenia wzdłuż powięzi miednicy, tworząc ropnie w różnych przestrzeniach anatomicznych.",
            correct: true,
            feedback: "Znakomicie! Klasyczna patofizjologia proktologiczna Parksa (pewniak LEK): Gruczoły odbytowe (około 6–10 gruczołów) leżą w przestrzeni międzyzwieraczowej (między zwieraczem wewnętrznym a zewnętrznym), a ich przewody uchodzą do krypt odbytniczych (krypt Morgagniego) na linii grzebieniastej. Zatkanie ujścia krypty masami kałowymi lub obrzękiem powoduje zastój wydzieliny, zakażenie bakteryjne florą jelitową i powstanie ropnia międzyzwieraczowego, który następnie toruje sobie drogę w dół ku skórze (ropień okołoodbytowy), w bok (ropień kulszowo-odbytniczy) lub w górę (ropień naddźwigaczowy)."
          },
          {
            text: "Zakażenie wirusem grypy przenoszone drogą kropelkową do odbytu.",
            correct: false,
            feedback: "Grypa nie wywołuje ropni kryptoglandularnych."
          },
          {
            text: "Samoistne pęknięcie tętnicy krezkowej dolnej.",
            correct: false,
            feedback: "Brak związku."
          },
          {
            text: "Ugryzienie przez pająka w okolicę pośladka.",
            correct: false,
            feedback: "Ropnie okołoodbytowe wywodzą się z krypt odbytowych, nie z ukąszeń owadów."
          }
        ]
      },
      {
        stepNum: 4,
        title: "Krok 4: Kategoryczny błąd w sztuce – 'Leczenie ropnia wyłącznie antybiotykami'",
        desc: "Pacjent pyta, czy nie można po prostu przepisać silnego antybiotyku w tabletkach lub maści, aby 'rozgonić ropień bez nacinania'. Jakie jest oficjalne i jednoznaczne stanowisko chirurgiczne w tej sprawie?",
        scenario: "Pacjent pyta, czy nie można po prostu przepisać silnego antybiotyku w tabletkach lub maści, aby 'rozgonić ropień bez nacinania'. Jakie jest oficjalne i jednoznaczne stanowisko chirurgiczne w tej sprawie?",
        options: [
          {
            text: "Leczenie ropnia samymi antybiotykami jest BŁĘDEM W SZTUCE! Ropień jest grubościennym zbiornikiem martwicy i ropy pozbawionym unaczynienia – antybiotyki nie penetrują do wnętrza ropnia; JEDYNYM skutecznym i bezwzględnie wymaganym leczeniem jest PILNE NACIĘCIE I DRENAŻ CHIRURGICZNY (Ubi pus, ibi evacua)!",
            correct: true,
            feedback: "Wybitnie! Stara rzymska maksyma chirurgiczna: 'Ubi pus, ibi evacua' (Gdzie ropa, tam opróżnij!). Antybiotyki podane bez nacięcia ropnia nie są w stanie osiągnąć stężenia terapeutycznego w beznaczyniowej jamie ropnej. Odwlekanie drenażu prowadzi do destrukcji zwieraczy odbytu, wytworzenia skomplikowanych przetok podkowiastych oraz grozi zgorzelą Fourniera (martwiczym zakażeniem krocza o śmiertelności >30%). Antybiotyki stosuje się wyłącznie jako leczenie wspomagające u chorych z sepsą, cukrzycą, immunosupresją lub sztucznymi zastawkami serca."
          },
          {
            text: "Zgadzasz się i przepisujesz doustną ampicylinę na 6 miesięcy bez zabiegu.",
            correct: false,
            feedback: "Kardynalny błąd w sztuce lekarskiej: ropień powiększy się i doprowadzi do sepsy."
          },
          {
            text: "Zalecasz okłady z surowego mięsa wołowego.",
            correct: false,
            feedback: "Szkodliwe zabobony niosące ryzyko zakażenia tężcem i zgorzelą gazową."
          },
          {
            text: "Nakazujesz pacjentowi siedzenie na gorącym kaloryferze.",
            correct: false,
            feedback: "Poparzenie tkanek krocza."
          }
        ]
      },
      {
        stepNum: 5,
        title: "Krok 5: Technika zabiegu operacyjnego – Nacięcie i drenaż ropnia",
        desc: "Pacjent zostaje znieczulony (znieczulenie miejscowe nasiękowe lub krótkie dożylne/przewodowe). Jakie zasady techniki chirurgicznej obowiązują przy nacinaniu ropnia okołoodbytowego?",
        scenario: "Pacjent zostaje znieczulony. Jakie zasady techniki chirurgicznej obowiązują przy nacinaniu ropnia okołoodbytowego?",
        options: [
          {
            text: "Cięcie w miejscu największego chełbotania możliwie BLISKO brzegu odbytu (aby skrócić ewentualny kanał przyszłej przetoki), wycięcie eliptycznego rąbka skóry (deroofing / odkrojenie brzegów) w celu zapobieżenia przedwczesnemu zamknięciu rany, ewakuacja ropy, zerwanie przegród palcem lub kleszczykami, obfite płukanie solą fizjologiczną i gojenie na otwarto (bez szwów!).",
            correct: true,
            feedback: "Doskonale! Zasady drenażu ropnia okołoodbytowego: 1) Cięcie wykonuje się możliwie blisko brzegu odbytu (jeśli powstanie przetoka, jej kanał będzie krótki, co ułatwi późniejsze leczenie); 2) Samo pojedyncze nacięcie skalpelem często skleja się po 24h – dlatego zaleca się wycięcie owalnego fragmentu skóry ('okienkowanie' rany) lub cięcie krzyżowe; 3) Rozbicie przegród włóknistych w jamie ropnia; 4) Zakaz zszywania rany – rana musi ziarninować od dna (healing by secondary intention)!"
          },
          {
            text: "Szczelne zaszycie rany szwami jedwabnymi z podaniem kleju.",
            correct: false,
            feedback: "Błąd śmiertelny: zamknięcie rany ropnej spowoduje natychmiastowy nawrót ropnia pod ciśnieniem."
          },
          {
            text: "Całkowite wycięcie odbytu z usunięciem zwieraczy w znieczuleniu miejscowym.",
            correct: false,
            feedback: "Okaleczenie chorego powodujące całkowite nietrzymanie stolca do końca życia."
          },
          {
            text: "Wstrzyknięcie cementu kostnego do jamy ropnia.",
            correct: false,
            feedback: "Niedorzeczne."
          }
        ]
      },
      {
        stepNum: 6,
        title: "Krok 6: Przejście ropnia w chorobę przewlekłą – PRZETOKA ODBYTU (Fistula perianalis)",
        desc: "Ropień został prawidłowo nacięty, ból natychmiast ustąpił. Po 6 tygodniach pacjent zgłasza się ponownie: w miejscu nacięcia powstał mały otworek, z którego stale sączy się surowiczo-ropna treść brudząca bieliznę, a w badaniu wyczuwasz podskórny, stwardniały sznur ciągnący się ku brzegowi odbytu. Co rozwinęło się u pacjenta i jak często to powikłanie występuje po nacięciu ropnia?",
        scenario: "Ropień został prawidłowo nacięty, ból natychmiast ustąpił. Po 6 tygodniach pacjent zgłasza się ponownie: w miejscu nacięcia powstał mały otworek, z którego stale sączy się surowiczo-ropna treść brudząca bieliznę, a w badaniu wyczuwasz podskórny sznur. Co rozwinęło się u pacjenta?",
        options: [
          {
            text: "Rozwinęła się PRZETOKA ODBYTU (Fistula perianalis); występuje u 30–50% pacjentów po przebyciu i drenażu ropnia okołoodbytowego; jest to przewlekły, wyścielony ziarniną kanał łączący ujście pierwotne w krypcie odbytowej (ujście wewnętrzne) z ujściem zewnętrznym na skórze krocza.",
            correct: true,
            feedback: "Znakomicie! Zależność ropień-przetoka (żelazny pewniak LEK): Ropień i przetoka odbytu to dwie fazy TEJ SAMEJ jednostki chorobowej! Ropień to faza ostra, a przetoka to faza przewlekła. U 30–50% chorych po nacięciu ropnia nie dochodzi do zarośnięcia kanału zakażonej krypty – powstaje trwała przetoka odbytu (fistula perianalis) z ujściem wewnętrznym (na linii grzebieniastej w krypcie) i zewnętrznym (na skórze). Objawia się przewlekłym wyciekiem treści ropnej i nawracającymi zaostrzeniami bólowymi."
          },
          {
            text: "Rozwinął się rak płaskonabłonkowy języka z przerzutem do krocza.",
            correct: false,
            feedback: "Brak związku onkologicznego."
          },
          {
            text: "Jest to prawidłowy, fizjologiczny stan odbytu u każdego dorosłego mężczyzny.",
            correct: false,
            feedback: "Sączenie ropy z przetoki jest stanem patologicznym wymagającym leczenia proktologicznego."
          },
          {
            text: "Pacjent ma wrodzoną przetokę pępkową.",
            correct: false,
            feedback: "Przetoka znajduje się w okolicy krocza i odbytu, nie w pępku."
          }
        ]
      },
      {
        stepNum: 7,
        title: "Krok 7: Złota zasada topograficzna przetok – REGUŁA GOODSALLA",
        desc: "Przystępujesz do oceny przebiegu kanału przetoki u tego pacjenta. Jaka słynna reguła anatomiczna (Goodsall's rule) pozwala przewidzieć przebieg kanału przetoki i lokalizację jej ujścia wewnętrznego na podstawie położenia ujścia zewnętrznego?",
        scenario: "Przystępujesz do oceny przebiegu kanału przetoki u tego pacjenta. Jaka słynna reguła anatomiczna (Goodsall's rule) pozwala przewidzieć przebieg kanału przetoki i lokalizację jej ujścia wewnętrznego na podstawie położenia ujścia zewnętrznego?",
        options: [
          {
            text: "REGUŁA GOODSALLA (Goodsall's rule): Jeśli poprowadzimy linię poprzeczną przez środek odbytu: 1) Ujścia zewnętrzne leżące KU TYŁOWI od linii poprzecznej mają kanał przebiegający ŁUKOWATO do tylnej linii pośrodkowej na godzinie 6; 2) Ujścia leżące KU PRZODOWI od linii mają kanał biegnący PROSTO promieniście do najbliższej krypty (wyjątek: ujścia przednie odległe >3 cm od brzegu odbytu biegną łukowato do godziny 6).",
            correct: true,
            feedback: "Wybitnie! Reguła Goodsalla to jeden z najsłynniejszych aksjomatów chirurgii kolorektalnej na LEK: Wyobrażamy sobie tarczę zegara z linią poprzeczną (godzina 3–9): Ujście zewnętrzne z tyłu (od godz. 9 przez 6 do 3): kanał biegnie ZAKRZYWIONYM ŁUKIEM do tylnej linii pośrodkowej (krypta na godz. 6). Ujście z przodu (od godz. 9 przez 12 do 3): kanał biegnie PROSTO, promieniście jak szprycha koła do najbliższej krypty na linii grzebieniastej. Wyjątek: przetoki przednie o ujściu odległym >3 cm od brzegu odbytu (często są przetokami podkowiastymi biegnącymi łukowato do tyłu na godz. 6)."
          },
          {
            text: "Reguła Goodsalla mówi, że wszystkie przetoki biegną pionowo w dół do palców stóp.",
            correct: false,
            feedback: "Absurdalna opcja."
          },
          {
            text: "Reguła dotyczy wyłącznie pomiaru ciśnienia w gałce ocznej.",
            correct: false,
            feedback: "Reguła Goodsalla dotyczy wyłącznie przebiegu przetok okołoodbytowych."
          },
          {
            text: "Wszystkie przetoki odbytu mają ujście w żołądku.",
            correct: false,
            feedback: "Niedorzeczne."
          }
        ]
      },
      {
        stepNum: 8,
        title: "Krok 8: Nowoczesne leczenie chirurgiczne przetok – Ochrona trzymania stolca",
        desc: "Co jest NAJWAŻNIEJSZYM celem leczenia operacyjnego przetok odbytu i jakich procedur unika się przy przetokach wysokich (przecinających zwieracz zewnętrzny), aby zapobiec nietrzymaniu stolca?",
        scenario: "Co jest NAJWAŻNIEJSZYM celem leczenia operacyjnego przetok odbytu i jakich procedur unika się przy przetokach wysokich (przecinających zwieracz zewnętrzny), aby zapobiec nietrzymaniu stolca?",
        options: [
          {
            text: "Nadrzędnym celem jest eradykacja przetoki z BEZWZGLĘDNYM ZACHOWANIEM TRZYMANIA STOLCA I GAZÓW; proste rozcięcie (fistulotomia) można bezpiecznie wykonać TYLKO w przetokach niskich (podskórnych/podśluzówkowych); w przetokach wysokich (przecinających zwieracz zewnętrzny) rozcięcie zwieracza grozi trwałym kałowym kalectwem, dlatego stosuje się techniki oszczędzające zwieracze: luźny seton drenujący (loose seton), procedurę LIFT, płat przesunięty (advancement flap) lub laser (FiLaC).",
            correct: true,
            feedback: "Doskonale! Złoty standard proktologii współczesnej: Przecięcie zwieracza zewnętrznego odbytu (fistulotomia w przetokach wysokich transsfinkterycznych) prowadzi do jatrogennego, nieodwracalnego nietrzymania stolca i gazów (incontinentia alvi). Dlatego w przetokach wysokich obowiązują metody sphincter-saving (oszczędzające zwieracze): 1) Założenie luźnej nitki/pętli naczyniowej (luźny seton) na wiele miesięcy w celu przewlekłego drenażu i stymulacji włóknienia; 2) Zabieg LIFT (podwiązanie kanału przetoki w przestrzeni międzyzwieraczowej); 3) Zamknięcie ujścia wewnętrznego uszypułowanym płatem błony śluzowej (endorectal advancement flap); 4) Termiczna ablacja laserowa (FiLaC)."
          },
          {
            text: "Całkowite wycięcie wszystkich mięśni zwieraczy u każdego pacjenta bez wyjątku.",
            correct: false,
            feedback: "Błąd okaleczający: pacjent do końca życia nie będzie kontrolował wypróżnień."
          },
          {
            text: "Wstrzyknięcie czystego kwasu solnego do kanału przetoki.",
            correct: false,
            feedback: "Wywoła oparzenie chemiczne, martwicę i ropowicę miednicy."
          },
          {
            text: "Przetoki odbytu nigdy nie wymagają leczenia operacyjnego.",
            correct: false,
            feedback: "Przetoka odbytu nie goi się samoistnie z powodu stałego zakażania z kanału odbytu."
          }
        ]
      }
    ];
  });

  console.log("Cases 132-136 upgraded!");
}

run().catch(console.error);

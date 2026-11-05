const fs = require('fs');
const path = require('path');
const { decryptObjectAes, encryptStringAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

async function fix() {
  console.log("Fixing disparities and sync in cases 154-165...");

  // Helper to re-balance options by padding/expanding shorter options
  // or replacing with concrete balanced options.
  
  // -------------------------------------------------------------
  // Case 154: PPH
  // -------------------------------------------------------------
  {
    const raw = fs.readFileSync('cases/154_krwotok_poporodowy_pph.json', 'utf8');
    const c = await decryptObjectAes(JSON.parse(raw), MASTER_KEY);
    
    // Step #3: Tamponada balonowa
    c.steps[3].options = [
      {
        text: "Tamponada balonowa jamy macicy (balon Bakriego), a w razie niepowodzenia pilna laparotomia: szwy kompresyjne (B-Lyncha), podwiązanie tętnic macicznych/biodrowych lub histerektomia",
        correct: true,
        isCorrect: true,
        feedback: "✅ PRAWIDŁOWO! Gdy farmakoterapia atoni macicy (oksytocyna, ergometryna, karboprost, kwas traneksamowy) jest nieskuteczna, metodą zabiegową I rzutu jest tamponada balonem Bakriego (skuteczność >80%). W razie braku hemostazy chora wymaga natychmiastowej laparotomii ratunkowej."
      },
      {
        text: "Założenie szwu okrężnego McDonalda na szyjkę macicy z uciśnięciem tętnic sromowych zewnętrznych i wypisanie do domu w trybie ambulatoryjnym",
        correct: false,
        isCorrect: false,
        feedback: "❌ BŁĄD! Szew McDonalda stosuje się w niewydolności cieśniowo-szyjnej w ciąży, a nie w krwotoku poporodowym!"
      },
      {
        text: "Wprowadzenie rurki Sengstakena-Blakemore'a do przełyku pacjentki w celu zablokowania rzekomego krwawienia z żylaków przewodu pokarmowego",
        correct: false,
        isCorrect: false,
        feedback: "❌ BŁĄD! Sonda Sengstakena-Blakemore'a służy do tamowania żylaków przełyku, a nie krwotoku z jamy macicy!"
      },
      {
        text: "Wypisanie pacjentki do oddziału położniczego z zaleceniem zwiększonej podaży płynów doustnych i kontroli morfologii za 48 godzin",
        correct: false,
        isCorrect: false,
        feedback: "❌ BŁĄD! Pacjentka z niestabilnym krwotokiem poporodowym wymaga natychmiastowego zaopatrzenia zabiegowego na sali operacyjnej!"
      }
    ];

    // LEK Q6 (index 5)
    c.lekQuestions[5].options = [
      "Lekarz może rozszerzyć zabieg bez uprzedniej zgody pacjentki w sytuacji nagłego zagrożenia życia, gdy zachodzi konieczność usunięcia macicy w celu zatamowania krwotoku",
      "Lekarz musi bezwzględnie wybudzić pacjentkę na stole operacyjnym i odebrać od niej podpisany formularz zgody przed nacięciem więzadeł macicy",
      "Lekarz ma bezwzględny prawny zakaz wycięcia macicy, jeśli pacjentka przed znieczuleniem nie wyraziła na to uprzedniej pisemnej zgody",
      "Wymagane jest każdorazowo uzyskanie uprzedniej zgody właściwego miejscowo sądu opiekuńczego przed wykonaniem zabiegu histerektomii",
      "Lekarz musi natychmiast przerwać operację i odczekać 24 godziny na przybycie pełnomocnika medycznego ustanowionego notarialnie"
    ];
    c.lekQuestions[5].opts = [...c.lekQuestions[5].options];

    // LEK Q10 (index 9) - sync opts and options
    c.lekQuestions[9].opts = [...c.lekQuestions[9].options];

    // sync all questions in 154
    c.lekQuestions.forEach(q => {
      q.opts = [...q.options];
      q.q = q.question;
      q.correct = q.correctIdx;
      q.expl = q.exp;
      q.explanation = q.exp;
    });

    const enc = await encryptStringAes(JSON.stringify(c, null, 2), MASTER_KEY);
    fs.writeFileSync('cases/154_krwotok_poporodowy_pph.json', JSON.stringify(enc, null, 2), 'utf8');
    console.log("✓ Fixed 154");
  }

  // -------------------------------------------------------------
  // Case 155: Skręt przydatków
  // -------------------------------------------------------------
  {
    const raw = fs.readFileSync('cases/155_skret_przydatkow.json', 'utf8');
    const c = await decryptObjectAes(JSON.parse(raw), MASTER_KEY);

    // Step #3: Detorsio
    c.steps[3].options = [
      {
        text: "Odkręcenie szypuły (detorsio), obserwacja powrotu perfuzji tkankowej przez 10–15 minut, wyłuszczenie torbieli i oszczędzenie jajnika (zabieg organooszczędzający)",
        correct: true,
        isCorrect: true,
        feedback: "✅ PRAWIDŁOWO! Współczesny złoty standard u kobiet w wieku rozrodczym to detorsio (odkręcenie) i zachowanie jajnika, nawet jeśli jest sino-czarny. Badania dowodzą, że w ponad 90% przypadków jajnik odzyskuje funkcję hormonalną i owulacyjną, a ryzyko zatorowości jest znikome."
      },
      {
        text: "Natychmiastowe obustronne wycięcie przydatków i trzonu macicy z następową chemioterapią uzupełniającą cisplatyną na sali operacyjnej",
        correct: false,
        isCorrect: false,
        feedback: "❌ BŁĄD! Radykalna operacja okaleczająca u 22-latki z łagodną torbielą jest ciężkim błędem w sztuce i pozbawia chorą płodności!"
      },
      {
        text: "Podwiązanie tętnicy jajnikowej bez odkręcania szypuły i pozostawienie niedokrwionego jajnika w jamie otrzewnej bez dalszej kontroli",
        correct: false,
        isCorrect: false,
        feedback: "❌ BŁĄD! Pozostawienie skręconego narządu grozi sepsą, zapaleniem otrzewnej i zgonem!"
      },
      {
        text: "Nacięcie torebki jajnika i wypłukanie jamy brzusznej 10 litrami zimnego roztworu glukozy z antybiotykiem bez derotacji szypuły naczyniowej",
        correct: false,
        isCorrect: false,
        feedback: "❌ BŁĄD! Płukanie bez odkręcenia szypuły nie przywraca perfuzji i prowadzi do nieodwracalnej martwicy jajnika!"
      }
    ];

    // LEK Q6 (index 5)
    c.lekQuestions[5].options = [
      "W stanie nagłym grożącym ciężkim uszkodzeniem zdrowia (utratą jajnika) lekarz może operować bez zgody przedstawiciela ustawowego po zasięgnięciu opinii drugiego lekarza",
      "Lekarz musi bezwzględnie powstrzymać się od jakiejkolwiek operacji do czasu ukończenia przez pacjentkę 18. roku życia w kolejnym miesiącu",
      "Zgodę na operację może podpisać jakikolwiek pełnoletni kolega ze szkoły obecny na szpitalnym oddziale ratunkowym",
      "Wymagane jest bezwzględne oczekiwanie na pisemną depeszę pocztową od rodziców przebywających na wakacjach zagranicznych",
      "Lekarz ma prawo podać jedynie leki przeciwbólowe bez możliwości wykonania operacji nawet w bezpośrednim zagrożeniu życia"
    ];
    c.lekQuestions[5].opts = [...c.lekQuestions[5].options];

    c.lekQuestions.forEach(q => {
      q.opts = [...q.options];
      q.q = q.question;
      q.correct = q.correctIdx;
      q.expl = q.exp;
      q.explanation = q.exp;
    });

    const enc = await encryptStringAes(JSON.stringify(c, null, 2), MASTER_KEY);
    fs.writeFileSync('cases/155_skret_przydatkow.json', JSON.stringify(enc, null, 2), 'utf8');
    console.log("✓ Fixed 155");
  }

  // -------------------------------------------------------------
  // Case 157: PID
  // -------------------------------------------------------------
  {
    const raw = fs.readFileSync('cases/157_zapalenie_miednicy_pid.json', 'utf8');
    const c = await decryptObjectAes(JSON.parse(raw), MASTER_KEY);

    // Balance Step 0, 1, 2, 3 options
    c.steps[0].options = [
      {
        text: "Stwierdzenie co najmniej jednego kryterium minimalnego (bolesność przy poruszaniu szyjką, bolesność macicy lub przydatków) u młodej kobiety z bólem miednicy",
        correct: true,
        isCorrect: true,
        feedback: "✅ PRAWIDŁOWO! Według wytycznych CDC i PTGiP, ze względu na ryzyko niepłodności i ciąży pozamacicznej, próg rozpoznania PID jest celowo niski. Wystarczy obecność bólu miednicy oraz jednego z trzech objawów minimalnych w badaniu dwuręcznym."
      },
      {
        text: "Konieczność wcześniejszego uzyskania dodatniego wyniku hodowli mikrobiologicznej z krwi lub płynu otrzewnowego przed wdrożeniem leczenia",
        correct: false,
        isCorrect: false,
        feedback: "❌ BŁĄD! Oczekiwanie na wynik posiewu (48–72h) opóźnia leczenie i drastycznie zwiększa ryzyko zrostów i trwałej niepłodności."
      },
      {
        text: "Wymóg laboratoryjnego potwierdzenia obecności ropnia jajowodowo-jajnikowego w badaniu rezonansu magnetycznego miednicy mniejszej",
        correct: false,
        isCorrect: false,
        feedback: "❌ BŁĄD! Ropień to powikłanie zaawansowane; większość przypadków PID nie ma ropnia w badaniach obrazowych!"
      },
      {
        text: "Stwierdzenie izolowanego wzrostu stężenia amylazy w surowicy krwi bez dolegliwości bólowych przy badaniu narządów rodnych",
        correct: false,
        isCorrect: false,
        feedback: "❌ BŁĄD! Amylaza wskazuje na zapalenie trzustki, a nie zapalenie narządów miednicy mniejszej!"
      }
    ];

    c.steps[1].options = [
      {
        text: "Wymaz z kanału szyjki na badanie molekularne NAAT (PCR) w kierunku Chlamydia trachomatis i Neisseria gonorrhoeae oraz przyłóżkowe USG przezpochwowe (TVUS)",
        correct: true,
        isCorrect: true,
        feedback: "✅ PRAWIDŁOWO! Testy amplifikacji kwasów nukleinowych (NAAT) to złoty standard w wykrywaniu Chlamydia trachomatis i dwoinki rzeżączki. USG TV pozwala wykluczyć ropień jajowodowo-jajnikowy (TOA) oraz ciążę pozamaciczną."
      },
      {
        text: "Wykonanie kolonoskopii z biopsją śluzówki kątnicy w poszukiwaniu rzekomego zapalenia uchyłków jelita grubego przed badaniem ginekologicznym",
        correct: false,
        isCorrect: false,
        feedback: "❌ BŁĄD! Kolonoskopia w ostrym stanie zapalnym miednicy jest przeciwwskazana ze względu na ryzyko perforacji jelita."
      },
      {
        text: "Scyntygrafia wątroby ze znakowanymi krwinkami czerwonymi w celu oceny przepływu wrotnego i wykluczenia zespołu Budda-Chiariego",
        correct: false,
        isCorrect: false,
        feedback: "❌ BŁĄD! Scyntygrafia wątroby nie ma żadnego zastosowania w diagnostyce zakażeń wstępujących dróg rodnych!"
      },
      {
        text: "Pobranie wymazu z jamy nosowo-gardłowej w kierunku wirusa grypy typu A oraz wykonanie gazometrii krwi tętniczej na czczo",
        correct: false,
        isCorrect: false,
        feedback: "❌ BŁĄD! Badania w kierunku wirusów oddechowych nie mają związku z etiologią zapalenia narządów miednicy mniejszej!"
      }
    ];

    c.steps[2].options = [
      {
        text: "Ceftriakson 1,0 g i.v. raz na dobę + Doksycyklina 100 mg i.v./p.o. co 12h + Metronidazol 500 mg i.v./p.o. co 12h (pokrycie dwoinki, Chlamydii i beztlenowców)",
        correct: true,
        isCorrect: true,
        feedback: "✅ PRAWIDŁOWO! Schemat szpitalny PID musi pokrywać Neisseria gonorrhoeae (ceftriakson), Chlamydia trachomatis (doksycyklina) oraz beztlenowce/Bacteroides/BV (metronidazol). Leczenie prowadzi się łącznie przez 14 dni."
      },
      {
        text: "Monoterapia ampicyliną doustnie w dawce 500 mg raz na dobę przez 3 dni bez jakiejkolwiek osłony przed atypowymi patogenami",
        correct: false,
        isCorrect: false,
        feedback: "❌ BŁĄD! Ampicylina nie działa na Chlamydia trachomatis ani oporne szczepy rzeżączki; monoterapia jest kardynalnym błędem!"
      },
      {
        text: "Wankomycyna dożylnie w monoterapii w stałej dawce 2 g na dobę bez dołączania cefalosporyn ani leków przeciw atypowym patogenom",
        correct: false,
        isCorrect: false,
        feedback: "❌ BŁĄD! Wankomycyna działa na Gram-dodatnie ziarniaki, a patogeny PID to głównie bakterie Gram-ujemne i Chlamydia!"
      },
      {
        text: "Podanie dożylne acyklowiru w dawce 10 mg/kg co 8 godzin pod kontrolą funkcji nerek jako leku przeciwwirusowego pierwszego rzutu",
        correct: false,
        isCorrect: false,
        feedback: "❌ BŁĄD! Acyklowir leczy opryszczkę (HSV), a PID ma etiologię bakteryjną!"
      }
    ];

    c.steps[3].options = [
      {
        text: "Nie ma bezwzględnej konieczności natychmiastowego usunięcia IUD; leczenie przeciwbakteryjne należy wdrożyć bezzwłocznie, a usunięcie wkładki rozważyć w razie braku poprawy po 48–72h. Partner wymaga bezwzględnego leczenia!",
        correct: true,
        isCorrect: true,
        feedback: "✅ PRAWIDŁOWO! Wytyczne CDC i PTGiP wskazują, że natychmiastowe usunięcie IUD nie przynosi korzyści i może nasilić zakażenie. Wkładkę usuwa się przy braku poprawy po 48–72h celowanej antybiotykoterapii. Leczenie partnera seksualnego jest obligatoryjne!"
      },
      {
        text: "Natychmiastowe chirurgiczne wycięcie macicy z pozostawioną wkładką oraz bezwzględny zakaz informowania partnera seksualnego o chorobie",
        correct: false,
        isCorrect: false,
        feedback: "❌ BŁĄD! Histerektomia u 26-latki z niepowikłanym PID jest błędem w sztuce, a brak leczenia partnera gwarantuje reinfekcję!"
      },
      {
        text: "Wymiana wkładki miedzianej na hormonalną w trakcie trwania ostrej infekcji miednicy mniejszej bez antybiotykoterapii ogólnej",
        correct: false,
        isCorrect: false,
        feedback: "❌ BŁĄD! Wprowadzanie nowego ciała obcego w ostrym zakażeniu dróg rodnych jest bezwzględnie zakazane!"
      },
      {
        text: "Zalecenie partnerowi wykonania wyłącznie badania moczu paskowego i powstrzymanie się od jakiejkolwiek farmakoterapii doustnej",
        correct: false,
        isCorrect: false,
        feedback: "❌ BŁĄD! Partnerzy muszą otrzymać empiryczne leczenie przeciwko Chlamydii i rzeżączce niezależnie od objawów!"
      }
    ];

    c.lekQuestions.forEach(q => {
      q.opts = [...q.options];
      q.q = q.question;
      q.correct = q.correctIdx;
      q.expl = q.exp;
      q.explanation = q.exp;
    });

    const enc = await encryptStringAes(JSON.stringify(c, null, 2), MASTER_KEY);
    fs.writeFileSync('cases/157_zapalenie_miednicy_pid.json', JSON.stringify(enc, null, 2), 'utf8');
    console.log("✓ Fixed 157");
  }

  // -------------------------------------------------------------
  // Case 158: SAH
  // -------------------------------------------------------------
  {
    const raw = fs.readFileSync('cases/158_krwawienie_podpajeczynowkowe_sah.json', 'utf8');
    const c = await decryptObjectAes(JSON.parse(raw), MASTER_KEY);

    // Balance Step 1 and 2
    c.steps[1].options = [
      {
        text: "Wykonanie nakłucia lędźwiowego (LP) po wykluczeniu cech ciasnoty w TK: ocena ksantochromii płynu mózgowo-rdzeniowego po odwirowaniu",
        correct: true,
        isCorrect: true,
        feedback: "✅ PRAWIDŁOWO! Czułość TK głowy w SAH spada wraz z upływem czasu (po 24h wynosi ok. 85%, po 48h ok. 75%). Ujemna TK nie wyklucza SAH! Kolejnym obowiązkowym krokiem jest nakłucie lędźwiowe – obecność ksantochromii (żółtawego zabarwienia supernatantu po odwirowaniu) potwierdza krwawienie podpajęczynówkowe."
      },
      {
        text: "Wypisanie pacjenta do domu z diagnozą napięciowego bólu głowy i zaleceniem przyjmowania doustnych niesteroidowych leków przeciwzapalnych",
        correct: false,
        isCorrect: false,
        feedback: "❌ BŁĄD! Odesłanie chorego z ujemną TK po nagłym piorunującym bólu głowy bez wykonania nakłucia lędźwiowego grozi zgonem w wyniku rebleeding!"
      },
      {
        text: "Podanie dożylne heparyny drobnocząsteczkowej w pełnej dawce terapeutycznej w celu zapobieżenia zakrzepicy zatok opony twardej mózgu",
        correct: false,
        isCorrect: false,
        feedback: "❌ BŁĄD! Antykoagulacja u pacjenta z pękniętym tętniakiem doprowadzi do natychmiastowego masywnego śmiertelnego krwotoku!"
      },
      {
        text: "Wykonanie testu prowokacji pionizacyjnej na stole uchylnym tilt-test w celu oceny reakcji ortostatycznej układu krążenia",
        correct: false,
        isCorrect: false,
        feedback: "❌ BŁĄD! Tilt-test stosuje się w diagnostyce omdleń wazowagalnych, nie ma żadnego zastosowania w ostrym bólu głowy!"
      }
    ];

    c.steps[2].options = [
      {
        text: "Pilne zaopatrzenie tętniaka w ciągu pierwszych 24–72 godzin metodą endowaskularną (embolizacja spiralowa / coiling) lub neurochirurgiczną (klipsowanie)",
        correct: true,
        isCorrect: true,
        feedback: "✅ PRAWIDŁOWO! Najgroźniejszym powikłaniem wczesnym SAH jest ponowne krwawienie (rebleeding), niosące śmiertelność >50–70%. Złotym standardem jest pilne zabezpieczenie tętniaka w ciągu 24–72 godzin od krwawienia metodą wewnątrznaczyniową (coiling) lub operacyjną (klipsowanie)."
      },
      {
        text: "Postępowanie zachowawcze z planowym klipsowaniem tętniaka za 6 miesięcy po całkowitej resorpcji wynaczynionej krwi w mózgowiu",
        correct: false,
        isCorrect: false,
        feedback: "❌ BŁĄD! Odroczenie operacji o miesiące oznacza niemal pewny zgon pacjenta z powodu ponownego krwawienia w pierwszych 2 tygodniach!"
      },
      {
        text: "Wstrzyknięcie sklerozantu bezpośrednio do tętnicy szyjnej wewnętrznej w celu zarośnięcia naczynia doprowadzającego krew do tętniaka",
        correct: false,
        isCorrect: false,
        feedback: "❌ BŁĄD! Spowoduje to natychmiastowy masywny udar niedokrwienny całej półkuli mózgu i zgon chorego!"
      },
      {
        text: "Cewnikowanie prawej komory serca z założeniem elektrostymulatora czasowego w celu wywołania kontrolowanej tachykardii komorowej",
        correct: false,
        isCorrect: false,
        feedback: "❌ BŁĄD! Elektrostymulacja serca nie ma związku z tętniakami mózgu i jest procedurą absurdalną w tym wskazaniu!"
      }
    ];

    // Balance LEK Q6, Q9, Q10, Q11
    c.lekQuestions[5].options = [
      "Wyczerpująco poinformować pacjenta o ryzyku przeoczenia tętniaka i zgonu, udokumentować odmowę w historii choroby i zaproponować alternatywę (angio-TK/angio-MR)",
      "Zastosować przymus bezpośredni i wykonać punkcję lędźwiową w asyście policji z uwagi na podejrzenie stanu zagrożenia zdrowia publicznego",
      "Podać pacjentowi dożylnie propofol i wykonać procedurę bez jego wiedzy w znieczuleniu ogólnym z intubacją na sali zabiegowej",
      "Natychmiast wezwać prokuratora dyżurnego w celu wydania nakazu aresztowania pacjenta odmawiającego wykonania procedury nakłucia",
      "Skreślić pacjenta z listy ubezpieczonych w Narodowym Funduszu Zdrowia z powodu braku współpracy z lekarzem prowadzącym"
    ];
    c.lekQuestions[5].opts = [...c.lekQuestions[5].options];

    c.lekQuestions[8].options = [
      "Ultrasonografia przezczaszkowa Doppler (TCD) z oceną średniej prędkości przepływu w tętnicach koła Willisa",
      "Rutynowa spirometria z oceną wskaźnika Tiffeneau i natężonej pojemności życiowej płuc na sali chorych",
      "Elektrokardiograficzny test wysiłkowy na bieżni ruchomej według standardowego protokołu Bruce'a",
      "Przeglądowe USG tarczycy z oceną objętości obu płatów oraz przepływów naczyniowych w badaniu Doppler",
      "Badanie potencjałów wywołanych wzrokowych (VEP) po uprzednim podaniu kropli rozszerzających źrenice"
    ];
    c.lekQuestions[8].opts = [...c.lekQuestions[8].options];

    c.lekQuestions[9].options = [
      "Obecność zwartego krwiaka podpajęczynówkowego o grubości powyżej 1 mm w tomografii komputerowej głowy",
      "Całkowity brak jakiejkolwiek krwi w przestrzeni wewnątrzczaszkowej potwierdzony w badaniu sekcyjnym",
      "Izolowane krwawienie dokomorowe przy całkowicie czystych i wolnych zbiornikach podstawy mózgowia",
      "Obecność krwi wyłącznie w obrębie tkanki podskórnej sklepiska czaszki bez uszkodzenia kości czaszki",
      "Prawidłowy obraz mózgowia w badaniu rezonansu magnetycznego wykonanym w sekwencji T1-zależnej"
    ];
    c.lekQuestions[9].opts = [...c.lekQuestions[9].options];

    c.lekQuestions[10].options = [
      "Zastosowanie doustnego nimodypiny (60 mg co 4 godziny przez 21 dni) oraz utrzymywanie normowolemii i normotensji",
      "Agresywna forsowna hiperwolemia z podażą 10 litrów krystaloidów na dobę w celu wywołania hemodylucji skrajnej",
      "Podawanie dożylne wysokich dawek kwasu traneksamowego przez 30 dni w celu stabilizacji skrzepliny w tętniaku",
      "Całkowite odstawienie płynów i wdrożenie diurezy forsownej furosemidem w celu wysuszenia obrzęku mózgowia",
      "Zastosowanie hipotermii ogólnoustrojowej do 28 stopni Celsjusza jako rutynowej profilaktyki powikłań"
    ];
    c.lekQuestions[10].opts = [...c.lekQuestions[10].options];

    c.lekQuestions.forEach(q => {
      q.opts = [...q.options];
      q.q = q.question;
      q.correct = q.correctIdx;
      q.expl = q.exp;
      q.explanation = q.exp;
    });

    const enc = await encryptStringAes(JSON.stringify(c, null, 2), MASTER_KEY);
    fs.writeFileSync('cases/158_krwawienie_podpajeczynowkowe_sah.json', JSON.stringify(enc, null, 2), 'utf8');
    console.log("✓ Fixed 158");
  }

  // -------------------------------------------------------------
  // Case 159: ICH
  // -------------------------------------------------------------
  {
    const raw = fs.readFileSync('cases/159_krwotok_srodmozgowy_ich.json', 'utf8');
    const c = await decryptObjectAes(JSON.parse(raw), MASTER_KEY);

    c.lekQuestions[8].options = [
      "Gwałtowne obniżenie ciśnienia tętniczego skurczowego poniżej 140 mmHg może prowadzić do niedokrwienia tkanek wokół krwiaka (penumbry)",
      "Zgodnie z wytycznymi AHA/ASA ciśnienie skurczowe należy bezwzględnie utrzymywać powyżej 200 mmHg przez pierwsze 48 godzin",
      "Do obniżania ciśnienia w krwotoku śródmózgowym z wyboru stosuje się krótkodziałającą podjęzykową nifedypinę w kroplach",
      "Obniżanie ciśnienia tętniczego w udarze krwotocznym jest bezwzględnie zakazane z uwagi na stuprocentowe ryzyko wgłobienia",
      "Wartości ciśnienia tętniczego nie mają żadnego wpływu na ekspansję ogniska krwotocznego i rokowanie u pacjenta"
    ];
    c.lekQuestions[8].opts = [...c.lekQuestions[8].options];

    c.lekQuestions[10].options = [
      "Zastosowanie leków obniżających ciśnienie śródczaszkowe (20% mannitol, 3% NaCl), hiperwentylacji oraz pilnej konsultacji neurochirurgicznej",
      "Natychmiastowe podanie dożylne 100 mg alteplazy (rtPA) w celu rozpuszczenia krwiaka uciskającego pień mózgu",
      "Ułożenie pacjenta w pozycji Trendelenburga z nogami uniesionymi powyżej głowy w celu zwiększenia perfuzji mózgowia",
      "Podanie dożylne 10 litrów hipotonicznego roztworu 0,45% NaCl w szybkim wlewie pod ciśnieniem mankietowym",
      "Zalecenie natychmiastowego wykonania punkcji lędźwiowej z ewakuacją 50 ml płynu mózgowo-rdzeniowego na ostro"
    ];
    c.lekQuestions[10].opts = [...c.lekQuestions[10].options];

    c.lekQuestions.forEach(q => {
      q.opts = [...q.options];
      q.q = q.question;
      q.correct = q.correctIdx;
      q.expl = q.exp;
      q.explanation = q.exp;
    });

    const enc = await encryptStringAes(JSON.stringify(c, null, 2), MASTER_KEY);
    fs.writeFileSync('cases/159_krwotok_srodmozgowy_ich.json', JSON.stringify(enc, null, 2), 'utf8');
    console.log("✓ Fixed 159");
  }

  // -------------------------------------------------------------
  // Case 160: TIA
  // -------------------------------------------------------------
  {
    const raw = fs.readFileSync('cases/160_przemijajacy_napad_tia.json', 'utf8');
    const c = await decryptObjectAes(JSON.parse(raw), MASTER_KEY);

    // Balance Step 1 and 4
    c.steps[0].options = [
      {
        text: "Kwalifikacja jako epizod o bardzo wysokim ryzyku udaru (ABCD2 score = 6 pkt) wymagający natychmiastowej hospitalizacji i pilnej diagnostyki naczyniowej",
        correct: true,
        isCorrect: true,
        feedback: "✅ PRAWIDŁOWO! Pacjent uzyskał aż 6 punktów w skali ABCD2 (Wiek >60 = 1, RR >140/90 = 1, Niedowład jednostronny = 2, Czas trwania >60 min = 2, Cukrzyca = 0). Oznacza to ponad 8–10% ryzyko pełnego udaru w ciągu 48h i bezwzględne wskazanie do natychmiastowej hospitalizacji!"
      },
      {
        text: "Uznanie epizodu za łagodny stan czynnościowy i odesłanie pacjenta do domu z zaleceniem kontroli w poradni POZ za 3 tygodnie",
        correct: false,
        isCorrect: false,
        feedback: "❌ BŁĄD! ABCD2 = 6 punktów to stan bezpośredniego zagrożenia udarem mózgu; odesłanie do domu to ciężki błąd lekarski!"
      },
      {
        text: "Skierowanie pacjenta na ambulatoryjne badanie EEG w celu wykluczenia napadów częściowych padaczki czołowej w trybie planowym",
        correct: false,
        isCorrect: false,
        feedback: "❌ BŁĄD! Odroczenie diagnostyki naczyniowej w TIA wysokiego ryzyka grozi nieodwracalnym kalectwem lub zgonem pacjenta."
      },
      {
        text: "Podanie dożylne 100 mg alteplazy (rtPA) na SOR pomimo całkowitego ustąpienia objawów neurologicznych w badaniu fizykalnym",
        correct: false,
        isCorrect: false,
        feedback: "❌ BŁĄD! Tromboliza jest bezwzględnie przeciwwskazana przy całkowitym ustąpieniu objawów (brak deficytu neurologicznego)!"
      }
    ];

    c.steps[3].options = [
      {
        text: "Podwójna terapia przeciwpłytkowa (DAPT: ASA + klopidogrel) przez pierwsze 21 dni, następnie monoterapia, oraz wysoka dawka statyny (atorwastatyna 80 mg)",
        correct: true,
        isCorrect: true,
        feedback: "✅ PRAWIDŁOWO! Badania CHANCE i POINT udowodniły, że u chorych z TIA wysokiego ryzyka (ABCD2 >= 4) wdrożenie DAPT (kwas acetylosalicylowy + klopidogrel) w pierwszych 24h i kontynuowanie przez 21 dni redukuje ryzyko udaru mózgu o ponad 30% w porównaniu z monoterapią!"
      },
      {
        text: "Monoterapia heparyną niefrakcjonowaną we wlewie ciągłym przez 6 miesięcy bez włączania jakichkolwiek leków przeciwpłytkowych",
        correct: false,
        isCorrect: false,
        feedback: "❌ BŁĄD! Długoterminowa heparynizacja w TIA nie ma uzasadnienia i drastycznie zwiększa ryzyko krwawień śródczaszkowych!"
      },
      {
        text: "Zalecenie diety niskobiałkowej bez stosowania jakiejkolwiek farmakoterapii przeciwpłytkowej lub leczenia hipolipemizującego",
        correct: false,
        isCorrect: false,
        feedback: "❌ BŁĄD! Brak prewencji farmakologicznej u chorego z TIA wysokiego ryzyka gwarantuje nawrót udaru w najbliższym czasie."
      },
      {
        text: "Wdrożenie potrójnej antykoagulacji doustnej z użyciem warfaryny, riwaroksabanu i apiksabanu w dawkach terapeutycznych",
        correct: false,
        isCorrect: false,
        feedback: "❌ BŁĄD! Łączenie wielu antykoagulantów jest kardynalnym błędem sztuki lekarskiej i prowadzi do śmiertelnego krwotoku!"
      }
    ];

    // Balance LEK Q1 and Q9
    c.lekQuestions[0].options = [
      "Przemijający epizod dysfunkcji neurologicznej wywołany ogniskowym niedokrwieniem mózgu, rdzenia lub siatkówki BEZ ostrego zawału tkankowego w badaniach obrazowych (DWI-MR)",
      "Deficyt neurologiczny trwający obowiązkowo poniżej 24 godzin niezależnie od obecności świeżego ogniska martwicy w tomografii komputerowej",
      "Zaburzenie świadomości wywołane nagłym skurczem naczyń wieńcowych trwające krócej niż 15 minut z zachowaniem prawidłowego EKG",
      "Epizod obustronnego niedowładu kończyn dolnych w przebiegu zaostrzenia stwardnienia rozsianego ustępujący po podaniu sterydów",
      "Ogniskowy ubytek neurologiczny wywołany mikrowylewem krwotocznym do istoty białej płata czołowego bez ucisku struktur pośrodkowych"
    ];
    c.lekQuestions[0].opts = [...c.lekQuestions[0].options];

    c.lekQuestions[8].options = [
      "Podwójna terapia przeciwpłytkowa (DAPT: ASA + klopidogrel) rozpoczęta w ciągu pierwszych 24 godzin i kontynuowana przez 21 dni",
      "Dożywotnia potrójna terapia przeciwpłytkowa z użyciem kwasu acetylosalicylowego, klopidogrelu oraz tikagreloru w pełnych dawkach",
      "Monoterapia doustnym lekiem przeciwkrzepliwym z grupy NOAC (np. rywaroksaban 20 mg/d) przy braku migotania przedsionków",
      "Wstrzymanie jakichkolwiek leków przeciwkrzepliwych i przeciwpłytkowych na okres 3 miesięcy z uwagi na ryzyko krwawienia",
      "Stosowanie wyłącznie heparyny niefrakcjonowanej w ciągłym wlewie dożylnym przez okres pierwszych 30 dni od wystąpienia TIA"
    ];
    c.lekQuestions[8].opts = [...c.lekQuestions[8].options];

    c.lekQuestions.forEach(q => {
      q.opts = [...q.options];
      q.q = q.question;
      q.correct = q.correctIdx;
      q.expl = q.exp;
      q.explanation = q.exp;
    });

    const enc = await encryptStringAes(JSON.stringify(c, null, 2), MASTER_KEY);
    fs.writeFileSync('cases/160_przemijajacy_napad_tia.json', JSON.stringify(enc, null, 2), 'utf8');
    console.log("✓ Fixed 160");
  }

  // -------------------------------------------------------------
  // Case 161: Wallenberg
  // -------------------------------------------------------------
  {
    const raw = fs.readFileSync('cases/161_zespol_wallenberga_pica.json', 'utf8');
    const c = await decryptObjectAes(JSON.parse(raw), MASTER_KEY);

    // Balance Step 3 and 4
    c.steps[2].options = [
      {
        text: "Wykonanie pilnego rezonansu magnetycznego mózgowia (MR z sekwencją DWI i angio-MR) w celu potwierdzenia niedokrwienia bocznej części rdzenia przedłużonego",
        correct: true,
        isCorrect: true,
        feedback: "✅ PRAWIDŁOWO! Tomografia komputerowa tylnego dołu czaszki ma niską czułość we wczesnym udarze pnia mózgu z powodu artefaktów od kości skalistych. Badaniem z wyboru o najwyższej czułości jest rezonans magnetyczny z dyfuzją (DWI-MR) oraz angio-MR naczyń kręgowych i podstawnych."
      },
      {
        text: "Wykonanie natychmiastowej punkcji lędźwiowej z pobraniem 30 ml płynu mózgowo-rdzeniowego na posiew mikrobiologiczny i ocenę prątków",
        correct: false,
        isCorrect: false,
        feedback: "❌ BŁĄD! Nakłucie lędźwiowe w ostrym udarze pnia mózgu jest przeciwwskazane z powodu ryzyka wgłobienia migdałków móżdżku!"
      },
      {
        text: "Zlecenie przeglądowego zdjęcia RTG kości czaszki w dwóch projekcjach w celu wykluczenia pourazowego pęknięcia łusek kości potylicznej",
        correct: false,
        isCorrect: false,
        feedback: "❌ BŁĄD! Zdjęcie RTG kości czaszki nie uwidacznia miąższu pnia mózgu ani naczyń i opóźnia leczenie udaru!"
      },
      {
        text: "Wykonanie elektroencefalografii (EEG) ze stymulacją błyskami świetlnymi w celu potwierdzenia ogniska padaczkowego w płacie potylicznym",
        correct: false,
        isCorrect: false,
        feedback: "❌ BŁĄD! Zespół Wallenberga to schorzenie naczyniowe pnia mózgu; EEG nie ma tu żadnego zastosowania diagnostycznego!"
      }
    ];

    c.steps[3].options = [
      {
        text: "Bezwzględne utrzymanie statusu 'nic doustnie' (NPO), formalny test dysfagii przyłóżkowej i założenie zgłębnika nosowo-żołądkowego (NGT) w celu zapobieżenia aspiracji",
        correct: true,
        isCorrect: true,
        feedback: "✅ PRAWIDŁOWO! Uszkodzenie jądra dwuznacznego (nucleus ambiguus) powoduje ciężkie porażenie podniebienia, gardła i krtani. Próby karmienia doustnego kończą się masywną aspiracją i śmiertelnym zachłystowym zapaleniem płuc. Wczesne żywienie przez sondę (NGT) jest kluczowe."
      },
      {
        text: "Podawanie posiłków doustnych w postaci gęstych stałych pokarmów z poleceniem popijania dużą ilością gazowanej wody mineralnej",
        correct: false,
        isCorrect: false,
        feedback: "❌ BŁĄD! Porażenie podniebienia i krtani w zespole Wallenberga prowadzi do natychmiastowego uduszenia przy próbie połykania!"
      },
      {
        text: "Natychmiastowe wykonanie planowej tracheostomii chirurgicznej na sali SOR u każdego chorego bez oceny wydolności oddechowej",
        correct: false,
        isCorrect: false,
        feedback: "❌ BŁĄD! Tracheostomia nie jest procedurą I rzutu w izolowanej dysfagii; wystarczające jest żywienie przez zgłębnik żołądkowy."
      },
      {
        text: "Zalecenie intensywnych ćwiczeń fizycznych i pionizacji na korytarzu oddziału w celu szybkiej redukcji zespołu Hornera u pacjenta",
        correct: false,
        isCorrect: false,
        feedback: "❌ BŁĄD! Pacjent z ataksją móżdżkową i zespołem pniowym ma ciężkie zaburzenia równowagi – pionizacja grozi upadkiem i urazem czaszkowym."
      }
    ];

    // Balance LEK Q2
    c.lekQuestions[1].options = [
      "Jądro dwuznaczne (nucleus ambiguus) zawierające komórki ruchowe zaopatrujące mięśnie gardła, krtani i podniebienia miękkiego",
      "Jądro nerwu podjęzykowego (nucleus nervi hypoglossi) odpowiadające za unerwienie ruchowe mięśni wewnętrznych i zewnętrznych języka",
      "Jądro pasma samotnego (nucleus tractus solitarii) odbierające bodźce smakowe ze struny bębenkowej i nerwu językowo-gardłowego",
      "Jądro ślinowe górne (nucleus salivatorius superior) zaopatrujące przywspółczulnie śliniankę podżuchwową i podjęzykową",
      "Jądro brzuszne tylno-boczne wzgórza (VPL) przewodzące impulsy czuciowe z przeciwległej połowy ciała do kory czuciowej"
    ];
    c.lekQuestions[1].opts = [...c.lekQuestions[1].options];

    c.lekQuestions.forEach(q => {
      q.opts = [...q.options];
      q.q = q.question;
      q.correct = q.correctIdx;
      q.expl = q.exp;
      q.explanation = q.exp;
    });

    const enc = await encryptStringAes(JSON.stringify(c, null, 2), MASTER_KEY);
    fs.writeFileSync('cases/161_zespol_wallenberga_pica.json', JSON.stringify(enc, null, 2), 'utf8');
    console.log("✓ Fixed 161");
  }

  // -------------------------------------------------------------
  // Case 162: EDH
  // -------------------------------------------------------------
  {
    const raw = fs.readFileSync('cases/162_krwiak_nadtwardowkowy_edh.json', 'utf8');
    const c = await decryptObjectAes(JSON.parse(raw), MASTER_KEY);

    // Balance LEK Q3, Q8, Q9, Q10, Q11
    c.lekQuestions[2].options = [
      "Obustronnie wklęsły (półksiężycowaty) kształt przekraczający linie szwów czaszkowych o zróżnicowanej gęstości radiologicznej",
      "Jednostronna soczewkowata (dwuwypukła) hiperdensyjna masa ograniczona szwami czaszkowymi uciskająca miąższ mózgu",
      "Drobne punktowe ogniska hipodensyjne zlokalizowane na granicy istoty białej i szarej obu płatów czołowych",
      "Płyn mózgowo-rdzeniowy podbarwiony krwią wypełniający symetrycznie zbiorniki podstawy i bruzdy sklepistości",
      "Jednolity zanik korowo-podkorowy z poszerzeniem układu komorowego i obecnością zwapnień w splotach naczyniówkowych"
    ];
    c.lekQuestions[2].opts = [...c.lekQuestions[2].options];

    c.lekQuestions[7].options = [
      "Odbarczenie krwiaka drogą pilnej kraniotomii (lub trepanacji ratunkowej w razie braku neurochirurga) z podwiązaniem uszkodzonego naczynia",
      "Postępowanie wyczekujące z powtórzeniem badania tomografii komputerowej głowy za 7 dni w trybie ambulatoryjnym",
      "Podanie dożylne 100 mg alteplazy w celu rozpuszczenia krwiaka i ułatwienia jego samoistnego wchłaniania przez oponę twardą",
      "Zastosowanie nakłucia lędźwiowego w celu szybkiej dekompresji ciśnienia płynu mózgowo-rdzeniowego na sali przyjęć",
      "Wdrożenie hipotermii ogólnoustrojowej do 28 stopni Celsjusza jako jedynej metody leczniczej bez operacji"
    ];
    c.lekQuestions[7].opts = [...c.lekQuestions[7].options];

    c.lekQuestions[8].options = [
      "Uciśnięcie i podrażnienie włókien przywspółczulnych nerwu okoruchowego (III) przez wklinowujący się hak zakrętu hipokampa",
      "Porażenie nerwu bloczkowego (IV) skutkujące brakiem możliwości odwiedzenia gałki ocznej w kierunku dołu i do wewnątrz",
      "Bezpośrednie uszkodzenie siatkówki oka wywołane gwałtownym skokiem ciśnienia wewnątrzgałkowego w trakcie urazu głowy",
      "Przecięcie nerwu odwodzącego (VI) w kanale Dorello wskutek złamania piramidy kości skroniowej po stronie urazu",
      "Zatkanie tętnicy środkowej siatkówki przez zator cholesterolowy pochodzący z pękniętej tętnicy oponowej środkowej"
    ];
    c.lekQuestions[8].opts = [...c.lekQuestions[8].options];

    c.lekQuestions[9].options = [
      "Zabieg ratujący życie w bezpośrednim zagrożeniu zgonem może i musi być wykonany bez zgody sądu opiekuńczego ani przedstawiciela",
      "Lekarz ma bezwzględny prawny obowiązek wstrzymania się z operacją do czasu uzyskania pisemnej zgody sądu opiekuńczego",
      "Do wykonania trepanacji ratunkowej wymagana jest obligatoryjna pisemna zgoda prokuratora dyżurnego właściwego rejonu",
      "Brak zgody rodziców całkowicie zwalnia zespół medyczny z odpowiedzialności za ewentualny zgon pacjenta na oddziale",
      "Lekarz ma prawo operować wyłącznie wtedy, gdy małoletni pacjent odzyska przytomność i złoży własnoręczny podpis"
    ];
    c.lekQuestions[9].opts = [...c.lekQuestions[9].options];

    c.lekQuestions[10].options = [
      "Triada Cushinga: nadciśnienie tętnicze, bradykardia oraz nieregularny oddech (brzuszny / Cheyne'a-Stokesa)",
      "Triada Becka: hipotensja, wygórowane tętno na tętnicach szyjnych oraz stłumienie tonów serca w osłuchiwaniu",
      "Triada Charcota: ból w prawym podżebrzu, wysoka gorączka z dreszczami oraz żółtaczka mechaniczna",
      "Triada Virchowa: zastój żylny, uszkodzenie śródbłonka naczyniowego oraz nadkrzepliwość krwi",
      "Triada Hornera: opadanie powieki, zwężenie źrenicy oraz brak pocenia połowy twarzy"
    ];
    c.lekQuestions[10].opts = [...c.lekQuestions[10].options];

    c.lekQuestions.forEach(q => {
      q.opts = [...q.options];
      q.q = q.question;
      q.correct = q.correctIdx;
      q.expl = q.exp;
      q.explanation = q.exp;
    });

    const enc = await encryptStringAes(JSON.stringify(c, null, 2), MASTER_KEY);
    fs.writeFileSync('cases/162_krwiak_nadtwardowkowy_edh.json', JSON.stringify(enc, null, 2), 'utf8');
    console.log("✓ Fixed 162");
  }

  // -------------------------------------------------------------
  // Cases 163, 164, 165: Jaskra, CRAO, Ropień
  // -------------------------------------------------------------
  {
    // 163: Jaskra
    const raw163 = fs.readFileSync('cases/163_ostre_zamkniecie_kata_jaskra.json', 'utf8');
    const c163 = await decryptObjectAes(JSON.parse(raw163), MASTER_KEY);

    c163.steps[1].options = [
      {
        text: "Przy ciśnieniu >50–60 mmHg dochodzi do niedokrwienia mięśnia zwieracza źrenicy, który staje się całkowicie niewrażliwy na stymulację cholinergiczną",
        correct: true,
        isCorrect: true,
        feedback: "✅ PRAWIDŁOWO! Przy bardzo wysokim ciśnieniu śródgałkowym dochodzi do przejściowej niedokrwiennej neuropatii i porażenia zwieracza źrenicy. Pilokarpina podana na początku jest nieskuteczna, a może nasilić ból. Należy najpierw obniżyć ciśnienie (mannitol, acetazolamid), a pilokarpinę podać dopiero, gdy IOP spadnie poniżej 40 mmHg!"
      },
      {
        text: "Pilokarpina działa wyłącznie na receptory zlokalizowane w mięśniach gładkich naczyń siatkówki i nie wywiera wpływu na mięsień zwieracz źrenicy",
        correct: false,
        isCorrect: false,
        feedback: "❌ BŁĄD! Pilokarpina to parasympatykomimetyk działający bezpośrednio na receptory M3 mięśnia zwieracza źrenicy."
      },
      {
        text: "Podanie pilokarpiny jest bezwzględnie zakazane z powodu natychmiastowego wywołania nieodwracalnego zaćmienia soczewki w obu oczach pacjenta",
        correct: false,
        isCorrect: false,
        feedback: "❌ BŁĄD! Pilokarpina jest lekiem z wyboru w późniejszym etapie ostrego ataku; nie powoduje zaćmy w ostrym podaniu."
      },
      {
        text: "Pilokarpina wymaga uprzedniej aktywacji enzymatycznej przez sok żołądkowy i nie wykazuje aktywności biologicznej po podaniu miejscowym",
        correct: false,
        isCorrect: false,
        feedback: "❌ BŁĄD! Pilokarpina to krople o działaniu miejscowym, nie wymaga aktywacji żołądkowej!"
      }
    ];

    c163.steps[2].options = [
      {
        text: "Wykonanie obustronnej irydotomii laserowej YAG (irydotomia w chorym oku po ustąpieniu obrzęku rogówki oraz PROFILAKTYCZNIE w oku drugim)",
        correct: true,
        isCorrect: true,
        feedback: "✅ PRAWIDŁOWO! Po opanowaniu ostrego ataku i oczyszczeniu rogówki zabiegiem z wyboru jest irydotomia laserowa YAG, tworząca przetokę między komorą tylną a przednią. Drugie oko ma identyczną predyspozycję anatomiczną i ryzyko ataku wynosi >50%, dlatego wymaga profilaktycznej irydotomii YAG!"
      },
      {
        text: "Wykonanie natychmiastowej obustronnej enukleacji (usunięcia gałek ocznych) na sali operacyjnej w trybie ostrym pod narkozą",
        correct: false,
        isCorrect: false,
        feedback: "❌ BŁĄD! Enukleacja to usunięcie oka stosowane w nowotworach lub ślepym bolesnym oku, a nie w leczonej jaskrze ostrej!"
      },
      {
        text: "Zalecenie noszenia okularów przeciwsłonecznych w ciemnych pomieszczeniach przez kolejne 12 miesięcy bez leczenia zabiegowego",
        correct: false,
        isCorrect: false,
        feedback: "❌ BŁĄD! Ciemność rozszerza źrenicę i natychmiast wywoła ponowne ostre zamknięcie kąta przesączania!"
      },
      {
        text: "Wszczepienie podskórnego stymulatora nerwu wzrokowego w okolicy zausznej w celu ciągłej stymulacji aksonów zwojowych",
        correct: false,
        isCorrect: false,
        feedback: "❌ BŁĄD! Stymulatory nerwu wzrokowego nie mają zastosowania klinicznego w leczeniu zamknięcia kąta przesączania."
      }
    ];

    c163.lekQuestions[1].options = [
      "Stosowanie leków rozszerzających źrenicę (np. atropiny, tropikamidu, fenylefryny lub leków cholinolitycznych)",
      "Przebywanie w jasnych, intensywnie oświetlonych pomieszczeniach przez wiele godzin dziennie",
      "Stosowanie miejscowych kropli zawierających miotyki (np. pilokarpinę w stężeniu 2%)",
      "Spożywanie dużej ilości płynów zawierających jony potasu i magnezu w codziennej diecie",
      "Intensywny wysiłek fizyczny na świeżym powietrzu przy naturalnym świetle słonecznym"
    ];
    c163.lekQuestions[1].opts = [...c163.lekQuestions[1].options];

    c163.lekQuestions[10].options = [
      "Gonioskopia (ocena kąta przesączania za pomocą trójlustra Goldmanna lub goniopryzmatu Zeiss)",
      "Perymetria statyczna (komputerowe badanie pola widzenia metodą automatyczną)",
      "Oftalmoskopia pośrednia obuoczna po uprzednim maksymalnym rozszerzeniu źrenic atropiną",
      "Keratometria z automatyczną oceną krzywizny przedniej powierzchni rogówki",
      "Ultrasonografia oka w prezentacji B z oceną długości osiowej gałki ocznej"
    ];
    c163.lekQuestions[10].opts = [...c163.lekQuestions[10].options];

    c163.lekQuestions.forEach(q => {
      q.opts = [...q.options];
      q.q = q.question;
      q.correct = q.correctIdx;
      q.expl = q.exp;
      q.explanation = q.exp;
    });

    const enc163 = await encryptStringAes(JSON.stringify(c163, null, 2), MASTER_KEY);
    fs.writeFileSync('cases/163_ostre_zamkniecie_kata_jaskra.json', JSON.stringify(enc163, null, 2), 'utf8');
    console.log("✓ Fixed 163");

    // 164: CRAO
    const raw164 = fs.readFileSync('cases/164_zator_tetnicy_siatkowki_crao.json', 'utf8');
    const c164 = await decryptObjectAes(JSON.parse(raw164), MASTER_KEY);

    c164.steps[1].options = [
      {
        text: "Masaż gałki ocznej przez zamknięte powieki (rytmiczny ucisk przez 10–15 s, zwolnienie), obniżenie IOP (acetazolamid, krople) oraz paracenteza komory przedniej",
        correct: true,
        isCorrect: true,
        feedback: "✅ PRAWIDŁOWO! Masaż gałki ocznej powoduje wahania ciśnienia śródgałkowego, co ułatwia przemieszczenie zatoru do bardziej obwodowych gałęzi siatkówki. Obniżenie IOP (acetazolamid, paracenteza) zwiększa perfuzję siatkówkową."
      },
      {
        text: "Założenie ciasnego opatrunku uciskowego z ciężarkiem ołowianym na gałkę oczną na okres kolejnych 24 godzin bez kontroli ciśnienia",
        correct: false,
        isCorrect: false,
        feedback: "❌ BŁĄD! Ciągły ciężki ucisk całkowicie zatrzyma przepływ krwi i doprowadzi do natychmiastowej śmierci siatkówki!"
      },
      {
        text: "Wstrzyknięcie 10 ml 96% alkoholu etylowego bezpośrednio do przestrzeni pozagałkowej w celu wywołania neurotomii chemicznej",
        correct: false,
        isCorrect: false,
        feedback: "❌ BŁĄD! Wstrzyknięcie alkoholu do oczodołu spowoduje martwicę tkanek miękkich i trwałe okaleczenie!"
      },
      {
        text: "Podanie dożylne wlewu z furosemidu w skojarzeniu z witaminą C w megadawkach bez jakichkolwiek manewrów miejscowych",
        correct: false,
        isCorrect: false,
        feedback: "❌ BŁĄD! Furosemid nie przemieści zatoru tętniczego i opóźnia skuteczne procedury ratunkowe!"
      }
    ];

    c164.steps[2].options = [
      {
        text: "Do 90–100 minut (po tym czasie martwica komórek zwojowych staje się nieodwracalna, a szansa na poprawę po 4–6h spada niemal do zera)",
        correct: true,
        isCorrect: true,
        feedback: "✅ PRAWIDŁOWO! Komórki zwojowe siatkówki są tkanką nerwową skrajnie wrażliwą na niedotlenienie. Eksperymenty wykazują, że całkowite zamknięcie tętnicy środkowej siatkówki trwające powyżej 90–100 minut powoduje nieodwracalny zanik komórek nerwowych i trwałą ślepotę."
      },
      {
        text: "Do 72 godzin od wystąpienia ubytku widzenia pod warunkiem podawania kropli nawilżających z kwasem hialuronowym",
        correct: false,
        isCorrect: false,
        feedback: "❌ BŁĄD! Po 72 godzinach siatkówka jest całkowicie obumarła i zbliznowaciała; okno wynosi zaledwie 90–240 minut!"
      },
      {
        text: "Do 14 dni roboczych pod warunkiem przebywania pacjenta w zaciemnionym pomieszczeniu szpitalnym",
        correct: false,
        isCorrect: false,
        feedback: "❌ BŁĄD! Komórki nerwowe siatkówki nie przeżyją 14 dni bez tlenu; to absurdalna zwłoka!"
      },
      {
        text: "Czas nie ma żadnego znaczenia rokowniczego, gdyż komórki zwojowe siatkówki podlegają ciągłej regeneracji",
        correct: false,
        isCorrect: false,
        feedback: "❌ BŁĄD! Komórki zwojowe siatkówki są elementem OUN i nie regenerują się po obumarciu niedokrwiennym!"
      }
    ];

    c164.steps[3].options = [
      {
        text: "Obecność dodatkowego unaczynienia od tętnicy rzęskowo-siatkówkowej (arteria cilioretinalis obecna u 15–30% populacji), odchodzącej od naczyń naczyniówki",
        correct: true,
        isCorrect: true,
        feedback: "✅ PRAWIDŁOWO! U około 20–30% populacji występuje tętnica rzęskowo-siatkówkowa zaopatrująca plamkę żółtą z krążenia rzęskowego (z tętnic rzęskowych tylnych krótkich). W przypadku zatoru tętnicy środkowej siatkówki ten obszar zachowuje prawidłowe ukrwienie, ocalając widzenie centralne!"
      },
      {
        text: "Fizjologiczny odpływ krwi przez naczynia limfatyczne tarczy nerwu wzrokowego do węzłów chłonnych szyjnych",
        correct: false,
        isCorrect: false,
        feedback: "❌ BŁĄD! Siatkówka i mózg nie posiadają klasycznych naczyń limfatycznych zaopatrujących plamkę w krew tętniczą!"
      },
      {
        text: "Wsteczny przepływ krwi z żyły kątowej i splotu skrzydłowego przez szczelinę oczodołową górną do siatkówki",
        correct: false,
        isCorrect: false,
        feedback: "❌ BŁĄD! Krew żylna ze splotu skrzydłowego nie zaopatruje siatkówki w utlenowaną krew tętniczą!"
      },
      {
        text: "Zdolność czopków plamkowych do beztlenowej syntezy tlenu z cząsteczek dwutlenku węgla i barwnika rodopsyny",
        correct: false,
        isCorrect: false,
        feedback: "❌ BŁĄD! Komórki zwierzęce nie prowadzą fotosyntezy ani beztlenowej syntezy tlenu z CO2!"
      }
    ];

    c164.lekQuestions[1].options = [
      "W chorym oku źrenica nie reaguje na bezpośrednie światło, lecz reaguje konsensualnie na oświetlenie oka zdrowego",
      "Obie źrenice są trwale poszerzone do 9 mm i sztywne na bodźce świetlne z całkowitym porażeniem akomodacji",
      "Źrenica oka chorego jest skrajnie zwężona do 1 mm i nie rozszerza się w ciemności ani po podaniu mydriatyków",
      "Występuje obustronny oczopląs poziomy z zachowaną prawidłową reakcją źrenic na światło i zbieżność",
      "Reakcja bezpośrednia i konsensualna w obu oczach jest całkowicie prawidłowa i symetryczna"
    ];
    c164.lekQuestions[1].opts = [...c164.lekQuestions[1].options];

    c164.lekQuestions[2].options = [
      "Błyszczącymi, żółtopomarańczowymi zatorami cholesterolowymi w rozwidleniach tętnic siatkówki (z blaszki w tętnicy szyjnej)",
      "Złogami soli wapnia w plamce żółtej u pacjentów z ciężką pierwotną nadczynnością przytarczyc",
      "Zakaźnymi ogniskami bakteryjnymi w przebiegu infekcyjnego zapalenia wsierdzia zastawki aortalnej",
      "Przetokami tętniczo-żylnymi w naczyniówce wywołanymi tępym urazem gałki ocznej w przeszłości",
      "Pasemkami naczyniastymi w błonie Brucha w przebiegu wrodzonej elastozy tkanki łącznej"
    ];
    c164.lekQuestions[2].opts = [...c164.lekQuestions[2].options];

    c164.lekQuestions[6].options = [
      "Nakłuciu rogówki cienką igłą (30G) przy rąbku i aspiracji 0,1–0,2 ml cieczy wodnistej z komory przedniej w celu nagłego obniżenia IOP",
      "Nacięciu twardówki w okolicy plamki żółtej z ewakuacją ciała szklistego i następową tamponadą gazem SF6",
      "Zeszyciu powiek szwem niewchłanialnym na okres 14 dni w celu całkowitej ochrony rogówki przed wysychaniem",
      "Podaniu do komory przedniej 10 ml stężonego roztworu heparyny niefrakcjonowanej w celu rozpuszczenia zatoru",
      "Wypłukaniu rogówki 5 litrami sterylnego roztworu Ringera podgrzanego do temperatury 40 stopni Celsjusza"
    ];
    c164.lekQuestions[6].opts = [...c164.lekQuestions[6].options];

    c164.lekQuestions[8].options = [
      "Zatorowość sercopochodna (wypadanie płatka zastawki mitralnej, śluzak lewego przedsionka, przetrwały otwór owalny PFO)",
      "Zaawansowane zwapnienie starcze pierścienia zastawki aortalnej bez skrzeplin i bez zwężenia ujścia",
      "Przewlekła niewydolność żylna kończyn dolnych z obecnością żylaków podudzi i obrzęków ciastowatych",
      "Masywna blaszka miażdżycowa w aorcie brzusznej poniżej odejścia naczyń krezkowych dolnych",
      "Jałowa martwica głowy kości udowej powikłana wtórną chorobą zwyrodnieniową stawu biodrowego"
    ];
    c164.lekQuestions[8].opts = [...c164.lekQuestions[8].options];

    c164.lekQuestions[9].options = [
      "Rytmiczny ucisk palcami przez zamknięte powieki przez 10–15 sekund, po czym nagłe zwolnienie ucisku w celu wywołania wahań ciśnienia",
      "Stały, niezmienny nacisk pięścią przez co najmniej 45 minut bez zwalniania ucisku aż do wystąpienia bólu oczodołu",
      "Cykliczne opukiwanie gałki ocznej młoteczkiem neurologicznym w celu mechanicznego rozbicia zatoru w tętnicy",
      "Masowanie skóry czoła kostkami lodu z całkowitym ominięciem gałek ocznych w celu wywołania odruchu naczyniowego",
      "Ucisk wyłącznie na drugie, zdrowe oko w celu wywołania odruchowego rozszerzenia naczyń w oku chorym"
    ];
    c164.lekQuestions[9].opts = [...c164.lekQuestions[9].options];

    c164.lekQuestions[10].options = [
      "W CRVO zablokowany jest odpływ krwi przy zachowanym dopływie tętniczym, co powoduje masywne krwotoki ('obraz płonącego lasu')",
      "Ponieważ żyła środkowa siatkówki nie ma połączenia z siatkówką i odprowadza krew wyłącznie z twardówki oka",
      "Z powodu natychmiastowego obumarcia soczewki oka w przebiegu zakrzepicy naczyń splotu rzęskowego",
      "W zakrzepicy żyły środkowej dno oka jest krystalicznie przejrzyste bez jakichkolwiek wybroczyn krwotocznych",
      "CRVO występuje wyłącznie u pacjentów z wrodzoną ślepotą barw dziedziczoną w sposób recesywny"
    ];
    c164.lekQuestions[10].opts = [...c164.lekQuestions[10].options];

    c164.lekQuestions.forEach(q => {
      q.opts = [...q.options];
      q.q = q.question;
      q.correct = q.correctIdx;
      q.expl = q.exp;
      q.explanation = q.exp;
    });

    const enc164 = await encryptStringAes(JSON.stringify(c164, null, 2), MASTER_KEY);
    fs.writeFileSync('cases/164_zator_tetnicy_siatkowki_crao.json', JSON.stringify(enc164, null, 2), 'utf8');
    console.log("✓ Fixed 164");

    // 165: Ropień okołomigdałkowy
    const raw165 = fs.readFileSync('cases/165_ropien_okolomigdalkowy.json', 'utf8');
    const c165 = await decryptObjectAes(JSON.parse(raw165), MASTER_KEY);

    c165.steps[0].options = [
      {
        text: "Ocena drożności górnych dróg oddechowych (wykluczenie duszności krtaniowej i stridoru), ocena stopnia szczękościsku oraz badanie gardła z użyciem dobrego źródła światła",
        correct: true,
        isCorrect: true,
        feedback: "✅ PRAWIDŁOWO! Ropień okołomigdałkowy może powodować zagrażający życiu obrzęk krtani i duszność. Pierwszym krokiem jest zawsze zabezpieczenie dróg oddechowych (A w protokole ABC) oraz ocena faryngoskopowa."
      },
      {
        text: "Zalecenie picia gorącego mleka z miodem i podwojenie dawki doustnego ketoprofenu bez badania jamy ustnej i gardła",
        correct: false,
        isCorrect: false,
        feedback: "❌ BŁĄD! Gorące płyny rozszerzają naczynia i nasilają obrzęk; zaniechanie badania grozi uduszeniem pacjenta!"
      },
      {
        text: "Zlecenie tomografii emisyjnej pozytonowej (PET) w celu wykluczenia chłoniaka migdałka podniebiennego w trybie pilnym",
        correct: false,
        isCorrect: false,
        feedback: "❌ BŁĄD! Badanie PET nie jest badaniem stanów nagłych na SOR; ropień wymaga natychmiastowej diagnostyki klinicznej!"
      },
      {
        text: "Wykonanie głębokiej bronchoskopii sztywnej na sali przyjęć bez znieczulenia miejscowego i bez intubacji dotchawiczej",
        correct: false,
        isCorrect: false,
        feedback: "❌ BŁĄD! Sztywna bronchoskopia bez wskazań i znieczulenia to błąd w sztuce i niepotrzebne okaleczenie pacjenta!"
      }
    ];

    c165.steps[1].options = [
      {
        text: "Nakłucie aspiracyjne igłą w miejscu największego uwypuklenia (potwierdzenie treści ropnej), nacięcie i rozszerzenie kleszczykami (drenaż ropnia) w znieczuleniu miejscowym",
        correct: true,
        isCorrect: true,
        feedback: "✅ PRAWIDŁOWO! Nacięcie i drenaż ropnia (lub aspiracja igłowa) w znieczuleniu miejscowym (10% lidokaina w aerozolu + nasiękowo 1–2% lidokaina) przynosi natychmiastową ulgę w bólu, zmniejsza szczękościsk i zabezpiecza przed septycznym zstępowaniem ropy do śródpiersia."
      },
      {
        text: "Podanie dożylne wlewu z furosemidu w celu wchłonięcia ropnia bez naruszania powłok śluzówki gardła",
        correct: false,
        isCorrect: false,
        feedback: "❌ BŁĄD! Furosemid nie ewakuuje zamkniętej przestrzeni ropnej; uformowany ropień bezwzględnie wymaga drenażu chirurgicznego!"
      },
      {
        text: "Zastosowanie zewnętrznych okładów rozgrzewających na szyję bez jakiejkolwiek ewakuacji treści ropnej z gardła",
        correct: false,
        isCorrect: false,
        feedback: "❌ BŁĄD! Ciepło przyspiesza rozprzestrzenianie się ropnia do przestrzeni przygardłowej i śródpiersia!"
      },
      {
        text: "Energiczny masaż migdałka palcem badającego przez jamę ustną w celu mechanicznego wyciśnięcia ropy przez kryptę",
        correct: false,
        isCorrect: false,
        feedback: "❌ BŁĄD! Miażdżenie tkanek grozi pęknięciem ropnia z aspiracją do dróg oddechowych i zakażeniem łożyska naczyniowego!"
      }
    ];

    c165.steps[2].options = [
      {
        text: "Amoksycylina z kwasem klawulanowym i.v. (1,2 g co 8h) LUB Cefazolina/Ceftriakson z Klindamycyną (pokrycie paciorkowców i beztlenowców) oraz deksametazon",
        correct: true,
        isCorrect: true,
        feedback: "✅ PRAWIDŁOWO! Etiologia ropnia okołomigdałkowego jest mieszana: tlenowce (Streptococcus pyogenes) i beztlenowce (Fusobacterium necrophorum, Prevotella). Złotym standardem jest amoksycylina z kwasem klawulanowym i.v. Pojedyncza dawka deksametazonu (8–10 mg i.v.) przyspiesza ustąpienie szczękościsku i bólu."
      },
      {
        text: "Monoterapia gentamycyną w maści stosowanej na skórę policzka i kąta żuchwy po stronie objawowej przez 10 dni",
        correct: false,
        isCorrect: false,
        feedback: "❌ BŁĄD! Maści na skórę nie penetrują do przestrzeni okołomigdałkowej; konieczna jest antybiotykoterapia dożylna!"
      },
      {
        text: "Kotrimoksazol podawany doustnie w dawce 480 mg raz na dobę bez leczenia przeciwbólowego i bez drenażu",
        correct: false,
        isCorrect: false,
        feedback: "❌ BŁĄD! Kotrimoksazol w niskiej dawce doustnej nie pokrywa beztlenowców jamy ustnej i jest nieskuteczny w ropniu!"
      },
      {
        text: "Podanie dożylne wlewu z glukozy 20% bez antybiotykoterapii z zaleceniem powstrzymania się od płukania gardła",
        correct: false,
        isCorrect: false,
        feedback: "❌ BŁĄD! Brak antybiotykoterapii w ropniu okołomigdałkowym prowadzi do posocznicy i ropowicy szyi!"
      }
    ];

    c165.lekQuestions[0].options = [
      "Jednostronna asymetria podniebienia z przemieszczeniem języczka na stronę ZDROWĄ oraz obecność szczękościsku (trismus)",
      "Obecność białego nalotu włóknikowego na obu migdałkach podniebiennych przy zachowanej pełnej symetrii gardła",
      "Wzrost temperatury ciała powyżej 38,0°C z dreszczami przy prawidłowym otwieraniu ust i symetrycznym języczku",
      "Przekrwienie błony śluzowej tylnej ściany gardła z obecnością pojedynczych grudek chłonnych bez asymetrii łuków",
      "Powiększenie węzłów chłonnych podżuchwowych bez dolegliwości bólowych przy połykaniu śliny i płynów"
    ];
    c165.lekQuestions[0].opts = [...c165.lekQuestions[0].options];

    c165.lekQuestions[5].options = [
      "Zakrzepowe zapalenie żyły szyjnej wewnętrznej z posocznicą i septycznymi zatorami w płucach (Fusobacterium necrophorum)",
      "Pęknięcie aorty wstępującej w wyniku zapalenia migdałków z następowym wstrząsem kardiogennym i zgonem",
      "Obrzęk naczynioruchowy Quinckego wywołany wrodzonym niedoborem inhibitora esterazy C1 w surowicy krwi",
      "Przewlekłe zapalenie ucha środkowego z perlakiem piramidy kości skroniowej i porażeniem nerwu twarzowego",
      "Ziarniniakowatość z zapaleniem naczyń (dawniej ziarniniak Wegenera) z zajęciem górnych dróg oddechowych"
    ];
    c165.lekQuestions[5].opts = [...c165.lekQuestions[5].options];

    c165.lekQuestions[6].options = [
      "Aby wypływająca pod ciśnieniem treść ropna i krew wypłynęły na zewnątrz do miski, a nie zostały zaaspirowane do tchawicy",
      "W celu szybkiego obniżenia ciśnienia w tętnicach szyjnych i zapobieżenia krwotokowi z tętnicy językowej",
      "Aby ułatwić zamknięcie nacięcia przez mięśnie języka bezpośrednio po zakończeniu zabiegu drenażu",
      "W celu zapobieżenia odwarstwieniu siatkówki oka wywołanemu wzrostem ciśnienia śródczaszkowego",
      "Pozycja głowy nie ma żadnego znaczenia dla bezpieczeństwa dróg oddechowych podczas drenażu gardła"
    ];
    c165.lekQuestions[6].opts = [...c165.lekQuestions[6].options];

    c165.lekQuestions[8].options = [
      "Nerw językowo-gardłowy (IX nerw czaszkowy przez gałąź bębenkową / nerw Jacobsona)",
      "Nerw odwodzący (VI nerw czaszkowy zaopatrujący mięsień prosty boczny oka)",
      "Nerw węchowy (I nerw czaszkowy odbierający bodźce węchowe z nabłonka nosa)",
      "Nerw dodatkowy (XI nerw czaszkowy unerwiający mięsień mostkowo-obojczykowy)",
      "Nerw bloczkowy (IV nerw czaszkowy unerwiający mięsień skośny górny gałki ocznej)"
    ];
    c165.lekQuestions[8].opts = [...c165.lekQuestions[8].options];

    c165.lekQuestions.forEach(q => {
      q.opts = [...q.options];
      q.q = q.question;
      q.correct = q.correctIdx;
      q.expl = q.exp;
      q.explanation = q.exp;
    });

    const enc165 = await encryptStringAes(JSON.stringify(c165, null, 2), MASTER_KEY);
    fs.writeFileSync('cases/165_ropien_okolomigdalkowy.json', JSON.stringify(enc165, null, 2), 'utf8');
    console.log("✓ Fixed 165");
  }

  console.log("All targeted cases fixed and re-encrypted successfully!");
}

fix().catch(console.error);

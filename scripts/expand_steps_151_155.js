const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const MASTER_KEY = '@LEKSzymon28111999';

async function deriveAesKey(password, salt) {
  const enc = new TextEncoder();
  const baseKey = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveKey']);
  return crypto.subtle.deriveKey({ name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' }, baseKey, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']);
}

async function decrypt(data, password) {
  const salt = Buffer.from(data.salt, 'base64');
  const iv = Buffer.from(data.iv, 'base64');
  const key = await deriveAesKey(password, salt);
  const decrypted = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, Buffer.from(data.ciphertext, 'base64'));
  return JSON.parse(new TextDecoder().decode(decrypted));
}

async function encrypt(obj, password) {
  const salt = crypto.randomBytes(16);
  const iv = crypto.randomBytes(12);
  const key = await deriveAesKey(password, salt);
  const plaintext = new TextEncoder().encode(JSON.stringify(obj));
  const ciphertext = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, plaintext);
  return {
    encrypted: true,
    algorithm: 'AES-256-GCM',
    iterations: 100000,
    salt: Buffer.from(salt).toString('base64'),
    iv: Buffer.from(iv).toString('base64'),
    ciphertext: Buffer.from(ciphertext).toString('base64')
  };
}

function verifyStepBalance(steps, caseId) {
  steps.forEach((s, idx) => {
    const lens = s.options.map(o => o.text.length);
    const max = Math.max(...lens);
    const min = Math.min(...lens);
    const ratio = max / min;
    if (ratio >= 1.5) {
      console.warn(`[WARN] Case ${caseId} Step ${idx + 1} ratio: ${ratio.toFixed(2)} (Min: ${min}, Max: ${max})`);
    }
  });
}

// BATCH 1: CASES 151 - 155 (8 STEPS EACH)
const batch1Steps = {
  151: [
    {
      title: "Krok 1: Wstępna ocena ABCDE i natychmiastowe przerwanie napadu drgawek",
      desc: "31-letnia ciężarna w 34. Hbd trafia na salę R z aktywnym uogólnionym napadem drgawkowym toniczno-klonicznym. Występuje sinica obwodowa, a ciśnienie tętnicze wynosi 185/115 mmHg.",
      options: [
        {
          text: "Zabezpieczenie drożności dróg oddechowych, tlenoterapia bierna, ułożenie na lewym boku oraz podanie siarczanu magnezu 4–6 g i.v. w powolnym wlewie przez 15 minut.",
          isCorrect: true,
          feedback: "Prawidłowo! Siarczan magnezu (MgSO4) to lek z wyboru w przerwaniu i profilaktyce napadów rzucawki (skuteczniejszy niż fenytoina i benzodiazepiny)."
        },
        {
          text: "Podanie diazepamu w szybkim bolusie dożylnym 10 mg w celu relaksacji mięśniowej, a następnie natychmiastowe wdrożenie wlewu fenytoiny w dawce nasycającej.",
          isCorrect: false,
          feedback: "Błąd. Benzodiazepiny i fenytoina są lekami drugiego rzutu o gorszej skuteczności w rzucawce i nasilają depresję oddechową noworodka."
        },
        {
          text: "Wykonanie natychmiastowego znieczulenia podpajęczynówkowego i przewiezienie pacjentki na blok operacyjny bez wcześniejszej stabilizacji hemodynamicznej.",
          isCorrect: false,
          feedback: "Błąd. Znieczulenie regionalne podczas drgawek i ciężkiej niestabilności jest bezwzględnie przeciwwskazane; priorytetem jest opanowanie napadu."
        },
        {
          text: "Wdrożenie agresywnej hiperwentylacji workiem z maską oraz szybki wlew 1500 ml 0,9% NaCl w celu szybkiej ekspansji wolemii i rozcieńczenia leków we krwi.",
          isCorrect: false,
          feedback: "Błąd. Ciężarne z preeklampsją mają wysokie ryzyko obrzęku płuc i mózgu; niekontrolowana płynoterapia grozi załamaniem oddechowym."
        }
      ]
    },
    {
      title: "Krok 2: Pilna farmakoterapia hipotensyjna w stanie przedrzucawkowym",
      desc: "Napad drgawek ustąpił po podaniu siarczanu magnezu. Parametry: RR 185/115 mmHg, HR 105/min. Utrzymujące się nadciśnienie grozi udarem krwotocznym u pacjentki.",
      options: [
        {
          text: "Podanie labetalolu 20 mg i.v. w powolnym wstrzyknięciu (lub hydralazyny 5–10 mg i.v.), dążąc do stopniowego obniżenia ciśnienia skurczowego do 140–150 mmHg.",
          isCorrect: true,
          feedback: "Prawidłowo! Labetalol i hydralazyna to leki I rzutu. Celem jest obniżenie ciśnienia bez wywołania hipotonii, która upośledziłaby przepływ łożyskowy."
        },
        {
          text: "Zastosowanie nitroprusydku sodu w szybkim wlewie kroplowym w celu zbicia ciśnienia tętniczego poniżej 110/70 mmHg w czasie krótszym niż 10 minut.",
          isCorrect: false,
          feedback: "Błąd. Nitroprusydek sodu stwarza wysokie ryzyko zatrucia cyjankami u płodu, a zbyt gwałtowny spadek ciśnienia prowadzi do zawału łożyska."
        },
        {
          text: "Wdrożenie dożylnego inhibitora ACE (enalaprylu 10 mg i.v.) w celu natychmiastowej blokady układu renina-angiotensyna oraz ochrony kłębuszków nerkowych.",
          isCorrect: false,
          feedback: "Błąd. Inhibitory ACE i sartany są bezwzględnie teratogenne i przeciwwskazane w ciąży (powodują ciężką fetopatię i bezmocz u płodu)."
        },
        {
          text: "Podanie podjęzykowej nifedypiny w postaci kropli o natychmiastowym uwalnianiu bez zakładania monitorowania ciśnienia tętniczego metodą ciągłą.",
          isCorrect: false,
          feedback: "Błąd. Krótkodziałająca nifedypina w kroplach wywołuje niekontrolowany spadek ciśnienia, zapaść hemodynamiczną i niedotlenienie wewnątrzmaciczne."
        }
      ]
    },
    {
      title: "Krok 3: Ciągła wlewowa profilaktyka przeciwdrgawkowa",
      desc: "Po opanowaniu ostrego napadu rzucawki należy zapobiec kolejnym epizodom drgawkowym w ciągu najbliższych 24 godzin dyżuru.",
      options: [
        {
          text: "Włączenie ciągłego wlewu dożylnego siarczanu magnezu w dawce 1–2 g/h przez minimum 24 godziny od wystąpienia ostatniego napadu drgawek lub porodu.",
          isCorrect: true,
          feedback: "Prawidłowo! Wlew podtrzymujący MgSO4 1–2 g/h pod ścisłą kontrolą kliniczną musi trwać co najmniej 24 godziny po ustąpieniu napadu lub ukończeniu ciąży."
        },
        {
          text: "Całkowite odstawienie siarczanu magnezu po ustąpieniu drgawek i przejście na doustną karbamazepinę podawaną przez zgłębnik żołądkowy do jelita.",
          isCorrect: false,
          feedback: "Błąd. Ryzyko nawrotu drgawek rzucawkowych w pierwszej dobie jest wysokie; zaprzestanie magnezoterapii skutkuje nawrotem drgawek."
        },
        {
          text: "Wdrożenie ciągłego wlewu tiopentalu sodu w dawkach anestetycznych z koniecznością natychmiastowej intubacji i wprowadzenia w głęboką śpiączkę.",
          isCorrect: false,
          feedback: "Błąd. Barbiturany nie są lekami z wyboru w profilaktyce rzucawki; niosą ryzyko ciężkiej depresji oddechowej u noworodka i zapaści krążenia."
        },
        {
          text: "Zastąpienie magnezu kwasem walproinowym w dawce dobowej 1500 mg w celu stabilizacji błon neuronalnych i zapobiegania wyładowaniom w mózgu.",
          isCorrect: false,
          feedback: "Błąd. Kwas walproinowy jest teratogenny i nieskuteczny w doraźnym opanowywaniu patomechanizmu naczyniowego rzucawki."
        }
      ]
    },
    {
      title: "Krok 4: Diagnostyka laboratoryjna CITO powikłań narządowych (Ocena zespołu HELLP)",
      desc: "Pobrano krew na badania pilne. Jakie parametry laboratoryjne mają kluczowe znaczenie dla wykluczenia zespołu HELLP i koagulopatii?",
      options: [
        {
          text: "Morfologia z płytkami krwi, rozmaz krwi (schistocyty), enzymy wątrobowe (AspAT, AlAT), dehydrogenaza mleczanowa (LDH), bilirubina oraz koagulogram.",
          isCorrect: true,
          feedback: "Prawidłowo! Triada zespołu HELLP to hemoliza mikroangiopatyczna (wzrost LDH, schistocyty), podwyższenie enzymów wątrobowych i trombocytopenia."
        },
        {
          text: "Izolowane oznaczenie stężenia troponiny sercowej i kinazy kreatynowej bez konieczności powtarzania morfologii ani parametrów układu krzepnięcia krwi.",
          isCorrect: false,
          feedback: "Błąd. Kluczowe powikłania narządowe stanu przedrzucawkowego to DIC, mikroangiopatia i pęknięcie podtorebkowego krwiaka wątroby."
        },
        {
          text: "Oznaczenie wyłącznie stężenia białka w dobowej zbiórce moczu przed podjęciem jakichkolwiek dalszych decyzji terapeutycznych i diagnostycznych na SOR.",
          isCorrect: false,
          feedback: "Błąd. Dobowa zbiórka moczu w stanie ostrym niepotrzebnie opóźnia leczenie; białkomocz ocenia się testem paskowym, a stan narządów z krwi."
        },
        {
          text: "Wykonanie nakłucia lędźwiowego w celu wykluczenia krwawienia podpajęczynówkowego przed oceną badań hematologicznych i biochemicznych z krwi obwodowej.",
          isCorrect: false,
          feedback: "Błąd. Nakłucie lędźwiowe bez znajomości liczby płytek krwi i koagulogramu niesie ryzyko krwawienia do kanału kręgowego i krwiaka uciskowego."
        }
      ]
    },
    {
      title: "Krok 5: Ocena dobrostanu płodu i kardiomiografia CITO",
      desc: "Podłączono ciągłe monitorowanie KTG. Zapis wykazuje bradykardię płodu 95/min trwającą od 3 minut, po czym pojawiają się deceleracje późne. Jak postąpić?",
      options: [
        {
          text: "Rozpoznanie ostrego zagrożenia zamartwicą płodu w mechanizmie hipoksji maciczno-łożyskowej, kontynuacja tlenoterapii matki i pilne wezwanie położników.",
          isCorrect: true,
          feedback: "Prawidłowo! Skurcz naczyń łożyskowych podczas rzucawki prowadzi do hipoksji płodu. Wymaga to natychmiastowej tlenoterapii i przygotowania do pilnego cięcia."
        },
        {
          text: "Uznanie zapisu za całkowicie fizjologiczną reakcję płodu na podanie siarczanu magnezu bez konieczności interwencji położniczej na dyżurze SOR.",
          isCorrect: false,
          feedback: "Błąd. Utrzymujące się deceleracje późne i bradykardia świadczą o dekompensacji oddechowej łożyska i bezpośrednim ryzyku zgonu wewnątrzmacicznego."
        },
        {
          text: "Wdrożenie natychmiastowej tokolizy dożylnej fenoterolem w celu wyciszenia czynności skurczowej macicy przed podjęciem decyzji o operacji.",
          isCorrect: false,
          feedback: "Błąd. Beta-mimetyki w ciężkim stanie przedrzucawkowym z tachykardią i nadciśnieniem są przeciwwskazane i wywołują ostry obrzęk płuc u ciężarnej."
        },
        {
          text: "Zalecenie natychmiastowej indukcji porodu drogami natury z intensywnym wlewem oksytocyny niezależnie od dojrzałości szyjki macicy pacjentki.",
          isCorrect: false,
          feedback: "Błąd. W stanie ostrego zagrożenia rzucawkowego u pierwiastki z niedojrzałą szyjką indukcja oksytocyną jest rażącym błędem i nasila hipoksję."
        }
      ]
    },
    {
      title: "Krok 6: Monitorowanie bezpieczeństwa magnezoterapii i postępowanie w powikłaniach",
      desc: "Podczas wlewu MgSO4 stwierdzono: zniesienie odruchów kolanowych, spadek częstości oddechów do 9/min i oligurię 15 ml/h. Jaka jest natychmiastowa reakcja?",
      options: [
        {
          text: "Natychmiastowe zatrzymanie wlewu siarczanu magnezu i powolne dożylne podanie 10 ml 10% glukonianu wapnia (antidotum) w ciągu 5–10 minut pod kontrolą EKG.",
          isCorrect: true,
          feedback: "Prawidłowo! Objawy wskazują na zatrucie magnezem (arefleksja, depresja oddechowa). Glukonian wapnia jest bezpośrednim fizjologicznym antagonistą jonów magnezu."
        },
        {
          text: "Podwojenie przepływu wlewu siarczanu magnezu i podanie furosemidu w bolusie 40 mg i.v. w celu wymuszenia diurezy nerkowej bez odstawiania magnezu.",
          isCorrect: false,
          feedback: "Błąd. Dalsze podawanie magnezu doprowadzi do zatrzymania krążenia w asystolii. Furosemid dodatkowo nasili hipowolemię naczyniową u ciężarnej."
        },
        {
          text: "Podanie naloksonu 0,4 mg i.v. w celu odwrócenia depresji ośrodka oddechowego przy podejrzeniu współistniejącego zatrucia opioidami u ciężarnej.",
          isCorrect: false,
          feedback: "Błąd. Przyczyną depresji oddechowej jest hipermagnezemia blokująca złącze nerwowo-mięśniowe, a nie opioidy; lekiem z wyboru jest glukonian wapnia."
        },
        {
          text: "Wdrożenie pilnej hemodializy jako jedynego skutecznego sposobu eliminacji jonów magnezu z ustroju bez podawania jakichkolwiek leków dożylnych.",
          isCorrect: false,
          feedback: "Błąd. Dializoterapia jest ostatecznością; w warunkach ostrych glukonian wapnia natychmiastowo blokuje toksyczny wpływ magnezu na złącza nerwowo-mięśniowe."
        }
      ]
    },
    {
      title: "Krok 7: Płucna dojrzałość płodu i decyzja o sterydoterapii prenatalnej",
      desc: "Wiek ciążowy wynosi 34 tygodnie. Czy w obliczu rzucawki należy opóźniać ukończenie ciąży w celu ukończenia pełnego cyklu sterydoterapii prenatalnej?",
      options: [
        {
          text: "Podanie pierwszej dawki betametazonu (12 mg i.m.), lecz bez jakiegokolwiek opóźniania pilnego ukończenia ciąży po wstępnej stabilizacji parametrów matki.",
          isCorrect: true,
          feedback: "Prawidłowo! W przypadku rzucawki priorytetem bezwzględnym jest ratowanie życia matki. Ukończenie ciąży nie może być odraczane dla pełnego cyklu sterydów."
        },
        {
          text: "Odrocznie porodu o co najmniej 48 godzin do czasu podania dwóch dawek betametazonu w odstępie 24 godzin, bez względu na dynamikę objawów matczynych.",
          isCorrect: false,
          feedback: "Błąd. Odroczenie porodu u niestabilnej pacjentki z rzucawką stwarza śmiertelne zagrożenie udarem krwotocznym, pęknięciem wątroby lub zgonem płodu."
        },
        {
          text: "Całkowita rezygnacja z podawania glikokortykosteroidów ze względu na bezwzględne przeciwwskazanie do ich stosowania w jakimkolwiek stadium nadciśnienia ciążowego.",
          isCorrect: false,
          feedback: "Błąd. Sterydoterapia prenatalna nie jest przeciwwskazana w preeklampsji; zmniejsza ryzyko RDS i krwawień dokomorowych u wcześniaka."
        },
        {
          text: "Zastosowanie deksametazonu w dożylnym wlewie ciągłym przez 7 dni w dawkach immunosupresyjnych w celu zahamowania uogólnionego zapalenia śródbłonka.",
          isCorrect: false,
          feedback: "Błąd. Protokół sterydoterapii prenatalnej to 2x 12 mg betametazonu i.m. co 24 h lub 4x 6 mg deksametazonu i.m. co 12 h; wlewy dożylne nie mają wskazań."
        }
      ]
    },
    {
      title: "Krok 8: Definitywne ukończenie ciąży i dyspozycja końcowa",
      desc: "Uzyskano stabilizację ciśnienia (RR 145/95 mmHg) po glukonianie wapnia i labetalolu. Zespół anestezjologiczno-położniczy jest w pełnej gotowości. Jaka jest dyspozycja?",
      options: [
        {
          text: "Pilne rozwiązanie ciąży drogą cięcia cesarskiego w znieczuleniu ogólnym (lub regionalnym po ocenie koagulogramu), a następnie hospitalizacja matki na OIT/OCP.",
          isCorrect: true,
          feedback: "Prawidłowo! Ukończenie ciąży jest jedynym przyczynowym leczeniem rzucawki. Po operacji konieczny jest ciągły nadzór na OIT lub sali intensywnego nadzoru."
        },
        {
          text: "Wypisanie pacjentki do domu z zaleceniem odpoczynku w łóżku i kontroli ciśnienia tętniczego w poradni rejonowej po 7 dniach od ustąpienia drgawek.",
          isCorrect: false,
          feedback: "Błąd. Rzucawka to stan bezpośredniego zagrożenia życia obojga pacjentów; wypisanie pacjentki byłoby rażącym błędem o skutkach śmiertelnych."
        },
        {
          text: "Przeniesienie na ogólny oddział patologii ciąży bez monitorowania kardiomonitorem i próba utrzymania ciąży do planowego terminu porodu w 40. Hbd.",
          isCorrect: false,
          feedback: "Błąd. W rzucawce w 34. Hbd po stabilizacji należy pilnie ukończyć ciążę; odraczanie do 40. Hbd wiąże się ze skrajnym ryzykiem zgonu matki i dziecka."
        },
        {
          text: "Wdrożenie wielolekowej sedacji benzodiazepinami i barbituranami w warunkach oddziału neurologicznego bez udziału zespołu położniczego i neonatologicznego.",
          isCorrect: false,
          feedback: "Błąd. Rzucawka jest chorobą łożyskową, a nie pierwotną padaczką; wymaga natychmiastowej współpracy położnika, neonatologa i anestezjologa."
        }
      ]
    }
  ],

  152: [
    {
      title: "Krok 1: Wstępna ocena ABCDE i rozpoznanie ostrego brzucha w III trymestrze",
      desc: "34-latka w 35. Hbd przywieziona z nagłym bólem brzucha, deskowato napiętą, bolesną macicą, krwawieniem z dróg rodnych i ciśnieniem 90/55 mmHg, HR 120/min.",
      options: [
        {
          text: "Tlenoterapia bierna, założenie dwóch kaniul dożylnych o dużym przekroju (14–16G), pobranie krwi na próbę krzyżową i natychmiastowy wlew zbilansowanych krystaloidów.",
          isCorrect: true,
          feedback: "Prawidłowo! Obraz kliniczny wskazuje na przedwczesne oddzielenie łożyska (abruptio placentae) z rozwijającym się wstrząsem hipowolemicznym."
        },
        {
          text: "Podanie doustnych leków rozkurczowych (drotaweryny 80 mg) i zalecenie odpoczynku na plecach w oczekiwaniu na planową wizytę lekarza dyżurnego oddziału.",
          isCorrect: false,
          feedback: "Błąd. Deskowaty brzuch, krwawienie i tachykardia to stan bezpośredniego zagrożenia życia; pozycja na wznak nasila zespół aortalno-czczy i wstrząs."
        },
        {
          text: "Natychmiastowe wykonanie badania palpacyjnego przez pochwę dwoma palcami w celu oceny rozwarcia szyjki przed założeniem jakiegokolwiek dostępu naczyniowego.",
          isCorrect: false,
          feedback: "Błąd. Badanie wewnętrzne przed badaniem obrazowym jest niebezpieczne, a opóźnianie resuscytacji naczyniowej pogłębia wstrząs hipowolemiczny."
        },
        {
          text: "Wdrożenie agresywnej sedacji morfiną w dawce 20 mg i.v. i wstrzymanie płynoterapii dożylnej z obawy przed wystąpieniem ostrego obrzęku płuc u ciężarnej.",
          isCorrect: false,
          feedback: "Błąd. Wstrzymanie płynoterapii we wstrząsie krwotocznym doprowadzi do zatrzymania krążenia; analgezja nie może zastępować resuscytacji wolemicznej."
        }
      ]
    },
    {
      title: "Krok 2: Badanie przedmiotowe i bezpieczeństwo diagnostyczne",
      desc: "Pacjentka krwawi z dróg rodnych. Młodszy rezydent zamierza wykonać energiczne badanie wewnętrzne przez pochwę, aby ocenić rozwarcie. Jaka jest Twoja decyzja?",
      options: [
        {
          text: "Zatrzymanie badania palcowego przez pochwę; wykonanie ostrożnego badania we wziernikach oraz pilnego przyłóżkowego USG w celu oceny lokalizacji łożyska.",
          isCorrect: true,
          feedback: "Prawidłowo! W krwawieniu z dróg rodnych w III trymestrze badanie palpacyjne przez pochwę jest przeciwwskazane do czasu wykluczenia łożyska przodującego w USG."
        },
        {
          text: "Wyrażenie zgody na badanie palcowe przez pochwę i polecenie energicznego poszukiwania pęcherza płodowego bez wykonywania jakichkolwiek badań obrazowych.",
          isCorrect: false,
          feedback: "Błąd. Jeśli krwawienie wynika z łożyska przodującego, badanie palcowe może przebić naczynia łożyska i doprowadzić do śmiertelnego krwotoku w ciągu 2 minut."
        },
        {
          text: "Zlecenie pilnego badania rezonansu magnetycznego (MR) miednicy z kontrastem gadolinowym i wstrzymanie diagnostyki USG do czasu wykonania rezonansu.",
          isCorrect: false,
          feedback: "Błąd. W stanie nagłym rezonans magnetyczny jest zbyt czasochłonny i opóźnia ratujące życie cięcie cesarskie; USG przyłóżkowe wykonuje się natychmiast."
        },
        {
          text: "Zastosowanie tamponady pochwy gęstymi gazikami nasączonymi alkoholem w celu miejscowego zatamowania krwawienia przed badaniem USG jamy brzusznej.",
          isCorrect: false,
          feedback: "Błąd. Tamponada pochwy nie zatamuje krwotoku z jamy macicy, maskuje objętość utraty krwi i jest błędem w zaawansowanej ciąży."
        }
      ]
    },
    {
      title: "Krok 3: Ocena dobrostanu płodu i zapis KTG CITO",
      desc: "Podłączono aparat KTG. Zapis rejestruje bradykardię płodu 80/min z utratą zmienności oraz częste skurcze tężcowe macicy o wysokim napięciu spoczynkowym. Co to oznacza?",
      options: [
        {
          text: "Ciężkie niedotlenienie płodu wynikające z utraty powierzchni wymiany gazowej przez odklejone łożysko; bezwzględne wskazanie do natychmiastowego cięcia cesarskiego.",
          isCorrect: true,
          feedback: "Prawidłowo! Tężcowy skurcz macicy i głęboka bradykardia płodu świadczą o odklejeniu znacznej części łożyska i krytycznej hipoksji płodu."
        },
        {
          text: "Fizjologiczny sen płodu wywołany spadkiem ciśnienia tętniczego u matki; zalecenie podania słodkiego napoju i powtórzenia zapisu za 60 minut.",
          isCorrect: false,
          feedback: "Błąd. Bradykardia 80/min i tężcowy skurcz macicy to stan agonalny płodu; jakiekolwiek wyczekiwanie doprowadzi do wewnątrzmacicznego zgonu."
        },
        {
          text: "Wdrożenie stałego wlewu oksytocyny w celu dalszego przyspieszenia akcji porodowej i próby szybkiego zakończenia porodu drogami natury na sali SOR.",
          isCorrect: false,
          feedback: "Błąd. Podanie oksytocyny na tężcowo napiętą macicę grozi jej natychmiastowym pęknięciem, całkowitym odklejeniem łożyska i zgonem matki i płodu."
        },
        {
          text: "Podanie dożylne siarczanu magnezu w dawce 20 g w bolusie w celu natychmiastowego zwiotczenia mięśnia macicy bez planowania zabiegu operacyjnego.",
          isCorrect: false,
          feedback: "Błąd. Taka dawka magnezu wywołałaby zgon matki z porażenia oddechowego i asystolii, a odklejenie łożyska wymaga leczenia operacyjnego."
        }
      ]
    },
    {
      title: "Krok 4: Koagulopatia ze zużycia i ryzyko zespołu DIC",
      desc: "Przedwczesne odklejenie łożyska wiąże się z masywnym wyrzutem tromboplastyny tkankowej do krążenia matki. Jakie badania koagulologiczne należy pilnie ocenić?",
      options: [
        {
          text: "Stężenie fibrynogenu (krytyczny próg < 2 g/l), czas protrombinowy (INR), APTT, liczbę płytek krwi oraz stężenie D-dimerów w surowicy krwi.",
          isCorrect: true,
          feedback: "Prawidłowo! Odklejenie łożyska to najczęstsza przyczyna ostrego DIC w położnictwie. Spadek fibrynogenu < 2 g/l świadczy o krytycznym zużyciu czynników krzepnięcia."
        },
        {
          text: "Wyłącznie czas krzepnięcia krwi pełnej metodą szkiełkową Lee-White'a bez konieczności pobierania krwi na badania laboratoryjne z analizatora.",
          isCorrect: false,
          feedback: "Błąd. Choć test szkiełkowy ma wartość orientacyjną, w szpitalu konieczne są precyzyjne oznaczenia fibrynogenu i płytek w celu celowanej substytucji."
        },
        {
          text: "Oznaczenie aktywności białka C i białka S oraz mutacji czynnika V Leiden przed podjęciem jakichkolwiek decyzji o przetoczeniu preparatów krwi.",
          isCorrect: false,
          feedback: "Błąd. Diagnostyka wrodzonych trombofilii w ostrym krwotoku jest całkowicie niemiarodajna i bezużyteczna dla ratowania życia pacjentki."
        },
        {
          text: "Izolowane badanie poziomu witaminy K w surowicy i wstrzymanie transfuzji preparatów krwiopochodnych do czasu uzyskania wyniku za 48 godzin.",
          isCorrect: false,
          feedback: "Błąd. DIC w odklejeniu łożyska to ostry proces konsumpcyjny; zwłoka w ocenie fibrynogenu i płytek grozi niekontrolowanym wykrwawieniem."
        }
      ]
    },
    {
      title: "Krok 5: Resuscytacja hemostatyczna i kwas traneksamowy (TXA)",
      desc: "Krwawienie z dróg rodnych nasila się, a krew nie tworzy skrzepów w probówce. Fibrynogen wynosi 1,2 g/l. Jakie leczenie hemostatyczne należy wdrożyć natychmiast?",
      options: [
        {
          text: "Podanie kwasu traneksamowego 1 g i.v. w ciągu 10 minut, uruchomienie protokołu masywnej transfuzji (MTP) oraz podanie koncentratu fibrynogenu lub krioprecypitatu.",
          isCorrect: true,
          feedback: "Prawidłowo! Kwas traneksamowy hamuje hiperfibrynolizę, a fibrynogen (cel > 2 g/l) jest kluczowym substratem hemostazy w krwotoku położniczym."
        },
        {
          text: "Wdrożenie wlewu heparyny niefrakcjonowanej w pełnej dawce terapeutycznej 1000 j./h w celu zahamowania powstawania mikrozakrzepów w łożysku naczyniowym.",
          isCorrect: false,
          feedback: "Błąd. Podanie heparyny w trakcie aktywnego, masywnego krwotoku położniczego doprowadzi do natychmiastowego zgonu pacjentki z wykrwawienia."
        },
        {
          text: "Przetoczenie wyłącznie płynów hipotonicznych (5% glukozy w objętości 3000 ml) w celu szybkiego wypłukania toksyn tkankowych z krążenia matki.",
          isCorrect: false,
          feedback: "Błąd. Płyny hipotoniczne wywołają hemolizę, obrzęk mózgu i skrajną koagulopatię z rozcieńczenia; wymagana jest krew, osocze i fibrynogen."
        },
        {
          text: "Podanie rekombinowanego aktywowanego czynnika VII (rFVIIa) jako pierwszego i jedynego leku hemostatycznego przed podaniem fibrynogenu i krwinek czerwonych.",
          isCorrect: false,
          feedback: "Błąd. Czynnik VIIa jest lekiem ostatniej szansy; jest nieskuteczny przy braku fibrynogenu, płytek krwi i przy głębokiej kwasicy."
        }
      ]
    },
    {
      title: "Krok 6: Zabezpieczenie hemodynamiczne i dobór znieczulenia do operacji",
      desc: "Pacjentka trafia na salę operacyjną w stanie wstrząsu. RR 85/50 mmHg, zaburzenia krzepnięcia krwi. Jaki rodzaj znieczulenia powinien wybrać anestezjolog?",
      options: [
        {
          text: "Znieczulenie ogólne z intubacją dotchawiczą w sekwencji szybkiej indukcji (RSI); znieczulenie regionalne jest bezwzględnie przeciwwskazane z powodu koagulopatii.",
          isCorrect: true,
          feedback: "Prawidłowo! Zaburzenia krzepnięcia (DIC, małopłytkowość, fibrynogen < 2 g/l) i wstrząs hipowolemiczny bezwzględnie wykluczają znieczulenie podpajęczynówkowe."
        },
        {
          text: "Znieczulenie podpajęczynówkowe jednorazowe cienką igłą z zamiarem uniknięcia leków wpływających depresyjnie na ośrodek oddechowy noworodka.",
          isCorrect: false,
          feedback: "Błąd. Wykonanie punkcji podpajęczynówkowej przy DIC i małopłytkowości grozi masywnym krwiakiem kanału kręgowego i trwałym porażeniem poprzecznym."
        },
        {
          text: "Znieczulenie miejscowe powłok brzusznych lignokainą i wykonanie cięcia cesarskiego bez udziału lekarza anestezjologa w sali opatrunkowej SOR.",
          isCorrect: false,
          feedback: "Błąd. Cięcie cesarskie w znieczuleniu miejscowym we wstrząsie krwotocznym to postępowanie niehumanitarne, niebezpieczne i niedopuszczalne."
        },
        {
          text: "Podanie wyłącznie wziewnego podtlenku azotu (sedacja gazowa) przez maskę twarzową bez zabezpieczenia drożności dróg oddechowych rurką intubacyjną.",
          isCorrect: false,
          feedback: "Błąd. Ciężarna we wstrząsie ma pełny żołądek; brak rurki intubacyjnej z uszczelnionym mankietem grozi śmiertelną aspiracją treści żołądkowej (zespół Mendelsona)."
        }
      ]
    },
    {
      title: "Krok 7: Śródoperacyjna hemostaza i macica Couvelaire'a",
      desc: "Podczas cięcia cesarskiego wydobyto żywego noworodka (przekazany neonatologom). Mięsień macicy jest sinofioletowy, marmurkowaty, z apopleksją krwi (macica Couvelaire'a) i wiotki.",
      options: [
        {
          text: "Masaż macicy, podanie leków kurczących (oksytocyna, karboprost), założenie szwów uciskowych B-Lyncha, a w razie braku hemostazy – histerektomia ratunkowa.",
          isCorrect: true,
          feedback: "Prawidłowo! Macica Couvelaire'a wynika z wynaczynienia krwi do myometrium. Leczenie rozpoczyna się od uterotoników i szwów kompresyjnych; przy braku hemostazy usuwa się macicę."
        },
        {
          text: "Natychmiastowe zszycie powłok brzusznych bez oceny kurczliwości macicy i przeniesienie pacjentki na salę ogólną z zaleceniem okładów z lodu na brzuch.",
          isCorrect: false,
          feedback: "Błąd. Wiotka macica Couvelaire'a po zamknięciu powłok natychmiast wypełni się krwią, doprowadzając do zgonu pacjentki w mechanizmie skrytego krwotoku."
        },
        {
          text: "Ostrzyknięcie mięśnia macicy 100 mg papaweryny w celu całkowitego rozszerzenia naczyń krwionośnych i wypłukania wynaczynionych krwinek czerwonych.",
          isCorrect: false,
          feedback: "Błąd. Papaweryna rozkurcza naczynia i mięśnie gładkie, co nasiliłoby atonię i krwotok do rozmiarów niemożliwych do opanowania."
        },
        {
          text: "Podanie dożylne 100 mg deksametazonu w celu przyspieszenia regeneracji włókien mięśniowych macicy i natychmiastowe zakończenie operacji.",
          isCorrect: false,
          feedback: "Błąd. Sterydy nie mają działania obkurczającego macicę; podstawą opanowania krwotoku są uterotoniki, szwy uciskowe i hemostaza chirurgiczna."
        }
      ]
    },
    {
      title: "Krok 8: Stabilizacja pooperacyjna i dyspozycja oddziałowa",
      desc: "Uzyskano zadowalającą hemostazę po założeniu szwów uciskowych. Pacjentka otrzymała 4 jedn. KKCz, 4 jedn. FFP i 2 g fibrynogenu. Jaka jest dyspozycja końcowa?",
      options: [
        {
          text: "Przekazanie zaintubowanej pacjentki na Oddział Anestezjologii i Intensywnej Terapii (OIT) w celu kontynuacji leczenia DIC, stabilizacji wolemii i ekstubacji.",
          isCorrect: true,
          feedback: "Prawidłowo! Pacjentka po ciężkim wstrząsie krwotocznym i powikłanym DIC wymaga intensywnego nadzoru wielonarządowego na OIT przez co najmniej 24–48 godzin."
        },
        {
          text: "Przekazanie pacjentki na zwykłą salę oddziału położniczego z zaleceniem kontroli ciśnienia tętniczego co 12 godzin przez personel pielęgniarski.",
          isCorrect: false,
          feedback: "Błąd. Po wstrząsie krwotocznym i DIC pacjentka jest w stanie bezpośredniego zagrożenia nawrotem krwotoku, niewydolnością nerek i ARDS; wymaga OIT."
        },
        {
          text: "Natychmiastowa ekstubacja na sali operacyjnej i wypisanie do domu w drugiej dobie po porodzie bez kontrolnych badań koagulologicznych.",
          isCorrect: false,
          feedback: "Błąd. Przedwczesna ekstubacja niestabilnej pacjentki grozi załamaniem oddechowym; wypis bez kontroli hemostazy jest błędem w sztuce."
        },
        {
          text: "Przeniesienie pacjentki do szpitala uzdrowiskowego w celu natychmiastowej rehabilitacji ruchowej po przebytej operacji położniczej.",
          isCorrect: false,
          feedback: "Błąd. Pacjentka wymaga leczenia stanów zagrożenia życia na oddziale intensywnej terapii, a nie opieki sanatoryjnej."
        }
      ]
    }
  ],

  153: [
    {
      title: "Krok 1: Wstępna ocena ABCDE i różnicowanie krwawienia w III trymestrze",
      desc: "32-latka w 33. Hbd zgłasza się z nagłym, bezbolesnym krwawieniem żywoczerwoną krwią z dróg rodnych. Brzuch jest miękki, niebolesny, RR 110/70 mmHg, HR 85/min.",
      options: [
        {
          text: "Tlenoterapia bierna, założenie dwóch kaniul dożylnych o dużym przekroju (16G), pobranie krwi na grupę, morfologię i koagulogram oraz ścisły reżim łóżkowy.",
          isCorrect: true,
          feedback: "Prawidłowo! Bezbolesne krwawienie żywoczerwoną krwią przy miękkiej, niebolesnej macicy to klasyczny obraz łożyska przodującego (placenta praevia)."
        },
        {
          text: "Natychmiastowe podanie leków przeczyszczających i zachęcanie pacjentki do intensywnego spacerowania w celu stymulacji postępu akcji porodowej.",
          isCorrect: false,
          feedback: "Błąd. W łożysku przodującym wysiłek i pionizacja nasilają krwawienie z naczyń doczesnowych; bezwzględnie obowiązuje reżim łóżkowy."
        },
        {
          text: "Wykonanie próby wysiłkowej na bieżni ruchomej w celu oceny rezerwy wieńcowej i wydolności układu krążenia ciężarnej pacjentki na SOR.",
          isCorrect: false,
          feedback: "Błąd. Próba wysiłkowa u krwawiącej ciężarnej stwarza śmiertelne zagrożenie masywnym krwotokiem łożyskowym i wstrząsem hipowolemicznym."
        },
        {
          text: "Założenie kleszczy porodowych przez nieposzerzoną szyjkę macicy w celu szybkiego wydobycia płodu bez wcześniejszej oceny ultrasonograficznej.",
          isCorrect: false,
          feedback: "Błąd. Próba zabiegu kleszczowego przez zamkniętą szyjkę macicy z łożyskiem przodującym doprowadziłaby do rozerwania macicy i zgonu ciężarnej."
        }
      ]
    },
    {
      title: "Krok 2: Kategoryczny zakaz badania przez pochwę (Noli me tangere)",
      desc: "Lekarz stażysta chce zbadać pacjentkę dwoma palcami przez pochwę, aby ocenić rozwarcie szyjki macicy. Jak należy zareagować?",
      options: [
        {
          text: "Bezwzględne powstrzymanie badania palcowego przez pochwę; badanie to może rozerwać brzeżne zatoki łożyska i wywołać katastrofalny krwotok.",
          isCorrect: true,
          feedback: "Prawidłowo! W każdym przypadku krwawienia w drugiej połowie ciąży badanie wewnętrzne jest bezwzględnie zakazane do czasu wykluczenia łożyska przodującego w USG."
        },
        {
          text: "Zezwolenie na badanie palcowe, ale pod warunkiem użycia dużej ilości żelu poślizgowego z dodatkiem antybiotyku o szerokim spektrum działania.",
          isCorrect: false,
          feedback: "Błąd. Nawet delikatny dotyk palcem tkanki łożyskowej zamykającej ujście wewnętrzne może wywołać krwotok rzucający matkę we wstrząs w ciągu minut."
        },
        {
          text: "Polecenie wykonania biopsji aspiracyjnej endometrium i szyjki macicy w celu wykluczenia procesu nowotworowego dolnego odcinka macicy.",
          isCorrect: false,
          feedback: "Błąd. Biopsja tkanki łożyskowej doprowadziłaby do jatrogennego krwotoku i natychmiastowego zgonu wewnątrzmacicznego płodu."
        },
        {
          text: "Zalecenie wykonania badania histeroskopowego jamy macicy w warunkach gabinetu zabiegowego izby przyjęć bez znieczulenia ogólnego.",
          isCorrect: false,
          feedback: "Błąd. Histeroskopia w zaawansowanej ciąży z krwawieniem jest rażącym błędem sztuki lekarskiej i grozi rozerwaniem łożyska oraz pęcherza płodowego."
        }
      ]
    },
    {
      title: "Krok 3: Diagnostyka obrazowa CITO (Ultrasonografia)",
      desc: "Jakie badanie obrazowe jest złotym standardem w precyzyjnym ustaleniu lokalizacji dolnego brzegu łożyska względem ujścia wewnętrznego szyjki macicy?",
      options: [
        {
          text: "Ostrożne USG przezpochwowe (TVS) z użyciem głowicy dopochwowej wprowadzonej do sklepienia przedniego pod kontrolą wzroku na ekranie aparatu.",
          isCorrect: true,
          feedback: "Prawidłowo! USG transwaginalne (TVS) jest metodą z wyboru o najwyższej czułości i bezpieczeństwie (głowica nie dotyka szyjki macicy)."
        },
        {
          text: "Przeglądowe zdjęcie rentgenowskie jamy brzusznej i miednicy mniejszej (RTG) w dwóch projekcjach z podaniem doustnego kontrastu barytowego.",
          isCorrect: false,
          feedback: "Błąd. RTG miednicy nie pozwala na ocenę tkanek miękkich łożyska, a niepotrzebnie naraża płód na promieniowanie jonizujące."
        },
        {
          text: "Tomografia komputerowa miednicy z wielofazowym kontrastem jodowym i fazą wydalniczą ułożona w protokole angiograficznym tętnic biodrowych.",
          isCorrect: false,
          feedback: "Błąd. Tomografia komputerowa nie jest badaniem pierwszego rzutu u stabilnej ciężarnej z podejrzeniem łożyska przodującego; USG jest w pełni wystarczające."
        },
        {
          text: "Scyntygrafia radioizotopowa z użyciem znakowanych erytrocytów technetem-99m w celu wykrycia ognisk krwawienia w jamie brzusznej.",
          isCorrect: false,
          feedback: "Błąd. Metoda radioizotopowa jest czasochłonna, nieprecyzyjna anatomicznie i przeciwwskazana w ciąży, gdy dostępne jest przyłóżkowe USG."
        }
      ]
    },
    {
      title: "Krok 4: Kardiomiografia płodu i ocena hemodynamiki",
      desc: "USG potwierdziło łożysko przodujące centralnie (placenta praevia totalis). Krwawienie w chwili obecnej znacznie osłabło. Zapis KTG: tętno płodu 140/min, reaktywne. Jak postąpić?",
      options: [
        {
          text: "Postępowanie zachowawcze wyczekujące w warunkach szpitalnych, ścisły reżim łóżkowy, monitorowanie parametrów matki i tętna płodu oraz gotowość do natychmiastowego CC.",
          isCorrect: true,
          feedback: "Prawidłowo! U pacjentki stabilnej przed 34. Hbd przy ustąpieniu krwawienia dąży się do przedłużenia ciąży w celu dojrzałości narządowej płodu."
        },
        {
          text: "Natychmiastowe wykonanie cięcia cesarskiego w ciągu 5 minut bez podawania jakichkolwiek leków przygotowujących płód do porodu przedwczesnego.",
          isCorrect: false,
          feedback: "Błąd. Przy ustąpieniu krwawienia i stabilnych parametrach płodu w 33. Hbd priorytetem jest podanie sterydów przed planowym rozwiązaniem."
        },
        {
          text: "Wypisanie pacjentki do domu w tym samym dniu z zaleceniem powrotu do pracy zawodowej i prowadzenia oszczędzającego trybu życia.",
          isCorrect: false,
          feedback: "Błąd. Łożysko przodujące centralnie z krwawieniem wymaga bezwzględnej hospitalizacji z uwagi na ryzyko nagłego, zagrażającego życiu krwotoku."
        },
        {
          text: "Wdrożenie indukcji porodu drogami natury za pomocą prepidilu żelu podawanego doszyjkowo w celu wywołania rozwarcia szyjki macicy.",
          isCorrect: false,
          feedback: "Błąd. Łożysko przodujące centralne jest bezwzględnym przeciwwskazaniem do porodu drogami natury; próba porodu SN skończyłaby się wykrwawieniem."
        }
      ]
    },
    {
      title: "Krok 5: Tokoliza w przypadku współistniejącej czynności skurczowej",
      desc: "W trakcie hospitalizacji u pacjentki pojawiają się nieregularne skurcze macicy, które nasilają plamienie z dróg rodnych. Jaki lek tokolityczny jest najbezpieczniejszy?",
      options: [
        {
          text: "Antagonista receptorów oksytocyny (atozyban we wlewie i.v.) lub bloker kanałów wapniowych (nifedypina p.o.), unikając leków przyspieszających akcję serca.",
          isCorrect: true,
          feedback: "Prawidłowo! Atozyban charakteryzuje się najlepszym profilem bezpieczeństwa matczynego (nie wywołuje tachykardii ani spadków ciśnienia maskujących wstrząs)."
        },
        {
          text: "Podanie fenoterolu we wlewie o dużej prędkości bez monitorowania tętna matki, pomimo wywoływania przez lek znacznej tachykardii i hipotonii.",
          isCorrect: false,
          feedback: "Błąd. Beta-mimetyki wywołują tachykardię i hipotensję, co maskuje objawy rozwijającego się wstrząsu krwotocznego i grozi obrzękiem płuc."
        },
        {
          text: "Zastosowanie indometacyny doodbytniczo przez 14 dni bez kontroli przewodu tętniczego Botalla w echokardiografii serca płodu.",
          isCorrect: false,
          feedback: "Błąd. NLPZ po 32. Hbd stwarzają wysokie ryzyko przedwczesnego zamknięcia przewodu Botalla u płodu i rozwoju nadciśnienia płucnego."
        },
        {
          text: "Wdrożenie dożylnego wlewu alkoholu etylowego w celu zahamowania uwalniania endogennej wazopresyny i wyciszenia skurczów mięśnia macicy.",
          isCorrect: false,
          feedback: "Błąd. Tokoliza etanolem to historyczna, wysoce toksyczna metoda, bezwzględnie zarzucona we współczesnym położnictwie ze względu na powikłania."
        }
      ]
    },
    {
      title: "Krok 6: Sterydoterapia prenatalna w ciąży niedonoszonej",
      desc: "Pacjentka jest w 33. Hbd. Jakie postępowanie farmakologiczne ma udowodnioną skuteczność w zmniejszaniu powikłań wcześniactwa u noworodka?",
      options: [
        {
          text: "Podanie betametazonu w dawce 12 mg i.m. dwukrotnie w odstępie 24 godzin (lub deksametazonu 6 mg i.m. co 12 h przez 4 dawki) w celu stymulacji surfaktantu.",
          isCorrect: true,
          feedback: "Prawidłowo! Pełny cykl sterydoterapii prenatalnej znamiennie zmniejsza ryzyko zespołu zaburzeń oddychania (RDS), krwawień dokomorowych i zgonu wcześniaka."
        },
        {
          text: "Podanie hydrokortyzonu w dawce 1000 mg dożylnie co 6 godzin przez 10 dni bez względu na wiek ciążowy i dynamikę parametrów klinicznych.",
          isCorrect: false,
          feedback: "Błąd. Hydrokortyzon w wysokich dawkach ma silne działanie mineralokortykoidowe, nasila retencję sodu i nie przechodzi efektywnie przez łożysko."
        },
        {
          text: "Całkowita rezygnacja z podawania glikokortykosteroidów ze względu na rzekome ryzyko bezpośredniego uszkodzenia tkanki łożyskowej.",
          isCorrect: false,
          feedback: "Błąd. Sterydoterapia prenatalna jest złotym standardem opieki perinatalnej u każdej ciężarnej zagrożonej porodem przedwczesnym przed 34. Hbd."
        },
        {
          text: "Podanie pojedynczej dawki prednizonu doustnie w dawce 5 mg rano po posiłku w celu łagodnego pobudzenia układu immunologicznego płodu.",
          isCorrect: false,
          feedback: "Błąd. Prednizon jest metabolizowany w łożysku przez enzym 11beta-HSD2 i nie dociera do płodu w stężeniu stymulującym produkcję surfaktantu."
        }
      ]
    },
    {
      title: "Krok 7: Profilaktyka konfliktu serologicznego (Alloumunizacja Rh)",
      desc: "W badaniach laboratoryjnych ustalono: grupa krwi matki A RhD-ujemna, przeciwciała odpornościowe anty-D ujemne. Jakie postępowanie profilaktyczne należy wdrożyć?",
      options: [
        {
          text: "Podanie immunoglobuliny anty-RhD w dawce 300 µg domięśniowo w ciągu 72 godzin od wystąpienia epizodu krwawienia z dróg rodnych w ciąży.",
          isCorrect: true,
          feedback: "Prawidłowo! Każdy epizod krwawienia w ciąży u kobiety Rh-ujemnej niesie ryzyko przecieku płodowo-matczynego i wymaga podania immunoglobuliny anty-D."
        },
        {
          text: "Wstrzymanie podania immunoglobuliny anty-D do czasu porodu i podanie jej dopiero po oznaczeniu grupy krwi noworodka z krwi pępowinowej.",
          isCorrect: false,
          feedback: "Błąd. Do alloumunizacji dochodzi w momencie krwawienia w ciąży; zwłoka do porodu prowadzi do wytworzenia przeciwciał i choroby hemolitycznej."
        },
        {
          text: "Podanie surowicy odpornościowej przeciw tężcowi i wściekliźnie w ramach standardowego protokołu krwawień położniczych na izbie przyjęć.",
          isCorrect: false,
          feedback: "Błąd. Krwawienie w łożysku przodującym nie ma związku z tężcem ani wścieklizną; swoistą profilaktyką jest immunoglobulina anty-RhD."
        },
        {
          text: "Wykonanie całkowitej plazmaferezy leczniczej w celu usunięcia jakichkolwiek potencjalnych antygenów z krwi krążącej ciężarnej pacjentki.",
          isCorrect: false,
          feedback: "Błąd. Plazmafereza jest procedurą inwazyjną o wąskich wskazaniach i nie stanowi metody profilaktyki pierwotnej alloumunizacji Rh."
        }
      ]
    },
    {
      title: "Krok 8: Planowe rozwiązanie ciąży i przygotowanie na łożysko przyrośnięte",
      desc: "Ciążę udało się utrzymać do 36. Hbd pod ścisłym nadzorem. W wywiadzie pacjentka ma 2 przebyte cięcia cesarskie. Jaka jest optymalna droga i plan porodu?",
      options: [
        {
          text: "Elektywne cięcie cesarskie w 36–37. Hbd z zabezpieczeniem krwi, obecnością doświadczonego zespołu chirurgicznego i gotowością na łożysko przyrośnięte (Accreta).",
          isCorrect: true,
          feedback: "Prawidłowo! Łożysko przodujące po wcześniejszych cięciach cesarskich niesie wysokie ryzyko łożyska wrośniętego/przyrośniętego (PAS), wymagającego resekcji lub histerektomii."
        },
        {
          text: "Próba porodu siłami natury z nacięciem krocza i podaniem wysokich dawek dożylnej oksytocyny w celu szybkiego wypchnięcia łożyska przed główką płodu.",
          isCorrect: false,
          feedback: "Błąd. Łożysko przodujące centralnie stanowi bezwzględną mechaniczną przeszkodę porodową; próba porodu SN kończy się śmiertelnym krwotokiem."
        },
        {
          text: "Zalecenie porodu w warunkach domowych w basenie wodnym bez asysty personelu medycznego po ukończeniu 41. tygodnia ciąży.",
          isCorrect: false,
          feedback: "Błąd. Poród domowy u pacjentki z łożyskiem przodującym i bliznami po CC to skrajne zagrożenie śmiercią matki i dziecka."
        },
        {
          text: "Wykonanie zabiegu obrotu zewnętrznego na główkę (ECV) przez powłoki brzuszne w celu przemieszczenia łożyska w stronę dna macicy.",
          isCorrect: false,
          feedback: "Błąd. Łożysko przodujące jest bezwzględnym przeciwwskazaniem do obrotu zewnętrznego; próba manipulacji wywołałaby natychmiastowe rozerwanie łożyska."
        }
      ]
    }
  ],

  154: [
    {
      title: "Krok 1: Triage i rozpoznanie masywnego krwotoku poporodowego (PPH)",
      desc: "29-letnia wieloródka 25 minut po porodzie SN noworodka 4450 g. Z dróg rodnych wypływa wartki strumień krwi ze skrzepami (utrata > 1000 ml). RR 80/45 mmHg, HR 125/min.",
      options: [
        {
          text: "Ogłoszenie alarmu krwotocznego PPH, wezwanie zespołu reanimacyjnego, tlenoterapia, dwa grube wkłucia i.v. (14–16G) i natychmiastowy wlew krystaloidów.",
          isCorrect: true,
          feedback: "Prawidłowo! Utrata > 1000 ml krwi z niestabilnością hemodynamiczną definiuje ciężki PPH. Kluczem do przeżycia jest natychmiastowa mobilizacja zespołu wielodyscyplinarnego."
        },
        {
          text: "Pojedyncze podanie czopka z paracetamolem doodbytniczo i pozostawienie pacjentki pod obserwacją położnej na kolejne 2 godziny w sali porodowej.",
          isCorrect: false,
          feedback: "Błąd. Masywny krwotok z hipotensją 80/45 mmHg to stan bezpośredniego zagrożenia życia; bierność doprowadzi do zatrzymania krążenia w ciągu 15 minut."
        },
        {
          text: "Pobranie wymazu bakteriologicznego z szyjki macicy i wstrzymanie jakichkolwiek działań ratunkowych do czasu uzyskania wyniku posiewu za 72 godziny.",
          isCorrect: false,
          feedback: "Błąd. Posiewy bakteryjne nie mają znaczenia w ostrej resuscytacji wstrząsu krwotocznego; zwłoka w działaniu skończy się zgonem pacjentki."
        },
        {
          text: "Wdrożenie natychmiastowej fototerapii lampami ksenonowymi na okolicę krocza w celu przyspieszenia naturalnego krzepnięcia krwi obwodowej.",
          isCorrect: false,
          feedback: "Błąd. Fototerapia nie ma żadnego zastosowania w tamowaniu krwotoków wewnętrznych ani atoniach macicy; stanowi stratę krytycznego czasu."
        }
      ]
    },
    {
      title: "Krok 2: Wdrożenie reguły 4T i natychmiastowy masaż macicy",
      desc: "W badaniu palpacyjnym brzucha dno macicy sięga powyżej pępka, macica jest miękka, 'ciastowata' i nie reaguje skurczem na dotyk. Jaka jest przyczyna krwawienia?",
      options: [
        {
          text: "Atonia macicy (Tone w regule 4T); natychmiastowe rozpoczęcie energicznego masażu zewnętrznego macicy przez powłoki brzuszne oraz ucisku dwuręcznego.",
          isCorrect: true,
          feedback: "Prawidłowo! Atonia macicy odpowiada za > 70% przypadków PPH. Masaż dwuręczny (bimanual compression) mechanicznie zaciska naczynia łożyskowe."
        },
        {
          text: "Pęknięcie wątroby z krwawieniem do otrzewnej; natychmiastowe założenie drenażu jamy opłucnej i wstrzymanie dotykania powłok brzusznych pacjentki.",
          isCorrect: false,
          feedback: "Błąd. Miękka, wiotka macica bezpośrednio po makrosomii płodu wskazuje jednoznacznie na atonię mięśnia macicy, a nie patologię klatki piersiowej."
        },
        {
          text: "Wrodzona hemofilia A u matki; natychmiastowe przetoczenie koncentratu czynnika VIII bez konieczności badania napięcia mięśnia macicy.",
          isCorrect: false,
          feedback: "Błąd. Kobiety są nosicielkami hemofilii i rzadko chorują objawowo; najczęstszą przyczyną krwotoku jest atonia macicy, wymagająca uterotoników."
        },
        {
          text: "Zatkanie dróg rodnych skrzepem i zalecenie powstrzymania jakiegokolwiek ucisku na macicę z obawy przed wypchnięciem skrzepu na zewnątrz.",
          isCorrect: false,
          feedback: "Błąd. Zalegające skrzepy podtrzymują atonię macicy i uniemożliwiają jej skurcz; należy je natychmiast ewakuować poprzez masaż i ucisk."
        }
      ]
    },
    {
      title: "Krok 3: Farmakoterapia uterotoniczna I rzutu (Oksytocyna)",
      desc: "Równolegle z masażem dwuręcznym konieczne jest natychmiastowe wdrożenie farmakoterapii obkurczającej macicę. Jaki lek i droga podania są I rzutem?",
      options: [
        {
          text: "Oksytocyna: 5–10 IU w powolnym wstrzyknięciu dożylnym (lub i.m.), a następnie ciągły wlew dożylny 20–40 IU w 500 ml krystaloidu z prędkością 100–125 ml/h.",
          isCorrect: true,
          feedback: "Prawidłowo! Oksytocyna to lek I rzutu w atonii macicy. Bolus i.v. musi być podawany powoli, gdyż szybkie wstrzyknięcie może wywołać ciężką hipotensję."
        },
        {
          text: "Oksytocyna: 50 IU w szybkim bolusie dożylnym 'push' w czasie krótszym niż 3 sekundy bezpośrednio do żyły centralnej pacjentki.",
          isCorrect: false,
          feedback: "Błąd. Szybki bolus wysokiej dawki oksytocyny wywołuje gwałtowny rozkurcz naczyń, zapaść krążeniową, tachykardię i zatrzymanie krążenia."
        },
        {
          text: "Podanie dożylne siarczanu magnezu w dawce nasycającej 10 g w celu wyciszenia drżeń poporodowych i obniżenia napięcia naczyniowego.",
          isCorrect: false,
          feedback: "Błąd. Siarczan magnezu ma działanie tokolityczne (rozkurczające mięsień macicy); jego podanie w atonii pogłębiłoby śmiertelny krwotok."
        },
        {
          text: "Wdrożenie wziewnego fenoterolu przez nebulizator w celu rozszerzenia oskrzeli i poprawy utlenowania krwi obwodowej pacjentki na sali porodowej.",
          isCorrect: false,
          feedback: "Błąd. Fenoterol jest silnym beta-mimetykiem rozkurczającym macicę; podanie go w PPH doprowadziłoby do całkowitego paraliżu skurczu myometrium."
        }
      ]
    },
    {
      title: "Krok 4: Uterotoniki II rzutu i wczesny kwas traneksamowy (TXA)",
      desc: "Pomimo masażu i oksytocyny macica nadal pozostaje wiotka, a krwawienie nie ustępuje. RR 75/40 mmHg. Jakie leczenie farmakologiczne należy dołączyć?",
      options: [
        {
          text: "Kwas traneksamowy 1 g i.v. w ciągu 10 min oraz metyloergometryna 0,2 mg i.m. (lub karboprost 0,25 mg i.m. / mizoprostol 800 µg doodbytniczo).",
          isCorrect: true,
          feedback: "Prawidłowo! Kwas traneksamowy (WOMAN trial) podany w ciągu 3 h redukuje zgon z wykrwawienia o 30%. Alkaloidy sporyszu i prostaglandyny to II rzut uterotoników."
        },
        {
          text: "Podanie dożylnego wlewu nitrogliceryny w dawce 5 mg/h w celu obniżenia oporu naczyniowego i ułatwienia napływu krwi do narządów obwodowych.",
          isCorrect: false,
          feedback: "Błąd. Nitrogliceryna w krwotoku wywoła całkowitą zapaść naczyniową, a dodatkowo zwiotcza mięsień macicy, nasilając krwawienie."
        },
        {
          text: "Wdrożenie dożylnej heparyny drobnocząsteczkowej w podwójnej dawce terapeutycznej z obawy przed powikłaniami zakrzepowo-zatorowymi w połogu.",
          isCorrect: false,
          feedback: "Błąd. Heparyna w trakcie aktywnego, masywnego krwotoku całkowicie zniesie hemostazę i doprowadzi do natychmiastowego zgonu pacjentki."
        },
        {
          text: "Podanie doustne kwasu acetylosalicylowego w dawce 500 mg rozpuszczonej w wodzie w celu poprawy reologii krwi i mikrokrążenia.",
          isCorrect: false,
          feedback: "Błąd. Aspiryna blokuje płytki krwi i nasila krwawienie; w PPH lekiem hemostatycznym z wyboru jest kwas traneksamowy i czynniki krzepnięcia."
        }
      ]
    },
    {
      title: "Krok 5: Ręczna kontrola jamy macicy i kanału rodnego (Tissue & Trauma)",
      desc: "W znieczuleniu ogólnym lekarz wprowadza rękę do jamy macicy. Co należy bezwzględnie zweryfikować w ramach reguły 4T?",
      options: [
        {
          text: "Usunięcie zalegających skrzepów i resztek łożyska/błon płodowych (Tissue) oraz kontrola we wziernikach pod kątem głębokich pęknięć szyjki i pochwy (Trauma).",
          isCorrect: true,
          feedback: "Prawidłowo! Pozostawione fragmenty łożyska uniemożliwiają skurcz macicy. Nierozpoznane pęknięcia szyjki lub pochwy mogą być niezależnym źródłem masywnego krwawienia."
        },
        {
          text: "Pobranie wycinków szczypczykami biopsyjnymi z czterech kwadrantów trzonu macicy do planowego badania histopatologicznego w trybie rutynowym.",
          isCorrect: false,
          feedback: "Błąd. Wykonywanie biopsji krwawiącej wiotkiej macicy doprowadzi do perforacji ściany i nasilenia krwotoku do jamy otrzewnej."
        },
        {
          text: "Wstrzyknięcie 50 ml czystego spirytusu do jamy macicy w celu chemicznej kauteryzacji krwawiących naczyń błony śluzowej.",
          isCorrect: false,
          feedback: "Błąd. Podanie spirytusu do macicy wywołałoby martwicę toksyczną, wstrząs chemiczny i perforację; hemostazę uzyskuje się mechanicznie lub chirurgicznie."
        },
        {
          text: "Założenie wewnątrzmacicznej wkładki antykoncepcyjnej zawierającej miedź w celu mechanicznego podrażnienia ściany i wywołania odruchowego skurczu.",
          isCorrect: false,
          feedback: "Błąd. Wkładka wewnątrzmaciczna w PPH nie ma żadnego zastosowania, stwarza ryzyko perforacji i nie zatamuje krwotoku łożyskowego."
        }
      ]
    },
    {
      title: "Krok 6: Tamponada mechaniczna balonem Bakri",
      desc: "Jama macicy jest czysta, pęknięcia dróg rodnych wykluczone, ale mięsień macicy nadal nie utrzymuje napięcia. Krwawienie trwa. Jaka jest kolejna nienaczyniowa procedura?",
      options: [
        {
          text: "Wprowadzenie balonu hemostatycznego Bakri do jamy macicy i wypełnienie go 300–500 ml jałowej soli fizjologicznej w celu uzyskania hemostazy uciskowej.",
          isCorrect: true,
          feedback: "Prawidłowo! Tamponada balonem Bakri to wysoce skuteczna metoda zatrzymania krwotoku atonicznego, pozwalająca uniknąć laparotomii w > 80% przypadków."
        },
        {
          text: "Wprowadzenie suchej gąbki kuchennej do jamy macicy i pozostawienie jej na okres 7 dni bez drenażu ani monitorowania utraty krwi.",
          isCorrect: false,
          feedback: "Błąd. Gąbka niesterylna wywoła śmiertelną sepsę połogową, nie zapewnia odpowiedniego ciśnienia hemostatycznego i jest rażącym błędem."
        },
        {
          text: "Założenie opaski uciskowej Esmarcha wokół podbrzusza pacjentki i zaciśnięcie jej z siłą odcinającą przepływ krwi w aorcie brzusznej.",
          isCorrect: false,
          feedback: "Błąd. Opaska Esmarcha wokół brzucha uszkodzi narządy jamy brzusznej i nie zatamuje naczyń macicznych zaopatrywanych od tętnic biodrowych."
        },
        {
          text: "Wstrzyknięcie do jamy macicy 500 ml kleju cyjanoakrylowego w celu sklejenia przedniej i tylnej ściany trzonu macicy na stałe.",
          isCorrect: false,
          feedback: "Błąd. Kleje tkankowe nie są dopuszczone do wstrzykiwania do jamy macicy; zniszczyłyby narząd i uniemożliwiły jakikolwiek drenaż krwi."
        }
      ]
    },
    {
      title: "Krok 7: Resuscytacja hemostatyczna i zapobieganie triadzie śmierci",
      desc: "Utrata krwi przekroczyła 2000 ml. Występuje hipotermia (35,1°C), kwasica (pH 7,18) i koagulopatia (INR 2,2, fibrynogen 1,1 g/l). Jak prowadzić transfuzję?",
      options: [
        {
          text: "Wdrożenie protokołu masywnego przetoczenia (MTP): KKCz, FFP i płytki krwi w proporcji zbliżonej do 1:1:1, koncentrat fibrynogenu, wapń i aktywne ogrzewanie.",
          isCorrect: true,
          feedback: "Prawidłowo! Leczenie zaawansowanego wstrząsu wymaga zwalczania triady śmierci (kwasica, hipotermia, koagulopatia) zrównoważoną substytucją składników krwi."
        },
        {
          text: "Przetaczanie wyłącznie 0,9% NaCl w łącznej objętości 10 litrów bez podawania jakichkolwiek preparatów krwiopochodnych ani osocza świeżo mrożonego.",
          isCorrect: false,
          feedback: "Błąd. Sama krystaloidoterapia doprowadzi do ciężkiej kwasicy hiperchloremicznej, skrajnej koagulopatii z rozcieńczenia i zgonu pacjentki."
        },
        {
          text: "Odmowa przetoczenia krwi do czasu uzyskania pełnej zgody sądu opiekuńczego, pomimo bezpośredniego zagrożenia życia nieprzytomnej pacjentki.",
          isCorrect: false,
          feedback: "Błąd. W stanie nagłego zagrożenia życia lekarz ma prawny obowiązek ratowania pacjenta i przetoczenia krwi w stanie wyższej konieczności."
        },
        {
          text: "Schładzanie pacjentki workami z lodem do temperatury 32°C w celu rzekomego zmniejszenia zapotrzebowania tkanek na tlen w warunkach wstrząsu.",
          isCorrect: false,
          feedback: "Błąd. Hipotermia blokuje kaskadę krzepnięcia i funkcję płytek; w krwotoku pacjentkę należy bezwzględnie aktywnie ogrzewać do > 36°C."
        }
      ]
    },
    {
      title: "Krok 8: Interwencja chirurgiczna ratująca życie i dyspozycja",
      desc: "Balon Bakri wypełnił się krwią w ciągu 10 minut (dalszy drenaż > 500 ml krwi), krwotok nie ustępuje. Pacjentka jest na sali operacyjnej. Jaka jest ostateczna decyzja?",
      options: [
        {
          text: "Pilna laparotomia: szwy uciskowe B-Lyncha lub podwiązanie tętnic macicznych/biodrowych wewnętrznych; w razie braku hemostazy – histerektomia ratunkowa.",
          isCorrect: true,
          feedback: "Prawidłowo! Nieskuteczność metod zachowawczych i tamponady jest bezwzględnym wskazaniem do laparotomii ratunkowej. Histerektomia ratuje życie matki."
        },
        {
          text: "Zalecenie zakończenia znieczulenia ogólnego i przewiezienie pacjentki do oddziału położniczego z zaleceniem powtórzenia morfologii rano.",
          isCorrect: false,
          feedback: "Błąd. Pozostawienie pacjentki z aktywnym, niekontrolowanym krwotokiem atonicznym doprowadzi do jej zgonu w ciągu kilkudziesięciu minut."
        },
        {
          text: "Wykonanie nakłucia opłucnej i wdrożenie drenażu ssącego klatki piersiowej zamiast otwierania jamy brzusznej pacjentki.",
          isCorrect: false,
          feedback: "Błąd. Źródło krwawienia znajduje się w jamie macicy; drenaż opłucnej jest całkowicie bezużyteczny i stanowi błąd w sztuce."
        },
        {
          text: "Wstrzyknięcie do mięśnia sercowego adrenaliny i zamknięcie powłok brzusznych bez podejmowania jakichkolwiek działań hemostatycznych na macicy.",
          isCorrect: false,
          feedback: "Błąd. Dożylne podanie leków nie zatamuje otwartych naczyń łożyskowych; konieczne jest zaopatrzenie chirurgiczne macicy."
        }
      ]
    }
  ],

  155: [
    {
      title: "Krok 1: Wstępna ocena ABCDE i różnicowanie ostrego brzucha",
      desc: "23-letnia kobieta zgłasza się z nagłym, silnym bólem w prawym dole biodrowym (9/10), który pojawił się po treningu fitness. Występują nudności i wymioty. RR 115/75 mmHg, HR 100/min.",
      options: [
        {
          text: "Wstępna ocena ABCDE, założenie kaniuli dożylnej (18G), pobranie krwi na beta-hCG, morfologię, CRP i elektrolity oraz natychmiastowe wdrożenie analgezji i.v.",
          isCorrect: true,
          feedback: "Prawidłowo! Ostry ból podbrzusza u młodej kobiety wymaga natychmiastowej analgezji oraz pilnego wykluczenia ciąży ektopowej, zapalenia wyrostka i skrętu przydatków."
        },
        {
          text: "Zalecenie wykonania 50 przysiadów i intensywnego masażu powłok brzusznych w celu rozbicia rzekomego bolesnego skurczu mięśni brzucha po treningu.",
          isCorrect: false,
          feedback: "Błąd. Wysiłek fizyczny może doprowadzić do całkowitego zaciśnięcia szypuły naczyniowej skręconego jajnika lub pęknięcia torbieli z krwotokiem."
        },
        {
          text: "Podanie doustnego środka przeczyszczającego na bazie oleju rycynowego z podejrzeniem przewlekłego zalegania mas kałowych w kątnicy.",
          isCorrect: false,
          feedback: "Błąd. Środki przeczyszczające w ostrym brzuchu nasilają perystaltykę, prowokują wymioty i mogą doprowadzić do perforacji lub zaostrzenia niedokrwienia."
        },
        {
          text: "Wypisanie pacjentki z izby przyjęć z zaleceniem zgłoszenia się do lekarza POZ za 5 dni, jeśli dolegliwości bólowe nie ustąpią samoistnie.",
          isCorrect: false,
          feedback: "Błąd. Skręt przydatków to stan nagły; zwłoka powyżej 6–8 godzin prowadzi do nieodwracalnej martwicy niedokrwiennej i utraty jajnika."
        }
      ]
    },
    {
      title: "Krok 2: Pilne wykluczenie ciąży ektopowej CITO",
      desc: "Jakie badanie laboratoryjne musi być bezwzględnie wykonane w trybie natychmiastowym u każdej kobiety w wieku rozrodczym z ostrym bólem podbrzusza?",
      options: [
        {
          text: "Oznaczenie stężenia podjednostki beta gonadotropiny kosmówkowej (beta-hCG) w moczu lub surowicy krwi w celu wykluczenia ciąży pozamacicznej.",
          isCorrect: true,
          feedback: "Prawidłowo! Wykluczenie ciąży ektopowej jest absolutnym priorytetem u każdej pacjentki w wieku rozrodczym z objawami ostrego brzucha."
        },
        {
          text: "Oznaczenie miana przeciwciał przeciwjądrowych ANA i anty-dsDNA przed podjęciem jakichkolwiek dalszych badań diagnostycznych na SOR.",
          isCorrect: false,
          feedback: "Błąd. Diagnostyka tocznia rumieniowatego nie ma znaczenia w ostrym dyżurze chirurgiczno-ginekologicznym i opóźnia rozpoznanie."
        },
        {
          text: "Izolowane oznaczenie dobowego wydalania kwasu 5-hydroksyindolooctowego (5-HIAA) w celu wykluczenia rakowiaka wyrostka robaczkowego.",
          isCorrect: false,
          feedback: "Błąd. Dobowa zbiórka moczu w kierunku rakowiaka jest bezużyteczna w stanie nagłym; kluczowy jest test ciążowy i badanie USG."
        },
        {
          text: "Oznaczenie stężenia witaminy B12 i kwasu foliowego w celu wykluczenia niedokrwistości megaloblastycznej przed badaniem ginekologicznym.",
          isCorrect: false,
          feedback: "Błąd. Poziom witamin nie ma żadnego związku z ostrym bólem podbrzusza i nie pozwala na podjęcie decyzji terapeutycznych."
        }
      ]
    },
    {
      title: "Krok 3: Diagnostyka obrazowa CITO (USG Doppler przydatków)",
      desc: "Wynik beta-hCG jest ujemny (< 1 mIU/ml). Wykonano pilne USG przezpochwowe z oceną przepływów naczyniowych Color Doppler. Co jest typowym objawem skrętu?",
      options: [
        {
          text: "Powiększony, obrzęknięty jajnik (> 4 cm) z obwodowo ułożonymi pęcherzykami, płynem w zatoce Douglasa oraz objawem tarczy/wirówki (whirlpool sign).",
          isCorrect: true,
          feedback: "Prawidłowo! Obrzęk zrębu jajnika i objaw wiru skręconej szypuły naczyniowej (whirlpool sign) to kluczowe cechy skrętu przydatków w USG Doppler."
        },
        {
          text: "Całkowity brak jakichkolwiek struktur anatomicznych miednicy mniejszej z powodu ich rzekomego wchłonięcia w trakcie wysiłku fizycznego.",
          isCorrect: false,
          feedback: "Błąd. Przydatki nie ulegają wchłonięciu; w USG uwidacznia się powiększony, obrzęknięty jajnik z zaburzeniami przepływu żylnego i tętniczego."
        },
        {
          text: "Prawidłowy, symetryczny przepływ naczyniowy o niskim oporze w obu jajnikach wykluczający skręt w 100% nawet przy utrzymującym się silnym bólu.",
          isCorrect: false,
          feedback: "Błąd. Zachowany przepływ tętniczy nie wyklucza skrętu (najpierw ulega zaciśnięciu splot żylny); ostateczną weryfikacją jest laparoskopia."
        },
        {
          text: "Obecność licznych zwapnień w rzucie miąższu nerek i moczowodów świadcząca o bezwzględnej konieczności natychmiastowej nefrektomii.",
          isCorrect: false,
          feedback: "Błąd. Zwapnienia nerkowe nie tłumaczą jednostronnego ostrego bólu przydatków u 23-latki z cechami powiększenia jajnika w USG."
        }
      ]
    },
    {
      title: "Krok 4: Analgezja ratunkowa i leczenie objawowe na SOR",
      desc: "Pacjentka zgłasza ból 9/10 i nasilone nudności z odruchami wymiotnymi. Jaki zestaw leków dożylnych należy podać na czas przygotowania do zabiegu?",
      options: [
        {
          text: "Paracetamol 1000 mg i.v. w połączeniu z opioidem (np. fentanyl 50–100 µg i.v. lub morfina 5 mg i.v.) oraz ondansetron 4–8 mg i.v. przeciwwymiotnie.",
          isCorrect: true,
          feedback: "Prawidłowo! Skuteczna analgezja multimodalna z użyciem leków nienarkotycznych i opioidów oraz bloker 5-HT3 (ondansetron) to standard opieki na SOR."
        },
        {
          text: "Całkowity zakaz podawania jakichkolwiek leków przeciwbólowych, aby rzekomo 'nie zatuszować obrazu klinicznego ostrego brzucha' przed chirurgiem.",
          isCorrect: false,
          feedback: "Błąd. Nieuzasadnione nieleczenie bólu jest błędem w sztuce i niehumanitarnym postępowaniem; analgezja nie utrudnia kwalifikacji operacyjnej."
        },
        {
          text: "Podanie doustnego kwasu acetylosalicylowego w dawce 1000 mg i popicie dużą objętością wody gazowanej tuż przed planowaną operacją.",
          isCorrect: false,
          feedback: "Błąd. Doustne leki i płyny przed operacją łamią reżim 'na czczo' i grożą zachłyśnięciem przy intubacji, a ASA nasila krwawienie śródoperacyjne."
        },
        {
          text: "Wdrożenie wziewnego eteru dietylowego podawanego przez otwartą maskę gazową w warunkach sali obserwacyjnej SOR.",
          isCorrect: false,
          feedback: "Błąd. Eter to historyczny, wybuchowy anestetyk, który nie ma żadnego zastosowania we współczesnej medycynie ratunkowej."
        }
      ]
    },
    {
      title: "Krok 5: Okno czasowe i kwalifikacja do pilnej operacji",
      desc: "Objawy trwają od 3 godzin. Jakie jest okno czasowe dla odwrócenia niedokrwienia i uratowania funkcji hormonalnej oraz rozrodczej jajnika?",
      options: [
        {
          text: "Krytyczne okno czasowe wynosi do 6–8 godzin od początku objawów; operację laparoskopową należy przeprowadzić w trybie pilnym bez zbędnej zwłoki.",
          isCorrect: true,
          feedback: "Prawidłowo! Podobnie jak w skręcie jądra, czas do rewizji chirurgicznej decyduje o przeżywalności tkanki gonady (największa szansa < 6-8 h)."
        },
        {
          text: "Okno czasowe wynosi 72 godziny, dlatego pacjentka może bezpiecznie poczekać na planowy zabieg na początku kolejnego tygodnia roboczego.",
          isCorrect: false,
          feedback: "Błąd. Zwłoka 72 godzin doprowadzi do całkowitej martwicy zgorzelinowej jajnika, zapalenia otrzewnej i nieodwracalnej utraty narządu."
        },
        {
          text: "W skręcie przydatków czas nie ma żadnego znaczenia, ponieważ jajnik po skręceniu ulega natychmiastowej, nieodwracalnej martwicy w ciągu 10 minut.",
          isCorrect: false,
          feedback: "Błąd. Jajnik wykazuje pewną odporność na niedokrwienie; nawet sinoczarny jajnik po odkręceniu szypuły może odzyskać pełną funkcję hormonalną."
        },
        {
          text: "Zabieg operacyjny należy odroczyć do czasu zakończenia najbliższego krwawienia miesiączkowego u pacjentki.",
          isCorrect: false,
          feedback: "Błąd. Odkładanie operacji w ostrym skręcie przydatków jest rażącym zaniedbaniem prowadzącym do martwicy i powikłań septycznych."
        }
      ]
    },
    {
      title: "Krok 6: Wybór metody zabiegowej i technika operacyjna",
      desc: "Pacjentka trafia na blok operacyjny. Jaka technika operacyjna stanowi złoty standard leczenia skrętu przydatków u młodej nieródki?",
      options: [
        {
          text: "Pilna laparoskopia ginekologiczna z ostrożnym odkręceniem szypuły naczyniowej przydatków (detorsja) i oceną powrotu ukrwienia tkanki jajnika.",
          isCorrect: true,
          feedback: "Prawidłowo! Laparoskopia to metoda z wyboru (mniejszy ból, mniej zrostów). Współczesnym standardem jest odkręcenie przydatków i próba ich zachowania."
        },
        {
          text: "Klasyczna laparotomia ze środkowego cięcia od wyrostka mieczykowatego do spojenia łonowego z natychmiastowym usunięciem macicy i obu jajników.",
          isCorrect: false,
          feedback: "Błąd. Kastracja chirurgiczna u 23-letniej nieródki z powodu jednostronnego skrętu jest okaleczającym i nieuzasadnionym postępowaniem."
        },
        {
          text: "Wykonanie nakłucia igłą biopsyjną przez sklepienie pochwy i wstrzyknięcie 100 mg papaweryny bezpośrednio do skręconego jajnika.",
          isCorrect: false,
          feedback: "Błąd. Nakłucie na ślepo nie rozwiąże mechanicznego skręcenia szypuły naczyniowej, a stwarza ryzyko nakłucia naczyń biodrowych i jelit."
        },
        {
          text: "Założenie drenażu jamy otrzewnej w znieczuleniu miejscowym bez wziernikowania jamy brzusznej ani inspekcji narządów miednicy mniejszej.",
          isCorrect: false,
          feedback: "Błąd. Sam drenaż nie odwróci skrętu szypuły naczyniowej; konieczna jest bezpośrednia wizualizacja i mechaniczne odkręcenie gonady."
        }
      ]
    },
    {
      title: "Krok 7: Śródoperacyjna ocena żywotności jajnika po detorsji",
      desc: "Po laparoskopowym odkręceniu szypuły naczyniowej jajnik jest powiększony i ma sinofioletowe zabarwienie. Jakie jest prawidłowe postępowanie śródoperacyjne?",
      options: [
        {
          text: "Pozostawienie jajnika, ogrzanie wilgotnym gazikiem i obserwacja przez 10–15 minut pod kątem powrotu zabarwienia; unikanie niepotrzebnej ooforektomii.",
          isCorrect: true,
          feedback: "Prawidłowo! Nawet sinoczarny jajnik po detorsji w > 90% przypadków odzyskuje funkcję hormonalną i owulacyjną. Dawna zasada rutynowego usuwania jest zarzucona."
        },
        {
          text: "Natychmiastowe wycięcie jajnika (ooforektomia) bez odkręcania szypuły ze względu na rzekome niebezpieczeństwo zatorowości płucnej.",
          isCorrect: false,
          feedback: "Błąd. Badania wykazały, że ryzyko powikłań zatorowo-zakrzepowych po detorsji jest znikome (< 0,2%), a nadrzędnym celem jest zachowanie płodności."
        },
        {
          text: "Natychmiastowe wyłuszczenie torbieli z uszkodzonego niedokrwiennie, kruchego jajnika z rozległą elektrokoagulacją całego zrębu gonady.",
          isCorrect: false,
          feedback: "Błąd. Agresywna resekcja torbieli w ostrym obrzęku niszczy resztki kory jajnika; wyłuszczenie torbieli odkłada się na planowy zabieg po wygojeniu."
        },
        {
          text: "Wstrzyknięcie do miąższu jajnika 10 ml 10% chlorku sodu w celu chemicznego odwodnienia tkanki zrębowej gonady na stole operacyjnym.",
          isCorrect: false,
          feedback: "Błąd. Hipertoniczna sól zniszczyłaby komórki pęcherzykowe jajnika; postępowaniem z wyboru jest delikatna obserwacja powrotu ukrwienia."
        }
      ]
    },
    {
      title: "Krok 8: Profilaktyka nawrotów i dyspozycja pooperacyjna",
      desc: "Po 15 minutach od detorsji jajnik wyraźnie się zaróżowił, a w badaniu Dopplerem potwierdzono powrót przepływu. Jaka jest dyspozycja i dalsze postępowanie?",
      options: [
        {
          text: "Zakończenie laparoskopii, hospitalizacja na oddziale ginekologii, wczesne uruchomienie, kontrolne USG po 4–6 tygodniach i ewentualna cystektomia planowa.",
          isCorrect: true,
          feedback: "Prawidłowo! Narząd został uratowany. Po ustąpieniu obrzęku (po kilku tygodniach) ocenia się jajnik pod kątem obecności torbieli wymagającej planowego wyłuszczenia."
        },
        {
          text: "Wypisanie pacjentki bezpośrednio z sali wybudzeniowej do domu z zaleceniem powrotu do wyczynowego uprawiania sportu w dniu następnym.",
          isCorrect: false,
          feedback: "Błąd. Pacjentka po zabiegu laparoskopowym w znieczuleniu ogólnym wymaga hospitalizacji i rekonwalescencji; forsowny wysiłek grozi nawrotem skrętu."
        },
        {
          text: "Wdrożenie dożywotniej hormonalnej terapii zastępczej estrogenami ze względu na całkowite i nieodwracalne ustanie czynności obu gonad.",
          isCorrect: false,
          feedback: "Błąd. Jajnik odzyskał perfuzję, a drugi jajnik jest całkowicie zdrowy; pacjentka nie wymaga HTZ."
        },
        {
          text: "Zalecenie natychmiastowego obustronnego usunięcia jajowodów w celu zapobiegania przyszłym ciążom pozamacicznym u pacjentki.",
          isCorrect: false,
          feedback: "Błąd. Usunięcie jajowodów u 23-letniej nieródki bez wskazań jest bezprawnym okaleczeniem pacjentki i błędem w sztuce lekarskiej."
        }
      ]
    }
  ]
};

async function run() {
  const manifest = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'cases', 'manifest.json'), 'utf8'));
  console.log('Expanding steps to 8 for Cases 151-155...');

  for (let id = 151; id <= 155; id++) {
    const file = manifest[id - 1];
    const fullPath = path.join(__dirname, '..', 'cases', file);
    const raw = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
    const c = await decrypt(raw, MASTER_KEY);

    const newSteps = batch1Steps[id];
    verifyStepBalance(newSteps, id);
    c.steps = newSteps;

    const enc = await encrypt(c, MASTER_KEY);
    fs.writeFileSync(fullPath, JSON.stringify(enc, null, 2), 'utf8');
    console.log(`✓ Case #${id} updated with ${newSteps.length} full steps!`);
  }
}

run();

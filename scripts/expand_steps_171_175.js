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

// BATCH 5: CASES 171 - 175 (8 STEPS EACH)
const batch5Steps = {
  171: [
    {
      title: "Krok 1: Wstępna ocena ABCDE i bezpieczeństwo ratowników",
      desc: "28-latka w 24. Hbd znaleziona nieprzytomna w łazience kamienicy ogrzewanej piecykiem gazowym. RR 110/65 mmHg, HR 118/min, SpO2 99% na pulsoksymetrze.",
      options: [
        {
          text: "Ewakuacja ze strefy skażenia, natychmiastowe podanie 100% tlenu przez szczelną maskę z rezerwuarem, kaniulacja żył, EKG i pobranie krwi na ko-oksymetrię.",
          isCorrect: true,
          feedback: "Prawidłowo! W zatruciu tlenkiem węgla (CO) natychmiastowa tlenoterapia normobaryczna 100% tlenem jest bezwzględnym lekiem I rzutu ratującym życie."
        },
        {
          text: "Pozostawienie pacjentki w łazience i próba naprawienia nieszczelnego piecyka gazowego przez zespół ratownictwa medycznego.",
          isCorrect: false,
          feedback: "Błąd. Niezabezpieczona strefa skażenia zagraża życiu ratowników; poszkodowaną należy natychmiast ewakuować na świeże powietrze."
        },
        {
          text: "Zalecenie podania szklanki mleka doustnie w celu zneutralizowania gazów w żołądku u nieprzytomnej ciężarnej pacjentki.",
          isCorrect: false,
          feedback: "Błąd. Tlenek węgla wchłania się przez płuca do hemoglobiny; podanie płynów nieprzytomnej osobie skończy się śmiertelnym zachłyśnięciem."
        },
        {
          text: "Wdrożenie wziewnego podtlenku azotu przez maskę krtaniową w celu wyciszenia niepokoju i bólu głowy u zatrutej pacjentki.",
          isCorrect: false,
          feedback: "Błąd. Podtlenek azotu obniża frakcję tlenu w mieszance oddechowej, drastycznie pogłębiając hipoksję tkankową i zgon płodu."
        }
      ]
    },
    {
      title: "Krok 2: Pułapki standardowej pulsoksymetrii (Problem SpO2)",
      desc: "Standardowy pulsoksymetr na palcu pacjentki wskazuje SpO2 99%. Dlaczego ten wynik jest całkowicie mylący w zatruciu tlenkiem węgla?",
      options: [
        {
          text: "Standardowy pulsoksymetr dwufalowy nie odróżnia oksyhemoglobiny od karboksyhemoglobiny (HbCO), fałszywie zawyżając saturację do wartości prawidłowych.",
          isCorrect: true,
          feedback: "Prawidłowo! Karboksyhemoglobina ma zbliżone pasmo pochłaniania światła do oksyhemoglobiny; zwykły pulsoksymetr traktuje HbCO jako prawidłowo utlenowaną krew."
        },
        {
          text: "Pulsoksymetr jest w 100% wiarygodny i dowodzi, że pacjentka ma prawidłowe utlenowanie tkanek i nie wymaga jakiejkolwiek tlenoterapii.",
          isCorrect: false,
          feedback: "Błąd. Poleganie na zwykłym pulsoksymetrze w zatruciu CO jest śmiertelnym błędem; pacjent ma ciężką hipoksję tkankową mimo SpO2 99%."
        },
        {
          text: "Tlenek węgla zamienia całą krew pacjentki w wodę morską, co całkowicie uniemożliwia generowanie fali tętna na palcu.",
          isCorrect: false,
          feedback: "Błąd. CO wiąże się z żelazem hemu z powinowactwem 200–250 razy większym niż tlen, blokując transport tlenu i oddychanie komórkowe."
        },
        {
          text: "Wynik SpO2 99% wynika z obecności methemoglobiny, która ma właściwości przyspieszania transportu tlenu do komórek mózgu.",
          isCorrect: false,
          feedback: "Błąd. Methemoglobina powoduje sinicę i obniża SpO2 do około 85%, podczas gdy HbCO fałszywie zawyża wynik SpO2 blisko 100%."
        }
      ]
    },
    {
      title: "Krok 3: Gazometria krwi z ko-oksymetrią CITO",
      desc: "Jakie badanie laboratoryjne jest złotym standardem potwierdzającym zatrucie tlenkiem węgla i jaki wynik należy oznaczyć?",
      options: [
        {
          text: "Gazometria krwi z modułem ko-oksymetrii wykazująca podwyższone stężenie karboksyhemoglobiny (HbCO 28%) oraz kwasicę metaboliczną mleczanową.",
          isCorrect: true,
          feedback: "Prawidłowo! Ko-oksymetr spektrofotometrycznie rozróżnia frakcje hemoglobiny (HbO2, HbCO, MetHb). U osób niepalących norma HbCO wynosi < 2–3%."
        },
        {
          text: "Wyłącznie badanie stężenia mocznika w ślinie pacjentki za pomocą pasków wskaźnikowych do analizy moczu.",
          isCorrect: false,
          feedback: "Błąd. Badanie śliny nie ma żadnej wartości w diagnostyce zatrucia gazami toksycznymi; standardem jest krew z ko-oksymetrią."
        },
        {
          text: "Oznaczenie miana przeciwciał przeciwjądrowych ANA w celu poszukiwania tocznia rumieniowatego indukowanego tlenkiem węgla.",
          isCorrect: false,
          feedback: "Błąd. CO to gaz trujący, a nie czynnik wywołujący toczeń; diagnostyka skupia się na stężeniu HbCO i kwasicy mleczanowej."
        },
        {
          text: "Pobranie wymazu z nosogardła na obecność wirusa grypy typu A i wstrzymanie tlenoterapii do czasu wyniku testu.",
          isCorrect: false,
          feedback: "Błąd. Objawy grypopodobne (bóle głowy, nudności) u kilku domowników w sezonie grzewczym to klasyczna pułapka zatrucia czadem."
        }
      ]
    },
    {
      title: "Krok 4: Normobaryczna tlenoterapia hiperoksyjna (Czasy półtrwania HbCO)",
      desc: "O ile podawanie 100% tlenu przez maskę ze szczelnym rezerwuarem skraca biologiczny okres półtrwania karboksyhemoglobiny (T1/2 HbCO)?",
      options: [
        {
          text: "Okres półtrwania HbCO skraca się z około 320 minut (na powietrzu atmosferycznym) do około 70–80 minut przy oddychaniu 100% tlenem normobarycznym.",
          isCorrect: true,
          feedback: "Prawidłowo! Wysokie stężenie tlenu wypiera tlenek węgla z połączeń z hemoglobiną i cytochromami, przyspieszając eliminację toksyny 4-krotnie."
        },
        {
          text: "Tlenoterapia nie ma żadnego wpływu na eliminację CO i czas półtrwania pozostaje niezmienny przez 14 kolejnych dni.",
          isCorrect: false,
          feedback: "Błąd. Tlen jest swoistą odtrutką wypierającą CO z miejsc wiązania hemu; 100% tlen drastycznie skraca czas eliminacji."
        },
        {
          text: "Tlenoterapia 100% tlenem wydłuża czas półtrwania HbCO do 48 godzin, powodując trwałe uwięzienie gazu w naczyniach krwionośnych.",
          isCorrect: false,
          feedback: "Błąd. Tlen przyspiesza dysocjację HbCO na zasadzie prawa działania mas; im wyższe PaO2, tym szybsze oczyszczenie hemoglobiny."
        },
        {
          text: "Podawanie tlenu skraca czas półtrwania do dokładnie 2 sekund, doprowadzając do natychmiastowej eksplozji płuc pacjenta.",
          isCorrect: false,
          feedback: "Błąd. Eliminacja CO trwa 70–80 minut na 100% O2 oraz około 20–30 minut w komorze hiperbarycznej (HBO przy 2,5–3 ATA)."
        }
      ]
    },
    {
      title: "Krok 5: Ocena narządów o wysokim zapotrzebowaniu tlenowym (Serce i OUN)",
      desc: "Tlenek węgla blokuje oksydazę cytochromową c w mitochondriach. Jakie badania narządowe należy wykonać u każdego hospitalizowanego pacjenta?",
      options: [
        {
          text: "12-odprowadzeniowe EKG, oznaczenie troponiny sercowej (wykluczenie zawału typu 2) oraz stężenia kinazy kreatynowej CK (ocena rabdomiolizy z ucisku).",
          isCorrect: true,
          feedback: "Prawidłowo! Mięsień sercowy i mózg są najbardziej wrażliwe na hipoksję cytotoksyczną; niedokrwienie serca po zatruciu CO zwiększa śmiertelność odległą."
        },
        {
          text: "Przeglądowe zdjęcie RTG lewego stawu kolanowego w celu wykluczenia złamania rzepki u pacjentki leżącej w łazience.",
          isCorrect: false,
          feedback: "Błąd. Badania skupiają się na narządach krytycznych (serce, mózg, nerki); RTG kolana nie ma znaczenia w ocenie zatrucia ogólnoustrojowego."
        },
        {
          text: "Biopsja aspiracyjna szpiku kostnego z talerza kości biodrowej w celu oceny komórkowości układu erytroblastycznego.",
          isCorrect: false,
          feedback: "Błąd. Biopsja szpiku jest procedurą inwazyjną z zakresu hematologii i jest całkowicie bezzasadna w ostrym zatruciu tlenkiem węgla."
        },
        {
          text: "Wykonanie próby prowokacji aspirynowej w celu oceny reaktywności oskrzeli u ciężarnej pacjentki zatrutej gazem.",
          isCorrect: false,
          feedback: "Błąd. Prowokacja aspirynowa stwarza ryzyko skurczu oskrzeli i jest bezwzględnie przeciwwskazana w stanie ostrego niedotlenienia."
        }
      ]
    },
    {
      title: "Krok 6: Wskazania do tlenoterapii hiperbarycznej (HBO)",
      desc: "Jakie są bezwzględne wskazania do wdrożenia tlenoterapii hiperbarycznej (komora HBO w ciśnieniu 2,5–3 ATA) w ostrym zatruciu tlenkiem węgla?",
      options: [
        {
          text: "Ciąża z HbCO > 15–20% (lub objawami), utrata przytomności, deficyty neurologiczne, kwasica metaboliczna (pH < 7,25) oraz cechy niedokrwienia serca w EKG.",
          isCorrect: true,
          feedback: "Prawidłowo! Ciąża jest szczególnym wskazaniem do HBO ze względu na akumulację CO w płodzie. HBO skutecznie eliminuje CO z komórek i zapobiega DNS."
        },
        {
          text: "Wskazaniem do komory hiperbarycznej jest wyłącznie podeszły wiek pacjenta powyżej 90 roku życia bez jakichkolwiek objawów klinicznych.",
          isCorrect: false,
          feedback: "Błąd. Kwalifikacja opiera się na ciężkości zatrucia (GCS, kwasica, serce, ciąża, HbCO > 25%), a nie na izolowanym wieku chorego."
        },
        {
          text: "Tlenoterapia hiperbaryczna jest bezwzględnie zakazana u kobiet w ciąży ze względu na rzekome ryzyko rozpuszczenia płodu w wodach płodowych.",
          isCorrect: false,
          feedback: "Błąd. Wręcz przeciwnie – płód jest w śmiertelnym niebezpieczeństwie; ciąża obniża próg kwalifikacji do HBO (leczy się oboje pacjentów!)."
        },
        {
          text: "Obecność łagodnego kataru u pacjenta bez bólu głowy, nudności ani odchyleń w badaniu ko-oksymetrycznym.",
          isCorrect: false,
          feedback: "Błąd. Łagodny nieżyt nosa nie jest wskazaniem do HBO; komora jest terapią ratunkową w ciężkich, powikłanych zatruciach."
        }
      ]
    },
    {
      title: "Krok 7: Zagrożenie dla płodu (Fizjologia hemoglobiny płodowej HbF)",
      desc: "Dlaczego płód jest nieproporcjonalnie bardziej zagrożony zgonem i uszkodzeniem neurologicznym niż matka w przebiegu ekspozycji na CO?",
      options: [
        {
          text: "Hemoglobina płodowa (HbF) wiąże CO silniej niż hemoglobina dorosłych, a eliminacja CO z krwi płodu trwa 2–3 razy dłużej niż u matki.",
          isCorrect: true,
          feedback: "Prawidłowo! Nawet przy łagodnych objawach u matki płód może mieć krytycznie wysoki poziom HbCO i głęboką hipoksję tkankową prowadzącą do zgonu."
        },
        {
          text: "Płód nie posiada w ogóle hemoglobiny i oddycha wyłącznie za pomocą beztlenowej fermentacji alkoholowej w jamie owodni.",
          isCorrect: false,
          feedback: "Błąd. Płód ma wyższe stężenie hemoglobiny (HbF) o wyższym powinowactwie do gazów; hipoksja płodowa w zatruciu CO jest skrajnie groźna."
        },
        {
          text: "Łożysko całkowicie blokuje przenikanie tlenku węgla i płód jest w 100% chroniony przed jakimkolwiek wpływem gazów toksycznych.",
          isCorrect: false,
          feedback: "Błąd. Tlenek węgla łatwo przenika przez barierę łożyskową drogą dyfuzji prostej i akumuluje się w układzie krążenia płodu."
        },
        {
          text: "Płód pod wpływem tlenku węgla natychmiast zamienia się w dorosłego człowieka i opuszcza jamę macicy w ciągu kilku sekund.",
          isCorrect: false,
          feedback: "Błąd. Zatrucie CO u ciężarnej grozi obumarciem wewnątrzmacicznym płodu lub ciężką encefalopatią hipoksyjno-niedokrwienną u noworodka."
        }
      ]
    },
    {
      title: "Krok 8: Profilaktyka powikłań odległych (Opóźniona encefalopatia potoksyczna DNS)",
      desc: "O jakim powikłaniu neurologicznym mogącym pojawić się po 2–40 dniach od pozornego wyleczenia ('okresie rzekomego zdrowia') należy uprzedzić pacjenta?",
      options: [
        {
          text: "Opóźniony zespół neurologiczny (DNS – delayed neurological sequelae): otępienie, parkinsonizm, zmiany osobowości i psychoza z demielinizacji istoty białej.",
          isCorrect: true,
          feedback: "Prawidłowo! DNS występuje u 10–30% chorych po ciężkim zatruciu CO (zwłaszcza po utracie przytomności); wczesna tlenoterapia HBO zmniejsza to ryzyko."
        },
        {
          text: "Wystąpienie nagłego przerostu mięśni szkieletowych i nadludzkiej siły fizycznej po powrocie do domu z oddziału toksykologii.",
          isCorrect: false,
          feedback: "Błąd. Tlenek węgla niszczy tkankę nerwową (gałki blade, istotę białą); powikłaniem jest otępienie i parkinsonizm, a nie hipertrofia mięśniowa."
        },
        {
          text: "Całkowity brak jakichkolwiek powikłań odległych i gwarancja stuprocentowego zdrowia psychicznego bez konieczności kontroli.",
          isCorrect: false,
          feedback: "Błąd. Ryzyko zespołu DNS wymaga czujności rodziny i pilnej kontroli neurologicznej w razie apatii, zaburzeń pamięci czy chodu."
        },
        {
          text: "Konieczność dożywotniego przebywania w komorze próżniowej bez dostępu tlenu atmosferycznego w celu ochrony neuronów.",
          isCorrect: false,
          feedback: "Błąd. Pacjent po zakończeniu tlenoterapii i normalizacji parametrów powraca do normalnego otoczenia pod nadzorem poradni neurologicznej."
        }
      ]
    }
  ],

  172: [
    {
      title: "Krok 1: Wstępna ocena ABCDE i rozpoznanie ostrego zatrucia alkoholem glikolowym",
      desc: "45-latek przywieziony z meliny w stanie głębokiego zaburzenia świadomości (GCS 8), z kwasiczym oddechem Kussmaula (tachypnoë 32/min) i zapachem alkoholu. RR 135/85 mmHg.",
      options: [
        {
          text: "Zabezpieczenie drożności dróg oddechowych (intubacja dotchawicza przy GCS <= 8), tlenoterapia, dwa duże wkłucia i.v. i pilne pobranie krwi na gazometrię i elektrolity.",
          isCorrect: true,
          feedback: "Prawidłowo! Oddech Kussmaula ze śpiączką wskazuje na głęboką kwasicę metaboliczną; intubacja zabezpiecza przed zachłyśnięciem i pozwala na wentylację."
        },
        {
          text: "Podanie pacjentowi 2 litrów naparu z mięty pieprzowej przez zgłębnik żołądkowy i pozostawienie na korytarzu izby przyjęć.",
          isCorrect: false,
          feedback: "Błąd. Pacjent z ciężkim zatruciem toksycznym alkoholem i GCS 8 w ciągu minut rozwinie zatrzymanie krążenia w mechanizmie ciężkiej kwasicy."
        },
        {
          text: "Zalecenie natychmiastowego opuszczenia szpitala z rozpoznaniem zwykłego upojenia alkoholowego bez wykonywania badań krwi.",
          isCorrect: false,
          feedback: "Błąd. Oddech Kussmaula w zatruciu alkoholowym to sygnał alarmowy obecności alkoholi niespożywczych (metanol, glikol); zaniechanie badań oznacza zgon."
        },
        {
          text: "Wstrzyknięcie dożylne 100 mg morfiny w celu zahamowania tachypnoë i spowolnienia częstości oddechów u pacjenta na sali SOR.",
          isCorrect: false,
          feedback: "Błąd. Spowolnienie oddechu Kussmaula zablokuje kompensację oddechową kwasicy, doprowadzając do zapaści hemodynamicznej i zatrzymania serca."
        }
      ]
    },
    {
      title: "Krok 2: Gazometria CITO i wyliczenie luki anionowej (High Anion Gap)",
      desc: "Gazometria tętnicza wykazuje: pH 7,08, HCO3- 7 mmol/l, pCO2 24 mmHg, Na+ 140, Cl- 100 mmol/l. Jak interpretować lukę anionową (AG = Na - (Cl + HCO3))?",
      options: [
        {
          text: "Ciężka kwasica metaboliczna z wysoką luką anionową (AG = 33 mEq/l; norma 8–12), wywołana nagromadzeniem kwasu glikolowego i szczawiowego w ustroju.",
          isCorrect: true,
          feedback: "Prawidłowo! Kwasica metaboliczna z dużą luką anionową (HAGMA) to klasyczny objaw toksycznych metabolitów glikolu etylenowego (kwas glikolowy, glioksalowy, szczawiowy)."
        },
        {
          text: "Kwasica oddechowa z prawidłową luką anionową wywołana zatruciem tlenkiem węgla u pacjenta z przewlekłą obturacyjną chorobą płuc.",
          isCorrect: false,
          feedback: "Błąd. Niskie stężenie wodorowęglanów (HCO3 7) i wysoka luka anionowa (33) to pewny dowód na obecność kwasicy metabolicznej, a nie oddechowej."
        },
        {
          text: "Prawidłowy stan równowagi kwasowo-zasadowej niewymagający żadnej interwencji ani wyrównywania stężenia wodorowęglanów.",
          isCorrect: false,
          feedback: "Błąd. Wartość pH 7,08 to skrajna, bezpośrednio zagrażająca życiu kwasica; wymaga natychmiastowego leczenia odtrutkowego i dializy."
        },
        {
          text: "Zasadowica metaboliczna wywołana nadmiernym spożyciem zasadowej wody mineralnej przed przybyciem zespołu ratownictwa.",
          isCorrect: false,
          feedback: "Błąd. Wartość pH < 7,35 definiuje kwasicę; pH 7,08 to głęboka dekompensacja kwasicza zagrażająca zatrzymaniem akcji serca."
        }
      ]
    },
    {
      title: "Krok 3: Wyliczenie luki osmolarnej (Osmolal Gap)",
      desc: "Osmolalność surowicy zmierzona wynosi 345 mOsm/kg, a osmolalność wyliczona 295 mOsm/kg. Co oznacza podwyższona luka osmolarna (> 10–15 mOsm/kg)?",
      options: [
        {
          text: "Obecność w surowicy osmotycznie czynnej substancji drobnocząsteczkowej nielotnej (glikolu etylenowego lub metanolu) przed jej całkowitym zmetabolizowaniem.",
          isCorrect: true,
          feedback: "Prawidłowo! Luka osmolarna (Osm mierzona - Osm wyliczona > 50 mOsm/kg) w połączeniu z HAGMA jest patognomoniczna dla zatrucia glikolem lub metanolem."
        },
        {
          text: "Objaw rzekomego błędu pomiarowego osmometru laboratoryjnego niemający żadnego znaczenia w diagnostyce toksykologicznej.",
          isCorrect: false,
          feedback: "Błąd. Wyliczenie luki osmolarnej jest kluczowym narzędziem ratunkowym przy braku natychmiastowego dostępu do toksykologicznej chromatografii gazowej."
        },
        {
          text: "Dowód na całkowity brak jakichkolwiek toksyn w organizmie pacjenta i wskazanie do natychmiastowego wypisu do domu.",
          isCorrect: false,
          feedback: "Błąd. Wysoka luka osmolarna to alarmujący dowód na obecność we krwi obcych cząsteczek chemicznych o małej masie cząsteczkowej."
        },
        {
          text: "Wskazanie do natychmiastowego podania 10 litrów 3% roztworu chlorku sodu w celu dalszego zwiększenia osmolalności krwi.",
          isCorrect: false,
          feedback: "Błąd. Podanie soli hipertonicznej pogłębiłoby hiperosmolalność i wywołało nieodwracalne uszkodzenie komórek mózgowia."
        }
      ]
    },
    {
      title: "Krok 4: Badanie ogólne moczu i fluorescencja w lampie Wooda",
      desc: "Jakie swoiste znaleziska w badaniu moczu stanowią silną wskazówkę przemawiającą za spożyciem płynu chłodniczego z glikolem etylenowym?",
      options: [
        {
          text: "Obecność kryształów szczawianu wapnia w osadzie moczu oraz seledynowa fluorescencja moczu w świetle lampy Wooda (obecność fluoresceiny).",
          isCorrect: true,
          feedback: "Prawidłowo! Płyny do chłodnic zawierają fluoresceinę (świecącą w UV) oraz glikol metabolizowany do kwasu szczawiowego, krystalizującego z wapniem w nerkach."
        },
        {
          text: "Całkowicie czysty, przejrzysty mocz bez jakichkolwiek kryształów, białka ani zabarwienia wykluczający zatrucie w 100%.",
          isCorrect: false,
          feedback: "Błąd. Kwas szczawiowy krystalizuje z wapniem, tworząc charakterystyczne kryształy szczawianu wapnia w cewkach nerkowych i osadzie moczu."
        },
        {
          text: "Mocz barwy fioletowej wywołany masowym wydalaniem czystego manganu przez uszkodzone kłębuszki nerkowe.",
          isCorrect: false,
          feedback: "Błąd. Glikol etylenowy powoduje wytrącanie szczawianów wapnia, a nie związków manganu; badanie mikroskopowe osadu jest kluczowe."
        },
        {
          text: "Wykrycie obecności żywych larw pasożytów jelitowych w próbce moczu pobranej bezpośrednio z cewnika na sali reanimacyjnej.",
          isCorrect: false,
          feedback: "Błąd. Pasożyty jelitowe nie mają związku z chemicznym zatruciem płynami przeciwzamarzającymi do chłodnic samochodowych."
        }
      ]
    },
    {
      title: "Krok 5: Swoiste leczenie odtrutkowe (Inhibicja dehydrogenazy alkoholowej ADH)",
      desc: "Co stanowi podstawę swoistego leczenia odtrutkowego mającego na celu zablokowanie powstawania toksycznych metabolitów glikolu etylenowego?",
      options: [
        {
          text: "Fomepizol (15 mg/kg m.c. i.v. w dawce nasycającej) lub w razie niedostępności – 10% etanol dożylnie (cel: stężenie etanolu we krwi 1,0–1,5 promila).",
          isCorrect: true,
          feedback: "Prawidłowo! Fomepizol i etanol silnie blokują dehydrogenazę alkoholową (ADH), uniemożliwiając konwersję glikolu do toksycznego kwasu glikolowego i szczawiowego."
        },
        {
          text: "Podanie dożylne disulfiramu (Anticolu) w celu natychmiastowego zablokowania dehydrogenazy aldehydowej w wątrobie.",
          isCorrect: false,
          feedback: "Błąd. Disulfiram nasila gromadzenie toksycznych aldehydów i wywołałby gwałtowne załamanie hemodynamiczne; jest bezwzględnie przeciwwskazany!"
        },
        {
          text: "Zalecenie podania czystego octu spirytusowego przez zgłębnik żołądkowy w celu chemicznej neutralizacji alkoholu.",
          isCorrect: false,
          feedback: "Błąd. Kwas octowy pogłębi śmiertelną kwasicę metaboliczną i poparzy przewód pokarmowy; odtrutką jest fomepizol lub etanol."
        },
        {
          text: "Wdrożenie dożylnego wlewu witaminy C w dawce 50 gramów jako jedynego leku odtrutkowego u pacjenta na sali SOR.",
          isCorrect: false,
          feedback: "Błąd. Witamina C jest metabolizowana do szczawianów i dodatkowo nasili krystalizację w nerkach; nie blokuje enzymu ADH."
        }
      ]
    },
    {
      title: "Krok 6: Suplementacja kofaktorów metabolicznych (Tiamina i Pirydoksyna)",
      desc: "Jakie witaminy należy podać dożylnie w celu stymulacji alternatywnych, nietoksycznych szlaków metabolicznych kwasu glioksalowego?",
      options: [
        {
          text: "Tiamina (witamina B1 – 100 mg i.v.) oraz pirydoksyna (witamina B6 – 50 mg i.v.), które kierują metabolizm ku nietoksycznym związkom (glicynie).",
          isCorrect: true,
          feedback: "Prawidłowo! Tiamina i pirydoksyna to kofaktory enzymatyczne ułatwiające przekształcanie toksycznego glioksalu w nietoksyczne metabolity zamiast w kwas szczawiowy."
        },
        {
          text: "Witamina D3 w dawce 500 000 j.m. domięśniowo w celu gwałtownego podniesienia stężenia wapnia w surowicy krwi.",
          isCorrect: false,
          feedback: "Błąd. Nadmiar witaminy D nasili krystalizację szczawianów wapnia w nerkach; kofaktorami szlaków są witaminy B1 i B6."
        },
        {
          text: "Podanie witaminy K w dawce 100 mg w szybkim bolusie dożylnym bez monitorowania parametrów układu krzepnięcia u pacjenta na sali SOR.",
          isCorrect: false,
          feedback: "Błąd. Witamina K nie wpływa na metabolizm glikolu; kofaktorami są tiamina i pirydoksyna."
        },
        {
          text: "Całkowity zakaz podawania jakichkolwiek witamin z grupy B ze względu na ich rzekome wiązanie cząsteczek fomepizolu.",
          isCorrect: false,
          feedback: "Błąd. Suplementacja B1 i B6 jest oficjalnym standardem toksykologicznym w zatruciu glikolem etylenowym."
        }
      ]
    },
    {
      title: "Krok 7: Kwalifikacja do pilnej hemodializy ratunkowej",
      desc: "Jakie są bezwzględne kryteria kwalifikacji do natychmiastowej hemodializy (HD) u pacjenta z ostrym zatruciem glikolem etylenowym?",
      options: [
        {
          text: "Ciężka kwasica metaboliczna (pH < 7,25–7,30 oporna na leczenie), stężenie glikolu > 50 mg/dl, ostra niewydolność nerek lub ciężkie zaburzenia elektrolitowe.",
          isCorrect: true,
          feedback: "Prawidłowo! Hemodializa usuwa zarówno niezmetabolizowany glikol etylenowy, jak i jego wysoce toksyczne metabolity (kwas glikolowy) oraz koryguje kwasicę."
        },
        {
          text: "Wskazaniem do dializy jest wyłącznie obecność pojedynczego kryształu w moczu u pacjenta z całkowicie prawidłowym pH krwi 7,42.",
          isCorrect: false,
          feedback: "Błąd. Sam kryształ bez kwasicy i przy niskim stężeniu toksyny nie jest wskazaniem do HD; kryterium stanowi dekompensacja kwasicza i stężenie glikolu."
        },
        {
          text: "Hemodializa jest bezwzględnie zakazana w zatruciach chemicznych ze względu na rzekome ryzyko rozerwania błony dializacyjnej przez glikol.",
          isCorrect: false,
          feedback: "Błąd. Glikol etylenowy i kwas glikolowy to małe cząsteczki rozpuszczalne w wodzie, doskonale usuwane przez standardową hemodializę ratunkową."
        },
        {
          text: "Zalecenie stosowania wyłącznie lewatywy z ciepłej kawy bez wprowadzania jakichkolwiek procedur nerkozastępczych.",
          isCorrect: false,
          feedback: "Błąd. Metody nienaukowe są skrajnie niebezpieczne; jedyną skuteczną metodą eliminacji toksyny jest hemodializa przerywana."
        }
      ]
    },
    {
      title: "Krok 8: Powikłania nerkowe i dyspozycja na OIT (Nefropatia szczawianowa)",
      desc: "W 2. dobie hospitalizacji u pacjenta rozwija się skąpomocz, a kreatynina rośnie do 5,4 mg/dl. Jakie jest podłoże uszkodzenia nerek i plan dalszego leczenia?",
      options: [
        {
          text: "Ostra martwica cewek nerkowych wywołana mechanicznym zablokowaniem i cytotoksycznością kryształów szczawianu wapnia; konieczna kontynuacja dializoterapii na OIT.",
          isCorrect: true,
          feedback: "Prawidłowo! Wytrącanie szczawianów w cewkach nerkowych wywołuje ostrą martwicę (ATN); czynność nerek może powrócić po kilku tygodniach dializoterapii."
        },
        {
          text: "Wskazanie do natychmiastowego usunięcia obu nerek i rozpoczęcia poszukiwań komercyjnego dawcy narządu w trybie pilnym.",
          isCorrect: false,
          feedback: "Błąd. Uszkodzenie nerek po glikolu często ma charakter odwracalny; pacjent wymaga leczenia nerkozastępczego na OIT do czasu regeneracji cewek."
        },
        {
          text: "Wypisanie pacjenta do domu z informacją, że bezmocz ustąpi samoistnie po wypiciu szklanki soku z kiszonej kapusty.",
          isCorrect: false,
          feedback: "Błąd. Nieleczony bezmocz w przebiegu ostrej niewydolności nerek doprowadzi do śmiertelnego obrzęku płuc i zatrzymania krążenia w hiperkaliemii."
        },
        {
          text: "Wdrożenie agresywnej radioterapii miednicy w dawkach zbieżnych z podejrzeniem guza Wilmsa u dorosłego pacjenta.",
          isCorrect: false,
          feedback: "Błąd. Przyczyną niewydolności nerek jest ostra nefropatia szczawianowa po zatruciu toksycznym alkoholem, a nie nowotwór złośliwy."
        }
      ]
    }
  ],

  173: [
    {
      title: "Krok 1: Wstępna ocena ABCDE i rozpoznanie klasycznej triady opioidowej",
      desc: "26-latek przywieziony z klatki schodowej w stanie głębokiej śpiączki (GCS 3), z częstością oddechów 4/min, sinicą warg i szpilkowatymi źrenicami (1 mm). SpO2 72%.",
      options: [
        {
          text: "Natychmiastowe udrożnienie dróg oddechowych, wentylacja workiem z maską i 100% tlenem oraz przygotowanie do podania swoistej odtrutki (naloksonu).",
          isCorrect: true,
          feedback: "Prawidłowo! Triada: śpiączka, szpilkowate źrenice i skrajna depresja oddechowa to podręcznikowy obraz ostrego zatrucia opioidami (np. heroiną, fentanylem)."
        },
        {
          text: "Pozostawienie pacjenta na wznak na podłodze i natychmiastowe wykonanie tomografii komputerowej głowy z potrójnym kontrastem.",
          isCorrect: false,
          feedback: "Błąd. Przy częstości oddechów 4/min pacjent w ciągu 2 minut dozna zatrzymania krążenia w mechanizmie asfiksji; priorytetem jest wentylacja i nalokson."
        },
        {
          text: "Podanie dożylne 10 mg midazolamu w celu pogłębienia snu i wyciszenia układu nerwowego u nieprzytomnego pacjenta.",
          isCorrect: false,
          feedback: "Błąd. Benzodiazepiny nasilają depresję oddechową wywołaną przez opioidy; ich podanie doprowadzi do natychmiastowego bezdechu i zgonu."
        },
        {
          text: "Intensywne polewanie twarzy pacjenta wrzącą wodą i bicie po twarzy w celu wymuszenia powrotu świadomości na izbie przyjęć.",
          isCorrect: false,
          feedback: "Błąd. Działania agresywne i nieprofesjonalne są niedopuszczalne; pacjent w głębokiej śpiączce wymaga udrożnienia dróg oddechowych i odtrutki."
        }
      ]
    },
    {
      title: "Krok 2: Natychmiastowa wentylacja i natlenianie pacjenta",
      desc: "Dlaczego przed wstrzyknięciem naloksonu należy bezwzględnie rozpocząć wentylację workiem samorozprężalnym z tlenem?",
      options: [
        {
          text: "Podanie naloksonu w warunkach głębokiej hipoksji i kwasicy wywołuje gwałtowny wyrzut katecholamin, grożąc groźnymi arytmiami komorowymi i obrzękiem płuc.",
          isCorrect: true,
          feedback: "Prawidłowo! Wstępne natlenienie workiem Ambu przed podaniem naloksonu chroni mięsień sercowy przed migotaniem komór wywołanym nagłym wyrzutem adrenaliny."
        },
        {
          text: "Nalokson działa wyłącznie w obecności podtlenku azotu i nie ma żadnej aktywności farmakologicznej w środowisku tlenowym.",
          isCorrect: false,
          feedback: "Błąd. Nalokson jest czystym antagonistą receptorów opioidowych mi, kappa i delta; wentylacja tlenem służy bezpieczeństwu hemodynamicznemu."
        },
        {
          text: "Wentylacja mechaniczna jest zabiegiem zbędnym, ponieważ pacjent z zatruciem opioidami samoczynnie zacznie oddychać po 48 godzinach.",
          isCorrect: false,
          feedback: "Błąd. Bez sztucznej wentylacji pacjent z częstością oddechów 4/min dozna nieodwracalnego uszkodzenia mózgu i zgonu w ciągu kilku minut."
        },
        {
          text: "Tlenoterapia służy wyłącznie do zmycia barwników z powłok skórnych pacjenta przed badaniem przedmiotowym.",
          isCorrect: false,
          feedback: "Błąd. Tlenoterapia i wentylacja ratują życie, zapobiegając zatrzymaniu krążenia w mechanizmie hipoksemii (PEA/asystolia)."
        }
      ]
    },
    {
      title: "Krok 3: Miareczkowana podaż swoistego antagonisty (Nalokson)",
      desc: "Jaka jest prawidłowa technika i cel dawkowania naloksonu u pacjenta uzależnionego od opioidów na ostrym dyżurze?",
      options: [
        {
          text: "Miareczkowanie dożylne małych dawek (0,04–0,1 mg co 2–3 minuty lub 0,4 mg i.m./i.n.); celem jest powrót wydolnego oddechu własnego (> 10–12/min), a nie pełne wybudzenie.",
          isCorrect: true,
          feedback: "Prawidłowo! Celem jest przywrócenie bezpiecznego napędu oddechowego. Miareczkowanie zapobiega gwałtownemu, powikłanemu zespołowi odstawiennemu."
        },
        {
          text: "Podanie jednorazowego bolusu 10 mg naloksonu dożylnie 'push' w celu natychmiastowego postawienia pacjenta na nogi w ciągu 3 sekund.",
          isCorrect: false,
          feedback: "Błąd. Masywny bolus wywoła burzę wegetatywną: piorunujący obrzęk płuc, skrajną agresję, tachykardię, wymioty z aspiracją i ucieczkę z oddziału."
        },
        {
          text: "Podanie naloksonu w postaci tabletek dopochwowych u każdego nieprzytomnego mężczyzny z podejrzeniem intoksykacji.",
          isCorrect: false,
          feedback: "Błąd. Drogi podania w stanie nagłym to dożylna, domięśniowa, donosowa (i.n.) lub doszpikowa; droga dopochwowa u mężczyzny jest błędem."
        },
        {
          text: "Nalokson należy podawać wyłącznie w postaci ciągłego wlewu doodbytniczego przez okres co najmniej 14 dni roboczych.",
          isCorrect: false,
          feedback: "Błąd. W ostrym bezdechu lek podaje się natychmiast dożylnie, domięśniowo lub donosowo w celu ratowania życia w pierwszych sekundach."
        }
      ]
    },
    {
      title: "Krok 4: Toksokinetyka i ryzyko ponownego załamania oddechowego",
      desc: "Pacjent zaczął oddychać prawidłowo po 0,4 mg naloksonu. Dlaczego pozostawienie go bez nadzoru lub wypisanie ze szpitala jest śmiertelnie niebezpieczne?",
      options: [
        {
          text: "Czas działania naloksonu wynosi zaledwie 30–90 minut, podczas gdy większość opioidów działa od 4 do 24 godzin; po ustąpieniu odtrutki powraca bezdech i śpiączka!",
          isCorrect: true,
          feedback: "Prawidłowo! Okres półtrwania naloksonu jest znacznie krótszy niż T1/2 heroiny, metadonu czy fentanylu. Nawrót depresji oddechowej jest najczęstszą przyczyną zgonów po wypisie."
        },
        {
          text: "Nalokson po 30 minutach przekształca się w organizmie w czysty cyjanek potasu, wywołując wtórne zatrucie chemiczne.",
          isCorrect: false,
          feedback: "Błąd. Nalokson jest metabolizowany w wątrobie do nieaktywnego glukuronidu; zagrożeniem jest nawrót działania niespłukanego opioidu."
        },
        {
          text: "Pacjent natychmiast po przebudzeniu ulega trwałej amnezji całkowitej i zapomina jak należy oddychać przez nos.",
          isCorrect: false,
          feedback: "Błąd. Depresja oddechowa wynika z ponownego zajęcia receptorów mi w pniu mózgu przez krążący opioid po eliminacji naloksonu."
        },
        {
          text: "Nalokson gwarantuje trwałe zablokowanie receptorów opioidowych na okres 6 miesięcy od pojedynczego podania dożylnego.",
          isCorrect: false,
          feedback: "Błąd. Krótki czas działania naloksonu (poniżej 1-1,5 h) jest jego główną wadą farmakokinetyczną, wymagającą wielogodzinnej obserwacji."
        }
      ]
    },
    {
      title: "Krok 5: Wskazania do ciągłego wlewu dożylnego naloksonu",
      desc: "W jakich sytuacjach klinicznych zachodzi konieczność uruchomienia stałego wlewu dożylnego naloksonu za pomocą pompy infuzyjnej?",
      options: [
        {
          text: "Zatrucie opioidami długodziałającymi (np. metadon, buprenorfina, preparaty o zmodyfikowanym uwalnianiu) lub nawracające epizody hipowentylacji po bolusach.",
          isCorrect: true,
          feedback: "Prawidłowo! W zatruciach metadonem nawrót śpiączki występuje wielokrotnie; wlew podtrzymujący (2/3 dawki skutecznej na godzinę) zapobiega asfiksji."
        },
        {
          text: "Każdy pacjent po wypiciu jednej filiżanki zielonej herbaty z dodatkiem miodu lipowego na ostrym dyżurze.",
          isCorrect: false,
          feedback: "Błąd. Wlew naloksonu stosuje się wyłącznie w zatruciach opioidami, a nie po spożyciu napojów bezalkoholowych."
        },
        {
          text: "Obecność prawidłowej częstości oddechów 16/min i pełnego kontaktu logicznego po ustąpieniu znieczulenia miejscowego u dentysty.",
          isCorrect: false,
          feedback: "Błąd. Przy braku objawów depresji oddechowej wlew naloksonu jest nieuzasadniony i może wywołać niepotrzebny dyskomfort."
        },
        {
          text: "Wskazanie do wlewu zachodzi wyłącznie wtedy, gdy stężenie glukozy we krwi obwodowej przekracza 500 mg/dl.",
          isCorrect: false,
          feedback: "Błąd. Wskazaniem do wlewu jest kinetyka zażytego opioidu i nawroty bezdechu, a nie poziom glikemii pacjenta."
        }
      ]
    },
    {
      title: "Krok 6: Diagnostyka powikłań towarzyszących przedawkowaniu opioidów",
      desc: "Pacjent leżał bez ruchu na twardym podłożu przez wiele godzin przed znalezieniem. Jakie powikłania narządowe należy bezwzględnie wykluczyć?",
      options: [
        {
          text: "Rabdomiolizę z ucisku (oznaczenie kinazy CK, mioglobiny i potasu pod kątem ostrej martwicy nerek) oraz zachłystowe zapalenie płuc i niekardiogenny obrzęk płuc.",
          isCorrect: true,
          feedback: "Prawidłowo! Długotrwałe unieruchomienie w śpiączce wywołuje zespół zmiażdżenia i rabdomiolizę. Hipoksja i aspiracja treści żołądkowej uszkadzają płuca."
        },
        {
          text: "Wykluczenie wyłącznie ostrego zapalenia ucha środkowego za pomocą badania otoskopowego bez badań biochemicznych krwi.",
          isCorrect: false,
          feedback: "Błąd. Kluczowe powikłania to rabdomioliza, hiperkaliemia, uszkodzenie nerek i zachłystowe zapalenie płuc, wymagające badań krwi i RTG."
        },
        {
          text: "Wykrycie obecności wrodzonej wady zastawki trójdzielnej serca za pomocą rezonansu magnetycznego całego ciała w trybie pilnym.",
          isCorrect: false,
          feedback: "Błąd. Badania muszą skupić się na skutkach hipoksji i ucisku mięśni; rezonans całego ciała nie jest badaniem ratunkowym na SOR."
        },
        {
          text: "Poszukiwanie objawów choroby wysokościowej u pacjenta znalezionego na poziomie morza w centrum dużego miasta.",
          isCorrect: false,
          feedback: "Błąd. Obrzęk płuc po opioidach ma mechanizm niekardiogenny (zwiększona przepuszczalność pęcherzykowo-włośniczkowa i ujemne ciśnienie w drogach oddechowych)."
        }
      ]
    },
    {
      title: "Krok 7: Postępowanie w ostrym zespole odstawiennym (Po nadmiarze naloksonu)",
      desc: "Jeśli po zbyt dużej dawce naloksonu pacjent wybudzi się gwałtownie, jest skrajnie pobudzony, agresywny, poci się, wymiotuje i zgłasza ból, jak postąpić?",
      options: [
        {
          text: "Uspokojenie słowne, leczenie objawowe (np. klonidyna, leki przeciwwymiotne: ondansetron, paracetamol), unikanie ponownego podawania opioidów i nadzór na sali.",
          isCorrect: true,
          feedback: "Prawidłowo! Ostry zespół odstawienny jest nieprzyjemny, lecz rzadko zagraża życiu; należy unikać 'naprawiania' go ponowną dawką narkotyku."
        },
        {
          text: "Natychmiastowe podanie pacjentowi 50 mg czystej dożylnej heroiny w celu 'uśmierzenia jego cierpień' na sali reanimacyjnej.",
          isCorrect: false,
          feedback: "Błąd. Podanie opioidu pacjentowi po przedawkowaniu natychmiast odtworzy stan zagrożenia życia, gdy przestanie działać nalokson!"
        },
        {
          text: "Zastosowanie fizycznego unieruchomienia za pomocą metalowych łańcuchów przymocowanych do ściany oddziału ratunkowego.",
          isCorrect: false,
          feedback: "Błąd. Przymus bezpośredni stosuje się wyłącznie certyfikowanymi pasami bezpieczeństwa zgodnie z ustawą o ochronie zdrowia psychicznego."
        },
        {
          text: "Podanie dożylne 1000 mg kurary w celu całkowitego sparaliżowania mięśni szkieletowych pacjenta bez znieczulenia.",
          isCorrect: false,
          feedback: "Błąd. Zwiotczenie pacjenta przytomnego bez sedacji to tortura wywołująca śmierć przez uduszenie; pobudzenie leczy się bezpiecznymi lekami."
        }
      ]
    },
    {
      title: "Krok 8: Minimalny czas obserwacji i dyspozycja oddziałowa",
      desc: "Pacjent po zatruciu standardową heroiną po 2 godzinach chce opuścić szpital na własne żądanie. Jaki jest minimalny bezpieczny czas obserwacji?",
      options: [
        {
          text: "Minimum 4–6 godzin obserwacji po zwykłej heroinie (i minimum 24 godziny po opioidach o przedłużonym działaniu / metadonie) ze względu na ryzyko nawrotu bezdechu.",
          isCorrect: true,
          feedback: "Prawidłowo! Przed upływem 4–6 godzin od podania naloksonu pacjent nie może być bezpiecznie wypisany, gdyż po spadku stężenia odtrutki powraca depresja oddechowa."
        },
        {
          text: "Wypisanie pacjenta po 5 minutach od wybudzenia i wręczenie mu recepty na silne leki nasenne z grupy barbituranów do realizacji w aptece.",
          isCorrect: false,
          feedback: "Błąd. Wypisanie po 5 minutach doprowadzi do zgonu pacjenta na przystanku autobusowym w mechanizmie nawrotu bezdechu po naloksonie."
        },
        {
          text: "Bezwzględna hospitalizacja w izolatce o podciśnieniu przez okres minimum 12 miesięcy bez kontaktu z rodziną.",
          isCorrect: false,
          feedback: "Błąd. Przedawkowanie opioidów nie jest chorobą zakaźną; pacjent po 6–24 h stabilnej obserwacji może być skierowany do ośrodka leczenia uzależnień."
        },
        {
          text: "Zalecenie natychmiastowego powrotu do zażywania narkotyków w podwójnej dawce w celu 'zbudowania tolerancji' ustroju.",
          isCorrect: false,
          feedback: "Błąd. Po epizodzie przedawkowania tolerancja może być obniżona; pacjent wymaga edukacji profilaktycznej i skierowania do programu substytucyjnego."
        }
      ]
    }
  ],

  174: [
    {
      title: "Krok 1: Wstępna ocena ABCDE i rozpoznanie zagrażającej hipertermii",
      desc: "34-latek leczony haloperydolem przywieziony z oddziału psychiatrycznego z gorączką 40,4°C, uogólnioną sztywnością mięśni ('rura ołowiana'), obfitymi potami, tachykardią 130/min i mutyzmem.",
      options: [
        {
          text: "Ocena ABCDE, tlen, kaniule i.v., natychmiastowe rozpoczęcie aktywnego chłodzenia fizykalnego i pobranie krwi na gazometrię oraz kinazę CK.",
          isCorrect: true,
          feedback: "Prawidłowo! Hipertermia > 40°C, sztywność mięśniowa (lead-pipe rigidity) i niestabilność wegetatywna po neuroleptykach to klasyczny złośliwy zespół neuroleptyczny (NMS)."
        },
        {
          text: "Podanie kolejnej dawki haloperydolu 10 mg domięśniowo w celu wyciszenia niepokoju i opanowania objawów psychotycznych.",
          isCorrect: false,
          feedback: "Błąd. Podanie kolejnej dawki leku przeciwpsychotycznego w NMS doprowadzi do natychmiastowej eskalacji sztywności, hipertermii 42°C i zgonu pacjenta!"
        },
        {
          text: "Zastosowanie ciepłych okładów z koca elektrycznego w celu 'wypocenia gorączki' na sali obserwacyjnej SOR.",
          isCorrect: false,
          feedback: "Błąd. W NMS dochodzi do załamania termoregulacji i masywnej produkcji ciepła przez sztywne mięśnie; dogrzewanie doprowadzi do ugotowania neuronów mózgu."
        },
        {
          text: "Wypisanie pacjenta z rozpoznaniem symulacji objawów i zalecenie intensywnego spaceru na świeżym powietrzu w upalny letni dzień.",
          isCorrect: false,
          feedback: "Błąd. NMS to stan bezpośredniego zagrożenia życia o śmiertelności do 10–20%; pacjent wymaga natychmiastowej intensywnej terapii."
        }
      ]
    },
    {
      title: "Krok 2: Różnicowanie z zespołem serotoninowym (Kluczowe odchylenia)",
      desc: "Jakie cechy badania fizykalnego odróżniają złośliwy zespół neuroleptyczny (NMS) od ostrego zespołu serotoninowego?",
      options: [
        {
          text: "NMS: powolny początek, sztywność 'rury ołowianej', bradykinezja; w zespole serotoninowym: nagły początek, klonusy i wybitna hiperrefleksja.",
          isCorrect: true,
          feedback: "Prawidłowo! Brak klonusów, wybitna sztywność pozapiramidowa ('ołowiana') oraz powolna dynamika rozwoju jednoznacznie wskazują na NMS, a nie toksyczność serotoninową."
        },
        {
          text: "W NMS pacjent zawsze ma temperaturę ciała poniżej 35 stopni Celsjusza i spowolnioną akcję serca do 30 uderzeń na minutę.",
          isCorrect: false,
          feedback: "Błąd. Kardynalnym objawem NMS jest zagrażająca życiu hipertermia (> 40°C) oraz tachykardia i wahania ciśnienia tętniczego."
        },
        {
          text: "Zespół serotoninowy występuje wyłącznie po zażyciu antybiotyków z grupy penicylin, a NMS po lekach przeciwbólowych z paracetamolem.",
          isCorrect: false,
          feedback: "Błąd. NMS wynika z blokady receptorów dopaminowych D2 (neuroleptyki), a zespół serotoninowy z nadmiaru serotoniny (SSRI, SNRI, tramadol)."
        },
        {
          text: "Oba stany są całkowicie fikcyjne i nie występują w rzeczywistej praktyce klinicznej współczesnych szpitalnych oddziałów ratunkowych.",
          isCorrect: false,
          feedback: "Błąd. NMS i zespół serotoninowy to jedne z najgroźniejszych stanów nagłych w farmakologii, wymagające natychmiastowego różnicowania."
        }
      ]
    },
    {
      title: "Krok 3: Natychmiastowe odstawienie leków dopaminolitycznych",
      desc: "Co stanowi bezwzględny, najważniejszy i natychmiastowy krok terapeutyczny po postawieniu podejrzenia złośliwego zespołu neuroleptycznego?",
      options: [
        {
          text: "Natychmiastowe przerwanie podawania wszystkich leków przeciwpsychotycznych (klasycznych i atypowych) oraz innych leków blokujących receptory D2 (np. metoklopramidu).",
          isCorrect: true,
          feedback: "Prawidłowo! Usunięcie czynnika wyzwalającego (blokady receptorów dopaminergicznych D2 w prążkowiu i podwzgórzu) jest warunkiem koniecznym przeżycia pacjenta."
        },
        {
          text: "Zwiększenie dawki neuroleptyku o 100% i dołączenie drugiego silnego leku przeciwpsychotycznego w postaci dożylnej.",
          isCorrect: false,
          feedback: "Błąd. Kontynuacja leków dopaminolitycznych podtrzymuje patomechanizm NMS i doprowadzi do zgonu w mechanizmie niewydolności wielonarządowej."
        },
        {
          text: "Odczekanie 14 dni na samoistne wypłukanie leków z ustroju bez modyfikowania dotychczasowej farmakoterapii psychiatrycznej.",
          isCorrect: false,
          feedback: "Błąd. NMS postępuje w ciągu godzin; natychmiastowe odstawienie neuroleptyków jest pierwszym i najważniejszym zaleceniem wytycznych."
        },
        {
          text: "Podanie pacjentowi 500 mg kofeiny w czystym bolusie dożylnym w celu pobudzenia receptorów adenozynowych w mózgu.",
          isCorrect: false,
          feedback: "Błąd. Kofeina nasili tachykardię, pobudzenie i hipertermię; podstawą jest przerwanie blokady dopaminergicznej i sedacja."
        }
      ]
    },
    {
      title: "Krok 4: Agresywne chłodzenie fizykalne i stabilizacja hemodynamiczna",
      desc: "Temperatura wynosi 40,4°C. Dlaczego standardowe leki przeciwgorączkowe (paracetamol, NLPZ) są nieskuteczne w NMS i jak należy chłodzić chorego?",
      options: [
        {
          text: "Gorączka wynika ze skurczu mięśni (obwodowo), a nie z przestawienia termostatu w podwzgórzu; skuteczne jest wyłącznie chłodzenie fizykalne.",
          isCorrect: true,
          feedback: "Prawidłowo! Leki przeciwgorączkowe działają na podwzgórzowy ośrodek termoregulacji; w NMS ciepło generują skurczone mięśnie. Stosuje się lód, koce chłodzące i zimne płyny i.v."
        },
        {
          text: "Leki przeciwgorączkowe są w 100% skuteczne i podanie 500 mg paracetamolu doustnie natychmiast obniży temperaturę do 36,6°C.",
          isCorrect: false,
          feedback: "Błąd. NLPZ i paracetamol są całkowicie nieskuteczne w hipertermii mięśniowej; opieranie się na nich doprowadzi do obrzęku mózgu z przegrzania."
        },
        {
          text: "Pacjenta należy umieścić w saunie parowej o temperaturze 90 stopni Celsjusza w celu wyrównania temperatur ciała i otoczenia.",
          isCorrect: false,
          feedback: "Błąd. Dodatkowe dogrzewanie pacjenta z temperaturą 40,4°C doprowadzi do natychmiastowej denaturacji białek ustrojowych i zgonu."
        },
        {
          text: "Zalecenie podania dożylnego 2000 ml wrzącej soli fizjologicznej w celu stymulacji wydalania moczu przez nerki u pacjenta na sali SOR.",
          isCorrect: false,
          feedback: "Błąd. Płynoterapia w NMS polega na podawaniu schłodzonych krystaloidów (4°C) w celu obniżenia temperatury głębokiej ciała pacjenta."
        }
      ]
    },
    {
      title: "Krok 5: Diagnostyka laboratoryjna rabdomiolizy (Kinaza kreatynowa CK)",
      desc: "Masywny, tężcowy skurcz mięśni prowadzi do ich rozpadu. Jaki parametr laboratoryjny jest czułym wskaźnikiem ciężkości NMS i zagrożenia niewydolnością nerek?",
      options: [
        {
          text: "Aktywność kinazy kreatynowej (CK – często przekraczająca 10 000–50 000 IU/l), mioglobinuria, hiperkaliemia oraz narastające stężenie kreatyniny.",
          isCorrect: true,
          feedback: "Prawidłowo! Skrajny wzrost CK odzwierciedla rozpad włókien mięśniowych (rabdomiolizę). Mioglobina zatyka cewki nerkowe, grożąc ostrym uszkodzeniem nerek (AKI)."
        },
        {
          text: "Izolowane oznaczenie stężenia żelaza w surowicy bez konieczności badania enzymów mięśniowych ani parametrów nerkowych.",
          isCorrect: false,
          feedback: "Błąd. Kluczowym zagrożeniem metabolicznym w NMS jest rabdomioliza, hiperkaliemia i ostra mocznica; oznaczenie CK i elektrolitów jest bezwzględne."
        },
        {
          text: "Stężenie kinazy kreatynowej w NMS zawsze wynosi zero, ponieważ mięśnie szkieletowe przestają wytwarzać jakiekolwiek enzymy.",
          isCorrect: false,
          feedback: "Błąd. W NMS kinaza kreatynowa osiąga jedne z najwyższych wartości spotykanych w medycynie (często > 20 000–100 000 IU/l)."
        },
        {
          text: "Wykrycie obecności przeciwciał przeciwko wirusowi różyczki w klasie IgM jako jedynego istotnego odchylenia laboratoryjnego.",
          isCorrect: false,
          feedback: "Błąd. NMS jest powikłaniem farmakologicznym leków przeciwpsychotycznych, a nie infekcją wirusową; priorytetem jest ocena rozpadu mięśni."
        }
      ]
    },
    {
      title: "Krok 6: Celowana farmakoterapia zwiotczająca i dopaminergiczna",
      desc: "Jakie leki o działaniu swoistym (miorelaksacyjnym i pro-dopaminergicznym) należy wdrożyć w umiarkowanym i ciężkim NMS wg wytycznych toksykologicznych?",
      options: [
        {
          text: "Dantrolen (1–2,5 mg/kg i.v. w bolusie, max 10 mg/kg/d – inhibitor uwalniania wapnia w mięśniach) w połączeniu z bromokryptyną (2,5–5 mg co 8 h p.o./sonda).",
          isCorrect: true,
          feedback: "Prawidłowo! Dantrolen bezpośrednio zwiotcza mięśnie i przerywa produkcję ciepła, a bromokryptyna (agonista D2) przełamuje ośrodkową blokadę dopaminergiczną."
        },
        {
          text: "Podanie dożylne suksametonium (cholina) w dawce nasycającej w celu chemicznego zwiotczenia mięśni szkieletowych pacjenta.",
          isCorrect: false,
          feedback: "Błąd. Suksametonium w rabdomiolizie wywoła gwałtowny, śmiertelny wyrzut potasu z uszkodzonych mięśni i zatrzymanie krążenia w asystolii!"
        },
        {
          text: "Zastosowanie dożylnego wlewu fenotiazyn w wysokich dawkach w celu opanowania tachykardii i pobudzenia autonomicznego.",
          isCorrect: false,
          feedback: "Błąd. Fenotiazyny to klasyczne neuroleptyki; ich podanie pogłębiłoby blokadę receptorów D2 i doprowadziło do natychmiastowego zgonu."
        },
        {
          text: "Wstrzyknięcie do mięśni czworogłowych 500 ml 10% chlorku potasu w celu wyrównania gospodarki elektrolitowej na sali SOR.",
          isCorrect: false,
          feedback: "Błąd. Pacjent z rabdomiolizą ma wysokie ryzyko śmiertelnej hiperkaliemii; podanie potasu doprowadzi do natychmiastowego migotania komór."
        }
      ]
    },
    {
      title: "Krok 7: Zwalczanie pobudzenia i sztywności benzodiazepinami",
      desc: "Jaka grupa leków uspokajających stanowi podstawowe leczenie wspomagające I rzutu w zwalczaniu sztywności i niestabilności wegetatywnej w NMS?",
      options: [
        {
          text: "Benzodiazepiny dożylnie (np. lorazepam 1–2 mg i.v. lub diazepam 5–10 mg i.v. powtarzane pod kontrolą oddechu), które obniżają napięcie mięśniowe i sedują OUN.",
          isCorrect: true,
          feedback: "Prawidłowo! Benzodiazepiny poprzez receptory GABA-A znoszą wzmożone napięcie mięśniowe, zmniejszają pobudzenie układu współczulnego i redukują gorączkę."
        },
        {
          text: "Podanie dożylne czystej amfetaminy w dawce 50 mg w celu pobudzenia spowolnionego psychoruchowo pacjenta neurologicznego.",
          isCorrect: false,
          feedback: "Błąd. Amfetamina nasila wyrzut amin katecholowych, drastycznie podnosząc temperaturę ciała i ciśnienie tętnicze, co jest zabójcze w NMS."
        },
        {
          text: "Całkowity zakaz stosowania jakichkolwiek leków uspokajających z obawy przed zatuszowaniem objawów mutyzmu akinetycznego.",
          isCorrect: false,
          feedback: "Błąd. Nieleczona sztywność i pobudzenie autonomiczne napędzają hipertermię i rozpad mięśni; benzodiazepiny są bezpiecznym lekiem I rzutu."
        },
        {
          text: "Zastosowanie doustnego ekstraktu z dziurawca zwyczajnego w wysokiej dawce w celu łagodzenia objawów depresyjnych u pacjenta.",
          isCorrect: false,
          feedback: "Błąd. Dziurawiec nie leczy ostrego NMS, wchodzi w liczne groźne interakcje farmakologiczne i nie ma zastosowania w medycynie ratunkowej."
        }
      ]
    },
    {
      title: "Krok 8: Profilaktyka nefropatii mioglobinowej i dyspozycja na OIT",
      desc: "Jakie postępowanie płynowe jest kluczowe dla ochrony nerek przed zablokowaniem cewek przez mioglobinę i jaka jest dyspozycja oddziałowa?",
      options: [
        {
          text: "Hospitalizacja na OIT, agresywna płynoterapia krystaloidami (diureza celowana > 2–3 ml/kg/h) z alkalizacją moczu wodorowęglanem sodu (cel pH moczu > 6,5).",
          isCorrect: true,
          feedback: "Prawidłowo! Forsowana diureza z alkalizacją moczu zapobiega precypitacji mioglobiny i tworzeniu toksycznej ferrihemiproteiny w cewkach nerkowych."
        },
        {
          text: "Całkowite wstrzymanie podawania jakichkolwiek płynów dożylnych w celu wywołania głębokiego odwodnienia tkanek obwodowych.",
          isCorrect: false,
          feedback: "Błąd. Odwodnienie przy rabdomiolizie gwarantuje natychmiastowe zablokowanie nerek mioglobiną i konieczność przewlekłej dializoterapii."
        },
        {
          text: "Wypisanie pacjenta do domu bezpośrednio z sali reanimacyjnej z zaleceniem powrotu do pracy fizycznej w hucie stali.",
          isCorrect: false,
          feedback: "Błąd. Pacjent w stanie ciężkim z NMS i rabdomiolizą wymaga wielodniowego intensywnego leczenia i monitorowania na oddziale OIT."
        },
        {
          text: "Przekazanie chorego do uzdrowiska klimatycznego w celu odbycia serii inhalacji solankowych bez zabezpieczenia dostępu naczyniowego.",
          isCorrect: false,
          feedback: "Błąd. NMS to stan bezpośredniego zagrożenia życia; pacjent wymaga monitorowania parametrów życiowych i dializoterapii w razie bezmoczu."
        }
      ]
    }
  ],

  175: [
    {
      title: "Krok 1: Wstępna ocena ABCDE i rozpoznanie toksyczności serotoninergicznej",
      desc: "24-latka leczona sertraliną zażyła na imprezie tramadol i MDMA (ecstasy). Trafia na SOR z gorączką 39,5°C, zlanymi potami, tachykardią 135/min, RR 160/95 i skrajnym pobudzeniem.",
      options: [
        {
          text: "Wstępna ocena ABCDE, tlenoterapia, kaniulacja żył, pobranie krwi na badania pilne, monitorowanie EKG i natychmiastowa sedacja benzodiazepinami.",
          isCorrect: true,
          feedback: "Prawidłowo! Połączenie leków serotoninergicznych (SSRI + tramadol + MDMA) z hipertermią, pobudzeniem i tachykardią wskazuje na ostry zespół serotoninowy."
        },
        {
          text: "Podanie pacjentce doustnego leku przeciwdepresyjnego z grupy inhibitorów MAO w celu wyrównania stężenia neuroprzekaźników w mózgu.",
          isCorrect: false,
          feedback: "Błąd. Dołączenie inhibitora MAO do SSRI i MDMA doprowadzi do katastrofalnej burzy serotoninowej, hipertermii > 42°C i natychmiastowego zgonu!"
        },
        {
          text: "Zalecenie picia dużej ilości gorącej herbaty z imbirem i założenie grubego wełnianego swetra w celu 'wypocenia toksyn'.",
          isCorrect: false,
          feedback: "Błąd. Dogrzewanie pacjentki z gorączką 39,5°C nasili obrzęk mózgu i rabdomiolizę; pacjentka wymaga natychmiastowego chłodzenia i sedacji."
        },
        {
          text: "Wypisanie pacjentki z izby przyjęć z rozpoznaniem symulowania objawów w celu uniknięcia odpowiedzialności za zażywanie narkotyków.",
          isCorrect: false,
          feedback: "Błąd. Zespół serotoninowy to stan bezpośredniego zagrożenia życia; śmiertelność w ciężkich postaciach z hipertermią przekracza 10–15%."
        }
      ]
    },
    {
      title: "Krok 2: Badanie neurologiczne i kryteria Huntera",
      desc: "Jaki zestaw objawów neurologicznych wg kryteriów Huntera (o czułości 84% i swoistości 97%) decyduje o pewnym rozpoznaniu zespołu serotoninowego?",
      options: [
        {
          text: "Obecność klonusów (spontanicznych lub ocznych), drżenia, wygórowanych odruchów ścięgnistych (hiperrefleksji) i wzmożonego napięcia mięśni.",
          isCorrect: true,
          feedback: "Prawidłowo! Klonusy (zwłaszcza skurcze kloniczne stóp i oczu) oraz hiperrefleksja w połączeniu z lekiem serotoninergicznym są kluczowe w kryteriach Huntera."
        },
        {
          text: "Całkowity brak jakichkolwiek odruchów ścięgnistych (arefleksja) z wiotkim porażeniem wszystkich czterech kończyn u pacjentki.",
          isCorrect: false,
          feedback: "Błąd. Zespół serotoninowy charakteryzuje się wybitną hiperrefleksją i klonusami; porażenie wiotkie nie jest objawem nadmiaru serotoniny."
        },
        {
          text: "Sztywność mięśniowa typu 'rury ołowianej' z hiporefleksją i brakiem jakichkolwiek klonusów rozwijająca się przez 4 tygodnie.",
          isCorrect: false,
          feedback: "Błąd. Taki obraz odpowiada złośliwemu zespołowi neuroleptycznemu (NMS), a nie ostrej toksyczności serotoninowej."
        },
        {
          text: "Obustronny zanik nerwów wzrokowych z całkowitą ślepotą przy zachowaniu prawidłowego napięcia mięśniowego u młodej pacjentki.",
          isCorrect: false,
          feedback: "Błąd. Zespół serotoninowy wywołuje rozszerzenie źrenic (mydriasis) i pobudzenie nerwowo-mięśniowe, a nie pierwotny zanik nerwu II."
        }
      ]
    },
    {
      title: "Krok 3: Natychmiastowe odstawienie leków proserotoninergicznych",
      desc: "Co stanowi absolutny priorytet terapeutyczny przed wdrożeniem jakichkolwiek leków swoistych w zespole serotoninowym?",
      options: [
        {
          text: "Natychmiastowe odstawienie wszystkich leków i substancji o działaniu serotoninergicznym (SSRI, SNRI, tramadol, dekstrometorfan, tryptany, inhibitory MAO).",
          isCorrect: true,
          feedback: "Prawidłowo! Przerwanie podawania leków serotoninergicznych zatrzymuje dalszą stymulację receptorów 5-HT1A i 5-HT2A w ośrodkowym układzie nerwowym."
        },
        {
          text: "Zwiększenie dawki sertraliny do maksymalnej dawki dobowej w celu 'wysycenia' wolnych receptorów mózgowych na sali ratunkowej.",
          isCorrect: false,
          feedback: "Błąd. Dalsze podawanie leków nasili gromadzenie serotoniny w szczelinie synaptycznej i doprowadzi do zgonu pacjentki w mechanizmie hipertermii."
        },
        {
          text: "Podanie dożylne 100 mg czystej serotoniny w szybkim bolusie w ramach próby tolerancji immunologicznej u młodej pacjentki.",
          isCorrect: false,
          feedback: "Błąd. Podanie serotoniny przy zespole serotoninowym wywoła natychmiastowe załamanie hemodynamiczne, skurcz naczyń i zatrzymanie krążenia."
        },
        {
          text: "Odczekanie 30 dni bez podejmowania jakichkolwiek decyzji terapeutycznych do czasu całkowitego wygaśnięcia działania leków w ustroju pacjentki.",
          isCorrect: false,
          feedback: "Błąd. Zespół serotoninowy wymaga natychmiastowego działania w ciągu pierwszych minut dyżuru na sali reanimacyjnej."
        }
      ]
    },
    {
      title: "Krok 4: Kontrola pobudzenia i drżeń benzodiazepinami (Leczenie I rzutu)",
      desc: "Jaka grupa leków stanowi bezwzględny lek I rzutu w łagodzeniu pobudzenia, drżeń i sztywności mięśniowej w zespole serotoninowym?",
      options: [
        {
          text: "Benzodiazepiny dożylnie (np. diazepam 5–10 mg i.v. lub lorazepam 2–4 mg i.v. powtarzane w miareczkowanych dawkach pod kontrolą saturacji i oddechu).",
          isCorrect: true,
          feedback: "Prawidłowo! Benzodiazepiny to filar leczenia; nasilają hamowanie GABA-ergiczne, znoszą pobudzenie psychoruchowe, drżenia i obniżają produkcję ciepła."
        },
        {
          text: "Podanie haloperydolu w wysokiej dawce 20 mg domięśniowo w celu natychmiastowej pacyfikacji pobudzonej pacjentki.",
          isCorrect: false,
          feedback: "Błąd. Haloperydol i inne neuroleptyki blokują pocenie się, nasilają hipertermię i mogą wywołać nałożenie się NMS; są przeciwwskazane!"
        },
        {
          text: "Podanie dożylnej kofeiny w dawce 1000 mg w celu stymulacji kory mózgowej i przyspieszenia myślenia logicznego.",
          isCorrect: false,
          feedback: "Błąd. Kofeina nasili tachykardię, pobudzenie i hipertermię; pacjentka wymaga leków wyciszających (benzodiazepin)."
        },
        {
          text: "Całkowity zakaz podawania jakichkolwiek leków uspokajających z obawy przed wystąpieniem przejściowej senności.",
          isCorrect: false,
          feedback: "Błąd. Nieleczone pobudzenie i klonusy prowadzą do gwałtownego wzrostu temperatury > 41°C i rabdomiolizy; sedacja benzodiazepinami ratuje życie."
        }
      ]
    },
    {
      title: "Krok 5: Celowane leczenie swoiste – Antagonista receptorów serotoninowych",
      desc: "Jeśli sedacja benzodiazepinami i chłodzenie nie opanowują w pełni objawów, jaka odtrutka (antagonista receptorów 5-HT2A) jest lekiem z wyboru?",
      options: [
        {
          text: "Cyproheptadyna (doustnie lub przez sondę żołądkową w dawce początkowej 12 mg, a następnie 2 mg co 2 godziny do łącznej dawki dobowej 32 mg).",
          isCorrect: true,
          feedback: "Prawidłowo! Cyproheptadyna to nieselektywny antagonista receptorów 5-HT1A i 5-HT2A oraz H1; swoiście blokuje receptory serotoninowe w OUN."
        },
        {
          text: "Tramadol w dawce 200 mg dożylnie w powolnym wlewie w celu kompetycyjnego wyparcia innych substancji z receptorów.",
          isCorrect: false,
          feedback: "Błąd. Tramadol sam jest lekiem uwalniającym serotoninę i inhibitorem wychwytu zwrotnego; jego podanie pogłębiłoby śmiertelne zatrucie!"
        },
        {
          text: "Podanie czystego wyciągu z muchomora sromotnikowego w ramach homeopatycznego odczulania receptorów nerwowych.",
          isCorrect: false,
          feedback: "Błąd. Amanityna z muchomora to śmiertelna toksyna niszcząca wątrobę i nerki; działanie całkowicie zbrodnicze i niedopuszczalne."
        },
        {
          text: "Wstrzyknięcie dożylne 100 mg atropiny w celu trwałego rozszerzenia źrenic i przyspieszenia akcji serca pacjentki.",
          isCorrect: false,
          feedback: "Błąd. Atropina zablokuje wydzielanie potu, uniemożliwiając oddawanie ciepła i doprowadzając do zgonu z powodu przegrzania ustroju."
        }
      ]
    },
    {
      title: "Krok 6: Postępowanie w hipertermii (Fizjologia vs Leki p/gorączkowe)",
      desc: "Temperatura wynosi 39,5°C. Czy należy podać dożylnie paracetamol lub ketoprofen w celu obniżenia temperatury ciała w zespole serotoninowym?",
      options: [
        {
          text: "Nie! Paracetamol i NLPZ są całkowicie nieskuteczne (brak przestawienia termostatu w podwzgórzu); hipertermię leczy się wyłącznie fizykalnie i benzodiazepinami.",
          isCorrect: true,
          feedback: "Prawidłowo! Wzrost temperatury w zespole serotoninowym wynika z nadmiernej pracy mięśni (drżenia, klonusy); leki przeciwgorączkowe nie działają na ten mechanizm."
        },
        {
          text: "Tak, należy podać paracetamol w dawce 10 gramów dożylnie w celu natychmiastowej i całkowitej likwidacji gorączki.",
          isCorrect: false,
          feedback: "Błąd. Taka dawka paracetamolu wywoła piorunującą martwicę wątroby, a nie obniży temperatury wynikającej ze skurczów mięśniowych."
        },
        {
          text: "Należy podać wysokie dawki kwasu acetylosalicylowego w celu wywołania obfitych potów u pacjentki na sali SOR.",
          isCorrect: false,
          feedback: "Błąd. Aspiryna rozprzęga fosforylację oksydacyjną w mitochondriach, co może dodatkowo nasilić produkcję ciepła i kwasicę metaboliczną."
        },
        {
          text: "Hipertermia w zespole serotoninowym jest stanem w 100% bezpiecznym i chroni komórki mózgowe przed działaniem toksyn.",
          isCorrect: false,
          feedback: "Błąd. Temperatura > 40°C powoduje denaturację enzymów, rozpad mięśni, DIC, obrzęk mózgu i zgon pacjenta; wymaga agresywnego chłodzenia."
        }
      ]
    },
    {
      title: "Krok 7: Postępowanie w skrajnej, zagrażającej życiu hipertermii (> 41,1°C)",
      desc: "Jeśli mimo sedacji temperatura przekracza 41,1°C i pojawia się sztywność mięśniowa, jaka procedura ratunkowa jest bezwzględnie wskazana?",
      options: [
        {
          text: "Natychmiastowa intubacja, sedacja i zwiotczenie mięśni lekiem niedepolaryzującym (np. wekuronium/rokuronium) w celu całkowitego zatrzymania produkcji ciepła.",
          isCorrect: true,
          feedback: "Prawidłowo! Całkowite porażenie mięśni niedepolaryzującym środkiem zwiotczającym natychmiast przerywa generowanie ciepła. Suksametonium jest przeciwwskazane (hiperkaliemia)!"
        },
        {
          text: "Podanie dożylne suksametonium (sukcynylocholiny) w powolnym wlewie bez intubacji dróg oddechowych pacjentki.",
          isCorrect: false,
          feedback: "Błąd. Suksametonium w rabdomiolizie grozi zatrzymaniem krążenia w hiperkaliemii, a brak intubacji natychmiast udusi pacjentkę."
        },
        {
          text: "Zalecenie picia zimnej wody mineralnej przez rurkę u pacjentki z temperaturą 41,5°C przebywającej na sali ogólnej oddziału ratunkowego.",
          isCorrect: false,
          feedback: "Błąd. Skrajna hipertermia to stan agonalny wymagający natychmiastowego zwiotczenia, intubacji i aktywnego chłodzenia na sali R."
        },
        {
          text: "Przeniesienie pacjentki do solarium w celu napromieniowania powłok skórnych promieniami podczerwonymi na oddziale szpitalnym.",
          isCorrect: false,
          feedback: "Błąd. Działanie kuriozalne i zabójcze; pacjentka w hipertermii wymaga agresywnego chłodzenia fizykalnego lodem i zimnymi płynami."
        }
      ]
    },
    {
      title: "Krok 8: Dyspozycja końcowa i rokowanie w zespole serotoninowym",
      desc: "Po podaniu diazepamu, cyproheptadyny i chłodzeniu temperatura spadła do 37,2°C, klonusy ustąpiły. Jaka jest dyspozycja i dalszy plan opieki?",
      options: [
        {
          text: "Hospitalizacja na oddziale intensywnej terapii lub sali wzmożonego nadzoru przez min. 24 godziny, monitorowanie EKG, elektrolitów i edukacja lekowa.",
          isCorrect: true,
          feedback: "Prawidłowo! Większość objawów zespołu serotoninowego ustępuje w ciągu 24 h od odstawienia leków. Pacjentka wymaga monitorowania i bezpiecznego planu leczenia."
        },
        {
          text: "Wypisanie pacjentki do domu w 2. godzinie od przyjęcia z zaleceniem ponownego przyjęcia podwójnej dawki tramadolu wieczorem.",
          isCorrect: false,
          feedback: "Błąd. Wypis bez obserwacji i ponowne podanie leku serotoninergicznego doprowadzi do natychmiastowego nawrotu zespołu i zgonu w domu."
        },
        {
          text: "Przekazanie pacjentki do sanatorium uzdrowiskowego na turnus leczenia borowinowego w trybie pilnym.",
          isCorrect: false,
          feedback: "Błąd. Pacjentka po ostrym zatruciu toksycznym wymaga hospitalizacji w szpitalu z dostępem do intensywnej terapii, a nie opieki sanatoryjnej."
        },
        {
          text: "Wdrożenie leczenia elektrowstrząsami bezpośrednio na sali szpitalnego oddziału ratunkowego bez znieczulenia.",
          isCorrect: false,
          feedback: "Błąd. Elektrowstrząsy nie mają zastosowania w leczeniu ostrego zespołu serotoninowego; po ustąpieniu objawów pacjentka powraca do zdrowia."
        }
      ]
    }
  ]
};

async function run() {
  const manifest = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'cases', 'manifest.json'), 'utf8'));
  console.log('Expanding steps to 8 for Cases 171-175...');

  for (let id = 171; id <= 175; id++) {
    const file = manifest[id - 1];
    const fullPath = path.join(__dirname, '..', 'cases', file);
    const raw = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
    const c = await decrypt(raw, MASTER_KEY);

    const newSteps = batch5Steps[id];
    verifyStepBalance(newSteps, id);
    c.steps = newSteps;

    const enc = await encrypt(c, MASTER_KEY);
    fs.writeFileSync(fullPath, JSON.stringify(enc, null, 2), 'utf8');
    console.log(`✓ Case #${id} updated with ${newSteps.length} full steps!`);
  }
}

run();

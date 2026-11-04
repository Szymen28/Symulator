const fs = require('fs');
const path = require('path');
const { encryptStringAes } = require('./encrypt_case.js');

const MASTER_KEY = '@LEKSzymon28111999';
const CASES_DIR = path.join(__dirname, '..', 'cases');

console.log("Saving Case 114: Krztusiec / Koklusz (Bordetella pertussis)...");

async function saveCase(caseData) {
  const filePath = path.join(CASES_DIR, caseData.filename);
  const jsonStr = JSON.stringify(caseData, null, 2);
  const encrypted = await encryptStringAes(jsonStr, MASTER_KEY);
  fs.writeFileSync(filePath, JSON.stringify(encrypted, null, 2), 'utf8');
  console.log(`[SAVED] Case #${caseData.id}: ${caseData.filename} (LEK Qs: ${caseData.lekQuestions.length}, Steps: ${caseData.steps.length}, Flashcards: ${caseData.flashcards.length})`);
}

const case114 = {
  id: 114,
  filename: "114_krztusiec_pertussis.json",
  dept: "Pediatria",
  shortTitle: "3-miesięczny Franek – Napadowy kaszel z pianiem, bezdechy i hiperleukocytoza (Krztusiec)",
  diagnosisTitle: "Krztusiec (Pertussis / Koklusz) o ciężkim przebiegu u nieszczepionego niemowlęcia, wywołany przez Bordetella pertussis, powikłany epizodami bezdechów (apnea)",
  vitals: [
    { label: "Saturacja SpO2", val: "88% w napadzie", sub: "Spadek saturacji z sinicą, 97% w spoczynku", status: "vital-crit" },
    { label: "Akcja serca (HR)", val: "168/min", sub: "Tachykardia, w bezdechu bradykardia 80/min", status: "vital-warn" },
    { label: "Częstość oddechów (RR)", val: "52/min", sub: "Tachypnoe między napadami kaszlu", status: "vital-warn" },
    { label: "Temperatura ciała / BP", val: "37,2°C | 82/50 mmHg", sub: "Stan podgorączkowy, bez wysokiej gorączki", status: "vital-ok" }
  ],
  vitalsObj: { hr: 168, bp: "82/50", spo2: 88, rr: 52, temp: 37.2, gcs: 15 },
  story: `<p><strong>Pacjent:</strong> 3-miesięczny Franek (masa ciała 5,7 kg) został przywieziony przez zespół ratownictwa medycznego na szpitalny oddział ratunkowy z powodu ciężkich, dławiących napadów kaszlu, w trakcie których dochodzi do sinienia powłok skórnych, wysuwania języka, bezdechów trwających kilkanaście sekund oraz wymiotów gęstym, lepkim śluzem.</p><p><strong>Wywiad chorobowy:</strong> Dziecko choruje od około 2 tygodni. Początkowo choroba objawiała się łagodnym katarem, kichaniem i suchym, pojedynczym kaszlem bez gorączki (faza nieżytowa). Rodzice i lekarz POZ podejrzewali zwykłą infekcję wirusową. Jednak od 4 dni kaszel przybrał charakter męczących, paroksyzmalnych salw: dziecko kaszle seriami po 15-20 wydechów z rzędu bez możliwości nabrania powietrza, z zaczerwienieniem twarzy, łzawieniem oczu i wysuwaniem języka, po czym następuje gwałtowny, świszczący, głośny wdech przypominający 'pianie koguta' (whoop). W nocy wystąpiły dwa epizody bezdechu z wiotkością i sinicą ust. Starsza 15-letnia siostra chłopca od miesiąca ma przewlekły, napadowy kaszel ('kaszel 100 dni'). Franek nie otrzymał jeszcze pierwszej dawki szczepienia DTP (odroczenie z powodu kataru).</p><p><strong>Badanie przedmiotowe na SOR:</strong> Niemowlę w stanie ogólnym średnio-ciężkim, zmęczone po kolejnym napadzie kaszlu. Na powiekach i spojówkach widoczne drobne wybroczyny krwawe (petechie) powstałe wskutek gwałtownego wzrostu ciśnienia żylnego w trakcie paroksyzmów kaszlu. W jamie ustnej widoczne drobne owrzodzenie wędzidełka języka (od ocierania o dolne dziąsła/siekacze w czasie kaszlu). Podczas badania dochodzi do napadu: seria krótkich kaszlnięć, zasinienie wokół ust, saturacja SpO2 spada do 88%, po czym po głośnym świszczącym wdechu dziecko odkrztusza porcję gęstego, szklistego śluzu i wymiotuje treścią mleczną. Osłuchowo nad płucami poza napadem szmer pęcherzykowy prawidłowy, bez rzężeń i świstów. Brzuch miękki, wątroba i śledziona niepowiększone. Tętno na tętnicach obwodowych dobrze wyczuwalne.</p>`,
  labs: {
    "Morfologia krwi obwodowej (obraz patognomoniczny)": [
      { name: "Leukocyty (WBC)", val: "38,4 G/L", norm: "6,0 - 16,0 G/L", flag: "CRIT_HIGH" },
      { name: "Limfocyty ogółem", val: "76%", norm: "45 - 65%", flag: "CRIT_HIGH" },
      { name: "Liczba bezwzględna limfocytów", val: "29,2 G/L", norm: "3,0 - 9,5 G/L", flag: "CRIT_HIGH" },
      { name: "Neutrofile", val: "18%", norm: "25 - 45%", flag: "LOW" },
      { name: "Hemoglobina (Hb)", val: "11,8 g/dl", norm: "10,5 - 13,5 g/dl", flag: "NORMAL" },
      { name: "Płytki krwi (PLT)", val: "480 G/L", norm: "150 - 450 G/L", flag: "HIGH" },
      { name: "CRP", val: "3,1 mg/l", norm: "< 5,0 mg/l", flag: "NORMAL" }
    ],
    "Diagnostyka mikrobiologiczna i genetyczna": [
      { name: "PCR w kierunku Bordetella pertussis (wymaz z nosogardła)", val: "DODATNI (+) [Wykryto DNA B. pertussis]", norm: "Ujemny", flag: "CRIT_HIGH" },
      { name: "Posiew na podłożu Bordet-Gengou / Regan-Lowe", val: "W toku (hodowla trudna, wzrost kolonii w kształcie 'kropli rtęci')", norm: "Jałowy", flag: "HIGH" },
      { name: "RTG klatki piersiowej", val: "Zagęszczenia okołownękowe, cechy rozdęcia płuc, cień serca zatarty ('serce kosmate' / shaggy heart)", norm: "Prawidłowy", flag: "HIGH" }
    ]
  },
  steps: [
    {
      stepNum: 1,
      title: "Krok 1: Rozpoznanie faz klinicznych i specyfiki krztuśca u niemowląt",
      desc: "3-miesięczny nieszczepiony Franek zgłasza się z napadowym kaszlem, pianiem, wymiotami i bezdechami poprzedzonymi 2-tygodniowym okresem nieżytowym. Jakie są trzy klasyczne fazy krztuśca i dlaczego choroba u niemowląt <6. miesiąca życia jest szczególnie niebezpieczna?",
      scenario: "3-miesięczny Franek zgłasza się z napadowym kaszlem, pianiem, wymiotami i bezdechami poprzedzonymi 2-tygodniowym okresem nieżytowym. Jakie są trzy klasyczne fazy krztuśca i dlaczego choroba u niemowląt <6. miesiąca życia jest szczególnie niebezpieczna?",
      options: [
        {
          text: "1. Faza nieżytowa (najwyższa zakaźność), 2. Faza napadowego kaszlu (paroksyzmy, pianie, wymioty), 3. Faza rekonwalescencji ('kaszel 100 dni'). U niemowląt <6 m.ż. może brakować typowego piania, a dominują zagrażające życiu bezdechy (apnoe), sinica, bradykardia i drgawki",
          correct: true,
          isCorrect: true,
          feedback: "✅ PRAWIDŁOWO! <strong>Kluczowy obraz kliniczny krztuśca i stałe pytanie LEK!</strong> Krztusiec przebiega w 3 stadiach: 1. Faza nieżytowa (1-2 tyg., objawy przeziębienia, pacjent najbardziej zakaża), 2. Faza napadowa (2-6 tyg., serie wykrztuśne, pianie / whoop, wymioty po kaszlu, petechie na twarzy), 3. Faza rekonwalescencji (trwająca tygodnie/miesiące). U małych niemowląt z powodu niedojrzałości układu oddechowego i wiotkości krtani pianie często NIE występuje – zamiast tego pojawiają się nagłe epizody bezdechu, sinicy, bradykardii i niedotlenienia mózgu (encefalopatia krztuścowa)."
        },
        {
          text: "Choroba przebiega zawsze w jednej fazie trwającej 24 godziny i kończy się trwałym wyłysieniem",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Krztusiec to przewlekła choroba zakaźna</strong> trwająca nawet 2-3 miesiące ('kaszel 100 dni')."
        },
        {
          text: "Niemowlęta do 6. miesiąca życia wykazują całkowitą wrodzoną oporność na pałeczkę krztuśca",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD KRYTYCZNY! <strong>Niemowlęta są grupą najwyższego ryzyka zgonu w przebiegu krztuśca!</strong> Przeciwciała matczyne IgG przeciw krztuścowi nie chronią skutecznie noworodka."
        },
        {
          text: "Jedynym objawem krztuśca u dzieci jest biegunka z krwią bez jakichkolwiek objawów oddechowych",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Bordetella pertussis kolonizuje urzęsiony nabłonek dróg oddechowych</strong>, a nie przewód pokarmowy."
        }
      ]
    },
    {
      stepNum: 2,
      title: "Krok 2: Interpretacja wyniku morfologii krwi – efekt toksyny krztuścowej",
      desc: "W morfologii krwi Franka stwierdzono leukocytozę 38,4 G/L z bezwzględną limfocytozą 76% (29,2 G/L) przy prawidłowym stężeniu CRP (3,1 mg/l). Jaki jest patomechanizm tej spektakularnej limfocytozy?",
      scenario: "W morfologii krwi Franka stwierdzono leukocytozę 38,4 G/L z bezwzględną limfocytozą 76% (29,2 G/L) przy prawidłowym stężeniu CRP (3,1 mg/l). Jaki jest patomechanizm tej spektakularnej limfocytozy?",
      options: [
        {
          text: "Działanie toksyny krztuścowej (PT), która jako czynnik indukujący limfocytozę (LPF) blokuje receptory chemokinek i hamuje wynaczynianie (ekstrawazację) dojrzałych limfocytów z krwi do węzłów chłonnych, powodując ich uwięzienie i kumulację w krążeniu obwodowym",
          correct: true,
          isCorrect: true,
          feedback: "✅ PRAWIDŁOWO! <strong>Genialne pytanie fizjologiczne i patognomoniczny objaw laboratoryjny!</strong> W większości zakażeń bakteryjnych występuje leukocytoza z neutrofilią. Krztusiec jest unikalnym wyjątkiem: wywołuje potężną leukocytozę z dojrzałą limfocytozą (nierzadko >30-50 G/L). Odpowiada za to toksyna krztuścowa (PT – pertussis toxin / dawniej LPF – lymphocytosis-promoting factor), która poprzez ADP-rybozylację białka Gi blokuje recyrkulację limfocytów do narządów limfatycznych. Hiperleukocytoza >30-50 G/L jest niekorzystnym czynnikiem rokowniczym u niemowląt (powoduje leukostazę i nadciśnienie płucne)."
        },
        {
          text: "Transformacja białaczkowa w ostrej białaczce limfoblastycznej indukowana przez wirusa",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>W rozmazie krwi w krztuścu widoczne są dojrzałe, małe limfocyty, a nie limfoblasty nowotworowe!</strong>"
        },
        {
          text: "Odwodnienie z zagęszczeniem krwi bez rzeczywistego wzrostu liczby komórek",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Wzrost liczby limfocytów do 29 G/L jest bezwzględny i masywny</strong>, a hemoglobina jest w normie."
        },
        {
          text: "Błąd laboratoryjny – w zakażeniach bakteryjnych zawsze musi występować neutrofilia >90%",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Krztusiec jest klasycznym wyjątkiem od tej reguły!</strong>"
        }
      ]
    },
    {
      stepNum: 3,
      title: "Krok 3: Wybór metody diagnostycznej potwierdzającej zakażenie",
      desc: "Chcesz natychmiast potwierdzić zakażenie Bordetella pertussis u Franka. Jaka metoda mikrobiologiczna jest obecnie złotym standardem diagnostycznym z wyboru w pierwszych 3-4 tygodniach choroby?",
      scenario: "Chcesz natychmiast potwierdzić zakażenie Bordetella pertussis u Franka. Jaka metoda mikrobiologiczna jest obecnie złotym standardem diagnostycznym z wyboru w pierwszych 3-4 tygodniach choroby?",
      options: [
        {
          text: "Badanie molekularne PCR w kierunku DNA Bordetella pertussis z wymazu z tylnej ściany nosogardła (pobranego giętką wymazówką z dacronu lub nylonu przez nozdrze przednie)",
          correct: true,
          isCorrect: true,
          feedback: "✅ PRAWIDŁOWO! <strong>Złoty standard współczesnej diagnostyki krztuśca!</strong> Metoda Real-Time PCR z wymazu z nosogardła cechuje się najwyższą czułością (>90-95%) i swoistością w pierwszych 3-4 tygodniach choroby. Ważne: wymaz musi być pobrany z nosogardła (nie ze zwykłego gardła!) specjalną wymazówką z tworzywa sztucznego (waciki bawełniane z alginianem wapnia hamują reakcję PCR i są toksyczne dla bakterii). Posiew ma 100% swoistość, ale jest trudny i czasochłonny (3-7 dni)."
        },
        {
          text: "Oznaczenie przeciwciał IgG przeciwko toksynie krztuścowej (anty-PT) u 3-miesięcznego niemowlęcia",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Serologia jest nieprzydatna u niemowląt <6 m.ż.!</strong> Wykrywa matczyne IgG przenikające przez łożysko lub jest fałszywie ujemna z powodu niedojrzałości układu immunologicznego dziecka."
        },
        {
          text: "Pobranie wymazu z języka i posiew na zwykłym agarze z krwią",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Bordetella pertussis nie rośnie na standardowych podłożach!</strong> Wymaga podłoży wzbogaconych krwią, węglem i skrobią (Bordet-Gengou lub Regan-Lowe)."
        },
        {
          text: "Bronchoskopia sztywna z biopsją ściany tchawicy",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD KRYTYCZNY! <strong>Inwazyjne i skrajnie niebezpieczne badanie</strong> całkowicie nieuzasadnione w niepowikłanym krztuścu."
        }
      ]
    },
    {
      stepNum: 4,
      title: "Krok 4: Wybór antybiotykoterapii I rzutu u niemowlęcia",
      desc: "Rozpoznajesz krztusiec u 3-miesięcznego Franka. Jaki antybiotyk, w jakiej dawce i przez ile dni stanowi leczenie pierwszego wyboru u niemowląt wg zaleceń CDC i AAP?",
      scenario: "Rozpoznajesz krztusiec u 3-miesięcznego Franka. Jaki antybiotyk, w jakiej dawce i przez ile dni stanowi leczenie pierwszego wyboru u niemowląt wg zaleceń CDC i AAP?",
      options: [
        {
          text: "Azytromycyna doustnie w dawce 10 mg/kg m.c./dobę raz dziennie przez 5 dni",
          correct: true,
          isCorrect: true,
          feedback: "✅ PRAWIDŁOWO! <strong>Złoty standard terapii krztuśca u dzieci i niemowląt!</strong> Lekami z wyboru w eradykacji B. pertussis są makrolidy nowej generacji. U niemowląt w wieku <1-6 miesięcy lekiem I rzutu jest azytromycyna (10 mg/kg raz na dobę przez 5 dni). U dzieci starszych alternatywą jest klarytromycyna (15 mg/kg/d w 2 dawkach przez 7 dni). Erytromycyna nie jest obecnie zalecana u noworodków i młodych niemowląt ze względu na ryzyko przerostowego zwężenia odźwiernika (IHPS)."
        },
        {
          text: "Amoksycylina z kwasem klawulanowym doustnie przez 14 dni",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Beta-laktamy są całkowicie NIESKUTECZNE w krztuścu in vivo!</strong> Mimo wrażliwości in vitro penicyliny nie penetrują do urzęsionego nabłonka dróg oddechowych i nie eradykują B. pertussis."
        },
        {
          text: "Ciprofloksacyna dożylnie przez 21 dni",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Chinolony nie są lekami z wyboru w krztuścu i są przeciwwskazane u niemowląt.</strong>"
        },
        {
          text: "Doksycyklina w syropie przez 10 dni",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Tetracykliny są przeciwwskazane u dzieci poniżej 8. roku życia</strong> (uszkodzenie szkliwa zębów i kości)."
        }
      ]
    },
    {
      stepNum: 5,
      title: "Krok 5: Wyjaśnienie rodzicom efektu antybiotyku na napady kaszlu",
      desc: "Mama pyta ze łzami w oczach: 'Panie doktorze, czy po podaniu tego antybiotyku Franek od razu przestanie kaszleć i się dusić?'. Jak brzmi rzetelna odpowiedź kliniczna oparta na patofizjologii?",
      scenario: "Mama pyta ze łzami w oczach: 'Panie doktorze, czy po podaniu tego antybiotyku Franek od razu przestanie kaszleć i się dusić?'. Jak brzmi rzetelna odpowiedź kliniczna oparta na patofizjologii?",
      options: [
        {
          text: "Antybiotyk podany w fazie napadowej NIE powstrzyma natychmiast kaszlu, ponieważ urzęsiony nabłonek dróg oddechowych został już uszkodzony przez toksynę tchawiczą (TCT); antybiotyk jest jednak konieczny, bo eliminuje bakterie z dróg oddechowych po 5 dniach, chroniąc przed rozsiewem na otoczenie i nadkażeniami bakteryjnymi. Kaszel ustąpi powoli w miarę regeneracji nabłonka (w ciągu kilku tygodni)",
          correct: true,
          isCorrect: true,
          feedback: "✅ PRAWIDŁOWO! <strong>Fundamentalna prawda kliniczna krztuśca!</strong> Antybiotykoterapia łagodzi przebieg choroby tylko pod warunkiem wdrożenia jej w bardzo wczesnej fazie nieżytowej (zwykle nierozpoznawanej). W fazie napadowej toksyny bakteryjne (zwłaszcza cytotoksyna tchawicza – TCT) dokonały już martwicy rzęsek i obnażenia nagich receptorów kaszlowych. Antybiotyk zabija bakterie, czyniąc pacjenta niezakaźnym po 5 dniach azytromycyny, ale kaszel paroksyzmalny ustąpi dopiero wtedy, gdy odrośnie nowy nabłonek migawkowy (trwa to od 4 do 12 tygodni)."
        },
        {
          text: "Tak, po 1 dawce antybiotyku kaszel zniknie całkowicie w ciągu 30 minut",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Nierealna obietnica!</strong> Działa to tak w anginie paciorkowcowej, ale nigdy w krztuścu."
        },
        {
          text: "Antybiotyk nasili kaszel i doprowadzi do trwałego pęknięcia obu płuc",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Antybiotyk jest bezpieczny i niezbędny epidemiologicznie.</strong>"
        },
        {
          text: "W krztuścu w ogóle nie wolno podawać antybiotyku, bo sprzyja to zawałowi serca",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Brak antybiotykoterapii utrzymuje zakaźność przez ponad miesiąc.</strong>"
        }
      ]
    },
    {
      stepNum: 6,
      title: "Krok 6: Chemioprofilaktyka poekspozycyjna dla domowników i osób z kontaktu",
      desc: "W domu z Frankiem mieszka 15-letnia siostra (kaszel od miesiąca), rodzice oraz 75-letnia babcia. Kto z osób z bliskiego kontaktu z niemowlęciem powinien otrzymać chemioprofilaktykę poekspozycyjną i jaki lek należy zastosować?",
      scenario: "W domu z Frankiem mieszka 15-letnia siostra (kaszel od miesiąca), rodzice oraz 75-letnia babcia. Kto z osób z bliskiego kontaktu z niemowlęciem powinien otrzymać chemioprofilaktykę poekspozycyjną i jaki lek należy zastosować?",
      options: [
        {
          text: "Chemioprofilaktykę (Azytromycynę w pełnej dawce terapeutycznej przez 5 dni) powinni otrzymać WSZYSCY domownicy i osoby z bliskiego kontaktu, NIEZALEŻNIE od ich wcześniejszego statusu szczepień czy obecności objawów klinicznych",
          correct: true,
          isCorrect: true,
          feedback: "✅ PRAWIDŁOWO! <strong>Rygorystyczna zasada epidemiologiczna krztuśca!</strong> Odporność poszczepienna i pochorobowa w krztuścu wygasa po 5-10 latach. Osoby zaszczepione lub bezobjawowe mogą być kolonizowane i transmitować B. pertussis na wrażliwe niemowlęta. Dlatego wytyczne nakazują wdrożenie chemioprofilaktyki makrolidowej (Azytromycyna przez 5 dni) u wszystkich domowników chorego na krztusiec bez względu na wiek i przebyte szczepienia."
        },
        {
          text: "Chemioprofilaktykę podaje się wyłącznie osobom, które mają gorączkę powyżej 40°C",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>W krztuścu gorączka rzadko przekracza 38°C!</strong> Chemioprofilaktykę podaje się bez względu na objawy."
        },
        {
          text: "Wystarczy nakazać domownikom noszenie czapek wełnianych i picie gorącego mleka",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>To metody niefarmakologiczne bez wartości eradykacyjnej.</strong>"
        },
        {
          text: "Domownicy nie wymagają żadnego postępowania, bo krztusiec nie przenosi się między ludźmi",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD KRYTYCZNY! <strong>Krztusiec jest chorobą wybitnie zakaźną</strong> (wskaźnik R0 = 12-17, zakaźność u domowników sięga 80-90%)."
        }
      ]
    },
    {
      stepNum: 7,
      title: "Krok 7: Monitorowanie i postępowanie w powikłaniach u niemowlęcia",
      desc: "Z powodu wieku (<3 miesięcy) i epizodów bezdechu Franek zostaje przyjęty na Oddział Niemowlęcy. Jakie zasady monitorowania i postępowania podtrzymującego są kluczowe w opiece nad małym dzieckiem z krztuścem?",
      scenario: "Z powodu wieku (<3 miesięcy) i epizodów bezdechu Franek zostaje przyjęty na Oddział Niemowlęcy. Jakie zasady monitorowania i postępowania podtrzymującego są kluczowe w opiece nad małym dzieckiem z krztuścem?",
      options: [
        {
          text: "Ciągłe monitorowanie kardiorespiratoryjne (pulsoksymetria SpO2, EKG/HR, częstość oddechów), minimalizacja bodźców drażniących (hałas, niepotrzebne badanie wyzwalające napad), odsysanie lepkiego śluzu z dróg oddechowych, tlenoterapia bierna w napadach oraz karmienie małymi porcjami sondą lub dożylnie w celu ochrony przed aspiracją",
          correct: true,
          isCorrect: true,
          feedback: "✅ PRAWIDŁOWO! <strong>Standard intensywnego nadzoru pediatrycznego!</strong> Każde niemowlę z krztuścem w wieku <6 m.ż. wymaga hospitalizacji z ciągłym kardiomonitorowaniem z powodu ryzyka nagłego zgonu w mechanizmie bezdechu. Bodźce zewnętrzne (światło, płacz, dotyk, karmienie) łatwo wyzwalają salwy kaszlu. Należy unikać leków przeciwkaszlowych (kodeina, dekstrometorfan są nieskuteczne i niebezpieczne) oraz leków mukolitycznych, które mogą zalać oskrzela niemowlęcia wydzieliną."
        },
        {
          text: "Podawanie dużych dawek morfiny i leków uspokajających w celu uśpienia dziecka na 2 tygodnie",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD KRYTYCZNY! <strong>Opioidy tłumią ośrodek oddechowy i spowodują śmiertelny bezdech u niemowlęcia!</strong>"
        },
        {
          text: "Wykonywanie intensywnego oklepywania klatki piersiowej w trakcie napadu bezdechu",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Oklepywanie w napadzie może wywołać skurcz krtani i aspirację wydzieliny!</strong> W napadzie należy udrożnić drogi oddechowe i podać tlen."
        },
        {
          text: "Zakaz podawania jakichkolwiek płynów przez 7 dni w celu wysuszenia śluzówki",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD KRYTYCZNY! <strong>Doprowadziłoby do śmiertelnego odwodnienia hiperosmolalnego!</strong>"
        }
      ]
    },
    {
      stepNum: 8,
      title: "Krok 8: Profilaktyka pierwotna – strategia kokonowa i szczepienia ciężarnych",
      desc: "Mama pyta, jak rodzina mogła uchronić Franka przed zakażeniem, zanim ukończył on wiek umożliwiający podanie szczepionki DTP. Czym jest tzw. strategia kokonowa (cocoon strategy) i dlaczego zaleca się szczepienie przeciw krztuścowi kobiet w III trymestrze każdej ciąży?",
      scenario: "Mama pyta, jak rodzina mogła uchronić Franka przed zakażeniem, zanim ukończył on wiek umożliwiający podanie szczepionki DTP. Czym jest tzw. strategia kokonowa (cocoon strategy) i dlaczego zaleca się szczepienie przeciw krztuścowi kobiet w III trymestrze każdej ciąży?",
      options: [
        {
          text: "Szczepienie przeciw krztuścowi (szczepionką dTpa) kobiety w ciąży między 27. a 36. tygodniem umożliwia przezłożyskowy transfer wysokiego miana matczynych przeciwciał IgG, chroniących noworodka w pierwszych 2-3 miesiącach życia; strategia kokonowa polega dodatkowo na zaszczepieniu wszystkich osób z najbliższego otoczenia niemowlęcia (ojciec, rodzeństwo, dziadkowie)",
          correct: true,
          isCorrect: true,
          feedback: "✅ PRAWIDŁOWO! <strong>Najważniejszy współczesny paradygmat profilaktyki krztuśca!</strong> Niemowlę przed 2. miesiącem życia nie może otrzymać szczepionki DTP, a to właśnie w tej grupie wiekowej krztusiec zbiera najkrwawsze żniwo. Zaszczepienie ciężarnej między 27. a 36. tc. (zalecane w każdej kolejnej ciąży!) indukuje syntezę swoistych IgG, które przechodzą przez łożysko i dają dziecku bierną odporność do czasu własnych szczepień. Strategia kokonu polega na zaszczepieniu pozostałych domowników, tworząc barierę ('kokon') uniemożliwiającą wnikanie wirulentnych szczepów do domu noworodka."
        },
        {
          text: "Strategia kokonowa polega na owijaniu dziecka w kokon z wełny owczej przez pierwsze 6 miesięcy",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>To metafora epidemiologiczna dotycząca szczepień otoczenia, a nie owijania w wełnę!</strong>"
        },
        {
          text: "Szczepienie w ciąży jest zabronione, ponieważ krztusiec nie zagraża kobietom",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>dTpa jest bezwzględnie zalecana w każdej ciąży wg zaleceń PTGiP, CDC i WHO!</strong>"
        },
        {
          text: "Niemowlęta powinny być szczepione bezpośrednio po urodzeniu dawką dla dorosłych",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Szczepienie DTP rozpoczyna się od 2. miesiąca życia (po ukończeniu 6.-8. tygodnia).</strong>"
        }
      ]
    }
  ],
  pathoNodes: [
    {
      badge: "OGNIWO 1 • Adhezja do urzęsionego nabłonka dróg oddechowych",
      title: "Wirowanie z aerozolem, przyleganie przez FHA i pertaktynę do rzęsek",
      short: "Bordetella pertussis kolonizuje nabłonek migawkowy oskrzeli, nie wnikając do głębszych tkanek.",
      detail: "Bordetella pertussis jest drobną, tlenową pałeczką Gram-ujemną przenoszoną drogą kropelkową. Posiada wysoki i wybiórczy tropizm do rzęsek komórek nabłonka dróg oddechowych (od nosogardła po oskrzeliki). Adhezja jest procesem wieloetapowym, w którym kluczową rolę odgrywają: hemaglutynina włókienkowa (FHA – filamentous hemagglutinin), pertaktyna (Prn), fimbrie (Fim2, Fim3) oraz podjednostki B toksyny krztuścowej (PT). Bakteria nie wnika do komórek nabłonka ani do krwioobiegu (nie wywołuje bakteriemii), lecz namnaża się na powierzchni błony śluzowej, tworząc zwartą warstwę blokującą ruch aparatu rzęskowego.",
      target: "Leczenie eradykacyjne I rzutu: <span class='dose-pill'>Azytromycyna 10 mg/kg m.c./dobę p.o.</span> raz dziennie przez <span class='dose-pill'>5 dni</span> (u noworodków i niemowląt <6 m.ż.).",
      desc: "Wirowanie z aerozolem, przyleganie przez FHA i pertaktynę do rzęsek.",
      drugTarget: "Leczenie eradykacyjne I rzutu: <span class='dose-pill'>Azytromycyna 10 mg/kg m.c./dobę p.o.</span> raz dziennie przez <span class='dose-pill'>5 dni</span> (u noworodków i niemowląt <6 m.ż.)."
    },
    {
      badge: "OGNIWO 2 • Martwica rzęsek i cytotoksyna tchawicza (TCT)",
      title: "Zniszczenie aparatu śluzowo-rzęskowego, zastój śluzu i odsłonięcie receptorów",
      short: "Cytotoksyna tchawicza niszczy rzęski, prowadząc do obnażenia receptorów kaszlu.",
      detail: "Bakteria wydziela cytotoksynę tchawiczą (TCT – tracheal cytotoxin, fragment disacharydu peptydoglikanu). TCT indukuje w komórkach nabłonkowych produkcję tlenku azotu (NO) oraz interleukiny-1, co wywołuje porażenie rzęsek (ciliostazę), a następnie apoptozę i złuszczanie urzęsionych komórek nabłonka. Dochodzi do całkowitego załamania oczyszczania śluzowo-rzęskowego. W drogach oddechowych zalega gęsty, lepki śluz. Odsłonięte, nagie zakończenia nerwu błędnego (receptory kaszlowe RARs i C-fibers) są stale drażnione, wyzwalając niekontrolowane salwy paroksyzmalnego kaszlu.",
      target: "Terapia wspomagająca odkrztuszanie: nawilżanie powietrza, toaleta drzewa oskrzelowego, <span class='dose-pill'>odsysanie wydzieliny</span>; zakaz leków przeciwkaszlowych i wykrztuśnych.",
      desc: "Zniszczenie aparatu śluzowo-rzęskowego, zastój śluzu i odsłonięcie receptorów.",
      drugTarget: "Terapia wspomagająca odkrztuszanie: nawilżanie powietrza, toaleta drzewa oskrzelowego, <span class='dose-pill'>odsysanie wydzieliny</span>; zakaz leków przeciwkaszlowych i wykrztuśnych."
    },
    {
      badge: "OGNIWO 3 • Toksyna krztuścowa (PT) i hiperleukocytoza",
      title: "ADP-rybozylacja białka Gi, aktywacja cyklazy adenylowej i uwięzienie limfocytów",
      short: "Toksyna krztuścowa blokuje receptory chemokinek, uniemożliwiając limfocytom opuszczenie krążenia.",
      detail: "Toksyna krztuścowa (PT – pertussis toxin, egzotoksyna typu A-B) wnika do komórek docelowych, gdzie jej podjednostka enzymatyczna S1 katalizuje ADP-rybozylację podjednostki alfa białka G typu hamującego (Gi). Prowadzi to do trwałego zablokowania białka Gi i niekontrolowanego wzrostu stężenia wewnątrzkomórkowego cAMP. W układzie immunologicznym PT blokuje receptory dla chemokinek na powierzchni limfocytów, uniemożliwiając ich wynaczynianie (ekstrawazację) i recyrkulację do węzłów chłonnych. Efektem jest masywna leukocytoza z limfocytozą w krwi obwodowej (>30-50 G/L). U niemowląt agregaty limfocytów tworzą mikrozatory w łożysku naczyniowym płuc, wywołując ciężkie nadciśnienie płucne i niewydolność prawokomorową.",
      target: "Leczenie ciężkiej leukostazy u niemowląt: <span class='dose-pill'>transfuzja wymienna (erytrocytoafereza)</span> przy WBC >50 G/L w połączeniu z niewydolnością krążeniowo-oddechową.",
      desc: "ADP-rybozylacja białka Gi, aktywacja cyklazy adenylowej i uwięzienie limfocytów.",
      drugTarget: "Leczenie ciężkiej leukostazy u niemowląt: <span class='dose-pill'>transfuzja wymienna (erytrocytoafereza)</span> przy WBC >50 G/L w połączeniu z niewydolnością krążeniowo-oddechową."
    },
    {
      badge: "OGNIWO 4 • Encefalopatia i powikłania mechaniczne paroksyzmów",
      title: "Hipoksja mózgowa w bezdechach, wzrost ciśnienia żylnego i pęknięcia naczyń",
      short: "Przedłużający się skurcz krtani i bezdech prowadzą do hipoksji OUN i uszkodzeń naczyniowych.",
      detail: "W trakcie salwy kaszlu dochodzi do nagłego wzrostu ciśnienia śródpiersiowego i żylnego w dorzeczu żyły głównej górnej, co skutkuje pękaniem drobnych naczyń krwionośnych (wylewy podspojówkowe, petechie na twarzy, krwawienia z nosa, przepukliny, wypadanie odbytnicy). U niemowląt dochodzi do nagłego skurczu krtani i całkowitego bezdechu (apnoea). Spadek saturacji do wartości krytycznych (<60-70%) w połączeniu z bradykardią wywołuje ostre niedotlenienie mózgowia, prowadząc do drgawek hipoksycznych i encefalopatii krztuścowej z trwałym uszkodzeniem neurologicznym.",
      target: "Intensywny nadzór i natlenianie: <span class='dose-pill'>tlenoterapia bierna wąsami tlenowymi (przepływ 1-2 l/min)</span>; w przedłużającym się bezdechu wentylacja workiem samorozprężnym Ambu i przygotowanie do intubacji.",
      desc: "Hipoksja mózgowa w bezdechach, wzrost ciśnienia żylnego i pęknięcia naczyń.",
      drugTarget: "Intensywny nadzór i natlenianie: <span class='dose-pill'>tlenoterapia bierna wąsami tlenowymi (przepływ 1-2 l/min)</span>; w przedłużającym się bezdechu wentylacja workiem samorozprężnym Ambu i przygotowanie do intubacji."
    }
  ],
  diffTable: {
    title: "⚔️ Tabela Różnicowa: Krztusiec vs Podgłośniowe zapalenie krtani (Krup) vs Ostre zapalenie nagłośni vs Ciało obce w drogach oddechowych",
    headers: ["Cecha kliniczna", "Krztusiec (Bordetella pertussis)", "Podgłośniowe zap. krtani (Krup)", "Ostre zapalenie nagłośni (Epiglottitis)", "Zaaspirowane ciało obce"],
    rows: [
      ["Etiologia", "Bordetella pertussis (bakteria)", "Wirusy paragrypy (Parainfluenza 1-3)", "Haemophilus influenzae typ b (Hib)", "Mechaniczna aspiracja (orzeszek, zabawka)"],
      ["Charakter kaszlu", "Paroksyzmy wykrztuśne z pianiem (whoop) i wymiotami", "Szczekający kaszel ('foka'), chrypka", "Brak kaszlu; cichy oddech, 'barani' głos", "Nagły, gwałtowny napad krztuszenia i dławienia"],
      ["Stridor / Dźwięk wdechowy", "Pianie na szczycie napadu (głęboki świst wdechowy)", "Stridor krtaniowy wdechowy w spoczynku/płaczu", "Stridor wdechowo-wydechowy, 'pianie' ciche", "Miejscowy świst, asymetria szmeru oddechowego"],
      ["Gorączka", "Brak lub stan podgorączkowy (<38°C)", "Stan podgorączkowy lub niska gorączka", "Wysoka gorączka (>39-40°C), ciężka toksemia", "Całkowity brak gorączki w chwili urazu"],
      ["Pozycja pacjenta / Objawy", "Wysuwanie języka, wybałuszenie oczu, sinica", "Dziecko woli pozycję siedzącą, duszność w nocy", "Pozycja 'wąchająca' (pochylenie do przodu, ślinotok)", "Zależna od wielkości i lokalizacji ciała obcego"],
      ["Rozmaz krwi", "Ekstremalna leukocytoza z limfocytozą (LPF!)", "Prawidłowa lub leukopenia z limfocytozą", "Masywna leukocytoza z neutrofilią (zakażenie ropne)", "Prawidłowy rozmaz krwi"],
      ["Badanie rozstrzygające", "PCR wymazu z nosogardła na B. pertussis", "Ocena kliniczna (skala Westleya)", "Laryngoskopia (obrzęknięta, wiśniowa nagłośnia)", "RTG klatki piersiowej na wydechu, bronchoskopia"],
      ["Leczenie I rzutu", "Azytromycyna doustnie (5 dni) + tlen", "Deksametazon p.o./i.m. + Nebulizacja z adrenaliny", "Zabezpieczenie dróg oddechowych + Cefotaksym i.v.", "Pilna bronchoskopia sztywna w znieczuleniu"]
    ]
  },
  dutySummary: {
    overview: "Krztusiec (koklusz) jest ostrą, wysoce zakaźną bakteryjną chorobą układu oddechowego wywołaną przez Bordetella pertussis. U nieszczepionych niemowląt <6. miesiąca życia przebiega w sposób zagrażający życiu z napadami dławiącego kaszlu, bezdechami (apnoea), sinicą, bradykardią i patognomoniczną hiperleukocytozą z dojrzałą limfocytozą (wywołaną toksyną krztuścową). Wymaga pilnej hospitalizacji z ciągłym monitorowaniem kardiorespiracyjnym oraz natychmiastowej antybiotykoterapii makrolidowej pacjenta i wszystkich domowników.",
    diagnostics: "1. Badanie molekularne Real-Time PCR w kierunku DNA Bordetella pertussis z głębokiego wymazu z nosogardła (złoty standard w fazie ostrej).<br>2. Morfologia krwi obwodowej z rozmazem: wykazanie hiperleukocytozy z limfocytozą >70% przy prawidłowym CRP.<br>3. Monitorowanie pulsoksymetryczne SpO2 i EKG w trakcie paroksyzmów kaszlu.<br>4. RTG klatki piersiowej w celu wykluczenia wtórnego zapalenia płuc lub niedodmy (obraz 'serca kosmatego').",
    drugsAndDoses: "1. Antybiotyk I rzutu u niemowląt <6 m.ż.: <span class='dose-pill'>Azytromycyna 10 mg/kg m.c./dobę p.o.</span> raz dziennie przez <span class='dose-pill'>5 dni</span>.<br>2. Alternatywa u dzieci >6 m.ż.: <span class='dose-pill'>Klarytromycyna 15 mg/kg m.c./dobę p.o.</span> w 2 dawkach podzielonych przez <span class='dose-pill'>7 dni</span>.<br>3. Chemioprofilaktyka poekspozycyjna dla WSZYSTKICH domowników: <span class='dose-pill'>Azytromycyna 500 mg w 1. dniu, następnie 250 mg w dniach 2-5 p.o.</span> (dorośli).<br>4. Tlenoterapia bierna w napadach: <span class='dose-pill'>Tlen 100% przez maskę lub wąsy tlenowe</span>.<br>5. KATEGORYCZNY ZAKAZ: nie stosować leków przeciwkaszlowych (kodeina, butamirat) ani mukolityków u niemowląt!",
    procedures: "1. Natychmiastowe odsysanie lepkiej wydzieliny z jamy ustnej i gardła po napadzie kaszlu przy użyciu miękkiego cewnika odsysającego.<br>2. Zapewnienie stałego nadzoru pielęgniarskiego i kardiomonitoringu (alarmy bezdechu i bradykardii).<br>3. Minimalizacja bodźców środowiskowych wyzwalających salwy kaszlu (cisza, przyciemnione światło, delikatne zabiegi pielęgnacyjne).<br>4. Karmienie niemowlęcia małymi porcjami zagęszczonego pokarmu lub żywienie przez zgłębnik żołądkowy z przerwami na napady kaszlu w celu zapobiegania zachłyśnięciu.",
    monitoring: "1. Ciągły monitoring częstości akcji serca i saturacji (rejestracja głębokości i czasu trwania bezdechów oraz bradykardii).<br>2. Ścisła kontrola liczby leukocytów w morfologii (WBC >50 G/L wiąże się z ryzykiem zespołu hiperleukocytozy, zakrzepicy naczyń płucnych i zgonu).<br>3. Obserwacja neurologiczna pod kątem drgawek hipoksycznych i encefalopatii krztuścowej.<br>4. Kontrola nawodnienia i masy ciała niemowlęcia (ryzyko odwodnienia z powodu wymiotów po kaszlu)."
  },
  lekQuestions: [
    {
      id: 1,
      q: "Który z poniższych objawów laboratoryjnych w morfologii krwi obwodowej jest wysoce charakterystyczny (patognomoniczny) dla krztuśca wywołanego przez Bordetella pertussis?",
      opts: [
        "A. Leukopenia z ciężką neutropenią",
        "B. Znaczna leukocytoza z bezwzględną limfocytozą przy prawidłowym lub nieznacznie podwyższonym CRP",
        "C. Izolowana małopłytkowość poniżej 10 G/L",
        "D. Masywna eozynofilia przekraczająca 40% rozmazu",
        "E. Pancytopenia z obecnością komórek Reed-Sternberga"
      ],
      options: [
        "A. Leukopenia z ciężką neutropenią",
        "B. Znaczna leukocytoza z bezwzględną limfocytozą przy prawidłowym lub nieznacznie podwyższonym CRP",
        "C. Izolowana małopłytkowość poniżej 10 G/L",
        "D. Masywna eozynofilia przekraczająca 40% rozmazu",
        "E. Pancytopenia z obecnością komórek Reed-Sternberga"
      ],
      correctIdx: 1,
      correct: 1,
      exp: "Prawidłowa odpowiedź: B. Znamienną i unikalną cechą krztuśca jest znaczna leukocytoza (często 20-50 G/L i więcej) z przewagą limfocytów (>60-80%), wynikająca z działania toksyny krztuścowej (dawniej czynnika stymulującego limfocytozę – LPF), przy zazwyczaj niskim/prawidłowym stężeniu białka C-reaktywnego (CRP).",
      expl: "Prawidłowa odpowiedź: B. Znamienną i unikalną cechą krztuśca jest znaczna leukocytoza (często 20-50 G/L i więcej) z przewagą limfocytów (>60-80%), wynikająca z działania toksyny krztuścowej (dawniej czynnika stymulującego limfocytozę – LPF), przy zazwyczaj niskim/prawidłowym stężeniu białka C-reaktywnego (CRP)."
    },
    {
      id: 2,
      q: "U niemowląt poniżej 6. miesiąca życia zakażenie Bordetella pertussis charakteryzuje się odmiennym przebiegiem klinicznym polegającym na:",
      opts: [
        "A. Braku typowego świstu wdechowego (piania) oraz dominacji epizodów bezdechu (apnea), sinicy i bradykardii stwarzających ryzyko nagłego zgonu",
        "B. Występowaniu wyłącznie obfitych krwawień z przewodu pokarmowego",
        "C. Całkowitym braku kaszlu i obecności wyłącznie rumienia dłoniowego",
        "D. Piorunującym zapaleniu stawów biodrowych",
        "E. Utracie słuchu jako jedynym objawie infekcji"
      ],
      options: [
        "A. Braku typowego świstu wdechowego (piania) oraz dominacji epizodów bezdechu (apnea), sinicy i bradykardii stwarzających ryzyko nagłego zgonu",
        "B. Występowaniu wyłącznie obfitych krwawień z przewodu pokarmowego",
        "C. Całkowitym braku kaszlu i obecności wyłącznie rumienia dłoniowego",
        "D. Piorunującym zapaleniu stawów biodrowych",
        "E. Utracie słuchu jako jedynym objawie infekcji"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Prawidłowa odpowiedź: A. Z powodu anatomicznej i czynnościowej niedojrzałości układu oddechowego u niemowląt <6 m.ż. rzadko słyszy się klasyczne 'pianie' (whoop). Dominują groźne dla życia bezdechy, sinica, zapaść oddechowa i drgawki z niedotlenienia.",
      expl: "Prawidłowa odpowiedź: A. Z powodu anatomicznej i czynnościowej niedojrzałości układu oddechowego u niemowląt <6 m.ż. rzadko słyszy się klasyczne 'pianie' (whoop). Dominują groźne dla życia bezdechy, sinica, zapaść oddechowa i drgawki z niedotlenienia."
    },
    {
      id: 3,
      q: "Lekiem pierwszego wyboru w leczeniu przyczynowym krztuśca u 2-miesięcznego niemowlęcia jest:",
      opts: [
        "A. Amoksycylina doustnie",
        "B. Azytromycyna doustnie",
        "C. Cefuroksym aksetyl",
        "D. Kotrimoksazol",
        "E. Ciprofloksacyna"
      ],
      options: [
        "A. Amoksycylina doustnie",
        "B. Azytromycyna doustnie",
        "C. Cefuroksym aksetyl",
        "D. Kotrimoksazol",
        "E. Ciprofloksacyna"
      ],
      correctIdx: 1,
      correct: 1,
      exp: "Prawidłowa odpowiedź: B. Złotym standardem leczenia krztuśca u noworodków i niemowląt jest azytromycyna (10 mg/kg/d przez 5 dni). Erytromycyna nie jest preferowana u niemowląt ze względu na ryzyko przerostowego zwężenia odźwiernika (IHPS), a kotrimoksazol jest przeciwwskazany u dzieci poniżej 2. miesiąca życia.",
      expl: "Prawidłowa odpowiedź: B. Złotym standardem leczenia krztuśca u noworodków i niemowląt jest azytromycyna (10 mg/kg/d przez 5 dni). Erytromycyna nie jest preferowana u niemowląt ze względu na ryzyko przerostowego zwężenia odźwiernika (IHPS), a kotrimoksazol jest przeciwwskazany u dzieci poniżej 2. miesiąca życia."
    },
    {
      id: 4,
      q: "Złotym standardem laboratoryjnej diagnostyki krztuśca w pierwszych 3-4 tygodniach choroby jest:",
      opts: [
        "A. Badanie PCR z wymazu z nosogardła",
        "B. Badanie mikroskopowe plwociny metodą Grama",
        "C. Odczyn wiązania dopełniacza z surowicy",
        "D. Gazometria krwi tętniczej",
        "E. Posiew moczu na podłożu MacConkeya"
      ],
      options: [
        "A. Badanie PCR z wymazu z nosogardła",
        "B. Badanie mikroskopowe plwociny metodą Grama",
        "C. Odczyn wiązania dopełniacza z surowicy",
        "D. Gazometria krwi tętniczej",
        "E. Posiew moczu na podłożu MacConkeya"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Prawidłowa odpowiedź: A. Metoda PCR wymazu z nosogardła (pobranego z użyciem wymazówki z dacronu/nylonu) cechuje się najwyższą czułością i swoistością we wczesnej fazie krztuśca (do 3.-4. tygodnia).",
      expl: "Prawidłowa odpowiedź: A. Metoda PCR wymazu z nosogardła (pobranego z użyciem wymazówki z dacronu/nylonu) cechuje się najwyższą czułością i swoistością we wczesnej fazie krztuśca (do 3.-4. tygodnia)."
    },
    {
      id: 5,
      q: "Jaki jest główny cel wdrożenia antybiotykoterapii makrolidowej u pacjenta w fazie napadowego kaszlu krztuśca?",
      opts: [
        "A. Natychmiastowe zatrzymanie kaszlu w ciągu 2 godzin",
        "B. Eradykacja bakterii z dróg oddechowych, skrócenie okresu zakaźności dla otoczenia oraz zapobieganie wtórnym nadkażeniom bakteryjnym",
        "C. Wywołanie natychmiastowej atrofii migdałków podniebiennych",
        "D. Zablokowanie receptorów histaminowych H1 w mózgu",
        "E. Wyleczenie skoliozy klatki piersiowej"
      ],
      options: [
        "A. Natychmiastowe zatrzymanie kaszlu w ciągu 2 godzin",
        "B. Eradykacja bakterii z dróg oddechowych, skrócenie okresu zakaźności dla otoczenia oraz zapobieganie wtórnym nadkażeniom bakteryjnym",
        "C. Wywołanie natychmiastowej atrofii migdałków podniebiennych",
        "D. Zablokowanie receptorów histaminowych H1 w mózgu",
        "E. Wyleczenie skoliozy klatki piersiowej"
      ],
      correctIdx: 1,
      correct: 1,
      exp: "Prawidłowa odpowiedź: B. Antybiotyk podany w fazie napadowej nie skraca istotnie czasu trwania paroksyzmów kaszlu (ponieważ nabłonek dróg oddechowych został już zniszczony przez cytotoksynę tchawiczą), ale eliminuje żywe bakterie z dróg oddechowych (pacjent przestaje zakażać po 5 dniach azytromycyny) i zapobiega powikłaniom.",
      expl: "Prawidłowa odpowiedź: B. Antybiotyk podany w fazie napadowej nie skraca istotnie czasu trwania paroksyzmów kaszlu (ponieważ nabłonek dróg oddechowych został już zniszczony przez cytotoksynę tchawiczą), ale eliminuje żywe bakterie z dróg oddechowych (pacjent przestaje zakażać po 5 dniach azytromycyny) i zapobiega powikłaniom."
    },
    {
      id: 6,
      q: "Kto z osób mających bliski kontakt z chorym na potwierdzony krztusiec powinien otrzymać chemioprofilaktykę poekspozycyjną?",
      opts: [
        "A. Wyłącznie osoby, które mają gorączkę i świszczący oddech",
        "B. Wszyscy domownicy i osoby z bliskiego kontaktu, bez względu na wiek i przebyte w przeszłości szczepienia ochronne",
        "C. Jedynie dzieci, które nigdy nie były szczepione",
        "D. Wyłącznie osoby w podeszłym wieku powyżej 80 lat",
        "E. Nikt, ponieważ chemioprofilaktyka w krztuścu jest nieskuteczna"
      ],
      options: [
        "A. Wyłącznie osoby, które mają gorączkę i świszczący oddech",
        "B. Wszyscy domownicy i osoby z bliskiego kontaktu, bez względu na wiek i przebyte w przeszłości szczepienia ochronne",
        "C. Jedynie dzieci, które nigdy nie były szczepione",
        "D. Wyłącznie osoby w podeszłym wieku powyżej 80 lat",
        "E. Nikt, ponieważ chemioprofilaktyka w krztuścu jest nieskuteczna"
      ],
      correctIdx: 1,
      correct: 1,
      exp: "Prawidłowa odpowiedź: B. Ze względu na wygasanie odporności poszczepiennej i pochorobowej po 5-10 latach oraz wysokie ryzyko bezobjawowej transmisji na noworodki, chemioprofilaktykę makrolidową wdraża się u wszystkich domowników bez względu na wywiad szczepień.",
      expl: "Prawidłowa odpowiedź: B. Ze względu na wygasanie odporności poszczepiennej i pochorobowej po 5-10 latach oraz wysokie ryzyko bezobjawowej transmisji na noworodki, chemioprofilaktykę makrolidową wdraża się u wszystkich domowników bez względu na wywiad szczepień."
    },
    {
      id: 7,
      q: "Czym jest tzw. strategia kokonowa (cocoon strategy) w profilaktyce krztuśca?",
      opts: [
        "A. Zaszczepienie przeciw krztuścowi wszystkich osób z bezpośredniego otoczenia noworodka (rodziców, rodzeństwa, dziadków, opiekunów), aby chronić niemowlę przed zakażeniem w okresie przed uzyskaniem własnej odporności poszczepiennej",
        "B. Izolacja niemowlęcia w hermetycznym inkubatorze przez pierwszy rok życia",
        "C. Podawanie dziecku antybiotyków profilaktycznie każdego dnia aż do ukończenia 2 lat",
        "D. Owijanie klatki piersiowej niemowlęcia bandażem elastycznym w czasie snu",
        "E. Płukanie nosa noworodka solą fizjologiczną 10 razy na dobę"
      ],
      options: [
        "A. Zaszczepienie przeciw krztuścowi wszystkich osób z bezpośredniego otoczenia noworodka (rodziców, rodzeństwa, dziadków, opiekunów), aby chronić niemowlę przed zakażeniem w okresie przed uzyskaniem własnej odporności poszczepiennej",
        "B. Izolacja niemowlęcia w hermetycznym inkubatorze przez pierwszy rok życia",
        "C. Podawanie dziecku antybiotyków profilaktycznie każdego dnia aż do ukończenia 2 lat",
        "D. Owijanie klatki piersiowej niemowlęcia bandażem elastycznym w czasie snu",
        "E. Płukanie nosa noworodka solą fizjologiczną 10 razy na dobę"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Prawidłowa odpowiedź: A. Strategia kokonowa polega na zaszczepieniu szczepionką dTpa rodziców, rodzeństwa i innych osób opiekujących się niemowlęciem przed ukończeniem przez nie pełnego cyklu szczepień podstawowych.",
      expl: "Prawidłowa odpowiedź: A. Strategia kokonowa polega na zaszczepieniu szczepionką dTpa rodziców, rodzeństwa i innych osób opiekujących się niemowlęciem przed ukończeniem przez nie pełnego cyklu szczepień podstawowych."
    },
    {
      id: 8,
      q: "Która toksyna Bordetella pertussis odpowiada bezpośrednio za zniszczenie aparatu rzęskowego komórek nabłonka dróg oddechowych (ciliostazę i martwicę keratynocytów)?",
      opts: [
        "A. Cytotoksyna tchawicza (TCT)",
        "B. Toksyna botulinowa",
        "C. Enterotoksyna LT",
        "D. Pirogenna egzotoksyna SpeA",
        "E. Streptolizyna O"
      ],
      options: [
        "A. Cytotoksyna tchawicza (TCT)",
        "B. Toksyna botulinowa",
        "C. Enterotoksyna LT",
        "D. Pirogenna egzotoksyna SpeA",
        "E. Streptolizyna O"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Prawidłowa odpowiedź: A. Cytotoksyna tchawicza (tracheal cytotoxin – TCT) jest fragmentem peptydoglikanu ściany komórkowej Bordetella pertussis wywołującym bezpośrednie zahamowanie ruchu rzęsek, wytwarzanie tlenku azotu i apoptozę urzęsionych komórek nabłonka dróg oddechowych.",
      expl: "Prawidłowa odpowiedź: A. Cytotoksyna tchawicza (tracheal cytotoxin – TCT) jest fragmentem peptydoglikanu ściany komórkowej Bordetella pertussis wywołującym bezpośrednie zahamowanie ruchu rzęsek, wytwarzanie tlenku azotu i apoptozę urzęsionych komórek nabłonka dróg oddechowych."
    },
    {
      id: 9,
      q: "W jakim okresie ciąży zaleca się rutynowe szczepienie przeciwko krztuścowi szczepionką dTpa u każdej ciężarnej kobiety?",
      opts: [
        "A. W I trymestrze ciąży (do 10. tygodnia)",
        "B. Między 27. a 36. tygodniem ciąży (optymalnie na początku III trymestru)",
        "C. Wyłącznie w trakcie porodu dożylnie",
        "D. Szczepienie przeciw krztuścowi jest bezwzględnie zakazane w ciąży",
        "E. Dopiero po zakończeniu karmienia piersią"
      ],
      options: [
        "A. W I trymestrze ciąży (do 10. tygodnia)",
        "B. Między 27. a 36. tygodniem ciąży (optymalnie na początku III trymestru)",
        "C. Wyłącznie w trakcie porodu dożylnie",
        "D. Szczepienie przeciw krztuścowi jest bezwzględnie zakazane w ciąży",
        "E. Dopiero po zakończeniu karmienia piersią"
      ],
      correctIdx: 1,
      correct: 1,
      exp: "Prawidłowa odpowiedź: B. Zgodnie z wytycznymi PTGiP, CDC i WHO szczepienie przeciw krztuścowi (szczepionką bezkomórkową dTpa) zaleca się w każdej ciąży między 27. a 36. tygodniem, co gwarantuje maksymalny przezłożyskowy transfer ochronnych przeciwciał IgG do płodu.",
      expl: "Prawidłowa odpowiedź: B. Zgodnie z wytycznymi PTGiP, CDC i WHO szczepienie przeciw krztuścowi (szczepionką bezkomórkową dTpa) zaleca się w każdej ciąży między 27. a 36. tygodniem, co gwarantuje maksymalny przezłożyskowy transfer ochronnych przeciwciał IgG do płodu."
    },
    {
      id: 10,
      q: "Który z poniższych leków jest KATEGORYCZNIE ODRADZANY w leczeniu kaszlu w przebiegu krztuśca u niemowląt?",
      opts: [
        "A. Ośrodkowo działające leki przeciwkaszlowe (np. kodeina, dekstrometorfan)",
        "B. Azytromycyna",
        "C. Tlen",
        "D. Płyn wieloelektrolitowy doustnie",
        "E. Sól fizjologiczna 0,9% w inhalacji"
      ],
      options: [
        "A. Ośrodkowo działające leki przeciwkaszlowe (np. kodeina, dekstrometorfan)",
        "B. Azytromycyna",
        "C. Tlen",
        "D. Płyn wieloelektrolitowy doustnie",
        "E. Sól fizjologiczna 0,9% w inhalacji"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Prawidłowa odpowiedź: A. Leki przeciwkaszlowe (opioidy, kodeina) są nieskuteczne w hamowaniu napadów krztuścowych, a u niemowląt stwarzają śmiertelne niebezpieczeństwo depresji ośrodka oddechowego i zatrzymania oddychania.",
      expl: "Prawidłowa odpowiedź: A. Leki przeciwkaszlowe (opioidy, kodeina) są nieskuteczne w hamowaniu napadów krztuścowych, a u niemowląt stwarzają śmiertelne niebezpieczeństwo depresji ośrodka oddechowego i zatrzymania oddychania."
    },
    {
      id: 11,
      q: "Jakie jest typowe powikłanie mechaniczne gwałtownych paroksyzmów kaszlu obserwowane u pacjentów z krztuścem?",
      opts: [
        "A. Wybroczyny podspojówkowe, pęknięcie wędzidełka języka, krwawienia z nosa i przepukliny pachwinowe",
        "B. Złamanie kości udowej",
        "C. Kamica moczowodowa",
        "D. Zwichnięcie stawu skroniowo-żuchwowego",
        "E. Martwica mięśnia sercowego"
      ],
      options: [
        "A. Wybroczyny podspojówkowe, pęknięcie wędzidełka języka, krwawienia z nosa i przepukliny pachwinowe",
        "B. Złamanie kości udowej",
        "C. Kamica moczowodowa",
        "D. Zwichnięcie stawu skroniowo-żuchwowego",
        "E. Martwica mięśnia sercowego"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Prawidłowa odpowiedź: A. Ekstremalny wzrost ciśnienia w klatce piersiowej i tłoczni brzusznej podczas salw kaszlu prowadzi do pękania naczyń (wylewy podspojówkowe, petechie, epistaxis), owrzodzenia lub naderwania wędzidełka języka (od tarcia o siekacze), a także powstawania przepuklin i odmy opłucnowej.",
      expl: "Prawidłowa odpowiedź: A. Ekstremalny wzrost ciśnienia w klatce piersiowej i tłoczni brzusznej podczas salw kaszlu prowadzi do pękania naczyń (wylewy podspojówkowe, petechie, epistaxis), owrzodzenia lub naderwania wędzidełka języka (od tarcia o siekacze), a także powstawania przepuklin i odmy opłucnowej."
    }
  ],
  flashcards: [
    {
      front: "Jakie są 3 fazy kliniczne krztuśca (kokluszu)?",
      back: "• 1. Faza nieżytowa (1-2 tyg.): katar, stan podgorączkowy, suchy kaszel (NAJWYŻSZA zakaźność).<br>• 2. Faza napadowego kaszlu (2-6 tyg.): paroksyzmy kaszlu, pianie wdechowe (whoop), wymioty, sinica.<br>• 3. Faza rekonwalescencji (tygodnie/miesiące): stopniowe wygasanie ('kaszel 100 dni')."
    },
    {
      front: "Jak przebiega krztusiec u niemowląt <6. miesiąca życia?",
      back: "• Często BRAK klasycznego piania (whoop).<br>• Dominują epizody bezdechu (apnoea), sinica, bradykardia i drgawki z hipoksji.<br>• Stan bezpośredniego zagrożenia życia wymagający hospitalizacji!"
    },
    {
      front: "Co w morfologii krwi jest patognomoniczne dla krztuśca?",
      back: "• Bardzo wysoka leukocytoza (20-50 G/L i więcej).<br>• Bezwzględna limfocytoza (limfocyty >70-80%).<br>• Prawidłowe lub nieznacznie podwyższone CRP.<br>• Spowodowane działaniem toksyny krztuścowej (PT / LPF)."
    },
    {
      front: "Jaki jest antybiotyk I wyboru w leczeniu i profilaktyce krztuśca?",
      back: "• Azytromycyna doustnie:<br>- niemowlęta <6 m.ż.: 10 mg/kg m.c. raz na dobę przez 5 dni.<br>- dorośli: 500 mg w 1. dniu, następnie 250 mg w dniach 2-5."
    },
    {
      front: "Dlaczego antybiotyk w fazie napadowej nie hamuje od razu kaszlu?",
      back: "• Cytotoksyna tchawicza (TCT) zniszczyła już urzęsiony nabłonek dróg oddechowych.<br>• Receptory kaszlowe są odsłonięte i podrażnione.<br>• Antybiotyk eradykuje bakterie (pacjent nie zakaża po 5 dniach), ale kaszel ustępuje dopiero po regeneracji rzęsek (kilka tygodni)."
    },
    {
      front: "Na czym polega strategia kokonowa i szczepienie kobiet w ciąży w krztuścu?",
      back: "• Szczepienie ciężarnej dTpa w 27.-36. Hbd: matczyne IgG przenikają przez łożysko, chroniąc noworodka do 2.-3. m.ż.<br>• Szczepienie kokonowe: zaszczepienie wszystkich domowników (ojciec, rodzeństwo, dziadkowie) w celu stworzenia ochronnego 'kokonu' wokół niemowlęcia."
    }
  ]
};

async function main() {
  await saveCase(case114);
}
main();

const fs = require('fs');
const { decryptObjectAes, encryptStringAes } = require('./encrypt_case.js');
const PASSWORD = '@LEKSzymon28111999';

async function upgradeCase(fname, updater) {
  const enc = JSON.parse(fs.readFileSync('cases/' + fname, 'utf8'));
  const c = await decryptObjectAes(enc, PASSWORD);
  updater(c);
  if (!c.vitalsObj) {
    c.vitalsObj = { hr: 140, bp: "85/50", spo2: 98, rr: 32, temp: 39.2, gcs: 15 };
  }
  const reEnc = await encryptStringAes(JSON.stringify(c, null, 2), PASSWORD);
  fs.writeFileSync('cases/' + fname, JSON.stringify(reEnc, null, 2), 'utf8');
  console.log(`Upgraded clinical storytelling: ${fname}`);
}

async function run() {
  console.log("Starting deep clinical upgrade for cases 104-105 (Pediatric Nephrology)...");

  // ==========================================
  // CASE 104: ZUM u niemowlęcia (OZZN)
  // ==========================================
  await upgradeCase('104_zum_niemowle.json', (c) => {
    c.steps = [
      {
        stepNum: 1,
        title: "Krok 1: Wstępna ocena w izbie przyjęć pediatrycznej – 5-miesięczne niemowlę z gorączką",
        desc: "Do izby przyjęć szpitala dziecięcego rodzice przywożą 5-miesięczną dziewczynkę. Dziecko od 24 godzin wysoko gorączkuje do 39.4°C, jest marudne, płaczliwe przy przewijaniu, odmawia ssania piersi i dwukrotnie zwymiotowało porcję mleka. Nie ma kaszlu, kataru ani biegunki. W badaniu przedmiotowym: HR 148/min, RR 34/min, temp. 39.2°C, SpO2 98%. Skóra blada, bez osutki, ciemiączko przednie na poziomie kości czaszki, miękkie, niepulsujące. Gardło blade, błony bębenkowe perłowoszare z prawidłowym refleksem, osłuchowo nad płucami szmer pęcherzykowy prawidłowy, brzuch miękki, wzdęty, objawy oponowe ujemne. Jak definiujesz ten stan kliniczny i jakie jest natychmiastowe podejrzenie?",
        scenario: "Do izby przyjęć szpitala dziecięcego rodzice przywożą 5-miesięczną dziewczynkę. Dziecko od 24 godzin wysoko gorączkuje do 39.4°C, jest marudne, płaczliwe przy przewijaniu, odmawia ssania piersi i dwukrotnie zwymiotowało porcję mleka. Nie ma kaszlu, kataru ani biegunki. W badaniu przedmiotowym: HR 148/min, RR 34/min, temp. 39.2°C, SpO2 98%. Skóra blada, bez osutki, ciemiączko przednie na poziomie kości czaszki, miękkie, niepulsujące. Gardło blade, błony bębenkowe perłowoszare z prawidłowym refleksem, osłuchowo nad płucami szmer pęcherzykowy prawidłowy, brzuch miękki, wzdęty, objawy oponowe ujemne. Jak definiujesz ten stan kliniczny i jakie jest natychmiastowe podejrzenie?",
        options: [
          {
            text: "Gorączka bez uchwytnego źródła (Fever Without Source - FWS) u niemowlęcia poniżej 12. miesiąca życia; stan wymagający natychmiastowego wykluczenia ciężkiego zakażenia bakteryjnego (SBI), w którym statystycznie najczęstszą przyczyną (u >10% gorączkujących dziewczynek) jest ostre zakażenie układu moczowego / odmiedniczkowe zapalenie nerek (OZZN).",
            correct: true,
            feedback: "Znakomicie! Wytyczne AAP (American Academy of Pediatrics) i Polskiego Towarzystwa Nefrologii Dziecięcej (PTNFD): niemowlę <12. m.ż. z gorączką >=39.0°C bez uchwytnego ogniska infekcji w badaniu fizykalnym ma wysokie ryzyko zakażenia układu moczowego (ZUM). U niemowląt objawy ZUM są całkowicie niespecyficzne: brak typowych dla dorosłych objawów dyzurycznych, a dominują gorączka, drażliwość, wymioty i brak apetytu."
          },
          {
            text: "Zwykłe ząbkowanie, zaleć żel z lidokainą na dziąsła i powrót do domu.",
            correct: false,
            feedback: "Śmiertelnie niebezpieczny błąd! Ząbkowanie nigdy nie daje gorączki >38.5°C ani wymiotów! Przypisywanie wysokiej gorączki ząbkowaniu to częsta przyczyna opóźnienia rozpoznania urosepsy u niemowląt."
          },
          {
            text: "Wirusowe zapalenie gardła, mimo że gardło jest blade.",
            correct: false,
            feedback: "Błędne – badanie fizykalne wykluczyło infekcję górnych dróg oddechowych."
          },
          {
            text: "Wskazanie do natychmiastowego podania aspiryny i zimnych kąpieli w lodzie.",
            correct: false,
            feedback: "Kardynalny błąd! Kwas acetylosalicylowy u dzieci jest bezwzględnie przeciwwskazany ze względu na ryzyko zespołu Reye'a!"
          }
        ]
      },
      {
        stepNum: 2,
        title: "Krok 2: Pobranie moczu do badania – złoty standard a zakaz woreczków przyklejanych",
        desc: "Pielęgniarka przynosi plastikowy woreczek przyklejany na krocze i pyta, czy nakleić go dziecku, aby pobrać mocz na badanie ogólne i posiew. Jakie jest stanowisko wytycznych AAP i PTNFD dotyczące metody pobierania moczu na posiew u niemowląt?",
        scenario: "Pielęgniarka przynosi plastikowy woreczek przyklejany na krocze i pyta, czy nakleić go dziecku, aby pobrać mocz na badanie ogólne i posiew. Jakie jest stanowisko wytycznych AAP i PTNFD dotyczące metody pobierania moczu na posiew u niemowląt?",
        options: [
          {
            text: "Pobranie moczu do jałowego pojemnika przez jednorazowe cewnikowanie pęcherza moczowego LUB nakłucie nadłonowe (złoty standard); woreczki przyklejane na krocze cechują się odsetkiem wyników fałszywie dodatnich sięgającym 70-85% i są BEZWZGLĘDNIE ZAKAZANE do pobierania moczu na posiew!",
            correct: true,
            feedback: "Genialnie! To żelazne, bezwzględne pytanie LEK i standard AAP: woreczek przyklejany na krocze niemowlęcia ulega natychmiastowej kontaminacji florą bakteryjną skóry i odbytu. Mocz z woreczka może służyć WYŁĄCZNIE do wykluczenia ZUM (gdy wynik badania ogólnego jest całkowicie ujemny). Jeżeli zachodzi konieczność wykonania posiewu i wdrożenia antybiotykoterapii, mocz MUSI być pobrany przez jednorazowe cewnikowanie pęcherza lub nakłucie nadłonowe!"
          },
          {
            text: "Zgoda na woreczek, ponieważ cewnikowanie u niemowlęcia jest zabronione przez prawo.",
            correct: false,
            feedback: "Nieprawda – cewnikowanie cienkim cewnikiem (6F) w warunkach jałowych jest standardową, bezpieczną procedurą medyczną u niemowląt."
          },
          {
            text: "Mocz należy wycisnąć z użytej pieluszki jednorazowej.",
            correct: false,
            feedback: "Absurdalny błąd, całkowita kontaminacja próbki."
          },
          {
            text: "Pobranie moczu jest zbędne, wystarczy badanie krwi.",
            correct: false,
            feedback: "Badanie moczu jest fundamentem rozpoznania ZUM."
          }
        ]
      },
      {
        stepNum: 3,
        title: "Krok 3: Interpretacja wyników badania moczu i wskaźników zapalnych",
        desc: "Pobrano mocz przez jednorazowe cewnikowanie pęcherza moczowego. Wyniki: badanie ogólne moczu – barwa mętna, leukocyty gęsto pokrywają pole widzenia (ropomocz), obecne azotyny (nitrite positive), esteraza leukocytarna (+++), białko 0.4 g/L, erytrocyty 5-10 w pw. Badania krwi: CRP 78 mg/L (norma <5), prokalcytonina (PCT) 1.8 ng/mL (norma <0.5), leukocytoza 19.5 G/L z przewagą neutrofilów. Jak interpretujesz ten obraz kliniczno-laboratoryjny?",
        scenario: "Pobrano mocz przez jednorazowe cewnikowanie pęcherza moczowego. Wyniki: badanie ogólne moczu – barwa mętna, leukocyty gęsto pokrywają pole widzenia (ropomocz), obecne azotyny (nitrite positive), esteraza leukocytarna (+++), białko 0.4 g/L, erytrocyty 5-10 w pw. Badania krwi: CRP 78 mg/L (norma <5), prokalcytonina (PCT) 1.8 ng/mL (norma <0.5), leukocytoza 19.5 G/L z przewagą neutrofilów. Jak interpretujesz ten obraz kliniczno-laboratoryjny?",
        options: [
          {
            text: "Ostre odmiedniczkowe zapalenie nerek (OZZN / Pyelonephritis acuta) – zakażenie górnego odcinka układu moczowego, na co jednoznacznie wskazują: ropomocz, dodatnie azotyny, wysoka gorączka oraz znacznie podwyższone wskaźniki ostrej fazy (CRP >20-30 mg/L, PCT >0.5 ng/mL, leukocytoza neutrofilowa).",
            correct: true,
            feedback: "Znakomicie! Różnicowanie zapalenia pęcherza moczowego (dolny ZUM) od OZZN (górny ZUM) u małych dzieci: OZZN charakteryzuje się zajęciem miąższu nerkowego, gorączką >=38.5°C, wymiotami oraz wysokimi wskaźnikami zapalnymi (CRP >30, PCT >0.5). OZZN niesie bezpośrednie ryzyko tworzenia ogniskowych blizn nerkowych, co w przyszłości może prowadzić do nadciśnienia tętniczego i przewlekłej choroby nerek."
          },
          {
            text: "Bezobjawowy bakteriomocz (bacteriuria asymptomatica), nie wymaga żadnego leczenia.",
            correct: false,
            feedback: "Błąd! Dziecko ma 39.4°C gorączki, wymioty, ropomocz i CRP 78 – to ciężkie zakażenie objawowe, a nie bezobjawowy bakteriomocz!"
          },
          {
            text: "Zapalenie pęcherza moczowego o łagodnym przebiegu, kwalifikujące się do furaginy doustnie w domu.",
            correct: false,
            feedback: "Furazydyna (Furagina) NIE penetruje do miąższu nerek i jest BEZWZGLĘDNIE PRZECIWWSKAZANA w leczeniu OZZN u dzieci!"
          },
          {
            text: "Kłębuszkowe zapalenie nerek z krwiomoczem kłębuszkowym.",
            correct: false,
            feedback: "Dominuje ropomocz i dodatnie azotyny od pałeczek Gram-ujemnych, a nie wałeczki erytrocytarne."
          }
        ]
      },
      {
        stepNum: 4,
        title: "Krok 4: Wdrożenie empirycznej antybiotykoterapii parenteralnej",
        desc: "Po zabezpieczeniu moczu i krwi na posiewy przystępujesz do leczenia przeciwbakteryjnego. Jakie leczenie przeciwdrobnoustrojowe wybierasz u 5-miesięcznego niemowlęcia z OZZN i wymiotami zgodnie z wytycznymi PTNFD?",
        scenario: "Po zabezpieczeniu moczu i krwi na posiewy przystępujesz do leczenia przeciwbakteryjnego. Jakie leczenie przeciwdrobnoustrojowe wybierasz u 5-miesięcznego niemowlęcia z OZZN i wymiotami zgodnie z wytycznymi PTNFD?",
        options: [
          {
            text: "Hospitalizacja i dożylna empiryczna antybiotykoterapia o szerokim spektrum przeciw pałeczkom jelitowym Gram-ujemnym (głównie Escherichia coli) – cefalosporyna III generacji (ceftriakson 50-75 mg/kg m.c. 1x/d i.v. lub cefotaksym) LUB ampicylina z aminoglikozydem (gentamycyna) dożylnie, z jednoczesnym nawadnianiem krystaloidami.",
            correct: true,
            feedback: "Doskonale! Wskazania do leczenia parenteralnego (dożylnego) ZUM u dzieci: wiek <3-6 miesięcy, odwodnienie/wymioty uniemożliwiające podanie doustne, wysokie wskaźniki zapalne lub podejrzenie urosepsy. Cefalosporyny III generacji (ceftriakson, cefotaksym) osiągają wysokie stężenia w miąższu nerek i moczu, skutecznie eliminując najczęstszy uropatogen – E. coli (>80% przypadków)."
          },
          {
            text: "Doustna furagina (furazydyna) w syropie przez 3 dni.",
            correct: false,
            feedback: "Kardynalny błąd zagrażający bliznowaceniem nerek i sepsą! Furagina osiąga stężenie lecznicze jedynie w dolnych drogach moczowych, nie działa w miąższu nerkowym i jest nieskuteczna w OZZN."
          },
          {
            text: "Doustna doksycyklina w tabletkach.",
            correct: false,
            feedback: "Tetracykliny są bezwzględnie przeciwwskazane u dzieci poniżej 8. roku życia z powodu uszkodzenia szkliwa i kości!"
          },
          {
            text: "Ciprofloksacyna doustnie jako lek pierwszego rzutu u niemowlęcia.",
            correct: false,
            feedback: "Fluorochinolony nie są lekami pierwszego rzutu u niemowląt (zastrzeżone dla powikłanych zakażeń Pseudomonas w mukowiscydozie)."
          }
        ]
      },
      {
        stepNum: 5,
        title: "Krok 5: Diagnostyka obrazowa w ostrej fazie – USG układu moczowego",
        desc: "Wdrożono dożylny ceftriakson i nawadnianie. Zgodnie z wytycznymi zlecane jest badanie ultrasonograficzne (USG) jamy brzusznej i układu moczowego. Kiedy należy wykonać USG i jakich powikłań poszukuje się w ostrej fazie OZZN?",
        scenario: "Wdrożono dożylny ceftriakson i nawadnianie. Zgodnie z wytycznymi zlecane jest badanie ultrasonograficzne (USG) jamy brzusznej i układu moczowego. Kiedy należy wykonać USG i jakich powikłań poszukuje się w ostrej fazie OZZN?",
        options: [
          {
            text: "USG układu moczowego należy wykonać w pierwszych 24-48 godzinach hospitalizacji w celu wykluczenia wad anatomicznych utrudniających odpływ moczu (wodonercze, zastawka cewki tylnej), roponercza (pyonephrosis), ropnia nerki lub okołonerkowego oraz oceny symetrii nerek i wielkości pęcherza moczowego.",
            correct: true,
            feedback: "Znakomicie! Wytyczne PTNFD: u każdego dziecka z pierwszym epizodem gorączkowego ZUM USG nerek i pęcherza moczowego jest obligatoryjne w trakcie hospitalizacji. Wczesne USG (do 24-48h, a w ciężkim stanie natychmiast) pozwala wykluczyć przeszkodę pododpływową wymagającą pilnej interwencji urologicznej (np. odbarczenie wodonercza)."
          },
          {
            text: "USG jest całkowicie przeciwwskazane w fazie gorączkowej, bo fale ultradźwiękowe podgrzewają mocz.",
            correct: false,
            feedback: "Absurdalne twierdzenie."
          },
          {
            text: "USG wykonuje się dopiero w 18. roku życia.",
            correct: false,
            feedback: "Niedorzeczne."
          },
          {
            text: "Jedynym dopuszczalnym badaniem w ostrej fazie jest scyntygrafia DMSA.",
            correct: false,
            feedback: "Scyntygrafię DMSA w celu oceny trwałych blizn nerkowych wykonuje się najwcześniej po 6 miesiącach od przebytego epizodu OZZN!"
          }
        ]
      },
      {
        stepNum: 6,
        title: "Krok 6: Wynik posiewu moczu i kryteria bakteriurii znamiennej",
        desc: "W 3. dobie hospitalizacji otrzymujesz wynik posiewu moczu pobranego przez cewnikowanie: 'Wyhodowano Escherichia coli w mianie 5x10^4 CFU/ml (50 000 kolonii/ml), szczep ESBL-ujemny, wrażliwy na cefalosporyny, aminoglikozydy i amoksycylinę z kwasem klawulanowym'. Jak interpretujesz to miano bakterii?",
        scenario: "W 3. dobie hospitalizacji otrzymujesz wynik posiewu moczu pobranego przez cewnikowanie: 'Wyhodowano Escherichia coli w mianie 5x10^4 CFU/ml (50 000 kolonii/ml), szczep ESBL-ujemny, wrażliwy na cefalosporyny, aminoglikozydy i amoksycylinę z kwasem klawulanowym'. Jak interpretujesz to miano bakterii?",
        options: [
          {
            text: "Wynik potwierdza znamienną bakteriurię – dla próbki moczu pobranej przez cewnikowanie pęcherza moczowego kryterium diagnostycznym bakteriurii znamiennej u objawowego dziecka jest miano >=10^4 - 5x10^4 CFU/ml (w odróżnieniu od środkowego strumienia, gdzie granicą jest 10^5 CFU/ml, oraz nakłucia nadłonowego, gdzie liczy się każda liczba kolonii >0).",
            correct: true,
            feedback: "Perfekcyjna wiedza mikrobiologiczna LEK! Kryteria bakteriurii znamiennej (wg Kass/AAP/PTNFD): 1) Nakłucie nadłonowe (SPA) – każda liczba bakterii Gram-ujemnych (>0 CFU/ml); 2) Cewnikowanie pęcherza – >=10^4 (lub 5x10^4) CFU/ml; 3) Środkowy strumień (u dzieci trzymających mocz) – >=10^5 CFU/ml pojedynczego uropatogenu. Wynik 5x10^4 z cewnikowania w obecności ropomoczu jest w 100% diagnostyczny dla ZUM."
          },
          {
            text: "Wynik jest ujemny, ponieważ każdy posiew wymaga co najmniej 1 000 000 CFU/ml.",
            correct: false,
            feedback: "Błąd! Granica 10^5 dotyczy moczu ze środkowego strumienia, a przy cewnikowaniu pęcherza wystarcza 10^4-5x10^4 CFU/ml."
          },
          {
            text: "E. coli to fizjologiczna flora jałowego pęcherza moczowego, nie wymaga leczenia.",
            correct: false,
            feedback: "Pęcherz moczowy jest jałowy; E. coli w pęcherzu z leukocyturią to patogen wywołujący zakażenie!"
          },
          {
            text: "Wynik oznacza kontaminację grzybami Candida.",
            correct: false,
            feedback: "Wyhodowano pałeczkę bakteryjną E. coli, a nie grzyby."
          }
        ]
      },
      {
        stepNum: 7,
        title: "Krok 7: Dalszy plan diagnostyczny – Cystouretrografia mikcyjna (CUM) a odpływ VUR",
        desc: "Gorączka ustąpiła w 2. dobie antybiotykoterapii, stan dziecka jest bardzo dobry, dziecko chętnie pije. W USG: nerki symetryczne, bez zastoju w UKM, pęcherz gładkościenny. Kiedy i u kogo wg aktualnych wytycznych zaleca się wykonanie cystouretrografii mikcyjnej (CUM / VCUG) w celu wykluczenia odpływu pęcherzowo-moczowodowego (VUR)?",
        scenario: "Gorączka ustąpiła w 2. dobie antybiotykoterapii, stan dziecka jest bardzo dobry, dziecko chętnie pije. W USG: nerki symetryczne, bez zastoju w UKM, pęcherz gładkościenny. Kiedy i u kogo wg aktualnych wytycznych zaleca się wykonanie cystouretrografii mikcyjnej (CUM / VCUG) w celu wykluczenia odpływu pęcherzowo-moczowodowego (VUR)?",
        options: [
          {
            text: "CUM (VCUG) wykonuje się po pełnym wyleczeniu zakażenia i uzyskaniu jałowego posiewu moczu; wskazaniami są: nieprawidłowy obraz w USG (poszerzenie UKM, podejrzenie wady anatomicznej), nawrót gorączkowego ZUM (drugi epizod OZZN) LUB ciężki przebieg urosepsy z patogenem innym niż E. coli.",
            correct: true,
            feedback: "Znakomicie! Wytyczne AAP i europejskie zrewidowały dawne agresywne podejście: u niemowląt po PIERWSZYM niepowikłanym epizodzie OZZN z PRAWIDŁOWYM wynikiem USG nie zaleca się rutynowo inwazyjnego badania CUM (narażenie na promieniowanie rentgenowskie i ryzyko zakażenia jatrogennego). CUM jest bezwzględnie wskazane, jeśli USG wykazuje wodonercze/bliznę LUB w przypadku wystąpienia nawrotu gorączkowego ZUM (tzw. 'bottom-up approach'). Badanie wykonuje się zawsze w osłonie jałowego moczu!"
          },
          {
            text: "CUM należy wykonać natychmiast na szczycie gorączki w 1. dobie pobytu.",
            correct: false,
            feedback: "Śmiertelny błąd! CUM w ostrej fazie zapalenia z dodatnim posiewem może 'wtłoczyć' zakażony mocz do nerek pod ciśnieniem i wywołać piorunującą urosepsę!"
          },
          {
            text: "CUM wykonuje się u każdego dorosłego powyżej 80. roku życia.",
            correct: false,
            feedback: "CUM to badanie pediatryczne dedykowane diagnostyce wad układu moczowego (VUR, zastawka cewki tylnej)."
          },
          {
            text: "Badanie CUM zostało trwale wycofane z medycyny i zastąpione wróżeniem z fusów.",
            correct: false,
            feedback: "Niedorzeczne."
          }
        ]
      },
      {
        stepNum: 8,
        title: "Krok 8: Dokończenie leczenia (terapia sekwencyjna), profilaktyka i zalecenia przy wypisie",
        desc: "Łączny czas leczenia przeciwbakteryjnego OZZN u niemowlęcia powinien wynosić 10-14 dni. Po 3 dobach leczenia dożylnego i ustąpieniu gorączki przechodzisz na terapię doustną (amoksycylina z kwasem klawulanowym lub cefiksym zgodnie z antybiogramem). Jakie kluczowe zalecenia edukacyjne przekazujesz rodzicom przed wypisem?",
        scenario: "Łączny czas leczenia przeciwbakteryjnego OZZN u niemowlęcia powinien wynosić 10-14 dni. Po 3 dobach leczenia dożylnego i ustąpieniu gorączki przechodzisz na terapię doustną (amoksycylina z kwasem klawulanowym lub cefiksym zgodnie z antybiogramem). Jakie kluczowe zalecenia edukacyjne przekazujesz rodzicom przed wypisem?",
        options: [
          {
            text: "Dokończenie pełnego 10-dniowego kursu antybiotyku doustnie, prawidłowa higiena krocza (podcieranie od przodu do tyłu, unikanie kąpieli z pianą i mydeł drażniących), częste pojenie oraz bezwzględna zasada: przy każdym kolejnym epizodzie gorączki bez jasnej przyczyny u dziecka należy W PIERWSZEJ KOLEJNOŚCI zbadać mocz przed włączeniem jakiegokolwiek antybiotyku.",
            correct: true,
            feedback: "Wybitna profilaktyka pediatryczna! Każdy przebyty epizod OZZN zwiększa ryzyko nawrotu i uszkodzenia miąższu nerek. Złota zasada dla rodziców: 'Nowa gorączka = natychmiastowe badanie ogólne i posiew moczu'. Rutynowa przewlekła profilaktyka antybiotykowa (CAP) nie jest obecnie zalecana po pierwszym epizodzie bez stwierdzonego wysokiego odpływu VUR (stopnia IV-V)."
          },
          {
            text: "Zalecenie natychmiastowego odstawienia antybiotyku, skoro dziecko już nie ma gorączki.",
            correct: false,
            feedback: "Zbyt wczesne przerwanie leczenia OZZN doprowadzi do nawrotu zakażenia, selekcji szczepów opornych i bliznowacenia nerek!"
          },
          {
            text: "Podawanie profilaktycznej ciprofloksacyny przez 10 lat bez przerwy.",
            correct: false,
            feedback: "Błędne i toksyczne postępowanie."
          },
          {
            text: "Zakaz podawania jakichkolwiek płynów dziecku.",
            correct: false,
            feedback: "Odwodnienie sprzyja namnażaniu bakterii w pęcherzu moczowym."
          }
        ]
      }
    ];
  });

  // ==========================================
  // CASE 105: Zespół nerczycowy u dziecka (MCD)
  // ==========================================
  await upgradeCase('105_zespol_nerczycowy_mcd.json', (c) => {
    c.steps = [
      {
        stepNum: 1,
        title: "Krok 1: Wstępna ocena w gabinecie pediatrycznym – 3-letni chłopiec z narastającymi obrzękami",
        desc: "Do oddziału pediatrycznego zgłaszają się rodzice z 3-letnim chłopcem. Od 5 dni rodzice obserwowali narastające obrzęki powiek i twarzy, początkowo rano po przebudzeniu (uważane przez lekarza POZ za 'alergię na pyłki'), a od wczoraj obrzęki objęły mosznę, podbrzusze oraz obie kończyny dolne (ciastowate doły po ucisku palcem nad piszczelami). Brzuch dziecka powiększył się, chłopiec stał się apatyczny, a oddawany mocz jest silnie spieniony i oddawany w małych objętościach. W wywiadzie: 2 tygodnie temu przebył łagodną infekcję kataralną. W badaniu: HR 112/min, BP 98/60 mmHg (prawidłowe), temp. 36.7°C, masa ciała 16.5 kg (wzrost masy o 2.5 kg w ciągu tygodnia!). Brzuch wzdęty, z cechami wolnego płynu (objaw chełbotania dodatni). Jaka jest Twoja robocza diagnoza kliniczna?",
        scenario: "Do oddziału pediatrycznego zgłaszają się rodzice z 3-letnim chłopcem. Od 5 dni rodzice obserwowali narastające obrzęki powiek i twarzy, początkowo rano po przebudzeniu (uważane przez lekarza POZ za 'alergię na pyłki'), a od wczoraj obrzęki objęły mosznę, podbrzusze oraz obie kończyny dolne (ciastowate doły po ucisku palcem nad piszczelami). Brzuch dziecka powiększył się, chłopiec stał się apatyczny, a oddawany mocz jest silnie spieniony i oddawany w małych objętościach. W wywiadzie: 2 tygodnie temu przebył łagodną infekcję kataralną. W badaniu: HR 112/min, BP 98/60 mmHg (prawidłowe), temp. 36.7°C, masa ciała 16.5 kg (wzrost masy o 2.5 kg w ciągu tygodnia!). Brzuch wzdęty, z cechami wolnego płynu (objaw chełbotania dodatni). Jaka jest Twoja robocza diagnoza kliniczna?",
        options: [
          {
            text: "Zespół nerczycowy (Nephrotic Syndrome) – najprawdopodobniej idiopatyczny zespół nerczycowy o podłożu submikroskopowego zapalenia kłębuszków nerkowych (MCD - Minimal Change Disease), typowy dla małych dzieci.",
            correct: true,
            feedback: "Znakomicie! Klasyczna prezentacja idiopatycznego zespołu nerczycowego u dziecka w wieku przedszkolnym (szczyt zachorowań 2-6 r.ż., chłopcy chorują 2x częściej): narastające obrzęki obwodowe i przesięki do jam ciała (wodobrzusze, obrzęk moszny) poprzedzone często infekcją wirusową, spieniony mocz (masywny białkomocz) oraz szybki przyrost masy ciała będący w rzeczywistości zatrzymaną wodą pozanaczyniową. W 85-90% przypadków u dzieci odpowiada za to zmiana minimalna (MCD)."
          },
          {
            text: "Ostra reakcja anafilaktyczna na pyłki roślin, zlecasz domięśniową adrenalinę.",
            correct: false,
            feedback: "Błąd! Obrzęk w anafilaksji rozwija się w ciągu minut z pokrzywką, świstami i spadkiem ciśnienia. Pięciodniowe narastanie ciastowatych obrzęków całego ciała ze spienionym moczem to zespół nerczycowy, a nie anafilaksja!"
          },
          {
            text: "Marskość wątroby w przebiegu alkoholizmu dziecięcego.",
            correct: false,
            feedback: "Absurdalne rozpoznanie u 3-letniego dziecka."
          },
          {
            text: "Zastoinowa niewydolność serca z powodu wady aortalnej.",
            correct: false,
            feedback: "Brak szmeru nad sercem, prawidłowe ciśnienie i brak cech zastoju płucnego przemawiają za chorobą nerek."
          }
        ]
      },
      {
        stepNum: 2,
        title: "Krok 2: Kryteria diagnostyczne zespołu nerczycowego – badania laboratoryjne",
        desc: "Zlecasz natychmiastowe badania laboratoryjne krwi i moczu. Jakie 4 składowe definiują pełnoobjawowy zespół nerczycowy wg wytycznych KDIGO i PTNFD?",
        scenario: "Zlecasz natychmiastowe badania laboratoryjne krwi i moczu. Jakie 4 składowe definiują pełnoobjawowy zespół nerczycowy wg wytycznych KDIGO i PTNFD?",
        options: [
          {
            text: "1) Masywny białkomocz (zakres nerczycowy: białkomocz >50 mg/kg m.c./dobę lub wskaźnik białko/kreatynina w moczu UPCR >=2.0 mg/mg); 2) Hipoalbuminemia (stężenie albuminy w surowicy <25 g/L); 3) Uogólnione obrzęki ciastowate; 4) Hiperlipidemia (podwyższone stężenie cholesterolu całkowitego i triglicerydów).",
            correct: true,
            feedback: "Perfekcyjna, podręcznikowa definicja zespołu nerczycowego! U naszego pacjenta: białko w moczu testem paskowym (++++), UPCR = 5.8 mg/mg, albumina w surowicy = 16 g/L (norma 35-50), cholesterol całkowity = 380 mg/dL. Spadek ciśnienia onkotycznego osocza (z powodu utraty albuminy) prowadzi do ucieczki płynu do przestrzeni pozanaczyniowej (obrzęki) i wtórnej aktywacji układu RAA (hipowolemia efektywna)."
          },
          {
            text: "Białkomocz śladowy, hiperkaliemia, obrzęk mózgu i hipotermia.",
            correct: false,
            feedback: "Błędne składowe."
          },
          {
            text: "Tylko i wyłącznie podwyższona kreatynina powyżej 5 mg/dL.",
            correct: false,
            feedback: "Kreatynina w zespole nerczycowym MCD na początku jest często prawidłowa!"
          },
          {
            text: "Krwiomocz makroskopowy, wysokie ciśnienie i oliguria (triada Addisa).",
            correct: false,
            feedback: "To triada zespołu nefrytycznego (zapalnego), a nie nerczycowego!"
          }
        ]
      },
      {
        stepNum: 3,
        title: "Krok 3: Czy u 3-letniego dziecka z zespołem nerczycowym konieczna jest biopsja nerki?",
        desc: "Młodszy rezydent pyta, czy przed wdrożeniem leczenia należy natychmiast wykonać przezskórną biopsję nerki u tego 3-letniego chłopca. Jak brzmi współczesny standard postępowania wg KDIGO?",
        scenario: "Młodszy rezydent pyta, czy przed wdrożeniem leczenia należy natychmiast wykonać przezskórną biopsję nerki u tego 3-letniego chłopca. Jak brzmi współczesny standard postępowania wg KDIGO?",
        options: [
          {
            text: "NIE – u dzieci w wieku od 1. do 10.-12. roku życia z typowym obrazem idiopatycznego zespołu nerczycowego (bez cech zespołu nefrytycznego, prawidłowe składowe dopełniacza C3/C4, brak krwiomoczu i nadciśnienia) NIE wykonuje się wstępnej biopsji nerki, lecz wdraża empiryczną sterydoterapię; biopsja jest wskazana dopiero w razie sterydooporności (brak remisji po 4-6 tyg.) lub nietypowego przebiegu.",
            correct: true,
            feedback: "Znakomicie! To jeden z najważniejszych dogmatów nefrologii dziecięcej testowany na LEK: u dzieci 1-10 r.ż. zmiana minimalna (MCD) odpowiada za ok. 90% przypadków i w >90% wykazuje doskonałą wrażliwość na glikokortykosteroidy (sterydowrażliwy zespół nerczycowy - SSNS). Biopsja nerki jest zabiegiem inwazyjnym i na tym etapie byłaby błędem sztuki. Wykonuje się ją tylko u dzieci <1. r.ż. (podejrzenie wrodzonego ZN), >12. r.ż., z hipokomplementemią C3/C4 lub przy braku odpowiedzi na sterydy."
          },
          {
            text: "TAK – biopsja nerki jest bezwzględnie konieczna w pierwszych 2 godzinach u każdego noworodka i dziecka.",
            correct: false,
            feedback: "Kardynalny błąd! Rutynowa biopsja u typowego 3-latka jest błędem sztuki."
          },
          {
            text: "Biopsję wykonuje się wyłącznie z wątroby.",
            correct: false,
            feedback: "Niedorzeczne."
          },
          {
            text: "Zamiast biopsji usuwa się profilaktycznie obie nerki.",
            correct: false,
            feedback: "Absurdalne stwierdzenie."
          }
        ]
      },
      {
        stepNum: 4,
        title: "Krok 4: Leczenie przyczynowe I rzutu – schemat sterydoterapii wg KDIGO",
        desc: "Jakie leczenie przyczynowe pierwszego wyboru wdrażasz zgodnie z międzynarodowymi wytycznymi KDIGO i PTNFD?",
        scenario: "Jakie leczenie przyczynowe pierwszego wyboru wdrażasz zgodnie z międzynarodowymi wytycznymi KDIGO i PTNFD?",
        options: [
          {
            text: "Glikokortykosteroidy doustnie – prednizon (lub prednizolon) w dawce standardowej 60 mg/m2 powierzchni ciała/dobę (lub 2 mg/kg m.c./dobę, maks. 60 mg/dobę) w dawce pojedynczej porannej przez 4-6 tygodni, a po uzyskaniu remisji redukcja do 40 mg/m2 co drugi dzień przez kolejne 4-6 tygodni z powolnym odstawianiem.",
            correct: true,
            feedback: "Dokładnie tak! Standard sterydoterapii pierwszego rzutu w ZN: prednizon w pełnej dawce codziennej przez 4-6 tygodni. Kryterium remisji to ustąpienie białkomoczu (test paskowy ujemny lub śladowy przez 3 kolejne dni). U ponad 90% dzieci z MCD remisję udaje się uzyskać w ciągu pierwszych 2-3 tygodni leczenia!"
          },
          {
            text: "Cyklosporyna A w maksymalnej dawce nefrotoksycznej bez sterydów.",
            correct: false,
            feedback: "Inhibitory kalcyneuryny (cyklosporyna, takrolimus) są lekami drugiego rzutu w sterydooporności, a nie w pierwszym rzucie!"
          },
          {
            text: "Wysokie dawki niesteroidowych leków przeciwzapalnych (ibuprofen).",
            correct: false,
            feedback: "NLPZ w zespole nerczycowym mogą wywołać ostre uszkodzenie nerek (AKI) z powodu hamowania prostaglandyn nerkowych!"
          },
          {
            text: "Podanie dożylnej witaminy C przez 3 miesiące.",
            correct: false,
            feedback: "Całkowicie nieskuteczne."
          }
        ]
      },
      {
        stepNum: 5,
        title: "Krok 5: Postępowanie w ciężkich obrzękach – Rola 20% albuminy i furosemidu",
        desc: "Dziecko ma potężne obrzęki, wodobrzusze utrudniające oddychanie i obrzęk moszny. Albumina w surowicy wynosi zaledwie 14 g/L, a skóra jest chłodna z cechami hipowolemii wewnątrznaczyniowej. Pielęgniarka pyta: 'Czy podać sam dożylny furosemid w dużej dawce?'. Co decydujesz i dlaczego?",
        scenario: "Dziecko ma potężne obrzęki, wodobrzusze utrudniające oddychanie i obrzęk moszny. Albumina w surowicy wynosi zaledwie 14 g/L, a skóra jest chłodna z cechami hipowolemii wewnątrznaczyniowej. Pielęgniarka pyta: 'Czy podać sam dożylny furosemid w dużej dawce?'. Co decydujesz i dlaczego?",
        options: [
          {
            text: "Podanie SAMEGO furosemidu przy ciężkiej hipoalbuminemii (<15-20 g/L) i hipowolemii jest BŁĘDEM SZTUKI – spowoduje dalsze odwodnienie łożyska naczyniowego, wstrząs hipowolemiczny, ostre uszkodzenie nerek (AKI) i zakrzepicę! Prawidłowe postępowanie to powolny wlew 20% roztworu albuminy (0.5-1.0 g/kg m.c. w ciągu 2-4h), a dopiero w trakcie lub pod koniec wlewu podanie furosemidu (1-2 mg/kg i.v.).",
            correct: true,
            feedback: "Wybitna patofizjologia kliniczna! Złota reguła nefrologii dziecięcej: pacjent z zespołem nerczycowym ma nadmiar wody w tkankach (obrzęki), ale NIEDOBÓR wody w naczyniach (efektywna hipowolemia wskutek niskiego ciśnienia onkotycznego). Podanie samego diuretyku pętlowego jeszcze bardziej 'wysuszy' naczynia, prowadząc do zapaści krążenia i wykrzepiania krwi. 20% albumina ściąga płyn z tkanek do łożyska naczyniowego, a furosemid podany na szczycie wlewu bezpiecznie usuwa nadmiar sodu i wody przez nerki!"
          },
          {
            text: "Zgoda na sam furosemid w dawce 10 mg/kg w szybkim bolusie.",
            correct: false,
            feedback: "Zabójczy błąd! Doprowadzi do wstrząsu, zakrzepicy żył nerkowych i anurii."
          },
          {
            text: "Wskazana jest natychmiastowa punkcja otrzewnej i upuszczenie 5 litrów płynu.",
            correct: false,
            feedback: "Paracenteza u dziecka niesie wysokie ryzyko powikłań i nie usuwa przyczyny hipoalbuminemii."
          },
          {
            text: "Płynoterapię należy prowadzić wyłącznie 0.9% NaCl w ilości 3 litrów.",
            correct: false,
            feedback: "Sód zawarty w soli nasili obrzęki i wodobrzusze."
          }
        ]
      },
      {
        stepNum: 6,
        title: "Krok 6: Zagrożenie infekcyjne – Samoistne bakteryjne zapalenie otrzewnej (SBP)",
        desc: "W 4. dobie hospitalizacji u dziecka nagle pojawia się gorączka 38.9°C, ból brzucha, wymioty oraz wzmożona obrona mięśniowa w badaniu palpacyjnym brzucha. Dlaczego dzieci z zespołem nerczycowym są podatne na ciężkie zakażenia bakteryjne, jaki patogen jest najczęstszą przyczyną i jakie powikłanie podejrzewasz?",
        scenario: "W 4. dobie hospitalizacji u dziecka nagle pojawia się gorączka 38.9°C, ból brzucha, wymioty oraz wzmożona obrona mięśniowa w badaniu palpacyjnym brzucha. Dlaczego dzieci z zespołem nerczycowym są podatne na ciężkie zakażenia bakteryjne, jaki patogen jest najczęstszą przyczyną i jakie powikłanie podejrzewasz?",
        options: [
          {
            text: "Samoistne bakteryjne zapalenie otrzewnej (SBP / Peritonitis spontanea) wywołane najczęściej przez dwoinkę zapalenia płuc (Streptococcus pneumoniae); podatność wynika z utraty z moczem immunoglobulin (IgG), białek kaskady dopełniacza (czynnik B i D) oraz dysfunkcji opsonizacji w płynie puchlinowym.",
            correct: true,
            feedback: "Genialnie! Klasyczne, śmiertelnie groźne powikłanie zespołu nerczycowego często sprawdzane na LEK: dziecko z ZN traci z moczem nie tylko albuminy, ale także immunoglobuliny IgG oraz białka dopełniacza (properdynę, czynnik B). Upośledza to opsonizację i fagocytozę bakterii otoczkowych. Płyn w otrzewnej staje się idealną pożywką dla Streptococcus pneumoniae (oraz pałeczek jelitowych Gram-ujemnych). Wymaga natychmiastowego pobrania posiewów krwi i wdrożenia dożylnego cefotaksymu lub ceftriaksonu!"
          },
          {
            text: "Ostre zapalenie wyrostka robaczkowego z perforacją, natychmiastowa appendektomia.",
            correct: false,
            feedback: "U dziecka z wodobrzuszem i ZN pierwszym podejrzeniem jest SBP – niepotrzebna operacja w zespole nerczycowym wiąże się z wysoką śmiertelnością. Najpierw wyklucza się SBP."
          },
          {
            text: "Zwykła kolka jelitowa, podaj No-Spę.",
            correct: false,
            feedback: "Gorączka 38.9°C i obrona mięśniowa wykluczają zwykłą kolkę."
          },
          {
            text: "Infekcja wirusem polio.",
            correct: false,
            feedback: "Całkowity brak związku."
          }
        ]
      },
      {
        stepNum: 7,
        title: "Krok 7: Zagrożenie zakrzepowo-zatorowe w zespole nerczycowym",
        desc: "Rezydent pyta Cię: jakie jest drugie, obok infekcji, najgroźniejsze powikłanie zespołu nerczycowego u dzieci, jakie są jego mechanizmy i jakie naczynia najczęściej ulegają zajęciu?",
        scenario: "Rezydent pyta Cię: jakie jest drugie, obok infekcji, najgroźniejsze powikłanie zespołu nerczycowego u dzieci, jakie są jego mechanizmy i jakie naczynia najczęściej ulegają zajęciu?",
        options: [
          {
            text: "Powikłania zakrzepowo-zatorowe (zakrzepica żył nerkowych, zakrzepica żył głębokich DVT, zatorowość płucna PE, zakrzepica zatok opony twardej); mechanizm: utrata z moczem antytrombiny III (AT-III), białka S oraz wątrobowa nadprodukcja fibrynogenu, płytek krwi i czynników prozakrzepowych połączona z zagęszczeniem krwi (hemokoncentracją).",
            correct: true,
            feedback: "Wybitna patofizjologia hemostazy! Zespół nerczycowy to stan nabytej, ciężkiej trombofilii: z moczem ucieka naturalny antykoagulant – antytrombina III (ma masę zbliżoną do albuminy), podczas gdy wątroba w reakcji na spadek ciśnienia onkotycznego syntetyzuje olbrzymie ilości fibrynogenu (duża cząsteczka, nie ucieka przez filtr nerkowy). W połączeniu z hipowolemią i zagęszczeniem krwi stwarza to ogromne ryzyko zakrzepicy, zwłaszcza w żyłach nerkowych i mózgowych!"
          },
          {
            text: "Masywna hemofilia A ze spontanicznymi krwawieniami do stawów.",
            correct: false,
            feedback: "W zespole nerczycowym występuje stan NADKRZEPLIWOŚCI (zakrzepica), a nie skaza krwotoczna!"
          },
          {
            text: "Pęknięcie tętniaka aorty piersiowej u każdego 3-latka.",
            correct: false,
            feedback: "Niedorzeczne."
          },
          {
            text: "Brak jakiegokolwiek ryzyka zakrzepicy, krew w ZN nigdy nie krzepnie.",
            correct: false,
            feedback: "Nieprawda – zakrzepica jest jedną z głównych przyczyn zgonu w zespole nerczycowym."
          }
        ]
      },
      {
        stepNum: 8,
        title: "Krok 8: Odpowiedź na leczenie, edukacja rodziców i profilaktyka nawrotów",
        desc: "W 14. dobie sterydoterapii prednizonem obrzęki całkowicie ustąpiły, masa ciała spadła do wyjściowych 14.0 kg, a badanie ogólne moczu przez 3 kolejne dni wykazało całkowity brak białka (remisja całkowita sterydowrażliwego ZN - SSNS). Jakie zalecenia przekazujesz rodzicom przed wypisem dziecka do domu?",
        scenario: "W 14. dobie sterydoterapii prednizonem obrzęki całkowicie ustąpiły, masa ciała spadła do wyjściowych 14.0 kg, a badanie ogólne moczu przez 3 kolejne dni wykazało całkowity brak białka (remisja całkowita sterydowrażliwego ZN - SSNS). Jakie zalecenia przekazujesz rodzicom przed wypisem dziecka do domu?",
        options: [
          {
            text: "Kontynuacja sterydoterapii ściśle wg zaleceń (przejście na schemat co drugi dzień), codzienne monitorowanie pierwszego porannego moczu testami paskowymi w domu (wpisywanie do dzienniczka), dieta z ograniczeniem soli kuchennej, szczepienia ochronne (bezwzględny zakaz żywych szczepionek podczas sterydoterapii!) oraz zaszczepienie przeciwko pneumokokom (PCV) i ospie wietrznej w okresie remisji po odstawieniu sterydów.",
            correct: true,
            feedback: "Perfekcyjna opieka ambulatoryjna nad dzieckiem z ZN! Codzienny test paskowy w domu pozwala natychmiast wychwycić nawrót białkomoczu (często indukowany drobną infekcją kataralną), zanim rozwiną się masywne obrzęki. Kluczowa zasada wakcynologii: w trakcie leczenia immunosupresyjnego/glikokortykosteroidami w wysokich dawkach (prednizon >=2 mg/kg/d) SZCZEPIONKI ŻYWE (MMR, ospa wietrzna) są BEZWZGLĘDNIE PRZECIWWSKAZANE! Szczepienia żywe można podać najwcześniej 1-3 miesiące po zakończeniu sterydoterapii."
          },
          {
            text: "Natychmiastowe odstawienie prednizonu z dnia na dzień po uzyskaniu ujemnego białka w moczu.",
            correct: false,
            feedback: "Gwałtowne odstawienie sterydów po 2-3 tygodniach wywoła ostrą niewydolność kory nadnerczy (przełom nadnerczowy) i natychmiastowy nawrót choroby!"
          },
          {
            text: "Zaszczepienie dziecka żywą szczepionką przeciw odrze, śwince i różyczce (MMR) w trakcie przyjmowania 60 mg prednizonu.",
            correct: false,
            feedback: "Kardynalny błąd zagrażający poszczepiennym uogólnionym zakażeniem u dziecka w immunosupresji!"
          },
          {
            text: "Całkowity zakaz badania moczu w domu.",
            correct: false,
            feedback: "Domowy monitoring paskowy jest podstawą opieki w zespole nerczycowym."
          }
        ]
      }
    ];
  });

  console.log("Cases 104-105 upgrade completed successfully!");
}

run().catch(err => {
  console.error("Error upgrading cases 104-105:", err);
  process.exit(1);
});

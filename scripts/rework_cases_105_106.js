const fs = require('fs');
const path = require('path');
const { decryptObjectAes, encryptStringAes } = require('./encrypt_case');

const CASES_DIR = path.join(__dirname, '..', 'cases');
const MASTER_KEY = '@LEKSzymon28111999';

console.log("Reworking Cases 105 and 106 to Gold Standard...");

// ==========================================
// CASE 105: Zespół nerczycowy MCD u 3-latka
// ==========================================
const case105Data = {
  id: 105,
  filename: "105_zespol_nerczycowy_mcd.json",
  dept: "Pediatria",
  shortTitle: "3-letni Jaś – Obrzęki powiek i moszny, spieniony mocz i wodobrzusze (MCD)",
  diagnosisTitle: "Idiopatyczny zespół nerczycowy o zmianach minimalnych (MCD – Minimal Change Disease)",
  vitals: [
    { label: "Akcja serca (HR)", val: "105/min", sub: "Tachykardia kompensacyjna", status: "warn" },
    { label: "Ciśnienie tętnicze", val: "92/58 mmHg", sub: "Prawidłowe do niskiego (hipowolemia)", status: "ok" },
    { label: "Saturacja SpO2", val: "98%", sub: "W normie", status: "ok" },
    { label: "Częstość oddechów", val: "22/min", sub: "Lekko przyspieszony", status: "ok" },
    { label: "Temperatura ciała", val: "36.8°C", sub: "Normotermia", status: "ok" }
  ],
  vitalsObj: { hr: 105, bp: "92/58", spo2: 98, rr: 22, temp: 36.8, gcs: 15 },
  story: "3-letni Jaś został przyprowadzony do poradni POZ, a następnie skierowany pilnie do Oddziału Pediatrii z powodu narastających od tygodnia ciastowatych obrzęków. Początkowo rodzice zaobserwowali rano wyraźne obrzęki powiek i okolicy oczodołów, co lekarz rodzinny zinterpretował jako odczyn alergiczny na pyłki lub ukąszenie owada i zalecił cetyryzynę. Obrzęki jednak nie ustąpiły, a w kolejnych dniach objęły mosznę, prącie oraz podudzia. Matka zauważyła, że spodnie chłopca stały się za ciasne w pasie, a brzuszek stał się wydęty i twardawy (wodobrzusze). Chłopiec oddaje zdecydowanie mniej moczu (oliguria), a mocz w nocniku jest wyraźnie spieniony, barwy słomkowej. W wywiadzie: 2 tygodnie wcześniej przebył łagodne wirusowe zapalenie gardła. Dotychczasowy rozwój prawidłowy, szczepiony zgodnie z PSO.",
  labs: {
    "Mocz badanie ogólne": [
      { name: "Ciężar właściwy", val: "1.030", norm: "1.015 - 1.025", flag: "H" },
      { name: "Białko w moczu", val: "++++ (>300 mg/dl)", norm: "nieobecne", flag: "CRIT_HIGH" },
      { name: "Wskaźnik białko/kreatynina (UPCR)", val: "8.4 mg/mg", norm: "<0.2 mg/mg (nerczycowy >2.0)", flag: "CRIT_HIGH" },
      { name: "Erytrocyty", val: "0-1 w polu widzenia", norm: "0-3 wpw", flag: "NORMAL" },
      { name: "Wałeczki szkliste", val: "Liczne", norm: "Pojedyncze", flag: "H" },
      { name: "Ciała tłuszczowe / lipiduria", val: "Obecne krzyże maltańskie", norm: "Nieobecne", flag: "H" }
    ],
    "Biochemia krwi": [
      { name: "Białko całkowite", val: "38 g/l", norm: "60 - 80 g/l", flag: "CRIT_LOW" },
      { name: "Albumina", val: "16 g/l", norm: "35 - 50 g/l", flag: "CRIT_LOW" },
      { name: "Cholesterol całkowity", val: "420 mg/dl", norm: "<170 mg/dl", flag: "CRIT_HIGH" },
      { name: "Triglicerydy", val: "290 mg/dl", norm: "<100 mg/dl", flag: "CRIT_HIGH" },
      { name: "Kreatynina", val: "0.36 mg/dl", norm: "0.20 - 0.45 mg/dl", flag: "NORMAL" },
      { name: "Mocznik", val: "34 mg/dl", norm: "15 - 36 mg/dl", flag: "NORMAL" },
      { name: "eGFR wg Schwartza", val: "108 ml/min/1.73m²", norm: ">90 ml/min", flag: "NORMAL" },
      { name: "Sód (Na+)", val: "133 mmol/l", norm: "135 - 145 mmol/l", flag: "L" },
      { name: "Potas (K+)", val: "4.2 mmol/l", norm: "3.5 - 5.0 mmol/l", flag: "NORMAL" },
      { name: "Wapń zjonizowany", val: "1.18 mmol/l", norm: "1.15 - 1.30 mmol/l", flag: "NORMAL" },
      { name: "Dopełniacz C3 i C4", val: "W normie", norm: "C3: 90-180 mg/dl", flag: "NORMAL" }
    ]
  },
  steps: [
    {
      stepNum: 1,
      title: "Krok 1: Wstępna ocena kliniczna zespołu obrzękowego u dziecka",
      desc: "Do oddziału trafia 3-letni chłopiec z ciastowatymi obrzękami powiek, moszny i podudzi oraz wodobrzuszem. Obrzęki nasilają się rano wokół oczu, a w ciągu dnia grawitacyjnie przemieszczają się na kończyny dolne. Rodzice zgłaszają pienienie się moczu. Stan ogólny jest stabilny, bez duszności, tętno 105/min, RR 92/58 mmHg. Jaki jest Twój pierwszy, kluczowy ruch diagnostyczny w izbie przyjęć?",
      scenario: "Do oddziału trafia 3-letni chłopiec z ciastowatymi obrzękami powiek, moszny i podudzi oraz wodobrzuszem. Obrzęki nasilają się rano wokół oczu, a w ciągu dnia grawitacyjnie przemieszczają się na kończyny dolne. Rodzice zgłaszają pienienie się moczu. Stan ogólny jest stabilny, bez duszności, tętno 105/min, RR 92/58 mmHg. Jaki jest Twój pierwszy, kluczowy ruch diagnostyczny w izbie przyjęć?",
      options: [
        {
          text: "Podanie domięśniowe adrenaliny 0.15 mg i deksametazonu z podejrzeniem anafilaksji / obrzęku Quinckego",
          feedback: "❌ BŁĄD! Dziecko nie ma cech anafilaksji, świstów oddechowych ani pokrzywki. Ciastowate obrzęki powiek, moszny, podudzi ze spienionym moczem to klasyczny obraz zespołu nefrologicznego. Podanie adrenaliny jest błędem sztuki."
        },
        {
          text: "Pobranie próbki moczu na badanie ogólne z oceną białkomoczu (test paskowy / osad) oraz UPCR i oznaczenie albuminy w surowicy",
          feedback: "✅ PRAWIDŁOWO! Podstawą weryfikacji zespołu obrzękowego u dziecka jest natychmiastowe badanie moczu. Wykrycie masywnego białkomoczu (++++, >300 mg/dl) w połączeniu z hipoalbuminemią pozwala natychmiast ustalić rozpoznanie zespołu nerczycowego i odróżnić go od obrzęków alergicznych, sercowych czy wątrobowych."
        },
        {
          text: "Natychmiastowe podanie furosemidu 2 mg/kg mc. dożylnie przed jakimikolwiek badaniami laboratoryjnymi",
          feedback: "❌ BŁĄD! KARDYNALNA PUŁAPKA! U dziecka z zespołem nerczycowym występuje hipowolemia wewnątrznaczyniowa (efekt 'underfill'). Podanie samego furosemidu pętlowego bez wcześniejszej oceny wolemii grozi hipowolemicznym załamaniem krążenia, wstrząsem oraz incydentem zakrzepowo-zatorowym!"
        },
        {
          text: "Wykonanie pilnego RTG klatki piersiowej i USG serca z podejrzeniem niewydolności krążenia",
          feedback: "❌ BŁĄD! Izolowana niewydolność krążenia u 3-letniego dotychczas zdrowego dziecka bez szmeru nad sercem i bez duszności jest skrajnie mało prawdopodobna. Pierwszym krokiem jest badanie moczu i ocena białka/albuminy."
        }
      ]
    },
    {
      stepNum: 2,
      title: "Krok 2: Weryfikacja kryteriów rozpoznania zespołu nerczycowego wg KDIGO i PTNFD",
      desc: "Badanie ogólne moczu wykazuje białkomocz ++++ (>300 mg/dl), UPCR wynosi 8.4 mg/mg, w osadzie brak krwinkomoczu. W surowicy: albumina 16 g/l, białko całkowite 38 g/l, cholesterol 420 mg/dl, kreatynina 0.36 mg/dl (w normie). Jak interpretujesz te wyniki w oparciu o wytyczne nefrologii dziecięcej?",
      scenario: "Badanie ogólne moczu wykazuje białkomocz ++++ (>300 mg/dl), UPCR wynosi 8.4 mg/mg, w osadzie brak krwinkomoczu. W surowicy: albumina 16 g/l, białko całkowite 38 g/l, cholesterol 420 mg/dl, kreatynina 0.36 mg/dl (w normie). Jak interpretujesz te wyniki w oparciu o wytyczne nefrologii dziecięcej?",
      options: [
        {
          text: "Wyniki spełniają pełne kryteria idiopatycznego zespołu nerczycowego (białkomocz nerczycowy >50 mg/kg/d lub UPCR >2.0, hipoalbuminemia <25 g/l, obrzęki i hiperlipidemia)",
          feedback: "✅ PRAWIDŁOWO! Spełnione są wszystkie klasyczne kryteria zespołu nerczycowego: białkomocz o nasileniu nerczycowym (UPCR >2.0 mg/mg lub >50 mg/kg/dobę), głęboka hipoalbuminemia (<25 g/l), uogólnione obrzęki oraz wtórna dyslipidemia (cholesterol >200 mg/dl). Prawidłowa kreatynina i brak krwinkomoczu wskazują na postać 'czystą' (typową dla MCD)."
        },
        {
          text: "Wyniki wskazują na ostry zespół nefrytyczny wymagający natychmiastowego leczenia immunosupresyjnego cyklofosfamidem",
          feedback: "❌ BŁĄD! W zespole nefrytycznym dominują: krwinkomocz z wałeczkami erytrocytarnymi, nadciśnienie tętnicze i upośledzenie filtracji nerkowej (wzrost kreatyniny). Tutaj mamy czysty zespół nerczycowy."
        },
        {
          text: "Podwyższony cholesterol świadczy o rodzinnej hipercholesterolemii będącej pierwotną przyczyną uszkodzenia kłębuszków",
          feedback: "❌ BŁĄD! Hipercholesterolemia i hipertriglicerydemia w zespole nerczycowym są zjawiskiem wtórnym – wątroba kompensacyjnie nasila syntezę białek i lipoprotein w odpowiedzi na spadek ciśnienia onkotycznego osocza."
        },
        {
          text: "Należy rozpoznać cewkowo-śródmiąższowe zapalenie nerek z uwagi na obecność wałeczków szklistych",
          feedback: "❌ BŁĄD! Białkomocz w chorobach cewek rzadko przekracza 1-2 g/dobę. Białkomocz rzędu 8.4 mg/mg to masywna utrata albuminy przez barierę filtracyjną kłębuszków (podocyty)."
        }
      ]
    },
    {
      stepNum: 3,
      title: "Krok 3: Kwalifikacja do biopsji nerki – decyzja u 3-letniego dziecka",
      desc: "Młodszy stażysta pyta Cię, czy przed włączeniem leczenia należy pilnie skierować Jasia na przezskórną biopsję nerki, tak jak robi się to standardowo u pacjentów dorosłych na oddziale nefrologii. Jaka jest prawidłowa postawa kliniczna poparta wytycznymi KDIGO i PTNFD?",
      scenario: "Młodszy stażysta pyta Cię, czy przed włączeniem leczenia należy pilnie skierować Jasia na przezskórną biopsję nerki, tak jak robi się to standardowo u pacjentów dorosłych na oddziale nefrologii. Jaka jest prawidłowa postawa kliniczna poparta wytycznymi KDIGO i PTNFD?",
      options: [
        {
          text: "Biopsja nerki jest BEZWZGLĘDNIE zbędna na tym etapie – u dzieci między 1. a 10.–12. r.ż. z typowym obrazem zespołu nerczycowego w >85-90% przyczyną jest MCD, leczenie włącza się empirycznie",
          feedback: "✅ PRAWIDŁOWO! Złota zasada nefrologii dziecięcej (bardzo częste pytanie LEK!): U dzieci w wieku 1-10 (lub 12) lat z typowym zespołem nerczycowym (bez nadciśnienia, bez makrokrwinkomoczu, z prawidłowym eGFR i prawidłowym dopełniaczem C3) w >85-90% występuje choroba zmian minimalnych (MCD). Biopsji NIE wykonuje się wstępnie! Wskazaniami do biopsji są: wiek <1 r.ż. (podejrzenie wrodzonego ZN) lub >10-12 r.ż., cechy nefrytyczne, hipokomplementemia C3 lub sterydooporność."
        },
        {
          text: "Biopsja nerki musi być wykonana w ciągu 24 godzin, gdyż bez oceny mikroskopu elektronowego nie wolno wdrożyć sterydów",
          feedback: "❌ BŁĄD! Wykonywanie inwazyjnej biopsji nerki u małego dziecka z typowym MCD bez wskazań jest błędem sztuki i naraża pacjenta na krwawienie i powikłania anestezjologiczne."
        },
        {
          text: "Biopsja nerki jest wskazana wyłącznie wtedy, gdy stężenie cholesterolu przekracza 500 mg/dl",
          feedback: "❌ BŁĄD! Poziom cholesterolu nie jest kryterium kwalifikacji do biopsji nerki."
        },
        {
          text: "Należy najpierw wykonać tomografię komputerową nerek z kontrastem, aby zastąpić biopsję",
          feedback: "❌ BŁĄD! Podanie jodowego środka cieniującego w stanie hipowolemii nerczycowej grozi ciężką nefropatią kontrastową i ostrym uszkodzeniem nerek!"
        }
      ]
    },
    {
      stepNum: 4,
      title: "Krok 4: Wdrożenie leczenia przyczynowego I rzutu wg wytycznych",
      desc: "Rozpoznano idiopatyczny zespół nerczycowy (prawdopodobnie MCD). Wykluczyłeś cechy zespołu nefrytycznego. Jaki jest lek pierwszego wyboru, jego dawkowanie i czas trwania indukcji remisji wg międzynarodowych standardów KDIGO / PTNFD?",
      scenario: "Rozpoznano idiopatyczny zespół nerczycowy (prawdopodobnie MCD). Wykluczyłeś cechy zespołu nefrytycznego. Jaki jest lek pierwszego wyboru, jego dawkowanie i czas trwania indukcji remisji wg międzynarodowych standardów KDIGO / PTNFD?",
      options: [
        {
          text: "Prednizon doustnie w dawce 60 mg/m² pc./dobę (lub 2 mg/kg mc./dobę, maks. 60 mg/d) rano przez 4 do 6 tygodni",
          feedback: "✅ PRAWIDŁOWO! Standardem I rzutu indukcji remisji jest doustny glikokortykosteroid: Prednizon w dawce 60 mg/m² p.c./dobę (lub 2 mg/kg mc./d, maksymalnie 60 mg/dobę) podawany w pojedynczej dawce porannej codziennie przez 4 do 6 tygodni. Po uzyskaniu pełnej remisji przechodzi się na schemat leczenia alternującego (co drugi dzień: 40 mg/m² pc.) z powolną redukcją dawki."
        },
        {
          text: "Cyklofosfamid doustnie 2 mg/kg mc./d w monoterapii przez 8 tygodni",
          feedback: "❌ BŁĄD! Cyklofosfamid jest lekiem II rzutu stosowanym w zespole nerczycowym często nawracającym lub sterydozależnym, obarczonym ryzykiem mielotoksyczności i bezpłodności."
        },
        {
          text: "Cyklosporyna A w dawce 5 mg/kg mc./d pod kontrolą stężenia leku we krwi (C0)",
          feedback: "❌ BŁĄD! Inhibitory kalcyneuryny (cyklosporyna, takrolimus) są lekami II rzutu, zarezerwowanymi dla zespołu sterydoopornego lub sterydozależnego."
        },
        {
          text: "Wlewy dożylne immunoglobulin (IVIG) 2 g/kg mc. jednorazowo bez sterydów",
          feedback: "❌ BŁĄD! IVIG nie jest leczeniem przyczynowym idiopatycznego zespołu nerczycowego."
        }
      ]
    },
    {
      stepNum: 5,
      title: "Krok 5: Postępowanie w ciężkich objawowych obrzękach z hipowolemią wewnątrznaczyniową",
      desc: "Na drugi dzień hospitalizacji Jaś ma nasilone obrzęki powłok brzucha i moszny utrudniające oddawanie moczu, z przyrostem masy ciała o 3.5 kg. Diureza wynosi zaledwie 0.4 ml/kg/h (oliguria). Ciśnienie tętnicze wynosi 88/52 mmHg, tętno 112/min, nawrót kapilarny 3 sekundy, kończyny są chłodne (cechy hipowolemii efektywnej). W jaki sposób bezpiecznie odbarczyć obrzęki i przywrócić diurezę?",
      scenario: "Na drugi dzień hospitalizacji Jaś ma nasilone obrzęki powłok brzucha i moszny utrudniające oddawanie moczu, z przyrostem masy ciała o 3.5 kg. Diureza wynosi zaledwie 0.4 ml/kg/h (oliguria). Ciśnienie tętnicze wynosi 88/52 mmHg, tętno 112/min, nawrót kapilarny 3 sekundy, kończyny są chłodne (cechy hipowolemii efektywnej). W jaki sposób bezpiecznie odbarczyć obrzęki i przywrócić diurezę?",
      options: [
        {
          text: "Wlew dożylny 20% roztworu albuminy w dawce 0.5–1.0 g/kg mc. (2.5–5 ml/kg) w powolnym wlewie (2–4 h), a pod koniec wlewu Furosemid i.v. 1–2 mg/kg mc.",
          feedback: "✅ PRAWIDŁOWO! Złota reguła leczenia obrzęków nerczycowych z hipowolemią! Sam furosemid u dziecka ze skurczonym łożyskiem naczyniowym spowoduje zapaść krążeniową i zakrzepicę. Wlew 20% albuminy podnosi ciśnienie onkotyczne, ściąga płyn z przestrzeni pozanaczyniowej do łożyska naczyniowego, wypełnia łożysko, a podany pod koniec furosemid pozwala bezpiecznie usunąć nadmiar płynu przez nerki bez ryzyka hipowolemii."
        },
        {
          text: "Podanie dożylne samego Furosemidu w bolusie 5 mg/kg mc. co 6 godzin z ograniczeniem płynów do zera",
          feedback: "❌ BŁĄD! KARDYNALNA PUŁAPKA! Podanie wysokich dawek furosemidu bez albuminy u pacjenta z hipoalbuminemią (16 g/l) i cechami hipowolemii nasili centralizację krążenia, może wywołać przednerkowe ostre uszkodzenie nerek (AKI) i zakrzepicę żyły nerkowej lub zatok mózgowia!"
        },
        {
          text: "Pilna paracenteza (nakłucie jamy brzusznej) i ewakuacja 2 litrów płynu puchlinowego",
          feedback: "❌ BŁĄD! Nakłucie otrzewnej u małego dziecka z wodobrzuszem nerczycowym niesie ogromne ryzyko infekcji (zapalenia otrzewnej), nakłucia jelita i nasilenia hipowolemii. Jest zarezerwowane wyłącznie dla skrajnej duszności z uniesieniem przepony."
        },
        {
          text: "Wlew płynu wieloelektrolitowego w bolusie 40 ml/kg mc. w 15 minut",
          feedback: "❌ BŁĄD! Płyny krystaloidowe natychmiast uciekną do przestrzeni pozanaczyniowej z powodu braku ciśnienia onkotycznego (albumina 16 g/l), dramatycznie nasilając wodobrzusze i obrzęk płuc."
        }
      ]
    },
    {
      stepNum: 6,
      title: "Krok 6: Czujność onkologiczno-zakaźna – nagły ból brzucha i gorączka",
      desc: "W 5. dobie leczenia u Jasia pojawia się nagle gorączka 39.2°C, rozlany silny ból brzucha, wymioty oraz osłabienie perystaltyki. Powłoki brzuszne są tkliwe, z dodatnim objawem Blumberga. CRP wzrasta do 145 mg/l, leukocytoza 19 000/ul. Jakie powikłanie zespołu nerczycowego należy podejrzewać w pierwszej kolejności i jaki patogen za nie odpowiada?",
      scenario: "W 5. dobie leczenia u Jasia pojawia się nagle gorączka 39.2°C, rozlany silny ból brzucha, wymioty oraz osłabienie perystaltyki. Powłoki brzuszne są tkliwe, z dodatnim objawem Blumberga. CRP wzrasta do 145 mg/l, leukocytoza 19 000/ul. Jakie powikłanie zespołu nerczycowego należy podejrzewać w pierwszej kolejności i jaki patogen za nie odpowiada?",
      options: [
        {
          text: "Samoistne bakteryjne zapalenie otrzewnej (SBP) wywołane najczęściej przez Streptococcus pneumoniae (związek z utratą IgG i dopełniacza w moczu) – wymaga pilnej antybiotykoterapii cefalosporyną III generacji",
          feedback: "✅ PRAWIDŁOWO! Klasyczne i groźne powikłanie zespołu nerczycowego u dzieci! Utrata immunoglobulin klasy IgG oraz składowych układu dopełniacza (czynnika B) z moczem prowadzi do nabytego deficytu opsonizacji bakterii otoczkowych. W połączeniu z wodobrzuszem stanowi to idealne środowisko dla Streptococcus pneumoniae (oraz Gram-ujemnych pałeczek E. coli). Wymaga natychmiastowego pobrania posiewów krwi i wdrożenia np. Cefotaksymu lub Ceftriaksonu i.v."
        },
        {
          text: "Ostre zapalenie wyrostka robaczkowego wymagające natychmiastowej laparotomii zwiadowczej bez antybiotykoterapii",
          feedback: "❌ BŁĄD! Chociaż wyrostek należy różnicować, u dziecka z zespołem nerczycowym i wodobrzuszem pierwotne bakteryjne zapalenie otrzewnej (SBP) jest typowym powikłaniem. Niepotrzebna laparotomia u dziecka z hipoalbuminemią i ciężkimi zaburzeniami gojenia wiąże się z wysoką śmiertelnością."
        },
        {
          text: "Wrzód żołądka z perforacją wywołany 5-dniową sterydoterapią prednizonem",
          feedback: "❌ BŁĄD! Perforacja wrzodu po kilku dniach prednizonu jest skrajnie rzadka. Obraz odpowiada SBP."
        },
        {
          text: "Rzekomorzekome zapalenie jelit o etiologii Clostridioides difficile wywołane brakiem flory fizjologicznej",
          feedback: "❌ BŁĄD! C. difficile występuje po antybiotykoterapii o szerokim spektrum. Tutaj objawy to zapalenie otrzewnej w przebiegu SBP."
        }
      ]
    },
    {
      stepNum: 7,
      title: "Krok 7: Profilaktyka powikłań zatorowo-zakrzepowych oraz zasady szczepień ochronnych",
      desc: "Zakażenie SBP opanowano cefotaksymem. Mama pyta o dwa istotne aspekty: 1) dlaczego lekarz stale sprawdza tętno na stopach i obwód kończyn (ryzyko zakrzepicy), oraz 2) czy Jaś może za 2 tygodnie przyjąć planowe szczepienie przeciwko odrze, śwince i różyczce (MMR). Jak brzmi prawidłowe pouczenie lekarskie?",
      scenario: "Zakażenie SBP opanowano cefotaksymem. Mama pyta o dwa istotne aspekty: 1) dlaczego lekarz stale sprawdza tętno na stopach i obwód kończyn (ryzyko zakrzepicy), oraz 2) czy Jaś może za 2 tygodnie przyjąć planowe szczepienie przeciwko odrze, śwince i różyczce (MMR). Jak brzmi prawidłowe pouczenie lekarskie?",
      options: [
        {
          text: "W ZN występuje stan prozakrzepowy (utrata antytrombiny III, białka S, wzrost fibrynogenu); szczepionki żywe (MMR, ospa wietrzna) są BEZWZGLĘDNIE PRZECIWWSKAZANE w trakcie sterydoterapii i min. 1–3 miesiące po jej zakończeniu",
          feedback: "✅ PRAWIDŁOWO! Zespół nerczycowy to stan wysokiego ryzyka powikłań zakrzepowo-zatorowych (utrata antytrombiny III, białka C i S w moczu, wątrobowa nadprodukcja fibrynogenu, zagęszczenie krwi). Co do szczepień: podawanie szczepionek żywych (MMR, ospa wietrzna, BCG, rotawirusy) w trakcie immunosupresji sterydowej (prednizon >2 mg/kg/d lub >20 mg/d przez >14 dni) grozi uogólnionym, śmiertelnym zakażeniem wirusem szczepionkowym! Szczepionki inaktywowane (grypa, pneumokoki) są natomiast wysoce zalecane w remisji."
        },
        {
          text: "Szczepienie MMR należy wykonać bez opóźnień, gdyż chroni przed powikłaniami nerczycowymi, a profilaktycznie należy podać aspirynę",
          feedback: "❌ BŁĄD! Podanie szczepionki żywej dziecku w trakcie pełnodawkowej sterydoterapii jest kardynalnym błędem i bezpośrednim zagrożeniem życia!"
        },
        {
          text: "Ryzyko zakrzepicy w zespole nerczycowym u dzieci wynosi 0%, a szczepienia są przeciwwskazane do ukończenia 18. roku życia",
          feedback: "❌ BŁĄD! Ryzyko zakrzepicy u dzieci wynosi 2-5% (u dorosłych nawet 25%). Szczepienia żywe odracza się na czas leczenia immunosupresyjnego + 1-3 miesiące."
        },
        {
          text: "Należy wdrożyć profilaktycznie terapeutyczną dawkę heparyny drobnocząsteczkowej u każdego dziecka z ZN niezależnie od objawów",
          feedback: "❌ BŁĄD! Rutynowa pierwotna profilaktyka przeciwzakrzepowa heparyną NIE jest zalecana u każdego dziecka z ZN z uwagi na ryzyko krwawień. Stosuje się ją selektywnie (bardzo ciężka hipoalbuminemia <20 g/l z obecnością dodatkowych czynników ryzyka zakrzepicy, cewnik naczyniowy itp.)."
        }
      ]
    },
    {
      stepNum: 8,
      title: "Krok 8: Ocena odpowiedzi na leczenie, monitorowanie domowe i definicja sterydowrażliwości",
      desc: "W 14. dobie stosowania prednizonu obrzęki całkowicie ustąpiły, masa ciała wróciła do wyjściowej, a badanie testem paskowym moczu od 4 kolejnych dni wykazuje białko: 'ujemne' (UPCR 0.12 mg/mg). W surowicy albumina wzrosła do 36 g/l. Jak klasyfikujemy tę odpowiedź i jakie zalecenia domowe przekazujesz rodzicom przy wypisie?",
      scenario: "W 14. dobie stosowania prednizonu obrzęki całkowicie ustąpiły, masa ciała wróciła do wyjściowej, a badanie testem paskowym moczu od 4 kolejnych dni wykazuje białko: 'ujemne' (UPCR 0.12 mg/mg). W surowicy albumina wzrosła do 36 g/l. Jak klasyfikujemy tę odpowiedź i jakie zalecenia domowe przekazujesz rodzicom przy wypisie?",
      options: [
        {
          text: "Rozpoznajemy pełną remisję idiopatycznego zespołu nerczycowego sterydowrażliwego (SSNS); zalecamy kontynuację leczenia wg protokołu, codzienne ranne badanie moczu testem paskowym w domu i dzienniczek diurezy",
          feedback: "✅ PRAWIDŁOWO! Kryteria pełnej remisji wg KDIGO to: białko w moczu ujemne lub ślad w testach paskowych (lub białkomocz <4 mg/m²/h lub UPCR <0.2 mg/mg) przez 3 kolejne dni. Jaś jest pacjentem ze sterydowrażliwym zespołem nerczycowym (SSNS – Steroid-Sensitive Nephrotic Syndrome), co dotyczy ~90% dzieci z MCD. Rodzice muszą prowadzić domowy monitoring testami paskowymi z pierwszej porannej porcji moczu, aby natychmiast wykryć ewentualny nawrót (białko +++ przez 3 dni)."
        },
        {
          text: "Z powodu ustąpienia objawów należy natychmiast odstawić prednizon z dnia na dzień, aby uniknąć zespołu Cushinga",
          feedback: "❌ BŁĄD! Nagłe odstawienie glikokortykosteroidów po 2-4 tygodniach grozi zagrażającym życiu wtórnym przełomem nadnerczowym (ostrą niewydolnością kory nadnerczy wskutek supresji osi HPA) oraz natychmiastowym nawrotem białkomoczu!"
        },
        {
          text: "Dziecko uznajemy za wyleczone trwale; nie ma ryzyka nawrotów ani konieczności dalszych kontroli",
          feedback: "❌ BŁĄD! Aż 60-70% dzieci ze sterydowrażliwym zespołem nerczycowym doświadcza co najmniej jednego nawrotu (często sprowokowanego błahą infekcją kataralną)."
        },
        {
          text: "Wskazane jest wdrożenie diety bogatobiałkowej (>4 g/kg/d) w celu odbudowania zapasów białka w organizmie",
          feedback: "❌ BŁĄD! Dieta bogatobiałkowa nasila hiperfiltrację kłębuszkową i uszkodzenie podocytów. Zaleca się dietę normobiałkową z ograniczeniem sodu."
        }
      ]
    }
  ],
  pathoNodes: [
    {
      badge: "KROK 1: DYSREGULACJA IMMUNOLOGICZNA",
      title: "Zaburzenia limfocytów T i czynnik przepuszczalności",
      short: "Cytokiny uszkadzające podocyty",
      detail: "W MCD dochodzi do pierwotnej dysregulacji limfocytów T (Th2/Th17) oraz komórek Treg, które wydzielają krążące czynniki przepuszczalności kłębuszkowej (m.in. cytokiny, angiopoetynopodobne białko 4, heparanozę). Czynniki te wchodzą w bezpośrednią interakcję z komórkami nabłonka trzewnego torebki Bowmana (podocytami).",
      target: "Podocyty kłębuszka",
      desc: "Zaburzenie homeostazy immunologicznej wyzwalane m.in. przez infekcje wirusowe lub alergeny."
    },
    {
      badge: "KROK 2: USZKODZENIE BARIERY FILTRACYJNEJ",
      title: "Zanik wypustek stopowatych (effacement) i utrata ładunku",
      short: "Zniesienie ujemnego ładunku siarczanu heparanu",
      detail: "Dochodzi do fuzji i zaniku (effacement) wypustek stopowatych podocytów oraz redystrybucji białek szczeliny filtracyjnej (nefryny, podocyny). Równolegle zanika ujemny ładunek elektrostatyczny (glikokielich, siarczan heparanu), który w warunkach fizjologicznych odpycha ujemnie naładowaną albuminę. Powstaje tzw. selektywny białkomocz kłębuszkowy.",
      target: "Bariera filtracyjna kłębuszka",
      desc: "Utrata selektywności ładunkowej i wielkościowej prowadząca do masywnej ucieczki albuminy do moczu."
    },
    {
      badge: "KROK 3: HIPOALBUMINEMIA I TEORIA UNDERFILL / OVERFILL",
      title: "Przesunięcie płynów i ciastowate obrzęki",
      short: "Spadek ciśnienia onkotycznego (<25 g/l albuminy)",
      detail: "Masywna utrata albuminy (>50 mg/kg/d) przekracza zdolności syntetyczne wątroby, prowadząc do hipoalbuminemii (<25 g/l). Zgodnie z hipotezą 'underfill' spadek ciśnienia onkotycznego w łożysku naczyniowym powoduje ucieczkę płynu do przestrzeni pozanaczyniowej (obrzęki, wodobrzusze) i hipowolemię wewnątrznaczyniową. Jednocześnie proteazy w moczu aktywują nabłonkowy kanał sodowy ENaC w cewkach zbiorczych, nasilając retencję sodu ('overfill').",
      target: "Przestrzeń pozanaczyniowa i cewki",
      desc: "Powstawanie uogólnionych obrzęków z jednoczesnym zagrożeniem zapaścią naczyniową."
    },
    {
      badge: "KROK 4: KONSEKWENCJE METABOLICZNE I PROZAKRZEPOWE",
      title: "Hiperlipidemia i skaza zakrzepowa",
      short: "Synteza wątrobowa LDL i utrata antytrombiny III",
      detail: "W odpowiedzi na spadek ciśnienia onkotycznego wątroba nasila ogólną syntezę białek, w tym lipoprotein (ciężka hipercholesterolemia >400 mg/dl i hipertriglicerydemia). Z moczem uciekają kluczowe inhibitory krzepnięcia (antytrombina III, białko S) oraz immunoglobuliny (IgG, czynniki dopełniacza), co indukuje groźny stan prozakrzepowy oraz ciężki nabyty niedobór odporności na bakterie otoczkowe.",
      target: "Układ krzepnięcia i układ odpornościowy",
      desc: "Ryzyko powikłań zatorowych (np. zakrzepica żyły nerkowej, zatok mózgu) oraz posocznicy pneumokokowej i SBP."
    }
  ],
  diffTable: {
    title: "Diagnostyka różnicowa zespołów obrzękowych i chorób kłębuszków u dzieci",
    headers: ["Cecha kliniczna", "MCD (Zmiany minimalne)", "APSGN (Popaciorkowcowe KZN)", "FSGS (Ogniskowe szkliwienie)", "Obrzęk Quinckego"],
    rows: [
      ["Białkomocz", "Masywny, selektywny (>50 mg/kg/d)", "Umiarkowany (<1-2 g/d, nieselektywny)", "Nerczycowy, często nieselektywny", "Brak białkomoczu"],
      ["Osad moczu", "Czysty, wałeczki szkliste, lipiduria", "Aktywny: wałeczki erytrocytarne, erytrocyty dysmorficzne", "Krwinkomocz u 50% chorych", "Prawidłowy"],
      ["Ciśnienie tętnicze", "Prawidłowe lub obniżone (hipowolemia)", "Często znacznie podwyższone", "Często nadciśnienie tętnicze", "Prawidłowe lub wstrząs w anafilaksji"],
      ["Dopełniacz C3", "W normie", "Obniżony w ostrej fazie (<8 tyg.)", "W normie", "W normie (obniżony C4 w HAE)"],
      ["Biopsja nerki", "Mikroskop świetlny: norma; ME: zlanie podocytów", "Rozplem mezangium, 'humps' podnabłonkowe", "Segmentalne szkliwienie kłębuszków", "Nie dotyczy"],
      ["Odpowiedź na sterydy", "Bardzo dobra (>90% SSNS)", "Brak wskazań do sterydów", "Często sterydooporność (SRNS)", "Brak reakcji na sterydy w HAE; w alergii ustępuje po adrenalinie"],
      ["Główne powikłania", "Zakażenia (SBP pneumokokowe), zakrzepica", "Przełom nadciśnieniowy, obrzęk płuc", "Postępująca schyłkowa niewydolność nerek", "Asfiksja przez obrzęk krtani"]
    ]
  },
  dutySummary: {
    overview: "3-letni chłopiec z typowym idiopatycznym zespołem nerczycowym o zmianach minimalnych (MCD). Pełna triada: nerczycowy selektywny białkomocz (UPCR 8.4 mg/mg), głęboka hipoalbuminemia (16 g/l) i uogólnione obrzęki z wodobrzuszem. Leczenie I rzutu prednizonem doprowadziło do pełnej remisji w 14. dobie. Powikłanie w postaci pneumokokowego SBP skutecznie wyleczone celowaną antybiotykoterapią.",
    diagnostics: "Badanie ogólne moczu z oceną osadu i UPCR, białko całkowite, albumina, lipidogram, mocznik, kreatynina, elektrolity, układ krzepnięcia (fibrynogen, AT-III), dopełniacz C3 i C4 (wykluczenie nefrytycznego KZN). Biopsja nerki u dzieci 1-10 r.ż. z typowym MCD nie jest wstępnie wskazana.",
    drugsAndDoses: "1. <span class='dose-pill'>Prednizon p.o. 60 mg/m² pc./dobę</span> (maks. 60 mg/d) w pojedynczej porannej dawce codziennie przez 4-6 tygodni.<br>2. W ciężkich objawowych obrzękach z hipowolemią: <span class='dose-pill'>20% Albumina i.v. 0.5–1.0 g/kg mc.</span> w powolnym wlewie (2-4 h), a pod koniec: <span class='dose-pill'>Furosemid i.v. 1–2 mg/kg mc.</span>.<br>3. W razie bakteryjnego SBP: <span class='dose-pill'>Cefotaksym i.v. 100–150 mg/kg/d</span> w 3 dawkach podzielonych.<br>4. Suplementacja wapnia i witaminy D3 w trakcie przewlekłej sterydoterapii.",
    procedures: "Dwa obwodowe wkłucia naczyniowe, codzienne ważenie pacjenta na czczo, pomiary ciśnienia tętniczego co 6h, bilans płynów (diureza dobowa), pomiary obwodu brzucha.",
    monitoring: "Ranne badanie moczu testem paskowym pod kątem białkomoczu (rejestracja w dzienniczku domowym). Bezwzględny zakaz szczepień żywych (MMR, ospa wietrzna) podczas sterydoterapii i 1-3 mies. po niej. Edukacja rodziców w zakresie objawów nawrotu i powikłań infekcyjnych."
  },
  lekQuestions: [
    {
      tag: "KDIGO / Kwalifikacja do biopsji",
      q: "U którego z poniższych pacjentów pediatrycznych z zespołem nerczycowym wskazane jest wykonanie przezskórnej biopsji nerki PRZED rozpoczęciem leczenia glikokortykosteroidami?",
      opts: [
        "A. U 3-letniego chłopca z ciastowatymi obrzękami powiek, UPCR 7.5 mg/mg i prawidłowym ciśnieniem tętniczym",
        "B. U 4-letniej dziewczynki z hipoalbuminemią 18 g/l i cholesterolem całkowitym 450 mg/dl",
        "C. U 7-miesięcznego niemowlęcia z uogólnionymi obrzękami i białkomoczem nerczycowym",
        "D. U 5-letniego chłopca z obrzękami powiek po przebytej infekcji kataralnej",
        "E. U 8-letniej dziewczynki z zespołem nerczycowym i stężeniem kreatyniny w normie dla wieku"
      ],
      options: [
        "A. U 3-letniego chłopca z ciastowatymi obrzękami powiek, UPCR 7.5 mg/mg i prawidłowym ciśnieniem tętniczym",
        "B. U 4-letniej dziewczynki z hipoalbuminemią 18 g/l i cholesterolem całkowitym 450 mg/dl",
        "C. U 7-miesięcznego niemowlęcia z uogólnionymi obrzękami i białkomoczem nerczycowym",
        "D. U 5-letniego chłopca z obrzękami powiek po przebytej infekcji kataralnej",
        "E. U 8-letniej dziewczynki z zespołem nerczycowym i stężeniem kreatyniny w normie dla wieku"
      ],
      correctIdx: 2,
      correct: 2,
      exp: "Zgodnie z wytycznymi KDIGO i PTNFD, u dzieci między 1. a 10.–12. rokiem życia z typowym idiopatycznym zespołem nerczycowym nie wykonuje się wstępnej biopsji nerki, gdyż >85-90% odpowiada MCD. Wskazaniami do wstępnej biopsji są: 1) wiek zachorowania <1. roku życia (podejrzenie wrodzonego zespołu nerczycowego np. typu fińskiego) lub >12. r.ż., 2) makrokrwinkomocz / stały mikrokrwinkomocz z wałeczkami erytrocytarnymi, 3) utrwalone nadciśnienie tętnicze, 4) upośledzenie filtracji nerkowej (niewyjaśniony wzrost kreatyniny), 5) obniżone stężenie składowej C3 dopełniacza, 6) cechy choroby układowej (SLE, plamica Henocha-Schönleina).",
      expl: "Zgodnie z wytycznymi KDIGO i PTNFD, u dzieci między 1. a 10.–12. rokiem życia z typowym idiopatycznym zespołem nerczycowym nie wykonuje się wstępnej biopsji nerki, gdyż >85-90% odpowiada MCD. Wskazaniami do wstępnej biopsji są: 1) wiek zachorowania <1. roku życia (podejrzenie wrodzonego zespołu nerczycowego np. typu fińskiego) lub >12. r.ż., 2) makrokrwinkomocz / stały mikrokrwinkomocz z wałeczkami erytrocytarnymi, 3) utrwalone nadciśnienie tętnicze, 4) upośledzenie filtracji nerkowej (niewyjaśniony wzrost kreatyniny), 5) obniżone stężenie składowej C3 dopełniacza, 6) cechy choroby układowej (SLE, plamica Henocha-Schönleina)."
    },
    {
      tag: "Definicje / Kryteria laboratoryjne",
      q: "Który z poniższych parametrów laboratoryjnych stanowi kryterium białkomoczu o nasileniu nerczycowym u dzieci?",
      opts: [
        "A. Wydalanie białka z moczem >50 mg/kg mc./dobę lub wskaźnik UPCR >2.0 mg/mg",
        "B. Wydalanie białka z moczem >10 mg/kg mc./dobę lub wskaźnik UPCR >0.5 mg/mg",
        "C. Wydalanie białka z moczem >150 mg/dobę niezależnie od masy ciała",
        "D. Wskaźnik albumina/kreatynina (UACR) >30 mg/g",
        "E. Stężenie albuminy w surowicy krwi <35 g/l"
      ],
      options: [
        "A. Wydalanie białka z moczem >50 mg/kg mc./dobę lub wskaźnik UPCR >2.0 mg/mg",
        "B. Wydalanie białka z moczem >10 mg/kg mc./dobę lub wskaźnik UPCR >0.5 mg/mg",
        "C. Wydalanie białka z moczem >150 mg/dobę niezależnie od masy ciała",
        "D. Wskaźnik albumina/kreatynina (UACR) >30 mg/g",
        "E. Stężenie albuminy w surowicy krwi <35 g/l"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Białkomocz nerczycowy u dzieci definiuje się jako: utratę białka z moczem >50 mg/kg mc./dobę (lub >40 mg/m² pc./godzinę) w dobowej zbiórce moczu LUB wskaźnik białko/kreatynina w pojedynczej porannej próbce moczu (UPCR) >2.0 mg/mg (lub >200 mg/mmol). Norma UPCR u dzieci powyżej 2 r.ż. wynosi <0.2 mg/mg.",
      expl: "Białkomocz nerczycowy u dzieci definiuje się jako: utratę białka z moczem >50 mg/kg mc./dobę (lub >40 mg/m² pc./godzinę) w dobowej zbiórce moczu LUB wskaźnik białko/kreatynina w pojedynczej porannej próbce moczu (UPCR) >2.0 mg/mg (lub >200 mg/mmol). Norma UPCR u dzieci powyżej 2 r.ż. wynosi <0.2 mg/mg."
    },
    {
      tag: "Farmakoterapia I rzutu",
      q: "Standardowy schemat leczenia pierwszego rzutu pierwszego epizodu idiopatycznego zespołu nerczycowego u dziecka wg KDIGO obejmuje podawanie:",
      opts: [
        "A. Prednizonu doustnie w dawce 60 mg/m² pc./dobę (maks. 60 mg/d) codziennie przez 4-6 tygodni, a następnie 40 mg/m² pc. co drugi dzień",
        "B. Metyloprednizolonu dożylnie w pulsach 1 g przez 3 dni, następnie doustnej cyklosporyny A",
        "C. Deksametazonu doustnie w dawce 10 mg/m² pc. przez 10 dni, następnie szybkiego odstawienia",
        "D. Prednizonu doustnie w dawce 10 mg/kg mc./dobę przez 12 tygodni bez redukcji dawki",
        "E. Cyklofosfamidu doustnie w dawce 2 mg/kg mc./dobę w skojarzeniu z pulsami soli złota"
      ],
      options: [
        "A. Prednizonu doustnie w dawce 60 mg/m² pc./dobę (maks. 60 mg/d) codziennie przez 4-6 tygodni, a następnie 40 mg/m² pc. co drugi dzień",
        "B. Metyloprednizolonu dożylnie w pulsach 1 g przez 3 dni, następnie doustnej cyklosporyny A",
        "C. Deksametazonu doustnie w dawce 10 mg/m² pc. przez 10 dni, następnie szybkiego odstawienia",
        "D. Prednizonu doustnie w dawce 10 mg/kg mc./dobę przez 12 tygodni bez redukcji dawki",
        "E. Cyklofosfamidu doustnie w dawce 2 mg/kg mc./dobę w skojarzeniu z pulsami soli złota"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Zgodnie z wytycznymi KDIGO i PTNFD leczenie pierwszego rzutu polega na podawaniu prednizonu w dawce 60 mg/m² pc./dobę lub 2 mg/kg mc./dobę (maks. 60 mg/dobę) w dawce pojedynczej rano codziennie przez 4 do 6 tygodni, po czym następuje faza alternująca: 40 mg/m² pc. (lub 1.5 mg/kg mc.) co drugi dzień przez kolejne 4-6 tygodni z następczą stopniową redukcją dawki.",
      expl: "Zgodnie z wytycznymi KDIGO i PTNFD leczenie pierwszego rzutu polega na podawaniu prednizonu w dawce 60 mg/m² pc./dobę lub 2 mg/kg mc./dobę (maks. 60 mg/dobę) w dawce pojedynczej rano codziennie przez 4 do 6 tygodni, po czym następuje faza alternująca: 40 mg/m² pc. (lub 1.5 mg/kg mc.) co drugi dzień przez kolejne 4-6 tygodni z następczą stopniową redukcją dawki."
    },
    {
      tag: "Patofizjologia powikłań / Stan prozakrzepowy",
      q: "Który z poniższych czynników NIE odpowiada za zwiększone ryzyko powikłań zakrzepowo-zatorowych w zespole nerczycowym?",
      opts: [
        "A. Utrata antytrombiny III (AT-III) z moczem",
        "B. Wzmożona wątrobowa synteza fibrynogenu",
        "C. Zwiększona agregacja płytek krwi i wzrost stężenia czynnika von Willebranda",
        "D. Hemokoncentracja (zagęszczenie krwi) w wyniku hipowolemii efektywnej",
        "E. Utrata czynnika VIII i czynnika von Willebranda z moczem prowadząca do hemofilii nabytej"
      ],
      options: [
        "A. Utrata antytrombiny III (AT-III) z moczem",
        "B. Wzmożona wątrobowa synteza fibrynogenu",
        "C. Zwiększona agregacja płytek krwi i wzrost stężenia czynnika von Willebranda",
        "D. Hemokoncentracja (zagęszczenie krwi) w wyniku hipowolemii efektywnej",
        "E. Utrata czynnika VIII i czynnika von Willebranda z moczem prowadząca do hemofilii nabytej"
      ],
      correctIdx: 4,
      correct: 4,
      exp: "Zdanie E jest FAŁSZYWE (i stanowi poprawną odpowiedź na to pytanie). W zespole nerczycowym stężenie czynnika VIII i vWF jest PODWYŻSZONE (są to cząsteczki o dużej masie cząsteczkowej, nie uciekają z moczem, a ich synteza jest nasilona). Z moczem tracone są cząsteczki mniejsze: antytrombina III, plazminogen, białko S, co w połączeniu z hemokoncentracją i wzrostem fibrynogenu powoduje ciężki stan PROZAKRZEPOWY, a nie skazę krwotoczną.",
      expl: "Zdanie E jest FAŁSZYWE (i stanowi poprawną odpowiedź na to pytanie). W zespole nerczycowym stężenie czynnika VIII i vWF jest PODWYŻSZONE (są to cząsteczki o dużej masie cząsteczkowej, nie uciekają z moczem, a ich synteza jest nasilona). Z moczem tracone są cząsteczki mniejsze: antytrombina III, plazminogen, białko S, co w połączeniu z hemokoncentracją i wzrostem fibrynogenu powoduje ciężki stan PROZAKRZEPOWY, a nie skazę krwotoczną."
    },
    {
      tag: "Leczenie objawowe obrzęków",
      q: "U 4-letniego dziecka z zespołem nerczycowym i masywnymi obrzękami powłok brzusznych ciśnienie tętnicze wynosi 85/50 mmHg, a obwodowe tętno jest słabo wyczuwalne. Prawidłowym postępowaniem w celu odbarczenia obrzęków jest:",
      opts: [
        "A. Podanie samego furosemidu i.v. w dawce 3 mg/kg mc. w szybkim bolusie",
        "B. Podanie wlewu 20% albuminy 0.5–1.0 g/kg mc. (2.5–5 ml/kg mc.) w ciągu 2-4 godzin, a pod koniec wlewu furosemidu i.v. 1-2 mg/kg mc.",
        "C. Płynoterapia krystaloidowa 0.9% NaCl w objętości 40 ml/kg mc. w ciągu 30 minut",
        "D. Wykonanie upustu krwi w celu zmniejszenia obciążenia wstępnego serca",
        "E. Podanie spironolaktonu w dawce 10 mg/kg mc. doustnie bez podawania albuminy"
      ],
      options: [
        "A. Podanie samego furosemidu i.v. w dawce 3 mg/kg mc. w szybkim bolusie",
        "B. Podanie wlewu 20% albuminy 0.5–1.0 g/kg mc. (2.5–5 ml/kg mc.) w ciągu 2-4 godzin, a pod koniec wlewu furosemidu i.v. 1-2 mg/kg mc.",
        "C. Płynoterapia krystaloidowa 0.9% NaCl w objętości 40 ml/kg mc. w ciągu 30 minut",
        "D. Wykonanie upustu krwi w celu zmniejszenia obciążenia wstępnego serca",
        "E. Podanie spironolaktonu w dawce 10 mg/kg mc. doustnie bez podawania albuminy"
      ],
      correctIdx: 1,
      correct: 1,
      exp: "W objawowych obrzękach przebiegających z cechami hipowolemii wewnątrznaczyniowej podanie samego diuretyku pętlowego (furosemidu) grozi zapaścią naczyniową, wstrząsem hipowolemicznym i zakrzepicą. Prawidłowym protokołem jest podanie stężonej 20% albuminy (0.5-1.0 g/kg mc.), która zwiększa ciśnienie onkotyczne i przemieszcza płyn z tkanek do łożyska naczyniowego, a podany pod koniec wlewu furosemid (1-2 mg/kg mc.) umożliwia jego skuteczne wydalenie przez nerki.",
      expl: "W objawowych obrzękach przebiegających z cechami hipowolemii wewnątrznaczyniowej podanie samego diuretyku pętlowego (furosemidu) grozi zapaścią naczyniową, wstrząsem hipowolemicznym i zakrzepicą. Prawidłowym protokołem jest podanie stężonej 20% albuminy (0.5-1.0 g/kg mc.), która zwiększa ciśnienie onkotyczne i przemieszcza płyn z tkanek do łożyska naczyniowego, a podany pod koniec wlewu furosemid (1-2 mg/kg mc.) umożliwia jego skuteczne wydalenie przez nerki."
    },
    {
      tag: "Infekcje w zespole nerczycowym",
      q: "Najczęstszym czynnikiem etiologicznym samoistnego bakteryjnego zapalenia otrzewnej (SBP) u dzieci z zespołem nerczycowym jest:",
      opts: [
        "A. Streptococcus pneumoniae",
        "B. Staphylococcus aureus",
        "C. Pseudomonas aeruginosa",
        "D. Bacteroides fragilis",
        "E. Candida albicans"
      ],
      options: [
        "A. Streptococcus pneumoniae",
        "B. Staphylococcus aureus",
        "C. Pseudomonas aeruginosa",
        "D. Bacteroides fragilis",
        "E. Candida albicans"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Najczęstszą przyczyną SBP u dzieci z zespołem nerczycowym jest Streptococcus pneumoniae (pneumokoki), rzadziej pałeczki Gram-ujemne (E. coli). Podłożem tej podatności jest utrata z moczem immunoglobulin klasy IgG oraz składników drogi alternatywnej dopełniacza (zwłaszcza czynnika B), co upośledza opsonizację bakterii otoczkowych.",
      expl: "Najczęstszą przyczyną SBP u dzieci z zespołem nerczycowym jest Streptococcus pneumoniae (pneumokoki), rzadziej pałeczki Gram-ujemne (E. coli). Podłożem tej podatności jest utrata z moczem immunoglobulin klasy IgG oraz składników drogi alternatywnej dopełniacza (zwłaszcza czynnika B), co upośledza opsonizację bakterii otoczkowych."
    },
    {
      tag: "Szczepienia ochronne / Zasady bezpieczeństwa",
      q: "Które ze stwierdzeń dotyczących szczepień ochronnych u dziecka z zespołem nerczycowym leczonego prednizonem w dawce 2 mg/kg mc./dobę jest PRAWDZIWE?",
      opts: [
        "A. Szczepienia żywymi szczepionkami (np. MMR, ospa wietrzna) są bezwzględnie przeciwwskazane w trakcie leczenia immunosupresyjnego oraz przez co najmniej 1-3 miesiące po jego zakończeniu",
        "B. Należy natychmiast podać szczepionkę przeciwko ospie wietrznej w celu ochrony przed zakażeniem w trakcie sterydoterapii",
        "C. Szczepionki inaktywowane (np. przeciwko grypie) są bezwzględnie zakazane przez całe życie dziecka",
        "D. Dziecko nie powinno otrzymywać żadnych szczepionek do momentu ukończenia 18. roku życia",
        "E. Dziecko w trakcie sterydoterapii może bezpiecznie przyjąć żywą atenuowaną szczepionkę przeciwko polio (OPV)"
      ],
      options: [
        "A. Szczepienia żywymi szczepionkami (np. MMR, ospa wietrzna) są bezwzględnie przeciwwskazane w trakcie leczenia immunosupresyjnego oraz przez co najmniej 1-3 miesiące po jego zakończeniu",
        "B. Należy natychmiast podać szczepionkę przeciwko ospie wietrznej w celu ochrony przed zakażeniem w trakcie sterydoterapii",
        "C. Szczepionki inaktywowane (np. przeciwko grypie) są bezwzględnie zakazane przez całe życie dziecka",
        "D. Dziecko nie powinno otrzymywać żadnych szczepionek do momentu ukończenia 18. roku życia",
        "E. Dziecko w trakcie sterydoterapii może bezpiecznie przyjąć żywą atenuowaną szczepionkę przeciwko polio (OPV)"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Szczepionki żywe (atenuowane: MMR, ospa wietrzna, BCG, rotawirusy) są bezwzględnie przeciwwskazane w trakcie leczenia immunosupresyjnego (prednizon >=2 mg/kg mc./d lub >=20 mg/d przez >14 dni) oraz przez minimum 1 do 3 miesięcy po zakończeniu sterydoterapii z powodu ryzyka uogólnionego poszczepiennego zakażenia wirusowego. Szczepionki inaktywowane (zabite: grypa, pneumokoki) są bezpieczne i wysoce zalecane w okresie remisji.",
      expl: "Szczepionki żywe (atenuowane: MMR, ospa wietrzna, BCG, rotawirusy) są bezwzględnie przeciwwskazane w trakcie leczenia immunosupresyjnego (prednizon >=2 mg/kg mc./d lub >=20 mg/d przez >14 dni) oraz przez minimum 1 do 3 miesięcy po zakończeniu sterydoterapii z powodu ryzyka uogólnionego poszczepiennego zakażenia wirusowego. Szczepionki inaktywowane (zabite: grypa, pneumokoki) są bezpieczne i wysoce zalecane w okresie remisji."
    },
    {
      tag: "Terminologia kliniczna / Sterydooporność",
      q: "Definicja sterydoopornego zespołu nerczycowego (SRNS – Steroid-Resistant Nephrotic Syndrome) u dzieci oznacza:",
      opts: [
        "A. Brak remisji (utrzymywanie się białkomoczu nerczycowego) pomimo leczenia prednizonem w dawce 60 mg/m² pc./d (lub 2 mg/kg mc./d) przez 4 do 6 tygodni",
        "B. Wystąpienie nawrotu białkomoczu w trakcie redukcji dawki sterydów",
        "C. Wystąpienie co najmniej 4 nawrotów w ciągu 12 miesięcy",
        "D. Wystąpienie cech zespołu Cushinga w 2. tygodniu leczenia",
        "E. Konieczność włączenia diuretyków pętlowych z powodu braku diurezy w 1. dobie"
      ],
      options: [
        "A. Brak remisji (utrzymywanie się białkomoczu nerczycowego) pomimo leczenia prednizonem w dawce 60 mg/m² pc./d (lub 2 mg/kg mc./d) przez 4 do 6 tygodni",
        "B. Wystąpienie nawrotu białkomoczu w trakcie redukcji dawki sterydów",
        "C. Wystąpienie co najmniej 4 nawrotów w ciągu 12 miesięcy",
        "D. Wystąpienie cech zespołu Cushinga w 2. tygodniu leczenia",
        "E. Konieczność włączenia diuretyków pętlowych z powodu braku diurezy w 1. dobie"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Sterydooporność (SRNS) definiuje się jako brak uzyskania remisji (utrzymywanie się białkomoczu nerczycowego) po 4-6 tygodniach codziennego leczenia pełną dawką prednizonu (60 mg/m² pc./d lub 2 mg/kg mc./d). Jest to bezwzględne wskazanie do wykonania biopsji nerki (często rozpoznaje się wówczas ogniskowe segmentalne stwardnienie kłębuszków – FSGS) oraz wdrożenia leków II rzutu (inhibitory kalcyneuryny). Opcja B definiuje sterydozależność, a opcja C – zespół często nawracający.",
      expl: "Sterydooporność (SRNS) definiuje się jako brak uzyskania remisji (utrzymywanie się białkomoczu nerczycowego) po 4-6 tygodniach codziennego leczenia pełną dawką prednizonu (60 mg/m² pc./d lub 2 mg/kg mc./d). Jest to bezwzględne wskazanie do wykonania biopsji nerki (często rozpoznaje się wówczas ogniskowe segmentalne stwardnienie kłębuszków – FSGS) oraz wdrożenia leków II rzutu (inhibitory kalcyneuryny). Opcja B definiuje sterydozależność, a opcja C – zespół często nawracający."
    },
    {
      tag: "Leczenie drugiego rzutu",
      q: "Wskaż zestawienie leków stosowanych jako leczenie drugiego rzutu w zespole nerczycowym sterydozależnym lub często nawracającym:\n1. Cyklosporyna A\n2. Takrolimus\n3. Mykofenolan mofetylu (MMF)\n4. Rytuksymab\n5. Penicylina benzylowa",
      opts: [
        "A. 1, 2, 3, 4",
        "B. 1, 2, 5",
        "C. 2, 3, 4, 5",
        "D. Tylko 1 i 2",
        "E. Wszystkie wymienione"
      ],
      options: [
        "A. 1, 2, 3, 4",
        "B. 1, 2, 5",
        "C. 2, 3, 4, 5",
        "D. Tylko 1 i 2",
        "E. Wszystkie wymienione"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Lekami oszczędzającymi sterydy (sterydosparing) drugiego rzutu w zespole nerczycowym sterydozależnym (SDNS) lub często nawracającym (FRNS) są: inhibitory kalcyneuryny (cyklosporyna A, takrolimus), mykofenolan mofetylu (MMF), cyklofosfamidu oraz przeciwciało anty-CD20 (rytuksymab). Penicylina benzylowa (5) jest antybiotykiem i nie ma działania immunosupresyjnego.",
      expl: "Lekami oszczędzającymi sterydy (sterydosparing) drugiego rzutu w zespole nerczycowym sterydozależnym (SDNS) lub często nawracającym (FRNS) są: inhibitory kalcyneuryny (cyklosporyna A, takrolimus), mykofenolan mofetylu (MMF), cyklofosfamidu oraz przeciwciało anty-CD20 (rytuksymab). Penicylina benzylowa (5) jest antybiotykiem i nie ma działania immunosupresyjnego."
    },
    {
      tag: "Genetyka / Zespół nerczycowy wrodzony",
      q: "Wrodzony zespół nerczycowy typu fińskiego dziedziczy się w sposób autosomalny recesywny i jest spowodowany mutacją w genie NPHS1 kodującym:",
      opts: [
        "A. Nefrynę",
        "B. Podocynę",
        "C. Kolagen typu IV",
        "D. Dystrofinę",
        "E. Aktyninę 4"
      ],
      options: [
        "A. Nefrynę",
        "B. Podocynę",
        "C. Kolagen typu IV",
        "D. Dystrofinę",
        "E. Aktyninę 4"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Wrodzony zespół nerczycowy typu fińskiego (ujawniający się w pierwszych 3 miesiącach życia z olbrzymim łożyskiem) jest wywołany mutacją genu NPHS1 kodującego NEFRYNĘ – kluczowe białko transbłonowe tworzące szczelinę filtracyjną podocytów. Mutacja genu NPHS2 koduje natomiast podocynę (częsta przyczyna rodzinnego FSGS). Mutacje kolagenu typu IV odpowiadają za zespół Alporta.",
      expl: "Wrodzony zespół nerczycowy typu fińskiego (ujawniający się w pierwszych 3 miesiącach życia z olbrzymim łożyskiem) jest wywołany mutacją genu NPHS1 kodującego NEFRYNĘ – kluczowe białko transbłonowe tworzące szczelinę filtracyjną podocytów. Mutacja genu NPHS2 koduje natomiast podocynę (częsta przyczyna rodzinnego FSGS). Mutacje kolagenu typu IV odpowiadają za zespół Alporta."
    },
    {
      tag: "Monitorowanie domowe i rokowanie",
      q: "Jakie zalecenie dotyczące monitorowania domowego powinien otrzymać rodzic dziecka ze sterydowrażliwym zespołem nerczycowym w fazie remisji?",
      opts: [
        "A. Codzienne rano badanie moczu testem paskowym na obecność białka i odnotowywanie wyników w dzienniczku; kontakt z ośrodkiem przy białkomoczu +++ przez 3 kolejne dni",
        "B. Wykonywanie dobowej zbiórki moczu raz w tygodniu przez cały okres dzieciństwa",
        "C. Codzienne podawanie furosemidu profilaktycznie przez 12 miesięcy",
        "D. Ograniczenie płynów do maksymalnie 200 ml na dobę w warunkach domowych",
        "E. Comiesięczne wykonywanie USG nerek w celu oceny grubości kory"
      ],
      options: [
        "A. Codzienne rano badanie moczu testem paskowym na obecność białka i odnotowywanie wyników w dzienniczku; kontakt z ośrodkiem przy białkomoczu +++ przez 3 kolejne dni",
        "B. Wykonywanie dobowej zbiórki moczu raz w tygodniu przez cały okres dzieciństwa",
        "C. Codzienne podawanie furosemidu profilaktycznie przez 12 miesięcy",
        "D. Ograniczenie płynów do maksymalnie 200 ml na dobę w warunkach domowych",
        "E. Comiesięczne wykonywanie USG nerek w celu oceny grubości kory"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Złotym standardem monitorowania domowego jest codzienne ranne badanie pierwszej porcji moczu testem paskowym pod kątem białkomoczu (szczególnie w trakcie infekcji kataralnych, które często indukują nawrót). Nawrót definiuje się jako obecność białka >= ++ (lub >40 mg/m²/h) przez 3 kolejne dni, co wymaga pilnego kontaktu z nefrologiem i wznowienia pełnodawkowej sterydoterapii.",
      expl: "Złotym standardem monitorowania domowego jest codzienne ranne badanie pierwszej porcji moczu testem paskowym pod kątem białkomoczu (szczególnie w trakcie infekcji kataralnych, które często indukują nawrót). Nawrót definiuje się jako obecność białka >= ++ (lub >40 mg/m²/h) przez 3 kolejne dni, co wymaga pilnego kontaktu z nefrologiem i wznowienia pełnodawkowej sterydoterapii."
    }
  ],
  flashcards: [
    {
      q: "Jakie są 4 podstawowe kryteria rozpoznania zespołu nerczycowego?",
      a: "1. Białkomocz nerczycowy (>50 mg/kg/d lub UPCR >2.0 mg/mg)\n2. Hipoalbuminemia (<25 g/l)\n3. Uogólnione obrzęki (powieki, moszna, podudzia, wodobrzusze)\n4. Hiperlipidemia (cholesterol >200 mg/dl)."
    },
    {
      q: "Dlaczego u 3-letniego dziecka z typowym zespołem nerczycowym NIE wykonuje się wstępnej biopsji nerki?",
      a: "Ponieważ w grupie wiekowej 1–10 r.ż. w >85–90% przyczyną jest choroba zmian minimalnych (MCD), która wykazuje znakomitą odpowiedź na sterydoterapię empiryczną. Biopsję wykonuje się tylko przy nietypowych cechach (nadciśnienie, krwiomocz, wiek <1 r.ż.) lub sterydooporności."
    },
    {
      q: "Jaka jest kardynalna zasada odbarczania ciężkich obrzęków z hipowolemią w zespole nerczycowym?",
      a: "NIGDY nie podaje się samego furosemidu (grozi wstrząsem hipowolemicznym i zakrzepicą!). Podaje się wlew 20% albuminy (0.5–1.0 g/kg), a furosemid (1–2 mg/kg) wstrzykuje się pod koniec wlewu, gdy łożysko naczyniowe jest wypełnione."
    },
    {
      q: "Jaki jest najczęstszy patogen wywołujący samoistne zapalenie otrzewnej (SBP) w zespole nerczycowym i dlaczego?",
      a: "Streptococcus pneumoniae (pneumokoki) – z powodu masywnej utraty w moczu immunoglobulin IgG oraz składowych układu dopełniacza (upośledzenie opsonizacji bakterii otoczkowych)."
    },
    {
      q: "Jakie są bezwzględne zasady dotyczące szczepień żywych u dzieci leczonych sterydami w zespole nerczycowym?",
      a: "Szczepionki żywe (MMR, ospa wietrzna) są BEZWZGLĘDNIE PRZECIWWSKAZANE w trakcie sterydoterapii i przez 1–3 miesiące po jej zakończeniu z powodu ryzyka uogólnionej infekcji szczepionkowej."
    },
    {
      q: "Jaka jest definicja sterydowrażliwości (SSNS) w zespole nerczycowym?",
      a: "Uzyskanie pełnej remisji (białko w moczu ujemne lub śladowe przez 3 kolejne dni lub UPCR <0.2 mg/mg) w ciągu 4–6 tygodni leczenia prednizonem w pełnej dawce (60 mg/m²/d lub 2 mg/kg/d)."
    }
  ]
};

// ==========================================
// CASE 106: STEC-HUS u 2.5-letniej dziewczynki
// ==========================================
const case106Data = {
  id: 106,
  filename: "106_stec_hus.json",
  dept: "Pediatria",
  shortTitle: "2,5-letnia Martynka – Krwawa biegunka po grillu, nagła bladość, bezmocz i wybroczyny (STEC-HUS)",
  diagnosisTitle: "Zespół hemolityczno-mocznicowy związany z toksyną Shiga (STEC-HUS / D+ HUS)",
  vitals: [
    { label: "Akcja serca (HR)", val: "145/min", sub: "Tachykardia kompensacyjna (anemia)", status: "warn" },
    { label: "Ciśnienie tętnicze", val: "128/82 mmHg", sub: "Nadciśnienie tętnicze dla wieku (AKI)", status: "warn" },
    { label: "Saturacja SpO2", val: "97%", sub: "Prawidłowa", status: "ok" },
    { label: "Częstość oddechów", val: "30/min", sub: "Oddech kwasiczy Kussmaula", status: "warn" },
    { label: "Temperatura ciała", val: "37.4°C", sub: "Stan podgorączkowy", status: "ok" }
  ],
  vitalsObj: { hr: 145, bp: "128/82", spo2: 97, rr: 30, temp: 37.4, gcs: 13 },
  story: "2.5-letnia Martynka została przekazana z oddziału pediatrii szpitala rejonowego do Kliniki Nefrologii Dziecięcej w stanie ciężkim. 4 dni wcześniej u dziewczynki wystąpiły kurczowe bóle brzucha oraz obfita, wodnista biegunka, która po dobie stała się krwista (stolec podbarwiony świeżą krwią z pasmami śluzu). W wywiadzie epidemiologicznym: 3 dni przed początkiem objawów dziewczynka jadła na rodzinnym pikniku niedopieczonego burgera z wołowiny. W szpitalu rejonowym z powodu krwawej biegunki włączono Trimetoprim/Sulfametoksazol (Biseptol). Od doby krwawienie z przewodu pokarmowego ustąpiło, jednak stan dziecka dramatycznie się pogorszył: Martynka stała się blado-woskowa z żółtawym odcieniem powłok, podsypiająca, a od 14 godzin nie oddała ani kropli moczu pomimo wlewów krystaloidów (anuria). Na tułowiu i kończynach pojawiły się drobne wybroczyny skórne.",
  labs: {
    "Morfologia i rozmaz krwi": [
      { name: "Hemoglobina (Hb)", val: "6.2 g/dl", norm: "11.5 - 13.5 g/dl", flag: "CRIT_LOW" },
      { name: "Hematokryt (Hct)", val: "18.5%", norm: "34 - 40%", flag: "CRIT_LOW" },
      { name: "Erytrocyty (RBC)", val: "2.1 mln/µl", norm: "3.9 - 5.0 mln/µl", flag: "CRIT_LOW" },
      { name: "Płytki krwi (PLT)", val: "24 G/L", norm: "150 - 450 G/L", flag: "CRIT_LOW" },
      { name: "Leukocyty (WBC)", val: "18.4 G/L", norm: "6.0 - 14.0 G/L", flag: "H" },
      { name: "Schizocyty (rozmaz)", val: "4.8% (liczne fragmenty erytrocytów)", norm: "<0.2%", flag: "CRIT_HIGH" },
      { name: "Retikulocyty", val: "8.5%", norm: "0.5 - 2.0%", flag: "CRIT_HIGH" }
    ],
    "Wskaźniki hemolizy i hemostazy": [
      { name: "Bilirubina całkowita", val: "4.2 mg/dl", norm: "0.2 - 1.0 mg/dl", flag: "CRIT_HIGH" },
      { name: "Bilirubina pośrednia (wolna)", val: "3.6 mg/dl", norm: "0.1 - 0.7 mg/dl", flag: "CRIT_HIGH" },
      { name: "LDH (dehydrogenaza)", val: "2150 U/l", norm: "120 - 300 U/l", flag: "CRIT_HIGH" },
      { name: "Haptoglobina", val: "<0.05 g/l (nieoznaczalna)", norm: "0.3 - 2.0 g/l", flag: "CRIT_LOW" },
      { name: "Bezpośredni test Coombsa (BTA)", val: "UJEMNY", norm: "Ujemny", flag: "NORMAL" },
      { name: "Czas protrombinowy (INR)", val: "1.05", norm: "0.9 - 1.2", flag: "NORMAL" },
      { name: "APTT", val: "31 s", norm: "28 - 40 s", flag: "NORMAL" },
      { name: "Fibrynogen", val: "3.8 g/l", norm: "2.0 - 4.0 g/l", flag: "NORMAL" },
      { name: "D-dimery", val: "2.8 µg/ml", norm: "<0.5 µg/ml", flag: "H" }
    ],
    "Biochemia i gazometria": [
      { name: "Kreatynina w surowicy", val: "3.8 mg/dl", norm: "0.2 - 0.4 mg/dl", flag: "CRIT_HIGH" },
      { name: "Mocznik", val: "162 mg/dl", norm: "15 - 36 mg/dl", flag: "CRIT_HIGH" },
      { name: "Potas (K+)", val: "5.9 mmol/l", norm: "3.5 - 5.0 mmol/l", flag: "CRIT_HIGH" },
      { name: "Sód (Na+)", val: "131 mmol/l", norm: "135 - 145 mmol/l", flag: "L" },
      { name: "pH krwi (gazometria)", val: "7.24", norm: "7.35 - 7.45", flag: "CRIT_LOW" },
      { name: "HCO3- (wodorowęglany)", val: "13.2 mmol/l", norm: "21 - 26 mmol/l", flag: "CRIT_LOW" },
      { name: "Nadmiar zasad (BE)", val: "-11.8 mmol/l", norm: "-2.5 do +2.5", flag: "CRIT_LOW" },
      { name: "Aktywność ADAMTS13", val: "68%", norm: ">67% (TTP <10%)", flag: "NORMAL" },
      { name: "Toksyna Shiga PCR w stolcu", val: "DODATNI (geny stx1 i stx2)", norm: "Ujemny", flag: "CRIT_HIGH" }
    ]
  },
  steps: [
    {
      stepNum: 1,
      title: "Krok 1: Wstępna ocena kliniczna triady objawów po przebytej krwawej biegunce",
      desc: "Do oddziału trafia 2.5-letnia dziewczynka w stanie ciężkim: woskowo blada, z żółtawym odcieniem powłok, podsypiająca, z wybroczynami na skórze. Od 14 godzin bezmocz (anuria), tętno 145/min, RR 128/82 mmHg (nadciśnienie!). W wywiadzie: krwawa biegunka po spożyciu niedopieczonego burgera, leczona Biseptolem. Jaka klasyczna triada objawów nasuwa natychmiastowe rozpoznanie?",
      scenario: "Do oddziału trafia 2.5-letnia dziewczynka w stanie ciężkim: woskowo blada, z żółtawym odcieniem powłok, podsypiająca, z wybroczynami na skórze. Od 14 godzin bezmocz (anuria), tętno 145/min, RR 128/82 mmHg (nadciśnienie!). W wywiadzie: krwawa biegunka po spożyciu niedopieczonego burgera, leczona Biseptolem. Jaka klasyczna triada objawów nasuwa natychmiastowe rozpoznanie?",
      options: [
        {
          text: "Triada HUS: mikroangiopatyczna niedokrwistość hemolityczna (MAHA) + małopłytkowość z zużycia + ostre uszkodzenie nerek (AKI) z bezmoczem",
          feedback: "✅ PRAWIDŁOWO! Obraz kliniczny stanowi podręcznikową triadę zespołu hemolityczno-mocznicowego (HUS): 1) niedokrwistość hemolityczna mikroangiopatyczna (bladość powłok, zażółcenie, tachykardia), 2) małopłytkowość (wybroczyny skórne), 3) ostre uszkodzenie nerek (bezmocz, nadciśnienie tętnicze, mocznica). Wywiad krwawej biegunki (tzw. postać D+ / biegunkowa) po spożyciu wołowiny jednoznacznie wskazuje na STEC-HUS (toksyna Shiga E. coli O157:H7)."
        },
        {
          text: "Wstrząs septyczny w przebiegu meningokokcemii z zespołem Waterhouse'a-Friderichsena",
          feedback: "❌ BŁĄD! Choć są wybroczyny, dziecko ma wysokie ciśnienie tętnicze (128/82), nie ma wstrząsu dystrybucyjnego ani cech ostrej niewydolności kory nadnerczy, a wywiad krwawej biegunki wskazuje na HUS."
        },
        {
          text: "Ostra białaczka limfoblastyczna (ALL) z nacieczeniem nerek i skazą krwotoczną",
          feedback: "❌ BŁĄD! Ostra krwawa biegunka po spożyciu burgera, nagły bezmocz i gwałtowna hemoliza nie pasują do białaczki. To ostry stan mikroangiopatii zakrzepowej."
        },
        {
          text: "Idiopatyczna plamica małopłytkowa (ITP) powikłana krwawieniem z przewodu pokarmowego",
          feedback: "❌ BŁĄD! W ITP występuje izolowana małopłytkowość przy prawidłowej linii czerwonokrwinkowej i całkowicie prawidłowej funkcji nerek (brak AKI)."
        }
      ]
    },
    {
      stepNum: 2,
      title: "Krok 2: Badanie rozmazu krwi obwodowej i testu Coombsa – potwierdzenie MAHA",
      desc: "Z laboratorium otrzymujesz wyniki: Hb 6.2 g/dl, PLT 24 G/L, bilirubina wolna 3.6 mg/dl, LDH 2150 U/l, haptoglobina <0.05 g/l. Jakie dwa kluczowe badania immunohematologiczne natychmiast różnicują hemolizę mikroangiopatyczną (MAHA) od autoimmunologicznej niedokrwistości hemolitycznej (AIHA)?",
      scenario: "Z laboratorium otrzymujesz wyniki: Hb 6.2 g/dl, PLT 24 G/L, bilirubina wolna 3.6 mg/dl, LDH 2150 U/l, haptoglobina <0.05 g/l. Jakie dwa kluczowe badania immunohematologiczne natychmiast różnicują hemolizę mikroangiopatyczną (MAHA) od autoimmunologicznej niedokrwistości hemolitycznej (AIHA)?",
      options: [
        {
          text: "Rozmaz krwi obwodowej wykazujący schizocyty (pofragmentowane erytrocyty >1-2%) oraz UJEMNY bezpośredni test antyglobulinowy (BTA / odczyn Coombsa)",
          feedback: "✅ PRAWIDŁOWO! Znak rozpoznawczy MAHA: erytrocyty ulegają mechanicznemu 'pocięciu' na siatkach mikrozakrzepów włóknikowo-płytkowych w naczyniach włosowatych kłębuszków nerkowych, tworząc pofragmentowane krwinki (schizocyty / 'krwinki hełmowate'). Test Coombsa (BTA) jest UJEMNY, co wyklucza tło autoimmunologiczne (przeciwciała anty-RBC)."
        },
        {
          text: "Wybitnie DODATNI odczyn Coombsa oraz obecność sferocytów w rozmazie",
          feedback: "❌ BŁĄD! Dodatni odczyn Coombsa i sferocyty charakteryzują AIHA (autoimmunologiczną niedokrwistość hemolityczną). W HUS hemoliza jest nieimmunologiczna, mechaniczna – odczyn Coombsa jest UJEMNY!"
        },
        {
          text: "Oznaczenie hemoglobiny płodowej HbF i elektroforeza hemoglobiny",
          feedback: "❌ BŁĄD! Elektroforeza hemoglobiny służy do rozpoznawania hemoglobinopatii (talasemia, anemia sierpowata), a nie ostrej mikroangiopatii zakrzepowej."
        },
        {
          text: "Czas krzepnięcia krwi pełnej i biopsja szpiku kostnego",
          feedback: "❌ BŁĄD! Biopsja szpiku jest zbędna i przeciwwskazana przy małopłytkowości 24 G/L. Rozmaz krwi obwodowej i ujemny Coombs są w pełni wystarczające."
        }
      ]
    },
    {
      stepNum: 3,
      title: "Krok 3: Analiza błędów terapeutycznych – kardynalna pułapka antybiotykowa",
      desc: "Analizując dokumentację ze szpitala rejonowego, zauważasz, że w trakcie krwawej biegunki dziecku podano Trimetoprim/Sulfametoksazol (Biseptol). Jaka jest aktualna wiedza medyczna i stanowisko towarzystw naukowych (ESPGHAN, AAP, PTNFD) dotyczące stosowania antybiotyków w zakażeniach STEC?",
      scenario: "Analizując dokumentację ze szpitala rejonowego, zauważasz, że w trakcie krwawej biegunki dziecku podano Trimetoprim/Sulfametoksazol (Biseptol). Jaka jest aktualna wiedza medyczna i stanowisko towarzystw naukowych (ESPGHAN, AAP, PTNFD) dotyczące stosowania antybiotyków w zakażeniach STEC?",
      options: [
        {
          text: "Antybiotyki są BEZWZGLĘDNIE PRZECIWWSKAZANE w biegunce STEC – ich podanie powoduje lizę bakterii, gwałtowny wyrzut toksyny Shiga (Stx1/Stx2) i dramatycznie zwiększa ryzyko rozwoju pełnego HUS i zgonu",
          feedback: "✅ PRAWIDŁOWO! KARDYNALNA ZASADA MEDYCYNY I PYTANIE LEK! Antybiotyki (zwłaszcza fluorochinolony, kotrimoksazol, beta-laktamy) indukują ekspresję genów profaga i powodują masywną lizę pałeczek E. coli O157:H7, co uwalnia ogromne ilości toksyny Shiga do światła jelita, skąd wchłania się ona do krwioobiegu. Podanie antybiotyku w krwawej biegunce zwiększa ryzyko wystąpienia HUS nawet kilkukrotnie! Przeciwwskazane są również leki hamujące perystaltykę (loperamid)."
        },
        {
          text: "Antybiotykoterapia jest obowiązkowa i powinna być natychmiast zamieniona na cyprofloksacynę i.v.",
          feedback: "❌ BŁĄD! Fluorochinolony są najsilniejszymi induktorami ekspresji toksyny Shiga i ich podanie w STEC jest rażącym błędem sztuki."
        },
        {
          text: "Antybiotyki nie mają żadnego wpływu na toksynę Shiga, a ich podanie było całkowicie obojętne",
          feedback: "❌ BŁĄD! Badania prospektywne jednoznacznie udowodniły, że antybiotyki zwiększają ryzyko HUS i nasilają uszkodzenie nerek."
        },
        {
          text: "Wskazane jest podanie węgla aktywowanego w dawce 50 g w celu związania antybiotyku",
          feedback: "❌ BŁĄD! Węgiel aktywowany podany po kilku dniach nie ma żadnego uzasadnienia i może wywołać aspirację lub niedrożność jelit."
        }
      ]
    },
    {
      stepNum: 4,
      title: "Krok 4: Postępowanie z małopłytkowością – czy przetaczać koncentrat płytek krwi (KKP)?",
      desc: "Młodszy lekarz dyżurny, widząc wynik płytek krwi 24 G/L oraz wybroczyny na skórze Martynki, biegnie do banku krwi zamówić 1 jednostkę koncentratu krwinek płytkowych (KKP). Jaka powinna być Twoja natychmiastowa reakcja jako starszego klinicysty?",
      scenario: "Młodszy lekarz dyżurny, widząc wynik płytek krwi 24 G/L oraz wybroczyny na skórze Martynki, biegnie do banku krwi zamówić 1 jednostkę koncentratu krwinek płytkowych (KKP). Jaka powinna być Twoja natychmiastowa reakcja jako starszego klinicysty?",
      options: [
        {
          text: "Zatrzymać przetoczenie! Przetaczanie płytek krwi w HUS jest ZAKAZANE ('dolewanie oliwy do ognia'), gdyż nowe płytki ulegają natychmiastowemu zużyciu, napędzając mikrozakrzepicę w kłębuszkach nerkowych i mózgu",
          feedback: "✅ PRAWIDŁOWO! KARDYNALNA ZASADA POSTĘPOWANIA W HUS I TTP! W mikroangiopatiach zakrzepowych płytki krwi są zużywane w procesie tworzenia mikrozakrzepów. Podanie egzogennych płytek dostarcza 'paliwa' do dalszej trombozy naczyniowej, co może wywołać nagły udar niedokrwienny, drgawki lub nieodwracalne zniszczenie kłębuszków nerkowych. Przetoczenie KKP dopuszcza się WYŁĄCZNIE w przypadku masywnego, bezpośrednio zagrażającego życiu krwawienia (np. krwawienie śródczaszkowe) lub przed inwazyjnym zabiegiem chirurgicznym."
        },
        {
          text: "Zgodzić się na przetoczenie 2 jednostek KKP, gdyż przy PLT <30 G/L istnieje bezwzględne wskazanie profilaktyczne",
          feedback: "❌ BŁĄD! W HUS profilaktyczne przetoczenie KKP jest błędem sztuki i może doprowadzić do nagłego zgonu pacjenta wskutek zakrzepicy mózgowej."
        },
        {
          text: "Zalecić podanie kwasu traneksamowego w wysokiej dawce zamiast płytek",
          feedback: "❌ BŁĄD! Leki antyfibrynolityczne (kwas traneksamowy) są przeciwwskazane w mikroangiopatiach zakrzepowych, gdyż hamują lizę istniejących mikrozakrzepów."
        },
        {
          text: "Podać heparynę niefrakcjonowaną w celu ochrony podawanych płytek",
          feedback: "❌ BŁĄD! Heparyna nie jest skuteczna w HUS, a przy małopłytkowości 24 G/L stwarza śmiertelne ryzyko wylewów krwawych."
        }
      ]
    },
    {
      stepNum: 5,
      title: "Krok 5: Wyrównanie niedokrwistości i zarządzanie płynoterapią przy bezmoczu",
      desc: "Martynka ma stężenie hemoglobiny 6.2 g/dl, jest blada, podsypiająca, tętno wynosi 145/min. Od 14 godzin nie oddaje moczu, ciśnienie wynosi 128/82 mmHg, potas w surowicy 5.9 mmol/l. Jakie są prawidłowe decyzje dotyczące leczenia krwią i bilansu płynów?",
      scenario: "Martynka ma stężenie hemoglobiny 6.2 g/dl, jest blada, podsypiająca, tętno wynosi 145/min. Od 14 godzin nie oddaje moczu, ciśnienie wynosi 128/82 mmHg, potas w surowicy 5.9 mmol/l. Jakie są prawidłowe decyzje dotyczące leczenia krwią i bilansu płynów?",
      options: [
        {
          text: "Przetoczenie ubogoleukocytarnego koncentratu krwinek czerwonych (UKKCz) w dawce 10 ml/kg mc. w powolnym wlewie oraz ścisła restrykcja płynowa (pokrycie strat bezwzględnych + diureza)",
          feedback: "✅ PRAWIDŁOWO! Przy objawowej ciężkiej anemii hemolitycznej (Hb <6–7 g/dl z tachykardią) przetoczenie UKKCz jest leczeniem ratującym życie (docelowa Hb ~8–9 g/dl). Jednocześnie u dziecka z bezmoczem i nadciśnieniem obowiązuje ŚCISŁA RESTRYKCJA PŁYNOWA (straty niewidoczne ~300-400 ml/m²/d + aktualna objętość diurezy i wymiotów), aby uniknąć przewodnienia, obrzęku płuc i obrzęku mózgu."
        },
        {
          text: "Szybki wlew 500 ml 0.9% NaCl w 30 minut, aby 'przepłukać nerki' i zmusić je do produkcji moczu",
          feedback: "❌ BŁĄD! Forsowanie diurezy krystaloidami u dziecka z bezmoczem w przebiegu ostrej martwicy kłębuszków prowadzi w ciągu kilkudziesięciu minut do ostrego obrzęku płuc i zgonu!"
        },
        {
          text: "Wstrzymanie przetaczania KKCz do momentu uzyskania diurezy, gdyż krew nasili niewydolność nerek",
          feedback: "❌ BŁĄD! Głęboka anemia z niedotlenieniem narządowym (Hb 6.2 g/dl) pogłębia niedokrwienie nerek i mięśnia sercowego. UKKCz musi być przetoczony."
        },
        {
          text: "Podanie dożylne erytropoetyny (EPO) w dawce 10 000 j. zamiast krwi",
          feedback: "❌ BŁĄD! EPO działa po 2-3 tygodniach i nie ma żadnego zastosowania w ostrej hemolizie zagrażającej życiu."
        }
      ]
    },
    {
      stepNum: 6,
      title: "Krok 6: Kwalifikacja do leczenia nerkozastępczego – wybór metody u małego dziecka",
      desc: "Pomimo leczenia zachowawczego, po 24 godzinach bezmocz utrzymuje się (diureza 0 ml/dobę), stężenie kreatyniny wzrasta do 4.6 mg/dl, mocznik 190 mg/dl, potas 6.4 mmol/l pomimo wlewu glukozy z insuliną i wodorowęglanów, pojawia się duszność i cechy przewodnienia. Jaka jest metoda leczenia nerkozastępczego z wyboru u tego dziecka?",
      scenario: "Pomimo leczenia zachowawczego, po 24 godzinach bezmocz utrzymuje się (diureza 0 ml/dobę), stężenie kreatyniny wzrasta do 4.6 mg/dl, mocznik 190 mg/dl, potas 6.4 mmol/l pomimo wlewu glukozy z insuliną i wodorowęglanów, pojawia się duszność i cechy przewodnienia. Jaka jest metoda leczenia nerkozastępczego z wyboru u tego dziecka?",
      options: [
        {
          text: "Pilne wdrożenie ostrej dializy otrzewnowej (DO) jako metody pierwszego wyboru u niemowląt i małych dzieci",
          feedback: "✅ PRAWIDŁOWO! Wskazania do dializoterapii w HUS to: bezmocz trwający >24h, oporna na leczenie hiperkaliemia (>6.5 mmol/l), kwasica metaboliczna, przewodnienie z nadciśnieniem lub obrzękiem płuc oraz mocznica. U małych dzieci (zwłaszcza <3–5 lat) metodą Z WYBORU jest DIALIZA OTRZEWNOWA (łagodna hemodynamicznie, nie wymaga dostępu naczyniowego o dużym świetle ani antykoagulacji heparyną, która groziłaby krwawieniem przy małopłytkowości)."
        },
        {
          text: "Klasyczna powtarzana hemodializa przerywana z użyciem cewnika naczyniowego i pełnej dawki heparyny",
          feedback: "❌ BŁĄD! Hemodializa u małego dziecka z ciężką małopłytkowością (24 G/L) wymaga pełnej heparynizacji układu, co grozi krwotokiem do OUN, a gwałtowne zmiany ciśnienia mogą wywołać zespół niewyrównania dializacyjnego."
        },
        {
          text: "Podanie dożylne mannitolu 20% w bolusie 500 ml w celu osmotycznego odblokowania nerek",
          feedback: "❌ BŁĄD! Podanie mannitolu u bezmoczowego pacjenta drastycznie zwiększa objętość krążącą i prowadzi do natychmiastowego obrzęku płuc!"
        },
        {
          text: "Wykonanie pilnego przeszczepienia nerki ze wskazań ratunkowych",
          feedback: "❌ BŁĄD! Przeszczepienie nerki nie jest metodą leczenia ostrej fazy HUS. Funkcja własnych nerek u dzieci z STEC-HUS powraca w >70-80% po dializoterapii wspomagającej."
        }
      ]
    },
    {
      stepNum: 7,
      title: "Krok 7: Monitorowanie powikłań wielonarządowych – Neuro-HUS",
      desc: "W 3. dobie hospitalizacji, podczas dializy otrzewnowej, u Martynki nagle występują uogólnione drgawki toniczno-klonowe z utratą przytomności. Ciśnienie tętnicze wzrasta do 150/95 mmHg. Co oznacza to powikłanie i jak należy postąpić?",
      scenario: "W 3. dobie hospitalizacji, podczas dializy otrzewnowej, u Martynki nagle występują uogólnione drgawki toniczno-klonowe z utratą przytomności. Ciśnienie tętnicze wzrasta do 150/95 mmHg. Co oznacza to powikłanie i jak należy postąpić?",
      options: [
        {
          text: "Rozwój postaci mózgowej HUS (Neuro-HUS / encefalopatia nadciśnieniowa i mikrozakrzepy w OUN); wymaga pilnego przerwania drgawek (diazepam/midazolam), intensywnego obniżenia ciśnienia (labetalol/nikardypina/urapidyl) oraz pilnego TK/MR mózgu",
          feedback: "✅ PRAWIDŁOWO! Zaangażowanie ośrodkowego układu nerwowego (Neuro-HUS: drgawki, zaburzenia świadomości, udar, obrzęk mózgu) występuje u 10–20% chorych i jest GŁÓWNĄ PRZYCZYNĄ ZGONU w przebiegu STEC-HUS! Wynika z ekspresji receptora Gb3 w śródbłonku naczyń mózgowych oraz ciężkiego nadciśnienia tętniczego. Wymaga doraźnego leczenia przeciwdrgawkowego (benzodiazepiny), kontrolowanego obniżania ciśnienia krwi oraz pilnej neuroobrazówki."
        },
        {
          text: "Jest to typowa gorączka trzydniowa (rumień nagły) niemająca związku z nerkami",
          feedback: "❌ BŁĄD! Uogólnione drgawki z przełomem nadciśnieniowym u dziecka z HUS to objaw Neuro-HUS o krytycznym rokowaniu."
        },
        {
          text: "Drgawki wynikają z przedawkowania dializy otrzewnowej i wymagają natychmiastowego usunięcia cewnika",
          feedback: "❌ BŁĄD! Usunięcie cewnika pozbawiłoby bezmoczowe dziecko jedynego leczenia ratującego życie przed hiperkaliemią."
        },
        {
          text: "Należy natychmiast wykonać nakłucie lędźwiowe bez wcześniejszego obrazowania OUN",
          feedback: "❌ BŁĄD! Nakłucie lędźwiowe przy ciśnieniu 150/95 mmHg, małopłytkowości 24 G/L i podejrzeniu obrzęku mózgu grozi wgłobieniem migdałków móżdżku i krwiakiem kanału kręgowego!"
        }
      ]
    },
    {
      stepNum: 8,
      title: "Krok 8: Różnicowanie z atypowym HUS (aHUS) i zakrzepową plamicą małopłytkową (TTP)",
      desc: "Stan Martynki ustabilizował się po wdrożeniu leczenia. W badaniach potwierdzono obecność genu toksyny Shiga (stx2) w kale oraz aktywność ADAMTS13 na poziomie 68%. Jakie znaczenie kliniczne i terapeutyczne mają te wyniki w kontekście wskazań do stosowania ekulizumabu?",
      scenario: "Stan Martynki ustabilizował się po wdrożeniu leczenia. W badaniach potwierdzono obecność genu toksyny Shiga (stx2) w kale oraz aktywność ADAMTS13 na poziomie 68%. Jakie znaczenie kliniczne i terapeutyczne mają te wyniki w kontekście wskazań do stosowania ekulizumabu?",
      options: [
        {
          text: "Potwierdzają STEC-HUS i wykluczają TTP (ADAMTS13 >10%); w typowym STEC-HUS ekulizumab NIE jest standardowo zalecany (stanowi lek z wyboru w atypowym HUS – aHUS wywołanym dysregulacją układu dopełniacza)",
          feedback: "✅ PRAWIDŁOWO! Aktywność ADAMTS13 >10% jednoznacznie wyklucza zakrzepową plamicę małopłytkową (TTP). Wykrycie toksyny Shiga potwierdza typowy HUS (STEC-HUS / D+ HUS), w którym rokowanie jest zazwyczaj pomyślne przy leczeniu wspomagającym. Ekulizumab (przeciwciało monoklonalne anty-C5) oraz rawulizumab są lekami celowanymi zarejestrowanymi w ATYPOWYM HUS (aHUS / D- HUS), w którym dochodzi do niekontrolowanej aktywacji alternatywnej drogi dopełniacza."
        },
        {
          text: "Wynik ADAMTS13 68% oznacza ciężką postać TTP wymagającą natychmiastowej plazmaferezy całkowitej",
          feedback: "❌ BŁĄD! W TTP aktywność ADAMTS13 wynosi <10% (zwykle <5%). Wynik 68% jest prawidłowy i całkowicie wyklucza TTP."
        },
        {
          text: "Każde dziecko z HUS musi otrzymać ekulizumab w ciągu pierwszych 12 godzin niezależnie od etiologii",
          feedback: "❌ BŁĄD! W STEC-HUS badania kliniczne nie wykazały jednoznacznej korzyści z rutynowego podawania ekulizumabu, lek ten jest zarezerwowany dla aHUS (lub w wyjątkowych przypadkach ciężkiego Neuro-HUS opornego na leczenie)."
        },
        {
          text: "Dziecko z potwierdzonym STEC-HUS nie wymaga żadnej dalszej kontroli nefrologicznej po wypisie ze szpitala",
          feedback: "❌ BŁĄD! Nawet do 30% dzieci po przebyciu STEC-HUS rozwija po latach nadciśnienie tętnicze, białkomocz lub przewlekłą chorobę nerek (PChN), dlatego wymagają wieloletniej kontroli nefrologicznej."
        }
      ]
    }
  ],
  pathoNodes: [
    {
      badge: "KROK 1: INFEKCJA I WYRZUT TOKSYNY SHIGA",
      title: "Kolonizacja jelita i wchłanianie toksyny Stx",
      short: "Spożycie skażonej wołowiny / E. coli O157:H7",
      detail: "Po spożyciu niedopieczonego mięsa wołowego dochodzi do kolonizacji jelita grubego przez szczepy E. coli wytwarzające toksynę Shiga (STEC, np. O157:H7). Bakterie niszczą nabłonek jelitowy (krwawa biegunka), a uwolniona toksyna Shiga (Stx1, Stx2) przenika przez uszkodzoną barierę śluzówkową do krążenia wrotnego i systemowego, wiążąc się z leukocytami.",
      target: "Nabłonek jelita grubego i krążenie wrotne",
      desc: "Antybiotyki stymulują ekspresję profaga i powodują gwałtowną lizę bakterii, nasilając wyrzut toksyny!"
    },
    {
      badge: "KROK 2: APOPTOZA ŚRÓDBŁONKA PRZEZ RECEPTOR Gb3",
      title: "Wiązanie z globozyloceramidem (Gb3)",
      short: "Ekspresja receptorów Gb3 w kłębuszkach nerkowych",
      detail: "Podjednostka B toksyny Shiga wiąże się wybiórczo z glikolipidowym receptorem Gb3 (globozyloceramidem), który u dzieci wykazuje wyjątkowo wysoką ekspresję na komórkach śródbłonka naczyń włosowatych kłębuszków nerkowych oraz w OUN. Podjednostka A wnika do komórki, inaktywuje podjednostkę 28S rybosomu, hamując translację białek, co prowadzi do martwicy i apoptozy komórek śródbłonka.",
      target: "Śródbłonek kłębuszków nerkowych i OUN",
      desc: "Odsłonięcie błony podstawnej i czynnika von Willebranda wyzwala kaskadę prozakrzepową."
    },
    {
      badge: "KROK 3: MIKROANGIOPATIA ZAKRZEPOWA (TMA)",
      title: "Mikrozakrzepy płytkowe i mechaniczna hemoliza (MAHA)",
      short: "Tworzenie schizocytów i zużycie płytek krwi",
      detail: "Odsłonięty podśródbłonek inicjuje masywną adhezję i aktywację płytek krwi. Powstają bogatopłytkowe mikrozakrzepy włóknikowe, co prowadzi do gwałtownego zużycia krążących trombocytów (ciężka małopłytkowość). Przeciskające się przez zwężone przez mikrozakrzepy światło naczyń erytrocyty ulegają mechanicznemu pocięciu i fragmentacji na ostrych włóknach fibryny, tworząc schizocyty (niedokrwistość hemolityczna mikroangiopatyczna MAHA, ujemny Coombs).",
      target: "Mikrokrążenie kłębuszkowe i erytrocyty",
      desc: "Podanie egzogennych płytek krwi (KKP) stanowi 'dolewanie paliwa do ognia' trombozy!"
    },
    {
      badge: "KROK 4: ZAMKNIĘCIE NACZYŃ I OSTRE USZKODZENIE NEREK",
      title: "Martwica kory nerek i powikłania narządowe",
      short: "Ostra anuria i powikłania mózgowe (Neuro-HUS)",
      detail: "Masywna okluzja mikrokrążenia kłębuszkowego prowadzi do gwałtownego spadku GFR, ostrego niedokrwienia i martwicy kory nerek, manifestując się bezmoczem, hiperkaliemią, ciężką kwasicą i nadciśnieniem. Zbliżony proces w mikronaczyniach mózgowia prowadzi do encefalopatii nadciśnieniowej, obrzęku mózgu i drgawek (Neuro-HUS), będących główną przyczyną zgonu w ostrej fazie.",
      target: "Kora nerek i ośrodkowy układ nerwowy",
      desc: "Wymaga wczesnej dializy otrzewnowej i ścisłej kontroli ciśnienia tętniczego."
    }
  ],
  diffTable: {
    title: "Diagnostyka różnicowa mikroangiopatii zakrzepowych (TMA) i stanów małopłytkowych",
    headers: ["Cecha", "STEC-HUS (D+ HUS)", "Atypowy HUS (aHUS / D-)", "TTP (Plamica małopłytkowa)", "DIC (Rozsiane wykrzepianie)"],
    rows: [
      ["Etiologia", "Zakażenie STEC (toksyna Shiga E. coli O157:H7, Shigella)", "Dysregulacja układu dopełniacza (mutacje CFH, CFI, CD46)", "Niedobór ADAMTS13 (<10%) wrodzony lub autoprzeciwciała", "Posocznica, uraz wielonarządowy, powikłania położnicze"],
      ["Objaw zwiastunowy", "Krwawa biegunka (90%), bóle brzucha", "Często brak biegunki, nawracający przebieg", "Często bez objawów zwiastunowych, dorośli", "Ciężka choroba podstawowa, sepsa"],
      ["Dominujący narząd", "Nerki (ciężkie AKI, bezmocz)", "Nerki (postępująca niewydolność)", "Mózg (objawy neurologiczne)", "Uogólnione krwawienia i zakrzepica"],
      ["Schizocyty / BTA", "Liczne schizocyty / Coombs UJEMNY", "Liczne schizocyty / Coombs UJEMNY", "Liczne schizocyty / Coombs UJEMNY", "Obecne / Coombs UJEMNY"],
      ["Układ krzepnięcia", "INR i APTT prawidłowe, fibrynogen norma", "INR i APTT prawidłowe", "INR i APTT prawidłowe", "INR i APTT wydłużone, fibrynogen obniżony, D-dimery skrajnie wysokie"],
      ["Aktywność ADAMTS13", "Prawidłowa (>60%)", "Prawidłowa (>60%)", "Skrajnie obniżona (<10%)", "Prawidłowa lub miernie obniżona"],
      ["Leczenie z wyboru", "Wspomagające (dializa otrzewnowa, UKKCz); ZAKAZ antybiotyków i KKP!", "Ekulizumab / Rawulizumab (inhibitory C5 dopełniacza)", "Plazmafereza całkowita (TPE) + GKS + kaplacyzumab", "Leczenie przyczyny podstawowej, FFP, fibrynogen, płytki"]
    ]
  },
  dutySummary: {
    overview: "2.5-letnia dziewczynka z pełnoobjawowym zespołem hemolityczno-mocznicowym (STEC-HUS) po przebytej krwawej biegunce wywołanej E. coli O157:H7, zaostrzonej podaniem kotrimoksazolu. Klasyczna triada: niedokrwistość hemolityczna mikroangiopatyczna MAHA (Hb 6.2 g/dl, liczne schizocyty, Coombs ujemny), małopłytkowość z zużycia (PLT 24 G/L) oraz ostre uszkodzenie nerek z bezmoczem (kreatynina 3.8 mg/dl, K+ 5.9 mmol/l). Uratowana dzięki wczesnemu wdrożeniu ostrej dializy otrzewnowej, przetoczeniu UKKCz oraz opanowaniu drgawek w przebiegu Neuro-HUS.",
    diagnostics: "Rozmaz krwi obwodowej pod kątem schizocytów, próba Coombsa (BTA), wskaźniki hemolizy (LDH, bilirubina wolna, haptoglobina), koagulologia (INR, APTT, fibrynogen – wykluczenie DIC), aktywność ADAMTS13 (wykluczenie TTP), PCR w kale w kierunku genu toksyny Shiga (stx1, stx2), gazometria i jonogram.",
    drugsAndDoses: "1. KARDYNALNY ZAKAZ: <span class='dose-pill'>BEZWZGLĘDNY ZAKAZ ANTYBIOTYKÓW</span> oraz <span class='dose-pill'>ZAKAZ PRZETACZANIA KKP</span>!<br>2. Przetoczenie krwi: <span class='dose-pill'>UKKCz 10 ml/kg mc.</span> w powolnym wlewie pod kontrolą wolemii.<br>3. W razie drgawek: <span class='dose-pill'>Diazepam i.v. 0.2–0.3 mg/kg mc.</span> lub Midazolam.<br>4. Leki hipotensyjne w Neuro-HUS: <span class='dose-pill'>Urapidyl i.v.</span> lub Labetalol w ciągłym wlewie.<br>5. Ostra dializa otrzewnowa z użyciem płynów dializacyjnych z 1.5% glukozą.",
    procedures: "Założenie cewnika do dializy otrzewnowej (Tenckhoff), założenie cewnika Foleya (rejestracja mikroskopijnej diurezy), monitorowanie EKG i ciśnienia tętniczego co 1h, ścisły bilans płynów.",
    monitoring: "Rejestracja bilansu płynów co godzinę, kontrola jonogramu (K+) i gazometrii co 4-6h, codzienna kontrola morfologii i rozmazu krwi (spadek schizocytów i wzrost płytek zwiastuje remisję). Obowiązkowe zgłoszenie do Sanepidu w ciągu 24 godzin na formularzu ZLK-1."
  },
  lekQuestions: [
    {
      tag: "Triada objawów klinicznych",
      q: "Klasyczna triada objawów w zespole hemolityczno-mocznicowym (HUS) obejmuje:",
      opts: [
        "A. Niedokrwistość hemolityczną mikroangiopatyczną (MAHA), małopłytkowość oraz ostre uszkodzenie nerek (AKI)",
        "B. Gorączkę, żółtaczkę mechaniczną oraz splenomegalię",
        "C. Niedokrwistość aplastyczną, leukopenię oraz krwinkomocz",
        "D. Białkomocz nerczycowy, hipoalbuminemię oraz hiperlipidemię",
        "E. Obrzęki ciastowate, nadciśnienie tętnicze oraz krwiomocz bez małopłytkowości"
      ],
      options: [
        "A. Niedokrwistość hemolityczną mikroangiopatyczną (MAHA), małopłytkowość oraz ostre uszkodzenie nerek (AKI)",
        "B. Gorączkę, żółtaczkę mechaniczną oraz splenomegalię",
        "C. Niedokrwistość aplastyczną, leukopenię oraz krwinkomocz",
        "D. Białkomocz nerczycowy, hipoalbuminemię oraz hiperlipidemię",
        "E. Obrzęki ciastowate, nadciśnienie tętnicze oraz krwiomocz bez małopłytkowości"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Klasyczna definicja zespołu hemolityczno-mocznicowego (HUS) obejmuje triadę: 1) mikroangiopatyczną niedokrwistość hemolityczną (MAHA) z obecnością schizocytów i ujemnym odczynem Coombsa, 2) małopłytkowość z zużycia (trombocytopenię, zazwyczaj <50-100 G/L), 3) ostre uszkodzenie nerek (AKI) manifestujące się oligurią/anurią i gwałtownym wzrostem mocznika i kreatyniny.",
      expl: "Klasyczna definicja zespołu hemolityczno-mocznicowego (HUS) obejmuje triadę: 1) mikroangiopatyczną niedokrwistość hemolityczną (MAHA) z obecnością schizocytów i ujemnym odczynem Coombsa, 2) małopłytkowość z zużycia (trombocytopenię, zazwyczaj <50-100 G/L), 3) ostre uszkodzenie nerek (AKI) manifestujące się oligurią/anurią i gwałtownym wzrostem mocznika i kreatyniny."
    },
    {
      tag: "Kardynalna pułapka / Antybiotykoterapia",
      q: "Dlaczego stosowanie antybiotyków w zakażeniach przewodu pokarmowego wywołanych przez szczepy Escherichia coli wytwarzające toksynę Shiga (STEC) jest przeciwwskazane?",
      opts: [
        "A. Ponieważ antybiotyki indukują lizę bakterii i nasilają ekspresję genów toksyny Shiga, co zwiększa ryzyko rozwoju pełnoobjawowego HUS",
        "B. Ponieważ STEC jest wirusem i antybiotyki są całkowicie nieskuteczne",
        "C. Ponieważ antybiotyki wiążą się bezpośrednio z receptorem Gb3 w mózgu",
        "D. Ponieważ powodują natychmiastowe zniszczenie układu krzepnięcia i hemofilię",
        "E. Ponieważ uniemożliwiają późniejsze wykonanie dializy otrzewnowej"
      ],
      options: [
        "A. Ponieważ antybiotyki indukują lizę bakterii i nasilają ekspresję genów toksyny Shiga, co zwiększa ryzyko rozwoju pełnoobjawowego HUS",
        "B. Ponieważ STEC jest wirusem i antybiotyki są całkowicie nieskuteczne",
        "C. Ponieważ antybiotyki wiążą się bezpośrednio z receptorem Gb3 w mózgu",
        "D. Ponieważ powodują natychmiastowe zniszczenie układu krzepnięcia i hemofilię",
        "E. Ponieważ uniemożliwiają późniejsze wykonanie dializy otrzewnowej"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Badania kliniczne i eksperymentalne jednoznacznie wykazały, że antybiotyki (zwłaszcza beta-laktamy, fluorochinolony i kotrimoksazol) uszkadzają ścianę komórkową bakterii STEC i stymulują ekspresję profaga kodującego toksynę Shiga (Stx). Powoduje to masywny wyrzut toksyny do światła jelita i jej translokację do krwioobiegu, co dramatycznie (nawet 5-krotnie) zwiększa ryzyko rozwoju HUS.",
      expl: "Badania kliniczne i eksperymentalne jednoznacznie wykazały, że antybiotyki (zwłaszcza beta-laktamy, fluorochinolony i kotrimoksazol) uszkadzają ścianę komórkową bakterii STEC i stymulują ekspresję profaga kodującego toksynę Shiga (Stx). Powoduje to masywny wyrzut toksyny do światła jelita i jej translokację do krwioobiegu, co dramatycznie (nawet 5-krotnie) zwiększa ryzyko rozwoju HUS."
    },
    {
      tag: "Przetaczanie płytek krwi / Przeciwwskazania",
      q: "U 3-letniego dziecka z rozpoznanym STEC-HUS liczba płytek krwi wynosi 18 G/L, a na skórze widoczne są drobne wybroczyny. Nie stwierdza się krwawień zagrażających życiu. Wskaż prawidłowe postępowanie:",
      opts: [
        "A. Wstrzymanie przetaczania koncentratu krwinek płytkowych (KKP), ponieważ podanie płytek nasila mikrozakrzepicę w naczyniach nerkowych i mózgowych",
        "B. Pilne przetoczenie 2 jednostek KKP z uwagi na liczbę płytek poniżej 20 G/L",
        "C. Przetoczenie KKP w skojarzeniu z kwasem traneksamowym",
        "D. Podać kwas acetylosalicylowy w dawce przeciwpłytkowej",
        "E. Wdrożyć leczenie rekombinowanym czynnikiem VIIa"
      ],
      options: [
        "A. Wstrzymanie przetaczania koncentratu krwinek płytkowych (KKP), ponieważ podanie płytek nasila mikrozakrzepicę w naczyniach nerkowych i mózgowych",
        "B. Pilne przetoczenie 2 jednostek KKP z uwagi na liczbę płytek poniżej 20 G/L",
        "C. Przetoczenie KKP w skojarzeniu z kwasem traneksamowym",
        "D. Podać kwas acetylosalicylowy w dawce przeciwpłytkowej",
        "E. Wdrożyć leczenie rekombinowanym czynnikiem VIIa"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "W mikroangiopatiach zakrzepowych (HUS, TTP) przetaczanie płytek krwi jest przeciwwskazane, chyba że dochodzi do masywnego, zagrażającego życiu krwotoku (np. śródczaszkowego) lub konieczny jest pilny zabieg inwazyjny. Podanie egzogennych płytek dostarcza substratu do tworzenia nowych mikrozakrzepów naczyniowych ('dolewanie oliwy do ognia'), co może doprowadzić do udaru mózgu lub nieodwracalnej martwicy nerek.",
      expl: "W mikroangiopatiach zakrzepowych (HUS, TTP) przetaczanie płytek krwi jest przeciwwskazane, chyba że dochodzi do masywnego, zagrażającego życiu krwotoku (np. śródczaszkowego) lub konieczny jest pilny zabieg inwazyjny. Podanie egzogennych płytek dostarcza substratu do tworzenia nowych mikrozakrzepów naczyniowych ('dolewanie oliwy do ognia'), co może doprowadzić do udaru mózgu lub nieodwracalnej martwicy nerek."
    },
    {
      tag: "Rozmaz krwi obwodowej / Morfologia",
      q: "Obecność jakich komórek w rozmazie krwi obwodowej jest cechą charakterystyczną mikroangiopatycznej niedokrwistości hemolitycznej (MAHA)?",
      opts: [
        "A. Schizocytów (fragmentów erytrocytów)",
        "B. Komórek tarczowatych",
        "C. Drepanocytów (komórek sierpowatych)",
        "D. Owalocytów",
        "E. Ciałek Howella-Jolly'ego"
      ],
      options: [
        "A. Schizocytów (fragmentów erytrocytów)",
        "B. Komórek tarczowatych",
        "C. Drepanocytów (komórek sierpowatych)",
        "D. Owalocytów",
        "E. Ciałek Howella-Jolly'ego"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Patognomonicznym wykładnikiem MAHA w rozmazie krwi obwodowej są schizocyty (fragmenty krwinek czerwonych, krwinki hełmowate, trójkątne), powstające w wyniku mechanicznego cięcia erytrocytów na sieci mikrozakrzepów włóknikowych w zwężonym mikrokrążeniu. Ich odsetek >1-2% silnie przemawia za mikroangiopatią zakrzepową.",
      expl: "Patognomonicznym wykładnikiem MAHA w rozmazie krwi obwodowej są schizocyty (fragmenty krwinek czerwonych, krwinki hełmowate, trójkątne), powstające w wyniku mechanicznego cięcia erytrocytów na sieci mikrozakrzepów włóknikowych w zwężonym mikrokrążeniu. Ich odsetek >1-2% silnie przemawia za mikroangiopatią zakrzepową."
    },
    {
      tag: "Różnicowanie HUS vs TTP",
      q: "Które badanie laboratoryjne pozwala ostatecznie odróżnić zakrzepową plamicę małopłytkową (TTP) od zespołu hemolityczno-mocznicowego (HUS)?",
      opts: [
        "A. Aktywność metaloproteinazy ADAMTS13 (w TTP spada <10%, w HUS jest prawidłowa >10-20%)",
        "B. Oznaczenie stężenia ferrytyny w surowicy",
        "C. Bezpośredni odczyn Coombsa",
        "D. Czas protrombinowy i stężenie fibrynogenu",
        "E. Stężenie kinazy kreatynowej CK-MB"
      ],
      options: [
        "A. Aktywność metaloproteinazy ADAMTS13 (w TTP spada <10%, w HUS jest prawidłowa >10-20%)",
        "B. Oznaczenie stężenia ferrytyny w surowicy",
        "C. Bezpośredni odczyn Coombsa",
        "D. Czas protrombinowy i stężenie fibrynogenu",
        "E. Stężenie kinazy kreatynowej CK-MB"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Złotym standardem różnicowania TTP od HUS jest oznaczenie aktywności metaloproteinazy osoczowej ADAMTS13, która rozcina ultraduże multimery czynnika von Willebranda. W TTP aktywność ADAMTS13 spada poniżej 10% (zwykle nieoznaczalna <5%), natomiast w typowym i atypowym HUS aktywność ADAMTS13 jest prawidłowa lub jedynie nieznacznie obniżona (>20%, typowo >60%).",
      expl: "Złotym standardem różnicowania TTP od HUS jest oznaczenie aktywności metaloproteinazy osoczowej ADAMTS13, która rozcina ultraduże multimery czynnika von Willebranda. W TTP aktywność ADAMTS13 spada poniżej 10% (zwykle nieoznaczalna <5%), natomiast w typowym i atypowym HUS aktywność ADAMTS13 jest prawidłowa lub jedynie nieznacznie obniżona (>20%, typowo >60%)."
    },
    {
      tag: "Atypowy HUS (aHUS) / Terapia celowana",
      q: "W atypowym zespole hemolityczno-mocznicowym (aHUS) związanym z defektem regulacji alternatywnej drogi dopełniacza lekiem pierwszego wyboru jest:",
      opts: [
        "A. Ekulizumab lub rawulizumab (przeciwciała monoklonalne anty-C5)",
        "B. Dożylna cyklosporyna A",
        "C. Metotreksat w wysokich dawkach",
        "D. Trimetoprim z sulfametoksazolem",
        "E. Wlewy 10% chlorku sodu"
      ],
      options: [
        "A. Ekulizumab lub rawulizumab (przeciwciała monoklonalne anty-C5)",
        "B. Dożylna cyklosporyna A",
        "C. Metotreksat w wysokich dawkach",
        "D. Trimetoprim z sulfametoksazolem",
        "E. Wlewy 10% chlorku sodu"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Lekiem z wyboru w atypowym HUS (aHUS) jest ekulizumab (oraz nowszy rawulizumab) – humanizowane przeciwciało monoklonalne skierowane przeciwko składowej C5 układu dopełniacza, które blokuje powstawanie kompleksu atakującego błonę (MAC / C5b-9) i zatrzymuje uszkodzenie śródbłonka.",
      expl: "Lekiem z wyboru w atypowym HUS (aHUS) jest ekulizumab (oraz nowszy rawulizumab) – humanizowane przeciwciało monoklonalne skierowane przeciwko składowej C5 układu dopełniacza, które blokuje powstawanie kompleksu atakującego błonę (MAC / C5b-9) i zatrzymuje uszkodzenie śródbłonka."
    },
    {
      tag: "Leczenie nerkozastępcze u dzieci",
      q: "Jaka metoda leczenia nerkozastępczego jest uznawana za metodę z wyboru w ostrym uszkodzeniu nerek z bezmoczem w przebiegu HUS u niemowląt i małych dzieci?",
      opts: [
        "A. Dializa otrzewnowa (DO)",
        "B. Klasyczna przerywana hemodializa tętniczo-żylna",
        "C. Plazmafereza z wymianą osocza na 5% glukozę",
        "D. Hemoperfuzja przez kolumnę węglową",
        "E. Dożylny wlew mannitolu z dopaminą w dawce nerkowej"
      ],
      options: [
        "A. Dializa otrzewnowa (DO)",
        "B. Klasyczna przerywana hemodializa tętniczo-żylna",
        "C. Plazmafereza z wymianą osocza na 5% glukozę",
        "D. Hemoperfuzja przez kolumnę węglową",
        "E. Dożylny wlew mannitolu z dopaminą w dawce nerkowej"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "U małych dzieci z HUS i ostrym bezmoczem metodą z wyboru jest ostra DIALIZA OTRZEWNOWA. Jest to zabieg stabilny hemodynamicznie, niewymagający zakładania cewników naczyniowych o dużym przekroju ani ogólnoustrojowej antykoagulacji heparyną (która przy małopłytkowości stwarza wysokie ryzyko krwawienia).",
      expl: "U małych dzieci z HUS i ostrym bezmoczem metodą z wyboru jest ostra DIALIZA OTRZEWNOWA. Jest to zabieg stabilny hemodynamicznie, niewymagający zakładania cewników naczyniowych o dużym przekroju ani ogólnoustrojowej antykoagulacji heparyną (która przy małopłytkowości stwarza wysokie ryzyko krwawienia)."
    },
    {
      tag: "Powikłania śmiertelne / Neuro-HUS",
      q: "Najczęstszą bezpośrednią przyczyną zgonu w ostrej fazie typowego STEC-HUS u dzieci jest:",
      opts: [
        "A. Zajęcie ośrodkowego układu nerwowego (drgawki, obrzęk mózgu, udar – Neuro-HUS)",
        "B. Niewydolność oddechowa w przebiegu ARDS",
        "C. Pęknięcie śledziony",
        "D. Zatorowość tętnicy płucnej",
        "E. Hipoglikemia z wyczerpania zapasów glikogenu"
      ],
      options: [
        "A. Zajęcie ośrodkowego układu nerwowego (drgawki, obrzęk mózgu, udar – Neuro-HUS)",
        "B. Niewydolność oddechowa w przebiegu ARDS",
        "C. Pęknięcie śledziony",
        "D. Zatorowość tętnicy płucnej",
        "E. Hipoglikemia z wyczerpania zapasów glikogenu"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Choć HUS definiuje uszkodzenie nerek, to powikłania neurologiczne (Neuro-HUS: drgawki, udar niedokrwienny, krwawienie śródmózgowe, wklinowanie z powodu obrzęku mózgu) występujące u 10-20% chorych są główną przyczyną śmiertelności w ostrej fazie choroby.",
      expl: "Choć HUS definiuje uszkodzenie nerek, to powikłania neurologiczne (Neuro-HUS: drgawki, udar niedokrwienny, krwawienie śródmózgowe, wklinowanie z powodu obrzęku mózgu) występujące u 10-20% chorych są główną przyczyną śmiertelności w ostrej fazie choroby."
    },
    {
      tag: "Patofizjologia molekularna / Receptor Gb3",
      q: "Podjednostka B toksyny Shiga wykazuje swoisty tropizm do komórek śródbłonka nerkowego poprzez wiązanie z receptorem:",
      opts: [
        "A. Globozyloceramidem (Gb3 / CD77)",
        "B. Gangliozydem GM1",
        "C. Integryną alfa-V beta-3",
        "D. Receptorem dla transferryny (CD71)",
        "E. Receptorem toll-podobnym TLR4"
      ],
      options: [
        "A. Globozyloceramidem (Gb3 / CD77)",
        "B. Gangliozydem GM1",
        "C. Integryną alfa-V beta-3",
        "D. Receptorem dla transferryny (CD71)",
        "E. Receptorem toll-podobnym TLR4"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Receptorem dla toksyny Shiga (Stx1 i Stx2) jest glikolipid komórkowy globozyloceramid (Gb3, znany również jako CD77). Wykazuje on szczególnie wysoką gęstość w błonie komórkowej komórek śródbłonka naczyń włosowatych kłębuszków nerkowych oraz komórek OUN u małych dzieci, co tłumaczy narządową specyfikę uszkodzeń.",
      expl: "Receptorem dla toksyny Shiga (Stx1 i Stx2) jest glikolipid komórkowy globozyloceramid (Gb3, znany również jako CD77). Wykazuje on szczególnie wysoką gęstość w błonie komórkowej komórek śródbłonka naczyń włosowatych kłębuszków nerkowych oraz komórek OUN u małych dzieci, co tłumaczy narządową specyfikę uszkodzeń."
    },
    {
      tag: "Wskaż zdanie fałszywe / Koagulologia w HUS",
      q: "Wskaż zdanie FAŁSZYWE dotyczące hemostazy w zespole hemolityczno-mocznicowym (HUS):",
      opts: [
        "A. Czasy krzepnięcia (PT/INR, APTT) oraz stężenie fibrynogenu są zazwyczaj prawidłowe, co odróżnia HUS od zespołu rozsianego wykrzepiania wewnątrznaczyniowego (DIC)",
        "B. Małopłytkowość w HUS wynika z obwodowego zużycia płytek w mikrozakrzepach",
        "C. W rozmazie krwi widoczne są schizocyty",
        "D. Test Coombsa (bezpośredni odczyn antyglobulinowy) jest wybitnie dodatni u ponad 95% pacjentów z typowym HUS",
        "E. Stężenie LDH jest znacznie podwyższone jako wykładnik hemolizy wewnątrznaczyniowej"
      ],
      options: [
        "A. Czasy krzepnięcia (PT/INR, APTT) oraz stężenie fibrynogenu są zazwyczaj prawidłowe, co odróżnia HUS od zespołu rozsianego wykrzepiania wewnątrznaczyniowego (DIC)",
        "B. Małopłytkowość w HUS wynika z obwodowego zużycia płytek w mikrozakrzepach",
        "C. W rozmazie krwi widoczne są schizocyty",
        "D. Test Coombsa (bezpośredni odczyn antyglobulinowy) jest wybitnie dodatni u ponad 95% pacjentów z typowym HUS",
        "E. Stężenie LDH jest znacznie podwyższone jako wykładnik hemolizy wewnątrznaczyniowej"
      ],
      correctIdx: 3,
      correct: 3,
      exp: "Zdanie D jest FAŁSZYWE (i stanowi poprawną odpowiedź). W HUS hemoliza jest nieimmunologiczna, mechaniczna (MAHA), wywołana mechanicznym niszczeniem erytrocytów na siatkach mikrozakrzepów. Bezpośredni odczyn antyglobulinowy (odczyn Coombsa) jest UJEMNY. Prawidłowe parametry układu krzepnięcia (PT, APTT, fibrynogen) pozwalają z kolei odróżnić HUS od koagulopatii ze zużycia w DIC.",
      expl: "Zdanie D jest FAŁSZYWE (i stanowi poprawną odpowiedź). W HUS hemoliza jest nieimmunologiczna, mechaniczna (MAHA), wywołana mechanicznym niszczeniem erytrocytów na siatkach mikrozakrzepów. Bezpośredni odczyn antyglobulinowy (odczyn Coombsa) jest UJEMNY. Prawidłowe parametry układu krzepnięcia (PT, APTT, fibrynogen) pozwalają z kolei odróżnić HUS od koagulopatii ze zużycia w DIC."
    },
    {
      tag: "Aspekty prawne i epidemiologiczne",
      q: "W przypadku zdiagnozowania lub podejrzenia zespołu hemolityczno-mocznicowego (HUS) lub zakażenia STEC, lekarz ma prawny obowiązek:",
      opts: [
        "A. Zgłoszenia tego faktu do właściwego państwowego powiatowego inspektora sanitarnego (PSSE) w ciągu 24 godzin",
        "B. Zgłoszenia wyłącznie w przypadku zgonu pacjenta",
        "C. Wstrzymania zgłoszenia do momentu uzyskania pełnego wyniku hodowli bakteryjnej za 7 dni",
        "D. Poinformowania izby lekarskiej zamiast stacji sanitarno-epidemiologicznej",
        "E. Brak obowiązku zgłoszenia, gdyż HUS nie podlega rejestracji epidemiologicznej"
      ],
      options: [
        "A. Zgłoszenia tego faktu do właściwego państwowego powiatowego inspektora sanitarnego (PSSE) w ciągu 24 godzin",
        "B. Zgłoszenia wyłącznie w przypadku zgonu pacjenta",
        "C. Wstrzymania zgłoszenia do momentu uzyskania pełnego wyniku hodowli bakteryjnej za 7 dni",
        "D. Poinformowania izby lekarskiej zamiast stacji sanitarno-epidemiologicznej",
        "E. Brak obowiązku zgłoszenia, gdyż HUS nie podlega rejestracji epidemiologicznej"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Zgodnie z polską Ustawą o zapobieganiu oraz zwalczaniu zakażeń i chorób zakaźnych u ludzi, każde podejrzenie lub rozpoznanie zakażenia enteroenterokrwotocznym szczepem E. coli (STEC/EHEC) oraz zespołu hemolityczno-mocznicowego (HUS) podlega obowiązkowemu zgłoszeniu do właściwego Państwowego Powiatowego Inspektora Sanitarnego (formularz ZLK-1) w ciągu 24 godzin od podejrzenia.",
      expl: "Zgodnie z polską Ustawą o zapobieganiu oraz zwalczaniu zakażeń i chorób zakaźnych u ludzi, każde podejrzenie lub rozpoznanie zakażenia enteroenterokrwotocznym szczepem E. coli (STEC/EHEC) oraz zespołu hemolityczno-mocznicowego (HUS) podlega obowiązkowemu zgłoszeniu do właściwego Państwowego Powiatowego Inspektora Sanitarnego (formularz ZLK-1) w ciągu 24 godzin od podejrzenia."
    }
  ],
  flashcards: [
    {
      q: "Jaka jest klasyczna triada objawów HUS?",
      a: "1. Mikroangiopatyczna niedokrwistość hemolityczna (MAHA, schizocyty, Coombs ujemny)\n2. Małopłytkowość z zużycia (PLT <50–100 G/L)\n3. Ostre uszkodzenie nerek (AKI – bezmocz, mocznica, nadciśnienie)."
    },
    {
      q: "Dlaczego antybiotyki są bezwzględnie zakazane w krwawej biegunce wywołanej STEC?",
      a: "Antybiotyki stymulują lizę pałeczek E. coli O157:H7 i uwalnianie toksyny Shiga (Stx1/Stx2) do krwioobiegu, co drastycznie zwiększa ryzyko rozwoju pełnego HUS i zgonu!"
    },
    {
      q: "Dlaczego przetaczanie koncentratu krwinek płytkowych (KKP) w HUS jest błędem sztuki?",
      a: "Ponieważ podanie płytek 'dolewa oliwy do ognia' trombozy mikronaczyniowej, co może wywołać udar mózgu, drgawki lub nieodwracalną martwicę kory nerek. Płytki podaje się tylko przy masywnym krwotoku zagrażającym życiu."
    },
    {
      q: "Jaka metoda leczenia nerkozastępczego jest metodą z wyboru u małych dzieci z anurią w HUS?",
      a: "Ostra dializa otrzewnowa (DO) – łagodna hemodynamicznie, nie wymaga heparynizacji (bezpieczna przy małopłytkowości) ani dużego dostępu naczyniowego."
    },
    {
      q: "Jaki parametr laboratoryjny definitywnie różnicuje HUS od zakrzepowej plamicy małopłytkowej (TTP)?",
      a: "Aktywność metaloproteinazy ADAMTS13: w TTP spada poniżej 10%, w HUS jest prawidłowa (>60%)."
    },
    {
      q: "Jaki jest lek z wyboru w atypowym zespole hemolityczno-mocznicowym (aHUS)?",
      a: "Ekulizumab lub rawulizumab – humanizowane przeciwciała monoklonalne hamujące składową C5 dopełniacza."
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
  await saveAndEncryptCase(case105Data, '105_zespol_nerczycowy_mcd.json');
  await saveAndEncryptCase(case106Data, '106_stec_hus.json');
  console.log("Cases 105 and 106 rework completed successfully!");
})();

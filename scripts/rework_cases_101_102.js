const fs = require('fs');
const { decryptObjectAes, encryptStringAes } = require('./encrypt_case.js');
const PASSWORD = '@LEKSzymon28111999';

async function reworkCase(fname, updater) {
  const enc = JSON.parse(fs.readFileSync('cases/' + fname, 'utf8'));
  const c = await decryptObjectAes(enc, PASSWORD);
  updater(c);
  if (!c.vitalsObj) {
    c.vitalsObj = { hr: 110, bp: "95/60", spo2: 98, rr: 24, temp: 36.8, gcs: 15 };
  }
  const reEnc = await encryptStringAes(JSON.stringify(c, null, 2), PASSWORD);
  fs.writeFileSync('cases/' + fname, JSON.stringify(reEnc, null, 2), 'utf8');
  console.log(`Successfully reworked: ${fname} (LEK Q count: ${c.lekQuestions.length}, steps: ${c.steps.length})`);
}

async function run() {
  console.log("Reworking Cases 101 and 102 to Gold Standard (11 LEK Questions, Bedside Narrative, Full DiffTable & PathoNodes)...");

  // ==========================================
  // CASE 101: Celiakia u dziecka (Choroba trzewna)
  // ==========================================
  await reworkCase('101_celiakia_dziecko.json', (c) => {
    c.shortTitle = "Chłopiec 18 mies. – Wzdęcie brzucha, zahamowanie przyrostu masy i przewlekła biegunka (Celiakia)";
    c.diagnosisTitle = "Celiakia (Choroba trzewna / Coeliac disease) – postać klasyczna z enteropatią, zespołem złego wchłaniania i niedokrwistością z niedoboru żelaza";

    c.vitals = [
      { label: "Masa ciała", val: "9.1 kg (<3. percentyla)", sub: "Ubytek z 50. percentyla", status: "bad" },
      { label: "Wzrost", val: "77 cm (10. percentyla)", sub: "Spłaszczenie krzywej wzrastania", status: "warn" },
      { label: "HR", val: "108/min", sub: "Rytm miarowy", status: "ok" },
      { label: "RR", val: "22/min", sub: "Prawidłowy", status: "ok" },
      { label: "Temp", val: "36.7°C", sub: "Prawidłowa", status: "ok" }
    ];
    c.vitalsObj = { hr: 108, bp: "90/55", spo2: 99, rr: 22, temp: 36.7, gcs: 15 };

    c.story = "Do poradni gastroenterologii dziecięcej trafia 18-miesięczny Staś z rodzicami. Matka zgłasza, że chłopiec od około 6-7 miesięcy stopniowo traci apetyt, stał się marudny, apatyczny i płaczliwy. Wyraźnie widać zahamowanie rozwoju fizycznego: dziecko 'wypadło' z siatek centylowych masy ciała (z 50. percentyla w 9. miesiącu życia do poniżej 3. percentyla obecnie). Stolce oddawane są 3-5 razy dziennie, są obfite, błyszczące, blade, o wyjątkowo gnilnym, kwaśnym zapachu i trudne do zmycia z nocnika. W badaniu fizykalnym: bladość powłok skórnych i spojówek, suchość naskórka, cienkie, łamliwe włosy. Klatka piersiowa szczupła z widocznym zarysem żeber, brzuch jest dysproporcjonalnie duży, wzdęty, bębenkowy ('brzuch żabi'), a pośladki wykazują niemal całkowity zanik tkanki tłuszczowej i mięśniowej z fałdami wiotkiej skóry ('objaw wiszących portek'). Rozwój psychomotoryczny dotychczas harmonijny. W wywiadzie żywieniowym: gluten (kaszka manna) wprowadzono w 7. miesiącu życia.";

    c.labs = [
      {
        category: "Morfologia krwi obwodowej",
        items: [
          { name: "Hemoglobina (Hb)", val: "9.2 g/dL", norm: "11.0–14.0 g/dL", flag: "L" },
          { name: "Erytrocyty (RBC)", val: "3.7 T/L", norm: "3.9–5.3 T/L", flag: "L" },
          { name: "MCV", val: "68 fL", norm: "74–86 fL", flag: "L" },
          { name: "MCH", val: "22 pg", norm: "24–30 pg", flag: "L" },
          { name: "RDW-CV", val: "18.2%", norm: "11.5–14.5%", flag: "H" },
          { name: "Płytki krwi (PLT)", val: "460 G/L", norm: "150–450 G/L", flag: "H" }
        ]
      },
      {
        category: "Biochemia i gospodarka żelazem",
        items: [
          { name: "Ferrytyna", val: "5 ng/mL", norm: "15–120 ng/mL", flag: "L" },
          { name: "Żelazo w surowicy", val: "24 µg/dL", norm: "50–120 µg/dL", flag: "L" },
          { name: "Białko całkowite", val: "54 g/L", norm: "60–80 g/L", flag: "L" },
          { name: "Albumina", val: "31 g/L", norm: "38–54 g/L", flag: "L" },
          { name: "Wapń całkowity", val: "2.05 mmol/L", norm: "2.20–2.70 mmol/L", flag: "L" },
          { name: "25(OH)D", val: "14 ng/mL", norm: "30–50 ng/mL", flag: "L" },
          { name: "ALT / AST", val: "48 / 52 U/L", norm: "< 35 U/L", flag: "H" }
        ]
      }
    ];

    c.steps = [
      {
        stepNum: 1,
        title: "Krok 1: Wstępna ocena kliniczna zespołu złego wchłaniania i zaburzeń wzrastania",
        desc: "Jako lekarz przyjmujący analizujesz obraz 18-miesięcznego Stasia: duży, wzdęty brzuch ('żabi'), zanik mięśni pośladków ('wiszące portki'), przewlekłe obfite stolce tłuszczowe oraz spadek na siatkach centylowych masy ciała (<3. centyla) połączony z niedokrwistością mikrocytarną oporną na wcześniejsze leczenie syropem z żelazem. Wywiad wskazuje na początek dolegliwości kilka miesięcy po rozszerzeniu diety o produkty zbożowe. Jaki jest Twój wiodący kierunek myślenia klinicznego?",
        scenario: "Jako lekarz przyjmujący analizujesz obraz 18-miesięcznego Stasia: duży, wzdęty brzuch ('żabi'), zanik mięśni pośladków ('wiszące portki'), przewlekłe obfite stolce tłuszczowe oraz spadek na siatkach centylowych masy ciała (<3. centyla) połączony z niedokrwistością mikrocytarną oporną na wcześniejsze leczenie syropem z żelazem. Wywiad wskazuje na początek dolegliwości kilka miesięcy po rozszerzeniu diety o produkty zbożowe. Jaki jest Twój wiodący kierunek myślenia klinicznego?",
        options: [
          {
            text: "Podejrzenie klasycznej postaci celiakii (choroby trzewnej) z zespołem złego wchłaniania; w diagnostyce różnicowej należy uwzględnić mukowiscydozę, alergię na białka mleka krowiego oraz przewlekłe zakażenie pasożytnicze (Giardia lamblia).",
            correct: true,
            feedback: "✅ PRAWIDŁOWO! Klasyczna triada objawów celiakii u małego dziecka po wprowadzeniu glutenu: przewlekła biegunka tłuszczowa, postępujące wzdęcie brzucha z zanikiem mięśni i tkanki podskórnej oraz zahamowanie przyrostu masy i wzrostu. Oporna na leczenie doustne anemia mikrocytarna wynika z atrofii kosmków w dwunastnicy – głównym miejscu absorpcji żelaza. Podstawowe różnicowanie obejmuje mukowiscydozę i giardiozę."
          },
          {
            text: "Rozpoznanie czynnościowych zaparć nawykowych z 'biegunką z przelewania' i wdrożenie wlewek doodbytniczych z fosforanów.",
            correct: false,
            feedback: "❌ BŁĄD KRYTYCZNY! Zanik tkanki mięśniowej, ubytek masy ciała i ciężka anemia mikrocytarna to objawy organicznego zespołu złego wchłaniania, a nie zaburzeń czynnościowych! Wlewki fosforanowe u odwodnionego 18-miesięcznego dziecka grożą śmiertelną hiperfosfatemią i tężyczką hipokalcemiczną."
          },
          {
            text: "Uznanie objawów za fizjologiczny 'bunt dwulatka' i zalecenie diety eliminującej wszystkie tłuszcze.",
            correct: false,
            feedback: "❌ BŁĄD! Dziecko wykazuje obiektywne cechy niedożywienia i hipoalbuminemii. Odstawienie tłuszczów pogłębiłoby niedobory witamin rozpuszczalnych w tłuszczach (A, D, E, K)."
          },
          {
            text: "Natychmiastowe rozpoznanie guza Wilmsa z powodu powiększenia obwodu brzucha i skierowanie na pilną laparotomię.",
            correct: false,
            feedback: "❌ BŁĄD! Wzdęcie brzucha w celiakii jest uogólnione, symetryczne i bębenkowe (wynika z atonii jelit i fermentacji niewchłoniętych cukrów), a nie ze zwartego oporu w loży nerkowej."
          }
        ]
      },
      {
        stepNum: 2,
        title: "Krok 2: Wybór panelu diagnostycznego I rzutu wg wytycznych ESPGHAN",
        desc: "Matka dziecka pyta, jakie badania krwi należy pobrać. Zgodnie z aktualnymi wytycznymi Europejskiego Towarzystwa Gastroenterologii, Hepatologii i Żywienia Dzieci (ESPGHAN), jakie oznaczenie stanowi złoty standard badań serologicznych pierwszego rzutu u dziecka na diecie zawierającej gluten?",
        scenario: "Matka dziecka pyta, jakie badania krwi należy pobrać. Zgodnie z aktualnymi wytycznymi Europejskiego Towarzystwa Gastroenterologii, Hepatologii i Żywienia Dzieci (ESPGHAN), jakie oznaczenie stanowi złoty standard badań serologicznych pierwszego rzutu u dziecka na diecie zawierającej gluten?",
        options: [
          {
            text: "Jednoczesne oznaczenie stężenia przeciwciał przeciwko transglutaminazie tkankowej w klasie IgA (anty-tTG IgA) ORAZ całkowitego stężenia immunoglobuliny A (całkowite IgA) w surowicy.",
            correct: true,
            feedback: "✅ PRAWIDŁOWO! Wytyczne ESPGHAN (2012 i 2020) jednoznacznie definiują test I rzutu: anty-tTG w klasie IgA + całkowite IgA. Celiakia występuje 10-15 razy częściej u osób z wrodzonym selektywnym niedoborem IgA (ok. 2-3% chorych na celiakię ma niedobór IgA!). Bez jednoczesnego zbadania całkowitego IgA ujemny wynik anty-tTG IgA byłby fałszywie ujemny, maskując ciężką chorobę."
          },
          {
            text: "Oznaczenie wyłącznie stężenia przeciwciał przeciwgliadynowych starej generacji (AGA) w klasie IgG.",
            correct: false,
            feedback: "❌ BŁĄD! Przeciwciała przeciwgliadynowe (AGA) cechują się bardzo niską swoistością i czułością i są obecnie całkowicie wycofane z algorytmów diagnostycznych celiakii."
          },
          {
            text: "Wykonanie testów skórnych punktowych (Prick-test) z glutenem i pszenicą.",
            correct: false,
            feedback: "❌ BŁĄD! Testy punktowe Prick wykrywają alergię IgE-zależną na pszenicę (np. pokrzywkę, anafilaksję), a NIE chorobę autoimmunologiczną, jaką jest celiakia."
          },
          {
            text: "Pobranie wymazu z jamy ustnej na obecność Candida albicans.",
            correct: false,
            feedback: "❌ BŁĄD! Drożdżyca jamy ustnej nie odpowiada za zanik kosmków jelitowych."
          }
        ]
      },
      {
        stepNum: 3,
        title: "Krok 3: Analiza wytycznych ESPGHAN 2020 – kwalifikacja do ścieżki bezbiopsyjnej",
        desc: "Otrzymujesz wyniki badań: całkowite stężenie IgA = 0.85 g/l (norma dla wieku, brak niedoboru IgA), natomiast stężenie przeciwciał anty-tTG IgA wynosi 145 RU/ml przy górnej granicy normy (GGN) wynoszącej 10 RU/ml (stężenie wynosi zatem 14.5-krotność GGN, czyli >=10x GGN!). Czy dziecko wymaga wykonania gastroskopii z biopsją dwunastnicy?",
        scenario: "Otrzymujesz wyniki badań: całkowite stężenie IgA = 0.85 g/l (norma dla wieku, brak niedoboru IgA), natomiast stężenie przeciwciał anty-tTG IgA wynosi 145 RU/ml przy górnej granicy normy (GGN) wynoszącej 10 RU/ml (stężenie wynosi zatem 14.5-krotność GGN, czyli >=10x GGN!). Czy dziecko wymaga wykonania gastroskopii z biopsją dwunastnicy?",
        options: [
          {
            text: "NIE wymaga biopsji jelitowej – zgodnie z wytycznymi ESPGHAN 2020, gdy anty-tTG IgA wynosi >=10x GGN, można rozpoznać celiakię na drodze 'ścieżki bezbiopsyjnej', pod warunkiem pobrania DRUGIEJ, niezależnej próbki krwi i potwierdzenia obecności przeciwciał przeciw endomysium w klasie IgA (EMA IgA).",
            correct: true,
            feedback: "✅ PRAWIDŁOWO! Przełomowa modyfikacja wytycznych ESPGHAN 2020: jeśli miano anty-tTG IgA przekracza dziesięciokrotność górnej granicy normy (>=10x GGN), u dzieci można postawić pewne rozpoznanie BEZ BIOPSJI dwunastnicy, jeśli w drugiej, oddzielnie pobranej próbce krwi wykaże się obecność przeciwciał przeciwendomyzjalnych (EMA IgA). ESPGHAN 2020 zniosło wymóg badania genetycznego HLA oraz wymóg obecności objawów klinicznych!"
          },
          {
            text: "TAK, biopsja dwunastnicy z pobraniem minimum 4 wycinków jest obligatoryjna u każdego bez wyjątku pacjenta przed włączeniem diety.",
            correct: false,
            feedback: "❌ BŁĄD! U dzieci spełniających kryterium anty-tTG >=10x GGN i EMA(+) biopsja nie jest konieczna i narażałaby małe dziecko na niepotrzebne znieczulenie ogólne."
          },
          {
            text: "NIE, wystarczy sam wynik anty-tTG bez pobierania drugiej próbki krwi na EMA.",
            correct: false,
            feedback: "❌ BŁĄD! Pobranie drugiej próbki krwi na EMA jest bezwzględnym warunkiem bezpieczeństwa, aby wykluczyć błąd laboratoryjny lub pomyłkę próbek przed zaleceniem diety na całe życie."
          },
          {
            text: "Biopsję można pominąć tylko wtedy, gdy dziecko ma jednocześnie cukrzycę typu 1.",
            correct: false,
            feedback: "❌ BŁĄD! Wytyczne ESPGHAN 2020 rozszerzyły ścieżkę bezbiopsyjną na WSZYSTKIE dzieci (zarówno z grup ryzyka, objawowe, jak i bezobjawowe), o ile spełniają kryterium >=10x GGN i EMA(+)."
          }
        ]
      },
      {
        stepNum: 4,
        title: "Krok 4: Weryfikacja serologiczna w drugiej próbce i interpretacja histopatologii",
        desc: "W drugiej próbce krwi wynik EMA IgA okazał się silnie dodatni (miano 1:160). Matka dopytuje jednak: 'Panie doktorze, a gdyby syn miał anty-tTG tylko 4x powyżej normy, co byśmy zrobili i co widać w wycinkach jelita przy celiakii?'. Jak wyjaśniasz klasyfikację Marsha?",
        scenario: "W drugiej próbce krwi wynik EMA IgA okazał się silnie dodatni (miano 1:160). Matka dopytuje jednak: 'Panie doktorze, a gdyby syn miał anty-tTG tylko 4x powyżej normy, co byśmy zrobili i co widać w wycinkach jelita przy celiakii?'. Jak wyjaśniasz klasyfikację Marsha?",
        options: [
          {
            text: "Gdy miano anty-tTG jest <10x GGN, konieczna jest gastroskopia z pobraniem min. 4 bioptatów z części zstępującej dwunastnicy i 1-2 z opuszki; w mikroskopie ocenia się skalę Marsha-Oberhubera: naciek limfocytów śródnabłonkowych IEL >25/100 enterocytów (Marsh 1), przerost krypt (Marsh 2) oraz zanik kosmków jelitowych (Marsh 3a-3c).",
            correct: true,
            feedback: "✅ PRAWIDŁOWO! Złoty standard histopatologiczny wg klasyfikacji Marsha: Marsh 1 (infiltracyjny – IELs >25 na 100 enterocytów), Marsh 2 (rozrostowy – przerost krypt), Marsh 3 (destrukcyjny – zanik kosmków: 3a częściowy, 3b subtotalny, 3c całkowity). Wycinki pobiera się z dwunastnicy zstępującej i opuszki, ponieważ zmiany w celiakii mogą mieć charakter ogniskowy."
          },
          {
            text: "Wycinki pobiera się wyłącznie z błony śluzowej żołądka, poszukując Helicobacter pylori.",
            correct: false,
            feedback: "❌ BŁĄD! Celiakia to enteropatia jelita cienkiego (dwunastnicy i jelita czczego), a nie żołądka."
          },
          {
            text: "Klasyfikacja Marsha ocenia obecność ziarniniaków nieserowaciejących w ścianie jelita.",
            correct: false,
            feedback: "❌ BŁĄD! Ziarniniaki nieserowaciejące są charakterystyczne dla choroby Leśniowskiego-Crohna, a nie celiakii."
          },
          {
            text: "Przy mianie <10x GGN celiakię wyklucza się definitywnie bez dalszych badań.",
            correct: false,
            feedback: "❌ BŁĄD! Każde dodatnie miano anty-tTG wymaga weryfikacji histopatologicznej w biopsji."
          }
        ]
      },
      {
        stepNum: 5,
        title: "Krok 5: Rola badań genetycznych HLA-DQ2 / HLA-DQ8 w celiakii",
        desc: "Ojciec dziecka wykonał prywatnie u syna test genetyczny, który wykazał obecność antygenu HLA-DQ2. Pyta zaniepokojony: 'Czy to oznacza, że syn ma 100% pewności ciężkiej postaci celiakii i ja na pewno też zachoruję?'. Jaka jest rzeczywista wartość kliniczna oznaczania HLA-DQ2/DQ8 wg wytycznych?",
        scenario: "Ojciec dziecka wykonał prywatnie u syna test genetyczny, który wykazał obecność antygenu HLA-DQ2. Pyta zaniepokojony: 'Czy to oznacza, że syn ma 100% pewności ciężkiej postaci celiakii i ja na pewno też zachoruję?'. Jaka jest rzeczywista wartość kliniczna oznaczania HLA-DQ2/DQ8 wg wytycznych?",
        options: [
          {
            text: "Badanie HLA ma niemal 100% UJEMNĄ wartość predykcyjną (brak HLA-DQ2 i HLA-DQ8 praktycznie wyklucza celiakię), ale bardzo NISKĄ DODATNIĄ wartość predykcyjną – HLA-DQ2/DQ8 występuje u 30-40% zdrowej populacji europejskiej, a tylko u 2-3% z nich rozwinie się choroba; obecność genu jest warunkiem koniecznym, ale niewystarczającym do rozpoznania.",
            correct: true,
            feedback: "✅ PRAWIDŁOWO! Żelazny fakt egzaminacyjny LEK: Cząsteczki HLA-DQ2 (90-95% chorych) lub HLA-DQ8 (5-10% chorych) warunkują prezentację deamidowanych peptydów gliadyny limfocytom T. Test genetyczny służy wyłącznie do WYKLUCZANIA celiakii (np. u osób na diecie bezglutenowej przed prowokacją lub w grupach ryzyka). Sama obecność genu NIE pozwala na postawienie diagnozy!"
          },
          {
            text: "Obecność HLA-DQ2 oznacza bezwzględną konieczność natychmiastowego usunięcia śledziony.",
            correct: false,
            feedback: "❌ BŁĄD! Absurdalne twierdzenie."
          },
          {
            text: "Geny HLA nie mają żadnego związku z układem odpornościowym ani celiakią.",
            correct: false,
            feedback: "❌ BŁĄD! HLA koduje główny układ zgodności tkankowej (MHC klasy II), kluczowy w patogenezie celiakii."
          },
          {
            text: "Celiakia jest dziedziczona w sposób sprzężony z chromosomem Y, więc chorują wyłącznie mężczyźni.",
            correct: false,
            feedback: "❌ BŁĄD! Celiakia częściej występuje u kobiet (stosunek K:M wynosi ok. 2:1)."
          }
        ]
      },
      {
        stepNum: 6,
        title: "Krok 6: Wdrożenie leczenia przyczynowego i wyrównanie niedoborów pokarmowych",
        desc: "Rozpoznanie celiakii zostało postawione zgodnie z kryteriami ESPGHAN 2020 (ścieżka bezbiopsyjna: anty-tTG >10x GGN + EMA dodatnie w 2. próbce). Jakie jest jedyne skuteczne leczenie przyczynowe oraz jakie leczenie wspomagające ordynujesz u Stasia w pierwszym etapie?",
        scenario: "Rozpoznanie celiakii zostało postawione zgodnie z kryteriami ESPGHAN 2020 (ścieżka bezbiopsyjna: anty-tTG >10x GGN + EMA dodatnie w 2. próbce). Jakie jest jedyne skuteczne leczenie przyczynowe oraz jakie leczenie wspomagające ordynujesz u Stasia w pierwszym etapie?",
        options: [
          {
            text: "Ścisła, bezwzględna i trwająca przez CAŁE ŻYCIE dieta bezglutenowa (GFD z eliminacją pszenicy, żyta, jęczmienia; dozwolony certyfikowany owies bezglutenowy, próg glutenu <20 ppm) oraz suplementacja doustna żelaza (3-6 mg/kg m.c./dobę), witaminy D3 (1000-2000 IU/d), kwasu foliowego i wapnia do czasu regeneracji kosmków.",
            correct: true,
            feedback: "✅ PRAWIDŁOWO! Podstawą terapii jest dieta bezglutenowa (produkty z symbolem przekreślonego kłosa, zawartość glutenu <20 mg/kg - 20 ppm). Zabronione są: pszenica (w tym orkisz, płaskurka, samopsza, kamut), żyto, jęczmień i zwykły zanieczyszczony owies. Suplementacja żelaza, kwasu foliowego i witaminy D jest konieczna w początkowym okresie z powodu wyczerpania zapasów ustrojowych."
          },
          {
            text: "Włączenie prednizonu w dawce 2 mg/kg przez 6 miesięcy bez konieczności modyfikacji diety.",
            correct: false,
            feedback: "❌ BŁĄD! Glikokortykosteroidy NIE są leczeniem pierwszego rzutu w celiakii (stosuje się je wyłącznie w rzadkim, zagrażającym życiu przełomie celiakalnym lub celiakii opornej na leczenie)."
          },
          {
            text: "Dieta bezglutenowa stosowana jedynie przez 6 miesięcy, po czym powrót do normalnego żywienia.",
            correct: false,
            feedback: "❌ BŁĄD! Celiakia jest chorobą nieuleczalną trwającą całe życie – ponowna ekspozycja na gluten w dowolnym wieku wywoła nawrót atrofii kosmków i powikłań onkologicznych."
          },
          {
            text: "Zalecenie picia wyłącznie naparów z rumianku i zakaz jedzenia warzyw.",
            correct: false,
            feedback: "❌ BŁĄD! Dziecko wymaga pełnowartościowej, gęstej odżywczo diety bezglutenowej."
          }
        ]
      },
      {
        stepNum: 7,
        title: "Krok 7: Monitorowanie adherencji do diety i dynamiki serologicznej",
        desc: "Rodzice pytają, po jakim czasie ustąpią objawy kliniczne i jak będziemy kontrolować, czy Staś przypadkowo nie spożywa ukrytego glutenu. Jak wygląda prawidłowy harmonogram monitorowania leczenia wg wytycznych?",
        scenario: "Rodzice pytają, po jakim czasie ustąpią objawy kliniczne i jak będziemy kontrolować, czy Staś przypadkowo nie spożywa ukrytego glutenu. Jak wygląda prawidłowy harmonogram monitorowania leczenia wg wytycznych?",
        options: [
          {
            text: "Poprawa nastroju i łaknienia następuje w ciągu kilku dni, stolce normalizują się w ciągu 2-4 tygodni, a nadrabianie zaległości wzrostowo-wagowych (catch-up growth) trwa kilka miesięcy; laboratoryjnym markerem przestrzegania diety jest spadek miana przeciwciał anty-tTG IgA oznaczanych po 6 i 12 miesiącach od wdrożenia diety.",
            correct: true,
            feedback: "✅ PRAWIDŁOWO! Odpowiedź kliniczna na dietę bezglutenową jest spektakularna: dziecko w ciągu 2 tygodni staje się pogodne, znikają stolce tłuszczowe, a brzuch stopniowo maleje. Normalizacja miana przeciwciał anty-tTG IgA trwa zwykle od 6 do 12 (czasem 24) miesięcy. Utrzymywanie się wysokiego miana świadczy o błędach dietetycznych (gluten ukryty w lekach, wędlinach, sosach)."
          },
          {
            text: "Zalecenie kontrolnej gastroskopii z biopsją co 3 miesiące przez 5 lat.",
            correct: false,
            feedback: "❌ BŁĄD! U dzieci z dobrą odpowiedzią kliniczną i spadkiem miana przeciwciał rutynowa kontrolna biopsja jelitowa jest całkowicie zbędna."
          },
          {
            text: "Miano przeciwciał powinno spaść do zera w ciągu 48 godzin od pierwszej kromki chleba bezglutenowego.",
            correct: false,
            feedback: "❌ BŁĄD! Półokres trwania przeciwciał i wygaszanie klonów komórek plazmatycznych wymaga wielu miesięcy."
          },
          {
            text: "Brak konieczności jakichkolwiek badań kontrolnych po wypisie.",
            correct: false,
            feedback: "❌ BŁĄD! Monitorowanie wzrostu, masy ciała i serologii jest obligatoryjne."
          }
        ]
      },
      {
        stepNum: 8,
        title: "Krok 8: Badania przesiewowe u krewnych i profilaktyka powikłań odległych",
        desc: "Matka Stasia pyta: 'Mamy jeszcze 5-letnią córkę, która rozwija się prawidłowo i nie ma żadnych objawów. Czy ona też powinna zostać przebadana?'. Jakie grupy ryzyka wymagają aktywnego screeningu w kierunku celiakii i przed jakimi powikłaniami odległymi chroni wczesna diagnoza?",
        scenario: "Matka Stasia pyta: 'Mamy jeszcze 5-letnią córkę, która rozwija się prawidłowo i nie ma żadnych objawów. Czy ona też powinna zostać przebadana?'. Jakie grupy ryzyka wymagają aktywnego screeningu w kierunku celiakii i przed jakimi powikłaniami odległymi chroni wczesna diagnoza?",
        options: [
          {
            text: "Badania przesiewowe (anty-tTG IgA + całkowite IgA) bezwzględnie zaleca się u krewnych I stopnia (ryzyko celiakii ok. 10%) oraz w grupach wysokiego ryzyka: cukrzyca typu 1, autoimmunologiczne zapalenie tarczycy (Hashimoto), zespół Downa, zespół Turnera, zespół Williamsa i niedobór IgA; nieleczona celiakia grozi osteoporozą, niepłodnością, chorobami autoimmunologicznymi oraz chłoniakiem z komórek T związanym z enteropatią (EATL).",
            correct: true,
            feedback: "✅ PRAWIDŁOWO! Kanon wiedzy internistyczno-pediatrycznej LEK: krewni I stopnia pacjenta z celiakią mają 10-krotnie wyższe ryzyko zachorowania i nawet bez objawów wymagają okresowego oznaczania anty-tTG IgA. Grupy genetyczne wysokiego ryzyka (z. Downa, Turnera, Williamsa) oraz autoimmunologiczne (T1D, Hashimoto) podlegają rutynowemu skriningowi. Nieleczona celiakia zwiększa ryzyko chłoniaka jelita cienkiego (EATL – enteropathy-associated T-cell lymphoma) oraz raka gruczołowego jelita cienkiego!"
          },
          {
            text: "Krewnych nie bada się nigdy, ponieważ celiakia nie ma żadnego podłoża rodzinnego.",
            correct: false,
            feedback: "❌ BŁĄD! Celiakia wykazuje silną agregację rodzinną (zgodność u bliźniąt jednojajowych sięga 70-80%)."
          },
          {
            text: "Badania przesiewowe wykonuje się wyłącznie u osób po 70. roku życia.",
            correct: false,
            feedback: "❌ BŁĄD! Celiakia może ujawnić się w każdym wieku, ale screening u krewnych zaczyna się już we wczesnym dzieciństwie."
          },
          {
            text: "U siostry należy profilaktycznie usunąć całe jelito grube.",
            correct: false,
            feedback: "❌ BŁĄD! Niedorzeczne."
          }
        ]
      }
    ];

    c.pathoNodes = [
      {
        badge: "OGNIWO 1 • Podatność genetyczna i wnikanie peptydów gliadyny",
        title: "Bariera jelitowa, deamidacja gliadyny przez tTG-2 i prezentacja w rowku HLA-DQ2/DQ8",
        short: "Niestrawione fragmenty glutenu przenikają przez nabłonek jelitowy i są deamidowane przez transglutaminazę tkankową.",
        detail: "Gluten jest białkiem zapasowym zbóż (pszenica – gliadyna, żyto – sekalina, jęczmień – hordeina), bogatym w aminokwasy prolinę i glutaminę. Wiązania te są oporne na działanie enzymów soku żołądkowego i trzustkowego. Niestrawione 33-aminokwasowe oligopeptydy gliadyny przenikają przez barierę enterocytów (drogą transcytozy lub parakomórkowo w wyniku otwarcia połączeń ścisłych zonula occludens stymulowanego przez zonulinę) do blaszki właściwej błony śluzowej. Tam enzym transglutaminaza tkankowa 2 (tTG-2) katalizuje reakcję deamidacji reszt glutaminowych do kwasu glutaminowego. Nadaje to peptydom silny ujemny ładunek elektryczny, umożliwiając ich stabilne związanie w rowkach cząsteczek głównego układu zgodności tkankowej MHC klasy II: HLA-DQ2 (kodowanych przez allele DQA1*05:01/DQB1*02:01) lub HLA-DQ8 (DQA1*03:01/DQB1*03:02) na komórkach prezentujących antygen (dendrytycznych i makrofagach).",
        target: "Transglutaminaza tkankowa 2 (tTG-2) oraz cząsteczki prezentujące antygen HLA-DQ2 / HLA-DQ8",
        desc: "Bariera jelitowa, deamidacja gliadyny przez tTG-2 i prezentacja w rowku HLA-DQ2/DQ8."
      },
      {
        badge: "OGNIWO 2 • Odpowiedź immunologiczna swoista i cytotoksyczność",
        title: "Aktywacja limfocytów Th1, interleukiny IL-15 oraz śródnabłonkowa liza enterocytów",
        short: "Limfocyty Th1 wydzielają IFN-gamma, a aktywowane IL-15 limfocyty CD8+ (IEL) niszczą enterocyty.",
        detail: "Kompleks peptyd gliadynowy–HLA-DQ2/8 aktywuje naiwne limfocyty CD4+ pomocnicze, które polaryzują w kierunku fenotypu Th1 i Th17. Dochodzi do masywnego wyrzutu prozapalnych cytokin: interferonu gamma (IFN-γ), czynnika martwicy nowotworów (TNF-α) oraz interleukiny 21 (IL-21). Równolegle w enterocytach pod wpływem nienadtrawionych fragmentów gliadyny (np. p31-43) dochodzi do nadrzędnej ekspresji interleukiny 15 (IL-15). IL-15 przeprogramowuje limfocyty śródnabłonkowe (IEL – intraepithelial lymphocytes) CD8+ w komórki NK-podobne (cytotoksyczne), indukując na nich ekspresję receptora aktywującego NKG2D. Enterocyty poddane stresowi zapalnemu prezentują na swojej powierzchni ligandy MICA/MICB. Połączenie NKG2D z MICA wyzwala uwolnienie perforyn i granzymów, prowadząc do apoptozy enterocytów i rozległego niszczenia nabłonka kosmków.",
        target: "Szlaki sygnałowe IL-15, receptor NKG2D oraz kaskada cytotoksyczna perforyn i granzymów",
        desc: "Aktywacja limfocytów Th1, interleukiny IL-15 oraz śródnabłonkowa liza enterocytów."
      },
      {
        badge: "OGNIWO 3 • Histopatologia jelitowa – Sekwencja Marsha",
        title: "Atrofia kosmków dwunastnicy, hiperplazja krypt i zanik powierzchni chłonnej",
        short: "Progresja zmian od nacieku IEL (Marsh 1), przez przerost krypt (Marsh 2), do całkowitej atrofii kosmków (Marsh 3c).",
        detail: "Śmierć enterocytów stymuluje komórki macierzyste krypt jelitowych do gwałtownej proliferacji w próbie regeneracji nabłonka. Prowadzi to do charakterystycznego obrazu histopatologicznego opisanego przez Michaela Marsha: Stadium 1 (naciekowy) – prawidłowa architektura kosmków i krypt, ale ze wzrostem liczby limfocytów śródnabłonkowych >25 na 100 enterocytów (IEL-osis); Stadium 2 (hiperplastyczny) – naciek IEL połączony z pogłębieniem i rozrostem krypt jelitowych; Stadium 3 (destrukcyjny) – atrofia kosmków jelitowych: 3a (częściowa – partial villous atrophy), 3b (subtotalna – subtotal villous atrophy) oraz 3c (całkowita – total villous atrophy, błona śluzowa staje się całkowicie płaska). W wyniku zaniku kosmków powierzchnia chłonna przewodu pokarmowego ulega drastycznej redukcji (nawet o 95%), co paraliżuje transport substancji odżywczych.",
        target: "Architektura kosmków i krypt dwunastnicy (ocena bioptatów w mikroskopii świetlnej)",
        desc: "Atrofia kosmków dwunastnicy, hiperplazja krypt i zanik powierzchni chłonnej."
      },
      {
        badge: "OGNIWO 4 • Skutki ogólnoustrojowe i zaburzenia wchłaniania",
        title: "Selektywna enteropatia proksymalna: anemia, osteopenia i biegunka tłuszczowa",
        short: "Zanik kosmków w dwunastnicy blokuje wchłanianie żelaza, kwasu foliowego, tłuszczów i witamin rozpuszczalnych w lipidach.",
        detail: "Zanik kosmków ma największe nasilenie w opuszkowej i zstępującej części dwunastnicy oraz początkowym odcinku jelita czczego – strefach odpowiedzialnych za absorpcję żelaza, wapnia i folianów. Prowadzi to do niedokrwistości mikrocytarnej hiposideremicznej (z niską ferrytyną), opornej na suplementację doustną. Zniszczenie rąbka szczoteczkowego enterocytów powoduje wtórny niedobór disacharydaz (głównie laktazy), co wywołuje fermentacyjną biegunkę osmotyczną po spożyciu laktozy. Upośledzenie wchłaniania kwasów tłuszczowych skutkuje biegunką tłuszczową i ucieczką witamin rozpuszczalnych w tłuszczach (wit. D, A, E, K). Niewchłonięte kwasy tłuszczowe wiążą w świetle jelita zjonizowany wapń (tworząc nierozpuszczalne mydła wapniowe), co potęguje hipokalcemię, osteopenię i krzywicę hipowitaminozową u rosnącego dziecka.",
        target: "Transport jelitowy żelaza (DMT-1, ferroportyna), laktaza rąbka szczoteczkowego i wchłanianie micelarne",
        desc: "Selektywna enteropatia proksymalna: anemia, osteopenia i biegunka tłuszczowa."
      }
    ];

    c.diffTable = {
      title: "⚔️ Diagnostyka różnicowa przewlekłego zespołu złego wchłaniania, biegunki i zaburzeń wzrastania u dzieci",
      headers: [
        "Cecha kliniczna / laboratoryjna",
        "Celiakia (Choroba trzewna)",
        "Mukowiscydoza (Cystic Fibrosis)",
        "Alergia na białka mleka krowiego (ABMK)"
      ],
      rows: [
        [
          "Patomechanizm",
          "Autoimmunologiczna enteropatia wyzwalana glutenem u osób HLA-DQ2/DQ8",
          "Mutacja genu CFTR – zaburzenie transportu Cl- i zagęszczenie wydzielin",
          "Reakcja nadwrażliwości (IgE-zależna lub IgE-niezależna) na kazeinę/serwatkę"
        ],
        [
          "Wiek manifestacji",
          "Zwykle po 6-9 m.ż. (po wprowadzeniu zbóż/glutenu do diety)",
          "Od okresu noworodkowego (niedrożność smółkowa) lub wczesnoniemowlęcego",
          "Pierwsze miesiące życia (często po przejściu na mleko modyfikowane)"
        ],
        [
          "Charakter stolców",
          "Obfite, lśniące, blade, cuchnące stolce tłuszczowe, trudne do spłukania",
          "Bardzo obfite stolce tłuszczowe, ostre objawy zewnątrzwydzielniczej niewydolności trzustki",
          "Luźne stolce ze śluzem i smugami świeżej krwi (alergiczne zapalenie prostnicy)"
        ],
        [
          "Objawy pozajelitowe",
          "Apatia, zanik mięśni pośladków, 'brzuch żabi', oporna anemia mikrocytarna",
          "Nawracające zapalenia płuc/oskrzeli, rozstrzenie oskrzeli, polipy nosa, słony pot",
          "Zmiany skórne (AZS, wyprysk atopowy, ciemieniucha), objawy oddechowe, kolki"
        ],
        [
          "Badania serologiczne / laboratoryjne",
          "Anty-tTG IgA wybitnie podwyższone (często >10x GGN), EMA IgA dodatnie",
          "Stężenie elastazy-1 w stolcu <200 µg/g (ciężka niewydolność <100 µg/g)",
          "Miano anty-tTG ujemne; w postaci IgE-zależnej dodatnie sIgE lub Prick-test"
        ],
        [
          "Złoty standard potwierdzenia",
          "Kryteria ESPGHAN 2020 (ścieżka serologiczna anty-tTG>=10xGGN + EMA lub biopsja Marsh 3)",
          "Test potowy (chlorki w pocie >=60 mmol/L w dwóch niezależnych próbach) + genetyka CFTR",
          "Próba eliminacji białek mleka krowiego (2-4 tyg.) i próba prowokacji (podwójnie ślepa)"
        ],
        [
          "Biopsja jelita cienkiego",
          "Zanik kosmków, przerost krypt, naciek limfocytów IEL (klasyfikacja Marsha 1-3)",
          "Błona śluzowa prawidłowa, poszerzone krypty wypełnione gęstym śluzem",
          "Prawidłowe kosmki lub niewielki naciek eozynofilowy w blaszce właściwej"
        ],
        [
          "Leczenie z wyboru",
          "Ścisła, bezwzględna dieta bezglutenowa (GFD) przez całe życie",
          "Substytucja enzymów trzustkowych (Kreon) + witaminy ADEK + modulatory CFTR",
          "Mieszanka o wysokim stopniu hydrolizy (eHF) lub mieszanka aminokwasowa (AAF)"
        ]
      ]
    };

    c.dutySummary = {
      overview: "Celiakia (choroba trzewna) jest ogólnoustrojową chorobą autoimmunologiczną wyzwalaną spożyciem glutenu (pszenica, żyto, jęczmień) u osób predysponowanych genetycznie (HLA-DQ2 lub HLA-DQ8). Charakteryzuje się zależną od glutenu enteropatią z atrofią kosmków jelitowych, obecnością swoistych autoprzeciwciał (anty-tTG IgA, EMA IgA) oraz szerokim spektrum manifestacji klinicznych (od klasycznej triady złego wchłaniania u niemowląt po izolowaną anemię, afty czy osteoporozę u dorosłych).",
      diagnostics: "1) Test I rzutu: jednoczesne oznaczenie anty-tTG IgA + całkowite stężenie IgA (wykluczenie wrodzonego niedoboru IgA!).<br>2) Przy prawidłowym IgA i anty-tTG >=10x GGN: wdrożenie ścieżki bezbiopsyjnej wg ESPGHAN 2020 -> pobranie DRUGIEJ próbki krwi na EMA IgA. Gdy EMA(+) -> pewne rozpoznanie celiakii BEZ konieczności biopsji i BEZ badania HLA!<br>3) Przy anty-tTG <10x GGN: gastroskopia z pobraniem min. 4 wycinków z dwunastnicy zstępującej i min. 1 z opuszki (ocena w skali Marsha 1-3).<br>4) Przy selektywnym niedoborze IgA (całkowite IgA <0.2 g/l): oznaczenie przeciwciał w klasie IgG: anty-tTG IgG lub anty-DGP IgG (przeciw deamidowanym peptydom gliadyny).<br>5) Badanie genetyczne HLA-DQ2/DQ8 ma niemal 100% ujemną wartość predykcyjną (służy do wykluczenia celiakii).",
      drugsAndDoses: "• <span class='dose-pill'>Dieta bezglutenowa (GFD)</span>: jedyne leczenie przyczynowe, trwające przez całe życie (eliminacja pszenicy, żyta, jęczmienia; próg <20 ppm glutenu).<br>• <span class='dose-pill'>Żelazo doustne</span>: siarczan żelazawy lub preparaty żelaza elementarnego 3–6 mg Fe/kg m.c./dobę w 2–3 dawkach podzielonych między posiłkami (leczenie anemii mikrocytarnej przez min. 3 miesiące).<br>• <span class='dose-pill'>Witamina D3</span>: 1000–2000 IU/dobę p.o. w zależności od wyjściowego stężenia 25(OH)D.<br>• <span class='dose-pill'>Kwas foliowy</span>: 1–5 mg/dobę p.o. przez pierwsze 1–2 miesiące terapii.<br>• <span class='dose-pill'>Wapń elementarny</span>: 500–1000 mg/dobę p.o. w razie cech hipokalcemii / osteopenii.",
      procedures: "Konsultacja certyfikowanego dietetyka klinicznego biegłego w diecie bezglutenowej; edukacja rodziców w zakresie czytania etykiet (certyfikat Przekreślonego Kłosa) i zapobiegania zanieczyszczeniom krzyżowym w kuchni; u dzieci niekwalifikujących się do ścieżki bezbiopsyjnej – ezofagogastroduodenoskopia w znieczuleniu ogólnym z wielomiejscową biopsją dwunastnicy.",
      monitoring: "Kontrola kliniczna (masa ciała, wzrost, obwód brzucha, stan skóry i zębów) co 3–6 miesięcy w 1. roku leczenia; kontrolne oznaczenie przeciwciał anty-tTG IgA po 6 i 12 miesiącach od wdrożenia diety (normalizacja miana świadczy o pełnej adherencji); badania przesiewowe (anty-tTG IgA + IgA całk.) u wszystkich krewnych I stopnia oraz coroczny monitoring w grupach ryzyka (cukrzyca typu 1, zapalenie tarczycy Hashimoto, zespół Downa, zespół Turnera)."
    };

    c.lekQuestions = [
      {
        tag: "📋 WYTYCZNE ESPGHAN 2020 / ŚCIEŻKA BEZBIOPSYJNA",
        q: "Zgodnie z aktualnymi wytycznymi Europejskiego Towarzystwa Gastroenterologii, Hepatologii i Żywienia Dzieci (ESPGHAN 2020), rozpoznanie celiakii u dziecka może zostać postawione bez konieczności wykonywania gastroskopii i biopsji dwunastnicy (tzw. ścieżka bezbiopsyjna), jeśli spełnione są następujące kryteria:",
        opts: [
          "A) Stężenie przeciwciał anty-tTG IgA wynosi ≥10-krotność górnej granicy normy (GGN) oraz w drugiej, niezależnie pobranej próbce krwi potwierdzono obecność przeciwciał przeciwendomyzjalnych w klasie IgA (EMA IgA)",
          "B) Stężenie przeciwciał anty-tTG IgA wynosi ≥5-krotność GGN oraz wykazano obecność antygenów HLA-DQ2 lub HLA-DQ8",
          "C) Stężenie przeciwciał anty-DGP IgG jest dodatnie oraz dziecko prezentuje klasyczną triadę objawów klinicznych",
          "D) Stężenie przeciwciał anty-tTG IgA wynosi ≥10-krotność GGN, wykazano obecność HLA-DQ2/DQ8 oraz dziecko bezwzględnie prezentuje objawy zespołu złego wchłaniania",
          "E) Gastroskopia z biopsją dwunastnicy jest bezwzględnie wymagana u każdego dziecka przed postawieniem rozpoznania celiakii"
        ],
        options: [
          "A) Stężenie przeciwciał anty-tTG IgA wynosi ≥10-krotność górnej granicy normy (GGN) oraz w drugiej, niezależnie pobranej próbce krwi potwierdzono obecność przeciwciał przeciwendomyzjalnych w klasie IgA (EMA IgA)",
          "B) Stężenie przeciwciał anty-tTG IgA wynosi ≥5-krotność GGN oraz wykazano obecność antygenów HLA-DQ2 lub HLA-DQ8",
          "C) Stężenie przeciwciał anty-DGP IgG jest dodatnie oraz dziecko prezentuje klasyczną triadę objawów klinicznych",
          "D) Stężenie przeciwciał anty-tTG IgA wynosi ≥10-krotność GGN, wykazano obecność HLA-DQ2/DQ8 oraz dziecko bezwzględnie prezentuje objawy zespołu złego wchłaniania",
          "E) Gastroskopia z biopsją dwunastnicy jest bezwzględnie wymagana u każdego dziecka przed postawieniem rozpoznania celiakii"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowa odpowiedź to A. Zgodnie z wytycznymi ESPGHAN 2020: 1) Stężenie anty-tTG IgA musi wynosić ≥10x GGN; 2) Obecność przeciwciał EMA IgA musi zostać potwierdzona w DRUGIEJ, niezależnie pobranej próbce krwi. Wytyczne z 2020 roku zniosły wymóg badania genetycznego HLA oraz zrezygnowały z warunku obecności objawów klinicznych (ścieżka bezbiopsyjna ma zastosowanie również u dzieci bezobjawowych, np. badanych przesiewowo w cukrzycy t. 1).",
        expl: "Prawidłowa odpowiedź to A. Zgodnie z wytycznymi ESPGHAN 2020: 1) Stężenie anty-tTG IgA musi wynosić ≥10x GGN; 2) Obecność przeciwciał EMA IgA musi zostać potwierdzona w DRUGIEJ, niezależnie pobranej próbce krwi. Wytyczne z 2020 roku zniosły wymóg badania genetycznego HLA oraz zrezygnowały z warunku obecności objawów klinicznych (ścieżka bezbiopsyjna ma zastosowanie również u dzieci bezobjawowych, np. badanych przesiewowo w cukrzycy t. 1)."
      },
      {
        tag: "🧪 DIAGNOSTYKA SEROLOGICZNA / NIEDOBÓR IgA",
        q: "Dlaczego u każdego pacjenta z podejrzeniem celiakii rutynowym badaniem pierwszego rzutu obok oznaczania przeciwciał przeciwko transglutaminazie tkankowej w klasie IgA (anty-tTG IgA) jest oznaczenie całkowitego stężenia immunoglobuliny A (całkowitego IgA)?",
        opts: [
          "A) Selektywny niedobór IgA występuje u chorych na celiakię 10–15 razy częściej niż w populacji ogólnej i w razie jego obecności test anty-tTG IgA da fałszywie ujemny wynik",
          "B) Wysokie stężenie całkowitego IgA jest bezpośrednim kryterium rozpoznania atrofii kosmków jelitowych",
          "C) Całkowite IgA jest enzymem trawiącym gluten w świetle przewodu pokarmowego",
          "D) Badanie to służy do wykluczenia szpiczaka mnogiego u dzieci",
          "E) Jeśli całkowite IgA jest prawidłowe, wyklucza to definitywnie celiakię"
        ],
        options: [
          "A) Selektywny niedobór IgA występuje u chorych na celiakię 10–15 razy częściej niż w populacji ogólnej i w razie jego obecności test anty-tTG IgA da fałszywie ujemny wynik",
          "B) Wysokie stężenie całkowitego IgA jest bezpośrednim kryterium rozpoznania atrofii kosmków jelitowych",
          "C) Całkowite IgA jest enzymem trawiącym gluten w świetle przewodu pokarmowego",
          "D) Badanie to służy do wykluczenia szpiczaka mnogiego u dzieci",
          "E) Jeśli całkowite IgA jest prawidłowe, wyklucza to definitywnie celiakię"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowa odpowiedź to A. Wrodzony niedobór IgA występuje w populacji u 1:600 osób, ale u chorych na celiakię aż u 1:40 (2-3%). Przy całkowitym stężeniu IgA <0.2 g/l pacjent nie syntetyzuje żadnych przeciwciał w klasie IgA, co skutkuje fałszywie ujemnym wynikiem testu anty-tTG IgA. W takim przypadku diagnostykę opiera się na przeciwciałach w klasie IgG (anty-tTG IgG lub anty-DGP IgG).",
        expl: "Prawidłowa odpowiedź to A. Wrodzony niedobór IgA występuje w populacji u 1:600 osób, ale u chorych na celiakię aż u 1:40 (2-3%). Przy całkowitym stężeniu IgA <0.2 g/l pacjent nie syntetyzuje żadnych przeciwciał w klasie IgA, co skutkuje fałszywie ujemnym wynikiem testu anty-tTG IgA. W takim przypadku diagnostykę opiera się na przeciwciałach w klasie IgG (anty-tTG IgG lub anty-DGP IgG)."
      },
      {
        tag: "🧬 GENETYKA HLA / KOMBINATORYKA CEM",
        q: "Oceń prawdziwość poniższych twierdzeń dotyczących genotypowania układu HLA w diagnostyce celiakii:\n1. Obecność cząsteczek HLA-DQ2 lub HLA-DQ8 stwierdza się u niemal 100% chorych na celiakię.\n2. Brak cząsteczek HLA-DQ2 i HLA-DQ8 ma bardzo wysoką wartość predykcyjną ujemną (prawie 100%) i praktycznie wyklucza rozpoznanie celiakii.\n3. Wykrycie HLA-DQ2 u osoby bezobjawowej jest wystarczające do postawienia pewnego rozpoznania celiakii i włączenia diety bezglutenowej.\n4. HLA-DQ2 i/lub HLA-DQ8 występuje u około 30–40% zdrowej populacji rasy kaukaskiej.\n5. Badanie HLA jest rutynowo zalecane u każdego pacjenta wg wytycznych ESPGHAN 2020.\nPrawdziwe są:",
        opts: [
          "A) 1, 2, 4",
          "B) 1, 3, 5",
          "C) 2, 3, 4",
          "D) 1, 2, 3, 4",
          "E) Wszystkie wymienione"
        ],
        options: [
          "A) 1, 2, 4",
          "B) 1, 3, 5",
          "C) 2, 3, 4",
          "D) 1, 2, 3, 4",
          "E) Wszystkie wymienione"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowa odpowiedź to A (zdania 1, 2, 4 są prawdziwe). Zdanie 3 jest fałszywe: dodatnia wartość predykcyjna HLA jest bardzo niska (tylko 2-3% nosicieli HLA-DQ2 zachoruje na celiakię) – samo HLA nigdy nie upoważnia do rozpoznania choroby! Zdanie 5 jest fałszywe: wytyczne ESPGHAN 2020 wykreśliły badanie HLA z rutynowego algorytmu ścieżki bezbiopsyjnej (nie jest już ono wymagane).",
        expl: "Prawidłowa odpowiedź to A (zdania 1, 2, 4 są prawdziwe). Zdanie 3 jest fałszywe: dodatnia wartość predykcyjna HLA jest bardzo niska (tylko 2-3% nosicieli HLA-DQ2 zachoruje na celiakię) – samo HLA nigdy nie upoważnia do rozpoznania choroby! Zdanie 5 jest fałszywe: wytyczne ESPGHAN 2020 wykreśliły badanie HLA z rutynowego algorytmu ścieżki bezbiopsyjnej (nie jest już ono wymagane)."
      },
      {
        tag: "🔬 HISTOPATOLOGIA / SKALA MARSHA",
        q: "Wskaż cechę histopatologiczną błony śluzowej dwunastnicy, która odpowiada stopniowi Marsh 1 w klasyfikacji Marsha-Oberhubera stosowanej w ocenie celiakii:",
        opts: [
          "A) Prawidłowa architektura kosmków i krypt ze zwiększeniem liczby limfocytów śródnabłonkowych (IEL) >25 na 100 enterocytów",
          "B) Całkowity zanik kosmków jelitowych z obecnością wrzodów błony śluzowej",
          "C) Przerost krypt jelitowych przy całkowitym braku limfocytów w nabłonku",
          "D) Obecność nieserowaciejących ziarniniaków w błonie podśluzowej",
          "E) Wypadanie komórek Panetha i obrzęk podśluzówkowy"
        ],
        options: [
          "A) Prawidłowa architektura kosmków i krypt ze zwiększeniem liczby limfocytów śródnabłonkowych (IEL) >25 na 100 enterocytów",
          "B) Całkowity zanik kosmków jelitowych z obecnością wrzodów błony śluzowej",
          "C) Przerost krypt jelitowych przy całkowitym braku limfocytów w nabłonku",
          "D) Obecność nieserowaciejących ziarniniaków w błonie podśluzowej",
          "E) Wypadanie komórek Panetha i obrzęk podśluzówkowy"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowa odpowiedź to A. Klasyfikacja Marsha: Marsh 0 – błona śluzowa prawidłowa; Marsh 1 (typ naciekowy) – prawidłowe kosmki i krypty, ale patologiczny naciek IEL >25 na 100 enterocytów; Marsh 2 (typ rozrostowy) – IELs + przerost krypt; Marsh 3 (typ destrukcyjny) – atrofia kosmków (3a częściowa, 3b subtotalna, 3c całkowita).",
        expl: "Prawidłowa odpowiedź to A. Klasyfikacja Marsha: Marsh 0 – błona śluzowa prawidłowa; Marsh 1 (typ naciekowy) – prawidłowe kosmki i krypty, ale patologiczny naciek IEL >25 na 100 enterocytów; Marsh 2 (typ rozrostowy) – IELs + przerost krypt; Marsh 3 (typ destrukcyjny) – atrofia kosmków (3a częściowa, 3b subtotalna, 3c całkowita)."
      },
      {
        tag: "❌ WSKAŻ FAŁSZYWE / MANIFESTACJE KLINICZNE",
        q: "Wskaż zdanie FAŁSZYWE dotyczące obrazu klinicznego i powikłań celiakii:",
        opts: [
          "A) Niedokrwistość z niedoboru żelaza w celiakii charakteryzuje się podwyższonym stężeniem ferrytyny i makrocytozą",
          "B) Opryszczkowate zapalenie skóry (Dermatitis herpetiformis Duhringa) jest uważane za skórną manifestację celiakii i cechuje się obecnością złogów IgA w brodawkach skóry",
          "C) U pacjentów z nieleczoną celiakią występuje podwyższone ryzyko rozwoju chłoniaka z komórek T związanego z enteropatią (EATL)",
          "D) Przełom celiakalny (coeliac crisis) jest rzadkim, zagrażającym życiu stanem z ciężką biegunką, hipokaliemią, kwasicą i odwodnieniem wymagającym hospitalizacji",
          "E) U wielu dzieci starszych i dorosłych celiakia może przebiegać nietypowo (skąpoobjawowo), manifestując się wyłącznie niskorosłością, aftami lub defektami szkliwa zębowego"
        ],
        options: [
          "A) Niedokrwistość z niedoboru żelaza w celiakii charakteryzuje się podwyższonym stężeniem ferrytyny i makrocytozą",
          "B) Opryszczkowate zapalenie skóry (Dermatitis herpetiformis Duhringa) jest uważane za skórną manifestację celiakii i cechuje się obecnością złogów IgA w brodawkach skóry",
          "C) U pacjentów z nieleczoną celiakią występuje podwyższone ryzyko rozwoju chłoniaka z komórek T związanego z enteropatią (EATL)",
          "D) Przełom celiakalny (coeliac crisis) jest rzadkim, zagrażającym życiu stanem z ciężką biegunką, hipokaliemią, kwasicą i odwodnieniem wymagającym hospitalizacji",
          "E) U wielu dzieci starszych i dorosłych celiakia może przebiegać nietypowo (skąpoobjawowo), manifestując się wyłącznie niskorosłością, aftami lub defektami szkliwa zębowego"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowa odpowiedź to A (zdanie fałszywe). W celiakii niedokrwistość z niedoboru żelaza (wynikająca z zaniku kosmków dwunastnicy) jest typową niedokrwistością mikrocytarną (MCV <80 fl) i hiposideremiczną z BARDZO NISKIM stężeniem ferrytyny (wyczerpanie zapasów żelaza). Makrocytoza może wystąpić jedynie przy dominującym niedoborze kwasu foliowego lub witaminy B12, ale ferrytyna w niedoborze żelaza nigdy nie jest podwyższona.",
        expl: "Prawidłowa odpowiedź to A (zdanie fałszywe). W celiakii niedokrwistość z niedoboru żelaza (wynikająca z zaniku kosmków dwunastnicy) jest typową niedokrwistością mikrocytarną (MCV <80 fl) i hiposideremiczną z BARDZO NISKIM stężeniem ferrytyny (wyczerpanie zapasów żelaza). Makrocytoza może wystąpić jedynie przy dominującym niedoborze kwasu foliowego lub witaminy B12, ale ferrytyna w niedoborze żelaza nigdy nie jest podwyższona."
      },
      {
        tag: "🍞 DIETETYKA / PRODUKTY BEZGLUTENOWE",
        q: "Zgodnie z prawodawstwem Unii Europejskiej oraz standardami Codex Alimentarius, produkt żywnościowy może być oznaczony jako 'produkt bezglutenowy' (gluten-free) i opatrzony licencjonowanym symbolem przekreślonego kłosa, jeżeli zawartość glutenu w gotowym produkcie nie przekracza:",
        opts: [
          "A) 20 mg/kg (20 ppm)",
          "B) 100 mg/kg (100 ppm)",
          "C) 0 mg/kg (absolutne zero)",
          "D) 50 mg/kg (50 ppm)",
          "E) 200 mg/kg (200 ppm)"
        ],
        options: [
          "A) 20 mg/kg (20 ppm)",
          "B) 100 mg/kg (100 ppm)",
          "C) 0 mg/kg (absolutne zero)",
          "D) 50 mg/kg (50 ppm)",
          "E) 200 mg/kg (200 ppm)"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowa odpowiedź to A. Zgodnie z Rozporządzeniem Wykonawczym Komisji (UE) nr 828/2014 określenie 'bezglutenowy' (gluten-free) jest zastrzeżone dla żywności zawierającej nie więcej niż 20 mg/kg (20 ppm) glutenu. Żywność o zawartości 21–100 mg/kg może być określana jedynie jako 'produkt o bardzo niskiej zawartości glutenu' (very low gluten).",
        expl: "Prawidłowa odpowiedź to A. Zgodnie z Rozporządzeniem Wykonawczym Komisji (UE) nr 828/2014 określenie 'bezglutenowy' (gluten-free) jest zastrzeżone dla żywności zawierającej nie więcej niż 20 mg/kg (20 ppm) glutenu. Żywność o zawartości 21–100 mg/kg może być określana jedynie jako 'produkt o bardzo niskiej zawartości glutenu' (very low gluten)."
      },
      {
        tag: "👨‍👩‍👧 SCREENING / GRUPY WYSOKIEGO RYZYKA",
        q: "U których z wymienionych pacjentów bezwzględnie zaleca się wykonanie przesiewowych badań serologicznych w kierunku celiakii (anty-tTG IgA + całkowite IgA), nawet przy całkowitym braku objawów ze strony przewodu pokarmowego?\n1. Krewni I stopnia pacjenta ze zdiagnozowaną celiakią\n2. Dzieci z nowo rozpoznaną cukrzycą typu 1\n3. Dzieci z zespołem Downa\n4. Dzieci z zespołem Turnera lub zespołem Williamsa\n5. Pacjenci z autoimmunologicznym zapaleniem tarczycy (choroba Hashimoto)\nPrawidłowa odpowiedź to:",
        opts: [
          "A) Wszystkie wymienione (1, 2, 3, 4, 5)",
          "B) Tylko 1 i 2",
          "C) Tylko 1, 2, 3",
          "D) Tylko 2 i 5",
          "E) Żadne z powyższych – bada się wyłącznie osoby objawowe"
        ],
        options: [
          "A) Wszystkie wymienione (1, 2, 3, 4, 5)",
          "B) Tylko 1 i 2",
          "C) Tylko 1, 2, 3",
          "D) Tylko 2 i 5",
          "E) Żadne z powyższych – bada się wyłącznie osoby objawowe"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowa odpowiedź to A (wszystkie wymienione). W celiakii obowiązuje tzw. strategia aktywnego poszukiwania przypadków (active case finding). Ryzyko celiakii u krewnych I stopnia wynosi ok. 10%, w cukrzycy t. 1: 5-8%, w zespole Downa: 5-12%, w zespole Turnera: 4-8%, a w chorobie Hashimoto: 3-5%. Wszystkie te grupy podlegają aktywnemu przesiewowi serologicznemu.",
        expl: "Prawidłowa odpowiedź to A (wszystkie wymienione). W celiakii obowiązuje tzw. strategia aktywnego poszukiwania przypadków (active case finding). Ryzyko celiakii u krewnych I stopnia wynosi ok. 10%, w cukrzycy t. 1: 5-8%, w zespole Downa: 5-12%, w zespole Turnera: 4-8%, a w chorobie Hashimoto: 3-5%. Wszystkie te grupy podlegają aktywnemu przesiewowi serologicznemu."
      },
      {
        tag: "⚠️ BŁĘDY DIAGNOSTYCZNE / PROWOKACJA GLUTENEM",
        q: "Do poradni zgłasza się 25-letnia kobieta, która od 2 lat stosuje ścisłą dietę bezglutenową, na którą przeszła samodzielnie z powodu wzdęć brzucha. Obecnie chce formalnie potwierdzić, czy choruje na celiakię. Badanie anty-tTG IgA wykonane wczoraj dało wynik ujemny (<2 RU/ml). Jakie powinno być prawidłowe postępowanie lekarza?",
        opts: [
          "A) Poinformowanie pacjentki, że badanie serologiczne na diecie bezglutenowej jest niewiarygodne; w celu postawienia diagnozy konieczna jest próba prowokacji glutenem (spożywanie min. 3–10 g glutenu/dobę przez min. 6–12 tygodni) i ponowne oznaczenie przeciwciał oraz ewentualna biopsja dwunastnicy",
          "B) Uznanie celiakii za definitywnie wykluczoną na podstawie ujemnego wyniku anty-tTG",
          "C) Natychmiastowe wykonanie gastroskopii z biopsją bez modyfikacji diety",
          "D) Podanie dożylne 1 g hydrokortyzonu w celu wywołania wyrzutu przeciwciał",
          "E) Skierowanie pacjentki na kolonoskopię z biopsją esicy"
        ],
        options: [
          "A) Poinformowanie pacjentki, że badanie serologiczne na diecie bezglutenowej jest niewiarygodne; w celu postawienia diagnozy konieczna jest próba prowokacji glutenem (spożywanie min. 3–10 g glutenu/dobę przez min. 6–12 tygodni) i ponowne oznaczenie przeciwciał oraz ewentualna biopsja dwunastnicy",
          "B) Uznanie celiakii za definitywnie wykluczoną na podstawie ujemnego wyniku anty-tTG",
          "C) Natychmiastowe wykonanie gastroskopii z biopsją bez modyfikacji diety",
          "D) Podanie dożylne 1 g hydrokortyzonu w celu wywołania wyrzutu przeciwciał",
          "E) Skierowanie pacjentki na kolonoskopię z biopsją esicy"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowa odpowiedź to A. Podstawowy błąd diagnostyczny: przeciwciała (anty-tTG, EMA) oraz zmiany histopatologiczne zanikają po wyeliminowaniu glutenu z diety! Ujemny wynik u osoby na diecie bezglutenowej niczego nie wyklucza. Aby potwierdzić lub wykluczyć celiakię, pacjent musi przejść próbę prowokacji glutenem (spożywanie równowartości 2-4 kromek chleba pszennego dziennie przez min. 6-12 tygodni). Pomocne może być badanie genetyczne HLA: brak HLA-DQ2/DQ8 pozwala odstąpić od uciążliwej prowokacji.",
        expl: "Prawidłowa odpowiedź to A. Podstawowy błąd diagnostyczny: przeciwciała (anty-tTG, EMA) oraz zmiany histopatologiczne zanikają po wyeliminowaniu glutenu z diety! Ujemny wynik u osoby na diecie bezglutenowej niczego nie wyklucza. Aby potwierdzić lub wykluczyć celiakię, pacjent musi przejść próbę prowokacji glutenem (spożywanie równowartości 2-4 kromek chleba pszennego dziennie przez min. 6-12 tygodni). Pomocne może być badanie genetyczne HLA: brak HLA-DQ2/DQ8 pozwala odstąpić od uciążliwej prowokacji."
      },
      {
        tag: "🌾 ZBOŻA / ZASADY DIETY BEZGLUTENOWEJ",
        q: "Które z poniższych zbóż i produktów są BEZWZGLĘDNIE ZABRONIONE w diecie pacjenta chorującego na celiakię?\n1. Pszenica (w tym orkisz, samopsza, płaskurka, kamut)\n2. Żyto\n3. Jęczmień (w tym słód jęczmienny)\n4. Gryka\n5. Proso (kasza jaglana)\n6. Zwykły, niecertyfikowany owies\nPrawidłowa odpowiedź:",
        opts: [
          "A) 1, 2, 3, 6",
          "B) 1, 2, 3, 4, 5",
          "C) Tylko 1 i 2",
          "D) 1, 2, 3, 4, 6",
          "E) Wszystkie wymienione (1–6)"
        ],
        options: [
          "A) 1, 2, 3, 6",
          "B) 1, 2, 3, 4, 5",
          "C) Tylko 1 i 2",
          "D) 1, 2, 3, 4, 6",
          "E) Wszystkie wymienione (1–6)"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowa odpowiedź to A. Zboża toksyczne w celiakii to: pszenica (i jej dawne odmiany: orkisz, płaskurka, samopsza), żyto, jęczmień (uwaga na słód jęczmienny w piwie i słodyczach!) oraz zwykły owies (z powodu zanieczyszczenia krzyżowego w uprawach i młynach). Bezpieczne zboża i pseudozboża naturalnie bezglutenowe to: gryka, proso (kasza jaglana), kukurydza, ryż, amarantus, komosa ryżowa (quinoa) oraz certyfikowany owies bezglutenowy.",
        expl: "Prawidłowa odpowiedź to A. Zboża toksyczne w celiakii to: pszenica (i jej dawne odmiany: orkisz, płaskurka, samopsza), żyto, jęczmień (uwaga na słód jęczmienny w piwie i słodyczach!) oraz zwykły owies (z powodu zanieczyszczenia krzyżowego w uprawach i młynach). Bezpieczne zboża i pseudozboża naturalnie bezglutenowe to: gryka, proso (kasza jaglana), kukurydza, ryż, amarantus, komosa ryżowa (quinoa) oraz certyfikowany owies bezglutenowy."
      },
      {
        tag: "💉 WAKCYNOLOGIA I ORZECZNICTWO / ASPLENIA",
        q: "U pacjentów z długoletnią, późno rozpoznaną celiakią może rozwinąć się hiposplenizm lub czynnościowa asplenia (zanik śledziony). W związku z tym w wytycznych postępowania profilaktycznego zaleca się u tych chorych:",
        opts: [
          "A) Szczepienia ochronne przeciwko bakteriom otoczkowym: Streptococcus pneumoniae, Neisseria meningitidis oraz Haemophilus influenzae typ b (HiB), a także coroczne szczepienie przeciw grypie",
          "B) Bezwzględny zakaz stosowania jakichkolwiek szczepionek z powodu ryzyka wywołania rzutu celiakii",
          "C) Profilaktyczne przetaczanie immunoglobulin dożylnych (IVIG) co miesiąc",
          "D) Dożywotnią profilaktykę penicyliną krystaliczną i.v.",
          "E) Przeszczepienie szpiku kostnego od dawcy niespokrewnionego"
        ],
        options: [
          "A) Szczepienia ochronne przeciwko bakteriom otoczkowym: Streptococcus pneumoniae, Neisseria meningitidis oraz Haemophilus influenzae typ b (HiB), a także coroczne szczepienie przeciw grypie",
          "B) Bezwzględny zakaz stosowania jakichkolwiek szczepionek z powodu ryzyka wywołania rzutu celiakii",
          "C) Profilaktyczne przetaczanie immunoglobulin dożylnych (IVIG) co miesiąc",
          "D) Dożywotnią profilaktykę penicyliną krystaliczną i.v.",
          "E) Przeszczepienie szpiku kostnego od dawcy niespokrewnionego"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowa odpowiedź to A. Hiposplenizm czynnościowy występuje u ponad 30% dorosłych z celiakią (obecność ciałek Howella-Jolly'ego w rozmazie krwi). Wiąże się z ryzykiem piorunującej sepsy posplenektomijnej (OPSI) wywołanej przez bakterie otoczkowe. Dlatego chorzy na celiakię powinni być zaszczepieni przeciwko pneumokokom (PCV), meningokokom i HiB.",
        expl: "Prawidłowa odpowiedź to A. Hiposplenizm czynnościowy występuje u ponad 30% dorosłych z celiakią (obecność ciałek Howella-Jolly'ego w rozmazie krwi). Wiąże się z ryzykiem piorunującej sepsy posplenektomijnej (OPSI) wywołanej przez bakterie otoczkowe. Dlatego chorzy na celiakię powinni być zaszczepieni przeciwko pneumokokom (PCV), meningokokom i HiB."
      },
      {
        tag: "📉 POWIKŁANIA / CELIAKIA OPORNA NA LECZENIE",
        q: "Co definiuje tzw. celiakię oporną na leczenie (Refractory Coeliac Disease - RCD), która stanowi rzadkie powikłanie celiakii o niekorzystnym rokowaniu?",
        opts: [
          "A) Utrzymywanie się objawów złego wchłaniania i atrofii kosmków jelitowych mimo ścisłego przestrzegania diety bezglutenowej przez co najmniej 12 miesięcy, po wykluczeniu innych przyczyn enteropatii i ukrytej ekspozycji na gluten",
          "B) Brak ustąpienia biegunki po 48 godzinach od odstawienia glutenu",
          "C) Wystąpienie alergii na orzeszki ziemne u pacjenta na diecie bezglutenowej",
          "D) Wzrost masy ciała o więcej niż 5 kg w trakcie pierwszego miesiąca leczenia",
          "E) Obecność przeciwciał przeciwjądrowych ANA w mianie 1:160"
        ],
        options: [
          "A) Utrzymywanie się objawów złego wchłaniania i atrofii kosmków jelitowych mimo ścisłego przestrzegania diety bezglutenowej przez co najmniej 12 miesięcy, po wykluczeniu innych przyczyn enteropatii i ukrytej ekspozycji na gluten",
          "B) Brak ustąpienia biegunki po 48 godzinach od odstawienia glutenu",
          "C) Wystąpienie alergii na orzeszki ziemne u pacjenta na diecie bezglutenowej",
          "D) Wzrost masy ciała o więcej niż 5 kg w trakcie pierwszego miesiąca leczenia",
          "E) Obecność przeciwciał przeciwjądrowych ANA w mianie 1:160"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowa odpowiedź to A. Celiakia oporna na leczenie (RCD) dotyczy ok. 1% chorych (głównie dorosłych >50 r.ż.). Wyróżnia się typ 1 (poliklonalne limfocyty IEL) oraz typ 2 (aberracyjny klonalny rozrost IEL z utratą CD8 i CD3 na powierzchni), który bezpośrednio transformuje w chłoniaka EATL i wiąże się ze śmiertelnością sięgającą 50% w ciągu 5 lat.",
        expl: "Prawidłowa odpowiedź to A. Celiakia oporna na leczenie (RCD) dotyczy ok. 1% chorych (głównie dorosłych >50 r.ż.). Wyróżnia się typ 1 (poliklonalne limfocyty IEL) oraz typ 2 (aberracyjny klonalny rozrost IEL z utratą CD8 i CD3 na powierzchni), który bezpośrednio transformuje w chłoniaka EATL i wiąże się ze śmiertelnością sięgającą 50% w ciągu 5 lat."
      }
    ];

    c.flashcards = [
      {
        q: "Jakie badanie serologiczne jest testem I rzutu w diagnostyce celiakii wg wytycznych ESPGHAN?",
        a: "Jednoczesne oznaczenie stężenia przeciwciał przeciwko transglutaminazie tkankowej w klasie IgA (anty-tTG IgA) oraz całkowitego stężenia IgA (wykluczenie niedoboru IgA)."
      },
      {
        q: "Jakie są kryteria ścieżki bezbiopsyjnej rozpoznania celiakii u dzieci wg ESPGHAN 2020?",
        a: "1) Stężenie anty-tTG IgA ≥10-krotność górnej granicy normy (≥10x GGN); 2) Potwierdzenie dodatnich przeciwciał przeciwendomyzjalnych (EMA IgA) w DRUGIEJ, niezależnej próbce krwi (bez wymogu HLA i bez wymogu objawów!)."
      },
      {
        q: "Jaka jest wartość predykcyjna oznaczania antygenów HLA-DQ2 i HLA-DQ8 w celiakii?",
        a: "Prawie 100% ujemna wartość predykcyjna (brak genów wyklucza celiakię); bardzo niska dodatnia (30-40% zdrowych ma HLA-DQ2/8 – samo HLA nigdy nie stawia diagnozy!)."
      },
      {
        q: "Jakie przeciwciała należy oznaczyć przy podejrzeniu celiakii u chorego z całkowitym niedoborem IgA (<0.2 g/l)?",
        a: "Przeciwciała w klasie IgG: anty-tTG IgG lub anty-DGP IgG (przeciw deamidowanym peptydom gliadyny)."
      },
      {
        q: "Które zboża zawierają gluten toksyczny dla chorych na celiakię?",
        a: "Pszenica (w tym orkisz, samopsza, płaskurka, kamut), żyto, jęczmień oraz zwykły (niecertyfikowany) owies zanieczyszczony glutenem."
      },
      {
        q: "Jaki nowotwór złośliwy jelita cienkiego wykazuje najsilniejszy związek z nieleczoną celiakią?",
        a: "Chłoniak z komórek T związany z enteropatią (EATL – enteropathy-associated T-cell lymphoma)."
      }
    ];
  });

  // ==========================================
  // CASE 102: Alergia na białka mleka krowiego (ABMK)
  // ==========================================
  await reworkCase('102_abmk_niemowle.json', (c) => {
    c.shortTitle = "Niemowlę 3 mies. – Kolka jelitowa, smugi krwi w stolcu i atopowy wyprysk (Alergia na białka mleka krowiego / ABMK)";
    c.diagnosisTitle = "Alergia na białka mleka krowiego (Cow's Milk Protein Allergy – CMPA / ABMK) – postać mieszana (zapalenie prostnicy i okrężnicy FPIAP oraz atopowe zapalenie skóry)";

    c.vitals = [
      { label: "Masa ciała", val: "5.4 kg (25. percentyla)", sub: "Spadek z 50. percentyla", status: "warn" },
      { label: "Wzrost", val: "60 cm (50. percentyla)", sub: "Wzrost prawidłowy", status: "ok" },
      { label: "HR", val: "128/min", sub: "Akcja serca miarowa", status: "ok" },
      { label: "RR", val: "28/min", sub: "Tor oddechowy prawidłowy", status: "ok" },
      { label: "Temp", val: "36.8°C", sub: "Prawidłowa", status: "ok" }
    ];
    c.vitalsObj = { hr: 128, bp: "85/50", spo2: 99, rr: 28, temp: 36.8, gcs: 15 };

    c.story = "Do poradni pediatrycznej zgłasza się matka z 3-miesięczną Zuzią. Dziewczynka była karmiona wyłącznie piersią do 10. tygodnia życia, po czym z powodu hipogalaktii u matki wprowadzono dokarmianie standardową mieszanką mleczną początkową (mleko modyfikowane nr 1). W ciągu 10 dni od wprowadzenia mieszanki pojawiły się narastające dolegliwości: niemowlę gwałtownie pręży się i płacze podczas i po karmieniu, ulewa obfite ilości mleka, ma bolesne gazy i nasilone 'kolki' trwające po kilka godzin dziennie. Stolce zmieniły charakter – oddawane są 6-8 razy na dobę, są luźne, 'strzelające', ze znaczną ilością śluzu, a od 3 dni matka z przerażeniem zauważyła w pieluszce liczne pasma i kropelki świeżej, czerwonej krwi. W badaniu fizykalnym: na policzkach ('policzki lakierowane'), za uszami oraz w zgięciach łokciowych widoczne są sączące, łuszczące się zmiany rumieniowe o typie atopowego zapalenia skóry (AZS) oraz silna ciemieniucha na owłosionej skórze głowy. Brzuch nieco wzdęty, bolesny przy palpacji w rzucie okrężnicy, bez oporów patologicznych, objawy otrzewnowe ujemne. Odbyt bez cech szczeliny ani przetoki, okolica krocza z cechami odparzenia rumieniowego.";

    c.labs = [
      {
        category: "Morfologia krwi obwodowej",
        items: [
          { name: "Leukocyty (WBC)", val: "10.4 G/L", norm: "6.0–14.0 G/L", flag: "N" },
          { name: "Eozynofile (EOZ)", val: "0.85 G/L (8.2%)", norm: "0.1–0.4 G/L (1–4%)", flag: "H" },
          { name: "Hemoglobina (Hb)", val: "10.6 g/dL", norm: "10.5–13.5 g/dL", flag: "N" },
          { name: "Płytki krwi (PLT)", val: "380 G/L", norm: "150–450 G/L", flag: "N" }
        ]
      },
      {
        category: "Badania stolca i markery zapalne",
        items: [
          { name: "Krew utajona w kale (FOBT)", val: "Dodatni (makroskopowo widoczna krew)", norm: "Ujemny", flag: "H" },
          { name: "Kalprotektyna w kale", val: "340 µg/g", norm: "< 100 µg/g", flag: "H" },
          { name: "Posiew kału (Salmonella, Shigella, Campylobacter, EPEC)", val: "Ujemny (brak flory patogennej)", norm: "Ujemny", flag: "N" },
          { name: "Badanie ogólne moczu", val: "Prawidłowe", norm: "Prawidłowe", flag: "N" },
          { name: "CRP w surowicy", val: "2.1 mg/L", norm: "< 5.0 mg/L", flag: "N" }
        ]
      }
    ];

    c.steps = [
      {
        stepNum: 1,
        title: "Krok 1: Wstępna ocena niemowlęcia z krwią w stolcu, kolką i zmianami skórnymi",
        desc: "Jako lekarz dyżurny analizujesz objawy 3-miesięcznej Zuzi: pojawienie się pasm świeżej krwi i śluzu w stolcu, obfitych ulewań i bolesnych kolek krótko po przejściu z karmienia piersią na dokarmianie standardową mieszanką mleczną, z towarzyszącym wypryskiem atopowym na policzkach i eozynofilią w morfologii. Dziecko jest w stanie ogólnym dobrym, bez gorączki i bez cech ostrego brzucha. Jaka jest Twoja robocza hipoteza diagnostyczna?",
        scenario: "Jako lekarz dyżurny analizujesz objawy 3-miesięcznej Zuzi: pojawienie się pasm świeżej krwi i śluzu w stolcu, obfitych ulewań i bolesnych kolek krótko po przejściu z karmienia piersią na dokarmianie standardową mieszanką mleczną, z towarzyszącym wypryskiem atopowym na policzkach i eozynofilią w morfologii. Dziecko jest w stanie ogólnym dobrym, bez gorączki i bez cech ostrego brzucha. Jaka jest Twoja robocza hipoteza diagnostyczna?",
        options: [
          {
            text: "Alergia na białka mleka krowiego (ABMK / CMPA), najprawdopodobniej pod postacią alergicznego zapalenia jelita grubego i odbytnicy (FPIAP - Food Protein-Induced Allergic Proctocolitis) ze współistniejącym atopowym zapaleniem skóry (AZS).",
            correct: true,
            feedback: "✅ PRAWIDŁOWO! Klasyczny obraz alergii na białka mleka krowiego u młodego niemowlęcia: świeża krew ze śluzem w stolcu u dziecka w dobrym stanie ogólnym krótko po ekspozycji na mleko modyfikowane to podręcznikowy obraz FPIAP (alergicznego zapalenia odbytnicy i prostnicy). Zmiany skórne (AZS) i eozynofilia dodatkowo potwierdzają tło atopowe. Jest to najczęstsza przyczyna krwawienia z dolnego odcinka przewodu pokarmowego u niemowląt!"
          },
          {
            text: "Wgłobienie jelita cienkiego do grubego (invaginatio) wymagające natychmiastowej wlewki kontrastowej pod ciśnieniem.",
            correct: false,
            feedback: "❌ BŁĄD KRYTYCZNY! Wgłobienie jelita występuje typowo u starszych niemowląt (szczyt 5-9 m.ż.) i przebiega z gwałtownym, napadowym krzykiem, bladością, wymiotami i stolcami przypominającymi 'galaretkę porzeczkową' u dziecka w stanie ciężkim. Zuzia jest w stanie dobrym, a krew występuje w postaci pasm w luźnym stolcu od 3 dni."
          },
          {
            text: "Wrzodziejące zapalenie jelita grubego (Colitis ulcerosa) o piorunującym początku w wieku 3 miesięcy.",
            correct: false,
            feedback: "❌ BŁĄD! Nieswoiste choroby zapalne jelit (IBD) są skrajnie rzadkie u 3-miesięcznych niemowląt, a najczęstszą przyczyną krwawienia w tym wieku jest ABMK."
          },
          {
            text: "Fizjologiczna reakcja na rozszerzanie diety, która nie wymaga żadnego postępowania.",
            correct: false,
            feedback: "❌ BŁĄD! Obecność krwi w stolcu niemowlęcia nigdy nie jest zjawiskiem fizjologicznym i wymaga pilnej interwencji dietetycznej."
          }
        ]
      },
      {
        stepNum: 2,
        title: "Krok 2: Zróżnicowanie postaci IgE-zależnej od IgE-niezależnej ABMK",
        desc: "Rezydent pyta Cię: 'Czy u Zuzi powinniśmy natychmiast oznaczyć stężenie swoistych przeciwciał IgE przeciwko frakcjom mleka krowiego (kazeinie, beta-laktoglobulinie) we krwi?'. Jak tłumaczysz różnicę między postacią IgE-zależną a IgE-niezależną ABMK wg wytycznych ESPGHAN?",
        scenario: "Rezydent pyta Cię: 'Czy u Zuzi powinniśmy natychmiast oznaczyć stężenie swoistych przeciwciał IgE przeciwko frakcjom mleka krowiego (kazeinie, beta-laktoglobulinie) we krwi?'. Jak tłumaczysz różnicę między postacią IgE-zależną a IgE-niezależną ABMK wg wytycznych ESPGHAN?",
        options: [
          {
            text: "Postać żołądkowo-jelitowa (FPIAP) jest w przeważającej większości reakcją IgE-NIEZALEŻNĄ (komórkową) – testy sIgE i testy skórne Prick wychodzą w niej UJEMNE, a ich ujemny wynik NIE wyklucza alergii; postać IgE-zależna daje natychmiastowe objawy (pokrzywka, obrzęk Quinckego, skurcz oskrzeli, anafilaksja w ciągu minut/2h od spożycia).",
            correct: true,
            feedback: "✅ PRAWIDŁOWO! Kluczowe rozróżnienie egzaminacyjne LEK: Alergia na białka mleka krowiego dzieli się na: 1) IgE-zależną (natychmiastową: pokrzywka, świsty, obrzęk naczynioruchowy, wymioty od razu po podaniu, dodatnie sIgE/SPT); 2) IgE-niezależną / komórkową (opóźnioną: FPIAP z krwią w stolcu, FPIES, enteropatia – rozwija się po wielu godzinach/dniach, a sIgE są CAŁKOWICIE UJEMNE!). Brak sIgE nie wyklucza ABMK!"
          },
          {
            text: "Postać jelitowa jest zawsze w 100% IgE-zależna i brak sIgE bezwzględnie wyklucza jakąkolwiek alergię.",
            correct: false,
            feedback: "❌ BŁĄD KRYTYCZNY! Ponad 70% niemowląt z alergicznym zapaleniem jelit (FPIAP) ma całkowicie ujemne przeciwciała sIgE."
          },
          {
            text: "U niemowląt do 1. roku życia układ odpornościowy w ogóle nie produkuje przeciwciał.",
            correct: false,
            feedback: "❌ BŁĄD! Niemowlęta produkują przeciwciała, ale w enteropatiach dominuje mechanizm komórkowy Th2."
          },
          {
            text: "Należy wykonać test transformacji blastycznej limfocytów z krwi pępowinowej.",
            correct: false,
            feedback: "❌ BŁĄD! Badanie nieprzydatne klinicznie."
          }
        ]
      },
      {
        stepNum: 3,
        title: "Krok 3: Złoty standard diagnostyczny – Próba eliminacji i prowokacji",
        desc: "Jaki jest uznany międzynarodowy 'złoty standard' potwierdzenia rozpoznania alergii na białka mleka krowiego u niemowlęcia wg wytycznych ESPGHAN i Polskiego Towarzystwa Gastroenterologii, Hepatologii i Żywienia Dzieci (PTGHiŻD)?",
        scenario: "Jaki jest uznany międzynarodowy 'złoty standard' potwierdzenia rozpoznania alergii na białka mleka krowiego u niemowlęcia wg wytycznych ESPGHAN i Polskiego Towarzystwa Gastroenterologii, Hepatologii i Żywienia Dzieci (PTGHiŻD)?",
        options: [
          {
            text: "Próba eliminacji białek mleka krowiego przez okres 2–4 tygodni (uzyskanie ustąpienia objawów klinicznych), a następnie wykonanie kontrolowanej próby ponownego wprowadzenia / prowokacji pokarmowej (Open Food Challenge lub podwójnie ślepej próby prowokacyjnej), która wywołuje nawrót objawów.",
            correct: true,
            feedback: "✅ PRAWIDŁOWO! Złotym standardem rozpoznania ABMK (zwłaszcza w postaci IgE-niezależnej) pozostaje próba eliminacji i prowokacji: 1) Całkowite wykluczenie białek mleka krowiego na 2-4 tygodnie -> ustąpienie krwi w stolcu i kolek; 2) Kontrolowana próba ponownego wprowadzenia (challenge) -> nawrót objawów potwierdza zależność przyczynowo-skutkową. Jeśli objawy nie ustąpią po 4 tygodniach diety bezmlecznej, ABMK należy wykluczyć!"
          },
          {
            text: "Wykonanie kolonoskopii z biopsją owrzodzeń jelita grubego w znieczuleniu ogólnym u każdego 3-miesięcznego dziecka.",
            correct: false,
            feedback: "❌ BŁĄD! Kolonoskopia u 3-miesięcznego niemowlęcia z FPIAP jest inwazyjna, niepotrzebna i przeciwwskazana jako rutynowa metoda pierwszego rzutu."
          },
          {
            text: "Badanie biorezonansem magnetycznym i testy z kropli krwi na obecność toksyn.",
            correct: false,
            feedback: "❌ BŁĄD! Metody pseudonaukowe, niemające żadnej wartości diagnostycznej."
          },
          {
            text: "Oznaczenie kalprotektyny w kale powyżej 5000 µg/g jako jedynego kryterium.",
            correct: false,
            feedback: "❌ BŁĄD! Kalprotektyna jest nieswoistym markerem zapalenia i u małych niemowląt fizjologicznie osiąga wyższe wartości niż u dorosłych."
          }
        ]
      },
      {
        stepNum: 4,
        title: "Krok 4: Wybór mieszanki leczniczej pierwszego rzutu u dziecka karmionego sztucznie",
        desc: "Zuzia jest dokarmiana mlekiem modyfikowanym. Matka pyta, na jakie mleko należy natychmiast zamienić dotychczasową mieszankę standardową. Jaki preparat mlekozastępczy jest preparatem pierwszego wyboru w leczeniu ABMK wg wytycznych ESPGHAN?",
        scenario: "Zuzia jest dokarmiana mlekiem modyfikowanym. Matka pyta, na jakie mleko należy natychmiast zamienić dotychczasową mieszankę standardową. Jaki preparat mlekozastępczy jest preparatem pierwszego wyboru w leczeniu ABMK wg wytycznych ESPGHAN?",
        options: [
          {
            text: "Mieszanka o wysokim stopniu hydrolizy białka serwatkowego lub kazeinowego (eHF – extensively Hydrolysed Formula) o udowodnionej hipoalergenowości u ponad 90% dzieci z ABMK.",
            correct: true,
            feedback: "✅ PRAWIDŁOWO! Wytyczne ESPGHAN: preparatem I rzutu u dzieci z łagodną i umiarkowaną postacią ABMK (w tym FPIAP) jest mieszanka o wysokim stopniu hydrolizy białka (eHF – np. Bebilon Pepti Syneo, Nutramigen LGG). Białka mleka są w niej rozbite na krótkie peptydy o masie <1500–3000 Da, co eliminuje większość epitopów alergenowych."
          },
          {
            text: "Standardowa mieszanka hipoalergiczna typu HA (częściowy hydrolizat białka).",
            correct: false,
            feedback: "❌ BŁĄD KRYTYCZNY! Mieszanki typu 'HA' (o częściowym stopniu hydrolizy) służą WYŁĄCZNIE do profilaktyki u zdrowych dzieci z obciążonym wywiadem rodzinnym! Są BEZWZGLĘDNIE PRZECIWWSKAZANE w leczeniu objawowej ABMK, ponieważ zawierają duże peptydy wywołujące reakcję alergiczną!"
          },
          {
            text: "Mieszanka sojowa (preparat na bazie białka soi).",
            correct: false,
            feedback: "❌ BŁĄD! Wytyczne ESPGHAN surowo zabraniają stosowania soi u niemowląt poniżej 6. miesiąca życia ze względu na zawartość fitoestrogenów oraz wysoki odsetek współistniejącej alergii na soję (reakcja krzyżowa u 30-50% niemowląt z nie-IgE ABMK)!"
          },
          {
            text: "Mleko kozie lub owcze bezpośrednio od zwierząt.",
            correct: false,
            feedback: "❌ BŁĄD KRYTYCZNY! Mleko kozie i owcze wykazuje ponad 90% reaktywności krzyżowej z mlekiem krowim, a ponadto jest ubogie w kwas foliowy i witaminę B12 (ryzyko ciężkiej niedokrwistości megaloblastycznej) i obciąża nerki niemowlęcia nadmiarem soli!"
          }
        ]
      },
      {
        stepNum: 5,
        title: "Krok 5: Kiedy należy sięgnąć po mieszankę elementarną (aminokwasową - AAF)?",
        desc: "Kiedy wg wytycznych ESPGHAN wskazane jest natychmiastowe wdrożenie mieszanki elementarnej / aminokwasowej (AAF – Amino Acid Formula) zamiast hydrolizatu eHF?",
        scenario: "Kiedy wg wytycznych ESPGHAN wskazane jest natychmiastowe wdrożenie mieszanki elementarnej / aminokwasowej (AAF – Amino Acid Formula) zamiast hydrolizatu eHF?",
        options: [
          {
            text: "W ciężkich postaciach ABMK: przebyty epizod anafilaksji, ciężki zespół FPIES ze wstrząsem hipowolemicznym, enteropatia z ciężkim zahamowaniem wzrastania i hipoalbuminemią LUB brak poprawy klinicznej (utrzymywanie się krwi w stolcu/kolek) po 2–4 tygodniach stosowania mieszanki eHF.",
            correct: true,
            feedback: "✅ PRAWIDŁOWO! Mieszanki aminokwasowe (AAF – np. Neocate LCP, Nutramigen PURAMINO) zawierają wyłącznie wolne syntetyczne aminokwasy (brak jakichkolwiek peptydów). Wskazania: 1) Ciężka anafilaksja zagrażająca życiu; 2) Ciężki FPIES; 3) Ciężkie niedożywienie/zahamowanie wzrastania; 4) Nieskuteczność eHF (ok. 5-10% dzieci nie toleruje nawet wysokich hydrolizatów i wymaga AAF)."
          },
          {
            text: "U każdego dziecka z jakąkolwiek postacią alergii jako jedyny dopuszczalny lek.",
            correct: false,
            feedback: "❌ BŁĄD! AAF jest znacznie droższa i ma gorsze walory smakowe – u 90-95% dzieci w pełni wystarcza eHF."
          },
          {
            text: "Tylko wtedy, gdy dziecko ukończyło 3. rok życia.",
            correct: false,
            feedback: "❌ BŁĄD! Wskazania do AAF dotyczą głównie niemowląt w 1. roku życia."
          },
          {
            text: "Wyłącznie przy współistnieniu cukrzycy typu 2.",
            correct: false,
            feedback: "❌ BŁĄD! Brak związku z patologią."
          }
        ]
      },
      {
        stepNum: 6,
        title: "Krok 6: Postępowanie u matki karmiącej piersią – dieta eliminacyjna matki",
        desc: "Matka Zuzi deklaruje: 'Bardzo zależy mi na utrzymaniu laktacji i chcę wrócić do wyłącznego karmienia piersią!'. Jakie zalecenia dietetyczne i suplementacyjne musisz przekazać karmiącej matce zgodnie z zaleceniami laktacyjnymi?",
        scenario: "Matka Zuzi deklaruje: 'Bardzo zależy mi na utrzymaniu laktacji i chcę wrócić do wyłącznego karmienia piersią!'. Jakie zalecenia dietetyczne i suplementacyjne musisz przekazać karmiącej matce zgodnie z zaleceniami laktacyjnymi?",
        options: [
          {
            text: "Zalecenie kontynuacji karmienia piersią z jednoczesnym wprowadzeniem u matki ścisłej diety bezmlecznej (eliminacja wszelkich produktów zawierających białka mleka krowiego, w tym wołowiny i cielęciny) ORAZ obligatoryjna suplementacja u matki wapnia elementarnego w dawce 1000 mg/dobę i witaminy D3.",
            correct: true,
            feedback: "✅ PRAWIDŁOWO! Karmienie piersią pozostaje złotym standardem żywienia niemowląt nawet w ABMK! Antygeny mleka krowiego spożywanego przez matkę przenikają do jej pokarmu. Matka eliminuje ze swojej diety mleko, masło, sery, jogurty oraz wołowinę. Bezwzględnie konieczna jest suplementacja wapnia (1000 mg/d) i witaminy D u matki, aby zapobiec osteopenii i demineralizacji kośćca kobiety karmiącej!"
          },
          {
            text: "Natychmiastowy bezwzględny nakaz odstawienia dziecka od piersi i wylania pokarmu do zlewu.",
            correct: false,
            feedback: "❌ BŁĄD KRYTYCZNY! Odstawienie od piersi u dziecka z alergią jest błędem sztuki – pokarm kobiecy zawiera czynniki ochronne (IgA, laktoferynę, HMO) przyspieszające dojrzewanie bariery jelitowej."
          },
          {
            text: "Matka może jeść sery żółte i pić mleko, wystarczy podawać dziecku krople z laktazą.",
            correct: false,
            feedback: "❌ BŁĄD! Alergia na białka mleka krowiego to reakcja na BIAŁKO (kazeinę/serwatkę), a laktaza trawi CUKIER (laktozę) – laktaza jest całkowicie nieskuteczna w ABMK!"
          },
          {
            text: "Zalecenie eliminacji z diety matki wyłącznie glutenu i wody mineralnej.",
            correct: false,
            feedback: "❌ BŁĄD! Przyczyną alergii u niemowlęcia jest białko mleka krowiego, a nie gluten."
          }
        ]
      },
      {
        stepNum: 7,
        title: "Krok 7: Ciężka postać IgE-niezależna: Zespół enteropatii FPIES",
        desc: "Młody lekarz pyta Cię na dyżurze: 'A czym różni się łagodne zapalenie prostnicy FPIAP od zespołu FPIES (Food Protein-Induced Enterocolitis Syndrome)?'. Jakie objawy kliniczne definiują ostry epizod FPIES, który może imitować sepsę lub wstrząs?",
        scenario: "Młody lekarz pyta Cię na dyżurze: 'A czym różni się łagodne zapalenie prostnicy FPIAP od zespołu FPIES (Food Protein-Induced Enterocolitis Syndrome)?'. Jakie objawy kliniczne definiują ostry epizod FPIES, który może imitować sepsę lub wstrząs?",
        options: [
          {
            text: "Ostry FPIES to ciężka, zagrażająca życiu reakcja IgE-niezależna, w której po 1–4 godzinach od spożycia alergenu (mleka, soi, ryżu) występują gwałtowne, wielokrotne wymioty, bladość, hipotermia (<36°C), letarg i wstrząs hipowolemiczny z leukocytozą z przesunięciem w lewo i kwasicą metaboliczną (często mylony z sepsą niemowlęcą!).",
            correct: true,
            feedback: "✅ PRAWIDŁOWO! FPIES (zespół zapalenia jelit indukowany białkami pokarmowymi): w przeciwieństwie do anafilaksji nie ma tu pokrzywki ani świstów, a po 1-4h pojawiają się dramatyczne, chlustające wymioty prowadzące do skrajnego odwodnienia, wstrząsu i hipotermii. W morfologii występuje masywna leukocytoza neutrofilowa (często >25 G/L) i trombocytoza. Leczenie ostre: intensywna płynoterapia i.v. i ondansetron i.v.!"
          },
          {
            text: "FPIES to łagodny katar sienny występujący wyłącznie wiosną.",
            correct: false,
            feedback: "❌ BŁĄD! FPIES to ciężki stan zagrożenia życia u niemowląt."
          },
          {
            text: "FPIES objawia się wyłącznie łysieniem plackowatym u noworodka.",
            correct: false,
            feedback: "❌ BŁĄD! Absurdalne twierdzenie."
          },
          {
            text: "FPIES jest chorobą wywołaną zakażeniem koronawirusem.",
            correct: false,
            feedback: "❌ BŁĄD! FPIES ma podłoże immunologiczne alergiczne (IgE-niezależne)."
          }
        ]
      },
      {
        stepNum: 8,
        title: "Krok 8: Nabywanie tolerancji immunologicznej i tzw. drabina mleczna",
        desc: "Po 3 tygodniach diety bezmlecznej (karmienie piersią z dietą eliminacyjną u matki + eHF) krew ze stolca Zuzi całkowicie zniknęła, kolki ustąpiły, a skóra wygoiła się. Matka pyta ze łzami w oczach: 'Panie doktorze, czy moja córka już nigdy w życiu nie zje lodów ani sera?'. Jakie rokowanie przedstawiasz rodzicom zgodnie z danymi EBM?",
        scenario: "Po 3 tygodniach diety bezmlecznej (karmienie piersią z dietą eliminacyjną u matki + eHF) krew ze stolca Zuzi całkowicie zniknęła, kolki ustąpiły, a skóra wygoiła się. Matka pyta ze łzami w oczach: 'Panie doktorze, czy moja córka już nigdy w życiu nie zje lodów ani sera?'. Jakie rokowanie przedstawiasz rodzicom zgodnie z danymi EBM?",
        options: [
          {
            text: "Rokowanie jest doskonałe: u ponad 80–90% dzieci z ABMK samoistna tolerancja immunologiczna wykształca się do 3.–5. roku życia; dietę bezmleczną kontynuuje się do ukończenia 9.–12. miesiąca życia, po czym podejmuje się kontrolowane próby reintrodukcji w oparciu o tzw. 'drabinę mleczną' (zaczynając od produktów pieczonych w wysokiej temperaturze – herbatniki, muffinki).",
            correct: true,
            feedback: "✅ PRAWIDŁOWO! Naturalny przebieg ABMK u dzieci charakteryzuje się samoistnym 'wyrastaniem' z alergii: ok. 50% dzieci nabywa tolerancję do 1. r.ż., ponad 75% do 3. r.ż., a ponad 90% do 5. r.ż. Obróbka termiczna (pieczenie w mące w temp. 180°C przez 30 min) niszczy konformacyjne epitopy termolabilnych białek serwatkowych (beta-laktoglobuliny), co pozwala na bezpieczne stopniowe rozszerzanie diety wg schematu 'Milk Ladder' pod nadzorem alergologa!"
          },
          {
            text: "Alergia na mleko jest nieuleczalna i dziecko do końca życia nie może mieć kontaktu z krową ani mlekiem.",
            correct: false,
            feedback: "❌ BŁĄD! Celiakia trwa całe życie, ale z alergii na białka mleka krowiego niemowlęta w olbrzymiej większości wyrastają!"
          },
          {
            text: "Już jutro należy podać dziecku 500 ml surowego mleka krowiego od krowy.",
            correct: false,
            feedback: "❌ BŁĄD! Zbyt wczesna prowokacja wywoła natychmiastowy nawrót krwotocznego zapalenia jelita."
          },
          {
            text: "Dziecko należy natychmiast zaszczepić odczulającą szczepionką wziewną z mleka.",
            correct: false,
            feedback: "❌ BŁĄD! Taka procedura nie istnieje w standardzie pediatrycznym."
          }
        ]
      }
    ];

    c.pathoNodes = [
      {
        badge: "OGNIWO 1 • Antygeny białek mleka krowiego i niedojrzałość bariery jelitowej",
        title: "Frakcje białkowe (kazeina vs białka serwatkowe) i transport makromolekuł",
        short: "Niedojrzała bariera jelitowa niemowlęcia przepuszcza nienaruszone antygeny kazeiny i beta-laktoglobuliny.",
        detail: "Mleko krowie zawiera ponad 20 frakcji białkowych, dzielących się na: 1) Frakcję kazeinową (ok. 80% białek: alfa-s1-, alfa-s2-, beta- i kappa-kazeina) – wysoce termostabilną i odporną na trawienie enzymatyczne; 2) Frakcję serwatkową (ok. 20%: beta-laktoglobulina, alfa-laktoalbumina, albumina surowicy bydlęcej BSA, immunoglobuliny) – w większości termolabilną. U noworodków i małych niemowląt bariera jelitowa cechuje się fizjologiczną niedojrzałością: obniżoną kwasowością soku żołądkowego, niską aktywnością enzymów proteolitycznych, cieńszą warstwą śluzu oraz zwiększoną przepuszczalnością połączeń międzykomórkowych (tight junctions). Umożliwia to przenikanie wielkocząsteczkowych, nienadtrawionych antygenów białkowych do blaszki właściwej błony śluzowej, gdzie dochodzi do ich kontaktu z komórkami układu odpornościowego GALT.",
        target: "Frakcja kazeinowa (Bos d 8) oraz beta-laktoglobulina (Bos d 5) – główne alergeny mleka",
        desc: "Frakcje białkowe (kazeina vs białka serwatkowe) i transport makromolekuł."
      },
      {
        badge: "OGNIWO 2 • Reakcja IgE-zależna (Natychmiastowa) vs IgE-niezależna (Komórkowa)",
        title: "Dwa odmienne mechanizmy immunologiczne wg klasyfikacji Gella i Coombsa",
        short: "Typ I (IgE, mastocyty, histamina) odpowiada za anafilaksję; Typ IV (komórkowy Th2, cytokiny) odpowiada za enteropatię.",
        detail: "Alergia na białka mleka krowiego przebiega dwoma głównymi szlakami immunologicznymi: 1) Mechanizm IgE-zależny (Typ I wg Gella-Coombsa): komórki dendrytyczne prezentują alergen limfocytom Th2, które wydzielają IL-4 i IL-13, indukując przełączenie klas przeciwciał w komórkach B na swoiste IgE (sIgE). Przeciwciała sIgE wiążą się z receptorami FcεRI na mastocytach i bazofilach. Ponowna ekspozycja wywołuje degranulację i wyrzut preformowanych mediatorów (histaminy, tryptazy) oraz syntezę leukotrienów LTC4/LTD4 i prostaglandyny PGD2. Skutkuje to natychmiastowym (w ciągu minut) skurczem mięśni gładkich oskrzeli, rozszerzeniem naczyń, obrzękiem i anafilaksją; 2) Mechanizm IgE-niezależny (Typ IV komórkowy): aktywowane antygenem limfocyty T w błonie śluzowej jelita syntetyzują cytokiny prozapalne (TNF-alfa, IL-5), rekrutując eozynofile i komórki jednojądrzaste. Reakcja ma charakter opóźniony (od 2 godzin do kilku dni) i prowadzi do zapalenia śluzówki przewodu pokarmowego.",
        target: "Receptory FcεRI na mastocytach, histamina oraz szlaki cytokinowe limfocytów Th2 (IL-4, IL-5)",
        desc: "Dwa odmienne mechanizmy immunologiczne wg klasyfikacji Gella i Coombsa."
      },
      {
        badge: "OGNIWO 3 • Patogeneza FPIAP – Alergiczne zapalenie prostnicy i okrężnicy",
        title: "Naciek eozynofilowy śluzówki odbytnicy, mikroropnie krypt i wynaczynienia krwinkowe",
        short: "Naciek eozynofilów w dystalnym odcinku jelita grubego prowadzi do krwawień włośniczkowych i śluzotoku.",
        detail: "Alergiczne zapalenie prostnicy i jelita grubego indukowane białkami pokarmowymi (FPIAP – Food Protein-Induced Allergic Proctocolitis) jest najczęstszą manifestacją IgE-niezależnej ABMK u niemowląt w pierwszych miesiącach życia. W odpowiedzi na antygeny mleka przenikające z pokarmu matki lub mieszanki dochodzi do masywnego nacieku eozynofilowego w blaszce właściwej błony śluzowej odbytnicy i esicy (>60 eozynofilów w polu widzenia dużej mocy). Eozynofile degranulują, uwalniając cytotoksyczne białka ziarnistości: główne białko zasadowe (MBP), kationowe białko eozynofilów (ECP) oraz neurotoksynę eozynofilową (EDN). Wywołuje to miejscowe uszkodzenie nabłonka, mikronadżerki, obrzęk i kruchość naczyń włosowatych, co objawia się obecnością smug świeżej krwi i śluzu w stolcu u dziecka poza tym zupełnie zdrowego i rozwijającego się prawidłowo.",
        target: "Eozynofilowe białka ziarnistości (MBP, ECP), kalprotektyna w kale i naczynia włosowate prostnicy",
        desc: "Naciek eozynofilowy śluzówki odbytnicy, mikroropnie krypt i wynaczynienia krwinkowe."
      },
      {
        badge: "OGNIWO 4 • Nabywanie tolerancji immunologicznej – Rola limfocytów Treg i IL-10",
        title: "Apoptoza klonów autoreaktywnych, indukcja tolerancji doustnej i 'desensytyzacja termiczna'",
        short: "Limfocyty Treg (FoxP3+) wydzielające IL-10 i TGF-beta wygaszają alergię u 90% dzieci do 5. roku życia.",
        detail: "Z wiekiem dochodzi do dojrzewania szczelności bariery jelitowej (wzrost wydzielania sekrecyjnej sIgA, zacieśnienie klaudyn w enterocytach) oraz wykształcenia fizjologicznej tolerancji doustnej (oral tolerance). Kluczową rolę odgrywają antygenowo swoiste limfocyty T regulatorowe (Treg: CD4+ CD25+ FoxP3+), które pod wpływem antygenu wydzielają immunosupresyjne cytokiny: interleukinę 10 (IL-10) oraz transformujący czynnik wzrostu beta (TGF-β). Prowadzi to do anergi i apoptozy swoistych klonów limfocytów Th2, stłumienia eozynofilii oraz przełączenia syntezy przeciwciał w komórkach plazmatycznych na 'blokujące' immunoglobuliny IgG4. Proces ten przyspiesza stopniowa ekspozycja na białka poddane obróbce termicznej w matrycy mącznej (drabina mleczna), która u 85-90% dzieci prowadzi do całkowitego wyleczenia klinicznego przed pójściem do szkoły.",
        target: "Limfocyty regulatorowe FoxP3+, przeciwciała blokujące IgG4 oraz interleukina 10",
        desc: "Apoptoza klonów autoreaktywnych, indukcja tolerancji doustnej i 'desensytyzacja termiczna'."
      }
    ];

    c.diffTable = {
      title: "⚔️ Diagnostyka różnicowa krwi w stolcu, kolek i dolegliwości brzusznych u niemowlęcia",
      headers: [
        "Cecha kliniczna / jednostka",
        "Alergia na białka mleka (FPIAP)",
        "Szczelina odbytu (Fissura ani)",
        "Wgłobienie jelita (Invaginatio)",
        "Zakażenie bakteryjne (np. Salmonella/Campylobacter)"
      ],
      rows: [
        [
          "Typowy wiek dziecka",
          "1.–6. miesiąc życia",
          "Dowolny (często po epizodzie twardego stolca)",
          "Typowo 5.–9. miesiąc życia (szczyt)",
          "Dowolny wiek niemowlęcy i dziecięcy"
        ],
        [
          "Stan ogólny dziecka",
          "Bardzo dobry / 'happy spitter' z krwią w pieluszce",
          "Dobry, płacz tylko w momencie defekacji",
          "Ciężki: napadowy krzyk, apatia, bladość, wstrząs",
          "Średni lub ciężki, cechy odwodnienia"
        ],
        [
          "Charakter krwi i stolca",
          "Luźny stolec ze śluzem i pasmami świeżej krwi",
          "Pojedyncza smuga świeżej krwi na twardym stolcu",
          "Stolec jak 'galaretka porzeczkowa' (krew z martwicą śluzówki)",
          "Wodnista, cuchnąca biegunka z krwią i leukocytami"
        ],
        [
          "Gorączka i markery zapalne",
          "Brak gorączki, CRP w normie, możliwa eozynofilia",
          "Brak gorączki, parametry w normie",
          "Początkowo brak, narasta przy martwicy jelita",
          "Wysoka gorączka, wysokie CRP i leukocytoza"
        ],
        [
          "Badanie fizykalne brzucha i odbytu",
          "Brzuch miękki, odbyt prawidłowy, zmiany AZS",
          "Linijne pęknięcie anodermy na godz. 6 lub 12",
          "Objaw Dance (pusty prawy dół biodrowy) + guz jak kiełbaska",
          "Bolesność uogólniona, wzmożona perystaltyka"
        ],
        [
          "Kluczowe badanie potwierdzające",
          "Próba eliminacji (eHF) i prowokacji pokarmowej",
          "Staranna ocena wzrokowa anodermy odbytu",
          "USG jamy brzusznej (objaw tarczy / tarczy strzelniczej / donuta)",
          "Posiew kału na uropatogeny jelitowe"
        ],
        [
          "Postępowanie z wyboru",
          "Mieszanka eHF lub dieta bezmleczna matki",
          "Natłuszczanie, maść z pantenolem, laktuloza na zaparcia",
          "Dekompresja hydrostatyczna/pneumatyczna (wlewka) lub operacja CITO",
          "Nawadnianie doustne/dożylne, antybiotyk celowany w ciężkim stanie"
        ]
      ]
    };

    c.dutySummary = {
      overview: "Alergia na białka mleka krowiego (ABMK / CMPA) jest najczęstszą alergią pokarmową u niemowląt (dotyka 2–3% populacji). Dzieli się na postać IgE-zależną (natychmiastowe objawy skórne i oddechowe, groźba anafilaksji) oraz IgE-niezależną (opóźnione objawy żołądkowo-jelitowe: zapalenie prostnicy FPIAP, zespół enteropatii FPIES). U 80–90% dzieci samoistna tolerancja wykształca się do 3.–5. roku życia.",
      diagnostics: "1) Złoty standard: próba eliminacji białek mleka krowiego (2–4 tygodnie) i ponowna próba prowokacji (challenge).<br>2) W postaci jelitowej (FPIAP) testy sIgE i punktowe skórne (Prick) są zazwyczaj UJEMNE i ich ujemny wynik NIE wyklucza choroby!<br>3) W postaci natychmiastowej (pokrzywka, obrzęk, anafilaksja): oznaczenie swoistych IgE (sIgE) przeciwko kazeinie (Bos d 8) i beta-laktoglobulinie (Bos d 5) lub testy skórne Prick (SPT).<br>4) Różnicowanie: staranne oglądanie odbytu (wykluczenie szczeliny), posiew kału (wykluczenie infekcji bakteryjnej) oraz czujność w kierunku wgłobienia jelita.",
      drugsAndDoses: "• <span class='dose-pill'>Mieszanka o wysokim stopniu hydrolizy (eHF)</span>: leczenie I rzutu u dzieci karmionych sztucznie (np. Bebilon Pepti Syneo, Nutramigen LGG).<br>• <span class='dose-pill'>Mieszanka aminokwasowa (AAF)</span>: leczenie w ciężkiej anafilaksji, FPIES, ciężkim niedożywieniu lub braku poprawy po eHF (np. Neocate LCP, Nutramigen PURAMINO).<br>• <span class='dose-pill'>Dieta bezmleczna u matki karmiącej</span>: eliminacja nabiału i wołowiny + <span class='dose-pill'>Wapń elementarny 1000 mg/dobę p.o.</span> + <span class='dose-pill'>Witamina D3 2000 IU/dobę</span>.<br>• <span class='dose-pill'>Pielęgnacja skóry (AZS)</span>: emolienty min. 2–3 razy na dobę; krótkotrwale hydrokortyzon 1% krem w zaostrzeniach.<br>• <span class='dose-pill'>Adrenalina domięśniowa (i.m.)</span>: w razie wstrząsu anafilaktycznego dawka <span class='dose-pill'>0.01 mg/kg m.c.</span> (0.01 ml/kg roztworu 1:1000) w przednio-boczną powierzchnię uda.",
      procedures: "W FPIAP nie wykonuje się rutynowo kolonoskopii ani endoskopii; u niemowląt <6 m.ż. surowo ZABRONIONE jest stosowanie preparatów sojowych oraz mleka koziego/owczego; ponowna próba prowokacji prowadzona ambulatoryjnie lub w szpitalu po ukończeniu 9–12 miesięcy życia.",
      monitoring: "Kontrola przyrostów masy i długości ciała na siatkach centylowych co 4 tygodnie; ocena ustąpienia krwawienia ze stolca (zwykle w ciągu 72h do 2 tygodni od wdrożenia diety); próby prowokacji pokarmowej co 6–12 miesięcy w celu oceny nabywania tolerancji (wprowadzanie drabiny mlecznej 'Milk Ladder')."
    };

    c.lekQuestions = [
      {
        tag: "🥛 POSTĘPOWANIE ŻYWIENIOWE / WYTYCZNE ESPGHAN",
        q: "U 4-miesięcznego niemowlęcia karmionego sztucznie rozpoznano łagodną do umiarkowanej postać alergii na białka mleka krowiego manifestującą się smugami krwi w stolcu i kolką jelitową (FPIAP). Zgodnie z wytycznymi ESPGHAN i PTGHiŻD preparatem mlekozastępczym pierwszego wyboru jest:",
        opts: [
          "A) Mieszanka o wysokim stopniu hydrolizy białka (eHF – extensively hydrolysed formula)",
          "B) Mieszanka aminokwasowa / elementarna (AAF – amino acid formula)",
          "C) Mieszanka sojowa oparta na izolacie białka soi",
          "D) Mieszanka hipoalergiczna typu HA (o częściowym stopniu hydrolizy)",
          "E) Pasteryzowane mleko kozie z dodatkiem witaminy B12"
        ],
        options: [
          "A) Mieszanka o wysokim stopniu hydrolizy białka (eHF – extensively hydrolysed formula)",
          "B) Mieszanka aminokwasowa / elementarna (AAF – amino acid formula)",
          "C) Mieszanka sojowa oparta na izolacie białka soi",
          "D) Mieszanka hipoalergiczna typu HA (o częściowym stopniu hydrolizy)",
          "E) Pasteryzowane mleko kozie z dodatkiem witaminy B12"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowa odpowiedź to A. Zgodnie z wytycznymi ESPGHAN preparatem I wyboru u niemowląt z łagodną/umiarkowaną ABMK jest mieszanka o wysokim stopniu hydrolizy (eHF). Mieszanka aminokwasowa (AAF) jest zarezerwowana dla ciężkich postaci (anafilaksja, ciężki FPIES) lub braku tolerancji eHF. Mieszanki HA służą tylko do prewencji, soja jest zakazana <6 m.ż., a mleko kozie daje >90% odczynów krzyżowych.",
        expl: "Prawidłowa odpowiedź to A. Zgodnie z wytycznymi ESPGHAN preparatem I wyboru u niemowląt z łagodną/umiarkowaną ABMK jest mieszanka o wysokim stopniu hydrolizy (eHF). Mieszanka aminokwasowa (AAF) jest zarezerwowana dla ciężkich postaci (anafilaksja, ciężki FPIES) lub braku tolerancji eHF. Mieszanki HA służą tylko do prewencji, soja jest zakazana <6 m.ż., a mleko kozie daje >90% odczynów krzyżowych."
      },
      {
        tag: "👶 MATKA KARMIĄCA / SUPLEMENTACJA",
        q: "Kobieta karmiąca wyłącznie piersią 2-miesięczne niemowlę, u którego zdiagnozowano alergiczne zapalenie prostnicy i okrężnicy wywołane białkami mleka krowiego (FPIAP), przechodzi na dietę bezmleczną. Jaki element suplementacji farmakologicznej u matki jest bezwzględnie konieczny w trakcie stosowania tej diety?",
        opts: [
          "A) Suplementacja wapnia elementarnego w dawce 1000 mg/dobę oraz witaminy D3",
          "B) Suplementacja żelaza elementarnego w dawce 200 mg/dobę",
          "C) Suplementacja kwasu solnego w tabletkach przed posiłkiem",
          "D) Podawanie matce doustnych leków przeciwhistaminowych I generacji",
          "E) Brak konieczności jakiejkolwiek suplementacji u matki"
        ],
        options: [
          "A) Suplementacja wapnia elementarnego w dawce 1000 mg/dobę oraz witaminy D3",
          "B) Suplementacja żelaza elementarnego w dawce 200 mg/dobę",
          "C) Suplementacja kwasu solnego w tabletkach przed posiłkiem",
          "D) Podawanie matce doustnych leków przeciwhistaminowych I generacji",
          "E) Brak konieczności jakiejkolwiek suplementacji u matki"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowa odpowiedź to A. Wyeliminowanie z diety kobiety karmiącej nabiału pozbawia ją głównego źródła wapnia. Aby zapobiec demineralizacji kośćca matki (utrata wapnia z pokarmem wynosi ok. 250-300 mg/dobę), wytyczne żywieniowe bezwzględnie nakazują suplementację wapnia w dawce 1000 mg/dobę w połączeniu z witaminą D3.",
        expl: "Prawidłowa odpowiedź to A. Wyeliminowanie z diety kobiety karmiącej nabiału pozbawia ją głównego źródła wapnia. Aby zapobiec demineralizacji kośćca matki (utrata wapnia z pokarmem wynosi ok. 250-300 mg/dobę), wytyczne żywieniowe bezwzględnie nakazują suplementację wapnia w dawce 1000 mg/dobę w połączeniu z witaminą D3."
      },
      {
        tag: "🧪 MECHANIZMY IMMUNOLOGICZNE / KOMBINATORYKA",
        q: "Oceń prawdziwość poniższych zdań dotyczących postaci alergii na białka mleka krowiego (ABMK):\n1. Alergiczne zapalenie prostnicy i okrężnicy indukowane białkami pokarmowymi (FPIAP) przebiega typowo z ujemnymi wynikami swoistych IgE (sIgE).\n2. Wstrząs anafilaktyczny po spożyciu mleka krowiego jest reakcją IgE-zależną mediowaną przez degranulację mastocytów.\n3. Ujemny wynik punktowych testów skórnych (SPT) i brak swoistych IgE we krwi definitywnie wyklucza rozpoznanie ABMK u niemowlęcia.\n4. Zespół FPIES charakteryzuje się opóźnionymi wymiotami (1–4 h po spożyciu) i może prowadzić do hipotermii i wstrząsu hipowolemicznego.\nPrawdziwe są:",
        opts: [
          "A) 1, 2, 4",
          "B) 1, 3",
          "C) 2, 3, 4",
          "D) Tylko 1 i 2",
          "E) Wszystkie wymienione"
        ],
        options: [
          "A) 1, 2, 4",
          "B) 1, 3",
          "C) 2, 3, 4",
          "D) Tylko 1 i 2",
          "E) Wszystkie wymienione"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowa odpowiedź to A (zdania 1, 2, 4 są prawdziwe). Zdanie 3 jest fałszywe: postacie żołądkowo-jelitowe (FPIAP, FPIES, enteropatia) są reakcjami IgE-niezależnymi, dlatego ujemne testy skórne i brak sIgE są w nich zjawiskiem typowym i NIE wykluczają alergii!",
        expl: "Prawidłowa odpowiedź to A (zdania 1, 2, 4 są prawdziwe). Zdanie 3 jest fałszywe: postacie żołądkowo-jelitowe (FPIAP, FPIES, enteropatia) są reakcjami IgE-niezależnymi, dlatego ujemne testy skórne i brak sIgE są w nich zjawiskiem typowym i NIE wykluczają alergii!"
      },
      {
        tag: "❌ WSKAŻ FAŁSZYWE / PREPARATY SOJOWE I MLEKA INNYCH SSAKÓW",
        q: "Wskaż zdanie FAŁSZYWE dotyczące stosowania mlek zastępczych u niemowląt z alergią na białka mleka krowiego:",
        opts: [
          "A) Mleko kozie jest bezpiecznym i zalecanym zamiennikiem mleka krowiego u niemowląt z ABMK ze względu na brak reakcji krzyżowych",
          "B) Preparaty sojowe nie powinny być stosowane u niemowląt z alergią pokarmową poniżej 6. miesiąca życia ze względu na obecność izoflawonów (fitoestrogenów) oraz ryzyko współistniejącej alergii na soję",
          "C) Mieszanki o częściowym stopniu hydrolizy (typu HA) nie mają zastosowania w leczeniu objawowej ABMK",
          "D) Mieszanki aminokwasowe (elementarne) są w 100% hipoalergiczne i nie wywołują reakcji immunologicznej",
          "E) Reakcja krzyżowa między mlekiem krowim a mięsem wołowym występuje u około 10–20% dzieci z ABMK"
        ],
        options: [
          "A) Mleko kozie jest bezpiecznym i zalecanym zamiennikiem mleka krowiego u niemowląt z ABMK ze względu na brak reakcji krzyżowych",
          "B) Preparaty sojowe nie powinny być stosowane u niemowląt z alergią pokarmową poniżej 6. miesiąca życia ze względu na obecność izoflawonów (fitoestrogenów) oraz ryzyko współistniejącej alergii na soję",
          "C) Mieszanki o częściowym stopniu hydrolizy (typu HA) nie mają zastosowania w leczeniu objawowej ABMK",
          "D) Mieszanki aminokwasowe (elementarne) są w 100% hipoalergiczne i nie wywołują reakcji immunologicznej",
          "E) Reakcja krzyżowa między mlekiem krowim a mięsem wołowym występuje u około 10–20% dzieci z ABMK"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowa odpowiedź to A (zdanie fałszywe). Mleko ssaków kopytnych (kozie, owcze) wykazuje >90% reaktywności krzyżowej z mlekiem krowim z powodu wysokiej homologii sekwencji aminokwasowych kazeiny i beta-laktoglobuliny. Podanie mleka koziego dziecku z ABMK grozi ciężką reakcją anafilaktyczną i jest bezwzględnie przeciwwskazane!",
        expl: "Prawidłowa odpowiedź to A (zdanie fałszywe). Mleko ssaków kopytnych (kozie, owcze) wykazuje >90% reaktywności krzyżowej z mlekiem krowim z powodu wysokiej homologii sekwencji aminokwasowych kazeiny i beta-laktoglobuliny. Podanie mleka koziego dziecku z ABMK grozi ciężką reakcją anafilaktyczną i jest bezwzględnie przeciwwskazane!"
      },
      {
        tag: "🚨 FPIES / OSTRY ZESPÓŁ ENTEROPATII",
        q: "6-miesięczne niemowlę 2 godziny po pierwszym w życiu podaniu kaszki mleczno-ryżowej nagle stało się wiotkie, blade, apatyczne i zaczęło gwałtownie, seryjnie wymiotować. Temperatura ciała wynosi 35.6°C (hipotermia), tętno 160/min, ciśnienie 70/40 mmHg. Nie stwierdza się pokrzywki ani świstów wydechowych. W badaniach laboratoryjnych: leukocytoza 24.0 G/L z neutrofilią i kwasica metaboliczna. Jaka jest najbardziej prawdopodobna diagnoza?",
        opts: [
          "A) Ostry zespół zapalenia jelit indukowany białkami pokarmowymi (FPIES)",
          "B) Wstrząs anafilaktyczny IgE-zależny",
          "C) Zespół hemolityczno-mocznicowy (HUS)",
          "D) Ostre zapalenie wyrostka robaczkowego z perforacją",
          "E) Wrodzona wada metaboliczna cyklu mocznikowego"
        ],
        options: [
          "A) Ostry zespół zapalenia jelit indukowany białkami pokarmowymi (FPIES)",
          "B) Wstrząs anafilaktyczny IgE-zależny",
          "C) Zespół hemolityczno-mocznicowy (HUS)",
          "D) Ostre zapalenie wyrostka robaczkowego z perforacją",
          "E) Wrodzona wada metaboliczna cyklu mocznikowego"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowa odpowiedź to A. Klasyczny epizod ostrego FPIES: początek 1-4h po spożyciu antygenu (mleko, soja, ryż, owies), gwałtowne powtarzające się wymioty prowadzące do odwodnienia i wstrząsu, hipotermia (<36°C), brak objawów skórnych/oddechowych (w przeciwieństwie do anafilaksji) oraz wysoka leukocytoza neutrofilowa. Stan ten wymaga pilnej płynoterapii dożylnej.",
        expl: "Prawidłowa odpowiedź to A. Klasyczny epizod ostrego FPIES: początek 1-4h po spożyciu antygenu (mleko, soja, ryż, owies), gwałtowne powtarzające się wymioty prowadzące do odwodnienia i wstrząsu, hipotermia (<36°C), brak objawów skórnych/oddechowych (w przeciwieństwie do anafilaksji) oraz wysoka leukocytoza neutrofilowa. Stan ten wymaga pilnej płynoterapii dożylnej."
      },
      {
        tag: "💉 ANAFILAKSJA / POSTĘPOWANIE RATUNKOWE",
        q: "U 8-miesięcznego niemowlęcia z IgE-zależną alergią na mleko krowie omyłkowo podano jogurt. Po 5 minutach wystąpiła uogólniona pokrzywka, obrzęk warg i powiek, świszczący oddech (stridor) oraz narastająca duszność. Jaki lek należy podać w pierwszej kolejności, jaką drogą i w jakiej dawce?",
        opts: [
          "A) Adrenalinę domięśniowo (i.m.) w przednio-boczną powierzchnię uda w dawce 0.01 mg/kg m.c. (roztwór 1 mg/ml: 1:1000)",
          "B) Hydrokortyzon dożylnie w dawce 10 mg/kg m.c.",
          "C) Klemastynę domięśniowo w dawce 1 mg",
          "D) Wziewny salbutamol przez nebulizator jako jedyny lek",
          "E) Deksametazon doustnie w kroplach"
        ],
        options: [
          "A) Adrenalinę domięśniowo (i.m.) w przednio-boczną powierzchnię uda w dawce 0.01 mg/kg m.c. (roztwór 1 mg/ml: 1:1000)",
          "B) Hydrokortyzon dożylnie w dawce 10 mg/kg m.c.",
          "C) Klemastynę domięśniowo w dawce 1 mg",
          "D) Wziewny salbutamol przez nebulizator jako jedyny lek",
          "E) Deksametazon doustnie w kroplach"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowa odpowiedź to A. Jedynym lekiem pierwszego rzutu ratującym życie w anafilaksji jest ADRENALINA podana DOMIĘŚNIOWO (i.m.) w środkową 1/3 przednio-bocznej powierzchni uda w dawce 0.01 mg/kg m.c. (maks. 0.3 mg u dzieci przed okresem dojrzewania). Leki przeciwhistaminowe i glikokortykosteroidy są lekami drugiego rzutu i nie zapobiegają zgonowi z powodu obrzęku krtani czy zapaści naczyniowej!",
        expl: "Prawidłowa odpowiedź to A. Jedynym lekiem pierwszego rzutu ratującym życie w anafilaksji jest ADRENALINA podana DOMIĘŚNIOWO (i.m.) w środkową 1/3 przednio-bocznej powierzchni uda w dawce 0.01 mg/kg m.c. (maks. 0.3 mg u dzieci przed okresem dojrzewania). Leki przeciwhistaminowe i glikokortykosteroidy są lekami drugiego rzutu i nie zapobiegają zgonowi z powodu obrzęku krtani czy zapaści naczyniowej!"
      },
      {
        tag: "📈 NATURALNY PRZEBIEG / NABYWANIE TOLERANCJI",
        q: "Jaki jest naturalny przebieg alergii na białka mleka krowiego u niemowląt i kiedy u większości dzieci dochodzi do samoistnego wykształcenia tolerancji pokarmowej?",
        opts: [
          "A) Ponad 80–90% dzieci nabywa tolerancję immunologiczną do 3.–5. roku życia",
          "B) Alergia na mleko krowie jest chorobą nieuleczalną i trwa przez całe dorosłe życie",
          "C) Tolerancja pojawia się zawsze dokładnie w 6. miesiącu życia",
          "D) Z alergii na mleko krowie wyrastają wyłącznie dziewczynki",
          "E) Nabycie tolerancji jest niemożliwe bez wcześniejszego przeszczepienia mikrobioty jelitowej"
        ],
        options: [
          "A) Ponad 80–90% dzieci nabywa tolerancję immunologiczną do 3.–5. roku życia",
          "B) Alergia na mleko krowie jest chorobą nieuleczalną i trwa przez całe dorosłe życie",
          "C) Tolerancja pojawia się zawsze dokładnie w 6. miesiącu życia",
          "D) Z alergii na mleko krowie wyrastają wyłącznie dziewczynki",
          "E) Nabycie tolerancji jest niemożliwe bez wcześniejszego przeszczepienia mikrobioty jelitowej"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowa odpowiedź to A. Rokowanie w ABMK u niemowląt jest bardzo dobre: u około 50% dzieci tolerancja wykształca się do końca 1. roku życia, u ponad 75% do 3. roku życia, a u 90% do 5. roku życia. Postacie nie-IgE zależne (FPIAP) ustępują zazwyczaj wcześniej niż ciężkie postacie IgE-zależne.",
        expl: "Prawidłowa odpowiedź to A. Rokowanie w ABMK u niemowląt jest bardzo dobre: u około 50% dzieci tolerancja wykształca się do końca 1. roku życia, u ponad 75% do 3. roku życia, a u 90% do 5. roku życia. Postacie nie-IgE zależne (FPIAP) ustępują zazwyczaj wcześniej niż ciężkie postacie IgE-zależne."
      },
      {
        tag: "🪜 DRABINA MLECZNA / PROWOKACJA W DOMU",
        q: "Na czym polega koncepcja tzw. 'drabiny mlecznej' (Milk Ladder) wykorzystywana w ponownym wprowadzaniu produktów mlecznych u dzieci z ustępującą ABMK?",
        opts: [
          "A) Na stopniowym podawaniu produktów mlecznych od poddanych najsilniejszej obróbce termicznej w matrycy mącznej (np. pieczone herbatniki, muffinki), przez produkty fermentowane (jogurt, ser żółty), aż po mleko pasteryzowane",
          "B) Na codziennym podwajaniu ilości surowego mleka krowiego pitego rano na czczo",
          "C) Na wspinaniu się dziecka po drabince gimnastycznej podczas picia mleka modyfikowanego",
          "D) Na podawaniu mleka wyłącznie w pozycji pionowej z użyciem specjalnego cewnika",
          "E) Na zastępowaniu mleka krowiego mlekiem sojowym w parzyste dni tygodnia"
        ],
        options: [
          "A) Na stopniowym podawaniu produktów mlecznych od poddanych najsilniejszej obróbce termicznej w matrycy mącznej (np. pieczone herbatniki, muffinki), przez produkty fermentowane (jogurt, ser żółty), aż po mleko pasteryzowane",
          "B) Na codziennym podwajaniu ilości surowego mleka krowiego pitego rano na czczo",
          "C) Na wspinaniu się dziecka po drabince gimnastycznej podczas picia mleka modyfikowanego",
          "D) Na podawaniu mleka wyłącznie w pozycji pionowej z użyciem specjalnego cewnika",
          "E) Na zastępowaniu mleka krowiego mlekiem sojowym w parzyste dni tygodnia"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowa odpowiedź to A. 'Drabina mleczna' (Milk Ladder) opiera się na fakcie, że pieczenie białek serwatkowych w obecności mąki (efekt Maillarda) niszczy ich epitopy alergenowe (stają się tolerowane przez ok. 70% dzieci z ABMK). Stopnie drabiny: 1) Pieczone ciasteczka; 2) Zapiekanki/muffinki; 3) Naleśniki; 4) Sery twarde/jogurty; 5) Mleko pasteryzowane. Ułatwia to i przyspiesza wykształcenie tolerancji.",
        expl: "Prawidłowa odpowiedź to A. 'Drabina mleczna' (Milk Ladder) opiera się na fakcie, że pieczenie białek serwatkowych w obecności mąki (efekt Maillarda) niszczy ich epitopy alergenowe (stają się tolerowane przez ok. 70% dzieci z ABMK). Stopnie drabiny: 1) Pieczone ciasteczka; 2) Zapiekanki/muffinki; 3) Naleśniki; 4) Sery twarde/jogurty; 5) Mleko pasteryzowane. Ułatwia to i przyspiesza wykształcenie tolerancji."
      },
      {
        tag: "🔍 RÓŻNICOWANIE / NIETOLERANCJA LAKTOZY",
        q: "Matka pyta o różnicę między alergią na białka mleka krowiego a nietolerancją laktozy. Prawidłowa odpowiedź lekarza to:",
        opts: [
          "A) Alergia to reakcja układu immunologicznego na białko mleka (kazeinę/serwatkę), natomiast nietolerancja laktozy to zaburzenie metaboliczne wynikające z niedoboru enzymu (laktazy) trawiącego cukier mleczny (laktozę) i nie daje objawów skórnych ani krwi w stolcu",
          "B) To dwie nazwy dokładnie tej samej choroby zakaźnej",
          "C) Nietolerancja laktozy prowadzi do wstrząsu anafilaktycznego, a alergia na mleko nie",
          "D) W nietolerancji laktozy podaje się mieszanki aminokwasowe, a w alergii laktazę",
          "E) Nietolerancja laktozy występuje wyłącznie u noworodków karmionych piersią"
        ],
        options: [
          "A) Alergia to reakcja układu immunologicznego na białko mleka (kazeinę/serwatkę), natomiast nietolerancja laktozy to zaburzenie metaboliczne wynikające z niedoboru enzymu (laktazy) trawiącego cukier mleczny (laktozę) i nie daje objawów skórnych ani krwi w stolcu",
          "B) To dwie nazwy dokładnie tej samej choroby zakaźnej",
          "C) Nietolerancja laktozy prowadzi do wstrząsu anafilaktycznego, a alergia na mleko nie",
          "D) W nietolerancji laktozy podaje się mieszanki aminokwasowe, a w alergii laktazę",
          "E) Nietolerancja laktozy występuje wyłącznie u noworodków karmionych piersią"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowa odpowiedź to A. Częsta pułapka u rodziców i w pytaniach LEK: Alergia na mleko angażuje układ odpornościowy (antygenem jest BIAŁKO). Nietolerancja laktozy jest defektem enzymatycznym (niedobór laktazy rąbka szczoteczkowego enterocytów niezdolnej do rozbicia CUKRU laktozy na glukozę i galaktozę) – objawia się biegunką fermentacyjną, wzdęciami i kwaśnym odczynem stolca (pH <5.5), ale NIGDY nie daje zmian atopowych na skórze ani krwi w kale!",
        expl: "Prawidłowa odpowiedź to A. Częsta pułapka u rodziców i w pytaniach LEK: Alergia na mleko angażuje układ odpornościowy (antygenem jest BIAŁKO). Nietolerancja laktozy jest defektem enzymatycznym (niedobór laktazy rąbka szczoteczkowego enterocytów niezdolnej do rozbicia CUKRU laktozy na glukozę i galaktozę) – objawia się biegunką fermentacyjną, wzdęciami i kwaśnym odczynem stolca (pH <5.5), ale NIGDY nie daje zmian atopowych na skórze ani krwi w kale!"
      },
      {
        tag: "🛡️ MARSZ ALERGICZNY / PREWENCJA",
        q: "Pojęcie 'marszu alergicznego' (atopic march) u dzieci z wczesnodziecięcą alergią na białka mleka krowiego i atopowym zapaleniem skóry oznacza:",
        opts: [
          "A) Progresję manifestacji atopowych z wiekiem: od alergii pokarmowej i AZS w niemowlęctwie, przez astmę oskrzelową w wieku przedszkolnym, aż po alergiczny nieżyt nosa i pyłkowicę u dzieci starszych",
          "B) Konieczność codziennych spacerów marszowych z niemowlęciem na odległość 5 km",
          "C) Stopniowe rozszerzanie alergii na wszystkie owoce cytrusowe",
          "D) Przejście alergii pokarmowej w reumatoidalne zapalenie stawów",
          "E) Wystąpienie obrzęku stóp uniemożliwiającego chodzenie"
        ],
        options: [
          "A) Progresję manifestacji atopowych z wiekiem: od alergii pokarmowej i AZS w niemowlęctwie, przez astmę oskrzelową w wieku przedszkolnym, aż po alergiczny nieżyt nosa i pyłkowicę u dzieci starszych",
          "B) Konieczność codziennych spacerów marszowych z niemowlęciem na odległość 5 km",
          "C) Stopniowe rozszerzanie alergii na wszystkie owoce cytrusowe",
          "D) Przejście alergii pokarmowej w reumatoidalne zapalenie stawów",
          "E) Wystąpienie obrzęku stóp uniemożliwiającego chodzenie"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowa odpowiedź to A. Marsz alergiczny (atopic march): sekwencja naturalnego rozwoju chorób atopowych. W niemowlęctwie dominuje uszkodzenie bariery naskórkowej (AZS) i przewodu pokarmowego (ABMK). W kolejnych latach dochodzi do uczulenia na alergeny wziewne, manifestującego się nadreaktywnością oskrzeli (astma wczesnodziecięca) i alergicznym nieżytem nosa (katar sienny).",
        expl: "Prawidłowa odpowiedź to A. Marsz alergiczny (atopic march): sekwencja naturalnego rozwoju chorób atopowych. W niemowlęctwie dominuje uszkodzenie bariery naskórkowej (AZS) i przewodu pokarmowego (ABMK). W kolejnych latach dochodzi do uczulenia na alergeny wziewne, manifestującego się nadreaktywnością oskrzeli (astma wczesnodziecięca) i alergicznym nieżytem nosa (katar sienny)."
      },
      {
        tag: "📋 DIAGNOSTYKA RÓŻNICOWA / WGŁOBIENIE JELITA",
        q: "Który objaw kliniczny najsilniej przemawia ZA wgłobieniem jelita (invaginatio), a PRZECIWKO prostemu alergicznemu zapaleniu prostnicy i okrężnicy (FPIAP) u niemowlęcia z krwią w stolcu?",
        opts: [
          "A) Nagły, napadowy, silny ból brzucha z podkurczaniem nóżek, bladością i apatią między napadami oraz stolec o wyglądzie 'galaretki porzeczkowej'",
          "B) Dobry stan ogólny dziecka i prawidłowe łaknienie",
          "C) Obecność drobnych smug jasnoczerwonej krwi na powierzchni stolca",
          "D) Współistnienie wyprysku atopowego na policzkach",
          "E) Prawidłowy obraz ultrasonograficzny jamy brzusznej"
        ],
        options: [
          "A) Nagły, napadowy, silny ból brzucha z podkurczaniem nóżek, bladością i apatią między napadami oraz stolec o wyglądzie 'galaretki porzeczkowej'",
          "B) Dobry stan ogólny dziecka i prawidłowe łaknienie",
          "C) Obecność drobnych smug jasnoczerwonej krwi na powierzchni stolca",
          "D) Współistnienie wyprysku atopowego na policzkach",
          "E) Prawidłowy obraz ultrasonograficzny jamy brzusznej"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowa odpowiedź to A. Wgłobienie jelita jest stanem nagłym chirurgicznym: silny napadowy ból (krzyk, podkurczanie nóżek), bladość, wymioty i stolec podbarwiony śluzem i krwią jak 'galaretka porzeczkowa' (martwica i przekrwienie śluzówki). W FPIAP dziecko jest pogodne, rozwija się dobrze, a krew pojawia się w postaci smug w stolcu bez ostrej niewydolności krążeniowej.",
        expl: "Prawidłowa odpowiedź to A. Wgłobienie jelita jest stanem nagłym chirurgicznym: silny napadowy ból (krzyk, podkurczanie nóżek), bladość, wymioty i stolec podbarwiony śluzem i krwią jak 'galaretka porzeczkowa' (martwica i przekrwienie śluzówki). W FPIAP dziecko jest pogodne, rozwija się dobrze, a krew pojawia się w postaci smug w stolcu bez ostrej niewydolności krążeniowej."
      }
    ];

    c.flashcards = [
      {
        q: "Jaki jest preparat mlekozastępczy I wyboru w leczeniu łagodnej i umiarkowanej ABMK u niemowląt?",
        a: "Mieszanka o wysokim stopniu hydrolizy białka (eHF – extensively hydrolysed formula)."
      },
      {
        q: "Kiedy w leczeniu ABMK wskazana jest mieszanka aminokwasowa (AAF)?",
        a: "W ciężkiej anafilaksji, ostrym zespole FPIES, ciężkim zahamowaniu wzrastania lub przy braku tolerancji/poprawy po mieszance eHF."
      },
      {
        q: "Czy ujemny wynik swoistych IgE (sIgE) i testów skórnych Prick wyklucza ABMK u niemowlęcia z krwią w stolcu?",
        a: "NIE – postać żołądkowo-jelitowa (FPIAP) jest reakcją IgE-niezależną (komórkową) i testy serologiczne są w niej typowo ujemne!"
      },
      {
        q: "Dlaczego mleko kozie jest przeciwwskazane u niemowląt z alergią na mleko krowie?",
        a: "Wykazuje ponad 90% reaktywności krzyżowej z mlekiem krowim (ryzyko wstrząsu anafilaktycznego) oraz zawiera za mało kwasu foliowego."
      },
      {
        q: "Jaki jest złoty standard diagnostyki alergii na białka mleka krowiego?",
        a: "Próba eliminacji białek mleka krowiego (2-4 tygodnie) i ponowna kontrolowana próba prowokacji pokarmowej (challenge)."
      },
      {
        q: "Jaka jest dawka i droga podania adrenaliny w anafilaksji u niemowlęcia?",
        a: "0.01 mg/kg m.c. (0.01 ml/kg roztworu 1:1000) domięśniowo (i.m.) w przednio-boczną powierzchnię uda."
      }
    ];
  });

  console.log("Cases 101 and 102 rework completed successfully!");
}

run().catch(err => {
  console.error("Error reworking cases 101-102:", err);
  process.exit(1);
});

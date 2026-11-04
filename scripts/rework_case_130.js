const fs = require('fs');
const path = require('path');
const { encryptStringAes } = require('./encrypt_case.js');

const MASTER_KEY = '@LEKSzymon28111999';
const CASES_DIR = path.join(__dirname, '..', 'cases');

console.log("Generating Case 130: Niedrożność mechaniczna jelita cienkiego (zrostowa)...");

async function saveCase(caseData) {
  const filePath = path.join(CASES_DIR, caseData.filename);
  const jsonStr = JSON.stringify(caseData, null, 2);
  const encrypted = await encryptStringAes(jsonStr, MASTER_KEY);
  fs.writeFileSync(filePath, JSON.stringify(encrypted, null, 2), 'utf8');
  console.log(`[SAVED] Case #${caseData.id}: ${caseData.filename} (LEK Qs: ${caseData.lekQuestions.length}, Steps: ${caseData.steps.length}, Flashcards: ${caseData.flashcards.length})`);
}

const case130 = {
  id: 130,
  filename: "130_niedroznosc_jelita_cienkiego_zrosty.json",
  dept: "Chirurgia ogólna",
  shortTitle: "45-letnia Marzena – Bóle kurczowe, wymioty treścią jelitową, poziomy płynów i metaliczna perystaltyka (Niedrożność mechaniczna jelita cienkiego)",
  diagnosisTitle: "Niedrożność mechaniczna jelita cienkiego (Small Bowel Obstruction – SBO) spowodowana pasmami zrostów pooperacyjnych po przebytej apendektomii i cięciu cesarskim",
  vitals: [
    { label: "Częstość akcji serca (HR)", val: "112/min", sub: "Tachykardia w przebiegu odwodnienia hipowolemicznego", status: "vital-warn" },
    { label: "Ciśnienie tętnicze (RR)", val: "100/62 mmHg", sub: "Tendencja do hipotensji (sekwestracja płynów w jelicie)", status: "vital-warn" },
    { label: "Osłuchiwanie brzucha", val: "Szmery metaliczne / staccato", sub: "Wzmożona perystaltyka przeszkodowa", status: "vital-crit" },
    { label: "RTG jamy brzusznej", val: "Liczne poziomy płynów", sub: "Obraz 'schodków' w pętlach jelita cienkiego", status: "vital-crit" }
  ],
  vitalsObj: { hr: 112, bp: "100/62", spo2: 98, rr: 20, temp: 37.3, gcs: 15 },
  story: `<p><strong>Pacjentka:</strong> 45-letnia Marzena (nauczycielka, masa ciała 64 kg) została przywieziona na szpitalny oddział ratunkowy z powodu silnego, kurczowego bólu brzucha o charakterze falowym, postępującego wzdęcia brzucha, całkowitego zatrzymania oddawania gazów i stolca od ponad 36 godzin oraz obfitych, wielokrotnych wymiotów.</p><p><strong>Wywiad chorobowy:</strong> Dolegliwości rozpoczęły się wczoraj rano jako napadowe, kolkowe skurcze w okolicy pępka, pojawiające się co kilka minut. Wraz ze skurczami pojawiały się głośne 'przelewania' w brzuchu. Po południu dołączyły nudności i gwałtowne wymioty – początkowo zjedzonym śniadaniem, następnie obfitą treścią ciemnozielono-żółciową, a od dzisiejszej nocy cuchnącą, brunatną treścią o wyglądzie i zapachu kałowym (treść jelitowa z zastoju). Od ponad 36 godzin pacjentka nie oddała ani stolca, ani gazów. Przyjęła leki rozkurczowe (drotawerynę) i wypiła herbatę miętową, co natychmiast wywołało kolejną falę chlustających wymiotów. W wywiadzie chirurgicznym: przebyta klasyczna apendektomia w wieku 16 lat (blizna w prawym dole biodrowym) oraz cięcie cesarskie przed 8 laty (blizna Pfannenstiela nad spojeniem łonowym).</p><p><strong>Badanie przedmiotowe na SOR:</strong> Kobieta w stanie ogólnym średnim, odwodniona, podsypiająca, język suchy, pokryty brunatnym nalotem, turgor skóry obniżony. Brzuch znacznie i asymetrycznie wzdęty, bardziej w śródbrzuszu, bolesny uogólniony przy palpacji w czasie napadów kurczowych, bez objawów otrzewnowych (objaw Blumberga ujemny, powłoki miękkie pomiędzy skurczami). Widoczne dwie zagojone blizny pooperacyjne: cięcie McBurneya i cięcie Pfannenstiela. W rzucie śródbrzusza u szczupłej pacjentki okresowo widoczne 'stawianie się pętli jelitowych' (uwypuklanie się poszerzonych pętli pod skórą w czasie fali perystaltycznej). W badaniu osłuchowym: uderzające, głośne szmery perystaltyczne o wysokim, dźwięcznym, metalicznym tonie (objaw 'spadającej kropli' / pluskania / staccato). W opukiwaniu odgłos bębenkowy nad całym brzuchem. Wrota przepuklinowe (pachwinowe, udowe, pępkowe i w bliznach) całkowicie wolne, bez wyczuwalnych oporów. W badaniu per rectum (DRE): bańka odbytnicy pusta, zapadnięta, bez obecności mas kałowych.</p>`,
  labs: {
    "Gazometria i zaburzenia elektrolitowe (obraz odwodnienia i wymiotów)": [
      { name: "Potas w surowicy (K+)", val: "3,1 mmol/l", norm: "3,5 - 5,1 mmol/l", flag: "LOW" },
      { name: "Chlorki (Cl-)", val: "88 mmol/l", norm: "98 - 107 mmol/l", flag: "CRIT_LOW" },
      { name: "Sód (Na+)", val: "132 mmol/l", norm: "135 - 145 mmol/l", flag: "LOW" },
      { name: "pH krwi żylnej", val: "7,49", norm: "7,35 - 7,45", flag: "HIGH" },
      { name: "Wodorowęglany aktualne (HCO3-)", val: "32,0 mmol/l", norm: "22 - 26 mmol/l", flag: "HIGH" },
      { name: "Kwasica mleczanowa (mleczany)", val: "1,4 mmol/l", norm: "0,5 - 2,0 mmol/l", flag: "NORMAL" }
    ],
    "Parametry nerkowe i morfologia (zagęszczenie krwi)": [
      { name: "Hematokryt (Ht)", val: "48,5 %", norm: "36 - 46 %", flag: "HIGH" },
      { name: "Hemoglobina (Hb)", val: "15,8 g/dl", norm: "12,0 - 15,5 g/dl", flag: "HIGH" },
      { name: "Mocznik", val: "58 mg/dl", norm: "15 - 45 mg/dl", flag: "HIGH" },
      { name: "Kreatynina w surowicy", val: "1,35 mg/dl", norm: "0,50 - 0,90 mg/dl", flag: "HIGH" },
      { name: "Leukocyty (WBC)", val: "11,2 tys./µl", norm: "4,0 - 10,0 tys./µl", flag: "HIGH" },
      { name: "CRP", val: "18,0 mg/l", norm: "< 5,0 mg/l", flag: "HIGH" }
    ],
    "Przeglądowe RTG jamy brzusznej na stojąco": [
      { name: "Pętle jelita cienkiego", val: "Znacznie poszerzone do 42 mm, z obecnością licznych poziomów płynów układających się kaskadowo w 'obraz schodków'", norm: "Średnica < 25 mm, bez poziomów", flag: "CRIT_HIGH" },
      { name: "Fałdy okrężne (Kerckringa)", val: "Wyraźnie widoczne, przebiegające poprzecznie przez całą szerokość poszerzonego światła jelita", norm: "Niewidoczne", flag: "CRIT_HIGH" },
      { name: "Okrężnica i odbytnica", val: "Całkowity brak gazu w obrębie jelita grubego (pusta okrężnica zstępująca i esica)", norm: "Fizjologiczna obecność gazu", flag: "CRIT_LOW" },
      { name: "Wolny gaz podprzeponowy", val: "Nieobecny (brak pneumoperitoneum)", norm: "Nieobecny", flag: "NORMAL" }
    ]
  },
  steps: [
    {
      title: "Krok 1: Identyfikacja tetrad objawów niedrożności mechanicznej jelit",
      text: "Pacjentka podaje kolkowe bóle brzucha co kilka minut, wymioty treścią jelitową, wzdęcie brzucha oraz brak gazów i stolca od 36 godzin. W badaniu stwierdzasz metaliczne szmery perystaltyczne. Jakie 4 objawy tworzą klasyczną tetradę niedrożności mechanicznej przewodu pokarmowego?",
      options: [
        "Ból brzucha o charakterze kurczowym (kolkowym), nudności i wymioty, wzdęcie brzucha (meteorismus) oraz zatrzymanie oddawania gazów i stolca",
        "Gorączka hektyczna, żółtaczka mechaniczna, ból pod prawym łukiem oraz utrata masy ciała",
        "Wodnista biegunka, wybroczyny na skórze, krwiomocz oraz spadek ciśnienia",
        "Ból głowy, wymioty poranne, tarcza zastoinowa oraz bradykardia"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Klasyczna podręcznikowa tetrada objawów mechanicznej niedrożności jelit (ileus mechanicus) obejmuje:</strong><br>1. Kolkowy ból brzucha (ból falowy związany ze skurczem walki pętli jelitowych powyżej przeszkody),<br>2. Wymioty (ich charakter zależy od poziomu niedrożności: w wysokiej wczesne i obfite żołądkowo-żółciowe, w niskiej późniejsze i o zapachu kałowym),<br>3. Zatrzymanie gazów i stolca (brak oddawania gazów przez odbyt to najpewniejszy objaw pełnej mechanicznej niedrożności),<br>4. Wzdęcie brzucha (meteorismus).",
        "❌ BŁĄD! <strong>Gorączka, żółtaczka i ból podżebrza to triada Charcota w zapaleniu dróg żółciowych.</strong>",
        "❌ BŁĄD! <strong>Biegunka i wybroczyny to objawy infekcji lub zapalenia naczyń (np. HUS, IgAV).</strong>",
        "❌ BŁĄD! <strong>Objawy neurologiczne to zespół wzmożonego ciśnienia wewnątrzczaszkowego.</strong>"
      ]
    },
    {
      title: "Krok 2: Przyczyny niedrożności mechanicznej jelita cienkiego (SBO)",
      text: "Marzena przebyła w przeszłości dwie operacje w podbrzuszu (apendektomię i cięcie cesarskie). Jaka jest statystycznie najczęstsza przyczyna mechanicznej niedrożności jelita cienkiego u osób dorosłych w krajach rozwiniętych?",
      options: [
        "Zrosty pooperacyjne (pasma łącznotkankowe / zrosty otrzewnowe), odpowiadające za 60-75% wszystkich przypadków niedrożności jelita cienkiego",
        "Rak jelita cienkiego (gruczolakorak dwunastnicy)",
        "Niedrożność spowodowana połknięciem kamieni żółciowych (gallstone ileus)",
        "Glistnica przewodu pokarmowego z kłębem pasożytów"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Zrosty wewnątrzotrzewnowe (adhesions) powstałe po wcześniejszych operacjach chirurgicznych są przyczyną aż 60-75% przypadków mechanicznej niedrożności jelita cienkiego (SBO) u dorosłych!</strong> Drugą najczęstszą przyczyną są uwięźnięte przepukliny (ok. 15-20%), a kolejnymi nowotwory, choroba Leśniowskiego-Crohna i wgłobienia. U pacjenta z bliznami operacyjnymi i objawami niedrożności zrosty są rozpoznaniem numer jeden.",
        "❌ BŁĄD! <strong>Pierwotne nowotwory złośliwe jelita cienkiego są rzadkością</strong> (odpowiadają za <2% guzów przewodu pokarmowego).",
        "❌ BŁĄD! <strong>Niedrożność żółciowa (gallstone ileus) to rzadkie powikłanie przetoki pęcherzykowo-dwunastniczej</strong> u osób starszych.",
        "❌ BŁĄD! <strong>Glistnica to domena obszarów tropikalnych o niskim standardzie sanitarnym.</strong>"
      ]
    },
    {
      title: "Krok 3: Analiza zaburzeń wodno-elektrolitowych i kwasowo-zasadowych w SBO",
      text: "Wyniki badań laboratoryjnych Marzeny wykazują: Ht 48,5%, mocznik 58 mg/dl, K+ 3,1 mmol/l, Cl- 88 mmol/l, pH 7,49, HCO3- 32 mmol/l. Jaki typ zaburzenia metabolicznego rozwinął się u pacjentki i z czego wynika?",
      options: [
        "Hipochloremiczna, hipokaliemiczna zasadowica metaboliczna oraz odwodnienie hipowolemiczne (zagęszczenie krwi) wywołane utratą kwasu solnego, wody i elektrolitów w obfitych wymiotach oraz sekwestracją płynów w świetle rozdętych pętli jelitowych ('trzecia przestrzeń')",
        "Kwasica metaboliczna z wysoką luką anionową spowodowana zatruciem glikolem etylenowym",
        "Kwasica oddechowa z hiperkaliemią w przebiegu hipowentylacji",
        "Prawidłowy stan równowagi kwasowo-zasadowej bez zaburzeń elektrolitowych"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Masywne wymioty treścią żołądkowo-jelitową powodują utratę jonów H+ oraz Cl- (kwasu solnego), co prowadzi do klasycznej zasadowicy metabolicznej z hipochloremią.</strong> Dodatkowo nerki w odpowiedzi na hipowolemię oszczędzają sód kosztem wydalania potasu w cewce dystalnej (wtórny hiperaldosteronizm), pogłębiając hipokaliemię. Z kolei sekwestracja litrów płynów w świetle niedrożnego jelita (tzw. 'trzecia przestrzeń') prowadzi do hipowolemii, hemokoncentracji (wysoki Ht) i przednerkowej niewydolności nerek (wzrost mocznika i kreatyniny).",
        "❌ BŁĄD! <strong>Pacjentka ma pH 7,49 i HCO3- 32 mmol/l – to definicja zasadowicy (alkalozy),</strong> a nie kwasicy.",
        "❌ BŁĄD! <strong>PCO2 i oddech są prawidłowe;</strong> zaburzenie ma charakter pierwotnie metaboliczny z hipokaliemią.",
        "❌ BŁĄD! <strong>Zaburzenia są głębokie i zagrażają zaburzeniami rytmu serca z powodu hipokaliemii (3,1 mmol/l).</strong>"
      ]
    },
    {
      title: "Krok 4: Radiologiczne różnicowanie jelita cienkiego od grubego na RTG",
      text: "W RTG jamy brzusznej widoczne są poszerzone pętle z poziomami płynów. Po czym na zdjęciu rentgenowskim odróżnia się poszerzone pętle jelita cienkiego od jelita grubego?",
      options: [
        "Pętle jelita cienkiego leżą w centrum jamy brzusznej, mają liczne fałdy okrężne (Kerckringa / plicae circulares) przebiegające na CAŁEJ szerokości światła pętli (od ściany do ściany); jelito grube leży na obwodzie i posiada fałdy półksiężycowate (haustracje) przechodzące tylko przez CZĘŚĆ szerokości światła",
        "Jelito cienkie leży wyłącznie pod wątrobą i ma haustracje, a grube nie ma żadnych fałdów",
        "Nie ma możliwości odróżnienia jelita cienkiego od grubego na zwykłym zdjęciu RTG",
        "Jelito cienkie na zdjęciu rentgenowskim zawsze świeci na kolor niebieski"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>To klasyczne pytanie radiologiczno-chirurgiczne na LEK:</strong><br>- <strong>Jelito cienkie:</strong> leży centralnie, pętle układają się poprzecznie (obraz 'drabiny'), a fałdy okrężne (Kerckringa / valvulae conniventes) są gęste i <strong>przechodzą przez całą szerokość światła</strong> od brzegu do brzegu.<br>- <strong>Jelito grube (okrężnica):</strong> leży obwodowo (ramka okrężnicy), jest szersze (>5-6 cm), a fałdy półksiężycowate (haustra) są rzadziej rozmieszczone i <strong>przechodzą jedynie przez 1/3 do 1/2 szerokości światła jelita</strong>.",
        "❌ BŁĄD! <strong>Haustracje to cecha anatomiczna jelita grubego,</strong> a nie cienkiego.",
        "❌ BŁĄD! <strong>Odróżnienie obu odcinków przewodu pokarmowego na RTG jest podstawową umiejętnością lekarza SOR i chirurga.</strong>",
        "❌ BŁĄD! <strong>Obraz RTG jest czarno-biały (skala szarości).</strong>"
      ]
    },
    {
      title: "Krok 5: Wdrożenie leczenia zachowawczego – protokół ASBO i dekompresja",
      text: "U Marzeny brzuch jest miękki, brak objawów otrzewnowych, mleczany wynoszą 1,4 mmol/l (w normie), a leukocytoza 11,2 tys./µl. Zgodnie z wytycznymi Bologna Guidelines (WSES 2017) pacjentka kwalifikuje się do wstępnego leczenia zachowawczego. Jakie procedury stanowią filar leczenia zachowawczego niepowikłanej niedrożności zrostowej?",
      options: [
        "Ścisły zakaz przyjmowania czegokolwiek doustnie (NPO), natychmiastowe założenie zgłębnika żołądkowego (sondy) do dekompresji i grawitacyjnego lub czynnego odessania treści oraz agresywne nawadnianie dożylne krystaloidami z wyrównaniem potasu",
        "Podanie leków prokinetycznych (metoklopramid dożylnie) i środków przeczyszczających celem 'przepchnięcia' przeszkody",
        "Podanie 2 litrów wody doustnie z elektrolitami do wypicia w ciągu 30 minut",
        "Wykonanie natychmiastowej kolonoskopii z biopsją kątnicy"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Podstawą leczenia zachowawczego niepowikłanej niedrożności zrostowej (Adhesive SBO – ASBO) jest triada:</strong> 1. Ścisłe NPO (nic doustnie), 2. <strong>Dekompresja żołądkowo-jelitowa sondą nosowo-żołądkową (NG tube)</strong> – odsysa zalegające litry soków, zmniejsza ciśnienie w jelicie, zapobiega zachłyśnięciu do płuc i wymiotom, 3. <strong>Płynoterapia dożylna krystaloidami</strong> (uzupełnienie sekwestracji w 'trzeciej przestrzeni') wraz z suplementacją chlorku potasu (<span class='dose-pill'>KCl 40 mmol w 1000 ml PWE i.v.</span>) i wyrównaniem zasadowicy.",
        "❌ BŁĄD! <strong>Leki prokinetyczne (metoklopramid) i środki przeczyszczające w mechanicznej niedrożności są BEZWZGLĘDNIE PRZECIWWSKAZANE!</strong> Wymuszenie skurczów przeciwko mechanicznej przeszkodzie prowadzi do pęknięcia (perforacji) jelita z niedokrwienia!",
        "❌ BŁĄD! <strong>Podawanie płynów doustnie natychmiast wywoła wymioty i grozi zachłystowym zapaleniem płuc (zespół Mendelsona).</strong>",
        "❌ BŁĄD! <strong>Kolonoskopia nie ma zastosowania w niedrożności jelita cienkiego,</strong> a insuflacja gazu mogłaby rozerwać zablokowane jelito."
      ]
    },
    {
      title: "Krok 6: Test z Gastrografinem (wodnorozpuszczalnym środkiem cieniującym)",
      text: "W celu przyspieszenia ustąpienia niedrożności i weryfikacji konieczności operacji chirurg zaleca wykonanie 'testu z Gastrografinem'. Na czym polega to badanie i jakie jest jego podwójne działanie (diagnostyczne i terapeutyczne)?",
      options: [
        "Podaje się przez sondę żołądkową 50-100 ml Gastrografiny (kontrastu rozpuszczalnego w wodzie); badanie jest diagnostyczne (obecność kontrastu w kątnicy w RTG po 4-24 h wyklucza konieczność operacji) oraz terapeutyczne (silnie hipermolarny kontrast ściąga wodę ze ściany obrzękniętego jelita do światła i pobudza perystaltykę, odblokowując niedrożność w >70-80% przypadków)",
        "Polega na podaniu kontrastu dożylnie i wykonaniu angiografii naczyń mózgowych",
        "Jest to podanie zawiesiny siarczanu baru przez odbyt w celu zaklejenia zrostów",
        "Test służy wyłącznie do oceny wydolności wydzielniczej trzustki"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Test z Gastrografinem (Water-Soluble Contrast Medium – WSCM) jest rewolucyjnym narzędziem w leczeniu zrostowej niedrożności jelita cienkiego (ASBO).</strong> Po odbarczeniu żołądka podaje się przez sondę 50-100 ml Gastrografiny rozcieńczonej z wodą. <strong>Działanie diagnostyczne:</strong> uwidocznienie kontrastu w jelicie grubym (kątnicy) na kontrolnym RTG brzucha po 4-24 godzinach z czułością >95% przepowiada ustąpienie niedrożności bez operacji. <strong>Działanie terapeutyczne:</strong> Gastrografina ma osmolarność ok. 1900 mOsm/l (jest 6-krotnie bardziej hiperosmolarna niż osocze) – odciąga obrzęk ze ściany jelita do światła, rozrzedza treść i stymuluje perystaltykę, doprowadzając do samoistnego odblokowania zrostów u ponad 80% chorych!",
        "❌ BŁĄD! <strong>Gastrografin podaje się do przewodu pokarmowego,</strong> a nie do naczyń mózgu.",
        "❌ BŁĄD! <strong>Siarczan baru w niedrożności jest przeciwwskazany</strong> (kamienie barytowe w jelicie, ryzyko zapalenia otrzewnej w razie perforacji).",
        "❌ BŁĄD! <strong>Test nie służy ocenie trzustki.</strong>"
      ]
    },
    {
      title: "Krok 7: Identyfikacja objawów zadzierzgnięcia (Strangulacji) jelita",
      text: "Podczas obserwacji u chorego z niedrożnością mechaniczną pojawiają się alarmujące symptomy. Który zestaw objawów klinicznych i laboratoryjnych wskazuje na rozwój zadzierzgnięcia (strangulation) i niedokrwienia pętli jelita, stanowiąc bezwzględne wskazanie do natychmiastowej operacji ratunkowej?",
      options: [
        "Przejście bólu kurczowego w ból stały i silny, pojawienie się gorączki, tachykardii, obrony mięśniowej i objawu Blumberga (miejscowe zapalenie otrzewnej), wzrost leukocytozy oraz wzrost stężenia kwasu mlekowego (mleczanów) we krwi",
        "Oddanie gazów przez odbyt i spadek obwodu brzucha o 5 cm",
        "Ustąpienie nudności i pojawienie się apetytu",
        "Spadek hematokrytu do wartości prawidłowych po nawodnieniu"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Zadzierzgnięcie jelita (strangulation – uciśnięcie naczyń krezkowych przez pasmo zrostowe lub wrota przepukliny) to stan bezpośredniego zagrożenia martwicą i perforacją.</strong> Objawy alarmowe ('czerwone flagi') wskazujące na niedokrwienie pętli jelita to: 1. Zmiana charakteru bólu z napadowo-kurczowego na <strong>ból stały, ciągły i silny</strong>, 2. Tachykardia (>100-110/min) i gorączka, 3. Pojawienie się <strong>obrony mięśniowej i objawów otrzewnowych (Blumberga)</strong>, 4. Narastająca leukocytoza (>15-18 tys./µl) z przesunięciem w lewo, 5. <strong>Wzrost stężenia mleczanów (kwasica mleczanowa)</strong> świadczący o niedokrwieniu tkanek. Wystąpienie tych cech wymaga natychmiastowego przerwania leczenia zachowawczego i operacji w trybie pilnym!",
        "❌ BŁĄD! <strong>Oddanie gazów i zmniejszenie brzucha to dowód na ustępowanie niedrożności</strong> i sukces leczenia zachowawczego.",
        "❌ BŁĄD! <strong>Ustąpienie nudności to objaw poprawy klinicznej.</strong>",
        "❌ BŁĄD! <strong>Normalizacja Ht po wlewach krystaloidów to cecha prawidłowego nawodnienia chorej.</strong>"
      ]
    },
    {
      title: "Krok 8: Postępowanie operacyjne – uwolnienie zrostów (Adhesiolysis) i ocena żywotności jelita",
      text: "U Marzeny po 24 godzinach od podania Gastrografiny kontrast nie dotarł do jelita grubego, a w kontrolnym TK widoczna jest zamknięta pętla (closed-loop) ze zrostem u podstawy. Chirurg wykonuje pilną laparotomię. Na czym polega zabieg uwolnienia zrostów i jak na sali operacyjnej ocenia się żywotność niedokrwionej pętli jelita po przecięciu pasma zrostowego?",
      options: [
        "Przecięcie pasma zrostowego (adhesiolysis); ocenę żywotności jelita przeprowadza się po podaniu tlenu i ogrzaniu pętli ciepłymi gazikami z solą przez 10-15 minut, oceniając powrót różowego zabarwienia ściany, obecność tętna w tętniczkach krezkowych brzeżnych oraz powrót samoistnej perystaltyki",
        "Rutynowa resekcja całego jelita cienkiego od dwunastnicy do kątnicy bez oceny żywotności",
        "Wstrzyknięcie do światła jelita 500 ml czystego alkoholu etylowego",
        "Zeszycie wszystkich pętli jelitowych w jeden wspólny worek (operacja Noble'a) u każdego chorego"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Podstawowym celem operacji w ASBO jest przecięcie pasma zrostowego (adhesiolysis) i odbarczenie uciśniętej pętli.</strong> Po uwolnieniu pętli chirurg ocenia jej żywotność: niedokrwiony odcinek okłada się serwetami nasączonymi ciepłą solą fizjologiczną na 10-15 minut, a anestezjolog podaje 100% tlen. Cechy żywotności pętli to: powrót różowej barwy ściany (ustąpienie sinicy), wyczuwalne tętno w drobnych naczyniach krezki oraz powrót samoistnych skurczów perystaltycznych. Jeśli jelito odzyska żywotność, pozostawia się je; jeśli ściana pozostaje czarna, zwiotczała i bez perystaltyki (martwica), konieczna jest resekcja martwiczego odcinka z zespoleniem koniec-do-końca.",
        "❌ BŁĄD! <strong>Wycięcie całego jelita cienkiego wywołałoby skrajny zespół krótkiego jelita (SBS)</strong> i zależność od żywienia pozajelitowego do końca życia.",
        "❌ BŁĄD! <strong>Alkohol spowodowałby natychmiastową martwicę chemiczną jelita.</strong>",
        "❌ BŁĄD! <strong>Plikacja jelit sposobem Noble'a to historyczna, okaleczająca metoda,</strong> obecnie całkowicie zarzucona ze względu na olbrzymią liczbę powikłań."
      ]
    }
  ],
  pathoNodes: [
    {
      badge: "Zrosty otrzewnowe",
      title: "Przetrwałe pasmo włókniste w jamie otrzewnej",
      short: "Fibrynoliza zredukowana po wcześniejszych operacjach",
      detail: "Po zabiegach operacyjnych uszkodzona otrzewna wydziela wysięk włóknikowy. Brak lokalnej aktywności t-PA prowadzi do organizacji włóknika w unaczynione pasma łącznotkankowe (zrosty), które mogą uwięzić i zagiąć pętlę jelita.",
      target: "Pasma zrostowe jamy otrzewnej",
      drugTarget: "<span class='dose-pill'>Adhesiolysis (laparoskopia/laparotomia)</span> mechaniczne przecięcie pasma zrostowego"
    },
    {
      badge: "Sekwestracja płynów",
      title: "Trzecia przestrzeń i rozdęcie pętli jelitowych",
      short: "Nagromadzenie soków trawiennych (6-8 litrów/dobę)",
      detail: "Powyżej przeszkody gromadzą się połykane powietrze oraz soki trawienne (ślinianki, żołądek, żółć, trzustka). Zwiększone ciśnienie śródścienne blokuje resorpcję wody i elektrolitów, wywołując masywny wysięk do światła jelita.",
      target: "Światło i ściana jelita cienkiego",
      drugTarget: "<span class='dose-pill'>Dekompresja sondą żołądkową (NG tube)</span> natychmiastowe odessanie zalegającej treści"
    },
    {
      badge: "Utrata elektrolitów",
      title: "Zasadowica hipochloremiczna i hipokaliemia",
      short: "Utrata jonów H+ i Cl- w chlustających wymiotach",
      detail: "Wymioty treścią żołądkową usuwają kwas solny, wywołując wzrost stężenia wodorowęglanów we krwi. Wtórny hiperaldosteronizm w odpowiedzi na hipowolemię powoduje ucieczkę potasu z moczem.",
      target: "Gospodarka kwasowo-zasadowa i nerki",
      drugTarget: "<span class='dose-pill'>PWE 2000-3000 ml/d i.v.</span> + <span class='dose-pill'>KCl 40 mmol/l i.v.</span> wyrównanie hipowolemii i hipokaliemii"
    },
    {
      badge: "Zadzierzgnięcie",
      title: "Zaciśnięcie naczyń krezkowych (Strangulatio)",
      short: "Niedokrwienie, martwica zgorzelinowa i perforacja",
      detail: "W pętli zamkniętej (closed loop) ciśnienie przekracza ciśnienie perfuzji kapilarnej. Dochodzi do zawału ściany jelita, translokacji bakteryjnej do krwiobiegu, kwasicy mleczanowej i perforacji.",
      target: "Naczynia krezkowe i ściana pętli jelita",
      drugTarget: "<span class='dose-pill'>Test z Gastrografinem (50-100 ml p.o.)</span> diagnostyka i stymulacja hiperosmolarna"
    }
  ],
  diffTable: {
    title: "⚔️ Tabela Różnicowa: Mechaniczna niedrożność jelita cienkiego vs Inne postacie niedrożności i ostrego brzucha",
    headers: ["Cecha kliniczna", "Niedrożność mechaniczna jelita cienkiego (SBO)", "Niedrożność porażenna jelit (Paralytic ileus)", "Niedrożność jelita grubego (np. rak esicy)", "Skręt esicy (Sigmoid volvulus)", "Ostre zapalenie krezkowych węzłów chłonnych"],
    rows: [
      ["Charakter bólu brzucha", "Ból kurczowy, kolkowy, falowy (pojawia się wraz z falą skurczu)", "Ból stały, rozlany, mierny, o charakterze 'rozpierania'", "Ból tępy, narasta powoli w podbrzuszu, rzadziej ostry kolkowy", "Nagły ból brzucha, często bardzo silny w lewym dole biodrowym", "Tępy ból w prawym dole biodrowym, poprzedzony infekcją kataralną"],
      ["Szmery perystaltyczne", "Wzmożone, głośne, metaliczne (stawianie się pętli, staccato, pluskanie)", "Martwa cisza (całkowity brak jakichkolwiek szmerów perystaltycznych)", "Początkowo wzmożone nad prawą połową okrężnicy, potem leniwe", "Cisza lub pojedyncze szmery metaliczne nad skręconą pętlą", "Prawidłowe, słyszalne w całej jamie brzusznej"],
      ["Obraz w przeglądowym RTG", "Liczne poziomy płynów w pętlach cienkich (schodki), fałdy Kerckringa od brzegu do brzegu", "Uogólnione, równomierne rozdęcie gazowe żołądka, jelita cienkiego i grubego", "Masywne poszerzenie okrężnicy (>6-8 cm, kątnica >9 cm), puste jelito poniżej", "Olbrzymia, pojedyncza pętla w kształcie 'ziarna kawy' (coffee bean sign)", "Obraz prawidłowy, brak poziomów płynów"],
      ["Wymioty i ich dynamika", "Wczesne, obfite, szybko żółciowe i treścią jelitową (kałowe)", "Późne, ulewanie treści żołądkowej, rzadko chlustające", "Późne, dominują po wielu dniach zatrzymania stolca", "Możliwe, ale dominuje potężne, asymetryczne wzdęcie brzucha", "Nudności sporadyczne, brak chlustających wymiotów"],
      ["Główna przyczyna", "Zrosty pooperacyjne (>60-70%), uwięźnięte przepukliny", "Zapalenie otrzewnej, zaburzenia elektrolitowe (hipokaliemia), pooperacyjne", "Rak jelita grubego (rak esicy, zgięcia śledzionowego)", "Nadmierna ruchomość i długa krezka esicy u osób starszych", "Odczyn po infekcji wirusowej (Adenowirus, Yersinia)"],
      ["Postępowanie z wyboru", "Dekompresja sondą, test z Gastrografinem; w zadzierzgnięciu operacja", "Leczenie przyczyny (wyrównanie K+, leczenie zapalenia), prokinetyki", "Pilna operacja (resekcja Hartmanna lub stentowanie SEMS)", "Dekompresja sigmoidoskopem lub operacja resekcyjna", "Leczenie zachowawcze (odpoczynek, nawodnienie)"]
    ]
  },
  dutySummary: {
    overview: "Mechaniczna niedrożność jelita cienkiego (Small Bowel Obstruction – SBO) odpowiada za ok. 15-20% ostrych przyjęć chirurgicznych z powodu ostrego brzucha. Ponad 65-75% przypadków u dorosłych wynika ze zrostów otrzewnowych powstałych po przebytych zabiegach operacyjnych (ASBO). Nieleczona prowadzi do hipowolemii, wstrząsu, a w razie zadzierzgnięcia (strangulatio) – do martwicy i perforacji jelita.",
    diagnostics: "1. Ocena klasycznej tetrady: kolkowy ból brzucha, wymioty (żółciowe/kałowe), zatrzymanie gazów i stolca oraz wzdęcie brzucha.<br>2. Badanie przedmiotowe: szmery metaliczne/staccato, stawianie się pętli, badanie wrót przepuklinowych i badanie per rectum (pusta bańka odbytnicy).<br>3. Przeglądowe RTG jamy brzusznej na stojąco: liczne poziomy płynów w pętlach jelita cienkiego (obraz schodków), fałdy okrężne od brzegu do brzegu, brak gazu w okrężnicy.<br>4. Tomografia komputerowa (TK) jamy brzusznej i miednicy z kontrastem i.v. – złoty standard określający strefę przejścia (transition point) i cechy niedokrwienia.<br>5. Gazometria i elektrolity: wykrycie hipochloremicznej hipokaliemicznej zasadowicy metabolicznej oraz ocena mleczanów (niedokrwienie pętli!).",
    drugsAndDoses: "1. Płynoterapia dożylna krystaloidowa: <span class='dose-pill'>Płyn wieloelektrolitowy (PWE) 2000-3000 ml/dobę i.v.</span> w celu pokrycia strat do trzeciej przestrzeni.<br>2. Suplementacja elektrolitów: <span class='dose-pill'>Chlorek potasu (KCl) 20-40 mmol w 500-1000 ml płynu i.v.</span> pod kontrolą stężenia K+ w surowicy.<br>3. Test z Gastrografinem (wodnorozpuszczalny kontrast): <span class='dose-pill'>Gastrografin 50-100 ml podany przez sondę żołądkową</span> – działanie diagnostyczne i terapeutyczne (hiperosmolarny).<br>4. Leki przeciwbólowe: <span class='dose-pill'>Paracetamol 1 g i.v. co 6 h</span> + leki spazmolityczne / opioidy parenteralnie.<br>5. <span class='dose-pill'>Całkowity zakaz podawania leków prokinetycznych (metoklopramid)</span> i środków przeczyszczających!",
    procedures: "1. Dekompresja żołądkowo-jelitowa: natychmiastowe założenie zgłębnika nosowo-żołądkowego (sondy) i odessanie zalegającej treści (ochrona przed zachłyśnięciem).<br>2. Cewnikowanie pęcherza moczowego (kontrola bilansu płynów i diurezy godzinowej).<br>3. Zabieg operacyjny w trybie pilnym w przypadku zadzierzgnięcia lub braku poprawy po teście z Gastrografinem (laparoskopia lub laparotomia z przecięciem pasm zrostowych – adhesiolysis).<br>4. Ocena żywotności pętli jelita po uwolnieniu: ciepłe okłady z soli, 100% tlen, ocena barwy, tętna i perystaltyki; w razie nieodwracalnej martwicy – resekcja odcinka z zespoleniem.",
    monitoring: "1. Monitorowanie objawów strangulacji (zadzierzgnięcia): przejście bólu w stały, gorączka, tachykardia, obrona mięśniowa, wzrost leukocytów i mleczanów.<br>2. Kontrola radiologiczna pasażu Gastrografiny (RTG jamy brzusznej po 4-8 oraz 24 godzinach od podania).<br>3. Ścisły pomiar objętości treści odessanej przez sondę żołądkową i strat w wymiotach.<br>4. Wypis do domu po powrocie perystaltyki, tolerancji diety doustnej i oddaniu gazów/stolca."
  },
  lekQuestions: [
    {
      question: "Najczęstszą przyczyną mechanicznej niedrożności jelita cienkiego u osób dorosłych w krajach rozwiniętych są:",
      options: [
        "Pasma zrostów pooperacyjnych (zrosty otrzewnowe)",
        "Uwięźnięte przepukliny pachwinowe",
        "Gruczolakoraki jelita cienkiego",
        "Kamienie żółciowe (niedrożność żółciowa)",
        "Ciała obce połknięte przypadkowo"
      ],
      correct: 0,
      expl: "Zrosty wewnątrzotrzewnowe powstałe po uprzednich zabiegach chirurgicznych w jamie brzusznej (np. po apendektomii, operacjach ginekologicznych, cholecystektomii) odpowiadają za około 60-75% wszystkich przypadków mechanicznej niedrożności jelita cienkiego (Small Bowel Obstruction – SBO) u dorosłych. Drugą co do częstości przyczyną są uwięźnięte przepukliny (~15-20%)."
    },
    {
      question: "Wskaż klasyczną tetradę objawów mechanicznej niedrożności jelit:",
      options: [
        "Ból brzucha o charakterze kurczowym (kolkowym), nudności i wymioty, wzdęcie brzucha oraz zatrzymanie gazów i stolca",
        "Ból stały w podbrzuszu, biegunka z krwią, gorączka oraz bolesne parcie na stolec",
        "Ból w nadbrzuszu, żółtaczka, wodobrzusze oraz świąd skóry",
        "Ból opasujący, hipotensja, wybroczyny okołopępkowe oraz podwyższona amylaza",
        "Uczucie pełności poposiłkowej, zgaga, zarzucanie pokarmu oraz chrypka"
      ],
      correct: 0,
      expl: "Klasyczna tetrada objawów mechanicznej niedrożności jelit obejmuje: 1. Kolkowy ból brzucha (nasilający się wraz z falą perystaltyczną), 2. Wymioty (początkowo treścią żołądkową, potem żółciową i jelitową/kałową), 3. Wzdęcie brzucha (meteorismus), 4. Zatrzymanie gazów i stolca (brak oddawania gazów to najbardziej swoisty objaw pełnej mechanicznej niedrożności)."
    },
    {
      question: "Jakie zaburzenie równowagi kwasowo-zasadowej i elektrolitowej rozwija się typowo u chorego z wysoką niedrożnością przewodu pokarmowego powikłaną obfitymi wymiotami?",
      options: [
        "Zasadowica metaboliczna z hipochloremią i hipokaliemią",
        "Kwasica metaboliczna z hiperchloremią i hiperkaliemią",
        "Kwasica oddechowa z hiponatremią",
        "Zasadowica oddechowa z hiperkalcemią",
        "Czysta kwasica mleczanowa bez zaburzeń jonowych"
      ],
      correct: 0,
      expl: "Obfite wymioty treścią żołądkową powodują utratę jonów wodorowych (H+) oraz jonów chlorkowych (Cl-). Skutkuje to hipochloremią oraz retencją wodorowęglanów we krwi (zasadowica metaboliczna). Jednocześnie odwodnienie aktywuje oś RAA, co w nerkach wymusza resorpcję sodu kosztem wydalania potasu do moczu, pogłębiając hipokaliemię."
    },
    {
      question: "Cechą radiologiczną pozwalającą na odróżnienie poszerzonych pętli jelita cienkiego od jelita grubego na zdjęciu przeglądowym jamy brzusznej jest:",
      options: [
        "Obecność fałdów okrężnych (Kerckringa) przebiegających przez całą szerokość światła jelita cienkiego od ściany do ściany",
        "Brak jakichkolwiek poziomów płynów w jelicie cienkim",
        "Obecność haustracji przechodzących przez całą szerokość jelita grubego",
        "Lokalizacja jelita cienkiego wyłącznie pod wątrobą w prawym podżebrzu",
        "Zawsze mniejsza średnica jelita grubego niż jelita cienkiego"
      ],
      correct: 0,
      expl: "Fałdy okrężne (Kerckringa / valvulae conniventes) jelita cienkiego przebiegają poprzecznie przez CAŁĄ szerokość światła pętli (od jednego brzegu do drugiego), tworząc gęsty układ prążków. Z kolei fałdy półksiężycowate (haustra) jelita grubego są rzadziej rozmieszczone i przechodzą jedynie przez część światła, nie sięgając przeciwległego brzegu ściany."
    },
    {
      question: "Podanie wodnorozpuszczalnego środka cieniującego (Gastrografinu) przez zgłębnik żołądkowy u pacjenta ze zrostową niedrożnością jelita cienkiego wykazuje działanie:",
      options: [
        "Zarówno diagnostyczne (pojawienie się kontrastu w kątnicy w ciągu 24 h wyklucza potrzebę operacji), jak i terapeutyczne (hipermolarny kontrast zmniejsza obrzęk ściany i pobudza perystaltykę)",
        "Wyłącznie niszczące komórki bakteryjne w jelicie",
        "Wyłącznie przeciwbólowe poprzez znieczulenie śluzówki dwunastnicy",
        "Jest bezwzględnie przeciwwskazane we wszystkich postaciach niedrożności",
        "Służy wyłącznie do barwienia moczu na kolor zielony"
      ],
      correct: 0,
      expl: "Gastrografin (WSCM) w zrostowej niedrożności jelita cienkiego (ASBO) ma podwójne działanie: 1. Diagnostyczne – dotarcie kontrastu do jelita grubego na kontrolnym RTG w ciągu 4-24 h wskazuje na ustąpienie przeszkody z dokładnością >95%, 2. Terapeutyczne – dzięki wysokiej osmolarności (ok. 1900 mOsm/l) ściąga wodę z obrzękniętej ściany jelita, rozrzedza treść i stymuluje perystaltykę, przyspieszając ustąpienie niedrożności u >80% chorych."
    },
    {
      question: "Który z poniższych objawów klinicznych u pacjenta z mechaniczną niedrożnością jelita cienkiego wskazuje na rozwój zadzierzgnięcia (strangulatio) i martwicy pętli jelita, wymagając NATYCHMIASTOWEJ operacji?",
      options: [
        "Przejście bólu kurczowego w stały, gorączka, tachykardia, objawy otrzewnowe oraz wzrost stężenia mleczanów we krwi",
        "Pojawienie się apetytu i spadek nasilenia nudności",
        "Oddanie gazów i stolca przez pacjenta",
        "Obniżenie tętna z 110/min do 70/min przy prawidłowym ciśnieniu",
        "Zmniejszenie obwodu brzucha w pomiarze taśmą centymetrową"
      ],
      correct: 0,
      expl: "Zadzierzgnięcie (strangulatio) to uciśnięcie naczyń krezkowych prowadzące do zawału i martwicy pętli jelita. Klasyczne objawy alarmowe to: przejście bólu kolkowego w ból stały i silny, tachykardia, gorączka, obrona mięśniowa z objawem Blumberga, leukocytoza oraz kwasica mleczanowa (wzrost stężenia mleczanów świadczący o niedokrwieniu beztlenowym ściany jelita)."
    },
    {
      question: "Zastosowanie którego z poniższych leków jest BEZWZGLĘDNIE PRZECIWWSKAZANE u chorego z potwierdzoną mechaniczną niedrożnością jelita cienkiego?",
      options: [
        "Metoklopramid (lek prokinetyczny pobudzający perystaltykę)",
        "Paracetamol dożylnie",
        "Płyn wieloelektrolitowy (PWE)",
        "Chlorek potasu dożylnie w pompie",
        "Pantoprazol dożylnie"
      ],
      correct: 0,
      expl: "Leki prokinetyczne (np. metoklopramid, cyzapryd) stymulują perystaltykę przewodu pokarmowego. Podanie leku prokinetycznego przy mechanicznej, nieprzekraczalnej przeszkodzie w świetle jelita prowadzi do gwałtownego wzrostu ciśnienia śródściennego i grozi perforacją ściany jelita powyżej przeszkody!"
    },
    {
      question: "Podstawowym pierwszym krokiem w postępowaniu doraźnym na SOR u pacjenta z podejrzeniem niedrożności mechanicznej jelita cienkiego jest:",
      options: [
        "Wprowadzenie zgłębnika nosowo-żołądkowego (sondy) celem dekompresji i odessania treści oraz wdrożenie dożylnej płynoterapii",
        "Podanie doustne 1 litra oleju parafinowego",
        "Zlecenie doustnego wlewu przeczyszczającego z makrogoli",
        "Natychmiastowe skierowanie na kolonoskopię w znieczuleniu miejscowym",
        "Podanie leków nasennych i odesłanie do domu"
      ],
      correct: 0,
      expl: "Założenie sondy nosowo-żołądkowej (NG tube) i odessanie zalegającej treści to absolutny priorytet ratunkowy w mechanicznej niedrożności jelit. Zapewnia dekompresję rozdętego żołądka i dwunastnicy, zmniejsza ból i wymioty, a przede wszystkim zapobiega śmiertelnemu powikłaniu – zachłyśnięciu treścią jelitowo-kałową do drzewa oskrzelowego (zespół Mendelsona)."
    },
    {
      question: "W badaniu osłuchowym brzucha u pacjenta w rozwiniętej fazie mechanicznej niedrożności jelit typowo stwierdza się:",
      options: [
        "Wzmożone szmery perystaltyczne o wysokim, metalicznym tonie (pluskanie, objaw 'spadającej kropli')",
        "Całkowity brak jakichkolwiek dźwięków (martwa cisza) od pierwszych minut trwania choroby",
        "Cichy szmer skurczowy nad tętnicami nerkowymi bez innych zjawisk",
        "Tarcie osierdziowe słyszalne w prawym dole biodrowym",
        "Rzężenia drobnobańkowe nad pęcherzem moczowym"
      ],
      correct: 0,
      expl: "W mechanicznej niedrożności jelito usiłuje pokonać przeszkodę ('skurcze walki'). Ruchy płynu i gazu w rozdętych, napiętych pętlach wywołują charakterystyczne, głośne szmery perystaltyczne o wysokim, dźwięcznym tonie (szmery metaliczne, pluskanie, odgłos kropel spadających na blachę – staccato tinkles). Martwa cisza pojawia się dopiero w schyłkowej fazie martwicy lub w niedrożności porażennej."
    },
    {
      question: "Co oznacza pojęcie 'niedrożności pętli zamkniętej' (closed-loop obstruction) i dlaczego wiąże się ona ze szczególnym ryzykiem?",
      options: [
        "Sytuację, w której odcinek jelita jest zablokowany w dwóch miejscach (zarówno proksymalnie, jak i dystalnie), co uniemożliwia jakąkolwiek dekompresję i prowadzi do błyskawicznego niedokrwienia i perforacji",
        "Niedrożność wywołaną przez zamknięcie powłok brzusznych po operacji",
        "Niedrożność ustępującą samoistnie po zamknięciu oczu przez pacjenta",
        "Zablokowanie zwieracza odbytu przez duży guz",
        "Zrośnięcie się obu warg sromowych u dziewczynek"
      ],
      feedback: "",
      correct: 0,
      expl: "Niedrożność w mechanizmie zamkniętej pętli (closed-loop obstruction, np. przy skręcie wokół pasma zrostowego lub uwięźnięciu w przepuklinie wewnętrznej) polega na zablokowaniu pętli jelita w dwóch punktach. Gaz i płyny gromadzą się w odciętym segmencie bez możliwości odpływu ani w dół, ani w górę (nawet przez sondę!), co wywołuje skrajny wzrost ciśnienia, zawał krezki i perforację w ciągu kilku godzin."
    },
    {
      question: "W jakich granicach czasowych powinno zamknąć się bezpieczne leczenie zachowawcze niepowikłanej zrostowej niedrożności jelita cienkiego przy braku cech zadzierzgnięcia?",
      options: [
        "Do 48 - 72 godzin od wdrożenia leczenia (brak pasażu po 72 h jest wskazaniem do operacji)",
        "Maksymalnie do 15 minut",
        "Do 30 dni w warunkach domowych",
        "Leczenie zachowawcze można prowadzić bezterminowo przez wiele miesięcy",
        "Dokładnie 6 godzin u każdego chorego"
      ],
      correct: 0,
      expl: "Zgodnie z wytycznymi Bologna Guidelines (WSES 2017) bezpieczny czas próby leczenia zachowawczego w niepowikłanej zrostowej niedrożności wynosi od 48 do maksymalnie 72 godzin. Jeśli w tym czasie (lub po 24 h od testu z Gastrografinem) nie nastąpi ustąpienie objawów i pasaż kontrastu do kątnicy, chory powinien zostać zakwalifikowany do leczenia operacyjnego, aby uniknąć późnych powikłań."
    }
  ],
  flashcards: [
    {
      front: "Wymień 4 objawy klasycznej tetrady mechanicznej niedrożności jelit.",
      back: "1. Kolkowy (kurczowy) ból brzucha\n2. Wymioty (żołądkowe, żółciowe, jelitowe/kałowe)\n3. Wzdęcie brzucha (meteorismus)\n4. Zatrzymanie gazów i stolca (brak gazów to kluczowy objaw)."
    },
    {
      front: "Jaka jest najczęstsza przyczyna mechanicznej niedrożności jelita cienkiego u dorosłych?",
      back: "Pasma zrostów pooperacyjnych (adhesions) po wcześniejszych operacjach brzusznych (odpowiadają za 60-75% przypadków SBO)."
    },
    {
      front: "Jakie zaburzenie kwasowo-zasadowe i elektrolitowe rozwija się w niedrożności z wymiotami?",
      back: "Hipochloremiczna, hipokaliemiczna zasadowica metaboliczna oraz odwodnienie przednerkowe (utrata HCl i sekwestracja w 'trzeciej przestrzeni')."
    },
    {
      front: "Czym różni się obraz jelita cienkiego od grubego na przeglądowym RTG brzucha?",
      back: "Jelito cienkie: fałdy okrężne (Kerckringa) przechodzą przez CAŁĄ szerokość światła (od ściany do ściany).\nJelito grube: fałdy półksiężycowate (haustra) przechodzą tylko przez 1/3 do 1/2 szerokości światła."
    },
    {
      front: "Na czym polega test z Gastrografinem w zrostowej niedrożności jelita cienkiego (ASBO)?",
      back: "Podanie 50-100 ml Gastrografiny przez sondę:\n1. Diagnostyka: dotarcie do kątnicy w RTG do 24 h wyklucza potrzebę operacji.\n2. Terapia: silnie hipermolarny kontrast ściąga wodę z obrzękniętej ściany i odblokowuje jelito u >80% chorych."
    },
    {
      front: "Wymień objawy zadzierzgnięcia (strangulacji) jelita wymagające natychmiastowej operacji.",
      back: "Przejście bólu w stały i silny, gorączka, tachykardia, obrona mięśniowa (objawy otrzewnowe), leukocytoza oraz wzrost mleczanów we krwi (kwasica mleczanowa)."
    }
  ]
};

// Mirror fields for schema compatibility
case130.steps.forEach(step => {
  step.question = step.title;
  step.explanation = step.feedback;
});
case130.lekQuestions.forEach(q => {
  q.opts = q.options;
  q.correctIdx = q.correct;
  q.exp = q.expl;
});

saveCase(case130);

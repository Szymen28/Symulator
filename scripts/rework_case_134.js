const fs = require('fs');
const path = require('path');
const { encryptStringAes } = require('./encrypt_case.js');

const MASTER_KEY = '@LEKSzymon28111999';
const CASES_DIR = path.join(__dirname, '..', 'cases');

console.log("Generating Case 134: Ostre zapalenie uchyłków esicy (Hinchey)...");

async function saveCase(caseData) {
  const filePath = path.join(CASES_DIR, caseData.filename);
  const jsonStr = JSON.stringify(caseData, null, 2);
  const encrypted = await encryptStringAes(jsonStr, MASTER_KEY);
  fs.writeFileSync(filePath, JSON.stringify(encrypted, null, 2), 'utf8');
  console.log(`[SAVED] Case #${caseData.id}: ${caseData.filename} (LEK Qs: ${caseData.lekQuestions.length}, Steps: ${caseData.steps.length}, Flashcards: ${caseData.flashcards.length})`);
}

const case134 = {
  id: 134,
  filename: "134_zapalenie_uchylkow_esicy_hinchey.json",
  dept: "Chirurgia ogólna",
  shortTitle: "58-letni Marek – Ból w lewym dole biodrowym ('lewy wyrostek'), gorączka, ropień krezki i wysokie CRP (Ostre zapalenie uchyłków / Hinchey Ib)",
  diagnosisTitle: "Ostre powikłane zapalenie uchyłków esicy (Acute Diverticulitis) w stopniu Ib wg klasyfikacji Hincheya (ropień krezki esicy o średnicy 4,5 cm), kwalifikowane do przezskórnego drenażu pod kontrolą TK",
  vitals: [
    { label: "Temperatura ciała", val: "38,6 °C", sub: "Gorączka septyczna w powikłanym zapaleniu", status: "vital-crit" },
    { label: "Białko C-reaktywne (CRP)", val: "168,0 mg/l", sub: "Bardzo wysoki ogólnoustrojowy odczyn zapalny", status: "vital-crit" },
    { label: "Badanie lewego dołu", val: "Bolesny opór naciekowy", sub: "Miejscowe zapalenie otrzewnej ('lewy wyrostek')", status: "vital-crit" },
    { label: "Leukocytoza (WBC)", val: "17,2 tys./µl", sub: "Wyraźna leukocytoza z przesunięciem w lewo", status: "vital-warn" }
  ],
  vitalsObj: { hr: 98, bp: "132/84", spo2: 98, rr: 18, temp: 38.6, gcs: 15 },
  story: `<p><strong>Pacjent:</strong> 58-letni Marek, inżynier budowlany, zgłosił się na szpitalny oddział ratunkowy z powodu nasilającego się od 4 dni bólu brzucha w lewym dole biodrowym, gorączki do 38,8°C z dreszczami, braku apetytu oraz bolesnego parcia na stolec z oddawaniem skąpych ilości śluzowego stolca.</p><p><strong>Wywiad chorobowy:</strong> Dolegliwości rozpoczęły się 4 dni temu jako tępy ból w podbrzuszu po stronie lewej, który pacjent początkowo wiązał z błędami dietetycznymi (grill, tłuste potrawy, alkohol). W kolejnych dobach ból stale narastał, stał się ostry i pulsujący, nasilający się przy chodzeniu i mikcji. Od 2 dni pacjent gorączkuje, a wczoraj wieczorem wystąpiły dreszcze. Przyjmował paracetamol i drotawerynę, co nie przyniosło żadnej ulgi. W wywiadzie: pacjent od kilkunastu lat miewa nawykowe zaparcia, przed 3 laty w kolonoskopii profilaktycznej opisano liczne uchyłki esicy i zstępnicy bez cech zapalenia. Brak przebytych operacji brzusznych, nie pali tytoniu, neguje obecność krwi w stolcu.</p><p><strong>Badanie przedmiotowe na SOR:</strong> Mężczyzna w stanie ogólnym średnim, cierpiący, spocony. Brzuch nieco wzdęty w podbrzuszu. W lewym dole biodrowym obecna silna bolesność palpacyjna, wyraźna obrona mięśniowa (défense) oraz dodatni miejscowy objaw Blumberga (miejscowe zapalenie otrzewnej). W głębokiej palpacji pod powłokami lewego dołu biodrowego wyczuwalny bolesny, nieprzesuwalny guzowaty opór (nacieczona zapalnie esica i sieć większa). W prawym dole biodrowym i nadbrzuszu powłoki miękkie, objawy otrzewnowe ujemne. Objaw Goldflama obustronnie ujemny. Perystaltyka jelitowa leniwa, osłabiona. W badaniu per rectum (DRE): silna bolesność ściany odbytnicy po stronie lewej w rzucie miednicy mniejszej, bez wyczuwalnych guzów w zasięgu palca, stolec na rękawiczce bez makroskopowej krwi.</p>`,
  labs: {
    "Wskaźniki zapalne i hemostaza": [
      { name: "Leukocyty (WBC)", val: "17,2 tys./µl", norm: "4,0 - 10,0 tys./µl", flag: "CRIT_HIGH" },
      { name: "Granulocyty obojętnochłonne (NEUT)", val: "84 % (14,4 tys./µl)", norm: "45 - 70 %", flag: "CRIT_HIGH" },
      { name: "Przesunięcie w lewo (pałeczki)", val: "11 %", norm: "< 5 %", flag: "HIGH" },
      { name: "Białko C-reaktywne (CRP)", val: "168,0 mg/l", norm: "< 5,0 mg/l", flag: "CRIT_HIGH" },
      { name: "Prokalcytonina (PCT)", val: "0,75 ng/ml", norm: "< 0,50 ng/ml", flag: "HIGH" },
      { name: "Hemoglobina (Hb)", val: "14,4 g/dl", norm: "13,5 - 17,5 g/dl", flag: "NORMAL" },
      { name: "Płytki krwi (PLT)", val: "310 tys./µl", norm: "150 - 450 tys./µl", flag: "NORMAL" }
    ],
    "Biochemia i mocz": [
      { name: "Kreatynina w surowicy", val: "0,92 mg/dl", norm: "0,70 - 1,20 mg/dl", flag: "NORMAL" },
      { name: "Mocznik", val: "34 mg/dl", norm: "15 - 45 mg/dl", flag: "NORMAL" },
      { name: "Sód (Na+)", val: "139 mmol/l", norm: "135 - 145 mmol/l", flag: "NORMAL" },
      { name: "Potas (K+)", val: "4,1 mmol/l", norm: "3,5 - 5,1 mmol/l", flag: "NORMAL" },
      { name: "Badanie ogólne moczu - leukocyty", val: "10-15 wpw (odczynowe podrażnienie pęcherza)", norm: "0 - 5 wpw", flag: "HIGH" },
      { name: "Badanie ogólne moczu - azotyny", val: "Ujemne", norm: "Ujemne", flag: "NORMAL" }
    ],
    "Pilna tomografia komputerowa (TK) jamy brzusznej i miednicy z kontrastem i.v.": [
      { name: "Ściana esicy", val: "Okrężne, symetryczne pogrubienie ściany esicy do 8 mm na odcinku 12 cm, liczne uchyłki esicy z rąbkiem zapalnym", norm: "Ściana < 3 mm", flag: "CRIT_HIGH" },
      { name: "Krezka esicy / ropień", val: "W krezce esicy widoczna dobrze odgraniczona, otorebkowana kolekcja płynowo-gazowa o wymiarach 46 x 42 x 38 mm (ropień krezki esicy o średnicy 4,5 cm) ze wzmocnieniem torebki po kontraście (stopień Hinchey Ib)", norm: "Brak kolekcji płynowych", flag: "CRIT_HIGH" },
      { name: "Tkanka tłuszczowa okołojelitowa", val: "Rozlane zatarcie i pasmowaty obrzęk tłuszczu (fat stranding) w lewym dole biodrowym", norm: "Prawidłowa tkanka tłuszczowa", flag: "CRIT_HIGH" },
      { name: "Jama otrzewnej", val: "Brak cech rozlanego wolnego gazu podprzeponowego (brak wolnej perforacji do otrzewnej)", norm: "Brak wolnego gazu i płynu", flag: "NORMAL" }
    ]
  },
  steps: [
    {
      title: "Krok 1: Identyfikacja zespołu objawów 'lewego wyrostka robaczkowego'",
      text: "Pacjent prezentuje ostry ból w lewym dole biodrowym z obroną mięśniową, gorączkę 38,6°C, bolesny guz naciekowy oraz leukocytozę z wysokim CRP. Dlaczego stan ten powszechnie określa się mianem 'lewego wyrostka robaczkowego'?",
      options: [
        "Ponieważ ostre zapalenie uchyłków esicy manifestuje się identycznym patomechanizmem (zaczopowanie kamieniem kałowym, mikroniedokrwienie, zapalenie) i obrazem klinicznym jak ostre zapalenie wyrostka robaczkowego, lecz zlokalizowanym lustrzanie w lewym dolnym kwadrancie brzucha",
        "Ponieważ pacjent posiada wrodzony dodatkowy wyrostek robaczkowy po stronie lewej",
        "Świadczy to o przemieszczeniu kątnicy do lewego dołu biodrowego przez przepuklinę",
        "Oznacza to lewostronne zapalenie jajnika u mężczyzny"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Ostre zapalenie uchyłków esicy (Acute diverticulitis) jest nazywane 'lewostronnym zapaleniem wyrostka' (left-sided appendicitis).</strong> Patofizjologia obu chorób jest bliźniacza: zablokowanie wąskiej szyi uchyłka przez kamień kałowy (fecalith) powoduje zastój, nadkażenie florą jelitową, mikroniedokrwienie i mikroskopijną perforację ściany z powstaniem nacieku zapalnego i podrażnieniem otrzewnej ściennej – dając ból, obronę mięśniową i objaw Blumberga, tyle że w lewym dole biodrowym.",
        "❌ BŁĄD! <strong>Prawdziwy lewostronny wyrostek występuje tylko w rzadkim zespole odwrócenia trzewi (situs inversus);</strong> tutaj przyczyną jest zapalenie uchyłków esicy.",
        "❌ BŁĄD! <strong>Wada zwrotu krezki jest rzadka,</strong> a uchyłkowatość esicy to powszechna choroba dorosłych.",
        "❌ BŁĄD! <strong>Mężczyzna nie posiada narządów rodnych żeńskich.</strong>"
      ]
    },
    {
      title: "Krok 2: Badanie obrazowe z wyboru i BEZWZGLĘDNE przeciwwskazanie w fazie ostrej",
      text: "Jakie badanie obrazowe jest współczesnym 'złotym standardem' w diagnostyce ostrego zapalenia uchyłków i jakie powszechne badanie gastroenterologiczne jest w tym momencie BEZWZGLĘDNIE PRZECIWWSKAZANE?",
      options: [
        "Badaniem z wyboru jest tomografia komputerowa (TK) jamy brzusznej i miednicy z kontrastem dożylnym; KOLONOSKOPIA jest bezwzględnie przeciwwskazana w fazie ostrej z powodu ryzyka wolnej perforacji do otrzewnej pod wpływem insuflacji gazu",
        "Badaniem z wyboru jest natychmiastowa pełna kolonoskopia z pobraniem głębokich biopsji z dna uchyłków",
        "Złotym standardem jest wlew doodbytniczy z gęstej zawiesiny siarczanu baru",
        "Wystarczy wykonanie USG tarczycy i RTG dłoni"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Tomografia komputerowa (TK) jamy brzusznej i miednicy z kontrastem i.v. jest badaniem z wyboru (czułość >98%).</strong> Pozwala precyzyjnie ocenić pogrubienie ściany jelita, naciek tłuszczu, obecność ropni oraz stopień w klasyfikacji Hincheya. Z kolei <strong>KOLONOSKOPIA w ostrej fazie zapalenia uchyłków jest BEZWZGLĘDNIE PRZECIWWSKAZANA!</strong> Wdmuchiwanie powietrza i manipulacja endoskopem w obrzękniętym, kruchym i pokrytym mikronadżerkami jelicie grozi natychmiastową wolną perforacją, rozlanym kałowym zapaleniem otrzewnej i koniecznością wyłonienia stomii!",
        "❌ BŁĄD! <strong>Kolonoskopia w ostrej fazie to kardynalny błąd sztuki lekarskiej;</strong> endoskopię odracza się o 6-8 tygodni po wyzdrowieniu.",
        "❌ BŁĄD! <strong>Wlew barytowy w ostrym zapaleniu jest zakazany</strong> ze względu na ryzyko barytowego zapalenia otrzewnej.",
        "❌ BŁĄD! <strong>Badania tarczycy i rąk nie mają związku z jamą brzuszną.</strong>"
      ]
    },
    {
      title: "Krok 3: Klasyfikacja Hincheya i interpretacja wyniku TK",
      text: "W badaniu TK u Marka opisano: pogrubienie ściany esicy, naciek tłuszczu oraz obecność otorebkowanego zbiornika płynowo-gazowego w krezce esicy o średnicy 4,5 cm. Do którego stopnia w klasyfikacji Hincheya (lub zmodyfikowanej wg Wasgary/WSES) kwalifikuje się ten chory?",
      options: [
        "Stopień Hinchey Ib (ropień okołojelitowy / w krezce esicy o średnicy >=4 cm)",
        "Stopień Hinchey 0 (niepowikłane zapalenie uchyłków)",
        "Stopień Hinchey Ia (odczyn zapalny krezki / flegmona bez obecności ropnia)",
        "Stopień Hinchey IV (rozlane kałowe zapalenie otrzewnej)"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Według klasyfikacji Hincheya (i jej modyfikacji):</strong><br>- <strong>Hinchey 0:</strong> łagodne zapalenie uchyłków bez powikłań,<br>- <strong>Hinchey Ia:</strong> zapalenie okołookrężnicze i naciek tłuszczu (phlegmon) bez ropnia,<br>- <strong>Hinchey Ib:</strong> ropień okołookrężniczy lub w krezce esicy (w pobliżu pętli),<br>- <strong>Hinchey II:</strong> ropień odległy (miedniczny, zaotrzewnowy),<br>- <strong>Hinchey III:</strong> uogólnione ropne zapalenie otrzewnej,<br>- <strong>Hinchey IV:</strong> uogólnione kałowe zapalenie otrzewnej (wolna perforacja). U Marka ropień zlokalizowany jest w krezce esicy, co definiuje stopień Hinchey Ib.",
        "❌ BŁĄD! <strong>Hinchey 0 to postać niepowikłana bez obecności ropnia.</strong>",
        "❌ BŁĄD! <strong>Hinchey Ia to flegmona (naciekanie zapalne tłuszczu) bez uformowanej jamy ropnia.</strong>",
        "❌ BŁĄD! <strong>Hinchey IV oznacza wylanie kału do wolnej otrzewnej ze wstrząsem septycznym i odmą podprzeponową.</strong>"
      ]
    },
    {
      title: "Krok 4: Strategia terapeutyczna w ropniu Hinchey Ib/II a kryterium wielkości (4-5 cm)",
      text: "Ropień w krezce u Marka ma średnicę 4,5 cm (przekracza próg 4 cm). Jakie postępowanie zabiegowe i farmakologiczne jest rekomendowane wg wytycznych WSES 2020 i ASCRS?",
      options: [
        "Przezskórny drenaż ropnia pod kontrolą TK lub USG (percutaneous drainage) w połączeniu z dożylną antybiotykoterapią o szerokim spektrum; pozwala to na ewakuację ropy i bezpieczne wyleczenie bez konieczności natychmiastowej operacji i wyłaniania stomii",
        "Natychmiastowa laparotomia ze stomią u każdego chorego bez próby drenażu",
        "Brak leczenia, ropnie o średnicy 4,5 cm w 100% wchłaniają się po wypiciu mięty",
        "Podanie leków moczopędnych celem wypłukania ropnia przez nerki"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Wielkość ropnia 4-5 cm stanowi powszechnie uznany punkt odcięcia:</strong><br>- Ropnie małe (<3-4 cm): można leczyć zachowawczo samą dożylną antybiotykoterapią i ścisłą obserwacją,<br>- <strong>Ropnie duże (>=4-5 cm):</strong> złotym standardem jest <strong>przezskórny drenaż pod kontrolą TK lub USG (PCD – Percutaneous Catheter Drainage)</strong> połączony z antybiotykoterapią dożylną. Procedura ta ewakuuje treść ropną, usuwa wrota sepsy i pozwala uniknąć okaleczającej operacji w trybie ostrym (operacji Hartmanna ze stomią) u ponad 80-85% pacjentów!",
        "❌ BŁĄD! <strong>Operacja ze stomią jest zarezerwowana dla chorych z rozlanym zapaleniem otrzewnej (Hinchey III/IV) lub brakiem możliwości bezpiecznego drenażu przezskórnego.</strong>",
        "❌ BŁĄD! <strong>Duży ropień nie wchłonie się samoistnie i grozi pęknięciem do wolnej otrzewnej.</strong>",
        "❌ BŁĄD! <strong>Ropień leży w jamie brzusznej poza drogami moczowymi.</strong>"
      ]
    },
    {
      title: "Krok 5: Antybiotykoterapia empiryczna w zapaleniu uchyłków",
      text: "Jaki schemat antybiotykoterapii dożylnej jest rekomendowany w powikłanym zapaleniu uchyłków (Hinchey Ib) wg wytycznych chirurgicznych?",
      options: [
        "Cefalosporyna III generacji (np. Ceftriakson 2 g i.v. raz na dobę) w połączeniu z Metronidazolem (500 mg i.v. co 8 h) LUB monoterapię inhibitorową (np. Piperacylina z tazobaktamem lub Amoksycylina z klawulanianem)",
        "Monoterapia makrolidem (azytromycyna w tabletkach raz na dobę)",
        "Dożylna wankomycyna w monoterapii przez 30 dni",
        "Antybiotyki nie mają żadnego zastosowania w zapaleniu uchyłków"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>W powikłanym zapaleniu uchyłków esicy florę infekcyjną stanowią pałeczki jelitowe Gram-ujemne (E. coli, Klebsiella) oraz bezwzględne beztlenowce (Bacteroides fragilis, Peptostreptococcus).</strong> Rekomendowanym schematem pierwszego rzutu jest połączenie <span class='dose-pill'>Ceftriakson 2 g i.v. raz/d</span> + <span class='dose-pill'>Metronidazol 500 mg i.v. co 8 h</span> LUB inhibitorowe penicyliny (<span class='dose-pill'>Piperacylina z tazobaktamem 4,5 g i.v. co 8 h</span> lub amoksycylina z kwasem klawulanowym 1,2 g i.v.).",
        "❌ BŁĄD! <strong>Makrolidy nie mają odpowiedniego spektrum przeciwko beztlenowcom i pałeczkom jelitowym.</strong>",
        "❌ BŁĄD! <strong>Wankomycyna działa wyłącznie na bakterie Gram-dodatnie,</strong> jest nieskuteczna przeciw florze Gram-ujemnej.",
        "❌ BŁĄD! <strong>W powikłanym zapaleniu z ropniem (Hinchey Ib) antybiotykoterapia jest bezwzględnie konieczna.</strong>"
      ]
    },
    {
      title: "Krok 6: Postępowanie w stanach Hinchey III i IV (Rozlane zapalenie otrzewnej)",
      text: "Gdyby u pacjenta doszło do pęknięcia ropnia lub wolnej perforacji uchyłka z kałowym zapaleniem otrzewnej (Hinchey III/IV), jakie postępowanie operacyjne jest uznanym standardem z wyboru?",
      options: [
        "Pilna laparotomia i operacja sposobem Hartmanna (resekcja zmienionej chorobowo esicy, wyłonienie kolostomii końcowej na lewym boku i ślepe zaszycie kikuta odbytnicy) lub resekcja z pierwotnym zespoleniem i ileostomią pętlową u wybranych stabilnych chorych",
        "Wyłącznie drenaż przezskórny ropnia bez otwierania jamy brzusznej",
        "Podanie leków przeciwbólowych i obserwacja przez 72 godziny",
        "Zeszycie uchyłka szwami bez wycinania pętli jelitowej"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>W rozlanym ropnym lub kałowym zapaleniu otrzewnej (Hinchey III/IV) drenaż przezskórny jest nieskuteczny – chory wymaga natychmiastowej operacji.</strong> Klasycznym 'złotym standardem' ratującym życie jest operacja Hartmanna (resekcja zapalnie zmienionej esicy, wyłonienie kolostomii końcowej i ślepe zaszycie kikuta odbytnicy). U wybranych chorych stabilnych hemodynamicznie wytyczne dopuszczają resekcję z pierwotnym zespoleniem i protekcyjną pętlą ileostomijną.",
        "❌ BŁĄD! <strong>Drenaż przezskórny nie usuwa kału rozlanego po całej jamie otrzewnej;</strong> chory zmarłby we wstrząsie septycznym.",
        "❌ BŁĄD! <strong>Zaniechanie operacji w kałowym zapaleniu otrzewnej oznacza 100% śmiertelność.</strong>",
        "❌ BŁĄD! <strong>Proste zszycie perforowanego uchyłka nie działa –</strong> zmienione zapalnie, kruche tkanki rozejdą się natychmiast po operacji."
      ]
    },
    {
      title: "Krok 7: Obowiązkowa kontrolna kolonoskopia po ustąpieniu zapalenia (wykluczenie raka)",
      text: "Ropień został pomyślnie zdrenowany pod kontrolą TK, wskaźniki zapalne spadły, dren usunięto w 5. dobie. Pacjent czuje się dobrze i pyta o dalsze badania. Jakie badanie jest BEZWZGLĘDNIE OBOWIĄZKOWE po 6-8 tygodniach od zakończenia leczenia ostrego epizodu i dlaczego?",
      options: [
        "Pełna kolonoskopia wykonana po 6-8 tygodniach od wygaśnięcia ostrego stanu zapalnego, w celu wykluczenia raka jelita grubego (rak esicy/zstępnicy może dawać identyczny obraz pogrubienia ściany i mikronadżerek w TK jak zapalenie uchyłków)",
        "Badanie gastroskopowe celem oceny refluksu żołądkowego",
        "Badanie dna oka u okulisty",
        "Nie ma potrzeby jakichkolwiek badań kontrolnych, pacjent jest w 100% wyleczony"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>To kluczowy standard onkologiczny: u każdego chorego po powikłanym epizodzie ostrego zapalenia uchyłków (oraz po pierwszym epizodzie niepowikłanym bez wcześniejszej kolonoskopii) OBOWIĄZKOWE jest wykonanie pełnej kolonoskopii po 6-8 tygodniach od ustąpienia objawów!</strong> W około 2-5% przypadków obraz 'uchyłkowatego nacieku' w TK maskuje w rzeczywistości raka jelita grubego (gruczolakoraka esicy), który perforował lub wywołał odczyn zapalny. Wykonanie kolonoskopii po wygojeniu ostrego zapalenia jest bezpieczne i ratuje życie onkologiczne.",
        "❌ BŁĄD! <strong>Gastroskopia ocenia żołądek,</strong> a proces chorobowy toczył się w esicy (jelicie grubym).",
        "❌ BŁĄD! <strong>Dno oka nie ocenia przewodu pokarmowego.</strong>",
        "❌ BŁĄD! <strong>Pominięcie kolonoskopii grozi przeoczeniem rozwijającego się nowotworu jelita grubego!</strong>"
      ]
    },
    {
      title: "Krok 8: Profilaktyka nawrotów – fakty i mity dietetyczne",
      text: "Marek pyta o dietę: 'Czy to prawda, że już nigdy nie mogę zjeść pomidorów, truskawek ani orzechów, bo pestki wpadną do uchyłków i wywołają kolejne zapalenie?' Co odpowiada lekarz w oparciu o aktualne wytyczne EBM?",
      options: [
        "Jest to obalony mit medyczny! Badania EBM dowiodły, że spożywanie orzechów, pestek, ziaren i owoców drobnopestkowych NIE zwiększa ryzyka zapalenia uchyłków; pacjent powinien stosować dietę bogatobłonnikową (błonnik rozpuszczalny i nierozpuszczalny >30 g/d), dbać o regularne nawodnienie, aktywność fizyczną oraz redukcję masy ciała",
        "Tak, pacjent ma bezwzględny zakaz jedzenia czegokolwiek z pestkami do końca życia",
        "Pacjent powinien stosować dietę wyłącznie mięsną bez żadnych warzyw",
        "Zaleca się codzienne przyjmowanie profilaktycznej dawki cyprofloksacyny przez 10 lat"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Mit o unikaniu pestek, nasion, kukurydzy i orzechów został całkowicie obalony przez duże badania prospektywne (np. Health Professionals Follow-up Study).</strong> Spożywanie tych produktów nie tylko nie zwiększa ryzyka zapalenia uchyłków, ale wręcz zmniejsza częstość powikłań dzięki wysokiej zawartości błonnika. Zalecenia profilaktyczne obejmują: <strong>dietę bogatobłonnikową (25-35 g błonnika/dobę)</strong>, obfite nawodnienie, regularną aktywność fizyczną, normalizację masy ciała (otyłość zwiększa ryzyko zapalenia o 50%) oraz unikanie przewlekłego stosowania NLPZ i palenia tytoniu.",
        "❌ BŁĄD! <strong>Zakaz jedzenia orzechów i pestek to przestarzały mit,</strong> dawno wykreślony z wytycznych gastroenterologicznych.",
        "❌ BŁĄD! <strong>Dieta ubogoresztkowa i bogatomięsna to główny czynnik ryzyka rozwoju choroby uchyłkowej!</strong>",
        "❌ BŁĄD! <strong>Przewlekła profilaktyczna antybiotykoterapia prowadzi do lekooporności i zakażeń Clostridioides difficile.</strong>"
      ]
    }
  ],
  pathoNodes: [
    {
      badge: "Uchyłkowatość",
      title: "Uchyłki rzekome w miejscach wnikania naczyń",
      short: "Przepuklina śluzówki przez muscularis propria",
      detail: "Zwiększone ciśnienie śródścienne (przewlekłe zaparcia, skurcze odcinkowe) wypycha błonę śluzową przez punkty osłabienia mięśniówki okrężnej, gdzie naczynia proste (vasa recta) penetrują ścianę esicy.",
      target: "Ściana esicy wzdłuż taśm okrężnicy",
      drugTarget: "<span class='dose-pill'>Dieta bogatobłonnikowa (>30 g/d)</span> redukcja ciśnienia śródściennego okrężnicy"
    },
    {
      badge: "Zaczopowanie",
      title: "Obturacja szyi uchyłka przez kamień kałowy",
      short: "Zastój, mikronadżerki i translokacja flory beztlenowej",
      detail: "Kamień kałowy blokuje wąskie ujście uchyłka. Zalegający śluz rozdyma uchyłek, uciskając naczynia brzeżne. Dochodzi do mikroniedokrwienia i mikroskopijnej perforacji ściany (mikroperforacja).",
      target: "Szyjka uchyłka i naczynia vasa recta",
      drugTarget: "<span class='dose-pill'>Ceftriakson 2 g i.v.</span> + <span class='dose-pill'>Metronidazol 500 mg i.v.</span> eradykacja flory mieszanej"
    },
    {
      badge: "Ropień w krezce",
      title: "Ograniczenie infekcji i ropień Hinchey Ib",
      short: "Tworzenie otorebkowanej kolekcji płynowo-gazowej",
      detail: "Sieć większa i krezka esicy ograniczają proces zapalny, zapobiegając rozlaniu do wolnej otrzewnej. Powstaje otorebkowany ropień w krezce esicy (średnica 4,5 cm), dający wysokie CRP i gorączkę.",
      target: "Kolekcja ropna w krezce esicy",
      drugTarget: "<span class='dose-pill'>Drenaż przezskórny pod kontrolą TK</span> ewakuacja ropy i dekompresja zbiornika"
    },
    {
      badge: "Powikłania septyczne",
      title: "Rozlane zapalenie otrzewnej (Hinchey III/IV)",
      short: "Pęknięcie ropnia lub wolna perforacja ściany",
      detail: "Brak kontroli nad ropniem może doprowadzić do jego wtórnego pęknięcia do wolnej jamy otrzewnej (ropne zapalenie – Hinchey III) lub bezpośredniej perforacji uchyłka (kałowe zapalenie – Hinchey IV).",
      target: "Wolna jama otrzewnej i otrzewna ścienna",
      drugTarget: "<span class='dose-pill'>Operacja Hartmanna</span> resekcja esicy z kolostomią w sepsie"
    }
  ],
  diffTable: {
    title: "⚔️ Tabela Różnicowa: Ostre zapalenie uchyłków esicy vs Inne patologie lewego dolnego kwadrantu brzucha",
    headers: ["Cecha kliniczna", "Ostre zapalenie uchyłków (Diverticulitis)", "Rak esicy / zstępnicy z perforacją", "Niedokrwienne zapalenie jelita grubego (Ischemic colitis)", "Zaostrzenie wrzodziejącego zapalenia jelita (CU)", "Ginekologiczne zapalenie przydatków (PID)"],
    rows: [
      ["Objawy wiodące", "Ostry ból w lewym dole biodrowym ('lewy wyrostek'), gorączka, leukocytoza, opór naciekowy", "Przewlekłe chudnięcie, niedokrwistość, nagłe zaostrzenie bólu z perforacją guzowatą", "Nagły ból kurczowy w lewym boku, po którym występuje krwista biegunka po epizodzie hipotonii", "Krwisto-śluzowe biegunki (kilkanaście na dobę), bolesne parcie, skurcze w lewym dole", "Obustronny ból podbrzusza, upławy, bolesność przy poruszaniu szyjką macicy"],
      ["Obraz w tomografii (TK)", "Pogrubienie ściany esicy z uchyłkami, zatarciem tłuszczu i ropniem (Hinchey)", "Nieregularna, asymetryczna masa guzowata zwężająca światło, patologiczne węzły", "Odcinkowe obrzęknięcie ściany jelita (objaw 'tarczy'), zachowane światło, bez ropni", "Ciągłe, symetryczne pogrubienie błony śluzowej odbytnicy i esicy, bez nacieku tłuszczu", "Płyn w zatoce Douglasa, obrzęk jajowodów (hydrosalpinx/pyosalpinx), jelito bez zmian"],
      ["Rola kolonoskopii w ostrej fazie", "BEZWZGLĘDNIE PRZECIWWSKAZANA w fazie ostrej (ryzyko perforacji!); odroczona o 6-8 tyg.", "Przeciwwskazana w ostrej perforacji; kluczowa po opanowaniu stanu ostrego do biopsji", "Zalecana wczesna sigmoidoskopia (bez insuflacji ciśnieniowej) – blada, owrzodzona śluzówka", "Wskazana sigmoidoskopia z oceną w skali Mayo i pobraniem wycinków", "Nie ma zastosowania diagnostycznego"],
      ["Występowanie krwi w stolcu", "Rzadko (jedynie śluz); masywne krwawienie to cecha uchyłkowatości NIEzapalnej!", "Częste przewlekłe krwawienie utajone (FOBT+) lub jawne pasma krwi", "Typowa wczesna krwista biegunka po kilku godzinach od niedokrwienia", "Ciągła krwista biegunka z ropą", "Krwawienia z dróg rodnych, brak krwi w stolcu"],
      ["Obecność uchyłków w wywiadzie", "Zwykle obecne w wywiadzie lub widoczne w TK w ponad 95%", "Mogą współistnieć, ale przyczyną jest gruczolakorak", "Zwykle brak związku z uchyłkami; dotyczy punktu Griffithsa/Sudecka", "Brak związku; choroba dotyczy błony śluzowej", "Brak związku"],
      ["Podstawowe postępowanie", "Antybiotykoterapia; w ropniu >4 cm drenaż przezskórny; operacja w Hinchey III/IV", "Onkologiczna resekcja jelita (resekcja z limfadenektomią / Hartmann)", "Postępowanie zachowawcze (nawodnienie, optymalizacja hemodynamiczna, antybiotyki)", "Glikokortykosteroidy systemowe, leki biologiczne, aminosalicylany", "Antybiotykoterapia skojarzona (np. ceftriakson + doksycyklina + metronidazol)"]
    ]
  },
  dutySummary: {
    overview: "Ostre zapalenie uchyłków esicy (Acute Diverticulitis) rozwija się u ok. 4-5% osób z uchyłkowatością jelita grubego. Wynika z zaczopowania uchyłka przez kamień kałowy z następowym mikroniedokrwieniem i perforacją. W klasyfikacji Hincheya postać Ib definiuje ropień okołookrężniczy/krezkowy. U pacjentów z ropniem >=4 cm metodą z wyboru jest drenaż przezskórny (PCD), co pozwala na uniknięcie natychmiastowej operacji i stomii.",
    diagnostics: "1. Ocena objawów klinicznych: ostry ból w lewym dole biodrowym ('lewy wyrostek'), gorączka, obrona mięśniowa, opór naciekowy.<br>2. Tomografia komputerowa (TK) jamy brzusznej i miednicy z kontrastem i.v. – badanie z wyboru (ocena pogrubienia ściany, nacieku tłuszczu, wielkości i lokalizacji ropnia wg Hincheya).<br>3. Morfologia i biochemia: leukocytoza neutrofilowa z przesunięciem w lewo, wysokie stężenie CRP (>150 mg/l), prokalcytonina.<br>4. KOLONOSKOPIA W FAZIE OSTREJ JEST BEZWZGLĘDNIE PRZECIWWSKAZANA z powodu ryzyka wolnej perforacji do otrzewnej!<br>5. Obligatoryjna pełna kolonoskopia po 6-8 tygodniach od wyleczenia w celu wykluczenia raka jelita grubego.",
    drugsAndDoses: "1. Antybiotykoterapia empiryczna dożylna w powikłanym zapaleniu uchyłków (Hinchey Ib/II):<br>   - <span class='dose-pill'>Ceftriakson 2 g i.v. raz na dobę</span> + <span class='dose-pill'>Metronidazol 500 mg i.v. co 8 h</span> LUB<br>   - <span class='dose-pill'>Piperacylina z tazobaktamem 4,5 g i.v. co 8 h</span>.<br>2. Czas trwania antybiotykoterapii: zwykle 7-10 dni (lub 4 dni po skutecznym zdrenowaniu ropnia).<br>3. Płynoterapia: <span class='dose-pill'>Płyn wieloelektrolitowy (PWE) 2000 ml/dobę i.v.</span>.<br>4. Analgezja: <span class='dose-pill'>Paracetamol 1 g i.v. co 6 h</span>; unika się leków z grupy NLPZ (zwiększają ryzyko perforacji uchyłków!).",
    procedures: "1. Przezskórny drenaż ropnia pod kontrolą TK lub USG (Percutaneous Catheter Drainage – PCD) – metoda z wyboru przy ropniach >=4-5 cm (Hinchey Ib i II).<br>2. Płukanie i aspiracja treści ropnej z pozostawieniem drenu 'pigtail' do czasu spadku wydzieliny <10-15 ml/dobę.<br>3. Wskazania do pilnej operacji (operacja Hartmanna): rozlane ropne lub kałowe zapalenie otrzewnej (Hinchey III/IV), brak możliwości drenażu przezskórnego lub brak poprawy klinicznej po 48 h.<br>4. Planowa sigmoidektomia po wygojeniu rozważana indywidualnie u chorych z nawrotowymi powikłanymi zapaleniami lub przetokami (np. pęcherzowo-esiczymi).",
    monitoring: "1. Monitorowanie temperatury ciała, tętna i powłok brzucha (ustępowanie obrony mięśniowej i objawu Blumberga).<br>2. Kontrola wskaźników zapalnych (spadek leukocytozy i CRP o >50% w 3.-4. dobie potwierdza skuteczność drenażu).<br>3. Obserwacja objętości i charakteru treści z drenu ropnia.<br>4. Edukacja pacjenta przy wypisie: dieta bogatobłonnikowa (>30 g/d, brak konieczności unikania pestek i orzechów!), redukcja masy ciała, unikanie zaparć i NLPZ."
  },
  lekQuestions: [
    {
      question: "Objaw tzw. 'lewostronnego zapalenia wyrostka robaczkowego' (left-sided appendicitis) – ból w lewym dole biodrowym z obroną mięśniową, gorączką i leukocytozą – jest typowy dla:",
      options: [
        "Ostrego zapalenia uchyłków esicy (acute diverticulitis)",
        "Ostrego kamiczego zapalenia pęcherzyka żółciowego",
        "Perforacji wrzodu przedniej ściany dwunastnicy",
        "Pękniętego tętniaka aorty brzusznej",
        "Wrzodu trawiennego żołądka bez perforacji"
      ],
      correct: 0,
      expl: "Ostre zapalenie uchyłków esicy przebiega z analogicznym patomechanizmem jak zapalenie wyrostka (zablokowanie szyi uchyłka przez kamień kałowy, mikroniedokrwienie i mikroperforacja z naciekiem zapalnym otrzewnej), lecz ze względu na lokalizację esicy objawy manifestują się w lewym dole biodrowym ('lewy wyrostek')."
    },
    {
      question: "Badaniem obrazowym z wyboru o najwyższej wartości diagnostycznej w podejrzeniu ostrego zapalenia uchyłków jest:",
      options: [
        "Tomografia komputerowa (TK) jamy brzusznej i miednicy z kontrastem dożylnym",
        "Pełna kolonoskopia w znieczuleniu ogólnym",
        "Przeglądowe RTG jamy brzusznej na leżąco",
        "Wlew doodbytniczy z zawiesiny siarczanu baru",
        "Scyntygrafia wątroby i dróg żółciowych (HIDA)"
      ],
      correct: 0,
      expl: "Zgodnie z wytycznymi WSES i ASCRS tomografia komputerowa (TK) jamy brzusznej i miednicy z kontrastem dożylnym jest złotym standardem (czułość >98%). Uwidacznia grubość ściany jelita, naciekanie tłuszczu krezki, obecność ropni oraz wolnego gazu, umożliwiając precyzyjną klasyfikację wg skali Hincheya."
    },
    {
      question: "Dlaczego wykonywanie kolonoskopii w ostrej fazie zapalenia uchyłków jest BEZWZGLĘDNIE PRZECIWWSKAZANE?",
      options: [
        "Ponieważ insuflacja powietrza pod ciśnieniem i manipulacja aparatem w zmienionej zapalnie, kruchej ścianie jelita stwarza wysokie ryzyko jatrogennej wolnej perforacji do jamy otrzewnej",
        "Ponieważ kolonoskopia zawsze niszczy zwieracze odbytu",
        "Ponieważ światło jelita grubego w zapaleniu uchyłków ulega całkowitemu zarośnięciu kostnemu",
        "Z powodu natychmiastowego zawału mięśnia sercowego",
        "Kolonoskopia nie jest przeciwwskazana i stanowi badanie pierwszego rzutu"
      ],
      correct: 0,
      expl: "W ostrej fazie ściana esicy jest obrzęknięta, krucha i objęta mikronadżerkami lub mikroperforacją. Wtłaczanie powietrza (insuflacja) w trakcie kolonoskopii rozdyma osłabioną ścianę, co grozi zamianą ograniczonego zapalenia w jatrogenną wolną perforację do otrzewnej z rozlanym kałowym zapaleniem otrzewnej i koniecznością wyłonienia stomii."
    },
    {
      question: "Zgodnie ze zmodyfikowaną klasyfikacją Hincheya obecność ropnia w krezce esicy lub ropnia okołookrężniczego definiuje stopień:",
      options: [
        "Hinchey Ib",
        "Hinchey 0",
        "Hinchey Ia",
        "Hinchey II",
        "Hinchey IV"
      ],
      correct: 0,
      expl: "W klasyfikacji Hincheya: stopień 0 to łagodne niepowikłane zapalenie; stopień Ia to zapalenie okołojelitowe z naciekiem tłuszczu (flegmona) bez ropnia; stopień Ib to obecność ropnia okołookrężniczego lub w krezce esicy; stopień II to ropień odległy (miedniczny/zaotrzewnowy); stopień III to rozlane ropne zapalenie otrzewnej, a stopień IV to kałowe zapalenie otrzewnej."
    },
    {
      question: "Zgodnie z wytycznymi chirurgicznymi postępowaniem z wyboru u stabilnego pacjenta z ropniem w przebiegu zapalenia uchyłków (Hinchey Ib/II) o średnicy >= 4-5 cm jest:",
      options: [
        "Przezskórny drenaż ropnia pod kontrolą TK lub USG w połączeniu z dożylną antybiotykoterapią",
        "Natychmiastowa pilna operacja Hartmanna ze stomią",
        "Sama dieta bezresztkowa bez podawania jakichkolwiek leków",
        "Doustne preparaty żelaza w wysokich dawkach",
        "Wykonanie pilnej kolonoskopii z nacięciem uchyłka"
      ],
      correct: 0,
      expl: "Przy ropniach o średnicy >=4-5 cm złotym standardem jest przezskórny drenaż pod kontrolą obrazową (PCD – Percutaneous Catheter Drainage) w osłonie antybiotykoterapii dożylnej. Umożliwia to ewakuację zakażonej treści, ustąpienie sepsy i pozwala uniknąć natychmiastowej operacji i wyłonienia stomii u ponad 80-85% chorych."
    },
    {
      question: "Dlaczego po 6-8 tygodniach od ustąpienia powikłanego epizodu ostrego zapalenia uchyłków bezwzględnie zaleca się wykonanie pełnej kolonoskopii?",
      options: [
        "W celu wykluczenia raka jelita grubego, który może dawać w tomografii komputerowej obraz identyczny z zapaleniem uchyłków",
        "Aby usunąć chirurgicznie wszystkie uchyłki esicy kleszczykami biopsyjnymi",
        "W celu pobrania wycinków na obecność Helicobacter pylori",
        "Jest to badanie zbędne i niezalecane w żadnych wytycznych",
        "Aby potwierdzić całkowity brak flory bakteryjnej w jelicie"
      ],
      correct: 0,
      expl: "W około 2-5% przypadków obraz pogrubienia ściany esicy i odczynu zapalnego w TK imitujący zapalenie uchyłków okazuje się w rzeczywistości perforującym gruczolakorakiem jelita grubego. Wykonanie pełnej kolonoskopii po 6-8 tygodniach (gdy minie ostry stan zapalny i ryzyko perforacji) jest obligatoryjnym standardem onkologicznym."
    },
    {
      question: "Wskaż prawdziwe stwierdzenie oparte na faktach medycznych (EBM) dotyczące diety w chorobie uchyłkowej jelita grubego:",
      options: [
        "Spożywanie orzechów, nasion, kukurydzy i owoców drobnopestkowych NIE zwiększa ryzyka zapalenia uchyłków, a zalecana jest dieta bogatobłonnikowa (>25-35 g/dobę)",
        "Pacjent z uchyłkami ma dożywotni bezwzględny zakaz jedzenia truskawek, pomidorów i orzechów",
        "Dieta w uchyłkowatości powinna być całkowicie pozbawiona jakiegokolwiek błonnika",
        "Jedzenie bananów jest bezpośrednią przyczyną powstawania przetok esiczych",
        "Zaleca się unikanie picia wody powyżej 500 ml na dobę"
      ],
      correct: 0,
      expl: "Współczesne wytyczne EBM jednoznacznie obaliły mit o zakazie jedzenia pestek, orzechów i ziaren. Pacjenci z uchyłkowatością mogą bezpiecznie spożywać te produkty. Podstawą profilaktyki jest dieta bogatobłonnikowa (>25-35 g błonnika na dobę), obfite nawodnienie oraz aktywność fizyczna, co zmniejsza ciśnienie w świetle jelita."
    },
    {
      question: "Zabieg operacyjny sposobem Hartmanna w rozlanym kałowym zapaleniu otrzewnej w przebiegu perforacji uchyłka (Hinchey IV) polega na:",
      options: [
        "Resekcji zmienionej chorobowo esicy, wyłonieniu pojedynczej kolostomii końcowej na powłokach brzucha oraz ślepym zaszyciu kikuta odbytnicy w miednicy",
        "Wycięciu całego żołądka z pozostawieniem esicy bez zmian",
        "Zszyciu otworu uchyłka bez wycinania pętli i założeniu drenu",
        "Wyłonieniu pętlowej jejunostomii bez resekcji ogniska zapalnego",
        "Zespoleniu omijającym krętniczo-odbytniczym"
      ],
      correct: 0,
      expl: "Operacja Hartmanna polega na usunięciu (resekcji) zmienionego zapalnie i perforowanego odcinka esicy, wyprowadzeniu bliższego końca okrężnicy na powłoki brzuszne jako kolostomii końcowej (stomia jednootworowa) oraz ślepym zamknięciu szwami dalszego kikuta odbytnicy w miednicy mniejszej. Jest zabiegiem z wyboru w ciężkiej sepsie kałowej, chroniąc przed nieszczelnością zespolenia."
    },
    {
      question: "Najczęstszym narządem, do którego dochodzi do wytworzenia patologicznej przetoki (fistula) w przebiegu przewlekłego powikłanego zapalenia uchyłków esicy, jest:",
      options: [
        "Pęcherz moczowy (przetoka esiczo-pęcherzowa / colovesical fistula)",
        "Worek osierdziowy serca",
        "Prawe płuco",
        "Śledziona",
        "Pęcherzyk żółciowy"
      ],
      correct: 0,
      expl: "Najczęstszą przetoką w chorobie uchyłkowej jest przetoka esiczo-pęcherzowa (colovesical fistula ~65% wszystkich przetok). Wynika z bezpośredniego sąsiedztwa anatomicznego zapalnie zmienionej esicy i ściany pęcherza. Objawia się nawracającymi zakażeniami układu moczowego florą kałową, pneumaturią (obecność pęcherzyków gazu w moczu) oraz fekalurią (treść kałowa w moczu)."
    },
    {
      question: "Czym różni się uchyłek rzekomy (pseudodiverticulum) okrężnicy od uchyłka prawdziwego (np. uchyłka Meckela)?",
      options: [
        "Uchyłek rzekomy składa się wyłącznie z uwypuklenia błony śluzowej i podśluzowej przez warstwę mięśniową, podczas gdy uchyłek prawdziwy zawiera wszystkie warstwy ściany jelita (łącznie z mięśniówką)",
        "Uchyłek rzekomy występuje wyłącznie w przełyku",
        "Uchyłek prawdziwy nie zawiera błony śluzowej",
        "Uchyłek rzekomy nigdy nie ulega stanowi zapalnemu",
        "Nie ma żadnych różnic histopatologicznych"
      ],
      correct: 0,
      expl: "Uchyłki nabyte jelita grubego są uchyłkami rzekomymi (pseudodiverticula) – powstają w miejscach wnikania naczyń w ścianie jelita, gdzie błona śluzowa i podśluzowa ulegają wpukleniu na zewnątrz przez warstwę mięśniową właściwą (muscularis propria). Uchyłek prawdziwy (np. uchyłek Meckela) jest wadą wrodzoną i jego ściana zbudowana jest ze wszystkich warstw narządu."
    },
    {
      question: "U pacjenta z rozpoznanym ostrego zapalenia uchyłków esicy należy bezwzględnie unikać przewlekłego stosowania leków z grupy:",
      options: [
        "Niesteroidowych leków przeciwzapalnych (NLPZ), ponieważ udowodniono, że zwiększają one ryzyko perforacji i krwawień z uchyłków",
        "Inhibitorów pompy protonowej",
        "Probiotyków zawierających szczepy Lactobacillus",
        "Preparatów błonnika rozpuszczalnego",
        "Witaminy D3"
      ],
      correct: 0,
      expl: "Stosowanie niesteroidowych leków przeciwzapalnych (NLPZ, np. ketoprofen, diklofenak, ibuprofen), jak również kwasu acetylosalicylowego i glikokortykosteroidów, jest silnym, udokumentowanym czynnikiem ryzyka powikłań choroby uchyłkowej – drastycznie zwiększa częstość perforacji uchyłków, krwawień oraz konieczności pilnych operacji chirurgicznych."
    }
  ],
  flashcards: [
    {
      front: "Dlaczego ostre zapalenie uchyłków esicy nazywane jest 'lewym wyrostkiem robaczkowym'?",
      back: "Objawia się identycznym patomechanizmem (zaczopowanie kamieniem kałowym, mikroniedokrwienie, zapalenie otrzewnej) i triadą objawów (ból, obrona mięśniowa, gorączka, leukocytoza), ale w LEWYM dole biodrowym."
    },
    {
      front: "Jakie badanie obrazowe jest badaniem z wyboru w zapaleniu uchyłków, a jakie jest BEZWZGLĘDNIE PRZECIWWSKAZANE w ostrej fazie?",
      back: "Badanie z wyboru: Tomografia komputerowa (TK) jamy brzusznej i miednicy z kontrastem i.v.\nBezwzględnie przeciwwskazana: KOLONOSKOPIA (ryzyko przedziurawienia i kałowego zapalenia otrzewnej!)."
    },
    {
      front: "Jakie jest postępowanie w ropniu krezki esicy o średnicy >=4-5 cm (Hinchey Ib/II)?",
      back: "Przezskórny drenaż ropnia pod kontrolą TK lub USG (PCD) + antybiotykoterapia dożylna – pozwala uniknąć natychmiastowej operacji i stomii u >85% chorych."
    },
    {
      front: "Dlaczego po 6-8 tygodniach od ustąpienia powikłanego zapalenia uchyłków OBOWIĄZKOWE jest wykonanie kolonoskopii?",
      back: "W celu wykluczenia raka jelita grubego – w 2-5% przypadków obraz nacieku uchyłkowego w TK maskuje w rzeczywistości perforującego gruczolakoraka esicy."
    },
    {
      front: "Co to jest objaw przetoki esiczo-pęcherzowej (colovesical fistula)?",
      back: "Nawracające zakażenia dróg moczowych florą kałową, pneumaturia (obecność pęcherzyków gazu w moczu podczas mikcji) oraz fekaluria (stolec w moczu)."
    },
    {
      front: "Czy pacjent z uchyłkowatością jelita grubego musi unikać jedzenia pestek, orzechów i ziaren?",
      back: "NIE! To obalony mit medyczny. Badania EBM dowiodły, że spożywanie orzechów i pestek nie zwiększa ryzyka zapalenia. Zalecana jest dieta bogatobłonnikowa (>30 g/d)."
    }
  ]
};

// Mirror fields for schema compatibility
case134.steps.forEach(step => {
  step.question = step.title;
  step.explanation = step.feedback;
});
case134.lekQuestions.forEach(q => {
  q.opts = q.options;
  q.correctIdx = q.correct;
  q.exp = q.expl;
});

saveCase(case134);

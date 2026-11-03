const fs = require('fs');
const { decryptObjectAes, encryptStringAes } = require('./encrypt_case.js');
const PASSWORD = '@LEKSzymon28111999';

async function reworkCase(fname, updater) {
  const enc = JSON.parse(fs.readFileSync('cases/' + fname, 'utf8'));
  const c = await decryptObjectAes(enc, PASSWORD);
  updater(c);
  if (!c.vitalsObj) {
    c.vitalsObj = { hr: 115, bp: "100/65", spo2: 98, rr: 22, temp: 38.0, gcs: 15 };
  }
  const reEnc = await encryptStringAes(JSON.stringify(c, null, 2), PASSWORD);
  fs.writeFileSync('cases/' + fname, JSON.stringify(reEnc, null, 2), 'utf8');
  console.log(`Successfully reworked: ${fname} (LEK Q count: ${c.lekQuestions.length}, steps: ${c.steps.length})`);
}

async function run() {
  console.log("Reworking Cases 103 and 104 to Gold Standard (11 LEK Questions, Bedside Narrative, Full DiffTable & PathoNodes)...");

  // ==========================================
  // CASE 103: Ostre zapalenie wyrostka robaczkowego u dziecka
  // ==========================================
  await reworkCase('103_wyrostek_dziecko.json', (c) => {
    c.shortTitle = "Chłopiec 7 l. – Ból śródbrzusza wędrujący do prawego dołu biodrowego, wymioty i gorączka (Zapalenie wyrostka)";
    c.diagnosisTitle = "Ostre zapalenie wyrostka robaczkowego u dziecka (Appendicitis acuta in paediatria) z miejscowym odczynem otrzewnowym";

    c.vitals = [
      { label: "Temp", val: "38.2°C", sub: "Gorączka umiarkowana", status: "warn" },
      { label: "HR", val: "116/min", sub: "Tachykardia zatokowa", status: "warn" },
      { label: "BP", val: "102/65 mmHg", sub: "Prawidłowe", status: "ok" },
      { label: "RR", val: "22/min", sub: "Prawidłowy", status: "ok" },
      { label: "SpO2", val: "99%", sub: "Prawidłowa", status: "ok" }
    ];
    c.vitalsObj = { hr: 116, bp: "102/65", spo2: 99, rr: 22, temp: 38.2, gcs: 15 };

    c.story = "Do szpitalnego oddziału ratunkowego dla dzieci zgłaszają się rodzice z 7-letnim Bartkiem. Chłopiec zachorował około 18 godzin temu: początkowo skarżył się na tępy, rozlany, trudny do zlokalizowania ból w okolicy pępka i nadbrzusza, połączony z całkowitą utratą apetytu (odmówił zjedzenia ulubionych naleśników) oraz nudnościami. W nocy dwukrotnie zwymiotował treścią żołądkową. Nad ranem ból nasilił się, zmienił swój charakter na ostry i przemieścił się do prawego dołu biodrowego (objaw Kochera). Dziecko wchodzi do gabinetu zgięte wpół, utykając na prawą nogę, unika gwałtownych ruchów, a na prośbę o podskoczenie na prawej nodze kategorycznie odmawia z powodu przeszywającego bólu brzucha. W badaniu fizykalnym: język obłożony białym nalotem, suchy. Brzuch nieco wzdęty, bolesny palpacyjnie w prawym dole biodrowym z wyraźną obroną mięśniową (défense musculaire). Objaw Blumberga, Rovsinga i Jaworskiego (psoas sign) silnie dodatnie. Brak cech przepukliny w pachwinach, jądra w mosznie symetryczne, niebolesne.";

    c.labs = [
      {
        category: "Morfologia krwi obwodowej",
        items: [
          { name: "Leukocyty (WBC)", val: "15.8 G/L", norm: "5.0–13.0 G/L", flag: "H" },
          { name: "Neutrofile (NEUT%)", val: "82% (12.9 G/L)", norm: "40–60%", flag: "H" },
          { name: "Limfocyty (LYMPH%)", val: "12%", norm: "30–50%", flag: "L" },
          { name: "Płytki krwi (PLT)", val: "310 G/L", norm: "150–450 G/L", flag: "N" },
          { name: "Hemoglobina (Hb)", val: "13.2 g/dL", norm: "11.5–14.5 g/dL", flag: "N" }
        ]
      },
      {
        category: "Markery stanu zapalnego i badanie moczu",
        items: [
          { name: "Białko C-reaktywne (CRP)", val: "48 mg/L", norm: "< 5.0 mg/L", flag: "H" },
          { name: "Prokalcytonina (PCT)", val: "0.45 ng/mL", norm: "< 0.5 ng/mL", flag: "N" },
          { name: "Badanie ogólne moczu", val: "Leukocyty 2–4 w pw, erytrocyty 0–1 w pw, azotyny ujemne", norm: "Norma", flag: "N" }
        ]
      }
    ];

    c.steps = [
      {
        stepNum: 1,
        title: "Krok 1: Wstępna ocena kliniczna ostrego bólu brzucha i wędrówki Kochera",
        desc: "Jesteś dyżurnym chirurgiem dziecięcym. Zgłasza się 7-letni Bartek z 18-godzinnym wywiadem bólu brzucha, który z okolicy okołopępkowej przeniósł się do prawego dołu biodrowego, z towarzyszącym jadłowstrętem, wymiotami i temperaturą 38.2°C. Chłopiec leży nieruchomo na boku z podkurczonymi nogami. Co oznacza to zjawisko wędrówki bólu i jaka jest jego patofizjologia?",
        scenario: "Jesteś dyżurnym chirurgiem dziecięcym. Zgłasza się 7-letni Bartek z 18-godzinnym wywiadem bólu brzucha, który z okolicy okołopępkowej przeniósł się do prawego dołu biodrowego, z towarzyszącym jadłowstrętem, wymiotami i temperaturą 38.2°C. Chłopiec leży nieruchomo na boku z podkurczonymi nogami. Co oznacza to zjawisko wędrówki bólu i jaka jest jego patofizjologia?",
        options: [
          {
            text: "Objaw Kochera (wędrujący ból brzucha): początkowy ból trzewny (przewodzony niespecyficznymi włóknami C układu autonomicznego z segmentu Th10 w rzucie pępka na skutek wzrostu ciśnienia w świetle wyrostka) przekształca się po kilkunastu godzinach w ból somatyczny (ostry, zlokalizowany w prawym dole biodrowym w wyniku przejścia procesu zapalnego na otrzewną ścienną unerwianą somatycznie).",
            correct: true,
            feedback: "✅ PRAWIDŁOWO! Klasyczna sekwencja objawu Kochera: wczesne stadium to ból trzewny (napięcie ściany i niedokrwienie wyrostka robaczkowego rzutowane przez włókna współczulne Th10 do pępka); gdy stan zapalny osiąga surowicówkę i obejmuje otrzewną ścienną, pobudzone zostają somatyczne nerwy rdzeniowe, co daje ostry, precyzyjnie zlokalizowany ból w prawym dole biodrowym z obroną mięśniową. Występuje u ponad 70% dzieci z ostrym zapaleniem wyrostka!"
          },
          {
            text: "Wędrówka bólu świadczy o przemieszczaniu się kamienia moczowodowego z nerki do pęcherza moczowego.",
            correct: false,
            feedback: "❌ BŁĄD! Ból kolkowy nerkowy promieniuje do pachwiny i narządów płciowych i towarzyszy mu krwinkomocz, a nie obrona mięśniowa w punkcie McBurneya u 7-latka."
          },
          {
            text: "Jest to objaw Goldflama wskazujący na ostre odmiedniczkowe zapalenie nerek.",
            correct: false,
            feedback: "❌ BŁĄD! Objaw Goldflama to bolesność przy uderzeniu w okolicę lędźwiową, a nie wędrujący ból brzucha."
          },
          {
            text: "Ból okołopępkowy to czysta histeria dziecięca, zlecasz leki uspokajające i wypis.",
            correct: false,
            feedback: "❌ BŁĄD KRYTYCZNY! Zbagatelizowanie objawu Kochera doprowadzi do perforacji wyrostka, kałowego zapalenia otrzewnej i sepsy!"
          }
        ]
      },
      {
        stepNum: 2,
        title: "Krok 2: Badanie przedmiotowe powłok brzusznych – punkty bolesności i objawy otrzewnowe",
        desc: "Przystępujesz do delikatnego badania palpacyjnego brzucha małego pacjenta. Jakie charakterystyczne punkty i objawy badasz w prawym dole biodrowym i jak interpretujesz ich dodatni wynik?",
        scenario: "Przystępujesz do delikatnego badania palpacyjnego brzucha małego pacjenta. Jakie charakterystyczne punkty i objawy badasz w prawym dole biodrowym i jak interpretujesz ich dodatni wynik?",
        options: [
          {
            text: "Punkt McBurneya (w 1/3 odległości od kolca biodrowego przedniego górnego do pępka), punkt Lanza (w 1/3 odległości między kolcami biodrowymi), objaw Blumberga (ból przy nagłym zwolnieniu ucisku powłok – zapalenie otrzewnej ściennej), objaw Rovsinga (ból w prawym dole biodrowym przy ucisku lewego dołu biodrowego) oraz objaw Jaworskiego (ból przy prostowaniu kończyny dolnej w stawie biodrowym przeciw oporowi – zapalenie wyrostka położonego zakątniczo / psoas sign).",
            correct: true,
            feedback: "✅ PRAWIDŁOWO! Kanon badania chirurgicznego: Punkt McBurneya i Lanza to anatomiczne rzuty podstawy wyrostka robaczkowego. Objaw Blumberga dowodzi podrażnienia otrzewnej ściennej. Objaw Rovsinga polega na przesunięciu gazów wstecznie przez okrężnicę i rozciągnięciu kątnicy. Dodatni objaw Jaworskiego (psoas sign) wskazuje na położenie wyrostka zakątniczo (retrocaecal), tuż nad mięśniem biodrowo-lędźwiowym!"
          },
          {
            text: "Objaw Chełmońskiego i objaw Murphy'ego, które potwierdzają zapalenie wyrostka.",
            correct: false,
            feedback: "❌ BŁĄD! Objawy Chełmońskiego i Murphy'ego dotyczą pęcherzyka żółciowego i wątroby (prawe podżebrze), a nie wyrostka robaczkowego."
          },
          {
            text: "Objaw Courvoisiera w lewym podżebrzu.",
            correct: false,
            feedback: "❌ BŁĄD! Objaw Courvoisiera to powiększony, bezbolesny pęcherzyk żółciowy w raku brodawki Vatera / głowy trzustki u dorosłych."
          },
          {
            text: "Głębokie i forsowne ugniatanie brzucha pięścią w celu pęknięcia wyrostka.",
            correct: false,
            feedback: "❌ BŁĄD KRYTYCZNY! Brutalne badanie u dziecka wywołuje obronę mięśniową, ból i może doprowadzić do jatrogennej perforacji zmienionego zapalnie wyrostka."
          }
        ]
      },
      {
        stepNum: 3,
        title: "Krok 3: Stratyfikacja ryzyka w skalach klinicznych – Skala PAS i Alvarado",
        desc: "Rezydent proponuje obliczenie punktacji w dedykowanej pediatrycznej skali PAS (Pediatric Appendicitis Score). Bartek ma: jadłowstręt (1), nudności/wymioty (1), wędrówkę bólu (1), gorączkę >38.0°C (1), bolesność w prawym dole biodrowym (2), bolesność przy kaszlu/skakaniu (2), leukocytozę >10 G/L (1) oraz neutrofilię >75% (1). Jaka jest suma punktów i co oznacza ten wynik?",
        scenario: "Rezydent proponuje obliczenie punktacji w dedykowanej pediatrycznej skali PAS (Pediatric Appendicitis Score). Bartek ma: jadłowstręt (1), nudności/wymioty (1), wędrówkę bólu (1), gorączkę >38.0°C (1), bolesność w prawym dole biodrowym (2), bolesność przy kaszlu/skakaniu (2), leukocytozę >10 G/L (1) oraz neutrofilię >75% (1). Jaka jest suma punktów i co oznacza ten wynik?",
        options: [
          {
            text: "Wynik wynosi 10/10 punktów (grupa wysokiego ryzyka / PAS >=8 punktów), co oznacza >90-95% prawdopodobieństwo ostrego zapalenia wyrostka robaczkowego i stanowi bezwzględne wskazanie do pilnej konsultacji chirurgicznej i przygotowania do operacji.",
            correct: true,
            feedback: "✅ PRAWIDŁOWO! Skala PAS (Samuel 2002) oraz skala Alvarado są zwalidowanymi narzędziami oceny ryzyka zapalenia wyrostka u dzieci. Wynik PAS <=3 oznacza niskie ryzyko (możliwy bezpieczny wypis/obserwacja), 4-7 ryzyko pośrednie (konieczna diagnostyka obrazowa USG/obserwacja w szpitalu), a wynik >=8 punktów to wysokie ryzyko kwalifikujące do pilnej interwencji chirurgicznej."
          },
          {
            text: "Wynik 10 punktów oznacza niskie ryzyko, pacjenta można odesłać do domu bez badań.",
            correct: false,
            feedback: "❌ BŁĄD KRYTYCZNY! 10 punktów to maksymalna punktacja wysokiego ryzyka."
          },
          {
            text: "Skala PAS służy wyłącznie do oceny nasilenia łuszczycy u dzieci.",
            correct: false,
            feedback: "❌ BŁĄD! Mylisz Pediatric Appendicitis Score (PAS) ze skalą PASI (Psoriasis Area and Severity Index)."
          },
          {
            text: "Punktacja ta nakazuje natychmiastowe wdrożenie samej aspiryny doustnie.",
            correct: false,
            feedback: "❌ BŁĄD! Aspiryna u dzieci jest przeciwwskazana (zespół Reye'a) i nie leczy zapalenia wyrostka."
          }
        ]
      },
      {
        stepNum: 4,
        title: "Krok 4: Diagnostyka obrazowa z wyboru w pediatrii – Ultrasonografia (USG)",
        desc: "Mimo wysokiego wyniku w skali klinicznej, przed otwarciem jamy brzusznej wykonujesz przyłóżkowe USG jamy brzusznej. Jakie są ultrasonograficzne kryteria rozpoznania ostrego zapalenia wyrostka robaczkowego i dlaczego USG jest metodą I rzutu u dzieci?",
        scenario: "Mimo wysokiego wyniku w skali klinicznej, przed otwarciem jamy brzusznej wykonujesz przyłóżkowe USG jamy brzusznej. Jakie są ultrasonograficzne kryteria rozpoznania ostrego zapalenia wyrostka robaczkowego i dlaczego USG jest metodą I rzutu u dzieci?",
        options: [
          {
            text: "USG jest metodą I wyboru z uwagi na brak promieniowania jonizującego (ochrona radiologiczna tkanek dziecka); kryteria to: niepodatny na ucisk głowicą (incompressible), ślepo zakończony narząd cewkowy o średnicy zewnętrznej >6 mm, pogrubienie ściany >2-3 mm z hiperwaskularyzacją w color-Dopplerze, obecność hiperechogennego kamienia kałowego (fecalith) dającego cień akustyczny oraz wzmożona echogeniczność otaczającej tkanki tłuszczowej.",
            correct: true,
            feedback: "✅ PRAWIDŁOWO! Złoty standard obrazowania u dzieci wg wytycznych europejskich i amerykańskich: USG jamy brzusznej głowicą liniową wysokiej częstotliwości z techniką stopniowanego ucisku (graded compression). Czułość >85-90%. Kryterium wymiaru: średnica poprzeczna >6 mm. Tomografię komputerową (TK) rezerwuje się wyłącznie dla przypadków niejednoznacznych diagnostycznie lub podejrzenia powikłań ropnych głębokich, aby chronić dziecko przed dawką promieniowania rentgenowskiego!"
          },
          {
            text: "Złotym standardem u każdego dziecka jest tomografia komputerowa (TK) brzucha i miednicy z kontrastem dożylnym, doustnym i doodbytniczym.",
            correct: false,
            feedback: "❌ BŁĄD! TK nie jest badaniem I rzutu u dzieci z powodu znacznej dawki promieniowania jonizującego zwiększającej ryzyko nowotworów w przyszłości."
          },
          {
            text: "USG wykazuje zapalenie wyrostka tylko wtedy, gdy jego średnica wynosi dokładnie 1 mm.",
            correct: false,
            feedback: "❌ BŁĄD! Prawidłowy wyrostek ma średnicę <6 mm. Średnica >6 mm i brak podatności na ucisk świadczy o stanie zapalnym."
          },
          {
            text: "Wystarczy wykonanie przeglądowego RTG klatki piersiowej na leżąco.",
            correct: false,
            feedback: "❌ BŁĄD! Zwykłe RTG nie uwidacznia zmienionego zapalnie wyrostka robaczkowego."
          }
        ]
      },
      {
        stepNum: 5,
        title: "Krok 5: Diagnostyka różnicowa – Zapalenie węzłów krezkowych i uchyłek Meckela",
        desc: "Przed decyzją o cięciu chirurgicznym musisz wykluczyć inne częste przyczyny ostrego brzucha u 7-latka. Jakie cechy w wywiadzie i USG odróżniają ostre zapalenie węzłów chłonnych krezkowych (adenitis mesenterica) oraz zapalenie uchyłka Meckela od zapalenia wyrostka?",
        scenario: "Przed decyzją o cięciu chirurgicznym musisz wykluczyć inne częste przyczyny ostrego brzucha u 7-latka. Jakie cechy w wywiadzie i USG odróżniają ostre zapalenie węzłów chłonnych krezkowych (adenitis mesenterica) oraz zapalenie uchyłka Meckela od zapalenia wyrostka?",
        options: [
          {
            text: "Zapalenie węzłów krezkowych (adenitis mesenterica) jest poprzedzone infekcją wirusową górnych dróg oddechowych (faryngitis), ból ma charakter bardziej uogólniony i zmienny, w USG wyrostek jest prawidłowy (<6 mm), a w krezce widoczne są pakiety powiększonych, owalnych węzłów chłonnych (>8-10 mm); uchyłek Meckela (reguła dwójek) może ulec zapaleniu lub krwawić w wyniku ektopowej błony śluzowej żołądka.",
            correct: true,
            feedback: "✅ PRAWIDŁOWO! Najczęstsza pomyłka diagnostyczna u dzieci: ostre zapalenie węzłów chłonnych krezkowych (często po zakażeniu adenowirusem lub Yersinia enterocolitica). Ból w adenitis mesenterica jest mniej zlokalizowany, a dziecko nie prezentuje twardej obrony mięśniowej. Uchyłek Meckela: przetrwały przewód żółtkowo-jelitowy, reguła 2: 2% populacji, 2 cale długości, 2 stopy od zastawki Bauchina, 2 rodzaje ektopowej tkanki (żołądek, trzustka), szczyt objawów do 2. roku życia."
          },
          {
            text: "Zapalenie węzłów krezkowych występuje wyłącznie u osób po 80. roku życia.",
            correct: false,
            feedback: "❌ BŁĄD! To typowa choroba wieku dziecięcego."
          },
          {
            text: "Uchyłek Meckela znajduje się w przełyku i daje trudności w połykaniu.",
            correct: false,
            feedback: "❌ BŁĄD! Uchyłek Meckela leży w jelicie krętym (ileum terminale), a nie w przełyku (w przełyku leży uchyłek Zenkera)."
          },
          {
            text: "Obie te jednostki leczy się natychmiastowym podaniem chemioterapii.",
            correct: false,
            feedback: "❌ BŁĄD! Niedorzeczne."
          }
        ]
      },
      {
        stepNum: 6,
        title: "Krok 6: Przygotowanie przedoperacyjne i profilaktyka antybiotykowa",
        desc: "USG potwierdziło obecność niepodatnego na ucisk wyrostka o średnicy 8.5 mm z koprolitem w podstawie i płynem w zachyłku krętniczo-kątniczym. Kwalifikujesz Bartka do pilnej operacji. Jakie procedury przygotowawcze i jaką profilaktykę antybiotykową wdrażasz zgodnie ze standardami chirurgii dziecięcej?",
        scenario: "USG potwierdziło obecność niepodatnego na ucisk wyrostka o średnicy 8.5 mm z koprolitem w podstawie i płynem w zachyłku krętniczo-kątniczym. Kwalifikujesz Bartka do pilnej operacji. Jakie procedury przygotowawcze i jaką profilaktykę antybiotykową wdrażasz zgodnie ze standardami chirurgii dziecięcej?",
        options: [
          {
            text: "Ścisła dieta zero (nic doustnie), nawadnianie dożylne zbilansowanym krystaloidem w celu wyrównania odwodnienia, dożylne leki przeciwbólowe (paracetamol i.v.) oraz podanie pojedynczej dawki profilaktyki antybiotykowej o szerokim spektrum przeciw tlenowcom i beztlenowcom jelitowym (np. ceftriakson/cefazolina + metronidazol i.v.) w ciągu 60 minut przed nacięciem skóry.",
            correct: true,
            feedback: "✅ PRAWIDŁOWO! Standard postępowania przedoperacyjnego w chirurgii dziecięcej: 1) Resuscytacja płynowa krystaloidami; 2) Dożylna analgezja (obalono archaiczny mit, że leki przeciwbólowe 'maskują objawy' – uśmierzenie cierpienia ułatwia badanie i znieczulenie); 3) Profilaktyka antybiotykowa podana 30-60 min przed zabiegiem (pokrycie Gram-ujemnych pałeczek jelitowych i Bacteroides fragilis) zmniejsza ryzyko zakażenia miejsca operowanego (ZMO) i ropni wewnątrzbrzusznych o ponad 50%!"
          },
          {
            text: "Podanie doustnego syropu przeczyszczającego z laktulozą, aby wypróżnić dziecko przed stołem.",
            correct: false,
            feedback: "❌ BŁĄD KRYTYCZNY! Podanie środków przeczyszczających w ostrym zapaleniu wyrostka robaczkowego gwałtownie nasila perystaltykę i prowadzi do natychmiastowej perforacji wyrostka!"
          },
          {
            text: "Odstąpienie od antybiotyku, ponieważ antybiotyk podaje się dopiero wtedy, gdy po 7 dniach pojawi się ropa w ranie.",
            correct: false,
            feedback: "❌ BŁĄD! Profilaktyka antybiotykowa jest bezwzględnym standardem w chirurgii wyrostka robaczkowego."
          },
          {
            text: "Ciepłe okłady z termoforu na prawy dół biodrowy.",
            correct: false,
            feedback: "❌ BŁĄD KRYTYCZNY! Ogrzewanie powłok brzusznych w ostrym zapaleniu wyrostka przyspiesza zgorzel, martwicę i pęknięcie narządu!"
          }
        ]
      },
      {
        stepNum: 7,
        title: "Krok 7: Wybór techniki operacyjnej – Appendektomia laparoskopowa vs klasyczna",
        desc: "Na bloku operacyjnym chirurg dziecięcy decyduje o dostępie operacyjnym. Jakie są zalety appendektomii laparoskopowej (LA - Laparoscopic Appendectomy) w porównaniu z klasyczną operacją otwartą (OA) u dzieci?",
        scenario: "Na bloku operacyjnym chirurg dziecięcy decyduje o dostępie operacyjnym. Jakie są zalety appendektomii laparoskopowej (LA - Laparoscopic Appendectomy) w porównaniu z klasyczną operacją otwartą (OA) u dzieci?",
        options: [
          {
            text: "Appendektomia laparoskopowa (LA) jest obecnie 'złotym standardem': wiąże się ze statystycznie istotnie mniejszym bólem pooperacyjnym, mniejszym odsetkiem zakażeń miejsca operowanego (ZMO), krótszym czasem hospitalizacji, lepszym efektem kosmetycznym oraz umożliwia pełną eksplorację całej jamy brzusznej (np. w celu oceny uchyłka Meckela czy przydatków u dziewczynek).",
            correct: true,
            feedback: "✅ PRAWIDŁOWO! Wytyczne EAES i polskie standardy chirurgii dziecięcej: laparoskopia jest metodą z wyboru w zapaleniu wyrostka robaczkowego u dzieci. Pozwala na dokładną inspekcję jamy otrzewnej, toaletę płynem jam ciała, skraca rekonwalescencję i drastycznie redukuje powikłania ranowe."
          },
          {
            text: "Operacja otwarta z cięcia pośrodkowego od mostka do spojenia łonowego jest zawsze metodą pierwszego rzutu u każdego 7-latka.",
            correct: false,
            feedback: "❌ BŁĄD! Szerokie cięcie pośrodkowe to ogromny uraz operacyjny, niepotrzebny w niepowikłanym zapaleniu wyrostka."
          },
          {
            text: "Laparoskopia jest bezwzględnie zakazana u osób poniżej 18. roku życia.",
            correct: false,
            feedback: "❌ BŁĄD! Laparoskopia jest podstawowym standardem chirurgii dziecięcej od okresu noworodkowego."
          },
          {
            text: "Zamiast wycięcia wyrostka wystarczy nakłucie brzucha igłą od strzykawki.",
            correct: false,
            feedback: "❌ BŁĄD! Niedorzeczne."
          }
        ]
      },
      {
        stepNum: 8,
        title: "Krok 8: Powikłania pooperacyjne – Ropień w zagłębieniu Douglasa i zrostowa niedrożność jelit",
        desc: "Zabieg przebiegł bez powikłań – usunięto zgorzelinowo zmieniony wyrostek robaczkowy bez perforacji. W 6. dobie po zabiegu Bartek zgłasza bolesne parcie na stolec (tenesmus), biegunkę z dużą ilością śluzu oraz gorączkę hektyczną do 39.0°C. Brzuch jest miękki. Jakie typowe powikłanie pooperacyjne podejrzewasz i jak je diagnozujesz?",
        scenario: "Zabieg przebiegł bez powikłań – usunięto zgorzelinowo zmieniony wyrostek robaczkowy bez perforacji. W 6. dobie po zabiegu Bartek zgłasza bolesne parcie na stolec (tenesmus), biegunkę z dużą ilością śluzu oraz gorączkę hektyczną do 39.0°C. Brzuch jest miękki. Jakie typowe powikłanie pooperacyjne podejrzewasz i jak je diagnozujesz?",
        options: [
          {
            text: "Ropień miednicy mniejszej / zagłębienia Douglasa (Abscessus cavi Douglasi); diagnozuje się go badaniem per rectum (wyczuwalne bolesne, chełboczące uwypuklenie przedniej ściany odbytnicy) oraz USG przezbrzusznym / przezodbytniczym; leczenie polega na drenażu (przezodbytniczym, przezskórnym lub laparoskopowym) i antybiotykoterapii.",
            correct: true,
            feedback: "✅ PRAWIDŁOWO! Klasyczne powikłanie po appendektomii w pytaniach LEK: ropa i płyn zapalny spływają grawitacyjnie do najniższego punktu jamy otrzewnej – zagłębienia odbytniczo-pęcherzowego (lub odbytniczo-macicznego Douglasa). Ropień podrażnia ścianę odbytnicy, wywołując bolesne parcie na stolec (tenesmus) i biegunki śluzowe przy jednoczesnej gorączce septycznej. Złotym standardem badania fizykalnego jest badanie palcem przez odbyt (per rectum)!"
          },
          {
            text: "Zwykłe ząbkowanie zębów mądrości u 7-letniego dziecka.",
            correct: false,
            feedback: "❌ BŁĄD! Zęby mądrości wyrzynają się u młodych dorosłych (17-25 r.ż.) i nie dają ropnia w jamie brzusznej."
          },
          {
            text: "Nawrót wyrostka robaczkowego, który odrósł w ciągu 6 dni.",
            correct: false,
            feedback: "❌ BŁĄD! Wyrostek robaczkowy po usunięciu nie odrasta (możliwe jest jedynie zapalenie kikuta wyrostka - stump appendicitis, ale dopiero po wielu miesiącach/latach)."
          },
          {
            text: "Celiakia o piorunującym początku po zabiegu.",
            correct: false,
            feedback: "❌ BŁĄD! Gorączka hektyczna 39°C i tenesmus w 6. dobie po operacji to ewidentny ropień wewnątrzbrzuszny."
          }
        ]
      }
    ];

    c.pathoNodes = [
      {
        badge: "OGNIWO 1 • Obturacja światła wyrostka robaczkowego",
        title: "Zamknięcie światła przez koprolit (fecalith) lub rozrost tkanki limfatycznej",
        short: "Przeszkoda mechaniczna blokuje odpływ śluzu ze ślepo zakończonego wyrostka.",
        detail: "Wyrostek robaczkowy jest ślepym uchyłkiem kątnicy o wąskim świetle (ok. 1-3 mm). Pierwotnym zdarzeniem inicjującym ostre zapalenie jest mechaniczne zamknięcie jego światła. U dzieci i młodzieży najczęstszą przyczyną (ok. 60% przypadków) jest odczynowy przerost tkanki limfatycznej kępek Peyera w ścianie wyrostka, indukowany wcześniejszą infekcją wirusową (adenowirusy, enterowirusy, odra) lub bakteryjną. U starszych dzieci i dorosłych dominują kamienie kałowe (fecalith / koprolit – zagęszczone masy kałowe wysycone solami wapnia), rzadziej pasożyty (Enterobius vermicularis – owsiki, Ascaris lumbricoides), ciała obce czy wady anatomiczne (zagięcie wyrostka).",
        target: "Światło wyrostka robaczkowego i kępki limfatyczne podśluzówki",
        desc: "Zamknięcie światła przez koprolit (fecalith) lub rozrost tkanki limfatycznej."
      },
      {
        badge: "OGNIWO 2 • Wzrost ciśnienia śródściennego i niedokrwienie (Ból trzewny)",
        title: "Zastój wydzieliny śluzowej, obrzęk ściany i ucisk naczyń żylnych",
        short: "Ciągłe wydzielanie śluzu podnosi ciśnienie do >50-60 mmHg, zamykając drenaż żylny.",
        detail: "Nabłonek śluzowy wyrostka nieprzerwanie produkuje płyn i śluz (ok. 1-2 ml/dobę). Przy zablokowanym ujściu dochodzi do gwałtownego wzrostu ciśnienia intraluminalnego do 50-80 mmHg. Ciśnienie to przewyższa ciśnienie żylne w naczyniach ściany wyrostka, co wywołuje zastój krwi, zakrzepicę drobnych żył i masywny obrzęk ściany. Dochodzi do niedotlenienia tkanek i rozciągnięcia włókien czuciowych współczulnych segmentu Th10, co klinicznie manifestuje się jako wczesny, tępy ból trzewny zlokalizowany w nadbrzuszu i okolicy pępka (wczesna faza nieżytowa – appendicitis catarrhalis).",
        target: "Mikrokrążenie żylne ściany wyrostka i trzewne włókna dośrodkowe Th10",
        desc: "Zastój wydzieliny śluzowej, obrzęk ściany i ucisk naczyń żylnych."
      },
      {
        badge: "OGNIWO 3 • Proliferacja bakteryjna i faza ropno-zgorzelinowa (Ból somatyczny)",
        title: "Inwazja flory beztlenowej, mikrozakrzepica tętnicza i zapalenie otrzewnej",
        short: "Bakterie jelitowe penetrują ścianę, powodując zgorzel, martwicę i podrażnienie otrzewnej ściennej.",
        detail: "Zastój treści sprzyja gwałtownemu namnażaniu flory jelitowej – tlenowców (Escherichia coli, Pseudomonas) oraz bezwzględnych beztlenowców (Bacteroides fragilis, Peptostreptococcus). Dochodzi do masywnej transmigracji neutrofilów do ściany (faza ropna – appendicitis phlegmonosa). Narastający obrzęk odcina przepływ w tętnicy wyrostkowej (arteria appendicularis – naczynie końcowe od tętnicy krętniczo-okrężniczej), prowadząc do zawału niedokrwiennego i zgorzeli ściany (appendicitis gangrenosa). Proces zapalny nacieka surowicówkę i otrzewną ścienną unerwianą przez somatyczne nerwy rdzeniowe – ból przemieszcza się do prawego dołu biodrowego (objaw Kochera), pojawia się obrona mięśniowa i objaw Blumberga.",
        target: "Tętnica wyrostkowa (arteria appendicularis), neutrofile i otrzewna ścienna prawego dołu biodrowego",
        desc: "Inwazja flory beztlenowej, mikrozakrzepica tętnicza i zapalenie otrzewnej."
      },
      {
        badge: "OGNIWO 4 • Perforacja i powikłania wewnątrzbrzuszne",
        title: "Przedziurawienie ściany: rozlane zapalenie otrzewnej vs naciek i ropień okołowyrostkowy",
        short: "Martwica doprowadza do perforacji w ciągu 24-48h; u małych dzieci sieć większa nie jest w stanie ograniczyć procesu.",
        detail: "Nieleczona zgorzel w ciągu 24-48 godzin kończy się perforacją ściany (najczęściej na przeciwległym do krezki brzegu wyrostka). Dalszy przebieg zależy od wieku: u starszych dzieci i dorosłych dobrze rozwinięta sieć większa (omentum majus) i pętle jelita cienkiego otaczają wyrostek, tworząc naciek okołowyrostkowy (plastron), który może ulec zropnieniu (ropień okołowyrostkowy). U małych dzieci (<5 r.ż.) sieć większa jest krótka i cienka, a torebka wyrostka cienka – perforacja prowadzi natychmiast do rozlanego kałowego zapalenia otrzewnej, sepsy i wstrząsu septycznego. Rzadkim, śmiertelnym powikłaniem jest wstępujące ropne zapalenie żyły wrotnej (pylephlebitis) z ropniami wątroby.",
        target: "Sieć większa (omentum majus), drenaż żyły krezkowej górnej i żyła wrotna",
        desc: "Przedziurawienie ściany: rozlane zapalenie otrzewnej vs naciek i ropień okołowyrostkowy."
      }
    ];

    c.diffTable = {
      title: "⚔️ Diagnostyka różnicowa ostrego bólu w prawym dole biodrowym u dzieci",
      headers: [
        "Cecha kliniczna / jednostka",
        "Ostre zapalenie wyrostka",
        "Zapalenie węzłów krezkowych",
        "Zapalenie uchyłka Meckela",
        "Wgłobienie jelita (Invaginatio)"
      ],
      rows: [
        [
          "Wiek szczytowy",
          "6.–15. rok życia (rzadko <3 r.ż.)",
          "3.–10. rok życia",
          "Typowo <2.–4. rok życia",
          "5.–9. miesiąc życia"
        ],
        [
          "Charakter bólu i dynamika",
          "Wędrujący (Kocher: pępek -> prawy dół biodrowy), stały, narastający",
          "Rozlany, kurczowy, zmienny w czasie, bez ścisłej lokalizacji",
          "Ostry, identyczny z zapaleniem wyrostka lub bezbólowy krwotok",
          "Napadowy, gwałtowny, z przerwami bezbólowymi (apatia)"
        ],
        [
          "Infekcja poprzedzająca",
          "Rzadko uchwytna",
          "Bardzo często (faryngitis, zapalenie ucha, adenowirus)",
          "Brak",
          "Często nieżyt żołądkowo-jelitowy"
        ],
        [
          "Objawy otrzewnowe",
          "Wyraźne (Blumberg, obrona mięśniowa, Jaworski, Rovsing)",
          "Brak lub bardzo słabo wyrażone, powłoki miękkie",
          "Obecne przy zapaleniu/perforacji uchyłka",
          "Późne (dopiero przy martwicy zaciśniętej pętli)"
        ],
        [
          "Obraz w badaniu USG",
          "Średnica wyrostka >6 mm, niepodatny na ucisk, kamień kałowy",
          "Wyrostek prawidłowy (<6 mm), pakiety węzłów krezkowych >8-10 mm",
          "Ślepa pętla jelitowa odchodząca od jelita krętego (bez cech wyrostka)",
          "Objaw tarczy strzelniczej / donuta / tarczy w przekroju poprzecznym"
        ],
        [
          "Morfologia i wskaźniki",
          "Leukocytoza neutrofilowa z przesunięciem w lewo, wysokie CRP",
          "Prawidłowe lub nieznaczna leukocytoza, CRP niskie/umiarkowane",
          "Anemia (przy krwawieniu) lub leukocytoza",
          "W normie, narasta w trakcie niedokrwienia jelita"
        ],
        [
          "Leczenie z wyboru",
          "Pilna appendektomia (preferowana laparoskopia)",
          "Leczenie zachowawcze (leki rozkurczowe, nawodnienie, obserwacja)",
          "Resekcja uchyłka z klinem jelita krętego",
          "Dekompresja hydrostatyczna/pneumatyczna wlewką pod kontrolą USG/RTG"
        ]
      ]
    };

    c.dutySummary = {
      overview: "Ostre zapalenie wyrostka robaczkowego (appendicitis acuta) jest najczęstszą przyczyną ostrego brzucha wymagającą pilnej operacji chirurgicznej w populacji pediatrycznej. U małych dzieci przebieg jest podstępny z powodu nietypowego obrazu klinicznego i szybkiego rozwoju perforacji (krótka sieć większa). Złotym standardem leczenia jest laparoskopowa appendektomia poprzedzona profilaktyką antybiotykową.",
      diagnostics: "1) Skale kliniczne: Pediatric Appendicitis Score (PAS) i skala Alvarado – ocena prawdopodobieństwa klinicznego (wynik >=8 wskazuje na wysokie ryzyko).<br>2) Badania laboratoryjne: morfologia krwi (leukocytoza z neutrofilią >75%), CRP, badanie ogólne moczu (wykluczenie ZUM; pojedyncze krwinki mogą wynikać z podrażnienia moczowodu przez zapalny wyrostek!).<br>3) Złoty standard obrazowy u dzieci: USG jamy brzusznej głowicą liniową (średnica >6 mm, brak kompresji, koprolit).<br>4) TK jamy brzusznej z kontrastem rezerwuje się dla przypadków niejednoznacznych lub podejrzenia powikłań ropnych głębokich.",
      drugsAndDoses: "• <span class='dose-pill'>Profilaktyka antybiotykowa i.v.</span> (pojedyncza dawka 30–60 min przed zabiegiem): Cefazolina <span class='dose-pill'>30–50 mg/kg m.c. i.v.</span> + Metronidazol <span class='dose-pill'>15 mg/kg m.c. i.v.</span> LUB Ceftriakson <span class='dose-pill'>50 mg/kg m.c. i.v.</span> + Metronidazol.<br>• W zapaleniu zgorzelinowym z perforacją antybiotykoterapię kontynuuje się przez <span class='dose-pill'>3–5 dni i.v.</span> do ustąpienia gorączki i normalizacji leukocytozy.<br>• <span class='dose-pill'>Analgezja</span>: Paracetamol <span class='dose-pill'>15 mg/kg m.c. i.v.</span> co 6 h + Ibuprofen p.o./p.r. po operacji; w ostrym bólu Nalbufina <span class='dose-pill'>0.1–0.2 mg/kg i.v.</span><br>• <span class='dose-pill'>Płynoterapia</span>: Zbilansowane krystaloidy (np. Plasmalyte) w dawce zapotrzebowania dobowego + wyrównanie odwodnienia.",
      procedures: "Appendektomia laparoskopowa (LA) przez 3 trokary (pępek 10 mm, lewy dół biodrowy 5 mm, nadłonowo 5 mm); w razie nacieku okołowyrostkowego (plastronu) bez cech perforacji dopuszcza się leczenie zachowawcze antybiotykami i planową appendektomię odroczoną po 6–12 tygodniach (interval appendectomy).",
      monitoring: "Nadzór nad parametrami życiowymi (temperatura, tętno, ciśnienie), kontrola perystaltyki i odejścia gazów; wczesne pojenie w 1. dobie po zabiegu laparoskopowym; czujność w 5.–7. dobie w kierunku ropnia miednicy mniejszej (parcie na stolec, gorączka septyczna) lub zakażenia rany operacyjnej."
    };

    c.lekQuestions = [
      {
        tag: "🧭 OBRAZ KLINICZNY / OBJAW KOCHERA",
        q: "7-letni chłopiec zgłasza ból brzucha, który początkowo miał charakter rozlany w okolicy pępka, a po kilkunastu godzinach przemieścił się i ustalił w prawym dole biodrowym. Zjawisko to nosi nazwę:",
        opts: [
          "A) Objawu Kochera",
          "B) Objawu Rovsinga",
          "C) Objawu Blumberga",
          "D) Objawu Courvoisiera",
          "E) Objawu Chełmońskiego"
        ],
        options: [
          "A) Objawu Kochera",
          "B) Objawu Rovsinga",
          "C) Objawu Blumberga",
          "D) Objawu Courvoisiera",
          "E) Objawu Chełmońskiego"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowa odpowiedź to A. Objaw Kochera polega na przemieszczeniu się bólu z nadbrzusza lub okolicy okołopępkowej (ból trzewny) do prawego dołu biodrowego (ból somatyczny otrzewnowy) w przebiegu ostrego zapalenia wyrostka robaczkowego. Objaw Rovsinga to ból w prawym dole biodrowym przy ucisku lewego dołu biodrowego. Objaw Blumberga to ból przy gwałtownym zwolnieniu ucisku powłok.",
        expl: "Prawidłowa odpowiedź to A. Objaw Kochera polega na przemieszczeniu się bólu z nadbrzusza lub okolicy okołopępkowej (ból trzewny) do prawego dołu biodrowego (ból somatyczny otrzewnowy) w przebiegu ostrego zapalenia wyrostka robaczkowego. Objaw Rovsinga to ból w prawym dole biodrowym przy ucisku lewego dołu biodrowego. Objaw Blumberga to ból przy gwałtownym zwolnieniu ucisku powłok."
      },
      {
        tag: "📊 SKALE KLINICZNE / ALVARADO I PAS",
        q: "Który z poniższych parametrów klinicznych i laboratoryjnych otrzymuje 2 PUNKTY (podczas gdy pozostałe otrzymują 1 punkt) w klasycznej skali Alvarado stosowanej w diagnostyce ostrego zapalenia wyrostka robaczkowego?",
        opts: [
          "A) Bolesność uciskowa w prawym dole biodrowym oraz leukocytoza >10 G/L",
          "B) Wędrówka bólu oraz nudności/wymioty",
          "C) Wzrost temperatury ciała >37.3°C oraz brak apetytu",
          "D) Objaw Blumberga oraz przesunięcie obrazu krwinek białych w lewo",
          "E) Przyspieszenie tętna >100/min oraz obecność krwiomoczu"
        ],
        options: [
          "A) Bolesność uciskowa w prawym dole biodrowym oraz leukocytoza >10 G/L",
          "B) Wędrówka bólu oraz nudności/wymioty",
          "C) Wzrost temperatury ciała >37.3°C oraz brak apetytu",
          "D) Objaw Blumberga oraz przesunięcie obrazu krwinek białych w lewo",
          "E) Przyspieszenie tętna >100/min oraz obecność krwiomoczu"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowa odpowiedź to A. Mnemotechnika skali Alvarado (MANTRELS, max 10 pkt): Migration of pain (1), Anorexia (1), Nausea/vomiting (1), Tenderness in RLQ (2 PUNKTY!), Rebound pain (1), Elevated temperature (1), Leukocytosis (2 PUNKTY!), Shift of WBC to the left (1). Dokładnie dwa parametry są punktowane podwójnie: bolesność w prawym dole biodrowym i leukocytoza.",
        expl: "Prawidłowa odpowiedź to A. Mnemotechnika skali Alvarado (MANTRELS, max 10 pkt): Migration of pain (1), Anorexia (1), Nausea/vomiting (1), Tenderness in RLQ (2 PUNKTY!), Rebound pain (1), Elevated temperature (1), Leukocytosis (2 PUNKTY!), Shift of WBC to the left (1). Dokładnie dwa parametry są punktowane podwójnie: bolesność w prawym dole biodrowym i leukocytoza."
      },
      {
        tag: "🔬 ULTRASONOGRAFIA / KRYTERIA USG",
        q: "Wskaż kryterium ultrasonograficzne (USG), które stanowi kluczowy parametr potwierdzający ostre zapalenie wyrostka robaczkowego u dziecka w badaniu głowicą o wysokiej częstotliwości:",
        opts: [
          "A) Średnica zewnętrzna wyrostka w wymiarze poprzecznym >6 mm oraz brak podatności na ucisk głowicą",
          "B) Średnica wyrostka <3 mm z obecnością gazu w jego świetle",
          "C) Zachowana pełna ściśliwość światła wyrostka pod delikatnym uciskiem głowicy",
          "D) Ścieńczenie ściany wyrostka poniżej 0.5 mm",
          "E) Obecność tętna w żyle krezkowej dolnej"
        ],
        options: [
          "A) Średnica zewnętrzna wyrostka w wymiarze poprzecznym >6 mm oraz brak podatności na ucisk głowicą",
          "B) Średnica wyrostka <3 mm z obecnością gazu w jego świetle",
          "C) Zachowana pełna ściśliwość światła wyrostka pod delikatnym uciskiem głowicy",
          "D) Ścieńczenie ściany wyrostka poniżej 0.5 mm",
          "E) Obecność tętna w żyle krezkowej dolnej"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowa odpowiedź to A. Główne kryteria USG ostrego zapalenia wyrostka: 1) Średnica zewnętrzna (od ściany do ściany) przekraczająca 6 mm (norma <=6 mm); 2) Brak ściśliwości (incompressibility) pod uciskiem głowicy; 3) Pogrubienie ściany >2 mm; 4) Obecność koprolitu (fecalith) dającego cień akustyczny; 5) Wzmożony przepływ naczyniowy w ścianie w color-Dopplerze.",
        expl: "Prawidłowa odpowiedź to A. Główne kryteria USG ostrego zapalenia wyrostka: 1) Średnica zewnętrzna (od ściany do ściany) przekraczająca 6 mm (norma <=6 mm); 2) Brak ściśliwości (incompressibility) pod uciskiem głowicy; 3) Pogrubienie ściany >2 mm; 4) Obecność koprolitu (fecalith) dającego cień akustyczny; 5) Wzmożony przepływ naczyniowy w ścianie w color-Dopplerze."
      },
      {
        tag: "❌ WSKAŻ FAŁSZYWE / ZAPALENIE WYROSTKA U DZIECI",
        q: "Wskaż zdanie FAŁSZYWE dotyczące ostrego zapalenia wyrostka robaczkowego u dzieci:",
        opts: [
          "A) U małych dzieci (<3. roku życia) ryzyko perforacji wyrostka jest znacznie niższe niż u nastolatków z powodu grubej i dobrze rozwiniętej sieci większej",
          "B) Położenie wyrostka zakątniczo (retrocaecal) może dawać ujemny objaw Blumberga przy dodatnim objawie Jaworskiego (psoas sign)",
          "C) Obecność niewielkiej leukocyturii w badaniu ogólnym moczu nie wyklucza zapalenia wyrostka robaczkowego",
          "D) Przy podejrzeniu ostrego zapalenia wyrostka robaczkowego surowo przeciwwskazane jest stosowanie leków przeczyszczających oraz ogrzewanie powłok brzusznych",
          "E) Laparoskopowa appendektomia wiąże się z mniejszym odsetkiem zakażeń rany operacyjnej w porównaniu z klasyczną laparotomią"
        ],
        options: [
          "A) U małych dzieci (<3. roku życia) ryzyko perforacji wyrostka jest znacznie niższe niż u nastolatków z powodu grubej i dobrze rozwiniętej sieci większej",
          "B) Położenie wyrostka zakątniczo (retrocaecal) może dawać ujemny objaw Blumberga przy dodatnim objawie Jaworskiego (psoas sign)",
          "C) Obecność niewielkiej leukocyturii w badaniu ogólnym moczu nie wyklucza zapalenia wyrostka robaczkowego",
          "D) Przy podejrzeniu ostrego zapalenia wyrostka robaczkowego surowo przeciwwskazane jest stosowanie leków przeczyszczających oraz ogrzewanie powłok brzusznych",
          "E) Laparoskopowa appendektomia wiąże się z mniejszym odsetkiem zakażeń rany operacyjnej w porównaniu z klasyczną laparotomią"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowa odpowiedź to A (zdanie fałszywe). U małych dzieci (<3 r.ż.) ryzyko perforacji wyrostka jest BARDZO WYSOKIE (sięga 50-80%!), ponieważ sieć większa u niemowląt i małych dzieci jest KRÓTKA, CIENKA i NIEROZWINIĘTA, przez co nie jest w stanie otoczyć i odgraniczyć ogniska zapalnego, prowadząc szybko do rozlanego zapalenia otrzewnej.",
        expl: "Prawidłowa odpowiedź to A (zdanie fałszywe). U małych dzieci (<3 r.ż.) ryzyko perforacji wyrostka jest BARDZO WYSOKIE (sięga 50-80%!), ponieważ sieć większa u niemowląt i małych dzieci jest KRÓTKA, CIENKA i NIEROZWINIĘTA, przez co nie jest w stanie otoczyć i odgraniczyć ogniska zapalnego, prowadząc szybko do rozlanego zapalenia otrzewnej."
      },
      {
        tag: "🦆 UCHYŁEK MECKELA / REGUŁA DWÓJEK",
        q: "Zapalenie uchyłka Meckela może doskonale imitować ostre zapalenie wyrostka robaczkowego. Które ze stwierdzeń dotyczących uchyłka Meckela NIE JEST zgodne z klasyczną 'regułą dwójek' (rule of twos)?",
        opts: [
          "A) Występuje typowo u 20% populacji ogólnej",
          "B) Występuje u około 2% populacji ogólnej",
          "C) Znajduje się w odległości około 2 stóp (ok. 60 cm) proksymalnie od zastawki krętniczo-kątniczej",
          "D) Ma średnią długość około 2 cali (ok. 5 cm)",
          "E) Może zawierać 2 rodzaje ektopowej tkanki (najczęściej śluzówkę żołądka lub tkankę trzustki)"
        ],
        options: [
          "A) Występuje typowo u 20% populacji ogólnej",
          "B) Występuje u około 2% populacji ogólnej",
          "C) Znajduje się w odległości około 2 stóp (ok. 60 cm) proksymalnie od zastawki krętniczo-kątniczej",
          "D) Ma średnią długość około 2 cali (ok. 5 cm)",
          "E) Może zawierać 2 rodzaje ektopowej tkanki (najczęściej śluzówkę żołądka lub tkankę trzustki)"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowa odpowiedź to A. 'Reguła dwójek' uchyłka Meckela: 2% populacji (a NIE 20%!), 2 stopy (ok. 60 cm) od zastawki Bauchina, 2 cale (ok. 5 cm) długości, 2 rodzaje ektopowej tkanki (błona śluzowa żołądka produkująca kwas solny i wywołująca owrzodzenia/krwawienia oraz tkanka trzustki), najczęściej daje objawy przed 2. rokiem życia, 2 razy częściej objawowy u chłopców.",
        expl: "Prawidłowa odpowiedź to A. 'Reguła dwójek' uchyłka Meckela: 2% populacji (a NIE 20%!), 2 stopy (ok. 60 cm) od zastawki Bauchina, 2 cale (ok. 5 cm) długości, 2 rodzaje ektopowej tkanki (błona śluzowa żołądka produkująca kwas solny i wywołująca owrzodzenia/krwawienia oraz tkanka trzustki), najczęściej daje objawy przed 2. rokiem życia, 2 razy częściej objawowy u chłopców."
      },
      {
        tag: "💊 FARMAKOTERAPIA / ANTYBIOTYKOTERAPIA OKOŁOOPERACYJNA",
        q: "Jakie spektrum przeciwbakteryjne musi bezwzględnie pokrywać profilaktyka antybiotykowa podawana przed zabiegiem appendektomii w ostrym zapaleniu wyrostka robaczkowego?",
        opts: [
          "A) Tlenowe pałeczki Gram-ujemne (głównie Escherichia coli) oraz beztlenowce jelitowe (głównie Bacteroides fragilis)",
          "B) Wyłącznie bakterie Gram-dodatnie z rodzaju Staphylococcus aureus",
          "C) Grzyby z rodzaju Candida oraz wirusy CMV",
          "D) Prątki gruźlicy (Mycobacterium tuberculosis)",
          "E) Wyłącznie bakterie atypowe (Mycoplasma pneumoniae)"
        ],
        options: [
          "A) Tlenowe pałeczki Gram-ujemne (głównie Escherichia coli) oraz beztlenowce jelitowe (głównie Bacteroides fragilis)",
          "B) Wyłącznie bakterie Gram-dodatnie z rodzaju Staphylococcus aureus",
          "C) Grzyby z rodzaju Candida oraz wirusy CMV",
          "D) Prątki gruźlicy (Mycobacterium tuberculosis)",
          "E) Wyłącznie bakterie atypowe (Mycoplasma pneumoniae)"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowa odpowiedź to A. Flora bakteryjna wyrostka robaczkowego to mieszana flora jelitowa: pałeczki Gram-ujemne (E. coli, Klebsiella) oraz beztlenowce (Bacteroides fragilis). Profilaktyka musi obejmować oba te komponenty – stąd standardem jest połączenie cefalosporyny (np. cefazolina, ceftriakson) z metronidazolem podane dożylnie 30-60 min przed nacięciem skóry.",
        expl: "Prawidłowa odpowiedź to A. Flora bakteryjna wyrostka robaczkowego to mieszana flora jelitowa: pałeczki Gram-ujemne (E. coli, Klebsiella) oraz beztlenowce (Bacteroides fragilis). Profilaktyka musi obejmować oba te komponenty – stąd standardem jest połączenie cefalosporyny (np. cefazolina, ceftriakson) z metronidazolem podane dożylnie 30-60 min przed nacięciem skóry."
      },
      {
        tag: "⚠️ POWIKŁANIA / ROPNIE WEWNĄTRZBRZUSZNE",
        q: "W 6. dobie po appendektomii z powodu zgorzelinowego zapalenia wyrostka u 8-letniego dziecka wystąpiła gorączka septyczna do 39.2°C, dreszcze oraz bolesne parcie na stolec (tenesmus) z oddawaniem częstych, małych porcji stolca ze śluzem. Badaniem fizykalnym o kluczowym znaczeniu dla wykrycia tego powikłania jest:",
        opts: [
          "A) Badanie palcem przez odbyt (per rectum)",
          "B) Wziernikowanie nosa przedniego",
          "C) Badanie dna oka oftalmoskopem",
          "D) Próba Romberga",
          "E) Pomiar ciśnienia w tętnicy środkowej siatkówki"
        ],
        options: [
          "A) Badanie palcem przez odbyt (per rectum)",
          "B) Wziernikowanie nosa przedniego",
          "C) Badanie dna oka oftalmoskopem",
          "D) Próba Romberga",
          "E) Pomiar ciśnienia w tętnicy środkowej siatkówki"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowa odpowiedź to A. Objawy te są patognomoniczne dla ropnia zagłębienia Douglasa (ropnia miednicy mniejszej). Zbiornik ropy uciska i drażni przednią ścianę odbytnicy, dając parcie na stolec i śluzotok. Badanie per rectum ujawnia bolesne, chełboczące uwypuklenie przedniej ściany bańki odbytnicy i pozwala zaplanować nakłucie lub drenaż przezodbytniczy.",
        expl: "Prawidłowa odpowiedź to A. Objawy te są patognomoniczne dla ropnia zagłębienia Douglasa (ropnia miednicy mniejszej). Zbiornik ropy uciska i drażni przednią ścianę odbytnicy, dając parcie na stolec i śluzotok. Badanie per rectum ujawnia bolesne, chełboczące uwypuklenie przedniej ściany bańki odbytnicy i pozwala zaplanować nakłucie lub drenaż przezodbytniczy."
      },
      {
        tag: "🦴 BADANIE FIZYKALNE / OBJAW ZASŁONOWY I PSOAS",
        q: "Dodatni objaw zasłonowy (obturator sign) w badaniu ostrego brzucha polega na wywołaniu bólu w miednicy mniejszej podczas:",
        opts: [
          "A) Biernego zgięcia i rotacji wewnętrznej w prawym stawie biodrowym (świadczy o ucisku na mięsień zasłaniacz wewnętrzny przez zapalny wyrostek w położeniu miednicznym)",
          "B) Wyprostowania prawej kończyny dolnej w stawie biodrowym w pozycji leżącej na lewym boku",
          "C) Nagłego zwolnienia dłoni uciskającej lewy dół biodrowy",
          "D) Uderzenia młotkiem w rzepkę prawą",
          "E) Skakania na obydwu piętach jednocześnie"
        ],
        options: [
          "A) Biernego zgięcia i rotacji wewnętrznej w prawym stawie biodrowym (świadczy o ucisku na mięsień zasłaniacz wewnętrzny przez zapalny wyrostek w położeniu miednicznym)",
          "B) Wyprostowania prawej kończyny dolnej w stawie biodrowym w pozycji leżącej na lewym boku",
          "C) Nagłego zwolnienia dłoni uciskającej lewy dół biodrowy",
          "D) Uderzenia młotkiem w rzepkę prawą",
          "E) Skakania na obydwu piętach jednocześnie"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowa odpowiedź to A. Objaw zasłonowy (obturator sign): zgięcie prawej kończyny w biodrze i kolanie do 90 stopni i wykonanie biernej rotacji wewnętrznej w stawie biodrowym napina mięsień zasłaniacz wewnętrzny. Ból w podbrzuszu świadczy o kontakcie zapalnego wyrostka o położeniu miednicznym z powięzią mięśnia. Wyprostowanie nogi w stawie biodrowym to objaw mięśnia biodrowo-lędźwiowego (psoas sign / objaw Jaworskiego).",
        expl: "Prawidłowa odpowiedź to A. Objaw zasłonowy (obturator sign): zgięcie prawej kończyny w biodrze i kolanie do 90 stopni i wykonanie biernej rotacji wewnętrznej w stawie biodrowym napina mięsień zasłaniacz wewnętrzny. Ból w podbrzuszu świadczy o kontakcie zapalnego wyrostka o położeniu miednicznym z powięzią mięśnia. Wyprostowanie nogi w stawie biodrowym to objaw mięśnia biodrowo-lędźwiowego (psoas sign / objaw Jaworskiego)."
      },
      {
        tag: "🧊 POWIKŁANIA ZAKRZEPOWE / ZAPALENIE ŻYŁY WROTNEJ",
        q: "Rzadkim, ale skrajnie niebezpiecznym powikłaniem nieleczonego zgorzelinowego zapalenia wyrostka robaczkowego jest pylephlebitis. Stan ten polega na:",
        opts: [
          "A) Bakteryjnym, septycznym zakrzepowym zapaleniu żyły wrotnej i jej dopływów krezkowych, prowadzącym do mnogich ropni wątroby i wstrząsu septycznego",
          "B) Zakrzepicy żył głębokich podudzia wywołanej uciskiem wyrostka",
          "C) Zatorowości płucnej komórkami nabłonka jelitowego",
          "D) Przetrwałym nadciśnieniu płucnym noworodka",
          "E) Tętniaku aorty wstępującej"
        ],
        options: [
          "A) Bakteryjnym, septycznym zakrzepowym zapaleniu żyły wrotnej i jej dopływów krezkowych, prowadzącym do mnogich ropni wątroby i wstrząsu septycznego",
          "B) Zakrzepicy żył głębokich podudzia wywołanej uciskiem wyrostka",
          "C) Zatorowości płucnej komórkami nabłonka jelitowego",
          "D) Przetrwałym nadciśnieniu płucnym noworodka",
          "E) Tętniaku aorty wstępującej"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowa odpowiedź to A. Pylephlebitis (ropne zapalenie żyły wrotnej): zakażone zakrzepy z żyły wyrostkowej przechodzą do żyły krezkowej górnej, a stamtąd do żyły wrotnej. Objawia się wysoką gorączką hektyczną, dreszczami, żółtaczką i powiększeniem wątroby z rozwojem mnogich bakteryjnych ropni wątroby. Śmiertelność wynosi 30-50%.",
        expl: "Prawidłowa odpowiedź to A. Pylephlebitis (ropne zapalenie żyły wrotnej): zakażone zakrzepy z żyły wyrostkowej przechodzą do żyły krezkowej górnej, a stamtąd do żyły wrotnej. Objawia się wysoką gorączką hektyczną, dreszczami, żółtaczką i powiększeniem wątroby z rozwojem mnogich bakteryjnych ropni wątroby. Śmiertelność wynosi 30-50%."
      },
      {
        tag: "🛡️ LECZENIE ZACHOWAWCZE / NACIEK OKOŁOWYROSTKOWY",
        q: "U 10-letniego dziecka z 5-dniowym wywiadem bólu brzucha stwierdza się obecność wyczuwalnego, ograniczonego, bolesnego oporu w prawym dole biodrowym. W USG: obecność tzw. nacieku okołowyrostkowego (plastronu) bez cech płynnego ropnia ani rozlanego zapalenia otrzewnej. Jakie jest postępowanie z wyboru w takim przypadku?",
        opts: [
          "A) Wstępne leczenie zachowawcze (hospitalizacja, antybiotykoterapia dożylna, ścisła dieta, obserwacja) i zaplanowanie odroczonej appendektomii (tzw. interval appendectomy) po 6–12 tygodniach",
          "B) Natychmiastowa rozległa hemikolektomia prawostronna w trybie ostrym",
          "C) Wykonanie wlewki barytowej pod wysokim ciśnieniem",
          "D) Natychmiastowy wypis do domu z zaleceniem okładów rozgrzewających",
          "E) Podanie samej chemioterapii przeciwnowotworowej"
        ],
        options: [
          "A) Wstępne leczenie zachowawcze (hospitalizacja, antybiotykoterapia dożylna, ścisła dieta, obserwacja) i zaplanowanie odroczonej appendektomii (tzw. interval appendectomy) po 6–12 tygodniach",
          "B) Natychmiastowa rozległa hemikolektomia prawostronna w trybie ostrym",
          "C) Wykonanie wlewki barytowej pod wysokim ciśnieniem",
          "D) Natychmiastowy wypis do domu z zaleceniem okładów rozgrzewających",
          "E) Podanie samej chemioterapii przeciwnowotworowej"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowa odpowiedź to A. Naciek okołowyrostkowy (plastron) to wyrostek otoczony zrośniętą siecią większą i pętlami jelita. Próba forsownej operacji w ostrej fazie nacieku wiąże się z ogromnym ryzykiem uszkodzenia kruchych pętli jelitowych i konieczności niepotrzebnej resekcji kątnicy/jelita. Standardem jest 'ochłodzenie' procesu antybiotykami i planowa operacja odroczona (interval appendectomy) po 6-12 tygodniach.",
        expl: "Prawidłowa odpowiedź to A. Naciek okołowyrostkowy (plastron) to wyrostek otoczony zrośniętą siecią większą i pętlami jelita. Próba forsownej operacji w ostrej fazie nacieku wiąże się z ogromnym ryzykiem uszkodzenia kruchych pętli jelitowych i konieczności niepotrzebnej resekcji kątnicy/jelita. Standardem jest 'ochłodzenie' procesu antybiotykami i planowa operacja odroczona (interval appendectomy) po 6-12 tygodniach."
      },
      {
        tag: "📋 DIAGNOSTYKA RÓŻNICOWA / ZAPALENIE PŁUC",
        q: "Dlaczego u każdego dziecka z podejrzeniem ostrego zapalenia wyrostka robaczkowego obligatoryjnym elementem badania przedmiotowego jest dokładne osłuchanie dolnych pól płucnych?",
        opts: [
          "A) Prawostronne zapalenie dolnego płata płuca (ze współistniejącym zapaleniem opłucnej przeponowej) może wywoływać ból rzutowany do prawego dołu biodrowego z obroną mięśniową (tzw. objawy rzekomobrzuszne / pseudo-peritonitis)",
          "B) Zapalenie wyrostka jest chorobą wywoływaną przez prątki gruźlicy płuc",
          "C) Wyrostek robaczkowy łączy się anatomicznym kanałem z prawym oskrzeliem głównym",
          "D) W zapaleniu wyrostka zawsze dochodzi do odmy prężnej lewostronnej",
          "E) Osłuchiwanie płuc służy do oceny perystaltyki jelita grubego"
        ],
        options: [
          "A) Prawostronne zapalenie dolnego płata płuca (ze współistniejącym zapaleniem opłucnej przeponowej) może wywoływać ból rzutowany do prawego dołu biodrowego z obroną mięśniową (tzw. objawy rzekomobrzuszne / pseudo-peritonitis)",
          "B) Zapalenie wyrostka jest chorobą wywoływaną przez prątki gruźlicy płuc",
          "C) Wyrostek robaczkowy łączy się anatomicznym kanałem z prawym oskrzeliem głównym",
          "D) W zapaleniu wyrostka zawsze dochodzi do odmy prężnej lewostronnej",
          "E) Osłuchiwanie płuc służy do oceny perystaltyki jelita grubego"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowa odpowiedź to A. Klasyczna pułapka pediatryczna: zapalenie dolnego płata prawego płuca podrażnia nerwy międzyżebrowe (Th7-Th11) i nerw przeponowy. U małych dzieci ból bywa rzutowany do prawego dołu biodrowego, imitując ostry brzuch z gorączką i tachykardią. Każde podejrzenie wyrostka wymaga wykluczenia zapalenia płuc w badaniu stetoskopem!",
        expl: "Prawidłowa odpowiedź to A. Klasyczna pułapka pediatryczna: zapalenie dolnego płata prawego płuca podrażnia nerwy międzyżebrowe (Th7-Th11) i nerw przeponowy. U małych dzieci ból bywa rzutowany do prawego dołu biodrowego, imitując ostry brzuch z gorączką i tachykardią. Każde podejrzenie wyrostka wymaga wykluczenia zapalenia płuc w badaniu stetoskopem!"
      }
    ];

    c.flashcards = [
      {
        q: "Na czym polega objaw Kochera w ostrym zapaleniu wyrostka robaczkowego?",
        a: "Wędrówka bólu brzucha z okolicy okołopępkowej/nadbrzusza (ból trzewny) do prawego dołu biodrowego (ból somatyczny otrzewnowy)."
      },
      {
        q: "Jakie są główne kryteria ultrasonograficzne (USG) ostrego zapalenia wyrostka robaczkowego?",
        a: "Średnica zewnętrzna >6 mm, brak podatności na ucisk głowicą (incompressibility), pogrubienie ściany >2-3 mm, obecność kamienia kałowego (fecalith) dającego cień."
      },
      {
        q: "Na czym polega objaw Jaworskiego (psoas sign)?",
        a: "Ból w prawym dole biodrowym wywołany prostowaniem kończyny w biodrze przeciw oporowi (wskazuje na położenie wyrostka zakątniczo над m. biodrowo-lędźwiowym)."
      },
      {
        q: "Jakie spektrum bakterii musi pokrywać profilaktyka antybiotykowa przed appendektomią?",
        a: "Tlenowce Gram-ujemne (E. coli) oraz beztlenowce (Bacteroides fragilis) – np. cefazolina/ceftriakson + metronidazol."
      },
      {
        q: "Dlaczego u dzieci <3. r.ż. ryzyko perforacji wyrostka jest tak wysokie?",
        a: "Krótka, słabo rozwinięta sieć większa (brak możliwości odgraniczenia zapalenia) oraz cienka ściana wyrostka robaczkowego."
      },
      {
        q: "Jaki objaw w 5.-7. dobie po appendektomii sugeruje ropień zagłębienia Douglasa?",
        a: "Gorączka hektyczna z dreszczami oraz bolesne parcie na stolec (tenesmus) z biegunką śluzową (wyczuwalny w badaniu per rectum)."
      }
    ];
  });

  // ==========================================
  // CASE 104: Zakażenie układu moczowego / OZZN u niemowlęcia
  // ==========================================
  await reworkCase('104_zum_niemowle.json', (c) => {
    c.shortTitle = "Niemowlę 5 mies. – Gorączka bez uchwytnego źródła, drażliwość i wymioty (OZZN / ZUM)";
    c.diagnosisTitle = "Ostre odmiedniczkowe zapalenie nerek (Pyelonephritis acuta / OZZN) u niemowlęcia – pierwsze zakażenie układu moczowego (ZUM)";

    c.vitals = [
      { label: "Temp", val: "39.4°C", sub: "Wysoka gorączka bez ogniska", status: "bad" },
      { label: "HR", val: "152/min", sub: "Tachykardia kompensacyjna", status: "warn" },
      { label: "RR", val: "36/min", sub: "Przyspieszony", status: "warn" },
      { label: "BP", val: "88/54 mmHg", sub: "Prawidłowe dla wieku", status: "ok" },
      { label: "SpO2", val: "98%", sub: "Prawidłowa", status: "ok" }
    ];
    c.vitalsObj = { hr: 152, bp: "88/54", spo2: 98, rr: 36, temp: 39.4, gcs: 15 };

    c.story = "Do izby przyjęć szpitala pediatrycznego rodzice przywożą 5-miesięczną Martynkę. Dziewczynka od 24 godzin wysoko gorączkuje (do 39.5°C z krótkotrwałą odpowiedzią na paracetamol), stała się marudna, popłakuje przy próbach dotykania powłok brzusznych i zmianie pieluszki, odmawia ssania piersi, a dziś dwukrotnie zwymiotowała treść mleczną. Nie prezentuje kaszlu, kataru ani biegunki. W badaniu fizykalnym: dziecko podsypiające, reaktywne na bodźce, skóra blada, bez wykwitów plamiczych. Ciemiączko przednie na poziomie kości czaszki, miękkie, niepulsujące. Błony bębenkowe perłowoszare z prawidłowym refleksem, gardło blade, czyste. Osłuchowo nad płucami szmer pęcherzykowy prawidłowy, symetryczny. Brzuch miękki, nieco wzdęty, bez cech obrony mięśniowej, ale dziewczynka wykazuje wyraźną tkliwość i niepokój przy głębszej palpacji prawego boku i okolicy lędźwiowej. Nawrót kapilarny <2 sekundy. W pieluszce mocz o nieco bardziej intensywnym, ostrym zapachu, objętościowo skąpy.";

    c.labs = [
      {
        category: "Badanie ogólne moczu (z cewnikowania pęcherza)",
        items: [
          { name: "Barwa i przejrzystość", val: "Mętny, żółty", norm: "Słomkowy, przejrzysty", flag: "H" },
          { name: "Leukocyty w moczu", val: "Gęsto pokrywają pole widzenia (>50 w pw)", norm: "0–5 w pw", flag: "H" },
          { name: "Esteraza leukocytarna", val: "Silnie dodatnia (+++)", norm: "Ujemna", flag: "H" },
          { name: "Azotyny (Nitrite)", val: "Dodatnie (+)", norm: "Ujemne", flag: "H" },
          { name: "Białko w moczu", val: "0.45 g/L", norm: "< 0.1 g/L", flag: "H" },
          { name: "Erytrocyty", val: "5–10 w pw", norm: "0–3 w pw", flag: "H" }
        ]
      },
      {
        category: "Morfologia i markery ostrej fazy",
        items: [
          { name: "Leukocyty (WBC)", val: "18.6 G/L", norm: "6.0–14.0 G/L", flag: "H" },
          { name: "Neutrofile", val: "76% (14.1 G/L)", norm: "30–50%", flag: "H" },
          { name: "Białko C-reaktywne (CRP)", val: "84 mg/L", norm: "< 5.0 mg/L", flag: "H" },
          { name: "Prokalcytonina (PCT)", val: "1.95 ng/mL", norm: "< 0.5 ng/mL", flag: "H" },
          { name: "Kreatynina w surowicy", val: "0.28 mg/dL", norm: "0.20–0.40 mg/dL", flag: "N" }
        ]
      }
    ];

    c.steps = [
      {
        stepNum: 1,
        title: "Krok 1: Wstępna ocena niemowlęcia z gorączką bez uchwytnego źródła (FWS)",
        desc: "Jako lekarz izby przyjęć badasz 5-miesięczną Martynkę z gorączką 39.4°C bez uchwytnego ogniska infekcji w badaniu fizykalnym (gardło blade, uszy blade, płuca czyste, ciemiączko prawidłowe). Niemowlę ma wymioty i brak apetytu. Jakie jest Twoje natychmiastowe podejrzenie diagnostyczne i jakie ryzyko niesie ten stan kliniczny?",
        scenario: "Jako lekarz izby przyjęć badasz 5-miesięczną Martynkę z gorączką 39.4°C bez uchwytnego ogniska infekcji w badaniu fizykalnym (gardło blade, uszy blade, płuca czyste, ciemiączko prawidłowe). Niemowlę ma wymioty i brak apetytu. Jakie jest Twoje natychmiastowe podejrzenie diagnostyczne i jakie ryzyko niesie ten stan kliniczny?",
        options: [
          {
            text: "Gorączka bez uchwytnego źródła (Fever Without Source – FWS) u niemowlęcia <12. m.ż. stwarza wysokie ryzyko ciężkiego zakażenia bakteryjnego (SBI), którego najczęstszą przyczyną (u >10% gorączkujących dziewczynek) jest ostre zakażenie układu moczowego / odmiedniczkowe zapalenie nerek (OZZN), grożące urosepsą i trwałym bliznowaceniem miąższu nerek.",
            correct: true,
            feedback: "✅ PRAWIDŁOWO! Złota reguła pediatryczna AAP i PTNFD: Każde niemowlę poniżej 12. miesiąca życia z temperaturą >=39.0°C bez uchwytnego źródła w badaniu fizykalnym wymaga w pierwszej kolejności zbadania moczu w celu wykluczenia ZUM. U niemowląt objawy dyzuryczne nie występują, a zakażenie objawia się gorączką, wymiotami i apatią. Nierozpoznane OZZN prowadzi do ogniskowych blizn nerkowych, co w przyszłości skutkuje nadciśnieniem tętniczym i przewlekłą chorobą nerek!"
          },
          {
            text: "Gorączka wynika ze zwykłego ząbkowania, zaleć syrop z paracetamolem i powrót do domu.",
            correct: false,
            feedback: "❌ BŁĄD KRYTYCZNY! Ząbkowanie nigdy nie wywołuje gorączki >38.5°C ani wymiotów! Pomyłka gorączkowego ZUM z ząbkowaniem to jedna z najczęstszych przyczyn opóźnienia leczenia i urosepsy u niemowląt."
          },
          {
            text: "Uznanie objawów za trzydniówkę (rumień nagły) i oczekiwanie na wysypkę bez żadnych badań.",
            correct: false,
            feedback: "❌ BŁĄD! Gorączka trzydniowa jest diagnozą z wykluczenia; u gorączkującego niemowlęcia przed postawieniem diagnozy wirusowej bezwzględnie należy wykluczyć infekcję bakteryjną dróg moczowych."
          },
          {
            text: "Natychmiastowe podanie aspiryny doustnie i skierowanie na tomografię głowy.",
            correct: false,
            feedback: "❌ BŁĄD KRYTYCZNY! Aspiryna u niemowląt grozi śmiertelnym zespołem Reye'a, a badanie fizykalne nie wskazuje na patologię OUN."
          }
        ]
      },
      {
        stepNum: 2,
        title: "Krok 2: Prawidłowa technika pobrania moczu – złoty standard a zakaz woreczków",
        desc: "Pielęgniarka przygotowuje plastikowy woreczek przyklejany na krocze i pyta, czy nakleić go dziecku w celu pobrania moczu na badanie ogólne i posiew. Jakie jest stanowisko wytycznych AAP i PTNFD dotyczące woreczków przyklejanych?",
        scenario: "Pielęgniarka przygotowuje plastikowy woreczek przyklejany na krocze i pyta, czy nakleić go dziecku w celu pobrania moczu na badanie ogólne i posiew. Jakie jest stanowisko wytycznych AAP i PTNFD dotyczące woreczków przyklejanych?",
        options: [
          {
            text: "Woreczki przyklejane na krocze cechują się 70–85% odsetkiem wyników fałszywie dodatnich (kontaminacja florą skóry i odbytu) i są BEZWZGLĘDNIE ZAKAZANE do pobierania moczu na posiew; u niemowlęcia nietrzymającego moczu próbkę do posiewu należy pobrać przez jednorazowe cewnikowanie pęcherza moczowego LUB nakłucie nadłonowe (złoty standard).",
            correct: true,
            feedback: "✅ PRAWIDŁOWO! Żelazna reguła egzaminacyjna LEK: pobranie moczu do woreczka przyklejanego na krocze niemowlęcia niemal zawsze ulega zanieczyszczeniu florą kałową i skórną. Mocz z woreczka ma znaczenie jedynie wtedy, gdy wynik jest CAŁKOWICIE UJEMNY (pozwala wówczas wykluczyć ZUM). Jeśli wynik jest dodatni lub planujemy wdrożenie antybiotyku, mocz do badania ogólnego i posiewu MUSI zostać pobrany przez jednorazowe zacewnikowanie pęcherza moczowego cienkim cewnikiem (6F) lub nakłucie nadłonowe pod kontrolą USG!"
          },
          {
            text: "Zgoda na woreczek przyklejany, ponieważ cewnikowanie u dziewczynek jest zabiegiem nielegalnym.",
            correct: false,
            feedback: "❌ BŁĄD! Cewnikowanie w warunkach aseptycznych jest standardową procedurą diagnostyczną ratującą nerki dziecka."
          },
          {
            text: "Pobranie moczu z nocnika po wymyciu go płynem do naczyń.",
            correct: false,
            feedback: "❌ BŁĄD! Próbka z nocnika jest całkowicie skontaminowana i bezużyteczna."
          },
          {
            text: "Pobranie moczu jest zbędne, ponieważ u dzieci zakażenie nerek rozpoznaje się wyłącznie z krwi.",
            correct: false,
            feedback: "❌ BŁĄD! Rozpoznanie ZUM wymaga bezwzględnego wykazania obecności bakterii i leukocytów w moczu."
          }
        ]
      },
      {
        stepNum: 3,
        title: "Krok 3: Analiza badania ogólnego moczu i wskaźników ostrej fazy – OZZN vs zapalenie pęcherza",
        desc: "Pobrano mocz przez cewnikowanie. Wyniki: badanie ogólne – leukocyty zalegają gęsto całe pole widzenia (>50 w pw), esteraza leukocytarna (+++), azotyny dodatnie, białko 0.45 g/l. Krew: CRP 84 mg/l, prokalcytonina 1.95 ng/ml, leukocytoza 18.6 G/l z neutrofilią. Jak definiujesz tę postać zakażenia układu moczowego?",
        scenario: "Pobrano mocz przez cewnikowanie. Wyniki: badanie ogólne – leukocyty zalegają gęsto całe pole widzenia (>50 w pw), esteraza leukocytarna (+++), azotyny dodatnie, białko 0.45 g/l. Krew: CRP 84 mg/l, prokalcytonina 1.95 ng/ml, leukocytoza 18.6 G/l z neutrofilią. Jak definiujesz tę postać zakażenia układu moczowego?",
        options: [
          {
            text: "Ostre odmiedniczkowe zapalenie nerek (OZZN / Pyelonephritis acuta) – zakażenie górnego odcinka układu moczowego z zajęciem miąższu nerkowego, na co wskazują: wysoka gorączka >=38.5°C, wymioty, ropomocz oraz znacznie podwyższone stężenie CRP (>20–30 mg/l) i prokalcytoniny (>0.5 ng/ml).",
            correct: true,
            feedback: "✅ PRAWIDŁOWO! Różnicowanie górnego (OZZN) i dolnego (zapalenie pęcherza) ZUM u niemowląt: zajęcie miąższu nerek (OZZN) charakteryzuje się ogólnoustrojową reakcją zapalną (gorączka >=38.5°C, prokalcytonina >0.5 ng/ml, CRP >30 mg/l, leukocytoza). Zapalenie pęcherza przebiega bez gorączki lub ze stanem podgorączkowym i z prawidłowymi markerami stanu zapalnego we krwi."
          },
          {
            text: "Niepowikłane zapalenie pęcherza moczowego kwalifikujące się do leczenia furaginą w domu.",
            correct: false,
            feedback: "❌ BŁĄD KRYTYCZNY! Furazydyna (Furagina) nie osiąga stężenia terapeutycznego w miąższu nerek i jest BEZWZGLĘDNIE PRZECIWWSKAZANA w leczeniu OZZN!"
          },
          {
            text: "Bezobjawowy bakteriomocz (bacteriuria asymptomatica) niepodlegający leczeniu.",
            correct: false,
            feedback: "❌ BŁĄD! Dziecko ma 39.4°C gorączki, ropomocz i CRP 84 – to ciężkie, objawowe zakażenie bakteryjne."
          },
          {
            text: "Kłębuszkowe zapalenie nerek z krwiomoczem makroskopowym.",
            correct: false,
            feedback: "❌ BŁĄD! W badaniu dominuje ropomocz i azotyny od bakterii Gram-ujemnych, a nie wałeczki erytrocytarne."
          }
        ]
      },
      {
        stepNum: 4,
        title: "Krok 4: Wdrożenie empirycznej antybiotykoterapii parenteralnej",
        desc: "Zabezpieczono posiew moczu i posiew krwi. Z uwagi na wiek dziecka (5 miesięcy), wymioty, odwodnienie oraz wysokie wskaźniki zapalne (CRP 84, PCT 1.95), jakie leczenie przeciwbakteryjne ordynujesz zgodnie z wytycznymi PTNFD?",
        scenario: "Zabezpieczono posiew moczu i posiew krwi. Z uwagi na wiek dziecka (5 miesięcy), wymioty, odwodnienie oraz wysokie wskaźniki zapalne (CRP 84, PCT 1.95), jakie leczenie przeciwbakteryjne ordynujesz zgodnie z wytycznymi PTNFD?",
        options: [
          {
            text: "Hospitalizacja na oddziale pediatrycznym i natychmiastowa dożylna (parenteralna) antybiotykoterapia empiryczna cefalosporyną III generacji (ceftriakson 50–75 mg/kg m.c. 1x/dobę i.v. lub cefotaksym 100–150 mg/kg m.c./dobę w 3 dawkach) LUB ampicylina z aminoglikozydem (gentamycyna) wraz z nawadnianiem dożylnym.",
            correct: true,
            feedback: "✅ PRAWIDŁOWO! Wskazania do leczenia parenteralnego (dożylnego) ZUM u dzieci: 1) Wiek <3-6 miesięcy; 2) Odwodnienie i wymioty uniemożliwiające leczenie doustne; 3) Toksyczny stan ogólny / podejrzenie urosepsy; 4) Wątpliwości co do compliance rodziców. Cefalosporyny III generacji (ceftriakson/cefotaksym) penetrują doskonale do miąższu nerek i pokrywają 90% uropatogenów (Escherichia coli, Klebsiella, Proteus)."
          },
          {
            text: "Doustna furagina w syropie przez 3 dni.",
            correct: false,
            feedback: "❌ BŁĄD KRYTYCZNY! Furagina działa wyłącznie w świetle dolnych dróg moczowych. Zastosowanie jej w OZZN u niemowlęcia doprowadzi do urosepsy i nieodwracalnego bliznowacenia nerek!"
          },
          {
            text: "Doustna doksycyklina w tabletkach.",
            correct: false,
            feedback: "❌ BŁĄD! Tetracykliny są bezwzględnie przeciwwskazane u dzieci poniżej 8. roku życia (uszkadzają szkliwo zębów i kości)."
          },
          {
            text: "Wyłącznie leki przeciwgorączkowe i oczekiwanie na posiew przez 5 dni bez antybiotyku.",
            correct: false,
            feedback: "❌ BŁĄD KRYTYCZNY! Opóźnienie wdrożenia antybiotykoterapii w OZZN o więcej niż 48-72 godziny drastycznie zwiększa ryzyko powstania trwałych blizn miąższu nerkowego!"
          }
        ]
      },
      {
        stepNum: 5,
        title: "Krok 5: Ultrasonografia układu moczowego w fazie ostrej",
        desc: "Zlecasz pilne badanie ultrasonograficzne (USG) jamy brzusznej i dróg moczowych. W jakim terminie i w jakim celu wykonuje się USG u niemowlęcia z pierwszym epizodem OZZN wg wytycznych?",
        scenario: "Zlecasz pilne badanie ultrasonograficzne (USG) jamy brzusznej i dróg moczowych. W jakim terminie i w jakim celu wykonuje się USG u niemowlęcia z pierwszym epizodem OZZN wg wytycznych?",
        options: [
          {
            text: "USG należy wykonać w pierwszych 24–48 godzinach hospitalizacji (a w razie ciężkiego stanu natychmiast) w celu wykluczenia powikłań wymagających pilnej interwencji urologicznej: przeszkody pododpływowej (wodonercze, zastawka cewki tylnej), roponercza (pyonephrosis) oraz ropnia nerki lub okołonerkowego.",
            correct: true,
            feedback: "✅ PRAWIDŁOWO! Wytyczne AAP i PTNFD: Każde dziecko z pierwszym epizodem gorączkowego ZUM wymaga badania USG nerek i pęcherza moczowego w trakcie hospitalizacji. USG w fazie ostrej służy wykluczeniu przeszkód w odpływie moczu i ropni. W niepowikłanym OZZN nerka może być jedynie obrzęknięta, o zatartym zróżnicowaniu korowo-rdzeniowym."
          },
          {
            text: "USG wykonuje się dopiero po ukończeniu 18. roku życia.",
            correct: false,
            feedback: "❌ BŁĄD! Badanie wykonuje się niezwłocznie w fazie ostrej."
          },
          {
            text: "USG jest całkowicie przeciwwskazane z powodu podgrzewania moczu przez ultradźwięki.",
            correct: false,
            feedback: "❌ BŁĄD! Ultrasonografia jest całkowicie bezpieczną i nieinwazyjną metodą obrazowania u niemowląt."
          },
          {
            text: "W ostrej fazie zamiast USG należy natychmiast wykonać scyntygrafię DMSA.",
            correct: false,
            feedback: "❌ BŁĄD! Scyntygrafię DMSA w celu oceny trwałych blizn nerkowych wykonuje się najwcześniej po 6 miesiącach od przebytego epizodu OZZN!"
          }
        ]
      },
      {
        stepNum: 6,
        title: "Krok 6: Interpretacja bakteriurii znamiennej w posiewie moczu (Kryteria Kassa)",
        desc: "W 3. dobie leczenia otrzymujesz wynik posiewu moczu pobranego przez cewnikowanie: 'Wyhodowano Escherichia coli w mianie 5x10^4 CFU/ml (50 000 kolonii/ml), szczep ESBL(-), wrażliwy na cefalosporyny, aminoglikozydy i amoksycylinę/klawulanian'. Jak interpretujesz to miano w zależności od techniki pobrania próbki moczu?",
        scenario: "W 3. dobie leczenia otrzymujesz wynik posiewu moczu pobranego przez cewnikowanie: 'Wyhodowano Escherichia coli w mianie 5x10^4 CFU/ml (50 000 kolonii/ml), szczep ESBL(-), wrażliwy na cefalosporyny, aminoglikozydy i amoksycylinę/klawulanian'. Jak interpretujesz to miano w zależności od techniki pobrania próbki moczu?",
        options: [
          {
            text: "Wynik potwierdza znamienną bakteriurię: dla moczu z cewnikowania pęcherza kryterium wynosi >=10^4 do 5x10^4 CFU/ml; dla nakłucia nadłonowego każda liczba bakterii Gram-ujemnych (>0 CFU/ml); dla moczu ze środkowego strumienia >=10^5 CFU/ml pojedynczego uropatogenu.",
            correct: true,
            feedback: "✅ PRAWIDŁOWO! Żelazne kryteria bakteriurii znamiennej (Kass/AAP): 1) Nakłucie nadłonowe (SPA) – każda liczba kolonii (>0 CFU/ml); 2) Cewnikowanie pęcherza – >=10^4 CFU/ml (wg AAP >=5x10^4 CFU/ml); 3) Środkowy strumień – >=10^5 CFU/ml. Miano 50 000 CFU/ml w próbce z cewnika w obecności leukocyturii potwierdza w 100% zakażenie układu moczowego."
          },
          {
            text: "Miano 50 000 CFU/ml oznacza brak zakażenia, ponieważ każdy posiew wymaga minimum 1 000 000 CFU/ml.",
            correct: false,
            feedback: "❌ BŁĄD! Granica 10^5 dotyczy moczu ze środkowego strumienia, a przy cewnikowaniu pęcherza wystarcza 10^4 CFU/ml."
          },
          {
            text: "E. coli to fizjologiczna flora jałowego moczu niemowlęcia.",
            correct: false,
            feedback: "❌ BŁĄD! Pęcherz moczowy jest jałowy; E. coli jest patogenem wywołującym zakażenie."
          },
          {
            text: "Wynik świadczy o zakażeniu wirusowym.",
            correct: false,
            feedback: "❌ BŁĄD! Wyhodowano bakterię jelitową E. coli."
          }
        ]
      },
      {
        stepNum: 7,
        title: "Krok 7: Kwalifikacja do inwazyjnych badań obrazowych – Cystouretrografia mikcyjna (CUM)",
        desc: "W USG jamy brzusznej Martynki: nerki symetryczne, bez cech wodonercza, pęcherz moczowy gładkościenny, UKM nieposzerzony. Gorączka ustąpiła w 2. dobie leczenia. Kiedy wg aktualnych wytycznych AAP i europejskich zaleca się wykonanie inwazyjnej cystouretrografii mikcyjnej (CUM / VCUG) w celu poszukiwania odpływu pęcherzowo-moczowodowego (VUR)?",
        scenario: "W USG jamy brzusznej Martynki: nerki symetryczne, bez cech wodonercza, pęcherz moczowy gładkościenny, UKM nieposzerzony. Gorączka ustąpiła w 2. dobie leczenia. Kiedy wg aktualnych wytycznych AAP i europejskich zaleca się wykonanie inwazyjnej cystouretrografii mikcyjnej (CUM / VCUG) w celu poszukiwania odpływu pęcherzowo-moczowodowego (VUR)?",
        options: [
          {
            text: "Po PIERWSZYM epizodzie gorączkowego ZUM przy PRAWIDŁOWYM wyniku USG badanie CUM NIE jest rutynowo zalecane; wskazaniem do CUM jest nieprawidłowy obraz nerek w USG (poszerzenie UKM, wodonercze, podejrzenie VUR) LUB wystąpienie DRUGIEGO (nawrotowego) epizodu gorączkowego ZUM (podejście 'bottom-up').",
            correct: true,
            feedback: "✅ PRAWIDŁOWO! Współczesny konsensus AAP i EAU/ESPU: rutynowe wykonywanie CUM u każdego niemowlęcia po pierwszym ZUM zostało zarzucone (narażenie na promieniowanie rentgenowskie, uraz psychiczny, ryzyko jatrogennej infekcji). CUM wykonuje się bezwzględnie: 1) Gdy USG wykazuje wodonercze lub blizny nerkowe; 2) Przy nawrocie gorączkowego ZUM; 3) Przy urosepsie o ciężkim przebiegu z patogenem innym niż E. coli."
          },
          {
            text: "CUM należy wykonać natychmiast na szczycie gorączki w 1. dobie hospitalizacji.",
            correct: false,
            feedback: "❌ BŁĄD KRYTYCZNY! CUM w ostrej fazie infekcji z dodatnim posiewem może wtłoczyć zakażony mocz do nerek pod ciśnieniem i wywołać sepsę!"
          },
          {
            text: "CUM wykonuje się u każdego człowieka co roku profilaktycznie.",
            correct: false,
            feedback: "❌ BŁĄD! CUM jest inwazyjnym badaniem kontrastowym obciążonym dawką promieniowania."
          },
          {
            text: "CUM zastępuje się całkowicie kolonoskopią.",
            correct: false,
            feedback: "❌ BŁĄD! CUM bada cewkę i pęcherz moczowy, a nie jelito grube."
          }
        ]
      },
      {
        stepNum: 8,
        title: "Krok 8: Dokończenie leczenia (terapia sekwencyjna) i zalecenia przy wypisie",
        desc: "Łączny czas leczenia przeciwbakteryjnego OZZN u niemowlęcia wynosi 10–14 dni. Po 3 dobach leczenia dożylnego i ustąpieniu gorączki przechodzisz na terapię doustną (amoksycylina z kwasem klawulanowym zgodnie z antybiogramem). Jakie kluczowe zalecenia profilaktyczne przekazujesz rodzicom przed wypisem?",
        scenario: "Łączny czas leczenia przeciwbakteryjnego OZZN u niemowlęcia wynosi 10–14 dni. Po 3 dobach leczenia dożylnego i ustąpieniu gorączki przechodzisz na terapię doustną (amoksycylina z kwasem klawulanowym zgodnie z antybiogramem). Jakie kluczowe zalecenia profilaktyczne przekazujesz rodzicom przed wypisem?",
        options: [
          {
            text: "Dokończenie pełnego 10–14-dniowego kursu antybiotykoterapii doustnie, prawidłowa higiena krocza (podcieranie od przodu do tyłu, unikanie płynów do kąpieli z pianą), obfite pojenie dziecka oraz żelazna zasada: przy KAŻDYM kolejnym epizodzie gorączki bez jasnego ogniska należy W PIERWSZEJ KOLEJNOŚCI zbadać mocz przed włączeniem jakiegokolwiek antybiotyku.",
            correct: true,
            feedback: "✅ PRAWIDŁOWO! Kluczowa edukacja rodziców: każdy nawrót gorączki u dziecka po przebytym OZZN nakazuje natychmiastowe pobranie moczu na badanie ogólne i posiew przed podaniem antybiotyku. Prawidłowa higiena krocza zapobiega kolonizacji cewki moczowej przez pałeczki jelitowe. Rutynowa profilaktyka antybiotykowa (CAP) nie jest obecnie zalecana po pierwszym epizodzie bez stwierdzonego wysokiego odpływu VUR (stopnia IV-V)."
          },
          {
            text: "Odstawienie antybiotyku natychmiast po wyjściu ze szpitala.",
            correct: false,
            feedback: "❌ BŁĄD! Za krótki czas leczenia prowadzi do nawrotu infekcji i bliznowacenia nerek."
          },
          {
            text: "Dożywotnia profilaktyka cyprofloksacyną w dawce maksymalnej.",
            correct: false,
            feedback: "❌ BŁĄD! Fluorochinolony są przeciwwskazane w profilaktyce u niemowląt."
          },
          {
            text: "Zakaz podawania dziecku wody i płynów.",
            correct: false,
            feedback: "❌ BŁĄD! Odpowiednie nawodnienie wspomaga mechaniczne wypłukiwanie bakterii z dróg moczowych."
          }
        ]
      }
    ];

    c.pathoNodes = [
      {
        badge: "OGNIWO 1 • Kolonizacja krocza i wstępująca inwazja uropatogenów",
        title: "Flora kałowa, fimbrie uropatogennej E. coli (UPEC) i zstępujący odpływ",
        short: "Szczepy UPEC z fimbriami typu 1 i fimbriami P kolonizują ujście cewki i wstępują do pęcherza.",
        detail: "Uropatogenne szczepy Escherichia coli (UPEC) stanowią przyczynę ponad 80-85% zakażeń układu moczowego u dzieci. Zakażenie szerzy się drogą wstępującą z flory kałowej przez krótką cewkę moczową niemowlęcia. Bakterie UPEC wyposażone są w wyspecjalizowane czynniki wirulencji: fimbrie typu 1 (adhezyna FimH wiążąca uromukoid i uroplakiny na komórkach nabłonka przejściowego pęcherza moczowego) oraz fimbrie P (adhezyna PapG rozpoznająca reszty dwusacharydowe galaktozo-alfa-1,4-galaktozy na powierzchni nabłonka kanalików nerkowych i erytrocytów). Adhezja do nabłonka chroni bakterie przed mechanicznym wymyciem przez strumień moczu.",
        target: "Fimbrie typu 1 (FimH) oraz fimbrie P (PapG) uropatogennych szczepów E. coli (UPEC)",
        desc: "Flora kałowa, fimbrie uropatogennej E. coli (UPEC) i zstępujący odpływ."
      },
      {
        badge: "OGNIWO 2 • Przełamanie zastawek pęcherzowo-moczowodowych i wstępowanie do nerki",
        title: "Relaksacja perystaltyki moczowodów przez endotoksynę LPS i odpływ VUR",
        short: "Endotoksyna bakteryjna paraliżuje perystaltykę moczowodu, ułatwiając bakteriom dotarcie do kielichów nerkowych.",
        detail: "Z pęcherza moczowego bakterie przemieszczają się moczowodami do miedniczki i kielichów nerkowych. Sprzyja temu niedojrzałość czynnościowa złącza pęcherzowo-moczowodowego lub anatomiczny odpływ pęcherzowo-moczowodowy (VUR). Co istotne, lipopolisacharyd (LPS / endotoksyna) ściany komórkowej bakterii Gram-ujemnych paraliżuje mięśniówkę gładką moczowodu, wywołując czynnościowy refluks i ułatwiając wstępowanie drobnoustrojów do układu kielichowo-miedniczkowego nawet przy prawidłowej anatomii.",
        target: "Mięśniówka gładka moczowodów, złącze pęcherzowo-moczowodowe i endotoksyna LPS",
        desc: "Relaksacja perystaltyki moczowodów przez endotoksynę LPS i odpływ VUR."
      },
      {
        badge: "OGNIWO 3 • Ostra reakcja zapalna w miąższu nerkowym (OZZN)",
        title: "Aktywacja receptorów TLR-4, masywny napływ neutrofilów i kaskada cytokinowa",
        short: "Receptory TLR-4 na komórkach cewek wyzwalają wyrzut IL-6, IL-8 oraz napływ leukocytów (ropomocz).",
        detail: "W miąższu nerki (śródmiąższu i cewkach) endotoksyna LPS wiąże się z receptorami Toll-podobnymi 4 (TLR-4) na komórkach nabłonka cewek nerkowych i komórkach dendrytycznych. Indukuje to aktywację jądrowego czynnika transkrypcyjnego NF-κB i gwałtowny wyrzut prozapalnych cytokin: interleukiny 6 (IL-6), interleukiny 8 (IL-8 / silny chemokinowy atraktant neutrofilów) oraz TNF-alfa. W odpowiedzi dochodzi do masywnej diapedez i napływu granulocytów obojętnochłonnych do światła cewek (ropomocz / leukocyturia) oraz śródmiąższu nerki. Uszkodzenie komórek śródbłonka naczyniowego prowadzi do uwolnienia białek ostrej fazy (wzrost CRP i prokalcytoniny PCT we krwi) oraz gorączki wywołanej działaniem pirogenów na ośrodek termoregulacji w podwzgórzu.",
        target: "Receptor TLR-4, szlak NF-κB, cytokiny IL-6 i IL-8 oraz elastaza neutrofilowa",
        desc: "Aktywacja receptorów TLR-4, masywny napływ neutrofilów i kaskada cytokinowa."
      },
      {
        badge: "OGNIWO 4 • Bliznowacenie miąższu nerkowego i nefropatia refluksowa",
        title: "Stres oksydacyjny, uszkodzenie cewek, włóknienie śródmiąższowe i utrwalone blizny",
        short: "Reaktywne formy tlenu z neutrofilów niszczą nefrony; gojenie przez włóknienie tworzy nieodwracalne blizny nerkowe.",
        detail: "Aktywowane neutrofile uwalniają w miąższu nerkowym wolne rodniki tlenowe (ROS) oraz enzymy proteolityczne (elastazę, mieloperoksydazę). Niszczą one błonę podstawną cewek i wywołują miejscową martwicę tkanek. Proces gojenia u niemowląt zachodzi nie przez regenerację nefronów, lecz przez odkładanie kolagenu i włóknienie śródmiąższowe, prowadząc do powstania trwałych blizn nerkowych (renal scars). Redukcja liczby czynnych nefronów wywołuje kompensacyjną hiperfiltrację kłębuszkową w pozostałym miąższu, co w perspektywie kilkunastu lat prowadzi do stwardnienia kłębuszków (FSGS), nadciśnienia tętniczego naczyniowo-nerkowego oraz przewlekłej choroby nerek (PChN). Ryzyko bliznowacenia rośnie skokowo przy opóźnieniu wdrożenia antybiotyku >48-72h!",
        target: "Kolagenogeneza śródmiąższowa, renina-angiotensyna w nerkach i rezerwa nefronów",
        desc: "Stres oksydacyjny, uszkodzenie cewek, włóknienie śródmiąższowe i utrwalone blizny."
      }
    ];

    c.diffTable = {
      title: "⚔️ Diagnostyka różnicowa postaci zakażeń układu moczowego i gorączki bez ogniska u niemowląt",
      headers: [
        "Cecha kliniczna / jednostka",
        "Ostre odmiedniczkowe zapalenie nerek (OZZN)",
        "Zapalenie pęcherza moczowego",
        "Gorączka trzydniowa (HHV-6 / Rumień nagły)"
      ],
      rows: [
        [
          "Gorączka i stan ogólny",
          "Wysoka gorączka >=38.5–40°C, dziecko apatyczne, wymioty",
          "Stan podgorączkowy lub brak gorączki, stan ogólny dobry",
          "Bardzo wysoka gorączka 39–40°C przez 3 dni, dziecko w dość dobrym stanie"
        ],
        [
          "Wskaźniki zapalne (CRP / PCT)",
          "Znacznie podwyższone: CRP >30–80 mg/l, PCT >0.5–2 ng/ml",
          "Prawidłowe lub nieznacznie podwyższone (CRP <20 mg/l, PCT w normie)",
          "CRP w normie lub nieznacznie podwyższone, PCT prawidłowe (<0.5 ng/ml)"
        ],
        [
          "Badanie ogólne moczu",
          "Masywny ropomocz (>50 leukocytów), azotyny(+), białkomocz",
          "Ropomocz obecny, azotyny(+), brak białkomoczu lub śladowy",
          "Mocz całkowicie prawidłowy (brak leukocytów i bakterii)"
        ],
        [
          "Lokalizacja procesu zapalnego",
          "Miąższ nerki i układ kielichowo-miedniczkowy (górny ZUM)",
          "Śluzówka pęcherza i cewki moczowej (dolny ZUM)",
          "Uogólniona wiremia wirusem HHV-6 (brak ogniska narządowego)"
        ],
        [
          "Ryzyko bliznowacenia nerek",
          "Wysokie (szczególnie przy opóźnieniu leczenia >48h)",
          "Zerowe (zapalenie ograniczone do pęcherza)",
          "Brak związku z nerkami"
        ],
        [
          "Droga podania antybiotyku",
          "Parenteralna (dożylna) w początkowym okresie u niemowląt",
          "Doustna w warunkach ambulatoryjnych",
          "Antybiotyki BEZWZGLĘDNIE PRZECIWWSKAZANE (infekcja wirusowa!)"
        ],
        [
          "Dalsza diagnostyka obrazowa",
          "USG nerek u każdego dziecka; CUM przy nawrocie lub wadzie w USG",
          "Zwykle nie wymaga badań obrazowych po 1. epizodzie",
          "Brak wskazań do diagnostyki obrazowej"
        ]
      ]
    };

    c.dutySummary = {
      overview: "Zakażenie układu moczowego (ZUM) u niemowląt to w przeważającej większości ostre odmiedniczkowe zapalenie nerek (OZZN) przebiegające jako gorączka bez uchwytnego źródła (FWS). Wczesne rozpoznanie i natychmiastowe wdrożenie dożylnej antybiotykoterapii chroni miąższ nerkowy przed nieodwracalnym bliznowaceniem, wtórnym nadciśnieniem tętniczym i schyłkową niewydolnością nerek.",
      diagnostics: "1) Pobranie moczu do posiewu: jednorazowe cewnikowanie pęcherza moczowego lub nakłucie nadłonowe (woreczki przyklejane są ZAKAZANE do posiewu ze względu na 85% wyników fałszywie dodatnich!).<br>2) Kryteria bakteriurii znamiennej w cewnikowaniu: >=10^4 – 5x10^4 CFU/ml pojedynczego uropatogenu.<br>3) OZZN diagnozuje się przy współistnieniu ropomoczu, gorączki >=38.5°C i wysokich wskaźników ostrej fazy (CRP >30 mg/l, PCT >0.5 ng/ml).<br>4) USG nerek i pęcherza moczowego w pierwszych 24–48 h hospitalizacji (wykluczenie wodonercza i ropnia).<br>5) CUM (cystouretrografia mikcyjna) zalecana po wyleczeniu ostrej fazy TYLKO przy nieprawidłowym USG lub nawrocie gorączkowego ZUM (podejście 'bottom-up').",
      drugsAndDoses: "• <span class='dose-pill'>Ceftriakson i.v.</span>: 50–75 mg/kg m.c. 1x/dobę w powolnym wlewie i.v. (lek I rzutu w OZZN u niemowląt) LUB Cefotaksym <span class='dose-pill'>100–150 mg/kg/dobę</span> w 3 dawkach i.v.<br>• <span class='dose-pill'>Ampicylina + Gentamycyna</span>: Ampicylina 100 mg/kg/d i.v. + Gentamycyna <span class='dose-pill'>5–7.5 mg/kg 1x/d i.v.</span> (alternatywa, zwłaszcza u noworodków z ryzykiem Enterococcus i Listeria).<br>• <span class='dose-pill'>Terapia sekwencyjna (przejście na p.o.)</span> po 48–72 h po ustąpieniu gorączki wg antybiogramu: Cefiksym <span class='dose-pill'>8 mg/kg 1x/d p.o.</span> lub Amoksycylina z klawulanianem <span class='dose-pill'>50 mg/kg/d w 3 dawkach p.o.</span><br>• Łączny czas leczenia: <span class='dose-pill'>10–14 dni</span>.<br>• <span class='dose-pill'>Furagina (furazydyna)</span>: BEZWZGLĘDNIE PRZECIWWSKAZANA w ostrym OZZN!",
      procedures: "Aseptyczne jednorazowe cewnikowanie pęcherza cewnikiem 6F; nakłucie nadłonowe pęcherza moczowego (SPA) pod kontrolą USG; po 6 miesiącach od przebytego ciężkiego OZZN u dzieci z nawrotami – scyntygrafia nerek z kwasem dimerkaptobursztynowym (DMSA) w celu oceny obecności trwałych blizn nerkowych.",
      monitoring: "Kontrola temperatury ciała i nawodnienia co 4–6 h; ustąpienie gorączki powinno nastąpić w ciągu 24–48 h od wdrożenia celowanego antybiotyku; kontrolne badanie ogólne moczu po zakończeniu leczenia; edukacja rodziców w zakresie natychmiastowego badania moczu przy każdym kolejnym epizodzie gorączki bez uchwytnej przyczyny."
    };

    c.lekQuestions = [
      {
        tag: "🧪 POBIERANIE MOCZU / KRYTERIA KASSA",
        q: "Zgodnie z wytycznymi Amerykańskiej Akademii Pediatrii (AAP) i Polskiego Towarzystwa Nefrologii Dziecięcej (PTNFD), za kryterium znamiennej bakteriurii u gorączkującego niemowlęcia w próbce moczu pobranej przez JEDNORAZOWE CEWNIKOWANIE PĘCHERZA MOCZOWEGO uznaje się miano pojedynczego uropatogenu wynoszące co najmniej:",
        opts: [
          "A) ≥ 10^4 – 5×10^4 CFU/ml (10 000 – 50 000 kolonii/ml)",
          "B) ≥ 10^5 CFU/ml (100 000 kolonii/ml)",
          "C) Każda liczba kolonii > 0 CFU/ml",
          "D) ≥ 10^3 CFU/ml pod warunkiem współistnienia białkomoczu",
          "E) ≥ 10^6 CFU/ml"
        ],
        options: [
          "A) ≥ 10^4 – 5×10^4 CFU/ml (10 000 – 50 000 kolonii/ml)",
          "B) ≥ 10^5 CFU/ml (100 000 kolonii/ml)",
          "C) Każda liczba kolonii > 0 CFU/ml",
          "D) ≥ 10^3 CFU/ml pod warunkiem współistnienia białkomoczu",
          "E) ≥ 10^6 CFU/ml"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowa odpowiedź to A. Znamienna bakteriuria w zależności od metody pobrania: 1) Nakłucie nadłonowe pęcherza: każda liczba kolonii bakterii Gram-ujemnych (>0 CFU/ml); 2) Cewnikowanie pęcherza moczowego: ≥10^4 CFU/ml (wg zaleceń AAP z 2016 r. ≥5×10^4 CFU/ml w obecności leukocyturii); 3) Mocz ze środkowego strumienia: ≥10^5 CFU/ml.",
        expl: "Prawidłowa odpowiedź to A. Znamienna bakteriuria w zależności od metody pobrania: 1) Nakłucie nadłonowe pęcherza: każda liczba kolonii bakterii Gram-ujemnych (>0 CFU/ml); 2) Cewnikowanie pęcherza moczowego: ≥10^4 CFU/ml (wg zaleceń AAP z 2016 r. ≥5×10^4 CFU/ml w obecności leukocyturii); 3) Mocz ze środkowego strumienia: ≥10^5 CFU/ml."
      },
      {
        tag: "❌ BŁĘDY W DIAGNOSTYCE / WORECZKI PRZYKLEJANE",
        q: "Dlaczego wytyczne międzynarodowe kategorycznie zabraniają pobierania moczu na posiew za pomocą plastikowych woreczków przyklejanych na krocze u niemowląt?",
        opts: [
          "A) Odsetek wyników fałszywie dodatnich z powodu kontaminacji florą skóry krocza i odbytu sięga 70–85%, co prowadzi do nadrozpoznawalności i niepotrzebnej antybiotykoterapii",
          "B) Klej z woreczka niszczy ściany komórkowe bakterii, dając wyłącznie wyniki fałszywie ujemne",
          "C) Woreczek pochłania leukocyty, uniemożliwiając ocenę ropomoczu",
          "D) Zastosowanie woreczka wywołuje u niemowląt odruchowe zatrzymanie moczu na 48 godzin",
          "E) Woreczki są dopuszczone wyłącznie u chłopców obrzezanych"
        ],
        options: [
          "A) Odsetek wyników fałszywie dodatnich z powodu kontaminacji florą skóry krocza i odbytu sięga 70–85%, co prowadzi do nadrozpoznawalności i niepotrzebnej antybiotykoterapii",
          "B) Klej z woreczka niszczy ściany komórkowe bakterii, dając wyłącznie wyniki fałszywie ujemne",
          "C) Woreczek pochłania leukocyty, uniemożliwiając ocenę ropomoczu",
          "D) Zastosowanie woreczka wywołuje u niemowląt odruchowe zatrzymanie moczu na 48 godzin",
          "E) Woreczki są dopuszczone wyłącznie u chłopców obrzezanych"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowa odpowiedź to A. Mocz pobrany do woreczka przyklejanego na skórę krocza niemowlęcia cechuje się ogromnym odsetkiem kontaminacji (70-85% wyników fałszywie dodatnich). Dodatni posiew z woreczka NIE MOŻE stanowić podstawy rozpoznania ZUM ani włączenia antybiotyku. Ujemny wynik badania ogólnego z woreczka pozwala jedynie wykluczyć ZUM.",
        expl: "Prawidłowa odpowiedź to A. Mocz pobrany do woreczka przyklejanego na skórę krocza niemowlęcia cechuje się ogromnym odsetkiem kontaminacji (70-85% wyników fałszywie dodatnich). Dodatni posiew z woreczka NIE MOŻE stanowić podstawy rozpoznania ZUM ani włączenia antybiotyku. Ujemny wynik badania ogólnego z woreczka pozwala jedynie wykluczyć ZUM."
      },
      {
        tag: "💊 FARMAKOTERAPIA / BŁĄD SZTUKI Z FURAGINĄ",
        q: "Dlaczego stosowanie furazydyny (Furaginy) w leczeniu ostrego odmiedniczkowego zapalenia nerek (OZZN) u niemowlęcia jest bezwzględnym błędem sztuki lekarskiej?",
        opts: [
          "A) Furazydyna osiąga stężenie terapeutyczne wyłącznie w dolnych drogach moczowych i nie osiąga stężenia przeciwbakteryjnego w miąższu nerek i surowicy krwi",
          "B) Furazydyna jest lekiem z wyboru wyłącznie w zakażeniach wywołanych przez Pseudomonas aeruginosa",
          "C) Furazydyna działa wyłącznie na grzyby z rodzaju Candida",
          "D) Furazydyna wywołuje u niemowląt natychmiastowe stwardnienie tętnic nerkowych",
          "E) Lek ten jest skuteczny w OZZN, ale podaje się go wyłącznie dożylnie"
        ],
        options: [
          "A) Furazydyna osiąga stężenie terapeutyczne wyłącznie w dolnych drogach moczowych i nie osiąga stężenia przeciwbakteryjnego w miąższu nerek i surowicy krwi",
          "B) Furazydyna jest lekiem z wyboru wyłącznie w zakażeniach wywołanych przez Pseudomonas aeruginosa",
          "C) Furazydyna działa wyłącznie na grzyby z rodzaju Candida",
          "D) Furazydyna wywołuje u niemowląt natychmiastowe stwardnienie tętnic nerkowych",
          "E) Lek ten jest skuteczny w OZZN, ale podaje się go wyłącznie dożylnie"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowa odpowiedź to A. Podstawowy dogmat nefrologiczny: pochodne nitrofuranu (furazydyna) są wydalane przez nerki i osiągają wysokie stężenie w moczu pęcherzowym, ale ich stężenie w miąższu nerkowym i surowicy jest znikome. Dlatego furazydyna nadaje się wyłącznie do leczenia niepowikłanego zapalenia pęcherza moczowego lub profilaktyki, a w OZZN jest całkowicie nieskuteczna i grozi urosepsą!",
        expl: "Prawidłowa odpowiedź to A. Podstawowy dogmat nefrologiczny: pochodne nitrofuranu (furazydyna) są wydalane przez nerki i osiągają wysokie stężenie w moczu pęcherzowym, ale ich stężenie w miąższu nerkowym i surowicy jest znikome. Dlatego furazydyna nadaje się wyłącznie do leczenia niepowikłanego zapalenia pęcherza moczowego lub profilaktyki, a w OZZN jest całkowicie nieskuteczna i grozi urosepsą!"
      },
      {
        tag: "📋 WSKAZANIA DO CYSTOURETROGRAFII / CUM",
        q: "Zgodnie ze współczesnymi wytycznymi AAP i PTNFD, u którego z poniższych dzieci po przebytym zakażeniu układu moczowego wskazane jest wykonanie mikcyjnej cystouretrografii (CUM / VCUG) w celu wykluczenia odpływu pęcherzowo-moczowodowego (VUR)?",
        opts: [
          "A) U dziecka z nieprawidłowym wynikiem USG nerek (poszerzenie UKM, wodonercze, podejrzenie wady) LUB po drugim (nawrotowym) epizodzie gorączkowego ZUM",
          "B) U każdego noworodka i niemowlęcia po pierwszym niepowikłanym epizodzie ZUM z prawidłowym USG",
          "C) Wyłącznie u dziewczynek powyżej 10. roku życia z zapaleniem pęcherza",
          "D) U każdego dziecka z obecnością białka w moczu",
          "E) CUM wykonuje się zawsze w ostrej fazie gorączkowej w 1. dobie hospitalizacji"
        ],
        options: [
          "A) U dziecka z nieprawidłowym wynikiem USG nerek (poszerzenie UKM, wodonercze, podejrzenie wady) LUB po drugim (nawrotowym) epizodzie gorączkowego ZUM",
          "B) U każdego noworodka i niemowlęcia po pierwszym niepowikłanym epizodzie ZUM z prawidłowym USG",
          "C) Wyłącznie u dziewczynek powyżej 10. roku życia z zapaleniem pęcherza",
          "D) U każdego dziecka z obecnością białka w moczu",
          "E) CUM wykonuje się zawsze w ostrej fazie gorączkowej w 1. dobie hospitalizacji"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowa odpowiedź to A. Podejście 'bottom-up': u niemowląt po pierwszym epizodzie gorączkowego ZUM wykonuje się rutynowo USG nerek. Jeśli USG jest prawidłowe, odstępuje się od inwazyjnego CUM. Wskazaniami do CUM są: nieprawidłowe USG (wodonercze, cechy VUR), nawrót gorączkowego ZUM (drugi epizod OZZN) lub urosepsa wywołana patogenem innym niż E. coli.",
        expl: "Prawidłowa odpowiedź to A. Podejście 'bottom-up': u niemowląt po pierwszym epizodzie gorączkowego ZUM wykonuje się rutynowo USG nerek. Jeśli USG jest prawidłowe, odstępuje się od inwazyjnego CUM. Wskazaniami do CUM są: nieprawidłowe USG (wodonercze, cechy VUR), nawrót gorączkowego ZUM (drugi epizod OZZN) lub urosepsa wywołana patogenem innym niż E. coli."
      },
      {
        tag: "🔬 SCYNTYGRAFIA DMSA / BLIZNOWACENIE NEREK",
        q: "Jakie badanie obrazowe stanowi złoty standard w wykrywaniu i precyzyjnej ocenie trwałych blizn miąższu nerkowego (renal scarring) po przebytym ostrym odmiedniczkowym zapaleniu nerek i po jakim czasie od ostrej infekcji należy je wykonać?",
        opts: [
          "A) Scyntygrafia nerek z kwasem dimerkaptobursztynowym (DMSA), wykonywana najwcześniej po 6 miesiącach od przebytego epizodu OZZN",
          "B) Dożylna urografia z kontrastem jodowym, wykonywana w 2. dobie infekcji",
          "C) Renografia dynamiczna MAG3 z furosemidem, wykonywana w trakcie gorączki",
          "D) Przeglądowe RTG jamy brzusznej w pozycji stojącej po 24 godzinach",
          "E) Rezonans magnetyczny głowy z oceną przysadki mózgowej"
        ],
        options: [
          "A) Scyntygrafia nerek z kwasem dimerkaptobursztynowym (DMSA), wykonywana najwcześniej po 6 miesiącach od przebytego epizodu OZZN",
          "B) Dożylna urografia z kontrastem jodowym, wykonywana w 2. dobie infekcji",
          "C) Renografia dynamiczna MAG3 z furosemidem, wykonywana w trakcie gorączki",
          "D) Przeglądowe RTG jamy brzusznej w pozycji stojącej po 24 godzinach",
          "E) Rezonans magnetyczny głowy z oceną przysadki mózgowej"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowa odpowiedź to A. Scyntygrafia statyczna 99mTc-DMSA (dimercaptosuccinic acid) wiąże się w komórkach cewek proksymalnych kory nerek i jest złotym standardem oceny blizn miąższowych. W fazie ostrej DMSA wykazuje ogniska hipofiksacji odpowiadające naciekowi zapalnemu (ostre zapalenie nerek). Aby odróżnić przejściowy naciek od trwałej blizny nerkowej, badanie kontrolne wykonuje się najwcześniej po 6 miesiącach!",
        expl: "Prawidłowa odpowiedź to A. Scyntygrafia statyczna 99mTc-DMSA (dimercaptosuccinic acid) wiąże się w komórkach cewek proksymalnych kory nerek i jest złotym standardem oceny blizn miąższowych. W fazie ostrej DMSA wykazuje ogniska hipofiksacji odpowiadające naciekowi zapalnemu (ostre zapalenie nerek). Aby odróżnić przejściowy naciek od trwałej blizny nerkowej, badanie kontrolne wykonuje się najwcześniej po 6 miesiącach!"
      },
      {
        tag: "❌ WSKAŻ FAŁSZYWE / PATOGENEZA ZUM",
        q: "Wskaż zdanie FAŁSZYWE dotyczące etiologii i patogenezy zakażeń układu moczowego u dzieci:",
        opts: [
          "A) W okresie noworodkowym i wczesnoniemowlęcym ZUM występuje częściej u dziewczynek niż u chłopców",
          "B) Najczęstszym patogenem wywołującym ZUM u dzieci jest uropatogenna Escherichia coli (odpowiada za >80% zakażeń)",
          "C) Fimbrie typu P umożliwiają bakteriom E. coli przyleganie do nabłonka kanalików nerkowych",
          "D) Proteus mirabilis produkuje ureazę, która alkalizuje mocz i sprzyja powstawaniu kamieni fosforanowo-magnezowo-amonowych (struwitowych)",
          "E) Obecność zakażenia patogenem innym niż E. coli (np. Pseudomonas, Klebsiella, Proteus) częściej wiąże się z wadami anatomicznymi układu moczowego"
        ],
        options: [
          "A) W okresie noworodkowym i wczesnoniemowlęcym ZUM występuje częściej u dziewczynek niż u chłopców",
          "B) Najczęstszym patogenem wywołującym ZUM u dzieci jest uropatogenna Escherichia coli (odpowiada za >80% zakażeń)",
          "C) Fimbrie typu P umożliwiają bakteriom E. coli przyleganie do nabłonka kanalików nerkowych",
          "D) Proteus mirabilis produkuje ureazę, która alkalizuje mocz i sprzyja powstawaniu kamieni fosforanowo-magnezowo-amonowych (struwitowych)",
          "E) Obecność zakażenia patogenem innym niż E. coli (np. Pseudomonas, Klebsiella, Proteus) częściej wiąże się z wadami anatomicznymi układu moczowego"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowa odpowiedź to A (zdanie fałszywe). Klasyczny wyjątek epidemiologiczny LEK: W pierwszych 3-6 miesiącach życia ZUM występuje CZĘŚCIEJ U CHŁOPCÓW (stosunek Ch:Dz ok. 3-5:1), szczególnie nieobrzezanych (obecność fizjologicznej stulejki sprzyjającej kolonizacji napletka przez florę jelitową). Dopiero po 6.-12. miesiącu życia i w kolejnych latach ZUM staje się znacznie częstszy u dziewczynek z powodu krótkiej cewki moczowej.",
        expl: "Prawidłowa odpowiedź to A (zdanie fałszywe). Klasyczny wyjątek epidemiologiczny LEK: W pierwszych 3-6 miesiącach życia ZUM występuje CZĘŚCIEJ U CHŁOPCÓW (stosunek Ch:Dz ok. 3-5:1), szczególnie nieobrzezanych (obecność fizjologicznej stulejki sprzyjającej kolonizacji napletka przez florę jelitową). Dopiero po 6.-12. miesiącu życia i w kolejnych latach ZUM staje się znacznie częstszy u dziewczynek z powodu krótkiej cewki moczowej."
      },
      {
        tag: "🚽 WADY ANATOMICZNE / ZASTAWKA CEWKI TYLNEJ (PUV)",
        q: "U 2-tygodniowego noworodka płci męskiej z pierwszym epizodem OZZN w badaniu fizykalnym stwierdza się stale powiększony, napięty pęcherz moczowy sięgający pępka oraz oddawanie moczu kroplami wąskim strumieniem pod dużym ciśnieniem. W USG: obustronne wodonercze, poszerzenie moczowodów i pogrubienie ściany pęcherza. Jaka wada anatomiczna jest najbardziej prawdopodobną przyczyną?",
        opts: [
          "A) Zastawka cewki tylnej (Posterior Urethral Valve – PUV)",
          "B) Stulejka fizjologiczna",
          "C) Wierzchniactwo",
          "D) Zdwojenie układu kielichowo-miedniczkowego bez przeszkody",
          "E) Zwężenie ujścia zewnętrznego cewki moczowej"
        ],
        options: [
          "A) Zastawka cewki tylnej (Posterior Urethral Valve – PUV)",
          "B) Stulejka fizjologiczna",
          "C) Wierzchniactwo",
          "D) Zdwojenie układu kielichowo-miedniczkowego bez przeszkody",
          "E) Zwężenie ujścia zewnętrznego cewki moczowej"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowa odpowiedź to A. Zastawka cewki tylnej (PUV) to najczęstsza wada przeszkody podpęcherzowej u chłopców (występuje wyłącznie u płci męskiej!). Nieprawidłowy fałd błony śluzowej w części sterczowej cewki blokuje odpływ moczu. Prowadzi do przerostu ściany pęcherza, obustronnego odpływu VUR, wodonercza i dysplazji nerek. Stanowi stan pilny urologiczny wymagający odbarczenia (cewnik) i nacięcia endoskopowego zastawki.",
        expl: "Prawidłowa odpowiedź to A. Zastawka cewki tylnej (PUV) to najczęstsza wada przeszkody podpęcherzowej u chłopców (występuje wyłącznie u płci męskiej!). Nieprawidłowy fałd błony śluzowej w części sterczowej cewki blokuje odpływ moczu. Prowadzi do przerostu ściany pęcherza, obustronnego odpływu VUR, wodonercza i dysplazji nerek. Stanowi stan pilny urologiczny wymagający odbarczenia (cewnik) i nacięcia endoskopowego zastawki."
      },
      {
        tag: "💉 ANTYBIOTYKOTERAPIA EMPIRYCZNA / CEFTRIAKSON",
        q: "Jaki jest zalecany czas trwania leczenia przeciwbakteryjnego w ostrym odmiedniczkowym zapaleniu nerek (OZZN) u niemowlęcia zgodnie ze standardami pediatrycznymi?",
        opts: [
          "A) Łącznie 10–14 dni (początkowo dożylnie, a po ustąpieniu gorączki kontynuacja doustna wg antybiogramu)",
          "B) Dokładnie 3 dni leczenia doustnego",
          "C) 1 dzień leczenia jednorazową dawką fosfomycyny",
          "D) Minimum 6 miesięcy ciągłej antybiotykoterapii dożylnej",
          "E) Antybiotyk odstawia się natychmiast w 2. dobie po spadku temperatury poniżej 37°C"
        ],
        options: [
          "A) Łącznie 10–14 dni (początkowo dożylnie, a po ustąpieniu gorączki kontynuacja doustna wg antybiogramu)",
          "B) Dokładnie 3 dni leczenia doustnego",
          "C) 1 dzień leczenia jednorazową dawką fosfomycyny",
          "D) Minimum 6 miesięcy ciągłej antybiotykoterapii dożylnej",
          "E) Antybiotyk odstawia się natychmiast w 2. dobie po spadku temperatury poniżej 37°C"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowa odpowiedź to A. W OZZN u dzieci standardowy czas leczenia wynosi 10–14 dni. Leczenie krótkie (3-dniowe lub 1-dawkowe fosfomycyną) jest dopuszczalne wyłącznie w niepowikłanym zapaleniu pęcherza u nastolatek, ale jest kardynalnym błędem w OZZN, w którym zbyt krótka terapia prowadzi do nawrotu i bliznowacenia nerek.",
        expl: "Prawidłowa odpowiedź to A. W OZZN u dzieci standardowy czas leczenia wynosi 10–14 dni. Leczenie krótkie (3-dniowe lub 1-dawkowe fosfomycyną) jest dopuszczalne wyłącznie w niepowikłanym zapaleniu pęcherza u nastolatek, ale jest kardynalnym błędem w OZZN, w którym zbyt krótka terapia prowadzi do nawrotu i bliznowacenia nerek."
      },
      {
        tag: "🧪 PROFILAKTYKA PRZECIWBAKTERYJNA / CAP",
        q: "Ciągła profilaktyka antybiotykowa (Continuous Antibiotic Prophylaxis – CAP, np. podawanie małej dawki furazydyny lub kotrimoksazolu na noc) NIE JEST rutynowo zalecana po pierwszym epizodzie ZUM, ale pozostaje wskazana u dzieci z:",
        opts: [
          "A) Odpływem pęcherzowo-moczowodowym wysokiego stopnia (VUR stopnia IV i V) lub nawracającymi gorączkowymi ZUM",
          "B) Pojedynczym epizodem bezgorączkowego zapalenia pęcherza",
          "C) Prawidłowym układem moczowym w USG i brakiem nawrotów",
          "D) Przejściową hiperurykozurią",
          "E) Izolowanym moczeniem nocnym bez cech zakażenia"
        ],
        options: [
          "A) Odpływem pęcherzowo-moczowodowym wysokiego stopnia (VUR stopnia IV i V) lub nawracającymi gorączkowymi ZUM",
          "B) Pojedynczym epizodem bezgorączkowego zapalenia pęcherza",
          "C) Prawidłowym układem moczowym w USG i brakiem nawrotów",
          "D) Przejściową hiperurykozurią",
          "E) Izolowanym moczeniem nocnym bez cech zakażenia"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowa odpowiedź to A. Wytyczne EAU/ESPU i PTNFD ograniczyły wskazania do przewlekłej profilaktyki przeciwbakteryjnej (CAP) z powodu selekcji szczepów lekoopornych. CAP (np. nitrofurantoina 1-2 mg/kg lub kotrimoksazol 2 mg/kg na noc) stosuje się u dzieci z ciężkim refluksem (VUR IV i V stopnia), uropatią zaporową przed zabiegiem oraz u dzieci z częstymi nawrotami gorączkowych ZUM (>=3 w roku).",
        expl: "Prawidłowa odpowiedź to A. Wytyczne EAU/ESPU i PTNFD ograniczyły wskazania do przewlekłej profilaktyki przeciwbakteryjnej (CAP) z powodu selekcji szczepów lekoopornych. CAP (np. nitrofurantoina 1-2 mg/kg lub kotrimoksazol 2 mg/kg na noc) stosuje się u dzieci z ciężkim refluksem (VUR IV i V stopnia), uropatią zaporową przed zabiegiem oraz u dzieci z częstymi nawrotami gorączkowych ZUM (>=3 w roku)."
      },
      {
        tag: "⚠️ POWIKŁANIA ODLEGŁE / NEFROPATIA REFLUKSOWA",
        q: "Co jest najczęstszą przyczyną nadciśnienia tętniczego naczyniowo-nerkowego i nerkopochodnego u dzieci i młodych dorosłych?",
        opts: [
          "A) Bliznowacenie pozapalne miąższu nerkowego w przebiegu nefropatii refluksowej po nawracających epizodach OZZN",
          "B) Guz chromochłonny nadnerczy (Phaeochromocytoma)",
          "C) Pierwotny hiperaldosteronizm (zespół Conna)",
          "D) Nadmierne spożycie lukrecji",
          "E) Koarktacja aorty piersiowej u każdego pacjenta"
        ],
        options: [
          "A) Bliznowacenie pozapalne miąższu nerkowego w przebiegu nefropatii refluksowej po nawracających epizodach OZZN",
          "B) Guz chromochłonny nadnerczy (Phaeochromocytoma)",
          "C) Pierwotny hiperaldosteronizm (zespół Conna)",
          "D) Nadmierne spożycie lukrecji",
          "E) Koarktacja aorty piersiowej u każdego pacjenta"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowa odpowiedź to A. Nefropatia refluksowa będąca skutkiem nawracających, nieleczonych lub późno leczonych epizodów OZZN z towarzyszącym VUR jest wiodącą przyczyną wtórnego nadciśnienia tętniczego u dzieci i młodzieży (odpowiada za >60% nerkopochodnego NT w pediatrii) oraz drugą-trzecią przyczyną schyłkowej niewydolności nerek.",
        expl: "Prawidłowa odpowiedź to A. Nefropatia refluksowa będąca skutkiem nawracających, nieleczonych lub późno leczonych epizodów OZZN z towarzyszącym VUR jest wiodącą przyczyną wtórnego nadciśnienia tętniczego u dzieci i młodzieży (odpowiada za >60% nerkopochodnego NT w pediatrii) oraz drugą-trzecią przyczyną schyłkowej niewydolności nerek."
      },
      {
        tag: "📋 DIAGNOSTYKA RÓŻNICOWA / ZAPALENIE WYROSTKA VS ZUM",
        q: "U 4-letniego dziecka z podejrzeniem ostrego zapalenia wyrostka robaczkowego w badaniu ogólnym moczu stwierdzono 10–15 leukocytów w polu widzenia oraz pojedyncze erytrocyty. Azotyny są ujemne. Jak należy zinterpretować ten wynik?",
        opts: [
          "A) Obecność leukocyturii może być zjawiskiem wtórnym (tzw. jałowy ropomocz) wywołanym podrażnieniem prawego moczowodu lub pęcherza przez przylegający, zmieniony zapalnie wyrostek robaczkowy i NIE wyklucza ostrego zapalenia wyrostka",
          "B) Wynik ten jednoznacznie wyklucza zapalenie wyrostka robaczkowego i dowodzi infekcji pęcherza",
          "C) Świadczy o obecności raka pęcherza moczowego",
          "D) Wskazuje na konieczność natychmiastowego usunięcia obu nerek",
          "E) Jest to zjawisko całkowicie fizjologiczne u każdego 4-latka"
        ],
        options: [
          "A) Obecność leukocyturii może być zjawiskiem wtórnym (tzw. jałowy ropomocz) wywołanym podrażnieniem prawego moczowodu lub pęcherza przez przylegający, zmieniony zapalnie wyrostek robaczkowy i NIE wyklucza ostrego zapalenia wyrostka",
          "B) Wynik ten jednoznacznie wyklucza zapalenie wyrostka robaczkowego i dowodzi infekcji pęcherza",
          "C) Świadczy o obecności raka pęcherza moczowego",
          "D) Wskazuje na konieczność natychmiastowego usunięcia obu nerek",
          "E) Jest to zjawisko całkowicie fizjologiczne u każdego 4-latka"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowa odpowiedź to A. Bardzo częsta pułapka egzaminacyjna LEK: zapalnie zmieniony wyrostek robaczkowy leżący w miednicy mniejszej lub zakątniczo styka się z prawym moczowodem lub ścianą pęcherza moczowego. Przenikanie leukocytów przez ścianę moczowodu daje niewielką leukocyturię (10-20 wpw) i krwinkomocz bez bakteriurii. Pomyłka ta bywa przyczyną fałszywego rozpoznania 'ZUM' i opóźnienia operacji wyrostka!",
        expl: "Prawidłowa odpowiedź to A. Bardzo częsta pułapka egzaminacyjna LEK: zapalnie zmieniony wyrostek robaczkowy leżący w miednicy mniejszej lub zakątniczo styka się z prawym moczowodem lub ścianą pęcherza moczowego. Przenikanie leukocytów przez ścianę moczowodu daje niewielką leukocyturię (10-20 wpw) i krwinkomocz bez bakteriurii. Pomyłka ta bywa przyczyną fałszywego rozpoznania 'ZUM' i opóźnienia operacji wyrostka!"
      }
    ];

    c.flashcards = [
      {
        q: "Dlaczego woreczki przyklejane na krocze są zakazane do pobierania moczu na posiew u niemowląt?",
        a: "Aż 70-85% wyników fałszywie dodatnich z powodu kontaminacji florą skóry i odbytu. Mocz do posiewu należy pobrać przez cewnikowanie lub nakłucie nadłonowe."
      },
      {
        q: "Jakie jest kryterium znamiennej bakteriurii w próbce moczu z cewnikowania pęcherza moczowego?",
        a: "≥ 10^4 – 5×10^4 CFU/ml pojedynczego uropatogenu w obecności leukocyturii."
      },
      {
        q: "Dlaczego furazydyna (Furagina) jest przeciwwskazana w ostrym odmiedniczkowym zapaleniu nerek (OZZN)?",
        a: "Działa wyłącznie w świetle pęcherza moczowego i nie osiąga stężenia terapeutycznego w miąższu nerkowym i surowicy."
      },
      {
        q: "Kiedy wskazane jest wykonanie cystouretrografii mikcyjnej (CUM) u dziecka po ZUM?",
        a: "Przy nieprawidłowym wyniku USG (wodonercze, wada układu) LUB przy nawrocie gorączkowego ZUM (drugi epizod OZZN)."
      },
      {
        q: "Jakie badanie obrazowe jest złotym standardem oceny blizn miąższu nerkowego i kiedy się je wykonuje?",
        a: "Scyntygrafia statyczna 99mTc-DMSA, wykonywana najwcześniej po 6 miesiącach od przebytego epizodu OZZN."
      },
      {
        q: "Jaki jest zalecany antybiotyk parenteralny I rzutu w OZZN u niemowlęcia?",
        a: "Cefalosporyna III generacji: Ceftriakson i.v. (50-75 mg/kg/d) lub Cefotaksym i.v. (100-150 mg/kg/d w 3 dawkach)."
      }
    ];
  });

  console.log("Cases 103 and 104 rework completed successfully!");
}

run().catch(err => {
  console.error("Error reworking cases 103-104:", err);
  process.exit(1);
});

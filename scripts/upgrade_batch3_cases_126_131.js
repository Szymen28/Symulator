const fs = require('fs');
const { decryptObjectAes, encryptStringAes } = require('./encrypt_case.js');
const PASSWORD = '@LEKSzymon28111999';

async function upgradeCase(fname, updater) {
  const enc = JSON.parse(fs.readFileSync('cases/' + fname, 'utf8'));
  const c = await decryptObjectAes(enc, PASSWORD);
  updater(c);
  if (!c.vitalsObj) {
    c.vitalsObj = { hr: 90, bp: "120/80", spo2: 98, rr: 16, temp: 37.8, gcs: 15 };
  }
  const reEnc = await encryptStringAes(JSON.stringify(c, null, 2), PASSWORD);
  fs.writeFileSync('cases/' + fname, JSON.stringify(reEnc, null, 2), 'utf8');
  console.log(`Upgraded clinical storytelling: ${fname}`);
}

async function run() {
  console.log("Starting deep clinical upgrade for cases 126-131 (Surgery Part 1)...");

  // ==========================================
  // CASE 126: Ostre zapalenie wyrostka robaczkowego u dorosłego
  // ==========================================
  await upgradeCase('126_wyrostek_dorosly.json', (c) => {
    c.steps = [
      {
        stepNum: 1,
        title: "Krok 1: Wstępna ocena na SOR – 24-letni mężczyzna z wędrującym bólem brzucha",
        desc: "Dyżurujesz na chirurgicznym SOR. Zgłasza się 24-letni dotychczas zdrowy mężczyzna. Dolegliwości rozpoczęły się 18 godzin temu od tępego, rozlanego, trudnego do zlokalizowania bólu w nadbrzuszu i wokół pępka, któremu towarzyszył całkowity brak apetytu (jadłowstręt) i jednokrotne wymioty treścią pokarmową. Od 6 godzin ból wyraźnie zmienił charakter: stał się ostry, silny, stały i 'przewędrował' do prawego dołu biodrowego, nasilając się przy każdym kroku, kaszlu i wstrząsach. W badaniu: HR 98/min, RR 125/80 mmHg, temp. 37.9°C (w odbycie 38.5°C, różnica >0.5°C). Brzuch w prawym dole biodrowym jest deskowato napięty z wyraźną bolesnością uciskową w punkcie McBurneya i Lanza. Jaka jest Twoja natychmiastowa diagnoza kliniczna?",
        scenario: "Dyżurujesz na chirurgicznym SOR. Zgłasza się 24-letni dotychczas zdrowy mężczyzna. Dolegliwości rozpoczęły się 18 godzin temu od tępego, rozlanego, trudnego do zlokalizowania bólu w nadbrzuszu i wokół pępka, któremu towarzyszył całkowity brak apetytu (jadłowstręt) i jednokrotne wymioty treścią pokarmową. Od 6 godzin ból wyraźnie zmienił charakter: stał się ostry, silny, stały i 'przewędrował' do prawego dołu biodrowego, nasilając się przy każdym kroku, kaszlu i wstrząsach. W badaniu: HR 98/min, RR 125/80 mmHg, temp. 37.9°C (w odbycie 38.5°C, różnica >0.5°C). Brzuch w prawym dole biodrowym jest deskowato napięty z wyraźną bolesnością uciskową w punkcie McBurneya i Lanza. Jaka jest Twoja natychmiastowa diagnoza kliniczna?",
        options: [
          {
            text: "Rozpoznajesz ostre zapalenie wyrostka robaczkowego (Appendicitis acuta); patognomoniczny objaw wędrowania bólu z nadbrzusza/śródbrzusza do prawego dołu biodrowego (objaw Kochaera) w połączeniu z jadłowstrętem i objawami otrzewnowymi.",
            correct: true,
            feedback: "Znakomicie! Klasyczna patofizjologia ostrego zapalenia wyrostka robaczkowego: 1) Początkowo niedrożność światła wyrostka (kamień kałowy / fecalith lub rozrost grudek chłonnych) wywołuje rozdęcie narządu i ból trzewny (przewodzony włóknami współczulnymi Th8–Th10) rzutowany do nadbrzusza i śródbrzusza; 2) Po kilkunastu godzinach proces zapalny obejmuje pełną grubość ściany i dochodzi do podrażnienia otrzewnej ściennej unerwionej somatycznie – ból staje się ostry, zlokalizowany ściśle w prawym dole biodrowym (objaw Kochaera). Brak apetytu (anoreksja) występuje u >95% chorych!"
          },
          {
            text: "Rozpoznajesz zespół jelita drażliwego (IBS) i zalecasz herbatę rumiankową.",
            correct: false,
            feedback: "Kardynalny błąd! Ostre zapalenie wyrostka robaczkowego nierozpoznane na czas grozi perforacją, zgorzelą i rozlanym zapaleniem otrzewnej."
          },
          {
            text: "Stawiasz rozpoznanie ostrego odmiedniczkowego zapalenia nerek.",
            correct: false,
            feedback: "Brak objawów dyzurycznych, ból zlokalizowany w dole biodrowym z obroną mięśniową, a nie w okolicy lędźwiowej."
          },
          {
            text: "Podejrzewasz pęknięcie tętniaka aorty piersiowej u 24-latka.",
            correct: false,
            feedback: "Skrajnie nieprawdopodobne w tym wieku i przy tej lokalizacji dolegliwości."
          }
        ]
      },
      {
        stepNum: 2,
        title: "Krok 2: Badanie przedmiotowe jamy brzusznej – Klasyczne objawy wyrostkowe",
        desc: "Przeprowadzasz badanie fizykalne jamy brzusznej. Jakie charakterystyczne objawy kliniczne potwierdzają zapalenie wyrostka robaczkowego i podrażnienie otrzewnej?",
        scenario: "Przeprowadzasz badanie fizykalne jamy brzusznej. Jakie charakterystyczne objawy kliniczne potwierdzają zapalenie wyrostka robaczkowego i podrażnienie otrzewnej?",
        options: [
          {
            text: "1) Objaw Blumberga (silny ból przy nagłym zwolnieniu ucisku powłok brzusznych); 2) Objaw Rovsinga (ból w prawym dole biodrowym przy ucisku lewego dołu biodrowego przez przemieszczanie gazów w okrężnicy); 3) Objaw Jaworskiego (ból przy opuszczaniu uniesionej prawej kończyny dolnej w stawie biodrowym przeciw oporowi – zapalenie wyrostka zakątniczego drażniącego mięsień lędźwiowo-udowy).",
            correct: true,
            feedback: "Doskonale! Klasyczna semiotyka chirurgiczna ostrego brzucha (żelazne pytania LEK): 1) Objaw Blumberga – wskaźnik podrażnienia otrzewnej ściennej; 2) Objaw Rovsinga – ucisk na zstępnicę i esicę przemieszcza gazy wstecznie do kątnicy, rozciągając zmieniony zapalnie wyrostek i wywołując ból po stronie prawej; 3) Objaw Jaworskiego (objaw mięśnia lędźwiowo-udowego / psoas sign) – kluczowy przy wyrostku położonym zakątniczo (retrocaecal); 4) Objaw zasłonowy (obturator sign) – ból przy rotacji wewnętrznej zgiętego uda przy wyrostku w miednicy mniejszej."
          },
          {
            text: "Objaw Murphy'ego i objaw Chełmońskiego zlokalizowany pod lewym żebrem.",
            correct: false,
            feedback: "Objaw Murphy'ego i Chełmońskiego dotyczą pęcherzyka żółciowego i wątroby pod prawym łukiem żebrowym."
          },
          {
            text: "Objaw Courvoisiera z wyczuwalnym powiększonym pęcherzykiem żółciowym.",
            correct: false,
            feedback: "Objaw Courvoisiera cechuje bezbolesny guz głowy trzustki z żółtaczką zaporową."
          },
          {
            text: "Objaw Goldflama ujemny wyklucza ostre zapalenie wyrostka.",
            correct: false,
            feedback: "Objaw Goldflama dotyczy nerek, nie wyrostka robaczkowego."
          }
        ]
      },
      {
        stepNum: 3,
        title: "Krok 3: Badania laboratoryjne CITO i skala Alvarado (MANTRELS)",
        desc: "Pobierasz krew na cito: Leukocytoza 15.8 G/l z neutrofilią 82% (przesunięcie w lewo), CRP 68 mg/l. Mocz ogólny: pojedyncze erytrocyty (zapalenie sąsiadującego moczowodu), bez ropomoczu. Wyliczasz punktację w powszechnie stosowanej skali Alvarado (MANTRELS). Co oznacza wynik 8/10 punktów?",
        scenario: "Pobierasz krew na cito: Leukocytoza 15.8 G/l z neutrofilią 82% (przesunięcie w lewo), CRP 68 mg/l. Mocz ogólny: pojedyncze erytrocyty (zapalenie sąsiadującego moczowodu), bez ropomoczu. Wyliczasz punktację w powszechnie stosowanej skali Alvarado (MANTRELS). Co oznacza wynik 8/10 punktów?",
        options: [
          {
            text: "Skala Alvarado >=7–8 punktów (MANTRELS: Migration of pain, Anorexia, Nausea/vomiting, Tenderness in RLQ [2 pkt], Rebound pain, Elevated temp, Leukocytosis [2 pkt], Shift to left) oznacza BARDZO WYSOKIE PRAWDOPODOBIEŃSTWO ostrego zapalenia wyrostka robaczkowego i kwalifikuje pacjenta bezpośrednio do leczenia operacyjnego.",
            correct: true,
            feedback: "Znakomicie! Skala Alvarado (MANTRELS, maks. 10 pkt): 1-4 pkt: zapalenie wyrostka mało prawdopodobne (wypis/obserwacja); 5-6 pkt: stan wątpliwy (wskazana diagnostyka obrazowa USG/TK lub hospitalizacja); >=7-8 pkt: ostre zapalenie wyrostka niemal pewne (wskazanie do pilnej operacji chirurgicznej bez zwłoki). Podwójnie punktowane (po 2 pkt) są: bolesność w prawym dole biodrowym (Tenderness) oraz leukocytoza (Leukocytosis)."
          },
          {
            text: "Wynik 8/10 oznacza, że pacjent jest w 100% zdrowy i może opuścić szpital.",
            correct: false,
            feedback: "Wynik 8 pkt w skali Alvarado to bezwzględne wskazanie do operacji."
          },
          {
            text: "Skala Alvarado służy wyłącznie do oceny ciężkości oparzeń termicznych.",
            correct: false,
            feedback: "Skala Alvarado to najważniejsza kliniczna skala oceny prawdopodobieństwa appendicitis."
          },
          {
            text: "Wskazuje na konieczność 6-miesięcznej obserwacji ambulatoryjnej.",
            correct: false,
            feedback: "Zwłoka doprowadziłaby do pęknięcia wyrostka i ropowicy otrzewnej."
          }
        ]
      },
      {
        stepNum: 4,
        title: "Krok 4: Diagnostyka obrazowa – USG jamy brzusznej vs Tomografia komputerowa (TK)",
        desc: "Dyżurny radiolog wykonuje USG jamy brzusznej głowicą liniową z uciskiem (graded compression). Jakie kryteria ultrasonograficzne potwierdzają ostre zapalenie wyrostka robaczkowego?",
        scenario: "Dyżurny radiolog wykonuje USG jamy brzusznej głowicą liniową z uciskiem (graded compression). Jakie kryteria ultrasonograficzne potwierdzają ostre zapalenie wyrostka robaczkowego?",
        options: [
          {
            text: "Wyrostek robaczkowy o średnicy zewnętrznej >6 mm, niepodatny na ucisk głowicą (sztywna cewka ślepo zakończona), z pogrubieniem ściany >2–3 mm, obecnością kamienia kałowego (appendicolith / fecalith z cieniem akustycznym) oraz wzmożoną echogenicznością i przekrwieniem otaczającej tkanki tłuszczowej.",
            correct: true,
            feedback: "Prawidłowo! Kryteria USG ostrego zapalenia wyrostka (technika graded compression wg Puyliarta): 1) Średnica poprzeczna wyrostka >6 mm (wartość graniczna); 2) Brak ściśliwości pod uciskiem głowicy (struktura sztywna, bolesna pod naciskiem – objaw 'celownika' / 'tarczy'); 3) Pogrubienie ściany i zatarcie jej warstw; 4) Obecność koprolitu (kamienia kałowego z cieniem akustycznym); 5) Odczyn zapalny okolicznego tłuszczu okołowyrostkowego i wolny płyn w jamie Douglasa."
          },
          {
            text: "Prawidłowy wyrostek o średnicy 1 mm swobodnie zapadający się pod lekkim dotykiem.",
            correct: false,
            feedback: "To cechy wyrostka prawidłowego, nie zmienionego zapalnie."
          },
          {
            text: "W USG wyrostek robaczkowy nigdy nie jest widoczny u ludzi.",
            correct: false,
            feedback: "Zmieniony zapalnie wyrostek jest doskonale widoczny w USG u większości pacjentów."
          },
          {
            text: "Obecność pęcherzyków gazu w żyle wrotnej jest jedynym kryterium wyrostkowym.",
            correct: false,
            feedback: "Pylephlebitis (zakaźne zapalenie żyły wrotnej) to skrajne, rzadkie powikłanie septyczne, nie kryterium wstępne."
          }
        ]
      },
      {
        stepNum: 5,
        title: "Krok 5: Przygotowanie przedoperacyjne i profilaktyka antybiotykowa",
        desc: "Kwalifikujesz pacjenta do pilnego zabiegu operacyjnego. Jakie postępowanie przygotowawcze i jaką okołooperacyjną profilaktykę antybiotykową wdrażasz zgodnie ze standardami chirurgicznymi?",
        scenario: "Kwalifikujesz pacjenta do pilnego zabiegu operacyjnego. Jakie postępowanie przygotowawcze i jaką okołooperacyjną profilaktykę antybiotykową wdrażasz zgodnie ze standardami chirurgicznymi?",
        options: [
          {
            text: "Ścisła dieta ścisła (nic doustnie - NPO), dożylna płynoterapia krystaloidowa (uzupełnienie strat), leki przeciwbólowe (np. paracetamol/NLPZ i.v.) oraz JEDNORAZOWA dawka profilaktyki antybiotykowej i.v. na 30–60 minut przed nacięciem skóry obejmująca pałeczki Gram-ujemne i beztlenowce (np. cefazolina/ceftriakson + metronidazol).",
            correct: true,
            feedback: "Doskonale! Przygotowanie do appendektomii: 1) Pacjent na czczo, nawodnienie dożylne; 2) Leki przeciwbólowe: dawny mit 'zakazu podawania leków przeciwbólowych przed operacją, aby nie zamazać obrazu' został całkowicie odrzucony przez EBM – uśmierzenie bólu jest obowiązkiem lekarza!; 3) Profilaktyka antybiotykowa: pojedyncza dawka dożylna podana na 30-60 min przed zabiegiem (np. cefalosporyna z metronidazolem) drastycznie zmniejsza ryzyko zakażenia miejsca operowanego (ZMO) i ropni wewnątrzbrzusznych."
          },
          {
            text: "Podajesz doustnie 2 litry oleju rycynowego i silne leki przeczyszczające w celu oczyszczenia jelit.",
            correct: false,
            feedback: "Śmiertelny błąd! Leki przeczyszczające w zapaleniu wyrostka gwałtownie zwiększają ciśnienie w jelicie i doprowadzą do natychmiastowej perforacji wyrostka!"
          },
          {
            text: "Zalecasz obfity posiłek ze schabowym i frytkami tuż przed znieczuleniem ogólnym.",
            correct: false,
            feedback: "Grozi śmiertelnym zachłyśnięciem treścią pokarmową podczas intubacji (zespół Mendelsona)."
          },
          {
            text: "Zabierasz pacjenta na blok bez żadnego wkłucia żylnego.",
            correct: false,
            feedback: "Niedopuszczalne: znieczulenie i resuscytacja płynowa wymagają pewnego dostępu naczyniowego."
          }
        ]
      },
      {
        stepNum: 6,
        title: "Krok 6: Wybór metody operacyjnej – Laparoskopia vs Laparotomia otwarta",
        desc: "Jaka metoda operacyjna jest obecnie ZŁOTYM STANDARDEM w leczeniu ostrego zapalenia wyrostka robaczkowego wg wytycznych WSES (World Society of Emergency Surgery)?",
        scenario: "Jaka metoda operacyjna jest obecnie ZŁOTYM STANDARDEM w leczeniu ostrego zapalenia wyrostka robaczkowego wg wytycznych WSES (World Society of Emergency Surgery)?",
        options: [
          {
            text: "APPENDЕКТОMIA LAPAROSKOPOWA (laparoscopic appendectomy); metoda pierwszego wyboru zapewniająca: mniejszy ból pooperacyjny, krótszy czas hospitalizacji, szybszy powrót do aktywności, mniejszy odsetek zakażeń rany oraz możliwość dokładnej inspekcji całej jamy otrzewnej.",
            correct: true,
            feedback: "Znakomicie! Wytyczne WSES: Appendektomia laparoskopowa jest złotym standardem leczenia appendicitis u dzieci, dorosłych, osób otyłych i kobiet w wieku rozrodczym. W porównaniu z klasycznym cięciem naprzemiennym McBurneya laparoskopia wiąże się ze statystycznie istotnie mniejszym bólem, rzadszymi zakażeniami rany operacyjnej i szybszą rekonwalescencją oraz umożliwia wykluczenie innych patologii (uchyłek Meckela, zapalenie przydatków, endometrioza)."
          },
          {
            text: "Cięcie pośrodkowe od wyrostka mieczykowatego do spojenia łonowego u każdego pacjenta.",
            correct: false,
            feedback: "Szeroka laparotomia pośrodkowa jest nadmiernie inwazyjna, rezerwuje się ją dla powikłanego rozlanego kałowego zapalenia otrzewnej."
          },
          {
            text: "Wycięcie wyrostka przez nakłucie przez jamę opłucnej.",
            correct: false,
            feedback: "Niedorzeczne i anatomicznie błędne."
          },
          {
            text: "Zeszklenie wyrostka promieniowaniem podczerwonym przez skórę.",
            correct: false,
            feedback: "Absurdalna propozycja."
          }
        ]
      },
      {
        stepNum: 7,
        title: "Krok 7: Śródoperacyjna ocena uchyłka Meckela – 'Reguła dwójek'",
        desc: "Chirurg wprowadza laparoskop. Widzi zgorzelinowo zmieniony wyrostek robaczkowy otoczony mętnym wysiękiem. Po usunięciu wyrostka dokonuje rutynowej inspekcji ostatnich 100 cm jelita krętego. Jaka wrodzona wada przewodu pokarmowego może idealnie imitować ostre zapalenie wyrostka robaczkowego i jaką regułą anatomiczną się charakteryzuje?",
        scenario: "Chirurg wprowadza laparoskop. Widzi zgorzelinowo zmieniony wyrostek robaczkowy otoczony mętnym wysiękiem. Po usunięciu wyrostka dokonuje rutynowej inspekcji ostatnich 100 cm jelita krętego. Jaka wrodzona wada przewodu pokarmowego może idealnie imitować ostre zapalenie wyrostka robaczkowego i jaką regułą anatomiczną się charakteryzuje?",
        options: [
          {
            text: "UCHYŁEK MECKELA (pozostałość przewodu żółtkowo-jelitowego / omphalomesenteric duct); charakteryzuje się 'REGUŁĄ DWÓJEK': występuje u 2% populacji, 2 cale długości (~5 cm), 2 stopy od zastawki krętniczo-kątniczej Bauhina (~60 cm), 2-krotnie częściej u mężczyzn, zawiera 2 typy ektopowej tkanki (śluzówkę żołądka i trzustki); jego zapalenie imituje appendicitis.",
            correct: true,
            feedback: "Wybitnie! Klasyczny pewniak chirurgiczny na każdym LEK: Zapalenie uchyłka Meckela (Meckel's diverticulitis): jeśli w trakcie operacji wyrostek okazuje się niezmieniony zapalnie, chirurg ma bezwzględny obowiązek obejrzeć ostatnie 100 cm jelita krętego w poszukiwaniu uchyłka Meckela! 'Reguła dwójek' (Rule of 2s): 2% populacji, 2 cale (5 cm) długości, 2 stopy (60 cm) od zastawki Bauhina, 2 razy częściej u mężczyzn, 2 rodzaje tkanki ektopowej (błona śluzowa żołądka wydzielająca kwas solny i powodująca krwawiące owrzodzenia oraz tkanka trzustkowa), objawia się najczęściej przed 2. rokiem życia."
          },
          {
            text: "Zdwojenie pęcherzyka żółciowego u 2% pacjentów.",
            correct: false,
            feedback: "Zdwojenie pęcherzyka nie znajduje się na jelicie krętym."
          },
          {
            text: "Uchyłek Zenkera w dolnym odcinku jelita krętego.",
            correct: false,
            feedback: "Uchyłek Zenkera to uchyłek gardłowo-przełykowy na szyi, nie w jamie brzusznej!"
          },
          {
            text: "Wrodzony brak jelita grubego u 2% ludzi.",
            correct: false,
            feedback: "Niedorzeczne."
          }
        ]
      },
      {
        stepNum: 8,
        title: "Krok 8: Wczesne powikłania pooperacyjne i kryteria wypisu",
        desc: "Zabieg laparoskopowy przebiegł bez powikłań. W 4. dobie pooperacyjnej pacjent gorączkuje do 38.6°C, skarży się na ból w podbrzuszu, parcie na mocz i biegunkę z oddawaniem śluzu. Jakie najczęstsze powikłanie ropne po appendektomii podejrzewasz i jak je diagnozujesz?",
        scenario: "Zabieg laparoskopowy przebiegł bez powikłań. W 4. dobie pooperacyjnej pacjent gorączkuje do 38.6°C, skarży się na ból w podbrzuszu, parcie na mocz i biegunkę z oddawaniem śluzu. Jakie najczęstsze powikłanie ropne po appendektomii podejrzewasz i jak je diagnozujesz?",
        options: [
          {
            text: "Rozpoznajesz ropień jamy Douglasa (ropień miednicy mniejszej / pelvic abscess); objawia się gorączką septyczną, bolesnym parciem na stolec (tenesmus), śluzowymi stolcami i dyzurią; diagnozuje się go w badaniu per rectum (bolesne, chełboczące uwypuklenie przedniej ściany odbytnicy) oraz USG/TK miednicy; leczenie: drenaż przezodbytniczy lub przezskórny pod kontrolą USG/TK.",
            correct: true,
            feedback: "Doskonale! Klasyczne powikłanie po appendektomii (zwłaszcza zgorzelinowej lub przedziurawionej): Ropień miednicy mniejszej / jamy Douglasa (najniżej położonego zachyłka otrzewnej u człowieka w pozycji stojącej/półsiedzącej). Ropa spływa grawitacyjnie do miednicy. Zbliżenie ropnia do odbytnicy i pęcherza drażni sploty nerwowe: parcie na stolec, stolce z domieszką śluzu, częstomocz. Badanie per rectum (PR) wyczuwa gorący, bolesny, napięty opór wpuklający się do światła bańki odbytnicy. Drenaż przez ścianę odbytnicy lub przezskórny pod USG jest zabiegiem z wyboru."
          },
          {
            text: "Rozpoznajesz wstrząs anafilaktyczny na lateks.",
            correct: false,
            feedback: "Anafilaksja występuje w minutach po kontakcie z alergenem, a nie w 4. dobie z gorączką 38.6°C i parciem na mocz."
          },
          {
            text: "Uznajesz to za naturalną reakcję adaptacyjną organizmu i wypisujesz chorego do domu.",
            correct: false,
            feedback: "Błąd zaniechania: nierozpoznany ropień wewnątrzbrzuszny grozi sepsą i wstrząsem septycznym."
          },
          {
            text: "Kierujesz pacjenta na natychmiastową amputację prawej nogi.",
            correct: false,
            feedback: "Absurdalna i okaleczająca propozycja."
          }
        ]
      }
    ];
  });

  // ==========================================
  // CASE 127: Ostre kamicze zapalenie pęcherzyka żółciowego
  // ==========================================
  await upgradeCase('127_ostre_zapalenie_pecherzyka_zolciowego.json', (c) => {
    c.steps = [
      {
        stepNum: 1,
        title: "Krok 1: Wstępna ocena na SOR – 48-letnia kobieta z ostrym bólem pod prawym żebrem >6h",
        desc: "Dyżurujesz na chirurgicznym SOR. Zgłasza się 48-letnia otyła kobieta (BMI 32 kg/m2, wieloródka – cechy z reguły 4xF: Female, Forty, Fat, Fertile). 8 godzin temu, po zjedzeniu tłustej kolacji (smażony boczek z jajkami), wystąpił silny, stały, narastający ból w prawym podżebrzu, promieniujący do prawej łopatki i przestrzeni międzyłopatkowej, połączony z nudnościami i wymiotami. Ból nie ustępuje mimo przyjęcia drotaweryny (No-Spa) i ketoprofenu. W badaniu: HR 102/min, RR 135/85 mmHg, temp. 38.4°C, powłoki brzuszne w prawym podżebrzu są obronnie napięte. Jaka jest Twoja wstępna diagnoza i różnicowanie z kolką żółciową?",
        scenario: "Dyżurujesz na chirurgicznym SOR. Zgłasza się 48-letnia otyła kobieta (BMI 32 kg/m2, wieloródka – cechy z reguły 4xF: Female, Forty, Fat, Fertile). 8 godzin temu, po zjedzeniu tłustej kolacji (smażony boczek z jajkami), wystąpił silny, stały, narastający ból w prawym podżebrzu, promieniujący do prawej łopatki i przestrzeni międzyłopatkowej, połączony z nudnościami i wymiotami. Ból nie ustępuje mimo przyjęcia drotaweryny (No-Spa) i ketoprofenu. W badaniu: HR 102/min, RR 135/85 mmHg, temp. 38.4°C, powłoki brzuszne w prawym podżebrzu są obronnie napięte. Jaka jest Twoja wstępna diagnoza i różnicowanie z kolką żółciową?",
        options: [
          {
            text: "Rozpoznajesz ostre kamicze zapalenie pęcherzyka żółciowego (Cholecystitis acuta calculosa); kluczowe kryterium różnicujące z niepowikłaną kolką żółciową: w kolce żółciowej ból mija w ciągu <6 godzin i nie ma gorączki; ból trwający nieprzerwanie >6 godzin z gorączką i leukocytozą oznacza rozwój ostrego zapalenia pęcherzyka!",
            correct: true,
            feedback: "Znakomicie! Fundamentalne kryterium kliniczne LEK: Zwykła kolka żółciowa (biliary colic) wynika z przejściowego zatkania przewodu pęcherzykowego przez złóg – ból trwa zwykle od 30 minut do 4–6 godzin i samoistnie ustępuje po cofnięciu się kamienia do światła pęcherzyka (brak gorączki i leukocytozy). Gdy złóg pozostaje uwięziony w szyjce lub przewodzie pęcherzykowym >6 godzin, dochodzi do zastoju żółci, uwalniania lizolecytyny, niedokrwienia ściany, inwazji bakteryjnej i rozwoju OSTREGO ZAPALENIA PĘCHERZYKA ŻÓŁCIOWEGO z gorączką i obroną mięśniową!"
          },
          {
            text: "Rozpoznajesz niepowikłaną kolkę żółciową i odsyłasz pacjentkę do domu z zaleceniem diety.",
            correct: false,
            feedback: "Kardynalny błąd! Ból >6h, gorączka 38.4°C i obrona mięśniowa to objawy ostrego zapalenia wymagające hospitalizacji."
          },
          {
            text: "Stawiasz rozpoznanie zawału ściany przedniej serca.",
            correct: false,
            feedback: "Ból zlokalizowany pod prawym żebrem promieniujący pod prawą łopatkę po tłustym posiłku z gorączką to typowy ból dróg żółciowych."
          },
          {
            text: "Podejrzewasz pęknięcie śledziony.",
            correct: false,
            feedback: "Śledziona leży w lewym podżebrzu, a pacjentka nie przebyła urazu."
          }
        ]
      },
      {
        stepNum: 2,
        title: "Krok 2: Badanie fizykalne – Objaw Murphy'ego i objaw Chełmońskiego",
        desc: "Przystępujesz do badania palpacyjnego prawego podżebrza. Jakie dwa klasyczne objawy fizykalne potwierdzają ostre zapalenie pęcherzyka żółciowego?",
        scenario: "Przystępujesz do badania palpacyjnego prawego podżebrza. Jakie dwa klasyczne objawy fizykalne potwierdzają ostre zapalenie pęcherzyka żółciowego?",
        options: [
          {
            text: "1) Objaw Murphy'ego (badający kładzie dłoń w prawym podżebrzu w linii środkowo-obojczykowej i prosi o głęboki wdech; opadający zapalnie zmieniony pęcherzyk uderza o palce, wywołując ostry ból i gwałtowne zatrzymanie wdechu); 2) Objaw Chełmońskiego (bolesność przy lekkim uderzeniu/wstrząsaniu prawego łuku żebrowego brzegiem dłoni).",
            correct: true,
            feedback: "Doskonale! Klasyczna semiotyka wątrobowo-żółciowa: 1) Objaw Murphy'ego (Murphy's sign) ma swoistość >80-90% dla ostrego zapalenia pęcherzyka żółciowego: pacjent bierze głęboki wdech, przepona spycha pęcherzyk w dół ku dłoni badającego – kontakt zapalnie zmienionej ściany pęcherzyka z palcami powoduje nagły bolesny bezdech ('arrest of inspiration'). 2) Objaw Chełmońskiego – bolesność przy uderzeniu pięścią w dłoń przyłożoną do prawego łuku żebrowego (wstrząsanie wątroby i pęcherzyka)."
          },
          {
            text: "Objaw Blumberga w lewym dole biodrowym jako jedyny dowód.",
            correct: false,
            feedback: "Dotyczy lewego dołu biodrowego (zapalenie uchyłków esicy)."
          },
          {
            text: "Objaw Chvostka i objaw Trousseau.",
            correct: false,
            feedback: "To objawy tężyczki hipokalcemicznej, nie pęcherzyka żółciowego."
          },
          {
            text: "Objaw Babińskiego obustronny.",
            correct: false,
            feedback: "Objaw piramidowy w neurologii, brak związku z brzuchem."
          }
        ]
      },
      {
        stepNum: 3,
        title: "Krok 3: Badanie ultrasonograficzne (USG) jamy brzusznej – Kryteria Tokyo Guidelines",
        desc: "Zgodnie z wytycznymi Tokyo Guidelines (TG18) USG jest badaniem obrazowym pierwszego wyboru. Jakie cechy w badaniu USG potwierdzają ostre zapalenie pęcherzyka żółciowego?",
        scenario: "Zgodnie z wytycznymi Tokyo Guidelines (TG18) USG jest badaniem obrazowym pierwszego wyboru. Jakie cechy w badaniu USG potwierdzają ostre zapalenie pęcherzyka żółciowego?",
        options: [
          {
            text: "1) Pogrubienie ściany pęcherzyka >4 mm z cechami obrzęku (obraz 'podwójnego konturu' / warstwicy); 2) Obecność złogów żółciowych w świetle, zwłaszcza uwięźniętego złogu w szyjce pęcherzyka lub przewodzie pęcherzykowym; 3) Powiększenie pęcherzyka (wodniak pęcherzyka >8–10 cm długości); 4) Płyn okołopęcherzykowy; 5) Dodatni ultrasonograficzny objaw Murphy'ego (ból pod bezpośrednim uciskiem głowicy USG na pęcherzyk).",
            correct: true,
            feedback: "Znakomicie! Kryteria ultrasonograficzne ostrego zapalenia pęcherzyka żółciowego wg Tokyo Guidelines (TG13/TG18): Pogrubienie ściany pęcherzyka >=4 mm (norma <=3 mm) z rozwarstwieniem hipoechogennym (obrzęk ściany / podwójny zarys), powiększenie wymiaru podłużnego (>8-10 cm) lub poprzecznego (>4-5 cm), zaklinowany złóg w szyjce oraz dodatni sonograficzny objaw Murphy'ego (bolesność dokładnie w miejscu przyłożenia głowicy do uwidocznionego pęcherzyka – czułość >90%)."
          },
          {
            text: "Ściana pęcherzyka o grubości 0.5 mm całkowicie zapadnięta.",
            correct: false,
            feedback: "To obraz prawidłowego pęcherzyka po posiłku."
          },
          {
            text: "Całkowity brak pęcherzyka żółciowego w loży wątroby po przebytej w dzieciństwie cholecystektomii.",
            correct: false,
            feedback: "Pacjentka ma zachowany pęcherzyk ze złogami."
          },
          {
            text: "USG jamy brzusznej jest badaniem bezwartościowym w chorobach pęcherzyka.",
            correct: false,
            feedback: "USG jest złotym standardem I rzutu o czułości i swoistości >90%."
          }
        ]
      },
      {
        stepNum: 4,
        title: "Krok 4: Klasyfikacja ciężkości wg Tokyo Guidelines 2018 (Stopień I, II i III)",
        desc: "Otrzymujesz wyniki badań laboratoryjnych: Leukocytoza 14.2 G/l, CRP 84 mg/l, bilirubina całkowita 1.1 mg/dl (w normie!), AST 38 IU/l, ALT 42 IU/l, amylaza 45 IU/l (w normie). Pacjentka nie ma cech niewydolności krążenia, nerek ani zaburzeń świadomości. Jak klasyfikujesz stopień ciężkości zapalenia pęcherzyka wg wytycznych Tokyo Guidelines 2018 (TG18)?",
        scenario: "Otrzymujesz wyniki badań laboratoryjnych: Leukocytoza 14.2 G/l, CRP 84 mg/l, bilirubina całkowita 1.1 mg/dl (w normie!), AST 38 IU/l, ALT 42 IU/l, amylaza 45 IU/l (w normie). Pacjentka nie ma cech niewydolności krążenia, nerek ani zaburzeń świadomości. Jak klasyfikujesz stopień ciężkości zapalenia pęcherzyka wg wytycznych Tokyo Guidelines 2018 (TG18)?",
        options: [
          {
            text: "Stopień I – ŁAGODNE ostre zapalenie pęcherzyka żółciowego (Grade I - Mild); zapalenie ograniczone do ściany pęcherzyka u pacjentki bez dysfunkcji narządowej (w stopniu II obecna leukocytoza >18 G/l, wyczuwalny guz lub trwanie objawów >72h; w stopniu III obecna niewydolność narządowa: wstrząs, AKI, DIC).",
            correct: true,
            feedback: "Doskonale! Klasyfikacja ciężkości Tokyo Guidelines (TG18): 1) Grade III (ciężkie) – współistnienie niewydolności przynajmniej jednego narządu (układ krążenia - wstrząs, OUN - zaburzenia świadomości, oddechowy - PaO2/FiO2 <300, nerki - oliguria/wzrost kreatyniny, wątroba - INR >1.5, krew - PLT <100 G/l); 2) Grade II (umiarkowane) – brak dysfunkcji narządów, ale obecny przynajmniej 1 czynnik: leukocytoza >18 G/l, wyczuwalny bolesny opór w podżebrzu, objawy trwające >72h lub cechy zgorzeli/ropotoku; 3) Grade I (łagodne) – brak kryteriów dla stopnia II i III (jak u naszej pacjentki)."
          },
          {
            text: "Stopień III (ciężki) z koniecznością natychmiastowego podłączenia do sztucznego płuco-serca ECMO.",
            correct: false,
            feedback: "Pacjentka nie ma niewydolności wielonarządowej."
          },
          {
            text: "Zapalenie niekwalifikowalne wymagające natychmiastowej biopsji wątroby.",
            correct: false,
            feedback: "TG18 to uniwersalna klasyfikacja chirurgiczna na świecie."
          },
          {
            text: "Stan agonalny pacjentki.",
            correct: false,
            feedback: "Pacjentka jest stabilna hemodynamicznie w I stopniu zaawansowania."
          }
        ]
      },
      {
        stepNum: 5,
        title: "Krok 5: Optymalny czas wykonania cholecystektomii – Wczesna vs Odroczona",
        desc: "Kiedy należy wykonać cholecystektomię laparoskopową u pacjentki z ostrym kamiczym zapaleniem pęcherzyka żółciowego wg aktualnych wytycznych WSES i Tokyo Guidelines?",
        scenario: "Kiedy należy wykonać cholecystektomię laparoskopową u pacjentki z ostrym kamiczym zapaleniem pęcherzyka żółciowego wg aktualnych wytycznych WSES i Tokyo Guidelines?",
        options: [
          {
            text: "WCZESNA CHOLECYSTEKTOMIA LAPAROSKOPOWA (Early Laparoscopic Cholecystectomy) wykonana w ciągu pierwszych 24–72 godzin od przyjęcia do szpitala (lub do 7 dni od początku objawów); wiąże się ze statystycznie istotnie mniejszym odsetkiem powikłań, krótszym czasem leczenia i mniejszym ryzykiem konwersji do operacji otwartej w porównaniu z leczeniem odroczonym o 6–8 tygodni.",
            correct: true,
            feedback: "Wybitnie! Dawny paradygmat chirurgiczny ('chłodzić zapalenie antybiotykiem i operować planowo za 6-8 tygodni') został całkowicie zrewidowany przez EBM! Wszystkie współczesne wytyczne (WSES, Tokyo Guidelines, SAGES, NICE) jednoznacznie rekomendują WCZESNĄ CHOLECYSTEKTOMIĘ LAPAROSKOPOWĄ (najlepiej w ciągu pierwszych 72h od przyjęcia / do 7 dni od początku objawów). Wczesny zabieg wykonuje się w fazie obrzęku tkanek, co ułatwia preparowanie (tkanki łatwo się rozwarstwiają). Odroczenie operacji wiąże się z gęstymi zrostami bliznowatymi, wyższym ryzykiem uszkodzenia dróg żółciowych i 20% ryzykiem nawrotu ostrego zapalenia w okresie oczekiwania!"
          },
          {
            text: "Zabieg należy bezwzględnie odroczyć o co najmniej 1 rok.",
            correct: false,
            feedback: "Błąd: naraża pacjentkę na ropotok, zgorzel, perforację pęcherzyka i zacięcie kamienia w PŻW."
          },
          {
            text: "Cholecystektomię wykonuje się wyłącznie po ukończeniu 80. roku życia.",
            correct: false,
            feedback: "Absurdalna teza."
          },
          {
            text: "Ostre zapalenie pęcherzyka nigdy nie wymaga leczenia operacyjnego.",
            correct: false,
            feedback: "Cholecystektomia jest leczeniem przyczynowym z wyboru."
          }
        ]
      },
      {
        stepNum: 6,
        title: "Krok 6: Bezpieczeństwo śródoperacyjne – Trójkąt Calota i Critical View of Safety (CVS)",
        desc: "W trakcie cholecystektomii laparoskopowej chirurg preparuje struktury wrotne. Jaka zasada preparowania anatomicznego (Critical View of Safety wg Strasberga) jest złotym standardem zapobiegania jatrogennemu przecięciu przewodu wątrobowego wspólnego i przewodu żółciowego wspólnego?",
        scenario: "W trakcie cholecystektomii laparoskopowej chirurg preparuje struktury wrotne. Jaka zasada preparowania anatomicznego (Critical View of Safety wg Strasberga) jest złotym standardem zapobiegania jatrogennemu przecięciu przewodu wątrobowego wspólnego i przewodu żółciowego wspólnego?",
        options: [
          {
            text: "Uzyskanie 'krytycznego wglądu bezpieczeństwa' (Critical View of Safety - CVS): 1) Całkowite oczyszczenie trójkąta pęcherzykowo-wątrobowego (trójkąta Calota) z tłuszczu i tkanki włóknistej; 2) Odpreparowanie dolnej 1/3 pęcherzyka od łoża wątroby (widoczna płyta pęcherzykowa); 3) Uwidocznienie DOKŁADNIE DWÓCH i tylko dwóch struktur wnikających do pęcherzyka: przewodu pęcherzykowego i tętnicy pęcherzykowej przed założeniem klipsów i ich przecięciem.",
            correct: true,
            feedback: "Znakomicie! To najważniejsza zasada techniki operacyjnej w chirurgii dróg żółciowych (częste pytanie na egzaminach chirurgicznych i LEK): Krytyczny widok bezpieczeństwa (CVS Strasberga): najczęstszy błąd prowadzący do jatrogennego wycięcia przewodu żółciowego wspólnego (PŻW) wynika z pomyłki – chirurg myli PŻW z przewodem pęcherzykowym! Aby temu zapobiec, przed zaklipowaniem jakiejkolwiek struktury chirurg MUSI: 1) Oczyścić trójkąt Calota (ograniczony przez przewód pęcherzykowy, przewód wątrobowy wspólny i brzeg wątroby); 2) Odsłonić płytę wątrobową dna pęcherzyka; 3) Zobaczyć na własne oczy, że do pęcherzyka wnikają TYLKO DWIE struktury (tętnica pęcherzykowa i przewód pęcherzykowy)."
          },
          {
            text: "Przecięcie wszystkich widocznych przewodów bez ich wcześniejszego preparowania.",
            correct: false,
            feedback: "Śmiertelny błąd w sztuce: prowadzi do przecięcia przewodu żółciowego wspólnego (PŻW) i żółciowego zapalenia otrzewnej."
          },
          {
            text: "Zalecenie podwiązania żyły wrotnej w celu zmniejszenia krwawienia.",
            correct: false,
            feedback: "Podwiązanie żyły wrotnej wywoła natychmiastową martwicę jelit i śmierć."
          },
          {
            text: "Pozostawienie pęcherzyka z nacięciem i odprowadzeniem żółci do jamy otrzewnej.",
            correct: false,
            feedback: "Wywoła masywne żółciowe zapalenie otrzewnej i sepsę."
          }
        ]
      },
      {
        stepNum: 7,
        title: "Krok 7: Postępowanie u pacjentów zdyskwalifikowanych ze znieczulenia ogólnego",
        desc: "Konsultujesz innego chorego: 86-letniego mężczyznę z ciężkim ostrym zapaleniem pęcherzyka żółciowego (stopień III wg TG18), we wstrząsie kardiogennym po niedawnym zawale serca, zdyskwalifikowanego przez anestezjologa ze znieczulenia ogólnego i operacji. Jaka procedura ratunkowa o minimalnej inwazyjności jest leczeniem z wyboru?",
        scenario: "Konsultujesz innego chorego: 86-letniego mężczyznę z ciężkim ostrym zapaleniem pęcherzyka żółciowego (stopień III wg TG18), we wstrząsie kardiogennym po niedawnym zawale serca, zdyskwalifikowanego przez anestezjologa ze znieczulenia ogólnego i operacji. Jaka procedura ratunkowa o minimalnej inwazyjności jest leczeniem z wyboru?",
        options: [
          {
            text: "Przezskórna przezwątrobowa cholecystostomia (Percutaneous Cholecystostomy - PC) pod kontrolą USG w znieczuleniu miejscowym; pozwala na odbarczenie zakażonej ropnej żółci pod ciśnieniem, opanowanie sepsy i stabilizację chorego jako pomost do ewentualnej późniejszej cholecystektomii.",
            correct: true,
            feedback: "Doskonale! Pewniak egzaminacyjny LEK: U pacjentów z ciężkim zapaleniem pęcherzyka żółciowego w stanie krytycznym (Grade III) lub z krańcowymi obciążeniami kardiologicznymi/oddechowymi uniemożliwiającymi znieczulenie ogólne, procedurą ratującą życie z wyboru jest PRZEZSKÓRNA CHOLECYSTOSTOMIA (nakłucie pęcherzyka przez miąższ wątroby pod USG i założenie drenu typu pig-tail w znieczuleniu miejscowym). Odbarcza ropotok, gasi sepsę u >90% chorych i pozwala na wyjście ze stanu krytycznego."
          },
          {
            text: "Forsowna operacja laparotomijna wbrew opinii anestezjologa.",
            correct: false,
            feedback: "Skrajne ryzyko zgonu na stole operacyjnym."
          },
          {
            text: "Zaniechanie jakichkolwiek działań i wypisanie do domu do opieki hospicyjnej.",
            correct: false,
            feedback: "Cholecystostomia przezskórna jest procedurą skuteczną i ratującą życie."
          },
          {
            text: "Podanie dożylne 10 litrów oleju lnianego.",
            correct: false,
            feedback: "Absurdalne."
          }
        ]
      },
      {
        stepNum: 8,
        title: "Krok 8: Powikłanie późne kamicy – Niedrożność żółciowa jelit (Gallstone Ileus)",
        desc: "Omawiasz z zespołem powikłania przewlekłej kamicy pęcherzykowej. Jakie rzadkie powikłanie mechaniczne rozwija się, gdy duży kamień żółciowy ulega erozji przez ścianę pęcherzyka do dwunastnicy i jak nazywa się patognomoniczna triada radiologiczna tego schorzenia?",
        scenario: "Omawiasz z zespołem powikłania przewlekłej kamicy pęcherzykowej. Jakie rzadkie powikłanie mechaniczne rozwija się, gdy duży kamień żółciowy ulega erozji przez ścianę pęcherzyka do dwunastnicy i jak nazywa się patognomoniczna triada radiologiczna tego schorzenia?",
        options: [
          {
            text: "Niedrożność żółciowa jelit (Gallstone ileus) wskutek wytworzenia przetoki pęcherzykowo-dwunastniczej i zaklinowania kamienia w końcowym odcinku jelita krętego (zastawka Bauhina); patognomoniczna triada Riglera w RTG/TK: 1) Niedrożność mechaniczna jelita cienkiego, 2) Obecność gazu w drogach żółciowych (aerobilia / pneumobilia), 3) Ektopowy kamień żółciowy w jamie brzusznej.",
            correct: true,
            feedback: "Wybitnie! Klasyczne pytanie egzaminacyjne LEK: Niedrożność żółciowa jelita (gallstone ileus): duży złóg (>2.5–3 cm) powoduje odleżynę ściany pęcherzyka i sąsiadującej dwunastnicy, tworząc przetokę (fistula cholecystoduodenalis). Kamień wpada do światła jelita, przemieszcza się i grzęźnie w najwęższym miejscu – w końcowym odcinku jelita krętego tuż przed zastawką krętniczo-kątniczą Bauhina. Triada Riglera w diagnostyce obrazowej: aerobilia (powietrze w drogach żółciowych dostające się z dwunastnicy) + cechy mechanicznej niedrożności jelita cienkiego (poziomy płynów) + uwapniony kamień w prawym dole biodrowym!"
          },
          {
            text: "Zespół Zollingera-Ellisona z triadą Whipple'a.",
            correct: false,
            feedback: "Triada Whipple'a dotyczy insulinomy i hipoglikemii, a gastrinoma to guz wydzielający gastrynę."
          },
          {
            text: "Przetoka pęcherzykowo-mózgowa z odmą czaszkową.",
            correct: false,
            feedback: "Absurdalna i anatomicznie niemożliwa opcja."
          },
          {
            text: "Kamień żółciowy wędrujący do pęcherza moczowego przez moczowód.",
            correct: false,
            feedback: "Kamień pęcherzykowy wędruje do przewodu pokarmowego, nie do układu moczowego."
          }
        ]
      }
    ];
  });

  // ==========================================
  // CASE 128: Ostre zapalenie dróg żółciowych (Cholangitis acuta)
  // ==========================================
  await upgradeCase('128_ostre_zapalenie_drog_zolciowych_cholangitis.json', (c) => {
    c.steps = [
      {
        stepNum: 1,
        title: "Krok 1: Wstępna ocena na SOR – 65-letni mężczyzna z gorączką, żółtaczką i bólem pod prawym żebrem",
        desc: "Dyżurujesz na chirurgicznym SOR. Zespół ratownictwa medycznego przywozi 65-letniego mężczyznę w stanie średnio-ciężkim. Od wczoraj pacjent ma dreszcze i wysoką gorączkę sięgającą 39.6°C, ostry ból w prawym podżebrzu, a dziś rano rodzina zauważyła intensywnie żółte zabarwienie białkówek oczu i skóry. Ponadto pacjent oddał bardzo ciemny mocz (o barwie mocnej herbaty/piwa) oraz odbarwiony, jasny stolec (jak glina). Z wywiadu: 5 lat temu przebył cholecystektomię laparoskopową z powodu kamicy. W badaniu: HR 118/min (tachykardia), RR 100/60 mmHg, temp. 39.4°C, jawna żółtaczka powłok i twardówek, bolesność uciskowa w prawym podżebrzu bez objawów otrzewnowych. Jaka jest Twoja wstępna diagnoza?",
        scenario: "Dyżurujesz na chirurgicznym SOR. Zespół ratownictwa medycznego przywozi 65-letniego mężczyznę w stanie średnio-ciężkim. Od wczoraj pacjent ma dreszcze i wysoką gorączkę sięgającą 39.6°C, ostry ból w prawym podżebrzu, a dziś rano rodzina zauważyła intensywnie żółte zabarwienie białkówek oczu i skóry. Ponadto pacjent oddał bardzo ciemny mocz (o barwie mocnej herbaty/piwa) oraz odbarwiony, jasny stolec (jak glina). Z wywiadu: 5 lat temu przebył cholecystektomię laparoskopową z powodu kamicy. W badaniu: HR 118/min (tachykardia), RR 100/60 mmHg, temp. 39.4°C, jawna żółtaczka powłok i twardówek, bolesność uciskowa w prawym podżebrzu bez objawów otrzewnowych. Jaka jest Twoja wstępna diagnoza?",
        options: [
          {
            text: "Rozpoznajesz ostre wstępujące zapalenie dróg żółciowych (Cholangitis acuta ascendens); klasyczna TRIADA CHARCOTA: 1) Wysoka gorączka z dreszczami, 2) Ból w prawym podżebrzu, 3) Żółtaczka mechaniczna (zaporowa); stan nagłego zagrożenia życia sepsą żółciową.",
            correct: true,
            feedback: "Znakomicie! Klasyczna triada Charcota (Charcot's triad): gorączka z dreszczami + ból pod prawym żebrem + żółtaczka mechaniczna (cholestaza z ciemnym moczem i odbarwionym stolcem). Występuje u 50–70% pacjentów z ostrym zapaleniem dróg żółciowych. Wynika ze współistnienia dwóch czynników: OBSTRUKCJI odpływu żółci (najczęściej kamica przewodowa – choledocholithiasis u pacjenta po cholecystektomii) oraz INFEKCJI bakteryjnej (bakterie wstępujące z dwunastnicy pod wysokim ciśnieniem przenikają do krwi przez barierę kanalikowo-naczyniową, wywołując uogólnioną bakteriemię i wstrząs septyczny)."
          },
          {
            text: "Rozpoznajesz ostre wirusowe zapalenie wątroby typu A (WZW A).",
            correct: false,
            feedback: "WZW A nie przebiega z nagłą gorączką 40°C z dreszczami i ostrym bólem kolkowym u chorego z kamicą przewodową."
          },
          {
            text: "Stawiasz rozpoznanie ostrego zapalenia pęcherzyka żółciowego.",
            correct: false,
            feedback: "Pacjent przebył cholecystektomię 5 lat temu, nie ma pęcherzyka żółciowego!"
          },
          {
            text: "Podejrzewasz malarię tropikalną.",
            correct: false,
            feedback: "Brak wywiadu pobytu w strefie endemicznej, obecny klasyczny zespół mechanicznej niedrożności dróg żółciowych."
          }
        ]
      },
      {
        stepNum: 2,
        title: "Krok 2: Zagrożenie sepsą żółciową – PENTADA REYNOLDSA",
        desc: "W 2. godzinie na SOR ciśnienie tętnicze pacjenta spada do 82/45 mmHg, nawrót kapilarny wynosi 4 sekundy, a mężczyzna staje się zdezorientowany, podsypiający i majaczy. Jak nazywa się ten 5-objawowy zespół zwiastujący sepsę żółciową i wstrząs septyczny?",
        scenario: "W 2. godzinie na SOR ciśnienie tętnicze pacjenta spada do 82/45 mmHg, nawrót kapilarny wynosi 4 sekundy, a mężczyzna staje się zdezorientowany, podsypiający i majaczy. Jak nazywa się ten 5-objawowy zespół zwiastujący sepsę żółciową i wstrząs septyczny?",
        options: [
          {
            text: "PENTADA REYNOLDSA (Reynolds' pentad): Triada Charcota (gorączka, żółtaczka, ból) PLUS 4) Wstrząs septyczny / hipotonia oraz 5) Zaburzenia świadomości (splątanie / encefalopatia); wskaźnik ostrego ropnego zapalenia dróg żółciowych o śmiertelności >50% bez natychmiastowego odbarczenia!",
            correct: true,
            feedback: "Doskonale! Pewniak egzaminacyjny LEK: Pentada Reynoldsa (Reynolds' pentad) = Triada Charcota (ból + gorączka + żółtaczka) + HIPOTONIA (wstrząs septyczny) + ZABURZENIA STANU ŚWIADOMOŚCI (splątanie, letarg). Świadczy o ostrym zaporowym ropnym zapaleniu dróg żółciowych (acute suppurative cholangitis). Ropa pod wysokim ciśnieniem (>25-30 cm H2O) w zablokowanym przewodzie żółciowym wspólnym powoduje masywny wysiew endotoksyn i bakterii Gram-ujemnych do krążenia wrotnego i ogólnego. Wymaga natychmiastowej resuscytacji i pilnego drenażu w ciągu godzin!"
          },
          {
            text: "Triada Virchowa powikłana zawałem serca.",
            correct: false,
            feedback: "Triada Virchowa dotyczy patogenezy zakrzepicy żylnej (uszkodzenie śródbłonka, zastój krwi, nadkrzepliwość)."
          },
          {
            text: "Triada Becka w tamponadzie serca.",
            correct: false,
            feedback: "Triada Becka to hipotonia, ściszenie tonów serca i poszerzenie żył szyjnych."
          },
          {
            text: "Pentada Cantrella z ektopią serca.",
            correct: false,
            feedback: "To wada wrodzona ściany klatki piersiowej i brzucha u noworodków."
          }
        ]
      },
      {
        stepNum: 3,
        title: "Krok 3: Badania laboratoryjne CITO – Profil cholestatyczny i septyczny",
        desc: "Otrzymujesz wyniki badań krwi CITO: Bilirubina całkowita 8.4 mg/dl (z przewagą bilirubiny bezpośredniej/sprzężonej 7.1 mg/dl), Fosfataza zasadowa (ALP) 420 IU/l (norma <120), GGTP 580 IU/l (norma <50), ALT 145 IU/l, AST 130 IU/l. Leukocytoza 22.8 G/l z neutrofilią 88%, Prokalcytonina 18.5 ng/ml (bardzo wysoka), Mleczany 3.8 mmol/l. Kreatynina 1.8 mg/dl. Jak interpretujesz te wyniki?",
        scenario: "Otrzymujesz wyniki badań krwi CITO: Bilirubina całkowita 8.4 mg/dl (z przewagą bilirubiny bezpośredniej/sprzężonej 7.1 mg/dl), Fosfataza zasadowa (ALP) 420 IU/l (norma <120), GGTP 580 IU/l (norma <50), ALT 145 IU/l, AST 130 IU/l. Leukocytoza 22.8 G/l z neutrofilią 88%, Prokalcytonina 18.5 ng/ml (bardzo wysoka), Mleczany 3.8 mmol/l. Kreatynina 1.8 mg/dl. Jak interpretujesz te wyniki?",
        options: [
          {
            text: "Masywna cholestaza zewnątrzwątrobowa (znaczny wzrost bilirubiny sprzężonej, ALP i GGTP z wtórnym miernym wzrostem transaminaz) powikłana ciężką sepsą bakteryjną i wstrząsem septycznym (bardzo wysoka prokalcytonina, leukocytoza, hiperlaktatemia i ostre uszkodzenie nerek).",
            correct: true,
            feedback: "Znakomicie! Klasyczny profil laboratoryjny mechanicznej cholestazy z sepsą: w przeszkodzie w odpływie żółci wskaźniki enzymów kanalikowych (ALP, GGTP) oraz bilirubina bezpośrednia rosną wielokrotnie bardziej niż transaminazy (ALT, AST). Wybitnie wysoka prokalcytonina (>18 ng/ml) oraz hiperlaktatemia 3.8 mmol/l potwierdzają inwazję bakterii Gram-ujemnych (najczęściej E. coli, Klebsiella pneumoniae, Enterococcus) i tkankową hipoperfuzję."
          },
          {
            text: "Izolowana żółtaczka hemolityczna (zespół Gilberta) bez infekcji.",
            correct: false,
            feedback: "W zespole Gilberta rośnie bilirubina wolna (pośrednia), ALP i GGTP są w normie, brak leukocytozy i gorączki."
          },
          {
            text: "Ostre zatrucie paracetamolem z martwicą hepatocytów (transaminazy >10 000 IU/l).",
            correct: false,
            feedback: "Brak wywiadu toksykologicznego, dominują enzymy cholestatyczne, a nie cytolityczne."
          },
          {
            text: "Prawidłowy profil zdrowego dorosłego człowieka.",
            correct: false,
            feedback: "Wyniki wskazują na bezpośrednie zagrożenie zgonem w sepsie żółciowej."
          }
        ]
      },
      {
        stepNum: 4,
        title: "Krok 4: Diagnostyka obrazowa – USG i poszerzenie przewodu żółciowego wspólnego (PŻW)",
        desc: "Radiolog wykonuje pilne USG jamy brzusznej przy łóżku chorego. Jaka jest górna granica normy szerokości przewodu żółciowego wspólnego (PŻW / CBD) w USG i jaki obraz potwierdza kamicę przewodową (choledocholithiasis)?",
        scenario: "Radiolog wykonuje pilne USG jamy brzusznej przy łóżku chorego. Jaka jest górna granica normy szerokości przewodu żółciowego wspólnego (PŻW / CBD) w USG i jaki obraz potwierdza kamicę przewodową (choledocholithiasis)?",
        options: [
          {
            text: "Prawidłowa szerokość PŻW wynosi do 6 mm (u osób po cholecystektomii dopuszczalna do 8–10 mm); w USG poszerzenie PŻW do 14 mm ze stożkiem cienia akustycznego od hiperechogennego złogu o średnicy 11 mm w dystalnym odcinku przewodu potwierdza kamicę przewodową blokującą spływ żółci.",
            correct: true,
            feedback: "Prawidłowo! Wymiary dróg żółciowych w USG (żelazne fakty LEK): Prawidłowy przewód żółciowy wspólny (PŻW) ma średnicę do 6 mm (rośnie o ok. 1 mm na dekadę życia po 60. r.ż., a po usunięciu pęcherzyka kompensacyjnie poszerza się do 8-10 mm). Szerokość PŻW >10 mm (tu 14 mm) jest jednoznacznym dowodem patologicznego poszerzenia zaporowego. Uwidocznienie złogu w PŻW w USG bywa trudne z powodu gazów w dwunastnicy (czułość USG w kamicy PŻW to tylko 50-70%), dlatego poszerzenie dróg żółciowych przy triadzie Charcota wystarcza do natychmiastowej interwencji!"
          },
          {
            text: "Prawidłowy PŻW ma średnicę 45 mm i nie zawiera żółci.",
            correct: false,
            feedback: "Niedorzeczne wymiary: 45 mm to szerokość aorty."
          },
          {
            text: "Złogi w drogach żółciowych w USG zawsze świecą na zielono.",
            correct: false,
            feedback: "Złogi to hiperechogenne ogniska z cieniem akustycznym."
          },
          {
            text: "W USG nie można zobaczyć dróg żółciowych.",
            correct: false,
            feedback: "USG jest podstawowym badaniem obrazowym wątroby i dróg żółciowych."
          }
        ]
      },
      {
        stepNum: 5,
        title: "Krok 5: Resuscytacja hemodynamiczna i empiryczna antybiotykoterapia",
        desc: "Przed procedurą inwazyjną pacjent wymaga natychmiastowej stabilizacji na OIT/SOR. Jakie płyny i jaką empiryczną antybiotykoterapię wdrażasz zgodnie z wytycznymi sepsy żółciowej?",
        scenario: "Przed procedurą inwazyjną pacjent wymaga natychmiastowej stabilizacji na OIT/SOR. Jakie płyny i jaką empiryczną antybiotykoterapię wdrażasz zgodnie z wytycznymi sepsy żółciowej?",
        options: [
          {
            text: "Agresywna resuscytacja płynowa krystaloidami (30 ml/kg zbilansowanego krystaloidu w ciągu pierwszych 3h), wazopresor (noradrenalina) przy braku powrotu MAP >=65 mmHg oraz natychmiastowe dożylne podanie antybiotyków o szerokim spektrum z dobrą penetracją do dróg żółciowych (np. piperacylina z tazobaktamem LUB ceftriakson + metronidazol LUB karbapenem w ciężkim wstrząsie) po pobraniu posiewów krwi.",
            correct: true,
            feedback: "Znakomicie! Protokół Surviving Sepsis Campaign w sepsie żółciowej: 1) Resuscytacja hemodynamiczna: bolusy krystaloidów celem utrzymania MAP >=65 mmHg, przy braku odpowiedzi – noradrenalina w pompie; 2) Antybiotykoterapia empiryczna: musi być podana w ciągu 1. godziny od rozpoznania sepsy! Patogeny to bakterie flory jelitowej: pałeczki Gram-ujemne (E. coli, Klebsiella, Enterobacter), beztlenowce (Bacteroides fragilis) oraz enterokoki. Lekami z wyboru są beta-laktamy z inhibitorami (piperacylina-tazobaktam) lub cefalosporyny III gen. z metronidazolem."
          },
          {
            text: "Podanie doustnej ampicyliny w tabletkach i zakaz podawania kroplówek.",
            correct: false,
            feedback: "Pacjent ma hipotonię i wstrząs, leki doustne się nie wchłoną, a brak płynów doprowadzi do zgonu."
          },
          {
            text: "Wlew 5 litrów czystego alkoholu etylowego w celu sterylizacji żółci.",
            correct: false,
            feedback: "Śmiertelne zatrucie."
          },
          {
            text: "Odstawienie antybiotyków do czasu otrzymania wyniku posiewu za 5 dni.",
            correct: false,
            feedback: "W sepsie opóźnienie antybiotyku o każdą godzinę zwiększa śmiertelność o 7-8%."
          }
        ]
      },
      {
        stepNum: 6,
        title: "Krok 6: Złoty standard dekompresji dróg żółciowych – Pilne ECPW ze sfinkterotomią",
        desc: "Jaka procedura zabiegowa jest ZŁOTYM STANDARDEM i leczeniem przyczynowym z wyboru w ostrym zapaleniu dróg żółciowych wywołanym kamicą przewodową?",
        scenario: "Jaka procedura zabiegowa jest ZŁOTYM STANDARDEM i leczeniem przyczynowym z wyboru w ostrym zapaleniu dróg żółciowych wywołanym kamicą przewodową?",
        options: [
          {
            text: "PILNA ENDOSKOPOWA CHOLANGIOPANKREATOGRAFIA WSTECZNA (ECPW / ERCP) ze sfinkterotomią endoskopową brodawki Vatera (EST), usunięciem złogów koszykiem Dormia / balonem ekstrakcyjnym lub założeniem stentu/drenu nosowo-żółciowego (ENBD) w ciągu <12–24 godzin.",
            correct: true,
            feedback: "Wybitnie! Żelazna reguła gastroenterologii i chirurgii: ECPW (ERCP) z nacięciem brodawki Vatera (endoscopic sphincterotomy - EST) i usunięciem kamieni jest złotym standardem leczenia cholangitis. Zapewnia natychmiastowe odbarczenie ciśnienia w drogach żółciowych i ewakuację ropy. W ciężkim przebiegu (stopień III wg TG18 / pentada Reynoldsa) ECPW musi być wykonane w trybie PILNYM CITO (najlepiej <12-24h)! Przy braku możliwości ECPW alternatywą jest przezskórny przezwątrobowy drenaż dróg żółciowych (PTPD)."
          },
          {
            text: "Pilna operacja otwarta z wycięciem całej wątroby.",
            correct: false,
            feedback: "Absurdalna i okaleczająca propozycja: ECPW jest zabiegiem małoinwazyjnym o 95% skuteczności."
          },
          {
            text: "Połyk magnesu neodymowego w celu przyciągnięcia kamieni żółciowych.",
            correct: false,
            feedback: "Kamienie żółciowe składają się z cholesterolu i bilirubinianu wapnia, nie mają właściwości ferromagnetycznych!"
          },
          {
            text: "Wyłącznie leczenie zachowawcze bez żadnego odbarczenia mechanicznego.",
            correct: false,
            feedback: "Śmiertelność nieodbarczonego ropnego zapalenia dróg żółciowych zbliża się do 100%!"
          }
        ]
      },
      {
        stepNum: 7,
        title: "Krok 7: Przebieg ECPW i ewakuacja ropy z PŻW",
        desc: "Endoskopista wprowadza duodenoskop do części zstępującej dwunastnicy, kaniuluje brodawkę Vatera i po nacięciu zwieracza Oddiego (sfinkterotomii) podaje kontrast. W przewodzie widoczny ubytek cienia 11 mm. Po pociągnięciu koszykiem Dormia z ujścia brodawki tryska pod ciśnieniem mętna, cuchnąca ropa zmieszana ze złogami żółciowymi. Jakie natychmiastowe korzyści hemodynamiczne przynosi to odbarczenie?",
        scenario: "Endoskopista wprowadza duodenoskop do części zstępującej dwunastnicy, kaniuluje brodawkę Vatera i po nacięciu zwieracza Oddiego (sfinkterotomii) podaje kontrast. W przewodzie widoczny ubytek cienia 11 mm. Po pociągnięciu koszykiem Dormia z ujścia brodawki tryska pod ciśnieniem mętna, cuchnąca ropa zmieszana ze złogami żółciowymi. Jakie natychmiastowe korzyści hemodynamiczne przynosi to odbarczenie?",
        options: [
          {
            text: "Natychmiastowy spadek ciśnienia w drogach żółciowych przerywa refluks bakterii i endotoksyn do krążenia wrotnego (przełamanie translokacji kanalikowo-żylnej); umożliwia to szybką stabilizację ciśnienia tętniczego, ustąpienie gorączki i wyjście ze wstrząsu septycznego.",
            correct: true,
            feedback: "Doskonale! Fizjologia odbarczenia dróg żółciowych: ciśnienie wydzielnicze żółci wynosi normalnie 10-15 cm H2O. Przy blokadzie mechanicznej ciśnienie w drogach żółciowych rośnie do 25-40 cm H2O, co niszczy połączenia ścisłe między hepatocytami i powoduje gwałtowny przetok zakażonej żółci bezpośrednio do zatok wątrobowych i żył krążenia ogólnego. Sfinkterotomia i ewakuacja ropy natychmiast obniża ciśnienie do zera, 'zamykając kurek' z bakteriami zasilający sepsę!"
          },
          {
            text: "Zabieg nie ma żadnego wpływu na sepsę i pacjent umiera natychmiast.",
            correct: false,
            feedback: "Odbarczenie ECPW jest zabiegiem o spektakularnej skuteczności ratującej życie."
          },
          {
            text: "Wytrysk ropy wywołuje natychmiastową niewydolność nerek.",
            correct: false,
            feedback: "Odprowadzenie ropy odciąża nerki i chroni przed postępem AKI."
          },
          {
            text: "Ropa w drogach żółciowych jest jałowa i nieszkodliwa.",
            correct: false,
            feedback: "Ropa w cholangitis zawiera miliardy bakterii o skrajnej wirulencji."
          }
        ]
      },
      {
        stepNum: 8,
        title: "Krok 8: Wczesne powikłania po ECPW i opieka pooperacyjna",
        desc: "Zabieg zakończył się sukcesem, złóg usunięto, a do PŻW wprowadzono stent plastikowy 10 Fr. Po 4 godzinach od ECPW pacjent skarży się na silny, opasujący ból w nadbrzuszu promieniujący do kręgosłupa, a stężenie lipazy w surowicy wzrasta 6-krotnie powyżej normy. Jakie najczęstsze powikłanie po ECPW rozpoznajesz i jak mu zapobiegać?",
        scenario: "Zabieg zakończył się sukcesem, złóg usunięto, a do PŻW wprowadzono stent plastikowy 10 Fr. Po 4 godzinach od ECPW pacjent skarży się na silny, opasujący ból w nadbrzuszu promieniujący do kręgosłupa, a stężenie lipazy w surowicy wzrasta 6-krotnie powyżej normy. Jakie najczęstsze powikłanie po ECPW rozpoznajesz i jak mu zapobiegać?",
        options: [
          {
            text: "Po-ECPW ostre zapalenie trzustki (Post-ERCP Pancreatitis - PEP); najczęstsze powikłanie procedury (występuje u 5–10% pacjentów); profilaktyka farmakologiczna polega na podaniu doodbytniczym 100 mg diklofenaku lub indometacyny bezpośrednio przed lub po zabiegu oraz agresywnej płynoterapii.",
            correct: true,
            feedback: "Wybitnie! Klasyczny pewniak z powikłań endoskopowych na LEK: Ostre zapalenie trzustki po ECPW (PEP): rozwija się wskutek mechanicznego podrażnienia ujścia przewodu Wirsunga, obrzęku brodawki lub podania kontrastu pod ciśnieniem. Standardem profilaktyki o udowodnionej skuteczności (EBM - wytyczne ESGE) jest: 1) Podanie doodbytnicze NLPZ (czopek z 100 mg diklofenaku lub indometacyny) tuż przed lub natychmiast po ECPW (zmniejsza częstość PEP o >50%); 2) Dożylna płynoterapia z Ringerem mleczanem; 3) Ewentualne założenie tymczasowego stentu do przewodu trzustkowego (profilaktyczny stent trzustkowy)."
          },
          {
            text: "Perforacja aorty piersiowej duodenoskopem.",
            correct: false,
            feedback: "Duodenoskop znajduje się w dwunastnicy, nie w klatce piersiowej."
          },
          {
            text: "Brak powikłania, wzrost lipazy 6-krotnie jest zjawiskiem fizjologicznym u każdego człowieka.",
            correct: false,
            feedback: "Lipaza >3x ggn z bólem opasującym to pewne rozpoznanie OZT."
          },
          {
            text: "Wskazanie do natychmiastowej pankreatoduodenektomii metodą Whipple'a.",
            correct: false,
            feedback: "Łagodne PEP leczy się zachowawczo (nawadnianie, leki przeciwbólowe)."
          }
        ]
      }
    ];
  });

  // ==========================================
  // CASE 129: Perforacja wrzodu trawiennego
  // ==========================================
  await upgradeCase('129_perforacja_wrzodu_trawiennego.json', (c) => {
    c.steps = [
      {
        stepNum: 1,
        title: "Krok 1: Wstępna ocena na SOR – 52-latek z nagłym bólem 'jak pchnięcie nożem'",
        desc: "Dyżurujesz na chirurgicznym SOR. Pogotowie przywozi 52-letniego mężczyznę. Pacjent dokładnie 45 minut temu, podczas oglądania telewizji, doznał nagłego, piorunującego, ekstremalnie silnego bólu w nadbrzuszu, który określa jako 'uderzenie pioruna' lub 'cios sztyletem w brzuch'. Z bólu upadł na podłogę, zlał się zimnym potem i z trudem łapie oddech. Z wywiadu: od kilku lat leczył się bez kontroli lekarskiej na 'zgagę i bóle żołądka na czczo', przewlekle nadużywając ketoprofenu i ibuprofenu z powodu bólów kręgosłupa; pali 1 paczkę papierosów dziennie. W badaniu: leży nieruchomo na plecach z podkurczonymi nogami, broni się przed jakąkolwiek próbą dotknięcia brzucha, oddycha płytko torem piersiowym (oddech unika poruszania przeponą). Tętno 122/min, RR 145/95 mmHg, skóra blada, spocona. Jaka jest Twoja natychmiastowa diagnoza kliniczna?",
        scenario: "Dyżurujesz na chirurgicznym SOR. Pogotowie przywozi 52-letniego mężczyznę. Pacjent dokładnie 45 minut temu, podczas oglądania telewizji, doznał nagłego, piorunującego, ekstremalnie silnego bólu w nadbrzuszu, który określa jako 'uderzenie pioruna' lub 'cios sztyletem w brzuch'. Z bólu upadł na podłogę, zlał się zimnym potem i z trudem łapie oddech. Z wywiadu: od kilku lat leczył się bez kontroli lekarskiej na 'zgagę i bóle żołądka na czczo', przewlekle nadużywając ketoprofenu i ibuprofenu z powodu bólów kręgosłupa; pali 1 paczkę papierosów dziennie. W badaniu: leży nieruchomo na plecach z podkurczonymi nogami, broni się przed jakąkolwiek próbą dotknięcia brzucha, oddycha płytko torem piersiowym (oddech unika poruszania przeponą). Tętno 122/min, RR 145/95 mmHg, skóra blada, spocona. Jaka jest Twoja natychmiastowa diagnoza kliniczna?",
        options: [
          {
            text: "Rozpoznajesz przedziurawienie (perforację) wrzodu trawiennego (żołądka lub dwunastnicy) powikłane ostrym chemicznym zapaleniem otrzewnej; nagły, rozdzierający ból w nadbrzuszu ('cios sztyletem') u chorego nadużywającego NLPZ jest patognomonicznym początkiem przedziurawienia wrzodu do wolnej jamy otrzewnej.",
            correct: true,
            feedback: "Znakomicie! Klasyczny, podręcznikowy początek perforacji wrzodu trawiennego: nagły, piorunujący ból 'jak pchnięcie sztyletem' (dagger-like pain). Wynika z natychmiastowego wylania się silnie kwasowej treści żołądkowej (kwas solny, pepsyna) przez otwór perforacyjny na bogato unaczynioną i unerwioną czuciowo otrzewną ścienną. Wywołuje to natychmiastowe, ostre CHEMICZNE zapalenie otrzewnej (które po 12–24h przechodzi w bakteryjne zapalenie otrzewnej). Przewlekłe stosowanie NLPZ i nikotynizm to główne czynniki ryzyka."
          },
          {
            text: "Rozpoznajesz niestrawność po posiłku i podajesz krople miętowe.",
            correct: false,
            feedback: "Kardynalny błąd! Ból jak pchnięcie sztyletem ze wstrząsem to ostry brzuch wymagający natychmiastowej interwencji chirurgicznej."
          },
          {
            text: "Stawiasz rozpoznanie kolki nerkowej lewostronnej.",
            correct: false,
            feedback: "W kolce nerkowej pacjent jest skrajnie niespokojny, 'rzuca się' po łóżku, a w zapaleniu otrzewnej leży nieruchomo, bo każdy ruch potęguje ból."
          },
          {
            text: "Podejrzewasz grypę żołądkową i odsyłasz pacjenta.",
            correct: false,
            feedback: "Zaniechanie leczenia perforacji wrzodu kończy się zgonem w sepsie otrzewnowej."
          }
        ]
      },
      {
        stepNum: 2,
        title: "Krok 2: Badanie fizykalne powłok – Patognomoniczny 'brzuch deskowaty'",
        desc: "Przystępujesz do badania palpacyjnego i opukiwania brzucha. Jaki patognomoniczny objaw palpacyjny stwierdzasz oraz jakie zjawisko występuje podczas opukiwania okolicy prawej linii środkowo-obojczykowej?",
        scenario: "Przystępujesz do badania palpacyjnego i opukiwania brzucha. Jaki patognomoniczny objaw palpacyjny stwierdzasz oraz jakie zjawisko występuje podczas opukiwania okolicy prawej linii środkowo-obojczykowej?",
        options: [
          {
            text: "1) 'Brzuch deskowaty' (défense musculaire / obrona mięśniowa mimowolna – odruchowy, skrajny skurcz mięśni prostych i skośnych brzucha nieustępujący przy próbie odwrócenia uwagi); 2) Zanik stłumienia wątrobowego (wypuk bębenkowy nad rzutem wątroby z powodu poduszki wolnego powietrza pod prawą kopułą przepony).",
            correct: true,
            feedback: "Doskonale! Pewniak egzaminacyjny z chirurgii ogólnej: 1) 'Brzuch deskowaty' (board-like rigidity) jest najsilniej wyrażonym objawem otrzewnowym w całej medycynie – wynika z chemicznego oparzenia otrzewnej kwasem solnym; powłoki brzuszne są twarde jak deska, a pacjent leży bez ruchu, oddychając wyłącznie klatką piersiową. 2) Zanik stłumienia wątrobowego (zastąpienie fizjologicznego stłumienia wątroby przez wypuk bębenkowy) wynika z obecności wolnego gazu z przedziurawionego żołądka, który zbiera się w najwyższym punkcie jamy brzusznej pod przeponą."
          },
          {
            text: "Brzuch miękki, całkowicie zapadnięty, bezbolesny.",
            correct: false,
            feedback: "W rozlanym chemicznym zapaleniu otrzewnej brzuch jest skrajnie twardy i bolesny."
          },
          {
            text: "Wypuk stłumiony nad całym brzuchem z chełbotaniem ropy w 1. minucie.",
            correct: false,
            feedback: "Wolny gaz daje wypuk bębenkowy nad wątrobą."
          },
          {
            text: "Obecność objawu Babińskiego w pępku.",
            correct: false,
            feedback: "Absurdalna opcja."
          }
        ]
      },
      {
        stepNum: 3,
        title: "Krok 3: Badanie obrazowe z wyboru – RTG przeglądowe jamy brzusznej na stojąco",
        desc: "Jakie proste, szybkie i powszechnie dostępne badanie obrazowe jest badaniem pierwszego rzutu u pacjenta z podejrzeniem perforacji narządu drążonego i jaki patognomoniczny objaw w nim poszukujesz?",
        scenario: "Jakie proste, szybkie i powszechnie dostępne badanie obrazowe jest badaniem pierwszego rzutu u pacjenta z podejrzeniem perforacji narządu drążonego i jaki patognomoniczny objaw w nim poszukujesz?",
        options: [
          {
            text: "RTG przeglądowe klatki piersiowej na stojąco (lub RTG jamy brzusznej w pozycji stojącej z ujęciem kopuł przepony); patognomonicznym objawem jest obecność WOLNEGO POWIETRZA POD KOPUŁAMI PRZEPONY w postaci charakterystycznego 'SIERPA POWIETRZA' (pneumoperitoneum; występuje u 70–80% chorych).",
            correct: true,
            feedback: "Znakomicie! Klasyczny objaw radiologiczny: RTG klatki piersiowej lub brzucha w pozycji stojącej (lub leżącej na lewym boku promieniem poziomym, jeśli chory nie może ustać) uwidacznia wolny gaz w jamie otrzewnej (pneumoperitoneum) jako pasmowaty, półksiężycowaty 'sierp powietrza' pod prawą (i/lub lewą) kopułą przepony. Uwidocznienie wolnego powietrza u pacjenta z ostrym brzuchem w 100% potwierdza przedziurawienie narządu drążonego i jest wskazaniem do natychmiastowej laparotomii/laparoskopii!"
          },
          {
            text: "Gastroskopia diagnostyczna z insuflacją dużej ilości powietrza do żołądka.",
            correct: false,
            feedback: "Kardynalny błąd śmiertelny! Gastroskopia w perforacji wrzodu jest BEZWZGLĘDNIE PRZECIWWSKAZANA – wtłaczanie powietrza rozsadza otwór perforacyjny i wdmuchuje treść żołądkową do całej jamy otrzewnej!"
          },
          {
            text: "Wlew doodbytniczy z papki barytowej.",
            correct: false,
            feedback: "Błąd śmiertelny: wyciek barytu do jamy otrzewnej wywołuje nieodwracalne, śmiertelne ziarniniakowe zapalenie otrzewnej!"
          },
          {
            text: "Rezonans magnetyczny mózgu z kontrastem.",
            correct: false,
            feedback: "Brak związku z patologią jamy brzusznej."
          }
        ]
      },
      {
        stepNum: 4,
        title: "Krok 4: Postępowanie w przypadku ujemnego wyniku RTG przy silnym podejrzeniu klinicznym",
        desc: "U ok. 20–30% chorych z małą perforacją w badaniu RTG na stojąco sierp powietrza może nie być widoczny. Jakie badanie obrazowe o 98% czułości należy wykonać w przypadku wątpliwości diagnostycznych?",
        scenario: "U ok. 20–30% chorych z małą perforacją w badaniu RTG na stojąco sierp powietrza może nie być widoczny. Jakie badanie obrazowe o 98% czułości należy wykonać w przypadku wątpliwości diagnostycznych?",
        options: [
          {
            text: "TOMOGRAFIA KOMPUTEROWA (TK) jamy brzusznej i miednicy (z kontrastem dożylnym i ewentualnie rozpuszczalnym w wodzie kontrastem doustnym Gastrografin); uwidacznia nawet mikroskopijne pęcherzyki wolnego gazu w przestrzeni okołodwunastniczej i sieci mniejszej oraz dokładne miejsce perforacji.",
            correct: true,
            feedback: "Doskonale! Gdy RTG jest ujemne, a stan kliniczny wskazuje na zapalenie otrzewnej, badaniem z wyboru jest tomografia komputerowa (TK). TK wykrywa nawet minimalne ilości wolnego gazu pozanaczyniowego (czułość >98%), obecność płynu zapalnego w okolicy opuszki dwunastnicy oraz pozwala wykluczyć ostre zapalenie trzustki, tętniaka aorty czy niedokrwienie krezki."
          },
          {
            text: "Wypisanie pacjenta do domu z zaleceniem picia kawy z mlekiem.",
            correct: false,
            feedback: "Pacjent z perforacją wrzodu umrze w ciągu 24-48 godzin bez operacji."
          },
          {
            text: "Wykonanie kolonoskopii z biopsją kątnicy.",
            correct: false,
            feedback: "Kolonoskopia nie diagnozuje wrzodu dwunastnicy i jest przeciwwskazana w ostrym brzuchu."
          },
          {
            text: "Nakłucie pępka igłą do szycia.",
            correct: false,
            feedback: "Absurdalne i szkodliwe."
          }
        ]
      },
      {
        stepNum: 5,
        title: "Krok 5: Przygotowanie ratunkowe do pilnej operacji chirurgicznej",
        desc: "Rozpoznanie perforacji jest pewne. Jakie procedury natychmiastowego przygotowania pacjenta na sali operacyjnej wdrażasz przed znieczuleniem ogólnym?",
        scenario: "Rozpoznanie perforacji jest pewne. Jakie procedury natychmiastowego przygotowania pacjenta na sali operacyjnej wdrażasz przed znieczuleniem ogólnym?",
        options: [
          {
            text: "1) Założenie zgłębnika żołądkowego (sondy Levina) do ciągłego odsysania treści żołądkowej (zmniejsza dalszy wyciek kwasu do otrzewnej!); 2) Dożylny inhibitor pompy protonowej w bolusie (np. pantoprazol 80 mg i.v.); 3) Agresywna płynoterapia krystaloidowa i.v.; 4) Antybiotykoterapia empiryczna o szerokim spektrum i.v.; 5) Cewnik moczowy Foleya do kontroli diurezy.",
            correct: true,
            feedback: "Znakomicie! Ratunkowy algorytm przedoperacyjny w perforacji wrzodu: Sonda żołądkowa (dekompresja żołądka) natychmiast hamuje wylewanie się żrącej treści przez otwór perforacyjny do otrzewnej. Wysoka dawka dożylnego IPP (np. pantoprazol/omeprazol 80 mg bolus -> wlew) natychmiast podnosi pH soku żołądkowego, redukując agresywność chemiczną wysięku. Równoległa płynoterapia i antybiotykoterapia przygotowują chorego do natychmiastowej intubacji i laparotomii."
          },
          {
            text: "Podanie pacjentowi 2 litrów kwaśnego soku pomarańczowego doustnie.",
            correct: false,
            feedback: "Śmiertelny błąd: kwas wyleje się do jamy otrzewnej, nasilając oparzenie chemiczne."
          },
          {
            text: "Zalecenie intensywnego masażu brzucha w celu wyciśnięcia gazu.",
            correct: false,
            feedback: "Rozprzestrzeni zapalenie otrzewnej na całą jamę brzuszną."
          },
          {
            text: "Zabranie pacjenta na blok bez sondy i bez antybiotyków.",
            correct: false,
            feedback: "Brak odbarczenia żołądka grozi zachłyśnięciem przy intubacji i dalszym wyciekiem."
          }
        ]
      },
      {
        stepNum: 6,
        title: "Krok 6: Złoty standard chirurgiczny – Zszycie perforacji z łatą z sieci (Zaopatrzenie sposobem Grahama / Cellana-Jonesa)",
        desc: "Chirurg wykonuje laparotomię/laparoskopię. W przedniej ścianie opuszki dwunastnicy znajduje okrągły otwór perforacyjny o średnicy 6 mm z wyciekiem żółciowo-żołądkowym. Jaka technika operacyjna jest złotym standardem zaopatrzenia perforacji wrzodu trawiennego?",
        scenario: "Chirurg wykonuje laparotomię/laparoskopię. W przedniej ścianie opuszki dwunastnicy znajduje okrągły otwór perforacyjny o średnicy 6 mm z wyciekiem żółciowo-żołądkowym. Jaka technika operacyjna jest złotym standardem zaopatrzenia perforacji wrzodu trawiennego?",
        options: [
          {
            text: "Proste zszycie otworu perforacyjnego szwami wchłanialnymi i pokrycie miejsca szycia uszypułowanym fragmentem sieci większej – klasyczna ŁATA GRAHAMA (lub modyfikacja Cellana-Jonesa) połączona z obfitym płukaniem jamy otrzewnej solą fizjologiczną (lavage) i drenażem.",
            correct: true,
            feedback: "Wybitnie! Klasyczna operacja w perforacji wrzodu (pewniak każdego egzaminu chirurgicznego LEK): Złotym standardem jest proste zaopatrzenie wrzodu: zbliżenie brzegów szwami oraz naszycie uszypułowanego fragmentu sieci większej (Graham patch / omentoplastyka). Tkanka sieci większej jest bogato unaczyniona, uszczelnia linię szwów i stymuluje gojenie. Dawne rozległe operacje resekcyjne żołądka (np. resekcja 2/3 metodą Rydygiera / Billroth II czy wagotomia) są obecnie w dobie skutecznych IPP i eradykacji H. pylori całkowicie zarzucone w ostrym dyżurze!"
          },
          {
            text: "Całkowite usunięcie żołądka (gastrektomia całkowita) z zespoleniem przełyku z odbytnicą.",
            correct: false,
            feedback: "Okaleczająca, absurdalna i anatomicznie błędna procedura."
          },
          {
            text: "Pozostawienie dziury w dwunastnicy otwartej i zaszycie samej skóry.",
            correct: false,
            feedback: "Kardynalny błąd: treść jelitowa doprowadzi do rozejścia rany, przetoki i zgonu."
          },
          {
            text: "Zaklejenie otworu gumą do żucia.",
            correct: false,
            feedback: "Niedorzeczne."
          }
        ]
      },
      {
        stepNum: 7,
        title: "Krok 7: Dalsze leczenie przyczynowe po operacji – Eradykacja Helicobacter pylori",
        desc: "Zabieg przebiegł pomyślnie. Co jest najważniejszym elementem długofalowego leczenia zachowawczego po zaopatrzeniu perforacji wrzodu trawiennego, zapobiegającym nawrotom choroby?",
        scenario: "Zabieg przebiegł pomyślnie. Co jest najważniejszym elementem długofalowego leczenia zachowawczego po zaopatrzeniu perforacji wrzodu trawiennego, zapobiegającym nawrotom choroby?",
        options: [
          {
            text: "Diagnostyka i eradykacja zakażenia HELICOBACTER PYLORI (terapia czterolekowa z bizmutem przez 14 dni) oraz bezwzględne odstawienie leków z grupy NLPZ; skuteczna eradykacja H. pylori redukuje ryzyko nawrotu wrzodu z >60% do poniżej 5%!",
            correct: true,
            feedback: "Doskonale! Kluczowa zasada gastroenterologiczna: Przedziurawienie wrzodu to powikłanie choroby wrzodowej wywołanej w >80-90% przez zakażenie Helicobacter pylori oraz stosowanie NLPZ. Samo zszycie dziury (łata Grahama) leczy jedynie ostre powikłanie mechaniczne! Po ustąpieniu ostrej fazy pacjent musi otrzymać skuteczną eradykację H. pylori (początkowo standardowa terapia poczwórna z bizmutem: IPP + bizmut + metronidazol + tetracyklina przez 14 dni) oraz kategoryczny zakaz NLPZ. Zapobiega to nawrotom wrzodów i kolejnym perforacjom."
          },
          {
            text: "Zalecenie codziennego spożywania 500 mg aspiryny na czczo.",
            correct: false,
            feedback: "Aspiryna jest silnym czynnikiem ulcerogennym, wywoła natychmiastowy nawrót wrzodu."
          },
          {
            text: "Brak jakichkolwiek zaleceń, wrzód po zszyciu nigdy nie powraca.",
            correct: false,
            feedback: "Bez eradykacji H. pylori odsetek nawrotów wrzodu przekracza 60-70%."
          },
          {
            text: "Zalecenie palenia 3 paczek papierosów dziennie.",
            correct: false,
            feedback: "Nikotyna hamuje gojenie śluzówki i syntezę prostaglandyn."
          }
        ]
      },
      {
        stepNum: 8,
        title: "Krok 8: Czynniki rokownicze – Skala Boeya w perforacji wrzodu",
        desc: "Do oceny ryzyka zgonu i powikłań pooperacyjnych u pacjentów z przedziurawionym wrzodem trawiennym chirurdzy stosują uznaną skalę Boeya. Jakie 3 czynniki ryzyka wchodzą w skład skali Boeya?",
        scenario: "Do oceny ryzyka zgonu i powikłań pooperacyjnych u pacjentów z przedziurawionym wrzodem trawiennym chirurdzy stosują uznaną skalę Boeya. Jakie 3 czynniki ryzyka wchodzą w skład skali Boeya?",
        options: [
          {
            text: "Skala Boeya (0 do 3 punktów): 1) Ciężkie schorzenia współistniejące (choroby serca, nerek, wątroby); 2) Wstrząs przedoperacyjny (hipotonia, ciśnienie skurczowe <90–100 mmHg); 3) Czas od perforacji do operacji >24 godzin; obecność wszystkich 3 czynników wiąże się ze śmiertelnością sięgającą niemal 40–50%.",
            correct: true,
            feedback: "Wybitnie! Skala Boeya (Boey score) to klasyczna skala prognostyczna w chirurgii ratunkowej: 1) Współistniejące ciężkie choroby przewlekłe (1 pkt); 2) Wstrząs przy przyjęciu (1 pkt); 3) Opóźnienie operacji powyżej 24 godzin (1 pkt). Śmiertelność rośnie lawinowo: 0 pkt – śmiertelność ok. 1-2%; 1 pkt – ok. 10%; 2 pkt – ok. 20-25%; 3 pkt – niemal 40-50%! U naszego pacjenta operacja w pierwszej dobie bez wstrząsu oznacza doskonałe rokowanie (Boey 0 pkt)."
          },
          {
            text: "Trzy czynniki: kolor oczu, wzrost pacjenta i preferencje kulinarne.",
            correct: false,
            feedback: "Absurdalna opcja."
          },
          {
            text: "Skala Boeya ocenia wyłącznie pacjentów z rakiem jelita grubego.",
            correct: false,
            feedback: "Skala Boeya została opracowana i zwalidowana ściśle dla perforacji wrzodu trawiennego."
          },
          {
            text: "Śmiertelność w perforacji wrzodu zawsze wynosi dokładnie 0%.",
            correct: false,
            feedback: "Nieleczona perforacja lub operowana ze zwłoką >24h jest stanem o wysokiej śmiertelności."
          }
        ]
      }
    ];
  });

  // ==========================================
  // CASE 130: Niedrożność jelita cienkiego ze zrostów (SBO)
  // ==========================================
  await upgradeCase('130_niedroznosc_jelita_cienkiego_zrosty.json', (c) => {
    c.steps = [
      {
        stepNum: 1,
        title: "Krok 1: Wstępna ocena na SOR – 58-letnia kobieta z bólem kolkowym, wymiotami i wzdęciem",
        desc: "Dyżurujesz na chirurgicznym SOR. Zgłasza się 58-letnia kobieta. Od 14 godzin odczuwa nasilające się, napadowe, skurczowe (kolkowe) bóle brzucha wokół pępka, pojawiające się falami co kilka minut. Bólom towarzyszą obfite, chlustające wymioty – początkowo treścią żołądkową, a od kilku godzin cuchnącą, brązowozieloną treścią jelitową (feculent vomiting). Pacjentka od wczoraj nie oddała stolca ani gazów (zatrzymanie gazów i stolca). Z wywiadu chirurgicznego: 6 lat temu przebyła laparotomię z usunięciem macicy z przydatkami, a 2 lata temu laparoskopową cholecystektomię. W badaniu: HR 110/min, RR 110/70 mmHg, skóra sucha, język obłożony, brzuch symetrycznie wzdęty, bolesny rozlanie bez twardej obrony mięśniowej, widoczna blizna po cięciu pośrodkowym podbrzusza. Jaka jest Twoja wstępna diagnoza?",
        scenario: "Dyżurujesz na chirurgicznym SOR. Zgłasza się 58-letnia kobieta. Od 14 godzin odczuwa nasilające się, napadowe, skurczowe (kolkowe) bóle brzucha wokół pępka, pojawiające się falami co kilka minut. Bólom towarzyszą obfite, chlustające wymioty – początkowo treścią żołądkową, a od kilku godzin cuchnącą, brązowozieloną treścią jelitową (feculent vomiting). Pacjentka od wczoraj nie oddała stolca ani gazów (zatrzymanie gazów i stolca). Z wywiadu chirurgicznego: 6 lat temu przebył laparotomię z usunięciem macicy z przydatkami, a 2 lata temu laparoskopową cholecystektomię. W badaniu: HR 110/min, RR 110/70 mmHg, skóra sucha, język obłożony, brzuch symetrycznie wzdęty, bolesny rozlanie bez twardej obrony mięśniowej, widoczna blizna po cięciu pośrodkowym podbrzusza. Jaka jest Twoja wstępna diagnoza?",
        options: [
          {
            text: "Rozpoznajesz mechaniczną niedrożność jelita cienkiego (Small Bowel Obstruction - SBO); klasyczna tetrada objawów niedrożności mechanicznej: 1) Ból brzucha o charakterze kolki, 2) Wymioty (treścią jelitową), 3) Wzdęcie brzucha (meteorismus), 4) Zatrzymanie gazów i stolca; przebyte operacje brzuszne jednoznacznie wskazują na zrosty otrzewnowe (adhesiones intraabdominales) jako przyczynę.",
            correct: true,
            feedback: "Znakomicie! Klasyczna tetrada objawów mechanicznej niedrożności przewodu pokarmowego: ból kolkowy, wymioty, wzdęcie brzucha i zatrzymanie stolca/gazów. Ponad 70–80% wszystkich przypadków mechanicznej niedrożności jelita cienkiego (SBO) u dorosłych wynika ze ZROSTÓW POOPERACYJNYCH (pasma łącznotkankowe po przebytych laparotomiach uciskające pętlę jelitową lub powodujące jej zagięcie/skręt). Wymioty treścią kałową/jelitową świadczą o zastoju i namnażaniu flory beztlenowej powyżej przeszkody."
          },
          {
            text: "Rozpoznajesz niestrawność po obiedzie i podajesz pacjentce napar z mięty.",
            correct: false,
            feedback: "Kardynalny błąd! Wymioty jelitowe z zatrzymaniem gazów i stolca to objaw ostrej niedrożności wymagającej natychmiastowego leczenia szpitalnego."
          },
          {
            text: "Stawiasz rozpoznanie porażennej niedrożności jelit (ileus paralyticus) bez przeszkody.",
            correct: false,
            feedback: "W niedrożności porażennej brzuch jest cichy jak cmentarz, a ból ma charakter stały, rozlany i tępy, a nie kolkowy rzutowy."
          },
          {
            text: "Podejrzewasz ciążę pozamaciczną u pacjentki po histerektomii.",
            correct: false,
            feedback: "Pacjentka ma usuniętą macicę i jajowody, ciąża jest niemożliwa."
          }
        ]
      },
      {
        stepNum: 2,
        title: "Krok 2: Badanie osłuchowe brzucha – Od dźwięków metalicznych do ciszy",
        desc: "Przykładasz stetoskop do powłok brzusznych pacjentki. Jakie zjawisko osłuchowe jest patognomoniczne dla WCZESNEJ fazy mechanicznej niedrożności jelit?",
        scenario: "Przykładasz stetoskop do powłok brzusznych pacjentki. Jakie zjawisko osłuchowe jest patognomoniczne dla WCZESNEJ fazy mechanicznej niedrożności jelit?",
        options: [
          {
            text: "Wzmożona, gwałtowna, hiperaktywna perystaltyka o charakterze dzwonienia, 'przelewania płynów' i wysokich dźwięków metalicznych (stawianie się jelit / perystaltyka walki) synchronizowana z falami bólu kolkowego.",
            correct: true,
            feedback: "Doskonale! Pewniak semiotyczny LEK: W początkowym etapie mechanicznej niedrożności mięśniówka jelita powyżej przeszkody kurczy się z ogromną siłą, próbując pokonać opór mechaniczny (tzw. perystaltyka walki). Osłuchowo słyszalne są głośne, wysokie tony metaliczne (dźwięk spadającej kropli do pustego naczynia, bulgotanie i przelewanie płynów pod ciśnieniem). W późnym etapie dochodzi do wyczerpania mięśniówki, niedokrwienia i nastaje złowroga 'cisza nad trumną' (brak perystaltyki)."
          },
          {
            text: "Całkowity brak jakichkolwiek dźwięków w jamie brzusznej (martwa cisza) od pierwszej sekundy.",
            correct: false,
            feedback: "Cisza osłuchowa występuje w zaawansowanym zapaleniu otrzewnej lub niedrożności porażennej, a nie we wczesnej mechanicznej."
          },
          {
            text: "Obecność szmeru skurczowego nad tętnicą udową.",
            correct: false,
            feedback: "Szmer nad tętnicą udową świadczy o miażdżycy naczyń kończyn dolnych."
          },
          {
            text: "Tarcie osierdziowe w prawym dole biodrowym.",
            correct: false,
            feedback: "Tarcie osierdzia występuje nad sercem w zapaleniu osierdzia."
          }
        ]
      },
      {
        stepNum: 3,
        title: "Krok 3: Badanie obrazowe I rzutu – RTG przeglądowe jamy brzusznej na stojąco",
        desc: "Zlecasz natychmiastowe wykonanie RTG przeglądowego jamy brzusznej w pozycji stojącej (lub leżącej na boku promieniem poziomym). Jaki klasyczny obraz radiologiczny potwierdza mechaniczną niedrożność jelita cienkiego?",
        scenario: "Zlecasz natychmiastowe wykonanie RTG przeglądowego jamy brzusznej w pozycji stojącej (lub leżącej na boku promieniem poziomym). Jaki klasyczny obraz radiologiczny potwierdza mechaniczną niedrożność jelita cienkiego?",
        options: [
          {
            text: "Liczne ROZSZERZONE PĘTLE JELITA CIENKIEGO (>3 cm średnicy) z widocznymi POZIOMAMI PŁYNÓW (air-fluid levels) tworzącymi obraz 'schodów' lub 'odwróconych litery U' oraz fałdami okrężnymi (kerckringi / plicae circulares) przechodzącymi przez całą szerokość światła, przy braku lub znikomej ilości gazu w okrężnicy.",
            correct: true,
            feedback: "Znakomicie! Klasyczny kanon radiologiczny niedrożności: 1) Poziomy płyn-gaz (air-fluid levels) ułożone schodkowato; 2) Rozdęte pętle jelita cienkiego (>3 cm); 3) Fałdy okrężne (fałdy Kerkringa / valvulae conniventes) – widoczne jako poprzeczne prążki przechodzące przez CAŁĄ szerokość pętli (od ściany do ściany), co pozwala odróżnić jelito cienkie od grubego (gdzie haustracje dochodzą tylko do 1/3 światła pętli); 4) Pustka gazowa w okrężnicy i odbytnicy (gaz nie przedostaje się poza mechaniczną przeszkodę w jelicie cienkim)."
          },
          {
            text: "Prawidłowy obraz z dużą ilością uformowanego stolca w odbytnicy i brakiem gazu w jelicie cienkim.",
            correct: false,
            feedback: "To obraz prawidłowego przewodu pokarmowego."
          },
          {
            text: "Obecność olbrzymiego pęcherzyka gazu wyłącznie w macicy.",
            correct: false,
            feedback: "Brak związku."
          },
          {
            text: "Cień metalicznego ciała obcego o kształcie klucza francuskiego w żołądku.",
            correct: false,
            feedback: "Brak wywiadu połknięcia ciał obcych."
          }
        ]
      },
      {
        stepNum: 4,
        title: "Krok 4: Wstępne postępowanie zachowawcze – 'Drip and Suck' (Nawodnienie i odbarczenie)",
        desc: "Pacjentka ma suchy język, tętno 110/min, wymiotuje i ma wzdęty brzuch. Jakie dwa natychmiastowe działania terapeutyczne (reguła 'Drip and Suck') stanowią fundament leczenia początkowego niedrożności mechanicznej ze zrostów?",
        scenario: "Pacjentka ma suchy język, tętno 110/min, wymiotuje i ma wzdęty brzuch. Jakie dwa natychmiastowe działania terapeutyczne (reguła 'Drip and Suck') stanowią fundament leczenia początkowego niedrożności mechanicznej ze zrostów?",
        options: [
          {
            text: "1) 'SUCK' – Założenie zgłębnika żołądkowego (sondy Levina) przez nos do żołądka z podłączeniem do czynnego odsysania (dekompresja żołądka i jelit, zmniejszenie wymiotów, ochrona przed zachłyśnięciem); 2) 'DRIP' – Agresywna dożylna płynoterapia krystaloidowa z wyrównaniem zaburzeń elektrolitowych (utrata potasu i chloru w wymiotach) oraz ścisła dieta 'nic doustnie' (NPO).",
            correct: true,
            feedback: "Wybitnie! Żelazna zasada chirurgii ostrej ('Drip and Suck' - kroplówka i odsysanie): U każdego chorego z SBO natychmiast wprowadzamy sondę nosowo-żołądkową (Levina). Odsysa ona zalegające litry płynu jelitowo-żołądkowego, natychmiast zmniejsza bolesne rozdęcie brzucha i eliminuje ryzyko zachłyśnięcia (zespołu Mendelsona). Równocześnie przetaczamy krystaloidy (pacjent traci litry płynów w tzw. 'trzeciej przestrzeni' w świetle rozdętych pętli jelitowych!). Ponad 70–80% prostych niedrożności zrostowych ustępuje pod wpływem takiego leczenia zachowawczego!"
          },
          {
            text: "Zmuszanie pacjentki do wypicia 4 litrów wody mineralnej gazowanej.",
            correct: false,
            feedback: "Kardynalny błąd: picie płynów przy zablokowanym jelicie wywoła gwałtowne pęknięcie żołądka lub masywne zachłyśnięcie."
          },
          {
            text: "Podanie dożylnie leków prokinetycznych (metoklopramidu) i wlewek przeczyszczających.",
            correct: false,
            feedback: "Śmiertelny błąd! Podanie leków stymulujących perystaltykę w przeszkodzie mechanicznej doprowadzi do pęknięcia (perforacji) ściany jelita!"
          },
          {
            text: "Zalecenie intensywnego skakania na skakance w celu rozprostowania zrostów.",
            correct: false,
            feedback: "Absurdalne i szkodliwe."
          }
        ]
      },
      {
        stepNum: 5,
        title: "Krok 5: Różnicowanie: Niedrożność prosta vs Niedrożność z zadzierzgnięciem (Strangulatio)",
        desc: "Najważniejszym obowiązkiem chirurga prowadzącego leczenie zachowawcze SBO jest ciągłe czuwanie, czy nie dochodzi do ZADZIERZGNIĘCIA (strangulacji) jelita, które wymaga natychmiastowej operacji. Jakie objawy alarmowe (red flags) świadczą o zadzierzgnięciu krezki i martwicy ściany jelita?",
        scenario: "Najważniejszym obowiązkiem chirurga prowadzącego leczenie zachowawcze SBO jest ciągłe czuwanie, czy nie dochodzi do ZADZIERZGNIĘCIA (strangulacji) jelita, które wymaga natychmiastowej operacji. Jakie objawy alarmowe (red flags) świadczą o zadzierzgnięciu krezki i martwicy ściany jelita?",
        options: [
          {
            text: "Przejście bólu kolkowego w ból STAŁY i silny, pojawienie się miejscowej obrony mięśniowej i objawu Blumberga (podrażnienie otrzewnej), narastająca tachykardia, gorączka, gwałtowny wzrost leukocytozy (z przesunięciem w lewo) oraz narastająca kwasica metaboliczna z hiperlaktatemią (kwas mlekowy >2.0 mmol/l).",
            correct: true,
            feedback: "Doskonale! Złota reguła decyzyjna w SBO (pewniak LEK): Prosta niedrożność zrostowa: ból napadowy kolkowy, brzuch miękki między falami skurczu, brak gorączki, mleczany w normie -> można bezpiecznie leczyć zachowawczo przez 48–72h. ZADZIERZGNIĘCIE (strangulacja - uciśnięcie naczyń krezkowych, martwica niedokrwienna pętli): ból staje się STAŁY, pojawia się obrona mięśniowa (otrzewnowa), gorączka, leukocytoza i HIPERLAKTATEMIA (marker martwicy jelita). Zadzierzgnięcie jest bezwzględnym wskazaniem do natychmiastowej operacji w ciągu 1-2 godzin!"
          },
          {
            text: "Utrata włosów na głowie i świąd dłoni.",
            correct: false,
            feedback: "Brak związku z patologią chirurgiczną."
          },
          {
            text: "Spadek leukocytozy do zera i ujemne CRP.",
            correct: false,
            feedback: "W martwicy tkankowej wskaźniki zapalne gwałtownie rosną."
          },
          {
            text: "Brak jakichkolwiek objawów – zadzierzgnięcie przebiega bezobjawowo.",
            correct: false,
            feedback: "Zadzierzgnięcie to stan gwałtownego bólu, zapalenia otrzewnej i wstrząsu."
          }
        ]
      },
      {
        stepNum: 6,
        title: "Krok 6: Test z kontrastem rozpuszczalnym w wodzie – Gastrografin Challenge",
        desc: "U pacjentki nie ma cech zadzierzgnięcia ani objawów otrzewnowych. Decydujesz o wykonaniu nowoczesnego protokołu diagnostyczno-terapeutycznego z użyciem rozpuszczalnego w wodzie środka cieniującego (Gastrografin challenge). Na czym polega ta procedura?",
        scenario: "U pacjentki nie ma cech zadzierzgnięcia ani objawów otrzewnowych. Decydujesz o wykonaniu nowoczesnego protokołu diagnostyczno-terapeutycznego z użyciem rozpuszczalnego w wodzie środka cieniującego (Gastrografin challenge). Na czym polega ta procedura?",
        options: [
          {
            text: "Podanie przez sondę żołądkową 50–100 ml kontrastu jodowego rozpuszczalnego w wodzie (Gastrografin) i wykonanie kontrolnego RTG jamy brzusznej po 4, 8 i 24 godzinach; jeśli kontrast dotrze do kątnicy/okrężnicy w ciągu 24h, potwierdza to ustąpienie przeszkody i skuteczność leczenia zachowawczego; ponadto hiperosmolarny Gastrografin działa leczniczo, wciągając wodę do światła jelita, zmniejszając obrzęk ściany i pobudzając perystaltykę!",
            correct: true,
            feedback: "Znakomicie! Wytyczne WSES (Bologna guidelines for SBO): 'Gastrografin challenge' to standard postępowania w niepowikłanej SBO o podwójnej roli: 1) Diagnostycznej: pojawienie się kontrastu w jelicie grubym w ciągu 4–24h ma >95% wartość predykcyjną pełnego ustąpienia niedrożności bez operacji! Brak przejścia kontrastu do kątnicy po 24h jest wskazaniem do zabiegu operacyjnego; 2) Terapeutycznej: Gastrografin jest silnie hiperosmolarny (ciągnie płyn z obrzękniętej ściany jelita do światła, zmniejsza ucisk zrostu i stymuluje perystaltykę, przyspieszając odblokowanie)."
          },
          {
            text: "Wstrzyknięcie 1 litra płynnego cementu przez odbyt.",
            correct: false,
            feedback: "Niedorzeczne i śmiertelne."
          },
          {
            text: "Podanie kontrastu barytowego doustnie w ilości 3 litrów.",
            correct: false,
            feedback: "Kardynalny błąd: baryt w niedrożności ulega zagęszczeniu (kamienie barytowe), a w razie perforacji wywołuje śmiertelne zapalenie otrzewnej!"
          },
          {
            text: "Test z gastrografiną polega na płukaniu spojówek oka roztworem kontrastu.",
            correct: false,
            feedback: "Kontrast podaje się przez sondę do żołądka."
          }
        ]
      },
      {
        stepNum: 7,
        title: "Krok 7: Kwalifikacja do leczenia operacyjnego – Uwolnienie zrostów (Adhesiolysis)",
        desc: "W 24. godzinie od podania Gastrografiny w kontrolnym RTG kontrast zatrzymał się w pętli jelita czczego i nie przeszedł do okrężnicy, a z sondy żołądkowej nadal odsysa się >800 ml treści jelitowej. Kwalifikujesz pacjentkę do operacji. Na czym polega zabieg chirurgiczny?",
        scenario: "W 24. godzinie od podania Gastrografiny w kontrolnym RTG kontrast zatrzymał się w pętli jelita czczego i nie przeszedł do okrężnicy, a z sondy żołądkowej nadal odsysa się >800 ml treści jelitowej. Kwalifikujesz pacjentkę do operacji. Na czym polega zabieg chirurgiczny?",
        options: [
          {
            text: "Laparotomia lub laparoskopia z uwolnieniem pasma zrostowego uciskającego jelito (adhesiolysis); ocena żywotności uwolnionej pętli jelitowej (barwa różowa, powrót perystaltyki i tętna w tętniczkach krezkowych po obłożeniu ciepłą solą fizjologiczną); w przypadku nieodwracalnej martwicy – resekcja martwiczego odcinka jelita z zespoleniem koniec do końca.",
            correct: true,
            feedback: "Doskonale! Zasady chirurgicznego leczenia niedrożności zrostowej: Wskazanie do operacji to brak poprawy po 48–72h leczenia zachowawczego lub zatrzymanie gastrografiny. Chirurg delikatnie przecina pasmo zrostowe (adhezjoliza). Kluczowa jest ocena żywotności jelita po odbarczeniu: jeśli jelito z sinego staje się różowe, pojawia się perystaltyka i widoczne tętno w krezce – jelito jest żywe i pozostawia się je nienaruszone. Jeśli pętla pozostaje czarna, wiotka i bez tętna (martwica) – wykonuje się odcinkową resekcję z zespoleniem jelitowym."
          },
          {
            text: "Wycięcie całego przewodu pokarmowego od przełyku do odbytu.",
            correct: false,
            feedback: "Absurdalna i śmiertelna propozycja."
          },
          {
            text: "Założenie dodatkowych 50 zrostów nylonowych w celu usztywnienia jelit.",
            correct: false,
            feedback: "Zrosty to przyczyna choroby, celem jest ich przecięcie, a nie tworzenie nowych!"
          },
          {
            text: "Podwiązanie tętnicy krezkowej górnej grubą nicią.",
            correct: false,
            feedback: "Doprowadziłoby do martwicy całego jelita cienkiego i połowy grubego."
          }
        ]
      },
      {
        stepNum: 8,
        title: "Krok 8: Profilaktyka zrostów otrzewnowych w chirurgii",
        desc: "Podczas zamykania powłok brzusznych chirurg omawia zasady zapobiegania powstawaniu zrostów pooperacyjnych w przyszłości. Jakie metody redukują ryzyko ponownego zrostowego SBO?",
        scenario: "Podczas zamykania powłok brzusznych chirurg omawia zasady zapobiegania powstawaniu zrostów pooperacyjnych w przyszłości. Jakie metody redukują ryzyko ponownego zrostowego SBO?",
        options: [
          {
            text: "Delikatne obchodzenie się z tkankami (atraumatyczna technika Halsteda), unikanie wysychania otrzewnej (częste zwilżanie solą), dokładna hemostaza (krew w otrzewnej stymuluje włóknienie), stosowanie rękawic bezpudrowych oraz miejscowych barier przeciwzrostowych (błon lub żeli z kwasu hialuronowego i karboksymetylocelulozy – np. Seprafilm, Adept).",
            correct: true,
            feedback: "Wybitnie! Profilaktyka zrostów pooperacyjnych: Zrosty tworzą się w wyniku uszkodzenia komórek mezotelium otrzewnej, krwawienia, obecności ciał obcych (puder z rękawic, włókna z gazików) i niedokrwienia. Metody zapobiegania: 1) Technika laparoskopowa (mniejszy uraz powłok i mniejsze wysuszanie); 2) Dokładna hemostaza i płukanie otrzewnej; 3) Bariery przeciwzrostowe (Seprafilm / żele z hialuronianem) tworzące fizyczną barierę oddzielającą gojące się powierzchnie w krytycznych pierwszych 5-7 dniach po operacji."
          },
          {
            text: "Wysypanie do jamy otrzewnej 1 kg talku kosmetycznego.",
            correct: false,
            feedback: "Talk wywołuje ciężkie ziarniniakowe zapalenie i potężne zrosty zarośnięcia jamy brzusznej!"
          },
          {
            text: "Zakaz ruszania się z łóżka przez 12 miesięcy po operacji.",
            correct: false,
            feedback: "Wczesne uruchomienie pacjenta (ERAS) sprzyja powrotowi perystaltyki i zapobiega zrostom."
          },
          {
            text: "Zrosty otrzewnowe nie istnieją i są mitem literackim.",
            correct: false,
            feedback: "Zrosty to najczęstsza przyczyna niedrożności jelit na świecie."
          }
        ]
      }
    ];
  });

  // ==========================================
  // CASE 131: Skręt esicy (Volvulus sigmoidei)
  // ==========================================
  await upgradeCase('131_skret_esicy_volvulus.json', (c) => {
    c.steps = [
      {
        stepNum: 1,
        title: "Krok 1: Wstępna ocena na SOR – 74-letni pensjonariusz DPS z asymetrycznym wzdęciem brzucha",
        desc: "Dyżurujesz na chirurgicznym SOR. Zespół ratownictwa przywozi 74-letniego mężczyznę, pensjonariusza Domu Pomocy Społecznej. Pacjent leżący, z chorobą Parkinsona i przewlekłymi zaparciami stolca (wypróżnienia raz na 7–10 dni, przewlekle leczony lekami psychotropowymi). Od 2 dni brzuch pacjenta zaczął gwałtownie rosnąć, a od 36 godzin mężczyzna nie oddał ani gazów, ani stolca. Dziś pojawiły się nudności i wymioty treścią żołądkową. W badaniu przedmiotowym: HR 105/min, RR 120/75 mmHg, brzuch jest potężnie, olbrzymio i ASYMETRYCZNIE wzdęty – w lewym śródbrzuszu i prawym nadbrzuszu widoczna jest dęta, napięta jak bęben pętla jelitowa. Przy opukiwaniu wypuk jaskrawo bębenkowy, brzuch mało bolesny, bez twardej obrony mięśniowej. W badaniu per rectum: bańka odbytnicy jest całkowicie pusta i ziejąca. Jaka jest Twoja wstępna diagnoza?",
        scenario: "Dyżurujesz na chirurgicznym SOR. Zespół ratownictwa przywozi 74-letniego mężczyznę, pensjonariusza Domu Pomocy Społecznej. Pacjent leżący, z chorobą Parkinsona i przewlekłymi zaparciami stolca (wypróżnienia raz na 7–10 dni, przewlekle leczony lekami psychotropowymi). Od 2 dni brzuch pacjenta zaczął gwałtownie rosnąć, a od 36 godzin mężczyzna nie oddał ani gazów, ani stolca. Dziś pojawiły się nudności i wymioty treścią żołądkową. W badaniu przedmiotowym: HR 105/min, RR 120/75 mmHg, brzuch jest potężnie, olbrzymio i ASYMETRYCZNIE wzdęty – w lewym śródbrzuszu i prawym nadbrzuszu widoczna jest dęta, napięta jak bęben pętla jelitowa. Przy opukiwaniu wypuk jaskrawo bębenkowy, brzuch mało bolesny, bez twardej obrony mięśniowej. W badaniu per rectum: bańka odbytnicy jest całkowicie pusta i ziejąca. Jaka jest Twoja wstępna diagnoza?",
        options: [
          {
            text: "Rozpoznajesz skręt esicy (Volvulus sigmoidei); mechaniczna niedrożność jelita grubego w pętli zamkniętej (closed-loop obstruction); typowa manifestacja u osoby starszej, unieruchomionej z przewlekłymi zaparciami, dolichokolon (wydłużoną esicą) i asymetrycznym olbrzymim rozdęciem powłok brzusznych.",
            correct: true,
            feedback: "Znakomicie! Klasyczny profil kliniczny skrętu esicy (sigmoid volvulus): stanowi ok. 60–75% wszystkich skrętów przewodu pokarmowego. Czynniki predysponujące to: podeszły wiek, unieruchomienie, choroby neuropsychiatryczne (choroba Parkinsona, otępienie, leki neuroleptyczne i antycholinergiczne wywołujące atonię jelit), przewlekłe zaparcia prowadzące do powstania wydłużonej, rozciągniętej esicy (dolichosigma) na wąskiej podstawie krezki. Skręt wokół osi krezki tworzy niedrożność w pętli zamkniętej (closed loop) z potężnym rozdęciem pętli gazami fermentacyjnymi."
          },
          {
            text: "Rozpoznajesz ostre zapalenie wyrostka robaczkowego u geriatrycznego pacjenta.",
            correct: false,
            feedback: "Brak cech zapalenia wyrostka; olbrzymie asymetryczne rozdęcie brzucha bez stolca i gazów to niedrożność esicy."
          },
          {
            text: "Stawiasz rozpoznanie pęknięcia wrzodu żołądka.",
            correct: false,
            feedback: "Brak nagłego bólu 'jak pchnięcie sztyletem', brak brzucha deskowatego."
          },
          {
            text: "Uznajesz, że to zwykła ciąża urojona u 74-letniego mężczyzny.",
            correct: false,
            feedback: "Absurdalna opcja."
          }
        ]
      },
      {
        stepNum: 2,
        title: "Krok 2: Badanie radiologiczne – Patognomoniczny objaw 'ziarna kawy'",
        desc: "Wykonujesz natychmiastowe RTG przeglądowe jamy brzusznej w pozycji stojącej / leżącej. Jaki patognomoniczny objaw radiologiczny o 100% swoistości uwidacznia się w skręcie esicy?",
        scenario: "Wykonujesz natychmiastowe RTG przeglądowe jamy brzusznej w pozycji stojącej / leżącej. Jaki patognomoniczny objaw radiologiczny o 100% swoistości uwidacznia się w skręcie esicy?",
        options: [
          {
            text: "Objaw 'ZIARNA KAWY' (coffee bean sign) lub objaw 'zgiętej dętki wewnętrznej' (bent inner tube sign) – potężnie rozdęta gazem pętla esicy o kształcie litery U, sięgająca od miednicy aż pod przeponę, z widoczną pośrodku grubą linią utworzoną przez stykające się przyśrodkowe ściany pętli (odpowiadającą bruździe ziarna kawy).",
            correct: true,
            feedback: "Doskonale! Pewniak egzaminacyjny z radiologii chirurgicznej LEK: Objaw 'ziarna kawy' (coffee bean sign) jest patognomoniczny dla skrętu esicy! Olbrzymia pętla esicy wypełniona gazem zagina się ku górze, często sięgając prawego podżebrza lub pod przeponę. Zbliżone do siebie przyśrodkowe ściany rozdętego ramienia wstępującego i zstępującego tworzą podwójną, ciemniejszą pręgę pośrodku pętli, która do złudzenia przypomina bruzdę na ziarnie kawy. Brak gazu w odbytnicy."
          },
          {
            text: "Objaw tarczy strzelniczej w prawym dole biodrowym.",
            correct: false,
            feedback: "Objaw tarczy strzelniczej (target sign) występuje w USG we wgłobieniu jelita."
          },
          {
            text: "Objaw wiszącej kropli w oczodole.",
            correct: false,
            feedback: "To objaw złamania dna oczodołu (blow-out fracture)."
          },
          {
            text: "Całkowicie czarny obraz RTG bez żadnych struktur anatomicznych.",
            correct: false,
            feedback: "Błąd techniczny aparatu, nie objaw choroby."
          }
        ]
      },
      {
        stepNum: 3,
        title: "Krok 3: Patofizjologia pętli zamkniętej i prawo Laplace'a",
        desc: "Dlaczego skręt esicy jest stanem bezpośredniego zagrożenia perforacją i martwicą oraz w jakim miejscu ściana przewodu pokarmowego ulega przedziurawieniu w pierwszej kolejności zgodnie z prawem Laplace'a?",
        scenario: "Dlaczego skręt esicy jest stanem bezpośredniego zagrożenia perforacją i martwicą oraz w jakim miejscu ściana przewodu pokarmowego ulega przedziurawieniu w pierwszej kolejności zgodnie z prawem Laplace'a?",
        options: [
          {
            text: "Skręt esicy tworzy niedrożność w pętli zamkniętej (zamknięte oba końce pętli), co prowadzi do ucisku naczyń żylnych krezki, zawału krwotocznego i zgorzeli samej esicy; ponadto przy wydolnej zastawce krętniczo-kątniczej (zastawka Bauhina zapobiega cofaniu gazu do jelita cienkiego) dochodzi do potężnego rozdęcia KĄTNICY, która zgodnie z prawem Laplace'a pęka jako pierwsza, gdy jej średnica przekroczy 10–12 cm!",
            correct: true,
            feedback: "Wybitnie! Klasyczna patofizjologia chirurgiczna LEK: 1) W skręcie esicy dochodzi do zadzierzgnięcia naczyń krezkowych esicy – najpierw zablokowany zostaje odpływ żylny, ściana ulega obrzękowi, a następnie dochodzi do zawału i zgorzeli pętli. 2) Drugi mechanizm: jeśli zastawka Bauhina jest szczelna (wydolna u 80% ludzi), gazy i płyn z jelita cienkiego wpadają do jelita grubego, ale nie mogą cofnąć się wstecz. Całe jelito grube staje się pętlą zamkniętą. Zgodnie z prawem Laplace'a (napięcie ściany T = P x r): im większy promień cylindra (r), tym większe napięcie ściany przy tym samym ciśnieniu. Ponieważ KĄTNICA ma największą średnicę w całym przewodzie pokarmowym, to właśnie KĄTNICA jest najbardziej narażona na pęknięcie (perforacja z rozdęcia / diastatic perforation), gdy jej średnica przekroczy 10–12 cm!"
          },
          {
            text: "Prawo Laplace'a mówi, że jelita nie mogą pęknąć pod żadnym ciśnieniem.",
            correct: false,
            feedback: "Prawo Laplace'a tłumaczy fizyczny mechanizm pęknięcia kątnicy w zamkniętej niedrożności jelita grubego."
          },
          {
            text: "Pierwsze pęka zawsze gardło z powodu krzyku pacjenta.",
            correct: false,
            feedback: "Niedorzeczne."
          },
          {
            text: "Skręt esicy jest stanem całkowicie bezpiecznym i nie grozi perforacją.",
            correct: false,
            feedback: "Nieleczony skręt esicy prowadzi do martwicy, perforacji i kałowego zapalenia otrzewnej o śmiertelności >50%."
          }
        ]
      },
      {
        stepNum: 4,
        title: "Krok 4: Wykluczenie zgorzeli i zapalenia otrzewnej przed interwencją",
        desc: "Przed wyborem metody leczenia musisz ocenić, czy u pacjenta doszło już do martwicy (zgorzeli) pętli esicy lub perforacji. Jakie objawy świadczą o zgorzeli i stanowią BEZWZGLĘDNE PRZECIWWSKAZANIE do próby endoskopowego odbarczenia?",
        scenario: "Przed wyborem metody leczenia musisz ocenić, czy u pacjenta doszło już do martwicy (zgorzeli) pętli esicy lub perforacji. Jakie objawy świadczą o zgorzeli i stanowią BEZWZGLĘDNE PRZECIWWSKAZANIE do próby endoskopowego odbarczenia?",
        options: [
          {
            text: "Objawy zapalenia otrzewnej (obrona mięśniowa, objaw Blumberga), niestabilność hemodynamiczna / wstrząs septyczny, gorączka, kwasica mleczanowa, wyciek krwi z odbytu lub obecność wolnego powietrza w jamie otrzewnej w RTG/TK.",
            correct: true,
            feedback: "Znakomicie! Bezwzględne przeciwwskazania do próby zachowawczego/endoskopowego odkręcenia skrętu esicy: cechy martwicy jelita, niedokrwienia lub perforacji! Jeśli pacjent ma objawy otrzewnowe (brzuch twardy, bolesny), wstrząs, podwyższone mleczany czy krwisty wysięk w odbytnicy – ściana jelita jest martwicza i próba wprowadzenia endoskopu doprowadzi do natychmiastowego przedziurawienia i kałowego zapalenia otrzewnej. W takich sytuacjach jedynym wyborem jest pilna operacja!"
          },
          {
            text: "Obecność siwych włosów u 74-letniego pacjenta.",
            correct: false,
            feedback: "Wiek nie jest przeciwwskazaniem do endoskopii."
          },
          {
            text: "Prawidłowe ciśnienie tętnicze 120/80 mmHg.",
            correct: false,
            feedback: "Stabilność hemodynamiczna pozwala na bezpieczną próbę endoskopowej dewolwulacji."
          },
          {
            text: "Brak gazów od 1 godziny.",
            correct: false,
            feedback: "Zatrzymanie gazów jest objawem niedrożności, a nie przeciwwskazaniem."
          }
        ]
      },
      {
        stepNum: 5,
        title: "Krok 5: Złoty standard leczenia I rzutu – Endoskopowa dewolwulacja i dekompresja",
        desc: "U pacjenta brzuch jest miękki, brak objawów otrzewnowych, parametry zapalne i kwas mlekowy w normie (brak cech zgorzeli). Jaka procedura jest METODĄ PIERWSZEGO WYBORU w niepowikłanym skręcie esicy wg wytycznych ASGE i WSES?",
        scenario: "U pacjenta brzuch jest miękki, brak objawów otrzewnowych, parametry zapalne i kwas mlekowy w normie (brak cech zgorzeli). Jaka procedura jest METODĄ PIERWSZEGO WYBORU w niepowikłanym skręcie esicy wg wytycznych ASGE i WSES?",
        options: [
          {
            text: "SIGMOIDOSKOPIA SZTYWNA LUB GIĘTKA z ostrożnym wprowadzeniem endoskopu powyżej miejsca skrętu (dewolwulacja endoskopowa), odessaniem gazu i płynnego stolca oraz POZOSTAWIENIEM RURKI REKTALNEJ (sondy doodbytniczej / flatus tube) na 24–48 godzin w celu utrzymania dekompresji.",
            correct: true,
            feedback: "Doskonale! Pewniak egzaminacyjny LEK: Metodą pierwszego rzutu u stabilnego chorego bez cech zgorzeli jest ENDOSKOPOWA DECOMPRESJA I DEWOLWULACJA (endoscopic derotation/detorsion). Endoskopista pod kontrolą wzroku wprowadza sigmoidoskop, odnajduje spiralne zwężenie (twist) i ostrożnie przechodzi przez nie do światła dętej pętli – w tym momencie następuje spektakularny wytrysk litrów uwięzionego gazu i cuchnącego stolca, a brzuch momentalnie opada! Kluczowy szczegół: powyżej miejsca skrętu obowiązkowo pozostawia się miękką rurkę doodbytniczą (flatus tube) na 24-48h, aby zapobiec natychmiastowemu ponownemu skrętowi. Skuteczność wynosi 75–90%!"
          },
          {
            text: "Podanie pacjentowi 5 tabletek bisakodylu i wlewki z mydła.",
            correct: false,
            feedback: "Śmiertelny błąd: leki przeczyszczające przy zablokowanej esicy doprowadzą do pęknięcia jelita!"
          },
          {
            text: "Natychmiastowa resekcja wątroby metodą resekcji anatomicznej.",
            correct: false,
            feedback: "Wątroba jest prawidłowa, problem dotyczy esicy."
          },
          {
            text: "Nakłucie dętego brzucha widelcem stołowym.",
            correct: false,
            feedback: "Absurdalne i bezpośrednio zagrażające życiu."
          }
        ]
      },
      {
        stepNum: 6,
        title: "Krok 6: Problem nawrotowości – Dlaczego sama dewolwulacja nie wystarcza?",
        desc: "Endoskopowa dewolwulacja przebiegła wzorowo, z esicy odessano 3 litry gazu, a brzuch pacjenta stał się całkowicie płaski i miękki. Pozostawiono rurkę doodbytniczą. Dlaczego pacjent NIE MOŻE zostać wypisany do domu bez dalszego planowania chirurgicznego?",
        scenario: "Endoskopowa dewolwulacja przebiegła wzorowo, z esicy odessano 3 litry gazu, a brzuch pacjenta stał się całkowicie płaski i miękki. Pozostawiono rurkę doodbytniczą. Dlaczego pacjent NIE MOŻE zostać wypisany do domu bez dalszego planowania chirurgicznego?",
        options: [
          {
            text: "Odsetek NAWROTÓW po samej derotacji endoskopowej jest dramatycznie wysoki i wynosi 50–90%; dlatego po udanej dewolwulacji i przygotowaniu chorego zaleca się ELEKTYWNĄ RESEKCJĘ ESICY (sigmoidektomię) w trakcie tej samej hospitalizacji, aby zapobiec nawrotowi ze zgorzelą i perforacją.",
            correct: true,
            feedback: "Wybitnie! Kluczowe zasady strategii leczenia skrętu esicy: Dewolwulacja endoskopowa jest zabiegiem ratunkowym i odbarczającym, ale NIE LECZY anatomicznej przyczyny choroby (długiej, wiotkiej pętli esicy na wąskiej krezce). Bez leczenia operacyjnego u ponad 60–80% chorych dochodzi do ponownego skrętu (często w ciągu kilku dni lub tygodni), a kolejny epizod wiąże się ze znacznie wyższym ryzykiem martwicy i zgonu. Dlatego standardem u pacjentów kwalifikujących się do operacji jest wykonanie planowej, odroczonej resekcji esicy (po przygotowaniu jelita) podczas tego samego pobytu w szpitalu."
          },
          {
            text: "Ponieważ pacjent musi przebywać w szpitalu do końca życia.",
            correct: false,
            feedback: "Nieprawda: celem jest planowe zaopatrzenie chirurgiczne i powrót do domu."
          },
          {
            text: "Dewolwulacja endoskopowa daje 100% trwałe wyleczenie i nawroty nie występują.",
            correct: false,
            feedback: "Fałsz: bez operacji nawrót występuje u większości pacjentów."
          },
          {
            text: "Konieczne jest natychmiastowe usunięcie żołądka.",
            correct: false,
            feedback: "Żołądek jest zdrowy."
          }
        ]
      },
      {
        stepNum: 7,
        title: "Krok 7: Postępowanie w przypadku zgorzeli lub niepowodzenia endoskopii – Operacja Hartmanna",
        desc: "Co należy zrobić, jeśli w trakcie sigmoidoskopii śluzówka esicy okazuje się czarna, podbiegnięta krwawo i martwicza (zgorzel esicy) LUB gdy derotacja endoskopowa jest niemożliwa ze względów anatomicznych? Jaki zabieg operacyjny jest metodą z wyboru w trybie ostrym?",
        scenario: "Co należy zrobić, jeśli w trakcie sigmoidoskopii śluzówka esicy okazuje się czarna, podbiegnięta krwawo i martwicza (zgorzel esicy) LUB gdy derotacja endoskopowa jest niemożliwa ze względów anatomicznych? Jaki zabieg operacyjny jest metodą z wyboru w trybie ostrym?",
        options: [
          {
            text: "Pilna laparotomia i OPERACJA HARTMANNA: resekcja zgorzelinowo zmienionej pętli esicy, zamknięcie na głucho kikuta odbytnicy w miednicy oraz wyłonienie bliższego końca okrężnicy w postaci jednolufowej stomii końcowej (kolostomii lewostronnej); unika się pierwotnego zespolenia w warunkach zgorzeli i zapalenia otrzewnej!",
            correct: true,
            feedback: "Doskonale! Klasyczna operacja ratunkowa w chirurgii jelita grubego (pewniak każdego LEK): W ostrym dyżurze przy zgorzeli jelita, perforacji lub kałowym zapaleniu otrzewnej wykonywanie pierwotnego zespolenia jelitowego jest obarczone ogromnym ryzykiem nieszczelności i rozejścia szwów. Złotym standardem ratującym życie jest OPERACJA HARTMANNA: wycięcie chorego odcinka (esicy), ślepe zaszycie kikuta odbytnicy (pozostawionego w miednicy) i wyłonienie końca okrężnicy zstępującej jako stomii (kolostomii). Po kilku miesiącach u stabilnego chorego można rozważyć odtworzenie ciągłości przewodu pokarmowego."
          },
          {
            text: "Wykonanie zespolenia omijającego między żołądkiem a esicą bez wycinania martwicy.",
            correct: false,
            feedback: "Pozostawienie martwiczego jelita w brzuchu doprowadzi do zgonu we wstrząsie septycznym w ciągu kilku godzin."
          },
          {
            text: "Zaszycie powłok brzusznych i podanie loperamidu.",
            correct: false,
            feedback: "Loperamid w niedrożności i martwicy jest śmiertelnym błędem."
          },
          {
            text: "Wstrzyknięcie formaliny do jamy brzusznej.",
            correct: false,
            feedback: "Toksyczne oparzenie chemiczne i zgon."
          }
        ]
      },
      {
        stepNum: 8,
        title: "Krok 8: Różnicowanie: Skręt esicy vs Skręt kątnicy (Cecal Volvulus)",
        desc: "Rezydent pyta o różnice między skrętem esicy a skrętem kątnicy (cecal volvulus). Jakie cechy demograficzne i radiologiczne odróżniają skręt kątnicy od skrętu esicy?",
        scenario: "Rezydent pyta o różnice między skrętem esicy a skrętem kątnicy (cecal volvulus). Jakie cechy demograficzne i radiologiczne odróżniają skręt kątnicy od skrętu esicy?",
        options: [
          {
            text: "Skręt kątnicy występuje u młodszych pacjentów (30–50 lat, często po wcześniejszych operacjach z zaburzeniem fiksacji kątnicy); w RTG rozdęta kątnica przypomina 'przecinek' lub 'nerkę' i przemieszcza się do LEWEGO GÓRNEGO kwadrantu lub śródbrzusza (podczas gdy w skręcie esicy pętla wychodzi z miednicy i celuje w prawy górny kwadrant); w skręcie kątnicy derotacja endoskopowa jest NIESKUTECZNA i metodą z wyboru jest natychmiastowa operacja (hemikolektomia prawostronna lub cecopeksja).",
            correct: true,
            feedback: "Wybitnie! Znakomite chirurgiczne pytanie różnicujące: 1) Skręt esicy: pacjenci w podeszłym wieku (>70 lat), z dolichosigmą i zaparciami; pętla ma kształt ziarna kawy wychodzącego z miednicy; derotacja endoskopowa skuteczna w 80%. 2) Skręt kątnicy (cecal volvulus): młodsi dorośli (często kobiety 30-50 lat, biegacze długodystansowi, po zabiegach miednicznych z brakiem zrośnięcia prawej krezki do tylnej ściany brzucha - caecum mobile). W RTG pętla ma kształt przecinka/nerki i leży w LEWYM górnym kwadrancie. Endoskopia w skręcie kątnicy jest nieskuteczna (<20%) i grozi perforacją – leczeniem z wyboru jest natychmiastowa operacja (hemikolektomia prawostronna)!"
          },
          {
            text: "Kątnica i esica to ta sama część jelita, brak jakichkolwiek różnic.",
            correct: false,
            feedback: "Kątnica to początkowy odcinek jelita grubego po prawej stronie, a esica to odcinek końcowy po lewej."
          },
          {
            text: "Skręt kątnicy leczy się wyłącznie aspiryną.",
            correct: false,
            feedback: "Leczenie skrętu kątnicy jest wyłącznie chirurgiczne."
          },
          {
            text: "W skręcie kątnicy nigdy nie dochodzi do niedrożności jelit.",
            correct: false,
            feedback: "Skręt kątnicy daje ciężką niedrożność mechaniczną z rozdęciem jelita cienkiego."
          }
        ]
      }
    ];
  });

  console.log("Cases 126-131 upgraded!");
}

run().catch(console.error);

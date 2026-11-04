const fs = require('fs');
const path = require('path');
const { encryptStringAes } = require('./encrypt_case.js');

const MASTER_KEY = '@LEKSzymon28111999';
const CASES_DIR = path.join(__dirname, '..', 'cases');

console.log("Generating Case 132: Uwięźnięta przepuklina pachwinowa...");

async function saveCase(caseData) {
  const filePath = path.join(CASES_DIR, caseData.filename);
  const jsonStr = JSON.stringify(caseData, null, 2);
  const encrypted = await encryptStringAes(jsonStr, MASTER_KEY);
  fs.writeFileSync(filePath, JSON.stringify(encrypted, null, 2), 'utf8');
  console.log(`[SAVED] Case #${caseData.id}: ${caseData.filename} (LEK Qs: ${caseData.lekQuestions.length}, Steps: ${caseData.steps.length}, Flashcards: ${caseData.flashcards.length})`);
}

const case132 = {
  id: 132,
  filename: "132_uwieznieta_przepuklina_pachwinowa.json",
  dept: "Chirurgia ogólna",
  shortTitle: "62-letni Kazimierz – Napięty, bolesny guz w prawej pachwinie, brak odprowadzalności i wymioty (Uwięźnięta przepuklina pachwinowa)",
  diagnosisTitle: "Uwięźnięta przepuklina pachwinowa prawostronna skośna ze strangulacją (zadzierzgnięciem) pętli jelita cienkiego i mechaniczną niedrożnością przewodu pokarmowego",
  vitals: [
    { label: "Badanie prawej pachwiny", val: "Bolesny, twardy guz", sub: "Brak odprowadzalności do jamy brzusznej (uwięźnięcie)", status: "vital-crit" },
    { label: "Częstość akcji serca (HR)", val: "108/min", sub: "Tachykardia z silnego bólu i niedokrwienia pętli", status: "vital-warn" },
    { label: "Kwas mlekowy (mleczany)", val: "2,5 mmol/l", sub: "Podwyższone (wczesne niedokrwienie tkanek)", status: "vital-crit" },
    { label: "Objawy niedrożności", val: "Wymioty i brak gazów", sub: "Mechaniczna niedrożność jelita cienkiego", status: "vital-crit" }
  ],
  vitalsObj: { hr: 108, bp: "135/82", spo2: 97, rr: 19, temp: 37.8, gcs: 15 },
  story: `<p><strong>Pacjent:</strong> 62-letni Kazimierz, rencista, zgłosił się w trybie pilnym na szpitalny oddział ratunkowy z powodu gwałtownego, silnego bólu w prawej pachwinie, pojawienia się twardego, skrajnie bolesnego guza, którego nie jest w stanie odprowadzić, oraz narastających od kilku godzin nudności, wymiotów i wzdęcia brzucha.</p><p><strong>Wywiad chorobowy:</strong> Pacjent od około 4 lat miał świadomość obecności 'miękkiego guzka' w prawej pachwinie, który uwypuklał się przy kaszlu lub dźwiganiu, a w pozycji leżącej samoistnie znikał lub dawał się łatwo odprowadzić palcami do brzucha. Otrzymał skierowanie na planową operację, którą odkładał z obawy przed zabiegiem. Dzisiaj około godziny 09:00 podczas przenoszenia ciężkiego worka z cementem poczuł nagłe 'pociągnięcie' i piekący ból w pachwinie. W pachwinie pojawił się duży guz schodzący do moszny, który stał się kamienistej twardości i nie daje się odprowadzić mimo wielokrotnych, bolesnych prób uciskania przez chorego. Po około 3 godzinach dołączył kurczowy ból w dole brzucha, dwukrotne obfite wymioty treścią żołądkowo-żółciową oraz zatrzymanie oddawania gazów. Od momentu uwięźnięcia minęło już ponad 7 godzin.</p><p><strong>Badanie przedmiotowe na SOR:</strong> Mężczyzna cierpiący, blady, leżący z podkurczonym prawym udem (pozycja przeciwbólowa). W prawej okolicy pachwinowej widoczne asymetryczne uwypuklenie przechodzące wzdłuż kanału pachwinowego w kierunku prawego worka mosznowego o wymiarach ok. 7 x 5 cm. Skóra nad guzem jest lekko ocieplona, zaczerwieniona i napięta. Przy próbie delikatnej palpacji pacjent gwałtownie cofa się z powodu silnego bólu – opór jest twardo-elastyczny, napięty, całkowicie nieodprowadzalny do jamy brzusznej (irreducible); brak objawu kaszlowego (impuls kaszlowy zniesiony przez zaciśnięte wrota). Brzuch wzdęty w śródbrzuszu, bolesny palpacyjnie nad spojeniem łonowym, bez objawów rozlanego zapalenia otrzewnej. Osłuchowo nad jamą brzuszną perystaltyka o wysokim, metalicznym tonie (cechy niedrożności mechanicznej). Lewa pachwina i wrota pępkowe całkowicie wolne. Jądro prawe wyczuwalne poniżej guza, niepowiększone.</p>`,
  labs: {
    "Morfologia i parametry zapalne": [
      { name: "Leukocyty (WBC)", val: "14,6 tys./µl", norm: "4,0 - 10,0 tys./µl", flag: "CRIT_HIGH" },
      { name: "Granulocyty obojętnochłonne (NEUT)", val: "82 % (12,0 tys./µl)", norm: "45 - 70 %", flag: "CRIT_HIGH" },
      { name: "Białko C-reaktywne (CRP)", val: "42,0 mg/l", norm: "< 5,0 mg/l", flag: "HIGH" },
      { name: "Kwas mlekowy (mleczany)", val: "2,5 mmol/l", norm: "0,5 - 2,0 mmol/l", flag: "CRIT_HIGH" },
      { name: "Hemoglobina (Hb)", val: "14,8 g/dl", norm: "13,0 - 17,0 g/dl", flag: "NORMAL" },
      { name: "Płytki krwi (PLT)", val: "235 tys./µl", norm: "150 - 450 tys./µl", flag: "NORMAL" }
    ],
    "Biochemia i elektrolity": [
      { name: "Kreatynina w surowicy", val: "1,05 mg/dl", norm: "0,70 - 1,20 mg/dl", flag: "NORMAL" },
      { name: "Mocznik", val: "38 mg/dl", norm: "15 - 45 mg/dl", flag: "NORMAL" },
      { name: "Sód (Na+)", val: "138 mmol/l", norm: "135 - 145 mmol/l", flag: "NORMAL" },
      { name: "Potas (K+)", val: "4,0 mmol/l", norm: "3,5 - 5,1 mmol/l", flag: "NORMAL" },
      { name: "Kinaza fosfokreatynowa (CPK)", val: "245 U/l", norm: "< 190 U/l", flag: "HIGH" }
    ],
    "Pilne USG okolicy pachwinowej i moszny": [
      { name: "Worek przepuklinowy prawy", val: "Wychodzi przez pierścień pachwinowy głęboki (bocznie od naczyń nabrzusznych dolnych), schodzi do worka mosznowego. Wewnątrz worka obecna zaciśnięta pętla jelita cienkiego o pogrubiałej ścianie (5 mm) i rąbkiem płynu w worku", norm: "Brak przepukliny", flag: "CRIT_HIGH" },
      { name: "Unaczynienie ściany jelita (Color Doppler)", val: "Znaczne osłabienie sygnału naczyniowego w ścianie uwięźniętej pętli w porównaniu z pętlami w jamie brzusznej (zagrożenie martwicą niedokrwienną)", norm: "Prawidłowy przepływ w ścianie", flag: "CRIT_HIGH" },
      { name: "Jądro prawe i powrózek", val: "Prawidłowe unaczynienie jądra prawego, bez cech skrętu", norm: "Prawidłowe", flag: "NORMAL" }
    ]
  },
  steps: [
    {
      title: "Krok 1: Różnicowanie uwięźnięcia (incarceratio) od zadzierzgnięcia (strangulatio)",
      text: "Pacjent ma bolesny, twardy guz w prawej pachwinie nieodprowadzalny od 7 godzin, z zaczerwienieniem skóry, leukocytozą 14,6 tys. oraz mleczanami 2,5 mmol/l. Czym różni się uwięźnięcie od zadzierzgnięcia przepukliny?",
      options: [
        "Uwięźnięcie to niemożność odprowadzenia zawartości worka do jamy brzusznej; zadzierzgnięcie to uciśnięcie naczyń krwionośnych krezki w zaciśniętych wrotach, prowadzące bezpośrednio do niedokrwienia, martwicy i perforacji uwięzionego narządu",
        "Uwięźnięcie dotyczy wyłącznie żołądka, a zadzierzgnięcie wyłącznie wyrostka robaczkowego",
        "W zadzierzgnięciu nie ma bólu, a w uwięźnięciu ból jest zawsze łagodny",
        "Zadzierzgnięcie to zakażenie wirusowe skóry nad przepukliną bez ucisku naczyń"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>To kardynalne pojęcia w chirurgii przepuklin:</strong><br>- <strong>Uwięźnięcie (incarceratio):</strong> mechaniczny brak możliwości odprowadzenia zawartości worka przepuklinowego do jamy brzusznej (przepuklina nieodprowadzalna / irreducible).<br>- <strong>Zadzierzgnięcie (strangulatio):</strong> powikłanie uwięźnięcia, w którym zaciśnięte wrota uciskają naczynia krezkowe (najpierw żyły, potem tętnice). Prowadzi to do niedokrwienia, zawału ściany jelita, martwicy zgorzelinowej i perforacji w ciągu kilku godzin. Podwyższone mleczany, zaczerwienienie skóry i tachykardia u Kazimierza jednoznacznie wskazują na strangulację!",
        "❌ BŁĄD! <strong>Zawartością worka w pachwinie najczęściej jest jelito cienkie lub sieć większa,</strong> rzadko żołądek.",
        "❌ BŁĄD! <strong>Zadzierzgnięcie wiąże się ze skrajnym, rozdzierającym bólem niedokrwiennym!</strong>",
        "❌ BŁĄD! <strong>Strangulacja to zjawisko naczyniowe,</strong> a nie zakażenie dermatologiczne."
      ]
    },
    {
      title: "Krok 2: Kategoryczny zakaz ręcznego odprowadzania (Taxis)",
      text: "Młody rezydent pyta: 'Może podamy pacjentowi leki uspokajające i spróbujemy siłą wepchnąć ten guz do brzucha, żeby uniknąć operacji w nocy?' Jak brzmi bezwzględna zasada chirurgiczna dotycząca ręcznego odprowadzania (taxis) w tej sytuacji?",
      options: [
        "Ręczne odprowadzanie (taxis) jest BEZWZGLĘDNIE PRZECIWWSKAZANE! Czas uwięźnięcia przekracza 4-6 godzin, obecne są cechy zapalenia skóry i podwyższone mleczany; próba odprowadzenia grozi pęknięciem martwiczego jelita lub śmiertelnym 'odprowadzeniem w masie' (reductio en masse)",
        "Zgadzasz się, energiczne ugniatanie guza przez 30 minut to standardowe postępowanie",
        "Należy nakłuć guz grubą igłą przez skórę i odessać powietrze przed odprowadzeniem",
        "Odprowadzanie ręczne wolno wykonać dopiero po podaniu doustnego leku przeczyszczającego"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Odprowadzanie ręczne (taxis) jest bezwzględnie zakazane, gdy uwięźnięcie trwa dłużej niż 4-6 godzin LUB występują objawy zapalenia/strangulacji (zaczerwienienie skóry, leukocytoza, wysokie mleczany, objawy otrzewnowe).</strong> Próba siłowego odprowadzenia może doprowadzić do rozerwania martwiczej ściany jelita w jamie brzusznej (kałowe zapalenie otrzewnej) lub tzw. <em>odprowadzenia w masie (reductio en masse)</em> – wepchnięcia worka wraz z zaciśniętym pierścieniem uwięźnięcia do przestrzeni przedotrzewnowej, co daje pozory sukcesu, podczas gdy jelito nadal ulega martwicy w zaciśniętym pierścieniu!",
        "❌ BŁĄD! <strong>Siłowe ugniatanie zadzierzgniętej pętli jelitowej to błąd w sztuce lekarskiej</strong> grożący perforacją.",
        "❌ BŁĄD! <strong>Nakłuwanie guza igłą spowoduje przebicie ściany jelita</strong> i skażenie tkanek krocza.",
        "❌ BŁĄD! <strong>Środki przeczyszczające są bezwzględnie przeciwwskazane w niedrożności mechanicznej.</strong>"
      ]
    },
    {
      title: "Krok 3: Różnicowanie anatomiczne: Przepuklina pachwinowa skośna vs prosta",
      text: "W badaniu USG stwierdzono, że worek przepuklinowy wychodzi bocznie od naczyń nabrzusznych dolnych i schodzi wzdłuż powrózka nasiennego do moszny. Jaki to typ przepukliny i dlaczego więźnie znacznie częściej niż przepuklina prosta?",
      options: [
        "Jest to przepuklina pachwinowa skośna (pośrednia / boczna); wnika przez wąski pierścień pachwinowy głęboki i biegnie kanałem pachwinowym, co z powodu wąskiej szypuły sprzyja zaklinowaniu i uwięźnięciu narządów",
        "Jest to przepuklina prosta, która zawsze schodzi do moszny i ma najwęższe wrota",
        "Jest to przepuklina udowa, która u mężczyzn zawsze przechodzi do worka mosznowego",
        "Jest to przepuklina kulszowa o szerokich wrotach"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>To fundamentalny podział anatomiczny na LEK:</strong><br>- <strong>Przepuklina skośna (lateral / indirect):</strong> wnika do kanału pachwinowego przez <strong>pierścień pachwinowy głęboki (bocznie od naczyń nabrzusznych dolnych)</strong>, biegnie w powrózku nasiennym i może schodzić do moszny (przepuklina mosznowa). Z powodu wąskiej, włóknistej szyi worka cechuje się wysokim ryzykiem uwięźnięcia.<br>- <strong>Przepuklina prosta (medial / direct):</strong> uwypukla się bezpośrednio przez osłabioną ścianę tylną kanału (trójkąt Hesselbacha, <strong>przyśrodkowo od naczyń nabrzusznych dolnych</strong>). Ma szerokie wrota, rzadko schodzi do moszny i niezwykle rzadko ulega uwięźnięciu.",
        "❌ BŁĄD! <strong>Przepuklina prosta wychodzi przyśrodkowo od naczyń i rzadko schodzi do moszny.</strong>",
        "❌ BŁĄD! <strong>Przepuklina udowa wnika poniżej więzadła pachwinowego do kanału udowego</strong> i nie przechodzi do moszny.",
        "❌ BŁĄD! <strong>Przepuklina kulszowa wychodzi przez otwór kulszowy na pośladku.</strong>"
      ]
    },
    {
      title: "Krok 4: Przepuklina Richtera – pułapka diagnostyczna",
      text: "Lekarz dyżurny przypomina o rzadkiej odmianie uwięźnięcia – przepuklinie Richtera. Na czym polega ta postać przepukliny i dlaczego stanowi śmiertelnie niebezpieczną pułapkę diagnostyczną?",
      options: [
        "Polega na uwięźnięciu jedynie fragmentu obwodu ściany jelita (przeciwległego do przyczepu krezki); światło jelita pozostaje częściowo drożne, więc brak jest pełnych objawów niedrożności (pacjent oddaje gazy i stolec!), podczas gdy uwięźnięta ściana ulega cichej martwicy i perforacji",
        "Polega na uwięźnięciu wyłącznie wyrostka robaczkowego w worku przepuklinowym",
        "Jest to wrodzona przepuklina pępowinowa z brakiem powłok brzusznych",
        "Polega na uwięźnięciu pęcherza moczowego bez obecności jelit"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Przepuklina Richtera (Richter's hernia) to uwięźnięcie tylko części ściany jelita (tzw. uwięźnięcie przyścienne).</strong> Ponieważ całe światło przewodu pokarmowego nie jest zablokowane, u pacjenta NIE występują klasyczne objawy mechanicznej niedrożności (brak wymiotów, zachowane oddawanie gazów i stolca!). Uśpiona czujność lekarza prowadzi do przeoczenia uwięźnięcia, podczas gdy uciśnięty fragment ściany jelita ulega martwicy, pęka i powoduje nagłe zapalenie otrzewnej i ropowicę krocza.",
        "❌ BŁĄD! <strong>Uwięźnięcie wyrostka robaczkowego w przepuklinie pachwinowej to przepuklina Amyanda</strong> (a w udowej – przepuklina de Garengeota).",
        "❌ BŁĄD! <strong>Wrodzona przepuklina sznura pępowinowego to omphalocele.</strong>",
        "❌ BŁĄD! <strong>Obecność pęcherza w ścianie worka to przepuklina ze ześlizgiem (sliding hernia).</strong>"
      ]
    },
    {
      title: "Krok 5: Przygotowanie przedoperacyjne i antybiotykoterapia",
      text: "Kazimierz zostaje zakwalifikowany do natychmiastowej operacji w trybie ostrym. Jakie leczenie farmakologiczne i przygotowanie należy wdrożyć bezpośrednio przed zabiegiem?",
      options: [
        "Ścisłe NPO, dekompresja żołądka sondą, intensywna płynoterapia krystaloidowa wyrównująca wolemię, analgezja parenteralna oraz dożylna antybiotykoterapia o szerokim spektrum (np. Cefazolina z Metronidazolem lub Amoksycylina z kwasem klawulanowym)",
        "Podanie leków obniżających ciśnienie i wypisanie do domu do czasu planowej operacji",
        "Zalecenie zjedzenia lekkiego posiłku przed narkozą",
        "Podanie dożylne heparyny w pełnej dawce terapeutycznej bez badań krzepnięcia"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Uwięźnięta przepuklina ze strangulacją to pilny stan chirurgiczny.</strong> Przygotowanie obejmuje: status NPO, zgłębnik żołądkowy (ochrona przed zachłyśnięciem w narkozie), dożylne krystaloidy (<span class='dose-pill'>PWE 1000-1500 ml i.v.</span>), analgezję oraz <strong>okołooperacyjną antybiotykoterapię dożylną</strong> (<span class='dose-pill'>Cefazolina 2 g i.v.</span> + <span class='dose-pill'>Metronidazol 500 mg i.v.</span> lub <span class='dose-pill'>Amoksycylina z kwasem klawulanowym 1,2 g i.v.</span>), która jest bezwzględnie konieczna przy podejrzeniu niedokrwienia i translokacji bakteryjnej.",
        "❌ BŁĄD! <strong>Odesłanie do domu to bezpośrednie zagrożenie zgonem z powodu martwicy jelita.</strong>",
        "❌ BŁĄD! <strong>Spożycie posiłku przed znieczuleniem ogólnym grozi zachłyśnięciem treścią pokarmową (zespół Mendelsona).</strong>",
        "❌ BŁĄD! <strong>Pełna antykoagulacja bezpośrednio przed pilną operacją wywołałaby niekontrolowany krwotok śródoperacyjny.</strong>"
      ]
    },
    {
      title: "Krok 6: Śródoperacyjna ocena żywotności jelita po otwarciu worka",
      text: "Chirurg otwiera worek przepuklinowy – wypływa mętny, krwisty płyn, a w worku znajduje się ciemnowiśniowa, obrzęknięta pętla jelita krętego zaciśnięta w pierścieniu. Jakie postępowanie śródoperacyjne decyduje o pozostawieniu lub wycięciu pętli jelita?",
      options: [
        "Nacięcie pierścienia uwięźnięcia (odbarczenie), podanie 100% tlenu przez anestezjologa oraz okładanie pętli ciepłymi serwetami z 0,9% NaCl przez 10-15 minut; jeśli jelito odzyska różowy kolor, powróci perystaltyka i tętno w krezce – odprowadza się je do brzucha; brak powrotu tych cech nakazuje resekcję martwiczego odcinka jelita z zespoleniem",
        "Natychmiastowe wrzucenie ciemnej pętli do jamy brzusznej bez jej oglądania",
        "Podanie do światła jelita roztworu jodyny",
        "Zamknięcie powłok bez dotykania jelita i wybudzenie chorego"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Podstawową zasadą w chirurgii uwięźniętej przepukliny jest ocena żywotności narządu po odbarczeniu wrot.</strong> Po przecięciu zaciśniętego pierścienia pętlę delikatnie wyciąga się, aby dokładnie obejrzeć miejsca bezpośredniego ucisku ('bruzdy uwięźnięcia' – najczęstsze miejsce martwicy!). Następnie ogrzewa się jelito ciepłą solą fizjologiczną przez 10-15 minut przy saturacji 100%. Trzy kardynalne cechy żywotności to: 1. Powrót różowej barwy ściany, 2. Wyczuwalne tętno w tętniczkach brzeżnych krezki, 3. Powrót samoistnych skurczów perystaltycznych. Brak tych cech oznacza nieodwracalną martwicę i bezwzględne wskazanie do resekcji jelita.",
        "❌ BŁĄD! <strong>Wepchnięcie niedokrwionego jelita bez oceny grozi wylaniem kału do otrzewnej</strong> i śmiercią chorego.",
        "❌ BŁĄD! <strong>Jodyna zniszczy komórki nabłonka i spowoduje martwicę chemiczną.</strong>",
        "❌ BŁĄD! <strong>Pozostawienie zaciśniętego jelita to zaniechanie leczenia.</strong>"
      ]
    },
    {
      title: "Krok 7: Wybór metody plastyki kanału pachwinowego a skażenie pola (siatka vs szwy)",
      text: "Pętla jelita po 10 minutach ogrzania w pełni odzyskała różowy kolor, tętno i perystaltykę (jelito żywotne, brak resekcji, pole operacyjne czyste). Jaką technikę plastyki przepukliny należy zastosować wg wytycznych HerniaSurge?",
      options: [
        "Beznapięciową plastykę z użyciem siatki syntetycznej (metoda Lichtensteina) – stanowi złoty standard leczenia przepuklin pachwinowych u dorosłych w czystym polu operacyjnym bez perforacji",
        "Plastykę wyłącznie szwami pojedynczymi bez siatki, ponieważ siatki syntetyczne są w Polsce zakazane",
        "Pozostawienie ubytku bez zaopatrzenia z nadzieją na zarośnięcie",
        "Wycięcie jądra i zaszycie kanału pachwinowego na głucho u każdego mężczyzny"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Współczesnym złotym standardem naprawy przepukliny pachwinowej u dorosłych mężczyzn (wytyczne HerniaSurge) jest beznapięciowa plastyka z użyciem płaskiej siatki syntetycznej metodą Lichtensteina.</strong> Zapewnia najniższy odsetek nawrotów (<1-2%) i najmniejszy ból pooperacyjny. U Kazimierza jelito było żywotne, nie było perforacji ani resekcji, a więc pole operacyjne było czyste (brak skażenia bakteryjnego), co pozwala na bezpieczne wszczepienie siatki polipropylenowej. (Gdyby doszło do resekcji zgorzelinowego jelita i skażenia kałowego, preferuje się metody tkankowe/szewne, np. Shouldice, aby uniknąć zakażenia ciała obcego).",
        "❌ BŁĄD! <strong>Siatki syntetyczne są standardem na całym świecie.</strong>",
        "❌ BŁĄD! <strong>Brak plastyki gwarantuje natychmiastowy nawrót przepukliny.</strong>",
        "❌ BŁĄD! <strong>Orchidektomia (usunięcie jądra) jest okaleczającym zabiegiem,</strong> wykonywanym wyłącznie w martwicy jądra lub zaawansowanych nawrotowych olbrzymich przepuklinach za zgodą chorego."
      ]
    },
    {
      title: "Krok 8: Profilaktyka powikłań pooperacyjnych i zalecenia przy wypisie",
      text: "Pacjent pomyślnie zniósł operację (Lichtenstein po stronie prawej), perystaltyka powróciła w 1. dobie pooperacyjnej. Jakie zalecenia dotyczące rekonwalescencji i ograniczenia wysiłku fizycznego należy przekazać choremu przy wypisie?",
      options: [
        "Unikanie dźwigania ciężarów (>5 kg) oraz intensywnego wysiłku fizycznego przez 4-6 tygodni, zapobieganie zaparciom (dieta bogatoresztkowa, odpowiednie nawodnienie), unikanie przewlekłego kaszlu oraz kontrola rany pooperacyjnej za 7-10 dni (usunięcie szwów)",
        "Zalecenie podnoszenia ciężarów powyżej 30 kg od 2. doby pooperacyjnej w celu wzmocnienia mięśni brzucha",
        "Leżenie w łóżku bez ruchu przez 6 miesięcy",
        "Zakaz spożywania jakichkolwiek płynów przez miesiąc"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>W procesie gojenia i wbudowywania się siatki syntetycznej (fibroplazja i synteza kolagenu) kluczowe jest unikanie gwałtownych skoków ciśnienia śródbrzusznego.</strong> Pacjent powinien unikać dźwigania ciężarów (>5 kg) i forsownych ćwiczeń przez 4-6 tygodni. Niezwykle ważna jest profilaktyka zaparć (unikanie parcia na stolec) oraz leczenie przewlekłego kaszlu i przerostu prostaty (czynników zwiększających ciśnienie śródbrzuszne).",
        "❌ BŁĄD! <strong>Dźwiganie ciężarów tuż po operacji spowoduje zerwanie szwów mocujących siatkę i wczesny nawrót przepukliny!</strong>",
        "❌ BŁĄD! <strong>Wczesna mobilizacja jest kluczem do uniknięcia zakrzepicy żył głębokich;</strong> 6 miesięcy bezruchu doprowadziłoby do powikłań zatorowych.",
        "❌ BŁĄD! <strong>Ograniczenie płynów nasiliłoby zaparcia i odwodnienie.</strong>"
      ]
    }
  ],
  pathoNodes: [
    {
      badge: "Wrota przepukliny",
      title: "Wniknięcie pętli przez pierścień głęboki",
      short: "Wzrost ciśnienia śródbrzusznego przy dźwiganiu",
      detail: "Gwałtowny skok ciśnienia w jamie brzusznej (tłocznia brzuszna) wpycha pętlę jelita cienkiego do worka przepukliny skośnej. Jelito przechodzi przez pierścień pachwinowy głęboki wzdłuż powrózka nasiennego.",
      target: "Pierścień pachwinowy głęboki i powrózek",
      drugTarget: "<span class='dose-pill'>Pilna herniotomia</span> chirurgiczne nacięcie i poszerzenie zaciśniętych wrót"
    },
    {
      badge: "Zastój naczyniowy",
      title: "Kompresja naczyń krezkowych (Strangulatio)",
      short: "Blokada odpływu żylnego i masywny obrzęk ściany",
      detail: "Sztywne włókniste wrota zaciskają żyły krezkowe o cienkich ścianach. Krew tętnicza nadal napływa pod wyższym ciśnieniem, co prowadzi do przekrwienia biernego, wynaczynień krwotocznych i uwięźnięcia w mechanizmie zamkniętej pętli.",
      target: "Żyły i tętniczki krezki jelita krętego",
      drugTarget: "<span class='dose-pill'>Cefazolina 2 g i.v.</span> + <span class='dose-pill'>Metronidazol 500 mg i.v.</span> profilaktyka bakteriemii"
    },
    {
      badge: "Zawał śródścienny",
      title: "Zawał krwotoczny i martwica zgorzelinowa",
      short: "Zablokowanie przepływu tętniczego i niedotlenienie",
      detail: "Wzrost ciśnienia śródściennego przewyższa ciśnienie skurczowe w tętniczkach. Ściana jelita sinieje, dochodzi do apoptozy enterocytów, załamania bariery śluzówkowej i wzrostu stężenia mleczanów we krwi.",
      target: "Bariera śluzówkowa i enterocyty",
      drugTarget: "<span class='dose-pill'>Ciepłe okłady z soli fizjologicznej</span> test rewaskularyzacji śródoperacyjnej"
    },
    {
      badge: "Rekonstrukcja ściany",
      title: "Beznapięciowa plastyka powięziowa",
      short: "Wzmocnienie tylnej ściany kanału pachwinowego",
      detail: "Po zaopatrzeniu zawartości worka konieczna jest rekonstrukcja osłabionej powięzi poprzecznej. Wszczepienie siatki syntetycznej indukuje fibroplazję, tworząc trwałą bliznę kolagenową bez napięcia tkanek.",
      target: "Tylna ściana kanału pachwinowego",
      drugTarget: "<span class='dose-pill'>Plastyka metodą Lichtensteina</span> wszczepienie siatki polipropylenowej"
    }
  ],
  diffTable: {
    title: "⚔️ Tabela Różnicowa: Uwięźnięta przepuklina pachwinowa vs Inne ostre stany w pachwinie i mosznie",
    headers: ["Cecha kliniczna", "Uwięźnięta przepuklina pachwinowa", "Skręt jądra (Torsio testis)", "Ostre zapalenie najądrza (Epididymitis)", "Uwięźnięta przepuklina udowa", "Zapalenie węzłów chłonnych pachwinowych"],
    rows: [
      ["Lokalizacja i początek", "Guz w pachwinie schodzący wzdłuż kanału do moszny, nagły po wysiłku", "Nagły, potworny ból w mosznie u nastolatka/młodego mężczyzny, bez guza w pachwinie", "Stopniowo narastający ból moszny w ciągu 2-3 dni, dysuria, gorączka", "Twardy ból i mały guz poniżej więzadła pachwinowego (w kanale udowym), częściej u kobiet", "Powiększone, bolesne węzły w pachwinie, rana/infekcja na kończynie dolnej"],
      ["Odprowadzalność do brzucha", "Całkowity brak odprowadzalności (uwięzienie), bolesność przy próbie", "Nie dotyczy – zmiana w mosznie", "Nie dotyczy – powiększone najądrze", "Całkowity brak odprowadzalności; skrajnie wąskie wrota", "Niezmienne, brak kanału przepuklinowego"],
      ["Objawy brzuszne / niedrożność", "Częste wymioty, kurczowy ból brzucha, zatrzymanie gazów i stolca (SBO)", "Brak niedrożności jelit (możliwe odruchowe nudności)", "Całkowity brak objawów niedrożności", "Bardzo wczesna mechaniczna niedrożność jelita cienkiego", "Brak objawów brzusznych"],
      ["Objaw Prehna", "Ujemny (podniesienie moszny nie zmniejsza bólu w pachwinie)", "Ujemny (podniesienie jądra NIE łagodzi bólu, a może go nasilać)", "DODATNI (uniesienie moszny przynosi wyraźną ulgę w bólu)", "Ujemny", "Ujemny"],
      ["Obraz w USG Doppler", "Pętla jelita z perystaltyką w worku przepuklinowym, jądro prawidłowe", "Brak przepływu tętniczego w miąższu jądra w opcji Color Doppler!", "Wzmożony przepływ (hiperemia) w obrzękniętym najądrzu i jądrze", "Worek przepuklinowy w dole owalnym, przyśrodkowo od żyły udowej", "Pakiety powiększonych, zapalnych węzłów chłonnych z zachowaną wnęką"],
      ["Leczenie pierwszego rzutu", "Pilna operacja: herniotomia, ocena jelita, plastyka Lichtensteina", "PILNA operacja w ciągu 6 h: derotacja jądra i orchidopeksja obustronna", "Antybiotykoterapia celowana (np. ceftriakson + doksycyklina), uniesienie moszny, NLPZ", "Pilna operacja w trybie ostrym (dostęp naddolny lub naddolno-udowy)", "Antybiotykoterapia empiryczna, leczenie ogniska pierwotnego na nodze"]
    ]
  },
  dutySummary: {
    overview: "Przepukliny pachwinowe stanowią ok. 75% wszystkich przepuklin jamy brzusznej. Uwięźnięcie (incarceratio) jest najgroźniejszym powikłaniem ostrym, w którym dochodzi do zaklinowania zawartości worka (najczęściej jelita cienkiego lub sieci większej). Jeśli dojdzie do uciśnięcia naczyń krezkowych, rozwija się zadzierzgnięcie (strangulatio) grożące martwicą zgorzelinową jelita w ciągu kilku godzin. Stan ten wymaga natychmiastowego leczenia operacyjnego.",
    diagnostics: "1. Badanie fizykalne okolicy pachwinowej i moszny w pozycji leżącej i stojącej: ocena obecności nieodprowadzalnego, twardego, bolesnego guza i zniesienia impulsu kaszlowego.<br>2. Ocena cech strangulacji (zadzierzgnięcia): zaczerwienienie i obrzęk skóry nad guzem, gorączka, tachykardia, wysokie leukocyty i mleczany.<br>3. Badanie USG okolicy pachwinowej w opcji Color Doppler – uwidocznienie pętli jelita w worku i ocena przepływu naczyniowego w jej ścianie.<br>4. Przeglądowe RTG jamy brzusznej lub TK brzucha – potwierdzenie mechanicznej niedrożności jelita cienkiego (SBO).<br>5. KATEGORYCZNY ZAKAZ RĘCZNEGO ODPROWADZANIA (TAXIS) przy uwięźnięciu trwającym >4-6 h!",
    drugsAndDoses: "1. Profilaktyka antybiotykowa okołooperacyjna (pojedyncza dawka i.v. 30-60 min przed cięciem):<br>   - <span class='dose-pill'>Cefazolina 2 g i.v.</span> + <span class='dose-pill'>Metronidazol 500 mg i.v.</span> LUB<br>   - <span class='dose-pill'>Amoksycylina z kwasem klawulanowym 1,2 g i.v.</span>.<br>2. Płynoterapia krystaloidowa dożylna: <span class='dose-pill'>Płyn wieloelektrolitowy (PWE) 1000-1500 ml i.v.</span> celem wyrównania wolemii.<br>3. Analgezja parenteralna: <span class='dose-pill'>Paracetamol 1 g i.v.</span> + w razie silnego bólu opioidy (<span class='dose-pill'>Morfina 5-10 mg s.c./i.v.</span>).<br>4. Leki przeciwwymiotne: <span class='dose-pill'>Ondansetron 4-8 mg i.v.</span> w przypadku nasilonych nudności.",
    procedures: "1. Założenie sondy żołądkowej (dekompresja przy wymiotach i niedrożności mechanicznej).<br>2. Pilna operacja w trybie ostrym – cięcie w pachwinie, ostrożne otwarcie worka przepuklinowego (zabezpieczenie pętli przed przypadkowym wpadnięciem do brzucha).<br>3. Nacięcie pierścienia uwięźnięcia i ocena żywotności jelita po 10-15 min ogrzewania solą fizjologiczną (barwa, tętno, perystaltyka).<br>4. W razie jelita żywotnego – odprowadzenie do otrzewnej i beznapięciowa plastyka z siatką metodą Lichtensteina; w razie martwicy – resekcja jelita z zespoleniem i plastyka tkankowa szwami (metoda Shouldice'a).",
    monitoring: "1. Obserwacja rany operacyjnej i moszny pod kątem krwiaka powrózka lub zakażenia miejsca operowanego (SSI).<br>2. Kontrola powrotu perystaltyki jelitowej i tolerancji płynów doustnych.<br>3. Wczesne uruchomienie pacjenta w 1. dobie pooperacyjnej.<br>4. Zalecenie unikania dźwigania ciężarów (>5 kg) przez okres 4-6 tygodni od operacji."
  },
  lekQuestions: [
    {
      question: "Przepuklina pachwinowa skośna (pośrednia) różni się anatomicznie od przepukliny pachwinowej prostej tym, że:",
      options: [
        "Wnika do kanału pachwinowego przez pierścień pachwinowy głęboki, leżący bocznie od naczyń nabrzusznych dolnych, i może schodzić w powrózku nasiennym do moszny",
        "Uwypukla się bezpośrednio przez trójkąt Hesselbacha przyśrodkowo od naczyń nabrzusznych dolnych",
        "Wychodzi poniżej więzadła pachwinowego do kanału udowego",
        "Nigdy nie ulega uwięźnięciu ani zadzierzgnięciu",
        "Występuje wyłącznie u kobiet w ciąży"
      ],
      correct: 0,
      expl: "Przepuklina skośna (indirect/lateral) wnika przez pierścień pachwinowy głęboki, położony bocznie od naczyń nabrzusznych dolnych (vasa epigastrica inferiora). Biegnie wzdłuż całego kanału pachwinowego wewnątrz powięzi nasiennej wewnętrznej powrózka i ma tendencję do schodzenia do worka mosznowego (przepuklina mosznowa). Przepuklina prosta uwypukla się przyśrodkowo od naczyń przez dno kanału (trójkąt Hesselbacha)."
    },
    {
      question: "Pojęcie zadzierzgnięcia (strangulatio) w odniesieniu do przepukliny oznacza:",
      options: [
        "Zaciśnięcie naczyń krwionośnych krezki uwięzionego narządu, prowadzące do jego niedokrwienia, martwicy i perforacji",
        "Brak możliwości odprowadzenia worka do jamy brzusznej bez zaburzeń ukrwienia",
        "Przypadkowe przecięcie powrózka nasiennego podczas zabiegu",
        "Wrośnięcie siatki syntetycznej w ścianę pęcherza moczowego",
        "Zakażenie bakteryjne skóry moszny bez udziału wrót przepukliny"
      ],
      correct: 0,
      expl: "Zadzierzgnięcie (strangulacja) to powikłanie uwięźnięcia, w którym zaciśnięte wrota przepuklinowe uciskają szypułę naczyniową zawartości worka (krezkę jelita lub sieć). Prowadzi to do niedokrwienia tętniczego, zawału ściany jelita i nieodwracalnej martwicy zgorzelinowej, stanowiąc stan bezpośredniego zagrożenia życia."
    },
    {
      question: "Wskaż bezwzględne przeciwwskazanie do próby ręcznego odprowadzania przepukliny (taxis):",
      options: [
        "Czas uwięźnięcia przekraczający 4-6 godzin lub obecność objawów stanu zapalnego skóry, gorączki i kwasicy mleczanowej",
        "Młody wiek pacjenta (poniżej 30. roku życia)",
        "Obecność przepukliny po stronie prawej zamiast lewej",
        "Prawidłowa liczba krwinek białych w morfologii",
        "Brak wcześniejszych operacji w jamie brzusznej"
      ],
      correct: 0,
      expl: "Ręczne odprowadzanie (taxis) jest bezwzględnie zakazane, gdy uwięźnięcie trwa powyżej 4-6 godzin LUB stwierdza się cechy martwicy/zapalenia (zaczerwienienie skóry, gorączka, leukocytoza, kwasica mleczanowa, objawy otrzewnowe). Siłowe odprowadzenie grozi pęknięciem martwiczego jelita w jamie brzusznej lub tzw. odprowadzeniem w masie (reductio en masse)."
    },
    {
      question: "Przepuklina Richtera charakteryzuje się:",
      options: [
        "Uwięźnięciem jedynie fragmentu obwodu ściany jelita (przeciwległego do krezki), co może nie dawać objawów pełnej niedrożności mechanicznej mimo postępującej martwicy ściany",
        "Obecnością uchyłka Meckela w worku przepuklinowym",
        "Obecnością wyrostka robaczkowego w worku przepukliny pachwinowej",
        "Wypadaniem narządów miednicy przez otwór zasłonowy",
        "Uwięźnięciem żołądka w jamie opłucnej"
      ],
      correct: 0,
      expl: "Przepuklina Richtera to uwięźnięcie przyścienne – w wąskich wrotach uwięźnięty zostaje jedynie fragment obwodu ściany jelita (od strony przeciwległej do krezki). Światło jelita pozostaje drożne, więc pacjent może normalnie oddawać gazy i stolec, co usypia czujność lekarza, podczas gdy uwięźnięta ściana ulega cichej martwicy i perforacji."
    },
    {
      question: "Złotym standardem zaopatrzenia przepukliny pachwinowej u dorosłych mężczyzn w czystym polu operacyjnym (bez skażenia bakteryjnego) wg wytycznych HerniaSurge jest:",
      options: [
        "Beznapięciowa plastyka z użyciem płaskiej siatki syntetycznej (metoda Lichtensteina)",
        "Napięciowa plastyka powięziowa metodą Bassiniego",
        "Plastyka metodą Girarda z wycięciem powrózka nasiennego",
        "Zamknięcie pierścienia pachwinowego pojedynczym szwem katgutowym",
        "Stosowanie pasa przepuklinowego do końca życia bez operacji"
      ],
      correct: 0,
      expl: "Zgodnie z międzynarodowymi wytycznymi HerniaSurge złotym standardem chirurgicznego leczenia pierwotnej przepukliny pachwinowej u dorosłych mężczyzn jest beznapięciowa plastyka z użyciem siatki syntetycznej (metoda Lichtensteina) lub techniki endoskopowe (TAPP / TEP). Zapewnia najniższy odsetek nawrotów (<1-2%) i najmniejsze dolegliwości bólowe."
    },
    {
      question: "Obecność zapalnie zmienionego wyrostka robaczkowego w worku przepukliny pachwinowej nosi nazwę przepukliny:",
      options: [
        "Amyanda",
        "Littrégo",
        "de Garengeota",
        "Spiegla",
        "Rychtera"
      ],
      correct: 0,
      expl: "Przepuklina Amyanda to obecność wyrostka robaczkowego (często zmienionego zapalnie) w worku przepukliny PACHWINOWEJ. Z kolei obecność wyrostka w worku przepukliny UDOWEJ nosi nazwę przepukliny de Garengeota. Obecność uchyłka Meckela w worku to przepuklina Littrégo."
    },
    {
      question: "Na czym polega niebezpieczeństwo tzw. 'odprowadzenia w masie' (reductio en masse) podczas próby ręcznego odprowadzenia uwięźniętej przepukliny?",
      options: [
        "Na wepchnięciu całego worka przepuklinowego wraz ze zaciśniętym pierścieniem uwięźnięcia do przestrzeni przedotrzewnowej, co daje pozory ustąpienia guza, podczas gdy jelito nadal ulega martwicy w zaciśniętym pierścieniu",
        "Na pęknięciu jądra pod wpływem ucisku rąk badającego",
        "Na natychmiastowym zatrzymaniu akcji serca z powodu odruchu wazowagalnego",
        "Na rozerwaniu tętnicy udowej z powstaniem tętniaka rzekomego",
        "Na trwałym zrośnięciu się skóry moszny z prąciem"
      ],
      correct: 0,
      expl: "Odprowadzenie w masie (reductio en masse) polega na wepchnięciu do jamy brzusznej lub przestrzeni przedotrzewnowej całego worka przepuklinowego RAZEM ze sztywną szyją worka, która nadal zaciska jelito. Guz w pachwinie znika, co może fałszywie uspokoić lekarza, jednak niedokrwienie i martwica uwięzionej pętli postępują, prowadząc do zgonu chorego w sepsie."
    },
    {
      question: "Wskaż cechę, która śródoperacyjnie potwierdza PEŁNĄ ŻYWOTNOŚĆ niedokrwionej pętli jelita po uwolnieniu zaciśniętych wrót przepukliny:",
      options: [
        "Powrót różowej barwy ściany, wyczuwalne tętno w tętniczkach krezki oraz powrót samoistnych skurczów perystaltycznych po ogrzaniu",
        "Utrzymywanie się czarnego zabarwienia ściany bez perystaltyki",
        "Brak krwawienia z naciętej surowicy jelita",
        "Ścieńczenie ściany jelita do grubości papieru",
        "Obecność pęcherzyków gazu w naczyniach krezkowych"
      ],
      correct: 0,
      expl: "Po odbarczeniu wrót i 10-15 minutach ogrzewania ciepłą solą fizjologiczną trzema kardynalnymi cechami żywotności pętli jelitowej są: 1. Powrót fizjologicznego, różowego zabarwienia ściany, 2. Wyczuwalne lub widoczne tętno w tętniczkach brzeżnych krezki, 3. Powrót fali perystaltycznej (samoistnej lub po delikatnym bodźcu mechanicznym)."
    },
    {
      question: "U pacjenta operowanego z powodu uwięźniętej przepukliny pachwinowej stwierdzono martwicę jelita i wykonano resekcję pętli ze skażeniem pola operacyjnego treścią jelitową. Zgodnie z zasadami chirurgicznymi w plastyce wrót należy:",
      options: [
        "Unikać wszczepiania klasycznych nierozpuszczalnych siatek syntetycznych (polipropylenowych) i wykonać plastykę tkankową szwami (np. metodą Shouldice'a) z powodu ryzyka zakażenia ciała obcego",
        "Założyć podwójną siatkę polipropylenową w celu mocniejszego zaopatrzenia",
        "Pozostawić ranę otwartą bez szycia powięzi",
        "Usunąć przeciwległe jądro w celach profilaktycznych",
        "Zaszyć wyłącznie skórę, pozostawiając ubytek powięziowy"
      ],
      correct: 0,
      expl: "Wszczepienie nierozpuszczalnej siatki syntetycznej (np. polipropylenowej) w skażone pole operacyjne (po resekcji jelita lub w rozlanym zapaleniu) niesie wysokie ryzyko zakażenia siatki, tworzenia przewlekłych przetok i konieczności reoperacji w celu jej usunięcia. W takich sytuacjach rekomenduje się plastyki tkankowe (np. czterowarstwową metodę Shouldice'a) lub nowoczesne siatki biologiczne/wchłanialne."
    },
    {
      question: "Który nerw może ulec przypadkowemu uszkodzeniu lub uwięźnięciu w szwach podczas plastyki kanału pachwinowego metodą Lichtensteina, wywołując przewlekły ból i pieczenie w pachwinie i mosznie?",
      options: [
        "Nerw biodrowo-pachwinowy (n. ilioinguinalis) oraz gałąź płciowa n. płciowo-udowego",
        "Nerw kulszowy",
        "Nerw strzałkowy wspólny",
        "Nerw sromowy",
        "Nerw błędny"
      ],
      correct: 0,
      expl: "W kanale pachwinowym przebiegają nerw biodrowo-pachwinowy (n. ilioinguinalis), nerw biodrowo-podbrzuszny (n. iliohypogastricus) oraz gałąź płciowa nerwu płciowo-udowego (ramus genitalis n. genitofemoralis). Ich przypadkowe podkłucie szwem, uciśnięcie siatką lub przecięcie jest główną przyczyną przewlekłego bólu pooperacyjnego (inguinodynia) u ok. 2-5% chorych."
    },
    {
      question: "Uwięźnięcie uchyłka Meckela w worku przepuklinowym nosi nazwę przepukliny:",
      options: [
        "Littrégo",
        "Amyanda",
        "Richtera",
        "Treitza",
        "Morgagniego"
      ],
      correct: 0,
      expl: "Przepuklina Littrégo to z definicji obecność uchyłka Meckela w worku przepuklinowym (najczęściej pachwinowej, udowej lub pępkowej). Wymaga resekcji uchyłka i plastyki wrót przepukliny."
    }
  ],
  flashcards: [
    {
      front: "Czym różni się uwięźnięcie (incarceratio) od zadzierzgnięcia (strangulatio) przepukliny?",
      back: "Uwięźnięcie: brak możliwości odprowadzenia worka do brzucha (przepuklina nieodprowadzalna).\nZadzierzgnięcie: uciśnięcie naczyń krezkowych w wąskich wrotach -> niedokrwienie, martwica zgorzelinowa i perforacja jelita."
    },
    {
      front: "Dlaczego odprowadzanie ręczne (taxis) jest ZAKAZANE, gdy uwięźnięcie trwa >4-6 godzin?",
      back: "Grozi pęknięciem martwiczego jelita do otrzewnej lub tzw. 'odprowadzeniem w masie' (reductio en masse) – wepchnięciem worka wraz ze zaciśniętym pierścieniem do brzucha, gdzie jelito dalej ulega martwicy."
    },
    {
      front: "Co to jest przepuklina Richtera i dlaczego jest tak groźna?",
      back: "Uwięźnięcie jedynie fragmentu obwodu ściany jelita (od strony przeciwległej do krezki). Światło jelita pozostaje drożne (brak objawów niedrożności!), co usypia czujność, podczas gdy ściana po cichu ulega martwicy i pęka."
    },
    {
      front: "Czym różni się anatomicznie przepuklina pachwinowa skośna od prostej?",
      back: "Skośna: wnika przez pierścień głęboki BOCZNIE od naczyń nabrzusznych dolnych, biegnie w powrózku do moszny, częściej więźnie.\nProsta: uwypukla się przez trójkąt Hesselbacha PRZYŚRODKOWO od naczyń, ma szerokie wrota, rzadko więźnie."
    },
    {
      front: "Jakie są 3 cechy potwierdzające żywotność jelita po odbarczeniu uwięźniętej przepukliny?",
      back: "Po 10-15 min ogrzewania serwetami z solą: 1. Powrót różowego zabarwienia ściany, 2. Wyczuwalne tętno w tętniczkach krezki, 3. Powrót samoistnych skurczów perystaltycznych."
    },
    {
      front: "Co to jest przepuklina Amyanda, a co przepuklina Littrégo?",
      back: "Przepuklina Amyanda: obecność wyrostka robaczkowego w worku przepukliny pachwinowej.\nPrzepuklina Littrégo: obecność uchyłka Meckela w worku przepuklinowym."
    }
  ]
};

// Mirror fields for schema compatibility
case132.steps.forEach(step => {
  step.question = step.title;
  step.explanation = step.feedback;
});
case132.lekQuestions.forEach(q => {
  q.opts = q.options;
  q.correctIdx = q.correct;
  q.exp = q.expl;
});

saveCase(case132);

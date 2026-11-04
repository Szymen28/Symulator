const fs = require('fs');
const path = require('path');
const { encryptStringAes } = require('./encrypt_case.js');

const MASTER_KEY = '@LEKSzymon28111999';
const CASES_DIR = path.join(__dirname, '..', 'cases');

console.log("Saving Case 117: Choroba dłoni, stóp i jamy ustnej / HFMD (Enterowirusy)...");

async function saveCase(caseData) {
  const filePath = path.join(CASES_DIR, caseData.filename);
  const jsonStr = JSON.stringify(caseData, null, 2);
  const encrypted = await encryptStringAes(jsonStr, MASTER_KEY);
  fs.writeFileSync(filePath, JSON.stringify(encrypted, null, 2), 'utf8');
  console.log(`[SAVED] Case #${caseData.id}: ${caseData.filename} (LEK Qs: ${caseData.lekQuestions.length}, Steps: ${caseData.steps.length}, Flashcards: ${caseData.flashcards.length})`);
}

const case117 = {
  id: 117,
  filename: "117_choroba_bostonska_hfmd.json",
  dept: "Pediatria",
  shortTitle: "3-letni Oliwier – Bolesne afty w jamie ustnej, pęcherzyki na dłoniach i stopach (HFMD)",
  diagnosisTitle: "Choroba dłoni, stóp i jamy ustnej (HFMD – Hand, Foot and Mouth Disease / potocznie 'choroba bostońska') wywołana przez enterowirusy (Coxsackie A16)",
  vitals: [
    { label: "Temperatura ciała", val: "38,4°C", sub: "Gorączka umiarkowana od 2 dni", status: "vital-warn" },
    { label: "Akcja serca (HR)", val: "128/min", sub: "Tachykardia adekwatna do gorączki", status: "vital-ok" },
    { label: "Częstość oddechów (RR)", val: "22/min", sub: "Oddech prawidłowy, miarowy", status: "vital-ok" },
    { label: "Saturacja SpO2 / BP", val: "99% | 98/60 mmHg", sub: "Stabilność hemodynamiczna", status: "vital-ok" }
  ],
  vitalsObj: { hr: 128, bp: "98/60", spo2: 99, rr: 22, temp: 38.4, gcs: 15 },
  story: `<p><strong>Pacjent:</strong> 3-letni Oliwier został przyprowadzony na izbę przyjęć szpitala pediatrycznego przez rodziców z powodu silnego bólu jamy ustnej, ślinotoku, całkowitej odmowy jedzenia i picia oraz pojawienia się drobnych pęcherzyków na dłoniach, podeszwach stóp i pośladkach.</p><p><strong>Wywiad chorobowy:</strong> Dwa dni temu u chłopca pojawiła się gorączka do 38,5°C, rozdrażnienie i niechęć do posiłków. Wczoraj rano matka zauważyła, że Oliwier płacze przy każdej próbie napojenia go wodą lub mlekiem, ma obfity ślinotok i nie chce połykać śliny. Dziś rano na wewnętrznych powierzchniach dłoni, na podeszwach stóp oraz w okolicy pieluszkowej (na pośladkach) pojawiły się podłużne, owalne pęcherzyki z czerwoną obwódką, niepękające łatwo. W przedszkolu Oliwiera troje innych dzieci z tej samej grupy ma podobne objawy ('choroba bostońska').</p><p><strong>Badanie przedmiotowe na SOR:</strong> Dziecko marudne, z obfitym wyciekiem śliny z kącików ust. Cechy łagodnego odwodnienia: śluzówki podsychające, płacz ze łzami. W jamie ustnej: na błonie śluzowej policzków, dziąsłach, języku oraz podniebieniu twardym widoczne liczne, płytkie, bolesne owrzodzenia i nadżerki o średnicy 2-4 mm, z szarawym dnem otoczonym intensywnie czerwoną obwódką zapalną (enanthema). Migdałki podniebienne niepowiększone, bez ropnych nalotów. Na skórze dłoni (część dłoniowa i boczne powierzchnie palców), na podeszwach stóp oraz na skórze pośladków obecne liczne, drobne grudki i owalne, wydłużone pęcherzyki o średnicy 3-6 mm z przejrzystą treścią, ułożone wzdłuż linii papilarnych skóry, z rąbkiem rumieniowym (exanthema). Wykwity są miernie tkliwe, nie wykazują świądu. Węzły chłonne podżuchwowe obustronnie powiększone do 1 cm, przesuwalne. Osłuchowo nad płucami szmer pęcherzykowy prawidłowy. Brzuch miękki, niebolesny, wątroba i śledziona w normie. Objawy oponowe ujemne.</p>`,
  labs: {
    "Morfologia krwi obwodowej i biochemia": [
      { name: "Leukocyty (WBC)", val: "7,8 G/L", norm: "5,0 - 14,5 G/L", flag: "NORMAL" },
      { name: "Limfocyty ogółem", val: "58%", norm: "40 - 60%", flag: "NORMAL" },
      { name: "Neutrofile", val: "34%", norm: "30 - 50%", flag: "NORMAL" },
      { name: "Hemoglobina (Hb)", val: "12,6 g/dl", norm: "11,5 - 14,5 g/dl", flag: "NORMAL" },
      { name: "Płytki krwi (PLT)", val: "280 G/L", norm: "150 - 450 G/L", flag: "NORMAL" },
      { name: "CRP", val: "6,2 mg/l", norm: "< 5,0 mg/l", flag: "HIGH" },
      { name: "Równowaga kwasowo-zasadowa (gazometria)", val: "pH 7,38, HCO3- 22 mmol/l, BE -1,2", norm: "Prawidłowa", flag: "NORMAL" }
    ],
    "Diagnostyka wirusologiczna (potwierdzenie)": [
      { name: "Obraz kliniczny", val: "Jednoznaczny dla HFMD (dłonie, stopy, jama ustna)", norm: "Prawidłowy", flag: "HIGH" },
      { name: "RT-PCR w kierunku Enterowirusów (kał / wymaz z gardła)", val: "DODATNI (+) [Coxsackie A16]", norm: "Ujemny", flag: "CRIT_HIGH" }
    ]
  },
  steps: [
    {
      stepNum: 1,
      title: "Krok 1: Rozpoznanie charakterystycznej lokalizacji wykwitów – triada HFMD",
      desc: "3-letni Oliwier ma bolesne owrzodzenia w jamie ustnej, ślinotok oraz podłużne pęcherzyki na dłoniach, podeszwach stóp i pośladkach. Jaka jest prawidłowa jednostka nozologiczna i potoczna nazwa tego zespołu?",
      scenario: "3-letni Oliwier ma bolesne owrzodzenia w jamie ustnej, ślinotok oraz podłużne pęcherzyki na dłoniach, podeszwach stóp i pośladkach. Jaka jest prawidłowa jednostka nozologiczna i potoczna nazwa tego zespołu?",
      options: [
        {
          text: "Choroba dłoni, stóp i jamy ustnej (HFMD – Hand, Foot and Mouth Disease), w Polsce potocznie i niefortunnie nazywana 'chorobą bostońską'",
          correct: true,
          isCorrect: true,
          feedback: "✅ PRAWIDŁOWO! <strong>Klasyczny obraz HFMD!</strong> Połączenie bolesnych aft/owrzodzeń w jamie ustnej (enanthema) z owalnymi pęcherzykami na dłoniach, podeszwach stóp oraz pośladkach (exanthema) u małego dziecka to podręcznikowy obraz choroby dłoni, stóp i jamy ustnej (HFMD). W Polsce potocznie używa się określenia 'choroba bostońska' lub 'bostoka', chociaż historyczna epidemia w Bostonie (1951 r.) wywołana była przez echowirus 16 i miała odmienny obraz kliniczny (osutka bostońska bez zajęcia dłoni i stóp)."
        },
        {
          text: "Półpasiec rozsiany z zajęciem nerwu trójdzielnego",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Półpasiec ma układ ściśle jednostronny i dermatomowy</strong>, a nie symetryczny na dłoniach i stopach."
        },
        {
          text: "Pryszczyca (Foot and mouth disease zwierząt kopytnych)",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Pryszczyca (FMD)</strong> to ciężka choroba bydła i świń wywoływana przez Aphthovirus, która u ludzi występuje skrajnie rzadko i nie jest tożsama z HFMD u dzieci."
        },
        {
          text: "Wrzodziejące zapalenie jelita grubego z piodermią zgorzelinową",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Brak biegunki krwistej</strong>, a wykwity w HFMD to łagodne pęcherzyki enterowirusowe."
        }
      ]
    },
    {
      stepNum: 2,
      title: "Krok 2: Czynniki etiologiczne i potencjalnie groźne warianty wirusa",
      desc: "Jakie wirusy najczęściej wywołują HFMD i który szczep enterowirusa wiąże się ze szczególnie ciężkim przebiegiem neurogennym (obrzęk płuc, zapalenie pnia mózgu)?",
      scenario: "Jakie wirusy najczęściej wywołują HFMD i który szczep enterowirusa wiąże się ze szczególnie ciężkim przebiegiem neurogennym (obrzęk płuc, zapalenie pnia mózgu)?",
      options: [
        {
          text: "Enterowirusy z rodziny Picornaviridae: najczęściej wirus Coxsackie A16 (łagodny przebieg typowy) oraz Enterowirus 71 (EV71 – mogący wywołać ciężkie zapalenie pnia mózgu, neurogenny obrzęk płuc i wstrząs kardiorespiracyjny); coraz częściej Coxsackie A6 (rozległa, atypowa osutka)",
          correct: true,
          isCorrect: true,
          feedback: "✅ PRAWIDŁOWO! <strong>Wirusologia enterowirusowa i czujność onkologiczno-neurologiczna!</strong> Głównym sprawcą typowej, łagodnej HFMD w Europie jest Coxsackie A16. Natomiast Enterowirus 71 (EV71), endemiczny zwłaszcza w Azji Południowo-Wschodniej, cechuje się silnym neurotropizmem i może wywołać piorunujące zapalenie pnia mózgu, miokarditis i obrzęk płuc o wysokiej śmiertelności. Szczep Coxsackie A6 odpowiada za postacie z masywną osutką na całym ciele i późniejszym złuszczaniem paznokci."
        },
        {
          text: "Wirus wścieklizny (Rhabdoviridae)",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Wścieklizna to śmiertelne zapalenie mózgu po pogryzieniu przez zwierzę.</strong>"
        },
        {
          text: "Wirus zapalenia wątroby typu C (HCV)",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>HCV przenosi się parenteralnie i uszkadza wątrobę.</strong>"
        },
        {
          text: "Chlamydia trachomatis",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Chlamydia to bakteria wewnątrzkomórkowa.</strong>"
        }
      ]
    },
    {
      stepNum: 3,
      title: "Krok 3: Odróżnienie HFMD od herpanginy (Coxsackie A)",
      desc: "Lekarz stażysta pyta, czym różni się enanthema w klasycznym HFMD od herpanginy. Jaka jest kluczowa różnica lokalizacyjna wykwitów w jamie ustnej?",
      scenario: "Lekarz stażysta pyta, czym różni się enanthema w klasycznym HFMD od herpanginy. Jaka jest kluczowa różnica lokalizacyjna wykwitów w jamie ustnej?",
      options: [
        {
          text: "W HFMD afty i owrzodzenia zlokalizowane są w przedniej części jamy ustnej (błona śluzowa policzków, dziąsła, język, podniebienie twarde) oraz towarzyszy im osutka na dłoniach i stopach; w herpanginie owrzodzenia występują w tylnej części gardła (łuki podniebienne, migdałki, języczek), a wykwity na kończynach NIE występują",
          correct: true,
          isCorrect: true,
          feedback: "✅ PRAWIDŁOWO! <strong>Doskonałe różnicowanie semiotyczne!</strong> Herpangina (również wywoływana przez Coxsackie A) ogranicza się ściśle do tylnej ściany gardła, łuków podniebiennych i języczka i NIE towarzyszy jej wysypka na dłoniach i podeszwach. W HFMD owrzodzenia dominują na śluzówce policzków, wargach, języku i dziąsłach, współistniejąc z pęcherzykami na skórze rąk, stóp i pośladków."
        },
        {
          text: "W herpanginie wykwity występują wyłącznie pod paznokciami u stóp",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Herpangina dotyczy wyłącznie gardła!</strong>"
        },
        {
          text: "Herpangina wywoływana jest przez prątki gruźlicy",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Herpangina ma etiologię enterowirusową (Coxsackie A).</strong>"
        },
        {
          text: "Nie ma żadnej różnicy, to synonimy oznaczające tę samą chorobę",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>To dwie odrębne jednostki kliniczne wywoływane przez enterowirusy.</strong>"
        }
      ]
    },
    {
      stepNum: 4,
      title: "Krok 4: Najczęstsze powikłanie ostrej fazy – odwodnienie i postępowanie",
      desc: "Z powodu bolesnych nadżerek w jamie ustnej Oliwier od 12 godzin nie przyjmuje płynów i odmawia połykania czegokolwiek. Jakie jest najważniejsze zagrożenie w ostrej fazie HFMD i jak powinno wyglądać prawidłowe postępowanie?",
      scenario: "Z powodu bolesnych nadżerek w jamie ustnej Oliwier od 12 godzin nie przyjmuje płynów i odmawia połykania czegokolwiek. Jakie jest najważniejsze zagrożenie w ostrej fazie HFMD i jak powinno wyglądać prawidłowe postępowanie?",
      options: [
        {
          text: "Głównym zagrożeniem jest odwodnienie spowodowane odynofagią (bólem przy połykaniu); kluczowe jest skuteczne znieczulenie przeciwbólowe (Paracetamol, Ibuprofen, aerozole mukoadhezyjne z lidokainą/kwasem hialuronowym) oraz podawanie chłodnych, niekwaśnych płynów, lodów i jogurtów; w razie braku poprawy nawadnianie dożylne",
          correct: true,
          isCorrect: true,
          feedback: "✅ PRAWIDŁOWO! <strong>Główny cel terapeutyczny w HFMD!</strong> Najczęstszą przyczyną hospitalizacji dzieci z HFMD jest odwodnienie wynikające z silnego bólu przy próbie przełknięcia płynów. Skuteczna analgezja ogólna (Paracetamol w pełnej dawce 15 mg/kg co 4-6 h naprzemiennie z Ibuprofenem 10 mg/kg co 8 h) oraz miejscowa (preparaty z lidokainą lub kwasem hialuronowym w sprayu na śluzówkę) znosi ból i umożliwia picie. Zaleca się chłodne napoje, mleko, lody waniliowe, unikanie kwaśnych soków cytrusowych i słonych pokarmów drażniących nadżerki."
        },
        {
          text: "Podawanie gorącej herbaty z dużą ilością cytryny i soli w celu wypalenia wirusa",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD KRYTYCZNY! <strong>Gorące i kwaśne płyny wywołają potworny ból u dziecka</strong> i całkowity paraliż połykania!"
        },
        {
          text: "Natychmiastowe usunięcie wszystkich zębów mlecznych",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Zęby nie biorą udziału w patogenezie HFMD.</strong>"
        },
        {
          text: "Zalecenie całkowitej głodówki i zakazu picia przez 7 dni",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD KRYTYCZNY! <strong>Doprowadziłoby do wstrząsu hipowolemicznego!</strong>"
        }
      ]
    },
    {
      stepNum: 5,
      title: "Krok 5: Późne następstwo – onychomadesis (złuszczanie paznokci)",
      desc: "Uprzedzasz rodziców o późnym, łagodnym następstwie HFMD, które może pojawić się u Oliwiera za 4-8 tygodni, aby uniknąć paniki. O jakim objawie mowa?",
      scenario: "Uprzedzasz rodziców o późnym, łagodnym następstwie HFMD, które może pojawić się u Oliwiera za 4-8 tygodni, aby uniknąć paniki. O jakim objawie mowa?",
      options: [
        {
          text: "Onychomadesis (oddzielanie się i bezbolesne odpadanie płytek paznokciowych od nasady ku brzegowi) oraz obecność poprzecznych bruzd Beau na paznokciach rąk i stóp",
          correct: true,
          isCorrect: true,
          feedback: "✅ PRAWIDŁOWO! <strong>Klasyczne i fascynujące zjawisko po HFMD!</strong> Po około 4 do 8 tygodniach od przebycia HFMD (szczególnie po zakażeniu szczepem Coxsackie A6) u wielu dzieci dochodzi do zjawiska onychomadesis – przejściowego zatrzymania aktywności macierzy paznokcia z następowym poprzecznym pęknięciem i bezbolesnym oddzieleniem się (schodzeniem) płytek paznokciowych u rąk i stóp. Rodzice często zgłaszają się z przerażeniem, podejrzewając grzybicę lub niedobory witaminowe. Zjawisko jest w 100% łagodne – pod starym paznokciem odrasta całkowicie zdrowa nowa płytka paznokciowa."
        },
        {
          text: "Trwały zanik kości dłoni z utratą funkcji chwytnej",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>HFMD nie niszczy kości.</strong>"
        },
        {
          text: "Trwałe zrośnięcie wszystkich palców rąk",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Syndaktylia jest wadą wrodzoną, a nie powikłaniem enterowirusowym.</strong>"
        },
        {
          text: "Rozwój cukrzycy typu 2 w ciągu 4 tygodni",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Brak takiego związku.</strong>"
        }
      ]
    },
    {
      stepNum: 6,
      title: "Krok 6: Droga transmisji i czas wydalania wirusa w kale",
      desc: "Mama pyta, jak długo Oliwier będzie wydalał wirusa i jak zapobiegać zakażeniu młodszego niemowlęcia w domu. Jakie są drogi transmisji i jak długo enterowirusy utrzymują się w kale?",
      scenario: "Mama pyta, jak długo Oliwier będzie wydalał wirusa i jak zapobiegać zakażeniu młodszego niemowlęcia w domu. Jakie są drogi transmisji i jak długo enterowirusy utrzymują się w kale?",
      options: [
        {
          text: "Transmisja zachodzi drogą kropelkową, przez kontakt bezpośredni z płynem pęcherzykowym oraz drogą fekalno-oralną. Wirus może być wydalany w kale przez 4 do nawet 8-10 tygodni po ustąpieniu objawów klinicznych! Kluczowe jest rygorystyczne mycie rąk po każdej zmianie pieluszki",
          correct: true,
          isCorrect: true,
          feedback: "✅ PRAWIDŁOWO! <strong>Epidemiologia enterowirusów!</strong> Enterowirusy wykazują wyjątkową oporność w środowisku zewnętrznym. Z dróg oddechowych wirus znika po ok. 1-3 tygodniach, ale w kale jest wydalany przez wiele tygodni (często 6-10 tygodni). Dlatego rygorystyczna higiena rąk rodziców po przewijaniu, dezynfekcja nocników i przewijaków jest kluczem do przerwania transmisji na rodzeństwo."
        },
        {
          text: "Wirus ginie w organizmie w ciągu 5 minut od spadku gorączki i nie ma go w kale",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Enterowirusy kolonizują przewód pokarmowy przez wiele tygodni.</strong>"
        },
        {
          text: "Wirus przenosi się wyłącznie przez przetoczenie skażonego osocza",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Transmisja fekalno-oralna i kropelkowa to główne drogi zakażenia.</strong>"
        },
        {
          text: "Wirus jest niszczony wyłącznie przez promieniowanie rentgenowskie",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Do inaktywacji wystarcza mycie rąk mydłem i środki z chlorem/alkoholem.</strong>"
        }
      ]
    },
    {
      stepNum: 7,
      title: "Krok 7: Ocena roli leków przeciwwirusowych i antybiotyków",
      desc: "Lekarz POZ wypisał recepcie na Acyklowir w zawiesinie oraz Amoksycylinę. Co zrobisz z tą farmakoterapią?",
      scenario: "Lekarz POZ wypisał recepcie na Acyklowir w zawiesinie oraz Amoksycylinę. Co zrobisz z tą farmakoterapią?",
      options: [
        {
          text: "Anulujesz oba leki: Acyklowir działa wybiórczo na wirusy Herpes (HSV/VZV) i jest całkowicie nieskuteczny wobec Enterowirusów (Picornaviridae, wirusy RNA bez kinazy tymidynowej), a antybiotyki są nieskuteczne w infekcjach wirusowych; leczenie powinno być wyłącznie objawowe",
          correct: true,
          isCorrect: true,
          feedback: "✅ PRAWIDŁOWO! <strong>Racjonalna farmakoterapia!</strong> Acyklowir wymaga aktywacji przez wirusową kinazę tymidynową, którą kodują jedynie wirusy HSV i VZV. Enterowirusy (w tym Coxsackie i EV71) to wirusy RNA z rodziny Picornaviridae – acyklowir nie wykazuje wobec nich żadnej aktywności farmakologicznej. Antybiotykoterapia jest zbędna i generuje lekooporność oraz niszczy mikrobiotę."
        },
        {
          text: "Zwiększasz dawkę acyklowiru 10-krotnie i dodajesz wankomycynę",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD KRYTYCZNY! <strong>Polipragmazja i ryzyko nefrotoksyczności!</strong>"
        },
        {
          text: "Zamieniasz amoksycylinę na gentamycynę domięśniowo",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Antybiotyki nie działają na wirusy.</strong>"
        },
        {
          text: "Podajesz acyklowir doodbytniczo",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Acyklowir nie działa na enterowirusy niezależnie od drogi podania.</strong>"
        }
      ]
    },
    {
      stepNum: 8,
      title: "Krok 8: Izolacja i kryteria powrotu dziecka do przedszkola",
      desc: "Kiedy Oliwier może bezpiecznie wrócić do grupy przedszkolnej wg zaleceń epidemiologicznych?",
      scenario: "Kiedy Oliwier może bezpiecznie wrócić do grupy przedszkolnej wg zaleceń epidemiologicznych?",
      options: [
        {
          text: "Dziecko może wrócić do przedszkola, gdy nie gorączkuje od co najmniej 24 godzin, ból gardła ustąpił, pęcherzyki przyschły, a dziecko czuje się dobrze i jest w stanie samodzielnie jeść i pić (zwykle po 5-7 dniach od początku choroby)",
          correct: true,
          isCorrect: true,
          feedback: "✅ PRAWIDŁOWO! <strong>Praktyczne zalecenie epidemiologiczne!</strong> Nie ma konieczności izolacji dziecka aż do całkowitego zaprzestania wydalania wirusa w stolcu (trwa to tygodniami). Kryterium powrotu jest ustąpienie gorączki na minimum 24 h, wygojenie owrzodzeń jamy ustnej (brak bólu, powrót normalnego łaknienia) oraz podsuszenie wykwitów pęcherzykowych."
        },
        {
          text: "Dopiero po uzyskaniu 3 ujemnych posiewów kału w odstępie 3 miesięcy",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Niepraktyczne i nieuzasadnione w niepowikłanym HFMD.</strong>"
        },
        {
          text: "Nigdy, dziecko z HFMD ma dożywotni zakaz edukacji przedszkolnej",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Absurdalna dyskwalifikacja.</strong>"
        },
        {
          text: "Natychmiast w pierwszym dniu z gorączką 40°C i ślinotokiem",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>W fazie ostrej gorączki i świeżych pęcherzyków dziecko jest w stanie złym i silnie zakaża.</strong>"
        }
      ]
    }
  ],
  pathoNodes: [
    {
      badge: "OGNIWO 1 • Replikacja enterowirusów w układzie pokarmowym",
      title: "Transmisja fekalno-oralna, wnikanie przez kępki Peyera i pierwotna wiremia",
      short: "Wirusy Coxsackie replikują się w tkance limfatycznej gardła i jelita krętego.",
      detail: "Enterowirusy (rodzina Picornaviridae, jednoniciowe wirusy RNA o dodatniej polarności, bezotoczkowe) charakteryzują się niezwykłą opornością na niskie pH soku żołądkowego, sól i enzymy trawienne. Po wniknięciu drogą pokarmową lub kropelkową wirus wiąże się ze swoistymi receptorami (np. SCARB2 lub PSGL-1 dla EV71) na komórkach nabłonka nosogardła oraz enterocytach i komórkach M kępek Peyera w jelicie krętym. Dochodzi do intensywnej replikacji pierwotnej, po czym wiriony przedostają się do regionalnych węzłów chłonnych i wywołują przejściową wiremię pierwotną.",
      target: "Leczenie wspomagające przewodu pokarmowego: <span class='dose-pill'>nawadnianie doustne chłodnymi płynami</span>; zakaz kwaśnych soków; higiena rąk.",
      desc: "Transmisja fekalno-oralna, wnikanie przez kępki Peyera i pierwotna wiremia.",
      drugTarget: "Leczenie wspomagające przewodu pokarmowego: <span class='dose-pill'>nawadnianie doustne chłodnymi płynami</span>; zakaz kwaśnych soków; higiena rąk."
    },
    {
      badge: "OGNIWO 2 • Tropizm do nabłonka jamy ustnej i skóry (enanthema/exanthema)",
      title: "Wtórna wiremia, zakażenie keratynocytów i powstawanie pęcherzyków",
      short: "Wirus atakuje keratynocyty śluzówki jamy ustnej, dłoni i stóp, wywołując pęcherzyki.",
      detail: "Z krwioobiegiem wirus rozsiewa się do narządów docelowych wykazujących wysoką ekspresję receptorów enterowirusowych: błony śluzowej jamy ustnej oraz warstwy kolczystej naskórka dłoni, stóp i pośladków. Replikacja wirusa w keratynocytach wywołuje ich balonowate zwyrodnienie, lityczną martwicę i gromadzenie płynu wysiękowego w przestrzeni śródnaskórkowej. W jamie ustnej cienkie sklepienie pęcherzyków szybko pęka pod wpływem ruchów żucia, tworząc bolesne nadżerki (afty) otoczone czerwoną obwódką zapalną. Na grubej skórze dłoni i stóp pęcherzyki pozostają nienaruszone, przyjmując podłużny kształt wzdłuż bruzd skórnych.",
      target: "Terapia przeciwbólowa i analgezja miejscowa: <span class='dose-pill'>Paracetamol 15 mg/kg m.c. p.o.</span> co 4-6 h naprzemiennie z <span class='dose-pill'>Ibuprofenem 10 mg/kg m.c. p.o.</span> co 8 h; miejscowo <span class='dose-pill'>aerozole z kwasem hialuronowym i lidokainą</span>.",
      desc: "Wtórna wiremia, zakażenie keratynocytów i powstawanie pęcherzyków.",
      drugTarget: "Terapia przeciwbólowa i analgezja miejscowa: <span class='dose-pill'>Paracetamol 15 mg/kg m.c. p.o.</span> co 4-6 h naprzemiennie z <span class='dose-pill'>Ibuprofenem 10 mg/kg m.c. p.o.</span> co 8 h; miejscowo <span class='dose-pill'>aerozole z kwasem hialuronowym i lidokainą</span>."
    },
    {
      badge: "OGNIWO 3 • Dysfagia, odynofagia i ryzyko odwodnienia",
      title: "Drażnienie nocyceptorów w jamie ustnej, ból przy połykaniu i deficyt płynowy",
      short: "Bolesne owrzodzenia jamy ustnej uniemożliwiają połykanie płynów, grożąc odwodnieniem.",
      detail: "Owrzodzenia błony śluzowej policzków, warg, języka i podniebienia obnażają zakończenia nerwów czuciowych (gałęzi nerwu trójdzielnego i językowo-gardłowego). Każdy kontakt ze śliną, płynem lub pokarmem wywołuje intensywny ból (odynofagię), co prowadzi u małego dziecka do odruchowego ślinotoku i bezwzględnej odmowy połykania. W połączeniu ze wzmożoną utratą wody w gorączce prowadzi to w ciągu kilkunastu godzin do ostrego odwodnienia izoosmotycznego, hipowolemii i kwasicy metabolicznej.",
      target: "Intensywne nawadnianie: małe porcje chłodnych elektrolitów co 5-10 min; w braku tolerancji: <span class='dose-pill'>Płyn wieloelektrolitowy (PWE) 20 ml/kg m.c. i.v. w bolusie</span>, następnie wlew podtrzymujący.",
      desc: "Drażnienie nocyceptorów w jamie ustnej, ból przy połykaniu i deficyt płynowy.",
      drugTarget: "Intensywne nawadnianie: małe porcje chłodnych elektrolitów co 5-10 min; w braku tolerancji: <span class='dose-pill'>Płyn wieloelektrolitowy (PWE) 20 ml/kg m.c. i.v. w bolusie</span>, następnie wlew podtrzymujący."
    },
    {
      badge: "OGNIWO 4 • Zatrzymanie macierzy paznokcia (Onychomadesis)",
      title: "Przejściowe uszkodzenie aparatu paznokciowego i złuszczanie płytek paznokciowych",
      short: "Wirus uszkadza komórki macierzy paznokcia, prowadząc do ich bezbolesnego oddzielenia po 1-2 miesiącach.",
      detail: "W fazie wiremii enterowirusy (szczególnie Coxsackie A6) mogą ulegać replikacji w obrębie komórek macierzy aparatu paznokciowego palców rąk i stóp. Toksyczny wpływ wirusa lub miejscowy odczyn zapalny wywołuje przejściowe, ostre zatrzymanie mitotycznej aktywności keratynocytów macierzy. Prowadzi to do powstania poprzecznej bruzdy w strukturze keratynowej (linie Beau), a przy całkowitym przerwaniu syntezy – do oddzielenia proksymalnego brzegu płytki paznokciowej od łożyska (onychomadesis). W miarę wzrostu nowego paznokcia stara płytka bezboleśnie odpada po 4-8 tygodniach od infekcji.",
      target: "Postępowanie zachowawcze: <span class='dose-pill'>ochrona łożyska paznokcia</span>, natłuszczanie maściami z witaminą A, <span class='dose-pill'>brak konieczności leczenia przeciwgrzybiczego</span>.",
      desc: "Przejściowe uszkodzenie aparatu paznokciowego i złuszczanie płytek paznokciowych.",
      drugTarget: "Postępowanie zachowawcze: <span class='dose-pill'>ochrona łożyska paznokcia</span>, natłuszczanie maściami z witaminą A, <span class='dose-pill'>brak konieczności leczenia przeciwgrzybiczego</span>."
    }
  ],
  diffTable: {
    title: "⚔️ Tabela Różnicowa: HFMD vs Herpangina vs Opryszczkowe zapalenie jamy ustnej (HSV) vs Ospa wietrzna",
    headers: ["Cecha kliniczna", "HFMD (Choroba dłoni, stóp i ust)", "Herpangina (Coxsackie A)", "Pierwotne zapalenie HSV-1", "Ospa wietrzna (VZV)"],
    rows: [
      ["Etiologia", "Coxsackie A16, EV71, Coxsackie A6", "Wirusy Coxsackie A (1-10, 16, 22)", "Herpes simplex virus typ 1 (HSV-1)", "Varicella Zoster Virus (VZV)"],
      ["Lokalizacja zmian w jamie ustnej", "Przednia część: policzki, dziąsła, język, podniebienie twarde", "Tylna część: łuki podniebienne, migdałki, języczek", "Rozlane: dziąsła (gingivitis), wargi, język, skóra wokół ust", "Podniebienie miękkie, łuki podniebienne (nieliczne pęcherzyki)"],
      ["Zmiany na skórze", "Dłonie, podeszwy stóp, pośladki (podłużne pęcherzyki)", "BRAK jakichkolwiek wykwitów skórnych", "Pęcherzyki na czerwieni wargowej i skórze wokół ust", "Uogólnione: tułów, twarz, owłosiona głowa ('gwiaździste niebo')"],
      ["Zajęcie dziąseł (gingivitis)", "Miernie nasilone lub nieobecne", "Całkowicie nieobecne", "Masywne, obrzęknięte, krwawiące dziąsła (patognomoniczne!)", "Brak zapalenia dziąseł"],
      ["Ślinotok i odynofagia", "Nasilone (odmowa picia)", "Umiarkowane do nasilonych", "Bardzo silne, fetor ex ore (cuchnący oddech)", "Łagodne lub nieobecne"],
      ["Późne powikłanie paznokciowe", "Onychomadesis (schodzenie paznokci po 1-2 mies.)", "Nie występuje", "Nie występuje", "Nie występuje"],
      ["Leczenie przyczynowe", "Brak leczenia przeciwwirusowego (objawowe)", "Wyłącznie leczenie objawowe", "Acyklowir doustnie/dożylnie (skuteczny wobec HSV)", "Objawowe; Acyklowir w grupach ryzyka"],
      ["Izolacja", "Do ustąpienia gorączki i podsuszenia pęcherzyków", "Do ustąpienia gorączki i bólu gardła", "Do przyschnięcia pęcherzyków na wargach", "Do przyschnięcia wszystkich pęcherzyków w strupki"]
    ]
  },
  dutySummary: {
    overview: "Choroba dłoni, stóp i jamy ustnej (HFMD / potocznie 'choroba bostońska') jest powszechną, wysoce zaraźliwą infekcją enterowirusową (głównie Coxsackie A16 i A6) małych dzieci. Charakteryzuje się gorączką, bolesnymi owrzodzeniami przedniej części jamy ustnej (enanthema) powodującymi odynofagię i ślinotok, oraz owalnymi, podłużnymi pęcherzykami na dłoniach, stopach i pośladkach. Głównym niebezpieczeństwem w fazie ostrej jest odwodnienie; późnym łagodnym następstwem bywa onychomadesis (złuszczanie paznokci).",
    diagnostics: "1. Rozpoznanie kliniczne na podstawie charakterystycznej triady wykwitów: afty w jamie ustnej + pęcherzyki na dłoniach i podeszwach stóp.<br>2. Ocena stopnia nawodnienia pacjenta (ocena napięcia ciemiączka, elastyczności skóry, diurezy i tętna).<br>3. W przypadkach ciężkich lub nietypowych: badanie RT-PCR w kierunku RNA enterowirusów z wymazu z gardła, płynu pęcherzykowego lub stolca.<br>4. Monitorowanie neurologiczne w kierunku ewentualnego zakażenia neurotropowym szczepem Enterowirusa 71 (drżenia, ataksja, bezdechy).",
    drugsAndDoses: "1. Analgezja i leczenie przeciwgorączkowe I rzutu: <span class='dose-pill'>Paracetamol 15 mg/kg m.c. p.o.</span> co 4-6 h naprzemiennie z <span class='dose-pill'>Ibuprofenem 10 mg/kg m.c. p.o.</span> co 8 h.<br>2. Znieczulenie miejscowe jamy ustnej: <span class='dose-pill'>preparaty w sprayu lub żelu z kwasem hialuronowym i lidokainą</span> przed posiłkami i piciem.<br>3. Doustne płyny nawadniające: <span class='dose-pill'>Doustny Płyn Nawadniający (DPN) o obniżonej osmolalności</span> podawany schłodzony łyżeczką lub strzykawką co 5 minut.<br>4. W razie ciężkiego odwodnienia i braku tolerancji doustnej: <span class='dose-pill'>PWE 20 ml/kg m.c. i.v. w ciągu 1 godziny</span>.<br>5. KATEGORYCZNY ZAKAZ: Acyklowir jest całkowicie nieskuteczny w enterowirusach!",
    procedures: "1. Karmienie chłodnymi, papkowatymi, łagodnymi pokarmami (lody waniliowe, jogurty naturalne, zimne mleko, mus jabłkowy); eliminacja soków cytrusowych, pomidorów i potraw słonych.<br>2. Ścisła higiena rąk rodziców po zmianie pieluszki (wirus w kale do 8-10 tygodni).<br>3. Pielęgnacja skóry dłoni i stóp: zakaz przekłuwania pęcherzyków, przemywanie letnią wodą z mydłem.<br>4. Uspokojenie rodziców co do możliwości późniejszego bezbolesnego schodzenia paznokci (onychomadesis).",
    monitoring: "1. Kontrola bilansu płynów i objętości oddawanego moczu (minimum 1-2 ml/kg/h).<br>2. Obserwacja gojenia nadżerek w jamie ustnej (zwykle ustępują w ciągu 5-7 dni).<br>3. Czujność w kierunku objawów alarmowych OUN (drgawki, mioklonie, senność patologiczna, wymioty chlustające – podejrzenie EV71).<br>4. Ocena płytek paznokciowych po 1-2 miesiącach od zachorowania."
  },
  lekQuestions: [
    {
      id: 1,
      q: "Która z wymienionych lokalizacji wykwitów skórno-śluzówkowych jest najbardziej charakterystyczna dla choroby dłoni, stóp i jamy ustnej (HFMD)?",
      opts: [
        "A. Bolesne nadżerki na błonie śluzowej policzków i języka oraz owalne pęcherzyki na dłoniach, podeszwach stóp i pośladkach",
        "B. Pęcherzyki wyłącznie na owłosionej skórze głowy i powiekach",
        "C. Zmiany rumieniowe ograniczone do fałdów pachwinowych i pachy",
        "D. Wykwity grudkowe na grzbietach obu rąk bez zmian w jamie ustnej",
        "E. Owrzodzenia wyłącznie na małżowinach usznych"
      ],
      options: [
        "A. Bolesne nadżerki na błonie śluzowej policzków i języka oraz owalne pęcherzyki na dłoniach, podeszwach stóp i pośladkach",
        "B. Pęcherzyki wyłącznie na owłosionej skórze głowy i powiekach",
        "C. Zmiany rumieniowe ograniczone do fałdów pachwinowych i pachy",
        "D. Wykwity grudkowe na grzbietach obu rąk bez zmian w jamie ustnej",
        "E. Owrzodzenia wyłącznie na małżowinach usznych"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Prawidłowa odpowiedź: A. HFMD charakteryzuje się triadą: bolesne nadżerki/afty w jamie ustnej (enanthema) oraz pęcherzyki o podłużnym kształcie na dłoniach, podeszwach stóp oraz pośladkach (exanthema).",
      expl: "Prawidłowa odpowiedź: A. HFMD charakteryzuje się triadą: bolesne nadżerki/afty w jamie ustnej (enanthema) oraz pęcherzyki o podłużnym kształcie na dłoniach, podeszwach stóp oraz pośladkach (exanthema)."
    },
    {
      id: 2,
      q: "Który z poniższych wirusów jest NAJCZĘSTSZYM czynnikiem etiologicznym typowej postaci HFMD w Europie?",
      opts: [
        "A. Coxsackie A16",
        "B. Wirus ospy wietrznej (VZV)",
        "C. Herpes simplex wirus typ 1 (HSV-1)",
        "D. Wirus Epsteina-Barr (EBV)",
        "E. Parwowirus B19"
      ],
      options: [
        "A. Coxsackie A16",
        "B. Wirus ospy wietrznej (VZV)",
        "C. Herpes simplex wirus typ 1 (HSV-1)",
        "D. Wirus Epsteina-Barr (EBV)",
        "E. Parwowirus B19"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Prawidłowa odpowiedź: A. Najczęstszą przyczyną klasycznej HFMD jest wirus Coxsackie A16 z rodzaju Enterovirus. Innymi patogenami są Coxsackie A6 oraz Enterowirus 71 (EV71).",
      expl: "Prawidłowa odpowiedź: A. Najczęstszą przyczyną klasycznej HFMD jest wirus Coxsackie A16 z rodzaju Enterovirus. Innymi patogenami są Coxsackie A6 oraz Enterowirus 71 (EV71)."
    },
    {
      id: 3,
      q: "Czym jest onychomadesis obserwowane u dzieci po przebyciu choroby dłoni, stóp i jamy ustnej?",
      opts: [
        "A. Bezbolesnym oddzielaniem się i odpadaniem płytek paznokciowych u rąk i stóp po 4-8 tygodniach od infekcji",
        "B. Zakażeniem bakteryjnym wałów paznokciowych wywołanym przez gronkowca",
        "C. Trwałą martwicą opuszek palców",
        "D. Płaskostopiem poprzecznym pourazowym",
        "E. Wylewami krwawymi pod wszystkimi paznokciami"
      ],
      options: [
        "A. Bezbolesnym oddzielaniem się i odpadaniem płytek paznokciowych u rąk i stóp po 4-8 tygodniach od infekcji",
        "B. Zakażeniem bakteryjnym wałów paznokciowych wywołanym przez gronkowca",
        "C. Trwałą martwicą opuszek palców",
        "D. Płaskostopiem poprzecznym pourazowym",
        "E. Wylewami krwawymi pod wszystkimi paznokciami"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Prawidłowa odpowiedź: A. Onychomadesis to przejściowe, bezbolesne oddzielenie się płytek paznokciowych od macierzy, występujące 1-2 miesiące po HFMD w wyniku przejściowego zahamowania funkcji macierzy paznokcia. Zmiany ustępują całkowicie samoistnie wraz ze wzrostem nowej płytki.",
      expl: "Prawidłowa odpowiedź: A. Onychomadesis to przejściowe, bezbolesne oddzielenie się płytek paznokciowych od macierzy, występujące 1-2 miesiące po HFMD w wyniku przejściowego zahamowania funkcji macierzy paznokcia. Zmiany ustępują całkowicie samoistnie wraz ze wzrostem nowej płytki."
    },
    {
      id: 4,
      q: "Czym różni się herpangina od choroby dłoni, stóp i jamy ustnej (HFMD)?",
      opts: [
        "A. W herpanginie owrzodzenia zlokalizowane są wyłącznie w tylnej części gardła (łuki podniebienne, migdałki, języczek) i nie ma wykwitów na dłoniach i stopach",
        "B. W herpanginie zawsze występuje ropne zapalenie opon mózgowych",
        "C. Herpangina wywoływana jest przez bakterie Pseudomonas aeruginosa",
        "D. W herpanginie dochodzi do trwałej utraty mowy",
        "E. Herpangina występuje wyłącznie u osób dorosłych po 60. roku życia"
      ],
      options: [
        "A. W herpanginie owrzodzenia zlokalizowane są wyłącznie w tylnej części gardła (łuki podniebienne, migdałki, języczek) i nie ma wykwitów na dłoniach i stopach",
        "B. W herpanginie zawsze występuje ropne zapalenie opon mózgowych",
        "C. Herpangina wywoływana jest przez bakterie Pseudomonas aeruginosa",
        "D. W herpanginie dochodzi do trwałej utraty mowy",
        "E. Herpangina występuje wyłącznie u osób dorosłych po 60. roku życia"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Prawidłowa odpowiedź: A. Herpangina ogranicza się do zmian pęcherzykowo-wrzodziejących na łukach podniebiennych, języczku i migdałkach, bez jakichkolwiek wykwitów na kończynach. W HFMD zmiany w jamie ustnej dotyczą części przedniej (policzki, dziąsła, język) i towarzyszy im wysypka na rękach i stopach.",
      expl: "Prawidłowa odpowiedź: A. W herpanginie owrzodzenia zlokalizowane są wyłącznie w tylnej części gardła (łuki podniebienne, migdałki, języczek) i nie ma wykwitów na dłoniach i stopach",
      expl: "Prawidłowa odpowiedź: A. Herpangina ogranicza się do zmian pęcherzykowo-wrzodziejących na łukach podniebiennych, języczku i migdałkach, bez jakichkolwiek wykwitów na kończynach. W HFMD zmiany w jamie ustnej dotyczą części przedniej (policzki, dziąsła, język) i towarzyszy im wysypka na rękach i stopach."
    },
    {
      id: 5,
      q: "Który enterowirus wywołujący HFMD wiąże się ze zwiększonym ryzykiem ciężkich powikłań neurologicznych (zapalenia pnia mózgu, obrzęku płuc i wstrząsu neurogennego)?",
      opts: [
        "A. Enterowirus 71 (EV71)",
        "B. Coxsackie A16",
        "C. Echowirus 1",
        "D. Rhinowirus A",
        "E. Poliwirus szczep Sabina 3"
      ],
      options: [
        "A. Enterowirus 71 (EV71)",
        "B. Coxsackie A16",
        "C. Echowirus 1",
        "D. Rhinowirus A",
        "E. Poliwirus szczep Sabina 3"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Prawidłowa odpowiedź: A. Enterowirus 71 (EV71) jest szczepem o wysokim neurotropizmie, mogącym powodować aseptyczne ZOMR, zapalenie pnia mózgu (rhombencephalitis), neurogenny obrzęk płuc i zapaść krążeniową, szczególnie w rejonie Azji i Pacyfiku.",
      expl: "Prawidłowa odpowiedź: A. Enterowirus 71 (EV71) jest szczepem o wysokim neurotropizmie, mogącym powodować aseptyczne ZOMR, zapalenie pnia mózgu (rhombencephalitis), neurogenny obrzęk płuc i zapaść krążeniową, szczególnie w rejonie Azji i Pacyfiku."
    },
    {
      id: 6,
      q: "Jak długo enterowirusy wywołujące HFMD mogą być wydalane ze stolcem po ustąpieniu objawów klinicznych?",
      opts: [
        "A. Przez kilka tygodni (zwykle od 4 do nawet 8-10 tygodni)",
        "B. Maksymalnie przez 12 godzin",
        "C. Nigdy nie są wydalane ze stolcem",
        "D. Przez całe życie pacjenta",
        "E. Wyłącznie w pierwszych 3 minutach defekacji"
      ],
      options: [
        "A. Przez kilka tygodni (zwykle od 4 do nawet 8-10 tygodni)",
        "B. Maksymalnie przez 12 godzin",
        "C. Nigdy nie są wydalane ze stolcem",
        "D. Przez całe życie pacjenta",
        "E. Wyłącznie w pierwszych 3 minutach defekacji"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Prawidłowa odpowiedź: A. Enterowirusy kolonizują przewód pokarmowy i mogą być wydalane z kałem przez wiele tygodni (często 6-10 tygodni) po wyzdrowieniu, stąd ogromne znaczenie higieny rąk po zmianie pieluszek.",
      expl: "Prawidłowa odpowiedź: A. Enterowirusy kolonizują przewód pokarmowy i mogą być wydalane z kałem przez wiele tygodni (często 6-10 tygodni) po wyzdrowieniu, stąd ogromne znaczenie higieny rąk po zmianie pieluszek."
    },
    {
      id: 7,
      q: "Jakie jest najczęstsze bezpośrednie wskazanie do hospitalizacji dziecka z chorobą dłoni, stóp i jamy ustnej?",
      opts: [
        "A. Odwodnienie wynikające z silnego bólu przy połykaniu (odynofagii) i odmowy przyjmowania płynów",
        "B. Pęknięcie śledziony",
        "C. Złamanie kości śródstopia",
        "D. Ostra niewydolność nerek wymagająca dializoterapii",
        "E. Skręt jądra"
      ],
      options: [
        "A. Odwodnienie wynikające z silnego bólu przy połykaniu (odynofagii) i odmowy przyjmowania płynów",
        "B. Pęknięcie śledziony",
        "C. Złamanie kości śródstopia",
        "D. Ostra niewydolność nerek wymagająca dializoterapii",
        "E. Skręt jądra"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Prawidłowa odpowiedź: A. Bolesne afty i nadżerki w jamie ustnej powodują, że dziecko nie chce połykać nawet płynów. Odwodnienie jest najczęstszą przyczyną kierowania chorych z HFMD na oddział szpitalny w celu nawadniania dożylnego.",
      expl: "Prawidłowa odpowiedź: A. Bolesne afty i nadżerki w jamie ustnej powodują, że dziecko nie chce połykać nawet płynów. Odwodnienie jest najczęstszą przyczyną kierowania chorych z HFMD na oddział szpitalny w celu nawadniania dożylnego."
    },
    {
      id: 8,
      q: "Czy Acyklowir jest skuteczny w leczeniu choroby dłoni, stóp i jamy ustnej (HFMD)?",
      opts: [
        "A. Nie, ponieważ Acyklowir działa wyłącznie na wirusy Herpes (HSV, VZV) kodujące kinazę tymidynową, a Enterowirusy są wirusami RNA pozbawionymi tego enzymu",
        "B. Tak, jest lekiem pierwszego rzutu z wyboru",
        "C. Jest skuteczny, ale tylko podawany we wlewie dokomorowym",
        "D. Działa wyłącznie w połączeniu z aspiryną",
        "E. Skraca czas wydalania wirusa w kale do 2 sekund"
      ],
      options: [
        "A. Nie, ponieważ Acyklowir działa wyłącznie na wirusy Herpes (HSV, VZV) kodujące kinazę tymidynową, a Enterowirusy są wirusami RNA pozbawionymi tego enzymu",
        "B. Tak, jest lekiem pierwszego rzutu z wyboru",
        "C. Jest skuteczny, ale tylko podawany we wlewie dokomorowym",
        "D. Działa wyłącznie w połączeniu z aspiryną",
        "E. Skraca czas wydalania wirusa w kale do 2 sekund"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Prawidłowa odpowiedź: A. Acyklowir jest inhibitorem polimerazy DNA wirusów Herpes i wymaga aktywacji przez wirusową kinazę tymidynową. Enterowirusy (wirusy RNA) nie kodują tego enzymu, dlatego acyklowir jest w HFMD całkowicie nieskuteczny.",
      expl: "Prawidłowa odpowiedź: A. Nie, ponieważ Acyklowir działa wyłącznie na wirusy Herpes (HSV, VZV) kodujące kinazę tymidynową, a Enterowirusy są wirusami RNA pozbawionymi tego enzymu",
      expl: "Prawidłowa odpowiedź: A. Acyklowir jest inhibitorem polimerazy DNA wirusów Herpes i wymaga aktywacji przez wirusową kinazę tymidynową. Enterowirusy (wirusy RNA) nie kodują tego enzymu, dlatego acyklowir jest w HFMD całkowicie nieskuteczny."
    },
    {
      id: 9,
      q: "Jakie zalecenia żywieniowe należy przekazać rodzicom dziecka z bolesnymi nadżerkami w jamie ustnej w przebiegu HFMD?",
      opts: [
        "A. Podawanie chłodnych, łagodnych, niekwaśnych pokarmów (lody waniliowe, jogurty, chłodne mleko) i unikanie soków cytrusowych, pomidorów oraz słonych dań",
        "B. Podawanie gorącego rosołu z dużą ilością pieprzu i czosnku",
        "C. Picie wyłącznie soku z kiszonej kapusty",
        "D. Karmienie sucharami i chipsami solonymi",
        "E. Zakaz picia płynów przez 48 godzin"
      ],
      options: [
        "A. Podawanie chłodnych, łagodnych, niekwaśnych pokarmów (lody waniliowe, jogurty, chłodne mleko) i unikanie soków cytrusowych, pomidorów oraz słonych dań",
        "B. Podawanie gorącego rosołu z dużą ilością pieprzu i czosnku",
        "C. Picie wyłącznie soku z kiszonej kapusty",
        "D. Karmienie sucharami i chipsami solonymi",
        "E. Zakaz picia płynów przez 48 godzin"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Prawidłowa odpowiedź: A. Chłodne i papkowate pokarmy (np. lody, jogurty) działają kojąco i znieczulająco na obnażone nocyceptory, podczas gdy kwaśne owoce, sól i gorące potrawy wywołują dotkliwy ból.",
      expl: "Prawidłowa odpowiedź: A. Podawanie chłodnych, łagodnych, niekwaśnych pokarmów (lody waniliowe, jogurty, chłodne mleko) i unikanie soków cytrusowych, pomidorów oraz słonych dań",
      expl: "Prawidłowa odpowiedź: A. Chłodne i papkowate pokarmy (np. lody, jogurty) działają kojąco i znieczulająco na obnażone nocyceptory, podczas gdy kwaśne owoce, sól i gorące potrawy wywołują dotkliwy ból."
    },
    {
      id: 10,
      q: "Kiedy dziecko z niepowikłaną chorobą HFMD może powrócić do przedszkola?",
      opts: [
        "A. Po ustąpieniu gorączki na co najmniej 24 godziny, wygojeniu owrzodzeń w jamie ustnej (brak bólu przy jedzeniu) i podsuszeniu pęcherzyków skórnych",
        "B. Dopiero po 10 tygodniach, gdy wirus przestanie być obecny w kale",
        "C. W pierwszym dniu choroby z aktywną gorączką 39°C",
        "D. Po wykonaniu gastroskopii kontrolnej",
        "E. Dziecko nigdy nie może wrócić do przedszkola"
      ],
      options: [
        "A. Po ustąpieniu gorączki na co najmniej 24 godziny, wygojeniu owrzodzeń w jamie ustnej (brak bólu przy jedzeniu) i podsuszeniu pęcherzyków skórnych",
        "B. Dopiero po 10 tygodniach, gdy wirus przestanie być obecny w kale",
        "C. W pierwszym dniu choroby z aktywną gorączką 39°C",
        "D. Po wykonaniu gastroskopii kontrolnej",
        "E. Dziecko nigdy nie może wrócić do przedszkola"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Prawidłowa odpowiedź: A. Dziecko może wrócić do grupy rówieśniczej, gdy minęła gorączka (min. 24 h), nie odczuwa bólu w jamie ustnej, normalnie pije i je, a pęcherzyki przyschły (zwykle po 5-7 dniach).",
      expl: "Prawidłowa odpowiedź: A. Po ustąpieniu gorączki na co najmniej 24 godziny, wygojeniu owrzodzeń w jamie ustnej (brak bólu przy jedzeniu) i podsuszeniu pęcherzyków skórnych",
      expl: "Prawidłowa odpowiedź: A. Dziecko może wrócić do grupy rówieśniczej, gdy minęła gorączka (min. 24 h), nie odczuwa bólu w jamie ustnej, normalnie pije i je, a pęcherzyki przyschły (zwykle po 5-7 dniach)."
    },
    {
      id: 11,
      q: "Dlaczego potoczna polska nazwa 'choroba bostońska' jest z punktu widzenia historii medycyny i nozologii nieścisła?",
      opts: [
        "A. Ponieważ historyczna epidemia w Bostonie w 1951 r. była wywołana przez echowirus 16 i przebiegała bez charakterystycznego zajęcia dłoni i stóp (była to tzw. osutka bostońska)",
        "B. Ponieważ choroba występuje wyłącznie na Biegunie Południowym",
        "C. Ponieważ Boston jest miastem w Azji",
        "D. Ponieważ wirus Coxsackie został odkryty w Paryżu",
        "E. Ponieważ choroba bostońska dotyczy wyłącznie koni"
      ],
      options: [
        "A. Ponieważ historyczna epidemia w Bostonie w 1951 r. była wywołana przez echowirus 16 i przebiegała bez charakterystycznego zajęcia dłoni i stóp (była to tzw. osutka bostońska)",
        "B. Ponieważ historyczna epidemia w Bostonie w 1951 r. była wywołana przez echowirus 16 i przebiegała bez charakterystycznego zajęcia dłoni i stóp (była to tzw. osutka bostońska)",
        "C. Ponieważ Boston jest miastem w Azji",
        "D. Ponieważ wirus Coxsackie został odkryty w Paryżu",
        "E. Ponieważ choroba bostońska dotyczy wyłącznie koni"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Prawidłowa odpowiedź: A. W 1951 r. w Bostonie Neva i Enders opisali 'osutkę bostońską' wywołaną przez Echovirus 16 (osutka plamista na tułowiu i twarzy). Zbieżność nazw doprowadziła w Polsce do potocznego i błędnego nazywania HFMD (wywoływanej przez Coxsackie A16) 'chorobą bostońską'.",
      expl: "Prawidłowa odpowiedź: A. Ponieważ historyczna epidemia w Bostonie w 1951 r. była wywołana przez echowirus 16 i przebiegała bez charakterystycznego zajęcia dłoni i stóp (była to tzw. osutka bostońska)",
      expl: "Prawidłowa odpowiedź: A. W 1951 r. w Bostonie Neva i Enders opisali 'osutkę bostońską' wywołaną przez Echovirus 16 (osutka plamista na tułowiu i twarzy). Zbieżność nazw doprowadziła w Polsce do potocznego i błędnego nazywania HFMD (wywoływanej przez Coxsackie A16) 'chorobą bostońską'."
    }
  ],
  flashcards: [
    {
      front: "Jakie są charakterystyczne cechy wykwitów w HFMD ('chorobie bostońskiej')?",
      back: "• Bolesne owrzodzenia/afty w przedniej części jamy ustnej (policzki, język, dziąsła).<br>• Podłużne, owalne pęcherzyki z czerwoną obwódką na dłoniach, podeszwach stóp i pośladkach.<br>• Ułożone wzdłuż linii papilarnych skóry."
    },
    {
      front: "Jakie patogeny najczęściej wywołują HFMD?",
      back: "• Wirusy Coxsackie A16 (najczęstszy, łagodny przebieg).<br>• Coxsackie A6 (rozległa osutka, częste onychomadesis).<br>• Enterowirus 71 (EV71 – ryzyko ciężkiego zapalenia pnia mózgu i obrzęku płuc!)."
    },
    {
      front: "Co to jest onychomadesis po przebyciu HFMD?",
      back: "• Bezbolesne oddzielanie się i odpadanie płytek paznokciowych u rąk i stóp po 4-8 tygodniach od infekcji.<br>• Wynika z przejściowego zatrzymania aktywności macierzy paznokcia.<br>• Zjawisko łagodne – odrasta zdrowy paznokieć."
    },
    {
      front: "Jak odróżnić HFMD od herpanginy?",
      back: "• HFMD: zmiany w przedniej części jamy ustnej (policzki, język, dziąsła) + pęcherzyki na dłoniach i stopach.<br>• Herpangina: owrzodzenia wyłącznie w tylnej części gardła (łuki podniebienne, migdałki, języczek), BRAK zmian na kończynach!"
    },
    {
      front: "Jakie jest główne niebezpieczeństwo w ostrej fazie HFMD?",
      back: "• Odwodnienie z powodu silnego bólu przy połykaniu (odynofagii).<br>• Postępowanie: intensywne znieczulenie (Paracetamol + Ibuprofen, aerozole z lidokainą), chłodne płyny, lody."
    },
    {
      front: "Czy w HFMD stosuje się Acyklowir?",
      back: "• NIE! Acyklowir jest całkowicie nieskuteczny.<br>• Enterowirusy to wirusy RNA bez kinazy tymidynowej.<br>• Leczenie HFMD jest wyłącznie objawowe."
    }
  ]
};

async function main() {
  await saveCase(case117);
}
main();

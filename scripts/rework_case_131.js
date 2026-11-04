const fs = require('fs');
const path = require('path');
const { encryptStringAes } = require('./encrypt_case.js');

const MASTER_KEY = '@LEKSzymon28111999';
const CASES_DIR = path.join(__dirname, '..', 'cases');

console.log("Generating Case 131: Skręt esicy (Sigmoid Volvulus)...");

async function saveCase(caseData) {
  const filePath = path.join(CASES_DIR, caseData.filename);
  const jsonStr = JSON.stringify(caseData, null, 2);
  const encrypted = await encryptStringAes(jsonStr, MASTER_KEY);
  fs.writeFileSync(filePath, JSON.stringify(encrypted, null, 2), 'utf8');
  console.log(`[SAVED] Case #${caseData.id}: ${caseData.filename} (LEK Qs: ${caseData.lekQuestions.length}, Steps: ${caseData.steps.length}, Flashcards: ${caseData.flashcards.length})`);
}

const case131 = {
  id: 131,
  filename: "131_skret_esicy_volvulus.json",
  dept: "Chirurgia ogólna",
  shortTitle: "76-letni Stanisław – Olbrzymie wzdęcie brzucha, objaw 'ziarna kawy' i zatrzymanie gazów (Skręt esicy)",
  diagnosisTitle: "Niedrożność mechaniczna jelita grubego w przebiegu skrętu esicy (Sigmoid Volvulus) z zamkniętą pętlą (closed-loop) kwalifikowana do pilnej endoskopowej derotacji lub zabiegu operacyjnego",
  vitals: [
    { label: "Wzdęcie brzucha", val: "Skrajne / asymetryczne", sub: "Brzuch napięty jak bęben (meteorismus)", status: "vital-crit" },
    { label: "RTG jamy brzusznej", val: "Objaw 'ziarna kawy'", sub: "Olbrzymia rozdęta pętla esicy bez haustracji", status: "vital-crit" },
    { label: "Częstość akcji serca (HR)", val: "106/min", sub: "Tachykardia kompensacyjna (ucisk na przeponę i IVC)", status: "vital-warn" },
    { label: "Częstość oddechów (RR)", val: "22/min", sub: "Spłycony tor oddechowy przez uniesienie przepony", status: "vital-warn" }
  ],
  vitalsObj: { hr: 106, bp: "128/75", spo2: 96, rr: 22, temp: 37.4, gcs: 14 },
  story: `<p><strong>Pacjent:</strong> 76-letni Stanisław, pensjonariusz Domu Pomocy Społecznej, z przewlekłym otępieniem naczyniowym i chorobą Parkinsona, został przywieziony przez pogotowie ratunkowe z powodu gwałtownie narastającego od wczoraj olbrzymiego wzdęcia brzucha ('brzuch jak balon'), braku oddawania stolca i gazów od 48 godzin oraz narastającej apatii.</p><p><strong>Wywiad chorobowy:</strong> Opiekunowie z DPS podają, że pacjent cierpi na uporczywe, przewlekłe zaparcia (oddaje twarde stolce raz na 5-7 dni, regularnie przyjmuje laktulozę i czopki bisakodylu) oraz przyjmuje leki neuroleptyczne i przeciwparkinsonowskie o działaniu przeciwcholinergicznym. Od dwóch dni nie oddał gazów ani stolca. Wczoraj wieczorem brzuch chorego stał się wyraźnie powiększony, a od dzisiejszego rana jest potężnie wzdęty, napięty i twardy. Pacjent pokłada się, jest osłabiony, dwukrotnie zwymiotował treścią żołądkowo-śluzową. W wywiadzie brak przebytych operacji brzusznych.</p><p><strong>Badanie przedmiotowe na SOR:</strong> Mężczyzna w wieku podeszłym, podsypiający, kontakt słowny ograniczony przez demencję (GCS 14). Oddech przyspieszony, spłycony (RR 22/min) z powodu znacznego ograniczenia ruchomości przepony przez rozdęty brzuch. Brzuch potężnie, asymetrycznie wzdęty, bardziej po stronie prawej i w śródbrzuszu, napięty jak bęben. W opukiwaniu nad całym brzuchem stwierdza się głośny, wysoki odgłos bębenkowy (tympaniczny). Palpacyjnie powłoki napięte, ale bez twardej obrony mięśniowej i bez objawu Blumberga (brak rozlanego zapalenia otrzewnej). Osłuchowo perystaltyka skrajnie leniwa, okresowo słyszalny pojedynczy wysoki, metaliczny dźwięk przelewającego się płynu. Badanie wrót przepuklinowych: wolne, bez uwięźnięcia. W badaniu per rectum (DRE): bańka odbytnicy całkowicie pusta, zapadnięta, ściany gładkie, na rękawiczce brak śladów świeżej krwi i kału.</p>`,
  labs: {
    "Morfologia i parametry zapalne": [
      { name: "Leukocyty (WBC)", val: "10,8 tys./µl", norm: "4,0 - 10,0 tys./µl", flag: "HIGH" },
      { name: "Białko C-reaktywne (CRP)", val: "24,0 mg/l", norm: "< 5,0 mg/l", flag: "HIGH" },
      { name: "Kwas mlekowy (mleczany)", val: "1,5 mmol/l", norm: "0,5 - 2,0 mmol/l", flag: "NORMAL" },
      { name: "Hemoglobina (Hb)", val: "14,2 g/dl", norm: "13,0 - 17,0 g/dl", flag: "NORMAL" },
      { name: "Hematokryt (Ht)", val: "44 %", norm: "40 - 50 %", flag: "NORMAL" }
    ],
    "Biochemia i elektrolity": [
      { name: "Potas (K+)", val: "3,6 mmol/l", norm: "3,5 - 5,1 mmol/l", flag: "NORMAL" },
      { name: "Sód (Na+)", val: "136 mmol/l", norm: "135 - 145 mmol/l", flag: "NORMAL" },
      { name: "Kreatynina w surowicy", val: "1,12 mg/dl", norm: "0,70 - 1,20 mg/dl", flag: "NORMAL" },
      { name: "Mocznik", val: "46 mg/dl", norm: "15 - 45 mg/dl", flag: "HIGH" }
    ],
    "Przeglądowe RTG jamy brzusznej na stojąco": [
      { name: "Pętla esicy", val: "Olbrzymia, masywnie rozdęta pętla jelitowa (średnica >11 cm) wybiegająca z lewego dołu biodrowego ku prawemu podżebrzu, tworząca klasyczny objaw 'ziarna kawy' (coffee bean sign) z centralną podwójną linią ściany jelita i brakiem haustracji", norm: "Prawidłowy rozkład gazów", flag: "CRIT_HIGH" },
      { name: "Poziomy płynów", val: "Dwa szerokie poziomy płynów u podstawy skręconej pętli esicy", norm: "Nieobecne", flag: "CRIT_HIGH" },
      { name: "Wolny gaz podprzeponowy", val: "Brak cech pneumoperitoneum", norm: "Nieobecny", flag: "NORMAL" }
    ]
  },
  steps: [
    {
      title: "Krok 1: Identyfikacja objawu 'ziarna kawy' (Coffee Bean Sign) w RTG",
      text: "Wykonujesz przeglądowe RTG jamy brzusznej u 76-letniego pacjenta ze skrajnym wzdęciem brzucha. Widzisz olbrzymią, rozdętą pętlę jelitową o średnicy 11 cm, wybiegającą z lewego dołu biodrowego do góry, przypominającą gigantyczne ziarno kawy. Jaka jednostka chorobowa odpowiada za ten patognomoniczny obraz?",
      options: [
        "Skręt esicy (Sigmoid Volvulus), w którym pętla esicy ulega skręceniu wokół własnej osi krezki, tworząc zamkniętą pętlę i objaw 'ziarna kawy'",
        "Ostre kamicze zapalenie pęcherzyka żółciowego z wodniakiem",
        "Perforacja wrzodu trawiennego do wolnej jamy otrzewnej",
        "Rzekomobłoniaste zapalenie jelit z toksycznym rozdęciem okrężnicy"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Objaw 'ziarna kawy' (coffee bean sign / bent inner tube sign) na przeglądowym RTG jamy brzusznej jest patognomoniczny dla skrętu esicy (sigmoid volvulus).</strong> Skręcona wokół własnej osi długa, wiotka pętla esicy tworzy zamknięty obwód (closed-loop) – dwa ramiona pętli stykają się ze sobą pośrodku (tworząc bruzdę 'ziarna kawy'), a jej wierzchołek unosi się z lewego dołu biodrowego do góry i ku prawemu podżebrzu, osiągając nierzadko średnicę >10-15 cm.",
        "❌ BŁĄD! <strong>Wodniak pęcherzyka leży pod wątrobą w prawym podżebrzu</strong> i nie daje obrazu olbrzymiej pętli na całym brzuchu.",
        "❌ BŁĄD! <strong>Perforacja wrzodu charakteryzuje się sierpem wolnego gazu pod kopułą przepony,</strong> a nie pojedynczą olbrzymią pętlą 'ziarna kawy'.",
        "❌ BŁĄD! <strong>W megacolon toxicum dochodzi do rozdęcia poprzecznicy z zachowaniem haustracji i ciężką biegunką,</strong> a nie typowego obrazu skręconego ziarna."
      ]
    },
    {
      title: "Krok 2: Czynniki ryzyka i patomechanizm skrętu esicy",
      text: "Lekarz stażysta pyta, dlaczego skręt esicy występuje tak typowo u starszych pensjonariuszy domów opieki lub pacjentów neuropsychiatrycznych. Który zestaw czynników predysponuje do tej patologii?",
      options: [
        "Wydłużona, wiotka pętla esicy (dolichosigmoideum) z wąską podstawą krezki (anatomiczna predyspozycja), przewlekłe zaparcia, unieruchomienie w łóżku oraz leki psychotropowe/przeciwcholinergiczne zwalniające motorykę jelit",
        "Dieta bogata w świeże owoce morza i ostre przyprawy",
        "Wrodzony brak wyrostka robaczkowego i pęcherzyka żółciowego",
        "Młody wiek i intensywny wyczynowy trening maratoński"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Do skrętu esicy dochodzi w obecności dwóch składowych: anatomicznej i czynnościowej.</strong> Predyspozycja anatomiczna to długa, pętlicowata esica (dolichosigmoideum) o wąskiej podstawie krezki. Składowa czynnościowa to wieloletnie przewlekłe zaparcia z zaleganiem mas kałowych (obciążających pętlę), podeszły wiek, bezruch oraz stosowanie neuroleptyków lub leków przeciwparkinsonowskich (antycholinergicznych) u chorych w domach opieki, co sprzyja obrotowi pętli wokół wąskiej szypuły naczyniowej.",
        "❌ BŁĄD! <strong>Dieta nie jest czynnikiem sprawczym;</strong> kluczowa jest atonia jelit i leki zwalniające pasaż.",
        "❌ BŁĄD! <strong>Anomalie wyrostka nie mają związku z krezką esicy.</strong>",
        "❌ BŁĄD! <strong>Skręt esicy to typowa choroba geriatryczna (szczyt >70-80 lat),</strong> u maratończyków jest skrajną rzadkością."
      ]
    },
    {
      title: "Krok 3: Ocena powikłań – wykluczenie zgorzeli i zapalenia otrzewnej",
      text: "Przed wyborem metody leczenia kluczowe jest wykluczenie martwicy (zgorzeli) skręconej esicy i perforacji. U pana Stanisława mleczany wynoszą 1,5 mmol/l (norma), temperatura 37,4°C, brak objawów otrzewnowych (Blumberg ujemny), a na RTG brak wolnego gazu. Co to oznacza dla planu postępowania?",
      options: [
        "Pacjent nie ma cech martwicy ani perforacji jelita, co pozwala na podjęcie próby nieoperacyjnej, endoskopowej derotacji i dekompresji sigmoidoskopem jako leczenia pierwszego rzutu",
        "Pacjent jest w stadium martwicy i wymaga natychmiastowej laparotomii bez badania endoskopowego",
        "Można wypisać pacjenta do domu z zaleceniem czopków glicerynowych",
        "Należy podać 2 litry doustnego preparatu Fortrans do wypicia w ciągu godziny"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Przy braku cech zapalenia otrzewnej, prawidłowych mleczanach i braku sepsy lekiem pierwszego wyboru w niepowikłanym skręcie esicy jest nieoperacyjna derotacja endoskopowa (sigmoidoskopia / kolonoskopia).</strong> Pozwala ona na odbarczenie gazu i płynu oraz rozprostowanie skręconej pętli, zamieniając zabieg ostry w planowy.",
        "❌ BŁĄD! <strong>Prawidłowe mleczany i brak objawów otrzewnowych wykluczają zaawansowaną martwicę;</strong> natychmiastowa laparotomia u obciążonego geriatrycznie chorego wiąże się ze znacznie wyższą śmiertelnością niż wstępna derotacja endoskopowa.",
        "❌ BŁĄD! <strong>Wypisanie chorego z mechaniczną niedrożnością to błąd sztuki –</strong> doprowadziłoby do pęknięcia esicy w ciągu kilkunastu godzin.",
        "❌ BŁĄD! <strong>Środki przeczyszczające w mechanicznej niedrożności jelit są bezwzględnie zakazane!</strong>"
      ]
    },
    {
      title: "Krok 4: Zabieg pierwszego rzutu – Endoskopowa derotacja i drenaż doodbytniczy",
      text: "Na czym technicznie polega procedura endoskopowej derotacji w niepowikłanym skręcie esicy i jakie urządzenie należy pozostawić w świetle jelita po udanym zabiegu?",
      options: [
        "Wprowadza się sigmoidoskop lub kolonoskop do miejsca zwężenia skrętowego (obraz 'wirówki' / spiralnych fałdów), delikatnie przeprowadza końcówkę aparatu przez zwężenie do rozdętej pętli, odsysając gaz i płyn pod ciśnieniem, a po rozprostowaniu pętli wprowadza się rurkę doodbytniczą (rectal tube) na 24-48 godzin, aby zapobiec natychmiastowemu ponownemu skręceniu",
        "Wykonuje się biopsję kleszczykową ściany esicy na głębokość 2 cm",
        "Wstrzykuje się 100 ml adrenaliny w błonę podśluzową",
        "Zakłada się opaski elastyczne na fałdy błony śluzowej"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Endoskopowa detorsja (derotacja) pod kontrolą wzroku polega na zidentyfikowaniu spiralnego zwężenia (twist) i ostrożnym wprowadzeniu instrumentu do światła rozdętej esicy.</strong> Po przekroczeniu przeszkody następuje gwałtowny wypływ uwięzionego gazu i cuchnącej płynnej treści, co natychmiast odbarcza brzuch. Po wycofaniu endoskopu <strong>bezwzględnie pozostawia się miękką rurkę doodbytniczą (rectal tube)</strong> powyżej miejsca skrętu na 24-48 godzin, ponieważ bez drenażu ryzyko natychmiastowego ponownego skrętu w ciągu pierwszych godzin wynosi ponad 50%!",
        "❌ BŁĄD! <strong>Biopsja ściany napiętego jelita grozi jatrogenną perforacją.</strong>",
        "❌ BŁĄD! <strong>Adrenalina wywołałaby skurcz naczyń i natychmiastowe niedokrwienie pętli.</strong>",
        "❌ BŁĄD! <strong>Opaskowanie stosuje się w żylakach przełyku lub guzkach krwawniczych,</strong> a nie w skręcie esicy."
      ]
    },
    {
      title: "Krok 5: Ocena endoskopowa śluzówki w czasie sigmoidoskopii",
      text: "W trakcie wprowadzania sigmoidoskopu endoskopista ocenia błonę śluzową w miejscu skrętu. Jaki obraz błony śluzowej jest bezwzględnym wskazaniem do NATYCHMIASTOWEGO PRZERWANIA endoskopii i pilnej operacji chirurgicznej?",
      options: [
        "Ciemnofioletowa, czarna, matowa śluzówka z owrzodzeniami i sączącą się ciemną krwią świadcząca o martwicy zgorzelinowej ściany jelita",
        "Różowa, lśniąca śluzówka z widoczną siatką naczyniową",
        "Obecność pojedynczych, drobnych uchyłków bez cech zapalenia",
        "Obecność resztek płynnego stolca w świetle jelita"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Stwierdzenie w badaniu endoskopowym cech martwicy zgorzelinowej (czarna, szarobrunatna śluzówka, brak połysku, owrzodzenia, martwicze naloty, wyciek brunatno-krwisty)</strong> oznacza, że ściana jelita uległa zawałowi i utraciła integralność mechaniczną. Dalsza insuflacja powietrza grozi natychmiastowym pęknięciem jelita. W takiej sytuacji należy natychmiast przerwać endoskopię i skierować chorego na blok operacyjny do pilnej resekcji!",
        "❌ BŁĄD! <strong>Różowa, lśniąca śluzówka to cecha jelita żywotnego,</strong> co pozwala na bezpieczną dekompresję.",
        "❌ BŁĄD! <strong>Uchyłki esicy występują powszechnie u osób starszych</strong> i nie są przeciwwskazaniem do derotacji.",
        "❌ BŁĄD! <strong>Płynny stolec to zjawisko typowe powyżej przeszkody.</strong>"
      ]
    },
    {
      title: "Krok 6: Problem nawrotowości skrętu i postępowanie definitywne",
      text: "U pana Stanisława endoskopowa derotacja zakończyła się pełnym sukcesem – brzuch stał się miękki i płaski, w kontrolnym RTG brak 'ziarna kawy'. Jaki jest odsetek nawrotów skrętu po samej nieoperacyjnej derotacji i jakie jest zalecane postępowanie definitywne?",
      options: [
        "Odsetek nawrotów po samej derotacji wynosi aż 50-70% (z czego część nawrotów przebiega z martwicą); u chorych w dobrym stanie ogólnym zaleca się planową resekcję esicy (sigmoidektomię) w czasie tej samej hospitalizacji po przygotowaniu jelita",
        "Nawrót jest niemożliwy, derotacja daje 100% trwałe wyleczenie",
        "Wystarczy podawać laktulozę przez 3 dni, by całkowicie zapobiec nawrotowi",
        "Zaleca się założenie stałego gipsu biodrowego na 6 miesięcy"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Chociaż endoskopowa derotacja jest skuteczna w opanowaniu ostrego epizodu u >75-80% chorych, wiąże się z dramatycznie wysokim odsetkiem nawrotów sięgającym 50-70% w ciągu kilku miesięcy!</strong> Każdy kolejny epizod niesie ze sobą ryzyko zgorzeli jelita i zgonu. Dlatego u pacjentów kwalifikujących się do operacji standardem jest wykonanie <strong>planowej resekcji esicy (sigmoidektomii z pierwotnym zespoleniem)</strong> po ustabilizowaniu stanu ogólnego i przygotowaniu jelita, najlepiej jeszcze w trakcie tej samej hospitalizacji.",
        "❌ BŁĄD! <strong>Nawrotowość skrętu bez resekcji jest jedną z najwyższych w chirurgii jelitowej.</strong>",
        "❌ BŁĄD! <strong>Środki osmotyczne nie likwidują anatomicznej przyczyny –</strong> długiej krezki i pętli esicy.",
        "❌ BŁĄD! <strong>Unieruchomienie w gipsie to absurd medyczny.</strong>"
      ]
    },
    {
      title: "Krok 7: Wybór metody operacyjnej w trybie ostrym (Operacja Hartmanna)",
      text: "Gdyby u pacjenta wystąpiła martwica esicy lub perforacja, konieczna jest pilna operacja ratunkowa. Jaki zabieg operacyjny jest złotym standardem z wyboru w powikłanym skręcie esicy z martwicą lub zapaleniem otrzewnej?",
      options: [
        "Operacja Hartmanna – resekcja martwiczej pętli esicy, wyłonienie bliższego końca w postaci kolostomii końcowej na lewym boku oraz ślepe zaszycie i pozostawienie w miednicy kikuta odbytnicy",
        "Prosta derotacja ręczna bez wycinania jelita z natychmiastowym zaszyciem powłok",
        "Wycięcie całego żołądka z pozostawieniem esicy",
        "Zespolenie omijające między żołądkiem a kątnicą"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>W trybie ostrym, w obecności martwicy jelita, rozlanego zapalenia otrzewnej, niestabilności hemodynamicznej lub sepsy zabiegiem z wyboru jest operacja sposobem Hartmanna.</strong> Polega ona na resekcji zmienionej martwiczo pętli esicy, wyłonieniu zdrowego bliższego końca jako pojedynczej kolostomii końcowej (odbytu sztucznego) w lewym dole biodrowym oraz zamknięciu (zaszyciu na głuche) kikuta odbytnicy w miednicy mniejszej. Pozwala to na uniknięcie wykonywania zespolenia jelitowego w warunkach zakażenia i niedokrwienia (co groziłoby nieszczelnością zespolenia i zgonem). Ciągłość przewodu pokarmowego można odtworzyć planowo po 3-6 miesiącach.",
        "❌ BŁĄD! <strong>Pozostawienie martwiczego jelita doprowadziłoby do nieuchronnego zgonu z powodu posocznicy kałowej.</strong>",
        "❌ BŁĄD! <strong>Żołądek jest zdrowy;</strong> operacja dotyczy esicy w miednicy mniejszej.",
        "❌ BŁĄD! <strong>Zespolenie omijające nie eliminuje martwicy i sepsy.</strong>"
      ]
    },
    {
      title: "Krok 8: Różnicowanie: Skręt esicy vs Skręt kątnicy (Cecal Volvulus)",
      text: "Lekarz dyżurny analizuje radiogram. Czym różni się skręt kątnicy (cecal volvulus) od skrętu esicy w obrazie radiologicznym i populacji chorych?",
      options: [
        "Skręt kątnicy występuje częściej u młodszych pacjentów (30-50 lat, wady zwrotu krezki, kobiety w ciąży); na RTG rozdęta kątnica przypomina 'przecinek' lub nerkę i przemieszcza się z prawego dołu biodrowego do lewego górnego kwadrantu brzucha (pod lewe podżebrze)",
        "Skręt kątnicy daje objaw ziarna kawy w prawym podżebrzu u 90-latków",
        "W skręcie kątnicy nigdy nie dochodzi do wzdęcia brzucha",
        "Skręt kątnicy leczy się wyłącznie tabletkami z węglem aktywnym"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>To klasyczne zróżnicowanie radiologiczne na egzaminie LEK:</strong><br>- <strong>Skręt esicy:</strong> podeszły wiek (>70 lat), pensjonariusze DPS, pętla wybiega z LEWEGO dołu biodrowego ku górze i na prawo, objaw 'ziarna kawy' (coffee bean sign).<br>- <strong>Skręt kątnicy (cecal volvulus):</strong> młodszy wiek (30-50 lat, często kobiety w ciąży, maratończycy), brak prawidłowego zrośnięcia prawej okrężnicy z otrzewną ścienną (cecum mobile); na RTG pętla ma kształt <strong>nerkowaty / przecinka</strong> i przemieszcza się z prawego dołu biodrowego do <strong>LEWEGO nadbrzusza / podżebrza</strong>. Skręt kątnicy niemal zawsze wymaga pilnej operacji (cholecystektomia / prawostronna hemikolektomia), ponieważ derotacja endoskopowa rzadko jest skuteczna.",
        "❌ BŁĄD! <strong>Ziarno kawy to domena esicy.</strong>",
        "❌ BŁĄD! <strong>Wzdęcie brzucha w skręcie kątnicy jest znaczne i towarzyszy niedrożności jelita cienkiego.</strong>",
        "❌ BŁĄD! <strong>Węgiel aktywny nie ma żadnego zastosowania w mechanicznej rotacji krezki jelita.</strong>"
      ]
    }
  ],
  pathoNodes: [
    {
      badge: "Anatomiczna podatność",
      title: "Długa pętla esicy i wąska podstawa krezki",
      short: "Dolichosigmoideum obciążone masami kałowymi",
      detail: "Wydłużona esica z wąskim przyczepem krezki tworzy szypułę naczyniową podatną na torsję. Przewlekłe zaleganie twardego stolca w esicy działa jak ciężarek wyzwalający obrót pętli wokół osi krezki.",
      target: "Krezka esicy i naczynia esicze",
      drugTarget: "<span class='dose-pill'>Derotacja endoskopowa sigmoidoskopem</span> odkręcenie skrętu pod kontrolą wzroku"
    },
    {
      badge: "Zamknięta pętla",
      title: "Closed-loop obstruction i masywne rozdęcie",
      short: "Dwustronne zaciśnięcie światła jelita",
      detail: "Obrót o 180-360 stopni zamyka światło esicy zarówno od strony zstępnicy, jak i odbytnicy. Fermentacja bakteryjna generuje olbrzymie ilości gazu, rozdymając pętlę do średnicy >10-15 cm (objaw ziarna kawy).",
      target: "Światło skręconej pętli esicy",
      drugTarget: "<span class='dose-pill'>Rurka doodbytnicza (rectal tube)</span> drenaż i dekompresja przez 24-48 h"
    },
    {
      badge: "Niedokrwienie krezki",
      title: "Zaciśnięcie naczyń i zastój żylny",
      short: "Uciśnięcie żył esiczych prowadzące do zawału ściany",
      detail: "Skręcenie szypuły naczyniowej w pierwszej kolejności blokuje odpływ żylny o niskim ciśnieniu. Dochodzi do masywnego obrzęku ściany, wybroczyn krwawych, a po zablokowaniu tętnic – do martwicy zgorzelinowej.",
      target: "Żyły i tętnice esicze (gałęzie IMA)",
      drugTarget: "<span class='dose-pill'>PWE 2000 ml/d i.v.</span> zabezpieczenie wolemii i perfuzji łożyska"
    },
    {
      badge: "Zgorzel i perforacja",
      title: "Martwica pełnej grubości i kałowe zapalenie otrzewnej",
      short: "Pęknięcie ściany z wylaniem treści do jamy brzusznej",
      detail: "Brak odbarczenia w ciągu 24-48 h prowadzi do pęknięcia martwiczej ściany u podstawy pętli lub na jej szczycie. Wylanie litrów zastałego płynnego stolca wywołuje sepsę kałową o śmiertelności >50%.",
      target: "Ściana esicy i jama otrzewnej",
      drugTarget: "<span class='dose-pill'>Operacja Hartmanna</span> pilna resekcja martwiczej pętli z kolostomią"
    }
  ],
  diffTable: {
    title: "⚔️ Tabela Różnicowa: Skręt esicy vs Inne przyczyny ostrego rozdęcia jelita grubego",
    headers: ["Cecha kliniczna", "Skręt esicy (Sigmoid volvulus)", "Skręt kątnicy (Cecal volvulus)", "Rak esicy / zstępnicy (obturacja)", "Rzekoma niedrożność okrężnicy (Zespół Ogilviego)", "Megacolon toxicum (w colitis ulcerosa)"],
    rows: [
      ["Grupa wiekowa i predyspozycje", "Podeszły wiek (>70 lat), pensjonariusze DPS, demencja, zaparcia", "Młodsi (30-50 lat), kobiety w ciąży, wrodzone cecum mobile", "Wiek 60-80 lat, chudnięcie, krew w stolcu, zmiana rytmu wypróżnień", "Ciężko chorzy na OIT, po urazach, operacjach ortopedycznych, zaburzenia elektrolitowe", "Pacjenci z aktywnym wrzodziejącym zapaleniem jelita grubego lub C. difficile"],
      ["Obraz w RTG przeglądowym", "Objaw 'ziarna kawy' (coffee bean) / odwróconego U biegnący z lewego dołu ku górze", "Rozdęta pętla w kształcie 'nerki/przecinka' przemieszczona do lewego podżebrza", "Rozdęcie całej prawej i poprzecznej okrężnicy, pusta esica poniżej guza", "Uogólnione rozdęcie całej okrężnicy (zwłaszcza kątnica >9-12 cm) bez przeszkody", "Masywne poszerzenie poprzecznicy (>6 cm) z utratą haustracji i zgrubieniem ściany"],
      ["Objawy toksemii i sepsy", "Początkowo brak (tylko wzdęcie); w zgorzeli sepsa i kwasica", "Szybko narastające z powodu wczesnego niedokrwienia", "Zwykle brak wczesnej sepsy; objawy kacheksji nowotworowej", "Brak gorączki i leukocytozy (chyba że perforacja)", "Ciężka sepsa: wysoka gorączka, tachykardia, skrajna leukocytoza, krwista biegunka"],
      ["Badanie per rectum (DRE)", "Pusta, zapadnięta bańka odbytnicy", "Pusta bańka odbytnicy", "Możliwy wyczuwalny niski guz; ślady krwi na rękawiczce", "Pusta bańka odbytnicy", "Bolesność, śluzowo-ropna i krwista treść"],
      ["Postępowanie pierwszego rzutu", "Endoskopowa derotacja (sigmoidoskopia) + założenie rurki doodbytniczej", "Pilna operacja chirurgiczna (prawostronna hemikolektomia / cecopexia)", "Pilne stentowanie (SEMS) lub operacja Hartmanna / resekcja", "Leczenie zachowawcze (neostygmina i.v., dekompresja kolonoskopowa)", "Intensywna terapia zachowawcza (GKS i.v., cyklosporyna/anty-TNF); brak poprawy -> pilna kolektomia"],
      ["Ryzyko zgorzeli i nawrotowość", "Bardzo wysokie ryzyko nawrotu (50-70% po samej derotacji); w martwicy śmiertelność >30%", "Wysokie ryzyko wczesnego niedokrwienia; derotacja endoskopowa nieskuteczna", "Brak derotacji; ryzyko pęknięcia kątnicy przy średnicy >10-12 cm", "Ryzyko perforacji kątnicy przy średnicy >12 cm (prawo Laplace'a)", "Bardzo wysokie ryzyko perforacji i wstrząsu; pilne wskazanie do kolektomii"]
    ]
  },
  dutySummary: {
    overview: "Skręt esicy (Sigmoid Volvulus) jest trzecią co do częstości przyczyną mechanicznej niedrożności jelita grubego (po raku jelita grubego i powikłaniach uchyłków), stanowiąc ok. 5-10% wszystkich niedrożności okrężnicy. Występuje typowo u osób starszych, leżących, pensjonariuszy domów opieki z przewlekłymi zaparciami. Nieleczony prowadzi do zawału ściany jelita, perforacji i kałowego zapalenia otrzewnej.",
    diagnostics: "1. Ocena kliniczna: potężne, asymetryczne wzdęcie brzucha, brak gazów i stolca od 24-48 h, pusta bańka odbytnicy w DRE.<br>2. Przeglądowe RTG jamy brzusznej na stojąco – patognomoniczny objaw 'ziarna kawy' (coffee bean sign) lub 'odwróconego U' wybiegający z lewego dołu biodrowego.<br>3. Tomografia komputerowa (TK) jamy brzusznej z kontrastem i.v. – uwidacznia 'objaw wiru' (whirl sign) skręconej krezki i naczyń esiczych oraz ocenia żywotność ściany.<br>4. Ocena markerów martwicy jelita: kwasica mleczanowa (mleczany we krwi tętniczej), leukocytoza z neutrofilią, CRP.<br>5. Endoskopowa ocena śluzówki w trakcie próby derotacji – wykluczenie martwicy zgorzelinowej.",
    drugsAndDoses: "1. Płynoterapia krystaloidowa: <span class='dose-pill'>PWE 2000-2500 ml/dobę i.v.</span> w celu pokrycia strat i wyrównania wolemii.<br>2. Profilaktyka antybiotykowa w razie podejrzenia powikłań lub przed operacją:<br>   - <span class='dose-pill'>Ceftriakson 2 g i.v. raz/dobę</span> + <span class='dose-pill'>Metronidazol 500 mg i.v. co 8 h</span> LUB<br>   - <span class='dose-pill'>Piperacylina z tazobaktamem 4,5 g i.v. co 8 h</span>.<br>3. <span class='dose-pill'>Bezwzględny zakaz stosowania leków przeczyszczających</span> i leków prokinetycznych przed odbarczeniem przeszkody mechanicznej!",
    procedures: "1. Endoskopowa derotacja i dekompresja (sigmoidoskopia sztywna lub giętka) – metoda z wyboru w niepowikłanym skręcie bez cech zapalenia otrzewnej.<br>2. Wprowadzenie i pozostawienie rurki doodbytniczej (rectal tube) na 24-48 godzin po udanej derotacji (zapobieganie wczesnemu nawrotowi).<br>3. Planowa sigmoidektomia (resekcja esicy) po przygotowaniu jelita w trakcie tej samej hospitalizacji ze względu na 50-70% ryzyko nawrotu.<br>4. Operacja Hartmanna w trybie pilnym – zabieg z wyboru w przypadku martwicy zgorzelinowej esicy, perforacji lub niepowodzenia derotacji endoskopowej.",
    monitoring: "1. Ścisła obserwacja pod kątem objawów otrzewnowych (Blumberg, obrona mięśniowa) i cech wstrząsu septycznego.<br>2. Monitorowanie powrotu oddawania gazów i płynnej treści przez rurkę doodbytniczą.<br>3. Kontrolne badania radiologiczne (ustąpienie obrazu ziarna kawy po derotacji).<br>4. Przygotowanie internistyczne i kardiologiczne obciążonego geriatrycznie chorego do planowej operacji resekcyjnej."
  },
  lekQuestions: [
    {
      question: "Objaw 'ziarna kawy' (coffee bean sign) widoczny na przeglądowym zdjęciu rentgenowskim jamy brzusznej jest patognomoniczny dla:",
      options: [
        "Skrętu esicy (sigmoid volvulus)",
        "Skrętu żołądka w przepuklinie rozworu przełykowego",
        "Ostrego kamiczego zapalenia pęcherzyka żółciowego",
        "Raka kątnicy z naciekiem zastawki Bauhina",
        "Zrostowej niedrożności jelita czczego"
      ],
      correct: 0,
      expl: "Objaw ziarna kawy (coffee bean sign / bent inner tube sign) na RTG przeglądowym brzucha jest klasycznym objawem skrętu esicy. Powstaje wskutek masywnego rozdęcia uwięzionej pętli esicy w mechanizmie zamkniętej pętli (closed loop); dwa stykające się ramiona pętli tworzą gęstą bruzdę centralną, a cała pętla rozciąga się w kształcie owalnego ziarna ku prawemu podżebrzu."
    },
    {
      question: "Zabiegiem pierwszego rzutu u stabilnego pacjenta z ostrym skrętem esicy, u którego nie stwierdza się cech zapalenia otrzewnej ani martwicy ściany jelita, jest:",
      options: [
        "Endoskopowa derotacja i dekompresja (sigmoidoskopia) z pozostawieniem rurki doodbytniczej",
        "Natychmiastowa laparotomia z całkowitym wycięciem żołądka",
        "Podanie silnych leków przeczyszczających doustnie",
        "Przezskórny drenaż pętli esicy igłą przez powłoki brzuszne",
        "Zastosowanie leczenia uzdrowiskowego i kąpieli solankowych"
      ],
      correct: 0,
      expl: "Zgodnie z międzynarodowymi standardami chirurgicznymi u chorych bez cech zgorzeli jelita i bez zapalenia otrzewnej postępowaniem pierwszego rzutu jest endoskopowa detorsja (derotacja) i dekompresja za pomocą sigmoidoskopu lub kolonoskopu, połączona z założeniem rurki doodbytniczej na 24-48 h. Pozwala to na uniknięcie natychmiastowej, obarczonej wysokim ryzykiem operacji w trybie ostrym."
    },
    {
      question: "Dlaczego po pomyślnej endoskopowej derotacji skrętu esicy bezwzględnie zaleca się wykonanie planowej resekcji esicy (sigmoidektomii) w czasie tej samej hospitalizacji?",
      options: [
        "Ponieważ ryzyko ponownego skrętu (nawrotu) po samej derotacji endoskopowej wynosi aż 50-70%, a nawroty często przebiegają z martwicą jelita",
        "Ponieważ skręt esicy w 100% przypadków przekształca się w czerniaka złośliwego",
        "Resekcja nie jest zalecana i pacjenta należy natychmiast wypisać do domu",
        "Aby pobrać wycinki do oceny genetycznej mukowiscydozy",
        "Ponieważ esica u ludzi dorosłych jest narządem całkowicie zbędnym"
      ],
      correct: 0,
      expl: "Endoskopowa derotacja usuwa ostry stan, ale pozostawia anatomiczną przyczynę – wydłużoną, wiotką esicę na wąskiej krezce. Odsetek nawrotów skrętu po samym leczeniu endoskopowym wynosi 50-70%, a nawrót niesie wysokie ryzyko zgorzeli i perforacji. Dlatego u chorych kwalifikujących się do zabiegu standardem jest wykonanie planowej resekcji esicy w trybie planowym."
    },
    {
      question: "Wskaż zabieg operacyjny z wyboru u pacjenta ze skrętem esicy powikłanym martwicą zgorzelinową lub perforacją i kałowym zapaleniem otrzewnej:",
      options: [
        "Operacja sposobem Hartmanna (resekcja esicy, pojedyncza kolostomia końcowa i ślepe zaszycie kikuta odbytnicy)",
        "Wycięcie esicy z natychmiastowym zespoleniem koniec-do-końca bez stomii",
        "Nacięcie esicy, odprowadzenie gazu i pozostawienie martwicy bez wycinania",
        "Zespolenie omijające żołądkowo-esicze",
        "Przeszczepienie jelita grubego od dawcy rodzinnego"
      ],
      correct: 0,
      expl: "W warunkach martwicy jelita, sepsy i zapalenia otrzewnej wykonanie pierwotnego zespolenia jelitowego wiąże się z ogromnym ryzykiem nieszczelności i zgonu. Złotym standardem w trybie ostrym jest operacja Hartmanna: resekcja martwiczej pętli esicy, wyłonienie końca bliższego w postaci kolostomii na lewym boku oraz ślepe zaszycie kikuta odbytnicy w miednicy."
    },
    {
      question: "Który z poniższych czynników NIE stanowi typowego elementu predysponującego do wystąpienia skrętu esicy?",
      options: [
        "Wrzodziejące zapalenie jelita grubego w stadium ostrego rzutu",
        "Długa, wiotka pętla esicy o wąskiej podstawie krezki (dolichosigmoideum)",
        "Podeszły wiek i pobyt w zakładzie opiekuńczo-leczniczym",
        "Przewlekłe zaparcia i zaleganie mas kałowych",
        "Stosowanie leków psychotropowych i przeciwparkinsonowskich (antycholinergicznych)"
      ],
      correct: 0,
      expl: "Wrzodziejące zapalenie jelita grubego (WZJG) predysponuje do toksycznego rozdęcia okrężnicy (megacolon toxicum) lub raka, ale nie do skrętu esicy. Klasyczna triada predyspozycji do skrętu esicy to: anatomiczne dolichosigmoideum z wąską krezką, przewlekłe nawykowe zaparcia oraz podeszły wiek z unieruchomieniem i lekami spowalniającymi motorykę (psychotropy, leki na Parkinsona)."
    },
    {
      question: "W badaniu per rectum (DRE) u pacjenta ze skrętem esicy typowo stwierdza się:",
      options: [
        "Pustą, zapadniętą bańkę odbytnicy bez obecności mas kałowych",
        "Masywne zaklinowanie twardych mas kałowych w bańce odbytnicy",
        "Wyciek świeżej jasnoczerwonej krwi tętniącej pod ciśnieniem",
        "Obecność polipa uszypułowanego wypadającego przez zwieracz",
        "Cuchnący wyciek ropy z przetoki odbytu"
      ],
      correct: 0,
      expl: "Skręt esicy powoduje mechaniczną niedrożność na poziomie połączenia esiczo-odbytniczego. Treść kałowa i gazy są uwięzione powyżej skrętu w rozdętej pętli, dlatego bańka odbytnicy leżąca poniżej przeszkody jest pusta, zapadnięta i nie zawiera stolca."
    },
    {
      question: "Objaw 'wirówki' (whirl sign) w tomografii komputerowej (TK) jamy brzusznej jest charakterystyczny dla:",
      options: [
        "Skrętu krezki naczyniowej wokół osi rotacji pętli jelita (np. w skręcie esicy lub jelita cienkiego)",
        "Ostrego zapalenia pęcherzyka żółciowego",
        "Pęknięcia tętniaka aorty brzusznej",
        "Raka żołądka z przerzutami do wątroby",
        "Zatorowości tętnicy nerkowej"
      ],
      correct: 0,
      expl: "Objaw wirówki (whirl sign / whirlpool sign) w badaniu tomografii komputerowej (TK) powstaje w wyniku rotacji pętli jelitowej wraz z zaopatrującymi ją naczyniami krezkowymi i tkanką tłuszczową wokół punktu skrętu. Przypomina spiralny wir na przekrojach osiowych i jednoznacznie potwierdza skręt (volvulus)."
    },
    {
      question: "Czym różni się skręt kątnicy (cecal volvulus) od skrętu esicy na przeglądowym RTG jamy brzusznej?",
      options: [
        "W skręcie kątnicy rozdęta pętla ma kształt nerki lub 'przecinka' i przemieszcza się z prawego dołu biodrowego do lewego górnego kwadrantu brzucha (pod lewe żebra)",
        "W skręcie kątnicy gaz gromadzi się wyłącznie w pęcherzu moczowym",
        "Skręt kątnicy daje objaw 'ziarna kawy' wychodzący zawsze z lewego dołu biodrowego",
        "Nie ma żadnych różnic, obrazy są w 100% identyczne",
        "W skręcie kątnicy na RTG widoczny jest zawsze obcy metaliczny przedmiot"
      ],
      correct: 0,
      expl: "Skręt kątnicy (cecal volvulus) rozwija się na podłożu wrodzonej ruchomości kątnicy (cecum mobile). Na RTG rozdęta kątnica przypomina nerkę lub przecinek i typowo wędruje z prawego dołu biodrowego w kierunku lewego nadbrzusza lub podżebrza. Z kolei w skręcie esicy olbrzymia pętla 'ziarna kawy' wychodzi z miednicy i lewego dołu ku prawemu podżebrzu."
    },
    {
      question: "Zastosowanie rurki doodbytniczej (rectal tube) po udanej derotacji skrętu esicy ma na celu:",
      options: [
        "Utrzymanie dekompresji i zapobieżenie natychmiastowemu ponownemu skręceniu się wiotkiej pętli esicy",
        "Żywienie dojelitowe pacjenta przez odbyt",
        "Podawanie leków znieczulenia ogólnego drogą doodbytniczą",
        "Pobieranie próbek do testu DNA co godzinę",
        "Zablokowanie zwieraczy odbytu na stałe"
      ],
      correct: 0,
      expl: "Po rozprostowaniu skrętu esicy ściana jelita pozostaje atoniczna i wiotka. Pozostawienie miękkiego drenu doodbytniczego (rectal tube) wprowadzonego powyżej miejsca uprzedniego skrętu na okres 24-48 h pozwala na ciągły odpływ gazów i płynów, zapobiegając ponownemu rozdęciu i nawrotowi skrętu w pierwszych dobach."
    },
    {
      question: "Stwierdzenie ciemnoczerwonego, martwiczego podbiegnięcia błony śluzowej i cuchnącego krwistego wysięku podczas wprowadzania sigmoidoskopu u chorego ze skrętem esicy nakazuje:",
      options: [
        "Natychmiastowe przerwanie procedury endoskopowej i pilną kwalifikację pacjenta do laparotomii",
        "Zwiększenie ciśnienia insuflacji powietrza w celu 'przepchania' martwicy",
        "Wstrzyknięcie 100 ml soli fizjologicznej do ściany jelita",
        "Pobranie 20 głębokich wycinków szczypczykami biopsyjnymi",
        "Podanie leków nasennych i powtórzenie badania za 3 dni"
      ],
      correct: 0,
      expl: "Cechy zgorzeli błony śluzowej w badaniu endoskopowym świadczą o nieodwracalnym zespole niedokrwiennym ściany jelita. Dalsza manipulacja endoskopowa lub podawanie powietrza doprowadzi do natychmiastowego pęknięcia jelita i kałowego zapalenia otrzewnej. Należy natychmiast wycofać aparat i operować chorego w trybie pilnym."
    },
    {
      question: "Śmiertelność w nieleczonym skręcie esicy powikłanym martwicą i przedziurawieniem ściany jelita wynosi około:",
      options: [
        "> 50%",
        "< 1%",
        "Dokładnie 0%",
        "5%",
        "10%"
      ],
      correct: 0,
      expl: "Skręt esicy ze zgorzelą i perforacją prowadzi do masywnego kałowego zapalenia otrzewnej, ciężkiego wstrząsu septycznego i niewydolności wielonarządowej. W populacji geriatrycznej śmiertelność w takim powikłaniu przekracza 50-60%, co podkreśla wagę wczesnego rozpoznania i odbarczenia."
    }
  ],
  flashcards: [
    {
      front: "Co to jest objaw 'ziarna kawy' (coffee bean sign) na RTG i o czym świadczy?",
      back: "Masywnie rozdęta, pojedyncza pętla jelitowa bez haustracji wybiegająca z lewego dołu biodrowego ku górze i na prawo, z centralną linią zetknięcia ścian. Jest patognomoniczny dla skrętu esicy."
    },
    {
      front: "Jakie jest postępowanie pierwszego rzutu w niepowikłanym skręcie esicy (bez zapalenia otrzewnej)?",
      back: "Endoskopowa derotacja i dekompresja (sigmoidoskopia) z pozostawieniem rurki doodbytniczej (rectal tube) na 24-48 godzin."
    },
    {
      front: "Dlaczego po udanej derotacji skrętu esicy konieczna jest planowa operacja resekcyjna?",
      back: "Ponieważ odsetek nawrotów po samej derotacji wynosi aż 50-70%, a kolejne epizody niosą ryzyko zgorzeli i zgonu. Zaleca się planową sigmoidektomię w czasie tej samej hospitalizacji."
    },
    {
      front: "Jaka operacja jest złotym standardem w trybie ostrym w skręcie esicy z martwicą lub zapaleniem otrzewnej?",
      back: "Operacja sposobem Hartmanna: resekcja martwiczej esicy, kolostomia końcowa na lewym boku i ślepe zaszycie kikuta odbytnicy w miednicy."
    },
    {
      front: "Czym różni się skręt kątnicy od skrętu esicy na zdjęciu RTG?",
      back: "Skręt esicy: pętla 'ziarna kawy' wybiega z LEWEGO dołu ku górze i na prawo.\nSkręt kątnicy: pętla w kształcie nerkowatym/przecinka przemieszcza się z PRAWEGO dołu do LEWEGO nadbrzusza."
    },
    {
      front: "Wymień 3 główne czynniki predysponujące do skrętu esicy.",
      back: "1. Długa esica o wąskiej krezce (dolichosigmoideum)\n2. Przewlekłe zaparcia obciążające pętlę masami kałowymi\n3. Podeszły wiek, bezruch i leki psychotropowe/antycholinergiczne."
    }
  ]
};

// Mirror fields for schema compatibility
case131.steps.forEach(step => {
  step.question = step.title;
  step.explanation = step.feedback;
});
case131.lekQuestions.forEach(q => {
  q.opts = q.options;
  q.correctIdx = q.correct;
  q.exp = q.expl;
});

saveCase(case131);

const fs = require('fs');
const path = require('path');
const { encryptStringAes } = require('./encrypt_case.js');

const MASTER_KEY = '@LEKSzymon28111999';
const CASES_DIR = path.join(__dirname, '..', 'cases');

console.log("Generating Case 123: Plamica Henocha-Schönleina (IgAV)...");

async function saveCase(caseData) {
  const filePath = path.join(CASES_DIR, caseData.filename);
  const jsonStr = JSON.stringify(caseData, null, 2);
  const encrypted = await encryptStringAes(jsonStr, MASTER_KEY);
  fs.writeFileSync(filePath, JSON.stringify(encrypted, null, 2), 'utf8');
  console.log(`[SAVED] Case #${caseData.id}: ${caseData.filename} (LEK Qs: ${caseData.lekQuestions.length}, Steps: ${caseData.steps.length}, Flashcards: ${caseData.flashcards.length})`);
}

const case123 = {
  id: 123,
  filename: "123_plamica_henocha_schonleina_igav.json",
  dept: "Pediatria",
  shortTitle: "6-letni Antoś – Wyczuwalna plamica na pośladkach, kolkowy ból brzucha i bolesny obrzęk kostek (Plamica Henocha-Schönleina / IgAV)",
  diagnosisTitle: "Zapalenie naczyń związane z przeciwciałami IgA (IgAV – IgA Vasculitis / dawniej Plamica Henocha-Schönleina) z zajęciem skóry, stawów, przewodu pokarmowego i łagodną nefropatią IgAV",
  vitals: [
    { label: "Płytki krwi (PLT)", val: "385 tys./µl", sub: "Płytki w normie (wyklucza małopłytkowość ITP)", status: "vital-ok" },
    { label: "Ciśnienie tętnicze (RR)", val: "118/74 mmHg", sub: "Podwyższone jak na 6-latka (90-95 centyl)", status: "vital-warn" },
    { label: "Badanie moczu (Erytrocyty)", val: "30-40 wpw / wyługowane", sub: "Krwinkomocz kłębuszkowy (zajęcie nerek)", status: "vital-crit" },
    { label: "Nasilenie bólu brzucha", val: "7/10 w skali FPS-R", sub: "Kolkowy, kurczowy ból okołopępkowy", status: "vital-warn" }
  ],
  vitalsObj: { hr: 98, bp: "118/74", spo2: 99, rr: 20, temp: 37.4, gcs: 15 },
  story: `<p><strong>Pacjent:</strong> 6-letni Antoś (masa ciała 22 kg) został przyprowadzony na szpitalny oddział ratunkowy przez rodziców z powodu nagłego pojawienia się gęstej, wyczuwalnej dotykiem wysypki na pośladkach i kończynach dolnych, obrzęku i silnego bólu obu stawów skokowych uniemożliwiającego chodzenie oraz napadowych, kurczowych bólów brzucha.</p><p><strong>Wywiad chorobowy:</strong> Około 10-12 dni temu chłopiec przebył infekcję górnych dróg oddechowych z gorączką, bólem gardła i katarem, leczoną objawowo paracetamolem. Trzy dni temu rodzice zauważyli pojedyncze czerwone plamki na kostkach, które początkowo wzięli za pogryzienie przez owady. Wczoraj wysypka gwałtownie się rozprzestrzeniła, zajmując całe goleni, uda i pośladki, a wykwity stały się ciemnoczerwone, zlane i uniesione ponad powierzchnię skóry. Rano chłopiec obudził się z płaczem, odmawiając stanięcia na nogi z powodu obrzęku i bólu wokół kostek. Od kilku godzin skarży się na ostry, napadowy ból brzucha w okolicy pępka, zwymiotował dwukrotnie treścią żołądkową bez domieszki żółci i krwi. W wywiadzie brak krwawień w rodzinie, brak przewlekłych chorób.</p><p><strong>Badanie przedmiotowe na SOR:</strong> Chłopiec w stanie ogólnym średnim, leżący z podkurczonymi nóżkami, cierpiący w czasie napadów bólu brzucha. Na skórze obu podudzi, stóp, tylnej powierzchni ud oraz symetrycznie na obu pośladkach obecna typowa plamica uniesiona (palpable purpura) – liczne, drobne i zlewające się grudki oraz plamy krwotoczne o barwie od purpurowej do brunatnej, wyraźnie wyczuwalne palpacyjnie, nieblednące pod uciskiem (dodatni test szkiełkowy). Pojedyncze wykwity obecne także na przedramionach; twarz i tułów całkowicie wolne od zmian. W badaniu narządu ruchu: oba stawy skokowe obrzęknięte, bolesne przy palpacji i próbie jakiegokolwiek ruchu, ocieplone, bez zaczerwienienia skóry. W badaniu jamy brzusznej: brzuch miękki, wyraźnie bolesny palpacyjnie w śródbrzuszu i wokół pępka, bez obrony mięśniowej i bez objawów otrzewnowych; perystaltyka żywa, okresowo wzmożona; brak wyczuwalnych patologicznych oporów w jamie brzusznej. Narządy moczowo-płciowe: jądra bez cech skrętu czy obrzęku zapalnego. Neurologicznie bez odchyleń.</p>`,
  labs: {
    "Morfologia i hemostaza": [
      { name: "Płytki krwi (PLT)", val: "385 tys./µl", norm: "150 - 450 tys./µl", flag: "NORMAL" },
      { name: "Leukocyty (WBC)", val: "13,8 tys./µl", norm: "5,0 - 12,0 tys./µl", flag: "HIGH" },
      { name: "Hemoglobina (Hb)", val: "12,8 g/dl", norm: "11,5 - 14,5 g/dl", flag: "NORMAL" },
      { name: "Hematokryt (Ht)", val: "38 %", norm: "34 - 42 %", flag: "NORMAL" },
      { name: "Czas protrombinowy (INR)", val: "1,02", norm: "0,9 - 1,2", flag: "NORMAL" },
      { name: "APTT", val: "30 s", norm: "26 - 36 s", flag: "NORMAL" },
      { name: "Fibrynogen", val: "390 mg/dl", norm: "200 - 400 mg/dl", flag: "NORMAL" }
    ],
    "Badanie ogólne moczu (nefropatia IgAV)": [
      { name: "Barwa moczu", val: "Ciemnożółta / opalizująca", norm: "Słomkowa", flag: "NORMAL" },
      { name: "Ciężar właściwy", val: "1,022 g/ml", norm: "1,015 - 1,025 g/ml", flag: "NORMAL" },
      { name: "Białko w moczu (pasek)", val: "Dodatnie (++) [ok. 0,6 g/l]", norm: "Nieobecne", flag: "HIGH" },
      { name: "Erytrocyty w moczu (osad)", val: "30-40 wpw (w tym wyługowane i dysmorficzne)", norm: "0 - 3 wpw", flag: "CRIT_HIGH" },
      { name: "Wałeczki erytrocytowe", val: "Obecne (1-2 w prep.)", norm: "Nieobecne", flag: "CRIT_HIGH" },
      { name: "Stosunek białka do kreatyniny (UPCR)", val: "0,55 mg/mg", norm: "< 0,20 mg/mg", flag: "HIGH" }
    ],
    "Biochemia i wskaźniki zapalne": [
      { name: "Mocznik", val: "26 mg/dl", norm: "15 - 36 mg/dl", flag: "NORMAL" },
      { name: "Kreatynina w surowicy", val: "0,42 mg/dl (eGFR 112 ml/min)", norm: "0,30 - 0,60 mg/dl", flag: "NORMAL" },
      { name: "Albumina w surowicy", val: "38 g/l", norm: "35 - 50 g/l", flag: "NORMAL" },
      { name: "CRP", val: "14,5 mg/l", norm: "< 5,0 mg/l", flag: "HIGH" },
      { name: "Krew utajona w kale (FOBT)", val: "Dodatnia (+)", norm: "Ujemna", flag: "HIGH" },
      { name: "Stężenie IgA w surowicy", val: "2,8 g/l", norm: "0,7 - 2,5 g/l", flag: "HIGH" }
    ]
  },
  steps: [
    {
      title: "Krok 1: Identyfikacja zmian skórnych i weryfikacja liczby płytek krwi",
      text: "Widzisz 6-letniego chłopca z gęstą plamicą uniesioną na pośladkach i kończynach dolnych. Co jest absolutnie pierwszym, kluczowym krokiem diagnostycznym pozwalającym na wykluczenie małopłytkowości i stanów zagrożenia życia?",
      options: [
        "Natychmiastowe oznaczenie morfologii krwi ze szczególnym uwzględnieniem liczby płytek krwi (PLT), aby odróżnić plamicę naczyniową od skazy małopłytkowej",
        "Pobranie wycinka skóry do badania histopatologicznego w trybie natychmiastowym",
        "Podanie dożylne immunoglobuliny (IVIG) w dawce 2 g/kg bez pobierania krwi",
        "Założenie gipsów marszowych na oba stawy skokowe z podejrzeniem zwichnięcia"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Kluczowym pierwszym krokiem w diagnostyce każdej plamicy jest natychmiastowa ocena liczby płytek krwi (PLT).</strong> W plamicy Henocha-Schönleina (IgAV) liczba płytek jest prawidłowa lub wręcz podwyższona (jako białko ostrej fazy). Gdyby PLT były niskie (<20-50 tys./µl), należałoby podejrzewać ITP, ostre białaczki lub sepsę meningokokową.",
        "❌ BŁĄD! <strong>Biopsja skóry nie jest badaniem pierwszego rzutu u dziecka z typowym obrazem klinicznym;</strong> diagnoza IgAV u dzieci jest rozpoznaniem klinicznym.",
        "❌ BŁĄD! <strong>IVIG stosuje się w ITP lub chorobie Kawasakiego,</strong> podanie leku przed sprawdzeniem płytek i postawieniem diagnozy to błąd.",
        "❌ BŁĄD! <strong>Obrzęk kostek wynika z zapalenia naczyń okołostawowych (artretyzm),</strong> unieruchomienie gipsem jest szkodliwe i niepotrzebne."
      ]
    },
    {
      title: "Krok 2: Kryteria diagnostyczne zapalenia naczyń IgA (EULAR/PRINTO/PRES)",
      text: "Który zestaw kryteriów według międzynarodowych wytycznych EULAR/PRINTO/PRES (2010) pozwala na pewne rozpoznanie zapalenia naczyń związanego z IgA (IgAV)?",
      options: [
        "Obowiązkowo wyczuwalna plamica (palpable purpura) bez małopłytkowości, o przewadze na kończynach dolnych + co najmniej 1 z 4 cech: ból brzucha, zapalenie/ból stawów, zajęcie nerek (krwinkomocz/białkomocz) lub leukocytoklastyczne zapalenie naczyń z IgA w biopsji",
        "Wysoka gorączka trwająca >5 dni + obustronne zapalenie spojówek i malinowy język",
        "Obecność przeciwciał c-ANCA (anty-PR3) w wysokim mianie + krwioplucie",
        "Izolowany krwiomocz po urazie lędźwiowym bez jakichkolwiek zmian skórnych"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Kryteria EULAR/PRINTO/PRES wymagają obecności uniesionej, wyczuwalnej dotykiem plamicy (palpable purpura)</strong> – typowo zlokalizowanej na pośladkach i wyprostnych powierzchniach kończyn dolnych – ORAZ co najmniej jednego z czterech objawów: rozlanego kolkowego bólu brzucha, zapalenia/bólu stawów, zajęcia nerek (krwiomocz/białkomocz) lub potwierdzenia depozytów IgA w ścianach naczyń.",
        "❌ BŁĄD! <strong>Gorączka >5 dni z malinowym językiem i zapaleniem spojówek</strong> to kryteria choroby Kawasakiego, a nie IgAV.",
        "❌ BŁĄD! <strong>c-ANCA i krwioplucie</strong> charakteryzują ziarniniakowatość z zapaleniem naczyń (GPA / dawniej Wegenera). W IgAV miano ANCA jest ujemne.",
        "❌ BŁĄD! <strong>Bez zmian skórnych nie można rozpoznać IgAV wg kryteriów klasyfikacyjnych.</strong>"
      ]
    },
    {
      title: "Krok 3: Ocena powikłań brzusznych i badanie USG",
      text: "Chłopiec skarży się na silny, kolkowy ból brzucha (7/10), wymiotował i ma krew utajoną w kale. Jakie jest najgroźniejsze ostre chirurgiczne powikłanie brzuszne w przebiegu IgAV, które należy pilnie wykluczyć badaniem USG?",
      options: [
        "Wgłobienie jelita (intussusception), typowo w postaci krętniczo-krętniczej (ileo-ileal)",
        "Ostre zapalenie wyrostka robaczkowego z perforacją",
        "Zator tętnicy krezkowej górnej",
        "Martwicze zapalenie jelit noworodków (NEC)"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Najczęstszym i najgroźniejszym powikłaniem chirurgicznym IgAV w jamie brzusznej jest wgłobienie jelita (ok. 2-5% chorych).</strong> Co charakterystyczne dla IgAV, w przeciwieństwie do klasycznego wgłobienia u niemowląt (krętniczo-kątniczego), tutaj najczęściej dochodzi do wgłobienia krętniczo-krętniczego (ileo-ileal) na podłożu krwiaka podśluzówkowego jelita cienkiego stanowiącego punkt wiodący. USG jamy brzusznej jest badaniem z wyboru (obraz 'tarczy strzeleckiej' / objaw tarczy).",
        "❌ BŁĄD! <strong>Zapalenie wyrostka może wystąpić,</strong> ale nie jest typowym powikłaniem naczyniowym krwiaków ściany jelita w IgAV.",
        "❌ BŁĄD! <strong>Zator SMA to schorzenie osób starszych z migotaniem przedsionków,</strong> a nie 6-letniego dziecka z zapaleniem drobnych naczyń.",
        "❌ BŁĄD! <strong>NEC dotyczy wcześniaków w pierwszych tygodniach życia.</strong>"
      ]
    },
    {
      title: "Krok 4: Wskazania do wdrożenia glikokortykosteroidów (GKS)",
      text: "W USG brzucha wykluczono wgłobienie (ściana jelita cienkiego pogrubiała obrzękowo, perystaltyka zachowana). Bóle brzucha są jednak silne, nie ustępują po paracetamolu. Jakie jest miejsce glikokortykosteroidów w leczeniu IgAV według wytycznych?",
      options: [
        "Wskazane w ciężkich bólach brzucha oraz nasilonym zapaleniu stawów/obrzęku moszny (np. Prednizon 1-2 mg/kg/dobę p.o.), gdyż szybko łagodzą dolegliwości bólowe, choć NIE zapobiegają rozwojowi nefropatii w przyszłości",
        "GKS są bezwzględnie przeciwwskazane we wszystkich postaciach IgAV, ponieważ wywołują perforację skóry",
        "GKS należy podać każdemu dziecku z samą plamicą skórną, aby w 100% uchronić nerki przed zapaleniem",
        "GKS podaje się wyłącznie w postaci wlewów z deksametazonu przez 6 miesięcy"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Glikokortykosteroidy (np. prednizon 1-2 mg/kg/d p.o. przez 1-2 tygodnie ze stopniową redukcją) są zalecane w umiarkowanym do ciężkiego bólu brzucha, nasilonym obrzęku jąder/moszny lub silnym zapaleniu stawów.</strong> EBM dowiodło jednoznacznie, że sterydy skracają czas trwania bólu brzucha, ale NIE zapobiegają rozwojowi ani progresji nefropatii IgAV, dlatego NIE podaje się ich profilaktycznie przy samej wysypce skórnej.",
        "❌ BŁĄD! <strong>GKS nie są przeciwwskazane;</strong> są standardem w łagodzeniu powikłań trzewnych.",
        "❌ BŁĄD! <strong>Badania kliniczne udowodniły, że profilaktyczne podanie GKS przy łagodnej chorobie nie chroni nerek przed nefropatią.</strong>",
        "❌ BŁĄD! <strong>Leczenie trwa zwykle 1-2 tygodnie;</strong> 6-miesięczna sterydoterapia wiązałaby się z ciężkimi powikłaniami jatrogennymi (zespół Cushinga, zahamowanie wzrostu)."
      ]
    },
    {
      title: "Krok 5: Ocena nefropatii i czynnik determinujący rokowanie odległe",
      text: "W badaniu ogólnym moczu Antosia stwierdzono białkomocz (UPCR 0,55 mg/mg) oraz 30-40 wyługowanych krwinek czerwonych i wałeczki erytrocytowe w osadzie. Co decyduje o długoterminowym rokowaniu u dziecka z IgAV?",
      options: [
        "Stopień i przebieg zajęcia nerek (nefropatia IgAV) – to jedyne powikłanie mogące prowadzić do przewlekłej choroby nerek i niewydolności nerek",
        "Nasilenie i rozległość wysypki skórnej na pośladkach",
        "Liczba stawów objętych zapaleniem (ryzyko trwałego inwalidztwa i zesztywnienia)",
        "Stężenie przeciwciał przeciwjądrowych ANA w surowicy"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Zmiany skórne, stawowe i żołądkowo-jelitowe w IgAV ustępują całkowicie bez trwałych następstw.</strong> Jedynym powikłaniem decydującym o odległym rokowaniu i przeżyciu pacjenta jest zajęcie nerek (nefropatia IgAV / kłębuszkowe zapalenie nerek z depozytami IgA). U ok. 1-2% dzieci z IgAV rozwija się schyłkowa niewydolność nerek (ESRD), stąd konieczność systematycznego monitorowania moczu i ciśnienia.",
        "❌ BŁĄD! <strong>Wysypka ustępuje samoistnie po 2-4 tygodniach,</strong> pozostawiając przejściowe przebarwienia, bez blizn.",
        "❌ BŁĄD! <strong>Artretyzm w IgAV jest nieerozyjny i całkowicie odwracalny,</strong> nigdy nie prowadzi do trwałych zniekształceń ani inwalidztwa.",
        "❌ BŁĄD! <strong>ANA nie mają znaczenia diagnostycznego ani prognostycznego w IgAV.</strong>"
      ]
    },
    {
      title: "Krok 6: Zastosowanie leków przeciwbólowych a zajęcie nerek i przewodu pokarmowego",
      text: "Rodzice pytają o leczenie bólu nóżek i obrzęku kostek w domu: 'Czy możemy podawać synowi ibuprofen?' Jak brzmi właściwe zalecenie lekarskie odnośnie NLPZ u Antosia?",
      options: [
        "W obecnej chwili należy unikać NLPZ (ibuprofenu) ze względu na krwawienie z przewodu pokarmowego (FOBT dodatni) oraz cechy aktywnego kłębuszkowego zapalenia nerek; lekiem przeciwbólowym z wyboru jest paracetamol, a w razie silnego bólu steroidy",
        "Ibuprofen w maksymalnej dawce dożylnej jest lekiem pierwszego wyboru u każdego dziecka z krwiomoczem",
        "Należy podać kwas acetylosalicylowy (aspirynę) w dawce 100 mg/kg/dobę",
        "Bólów stawowych w IgAV w ogóle się nie leczy farmakologicznie"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Chociaż NLPZ (np. ibuprofen) są skuteczne w izolowanym zapaleniu stawów w IgAV, są one PRZECIWWSKAZANE u dzieci z cechami krwawienia z przewodu pokarmowego (dodatnia krew w kale, bóle brzucha) lub upośledzeniem/zapaleniem nerek (krwinkomocz, białkomocz).</strong> NLPZ hamują syntezę prostaglandyn nerkowych, co może drastycznie pogorszyć perfuzję nerek i wywołać ostrą niewydolność nerek, a ponadto zwiększają ryzyko owrzodzeń jelit.",
        "❌ BŁĄD! <strong>Podanie ibuprofenu przy krwawieniu z przewodu pokarmowego i nefropatii jest błędem terapeutycznym.</strong>",
        "❌ BŁĄD! <strong>Aspiryna u dzieci jest przeciwwskazana z powodu ryzyka zespołu Reye'a,</strong> a ponadto nasiliłaby krwawienie.",
        "❌ BŁĄD! <strong>Leczenie bólu jest obowiązkiem lekarza;</strong> bezpiecznym analgetykiem pierwszego rzutu jest paracetamol."
      ]
    },
    {
      title: "Krok 7: Harmonogram monitorowania nefrologicznego",
      text: "Objawy skórne i brzuszne Antosia ustąpiły po 10 dniach. Jak powinien wyglądać ambulatoryjny plan monitorowania nefrologicznego (badanie moczu i pomiar ciśnienia tętniczego)?",
      options: [
        "Badanie ogólne moczu (z oceną osadu i białkomoczu) oraz pomiar ciśnienia tętniczego co 1-2 tygodnie przez pierwsze 2 miesiące, a następnie raz w miesiącu do 6 miesięcy od początku choroby",
        "Jednorazowe badanie moczu po roku od wyzdrowienia",
        "Codzienne wykonywanie USG nerek w warunkach szpitalnych przez 3 miesiące",
        "Nie ma konieczności jakiejkolwiek kontroli, jeśli wysypka na skórze ustąpiła"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Nefropatia IgAV może ujawnić się z opóźnieniem – u ponad 85% dzieci w ciągu pierwszego miesiąca, ale u pozostałych w ciągu 2-6 miesięcy.</strong> Wytyczne zalecają regularne kontrole badania ogólnego moczu i pomiarów ciśnienia tętniczego: co 1-2 tygodnie przez pierwsze 8 tygodni, a następnie co miesiąc do ukończenia 6 miesięcy od początku objawów.",
        "❌ BŁĄD! <strong>Jednorazowa kontrola po roku to zbyt późno;</strong> nierozpoznane zapalenie nerek mogłoby doprowadzić do nieodwracalnego zwłóknienia kłębuszków.",
        "❌ BŁĄD! <strong>USG ocenia jedynie morfologię makroskopową nerek,</strong> a nie wczesne uszkodzenie kłębuszkowe, które widać w moczu.",
        "❌ BŁĄD! <strong>Ustąpienie plamicy skórnej nie oznacza wyzdrowienia nerek;</strong> nefropatia może postępować bezobjawowo."
      ]
    },
    {
      title: "Krok 8: Wskazania do biopsji nerki w zapaleniu naczyń IgA",
      text: "W którym z poniższych przypadków u dziecka z IgAV bezwzględnie konieczne jest wykonanie przezskórnej biopsji nerki z oceną histologiczną?",
      options: [
        "Wystąpienie zespołu nerczycowego (masywny białkomocz >40 mg/m²/h, hipoalbuminemia), zespołu nefrytycznego z nadciśnieniem i spadkiem GFR lub utrzymujący się ciężki białkomocz (UPCR >1,0 mg/mg przez >4 tygodnie)",
        "Obecność samej plamicy skórnej na pośladkach trwającej dłużej niż 7 dni",
        "Izolowany krwinkomocz mikroskopowy (<10 wpw) bez białkomoczu i z prawidłowym ciśnieniem tętniczym",
        "Ból obu stawów skokowych ustępujący po paracetamolu"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Wskazaniami do biopsji nerki w IgAV są ciężkie manifestacje nefrologiczne:</strong> zespół nerczycowy, gwałtownie postępujące kłębuszkowe zapalenie nerek (RPGN ze spadkiem eGFR i nadciśnieniem) lub utrzymujący się istotny białkomocz (>1 g/dobę lub UPCR >1 mg/mg) po 4 tygodniach. Biopsja pozwala ocenić odsetek półksiężyców (klasyfikacja ISKDC) i kwalifikuje do agresywnej immunosupresji (pulsy metyloprednizolonu, cyklofosfamid, mykofenolan mofetylu).",
        "❌ BŁĄD! <strong>Sama wysypka skórna nie jest wskazaniem do biopsji nerki.</strong>",
        "❌ BŁĄD! <strong>Izolowany krwinkomocz mikroskopowy wymaga jedynie czujnej obserwacji</strong> ambulatoryjnej; biopsja nie wpłynęłaby na postępowanie.",
        "❌ BŁĄD! <strong>Objawy stawowe nie mają związku ze wskazaniami do inwazyjnej biopsji nerki.</strong>"
      ]
    }
  ],
  pathoNodes: [
    {
      badge: "Zaburzenie glikozylacji",
      title: "Niedobór galaktozy w zawiasowym regionie IgA1",
      short: "Powstanie polimerycznych przeciwciał Gd-IgA1",
      detail: "Po infekcji dróg oddechowych dochodzi do nieprawidłowej O-glikozylacji podklasy IgA1 (Galactose-deficient IgA1). Układ odpornościowy traktuje te cząsteczki jako neoantygeny, wytwarzając autoprzeciwciała IgG i IgA.",
      target: "Polimeryczne cząsteczki Gd-IgA1",
      drugTarget: "<span class='dose-pill'>Postępowanie objawowe / odpoczynek</span> unikanie stymulacji antygenowej"
    },
    {
      badge: "Immunokompleksy",
      title: "Odkładanie kompleksów w drobnych naczyniach",
      short: "Aktywacja dopełniacza na drodze lektynowej i alternatywnej",
      detail: "Kompleksy immunologiczne IgA1-IgG odkładają się w ścianach postkapilarnych żyłek skóry, krezki jelitowej, błony maziowej stawów i kłębuszków nerkowych. Prowadzi to do nacieku neutrofilów i leukocytoklazji.",
      target: "Śródbłonek mikronaczyń i C3",
      drugTarget: "<span class='dose-pill'>Prednizon 1-2 mg/kg/d p.o.</span> hamowanie kaskady cytokin i nacieku"
    },
    {
      badge: "Przesięk i wynaczynienie",
      title: "Plamica wyczuwalna i mikrowybroczyny",
      short: "Martwica włóknikowata i wynaczynienie erytrocytów",
      detail: "Zapalenie ściany naczyń powoduje utratę ich szczelności. Wynaczynienie krwinek czerwonych i obrzęk skóry tworzą uniesione, wyczuwalne palpacyjnie zmiany plamicze (palpable purpura) pod wpływem grawitacji.",
      target: "Ściany żyłek postkapilarnych skóry",
      drugTarget: "<span class='dose-pill'>Elewacja kończyn i odpoczynek</span> zmniejszenie ciśnienia hydrostatycznego"
    },
    {
      badge: "Kłębuszkowe zapalenie",
      title: "Proliferacja mezangium i nefropatia IgAV",
      short: "Depozycja IgA w mezangium kłębuszka nerkowego",
      detail: "Odkładanie kompleksów IgA w kłębuszkach indukuje proliferację komórek mezangialnych i syntezę macierzy. Uszkodzenie bariery filtracyjnej prowadzi do krwinkomoczu, wałeczków erytrocytowych i białkomoczu.",
      target: "Mezangium i podocyty kłębuszków nerkowych",
      drugTarget: "<span class='dose-pill'>Inhibitory ACE (np. Ramipryl)</span> nefroprotekcja i redukcja białkomoczu"
    }
  ],
  diffTable: {
    title: "⚔️ Tabela Różnicowa: Zapalenie naczyń IgA vs Inne skazy i stany zapalne u dzieci",
    headers: ["Cecha kliniczna", "Zapalenie naczyń IgA (Plamica H.-S.)", "Idiopatyczna plamica małopłytkowa (ITP)", "Sepsa meningokokowa (Purpura fulminans)", "Choroba Kawasakiego", "Ostra białaczka (ALL)"],
    rows: [
      ["Charakter zmian skórnych", "Uniesiona plamica (palpable purpura), symetryczna na pośladkach i nogach", "Płaskie wybroczyny (petechie) i sińce na całym ciele i śluzówkach", "Szybko narastające, asymetryczne wybroczyny i plamy martwicze", "Wielopostaciowy rumień tułowia, łuszczenie rąk/stóp, brak purpury", "Bladość, wybroczyny na skórze i podniebieniu, siniaki bez urazu"],
      ["Liczba płytek krwi (PLT)", "Prawidłowa lub podwyższona (PLT >150-450 tys./µl)", "Głęboko obniżona (często PLT <20 tys./µl)", "Początkowo norma, szybko ciężka małopłytkowość z DIC", "Wysoka nadpłytkowość w 2-3 tygodniu (często >600-1000 tys./µl)", "Zazwyczaj głęboka małopłytkowość z anemią"],
      ["Objawy brzuszne", "Napadowy ból kolkowy, krew utajona, ryzyko wgłobienia krętniczego", "Brak bólów brzucha (chyba że krwawienie do p.pok.)", "Nudności, wymioty we wstrząsie septycznym", "Bóle brzucha, wodniak pęcherzyka żółciowego", "Wzdęcie brzucha, hepatosplenomegalia"],
      ["Zajęcie stawów", "Częste zapalenie/ból dużych stawów (kostki, kolana), odwracalne", "Brak zapalenia stawów", "Możliwy ból kończyn we wczesnej sepsie", "Bóle lub zapalenie stawów u ok. 30%", "Bóle kości długich wybudzające w nocy ze snu"],
      ["Zajęcie nerek", "Krwiomocz, wałeczki erytrocytowe, białkomocz (nefropatia IgAV)", "Brak uszkodzenia nerek (możliwy krwiomocz ze skazy)", "Ostre uszkodzenie nerek przednerkowe/septyczne (AKI)", "Rzadkie, możliwe jałowe zapalenie cewek (leukocyturia)", "Rzadkie, nefropatia moczanowa w TLS"],
      ["Główne leczenie", "Objawowe; GKS w silnym bólu brzucha; monitorowanie moczu przez 6 m-cy", "Obserwacja lub IVIG / krótki kurs GKS przy krwawieniach", "Pilne podanie ceftriaksonu i.v., intensywna terapia wstrząsu", "IVIG 2 g/kg w pojedynczym wlewie + ASA 30-50 mg/kg/d", "Wielolekowa chemioterapia protokołowa + MTX i.t."]
    ]
  },
  dutySummary: {
    overview: "Zapalenie naczyń związane z przeciwciałami IgA (IgAV, dawniej plamica Henocha-Schönleina) to najczęstsze zapalenie małych naczyń u dzieci (szczyt 3-10 lat). Przebiega z odkładaniem kompleksów IgA w skórze, stawach, przewodzie pokarmowym i nerkach. W ponad 90% przypadków choroba ma przebieg samoograniczający się, a o odległym rokowaniu decyduje stopień zajęcia nerek (nefropatia IgAV).",
    diagnostics: "1. Morfologia krwi z rozmazem i liczbą płytek krwi (PLT) – wykluczenie małopłytkowości (w IgAV płytki są prawidłowe lub podwyższone).<br>2. Badanie ogólne moczu z oceną osadu i wskaźnika białko/kreatynina (UPCR) – poszukiwanie krwiomoczu, wałeczków erytrocytowych i białkomoczu kłębuszkowego.<br>3. USG jamy brzusznej – obowiązkowe przy silnych bólach brzucha celem wykluczenia wgłobienia jelita (najczęściej krętniczo-krętniczego) oraz krwiaków ściany jelita.<br>4. Ocena układu krzepnięcia (INR, APTT, fibrynogen) – wykluczenie koagulopatii.<br>5. Badanie stolca na krew utajoną (FOBT) oraz USG moszny u chłopców przy bólu jąder.",
    drugsAndDoses: "1. Analgezja pierwszego rzutu: <span class='dose-pill'>Paracetamol 15 mg/kg m.c. p.o. co 6 h</span> w bólach stawowych i łagodnych bólach brzucha.<br>2. <span class='dose-pill'>Unikanie leków z grupy NLPZ (ibuprofen)</span> przy obecności cech krwawienia z p.pok. lub aktywnej nefropatii (białkomocz, krwinkomocz).<br>3. Glikokortykosteroidy w powikłaniach trzewnych: <span class='dose-pill'>Prednizon 1-2 mg/kg/dobę p.o.</span> (maks. 60 mg/d) przez 7-14 dni ze stopniową redukcją – wskazany w silnych bólach brzucha, obrzęku moszny, ciężkim artretyzmie (nie zapobiega nefropatii!).<br>4. Nefroprotekcja w nefropatii IgAV z utrzymującym się białkomoczem: <span class='dose-pill'>Ramipryl 2,5-5 mg/dobę p.o.</span> (ACEi) celem redukcji białkomoczu i kontroli ciśnienia.",
    procedures: "1. Dokładne badanie palpacyjne powłok brzusznych w poszukiwaniu objawów otrzewnowych i objawu 'tarczy' w USG.<br>2. Pomiar ciśnienia tętniczego krwi wystandaryzowanym mankietem (centyle ciśnienia dla wieku, płci i wzrostu).<br>3. Spoczynkowy reżim łóżkowy z uniesieniem kończyn dolnych w ostrej fazie plamicy (zmniejsza ciśnienie hydrostatyczne i wysięk).<br>4. Wskazania do biopsji nerki: białkomocz w zakresie nerczycowym, gwałtowny spadek eGFR, nadciśnienie tętnicze lub utrzymujący się białkomocz UPCR >1,0 przez ponad 4 tygodnie.",
    monitoring: "1. Ambulatoryjna kontrola badania ogólnego moczu i ciśnienia tętniczego: co 1-2 tygodnie przez pierwsze 2 miesiące od początku choroby.<br>2. Następnie kontrolne badanie moczu i RR raz w miesiącu do ukończenia 6 miesięcy.<br>3. Pilna konsultacja chirurgiczna w przypadku nagłego zaostrzenia bólu brzucha, wymiotów żółciowych lub stolca o wyglądzie 'galaretki porzeczkowej' (wgłobienie jelita).<br>4. Konsultacja nefrologa dziecięcego w przypadku utrzymywania się białkomoczu >0,5 g/dobę lub erytrocyturii >6 miesięcy."
  },
  lekQuestions: [
    {
      question: "Zgodnie z kryteriami klasyfikacyjnymi EULAR/PRINTO/PRES (2010) bezwzględnym warunkiem koniecznym do rozpoznania zapalenia naczyń związanego z IgA (plamicy Henocha-Schönleina) jest obecność:",
      options: [
        "Wyczuwalnej dotykiem plamicy (palpable purpura) lub wybroczyn o przewadze na kończynach dolnych, bez małopłytkowości",
        "Małopłytkowości poniżej 50 000/µl",
        "Wysokiego miana przeciwciał c-ANCA w surowicy",
        "Przetrwałej gorączki trwającej co najmniej 7 dni",
        "Płaskiego rumienia na twarzy w kształcie motyla"
      ],
      correct: 0,
      expl: "Kryteria EULAR/PRINTO/PRES uznają za obowiązkowy element rozpoznania obecność uniesionej, wyczuwalnej palpacyjnie plamicy (palpable purpura) lub wybroczyn zlokalizowanych głównie na kończynach dolnych i pośladkach, przy braku małopłytkowości i koagulopatii, oraz spełnienie co najmniej jednego kryterium dodatkowego (ból brzucha, zapalenie/ból stawów, nefropatia lub biopsja z dominacją IgA)."
    },
    {
      question: "Które powikłanie zapalenia naczyń związanego z IgA (IgAV) w największym stopniu determinuje długofalowe rokowanie u dziecka?",
      options: [
        "Nefropatia IgAV (zajęcie nerek)",
        "Rozległość wykwitów plamiczych na skórze pośladków",
        "Zapalenie stawów skokowych i kolanowych",
        "Wielkość powiększonych węzłów chłonnych szyjnych",
        "Wypadanie włosów po przebytej chorobie"
      ],
      correct: 0,
      expl: "Zmiany skórne, stawowe i żołądkowo-jelitowe w IgAV mają charakter przejściowy i ustępują bez trwałych następstw. Jedynym narządem, którego uszkodzenie decyduje o odległym rokowaniu i może doprowadzić do przewlekłej lub schyłkowej niewydolności nerek, są nerki (nefropatia IgAV)."
    },
    {
      question: "Najczęstszym ostrym powikłaniem chirurgicznym w jamie brzusznej u dzieci z plamicą Henocha-Schönleina jest:",
      options: [
        "Wgłobienie jelita (najczęściej krętniczo-krętnicze)",
        "Ostre kamicze zapalenie pęcherzyka żółciowego",
        "Skręt sieci większej",
        "Perforacja wrzodu dwunastnicy",
        "Rzekomobłoniaste zapalenie jelit"
      ],
      correct: 0,
      expl: "U około 2-5% dzieci z IgAV rozwija się wgłobienie jelita cienkiego. W odróżnieniu od klasycznego idiopatycznego wgłobienia u niemowląt (krętniczo-kątniczego), w IgAV punktem wyjścia wgłobienia jest krwiak śródścienny jelita cienkiego, co prowadzi najczęściej do wgłobienia krętniczo-krętniczego (ileo-ileal)."
    },
    {
      question: "Wskaż prawdziwe stwierdzenie dotyczące zastosowania glikokortykosteroidów (GKS) w zapaleniu naczyń związanym z IgA:",
      options: [
        "Szybko łagodzą silny ból brzucha i dolegliwości stawowe, lecz nie zapobiegają rozwojowi ani progresji nefropatii",
        "Zapobiegają w 100% wystąpieniu kłębuszkowego zapalenia nerek, jeśli zostaną podane w 1. dobie wysypki",
        "Są bezwzględnie przeciwwskazane z powodu ryzyka pęknięcia skóry",
        "Należy je stosować rutynowo u każdego pacjenta z izolowaną łagodną plamicą skórną",
        "Podaje się je wyłącznie dożylnie przez minimum 6 miesięcy"
      ],
      correct: 0,
      expl: "Badania z randomizacją (EBM) jednoznacznie wykazały, że GKS (prednizon) skutecznie skracają czas trwania i nasilenie silnych bólów brzucha oraz stawów, ale NIE zapobiegają wystąpieniu ani progresji nefropatii IgAV w przyszłości. Dlatego nie są zalecane profilaktycznie w łagodnych postaciach choroby."
    },
    {
      question: "U 7-letniego chłopca z IgAV występują silne kolkowe bóle brzucha oraz krew utajona w kale. Zastosowanie którego z poniższych leków przeciwbólowych jest w tej sytuacji PRZECIWWSKAZANE?",
      options: [
        "Ibuprofen (NLPZ)",
        "Paracetamol",
        "Drotaweryna (No-Spa)",
        "Metamizol w małej dawce",
        "Prednizon"
      ],
      correct: 0,
      expl: "Niesteroidowe leki przeciwzapalne (NLPZ, np. ibuprofen) są przeciwwskazane u chorych z IgAV, u których występują objawy ze strony przewodu pokarmowego (bóle brzucha, krwawienie, dodatni FOBT) lub cechy zajęcia nerek (białkomocz, krwinkomocz), ze względu na ryzyko nasilenia krwawień z błony śluzowej i pogorszenia perfuzji nerkowej."
    },
    {
      question: "Jak długo należy prowadzić regularne monitorowanie badania ogólnego moczu i ciśnienia tętniczego u dziecka po epizodzie plamicy Henocha-Schönleina?",
      options: [
        "Przez co najmniej 6 miesięcy od początku objawów",
        "Wyłącznie przez pierwsze 7 dni",
        "Nie ma potrzeby kontroli moczu, jeśli wysypka ustąpiła w 2. tygodniu",
        "Przez 18 lat co tydzień",
        "Do momentu zarośnięcia chrząstek wzrostowych"
      ],
      correct: 0,
      expl: "Nefropatia IgAV może ujawnić się z opóźnieniem – u większości dzieci rozwija się w ciągu pierwszego miesiąca, ale u części dopiero po kilku miesiącach od początku choroby. Międzynarodowe wytyczne zalecają kontrole moczu i ciśnienia przez co najmniej 6 miesięcy (początkowo co 1-2 tyg., potem co miesiąc)."
    },
    {
      question: "Wskaż bezwzględne wskazanie do wykonania biopsji nerki u dziecka z zapaleniem naczyń związanym z IgA:",
      options: [
        "Białkomocz w zakresie nerczycowym lub gwałtowny spadek przesączania kłębuszkowego (eGFR)",
        "Uporczywa wysypka na pośladkach trwająca ponad 14 dni",
        "Izolowany krwinkomocz mikroskopowy bez białkomoczu",
        "Nawrót bólów obu kolan po wysiłku fizycznym",
        "Podwyższona leukocytoza (WBC 13 tys./µl) w ostrej fazie"
      ],
      correct: 0,
      expl: "Wskazaniami do biopsji nerki w IgAV są: białkomocz w zakresie nerczycowym (UPCR >2 mg/mg lub >40 mg/m²/h), gwałtownie postępujące upośledzenie funkcji nerek (wzrost kreatyniny, spadek eGFR) lub utrzymujący się istotny białkomocz (UPCR >1 mg/mg) trwający ponad 4 tygodnie."
    },
    {
      question: "Czym charakteryzuje się zapalenie stawów w przebiegu plamicy Henocha-Schönleina?",
      options: [
        "Jest przemijające, nie prowadzi do destrukcji ani zniekształcenia stawów i najczęściej dotyczy stawów skokowych i kolanowych",
        "Prowadzi do szybkiego powstawania nadżerek kostnych i zesztywnienia stawów",
        "Zawsze dotyczy wyłącznie małych stawów rąk i stóp symetrycznie",
        "Wymaga pilnej punkcji i płukania stawów na bloku operacyjnym",
        "Zawsze przechodzi w postać przewlekłą toczniową"
      ],
      correct: 0,
      expl: "Artretyzm w IgAV ma charakter zapalenia okołostawowego z obrzękiem i silnym bólem, najczęściej w obrębie dużych stawów kończyn dolnych (kostki, kolana). Jest to stan całkowicie odwracalny, ustępuje samoistnie w ciągu kilku do kilkunastu dni i nigdy nie pozostawia nadżerek ani trwałych zniekształceń kostnych."
    },
    {
      question: "Kluczowym zaburzeniem molekularnym w patogenezie zapalenia naczyń IgA jest:",
      options: [
        "Synteza nieprawidłowo O-glikozylowanych cząsteczek IgA1 (ubogich w galaktozę – Gd-IgA1) i tworzenie krążących kompleksów immunologicznych",
        "Wrodzony brak białka C i białka S w osoczu",
        "Obecność mutacji czynnika V Leiden",
        "Autoprzeciwciała przeciwko receptorom acetylocholiny w płytce nerwowo-mięśniowej",
        "Ekspresja antygenu HLA-B27 na limfocytach T"
      ],
      correct: 0,
      expl: "W patogenezie IgAV kluczową rolę odgrywa nieprawidłowa glikozylacja cząsteczek podklasy IgA1 w regionie zawiasowym (Galactose-deficient IgA1 – Gd-IgA1). Cząsteczki te są rozpoznawane przez autoprzeciwciała IgG/IgA, co prowadzi do powstawania wielkocząsteczkowych kompleksów immunologicznych odkładających się w ścianach naczyń włosowatych i mezangium nerkowym."
    },
    {
      question: "Typowy obraz zmian histopatologicznych w bioptacie skóry u pacjenta z plamicą Henocha-Schönleina to:",
      options: [
        "Leukocytoklastyczne zapalenie małych naczyń krwionośnych z dominującymi depozytami IgA w badaniu immunofluorescencyjnym",
        "Ziarniniaki olbrzymiokomórkowe w ścianie aorty",
        "Zakrzepica tętnic średniego kalibru bez nacieku zapalnego",
        "Hiperkeratoza naskórka z zanikiem brodawek skórnych",
        "Odkładanie złogów beta-amyloidu w tkance podskórnej"
      ],
      correct: 0,
      expl: "Histopatologicznym wykładnikiem zmian w IgAV jest leukocytoklastyczne zapalenie drobnych naczyń krwionośnych (leukocytoclastic vasculitis) ze zjawiskiem rozpadu jąder neutrofilów (leukocytoklazja), wynaczynieniem erytrocytów oraz obecnością charakterystycznych depozytów IgA i składnika C3 dopełniacza w ścianie naczyń w badaniu immunofluorescencyjnym (DIF)."
    },
    {
      question: "Który z poniższych objawów klinicznych NIE wchodzi w skład klasycznej czwórki objawów plamicy Henocha-Schönleina?",
      options: [
        "Wyprysk atopowy w zgięciach łokciowych i podkolanowych",
        "Uniesiona plamica skórna (palpable purpura)",
        "Bóle brzucha z wymiotami lub krwawieniem z p.pok.",
        "Zapalenie lub bóle dużych stawów",
        "Krwiomocz lub białkomocz (nefropatia)"
      ],
      correct: 0,
      expl: "Klasyczna tetrada objawów IgAV obejmuje: 1. Uniesioną plamicę skórną (głównie kończyny dolne i pośladki), 2. Dolegliwości stawowe (artretyzm/bóle kostek i kolan), 3. Dolegliwości brzuszne (bóle kolkowe, wymioty, krwawienia), 4. Nefropatię (krwiomocz, białkomocz). Wyprysk atopowy to cecha atopowego zapalenia skóry (AZS), niemająca związku z IgAV."
    }
  ],
  flashcards: [
    {
      front: "Co stanowi bezwzględny, obowiązkowy warunek rozpoznania zapalenia naczyń IgA (plamicy Henocha-Schönleina) wg kryteriów EULAR/PRINTO/PRES?",
      back: "Wyczuwalna dotykiem, uniesiona plamica (palpable purpura) lub wybroczyny o przewadze na kończynach dolnych i pośladkach, przy braku małopłytkowości i koagulopatii."
    },
    {
      front: "Jaka jest liczba płytek krwi (PLT) w plamicy Henocha-Schönleina?",
      back: "Prawidłowa lub podwyższona (PLT >150-450 tys./µl) – plamica ma charakter naczyniowy, a nie małopłytkowy. Wyklucza to ITP i ostre białaczki."
    },
    {
      front: "Które powikłanie zapalenia naczyń IgA determinuje odległe rokowanie u chorego?",
      back: "Zajęcie nerek (nefropatia IgAV) – jedyne powikłanie mogące prowadzić do przewlekłej choroby nerek i schyłkowej niewydolności nerek (ESRD)."
    },
    {
      front: "Jakie jest najczęstsze ostre powikłanie chirurgiczne w jamie brzusznej u dziecka z IgAV i czym różni się od idiopatycznego wgłobienia?",
      back: "Wgłobienie jelita cienkiego – w odróżnieniu od postaci idiopatycznej (krętniczo-kątniczej) w IgAV dochodzi typowo do wgłobienia krętniczo-krętniczego (ileo-ileal) na podłożu krwiaka podśluzówkowego."
    },
    {
      front: "Czy glikokortykosteroidy (GKS) zapobiegają rozwojowi nefropatii w plamicy Henocha-Schönleina?",
      back: "NIE. EBM dowiodło, że GKS (prednizon) łagodzą nasilone bóle brzucha i stawów, ale NIE chronią przed wystąpieniem ani progresją nefropatii IgAV w przyszłości."
    },
    {
      front: "Dlaczego u dziecka z IgAV z bólami brzucha lub krwinkomoczem NIE należy podawać ibuprofenu?",
      back: "NLPZ (ibuprofen) nasilają ryzyko krwawień z przewodu pokarmowego oraz upośledzają perfuzję nerek (hamowanie prostaglandyn), co może pogłębić uszkodzenie nerek."
    }
  ]
};

// Mirror fields for schema compatibility
case123.steps.forEach(step => {
  step.question = step.title;
  step.explanation = step.feedback;
});
case123.lekQuestions.forEach(q => {
  q.opts = q.options;
  q.correctIdx = q.correct;
  q.exp = q.expl;
});

saveCase(case123);

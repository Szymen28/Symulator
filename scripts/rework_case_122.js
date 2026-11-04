const fs = require('fs');
const path = require('path');
const { encryptStringAes } = require('./encrypt_case.js');

const MASTER_KEY = '@LEKSzymon28111999';
const CASES_DIR = path.join(__dirname, '..', 'cases');

console.log("Generating Case 122: Ostra białaczka limfoblastyczna (ALL)...");

async function saveCase(caseData) {
  const filePath = path.join(CASES_DIR, caseData.filename);
  const jsonStr = JSON.stringify(caseData, null, 2);
  const encrypted = await encryptStringAes(jsonStr, MASTER_KEY);
  fs.writeFileSync(filePath, JSON.stringify(encrypted, null, 2), 'utf8');
  console.log(`[SAVED] Case #${caseData.id}: ${caseData.filename} (LEK Qs: ${caseData.lekQuestions.length}, Steps: ${caseData.steps.length}, Flashcards: ${caseData.flashcards.length})`);
}

const case122 = {
  id: 122,
  filename: "122_ostra_bialaczka_limfoblastyczna_all.json",
  dept: "Pediatria",
  shortTitle: "4-letni Tymek – Nocne bóle nóżek, bladość, wybroczyny i gorączka (Ostra białaczka limfoblastyczna - ALL)",
  diagnosisTitle: "Ostra białaczka limfoblastyczna z prekursorów komórek B (B-ALL / common ALL) z nacieczeniem szpiku, ciężką małopłytkowością i zespołem rozpadu guza (ryzyko TLS)",
  vitals: [
    { label: "Temperatura ciała", val: "38,8 °C", sub: "Gorączka neutropeniczna / cytokinowa", status: "vital-crit" },
    { label: "Częstość akcji serca (HR)", val: "135/min", sub: "Tachykardia kompensacyjna (anemia i gorączka)", status: "vital-warn" },
    { label: "Płytki krwi (PLT)", val: "18 tys./µl", sub: "Krytyczna małopłytkowość z ryzykiem krwawień", status: "vital-crit" },
    { label: "Hemoglobina (Hb)", val: "6,8 g/dl", sub: "Ciężka niedokrwistość normocytowa", status: "vital-crit" }
  ],
  vitalsObj: { hr: 135, bp: "95/55", spo2: 98, rr: 26, temp: 38.8, gcs: 15 },
  story: `<p><strong>Pacjent:</strong> 4-letni Tymek (masa ciała 16 kg) został pilnie skierowany na oddział pediatryczny z podejrzeniem posocznicy, ciężkiej anemii lub choroby rozrostowej po tym, jak w badaniu morfologii zleconym przez pediatrę POZ stwierdzono głęboką małopłytkowość (PLT 18 tys./µl) oraz ciężką niedokrwistość (Hb 6,8 g/dl).</p><p><strong>Wywiad chorobowy:</strong> Od około 3-4 tygodni rodzice obserwowali narastające osłabienie syna – chłopiec, dotychczas bardzo energiczny, przestał biegać z rówieśnikami, w przedszkolu pokładał się na dywanie i szybko rezygnował z zabawy. Od dwóch tygodni skarży się na silne bóle nóżek (w okolicy kolan i goleni), które wybudzają go w nocy ze snu z płaczem; rano chłopiec utyka na prawą nogę. Pediatra początkowo podejrzewał bóle wzrostowe i zalecił paracetamol. Od kilku dni u dziecka pojawiły się liczne drobne wybroczyny na podudziach i ramionach oraz łatwo powstające siniaki, a przy myciu zębów rodzice zauważyli krwawienie z dziąseł. Wczoraj wieczorem wystąpiła wysoka gorączka do 39°C, słabo reagująca na leki przeciwgorączkowe, bez typowych objawów kataru czy kaszlu.</p><p><strong>Badanie przedmiotowe na oddziale:</strong> Dziecko w stanie ogólnym średnio-ciężkim, cierpiące, blade jak ściana (alabastrowy odcień powłok skórnych i spojówek). Na skórze podudzi, przedramion oraz na podniebieniu miękkim obecne liczne drobne wybroczyny (petechie) oraz kilka świeżych podbiegnięć krwawych (siniaków) o średnicy do 3 cm. Węzły chłonne: obustronnie powiększone pakiety węzłów szyjnych, podżuchwowych oraz pachwinowych – węzły o średnicy 1,5-2,5 cm, twardo-sprężyste, niebolesne, przesuwalne względem podłoża, bez zaczerwienienia skóry nad nimi. W badaniu klatki piersiowej: tachykardia 135/min, cichy skurczowy szmer wyrzutowy nad koniuszkiem (szmer anemiczny). W badaniu brzucha: brzuch powiększony, wzdęty; wątroba wystaje 3,5 cm spod łuku żebrowego, śledziona wyczuwalna 4 cm poniżej lewego łuku żebrowego, twarda i gładka (hepatosplenomegalia). Wyraźna bolesność palpacyjna przy ucisku przynasad kości piszczelowych i mostka. Objawy oponowe ujemne, brak objawów ogniskowych w badaniu neurologicznym.</p>`,
  labs: {
    "Morfologia z rozmazem automatycznym i mikroskopowym": [
      { name: "Leukocyty (WBC)", val: "28,5 tys./µl", norm: "5,0 - 12,0 tys./µl", flag: "CRIT_HIGH" },
      { name: "Hemoglobina (Hb)", val: "6,8 g/dl", norm: "11,5 - 14,5 g/dl", flag: "CRIT_LOW" },
      { name: "Płytki krwi (PLT)", val: "18 tys./µl", norm: "150 - 450 tys./µl", flag: "CRIT_LOW" },
      { name: "Erytrocyty (RBC)", val: "2,35 mln/µl", norm: "3,9 - 5,1 mln/µl", flag: "CRIT_LOW" },
      { name: "Hematokryt (Ht)", val: "20,5 %", norm: "34 - 42 %", flag: "CRIT_LOW" },
      { name: "Bezwzględna liczba neutrofilów (ANC)", val: "420 /µl (0,42 tys./µl)", norm: "1500 - 8000 /µl", flag: "CRIT_LOW" },
      { name: "Rozmaz mikroskopowy krwi (manualny)", val: "Blasty 68% (komórki o skąpej cytoplazmie, dużym jądrze i delikatnej chromatynie)", norm: "0% blastów", flag: "CRIT_HIGH" }
    ],
    "Biochemia i profil zespołu rozpadu guza (TLS)": [
      { name: "Kwas moczowy w surowicy", val: "8,9 mg/dl", norm: "2,0 - 5,5 mg/dl", flag: "CRIT_HIGH" },
      { name: "Dehydrogenaza mleczanowa (LDH)", val: "1480 U/l", norm: "120 - 300 U/l", flag: "CRIT_HIGH" },
      { name: "Potas w surowicy (K+)", val: "5,3 mmol/l", norm: "3,5 - 5,1 mmol/l", flag: "HIGH" },
      { name: "Fosforany nieorganiczne", val: "5,8 mg/dl", norm: "3,2 - 5,0 mg/dl", flag: "HIGH" },
      { name: "Wapń całkowity", val: "7,9 mg/dl", norm: "8,8 - 10,4 mg/dl", flag: "LOW" },
      { name: "Kreatynina w surowicy", val: "0,5 mg/dl", norm: "0,3 - 0,6 mg/dl", flag: "NORMAL" },
      { name: "Mocznik", val: "28 mg/dl", norm: "15 - 36 mg/dl", flag: "NORMAL" },
      { name: "CRP", val: "18,4 mg/l", norm: "< 5,0 mg/l", flag: "HIGH" }
    ],
    "Układ krzepnięcia": [
      { name: "Czas protrombinowy (INR)", val: "1,05", norm: "0,9 - 1,2", flag: "NORMAL" },
      { name: "APTT", val: "29 s", norm: "26 - 36 s", flag: "NORMAL" },
      { name: "Fibrynogen", val: "280 mg/dl", norm: "200 - 400 mg/dl", flag: "NORMAL" },
      { name: "D-dimery", val: "420 ng/ml", norm: "< 500 ng/ml", flag: "NORMAL" }
    ]
  },
  steps: [
    {
      title: "Krok 1: Natychmiastowa ocena stanu klinicznego i identyfikacja zagrożenia życia",
      text: "Tymek trafia na oddział z gorączką 38,8°C, wybroczynami, PLT 18 tys./µl, Hb 6,8 g/dl oraz bezwzględną liczbą granulocytów ANC 420/µl. Jakie są dwa najgroźniejsze powikłania zagrażające życiu w pierwszych godzinach hospitalizacji?",
      options: [
        "Masywne krwawienie śródczaszkowe z małopłytkowości oraz sepsa w przebiegu gorączki neutropenicznej",
        "Zatorowość płucna z powodu nadpłytkowości oraz ostra niewydolność oddechowa",
        "Wstrząs anafilaktyczny na własne limfocyty oraz zawał mięśnia sercowego",
        "Encefalopatia wątrobowa i obrzęk mózgu z powodu hiperamonemii"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>U dziecka z ciężką małopłytkowością (<20 tys./µl) i neutropenią (ANC <500/µl) śmiertelnym zagrożeniem są krwawienia do OUN oraz piorunująca sepsa bakteryjna.</strong> Wymaga to natychmiastowego zabezpieczenia dostępu naczyniowego, monitorowania i gotowości do pilnej antybiotykoterapii i przetoczeń koncentratu krwinek płytkowych w razie cech krwawienia.",
        "❌ BŁĄD! <strong>Dziecko ma skrajną małopłytkowość (18 tys./µl), a nie nadpłytkowość;</strong> ryzyko zatorowości jest znikome, grozi mu krwawienie.",
        "❌ BŁĄD! <strong>ALL nie manifestuje się wstrząsem anafilaktycznym ani zawałem serca u 4-latka.</strong>",
        "❌ BŁĄD! <strong>Wątroba jest powiększona z powodu nacieczenia białaczkowego,</strong> ale funkcja syntetyczna i metaboliczna wątroby jest początkowo zachowana."
      ]
    },
    {
      title: "Krok 2: Interpretacja triady objawów niewydolności szpiku w ALL",
      text: "Lekarz stażysta pyta Cię o powiązanie poszczególnych objawów zgłaszanych przez rodziców z patofizjologią ostrej białaczki. Które zestawienie precyzyjnie łączy objawy z mechanizmem wyparcia szpiku?",
      options: [
        "Bladość i apatia (wyparcie linii czerwonokrwinkowej -> anemia); wybroczyny i krwawienia (wyparcie megakariocytów -> małopłytkowość); gorączka i podatność na zakażenia (wyparcie granulocytów -> neutropenia)",
        "Wybroczyny wynikają z niedoboru witaminy C; bóle nóżek to zapalenie kości i szpiku (osteomyelitis); gorączka to odra",
        "Anemia wynika z autoimmunologicznej hemolizy; małopłytkowość z niszczenia płytek w śledzionie; gorączka z ząbkowania",
        "Bladość to cecha konstytucjonalna; bóle kości to bóle wzrostowe; limfadenopatia to typowy stan po szczepieniu"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Masywna klonalna proliferacja komórek blastycznych w jamie szpikowej prowadzi do mechanicznego wyparcia i supresji prawidłowej hematopoezy.</strong> Skutkuje to klasyczną triadą: anemią normocytową, głęboką małopłytkowością i neutropenią, a dodatkowo ekspansja blastów w jamie szpikowej kości długich powoduje silne bóle kostne wybudzające dziecko ze snu.",
        "❌ BŁĄD! <strong>Wybroczyny nie wynikają ze szkorbutu,</strong> a nocne bóle wybudzające ze snu nigdy nie mogą być bagatelizowane jako 'bóle wzrostowe'!",
        "❌ BŁĄD! <strong>Choć może współistnieć hipersplenizm,</strong> głównym powodem cytopenii w ALL jest pierwotne wyparcie prekursorów w szpiku przez blasty.",
        "❌ BŁĄD! <strong>Ignorowanie tych objawów doprowadziłoby do śmierci dziecka</strong> z powodu powikłań krwotocznych lub septycznych."
      ]
    },
    {
      title: "Krok 3: Badanie rozstrzygające o rozpoznaniu ALL",
      text: "W rozmazie krwi manualnym stwierdzono 68% komórek blastycznych. Jakie badanie jest 'złotym standardem' ostatecznie potwierdzającym rozpoznanie ALL i jaki odsetek blastów spełnia kryterium diagnostyczne?",
      options: [
        "Aspiracja i trepanobiopsja szpiku kostnego (z talerza kości biodrowej); kryterium rozpoznania ostrej białaczki to >=20% blastów w szpiku",
        "Biopsja wycięciowa węzła chłonnego szyjnego z oceną histopatologiczną",
        "Tomografia komputerowa klatki piersiowej i jamy brzusznej z kontrastem",
        "Powtórzenie morfologii krwi obwodowej za 14 dni"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Badaniem rozstrzygającym w ostrej białaczce jest aspiracja szpiku kostnego (BACC szpiku).</strong> Zgodnie z kryteriami WHO rozpoznanie ostrej białaczki stawia się, gdy odsetek blastów w szpiku wynosi >=20% (często u dzieci dochodzi do 80-95%). Pobrany szpik poddaje się badaniu cytologicznemu, immunofenotypowemu (cytometria przepływowa), cytogenetycznemu (kariotyp, FISH) i molekularnemu.",
        "❌ BŁĄD! <strong>Biopsja węzła chłonnego jest badaniem drugorzędnym,</strong> a w ALL szpik jest pierwotnym ogniskiem choroby; biopsja węzła służy w diagnostyce chłoniaków.",
        "❌ BŁĄD! <strong>TK ocenia nacieczenia narządowe,</strong> ale nie ustala typu białaczki ani nie pozwala zbadać immunofenotypu.",
        "❌ BŁĄD! <strong>Odwlekanie biopsji szpiku o 2 tygodnie to karygodny błąd –</strong> dziecko wymaga natychmiastowej terapii w ośrodku onkohematologii dziecięcej."
      ]
    },
    {
      title: "Krok 4: Identyfikacja i profilaktyka zespołu rozpadu guza (TLS)",
      text: "WYNIKI: Kwas moczowy 8,9 mg/dl, LDH 1480 U/l, K+ 5,3 mmol/l, P 5,8 mg/dl, Ca 7,9 mg/dl. Jakie powikłanie metaboliczne rozwija się u chłopca i jakie leczenie należy natychmiast wdrożyć?",
      options: [
        "Zespół rozpadu guza (TLS); wdrożenie intensywnego nawadniania (3000 ml/m²/dobę płynów bez potasu) oraz podanie rasburykazy (lub allopurynolu) celem ochrony nerek przed nefropatią moczanową",
        "Przewlekła niewydolność nerek w stadium mocznicy; natychmiastowa hemodializa bez podawania płynów",
        "Pierwotna nadczynność przytarczyc; podanie kalcytoniny i bifosfonianów",
        "Kwasica ketonowa; wdrożenie insuliny we wlewie ciągłym i wlew chlorku potasu"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Obecność hiperurykemii, hiperfosfatemii, hiperkaliemii i hipokalcemii przy wysokim LDH definiuje laboratoryjny zespół rozpadu guza (kryteria Cairo-Bishopa).</strong> Podstawą postępowania przed włączeniem chemioterapii jest hiperhydratacja płynami bez dodatku potasu (2500-3000 ml/m²/dobę) oraz <span class='dose-pill'>Rasburykaza 0,2 mg/kg i.v.</span> (rekombinowana oksydaza moczanowa przekształcająca kwas moczowy w dobrze rozpuszczalną alantoinę) lub <span class='dose-pill'>Allopurynol 10 mg/kg/d p.o.</span>.",
        "❌ BŁĄD! <strong>Kreatynina jest w normie (0,5 mg/dl),</strong> nie ma mocznicy, a restrykcja płynowa doprowadziłaby do wytrącenia kryształów kwasu moczowego i ostrej nefropatii zaporowej.",
        "❌ BŁĄD! <strong>W nadczynności przytarczyc występuje hiperkalcemia,</strong> natomiast w TLS mamy hipokalcemię wynikającą z wiązania wapnia przez wysokie fosforany.",
        "❌ BŁĄD! <strong>Glukoza jest prawidłowa,</strong> nie ma kwasicy ketonowej; podanie potasu mogłoby wywołać zgon w mechanizmie migotania komór!"
      ]
    },
    {
      title: "Krok 5: Ocena płynu mózgowo-rdzeniowego i profilaktyka OUN",
      text: "Dlaczego u każdego dziecka z nowo rozpoznaną ALL konieczne jest wykonanie punkcji lędźwiowej (LP) i jakie leczenie profilaktyczne OUN stanowi standard we współczesnych protokołach?",
      options: [
        "W celu wykluczenia/potwierdzenia neurobiałaczki (nacieku OUN) oraz podania pierwszorzutowej chemioterapii dokanałowej (metotreksat dokanałowo)",
        "Wyłącznie w celu wykluczenia bakteryjnego zapalenia opon mózgowo-rdzeniowych; OUN nie ulega nacieczeniu w ALL",
        "W celu pobrania płynu do hodowli wirusologicznej na obecność wirusa HIV",
        "Punkcja lędźwiowa jest bezwzględnie przeciwwskazana w ALL z uwagi na ryzyko wgłobienia mózgu"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Ośrodkowy układ nerwowy stanowi 'sanktuarium' dla komórek białaczkowych, ponieważ bariera krew-mózg chroni je przed większością leków podawanych systemowo.</strong> Badanie płynu mózgowo-rdzeniowego pozwala ocenić stan OUN (CNS-1, CNS-2, CNS-3), a jednoczasowe dokanałowe podanie cytostatyków (<span class='dose-pill'>Metotreksat i.t.</span>, deksametazon, cytarabina) zapobiega wznowom w OUN bez konieczności napromieniania mózgowia.",
        "❌ BŁĄD! <strong>Nacieczenie OUN jest jednym z kluczowych problemów w ALL;</strong> w minionych dekadach bez profilaktyki OUN wznowy w układzie nerwowym dotyczyły ponad 50% dzieci.",
        "❌ BŁĄD! <strong>Rutynowa punkcja w ALL nie służy diagnostyce HIV.</strong>",
        "❌ BŁĄD! <strong>Punkcja lędźwiowa jest procedurą rutynową i obowiązkową,</strong> pod warunkiem uprzedniego wyrównania hemostazy (przetoczenie płytek, jeśli PLT <50 tys./µl przed nakłuciem)."
      ]
    },
    {
      title: "Krok 6: Czynniki rokownicze w ostrej białaczce limfoblastycznej u dzieci",
      text: "Rodzice płaczą i pytają o szanse na wyleczenie syna. Który z poniższych czynników zalicza się do KORZYSTNYCH czynników prognostycznych w dziecięcej ALL?",
      options: [
        "Wiek dziecka między 1. a 9. rokiem życia oraz obecność rearanżacji t(12;21) [ETV6-RUNX1 / TEL-AML1]",
        "Wiek poniżej 1. roku życia (niemowlęca ALL) z rearanżacją genu KMT2A (MLL)",
        "Wstępna leukocytoza WBC > 100 000 /µl w chwili rozpoznania",
        "Obecność chromosomu Philadelphia t(9;22) [BCR-ABL1]",
        "Słaba odpowiedź na wstępną prednizonoterapię (proferyza blastów w 8. dobie)"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Wiek od 1 do 9 lat, wstępne WBC <50 000/µl oraz rearanżacja t(12;21) ETV6-RUNX1 lub hiperdiploidia (>50 chromosomów) to klasyczne cechy korzystnego rokowania.</strong> U dzieci w tej grupie ryzyka wskaźnik 5-letniego przeżycia wolnego od wznowy (EFS) przekracza obecnie 90%!",
        "❌ BŁĄD! <strong>Białaczka u niemowląt (<1 r.ż.) z rearanżacją KMT2A (MLL)</strong> cechuje się bardzo złym rokowaniem i wysokim odsetkiem wczesnych nawrotów.",
        "❌ BŁĄD! <strong>Ekstremalna hiperleukocytoza (WBC >100 tys./µl)</strong> jest silnym niekorzystnym czynnikiem rokowniczym (grupa wysokiego ryzyka).",
        "❌ BŁĄD! <strong>Obecność t(9;22) (Ph+ ALL) historycznie wiązała się ze złym rokowaniem,</strong> obecnie wymaga dołączenia inhibitorów kinazy tyrozynowej (np. imatynibu).",
        "❌ BŁĄD! <strong>Dobra odpowiedź na 7-dniową monoterapię prednizonem (<1000 blastów/µl we krwi w 8. dobie)</strong> jest jednym z najważniejszych korzystnych parametrów prognostycznych w protokołach BFM."
      ]
    },
    {
      title: "Krok 7: Fazy chemioterapii według protokołów międzynarodowych (np. BFM)",
      text: "Leczenie dziecięcej ALL trwa łącznie około 2 lat. Jaka jest prawidłowa chronologiczna kolejność etapów leczenia protokołowego?",
      options: [
        "Preleczenie proeryzowe (GKS) -> Indukcja remisji -> Konsolidacja (protokół I/II) -> Reindukcja -> Leczenie podtrzymujące (leczenie podtrzymujące doustne: 6-merkaptopuryna + metotreksat)",
        "Od razu allogeniczne przeszczepienie szpiku (allo-HSCT) bez wstępnej chemioterapii",
        "Jednorazowa radioterapia całego ciała (TBI) i zakończenie terapii po 3 tygodniach",
        "Wyłącznie leczenie podtrzymujące witaminami i przetoczeniami krwi przez 2 lata"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Standardowy schemat wielolekowej chemioterapii składa się z:</strong> preleczenia glikokortykosteroidami, intensywnej indukcji remisji (GKS, winkrystyna, daunorubicyna, L-asparaginaza), konsolidacji, reindukcji i długiego (do 2 lat od rozpoznania) leczenia podtrzymującego w warunkach domowych (<span class='dose-pill'>6-Merkaptopuryna 50 mg/m²/d p.o.</span> + <span class='dose-pill'>Metotreksat 20 mg/m²/tydz. p.o.</span>).",
        "❌ BŁĄD! <strong>Allo-HSCT nie jest stosowany w pierwszej linii u pacjentów standardowego ryzyka;</strong> jest zarezerwowany dla grupy bardzo wysokiego ryzyka lub wznów.",
        "❌ BŁĄD! <strong>Radioterapia całego ciała nie jest stosowana jako monoterapia</strong> w ostrej białaczce.",
        "❌ BŁĄD! <strong>Bez intensywnej wielolekowej chemioterapii ALL jest chorobą w 100% śmiertelną w ciągu kilku miesięcy.</strong>"
      ]
    },
    {
      title: "Krok 8: Postępowanie w gorączce neutropenicznej w trakcie terapii",
      text: "W trakcie hospitalizacji u Tymka z ANC 420/µl temperatura wzrasta do 39,2°C, pojawiają się dreszcze. Co stanowi bezwzględny algorytm postępowania ratunkowego w gorączce neutropenicznej u dziecka onkologicznego?",
      options: [
        "Pilne pobranie posiewów krwi (z wkłucia centralnego i obwodowego) i natychmiastowe podanie dożylne antybiotyków o szerokim spektrum przeciwko Pseudomonas i pałeczkom Gram-ujemnym (np. ceftazydym/cefepim lub piperacylina z tazobaktamem) w pierwszej godzinie ('złota godzina')",
        "Podanie wyłącznie paracetamolu w czopku i oczekiwanie na wynik posiewu krwi (za 48-72 h)",
        "Odstawienie wszystkich leków i wypisanie dziecka do domu celem uniknięcia zakażeń szpitalnych",
        "Podanie leku przeciwgrzybiczego w tabletkach bez badania krwi"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Gorączka neutropeniczna u pacjenta onkohematologicznego to stan bezpośredniego zagrożenia życia.</strong> Bezwzględnym standardem jest podanie empirycznej antybiotykoterapii dożylnej o szerokim spektrum (np. <span class='dose-pill'>Cefepim 50 mg/kg i.v. co 8 h</span> lub <span class='dose-pill'>Piperacylina z tazobaktamem 100 mg/kg i.v. co 8 h</span>) w ciągu 60 minut od wystąpienia gorączki, bezpośrednio po pobraniu posiewów krwi.",
        "❌ BŁĄD! <strong>Czekanie na wynik posiewu bez antybiotyku w neutropenii prowadzi do wstrząsu septycznego i zgonu w ciągu kilkunastu godzin!</strong>",
        "❌ BŁĄD! <strong>Wypisanie gorączkującego dziecka z neutropenią do domu to rażący błąd w sztuce lekarskiej.</strong>",
        "❌ BŁĄD! <strong>Większość epizodów zakażeń w gorączce neutropenicznej ma etiologię bakteryjną (Gram-ujemną i Gram-dodatnią),</strong> leczenie przeciwgrzybicze dołącza się w razie braku poprawy po 4-5 dniach."
      ]
    }
  ],
  pathoNodes: [
    {
      badge: "Klonogeneza",
      title: "Zablokowanie różnicowania limfoblastów",
      short: "Monoklonalny rozrost prekursorów limfocytów B",
      detail: "Zaburzenia genetyczne (np. translokacje chromosomalne) blokują dojrzewanie komórek prekursorowych na etapie pro-B/pre-B. Powstałe komórki blastyczne nie ulegają apoptozie i niekontrolowanie dzielą się w jamie szpikowej.",
      target: "Blasty prekursorowe w szpiku kostnym",
      drugTarget: "<span class='dose-pill'>Winkrystyna 1,5 mg/m² i.v.</span> + <span class='dose-pill'>Prednizon 60 mg/m²/d p.o.</span> indukcja apoptozy blastów"
    },
    {
      badge: "Wyparcie szpiku",
      title: "Pancytopenia i niewydolność krwiotwórcza",
      short: "Mechaniczne i parakrynne tłumienie erytropoezy i megakariopoezy",
      detail: "Masa komórek białaczkowych fizycznie niszczy mikrośrodowisko nisz szpikowych oraz wydziela cytokiny hamujące prawidłowe prekursory, co prowadzi do ciężkiej anemii, skazy małopłytkowej i głębokiej neutropenii.",
      target: "Prawidłowa trójliniowa hematopoeza",
      drugTarget: "<span class='dose-pill'>Przetoczenie KKCz 10-15 ml/kg</span> + <span class='dose-pill'>KKP 1 j./10 kg</span> substytucja morfotyczna"
    },
    {
      badge: "Nacieczenie narządów",
      title: "Hepatomegalia, splenomegalia i bóle kostne",
      short: "Zajęcie okostnej, siateczkowo-śródbłonkowego układu i OUN",
      detail: "Blasty infiltrują okostną (nasilone bóle kości wybudzające ze snu), śledzionę i wątrobę (hepatosplenomegalia) oraz węzły chłonne. Przenikają także przez oponę miękką do płynu mózgowo-rdzeniowego.",
      target: "Nacieki pozaszpikowe i bariera krew-mózg",
      drugTarget: "<span class='dose-pill'>Metotreksat dokanałowo (i.t.) 12 mg</span> profilaktyka i eradykacja z OUN"
    },
    {
      badge: "Liza komórek",
      title: "Zespół rozpadu guza (TLS) i nefropatia moczanowa",
      short: "Wyrzut jonów K+, PO4(3-) i kwasu moczowego do krwiobiegu",
      detail: "Gwałtowny rozpad komórek białaczkowych uwalnia olbrzymie ilości puryn metabolizowanych do słabo rozpuszczalnego kwasu moczowego. Kryształy moczanowe i fosforanu wapnia zatykają cewki nerkowe, grożąc ostrą niewydolnością nerek.",
      target: "Kwas moczowy i cewki nerkowe",
      drugTarget: "<span class='dose-pill'>Rasburykaza 0,2 mg/kg i.v.</span> konwersja kwasu moczowego do alantoiny"
    }
  ],
  diffTable: {
    title: "⚔️ Tabela Różnicowa: Ostra białaczka limfoblastyczna vs Inne przyczyny cytopenii i bólów kończyn u dzieci",
    headers: ["Cecha kliniczna", "Ostra białaczka limfoblastyczna (ALL)", "Idiopatyczna plamica małopłytkowa (ITP)", "Młodzieńcze idiopatyczne zapalenie stawów (MIZS)", "Niedokrwistość aplastyczna (AA)", "Mononukleoza zakaźna (EBV)"],
    rows: [
      ["Rozmaz krwi obwodowej", "Obecność limfoblastów (często >20-50%), niedokrwistość, neutropenia", "Izolowana głęboka małopłytkowość; RBC i WBC całkowicie prawidłowe", "Brak blastów; typowa leukocytoza neutrofilowa, nadpłytkowość, wysokie OB/CRP", "Pancytopenia bez obecności blastów (pusty szpik bez nowotworu)", "Limfocytoza z obecnością atypowych limfocytów (wirusocytów Downeya >10%)"],
      ["Bóle kostno-stawowe", "Bóle kości długich wybudzające w nocy, brak cech ostrego zapalenia stawu", "Całkowity brak bólów kostno-stawowych", "Ból, obrzęk stawów, sztywność poranna (>30 min), stan zapalny błony maziowej", "Brak bólów kostnych (chyba że urazowe)", "Brak bólów kości, możliwe bóle mięśniowe"],
      ["Węzły chłonne i śledziona", "Uogólniona, niebolesna limfadenopatia, częsta splenomegalia", "Węzły chłonne i śledziona niepowiększone (splenomegalia wyklucza typowe ITP!)", "Możliwa limfadenopatia w postaci uogólnionej (SoJIA) ze splenomegalią", "Brak powiększenia węzłów chłonnych i śledziony", "Wyraźna limfadenopatia szyjna tylna, zapalenie gardła, splenomegalia"],
      ["Badanie szpiku kostnego", "Szpik bogatokomórkowy, >=20% blastów (często >80%)", "Szpik bogatokomórkowy ze zwiększoną liczbą megakariocytów", "Szpik odczynowy, brak blastów", "Skrajnie ubogokomórkowy szpik (tłuszczowy), brak nacieku nowotworowego", "Szpik odczynowy, nie wymaga biopsji"],
      ["Etiologia / patogeneza", "Złośliwa transformacja klonalna prekursorów limfocytów B lub T", "Autoprzeciwciała IgG przeciwko glikoproteinom płytek (GPIIb/IIIa)", "Przewlekłe autoimmunologiczne/autozapalne zapalenie tkanki łącznej", "Autoimmunologiczne lub toksyczne zniszczenie komórek macierzystych CD34+", "Zakażenie pierwotne wirusem Epsteina-Barr (komórki B)"],
      ["Leczenie pierwszego rzutu", "Wielolekowa chemioterapia protokołowa (GKS, VCR, L-Asp, Dauno) + MTX i.t.", "Obserwacja lub IVIG / krótki kurs GKS w razie nasilonych krwawień", "NLPZ, glikokortykosteroidy, metotreksat, leki biologiczne (anty-IL-1, IL-6)", "Leczenie immunosupresyjne (ATG + cyklosporyna) lub allo-HSCT", "Leczenie objawowe, odpoczynek, unikanie sportów kontaktowych (pęknięcie śledziony)"]
    ]
  },
  dutySummary: {
    overview: "Ostra białaczka limfoblastyczna (ALL) jest najczęstszym nowotworem wieku dziecięcego (75-80% białaczek u dzieci, szczyt 2-5 lat). Rozwija się wskutek klonalnej proliferacji prekursorów limfoidalnych (najczęściej B-komórkowych ~85%), co prowadzi do niewydolności szpiku i nacieczenia narządów. Dzięki nowoczesnej chemioterapii wielolekowej wyleczalność wynosi obecnie około 90%.",
    diagnostics: "1. Morfologia krwi obwodowej z oceną mikroskopową (ręczną) rozmazu krwi – ocena blastów, niedokrwistości normocytowej, małopłytkowości i neutropenii.<br>2. Biopsja aspiracyjna szpiku kostnego (BACC) z talerza biodrowego – złoty standard; kryterium rozpoznania wg WHO to >=20% komórek blastycznych.<br>3. Cytometria przepływowa (immunofenotypowanie) – identyfikacja linii B (CD19, CD22, CD10) lub linii T (CD3, CD7).<br>4. Badania genetyczne i molekularne – kariotyp, FISH i PCR (t(12;21) ETV6-RUNX1, hiperdiploidia, t(9;22) BCR-ABL1, rearanżacje KMT2A).<br>5. Profil zespołu rozpadu guza (TLS): kwas moczowy, LDH, K+, fosforany, wapń, kreatynina, mocznik.<br>6. Punkcja lędźwiowa z badaniem płynu mózgowo-rdzeniowego – ocena zajęcia OUN.",
    drugsAndDoses: "1. Profilaktyka i leczenie zespołu rozpadu guza (TLS):<br>   - Nawodnienie dożylne: <span class='dose-pill'>3000 ml/m² powierzchni ciała/dobę</span> płynów bezelektrolitowych/bezpotasowych.<br>   - <span class='dose-pill'>Rasburykaza 0,2 mg/kg i.v. w pojedynczym wlewie 30 min</span> (w wysokim ryzyku TLS) LUB <span class='dose-pill'>Allopurynol 10 mg/kg m.c./dobę p.o. w 3 dawkach</span>.<br>2. Indukcja remisji (protokół BFM):<br>   - <span class='dose-pill'>Prednizon 60 mg/m²/d p.o.</span> (lub Deksametazon 6-10 mg/m²/d).<br>   - <span class='dose-pill'>Winkrystyna 1,5 mg/m² i.v. raz w tygodniu</span>.<br>   - <span class='dose-pill'>Daunorubicyna 30 mg/m² i.v.</span>.<br>   - <span class='dose-pill'>PEG-L-asparaginaza 2500 j.m./m² i.v./i.m.</span>.<br>3. Profilaktyka OUN: <span class='dose-pill'>Metotreksat dokanałowo (i.t.) 12 mg</span> (dawka zależna od wieku) wraz z cytarabiną i hydrokortyzonem.<br>4. Gorączka neutropeniczna: <span class='dose-pill'>Cefepim 50 mg/kg i.v. co 8 h</span> lub <span class='dose-pill'>Piperacylina z tazobaktamem 100 mg/kg i.v. co 8 h</span> w pierwszej godzinie.",
    procedures: "1. Kaniulacja naczynia centralnego (wkłucie typu Broviac / port naczyniowy) do długoterminowej chemioterapii i pobrań krwi.<br>2. Transfuzje preparatów krwi: przetoczenie ubogoleukocytarnego koncentratu krwinek czerwonych (UKKCz) w dawce 10-15 ml/kg przy objawowej ciężkiej anemii; przetoczenie ubogoleukocytarnego koncentratu krwinek płytkowych (UKKP) 1 j./10 kg przy skazie krwotocznej lub PLT <10-20 tys./µl (przed punkcją lędźwiową cel PLT >50 tys./µl).<br>3. Badanie echokardiograficzne serca (ocena frakcji wyrzutowej EF przed podaniem antracyklin).<br>4. RTG klatki piersiowej w poszukiwaniu poszerzenia śródpiersia (częste w T-ALL, ryzyko ucisku na tchawicę i SVC).",
    monitoring: "1. Monitorowanie diurezy i parametrów TLS (K+, fosforany, Ca2+, kwas moczowy, kreatynina) co 6-12 h w pierwszych dobach indukcji.<br>2. Ocena odpowiedzi na prednizon w 8. dobie terapii (liczba blastów we krwi obwodowej <1000/µl definiuje dobrą odpowiedź).<br>3. Kontrolne biopsje szpiku w 15. i 33. dobie celem oceny minimalnej choroby resztkowej (MRD – Minimal Residual Disease) metodą cytometrii lub NGS.<br>4. Ścisły reżim izolacji ochronnej i higieny w okresie neutropenii pokaleczeniowej."
  },
  lekQuestions: [
    {
      question: "Najczęstszym nowotworem złośliwym wieku dziecięcego jest:",
      options: [
        "Ostra białaczka limfoblastyczna (ALL)",
        "Guz Wilmsa (nephroblastoma)",
        "Nerwiak zarodkowy (neuroblastoma)",
        "Rdzeniak (medulloblastoma)",
        "Chłoniak Hodgkina"
      ],
      correct: 0,
      expl: "Ostra białaczka limfoblastyczna (ALL) jest najczęstszym nowotworem złośliwym u dzieci, stanowiąc około 25-30% wszystkich nowotworów dziecięcych oraz niemal 80% wszystkich białaczek u pacjentów pediatrycznych. Szczyt zachorowań przypada między 2. a 5. rokiem życia."
    },
    {
      question: "Do klasycznej triady objawów wynikających z wyparcia prawidłowej hematopoezy szpiku w przebiegu ostrej białaczki należą:",
      options: [
        "Niedokrwistość, małopłytkowość i neutropenia (gorączka/podatność na infekcje)",
        "Czerwienica, nadpłytkowość i leukocytoza",
        "Żółtaczka, wodobrzusze i świąd skóry",
        "Wole naczyniowe, wytrzeszcz i tachykardia",
        "Białkomocz, hipoalbuminemia i obrzęki"
      ],
      correct: 0,
      expl: "Zajęcie szpiku przez klon białaczkowy prowadzi do zahamowania wytwarzania prawidłowych linii komórkowych: spadek krwinek czerwonych daje anemię (bladość, męczliwość), spadek płytek daje skazę krwotoczną (wybroczyny, krwawienia), a spadek sprawnych granulocytów daje neutropenię i ciężkie zakażenia."
    },
    {
      question: "Zgodnie z kryteriami WHO minimalny odsetek blastów w szpiku kostnym upoważniający do rozpoznania ostrej białaczki wynosi:",
      options: [
        "20%",
        "5%",
        "10%",
        "50%",
        "80%"
      ],
      correct: 0,
      expl: "Zgodnie z klasyfikacją WHO kryterium rozpoznania ostrej białaczki (zarówno ALL, jak i AML) jest obecność co najmniej 20% komórek blastycznych w aspiracie szpiku kostnego lub we krwi obwodowej. (W rzadkich podtypach AML z określonymi mutacjami genetycznymi rozpoznanie można postawić przy niższym odsetku blastów)."
    },
    {
      question: "Który z poniższych czynników genetycznych wiąże się ze ZDECYDOWANIE KORZYSTNYM rokowaniem u dzieci z B-ALL?",
      options: [
        "Translokacja t(12;21) [gen fuzyjny ETV6-RUNX1] oraz hiperdiploidia (>50 chromosomów)",
        "Translokacja t(9;22) [chromosom Philadelphia, gen BCR-ABL1]",
        "Rearanżacja genu KMT2A (MLL) na chromosomie 11q23",
        "Hipodiploidia (<44 chromosomy)",
        "Translokacja t(4;11)"
      ],
      correct: 0,
      expl: "Translokacja t(12;21)(p13;q22) dająca transkrypt ETV6-RUNX1 (dawniej TEL-AML1) występuje u ok. 25% dzieci z B-ALL i wraz z hiperdiploidią (>50 chromosomów) stanowi najsilniejszy genetyczny wskaźnik doskonałego rokowania (wyleczalność >90%). Pozostałe wymienione wiążą się z rokowaniem niekorzystnym."
    },
    {
      question: "W laboratoryjnym zespole rozpadu guza (TLS) typowo obserwuje się następujące zaburzenia metaboliczne:",
      options: [
        "Hiperurykemię, hiperkaliemię, hiperfosfatemię oraz hipokalcemię",
        "Hipourikemię, hipokaliemię, hipofosfatemię oraz hiperkalcemię",
        "Hiperglikemię, hiponatremię, hiperkalcemię oraz hipokaliemię",
        "Kwasicę mleczanową z hipernatremią i hipourykemią",
        "Hiperkalcemię z podwyższeniem parathormonu"
      ],
      correct: 0,
      expl: "Rozpad komórek nowotworowych uwalnia ich zawartość wewnątrzkomórkową do krwiobiegu: kwasy nukleinowe metabolizowane są do kwasu moczowego (hiperurykemia), uwalnia się potas (hiperkaliemia) i fosforany (hiperfosfatemia). Nadmiar fosforanów wiąże wapń we krwi, prowadząc do wtórnej hipokalcemii."
    },
    {
      question: "Lekiem z wyboru w zapobieganiu i leczeniu ciężkiej hiperurykemii u pacjentów z wysokim ryzykiem zespołu rozpadu guza jest rekombinowana oksydaza moczanowa:",
      options: [
        "Rasburykaza",
        "Allopurynol",
        "Febuksostat",
        "Kolchicyna",
        "Probenecyd"
      ],
      correct: 0,
      expl: "Rasburykaza to rekombinowana oksydaza moczanowa, enzym fizjologicznie nieobecny u ludzi, który bezpośrednio enzymatycznie przekształca już obecny kwas moczowy w alantoinę – substancję 5-10 razy lepiej rozpuszczalną w wodzie i łatwo wydalaną przez nerki. Allopurynol jedynie hamuje powstawanie nowego kwasu moczowego."
    },
    {
      question: "Dlaczego u każdego dziecka z nowo rozpoznaną ALL rutynowo podaje się cytostatyki dokanałowo (i.t.) w punkcji lędźwiowej?",
      options: [
        "Ponieważ bariera krew-mózg chroni OUN przed większością leków podawanych dożylnie, co bez profilaktyki prowadziłoby do wznowy neurobiałaczki",
        "Ponieważ komórki białaczkowe powstają pierwotnie w komorach mózgowych",
        "Aby zapobiec zakażeniom bakteryjnym opon mózgowo-rdzeniowych",
        "W celu obniżenia podwyższonego ciśnienia tętniczego krwi",
        "Jest to wymagane wyłącznie u dzieci z objawami neurologicznymi"
      ],
      correct: 0,
      expl: "Ośrodkowy układ nerwowy stanowi farmakokinetyczne sanktuarium – większość leków chemioterapeutycznych nie przenika przez barierę krew-mózg w stężeniach terapeutycznych. Profilaktyczne dokanałowe podawanie metotreksatu (często z cytarabiną i hydrokortyzonem) zredukowało częstość wznów w OUN z ponad 50% do poniżej 3-5%."
    },
    {
      question: "Wskaż prawidłowe postępowanie w przypadku gorączki neutropenicznej (T > 38,5°C, ANC < 500/µl) u dziecka leczonego z powodu ALL:",
      options: [
        "Pobranie posiewów krwi (z wkłucia centralnego i obwodu) oraz natychmiastowe wdrożenie empirycznej dożylnej antybiotykoterapii o szerokim spektrum (np. cefepim lub piperacylina z tazobaktamem) w pierwszej godzinie",
        "Podanie leków przeciwgorączkowych i obserwacja przez 48 godzin do momentu uzyskania wyników badań bakteriologicznych",
        "Natychmiastowe przetoczenie 2 jednostek koncentratu krwinek białych",
        "Podanie pojedynczej dawki amoksycyliny doustnie i odesłanie do domu",
        "Wykonanie pilnej trepanobiopsji szpiku w celu oceny komórkowości"
      ],
      correct: 0,
      expl: "Gorączka neutropeniczna to stan bezpośredniego zagrożenia życia wymagający reguły 'złotej godziny': pobranie posiewów krwi i natychmiastowe dożylne włączenie bakteriobójczego antybiotyku przeciwko pałeczkom Gram-ujemnym (w tym Pseudomonas aeruginosa) oraz ziarniakom Gram-dodatnim."
    },
    {
      question: "Bóle kostne u dzieci z ostra białaczką limfoblastyczną charakteryzują się typowo:",
      options: [
        "Lokalizacją w kościach długich kończyn dolnych oraz wybudzaniem dziecka w nocy ze snu",
        "Występowaniem wyłącznie po intensywnym wysiłku fizycznym w ciągu dnia",
        "Ustępowaniem natychmiast po masażu i brakiem wpływu na chód",
        "Zajęciem wyłącznie małych stawów rąk z poranną sztywnością",
        "Brakiem jakiejkolwiek bolesności uciskowej kości"
      ],
      correct: 0,
      expl: "Bóle kostne w ALL wynikają z nacieczenia i ekspansji blastów w jamie szpikowej oraz podokostnowo. Są silne, głębokie, typowo wybudzają dziecko ze snu w nocy (w przeciwieństwie do łagodnych bólów wzrostowych) i często powodują utykanie lub całkowitą odmowę chodzenia."
    },
    {
      question: "Dobra odpowiedź na wstępne 7-dniowe leczenie prednizonem (tzw. prednizono-wrażliwość) w protokole ALL-BFM definiowana jest jako:",
      options: [
        "Liczba blastów we krwi obwodowej poniżej 1000/µl w 8. dobie leczenia",
        "Całkowity brak leukocytów we krwi obwodowej",
        "Wzrost liczby płytek krwi powyżej 200 tys./µl",
        "Ustąpienie hepatosplenomegalii w 24 godziny",
        "Ujemny wynik badania płynu mózgowo-rdzeniowego"
      ],
      correct: 0,
      expl: "W protokołach grupy BFM (Berlin-Frankfurt-Münster) preleczenie polega na 7 dniach podawania prednizonu z 1 dawką dokanałowego metotreksatu. Dobrą odpowiedź (Good Response) definiuje obecność mniej niż 1000 blastów w 1 µl krwi obwodowej w 8. dobie, co jest bardzo silnym korzystnym czynnikiem rokowniczym."
    },
    {
      question: "Przed rozpoczęciem chemioterapii zawierającej antracykliny (np. daunorubicynę lub doksorubicynę) u dziecka z ALL bezwzględnie należy wykonać:",
      options: [
        "Echokardiografię (ECHO serca) z oceną frakcji wyrzutowej lewej komory",
        "Scyntygrafię kośćca z technetem Tc-99m",
        "Kolonoskopię z biopsją błony śluzowej",
        "Próbę tuberkulinową lub test IGRA",
        "Elektromiografię (EMG) nerwów obwodowych"
      ],
      correct: 0,
      expl: "Antracykliny (daunorubicyna, doksorubicyna) wykazują udowodnioną zależną od dawki kardiotoksyczność (ostrą i przewlekłą kardiomiopatię rozstrzeniową). Wykonanie badania echokardiograficznego (ECHO) i ocena frakcji wyrzutowej (LVEF/FS) przed leczeniem oraz regularnie w trakcie terapii jest obligatoryjnym standardem."
    }
  ],
  flashcards: [
    {
      front: "Jaki jest najczęstszy nowotwór złośliwy u dzieci i w jakim wieku występuje szczyt zachorowań?",
      back: "Ostra białaczka limfoblastyczna (ALL), stanowiąca ok. 75-80% białaczek i 25-30% nowotworów dziecięcych. Szczyt zachorowań przypada między 2. a 5. rokiem życia."
    },
    {
      front: "Wymień triadę objawów wynikających z wyparcia szpiku w ostrej białaczce u dziecka.",
      back: "1. Niedokrwistość (bladość, apatia, osłabienie)\n2. Małopłytkowość (skaza krwotoczna: wybroczyny, siniaki, krwawienia z dziąseł/nosa)\n3. Neutropenia (gorączka, podatność na ciężkie zakażenia bakteryjne i grzybicze)."
    },
    {
      front: "Jakie jest kryterium rozpoznania ostrej białaczki w badaniu cytologicznym szpiku kostnego wg WHO?",
      back: "Obecność co najmniej 20% komórek blastycznych (blastów) w aspiracie szpiku kostnego (lub we krwi obwodowej)."
    },
    {
      front: "Czym jest zespół rozpadu guza (TLS) i jakich 4 zaburzeń metabolicznych w nim poszukujemy?",
      back: "Zagrażający życiu stan wynikający z masywnej lizy komórek nowotworowych. Triada 'hiper' + 1 'hipo': Hiperurykemia, Hiperkaliemia, Hiperfosfatemia oraz wtórna Hipokalcemia."
    },
    {
      front: "Jaka aberracja genetyczna w dziecięcej B-ALL jest najczęstsza i wiąże się z bardzo dobrym rokowaniem?",
      back: "Translokacja t(12;21)(p13;q22) tworząca gen fuzyjny ETV6-RUNX1 (dawniej TEL-AML1) – występuje u ok. 25% dzieci z B-ALL; wskaźnik wyleczeń przekracza 90%."
    },
    {
      front: "Jakie jest postępowanie w 'złotej godzinie' w gorączce neutropenicznej u dziecka z ALL?",
      back: "Pobranie posiewów krwi (z wkłucia centralnego i obwodu) i natychmiastowe podanie dożylne bakteriobójczego antybiotyku przeciwko Pseudomonas i pałeczkom jelitowym (np. cefepim lub piperacylina z tazobaktamem)."
    }
  ]
};

// Mirror fields for schema compatibility
case122.steps.forEach(step => {
  step.question = step.title;
  step.explanation = step.feedback;
});
case122.lekQuestions.forEach(q => {
  q.opts = q.options;
  q.correctIdx = q.correct;
  q.exp = q.expl;
});

saveCase(case122);

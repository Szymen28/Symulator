const fs = require('fs');
const path = require('path');
const { encryptStringAes } = require('./encrypt_case.js');

const MASTER_KEY = '@LEKSzymon28111999';
const CASES_DIR = path.join(__dirname, '..', 'cases');

console.log("Generating Case 125: Choroba Kawasakiego...");

async function saveCase(caseData) {
  const filePath = path.join(CASES_DIR, caseData.filename);
  const jsonStr = JSON.stringify(caseData, null, 2);
  const encrypted = await encryptStringAes(jsonStr, MASTER_KEY);
  fs.writeFileSync(filePath, JSON.stringify(encrypted, null, 2), 'utf8');
  console.log(`[SAVED] Case #${caseData.id}: ${caseData.filename} (LEK Qs: ${caseData.lekQuestions.length}, Steps: ${caseData.steps.length}, Flashcards: ${caseData.flashcards.length})`);
}

const case125 = {
  id: 125,
  filename: "125_choroba_kawasakiego.json",
  dept: "Pediatria",
  shortTitle: "2-letni Filipek – Gorączka od 6 dni, malinowy język, przekrwione spojówki i obrzęk rąk (Choroba Kawasakiego)",
  diagnosisTitle: "Choroba Kawasakiego (Kawasaki Disease / Zespół węzłowo-śluzówkowo-skórny) w ostrej fazie zapalenia naczyń z dylatacją tętnic wieńcowych",
  vitals: [
    { label: "Temperatura ciała", val: "39,4 °C", sub: "Gorączka septyczna trwająca 6. dobę bez odpowiedzi na antybiotyk", status: "vital-crit" },
    { label: "Częstość akcji serca (HR)", val: "148/min", sub: "Wyraźna tachykardia (zapalenie mięśnia sercowego)", status: "vital-warn" },
    { label: "Białko C-reaktywne (CRP)", val: "142 mg/l", sub: "Ekstremalnie wysoki odczyn zapalny", status: "vital-crit" },
    { label: "Płytki krwi (PLT)", val: "490 tys./µl", sub: "Narastająca trombocytoza ostrej fazy", status: "vital-warn" }
  ],
  vitalsObj: { hr: 148, bp: "96/58", spo2: 98, rr: 28, temp: 39.4, gcs: 15 },
  story: `<p><strong>Pacjent:</strong> 2-letni Filipek (masa ciała 13 kg) został pilnie skierowany na oddział pediatryczny z podejrzeniem posocznicy, mononukleozy lub odry z powodu utrzymującej się od 6 dni wysokiej gorączki (do 39,5°C), która nie ustępuje mimo włączonej 3 dni wcześniej przez lekarza POZ amoksycyliny z kwasem klawulanowym.</p><p><strong>Wywiad chorobowy:</strong> Choroba rozpoczęła się 6 dni temu nagłym skokiem temperatury do 39,8°C z dreszczami i skrajną drażliwością chłopca. Dziecko jest płaczliwe, marudne, nie pozwala się dotknąć. W 2. dobie dołączyło intensywne zaczerwienienie białkówek obu oczu bez jakiejkolwiek ropnej wydzieliny. W 3. dobie wargi chłopca stały się spierzchnięte, pękające i krwawiące, a język przybrał żywoczerwony kolor z widocznymi powiększonymi brodawkami. Dwa dni temu na tułowiu i w okolicy pachwinowej pojawiła się zlewająca się, czerwona wysypka plamisto-grudkowa. Jednocześnie rodzice zauważyli, że dłonie i stópki dziecka stały się żywoczerwone i tak obrzęknięte, że chłopiec płacze przy próbie założenia bucików i odmawia stawania na nóżkach. Po lewej stronie szyi wyczuli twardy, powiększony 'guz'. Antybiotyk doustny nie przyniósł najmniejszej poprawy.</p><p><strong>Badanie przedmiotowe na oddziale:</strong> Dziecko w stanie ogólnym średnio-ciężkim, skrajnie rozdrażnione, płaczliwe. Na skórze tułowia, pośladków i szczególnie w okolicy pieluszkowej obecna polimorficzna (wielopostaciowa), zlewająca się wysypka plamisto-grudkowa i rumieniowa, bez pęcherzyków. Oczy: obustronne, bardzo intensywne przekrwienie naczyń spojówek gałkowych, całkowicie bezwysiękowe (suche spojówki, brak ropy) z charakterystycznym oszczędzeniem rąbka rogówki (limbal sparing). Jama ustna: wargi suche, pękające, krwawiące, pokryte strupami; błona śluzowa gardła żywoczerwona; obecny klasyczny 'język malinowy' (truskawkowy) z wydatnymi, obrzękniętymi brodawkami grzybowatymi. Szyja: po stronie lewej obecny pojedynczy, twardo-elastyczny, słabo bolesny węzeł chłonny o wymiarach 2,5 x 2,0 cm (po stronie prawej węzły niepowiększone). Kończyny: symetryczny, twardy, bolesny obrzęk grzbietów dłoni i stóp z intensywnym rumieniem podeszwowym i dłoniowym; ruchomość palców ograniczona bólowo. Klatka piersiowa: tachykardia 148/min, cichy szmer skurczowy nad koniuszkiem, tony serca głuche (podejrzenie zapalenia mięśnia sercowego / myocarditis). Brzuch miękki, wątroba wystaje 1,5 cm spod łuku. Narządy moczowo-płciowe: silny rumień w rowku zażołędnym i skórze krocza. Objawy oponowe ujemne.</p>`,
  labs: {
    "Wskaźniki zapalne i hemostaza": [
      { name: "CRP (białko C-reaktywne)", val: "142,0 mg/l", norm: "< 5,0 mg/l", flag: "CRIT_HIGH" },
      { name: "Odczyn Biernackiego (OB)", val: "98 mm/h", norm: "< 15 mm/h", flag: "CRIT_HIGH" },
      { name: "Prokalcytonina (PCT)", val: "0,85 ng/ml", norm: "< 0,5 ng/ml", flag: "HIGH" },
      { name: "Leukocyty (WBC)", val: "19,8 tys./µl", norm: "5,0 - 12,0 tys./µl", flag: "CRIT_HIGH" },
      { name: "Granulocyty obojętnochłonne (NEUT)", val: "78 % (15,4 tys./µl)", norm: "35 - 55 %", flag: "CRIT_HIGH" },
      { name: "Hemoglobina (Hb)", val: "9,8 g/dl", norm: "11,5 - 14,0 g/dl", flag: "LOW" },
      { name: "Płytki krwi (PLT - 6. doba)", val: "490 tys./µl", norm: "150 - 450 tys./µl", flag: "HIGH" }
    ],
    "Biochemia wątrobowa i białka": [
      { name: "Albumina w surowicy", val: "2,8 g/dl (28 g/l)", norm: "3,5 - 5,0 g/dl", flag: "CRIT_LOW" },
      { name: "Aminotransferaza alaninowa (ALT)", val: "118 U/l", norm: "< 35 U/l", flag: "CRIT_HIGH" },
      { name: "Aminotransferaza asparaginianowa (AST)", val: "84 U/l", norm: "< 40 U/l", flag: "HIGH" },
      { name: "GGTP", val: "72 U/l", norm: "< 25 U/l", flag: "HIGH" },
      { name: "Bilirubina całkowita", val: "1,1 mg/dl", norm: "< 1,0 mg/dl", flag: "NORMAL" },
      { name: "Sód (Na+)", val: "131 mmol/l", norm: "135 - 145 mmol/l", flag: "LOW" }
    ],
    "Badanie ogólne moczu": [
      { name: "Leukocyty w osadzie", val: "25-35 wpw (jałowy ropomocz)", norm: "0 - 4 wpw", flag: "CRIT_HIGH" },
      { name: "Bakterie w osadzie", val: "Nieobecne (posiew moczu ujemny)", norm: "Nieobecne", flag: "NORMAL" },
      { name: "Białko w moczu", val: "Ślad", norm: "Nieobecne", flag: "NORMAL" }
    ]
  },
  steps: [
    {
      title: "Krok 1: Weryfikacja kryteriów klinicznych choroby Kawasakiego",
      text: "Filipek gorączkuje od 6 dni (>39°C). W badaniu stwierdzasz: bezwysiękowe zapalenie spojówek, malinowy język z pękającymi wargami, rumień i obrzęk rąk i stóp, polimorficzną wysypkę oraz jednostronny węzeł chłonny szyjny 2,5 cm. Czy pacjent spełnia kryteria klasycznej choroby Kawasakiego?",
      options: [
        "Tak, spełnia kryteria w 100%: gorączka >=5 dni oraz obecność wszystkich 5 z 5 głównych kryteriów klinicznych",
        "Nie, ponieważ płytki krwi są podwyższone, a w chorobie Kawasakiego płytki muszą wynosić <100 tys./µl",
        "Nie, brak ropnego wysięku ze spojówek wyklucza chorobę Kawasakiego",
        "Nie, u 2-latka nie rozpoznaje się choroby Kawasakiego, występuje ona wyłącznie u dorosłych"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Chłopiec idealnie spełnia kryteria klasycznej choroby Kawasakiego:</strong> gorączka trwająca co najmniej 5 dni ORAZ obecność co najmniej 4 z 5 cech (tutaj obecne wszystkie 5!): 1. Obustronne bezwysiękowe przekrwienie spojówek, 2. Zmiany na śluzówkach jamy ustnej (malinowy język, spierzchnięte wargi), 3. Zmiany na dystalnych częściach kończyn (obrzęk i rumień dłoni/stóp), 4. Polimorficzna wysypka, 5. Jednostronna limfadenopatia szyjna (>1,5 cm).",
        "❌ BŁĄD! <strong>W chorobie Kawasakiego występuje trombocytoza (wysokie PLT, w 2-3 tyg. często >600-1000 tys./µl),</strong> a nie małopłytkowość!",
        "❌ BŁĄD! <strong>Przekrwienie spojówek w chorobie Kawasakiego jest z definicji BEZWYSIĘKOWE (suche spojówki);</strong> obecność ropy przemawiałaby przeciwko KD.",
        "❌ BŁĄD! <strong>Ponad 80% przypadków choroby Kawasakiego dotyczy dzieci poniżej 5. roku życia</strong> ze szczytem w 1-2 roku życia."
      ]
    },
    {
      title: "Krok 2: Badanie echokardiograficzne serca – poszukiwanie powikłań wieńcowych",
      text: "Co jest najgroźniejszym powikłaniem choroby Kawasakiego decydującym o rokowaniu i jakie badanie należy pilnie wykonać?",
      options: [
        "Tętniaki tętnic wieńcowych (CAA) z ryzykiem zakrzepicy, zawału serca i nagłego zgonu; pilne wykonanie echokardiografii przezklatkowej (ECHO serca)",
        "Pęknięcie tętniaka aorty wstępującej; pilna angiografia tętnic nerkowych",
        "Wrodzone zwężenie zastawki aortalnej; cewnikowanie jam serca",
        "Zatorowość tętnic płucnych; pilna scyntygrafia wentylacyjno-perfuzyjna"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Choroba Kawasakiego ma szczególny tropizm do tętnic wieńcowych.</strong> Bez leczenia u 25% dzieci rozwijają się tętniaki tętnic wieńcowych (Coronary Artery Aneurysms - CAA). Badaniem z wyboru jest echokardiografia (ECHO serca) z pomiarem wymiarów pnia lewej tętnicy wieńcowej, LAD i RCA z przeliczeniem na standaryzowany wskaźnik Z-score.",
        "❌ BŁĄD! <strong>Choroba Kawasakiego zajmuje głównie tętnice średniego kalibru (zwłaszcza wieńcowe),</strong> rzadko dochodzi do izolowanego pęknięcia aorty.",
        "❌ BŁĄD! <strong>Wada zastawkowa nie jest przyczyną objawów;</strong> choroba Kawasakiego to ostre zapalenie naczyń.",
        "❌ BŁĄD! <strong>ECHO serca jest badaniem pierwszego wyboru,</strong> a nie scyntygrafia płuc."
      ]
    },
    {
      title: "Krok 3: Okno czasowe i leczenie pierwszego rzutu",
      text: "Filipek jest w 6. dobie gorączki. Jaki jest 'złoty standard' terapii pierwszego rzutu w chorobie Kawasakiego i dlaczego kluczowe jest podanie go przed 10. dobą choroby?",
      options: [
        "Immunoglobuliny dożylne (IVIG 2 g/kg) w pojedynczym wlewie + Kwas acetylosalicylowy (ASA w dawce przeciwzapalnej 30-50 mg/kg/d); podanie przed 10. dobą zmniejsza ryzyko tętniaków wieńcowych z 25% do <3-5%",
        "Amoksycylina z kwasem klawulanowym dożylnie przez 14 dni",
        "Glikokortykosteroidy w monoterapii doustnej (prednizon 0,5 mg/kg) bez aspiryny",
        "Paracetamol w czopkach i wypisanie do domu do czasu złuszczenia naskórka"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Standardem leczenia pierwszego rzutu choroby Kawasakiego jest dożylny wlew immunoglobulin (<span class='dose-pill'>IVIG 2 g/kg m.c. w pojedynczej dawce wlewanej przez 10-12 h</span>) skojarzony z kwasem acetylosalicylowym (<span class='dose-pill'>ASA 30-50 mg/kg/d p.o.</span> w Europie/Polsce).</strong> Wdrożenie IVIG w ciągu pierwszych 10 dni (optymalnie do 7. doby) radykalnie redukuje ryzyko rozwoju tętniaków wieńcowych z 20-25% do poniżej 3-5%!",
        "❌ BŁĄD! <strong>Antybiotyki są całkowicie nieskuteczne –</strong> choroba Kawasakiego nie jest zakażeniem bakteryjnym.",
        "❌ BŁĄD! <strong>GKS w monoterapii w ostrej fazie KD historycznie wiązały się z większym ryzykiem tętniaków;</strong> sterydy stosuje się w skojarzeniu z IVIG u pacjentów wysokiego ryzyka oporności.",
        "❌ BŁĄD! <strong>Pozostawienie dziecka bez leczenia skazuje je na 25% ryzyko wytworzenia tętniaków i zawału serca!</strong>"
      ]
    },
    {
      title: "Krok 4: Dawkowanie i etapy stosowania kwasu acetylosalicylowego (ASA)",
      text: "Jak wygląda prawidłowy schemat leczenia kwasem acetylosalicylowym (ASA) w chorobie Kawasakiego w fazie ostrej i podostrej?",
      options: [
        "Faza ostra (przeciwzapalna): ASA 30-50 mg/kg/d p.o. w 4 dawkach do 48 h po ustąpieniu gorączki; następnie faza podostra (przeciwpłytkowa): ASA 3-5 mg/kg/d p.o. raz na dobę przez 6-8 tygodni (lub dłużej przy obecności tętniaków)",
        "ASA 100 mg jednorazowo w 1. dobie i całkowite odstawienie po 24 godzinach",
        "ASA podaje się dożylnie w dawce 500 mg/kg przez 30 dni",
        "ASA jest bezwzględnie przeciwwskazany w chorobie Kawasakiego z powodu zespołu Reye'a"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Choroba Kawasakiego to jeden z nielicznych bezwzględnych wyjątków w pediatrii, gdzie stosuje się kwas acetylosalicylowy (ASA)!</strong> W fazie ostrej stosuje się dawkę przeciwzapalną (<span class='dose-pill'>ASA 30-50 mg/kg/d w 4 dawkach</span>). Po 48 godzinach od ustąpienia gorączki dawkę redukuje się do małej dawki przeciwpłytkowej (<span class='dose-pill'>ASA 3-5 mg/kg/d raz na dobę</span>), którą kontynuuje się przez 6-8 tygodni od początku choroby (do czasu normalizacji PLT, OB i obrazu ECHO tętnic wieńcowych).",
        "❌ BŁĄD! <strong>Jednorazowa dawka jest nieskuteczna;</strong> faza podostra wymaga ochrony antyagregacyjnej ze względu na potężną trombocytozę.",
        "❌ BŁĄD! <strong>Dawka 500 mg/kg to śmiertelne zatrucie salicylanami.</strong>",
        "❌ BŁĄD! <strong>Mimo ryzyka zespołu Reye'a, w chorobie Kawasakiego korzyści z ochrony tętnic wieńcowych przewyższają ryzyko;</strong> zaleca się szczepienie przeciw grypie i ospie wietrznej w trakcie terapii ASA."
      ]
    },
    {
      title: "Krok 5: Interpretacja badania ECHO i klasyfikacja tętniaków (Z-score)",
      text: "W kontrolnym badaniu echokardiograficznym stwierdzono poszerzenie lewej tętnicy wieńcowej (LAD) ze standaryzowanym wskaźnikiem wymiaru Z-score = +6,2 (średnica 4,8 mm). Do jakiej kategorii tętniaków kwalifikuje się ta zmiana wg wytycznych AHA?",
      options: [
        "Średni tętniak tętnicy wieńcowej (Z-score od 5 do <10 i średnica <8 mm)",
        "Prawidłowe naczynie wieńcowe (Z-score < 2)",
        "Łagodna dylatacja / poszerzenie (Z-score 2 do <2,5)",
        "Olbrzymi tętniak wieńcowy (Giant aneurysm, Z-score >= 10 lub średnica >= 8 mm)"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Zgodnie z klasyfikacją AHA opartą na wskaźniku Z-score:</strong><br>- Z-score < 2: norma,<br>- Z-score 2 do <2,5: dylatacja,<br>- Z-score 2,5 do <5: mały tętniak,<br>- Z-score 5 do <10 (i średnica bezwzględna <8 mm): <strong>średni tętniak</strong>,<br>- Z-score >= 10 lub wymiar bezwzględny >= 8 mm: <strong>olbrzymi tętniak (giant aneurysm)</strong>, obarczony najwyższym ryzykiem pęknięcia, zakrzepicy i zawału.",
        "❌ BŁĄD! <strong>Z-score 6,2 jednoznacznie przekracza normę i definiuje tętniaka.</strong>",
        "❌ BŁĄD! <strong>Dylatacja to Z-score 2 do <2,5;</strong> przy Z-score 6,2 mamy już średni tętniak.",
        "❌ BŁĄD! <strong>Tętniak olbrzymi to Z-score >=10 lub średnica >=8 mm.</strong>"
      ]
    },
    {
      title: "Krok 6: Postępowanie w oporności na IVIG (IVIG-resistance)",
      text: "36 godzin po zakończeniu wlewu IVIG u Filipka temperatura ponownie wzrasta do 39,1°C, a CRP wynosi 110 mg/l. Stan ten definiuje oporność na IVIG (występuje u ok. 10-20% chorych). Jaki jest zalecany kolejny krok terapeutyczny?",
      options: [
        "Podanie drugiego wlewu IVIG w pełnej dawce (2 g/kg) LUB pulsy dożylne metyloprednizolonu (30 mg/kg/d przez 3 dni) / infliksymab",
        "Włączenie ciprofloksacyny i metronidazolu doustnie",
        "Wykonanie pilnego pomostowania aortalno-wieńcowego (CABG) w ostrej fazie",
        "Natychmiastowe odstawienie aspiryny i podanie heparyny niefrakcjonowanej w pompie"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Oporność na IVIG definiuje się jako przetrwałą lub nawracającą gorączkę po 36 godzinach od zakończenia pierwszego wlewu IVIG.</strong> Postępowaniem z wyboru jest: podanie drugiego wlewu <span class='dose-pill'>IVIG 2 g/kg i.v.</span> LUB włączenie glikokortykosteroidów w postaci pulsów (<span class='dose-pill'>Metyloprednizolon 30 mg/kg/dobę i.v. przez 3 kolejne dni</span>) LUB zastosowanie inhibitora TNF-alfa (<span class='dose-pill'>Infliksymab 5 mg/kg i.v.</span>).",
        "❌ BŁĄD! <strong>Antybiotyki nie działają w jałowym immunologicznym zapaleniu naczyń.</strong>",
        "❌ BŁĄD! <strong>Operacja kardiochirurgiczna (CABG) w ostrym zapaleniu jest przeciwwskazana</strong> (kruche, zmienione zapalnie naczynia); CABG rozważa się jedynie w przewlekłych powikłaniach niedokrwiennych.",
        "❌ BŁĄD! <strong>Aspiryna musi być kontynuowana;</strong> odstawienie jej zwiększa ryzyko zakrzepicy."
      ]
    },
    {
      title: "Krok 7: Zmiany skórne w fazie podostrej (2-3. tydzień choroby)",
      text: "W 14. dobie choroby gorączka całkowicie ustąpiła, Filip czuje się dobrze. Rodzice zgłaszają, że z opuszek palców rąk i nóg wokół paznokci 'płatami schodzi skóra'. Jakie jest znaczenie kliniczne tego objawu?",
      options: [
        "Jest to klasyczne, patognomoniczne dla fazy podostrej choroby Kawasakiego płatowe łuszczenie naskórka wokół paznokci (periungual desquamation), potwierdzające rozpoznanie i niewymagające leczenia",
        "Jest to grzybica paznokci wywołana przez Candida albicans, wymagająca flukonazolu",
        "Świadczy o toksycznej nekrolizie naskórka (zespół Lyella) wywołanej aspiryną",
        "Jest to objaw ostrej niewydolności tętniczej wymagający amputacji palców"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Okołopaznokciowe płatowe łuszczenie naskórka (periungual desquamation) rozpoczynające się w 2-3. tygodniu choroby od opuszek palców dłoni i stóp</strong> jest klasycznym, zejściowym objawem choroby Kawasakiego. Potwierdza trafność rozpoznania nawet w przypadkach wątpliwych retrospektywnie i ustępuje samoistnie bez bliznowacenia.",
        "❌ BŁĄD! <strong>Nie jest to infekcja grzybicza;</strong> to fizjologiczne złuszczanie naskórka po ostrym rumieniu i obrzęku.",
        "❌ BŁĄD! <strong>Zespół Lyella przebiega z tworzeniem wiotkich pęcherzy i spełzaniem naskórka (objaw Nikolskiego) na dużych powierzchniach ciała,</strong> a nie łuszczeniem okołopaznokciowym.",
        "❌ BŁĄD! <strong>Nie ma martwicy ani krytycznego niedokrwienia;</strong> amputacja byłaby błędem w sztuce."
      ]
    },
    {
      title: "Krok 8: Długoterminowa opieka kardiologiczna i szczepienia ochronne",
      text: "Filipek ma średniego tętniaka LAD (Z-score 6,2) i przyjmuje kwas acetylosalicylowy. Jakie są bezwzględne zalecenia dotyczące szczepień ochronnych po podaniu wysokiej dawki immunoglobulin (IVIG) oraz profilaktyki infekcji przy terapii ASA?",
      options: [
        "Szczepienia żywymi szczepionkami (odra, świnka, różyczka – MMR oraz ospa wietrzna) należy odroczyć o co najmniej 11 miesięcy od wlewu IVIG; ze względu na terapię ASA bezwzględnie zalecane jest coroczne szczepienie przeciwko grypie",
        "Wszystkie szczepienia należy wykonać podwójną dawką w 7. dobie po wypisie ze szpitala",
        "Dziecko ma dożywotnie przeciwwskazanie do jakichkolwiek szczepień ochronnych",
        "Należy natychmiast podać szczepionkę przeciw ospie wietrznej w trakcie leczenia pełną dawką ASA"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Po podaniu IVIG w dawce 2 g/kg krążące przeciwciała dawców neutralizują żywe atenuowane wirusy szczepionkowe – dlatego szczepienia żywe (MMR, ospa wietrzna) należy odroczyć o 11 miesięcy!</strong> Z kolei u dziecka przewlekle przyjmującego ASA zakażenie wirusem grypy lub ospy wietrznej stwarza ryzyko śmiertelnego zespołu Reye'a, dlatego <strong>coroczne inaktywowane szczepienie przeciw grypie jest bezwzględnie zalecane</strong> u każdego pacjenta na aspirynie.",
        "❌ BŁĄD! <strong>Szczepienie żywymi szczepionkami tuż po IVIG da brak odpowiedzi immunologicznej</strong> (przeciwciała z IVIG zneutralizują antygen szczepionkowy).",
        "❌ BŁĄD! <strong>Szczepienia inaktywowane (np. błonica, tężec, krztusiec, pneumokoki) mogą być podawane zgodnie z kalendarzem,</strong> a żywe są jedynie odroczone o 11 miesięcy.",
        "❌ BŁĄD! <strong>Podanie żywej szczepionki przeciw ospie w trakcie przyjmowania aspiryny jest przeciwwskazane</strong> ze względu na ryzyko zespołu Reye'a."
      ]
    }
  ],
  pathoNodes: [
    {
      badge: "Zapalenie śródbłonka",
      title: "Wniknięcie antygenu i aktywacja makrofagów",
      short: "Wyrzut IL-1, TNF-alfa i IL-6 w ścianie tętnic",
      detail: "Nieznany antygen (prawdopodobnie wrotami są drogi oddechowe) stymuluje monocyty i limfocyty T w ścianie tętnic średniego kalibru. Masywny wyrzut cytokin prozapalnych wywołuje uszkodzenie komórek śródbłonka i wysoką gorączkę septyczną.",
      target: "Śródbłonek tętnic średnich i receptory cytokin",
      drugTarget: "<span class='dose-pill'>IVIG 2 g/kg i.v. w pojedynczym wlewie 10-12 h</span> neutralizacja cytokin i blokada FcR"
    },
    {
      badge: "Destrukcja sprężysta",
      title: "Rozpad błony sprężystej wewnętrznej (IEL)",
      short: "Infiltracja neutrofilów i metaloproteinaz (MMP-9)",
      detail: "W ostrej fazie dochodzi do martwicy komórek mięśniowych gładkich i fragmentacji wewnętrznej blaszki sprężystej tętnic wieńcowych. Ściana naczynia traci integralność strukturalną pod wpływem ciśnienia hydrostatycznego krwi.",
      target: "Blaszka sprężysta wewnętrzna tętnic wieńcowych",
      drugTarget: "<span class='dose-pill'>Kwas acetylosalicylowy 30-50 mg/kg/d p.o.</span> hamowanie syntezy COX i prostaglandyn"
    },
    {
      badge: "Tętniaki i remodelowanie",
      title: "Poszerzenie tętniakowate tętnic wieńcowych (CAA)",
      short: "Osłabienie ściany i ektazja naczynia (Z-score >=2,5)",
      detail: "Brak elastyny i włókien kolagenowych prowadzi do miejscowego rozszerzenia światła naczynia. W tętniakach przepływ krwi staje się turbulentny, a śródbłonek ulega owrzodzeniu, tworząc idealne warunki do zakrzepicy.",
      target: "Pień lewej tętnicy wieńcowej, LAD i RCA",
      drugTarget: "<span class='dose-pill'>ECHO serca i pomiar Z-score</span> wczesna identyfikacja poszerzenia naczynia"
    },
    {
      badge: "Trombofilia i zawał",
      title: "Reaktywna trombocytoza i zakrzepica wewnątrznaczyniowa",
      short: "Wzrost płytek krwi w fazie podostrej (PLT >600-1000 tys.)",
      detail: "W 2-3. tygodniu pod wpływem trombopoetyny i IL-6 liczba płytek krwi gwałtownie rośnie. Nadpłytkowość w połączeniu ze spowolnieniem przepływu w świetle tętniaka grozi okluzją naczynia i zawałem serca.",
      target: "Płytki krwi i kaskada krzepnięcia w tętniaku",
      drugTarget: "<span class='dose-pill'>ASA 3-5 mg/kg/d p.o.</span> niska dawka antyagregacyjna przez 6-8 tygodni"
    }
  ],
  diffTable: {
    title: "⚔️ Tabela Różnicowa: Choroba Kawasakiego vs Inne ostre stany gorączkowe z wysypką u dzieci",
    headers: ["Cecha kliniczna", "Choroba Kawasakiego", "Płonica (Szkarlatyna)", "Odra (Morbilli)", "Zespół Stevensa-Johnsona (SJS)", "PIMS-TS / MIS-C (post-COVID)"],
    rows: [
      ["Czas trwania gorączki", "Przetrwała >=5 dni (często 7-14 dni), słabo reaguje na leki", "Krótka, gwałtowny początek, ustępuje po 24-48 h penicyliny", "Wysoka gorączka 4-5 dni z nasileniem w czasie wysypki", "Gorączka towarzysząca spełzaniu naskórka i nadżerkom", "Wysoka gorączka >=3-5 dni, 2-6 tyg. po zakażeniu SARS-CoV-2"],
      ["Zajęcie spojówek", "Bezwysiękowe (suche) przekrwienie z oszczędzeniem rąbka rogówki", "Brak zapalenia spojówek", "Nasilone ropne zapalenie spojówek ze światłowstrętem", "Ciężkie zapalenie spojówek z nadżerkami i zrostami", "Częste bezwysiękowe zapalenie spojówek"],
      ["Błony śluzowe jamy ustnej", "Malinowy język, suche pękające wargi, brak nalotów na migdałkach", "Malinowy język po ustąpieniu białego nalotu, zapalenie migdałków", "Plamki Koplika na błonie śluzowej policzków, nieżyt gardła", "Masywne bolesne nadżerki i krwawiące strupy na wargach", "Czerwone wargi, cechy zapalenia jamy ustnej"],
      ["Zmiany na kończynach", "Rumień i bolesny twardy obrzęk rąk/stóp; złuszczanie w 2-3 tyg.", "Drobno-plamista wysypka; łuszczenie drobnopłatowe w 2. tyg.", "Wysypka zstępująca od głowy ku dołowi, brak obrzęku stóp", "Zlewne rumienie, wiotkie pęcherze z objawem Nikolskiego", "Obrzęki obwodowe rąk i stóp, hipotensja, wstrząs kardiogenny"],
      ["Płytki krwi (PLT)", "Norma/wysokie w fazie ostrej, olbrzymia trombocytoza w 2-3 tyg.", "Prawidłowa liczba płytek krwi", "Często leukopenia i małopłytkowość", "Liczba płytek prawidłowa lub nieznacznie obniżona", "Często małopłytkowość i limfopenia, skrajny wzrost ferrytyny"],
      ["Leczenie pierwszego rzutu", "IVIG 2 g/kg w pojedynczym wlewie + ASA 30-50 mg/kg/d", "Penicylina V doustnie przez 10 dni", "Leczenie objawowe, witamina A w dużych dawkach", "Odstawienie leku, intensywna terapia oparzeniowa, IVIG/GKS", "IVIG + Metyloprednizolon dożylnie + heparyna drobnocząsteczkowa"]
    ]
  },
  dutySummary: {
    overview: "Choroba Kawasakiego (zespół węzłowo-śluzówkowo-skórny) to ostre układowe zapalenie średnich naczyń tętniczych, będące najczęstszą przyczyną nabytej wady serca u dzieci w krajach rozwiniętych (>80% chorych to dzieci <5 r.ż.). Kluczowym celem terapii jest zapobieżenie powikłaniom wieńcowym (tętniakom tętnic wieńcowych – CAA), co wymaga wdrożenia leczenia IVIG i ASA w ciągu pierwszych 10 dni od wystąpienia gorączki.",
    diagnostics: "1. Ocena kryteriów klinicznych AHA: gorączka >= 5 dni + co najmniej 4 z 5 cech (spojówki bez wysięku, malinowy język/suche wargi, obrzęk/rumień rąk i stóp, polimorficzna wysypka, jednostronny węzeł szyjny >1,5 cm).<br>2. Pilna echokardiografia przezklatkowa (ECHO serca) – ocena wymiarów pnia lewej tętnicy wieńcowej (LMCA), gałęzi międzykomorowej przedniej (LAD) i prawej tętnicy wieńcowej (RCA) z obliczeniem Z-score.<br>3. Wskaźniki zapalne: CRP, OB (skrajnie wysokie), morfologia krwi (leukocytoza neutrofilowa, niedokrwistość normocytowa, narastająca trombocytoza).<br>4. Biochemia: próby wątrobowe (wzrost ALT/AST), albumina (hipoalbuminemia jako czynnik ciężkości), badanie ogólne moczu (jałowy ropomocz z cewki).<br>5. EKG: cechy zapalenia mięśnia sercowego (tachykardia, wydłużenie PR, spłaszczenie T, zaburzenia rytmu).",
    drugsAndDoses: "1. Immunoglobuliny dożylne (IVIG): <span class='dose-pill'>IVIG 2 g/kg m.c. i.v. w pojedynczym wlewie przez 10-12 h</span> w pierwszych 10 dniach choroby.<br>2. Kwas acetylosalicylowy (ASA) – faza ostra przeciwzapalna: <span class='dose-pill'>ASA 30-50 mg/kg/dobę p.o. w 4 dawkach</span> do 48 h po ustąpieniu gorączki.<br>3. Kwas acetylosalicylowy (ASA) – faza podostra przeciwpłytkowa: <span class='dose-pill'>ASA 3-5 mg/kg/dobę p.o. raz na dobę</span> przez 6-8 tygodni od początku choroby (lub bezterminowo przy obecności tętniaków).<br>4. Oporność na IVIG (gorączka po 36 h): drugi wlew <span class='dose-pill'>IVIG 2 g/kg i.v.</span> LUB pulsy <span class='dose-pill'>Metyloprednizolonu 30 mg/kg/dobę i.v. przez 3 dni</span> LUB <span class='dose-pill'>Infliksymab 5 mg/kg i.v.</span>.<br>5. Tętniaki olbrzymie (Z-score >=10 lub >8 mm): podwójna terapia antykoagulacyjno-przeciwpłytkowa – <span class='dose-pill'>ASA 3-5 mg/kg/d</span> + <span class='dose-pill'>Enoksaparyna s.c. (LMWH)</span> lub warfaryna (cel INR 2,0-3,0).",
    procedures: "1. Monitorowanie hemodynamiczne i EKG podczas wlewu IVIG (ryzyko wstrząsu anafilaktycznego i przeciążenia objętościowego).<br>2. Seryjne badania echokardiograficzne: w chwili rozpoznania, po 1-2 tygodniach, oraz po 6-8 tygodniach od zachorowania.<br>3. Ochrona przed zespołem Reye'a: bezwzględne zalecenie corocznego inaktywowanego szczepienia przeciw grypie podczas leczenia aspiryną.<br>4. Odroczenie szczepień żywymi wirusami (odra, świnka, różyczka – MMR oraz ospa wietrzna) o co najmniej 11 miesięcy od podania wysokiej dawki IVIG.",
    monitoring: "1. Monitorowanie temperatury ciała co 4 godziny – gorączka po 36 h od IVIG wymaga pilnej eskalacji leczenia.<br>2. Kontrola morfologii krwi i wskaźników zapalnych (spadek CRP/OB, monitorowanie szczytu trombocytozy w 2-3 tygodniu).<br>3. Długoterminowa kardiologiczna stratyfikacja ryzyka (grupy ryzyka AHA I-V w zależności od obecności i wielkości tętniaków wieńcowych).<br>4. Próby wysiłkowe i tomografia tętnic wieńcowych (angio-TK) u starszych dzieci z przebytymi tętniakami wieńcowymi."
  },
  lekQuestions: [
    {
      question: "Zgodnie z wytycznymi American Heart Association (AHA) do rozpoznania klasycznej postaci choroby Kawasakiego wymagane jest stwierdzenie gorączki trwającej co najmniej 5 dni oraz spełnienie co najmniej 4 z 5 kryteriów klinicznych, do których NALEŻY:",
      options: [
        "Obustronne bezwysiękowe przekrwienie spojówek z oszczędzeniem rąbka rogówki",
        "Ropne zapalenie spojówek z obfitą wydzieliną śluzowo-ropną",
        "Wysypka pęcherzykowa z obecnością wiotkich pęcherzy na tułowiu",
        "Symetryczne powiększenie węzłów chłonnych pachowych i pachwinowych",
        "Masywne owrzodzenia aftowe w jamie ustnej i narządach płciowych"
      ],
      correct: 0,
      expl: "Kryteria kliniczne choroby Kawasakiego obejmują: 1. Obustronne bezwysiękowe (suche) przekrwienie spojówek gałkowych (z oszczędzeniem rąbka rogówki), 2. Zmiany na błonach śluzowych jamy ustnej (malinowy język, pękające wargi, rumień gardła), 3. Zmiany na obwodowych częściach kończyn (obrzęk, rumień rąk i stóp, łuszczenie okołopaznokciowe w 2-3 tyg.), 4. Polimorficzna wysypka (nigdy pęcherzykowa!), 5. Jednostronna limfadenopatia szyjna (>1,5 cm)."
    },
    {
      question: "Najpoważniejszym powikłaniem choroby Kawasakiego decydującym o odległym rokowaniu pacjenta jest:",
      options: [
        "Powstanie tętniaków tętnic wieńcowych (CAA) z ryzykiem zakrzepicy i zawału serca",
        "Rozwój przewlekłej niewydolności nerek z koniecznością dializoterapii",
        "Nieodwracalne zesztywnienie stawów międzypaliczkowych",
        "Trwała utrata słuchu w wyniku zapalenia ucha wewnętrznego",
        "Pęknięcie śledziony w fazie ostrej"
      ],
      correct: 0,
      expl: "Choroba Kawasakiego wykazuje szczególny tropizm do tętnic wieńcowych. U około 25% nieleczonych dzieci dochodzi do zapalenia ściany tętnic wieńcowych i wytworzenia tętniaków (CAA). Tętniaki te predysponują do tworzenia skrzeplin, zawału mięśnia sercowego, a tętniaki olbrzymie mogą ulec pęknięciu."
    },
    {
      question: "Standardowym leczeniem pierwszego rzutu o udowodnionej w badaniach EBM skuteczności w redukcji ryzyka tętniaków wieńcowych w chorobie Kawasakiego jest:",
      options: [
        "Immunoglobuliny dożylne (IVIG 2 g/kg) w pojedynczym wlewie w skojarzeniu z kwasem acetylosalicylowym (ASA)",
        "Glikokortykosteroidy w monoterapii doustnej przez 30 dni",
        "Cefalosporyny III generacji dożylnie przez 14 dni",
        "Metotreksat w dawce immunosupresyjnej podawany podskórnie",
        "Plazmafereza z wymianą osocza"
      ],
      correct: 0,
      expl: "Podanie dożylnych immunoglobulin (IVIG) w pojedynczym wlewie w dawce 2 g/kg m.c. w ciągu pierwszych 10 dni choroby, w połączeniu z kwasem acetylosalicylowym (ASA), jest złotym standardem leczenia pierwszego rzutu, który redukuje częstość występowania tętniaków wieńcowych z 20-25% do poniżej 3-5%."
    },
    {
      question: "Kwas acetylosalicylowy (ASA) w chorobie Kawasakiego w fazie podostrej (po 48 godzinach od ustąpienia gorączki) stosuje się:",
      options: [
        "W małej dawce przeciwpłytkowej 3-5 mg/kg m.c./dobę raz na dobę przez 6-8 tygodni",
        "W wysokiej dawce przeciwzapalnej 100 mg/kg m.c./dobę przez 6 miesięcy",
        "W dawce 50 mg/kg m.c./dobę dożylnie co 6 godzin",
        "Zostaje całkowicie odstawiony natychmiast po spadku temperatury",
        "W skojarzeniu z paracetamolem co 2 godziny"
      ],
      correct: 0,
      expl: "Po ustąpieniu gorączki (zwykle po 48 h bezgorączkowych) dawkę ASA redukuje się z przeciwzapalnej (30-50 mg/kg/d) do małej dawki antyagregacyjnej (przeciwpłytkowej) wynoszącej 3-5 mg/kg m.c./dobę podawanej raz na dobę. Terapię tę kontynuuje się przez 6-8 tygodni od zachorowania (do czasu normalizacji parametrów zapalnych i obrazu naczyń w ECHO)."
    },
    {
      question: "Zgodnie z kryteriami American Heart Association (AHA) 'olbrzymi tętniak' (giant aneurysm) tętnicy wieńcowej definiowany jest jako zmiana o:",
      options: [
        "Z-score >= 10 lub bezwzględnej średnicy wewnętrznej naczynia >= 8 mm",
        "Z-score między 2 a 2,5",
        "Średnicy wewnętrznej naczynia powyżej 3 mm u niemowlęcia",
        "Z-score < 5 przy obecności płynu w osierdziu",
        "Średnicy mniejszej niż 4 mm"
      ],
      correct: 0,
      expl: "Klasyfikacja AHA definiuje tętniaka olbrzymiego (giant aneurysm) jako poszerzenie światła tętnicy wieńcowej ze standaryzowanym wskaźnikiem wymiaru Z-score >= 10 LUB bezwzględną średnicą naczynia >= 8 mm. Wiąże się on z najwyższym ryzykiem powikłań zatorowo-zakrzepowych i zawału serca."
    },
    {
      question: "Oporność na leczenie dożylnymi immunoglobulinami (IVIG-resistance) w chorobie Kawasakiego definiuje się jako:",
      options: [
        "Przetrwałą lub nawracającą gorączkę po upływie co najmniej 36 godzin od zakończenia pierwszego wlewu IVIG",
        "Brak ustąpienia łuszczenia naskórka po 24 godzinach od wlewu",
        "Wzrost liczby płytek krwi powyżej 450 tys./µl w drugim tygodniu choroby",
        "Utrzymywanie się powiększonego węzła chłonnego szyjnego przez 3 dni",
        "Wystąpienie wysypki alergicznej w trakcie wlewu IVIG"
      ],
      correct: 0,
      expl: "Oporność na IVIG dotyczy 10-20% chorych i definiuje się ją jako przetrwałą lub nawracającą gorączkę (T >= 38,0°C) po co najmniej 36 godzinach (ale nie później niż 7 dni) od zakończenia pierwszej infuzji IVIG. Pacjenci ci mają znacznie wyższe ryzyko tętniaków i wymagają eskalacji terapii (drugi wlew IVIG, pulsy sterydowe lub infliksymab)."
    },
    {
      question: "W jakim czasie po podaniu wysokiej dawki immunoglobulin (IVIG 2 g/kg) można bezpiecznie podać dziecku żywe szczepionki przeciwwirusowe (np. MMR, ospa wietrzna)?",
      options: [
        "Należy odroczyć szczepienie o co najmniej 11 miesięcy od wlewu IVIG",
        "Można zaszczepić natychmiast w 2. dobie po wlewie",
        "Należy odczekać dokładnie 14 dni",
        "Po 6 tygodniach od zakończenia hospitalizacji",
        "Szczepienia żywe są bezwzględnie i trwale przeciwwskazane do końca życia"
      ],
      correct: 0,
      expl: "Pasywnie podane w preparacie IVIG przeciwciała dawców utrzymują się we krwi biorcy przez wiele miesięcy i neutralizują żywe wirusy szczepionkowe, uniemożliwiając wytworzenie własnej odporności poszczepiennej. Po dawce 2 g/kg IVIG szczepienia żywymi wirusami (odra, świnka, różyczka – MMR oraz ospa wietrzna) należy odroczyć o co najmniej 11 miesięcy."
    },
    {
      question: "Dlaczego u dzieci przyjmujących kwas acetylosalicylowy (ASA) z powodu choroby Kawasakiego bezwzględnie zaleca się coroczne szczepienie przeciwko grypie?",
      options: [
        "Aby zapobiec zachorowaniu na grypę i drastycznie zmniejszyć ryzyko rozwoju zespołu Reye'a",
        "Ponieważ ASA osłabia wchłanianie tlenu w płucach",
        "Szczepionka przeciw grypie bezpośrednio rozszerza tętnice wieńcowe",
        "Ponieważ wirus grypy inaktywuje działanie antyagregacyjne aspiryny",
        "Aspiryna jest nośnikiem dla białek wirusa grypy"
      ],
      correct: 0,
      expl: "Jednoczesne przyjmowanie kwasu acetylosalicylowego w trakcie ostrego zakażenia wirusem grypy (lub ospy wietrznej) stwarza udowodnione wysokie ryzyko wystąpienia zespołu Reye'a (stłuszczenie wątroby z encefalopatią o wysokiej śmiertelności). Dlatego coroczne szczepienie inaktywowaną szczepionką przeciw grypie jest obowiązkowym elementem profilaktyki."
    },
    {
      question: "Charakterystycznym zjawiskiem hematologicznym obserwowanym w fazie podostrej choroby Kawasakiego (typowo w 2-3. tygodniu od początku gorączki) jest:",
      options: [
        "Wybitna nadpłytkowość (trombocytoza, często PLT 600 - 1500 tys./µl)",
        "Głęboka małopłytkowość poniżej 20 tys./µl",
        "Ciężka aplazja szpiku z pancytopenią",
        "Pojawienie się komórek blastycznych w rozmazie krwi",
        "Hemoliza wewnątrznaczyniowa z hemoglobinurią"
      ],
      correct: 0,
      expl: "W drugim i trzecim tygodniu choroby Kawasakiego (faza podostra) niemal u wszystkich pacjentów dochodzi do spektakularnego wzrostu liczby płytek krwi (trombocytoza reaktywna), nierzadko przekraczającej 700 000 do 1 500 000 /µl. W połączeniu z uszkodzeniem śródbłonka i tętniakami wieńcowymi stwarza to krytyczne ryzyko zakrzepicy, wymagając leczenia antyagregacyjnego."
    },
    {
      question: "U 18-miesięcznego dziecka z gorączką od 6 dni, przekrwieniem spojówek bez wysięku, malinowym językiem i rumieniem krocza, w badaniu ogólnym moczu stwierdzono 30 leukocytów wpw przy braku bakterii i ujemnym posiewie moczu. Wynik ten interpretuje się jako:",
      options: [
        "Jałowy ropomocz (cewkowy) – typowy objaw towarzyszący w chorobie Kawasakiego",
        "Odmiedniczkowe zapalenie nerek wymagające pilnej dożylnej antybiotykoterapii",
        "Kamicę nerkową z uwięźniętym złogiem w moczowodzie",
        "Gruźlicę układu moczowo-płciowego",
        "Błąd laboratoryjny – badanie należy zignorować"
      ],
      correct: 0,
      expl: "Jałowy ropomocz (obecność leukocytów w osadzie moczu przy ujemnym posiewie bakteriologicznym) występuje u ok. 30-50% dzieci z chorobą Kawasakiego. Wynika z jałowego zapalenia cewki moczowej (urethritis) lub zapalenia cewek nerkowych i stanowi jedno z pomocniczych kryteriów laboratoryjnych tzw. niekompletnej choroby Kawasakiego."
    },
    {
      question: "Który z poniższych objawów klinicznych NIE jest typowy dla choroby Kawasakiego?",
      options: [
        "Wysypka pęcherzykowa z obecnością pęcherzyków wypełnionych płynem na dłoniach i podeszwach",
        "Płatowe łuszczenie naskórka wokół paznokci w fazie podostrej",
        "Twardy, bolesny obrzęk grzbietów dłoni i stóp w fazie ostrej",
        "Wydrążony, jednostronny węzeł chłonny szyjny o średnicy powyżej 1,5 cm",
        "Intensywny rumień i pękanie warg z malinowym językiem"
      ],
      correct: 0,
      expl: "Wysypka w chorobie Kawasakiego ma charakter polimorficzny (plamisto-grudkowa, rumieniowa, płoniczopodobna), ale z definicji NIGDY nie ma charakteru pęcherzykowego! Obecność pęcherzyków na dłoniach i stopach wskazuje na chorobę dłoni, stóp i jamy ustnej (HFMD / chorobę bostońską) lub ospę wietrzną."
    }
  ],
  flashcards: [
    {
      front: "Wymień kryteria kliniczne klasycznej choroby Kawasakiego wg AHA.",
      back: "Gorączka >=5 dni ORAZ co najmniej 4 z 5 kryteriów:\n1. Obustronne bezwysiękowe zapalenie spojówek (z oszczędzeniem rąbka)\n2. Zmiany na śluzówkach jamy ustnej (malinowy język, pękające wargi, rumień gardła)\n3. Zmiany na dłoniach/stopach (obrzęk i rumień w fazie ostrej, łuszczenie okołopaznokciowe w fazie podostrej)\n4. Polimorficzna wysypka (niepęcherzykowa)\n5. Jednostronny węzeł chłonny szyjny >1,5 cm."
    },
    {
      front: "Jakie jest leczenie pierwszego rzutu w chorobie Kawasakiego i w jakim czasie należy je podać?",
      back: "Dożylne immunoglobuliny (IVIG 2 g/kg w pojedynczym wlewie przez 10-12 h) + Kwas acetylosalicylowy (ASA 30-50 mg/kg/d p.o.). Należy wdrożyć w ciągu pierwszych 10 dni gorączki, by zredukować tętniaki z 25% do <3-5%."
    },
    {
      front: "Jak dawkuje się kwas acetylosalicylowy (ASA) w fazie ostrej i podostrej choroby Kawasakiego?",
      back: "Faza ostra (przeciwzapalna): ASA 30-50 mg/kg/d w 4 dawkach do 48 h bezgorączkowych.\nFaza podostra (antyagregacyjna): ASA 3-5 mg/kg/d raz na dobę przez 6-8 tygodni (lub dłużej, jeśli obecne są tętniaki)."
    },
    {
      front: "Jak definiuje się oporność na IVIG (IVIG-resistance) i jak się ją leczy?",
      back: "Przetrwała lub nawracająca gorączka (>=38,0°C) po 36 h od zakończenia 1. wlewu IVIG.\nLeczenie: 2. wlew IVIG 2 g/kg LUB pulsy metyloprednizolonu (30 mg/kg/d przez 3 dni) LUB infliksymab (5 mg/kg)."
    },
    {
      front: "Czym jest tętniak olbrzymi (giant aneurysm) tętnicy wieńcowej wg wytycznych AHA?",
      back: "Tętniak o standaryzowanym wskaźniku Z-score >= 10 LUB bezwzględnej średnicy wewnętrznej naczynia >= 8 mm. Wiąże się z najwyższym ryzykiem pęknięcia, zakrzepicy i zawału serca."
    },
    {
      front: "Jakie są 2 kluczowe zalecenia dotyczące szczepień po leczeniu choroby Kawasakiego (IVIG + ASA)?",
      back: "1. Odroczenie szczepień żywymi wirusami (MMR, ospa wietrzna) o co najmniej 11 miesięcy od wlewu IVIG (przeciwciała dawców blokują odpowiedź).\n2. Coroczne szczepienie inaktywowane przeciw grypie podczas leczenia aspiryną (ochrona przed śmiertelnym zespołem Reye'a)."
    }
  ]
};

// Mirror fields for schema compatibility
case125.steps.forEach(step => {
  step.question = step.title;
  step.explanation = step.feedback;
});
case125.lekQuestions.forEach(q => {
  q.opts = q.options;
  q.correctIdx = q.correct;
  q.exp = q.expl;
});

saveCase(case125);

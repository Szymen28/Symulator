const fs = require('fs');
const path = require('path');
const { encryptStringAes } = require('./encrypt_case.js');

const MASTER_KEY = '@LEKSzymon28111999';
const CASES_DIR = path.join(__dirname, '..', 'cases');

console.log("Generating Case 133: Ostre niedokrwienie krezki (SMA)...");

async function saveCase(caseData) {
  const filePath = path.join(CASES_DIR, caseData.filename);
  const jsonStr = JSON.stringify(caseData, null, 2);
  const encrypted = await encryptStringAes(jsonStr, MASTER_KEY);
  fs.writeFileSync(filePath, JSON.stringify(encrypted, null, 2), 'utf8');
  console.log(`[SAVED] Case #${caseData.id}: ${caseData.filename} (LEK Qs: ${caseData.lekQuestions.length}, Steps: ${caseData.steps.length}, Flashcards: ${caseData.flashcards.length})`);
}

const case133 = {
  id: 133,
  filename: "133_ostre_niedokrwienie_krezki_sma.json",
  dept: "Chirurgia ogólna",
  shortTitle: "71-letni Jerzy – Potworny ból brzucha z brakiem objawów w badaniu, kwasica mleczanowa i migotanie przedsionków (Ostre niedokrwienie krezki / Zator SMA)",
  diagnosisTitle: "Ostre niedokrwienie krezki (Acute Mesenteric Ischemia – AMI) w przebiegu zatoru pnia tętnicy krezkowej górnej (SMA embolism) u pacjenta z nieleczonym migotaniem przedsionków",
  vitals: [
    { label: "Nasilenie bólu brzucha", val: "10 / 10 w skali NRS", sub: "Potworny ból nieproporcjonalny do badania fizykalnego", status: "vital-crit" },
    { label: "Kwas mlekowy (mleczany)", val: "4,6 mmol/l", sub: "Ciężka kwasica mleczanowa (niedokrwienie jelita)", status: "vital-crit" },
    { label: "Akcja serca (EKG)", val: "128/min (Migotanie przedsionków)", sub: "Tachyarytmia z zupełną niemiarowością (źródło zatoru)", status: "vital-crit" },
    { label: "Badanie palpacyjne brzucha", val: "Brzuch miękki / bolesność nikła", sub: "Klasyczna dysocjacja kliniczna (ból >> badanie)", status: "vital-warn" }
  ],
  vitalsObj: { hr: 128, bp: "110/68", spo2: 95, rr: 24, temp: 37.2, gcs: 15 },
  story: `<p><strong>Pacjent:</strong> 71-letni Jerzy został przywieziony przez zespół ratownictwa medycznego na szpitalny oddział ratunkowy z powodu nagłego, rozdzierającego, potwornego bólu brzucha, który rozpoczął się około 4 godziny temu i nie ustępuje po podanych przez ratowników opioidach.</p><p><strong>Wywiad chorobowy:</strong> Chory był w pełni zdrowia porannego, gdy około godziny 07:30 nagle poczuł paraliżujący ból w śródbrzuszu i wokół pępka. Bezpośrednio po wybuchu bólu wystąpiło gwałtowne wypróżnienie (początkowo uformowany stolec, a następnie płynna, cuchnąca biegunka) oraz wielokrotne nudności i wymioty treścią śluzową. W wywiadzie: utrwalone migotanie przedsionków rozpoznane przed 3 laty, na które chory miał zalecony apiksaban, jednak od ponad 4 miesięcy samowolnie zaprzestał przyjmowania leków przeciwkrzepliwych z obawy przed krwawieniem. Ponadto przebyty zawał serca przed 6 laty, miażdżyca tętnic obwodowych, wieloletnie palenie tytoniu. W wywiadzie brak dolegliwości poposiłkowych w poprzednich miesiącach.</p><p><strong>Badanie przedmiotowe na SOR:</strong> Pacjent w skrajnym cierpieniu, blady, zlany potem, zwija się na kozetce, jęczy i krzyczy z bólu, trzymając się za brzuch. W badaniu kardiologicznym: tony serca zupełnie niemiarowe, tachykardia 128/min bez szmerów. Ciśnienie tętnicze 110/68 mmHg, oddech przyspieszony, spłycony (RR 24/min). W badaniu jamy brzusznej: uderza <strong>dramatyczna dysocjacja kliniczna</strong> – mimo że pacjent krzyczy z bólu ocenianego na 10/10, powłoki brzucha są miękkie, nie stwierdza się obrony mięśniowej, objaw Blumberga jest ujemny, a bolesność palpacyjna jest zaskakująco niewielka i nieokreślona! W opukiwaniu wypuk prawidłowy, stłumienie wątrobowe zachowane. Osłuchowo perystaltyka początkowo bardzo żywa, głośna, o charakterze 'skurczów walki'. W badaniu per rectum (DRE): bańka odbytnicy pusta, na rękawiczce obecne ślady ciemnoczerwonego, podbarwionego krwią śluzu (objaw galaretki porzeczkowej). W pachwinach tętno na tętnicach udowych obecne, symetryczne.</p>`,
  labs: {
    "Gazometria krwi tętniczej i mleczany (marker zawału jelita)": [
      { name: "Kwas mlekowy (mleczany)", val: "4,6 mmol/l", norm: "0,5 - 2,0 mmol/l", flag: "CRIT_HIGH" },
      { name: "pH krwi tętniczej", val: "7,28", norm: "7,35 - 7,45", flag: "CRIT_LOW" },
      { name: "Wodorowęglany aktualne (HCO3-)", val: "16,4 mmol/l", norm: "22 - 26 mmol/l", flag: "CRIT_LOW" },
      { name: "Nadmiar zasad (BE)", val: "-9,8 mmol/l", norm: "-2,5 do +2,5 mmol/l", flag: "CRIT_LOW" },
      { name: "Luka anionowa (Anion Gap)", val: "22,0 mEq/l", norm: "8 - 16 mEq/l", flag: "CRIT_HIGH" },
      { name: "pCO2", val: "32 mmHg", norm: "35 - 45 mmHg", flag: "LOW" }
    ],
    "Morfologia i biochemia": [
      { name: "Leukocyty (WBC)", val: "21,5 tys./µl", norm: "4,0 - 10,0 tys./µl", flag: "CRIT_HIGH" },
      { name: "Granulocyty obojętnochłonne (NEUT)", val: "90 % (19,3 tys./µl)", norm: "45 - 70 %", flag: "CRIT_HIGH" },
      { name: "D-dimery", val: "4850 ng/ml", norm: "< 500 ng/ml", flag: "CRIT_HIGH" },
      { name: "Dehydrogenaza mleczanowa (LDH)", val: "490 U/l", norm: "120 - 240 U/l", flag: "HIGH" },
      { name: "Fosforany nieorganiczne w surowicy", val: "5,4 mg/dl", norm: "2,5 - 4,5 mg/dl", flag: "HIGH" },
      { name: "Kinaza kreatynowa (CK)", val: "310 U/l", norm: "< 190 U/l", flag: "HIGH" },
      { name: "Amylaza w surowicy", val: "135 U/l", norm: "28 - 100 U/l", flag: "HIGH" }
    ],
    "EKG spoczynkowe": [
      { name: "Rytm wiodący", val: "Migotanie przedsionków (AF) z szybką odpowiedzią komór 120-135/min, brak załamków P, fale f, brak cech ostrego uniesienia ST (STEMI)", norm: "Rytm zatokowy", flag: "CRIT_HIGH" }
    ]
  },
  steps: [
    {
      title: "Krok 1: Identyfikacja klasycznej dysocjacji klinicznej w ostrym niedokrwieniu krezki",
      text: "Pacjent z migotaniem przedsionków zwija się z niewyobrażalnego bólu brzucha (10/10), podczas gdy badanie palpacyjne powłok wykazuje miękki brzuch bez objawów otrzewnowych. Jak należy zinterpretować to zjawisko?",
      options: [
        "Jest to klasyczna, patognomoniczna dysocjacja kliniczna dla wczesnej fazy ostrego zatoru tętnicy krezkowej górnej (SMA) – ból jest potworny z powodu ostrego niedotlenienia enterocytów, ale brak jest zapalenia otrzewnej ściennej dopóki nie dojdzie do martwicy pełnej grubości ściany jelita",
        "Świadczy to o symulacji lub nerwicy lękowej chorego i braku rzeczywistej choroby organicznej",
        "Jest to typowy obraz kolki żółciowej bez wskazań do diagnostyki naczyniowej",
        "Oznacza to zapalenie korzonków nerwowych kręgosłupa lędźwiowego"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Dysocjacja między potwornym, rozdzierającym bólem zgłaszanym przez pacjenta a zaskakująco ubogim obrazem w badaniu palpacyjnym brzucha (brzuch miękki, brak obrony i objawów otrzewnowych)</strong> to najważniejsza perła kliniczna w ostrym niedokrwieniu krezki (AMI). Otrzewna ścienna nie jest początkowo zmieniona zapalnie, ponieważ proces niedokrwienny toczy się w błonie śluzowej i ścianie jelita. Oczekiwanie na pojawienie się 'twardego brzucha' i objawu Blumberga oznacza czekanie na całkowitą, nieodwracalną martwicę zgorzelinową jelita!",
        "❌ BŁĄD! <strong>Ignorowanie bólu u chorego z migotaniem przedsionków i traktowanie go jako 'nerwicy' to najczęstszy, śmiertelny błąd na SOR!</strong>",
        "❌ BŁĄD! <strong>Kolka żółciowa daje ból w prawym podżebrzu,</strong> a nie kwasicę mleczanową i uogólnione niedokrwienie.",
        "❌ BŁĄD! <strong>Zapalenie korzonków nie tłumaczy leukocytozy 21 tys. i mleczanów 4,6 mmol/l.</strong>"
      ]
    },
    {
      title: "Krok 2: Badanie obrazowe 'Złotego Standardu' w diagnostyce niedokrwienia krezki",
      text: "Jakie badanie obrazowe jest współczesnym 'złotym standardem' o najwyższej czułości i swoistości (>95%), które należy wykonać w trybie NATYCHMIASTOWYM bez zbędnej zwłoki?",
      options: [
        "Angio-TK jamy brzusznej i miednicy (wieloowocowa tomografia komputerowa z fazą tętniczą i żylną naczyniową)",
        "Przeglądowe RTG jamy brzusznej na stojąco",
        "Klasyczna kolonoskopia w znieczuleniu miejscowym",
        "Planowy rezonans magnetyczny za 14 dni"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Angio-TK jamy brzusznej (wieloowocowa tomografia naczyniowa z kontrastem i.v. w fazie tętniczej i żylnej) jest niekwestionowanym złotym standardem i badaniem pierwszego wyboru w podejrzeniu ostrego niedokrwienia krezki.</strong> Uwidacznia miejsce zatoru w pniu SMA, ocenia przepływ w gałęziach krezkowych, grubość i perfuzję ściany pętli jelita (brak wzmocnienia śródściennego), a także pozwala wykluczyć inne przyczyny ostrego brzucha. Czas od podejrzenia do wykonania Angio-TK powinien wynosić mniej niż 30-60 minut!",
        "❌ BŁĄD! <strong>Przeglądowe RTG we wczesnym niedokrwieniu jest całkowicie prawidłowe</strong> (objawy gazu w ścianie pojawiają się dopiero w zejściowej martwicy).",
        "❌ BŁĄD! <strong>Kolonoskopia nie pozwala uwidocznić jelita cienkiego,</strong> a wdmuchiwanie powietrza może rozerwać niedokrwioną ścianę jelita.",
        "❌ BŁĄD! <strong>Opóźnienie o 14 dni oznacza 100% zgon pacjenta.</strong>"
      ]
    },
    {
      title: "Krok 3: Analiza laboratoryjna markerów niedokrwienia tkanek",
      text: "WYNIKI: Mleczany 4,6 mmol/l, pH 7,28, luka anionowa 22 mEq/l, D-dimery 4850 ng/ml, WBC 21,5 tys./µl. Jakie jest znaczenie kliniczne tych markerów?",
      options: [
        "Świadczą o zaawansowanym metabolizmie beztlenowym ściany jelita i kwasicy mleczanowej z wysoką luką anionową; wysokie D-dimery i leukocytoza potwierdzają ostry proces zakrzepowo-zatorowy i martwicę komórek",
        "Wskazują na łagodne odwodnienie po intensywnym wysiłku fizycznym",
        "Są typowym obrazem przewlekłego zespołu jelita drażliwego (IBS)",
        "Oznaczają błąd laboratoryjny i nakazują powtórzenie badań bez leczenia"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Połączenie skrajnego bólu z kwasicą mleczanową (mleczany >2-3 mmol/l), wysoką luką anionową, leukocytozą z przesunięciem w lewo oraz bardzo wysokim stężeniem D-dimerów</strong> to laboratoryjny podpis ostrego niedotlenienia i obumierania komórek ściany jelita. Podwyższenie D-dimerów ma bardzo wysoką czułość (>96%) w wykluczaniu zatorowości krezkowej (ujemne D-dimery przemawiają przeciwko zatorowi).",
        "❌ BŁĄD! <strong>Mleczany 4,6 mmol/l i WBC 21 tys. to cechy krytycznego niedokrwienia narządowego,</strong> a nie fizjologii.",
        "❌ BŁĄD! <strong>W IBS parametry laboratoryjne gazometrii i enzymów są całkowicie w normie.</strong>",
        "❌ BŁĄD! <strong>Czekanie na powtórkę badań bez wdrożenia leczenia to śmiertelna zwłoka.</strong>"
      ]
    },
    {
      title: "Krok 4: Wdrożenie leczenia przeciwkrzepliwego przed zabiegiem",
      text: "Angio-TK potwierdza obecność zatoru zamykającego pień tętnicy krezkowej górnej (SMA) 5 cm od jej odejścia od aorty. Jaki lek należy podać natychmiast dożylnie na sali resuscytacyjnej jeszcze przed przekazaniem chorego na blok operacyjny?",
      options: [
        "Heparynę niefrakcjonowaną (UFH) w bolusie dożylnym (5000 j.m. lub 80 j./kg) i wlewie ciągłym, celem zahamowania propagacji skrzepliny w mikrokrążeniu krezkowym",
        "Kwas traneksamowy dożylnie celem zablokowania fibrynolizy",
        "Doustną aspirynę w tabletce musującej",
        "Wlew z witaminy K i osocza mrożonego"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Natychmiast po wysunięciu podejrzenia lub potwierdzeniu ostrego niedokrwienia krezki należy podać dożylnie heparynę niefrakcjonowaną (<span class='dose-pill'>Heparyna niefrakcjonowana UFH 5000 j.m. i.v. bolus</span>, potem wlew ciągły).</strong> Heparyna hamuje dalszą propagację skrzepliny w naczyniach dystalnych od zatoru oraz zapobiega wtórnej zakrzepicy w łożysku mikronaczyniowym krezki, co ma kluczowe znaczenie dla ratowania pętli jelitowych przed zawałem.",
        "❌ BŁĄD! <strong>Kwas traneksamowy to lek przeciwkrwotoczny –</strong> nasiliłby zakrzepicę w naczyniach krezki i przyspieszył martwicę!",
        "❌ BŁĄD! <strong>Doustne leki są nieskuteczne i niewskazane u chorego przygotowywanego do pilnej operacji.</strong>",
        "❌ BŁĄD! <strong>Witamina K znosi działanie antykoagulantów i promuje krzepnięcie,</strong> co w zatorowości jest zabójcze."
      ]
    },
    {
      title: "Krok 5: Postępowanie zabiegowe z wyboru – rewaskularyzacja chirurgiczna",
      text: "Chory trafia na blok operacyjny. Jaka procedura naczyniowa jest zabiegiem z wyboru w celu przywrócenia dopływu krwi do jelit w ostrym zatorze tętnicy krezkowej górnej?",
      options: [
        "Pilna laparotomia z arteriotomią podłużną/poprzeczną tętnicy krezkowej górnej i embolektomią chirurgiczną za pomocą cewnika Fogarty'ego (rozmiar 3F-4F) oraz kontrolą żywotności jelita",
        "Wycięcie całego żołądka z pozostawieniem niedokrwionego jelita",
        "Założenie stentu do przewodu żółciowego wspólnego",
        "Podwiązanie tętnicy krezkowej górnej na głucho"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Złotym standardem chirurgicznego leczenia zatoru SMA jest embolektomia chirurgiczna cewnikiem Fogarty'ego.</strong> Chirurg preparuje pień SMA u nasady krezki poprzecznicy, wykonuje poprzeczną arteriotomię, wprowadza cewnik balonowy Fogarty'ego (nr 3F/4F) proksymalnie i dystalnie, usuwając materiał zatorowy i wtórne skrzepliny, po czym zamyka naczynie szwem naczyniowym (lub łatą z żyły). W ośrodkach z pracownią hybrydową alternatywą może być przezskórna mechaniczna trombektomia aspiracyjna.",
        "❌ BŁĄD! <strong>Żołądek jest zaopatrywany przez pień trzewny (celiac trunk) i nie jest objęty zatorem SMA;</strong> resekcja żołądka to błąd sztuki.",
        "❌ BŁĄD! <strong>Stent żółciowy leczy żółtaczkę,</strong> a nie zator tętnicy jelitowej.",
        "❌ BŁĄD! <strong>Podwiązanie SMA spowodowałoby natychmiastową śmierć całego jelita cienkiego i prawej połowy okrężnicy!</strong>"
      ]
    },
    {
      title: "Krok 6: Koncepcja 'Second-look Laparotomy' (Relaparotomia po 24-48 godzinach)",
      text: "Po udanej embolektomii SMA i powrocie tętna pętle jelita cienkiego częściowo odzyskały różowe zabarwienie, jednak na długości ok. 40 cm pętla jelita krętego budzi wątpliwości co do pełnej żywotności (jest bladoróżowa, ze słabą perystaltyką). Dlaczego bezwzględnym standardem w chirurgii niedokrwienia krezki jest zaplanowanie relaparotomii 'second-look'?",
      options: [
        "Ponieważ granica między odwracalnym a nieodwracalnym uszkodzeniem niedokrwiennym ujawnia się w pełni dopiero po 24-48 godzinach od przywrócenia przepływu; 'second-look' pozwala na resekcję wyłącznie tych odcinków, które uległy definitywnej martwicy, chroniąc pacjenta przed zespołem krótkiego jelita (SBS)",
        "Ponieważ relaparotomia jest procedurą administracyjną wymaganą przez NFZ",
        "Aby pobrać wycinki do badań genetycznych",
        "Aby usunąć wcześniej wszczepioną siatkę przepuklinową"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Koncepcja 'second-look laparotomy' po 24-48 godzinach jest kardynalną zasadą w leczeniu ostrego niedokrwienia krezki.</strong> W chwili pierwotnego zabiegu po rewaskularyzacji bardzo trudno precyzyjnie ocenić, które fragmenty jelita zregenerują się, a które ulegną martwicy. Wycięcie na zapas zbyt długiego odcinka skazuje chorego na inwalidztwo (zespół krótkiego jelita – Short Bowel Syndrome). Z kolei pozostawienie martwicy grozi perforacją i zgonem. Zaplanowane ponowne otwarcie jamy brzusznej po 24-48 h pozwala na bezpieczną, ostateczną weryfikację i oszczędzającą resekcję.",
        "❌ BŁĄD! <strong>Second-look to procedura ratująca życie i narząd,</strong> a nie wymóg formalny.",
        "❌ BŁĄD! <strong>Nie służy pobieraniu badań genetycznych;</strong> służy ocenie makroskopowej perfuzji jelita.",
        "❌ BŁĄD! <strong>W zatorowości nie wszczepia się siatek przepuklinowych.</strong>"
      ]
    },
    {
      title: "Krok 7: Zespół Porefuzyjny i uszkodzenie niedokrwienno-reperfuzyjne (IRI)",
      text: "Po udrożnieniu naczynia i przywróceniu przepływu krwi do niedokrwionego jelita u pacjenta dochodzi do nagłego spadku ciśnienia, hiperkaliemii i wzrostu kwasicy. Jakie zjawisko patofizjologiczne odpowiada za to załamanie hemodynamiczne?",
      options: [
        "Uszkodzenie niedokrwienno-reperfuzyjne (Ischemia-Reperfusion Injury – IRI) z wypłukaniem z niedokrwionego jelita do krążenia ogólnego potasu, kwasu mlekowego, wolnych rodników tlenowych (ROS) i cytokin zapalnych",
        "Nagłe przedawkowanie tlenu w płucach chorego",
        "Zatkanie aorty przez zbyt mały cewnik Fogarty'ego",
        "Zakażenie wirusem opryszczki w trakcie operacji"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Uszkodzenie niedokrwienno-reperfuzyjne (IRI) to paradoksalne nasilenie uszkodzenia tkanek po przywróceniu dopływu krwi.</strong> Krew napływająca do uprzednio niedokrwionego jelita reaguje z oksydazą ksantynową, generując olbrzymie ilości reaktywnych form tlenu (ROS). Z niedokrwionych komórek do łożyska naczyniowego zostają nagle 'wypłukane' jony potasu (ryzyko śmiertelnej hiperkaliemii i asystolii), kwas mlekowy oraz TNF-alfa i endotoksyny, co może wywołać gwałtowny spadek oporu naczyniowego, wstrząs wazoplegiczny i zaburzenia rytmu serca.",
        "❌ BŁĄD! <strong>Tlen jest niezbędny do rewaskularyzacji;</strong> to zjawiska komórkowe generują ROS.",
        "❌ BŁĄD! <strong>Cewnik Fogarty'ego jest usuwany po wyciągnięciu skrzepliny.</strong>",
        "❌ BŁĄD! <strong>Wstrząs porefuzyjny nie wynika z infekcji wirusowej.</strong>"
      ]
    },
    {
      title: "Krok 8: Profilaktyka wtórna – antykoagulacja do końca życia",
      text: "Jerzy pomyślnie przeszedł zabieg, w relaparotomii jelito było w pełni żywotne (brak konieczności resekcji). Jakie leczenie farmakologiczne pacjent musi bezwzględnie kontynuować po wypisie ze szpitala?",
      options: [
        "Przewlekłą doustną antykoagulację do końca życia (DOAC np. apiksaban/rywaroksaban lub antagonista witaminy K warfaryna z celem INR 2,0-3,0) w celu zapobieżenia ponownym zatorom z lewego przedsionka",
        "Wyłącznie witaminę C i kwas foliowy doustnie",
        "Leki przeciwkrzepliwe są trwale przeciwwskazane po operacjach naczyniowych",
        "Antybiotyki doustne bezterminowo przez 20 lat"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Przyczyną pierwotną zatoru SMA było nieleczone migotanie przedsionków (AF).</strong> Brak przewlekłej antykoagulacji u tego chorego doprowadził do śmiertelnie groźnego incydentu zatorowego. Po zagojeniu ran operacyjnych pacjent musi bezwzględnie powrócić do <strong>stałego leczenia przeciwkrzepliwego do końca życia (DOAC lub VKA)</strong>, połączonego z kontrolą kardiologiczną (CHA2DS2-VASc = 4 pkt u tego pacjenta – bardzo wysokie ryzyko udaru mózgu i kolejnych zatorów).",
        "❌ BŁĄD! <strong>Witaminy nie chronią przed zakrzepami w migotaniu przedsionków.</strong>",
        "❌ BŁĄD! <strong>Odstawienie antykoagulacji u chorego z AF po epizodzie zatorowości krezkowej to bezpośrednie narażenie go na udar mózgu lub ponowny zawał krezki!</strong>",
        "❌ BŁĄD! <strong>Antybiotyki nie zapobiegają kardiogennym zatorom tętniczym.</strong>"
      ]
    }
  ],
  pathoNodes: [
    {
      badge: "Kardiogenny zator",
      title: "Oderwanie skrzepliny z uszka lewego przedsionka",
      short: "Nieleczone migotanie przedsionków (AF)",
      detail: "Staza krwi w migoczącym lewym przedsionku tworzy skrzeplinę. Fragment skrzepliny urywa się, wędruje przez aortę i z powodu ostrego kąta odejścia SMA (45-60 stopni) z dużą prędkością wpada do jej pnia.",
      target: "Pień tętnicy krezkowej górnej (SMA)",
      drugTarget: "<span class='dose-pill'>Embolektomia cewnikiem Fogarty'ego</span> usunięcie materiału zatorowego"
    },
    {
      badge: "Brak krążenia",
      title: "Ostre niedotlenienie i glikoliza beztlenowa",
      short: "Spadek ATP w enterocytach i wzrost mleczanów",
      detail: "Zablokowanie przepływu tętniczego odcina dowóz tlenu do jelita czczego i krętego. Enterocyty przechodzą na beztlenowy szlak glikolizy, produkując olbrzymie ilości mleczanów (kwasica mleczanowa).",
      target: "Enterocyty i metabolizm tlenowy",
      drugTarget: "<span class='dose-pill'>Heparyna niefrakcjonowana (UFH) 5000 j.m. i.v.</span> hamowanie mikrozakrzepicy"
    },
    {
      badge: "Uszkodzenie śluzówki",
      title: "Zawał śluzówkowy i krwawienie porzeczkowe",
      short: "Złuszczanie nabłonka i translokacja endotoksyn",
      detail: "Błona śluzowa jako najbardziej wrażliwa ulega martwicy już po 2-4 godzinach. Krew i martwiczy śluz przesączają się do światła jelita, tworząc stolce o wyglądzie galaretki porzeczkowej.",
      target: "Bariera śluzówkowa jelita cienkiego",
      drugTarget: "<span class='dose-pill'>PWE 2000-3000 ml/d i.v.</span> intensywna płynoterapia przeciwkwasicza"
    },
    {
      badge: "Reperfuzja",
      title: "Zjawisko niedokrwienno-reperfuzyjne (IRI)",
      short: "Wyrzut ROS, potasu i kwasu do krążenia ogólnego",
      detail: "Po udrożnieniu naczynia krew wypłukuje z jelita wolne rodniki tlenowe, kwas mlekowy i jony potasu. Może to wywołać nagłą wazoplegię, wstrząs porefuzyjny i groźne arytmie komorowe.",
      target: "Łożysko naczyniowe i miąższ narządów",
      drugTarget: "<span class='dose-pill'>Second-look laparotomy po 24-48 h</span> ostateczna weryfikacja żywotności pętli"
    }
  ],
  diffTable: {
    title: "⚔️ Tabela Różnicowa: Ostre niedokrwienie krezki vs Inne ostre zespoły bólowe jamy brzusznej",
    headers: ["Cecha kliniczna", "Ostre niedokrwienie krezki (Zator SMA)", "Perforacja wrzodu trawiennego", "Ostre zapalenie trzustki (OZT)", "Pęknięty tętniak aorty (rAAA)", "Zatorowość płucna z bólem brzucha"],
    rows: [
      ["Badanie palpacyjne powłok", "Brzuch miękki, brak obrony, słaba bolesność uciskowa (DYSOCJACJA KLINICZNA!)", "Brzuch deskowaty (ekstremalna obrona mięśniowa na całym brzuchu od razu)", "Bolesność w nadbrzuszu, brzuch ciastowaty, wzmożone napięcie podżebrza", "Tętniący bolesny guz w śródbrzuszu, objawy wstrząsu hipowolemicznego", "Brzuch całkowicie miękki, niebolesny palpacyjnie"],
      ["Czynnik ryzyka wiodący", "Migotanie przedsionków (AF bez antykoagulacji), zawał serca, wady zastawek", "Przewlekłe stosowanie NLPZ, infekcja Helicobacter pylori, palenie tytoniu", "Kamica żółciowa, nadużywanie alkoholu, hipertrójglicerydemia", "Podeszły wiek, palenie tytoniu, nadciśnienie, tętniak aorty w wywiadzie", "Unieruchomienie, zakrzepica żył głębokich (DVT), nowotwory złośliwe"],
      ["Kwas mlekowy i gazometria", "Ciężka kwasica mleczanowa (mleczany >3-5 mmol/l) z wysoką luką anionową", "Kwasica metaboliczna pojawia się późno w fazie sepsy otrzewnowej", "Kwasica metaboliczna w ciężkich postaciach martwiczych", "Kwasica mleczanowa z powodu wstrząsu krwotocznego", "Hipokapnia i zasadowica oddechowa z powodu hiperwentylacji"],
      ["Charakter stolca", "Cuchnąca biegunka, późno stolce podbarwione krwią ('galaretka porzeczkowa')", "Zatrzymanie gazów i stolca z powodu odruchowego porażenia perystaltyki", "Zwykle zatrzymanie gazów i stolca w porażeniu jelit", "Brak typowych zmian stolca", "Prawidłowy"],
      ["Badanie obrazowe z wyboru", "Angio-TK jamy brzusznej (wieloowocowa tomografia z fazą tętniczą)", "Przeglądowe RTG klatki/brzucha na stojąco (sierp wolnego powietrza)", "Lipaza/amylaza w surowicy; TK jamy brzusznej z kontrastem po 48-72 h", "Pilne Angio-TK aorty brzusznej lub USG POCUS na sali reanimacyjnej", "Angio-TK tętnic płucnych (angio-TK klatki piersiowej)"],
      ["Leczenie pierwszego rzutu", "Pilna embolektomia SMA cewnikiem Fogarty'ego + second-look laparotomy", "Pilna laparotomia ze zszyciem perforacji i łatą Grahama", "Agresywna płynoterapia krystaloidowa, leczenie bólu, wczesne żywienie", "Natychmiastowe zaopatrzenie naczyniowe (EVAR lub otwarta proteza aorty)", "Antykoagulacja (LMWH/UFH) lub tromboliza systemowa we wstrząsie"]
    ]
  },
  dutySummary: {
    overview: "Ostre niedokrwienie krezki (Acute Mesenteric Ischemia – AMI) jest stanem bezpośredniego zagrożenia życia o śmiertelności sięgającej 60-80%. Najczęstszą przyczyną (ok. 50%) jest kardiogenny zator pnia tętnicy krezkowej górnej (SMA) u chorych z migotaniem przedsionków. Kluczem do przeżycia jest rozpoznanie na etapie dysocjacji klinicznej (potworny ból przy miękkim brzuchu) przed rozwojem martwicy pełnej grubości jelita.",
    diagnostics: "1. Identyfikacja dysocjacji klinicznej: dramatyczny ból brzucha (10/10) nieproporcjonalny do ubogiego obrazu w badaniu palpacyjnym u chorego z migotaniem przedsionków.<br>2. Pilna gazometria krwi tętniczej – ocena stężenia mleczanów (mleczany >2,5-3,0 mmol/l to silny marker niedokrwienia tkanek).<br>3. Angio-TK jamy brzusznej i miednicy z fazą tętniczą i żylną (złoty standard, czułość >95%) – uwidocznienie zatoru w pniu SMA i ocena perfuzji jelita.<br>4. Morfologia i hemostaza: masywna leukocytoza (>20 tys./µl), bardzo wysokie D-dimery (>1000-4000 ng/ml).<br>5. Badanie per rectum (DRE) – poszukiwanie krwi w stolcu (objaw galaretki porzeczkowej).",
    drugsAndDoses: "1. Antykoagulacja parenteralna natychmiast po wysunięciu podejrzenia:<br>   - <span class='dose-pill'>Heparyna niefrakcjonowana (UFH) 5000 j.m. i.v. bolus</span>, następnie wlew ciągły 18 j./kg/h (kontrola APTT 1,5-2,5 x norma).<br>2. Płynoterapia krystaloidowa: <span class='dose-pill'>Płyn wieloelektrolitowy (PWE) 2000-3000 ml/d i.v.</span> celem wyrównania kwasicy i wolemii.<br>3. Antybiotykoterapia empiryczna o szerokim spektrum (ochrona przed translokacją bakteryjną):<br>   - <span class='dose-pill'>Piperacylina z tazobaktamem 4,5 g i.v. co 8 h</span> LUB<br>   - <span class='dose-pill'>Ceftriakson 2 g i.v. raz/dobę</span> + <span class='dose-pill'>Metronidazol 500 mg i.v. co 8 h</span>.<br>4. Analgezja parenteralna: <span class='dose-pill'>Morfina 5-10 mg i.v.</span> pod ścisłą kontrolą oddechu.",
    procedures: "1. Pilna laparotomia zwiadowcza z rewaskularyzacją chirurgiczną – embolektomia tętnicy krezkowej górnej cewnikiem Fogarty'ego (nr 3F/4F).<br>2. Ocena żywotności jelita po przywróceniu przepływu (barwa, perystaltyka, tętno w krezce).<br>3. Resekcja wyłącznie odcinków z ewidentną martwicą zgorzelinową (oszczędzanie jelita).<br>4. Obligatoryjne zaplanowanie relaparotomii 'second-look' po 24-48 godzinach w celu ponownej oceny granicy żywotności jelita.<br>5. Alternatywa w ośrodkach referencyjnych: przezskórna mechaniczna trombektomia aspiracyjna SMA.",
    monitoring: "1. Monitorowanie hemodynamiczne i metaboliczne na OIT (seryjne oznaczanie mleczanów co 2-4 h do czasu normalizacji).<br>2. Obserwacja pod kątem zespołu porefuzyjnego (hiperkaliemia, kwasica, wstrząs wazoplegiczny).<br>3. Monitorowanie powikłań pooperacyjnych: nieszczelność zespolenia, krwawienie po heparynie.<br>4. Bezwzględne wdrożenie przewlekłej antykoagulacji doustnej (DOAC lub VKA) do końca życia przed wypisem ze szpitala."
  },
  lekQuestions: [
    {
      question: "Dramatycznie silny ból brzucha u pacjenta z migotaniem przedsionków, przy uderzająco ubogim obrazie w badaniu fizykalnym (brzuch miękki, bez obrony mięśniowej i bez objawów otrzewnowych), jest klasycznym obrazem:",
      options: [
        "Ostrego niedokrwienia krezki (zatoru tętnicy krezkowej górnej – SMA)",
        "Perforacji wrzodu dwunastnicy",
        "Ostrego ropowiczego zapalenia wyrostka robaczkowego",
        "Pęknięcia śledziony",
        "Wrzodziejącego zapalenia jelita grubego"
      ],
      correct: 0,
      expl: "Klasyczna dysocjacja kliniczna (ból nieproporcjonalnie potężny w porównaniu z brakiem odchyleń w badaniu palpacyjnym brzucha) u pacjenta z czynnikiem ryzyka zatorowości (np. migotaniem przedsionków) jest podręcznikowym i najbardziej charakterystycznym objawem ostrego niedokrwienia krezki w pierwszych godzinach od zatoru SMA."
    },
    {
      question: "Badaniem obrazowym z wyboru ('złotym standardem') w diagnostyce podejrzenia ostrego niedokrwienia krezki jest:",
      options: [
        "Angiografia tomografii komputerowej (Angio-TK) jamy brzusznej z fazą tętniczą i żylną",
        "Przeglądowe zdjęcie rentgenowskie jamy brzusznej na stojąco",
        "Klasyczna kolonoskopia z biopsją śluzówki",
        "Ultrasonografia jamy brzusznej bez opcji naczyniowej",
        "Scyntygrafia z użyciem znakowanych krwinek białych"
      ],
      correct: 0,
      expl: "Angio-TK jamy brzusznej i miednicy (wieloowocowa tomografia z dożylnym kontrastem w fazie naczyniowej) cechuje się czułością i swoistością przekraczającą 95%. Pozwala bezpośrednio uwidocznić skrzeplinę/zator w pniu i gałęziach SMA, ocenić ścianę jelita (brak wzmocnienia, obrzęk) oraz wykluczyć inne przyczyny ostrego brzucha."
    },
    {
      question: "Najczęstszym źródłem materiału zatorowego w ostrym zatorze tętnicy krezkowej górnej (SMA) jest:",
      options: [
        "Skrzeplina powstała w lewym przedsionku (lub uszku lewego przedsionka) w przebiegu migotania przedsionków",
        "Skrzeplina z żył głębokich kończyn dolnych (DVT)",
        "Blaszka miażdżycowa z tętnicy promieniowej",
        "Kamień żółciowy z pęcherzyka",
        "Kłaczek bakteryjny z pęcherza moczowego"
      ],
      correct: 0,
      expl: "Około 50% przypadków ostrego niedokrwienia krezki wynika z zatoru tętniczego. W ponad 80-90% materiał zatorowy pochodzi z jam lewego serca – najczęściej ze skrzepliny uformowanej w uszku lewego przedsionka u pacjentów z migotaniem przedsionków (AF) lub ze skrzepliny przyściennej lewej komory po zawale serca."
    },
    {
      question: "Który parametr laboratoryjny w surowicy krwi ma największe znaczenie w monitorowaniu zaawansowania niedotlenienia tkanek i zawału ściany jelita w ostrym niedokrwieniu krezki?",
      options: [
        "Stężenie kwasu mlekowego (mleczanów) w gazometrii",
        "Stężenie bilirubiny całkowitej",
        "Aktywność fosfatazy zasadowej (ALP)",
        "Stężenie cholesterolu frakcji LDL",
        "Poziom witaminy B12"
      ],
      correct: 0,
      expl: "Mleczany we krwi tętniczej są najważniejszym wskaźnikiem niedokrwienia beztlenowego tkanek. Wzrost stężenia kwasu mlekowego (>2-3 mmol/l) w połączeniu z kwasicą metaboliczną i wysoką luką anionową koreluje z głębokością uszkodzenia enterocytów i martwicą ściany jelita."
    },
    {
      question: "Podstawowym zabiegiem chirurgicznym z wyboru w celu przywrócenia ukrwienia jelita w ostrym zatorze tętnicy krezkowej górnej jest:",
      options: [
        "Embolektomia chirurgiczna tętnicy krezkowej górnej cewnikiem Fogarty'ego",
        "Całkowite wycięcie żołądka z zespoleniem Roux-en-Y",
        "Apendektomia laparoskopowa",
        "Splenektomia z podwiązaniem pnia trzewnego",
        "Kolektomia całkowita bez rewaskularyzacji tętniczej"
      ],
      correct: 0,
      expl: "Zabiegiem z wyboru w zatorowości SMA jest otwarcie pnia naczynia (arteriotomia) i usunięcie materiału zatorowego za pomocą cewnika balonowego Fogarty'ego (embolektomia). Przywrócenie przepływu tętniczego w pierwszych godzinach pozwala na uratowanie pętli jelita cienkiego przed martwicą."
    },
    {
      question: "Na czym polega i jaki jest cel procedury 'second-look laparotomy' w leczeniu ostrego niedokrwienia krezki?",
      options: [
        "Na zaplanowanej relaparotomii po 24-48 godzinach od pierwotnej operacji celem ostatecznej oceny żywotności pętli jelitowych i oszczędzającej resekcji jedynie tych odcinków, które definitywnie obumarły",
        "Na wykonaniu tomografii komputerowej głowy w drugiej dobie",
        "Na pobraniu wycinków ze skóry brzucha po 48 godzinach",
        "Na planowym usunięciu wyrostka robaczkowego u każdego chorego",
        "Na rutynowym zamknięciu powłok brzusznych bez zaglądania do jelit"
      ],
      correct: 0,
      expl: "Relaparotomia 'second-look' wykonywana planowo po 24-48 h od rewaskularyzacji jest standardem postępowania. Pozwala na ponowną ocenę granicy martwicy po ustąpieniu obrzęku porefuzyjnego. Dzięki temu unika się wycinania jelit na zapas (ochrona przed zespołem krótkiego jelita), jak i nie pozostawia martwicy grożącej perforacją."
    },
    {
      question: "Objaw tzw. 'stolców o wyglądzie galaretki porzeczkowej' w ostrym niedokrwieniu krezki u dorosłego świadczy o:",
      options: [
        "Zaawansowanym niedokrwieniu z martwicą i złuszczaniem błony śluzowej jelita oraz przesiąkaniem krwi do światła",
        "Wyleczeniu zatoru i regeneracji nabłonka jelitowego",
        "Spożyciu owoców leśnych w poprzednim dniu",
        "Obecności polipa odbytnicy",
        "Zakażeniu rotawirusem"
      ],
      correct: 0,
      expl: "Pojawienie się ciemnoczerwonego, krwisto-śluzowego stolca o wyglądzie galaretki porzeczkowej (currant jelly stool) w przebiegu ostrego niedokrwienia krezki jest późnym objawem martwicy śluzówki jelita. Wskazuje na głębokie uszkodzenie bariery naczyniowo-nabłonkowej i złuszczanie martwiczych tkanek."
    },
    {
      question: "Obecność gazu w ścianie jelita (pneumatosis intestinalis) oraz gazu w gałęziach żyły wrotnej (aeroportia / portal venous gas) w tomografii komputerowej u chorego z niedokrwieniem krezki oznacza:",
      options: [
        "Zaawansowaną, nieodwracalną martwicę zgorzelinową pełnej grubości ściany jelita i skrajnie złe rokowanie",
        "Prawidłowy stan fizjologiczny trawienia gazów",
        "Początkową odwracalną fazę niedotlenienia",
        "Przedawkowanie leków zobojętniających kwas solny",
        "Cechę wyleczenia zakażenia bakteryjnego"
      ],
      correct: 0,
      expl: "Pneumatoza śródścienna (obecność pęcherzyków gazu w ścianie jelita) oraz obecność gazu w dorzeczu żyły wrotnej (portal venous gas) to późne, złowróżbne radiologiczne objawy martwicy zgorzelinowej ściany jelita. Wynikają z utraty integralności śluzówki i wnikania gazotwórczych bakterii jelitowych bezpośrednio do żyłek krezkowych i układu wrotnego."
    },
    {
      question: "Jaki lek należy wdrożyć natychmiast dożylnie w trybie pilnym po wysunięciu klinicznego podejrzenia ostrego niedokrwienia krezki?",
      options: [
        "Heparynę niefrakcjonowaną (UFH) w bolusie dożylnym i wlewie ciągłym",
        "Doustny diklofenak w wysokiej dawce",
        "Kwas traneksamowy dożylnie",
        "Witaminę K podskórnie",
        "Leki obkurczające naczynia krezkowe (wazopresynę)"
      ],
      correct: 0,
      expl: "Natychmiastowe podanie heparyny niefrakcjonowanej (UFH) w bolusie i.v. i wlewie ciągłym jest obowiązkowym elementem wstępnej terapii AMI. Heparyna hamuje rozprzestrzenianie się zakrzepu w mikrokrążeniu krezkowym obwodowo od zatoru, zapobiegając nieodwracalnemu zawałowi kolejnych metrów jelita."
    },
    {
      question: "Nieokluzyjne niedokrwienie krezki (NOMI – Non-Occlusive Mesenteric Ischemia) rozwija się typowo w mechanizmie:",
      options: [
        "Uogólnionego, odruchowego skurczu naczyń krezkowych w odpowiedzi na ciężką hipowolemię, wstrząs lub stosowanie wysokich dawek leków wazopresyjnych (np. amin katecholowych)",
        "Mechanicznego zatkania pnia aorty przez tasiemca",
        "Wrodzonego braku tętnicy krezkowej dolnej",
        "Udarowego uszkodzenia kory mózgowej",
        "Użądlenia przez pszczołę w okolicy pępka"
      ],
      correct: 0,
      expl: "NOMI (Non-Occlusive Mesenteric Ischemia) odpowiada za ok. 20% przypadków ostrego niedokrwienia jelit. Rozwija się bez obecności zatoru czy zakrzepu w pniu tętniczym – przyczyną jest ciężki, przetrwały skurcz tętniczek krezkowych w warunkach hipoperfuzji (wstrząs kardiogenny/septyczny, niewydolność krążenia, duże dawki noradrenaliny/adrenaliny)."
    },
    {
      question: "U pacjenta z ostrym niedokrwieniem krezki tętnica krezkowa górna (SMA) najczęściej ulega zablokowaniu przez zator:",
      options: [
        "Około 3 do 8 cm od odejścia od aorty brzusznej, dystalnie od odejścia tętnicy okrężniczej środkowej",
        "W samym ujściu z aorty z całkowitym zablokowaniem pnia trzewnego",
        "Wyłącznie w naczyniach włosowatych wyrostka robaczkowego",
        "W pniu tętnicy krezkowej dolnej",
        "W tętnicach wieńcowych serca"
      ],
      correct: 0,
      expl: "Anatomicznie pień SMA zwęża się stożkowato dystalnie od odejścia pierwszych gałęzi (tętnicy trzustkowo-dwunastniczej dolnej i tętnicy okrężniczej środkowej). Dlatego zatory najczęściej więzną 3-8 cm od aorty, co sprawia, że proksymalne jelito czcze oraz poprzecznica bywają często oszczędzone, a zawałowi ulega dalsze jelito cienkie i prawa okrężnica."
    }
  ],
  flashcards: [
    {
      front: "Co to jest dysocjacja kliniczna w ostrym niedokrwieniu krezki (zatorze SMA)?",
      back: "Potworny, rozdzierający ból brzucha (10/10) przy uderzająco ubogim obrazie w badaniu palpacyjnym (brzuch miękki, bez obrony i objawów otrzewnowych). Czekanie na twardy brzuch to czekanie na martwicę!"
    },
    {
      front: "Jakie badanie obrazowe jest 'złotym standardem' w ostrym niedokrwieniu krezki?",
      back: "Angio-TK jamy brzusznej i miednicy z fazą tętniczą i żylną (czułość >95%) – uwidacznia zator w pniu SMA i brak perfuzji ściany jelita."
    },
    {
      front: "Jaki jest najczęstszy czynnik ryzyka i przyczyna zatorowości SMA?",
      back: "Migotanie przedsionków (AF) bez prawidłowej antykoagulacji – skrzeplina z uszka lewego przedsionka urywa się i wpada w pień tętnicy krezkowej górnej."
    },
    {
      front: "Na czym polega koncepcja 'second-look laparotomy' po embolektomii SMA?",
      back: "Zaplanowana relaparotomia po 24-48 godzinach w celu ostatecznej weryfikacji żywotności pętli jelitowych i oszczędzającej resekcji tylko odcinków z nieodwracalną martwicą (ochrona przed zespołem krótkiego jelita)."
    },
    {
      front: "Co oznacza obecność kwasicy mleczanowej (mleczany >3-5 mmol/l) w podejrzeniu zatoru SMA?",
      back: "Świadczy o zaawansowanym metabolizmie beztlenowym i obumieraniu komórek ściany jelita (zawał/martwica enterocytów). Wymaga natychmiastowej operacji ratunkowej."
    },
    {
      front: "Jaki lek należy wdrożyć natychmiast dożylnie po powzięciu podejrzenia ostrego niedokrwienia krezki?",
      back: "Heparynę niefrakcjonowaną (UFH) w bolusie 5000 j.m. i.v. i wlewie ciągłym – zapobiega propagacji skrzepliny w mikrokrążeniu krezkowym."
    }
  ]
};

// Mirror fields for schema compatibility
case133.steps.forEach(step => {
  step.question = step.title;
  step.explanation = step.feedback;
});
case133.lekQuestions.forEach(q => {
  q.opts = q.options;
  q.correctIdx = q.correct;
  q.exp = q.expl;
});

saveCase(case133);

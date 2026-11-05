const fs = require('fs');
const path = require('path');
const { encryptStringAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

const casesData = [
  // =========================================================================
  // CASE 156: Pęknięcie Torbieli Jajnika / Krwiak dootrzewnowy
  // =========================================================================
  {
    id: 156,
    file: "156_pekniecie_torbieli_jajnika.json",
    shortTitle: "Pęknięcie Torbieli Jajnika",
    title: "Ostry Brzuch Ginekologiczny: Pęknięcie Torbieli Ciałka Żółtego z Krwawieniem Dootrzewnowym",
    dept: "Ginekologia i Położnictwo",
    diagnosisTitle: "Krwawienie Dootrzewnowe w przebiegu Pęknięcia Torbieli Ciałka Żółtego (Haemoperitoneum)",
    vitals: [
      { label: "Ciśnienie tętnicze (RR)", val: "90/60", unit: "mmHg", status: "vital-warn" },
      { label: "Częstość akcji serca (HR)", val: "115", unit: "/min", status: "vital-warn" },
      { label: "Częstość oddechów (RR)", val: "20", unit: "/min", status: "vital-ok" },
      { label: "Saturacja (SpO2)", val: "97", unit: "%", status: "vital-ok" },
      { label: "Temperatura ciała", val: "36.8", unit: "°C", status: "vital-ok" }
    ],
    story: "<p><strong>Pacjent:</strong> 22-letnia kobieta zgłasza się na SOR z powodu nagłego, ostrego bólu w podbrzuszu, który wystąpił bezpośrednio po stosunku płciowym.</p><p><strong>Wywiad chorobowy:</strong> Ból rozpoczął się nagle 2 godziny temu, ma charakter stały, kłujący, nasila się przy zmianie pozycji ciała i promieniuje do prawej łopatki (objaw Kehra) oraz w kierunku odbytnicy. Towarzyszą mu zawroty głowy, uczucie zimnego potu i nudności. Pacjentka jest w 21. dniu 28-dniowego cyklu miesiączkowego. Nie stosuje antykoncepcji hormonalnej, nie choruje przewlekle.</p><p><strong>Badanie przedmiotowe:</strong> Pacjentka blada, powłoki chłodne. Brzuch wzdęty, z wyraźną obroną mięśniową i dodatnim objawem Blumberga w podbrzuszu, bardziej wyrażonym po stronie prawej. W badaniu ginekologicznym we wziernikach: śluzówka blada, brak krwawienia z ujścia zewnętrznego szyjki macicy. W badaniu dwuręcznym: skrajna bolesność przy poruszaniu szyjką macicy ('objaw lalki'), tylne sklepienie pochwy jest wygórowane, bolesne, ciastowate (uwypuklenie zagłębienia odbytniczo-macicznego krwią).</p>",
    steps: [
      {
        title: "Krok 1: Wstępna stabilizacja hemodynamiczna i kluczowy test wykluczający",
        scenario: "Pacjentka prezentuje cechy wstrząsu hipowolemicznego (RR 90/60 mmHg, HR 115/min), objawy otrzewnowe i uwypuklenie zatoki Douglasa. Jaki jest priorytet resuscytacyjny i pierwsze bezwzględne badanie diagnostyczne?",
        options: [
          {
            text: "Kaniulacja 2 dużych żył, przetoczenie krystaloidów, pobranie krwi na morfologię, grupę i próbę krzyżową oraz natychmiastowe wykonanie testu beta-hCG z moczu lub surowicy",
            correct: true,
            isCorrect: true,
            feedback: "✅ PRAWIDŁOWO! Podstawowym obowiązkiem lekarza u każdej kobiety w wieku rozrodczym z ostrym brzuchem i krwawieniem dootrzewnowym jest wykluczenie pękniętej ciąży ektopowej (GEU) poprzez test beta-hCG. Równolegle niezbędna jest płynoterapia przeciwwstrząsowa."
          },
          {
            text: "Podanie dożylne 100 mg furosemidu w celu odbarczenia płynu z jamy otrzewnej drogą nasilonej diurezy",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Furosemid u pacjentki we wstrząsie hipowolemicznym wywoła natychmiastową zapaść krążeniową."
          },
          {
            text: "Zlecenie wlewu doodbytniczego z barytu w celu wykluczenia wgłobienia kątniczo-krętniczego",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Wlew barytowy przy objawach otrzewnowych jest bezwzględnie przeciwwskazany."
          },
          {
            text: "Wypisanie do domu z zaleceniem odpoczynku i kontroli w poradni po wystąpieniu krwawienia miesiączkowego",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Krwawienie dootrzewnowe z objawami wstrząsu jest stanem zagrożenia życia."
          }
        ]
      },
      {
        title: "Krok 2: Badanie obrazowe z wyboru (USG i protokół FAST)",
        scenario: "Test beta-hCG jest ujemny (<1 mIU/ml). Morfologia: Hb 9,2 g/dl (spadek z 12,5 g/dl sprzed miesiąca), Hct 28%. Jaka procedura obrazowa przyłóżkowa pozwoli potwierdzić obecność płynu w jamie otrzewnej i zlokalizować źródło krwawienia?",
        options: [
          {
            text: "Ultrasonografia przezpochwowa (TVS) połączona z przezbrzusznym badaniem FAST oceniającym zachyłek Morrisona i jamę Douglasa",
            correct: true,
            isCorrect: true,
            feedback: "✅ PRAWIDŁOWO! TVS pozwala uwidocznić obkurczoną lub pękniętą torbiel ciałka żółtego o nieregularnych, pogrubiałych ścianach z siateczkowatym echem wewnętrznym oraz obecność płynu o mieszanej echogeniczności (krew ze skrzepami) w jamie Douglasa. Badanie FAST potwierdza obecność wolnej krwi w jamie otrzewnej."
          },
          {
            text: "Przeglądowe zdjęcie RTG klatki piersiowej i jamy brzusznej na stojąco w poszukiwaniu zatorowości",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! RTG nie uwidacznia krwi w miednicy ani zmian w jajnikach."
          },
          {
            text: "Wykonanie tomografii emisyjnej pojedynczych fotonów (SPECT) miednicy mniejszej",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Badania radioizotopowe nie mają zastosowania w stanach nagłych ginekologii."
          },
          {
            text: "Zlecenie histeroskopii diagnostycznej z biopsją błony śluzowej trzonu macicy",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Źródło krwawienia znajduje się w jamie otrzewnej, a nie w świetle jamy macicy."
          }
        ]
      },
      {
        title: "Krok 3: Kwalifikacja do leczenia i wskazania operacyjne",
        scenario: "W USG stwierdzono pękniętą torbiel prawego jajnika o średnicy 4 cm oraz obecność ok. 500–600 ml płynu w zatoce Douglasa i przestrzeni okołopęcherzowej. W kontrolnej morfologii po 1 godzinie Hb spada do 8,4 g/dl, ciśnienie wynosi 85/55 mmHg mimo przetoczenia 1000 ml krystaloidów. Jaka jest właściwa decyzja terapeutyczna?",
        options: [
          {
            text: "Pilna laparoskopia zwiadowcza w celu chirurgicznego zaopatrzenia miejsca krwawienia i ewakuacji krwiaka z otrzewnej",
            correct: true,
            isCorrect: true,
            feedback: "✅ PRAWIDŁOWO! Niestabilność hemodynamiczna, postępujący spadek hemoglobiny oraz cechy aktywnego krwawienia dootrzewnowego są bezwzględnym wskazaniem do natychmiastowej interwencji operacyjnej (laparoskopii). Postępowanie zachowawcze jest możliwe wyłącznie u chorych w pełni stabilnych z minimalnym krwiakiem."
          },
          {
            text: "Kontynuacja wyczekiwania zachowawczego na oddziale obserwacyjnym przez kolejne 24–48 godzin bez podawania leków",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Niestabilność hemodynamiczna i postępujący spadek Hb nakazują natychmiastową hemostazę chirurgiczną."
          },
          {
            text: "Podanie doustnej antykoncepcji dwuskładnikowej w dawce 4 tabletek na dobę w celu zatrzymania owulacji",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Doustna antykoncepcja jest metodą profilaktyki wtórnej, a nie leczenia ostrego krwotoku dootrzewnowego."
          },
          {
            text: "Zastosowanie zewnętrznego masażu powłok brzusznych z uciskiem na prawy jajnik",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Mechaniczny ucisk na krwawiący jajnik nasili wynaczynienie i rozerwie torebkę narządu."
          }
        ]
      },
      {
        title: "Krok 4: Taktyka operacyjna zachowująca płodność",
        scenario: "Podczas laparoskopii odessano 650 ml krwi i skrzepów. W biegunie prawego jajnika widoczna jest 3-centymetrowa pęknięta torbiel ciałka żółtego ze stale sączącym się naczyniem na brzegu pęknięcia. Jaka technika chirurgiczna jest optymalna u młodej pacjentki?",
        options: [
          {
            text: "Selektywna koagulacja bipolarna krwawiącego brzegu torbieli (lub założenie hemostatycznego szwu wchłanialnego), płukanie otrzewnej i oszczędzenie miąższu jajnika",
            correct: true,
            isCorrect: true,
            feedback: "✅ PRAWIDŁOWO! Standardem jest maksymalne oszczędzanie tkanki jajnika u młodych kobiet. Koagulacja bipolarna, zastosowanie miejscowych materiałów hemostatycznych lub pojedynczego szwu pozwala skutecznie zaopatrzyć krwawienie bez konieczności wycinania jajnika (ooforiektomii)."
          },
          {
            text: "Całkowite usunięcie przydatków prawych (ooforosalpingektomia) wraz z prawostronną limfadenektomią",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Wycięcie przydatków przy łagodnym krwawieniu z ciałka żółtego jest nieuzasadnionym okaleczeniem pacjentki."
          },
          {
            text: "Wstrzyknięcie czystego alkoholu etylowego do wnętrza jajnika w celu stwardnienia naczyń",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Alkohol spowoduje martwicę chemiczną całego narządu i chemiczne zapalenie otrzewnej."
          },
          {
            text: "Pozostawienie czynnie krwawiącego naczynia bez hemostazy z założeniem samego drenu Redona",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Pozostawienie aktywnego krwawienia doprowadzi do dalszego wykrwawienia pacjentki."
          }
        ]
      }
    ],
    pathoNodes: [
      {
        title: "Intensywne unaczynienie ciałka żółtego w fazie lutealnej",
        desc: "Po owulacji pod wpływem LH i naczyniowego czynnika wzrostu (VEGF) dochodzi do gwałtownego tworzenia sieci naczyń włosowatych w ścianie ciałka żółtego.",
        detail: "Nowo powstałe naczynia cechują się wysokim przepływem, cienką ścianą i skłonnością do mikrowylewów krwi do wnętrza ciałka żółtego, tworząc fizjologiczną torbiel ciałka żółtego (corpus luteum cyst).",
        target: "Punkt uchwytu leczenia i profilaktyki: Profilaktyczne zahamowanie owulacji tabletkami antykoncepcyjnymi dwuskładnikowymi u kobiet z nawrotowymi torbielami krwotocznymi."
      },
      {
        title: "Mechaniczne pęknięcie ściany torbieli i naczynia krwionośnego",
        desc: "Wzrost ciśnienia śródbrzusznego (stosunek płciowy, wysiłek fizyczny, uraz) powoduje rozerwanie cienkiej torebki torbieli.",
        detail: "Rozerwanie naczynia tętniczego splotu jajnikowego prowadzi do niekontrolowanego wynaczynienia krwi do jamy otrzewnej (haemoperitoneum). U pacjentek przyjmujących antykoagulanty krwawienie może być masywne.",
        target: "Punkt uchwytu diagnostyki i leczenia: Oznaczenie morfologii, koagulogramu i pilna hemostaza laparoskopowa."
      },
      {
        title: "Hemoperitoneum, podrażnienie otrzewnej i wstrząs hipowolemiczny",
        desc: "Krew wynaczyniona do jamy otrzewnej drażni otrzewną ścienną i trzewną, wywołując ból i odczyn otrzewnowy.",
        detail: "Przemieszczanie się krwi pod przeponę drażni zakończenia nerwu przeponowego (C3–C5), wyzwalając ból rzutowany do barku (objaw Kehra). Utrata krwi powyżej 500–1000 ml prowadzi do dekompensacji krążeniowej.",
        target: "Punkt uchwytu leczenia: Agresywna płynoterapia, przetoczenie KKCz i selektywna hemostaza chirurgiczna."
      }
    ],
    dutySummary: {
      overview: "Pęknięcie torbieli ciałka żółtego to jedna z najczęstszych przyczyn krwawienia dootrzewnowego u młodych, aktywnych seksualnie kobiet w fazie lutealnej cyklu. Objawia się nagłym bólem brzucha (często po koitusie) i objawami otrzewnowymi. Kluczowe jest różnicowanie z pękniętą ciążą pozamaciczną.",
      diagnostics: "1. Oznaczenie beta-hCG w moczu lub surowicy krwi – bezwzględny priorytet wykluczający ciążę ektopową!\n\n2. Ultrasonografia przezpochwowa (TVS) połączona z USG FAST: ocena jajnika, grubości ściany torbieli i obecności wolnego płynu/skrzepów w zatoce Douglasa i jamie otrzewnej.\n\n3. Badania laboratoryjne: morfologia krwi (dynamika hematokrytu i hemoglobiny), koagulogram, grupa krwi i próba krzyżowa.\n\n4. Monitorowanie ciśnienia tętniczego i tętna w celu oceny stabilności hemodynamicznej.",
      drugsAndDoses: "• <span class=\"dose-pill\">Płynoterapia: 1000–2000 ml zbilansowanych krystaloidów i.v.</span> w celu stabilizacji wolemii.\n• W razie niestabilności i Hb <7–8 g/dl: <span class=\"dose-pill\">Koncentrat Krwinek Czerwonych (KKCz): 2 j. i.v.</span> po próbie zgodności.\n• Leki przeciwbólowe: <span class=\"dose-pill\">Paracetamol: 1000 mg i.v.</span> lub metamizol 1000 mg i.v., w razie silnego bólu <span class=\"dose-pill\">Morfina: 2–5 mg i.v.</span> miareczkowana.\n• Profilaktyka wtórna po wyleczeniu: <span class=\"dose-pill\">Doustna antykoncepcja dwuskładnikowa (DTA): 1 tabl./dobę</span> w celu supresji owulacji.",
      procedures: "Laparoskopia zwiadowcza w trybie pilnym przy niestabilności hemodynamicznej lub postępującym spadku hemoglobiny: ewakuacja krwiaka, koagulacja bipolarna miejsca krwawienia lub założenie szwu hemostatycznego, toaleta jamy otrzewnej.",
      monitoring: "Kontrola parametrów życiowych (RR, HR) co 15–30 minut, seryjne oznaczanie morfologii krwi (Hb/Hct) co 4–6 godzin w przypadku wstępnego leczenia zachowawczego."
    },
    diffTable: {
      title: "⚔️ Tabela Różnicowa: Pęknięcie Torbieli Jajnika vs Ciąża Pozamaciczna vs Skręt Przydatków vs Zapalenie Wyrostka Robaczkowego",
      headers: ["Cecha kliniczna", "Pęknięcie Torbieli (Ruptura)", "Ciąża Pozamaciczna (GEU)", "Skręt Przydatków (Torsio)", "Zapalenie Wyrostka"],
      rows: [
        ["Faza cyklu / wywiad", "Faza lutealna (20–26. dzień cyklu), po stosunku", "Zatrzymanie miesiączki o 6–8 tygodni", "Dowolny dzień cyklu, po wysiłku/skoku", "Niezależne od cyklu, ból narasta powoli"],
        ["Poziom beta-hCG", "CAŁKOWICIE UJEMNY (<1–5 mIU/ml)", "DODATNI (obecna w surowicy)", "Ujemny", "Ujemny"],
        ["Obraz w badaniu USG", "Pęknięta torbiel ciałka żółtego, płyn w miednicy", "Pusta jama macicy, zmiana w jajowodzie ('ring of fire')", "Powiększony obrzęknięty jajnik, objaw wiru", "Niekontraktilny wyrostek >6 mm"],
        ["Charakter bólu", "Nagły, ostry po koitusie, stały", "Nagły, skurczowy, jednostronny z omdleniem", "Nagły, skurczowy z wymiotami (80%)", "Tępy w nadbrzuszu przechodzący w dół prawy"],
        ["Wstrząs hipowolemiczny", "Możliwy przy masywnym krwawieniu", "Bardzo częsty po pęknięciu jajowodu", "Nie występuje (chyba że martwica/sepsa)", "Nie występuje (wstrząs septyczny w perforacji)"],
        ["Leczenie pierwszego wyboru", "Zachowawcze (jeśli stabilna) lub laparoskopia", "Laparoskopia / metotreksat", "Pilna laparoskopia z odkręceniem", "Laparoskopowa appendektomia"]
      ]
    },
    lekQuestions: [
      {
        q: "Który pojedynczy parametr laboratoryjny jest NAJWAŻNIEJSZYM elementem różnicowania ostrego krwawienia dootrzewnowego u kobiety w wieku rozrodczym pomiędzy pęknięciem torbieli ciałka żółtego a pęknięciem ciąży jajowodowej?",
        question: "Który pojedynczy parametr laboratoryjny jest NAJWAŻNIEJSZYM elementem różnicowania ostrego krwawienia dootrzewnowego u kobiety w wieku rozrodczym pomiędzy pęknięciem torbieli ciałka żółtego a pęknięciem ciąży jajowodowej?",
        opts: [
          "A) Stężenie podjednostki beta gonadotropiny kosmówkowej (beta-hCG) w surowicy lub moczu",
          "B) Aktywność dehydrogenazy mleczanowej (LDH) w osoczu krwi żylnej",
          "C) Poziom białka C-reaktywnego (CRP) oznaczany metodą turbidymetryczną",
          "D) Całkowita liczba krwinek białych (leukocytoza) w rozmazie automatycznym",
          "E) Stężenie elektrolitów sodu i potasu w surowicy krwi obwodowej"
        ],
        options: [
          "A) Stężenie podjednostki beta gonadotropiny kosmówkowej (beta-hCG) w surowicy lub moczu",
          "B) Aktywność dehydrogenazy mleczanowej (LDH) w osoczu krwi żylnej",
          "C) Poziom białka C-reaktywnego (CRP) oznaczany metodą turbidymetryczną",
          "D) Całkowita liczba krwinek białych (leukocytoza) w rozmazie automatycznym",
          "E) Stężenie elektrolitów sodu i potasu w surowicy krwi obwodowej"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Pęknięcie torbieli ciałka żółtego i pęknięcie ciąży ektopowej mogą dawać identyczny obraz kliniczny (nagły ból brzucha, hemoperitoneum, wstrząs hipowolemiczny). Jedynym pewnym testem różnicującym w trybie pilnym jest oznaczenie beta-hCG: w ciąży ektopowej wynik jest dodatni, w pęknięciu torbieli ciałka żółtego całkowicie ujemny.",
        expl: "Prawidłowo! Pęknięcie torbieli ciałka żółtego i pęknięcie ciąży ektopowej mogą dawać identyczny obraz kliniczny (nagły ból brzucha, hemoperitoneum, wstrząs hipowolemiczny). Jedynym pewnym testem różnicującym w trybie pilnym jest oznaczenie beta-hCG: w ciąży ektopowej wynik jest dodatni, w pęknięciu torbieli ciałka żółtego całkowicie ujemny.",
        explanation: "Prawidłowo! Pęknięcie torbieli ciałka żółtego i pęknięcie ciąży ektopowej mogą dawać identyczny obraz kliniczny (nagły ból brzucha, hemoperitoneum, wstrząs hipowolemiczny). Jedynym pewnym testem różnicującym w trybie pilnym jest oznaczenie beta-hCG: w ciąży ektopowej wynik jest dodatni, w pęknięciu torbieli ciałka żółtego całkowicie ujemny."
      },
      {
        q: "Co oznacza wystąpienie tzw. objawu Kehra u pacjentki z krwawieniem dootrzewnowym po pęknięciu torbieli jajnika?",
        question: "Co oznacza wystąpienie tzw. objawu Kehra u pacjentki z krwawieniem dootrzewnowym po pęknięciu torbieli jajnika?",
        opts: [
          "A) Ból w lewym (lub prawym) barku wywołany podrażnieniem nerwu przeponowego przez krew pod przeponą",
          "B) Bolesność przy opukiwaniu okolicy lędźwiowej związana z zastojem moczu w nerce",
          "C) Zasinienie wokół pępka wynikające z podskórnej penetracji enzymów trzustkowych",
          "D) Nasilenie bólu podbrzusza podczas prostowania kończyny dolnej w stawie kolanowym",
          "E) Zanik tętnienia na tętnicy grzbietowej stopy wywołany uciskiem krwiaka"
        ],
        options: [
          "A) Ból w lewym (lub prawym) barku wywołany podrażnieniem nerwu przeponowego przez krew pod przeponą",
          "B) Bolesność przy opukiwaniu okolicy lędźwiowej związana z zastojem moczu w nerce",
          "C) Zasinienie wokół pępka wynikające z podskórnej penetracji enzymów trzustkowych",
          "D) Nasilenie bólu podbrzusza podczas prostowania kończyny dolnej w stawie kolanowym",
          "E) Zanik tętnienia na tętnicy grzbietowej stopy wywołany uciskiem krwiaka"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Objaw Kehra polega na wystąpieniu ostrego bólu w okolicy barku przy obecności krwi w jamie otrzewnej. Wynika to z drażnienia dolnej powierzchni przepony (unerwianej przez nerw przeponowy pochodzący z segmentów C3–C5 rdzenia), co daje ból rzutowany w dermatomach C3–C4 obejmujących okolicę barku i obojczyka.",
        expl: "Prawidłowo! Objaw Kehra polega na wystąpieniu ostrego bólu w okolicy barku przy obecności krwi w jamie otrzewnej. Wynika to z drażnienia dolnej powierzchni przepony (unerwianej przez nerw przeponowy pochodzący z segmentów C3–C5 rdzenia), co daje ból rzutowany w dermatomach C3–C4 obejmujących okolicę barku i obojczyka.",
        explanation: "Prawidłowo! Objaw Kehra polega na wystąpieniu ostrego bólu w okolicy barku przy obecności krwi w jamie otrzewnej. Wynika to z drażnienia dolnej powierzchni przepony (unerwianej przez nerw przeponowy pochodzący z segmentów C3–C5 rdzenia), co daje ból rzutowany w dermatomach C3–C4 obejmujących okolicę barku i obojczyka."
      },
      {
        q: "Kiedy dopuszczalne jest bezpieczne postępowanie ZACHOWAWCZE u pacjentki z pęknięciem torbieli ciałka żółtego i obecnością wolnego płynu w zatoce Douglasa?",
        question: "Kiedy dopuszczalne jest bezpieczne postępowanie ZACHOWAWCZE u pacjentki z pęknięciem torbieli ciałka żółtego i obecnością wolnego płynu w zatoce Douglasa?",
        opts: [
          "A) Wyłącznie przy stabilności hemodynamicznej, stabilnym stężeniu hemoglobiny i łagodnych objawach otrzewnowych",
          "B) W każdym przypadku, niezależnie od wartości ciśnienia tętniczego i stopnia utraty krwi",
          "C) Jedynie wtedy, gdy objętość krwiaka w otrzewnej przekracza 1500 mililitrów",
          "D) Zawsze, gdy stężenie hemoglobiny spada poniżej 6,0 g/dl w ciągu pierwszych 2 godzin",
          "E) Wyłącznie u kobiet po przebytej menopauzie stosujących hormonalną terapię zastępczą"
        ],
        options: [
          "A) Wyłącznie przy stabilności hemodynamicznej, stabilnym stężeniu hemoglobiny i łagodnych objawach otrzewnowych",
          "B) W każdym przypadku, niezależnie od wartości ciśnienia tętniczego i stopnia utraty krwi",
          "C) Jedynie wtedy, gdy objętość krwiaka w otrzewnej przekracza 1500 mililitrów",
          "D) Zawsze, gdy stężenie hemoglobiny spada poniżej 6,0 g/dl w ciągu pierwszych 2 godzin",
          "E) Wyłącznie u kobiet po przebytej menopauzie stosujących hormonalną terapię zastępczą"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Postępowanie zachowawcze (obserwacja, analgezja, nawodnienie i seryjna kontrola morfologii) jest leczeniem z wyboru u pacjentek stabilnych hemodynamicznie, bez cech aktywnego masywnego krwotoku i ze stabilnym poziomem hemoglobiny, ponieważ w większości przypadków krwawienie z ciałka żółtego ustaje samoistnie.",
        expl: "Prawidłowo! Postępowanie zachowawcze (obserwacja, analgezja, nawodnienie i seryjna kontrola morfologii) jest leczeniem z wyboru u pacjentek stabilnych hemodynamicznie, bez cech aktywnego masywnego krwotoku i ze stabilnym poziomem hemoglobiny, ponieważ w większości przypadków krwawienie z ciałka żółtego ustaje samoistnie.",
        explanation: "Prawidłowo! Postępowanie zachowawcze (obserwacja, analgezja, nawodnienie i seryjna kontrola morfologii) jest leczeniem z wyboru u pacjentek stabilnych hemodynamicznie, bez cech aktywnego masywnego krwotoku i ze stabilnym poziomem hemoglobiny, ponieważ w większości przypadków krwawienie z ciałka żółtego ustaje samoistnie."
      },
      {
        q: "Wskaż zestaw twierdzeń PRAWDZIWYCH dotyczących pęknięcia torbieli ciałka żółtego:\n1. Pęknięcie występuje najczęściej w drugiej fazie cyklu miesiączkowego (faza lutealna).\n2. Współistnienie leczenia przeciwkrzepliwego (np. z powodu wady serca) drastycznie zwiększa ryzyko masywnego krwotoku.\n3. Ujemny wynik testu ciążowego beta-hCG wyklucza ciążę pozamaciczną.\n4. Nakłucie zatoki Douglasa przez tylne sklepienie pochwy (kuldocenteza) jest obecnie rutynowym standardem przed USG.\n5. W razie wskazań operacyjnych preferowanym dostępem chirurgicznym jest laparoskopia.",
        question: "Wskaż zestaw twierdzeń PRAWDZIWYCH dotyczących pęknięcia torbieli ciałka żółtego:\n1. Pęknięcie występuje najczęściej w drugiej fazie cyklu miesiączkowego (faza lutealna).\n2. Współistnienie leczenia przeciwkrzepliwego (np. z powodu wady serca) drastycznie zwiększa ryzyko masywnego krwotoku.\n3. Ujemny wynik testu ciążowego beta-hCG wyklucza ciążę pozamaciczną.\n4. Nakłucie zatoki Douglasa przez tylne sklepienie pochwy (kuldocenteza) jest obecnie rutynowym standardem przed USG.\n5. W razie wskazań operacyjnych preferowanym dostępem chirurgicznym jest laparoskopia.",
        opts: [
          "A) 1, 2, 3, 5",
          "B) 1, 2, 4",
          "C) 2, 3, 4, 5",
          "D) 1, 3, 4",
          "E) Tylko 1 i 5"
        ],
        options: [
          "A) 1, 2, 3, 5",
          "B) 1, 2, 4",
          "C) 2, 3, 4, 5",
          "D) 1, 3, 4",
          "E) Tylko 1 i 5"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Zdania 1, 2, 3 i 5 są prawdziwe. Zdanie 4 jest fałszywe: kuldocenteza (igłowe nakłucie zatoki Douglasa) jest procedurą historyczną, która została całkowicie zastąpiona przez nieinwazyjną ultrasonografię (TVS / FAST).",
        expl: "Prawidłowo! Zdania 1, 2, 3 i 5 są prawdziwe. Zdanie 4 jest fałszywe: kuldocenteza (igłowe nakłucie zatoki Douglasa) jest procedurą historyczną, która została całkowicie zastąpiona przez nieinwazyjną ultrasonografię (TVS / FAST).",
        explanation: "Prawidłowo! Zdania 1, 2, 3 i 5 są prawdziwe. Zdanie 4 jest fałszywe: kuldocenteza (igłowe nakłucie zatoki Douglasa) jest procedurą historyczną, która została całkowicie zastąpiona przez nieinwazyjną ultrasonografię (TVS / FAST)."
      },
      {
        q: "Wskaż zdanie FAŁSZYWE dotyczące pęknięcia torbieli jajnika:",
        question: "Wskaż zdanie FAŁSZYWE dotyczące pęknięcia torbieli jajnika:",
        opts: [
          "A) Pęknięcie torbieli pęcherzykowej (folikularnej) wywołuje z reguły masywniejszy krwotok niż pęknięcie ciałka żółtego",
          "B) Pęknięcie torbieli ciałka żółtego występuje typowo między 20. a 26. dniem regularnego cyklu miesiączkowego",
          "C) U pacjentek z nawracającymi krwotocznymi torbielami jajnika zaleca się stosowanie doustnej antykoncepcji hormonalnej",
          "D) Laparoskopowe zaopatrzenie pęknięcia powinno dążyć do zaoszczędzenia zdrowej tkanki jajnika",
          "E) Pęknięcie torbieli dermoidalnej może doprowadzić do ciężkiego chemicznego zapalenia otrzewnej"
        ],
        options: [
          "A) Pęknięcie torbieli pęcherzykowej (folikularnej) wywołuje z reguły masywniejszy krwotok niż pęknięcie ciałka żółtego",
          "B) Pęknięcie torbieli ciałka żółtego występuje typowo między 20. a 26. dniem regularnego cyklu miesiączkowego",
          "C) U pacjentek z nawracającymi krwotocznymi torbielami jajnika zaleca się stosowanie doustnej antykoncepcji hormonalnej",
          "D) Laparoskopowe zaopatrzenie pęknięcia powinno dążyć do zaoszczędzenia zdrowej tkanki jajnika",
          "E) Pęknięcie torbieli dermoidalnej może doprowadzić do ciężkiego chemicznego zapalenia otrzewnej"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Zdanie A jest fałszywe. Torbiel pęcherzykowa (folikularna) ma cienką ścianę i jest słabo unaczyniona – jej pęknięcie daje zazwyczaj mierne objawy i minimalne krwawienie, które ustępuje samoistnie. To torbiel ciałka żółtego, ze względu na bogatą sieć nowo utworzonych naczyń krwionośnych, wywołuje masywne, zagrażające życiu krwawienie dootrzewnowe.",
        expl: "Prawidłowo! Zdanie A jest fałszywe. Torbiel pęcherzykowa (folikularna) ma cienką ścianę i jest słabo unaczyniona – jej pęknięcie daje zazwyczaj mierne objawy i minimalne krwawienie, które ustępuje samoistnie. To torbiel ciałka żółtego, ze względu na bogatą sieć nowo utworzonych naczyń krwionośnych, wywołuje masywne, zagrażające życiu krwawienie dootrzewnowe.",
        explanation: "Prawidłowo! Zdanie A jest fałszywe. Torbiel pęcherzykowa (folikularna) ma cienką ścianę i jest słabo unaczyniona – jej pęknięcie daje zazwyczaj mierne objawy i minimalne krwawienie, które ustępuje samoistnie. To torbiel ciałka żółtego, ze względu na bogatą sieć nowo utworzonych naczyń krwionośnych, wywołuje masywne, zagrażające życiu krwawienie dootrzewnowe."
      },
      {
        q: "Zgodnie z Kodeksem Etyki Lekarskiej i prawem medycznym, w jaki sposób lekarz powinien postąpić, gdy pełnoletnia pacjentka w stanie stabilnym odmawia hospitalizacji po epizodzie pęknięcia torbieli jajnika z niewielkim krwiakiem?",
        question: "Zgodnie z Kodeksem Etyki Lekarskiej i prawem medycznym, w jaki sposób lekarz powinien postąpić, gdy pełnoletnia pacjentka w stanie stabilnym odmawia hospitalizacji po epizodzie pęknięcia torbieli jajnika z niewielkim krwiakiem?",
        opts: [
          "A) Wyjaśnić ryzyko powikłań, poinformować o objawach alarmowych nakazujących natychmiastowy powrót na SOR i odebrać pisemne oświadczenie o odmowie hospitalizacji",
          "B) Wezwać policję i dokonać przymusowego zatrzymania pacjentki na oddziale ginekologii",
          "C) Odmówić wydania jakichkolwiek leków przeciwbólowych i recept w ramach sankcji dyscyplinarnej",
          "D) Przekazać informację o odmowie pracodawcy pacjentki w celu wstrzymania wypłaty wynagrodzenia",
          "E) Wykonać laparoskopię natychmiast bez uprzedzenia pacjentki pod pozorem podania leku uspokajającego"
        ],
        options: [
          "A) Wyjaśnić ryzyko powikłań, poinformować o objawach alarmowych nakazujących natychmiastowy powrót na SOR i odebrać pisemne oświadczenie o odmowie hospitalizacji",
          "B) Wezwać policję i dokonać przymusowego zatrzymania pacjentki na oddziale ginekologii",
          "C) Odmówić wydania jakichkolwiek leków przeciwbólowych i recept w ramach sankcji dyscyplinarnej",
          "D) Przekazać informację o odmowie pracodawcy pacjentki w celu wstrzymania wypłaty wynagrodzenia",
          "E) Wykonać laparoskopię natychmiast bez uprzedzenia pacjentki pod pozorem podania leku uspokajającego"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Pacjentka ma prawo odmówić leczenia szpitalnego. Obowiązkiem lekarza jest rzetelne przedstawienie możliwych następstw (ryzyko nasilenia krwawienia, wstrząsu), wskazanie objawów alarmowych (omdlenie, duszność, silny ból) oraz udokumentowanie odmowy na piśmie zgodnie z Ustawą o prawach pacjenta.",
        expl: "Prawidłowo! Pacjentka ma prawo odmówić leczenia szpitalnego. Obowiązkiem lekarza jest rzetelne przedstawienie możliwych następstw (ryzyko nasilenia krwawienia, wstrząsu), wskazanie objawów alarmowych (omdlenie, duszność, silny ból) oraz udokumentowanie odmowy na piśmie zgodnie z Ustawą o prawach pacjenta.",
        explanation: "Prawidłowo! Pacjentka ma prawo odmówić leczenia szpitalnego. Obowiązkiem lekarza jest rzetelne przedstawienie możliwych następstw (ryzyko nasilenia krwawienia, wstrząsu), wskazanie objawów alarmowych (omdlenie, duszność, silny ból) oraz udokumentowanie odmowy na piśmie zgodnie z Ustawą o prawach pacjenta."
      },
      {
        q: "Dlaczego u pacjentek przewlekle leczonych antagonistami witaminy K (np. warfaryną) lub NOAC ryzyko zgonu w wyniku pęknięcia ciałka żółtego jest szczególnie wysokie?",
        question: "Dlaczego u pacjentek przewlekle leczonych antagonistami witaminy K (np. warfaryną) lub NOAC ryzyko zgonu w wyniku pęknięcia ciałka żółtego jest szczególnie wysokie?",
        opts: [
          "A) Z powodu upośledzenia tworzenia skrzepu w łożysku naczyniowym jajnika, co sprzyja niekontrolowanemu, masywnemu wykrwawieniu do otrzewnej",
          "B) Ponieważ leki te wywołują bezpośrednią martwicę tkanki mózgowej i porażenie oddechu",
          "C) Ze względu na to, że antykoagulanty całkowicie uniemożliwiają wykonanie badania ultrasonograficznego",
          "D) Ponieważ leki te stymulują nadmierne powstawanie estrogenów w korze nadnerczy",
          "E) Z powodu trwałego zablokowania wchłaniania glukozy w jelicie czczym"
        ],
        options: [
          "A) Z powodu upośledzenia tworzenia skrzepu w łożysku naczyniowym jajnika, co sprzyja niekontrolowanemu, masywnemu wykrwawieniu do otrzewnej",
          "B) Ponieważ leki te wywołują bezpośrednią martwicę tkanki mózgowej i porażenie oddechu",
          "C) Ze względu na to, że antykoagulanty całkowicie uniemożliwiają wykonanie badania ultrasonograficznego",
          "D) Ponieważ leki te stymulują nadmierne powstawanie estrogenów w korze nadnerczy",
          "E) Z powodu trwałego zablokowania wchłaniania glukozy w jelicie czczym"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Pęknięcie torbieli ciałka żółtego u pacjentek na antykoagulacji (np. po wszczepieniu mechanicznej zastawki serca) jest stanem skrajnie niebezpiecznym – fizjologiczny proces krzepnięcia nie jest w stanie zahamować krwawienia ze splotu naczyniowego jajnika, co prowadzi do utraty nawet kilku litrów krwi do jamy otrzewnej. U tych kobiet zaleca się profilaktyczną supresję owulacji.",
        expl: "Prawidłowo! Pęknięcie torbieli ciałka żółtego u pacjentek na antykoagulacji (np. po wszczepieniu mechanicznej zastawki serca) jest stanem skrajnie niebezpiecznym – fizjologiczny proces krzepnięcia nie jest w stanie zahamować krwawienia ze splotu naczyniowego jajnika, co prowadzi do utraty nawet kilku litrów krwi do jamy otrzewnej. U tych kobiet zaleca się profilaktyczną supresję owulacji.",
        explanation: "Prawidłowo! Pęknięcie torbieli ciałka żółtego u pacjentek na antykoagulacji (np. po wszczepieniu mechanicznej zastawki serca) jest stanem skrajnie niebezpiecznym – fizjologiczny proces krzepnięcia nie jest w stanie zahamować krwawienia ze splotu naczyniowego jajnika, co prowadzi do utraty nawet kilku litrów krwi do jamy otrzewnej. U tych kobiet zaleca się profilaktyczną supresję owulacji."
      },
      {
        q: "Co jest najskuteczniejszą metodą profilaktyki nawrotów krwotocznych pęknięć ciałka żółtego u młodych kobiet?",
        question: "Co jest najskuteczniejszą metodą profilaktyki nawrotów krwotocznych pęknięć ciałka żółtego u młodych kobiet?",
        opts: [
          "A) Stosowanie doustnej antykoncepcji hormonalnej (np. tabletek dwuskładnikowych) hamującej owulację",
          "B) Profilaktyczne obustronne wycięcie jajników przed ukończeniem 25. roku życia",
          "C) Codzienne wykonywanie irygacji pochwowych z kwasu borowego",
          "D) Suplementacja wysokich dawek witaminy K w drugiej fazie cyklu",
          "E) Bezwzględne unikanie spożywania tłuszczów zwierzęcych przez całe życie"
        ],
        options: [
          "A) Stosowanie doustnej antykoncepcji hormonalnej (np. tabletek dwuskładnikowych) hamującej owulację",
          "B) Profilaktyczne obustronne wycięcie jajników przed ukończeniem 25. roku życia",
          "C) Codzienne wykonywanie irygacji pochwowych z kwasu borowego",
          "D) Suplementacja wysokich dawek witaminy K w drugiej fazie cyklu",
          "E) Bezwzględne unikanie spożywania tłuszczów zwierzęcych przez całe życie"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Doustne tabletki antykoncepcyjne hamują wydzielanie gonadotropin (FSH i LH) przez przysadkę, co całkowicie blokuje dojrzewanie pęcherzyków i owulację. Brak owulacji oznacza brak tworzenia ciałka żółtego, co w 100% eliminuje ryzyko pęknięcia torbieli lutealnej.",
        expl: "Prawidłowo! Doustne tabletki antykoncepcyjne hamują wydzielanie gonadotropin (FSH i LH) przez przysadkę, co całkowicie blokuje dojrzewanie pęcherzyków i owulację. Brak owulacji oznacza brak tworzenia ciałka żółtego, co w 100% eliminuje ryzyko pęknięcia torbieli lutealnej.",
        explanation: "Prawidłowo! Doustne tabletki antykoncepcyjne hamują wydzielanie gonadotropin (FSH i LH) przez przysadkę, co całkowicie blokuje dojrzewanie pęcherzyków i owulację. Brak owulacji oznacza brak tworzenia ciałka żółtego, co w 100% eliminuje ryzyko pęknięcia torbieli lutealnej."
      },
      {
        q: "Jakie jest typowe zabarwienie i wygląd płynu w zatoce Douglasa w badaniu USG u pacjentki ze świeżym krwotokiem dootrzewnowym?",
        question: "Jakie jest typowe zabarwienie i wygląd płynu w zatoce Douglasa w badaniu USG u pacjentki ze świeżym krwotokiem dootrzewnowym?",
        opts: [
          "A) Płyn o niejednorodnej echogeniczności z obecnością hiperechogenicznych pasm włóknika i skrzepów",
          "B) Krystalicznie bezechowy płyn z obecnością cieni akustycznych za ścianą macicy",
          "C) Jednolicie hiperechogeniczna masa o gęstości litej tkanki kostnej",
          "D) Płyn zawierający liczne pęcherzyki gazu tworzące artefakty typu ogona komety",
          "E) Całkowity brak jakiegokolwiek płynu we wszystkich zachyłkach otrzewnej"
        ],
        options: [
          "A) Płyn o niejednorodnej echogeniczności z obecnością hiperechogenicznych pasm włóknika i skrzepów",
          "B) Krystalicznie bezechowy płyn z obecnością cieni akustycznych za ścianą macicy",
          "C) Jednolicie hiperechogeniczna masa o gęstości litej tkanki kostnej",
          "D) Płyn zawierający liczne pęcherzyki gazu tworzące artefakty typu ogona komety",
          "E) Całkowity brak jakiegokolwiek płynu we wszystkich zachyłkach otrzewnej"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Krew w jamie otrzewnej szybko ulega częściowemu wykrzepianiu. W obrazie ultrasonograficznym widoczny jest płyn o mieszanej, niejednorodnej echogeniczności (drobnokłaczkowaty) z obecnością hiperechogenicznych pasm fibryny i uformowanych skrzepów krwi.",
        expl: "Prawidłowo! Krew w jamie otrzewnej szybko ulega częściowemu wykrzepianiu. W obrazie ultrasonograficznym widoczny jest płyn o mieszanej, niejednorodnej echogeniczności (drobnokłaczkowaty) z obecnością hiperechogenicznych pasm fibryny i uformowanych skrzepów krwi.",
        explanation: "Prawidłowo! Krew w jamie otrzewnej szybko ulega częściowemu wykrzepianiu. W obrazie ultrasonograficznym widoczny jest płyn o mieszanej, niejednorodnej echogeniczności (drobnokłaczkowaty) z obecnością hiperechogenicznych pasm fibryny i uformowanych skrzepów krwi."
      },
      {
        q: "Który objaw w badaniu ginekologicznym dwuręcznym jest szczególnie charakterystyczny dla obecności krwi lub wysięku w zatoce Douglasa?",
        question: "Który objaw w badaniu ginekologicznym dwuręcznym jest szczególnie charakterystyczny dla obecności krwi lub wysięku w zatoce Douglasa?",
        opts: [
          "A) Uwypuklenie i skrajna bolesność tylnego sklepienia pochwy (krzyk Douglasa)",
          "B) Zapadnięcie przedniego sklepienia pochwy z zanikiem cewki moczowej",
          "C) Całkowite zniesienie bolesności przy poruszaniu szyjką macicy",
          "D) Zmniejszenie wymiarów trzonu macicy poniżej 2 centymetrów",
          "E) Wystąpienie obfitego śluzotoku o zasadowym odczynie pH"
        ],
        options: [
          "A) Uwypuklenie i skrajna bolesność tylnego sklepienia pochwy (krzyk Douglasa)",
          "B) Zapadnięcie przedniego sklepienia pochwy z zanikiem cewki moczowej",
          "C) Całkowite zniesienie bolesności przy poruszaniu szyjką macicy",
          "D) Zmniejszenie wymiarów trzonu macicy poniżej 2 centymetrów",
          "E) Wystąpienie obfitego śluzotoku o zasadowym odczynie pH"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Wynaczyniona krew gromadzi się grawitacyjnie w najniższym punkcie jamy otrzewnej, czyli w zagłębieniu odbytniczo-macicznym (zatoce Douglasa). W badaniu przezpochwowym tylne sklepienie pochwy jest napięte, uwypuklone i skrajnie bolesne przy palpacji (tzw. objaw krzyku Douglasa).",
        expl: "Prawidłowo! Wynaczyniona krew gromadzi się grawitacyjnie w najniższym punkcie jamy otrzewnej, czyli w zagłębieniu odbytniczo-macicznym (zatoce Douglasa). W badaniu przezpochwowym tylne sklepienie pochwy jest napięte, uwypuklone i skrajnie bolesne przy palpacji (tzw. objaw krzyku Douglasa).",
        explanation: "Prawidłowo! Wynaczyniona krew gromadzi się grawitacyjnie w najniższym punkcie jamy otrzewnej, czyli w zagłębieniu odbytniczo-macicznym (zatoce Douglasa). W badaniu przezpochwowym tylne sklepienie pochwy jest napięte, uwypuklone i skrajnie bolesne przy palpacji (tzw. objaw krzyku Douglasa)."
      },
      {
        q: "Jakie postępowanie chirurgiczne należy wdrożyć, jeśli po wykonaniu laparoskopii z powodu pęknięcia torbieli ciałka żółtego krwawienie ze zrębu jajnika nadal sączy się pomimo koagulacji dwubiegunowej?",
        question: "Jakie postępowanie chirurgiczne należy wdrożyć, jeśli po wykonaniu laparoskopii z powodu pęknięcia torbieli ciałka żółtego krwawienie ze zrębu jajnika nadal sączy się pomimo koagulacji dwubiegunowej?",
        opts: [
          "A) Założenie pojedynczego szwu hemostatycznego wchłanialnego (np. Vicryl 3-0) lub zastosowanie hemostatyku miejscowego (np. matrycy żelatynowo-trombinowej)",
          "B) Natychmiastową laparotomię ze wskazań onkologicznych z wycięciem sieci i węzłów chłonnych",
          "C) Przepłukanie jamy otrzewnej 500 ml 10% kwasu trichlorooctowego",
          "D) Pozostawienie otwartej powłoki brzusznej do samoistnego zarośnięcia przez ziarninowanie",
          "E) Podwiązanie obu tętnic nerkowych w celu obniżenia ciśnienia perfuzji"
        ],
        options: [
          "A) Założenie pojedynczego szwu hemostatycznego wchłanialnego (np. Vicryl 3-0) lub zastosowanie hemostatyku miejscowego (np. matrycy żelatynowo-trombinowej)",
          "B) Natychmiastową laparotomię ze wskazań onkologicznych z wycięciem sieci i węzłów chłonnych",
          "C) Przepłukanie jamy otrzewnej 500 ml 10% kwasu trichlorooctowego",
          "D) Pozostawienie otwartej powłoki brzusznej do samoistnego zarośnięcia przez ziarninowanie",
          "E) Podwiązanie obu tętnic nerkowych w celu obniżenia ciśnienia perfuzji"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Zgodnie z zasadami chirurgii małoinwazyjnej oszczędzającej płodność, w przypadku trudnej hemostazy powierzchownej zakłada się pojedynczy szew hemostatyczny na miąższ jajnika lub aplikuje miejscowe środki hemostatyczne (kolagen, celulozę utlenowaną lub matryce trombinowe), co pozwala zachować narząd.",
        expl: "Prawidłowo! Zgodnie z zasadami chirurgii małoinwazyjnej oszczędzającej płodność, w przypadku trudnej hemostazy powierzchownej zakłada się pojedynczy szew hemostatyczny na miąższ jajnika lub aplikuje miejscowe środki hemostatyczne (kolagen, celulozę utlenowaną lub matryce trombinowe), co pozwala zachować narząd.",
        explanation: "Prawidłowo! Zgodnie z zasadami chirurgii małoinwazyjnej oszczędzającej płodność, w przypadku trudnej hemostazy powierzchownej zakłada się pojedynczy szew hemostatyczny na miąższ jajnika lub aplikuje miejscowe środki hemostatyczne (kolagen, celulozę utlenowaną lub matryce trombinowe), co pozwala zachować narząd."
      }
    ],
    flashcards: [
      { q: "W jakiej fazie cyklu najczęściej dochodzi do pęknięcia torbieli ciałka żółtego?", a: "W fazie lutealnej (między 20. a 26. dniem cyklu), często bezpośrednio po stosunku płciowym lub wysiłku." },
      { q: "Jakie badanie laboratoryjne jest priorytetem u każdej kobiety w wieku rozrodczym z ostrym brzuchem?", a: "Oznaczenie beta-hCG w surowicy lub moczu w celu bezwzględnego wykluczenia ciąży pozamacicznej." },
      { q: "Czym jest objaw Kehra w krwawieniu dootrzewnowym?", a: "Bólem rzutowanym do barku wywołanym podrażnieniem nerwu przeponowego (C3–C5) przez krew gromadzącą się pod przeponą." },
      { q: "Kiedy można leczyć pękniętą torbiel jajnika zachowawczo?", a: "Tylko przy pełnej stabilności hemodynamicznej, stabilnej hemoglobinie i braku aktywnego krwotoku." },
      { q: "Jaka jest najskuteczniejsza profilaktyka nawrotów krwotocznych torbieli jajnika?", a: "Stosowanie doustnej antykoncepcji hormonalnej (hamowanie owulacji)." },
      { q: "U jakiej grupy pacjentek pęknięcie ciałka żółtego wiąże się ze szczególnym ryzykiem śmiertelnego krwotoku?", a: "U pacjentek przyjmujących doustne leki przeciwkrzepliwe (antagoniści witaminy K, NOAC/DOAC)." }
    ]
  }
];

async function run() {
  console.log('Writing and encrypting Case 156...');
  for (const c of casesData) {
    const enc = await encryptStringAes(JSON.stringify(c, null, 2), MASTER_KEY);
    fs.writeFileSync(path.join('cases', c.file), JSON.stringify(enc, null, 2), 'utf8');
    console.log(`✓ Case #${c.id} (${c.file}) saved and encrypted.`);
  }
}

run().catch(console.error);

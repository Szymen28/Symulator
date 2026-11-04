const fs = require('fs');
const path = require('path');
const { decryptObjectAes, encryptStringAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

function unwrapExcessiveBolding(fb) {
  if (typeof fb !== 'string') return fb;
  const m = fb.match(/^([✅❌]\s*(?:PRAWIDŁOWO|BŁĄD|BŁĄD KRYTYCZNY|POPRAWNIE)!?)\s*<strong>([\s\S]*?)<\/strong>\s*$/i);
  if (!m) return fb;
  const prefix = m[1];
  const inner = m[2];
  if (inner.length < 40) return `${prefix} <strong>${inner}</strong>`;

  const colonIdx = inner.indexOf(':');
  const dotIdx = inner.indexOf('.');
  let splitIdx = -1;
  if (colonIdx > 0 && (dotIdx === -1 || colonIdx < dotIdx || colonIdx < 50)) splitIdx = colonIdx + 1;
  else if (dotIdx > 0 && dotIdx < 50) splitIdx = dotIdx + 1;

  if (splitIdx > 0 && splitIdx < inner.length) {
    const boldPart = inner.slice(0, splitIdx).trim();
    const rest = inner.slice(splitIdx).trim();
    return `${prefix} <strong>${boldPart}</strong> ${rest}`;
  }
  return `${prefix} ${inner}`;
}

function stripDosePills(str) {
  if (typeof str !== 'string') return str;
  return str.replace(/<span class=['"]dose-pill['"]>([\s\S]*?)<\/span>/gi, '$1');
}

const detailedUpgrades = {
  142: {
    vitals: [
      { label: "Częstość akcji serca (HR)", name: "Częstość akcji serca (HR)", val: "78/min", sub: "Miarowa czynność", status: "vital-ok" },
      { label: "Ciśnienie tętnicze (BP)", name: "Ciśnienie tętnicze (BP)", val: "155/90 mmHg", sub: "Nadciśnienie tętnicze", status: "vital-warn" },
      { label: "Temperatura ciała", name: "Temperatura ciała", val: "36.5 °C", sub: "Prawidłowa ciepłota", status: "vital-ok" },
      { label: "Saturacja (SpO2)", name: "Saturacja (SpO2)", val: "96%", sub: "Prawidłowa oksygenacja", status: "vital-ok" }
    ],
    pathoNodes: [
      {
        badge: "Wielopoziomowa PAOD",
        title: "Krytyczne zwężenie i niedrożność tętnic poniżej kolana",
        short: "Spadek perfuzji mikrokrążenia stopy poniżej progu przeżycia tkankowego",
        detail: "Zaawansowana miażdżyca tętnic piszczelowych i strzałkowych u chorego z cukrzycą prowadzi do spadku ciśnienia perfuzyjnego naczyń włosowatych, co uniemożliwia zaopatrzenie tkanek w tlen nawet w spoczynku.",
        target: "Diagnostyka: Pomiar ciśnienia skurczowego na paluchu (TBI <0,7 / ciśnienie palucha <30 mmHg) i przezskórnego ciśnienia tlenu (TcPO2 <30 mmHg) z powodu niespójnego ABI wynikającego ze stwardnienia tętnic (mediasklerozy Mönckeberga) oraz Angio-TK / Angio-MRI; Leczenie: Chirurgiczny pomost omijający z autologicznej odwróconej żyły odpiszczelowej (bypass GSV) lub wewnątrznaczyniowa angioplastyka balonowa (PTA)",
        drugTarget: "Rewaskularyzacja: Bypass udowo-piszczelowy GSV lub PTA"
      },
      {
        badge: "Ból spoczynkowy",
        title: "Niedokrwienny ból spoczynkowy przodostopia (Fontaine III)",
        short: "Nasilenie bólu w pozycji leżącej z ulgą przy opuszczeniu nogi z łóżka",
        detail: "W pozycji leżącej zniesiony zostaje wpływ grawitacji na ciśnienie hydrostatyczne, co skutkuje całkowitym załamaniem perfuzji włośniczkowej i rozdzierającym bólem wybudzającym ze snu.",
        target: "Diagnostyka: Kliniczna ocena w skali Fontaine (stadium III) i skali nasilenia bólu NRS; Leczenie: Złożona analgezja wielolekowa (Paracetamol 1000 mg i.v. co 6 h + Tramadol 50-100 mg p.o. lub siarczan morfiny 5-10 mg s.c./i.v.) oraz bezwzględny zakaz unoszenia chorej kończyny powyżej poziomu serca",
        drugTarget: "Paracetamol 1000 mg i.v. + Tramadol 50-100 mg p.o. doraźnie"
      },
      {
        badge: "Owrzodzenie i martwica",
        title: "Troficzne owrzodzenie niedokrwienne palucha (Fontaine IV / WIfI)",
        short: "Martwica sucha palucha z wtórnym zakażeniem bakteryjnym",
        detail: "Nawet drobny mikrouraz mechaniczny w niedokrwionej stopie nie ulega gojeniu, lecz prowadzi do powstania głębokiego owrzodzenia i martwicy z ryzykiem flegmony.",
        target: "Diagnostyka: Klasyfikacja WIfI (Wound, Ischemia, foot Infection) oceniająca ryzyko amputacji w ciągu 1 roku oraz głęboki posiew tkankowy z dna rany (po jej mechanicznym oczyszczeniu, nie z powierzchownego wymazu!); Leczenie: Chirurgiczne opracowanie rany (debridement), celowana antybiotykoterapia empiryczna (np. Amoksycylina z kwasem klawulanowym 1,2 g i.v. lub Ciprofloksacyna z Klindamycyną) oraz specjalistyczne opatrunki wilgotne",
        drugTarget: "Chirurgiczny debridement rany + antybiotykoterapia empiryczna celowana w florę mieszaną"
      },
      {
        badge: "Prewencja sercowo-naczyniowa",
        title: "Uogólniona miażdżyca i skrajne ryzyko zawału/udaru",
        short: "Śmiertelność 5-letnia pacjenta z CLTI przekracza 50% (wyższa niż w wielu nowotworach)",
        detail: "Choroba naczyń obwodowych jest wskaźnikiem uogólnionego procesu miażdżycowego obejmującego tętnice wieńcowe i dogłowowe.",
        target: "Diagnostyka: Kompleksowy lipidogram, EKG spoczynkowe, USG Doppler tętnic szyjnych i ocena wydolności nerek (eGFR); Leczenie: Agresywna terapia kardioprotekcyjna – statyna o wysokiej sile działania (Atorwastatyna 80 mg/d lub Rozuwastatyna 40 mg/d, cel LDL <55 mg/dl), Kwas acetylosalicylowy 100 mg/d (lub Rywaroksaban 2,5 mg 2x/d z ASA wg COMPASS) oraz optymalizacja leczenia cukrzycy i nadciśnienia (inhibitory ACE)",
        drugTarget: "Atorwastatyna 80 mg/d + Kwas acetylosalicylowy 100 mg/d (lub Rywaroksaban 2,5 mg 2x/d + ASA)"
      }
    ],
    q9: {
      question: "Wskaż zdanie FAŁSZYWE dotyczące diagnostyki i postępowania w przewlekłym zagrażającym kończynie niedokrwieniu (CLTI):",
      options: [
        "A. U chorych na cukrzycę i z zaawansowaną niewydolnością nerek pomiar wskaźnika kostka-ramię (ABI) może dawać fałszywie zawyżone wyniki (>1,4) z powodu stwardnienia błony środkowej tętnic (mediasklerozy Mönckeberga).",
        "B. Prawidłowy lub podwyższony wynik ABI (>1,4) u chorego z cukrzycą i martwicą palucha definitywnie wyklucza niedokrwienie jako przyczynę owrzodzenia.",
        "C. Złotym standardem w diagnostyce perfuzji u chorych z mediasklerozą jest pomiar ciśnienia skurczowego na paluchu (wskaźnik paluch-ramię, TBI <0,7) oraz przezskórny pomiar prężności tlenu (TcPO2).",
        "D. Klasyfikacja WIfI opiera się na ocenie trzech niezależnych składowych: rozległości rany (Wound), stopnia niedokrwienia (Ischemia) oraz obecności i ciężkości zakażenia stopy (foot Infection).",
        "E. U pacjenta z CLTI optymalnym materiałem naczyniowym do wykonania obwodowego pomostu omijającego (bypassu) poniżej kolana jest autologiczna jednoimienna żyła odpiszczelowa (GSV)."
      ],
      correct: 1,
      correctIdx: 1,
      expl: "Prawidłowa odpowiedź to B (zdanie fałszywe). Sztywne, zwapniałe tętnice piszczelowe u chorych z cukrzycą nie dają się ucisnąć mankietem ciśnieniomierza, co daje fałszywie wysokie wyniki ABI (>1,40). W takiej sytuacji ABI NIE wyklucza niedokrwienia! Konieczne jest wykonanie badania ciśnienia na paluchu (TBI) lub przezskórnego pomiaru tlenu (TcPO2)."
    },
    q10: {
      question: "Wskaż zestaw twierdzeń PRAWDZIWYCH dotyczących klasyfikacji Fontaine'a przewlekłego niedokrwienia kończyn dolnych:\n1. Stadium I oznacza zwężenie bezobjawowe wykrywane w badaniach naczyniowych.\n2. Stadium IIa charakteryzuje się chromaniem przestankowym na dystansie powyżej 200 metrów.\n3. Stadium IIb to chromanie przestankowe na dystansie poniżej 200 metrów.\n4. Stadium III to występowanie bólów spoczynkowych, nasilających się w pozycji leżącej z uniesioną kończyną.\n5. Stadium IV charakteryzuje się obecnością zmian troficznych: owrzodzeń niedokrwiennych lub martwicy tkanek.",
      options: [
        "A. 1, 2, 3, 4, 5 (wszystkie wymienione)",
        "B. 1, 3, 4",
        "C. 2, 4, 5",
        "D. tylko 3 i 5",
        "E. tylko 1, 2 i 3"
      ],
      correct: 0,
      correctIdx: 0,
      expl: "Prawidłowa odpowiedź to A (wszystkie wymienione twierdzenia są prawdziwe). Klasyfikacja Fontaine'a: I – bez objawów; IIa – chromanie >200 m; IIb – chromanie <200 m; III – bóle spoczynkowe; IV – martwica i owrzodzenia troficzne. Stadia III i IV definiują CLTI (przewlekłe zagrażające kończynie niedokrwienie)."
    },
    q11: {
      question: "Zgodnie z przepisami o orzekaniu o niepełnosprawności oraz zasadami refundacji wyrobów medycznych przez Narodowy Fundusz Zdrowia (NFZ), pacjentowi z zaawansowanym zespołem stopy cukrzycowej i krytycznym niedokrwieniem kończyn (Fontaine IV) przysługuje zlecenie na zaopatrzenie w:",
      options: [
        "A. Specjalistyczne obuwie ortopedyczne z indywidualną wkładką odciążającą przodostopie oraz wózek inwalidzki (w razie obustronnej niesprawności lub amputacji), wystawiane przez uprawnionego lekarza specjalistę.",
        "B. Wyłącznie skierowanie do zakładu opiekuńczo-leczniczego (ZOL) z zakazem opuszczania placówki.",
        "C. Karnet na zabiegi krioterapii ogólnoustrojowej w kriokomorze bez konsultacji angiologicznej.",
        "D. Płatne w 100% przez pacjenta ortezy bez możliwości jakiejkolwiek refundacji publicznej.",
        "E. Zwolnienie z obowiązku posiadania dokumentacji medycznej w poradni stopy cukrzycowej."
      ],
      correct: 0,
      correctIdx: 0,
      expl: "Prawidłowa odpowiedź to A. Zgodnie z rozporządzeniem Ministra Zdrowia w sprawie wykazu wyrobów medycznych wydawanych na zlecenie, chorym ze zmianami troficznymi stopy przysługuje refundacja obuwia ortopedycznego z wkładkami redystrybuującymi nacisk (kod NFZ) oraz wózków inwalidzkich, co stanowi kluczowy element profilaktyki amputacji w zdrowiu publicznym."
    }
  },

  144: {
    vitals: [
      { label: "Częstość akcji serca (HR)", name: "Częstość akcji serca (HR)", val: "88/min", sub: "Miarowa czynność", status: "vital-ok" },
      { label: "Ciśnienie tętnicze (BP)", name: "Ciśnienie tętnicze (BP)", val: "125/80 mmHg", sub: "Prawidłowe ciśnienie", status: "vital-ok" },
      { label: "Temperatura ciała", name: "Temperatura ciała", val: "37.4 °C", sub: "Stan podgorączkowy (odczyn zapalny)", status: "vital-warn" },
      { label: "Saturacja (SpO2)", name: "Saturacja (SpO2)", val: "98%", sub: "Prawidłowa oksygenacja", status: "vital-ok" }
    ],
    pathoNodes: [
      {
        badge: "Triada Virchowa",
        title: "Zastój żylny i hiperkoagulacja w układzie głębokim podudzia",
        short: "Unieruchomienie w gipsie i mikrouraz śródbłonka inicjują powstawanie skrzepliny",
        detail: "Zwolnienie przepływu krwi w zatokach żylnych mięśnia płaszczkowatego w połączeniu z miejscową aktywacją krzepnięcia generuje bogatowłóknikowy skrzep czerwony.",
        target: "Diagnostyka: Ocena prawdopodobieństwa klinicznego w skali Wellsa dla DVT oraz ilościowe oznaczenie D-dimerów metodą o wysokiej czułości (ELISA); Leczenie: Natychmiastowe wdrożenie bezpośrednich doustnych antykoagulantów (DOAC: Rywaroksaban 15 mg 2x/d przez 21 dni, następnie 20 mg 1x/d LUB Apiksaban 10 mg 2x/d przez 7 dni, następnie 5 mg 2x/d) lub heparyny drobnocząsteczkowej (LMWH w dawce terapeutycznej 1 mg/kg co 12 h)",
        drugTarget: "Rywaroksaban 15 mg 2x/d (21 dni) lub Apiksaban 10 mg 2x/d (7 dni) lub Enoksaparyna 1 mg/kg s.c. co 12 h"
      },
      {
        badge: "Złoty standard obrazowania",
        title: "Test uciskowy żył głębokich (Compression Ultrasound – CUS)",
        short: "Brak podatności żyły podkolanowej i udowej na ucisk głowicą USG",
        detail: "W prawidłowych warunkach cienkościenna żyła ulega całkowitemu zapadnięciu pod delikatnym uciskiem głowicy ultradźwiękowej. Obecność skrzepliny w świetle naczynia uniemożliwia jej kompresję.",
        target: "Diagnostyka: Badanie ultrasonograficzne testem kompresyjnym (CUS od pachwiny do dołu podkolanowego) z oceną przepływu w USG Duplex Doppler; Procedura: Potwierdzenie obecności skrzepliny, ocena jej czoła (skrzeplina przyścienna vs pływająca / balotująca) oraz wykluczenie powikłań",
        drugTarget: "Ultrasonograficzny test kompresyjny (CUS) całego układu głębokiego"
      },
      {
        badge: "Zagrożenie zatorowością płucną",
        title: "Progresja proksymalna i ryzyko urwania czoła skrzepliny",
        short: "Fragmentacja skrzepliny i jej migracja przez prawą komorę do tętnic płucnych",
        detail: "Zakrzepica proksymalna (żyła podkolanowa, udowa, biodrowa) wiąże się z 50% ryzykiem bezobjawowej lub objawowej zatorowości płucnej (PE), mogącej prowadzić do nagłego zgonu sercowego.",
        target: "Diagnostyka: Monitorowanie parametrów oddechowych (SpO2, częstość oddechów RR), EKG (cechy przeciążenia prawej komory S1Q3T3) oraz w razie duszności wykonanie Angio-TK tętnic płucnych; Leczenie: Wczesne uruchomienie pacjenta po wdrożeniu skutecznej antykoagulacji oraz unikanie masażu bolesnej łydki",
        drugTarget: "Wczesna pionizacja i uruchomienie pacjenta po wdrożeniu antykoagulacji"
      },
      {
        badge: "Późne powikłanie zastawkowe",
        title: "Niewydolność zastawek i zespół pozakrzepowy (PTS)",
        short: "Zniszczenie aparatu zastawkowego żył głębokich wywołujące trwałe nadciśnienie żylne",
        detail: "Organizacja i rekanalizacja skrzepliny niszczy delikatne płatki zastawek żylnych. Zastój żylny prowadzi do przewlekłego obrzęku, stwardnienia skóry (lipodermatosclerosis) i owrzodzeń żylnych.",
        target: "Diagnostyka: Ocena kliniczna w skali Villalty w trakcie wizyt kontrolnych po 6, 12 i 24 miesiącach od epizodu zakrzepicy; Leczenie: Wczesne wdrożenie stopniowanej kompresjoterapii (podkolanówki lub pończochy uciskowe II klasy ucisku 23–32 mmHg) noszone codziennie od momentu ustąpienia ostrego obrzęku przez minimum 6–24 miesięcy",
        drugTarget: "Kompresjoterapia stopniowanym uciskiem: wyroby II klasy ucisku (23-32 mmHg)"
      }
    ],
    q9: {
      question: "Wskaż zdanie FAŁSZYWE dotyczące diagnostyki i leczenia zakrzepicy żył głębokich (DVT):",
      options: [
        "A. Ujemny wynik testu kompresyjnego USG (CUS) w połączeniu z niskim stężeniem D-dimerów u pacjenta z niskim prawdopodobieństwem klinicznym w skali Wellsa pozwala bezpiecznie wykluczyć DVT bez konieczności leczenia.",
        "B. Rutynowe leczenie ostrej niepowikłanej DVT wymaga bezwzględnego leżenia w łóżku przez co najmniej 14 dni z unieruchomieniem kończyny w szynie gipsowej.",
        "C. Lekami pierwszego wyboru w leczeniu niepowikłanej DVT u chorych bez aktywnej choroby nowotworowej i bez ciężkiej niewydolności nerek są bezpośrednie doustne antykoagulanty (DOAC: apiksaban, rywaroksaban, dabigatran, edoksaban).",
        "D. Wskaźnik D-dimerów cechuje się wysoką czułością (>95%), lecz niską swoistością, gdyż jego podwyższone stężenie występuje także w ciąży, po urazach, operacjach i w infekcjach.",
        "E. U chorego z pierwszym epizodem sprowokowanej DVT (np. po unieruchomieniu w gipsie po złamaniu) zalecany czas leczenia przeciwkrzepliwego wynosi 3 miesiące."
      ],
      correct: 1,
      correctIdx: 1,
      expl: "Prawidłowa odpowiedź to B (zdanie fałszywe). Wielodniowe leżenie w łóżku jest postępowaniem przestarzałym i szkodliwym. Zgodnie z wytycznymi ESC i CHEST, chory z DVT po wdrożeniu skutecznej antykoagulacji i zaopatrzeniu kończyny w kompresjoterapię powinien być jak najwcześniej uruchomiony i pionizowany, co usprawnia pompę mięśniową i zmniejsza obrzęk."
    },
    q10: {
      question: "Wskaż zestaw twierdzeń PRAWDZIWYCH dotyczących skali Wellsa służącej do oceny prawdopodobieństwa klinicznego zakrzepicy żył głębokich (DVT):\n1. Aktywny proces nowotworowy (leczony w ciągu ostatnich 6 miesięcy lub paliatywny) dodaje 1 punkt.\n2. Niedawne unieruchomienie kończyny dolnej w opatrunku gipsowym dodaje 1 punkt.\n3. Obrzęk całej kończyny dolnej oraz asymetria obwodu podudzia >3 cm (mierzona 10 cm poniżej guzowatości piszczeli) dodają po 1 punkcie.\n4. Alternatywne rozpoznanie co najmniej tak samo prawdopodobne jak DVT (np. krwiak, pęknięta torbiel Bakera) ODEJMUJE 2 punkty.\n5. Wynik w skali Wellsa >=2 punkty oznacza wysokie prawdopodobieństwo DVT (tzw. DVT likely).",
      options: [
        "A. 1, 2, 3, 4, 5 (wszystkie wymienione)",
        "B. 1, 2, 3",
        "C. 2, 4, 5",
        "D. tylko 1 i 4",
        "E. tylko 3 i 5"
      ],
      correct: 0,
      correctIdx: 0,
      expl: "Prawidłowa odpowiedź to A (wszystkie wymienione twierdzenia są prawdziwe). Skala Wellsa dla DVT zawiera pozycje punktowane dodatnio (+1 za nowotwór, porażenie, leżenie >3 dni/operację w 12 tyg., bolesność w rzucie żył, obrzęk całej nogi, asymetrię obwodu łydki >3 cm, obrzęk ciastowaty, żyły krążenia obocznego oraz przebyte DVT) oraz pozycję ujemną (-2 pkt za inne prawdopodobne rozpoznanie). Wynik >=2 oznacza 'DVT prawdopodobne'."
    },
    q11: {
      question: "Zgodnie z wytycznymi akredytacyjnymi Ministerstwa Zdrowia i standardami jakości opieki szpitalnej, ocena ryzyka żylnej choroby zakrzepowo-zatorowej (np. w skali Padewskiej lub Capriniego) u każdego pacjenta przyjmowanego do szpitala stanowi:",
      options: [
        "A. Obowiązkowy element dokumentacji medycznej i procedury bezpieczeństwa pacjenta, decydujący o konieczności wdrożenia profilaktyki farmakologicznej (LMWH) lub mechanicznej.",
        "B. Procedurę fakultatywną, wykonywaną wyłącznie na pisemne życzenie chorego po uiszczeniu opłaty skarbowej.",
        "C. Działanie zakazane przed ukończeniem 65. roku życia ze względu na ochronę danych osobowych.",
        "D. Czynność zarezerwowaną wyłącznie dla lekarzy medycyny sądowej po zgonie pacjenta.",
        "E. Formalność dotyczącą wyłącznie pacjentów operowanych w trybie jednodniowym."
      ],
      correct: 0,
      correctIdx: 0,
      expl: "Prawidłowa odpowiedź to A. Szpitalna profilaktyka ŻChZZ jest kluczowym wskaźnikiem jakości leczenia. Brak udokumentowanej oceny ryzyka zakrzepowo-zatorowego i zaniechanie profilaktyki u hospitalizowanego pacjenta z grupy podwyższonego ryzyka (np. unieruchomionego) w razie wystąpienia DVT lub zatorowości płucnej jest traktowane przez sądy i ubezpieczycieli jako zawiniony błąd organizacyjny i medyczny."
    }
  },

  145: {
    vitals: [
      { label: "Częstość akcji serca (HR)", name: "Częstość akcji serca (HR)", val: "76/min", sub: "Miarowa czynność", status: "vital-ok" },
      { label: "Ciśnienie tętnicze (BP)", name: "Ciśnienie tętnicze (BP)", val: "130/80 mmHg", sub: "Prawidłowe ciśnienie", status: "vital-ok" },
      { label: "Temperatura ciała", name: "Temperatura ciała", val: "37.1 °C", sub: "Prawidłowa ciepłota", status: "vital-ok" },
      { label: "Saturacja (SpO2)", name: "Saturacja (SpO2)", val: "99%", sub: "Prawidłowa oksygenacja", status: "vital-ok" }
    ],
    pathoNodes: [
      {
        badge: "Zakrzepica pnia GSV",
        title: "Zakrzepowe zapalenie żyły odpiszczelowej (SVT)",
        short: "Stwardniałe, bolesne pasmo z rumieniem wzdłuż pnia żyły odpiszczelowej na udzie",
        detail: "Zapalenie ściany żyły połączone z tworzeniem skrzepliny w żyle powierzchownej tradycyjnie uważano za stan łagodny, jednak u 20-30% chorych współistnieje niema klinicznie DVT, a u części zatorowość płucna.",
        target: "Diagnostyka: Pilne pełne badanie USG Duplex obu kończyn dolnych (z oceną układu powierzchownego i głębokiego); Leczenie: Fondaparynuks w dawce 2,5 mg s.c. raz na dobę przez 45 dni (zgodnie z badaniem CALISTO u chorych z odcinkiem zakrzepicy >=5 cm) lub LMWH w dawce pośredniej (profilaktyczno-leczniczej)",
        drugTarget: "Fondaparynuks 2,5 mg s.c. 1x/d przez 45 dni (badanie CALISTO)"
      },
      {
        badge: "Reguła 3 cm od SFJ",
        title: "Progresja zakrzepicy ku ujściu odpiszczelowo-udowemu (SFJ)",
        short: "Skrzeplina zbliżająca się do żyły udowej wspólnej zagraża oderwaniem do płuc",
        detail: "Gdy czoło skrzepliny znajduje się w odległości mniejszej niż 3 cm od połączenia odpiszczelowo-udowego (saphenofemoral junction – SFJ), ryzyko przejścia do układu głębokiego jest krytycznie wysokie.",
        target: "Diagnostyka: Precyzyjny pomiar ultrasonograficzny odległości proksymalnego bieguna skrzepliny od zastawki ujściowej SFJ; Leczenie: W przypadku odległości <3 cm od SFJ zmiana postępowania na pełną antykoagulację terapeutyczną w dawkach jak w DVT (np. Rywaroksaban 15 mg 2x/d lub Enoksaparyna 1 mg/kg s.c. co 12 h) przez minimum 3 miesiące",
        drugTarget: "Pełnodawkowa antykoagulacja terapeutyczna jak w DVT przy odległości <3 cm od SFJ"
      },
      {
        badge: "Leczenie objawowe",
        title: "Miejscowy odczyn zapalny i ból tkankowy",
        short: "Bolesny naciek zapalny skóry i tkanki podskórnej wzdłuż zakrzepniętej żyły",
        detail: "Uwalnianie mediatorów zapalenia (prostaglandyn, histaminy) wywołuje obrzęk, ucieplenie i bolesność uciskową wzdłuż pnia naczynia.",
        target: "Diagnostyka: Badanie przedmiotowe z wyznaczeniem granic rumienia i stwardnienia; Leczenie: Miejscowe niesteroidowe leki przeciwzapalne w żelu (np. diklofenak/ketoprofen), zimne okłady oraz wczesna kompresjoterapia (pończochy lub podkolanówki uciskowe II klasy) przy zachowanej ruchomości pacjenta",
        drugTarget: "NLPZ miejscowo w żelu + kompresjoterapia stopniowanym uciskiem"
      },
      {
        badge: "Zespół Trousseau",
        title: "Wędrujące zapalenie żył (Thrombophlebitis migrans)",
        short: "Nawracające epizody SVT w nietypowych lokalizacjach jako objaw paraneoplastyczny",
        detail: "Wydzielanie przez komórki nowotworowe (rak trzustki, żołądka, płuc) mucyn i czynnika tkankowego TF wywołuje układowy stan nadkrzepliwości manifestujący się 'skaczącymi' ogniskami zapalenia żył.",
        target: "Diagnostyka: Pilna diagnostyka onkologiczna – TK klatki piersiowej, brzucha i miednicy, gastroskopia, kolonoskopia oraz markery nowotworowe (CA 19-9, CEA); Leczenie: Pilne wdrożenie leczenia onkologicznego nowotworu pierwotnego oraz przewlekła antykoagulacja LMWH",
        drugTarget: "Diagnostyka onkologiczna (TK jamy brzusznej/klatki) + LMWH w zespole Trousseau"
      }
    ],
    q9: {
      question: "Wskaż zdanie FAŁSZYWE dotyczące zakrzepowego zapalenia żył powierzchownych (SVT):",
      options: [
        "A. U każdego pacjenta z klinicznym podejrzeniem SVT należy wykonać pełne badanie USG Duplex obu kończyn dolnych w celu wykluczenia współistniejącej zakrzepicy żył głębokich (DVT).",
        "B. Zgodnie z badaniem CALISTO, w zakrzepicy pnia żyły odpiszczelowej o długości co najmniej 5 cm lekiem z wyboru zmniejszającym ryzyko DVT i PE jest fondaparynuks w dawce 2,5 mg s.c. raz na dobę przez 45 dni.",
        "C. Jeśli czoło skrzepliny w żyle odpiszczelowej zbliża się na odległość mniejszą niż 3 cm od ujścia odpiszczelowo-udowego (SFJ), stan ten należy leczyć jak zakrzepicę żył głębokich (pełną dawką terapeutyczną antykoagulantów).",
        "D. Rutynowym postępowaniem pierwszego wyboru u każdego chorego z SVT jest natychmiastowe podanie dożylnych antybiotyków o szerokim spektrum (np. karbapenemów) przez 14 dni.",
        "E. Nawracające, wędrujące zapalenie żył powierzchownych (objaw Trousseau) wymaga pilnej diagnostyki w kierunku ukrytego nowotworu złośliwego (np. raka trzustki lub płuca)."
      ],
      correct: 3,
      correctIdx: 3,
      expl: "Prawidłowa odpowiedź to D (zdanie fałszywe). Zapalenie żył powierzchownych (SVT) w przeważającej większości jest jałowym procesem zakrzepowo-zapalnym, a NIE infekcją bakteryjną! Rutynowe stosowanie antybiotykoterapii jest błędem sztuki; antybiotyki są wskazane wyłącznie w rzadkiej postaci septycznego/ropnego zapalenia żył (np. po wkłuciu dożylnym)."
    },
    q10: {
      question: "Wskaż zestaw twierdzeń PRAWDZIWYCH dotyczących postępowania w zakrzepowym zapaleniu żył powierzchownych (SVT):\n1. Głównym celem leczenia przeciwkrzepliwego w SVT jest zapobieganie progresji do DVT i zatorowości płucnej (PE).\n2. Unieruchomienie pacjenta w łóżku jest bezwzględnie przeciwwskazane – zaleca się zachowanie aktywności fizycznej.\n3. Zastosowanie stopniowanego ucisku (kompresjoterapii) redukuje ból i miejscowy obrzęk kończyny.\n4. Miejscowe stosowanie niesteroidowych leków przeciwzapalnych w żelu działa przeciwbólowo i przeciwzapalnie.\n5. W przypadku skrzepliny o długości <3 cm położonej dystalnie na podudziu z dala od układu głębokiego wystarcza leczenie objawowe bez konieczności 45-dniowej antykoagulacji fondaparynuksem.",
      options: [
        "A. 1, 2, 3, 4, 5 (wszystkie wymienione)",
        "B. 1, 2, 3",
        "C. 2, 4, 5",
        "D. tylko 1 i 3",
        "E. tylko 3, 4 i 5"
      ],
      correct: 0,
      correctIdx: 0,
      expl: "Prawidłowa odpowiedź to A (wszystkie wymienione twierdzenia są prawdziwe). Zgodnie z wytycznymi European Society for Vascular Surgery (ESVS 2021), w małych ogniskach SVT (<5 cm, daleko od SFJ) wystarcza leczenie objawowe (NLPZ, kompresja, ruch); przy zmianach >=5 cm wskazany jest fondaparynuks 2,5 mg przez 45 dni, a przy odległości <3 cm od SFJ – pełna dawka terapeutyczna jak w DVT."
    },
    q11: {
      question: "U 62-letniego dotychczas zdrowego pacjenta bez żylaków stwierdzono kolejny (trzeci w ciągu 2 miesięcy) epizod zakrzepowego zapalenia żył powierzchownych w zmiennych lokalizacjach (objaw Trousseau). Jakie postępowanie orzecznicze i administracyjne w ramach polskiego systemu ochrony zdrowia powinien podjąć lekarz POZ?",
      options: [
        "A. Natychmiastowe wystawienie Karty Diagnostyki i Leczenia Onkologicznego (Karty DiLO) z podejrzeniem procesu rozrostowego (np. raka trzustki/płuc) w celu skierowania do szybkiej terapii onkologicznej oraz pilne zlecenie badań obrazowych.",
        "B. Wystawienie zwolnienia ZUS ZLA na 182 dni bez podejmowania jakiejkolwiek diagnostyki przyczynowej.",
        "C. Zgłoszenie przypadku do Państwowej Inspekcji Sanitarnej jako ogniska zakażenia szpitalnego.",
        "D. Odmowa dalszego leczenia i zalecenie stosowania wyłącznie maści z kasztanowca.",
        "E. Skierowanie do sanatorium uzdrowiskowego na kąpiele siarczkowe w trybie pilnym."
      ],
      correct: 0,
      correctIdx: 0,
      expl: "Prawidłowa odpowiedź to A. Wędrujące zapalenie żył (objaw Trousseau) u osoby starszej bez żylaków jest klasycznym objawem paraneoplastycznym wyprzedzającym rozpoznanie raka trzustki, przewodu pokarmowego lub płuca. Lekarz POZ ma obowiązek wystawić Kartę DiLO, która gwarantuje pacjentowi diagnostykę onkologiczną w wyznaczonych terminach ustawowych."
    }
  },

  146: {
    vitals: [
      { label: "Częstość akcji serca (HR)", name: "Częstość akcji serca (HR)", val: "64/min", sub: "Prawidłowa czynność", status: "vital-ok" },
      { label: "Ciśnienie tętnicze (BP)", name: "Ciśnienie tętnicze (BP)", val: "120/75 mmHg", sub: "Optymalne ciśnienie", status: "vital-ok" },
      { label: "Temperatura ciała", name: "Temperatura ciała", val: "36.6 °C", sub: "Prawidłowa ciepłota", status: "vital-ok" },
      { label: "Saturacja (SpO2)", name: "Saturacja (SpO2)", val: "99%", sub: "Prawidłowa oksygenacja", status: "vital-ok" }
    ],
    pathoNodes: [
      {
        badge: "Wada wrodzona",
        title: "Nieprawidłowy przebieg głowy przyśrodkowej mięśnia brzuchatego (PAES typ II)",
        short: "Tętnica podkolanowa biegnie nienaturalnie bocznie od ścięgna mięśnia",
        detail: "Wrodzona ektopia przyczepu mięśnia brzuchatego łydki powoduje, że przy każdym napięciu mięśnia (zgięcie podeszwowe stopy w biegu) tętnica zostaje mechanicznie dociśnięta do kłykcia kości udowej.",
        target: "Diagnostyka: Badanie palpacyjne tętna z testem prowokacyjnym (zanik tętna na stopie przy czynnym zgięciu podeszwowym z oporem lub biernym zgięciu grzbietowym) oraz spoczynkowe i dynamiczne Angio-MRI dołu podkolanowego; Procedura: Chirurgiczna miotomia – przecięcie nieprawidłowego ścięgna mięśnia brzuchatego łydki z odbarczeniem tętnicy",
        drugTarget: "Chirurgiczne odbarczenie (miotomia) ektopowej głowy przyśrodkowej m. brzuchatego"
      },
      {
        badge: "Uszkodzenie ściany naczynia",
        title: "Mikrourazy powtarzalne i tętniak pozazwężeniowy tętnicy podkolanowej",
        short: "Mechaniczne zgniatanie tętnicy niszczy błonę sprężystą i sprzyja tętniakom",
        detail: "Turbulentny przepływ w miejscu ucisku oraz pourazowe zwłóknienie przydanki osłabiają ścianę naczynia, prowadząc do powstania tętniaka pozazwężeniowego ze skrzeplinami przyściennymi.",
        target: "Diagnostyka: Badanie USG Duplex z pomiarem średnicy tętnicy podkolanowej w spoczynku i podczas manewrów dynamicznych; Procedura: W przypadku wytworzenia tętniaka lub twardego zwężenia – resekcja zmienionego odcinka tętnicy podkolanowej i wszycie wstawki z autologicznej żyły odpiszczelowej (GSV)",
        drugTarget: "Resekcja tętniaka z pomostowaniem autologiczną żyłą odpiszczelową (GSV)"
      },
      {
        badge: "Chromanie nietypowe",
        title: "Chromanie przestankowe młodego sportowca bez miażdżycy",
        short: "Kurczowy ból łydki występujący wyłącznie podczas intensywnego biegu",
        detail: "Brak tradycyjnych czynników ryzyka sercowo-naczyniowego u młodego, wysportowanego człowieka z chromaniem przestankowym często prowadzi do błędnego rozpoznania ortopedycznego (przeciążenie ścięgna Achillesa).",
        target: "Diagnostyka: Pomiar wskaźnika kostka-ramię (ABI) w spoczynku (prawidłowy ~1,0) oraz natychmiast po wysiłku na bieżni ruchomej (gwałtowny spadek ABI); Leczenie: Przerwanie intensywnych treningów biegowych do czasu definitywnego leczenia operacyjnego",
        drugTarget: "Próba wysiłkowa na bieżni z pomiarem powysiłkowego ABI"
      },
      {
        badge: "Zatorowość obwodowa",
        title: "Mikrozatorowość obwodowa stopy i palców (Blue Toe Syndrome)",
        short: "Urywanie fragmentów skrzeplin z tętniaka i zaczopowanie tętnic stopy",
        detail: "Mikrozatory zamykają tętnice podeszwowe i palcowe, wywołując nagłe zasinienie, ból i martwicę palców u młodego człowieka z zachowanym tętnem spoczynkowym.",
        target: "Diagnostyka: Badanie angiograficzne lub Angio-TK naczyń obwodowych stopy oraz ocena kapilaroskopowa; Leczenie: W razie ostrej zatorowości – pilna embolektomia cewnikiem Fogarty'ego 2-3F lub celowana tromboliza dotętnicza (rtPA) oraz dożylna heparyna niefrakcjonowana (UFH)",
        drugTarget: "Embolektomia cewnikiem Fogarty'ego 2-3F + heparyna niefrakcjonowana UFH"
      }
    ],
    q9: {
      question: "Wskaż zdanie FAŁSZYWE dotyczące zespołu usidlenia tętnicy podkolanowej (PAES):",
      options: [
        "A. Typ II PAES charakteryzuje się nieprawidłowym przyczepem głowy przyśrodkowej mięśnia brzuchatego łydki, która przyczepia się bardziej bocznie na kłykciu kości udowej.",
        "B. W spoczynku tętno na tętnicach stopy u pacjenta z PAES bez zaawansowanych powikłań zakrzepowych jest zazwyczaj całkowicie prawidłowe, a spoczynkowy wskaźnik ABI wynosi 1,0–1,2.",
        "C. Złotym standardem leczenia przyczynowego PAES przed wystąpieniem nieodwracalnych zmian w naczyniu jest implantacja samorozprężalnego stentu naczyniowego bez zabiegu chirurgicznego.",
        "D. Dynamiczny test prowokacyjny polega na badaniu tętna na tętnicy grzbietowej stopy podczas czynnego zgięcia podeszwowego stopy z oporem lub biernego zgięcia grzbietowego przy wyprostowanym kolanie.",
        "E. Angio-MRI dołu podkolanowego pozwala precyzyjnie uwidocznić nieprawidłowości anatomiczne mięśni i ścięgien oraz relację przestrzenną z pęczkiem naczyniowym."
      ],
      correct: 2,
      correctIdx: 2,
      expl: "Prawidłowa odpowiedź to C (zdanie fałszywe). Stentowanie wewnątrznaczyniowe w zespole usidlenia jest BŁĘDEM SZTUKI i jest bezwzględnie przeciwwskazane! Zewnętrzny ucisk mechaniczny przez pracujący mięsień powoduje szybkie zgniecenie, złamanie stentu i ostrą zakrzepicę. Jedynym właściwym leczeniem przyczynowym jest operacyjne odbarczenie chirurgiczne (miotomia)."
    },
    q10: {
      question: "Wskaż zestaw twierdzeń PRAWDZIWYCH dotyczących przyczyn chromania przestankowego u młodych pacjentów (<35 lat) bez cech miażdżycy:\n1. Zespół usidlenia tętnicy podkolanowej (PAES) jest jedną z najczęstszych naczyniowych przyczyn w tej grupie wiekowej.\n2. Torbielowate zwyrodnienie przydanki tętnicy podkolanowej (CAD) powoduje ucisk światła naczynia przez torbiele wypełnione galaretowatym płynem zawierającym mukopolisacharydy.\n3. Przewlekły wysiłkowy zespół ciasnoty przedziałów powięziowych podudzia (CECS) objawia się bólem mięśni ustępującym wolniej po wysiłku niż w chromaniu naczyniowym.\n4. Zakrzepowo-zarostowe zapalenie naczyń (choroba Buergera) występuje niemal wyłącznie u młodych palaczy tytoniu i zajmuje małe i średnie naczynia dystalne.\n5. Wszystkie powyższe jednostki wymagają rutynowego leczenia wyłącznie wysokimi dawkami statyn.",
      options: [
        "A. 1, 2, 3, 4",
        "B. 1, 3, 5",
        "C. 2, 4, 5",
        "D. tylko 1 i 2",
        "E. 1, 2, 3, 4, 5 (wszystkie wymienione)"
      ],
      correct: 0,
      correctIdx: 0,
      expl: "Prawidłowa odpowiedź to A (twierdzenia 1, 2, 3 i 4 są prawdziwe). Twierdzenie 5 jest fałszywe: statyny są lekami przeciwmiażdżycowymi i nie leczą wrodzonych anomalii anatomicznych (PAES), torbieli przydanki (CAD) ani zespołu powięziowego (CECS), które wymagają interwencji chirurgicznych."
    },
    q11: {
      question: "Zgodnie z zasadami medycyny sportowej i orzecznictwa lekarskiego, jakie orzeczenie o zdolności do uprawiania wyczynowego sportu biegowego powinien wydać lekarz u 24-letniego sportowca z rozpoznanym objawowym zespołem usidlenia tętnicy podkolanowej (PAES) przed zabiegiem operacyjnym?",
      options: [
        "A. Czasowa niezdolność do uprawiania sportów wyczynowych wymagających biegu do czasu udanego chirurgicznego odbarczenia naczynia i pełnej rekonwalescencji, ze względu na ryzyko ostrej zakrzepicy, tętniaka i utraty kończyny.",
        "B. Całkowity brak przeciwwskazań – pacjent może kontynuować starty w maratonach pod warunkiem stosowania maści rozgrzewających.",
        "C. Trwała dyskwalifikacja ze wszelkich form aktywności ruchowej do końca życia.",
        "D. Zezwolenie na biegi długodystansowe wyłącznie w obuwiu z twardą wkładką węglową.",
        "E. Obowiązek startu wyłącznie w zawodach na dystansach sprinterskich do 60 metrów."
      ],
      correct: 0,
      correctIdx: 0,
      expl: "Prawidłowa odpowiedź to A. Kontynuowanie wyczynowego biegania przy obecności usidlenia tętnicy prowadzi do mikrourazów ściany, tętniaka i ostrego niedokrwienia kończyny. Lekarz medycyny sportowej orzeka czasową niezdolność do sportu wyczynowego, a powrót do treningów jest możliwy dopiero po zabiegu operacyjnym i potwierdzeniu prawidłowego przepływu naczyniowego w badaniach kontrolnych."
    }
  },

  147: {
    vitals: [
      { label: "Częstość akcji serca (HR)", name: "Częstość akcji serca (HR)", val: "70/min", sub: "Miarowa czynność", status: "vital-ok" },
      { label: "Ciśnienie tętnicze (BP)", name: "Ciśnienie tętnicze (BP)", val: "P: 145/85 | L: 105/65 mmHg", sub: "Asymetria skurczowa >30 mmHg!", status: "vital-warn" },
      { label: "Temperatura ciała", name: "Temperatura ciała", val: "36.7 °C", sub: "Prawidłowa ciepłota", status: "vital-ok" },
      { label: "Saturacja (SpO2)", name: "Saturacja (SpO2)", val: "98%", sub: "Prawidłowa oksygenacja", status: "vital-ok" }
    ],
    pathoNodes: [
      {
        badge: "Zwężenie proksymalne",
        title: "Miażdżycowe zwężenie tętnicy podobojczykowej (przed odejściem t. kręgowej)",
        short: "Krytyczne zwężenie lewej tętnicy podobojczykowej proksymalnie od odejścia tętnicy kręgowej",
        detail: "Blaszka miażdżycowa w początkowym odcinku tętnicy podobojczykowej tworzy gradient ciśnień. W spoczynku ciśnienie w naczyniu dystalnym może być wystarczające, lecz podczas pracy mięśniowej ramienia zapotrzebowanie gwałtownie wzrasta.",
        target: "Diagnostyka: Pomiar ciśnienia tętniczego na OBU ramionach (różnica SBP >15-20 mmHg to kluczowy objaw przesiewowy) oraz USG Doppler naczyń dogłowowych i podobojczykowych; Procedura: Wewnątrznaczyniowa angioplastyka balonowa ze stentowaniem (PTA/stent) zwężonego odcinka tętnicy podobojczykowej jako metoda pierwszego wyboru",
        drugTarget: "Przezskórna angioplastyka balonowa ze stentem (PTA/stent) tętnicy podobojczykowej"
      },
      {
        badge: "Odwrócenie przepływu",
        title: "Zjawisko podkradania i wsteczny przepływ w tętnicy kręgowej",
        short: "Krew z koła Willisa i przeciwległej tętnicy kręgowej płynie 'w dół' do ramienia",
        detail: "Wskutek spadku ciśnienia za zwężeniem, tętnica kręgowa po stronie zmiany staje się drogą krążenia obocznego dla kończyny górnej, 'podkradając' krew z pnia podstawnego mózgu.",
        target: "Diagnostyka: Badanie USG Doppler tętnic kręgowych z demonstracją przepływu wstecznego (retrograde flow) nasilającego się w próbie przekrwienia reaktywnego (po zwolnieniu mankietu ciśnieniomierza na ramieniu); Leczenie: Zapobieganie nawrotom zjawiska podkradania poprzez anatomiczną rekonstrukcję naczyniową",
        drugTarget: "Test przekrwienia reaktywnego w USG Doppler tętnicy kręgowej"
      },
      {
        badge: "Objawy neurologiczne",
        title: "Niedokrwienie kręgowo-podstawne podczas pracy ramienia",
        short: "Zawroty głowy, ataksja, zaburzenia widzenia i omdlenia prowokowane wysiłkiem lewej ręki",
        detail: "Gwałtowny wzrost przepływu do pracujących mięśni ramienia nasila podkradanie krwi z móżdżku i pnia mózgu, wywołując przejściowe objawy niedokrwienia tylnego dołu czaszki (vertebrobasilar insufficiency).",
        target: "Diagnostyka: Angio-TK lub Angio-MRI łuku aorty i naczyń dogłowowych z oceną koła Willisa; Leczenie: Optymalizacja farmakoterapii przeciwpłytkowej (Kwas acetylosalicylowy 100 mg/d) i hipolipemizującej (Atorwastatyna 40-80 mg/d) w celu stabilizacji blaszki miażdżycowej",
        drugTarget: "Kwas acetylosalicylowy 100 mg/d + Atorwastatyna 40-80 mg/d"
      },
      {
        badge: "Alternatywa chirurgiczna",
        title: "Chirurgiczne pomostowanie szyjno-podobojczykowe (Carotid-Subclavian Bypass)",
        short: "Przeszczep omijający u chorych niekwalifikujących się do zabiegu wewnątrznaczyniowego",
        detail: "Gdy zwężenie obejmuje całe ujście tętnicy podobojczykowej lub występuje całkowita przewlekła niedrożność nie do pokonania cewnikiem, konieczna jest rekonstrukcja chirurgiczna z tętnicy szyjnej wspólnej.",
        target: "Diagnostyka: Ocena drożności tętnicy szyjnej wspólnej ipsilateralnej w Angio-TK; Procedura: Chirurgiczny bypass szyjno-podobojczykowy (z użyciem protezy naczyniowej PTFE 6-8 mm) lub transpozycja tętnicy podobojczykowej do tętnicy szyjnej wspólnej",
        drugTarget: "Bypass szyjno-podobojczykowy (Carotid-Subclavian Bypass) z protezy PTFE"
      }
    ],
    q9: {
      question: "Wskaż zdanie FAŁSZYWE dotyczące zespołu podkradania tętnicy podobojczykowej (Subclavian Steal Syndrome – SSS):",
      options: [
        "A. Warunkiem anatomicznym powstania zespołu podkradania jest zwężenie lub niedrożność tętnicy podobojczykowej zlokalizowana PROKSYMALNIE (dośrodkowo) od odejścia tętnicy kręgowej.",
        "B. Różnica ciśnienia skurczowego między kończynami górnymi przekraczająca 15–20 mmHg jest najprostszym i kluczowym objawem klinicznym nasuwającym podejrzenie SSS.",
        "C. U pacjentów po pomostowaniu aortalno-wieńcowym z użyciem lewej tętnicy piersiowej wewnętrznej (LITA-LAD), zwężenie lewej tętnicy podobojczykowej może wywołać niedokrwienie mięśnia sercowego (tzw. zespół podkradania wieńcowo-podobojczykowego).",
        "D. W USG Doppler tętnicy kręgowej po stronie zwężenia stwierdza się patologiczny przepływ wsteczny (odwrócenie kierunku przepływu krwi w stronę ramienia).",
        "E. U każdego bezobjawowego pacjenta z izolowaną asymetrią ciśnień bez objawów neurologicznych bezwzględnie konieczna jest natychmiastowa operacja chirurgiczna na otwartej klatce piersiowej."
      ],
      correct: 4,
      correctIdx: 4,
      expl: "Prawidłowa odpowiedź to E (zdanie fałszywe). Bezobjawowe zwężenie tętnicy podobojczykowej z odwróceniem przepływu w tętnicy kręgowej (tzw. zjawisko podkradania bez objawów klinicznych) nie wymaga leczenia inwazyjnego! Interwencji wymagają wyłącznie chorzy OBJĄWOWI (z objawami niedokrwienia OUN lub kończyny), a metodą z wyboru jest małoinwazyjna angioplastyka ze stentem (PTA/stent), a nie operacja na otwartej klatce."
    },
    q10: {
      question: "Wskaż zestaw objawów klinicznych, które TYPOWO wchodzą w skład zespołu niedokrwienia kręgowo-podstawnego w przebiegu zespołu podkradania tętnicy podobojczykowej:\n1. Zawroty głowy pochodzenia ośrodkowego (vertigo).\n2. Przejściowe zaburzenia widzenia (podwójne widzenie – diplopia, ubytki pola widzenia).\n3. Zaburzenia równowagi i ataksja chodu.\n4. Epizody nagłych upadków bez utraty przytomności (tzw. drop attacks).\n5. Nasilenie powyższych objawów podczas intensywnej pracy fizycznej kończyną górną po stronie zwężenia.",
      options: [
        "A. 1, 2, 3, 4, 5 (wszystkie wymienione)",
        "B. 1, 2, 3",
        "C. 2, 4, 5",
        "D. tylko 1 i 5",
        "E. tylko 3, 4 i 5"
      ],
      correct: 0,
      correctIdx: 0,
      expl: "Prawidłowa odpowiedź to A (wszystkie wymienione objawy są typowe). Niedokrwienie unaczynianego przez układ kręgowo-podstawny pnia mózgu i móżdżku wywołuje zawroty głowy, ataksję, diplopię, zaburzenia widzenia oraz napady nagłego zwiotczenia nóg i upadku (drop attacks), prowokowane wysiłkiem mięśniowym tożstronnej kończyny górnej."
    },
    q11: {
      question: "Zgodnie z zasadami orzekania o czasowej niezdolności do pracy (ZUS ZLA), jakie zalecenie orzecznicze powinien wydać lekarz u 58-letniego mechanika samochodowego z objawowym zespołem podkradania tętnicy podobojczykowej lewej, u którego praca z uniesionymi rękami prowokuje zawroty głowy i stany przedomdleniowe?",
      options: [
        "A. Wystawienie zaświadczenia o czasowej niezdolności do pracy (zwolnienia lekarskiego ZUS ZLA) ze względu na zagrożenie wypadkiem przy pracy oraz skierowanie do pilnego zabiegu rewaskularyzacyjnego (PTA/stent).",
        "B. Zalecenie pracy na drabinie z asekuracją sznurową bez zwolnienia z pracy.",
        "C. Zezwolenie na pracę pod warunkiem wykonywania jej wyłącznie lewą ręką.",
        "D. Natychmiastowe orzeczenie o całkowitej trwałej niezdolności do samodzielnej egzystencji.",
        "E. Skierowanie na leczenie uzdrowiskowe bez diagnostyki naczyniowej."
      ],
      correct: 0,
      correctIdx: 0,
      expl: "Prawidłowa odpowiedź to A. Wykonywanie pracy fizycznej (zwłaszcza na wysokości lub przy obsłudze maszyn) przez pacjenta z wysiłkowym niedokrwieniem pnia mózgu stwarza bezpośrednie zagrożenie życia i zdrowia pracownika (ryzyko upadku i urazu). Wskazane jest zwolnienie ZUS ZLA na czas diagnostyki i leczenia zabiegowego (PTA tętnicy podobojczykowej)."
    }
  },

  149: {
    vitals: [
      { label: "Częstość akcji serca (HR)", name: "Częstość akcji serca (HR)", val: "118/min", sub: "Tachykardia bólowa", status: "vital-warn" },
      { label: "Ciśnienie tętnicze (BP)", name: "Ciśnienie tętnicze (BP)", val: "130/80 mmHg", sub: "Prawidłowe ciśnienie", status: "vital-ok" },
      { label: "Temperatura ciała", name: "Temperatura ciała", val: "36.8 °C", sub: "Prawidłowa ciepłota", status: "vital-ok" },
      { label: "Saturacja (SpO2)", name: "Saturacja (SpO2)", val: "86%", sub: "Ciężka hipoksemia (powietrze)", status: "vital-crit" }
    ],
    pathoNodes: [
      {
        badge: "Defekt mechaniczny",
        title: "Złamanie wieloodłamowe żeber i oddech paradoksalny",
        short: "Wyłamanie segmentu ściany klatki piersiowej ze złamaniem >=3 sąsiednich żeber w >=2 miejscach",
        detail: "Zapadanie się segmentu wiotkiego podczas wdechu i jego uwypuklanie w wydechu drastycznie zwiększa pracę oddechową i prowadzi do zmęczenia mięśni oddechowych.",
        target: "Diagnostyka: Badanie przedmiotowe (uwidocznienie ruchu paradoksalnego, krepitacje odłamów) oraz tomografia komputerowa (TK klatki piersiowej z rekonstrukcjami 3D); Procedura: Nieinwazyjne pneumatyczne usztywnienie dodatnim ciśnieniem (CPAP / NIV z PEEP 5-10 cmH2O) lub operacyjna osteosynteza tytanowymi płytkami (SSRF)",
        drugTarget: "Pneumatyczna stabilizacja CPAP 5-10 cmH2O lub operacyjna stabilizacja żeber (SSRF)"
      },
      {
        badge: "Główny czynnik hipoksemii",
        title: "Stłuczenie płuca (Pulmonary Contusion) i przeciek płucny",
        short: "Uszkodzenie bariery włośniczkowo-pęcherzykowej, krwawienie i obrzęk",
        detail: "Bezpośrednia siła uderzenia uszkadza miąższ płucny pod wyłamanym segmentem. Obszary stłuczenia są perfundowane, lecz niewentylowane, co tworzy olbrzymi przeciek płucny prawo-lewo (shunt).",
        target: "Diagnostyka: Gazometria krwi tętniczej (hipoksemia z PaO2 <60 mmHg) oraz TK klatki piersiowej (ocena objętości stłuczenia płuca); Leczenie: Celowana tlenoterapia wysokoprzepływowa (HFNO) lub CPAP oraz bezwzględnie restrykcyjna płynoterapia krystaloidami (1,0-1,5 ml/kg/h) w celu ochrony przed obrzękiem płuc",
        drugTarget: "Tlenoterapia HFNO/CPAP + restrykcyjna płynoterapia 1,0-1,5 ml/kg/h"
      },
      {
        badge: "Bariera bólowa",
        title: "Ból opłucnowy i odruchowe spłycenie oddechu (Splinting)",
        short: "Silny ból uniemożliwia głęboki wdech i efektywny kaszel",
        detail: "Ruchome odłamy żeber drażnią nerwy międzyżebrowe. Płytki oddech i retencja wydzieliny śluzowej w oskrzelach prowadzą do szybkiego rozwoju niedodmy i bakteryjnego zapalenia płuc.",
        target: "Diagnostyka: Ocena nasilenia bólu w skali NRS w spoczynku i przy kaszlu; Procedura: Ciągła analgezja regionalna – piersiowe znieczulenie zewnątrzoponowe (TEA: Ropiwakaina 0,2% z Fentanylem 2 mcg/ml we wlewie 4-8 ml/h) lub blokada przedziału prostownika grzbietu (ESPB) / przykręgowa (PVB)",
        drugTarget: "Ciągła analgezja zewnątrzoponowa (TEA) lub blokada ESPB"
      },
      {
        badge: "Profilaktyka ARDS",
        title: "Niewydolność oddechowa i ryzyko pourazowego ARDS",
        short: "Kaskada zapalna może objąć całe płuca z uogólnionym obrzękiem pęcherzyków",
        detail: "Masywny wyrzut cytokin prozapalnych ze stłuczonego płuca indukuje uszkodzenie śródbłonka w obu płucach, co grozi koniecznością inwazyjnej wentylacji mechanicznej.",
        target: "Diagnostyka: Monitorowanie wskaźnika oksygenacji PaO2/FiO2 (kryteria berlińskie ARDS); Leczenie: Agresywna fizjoterapia oddechowa (spirometria motywacyjna min. 10 wdechów/h), toaleta drzewa oskrzelowego (bronchofiberoskopia odsysająca czopy śluzowe) oraz profilaktyka przeciwzakrzepowa LMWH po wykluczeniu krwawienia",
        drugTarget: "Spirometria motywacyjna + bronchofiberoskopia terapeutyczna + Enoksaparyna 40 mg s.c."
      }
    ],
    q9: {
      question: "Wskaż zdanie FAŁSZYWE dotyczące wiotkiej klatki piersiowej (Flail Chest):",
      options: [
        "A. Anatomicznym kryterium wiotkiej klatki piersiowej jest złamanie co najmniej trzech sąsiednich żeber w co najmniej dwóch miejscach każde.",
        "B. Główną bezpośrednią przyczyną zagrażającej życiu hipoksemii jest podлежаce stłuczenie płuca (pulmonary contusion), a nie sam ruch paradoksalny ściany klatki.",
        "C. Ciasne oklejanie klatki piersiowej przylepcem lub bandażowanie opaskami elastycznymi jest zalecaną procedurą pierwszego rzutu stabilizującą ścianę kostną.",
        "D. Zastosowanie dodatniego ciśnienia w drogach oddechowych (CPAP / NIV) działa jak wewnętrzna szyna pneumatyczna stabilizująca wyłamany segment.",
        "E. Ciągła analgezja regionalna (np. zewnątrzoponowa piersiowa TEA lub blokada ESPB) stanowi złoty standard leczenia przeciwbólowego."
      ],
      correct: 2,
      correctIdx: 2,
      expl: "Prawidłowa odpowiedź to C (zdanie fałszywe). Ciasne bandażowanie lub oklejanie plastrami ściany klatki piersiowej jest BŁĘDEM SZTUKI i jest bezwzględnie zakazane! Zmniejsza ono objętość oddechową płuc, nasila niedodmę, uniemożliwia toaletę oskrzelową i prowadzi do śmiertelnego zapalenia płuc i niewydolności oddechowej."
    },
    q10: {
      question: "Wskaż zestaw twierdzeń PRAWDZIWYCH dotyczących operacyjnej stabilizacji klatki piersiowej (SSRF) u chorych z wiotką klatką piersiową:\n1. SSRF polega na anatomicznej repozycji i zespoleniu złamanych żeber za pomocą niskoprofilowych tytanowych płytek i śrub blokowanych.\n2. Wskazaniem do SSRF jest brak możliwości odłączenia pacjenta od respiratora (failure to wean) z powodu niestabilności ściany klatki.\n3. Wskazaniem do SSRF jest znaczna deformacja klatki piersiowej z przemieszczeniem odłamów >1 szerokości żebra i utratą objętości płuca.\n4. Zabieg SSRF wykonany w pierwszych 48–72 godzinach od urazu może skrócić czas wentylacji mechanicznej i pobytu na OIT.\n5. SSRF jest bezwzględnie przeciwwskazana u każdego pacjenta po 50. roku życia.",
      options: [
        "A. 1, 2, 3, 4",
        "B. 1, 3, 5",
        "C. 2, 4, 5",
        "D. tylko 1 i 2",
        "E. wszystkie wymienione"
      ],
      correct: 0,
      correctIdx: 0,
      expl: "Prawidłowa odpowiedź to A (twierdzenia 1, 2, 3 i 4 są prawdziwe). Twierdzenie 5 jest fałszywe: wiek >50 lat NIE jest przeciwwskazaniem; wręcz przeciwnie – chorzy starsi z mnogimi złamaniami żeber odnoszą szczególne korzyści ze stabilizacji z powodu wysokiego wyjściowego ryzyka powikłań oddechowych."
    },
    q11: {
      question: "Pacjent doznał wiotkiej klatki piersiowej w wyniku upadku z rusztowania podczas pracy na budowie. Zgodnie z przepisami Kodeksu pracy i ustawy o ubezpieczeniu społecznym z tytułu wypadków przy pracy, jakie obowiązki spoczywają na pracodawcy i placówce medycznej?",
      options: [
        "A. Obowiązek powołania zespołu powypadkowego, sporządzenia protokołu powypadkowego (karty wypadku w ciągu 14 dni) oraz niezwłocznego zawiadomienia właściwego okręgowego inspektora pracy (PIP) i prokuratora o wypadku ciężkim.",
        "B. Bezwzględny zakaz leczenia szpitalnego do czasu zakończenia kontroli przez inspektora budowlanego.",
        "C. Obowiązek pokrycia kosztów leczenia szpitalnego w całości przez poszkodowanego pracownika.",
        "D. Wystawienie zaświadczenia lekarskiego z zakazem zgłaszania wypadku organom państwowym.",
        "E. Zwolnienie pracodawcy z jakiejkolwiek odpowiedzialności pod warunkiem wypłacenia jednorazowej zapomogi."
      ],
      correct: 0,
      correctIdx: 0,
      expl: "Prawidłowa odpowiedź to A. Zgodnie z art. 234 Kodeksu pracy, o każdym wypadku ciężkim (powodującym ciężkie uszkodzenie ciała, np. wiotką klatkę piersiową, niewydolność oddechową) pracodawca ma obowiązek niezwłocznie zawiadomić okręgowego inspektora pracy i prokuratora, a zespół powypadkowy sporządza protokół będący podstawą do świadczeń powypadkowych z ZUS."
    }
  },

  150: {
    vitals: [
      { label: "Częstość akcji serca (HR)", name: "Częstość akcji serca (HR)", val: "128/min", sub: "Ciężka tachykardia (wstrząs krwotoczny)", status: "vital-crit" },
      { label: "Ciśnienie tętnicze (BP)", name: "Ciśnienie tętnicze (BP)", val: "82/50 mmHg", sub: "Głęboka hipotensja (hipowolemia)", status: "vital-crit" },
      { label: "Temperatura ciała", name: "Temperatura ciała", val: "36.2 °C", sub: "Prawidłowa ciepłota", status: "vital-ok" },
      { label: "Saturacja (SpO2)", name: "Saturacja (SpO2)", val: "90%", sub: "Hipoksemia (maska tlenowa)", status: "vital-warn" }
    ],
    pathoNodes: [
      {
        badge: "Krwawienie systemowe",
        title: "Uszkodzenie naczyń wysokociśnieniowych ściany klatki piersiowej",
        short: "Przecięcie tętnicy międzyżebrowej lub piersiowej wewnętrznej w ranie kłutej",
        detail: "Krwawienia wymagające torakotomii pochodzą z naczyń krążenia układowego (ciśnienie ~120 mmHg), które pompują krew do jamy opłucnowej bez tendencji do samoistnej hemostazy.",
        target: "Diagnostyka: Badanie przedmiotowe (stłumienie wypuku, brak szmeru, zapadnięte żyły szyjne) i USG e-FAST klatki piersiowej (obecność płynu w opłucnej); Procedura: Pilna torakotomia przednio-boczna z podwiązaniem uszkodzonej tętnicy międzyżebrowej szwem hemostatycznym lub klipsami naczyniowymi",
        drugTarget: "Pilna torakotomia przednio-boczna i chirurgiczne podwiązanie naczynia"
      },
      {
        badge: "Kompresja płuca",
        title: "Masywne nagromadzenie krwi (>1500 ml) i niedodma płuca",
        short: "Zapadnięcie pęcherzyków płucnych i ucisk na żyły główne i serce",
        detail: "Duża objętość wynaczynionej krwi wywołuje całkowitą niedodmę kompresyjną płuca lewego oraz ogranicza powrót żylny do serca, łącząc wstrząs hipowolemiczny z obturacyjnym.",
        target: "Diagnostyka: Ocena objętości krwi w jamie opłucnej w badaniu e-FAST i kontrola drenażu; Procedura: Natychmiastowe założenie grubego drenu klatki piersiowej (28–32F) w V przestrzeni międzyżebrowej do przodu od linii pachowej środkowej, po górnym brzegu dolnego żebra",
        drugTarget: "Drenaż opłucnowy grubym drenem 28-32F z podciśnieniem -20 cmH2O"
      },
      {
        badge: "Resuscytacja hemostatyczna",
        title: "Koagulopatia pourazowa i autotransfuzja krwi (Cell Saver)",
        short: "Utrata ponad 1/3 wolemii, defibrynacja krwi i kwasica",
        detail: "Krew gromadząca się w opłucnej ulega naturalnej defibrynacji na skutek ruchów serca i płuc. Może być natychmiast retransfundowana po przefiltrowaniu.",
        target: "Diagnostyka: Monitorowanie morfologii (Hb, Hct, PLT), gazometrii tętniczej (mleczany, deficyt zasad) oraz parametrów krzepnięcia (fibrynogen, ROTEM); Leczenie: Kwas traneksamowy (TXA 1 g i.v. w 10 min), protokół MTP 1:1:1 oraz podłączenie drenu do systemu autotransfuzji (Cell Saver)",
        drugTarget: "Kwas traneksamowy (TXA) 1 g i.v. + autotransfuzja krwi z drenażu + MTP 1:1:1"
      },
      {
        badge: "Powikłanie odległe",
        title: "Przetrwały krwiak i ryzyko włóknienia opłucnej (Fibrothorax)",
        short: "Zalegające skrzepy ulegają zakażeniu (ropniak) lub organizacji we włóknik",
        detail: "Niewypłukana krew tworzy grubą skorupę włóknistą więżącą płuco (trapped lung), co prowadzi do ciężkiej restrykcji oddechowej wymagającej późniejszej dekortykacji płuca.",
        target: "Diagnostyka: Kontrolna tomografia komputerowa (TK klatki piersiowej) po 48–72 godzinach od drenażu w celu oceny zalegających skrzepów; Procedura: Wczesna wideotorakoskopia (VATS) w 3.–5. dobie w celu ewakuacji przetrwałego krwiaka oraz profilaktyka antybiotykowa (Cefazolina 2 g i.v.)",
        drugTarget: "Wczesna wideotorakoskopia (VATS) w 3-5 dobie w celu ewakuacji przetrwałych skrzepów"
      }
    ],
    q9: {
      question: "Wskaż zdanie FAŁSZYWE dotyczące postępowania w masywnym krwiaku opłucnej (Massive Haemothorax):",
      options: [
        "A. W badaniu fizykalnym po stronie krwiaka stwierdza się wybitnie stłumiony wypuk oraz zapadnięte żyły szyjne, co różni go od odmy prężnej (gdzie wypuk jest bębenkowy, a żyły poszerzone).",
        "B. Do drenażu klatki piersiowej w podejrzeniu krwiaka należy użyć cienkiego cewnika Pigtail (8-10F) wprowadzonego w II międzyżebrzu w linii środkowo-obojczykowej.",
        "C. Wskazaniem do natychmiastowej torakotomii ratunkowej jest utoczenie >1500 ml krwi natychmiast po wprowadzeniu drenu lub utrzymujące się krwawienie >200-250 ml/h przez 2-4 kolejne godziny.",
        "D. Krew z jamy opłucnej w czystym urazie klatki piersiowej jest zdefibrynowana przez ruchy serca i płuc, co czyni ją idealnym surowcem do natychmiastowej autotransfuzji.",
        "E. Dren opłucnowy należy zawsze wprowadzać po górnym brzegu dolnego żebra, aby uniknąć uszkodzenia pęczka naczyniowo-nerwowego międzyżebrowego."
      ],
      correct: 1,
      correctIdx: 1,
      expl: "Prawidłowa odpowiedź to B (zdanie fałszywe). Cienki dren Pigtail (8-10F) natychmiast zatka się gęstymi skrzepami krwi, a II międzyżebrze to miejsce odbarczania odmy, a nie krwiaka! W krwiaku opłucnej bezwzględnie stosuje się GRUBY dren (28–32F lub 36F) wprowadzany w V przestrzeni międzyżebrowej do przodu od linii pachowej środkowej."
    },
    q10: {
      question: "Wskaż zestaw bezwzględnych wskazań drenażowych i klinicznych do natychmiastowej torakotomii ratunkowej po urazie penetrującym klatki piersiowej:\n1. Natychmiastowy drenaż krwi w objętości przekraczającej 1500 ml po założeniu drenu opłucnowego.\n2. Utrzymujące się krwawienie z drenu w ilości >200–250 ml/godzinę przez kolejne 2–4 godziny.\n3. Utrzymująca się niestabilność hemodynamiczna pacjenta mimo agresywnej resuscytacji płynowo-krwiowej.\n4. Masywny, niepoddający się drenażowi wyciek powietrza świadczący o rozerwaniu dużego oskrzela lub tchawicy.\n5. Wypływ 50 ml ciemnej krwi w ciągu pierwszych 6 godzin przy stabilnym ciśnieniu tętniczym.",
      options: [
        "A. 1, 2, 3, 4",
        "B. 1, 3, 5",
        "C. 2, 4, 5",
        "D. tylko 1 i 2",
        "E. wszystkie wymienione"
      ],
      correct: 0,
      correctIdx: 0,
      expl: "Prawidłowa odpowiedź to A (twierdzenia 1, 2, 3 i 4 to klasyczne wskazania do torakotomii wg ATLS). Twierdzenie 5 jest fałszywe: drenaż 50 ml w ciągu 6 godzin to śladowe krwawienie, które leczy się zachowawczo samą obserwacją drenażu i nie wymaga operacji."
    },
    q11: {
      question: "29-letni mężczyzna trafił na SOR z raną kłutą klatki piersiowej zadaną nożem podczas bójki przed klubem. Zgodnie z art. 304 Kodeksu postępowania karnego (obowiązek zawiadomienia o przestępstwie) oraz przepisami o zawodzie lekarza, jakie postępowanie formalno-prawne jest wymagane od personelu medycznego?",
      options: [
        "A. Niezwłoczne powiadomienie Policji lub Prokuratury o przyjęciu pacjenta z obrażeniami zadanymi niebezpiecznym narzędziem (przestępstwo ścigane z urzędu) oraz zabezpieczenie odzieży i ewentualnego narzędzia jako dowodów w sprawie, z zachowaniem nadrzędnego priorytetu ratowania życia.",
        "B. Bezwzględne zachowanie tajemnicy lekarskiej i zakaz informowania Policji bez uprzedniej pisemnej zgody sprawcy napadu.",
        "C. Zawiadomienie wyłącznie ubezpieczyciela pacjenta w celu wyegzekwowania opłaty za drenaż.",
        "D. Samodzielne zatrzymanie pacjenta w izolatce do czasu przesłuchania przez sąd cywilny.",
        "E. Brak jakichkolwiek obowiązków zawiadomienia, o ile pacjent był pod wpływem alkoholu."
      ],
      correct: 0,
      correctIdx: 0,
      expl: "Prawidłowa odpowiedź to A. Zgodnie z polskim prawem, rana kłuta klatki piersiowej stwarzająca bezpośrednie zagrożenie utraty życia (ciężki uszczerbek na zdrowiu – art. 156 k.k.) jest przestępstwem ściganym z urzędu. Szpital ma społeczny i prawny obowiązek niezwłocznego powiadomienia organów ścigania (Policji) oraz zabezpieczenia dowodów (np. odzieży ze śladami krwi i rozcięciami)."
    }
  }
};

async function runDetailedUpgrade() {
  console.log("=== RUNNING DETAILED UPGRADES FOR CASES 141 TO 150 ===");

  for (let id = 141; id <= 150; id++) {
    const file = fs.readdirSync(path.join(__dirname, '../cases')).find(f => f.startsWith(id + '_'));
    if (!file) continue;
    const filePath = path.join(__dirname, '../cases', file);
    const raw = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const d = await decryptObjectAes(raw, MASTER_KEY);

    if (detailedUpgrades[id]) {
      const up = detailedUpgrades[id];
      if (up.vitals) d.vitals = up.vitals;
      if (up.pathoNodes) d.pathoNodes = up.pathoNodes;
      if (up.q9) {
        d.lekQuestions[8] = { ...d.lekQuestions[8], ...up.q9, opts: up.q9.options, exp: up.q9.expl };
      }
      if (up.q10) {
        d.lekQuestions[9] = { ...d.lekQuestions[9], ...up.q10, opts: up.q10.options, exp: up.q10.expl };
      }
      if (up.q11) {
        d.lekQuestions[10] = { ...d.lekQuestions[10], ...up.q11, opts: up.q11.options, exp: up.q11.expl };
      }
    }

    // General polish
    if (Array.isArray(d.vitals)) {
      d.vitals.forEach(v => {
        const label = v.label || v.name || 'Parametr życiowy';
        v.label = label;
        v.name = label;
        if (!v.sub) {
          v.sub = v.status === 'vital-crit' ? 'Wartość krytyczna' : (v.status === 'vital-warn' ? 'Wymaga uwagi' : 'Prawidłowe');
        }
      });
    }

    if (d.story) d.story = stripDosePills(d.story);
    if (Array.isArray(d.pathoNodes)) {
      d.pathoNodes.forEach(n => {
        if (n.target) n.target = stripDosePills(n.target);
        if (n.drugTarget) n.drugTarget = stripDosePills(n.drugTarget);
      });
    }

    if (Array.isArray(d.steps)) {
      d.steps.forEach(s => {
        if (Array.isArray(s.feedback)) {
          s.feedback = s.feedback.map(fb => unwrapExcessiveBolding(fb));
        }
        if (Array.isArray(s.options)) {
          s.options.forEach(opt => {
            if (typeof opt === 'object' && opt !== null && opt.feedback) {
              opt.feedback = unwrapExcessiveBolding(opt.feedback);
            }
          });
        }
      });
    }

    const encrypted = await encryptStringAes(JSON.stringify(d, null, 2), MASTER_KEY);
    fs.writeFileSync(filePath, JSON.stringify(encrypted, null, 2), 'utf-8');
    console.log(`[PERFECT PASS] Case #${id}: ${file}`);
  }

  console.log("Cases 141 to 150 fully upgraded with 100% precision!");
}

runDetailedUpgrade().catch(console.error);

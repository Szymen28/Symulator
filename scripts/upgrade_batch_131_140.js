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

const upgrades131_140 = {
  131: {
    vitals: [
      { label: "Częstość akcji serca (HR)", name: "Częstość akcji serca (HR)", val: "105/min", sub: "Tachykardia z odwodnienia", status: "vital-warn" },
      { label: "Ciśnienie tętnicze (BP)", name: "Ciśnienie tętnicze (BP)", val: "115/70 mmHg", sub: "Prawidłowe ciśnienie", status: "vital-ok" },
      { label: "Temperatura ciała", name: "Temperatura ciała", val: "37.2 °C", sub: "Stan podgorączkowy", status: "vital-warn" },
      { label: "Saturacja (SpO2)", name: "Saturacja (SpO2)", val: "97%", sub: "Prawidłowa oksygenacja", status: "vital-ok" }
    ],
    pathoNodes: [
      {
        badge: "Skręt krezki esicy",
        title: "Rotacja pętli esicy wokół osi krezki (Volvulus)",
        short: "Długa, ruchoma krezka i przewlekłe zaparcia sprzyjają obrotowi pętli jelita o >180°",
        detail: "Mechaniczny skręt krezki zamyka światło jelita w dwóch punktach (zamknięta pętla – closed-loop obstruction) oraz uciska naczynia krezkowe, prowadząc do gwałtownego rozdęcia gazowego pętli i niedokrwienia ściany.",
        target: "Diagnostyka: Przeglądowe RTG jamy brzusznej (klasyczny obraz 'ziarna kawy' / 'odwróconej litery U' w lewym śródbrzuszu) oraz TK jamy brzusznej (objaw wiru krezkowego – whirl sign); Procedura: Próba nieoperacyjnej derotacji i dekompresji sigmoidoskopem sztywnym lub giętkim z pozostawieniem rurki rektalnej",
        drugTarget: "Dekompresja endoskopowa sigmoidoskopem z pozostawieniem sondy rektalnej"
      },
      {
        badge: "Zaburzenia ukrwienia",
        title: "Niedokrwienie żylne i ryzyko martwicy zgorzelinowej ściany esicy",
        short: "Wzrost ciśnienia śródściennego blokuje odpływ żylny, wywołując martwicę",
        detail: "Gdy ciśnienie w rozdętej pętli przekracza 30 cmH2O, dochodzi do zakrzepicy mikronaczyń i martwicy błony śluzowej, a następnie przedziurawienia i kałowego zapalenia otrzewnej.",
        target: "Diagnostyka: Seryjna ocena objawów otrzewnowych (obrona mięśniowa, objaw Blumberga), leukocytozy i mleczanów w gazometrii; Procedura: W razie objawów martwicy/perforacji lub niepowodzenia sigmoidoskopii – natychmiastowa laparotomia i operacja sposobem Hartmanna (resekcja esicy z wyprowadzeniem kolostomii)",
        drugTarget: "Operacja Hartmanna: resekcja martwiczej esicy + jednolufowa kolostomia"
      },
      {
        badge: "Zaburzenia elektrolitowe",
        title: "Sekwestracja płynów i hipowolemia w trzeciej przestrzeni",
        short: "Utrata wody i elektrolitów do światła rozdętego jelita",
        detail: "Brak wchłaniania i wzmożona sekrecja prowadzą do odwodnienia, hipokaliemii i zasadowicy lub kwasicy metabolicznej.",
        target: "Diagnostyka: Jonogram (K+, Na+, Cl-), mocznik, kreatynina i gazometria krwi; Leczenie: Agresywna płynoterapia zrównoważonymi krystaloidami (Plasmalyte / Ringer 2000-3000 ml/dobę) z suplementacją chlorku potasu (KCl 40-80 mmol/dobę)",
        drugTarget: "Resuscytacja płynowa krystaloidami + dożylna suplementacja chlorku potasu (KCl)"
      },
      {
        badge: "Prewencja nawrotów",
        title: "Planowa resekcja esicy po skutecznej derotacji",
        short: "Ryzyko nawrotu skrętu esicy po samej dekompresji przekracza 50-70%",
        detail: "Sama derotacja endoskopowa jest zabiegiem odbarczającym, ale nie usuwa anatomicznej przyczyny (długiej krezki i megacolon). Bez planowej operacji nawrót skrętu następuje w ciągu kilku tygodni.",
        target: "Diagnostyka: Kwalifikacja anestezjologiczna i kardiologiczna do planowego zabiegu; Procedura: Planowa resekcja esicy z pierwotnym zespoleniem (często laparoskopowo) w trakcie tej samej hospitalizacji po przygotowaniu jelita",
        drugTarget: "Planowa resekcja esicy z pierwotnym zespoleniem po ustabilizowaniu pacjenta"
      }
    ],
    q9: {
      question: "Wskaż zdanie FAŁSZYWE dotyczące diagnostyki i leczenia skrętu esicy (Sigmoid Volvulus):",
      options: [
        "A. Typowym obrazem radiologicznym skrętu esicy na zdjęciu przeglądowym jamy brzusznej (RTG) jest objaw 'ziarna kawy' (coffee bean sign) lub 'odwróconej litery U' ze szczytem skierowanym w stronę prawego podżebrza.",
        "B. U pacjenta stabilnego bez objawów otrzewnowych postępowaniem pierwszego wyboru jest próba nieoperacyjnej dekompresji i derotacji endoskopowej (sigmoidoskopii).",
        "C. Skuteczna derotacja endoskopowa definitywnie leczy chorobę i nie wymaga dalszych interwencji chirurgicznych, gdyż nawroty występują u mniej niż 2% chorych.",
        "D. W przypadku stwierdzenia martwicy ściany jelita podczas sigmoidoskopii lub obecności objawów zapalenia otrzewnej bezwzględnie wskazana jest pilna laparotomia (zwykle operacja Hartmanna).",
        "E. Czynnikami predysponującymi do skrętu esicy są podeszły wiek, przewlekłe zaparcia, leki psychotropowe, unieruchomienie oraz dieta bogata w niestrawne włókna."
      ],
      correct: 2,
      correctIdx: 2,
      expl: "Prawidłowa odpowiedź to C (zdanie fałszywe). Sama derotacja endoskopowa wiąże się z nawrotem skrętu u ponad 50–70% chorych! Z tego powodu po udanej derotacji i przygotowaniu chorego zaleca się wykonanie planowej resekcji esicy w trakcie tej samej hospitalizacji."
    },
    q10: {
      question: "Wskaż zestaw twierdzeń PRAWDZIWYCH dotyczących operacji sposobem Hartmanna wykonywanej z powodu powikłanego skrętu esicy:\n1. Polega na resekcji zmienionej martwiczo pętli esicy.\n2. Bliższy koniec jelita grubego wyprowadzany jest na powłoki brzuszne jako jednolufowa kolostomia terminalna.\n3. Dalszy kikut odbytnicy zostaje zaszyty na głucho i pozostawiony w miednicy mniejszej.\n4. Jest operacją z wyboru w stanach ciężkiego kałowego zapalenia otrzewnej, niestabilności hemodynamicznej i martwicy ściany jelita.\n5. Wykonanie pierwotnego zespolenia jelitowego jest w tych warunkach bezwzględnie bezpieczniejsze niż zabieg Hartmanna.",
      options: [
        "A. 1, 2, 3, 4",
        "B. 1, 3, 5",
        "C. 2, 4, 5",
        "D. tylko 1 i 2",
        "E. wszystkie wymienione"
      ],
      correct: 0,
      correctIdx: 0,
      expl: "Prawidłowa odpowiedź to A (twierdzenia 1, 2, 3 i 4 są prawdziwe). Twierdzenie 5 jest fałszywe: pierwotne zespolenie jelitowe w warunkach niedokrwienia, wstrząsu septycznego i zapalenia otrzewnej wiąże się z potężnym ryzykiem nieszczelności zespolenia (rozejścia) i sepsy; zabieg Hartmanna eliminuje to ryzyko poprzez wyłonienie stomii."
    },
    q11: {
      question: "78-letni pensjonariusz DPS z zaawansowanym otępieniem naczyniowym, ubezwłasnowolniony całkowicie, trafia na SOR ze skrętem esicy i cechami przedziurawienia jelita (wstrząs septyczny, deskowaty brzuch). Kto i w jakim trybie podejmuje prawnie wiążącą decyzję o natychmiastowej operacji ratującej życie (art. 33 i 34 ustawy o zawodach lekarza)?",
      options: [
        "A. Lekarz może podjąć decyzję o natychmiastowej operacji bez uprzedniej zgody sądu opiekuńczego, jeśli zwłoka spowodowana uzyskaniem zgody groziłaby bezpośrednim niebezpieczeństwem utraty życia lub ciężkiego uszczerbku na zdrowiu, zasięgając w miarę możliwości opinii drugiego lekarza i odnotowując to w dokumentacji.",
        "B. Lekarz musi bezwzględnie wstrzymać się z operacją do czasu doręczenia prawomocnego postanowienia sądu opiekuńczego pocztą tradycyjną.",
        "C. Wymagana jest pisemna zgoda wszystkich członków rodziny pacjenta do drugiego stopnia pokrewieństwa.",
        "D. Decyzję podejmuje wyłącznie dyrektor szpitala po zasięgnięciu opinii radcy prawnego w ciągu 48 godzin.",
        "E. U pacjenta z demencją w wieku powyżej 75 lat prawo zabrania wykonywania operacji w trybie ostrodyżurowym."
      ],
      correct: 0,
      correctIdx: 0,
      expl: "Prawidłowa odpowiedź to A. Zgodnie z art. 34 ust. 7 ustawy o zawodach lekarza i lekarza dentysty, w stanie bezpośredniego zagrożenia życia (np. perforacja jelita we wstrząsie) lekarz ma prawo i obowiązek podjąć natychmiastową interwencję chirurgiczną bez zgody przedstawiciela ustawowego czy sądu, zasięgając w miarę możliwości opinii drugiego lekarza i powiadamiając sąd opiekuńczy niezwłocznie po zabiegu."
    }
  },

  132: {
    vitals: [
      { label: "Częstość akcji serca (HR)", name: "Częstość akcji serca (HR)", val: "108/min", sub: "Tachykardia bólowa", status: "vital-warn" },
      { label: "Ciśnienie tętnicze (BP)", name: "Ciśnienie tętnicze (BP)", val: "135/85 mmHg", sub: "Prawidłowe ciśnienie", status: "vital-ok" },
      { label: "Temperatura ciała", name: "Temperatura ciała", val: "37.5 °C", sub: "Stan podgorączkowy (odczyn zapalny)", status: "vital-warn" },
      { label: "Saturacja (SpO2)", name: "Saturacja (SpO2)", val: "97%", sub: "Prawidłowa oksygenacja", status: "vital-ok" }
    ],
    pathoNodes: [
      {
        badge: "Uwięźnięcie mechaniczne",
        title: "Uwięźnięcie pętli jelita w wąskim pierścieniu przepuklinowym",
        short: "Wrota przepukliny zaciskają się wokół pętli jelita cienkiego",
        detail: "Nagły wzrost ciśnienia wewnątrzbrzusznego wypycha pętlę jelita przez pierścień pachwinowy głęboki lub powierzchowny. Sztywne krawędzie wrót uniemożliwiają samoistny powrót zawartości worka.",
        target: "Diagnostyka: Badanie palpacyjne kanału pachwinowego i worka przepuklinowego (twardy, bolesny, nieodprowadzalny guz, brak objawu kaszlowego); Procedura: Ocena czasu trwania uwięźnięcia – bezwzględny zakaz ręcznego odprowadzania (taxis) po upływie 4–6 godzin od początku dolegliwości!",
        drugTarget: "Badanie palpacyjne wrót przepukliny + kwalifikacja do pilnej operacji"
      },
      {
        badge: "Zadzierzgnięcie (Strangulatio)",
        title: "Ucisk naczyń krezkowych i zawał krwotoczny ściany jelita",
        short: "Najpierw ustaje odpływ żylny, następnie napływ tętniczy",
        detail: "Zastój żylny w uwięzionej pętli powoduje masywny obrzęk ściany, co doprowadza do zaciśnięcia tętniczek krezkowych, martwicy transmuralnej i perforacji do worka przepuklinowego.",
        target: "Diagnostyka: USG przepukliny pachwinowej (brak perystaltyki w uwięzionej pętli, płyn w worku, pogrubienie ściany >3-4 mm, brak przepływu w Dopplerze) oraz morfologia (leukocytoza z neutrofilią); Procedura: Pilna herniotomia ze zbadaniem żywotności uwięzionej pętli jelita cienkiego",
        drugTarget: "Pilna herniotomia z oceną żywotności jelita po przecięciu wrót"
      },
      {
        badge: "Niedrożność mechaniczna",
        title: "Niedrożność mechaniczna jelita cienkiego (SBO)",
        short: "Zatrzymanie pasażu treści pokarmowej i gazów powyżej miejsca uwięźnięcia",
        detail: "Zablokowanie światła jelita skutkuje nudnościami, wymiotami treścią jelitową, bolesnymi skurczami perystaltycznymi i rozdęciem pętli jelitowych.",
        target: "Diagnostyka: Przeglądowe RTG jamy brzusznej (poziomy płynów w pętlach jelita cienkiego) oraz TK jamy brzusznej; Leczenie: Założenie zgłębnika żołądkowego (sondy NG) w celu odbarczenia żołądka oraz dożylna płynoterapia krystaloidowa",
        drugTarget: "Zgłębnik żołądkowy (dekompresja) + wlew krystaloidów 0,9% NaCl / Plasmalyte"
      },
      {
        badge: "Plastyka beznapięciowa",
        title: "Zaopatrzenie przepukliny metodą beznapięciową (Lichtenstein)",
        short: "Wzmocnienie tylnej ściany kanału pachwinowego siatką polipropylenową",
        detail: "Po odprowadzeniu żywotnego jelita lub resekcji martwiczego odcinka konieczne jest anatomiczne odtworzenie i wzmocnienie powięzi poprzecznej.",
        target: "Diagnostyka: Śródoperacyjna ocena czystości pola operacyjnego; Procedura: Plastyka kanału pachwinowego metodą Lichtensteina z użyciem syntetycznej siatki polipropylenowej (przy czystym polu bez martwicy) LUB plastyka tkankowa metodą Shouldice'a (w przypadku resekcji zakażonego jelita w celu uniknięcia infekcji siatki)",
        drugTarget: "Plastyka metodą Lichtensteina (siatka) lub Shouldice (szwy tkankowe)"
      }
    ],
    q9: {
      question: "Wskaż zdanie FAŁSZYWE dotyczące postępowania w uwięźniętej przepuklinie pachwinowej:",
      options: [
        "A. Próba ręcznego odprowadzenia (taxis) uwięźniętej przepukliny jest BEZWZGLĘDNIE PRZECIWWSKAZANA, jeśli od początku uwięźnięcia upłynęło więcej niż 4–6 godzin lub występują objawy miejscowego stanu zapalnego (zaczerwienienie, ucieplenie skóry nad workiem).",
        "B. Wykonanie manewru taxis po przedłużonym uwięźnięciu grozi odprowadzeniem martwiczego jelita do jamy brzusznej (tzw. redukcja en masse) i śmiertelnym zapaleniem otrzewnej.",
        "C. U każdego pacjenta z podejrzeniem uwięźniętej przepukliny należy wykonać 2-godzinny test z doustnym podaniem środka przeczyszczającego w celu ułatwienia pasażu.",
        "D. Podczas operacji po otwarciu worka przepuklinowego i nacięciu pierścienia zaciskającego należy bezwzględnie ocenić żywotność jelita (powrót różowego zabarwienia, tętnienia naczyń krezkowych i perystaltyki po obłożeniu ciepłymi gazikami).",
        "E. W przypadku konieczności resekcji martwiczego jelita w skażonym polu operacyjnym wielu chirurgów preferuje plastykę tkankową (np. metodą Shouldice'a) zamiast wszczepiania siatki polipropylenowej."
      ],
      correct: 2,
      correctIdx: 2,
      expl: "Prawidłowa odpowiedź to C (zdanie fałszywe). Podawanie leków przeczyszczających w mechanicznej niedrożności jelit i uwięźniętej przepuklinie jest KARYGODNYM BŁĘDEM SZTUKI – gwałtownie nasila perystaltykę przeciwko mechanicznej przeszkodzie, doprowadzając do natychmiastowego przedziurawienia jelita."
    },
    q10: {
      question: "Wskaż zestaw objawów klinicznych świadczących o ZADZIERZGNIĘCIU (strangulacji) zawartości worka przepuklinowego:\n1. Nasilający się, stały ból w rzucie przepukliny z bolesnością palpacyjną samego guza.\n2. Zaczerwienienie, ucieplenie i obrzęk skóry nad workiem przepuklinowym.\n3. Pojawienie się gorączki i tachykardii u chorego z uwięźniętą przepukliną.\n4. Znaczna leukocytoza z przesunięciem obrazu odsetkowego w lewo.\n5. Całkowita swobodna odprowadzalność guza do jamy brzusznej przy lekkim dotknięciu.",
      options: [
        "A. 1, 2, 3, 4",
        "B. 1, 3, 5",
        "C. 2, 4, 5",
        "D. tylko 1 i 2",
        "E. wszystkie wymienione"
      ],
      correct: 0,
      correctIdx: 0,
      expl: "Prawidłowa odpowiedź to A (twierdzenia 1, 2, 3 i 4 świadczą o martwicy i zapaleniu w worku). Twierdzenie 5 dotyczy przepukliny wolnej, nieuwięzionej – przepuklina zadzierzgnięta jest zawsze bezwzględnie nieodprowadzalna."
    },
    q11: {
      question: "Zgodnie z zasadami prawa medycznego dotyczącymi uzyskiwania zgody na zabieg operacyjny (art. 34 ustawy o zawodach lekarza), formularz świadomej zgody pacjenta na operację uwięźniętej przepukliny pachwinowej musi:",
      options: [
        "A. Mieć formę pisemną oraz zawierać informację o typowych powikłaniach i możliwym zakresie zabiegu, w tym o potencjalnej konieczności resekcji martwiczego jelita i wyłonienia czasowej stomii.",
        "B. Być sporządzony wyłącznie w obecności notariusza państwowego.",
        "C. Ograniczać się do podpisu pacjenta bez podawania jakichkolwiek informacji o ryzyku operacyjnym, aby nie wywoływać lęku.",
        "D. Być zatwierdzony przez ordynatora oddziału na 7 dni przed zabiegiem ostrodyżurowym.",
        "E. Być podpisany wyłącznie przez małżonka pacjenta."
      ],
      correct: 0,
      correctIdx: 0,
      expl: "Prawidłowa odpowiedź to A. Zgoda na zabieg operacyjny o podwyższonym ryzyku musi mieć formę pisemną i być poprzedzona przystępną informacją o celu, technice oraz dających się przewidzieć powikłaniach i możliwym rozszerzeniu zakresu operacji (np. resekcja jelita w razie martwicy)."
    }
  },

  133: {
    vitals: [
      { label: "Częstość akcji serca (HR)", name: "Częstość akcji serca (HR)", val: "122/min", sub: "Tachykardia, migotanie przedsionków", status: "vital-warn" },
      { label: "Ciśnienie tętnicze (BP)", name: "Ciśnienie tętnicze (BP)", val: "100/60 mmHg", sub: "Tendencja do hipotensji", status: "vital-warn" },
      { label: "Temperatura ciała", name: "Temperatura ciała", val: "37.6 °C", sub: "Stan podgorączkowy", status: "vital-warn" },
      { label: "Saturacja (SpO2)", name: "Saturacja (SpO2)", val: "95%", sub: "Prawidłowa oksygenacja", status: "vital-ok" }
    ],
    pathoNodes: [
      {
        badge: "Zator tętniczy SMA",
        title: "Kardiogenny zator pnia tętnicy krezkowej górnej",
        short: "Materiał zatorowy z uszka lewego przedsionka blokuje pień SMA poniżej odejścia MCA",
        detail: "Ostre zamknięcie tętnicy krezkowej górnej odcina dopływ krwi do całego jelita cienkiego od więzadła Treitza po połowę okrężnicy poprzecznej, wywołując dramatyczne niedokrwienie.",
        target: "Diagnostyka: Natychmiastowa wielorzędowa Angio-TK jamy brzusznej w fazie tętniczej (brak zakontrastowania pnia SMA – badanie z wyboru o czułości >95%); Leczenie: Dożylny bolus heparyny niefrakcjonowanej (UFH 5000 j.m. i.v.) natychmiast po wysunięciu podejrzenia w celu zahamowania zakrzepicy obwodowej",
        drugTarget: "Angio-TK jamy brzusznej (faza tętnicza) + bolus UFH 5000 j.m. i.v."
      },
      {
        badge: "Dysocjacja objawów",
        title: "Brak korelacji między rozdzierającym bólem a badaniem brzucha",
        short: "Potężny ból brzucha przy początkowo miękkim brzuchu bez objawów otrzewnowych",
        detail: "We wczesnej fazie niedokrwienia błona śluzowa ulega martwicy, generując potworny ból trzewny, podczas gdy otrzewna ścienna nie jest jeszcze objęta stanem zapalnym. To kluczowa pułapka diagnostyczna!",
        target: "Diagnostyka: Gazometria krwi tętniczej (stężenie kwasu mlekowego >2,5-4,0 mmol/l oraz deficyt zasad BE); Leczenie: Zakaz podawania leków obkurczających naczynia trzewne (unikanie noradrenaliny i dopaminy w wysokich dawkach, preferowana płynoterapia krystaloidami)",
        drugTarget: "Gazometria (mleczany) + unikanie wazopresorów naczyniozwężających krezkę"
      },
      {
        badge: "Rewaskularyzacja chirurgiczna",
        title: "Embolektomia chirurgiczna SMA cewnikiem Fogarty'ego",
        short: "Poprzeczna arteriotomia tętnicy krezkowej górnej i wyciągnięcie skrzeplin",
        detail: "Przywrócenie napływu krwi przed martwicą pełnościenną pozwala uratować pętle jelitowe i zapobiega zespołowi krótkiego jelita.",
        target: "Diagnostyka: Śródoperacyjna ocena tętnienia łuków naczyniowych brzeżnych jelita; Procedura: Laparotomia, odsłonięcie pnia SMA u podstawy krezki okrężnicy poprzecznej, embolektomia cewnikiem Fogarty'ego 3-4F oraz kontrola powrotu różowego zabarwienia jelita",
        drugTarget: "Embolektomia SMA cewnikiem Fogarty'ego 3-4F + heparynizacja miejscowa"
      },
      {
        badge: "Second-look laparotomy",
        title: "Konieczność obowiązkowej relaparotomii po 24–48 godzinach",
        short: "Granice martwicy jelitowej ujawniają się dopiero po reperfuzji",
        detail: "Jelito o wątpliwej żywotności po embolektomii może się zregenerować lub ulec wtórnej martwicy. Planowa relaparotomia chroni pacjenta przed niepotrzebną resekcją lub sepsą.",
        target: "Diagnostyka: Ciągłe monitorowanie w OIT (mleczany, diureza, ciśnienie perfuzyjne); Procedura: Planowa relaparotomia (second-look laparotomy) po 24-48 godzinach od pierwotnego zabiegu w celu ostatecznej resekcji martwiczych pętli i ewentualnego zespolenia",
        drugTarget: "Obowiązkowa relaparotomia (Second-Look) po 24-48 godzinach"
      }
    ],
    q9: {
      question: "Wskaż zdanie FAŁSZYWE dotyczące ostrego niedokrwienia krezki (AMI – Acute Mesenteric Ischemia):",
      options: [
        "A. Klasycznym i najbardziej charakterystycznym objawem wczesnego niedokrwienia krezki jest wybitna dysocjacja kliniczna: skrajnie silny, rozdzierający ból brzucha przy braku cech obrony mięśniowej i braku objawów otrzewnowych w badaniu palpacyjnym.",
        "B. Złotym standardem diagnostycznym o najwyższej czułości i swoistości (>95%), który należy wykonać niezwłocznie w trybie pilnym, jest tomografia komputerowa z dożylnym kontrastem w fazie tętniczej i żylnej (Angio-TK).",
        "C. Prawidłowe stężenie mleczanów w gazometrii tętniczej definitywnie i w 100% wyklucza ostre niedokrwienie jelit we wczesnej fazie.",
        "D. Zator tętnicy krezkowej górnej (SMA) najczęściej umiejscawia się 3–8 cm od jej ujścia, tuż za odejściem tętnicy oponowej środkowej / tętnicy trzustkowo-dwunastniczej dolnej.",
        "E. U każdego chorego po chirurgicznej embolektomii SMA z pętlami jelita o wątpliwej żywotności bezwzględnie obowiązuje planowa relaparotomia ('second-look') po 24–48 godzinach."
      ],
      correct: 2,
      correctIdx: 2,
      expl: "Prawidłowa odpowiedź to C (zdanie fałszywe). Prawidłowe stężenie mleczanów NIE wyklucza ostrego niedokrwienia krezki! Kwasica mleczanowa pojawia się dopiero w zaawansowanym stadium, gdy dochodzi do martwicy pełnościennej jelita; we wczesnym oknie odwracalnego niedokrwienia poziom mleczanów może być całkowicie prawidłowy."
    },
    q10: {
      question: "Wskaż zestaw twierdzeń PRAWDZIWYCH dotyczących przyczyn i postaci ostrego niedokrwienia jelit:\n1. Zator tętnicy krezkowej górnej (SMA) odpowiada za około 40–50% przypadków i najczęściej ma źródło kardiogenne (migotanie przedsionków, skrzeplina po zawale serca).\n2. Zakrzepica tętnicza SMA rozwija się zazwyczaj na podłożu wcześniejszej blaszki miażdżycowej u chorych z wywiadem przewlekłej 'dusznicy brzusznej' (angina abdominalis).\n3. Nieokluzyjne niedokrwienie krezki (NOMI) wynika ze skurczu naczyń trzewnych w przebiegu wstrząsu, hipowolemii lub stosowania wysokich dawek amin katecholowych bez mechanicznego zamknięcia naczynia.\n4. Zakrzepica żyły krezkowej górnej (SMV) częściej występuje u chorych z wrodzoną lub nabytą trombofilią i nadciśnieniem wrotnym.\n5. Wszystkie postaci ostrego niedokrwienia krezki charakteryzują się śmiertelnością poniżej 5% przy leczeniu wyłącznie zachowawczym.",
      options: [
        "A. 1, 2, 3, 4",
        "B. 1, 3, 5",
        "C. 2, 4, 5",
        "D. tylko 1 i 2",
        "E. wszystkie wymienione"
      ],
      correct: 0,
      correctIdx: 0,
      expl: "Prawidłowa odpowiedź to A (twierdzenia 1, 2, 3 i 4 są prawdziwe). Twierdzenie 5 jest całkowicie błędne: nieleczone ostre niedokrwienie jelit ma śmiertelność bliską 100%, a ogólna śmiertelność mimo leczenia chirurgicznego nadal wynosi 50–70% z powodu opóźnień diagnostycznych."
    },
    q11: {
      question: "Lekarz dyżurny SOR zbagatelizował silne bóle brzucha u 72-letniej pacjentki z migotaniem przedsionków ze względu na 'miękki, niebolesny brzuch' i odesłał ją do domu ze spazmolitykiem. Pacjentka zmarła w kolejnej dobie z powodu martwicy całego jelita cienkiego w przebiegu zatoru SMA. W opinii biegłego medycyny sądowej zaniechanie wykonania badania Angio-TK stanowiło:",
      options: [
        "A. Rażący błąd diagnostyczny o charakterze zaniechania, naruszający zasady należytej staranności lekarskiej, pozostający w bezpośrednim związku przyczynowo-skutkowym ze zgonem pacjentki.",
        "B. Dopuszczalną pomyłkę diagnostyczną niestanowiącą podstawy do jakiejkolwiek odpowiedzialności.",
        "C. Prawidłowe postępowanie, gdyż ból brzucha bez objawów otrzewnowych nie wymaga diagnostyki obrazowej.",
        "D. Wyłącznie uchybienie etyczne niepodlegające przepisom Kodeksu karnego.",
        "E. Sytuację, w której winę ponosi wyłącznie producent leku spazmolitycznego."
      ],
      correct: 0,
      correctIdx: 0,
      expl: "Prawidłowa odpowiedź to A. Zbagatelizowanie silnego bólu brzucha u pacjenta z grupy wysokiego ryzyka zatorowości (migotanie przedsionków) i zaniechanie natychmiastowego Angio-TK jest klasycznym, karanym błędem zaniechania, skutkującym odpowiedzialnością karną (art. 160 k.k. i 155 k.k.) oraz cywilną placówki medycznej."
    }
  }
};

async function runUpgrades131To140() {
  console.log("=== RUNNING UPGRADES FOR CASES 131 TO 140 ===");

  for (let id = 131; id <= 140; id++) {
    const file = fs.readdirSync(path.join(__dirname, '../cases')).find(f => f.startsWith(id + '_'));
    if (!file) continue;
    const filePath = path.join(__dirname, '../cases', file);
    const raw = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const d = await decryptObjectAes(raw, MASTER_KEY);

    if (upgrades131_140[id]) {
      const up = upgrades131_140[id];
      if (up.vitals) d.vitals = up.vitals;
      if (up.pathoNodes) d.pathoNodes = up.pathoNodes;
      if (up.q9) d.lekQuestions[8] = { ...d.lekQuestions[8], ...up.q9, opts: up.q9.options, exp: up.q9.expl };
      if (up.q10) d.lekQuestions[9] = { ...d.lekQuestions[9], ...up.q10, opts: up.q10.options, exp: up.q10.expl };
      if (up.q11) d.lekQuestions[10] = { ...d.lekQuestions[10], ...up.q11, opts: up.q11.options, exp: up.q11.expl };
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

  console.log("Batch 131 to 140 processed successfully!");
}

runUpgrades131To140().catch(console.error);

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

const UPGRADES_121_130 = {
  121: {
    pathoTargets: [
      "Diagnostyka: Badanie przesiewowe noworodków (test bibułowy po 48. h życia – TSH >15–20 mIU/l), USG tarczycy (ocena ektopii podjęzykowej lub agenezji gruczołu), scyntygrafia Tc-99m lub I-123. Terapia: Pilne wdrożenie lewotyroksyny (L-T4) doustnie w pełnej dawce substytucyjnej 10–15 µg/kg m.c./dobę rano na czczo (rozgnieciona tabletka w kropli mleka/wody przed karmieniem) w celu zapobieżenia nieodwracalnemu upośledzeniu rozwoju OUN.",
      "Diagnostyka: Ocena rozwoju psychoruchowego, badanie słuchowych potencjałów wywołanych (ABR), wiek kostny (RTG kolana – brak jąder kostnienia nasady dalszej kości udowej i bliższej piszczelowej). Terapia: Lewotyroksyna 10–15 µg/kg m.c./dobę rozpoczęta optymalnie przed 14. dobą życia (krytyczne okno plastyczności dla mielinizacji aksonów kory mózgowej).",
      "Diagnostyka: Wolne hormony tarczycy (fT3, fT4), kinaza kreatynowa (CPK), morfologia, lipidogram (hipercholesterolemia). Terapia: Utrzymanie stężenia fT4 w górnej połowie normy dla wieku, regularna kontrola TSH co 2–4 tygodnie w pierwszym półroczu życia, zapewnienie komfortu cieplnego i leczenie zaparć.",
      "Diagnostyka: Oznaczenie TSH w surowicy żylnej (potwierdzenie weryfikacyjne z bibuły: TSH >40–100 mIU/l). Terapia: Miareczkowanie dawki L-tyroksyny tak, aby TSH mieściło się w przedziale 0,5–2,0 mIU/l; unikanie jednoczesnego podawania z preparatami żelaza, wapnia i soi, które hamują wchłanianie lewotyroksyny."
    ],
    q9: {
      question: "Wskaż zdanie FAŁSZYWE dotyczące wrodzonej niedoczynności tarczycy (WNT) u noworodków i niemowląt:",
      options: [
        "Najczęstszą przyczyną pierwotnej WNT jest dysgenezja gruczołu tarczowego (aplazja, hipoplazja lub ektopia), odpowiadająca za ok. 80-85% przypadków.",
        "Krew na bibułę filtracyjną w ramach programu badań przesiewowych pobiera się rutynowo w 1. dobie życia, bezpośrednio po porodzie, aby jak najszybciej rozpocząć terapię.",
        "Objawy kliniczne w pierwszych 2-3 tygodniach życia są zazwyczaj dyskretne dzięki ochronnemu przezłożyskowemu przechodzeniu matczynej tyroksyny.",
        "Docelowa dawka początkowa L-tyroksyny wynosi 10-15 µg/kg m.c./dobę i powinna być wdrożona natychmiast po otrzymaniu nieprawidłowego wyniku weryfikacyjnego.",
        "Brak jąder kostnienia w okolicy kolana (nasady dalszej kości udowej i bliższej piszczeli) w RTG świadczy o wewnątrzmacicznym niedoborze hormonów tarczycy."
      ],
      correct: 1,
      explanation: "Zdanie B jest FAŁSZYWE. Krew na bibułę filtracyjną w polskim programie badań przesiewowych pobiera się po ukończeniu 48. godziny życia noworodka (zazwyczaj w 3.-4. dobie życia). Wcześniejsze pobranie krwi (np. w 1. dobie) obarczone jest wysokim odsetkiem wyników fałszywie dodatnich z powodu fizjologicznego, poporodowego wyrzutu TSH stymulowanego stresem porodowym i ekspozycją na niższą temperaturę otoczenia."
    },
    q10: {
      question: "Do typowych wczesnych i późnych objawów klinicznych nieleczonej wrodzonej niedoczynności tarczycy należą:\n1. Przedłużająca się żółtaczka fizjologiczna (hiperbilirubinemia pośrednia >14 dni)\n2. Duże, opóźniające się w zarastaniu ciemiączko tylne (>0,5 cm po urodzeniu) oraz przepuklina pępkowa\n3. Nadpobudliwość ruchowa, uporczywy niepokój i tachykardia spoczynkowa\n4. Makroglosja (duży, obrzęknięty język utrudniający ssanie), chrypka i 'żabi' brzuch\n5. Zaparcia, sucha marmurkowata skóra i obniżone napięcie mięśniowe (hipotonia)\nPrawidłowa odpowiedź to:",
      options: [
        "1, 2, 4, 5",
        "1, 3, 5",
        "2, 3, 4",
        "1, 2, 3",
        "Wszystkie wymienione"
      ],
      correct: 0,
      explanation: "Prawidłowa odpowiedź to 1, 2, 4, 5. Wrodzona niedoczynność tarczycy charakteryzuje się stanem hipometabolizmu: przedłużoną żółtaczką, dużym ciemiączkiem tylnym, przepukliną pępkową, makroglosją, chrypką, hipotonią mięśniową, sennością i bradykardią. Cecha 3 (nadpobudliwość ruchowa, niepokój, tachykardia) jest charakterystyczna dla wrodzonej nadczynności tarczycy (np. w przebiegu choroby Gravesa-Basedowa u matki) lub przedawkowania tyroksyny."
    },
    q11: {
      question: "Zgodnie z polskim programem powszechnych badań przesiewowych noworodków (NBS) finansowanym przez Ministerstwo Zdrowia oraz regulacjami prawnymi dotyczącymi praw pacjenta:",
      options: [
        "Krew na bibułę pobiera się z pięty noworodka po 48. godzinie życia (zwykle w 3. dobie); rodzice mają prawo odmówić badania po pouczeniu o ryzyku ciężkiego, nieodwracalnego uszkodzenia mózgu dziecka, co wymaga pisemnego oświadczenia w dokumentacji medycznej.",
        "Badanie przesiewowe jest przymusowe, a w przypadku odmowy rodziców szpital ma prawny obowiązek zawiadomić policję w celu przymusowego pobrania krwi.",
        "Wynik testu przesiewowego z bibuły jest ostatecznym rozpoznaniem klinicznym uprawniającym do orzeczenia trwałej niepełnosprawności bez konieczności badań krwi żylnej.",
        "Koszt lewotyroksyny w terapii wrodzonej niedoczynności tarczycy u niemowląt nie podlega refundacji NFZ do ukończenia 1. roku życia.",
        "Pobranie krwi na bibułę wymaga każdorazowo pisemnej zgody notarialnej obojga rodziców."
      ],
      correct: 0,
      explanation: "Zgodnie z polskim prawem medycznym i organizacją programu badań przesiewowych, pobranie krwi na bibułę wykonuje się po 48. godzinie życia. Choć jest to standard postępowania medycznego, przedstawiciele ustawowi (rodzice) mogą złożyć pisemne oświadczenie o odmowie wykonania badania po uprzednim wyczerpującym pouczeniu przez lekarza o konsekwencjach zdrowotnych (nieodwracalne uszkodzenie OUN). Wynik z bibuły jest testem przesiewowym i bezwzględnie wymaga weryfikacji w surowicy krwi żylnej (TSH i fT4)."
    }
  },
  122: {
    pathoTargets: [
      "Diagnostyka: Biopsja aspiracyjna szpiku kostnego (BMA) z oceną cytologiczną (>20% blastów), badanie immunofenotypowe metodą cytometrii przepływowej (antygeny CD19, CD10, CD22, cCD79a), cytogenetyka i biologia molekularna (fuzja BCR-ABL1 t(9;22), KMT2A-AFF1 t(4;11), ETV6-RUNX1 t(12;21)). Terapia: Wstępna indukcja remisji wg protokołu ALL IC-BFM (prednizon 60 mg/m² p.o. przez 7 dni w fazie proremisyjnej + jedna dawka dokanałowej metotreksatu), następnie 4-lekowa indukcja (winkrystyna, daunorubicyna, L-asparaginaza, prednizon).",
      "Diagnostyka: Pełna morfologia krwi z rozmazem ręcznym, stężenie retikulocytów, koagulogram. Terapia: Transfuzja ubogoleukocytarnego, napromieniowanego koncentratu krwinek czerwonych (KKCz) przy Hb <7 g/dl (objawowa anemia), transfuzja KKP przy płytkach <10 000/µl (lub <20 000/µl przy gorączce i skazie), antybiotykoterapia empiryczna o szerokim spektrum (np. piperacylina z tazobaktamem lub meropenem) w razie gorączki neutropenicznej.",
      "Diagnostyka: USG jamy brzusznej (pomiar wymiarów śledziony i wątroby, powiększenie węzłów krezkowych), RTG kości długich (linie rozrzedzenia przynasadowego), nakłucie lędźwiowe z cytologią PMR (wykluczenie zajęcia OUN – status CNS-1/2/3). Terapia: Profilaktyka i leczenie zajęcia OUN dokanałowym podawaniem leków (metotreksat, cytarabina, deksametazon) w ściśle określonych dniach protokołu, leczenie przeciwbólowe (paracetamol 15 mg/kg m.c., unikanie NLPZ ze względu na trombocytopenię).",
      "Diagnostyka: Monitorowanie stężenia kwasu moczowego, potasu, fosforanów, wapnia, kreatyniny i LDH co 6–12 h, diureza godzinowa, EKG. Terapia: Intensywna hiperhydratacja płynowa bez potasu (3000 ml/m² m.c./dobę lub 1,5–2 x zapotrzebowanie dobowe), rasburykaza 0,2 mg/kg m.c. i.v. (rekombinowana oksydaza moczanowa przekształcająca kwas moczowy w alantoinę) lub allopurynol 10 mg/kg m.c./dobę, utrzymanie diurezy >100 ml/m²/h, unikanie alkalizacji moczu przy stosowaniu rasburykazy."
    ],
    q9: {
      question: "Wskaż zdanie FAŁSZYWE dotyczące ostrej białaczki limfoblastycznej (ALL) u dzieci:",
      options: [
        "Szczyt zachorowalności na ALL u dzieci przypada pomiędzy 2. a 5. rokiem życia.",
        "Obecność fuzji genowej ETV6-RUNX1 [t(12;21)] wiąże się ze skrajnie złym rokowaniem i wymaga natychmiastowej kwalifikacji do allogenicznego przeszczepienia szpiku (allo-HCT) w pierwszej remisji.",
        "Za pełną remisję hematologiczną (CR) w szpiku kostnym uważa się obecność poniżej 5% komórek blastycznych przy regeneracji prawidłowej hematopoezy.",
        "Zespół lizy guza (TLS) charakteryzuje się hiperurykemią, hiperkaliemią, hiperfosfatemią oraz wtórną hipokalcemią.",
        "Do rutynowych badań diagnostycznych wstępnych u każdego dziecka z nowo rozpoznaną ALL należy diagnostyczne nakłucie lędźwiowe z badaniem cytologicznym płynu mózgowo-rdzeniowego."
      ],
      correct: 1,
      explanation: "Zdanie B jest FAŁSZYWE. Obecność fuzji genowej ETV6-RUNX1 (powstałej w wyniku translokacji t(12;21)) jest jedną z NAJKORZYSTNIEJSZYCH rokowniczo aberracji genetycznych w dziecięcej ALL. Wiąże się z doskonałą odpowiedzią na standardową chemioterapię i długoterminowym odsetkiem wyleczeń przekraczającym 90-95%, bez wskazań do allo-HCT w pierwszej remisji."
    },
    q10: {
      question: "Do niekorzystnych czynników rokowniczych (wysokiego ryzyka) w ostrej białaczce limfoblastycznej u dzieci należą:\n1. Wiek w chwili rozpoznania poniżej 1. roku życia (niemowlęta) lub powyżej 10. roku życia\n2. Wyjściowa leukocytoza przekraczająca 50 000/µl (50 x 10⁹/l)\n3. Obecność chromosomu Philadelphia t(9;22) BCR-ABL1 lub rearanżacji genu MLL/KMT2A [t(4;11)]\n4. Słaba odpowiedź na wstępną 7-dniową prednizonoterapię (≥1000 blastów/µl we krwi obwodowej w 8. dobie)\n5. Dodatnia minimalna choroba resztkowa (MRD ≥10⁻³ w cytometrii przepływowej/PCR) po zakończeniu indukcji\nPrawidłowa odpowiedź to:",
      options: [
        "1, 2, 3",
        "2, 4, 5",
        "1, 3, 4, 5",
        "Wszystkie wymienione (1, 2, 3, 4, 5)",
        "1, 4, 5"
      ],
      correct: 3,
      explanation: "Wszystkie wymienione czynniki (1, 2, 3, 4, 5) stanowią klasyczne, uznane w międzynarodowych protokołach (np. BFM/AIEOP) niekorzystne czynniki rokownicze kwalifikujące pacjenta do grup pośredniego lub wysokiego ryzyka terapeutycznego."
    },
    q11: {
      question: "W przypadku podejrzenia choroby nowotworowej (np. ostrej białaczki) u 4-letniego dziecka, zgodnie z polskim prawem medycznym i organizacją opieki onkologicznej:",
      options: [
        "Lekarz POZ lub szpitalny ma obowiązek wystawić Kartę Diagnostyki i Leczenia Onkologicznego (Karta DiLO), która przyspiesza diagnostykę i leczenie w ośrodku onkohematologii dziecięcej, a na inwazyjne procedury diagnostyczne zgodę wyrażają przedstawiciele ustawowi (rodzice).",
        "Wykonanie biopsji szpiku i rozpoczęcie chemioterapii wymaga każdorazowo uzyskania uprzedniej zgody sądu opiekuńczego, niezależnie od stanowiska rodziców.",
        "Jeśli rodzice odmawiają ratującej życie chemioterapii z powodów światopoglądowych, lekarz nie może podjąć interwencji prawnej i musi wypisać dziecko.",
        "Karta DiLO może być wystawiona u dzieci wyłącznie po uzyskaniu ostatecznego wyniku badania histopatologicznego szpiku.",
        "Zgoda rodziców na procedury diagnostyczne i terapeutyczne u małoletniego do 16. roku życia może być wyrażona wyłącznie w formie aktu notarialnego."
      ],
      correct: 0,
      explanation: "Lekarz POZ lub specjalista przy podejrzeniu nowotworu złośliwego ma prawo i obowiązek wystawić Kartę DiLO, która zapewnia szybką ścieżkę onkologiczną. U dziecka poniżej 16. r.ż. zgodę na zabiegi diagnostyczne i lecznicze wyrażają przedstawiciele ustawowi (rodzice). W sytuacji, gdy rodzice odmawiają zgody na leczenie ratujące życie, lekarz ma obowiązek niezwłocznie wystąpić do właściwego sądu opiekuńczego o wydanie zgody zastępczej."
    }
  },
  123: {
    pathoTargets: [
      "Diagnostyka: Oznaczenie stężenia IgA w surowicy (podwyższone u ok. 50% chorych), wykluczenie innych przyczyn skazy (prawidłowa liczba płytek PLT, prawidłowy koagulogram PT/APTT/fibrynogen). Terapia: Leczenie objawowe, odpoczynek w łóżku w okresie ostrych wykwitów, nawodnienie doustne lub dożylne, unikanie leków mogących prowokować zapalenie naczyń.",
      "Diagnostyka: Badanie histopatologiczne bioptatu skóry (wykonywane w wątpliwych przypadkach) – leukocytoklastyczne zapalenie naczyń z dominującymi złogami IgA w badaniu immunofluorescencyjnym (DIF). Terapia: Niesteroidowe leki przeciwzapalne (np. ibuprofen 10 mg/kg m.c. co 8 h) w łagodzeniu bólów stawowych (pod warunkiem braku krwawienia z przewodu pokarmowego i bez cech ostrego uszkodzenia nerek).",
      "Diagnostyka: Badanie fizykalne – ocena symetrycznej, uniesionej plamicy (palpable purpura) na kończynach dolnych i pośladkach; USG brzucha w celu wykluczenia wgłobienia jelita (intussusceptio) w razie silnych bólów brzucha. Terapia: W przypadku silnego bólu brzucha lub krwawienia z przewodu pokarmowego: prednizon lub metyloprednizolon w dawce 1–2 mg/kg m.c./dobę p.o./i.v. przez 1–2 tygodnie ze stopniową redukcją (GKS skracają czas trwania bólu brzucha, ale nie zapobiegają nefropatii).",
      "Diagnostyka: Systematyczne monitorowanie moczu (badanie ogólne moczu z oceną osadu pod kątem białkomoczu i krwinkomoczu) oraz pomiar ciśnienia tętniczego co 1–2 tygodnie przez pierwsze 2 miesiące, a następnie co miesiąc do 6 miesięcy; wskaźnik białko/kreatynina w moczu (UPCR). Terapia: Inhibitory ACE (np. enalapryl 0,1–0,3 mg/kg m.c./dobę) w przypadku przetrwałego białkomoczu (>0,5–1 g/dobę); w ciężkim zespole nerczycowym lub gwałtownie postępującym KZN – pulsy metyloprednizolonu i.v. i cyklofosfamid."
    ],
    q9: {
      question: "Wskaż zdanie FAŁSZYWE dotyczące zapalenia naczyń związanego z przeciwciałami IgA (choroby Henocha-Schönleina, IgAV):",
      options: [
        "Kryterium bezwzględnym rozpoznania wg klasyfikacji EULAR/PRINTO/PRES jest wyczuwalna plamica (palpable purpura) lub wybroczyny o typowej lokalizacji kończynowej, bez małopłytkowości.",
        "Rutynowe wczesne podawanie doustnych glikokortykosteroidów (np. prednizonu) u każdego pacjenta z IgAV skutecznie zapobiega wystąpieniu i progresji nefropatii nerkowej.",
        "Najczęstszym powikłaniem chirurgicznym w obrębie przewodu pokarmowego u dzieci z IgAV jest wgłobienie jelita cienko-cienkiego (ileo-ileal).",
        "W diagnostyce laboratoryjnej kluczowe jest potwierdzenie prawidłowej lub podwyższonej liczby płytek krwi (PLT) w celu wykluczenia małopłytkowości immunologicznej (ITP).",
        "U większości dzieci choroba ma przebieg samoograniczający się i ustępuje samoistnie w ciągu 4-6 tygodni bez trwałych następstw."
      ],
      correct: 1,
      explanation: "Zdanie B jest FAŁSZYWE. Randomizowane badania kliniczne wykazały, że wczesne profilaktyczne podawanie GKS NIE zapobiega wystąpieniu ani progresji nefropatii w przebiegu IgAV. Glikokortykosteroidy (np. prednizon 1-2 mg/kg m.c./d) są wskazane wyłącznie objawowo w celu uśmierzenia ciężkich bólów brzucha, krwawienia z przewodu pokarmowego lub ciężkiego zapalenia nerek (zespół nerczycowy/nefrytyczny)."
    },
    q10: {
      question: "Do kryteriów klasyfikacyjnych EULAR/PRINTO/PRES zapalenia naczyń związanego z IgA (poza warunkiem koniecznym plamicy bez małopłytkowości) należą:\n1. Rozlany ból brzucha o charakterze kolkowym lub wgłobienie jelita\n2. Ostre bóle lub zapalenie stawów (artralgia / arthritis)\n3. Zajęcie nerek: krwiomocz (>5 erytrocytów wpw) lub białkomocz (>0,3 g/dobę)\n4. Biopsja skóry lub nerki wykazująca leukocytoklastyczne zapalenie naczyń lub rozplemowe KZN z dominującymi złogami IgA\n5. Przetrwała gorączka trwająca >5 dni z obustronnym bezwysiękowym zapaleniem spojówek\nPrawidłowa odpowiedź to:",
      options: [
        "1, 2, 3, 4",
        "1, 2, 5",
        "2, 3, 4, 5",
        "1, 3, 5",
        "Wszystkie wymienione"
      ],
      correct: 0,
      explanation: "Prawidłowa odpowiedź to 1, 2, 3, 4. Zgodnie z kryteriami EULAR/PRINTO/PRES rozpoznanie IgAV wymaga obecności nieplamopłytkowej wyczuwalnej plamicy oraz co najmniej jednego z czterech kryteriów: ból brzucha, zapalenie/ból stawów, zajęcie nerek lub typowy obraz w biopsji ze złogami IgA. Cecha 5 (gorączka >5 dni i zapalenie spojówek) to kryterium choroby Kawasakiego."
    },
    q11: {
      question: "U 7-letniego chłopca wypisywanego ze szpitala po ostrym rzucie plamicy Henocha-Schönleina bez powikłań narządowych, lekarz planujący dalszą opiekę w POZ zgodnie z zasadami sztuki lekarskiej i orzecznictwa powinien:",
      options: [
        "Zlecić systematyczną kontrolę badania ogólnego moczu oraz pomiar ciśnienia tętniczego co 1-2 tygodnie przez pierwsze 2 miesiące, a następnie co miesiąc przez minimum 6 miesięcy, oraz zalecić czasowe zwolnienie z zajęć WF na okres ostrych objawów.",
        "Wystawić bezterminowe trwałe zwolnienie ze wszystkich szczepień ochronnych w kalendarzu szczepień.",
        "Natychmiast złożyć wniosek do zespołu ds. orzekania o stopniu niepełnosprawności ze względu na trwały uszczerbek na zdrowiu.",
        "Zakazać powrotu do szkoły przez okres minimum 12 miesięcy ze względu na wysokie ryzyko zarażenia innych uczniów.",
        "Zgłosić przypadek do powiatowej stacji sanitarno-epidemiologicznej (Sanepid) jako chorobę zakaźną podlegającą obowiązkowej kwarantannie."
      ],
      correct: 0,
      explanation: "Nefropatia w przebiegu IgAV może ujawnić się z opóźnieniem (nawet do kilku miesięcy po ustąpieniu zmian skórnych). Dlatego kluczowym obowiązkiem lekarza POZ jest regularne monitorowanie badania ogólnego moczu i ciśnienia tętniczego przez minimum 6 miesięcy. IgAV nie jest chorobą zakaźną i nie wymaga kwarantanny ani trwałego zwalniania ze szczepień."
    }
  },
  124: {
    pathoTargets: [
      "Diagnostyka: Rezonans magnetyczny (MRI) mózgowia z kontrastem (guz robaka móżdżku / dachu komory IV ze wzmocnieniem kontrastowym i ograniczeniem dyfuzji w DWI), badanie histopatologiczne i molekularne po resekcji (podtypy: WNT, SHH, Grupa 3, Grupa 4). Terapia: Całkowita lub prawie całkowita resekcja neurochirurgiczna guza, radioterapia osi mózgowo-rdzeniowej (CSI u dzieci >3-5 r.ż.) oraz chemioterapia wielolekowa (cisplatyna, lomustyna, winkrystyna, cyklofosfamid).",
      "Diagnostyka: MRI/TK głowy – poszerzenie komór bocznych i komory III przy wąskiej lub uciśniętej komorze IV, objaw 'trąbki'. Terapia: W stanie nagłym: drenaż zewnętrzny komór (EVD) lub endoskopowa wentrikulostomia komory trzeciej (ETV) w celu obniżenia ciśnienia wewnątrzczaszkowego przed lub w trakcie operacji usunięcia guza.",
      "Diagnostyka: Monitorowanie ICP, monitorowanie parametrów życiowych (triada Cushinga: nadciśnienie tętnicze, bradykardia, zaburzenia toru oddechowego), ocena dna oka (obrzęk tarcz nerwów wzrokowych). Terapia: Deksametazon i.v. w dawce wstępnej 0,5–1 mg/kg m.c. (maks. 10–16 mg/dobę w 4 dawkach podzielonych) w celu redukcji obrzęku okołoguzowego; w razie objawów bezpośredniego wgłobienia: 20% mannitol 0,5–1 g/kg m.c. we wlewie i.v. w 20 minut lub 3% NaCl 3–5 ml/kg m.c., uniesienie wezgłowia łóżka o 30 stopni.",
      "Diagnostyka: MRI całego kanału kręgowego z kontrastem (przed operacją lub 2-3 tyg. po) oraz badanie cytologiczne płynu mózgowo-rdzeniowego pobranego z nakłucia lędźwiowego (minimum 14 dni po operacji w celu uniknięcia fałszywie dodatnich komórek pooperacyjnych). Terapia: Radioterapia na cały ośrodkowy układ nerwowy (craniospinal irradiation – CSI) z boostem na lożę guza i ogniska przerzutowe, połączona z intensywną chemioterapią uzupełniającą."
    ],
    q9: {
      question: "Wskaż zdanie FAŁSZYWE dotyczące rdzeniaka zarodkowego (Medulloblastoma) u dzieci:",
      options: [
        "Jest to najczęstszy złośliwy nowotwór ośrodkowego układu nerwowego wieku dziecięcego (WHO G4).",
        "Wykonanie punkcji lędźwiowej przed wykonaniem badań neuroobrazowych jest bezwzględnie przeciwwskazane u dziecka z cechami ciasnoty wewnątrzczaszkowej ze względu na ryzyko wgłobienia migdałków móżdżku do otworu wielkiego.",
        "Podtyp molekularny WNT-aktywowany charakteryzuje się najgorszym rokowaniem i wymaga najbardziej agresywnej radiochemioterapii z koniecznością unikania resekcji.",
        "Guz najczęściej rozwija się w robaku móżdżku i wpukla do światła komory czwartej, prowadząc do wodogłowia obturacyjnego.",
        "Do typowych wczesnych objawów należą poranne bóle głowy połączone z nudnościami i chlustającymi wymiotami przynoszącymi chwilową ulgę."
      ],
      correct: 2,
      explanation: "Zdanie C jest FAŁSZYWE. Podtyp molekularny WNT-aktywowany rdzeniaka (stanowiący ok. 10% przypadków) charakteryzuje się NAJLEPSZYM rokowaniem spośród wszystkich podtypów medulloblastoma – odsetek 5-letnich przeżyć wolnych od progresji wynosi >90-95%, co umożliwia obecnie próby deeskalacji terapii w badaniach klinicznych."
    },
    q10: {
      question: "Do objawów zespołu ciasnoty wewnątrzczaszkowej i guza móżdżku u dzieci należą:\n1. Triada Cushinga (nadciśnienie tętnicze, bradykardia, zaburzenia rytmu oddechowego)\n2. Obrzęk tarczy nerwu wzrokowego (tarcza zastoinowa, papilledema) na dnie oka\n3. Ataksja tułowia i kończyn, chód na szerokiej podstawie oraz dysmetria\n4. Porażenie nerwu odwodzącego (n. VI) jako objaw rzekomolokalizacyjny wysokiego ciśnienia ICP\n5. Wzmożone łaknienie i nadmierny przyrost masy ciała bez wymiotów\nPrawidłowa odpowiedź to:",
      options: [
        "1, 2, 3, 4",
        "1, 3, 5",
        "2, 4, 5",
        "1, 2, 5",
        "Wszystkie wymienione"
      ],
      correct: 0,
      explanation: "Prawidłowa odpowiedź to 1, 2, 3, 4. Do klasycznych objawów ciasnoty i guza tylnego dołu czaszki należą: objawy wzmożonego ICP (triada Cushinga, tarcza zastoinowa, poranne wymioty), zespół móżdżkowy (ataksja, dysmetria) oraz porażenie n. VI (nerw odwodzący jest najdłuższym nerwem czaszkowym biegnącym wewnątrzczaszkowo i najszybciej ulega rozciągnięciu/uciskowi przy uogólnionym wzroście ICP)."
    },
    q11: {
      question: "5-letnie dziecko z guzem tylnego dołu czaszki i ostrym wodogłowiem obturacyjnym trafia na SOR w stanie śpiączki z cechami wklinowania mózgu. Rodzice są nieosiągalni. W świetle polskiego prawa medycznego (art. 34 ust. 7 Ustawy o zawodach lekarza i lekarza dentysty):",
      options: [
        "Lekarz ma prawo i obowiązek wykonać natychmiast ratujący życie zabieg operacyjny (np. założenie zewnętrznego drenażu komorowego) bez zgody przedstawiciela ustawowego, zasięgając w miarę możliwości opinii drugiego lekarza i odnotowując to w dokumentacji oraz niezwłocznie powiadamiając sąd opiekuńczy.",
        "Lekarz musi bezwzględnie wstrzymać się z jakimkolwiek zabiegiem inwazyjnym do czasu uzyskania pisemnej zgody sądu opiekuńczego, ograniczając się do leczenia zachowawczego.",
        "Do wykonania operacji w stanie nagłym u dziecka wystarczy zgoda pełnoletniego sąsiada lub dalszego krewnego, który przyprowadził dziecko do szpitala.",
        "W przypadku braku rodziców zgodę na operację może wydać telefonicznie dyżurny pracownik socjalny ośrodka pomocy społecznej.",
        "Lekarz operujący bez pisemnej zgody sądu w stanie bezpośredniego zagrożenia życia popełnia przestępstwo ścigane z urzędu."
      ],
      correct: 0,
      explanation: "Zgodnie z art. 34 ust. 7 Ustawy o zawodach lekarza i lekarza dentysty, lekarz może wykonać zabieg operacyjny albo zastosować metodę leczenia o podwyższonym ryzyku bez zgody przedstawiciela ustawowego pacjenta małoletniego, jeżeli zwłoka spowodowana postępowaniem w sprawie uzyskania zgody groziłaby pacjentowi niebezpieczeństwem utraty życia lub ciężkiego uszkodzenia ciała. Wymaga to w miarę możliwości konsultacji drugiego lekarza, adnotacji w dokumentacji i niezwłocznego zawiadomienia sądu opiekuńczego."
    }
  },
  125: {
    pathoTargets: [
      "Diagnostyka: Badania laboratoryjne ostrej fazy (CRP >30 mg/l, OB >40 mm/h, leukocytoza z neutrofilią, hipoalbuminemia, podwyższenie transaminaz AST/ALT, jałowy ropomocz). Terapia: Dożylne immunoglobuliny (IVIG) w pojedynczym wlewie w dawce 2 g/kg m.c. podawane w ciągu 10–12 godzin w połączeniu z kwasem acetylosalicylowym (ASA) 30–50 mg/kg m.c./dobę w 4 dawkach podzielonych w fazie ostrej (do ustąpienia gorączki).",
      "Diagnostyka: Pilne badanie echokardiograficzne (ECHO serca) w momencie podejrzenia choroby: ocena wymiarów tętnic wieńcowych (LAD, RCA, LMCA) z przeliczeniem na Z-score, ocena kurczliwości miokardium, wysięku w osierdziu i niedomykalności zastawek. Terapia: Wczesne podanie IVIG (przed 10. dobą gorączki) redukuje ryzyko rozwoju tętniaków wieńcowych z 25% do poniżej 3–5%; w przypadku oporności na IVIG (utrzymywanie się gorączki po 36 h): drugi wlew IVIG 2 g/kg m.c. lub metyloprednizolon w pulsach 30 mg/kg m.c. i.v. przez 3 dni bądź infliksymab (5 mg/kg m.c.).",
      "Diagnostyka: Seryjne badania echokardiograficzne (po 2 i 6–8 tygodniach od zachorowania): klasyfikacja tętniaków wg AHA (małe: Z-score 2,5 do <5; średnie: Z-score 5 do <10; olbrzymie: Z-score ≥10 lub średnica bezwzględna ≥8 mm). Terapia: Przejście na małe dawki ASA (3–5 mg/kg m.c./dobę rano p.o.) o działaniu przeciwpłytkowym po 48–72 godzinach od ustąpienia gorączki i kontynuacja przez minimum 6–8 tygodni (a przy obecności przetrwałych tętniaków – bezterminowo).",
      "Diagnostyka: Morfologia krwi (obserwacja narastającej trombocytozy w 2.–3. tygodniu choroby, często PLT 600–1000 tys./µl), koagulogram, D-dimery, angio-TK lub koronarografia w przypadku tętniaków olbrzymich. Terapia: W tętniakach olbrzymich (Z-score ≥10 lub ≥8 mm): terapia dwulekowa – ASA w małej dawce (3–5 mg/kg m.c./d) w skojarzeniu z lekiem przeciwkrzepliwym (heparyna drobnocząsteczkowa enoksaparyna 1 mg/kg m.c. s.c. co 12 h z docelowym anty-Xa 0,5–1,0 j./ml lub warfaryna z docelowym INR 2,0–3,0)."
    ],
    q9: {
      question: "Wskaż zdanie FAŁSZYWE dotyczące choroby Kawasakiego u dzieci:",
      options: [
        "Jest to ostre, samoograniczające się zapalenie naczyń krwionośnych, ze szczególnym powinowactwem do tętnic wieńcowych.",
        "Kluczowym elementem leczenia fazy ostrej jest podanie dożylnych immunoglobulin (IVIG 2 g/kg m.c.) w ciągu pierwszych 10 dni od początku gorączki.",
        "W chorobie Kawasakiego bezwzględnie przeciwwskazane jest stosowanie kwasu acetylosalicylowego (ASA) ze względu na 100% ryzyko wywołania zespołu Reye'a.",
        "Wykrycie tętniaków olbrzymich tętnic wieńcowych (średnica ≥8 mm lub Z-score ≥10) wiąże się z bardzo wysokim ryzykiem zawału serca i nagłego zgonu sercowego.",
        "Do typowych objawów klinicznych należą m.in. 'truskawkowy język', obustronne bezwysiękowe zapalenie spojówek oraz rumień i obrzęk rąk i stóp."
      ],
      correct: 2,
      explanation: "Zdanie C jest FAŁSZYWE. Choroba Kawasakiego jest jednym z nielicznych, ściśle zdefiniowanych wskazań do stosowania ASA u dzieci. W fazie ostrej stosuje się ASA w dawce przeciwzapalnej (30-50 mg/kg m.c./d w Europie lub 80-100 mg/kg m.c./d w USA) w skojarzeniu z IVIG, a po ustąpieniu gorączki przechodzi się na dawkę przeciwpłytkową (3-5 mg/kg m.c./d) przez 6-8 tygodni."
    },
    q10: {
      question: "Do kryteriów klinicznych rozpoznania klasycznej postaci choroby Kawasakiego (gorączka trwająca ≥5 dni oraz co najmniej 4 z 5 cech) należą:\n1. Obustronne, bezwysiękowe przekrwienie spojówek gałkowych (oszczędzające rąbek rogówki)\n2. Zmiany na wargach i w jamie ustnej (suche, spękane wargi, 'język truskawkowy', rumień gardła)\n3. Zmiany w dystalnych częściach kończyn (rumień dłoni i podeszw, twardy obrzęk rąk i stóp, łuszczenie okołopaznokciowe w fazie podostrej)\n4. Polimorficzna osutka skórna (z wyjątkiem pęcherzykowej i pęcherzowej)\n5. Ostre nieropne powiększenie szyjnego węzła chłonnego (zazwyczaj jednostronne, o średnicy >1,5 cm)\nPrawidłowa odpowiedź to:",
      options: [
        "1, 2, 4",
        "2, 3, 5",
        "1, 3, 4, 5",
        "Wszystkie wymienione (1, 2, 3, 4, 5)",
        "1, 2, 3, 5"
      ],
      correct: 3,
      explanation: "Wszystkie wymienione objawy (1, 2, 3, 4, 5) tworzą 5 klasycznych kryteriów diagnostycznych choroby Kawasakiego. Do rozpoznania postaci klasycznej wymagana jest gorączka trwająca ≥5 dni oraz spełnienie co najmniej 4 z tych 5 kryteriów (lub mniej przy obecności tętniaków wieńcowych w ECHO)."
    },
    q11: {
      question: "U 2-letniego dziecka leczonego z powodu choroby Kawasakiego pojedynczym wlewem IVIG w dawce 2 g/kg m.c., zgodnie z polskim Programem Szczepień Ochronnych (PSO) oraz wytycznymi ekspertów:",
      options: [
        "Szczepienia żywymi atenuowanymi szczepionkami (przeciwko odrze, śwince, różyczce – MMR oraz ospie wietrznej) należy odroczyć o 11 miesięcy od podania IVIG z powodu pasywnej obecności przeciwciał neutralizujących w preparacie immunoglobulin.",
        "Wszystkie szczepienia (zarówno żywe, jak i inaktywowane) muszą zostać trwale wstrzymane do osiągnięcia pełnoletności.",
        "Dziecko powinno otrzymać szczepionkę MMR niezwłocznie w 7. dobie po podaniu IVIG w celu stymulacji odporności przeciwwirusowej.",
        "Szczepienie przeciwko grypie sezonowej szczepionką inaktywowaną jest bezwzględnie przeciwwskazane u dzieci przyjmujących kwas acetylosalicylowy.",
        "Zastosowanie IVIG zwalnia lekarza POZ z obowiązku prowadzenia karty uodpornienia dziecka."
      ],
      correct: 0,
      explanation: "Podanie dożylnych immunoglobulin (IVIG) w wysokiej dawce (2 g/kg m.c.) dostarcza olbrzymiej ilości przeciwciał neutralizujących, które mogą zahamować replikację wirusów szczepionkowych i uniemożliwić wytworzenie odporności poszczepiennej. Z tego względu szczepienia żywymi szczepionkami (MMR, ospa wietrzna) należy odroczyć o 11 miesięcy. Szczepienia inaktywowane (w tym coroczne przeciwko grypie, szczególnie zalecane u dzieci na przewlekłej terapii ASA w celu redukcji ryzyka zespołu Reye'a) można wykonywać zgodnie z kalendarzem."
    }
  },
  126: {
    pathoTargets: [
      "Diagnostyka: Wywiad i badanie przedmiotowe (objawy miejscowego podrażnienia otrzewnej w punkcie McBurneya, objaw Jaworskiego, Rowsinga, Blumberga, skala Alvarado), leukocytoza z neutrofilią, CRP. Terapia: Przygotowanie przedoperacyjne: wstrzymanie żywienia doustnego (ścisła dieta zerowa), kaniulacja żyły i nawodnienie dożylne krystaloidami (PWE lub 0,9% NaCl 20–30 ml/kg m.c.), wyrównanie elektrolitowe.",
      "Diagnostyka: USG jamy brzusznej (niepodatny na ucisk wyrostek o średnicy >6 mm z pogrubiałą ścianą >2–3 mm, obecność kamienia kałowego/koprolitu, płyn w otoczeniu), w wątpliwych przypadkach TK jamy brzusznej i miednicy z kontrastem. Terapia: Okołooperacyjna profilaktyka antybiotykowa podana i.v. na 30–60 min przed cięciem: cefazolina 2,0 g i.v. + metronidazol 500 mg i.v. (lub ampicylina z sulbaktamem 1,5–3,0 g i.v.).",
      "Diagnostyka: Ocena śródoperacyjna (laparoskopowa) powłok i jamy otrzewnej, badanie histopatologiczne usuniętego wyrostka (złoty standard oceniający naciek neutrofilowy w błonie mięśniowej właściwej). Terapia: Pilna apendektomia laparoskopowa (lub otwarta z dostępu McBurneya), koagulacja lub podwiązanie krezki wyrostka (a. appendicularis), podwiązanie podstawy pętlami Roedera/Endoloop i usunięcie narządu w worku endobag.",
      "Diagnostyka: Posiew bakteriologiczny wysięku z jamy otrzewnej (bakterie beztlenowe i pałeczki Gram-ujemne), monitorowanie leukocytozy, prokalcytoniny i parametrów nerkowych. Terapia: Dokładne odessanie i płukanie jamy otrzewnej ciepłym 0,9% NaCl, ewentualny drenaż loży po wyrostku i miednicy mniejszej, przedłużenie celowanej antybiotykoterapii dożylnej (np. ceftriakson 2,0 g 1 x dz. + metronidazol 500 mg 3 x dz.) przez 3–5 dni po operacji."
    ],
    q9: {
      question: "Wskaż zdanie FAŁSZYWE dotyczące ostrego zapalenia wyrostka robaczkowego u dorosłych:",
      options: [
        "Typowy ból brzucha ma charakter dwuetapowy: rozpoczyna się jako ból trzewny w nadbrzuszu lub wokół pępka, a po kilku/kilkunastu godzinach przenosi się do prawego dołu biodrowego jako ból somatyczny.",
        "Dodatni objaw Rovsinga polega na wywołaniu bólu w prawym dole biodrowym podczas ucisku lewego dołu biodrowego, na skutek przemieszczania się gazów w okrężnicy w stronę kątnicy.",
        "Prawidłowa liczba krwinek białych (WBC) oraz prawidłowe stężenie CRP w surowicy w 100% wykluczają zapalenie wyrostka robaczkowego i zwalniają z dalszej obserwacji chirurgicznej.",
        "Laparoskopowa apendektomia wiąże się ze statystycznie mniejszym nasileniem bólu pooperacyjnego, szybszym powrotem perystaltyki jelit i krótszym czasem hospitalizacji w porównaniu z techniką otwartą.",
        "Kamienie kałowe (koprolity) oraz przerost grudek chłonnych są najczęstszymi przyczynami obturacji światła wyrostka inicjującymi kaskadę zapalną."
      ],
      correct: 2,
      explanation: "Zdanie C jest FAŁSZYWE. We wczesnym stadium ostrego zapalenia wyrostka robaczkowego (<12 godzin od początku objawów) zarówno leukocytoza, jak i stężenie CRP mogą pozostawać całkowicie w granicach normy. Prawidłowe parametry zapalne nie wykluczają zapalenia wyrostka robaczkowego, a decydujący jest obraz kliniczny i badania obrazowe (USG/TK)."
    },
    q10: {
      question: "Do objawów otrzewnowych i charakterystycznych objawów fizykalnych w diagnostyce ostrego zapalenia wyrostka robaczkowego należą:\n1. Objaw Blumberga (nagłe zwolnienie ucisku powłok brzusznych wywołujące ostry ból)\n2. Objaw Jaworskiego (ból w prawym dole biodrowym podczas opuszczania uniesionej prawej kończyny dolnej w stawie biodrowym przeciw oporowi)\n3. Objaw Rowsinga (ból w prawym dole biodrowym przy ucisku lewego dołu biodrowego)\n4. Objaw zasłonowy (obturator sign – ból przy rotacji wewnętrznej zgiętego prawego uda)\n5. Objaw Courvoisiera (powiększony, bezbolesny, wyczuwalny przez powłoki pęcherzyk żółciowy)\nPrawidłowa odpowiedź to:",
      options: [
        "1, 2, 3, 4",
        "1, 3, 5",
        "2, 3, 5",
        "1, 4, 5",
        "Wszystkie wymienione"
      ],
      correct: 0,
      explanation: "Prawidłowa odpowiedź to 1, 2, 3, 4. Wszystkie te objawy (Blumberga, Jaworskiego, Rovsinga, z mięśnia zasłonowego i lędźwiowo-udowego) są klasycznymi objawami zapalenia wyrostka i podrażnienia otrzewnej. Objaw Courvoisiera (cecha 5) wskazuje na bezbolesną żółtaczkę mechaniczną w przebiegu raka głowy trzustki lub brodawki Vatera."
    },
    q11: {
      question: "28-letni przytomny pacjent zgłasza się z ostrym ropowiczym zapaleniem wyrostka robaczkowego zakwalifikowany do pilnej apendektomii laparoskopowej. Zgodnie z art. 34 Ustawy o zawodach lekarza i lekarza dentysty:",
      options: [
        "Zgoda pacjenta na zabieg operacyjny o podwyższonym ryzyku musi być wyrażona w formie pisemnej po uprzednim przystępnym poinformowaniu o celu zabiegu, dających się przewidzieć powikłaniach (w tym możliwości konwersji do laparotomii) i rokowaniu.",
        "Na zabieg w trybie ostrym wystarczy wyłącznie ustna zgoda pacjenta bez konieczności jakiejkolwiek adnotacji w dokumentacji medycznej.",
        "Lekarz nie ma obowiązku informować pacjenta o powikłaniach, aby nie wywoływać u niego niepotrzebnego lęku przed znieczuleniem ogólnym.",
        "Jeśli pacjent jest ubezpieczony w NFZ, podpisanie formularza zgody jest zbędne, gdyż ubezpieczenie stanowi dorozumianą zgodę na wszelkie operacje.",
        "Zgodę na operację u dorosłego i przytomnego pacjenta może skutecznie podpisać jego małżonek bez konieczności uzyskiwania podpisu pacjenta."
      ],
      correct: 0,
      explanation: "Zgodnie z art. 34 ust. 1 UoZL, wykonanie zabiegu operacyjnego albo zastosowanie metody leczenia lub diagnostyki stwarzającej podwyższone ryzyko dla pacjenta wymaga uzyskania jego pisemnej zgody. Zgoda musi być uświadomiona – poprzedzona informacją o stanie zdrowia, celu zabiegu, przewidywanych następstwach i ryzyku (w tym możliwości konwersji do zabiegu otwartego)."
    }
  },
  127: {
    pathoTargets: [
      "Diagnostyka: USG jamy brzusznej (złoty standard: obecność złogu w szyjce pęcherzyka/przewodzie pęcherzykowym, pogrubienie ściany pęcherzyka >4 mm, obrzęk dwukonturowy ściany, płyn okołopęcherzykowy, dodatni sonograficzny objaw Murphy'ego). Terapia: Ścisła dieta bezresztkowa/zerowa, odbarczenie żołądka sondą żołądkową w razie uporczywych wymiotów, płynoterapia dożylna krystaloidami (2000–2500 ml/dobę), analgezja (NLPZ np. ketoprofen 100 mg i.v. lub metamizol 1,0–2,5 g i.v., w razie silnego bólu petydyna/buprenorfina).",
      "Diagnostyka: Badania laboratoryjne (leukocytoza z przesunięciem w lewo, CRP >30–50 mg/l, prokalcytonina, parametry wątrobowe: AlAT, AspAT, GGTP, fosfataza zasadowa AP). Terapia: Wczesne wdrożenie empirycznej antybiotykoterapii dożylnej wg Tokyo Guidelines TG18 (np. cefazolina 1–2 g co 8 h lub ceftriakson 1–2 g 1 x dz. + metronidazol 500 mg co 8 h; u pacjentów z ciężkim przebiegiem/wstrząsem: piperacylina z tazobaktamem 4,5 g co 6 h).",
      "Diagnostyka: Posiew żółci pobranej śródoperacyjnie (flora mieszana: E. coli, Klebsiella pneumoniae, Enterococcus faecalis, Bacteroides fragilis), posiewy krwi w razie gorączki >38,5 °C z dreszczami. Terapia: Wczesna cholecystektomia laparoskopowa (optymalnie w ciągu pierwszych 72 godzin od początku objawów, dopuszczalna do 7–10 dni); identyfikacja trójkąta Calota i krytycznego widoku bezpieczeństwa (Critical View of Safety – CVS wg Strasberga) w celu ochrony dróg żółciowych.",
      "Diagnostyka: TK jamy brzusznej z kontrastem (ocena powikłań: perforacja pęcherzyka, ropień okołopęcherzykowy, pęcherz ropny / empyema vesicae felleae, przetoka pęcherzykowo-dwunastnicza). Terapia: W przypadku pacjentów wysokiego ryzyka operacyjnego z ciężkimi chorobami współistniejącymi (ASA III-IV, wstrząs septyczny): przezskórna przezwątrobowa cholecystostomia pod kontrolą USG (PTGBD) jako drenaż odbarczający, z odroczeniem zabiegu definitywnego."
    ],
    q9: {
      question: "Wskaż zdanie FAŁSZYWE dotyczące ostrego zapalenia pęcherzyka żółciowego (ACC) wg wytycznych Tokyo Guidelines (TG18):",
      options: [
        "Złotym standardem w diagnostyce obrazowej pierwszego rzutu jest ultrasonografia (USG) jamy brzusznej.",
        "Zgodnie z TG18 preferowanym postępowaniem z wyboru w stopniu I i II jest wczesna cholecystektomia laparoskopowa, optymalnie przeprowadzona w ciągu pierwszych 72 godzin od wystąpienia objawów.",
        "Stwierdzenie głębokiej żółtaczki ze stężeniem bilirubiny całkowitej >5 mg/dl jest typową cechą izolowanego zapalenia pęcherzyka żółciowego i nie wymaga wykluczania kamicy przewodowej.",
        "Uzyskanie 'krytycznego widoku bezpieczeństwa' (Critical View of Safety – CVS wg Strasberga) podczas preparowania tkanek jest kluczowym warunkiem zapobiegającym jatrogennemu uszkodzeniu dróg żółciowych.",
        "U pacjentów w stanie krytycznym niekwalifikujących się do natychmiastowej operacji procedurą ratunkową z wyboru jest przezskórny drenaż pęcherzyka żółciowego (cholecystostomia przezwątrobowa)."
      ],
      correct: 2,
      explanation: "Zdanie C jest FAŁSZYWE. Izolowane, niepowikłane zapalenie pęcherzyka żółciowego zazwyczaj nie powoduje głębokiej żółtaczki (stężenie bilirubiny jest prawidłowe lub nieznacznie podwyższone <2 mg/dl). Obecność stężenia bilirubiny >4-5 mg/dl silnie wskazuje na współistniejącą kamicę przewodu żółciowego wspólnego (choledocholithiasis) lub zespół Mirizziego i bezwzględnie wymaga pilnego poszerzenia diagnostyki o MRCP/ECPW."
    },
    q10: {
      question: "Do kryteriów diagnostycznych ostrego zapalenia pęcherzyka żółciowego wg wytycznych Tokyo Guidelines (TG18) należą:\n1. Miejscowe objawy zapalenia: objaw Murphy'ego lub ból/tkliwość w prawym podżebrzu\n2. Ogólnoustrojowe objawy zapalenia: gorączka >37,5 °C, leukocytoza (>10 000/µl) lub podwyższone stężenie CRP (≥30 mg/l)\n3. Cechy obrazowe w USG: pogrubienie ściany pęcherzyka (≥4 mm), powiększenie pęcherzyka, uwięźnięty złóg lub płyn okołopęcherzykowy\n4. Wyłącznie obecność bezobjawowych złogów w świetle pęcherzyka bez cech pogrubienia ściany\n5. Zawsze stwierdzana hiperamylazemia przekraczająca 10-krotnie górną granicę normy\nPrawidłowa odpowiedź to:",
      options: [
        "1, 2, 3",
        "1, 4, 5",
        "2, 3, 5",
        "1, 3, 4",
        "Wszystkie wymienione"
      ],
      correct: 0,
      explanation: "Zgodnie z Tokyo Guidelines (TG18), pewne rozpoznanie ostrego zapalenia pęcherzyka wymaga potwierdzenia: 1 cechy z grupy A (miejscowe objawy zapalne: objaw Murphy'ego, ból w prawym podżebrzu), 1 cechy z grupy B (ogólnoustrojowe cechy zapalenia: gorączka, CRP, leukocytoza) oraz cech z grupy C (charakterystyczny obraz w badaniach obrazowych USG/TK/MR). Sama bezobjawowa kamica (cecha 4) to kamica niepowikłana."
    },
    q11: {
      question: "Podczas cholecystektomii u 65-letniej pacjentki z powodu ostrego zapalenia pęcherzyka, po otwarciu pęcherzyka chirurg stwierdza twarde zgrubienie ściany dna pęcherzyka naciekające łożysko wątroby. Badanie doraźne potwierdza raka pęcherzyka żółciowego (pT2). Zgodnie z polskimi przepisami prawnymi i organizacją leczenia onkologicznego:",
      options: [
        "Szpital ma obowiązek wystawić pacjentce Kartę Diagnostyki i Leczenia Onkologicznego (DiLO) w celu skierowania do wielodyscyplinarnego konsylium onkologicznego (KDO) i zaplanowania reoperacji (resekcji klinowej łożyska wątroby z limfadenektomią).",
        "Informacja o nowotworze złośliwym może być przekazana wyłącznie rodzinie pacjentki, z bezwzględnym zatajeniem rozpoznania przed samą pacjentką.",
        "Każdy przypadek raka pęcherzyka żółciowego wymaga natychmiastowego zgłoszenia do Sanepidu i kwarantanny oddziału.",
        "Wystawienie karty DiLO jest możliwe dopiero po zakończeniu chemioterapii paliatywnej w POZ.",
        "Zgoda pacjentki na zabieg cholecystektomii uprawniała chirurga do bezwzględnego wycięcia całej wątroby bez uprzedniej zgody i bez biopsji."
      ],
      correct: 0,
      explanation: "Przypadkowe wykrycie raka pęcherzyka żółciowego w stopniu pT2 wymaga zaplanowania reoperacji (resekcji klinowej segmentów IVb/V wątroby oraz regionalnej limfadenektomii). Szpital ma obowiązek niezwłocznie wydać pacjentce Kartę DiLO, która umożliwia pilne skierowanie na konsylium onkologiczne i leczenie w wyspecjalizowanym ośrodku chirurgii onkologicznej."
    }
  },
  128: {
    pathoTargets: [
      "Diagnostyka: USG jamy brzusznej (poszerzenie przewodu żółciowego wspólnego PŻW >8–10 mm, poszerzenie przewodów wewnątrzwątrobowych, obecność złogów przewodowych), w razie wątpliwości MRCP (rezonans magnetyczny dróg żółciowych). Terapia: Pilna dekompresja dróg żółciowych za pomocą endoskopowej cholangiopankreatografii wstecznej (ECPW ze sfinkterotomią endoskopową i usunięciem złogów lub protezowaniem dróg żółciowych plastikowym stentem), w stopniu III (wstrząs septyczny) w trybie natychmiastowym (<12–24 h).",
      "Diagnostyka: Posiewy krwi (co najmniej 2 zestawy pobrane przed antybiotykoterapią: E. coli, Klebsiella spp., Enterobacter, Pseudomonas, enterokoki), posiew żółci uzyskanej podczas ECPW lub drenażu. Terapia: Natychmiastowa empiryczna antybiotykoterapia dożylna o szerokim spektrum (np. piperacylina z tazobaktamem 4,5 g i.v. co 6 h lub meropenem 1,0 g i.v. co 8 h u chorych we wstrząsie septycznym; alternatywnie ceftriakson 2,0 g 1 x dz. + metronidazol 500 mg co 8 h).",
      "Diagnostyka: Pełny profil wątrobowy (hiperbilirubinemia mieszana z przewagą sprzężonej >5–10 mg/dl, znaczny wzrost fosfatazy zasadowej AP i GGTP, umiarkowany wzrost transaminaz AST/ALT). Terapia: Równoległe intensywne leczenie sepsy zgodnie z protokołem Surviving Sepsis Campaign: agresywna płynoterapia zbilansowanymi krystaloidami (30 ml/kg m.c. w ciągu pierwszych 3 godzin), monitorowanie diurezy i stężenia mleczanów we krwi.",
      "Diagnostyka: Monitorowanie hemodynamiczne (inwazyjny pomiar ciśnienia tętniczego IBP, MAP <65 mmHg mimo płynoterapii, gazometria – kwasica metaboliczna, mleczany >2–4 mmol/l). Terapia: Wlew amin katecholowych (noradrenalina w ciągłym wlewie i.v. od 0,05–0,5 µg/kg/min w celu utrzymania MAP ≥65 mmHg), w razie opornego wstrząsu hydrokortyzon 200 mg/dobę i.v., intensywna opieka medyczna na OIT."
    ],
    q9: {
      question: "Wskaż zdanie FAŁSZYWE dotyczące ostrego zapalenia dróg żółciowych (Acute Cholangitis):",
      options: [
        "Klasyczna triada Charcota obejmuje: gorączkę z dreszczami, ból w prawym podżebrzu oraz żółtaczkę mechaniczną.",
        "Pentada Reynoldsa poszerza triadę Charcota o objawy wstrząsu (hipotensję) oraz zaburzenia świadomości i świadczy o septycznym, bezpośrednio zagrażającym życiu przebiegu.",
        "Podstawową metodą natychmiastowego odbarczenia dróg żółciowych u niestabilnego septycznie pacjenta jest pilna rozległa laparotomia ze znieczuleniem ogólnym i wycięciem przewodów żółciowych.",
        "Wzrost ciśnienia w drogach żółciowych powyżej 20-25 cm H2O prowadzi do przełamania bariery wątrobowej i translokacji bakterii oraz endotoksyn bezpośrednio do krążenia wrotnego i układowego (refluks żółciowo-żylny).",
        "W badaniach laboratoryjnych typowo stwierdza się cechy ciężkiej cholestazy (podwyższona fosfataza zasadowa, GGTP i bilirubina sprzężona) oraz wybitnie podwyższone markery zapalne (leukocytoza, CRP, prokalcytonina)."
      ],
      correct: 2,
      explanation: "Zdanie C jest FAŁSZYWE. U pacjenta z ostrym zapaleniem dróg żółciowych wstrząsem septycznym otwarta operacja chirurgiczna obarczona jest olbrzymią śmiertelnością (>30-50%). Złotym standardem dekompresji dróg żółciowych jest pilny zabieg endoskopowy – ECPW ze sfinkterotomią i/lub założeniem stentu odbarczającego, a w przypadku przeciwwskazań lub niedostępności – przezskórny drenaż dróg żółciowych (PTD) pod kontrolą USG/fluoroskopii."
    },
    q10: {
      question: "Do kryteriów ciężkiego (stopień III wg Tokyo Guidelines TG18) ostrego zapalenia dróg żółciowych należy obecność dysfunkcji co najmniej jednego narządu, w tym:\n1. Dysfunkcja układu krążenia: hipotensja wymagająca stosowania amin presyjnych (noradrenaliny lub dopaminy)\n2. Dysfunkcja układu nerwowego: zaburzenia świadomości (GCS <15)\n3. Dysfunkcja układu oddechowego: wskaźnik PaO2/FiO2 <300\n4. Dysfunkcja nerek: oliguria, stężenie kreatyniny w surowicy >2,0 mg/dl\n5. Dysfunkcja układu krzepnięcia: INR >1,5 oraz małopłytkowość PLT <100 000/µl\nPrawidłowa odpowiedź to:",
      options: [
        "1, 2, 4",
        "2, 3, 5",
        "1, 3, 5",
        "Wszystkie wymienione (1, 2, 3, 4, 5)",
        "1, 2, 3, 4"
      ],
      correct: 3,
      explanation: "Wszystkie wymienione cechy (1, 2, 3, 4, 5) stanowią uznane w Tokyo Guidelines TG18 kryteria dysfunkcji narządowej definiujące postać ciężką (stopień III) ostrego zapalenia dróg żółciowych, wymagającą pilnego natychmiastowego odbarczenia dróg żółciowych oraz leczenia w warunkach intensywnej terapii."
    },
    q11: {
      question: "72-letni pacjent z ostrym septycznym zapaleniem dróg żółciowych w przebiegu kamicy przewodowej trafia na SOR we wstrząsie septycznym z głębokimi zaburzeniami świadomości (GCS 8), bez obecności osób bliskich. Wymaga natychmiastowego pilnego ECPW z protezowaniem dróg żółciowych w trybie ratunkowym. Zgodnie z art. 34 ust. 7 Ustawy o zawodach lekarza i lekarza dentysty:",
      options: [
        "Lekarz może wykonać procedurę bez zgody pacjenta, jeżeli zwłoka groziłaby niebezpieczeństwem utraty życia lub ciężkiego uszkodzenia ciała, po zasięgnięciu w miarę możliwości opinii drugiego lekarza i odnotowaniu tego faktu w dokumentacji medycznej oraz niezwłocznym powiadomieniu sądu opiekuńczego.",
        "Przed wykonaniem ECPW lekarz musi bezwzględnie zaczekać na postanowienie sądu opiekuńczego o ustanowieniu kuratora, nawet jeśli pacjent ulegnie zatrzymaniu krążenia.",
        "Do wykonania procedury u nieprzytomnego konieczne jest uzyskanie zgody telefonicznej dowolnego sąsiada lub znajomego pacjenta.",
        "Brak pisemnej zgody wyklucza jakąkolwiek interwencję inwazyjną, a lekarzowi wolno stosować jedynie leczenie farmakologiczne.",
        "Zgodę na operację u każdego nieprzytomnego dorosłego pacjenta może wydać funkcjonariusz policji."
      ],
      correct: 0,
      explanation: "Zgodnie z art. 34 ust. 7 UoZL, w stanie nagłym, gdy pacjent jest niezdolny do wyrażenia świadomej zgody, a zwłoka grozi niebezpieczeństwem utraty życia lub ciężkiego uszkodzenia ciała, lekarz podejmuje czynności medyczne bez zgody pacjenta. Wymaga to w miarę możliwości porozumienia z drugim lekarzem, szczegółowego wpisu do dokumentacji medycznej oraz powiadomienia sądu opiekuńczego."
    }
  },
  129: {
    pathoTargets: [
      "Diagnostyka: Wywiad lekarski (przewlekłe stosowanie NLPZ, infekcja Helicobacter pylori, choroba wrzodowa w wywiadzie), morfologia (niedokrwistość, hemokoncentracja), koagulogram. Terapia: Ścisła dieta zerowa, kaniulacja dwóch obwodowych linii naczyniowych o dużym przekroju (14–16G), agresywna resuscytacja płynowa krystaloidami (PWE/0,9% NaCl 30–40 ml/kg m.c.), monitorowanie diurezy cewnikiem Foleya (cel: >0,5 ml/kg/h).",
      "Diagnostyka: RTG klatki piersiowej na stojąco lub RTG brzucha w ułożeniu na lewym boku promieniem poziomym (widoczny sierp powietrza pod kopułami przepony – wolny gaz w jamie otrzewnej u 70–80% chorych); w razie wątpliwości TK jamy brzusznej bez i z kontrastem doustnym/dożylnym. Terapia: Założenie sondy żołądkowej (zgłębnik Levin/Salem) i ciągłe odsysanie treści żołądkowej w celu redukcji dalszego wycieku kwasu do otrzewnej; pilna konsultacja chirurgiczna.",
      "Diagnostyka: Badanie palpacyjne powłok brzusznych – obrona mięśniowa, objaw 'brzucha deskowatego', uogólnione objawy Blumberga, zanik stłumienia wątrobowego (objaw objęcia wątroby gazem). Terapia: Inhibitor pompy protonowej w wysokiej dawce i.v. (pantoprazol lub ezomeprazol 80 mg w bolusie i.v., następnie ciągły wlew 8 mg/h lub 40 mg i.v. co 12 h); skuteczne zwalczanie bólu po zbadaniu przez chirurga (np. metamizol 1,0–2,5 g i.v., fentanyl 50–100 µg i.v.).",
      "Diagnostyka: Gazometria tętnicza (kwasica metaboliczna, hiperlaktatemia), parametry nerkowe, elektrolity, posiewy krwi i wysięku otrzewnowego. Terapia: Pilna interwencja chirurgiczna (laparoskopowa lub otwarta): zeszycie perforacji wrzodu z omentoplastyką sposobem Grahama (zaopatrzenie płatem sieci większej), obfite płukanie jamy otrzewnej ciepłym 0,9% NaCl (5–10 litrów), drenaż jamy brzusznej, empiryczna antybiotykoterapia o szerokim spektrum (np. ceftriakson 2,0 g 1 x dz. + metronidazol 500 mg 3 x dz. lub ertapenem 1,0 g 1 x dz.)."
    ],
    q9: {
      question: "Wskaż zdanie FAŁSZYWE dotyczące przedziurawienia (perforacji) wrzodu trawiennego:",
      options: [
        "Ból w momencie perforacji pojawia się nagle, jest ekstremalnie silny i często opisywany przez chorych jako 'cios nożem w brzuch'.",
        "Brak obecności sierpa wolnego gazu pod kopułą przepony na przeglądowym RTG klatki piersiowej w pozycji stojącej w 100% wyklucza perforację przewodu pokarmowego i pozwala bezpiecznie odesłać chorego do domu.",
        "Perforacja dotyczy najczęściej przedniej ściany opuszki dwunastnicy, podczas gdy wrzody ściany tylnej częściej powikłane są krwotokiem z tętnicy żołądkowo-dwunastniczej.",
        "Klasycznym objawem fizykalnym w badaniu palpacyjnym jest 'brzuch deskowaty' wywołany odruchowym, skrajnym napięciem mięśni powłok jamy brzusznej (défense musculaire).",
        "Standardowym postępowaniem operacyjnym przy perforacji wrzodu opuszki jest pierwotne zeszycie ubytku i pokrycie szwów unaczynionym płatem sieci większej (sposób Grahama)."
      ],
      correct: 1,
      explanation: "Zdanie B jest FAŁSZYWE. Na przeglądowym RTG klatki piersiowej na stojąco wolny gaz pod kopułą przepony (pneumoperitoneum) widoczny jest u ok. 70-80% chorych z przedziurawieniem wrzodu. U pozostałych 20-30% chorych (np. mała perforacja, zatkanie siecią, krótki czas od zdarzenia) gaz nie jest widoczny na RTG. W takich przypadkach badaniem o najwyższej czułości (>98%) jest pilna tomografia komputerowa (TK) jamy brzusznej."
    },
    q10: {
      question: "Do czynników ryzyka perforacji wrzodu trawiennego żołądka lub dwunastnicy należą:\n1. Przewlekłe lub doraźne stosowanie niesteroidowych leków przeciwzapalnych (NLPZ) bez osłony IPP\n2. Jednoczesne stosowanie doustnych glikokortykosteroidów lub leków przeciwkrzepliwych z NLPZ\n3. Aktywna infekcja Helicobacter pylori\n4. Palenie tytoniu i nadużywanie alkoholu\n5. Przebyte bezobjawowe zakażenie wirusem zapalenia wątroby typu A (HAV) w dzieciństwie\nPrawidłowa odpowiedź to:",
      options: [
        "1, 2, 3, 4",
        "1, 3, 5",
        "2, 4, 5",
        "1, 2, 5",
        "Wszystkie wymienione"
      ],
      correct: 0,
      explanation: "Prawidłowa odpowiedź to 1, 2, 3, 4. NLPZ, palenie tytoniu, zakażenie H. pylori oraz korticosteroidy to główne czynniki uszkadzające barierę śluzówkową żołądka i dwunastnicy, predysponujące do choroby wrzodowej i jej powikłań (krwawienia, perforacji). Przebyte zakażenie HAV (cecha 5) nie ma związku z chorobą wrzodową."
    },
    q11: {
      question: "U pacjenta operowanego w trybie pilnym z powodu perforacji wrzodu dwunastnicy powikłanej rozlanym zapaleniem otrzewnej, po udanym zabiegu i 10-dniowej hospitalizacji, lekarz wypisujący pacjenta do domu:",
      options: [
        "Wystawia zaświadczenie o czasowej niezdolności do pracy ZUS ZLA na okres rekonwalescencji z zaleceniem oszczędzającego trybu życia, zakazem dźwigania ciężarów przez 3 miesiące, bezwzględnym zaleceniem eradykacji Helicobacter pylori oraz kontrolną gastroskopią po 6-8 tygodniach.",
        "Ma zakaz wystawienia zwolnienia lekarskiego ZUS ZLA na okres dłuższy niż 3 dni od dnia wypisu ze szpitala.",
        "Ma obowiązek natychmiast zgłosić perforację wrzodu do Państwowej Inspekcji Pracy jako wypadek przy pracy, niezależnie od okoliczności zachorowania.",
        "Zobowiązany jest wpisać do dokumentacji odmowę dalszego leczenia IPP w POZ z uwagi na zakończenie procesu leczenia szpitalnego.",
        "Zwalnia chorego z konieczności jakiejkolwiek kontroli gastroskopowej, gdyż zabieg chirurgiczny całkowicie eliminuje ryzyko nawrotu wrzodu."
      ],
      correct: 0,
      explanation: "Po operacyjnym zaopatrzeniu perforacji wrzodu trawiennego obowiązkiem lekarza jest zaplanowanie pełnej rekonwalescencji (orzeczenie ZUS ZLA, ograniczenie wysiłku fizycznego zapobiegające powstawaniu przepuklin w bliźnie), wdrożenie pełnej diagnostyki i eradykacji Helicobacter pylori, kontynuacja leczenia IPP oraz kontrolna gastroskopia po 6-8 tygodniach w celu oceny wygojenia i wykluczenia tła nowotworowego."
    }
  },
  130: {
    pathoTargets: [
      "Diagnostyka: Wywiad chirurgiczny (przebyte laparotomie, apendektomia, cięcie cesarskie), RTG przeglądowe jamy brzusznej na stojąco lub w ułożeniu na boku (liczne poziomy płynów w pętlach jelita cienkiego z obrazem 'schodków', brak gazu w bańce odbytnicy). Terapia: Założenie sondy żołądkowej (sonda Levina) z ciągłym odsysaniem treści w celu dekompresji żołądka i zapobiegania aspiracji; ścisła dieta zerowa.",
      "Diagnostyka: TK jamy brzusznej i miednicy z kontrastem i.v. (złoty standard: identyfikacja strefy przejścia transition zone, ocena szerokości pętli >2,5–3 cm, poszukiwanie cech pętli zamkniętej closed loop lub uwięźnięcia). Terapia: Agresywne dożylne uzupełnianie płynów zbilansowanymi krystaloidami (np. Plasmalyte / PWE 30–50 ml/kg/dobę) z monitorowaniem diurezy za pomocą cewnika Foleya (cel: >0,5 ml/kg/h).",
      "Diagnostyka: Gazometria, jonogram (hipokaliemia, hipochloremia, hipomagnezemia w wyniku wymiotów soku żołądkowego), mocznik i kreatynina (przednerkowe uszkodzenie nerek). Terapia: Wyrównanie hipokaliemii (wlew KCl w roztworze krystaloidu z prędkością maks. 10–20 mmol/h pod kontrolą EKG), wyrównanie hipochloremii roztworem 0,9% NaCl, kontrola parametrów równowagi kwasowo-zasadowej.",
      "Diagnostyka: Monitorowanie kliniczne pod kątem objawów strangulacji (stały, nieustępujący ostry ból brzucha, gorączka, tachykardia, narastająca leukocytoza, wzrost mleczanów, objawy zapalenia otrzewnej). Terapia: Pilna operacja w trybie nagłym (uwolnienie zrostów – adhesiolysis, ocena żywotności pętli po ogrzaniu ciepłym 0,9% NaCl; w razie martwicy – odcinkowa resekcja jelita cienkiego z pierwotnym zespoleniem koniec do końca lub wyłonieniem stomii odbarczającej)."
    ],
    q9: {
      question: "Wskaż zdanie FAŁSZYWE dotyczące mechanicznej niedrożności jelita cienkiego (SBO):",
      options: [
        "Najczęstszą przyczyną niedrożności mechanicznej jelita cienkiego w krajach rozwiniętych są pooperacyjne zrosty wewnątrzotrzewnowe (odpowiadające za ok. 60-75% przypadków).",
        "Klasyczna triada objawów niedrożności mechanicznej obejmuje: kolkowy ból brzucha, nudności/wymioty oraz zatrzymanie gazów i stolca.",
        "Obecność stałego, nieustępującego bólu brzucha, gorączki, tachykardii i narastającej leukocytozy wskazuje na powikłanie strangulacją (zadziźnieniem i martwicą pętli) i stanowi bezwzględne wskazanie do pilnej operacji.",
        "Każdą niepowikłaną niedrożność zrostową należy natychmiast, w ciągu pierwszej godziny od przyjęcia, operować metodą laparotomii bez wcześniejszej próby leczenia zachowawczego.",
        "W początkowej fazie niedrożności w badaniu osłuchowym brzucha stwierdza się wzmożoną, głośną perystaltykę o metalicznym wydźwięku (objaw staccato / przelewania)."
      ],
      correct: 3,
      explanation: "Zdanie D jest FAŁSZYWE. W przypadku niepowikłanej zrostowej niedrożności jelita cienkiego (brak objawów zapalenia otrzewnej, brak cech strangulacji i niedokrwienia pętli jelitowej w TK) standardem postępowania pierwszego rzutu jest leczenie zachowawcze (ścisła dieta zerowa, dekompresja żołądka sondą Levina, płynoterapia dożylna oraz próba z rozpuszczalnym w wodzie kontrastem doustnym Gastrografin). Postępowanie takie prowadzi do ustąpienia niedrożności u ok. 70-80% chorych bez konieczności zabiegu operacyjnego."
    },
    q10: {
      question: "Do cech radiologicznych mechanicznej niedrożności jelita cienkiego na przeglądowym zdjęciu RTG jamy brzusznej lub w tomografii komputerowej należą:\n1. Poszerzenie pętli jelita cienkiego powyżej 2,5-3 cm średnicy\n2. Obecność mnogich poziomów płynów układających się w obraz 'schodków'\n3. Ubytek/brak gazu w obrębie jelita grubego i bańki odbytnicy\n4. Pogrubienie ściany jelita i objaw 'tarczy strzelniczej' (target sign) w razie obrzęku lub niedokrwienia\n5. Prawidłowy, równomierny rozkład gazów w całym przewodzie pokarmowym bez poszerzenia pętli\nPrawidłowa odpowiedź to:",
      options: [
        "1, 2, 3, 4",
        "1, 2, 5",
        "2, 3, 5",
        "1, 3, 5",
        "Wszystkie wymienione"
      ],
      correct: 0,
      explanation: "Prawidłowa odpowiedź to 1, 2, 3, 4. Klasycznymi cechami mechanicznymi są rozdęte pętle jelita cienkiego (>2,5-3 cm), poziomy płynów, zmniejszona ilość gazu dystalnie od przeszkody oraz obrzęk ściany pętli. Cecha 5 opisuje stan prawidłowy, całkowicie wykluczający niedrożność mechaniczną."
    },
    q11: {
      question: "Pacjentka po przebytej 5 lat wcześniej laparotomii ginekologicznej zgłasza się z niedrożnością zrostową jelita cienkiego i zarzuca operatorowi popełnienie błędu lekarskiego, twierdząc, że samo powstanie zrostów jest dowodem na zaniedbanie chirurgiczne. Zgodnie z wiedzą medyczną i polskim orzecznictwem sądowo-lekarskim:",
      options: [
        "Powstawanie zrostów otrzewnowych jest naturalnym, biologicznym następstwem gojenia się otrzewnej po zabiegach chirurgicznych i samo w sobie nie stanowi błędu w sztuce medycznej, o ile zabieg pierwotny wykonano lege artis zgodnie z aktualną wiedzą medyczną.",
        "Każde pooperacyjne zrosty wewnątrzotrzewnowe są traktowane z urzędu jako zawiniony błąd medyczny skutkujący automatycznym odszkodowaniem z OC szpitala.",
        "Chirurg przed każdą laparotomią ma prawny obowiązek zagwarantować pacjentowi 100% brak zrostów pod rygorem odpowiedzialności karnej.",
        "Pacjentka z podejrzeniem zrostów traci prawo do bezpłatnego leczenia szpitalnego w ramach ubezpieczenia zdrowotnego NFZ.",
        "Zgoda pacjentki na pierwszą operację zwalnia szpital z obowiązku leczenia jakichkolwiek późnych powikłań pooperacyjnych."
      ],
      correct: 0,
      explanation: "Zgodnie z ugruntowanym orzecznictwem Sądu Najwyższego oraz opiniami biegłych medycyny sądowej, powstanie zrostów pooperacyjnych jest powikłaniem wpisanym w ryzyko każdej interwencji chirurgicznej w jamie brzusznej (występuje u >90% operowanych). Samo wystąpienie zrostów nie stanowi błędu w sztuce medycznej (zdarzenia niepożądanego zawinionego), jeśli zabieg przeprowadzono z należytą starannością."
    }
  }
};

async function processBatch() {
  console.log('=== RUNNING UPGRADES FOR CASES 121 TO 130 ===');
  const files = fs.readdirSync('cases').sort((a, b) => {
    return parseInt(a.split('_')[0], 10) - parseInt(b.split('_')[0], 10);
  });

  for (const f of files) {
    if (!f.endsWith('.json') || f === 'auth.json' || f === 'index.json') continue;
    const id = parseInt(f.split('_')[0], 10);
    if (isNaN(id) || id < 121 || id > 130) continue;
    const fullPath = path.join('cases', f);
    const raw = fs.readFileSync(fullPath, 'utf8');
    const c = await decryptObjectAes(JSON.parse(raw), MASTER_KEY);

    // 1. Vitals audit & cleanup
    if (Array.isArray(c.vitals)) {
      c.vitals = c.vitals.map(v => {
        const label = v.label || v.name || 'Parametr';
        return {
          label: label,
          name: label,
          val: v.val || '',
          sub: v.sub || '',
          status: v.status || 'vital-ok'
        };
      });
    }

    // 2. Steps unwrap excessive bolding & strip stray dose-pills
    if (Array.isArray(c.steps)) {
      c.steps.forEach(st => {
        if (Array.isArray(st.options)) {
          st.options.forEach(opt => {
            if (opt.feedback) {
              opt.feedback = stripDosePills(unwrapExcessiveBolding(opt.feedback));
            }
          });
        }
      });
    }

    // 3. PathoNodes targets upgrade & dose-pill stripping
    const upgrade = UPGRADES_121_130[id];
    if (upgrade && Array.isArray(c.pathoNodes)) {
      c.pathoNodes.forEach((node, idx) => {
        if (upgrade.pathoTargets && upgrade.pathoTargets[idx]) {
          node.target = upgrade.pathoTargets[idx];
        } else if (node.target) {
          node.target = stripDosePills(node.target);
        }
      });
    }

    // 4. LEK Questions CEM Overhaul (Q9 false, Q10 combinatorial, Q11 law/ethics)
    if (upgrade && Array.isArray(c.lekQuestions) && c.lekQuestions.length >= 11) {
      if (upgrade.q9) c.lekQuestions[8] = upgrade.q9;
      if (upgrade.q10) c.lekQuestions[9] = upgrade.q10;
      if (upgrade.q11) c.lekQuestions[10] = upgrade.q11;
    }

    // Re-encrypt and write
    const reEncrypted = await encryptStringAes(JSON.stringify(c, null, 2), MASTER_KEY);
    fs.writeFileSync(fullPath, JSON.stringify(reEncrypted, null, 2), 'utf8');
    console.log(`[PERFECT PASS] Case #${id}: ${f}`);
  }
  console.log('Batch 121 to 130 processed successfully!');
}

processBatch().catch(err => {
  console.error('Błąd:', err);
  process.exit(1);
});

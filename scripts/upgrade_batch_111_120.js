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

const UPGRADES_111_120 = {
  111: {
    pathoTargets: [
      "Diagnostyka: Szybki test antygenowy w kierunku paciorkowców grupy A (Strep-test / RADT) lub posiew wymazu z gardła i migdałków; ocena w skali Centora/McIsaaca. Terapia: Fenoksymetylopenicylina doustnie 100 000–200 000 j.m./kg m.c./dobę w 2 dawkach podzielonych przez pełne 10 dni (eradykacja nosicielstwa i zapobieganie gorączce reumatycznej); w razie nadwrażliwości natychmiastowej: azytromycyna (12 mg/kg 1 x dz. przez 5 dni) lub klarytromycyna (15 mg/kg/d w 2 dawkach przez 10 dni).",
      "Diagnostyka: Badania laboratoryjne ostrej fazy (leukocytoza z neutrofilią, wysokie CRP >30–50 mg/l, miano ASO narastające po 2–3 tygodniach). Terapia: Leczenie objawowe przeciwgorączkowe i przeciwbólowe: paracetamol 15 mg/kg m.c. p.o./p.r. co 4–6 h lub ibuprofen 10 mg/kg m.c. p.o. co 8 h, obfite nawodnienie doustne.",
      "Diagnostyka: Badanie przedmiotowe powłok skórnych – ocena drobnoplamistej, szorstkiej osutki ('papier ścierny'), trójkąta Fiłatowa (bladość wokół ust przy zaczerwienieniu policzków), linii Pastii w zgięciach stawowych oraz objawu dermografizmu. Terapia: Pielęgnacja skóry, unikanie gorących kąpieli, luźna odzież bawełniana, emolienty łagodzące świąd i suchość.",
      "Diagnostyka: Badanie przedmiotowe w fazie rekonwalescencji (po 7–14 dniach od początku choroby) – poszukiwanie charakterystycznego grubopłatkowego złuszczania naskórka na opuszkach palców rąk i stóp. Terapia: Stosowanie kremów regenerujących i maści z 5% pantenolem; zakaz mechanicznego zrywania płatów naskórka; kontrolne badanie ogólne moczu po 2–3 tygodniach w celu wykluczenia popaciorkowcowego kłębuszkowego zapalenia nerek."
    ],
    q9: {
      question: "Wskaż zdanie FAŁSZYWE dotyczące płonicy (szkarlatyny) u dzieci:",
      options: [
        "Czynnikiem etiologicznym płonicy jest Streptococcus pyogenes (paciorkowiec beta-hemolizujący grupy A – GAS) wytwarzający pirogenne egzotoksyny erytrogenne (superantygeny SpeA, SpeB, SpeC).",
        "Charakterystyczna osutka drobnoplamista o szorstkości papieru ściernego najgęściej występuje w zgięciach stawowych (linie Pastii) i oszczędza trójkąt wokół ust (trójkąt Fiłatowa).",
        "Skuteczna antybiotykoterapia penicylinowa prowadzona przez 10 dni całkowicie eliminuje ryzyko wystąpienia ostrego popaciorkowcowego kłębuszkowego zapalenia nerek (APSGN).",
        "Dziecko przestaje być zakaźne dla otoczenia już po 24 godzinach od rozpoczęcia skutecznej antybiotykoterapii.",
        "Grubopłatkowe złuszczanie naskórka, szczególnie wyraźne na dłoniach i stopach, pojawia się typowo pod koniec pierwszego lub w drugim tygodniu choroby."
      ],
      correct: 2,
      explanation: "Zdanie C jest FAŁSZYWE. Prawidłowa antybiotykoterapia penicylinowa (przez 10 dni) skutecznie zapobiega rozwojowi gorączki reumatycznej, ale NIE zapobiega wystąpieniu popaciorkowcowego kłębuszkowego zapalenia nerek (APSGN). APSGN jest chorobą wywołaną przez krążące kompleksy immunologiczne z nefrytogennych szczepów paciorkowca, na której wystąpienie antybiotyk nie ma udowodnionego wpływu ochronnego."
    },
    q10: {
      question: "Do typowych objawów klinicznych i cech diagnostycznych płonicy należą:\n1. Zapalenie gardła i migdałków z żywoczerwoną błoną śluzową ('płomienne gardło') oraz wybroczynami na podniebieniu\n2. 'Język malinowy' z przerostem brodawek smakowych poprzedzony białym nalotem w pierwszych dobach\n3. Drobnoplamista osutka zlewająca się na policzkach z wolnym od wykwitów trójkątem Fiłatowa\n4. Dodatni objaw Pastii (linijne wybroczyny w dołach łokciowych i fałdach pachwinowych)\n5. Zawsze obecne sączące pęcherze z miodowożółtymi strupami na twarzy\nPrawidłowa odpowiedź to:",
      options: [
        "1, 2, 3, 4",
        "1, 3, 5",
        "2, 4, 5",
        "1, 2, 5",
        "Wszystkie wymienione"
      ],
      correct: 0,
      explanation: "Prawidłowa odpowiedź to 1, 2, 3, 4. Sączące pęcherze z miodowożółtymi strupami (cecha 5) to klasyczny obraz liszajca zakaźnego (impetigo contagiosa), a nie osutki płoniczej."
    },
    q11: {
      question: "U 6-letniego dziecka z rozpoznaną płonicą lekarz wdrożył leczenie fenoksymetylopenicyliną. W kontekście zakaźności, izolacji szkolnej oraz orzecznictwa ZUS:",
      options: [
        "Dziecko przestaje stanowić zagrożenie epidemiczne dla innych dzieci po 24 godzinach od przyjęcia pierwszej dawki skutecznego antybiotyku i wówczas może powrócić do przedszkola/szkoły (przy braku gorączki i dobrym stanie ogólnym), a rodzicowi przysługuje zwolnienie ZUS ZLA na opiekę nad chorym dzieckiem.",
        "Dziecko podlega bezwzględnej przymusowej kwarantannie domowej przez pełne 21 dni nakładanej decyzją Sanepidu.",
        "Lekarz ma prawny zakaz wystawienia zwolnienia ZUS ZLA na opiekę nad dzieckiem chorującym na szkarlatynę.",
        "Każdy przypadek płonicy musi być zgłoszony do prokuratury jako przestępstwo przeciwko zdrowiu publicznemu.",
        "Dziecko może powrócić do placówki opiekuńczej dopiero po całkowitym ustąpieniu grubopłatkowego złuszczania naskórka dłoni i stóp (tj. po ok. 4-6 tygodniach)."
      ],
      correct: 0,
      explanation: "Paciorkowce grupy A giną pod wpływem penicyliny niezwykle szybko – po 24 godzinach prawidłowej antybiotykoterapii chory przestaje być zakaźny dla otoczenia. Po upływie 24 h i ustąpieniu gorączki oraz poprawie stanu ogólnego dziecko może bezpiecznie wrócić do placówki. Rodzic ma prawo do zwolnienia lekarskiego ZUS ZLA na czas sprawowania osobistej opieki nad chorym dzieckiem."
    }
  },
  112: {
    pathoTargets: [
      "Diagnostyka: Wywiad epidemiologiczny (kontakt z osobą chorą 10–21 dni wcześniej, brak szczepienia), badanie przedmiotowe wykwitów; w wątpliwych przypadkach lub u chorych z niedoborem odporności: PCR w kierunku DNA VZV z płynu z pęcherzyka. Terapia: W typowym przebiegu u dzieci nieszczepionych: leczenie objawowe przeciwświądowe i przeciwgorączkowe; unikanie NLPZ (ibuprofenu!).",
      "Diagnostyka: Badanie powłok skórnych – wielopostaciowość osutki (polimorfizm: plamka -> grudka -> pęcherzyk -> krosta -> strupek) z obecnością wykwitów na owłosionej skórze głowy i błonach śluzowych ('obraz gwieździstego nieba'). Terapia: Acyklowir doustnie (20 mg/kg m.c. maks. 800 mg 4 x dz. przez 5–7 dni) wdrożony w ciągu 24 h od początku osutki u pacjentów z grup podwyższonego ryzyka (dzieci >12 r.ż., przewlekłe choroby skóry, mukowiscydoza, przewlekła steroidoterapia).",
      "Diagnostyka: Ocena wtórnych nadkażeń bakteryjnych (rumień, obrzęk, ucieplenie wokół wykwitów, ropna wydzielina – najczęściej Streptococcus pyogenes lub Staphylococcus aureus; monitorowanie pod kątem martwiczego zapalenia powięzi). Terapia: Kontrola świądu: hydroksyzyna doustnie (1–2 mg/kg/d w 2–3 dawkach) lub leki przeciwhistaminowe II generacji; codzienne krótkie letnie kąpiele z delikatnym osuszaniem ręcznikiem; w razie nadkażenia bakteryjnego: cefazolina lub kloksacylina i.v./p.o.",
      "Diagnostyka: Badanie neurologiczne pod kątem powikłań OUN (ataksja móżdżkowa / cerebellitis – najczęstsze powikłanie neurologiczne o łagodnym przebiegu, rzadziej zapalenie mózgu encephalitis). Terapia: W powikłaniach neurologicznych lub u osób z ciężkim niedoborem odporności: acyklowir dożylnie w dawce 10–15 mg/kg m.c. co 8 h (30–45 mg/kg/dobę) w powolnym wlewie i.v. przez 10–14 dni z monitorowaniem nawodnienia i funkcji nerek."
    ],
    q9: {
      question: "Wskaż zdanie FAŁSZYWE dotyczące ospy wietrznej (Varicella) u dzieci:",
      options: [
        "Okres wylęgania ospy wietrznej wynosi typowo od 10 do 21 dni (średnio 14 dni).",
        "Okres zakaźności chorego rozpoczyna się na 1-2 dni przed pojawieniem się pierwszych wykwitów skórnych i trwa do momentu zaschnięcia wszystkich pęcherzyków w strupki.",
        "W leczeniu gorączki w przebiegu ospy wietrznej lekiem z wyboru jest ibuprofen ze względu na silne działanie przeciwświądowe.",
        "Charakterystyczną cechą osutki ospowej jest jej polimorfizm (jednoczesne występowanie plamek, grudek, pęcherzyków i strupków) oraz zajęcie owłosionej skóry głowy.",
        "Po przechorowaniu ospy wietrznej wirus VZV pozostaje w stanie utajenia (latencji) w zwojach czuciowych nerwów czaszkowych i rdzeniowych."
      ],
      correct: 2,
      explanation: "Zdanie C jest FAŁSZYWE. W przebiegu ospy wietrznej stosowanie niesteroidowych leków przeciwzapalnych (zwłaszcza IBUPROFENU) jest PRZECIWWSKAZANE ze względu na udokumentowane ryzyko wywołania ciężkich, zagrażających życiu bakteryjnych powikłań martwiczych skóry i tkanek miękkich (w tym martwiczego zapalenia powięzi – necrotizing fasciitis wywoływanego przez GAS). Jedynym bezpiecznym lekiem przeciwgorączkowym I rzutu jest PARACETAMOL."
    },
    q10: {
      question: "Do typowych cech klinicznych i powikłań ospy wietrznej u dzieci należą:\n1. Rzutowy wysiew osutki pęcherzykowej tworzący obraz 'gwieździstego nieba'\n2. Obecność pęcherzyków na owłosionej skórze głowy oraz na błonach śluzowych jamy ustnej\n3. Wtórne nadkażenia bakteryjne skóry wywoływane przez Streptococcus pyogenes lub Staphylococcus aureus\n4. Ostra ataksja móżdżkowa (cerebellitis) objawiająca się zaburzeniami chodu i równowagi\n5. Zawsze występujące trwałe bielactwo nabyte w miejscach po strupkach\nPrawidłowa odpowiedź to:",
      options: [
        "1, 2, 3, 4",
        "1, 2, 5",
        "2, 3, 5",
        "1, 3, 5",
        "Wszystkie wymienione"
      ],
      correct: 0,
      explanation: "Prawidłowa odpowiedź to 1, 2, 3, 4. Typowa ospa charakteryzuje się rzutową osutką polimorficzną, zajęciem owłosionej skóry głowy i błon śluzowych, a do powikłań należą nadkażenia bakteryjne i cerebellitis (ataksja móżdżkowa o zazwyczaj dobrym rokowaniu). Niepowikłane wykwity ospowe goją się bez pozostawiania trwałych blizn i bielactwa (cecha 5)."
    },
    q11: {
      question: "Zgodnie z polską Ustawą o zapobieganiu oraz zwalczaniu zakażeń i chorób zakaźnych u ludzi, w przypadku rozpoznania ospy wietrznej u dziecka:",
      options: [
        "Lekarz ma ustawowy obowiązek zgłoszenia przypadku ospy wietrznej do właściwego państwowego powiatowego inspektora sanitarnego (Sanepidu) na formularzu ZLK-1 w ciągu 24 godzin od rozpoznania lub powzięcia podejrzenia.",
        "Ospa wietrzna nie podlega żadnemu zgłoszeniu do organów inspekcji sanitarnej, gdyż jest powszechną chorobą wieku dziecięcego.",
        "Dziecko może uczęszczać do żłobka i przedszkola pomimo obecności świeżych pęcherzyków, o ile nie ma gorączki powyżej 38,0 °C.",
        "Szczepienie poekspozycyjne przeciwko ospie wietrznej jest całkowicie nieskuteczne i przeciwwskazane u osób z kontaktu.",
        "Lekarz zgłasza ospę wietrzną wyłącznie wtedy, gdy dziecko wymagało przyjęcia na oddział intensywnej terapii."
      ],
      correct: 0,
      explanation: "Zgodnie z ustawą o zapobieganiu oraz zwalczaniu zakażeń i chorób zakaźnych u ludzi, ospa wietrzna jest chorobą zakaźną objętą obowiązkiem zgłoszenia. Lekarz ma prawny obowiązek przesłania formularza ZLK-1 do właściwej powiatowej stacji sanitarno-epidemiologicznej w ciągu 24 godzin. W profilaktyce poekspozycyjnej u osób podatnych na zakażenie (nieszczepionych) skuteczne jest podanie szczepionki przeciw VZV w ciągu 72 godzin od ekspozycji."
    }
  },
  113: {
    pathoTargets: [
      "Diagnostyka: Morfologia krwi z rozmazem ręcznym (leukocytoza z limfocytozą >50%, obecność >10% atypowych limfocytów – komórek Downeya / pobudzonych limfocytów T CD8+), szybki test na obecność przeciwciał heterofilnych (odczyn Paula-Bunnella-Davidsohna / monospot u dzieci >4–5 r.ż.), serologia swoista EBV (anty-VCA IgM/IgG, anty-EBNA). Terapia: Leczenie objawowe: odpoczynek w łóżku, odpowiednie nawodnienie dożylne krystaloidami w razie dysfagii, leki przeciwgorączkowe (paracetamol, ibuprofen). Leki przeciwwirusowe (acyklowir) NIE są zalecane.",
      "Diagnostyka: Enzymy wątrobowe (wzrost ALT i AST u >80% chorych, umiarkowany wzrost GGTP i fosfatazy zasadowej, rzadko subkliniczna żółtaczka). Terapia: Oszczędzający tryb życia, unikanie leków hepatotoksycznych, monitorowanie prób wątrobowych do czasu ich normalizacji.",
      "Diagnostyka: Badanie palpacyjne jamy brzusznej oraz USG jamy brzusznej (ocena splenomegalii – powiększenie śledziony występuje u 50–75% chorych, ryzyko pęknięcia śledziony w 2.–3. tygodniu choroby). Terapia: Bezwzględny zakaz uprawiania sportów kontaktowych, podnoszenia ciężarów i intensywnego wysiłku fizycznego przez minimum 3–4 tygodnie (lub do czasu pełnej normalizacji wielkości śledziony w USG) w celu zapobieżenia zagrażającemu życiu pęknięciu torebki śledziony.",
      "Diagnostyka: Badanie powłok skórnych – pojawienie się uogólnionej, swędzącej osutki plamisto-grudkowej po podaniu antybiotyków aminopenicylinowych (amoksycylina, ampicylina) stosowanych błędnie z powodu podejrzenia anginy bakteryjnej. Terapia: Natychmiastowe odstawienie amoksycyliny; doustne leki przeciwhistaminowe (np. cetyryzyna, hydroksyzyna); edukacja pacjenta, że osutka ma podłoże immunologiczne/toksyczne i NIE oznacza trwałej alergii na penicyliny."
    ],
    q9: {
      question: "Wskaż zdanie FAŁSZYWE dotyczące mononukleozy zakaźnej wywołanej przez wirus Epsteina-Barr (EBV):",
      options: [
        "Główną drogą transmisji wirusa EBV jest kontakt ze śliną osoby zakażonej (stąd potoczna nazwa 'choroba pocałunków').",
        "Obecne w rozmazie krwi atypowe limfocyty (komórki Downeya) to zakażone komórki nowotworowe linii neutrofilowej.",
        "Zastosowanie amoksycyliny lub ampicyliny u pacjenta z mononukleozą zakaźną powoduje u 80-90% chorych wystąpienie swędzącej osutki plamisto-grudkowej.",
        "Najgroźniejszym powikłaniem mononukleozy zakaźnej, mogącym prowadzić do nagłego zgonu, jest pęknięcie śledziony.",
        "Rutynowe stosowanie acyklowiru lub gancyklowiru nie przynosi korzyści klinicznych w niepowikłanej mononukleozie i nie jest zalecane."
      ],
      correct: 1,
      explanation: "Zdanie B jest FAŁSZYWE. Atypowe limfocyty (komórki Downeya) obecne w rozmazie krwi obwodowej NIE są neutrofilami ani komórkami nowotworowymi – są to silnie pobudzone, cytotoksyczne limfocyty T (CD8+) reagujące na zakażone przez EBV limfocyty B. Stanowią one prawidłowy, fizjologiczny element odpowiedzi immunologicznej organizmu na zakażenie wirusem EBV."
    },
    q10: {
      question: "Do klasycznej triady objawów klinicznych mononukleozy zakaźnej oraz typowych odchyleń laboratoryjnych należą:\n1. Wysoka gorączka trwająca nierzadko 1-2 tygodnie\n2. Zapalenie gardła i migdałków z obfitymi biało-szarymi nalotami rzekomobłoniastymi\n3. Uogólniona limfadenopatia (ze szczególnym powiększeniem węzłów chłonnych szyjnych tylnych)\n4. Splenomegalia i hepatomegalia z podwyższeniem aktywności transaminaz ALT/AST\n5. Izolowana, skrajna leukopenia z agranulocytozą (neutrofile <100/µl)\nPrawidłowa odpowiedź to:",
      options: [
        "1, 2, 3, 4",
        "1, 3, 5",
        "2, 4, 5",
        "1, 2, 5",
        "Wszystkie wymienione"
      ],
      correct: 0,
      explanation: "Prawidłowa odpowiedź to 1, 2, 3, 4. Klasyczna triada mononukleozy to: gorączka, zapalenie gardła z nalotami i powiększenie węzłów chłonnych (zwłaszcza karkowych/szyjnych tylnych), którym towarzyszy splenomegalia i podwyższenie aminotransferaz. W morfologii występuje leukocytoza z przewagą limfocytów, a nie agranulocytoza (cecha 5)."
    },
    q11: {
      question: "17-letni uczeń liceum, aktywny zawodnik drużyny piłkarskiej, przebył mononukleozę zakaźną powikłaną splenomegalią (biegun dolny śledziony 4 cm poniżej łuku żebrowego). Zgodnie z wytycznymi medycyny sportowej i zasadami orzecznictwa lekarskiego:",
      options: [
        "Lekarz ma obowiązek wydać bezwzględny zakaz uprawiania sportów kontaktowych, podnoszenia ciężarów i intensywnego wysiłku fizycznego na okres minimum 3-4 tygodni od początku objawów, a powrót do sportu uzależnić od ustąpienia objawów i normalizacji wielkości śledziony w badaniu USG.",
        "Pacjent może wrócić do gry w meczu piłkarskim natychmiast po ustąpieniu gorączki (np. w 5. dobie choroby).",
        "Pęknięcie śledziony w mononukleozie jest mitem medycznym i nie wymaga żadnych ograniczeń wysiłkowych.",
        "Lekarz ma prawny obowiązek natychmiastowego wystawienia orzeczenia o trwałej niezdolności do uprawiania jakiegokolwiek sportu do końca życia.",
        "W celu umożliwienia szybkiego powrotu do sportu należy profilaktycznie wykonać laparoskopową splenektomię."
      ],
      correct: 0,
      explanation: "W przebiegu mononukleozy zakaźnej dochodzi do nacieczenia miazgi śledziony i ścieńczenia jej torebki. Ryzyko zagrażającego życiu pęknięcia śledziony jest najwyższe w pierwszych 3-4 tygodniach choroby (często po nawet błahym urazie brzucha lub nagłym wzroście ciśnienia tłoczni brzusznej). Wytyczne jednoznacznie nakazują powstrzymanie się od sportów kontaktowych i dźwigania przez co najmniej 3-4 tygodnie od początku choroby, z oceną w badaniu USG przed wznowieniem rywalizacji sportowej."
    }
  },
  114: {
    pathoTargets: [
      "Diagnostyka: Badanie metodą real-time PCR wymazu z nosogardła (złoty standard o najwyższej czułości w pierwszych 3 tygodniach kaszlu); posiew na podłożu Bordet-Gengou lub Regan-Lowe (wysoka swoistość, ale wolny wzrost); serologia (anty-PT IgG u starszych nieszczepionych). Terapia: Antybiotyk makrolidowy wdrożony jak najwcześniej (w fazie nieżytowej lub na początku fazy napadowej): azytromycyna 10 mg/kg m.c. 1 x dz. przez 5 dni (u niemowląt <6 m.ż. lek z wyboru) lub klarytromycyna 15 mg/kg/d w 2 dawkach przez 7 dni (makrolid eliminuje B. pertussis z nosogardła po 5 dniach, przerywając zakaźność).",
      "Diagnostyka: Ocena kliniczna fazy napadowej – napady seryjnego, 'szczekającego' kaszlu kończące się głośnym, świszczącym wdechem ('pianiem' – whoop), wymiotami po kaszlu lub bezdechem i sinicą u małych niemowląt. Terapia: Terapia wspomagająca: hospitalizacja niemowląt <6 m.ż., monitorowanie kardiorespiracyjne (pulsoksymetria, bezdechy), unikanie bodźców wyzwalających kaszel, delikatne odsysanie wydzieliny z dróg oddechowych; zakaz stosowania leków przeciwkaszlowych i mukolityków (brak skuteczności, ryzyko powikłań).",
      "Diagnostyka: Morfologia krwi obwodowej – wybitna leukocytoza z bezwzględną hiperlimfocytozą (często WBC >20 000–50 000/µl z przewagą małych dojrzałych limfocytów w wyniku działania toksyny krztuścowej blokującej wynaczynianie limfocytów). Terapia: W przypadku ekstremalnej leukocytozy (WBC >50 000–100 000/µl) powikłanej nadciśnieniem płucnym i niewydolnością krążeniowo-oddechową: transfuzja wymienna (leukafereza) w warunkach OIT w celu obniżenia lepkości krwi i zmniejszenia zakrzepicy mikronaczyniowej płuc.",
      "Diagnostyka: Monitorowanie epizodów bezdechu (apnea), gazometria (hipoksemia, retencja CO2), RTG klatki piersiowej (ocena powikłań: krztuścowe zapalenie płuc, niedodma, odma opłucnowa). Terapia: Bierna tlenoterapia w razie desaturacji, w przedłużających się bezdechach wentylacja nieinwazyjna (HFNC / CPAP) lub intubacja i wentylacja mechaniczna; profilaktyka poekspozycyjna u wszystkich osób z bliskiego kontaktu niezależnie od statusu szczepień."
    ],
    q9: {
      question: "Wskaż zdanie FAŁSZYWE dotyczące krztuśca (kokluszu) wywołanego przez Bordetella pertussis:",
      options: [
        "Typowy przebieg krztuśca obejmuje trzy następujące po sobie fazy: nieżytową (kataralną), napadowego kaszlu oraz zdrowienia.",
        "U małych niemowląt poniżej 6. miesiąca życia zamiast klasycznego 'piania' napady kaszlu często objawiają się epizodami bezdechu (apnea), sinicy i drgawek hipoksyjnych.",
        "Podanie antybiotyku makrolidowego (np. azytromycyny) w fazie późnej napadowej natychmiast, w ciągu 24 godzin, całkowicie cofa napady kaszlu i naprawia zniszczony nabłonek rzęskowy.",
        "W badaniu morfologii krwi obwodowej charakterystycznym zjawiskiem jest wysoka leukocytoza z wybitną limfocytozą bez podwyższenia innych parametrów zapalnych.",
        "Toksyna krztuścowa (PT) inaktywuje białko Gi, co prowadzi do niekontrolowanego wzrostu stężenia cAMP w komórkach gospodarza."
      ],
      correct: 2,
      explanation: "Zdanie C jest FAŁSZYWE. Antybiotykoterapia makrolidowa (azytromycyna, klarytromycyna) skraca czas trwania objawów jedynie wtedy, gdy zostanie wdrożona w bardzo wczesnej fazie nieżytowej. Wdrożona w rozwiniętej fazie napadowej NIE wpływa istotnie na nasilenie i czas trwania napadów kaszlu (ponieważ nabłonek urzęsiony oskrzeli został już zniszczony przez toksyny krztuścowe), natomiast jest bezwzględnie konieczna, ponieważ po 5 dniach eradykuje pałeczki krztuśca z dróg oddechowych i przerywa zakaźność dla otoczenia."
    },
    q10: {
      question: "Do wskazań do hospitalizacji dziecka z krztuścem należą:\n1. Wiek poniżej 6. miesiąca życia (ze względu na wysokie ryzyko bezdechów i nagłego zgonu)\n2. Występowanie epizodów bezdechu, sinicy lub drgawek w trakcie lub po napadzie kaszlu\n3. Trudności w karmieniu prowadzące do odwodnienia i zaburzeń wzrastania\n4. Rozwój powikłań płucnych (zapalenie płuc, niedodma, odma opłucnowa)\n5. Wyłącznie obecność suchego pokasływania bez wymiotów u zaszczepionego 15-latka\nPrawidłowa odpowiedź to:",
      options: [
        "1, 2, 3, 4",
        "1, 2, 5",
        "2, 3, 5",
        "1, 3, 5",
        "Wszystkie wymienione"
      ],
      correct: 0,
      explanation: "Prawidłowa odpowiedź to 1, 2, 3, 4. Niemowlęta <6 m.ż. oraz dzieci z bezdechami, sinicą, powikłaniami płucnymi lub niemożnością pojenia bezwzględnie wymagają leczenia szpitalnego z monitorowaniem krążeniowo-oddechowym. Starsze zaszczepione dzieci z łagodnym przebiegiem mogą być leczone ambulatoryjnie (cecha 5)."
    },
    q11: {
      question: "U 2-miesięcznego nieszczepionego niemowlęcia rozpoznano laboratoryjnie krztusiec. W gospodarstwie domowym przebywają: rodzice oraz 4-letni zaszczepiony brat. Zgodnie z wytycznymi sanitarno-epidemiologicznymi i polskim prawem:",
      options: [
        "Lekarz ma obowiązek zgłosić przypadek do powiatowej stacji Sanepidu w ciągu 24 godzin na druku ZLK-1 oraz wdrożyć poekspozycyjną profilaktykę antybiotykową (makrolidem, np. azytromycyną) u WSZYSTKICH osób mających bliski kontakt domowy, bez względu na ich wiek i status wcześniejszych szczepień.",
        "Chemoprofilaktykę poekspozycyjną podaje się wyłącznie osobom, które prezentują już ciężkie objawy duszności.",
        "Krztusiec nie podlega obowiązkowemu zgłoszeniu epidemiologicznemu do organów Państwowej Inspekcji Sanitarnej.",
        "Szczepiony 4-letni brat nie może otrzymać makrolidu, gdyż antybiotyki są prawnie zakazane u dzieci zaszczepionych.",
        "Poekspozycyjne podanie makrolidów rodzinie wymaga każdorazowo pisemnej zgody prokuratora rejonowego."
      ],
      correct: 0,
      explanation: "Zgodnie z wytycznymi sanitarno-epidemiologicznymi, krztusiec jest chorobą podlegającą natychmiastowemu zgłoszeniu do Sanepidu (ZLK-1 w ciągu 24 h). Poekspozycyjna profilaktyka antybiotykowa (PEP makrolidem w standardowych dawkach leczniczych) jest bezwzględnie zalecana dla WSZYSTKICH osób z bliskiego kontaktu domowego, niezależnie od ich wieku i przebytych szczepień, ponieważ odporność poszczepienna wygasa po kilku latach, a bezobjawowi nosiciele mogą transmitować zakażenie na wrażliwe niemowlęta."
    }
  },
  115: {
    pathoTargets: [
      "Diagnostyka: Wywiad kliniczny (przebieg dwufazowy), badanie przedmiotowe powłok skórnych – faza I: rumień na spoliczkach ('spoliczkowane dziecko' – slapped-cheek appearance) z bladością wokół ust; faza II: girlandowata, koronkowata lub siateczkowata osutka na kończynach i tułowiu nasilająca się pod wpływem ciepła/kąpieli. Terapia: Postępowanie objawowe: chłodne okłady, unikanie ekspozycji na gorącą wodę i słońce, leki przeciwgorączkowe (paracetamol) w razie dyskomfortu.",
      "Diagnostyka: Serologia w kierunku Parwowirusa B19 (przeciwciała IgM świadczące o świeżym zakażeniu, IgG o przebytej infekcji), u osób z niedoborami odporności PCR B19 we krwi. Terapia: W niepowikłanym przebiegu u dzieci zdrowych: brak konieczności jakiegokolwiek leczenia farmakologicznego; samoistne ustąpienie zmian w ciągu 1–3 tygodni.",
      "Diagnostyka: Pełna morfologia krwi z oceną retikulocytów u pacjentów z wrodzonymi niedokrwistościami hemolitycznymi (sferocytoza wrodzona, anemia sierpowatokrwinkowa, talasemia) – poszukiwanie przełomu aplastycznego (gwałtowny spadek Hb, retikulocyty <0,1–1 promila). Terapia: W przełomie aplastycznym: natychmiastowa transfuzja koncentratu krwinek czerwonych (KKCz), monitorowanie funkcji układu krążenia; u osób z przewlekłą aplazją czerwonokrwinkową w niedoborach odporności: immunoglobuliny dożylne (IVIG 0,4 g/kg m.c./d przez 5 dni).",
      "Diagnostyka: Pilna ocena ginekologiczno-położnicza u ciężarnych po kontakcie z rumieniem zakaźnym: seryjne USG płodu z oceną przepływu w tętnicy środkowej mózgu (MCA PSV) pod kątem niedokrwistości i obrzęku uogólnionego płodu (hydrops fetalis). Terapia: W razie ciężkiej anemii płodu zagrażającej obumarciem wewnątrzmacicznym: kordocenteza i dopłodowa wewnątrzmaciczna transfuzja dopępowo krwinek czerwonych w ośrodku referencyjnym medycyny matczyno-płodowej."
    ],
    q9: {
      question: "Wskaż zdanie FAŁSZYWE dotyczące rumienia zakaźnego (piątej choroby) wywołanego przez parwowirusa B19:",
      options: [
        "Parwowirus B19 wykazuje wybiórczy tropizm do komórek prekursorowych linii czerwonokrwinkowej (erytroblastów) w szpiku kostnym za pośrednictwem antygenu P (globozydu).",
        "W momencie pojawienia się typowej osutki na twarzy ('spoliczkowane dziecko') pacjent wykazuje najwyższą zakaźność dla otoczenia i musi być natychmiast bezwzględnie izolowany.",
        "U kobiet w ciąży (zwłaszcza w I i II trymestrze) zakażenie parwowirusem B19 może prowadzić do ciężkiej anemii płodu, uogólnionego obrzęku płodu (hydrops fetalis) i poronienia.",
        "U pacjentów z przewlekłymi niedokrwistościami hemolitycznymi (np. sferocytozą wrodzoną) zakażenie B19 może wywołać zagrażający życiu ostry przełom aplastyczny.",
        "Osutka na kończynach ma charakterystyczny siateczkowaty, koronkowaty lub girlandowaty wygląd i może nawracać pod wpływem ciepła, słońca lub stresu."
      ],
      correct: 1,
      explanation: "Zdanie B jest FAŁSZYWE. Zakaźność parwowirusem B19 występuje w fazie wiremii (podczas wstępnych objawów grypopodobnych, na 7-10 dni przed pojawieniem się wysypki). W momencie, gdy na skórze ujawnia się klasyczna osutka ('spoliczkowane dziecko' oraz zmiany koronkowate), jest ona wynikiem odkładania się kompleksów immunologicznych, faza wiremii minęła, a dziecko NIE JEST JUŻ ZAKAŹNE dla otoczenia i nie wymaga izolacji!"
    },
    q10: {
      question: "Do typowych manifestacji klinicznych zakażenia parwowirusem B19 w różnych grupach pacjentów należą:\n1. Obustronny rumień policzków z bladością okołoustną ('spoliczkowane dziecko') u dzieci\n2. Symetryczna artropatia (bóle i zapalenie drobnych stawów dłoni, nadgarstków i kolan) u dorosłych kobiet\n3. Przełom aplastyczny z retikulocytopenią u chorych na sferocytozę wrodzoną lub anemię sierpowatą\n4. Uogólniony obrzęk płodu (hydrops fetalis) w następstwie zakażenia wewnątrzmacicznego\n5. Zawsze występujące ostre ropne zapalenie opon mózgowo-rdzeniowych z pleocytozą neutrofilową\nPrawidłowa odpowiedź to:",
      options: [
        "1, 2, 3, 4",
        "1, 3, 5",
        "2, 4, 5",
        "1, 2, 5",
        "Wszystkie wymienione"
      ],
      correct: 0,
      explanation: "Prawidłowa odpowiedź to 1, 2, 3, 4. B19 wywołuje: rumień zakaźny u dzieci, zapalenie stawów u dorosłych (głównie kobiet), przełom aplastyczny u osób z hemolizą oraz obrzęk płodu u ciężarnych. Nie wywołuje bakteryjnego ropnego ZOMR (cecha 5)."
    },
    q11: {
      question: "Ciężarna nauczycielka przedszkola (w 16. tygodniu ciąży) zgłasza się do lekarza po kontakcie z dzieckiem, u którego rozpoznano rumień zakaźny. Zgodnie z rekomendacjami Polskiego Towarzystwa Ginekologów i Położników (PTGiP):",
      options: [
        "Należy pilnie oznaczyć stężenie swoistych przeciwciał IgG i IgM przeciw parwowirusowi B19 u ciężarnej; w przypadku potwierdzenia świeżego zakażenia (IgM+) konieczne jest seryjne monitorowanie ultrasonograficzne płodu (co 1-2 tygodnie przez 8-12 tygodni) z oceną przepływu w tętnicy środkowej mózgu (MCA PSV) pod kątem rozwoju niedokrwistości i obrzęku płodu.",
        "Należy natychmiast skierować pacjentkę do terminacji ciąży, gdyż zakażenie B19 w 100% powoduje ciężkie wady letalne u każdego płodu.",
        "Lekarz ma obowiązek podać profilaktycznie azytromycynę przez 14 dni w celu eradykacji wirusa z łożyska.",
        "Parwowirus B19 nie stwarza żadnego zagrożenia dla płodu i pacjentka nie wymaga żadnej diagnostyki serologicznej ani USG.",
        "Zaleca się natychmiastowe zaszczepienie ciężarnej atenuowaną szczepionką przeciw parwowirusowi B19."
      ],
      correct: 0,
      explanation: "U ciężarnych po kontakcie z B19 kluczowe jest badanie serologiczne (IgG/IgM). Obecność IgG przed ekspozycją świadczy o odporności. W razie świeżej infekcji (IgM+) lub serokonwersji konieczny jest seryjny nadzór USG z oceną prędkości skurczowej w tętnicy środkowej mózgu (MCA PSV) – wzrost przepływu koreluje z ciężką niedokrwistością płodu i pozwala na czas wdrożyć dopłodowe transfuzje dopępowo w ośrodku referencyjnym."
    }
  },
  116: {
    pathoTargets: [
      "Diagnostyka: Wywiad epidemiologiczny (wiek niemowlęcy 6–18 miesięcy), monitorowanie temperatury ciała – nagły początek z wysoką gorączką (często 39–40 °C) trwającą 3–5 dni przy relatywnie dobrym stanie ogólnym dziecka i braku uchwytnego ogniska infekcji w badaniu fizykalnym. Terapia: Postępowanie objawowe: leki przeciwgorączkowe (paracetamol 15 mg/kg m.c. co 4–6 h, ibuprofen 10 mg/kg m.c. co 8 h), odpowiednie pojenie doustne w celu zapobieżenia odwodnieniu.",
      "Diagnostyka: Badanie przedmiotowe gardła i uszu (delikatne zaczerwienienie gardła, grudki Nagayamy – małe owrzodzenia/grudki na podniebieniu miękkim i języczku, dyskretne powiększenie węzłów podpotylicznych i szyjnych tylnych). Terapia: Ochrona przed drgawkami gorączkowymi u predysponowanych niemowląt; brak wskazań do antybiotykoterapii.",
      "Diagnostyka: Obserwacja momentu przełomu choroby – gwałtowny, krytyczny spadek temperatury w 3.–4. dobie z natychmiastowym pojawieniem się bladoróżowej osutki plamistej i plamisto-grudkowej, zlokalizowanej głównie na tułowiu i szyi, w mniejszym stopniu na kończynach (znikającej przy ucisku). Terapia: Edukacja i uspokojenie rodziców – pojawienie się osutki w momencie spadku gorączki zwiastuje wyzdrowienie i zakończenie choroby; brak konieczności leczenia miejscowego.",
      "Diagnostyka: Różnicowanie z sepsą (w fazie gorączkowej) oraz z osutką polekową (np. po antybiotyku wdrożonym pochopnie w fazie gorączki). Terapia: U pacjentów z ciężkim niedoborem odporności (np. po transplantacji szpiku) z reaktywacją HHV-6 (zapalenie mózgu encephalitis): gancyklowir (5 mg/kg m.c. i.v. co 12 h) lub foskarnet; u dzieci immunokompetentnych leczenie przyczynowe nie jest wymagane."
    ],
    q9: {
      question: "Wskaż zdanie FAŁSZYWE dotyczące rumienia nagłego (gorączki trzydniowej / szóstej choroby):",
      options: [
        "Czynnikiem etiologicznym rumienia nagłego jest najczęściej ludzki herpeswirus typu 6 (HHV-6), rzadziej HHV-7.",
        "Choroba dotyczy najczęściej niemowląt i małych dzieci w wieku pomiędzy 6. a 24. miesiącem życia.",
        "Charakterystyczną cechą choroby jest wysiew drobnej osutki plamisto-grudkowej na tułowiu równolegle z gwałtownym ustąpieniem gorączki (w momencie lizy).",
        "Wysoka gorączka w pierwszych dobach choroby stanowi częstą przyczynę występowania drgawek gorączkowych u niemowląt.",
        "W fazie gorączkowej bezwzględnie konieczne jest empiryczne podanie doustnej amoksycyliny w celu zapobieżenia powikłaniom bakteryjnym."
      ],
      correct: 4,
      explanation: "Zdanie E jest FAŁSZYWE. Rumień nagły jest samoograniczającą się, łagodną infekcją wirusową. Rutynowe podawanie antybiotyków w fazie wysokiej gorączki bez stwierdzonego ogniska bakteryjnego jest poważnym błędem sztuki lekarskiej (często prowadzi do błędnego rozpoznania 'alergii na antybiotyk', gdy po spadku gorączki pojawia się naturalna dla HHV-6 osutka wirusowa)."
    },
    q10: {
      question: "Do typowych cech klinicznych rumienia nagłego (Exanthema subitum) należą:\n1. Nagły początek z wysoką gorączką (często >39,5 °C) trwającą 3 do 4 dni przy stosunkowo dobrym stanie ogólnym\n2. Grudki Nagayamy (drobne czerwone grudki na podniebieniu miękkim i języczku)\n3. Ustąpienie gorączki per lysin (spadek do normy w ciągu kilku godzin) z jednoczesnym pojawieniem się osutki\n4. Osutka bladoróżowa, plamisto-grudkowa, zlokalizowana głównie na tułowiu i szyi, rzadziej na twarzy i kończynach\n5. Zawsze obecne sączące pęcherze z martwicą naskórka na dłoniach i stopach\nPrawidłowa odpowiedź to:",
      options: [
        "1, 2, 3, 4",
        "1, 3, 5",
        "2, 4, 5",
        "1, 2, 5",
        "Wszystkie wymienione"
      ],
      correct: 0,
      explanation: "Prawidłowa odpowiedź to 1, 2, 3, 4. Klasyczny rumień nagły charakteryzuje się 3-4 dniami wysokiej gorączki, po których następuje krytyczny spadek ciepłoty ciała i jednoczesny wysiew osutki na tułowiu. Sączące pęcherze i martwica (cecha 5) to cechy zespołu Stevensa-Johnsona lub TEN, a nie rumienia nagłego."
    },
    q11: {
      question: "Lekarz POZ bada 10-miesięczne niemowlę z podejrzeniem rumienia nagłego w 4. dobie choroby: temperatura ciała znormalizowała się rano, a na tułowiu pojawiły się bladoróżowe plamki. Rodzice są zaniepokojeni wysypką. Prawidłowe postępowanie lekarskie i orzecznictwo obejmuje:",
      options: [
        "Poinformowanie rodziców, że pojawienie się osutki równolegle ze spadkiem gorączki jest typowym objawem wyzdrowienia (gorączka trzydniowa), nie wymaga leczenia farmakologicznego ani badań inwazyjnych, a dziecko po ustąpieniu osutki (1-2 dni) może powrócić do żłobka.",
        "Pilne skierowanie dziecka karetką na oddział dermatologii z rozpoznaniem zespołu Lyella.",
        "Natychmiastowe wdrożenie dożylnego wankomycyny i acyklowiru w warunkach OIT.",
        "Zgłoszenie podejrzenia przestępstwa narażenia dziecka na niebezpieczeństwo do sądu rodzinnego.",
        "Wystawienie bezterminowego przeciwwskazania do szczepień przeciwko odrze i ospie wietrznej."
      ],
      correct: 0,
      explanation: "Postępowanie w rumieniu nagłym po pojawieniu się osutki polega na uspokojeniu rodziców i edukacji, że wysypka oznacza końcowy etap infekcji i samoistnie ustąpi bez śladu w ciągu 24-48 godzin. Nie ma wskazań do antybiotykoterapii ani hospitalizacji u dziecka w dobrym stanie ogólnym."
    }
  },
  117: {
    pathoTargets: [
      "Diagnostyka: Wywiad epidemiologiczny (żłobek/przedszkole, skupiska dziecięce, okres letnio-jesienny), badanie przedmiotowe jamy ustnej (enanthema – bolesne pęcherzyki i owrzodzenia na błonie śluzowej policzków, dziąseł, języka i podniebienia) oraz skóry (exanthema – podłużne pęcherzyki na podłożu rumieniowym na dłoniach, stopach i pośladkach). Terapia: Leczenie objawowe: analgezja i leki przeciwgorączkowe (paracetamol 15 mg/kg m.c., ibuprofen 10 mg/kg m.c.), preparaty miejscowe do jamy ustnej (żele z hialuronianem, chlorheksydyną lub porostem islandzkim).",
      "Diagnostyka: Ocena stopnia nawodnienia u małego dziecka odmawiającego jedzenia i picia z powodu nasilonej bolesności owrzodzeń w jamie ustnej (suchość błon śluzowych, zapadnięte ciemiączko, elastyczność skóry, diureza). Terapia: Intensywne nawadnianie doustne małymi porcjami chłodnych, obojętnych płynów (woda, mleko, doustne płyny nawadniające ORS; zakaz kwaśnych soków cytrusowych i słonych pokarmów); w razie ciężkiego odwodnienia i odmowy pojenia: krótkotrwała płynoterapia dożylna krystaloidami (PWE 20 ml/kg m.c.).",
      "Diagnostyka: Monitorowanie pod kątem nietypowych lub złośliwych enterowirusów (np. Enterowirus A71 – EV-A71, mogący wywołać powikłania neurologiczne: zapalenie pnia mózgu, obrzęk płuc pochodzenia neurogennego; Coxsackie A6 wywołujący postać atypową z rozległymi pęcherzami). Terapia: W typowym przebiegu leczenie objawowe; w razie powikłań OUN (drżenia miokloniczne, ataksja, niestabilność krążeniowa) pilna hospitalizacja na OIT i dożylne immunoglobuliny (IVIG).",
      "Diagnostyka: Ocena późnych następstw skórno-płytkowych (po 4–8 tygodniach od zachorowania): poprzeczne bruzdy na paznokciach (linie Beau) oraz bezbolesne oddzielanie się i złuszczanie płytek paznokciowych od łożyska (onychomadesis). Terapia: Uspokojenie rodziców – onychomadesis jest łagodnym, samoograniczającym się następstwem przejściowego zahamowania macierzy paznokcia podczas ostrej fazy infekcji; paznokcie odrastają całkowicie prawidłowo w ciągu 3–6 miesięcy bez leczenia przeciwgrzybiczego."
    ],
    q9: {
      question: "Wskaż zdanie FAŁSZYWE dotyczące choroby dłoni, stóp i jamy ustnej (HFMD / 'choroby bostońskiej'):",
      options: [
        "Najczęstszymi czynnikami etiologicznymi HFMD są enterowirusy z rodziny Picornaviridae, głównie wirus Coxsackie A16 oraz Enterowirus 71 (EV71).",
        "Charakterystyczne wykwity skórne mają postać owalnych lub podłużnych pęcherzyków na rumieniowym podłożu, zlokalizowanych na dłoniach, podeszwach stóp i pośladkach.",
        "Wirus wydala się ze stolcem przez wiele tygodni (nawet do 4-8 tygodni) po ustąpieniu ostrych objawów klinicznych.",
        "W leczeniu przyczynowym pierwszego rzutu stosuje się dożylny gancyklowir w dawce 5 mg/kg m.c. przez 14 dni.",
        "Późnym, niegroźnym powikłaniem po przebyciu HFMD może być bezbolesne oddzielanie się i odpadanie płytek paznokciowych (onychomadesis)."
      ],
      correct: 3,
      explanation: "Zdanie D jest FAŁSZYWE. HFMD jest samoograniczającą się chorobą wywołaną przez enterowirusy RNA. Gancyklowir jest lekiem przeciwwirusowym stosowanym w ciężkich zakażeniach wirusami z grupy Herpes (CMV), nie wykazuje żadnej aktywności wobec enterowirusów i NIE ma zastosowania w leczeniu HFMD. Terapia choroby bostońskiej jest wyłącznie objawowa."
    },
    q10: {
      question: "Do typowych objawów klinicznych i cech choroby dłoni, stóp i jamy ustnej (HFMD) należą:\n1. Bolesne pęcherzyki i owrzodzenia (afty) na błonie śluzowej jamy ustnej, języku i dziąsłach utrudniające połykanie\n2. Szarobiałe, podłużne pęcherzyki na dłoniach i podeszwach stóp\n3. Wykwity grudkowo-pęcherzykowe na pośladkach i w okolicy krocza\n4. Ryzyko odwodnienia u małych dzieci w wyniku odmowy przyjmowania płynów z powodu bólu jamy ustnej\n5. Zawsze występująca uogólniona wiotka martwica całej powierzchni skóry (zespół Lyella)\nPrawidłowa odpowiedź to:",
      options: [
        "1, 2, 3, 4",
        "1, 2, 5",
        "2, 3, 5",
        "1, 3, 5",
        "Wszystkie wymienione"
      ],
      correct: 0,
      explanation: "Prawidłowa odpowiedź to 1, 2, 3, 4. HFMD manifestuje się pęcherzykami w jamie ustnej (herpangina/enanthema), na dłoniach, stopach i pośladkach, a głównym zagrożeniem u niemowląt jest odwodnienie spowodowane odynofagią. Uogólniona martwica naskórka (cecha 5) to TEN, niebędący powikłaniem HFMD."
    },
    q11: {
      question: "3-letnie dziecko z rozpoznaniem choroby dłoni, stóp i jamy ustnej przebywa w domu pod opieką matki. Matka pyta lekarza POZ, kiedy dziecko może wrócić do przedszkola oraz jak uzyskać zasiłek opiekuńczy ZUS. Zgodnie z wytycznymi medycznymi i orzecznictwem ZUS:",
      options: [
        "Dziecko może wrócić do placówki opiekuńczej po ustąpieniu gorączki i podsuszeniu pęcherzyków w jamie ustnej (zazwyczaj po 5-7 dniach od początku choroby), a matce przysługuje zwolnienie lekarskie ZUS ZLA na opiekę nad chorym dzieckiem (do limitu 60 dni w roku kalendarzowym).",
        "Dziecko musi przebywać w całkowitej izolacji w szpitalu zakaźnym przez okres minimum 8 tygodni ze względu na wydalanie wirusa w stolcu.",
        "Zasiłek opiekuńczy ZUS na dziecko z chorobą bostońską przysługuje wyłącznie wtedy, gdy matka jest hospitalizowana razem z dzieckiem na OIT.",
        "Dziecko może wrócić do przedszkola w 1. dobie choroby ze świeżymi pęcherzykami, gdyż wirusy Coxsackie nie przenoszą się między dziećmi.",
        "Lekarz ma obowiązek odmówić wystawienia zaświadczenia ZUS ZLA, ponieważ HFMD nie jest jednostką chorobową w klasyfikacji ICD-10."
      ],
      correct: 0,
      explanation: "Dziecko z HFMD przestaje być wysoce zakaźne po ustąpieniu gorączki i wygojeniu/podsuszeniu wykwitów w jamie ustnej i na skórze (zazwyczaj po ok. 5-7 dniach). Pomimo że wirus może być wydalany w stolcu przez kilka tygodni, przestrzeganie higieny rąk umożliwia powrót do przedszkola. Na okres ostrej choroby lekarz wystawia zaświadczenie ZUS ZLA dla rodzica (zasiłek opiekuńczy przysługuje do 60 dni w roku na dzieci do lat 14)."
    }
  },
  118: {
    pathoTargets: [
      "Diagnostyka: Wywiad lekarski i ocena kryteriów drgawek gorączkowych prostych (wiek 6 miesięcy – 5 lat, napad uogólniony toniczno-kloniczny trwający <15 minut, jednorazowy w ciągu 24 h, brak deficytu neurologicznego po napadzie, brak zakażenia OUN). Terapia: W napadzie trwającym >5 minut: przerwanie napadu – midazolam na błonę śluzową policzka (Buccolam 0,2–0,3 mg/kg m.c., dawki standardowe: 2,5 mg u niemowląt 6–12 m.ż., 5 mg u dzieci 1–5 lat) lub diazepam doodbytniczo (0,5 mg/kg m.c. wlewka p.r.); udrożnienie dróg oddechowych, ułożenie w pozycji bezpiecznej na boku.",
      "Diagnostyka: Poszukiwanie ogniska gorączki (badanie otoskopowe – zapalenie ucha środkowego AOM, badanie gardła – infekcja wirusowa, badanie moczu – ZUM). Terapia: Leczenie objawowe przeciwgorączkowe dla poprawy komfortu dziecka (paracetamol 15 mg/kg m.c. p.o./p.r. co 4–6 h, ibuprofen 10 mg/kg m.c. p.o. co 8 h); edukacja rodziców, że leki przeciwgorączkowe NIE zapobiegają nawrotom drgawek gorączkowych, a ich celem jest komfort pacjenta.",
      "Diagnostyka: Badanie neurologiczne po ustąpieniu napadu (ocena objawów oponowych, napięcia mięśniowego, stanu świadomości – wykluczenie zapalenia opon mózgowo-rdzeniowych ZOMR i zapalenia mózgu). Terapia: W przypadku podejrzenia neuroinfekcji (objawy oponowe, przedłużona senność ponapadowa >1 h, petocje na skórze, wiek <12 m.ż. nieszczepione przeciw HiB/Pneumokokom): pilne nakłucie lędźwiowe i empiryczna antybiotykoterapia i.v. (ceftriakson 100 mg/kg/d).",
      "Diagnostyka: Wskazania do badań neuroobrazowych i EEG (w drgawkach prostych rutynowe EEG, TK i MRI mózgowia są NIEZALECANE; badania te wykonuje się wyłącznie w drgawkach gorączkowych złożonych, z ogniskowym początkiem lub objawami uszkodzenia OUN). Terapia: Brak wskazań do przewlekłego leczenia przeciwpadaczkowego; edukacja rodziców odnośnie postępowania w razie kolejnego incydentu (pozycja boczna ustalona, nie wkładać przedmiotów do ust, podać Buccolam w razie napadu >5 min)."
    ],
    q9: {
      question: "Wskaż zdanie FAŁSZYWE dotyczące prostych drgawek gorączkowych u dzieci:",
      options: [
        "Występują typowo u dzieci w przedziale wiekowym od 6. miesiąca do 5. roku życia przy temperaturze ciała zazwyczaj przekraczającej 38,0–38,5 °C.",
        "Mają charakter uogólnionych napadów toniczno-klonicznych i trwają krócej niż 15 minut.",
        "Występują maksymalnie jeden raz w ciągu 24 godzin (w trakcie tego samego epizodu gorączkowego).",
        "Rutynowe, agresywne podawanie paracetamolu lub ibuprofenu przy każdym wzroście ciepłoty ciała w 100% zapobiega wystąpieniu drgawek gorączkowych.",
        "U dziecka z prostymi drgawkami gorączkowymi bez niepokojących objawów neurologicznych nie ma wskazań do rutynowego wykonywania badań neuroobrazowych (TK/MRI) ani badania EEG."
      ],
      correct: 3,
      explanation: "Zdanie D jest FAŁSZYWE. Wieloośrodkowe badania kliniczne jednoznacznie dowiodły, że rutynowe podawanie leków przeciwgorączkowych (paracetamolu czy ibuprofenu) NIE zapobiega wystąpieniu drgawek gorączkowych ani ich nawrotom. Napad drgawkowy często pojawia się na samym początku infekcji w fazie gwałtownego narastania temperatury, zanim rodzice zdążą podać lek. Celem leków przeciwgorączkowych jest wyłącznie poprawa komfortu chorego dziecka."
    },
    q10: {
      question: "Do cech definiujących drgawki gorączkowe ZŁOŻONE (atypowe) należą:\n1. Czas trwania napadu przekraczający 15 minut (lub stan padaczkowy gorączkowy)\n2. Napad o charakterze częściowym / ogniskowym (np. drgawki asymetryczne jednej połowy ciała)\n3. Wystąpienie więcej niż jednego napadu w ciągu 24 godzin (napady seryjne)\n4. Obecność przemijającego niedowładu poudarowego (porażenie Todda) po napadzie\n5. Napad uogólniony trwający 3 minuty u uprzednio zdrowego 2-latka z zapaleniem ucha\nPrawidłowa odpowiedź to:",
      options: [
        "1, 2, 3, 4",
        "1, 3, 5",
        "2, 4, 5",
        "1, 2, 5",
        "Wszystkie wymienione"
      ],
      correct: 0,
      explanation: "Prawidłowa odpowiedź to 1, 2, 3, 4. Drgawki złożone definiuje: czas >15 min, charakter ogniskowy, powtórzenie w ciągu 24 h lub obecność deficytu neurologicznego ponapadowego (porażenie Todda). Napad uogólniony trwający 3 minuty (cecha 5) to podręcznikowy przykład drgawek gorączkowych prostych."
    },
    q11: {
      question: "U 18-miesięcznego dziecka po przebytym pierwszym w życiu napadzie prostych drgawek gorączkowych w przebiegu infekcji wirusowej, lekarz wypisujący dziecko po obserwacji SOR:",
      options: [
        "Przekazuje rodzicom szczegółowy instruktaż pierwszej pomocy (ułożenie w pozycji bocznej bezpiecznej, ochrona głowy, zakaz wkładania czegokolwiek do ust, wezwanie ZRM przy napadzie >5 min), wystawia receptę na midazolam dopoliczkowy (Buccolam) do apteczki domowej oraz informuje, że przebyty napad nie stanowi przeciwwskazania do dalszych rutynowych szczepień ochronnych.",
        "Wystawia bezwzględne, dożywotnie przeciwwskazanie do jakichkolwiek szczepień ochronnych w PSO.",
        "Wdraża przewlekłą terapię karbamazepiną lub kwasem walproinowym na okres 3 lat.",
        "Kieruje dziecko w trybie natychmiastowym na zabieg neurochirurgicznej resekcji płata skroniowego mózgu.",
        "Nakazuje rodzicom rezygnację z pracy i nieopuszczanie łóżka dziecka przez najbliższe 5 lat."
      ],
      correct: 0,
      explanation: "Proste drgawki gorączkowe mają doskonałe rokowanie i nie prowadzą do uszkodzenia mózgu ani padaczki. Nie wymagają przewlekłego leczenia przeciwpadaczkowego ani odraczania szczepień. Lekarz powinien wyedukować rodziców w zakresie postępowania doraźnego oraz zabezpieczyć ich w doraźny lek przeciwdrgawkowy (midazolam dopoliczkowy Buccolam lub diazepam doodbytniczy) do podania w razie napadu trwającego >5 minut."
    }
  },
  119: {
    pathoTargets: [
      "Diagnostyka: Badanie przesiewowe noworodków (oznaczenie stężenia 17-hydroksyprogesteronu 17-OHP na bibule filtracyjnej w 3. dobie życia), oznaczenie 17-OHP, kortyzolu i androstenedionu w surowicy krwi żylnej; badanie cytogenetyczne (kariotyp 46,XX w przypadku obojnaczych narządów płciowych). Terapia: Dożywotnia substytucja glikokortykosteroidowa: hydrokortyzon doustnie w dawce 10–15 mg/m² m.c./dobę w 3 dawkach podzielonych (zwiększana 2–3-krotnie w sytuacjach stresu metabolicznego, gorączki, zabiegów operacyjnych).",
      "Diagnostyka: Oznaczenie stężenia ACTH w osoczu (znacznie podwyższone z powodu braku ujemnego sprzężenia zwrotnego kortyzolu), ocena hiperpigmentacji powłok skórnych (okolice narządów płciowych, otoczki brodawek sutkowych, kresa biała). Terapia: Optymalizacja dawki hydrokortyzonu pod kontrolą stężeń 17-OHP i androstenedionu (utrzymywanie ich w granicach górnej normy lub nieznacznie powyżej, aby uniknąć jatrogennego zahamowania wzrastania).",
      "Diagnostyka: Gazometria i jonogram w 2.–3. tygodniu życia (ciężka hiponatremia Na <125–130 mmol/l, hiperkaliemia K >6,0–8,0 mmol/l, kwasica metaboliczna, odwodnienie hipotoniczne – zagrażający życiu przełom solny). Terapia: Resuscytacja w przełomie nadnerczowym: bolus 0,9% NaCl 20 ml/kg m.c. i.v. w ciągu 1 h, następnie płynoterapia 0,9% NaCl z 5% Glukozą; hydrokortyzon w bolusie i.v. 50–100 mg/m² m.c. (lub 25 mg u noworodka), a następnie we wlewie ciągłym lub dawkach podzielonych co 6 h; dołączenie mineralokortykosteroidu: fludrokortyzon 0,05–0,2 mg/dobę p.o. + suplementacja chlorku sodu (NaCl 1–2 g/dobę do mleka).",
      "Diagnostyka: Badanie przedmiotowe noworodka z oceną stopnia wirylizacji narządów płciowych zewnętrznych u dziewczynek wg skali Pradera (I stopień – przerost łechtaczki do V stopnia – całkowicie męskie narządy z hipospadią prąciowo-mosznową). Terapia: Wielospecjalistyczna opieka w referencyjnym ośrodku zaburzeń rozwoju płci (DSD – Disorders of Sex Development): opieka endokrynologa dziecięcego, chirurga dziecięcego, genetyka i psychologa; feminizująca rekonstrukcja narządów płciowych rozważana w wyspecjalizowanych ośrodkach."
    ],
    q9: {
      question: "Wskaż zdanie FAŁSZYWE dotyczące klasycznej postaci wrodzonego przerostu nadnerczy z utratą soli (WPN z niedoboru 21-hydroksylazy):",
      options: [
        "Choroba dziedziczy się w sposób autosomalny recesywny i jest wywołana mutacjami w genie CYP21A2.",
        "Blok enzymatyczny prowadzi do niedoboru syntezy kortyzolu i aldosteronu z jednoczesnym nadmiernym gromadzeniem 17-hydroksyprogesteronu (17-OHP) i nadprodukcją androgenów nadnerczowych.",
        "U noworodków płci żeńskiej (46,XX) typowym objawem klinicznym przy urodzeniu jest wirylizacja zewnętrznych narządów płciowych o różnym stopniu zaawansowania wg skali Pradera.",
        "W badaniach biochemicznych w przełomie solnym typowo stwierdza się hipernatremię, hipokaliemię oraz zasadowicę metaboliczną.",
        "W terapii przewlekłej podstawą leczenia jest jednoczesna substytucja hydrokortyzonem i fludrokortyzonem wraz z suplementacją soli kuchennej (NaCl)."
      ],
      correct: 3,
      explanation: "Zdanie D jest FAŁSZYWE. Brak aldosteronu prowadzi do utraty sodu z moczem oraz zahamowania wydalania potasu i jonów wodorowych. W przełomie solnym (adrenal crisis) dochodzi do głębokiej HIPONATREMII, HIPERKALIEMII oraz KWASICY METABOLICZNEJ, a nie do hipernatremii i hipokaliemii (odwrotny układ elektrolitów cechuje hiperaldosteronizm pierwotny – zespół Conna)."
    },
    q10: {
      question: "Do objawów zagrażającego życiu przełomu nadnerczowego (solnego) u noworodka z klasycznym WPN w 2.–3. tygodniu życia należą:\n1. Apatia, brak łaknienia, osłabienie odruchu ssania i ubytek masy ciała\n2. Uporczywe chlustające wymioty i odwodnienie hipotoniczne\n3. Wstrząs hipowolemiczny z hipotensją i sinicą obwodową\n4. Ciężkie zaburzenia rytmu serca wywołane hiperkaliemią (szpiczaste załamki T, poszerzenie QRS w EKG)\n5. Gwałtowny przyrost masy ciała z masywnymi uogólnionymi obrzękami i nadciśnieniem tętniczym\nPrawidłowa odpowiedź to:",
      options: [
        "1, 2, 3, 4",
        "1, 3, 5",
        "2, 4, 5",
        "1, 2, 5",
        "Wszystkie wymienione"
      ],
      correct: 0,
      explanation: "Prawidłowa odpowiedź to 1, 2, 3, 4. Przełom solny charakteryzuje się postępującym odwodnieniem, wymiotami, wstrząsem hipowolemicznym oraz zagrażającą zatrzymaniem krążenia hiperkaliemią. Obrzęki i nadciśnienie (cecha 5) to cechy przewodnienia i hiperaldosteronizmu, całkowicie przeciwne do przełomu solnego."
    },
    q11: {
      question: "U noworodka urodzonego z obojnaczymi narządami płciowymi zewnętrznymi (przerost łechtaczki, zrośnięcie fałdów wargowo-mosznowych), u którego podejrzewa się wrodzony przerost nadnerczy, zgodnie z polskim prawem (Prawo o aktach stanu cywilnego) oraz wytycznymi medycznymi:",
      options: [
        "Kierownik USC na wniosek personelu medycznego może zarejestrować dziecko z oznaczeniem płci nieokreślonej na okres do ustalenia płci genetycznej (kariotyp 46,XX/46,XY), a rodzice muszą zostać wyedukowani w zakresie zasad postępowania w sytuacjach stresu (podwajanie dawek hydrokortyzonu) oraz zaopatrzeni w 'Kartę pacjenta z niewydolnością nadnerczy' i ampułkę hydrokortyzonu do iniekcji domowej.",
        "Lekarz ma prawny obowiązek natychmiastowego arbitralnego wpisania płci męskiej do aktu urodzenia bez czekania na wyniki badań genetycznych.",
        "Dziecko z WPN nie ma prawa do leczenia refundowanymi preparatami hydrokortyzonu.",
        "Oznaczenie kariotypu u noworodka z obojnaczymi narządami płciowymi jest w Polsce prawnie zabronione.",
        "Podanie hydrokortyzonu w stanie zagrożenia życia wymaga uprzedniej zgody sądu opiekuńczego."
      ],
      correct: 0,
      explanation: "W przypadku zaburzeń różnicowania płci (DSD) u noworodka kluczowe jest wstrzymanie się z rejestracją płci metrykalnej do czasu pilnego ustalenia kariotypu (zgodnie z prawem o aktach stanu cywilnego istnieje możliwość odroczenia wpisu płci). Z punktu widzenia bezpieczeństwa pacjenta kluczowe jest wydanie KARTY STERYDOWEJ (karty chorego z niedoczynnością nadnerczy), pouczenie o podwajaniu dawek w infekcjach/gorączce oraz przepisanie hydrokortyzonu parenteralnego (Corhydron) do podania w razie nagłych wymiotów/wstrząsu."
    }
  },
  120: {
    pathoTargets: [
      "Diagnostyka: Badania laboratoryjne krwi i moczu potwierdzające triadę DKA wg wytycznych ISPAD: hiperglikemia (>200 mg/dl / 11,1 mmol/l), kwasica metaboliczna w gazometrii (pH <7,30 lub HCO3 <15 mmol/l), ketonemia (stężenie beta-hydroksymaślanu we krwi >3,0 mmol/l) lub znaczna ketonuria. Terapia: Bezwzględna hospitalizacja na oddziale intensywnej terapii dziecięcej (lub sali wzmożonego nadzoru); ścisłe monitorowanie parametrów życiowych, glikemii co 1 h, elektrolitów i gazometrii co 2–4 h, bilansu płynów.",
      "Diagnostyka: Ocena stopnia odwodnienia (zwykle 5–10% deficytu masy ciała: suchość błon śluzowych, zapadnięte gałki oczne, wydłużony nawrót kapilarny CRT >3 s, tachykardia). Terapia: Resuscytacja płynowa I faza: wlew 0,9% NaCl w dawce 10–20 ml/kg m.c. w ciągu 1. godziny w celu przywrócenia perfuzji obwodowej; następnie powolne wyrównywanie deficytu płynowego zbilansowanym krystaloidem (np. Plasmalyte lub 0,9% NaCl) rozłożone na pełne 48 godzin (zbyt szybka płynoterapia grozi obrzękiem mózgu!).",
      "Diagnostyka: Gazometria tętnicza/włośniczkowa, stężenie potasu w surowicy przed podaniem insuliny (ocena hipo-/normo-/hiperkaliemii). Terapia: Ciągły dożylny wlew insuliny krótko działającej (regular) w stałej dawce 0,05–0,1 j./kg m.c./godzinę ROZPOCZĘTY DOPIERO PO 1–2 GODZINACH od rozpoczęcia płynoterapii dożylnej (ZAKAZ bolusów insuliny i.v.!); wczesna suplementacja potasu (20–40 mmol KCl na litr płynów infuzyjnych) od momentu potwierdzenia diurezy i stężenia K <5,5 mmol/l; dołączenie 5% glukozy do wlewów, gdy glikemia spadnie <250 mg/dl (14 mmol/l) w celu bezpiecznej kontynuacji insuliny aż do ustąpienia kwasicy (HCO3 >15).",
      "Diagnostyka: Monitorowanie stanu neurologicznego w skali GCS pod kątem obrzęku mózgu (najgroźniejsze powikłanie DKA u dzieci: ból głowy, spowolnienie, wymioty, bradykardia, zaburzenia oddychania, spadek GCS). Terapia: W razie podejrzenia obrzęku mózgu: natychmiastowe podanie mannitolu 20% w dawce 0,5–1,0 g/kg m.c. i.v. w ciągu 20 minut LUB 3% roztworu NaCl 3–5 ml/kg m.c. w ciągu 10–15 minut; uniesienie wezgłowia łóżka o 30 stopni, redukcja prędkości wlewu płynów o 1/3."
    ],
    q9: {
      question: "Wskaż zdanie FAŁSZYWE dotyczące postępowania w cukrzycowej kwasicy ketonowej (DKA) u dzieci wg wytycznych ISPAD i PTD:",
      options: [
        "Do kryteriów rozpoznania DKA należą: glikemia >11 mmol/l (>200 mg/dl), kwasica metaboliczna (pH krwi żylnej <7,30 lub HCO3 <15 mmol/l) oraz ketonemia (beta-hydroksymaślan we krwi ≥3,0 mmol/l) lub ketonuria.",
        "Podawanie insuliny należy rozpocząć od dożylnego bolusu w dawce 0,1 j./kg m.c., a następnie kontynuować wlew z prędkością 0,2 j./kg/h.",
        "Ciągły wlew dożylny insuliny w dawce 0,05–0,1 j./kg/h włącza się dopiero po upływie 1-2 godzin od rozpoczęcia płynoterapii dożylnej.",
        "Wyrównywanie obliczonego deficytu płynów u dziecka z DKA powinno być prowadzone powoli i ostrożnie przez okres co najmniej 48 godzin.",
        "Rutynowe stosowanie wodorowęglanu sodu (NaHCO3) w leczeniu kwasicy ketonowej u dzieci jest przeciwwskazane ze względu na ryzyko paradoksalnej kwasicy wewnątrzkomórkowej OUN i hipokaliemii."
      ],
      correct: 1,
      explanation: "Zdanie B jest FAŁSZYWE. Zgodnie z międzynarodowymi wytycznymi ISPAD i Polskiego Towarzystwa Diabetologicznego (PTD), w leczeniu kwasicy ketonowej u dzieci STOSOWANIE BOLUSÓW INSULINY JEST BEZWZGLĘDNIE ZAKAZANE! Bolus insuliny drastycznie zwiększa ryzyko rozwoju śmiertelnego obrzęku mózgu oraz gwałtownej hipokaliemii. Insulinę podaje się wyłącznie w ciągłym wlewie i.v. w dawce 0,05-0,1 j./kg/h, rozpoczętym dopiero po 1-2 godzinach wstępnego nawadniania krystaloidami."
    },
    q10: {
      question: "Do objawów zagrażającego obrzęku mózgu w trakcie leczenia kwasicy ketonowej u dziecka należą:\n1. Narastający ból głowy oraz nawrót nudności i wymiotów po początkowej poprawie\n2. Spowolnienie psychoruchowe, nadmierna senność i spadek punktacji w skali śpiączki Glasgow (GCS)\n3. Zwolnienie częstości akcji serca (bradykardia) i wzrost ciśnienia tętniczego (reakcja Cushinga)\n4. Asymetria źrenic lub brak reakcji na światło oraz obrzęk tarcz nerwów wzrokowych\n5. Gwałtowny powrót pełnej świadomości i ustąpienie oddechu Kussmaula\nPrawidłowa odpowiedź to:",
      options: [
        "1, 2, 3, 4",
        "1, 2, 5",
        "2, 3, 5",
        "1, 3, 5",
        "Wszystkie wymienione"
      ],
      correct: 0,
      explanation: "Prawidłowa odpowiedź to 1, 2, 3, 4. Narastający ból głowy, wymioty, spadek GCS, bradykardia, nadciśnienie i asymetria źrenic to klasyczne objawy wzmożonego ciśnienia śródczaszkowego i obrzęku mózgu. Wymagają one natychmiastowego podania 20% mannitolu lub 3% NaCl jeszcze przed wykonaniem tomografii komputerowej."
    },
    q11: {
      question: "U 8-letniego dziecka z nowo rozpoznaną cukrzycą typu 1 po ustąpieniu kwasicy ketonowej (DKA), lekarz diabetolog przygotowujący pacjenta i rodzinę do wypisu ze szpitala, w ramach procedur prawno-orzeczniczych:",
      options: [
        "Wystawia zaświadczenie lekarskie niezbędne do wniosku o wydanie orzeczenia o niepełnosprawności dziecka (z zaznaczeniem konieczności stałej opieki rodzica – pkt 7 i 8 orzeczenia uprawniających do świadczenia pielęgnacyjnego), wystawia zlecenia na refundowany osprzęt do ciągłego monitorowania glikemii (CGM-RT/FGM) i pompę insulinową oraz przygotowuje plan opieki diabetologicznej dla szkoły/placówki oświatowej.",
        "Wystawia zakaz powrotu dziecka do szkoły powszechnej i nakazuje wyłącznie nauczanie domowe.",
        "Zobowiązuje rodziców do natychmiastowej rezygnacji ze wszystkich form ubezpieczenia zdrowotnego.",
        "Ma prawny zakaz zlecania systemów ciągłego monitorowania glikemii (CGM) dzieciom poniżej 18. roku życia.",
        "Przekazuje dokumentację do prokuratury w celu ukarania rodziców za ujawnienie się cukrzycy."
      ],
      correct: 0,
      explanation: "Opieka nad dzieckiem z nowo rozpoznaną cukrzycą typu 1 obejmuje pełne wsparcie orzecznicze: wystawienie dokumentacji do Miejskiego Zespołu ds. Orzekania o Niepełnosprawności (wskazanie punktu 7 i 8 konieczności stałej opieki umożliwia rodzicowi pobieranie świadczenia pielęgnacyjnego), zlecenie nowoczesnych refundowanych technologii cukrzycowych (CGM-RT, sensory, wkłucia) oraz przygotowanie informacji i zaleceń dla szkoły regulujących bezpieczne funkcjonowanie dziecka w placówce oświatowej."
    }
  }
};

async function processBatch() {
  console.log('=== RUNNING UPGRADES FOR CASES 111 TO 120 ===');
  const files = fs.readdirSync('cases').sort((a, b) => {
    return parseInt(a.split('_')[0], 10) - parseInt(b.split('_')[0], 10);
  });

  for (const f of files) {
    if (!f.endsWith('.json') || f === 'auth.json' || f === 'index.json') continue;
    const id = parseInt(f.split('_')[0], 10);
    if (isNaN(id) || id < 111 || id > 120) continue;

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
    const upgrade = UPGRADES_111_120[id];
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
  console.log('Batch 111 to 120 processed successfully!');
}

processBatch().catch(err => {
  console.error('Błąd:', err);
  process.exit(1);
});

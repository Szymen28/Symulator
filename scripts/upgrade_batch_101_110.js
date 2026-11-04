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

const UPGRADES_101_110 = {
  101: {
    pathoTargets: [
      "Diagnostyka: Przeciwciała przeciwko transglutaminazie tkankowej w klasie IgA (anty-tTG IgA) wraz z całkowitym stężeniem IgA w surowicy; przeciwciała przeciwko endomysium mięśni gładkich (EMA-IgA); u pacjentów z niedoborem IgA – przeciwciała w klasie IgG (anty-DGP IgG lub anty-tTG IgG). Terapia: Ścisła, trwająca całe życie dieta bezglutenowa (GFD) z eliminacją pszenicy, żyta i jęczmienia (próg zawartości glutenu w produktach certyfikowanych <20 ppm – symbol Przekreślonego Kłosa).",
      "Diagnostyka: Diagnostyka genetyczna HLA-DQ2/DQ8 (wysoka ujemna wartość predykcyjna – brak tych alleli praktycznie wyklucza celiakię). Terapia: Weryfikacja bezbiopsyjnego protokołu ESPGHAN u dzieci: stężenie anty-tTG IgA ≥10x górna granica normy potwierdzone dodatnim wynikiem EMA-IgA z drugiego niezależnego pobrania krwi zwalnia z konieczności biopsji jelita cienkiego.",
      "Diagnostyka: Gastroduodenoskopia z pobraniem co najmniej 4 bioptatów z części zstępującej dwunastnicy i minimum 1 z opuszki (ocena zaniku kosmków wg klasyfikacji Marsha-Oberhubera: typ 3a-3c). Terapia: Regeneracja kosmków jelitowych następuje po 6–12 miesiącach ścisłej diety bezglutenowej; monitorowanie normalizacji miana przeciwciał anty-tTG IgA po 6 i 12 miesiącach od wdrożenia diety.",
      "Diagnostyka: Badania laboratoryjne oceniające zespół złego wchłaniania: ferrytyna, żelazo, morfologia (anemia mikrocytarna oporna na suplementację doustną), wapń, witamina D3, enzymy wątrobowe AST/ALT, gęstość mineralna kości (DXA). Terapia: Substytucja niedoborów: preparaty żelaza (żelazo elementarne 3–6 mg/kg m.c./dobę p.o. przez 3 miesiące po normalizacji Hb), cholekalcyferol (witamina D3 1000–2000 IU/dobę), suplementacja wapnia."
    ],
    q9: {
      question: "Wskaż zdanie FAŁSZYWE dotyczące celiakii (choroby trzewnej) u dzieci wg aktualnych wytycznych ESPGHAN:",
      options: [
        "Celiakia jest ogólnoustrojową chorobą o podłożu immunologicznym, wywołaną spożyciem glutenu u osób z predyspozycją genetyczną (obecność antygenów HLA-DQ2 lub HLA-DQ8).",
        "Wstępnym testem serologicznym z wyboru jest oznaczenie miana przeciwciał przeciw transglutaminazie tkankowej w klasie IgA (anty-tTG IgA) łącznie z całkowitym stężeniem IgA w surowicy.",
        "Zgodnie z wytycznymi ESPGHAN, jeśli stężenie anty-tTG IgA wynosi ≥10-krotność górnej granicy normy, rozpoznanie celiakii można postawić bez wykonywania biopsji dwunastnicy, pod warunkiem potwierdzenia obecności przeciwciał EMA-IgA w drugiej, oddzielnie pobranej próbce krwi.",
        "W przypadku całkowitego selektywnego niedoboru IgA należy jako badanie I rzutu oznaczyć przeciwciała w klasie IgG (anty-DGP IgG lub anty-tTG IgG).",
        "Przed wykonaniem badań serologicznych i biopsji dwunastnicy zaleca się zastosowanie 4-tygodniowej próbnej diety bezglutenowej w celu sprawdzenia poprawy klinicznej."
      ],
      correct: 4,
      explanation: "Zdanie E jest FAŁSZYWE. Bezwzględnym warunkiem wiarygodności diagnostyki celiakii (zarówno badań serologicznych anty-tTG/EMA, jak i biopsji dwunastnicy) jest spożywanie przez pacjenta normalnej diety zawierającej gluten. Wdrożenie diety bezglutenowej przed pobraniem badań prowadzi do szybkiego spadku miana przeciwciał i regeneracji kosmków, co uniemożliwia postawienie pewnego rozpoznania i stanowi kardynalny błąd diagnostyczny!"
    },
    q10: {
      question: "Do pozajelitowych manifestacji klinicznych celiakii oraz chorób współistniejących o podłożu autoimmunologicznym należą:\n1. Oporna na leczenie doustne niedokrwistość z niedoboru żelaza (anemia mikrocytarna)\n2. Niedobór wzrostu, opóźnienie dojrzewania płciowego i osteopenia/osteoporoza\n3. Opryszczkowate zapalenie skóry (Dermatitis herpetiformis / choroba Duhringa)\n4. Cukrzyca typu 1 oraz autoimmunologiczne zapalenie tarczycy (choroba Hashimoto)\n5. Zawsze występująca ostra niewydolność oddechowa z płynem w jamie opłucnej\nPrawidłowa odpowiedź to:",
      options: [
        "1, 2, 3, 4",
        "1, 3, 5",
        "2, 4, 5",
        "1, 2, 5",
        "Wszystkie wymienione"
      ],
      correct: 0,
      explanation: "Prawidłowa odpowiedź to 1, 2, 3, 4. Celiakia objawia się anemią, niskorosłością, chorobą Duhringa oraz współistnieje z innymi chorobami autoimmunologicznymi (cukrzyca typu 1, Hashimoto, zespół Downa, Turnera). Ostra niewydolność oddechowa (cecha 5) nie ma związku z celiakią."
    },
    q11: {
      question: "U 4-letniego dziecka z celiakią potwierdzoną wg kryteriów ESPGHAN (anty-tTG IgA >10x GGN, EMA-IgA dodatnie), lekarz pediatra w ramach opieki i procedur orzeczniczych:",
      options: [
        "Wystawia zaświadczenie lekarskie potwierdzające rozpoznanie choroby trzewnej i konieczność bezwzględnego stosowania ścisłej diety bezglutenowej w placówce przedszkolnej, zaleca edukację dietetyczną (Polskie Stowarzyszenie Osób z Celiakią) oraz wystawia dokumentację do Miejskiego Zespołu ds. Orzekania o Niepełnosprawności w razie ciężkiego zespołu złego wchłaniania z zaburzeniami rozwoju.",
        "Kieruje dziecko na przymusową hospitalizację do sanatorium uzdrowiskowego na okres 2 lat.",
        "Informuje rodziców, że po ukończeniu 7. roku życia dieta bezglutenowa może zostać bezpiecznie zastąpiona normalnym pieczywem pszennym.",
        "Zgłasza przypadek celiakii do Sanepidu na formularzu ZLK-1 jako zakaźną enteropatię.",
        "Odmawia wystawienia jakichkolwiek zaświadczeń dla przedszkola, uznając dietę za fanaberię rodziców."
      ],
      correct: 0,
      explanation: "Dieta bezglutenowa w celiakii trwa całe życie – gluten nigdy nie przestaje być toksyczny dla śluzówki. Obowiązkiem lekarza jest wystawienie zaświadczenia do placówki przedszkolnej/szkolnej nakazującego eliminację glutenu oraz skierowanie rodziny do stowarzyszeń wsparcia. W przypadkach z zaburzeniami wzrastania i ciężkim niedożywieniem dziecko może uzyskać orzeczenie o niepełnosprawności."
    }
  },
  102: {
    pathoTargets: [
      "Diagnostyka: Wywiad żywieniowy (związek objawów ze spożyciem mleka modyfikowanego lub diety matki karmiącej piersią), testy punktowe SPT ze standaryzowanymi alergenami mleka (kazeina, alfa-laktoalbumina, beta-laktoglobulina) oraz swoiste IgE (sIgE) w surowicy krwi – identyfikacja postaci IgE-zależnej vs IgE-niezależnej. Terapia: Postępowanie I rzutu: eliminacja białek mleka krowiego (BMK); u niemowląt karmionych sztucznie: mieszanka o znacznym stopniu hydrolizy kazeiny lub serwatki (eHF – extensively hydrolysed formula) przez okres 2–4 tygodni.",
      "Diagnostyka: Doustna próba prowokacji pokarmowej (OFC – oral food challenge) pod ścisłym nadzorem lekarskim (złoty standard w diagnostyce ABMK i ocenie nabycia tolerancji). Terapia: W przypadku ciężkich reakcji anafilaktycznych w wywiadzie lub braku tolerancji eHF (utrzymywanie się objawów): mieszanka elementarna zawierająca syntetyczne wolne aminokwasy (AAF – amino acid formula); u pacjentów z reakcjami anafilaktycznymi zabezpieczenie w autowstrzykiwacz z adrenaliną.",
      "Diagnostyka: Badanie kału (obecność krwi utajonej, podwyższone stężenie kalprotektyny w stolcu, eozynofile w rozmazie śluzu stolca – typowe dla alergicznego zapalenia jelita grubego i prostnicy FPIAP). Terapia: U matek karmiących piersią: ścisła dieta bezmleczna z eliminacją wszelkich produktów z mleka krowiego i suplementacją wapnia (1000 mg/d) i witaminy D3; w niedokrwistości z niedoboru żelaza w wyniku utraty krwi ze stolcem: preparaty żelaza p.o. (2–3 mg Fe/kg/d).",
      "Diagnostyka: Ocena tolerancji termicznej ('drabina mleczna' – milk ladder: produkty z mlekiem poddanym intensywnej obróbce termicznej/pieczeniu w macierzy mącznej). Terapia: Ponowna ocena tolerancji po 6–12 miesiącach diety eliminacyjnej lub po ukończeniu 1. roku życia w kontrolowanych warunkach; u większości dzieci (80–90%) tolerancja na BMK rozwija się samoistnie do ukończenia 3.–5. roku życia."
    ],
    q9: {
      question: "Wskaż zdanie FAŁSZYWE dotyczące alergii na białka mleka krowiego (ABMK / CMPA) u niemowląt:",
      options: [
        "Alergia na białka mleka krowiego może przebiegać w mechanizmie IgE-zależnym (reakcje natychmiastowe: pokrzywka, obrzęk naczynioruchowy, anafilaksja) lub IgE-niezależnym (reakcje opóźnione: zapalenie prostnicy FPIAP, wymioty FPIES, atopowe zapalenie skóry).",
        "W leczeniu żywieniowym I rzutu niemowlęcia karmionego sztucznie z łagodną lub umiarkowaną postacią ABMK zaleca się preparaty sojowe od pierwszych dni życia.",
        "Mieszankami z wyboru w leczeniu dietetycznym niemowląt z ABMK są preparaty o wysokim stopniu hydrolizy białka (eHF – kazeinowe lub serwatkowe).",
        "Mieszanki elementarne zawierające wolne aminokwasy (AAF) są wskazane w ciężkiej anafilaksji, zespole FPIES ze wstrząsem oraz przy braku poprawy po zastosowaniu mieszanki eHF.",
        "U większości dzieci z ABMK dochodzi do samoistnego nabycia tolerancji immunologicznej na białka mleka krowiego w ciągu pierwszych 3-5 lat życia."
      ],
      correct: 1,
      explanation: "Zdanie B jest FAŁSZYWE. Zgodnie z wytycznymi ESPGHAN, preparaty sojowe NIE są zalecane u niemowląt poniżej 6. miesiąca życia ze względu na zawartość fitoestrogenów (izoflawonów) oraz wysoki odsetek współistniejącej alergii krzyżowej na soję (do 10-15% u dzieci z ABMK). Leczeniem żywieniowym I rzutu są hydrolizaty o znacznym stopniu hydrolizy (eHF)."
    },
    q10: {
      question: "Do wskazań do zastosowania mieszanki elementarnej opartej na wolnych aminokwasach (AAF) u niemowlęcia z ABMK należą:\n1. Brak poprawy klinicznej po 2-4 tygodniach stosowania mieszanki o wysokim stopniu hydrolizy (eHF)\n2. Przebyty wstrząs anafilaktyczny po spożyciu białek mleka krowiego zagrażający życiu\n3. Ciężka enteropatia z hipoproteinemią, obrzękami i zahamowaniem przyrostu masy ciała\n4. Ciężka postać zespołu indukowanego białkami pokarmowymi zapalenia jelit (FPIES) ze wstrząsem hipowolemicznym\n5. Każda łagodna, przemijająca kolka niemowlęca u dziecka karmionego piersią\nPrawidłowa odpowiedź to:",
      options: [
        "1, 2, 3, 4",
        "1, 2, 5",
        "2, 3, 5",
        "1, 3, 5",
        "Wszystkie wymienione"
      ],
      correct: 0,
      explanation: "Prawidłowa odpowiedź to 1, 2, 3, 4. Mieszanki aminokwasowe (AAF) są preparatami II rzutu zarezerwowanymi dla ciężkich postaci alergii (anafilaksja, ciężkie FPIES, zahamowanie rozwoju) lub przy nieskuteczności eHF. Zwykła łagodna kolka niemowlęca (cecha 5) nie stanowi wskazania do drogich mieszanek elementarnych."
    },
    q11: {
      question: "Zgodnie z polskimi przepisami refundacyjnymi (ustawa o refundacji leków, środków spożywczych specjalnego przeznaczenia żywieniowego) oraz zasadami ordynacji lekarskiej:",
      options: [
        "Lekarz ma prawo wystawić receptę na refundowane mieszanki o wysokim stopniu hydrolizy (eHF) lub mieszanki aminokwasowe (AAF) pod warunkiem udokumentowania w historii choroby objawów klinicznych i wskazań do diety eliminacyjnej w przebiegu udokumentowanej alergii na białka mleka krowiego.",
        "Mieszanki eHF są dostępne wyłącznie na receptę weterynaryjną i nie podlegają żadnej refundacji w Polsce.",
        "Wystawienie recepty na preparat mlekozastępczy eHF ze zniżką wymaga każdorazowej zgody wojewódzkiego konsultanta ds. gastroenterologii.",
        "Refundacja mieszanek mlekozastępczych przysługuje wyłącznie dzieciom powyżej 18. roku życia.",
        "Lekarz POZ nie ma prawa ordynować preparatów mlekozastępczych i musi bezwzględnie odsyłać każdego pacjenta do kliniki uniwersyteckiej."
      ],
      correct: 0,
      explanation: "Zgodnie z obwieszczeniem refundacyjnym MZ, preparaty eHF i AAF podlegają refundacji w ściśle określonych wskazaniach (alergia na białka mleka krowiego, zespół złego wchłaniania). Obowiązkiem lekarza ordynującego jest rzetelne udokumentowanie w dokumentacji medycznej pacjenta przesłanek klinicznych uzasadniających rozpoznanie i poziom odpłatności."
    }
  },
  103: {
    pathoTargets: [
      "Diagnostyka: Badanie podmiotowe i przedmiotowe – ocena miejscowych objawów otrzewnowych w prawym dole biodrowym (objaw Blumberga, Jaworskiego, Rovsinga), ocena w skali PAS (Pediatric Appendicitis Score) lub skali Alvarado; morfologia z rozmazem (leukocytoza z neutrofilią) i stężenie CRP. Terapia: Przygotowanie przedoperacyjne: wstrzymanie pojenia i karmienia (dieta zerowa NPO), zabezpieczenie dostępu naczyniowego, nawodnienie dożylne krystaloidami (10–20 ml/kg m.c.), skuteczne leczenie przeciwbólowe (paracetamol i.v. 15 mg/kg m.c. co 6 h).",
      "Diagnostyka: Ultrasonografia (USG) jamy brzusznej – badanie obrazowe I rzutu u dzieci (niepodatny na ucisk ślepo zakończony wyrostek o średnicy zewnętrznej >6 mm, pogrubienie ściany >2 mm, obecność kamienia kałowego/koprolitu, obrzęk tkanki tłuszczowej okołowyrostkowej). Terapia: Wczesna okołooperacyjna profilaktyka antybiotykowa podana dożylnie na 30–60 minut przed nacięciem skóry: cefuroksym 50 mg/kg m.c. i.v. + metronidazol 10 mg/kg m.c. i.v. (lub ampicylina z sulbaktamem).",
      "Diagnostyka: Śródoperacyjna ocena stopnia zaawansowania (postać prosta niepowikłana: zapalenie nieżytowe/ropowicze vs postać powikłana: zapalenie zgorzelinowe, perforacja, naciek okołowyrostkowy lub ropień). Terapia: Pilna apendektomia laparoskopowa (złoty standard u dzieci zapewniający mniejszy ból, mniejsze ryzyko zakażenia rany i szybszy powrót do aktywności szkolnej).",
      "Diagnostyka: Posiew wysięku z jamy otrzewnej, monitorowanie kliniczne pod kątem ropnia wewnątrzbrzusznego lub niedrożności zrostowej w okresie pooperacyjnym. Terapia: W przypadku wyrostka przedziurawionego z rozlanym zapaleniem otrzewnej: płukanie i odessanie jamy otrzewnej, przedłużenie celowanej antybiotykoterapii dożylnej (np. ceftriakson + metronidazol) przez 3–5 dni po operacji do czasu normalizacji temperatury i markerów zapalnych."
    ],
    q9: {
      question: "Wskaż zdanie FAŁSZYWE dotyczące ostrego zapalenia wyrostka robaczkowego u dzieci:",
      options: [
        "U małych dzieci poniżej 3.-4. roku życia perforacja wyrostka robaczkowego występuje znacznie częściej i szybciej niż u dorosłych z powodu słabo rozwiniętej sieci większej i cienkiej ściany narządu.",
        "Podstawowym i zalecanym badaniem obrazowym pierwszego rzutu u dzieci z podejrzeniem zapalenia wyrostka jest ultrasonografia (USG) jamy brzusznej.",
        "Prawidłowa średnica zewnętrzna wyrostka robaczkowego w badaniu USG wynosi poniżej 6 mm.",
        "Podanie leków przeciwbólowych (np. paracetamolu) przed zbadaniem dziecka przez chirurga jest bezwzględnie zakazane, gdyż całkowicie zamazuje obraz kliniczny i uniemożliwia trafną diagnozę.",
        "Laparoskopowa apendektomia jest obecnie preferowaną metodą operacyjną u dzieci."
      ],
      correct: 3,
      explanation: "Zdanie D jest FAŁSZYWE. Współczesne wytyczne chirurgii dziecięcej i medycyny ratunkowej jednoznacznie odrzucają archaiczny pogląd o zakazie analgezji. Zastosowanie odpowiedniego leczenia przeciwbólowego (np. paracetamolu lub opioidów w razie silnego bólu) NIE zamazuje objawów otrzewnowych, a ułatwia badanie fizykalne małego dziecka poprzez zmniejszenie lęku i rozluźnienie obrony powłok."
    },
    q10: {
      question: "Do składowych pediatrycznej skali zapalenia wyrostka robaczkowego (Pediatric Appendicitis Score – PAS) należą:\n1. Ból brzucha nasilający się przy kaszlu, skakaniu lub opukiwaniu\n2. Przemieszczanie się bólu do prawego dołu biodrowego\n3. Gorączka ≥38,0 °C oraz nudności lub wymioty\n4. Leukocytoza >10 000/µl z przewagą neutrofilów (przesunięcie w lewo >75%)\n5. Wyłącznie stwierdzenie obecności krwiomoczu w badaniu ogólnym moczu\nPrawidłowa odpowiedź to:",
      options: [
        "1, 2, 3, 4",
        "1, 2, 5",
        "2, 3, 5",
        "1, 3, 5",
        "Wszystkie wymienione"
      ],
      correct: 0,
      explanation: "Prawidłowa odpowiedź to 1, 2, 3, 4. Skala PAS ocenia objawy podmiotowe (nudności, ból przy kaszlu, migracja bólu), przedmiotowe (tkliwość w prawym dole biodrowym, gorączka) oraz laboratoryjne (leukocytoza, neutrofilia). Krwiomocz (cecha 5) nie wchodzi w skład skali PAS."
    },
    q11: {
      question: "9-letnie dziecko z ostrym zapaleniem wyrostka robaczkowego wymaga pilnej operacji w trybie ostrym. Przy dziecku obecna jest matka, natomiast ojciec przebywa za granicą. Zgodnie z art. 34 Ustawy o zawodach lekarza i lekarza dentysty:",
      options: [
        "Pisemną zgodę na zabieg operacyjny o podwyższonym ryzyku u pacjenta małoletniego może skutecznie podpisać jeden z rodziców wykonujący władzę rodzicielską (w tym przypadku matka), o ile między rodzicami nie ma udokumentowanego sporu.",
        "Wykonanie operacji u dziecka wymaga bezwzględnie jednoczesnego podpisu obojga rodziców w obecności notariusza.",
        "Dziecko w wieku 9 lat ma prawny obowiązek złożyć równoległy pisemny podpis na formularzu zgody pod rygorem nieważności.",
        "W trybie ostrym nie jest wymagana żadna zgoda i lekarz nie informuje rodziców o operacji.",
        "Operację może podpisać nauczyciel szkolny zamiast rodziców."
      ],
      correct: 0,
      explanation: "Zgodnie z Kodeksem rodzinnym i opiekuńczym oraz ustawą o zawodach lekarza, każdy z rodziców wykonujących władzę rodzicielską jest uprawniony i zobowiązany do podejmowania decyzji dotyczących dziecka. W sprawach zwykłych oraz nagłych wystarczająca jest zgoda jednego rodzica. Podwójna zgoda (rodzica i pacjenta) jest wymagana prawnie dopiero po ukończeniu przez dziecko 16. roku życia."
    }
  },
  104: {
    pathoTargets: [
      "Diagnostyka: Prawidłowe pobranie moczu do badania ogólnego i na posiew (u niemowląt: nakłucie nadłonowe – złoty standard; cewnikowanie pęcherza – próba czysta; mocz ze środkowego strumienia 'clean-catch'; pobieranie z woreczka przyklejanego obarczone jest 80% fałszywych wyników dodatnich i NIE nadaje się do posiewu!). Terapia: Natychmiastowa empiryczna antybiotykoterapia dożylna u gorączkującego niemowlęcia: ceftriakson 50–75 mg/kg m.c./dobę i.v. (lub cefotaksym 100–150 mg/kg/d w 3 dawkach; u noworodków ampicylina z gentamycyną) przez pierwsze 2–4 dni, a po ustąpieniu gorączki przejście na antybiotyk doustny wg antybiogramu (łącznie 10–14 dni).",
      "Diagnostyka: Badanie ogólne moczu (leukocyturia >5–10 wpw, obecność wałeczków leukocytowych świadczących o OZZN, dodatni test na esterazę leukocytową i azotyny), markery zapalne (leukocytoza z neutrofilią, wysokie CRP >30–50 mg/l, prokalcytonina w OZZN). Terapia: Płynoterapia i kontrola gorączki: paracetamol 15 mg/kg m.c. co 6 h, zapewnienie obfitej diurezy.",
      "Diagnostyka: Ultrasonografia (USG) nerek i dróg moczowych – obowiązkowe badanie obrazowe po PIERWSZYM epizodzie gorączkowego ZUM u każdego niemowlęcia (ocena wielkości i symetrii nerek, poszerzenia UKM, anomalii anatomicznych, zdwojenia, wodonercza). Terapia: W przypadku wykrycia wodonercza lub poszerzenia moczowodu: czasowa profilaktyka przeciwbakteryjna małą dawką antybiotyku na noc do czasu diagnostyki specjalistycznej (np. cefadroksyl lub amoksycylina u noworodków, kotrimoksazol lub furagina po ukończeniu 3. m.ż.).",
      "Diagnostyka: Wskazania do badań inwazyjnych: cystouretrografia mikcyjna (CUM / MCU) przy nieprawidłowym obrazie USG nerek lub nawrotowym gorączkowym ZUM (poszukiwanie odpływu pęcherzowo-moczowodowego VUR lub zastawki cewki tylnej PUV u chłopców); scyntygrafia nerek 99mTc-DMSA po 4–6 miesiącach (złoty standard w wykrywaniu trwałych blizn korowych). Terapia: Długoterminowa opieka nefrologiczna: zapobieganie zaparciom, higiena krocza, monitorowanie ciśnienia tętniczego i białkomoczu w celu zapobiegania nefropatii refluksowej."
    ],
    q9: {
      question: "Wskaż zdanie FAŁSZYWE dotyczące zakażeń układu moczowego (ZUM) u niemowląt wg wytycznych PTNFD i AAP:",
      options: [
        "U gorączkujących niemowląt ZUM często manifestuje się objawami niespecyficznymi, takimi jak: przedłużająca się żółtaczka, wymioty, brak łaknienia, apatia i słaby przyrost masy ciała.",
        "Mocz pobrany do woreczka przyklejanego do krocza jest doskonałym, rekomendowanym materiałem do wykonania ilościowego posiewu moczu.",
        "Badanie ultrasonograficzne (USG) nerek i pęcherza moczowego jest bezwzględnie wskazane po pierwszym w życiu epizodzie gorączkowego ZUM u każdego dziecka do 2. roku życia.",
        "Złotym standardem pobrania moczu u niemowlęcia niemogącego oddać moczu ze środkowego strumienia jest nakłucie nadłonowe pęcherza moczowego lub jednorazowe cewnikowanie.",
        "Najczęstszym czynnikiem etiologicznym ZUM u dzieci jest uropatogenna Escherichia coli (odpowiadająca za 80-90% zakażeń)."
      ],
      correct: 1,
      explanation: "Zdanie B jest FAŁSZYWE. Pobranie moczu do przyklejanego woreczka wiąże się ze skrajnie wysokim odsetkiem zanieczyszczeń florą ze skóry krocza i stolca (nawet >80% wyników fałszywie dodatnich). Ujemny wynik posiewu z woreczka pozwala wykluczyć ZUM, ale DODATNI wynik nigdy nie może być podstawą rozpoznania OZZN! Do posiewu mocz należy pobrać ze środkowego strumienia ('clean-catch'), przez cewnikowanie lub nakłucie nadłonowe."
    },
    q10: {
      question: "Do wskazań do wykonania cystouretrografii mikcyjnej (CUM) po przebytym gorączkowym ZUM u małego dziecka należą:\n1. Stwierdzenie w badaniu USG nerek cech wodonercza, poszerzenia moczowodu lub blizn korowych\n2. Nawrót gorączkowego zakażenia układu moczowego (drugi i kolejny epizod OZZN)\n3. Zakażenie bakterią inną niż typowa Escherichia coli (np. Proteus, Pseudomonas, Klebsiella)\n4. Skąpomocz lub podwyższenie stężenia kreatyniny w surowicy w trakcie infekcji\n5. Jednorazowy epizod bezgorączkowego zapalenia pęcherza u nastolatki\nPrawidłowa odpowiedź to:",
      options: [
        "1, 2, 3, 4",
        "1, 2, 5",
        "2, 3, 5",
        "1, 3, 5",
        "Wszystkie wymienione"
      ],
      correct: 0,
      explanation: "Prawidłowa odpowiedź to 1, 2, 3, 4. CUM jest badaniem inwazyjnym (cewnikowanie, promieniowanie jonizujące), dlatego wykonuje się je przy podejrzeniu wad anatomicznych w USG, zakażeniach nietypową florą, nawrotach OZZN lub niewydolności nerek. Izolowane zapalenie pęcherza u nastolatek (cecha 5) nie jest wskazaniem do CUM."
    },
    q11: {
      question: "Matka 5-miesięcznego niemowlęcia hospitalizowanego z powodu ostrego odmiedniczkowego zapalenia nerek (OZZN) jest osobą pracującą zawodowo i ubezpieczoną w ZUS. W ramach orzecznictwa lekarskiego:",
      options: [
        "Lekarz prowadzący ma obowiązek wystawić matce zaświadczenie o czasowej niezdolności do pracy z powodu konieczności sprawowania osobistej opieki nad chorym dzieckiem (ZUS ZLA) na pełen okres hospitalizacji oraz ewentualnej rekonwalescencji domowej (w ramach przysługującego limitu 60 dni zasiłku opiekuńczego w roku).",
        "Szpital ma prawny zakaz wystawiania druków ZUS ZLA matkom dzieci hospitalizowanych, uznając opiekę szpitalną za wystarczającą.",
        "Zasiłek opiekuńczy przysługuje rodzicowi wyłącznie po ukończeniu przez dziecko 1. roku życia.",
        "Lekarz może wystawić ZUS ZLA maksymalnie na 3 dni hospitalizacji.",
        "Wystawienie ZUS ZLA na opiekę nad dzieckiem wymaga zgody prezesa ZUS."
      ],
      correct: 0,
      explanation: "Zgodnie z ustawą o świadczeniach pieniężnych z ubezpieczenia społecznego w razie choroby i macierzyństwa, ubezpieczonemu rodzicowi przysługuje zasiłek opiekuńczy z powodu konieczności sprawowania osobistej opieki nad chorym dzieckiem w wieku do ukończenia 14 lat (do 60 dni w roku kalendarzowym), w tym również podczas pobytu dziecka w szpitalu."
    }
  },
  105: {
    pathoTargets: [
      "Diagnostyka: Badanie ogólne moczu i wskaźnik białko/kreatynina w moczu (UPCR >2,0 mg/mg lub białkomocz dobowy >50 mg/kg m.c./dobę / >40 mg/m²/h – selektywny białkomocz kłębuszkowy); badania krwi: głęboka hipoalbuminemia (<25 g/l), hiperlipidemia (znaczny wzrost cholesterolu i triglicerydów). Terapia: Steroidoterapia I rzutu (protokół KDIGO / Polskiego Towarzystwa Nefrologii Dziecięcej): prednizon doustnie 60 mg/m² m.c./dobę (maks. 60 mg/dobę) w pojedynczej dawce porannej przez 4–6 tygodni, następnie faza redukcji (40 mg/m² co drugi dzień przez kolejne 4–6 tygodni).",
      "Diagnostyka: Ocena nasilenia zespołu obrzękowego (obrzęki powiek rano, ciastowate obrzęki podudzi, wodobrzusze, płyn w opłucnej), codzienna kontrola masy ciała i ciśnienia tętniczego. Terapia: Restrykcja sodu w diecie (<1,5–2 g soli/dobę); w obrzękach zagrażających (duszność z powodu płynu w opłucnej, masywne obrzęki moszny): 20% albumina w powolnym wlewie i.v. (0,5–1 g/kg m.c. w 2–4 h) w skojarzeniu z furosemidem podanym pod koniec wlewu albumin (1–2 mg/kg m.c. i.v.).",
      "Diagnostyka: Koagulogram i parametry krzepnięcia (wysoki fibrynogen, spadek antytrombiny III uciekającej z moczem – wysokie ryzyko powikłań zatorowo-zakrzepowych: zakrzepica żył nerkowych, zakrzepica żył głębokich, zatorowość płucna). Terapia: Profilaktyka przeciwzakrzepowa: unikanie unieruchomienia w łóżku, odpowiednie nawodnienie, unikanie niepotrzebnych nakłuć żył głębokich; w skrajnej hipoalbuminemii (<15–20 g/l) z dodatkowymi czynnikami ryzyka: heparyna drobnocząsteczkowa (enoksaparyna 1 mg/kg s.c. 1 x dz.).",
      "Diagnostyka: Wskazania do biopsji nerki u dziecka z zespołem nerczycowym (wskazania wstępne: wiek <1. roku życia lub >12.–16. roku życia, krwiomocz makroskopowy, trwałe nadciśnienie tętnicze, hipokomplementemia niskie C3, niewydolność nerek; wskazania późne: steroidooporność po 4–6 tygodniach pełnej dawki prednizonu). Terapia: W zespole nerczycowym steroidoopornym (SRNS): leki immunosupresyjne II rzutu – inhibitory kalcyneuryny (cyklosporyna A lub takrolimus) po wykonaniu biopsji nerki wykazującej najczęściej FSGS (ogniskowe segmentowe stwardnienie kłębuszków)."
    ],
    q9: {
      question: "Wskaż zdanie FAŁSZYWE dotyczące zespołu nerczycowego o zmianach minimalnych (MCD) u dzieci:",
      options: [
        "Submikroskopowe kłębuszkowe zapalenie nerek (MCD) odpowiada za ponad 80-85% przypadków idiopatycznego zespołu nerczycowego u dzieci w wieku 1-10 lat.",
        "Klasyczna triada objawów laboratoryjnych obejmuje: masywny białkomocz selektywny, hipoalbuminemię oraz hipercholesterolemię / dyslipidemię.",
        "U każdego dziecka pomiędzy 1. a 10. rokiem życia z typowym idiopatycznym zespołem nerczycowym bezwzględnie konieczne jest wykonanie przezskórnej biopsji nerki PRZED włączeniem prednizonu.",
        "Standardowym leczeniem pierwszego rzutu jest doustna terapia prednizonem w dawce 60 mg/m² m.c./dobę (maks. 60 mg/d).",
        "Dzieci z aktywnym zespołem nerczycowym mają podwyższone ryzyko ciężkich zakażeń bakteryjnych (np. samoistnego bakteryjnego zapalenia otrzewnej) spowodowane utratą immunoglobulin IgG i opsonin z moczem."
      ],
      correct: 2,
      explanation: "Zdanie C jest FAŁSZYWE. U dzieci w typowym wieku zachorowania (1-10 lat) z klasycznym obrazem zespołu nerczycowego NIE wykonuje się wstępnej biopsji nerki, lecz wdraża empiryczną steroidoterapię (ponieważ >90% z nich odpowiada na prednizon, potwierdzając MCD). Wskazaniem do biopsji jest wiek <1. r.ż. lub >12 r.ż., cechy zespołu nefrytycznego (trwałe nadciśnienie, krwiomocz, obniżone C3, niewydolność nerek) lub brak odpowiedzi na 4-6 tygodni steroidoterapii (steroidooporność)."
    },
    q10: {
      question: "Do wskazań do wykonania biopsji nerki u dziecka z zespołem nerczycowym należą:\n1. Wiek w chwili zachorowania poniżej 1. roku życia (podejrzenie wrodzonego zespołu nerczycowego)\n2. Brak remisji po 4-6 tygodniach standardowej pełnodawkowej steroidoterapii (zespół steroidooporny)\n3. Uporczywy krwinkomocz, nadciśnienie tętnicze lub obniżenie stężenia składowej C3 dopełniacza\n4. Wiek powyżej 12.-16. roku życia w momencie pierwszego rzutu choroby\n5. Wiek 3 lata i pełne ustąpienie białkomoczu w 10. dobie leczenia prednizonem\nPrawidłowa odpowiedź to:",
      options: [
        "1, 2, 3, 4",
        "1, 2, 5",
        "2, 3, 5",
        "1, 3, 5",
        "Wszystkie wymienione"
      ],
      correct: 0,
      explanation: "Prawidłowa odpowiedź to 1, 2, 3, 4. Biopsja jest wskazana w nietypowym wieku (<1 r.ż., >12 r.ż.), przy steroidooporności lub cechach nefrytycznych. Pełna remisja w 10. dobie u 3-latka (cecha 5) to podręcznikowy zespół steroidowrażliwy (MCD), w którym biopsja jest absolutnie zbędna."
    },
    q11: {
      question: "U 4-letniego dziecka z zespołem nerczycowym leczonego prednizonem w dawce 60 mg/m²/dobę, zgodnie z Programem Szczepień Ochronnych (PSO) oraz wytycznymi Polskiego Towarzystwa Nefrologii Dziecięcej:",
      options: [
        "Szczepienia żywymi atenuowanymi szczepionkami (np. MMR, ospa wietrzna) są BEZWZGLĘDNIE PRZECIWWSKAZANE w trakcie wysokodawkowej steroidoterapii oraz przez okres minimum 1-3 miesięcy po jej zakończeniu ze względu na ryzyko uogólnionego poszczepiennego zakażenia; zaleca się natomiast coroczne szczepienie inaktywowaną szczepionką przeciwko grypie oraz szczepienie przeciwko pneumokokom.",
        "Dziecko w trakcie immunosupresji prednizonem powinno natychmiast otrzymać podwójną dawkę żywej szczepionki przeciwko odrze.",
        "Wszystkie szczepienia inaktywowane są dożywotnio zakazane u chorych na zespół nerczycowy.",
        "Lekarz POZ ma obowiązek całkowicie wykreślić dziecko z ewidencji szczepień.",
        "Steroidoterapia nie ma żadnego wpływu na układ odpornościowy dziecka i szczepienia żywe można kontynuować bez zmian."
      ],
      correct: 0,
      explanation: "Wysokie dawki glikokortykosteroidów (prednizon ≥2 mg/kg/d lub ≥20 mg/d przez >14 dni) wywołują głęboką immunosupresję. W tym okresie podanie żywych szczepionek (MMR, ospa wietrzna, BCG) grozi ciężkim zakażeniem poszczepiennym i jest bezwzględnie przeciwwskazane do czasu upływu minimum 1-3 miesięcy od zakończenia leczenia. Szczepienia inaktywowane (grypa, pneumokoki) są bezpieczne i wysoce zalecane."
    }
  },
  106: {
    pathoTargets: [
      "Diagnostyka: Badania laboratoryjne krwi i moczu potwierdzające klasyczną triadę objawów HUS: mikroangiopatyczna niedokrwistość hemolityczna (Hb <8 g/dl, obecność schizocytów / fragmentów erytrocytów w rozmazie krwi >1–2%, wysokie LDH, ujemny odczyn Coombsa), ciężka małopłytkowość (trombocytopenia PLT <50 000–100 000/µl) oraz ostre uszkodzenie nerek (AKI: gwałtowny wzrost kreatyniny i mocznika, oliguria/anuria). Terapia: Wczesna i agresywna płynoterapia dożylna krystaloidami (izotoniczne płyny zbilansowane) we wczesnej fazie biegunki STEC redukuje ryzyko trwałego uszkodzenia nerek.",
      "Diagnostyka: Badanie mikrobiologiczne i genetyczne stolca: posiew na podłożu MacConkeya z sorbitolem (SMAC – szczepy STEC O157:H7 są sorbitolo-ujemne) oraz badanie PCR na obecność genów toksyny Shiga (stx1, stx2). Terapia: BEZWZGLĘDNY ZAKAZ PODAWANIA ANTYBIOTYKÓW ORAZ LEKÓW PRZECIWPERYSTALTYCZNYCH (loperamidu)! Antybiotyki indukują odpowiedź SOS u bakterii, nasilają lizę komórek bakteryjnych i powodują masywny wyrzut toksyny Shiga, drastycznie zwiększając ryzyko rozwoju pełnoobjawowego HUS.",
      "Diagnostyka: Ocena różnicowa aTYPOWEGO zespołu hemolityczno-mocznicowego (aHUS): aktywność ADAMTS13 w osoczu (>10% wyklucza zakrzepową plamicę małopłytkową TTP), stężenie składowych C3 i C4 dopełniacza, badania mutacji genów regulatorów dopełniacza (CFH, CFI, MCP, C3). Terapia: W aHUS (niezwiązanym z infekcją STEC, o podłożu dysregulacji dopełniacza): przeciwciało monoklonalne anty-C5 ekulizumab (Eculizumab / Rawulizumab) lekiem z wyboru ratującym funkcję nerek.",
      "Diagnostyka: Monitorowanie diurezy godzinowej, parametrów retencji azotowej, jonogramu (zagrażająca hiperkaliemia K >6,5 mmol/l) i równowagi kwasowo-zasadowej. Terapia: Leczenie nerkozastępcze (RRT: dializa otrzewnowa lub hemodiafiltracja ciągła CVVHDF) przy bezmoczu, przewodnieniu opornym na diuretyki lub mocznicy; przetoczenia ubogoleukocytarnego KKCz przy ciężkiej anemii objawowej; przetoczenia płytek krwi (KKP) wyłącznie w przypadku czynnego krwawienia zagrażającego życiu lub przed zabiegami inwazyjnymi (przetoczenie KKP bez wskazań 'dolewa oliwy do ognia', nasilając mikrozakrzepicę!)."
    ],
    q9: {
      question: "Wskaż zdanie FAŁSZYWE dotyczące zespołu hemolityczno-mocznicowego wywołanego przez Shiga-toksynę (STEC-HUS):",
      options: [
        "Klasyczną triadę objawów HUS stanowią: nieimmunologiczna niedokrwistość hemolityczna mikroangiopatyczna (ze schizocytami), małopłytkowość ze zużycia oraz ostre uszkodzenie nerek (AKI).",
        "W fazie biegunki krwotocznej wywołanej przez STEC (E. coli O157:H7) natychmiastowe wdrożenie cyprofloksacyny lub kotrimoksazolu jest postępowaniem ratującym życie, które zapobiega HUS.",
        "Podawanie leków hamujących perystaltykę jelit (np. loperamidu) u dzieci z krwawą biegunką zwiększa ryzyko rozwoju zespołu hemolityczno-mocznicowego.",
        "Rutynowe przetaczanie koncentratu krwinek płytkowych (KKP) jest przeciwwskazane, chyba że występuje ciężkie, zagrażające życiu krwawienie.",
        "Złotym standardem w różnicowaniu HUS z zakrzepową plamicą małopłytkową (TTP) jest oznaczenie aktywności metaloproteinazy ADAMTS13 (w HUS aktywność jest prawidłowa >10%)."
      ],
      correct: 1,
      explanation: "Zdanie B jest FAŁSZYWE. Zastosowanie antybiotyków w zakażeniach pałeczkami STEC (np. E. coli O157:H7) indukuje bakteryjną odpowiedź SOS, stymuluje transkrypcję genów toksyny Shiga i przyspiesza lizę ściany komórkowej bakterii, uwalniając gigantyczne ilości toksyny do krążenia. Wieloośrodkowe badania wykazały, że antybiotykoterapia zwiększa ryzyko rozwoju HUS aż 2- do 17-krotnie i jest BEZWZGLĘDNIE PRZECIWWSKAZANA!"
    },
    q10: {
      question: "Do wskazań do wdrożenia ostrego leczenia nerkozastępczego (dializoterapii) u dziecka z ostrym uszkodzeniem nerek w przebiegu HUS należą:\n1. Bezmocz (anuria) lub ciężki skąpomocz (oliguria) nieodpowiadający na płynoterapię\n2. Objawowe przewodnienie oporne na leczenie diuretykami (obrzęk płuc, niekontrolowane nadciśnienie tętnicze)\n3. Oporna na leczenie zachowawcze hiperkaliemia (K >6,5 mmol/l) z cechami kardiotoksyczności w EKG\n4. Ciężka kwasica metaboliczna lub powikłania mocznicowe (encefalopatia, zapalenie osierdzia)\n5. Wyłącznie obecność prawidłowej diurezy ze śladowym białkomoczem\nPrawidłowa odpowiedź to:",
      options: [
        "1, 2, 3, 4",
        "1, 2, 5",
        "2, 3, 5",
        "1, 3, 5",
        "Wszystkie wymienione"
      ],
      correct: 0,
      explanation: "Prawidłowa odpowiedź to 1, 2, 3, 4. Klasycznymi wskazaniami do dializy (najczęściej dializy otrzewnowej u dzieci) są: bezmocz, obrzęk płuc/przewodnienie, hiperkaliemia oporna na farmakoterapię, zaawansowana mocznica i kwasica. Prawidłowa diureza (cecha 5) nie stanowi wskazania do dializy."
    },
    q11: {
      question: "Zgodnie z polską Ustawą o zapobieganiu oraz zwalczaniu zakażeń i chorób zakaźnych u ludzi, w przypadku rozpoznania zespołu hemolityczno-mocznicowego (HUS) lub zakażenia enterokrwotoczną E. coli (STEC):",
      options: [
        "Lekarz ma ustawowy obowiązek niezwłocznego zgłoszenia przypadku do właściwego państwowego powiatowego inspektora sanitarnego (Sanepidu) w ciągu 24 godzin od powzięcia podejrzenia lub rozpoznania na formularzu ZLK-1 w celu wszczęcia dochodzenia epidemiologicznego (identyfikacja skażonej żywności/wody).",
        "Zgłoszenie do Sanepidu jest fakultatywne i zależy wyłącznie od uznania kierownika kliniki.",
        "HUS podlega zgłoszeniu wyłącznie wtedy, gdy doszło do zgonu pacjenta.",
        "Sanepid nie zajmuje się zakażeniami STEC, a sprawę należy przekazać do Inspekcji Weterynaryjnej bez udziału lekarza.",
        "Zgłoszenie zakażenia zwalnia lekarza z obowiązku leczenia pacjenta w szpitalu."
      ],
      correct: 0,
      explanation: "Zakażenia pałeczkami STEC oraz zespół hemolityczno-mocznicowy HUS podlegają ustawowemu obowiązkowi zgłoszenia w ciągu 24 godzin do Państwowej Inspekcji Sanitarnej (druk ZLK-1). Jest to kluczowe ze względów epidemiologicznych w celu wykrycia źródła zakażenia (np. skażonego mięsa, mleka, warzyw czy wody) i zapobieżenia masowym epidemiom."
    }
  },
  107: {
    pathoTargets: [
      "Diagnostyka: Cystouretrografia mikcyjna (CUM / MCU) – złoty standard w klasyfikacji refluksu moczowodowego wg International Reflux Study Committee: stopnie I–V (stopień IV: znaczne poszerzenie moczowodu, zagięcia, poszerzenie miedniczki i kielichów z wygładzeniem sklepień; stopień V: masywny refluks z poskręcanym moczowodem i całkowitą utratą zarysu kielichów). Terapia: Przewlekła chemioprofilaktyka przeciwbakteryjna ZUM małą dawką antybiotyku na noc: kotrimoksazol 1–2 mg trimetoprimu/kg m.c. 1 x dz. na noc lub furazydyna 1–2 mg/kg 1 x dz. na noc (u niemowląt <3 m.ż. amoksycylina lub cefadroksyl) do czasu wdrożenia leczenia zabiegowego.",
      "Diagnostyka: Scyntygrafia statyczna nerek 99mTc-DMSA (złoty standard w ocenie uszkodzenia miąższu nerek – wykrywanie ubytków zakontraktowanego radiofarmaceutyku odpowiadających ogniskom bliznowacenia korowego oraz pomiar udziału czynnościowego nerek). Terapia: Leczenie endoskopowe (zabieg małoinwazyjny I wyboru w refluksie III–IV stopnia): podśluzówkowe ostrzyknięcie ujścia moczowodu kopolimerem dextranomeru i kwasu hialuronowego (preparat Deflux / zabieg STING/HIT).",
      "Diagnostyka: Badanie ultrasonograficzne (USG) układu moczowego – ocena stopnia wodonercza, grubości miąższu nerkowego, średnicy moczowodu oraz objętości zalegania moczu po mikcji (PVR – post-void residual). Terapia: W przypadku niepowodzenia leczenia endoskopowego, refluksu V stopnia lub postępującego bliznowacenia nerki: operacja otwarta lub laparoskopowa/robotowa – reimplantacja moczowodu do pęcherza z wytworzeniem mechanizmu antyrefluksowego (ureteroneocystostomia sposobem Cohena lub Politano-Leadbettera).",
      "Diagnostyka: Długofalowe monitorowanie nefrologiczne: systematyczne pomiary ciśnienia tętniczego, ocena stężenia kreatyniny i eGFR, okresowe badanie ogólne moczu z oceną białkomoczu (nefropatia refluksowa jest częstą przyczyną nadciśnienia nerkopochodnego i schyłkowej niewydolności nerek u młodych dorosłych). Terapia: Wczesne leczenie nadciśnienia tętniczego i białkomoczu nefroprotekcyjnymi inhibitorami konwertazy angiotensyny (ACE-I, np. enalapryl, ramipryl); leczenie współistniejących zaburzeń mikcji i zaparć stolca (zespół BBD – Bladder and Bowel Dysfunction)."
    ],
    q9: {
      question: "Wskaż zdanie FAŁSZYWE dotyczące odpływu pęcherzowo-moczowodowego (VUR) u dzieci:",
      options: [
        "VUR polega na wstecznym przepływie moczu z pęcherza moczowego do moczowodu i układu kielichowo-miedniczkowego w wyniku niewydolności anatomicznej mechanizmu zastawkowego połączenia moczowodowo-pęcherzowego.",
        "Złotym standardem w diagnostyce obrazowej i klasyfikacji stopnia zaawansowania VUR (stopnie I–V) jest cystouretrografia mikcyjna (CUM).",
        "W stopniu I i II refluks ma charakter wysokoobjętościowy z masywnym rozdęciem i poskręcaniem moczowodów oraz zniekształceniem kielichów nerkowych.",
        "Scyntygrafia nerek z użyciem kwasu dimerkaptobursztynowego (99mTc-DMSA) jest najczulszą metodą wykrywania ognisk bliznowacenia kory nerek w przebiegu nefropatii refluksowej.",
        "Współistnienie zaburzeń mikcji i zaparć stolca (zespół BBD – Bladder and Bowel Dysfunction) drastycznie zwiększa ryzyko nawrotów ZUM i pogarsza rokowanie w VUR."
      ],
      correct: 2,
      explanation: "Zdanie C jest FAŁSZYWE. Stopnie I i II to refluksy niskiego stopnia: w stopniu I mocz cofa się wyłącznie do moczowodu bez poszerzenia; w stopniu II mocz dociera do miedniczki i kielichów, ale bez ich poszerzenia. Masywne poszerzenie moczowodu, jego poskręcanie i zniekształcenie kielichów nerkowych definiuje stopnie IV i V (refluksy wysokiego stopnia)."
    },
    q10: {
      question: "Do metod leczenia odpływu pęcherzowo-moczowodowego wysokiego stopnia (III–V) lub powikłanego bliznowaceniem nerek należą:\n1. Przewlekła profilaktyka przeciwbakteryjna małą dawką antybiotyku na noc (np. kotrimoksazol, furagina)\n2. Endoskopowe ostrzyknięcie ujścia moczowodu substancją uszczelniającą (np. Deflux – kopolimer dextranomer/kwas hialuronowy metodą STING)\n3. Chirurgiczna reimplantacja moczowodu do pęcherza z wytworzeniem podśluzówkowego tunelu antyrefluksowego (np. operacja sposobem Cohena)\n4. Leczenie współistniejących zaburzeń czynności dolnych dróg moczowych i zaparć stolca\n5. Natychmiastowe obustronne wycięcie obu nerek bez wcześniejszych prób leczenia rekonstrukcyjnego\nPrawidłowa odpowiedź to:",
      options: [
        "1, 2, 3, 4",
        "1, 2, 5",
        "2, 3, 5",
        "1, 3, 5",
        "Wszystkie wymienione"
      ],
      correct: 0,
      explanation: "Prawidłowa odpowiedź to 1, 2, 3, 4. Standardowe metody terapii obejmują profilaktykę przeciwbakteryjną, zabiegi endoskopowe STING/HIT, operacje reimplantacji moczowodów (ureteroneocystostomia Cohena) oraz uroterapię BBD. Obustronna nefrektomia (cecha 5) to postępowanie absurdalne i niedopuszczalne."
    },
    q11: {
      question: "U 6-letniego dziecka z rozpoznanym odpływem pęcherzowo-moczowodowym IV stopnia i pęcherzem nadreaktywnym, lekarz urolog dziecięcy przygotowuje plan zaleceń dla szkoły:",
      options: [
        "Wystawia zaświadczenie lekarskie zobowiązujące nauczycieli do umożliwienia dziecku korzystania z toalety w dowolnym momencie lekcji na żądanie (mikcje w schemacie timed voiding co 2-3 godziny, podwójna mikcja double voiding) w celu unikania powstrzymywania moczu i zapobiegania nawrotom gorączkowych ZUM.",
        "Wystawia zakaz opuszczania sali lekcyjnej przez dziecko przez pełne 8 godzin zajęć.",
        "Kieruje dziecko do szkoły specjalnej ze względu na rozpoznanie VUR.",
        "Zaleca nauczycielom całkowity zakaz pojenia dziecka w szkole.",
        "Wymaga każdorazowej zgody kuratorium oświaty na wyjście dziecka do toalety."
      ],
      correct: 0,
      explanation: "U dzieci z VUR i zaburzeniami mikcji kluczowym elementem terapii niefarmakologicznej jest tzw. uroterapia (regularne mikcje w schemacie czasowym co 2-3 godziny, unikanie przetrzymywania moczu, podwójne opróżnianie pęcherza). Lekarz ma obowiązek wydać zaświadczenie dla szkoły gwarantujące dziecku swobodny dostęp do toalety, co chroni nerki przed wstecznym nadciśnieniem moczowym i infekcjami."
    }
  },
  108: {
    pathoTargets: [
      "Diagnostyka: Badania laboratoryjne potwierdzające triadę Addisa: krwiomocz ze schizocytami i wałeczkami erytrocytowymi w osadzie moczu ('mocz koloru popłuczyn mięsnych' / 'coca-coli'), obrzęki ciastowate twarzy i powiek, nadciśnienie tętnicze; umiarkowany białkomocz nieselektywny (<2–3 g/dobę, rzadko zespół nerczycowy). Terapia: Leczenie objawowe ostrej fazy: ścisła restrykcja płynów (bilans: diureza z dnia poprzedniego + niewidzialne parowanie 400 ml/m² m.c./dobę) oraz restrykcja sodu (<1–2 g soli/dobę).",
      "Diagnostyka: Badania serologiczne w kierunku przebytego zakażenia paciorkowcowego GAS: miano antystreptolizyny O (ASO >200–400 j. Todd – rośnie po anginie paciorkowcowej po 1–3 tyg.) lub przeciwciała przeciwko DNazie B (anty-DNaza B – rośnie po paciorkowcowym zakażeniu skóry/liszajcu po 3–6 tyg.). Terapia: Eradykacja ewentualnego przetrwałego ogniska paciorkowca z gardła lub skóry: fenoksymetylopenicylina doustnie przez 10 dni (50 000–100 000 j.m./kg/d) lub cefadroksyl (antybiotyk nie wpływa na przebieg istniejącego KZN, ale przerywa transmisję szczepu nefrytogennego w otoczeniu).",
      "Diagnostyka: Badanie układu dopełniacza – wybitne obniżenie stężenia składowej C3 dopełniacza przy prawidłowym lub nieznacznie obniżonym C4 (aktywacja drogi alternatywnej przez antygeny SpeB i NAPIr odłożone w kłębuszkach). Terapia: Monitorowanie laboratoryjne: stężenie C3 dopełniacza MUSI POWRÓCIĆ DO NORMY w ciągu 6–8 tygodni od początku choroby; brak normalizacji C3 po 8 tygodniach stanowi bezwzględne wskazanie do wykonania biopsji nerki w celu wykluczenia błoniasto-rozplemowego KZN (MPGN) lub nefropatii C3.",
      "Diagnostyka: Monitorowanie powikłań krążeniowych i nerkowych: nadciśnienie tętnicze II stopnia, przeciążenie objętościowe krążenia, obrzęk płuc, encefalopatia nadciśnieniowa, ostre uszkodzenie nerek z hiperkaliemią. Terapia: Kontrola nadciśnienia tętniczego i przewodnienia: diuretyk pętlowy furosemid i.v. lub p.o. w dawce 1–2 mg/kg m.c. (maks. 4 mg/kg/d); w razie ciężkiego nadciśnienia: amlodypina 0,1–0,2 mg/kg/d p.o. lub labetalol; unikanie ACE-I/ARB w ostrej fazie skąpomoczu ze względu na ryzyko hiperkaliemii."
    ],
    q9: {
      question: "Wskaż zdanie FAŁSZYWE dotyczące ostrego popaciorkowcowego kłębuszkowego zapalenia nerek (APSGN) u dzieci:",
      options: [
        "Choroba rozwija się po okresie utajenia (latencji) wynoszącym 1-3 tygodnie po przebytej anginie paciorkowcowej lub 3-6 tygodni po paciorkowcowym zakażeniu skóry (liszajcu).",
        "W ostrej fazie choroby typowo stwierdza się wybitne obniżenie stężenia składowej C3 dopełniacza przy zazwyczaj prawidłowym stężeniu składowej C4.",
        "Podstawą leczenia immunosupresyjnego w każdym przypadku APSGN jest natychmiastowe wdrożenie dożylnych pulsów metyloprednizolonu i cyklofosfamidu.",
        "Klasyczną manifestacją kliniczną jest zespół nefrytyczny: krwiomocz ('mocz koloru popłuczyn mięsnych'), obrzęki podoczodołowe oraz nadciśnienie tętnicze.",
        "U ponad 95% dzieci choroba kończy się całkowitym samoistnym wyleczeniem bez trwałych następstw nerkowych."
      ],
      correct: 2,
      explanation: "Zdanie C jest FAŁSZYWE. APSGN jest chorobą samoograniczającą się, o doskonałym rokowaniu (>95% pełnych wyleczeń u dzieci). W niepowikłanym przebiegu stosowanie glikokortykosteroidów lub leków cytotoksycznych (cyklofosfamidu) jest NIEZALECANE i potencjalnie szkodliwe. Leczenie ma charakter wyłącznie objawowy (restrykcja płynów i sodu, furosemid, leki hipotensyjne). Pulsy steroidowe rozważa się jedynie w rzadkich przypadkach gwałtownie postępującego KZN (RPGN) z półksiężycami w biopsji."
    },
    q10: {
      question: "Do wskazań do wykonania biopsji nerki u dziecka z podejrzeniem ostrego popaciorkowcowego KZN należą:\n1. Utrzymywanie się obniżonego stężenia składowej C3 dopełniacza powyżej 8 tygodni od początku choroby\n2. Gwałtowny spadek filtracji kłębuszkowej z bezmoczem i cechami RPGN (gwałtownie postępującego KZN)\n3. Współistnienie objawów choroby układowej (np. tocznia rumieniowatego układowego SLE, zapaleń naczyń ANCA)\n4. Brak cech przebytej infekcji paciorkowcowej (ujemne ASO, ujemna anty-DNaza B) i brak okresu latencji\n5. Pełna normalizacja ciśnienia tętniczego i diurezy w 5. dobie leczenia furosemidem\nPrawidłowa odpowiedź to:",
      options: [
        "1, 2, 3, 4",
        "1, 2, 5",
        "2, 3, 5",
        "1, 3, 5",
        "Wszystkie wymienione"
      ],
      correct: 0,
      explanation: "Prawidłowa odpowiedź to 1, 2, 3, 4. Biopsję nerki należy wykonać, gdy obraz jest nietypowy (brak infekcji paciorkowcowej, gwałtowna niewydolność nerek) lub gdy hipokomplementemia C3 utrzymuje się >8 tygodni (podejrzenie MPGN lub tocznia). Szybka poprawa i normalizacja w 5. dobie (cecha 5) to typowy przebieg APSGN, w którym biopsja jest zbędna."
    },
    q11: {
      question: "7-letni chłopiec po przebytej hospitalizacji z powodu ostrego popaciorkowcowego KZN jest wypisywany do domu w stanie dobrym (RR prawidłowe, diureza prawidłowa, utrzymuje się mikrokrwinkomocz). W ramach opieki ambulatoryjnej POZ i orzecznictwa lekarskiego:",
      options: [
        "Lekarz POZ zleca systematyczną kontrolę ciśnienia tętniczego, kontrolne badanie ogólne moczu co 4-6 tygodni oraz OBOWIĄZKOWE oznaczenie składowej C3 dopełniacza po 6-8 tygodniach od zachorowania w celu potwierdzenia jego normalizacji, wydając czasowe zwolnienie z zajęć wychowania fizycznego na okres rekonwalescencji.",
        "Lekarz ma obowiązek wystawić skierowanie na przewlekłą hemodializoterapię do stacji dializ.",
        "Dziecko otrzymuje bezwzględny zakaz nauki szkolnej na okres 3 lat.",
        "Lekarz zgłasza przypadek do prokuratury z powodu zakażenia paciorkowcowego.",
        "Zaleca się zaniechanie jakichkolwiek dalszych badań moczu, gdyż mikrokrwinkomocz nie ma znaczenia klinicznego."
      ],
      correct: 0,
      explanation: "Kluczowym elementem nadzoru nad dzieckiem po APSGN jest kontrola ciśnienia tętniczego, monitorowanie ustępowania krwinkomoczu (może utrzymywać się do 12-24 miesięcy bez konsekwencji) oraz obowiązkowa kontrola stężenia C3 dopełniacza po 6-8 tygodniach. Normalizacja C3 potwierdza rozpoznanie APSGN i wyklucza przewlekłe kłębuszkowe zapalenia nerek (MPGN, C3G)."
    }
  },
  109: {
    pathoTargets: [
      "Diagnostyka: Badanie ultrasonograficzne (USG) układu moczowego – ocena stopnia wodonercza wg klasyfikacji Society for Fetal Urology (SFU stopnie I–IV; stopień IV: masywne poszerzenie miedniczki >20–30 mm, balonowate rozdęcie kielichów i zanik/ścieńczenie miąższu kory nerki <2–3 mm), pomiar wymiaru przednio-tylnego miedniczki nerkowej (APD >15 mm w okresie pourodzeniowym świadczy o wysokim prawdopodobieństwie istotnej przeszkody). Terapia: U noworodków i niemowląt z wodonerczem SFU III–IV: profilaktyka przeciwbakteryjna ZUM małą dawką antybiotyku na noc (amoksycylina 10–15 mg/kg m.c. na noc u noworodków, kotrimoksazol po ukończeniu 2.–3. m.ż.).",
      "Diagnostyka: Scyntygrafia dynamiczna nerek (renocystografia) z użyciem 99mTc-MAG3 lub 99mTc-EC z testem furosemidowym (protokół F+20) – złoty standard w różnicowaniu anatomicznej przeszkody podpęcherzowej/miedniczkowej od atonicznej, nieobturacyjnej dylatacji; ocena czasu półtranzytu (T1/2 >20 minut świadczy o istotnej obstrukcji) oraz względnego udziału czynnościowego chorej nerki (DRF – Differential Renal Function). Terapia: Kwalifikacja do leczenia operacyjnego: bezwzględnymi wskazaniami są: upośledzenie funkcji nerki <40% w badaniu wyjściowym, spadek udziału czynnościowego nerki o >10% w seryjnych scyntygrafiach lub narastanie wodonercza w USG.",
      "Diagnostyka: Diagnostyka różnicowa przyczyny zwężenia (wewnętrzna dysplazja warstwy mięśniowej moczowodu vs naczynie krzyżujące dolnobiegunowe tętnicy nerkowej – crossing vessel uciskające z zewnątrz na UPJ – widoczne w USG Doppler lub angio-TK/angio-MRI). Terapia: Operacja naprawcza z wyboru: resekcyjna plastyka połączenia miedniczkowo-moczowodowego sposobem Hynesa-Andersona (pieloplastyka Andersona-Hynesa metodą klasyczną, laparoskopową lub z użyciem robota) z redukcją nadmiaru miedniczki i wytworzeniem nowego, szerokiego zespolenia.",
      "Diagnostyka: Ocena szczelności i drożności zespolenia w okresie pooperacyjnym. Terapia: Śródoperacyjne założenie stentu wewnętrznego miedniczkowo-pęcherzowego Double-J (DJ) lub nefrostomii odbarczającej na okres 4–6 tygodni w celu zabezpieczenia gojenia zespolenia; antybiotykoterapia osłonowa do czasu usunięcia stentu DJ; pooperacyjny nadzór w badaniach USG (po 6 tyg., 3 i 6 mies.) oraz kontrolna scyntygrafia MAG3 po 6–12 miesiącach potwierdzająca ustąpienie przeszkody."
    ],
    q9: {
      question: "Wskaż zdanie FAŁSZYWE dotyczące wrodzonego zwężenia połączenia miedniczkowo-moczowodowego (UPJO) u dzieci:",
      options: [
        "UPJO jest najczęstszą wrodzoną wadą układu moczowego prowadzącą do wodonercza u noworodków i niemowląt.",
        "Złotym standardem czynnościowym potwierdzającym istotną hemodynamicznie mechaniczną przeszkodę odpływu moczu jest dynamiczna scyntygrafia nerek (np. 99mTc-MAG3) z testem furosemidowym (F+20).",
        "W każdym przypadku poszerzenia miedniczki nerkowej u noworodka należy natychmiast w 1. dobie życia wykonać nefrektomię (usunięcie nerki) z dostępu lędźwiowego.",
        "U starszych dzieci UPJO może manifestować się napadowymi bólami brzucha/lędźwi połączonymi z nudnościami i wymiotami po wypiciu dużej ilości płynów (tzw. kryzy Dietla).",
        "Zabiegiem operacyjnym z wyboru o udowodnionej >95% skuteczności jest plastyka miedniczkowo-moczowodowa sposobem Hynesa-Andersona."
      ],
      correct: 2,
      explanation: "Zdanie C jest FAŁSZYWE. Poszerzenie miedniczki nerkowej u noworodka w wielu przypadkach ma charakter przejściowy (fizjologiczny lub atoniczny) i ulega samoistnej regresji w miarę dojrzewania układu moczowego. Standardem jest wnikliwa obserwacja w badaniach USG i scyntygrafii MAG-3. W razie wskazań operacyjnych wykonuje się operację OSZCZĘDZAJĄCĄ NARKĘ (pieloplastykę Hynesa-Andersona), a nefrektomia jest dopuszczalna jedynie w skrajnych przypadkach całkowicie zniszczonej nerki bezczynnej (<10% funkcji)."
    },
    q10: {
      question: "Do wskazań do leczenia operacyjnego (pieloplastyki) wrodzonego wodonercza w przebiegu UPJO należą:\n1. Spadek względnej funkcji wydalniczej nerki (DRF) poniżej 40% w scyntygrafii MAG3\n2. Udokumentowane w seryjnych scyntygrafiach pogorszenie funkcji chorej nerki o >10%\n3. Narastanie wodonercza w kontrolnych badaniach USG (SFU III/IV, wzrost APD)\n4. Występowanie objawów klinicznych: nawracające gorączkowe ZUM, bóle brzucha (kryzy Dietla), kamica\n5. Izolowane poszerzenie miedniczki nerkowej do 6 mm bez cech przeszkody i przy równej funkcji 50/50%\nPrawidłowa odpowiedź to:",
      options: [
        "1, 2, 3, 4",
        "1, 2, 5",
        "2, 3, 5",
        "1, 3, 5",
        "Wszystkie wymienione"
      ],
      correct: 0,
      explanation: "Prawidłowa odpowiedź to 1, 2, 3, 4. Operacja jest wskazana przy upośledzeniu/spadku funkcji nerki, progresji wodonercza lub powikłaniach klinicznych (bóle, kamica, ZUM). Miedniczka 6 mm przy równej funkcji (cecha 5) to łagodna bezobjawowa dylatacja niemająca znaczenia klinicznego."
    },
    q11: {
      question: "Rodzice 6-miesięcznego niemowlęcia z wodonerczem stopnia IV i zwężeniem UPJO zostają zakwalifikowani do zabiegu pieloplastyki laparoskopowej z czasowym założeniem stentu Double-J. W ramach świadomej zgody i procedur prawno-medycznych lekarz chirurg dziecięcy:",
      options: [
        "Przedstawia rodzicom w sposób przystępny cel operacji, technikę zabiegu, przewidywane korzyści (ochrona miąższu nerki), typowe ryzyka (krwawienie, zakażenie, przeciek moczu ze szwów, konieczność konwersji do operacji otwartej) oraz konieczność planowego usunięcia stentu DJ po 4-6 tygodniach w krótkim znieczuleniu, odbierając pisemną zgodę obojga lub jednego z rodziców.",
        "Odbiera zgodę ustną bez wpisu do historii choroby, informując, że zabiegi laparoskopowe nie niosą ze sobą żadnych powikłań.",
        "Ma prawny zakaz informowania rodziców o konieczności usunięcia stentu DJ, aby ich nie denerwować.",
        "Pobiera pisemną zgodę od 6-miesięcznego niemowlęcia.",
        "Zastępuje formularz zgody ustnym zapewnieniem pielęgniarki dyżurnej."
      ],
      correct: 0,
      explanation: "Zgodnie z art. 31 i 34 Ustawy o zawodach lekarza i lekarza dentysty, przed wykonaniem zabiegu operacyjnego o podwyższonym ryzyku konieczne jest uzyskanie uświadomionej pisemnej zgody przedstawiciela ustawowego pacjenta małoletniego po wyczerpującym poinformowaniu o charakterze zabiegu, powikłaniach i procedurach następczych (usunięcie stentu DJ)."
    }
  },
  110: {
    pathoTargets: [
      "Diagnostyka: Wywiad epidemiologiczny (brak szczepienia MMR, kontakt z chorym 10–14 dni wcześniej), badanie przedmiotowe w fazie nieżytowej/prodromalnej – 'triada odrowa': zapalenie spojówek ze światłowstrętem i obrzękiem powiek, nieżyt nosa (katar) oraz 'szczekający', męczący suchy kaszel, połączone z wysoką gorączką (>39–40 °C). Terapia: Izolacja powietrzno-kropelkowa chorego (przez 4 dni przed do 4 dni po wystąpieniu wysypki); zaciemnienie pomieszczenia ze względu na bolesny światłowstręt; leki przeciwgorączkowe (paracetamol 15 mg/kg m.c., ibuprofen 10 mg/kg m.c.).",
      "Diagnostyka: Badanie jamy ustnej w fazie prodromalnej (na 24–48 h przed osutką) – plamki Koplika (białe, drobne wykwity przypominające 'ziarnka piasku' otoczone czerwoną obwódką na błonie śluzowej policzków na wysokości zębów przedtrzonowych – patognomoniczny objaw odry). Terapia: Podanie witaminy A doustnie zgodnie z protokołem WHO (redukuje śmiertelność i powikłania narządowe odry u dzieci): 200 000 IU p.o. 1 x dz. przez 2 kolejne dni (u dzieci ≥1 r.ż.) lub 100 000 IU (u niemowląt 6–11 m.ż.).",
      "Diagnostyka: Badanie powłok skórnych w fazie osutkowej – zstępująca osutka plamisto-grudkowa (rozpoczyna się za uszami i na linii czoła, w ciągu 2–3 dni rozprzestrzenia się na twarz, tułów i kończyny, wykazuje tendencję do zlewania się; ustępuje po 5–7 dniach z pozostawieniem brunatnych przebarwień i otrębiastego złuszczania naskórka). Terapia: Wczesne rozpoznanie i leczenie powikłań bakteryjnych (zapalenie ucha środkowego AOM, bakteryjne zapalenie płuc – najczęstsza przyczyna zgonów dzieci z odrą): celowana antybiotykoterapia dożylna lub doustna (np. amoksycylina z kwasem klawulanowym lub cefuroksym).",
      "Diagnostyka: Monitorowanie ciężkich powikłań neurologicznych: ostre poinfekcyjne zapalenie mózgu (ADEM – 1 na 1000 zachorowań) oraz odległe podostre stwardniające zapalenie mózgu (SSPE – Subacute Sclerosing Panencephalitis, ujawniające się po 5–10 latach, w 100% śmiertelne zwyrodnienie OUN). Terapia: Profilaktyka poekspozycyjna u osób nieszczepionych z kontaktu: podanie szczepionki MMR w ciągu 72 godzin od ekspozycji LUB podanie normalnej immunoglobuliny ludzkiej (HNIG 0,5 ml/kg m.c. i.m.) w ciągu do 6 dni od kontaktu (u niemowląt <6 m.ż., ciężarnych i osób z niedoborami odporności)."
    ],
    q9: {
      question: "Wskaż zdanie FAŁSZYWE dotyczące odry (Morbilli / Measles):",
      options: [
        "Wirus odry (paramyksowirus RNA) jest jednym z najbardziej zakaźnych znanych patogenów ludzkich, przenoszonym drogą powietrzno-kropelkową i przez aerozole (wskaźnik R0 wynosi 12–18).",
        "Patognomonicznym objawem fazy prodromalnej odry są plamki Koplika pojawiające się na błonie śluzowej policzków przed wystąpieniem osutki skórnej.",
        "Podanie witaminy A u dzieci z odrą jest zalecane przez WHO, ponieważ zmniejsza ryzyko powikłań ocznych oraz śmiertelność.",
        "Osutka w odrze pojawia się najpierw na stopach i dłoniach, a po kilku dniach wstępuje na tułów i twarz.",
        "Podostre stwardniające zapalenie mózgu (SSPE) jest późnym, nieuleczalnym i postępującym powikłaniem neurologicznym zakażenia wirusem odry rozwijającym się po kilku latach od pierwotnej infekcji."
      ],
      correct: 3,
      explanation: "Zdanie D jest FAŁSZYWE. Osutka w odrze ma typowy układ ZSTĘPUJĄCY: rozpoczyna się za uszami, na linii włosów i na czole, skąd w ciągu kolejnych 2-3 dni rozprzestrzenia się w dół – obejmując szyję, klatkę piersiową, brzuch, a na końcu kończyny górne i dolne. Po kilku dniach ustępuje w tej samej kolejności, pozostawiając charakterystyczne brunatne przebarwienia i otrębiaste złuszczanie naskórka."
    },
    q10: {
      question: "Do typowych objawów fazy zwiastunowej (prodromalnej) oraz powikłań odry należą:\n1. 'Triada odrowa': wysoka gorączka, zapalenie spojówek ze światłowstrętem, katar i męczący suchy kaszel\n2. Plamki Koplika na błonie śluzowej policzków naprzeciw zębów trzonowych\n3. Wtórne bakteryjne zapalenie płuc oraz ostre zapalenie ucha środkowego\n4. Ostre odrowe zapalenie mózgu (ADEM) występujące u ok. 1 na 1000 chorych\n5. Izolowane, bezbolesne poszerzenie aorty wstępującej bez gorączki\nPrawidłowa odpowiedź to:",
      options: [
        "1, 2, 3, 4",
        "1, 2, 5",
        "2, 3, 5",
        "1, 3, 5",
        "Wszystkie wymienione"
      ],
      correct: 0,
      explanation: "Prawidłowa odpowiedź to 1, 2, 3, 4. Objawy 1-4 tworzą klasyczny obraz kliniczny odry i jej najczęstszych powikłań. Poszerzenie aorty wstępującej (cecha 5) to cecha tętniaków aorty lub zespołu Marfana, niemająca żadnego związku z odrą."
    },
    q11: {
      question: "W przychodni POZ lekarz rozpoznaje klinicznie odrę u nieszczepionego 4-letniego dziecka. Zgodnie z polską Ustawą o zapobieganiu oraz zwalczaniu zakażeń i chorób zakaźnych u ludzi:",
      options: [
        "Lekarz ma bezwzględny prawny obowiązek natychmiastowego telefonicznego oraz pisemnego (druk ZLK-1) zgłoszenia każdego przypadku podejrzenia lub rozpoznania odry do właściwego państwowego powiatowego inspektora sanitarnego (Sanepidu) w ciągu 24 godzin oraz pobrania próbek do badań laboratoryjnych (wymaz z gardła/moczu na PCR oraz krew na IgM) w ramach nadzoru WHO nad eliminacją odry.",
        "Odra nie wymaga żadnego zgłoszenia do Sanepidu, o ile dziecko nie jest hospitalizowane na OIOM.",
        "Zgłoszenie odry do Sanepidu jest dozwolone dopiero po uzyskaniu ostatecznego wyniku zgonu pacjenta.",
        "Lekarz ma prawny zakaz zgłaszania odry, aby nie pogarszać statystyk epidemiologicznych regionu.",
        "Każdy przypadek odry wymaga natychmiastowej ewakuacji całego miasta decyzją premiera."
      ],
      correct: 0,
      explanation: "Odra jest w Polsce objęta ścisłym programem eliminacji WHO i podlega bezwzględnemu obowiązkowi natychmiastowego zgłoszenia do Sanepidu (w ciągu 24 h telefonicznie i na druku ZLK-1). Każde podejrzenie odry musi być potwierdzone laboratoryjnie (bezpłatne badania serologiczne IgM oraz PCR finansowane przez NIZP-PZH), a osoby z kontaktu kwalifikowane są do pilnej profilaktyki poekspozycyjnej (szczepionka MMR do 72 h lub immunoglobulina do 6 dni)."
    }
  }
};

async function processBatch() {
  console.log('=== RUNNING UPGRADES FOR CASES 101 TO 110 ===');
  const files = fs.readdirSync('cases').sort((a, b) => {
    return parseInt(a.split('_')[0], 10) - parseInt(b.split('_')[0], 10);
  });

  for (const f of files) {
    if (!f.endsWith('.json') || f === 'auth.json' || f === 'index.json') continue;
    const id = parseInt(f.split('_')[0], 10);
    if (isNaN(id) || id < 101 || id > 110) continue;

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
    const upgrade = UPGRADES_101_110[id];
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
      const q9 = upgrade.q9;
      const q10 = upgrade.q10;
      const q11 = upgrade.q11;

      if (q9) {
        c.lekQuestions[8] = {
          tag: 'LEK CEM - Pytanie o fałsz',
          question: q9.question,
          q: q9.question,
          options: q9.options,
          opts: q9.options,
          correct: q9.correct,
          correctIdx: q9.correct,
          explanation: q9.explanation,
          expl: q9.explanation
        };
      }
      if (q10) {
        c.lekQuestions[9] = {
          tag: 'LEK CEM - Zadanie kombinatoryczne',
          question: q10.question,
          q: q10.question,
          options: q10.options,
          opts: q10.options,
          correct: q10.correct,
          correctIdx: q10.correct,
          explanation: q10.explanation,
          expl: q10.explanation
        };
      }
      if (q11) {
        c.lekQuestions[10] = {
          tag: 'LEK CEM - Prawo / Orzecznictwo / Etyka / Zdrowie Publiczne',
          question: q11.question,
          q: q11.question,
          options: q11.options,
          opts: q11.options,
          correct: q11.correct,
          correctIdx: q11.correct,
          explanation: q11.explanation,
          expl: q11.explanation
        };
      }
    }

    // Re-encrypt and write
    const reEncrypted = await encryptStringAes(JSON.stringify(c, null, 2), MASTER_KEY);
    fs.writeFileSync(fullPath, JSON.stringify(reEncrypted, null, 2), 'utf8');
    console.log(`[PERFECT PASS] Case #${id}: ${f}`);
  }
  console.log('Batch 101 to 110 processed successfully!');
}

processBatch().catch(err => {
  console.error('Błąd:', err);
  process.exit(1);
});

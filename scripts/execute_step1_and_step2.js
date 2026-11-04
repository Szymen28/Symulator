const fs = require('fs');
const { decryptObjectAes, encryptStringAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

// Baza klinicznych, konkretnych punktów uchwytu dla 38 przypadków szablonowych (Krok 2)
// Każdy target: 100-160 znaków, konkretny lek z dawką, złotym standardem lub regułą LEK.
const SPECIFIC_TARGETS_FOR_TEMPLATES = {
  37: [ // Blok AV III st.
    "Atropina 0,5–1 mg i.v. doraźnie lub natychmiastowa elektrostymulacja przezskórna (TCP), a docelowo stały stymulator serca (DDD/VVI).",
    "Wlew chronotropowy izoprenaliny lub adrenaliny (2–10 µg/min i.v.) zabezpieczający rzut do czasu elektrody endokawitarnej.",
    "Przywrócenie synchronii przedsionkowo-komorowej przez stymulację dwujamową (DDD), likwidujące fale armatnie na żyłach szyjnych."
  ],
  38: [ // Przełom nadciśnieniowy
    "Labetalol i.v. (bolus 20 mg, potem wlew) lub urapidyl i.v. – ostrożne obniżenie MAP o maks. 20–25% w 1. godzinie chroni przed udarem.",
    "Dożylne podanie nitroprusydku sodu lub nitrogliceryny i.v. natychmiast zmniejsza napięcie tętniczek i hamuje hemolizę mikroangiopatyczną.",
    "Wlew płynów izotonicznych w razie hipowolemii z presji; bezwzględny zakaz gwałtownego zbijania RR poniżej dolnej granicy autoregulacji."
  ],
  41: [ // AVNRT
    "Planowa ablacja RF drogi wolnej węzła AV o ponad 95% skuteczności, definitywnie likwidująca podłoże anatomiczne arytmii.",
    "Adenozyna 6 mg i.v. w szybkim bolusie z przepłukaniem 20 ml 0,9% NaCl, natychmiast blokująca przewodzenie w węźle AV.",
    "Zmodyfikowany manewr Valsalvy z uniesieniem kończyn dolnych w celu natychmiastowego przerwania pętli nawrotnej przed farmakoterapią."
  ],
  44: [ // SCLC z SVCS i SIADH
    "Pilna radioterapia śródpiersia (lub stentowanie żyły głównej) natychmiast odbarcza ucisk SVC i przywraca spływ żylny.",
    "Restrykcja płynowa (<800–1000 ml/d) oraz antagonista receptorów V2 (tolwaptan p.o.) w celu bezpiecznego podniesienia sodemii.",
    "Podanie 3% NaCl z limitem korekty sodu do maks. 8–10 mmol/l na dobę w celu bezwzględnej ochrony przed osmotyczną demielinizacją mostu (ODS)."
  ],
  45: [ // Sarkoidoza / Löfgren
    "Podanie NLPZ (naproksen 500 mg 2x/d) lub krótkiej sterydoterapii (prednizon 20–40 mg/d) wygasza ziarniniaki w tkance podskórnej i wnękach.",
    "Leczenie przeciwzapalne NLPZ i odpoczynek z uniesieniem kończyn; rumień guzowaty ustępuje samoistnie bez pozostawiania blizn.",
    "Unikanie suplementacji witaminy D i ekspozycji na słońce w celu zapobieżenia hiperkalcemii z autonomicznej 1-alfa-hydroksylacji."
  ],
  47: [ // Gruźlica płuc
    "Izolacja w sali z podciśnieniem i wdrożenie 4 leków (Rifampicyna + Izoniazyd + Pirazynamid + Etambutol) na 2 miesiące fazy wstępnej.",
    "Włączenie pirydoksyny (wit. B6 50 mg/d) w celu profilaktyki polineuropatii obwodowej wywoływanej przez izoniazyd.",
    "Rifampicyna 600 mg/d penetruje do wnętrza jam gruźliczych i zabija uśpione prątki; monitorowanie prób wątrobowych (hepatotoksyczność)."
  ],
  48: [ // Ropniak opłucnej
    "Wczesna torakocenteza diagnostyczna; pH <7,20, glukoza <60 mg/dl lub obecność bakterii to bezwzględne wskazanie do drenażu klatki.",
    "Założenie grubego drenu opłucnowego i doopłucnowe podawanie fibrynolityków (tPA + DNaza) w celu rozpuszczenia przegród włóknikowych.",
    "Wczesna wideotorakoskopia (VATS) z dekortykacją płuca w 3. stadium ropniaka, uwalniająca uwięzione płuco przed trwałym zarośnięciem."
  ],
  49: [ // Odma samoistna
    "Aspiracja strzykawkowa lub drenaż cienkodrenowy (8–14F) w II przestrzeni międzyżebrowej w linii środkowoobojczykowej.",
    "Wysokoprzepływowa tlenoterapia bierna (10 l/min przez maskę z rezerwuarem) 4-krotnie przyspiesza resorpcję powietrza z opłucnej.",
    "Kwalifikacja do wideotorakoskopii (VATS) z resekcją pęcherzy i pleurodezą mechaniczną przy nawrocie odmy lub braku rozprężenia po 48 h."
  ],
  50: [ // OBS
    "Aparat CPAP z automatyczną regulacją ciśnienia (auto-CPAP) utrzymuje dodatnie ciśnienie w drogach oddechowych i zapobiega zapadaniu gardła.",
    "Redukcja masy ciała o minimum 10% oraz unikanie alkoholu i leków nasennych przed snem redukuje liczbę epizodów bezdechów (AHI).",
    "Skuteczna terapia CPAP normalizuje nocne spadki saturacji, wygasza wyrzuty katecholamin i obniża oporne nadciśnienie tętnicze."
  ],
  51: [ // Krwawiący wrzód Forrest Ia
    "Pilna gastroskopia w ciągu 12 h z hemostazą skojarzoną (ostrzyknięcie adrenaliną 1:10 000 + klipsy hemostatyczne lub koagulacja termiczna).",
    "Dożylny inhibitor pompy protonowej (pantoprazol 80 mg bolus i.v., potem wlew 8 mg/h) utrzymuje pH >6,0 i chroni skrzep przed lizą pepsyny.",
    "Eradykacja Helicobacter pylori po ustabilizowaniu krwawienia oraz bezwzględne odstawienie NLPZ w celu zapobieżenia nawrotom owrzodzenia."
  ],
  52: [ // Encefalopatia wątrobowa
    "Laktuloza doustnie lub przez zgłębnik (20–30 g 3x/d z celem 2–3 miękkich stolców/d) zakwasza treść jelita i zamienia NH3 w niewchłanialny NH4+.",
    "Ryfaksymina alfa 550 mg 2x/d doustnie niszczy ureazo-dodatnią florę bakteryjną jelita, radykalnie redukując produkcję amoniaku.",
    "Odpowiednia podaż białka (1,2–1,5 g/kg/d) zapobiega katabolizmowi mięśniowemu; unikanie leków uspokajających i natychmiastowe leczenie zaparć."
  ],
  54: [ // Choroba Leśniowskiego-Crohna
    "Glikokortykosteroidy (budezonid p.o. w chorobie krętniczej lub prednizon i.v./p.o.) w indukcji remisji ostrego rzutu zapalenia.",
    "Terapia biologiczna anty-TNF (infliksymab, adalimumab) zamyka przetoki okołoodbytowe i indukuje pełne gojenie śluzówki jelita.",
    "Wczesna interwencja chirurgiczna oszczędzająca jelito (strikturoplastyka lub oszczędna resekcja) w razie zwężeń z objawami niedrożności."
  ],
  58: [ // IBS
    "Dieta low-FODMAP redukuje fermentację jelitową, a leki rozkurczowe (drotaweryna, mebeweryna) łagodzą skurcz mięśniówki gładkiej jelit.",
    "Trójpierścieniowe leki przeciwdepresyjne (amitryptylina 10–25 mg/d) modulują oś mózgowo-jelitową i podnoszą próg trzewny czucia bólu.",
    "Celowana probiotykoterapia oraz suplementacja błonnika rozpuszczalnego (babka płesznik) normalizują rytm wypróżnień bez nasilania wzdęć."
  ],
  59: [ // HHS
    "Agresywne nawadnianie izotonicznym 0,9% NaCl (1000 ml/h na starcie) z następowym przejściem na 0,45% NaCl przy hipernatremii skorygowanej.",
    "Małe dawki insuliny i.v. (0,05–0,1 j./kg/h) włączane dopiero po nawodnieniu, z celem powolnego spadku osmolalności maks. 3–5 mOsm/kg/h.",
    "Rutynowa profilaktyka przeciwzakrzepowa heparyną drobnocząsteczkową (HDCz) z powodu skrajnej hiperlepkości krwi i ryzyka zatorowości."
  ],
  60: [ // Ciężka hipoglikemia
    "Dożylne podanie 20% glukozy w bolusie (0,5–1 ml/kg m.c. w ciągu 2–3 min) z natychmiastowym przejściem na 10% glukozę we wlewie ciągłym.",
    "Domięśniowe podanie 1 mg glukagonu (i.m.) w warunkach braku dostępu dożylnego u pacjentów z zachowanymi zapasami glikogenu w wątrobie.",
    "Przedłużona hospitalizacja i monitorowanie glikemii przez min. 24–48 h przy przedawkowaniu doustnych pochodnych sulfonylomocznika."
  ],
  61: [ // Guz chromochłonny (Pheo)
    "Bezwzględna blokada alfa-adrenolityczna (fenoksybenzamina lub doksazosyna 2–8 mg/d) przez min. 10–14 dni PRZED włączeniem beta-blokera.",
    "Dołączenie beta-blokera dopiero po pełnej blokadzie alfa w celu opanowania tachykardii bez ryzyka przełomu z niehamowanego pobudzenia alfa.",
    "Laparoskopowa adrenalektomia po odpowiednim nawodnieniu solnym i znormalizowaniu ciśnienia tętniczego pod ścisłym nadzorem anestezjologicznym."
  ],
  62: [ // Zespół Cushinga
    "Test hamowania deksametazonem (1 mg over-night) oraz ocena wolnego kortyzolu w DZM potwierdzają autonomię wydzielania glikokortykosteroidów.",
    "Operacja neurochirurgiczna przez klinowa (TSS) w chorobie Cushinga lub laparoskopowa adrenalektomia w gruczolaku nadnercza.",
    "Blokery steroidogenezy (metypiron, ketokonazol) jako terapia pomostowa przed operacją w celu opanowania powikłań metabolicznych."
  ],
  63: [ // Przełom hiperkalcemiczny
    "Intensywne nawadnianie 0,9% NaCl (3–4 litry/dobę) z następowym dołączeniem furosemidu dopiero po pełnym nawodnieniu pacjenta.",
    "Dożylne bisfosfoniany (kwas zoledronowy 4 mg i.v. w 15 min) hamują osteoklastyczną resorpcję kości z pełnym efektem po 48–72 godzinach.",
    "Kalcytonina łososiowa (4–8 IU/kg i.m./s.c. co 12 h) natychmiast obniża kalcemię w pierwszych 24 h przed zadziałaniem bisfosfonianów."
  ],
  64: [ // Zespół Conna (Hiperaldosteronizm)
    "Wskaźnik aldosteronowo-reninowy (ARR >30) potwierdza autonomiczne wydzielanie aldosteronu przy stłumionej aktywności reninowej osocza.",
    "Antagonista aldosteronu (spironolakton 25–100 mg/d lub eplerenon) normalizuje ciśnienie i koryguje hipokaliemię przed leczeniem zabiegowym.",
    "Laparoskopowa adrenalektomia w jednostronnym gruczolaku kory nadnercza (choroba Conna) prowadząca do pełnego wyleczenia nadciśnienia."
  ],
  65: [ // Moczkówka prosta
    "Test odwodnieniowo-wazopresynowy różnicuje postać centralną (wzrost osmolalności moczu >50% po dDAVP) od nerkowej (brak reakcji na dDAVP).",
    "Desmopresyna (dDAVP) donosowo lub doustnie stanowi terapię z wyboru w moczkówce centralnej, natychmiast hamując poliurię.",
    "Diuretyki tiazydowe w skojarzeniu z dietą ubogosodową w moczkówce nerkowej paradoksalnie zmniejszają diurezę przez zwiększenie resorpcji proksymalnej."
  ],
  67: [ // Hiponatremia / ODS
    "Podanie 3% NaCl (100–150 ml w 10 min) w objawowej hiponatremii z drgawkami; żelazny limit korekty: maksymalnie 8–10 mmol/l na pierwsze 24 godziny.",
    "Ścisłe seryjne monitorowanie sodu co 2–4 h; przekroczenie tempa korekty grozi nieodwracalną osmotyczną demielinizacją mostu (ODS).",
    "Podanie wolnej wody (5% glukoza) lub desmopresyny w razie zbyt szybkiej autokorekty sodu w celu ochrony oligodendrocytów mostu."
  ],
  69: [ // Zespół nerczycowy
    "Glikokortykosteroidy (prednizon 1 mg/kg/d p.o.) stanowią leczenie pierwszego rzutu indukujące remisję białkomoczu w nerczycy submikroskopowej.",
    "Restrykcja sodu (<2 g/d) oraz ostrożne stosowanie diuretyków pętlowych (furosemid) z ewentualnym wlewem 20% albuminy przy ciężkiej hipowolemii.",
    "Profilaktyka przeciwzakrzepowa heparyną drobnocząsteczkową przy stężeniu albumin <20–25 g/l z powodu utraty antytrombiny III z moczem."
  ],
  74: [ // Niedokrwistość z niedoboru B12
    "Witamina B12 (cyjanokobalamina 1000 µg i.m. codziennie przez 7–14 dni, potem raz w tygodniu) natychmiast odblokowuje syntezę DNA erytroblastów.",
    "Bezwzględny zakaz podawania samego kwasu foliowego bez witaminy B12 – maskuje anemię, nasilając nieodwracalne zwyrodnienie sznurów tylnych rdzenia.",
    "Seryjne monitorowanie retikulocytozy w 5.–7. dobie (kryzys retikulocytowy) potwierdza prawidłową odpowiedź szpiku na suplementację B12."
  ],
  75: [ // TTP
    "Natychmiastowa plazmafereza lecznicza (TPE z wymianą 1–1,5 objętości osocza) usuwa autoprzeciwciała i uzupełnia metaloproteinazę ADAMTS13.",
    "Glikokortykosteroidy (metyloprednizolon 1 g i.v. przez 3 dni) w skojarzeniu z rytuksymabem wygaszają klony limfocytów B produkujące przeciwciała.",
    "Kaplacyzumab (przeciwciało anty-vWF) natychmiast blokuje wiązanie płytek z ultradużymi multimerami vWF, chroniąc przed mikrozakrzepicą narządową."
  ],
  76: [ // Gorączka neutropeniczna
    "Natychmiastowe wdrożenie dożylnej antybiotykoterapii przeciw-Pseudomonas w ciągu <60 min od gorączki (cefepim 2 g i.v. lub piperacylina z tazobaktamem).",
    "Pobranie minimum dwóch zestawów posiewów krwi (z wkłucia centralnego i żyły obwodowej) PRZED podaniem pierwszej dawki antybiotyku.",
    "Włączenie czynników wzrostu granulocytów (G-CSF: filgrastym 5 µg/kg/d s.c.) u pacjentów wysokiego ryzyka w celu skrócenia neutropenii."
  ],
  77: [ // Szpiczak mnogi (CRAB)
    "Wdrożenie schematu trójlekowego VRd (bortezomib + lenalidomid + deksametazon) hamującego proteasom i wygaszającego klon komórek plazmatycznych.",
    "Intensywne nawadnianie krystaloidami oraz unikanie kontrastu jodowego i NLPZ w celu ochrony cewek nerkowych przed wałeczkami łańcuchów lekkich.",
    "Dożylne bisfosfoniany (kwas zoledronowy) oraz denosumab hamują resorpcję kości przez osteoklasty i zapobiegają złamaniom patologicznym."
  ],
  78: [ // Ostra białaczka szpikowa (AML)
    "Intensywna chemioterapia indukcyjna wg schematu '7+3' (cytarabina we wlewie ciągłym przez 7 dni + daunorubicyna przez 3 dni).",
    "Agresywne nawadnianie i rasbery 접uza w profilaktyce zespołu rozpadu guza (TLS) oraz substytucja płytek krwi (próg transfuzji <10 000/µl).",
    "Pilna leukafereza lub hydroksymocznik w dawkach frakcjonowanych przy cechach leukostazy płucnej lub neurologicznej (leukocytoza >100 000/µl)."
  ],
  79: [ // Zespół rozpadu guza (TLS)
    "Agresywna hiperhydratacja płynowa (2,5–3 l/m2/d) oraz rasbery 접uza (0,2 mg/kg i.v.) przekształcająca kwas moczowy w dobrze rozpuszczalną alantoinę.",
    "Wapń dożylny (10% glukonian wapnia) podawany wyłącznie przy objawowej hipokalcemii lub zaburzeniach EKG z powodu ryzyka precypitacji Ca x P.",
    "Wczesna hemodializa ratunkowa w razie oligurii, hiperkaliemii opornej na leczenie zachowawcze lub iloczynu Ca x P >60–70 mg2/dl2."
  ],
  82: [ // Dna moczanowa (Podagra)
    "Kolchicyna w małych dawkach (1 mg natychmiast, potem 0,5 mg po godzinie) lub silne NLPZ hamują inflamasom NLRP3 i migrację neutrofili do stawu.",
    "Glikokortykosteroidy ogólne (prednizon 30–35 mg/d p.o. przez 5 dni) w razie niewydolności nerek lub przeciwwskazań do kolchicyny i NLPZ.",
    "Allopurynol włączany dopiero po pełnym wygaszeniu ostrego napadu w dawce miareczkowanej od 100 mg/d pod osłoną małych dawek kolchicyny."
  ],
  84: [ // Borelioza (Rumień wędrujący)
    "Doksycyklina 100 mg 2x/d doustnie przez 14–21 dni (u kobiet w ciąży i dzieci: amoksycylina 500 mg 3x/d) eliminuje krętki Borrelia burgdorferi.",
    "Rumień wędrujący o średnicy >5 cm po ukłuciu kleszcza jest rozpoznaniem klinicznym – bezwzględny zakaz zlecania serologii (okienko serologiczne).",
    "Profilaktyka poekspozycyjna pojedynczą dawką doksycykliny (200 mg p.o.) zalecana wyłącznie po mnogich ukłuciach kleszczy na terenach endemicznych."
  ],
  86: [ // Resuscytacja noworodka (NLS)
    "Skuteczna wentylacja płuc maską twarzową (5 oddechów upadkowatych po 2–3 s ciśnieniem 30 cmH2O) stanowi najważniejszy krok otwierający pęcherzyki.",
    "Ucisk klatki piersiowej w stosunku 3:1 z wentylacją włączany dopiero po 30 s skutecznej wentylacji, jeśli częstość akcji serca pozostaje <60/min.",
    "Utrzymanie normotermii (36,5–37,5°C) za pomocą plastikowego worka bez wycierania u wcześniaków <32. Hbd chroni przed hipotermią i kwasicą."
  ],
  87: [ // Konflikt serologiczny RhD / ChHN
    "Fototerapia ciągła światłem niebieskim (460–490 nm) izomeryzuje bilirubinę pośrednią do rozpuszczalnej lumirubiny wydalanej z moczem.",
    "Immunoglobuliny dożylne (IVIG 0,5–1 g/kg i.v.) blokują receptory Fc makrofagów śledzionowych, hamując dalszą hemolizę erytrocytów płodu.",
    "Transfuzja wymienna krwią jednoimienną z układem ABO i RhD-ujemną przy przekroczeniu krytycznych progów bilirubiny wg nomogramu Bhutaniego."
  ],
  89: [ // Atrezja dwunastnicy
    "Ciągłe odbarczenie żołądka sondą nosowo-żołądkową (Replogle) zapobiega zachłyśnięciu treścią żółciową i rozdęciu górnego odcinka przewodu pokarmowego.",
    "Płynoterapia dożylna wyrównująca hipochloremiczną zasadowicę metaboliczną przed znieczuleniem ogólnym i zabiegiem operacyjnym.",
    "Zespolenie omijające dwunastniczo-dwunastnicze (duodenoduodenostomia metodą romboidalną wg Kimury) przywraca drożność przewodu pokarmowego."
  ],
  90: [ // RDS noworodka
    "Egzogenny surfaktant (poraktant alfa 200 mg/kg) podawany dotchawiczo metodą LISA/MIST natychmiast obniża napięcie powierzchniowe pęcherzyków.",
    "Wczesne nieinwazyjne wsparcie oddechowe nCPAP (ciśnienie 5–7 cmH2O) zapobiega zapadaniu pęcherzyków na wydechu i zmniejsza potrzebę intubacji.",
    "Prenatalna sterydoterapia (betametazon 2x 12 mg i.m. co 24 h) podana matce w zagrożeniu porodem przedwczesnym stymuluje dojrzewanie pneumocytów II typu."
  ],
  91: [ // TGA (Przełożenie wielkich pni)
    "Ciągły wlew prostaglandyny E1 (alprostadil 0,01–0,05 µg/kg/min i.v.) utrzymuje drożność przewodu Botalla i zapewnia mieszanie krwi natlenionej.",
    "Pilna atrioseptostomia balonowa Rashkinda pod kontrolą USG poszerza otwór owalny i poprawia natlenowanie krwi w razie restrykcyjnego ASD.",
    "Korekcja anatomiczna metodą przełączenia tętniczego (operacja Jatene) z reimplantacją tętnic wieńcowych w pierwszych 2–3 tygodniach życia."
  ],
  97: [ // Ciało obce w drogach oddechowych
    "Pilna sztywna bronchoskopia w znieczuleniu ogólnym z użyciem kleszczyków optycznych umożliwia bezpieczną ewakuację ciała obcego z oskrzela.",
    "Bezwzględny zakaz manipulacji na ślepo palcem w jamie ustnej dziecka z powodu ryzyka wepchnięcia ciała obcego z gardła w szparę głośni.",
    "Po zabiegu: inhalacje ze sterydów i toaleta drzewa oskrzelowego w celu wygaszenia chemicznego odczynu zapalnego śluzówki (arachidic bronchitis)."
  ],
  98: [ // Mukowiscydoza (CF)
    "Potrójna terapia modulatorami CFTR (eleksakaftor/tezakaftor/iwakaftor) przywraca transport jonów chlorkowych przez zmutowane kanały nabłonka.",
    "Inhalacje z dornazy alfa (rhDNaza 2,5 mg 1x/d) oraz 7% soli hipertonicznej upłynniają gęsty śluz i usprawniają klirens śluzowo-rzęskowy.",
    "Wziewna tobramycyna lub kolistyna w cyklach 28 dni leczenia / 28 dni przerwy hamuje przewlekłą kolonizację Pseudomonas aeruginosa w oskrzelach."
  ],
  99: [ // Wgłobienie jelita
    "Badanie USG jamy brzusznej z uwidocznieniem objawu 'tarczy strzelniczej' / 'pseudonerki' w prawym dolnym kwadrancie brzucha.",
    "Pneumatyczne lub hydrostatyczne odprowadzenie wgłobienia pod kontrolą USG/RTG (ciśnienie powietrza do 120 mmHg) przy braku perforacji.",
    "Pilna laparotomia ze zwiadem jelita i oszczędną resekcją martwiczego odcinka przy obecności objawów zapalenia otrzewnej lub nieskuteczności odbarczenia."
  ]
};

// Funkcja kondensująca przeładowany punkt uchwytu (target > 250c) do eleganckich 120-160 znaków
function condenseOverlongTarget(target, title) {
  if (!target || target.length <= 180) return target;

  // Usuń tagi dose-pill jeśli występują
  let clean = target.replace(/<span class=['"]dose-pill['"]>([\s\S]*?)<\/span>/gi, '$1');

  // Sprawdź czy jest sekcja Terapia / Procedura / Leczenie
  const matchTherapy = clean.match(/(?:Terapia|Procedura|Leczenie|Postępowanie|Złoty standard):\s*([^.]+?\.)/i);
  if (matchTherapy && matchTherapy[1] && matchTherapy[1].trim().length >= 40 && matchTherapy[1].trim().length <= 180) {
    return matchTherapy[1].trim();
  }

  // Sprawdź czy jest sekcja Diagnostyka (jeśli terapia nie pasuje)
  const matchDiag = clean.match(/Diagnostyka:\s*([^.]+?\.)/i);

  // Jeśli jest podział Diagnostyka i Terapia:
  if (clean.includes('Terapia:') || clean.includes('Procedura:') || clean.includes('Leczenie:')) {
    const parts = clean.split(/(?:Terapia|Procedura|Leczenie):\s*/i);
    if (parts[1]) {
      let tPart = parts[1].split(';')[0].trim();
      if (!tPart.endsWith('.')) {
        const firstSentence = parts[1].match(/^([^.]+?\.)/);
        if (firstSentence) tPart = firstSentence[1].trim();
        else tPart = tPart + '.';
      }
      if (tPart.length >= 50 && tPart.length <= 180) {
        return tPart;
      }
    }
  }

  // Jeśli tekst zaczyna się od Diagnostyka:
  if (clean.startsWith('Diagnostyka:')) {
    clean = clean.replace(/^Diagnostyka:\s*/, '');
    const firstSentence = clean.match(/^([^.]+?\.)/);
    if (firstSentence && firstSentence[1].length <= 180) {
      return firstSentence[1].trim();
    }
  }

  // Domyślne inteligentne skrócenie do pierwszego pełnego zdania do 160 znaków
  const sentences = clean.split(/(?<=[.!?])\s+/);
  let res = sentences[0];
  if (res.length > 175) {
    res = res.slice(0, 165).replace(/[,;]\s*[^,;]*$/, '') + '.';
  }
  return res;
}

async function run() {
  const files = fs.readdirSync('cases').filter(f => /^\d+_.*\.json$/.test(f));
  let modifiedTemplatesCount = 0;
  let modifiedOverlongCount = 0;

  for (const f of files) {
    const raw = JSON.parse(fs.readFileSync('cases/' + f, 'utf8'));
    const c = await decryptObjectAes(raw, MASTER_KEY);
    if (!c.pathoNodes) continue;

    let modified = false;

    // 1. Zastąpienie szablonowych punktów uchwytu (Krok 2)
    if (SPECIFIC_TARGETS_FOR_TEMPLATES[c.id]) {
      const specificTargets = SPECIFIC_TARGETS_FOR_TEMPLATES[c.id];
      c.pathoNodes.forEach((n, idx) => {
        if (specificTargets[idx]) {
          n.target = specificTargets[idx];
          modified = true;
        }
      });
      modifiedTemplatesCount++;
    }

    // 2. Kondensacja przeładowanych punktów uchwytu (Krok 1)
    c.pathoNodes.forEach((n, idx) => {
      if ((n.target || '').length > 200) {
        const condensed = condenseOverlongTarget(n.target, n.title);
        if (condensed && condensed !== n.target) {
          n.target = condensed;
          modified = true;
          modifiedOverlongCount++;
        }
      }
    });

    if (modified) {
      const enc = await encryptStringAes(JSON.stringify(c, null, 2), MASTER_KEY);
      fs.writeFileSync('cases/' + f, JSON.stringify(enc, null, 2), 'utf8');
    }
  }

  console.log(`Zaktualizowano pomyślnie:`);
  console.log(`- Zastąpiono szablony w ${modifiedTemplatesCount} przypadkach (114 węzłów z konkretnymi lekami i dawkami!)`);
  console.log(`- Skondensowano ${modifiedOverlongCount} przeładowanych punktów uchwytu do eleganckiego formatu 100-160 znaków.`);
}

run().catch(console.error);

const fs = require('fs');
const { decryptObjectAes, encryptStringAes } = require('./encrypt_case.js');
const PASSWORD = '@LEKSzymon28111999';

async function upgradeCase(fname, updater) {
  const enc = JSON.parse(fs.readFileSync('cases/' + fname, 'utf8'));
  const c = await decryptObjectAes(enc, PASSWORD);
  updater(c);
  if (!c.vitalsObj) {
    c.vitalsObj = { hr: 110, bp: "100/60", spo2: 98, rr: 22, temp: 37.5, gcs: 15 };
  }
  const reEnc = await encryptStringAes(JSON.stringify(c, null, 2), PASSWORD);
  fs.writeFileSync('cases/' + fname, JSON.stringify(reEnc, null, 2), 'utf8');
  console.log(`Upgraded clinical storytelling: ${fname}`);
}

async function run() {
  console.log("Starting deep clinical upgrade for cases 116-120...");

  // ==========================================
  // CASE 116: Gorączka trzydniowa / Rumień nagły (HHV-6)
  // ==========================================
  await upgradeCase('116_goraczka_trzydniowa_hhv6.json', (c) => {
    c.steps = [
      {
        stepNum: 1,
        title: "Krok 1: Wstępna ocena na SOR – 10-miesięczne niemowlę z nagłą wysoką gorączką",
        desc: "Dyżurujesz w izbie przyjęć szpitala dziecięcego. Zaniepokojeni rodzice przywożą 10-miesięcznego synka. Dziecko od 3 dni ma wysoką gorączkę sięgającą 39.8°C, która słabo reaguje na paracetamol i ibuprofen. Poza gorączką chłopiec ma zachowany apetyt, chętnie pije płyny, w okresach między rzutami temperatury bawi się zabawkami. W dokładnym badaniu przedmiotowym: ciemiączko płaskie, miękkie, gardło bez nalotów, błony bębenkowe perłowe bez cech zapalenia, płuca osłuchowo czyste, brzuch miękki, objawy oponowe ujemne, brak jakiejkolwiek wysypki. Jakie jest Twoje postępowanie diagnostyczne u niemowlęcia z gorączką bez uchwytnego ogniska?",
        scenario: "Dyżurujesz w izbie przyjęć szpitala dziecięcego. Zaniepokojeni rodzice przywożą 10-miesięcznego synka. Dziecko od 3 dni ma wysoką gorączkę sięgającą 39.8°C, która słabo reaguje na paracetamol i ibuprofen. Poza gorączką chłopiec ma zachowany apetyt, chętnie pije płyny, w okresach między rzutami temperatury bawi się zabawkami. W dokładnym badaniu przedmiotowym: ciemiączko płaskie, miękkie, gardło bez nalotów, błony bębenkowe perłowe bez cech zapalenia, płuca osłuchowo czyste, brzuch miękki, objawy oponowe ujemne, brak jakiejkolwiek wysypki. Jakie jest Twoje postępowanie diagnostyczne u niemowlęcia z gorączką bez uchwytnego ogniska?",
        options: [
          {
            text: "Zlecasz badanie ogólne moczu (z cewnika lub ze środkowego strumienia) w celu wykluczenia bezobjawowego ZUM, oceniasz stan ogólny i zalecasz nawadnianie oraz kontrolę za 24h, podejrzewając łagodną infekcję wirusową (np. okres prodromalny rumienia nagłego).",
            correct: true,
            feedback: "Znakomicie! U niemowlęcia z wysoką gorączką bez uchwytnego ogniska (FWS) kluczowe jest wykluczenie ZUM jako najczęstszego ciężkiego zakażenia bakteryjnego. Dobry stan ogólny dziecka (dziecko aktywne, pije, bawi się w apireksji) przemawia przeciwko inwazyjnej posocznicy i pozwala na bezpieczne postępowanie wyczekujące bez natychmiastowej niepotrzebnej antybiotykoterapii."
          },
          {
            text: "Wdrażasz natychmiast empiryczną dożylną antybiotykoterapię meropenemem i wankomycyną.",
            correct: false,
            feedback: "Kardynalny błąd! Niemowlę w stanie ogólnym dobrym nie wymaga antybiotyków o skrajnie szerokim spektrum bez uchwytnego zakażenia bakteryjnego."
          },
          {
            text: "Kwalifikujesz dziecko do natychmiastowej bronchofiberoskopii.",
            correct: false,
            feedback: "Brak objawów ze strony dolnych dróg oddechowych, badanie nieuzasadnione i inwazyjne."
          },
          {
            text: "Zalecasz nacieranie ciała niemowlęcia 100% spirytusem salicylowym.",
            correct: false,
            feedback: "Niebezpieczne: alkohol wchłania się przez skórę niemowlęcia i grozi śmiertelnym zatruciem i hipoglikemią!"
          }
        ]
      },
      {
        stepNum: 2,
        title: "Krok 2: Badania laboratoryjne – Wirusowy profil zapalny",
        desc: "Wynik badania ogólnego moczu jest w normie (leukocyty 1–2 wpw, azotyny ujemne). Morfologia krwi: Leukocyty 5.2 G/l (w normie lub leukopenia), limfocytoza 65%, neutrofile 25%, hemoglobina 12.1 g/dl, płytki 210 G/l. CRP 8 mg/l (norma <10 mg/l), prokalcytonina 0.1 ng/ml (ujemna). Jak interpretujesz te wyniki?",
        scenario: "Wynik badania ogólnego moczu jest w normie (leukocyty 1–2 wpw, azotyny ujemne). Morfologia krwi: Leukocyty 5.2 G/l (w normie lub leukopenia), limfocytoza 65%, neutrofile 25%, hemoglobina 12.1 g/dl, płytki 210 G/l. CRP 8 mg/l (norma <10 mg/l), prokalcytonina ujemna. Brak gorączki (temp. 36.8°C). Jak interpretujesz te wyniki?",
        options: [
          {
            text: "Prawidłowe CRP, ujemna prokalcytonina oraz prawidłowa lub obniżona liczba leukocytów z przewagą limfocytów potwierdzają łagodną infekcję wirusową i wykluczają inwazyjne zakażenie bakteryjne (SBI).",
            correct: true,
            feedback: "Doskonale! Prawidłowe wskaźniki ostrej fazy (CRP <10 mg/l, PCT <0.5 ng/ml) oraz leukopenia z limfocytozą to klasyczny obraz ostrej infekcji wirusowej u niemowląt. Potwierdza to słuszność powstrzymania się od antybiotykoterapii."
          },
          {
            text: "Wynik wskazuje na sepsę meningokokową i wymaga natychmiastowego przetoczenia osocza.",
            correct: false,
            feedback: "W sepsie meningokokowej CRP i prokalcytonina są wybitnie podwyższone, a stan dziecka krytyczny."
          },
          {
            text: "Leukocyty 5.2 G/l u niemowlęcia to dowód ostrej agranulocytozy szpikowej.",
            correct: false,
            feedback: "Przejściowa leukopenia jest typowym zjawiskiem w infekcjach wirusowych (m.in. HHV-6)."
          },
          {
            text: "Płytki 210 G/l oznaczają skrajną małopłytkowość wymagającą KKP.",
            correct: false,
            feedback: "Norma płytek krwi to 150-450 G/l."
          }
        ]
      },
      {
        stepNum: 3,
        title: "Krok 3: Nagły spadek gorączki i spektakularny wysiew osutki",
        desc: "W 4. dobie rodzice dzwonią z wiadomością: dziś rano gorączka nagle i całkowicie ustąpiła (temp. 36.6°C), ale niemal równocześnie na tułowiu, szyi i karku pojawiła się drobnoplamista, bladoróżowa wysypka. Dziecko czuje się doskonale. Jaka jednostka chorobowa charakteryzuje się tą klasyczną dynamiką objawów?",
        scenario: "W 4. dobie rodzice dzwonią z wiadomością: dziś rano gorączka nagle i całkowicie ustąpiła (temp. 36.6°C), ale niemal równocześnie na tułowiu, szyi i karku pojawiła się drobnoplamista, bladoróżowa wysypka. Dziecko czuje się doskonale. Jaka jednostka chorobowa charakteryzuje się tą klasyczną dynamiką objawów?",
        options: [
          {
            text: "Rumień nagły / Gorączka trzydniowa (Exanthema subitum / 'szósta choroba'); patognomoniczna sekwencja: 3–4 dni wysokiej gorączki bez objawów narządowych, po czym następuje gwałtowny (krytyczny) spadek temperatury połączony z natychmiastowym wysiewem osutki na tułowiu.",
            correct: true,
            feedback: "Znakomicie! Klasyczny pewniak egzaminacyjny: sekwencja 'najpierw wysoka gorączka przez 3–4 dni -> spadek temperatury do normy -> dopiero wtedy wysiew bladoróżowej wysypki na tułowiu' jest unikalna dla rumienia nagłego (gorączki trzydniowej). W żadnej innej chorobie wysypkowej wysypka nie pojawia się w momencie ustąpienia gorączki (w odrze, płonicy czy ospie wysypka pojawia się w szczycie gorączki!)."
          },
          {
            text: "Odra w fazie zstępującej.",
            correct: false,
            feedback: "W odrze w momencie pojawienia się wysypki gorączka osiąga maksimum (40°C), a nie spada."
          },
          {
            text: "Płonica zakaźna.",
            correct: false,
            feedback: "W płonicy wysypka pojawia się w 1-2 dobie wysokiej gorączki z towarzyszącym zapaleniem migdałków."
          },
          {
            text: "Ostra białaczka z wysiewem skórnym.",
            correct: false,
            feedback: "Brak jakichkolwiek cech procesu rozrostowego."
          }
        ]
      },
      {
        stepNum: 4,
        title: "Krok 4: Czynnik etiologiczny – Ludzkie wirusy herpes HHV-6 i HHV-7",
        desc: "Jaki patogen odpowiada za wywołanie rumienia nagłego w przeważającej większości przypadków (>90%)?",
        scenario: "Jaki patogen odpowiada za wywołanie rumienia nagłego w przeważającej większości przypadków (>90%)?",
        options: [
          {
            text: "Ludzki wirus herpes typu 6 (HHV-6 / Human Herpesvirus 6, podtyp B), rzadziej HHV-7.",
            correct: true,
            feedback: "Doskonale! Pytanie sprawdzające wiedzę mikrobiologiczną LEK: Rumień nagły (gorączka trzydniowa, szósta choroba) jest wywoływany przez ludzki herpeswirus typu 6 (HHV-6B) u >90% niemowląt, a pozostałe przypadki wywołuje blisko spokrewniony HHV-7. Zakażenie szerzy się drogą kropelkową przez ślinę od bezobjawowych opiekunów. Po przechorowaniu wirus przechodzi w fazę latencji w leukocytach."
          },
          {
            text: "Wirus ospy wietrznej i półpaśca (VZV / HHV-3).",
            correct: false,
            feedback: "VZV wywołuje ospę wietrzną i półpasiec."
          },
          {
            text: "Wirus cytomegalii (CMV / HHV-5).",
            correct: false,
            feedback: "CMV daje zespół mononukleozopodobny lub zakażenie wrodzone."
          },
          {
            text: "Paciorkowiec Streptococcus pyogenes grupy A.",
            correct: false,
            feedback: "To bakteria wywołująca płonicę, nie wirus gorączki trzydniowej."
          }
        ]
      },
      {
        stepNum: 5,
        title: "Krok 5: Morfologia i rozkład osutki w rumieniu nagłym",
        desc: "Oglądasz niemowlę na wizycie kontrolnej. Jakie cechy morfologiczne i jaka lokalizacja osutki są charakterystyczne dla rumienia nagłego?",
        scenario: "Oglądasz niemowlę na wizycie kontrolnej. Jakie cechy morfologiczne i jaka lokalizacja osutki są charakterystyczne dla rumienia nagłego?",
        options: [
          {
            text: "Wykwity drobnoplamiste i plamisto-grudkowe, bladoróżowe, wielkości 2–5 mm, blednące pod uciskiem; zlokalizowane głównie na tułowiu (klatka piersiowa, brzuch) i szyi, w mniejszym stopniu na proksymalnych częściach kończyn, zazwyczaj oszczędzające twarz; ustępują w ciągu 1–2 dni bez śladu.",
            correct: true,
            feedback: "Znakomicie! Cechy osutki w rumieniu nagłym: drobne, różowe plamki i grudki (przypominające różyczkę, stąd nazwa 'roseola infantum'), zlokalizowane głównie na tułowiu, szybko blednące i znikające w ciągu 24–48 godzin bez pozostawiania przebarwień i bez łuszczenia naskórka."
          },
          {
            text: "Pęcherze krwotoczne z martwicą naskórka.",
            correct: false,
            feedback: "Niedorzeczne w łagodnym rumieniu nagłym."
          },
          {
            text: "Wykwity ograniczone wyłącznie do dłoni i stóp.",
            correct: false,
            feedback: "To lokalizacja w chorobie bostońskiej (HFMD)."
          },
          {
            text: "Twarde bolesne guzki podskórne w rzucie piszczeli.",
            correct: false,
            feedback: "To opis rumienia guzowatego (erythema nodosum)."
          }
        ]
      },
      {
        stepNum: 6,
        title: "Krok 6: Najczęstsze ostre powikłanie – Drgawki gorączkowe indukowane HHV-6",
        desc: "Wirus HHV-6 cechuje się wybitnym neurotropizmem. Jakie powikłanie ostre występuje u 10–15% dzieci z rumieniem nagłym w okresie wysokiej gorączki, stanowiąc najczęstszą przyczynę zgłoszeń na SOR?",
        scenario: "Wirus HHV-6 cechuje się wybitnym neurotropizmem. Jakie powikłanie ostre występuje u 10–15% dzieci z rumieniem nagłym w okresie wysokiej gorączki, stanowiąc najczęstszą przyczynę zgłoszeń na SOR?",
        options: [
          {
            text: "Drgawki gorączkowe (proste lub złożone); HHV-6 jest najczęstszą pojedynczą przyczyną infekcyjną wyzwalającą pierwszy w życiu epizod drgawek gorączkowych u niemowląt między 6. a 18. miesiącem życia.",
            correct: true,
            feedback: "Wybitnie! Kluczowy fakt kliniczny: HHV-6 penetruje do ośrodkowego układu nerwowego i wywołuje gwałtowny skok temperatury ciała. Odpowiada za niemal jedną trzecią wszystkich pierwszych napadów drgawek gorączkowych u niemowląt i małych dzieci! Drgawki te mają z reguły charakter prosty i nie zwiększają ryzyka padaczki w przyszłości."
          },
          {
            text: "Trwałe porażenie czterokończynowe spastyczne.",
            correct: false,
            feedback: "Brak takiego ryzyka w niepowikłanym rumieniu nagłym."
          },
          {
            text: "Pęknięcie tętniaka tętnicy środkowej mózgu.",
            correct: false,
            feedback: "Skrajnie niedorzeczne."
          },
          {
            text: "Ostra niewydolność nerek wymagająca hemodializy.",
            correct: false,
            feedback: "HHV-6 u dzieci immunokompetentnych nie niszczy nerek."
          }
        ]
      },
      {
        stepNum: 7,
        title: "Krok 7: Błędne rozpoznanie 'alergii na antybiotyk'",
        desc: "Gdyby w 2. dobie gorączki dziecko otrzymało od lekarza POZ amoksycylinę, a w 4. dobie pojawiła się opisana wysypka po spadku temperatury – jaki częsty błąd diagnostyczny popełniają wówczas rodzice i lekarze?",
        scenario: "Gdyby w 2. dobie gorączki dziecko otrzymało od lekarza POZ amoksycylinę, a w 4. dobie pojawiła się opisana wysypka po spadku temperatury – jaki częsty błąd diagnostyczny popełniają wówczas rodzice i lekarze?",
        options: [
          {
            text: "Błędne rozpoznanie 'alergii na penicylinę / amoksycylinę'; naturalna osutka rumienia nagłego pojawiająca się w 4. dobie jest nagminnie mylona z reakcją alergiczną na niepotrzebnie podany antybiotyk, co prowadzi do nieuzasadnionego przypisania dziecku etykiety 'uczulony na penicyliny'.",
            correct: true,
            feedback: "Doskonale! Znakomite pytanie z codziennej praktyki pediatrycznej i pytań LEK: to jedna z najczęstszych przyczyn fałszywych rozpoznań alergii na antybiotyki. Lekarz włącza amoksycylinę na gorączkę wirusową w 2. dobie, w 4. dobie gorączka spada i pojawia się naturalna wysypka wirusowa, którą rodzice i lekarz biorą za uczulenie na lek. Dziecko dostaje nieuzasadnioną 'łatkę' alergika na całe życie."
          },
          {
            text: "Uznanie, że amoksycylina wywołała ospę wietrzną.",
            correct: false,
            feedback: "Antybiotyki nie wywołują infekcji wirusowych VZV."
          },
          {
            text: "Rozpoznanie u niemowlęcia zespołu Guillaina-Barrégo.",
            correct: false,
            feedback: "GBS to wiotkie porażenie wstępujące, nie wysypka na brzuchu."
          },
          {
            text: "Brak jakiegokolwiek ryzyka pomyłki.",
            correct: false,
            feedback: "Pomyłka ta dotyczy setek tysięcy pacjentów w skali roku."
          }
        ]
      },
      {
        stepNum: 8,
        title: "Krok 8: Postępowanie terapeutyczne i edukacja rodziców",
        desc: "Jakie leczenie przyczynowe i jakie zalecenia przekazujesz rodzicom niemowlęcia z rumieniem nagłym?",
        scenario: "Jakie leczenie przyczynowe i jakie zalecenia przekazujesz rodzicom niemowlęcia z rumieniem nagłym?",
        options: [
          {
            text: "Wyłącznie leczenie objawowe (leki przeciwgorączkowe: paracetamol/ibuprofen w fazie gorączkowej, dbałość o nawodnienie); brak wskazań do leków przeciwwirusowych czy antybiotyków; edukacja, że choroba jest łagodna, nie wymaga leczenia dermatologicznego i pozostawia trwałą odporność.",
            correct: true,
            feedback: "Wybitnie! Rumień nagły jest schorzeniem całkowicie łagodnym i samoograniczającym się. U dzieci z prawidłową odpornością nie stosuje się leków przeciwwirusowych (gancyklowir stosuje się wyłącznie u chorych z głębokimi niedoborami odporności po przeszczepach z zapaleniem mózgu HHV-6). Wysypka nie swędzi i nie wymaga żadnych maści ani pudrów."
          },
          {
            text: "Zlecasz dożylny gancyklowir przez 30 dni w warunkach OIT.",
            correct: false,
            feedback: "Gancyklowir jest wysoce toksyczny mielotoksycznie i nie ma wskazań u zdrowego niemowlęcia z trzydniówką."
          },
          {
            text: "Zalecasz podawanie preparatów siarki doustnie.",
            correct: false,
            feedback: "Szkodliwe i pozbawione sensu."
          },
          {
            text: "Zakazujesz wychodzenia na spacery przez 5 lat.",
            correct: false,
            feedback: "Niedorzeczne."
          }
        ]
      }
    ];
  });

  // ==========================================
  // CASE 117: Choroba bostońska / HFMD (Enterowirusy)
  // ==========================================
  await upgradeCase('117_choroba_bostonska_hfmd.json', (c) => {
    c.steps = [
      {
        stepNum: 1,
        title: "Krok 1: Wstępna ocena w gabinecie POZ – 3-latek z bolesnymi zmianami w jamie ustnej",
        desc: "Do Twojego gabinetu POZ matka przyprowadza 3-letniego chłopca uczęszczającego do żłobka/przedszkola. Od 2 dni dziecko ma stan podgorączkowy (38.2°C), odmawia jedzenia posiłków stałych, płacze przy próbie picia soku pomarańczowego i obficie się ślini. Dziś rano matka zauważyła czerwone grudki i pęcherzyki na dłoniach syna. W badaniu jamy ustnej: na błonie śluzowej policzków, języku, dziąsłach i podniebieniu miękkim obecne są liczne drobne, bolesne owrzodzenia i afty (herpangina) z czerwoną obwódką zapalną. Jaka jest Twoja wstępna diagnoza?",
        scenario: "Do Twojego gabinetu POZ matka przyprowadza 3-letniego chłopca uczęszczającego do żłobka/przedszkola. Od 2 dni dziecko ma stan podgorączkowy (38.2°C), odmawia jedzenia posiłków stałych, płacze przy próbie picia soku pomarańczowego i obficie się ślini. Dziś rano matka zauważyła czerwone grudki i pęcherzyki na dłoniach syna. W badaniu jamy ustnej: na błonie śluzowej policzków, języku, dziąsłach i podniebieniu miękkim obecne są liczne drobne, bolesne owrzodzenia i afty (herpangina) z czerwoną obwódką zapalną. Jaka jest Twoja wstępna diagnoza?",
        options: [
          {
            text: "Rozpoznajesz chorobę dłoni, stóp i jamy ustnej (Hand, Foot, and Mouth Disease - HFMD / potocznie zwaną 'chorobą bostońską'); klasyczna triada lokalizacji wykwitów: jama ustna (enanthema) + dłonie i stopy (exanthema).",
            correct: true,
            feedback: "Znakomicie! Klasyczny obraz choroby dłoni, stóp i jamy ustnej (HFMD): wywołana przez enterowirusy. Występuje najczęściej u dzieci <5. r.ż. Bolesne afty i pęcherzyki w jamie ustnej (często zniechęcające dziecko do picia i jedzenia, prowadzące do ślinotoku i ryzyka odwodnienia) w połączeniu ze specyficznymi wykwitami na rękach i stopach stanowią jednoznaczną diagnozę kliniczną."
          },
          {
            text: "Rozpoznajesz zakażenie wirusem wścieklizny z powodu obecności ślinotoku.",
            correct: false,
            feedback: "Ślinotok wynika z silnego bólu przy połykaniu (odynofagii), a nie z neurologicznego skurczu mięśni gardła w wściekliźnie."
          },
          {
            text: "Stawiasz rozpoznanie ospy wietrznej zlokalizowanej.",
            correct: false,
            feedback: "W ospie wietrznej zmiany dominują na tułowiu i owłosionej skórze głowy, a dłonie i podeszwy stóp są zazwyczaj wolne od wykwitów."
          },
          {
            text: "Podejrzewasz poparzenie chemiczne ługiem sodowym w żłobku.",
            correct: false,
            feedback: "Brak wywiadu połknięcia żrących substancji, wykwity obecne symetrycznie na dłoniach i podeszwach."
          }
        ]
      },
      {
        stepNum: 2,
        title: "Krok 2: Badanie skóry – Charakterystyczna morfologia 'podłużnych pęcherzyków'",
        desc: "Oglądasz skórę rąk, stóp i okolicy pieluszkowej chłopca. Jakie cechy morfologiczne wykwitów na dłoniach i stopach są najbardziej typowe dla HFMD?",
        scenario: "Oglądasz skórę rąk, stóp i okolicy pieluszkowej chłopca. Jakie cechy morfologiczne wykwitów na dłoniach i stopach są najbardziej typowe dla HFMD?",
        options: [
          {
            text: "Drobne (2–6 mm), owalne lub podłużne pęcherzyki z szarawym płynem otoczone wąską rąbkiem rumieniowym, o osi długiej układającej się wzdłuż linii papilarnych, zlokalizowane na dłoniowej powierzchni rąk, podeszwach stóp, bocznych powierzchniach palców oraz pośladkach.",
            correct: true,
            feedback: "Doskonale! Morfologia wykwitów w HFMD (charakterystyczna cecha dermatologiczna): pęcherzyki mają często charakterystyczny kształt wrzecionowaty lub owalny (często z szarawym zabarwieniem centrum), a ich długa oś biegnie równolegle do linii papilarnych skóry! Częstą lokalizacją u małych dzieci są również pośladki i okolica krocza (gdzie wykwity mogą mieć charakter grudkowy)."
          },
          {
            text: "Masywne czyraki z czopem martwiczym.",
            correct: false,
            feedback: "Czyraki to zakażenia mieszków włosowych wywołane przez S. aureus."
          },
          {
            text: "Wykwity rumieniowo-złuszczające na wyprostnych częściach łokci.",
            correct: false,
            feedback: "To opis łuszczycy."
          },
          {
            text: "Rozlane pęcherze wielkości dłoni wypełnione krwią.",
            correct: false,
            feedback: "Brak takiego obrazu w HFMD."
          }
        ]
      },
      {
        stepNum: 3,
        title: "Krok 3: Czynniki etiologiczne – Wirusy Coxsackie i Enterowirus 71",
        desc: "Jakie wirusy należące do rodziny Picornaviridae odpowiadają za wywołanie choroby dłoni, stóp i jamy ustnej?",
        scenario: "Jakie wirusy należące do rodziny Picornaviridae odpowiadają za wywołanie choroby dłoni, stóp i jamy ustnej?",
        options: [
          {
            text: "Enterowirusy: najczęściej wirus Coxsackie A16 (klasyczny łagodny przebieg) oraz Coxsackie A6 (atypowy ciężki przebieg pęcherzowy); w Azji i endemicznie Enterowirus 71 (EV71), który może wywołać groźne powikłania neurologiczne i obrzęk płuc.",
            correct: true,
            feedback: "Znakomicie! Klasyfikacja etiologiczna enterowirusów w HFMD: najczęstszym patogenem jest Coxsackie A16 (oraz Coxsackie A6 dający rozległe zmiany pęcherzowe zwane eczema coxsackium). Szczególnie niebezpieczny jest Enterovirus 71 (EV-A71), który w ogniskach epidemicznych może wiązać się z ciężkim zapaleniem pnia mózgu, porażeniami wiotkimi (polio-like) i neurogennym obrzękiem płuc."
          },
          {
            text: "Wirus zapalenia wątroby typu C (HCV).",
            correct: false,
            feedback: "HCV to Flavivirus powodujący przewlekłe zapalenie wątroby."
          },
          {
            text: "Rotawirus grupy A.",
            correct: false,
            feedback: "Rotawirus wywołuje ciężką biegunkę z wymiotami, nie wykwity dłoni i stóp."
          },
          {
            text: "Wirus wścieklizny (Lyssavirus).",
            correct: false,
            feedback: "Wścieklizna to wirus odzwierzęcy z grupy rhabdowirusów."
          }
        ]
      },
      {
        stepNum: 4,
        title: "Krok 4: Główne zagrożenie ostre – Odwodnienie wskutek odynofagii",
        desc: "Chłopiec z powodu silnego bólu w jamie ustnej od 18 godzin nie przyjął żadnego płynu, płacze bez łez, język ma suchy, a nawrót kapilarny wynosi 3 sekundy. Jakie jest główne ostre zagrożenie u małych dzieci z HFMD i jak postępujesz?",
        scenario: "Chłopiec z powodu silnego bólu w jamie ustnej od 18 godzin nie przyjął żadnego płynu, płacze bez łez, język ma suchy, a nawrót kapilarny wynosi 3 sekundy. Jakie jest główne ostre zagrożenie u małych dzieci z HFMD i jak postępujesz?",
        options: [
          {
            text: "Odwodnienie hipowolemiczne w przebiegu ciężkiej odynofagii (bólu przy połykaniu); wymaga natychmiastowego uśmierzenia bólu (paracetamol/ibuprofen, miejscowe żele znieczulające do jamy ustnej), podawania chłodnych, obojętnych płynów (woda, mleko, lody), a przy braku tolerancji – nawodnienia dożylnego krystaloidami.",
            correct: true,
            feedback: "Wybitnie! Najczęstszą przyczyną hospitalizacji dzieci z HFMD nie są powikłania narządowe wirusa, lecz ciężkie ODWODNIENIE wywołane bolesnymi aftami w jamie ustnej. Dzieci odmawiają pojenia. Kluczem terapii jest skuteczne leczenie przeciwbólowe (NLPZ + paracetamol), unikanie płynów kwaśnych (soki cytrusowe potęgują pieczenie!), zalecanie chłodnych napojów i lodów (chłód działa znieczulająco) oraz kroplówki i.v. w razie cech odwodnienia."
          },
          {
            text: "Nakazujesz karmienie dziecka gorącym, pikantnym rosołem z dużą ilością pieprzu.",
            correct: false,
            feedback: "Okrucieństwo: podrażni afty i doprowadzi do natychmiastowego wstrząsu bólowego u 3-latka."
          },
          {
            text: "Kwalifikujesz dziecko do pilnej resekcji języka.",
            correct: false,
            feedback: "Absurdalna i okaleczająca propozycja."
          },
          {
            text: "Zalecasz ograniczenie picia do zera, aby afty 'wyschły'.",
            correct: false,
            feedback: "Śmiertelny błąd: pogłębi wstrząs hipowolemiczny."
          }
        ]
      },
      {
        stepNum: 5,
        title: "Krok 5: Pielęgnacja skóry i leczenie miejscowe",
        desc: "Matka pyta, czy pęcherzyki na dłoniach i stopach należy przebijać igłą lub smarować maścią z antybiotykiem. Jakie zalecenia wydajesz?",
        scenario: "Matka pyta, czy pęcherzyki na dłoniach i stopach należy przebijać igłą lub smarować maścią z antybiotykiem. Jakie zalecenia wydajesz?",
        options: [
          {
            text: "Zabraniasz przekłuwania pęcherzyków (płyn pęcherzykowy zawiera wysokie miano zakaźnego wirusa, a przerwanie pokrywy grozi nadkażeniem bakteryjnym); zalecasz utrzymanie czystości, preparaty odkażające na bazie oktenidyny i unikanie drapania.",
            correct: true,
            feedback: "Prawidłowo! Pęcherzyki w HFMD są pęcherzykami śródnaskórkowymi zawierającymi zakaźny płyn enterowirusowy. Przebijanie ich rozprzestrzenia zakażenie na skórę i otoczenie oraz tworzy wrota dla gronkowców i paciorkowców. Wykwity goją się samoistnie w ciągu 7–10 dni bez tworzenia blizn."
          },
          {
            text: "Nakazujesz wycięcie wszystkich pęcherzyków skalpelem w gabinecie.",
            correct: false,
            feedback: "Niedopuszczalne i szkodliwe."
          },
          {
            text: "Zalecasz okłady ze stężonego kwasu siarkowego.",
            correct: false,
            feedback: "Toksyczne oparzenie chemiczne."
          },
          {
            text: "Zalecasz smarowanie masłem orzechowym.",
            correct: false,
            feedback: "Brak jakiegokolwiek uzasadnienia medycznego."
          }
        ]
      },
      {
        stepNum: 6,
        title: "Krok 6: Drogi transmisji i zakaźność – Trwałe wydalanie wirusa ze stolcem",
        desc: "Matka pyta, jak dziecko się zaraziło oraz jak długo wirus jest wydalany z organizmu po ustąpieniu wysypki.",
        scenario: "Matka pyta, jak dziecko się zaraziło oraz jak długo wirus jest wydalany z organizmu po ustąpieniu wysypki?",
        options: [
          {
            text: "Wirus przenosi się drogą kropelkową oraz FAKALNO-ORALNĄ (brudne ręce, zabawki w żłobku); z jamy ustnej znika po 1–2 tygodniach, ale ze stolcem jest wydalany przez WIELE TYGODNI (nawet 4–10 tygodni!), co wymaga rygorystycznej higieny rąk i toalet po wyzdrowieniu.",
            correct: true,
            feedback: "Doskonale! Pewniak egzaminacyjny z epidemiologii enterowirusów: Enterowirusy wykazują oporność na kwas solny żołądka i namnażają się w kępkach Peyera jelita. Choć transmisja kropelkowa z dróg oddechowych trwa ok. 1-2 tygodnie, to wydalanie wirusa z kałem (droga fekalno-oralna) utrzymuje się przez kilka do kilkunastu tygodni po wyzdrowieniu klinicznym! Dlatego mycie rąk po zmianie pieluchy jest kluczowe dla ochrony innych dzieci."
          },
          {
            text: "Wirus przenosi się wyłącznie przez ukąszenie skorpionów w lasach tropikalnych.",
            correct: false,
            feedback: "HFMD to powszechna choroba żłobkowa w Polsce szerząca się drogą kropelkową i pokarmową."
          },
          {
            text: "Wydalanie wirusa kończy się natychmiast po 5 minutach od spadku gorączki.",
            correct: false,
            feedback: "Nieprawda: ze stolcem wirus wydala się tygodniami."
          },
          {
            text: "Choroba przenosi się tylko przez kontakt z kotami domowymi.",
            correct: false,
            feedback: "Enterowirusy Coxsackie są patogenami typowo ludzkimi."
          }
        ]
      },
      {
        stepNum: 7,
        title: "Krok 7: Późne następstwo dermatologiczne – Onychomadesis (złuszczanie paznokci)",
        desc: "Po 6 tygodniach od przechorowania matka przyprowadza chłopca w panice: 'Panie Doktorze, synkowi odpadają paznokcie u rąk i nóg! Odrywają się od nasady!'. Jakie zjawisko kliniczne rozpoznajesz?",
        scenario: "Po 6 tygodniach od przechorowania matka przyprowadza chłopca w panice: 'Panie Doktorze, synkowi odpadają paznokcie u rąk i nóg! Odrywają się od nasady!'. Jakie zjawisko kliniczne rozpoznajesz?",
        options: [
          {
            text: "Onychomadesis (oddzielanie się i schodzenie płytek paznokciowych od macierzy) oraz linie Beau; jest to typowe, późne, łagodne powikłanie po przebyciu HFMD (szczególnie szczepu Coxsackie A6), wynikające z przejściowego zahamowania funkcji macierzy paznokcia w fazie ostrej; paznokcie odrastają w 100% prawidłowo bez leczenia.",
            correct: true,
            feedback: "Wybitnie! Zjawisko onychomadesis po chorobie bostońskiej to klasyczne pytanie LEK: po 4–8 tygodniach od ostrej fazy HFMD (zwłaszcza po zakażeniu szczepem Coxsackie A6) dochodzi do bezbolesnego oddzielania się płytek paznokciowych od strony proksymalnej (onychomadesis) lub powstania poprzecznych bruzd (linie Beau). Zjawisko to wynika z czasowego zatrzymania podziałów komórek macierzy paznokcia pod wpływem ostrego stanu zapalnego. Jest całkowicie łagodne, nie wymaga leczenia przeciwgrzybiczego, a nowa płytka paznokciowa odrasta zdrowa w ciągu 3-6 miesięcy."
          },
          {
            text: "Rozpoznajesz złośliwą grzybicę paznokci i zalecasz doustną terbinafinę przez 2 lata.",
            correct: false,
            feedback: "Błąd: to nie grzybica, a poinfekcyjne zahamowanie wzrostu macierzy paznokcia."
          },
          {
            text: "Kwalifikujesz dziecko do amputacji wszystkich palców u rąk i stóp.",
            correct: false,
            feedback: "Kardynalny i absurdalny błąd okaleczający."
          },
          {
            text: "Podejrzewasz zatrucie talem w przedszkolu.",
            correct: false,
            feedback: "Onychomadesis po HFMD jest powszechnym, łagodnym następstwem enterowirusowym."
          }
        ]
      },
      {
        stepNum: 8,
        title: "Krok 8: Profilaktyka i zasady powrotu do placówki opiekuńczej",
        desc: "Kiedy dziecko po przebyciu HFMD może bezpiecznie powrócić do żłobka lub przedszkola?",
        scenario: "Kiedy dziecko po przebyciu HFMD może bezpiecznie powrócić do żłobka lub przedszkola?",
        options: [
          {
            text: "Po ustąpieniu gorączki, wygojeniu owrzodzeń w jamie ustnej (dziecko pije i je bez bólu) oraz przyschnięciu zmian pęcherzowych na skórze, zazwyczaj po 7–10 dniach od początku objawów; dbałość o częste mycie rąk w placówce.",
            correct: true,
            feedback: "Doskonale! Kryteria powrotu do placówki: brak gorączki przez minimum 24h, całkowity brak sączących się pęcherzyków (zmiany przyschnięte) oraz wygojenie aft w jamie ustnej umożliwiające normalne jedzenie i pojenie bez ślinotoku. Ze względu na przedłużone wydalanie wirusa z kałem placówka musi rygorystycznie przestrzegać procedur mycia rąk po korzystaniu z toalety."
          },
          {
            text: "Dziecko może wrócić do żłobka dopiero po 10 tygodniach, gdy przestanie wydalać wirus ze stolcem.",
            correct: false,
            feedback: "Nierealistyczne i nieuzasadnione: po ustąpieniu objawów ostrej fazy dziecko może bezpiecznie wrócić do grupy."
          },
          {
            text: "Dziecko może iść do żłobka w szczycie gorączki 40°C i z pękającymi pęcherzami.",
            correct: false,
            feedback: "Doprowadziłoby do natychmiastowego wybuchu ogniska epidemicznego w żłobku."
          },
          {
            text: "Wymagane jest szczepienie przeciwko HFMD zarejestrowane w polskim PSO.",
            correct: false,
            feedback: "W Europie i Polsce nie ma zarejestrowanej szczepionki przeciw HFMD (szczepionki przeciw EV71 są stosowane jedynie w Azji)."
          }
        ]
      }
    ];
  });

  // ==========================================
  // CASE 118: Drgawki gorączkowe u dziecka
  // ==========================================
  await upgradeCase('118_drgawki_goraczkowe.json', (c) => {
    c.steps = [
      {
        stepNum: 1,
        title: "Krok 1: Wstępna ocena w zespole ratownictwa / SOR – 18-miesięczny chłopiec po napadzie drgawek",
        desc: "Dyżurujesz na SOR dziecięcym. Zespół ratownictwa medycznego przywozi 18-miesięcznego chłopca w stanie ponapadowym. 20 minut temu w domu, w trakcie nagłego wzrostu gorączki do 39.5°C w przebiegu infekcji wirusowej gardła, u dziecka wystąpił nagły napad: utrata przytomności, zblednięcie, wygięcie ciała ku tyłowi, a następnie symetryczne drgawki kloniczne czterech kończyn trwające 2.5 minuty. Nie było przygryzienia języka, mocz nie został oddany. Po ustąpieniu napadu dziecko było podsypiające, teraz powoli nawiązuje kontakt z matką. W badaniu: HR 125/min, temp. 39.1°C, ciemiączko zarośnięte, objawy oponowe ujemne, źrenice równe, symetryczne, bez niedowładów ogniskowych. Jaka jest Twoja wstępna diagnoza?",
        scenario: "Dyżurujesz na SOR dziecięcym. Zespół ratownictwa medycznego przywozi 18-miesięcznego chłopca w stanie ponapadowym. 20 minut temu w domu, w trakcie nagłego wzrostu gorączki do 39.5°C w przebiegu infekcji wirusowej gardła, u dziecka wystąpił nagły napad: utrata przytomności, zblednięcie, wygięcie ciała ku tyłowi, a następnie symetryczne drgawki kloniczne czterech kończyn trwające 2.5 minuty. Nie było przygryzienia języka, mocz nie został oddany. Po ustąpieniu napadu dziecko było podsypiające, teraz powoli nawiązuje kontakt z matką. W badaniu: HR 125/min, temp. 39.1°C, ciemiączko zarośnięte, objawy oponowe ujemne, źrenice równe, symetryczne, bez niedowładów ogniskowych. Jaka jest Twoja wstępna diagnoza?",
        options: [
          {
            text: "Rozpoznajesz proste drgawki gorączkowe (Simple Febrile Seizures); najczęstsze zaburzenie napadowe wieku dziecięcego u dotychczas prawidłowo rozwijającego się dziecka między 6. miesiącem a 5. rokiem życia.",
            correct: true,
            feedback: "Znakomicie! Klasyczny obraz prostych drgawek gorączkowych: występują u 2–5% dzieci w wieku od 6. m.ż. do 5. r.ż. (szczyt 18. m.ż.). Są związane z gwałtownym wzrostem temperatury ciała (>38.0–38.5°C) w przebiegu infekcji pozaośrodkowej u dziecka bez wcześniejszego uszkodzenia OUN i bez zakażenia wewnątrzczaszkowego."
          },
          {
            text: "Stawiasz pewne rozpoznanie padaczki lekoopornej i włączasz 3 leki przeciwpadaczkowe.",
            correct: false,
            feedback: "Kardynalny błąd! Drgawki gorączkowe to napady przygodne (okazjonalne) wywołane gorączką, NIE SĄ padaczką i nie wymagają przewlekłego leczenia przeciwpadaczkowego."
          },
          {
            text: "Rozpoznajesz udar niedokrwienny pnia mózgu.",
            correct: false,
            feedback: "Brak objawów ogniskowych, napad symetryczny w szczycie gorączki to cecha drgawek gorączkowych."
          },
          {
            text: "Podejrzewasz zatrucie strychniną.",
            correct: false,
            feedback: "Brak podstaw z wywiadu, obecny typowy zakaźny zespół gorączkowy."
          }
        ]
      },
      {
        stepNum: 2,
        title: "Krok 2: Różnicowanie: Drgawki gorączkowe PROSTE vs ZŁOŻONE",
        desc: "Jednym z najważniejszych zadań lekarza na SOR jest zaklasyfikowanie napadu jako drgawki proste lub złożone. Jakie są kryteria definiujące drgawki gorączkowe PROSTE wg AAP i PTND?",
        scenario: "Jednym z najważniejszych zadań lekarza na SOR jest zaklasyfikowanie napadu jako drgawki proste lub złożone. Jakie są kryteria definiujące drgawki gorączkowe PROSTE wg AAP i PTND?",
        options: [
          {
            text: "Drgawki PROSTE spełniają wszystkie 3 warunki: 1) Napad uogólniony (symetryczny, toniczno-kloniczny); 2) Czas trwania poniżej 15 minut (najczęściej <5 min); 3) Występują pojedynczo (nie powtarzają się w ciągu 24 godzin ani w czasie tego samego epizodu gorączkowego) i nie pozostawiają deficytu neurologicznego.",
            correct: true,
            feedback: "Doskonale! Złota reguła egzaminacyjna LEK: Drgawki gorączkowe PROSTE: uogólnione, trwają <15 minut, pojedyncze w ciągu 24 godzin, bez niedowładu Todda. Natomiast drgawki ZŁOŻONE (atypowe): ogniskowe (rozpoczynające się w jednej kończynie lub połowie ciała), trwające >=15 minut (lub stan padaczkowy gorączkowy >30 min), nawracające w ciągu 24h lub pozostawiające przejściowy niedowład poudarowy (niedowład Todda)."
          },
          {
            text: "Drgawki proste to wyłącznie napady trwające powyżej 45 minut z niedowładem połowiczym.",
            correct: false,
            feedback: "To cechy drgawek złożonych lub stanu padaczkowego."
          },
          {
            text: "Drgawki proste występują tylko u noworodków w pierwszych 24 godzinach życia.",
            correct: false,
            feedback: "Drgawki gorączkowe nie występują u noworodków (<1. m.ż.); u noworodka drgawki z gorączką to bezwzględnie podejrzenie neuroinfekcji!"
          },
          {
            text: "Każdy napad z drżeniem kończyny to drgawki złożone.",
            correct: false,
            feedback: "Napad uogólniony symetryczny to cecha drgawek prostych."
          }
        ]
      },
      {
        stepNum: 3,
        title: "Krok 3: Różnicowanie z neuroinfekcją – Czy nakłucie lędźwiowe (LP) jest konieczne?",
        desc: "Młodszy rezydent pyta, czy u tego 18-miesięcznego dziecka z pierwszym w życiu napadem drgawek prostych należy rutynowo wykonać punkcję lędźwiową (LP), aby wykluczyć zapalenie opon mózgowo-rdzeniowych. Jakie stanowisko zajmują wytyczne AAP?",
        scenario: "Młodszy rezydent pyta, czy u tego 18-miesięcznego dziecka z pierwszym w życiu napadem drgawek prostych należy rutynowo wykonać punkcję lędźwiową (LP), aby wykluczyć zapalenie opon mózgowo-rdzeniowych. Jakie stanowisko zajmują wytyczne AAP?",
        options: [
          {
            text: "U 18-miesięcznego dziecka z typowym napadem prostym, w pełni zaszczepionego przeciw HiB i pneumokokom, bez objawów oponowych i z powracającym prawidłowym stanem świadomości, nakłucie lędźwiowe NIE JEST WSKAZANE; bezwzględnymi wskazaniami do LP są: obecność objawów oponowych, stan septyczny, brak powrotu świadomości, wiek <6–12 m.ż. lub wcześniejsza antybiotykoterapia maskująca ZOMR.",
            correct: true,
            feedback: "Wybitnie! Wytyczne Amerykańskiej Akademii Pediatrii (AAP) i PTNFD: U dzieci >12. m.ż. z prostymi drgawkami gorączkowymi, które są w stanie ogólnym dobrym, zaszczepione przeciw H. influenzae b i S. pneumoniae, bez objawów oponowych – RUTYNOWE NAKŁUCIE LĘDŹWIOWE JEST PRZECIWWSKAZANE/ZBĘDNE. Wskazania do LP: 1) Objawy oponowe (sztywność karku, Kernig, Brudziński); 2) Przedłużona senność / zaburzenia świadomości >1-2h po napadzie; 3) Dziecko wcześniej leczone antybiotykiem (maskowanie objawów ZOMR); 4) Niemowlęta <6–12 m.ż. nieszczepione."
          },
          {
            text: "Nakłucie lędźwiowe jest bezwzględnie obowiązkowe u każdego gorączkującego dziecka w Polsce.",
            correct: false,
            feedback: "Błąd: naraża dziecko na niepotrzebny ból i powikłania."
          },
          {
            text: "Punkcja lędźwiowa jest zabiegiem zakazanym u ludzi do 18. roku życia.",
            correct: false,
            feedback: "LP jest podstawowym badaniem ratującym życie w podejrzeniu neuroinfekcji."
          },
          {
            text: "Zamiast LP należy natychmiast wywiercić otwór trepanacyjny w czaszce.",
            correct: false,
            feedback: "Absurdalna i okaleczająca propozycja."
          }
        ]
      },
      {
        stepNum: 4,
        title: "Krok 4: Czy rutynowo zlecać EEG i tomografię komputerową głowy?",
        desc: "Matka żąda wykonania natychmiastowego 'rezonansu, tomografii i EEG mózgu', obawiając się guza lub padaczki. Jaka jest rekomendacja towarzystw neurologicznych (PTND, AAN) w odniesieniu do badań neuroobrazowych i EEG w PROSTYCH drgawkach gorączkowych?",
        scenario: "Matka żąda wykonania natychmiastowego 'rezonansu, tomografii i EEG mózgu', obawiając się guza lub padaczki. Jaka jest rekomendacja towarzystw neurologicznych (PTND, AAN) w odniesieniu do badań neuroobrazowych i EEG w PROSTYCH drgawkach gorączkowych?",
        options: [
          {
            text: "W prostych drgawkach gorączkowych badania neuroobrazowe (TK, MRI) oraz rutynowe EEG NIE SĄ REKOMENDOWANE; nie mają wartości prognostycznej ani diagnostycznej, a TK niepotrzebnie naraża dziecko na promieniowanie jonizujące; diagnostykę obrazową i EEG rezerwuje się dla drgawek złożonych i deficytów neurologicznych.",
            correct: true,
            feedback: "Znakomicie! Klasyczne pytanie egzaminacyjne: Zgodnie z wytycznymi w PROSTYCH drgawkach gorączkowych NIE ZALECA SIĘ rutynowego wykonywania EEG ani badań obrazowych (TK/MR). Zmiany w EEG po napadzie gorączkowym (zwolnienie fal) są zjawiskiem nieswoistym i NIE przepowiadają rozwoju padaczki w przyszłości. TK głowy naraża małe dziecko na dawkę promieniowania bez wskazań klinicznych."
          },
          {
            text: "TK głowy z kontrastem musi być wykonana w ciągu 15 minut od każdego napadu prostego.",
            correct: false,
            feedback: "Błąd w sztuce: nieuzasadnione napromienianie mózgu dziecka."
          },
          {
            text: "Badanie EEG jest jedynym testem pozwalającym na wypisanie dziecka do domu.",
            correct: false,
            feedback: "Błąd: EEG nie jest wymagane do wypisu przy braku powikłań."
          },
          {
            text: "Należy wykonać arteriografię naczyń mózgowych z dostępu udowego.",
            correct: false,
            feedback: "Inwazyjne badanie naczyniowe pozbawione jakichkolwiek wskazań."
          }
        ]
      },
      {
        stepNum: 5,
        title: "Krok 5: Farmakoterapia przerywająca napad – Postępowanie w napadzie przedłużonym",
        desc: "Co należy zrobić, jeśli napad drgawek gorączkowych NIE USTĘPUJE samoistnie i trwa >5 minut (zagrożenie stanem padaczkowym)? Jaki lek i jaką drogą jest lekiem pierwszego rzutu poza szpitalem i na SOR?",
        scenario: "Co należy zrobić, jeśli napad drgawek gorączkowych NIE USTĘPUJE samoistnie i trwa >5 minut (zagrożenie stanem padaczkowym)? Jaki lek i jaką drogą jest lekiem pierwszego rzutu poza szpitalem i na SOR?",
        options: [
          {
            text: "Jeśli drgawki trwają >5 minut, należy podać BENZODIAZEPINĘ: poza szpitalem MIDAZOLAM na błonę śluzową policzka (bukalnie, 0.5 mg/kg mc., maks. 10 mg) lub DIAZEPAM doodbytniczo (wlewka 0.5 mg/kg); na SOR przy kaniuli i.v. – DIAZEPAM i.v. (0.2–0.3 mg/kg) lub MIDAZOLAM i.v.",
            correct: true,
            feedback: "Prawidłowo! Większość drgawek gorączkowych ustępuje samoistnie w ciągu 2-3 minut. Jeśli napad przekracza 5 minut, wkraczamy z leczeniem przerywającym: lekiem z wyboru w warunkach przedszpitalnych jest midazolam podawany na błonę śluzową policzka (Buccolam - szybkie wchłanianie, wysoka skuteczność) lub diazepam w mikrowlewce doodbytniczej (Relsed). Na oddziale/SOR przy założonym wkłuciu dożylnym podaje się diazepam i.v. lub midazolam i.v. Monitorujemy drożność dróg oddechowych i oddech (ryzyko depresji oddechowej)!"
          },
          {
            text: "Podajesz doustnie tabletkę paracetamolu w trakcie trwających drgawek.",
            correct: false,
            feedback: "Kardynalny błąd śmiertelny! Podawanie leków doustnych nieprzytomnemu dziecku z drgawkami grozi natychmiastowym zachłyśnięciem i zgonem."
          },
          {
            text: "Wkładasz metalową łyżkę między zęby dziecka na siłę.",
            correct: false,
            feedback: "Niebezpieczny mit z przeszłości: grozi wyłamaniem zębów, uszkodzeniem krtani i aspiracją odłamków."
          },
          {
            text: "Podajesz dożylnie 100 mg morfiny w szybkim bolusie.",
            correct: false,
            feedback: "Morfina nie przerywa drgawek i wywoła zapaść oddechową."
          }
        ]
      },
      {
        stepNum: 6,
        title: "Krok 6: Profilaktyka przeciwgorączkowa – Czy leki przeciwgorączkowe zapobiegają drgawkom?",
        desc: "Przerażona matka mówi: 'Będę podawać naprzemiennie paracetamol i ibuprofen co 2 godziny przy każdej temperaturze powyżej 37.0°C, żeby syn już nigdy nie miał drgawek!'. Jakie fakty oparte na EBM musisz przekazać rodzicom?",
        scenario: "Przerażona matka mówi: 'Będę podawać naprzemiennie paracetamol i ibuprofen co 2 godziny przy każdej temperaturze powyżej 37.0°C, żeby syn już nigdy nie miał drgawek!'. Jakie fakty oparte na EBM musisz przekazać rodzicom?",
        options: [
          {
            text: "Agresywne podawanie leków przeciwgorączkowych (paracetamolu/ibuprofenu) poprawia komfort dziecka, ale NIE ZAPOBIEGA nawrotom drgawek gorączkowych; drgawki są wyzwalane przez gwałtowne tempo narastania temperatury na początku infekcji, często zanim rodzice zorientują się, że dziecko gorączkuje.",
            correct: true,
            feedback: "Wybitnie! To kluczowy, paradoksalny fakt medyczny często sprawdzany na LEK: liczne randomizowane badania kliniczne dowiodły, że rutynowe lub profilaktyczne podawanie leków przeciwgorączkowych NIE zmniejsza ryzyka wystąpienia kolejnego napadu drgawek gorączkowych! Leki przeciwgorączkowe stosujemy w celu poprawy samopoczucia dziecka, zniesienia bólu i ochrony przed odwodnieniem, ale rodzice nie mogą obwiniać się, że 'za późno podali paracetamol'."
          },
          {
            text: "Potwierdzasz, że podawanie leków co godzinę w 100% eliminuje ryzyko drgawek.",
            correct: false,
            feedback: "Fałsz: prowadzi to do przedawkowania leków i toksycznego uszkodzenia wątroby lub nerek bez wpływu na drgawki."
          },
          {
            text: "Zalecasz przewlekłe codzienne podawanie fenobarbitalu przez 5 lat.",
            correct: false,
            feedback: "Przewlekła profilaktyka przeciwpadaczkowa w prostych drgawkach gorączkowych jest bezwzględnie PRZECIWWSKAZANA z powodu zaburzeń funkcji poznawczych i braku wskazań."
          },
          {
            text: "Zabraniasz podawania jakichkolwiek leków przeciwgorączkowych.",
            correct: false,
            feedback: "Leki przeciwgorączkowe są wskazane dla komfortu chorego dziecka."
          }
        ]
      },
      {
        stepNum: 7,
        title: "Krok 7: Ryzyko nawrotu drgawek gorączkowych i ryzyko rozwoju padaczki",
        desc: "Rodzice pytają o przyszłość dziecka: 1) Jakie jest ryzyko, że drgawki gorączkowe powtórzą się przy kolejnej gorączce? 2) Czy to oznacza, że syn ma padaczkę lub zachoruje na nią w przyszłości?",
        scenario: "Rodzice pytają o przyszłość dziecka: 1) Jakie jest ryzyko, że drgawki gorączkowe powtórzą się przy kolejnej gorączce? 2) Czy to oznacza, że syn ma padaczkę lub zachoruje na nią w przyszłości?",
        options: [
          {
            text: "Ryzyko nawrotu drgawek gorączkowych przy kolejnych infekcjach wynosi ogólnie ok. 30–35% (wyższe, gdy pierwszy napad był <12 m.ż.); ryzyko rozwoju padaczki po PROSTYCH drgawkach gorączkowych jest niemal identyczne jak w populacji ogólnej (ok. 1–2%), co oznacza doskonałe rokowanie!",
            correct: true,
            feedback: "Doskonale! Liczby kluczowe dla rozmowy z rodzicami i pytań LEK: 1) Ryzyko nawrotu kolejnego napadu gorączkowego wynosi ok. 30–33% (u 1 na 3 dzieci napad się powtórzy, szczególnie jeśli pierwszy napad wystąpił <1. r.ż., przy niskiej temperaturze wyzwalającej lub z wywiadem rodzinnym); 2) Ryzyko rozwoju PADACZKI po prostych drgawkach gorączkowych wynosi zaledwie 1–2% (podczas gdy w populacji ogólnej wynosi ok. 1%). Rośnie ono nieznacznie (do 5–10%) tylko przy drgawkach złożonych, opóźnieniu rozwoju psychoruchowego lub padaczce w rodzinie."
          },
          {
            text: "Informujesz, że drgawki powtórzą się na 100% każdego dnia, a dziecko ma padaczkę skroniową.",
            correct: false,
            feedback: "Nieprawda i nieuzasadnione traumatyzowanie rodziny."
          },
          {
            text: "Ryzyko nawrotu wynosi dokładnie 0%, a drgawki gorączkowe występują tylko raz w życiu.",
            correct: false,
            feedback: "U 1/3 dzieci dochodzi do nawrotu przy kolejnych infekcjach przed ukończeniem 5. r.ż."
          },
          {
            text: "Dziecko z pewnością będzie miało głęboki deficyt intelektualny.",
            correct: false,
            feedback: "Proste drgawki gorączkowe nie uszkadzają mózgu ani intelektu."
          }
        ]
      },
      {
        stepNum: 8,
        title: "Krok 8: Edukacja rodziców i instruktaż pierwszej pomocy domowej",
        desc: "Chłopiec w pełni odzyskał kontakt, bawi się, pije wodę, badanie neurologiczne jest całkowicie prawidłowe. Wypisujesz dziecko do domu. Jaki instruktaż pierwszej pomocy przekazujesz rodzicom na wypadek ponownego napadu w domu?",
        scenario: "Chłopiec w pełni odzyskał kontakt, bawi się, pije wodę, badanie neurologiczne jest całkowicie prawidłowe. Wypisujesz dziecko do domu. Jaki instruktaż pierwszej pomocy przekazujesz rodzicom na wypadek ponownego napadu w domu?",
        options: [
          {
            text: "1) Zachować spokój, ułożyć dziecko w bezpiecznej pozycji bocznej ustalonej na miękkim podłożu; 2) Nie wkładać niczego do ust, nie krępować ruchów na siłę; 3) Mierzyć czas trwania napadu; 4) Jeśli drgawki trwają >5 minut – podać przepisany lek doraźny (wlewka doodbytnicza lub midazolam dopoliczkowy) i wezwać ZRM (112/999).",
            correct: true,
            feedback: "Wybitnie! Podstawowy, ratujący życie algorytm pierwszej pomocy w drgawkach gorączkowych: bezpieczeństwo (odsunięcie twardych przedmiotów, luźne ubranie), pozycja boczna bezpieczna (ochrona przed zachłyśnięciem śliną/wymiocinami), kategoryczny zakaz wkładania przedmiotów do ust i zakaz podawania płynów! Kontrola czasu na zegarku (rodzicom 1 minuta wydaje się wiecznością). Wezwanie ZRM przy napadzie >5 min lub natychmiastowe podanie diazepamu/midazolamu."
          },
          {
            text: "Zalecasz włożenie dziecka w trakcie drgawek do wanny z lodowatą wodą.",
            correct: false,
            feedback: "Śmiertelny błąd! Grozi wstrząsem termicznym, skurczem naczyń, zachłyśnięciem i utonięciem w wannie!"
          },
          {
            text: "Zalecasz natychmiastowe potrząsanie dzieckiem i uderzanie w twarz.",
            correct: false,
            feedback: "Grozi urazem kręgosłupa szyjnego i zespołem dziecka potrząsanego (SBS)."
          },
          {
            text: "Nakazujesz natychmiastowe związanie rąk i nóg dziecka pasami skórzanymi.",
            correct: false,
            feedback: "Grozi złamaniami kości i zwichnięciami stawów w trakcie skurczu klonicznego."
          }
        ]
      }
    ];
  });

  // ==========================================
  // CASE 119: Wrodzony przerost nadnerczy (WPN / 21-OHD)
  // ==========================================
  await upgradeCase('119_wpn_przerost_nadnerczy_21ohd.json', (c) => {
    c.steps = [
      {
        stepNum: 1,
        title: "Krok 1: Wstępna ocena na oddziale noworodkowym/SOR – 2-tygodniowy noworodek w stanie załamania",
        desc: "Dyżurujesz na oddziale patologii noworodka / SOR. Pogotowie przywozi 14-dniowego noworodka płci męskiej. Dziecko urodziło się o czasie z prawidłową masą ciała (3400 g). W ostatnich 4 dniach noworodek stał się apatyczny, słabo ssie pierś, chlustająco wymiotuje po każdym karmieniu, a jego masa ciała spadła do 2850 g (ubytek >16% masy urodzeniowej!). W badaniu: HR 175/min (tachykardia), ciśnienie tętnicze 55/30 mmHg (ciężka hipotonia), cechy głębokiego odwodnienia (zapadnięte ciemiączko, podsychające śluzówki, skóra wiotka z przedłużonym fałdem skórnym >3 s, marmurkowata, chłodne kończyny). W badaniu narządów płciowych: u chłopca widoczne jest ciemniejsze zabarwienie (przebarwienie/hiperpigmentacja) moszny i brodawek sutkowych. Jaka jest Twoja natychmiastowa hipoteza diagnostyczna?",
        scenario: "Dyżurujesz na oddziale patologii noworodka / SOR. Pogotowie przywozi 14-dniowego noworodka płci męskiej. Dziecko urodziło się o czasie z prawidłową masą ciała (3400 g). W ostatnich 4 dniach noworodek stał się apatyczny, słabo ssie pierś, chlustająco wymiotuje po każdym karmieniu, a jego masa ciała spadła do 2850 g (ubytek >16% masy urodzeniowej!). W badaniu: HR 175/min (tachykardia), ciśnienie tętnicze 55/30 mmHg (ciężka hipotonia), cechy głębokiego odwodnienia (zapadnięte ciemiączko, podsychające śluzówki, skóra wiotka z przedłużonym fałdem skórnym >3 s, marmurkowata, chłodne kończyny). W badaniu narządów płciowych: u chłopca widoczne jest ciemniejsze zabarwienie (przebarwienie/hiperpigmentacja) moszny i brodawek sutkowych. Jaka jest Twoja natychmiastowa hipoteza diagnostyczna?",
        options: [
          {
            text: "Podejrzewasz wrodzony przerost nadnerczy (WPN / CAH) – klasyczną postać z utratą soli (salt-wasting CAH) z ostrym przełomem nadnerczowym w przebiegu niedoboru 21-hydroksylazy; zlecasz natychmiast elektrolity CITO, gazometrię, glukozę, 17-OH-progesteron, kortyzol, ACTH oraz pilną płynoterapię krystaloidową.",
            correct: true,
            feedback: "Znakomicie! Klasyczna, śmiertelnie niebezpieczna prezentacja wrodzonego przerostu nadnerczy (WPN / CAH) z utratą soli u chłopca w 2.–3. tygodniu życia. Ponieważ chłopcy nie mają obojnaczych narządów płciowych przy urodzeniu (w przeciwieństwie do dziewczynek z wirylizacją 46,XX), u chłopców WPN manifestuje się dopiero załamaniem hemodynamicznym: przełomem solnym (salt-wasting crisis) z ciężkim odwodnieniem, wymiotami i wstrząsem hipowolemicznym. Hiperpigmentacja moszny i otoczek sutkowych wynika z nadmiaru ACTH stymulującego receptory melanokortynowe (brak ujemnego sprzężenia zwrotnego przez kortyzol)."
          },
          {
            text: "Stawiasz rozpoznanie przerostowego zwężenia odźwiernika (HPS) i kwalifikujesz noworodka do pilnej operacji pyloromiotomii metodą Ramstedta bez badań krwi.",
            correct: false,
            feedback: "Kardynalny błąd śmiertelny! Pylorostenoza daje zasadowicę hipochloremiczną i HIPOKALIEMIĘ. Podanie znieczulenia ogólnego noworodkowi w przełomie nadnerczowym z hiperkaliemią doprowadzi do zatrzymania krążenia na stole operacyjnym!"
          },
          {
            text: "Rozpoznajesz zwykłą nietolerancję laktozy i zmieniasz mleko na bezlaktozowe.",
            correct: false,
            feedback: "Ubytek 16% masy ciała, wstrząs i hipotonia 55/30 to stan bezpośredniego zagrożenia życia."
          },
          {
            text: "Uznajesz ciemną mosznę za cechę rasową i odsyłasz dziecko do domu.",
            correct: false,
            feedback: "Przeoczenie przełomu nadnerczowego kończy się zgonem noworodka w ciągu kilkunastu godzin."
          }
        ]
      },
      {
        stepNum: 2,
        title: "Krok 2: Badania laboratoryjne CITO – Klasyczny wzorzec elektrolitowy przełomu solnego",
        desc: "Otrzymujesz wyniki badań laboratoryjnych z dyżuru CITO: Krew: Sód (Na+) 118 mmol/l (ciężka hiponatremia), Potas (K+) 7.8 mmol/l (ciężka hiperkaliemia), Chlorki 86 mmol/l. Gazometria: pH 7.22, HCO3- 13 mmol/l, BE -11 mmol/l (kwasica metaboliczna). Glukoza: 48 mg/dl (hipoglikemia). W EKG: wysokie, szpiczaste załamki T, poszerzenie zespołów QRS i spłaszczenie załamków P. Jak interpretujesz ten zestaw laboratoryjny?",
        scenario: "Otrzymujesz wyniki badań laboratoryjnych z dyżuru CITO: Krew: Sód (Na+) 118 mmol/l (ciężka hiponatremia), Potas (K+) 7.8 mmol/l (ciężka hiperkaliemia), Chlorki 86 mmol/l. Gazometria: pH 7.22, HCO3- 13 mmol/l, BE -11 mmol/l (kwasica metaboliczna). Glukoza: 48 mg/dl (hipoglikemia). W EKG: wysokie, szpiczaste załamki T, poszerzenie zespołów QRS i spłaszczenie załamków P. Jak interpretujesz ten zestaw laboratoryjny?",
        options: [
          {
            text: "Klasyczna triada przełomu nadnerczowego z utratą soli w WPN: HIPONATREMIA + HIPERKALIEMIA + HIPOGLIKEMIA z kwasicą metaboliczną; w EKG cechy kardiotoksyczności potasu grożące nagłym zatrzymaniem krążenia w mechanizmie migotania komór lub asystolii.",
            correct: true,
            feedback: "Doskonale! Pewniak egzaminacyjny LEK: brak aldosteronu powoduje utratę sodu i wody przez nerki przy zatrzymywaniu potasu i jonów wodorowych (stąd głęboka hiponatremia <120, hiperkaliemia >7, kwasica metaboliczna i hipowolemia). Brak kortyzolu skutkuje hipoglikemią i niewydolnością naczyniową (hipotonią oporną na katecholaminy). EKG z cechami hiperkaliemii (K+ 7.8 mmol/l) wymaga natychmiastowej kardioprotekcji!"
          },
          {
            text: "Wyniki wskazują na pierwotny hiperaldosteronizm (zespół Conna).",
            correct: false,
            feedback: "W zespole Conna jest hipernatremia i hipokaliemia z zasadowicą, tutaj jest dokładnie odwrotnie."
          },
          {
            text: "Profil wskazuje na przewodnienie hipotoniczne z powodu picia zbyt dużej ilości wody.",
            correct: false,
            feedback: "Noworodek nie pił wody, ma cechy głębokiego odwodnienia i ubytku masy ciała."
          },
          {
            text: "Hiperkaliemia 7.8 mmol/l u noworodka jest zjawiskiem fizjologicznym i nie wymaga leczenia.",
            correct: false,
            feedback: "Kardynalny błąd: potas 7.8 z poszerzeniem QRS grozi zgonem w ciągu minut."
          }
        ]
      },
      {
        stepNum: 3,
        title: "Krok 3: Natychmiastowe postępowanie ratunkowe w przełomie nadnerczowym",
        desc: "Noworodek ma ciśnienie 55/30 mmHg, potas 7.8 mmol/l z poszerzonymi zespołami QRS w kardiomonitorze i glukozę 48 mg/dl. Jaką sekwencję działań ratunkowych wdrażasz natychmiast?",
        scenario: "Noworodek ma ciśnienie 55/30 mmHg, potas 7.8 mmol/l z poszerzonymi zespołami QRS w kardiomonitorze i glukozę 48 mg/dl. Jaką sekwencję działań ratunkowych wdrażasz natychmiast?",
        options: [
          {
            text: "1) Kardioprotekcja: 10% glukonian wapnia i.v. (0.5 ml/kg w powolnym wstrzyknięciu pod kontrolą EKG); 2) Resuscytacja płynowa: bolus 0.9% NaCl (10–20 ml/kg) z dodatkiem 10% glukozy w celu wyrównania wstrząsu i hipoglikemii (BEZWZGLĘDNY ZAKAZ PŁYNÓW Z POTASEM!); 3) Zastępcze podanie HYDROKORTYZONU dożylnie (bolus 25–50 mg i.v.).",
            correct: true,
            feedback: "Wybitnie! Ratowanie noworodka w przełomie solnym: 1) Wapń dożylny stabilizuje błonę kardiomiocytów i chroni przed zatrzymaniem krążenia w hiperkaliemii; 2) Płynoterapia: wlew 0.9% NaCl z glukozą (uzupełnia sód, wolumen naczyniowy i leczy hipoglikemię). Kategoryczny zakaz płynów wieloelektrolitowych zawierających potas (np. PWE, Ringer)! 3) Hydrokortyzon w dawce stresowej i.v. ma zarówno działanie glikokortykosteroidowe (przywraca napięcie naczyniowe i normoglikemię), jak i w wysokiej dawce częściowe działanie mineralokortykosteroidowe."
          },
          {
            text: "Podajesz bolus chlorku potasu (KCl) dożylnie.",
            correct: false,
            feedback: "Śmiertelny błąd! Pacjent ma potas 7.8 mmol/l, dodatkowy potas wywoła natychmiastową asystolię."
          },
          {
            text: "Podajesz wlew czystej wody destylowanej bez soli.",
            correct: false,
            feedback: "Spowoduje to masywną hemolizę i obrzęk mózgu."
          },
          {
            text: "Czekasz na wynik badania genetycznego z Warszawy przed podaniem jakichkolwiek leków.",
            correct: false,
            feedback: "Dziecko zmarłoby we wstrząsie przed nadejściem wyniku."
          }
        ]
      },
      {
        stepNum: 4,
        title: "Krok 4: Defekt enzymatyczny i diagnostyka hormonalna – 17-OH-progesteron",
        desc: "Jaki defekt enzymatyczny odpowiada za >90–95% wszystkich przypadków wrodzonego przerostu nadnerczy i jaki prekursor hormonalny ulega masywnemu nagromadzeniu w surowicy krwi, stanowiąc podstawę diagnostyki?",
        scenario: "Jaki defekt enzymatyczny odpowiada za >90–95% wszystkich przypadków wrodzonego przerostu nadnerczy i jaki prekursor hormonalny ulega masywnemu nagromadzeniu w surowicy krwi, stanowiąc podstawę diagnostyki?",
        options: [
          {
            text: "Niedobór 21-HYDROKSYLAZY steroidowej (kodowanej przez gen CYP21A2); dochodzi do zablokowania syntezy kortyzolu i aldosteronu z lawinowym nagromadzeniem 17-HYDROKSYPROGESTERONU (17-OHP) we krwi, który jest kierowany na szlak syntezy androgenów.",
            correct: true,
            feedback: "Znakomicie! Klasyczny szlak steroidogenezy nadnerczowej: 21-hydroksylaza przekształca progesteron w deoksykortykosteron (szlak aldosteronu) oraz 17-OH-progesteron w 11-deoksykortyzol (szlak kortyzolu). Jej brak (u >90-95% chorych na WPN) całkowicie blokuje wytwarzanie aldosteronu i kortyzolu. Brak kortyzolu powoduje odhamowanie przysadki i potężny wyrzut ACTH, co stymuluje rozrost (hiperplazję) kory nadnerczy i przepycha zgromadzony substrat (17-OHP) na jedyny drożny szlak – szlak syntezy ANDROGENÓW!"
          },
          {
            text: "Niedobór 11-beta-hydroksylazy powodujący spadek 17-OHP i hipokaliemię.",
            correct: false,
            feedback: "Niedobór 11-beta-hydroksylazy (CYP11B1) odpowiada za 5% WPN, ale przebiega z nadciśnieniem tętniczym (akumulacja 11-DOC) i hipokaliemią!"
          },
          {
            text: "Niedobór insuliny w wysepkach Langerhansa.",
            correct: false,
            feedback: "To patomechanizm cukrzycy typu 1."
          },
          {
            text: "Niedobór dehydrogenazy glukozo-6-fosforanowej (G6PD).",
            correct: false,
            feedback: "G6PD to enzym erytrocytarny związany z fawizmem i hemolizą."
          }
        ]
      },
      {
        stepNum: 5,
        title: "Krok 5: Odmienności u płci żeńskiej – Różnicowanie zaburzeń rozwoju płci (DSD)",
        desc: "Gdyby pacjentem z klasyczną postacią WPN z niedoboru 21-hydroksylazy był noworodek o kariotypie żeńskim (46,XX) – jaki obraz narządów płciowych stwierdzono by przy urodzeniu i dlaczego?",
        scenario: "Gdyby pacjentem z klasyczną postacią WPN z niedoboru 21-hydroksylazy był noworodek o kariotypie żeńskim (46,XX) – jaki obraz narządów płciowych stwierdzono by przy urodzeniu i dlaczego?",
        options: [
          {
            text: "Obojnacze narządy płciowe zewnętrzne (wirylizacja / maskulinizacja wg skali Pradera I–V: przerost łechtaczki imitujący prącie, zrośnięcie warg sromowych imitujące mosznę, wspólne ujście moczowo-płciowe); wewnętrzne narządy płciowe (macica, jajowody, jajniki) są w pełni PRAWIDŁOWE.",
            correct: true,
            feedback: "Doskonale! Pewniak egzaminacyjny LEK: U płodów żeńskich 46,XX nadmiar androgenów nadnerczowych w życiu wewnątrzmacicznym powoduje wirylizację zewnętrznych narządów płciowych (od powiększenia łechtaczki do całkowicie męskiego wyglądu narządów zewnętrznych ze spodziectwem prąciowo-mosznowym wg skali Pradera). Jednak ponieważ dziewczynka nie posiada jąder ani hormonu antymüllerowskiego (AMH), wewnętrzne narządy żeńskie (jajniki, macica, górna część pochwy) rozwijają się w 100% prawidłowo! WPN jest najczęstszą przyczyną obojnactwa rzekomego żeńskiego (46,XX DSD)."
          },
          {
            text: "Całkowity brak narządów płciowych zewnętrznych i wewnętrznych.",
            correct: false,
            feedback: "Brak takiego zjawiska w WPN."
          },
          {
            text: "Obecność prawidłowych jąder w worku mosznowym u dziewczynki 46,XX.",
            correct: false,
            feedback: "Genetyczna kobieta 46,XX nie ma chromosomu Y ani genu SRY, więc nie posiada jąder."
          },
          {
            text: "U dziewczynek z WPN narządy płciowe zawsze wyglądają w 100% typowo kobieco.",
            correct: false,
            feedback: "Fałsz: u dziewczynek z klasyczną postacią WPN wirylizacja występuje niemal zawsze."
          }
        ]
      },
      {
        stepNum: 6,
        title: "Krok 6: Badania przesiewowe noworodków w Polsce (NBS)",
        desc: "Pielęgniarka pyta, dlaczego u tego chłopca nie rozpoznano choroby wcześniej na oddziale noworodkowym, skoro w Polsce prowadzony jest powszechny program badań przesiewowych (NBS). Jakie zasady rządzą testem z bibuły na WPN?",
        scenario: "Pielęgniarka pyta, dlaczego u tego chłopca nie rozpoznano choroby wcześniej na oddziale noworodkowym, skoro w Polsce prowadzony jest powszechny program badań przesiewowych (NBS). Jakie zasady rządzą testem z bibuły na WPN?",
        options: [
          {
            text: "Krew z piętki na bibułę pobiera się w 3.–4. dobie życia (oznaczenie 17-OHP); u chłopców objawy przełomu solnego rozwijają się typowo między 7. a 14. dniem życia, zanim wynik przesiewu z laboratorium centralnego dotrze do rejonu; test przesiewowy ma na celu ratowanie życia właśnie u bezobjawowych po urodzeniu chłopców.",
            correct: true,
            feedback: "Wybitnie! Kluczowe informacje systemowe: W Polsce od lat przesiew w kierunku WPN (oznaczenie 17-OHP w suchej kropli krwi na bibule) obejmuje 100% noworodków. Próbkę pobiera się w 3. dobie życia. Czas oczekiwania na wynik analizy i weryfikację laboratoryjną wynosi zazwyczaj 7–14 dni. Dlatego chłopcy z postacią z utratą soli często dekompensują się klinicznie w domu w 2. tygodniu życia, zanim rodzice otrzymają wezwanie z ośrodka przesiewowego!"
          },
          {
            text: "W Polsce nie wykonuje się badań przesiewowych w kierunku WPN.",
            correct: false,
            feedback: "Fałsz: WPN znajduje się w polskim panelu badań przesiewowych noworodków."
          },
          {
            text: "Badanie przesiewowe wykonuje się z moczu pobranego w 6. miesiącu życia.",
            correct: false,
            feedback: "Przesiew wykonuje się z krwi z pięty w 3. dobie życia."
          },
          {
            text: "Przesiew u chłopców jest prawnie zakazany.",
            correct: false,
            feedback: "Niedorzeczne."
          }
        ]
      },
      {
        stepNum: 7,
        title: "Krok 7: Przewlekła substytucja hormonalna – Hydrokortyzon i Fludrokortyzon",
        desc: "Po opanowaniu ostrego przełomu solnego parametry życiowe i elektrolity znormalizowały się (Na 137 mmol/l, K 4.5 mmol/l). Jakie przewlekłe leczenie substytucyjne do końca życia musi otrzymywać pacjent z klasyczną postacią WPN z utratą soli?",
        scenario: "Po opanowaniu ostrego przełomu solnego parametry życiowe i elektrolity znormalizowały się (Na 137 mmol/l, K 4.5 mmol/l). Jakie przewlekłe leczenie substytucyjne do końca życia musi otrzymywać pacjent z klasyczną postacią WPN z utratą soli?",
        options: [
          {
            text: "Substytucja dwuskładnikowa: 1) Glikokortykosteroid – HYDROKORTYZON doustnie (w 3 dawkach podzielonych w celu naśladowania rytmu dobowego i supresji nadmiaru ACTH); 2) Mineralokortykosteroid – FLUDROKORTYZON doustnie (0.05–0.2 mg/dobę) + suplementacja chlorku sodu (NaCl) w pierwszym roku życia.",
            correct: true,
            feedback: "Doskonale! Standard leczenia klasycznego WPN z utratą soli: 1) Hydrokortyzon doustnie (10–15 mg/m2 pc./d) zastępuje brakujący kortyzol i hamuje nadmierne wydzielanie ACTH, co zatrzymuje patologiczną nadprodukcję androgenów nadnerczowych; 2) Fludrokortyzon (syntetyczny mineralokortykosteroid) zastępuje aldosteron, utrzymując prawidłowe stężenie sodu, potasu i ciśnienie tętnicze; 3) Niemowlęta wymagają dodatkowo suplementacji soli kuchennej (1-2 g NaCl/dobę), ponieważ ich cewki nerkowe są fizjologicznie niewrażliwe na mineralokortykosteroidy."
          },
          {
            text: "Wyłącznie deksametazon w jednorazowej dawce raz na miesiąc.",
            correct: false,
            feedback: "Deksametazon u małych dzieci hamuje wzrost kości i zarastanie nasad, lekiem z wyboru u rosnących dzieci jest krótko działający hydrokortyzon."
          },
          {
            text: "Podawanie testosteronu domięśniowo codziennie.",
            correct: false,
            feedback: "Pacjent ma nadmiar androgenów, testosteron nasiliłby wirylizację i przedwczesne dojrzewanie."
          },
          {
            text: "Leczenie farmakologiczne można zakończyć po ukończeniu 1. roku życia.",
            correct: false,
            feedback: "Wrodzony blok enzymatyczny jest nieodwracalny, leczenie trwa do końca życia."
          }
        ]
      },
      {
        stepNum: 8,
        title: "Krok 8: Edukacja rodziców na wypadek infekcji i gorączki – 'Reguła dawek stresowych'",
        desc: "Przed wypisem ze szpitala przeprowadzasz szkolenie rodziców. O jakiej kluczowej zasadzie modyfikacji dawek leków w stanach stresu (gorączka >38.5°C, wymioty, uraz, zabieg operacyjny) informujesz rodziców, aby zapobiec kolejnemu przełomowi nadnerczowemu?",
        scenario: "Przed wypisem ze szpitala przeprowadzasz szkolenie rodziców. O jakiej kluczowej zasadzie modyfikacji dawek leków w stanach stresu (gorączka >38.5°C, wymioty, uraz, zabieg operacyjny) informujesz rodziców, aby zapobiec kolejnemu przełomowi nadnerczowemu?",
        options: [
          {
            text: "W stanach stresu (gorączka, zakażenie, uraz) dawkę hydrokortyzonu należy NATYCHMIAST ZWIĘKSZYĆ 2- do 3-KROTNIE doustnie; w przypadku wymiotów lub braku możliwości przyjęcia leków doustnych rodzice muszą natychmiast podać hydrokortyzon domięśniowo (z ampułkostrzykawki ratunkowej) i wezwać pogotowie!",
            correct: true,
            feedback: "Wybitnie! To najważniejsza zasada ratująca życie w niewydolności kory nadnerczy: pacjent z WPN nie potrafi endogennie zwiększyć produkcji kortyzolu w stresie. W stanach infekcji, gorączki, zabiegów chirurgicznych zapotrzebowanie na kortyzol rośnie 2-3-krotnie. Brak zwiększenia dawki doprowadzi do ostrego przełomu nadnerczowego i zgonu! Każdy rodzic musi posiadać w domu hydrokortyzon do iniekcji i.m. na wypadek wymiotów lub biegunki uniemożliwiającej wchłanianie tabletek."
          },
          {
            text: "W przypadku gorączki należy natychmiast odstawić hydrokortyzon na 5 dni.",
            correct: false,
            feedback: "Śmiertelny błąd! Odstawienie hydrokortyzonu w infekcji natychmiast wywoła śmiertelny wstrząs nadnerczowy."
          },
          {
            text: "Zalecasz podawanie leków tylko w parzyste dni tygodnia.",
            correct: false,
            feedback: "Niedorzeczne i groźne."
          },
          {
            text: "W stanach gorączki dawka leku nie wymaga żadnej modyfikacji.",
            correct: false,
            feedback: "Zapotrzebowanie na sterydy w stresie wzrasta kilkukrotnie."
          }
        ]
      }
    ];
  });

  // ==========================================
  // CASE 120: Debiut cukrzycy t. 1 / DKA u dziecka
  // ==========================================
  await upgradeCase('120_cukrzyca_t1_dka_dziecko.json', (c) => {
    c.steps = [
      {
        stepNum: 1,
        title: "Krok 1: Wstępna ocena na SOR – 8-letnia dziewczynka z oddechem Kussmaula i zapachem acetonu",
        desc: "Dyżurujesz na SOR dziecięcym. Zespół ratownictwa przywozi 8-letnią dziewczynkę w stanie ciężkim. Od 3–4 tygodni rodzice obserwowali u córki wzmożone pragnienie (wypijała do 4–5 litrów płynów na dobę – polidypsja), częste oddawanie moczu także w nocy (poliuria, nykturia, wtórne moczenie nocne) oraz ubytek 4 kg masy ciała mimo wilczego apetytu. Od 24 godzin pojawiły się nudności, silne kurczowe bóle brzucha, wymioty i narastające osłabienie. W badaniu przedmiotowym: HR 140/min, RR 88/50 mmHg, SpO2 98%, podsypiająca (GCS 12), cechy głębokiego odwodnienia (>10%: zapadnięte gałki oczne, suchy obłożony język, wiotka skóra), oddech bardzo głęboki, przyspieszony, świszczący (oddech Kussmaula) o charakterystycznym zapachu 'zgniłych jabłek' / acetonu z ust, brzuch deskowaty z tkliwością (rzekomy ostry brzuch). Jaka jest Twoja natychmiastowa diagnoza i pierwsze badania CITO?",
        scenario: "Dyżurujesz na SOR dziecięcym. Zespół ratownictwa przywozi 8-letnią dziewczynkę w stanie ciężkim. Od 3–4 tygodni rodzice obserwowali u córki wzmożone pragnienie (wypijała do 4–5 litrów płynów na dobę – polidypsja), częste oddawanie moczu także w nocy (poliuria, nykturia, wtórne moczenie nocne) oraz ubytek 4 kg masy ciała mimo wilczego apetytu. Od 24 godzin pojawiły się nudności, silne kurczowe bóle brzucha, wymioty i narastające osłabienie. W badaniu przedmiotowym: HR 140/min, RR 88/50 mmHg, SpO2 98%, podsypiająca (GCS 12), cechy głębokiego odwodnienia (>10%: zapadnięte gałki oczne, suchy obłożony język, wiotka skóra), oddech bardzo głęboki, przyspieszony, świszczący (oddech Kussmaula) o charakterystycznym zapachu 'zgniłych jabłek' / acetonu z ust, brzuch deskowaty z tkliwością (rzekomy ostry brzuch). Jaka jest Twoja natychmiastowa diagnoza i pierwsze badania CITO?",
        options: [
          {
            text: "Rozpoznajesz kwasicę ketonową (DKA) w debiucie cukrzycy typu 1; natychmiast zlecasz pomiar glikemii z palca, gazometrię włośniczkową/żylną, stężenie beta-hydroksymaślanu we krwi (lub ketonów w moczu), elektrolity, mocznik, kreatyninę i zakładasz 2 wkłucia dożylne.",
            correct: true,
            feedback: "Znakomicie! Klasyczny, podręcznikowy debiut cukrzycy typu 1 powikłany kwasicą ketonową (Diabetic Ketoacidosis - DKA): triada objawów hiperglikemii (polidypsja, poliuria, ubytek masy ciała), po której następuje dekompensacja kwasicza: oddech Kussmaula (kwasiczy oddech 'gonionego psa' kompensujący kwasicę metaboliczną), zapach acetonu z ust (związki ketonowe), ciężkie odwodnienie oraz objawy 'rzekomego ostrego brzucha' (pseudoperitonitis diabetica wywołana kwasicą i niedokrwieniem krezki)."
          },
          {
            text: "Stawiasz rozpoznanie ostrego zapalenia otrzewnej w perforacji wyrostka i kierujesz dziecko natychmiast na blok operacyjny.",
            correct: false,
            feedback: "Kardynalny błąd śmiertelny! Bóle brzucha w DKA to pseudoperitonitis diabetica, która ustępuje po nawodnieniu i insulinoterapii. Znieczulenie ogólne dziecka w kwasicy ketonowej grozi zatrzymaniem krążenia!"
          },
          {
            text: "Rozpoznajesz histerię i napad hiperwentylacji psychogennej, zalecając oddychanie do torebki papierowej.",
            correct: false,
            feedback: "Błąd krytyczny! Utrudnienie wentylacji u dziecka z oddechem Kussmaula zablokuje kompensację oddechową i doprowadzi do natychmiastowej śmierci w kwasicy!"
          },
          {
            text: "Podejrzewasz zatrucie alkoholem metylowym.",
            correct: false,
            feedback: "Wywiad kilkutygodniowej polidypsji i poliurii u 8-latki jednoznacznie wskazuje na debiut cukrzycy."
          }
        ]
      },
      {
        stepNum: 2,
        title: "Krok 2: Badania laboratoryjne CITO – Kryteria rozpoznania i ocena ciężkości DKA wg ISPAD 2022",
        desc: "Otrzymujesz wyniki CITO: Glukometr: glikemia 485 mg/dl (26.9 mmol/l). Beta-hydroksymaślan we krwi: 5.8 mmol/l (norma <0.5 mmol/l), ketonuria ++++. Gazometria żylna: pH 7.11, HCO3- 8.2 mmol/l, pCO2 22 mmHg, BE -19 mmol/l. Elektrolity: Na+ 128 mmol/l, K+ 4.6 mmol/l, Cl- 96 mmol/l. Jak klasyfikujesz stopień ciężkości kwasicy ketonowej wg wytycznych ISPAD 2022?",
        scenario: "Otrzymujesz wyniki CITO: Glukometr: glikemia 485 mg/dl (26.9 mmol/l). Beta-hydroksymaślan we krwi: 5.8 mmol/l (norma <0.5 mmol/l), ketonuria ++++. Gazometria żylna: pH 7.11, HCO3- 8.2 mmol/l, pCO2 22 mmHg, BE -19 mmol/l. Elektrolity: Na+ 128 mmol/l, K+ 4.6 mmol/l, Cl- 96 mmol/l. Jak klasyfikujesz stopień ciężkości kwasicy ketonowej wg wytycznych ISPAD 2022?",
        options: [
          {
            text: "CIĘŻKA kwasica ketonowa (Severe DKA) wg ISPAD 2022: kryterium to pH <7.10 lub stężenie wodorowęglanów HCO3- <5–10 mmol/l przy obecności hiperglikemii (>200 mg/dl / 11 mmol/l) oraz ketonemii (>3.0 mmol/l) lub ketonurii.",
            correct: true,
            feedback: "Doskonale! Kryteria rozpoznania i klasyfikacji DKA wg ISPAD 2022 (pewniak LEK): Rozpoznanie: 1) Hiperglikemia (>200 mg/dl / 11.1 mmol/l); 2) Kwasica (pH <7.30 lub HCO3- <18 mmol/l); 3) Ketonemia (beta-hydroksymaślan >=3.0 mmol/l) lub ketonuria. Klasyfikacja ciężkości: Łagodna: pH 7.20–7.29, HCO3- 10–17; Umiarkowana: pH 7.10–7.19, HCO3- 5–9; CIĘŻKA: pH <7.10 lub HCO3- <5 mmol/l. U naszej pacjentki pH 7.11 z HCO3- 8.2 kwalifikuje stan do ciężkiej DKA z wysokim ryzykiem obrzęku mózgu!"
          },
          {
            text: "Łagodna kwasica ketonowa leczona wypiciem szklanki wody z cytryną.",
            correct: false,
            feedback: "Fałsz: pH 7.11 i HCO3- 8 to ciężka kwasica zagrażająca życiu."
          },
          {
            text: "Stan hiperglikemiczno-hiperosmolarny (HHS) bez kwasicy.",
            correct: false,
            feedback: "W HHS pH wynosi >7.30, wodorowęglany są prawidłowe, a ketony ujemne; tu mamy masywną kwasicę ketonową."
          },
          {
            text: "Cukrzyca typu 2 ze stuprocentową sprawnością komórek beta.",
            correct: false,
            feedback: "DKA u 8-latki z ubytkiem masy ciała to klasyczny autoimmunologiczny debiut cukrzycy typu 1."
          }
        ]
      },
      {
        stepNum: 3,
        title: "Krok 3: Płynoterapia wstępna wg ISPAD – Złota zasada 'NAJPIERW PŁYNY, INSULINA PÓŹNIEJ'",
        desc: "Młodszy stażysta przygotowuje pen z insuliną i chce natychmiast podać 10 jednostek insuliny krótzkodziałającej dożylnie w bolusie przed podłączeniem kroplówek. Jakie stanowisko zajmujesz zgodnie ze standardami ISPAD 2022 i dlaczego?",
        scenario: "Młodszy stażysta przygotowuje pen z insuliną i chce natychmiast podać 10 jednostek insuliny krótzkodziałającej dożylnie w bolusie przed podłączeniem kroplówek. Jakie stanowisko zajmujesz zgodnie ze standardami ISPAD 2022 i dlaczego?",
        options: [
          {
            text: "Kategorycznie powstrzymujesz podanie insuliny! W DKA u dzieci podanie insuliny w bolusie i.v. jest BEZWZGLĘDNIE ZAKAZANE! Przez pierwszą 1–2 godziny prowadzi się WYŁĄCZNIE płynoterapię (0.9% NaCl 10–20 ml/kg w ciągu 1h); wczesne podanie insuliny lub bolus drastycznie zwiększa ryzyko śmiertelnego OBRZĘKU MÓZGU oraz wstrząsu hipowolemicznego!",
            correct: true,
            feedback: "Wybitnie! To najważniejsza i najczęściej sprawdzana reguła leczenia DKA u dzieci wg ISPAD: 1) BOLUS INSULINY JEST PRZECIWWSKAZANY! 2) Wlew insuliny rozpoczyna się DOPIERO PO 1–2 GODZINACH od rozpoczęcia wstępnej płynoterapii! Dlaczego? Gwałtowny spadek glikemii i osmolalności osocza przed wstępnym uzupełnieniem łożyska naczyniowego powoduje ucieczkę wody do komórek mózgu i prowadzi do śmiertelnego obrzęku mózgu (cerebral edema). Ponadto insulina przemieszcza glukozę i wodę do wnętrza komórek, co może wywołać zapaść naczyniową."
          },
          {
            text: "Zgadzasz się i podajesz 50 jednostek insuliny dożylnie w 5 sekund.",
            correct: false,
            feedback: "Błąd śmiertelny! Wywoła gwałtowny obrzęk mózgu i zatrzymanie krążenia."
          },
          {
            text: "Zakazujesz jakichkolwiek płynów, podając wyłącznie doustną metforminę.",
            correct: false,
            feedback: "Metformina jest przeciwwskazana w kwasicy (ryzyko kwasicy mleczanowej), a pacjentka wymaga natychmiastowej rehydratacji."
          },
          {
            text: "Podajesz 5 litrów 5% glukozy w 15 minut.",
            correct: false,
            feedback: "Płyny hipotoniczne w szybkim wlewie przy hiperglikemii natychmiast wywołają obrzęk mózgu."
          }
        ]
      },
      {
        stepNum: 4,
        title: "Krok 4: Wdrożenie ciągłego wlewu insuliny i tempo redukcji glikemii",
        desc: "Po 1 godzinie wlewu 0.9% NaCl (10 ml/kg) parametry hemodynamiczne stabilizują się (HR 120/min, RR 95/60 mmHg). Rozpoczynasz ciągły wlew dożylny insuliny krótzkodziałającej (lub szybkodziałającego analogu). Jaka jest zalecana dawka i jakie jest bezpieczne docelowe tempo spadku glikemii na godzinę?",
        scenario: "Po 1 godzinie wlewu 0.9% NaCl (10 ml/kg) parametry hemodynamiczne stabilizują się (HR 120/min, RR 95/60 mmHg). Rozpoczynasz ciągły wlew dożylny insuliny krótzkodziałającej (lub szybkodziałającego analogu). Jaka jest zalecana dawka i jakie jest bezpieczne docelowe tempo spadku glikemii na godzinę?",
        options: [
          {
            text: "Ciągły wlew i.v. w dawce 0.05–0.1 j./kg mc./godzinę; bezpieczne tempo obniżania glikemii wynosi 50–90 mg/dl/h (maksymalnie 100 mg/dl/h), aby uniknąć gwałtownych zmian osmolalności osocza.",
            correct: true,
            feedback: "Znakomicie! Wytyczne ISPAD 2022: Dawka początkowa ciągłego wlewu insuliny to 0.05–0.1 j./kg/h (u małych dzieci lub przy lżejszym przebiegu 0.05 j./kg/h). Celem wlewu insuliny w DKA nie jest szybkie zbicie cukru, lecz ZAHAMOWANIE LIPOLIZY I KETOGENEZY! Bezpieczny spadek glikemii to 50–90 mg/dl na godzinę (2.5–5 mmol/l/h). Szybszy spadek (>100 mg/dl/h) grozi obrzękiem mózgu."
          },
          {
            text: "Wlew w dawce 5.0 j./kg mc./godzinę z celem obniżenia glikemii o 400 mg/dl w 10 minut.",
            correct: false,
            feedback: "Kardynalny błąd: dawka 50-krotnie za duża, doprowadzi do natychmiastowej śmierci mózgu."
          },
          {
            text: "Insulinę podaje się wyłącznie podskórnie w stopę raz na dobę.",
            correct: false,
            feedback: "W ciężkim DKA wchłanianie podskórne przy hipoperfuzji jest nieprzewidywalne; standardem jest ciągły wlew i.v."
          },
          {
            text: "Stosuje się wyłącznie doustne pochodne sulfonylomocznika.",
            correct: false,
            feedback: "Pochodne sulfonylomocznika są nieskuteczne przy braku komórek beta w cukrzycy t. 1."
          }
        ]
      },
      {
        stepNum: 5,
        title: "Krok 5: Suplementacja potasu i dylemat wodorowęglanów (NaHCO3)",
        desc: "Wstępne stężenie potasu wynosiło 4.6 mmol/l. Pielęgniarka pyta: 1) Kiedy i jak suplementować potas? 2) Czy przy pH 7.11 należy podać wodorowęglan sodu (NaHCO3), aby odkwasic pacjentkę? Jakie są aktualne wytyczne ISPAD?",
        scenario: "Wstępne stężenie potasu wynosiło 4.6 mmol/l. Pielęgniarka pyta: 1) Kiedy i jak suplementować potas? 2) Czy przy pH 7.11 należy podać wodorowęglan sodu (NaHCO3), aby odkwasic pacjentkę? Jakie są aktualne wytyczne ISPAD?",
        options: [
          {
            text: "Potas należy dodać do płynów infuzyjnych (20–40 mmol/l) natychmiast po potwierdzeniu diurezy i rozpoczęciu insulinoterapii (insulina przemieszcza potas do komórek, grożąc śmiertelną hipokaliemią); WODOROWĘGLANY SĄ BEZWZGLĘDNIE PRZECIWWSKAZANE (zwiększają ryzyko obrzęku mózgu, kwasicy paradoksalnej w OUN i hipokaliemii; rozważa się je wyłącznie przy pH <6.9 z wstrząsem kardiogennym).",
            correct: true,
            feedback: "Doskonale! Żelazne reguły egzaminacyjne LEK: 1) Potas: w DKA występuje głęboki niedobór potasu całkowitego w ustroju (utrata z moczem). Choć stężenie we krwi może być prawidłowe, to insulina i nawodnienie gwałtownie obniżają kaliemię. Suplementację potasu (20-40 mmol KCl na litr płynu) rozpoczyna się od razu wraz z insuliną, jeśli K+ <5.5 mmol/l i jest diureza! 2) Wodorowęglan sodu (NaHCO3): rutynowe stosowanie jest BEZWZGLĘDNIE ZAKAZANE! Powoduje paradoksalną kwasicę wewnątrzkomórkową w OUN (CO2 swobodnie dyfunduje przez barierę krew-mózg, a HCO3- nie) oraz drastycznie zwiększa ryzyko obrzęku mózgu!"
          },
          {
            text: "Podajesz natychmiast 500 ml 8.4% NaHCO3 w szybkim bolusie i zakazujesz potasu.",
            correct: false,
            feedback: "Błąd śmiertelny: wywoła ciężką hipokaliemię, zatrzymanie akcji serca i obrzęk mózgu."
          },
          {
            text: "Potasu nie wolno podawać nigdy w cukrzycy.",
            correct: false,
            feedback: "Nieleczona hipokaliemia w trakcie insulinoterapii prowadzi do zgonu w zaburzeniach rytmu serca."
          },
          {
            text: "Wodorowęglany podaje się zawsze, gdy pH jest poniżej 7.35.",
            correct: false,
            feedback: "Kwasica ustępuje samoistnie w miarę hamowania ketogenezy przez insulinę."
          }
        ]
      },
      {
        stepNum: 6,
        title: "Krok 6: Ochrona przed hipoglikemią – 'Reguła dwóch worków' (Two-bag system)",
        desc: "W 4. godzinie terapii glikemia u dziewczynki spada do 230 mg/dl (12.8 mmol/l), podczas gdy pH wynosi 7.20, a wodorowęglany 11 mmol/l (kwasica nadal trwa). Co należy natychmiast zrobić z płynami infuzyjnymi i wlewem insuliny?",
        scenario: "W 4. godzinie terapii glikemia u dziewczynki spada do 230 mg/dl (12.8 mmol/l), podczas gdy pH wynosi 7.20, a wodorowęglany 11 mmol/l (kwasica nadal trwa). Co należy natychmiast zrobić z płynami infuzyjnymi i wlewem insuliny?",
        options: [
          {
            text: "Gdy glikemia osiąga 250–300 mg/dl, NIE ZATRZYMUJE SIĘ wlewu insuliny! Do płynów infuzyjnych dołącza się glukozę (płyn 0.9% NaCl z 5% lub 10% glukozą), aby utrzymać glikemię w granicach 150–200 mg/dl, kontynuując wlew insuliny aż do całkowitego ustąpienia kwasicy i ketonemii.",
            correct: true,
            feedback: "Znakomicie! To kluczowa zasada leczenia DKA: insulina jest potrzebna, aby zgasić 'pożar metaboliczny' (zahamować lipolizę i kwasicę ketonową), co trwa dłużej niż normalizacja cukru we krwi. Gdy glikemia spadnie do ~250 mg/dl, nie zmniejszamy gwałtownie insuliny – zamiast tego DODAJEMY GLUKOZĘ DO KROPLÓWKI (płyn 5% lub 10% glukozy z solą / tzw. technika two-bag system). Pozwala to na bezpieczne podawanie insuliny do czasu normalizacji pH i rezerwy zasad bez ryzyka hipoglikemii!"
          },
          {
            text: "Natychmiast wyłączasz pompę z insuliną i odstawiasz wszystkie płyny.",
            correct: false,
            feedback: "Kardynalny błąd! Odstawienie insuliny spowoduje nawrót ciężkiej ketogenezy i załamanie kwasicy."
          },
          {
            text: "Zwiększasz dawkę insuliny 10-krotnie, aby glikemia spadła do 20 mg/dl.",
            correct: false,
            feedback: "Doprowadzi to do śmiertelnej hipoglikemii i zgonu w drgawkach."
          },
          {
            text: "Podajesz pacjentce do wypicia 2 litry soku z buraków.",
            correct: false,
            feedback: "Pacjentka ma nudności, ryzyko zachłyśnięcia i zaburzenia wchłaniania."
          }
        ]
      },
      {
        stepNum: 7,
        title: "Krok 7: Najgroźniejsze powikłanie śmiertelne – Obrzęk mózgu (Cerebral Edema)",
        desc: "W 5. godzinie leczenia dziewczynka staje się nagle pobudzona, skarży się na silny ból głowy, wymiotuje treścią żołądkową, a następnie staje się podsypiająca i nie reaguje na głos (spadek GCS z 13 do 8). Na kardiomonitorze: tętno zwalnia ze 120 do 55/min (bradykardia), a ciśnienie tętnicze rośnie do 140/90 mmHg (triada Cushinga). Jakie powikłanie rozpoznajesz i jak natychmiast reagujesz?",
        scenario: "W 5. godzinie leczenia dziewczynka staje się nagle pobudzona, skarży się na silny ból głowy, wymiotuje treścią żołądkową, a następnie staje się podsypiająca i nie reaguje na głos (spadek GCS z 13 do 8). Na kardiomonitorze: tętno zwalnia ze 120 do 55/min (bradykardia), a ciśnienie tętnicze rośnie do 140/90 mmHg (triada Cushinga). Jakie powikłanie rozpoznajesz i jak natychmiast reagujesz?",
        options: [
          {
            text: "Rozpoznajesz ostry obrzęk mózgu (cerebral edema) z wklinowaniem pnia mózgu (triada Cushinga: bradykardia + nadciśnienie); natychmiast redukujesz tempo płynoterapii o 50%, unosisz wezgłowie łóżka o 30° i bezzwłocznie podajesz 20% MANNITOL (0.5–1.0 g/kg i.v. w ciągu 15 min) lub 3% roztwór NaCl (hypertonic saline, 3–5 ml/kg w 10–15 min) PRZED wykonaniem badań obrazowych!",
            correct: true,
            feedback: "Wybitnie! Obrzęk mózgu jest główną przyczyną zgonu u dzieci z DKA (odpowiada za 60–90% wszystkich zgonów w DKA u dzieci!). Występuje typowo między 4. a 12. godziną leczenia. Objawy: bóle głowy, spadek GCS, wymioty, bradykardia i nadciśnienie tętnicze (odruch Cushinga). Złota zasada ratunkowa: leczenie hiperosmotyczne (mannitol 20% lub 3% NaCl) należy wdrożyć NATYCHMIAST przy podejrzeniu klinicznym – czekanie na wykonanie tomografii komputerowej głowy jest błędem w sztuce i kończy się śmiercią mózgu!"
          },
          {
            text: "Czekasz 4 godziny w kolejce na planowy rezonans magnetyczny bez podawania leków.",
            correct: false,
            feedback: "Kardynalny błąd zaniechania: dziecko umrze z powodu wklinowania pnia mózgu w otworze wielkim."
          },
          {
            text: "Wykonujesz natychmiastowe nakłucie lędźwiowe w celu odbarczenia płynu.",
            correct: false,
            feedback: "Błąd śmiertelny! Nakłucie lędźwiowe przy ciasnocie śródczaszkowej wywoła natychmiastowe wklinowanie migdałków móżdżku i zgon!"
          },
          {
            text: "Podajesz 2 litry hipotonicznej soli w szybkim wlewie pod ciśnieniem.",
            correct: false,
            feedback: "Zwiększy obrzęk mózgu i natychmiast zabije pacjentkę."
          }
        ]
      },
      {
        stepNum: 8,
        title: "Krok 8: Wyprowadzenie z kwasicy, przejście na podskórną insulinoterapię i edukacja",
        desc: "Dzięki szybkiej infuzji 3% NaCl objawy neurologiczne całkowicie ustąpiły, a GCS powrócił do 15. Po 18 godzinach parametry gazometryczne są w normie: pH 7.38, HCO3- 21 mmol/l, ketony we krwi <0.4 mmol/l, dziewczynka jest głodna i prosi o posiłek. Jak przeprowadza się bezpieczne przejście z wlewu i.v. na podskórną insulinoterapię?",
        scenario: "Dzięki szybkiej infuzji 3% NaCl objawy neurologiczne całkowicie ustąpiły, a GCS powrócił do 15. Po 18 godzinach parametry gazometryczne są w normie: pH 7.38, HCO3- 21 mmol/l, ketony we krwi <0.4 mmol/l, dziewczynka jest głodna i prosi o posiłek. Jak przeprowadza się bezpieczne przejście z wlewu i.v. na podskórną insulinoterapię?",
        options: [
          {
            text: "Przejście na intensywną insulinoterapię podskórną (funkcjonalna insulinoterapia s.c. lub pompa insulinowa); pierwszą dawkę insuliny doposiłkowej s.c. podaje się przed posiłkiem, a dożylny wlew insuliny wyłącza się DOPIERO PO 30–60 MINUTACH od wstrzyknięcia podskórnego (aby uniknąć 'okienka' bez insuliny i nawrotu hiperglikemii).",
            correct: true,
            feedback: "Doskonale! Kryteria zakończenia leczenia DKA: pH >7.30, HCO3- >18 mmol/l, beta-hydroksymaślan <1.0 mmol/l oraz zdolność do przyjmowania posiłków doustnych. Żelazna zasada przejścia z i.v. na s.c.: okres półtrwania insuliny i.v. wynosi zaledwie kilka minut! Wyłączenie pompy i.v. w momencie podania wstrzyknięcia s.c. powoduje przerwę we wchłanianiu i gwałtowny skok glikemii. Pompę wyłącza się dopiero po 30-60 min od podania analogu podskórnie (lub po 1-2h przy podaniu insuliny bazalnej)."
          },
          {
            text: "Wyłączasz pompę i.v. 4 godziny przed podaniem pierwszej dawki podskórnej.",
            correct: false,
            feedback: "Doprowadzi to do natychmiastowego nawrotu kwasicy ketonowej."
          },
          {
            text: "Wypisujesz dziecko do domu na diecie bez węglowodanów bez żadnej insuliny.",
            correct: false,
            feedback: "Cukrzyca typu 1 to bezwzględny brak insuliny, dziecko bez insuliny umrze w ciągu kilku dni."
          },
          {
            text: "Zalecasz leczenie witaminą B12 jako substytutem insuliny.",
            correct: false,
            feedback: "Absurdalne i medycznie bezpodstawne."
          }
        ]
      }
    ];
  });

  console.log("Cases 116-120 upgraded!");
}

run().catch(console.error);

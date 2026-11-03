const fs = require('fs');
const { decryptObjectAes, encryptStringAes } = require('./encrypt_case.js');
const PASSWORD = '@LEKSzymon28111999';

// Helper to update a case with rich clinical steps
async function upgradeCase(fname, updater) {
  const enc = JSON.parse(fs.readFileSync('cases/' + fname, 'utf8'));
  const c = await decryptObjectAes(enc, PASSWORD);
  updater(c);
  // Ensure dual-layer vitals
  if (!c.vitalsObj) {
    c.vitalsObj = { hr: 110, bp: "100/60", spo2: 98, rr: 22, temp: 37.5, gcs: 15 };
  }
  const reEnc = await encryptStringAes(JSON.stringify(c, null, 2), PASSWORD);
  fs.writeFileSync('cases/' + fname, JSON.stringify(reEnc, null, 2), 'utf8');
  console.log(`Upgraded and enriched clinical narrative: ${fname}`);
}

async function run() {
  console.log("Starting clinical narrative upgrade for cases 104-115...");

  // --- CASE 104: ZUM u niemowlęcia ---
  await upgradeCase('104_zum_niemowle.json', (c) => {
    c.steps = [
      {
        stepNum: 1,
        title: "Krok 1: Wstępna ocena na SOR – Niemowlę z gorączką bez uchwytnego ogniska (FWS)",
        desc: "Dyżurujesz w izbie przyjęć szpitala dziecięcego. Rodzice zgłaszają się z 7-miesięczną córką, która od 36 godzin ma gorączkę do 39.5°C słabo reagującą na paracetamol. Dziewczynka jest rozpalona, apatyczna, płacze przy przewijaniu i zwymiotowała dwa ostatnie posiłki. W badaniu przedmiotowym: gardło blade, uszy bez cech zapalenia, osłuchowo płuca czyste, brzuch miękki, ciemiączko na poziomie kości czaszki, objawy oponowe ujemne. Jakie jest Twoje postępowanie kliniczne pierwszej linii u niemowlęcia z gorączką bez uchwytnego źródła?",
        scenario: "Dyżurujesz w izbie przyjęć szpitala dziecięcego. Rodzice zgłaszają się z 7-miesięczną córką, która od 36 godzin ma gorączkę do 39.5°C słabo reagującą na paracetamol. Dziewczynka jest rozpalona, apatyczna, płacze przy przewijaniu i zwymiotowała dwa ostatnie posiłki. W badaniu przedmiotowym: gardło blade, uszy bez cech zapalenia, osłuchowo płuca czyste, brzuch miękki, ciemiączko na poziomie kości czaszki, objawy oponowe ujemne. Jakie jest Twoje postępowanie kliniczne pierwszej linii u niemowlęcia z gorączką bez uchwytnego źródła?",
        options: [
          {
            text: "Rozpoznajesz stan zagrożenia ciężkim zakażeniem bakteryjnym (SBI); zlecasz pilną ocenę stanu nawodnienia, badania krwi (morfologia, CRP, prokalcytonina) oraz natychmiastowe pobranie moczu do badania ogólnego i na posiew.",
            correct: true,
            feedback: "Znakomicie! U każdego niemowlęcia <12. m.ż. z gorączką bez uchwytnego ogniska w badaniu fizykalnym (fever without source) zakażenie układu moczowego (ZUM) jest najczęstszą przyczyną bakteryjną (5–10% dziewczynek). Zaniechanie badania moczu to najczęstszy błąd prowadzący do opóźnienia leczenia i nieodwracalnego bliznowacenia miąższu nerek."
          },
          {
            text: "Uznajesz, że to 'trzydniówka' lub ząbkowanie i odsyłasz dziecko do domu z zaleceniem ibuprofenum w syropie.",
            correct: false,
            feedback: "Kardynalny błąd! Ząbkowanie nigdy nie wywołuje gorączki >38.5°C i wymiotów. Odesłanie gorączkującego niemowlęcia bez badania moczu grozi urosepsą i uogólnionym zakażeniem."
          },
          {
            text: "Kwalifikujesz dziecko do natychmiastowej punkcji lędźwiowej w znieczuleniu ogólnym przed badaniami krwi.",
            correct: false,
            feedback: "Błąd sekwencji: dziecko nie ma cech neuroinfekcji (ciemiączko płaskie, brak objawów oponowych); pierwszym krokiem jest nieinwazyjne zbadanie moczu i parametrów zapalnych."
          },
          {
            text: "Zalecasz okłady z lodu na brzuch i pojenie colą.",
            correct: false,
            feedback: "Absurdalne i szkodliwe zalecenie niosące ryzyko hipotermii i zaburzeń elektrolitowych."
          }
        ]
      },
      {
        stepNum: 2,
        title: "Krok 2: Technika pobrania próbki moczu – Wytyczne PTNFD i AAP",
        desc: "Pielęgniarka odcinkowa pyta Cię o sposób pobrania moczu od niekontrolującego mikcji 7-miesięcznego dziecka. W szafce zabiegowej dostępne są woreczki samoprzylepne, zestawy do jednorazowego cewnikowania oraz igły do nakłucia nadłonowego. Jaką dyspozycję wydajesz, pamiętając o wiarygodności mikrobiologicznej?",
        scenario: "Pielęgniarka odcinkowa pyta Cię o sposób pobrania moczu od niekontrolującego mikcji 7-miesięcznego dziecka. W szafce zabiegowej dostępne są woreczki samoprzylepne, zestawy do jednorazowego cewnikowania oraz igły do nakłucia nadłonowego. Jaką dyspozycję wydajesz, pamiętając o wiarygodności mikrobiologicznej?",
        options: [
          {
            text: "Zlecasz jednorazowe cewnikowanie pęcherza moczowego w warunkach aseptycznych (lub nakłucie nadłonowe); odrzucasz woreczek samoprzylepny z powodu >50% odsetka wyników fałszywie dodatnich.",
            correct: true,
            feedback: "Prawidłowo! Zgodnie z wytycznymi Polskiego Towarzystwa Nefrologii Dziecięcej (PTNFD) i AAP, u niemowląt złotym standardem pobrania moczu do posiewu jest jednorazowe cewnikowanie pęcherza lub nakłucie nadłonowe. Mocz z woreczka ma ogromny odsetek zanieczyszczeń florą krocza (>50%) i może służyć jedynie do wstępnego wykluczenia ZUM (ujemny wynik), ale NIGDY do potwierdzenia zakażenia ani posiewu!"
          },
          {
            text: "Nakazujesz przyklejenie woreczka foliowego i pozostawienie go na noc do napełnienia.",
            correct: false,
            feedback: "Błąd w sztuce! Mocz zbierany w woreczku ulega natychmiastowej kontaminacji florą fekalną skóry, dając fałszywy wynik i prowadząc do niepotrzebnej antybiotykoterapii."
          },
          {
            text: "Pobierasz mocz ze świeżo zdjętej pampersowej pieluszki przez wyciśnięcie.",
            correct: false,
            feedback: "Błąd kardynalny. Mocz z pieluszki jest kompletnie niezdatny do analizy laboratoryjnej."
          },
          {
            text: "Rezygnujesz z badania moczu i wykonujesz wyłącznie wymaz z gardła.",
            correct: false,
            feedback: "Błąd. Gardło jest blade, a wymaz nie wyjaśni przyczyny gorączki."
          }
        ]
      },
      {
        stepNum: 3,
        title: "Krok 3: Wyniki badań CITO – Rozpoznanie gorączkowego ZUM / Odmiedniczkowego zapalenia nerek (APN)",
        desc: "Otrzymujesz wyniki badań cito: Badanie ogólne moczu (z cewnika): barwa mętna, leukocyturia 50–70 wpw, liczne bakterie w polu widzenia, azotyny (nitrite) DODATNIE, białko 0.4 g/l. Krew: CRP 74 mg/l, prokalcytonina 1.6 ng/ml, leukocytoza 17.8 G/l z neutrofilią (78%). Kreatynina 0.32 mg/dl (w normie). Jaka jest Twoja interpretacja kliniczna?",
        scenario: "Otrzymujesz wyniki badań cito: Badanie ogólne moczu (z cewnika): barwa mętna, leukocyturia 50–70 wpw, liczne bakterie w polu widzenia, azotyny (nitrite) DODATNIE, białko 0.4 g/l. Krew: CRP 74 mg/l, prokalcytonina 1.6 ng/ml, leukocytoza 17.8 G/l z neutrofilią (78%). Kreatynina 0.32 mg/dl (w normie). Jaka jest Twoja interpretacja kliniczna?",
        options: [
          {
            text: "Rozpoznajesz ostre odmiedniczkowe zapalenie nerek / gorączkowe ZUM (Acute Pyelonephritis - APN); wysokie stężenie prokalcytoniny i CRP wraz z leukocyturią i gorączką u niemowlęcia potwierdza zajęcie górnych dróg moczowych.",
            correct: true,
            feedback: "Doskonale! Połączenie wysokiej gorączki, wymiotów, znacznie podwyższonych wskaźników ostrej fazy (CRP >20–40 mg/l, PCT >0.5 ng/ml) oraz znamiennej leukocyturii u niemowlęcia definiuje gorączkowe ZUM z zajęciem miąższu nerek (APN). U niemowląt nie stosuje się podziału na 'zapalenie pęcherza' – każdy gorączkowy ZUM traktuje się jak odmiedniczkowe zapalenie nerek."
          },
          {
            text: "Rozpoznajesz bezobjawowy bakteriomocz i nie wdrażasz żadnego leczenia.",
            correct: false,
            feedback: "Kardynalny błąd! Pacjentka ma 39.5°C, wymioty, CRP 74 mg/l – to ciężka objawowa infekcja, nie bezobjawowy bakteriomocz!"
          },
          {
            text: "Uznajesz wynik za fałszywy z powodu obecności leukocytów w normie fizjologicznej.",
            correct: false,
            feedback: "Błąd: norma leukocytów w moczu odwirowanym to <5 wpw. Wartość 50–70 wpw to masywny ropomocz."
          },
          {
            text: "Podejrzewasz kłębuszkowe zapalenie nerek z powodu obecności białka 0.4 g/l.",
            correct: false,
            feedback: "Umiarkowane białkomocz w ZUM jest odczynowy (leukocyty, bakterie, uszkodzenie cewek)."
          }
        ]
      },
      {
        stepNum: 4,
        title: "Krok 4: Wybór empirycznej antybiotykoterapii pierwszej linii",
        desc: "Dziecko z powodu wymiotów nie toleruje płynów doustnych, jest podsypiające, a tętno wynosi 158/min. Należy natychmiast rozpocząć antybiotykoterapię parenteralną po zabezpieczeniu posiewów. Jaki schemat empiryczny jest lekiem z wyboru wg wytycznych PTNFD?",
        scenario: "Dziecko z powodu wymiotów nie toleruje płynów doustnych, jest podsypiające, a tętno wynosi 158/min. Należy natychmiast rozpocząć antybiotykoterapię parenteralną po zabezpieczeniu posiewów. Jaki schemat empiryczny jest lekiem z wyboru wg wytycznych PTNFD?",
        options: [
          {
            text: "Cefalosporyna III generacji dożylnie (np. cefotaksym lub ceftriakson) w monoterapii lub w skojarzeniu z aminoglikozydem (amikacyna/gentamycyna) przy podejrzeniu urosepsy.",
            correct: true,
            feedback: "Prawidłowo! U niemowląt z gorączkowym ZUM i objawami ogólnoustrojowymi lekiem pierwszego rzutu jest cefalosporyna III generacji i.v. (cefotaksym 100-150 mg/kg/d lub ceftriakson 50-75 mg/kg/d raz na dobę), wykazująca wysoką aktywność wobec Escherichia coli (odpowiedzialnej za >80% zakażeń) i innych pałeczek Enterobacterales."
          },
          {
            text: "Doustna nitrofurantoina (furagina) w syropie przez 3 dni.",
            correct: false,
            feedback: "Kardynalny błąd! Nitrofurantoina NIE osiąga stężeń terapeutycznych w miąższu nerek ani we krwi – działa wyłącznie w świetle pęcherza moczowego! Jest bezwzględnie PRZECIWWSKAZANA w gorączkowym ZUM i odmiedniczkowym zapaleniu nerek!"
          },
          {
            text: "Doustna amoksycylina w monoterapii.",
            correct: false,
            feedback: "Błąd: odsetek oporności szczepów E. coli na czystą amoksycylinę przekracza 50-60%."
          },
          {
            text: "Wankomycyna z linezolidem dożylnie.",
            correct: false,
            feedback: "Błąd spektrum: to leki przeciwwankomycynowe/przeciwgronkowcowe, nieskuteczne wobec pałeczek Gram-ujemnych będących przyczyną ZUM."
          }
        ]
      },
      {
        stepNum: 5,
        title: "Krok 5: Badanie obrazowe w ostrym okresie – USG układu moczowego CITO",
        desc: "Po 24 godzinach od wdrożenia ceftriaksonu i płynoterapii gorączka spada do 37.8°C, a wymioty ustępują. Pielęgniarka pyta, kiedy i jakie badanie obrazowe należy wykonać u tego niemowlęcia.",
        scenario: "Po 24 godzinach od wdrożenia ceftriaksonu i płynoterapii gorączka spada do 37.8°C, a wymioty ustępują. Pielęgniarka pyta, kiedy i jakie badanie obrazowe należy wykonać u tego niemowlęcia.",
        options: [
          {
            text: "Ultrasonografia (USG) nerek i dróg moczowych w trakcie hospitalizacji – celem wykluczenia wad anatomicznych, wodonercza, przeszkody w odpływie moczu oraz powikłań ropnych (ropień nerkowy).",
            correct: true,
            feedback: "Znakomicie! Każde dziecko po pierwszym w życiu gorączkowym ZUM musi mieć wykonane USG układu moczowego jeszcze w trakcie pobytu w szpitalu (w ciągu pierwszych 24-48 godzin przy braku poprawy lub przed wypisem przy dobrej odpowiedzi), aby wykluczyć wady zaporowe (np. zastawki cewki tylnej, wodonercze) i ropnie."
          },
          {
            text: "Pilna cystoskopia z biopsją błony śluzowej pęcherza w ostrej fazie infekcji.",
            correct: false,
            feedback: "Błąd! Badania inwazyjne dróg moczowych w ostrym stanie zapalnym są przeciwwskazane z powodu ryzyka urosepsy."
          },
          {
            text: "Urografia dożylna z podaniem jodowego środka cieniującego.",
            correct: false,
            feedback: "Urografia jest badaniem historycznym, wypartym przez USG i rezonans magnetyczny."
          },
          {
            text: "Odstąpienie od jakiejkolwiek diagnostyki obrazowej, jeśli gorączka ustąpiła.",
            correct: false,
            feedback: "Błąd zaniechania: u niemowląt po pierwszym ZUM wada układu moczowego (np. VUR) występuje u 30-40% chorych!"
          }
        ]
      },
      {
        stepNum: 6,
        title: "Krok 6: Interpretacja wyniku posiewu moczu",
        desc: "W 3. dobie hospitalizacji laboratorium mikrobiologiczne przekazuje wynik posiewu moczu pobranego przez cewnikowanie: wzrost Escherichia coli w mianie 5x10^4 CFU/ml (50 000 komórek/ml), szczep ESBL-ujemny, wrażliwy na cefalosporyny, aminoglikozydy i ciprofloksacynę. Czy ten wynik potwierdza ZUM?",
        scenario: "W 3. dobie hospitalizacji laboratorium mikrobiologiczne przekazuje wynik posiewu moczu pobranego przez cewnikowanie: wzrost Escherichia coli w mianie 5x10^4 CFU/ml (50 000 komórek/ml), szczep ESBL-ujemny, wrażliwy na cefalosporyny, aminoglikozydy i ciprofloksacynę. Czy ten wynik potwierdza ZUM?",
        options: [
          {
            text: "Tak – w moczu pobranym przez jednorazowe cewnikowanie pęcherza miano >=10^4 CFU/ml (10 000/ml) pojedynczego uropatogenu jest kryterium znamiennego bakteriomoczu i potwierdza rozpoznanie.",
            correct: true,
            feedback: "Prawidłowo! Progi znamienności bakteriomoczu zależą od techniki pobrania moczu: 1) Nakłucie nadłonowe: KAŻDA liczba bakterii (>0 CFU/ml); 2) Cewnikowanie pęcherza: >=10^4 CFU/ml (10 000/ml); 3) Środkowy strumień (u starszych dzieci): >=10^5 CFU/ml (100 000/ml). Wynik 50 000 CFU/ml z cewnika jest w 100% diagnostyczny."
          },
          {
            text: "Nie – miano musi wynosić co najmniej 1 000 000 CFU/ml niezależnie od metody pobrania.",
            correct: false,
            feedback: "Błąd: próg 10^5 dotyczy moczu ze środkowego strumienia, z cewnika wystarczy 10^4, a z nakłucia każda liczba."
          },
          {
            text: "Wynik oznacza zanieczyszczenie próbki i wymaga powtórzenia bez leczenia.",
            correct: false,
            feedback: "Błąd: wyhodowano monokulturę E. coli, a pacjentka miała jawne objawy kliniczne odmiedniczkowego zapalenia nerek."
          },
          {
            text: "E. coli to fizjologiczna flora dróg moczowych niemowląt.",
            correct: false,
            feedback: "Drogi moczowe są w warunkach prawidłowych jałowe."
          }
        ]
      },
      {
        stepNum: 7,
        title: "Krok 7: Dalsza diagnostyka po ustąpieniu zakażenia – Wskazania do CUM i DMSA",
        desc: "Dziewczynka jest w pełni bezgorączkowa, pije chętnie, w kontrolnym badaniu ogólnym mocz jest prawidłowy. W wykonanym USG nerek stwierdzono poszerzenie UKM nerki lewej (miedniczka 8 mm) bez poszerzenia moczowodu. Rodzice pytają o dalsze badania w kierunku wady nerek.",
        scenario: "Dziewczynka jest w pełni bezgorączkowa, pije chętnie, w kontrolnym badaniu ogólnym mocz jest prawidłowy. W wykonanym USG nerek stwierdzono poszerzenie UKM nerki lewej (miedniczka 8 mm) bez poszerzenia moczowodu. Rodzice pytają o dalsze badania w kierunku wady nerek.",
        options: [
          {
            text: "Zaplanowanie cystouretrografii mikcyjnej (CUM) po całkowitym wyleczeniu ZUM (za ok. 4–6 tygodni) w celu wykluczenia odpływu pęcherzowo-moczowodowego (VUR) oraz ewentualnej scyntygrafii DMSA po 6 miesiącach w ocenie blizn nerkowych.",
            correct: true,
            feedback: "Doskonale! CUM jest złotym standardem wykrywania odpływu pęcherzowo-moczowodowego (VUR). Wykonuje się ją po wyleczeniu ostrej infekcji (aby uniknąć zakażenia wstępującego i fałszywych refluksów pozapalnych). Scyntygrafia kwasem dimerkaptobursztynowym (DMSA) wykonywana po 6 miesiącach ocenia obecność trwałych pozapalnych blizn miąższu nerkowego (nefropatia refluksowa)."
          },
          {
            text: "Natychmiastowa scyntygrafia DMSA w 3. dobie zakażenia.",
            correct: false,
            feedback: "Błąd: w ostrym okresie DMSA wykaże jedynie przemijający naciek zapalny, a nie trwałą bliznę; badanie na blizny wykonuje się po minimum 4-6 miesiącach."
          },
          {
            text: "Wykonanie tomografii komputerowej z potrójną dawką kontrastu jodowego.",
            correct: false,
            feedback: "Nieuzasadniona ekspozycja niemowlęcia na promieniowanie jonizujące i nefrotoksyczny kontrast."
          },
          {
            text: "Zalecenie całkowitego zaniechania dalszych badań i wizyt kontrolnych.",
            correct: false,
            feedback: "Błąd zaniechania: nieleczony VUR wysokiego stopnia prowadzi do niewydolności nerek i nadciśnienia tętniczego."
          }
        ]
      },
      {
        stepNum: 8,
        title: "Krok 8: Czas trwania terapii, zalecenia wypisowe i profilaktyka",
        desc: "Dziewczynka po 4 dobach antybiotykoterapii dożylnej czuje się doskonale. Łączny planowany czas leczenia wynosi 10–14 dni. Jak zaplanujesz bezpieczne dokończenie leczenia i zalecenia dla rodziców?",
        scenario: "Dziewczynka po 4 dobach antybiotykoterapii dożylnej czuje się doskonale. Łączny planowany czas leczenia wynosi 10–14 dni. Jak zaplanujesz bezpieczne dokończenie leczenia i zalecenia dla rodziców?",
        options: [
          {
            text: "Przejście na doustną antybiotykoterapię celowaną (np. cefiksym lub amoksycylina z kwasem klawulanowym wg antybiogramu) do łącznego czasu 10–14 dni, dbałość o prawidłowe nawodnienie, higienę krocza (podcieranie od przodu do tyłu), unikanie zaparć stolca i kontrola posiewu moczu.",
            correct: true,
            feedback: "Wybitnie! Terapia sekwencyjna (i.v. do uzyskania apireksji -> p.o. wg antybiogramu) jest standardem leczenia gorączkowego ZUM u niemowląt. Łączny czas leczenia wynosi 10–14 dni. Profilaktyka nawrotów obejmuje higienę okolicy pieluszkowej, obfite pojenie oraz leczenie zaparć (zalegający stolec uciska pęcherz i sprzyja kolonizacji bakteryjnej)."
          },
          {
            text: "Natychmiastowe odstawienie antybiotyku w 4. dobie, bo dziecko nie ma już gorączki.",
            correct: false,
            feedback: "Kardynalny błąd! Zbyt krótka antybiotykoterapia w APN prowadzi do nawrotu zakażenia szczepem opornym i rozwoju ropnia."
          },
          {
            text: "Zalecenie podawania furaginy przez najbliższe 18 lat bez kontroli lekarskiej.",
            correct: false,
            feedback: "Przewlekła nieuzasadniona profilaktyka furaginą grozi toksycznością płucną i neuropatią."
          },
          {
            text: "Zakaz kąpieli dziecka przez rok.",
            correct: false,
            feedback: "Niedorzeczne i sprzyjające zakażeniom skóry i krocza."
          }
        ]
      }
    ];
  });

  // --- CASE 105: Zespół nerczycowy MCD u dziecka ---
  await upgradeCase('105_zespol_nerczycowy_mcd.json', (c) => {
    c.steps = [
      {
        stepNum: 1,
        title: "Krok 1: Wstępna ocena kliniczna – 3.5-letni chłopiec z narastającymi obrzękami",
        desc: "Do Twojego gabinetu pediatrycznego rodzice przyprowadzają 3.5-letniego chłopca. Od 5 dni zauważyli u syna narastający obrzęk powiek (początkowo leczony przez lekarza rodzinnego kroplami przeciwalergicznymi bez poprawy). W ostatnich 48 godzinach powiększył się obwód brzucha, moszna jest ciastowato obrzęknięta, a skarpetki zostawiają głębokie rowki na goleniach. Dziecko oddaje mocz w małych objętościach, który rodzice opisują jako 'pieniący się'. W badaniu: RR 95/60 mmHg, HR 105/min, ciastowate obrzęki podudzi, brzuch powiększony z objawem chełbotania płynu. Jaka jest Twoja wstępna diagnoza i kluczowe badanie CITO?",
        scenario: "Do Twojego gabinetu pediatrycznego rodzice przyprowadzają 3.5-letniego chłopca. Od 5 dni zauważyli u syna narastający obrzęk powiek (początkowo leczony przez lekarza rodzinnego kroplami przeciwalergicznymi bez poprawy). W ostatnich 48 godzinach powiększył się obwód brzucha, moszna jest ciastowato obrzęknięta, a skarpetki zostawiają głębokie rowki na goleniach. Dziecko oddaje mocz w małych objętościach, który rodzice opisują jako 'pieniący się'. W badaniu: RR 95/60 mmHg, HR 105/min, ciastowate obrzęki podudzi, brzuch powiększony z objawem chełbotania płynu. Jaka jest Twoja wstępna diagnoza i kluczowe badanie CITO?",
        options: [
          {
            text: "Podejrzewasz zespół nerczycowy (Nephrotic Syndrome); zlecasz natychmiast badanie ogólne moczu (z oceną białka i osadu) oraz badania biochemiczne krwi (albumina, białko całkowite, lipidogram, elektrolity, kreatynina).",
            correct: true,
            feedback: "Znakomicie! Klasyczna manifestacja zespołu nerczycowego u małego dziecka: symetryczne obrzęki (najpierw wokół oczu rano, później grawitacyjne i puchlina brzuszna/wodobrzusze) oraz pieniący się mocz (wynik obniżonego napięcia powierzchniowego przez masywny białkomocz). Badanie moczu i stężenie albuminy w surowicy to podstawa natychmiastowej diagnozy."
          },
          {
            text: "Stawiasz rozpoznanie ostrej alergii na sierść psa i podajesz domięśniowo klemastynę, odsyłając dziecko do domu.",
            correct: false,
            feedback: "Kardynalny błąd! Obrzęki w zespole nerczycowym są nagminnie mylone z alergią. Przeoczenie białkomoczu grozi ciężkimi powikłaniami zakrzepowymi i hipowolemią."
          },
          {
            text: "Podejrzewasz niewydolność prawej komory serca i kierujesz dziecko na cito na koronarografię.",
            correct: false,
            feedback: "U 3-letniego dziecka bez wady serca przyczyną obrzęków uogólnionych jest choroba nerek."
          },
          {
            text: "Zalecasz ograniczenie picia wody do 100 ml na dobę bez żadnych badań.",
            correct: false,
            feedback: "Niebezpieczne postępowanie: u dziecka z zespołem nerczycowym występuje hipowolemia efektywna, odwodnienie grozi wstrząsem i zakrzepicą."
          }
        ]
      },
      {
        stepNum: 2,
        title: "Krok 2: Kwalifikacja laboratoryjna do triady zespołu nerczycowego",
        desc: "Laboratorium przekazuje wyniki: Mocz: białko 4.8 g/dobę (u dziecka >50 mg/kg/dobę lub wskaźnik białko/kreatynina UPCR >2.0 mg/mg), osad moczu bez krwinkomoczu i bez wałeczków erytrocytarnych. Krew: albumina 17 g/l (norma 35–50 g/l), białko całkowite 38 g/l, cholesterol całkowity 420 mg/dl, triglicerydy 310 mg/dl. Kreatynina 0.4 mg/dl. Czy te wyniki spełniają kryteria zespołu nerczycowego?",
        scenario: "Laboratorium przekazuje wyniki: Mocz: białko 4.8 g/dobę (u dziecka >50 mg/kg/dobę lub wskaźnik białko/kreatynina UPCR >2.0 mg/mg), osad moczu bez krwinkomoczu i bez wałeczków erytrocytarnych. Krew: albumina 17 g/l (norma 35–50 g/l), białko całkowite 38 g/l, cholesterol całkowity 420 mg/dl, triglicerydy 310 mg/dl. Kreatynina 0.4 mg/dl. Czy te wyniki spełniają kryteria zespołu nerczycowego?",
        options: [
          {
            text: "Tak – spełniona jest pełna triada zespołu nerczycowego: 1) masywny białkomocz nerczycowy (>50 mg/kg/d lub UPCR >2), 2) ciężka hipoalbuminemia (<25 g/l), 3) uogólnione obrzęki, którym towarzyszy hiperlipidemia.",
            correct: true,
            feedback: "Doskonale! Definicja zespołu nerczycowego u dzieci: masywny białkomocz (>50 mg/kg/24h lub >40 mg/m2/h lub wskaźnik UPCR w porannej próbce >2 mg/mg) + hipoalbuminemia (<25 g/l) + obrzęki + hipercholesterolemia. U dzieci w wieku 1–10 lat w >85–90% przypadków przyczyną jest choroba zmian minimalnych (MCD - Minimal Change Disease)."
          },
          {
            text: "Nie – brak krwinkomoczu wyklucza chorobę kłębuszków nerkowych.",
            correct: false,
            feedback: "Wręcz przeciwnie! Czysty zespół nerczycowy bez krwinkomoczu i bez nadciśnienia (tzw. nefroczyca czysta) jest typowy właśnie dla nerczycy submikroskopowej (MCD)."
          },
          {
            text: "Jest to zespół nefrytyczny z powodu obecności obrzęków.",
            correct: false,
            feedback: "Błąd: zespół nefrytyczny charakteryzuje się krwiomoczem, nadciśnieniem i skąpomoczem z umiarkowanym białkomoczem, a nie masywnym białkomoczem nerczycowym."
          },
          {
            text: "Wyniki wskazują na marskość wątroby z powodu hipoalbuminemii.",
            correct: false,
            feedback: "Utrata białka następuje przez nerkę w moczu, co wyklucza pierwotną niewydolność wątroby."
          }
        ]
      },
      {
        stepNum: 3,
        title: "Krok 3: Kwalifikacja do biopsji nerki u dziecka – Czy jest konieczna?",
        desc: "Zaniepokojeni rodzice pytają, czy syn będzie musiał mieć wykonane nakłucie nerki (biopsję gruboigłową) przed rozpoczęciem leczenia.",
        scenario: "Zaniepokojeni rodzice pytają, czy syn będzie musiał mieć wykonane nakłucie nerki (biopsję gruboigłową) przed rozpoczęciem leczenia.",
        options: [
          {
            text: "Nie – u dzieci w wieku 1–10 lat z typowym idiopatycznym zespołem nerczycowym (bez krwiomoczu, bez trwałego nadciśnienia, z prawidłowym dopełniaczem C3 i prawidłową kreatyniną) biopsja nerki NIE JEST WSKAZANA; natychmiast wdraża się empiryczną sterydoterapię.",
            correct: true,
            feedback: "Prawidłowo! To żelazna zasada nefrologii dziecięcej i częste pytanie LEK: u dzieci 1-10 r.ż. z czystym zespołem nerczycowym prawdopodobieństwo MCD wynosi >85%. Biopsja jest inwazyjna i zbędna na początku – wykonuje się ją dopiero w przypadku: wieku <1 r.ż. lub >10-12 r.ż., zespołu nefrytyczno-nerczycowego (krwinkomocz, nadciśnienie), hipokomplementemii C3 lub STERYDOOPORNOŚCI po 4-6 tygodniach leczenia."
          },
          {
            text: "Tak – biopsja nerki jest bezwzględnie obowiązkowa u każdego pacjenta przed podaniem pierwszej dawki leku.",
            correct: false,
            feedback: "Błąd: u dorosłych tak, ale u dzieci 1-10 r.ż. leczenie sterydami rozpoczyna się bez biopsji."
          },
          {
            text: "Biopsję wykonuje się tylko u dziewczynek.",
            correct: false,
            feedback: "Płeć nie decyduje o wskazaniach do biopsji."
          },
          {
            text: "Należy usunąć jedną nerkę w celu zbadania jej pod mikroskopem.",
            correct: false,
            feedback: "Absurdalne okaleczenie pacjenta."
          }
        ]
      },
      {
        stepNum: 4,
        title: "Krok 4: Leczenie pierwszego rzutu – Protokół sterydoterapii wg KDIGO/PTNFD",
        desc: "Jakie leczenie farmakologiczne pierwszego rzutu wdrażasz u tego chłopca i w jakiej dawce?",
        scenario: "Jakie leczenie farmakologiczne pierwszego rzutu wdrażasz u tego chłopca i w jakiej dawce?",
        options: [
          {
            text: "Prednizon doustnie w dawce standardowej: 60 mg/m2 pc./dobę (lub 2 mg/kg mc./dobę, maks. 60 mg/d) w pojedynczej dawce porannej codziennie przez pierwsze 4–6 tygodni, po czym następuje faza leczenia naprzemiennego.",
            correct: true,
            feedback: "Doskonale! Standard KDIGO/PTNFD: prednizon w dawce 60 mg/m2/d (lub 2 mg/kg/d) przez 4-6 tygodni, a następnie dawka naprzemienna (co drugi dzień 40 mg/m2 pc.) stopniowo redukowana przez kolejne miesiące. Ponad 90% dzieci z MCD to chorzy 'sterydowrażliwi' (remisja – ustąpienie białkomoczu w ciągu 4 tygodni)."
          },
          {
            text: "Cyklosporyna A w skojarzeniu z cyklofosfamidem od pierwszego dnia.",
            correct: false,
            feedback: "Błąd: leki immunosupresyjne drugiego rzutu (inhibitory kalcyneuryny, alkilujące) rezerwuje się dla sterydooporności lub częstych nawrotów sterydozależnych."
          },
          {
            text: "Wyłącznie leki moczopędne (furosemid) w wysokich dawkach bez sterydów.",
            correct: false,
            feedback: "Błąd krytyczny! Furosemid podany przy ciężkiej hipowolemii efektywnej i hipoalbuminemii może wywołać wstrząs hipowolemiczny i zakrzepicę naczyń nerkowych!"
          },
          {
            text: "Antybiotykoterapia ampicyliną przez 6 miesięcy.",
            correct: false,
            feedback: "Błąd: idiopatyczny zespół nerczycowy nie jest zakażeniem bakteryjnym."
          }
        ]
      },
      {
        stepNum: 5,
        title: "Krok 5: Zagrożenie powikłaniami – Hipowolemia efektywna i zakrzepica",
        desc: "W 2. dobie pobytu na oddziale chłopiec jest osłabiony, ciśnienie wynosi 82/50 mmHg, nawrót kapilarny wynosi 3.5 sekundy, a kończyny są chłodne. Mimo uogólnionych obrzęków pacjent ma cechy hipowolemii wewnątrznaczyniowej. Jakie zjawisko patofizjologiczne zachodzi u tego dziecka i jak bezpiecznie odbarczyć obrzęki?",
        scenario: "W 2. dobie pobytu na oddziale chłopiec jest osłabiony, ciśnienie wynosi 82/50 mmHg, nawrót kapilarny wynosi 3.5 sekundy, a kończyny są chłodne. Mimo uogólnionych obrzęków pacjent ma cechy hipowolemii wewnątrznaczyniowej. Jakie zjawisko patofizjologiczne zachodzi u tego dziecka i jak bezpiecznie odbarczyć obrzęki?",
        options: [
          {
            text: "Wskutek ciężkiej hipoalbuminemii (<20 g/l) spada ciśnienie onkotyczne osocza, woda ucieka do trzeciej przestrzeni, wywołując hipowolemię efektywną (underfilling theory); w razie wskazań podaje się wlew 20% albuminy z nastocznym furosemidem.",
            correct: true,
            feedback: "Prawidłowo! To paradoks zespołu nerczycowego: pacjent ma nadmiar wody całkowitej (obrzęki, wodobrzusze), ale łożysko naczyniowe jest puste (hipowolemia efektywna, skurcz naczyń, wysoki hematokryt). Podanie samego furosemidu pogłębi wstrząs! Bezpieczne odbarczenie w ciężkich obrzękach polega na podaniu 20% roztworu albuminy (0.5–1.0 g/kg we wlewie 2-4h), a pod koniec wlewu – furosemidu i.v."
          },
          {
            text: "Dziecko jest przewodnione naczyniowo, należy upuścić 500 ml krwi żylnej.",
            correct: false,
            feedback: "Śmiertelny błąd! Pacjent ma hipotonię i pusty układ naczyniowy – upust krwi doprowadziłby do zgonu we wstrząsie."
          },
          {
            text: "Należy podać dożylnie 2 litry 0.9% NaCl w bolusie w 10 minut.",
            correct: false,
            feedback: "Masywny wlew soli bez albuminy ucieknie do przestrzeni śródmiąższowej i wywoła obrzęk płuc."
          },
          {
            text: "Hipoalbuminemia nie ma wpływu na ciśnienie onkotyczne.",
            correct: false,
            feedback: "Albumina odpowiada za 80% ciśnienia onkotycznego osocza."
          }
        ]
      },
      {
        stepNum: 6,
        title: "Krok 6: Podatność na zakażenia – Pierwotne bakteryjne zapalenie otrzewnej (SBP)",
        desc: "W 5. dobie leczenia chłopiec nagle gorączkuje do 39.8°C, pojawia się rozlany ból brzucha z wymiotami i obroną mięśniową. Wiesz, że pacjenci z zespołem nerczycowym mają specyficzny niedobór odporności. Jaki patogen najczęściej wywołuje pierwotne zapalenie otrzewnej w zespole nerczycowym i dlaczego?",
        scenario: "W 5. dobie leczenia chłopiec nagle gorączkuje do 39.8°C, pojawia się rozlany ból brzucha z wymiotami i obroną mięśniową. Wiesz, że pacjenci z zespołem nerczycowym mają specyficzny niedobór odporności. Jaki patogen najczęściej wywołuje pierwotne zapalenie otrzewnej w zespole nerczycowym i dlaczego?",
        options: [
          {
            text: "Streptococcus pneumoniae (pneumokoki) – wskutek utraty immunoglobulin IgG i czynników układu dopełniacza (czynnik B) z moczem dochodzi do upośledzenia opsonizacji bakterii otoczkowych; wodobrzusze stanowi idealną pożywkę dla pneumokoków.",
            correct: true,
            feedback: "Znakomicie! Klasyczne pytanie egzaminacyjne LEK: w zespole nerczycowym z moczem uciekają białka o małej masie, w tym immunoglobuliny IgG oraz białka dopełniacza (properdyna, czynnik B), co dramatycznie upośledza odporność przeciw bakteriom otoczkowym. Najczęstszym czynnikiem pierwotnego zapalenia otrzewnej u dziecka z nerczycą jest Streptococcus pneumoniae (wymaga cefotaksymu/ceftriaksonu i.v.)."
          },
          {
            text: "Zakażenie prątkiem gruźlicy jako jedyna możliwa przyczyna.",
            correct: false,
            feedback: "Gruźlica ma przebieg przewlekły, nie nagły z gorączką 40°C."
          },
          {
            text: "Wirus ospy wietrznej bytujący w płynie puchlinowym.",
            correct: false,
            feedback: "Brak związku."
          },
          {
            text: "Zapalenie otrzewnej nie występuje u dzieci z chorobami nerek.",
            correct: false,
            feedback: "Nerczyca jest klasycznym stanem predysponującym do SBP."
          }
        ]
      },
      {
        stepNum: 7,
        title: "Krok 7: Ryzyko powikłań zakrzepowo-zatorowych",
        desc: "Pielęgniarka zauważa, że hematokryt pacjenta wynosi 48%, a stężenie fibrynogenu 650 mg/dl. Dlaczego pacjenci z aktywnym zespołem nerczycowym mają stan ciężkiej nadkrzepliwości (trombofilii)?",
        scenario: "Pielęgniarka zauważa, że hematokryt pacjenta wynosi 48%, a stężenie fibrynogenu 650 mg/dl. Dlaczego pacjenci z aktywnym zespołem nerczycowym mają stan ciężkiej nadkrzepliwości (trombofilii)?",
        options: [
          {
            text: "Utrata z moczem naturalnych antykoagulantów (antytrombiny III, białka S) przy wzmożonej wątrobowej syntezie fibrynogenu i czynników prozakrzepowych oraz zagęszczeniu krwi (hemokoncentracji) stwarza wysokie ryzyko zakrzepicy żył nerkowych i zatorowości płucnej.",
            correct: true,
            feedback: "Doskonale! Zespół nerczycowy to stan nabytej trombofilii: z moczem ucieka antytrombina III (ATIII - masa 65 kDa, podobna do albuminy) oraz białko S. Wątroba kompensacyjnie syntetyzuje białka o dużej masie, w tym fibrynogen i czynniki V, VIII. W połączeniu z zagęszczeniem krwi i unieruchomieniem grozi to groźną zakrzepicą (np. żyły nerkowej, żył głębokich goleni)."
          },
          {
            text: "Ponieważ płytki krwi ulegają całkowitej lizie w śledzionie.",
            correct: false,
            feedback: "W zespole nerczycowym płytki krwi są pobudzone i ich liczba często rośnie."
          },
          {
            text: "Z powodu braku żelaza w osoczu krew zamienia się w kryształki.",
            correct: false,
            feedback: "Niedorzeczne."
          },
          {
            text: "Zakrzepica nigdy nie występuje u dzieci.",
            correct: false,
            feedback: "Zakrzepica w nerczycy dziecięcej jest jednym z najgroźniejszych powikłań śmiertelnych."
          }
        ]
      },
      {
        stepNum: 8,
        title: "Krok 8: Ocena odpowiedzi na leczenie – Remisja i edukacja rodziców",
        desc: "W 14. dobie sterydoterapii w 3 kolejnych porannych badaniach moczu stwierdzasz całkowity brak białka (pasek ujemny / białko w moczu <4 mg/m2/h). Obrzęki ustąpiły, a masa ciała spadła o 2.4 kg. Jak definiuje się tę odpowiedź i jakie zalecenia otrzymują rodzice przy wypisie?",
        scenario: "W 14. dobie sterydoterapii w 3 kolejnych porannych badaniach moczu stwierdzasz całkowity brak białka (pasek ujemny / białko w moczu <4 mg/m2/h). Obrzęki ustąpiły, a masa ciała spadła o 2.4 kg. Jak definiuje się tę odpowiedź i jakie zalecenia otrzymują rodzice przy wypisie?",
        options: [
          {
            text: "Rozpoznajesz pełną remisję sterydowrażliwego zespołu nerczycowego (SSNS); zalecasz kontynuację pełnej dawki prednizonu do 4-6 tygodni, przejście na dawkę naprzemienną, codzienne testowanie moczu paskiem testowym w domu, profilaktykę osteoporozy (witamina D3 + wapń), osłonę żołądka oraz szczepienia przeciw pneumokokom po wygaszeniu immunosupresji.",
            correct: true,
            feedback: "Wybitnie! Pełna remisja to ujemne białko w moczu przez 3 kolejne dni. Zespół nerczycowy u dzieci ma tendencję do nawrotów (często prowokowanych przez infekcje wirusowe). Rodzice muszą mieć paski testowe do moczu w domu, a dziecko wymaga profilaktyki steroidoterapii (wapń, witamina D) oraz szczepień przeciw pneumokokom (szczepionki zabite/skoniugowane; szczepionki żywe są przeciwwskazane w trakcie sterydoterapii!)."
          },
          {
            text: "Natychmiastowe odstawienie prednizonu z dnia na dzień po uzyskaniu pierwszego ujemnego wyniku.",
            correct: false,
            feedback: "Kardynalny błąd! Nagłe odstawienie sterydów po 2 tygodniach wywoła ostry przełom nadnerczowy i natychmiastowy nawrót nerczycy."
          },
          {
            text: "Zalecenie podania szczepionki żywej przeciw odrze i ospie w szczycie sterydoterapii.",
            correct: false,
            feedback: "Błąd śmiertelny: szczepionki żywe u dziecka na wysokich dawkach sterydów grożą uogólnionym, śmiertelnym zakażeniem poszczepiennym!"
          },
          {
            text: "Dieta bogatotłuszczowa z dużą zawartością soli kuchennej.",
            correct: false,
            feedback: "W nerczycy zaleca się dietę normobiałkową z ograniczeniem sodu."
          }
        ]
      }
    ];
  });

  console.log("Cases 104 and 105 successfully upgraded with deep clinical stories!");
}

run().catch(console.error);

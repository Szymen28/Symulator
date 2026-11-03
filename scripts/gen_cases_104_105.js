const fs = require('fs');
const { encryptStringAes } = require('./encrypt_case.js');
const PASSWORD = '@LEKSzymon28111999';

const cases = [
  // 104: ZUM u niemowlęcia z gorączką
  {
    id: 104,
    filename: "104_zum_niemowle.json",
    dept: "Pediatria",
    shortTitle: "7-miesięczna dziewczynka – Wysoka gorączka bez innych objawów, drażliwość i wymioty (ZUM niemowląt)",
    diagnosisTitle: "Gorączkowe zakażenie układu moczowego / Ostre odmiedniczkowe zapalenie nerek (Pyelonephritis acuta) u niemowlęcia",
    vitals: [
      { label: "HR", val: "155/min", sub: "Tachykardia gorączkowa", status: "warn" },
      { label: "BP", val: "88/54 mmHg", sub: "Prawidłowe dla wieku", status: "ok" },
      { label: "SpO2", val: "98%", sub: "Prawidłowa", status: "ok" },
      { label: "RR", val: "36/min", sub: "Prawidłowa", status: "ok" },
      { label: "Temp", val: "39.2°C", sub: "Wysoka gorączka", status: "bad" }
    ],
    vitalsObj: { hr: 155, bp: "88/54", spo2: 98, rr: 36, temp: 39.2 },
    story: "7-miesięczna dziewczynka została przyniesiona przez zaniepokojonych rodziców na SOR z powodu utrzymującej się od 36 godzin wysokiej gorączki do 39.5°C, słabo reagującej na paracetamol i ibuprofen. Dziecko jest rozdrażnione, płaczliwe przy przewijaniu, ma gorsze łaknienie i zwymiotowało dwa ostatnie posiłki. Rodzice nie zauważyli kataru, kaszlu ani biegunki. W badaniu przedmiotowym brak cech zapalenia gardła czy ucha środkowego. Brzuch miękki, obustronne objawy otrzewnowe ujemne, objaw Goldflama trudny do wiarygodnej oceny z uwagi na wiek. Ciemię przednie na poziomie kości czaszki.",
    labs: [
      {
        category: "Morfologia i parametry zapalne",
        items: [
          { name: "Leukocyty (WBC)", val: "18.6 G/L", norm: "6.0–17.5 G/L", flag: "H" },
          { name: "Neutrofile", val: "74%", norm: "20–45%", flag: "H" },
          { name: "CRP", val: "68 mg/L", norm: "< 5.0 mg/L", flag: "H" },
          { name: "Prokalcytonina (PCT)", val: "1.45 ng/mL", norm: "< 0.5 ng/mL", flag: "H" }
        ]
      },
      {
        category: "Badanie ogólne moczu (z cewnikowania)",
        items: [
          { name: "Barwa i przejrzystość", val: "Mętny, słomkowy", norm: "Klarowny", flag: "H" },
          { name: "Leukocyty w osadzie", val: "Gęsto pokrywają pole widzenia (>50 wpw)", norm: "0–5 wpw", flag: "H" },
          { name: "Azotyny (Nitrite)", val: "Dodatnie (+)", norm: "Ujemne", flag: "H" },
          { name: "Esteraza leukocytowa", val: "+++ (obecna)", norm: "Ujemna", flag: "H" },
          { name: "Białko w moczu", val: "0.45 g/L", norm: "Nieobecne", flag: "H" },
          { name: "Erytrocyty", val: "5–10 wpw", norm: "0–3 wpw", flag: "H" }
        ]
      },
      {
        category: "Posiew moczu i biochemia",
        items: [
          { name: "Posiew moczu (cewnikowanie)", val: "> 10^5 CFU/mL Escherichia coli", norm: "Jałowy", flag: "H" },
          { name: "Kreatynina surowicy", val: "0.32 mg/dL", norm: "0.20–0.45 mg/dL", flag: "N" },
          { name: "Mocznik", val: "22 mg/dL", norm: "15–36 mg/dL", flag: "N" },
          { name: "Sód / Potas", val: "138 / 4.4 mmol/L", norm: "135–145 / 3.8–5.0", flag: "N" }
        ]
      }
    ],
    steps: [
      {
        num: 1,
        title: "Wstępna ocena stanu klinicznego niemowlęcia z gorączką",
        task: "Niemowlę z gorączką 39.2°C bez uchwytnego ogniska w badaniu fizykalnym (fever without source) wymaga natychmiastowej oceny ryzyka ciężkiego zakażenia bakteryjnego. Jaki jest Twój pierwszy krok?",
        options: [
          { text: "Rozpoznanie infekcji wirusowej i odesłanie do domu z zaleceniem podawania paracetamolu", correct: false, feedback: "Błąd! Niemowlę poniżej 12. miesiąca życia z gorączką bez uchwytnego źródła ma wysokie ryzyko zakażenia układu moczowego (5-10% przypadków), które nieleczone prowadzi do bliznowacenia nerek." },
          { text: "Ocena hemodynamiczna i nawodnienia, badanie ciemiączka, pobranie krwi na markery zapalne oraz zaplanowanie badania moczu", correct: true, feedback: "Prawidłowo! Każde niemowlę z gorączką bez uchwytnego źródła wymaga wykluczenia ciężkiego zakażenia bakteryjnego (SBI), a ZUM jest najczęstszą przyczyną gorączki u niemowląt płci żeńskiej." },
          { text: "Natychmiastowa punkcja lędźwiowa bez żadnych badań wstępnych", correct: false, feedback: "Przesada na tym etapie: dziecko ma prawidłowe napięcie ciemiączka i brak objawów oponowych; pierwszym badaniem wykluczającym najczęstszą przyczynę jest badanie moczu." },
          { text: "Podanie dożylne wankomycyny z gentamycyną bez pobrania materiałów na posiewy", correct: false, feedback: "Błąd kardynalny! Podanie antybiotyku przed pobraniem posiewu zafałszuje wyniki diagnostyki mikrobiologicznej." }
        ]
      },
      {
        num: 2,
        title: "Prawidłowa technika pobrania moczu do badań",
        task: "Pielęgniarka pyta, w jaki sposób pobrać mocz od 7-miesięcznej dziewczynki do badania ogólnego i na posiew.",
        options: [
          { text: "Przyklejenie woreczka na krocze i wysłanie moczu na posiew", correct: false, feedback: "Błąd! Zgodnie z wytycznymi PTNFD i AAP woreczek na mocz ma >50% odsetek wyników fałszywie dodatnich z powodu kontaminacji ze skóry krocza. Nie wolno stawiać rozpoznania ani pobierać posiewu z woreczka!" },
          { text: "Pobranie moczu przez jednorazowe cewnikowanie pęcherza moczowego lub nakłucie nadłonowe", correct: true, feedback: "Doskonale! Złotym standardem u niemowląt niekontrolujących mikcji jest jednorazowe cewnikowanie pęcherza w warunkach aseptycznych lub nakłucie nadłonowe (suprapubic aspiration)." },
          { text: "Odczekanie do momentu, gdy dziecko samodzielnie odda mocz na pieluszkę i odciśnięcie jej", correct: false, feedback: "Błąd! Mocz odciśnięty z pieluszki jest bezwartościowy diagnostycznie i skrajnie skażony." },
          { text: "Zrezygnowanie z badania moczu na rzecz posiewu krwi", correct: false, feedback: "Błąd! Posiew krwi nie zastępuje badania moczu w diagnostyce ZUM." }
        ]
      },
      {
        num: 3,
        title: "Interpretacja testu paskowego i mikroskopowego osadu moczu",
        task: "Wynik badania moczu z cewnikowania wykazuje: leukocyty gęsto pokrywające pole widzenia, esterazę leukocytową (+++) oraz dodatnie azotyny. Jak interpretujesz ten wynik?",
        options: [
          { text: "Obecność azotynów i esterazy leukocytowej z leukocyturią jednoznacznie wskazuje na ZUM o etiologii Gram-ujemnej", correct: true, feedback: "Znakomicie! Bakterie z rodziny Enterobacteriaceae (najczęściej E. coli) redukują azotany do azotynów. Połączenie leukocyturii z azotynami ma swoistość > 95% dla ZUM." },
          { text: "To tylko bezobjawowy bakteriomocz i nie wymaga żadnego leczenia", correct: false, feedback: "Błąd! Gorączka 39.2°C, wysoki CRP i leukocyturia to pełnoobjawowe gorączkowe ZUM (ostre odmiedniczkowe zapalenie nerek)." },
          { text: "Dodatnie azotyny świadczą o zakażeniu Enterococcus faecalis", correct: false, feedback: "Błąd! Bakterie Gram-dodatnie (jak enterokoki) nie wytwarzają reduktazy azotanowej i dają test azotynowy ujemny." },
          { text: "Paskowy test na azotyny jest zawsze fałszywie dodatni u niemowląt", correct: false, feedback: "Nieprawda. Fałszywie ujemny może być przy częstym oddawaniu moczu (<4h zalegania w pęcherzu), ale wynik dodatni jest wysoce swoisty!" }
        ]
      },
      {
        num: 4,
        title: "Wybór empirycznej antybiotykoterapii",
        task: "Dziecko ma gorączkę, wymioty i laboratoryjne cechy ostrego odmiedniczkowego zapalenia nerek (OOZN). Jaki schemat leczenia przeciwdrobnoustrojowego wdrożysz?",
        options: [
          { text: "Nitrofurantoina doustnie przez 3 dni", correct: false, feedback: "Kardynalny błąd! Nitrofurantoina NIE osiąga stężeń terapeutycznych w miąższu nerek ani we krwi – jest bezwzględnie przeciwwskazana w odmiedniczkowym zapaleniu nerek i sepsie moczowej!" },
          { text: "Cefalosporyna III generacji i.v. (np. cefotaksym lub ceftriakson) w monoterapii lub ampicylina z gentamycyną", correct: true, feedback: "Doskonale! U gorączkującego niemowlęcia z wymiotami wskazana jest hospitalizacja i antybiotykoterapia dożylna cefalosporyną III generacji (cefotaksym/ceftriakson), pokrywająca szczepy E. coli, Klebsiella i Proteus." },
          { text: "Ciprofloksacyna doustnie przez 14 dni", correct: false, feedback: "Błąd! Fluorochinolony nie są lekiem pierwszego rzutu u dzieci z powodu potencjalnej toksyczności chrzęstnej; stosuje się je tylko w przypadkach oporności na inne leki." },
          { text: "Kotrimoksazol doustnie bez hospitalizacji", correct: false, feedback: "Błąd! Dziecko wymiotuje, ma wysoką gorączkę i wiek <12 m.ż. Wskaźniki zapalne i wiek wymagają leczenia parenteralnego." }
        ]
      },
      {
        num: 5,
        title: "Pilna diagnostyka obrazowa w fazie ostrej",
        task: "Jakie badanie obrazowe należy wykonać u niemowlęcia podczas pierwszej hospitalizacji z powodu gorączkowego ZUM?",
        options: [
          { text: "USG nerek i dróg moczowych w trakcie pobytu w oddziale", correct: true, feedback: "Prawidłowo! Zgodnie z wytycznymi PTNFD i EAU, u każdego dziecka z pierwszym epizodem gorączkowego ZUM należy wykonać USG nerek w celu wykluczenia wodonercza, wad zaporowych dróg moczowych lub roponercza." },
          { text: "Natychmiastowa cystourografia mikcyjna (CUM) w 1. dobie ostrej infekcji", correct: false, feedback: "Błąd! CUM jest przeciwwskazana w ostrej fazie ZUM z uwagi na ryzyko uogólnienia zakażenia i fałszywych rozpoznań odpływu z powodu obrzęku ujścia moczowodów. Wykonuje się ją najwcześniej 4–6 tygodni po wyleczeniu infekcji." },
          { text: "Tomografia komputerowa jamy brzusznej z kontrastem u każdego pacjenta", correct: false, feedback: "Nieuzasadnione narażenie niemowlęcia na promieniowanie jonizujące i nefrotoksyczny kontrast." },
          { text: "Scyntygrafia DMSA w ciągu pierwszych 6 godzin", correct: false, feedback: "Błąd! Scyntygrafia DMSA do oceny trwałych blizn miąższowych jest wykonywana po 6 miesiącach od przebytego epizodu OOZN." }
        ]
      },
      {
        num: 6,
        title: "Kwalifikacja do dalszej diagnostyki wad układu moczowego",
        task: "W USG nerek uwidoczniono poszerzenie miedniczki nerkowej lewej do 12 mm oraz kielichów. Gorączka ustąpiła po 48h leczenia i.v. Jakie są dalsze wskazania diagnostyczne po wyleczeniu ostrej infekcji?",
        options: [
          { text: "Wykonanie cystourografii mikcyjnej (CUM) po 4–6 tygodniach od wyleczenia ZUM", correct: true, feedback: "Bardzo dobrze! Nieprawidłowy wynik USG (poszerzenie UKM) po pierwszym epizodzie gorączkowego ZUM stanowi bezwzględne wskazanie do wykonania CUM w celu weryfikacji odpływu pęcherzowo-moczowodowego (VUR)." },
          { text: "Całkowite zaniechanie dalszej diagnostyki, jeśli CRP spadło do normy", correct: false, feedback: "Błąd! Poszerzenie UKM w USG u niemowlęcia po epizodzie OOZN wymaga wyjaśnienia wady anatomicznej." },
          { text: "Natychmiastowa nefrektomia lewostronna", correct: false, feedback: "Absurdalnie inwazyjne postępowanie bez podstaw klinicznych." },
          { text: "Wykonanie rezonansu magnetycznego całego ciała", correct: false, feedback: "Zbędne i niecelowe badanie." }
        ]
      },
      {
        num: 7,
        title: "Dokończenie leczenia i modyfikacja terapii",
        task: "W 3. dobie uzyskano wynik posiewu: E. coli >10^5 CFU/mL, w pełni wrażliwa na cefalosporyny i amoksycylinę z kwasem klawulanowym. Dziecko nie gorączkuje, pije chętnie. Jak zaplanujesz dalszą antybiotykoterapię?",
        options: [
          { text: "Zakończenie leczenia już teraz, ponieważ ustąpiła gorączka", correct: false, feedback: "Błąd! Za wczesne odstawienie leku grozi nawrotem i niepełną eradykacją ogniska w miąższu nerki." },
          { text: "Przejście na leczenie doustne (terapia sekwencyjna, np. cefiksym lub amoksycylina z klawulanianem) do łącznego czasu 10 dni", correct: true, feedback: "Znakomicie! Po uzyskaniu poprawy klinicznej (ustąpienie gorączki i wymiotów) zaleca się terapię sekwencyjną p.o. Łączny czas leczenia OOZN u niemowląt wynosi 10–14 dni." },
          { text: "Kontynuacja bolesnych wstrzyknięć domięśniowych gentamycyny przez kolejne 21 dni", correct: false, feedback: "Błędne i niepotrzebnie narażające dziecko na nefrotoksyczność i ototoksyczność aminoglikozydu." },
          { text: "Podanie pojedynczej dawki fosfomycyny trometamol", correct: false, feedback: "Fosfomycyna w pojedynczej dawce jest stosowana w niepowikłanym zapaleniu pęcherza u nastolatków/dorosłych, nie w OOZN u niemowlęcia." }
        ]
      },
      {
        num: 8,
        title: "Profilaktyka przeciwbakteryjna i zalecenia przy wypisie",
        task: "Rodzice pytają o profilaktyczne podawanie furaginy po zakończeniu leczenia do czasu wykonania CUM.",
        options: [
          { text: "Zalecenie profilaktyki przeciwbakteryjnej (np. trimetoprim lub furagina w 1 dawce na noc) z uwagi na poszerzenie UKM w USG do czasu wyjaśnienia wady w CUM", correct: true, feedback: "Świetnie! Zgodnie z wytycznymi PTNFD, u dzieci z nieprawidłowym obrazem USG (podejrzenie wady zaporowej lub VUR wysokiego stopnia) do czasu wykonania CUM uzasadnione jest stosowanie profilaktyki przeciwbakteryjnej w 1/3 dawki leczniczej na noc." },
          { text: "Zalecenie codziennego stosowania pełnych dawek ciprofloksacyny przez rok", correct: false, feedback: "Błąd! Toksyczność i selekcja szczepów opornych." },
          { text: "Zabronienie podawania jakichkolwiek płynów dziecku", correct: false, feedback: "Karygodny błąd – odpowiednie nawodnienie i regularne opróżnianie pęcherza zapobiegają kolonizacji wstępującej!" },
          { text: "Zalecenie kąpieli w gorącej wodzie z mydłem antybakteryjnym dopochwowo", correct: false, feedback: "Błąd! Płyny do higieny intymnej mogą podrażniać cewkę i niszczyć naturalną florę ochronną sromu." }
        ]
      }
    ],
    pathoNodes: [
      {
        title: "1. Kolonizacja urotelium drogą wstępującą",
        desc: "Szczepy uropatogennej E. coli (UPEC) posiadające fimbrie typu P wiążą się ze swoistymi receptorami glikolipidowymi komórek nabłonka dróg moczowych, wnikając do pęcherza i moczowodów.",
        drugTarget: "Prawidłowa higiena krocza, odpowiednie nawodnienie i przepływ moczu utrudniający adhezję"
      },
      {
        title: "2. Reakcja zapalna w miąższu nerkowym (OOZN)",
        desc: "Endotoksyny (LPS) i czynniki wirulencji bakterii aktywują receptory TLR4, wyzwalając kaskadę cytokin (IL-1, IL-6, TNF-alfa), napływ granulocytów i obrzęk śródmiąższu nerki.",
        drugTarget: "Antybiotykoterapia bakteriobójcza (cefalosporyny III gen., beta-laktamy) eliminująca patogen"
      },
      {
        title: "3. Ryzyko powstawania blizn i dysfunkcji nerek",
        desc: "Uogólniony odczyn zapalny w niedojrzałym miąższu nerki może prowadzić do nieodwracalnego włóknienia i bliznowacenia, sprzyjając w przyszłości rozwojowi nadciśnienia tętniczego i PChN.",
        drugTarget: "Wczesne wdrożenie antybiotyku (<48-72h od początku gorączki) minimalizuje ryzyko bliznowacenia"
      }
    ],
    dutySummary: "Gorączkowe ZUM u niemowląt to ostre odmiedniczkowe zapalenie nerek wymagające pilnej diagnostyki. Nigdy nie pobieraj posiewu z woreczka na mocz (stosuj cewnikowanie aseptyczne). Nitrofurantoina jest bezwzględnie nieskuteczna w OOZN! Po pierwszym epizodzie gorączkowego ZUM wykonaj USG nerek w trakcie pobytu, a CUM planuj po 4-6 tyg. w przypadku nieprawidłowego USG.",
    diffTable: [
      { disease: "Zakażenie wirusowe (gorączka bez źródła)", diff: "Prawidłowe badanie moczu, brak leukocyturii i azotynów, niska prokalcytonina.", test: "Badanie ogólne i posiew moczu z cewnikowania." },
      { disease: "Bezobjawowy bakteriomocz", diff: "Brak gorączki i objawów ogólnych, prawidłowe CRP i PCT, obecność bakterii bez reakcji zapalnej.", test: "Stan kliniczny + markery stanu zapalnego we krwi." },
      { disease: "Zapalenie opon mózgowo-rdzeniowych (ZOMR)", diff: "Wypukłe ciemię, przeczulica, objawy oponowe, drgawki, zaburzenia świadomości.", test: "Nakłucie lędźwiowe i badanie płynu m.-r." },
      { disease: "Zapalenie wyrostka robaczkowego", diff: "Bolesność palpacyjna brzucha, obrona mięśniowa, brak bakterii w jałowo pobranym moczu.", test: "USG jamy brzusznej, brak leukocyturii w moczu z cewnika." }
    ],
    lekQuestions: [
      {
        question: "U 6-miesięcznego niemowlęcia z gorączką 39°C bez uchwytnej przyczyny w badaniu fizykalnym podejrzewa się zakażenie układu moczowego. Wskaż prawidłowe postępowanie dotyczące pobrania moczu na posiew wg zaleceń PTNFD:",
        options: [
          "Mocz na posiew należy pobrać do woreczka przyklejanego na krocze po uprzednim odkażeniu skóry.",
          "Mocz na posiew należy pobrać przez jednorazowe cewnikowanie pęcherza moczowego lub nakłucie nadłonowe.",
          "Wystarczy odcisnąć mocz z pieluszki jednorazowej.",
          "Badanie posiewu moczu nie jest konieczne, jeśli test paskowy wykazuje leukocyturię.",
          "Mocz na posiew pobiera się wyłącznie po zakończeniu 3-dniowej empirycznej antybiotykoterapii."
        ],
        correct: 1,
        explanation: "Zgodnie z wytycznymi PTNFD i AAP, mocz do badania mikrobiologicznego u niemowląt niekontrolujących mikcji musi być pobrany drogą cewnikowania pęcherza moczowego lub nakłucia nadłonowego. Woreczki naklejane na krocze charakteryzują się bardzo wysokim odsetkiem wyników fałszywie dodatnich (>50%) z powodu zanieczyszczenia florą skórną i nie mogą służyć do potwierdzania rozpoznania ZUM ani pobierania posiewu."
      },
      {
        question: "Który z poniższych leków przeciwbakteryjnych jest BEZWZGLĘDNIE PRZECIWWSKAZANY w leczeniu ostrego odmiedniczkowego zapalenia nerek (OOZN) u dzieci?",
        options: [
          "Cefotaksym.",
          "Ceftriakson.",
          "Nitrofurantoina.",
          "Amoksycylina z kwasem klawulanowym.",
          "Cefuroksym aksetyl."
        ],
        correct: 2,
        explanation: "Nitrofurantoina osiąga stężenia terapeutyczne wyłącznie w świetle dolnych dróg moczowych (pęcherzu), natomiast nie przenika i nie osiąga stężeń terapeutycznych w miąższu nerek ani w surowicy krwi. Dlatego jest bezwzględnie nieskuteczna i przeciwwskazana w leczeniu ostrego odmiedniczkowego zapalenia nerek (OOZN) oraz w stanach septycznych."
      },
      {
        question: "Wskaż bezwzględne wskazanie do wykonania cystourografii mikcyjnej (CUM) u małego dziecka po przebyciu ZUM:",
        options: [
          "Każde niegorączkowe zapalenie pęcherza moczowego u dziewczynki powyżej 5. r.ż.",
          "Nieprawidłowy obraz USG nerek (np. poszerzenie UKM, podejrzenie wady anatomicznej) lub nawrotowe gorączkowe ZUM.",
          "Pojedynczy epizod ZUM wywołany przez w pełni wrażliwą E. coli z całkowicie prawidłowym USG nerek.",
          "Wyłącznie obecność bezobjawowego bakteriomoczu.",
          "Przebycie ostrej biegunki rotawirusowej."
        ],
        correct: 1,
        explanation: "Wskazaniami do wykonania CUM są: nieprawidłowości w USG nerek (poszerzenie UKM, cechy wady zaporowej), nawracające gorączkowe ZUM (OOZN), zakażenie florą inną niż E. coli, a także ciężki przebieg zakażenia z posocznicą moczową."
      }
    ],
    flashcards: [
      { q: "Dlaczego nie wolno pobierać moczu na posiew do woreczka naklejanego na krocze?", a: "Odsetek wyników fałszywie dodatnich wynosi >50% z powodu kontaminacji florą skóry; do posiewu konieczne jest cewnikowanie lub nakłucie nadłonowe.", cat: "Pediatria" },
      { q: "Dlaczego nitrofurantoina jest przeciwwskazana w odmiedniczkowym zapaleniu nerek (OOZN)?", a: "Nie osiąga stężeń terapeutycznych w miąższu nerek ani w surowicy krwi; działa wyłącznie w dolnych drogach moczowych (pęcherzu).", cat: "Pediatria" },
      { q: "Jaki jest antybiotyk empiryczny z wyboru w gorączkowym ZUM u niemowlęcia wymagającego hospitalizacji?", a: "Cefalosporyna III generacji i.v. (cefotaksym lub ceftriakson).", cat: "Pediatria" },
      { q: "Kiedy najwcześniej wykonuje się cystourografię mikcyjną (CUM) po ostrym ZUM?", a: "Po 4–6 tygodniach od wyleczenia zakażenia, po upewnieniu się, że posiew moczu jest jałowy.", cat: "Pediatria" },
      { q: "Jaka jest definicja znamiennego bakteriomoczu w moczu pobranym przez cewnikowanie pęcherza?", a: ">= 10^4 do 10^5 CFU/mL jednego gatunku bakterii (w nakłuciu nadłonowym każda liczba bakterii Gram-ujemnych).", cat: "Pediatria" }
    ]
  },

  // 105: Zespół nerczycowy MCD u 3-latka
  {
    id: 105,
    filename: "105_zespol_nerczycowy_mcd.json",
    dept: "Pediatria",
    shortTitle: "3-letni chłopiec – Narastające obrzęki powiek i moszny, ciastowate obrzęki podudzi (Zespół nerczycowy / MCD)",
    diagnosisTitle: "Idiopatyczny zespół nerczycowy / Submikroskopowe kłębuszkowe zapalenie nerek (Minimal Change Disease - MCD)",
    vitals: [
      { label: "HR", val: "96/min", sub: "Prawidłowa", status: "ok" },
      { label: "BP", val: "94/58 mmHg", sub: "Prawidłowe ciśnienie (brak NT)", status: "ok" },
      { label: "SpO2", val: "99%", sub: "Prawidłowa", status: "ok" },
      { label: "RR", val: "22/min", sub: "Prawidłowa", status: "ok" },
      { label: "Temp", val: "36.7°C", sub: "Prawidłowa", status: "ok" }
    ],
    vitalsObj: { hr: 96, bp: "94/58", spo2: 99, rr: 22, temp: 36.7 },
    story: "3-letni dotychczas zdrowy chłopiec został przyprowadzony do pediatry przez rodziców z powodu 'opuchniętych oczu' zauważonych rano od 4 dni. Początkowo rodzice podejrzewali alergię, jednak w kolejnych dobach obrzęki objęły mosznę, powłoki brzuszne oraz podudzia, a masa ciała dziecka wzrosła o 2.5 kg w ciągu tygodnia. Dziecko oddaje mniejszą ilość moczu, który mocno się pieni. W badaniu przedmiotowym: obustronne ciastowate obrzęki twarzy (najbardziej nasilone w okolicy oczodołów), obrzęk moszny, powiększony obwód brzucha z objawem chełbotania (niewielkie wodobrzusze), brak zmian osłuchowych nad płucami i sercem. Ciśnienie tętnicze 94/58 mmHg (centyl 50 dla płci, wieku i wzrostu).",
    labs: [
      {
        category: "Badanie moczu i wskaźniki białkomoczu",
        items: [
          { name: "Białko w moczu (test paskowy)", val: "++++ (> 300 mg/dL)", norm: "Nieobecne", flag: "H" },
          { name: "Wskaźnik białko/kreatynina (UPCR)", val: "7.8 mg/mg", norm: "< 0.2 mg/mg", flag: "H" },
          { name: "Dobowa utrata białka z moczem", val: "85 mg/kg mc./dobę", norm: "< 4 mg/kg mc./d", flag: "H" },
          { name: "Erytrocyty w osadzie", val: "0–1 wpw (brak krwinkomoczu)", norm: "0–3 wpw", flag: "N" },
          { name: "Leukocyty w osadzie", val: "1–2 wpw", norm: "0–5 wpw", flag: "N" }
        ]
      },
      {
        category: "Biochemia surowicy i białka",
        items: [
          { name: "Albumina surowicy", val: "16 g/L", norm: "38–54 g/L", flag: "L" },
          { name: "Białko całkowite", val: "36 g/L", norm: "60–80 g/L", flag: "L" },
          { name: "Cholesterol całkowity", val: "420 mg/dL (10.8 mmol/L)", norm: "< 170 mg/dL", flag: "H" },
          { name: "Triglicerydy", val: "310 mg/dL", norm: "< 100 mg/dL", flag: "H" },
          { name: "Kreatynina surowicy", val: "0.38 mg/dL", norm: "0.25–0.50 mg/dL", flag: "N" },
          { name: "Mocznik surowicy", val: "24 mg/dL", norm: "15–40 mg/dL", flag: "N" }
        ]
      },
      {
        category: "Immunologia i krzepnięcie",
        items: [
          { name: "Składowa C3 dopełniacza", val: "115 mg/dL", norm: "90–180 mg/dL", flag: "N" },
          { name: "Składowa C4 dopełniacza", val: "28 mg/dL", norm: "15–45 mg/dL", flag: "N" },
          { name: "Przeciwciała ANA", val: "Ujemne", norm: "Ujemne", flag: "N" },
          { name: "Antytrombina III (AT-III)", val: "54%", norm: "80–120%", flag: "L" },
          { name: "Fibrynogen", val: "5.2 g/L", norm: "2.0–4.0 g/L", flag: "H" }
        ]
      }
    ],
    steps: [
      {
        num: 1,
        title: "Rozpoznanie kliniczne zespołu nerczycowego",
        task: "Na podstawie tetrad objawów u 3-letniego chłopca (obrzęki, hipoalbuminemia 16 g/L, UPCR 7.8 mg/mg, hiperlipidemia), jakie rozpoznanie stawiasz?",
        options: [
          { text: "Zespół nerczycowy", correct: true, feedback: "Prawidłowo! Pełnoobjawowa tetrada zespołu nerczycowego to: białkomocz nerczycowy (>50 mg/kg mc./dobę lub UPCR >2.0 mg/mg), hipoalbuminemia (<25 g/L), uogólnione obrzęki oraz hiperlipidemia." },
          { text: "Ostre popaciorkowcowe kłębuszkowe zapalenie nerek (zespół nefrytyczny)", correct: false, feedback: "Błąd! W zespole nefrytycznym dominują: krwinkomocz/krwiomocz makroskopowy, nadciśnienie tętnicze i umiarkowany białkomocz, a tutaj brak erytrocyturii i ciśnienie jest w normie." },
          { text: "Niewydolność serca z zastojem obwodowym", correct: false, feedback: "Błąd! W niewydolności serca nie występuje selektywny masywny białkomocz z hipoalbuminemią 16 g/L." },
          { text: "Wstrząs anafilaktyczny z obrzękiem naczynioruchowym", correct: false, feedback: "Błąd! Obrzęk naczynioruchowy rozwija się w ciągu minut/godzin i nie daje białkomoczu ani hipercholesterolemii." }
        ]
      },
      {
        num: 2,
        title: "Kwalifikacja do biopsji nerki u dziecka",
        task: "Czy u 3-letniego dziecka z typowym pierwszym rzutem idiopatycznego zespołu nerczycowego należy przed włączeniem leczenia wykonać przezskórną biopsję nerki?",
        options: [
          { text: "Nie, biopsja nerki nie jest wskazana – u dzieci w wieku 1–10 lat >85-90% przypadków stanowi choroba zmian minimalnych (MCD) i wdraża się empiryczną sterydoterapię", correct: true, feedback: "Doskonale! Zgodnie z wytycznymi KDIGO i PTNFD, u dzieci między 1. a 10. rokiem życia bez cech nefrytycznych (krwinkomoczu, nadciśnienia, niewydolności nerek, hipokomplementemii) leczenie prednizonem rozpoczyna się bez wcześniejszej biopsji." },
          { text: "Tak, biopsja nerki jest bezwzględnie konieczna przed podaniem jakiegokolwiek leku", correct: false, feedback: "Błąd! Biopsja nerki jest zabiegiem inwazyjnym i u typowych małych dzieci nie jest rutynowo wykonywana przed próbą sterydoterapii." },
          { text: "Tak, ale tylko w celu wykluczenia amyloidozy nerek", correct: false, feedback: "Błąd! Amyloidoza nerek u 3-latka jest kazuistyką." },
          { text: "Biopsję należy zastąpić scyntygrafią dynamiczną nerek z kaptoprilem", correct: false, feedback: "Błąd! Scyntygrafia z kaptoprilem służy do diagnostyki zwężenia tętnicy nerkowej w nadciśnieniu naczyniowo-nerkowym." }
        ]
      },
      {
        num: 3,
        title: "Wdrożenie leczenia pierwszego rzutu",
        task: "Jaki jest lek pierwszego rzutu i jego dawkowanie w pierwszym rzucie idiopatycznego zespołu nerczycowego u dziecka?",
        options: [
          { text: "Prednizon w dawce 60 mg/m2 pc./dobę (lub 2 mg/kg mc./d, maks. 60 mg/d) doustnie przez 4–6 tygodni", correct: true, feedback: "Znakomicie! Standardowy protokół KDIGO/PTNFD zakłada prednizon doustnie 60 mg/m2/d (lub 2 mg/kg mc./d) codziennie w dawce pojedynczej rannej przez 4-6 tygodni, a po uzyskaniu remisji przejście na schemat co drugi dzień (40 mg/m2/d)." },
          { text: "Cyklofosfamid dożylnie w pulsach co 4 tygodnie", correct: false, feedback: "Błąd! Cytostatyki nie są lekami pierwszego rzutu; stosuje się je dopiero przy częstych nawrotach lub sterydooporności." },
          { text: "Cyklosporyna A z mykofenolanem mofetylu od 1. dnia", correct: false, feedback: "Błąd! Inhibitory kalcyneuryny są lekami drugiego rzutu." },
          { text: "Furosemid w wysokiej dawce w monoterapii bez glikokortykosteroidów", correct: false, feedback: "Błąd! Furosemid nie leczy przyczyny (uszkodzenia podocytów) i w hipoalbuminemii może wywołać ciężką hipowolemię i zakrzepicę." }
        ]
      },
      {
        num: 4,
        title: "Leczenie objawowe masywnych obrzęków",
        task: "Dziecko ma nasilone obrzęki i skąpomocz. Jak bezpiecznie zastosować leczenie moczopędne u dziecka z ciężką hipoalbuminemią (16 g/L)?",
        options: [
          { text: "Podanie dożylne 20% albuminy (0.5–1.0 g/kg mc. we wlewie przez 2–4 h), a pod koniec wlewu podanie furosemidu i.v.", correct: true, feedback: "Świetnie! Furosemid działa w świetle cewek nerkowych po związaniu z albuminą. W ciężkiej hipoalbuminemii podanie samego furosemidu pogłębia hipowolemię wewnątrznaczyniową. Wlew 20% albuminy ściąga płyn do łożyska naczyniowego, a furosemid umożliwia jego wydalenie." },
          { text: "Szybkie bolusy 40 mg furosemidu bez wyrównania albumin", correct: false, feedback: "Niebezpieczne! Grozi hipowolemią, wstrząsem i ostrym uszkodzeniem nerek (AKI) oraz incydentem zakrzepowo-zatorowym." },
          { text: "Przetoczenie 2 jednostek koncentratu krwinek czerwonych (KKCz)", correct: false, feedback: "Błąd! Chłopiec nie ma niedokrwistości; hemokoncentracja może być wręcz podwyższona." },
          { text: "Podawanie mannitolu 20% dożylnie w szybkim bolusie", correct: false, feedback: "Mannitol nie jest lekiem z wyboru w obrzękach nerczycowych i grozi powikłaniami nerkowymi." }
        ]
      },
      {
        num: 5,
        title: "Zapobieganie powikłaniom infekcyjnym i zakrzepowym",
        task: "Dlaczego pacjenci z zespołem nerczycowym są w grupie wysokiego ryzyka ciężkich zakażeń bakteryjnych (np. pneumokokowego zapalenia otrzewnej) oraz powikłań zakrzepowych?",
        options: [
          { text: "Z moczem tracone są immunoglobuliny IgG oraz antytrombina III, a wątroba kompensacyjnie zwiększa syntezę fibrynogenu", correct: true, feedback: "Dokładnie tak! W zespole nerczycowym dochodzi do utraty IgG (hipogammaglobulinemia) i czynników opsonizujących (podatność na zakażenia bakteriami otoczkowymi, np. S. pneumoniae) oraz utraty antytrombiny III przy wzroście fibrynogenu i płytek krwi (stan prozakrzepowy)." },
          { text: "Dochodzi do mutacji receptora dla heparyny i wrodzonej hemofilii", correct: false, feedback: "Bzdura medyczna." },
          { text: "Białkomocz powoduje bezpośrednie niszczenie szpiku kostnego", correct: false, feedback: "Nieprawda – szpik funkcjonuje prawidłowo." },
          { text: "Podwyższony poziom cholesterolu blokuje leukocyty i układ krzepnięcia", correct: false, feedback: "To nie hipercholesterolemia jest bezpośrednią przyczyną immunosupresji i zakrzepicy, lecz dysproteinemia." }
        ]
      },
      {
        num: 6,
        title: "Kryteria remisji i monitorowanie domowe",
        task: "Co uznaje się za kryterium pełnej remisji zespołu nerczycowego w badaniu moczu?",
        options: [
          { text: "Spadek białkomoczu do 0 lub śladu (UPCR < 0.2 mg/mg) przez 3 kolejne dni", correct: true, feedback: "Prawidłowo! Kryterium remisji wg KDIGO to ujemny wynik białka w moczu w teście paskowym (lub ślad, UPCR < 0.2 mg/mg) przez 3 kolejne dni. Rodzice są szkoleni w codziennym badaniu moczu paskiem rano." },
          { text: "Spadek masy ciała o 500 g w ciągu miesiąca", correct: false, feedback: "Niewystarczające i niemiarodajne kryterium." },
          { text: "Obecność wałeczków szklistych w moczu", correct: false, feedback: "Nie świadczy o remisji." },
          { text: "Wzrost ciśnienia tętniczego powyżej 99. centyla", correct: false, feedback: "To objaw niepożądany sterydoterapii, a nie kryterium remisji." }
        ]
      },
      {
        num: 7,
        title: "Definicja sterydowrażliwości i sterydooporności",
        task: "Chłopiec po 14 dniach leczenia prednizonem osiągnął całkowity brak białka w moczu, obrzęki ustąpiły, stężenie albumin wzrosło do 34 g/L. Jak definiujemy tę postać?",
        options: [
          { text: "Zespół nerczycowy sterydowrażliwy (SSNS - Steroid-Sensitive Nephrotic Syndrome)", correct: true, feedback: "Doskonale! Ustąpienie białkomoczu w ciągu pierwszych 4 tygodni leczenia prednizonem definiuje sterydowrażliwość (SSNS), co dotyczy ponad 85-90% dzieci z MCD i wiąże się z doskonałym odległym rokowaniem nerkowym." },
          { text: "Zespół nerczycowy sterydooporny (SRNS)", correct: false, feedback: "Błąd! Sterydooporność (SRNS) rozpoznaje się, gdy białkomocz utrzymuje się pomimo 4-6 tygodni pełnodawkowego leczenia prednizonem (wskazanie do biopsji nerki)." },
          { text: "Sterydozależność wczesna", correct: false, feedback: "Sterydozależność rozpoznaje się, gdy nawrót występuje w trakcie redukcji dawki sterydu lub w ciągu 14 dni od jego odstawienia." },
          { text: "Ogniskowe segmentowe stwardnienie kłębuszków (FSGS)", correct: false, feedback: "FSGS jest zazwyczaj sterydooporne i wymaga weryfikacji histopatologicznej." }
        ]
      },
      {
        num: 8,
        title: "Zalecenia dotyczące szczepień ochronnych",
        task: "Rodzice pytają o planowane szczepienie przeciwko odrze, śwince i różyczce (MMR). Jakie są zalecenia dotyczące szczepień żywymi szczepionkami w trakcie leczenia immunosupresyjnego?",
        options: [
          { text: "Żywe szczepionki (np. MMR, ospa wietrzna) są BEZWZGLĘDNIE PRZECIWWSKAZANE w trakcie sterydoterapii i przez minimum 1–3 miesiące po jej zakończeniu", correct: true, feedback: "Znakomicie! Podawanie żywych szczepionek atenuowanych u pacjenta otrzymującego wysokie dawki prednizonu (>= 2 mg/kg mc./d) grozi uogólnionym, zagrażającym życiu zakażeniem poszczepiennym. Szczepionki inaktywowane (np. przeciw grypie, pneumokokom) są dozwolone i zalecane." },
          { text: "Można zaszczepić dziecko MMR już jutro, nie ma żadnych ograniczeń", correct: false, feedback: "Kardynalny błąd zagrażający życiu dziecka!" },
          { text: "Szczepienia żywe można podać pod warunkiem podania podwójnej dawki szczepionki", correct: false, feedback: "Niedopuszczalne i niebezpieczne." },
          { text: "W zespole nerczycowym obowiązuje całkowity dożywotni zakaz jakichkolwiek szczepień", correct: false, feedback: "Nieprawda – po zakończeniu immunosupresji kalendarz szczepień jest kontynuowany." }
        ]
      }
    ],
    pathoNodes: [
      {
        title: "1. Zaburzenie funkcji limfocytów T i podocytów",
        desc: "Zaburzenia immunologiczne prowadzą do wydzielania cytokin/czynników przepuszczalności kłębuszkowej, powodując zanik i fuzję wyrostków stopowatych podocytów oraz utratę ujemnego ładunku błony filtracyjnej (heparanosiarczanu).",
        drugTarget: "Glikokortykosteroidy (prednizon) hamujące produkcję cytokin i stabilizujące podocyty"
      },
      {
        title: "2. Selektywny białkomocz i hipoalbuminemia",
        desc: "Utrata ujemnego ładunku filtru kłębuszkowego umożliwia masową ucieczkę ujemnie naładowanych albumin do moczu, prowadząc do głębokiego spadku ciśnienia onkotycznego w łożysku naczyniowym.",
        drugTarget: "Ograniczenie podaży sodu i ewentualny wlew 20% albuminy przy hipowolemii"
      },
      {
        title: "3. Przesunięcie płynów do przestrzeni pozanaczyniowej (obrzęki)",
        desc: "Spadek ciśnienia onkotycznego powoduje ucieczkę wody do trzeciej przestrzeni, hipowolemię wewnątrznaczyniową, aktywację układu RAA i retencję sodu i wody przez nerki (hipoteza underfill).",
        drugTarget: "Diuretyki pętlowe (furosemid) stosowane ostrożnie w połączeniu z albuminą"
      }
    ],
    dutySummary: "Zespół nerczycowy u dziecka 1-10 r.ż. to w >85% choroba zmian minimalnych (MCD). Leczeniem z wyboru jest prednizon 60 mg/m2/d przez 4-6 tyg. Biopsja nie jest wymagana przy typowym obrazie (brak krwinkomoczu, prawidłowe BP i C3). Utrata IgG i antytrombiny III stwarza ryzyko zakażeń pneumokokowych i zakrzepicy. Żywe szczepionki są bezwzględnie przeciwwskazane w trakcie sterydoterapii!",
    diffTable: [
      { disease: "Ostre popaciorkowcowe KZN (zespół nefrytyczny)", diff: "Obecność krwinkomoczu, wałeczków erytrocytarnych, nadciśnienia tętniczego oraz obniżenie składowej C3 dopełniacza.", test: "Badanie osadu moczu (erytrocyty dysmorficzne), ciśnienie tętnicze, C3 i ASO." },
      { disease: "Wrodzony zespół nerczycowy (typ fiński)", diff: "Występuje w pierwszych 3 miesiącach życia, związany z mutacją nefryny (NPHS1), całkowicie oporny na sterydy.", test: "Badania genetyczne (NPHS1, NPHS2), wiek zachorowania." },
      { disease: "Reakcja alergiczna / obrzęk naczynioruchowy Quinckego", diff: "Szybki początek, świąd lub pokrzywka, brak białkomoczu i prawidłowe stężenie albumin w surowicy.", test: "Badanie ogólne moczu (brak białka), albumina w surowicy." },
      { disease: "Niewydolność wątroby (marskość)", diff: "Zaburzenia krzepnięcia (wydłużony PT/INR), cechy nadciśnienia wrotnego, brak selektywnego białkomoczu w moczu.", test: "INR, enzymy wątrobowe, białko w moczu." }
    ],
    lekQuestions: [
      {
        question: "3-letni chłopiec z typowym obrazem idiopatycznego zespołu nerczycowego (obrzęki twarzy i podudzi, albuminemia 18 g/l, UPCR 8 mg/mg, prawidłowe ciśnienie krwi i brak krwinkomoczu) trafia do oddziału pediatrycznego. Jakie jest postępowanie z wyboru?",
        options: [
          "Wykonanie pilnej przezskórnej biopsji nerki przed podaniem leków.",
          "Włączenie prednizonu doustnie w dawce 60 mg/m2 pc./dobę bez uprzedniej biopsji nerki.",
          "Podanie dożylne cyklofosfamidu w monoterapii.",
          "Wdrożenie wyłącznie restrykcji płynowej i diety bezbiałkowej.",
          "Wykonanie plazmaferezy z przetoczeniem świeżo mrożonego osocza."
        ],
        correct: 1,
        explanation: "U dzieci między 1. a 10. rokiem życia z typowym zespołem nerczycowym bez cech nefrytycznych (krwinkomoczu, nadciśnienia, niewydolności nerek) najczęstszą przyczyną (>85%) jest choroba zmian minimalnych (MCD). Zgodnie z wytycznymi KDIGO i PTNFD leczenie rozpoczyna się od doustnego prednizonu (60 mg/m2/d lub 2 mg/kg mc./d) bez wykonywania biopsji nerki. Biopsja jest wskazana dopiero w razie sterydooporności lub obecności cech atypowych."
      },
      {
        question: "U dziecka z zespołem nerczycowym w trakcie leczenia prednizonem w pełnej dawce (2 mg/kg mc./d) planowane jest szczepienie. Które ze szczepień jest BEZWZGLĘDNIE PRZECIWWSKAZANE?",
        options: [
          "Szczepienie przeciw grypie szczepionką inaktywowaną.",
          "Szczepienie przeciw pneumokokom (PCV13).",
          "Szczepienie przeciwko odrze, śwince i różyczce (MMR).",
          "Szczepienie przeciw wirusowemu zapaleniu wątroby typu B (HBV).",
          "Szczepienie przeciw meningokokom."
        ],
        correct: 2,
        explanation: "Żywe szczepionki atenuowane (np. MMR, ospa wietrzna, BCG, rotawirusy) są bezwzględnie przeciwwskazane u chorych poddawanych immunosupresji, w tym otrzymujących wysokie dawki glikokortykosteroidów (prednizon >= 2 mg/kg mc./d przez ponad 14 dni), ze względu na ryzyko wywołania pełnoobjawowej choroby poszczepiennej. Szczepionki inaktywowane (zabite) można bezpiecznie stosować."
      },
      {
        question: "Który mechanizm odpowiada za zwiększone ryzyko powikłań zatorowo-zakrzepowych u dzieci z zespołem nerczycowym?",
        options: [
          "Utrata antytrombiny III z moczem przy nasilonej syntezie fibrynogenu przez wątrobę oraz hemokoncentracja.",
          "Wrodzony niedobór czynnika VIII krzepnięcia.",
          "Nadmierne wydalanie jonów wapnia w moczu.",
          "Selektywna utrata płytek krwi w kłębuszkach nerkowych.",
          "Obniżenie stężenia czynnika von Willebranda."
        ],
        correct: 0,
        explanation: "W zespole nerczycowym dochodzi do filtracji i utraty z moczem naturalnych antykoagulantów o małej masie cząsteczkowej (przede wszystkim antytrombiny III). Jednocześnie hipoalbuminemia stymuluje wątrobę do wzmożonej syntezy białek o dużej masie, w tym prokoagulantów (fibrynogen, czynnik V, VIII). Dołączająca się hipowolemia, zagęszczenie krwi (hemokoncentracja) i trombocytoza tworzą silny stan prozakrzepowy."
      }
    ],
    flashcards: [
      { q: "Jaka jest tetrada objawów zespołu nerczycowego?", a: "Masywny białkomocz (>50 mg/kg mc./d lub UPCR >2), hipoalbuminemia (<25 g/l), uogólnione obrzęki oraz hiperlipidemia.", cat: "Pediatria" },
      { q: "Jaka jest najczęstsza przyczyna zespołu nerczycowego u dzieci w wieku 1–10 lat?", a: "Choroba zmian minimalnych (Minimal Change Disease - MCD), stanowiąca >85% przypadków.", cat: "Pediatria" },
      { q: "Jaka jest standardowa dawka prednizonu w pierwszym rzucie zespołu nerczycowego u dziecka?", a: "60 mg/m2 pc./dobę lub 2 mg/kg mc./dobę doustnie przez 4–6 tygodni.", cat: "Pediatria" },
      { q: "Kiedy u dziecka z zespołem nerczycowym jest wskazana biopsja nerki?", a: "Wiek <1 r.ż. lub >10–12 r.ż., cechy nefrytyczne (krwinkomocz, nadciśnienie, AKI), hipokomplementemia (spadek C3) lub sterydooporność.", cat: "Pediatria" },
      { q: "Dlaczego szczepionki żywe są przeciwwskazane u dzieci ze sterydoterapią zespołu nerczycowego?", a: "Z powodu immunosupresji wywołanej prednizonem istnieje ryzyko niekontrolowanej replikacji wirusa szczepionkowego i ciężkiej choroby poszczepiennej.", cat: "Pediatria" }
    ]
  }
];

async function run() {
  console.log(`Processing cases: ${cases.map(c => c.id).join(', ')}...`);
  for (const c of cases) {
    const raw = JSON.stringify(c, null, 2);
    const enc = await encryptStringAes(raw, PASSWORD);
    fs.writeFileSync(`cases/${c.filename}`, JSON.stringify(enc, null, 2), 'utf8');
    console.log(`Encrypted & saved cases/${c.filename}`);
  }
  console.log('Batch 104-105 finished successfully.');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});

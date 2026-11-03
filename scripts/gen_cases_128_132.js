const fs = require('fs');
const { encryptStringAes } = require('./encrypt_case.js');
const PASSWORD = '@LEKSzymon28111999';

const cases = [
  // 128: Ostre zapalenie dróg żółciowych (cholangitis, Charcot)
  {
    id: 128,
    filename: "128_ostre_zapalenie_drog_zolciowych_cholangitis.json",
    dept: "Chirurgia",
    shortTitle: "65-letni mężczyzna – Gorączka z dreszczami, żółtaczka mechaniczna i ból pod prawym żebrem (Zapalenie dróg żółciowych / Triada Charcota)",
    diagnosisTitle: "Ostre wstępujące zapalenie dróg żółciowych (Cholangitis acuta ascendens) powikłane sepsą żółciową",
    vitals: [
      { label: "HR", val: "122/min", sub: "Tachykardia septyczna", status: "bad" },
      { label: "BP", val: "92/54 mmHg", sub: "Hipotonia (zagrożenie wstrząsem septycznym)", status: "bad" },
      { label: "SpO2", val: "96%", sub: "Prawidłowa", status: "ok" },
      { label: "RR", val: "24/min", sub: "Przyspieszony", status: "warn" },
      { label: "Temp", val: "39.4°C", sub: "Wysoka gorączka z dreszczami", status: "bad" }
    ],
    vitalsObj: { hr: 122, bp: "92/54", spo2: 96, rr: 24, temp: 39.4 },
    story: "65-letni mężczyzna został przetransportowany przez ZRM na SOR z powodu nagłego pogorszenia stanu ogólnego, gorączki z silnymi dreszczami do 39.5°C, narastającej od 2 dni żółtaczki oraz silnego bólu w prawym podżebrzu. Chory jest podsypiający, zdezorientowany co do czasu i miejsca (splątany). W wywiadzie: przed 5 laty przebył cholecystektomię laparoskopową z powodu kamicy pęcherzyka żółciowego. W badaniu fizykalnym: powłoki skórne i twardówki intensywnie żółte (żółtaczka zaporowa), skóra ucieplona, wilgotna od potu. W prawym podżebrzu wyraźna bolesność uciskowa i obrona mięśniowa, objaw Chełmońskiego dodatni. Chory prezentuje pełną pentadę Reynoldsa: gorączka z dreszczami + żółtaczka + ból w prawym podżebrzu (triada Charcota) PLUS wstrząs (hipotonia 92/54 mmHg) i zaburzenia świadomości.",
    labs: [
      {
        category: "Próby wątrobowe i cholestaza CITO",
        items: [
          { name: "Bilirubina całkowita", val: "8.8 mg/dL (głęboka żółtaczka)", norm: "0.2–1.2 mg/dL", flag: "H" },
          { name: "Bilirubina bezpośrednia (sprzężona)", val: "7.2 mg/dL (cholestaza zewnątrzwątrobowa)", norm: "< 0.3 mg/dL", flag: "H" },
          { name: "Fosfataza zasadowa (ALP)", val: "420 IU/L", norm: "30–120 IU/L", flag: "H" },
          { name: "GGTP", val: "380 IU/L", norm: "< 55 IU/L", flag: "H" },
          { name: "AlAT / AspAT", val: "185 / 164 IU/L", norm: "< 45 / < 35 IU/L", flag: "H" }
        ]
      },
      {
        category: "Wskaźniki sepsy i morfologia",
        items: [
          { name: "Leukocyty (WBC)", val: "19.4 G/L z przesunięciem w lewo (12% pałek)", norm: "4.0–10.0 G/L", flag: "H" },
          { name: "CRP", val: "168 mg/L", norm: "< 5.0 mg/L", flag: "H" },
          { name: "Prokalcytonina (PCT)", val: "14.5 ng/mL (ciężka uogólniona sepsa bakteryjna)", norm: "< 0.5 ng/mL", flag: "H" },
          { name: "Mleczany we krwi", val: "3.4 mmol/L", norm: "0.5–2.0 mmol/L", flag: "H" },
          { name: "Kreatynina surowicy", val: "1.65 mg/dL (przednerkowe AKI w sepsie)", norm: "0.70–1.20 mg/dL", flag: "H" }
        ]
      },
      {
        category: "Diagnostyka obrazowa dróg żółciowych (USG / TK)",
        items: [
          { name: "Przewód żółciowy wspólny (PŻW / CBD) w USG", val: "Poszerzony do 16 mm (norma < 6–8 mm)", norm: "< 8 mm po cholecystektomii", flag: "H" },
          { name: "Wewnątrz- i zewnątrzwątrobowe drogi żółciowe", val: "Masywne poszerzenie dróg wewnątrzwątrobowych ('obraz szyn tramwajowych')", norm: "Nieposzerzone", flag: "H" },
          { name: "Złóg w PŻW (choledocholithiasis)", val: "Złóg hiperechogenny o średnicy 12 mm zaklinowany w dystalnym odcinku PŻW powyżej brodawki Vatera", norm: "Brak złogów", flag: "H" }
        ]
      }
    ],
    steps: [
      {
        num: 1,
        title: "Rozpoznanie triady Charcota i pentady Reynoldsa",
        task: "U pacjenta występuje gorączka z dreszczami, żółtaczka mechaniczna i ból w prawym podżebrzu (triada Charcota) oraz hipotonia i splątanie. Jaki zespół kliniczny reprezentuje ta pentada objawów?",
        options: [
          { text: "Pentada Reynoldsa w przebiegu ostrego zaporowego ropnego zapalenia dróg żółciowych (cholangitis acuta suppurativa)", correct: true, feedback: "Prawidłowo! Triada Charcota (ból + żółtaczka + gorączka z dreszczami) po dołączeniu hipotonii/wstrząsu i zaburzeń świadomości tworzy pentadę Reynoldsa – stan bezpośredniego zagrożenia życia wymagający natychmiastowego ratunkowego odbarczenia dróg żółciowych!" },
          { text: "Zawał mięśnia sercowego ściany przedniej", correct: false, feedback: "Brak żółtaczki mechanicznej i poszerzenia PŻW." },
          { text: "Zespół nerczycowy z obrzękiem płuc", correct: false, feedback: "Błąd – brak masywnego białkomoczu i cholestazy." },
          { text: "Wstrząs krwotoczny po pęknięciu śledziony", correct: false, feedback: "Brak urazu, brak anemizacji, wysoka gorączka i żółtaczka." }
        ]
      },
      {
        num: 2,
        title: "Pilne postępowanie odbarczające z wyboru",
        task: "Jaki zabieg jest ZŁOTYM STANDARDEM ratunkowego odbarczenia dróg żółciowych w ostrym zapaleniu dróg żółciowych powikłanym sepsą?",
        options: [
          { text: "Pilna endoskopowa cholangiopankreatografia wsteczna (ECPW / ERCP) ze sfinkterotomią endoskopową, usunięciem złogu lub założeniem stentu/drenu nosowo-żółciowego", correct: true, feedback: "Znakomicie! Zgodnie z Tokyo Guidelines TG18, w ostrym zapaleniu dróg żółciowych stopnia III (z niewydolnością narządową/wstrząsem) pilny drenaż dróg żółciowych metodą ECPW jest zabiegiem ratującym życie, który należy wykonać w ciągu pierwszych kilku godzin po wstępnej resuscytacji płynowej!" },
          { text: "Pilna otwarta laparotomia z rewizją PŻW i drenem Kehra bez próby ECPW", correct: false, feedback: "Operacja otwarta u pacjenta we wstrząsie septycznym wiąże się ze skrajnie wysoką śmiertelnością (>30–50%) i jest rezerwowana wyłącznie dla sytuacji, gdy ECPW i drenaż przezskórny są niemożliwe." },
          { text: "Wyłącznie leczenie zachowawcze antybiotykiem bez drenażu", correct: false, feedback: "Śmiertelny błąd! Antybiotyk nie penetruje do zablokowanych dróg żółciowych przy wysokim ciśnieniu żółci; bez dekompresji chory umrze we wstrząsie septycznym." },
          { text: "Podanie samej laktulozy doustnie", correct: false, feedback: "Laktuloza nie odbarcza mechanicznej przeszkody w brodawce Vatera." }
        ]
      },
      {
        num: 3,
        title: "Resuscytacja hemodynamiczna i empiryczna antybiotykoterapia",
        task: "Jakie leczenie ogólnoustrojowe należy wdrożyć natychmiast równolegle z przygotowaniem pacjenta do ECPW?",
        options: [
          { text: "Intensywna płynoterapia krystaloidowa i.v. (30 mL/kg mc.), tlenoterapia, pobranie posiewów krwi oraz natychmiastowe podanie antybiotyku o szerokim spektrum (np. piperacylina z tazobaktamem lub ceftriakson z metronidazolem)", correct: true, feedback: "Dokładnie tak! W sepsie żółciowej konieczna jest natychmiastowa resuscytacja hemodynamiczna płynami krystaloidowymi (0.9% NaCl lub Plasmalyte), wyrównanie hipotonii (w razie potrzeby noradrenalina) oraz antybiotykoterapia bakteriobójcza pokrywająca pałeczki jelitowe Gram-ujemne (E. coli, Klebsiella), enterokoki i beztlenowce." },
          { text: "Wlewy furosemidu w celu wymuszenia diurezy", correct: false, feedback: "Błąd! Furosemid u pacjenta z ciśnieniem 92/54 mmHg pogłębi wstrząs hipowolemiczny!" },
          { text: "Zastosowanie samej aspiryny doustnie", correct: false, feedback: "Brak uzasadnienia i ryzyko krwawienia przy ECPW." },
          { text: "Płynoterapia czystą wodą z glukozą bez soli", correct: false, feedback: "Nie wyrówna objętości wewnątrznaczyniowej." }
        ]
      },
      {
        num: 4,
        title: "Metoda alternatywna w razie niepowodzenia ECPW",
        task: "Gdyby u pacjenta po wcześniejszej operacji żołądka dostęp endoskopowy do brodawki Vatera był niemożliwy, jaka procedura stanowi metodę drugiego rzutu w pilnym odbarczeniu dróg żółciowych?",
        options: [
          { text: "Przezskórny przezwątrobowy drenaż dróg żółciowych (PTCD / PTD) pod kontrolą USG i fluoroskopii", correct: true, feedback: "Prawidłowo! W przypadku niemożności wykonania ECPW (np. zmieniona anatomia po operacji Billroth II / Roux-en-Y, uchyłek okołobrodawkowy) metodą z wyboru jest przezskórny przezwątrobowy drenaż dróg żółciowych (PTCD) wykonywany przez radiologa zabiegowego." },
          { text: "Doraźna splenektomia", correct: false, feedback: "Śledziona nie ma związku z odpływem żółci." },
          { text: "Nacięcie pęcherza moczowego", correct: false, feedback: "Niedorzeczne." },
          { text: "Zaniechanie dalszych prób i oczekiwanie na samoistne pęknięcie kamienia", correct: false, feedback: "Kamień nie pęka samoistnie, sepsa doprowadzi do zgonu." }
        ]
      },
      {
        num: 5,
        title: "Patofizjologia sepsy żółciowej: refluks żółciowo-krwionośny",
        task: "Dlaczego zablokowanie odpływu zakażonej żółci prowadzi do tak piorunującego wstrząsu septycznego?",
        options: [
          { text: "Wzrost ciśnienia w drogach żółciowych powyżej ciśnienia wydzielniczego wątroby (>25–30 cmH2O) uszkadza barierę krew-żółć i powoduje bezpośredni, masywny wsteczny przeciek bakterii i endotoksyn do naczyń zatokowych wątroby i krwioobiegu (cholangiovenous reflux)", correct: true, feedback: "Znakomicie! Normalne ciśnienie żółci wynosi 7–14 cmH2O. Przy obturacji ciśnienie przekracza 25–30 cmH2O, co przełamuje barierę hepatocytarno-kanalikową. Dochodzi do tzw. refluksu żółciowo-żylnego (cholangiovenous and cholangiolymphatic reflux) i lawinowego przedostawania się bakterii do żyły wrotnej i krążenia ogólnego." },
          { text: "Żółć bezpośrednio trawi mięsień sercowy", correct: false, feedback: "Absurdalna teoria." },
          { text: "Bakterie z dróg żółciowych wnikają do płuc przez opłucną", correct: false, feedback: "Droga szerzenia jest naczyniowa (krążenie wrotne i systemowe)." },
          { text: "Żółtaczka neutralizuje wszystkie przeciwciała w organizmie", correct: false, feedback: "Brak wiedzy immunologicznej." }
        ]
      },
      {
        num: 6,
        title: "Badania po zabiegu: kontrola powikłań ECPW",
        task: "Jakie jest najczęstsze powikłanie zabiegu ECPW ze sfinkterotomią, którego objawy należy monitorować w pierwszych dobach po procedurze?",
        options: [
          { text: "Ostre po-ECPW zapalenie trzustki (PEP - Post-ERCP Pancreatitis) oraz krwawienie ze sfinkterotomii i perforacja dwunastnicy", correct: true, feedback: "Bardzo dobrze! Ostre zapalenie trzustki (PEP) występuje u 3–10% chorych po ECPW. Objawia się narastającym bólem w nadbrzuszu i wzrostem lipazy/amylazy >3x GGN po 24h. Inne powikłania to krwawienie z naciętej brodawki i perforacja zaniotrzewnowa (klasyfikacja Stapfera)." },
          { text: "Zawał śledziony", correct: false, feedback: "Rzadkie powikłanie niecharakterystyczne dla ECPW." },
          { text: "Udar krwotoczny móżdżku", correct: false, feedback: "Brak związku przyczynowego." },
          { text: "Ostre zapalenie tarczycy", correct: false, feedback: "Niewłaściwa lokalizacja anatomiczna." }
        ]
      },
      {
        num: 7,
        title: "Konieczność usunięcia pęcherzyka u chorych z zachowanym pęcherzykiem",
        task: "Gdyby pacjent miał zachowany pęcherzyk żółciowy i przebył udane ECPW z usunięciem kamienia z PŻW, jakie jest definitywne postępowanie po wyleczeniu ostrej fazy?",
        options: [
          { text: "Planowa cholecystektomia laparoskopowa w celu usunięcia źródła kamicy i zapobieżenia nawrotom kamicy przewodowej i zapalenia dróg żółciowych", correct: true, feedback: "Świetnie! U chorych z zachowanym pęcherzykiem żółciowym po przebytej kamicy przewodowej źródłem złogów pozostaje pęcherzyk. Pozostawienie pęcherzyka wiąże się z >20–30% ryzykiem nawrotu kamicy PŻW i zapalenia dróg żółciowych w ciągu roku." },
          { text: "Nie podejmuje się żadnych działań chirurgicznych", correct: false, feedback: "Błąd – wysokie ryzyko nawrotu sepsy." },
          { text: "Konieczna jest resekcja żołądka", correct: false, feedback: "Nieuzasadniony zabieg." },
          { text: "Podaje się kwas ursodeoksycholowy do końca życia zamiast operacji", correct: false, feedback: "UDCA nie chroni skutecznie przed ponownym zablokowaniem PŻW dużym złogiem." }
        ]
      },
      {
        num: 8,
        title: "Rokowanie i znaczenie szybkiego drenażu",
        task: "Jak kształtuje się śmiertelność w ostrym zaporowym zapaleniu dróg żółciowych (pentadzie Reynoldsa) w zależności od wdrożenia drenażu dróg żółciowych?",
        options: [
          { text: "Bez pilnego odbarczenia śmiertelność wynosi blisko 100%, natomiast wczesny drenaż endoskopowy obniża śmiertelność do poniżej 5–10%", correct: true, feedback: "Znakomicie! Nieleczona ropna obturacja dróg żółciowych jest w 100% śmiertelna. Wczesne ECPW ze sfinkterotomią i drenażem przekształciło to schorzenie z wyroku śmierci w stan całkowicie uleczalny u >90% pacjentów." },
          { text: "Śmiertelność jest zawsze stała i wynosi 90% bez względu na leczenie", correct: false, feedback: "Nieprawda – ECPW diametralnie poprawia rokowanie." },
          { text: "Zabieg ECPW podwaja śmiertelność", correct: false, feedback: "Bzdura medyczna – ECPW ratuje życie." },
          { text: "Choroba ustępuje zawsze samoistnie po 24 godzinach", correct: false, feedback: "Błąd zagrażający życiu." }
        ]
      }
    ],
    pathoNodes: [
      {
        title: "1. Obturacja odpływu żółci (kamica PŻW / zwężenie)",
        desc: "Złóg zaklinowany w końcowym odcinku PŻW lub brodawce Vatera uniemożliwia spływ żółci, wywołując gwałtowny wzrost ciśnienia w drogach żółciowych (>30 cmH2O).",
        drugTarget: "Pilne odbarczenie endoskopowe: ECPW ze sfinkterotomią i usunięciem kamienia"
      },
      {
        title: "2. Wstępująca kolonizacja bakteryjna i roponercze dróg żółciowych",
        desc: "Bakterie jelitowe (E. coli, Klebsiella pneumoniae, Enterococcus faecalis) kolonizują zalegającą żółć pod ciśnieniem, tworząc ropną treść wypełniającą drzewo żółciowe (cholangitis suppurativa).",
        drugTarget: "Antybiotyki bakteriobójcze o szerokim spektrum i.v. (piperacylina z tazobaktamem, karbapenemy)"
      },
      {
        title: "3. Przełamanie bariery naczyniowo-żółciowej i wstrząs septyczny",
        desc: "Wysokie ciśnienie powoduje przeciek bakterii i endotoksyn LPS do zatok wątrobowych (cholangiovenous reflux), wywołując burzę cytokinową, hipotonię i niewydolność wielonarządową (pentada Reynoldsa).",
        drugTarget: "Resuscytacja płynowa krystaloidami i wazopresory (noradrenalina) w OIT/SOR"
      }
    ],
    dutySummary: "Ostre zapalenie dróg żółciowych (cholangitis) to triada Charcota (gorączka z dreszczami, ból pod prawym żebrem, żółtaczka zaporowa) lub pentada Reynoldsa (+ wstrząs i zaburzenia świadomości). USG wykazuje poszerzenie PŻW (>8-10 mm) i dróg wewnątrzwątrobowych. Leczenie z wyboru: PILNE ECPW ZE SFINKTEROTOMIĄ I DRENAŻEM DRÓG ŻÓŁCIOWYCH (ratujące życie!) w skojarzeniu z płynoterapią i antybiotykami i.v.",
    diffTable: [
      { disease: "Ostre zapalenie pęcherzyka żółciowego", diff: "Ból i gorączka, ale PŻW jest nieposzerzony i BRAK GŁĘBOKIEJ ŻÓŁTACZKI mechanicznej; objaw Murphy'ego dodatni.", test: "Bilirubina całkowita, USG (szerokość PŻW, brak poszerzenia dróg wewnątrzwątrobowych)." },
      { disease: "Ostre zapalenie trzustki (kamicze)", diff: "Ból opasujący, podwyższona lipaza i amylaza >3x GGN; może współistnieć z cholangitis przy zaklinowaniu złogu w brodawce Vatera.", test: "Lipaza surowicy, ECPW ze sfinkterotomią." },
      { disease: "Wirusowe zapalenie wątroby (WZW / ostra niewydolność wątroby)", diff: "Głęboka żółtaczka, ale drogi żółciowe w USG są NIEPOSZERZONE, enzymy AlAT/AspAT przekraczają >1000 IU/L.", test: "Enzymy wątrobowe (>1000 IU/L), USG (drogi żółciowe nieposzerzone), serologia WZW." },
      { disease: "Sepsa moczowa (urosepsa)", diff: "Gorączka z dreszczami i hipotonia, ale ból dotyczy okolicy lędźwiowej (objaw Goldflama+), brak żółtaczki, w moczu obecna leukocyturia i bakteriomocz.", test: "Bilirubina (w normie), badanie ogólne moczu, USG nerek." }
    ],
    lekQuestions: [
      {
        question: "U 68-letniego pacjenta z silnym bólem w prawym podżebrzu, gorączką 39.6°C z dreszczami, żółtaczką mechaniczną oraz ciśnieniem tętniczym 88/50 mmHg i zaburzeniami świadomości (pentada Reynoldsa) w USG stwierdzono poszerzenie PŻW do 17 mm ze złogiem w części dystalnej. Zabiegiem ratującym życie z wyboru jest:",
        options: [
          "Pilna endoskopowa cholangiopankreatografia wsteczna (ECPW) ze sfinkterotomią i odbarczeniem dróg żółciowych.",
          "Planowa laparoskopowa cholecystektomia po 6 tygodniach.",
          "Pilna laparotomia ze splenektomią.",
          "Zastosowanie doustnej amoksycyliny w monoterapii.",
          "Podanie leków fibrynolitycznych dożylnie."
        ],
        correct: 0,
        explanation: "Pentada Reynoldsa (triada Charcota: ból, żółtaczka, gorączka z dreszczami PLUS wstrząs septyczny i zaburzenia świadomości) jest objawem ostrego zaporowego ropnego zapalenia dróg żółciowych. Zgodnie z wytycznymi TG18, jedynym skutecznym zabiegiem ratującym życie jest natychmiastowe odbarczenie zakażonych dróg żółciowych, a metodą z wyboru jest pilne ECPW ze sfinkterotomią i drenażem (usunięcie złogu / stent / dren nosowo-żółciowy)."
      },
      {
        question: "Wskaż składowe klasycznej triady Charcota charakterystycznej dla ostrego zapalenia dróg żółciowych:",
        options: [
          "Ból w prawym podżebrzu, gorączka z dreszczami oraz żółtaczka.",
          "Ból w klatce piersiowej, krwioplucie i duszność.",
          "Ból głowy, wymioty i obrzęk tarcz nerwów wzrokowych.",
          "Biegunka tłuszczowa, cukrzyca i zwapnienia w trzustce.",
          "Niedokrwistość, małopłytkowość i ostra niewydolność nerek."
        ],
        correct: 0,
        explanation: "Klasyczna triada Charcota opisana w ostrym zapaleniu dróg żółciowych składa się z: 1. Bólu w prawym podżebrzu, 2. Wysokiej gorączki z dreszczami, 3. Żółtaczki mechanicznej. Występuje u około 50–70% pacjentów z zapaleniem dróg żółciowych."
      },
      {
        question: "Jaki jest mechanizm gwałtownego przejścia zapalenia dróg żółciowych we wstrząs septyczny w przypadku mechanicznej przeszkody w PŻW?",
        options: [
          "Wzrost ciśnienia w drogach żółciowych powyżej 25–30 cmH2O powoduje załamanie bariery naczyniowo-żółciowej i masywny wsteczny przeciek bakterii i endotoksyn do krwi (cholangiovenous reflux).",
          "Zakażenie dróg żółciowych wywołuje bezpośrednie pęknięcie aorty brzusznej.",
          "Żółtaczka blokuje receptory beta-adrenergiczne w sercu.",
          "Bakterie z dróg żółciowych natychmiast niszczą wszystkie erytrocyty w śledzionie.",
          "Wzrasta ciśnienie w żyłach płucnych wywołując odłamkową zatorowość."
        ],
        correct: 0,
        explanation: "W warunkach fizjologicznych ciśnienie w drogach żółciowych wynosi 7–14 cmH2O. W przypadku mechanicznej niedrożności ciśnienie wzrasta powyżej ciśnienia wydzielniczego wątroby (>25–30 cmH2O), co prowadzi do przełamania połączeń między kanalikami żółciowymi a naczyniami zatokowymi wątroby. Zjawisko to (refluks żółciowo-krwionośny i żółciowo-chłonny) skutkuje masywnym wysiewem bakterii Gram-ujemnych i endotoksyny (LPS) bezpośrednio do krążenia wrotnego i systemowego, wywołując piorunujący wstrząs septyczny."
      }
    ],
    flashcards: [
      { q: "Jakie objawy tworzą triadę Charcota w zapaleniu dróg żółciowych?", a: "1. Ból w prawym podżebrzu, 2. Gorączka z dreszczami, 3. Żółtaczka zaporowa (mechaniczna).", cat: "Chirurgia" },
      { q: "Czym jest pentada Reynoldsa?", a: "Triada Charcota + wstrząs (hipotonia) + zaburzenia świadomości (splątanie/śpiączka) w septycznym zapaleniu dróg żółciowych.", cat: "Chirurgia" },
      { q: "Jaki jest zabieg z wyboru ratujący życie w ostrym zapaleniu dróg żółciowych?", a: "Pilne ECPW ze sfinkterotomią endoskopową i drenażem dróg żółciowych (usunięcie złogu / protezowanie).", cat: "Chirurgia" },
      { q: "Czym jest zjawisko refluksu żółciowo-żylnego (cholangiovenous reflux)?", a: "Wsteczny przeciek bakterii i endotoksyn do krwi przez uszkodzoną barierę kanalikową przy ciśnieniu żółci >25–30 cmH2O.", cat: "Chirurgia" },
      { q: "Jaka metoda stanowi alternatywę w drenażu dróg żółciowych, gdy ECPW jest niemożliwe?", a: "Przezskórny przezwątrobowy drenaż dróg żółciowych (PTCD) pod kontrolą USG/fluoroskopii.", cat: "Chirurgia" }
    ]
  },

  // 129: Perforacja wrzodu trawiennego
  {
    id: 129,
    filename: "129_perforacja_wrzodu_trawiennego.json",
    dept: "Chirurgia",
    shortTitle: "52-letni mężczyzna – Nagły ból 'jak cios sztyletem', brzuch deskowaty i sierp powietrza pod przeponą (Perforacja wrzodu)",
    diagnosisTitle: "Przedziurawienie (perforacja) wrzodu trawiennego opuszki dwunastnicy z rozlanym chemicznym zapaleniem otrzewnej",
    vitals: [
      { label: "HR", val: "118/min", sub: "Tachykardia bólowa", status: "warn" },
      { label: "BP", val: "105/65 mmHg", sub: "Tendencja do hipotonii", status: "warn" },
      { label: "SpO2", val: "97%", sub: "Prawidłowa", status: "ok" },
      { label: "RR", val: "26/min", sub: "Przyspieszony, spłycony tor piersiowy", status: "warn" },
      { label: "Temp", val: "37.6°C", sub: "Stan podgorączkowy", status: "ok" }
    ],
    vitalsObj: { hr: 118, bp: "105/65", spo2: 97, rr: 26, temp: 37.6 },
    story: "52-letni palacz tytoniu z wieloletnim wywiadem choroby wrzodowej oraz częstego przyjmowania ketoprofenu i kwasu acetylosalicylowego z powodu bólów kręgosłupa, został przywieziony na SOR z powodu nagłego, obezwładniającego bólu brzucha, który wystąpił dokładnie 2 godziny temu. Pacjent opisuje początek jako 'uderzenie nożem / cios sztyletem w dołku podsercowym', po którym ból natychmiast rozlał się na całą jamę brzuszną. Chory leży całkowicie nieruchomo na plecach z podkurczonymi nogami, unika jakiegokolwiek ruchu, a każdy wdech nasila ból. W badaniu fizykalnym: wyraz twarzy cierpiący (facies Hippocratica), skóra blada, spocona. Powłoki brzuszne nie biorą udziału w oddychaniu (oddychanie wyłącznie torem piersiowym). W badaniu palpacyjnym: deska w brzuchu – skrajna, uogólniona obrona mięśniowa (brzuch deskowaty), objaw Blumberga dodatni we wszystkich kwadrantach. W opukiwaniu stwierdza się zanik stłumienia wątrobowego (wypuk bębenkowy nad wątrobą). Osłuchowo całkowita cisza w jamie brzusznej (paraliż perystaltyki).",
    labs: [
      {
        category: "Diagnostyka obrazowa CITO (RTG przeglądowe)",
        items: [
          { name: "RTG klatki piersiowej na stojąco / RTG jamy brzusznej", val: "Obecność wolnego powietrza w jamie otrzewnej w postaci wolnego sierpa gazu pod prawą kopułą przepony (pneumoperitoneum)", norm: "Brak wolnego gazu", flag: "H" },
          { name: "TK jamy brzusznej z kontrastem (w razie wątpliwości)", val: "Pęcherzyki wolnego gazu w przestrzeni podwątrobowej, płyn w zachyłku Morisona, ubytek ściany przedniej opuszki dwunastnicy o śr. 6 mm", norm: "Prawidłowa", flag: "H" }
        ]
      },
      {
        category: "Gazometria krwi i biochemia",
        items: [
          { name: "pH krwi / Mleczany", val: "7.34 / 2.8 mmol/L", norm: "7.35–7.45 / 0.5–2.0", flag: "H" },
          { name: "Leukocyty (WBC)", val: "16.4 G/L z neutrofilią (84%)", norm: "4.0–10.0 G/L", flag: "H" },
          { name: "CRP", val: "32 mg/L (wzrost w kolejnych godzinach)", norm: "< 5.0 mg/L", flag: "H" },
          { name: "Amylaza / Lipaza", val: "140 / 72 IU/L (umiarkowany odczynowy wzrost)", norm: "28–100 / 13–60", flag: "H" }
        ]
      },
      {
        category: "Układ krzepnięcia i grupa krwi",
        items: [
          { name: "Grupa krwi i próba krzyżowa", val: "Zabezpieczono 2 jednostki KKCz CITO", norm: "Zgodna", flag: "N" },
          { name: "INR / APTT / Płytki krwi", val: "1.08 / 30 s / 240 G/L", norm: "Prawidłowe", flag: "N" }
        ]
      }
    ],
    steps: [
      {
        num: 1,
        title: "Identyfikacja objawów patognomonicznych perforacji",
        task: "Nagły początek bólu ('cios sztyletem'), uogólniony brzuch deskowaty, zanik stłumienia wątrobowego oraz sierp powietrza pod kopułą przepony to patognomoniczny obraz:",
        options: [
          { text: "Przedziurawienia (perforacji) wrzodu trawiennego do wolnej jamy otrzewnej", correct: true, feedback: "Prawidłowo! Wylanie silnie kwaśnej treści żołądkowej do otrzewnej wywołuje natychmiastowe ostre chemiczne zapalenie otrzewnej, manifestujące się skrajnym odruchowym skurczem mięśni powłok (brzuch deskowaty). Przedostanie się gazu z żołądka daje zanik stłumienia wątrobowego i widoczny w RTG sierp powietrza pod przeponą." },
          { text: "Ostrego zapalenia trzustki", correct: false, feedback: "W OZT rzadko występuje brzuch deskowaty i NIGDY nie ma wolnego powietrza pod przeponą (brak perforacji narządu drążącego)!" },
          { text: "Tętniaka rozwarstwiającego aorty piersiowej", correct: false, feedback: "W rozwarstwieniu aorty ból promieniuje między łopatki, brak sierpa powietrza pod przeponą." },
          { text: "Zawału ściany przedniej serca", correct: false, feedback: "Zawał serca nie powoduje odmy otrzewnowej (pneumoperitoneum)." }
        ]
      },
      {
        num: 2,
        title: "Badanie obrazowe pierwszego rzutu",
        task: "Jakie jest najprostsze i najszybsze badanie obrazowe pierwszego rzutu potwierdzające obecność wolnego gazu w jamie otrzewnej (pneumoperitoneum)?",
        options: [
          { text: "Przeglądowe zdjęcie rentgenowskie (RTG) klatki piersiowej na stojąco (lub RTG jamy brzusznej na stojąco / lewym boku z promieniem poziomym)", correct: true, feedback: "Dokładnie tak! RTG klatki piersiowej w pozycji stojącej z ujęciem kopuł przepony (lub RTG brzucha na lewym boku promieniem poziomym u pacjentów niemogących stać) wykazuje wolny gaz pod prawą kopułą przepony u 75–85% chorych z perforacją wrzodu." },
          { text: "Gastroskopia ratunkowa z insuflacją powietrza", correct: false, feedback: "Kardynalny błąd! Gastroskopia w podejrzeniu perforacji jest BEZWZGLĘDNIE PRZECIWWSKAZANA, ponieważ wdmuchiwanie powietrza pod ciśnieniem powiększy ubytek i wtłoczy masy gazu i treści do otrzewnej!" },
          { text: "Kolonoskopia do dna kątnicy", correct: false, feedback: "Bezwzględnie przeciwwskazana w ostrym zapaleniu otrzewnej." },
          { text: "Scyntygrafia żołądkowa z technetem", correct: false, feedback: "Brak zastosowania w ostrym brzuchu." }
        ]
      },
      {
        num: 3,
        title: "Przygotowanie przedoperacyjne i stabilizacja",
        task: "Jakie natychmiastowe działania terapeutyczne należy podjąć przed przewiezieniem pacjenta na blok operacyjny?",
        options: [
          { text: "Ścisła dieta (nic doustnie), założenie zgłębnika nosowo-żołądkowego z odsysaniem treści, intensywna płynoterapia krystaloidowa i.v., podanie inhibitora pompy protonowej (IPP i.v.) oraz antybiotykoterapia o szerokim spektrum", correct: true, feedback: "Znakomicie! Zgłębnik nosowo-żołądkowy dekompresuje żołądek i zatrzymuje dalszy wyciek treści kwasowo-pokarmowej do otrzewnej. Płynoterapia wyrównuje ucieczkę płynów do 'trzeciej przestrzeni'. IPP i.v. hamuje produkcję kwasu, a antybiotykoterapia zapobiega bakteryjnemu zapaleniu otrzewnej." },
          { text: "Pojenie chorego dużą ilością ciepłej wody z sodą oczyszczoną", correct: false, feedback: "Karygodny błąd – podawanie czegokolwiek doustnie wlewa się bezpośrednio do jamy otrzewnej!" },
          { text: "Podanie leków przeczyszczających", correct: false, feedback: "Bezwzględnie zakazane." },
          { text: "Zastosowanie samej morfiny bez wdrożenia antybiotyków i bez zgłębnika", correct: false, feedback: "Niepełne postępowanie opóźniające leczenie sepsy." }
        ]
      },
      {
        num: 4,
        title: "Kwalifikacja do trybu operacji",
        task: "Jaki jest tryb leczenia operacyjnego u pacjenta z perforacją wrzodu trawiennego i rozlanym zapaleniem otrzewnej?",
        options: [
          { text: "Pilna operacja w trybie natychmiastowym (laparoskopia lub laparotomia) – liczy się każda godzina (tzw. złote okno do 6–12 godzin)", correct: true, feedback: "Doskonale! Perforacja wrzodu z zapaleniem otrzewnej to bezwzględne wskazanie do operacji w trybie ostrym ratunkowym. Odroczenie zabiegu powyżej 12–24 godzin gwałtownie zwiększa śmiertelność z powodu przejścia zapalenia chemicznego w bakteryjne i rozwój wstrząsu septycznego z niewydolnością wielonarządową (MODS)." },
          { text: "Planowy zabieg za 3 tygodnie po zaleczeniu wrzodu", correct: false, feedback: "Chory umrze z powodu sepsy otrzewnowej w ciągu 24–48 godzin." },
          { text: "Zabieg wyłącznie ambulatoryjny", correct: false, feedback: "Nonsens." },
          { text: "Czekanie na wynik tomografii przez 48 godzin", correct: false, feedback: "Nieuzasadniona zwłoka." }
        ]
      },
      {
        num: 5,
        title: "Metoda operacyjna z wyboru przy perforacji opuszki dwunastnicy",
        task: "Jaka technika chirurgiczna jest najczęściej stosowana w zaopatrzeniu przedziurawionego wrzodu przedniej ściany dwunastnicy u pacjenta niestabilnego lub bez cech zwężenia odźwiernika?",
        options: [
          { text: "Zszycie przedziurawienia z plastyką płatem sieci większej sposobem Grahama (lub Cellana-Jonesa) oraz obfite przepłukanie i drenaż jamy otrzewnej", correct: true, feedback: "Świetnie! Standardem zaopatrzenia perforacji wrzodu dwunastnicy (wykonywanym techniką otwartą lub laparoskopową) jest proste pierwotne zszycie ubytku i pokrycie go unaczynioną 'łatą' z sieci większej (metoda Grahama / Graham patch) połączone z dokładnym toaletowaniem i wypłukaniem otrzewnej solą fizjologiczną." },
          { text: "Gastrektomia całkowita z rekonstrukcją Roux-en-Y", correct: false, feedback: "Zbyt rozległa, obciążająca operacja, niewskazana w prostej perforacji opuszki dwunastnicy." },
          { text: "Zespolenie omijające żołądkowo-czcze bez szycia perforacji", correct: false, feedback: "Pozostawienie otwartej perforacji doprowadzi do zgonu chorego." },
          { text: "Wstrzyknięcie kleju tkankowego do żołądka", correct: false, feedback: "Nieskuteczne i niebezpieczne." }
        ]
      },
      {
        num: 6,
        title: "Różnica w postępowaniu przy perforacji wrzodu żołądka vs dwunastnicy",
        task: "Dlaczego przy perforacji wrzodu ŻOŁĄDKA chirurg ma bezwzględny obowiązek pobrania wycinków z brzegów wrzodu do badania histopatologicznego, w przeciwieństwie do wrzodu dwunastnicy?",
        options: [
          { text: "Wrzód żołądka może być w rzeczywistości drążącym rakiem żołądka (rak wrzodziejący), podczas gdy rak opuszki dwunastnicy jest skrajną rzadkością", correct: true, feedback: "Kluczowy punkt LEK! Aż 5–10% pozornie 'trawiennych' wrzodów żołądka okazuje się rakiem żołądka (gruczolakorakiem). Dlatego pobranie wycinków z brzegów przedziurawionego wrzodu żołądka jest obowiązkowe, aby nie przeoczyć nowotworu złośliwego." },
          { text: "W żołądku zawsze występują prątki gruźlicy", correct: false, feedback: "Brak związku." },
          { text: "Żołądek nie goi się po zwykłym zszyciu", correct: false, feedback: "Żołądek goi się bardzo dobrze ze względu na obfite unaczynienie." },
          { text: "Wycinki pobiera się tylko w celu oceny grubości ściany", correct: false, feedback: "Głównym celem jest wykluczenie procesu nowotworowego." }
        ]
      },
      {
        num: 7,
        title: "Leczenie zachowawcze (metoda Taylora) – kiedy dopuszczalna?",
        task: "W jakich ściśle określonych warunkach można wyjątkowo rozważyć leczenie zachowawcze perforacji (metodą Taylora: zgłębnik NG + IPP + antybiotyki)?",
        options: [
          { text: "Tylko u pacjentów stabilnych hemodynamicznie, bez objawów rozlanego zapalenia otrzewnej, u których doszło do samoistnego zasklepienia perforacji (wrzód przedziurawiony zarastający, potwierdzony brakiem wycieku w gastrografinie) lub przy skrajnym ryzyku operacyjnym", correct: true, feedback: "Bardzo dobrze! Metoda Taylora jest postępowaniem wyjątkowym, dopuszczalnym wyłącznie przy tzw. perforacji osłoniętej/zasklepionej (perforatio tecta), gdy sieć lub wątroba zamknęły ubytek, brak jest cech rozlanego zapalenia otrzewnej, a wlew kontrastu rozpuszczalnego w wodzie (Gastrografin) nie wykazuje wycieku poza przewód pokarmowy." },
          { text: "U każdego pacjenta z brzuchem deskowatym", correct: false, feedback: "Błąd! Brzuch deskowaty i rozlane zapalenie otrzewnej to bezwzględne wskazanie do natychmiastowej operacji!" },
          { text: "U pacjentów z sepsą i wstrząsem", correct: false, feedback: "Wstrząs wymaga pilnej operacji, nie leczenia zachowawczego." },
          { text: "Zawsze jako postępowanie rutynowe", correct: false, feedback: "Standardem jest leczenie operacyjne." }
        ]
      },
      {
        num: 8,
        title: "Dalsze leczenie pooperacyjne i eradykacja H. pylori",
        task: "Co jest kluczowym elementem zapobiegania nawrotom choroby wrzodowej i ponownym perforacjom po wypisaniu pacjenta z oddziału chirurgii?",
        options: [
          { text: "Diagnostyka i skuteczna eradykacja Helicobacter pylori oraz bezwzględne zaprzestanie stosowania NLPZ (lub ich łączenie z IPP)", correct: true, feedback: "Znakomicie! Zszycie perforacji leczy jedynie ostre powikłanie mechaniczne, nie samą chorobę wrzodową. Ponad 80–90% wrzodów dwunastnicy wiąże się z H. pylori. Eradykacja bakterii oraz eliminacja niesteroidowych leków przeciwzapalnych zmniejsza ryzyko nawrotu wrzodu z >60% do poniżej 5%!" },
          { text: "Stosowanie leków zobojętniających kwas przez 1 dzień", correct: false, feedback: "Całkowicie niewystarczające." },
          { text: "Zalecenie picia mleka przed snem", correct: false, feedback: "Mit – mleko początkowo buforuje kwas, a następnie stymuluje wydzielanie gastryny i kwasu." },
          { text: "Okresowe płukanie żołądka spirytusem", correct: false, feedback: "Niszczące dla śluzówki." }
        ]
      }
    ],
    pathoNodes: [
      {
        title: "1. Głębokie owrzodzenie trawiące pełną grubość ściany",
        desc: "Przewlekłe zakażenie Helicobacter pylori oraz blokada biosyntezy prostaglandyn przez NLPZ niszczą barierę śluzówkową żołądka/dwunastnicy, umożliwiając kwasowi solnemu i pepsynie strawienie błony mięśniowej i surowiczej.",
        drugTarget: "Inhibitory pompy protonowej (IPP i.v.) blokujące pompę H+/K+-ATPazę i eradykacja H. pylori"
      },
      {
        title: "2. Przedziurawienie i wyciek treści kwasowo-pokarmowej",
        desc: "Wylanie soku żołądkowego (pH 1–2) i żółci do wolnej jamy otrzewnej wywołuje natychmiastowe, ostre chemiczne zapalenie otrzewnej, odruchowy skurcz mięśniówki ('brzuch deskowaty') oraz ucieczkę gazu pod przeponę.",
        drugTarget: "Zgłębnik nosowo-żołądkowy (dekompresja) i pilne zaopatrzenie chirurgiczne (łata Grahama)"
      },
      {
        title: "3. Przejście zapalenia chemicznego w bakteryjne i sepsa",
        desc: "Po 12–24 godzinach bakterie z przewodu pokarmowego kolonizują wysięk otrzewnowy, wywołując ropne rozlane zapalenie otrzewnej, translokację bakteryjną, wstrząs septyczny i niewydolność wielonarządową.",
        drugTarget: "Antybiotykoterapia dożylna o szerokim spektrum i obfite płukanie jamy otrzewnej solą fizjologiczną"
      }
    ],
    dutySummary: "Perforacja wrzodu to nagły ból 'jak pchnięcie nożem', brzuch deskowaty i zanik stłumienia wątrobowego. Złoty standard rozpoznania: RTG klatki piersiowej na stojąco (sierp powietrza pod przeponą). GASTROSKOPIA JEST BEZWZGLĘDNIE ZAKAZANA! Leczenie: nic p.o., sonda NG, IPP i.v., antybiotyki i PILNA OPERACJA (laparoskopia/laparotomia z łatą Grahama). Przy wrzodzie żołądka obowiązkowe pobranie wycinków pod kątem raka. Po operacji: eradykacja H. pylori.",
    diffTable: [
      { disease: "Ostre zapalenie trzustki (OZT)", diff: "Ból opasujący, brak wolnego gazu pod kopułą przepony w RTG, wysoki poziom lipazy/amylazy (>3x GGN).", test: "RTG na stojąco (brak odmy otrzewnowej), lipaza w surowicy." },
      { disease: "Tętniak rozwarstwiający aorty (typ Stanford A/B)", diff: "Ból 'rozdzierający' klatki piersiowej promieniujący do łopatek, asymetria ciśnień na kończynach, brak pneumoperitoneum.", test: "Angio-TK aorty, asymetria tętna." },
      { disease: "Zawał ściany dolnej serca", diff: "Ból w nadbrzuszu z nudnościami, ale brak objawów otrzewnowych (brzuch miękki), brak wolnego gazu pod przeponą, zmiany ST w EKG.", test: "EKG, troponina sercowa, RTG klatki." },
      { disease: "Niedrożność mechaniczna jelit", diff: "Ból kurczowy kolkowy z przerwami, 'stawianie się jelit', metaliczna perystaltyka, mnogie poziomy płynów w jelicie bez gazu pod przeponą.", test: "RTG jamy brzusznej (poziomy płynów w pętlach jelitowych vs gaz podprzeponowy)." }
    ],
    lekQuestions: [
      {
        question: "U 50-letniego mężczyzny wystąpił nagły, niezwykle silny ból w nadbrzuszu opisywany jako 'cios sztyletem'. W badaniu fizykalnym stwierdzono deskowatą obronę mięśniową powłok brzusznych oraz zanik stłumienia wątrobowego. Wskaż badanie obrazowe pierwszego wyboru w celu potwierdzenia podejrzenia perforacji przewodu pokarmowego:",
        options: [
          "Przeglądowe zdjęcie rentgenowskie klatki piersiowej lub jamy brzusznej w pozycji stojącej.",
          "Pilna gastroskopia z pobraniem wycinków.",
          "Wlew doodbytniczy z zawiesiny barytowej.",
          "Kolonoskopia diagnostyczna.",
          "Scyntygrafia wątroby i dróg żółciowych."
        ],
        correct: 0,
        explanation: "Najszybszym i podstawowym badaniem obrazowym pierwszego rzutu przy podejrzeniu przedziurawienia narządu drążącego jest przeglądowe RTG klatki piersiowej na stojąco z uwidocznieniem kopuł przepony (lub RTG brzucha na stojąco). Uwidocznienie wolnego gazu pod prawą lub lewą kopułą przepony (sierp powietrza / pneumoperitoneum) potwierdza rozpoznanie. Gastroskopia i badania z barytem są bezwzględnie przeciwwskazane!"
      },
      {
        question: "Dlaczego podczas operacji perforacji wrzodu ŻOŁĄDKA chirurg ma obowiązek pobrania wycinków z brzegów wrzodu do badania histopatologicznego, podczas gdy przy wrzodzie dwunastnicy nie jest to rutynowo wymagane?",
        options: [
          "Ponieważ wrzód żołądka może być w rzeczywistości drążącym rakiem żołądka, który uległ perforacji.",
          "Ponieważ zakażenie H. pylori występuje wyłącznie w żołądku, a nigdy w dwunastnicy.",
          "W celu wykazania obecności toksyny botulinowej w ścianie żołądka.",
          "Z powodu konieczności zbadania obecności kwasu solnego w komórkach okładzinowych.",
          "Jest to wymóg procedury anestezjologicznej."
        ],
        correct: 0,
        explanation: "Wrzody zlokalizowane w żołądku wiążą się ze znacznym (ok. 5–10%) ryzykiem procesu nowotworowego (gruczolakorak wrzodziejący żołądka może perforować imitując wrzód trawienny). Z tego powodu każda perforacja wrzodu żołądka wymaga pobrania wycinków z brzegów zmiany do weryfikacji histopatologicznej, w przeciwieństwie do wrzodów opuszki dwunastnicy, które niemal w 100% mają charakter łagodny."
      },
      {
        question: "Która technika chirurgiczna polegająca na zaopatrzeniu perforacji wrzodu dwunastnicy za pomocą prostego zszycia i pokrycia uszypułowanym płatem sieci większej nosi nazwę plastyki sposobem Grahama (Graham patch)?",
        options: [
          "Zaopatrzenie perforacji płatem sieci większej (Graham patch).",
          "Operacja sposobem Whipple'a.",
          "Operacja sposobem Hartmanna.",
          "Zabieg Kasai.",
          "Plastyka sposobem Ramstedta."
        ],
        correct: 0,
        explanation: "Metoda Grahama (Cellana-Jonesa / Graham patch) polega na pierwotnym zszyciu ubytku ściany dwunastnicy i doszyciu na wierzch unaczynionej 'łaty' z fragmentu sieci większej. Jest najpowszechniejszym, bezpiecznym i szybkim sposobem operacyjnego zaopatrzenia przedziurawionego wrzodu trawiennego."
      }
    ],
    flashcards: [
      { q: "Jaka triada objawów cechuje perforację wrzodu trawiennego?", a: "Nagły ból 'cios sztyletem', brzuch deskowaty (odruchowa obrona mięśniowa) i zanik stłumienia wątrobowego.", cat: "Chirurgia" },
      { q: "Jakie badanie obrazowe potwierdza obecność wolnego powietrza w otrzewnej?", a: "Przeglądowe RTG klatki piersiowej / brzucha na stojąco (sierp gazu pod kopułą przepony).", cat: "Chirurgia" },
      { q: "Dlaczego gastroskopia jest przeciwwskazana w podejrzeniu perforacji wrzodu?", a: "Wdmuchiwanie powietrza powiększa ubytek i wtłacza masywne ilości treści do jamy otrzewnej.", cat: "Chirurgia" },
      { q: "Na czym polega zabieg sposobem Grahama (Graham patch)?", a: "Na zszyciu perforacji wrzodu dwunastnicy i pokryciu miejsca szycia płatem z sieci większej.", cat: "Chirurgia" },
      { q: "Dlaczego przy perforacji wrzodu żołądka należy pobrać wycinki histopatologiczne?", a: "W celu wykluczenia drążącego raka żołądka (5–10% wrzodów żołądka ma charakter nowotworowy).", cat: "Chirurgia" }
    ]
  },

  // 130: Niedrożność jelita cienkiego ze zrostów
  {
    id: 130,
    filename: "130_niedroznosc_jelita_cienkiego_zrosty.json",
    dept: "Chirurgia",
    shortTitle: "58-letnia kobieta – Bóle kolkowe, chlustające wymioty treścią jelitową i poziomy płynów w RTG (Niedrożność ze zrostów)",
    diagnosisTitle: "Mechaniczna niedrożność jelita cienkiego (Ileus mechanicus intestini tenuis) ze zrostów pooperacyjnych (adhesiones intraabdominales)",
    vitals: [
      { label: "HR", val: "108/min", sub: "Tachykardia z odwodnienia", status: "warn" },
      { label: "BP", val: "110/68 mmHg", sub: "Prawidłowe", status: "ok" },
      { label: "SpO2", val: "98%", sub: "Prawidłowa", status: "ok" },
      { label: "RR", val: "22/min", sub: "Przyspieszony", status: "warn" },
      { label: "Temp", val: "37.2°C", sub: "Stan podgorączkowy", status: "ok" }
    ],
    vitalsObj: { hr: 108, bp: "110/68", spo2: 98, rr: 22, temp: 37.2 },
    story: "58-letnia kobieta została przyjęta na oddział chirurgii ogólnej z powodu narastających od 24 godzin kurczowych bólów brzucha, nudności oraz obfitych, chlustających wymiotów, które od kilku godzin mają zabarwienie brązowo-zielone i zapach kałowy (wymioty treścią jelitową). Pacjentka podaje całkowite zatrzymanie gazów i stolca od ponad doby. W wywiadzie: przed 6 laty przebyła klasyczną cholecystektomię oraz usunięcie przydatków drogą laparotomii. W badaniu fizykalnym: powłoki brzuszne wzdęte symetrycznie, widoczna blizna po laparotomii pośrodkowej. Podczas napadu bólu widoczne jest zarysowywanie się i skurcze fal perystaltycznych na powłokach brzusznych (tzw. 'stawianie się jelit'). Osłuchowo w trakcie ataku bólu słyszalny głośny, wzmożony, metaliczny szmer perystaltyczny z pluskaniem, po czym następuje faza całkowitej ciszy. Brzuch miękki, bez objawów otrzewnowych (brak objawu Blumberga – cecha niedrożności prostej bez zadzierzgnięcia).",
    labs: [
      {
        category: "Diagnostyka obrazowa (RTG i TK jamy brzusznej)",
        items: [
          { name: "RTG przeglądowe jamy brzusznej na stojąco", val: "Liczne, szerokie poziomy płynów w pętlach jelita cienkiego ułożone 'schodkowato', z widocznym obrazem fałdów okrężnych (plicae circulares / fałdy Kerkringa); brak gazu w okrężnicy i bańce odbytnicy", norm: "Brak poziomów płynów", flag: "H" },
          { name: "Tomografia komputerowa (TK jamy brzusznej z kontrastem)", val: "Mechaniczna niedrożność jelita cienkiego: poszerzone pętle jelita czczego do 42 mm, wyraźna 'strefa przejścia' (transition point) w miednicy mniejszej związana z pasmem zrostowym; ściana jelita prawidłowo wzmacnia się kontrastem (brak cech martwicy/zadzierzgnięcia)", norm: "Średnica jelita cienkiego < 25 mm", flag: "H" }
        ]
      },
      {
        category: "Gazometria i elektrolity (odwodnienie hipochloremiczne)",
        items: [
          { name: "Sód (Na+) / Potas (K+)", val: "132 / 3.2 mmol/L (hipokaliemia z wymiotów)", norm: "135–145 / 3.5–5.0", flag: "L" },
          { name: "Chlorki (Cl-)", val: "88 mmol/L (hipochloremia)", norm: "96–106 mmol/L", flag: "L" },
          { name: "Mocznik / Kreatynina", val: "54 / 1.35 mg/dL (odwodnienie przednerkowe)", norm: "15–40 / 0.6–1.1", flag: "H" },
          { name: "Hematokryt (Hct)", val: "48% (zagęszczenie krwi / hemokoncentracja)", norm: "36–46%", flag: "H" }
        ]
      },
      {
        category: "Wskaźniki zapalne i żywotności jelita",
        items: [
          { name: "Mleczany w surowicy", val: "1.4 mmol/L (prawidłowe - brak martwicy ściany)", norm: "0.5–2.0 mmol/L", flag: "N" },
          { name: "Leukocyty (WBC)", val: "11.2 G/L", norm: "4.0–10.0 G/L", flag: "H" },
          { name: "CRP", val: "18 mg/L", norm: "< 5.0 mg/L", flag: "H" }
        ]
      }
    ],
    steps: [
      {
        num: 1,
        title: "Cztery kardynalne objawy niedrożności mechanicznej jelit",
        task: "Jakie 4 główne objawy kliniczne składają się na klasyczny zespół niedrożności przewodu pokarmowego (ileus)?",
        options: [
          { text: "Ból brzucha (zwykle kurczowy, falowy), wymioty, wzdęcie brzucha oraz zatrzymanie gazów i stolca", correct: true, feedback: "Prawidłowo! Cztery kardynalne objawy niedrożności: ból kolkowy, nudności/wymioty, wzdęcie powłok brzusznych (meteorismus) oraz brak oddawania stolca i gazów." },
          { text: "Gorączka, kaszel, katar i zapalenie spojówek", correct: false, feedback: "To objawy nieżytu dróg oddechowych / odry." },
          { text: "Wybroczyny na skórze, bladość i powiększenie śledziony", correct: false, feedback: "To zespół skazy krwotocznej / białaczki." },
          { text: "Biegunka tłuszczowa, cukrzyca i spadek masy ciała", correct: false, feedback: "To objawy przewlekłego zapalenia trzustki." }
        ]
      },
      {
        num: 2,
        title: "Osłuchiwanie brzucha w niedrożności mechanicznej vs porażennej",
        task: "Jaki jest charakterystyczny szmer osłuchowy nad jamą brzuszną w mechanicznej fazie niedrożności jelit z zachowaną perystaltyką?",
        options: [
          { text: "Wzmożona, głośna, metaliczna perystaltyka (odgłos spadającej kropli, pluskanie) zbiegająca się w czasie z napadami bólu kolkowego", correct: true, feedback: "Znakomicie! W niedrożności mechanicznej pętle jelita powyżej przeszkody wykonują gwałtowne skurcze w celu przepchnięcia treści ('stawianie się jelit'). Mieszanina gazu i płynu w rozdętych pętlach generuje dźwięki o wysokim, metalicznym tonie (tinkling / metaliczny szmer). W niedrożności porażennej panuje 'groobowa cisza'." },
          { text: "Całkowity brak jakichkolwiek dźwięków od początku choroby", correct: false, feedback: "Całkowita cisza cechuje niedrożność porażenną (paralytic ileus) lub późną fazę martwicy jelit." },
          { text: "Szmer skurczowy nad aortą brzuszną", correct: false, feedback: "Występuje w tętniaku lub zwężeniu tętnic nerkowych." },
          { text: "Odgłos tarcia opłucnej", correct: false, feedback: "Występuje w zapaleniu opłucnej." }
        ]
      },
      {
        num: 3,
        title: "Cechy radiologiczne niedrożności jelita cienkiego w RTG",
        task: "Jak odróżnić poziomy płynów w jelicie cienkim od poziomów w jelicie grubym na zdjęciu RTG brzucha na stojąco?",
        options: [
          { text: "W jelicie cienkim poziomy płynów są liczne, centralnie zlokalizowane, szersze niż wyższe, a pętle mają poprzeczne prążkowanie przechodzące przez CAŁĄ szerokość światła (fałdy okrężne Kerkringa)", correct: true, feedback: "Dokładnie tak! Cechy jelita cienkiego: lokalizacja centralna, ułożenie schodkowate, fałdy okrężne (valvulae conniventes / Kerkringa) biegnące przez całą szerokość światła pętli. W jelicie grubym poziomy są obwodowe, wyższe niż szersze, a fałdy haustracyjne (haustra) nie przekraczają całej szerokości światła." },
          { text: "W jelicie cienkim nigdy nie ma żadnych poziomów płynów", correct: false, feedback: "Błąd – obecność poziomów płynów jest podstawą rozpoznania." },
          { text: "W jelicie cienkim widoczny jest wyłącznie objaw ziarna kawy", correct: false, feedback: "Objaw ziarna kawy to skręt esicy (jelito grube)." },
          { text: "Jelito cienkie leży wyłącznie pod wątrobą", correct: false, feedback: "Jelito cienkie zajmuje centralną część jamy brzusznej." }
        ]
      },
      {
        num: 4,
        title: "Kluczowe różnicowanie: niedrożność prosta vs z zadzierzgnięciem (strangulacja)",
        task: "Co odróżnia prostą niedrożność zrostową od zagrażającej martwicą niedrożności z zadzierzgnięciem (strangulation ileus)?",
        options: [
          { text: "W zadzierzgnięciu dochodzi do ucisku naczyń krezkowych pętli – ból staje się stały i silny, pojawia się gorączka, tachykardia, miejscowe objawy otrzewnowe, wzrost leukocytozy i kwasica mleczanowa", correct: true, feedback: "Kluczowy punkt chirurgiczny! W niedrożności prostej światło jelita jest zatkane, ale unaczynienie krezki jest zachowane (ból kolkowy, brak objawów otrzewnowych, prawidłowe mleczany). W zadzierzgnięciu (np. pętla uwięźnięta w paśmie zrostowym) ucisk naczyń prowadzi do zawału jelita, stałego bólu, peritonitis i sepsy – wymaga NATYCHMIASTOWEJ OPERACJI!" },
          { text: "W zadzierzgnięciu chory ma biegunkę", correct: false, feedback: "W obu postaciach występuje zatrzymanie stolca." },
          { text: "Niedrożność z zadzierzgnięciem nie boli", correct: false, feedback: "Błąd – ból jest niezwykle silny i ciągły." },
          { text: "W zadzierzgnięciu poziom mleczanów spada do zera", correct: false, feedback: "Przeciwnie – niedokrwienie jelita wyzwala glikolizę beztlenową i wzrost mleczanów!" }
        ]
      },
      {
        num: 5,
        title: "Postępowanie zachowawcze pierwszego rzutu w prostej niedrożności zrostowej",
        task: "U pacjentki bez cech zadzierzgnięcia, zapalenia otrzewnej i bez wstrząsu, jakie jest wstępne postępowanie zachowawcze (próba leczenia zachowawczego)?",
        options: [
          { text: "Założenie zgłębnika nosowo-żołądkowego z odsysaniem (dekompresja), intensywna płynoterapia krystaloidowa z wyrównaniem elektrolitów (K+, Cl-), ścisła dieta i obserwacja do 48–72 godzin", correct: true, feedback: "Znakomicie! Wytyczne Bologna Guidelines wskazują, że u 70–80% chorych z prostą niedrożnością zrostową (adhesive small bowel obstruction - ASBO) bez cech niedokrwienia jelita leczenie zachowawcze (sonda NG, płyny i.v.) prowadzi do samoistnego odbarczenia i ustąpienia przeszkody." },
          { text: "Podanie dożylne neostygminy w celu wymuszenia skurczu jelit", correct: false, feedback: "Kategorycznie zakazane w niedrożności mechanicznej – podanie leku prokinetycznego przeciw mechanicznej przeszkodzie grozi pęknięciem jelita!" },
          { text: "Wlewy z oleju rycynowego przez sondę żołądkową", correct: false, feedback: "Kardynalny błąd mogący doprowadzić do perforacji i zachłyśnięcia." },
          { text: "Wypisanie do domu z zaleceniem spacerów", correct: false, feedback: "Pacjent wymaga hospitalizacji na oddziale chirurgicznym." }
        ]
      },
      {
        num: 6,
        title: "Test z doustnym kontrastem rozpuszczalnym w wodzie (Gastrografin test)",
        task: "Jaką rolę diagnostyczną i terapeutyczną pełni podanie doustne gastrografiny (Gastrografin test) w niedrożności zrostowej jelita cienkiego?",
        options: [
          { text: "Działa diagnostycznie (pojawienie się kontrastu w kątnicy w RTG po 4–24h potwierdza ustąpienie przeszkody) oraz terapeutycznie (hiperosmolarny kontrast ściąga wodę do światła jelita, zmniejsza obrzęk ściany i pobudza perystaltykę)", correct: true, feedback: "Doskonale! Test z Gastrografinem (100 mL gastrografiny podane przez sondę NG): jeśli po 4–24 godzinach kontrast dotrze do jelita grubego, z czułością >95% niedrożność ustąpi zachowawczo (skraca czas hospitalizacji). Brak kontrastu w okrężnicy po 24h stanowi wskazanie do operacji!" },
          { text: "Służy wyłącznie do znieczulenia śluzówki jelita", correct: false, feedback: "Brak działania znieczulającego." },
          { text: "Jest to antybiotyk niszczący bakterie beztlenowe", correct: false, feedback: "Gastrografin to hiperosmolarny jodowy środek cieniujący, nie antybiotyk." },
          { text: "Podaje się go w celu wywołania wymiotów", correct: false, feedback: "Wymioty są niepożądane." }
        ]
      },
      {
        num: 7,
        title: "Wskazania do pilnej interwencji operacyjnej",
        task: "Kiedy należy przerwać próbę leczenia zachowawczego i zakwalifikować pacjenta do pilnej operacji (uwolnienia zrostów / adhesiolysis)?",
        options: [
          { text: "Pojawienie się objawów otrzewnowych (Blumberg), gorączki, tachykardii, wzrostu leukocytozy i kwasicy mleczanowej (podejrzenie martwicy jelita) lub brak ustąpienia niedrożności po 48–72 godzinach leczenia zachowawczego", correct: true, feedback: "Prawidłowo! Wskazania do natychmiastowej operacji: objawy zadzierzgnięcia/niedokrwienia ściany w TK lub badaniu fizykalnym, narastająca kwasica mleczanowa, zapalenie otrzewnej oraz brak cech pasażu do jelita grubego po 48–72 godzinach prawidłowo prowadzonego leczenia zachowawczego." },
          { text: "Gdy pacjent poprosi o szklankę wody", correct: false, feedback: "Brak związku medycznego." },
          { text: "Tylko wtedy, gdy ciśnienie tętnicze wzrośnie powyżej 140 mmHg", correct: false, feedback: "Wzrost ciśnienia nie jest kryterium operacyjnym w ASBO." },
          { text: "Po dokładnie 10 minutach od przyjęcia u każdego chorego", correct: false, feedback: "Większość chorych leczy się z powodzeniem zachowawczo." }
        ]
      },
      {
        num: 8,
        title: "Ocena żywotności pętli jelitowej podczas operacji",
        task: "Podczas operacji po przecięciu pasma zrostowego pętla jelita cienkiego jest ciemnosina. Jakie są kliniczne kryteria powrotu żywotności pętli jelita po uwolnieniu ucisku?",
        options: [
          { text: "Powrót różowego zabarwienia surowicówki, powrót widocznej perystaltyki oraz wyczuwalne tętno na drobnych tętniczkach krezkowych po obłożeniu ciepłą solą fizjologiczną przez 10–15 minut", correct: true, feedback: "Znakomicie! Chirurg obkłada siną pętlę wilgotnymi gazami nasączonymi ciepłym 0.9% NaCl na 10–15 minut i podaje 100% tlen. O żywotności świadczą: zaróżowienie ściany, powrót skurczów perystaltycznych i pulsowanie tętniczek brzeżnych. Pętla czarna, matowa, wiotka i bez perystaltyki jest martwa i wymaga resekcji z zespoleniem!" },
          { text: "Pętlę uważa się za żywą, jeśli wydziela cuchnący zapach", correct: false, feedback: "Cuchnący zapach to cecha zgorzeli bakteryjnej!" },
          { text: "O żywotności decyduje wyłącznie masa ciała pacjenta", correct: false, feedback: "Nonsens." },
          { text: "Zawsze usuwa się całe jelito cienkie bez względu na kolor", correct: false, feedback: "Doprowadziłoby to do śmiertelnego zespołu krótkiego jelita!" }
        ]
      }
    ],
    pathoNodes: [
      {
        title: "1. Pasmo zrostowe i mechaniczna blokada światła jelita",
        desc: "Zrosty otrzewnowe powstałe po wcześniejszych operacjach tworzą pasma uciskające pętlę jelita cienkiego, zamykając pasaż treści pokarmowej i gazu.",
        drugTarget: "Zgłębnik nosowo-żołądkowy (dekompresja) i ewentualne uwolnienie chirurgiczne (adhesiolysis)"
      },
      {
        title: "2. Rozdęcie pętli i ucieczka płynów do 'trzeciej przestrzeni'",
        desc: "Zaleganie płynów trawiennych (do 6–8 litrów/dobę) i gazu rozciąga ścianę jelita, upośledza wchłanianie i wywołuje masywny wysięk do światła jelita i otrzewnej (hipowolemia, hipokaliemia, zagęszczenie krwi).",
        drugTarget: "Intensywna płynoterapia krystaloidowa z wyrównaniem potasu i chlorków"
      },
      {
        title: "3. Ryzyko zadzierzgnięcia naczyń krezkowych (strangulacja)",
        desc: "Gdy zrost uciska nie tylko światło, ale i naczynia krezkowe, dochodzi do zakrzepicy żylnej, niedokrwienia, martwicy ściany, translokacji bakteryjnej i perforacji z zapaleniem otrzewnej.",
        drugTarget: "Pilna operacja w trybie ostrym przy podejrzeniu niedokrwienia (monitorowanie kwasicy mleczanowej)"
      }
    ],
    dutySummary: "Niedrożność mechaniczna jelita cienkiego ze zrostów (ASBO) cechuje się bólami kolkowymi, wymiotami (treścią jelitową/kałową), zatrzymaniem gazów i stolca oraz metaliczną perystaltyką. W RTG: schodkowate poziomy płynów w jelicie cienkim z fałdami okrężnymi. U chorych bez zadzierzgnięcia: próba leczenia zachowawczego (sonda NG, płyny i.v., test z Gastrografinem) przez 48–72h. Objawy otrzewnowe, stały ból i wzrost mleczanów to objawy zadzierzgnięcia wymagające NATYCHMIASTOWEJ OPERACJI!",
    diffTable: [
      { disease: "Niedrożność porażenna (paralytic ileus)", diff: "Brak bólów kolkowych (brzuch bezbolesny lub tępo pobolewający), w badaniu osłuchowym całkowita 'groobowa cisza', poziomy płynów i gaz obecne ZARÓWNO w jelicie cienkim jak i grubym.", test: "Osłuchiwanie brzucha (cisza vs perystaltyka metaliczna), RTG brzucha." },
      { disease: "Niedrożność mechaniczna jelita grubego (rak esicy)", diff: "Późniejsze wymioty, masywne obwodowe wzdęcie brzucha, poziomy płynów w okrężnicy z fałdami haustracyjnymi, brak gazu w odbytnicy.", test: "TK jamy brzusznej z kontrastem (guz jelita grubego), kolonoskopia." },
      { disease: "Ostre niedokrwienie krezki (zator SMA)", diff: "Ból brzucha skrajnie silny, nieproporcjonalny do ubogiego badania palpacyjnego, wczesna kwasica mleczanowa, brak poziomów płynów we wczesnej fazie.", test: "Angio-TK tętnic trzewnych (zator tętnicy krezkowej górnej), mleczany." },
      { disease: "Zapalenie żołądkowo-jelitowe (gastroenteritis)", diff: "Wymioty i kurczowe bóle, ale towarzyszy im obfita, wodnista biegunka (stolec NIE jest zatrzymany!), perystaltyka żywa, brak poziomów w RTG.", test: "Obecność biegunki, brak poziomów płynów w RTG jamy brzusznej." }
    ],
    lekQuestions: [
      {
        question: "U 60-letniej pacjentki po przebytej w przeszłości cholecystektomii wystąpiły kurczowe bóle brzucha, nudności, wymioty treścią jelitową oraz zatrzymanie gazów i stolca. W badaniu fizykalnym stwierdzono 'stawianie się jelit' i metaliczny szmer perystaltyczny, a w RTG jamy brzusznej na stojąco liczne poziomy płynów w jelicie cienkim. Najbardziej prawdopodobnym rozpoznaniem jest:",
        options: [
          "Mechaniczna niedrożność jelita cienkiego ze zrostów pooperacyjnych.",
          "Niedrożność porażenna w przebiegu hipokaliemii.",
          "Ostre krwawienie z wrzodu żołądka.",
          "Zespół jelita drażliwego postać biegunkowa.",
          "Zator tętnicy śledzionowej."
        ],
        correct: 0,
        explanation: "Tetra objawów (ból kolkowy, wymioty, wzdęcie brzucha, zatrzymanie gazów i stolca) w połączeniu z 'stawianiem się jelit', metaliczną perystaltyką oraz schodkowatymi poziomami płynów w pętlach jelita cienkiego u pacjenta po wcześniejszych operacjach brzusznych jest klasycznym obrazem mechanicznej niedrożności jelita cienkiego na podłożu zrostów pooperacyjnych (ASBO)."
      },
      {
        question: "Który objaw kliniczny lub laboratoryjny wskazuje na rozwój ZADZIERZGNIĘCIA jelita (strangulacji z niedokrwieniem ściany) w przebiegu niedrożności mechanicznej i stanowi wskazanie do natychmiastowej operacji?",
        options: [
          "Zmiana charakteru bólu z napadowego kolkowego na stały i bardzo silny, pojawienie się objawów otrzewnowych (Blumberga) oraz narastająca kwasica mleczanowa i leukocytoza.",
          "Pojawienie się czkawki po posiłku.",
          "Spadek stężenia hemoglobiny o 0.2 g/dL.",
          "Wystąpienie świądu skóry dłoni.",
          "Obecność gazu w bańce odbytnicy."
        ],
        correct: 0,
        explanation: "Zadzierzgnięcie jelita (strangulacja) oznacza jednoczesne zaciśnięcie światła jelita i naczyń krezkowych, co prowadzi do martwicy ściany, perforacji i zapalenia otrzewnej. Cechami alarmowymi są: przejście bólu kolkowego w ból stały i silny, obrona mięśniowa i objawy otrzewnowe, tachykardia, gorączka, wysoka leukocytoza oraz narastające stężenie kwasu mlekowego we krwi (kwasica mleczanowa świadcząca o niedokrwieniu jelita)."
      },
      {
        question: "Jaką rolę odgrywa doustne podanie rozpuszczalnego w wodzie środka cieniującego (test z Gastrografinem) u pacjenta z niepowikłaną niedrożnością zrostową jelita cienkiego?",
        options: [
          "Pozwala na zróżnicowanie mechanizmu niedrożności: dotarcie kontrastu do jelita grubego w ciągu 4–24 godzin prognozuje ustąpienie niedrożności w leczeniu zachowawczym i przyspiesza pasaż jelitowy.",
          "Służy wyłącznie do zwalczania bakterii Helicobacter pylori.",
          "Całkowicie znieczula otrzewną ścienną.",
          "Jest to próba prowokacyjna mająca na celu wywołanie perforacji jelita.",
          "Stosuje się go wyłącznie w znieczuleniu ogólnym."
        ],
        correct: 0,
        explanation: "Test z Gastrografinem (wodnym, hiperosmolarnym kontrastem jodowym) ma podwójne znaczenie w niepowikłanej niedrożności zrostowej jelita cienkiego: 1. Diagnostyczne: wykazanie obecności kontrastu w kątnicy/okrężnicy na zdjęciu RTG po 4–24 godzinach od podania ma wysoką wartość predykcyjną (>95%) wyleczenia zachowawczego, 2. Terapeutyczne: wysoka osmolarność środka ściąga wodę do światła jelita, zmniejsza obrzęk ściany i stymuluje perystaltykę, przyspieszając ustąpienie niedrożności."
      }
    ],
    flashcards: [
      { q: "Jakie są 4 kardynalne objawy niedrożności przewodu pokarmowego?", a: "Ból brzucha (kolkowy), nudności i wymioty, wzdęcie powłok brzusznych oraz zatrzymanie gazów i stolca.", cat: "Chirurgia" },
      { q: "Czym różni się osłuchiwanie brzucha w niedrożności mechanicznej od porażennej?", a: "W mechanicznej perystaltyka jest wzmożona, głośna i metaliczna ('stawianie się jelit'); w porażennej panuje całkowita cisza.", cat: "Chirurgia" },
      { q: "Jak wygląda obraz RTG niedrożności jelita cienkiego na stojąco?", a: "Liczne, centralnie ułożone poziomy płynów z fałdami okrężnymi (Kerkringa) przechodzącymi przez całą szerokość światła.", cat: "Chirurgia" },
      { q: "Co to jest zadzierzgnięcie (strangulacja) jelita i jak się objawia?", a: "Zaciśnięcie naczyń krezkowych pętli grożące martwicą; objawia się stałym bólem, objawami otrzewnowymi i wzrostem mleczanów.", cat: "Chirurgia" },
      { q: "Jakie jest postępowanie zachowawcze pierwszego rzutu w prostej niedrożności zrostowej?", a: "Zgłębnik nosowo-żołądkowy (dekompresja), płynoterapia i.v., wyrównanie elektrolitów i test z Gastrografinem do 48–72h.", cat: "Chirurgia" }
    ]
  },

  // 131: Skręt esicy (volvulus sigmoidei)
  {
    id: 131,
    filename: "131_skret_esicy_volvulus.json",
    dept: "Chirurgia",
    shortTitle: "74-letni mężczyzna – Asymetryczne wzdęcie brzucha, brak stolca i gazów, obraz 'ziarna kawy' w RTG (Skręt esicy)",
    diagnosisTitle: "Skręt esicy (Volvulus sigmoidei) powikłany niedrożnością mechaniczną jelita grubego w pętli zamkniętej",
    vitals: [
      { label: "HR", val: "102/min", sub: "Tachykardia", status: "warn" },
      { label: "BP", val: "128/78 mmHg", sub: "Prawidłowe", status: "ok" },
      { label: "SpO2", val: "97%", sub: "Prawidłowa", status: "ok" },
      { label: "RR", val: "22/min", sub: "Spłycony z powodu rozdęcia brzucha", status: "warn" },
      { label: "Temp", val: "37.1°C", sub: "Prawidłowa", status: "ok" }
    ],
    vitalsObj: { hr: 102, bp: "128/78", spo2: 97, rr: 22, temp: 37.1 },
    story: "74-letni pensjonariusz domu pomocy społecznej, leżący, z chorobą Parkinsona i wywiadem przewlekłych, wieloletnich zaparć leczonych lekami przeczyszczającymi, został przywieziony na izbę przyjęć z powodu olbrzymiego powiększenia obwodu brzucha narastającego od 2 dni. Opiekunowie zgłaszają całkowity brak oddawania gazów i stolca od 48 godzin, nudności i pojedyncze wymioty treścią żołądkową. W badaniu fizykalnym: jama brzuszna potężnie wzdęta, wyraźnie asymetryczna (największe uwypuklenie w prawym górnym i środkowym kwadrancie brzucha). Powłoki brzuszne napięte jak bęben, bębenkowy odgłos opukowy nad całym brzuchem. Brzuch niebolesny lub lekko tkliwy w rzucie skręconej pętli, brak objawów otrzewnowych (objaw Blumberga ujemny – brak cech martwicy ściany). W badaniu per rectum: bańka odbytnicy całkowicie pusta, rozszerzona (objaw balonu). Perystaltyka leniwa, rzadkie metaliczne dźwięki.",
    labs: [
      {
        category: "Diagnostyka obrazowa (RTG i TK jamy brzusznej)",
        items: [
          { name: "RTG przeglądowe jamy brzusznej na leżąco i stojąco", val: "Olbrzymia, pojedyncza, rozdęta pętla jelitowa o gładkich zarysach wychodząca z miednicy i sięgająca pod prawą kopułę przepony – klasyczny objaw 'ziarna kawy' (coffee bean sign) / 'odwróconej litery U'; brak gazu w bańce odbytnicy", norm: "Prawidłowy rozkład gazów", flag: "H" },
          { name: "Tomografia komputerowa (TK jamy brzusznej z kontrastem)", val: "Potężnie rozdęta pętla esicy o średnicy 11 cm, widoczny objaw wiru naczyniowego (whirl sign) w krezce esicy odpowiadający skrętowi wokół osi naczyń krezkowych; ściana jelita wzmacnia się prawidłowo (brak cech zgorzeli), brak pneumoperitoneum", norm: "Prawidłowa esica < 4 cm", flag: "H" }
        ]
      },
      {
        category: "Gazometria i parametry nerkowe",
        items: [
          { name: "pH krwi / Mleczany", val: "7.38 / 1.3 mmol/L (mleczany w normie - brak martwicy)", norm: "7.35–7.45 / 0.5–2.0", flag: "N" },
          { name: "Mocznik / Kreatynina", val: "42 / 1.10 mg/dL", norm: "15–40 / 0.70–1.20", flag: "H" },
          { name: "Sód / Potas", val: "136 / 4.0 mmol/L", norm: "135–145 / 3.5–5.0", flag: "N" }
        ]
      },
      {
        category: "Morfologia i wskaźniki ostrej fazy",
        items: [
          { name: "Leukocyty (WBC)", val: "9.8 G/L", norm: "4.0–10.0 G/L", flag: "N" },
          { name: "CRP", val: "12 mg/L", norm: "< 5.0 mg/L", flag: "H" },
          { name: "Hemoglobina", val: "13.6 g/dL", norm: "13.0–17.0 g/dL", flag: "N" }
        ]
      }
    ],
    steps: [
      {
        num: 1,
        title: "Identyfikacja patognomonicznego obrazu radiologicznego",
        task: "Pojedyncza, potężnie rozdęta pętla jelita grubego wychodząca z miednicy w kierunku prawego podżebrza, z dwoma ramionami schodzącymi się ku dołowi, przypominająca 'ziarno kawy' (coffee bean sign) lub 'dętkę samochodową', to obraz patognomoniczny dla:",
        options: [
          { text: "Skrętu esicy (Volvulus sigmoidei)", correct: true, feedback: "Prawidłowo! Skręt esicy jest najczęstszą postacią skrętu przewodu pokarmowego u dorosłych (zwłaszcza u starszych, leżących pacjentów z dolichocolon / wydłużoną esicą). Obraz 'ziarna kawy' (coffee bean sign) lub 'odwróconej litery U' w RTG jest klasyczny." },
          { text: "Skrętu kątnicy (cecal volvulus)", correct: false, feedback: "W skręcie kątnicy rozdęta pętla ma kształt przecinka lub fasoli i przemieszcza się z prawego dołu do lewego górnego kwadrantu." },
          { text: "Raka głowy trzustki", correct: false, feedback: "Rak trzustki daje żółtaczkę zaporową, a nie olbrzymią pętlę w kształcie ziarna kawy." },
          { text: "Ostrego rozdęcia żołądka", correct: false, feedback: "W ostrym rozdęciu żołądka olbrzymi poziom płynu leży w lewym podżebrzu." }
        ]
      },
      {
        num: 2,
        title: "Mechanizm niedrożności w pętli zamkniętej (closed-loop obstruction)",
        task: "Dlaczego skręt esicy jest stanem niedrożności w pętli zamkniętej i stwarza wysokie ryzyko pęknięcia ściany jelita?",
        options: [
          { text: "Skręt krezki o 180–360° zamyka pętlę esicy na obu jej końcach (ramię doprowadzające i odprowadzające), a ciągłe wytwarzanie gazu bakteryjnego powoduje dramatyczny wzrost ciśnienia w pętli i martwicę z niedokrwienia", correct: true, feedback: "Dokładnie tak! W niedrożności w pętli zamkniętej (closed-loop) treść i gazy nie mają drogi ucieczki ani ku dołowi, ani ku górze. Szybki wzrost ciśnienia śródściennego przekracza ciśnienie kapilarne, prowadząc do zawału ściany i perforacji." },
          { text: "Ponieważ w esicy nie ma żadnych naczyń krwionośnych", correct: false, feedback: "Esica ma bogate unaczynienie od tętnic esiczych." },
          { text: "Wynika to ze zrostu pętli jelita z wątrobą", correct: false, feedback: "Błąd anatomiczny." },
          { text: "Gaz w esicy powstaje z rozpadu hemoglobiny", correct: false, feedback: "Bzdura medyczna." }
        ]
      },
      {
        num: 3,
        title: "Ocena żywotności ściany jelita przed wyborem metody",
        task: "Jakie objawy kliniczne i laboratoryjne wykluczają obecność zgorzeli jelita i pozwalają na podjęcie próby leczenia endoskopowego?",
        options: [
          { text: "Brak objawów otrzewnowych (brzuch miękki, Blumberg ujemny), stabilność hemodynamiczna, brak gorączki, prawidłowe stężenie mleczanów we krwi oraz brak gazu w ścianie jelita (pneumatosis) w TK", correct: true, feedback: "Znakomicie! Wykluczenie martwicy/zgorzeli (brak objawów otrzewnowych, prawidłowe mleczany, brak pneumatozy w TK) jest bezwzględnym warunkiem podjęcia próby nieoperacyjnej derotacji endoskopowej." },
          { text: "Obecność deskowatego brzucha i sepsy", correct: false, feedback: "To bezwzględne wskazanie do natychmiastowej laparotomii!" },
          { text: "Obecność obfitych krwawych stolców", correct: false, feedback: "Krwisty stolec może świadczyć o martwicy błony śluzowej." },
          { text: "Spadek ciśnienia tętniczego do 60/40 mmHg", correct: false, feedback: "Wstrząs wymaga pilnej operacji, a nie próby endoskopowej." }
        ]
      },
      {
        num: 4,
        title: "Metoda z wyboru w niepowikłanym skręcie esicy: derotacja endoskopowa",
        task: "Jaka procedura jest postępowaniem pierwszego rzutu u stabilnego pacjenta z niepowikłanym skrętem esicy bez cech martwicy?",
        options: [
          { text: "Endoskopowa derotacja i dekompresja za pomocą sigmoidoskopu sztywnego lub giętkiego (oraz pozostawienie rurki doodbytniczej Flatus tube na 24–48 h)", correct: true, feedback: "Doskonale! Zgodnie z wytycznymi ASCRS i WSES, u chorych bez cech zgorzeli metodą z wyboru jest delikatna derotacja endoskopowa (sigmoidoskopia). Po przejściu skrętu następuje spektakularna ewakuacja mas gazu i płynnego stolca pod ciśnieniem z natychmiastowym spłaszczeniem brzucha. Wprowadza się rurkę doodbytniczą, aby zapobiec wczesnemu nawrotowi." },
          { text: "Natychmiastowe usunięcie całego żołądka", correct: false, feedback: "Błąd absurdalny." },
          { text: "Podanie dożylne 100 mg morfiny", correct: false, feedback: "Opioidy nasilają zaparcia i atonię jelit." },
          { text: "Płukanie żołądka zimną wodą", correct: false, feedback: "Problem dotyczy esicy w miednicy mniejszej, nie żołądka." }
        ]
      },
      {
        num: 5,
        title: "Postępowanie w przypadku zgorzeli lub niepowodzenia derotacji",
        task: "Podczas sigmoidoskopii stwierdzono czarną, martwiczą śluzówkę pętli esicy (lub u pacjenta występują objawy zapalenia otrzewnej). Jaki zabieg operacyjny jest złotym standardem ratunkowym?",
        options: [
          { text: "Operacja sposobem Hartmanna (resekcja martwiczej pętli esicy, zamknięcie kikuta odbytnicy na głucho i wyłonienie stomii końcowej na lewym dole biodrowym)", correct: true, feedback: "Kluczowy zabieg chirurgiczny! W przypadku zgorzeli esicy, perforacji lub zapalenia otrzewnej, a także przy niepowodzeniu derotacji endoskopowej, zabiegiem z wyboru jest operacja Hartmanna. Wycięcie martwego jelita i wyłonienie kolostomii jednolufowej chroni chorego przed śmiertelnym nieszczelnością zespolenia w warunkach sepsy i niedożywienia." },
          { text: "Pierwotne zespolenie jelitowe bez stomii u wstrząsowego pacjenta", correct: false, feedback: "Zespolenie jelita w warunkach niedokrwienia i sepsy u 74-latka prawie w 100% ulegnie rozejściu z kałowym zapaleniem otrzewnej!" },
          { text: "Założenie samego drenu do jamy otrzewnej bez wycinania jelita", correct: false, feedback: "Pozostawienie martwego jelita doprowadzi do zgonu chorego." },
          { text: "Wycięcie pęcherza moczowego", correct: false, feedback: "Brak związku." }
        ]
      },
      {
        num: 6,
        title: "Wysoki odsetek nawrotów po samej derotacji endoskopowej",
        task: "U pacjenta wykonano skuteczną derotację endoskopową. Jaki jest odsetek nawrotu skrętu esicy po samym odbarczeniu endoskopowym bez operacji?",
        options: [
          { text: "Bardzo wysoki – nawrót występuje u 50–80% pacjentów (dlatego u chorych kwalifikujących się do zabiegu zaleca się planową resekcję esicy w trakcie tej samej hospitalizacji)", correct: true, feedback: "Bardzo ważny fakt! Sama derotacja endoskopowa usuwa ostry stan, ale pozostawia przyczynę anatomiczną (wydłużoną esicę z wąską krezką). Bez planowej operacji nawrót skrętu następuje u ponad połowy chorych. Dlatego u pacjentów w stanie ogólnym kwalifikującym do zabiegu zaleca się planową resekcję esicy po przygotowaniu jelita." },
          { text: "Nawrót nigdy nie występuje (0%)", correct: false, feedback: "Nieprawda – nawroty są regułą." },
          { text: "Nawrót dotyczy wyłącznie dzieci", correct: false, feedback: "Skręt esicy to choroba osób starszych." },
          { text: "Zamiast operacji wystarczy codzienne picie kawy", correct: false, feedback: "Bzdura medyczna." }
        ]
      },
      {
        num: 7,
        title: "Czynniki predysponujące do skrętu esicy",
        task: "Jakie czynniki anatomiczne i kliniczne sprzyjają wystąpieniu skrętu esicy?",
        options: [
          { text: "Wydłużona pętla esicy (dolichocolon / megacolon), wąska podstawa krezki esicy, przewlekłe zaparcia, podeszły wiek, unieruchomienie oraz choroby neuropsychiatryczne (np. Parkinson, choroba Alzheimera, stosowanie neuroleptyków)", correct: true, feedback: "Świetnie! Skręt wymaga dwóch warunków: długiej, ruchomej pętli jelita oraz wąskiej szypuły krezkowej, wokół której może dojść do obrotu. Przewlekłe zaparcia rozciągają i obciążają esicę masami kałowymi, co sprzyja skręceniu." },
          { text: "Wrodzony brak wyrostka robaczkowego", correct: false, feedback: "Brak związku." },
          { text: "Palenie papierosów w dzieciństwie", correct: false, feedback: "Nie jest czynnikiem sprawczym." },
          { text: "Młody wiek i intensywny sport wyczynowy", correct: false, feedback: "Skręt esicy dotyczy populacji geriatrycznej i pensjonariuszy DPS." }
        ]
      },
      {
        num: 8,
        title: "Różnicowanie z rzekomą niedrożnością (zespół Ogilviego)",
        task: "Czym różni się skręt esicy od ostrej rzekomej niedrożności okrężnicy (zespołu Ogilviego - ACPO)?",
        options: [
          { text: "W zespole Ogilviego nie ma mechanicznej przeszkody ani skrętu (jest to zaburzenie autonomicznego unerwienia okrężnicy u ciężko chorych internistycznie), a w RTG/TK rozlane rozdęcie obejmuje całą okrężnicę, szczególnie kątnicę (ryzyko pęknięcia kątnicy przy śr. >12 cm)", correct: true, feedback: "Znakomicie! Zespół Ogilviego to ostra pseudoniedrożność jelita grubego bez przeszkody mechanicznej. Występuje po operacjach ortopedycznych, urazach, sepsie. Lekiem z wyboru w Ogilvim jest neostygmina i.v. (która w skręcie mechanicznym jest bezwzględnie zakazana!)." },
          { text: "W zespole Ogilviego esica zawsze ulega martwicy w 5 minut", correct: false, feedback: "Błąd merytoryczny." },
          { text: "Zespół Ogilviego występuje tylko u noworodków", correct: false, feedback: "Dotyczy dorosłych na OIT i po operacjach." },
          { text: "Nie ma żadnych różnic", correct: false, feedback: "To zupełnie odmienne patofizjologicznie jednostki." }
        ]
      }
    ],
    pathoNodes: [
      {
        title: "1. Anatomiczna predyspozycja: dolichosigma i wąska krezka",
        desc: "Długa, przerośnięta pętla esicy o wąskiej podstawie krezki pod wpływem obciążenia twardymi masami kałowymi ulega rotacji wokół osi naczyń krezkowych dolnych.",
        drugTarget: "Leczenie przewlekłych zaparć, dieta bogatoresztkowa, unikanie leków zapierających"
      },
      {
        title: "2. Zamknięta pętla i masywne rozdęcie gazowe",
        desc: "Obrót >180° zamyka światło jelita w dwóch punktach. Fermentacja bakteryjna generuje gazy pod wysokim ciśnieniem, dając olbrzymi obraz 'ziarna kawy' sięgający pod przeponę.",
        drugTarget: "Endoskopowa derotacja i dekompresja sigmoidoskopem + rurka doodbytnicza"
      },
      {
        title: "3. Zadzierzgnięcie krezki, zgorzel i operacja Hartmanna",
        desc: "Zaciśnięcie naczyń krezkowych prowadzi do zawału krwotocznego ściany jelita, martwicy i perforacji kałowej do jamy otrzewnej.",
        drugTarget: "Operacja sposobem Hartmanna (resekcja zgorzelinowej esicy z kolostomią końcową)"
      }
    ],
    dutySummary: "Skręt esicy (volvulus) to niedrożność w pętli zamkniętej u starszych, leżących pacjentów z przewlekłymi zaparciami. W RTG: patognomoniczny obraz 'ziarna kawy' (coffee bean sign). U chorych stabilnych bez cech martwicy metodą z wyboru jest derotacja endoskopowa sigmoidoskopem (wysokie ryzyko nawrotu!). W przypadku zgorzeli ściany, perforacji lub objawów otrzewnowych: pilna operacja sposobem Hartmanna.",
    diffTable: [
      { disease: "Skręt kątnicy (cecal volvulus)", diff: "Rzadszy, dotyczy młodszych osób; rozdęta pętla ma kształt fasoli/przecinka i przemieszcza się z prawego dołu ku lewemu nadbrzuszu.", test: "TK jamy brzusznej (lokalizacja kątnicy, objaw wiru w prawej połowie brzucha)." },
      { disease: "Zespół Ogilviego (ostra pseudoniedrożność okrężnicy)", diff: "Brak mechanicznego skrętu, rozlane rozdęcie całej okrężnicy z dominacją kątnicy u chorych na OIT; lekiem z wyboru jest neostygmina.", test: "TK brzucha bez strefy skrętu, odpowiedź na neostygminę." },
      { disease: "Rak esicy ze zwężeniem", diff: "Objawy narastają powoli (tygodnie/miesiące), stolce ołówkowate, utrata masy ciała; w TK obecny naciekający guz ściany jelita.", test: "TK jamy brzusznej z kontrastem, sigmoidoskopia z biopsją." },
      { disease: "Zatkanie masami kałowymi (faecaloma)", diff: "Masy kałowe wypełniają bańkę odbytnicy (wyczuwalne w badaniu per rectum); brak pojedynczej olbrzymiej pętli 'ziarna kawy' w RTG.", test: "Badanie per rectum (twarde masy w bańce odbytnicy)." }
    ],
    lekQuestions: [
      {
        question: "U 76-letniego pacjenta z chorobą Parkinsona i przewlekłymi zaparciami wystąpiło masywne, asymetryczne wzdęcie brzucha oraz zatrzymanie gazów i stolca. W przeglądowym RTG jamy brzusznej uwidoczniono potężnie rozdętą, gładkościenną pętlę jelita grubego wychodzącą z miednicy i sięgającą pod prawą kopułę przepony, dającą obraz 'ziarna kawy' (coffee bean sign). Najbardziej prawdopodobnym rozpoznaniem jest:",
        options: [
          "Skręt esicy (Volvulus sigmoidei).",
          "Ostre zapalenie wyrostka robaczkowego.",
          "Wrzód dwunastnicy z perforacją.",
          "Skręt żołądka z martwicą śledziony.",
          "Ostre niedokrwienie krezki."
        ],
        correct: 0,
        explanation: "Obraz olbrzymiej, gładkościennej, rozdętej pętli jelitowej w kształcie 'ziarna kawy' (coffee bean sign) lub 'odwróconej litery U', której ramiona schodzą się w miednicy mniejszej, u starszego pacjenta z przewlekłymi zaparciami i chorobą neurologiczną jest patognomoniczny dla skrętu esicy (volvulus sigmoidei)."
      },
      {
        question: "U stabilnego hemodynamicznie pacjenta ze skrętem esicy, bez objawów otrzewnowych i bez cech martwicy ściany jelita w badaniach laboratoryjnych, postępowaniem pierwszego rzutu jest:",
        options: [
          "Próba zachowawczej derotacji i dekompresji endoskopowej za pomocą sigmoidoskopu.",
          "Natychmiastowa operacja sposobem Hartmanna w trybie ostrym.",
          "Dożylne podanie neostygminy w bolusie.",
          "Wykonanie pilnej ileostomii pętlowej.",
          "Zastosowanie leków przeczyszczających doustnie."
        ],
        correct: 0,
        explanation: "Zgodnie z międzynarodowymi standardami chirurgicznymi (ASCRS/WSES), u pacjentów ze skrętem esicy bez cech zapalenia otrzewnej, zgorzeli ściany jelita czy perforacji, postępowaniem pierwszego rzutu jest próba nieoperacyjnej dekompresji i derotacji endoskopowej (za pomocą sigmoidoskopii z wprowadzeniem rurki doodbytniczej). Pozwala to na odbarczenie pętli u >70–80% chorych."
      },
      {
        question: "Wskaż zabieg operacyjny z wyboru u pacjenta ze skrętem esicy powikłanym martwicą (zgorzelą) ściany jelita i zapaleniem otrzewnej:",
        options: [
          "Operacja sposobem Hartmanna (resekcja esicy, zamknięcie kikuta odbytnicy i wyłonienie kolostomii końcowej).",
          "Proste przyszycie esicy do powłok bez jej wycinania (sigmoidopeksja).",
          "Podanie doodbytnicze wlewu z barytu.",
          "Założenie stentu samorozprężalnego do martwego jelita.",
          "Przeszczepienie mikrobioty jelitowej."
        ],
        correct: 0,
        explanation: "W przypadku stwierdzenia martwicy jelita, perforacji lub rozlanego zapalenia otrzewnej, zabiegiem z wyboru jest natychmiastowa operacja sposobem Hartmanna (resekcja martwiczej pętli esicy, pozostawienie zamkniętego na głucho kikuta odbytnicy w miednicy i wyłonienie kolostomii jednolufowej na lewym dole biodrowym). Pierwotne zespolenie w warunkach kałowego zapalenia otrzewnej jest obarczone skrajnym ryzykiem nieszczelności i zgonu."
      }
    ],
    flashcards: [
      { q: "Jaki jest patognomoniczny objaw radiologiczny skrętu esicy w RTG?", a: "Objaw 'ziarna kawy' (coffee bean sign) lub 'odwróconej litery U' wychodzący z miednicy.", cat: "Chirurgia" },
      { q: "U jakich chorych najczęściej występuje skręt esicy?", a: "U osób starszych, leżących, z chorobami neurologicznymi (Parkinson, otępienie) i przewlekłymi zaparciami.", cat: "Chirurgia" },
      { q: "Jakie jest postępowanie pierwszego rzutu w niepowikłanym skręcie esicy bez martwicy?", a: "Nieoperacyjna derotacja i odbarczenie endoskopowe za pomocą sigmoidoskopu.", cat: "Chirurgia" },
      { q: "Jaki zabieg wykonuje się w skręcie esicy powikłanym martwicą ściany jelita?", a: "Operację sposobem Hartmanna (resekcja esicy z wyłonieniem kolostomii końcowej).", cat: "Chirurgia" },
      { q: "Dlaczego po samej derotacji endoskopowej zaleca się planową operację?", a: "Ponieważ bez operacji odsetek nawrotów skrętu esicy wynosi aż 50–80%.", cat: "Chirurgia" }
    ]
  },

  // 132: Uwięźnięta przepuklina pachwinowa ze zgorzelą
  {
    id: 132,
    filename: "132_uwieznieta_przepuklina_pachwinowa.json",
    dept: "Chirurgia",
    shortTitle: "62-letni mężczyzna – Twardy, bolesny guz w pachwinie, wymioty i zatrzymanie gazów (Uwięźnięta przepuklina)",
    diagnosisTitle: "Uwięźnięta i zadzierzgnięta przepuklina pachwinowa prawostronna (Hernia inguinalis incarcerata et strangulata) ze zgorzelą jelita",
    vitals: [
      { label: "HR", val: "112/min", sub: "Tachykardia bólowa/zapalna", status: "warn" },
      { label: "BP", val: "138/82 mmHg", sub: "Prawidłowe", status: "ok" },
      { label: "SpO2", val: "98%", sub: "Prawidłowa", status: "ok" },
      { label: "RR", val: "20/min", sub: "Prawidłowa", status: "ok" },
      { label: "Temp", val: "38.1°C", sub: "Stan podgorączkowy/gorączka", status: "warn" }
    ],
    vitalsObj: { hr: 112, bp: "138/82", spo2: 98, rr: 20, temp: 38.1 },
    story: "62-letni mężczyzna zgłosił się na SOR z powodu nagłego, bardzo silnego bólu w prawej pachwinie trwającego od 7 godzin oraz pojawienia się twardego, bolesnego guza. Pacjent od kilku lat wiedział o obecności 'przepukliny', którą dotychczas bez problemu sam odprowadzał do brzucha w pozycji leżącej. Dziś rano podczas dźwigania ciężaru przepuklina 'wyskoczyła' i nie dała się odprowadzić. Od 3 godzin dołączyły silne nudności, dwukrotne wymioty treścią żołądkowo-jelitową oraz brak oddawania gazów i stolca. W badaniu fizykalnym: w prawej okolicy pachwinowej widoczny i wyczuwalny napięty, skrajnie bolesny, twardy guz o wymiarach 8 x 5 cm, schodzący w kierunku worka mosznowego. Skóra nad guzem jest ucieplona, zaczerwieniona i lekko obrzęknięta. Brak objawu kaszlowego (brak przenoszenia fali kaszlowej na guza). Guz całkowicie nieodprowadzalny do jamy brzusznej. Brzuch wzdęty, z widocznym stawianiem się pętli jelitowych w śródbrzuszu, perystaltyka metaliczna.",
    labs: [
      {
        category: "Wskaźniki zapalne i niedokrwienia",
        items: [
          { name: "Leukocyty (WBC)", val: "15.4 G/L z neutrofilią (80%)", norm: "4.0–10.0 G/L", flag: "H" },
          { name: "CRP", val: "42 mg/L", norm: "< 5.0 mg/L", flag: "H" },
          { name: "Mleczany we krwi", val: "2.8 mmol/L (podwyższone - podejrzenie niedokrwienia)", norm: "0.5–2.0 mmol/L", flag: "H" },
          { name: "Kreatynina / Mocznik", val: "1.10 / 38 mg/dL", norm: "0.70–1.20 / 15–40", flag: "N" }
        ]
      },
      {
        category: "Diagnostyka obrazowa (USG i RTG)",
        items: [
          { name: "USG okolicy pachwinowej prawej", val: "Worek przepuklinowy z uwięzioną pętlą jelita cienkiego o pogrubiałej ścianie (5.2 mm), zatarciem uwarstwienia ściany i brakiem przepływu naczyniowego w badaniu Power Doppler (cechy niedokrwienia); płyn w worku przepuklinowym", norm: "Prawidłowy kanał pachwinowy", flag: "H" },
          { name: "RTG przeglądowe jamy brzusznej na stojąco", val: "Pojedyncze poziomy płynów w pętlach jelita cienkiego w śródbrzuszu (początek niedrożności mechanicznej)", norm: "Brak poziomów płynów", flag: "H" }
        ]
      },
      {
        category: "Przygotowanie przedoperacyjne",
        items: [
          { name: "Grupa krwi i próba krzyżowa", val: "Grupa A RhD dodatni, przeciwciała odpornościowe ujemne", norm: "Prawidłowa", flag: "N" },
          { name: "Układ krzepnięcia (INR / APTT)", val: "1.05 / 29 s", norm: "0.9–1.2 / 26–36 s", flag: "N" }
        ]
      }
    ],
    steps: [
      {
        num: 1,
        title: "Kardynalny zakaz postępowania: ZAKAZ próby siłowego odprowadzania (taxis)",
        task: "Młodszy lekarz dyżurny zamierza podać lek przeciwbólowy i podjąć próbę siłowego odprowadzenia ręcznego (taxis) bolesnego, napiętego guza do brzucha. Dlaczego takie postępowanie jest KATEGORYCZNIE ZAKAZANE?",
        options: [
          { text: "BEZWZGLĘDNY ZAKAZ siłowego odprowadzania (taxis)! Istnieje skrajne ryzyko odprowadzenia martwiczej, zgorzelinowej pętli jelita do wolnej jamy otrzewnej (tzw. rzekome odprowadzenie / taxis en masse) lub pęknięcia jelita, co prowadzi do kałowego zapalenia otrzewnej i wstrząsu septycznego!", correct: true, feedback: "Kluczowa zasada chirurgiczna na LEK! Jeśli przepuklina jest uwięźnięta od kilku godzin, bolesna, napięta, a skóra nad nią zaczerwieniona (zadzierzgnięcie), odprowadzanie ręczne jest BEZWZGLĘDNIE ZAKAZANE. Siłowe wpychanie grozi: 1. Pęknięciem martwego jelita pod palcami, 2. Odprowadzeniem martwicy do otrzewnej (taxis en masse), 3. Odprowadzeniem worka ze zaciśniętym pierścieniem. Jedynym postępowaniem jest PILNA OPERACJA!" },
          { text: "Ponieważ odprowadzenie jest dozwolone tylko przez ordynatora", correct: false, feedback: "Zabieg jest przeciwwskazany ze względów bezpieczeństwa życia pacjenta, a nie stopnia zawodowego." },
          { text: "Należy najpierw podać 3 litry oleju parafinowego", correct: false, feedback: "Karygodny błąd – pacjent wymiotuje i ma niedrożność!" },
          { text: "Siłowe odprowadzanie jest zawsze zabiegiem z wyboru", correct: false, feedback: "Kardynalny błąd mogący doprowadzić do zgonu chorego!" }
        ]
      },
      {
        num: 2,
        title: "Różnica między uwięźnięciem (incarceratio) a zadzierzgnięciem (strangulatio)",
        task: "Jaka jest różnica patofizjologiczna między uwięźnięciem a zadzierzgnięciem przepukliny?",
        options: [
          { text: "Uwięźnięcie oznacza niemożność odprowadzenia zawartości worka do jamy brzusznej, natomiast zadzierzgnięcie to uwięźnięcie z jednoczesnym uciskiem naczyń krezkowych, prowadzącym do niedokrwienia i zgorzeli jelita", correct: true, feedback: "Prawidłowo! Uwięźnięcie (incarceratio) to zablokowanie mechaniczne pasażu i brak odprowadzalności. Zadzierzgnięcie (strangulatio) to stan niedokrwienny – zaciśnięcie naczyń krezkowych we wrotach przepukliny, skutkujące martwicą (gangrena) ściany jelita w ciągu kilku godzin." },
          { text: "Uwięźnięcie dotyczy tylko żołądka, a zadzierzgnięcie jelita grubego", correct: false, feedback: "Błąd – dotyczy każdej przepukliny." },
          { text: "Zadzierzgnięcie jest łagodniejszą postacią uwięźnięcia", correct: false, feedback: "Przeciwnie – zadzierzgnięcie to bezpośrednie zagrożenie martwicą i sepsą." },
          { text: "Nie ma żadnej różnicy", correct: false, feedback: "To dwa różne stadia zaawansowania niedokrwienia." }
        ]
      },
      {
        num: 3,
        title: "Przepuklina Richtera i przepuklina Littrégo",
        task: "Czym jest tzw. przepuklina Richtera (Richter's hernia)?",
        options: [
          { text: "Uwięźnięciem jedynie fragmentu ściany jelita (przeciwległego do brzegu krezkowego), co może prowadzić do martwicy i perforacji bez objawów pełnej mechanicznej niedrożności przewodu pokarmowego", correct: true, feedback: "Dokładnie tak! Przepuklina Richtera to uwięźnięcie przyścienne (parietal incarceration). Światło jelita pozostaje częściowo drożne (chory może nadal oddawać gazy i stolec!), co usypia czujność lekarza, podczas gdy uwięźnięty fragment ściany ulega martwicy i przedziurawieniu!" },
          { text: "Uwięźnięciem uchyłka Meckela w worku przepuklinowym", correct: false, feedback: "To definicja przepukliny Littrégo (Littre's hernia)!" },
          { text: "Uwięźnięciem wyrostka robaczkowego w worku przepukliny pachwinowej", correct: false, feedback: "To przepuklina Amyanda (Amyand's hernia)!" },
          { text: "Przepukliną rozworu przełykowego", correct: false, feedback: "To inna wada anatomiczna." }
        ]
      },
      {
        num: 4,
        title: "Przepuklina Maydla (przepuklina w kształcie litery W)",
        task: "Na czym polega niebezpieczeństwo w tzw. przepuklinie Maydla (hernia 'en W')?",
        options: [
          { text: "W worku przepuklinowym znajdują się dwie pętle jelitowe, a pętla pośrednia leży wewnątrz jamy brzusznej – to właśnie ta wewnętrzna pętla ulega niedokrwieniu i martwicy (zadzierzgnięcie wsteczne / retrograde strangulation)", correct: true, feedback: "Znakomicie! W przepuklinie Maydla (w kształcie litery W) pętle widoczne w worku mogą wyglądać na różowe i żywe, podczas gdy pętla łącząca je w jamie brzusznej jest czarna i martwicza. Chirurg ma bezwzględny obowiązek wyciągnąć i ocenić pętlę pośrednią przed odprowadzeniem!" },
          { text: "Zawiera wyłącznie jajnik i jajowód", correct: false, feedback: "Brak związku." },
          { text: "Przepuklina ta występuje tylko u niemowląt", correct: false, feedback: "Występuje u dorosłych." },
          { text: "Nigdy nie wymaga operacji", correct: false, feedback: "Wymaga pilnej operacji ze względu na ryzyko przeoczenia martwicy." }
        ]
      },
      {
        num: 5,
        title: "Krok operacyjny: otwarcie worka przepuklinowego przed przecięciem pierścienia",
        task: "Dlaczego podczas operacji uwięźniętej przepukliny chirurg MUSI otworzyć worek przepuklinowy i chwycić pętlę jelita PRZED nacięciem zaciśniętego pierścienia wrót przepukliny?",
        options: [
          { text: "Aby zapobiec samoistnemu, niekontrolowanemu cofnięciu się potencjalnie martwiczej pętli jelita do wnętrza jamy brzusznej po zwolnieniu ucisku pierścienia", correct: true, feedback: "Kluczowa zasada techniki operacyjnej! Przecięcie pierścienia przed otwarciem worka i zabezpieczeniem pętli spowoduje, że niedokrwione, zgorzelinowe jelito natychmiast 'ucieknie' do brzucha, zmuszając chirurga do wykonania rozległej laparotomii w celu jego odszukania i resekcji!" },
          { text: "Aby wypuścić powietrze z pętli", correct: false, feedback: "Nie to jest powodem zasady chirurgicznej." },
          { text: "Aby pobrać wycinki do badania cytologicznego", correct: false, feedback: "Brak wskazań." },
          { text: "Jest to wymagane przez przepisy sanitarno-epidemiologiczne", correct: false, feedback: "To kwestia techniki i bezpieczeństwa chorego." }
        ]
      },
      {
        num: 6,
        title: "Kwalifikacja do resekcji jelita cienkiego",
        task: "Po otwarciu worka pętla jelitowa po 15 minutach obkładania ciepłą solą fizjologiczną pozostaje czarna, matowa, bez perystaltyki i bez tętna w naczyniach krezki. Jakie jest postępowanie?",
        options: [
          { text: "Wycięcie (resekcja) martwiczego odcinka jelita cienkiego z marginesem zdrowych tkanek i wykonanie zespolenia jelitowo-jelitowego (koniec do końca lub bok do boku)", correct: true, feedback: "Prawidłowo! Martwe jelito (gangraena) nie ma zdolności regeneracji i pozostawione doprowadzi do perforacji i sepsy. Wskazana jest anatomiczna resekcja odcinka martwiczego w granicach tkanek dobrze ukrwionych i wykonanie pierwotnego zespolenia." },
          { text: "Odprowadzenie martwego jelita do brzucha i zaszycie skóry", correct: false, feedback: "Śmiertelny błąd kardynalny!" },
          { text: "Przekłucie pętli igłą i podanie witaminy C", correct: false, feedback: "Bzdura medyczna." },
          { text: "Założenie gipsu na pachwinę", correct: false, feedback: "Nonsens." }
        ]
      },
      {
        num: 7,
        title: "Stosowanie siatek syntetycznych w zakażonym polu operacyjnym",
        task: "Czy w przypadku konieczności resekcji martwiczego jelita z powodu zgorzeli w uwięźniętej przepuklinie zaleca się rutynowe wszycie klasycznej siatki polipropylenowej?",
        options: [
          { text: "Stosowanie niewchłanialnych siatek syntetycznych w polu skażonym/zakażonym niesie wysokie ryzyko zakażenia implantu – preferuje się plastykę tkankową (np. sposobem Shouldice'a) lub nowoczesne siatki biologiczne/makroporowate monofilamentowe przy ścisłych wskazaniach", correct: true, feedback: "Znakomicie! W polu 'czystym skażonym' lub 'skażonym' (resekcja jelita, martwica) wszycie klasycznej siatki polipropylenowej grozi ciężkim ropieniem i koniecznością jej usunięcia. Tradycyjnie metodą z wyboru w takich sytuacjach jest plastyka z użyciem tkanek własnych (metoda Shouldice'a lub Bassiniego)." },
          { text: "Tak – należy wszyć 3 siatki jedna na drugą", correct: false, feedback: "Zwiększa ryzyko zakażenia i przetok." },
          { text: "Siatkę wszywa się zawsze bez względu na zanieczyszczenie kałem", correct: false, feedback: "Niezgodne z zasadami aseptyki chirurgicznej." },
          { text: "W uwięźniętej przepuklinie nigdy nie zaszywa się powłok", correct: false, feedback: "Powłoki muszą zostać zrekonstruowane." }
        ]
      },
      {
        num: 8,
        title: "Przepuklina pachwinowa skośna vs prosta",
        task: "Czym różni się anatomicznie przepuklina pachwinowa skośna (boczna) od prostej (przyśrodkowej)?",
        options: [
          { text: "Przepuklina skośna wnika przez pierścień pachwinowy głęboki bocznie od naczyń nabrzusznych dolnych i może schodzić do moszny (częściej ulega uwięźnięciu), a prosta uwypukla się w trójkącie Hesselbacha przyśrodkowo od naczyń nabrzusznych", correct: true, feedback: "Bardzo dobrze! Przepuklina skośna (lateralna) przechodzi przez cały kanał pachwinowy bocznie od naczyń nabrzusznych dolnych, często ma wąski pierścień i schodzi do moszny, dlatego znacznie częściej ulega uwięźnięciu. Przepuklina prosta (medialna) to wada nabytej powięzi poprzecznej w trójkącie Hesselbacha, ma szerokie wrota i rzadko ulega zadzierzgnięciu." },
          { text: "Przepuklina prosta występuje wyłącznie u kobiet w ciąży", correct: false, feedback: "Błąd – występuje głównie u starszych mężczyzn z osłabieniem powłok." },
          { text: "Przepuklina skośna nigdy nie zawiera jelita", correct: false, feedback: "Zawiera jelito cienkie, sieć, a czasem wyrostek robaczkowy." },
          { text: "Nie ma żadnej różnicy anatomicznej", correct: false, feedback: "Stosunek do naczyń nabrzusznych dolnych jest kluczowym kryterium anatomicznym." }
        ]
      }
    ],
    pathoNodes: [
      {
        title: "1. Uwięźnięcie pętli jelitowej w wąskich wrotach przepukliny",
        desc: "Gwałtowny wzrost ciśnienia w jamie brzusznej (kaszel, wysiłek) wpycha pętlę jelita przez pierścień pachwinowy głęboki. Wąskie wrota zaciskają się wokół pętli, uniemożliwiając jej powrót.",
        drugTarget: "BEZWZGLĘDNY ZAKAZ odprowadzania siłowego (ryzyko pęknięcia jelita i taxis en masse)"
      },
      {
        title: "2. Zaciśnięcie naczyń krezkowych (zadzierzgnięcie)",
        desc: "Obrzęk ściany najpierw blokuje odpływ żylny i chłonny, a następnie perfuzję tętniczą. Dochodzi do niedokrwienia, przekrwienia biernego i zawału krwotocznego ściany pętli.",
        drugTarget: "Pilna operacja w trybie ostrym – herniotomia z przecięciem pierścienia uwięźniającego"
      },
      {
        title: "3. Martwica zgorzelinowa i perforacja",
        desc: "Niedotlenione komórki ulegają martwicy. Flora bakteryjna wnika do ściany i płynu worka przepuklinowego, wywołując ropowicę worka i sepsę.",
        drugTarget: "Resekcja martwiczej pętli jelita z zespoleniem oraz plastyka powłok (np. Shouldice)"
      }
    ],
    dutySummary: "Uwięźnięta i zadzierzgnięta przepuklina pachwinowa to stan ostrego niedokrwienia pętli jelitowej. PAMIĘTAJ: SIŁOWE ODPROWADZANIE (TAXIS) JEST BEZWZGLĘDNIE ZAKAZANE (ryzyko taxis en masse i pęknięcia jelita!). Wskazana jest natychmiastowa operacja w trybie ostrym. Podczas operacji worek otwiera się przed rozcięciem pierścienia wrót. Martwe jelito (brak perystaltyki, czarny kolor po ciepłej soli) wymaga resekcji i plastyki tkankowej (Shouldice).",
    diffTable: [
      { disease: "Zapalenie jądra i najądrza (orchiepididymitis)", diff: "Bolesny obrzęk moszny, ale kanał pachwinowy jest wolny, brak objawów niedrożności przewodu pokarmowego, dodatni objaw Prehna (uniesienie jądra łagodzi ból).", test: "USG moszny i kanałów pachwinowych z opcją Doppler." },
      { disease: "Skręt jądra (torsio testis)", diff: "Nagły silny ból jądra u młodego chłopca, jądro uniesione poziomo, brak przepływu w badaniu Doppler, kanał pachwinowy pusty.", test: "USG Doppler naczyń powrózka nasiennego CITO." },
      { disease: "Wodniak jądra (hydrocele)", diff: "Bezbolesne, miękkie powiększenie moszny, dodatnia próba transiluminacji (przeświecanie latarką), brak objawów uwięźnięcia.", test: "Diafanoskopia (transiluminacja), USG moszny." },
      { disease: "Ostre zapalenie węzłów chłonnych pachwinowych", diff: "Mnogie, bolesne węzły pod więzadłem pachwinowym, często wrota zakażenia na kończynie dolnej (np. róża), brak pętli jelitowej w USG.", test: "USG tkanek miękkich pachwiny." }
    ],
    lekQuestions: [
      {
        question: "U 65-letniego mężczyzny w prawej pachwinie pojawił się bolesny, napięty guz schodzący do moszny, nieodprowadzalny od 6 godzin, z towarzyszącymi wymiotami i brakiem oddawania gazów. Wskaż BEZWZGLĘDNIE PRZECIWWSKAZANE postępowanie:",
        options: [
          "Podjęcie próby siłowego ręcznego odprowadzenia przepukliny (taxis) do jamy brzusznej.",
          "Zabezpieczenie dostępu dożylnego i wdrożenie nawadniania krystaloidami.",
          "Pilna kwalifikacja chorego do zabiegu operacyjnego w trybie ostrym.",
          "Założenie zgłębnika nosowo-żołądkowego w celu dekompresji przewodu pokarmowego.",
          "Wykonanie ultrasonografii okolicy pachwinowej w celu oceny ukrwienia pętli jelitowej."
        ],
        correct: 0,
        explanation: "W przypadku uwięźniętej i zadzierzgniętej przepukliny trwającej od kilku godzin podjęcie próby siłowego odprowadzania ręcznego (taxis) jest BEZWZGLĘDNIE PRZECIWWSKAZANE. Grozi to przerwaniem niedokrwionej, kruchej ściany jelita pod wpływem ucisku lub odprowadzeniem martwiczej pętli jelitowej wraz ze zaciśniętym pierścieniem do wnętrza jamy brzusznej (tzw. rzekome odprowadzenie / taxis en masse), co prowadzi do zapalenia otrzewnej, wstrząsu septycznego i zgonu. Jedynym prawidłowym postępowaniem jest pilna operacja."
      },
      {
        question: "Czym jest tzw. przepuklina Richtera (Richter's hernia)?",
        options: [
          "Przepukliną, w której dochodzi do uwięźnięcia jedynie fragmentu ściany jelita (uwięźnięcie przyścienne), co może prowadzić do martwicy bez objawów pełnej mechanicznej niedrożności przewodu pokarmowego.",
          "Przepukliną zawierającą uchyłek Meckela w worku przepuklinowym.",
          "Przepukliną pachwinową zawierającą wyrostek robaczkowy.",
          "Wrodzoną przepukliną przeponową lewostronną (Bochdaleka).",
          "Przepukliną w linii białej powyżej pępka."
        ],
        correct: 0,
        explanation: "Przepuklina Richtera to uwięźnięcie przyścienne – w wąskich wrotach przepukliny więźnie jedynie fragment obwodu ściany jelita (przeciwległy do brzegu krezkowego). Ponieważ światło jelita pozostaje częściowo zachowane, pacjent może nie prezentować pełnych objawów niedrożności (brak wzdęcia, zachowane oddawanie gazów), co opóźnia rozpoznanie martwicy i perforacji."
      },
      {
        question: "Dlaczego podczas operacji uwięźniętej przepukliny pachwinowej chirurg otwiera worek przepuklinowy PRZED nacięciem pierścienia uwięźniającego?",
        options: [
          "W celu uchwycenia i zabezpieczenia uwięźniętej pętli jelita przed jej niekontrolowanym cofnięciem się do jamy brzusznej przed oceną jej żywotności.",
          "Aby pobrać wymaz na posiew przed podaniem znieczulenia.",
          "Jest to wymóg konieczny do zbadania obecności wyrostka robaczkowego.",
          "W celu podania do światła jelita roztworu antybiotyku.",
          "Aby przepuklina mogła samoistnie się powiększyć."
        ],
        correct: 0,
        explanation: "Jeżeli chirurg najpierw przetnie pierścień uwięźniający (wrota), zwolnienie ucisku może spowodować natychmiastowe, odruchowe cofnięcie się niedokrwionej lub martwiczej pętli jelitowej do wolnej jamy otrzewnej. Aby temu zapobiec, najpierw otwiera się worek, chwyta uwięziony narząd, a dopiero po jego zabezpieczeniu przecina pierścień i ocenia żywotność jelita."
      }
    ],
    flashcards: [
      { q: "Dlaczego siłowe odprowadzanie uwięźniętej przepukliny (taxis) jest zakazane?", a: "Grozi pęknięciem jelita lub odprowadzeniem martwicy do otrzewnej (taxis en masse) i kałowym zapaleniem otrzewnej.", cat: "Chirurgia" },
      { q: "Czym różni się uwięźnięcie od zadzierzgnięcia przepukliny?", a: "Uwięźnięcie to brak odprowadzalności i zablokowanie pasażu; zadzierzgnięcie to ucisk naczyń krezkowych grożący martwicą.", cat: "Chirurgia" },
      { q: "Czym jest przepuklina Richtera?", a: "Uwięźnięciem jedynie fragmentu ściany jelita (przyściennym), bez pełnej niedrożności mechanicznej, grożącym cichą martwicą.", cat: "Chirurgia" },
      { q: "Czym jest przepuklina Littrégo i przepuklina Amyanda?", a: "Littrégo: worek zawiera uchyłek Meckela; Amyanda: worek zawiera wyrostek robaczkowy.", cat: "Chirurgia" },
      { q: "Dlaczego w zakażonym polu po resekcji jelita unika się klasycznych siatek syntetycznych?", a: "Z powodu wysokiego ryzyka zakażenia ciała obcego (siatki); preferuje się plastykę tkankową (Shouldice).", cat: "Chirurgia" }
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
  console.log('Batch 128-132 finished successfully.');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});

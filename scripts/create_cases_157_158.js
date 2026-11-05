const fs = require('fs');
const path = require('path');
const { encryptStringAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

const casesData = [
  // =========================================================================
  // CASE 157: Zapalenie Narządów Miednicy Mniejszej (PID) i Fitz-Hugh-Curtis
  // =========================================================================
  {
    id: 157,
    file: "157_zapalenie_miednicy_pid.json",
    shortTitle: "Zapalenie Narządów Miednicy (PID)",
    title: "Ostre Zapalenie Narządów Miednicy Mniejszej (PID) z Zespołem Fitz-Hugh-Curtisa",
    dept: "Ginekologia i Położnictwo",
    diagnosisTitle: "Ostre Zapalenie Narządów Miednicy Mniejszej (PID) powikłane Zapaleniem Torebki Wątroby (Zespół Fitz-Hugh-Curtisa)",
    vitals: [
      { label: "Ciśnienie tętnicze (RR)", val: "118/75", unit: "mmHg", status: "vital-ok" },
      { label: "Częstość akcji serca (HR)", val: "102", unit: "/min", status: "vital-warn" },
      { label: "Częstość oddechów (RR)", val: "18", unit: "/min", status: "vital-ok" },
      { label: "Saturacja (SpO2)", val: "98", unit: "%", status: "vital-ok" },
      { label: "Temperatura ciała", val: "38.8", unit: "°C", status: "vital-crit" }
    ],
    story: "<p><strong>Pacjent:</strong> 25-letnia kobieta zgłasza się na Izbę Przyjęć Ginekologiczną z powodu silnego, obustronnego bólu w podbrzuszu oraz wysokiej gorączki.</p><p><strong>Wywiad chorobowy:</strong> Dolegliwości rozpoczęły się 4 dni temu po zakończeniu krwawienia miesiączkowego. Ból początkowo tępy, obecnie ostry, nasila się podczas chodzenia i wstrząsów. Od wczoraj pacjentka odczuwa kłujący ból w prawym podżebrzu, który wyraźnie nasila się przy głębokim wdechu i kaszlu. Obserwuje obfite, żółtozielone upławy o nieprzyjemnym zapachu. W wywiadzie: nowy partner seksualny od 2 miesięcy, stosuje wewnątrzmaciczną wkładkę antykoncepcyjną (IUD) założoną 8 miesięcy temu.</p><p><strong>Badanie przedmiotowe:</strong> Pacjentka gorączkująca (38,8°C). W badaniu brzucha: bolesność palpacyjna podbrzusza z zaznaczoną obroną mięśniową oraz tkliwość w prawym podżebrzu przy ucisku pod łukiem żebrowym (objaw Murphy'ego dodatni). W badaniu ginekologicznym we wziernikach: szyjka macicy obrzęknięta, rozpulchniona, z ujścia sączy się obfita ropna wydzielina. W badaniu dwuręcznym: skrajna bolesność przy poruszaniu szyjką macicy ('objaw lalki') oraz obustronnie bolesne, pogrubiałe przydatki.</p>",
    steps: [
      {
        title: "Krok 1: Rozpoznanie kliniczne według kryteriów CDC",
        scenario: "Pacjentka prezentuje klasyczny obraz zapalenia narządów miednicy mniejszej (PID). Jaki zestaw kryteriów klinicznych wg CDC uzasadnia natychmiastowe wdrożenie empirycznej antybiotykoterapii bez oczekiwania na wyniki badań mikrobiologicznych?",
        options: [
          {
            text: "Stwierdzenie co najmniej jednego kryterium minimalnego (bolesność palpacyjna macicy, przydatków lub bolesność szyjki przy poruszaniu) u młodej aktywnej seksualnie kobiety",
            correct: true,
            isCorrect: true,
            feedback: "✅ PRAWIDŁOWO! Zgodnie z wytycznymi CDC i PTGiP, ze względu na ryzyko nieodwracalnych powikłań (niepłodność jajowodowa, ciąża pozamaciczna), próg wdrożenia leczenia PID jest celowo niski. Wystarczy stwierdzenie bólu w podbrzuszu oraz bolesności narządów miednicy w badaniu ginekologicznym u kobiety z grupy ryzyka, aby natychmiast rozpocząć antybiotykoterapię."
          },
          {
            text: "Konieczność wcześniejszego uzyskania dodatniego wyniku hodowli bakteryjnej krwi i płynu otrzewnowego po 72 godzinach",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Oczekiwanie na wyniki posiewów opóźnia leczenie i drastycznie zwiększa ryzyko zniszczenia jajowodów i niepłodności."
          },
          {
            text: "Wymóg potwierdzenia obecności ropnia jajowodowo-jajnikowego o średnicy co najmniej 8 cm w tomografii komputerowej",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Ropień TOA jest powikłaniem PID, a nie kryterium wymaganym do rozpoznania zapalenia."
          },
          {
            text: "Stwierdzenie izolowanego wzrostu stężenia amylazy w surowicy powyżej trzykrotności normy",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Amylaza to enzym trzustkowy niemający związku z kryteriami CDC dla PID."
          }
        ]
      },
      {
        title: "Krok 2: Badania diagnostyczne i ocena powikłań (zespół Fitz-Hugh-Curtisa)",
        scenario: "Pacjentka zgłasza silny ból opłucnowy w prawym podżebrzu, a w badaniu stwierdza się tkliwość pod wątrobą. Wykonano test ciążowy (ujemny). Jakie badania mikrobiologiczne i obrazowe należy zlecić natychmiast?",
        options: [
          {
            text: "Wymaz z kanału szyjki na badanie molekularne NAAT (PCR) w kierunku N. gonorrhoeae i C. trachomatis oraz USG przezpochwowe w celu wykluczenia ropnia TOA",
            correct: true,
            isCorrect: true,
            feedback: "✅ PRAWIDŁOWO! Testy amplifikacji kwasów nukleinowych (NAAT) są złotym standardem detekcji Chlamydia trachomatis i Neisseria gonorrhoeae. USG przezpochwowe (TVS) jest niezbędne do wykluczenia ropnia jajowodowo-jajnikowego (TOA). Ból w prawym podżebrzu odpowiada zespołowi Fitz-Hugh-Curtisa (perihepatitis) – zapaleniu torebki wątroby z tworzeniem zrostów 'strun skrzypcowych'."
          },
          {
            text: "Wykonanie kolonoskopii z biopsją śluzówki kątnicy w poszukiwaniu amebozy jelitowej",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Kolonoskopia w ostrym stanie zapalnym miednicy stwarza ryzyko perforacji jelita."
          },
          {
            text: "Scynygrafię wątroby ze znakowanymi krwinkami czerwonymi w celu wykluczenia naczyniaka",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Ból w prawym podżebrzu w PID wynika z odczynu torebki wątroby, a nie naczyniaka."
          },
          {
            text: "Pobranie wymazu z jamy nosowo-gardłowej w kierunku wirusa grypy A i B",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Wymaz z nosogardła nie ma znaczenia w zapaleniu narządów miednicy mniejszej."
          }
        ]
      },
      {
        title: "Krok 3: Empiryczna farmakoterapia przeciwbakteryjna",
        scenario: "W USG nie stwierdzono uformowanego ropnia, widoczne są obrzęknięte, pogrubiałe jajowody z płynem w świetle (hydrosalpinx/pyosalpinx). Pacjentka ma nudności, gorączkę 38,8°C i leukocytozę 16,5 G/l. Jaki schemat parenteralnej antybiotykoterapii empirycznej wg wytycznych CDC/PTGiP należy wdrożyć?",
        options: [
          {
            text: "Ceftriakson 1,0 g i.v. raz na dobę + Doksycyklina 100 mg i.v./p.o. co 12 godzin + Metronidazol 500 mg i.v./p.o. co 12 godzin przez 14 dni",
            correct: true,
            isCorrect: true,
            feedback: "✅ PRAWIDŁOWO! Standard leczenia szpitalnego PID wymaga pokrycia N. gonorrhoeae (ceftriakson), C. trachomatis i Mycoplasma genitalium (doksycyklina) oraz flory beztlenowej (metronidazol). Leczenie prowadzi się łącznie przez 14 dni."
          },
          {
            text: "Monoterapia ampicyliną doustnie w dawce 500 mg raz na dobę przez 3 dni",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Monoterapia ampicyliną nie pokrywa gonokoków produkujących beta-laktamazy, Chlamydii ani Mycoplasma."
          },
          {
            text: "Wankomycyna dożylnie w monoterapii w stałej dawce 2 g na dobę bez innych leków",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Wankomycyna działa wyłącznie na bakterie Gram-dodatnie i nie ma aktywności przeciw patogenom PID."
          },
          {
            text: "Podanie dożylne acyklowiru w dawce 10 mg/kg co 8 godzin pod osłoną flukonazolu",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! PID to infekcja bakteryjna, leki przeciwwirusowe są całkowicie nieskuteczne."
          }
        ]
      },
      {
        title: "Krok 4: Postępowanie z wkładką IUD i partnerem seksualnym",
        scenario: "Pacjentka ma założoną wkładkę wewnątrzmaciczną (IUD). Pyta o konieczność jej natychmiastowego usunięcia oraz o to, co powinien zrobić jej partner. Jakie są aktualne zalecenia medyczne?",
        options: [
          {
            text: "Nie ma bezwzględnej konieczności natychmiastowego usunięcia IUD (rozważyć usunięcie po 48–72h przy braku poprawy pod osłoną antybiotyków); partnerzy seksualni z ostatnich 60 dni muszą zostać przebadani i leczeni empirycznie",
            correct: true,
            isCorrect: true,
            feedback: "✅ PRAWIDŁOWO! Aktualne wytyczne CDC i PTGiP wskazują, że natychmiastowe usunięcie IUD nie jest obligatoryjne i nie poprawia rokowania, jeśli wdrożono skuteczną antybiotykoterapię (usunięcie rozważa się, gdy po 48–72h brak poprawy). Bezwzględnym warunkiem wyleczenia i zapobiegania reinfekcji jest empiryczne leczenie partnerów z ostatnich 60 dni (ceftriakson + doksycyklina) oraz wstrzemięźliwość seksualna do zakończenia kuracji."
          },
          {
            text: "Natychmiastowe chirurgiczne wycięcie macicy z pozostawioną wkładką i zakaz informowania partnera ze względu na RODO",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Histerektomia jest absurdalna, a partner musi zostać zbadany i przeleczony."
          },
          {
            text: "Wymiana wkładki miedzianej na hormonalną w trakcie trwania ostrej gorączki na sali porodowej",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Zakładanie nowej wkładki w czynnym ostrym zakażeniu PID jest bezwzględnie zakazane."
          },
          {
            text: "Zalecenie partnerowi wykonania wyłącznie badania moczu paskowego bez konieczności przyjmowania antybiotyków",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Partnerzy często przechodzą zakażenie bezobjawowo i bez leczenia natychmiast ponownie zakażą pacjentkę."
          }
        ]
      }
    ],
    pathoNodes: [
      {
        title: "Wstępująca infekcja przez kanał szyjki macicy",
        desc: "Przełamanie bariery czopa śluzowego szyjki macicy (często podczas krwawienia miesiączkowego) umożliwia wstępowanie patogenów.",
        detail: "Patogeny przenoszone drogą płciową (Neisseria gonorrhoeae, Chlamydia trachomatis, Mycoplasma genitalium) ułatwiają wtórną inwazję endogennej flory pochwowej (bakterie beztlenowe, Gardnerella vaginalis, pałeczki jelitowe).",
        target: "Punkt uchwytu diagnostyki i leczenia: Badania molekularne NAAT i skojarzona antybiotykoterapia o szerokim spektrum (ceftriakson + doksycyklina + metronidazol)."
      },
      {
        title: "Destrukcja rzęsek jajowodu i ropień jajowodowo-jajnikowy (TOA)",
        desc: "Zapalenie błony śluzowej jajowodu (endosalpingitis) niszczy komórki urzęsione, prowadząc do zrostów i niedrożności ujść.",
        detail: "Zablokowanie ujścia brzusznego jajowodu prowadzi do gromadzenia ropy (pyosalpinx), a penetracja zakażenia do jajnika tworzy ropień jajowodowo-jajnikowy (Tubo-Ovarian Abscess - TOA). Niszczenie rzęsek skutkuje trwałą niepłodnością jajowodową (ryzyko rośnie z każdym epizodem PID: 10%, 20%, 50%).",
        target: "Punkt uchwytu leczenia: Wczesna antybiotykoterapia zapobiegająca destrukcji rzęsek; drenaż pod kontrolą USG/TK lub laparoskopia przy ropniu TOA."
      },
      {
        title: "Zespół Fitz-Hugh-Curtisa (perihepatitis zrostowa)",
        desc: "Wysięk ropny z ujścia brzusznego jajowodu przemieszcza się grawitacyjnie wzdłuż prawej rynny parakolicznej do przestrzeni podprzeponowej.",
        detail: "Dochodzi do zapalenia torebki wątroby (Glissona) bez zajęcia samego miąższu wątroby. W fazie przewlekłej tworzą się charakterystyczne zrosty pasmowate między torebką wątroby a przednią ścianą brzucha, przypominające 'struny skrzypcowe' (violin-string adhesions).",
        target: "Punkt uchwytu diagnostyki: Rozpoznanie bólu opłucnowego w PID; uwidocznienie zrostów w laparoskopii."
      }
    ],
    dutySummary: {
      overview: "Zapalenie narządów miednicy mniejszej (PID) to wstępujące zakażenie endometrium, jajowodów, jajników i otrzewnej miednicy, wywoływane głównie przez C. trachomatis, N. gonorrhoeae i bakterie beztlenowe. Może powikłać się zespołem Fitz-Hugh-Curtisa (perihepatitis) oraz ropniem jajowodowo-jajnikowym (TOA). Nieleczone prowadzi do niepłodności i ciąży pozamacicznej.",
      diagnostics: "1. Kryteria kliniczne minimalne CDC: bolesność macicy, przydatków lub szyjki macicy przy poruszaniu.\n\n2. Kryteria dodatkowe: gorączka >38,3°C, ropna wydzielina z szyjki, leukocytoza, wzrost CRP/OB.\n\n3. Badania molekularne NAAT (PCR) w kierunku C. trachomatis i N. gonorrhoeae z wymazu z kanału szyjki.\n\n4. Ultrasonografia przezpochwowa (TVS): ocena poszerzenia jajowodów (hydrosalpinx/pyosalpinx), płynu w miednicy i wykluczenie ropnia TOA.\n\n5. Test ciążowy (beta-hCG) u każdej pacjentki w wieku rozrodczym.",
      drugsAndDoses: "• Schemat ambulatoryjny: <span class=\"dose-pill\">Ceftriakson: 500–1000 mg i.m. jednorazowo</span> + <span class=\"dose-pill\">Doksycyklina: 100 mg p.o. 2x/d przez 14 dni</span> + <span class=\"dose-pill\">Metronidazol: 500 mg p.o. 2x/d przez 14 dni</span>.\n• Schemat szpitalny: <span class=\"dose-pill\">Ceftriakson: 1,0–2,0 g i.v. 1x/d</span> + <span class=\"dose-pill\">Doksycyklina: 100 mg i.v./p.o. 2x/d</span> + <span class=\"dose-pill\">Metronidazol: 500 mg i.v. 2x/d</span> (przejście na doustne po 24–48h poprawy klinicznej, łącznie 14 dni).\n• Leki przeciwgorączkowe i przeciwbólowe: <span class=\"dose-pill\">Ketoprofen: 100 mg i.v. lub Paracetamol 1000 mg i.v.</span>",
      procedures: "Hospitalizacja przy: ciąży, braku poprawy po 72h leczenia doustnego, podejrzeniu TOA, ciężkim stanie ogólnym/wymiotach; drenaż ropnia TOA lub laparoskopia; bezwzględne przebadanie i leczenie partnerów seksualnych.",
      monitoring: "Kontrola kliniczna po 48–72 godzinach od wdrożenia antybiotykoterapii (ocena ustępowania gorączki i bolesności palpacyjnej)."
    },
    diffTable: {
      title: "⚔️ Tabela Różnicowa: Zapalenie Miednicy Mniejszej (PID) vs Ostre Zapalenie Wyrostka vs Ciąża Pozamaciczna vs Endometrioza",
      headers: ["Cecha kliniczna", "PID / Fitz-Hugh-Curtis", "Zapalenie Wyrostka Robaczkowego", "Ciąża Pozamaciczna (GEU)", "Endometrioza"],
      rows: [
        ["Lokalizacja bólu", "Obustronny w podbrzuszu + prawe podżebrze", "Prawostronny dół biodrowy (McBurney)", "Jednostronny ostry dół biodrowy", "Przewlekły, cykliczny ból miednicy, dyspareunia"],
        ["Gorączka i upławy", "Wysoka gorączka (>38,3°C), ropne upławy", "Stan podgorączkowy, brak upławów", "Brak gorączki, plamienie z dróg rodnych", "Brak gorączki, brak ropnych upławów"],
        ["Test beta-hCG", "Ujemny", "Ujemny", "DODATNI", "Ujemny"],
        ["Badanie ginekologiczne", "Skrajna bolesność szyjki ('objaw lalki'), obustronna", "Tkliwość po prawej stronie, szyjka niebolesna", "Bolesny jednostronny opór, krzyk Douglasa", "Bolesne guzki w więzadłach krzyżowo-macicznych"],
        ["Objaw Fitz-Hugh-Curtisa", "Obecny (ból podżebrza prawego przy wdechu)", "Nie występuje", "Nie występuje", "Rzadko (endometrioza przepony)"],
        ["Leczenie z wyboru", "Antybiotykoterapia skojarzona 14 dni", "Laparoskopowa appendektomia", "Laparoskopia lub metotreksat", "Farmakoterapia hormonalna / laparoskopia"]
      ]
    },
    lekQuestions: [
      {
        q: "Czym charakteryzuje się zespół Fitz-Hugh-Curtisa będący powikłaniem zapalenia narządów miednicy mniejszej (PID)?",
        question: "Czym charakteryzuje się zespół Fitz-Hugh-Curtisa będący powikłaniem zapalenia narządów miednicy mniejszej (PID)?",
        opts: [
          "A) Zapaleniem torebki wątroby (perihepatitis) z powstawaniem zrostów 'strun skrzypcowych' między wątrobą a ścianą brzucha",
          "B) Piorunującą niewydolnością wątroby ze stłuszczeniem drobnokropelkowym hepatocytów",
          "C) Odkładaniem się złogów miedzi w rogówce oka w postaci pierścienia Kaysera-Fleischera",
          "D) Zwężeniem pnia tętnicy płucnej z przerostem prawej komory serca",
          "E) Aseptycznym zapaleniem wielostawowym z obustronnym zapaleniem spojówek"
        ],
        options: [
          "A) Zapaleniem torebki wątroby (perihepatitis) z powstawaniem zrostów 'strun skrzypcowych' między wątrobą a ścianą brzucha",
          "B) Piorunującą niewydolnością wątroby ze stłuszczeniem drobnokropelkowym hepatocytów",
          "C) Odkładaniem się złogów miedzi w rogówce oka w postaci pierścienia Kaysera-Fleischera",
          "D) Zwężeniem pnia tętnicy płucnej z przerostem prawej komory serca",
          "E) Aseptycznym zapaleniem wielostawowym z obustronnym zapaleniem spojówek"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Zespół Fitz-Hugh-Curtisa to zapalenie torebki wątroby (perihepatitis) wikłające wstępujące zakażenie PID (najczęściej Chlamydia trachomatis lub Neisseria gonorrhoeae). Objawia się ostrym bólem w prawym podżebrzu nasilającym się przy wdechu. W laparoskopii widoczne są charakterystyczne zrosty pasmowate łączące torebkę wątroby z otrzewną ścienną (tzw. zrosty o typie 'strun skrzypcowych').",
        expl: "Prawidłowo! Zespół Fitz-Hugh-Curtisa to zapalenie torebki wątroby (perihepatitis) wikłające wstępujące zakażenie PID (najczęściej Chlamydia trachomatis lub Neisseria gonorrhoeae). Objawia się ostrym bólem w prawym podżebrzu nasilającym się przy wdechu. W laparoskopii widoczne są charakterystyczne zrosty pasmowate łączące torebkę wątroby z otrzewną ścienną (tzw. zrosty o typie 'strun skrzypcowych').",
        explanation: "Prawidłowo! Zespół Fitz-Hugh-Curtisa to zapalenie torebki wątroby (perihepatitis) wikłające wstępujące zakażenie PID (najczęściej Chlamydia trachomatis lub Neisseria gonorrhoeae). Objawia się ostrym bólem w prawym podżebrzu nasilającym się przy wdechu. W laparoskopii widoczne są charakterystyczne zrosty pasmowate łączące torebkę wątroby z otrzewną ścienną (tzw. zrosty o typie 'strun skrzypcowych')."
      },
      {
        q: "Które z poniższych kryteriów stanowi BEZWZGLĘDNE wskazanie do hospitalizacji pacjentki z zapaleniem narządów miednicy mniejszej (PID)?",
        question: "Które z poniższych kryteriów stanowi BEZWZGLĘDNE wskazanie do hospitalizacji pacjentki z zapaleniem narządów miednicy mniejszej (PID)?",
        opts: [
          "A) Współistniejąca ciąża lub podejrzenie ropnia jajowodowo-jajnikowego (TOA)",
          "B) Wiek pacjentki powyżej 25. roku życia bez innych obciążeń",
          "C) Izolowane występowanie bolesności szyjki macicy przy prawidłowej temperaturze ciała",
          "D) Stwierdzenie pojedynczego epizodu luźnego stolca w wywiadzie",
          "E) Przebyte w dzieciństwie ospa wietrzna i świnka"
        ],
        options: [
          "A) Współistniejąca ciąża lub podejrzenie ropnia jajowodowo-jajnikowego (TOA)",
          "B) Wiek pacjentki powyżej 25. roku życia bez innych obciążeń",
          "C) Izolowane występowanie bolesności szyjki macicy przy prawidłowej temperaturze ciała",
          "D) Stwierdzenie pojedynczego epizodu luźnego stolca w wywiadzie",
          "E) Przebyte w dzieciństwie ospa wietrzna i świnka"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Wskazaniami do hospitalizacji w PID wg wytycznych CDC są: ciąża (bezwzględnie!), podejrzenie lub stwierdzenie ropnia TOA, niemożność wykluczenia ostrego brzucha chirurgicznego (np. wyrostka), ciężki stan ogólny z nudnościami i wymiotami uniemożliwiającymi leczenie doustne, brak poprawy po 72h leczenia ambulatoryjnego oraz stan immunosupresji.",
        expl: "Prawidłowo! Wskazaniami do hospitalizacji w PID wg wytycznych CDC są: ciąża (bezwzględnie!), podejrzenie lub stwierdzenie ropnia TOA, niemożność wykluczenia ostrego brzucha chirurgicznego (np. wyrostka), ciężki stan ogólny z nudnościami i wymiotami uniemożliwiającymi leczenie doustne, brak poprawy po 72h leczenia ambulatoryjnego oraz stan immunosupresji.",
        explanation: "Prawidłowo! Wskazaniami do hospitalizacji w PID wg wytycznych CDC są: ciąża (bezwzględnie!), podejrzenie lub stwierdzenie ropnia TOA, niemożność wykluczenia ostrego brzucha chirurgicznego (np. wyrostka), ciężki stan ogólny z nudnościami i wymiotami uniemożliwiającymi leczenie doustne, brak poprawy po 72h leczenia ambulatoryjnego oraz stan immunosupresji."
      },
      {
        q: "Jaka jest najczęstsza odległa konsekwencja przebytego nieleczonego lub nawracającego zapalenia narządów miednicy mniejszej (PID)?",
        question: "Jaka jest najczęstsza odległa konsekwencja przebytego nieleczonego lub nawracającego zapalenia narządów miednicy mniejszej (PID)?",
        opts: [
          "A) Niepłodność jajowodowa oraz istotny wzrost ryzyka ciąży pozamacicznej (ektopowej)",
          "B) Wrodzona niedoczynność tarczycy u przyszłego potomstwa",
          "C) Zwyrodnienie wielotorbielowate nerek typu dorosłych (ADPKD)",
          "D) Przedwczesne skostnienie szwów czaszkowych",
          "E) Zwiększone ryzyko raka rdzeniastego tarczycy"
        ],
        options: [
          "A) Niepłodność jajowodowa oraz istotny wzrost ryzyka ciąży pozamacicznej (ektopowej)",
          "B) Wrodzona niedoczynność tarczycy u przyszłego potomstwa",
          "C) Zwyrodnienie wielotorbielowate nerek typu dorosłych (ADPKD)",
          "D) Przedwczesne skostnienie szwów czaszkowych",
          "E) Zwiększone ryzyko raka rdzeniastego tarczycy"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Zniszczenie aparatu rzęskowego nabłonka jajowodów i zrosty wewnątrzotrzewnowe prowadzą do niepłodności jajowodowej (ryzyko wynosi ok. 10% po 1 epizodzie, 20% po 2 i ponad 50% po 3 epizodach PID) oraz 7–10-krotnego wzrostu ryzyka zagnieżdżenia ciąży w jajowodzie (ciąża ektopowa).",
        expl: "Prawidłowo! Zniszczenie aparatu rzęskowego nabłonka jajowodów i zrosty wewnątrzotrzewnowe prowadzą do niepłodności jajowodowej (ryzyko wynosi ok. 10% po 1 epizodzie, 20% po 2 i ponad 50% po 3 epizodach PID) oraz 7–10-krotnego wzrostu ryzyka zagnieżdżenia ciąży w jajowodzie (ciąża ektopowa).",
        explanation: "Prawidłowo! Zniszczenie aparatu rzęskowego nabłonka jajowodów i zrosty wewnątrzotrzewnowe prowadzą do niepłodności jajowodowej (ryzyko wynosi ok. 10% po 1 epizodzie, 20% po 2 i ponad 50% po 3 epizodach PID) oraz 7–10-krotnego wzrostu ryzyka zagnieżdżenia ciąży w jajowodzie (ciąża ektopowa)."
      },
      {
        q: "Wskaż zestaw twierdzeń PRAWDZIWYCH dotyczących postępowania w zapaleniu narządów miednicy mniejszej (PID):\n1. Leczenie przeciwbakteryjne powinno trwać łącznie 14 dni.\n2. Partnerzy seksualni pacjentki z ostatnich 60 dni muszą zostać zbadani i przeleczeni empirycznie.\n3. W schemacie leczenia ambulatoryjnego doksycyklinę kojarzy się z ceftriaksonem i metronidazolem.\n4. Natychmiastowe usunięcie wkładki wewnątrzmacicznej (IUD) jest bezwzględnie obligatoryjne w pierwszych 5 minutach od przyjęcia.\n5. Testy amplifikacji kwasów nukleinowych (NAAT) stanowią badanie z wyboru w detekcji C. trachomatis.",
        question: "Wskaż zestaw twierdzeń PRAWDZIWYCH dotyczących postępowania w zapaleniu narządów miednicy mniejszej (PID):\n1. Leczenie przeciwbakteryjne powinno trwać łącznie 14 dni.\n2. Partnerzy seksualni pacjentki z ostatnich 60 dni muszą zostać zbadani i przeleczeni empirycznie.\n3. W schemacie leczenia ambulatoryjnego doksycyklinę kojarzy się z ceftriaksonem i metronidazolem.\n4. Natychmiastowe usunięcie wkładki wewnątrzmacicznej (IUD) jest bezwzględnie obligatoryjne w pierwszych 5 minutach od przyjęcia.\n5. Testy amplifikacji kwasów nukleinowych (NAAT) stanowią badanie z wyboru w detekcji C. trachomatis.",
        opts: [
          "A) 1, 2, 3, 5",
          "B) 1, 2, 4",
          "C) 2, 3, 4, 5",
          "D) 1, 3, 4",
          "E) Tylko 1 i 2"
        ],
        options: [
          "A) 1, 2, 3, 5",
          "B) 1, 2, 4",
          "C) 2, 3, 4, 5",
          "D) 1, 3, 4",
          "E) Tylko 1 i 2"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Zdania 1, 2, 3 i 5 są prawdziwe. Zdanie 4 jest fałszywe: wytyczne nie nakazują natychmiastowego usuwania IUD – leczenie antybiotykami rozpoczyna się przy zachowanej wkładce, a jej usunięcie rozważa się dopiero w razie braku poprawy po 48–72 godzinach.",
        expl: "Prawidłowo! Zdania 1, 2, 3 i 5 są prawdziwe. Zdanie 4 jest fałszywe: wytyczne nie nakazują natychmiastowego usuwania IUD – leczenie antybiotykami rozpoczyna się przy zachowanej wkładce, a jej usunięcie rozważa się dopiero w razie braku poprawy po 48–72 godzinach.",
        explanation: "Prawidłowo! Zdania 1, 2, 3 i 5 są prawdziwe. Zdanie 4 jest fałszywe: wytyczne nie nakazują natychmiastowego usuwania IUD – leczenie antybiotykami rozpoczyna się przy zachowanej wkładce, a jej usunięcie rozważa się dopiero w razie braku poprawy po 48–72 godzinach."
      },
      {
        q: "Wskaż zdanie FAŁSZYWE dotyczące diagnostyki i leczenia zapalenia narządów miednicy mniejszej (PID):",
        question: "Wskaż zdanie FAŁSZYWE dotyczące diagnostyki i leczenia zapalenia narządów miednicy mniejszej (PID):",
        opts: [
          "A) Ujemny wynik posiewu bakteriologicznego z kanału szyjki całkowicie wyklucza zakażenie Chlamydia trachomatis",
          "B) Metronidazol jest włączany do schematu leczenia PID w celu pokrycia bakterii beztlenowych i Trichomonas vaginalis",
          "C) Brak gorączki i prawidłowa liczba krwinek białych nie wykluczają rozpoznania łagodnego lub umiarkowanego PID",
          "D) Wskazana jest wstrzemięźliwość seksualna obojga partnerów do czasu pełnego ukończenia 14-dniowego leczenia",
          "E) Bolesność przy poruszaniu szyjką macicy w badaniu dwuręcznym wynika z naciągania zmienionej zapalnie otrzewnej miednicy"
        ],
        options: [
          "A) Ujemny wynik posiewu bakteriologicznego z kanału szyjki całkowicie wyklucza zakażenie Chlamydia trachomatis",
          "B) Metronidazol jest włączany do schematu leczenia PID w celu pokrycia bakterii beztlenowych i Trichomonas vaginalis",
          "C) Brak gorączki i prawidłowa liczba krwinek białych nie wykluczają rozpoznania łagodnego lub umiarkowanego PID",
          "D) Wskazana jest wstrzemięźliwość seksualna obojga partnerów do czasu pełnego ukończenia 14-dniowego leczenia",
          "E) Bolesność przy poruszaniu szyjką macicy w badaniu dwuręcznym wynika z naciągania zmienionej zapalnie otrzewnej miednicy"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Zdanie A jest bezwzględnie fałszywe. Chlamydia trachomatis jest obligatoryjną bakterią wewnątrzkomórkową i nie rośnie na standardowych pożywkach bakteriologicznych (klasyczny posiew da wynik ujemny!). Metodą z wyboru o czułości >98% są testy amplifikacji kwasów nukleinowych NAAT (PCR).",
        expl: "Prawidłowo! Zdanie A jest bezwzględnie fałszywe. Chlamydia trachomatis jest obligatoryjną bakterią wewnątrzkomórkową i nie rośnie na standardowych pożywkach bakteriologicznych (klasyczny posiew da wynik ujemny!). Metodą z wyboru o czułości >98% są testy amplifikacji kwasów nukleinowych NAAT (PCR).",
        explanation: "Prawidłowo! Zdanie A jest bezwzględnie fałszywe. Chlamydia trachomatis jest obligatoryjną bakterią wewnątrzkomórkową i nie rośnie na standardowych pożywkach bakteriologicznych (klasyczny posiew da wynik ujemny!). Metodą z wyboru o czułości >98% są testy amplifikacji kwasów nukleinowych NAAT (PCR)."
      },
      {
        q: "Zgodnie z przepisami dotyczącymi zwalczania chorób zakaźnych, zakażenie którymi z poniższych patogenów wywołujących PID podlega w Polsce obowiązkowemu zgłoszeniu do właściwej stacji sanitarno-epidemiologicznej (Sanepid)?",
        question: "Zgodnie z przepisami dotyczącymi zwalczania chorób zakaźnych, zakażenie którymi z poniższych patogenów wywołujących PID podlega w Polsce obowiązkowemu zgłoszeniu do właściwej stacji sanitarno-epidemiologicznej (Sanepid)?",
        opts: [
          "A) Zakażenie Neisseria gonorrhoeae (rzeżączka) oraz Chlamydia trachomatis",
          "B) Wyłącznie zakażenie grzybicze Candida albicans",
          "C) Izolowane występowanie pałeczek kwasu mlekowego Lactobacillus",
          "D) Zakażenie wirusem opryszczki wargowej typu 1 (HSV-1)",
          "E) Żadne zakażenia układu moczowo-płciowego nie podlegają zgłoszeniu"
        ],
        options: [
          "A) Zakażenie Neisseria gonorrhoeae (rzeżączka) oraz Chlamydia trachomatis",
          "B) Wyłącznie zakażenie grzybicze Candida albicans",
          "C) Izolowane występowanie pałeczek kwasu mlekowego Lactobacillus",
          "D) Zakażenie wirusem opryszczki wargowej typu 1 (HSV-1)",
          "E) Żadne zakażenia układu moczowo-płciowego nie podlegają zgłoszeniu"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Zgodnie z ustawą o zapobieganiu oraz zwalczaniu zakażeń i chorób zakaźnych u ludzi, zakażenia rzeżączkowe (N. gonorrhoeae) oraz chlamydiozy układu moczowo-płciowego (C. trachomatis) podlegają w Polsce obowiązkowemu zgłoszeniu do Państwowego Powiatowego Inspektora Sanitarnego.",
        expl: "Prawidłowo! Zgodnie z ustawą o zapobieganiu oraz zwalczaniu zakażeń i chorób zakaźnych u ludzi, zakażenia rzeżączkowe (N. gonorrhoeae) oraz chlamydiozy układu moczowo-płciowego (C. trachomatis) podlegają w Polsce obowiązkowemu zgłoszeniu do Państwowego Powiatowego Inspektora Sanitarnego.",
        explanation: "Prawidłowo! Zgodnie z ustawą o zapobieganiu oraz zwalczaniu zakażeń i chorób zakaźnych u ludzi, zakażenia rzeżączkowe (N. gonorrhoeae) oraz chlamydiozy układu moczowo-płciowego (C. trachomatis) podlegają w Polsce obowiązkowemu zgłoszeniu do Państwowego Powiatowego Inspektora Sanitarnego."
      },
      {
        q: "Dlaczego u kobiet w ciąży z rozpoznaniem PID bezwzględnie PRZECIWWSKAZANE jest stosowanie doksycykliny?",
        question: "Dlaczego u kobiet w ciąży z rozpoznaniem PID bezwzględnie PRZECIWWSKAZANE jest stosowanie doksycykliny?",
        opts: [
          "A) Z powodu ryzyka trwałego przebarwienia zębów i zaburzeń rozwoju kośćca płodu (tetracykliny)",
          "B) Ponieważ doksycyklina powoduje natychmiastowe zamknięcie przewodu tętniczego Botalla u matki",
          "C) Ze względu na bezpośrednie ryzyko wywołania ostrej porfirii wątrobowej u płodu",
          "D) Ponieważ wywołuje ona zrośnięcie warg sromowych płodu płci żeńskiej",
          "E) Z powodu niebezpieczeństwa trwałej utraty wzroku przez pacjentkę w ciąży"
        ],
        options: [
          "A) Z powodu ryzyka trwałego przebarwienia zębów i zaburzeń rozwoju kośćca płodu (tetracykliny)",
          "B) Ponieważ doksycyklina powoduje natychmiastowe zamknięcie przewodu tętniczego Botalla u matki",
          "C) Ze względu na bezpośrednie ryzyko wywołania ostrej porfirii wątrobowej u płodu",
          "D) Ponieważ wywołuje ona zrośnięcie warg sromowych płodu płci żeńskiej",
          "E) Z powodu niebezpieczeństwa trwałej utraty wzroku przez pacjentkę w ciąży"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Tetracykliny (w tym doksycyklina) odkładają się w zawiązkach zębów i kościach płodu, powodując trwałe żółtobrunatne przebarwienie szkliwa, hipoplazję zębów oraz zahamowanie wzrostu kośćca. U ciężarnych doksycyklinę zastępuje się erytromycyną lub azytromycyną.",
        expl: "Prawidłowo! Tetracykliny (w tym doksycyklina) odkładają się w zawiązkach zębów i kościach płodu, powodując trwałe żółtobrunatne przebarwienie szkliwa, hipoplazję zębów oraz zahamowanie wzrostu kośćca. U ciężarnych doksycyklinę zastępuje się erytromycyną lub azytromycyną.",
        explanation: "Prawidłowo! Tetracykliny (w tym doksycyklina) odkładają się w zawiązkach zębów i kościach płodu, powodując trwałe żółtobrunatne przebarwienie szkliwa, hipoplazję zębów oraz zahamowanie wzrostu kośćca. U ciężarnych doksycyklinę zastępuje się erytromycyną lub azytromycyną."
      },
      {
        q: "Co to jest pyosalpinx stwierdzany w badaniu USG u pacjentki z ciężkim PID?",
        question: "Co to jest pyosalpinx stwierdzany w badaniu USG u pacjentki z ciężkim PID?",
        opts: [
          "A) Wodniak jajowodu wypełniony treścią ropną wskutek zamknięcia obu ujść jajowodu",
          "B) Niezłośliwy naczyniak tętniczy zlokalizowany w błonie surowiczej macicy",
          "C) Pęknięcie ściany pęcherzyka Graafa z wynaczynieniem krwi do zrębu",
          "D) Wrodzone podwojenie jajowodu z obecnością dwóch ujść brzusznych",
          "E) Obecność zrostów między wyrostkiem robaczkowym a prawym jajnikiem"
        ],
        options: [
          "A) Wodniak jajowodu wypełniony treścią ropną wskutek zamknięcia obu ujść jajowodu",
          "B) Niezłośliwy naczyniak tętniczy zlokalizowany w błonie surowiczej macicy",
          "C) Pęknięcie ściany pęcherzyka Graafa z wynaczynieniem krwi do zrębu",
          "D) Wrodzone podwojenie jajowodu z obecnością dwóch ujść brzusznych",
          "E) Obecność zrostów między wyrostkiem robaczkowym a prawym jajnikiem"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Pyosalpinx (ropniak jajowodu) powstaje, gdy proces zapalny zamknie ujście brzuszne i maciczne jajowodu, a gromadząca się wydzielina ropna powoduje jego retencyjne rozdęcie o kształcie kiełbasy ('sausage-like shape') z pogrubiałą ścianą i echem wewnętrznym.",
        expl: "Prawidłowo! Pyosalpinx (ropniak jajowodu) powstaje, gdy proces zapalny zamknie ujście brzuszne i maciczne jajowodu, a gromadząca się wydzielina ropna powoduje jego retencyjne rozdęcie o kształcie kiełbasy ('sausage-like shape') z pogrubiałą ścianą i echem wewnętrznym.",
        explanation: "Prawidłowo! Pyosalpinx (ropniak jajowodu) powstaje, gdy proces zapalny zamknie ujście brzuszne i maciczne jajowodu, a gromadząca się wydzielina ropna powoduje jego retencyjne rozdęcie o kształcie kiełbasy ('sausage-like shape') z pogrubiałą ścianą i echem wewnętrznym."
      },
      {
        q: "Który mikroorganizm wchodzący w skład flory pochwy najsilniej wiąże się ze zwiększonym ryzykiem rozwoju PID poprzez niszczenie ochronnego kwaśnego pH pochwy?",
        question: "Który mikroorganizm wchodzący w skład flory pochwy najsilniej wiąże się ze zwiększonym ryzykiem rozwoju PID poprzez niszczenie ochronnego kwaśnego pH pochwy?",
        opts: [
          "A) Gardnerella vaginalis i bakterie beztlenowe związane z bakteryjną waginozą (BV)",
          "B) Lactobacillus crispatus produkujący nadtlenek wodoru",
          "C) Streptococcus pneumoniae bytujący w drogach oddechowych",
          "D) Helicobacter pylori w śluzówce żołądka pacjentki",
          "E) Borrelia burgdorferi przenoszona przez kleszcze"
        ],
        options: [
          "A) Gardnerella vaginalis i bakterie beztlenowe związane z bakteryjną waginozą (BV)",
          "B) Lactobacillus crispatus produkujący nadtlenek wodoru",
          "C) Streptococcus pneumoniae bytujący w drogach oddechowych",
          "D) Helicobacter pylori w śluzówce żołądka pacjentki",
          "E) Borrelia burgdorferi przenoszona przez kleszcze"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Bakteryjna waginoza (BV), charakteryzująca się zanikiem pałeczek kwasu mlekowego Lactobacillus i namnożeniem Gardnerella vaginalis, Atopobium vaginae oraz beztlenowców (Prevotella, Mobiluncus), powoduje wzrost pH >4,5 i enzymatyczną degradację śluzu szyjkowego, ułatwiając wstępowanie patogenów PID.",
        expl: "Prawidłowo! Bakteryjna waginoza (BV), charakteryzująca się zanikiem pałeczek kwasu mlekowego Lactobacillus i namnożeniem Gardnerella vaginalis, Atopobium vaginae oraz beztlenowców (Prevotella, Mobiluncus), powoduje wzrost pH >4,5 i enzymatyczną degradację śluzu szyjkowego, ułatwiając wstępowanie patogenów PID.",
        explanation: "Prawidłowo! Bakteryjna waginoza (BV), charakteryzująca się zanikiem pałeczek kwasu mlekowego Lactobacillus i namnożeniem Gardnerella vaginalis, Atopobium vaginae oraz beztlenowców (Prevotella, Mobiluncus), powoduje wzrost pH >4,5 i enzymatyczną degradację śluzu szyjkowego, ułatwiając wstępowanie patogenów PID."
      },
      {
        q: "Jakie postępowanie inwazyjne należy rozważyć u chorej z ropniem jajowodowo-jajnikowym (TOA) o średnicy 8 cm, u której po 48 godzinach agresywnej antybiotykoterapii i.v. utrzymuje się septyczna gorączka 39°C?",
        question: "Jakie postępowanie inwazyjne należy rozważyć u chorej z ropniem jajowodowo-jajnikowym (TOA) o średnicy 8 cm, u której po 48 godzinach agresywnej antybiotykoterapii i.v. utrzymuje się septyczna gorączka 39°C?",
        opts: [
          "A) Przezskórny lub przezpochwowy drenaż ropnia pod kontrolą USG/TK bądź laparoskopowe odbarczenie ropnia",
          "B) Natychmiastowe odstawienie wszystkich antybiotyków i podanie dożylne wlewu z witaminy C",
          "C) Wymuszenie diurezy za pomocą 200 mg furosemidu w celu wypłukania toksyn przez nerki",
          "D) Założenie sondy żołądkowej do odsysania treści i wypisanie pacjentki do domu",
          "E) Wykonanie biopsji szpiku kostnego z talerza kości biodrowej"
        ],
        options: [
          "A) Przezskórny lub przezpochwowy drenaż ropnia pod kontrolą USG/TK bądź laparoskopowe odbarczenie ropnia",
          "B) Natychmiastowe odstawienie wszystkich antybiotyków i podanie dożylne wlewu z witaminy C",
          "C) Wymuszenie diurezy za pomocą 200 mg furosemidu w celu wypłukania toksyn przez nerki",
          "D) Założenie sondy żołądkowej do odsysania treści i wypisanie pacjentki do domu",
          "E) Wykonanie biopsji szpiku kostnego z talerza kości biodrowej"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Ropnie TOA >7–8 cm rzadko odpowiadają na samą antybiotykoterapię. W przypadku braku poprawy w ciągu 48–72 godzin lub podejrzenia pęknięcia ropnia (zagrożenie wstrząsem septycznym), metodą z wyboru jest małoinwazyjny drenaż pod kontrolą USG/TK lub laparoskopowe odbarczenie i płukanie jamy ropnia.",
        expl: "Prawidłowo! Ropnie TOA >7–8 cm rzadko odpowiadają na samą antybiotykoterapię. W przypadku braku poprawy w ciągu 48–72 godzin lub podejrzenia pęknięcia ropnia (zagrożenie wstrząsem septycznym), metodą z wyboru jest małoinwazyjny drenaż pod kontrolą USG/TK lub laparoskopowe odbarczenie i płukanie jamy ropnia.",
        explanation: "Prawidłowo! Ropnie TOA >7–8 cm rzadko odpowiadają na samą antybiotykoterapię. W przypadku braku poprawy w ciągu 48–72 godzin lub podejrzenia pęknięcia ropnia (zagrożenie wstrząsem septycznym), metodą z wyboru jest małoinwazyjny drenaż pod kontrolą USG/TK lub laparoskopowe odbarczenie i płukanie jamy ropnia."
      },
      {
        q: "Dlaczego w schemacie leczenia PID zaleca się dodanie metronidazolu do skojarzenia ceftriaksonu z doksycykliną?",
        question: "Dlaczego w schemacie leczenia PID zaleca się dodanie metronidazolu do skojarzenia ceftriaksonu z doksycykliną?",
        opts: [
          "A) Aby skutecznie eradykować bakterie beztlenowe biorące udział w destrukcji miąższu i tworzeniu ropni oraz leczyć współistniejącą rzęsistkowicę",
          "B) W celu zahamowania syntezy kwasu moczowego w kanalikach proksymalnych nerek",
          "C) Aby zapobiec powstawaniu nadciśnienia tętniczego indukowanego przez doksycyklinę",
          "D) W celu pobudzenia wydzielania gonadotropin przez przedni płat przysadki mózgowej",
          "E) Aby zneutralizować działanie przeciwpłytkowe ceftriaksonu w naczyniach miednicy"
        ],
        options: [
          "A) Aby skutecznie eradykować bakterie beztlenowe biorące udział w destrukcji miąższu i tworzeniu ropni oraz leczyć współistniejącą rzęsistkowicę",
          "B) W celu zahamowania syntezy kwasu moczowego w kanalikach proksymalnych nerek",
          "C) Aby zapobiec powstawaniu nadciśnienia tętniczego indukowanego przez doksycyklinę",
          "D) W celu pobudzenia wydzielania gonadotropin przez przedni płat przysadki mózgowej",
          "E) Aby zneutralizować działanie przeciwpłytkowe ceftriaksonu w naczyniach miednicy"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Bakterie beztlenowe (Bacteroides, Prevotella, Peptostreptococcus) odgrywają kluczową rolę w zaawansowanym PID, endometritis i tworzeniu ropni TOA. Badania kliniczne wykazały, że dodanie metronidazolu istotnie zmniejsza odsetek przetrwałego zakażenia beztlenowego i nawrotów.",
        expl: "Prawidłowo! Bakterie beztlenowe (Bacteroides, Prevotella, Peptostreptococcus) odgrywają kluczową rolę w zaawansowanym PID, endometritis i tworzeniu ropni TOA. Badania kliniczne wykazały, że dodanie metronidazolu istotnie zmniejsza odsetek przetrwałego zakażenia beztlenowego i nawrotów.",
        explanation: "Prawidłowo! Bakterie beztlenowe (Bacteroides, Prevotella, Peptostreptococcus) odgrywają kluczową rolę w zaawansowanym PID, endometritis i tworzeniu ropni TOA. Badania kliniczne wykazały, że dodanie metronidazolu istotnie zmniejsza odsetek przetrwałego zakażenia beztlenowego i nawrotów."
      }
    ],
    flashcards: [
      { q: "Jakie jest minimalne kryterium kliniczne CDC uzasadniające wdrożenie leczenia PID?", a: "Bolesność palpacyjna podbrzusza oraz bolesność macicy, przydatków lub poruszania szyjką w badaniu ginekologicznym." },
      { q: "Czym jest zespół Fitz-Hugh-Curtisa?", a: "Zapaleniem torebki wątroby (perihepatitis) w przebiegu PID z bólem w prawym podżebrzu i zrostami 'strun skrzypcowych'." },
      { q: "Jaki jest standardowy 14-dniowy schemat leczenia PID wg CDC?", a: "Ceftriakson 1 g i.m./i.v. + Doksycyklina 100 mg 2x/d + Metronidazol 500 mg 2x/d przez 14 dni." },
      { q: "Jakie badanie jest złotym standardem detekcji Chlamydii i Gonokoków?", a: "Testy molekularne amplifikacji kwasów nukleinowych NAAT (PCR) z wymazu z kanału szyjki." },
      { q: "Którzy partnerzy seksualni pacjentki z PID wymagają leczenia?", a: "Wszyscy partnerzy seksualni z ostatnich 60 dni poprzedzających wystąpienie objawów." },
      { q: "Jakie są najgroźniejsze odległe powikłania przebytego PID?", a: "Trwała niepłodność jajowodowa (zarastanie jajowodów), ciąża ektopowa oraz przewlekły ból miednicy mniejszej." }
    ]
  },

  // =========================================================================
  // CASE 158: Krwawienie Podpajęczynówkowe (SAH)
  // =========================================================================
  {
    id: 158,
    file: "158_krwawienie_podpajeczynowkowe_sah.json",
    shortTitle: "Krwawienie Podpajęczynówkowe (SAH)",
    title: "Ostre Krwawienie Podpajęczynówkowe z Pękniętego Tętniaka Mózgu (SAH)",
    dept: "Neurologia i Neurochirurgia",
    diagnosisTitle: "Krwawienie Podpajęczynówkowe w wyniku pęknięcia workowatego tętniaka tętnicy łączącej przedniej (SAH, Hunt-Hess II / Fisher 3)",
    vitals: [
      { label: "Ciśnienie tętnicze (RR)", val: "175/100", unit: "mmHg", status: "vital-warn" },
      { label: "Częstość akcji serca (HR)", val: "64", unit: "/min", status: "vital-ok" },
      { label: "Częstość oddechów (RR)", val: "16", unit: "/min", status: "vital-ok" },
      { label: "Saturacja (SpO2)", val: "97", unit: "%", status: "vital-ok" },
      { label: "Temperatura ciała", val: "37.1", unit: "°C", status: "vital-ok" }
    ],
    story: "<p><strong>Pacjent:</strong> 48-letni mężczyzna przywieziony na SOR przez ZRM z powodu nagłego, obezwładniającego bólu głowy.</p><p><strong>Wywiad chorobowy:</strong> Ból pojawił się nagle 2 godziny temu podczas parcia na stolec. Pacjent opisuje go jako 'najgorszy ból głowy w życiu' (thunderclap headache), który osiągnął maksymalne natężenie 10/10 w ułamku sekundy. Towarzyszyły mu nudności, trzykrotne gwałtowne wymioty oraz silny światłowstręt. W wywiadzie: nikotynizm (20 paczkolat) oraz nieleczone nadciśnienie tętnicze. Neguje uraz głowy.</p><p><strong>Badanie przedmiotowe:</strong> Pacjent cierpiący, leży z zamkniętymi oczami, zgiętymi kończynami, z głową odgiętą do tyłu. Przytomny, w pełnym kontakcie logicznym (GCS 15). Źrenice równe, symetryczne, prawidłowo reagujące na światło. Wyraźna sztywność karku na 3–4 poprzeczne palce, obustronnie dodatni objaw Kerniga. Brak niedowładów kończynowych i asymetrii twarzy (stopień II w skali Hunta-Hessa).</p>",
    steps: [
      {
        title: "Krok 1: Wstępna diagnostyka neuroobrazowa z wyboru i okno czasowe",
        scenario: "Pacjent prezentuje piorunujący ból głowy z zespołem oponowym. Jakie badanie obrazowe należy wykonać w trybie pilnym w pierwszej kolejności?",
        options: [
          {
            text: "Pilna tomografia komputerowa (TK) głowy bez podania środka cieniującego",
            correct: true,
            isCorrect: true,
            feedback: "✅ PRAWIDŁOWO! Niekontrastowa TK głowy (NCCT) jest badaniem pierwszego rzutu z wyboru. Wykonana w ciągu pierwszych 6 godzin od początku objawów cechuje się czułością sięgającą niemal 100% w wykrywaniu wynaczynionej krwi w przestrzeni podpajęczynówkowej (zbiornikach podstawy, szczelinie Sylwiusza i bruzdach mózgu)."
          },
          {
            text: "Przeglądowe zdjęcie RTG czaszki w dwóch projekcjach w poszukiwaniu pęknięcia kości sklepienia",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! RTG czaszki nie uwidacznia tkanki mózgowej ani krwi w przestrzeni podpajęczynówkowej."
          },
          {
            text: "Elektroencefalografia (EEG) w celu poszukiwania napadów padaczkowych w płatach potylicznych",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! EEG nie służy do diagnostyki krwawień wewnątrzczaszkowych i opóźnia leczenie."
          },
          {
            text: "Rutynowa gastroskopia w celu wykluczenia zespołu Boerhaavego jako źródła bólu rzutowanego",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Ból głowy o charakterze piorunującym wymaga natychmiastowej diagnostyki mózgowej."
          }
        ]
      },
      {
        title: "Krok 2: Postępowanie w razie ujemnego wyniku TK głowy wykonanej >6h",
        scenario: "W TK głowy wykonanej po 12 godzinach od początku bólu nie stwierdzono jednoznacznych cech hiperdensyjnej krwi w zbiornikach podstawy, jednak podejrzenie SAH pozostaje wysokie. Jaki jest kolejny, bezwzględny krok diagnostyczny?",
        options: [
          {
            text: "Wykonanie nakłucia lędźwiowego (LP) po wykluczeniu cech ciasnoty śródczaszkowej w celu oceny ksantochromii płynu mózgowo-rdzeniowego",
            correct: true,
            isCorrect: true,
            feedback: "✅ PRAWIDŁOWO! Zgodnie z wytycznymi ESO i AHA, jeśli TK głowy wykonana po upływie 6 godzin od początku objawów jest ujemna, złotym standardem wykluczenia SAH jest nakłucie lędźwiowe (LP) wykonane najlepiej po 12 godzinach od incydentu. Wykrycie ksantochromii (żółtawego zabarwienia supernatantu po odwirowaniu, potwierdzonego w spektrofotometrii) jednoznacznie potwierdza krwawienie podpajęczynówkowe."
          },
          {
            text: "Wypisanie pacjenta do domu z diagnozą napięciowego bólu głowy i zaleceniem ibuprofenu",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Czułość TK spada z każdą godziną; wypisanie chorego bez LP grozi przeoczeniem tętniaka i śmiertelnym powtórnym krwotokiem."
          },
          {
            text: "Podanie dożylne heparyny drobnocząsteczkowej w pełnej dawce leczniczej w celu rozpuszczenia mikrozakrzepów",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Antykoagulacja przy podejrzeniu pękniętego tętniaka wywoła masywny, śmiertelny krwotok mózgowy."
          },
          {
            text: "Wykonanie testu prowokacji pionizacyjnej na stole uchylnym tilt-test",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Test pionizacyjny jest procedurą kardiologiczną w omdleniach wazowagalnych i jest przeciwwskazany w SAH."
          }
        ]
      },
      {
        title: "Krok 3: Diagnostyka naczyniowa i zabezpieczenie tętniaka mózgu",
        scenario: "Badanie potwierdziło SAH. W Angio-TK (CTA) naczyń koła Willisa uwidoczniono workowaty tętniak tętnicy łączącej przedniej (AComA) o wymiarach 7x5 mm z nieregularnym uwypukleniem ściany. Jakie jest postępowanie definitywne z wyboru?",
        options: [
          {
            text: "Pilne zaopatrzenie tętniaka w ciągu pierwszych 24–72 godzin metodą wewnątrznaczyniowej embolizacji sprężynkami (coiling) lub klipsowania neurochirurgicznego",
            correct: true,
            isCorrect: true,
            feedback: "✅ PRAWIDŁOWO! Najgroźniejszym powikłaniem wczesnego okresu SAH jest powtórne pęknięcie tętniaka (rebleeding), niosące ze sobą ponad 70% śmiertelność. Pilne zabezpieczenie tętniaka (embolizacja wewnątrznaczyniowa – coiling lub mikrochirurgiczne zaklipsowanie szypuły) w ciągu pierwszych 24–72 godzin jest bezwzględnym standardem."
          },
          {
            text: "Postępowanie zachowawcze z planowym klipsowaniem tętniaka za 6 miesięcy po całkowitej resorpcji krwi",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Ponowne pęknięcie tętniaka następuje najczęściej w ciągu pierwszych kilkunastu dni (szczyt w pierwszych 24–48h); odroczenie operacji to wyrok śmierci."
          },
          {
            text: "Wstrzyknięcie sklerozantu bezpośrednio do tętnicy szyjnej wspólnej w znieczuleniu miejscowym",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Wstrzyknięcie sklerozantu doprowadzi do rozległego udaru niedokrwiennego półkuli mózgu."
          },
          {
            text: "Cewnikowanie prawej komory serca z założeniem elektrostymulatora czasowego",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Kardiostymulacja nie zabezpiecza pękniętego tętniaka mózgu."
          }
        ]
      },
      {
        title: "Krok 4: Zapobieganie skurczowi naczyniowemu i opóźnionemu niedokrwieniu (DCI)",
        scenario: "Tętniak został pomyślnie zaopatrzony sprężynkami platynowymi (coiling). Pacjent jest w 4. dobie hospitalizacji. Jaka farmakoterapia o udowodnionej skuteczności zmniejsza ryzyko opóźnionego deficytu niedokrwiennego mózgu (DCI) wywołanego skurczem naczyniowym?",
        options: [
          {
            text: "Doustna nimodypina w dawce 60 mg co 4 godziny przez 21 dni wraz z utrzymywaniem normowolemii i prawidłowego ciśnienia tętniczego",
            correct: true,
            isCorrect: true,
            feedback: "✅ PRAWIDŁOWO! Nimodypina (bloker kanałów wapniowych z grupy dihydropirydyn o wysokim powinowactwie do naczyń mózgowych) podawana doustnie w dawce 60 mg co 4h przez 21 dni jest jedynym lekiem o udowodnionym w badaniach klinicznych wpływie na poprawę rokowania neurologicznego i redukcję opóźnionego niedokrwienia mózgu (DCI) w SAH."
          },
          {
            text: "Agresywna terapia 'potrójnego H' (hiperwolemia, hemodilucja, nadciśnienie) jako rutynowy standard u każdego chorego",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Terapia 'Triple-H' została zarzucona; rutynowa hiperwolemia i hemodylucja zwiększają ryzyko obrzęku płuc i hiponatremii. Obecnie standardem jest euwolemia i indukowane nadciśnienie wyłącznie przy objawowym DCI."
          },
          {
            text: "Podawanie dożylne wlewu z furosemidu w celu maksymalnego odwodnienia mózgu do osmolalności >350 mOsm/kg",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Hipowolemia drastycznie nasila ryzyko udaru niedokrwiennego w przebiegu skurczu naczyniowego."
          },
          {
            text: "Zastosowanie wysokich dawek deksametazonu w celu redukcji aseptycznego zapalenia opon",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Glikokortykosteroidy nie poprawiają rokowania w SAH i zwiększają ryzyko infekcji oraz hiperglikemii."
          }
        ]
      }
    ],
    pathoNodes: [
      {
        title: "Pęknięcie tętniaka workowatego koła Willisa",
        desc: "Wrodzone ubytki błony środkowej i elastycznej tętnic podstawy mózgu w połączeniu ze stresem hemodynamicznym (nadciśnienie) prowadzą do uwypuklenia tętniaka.",
        detail: "Miejsca bifurkacji naczyń (zwłaszcza tętnica łącząca przednia AComA 30–35%, tętnica łącząca tylna PComA 30%, tętnica środkowa mózgu MCA 20%) są poddane największym siłom ścinającym. Nagły wzrost ciśnienia w naczyniu powoduje rozerwanie ściany tętniaka.",
        target: "Punkt uchwytu diagnostyki i leczenia: Angio-TK / DSA i pilne wewnątrznaczyniowe zabezpieczenie sprężynkami (coiling) w ciągu 24–72 godzin."
      },
      {
        title: "Wzrost ciśnienia śródczaszkowego (ICP) i drażnienie opon",
        desc: "Wstrzyknięcie krwi pod ciśnieniem tętniczym do przestrzeni podpajęczynówkowej wywołuje gwałtowny skok ICP.",
        detail: "Ciśnienie śródczaszkowe może przejściowo zrównać się ze średnim ciśnieniem tętniczym (MAP), powodując nagłe zatrzymanie perfuzji mózgowej (CPP = MAP - ICP) i utratę przytomności. Krew i produkty rozpadu erytrocytów drażnią oponę miękką i pajęczą, wywołując odczyn aseptyczny (zespół oponowy).",
        target: "Punkt uchwytu leczenia: Kontrola ciśnienia tętniczego (SBP <160 mmHg przed zabezpieczeniem tętniaka) i analgezja."
      },
      {
        title: "Skurcz naczyniowy (vasospasm) i opóźnione niedokrwienie (DCI)",
        desc: "Rozpad wynaczynionych erytrocytów uwalnia oksyhemoglobinę, która wyzwala kaskadę reakcji zapalnych i skurcz mięśniówki tętnic.",
        detail: "Spadek biodostępności tlenku azotu (NO), wzrost stężenia endoteliny-1 oraz mikrozakrzepica w mikrokrążeniu wywołują skurcz dużych pni naczyniowych, osiągający szczyt między 4. a 14. dniem od krwawienia. Prowadzi to do wtórnych udarów niedokrwiennych.",
        target: "Punkt uchwytu leczenia: Doustna nimodypina (60 mg co 4h przez 21 dni), utrzymanie normowolemii i monitorowanie przezczaszkowym Dopplerem (TCD)."
      }
    ],
    dutySummary: {
      overview: "Krwawienie podpajęczynówkowe (SAH) to obecność wynaczynionej krwi w przestrzeni podpajęczynówkowej, w 85% przypadków spowodowana pęknięciem workowatego tętniaka mózgu. Objawia się nagłym bólem piorunującym głowy (thunderclap headache) i sztywnością karku. Śmiertelność sięga 40–50%.",
      diagnostics: "1. Pilna tomografia komputerowa (TK) głowy bez kontrastu (NCCT) – czułość blisko 100% w pierwszych 6h.\n\n2. Nakłucie lędźwiowe (LP) po wykluczeniu przeciwskazań przy ujemnej TK wykonanej po 6h (badanie płynu mózgowo-rdzeniowego na obecność ksantochromii po odwirowaniu – spektrofotometria).\n\n3. Angio-TK naczyń mózgowych (CTA) lub cyfrowa angiografia subtrakcyjna (DSA) – złoty standard lokalizacji i oceny anatomii tętniaka.\n\n4. Klasyfikacja kliniczna skalami: Hunta-Hessa (I–V), WFNS (I–V) oraz radiologiczna skala Fishera.",
      drugsAndDoses: "• Profilaktyka DCI i skurczu naczyniowego: <span class=\"dose-pill\">Nimodypina: 60 mg doustnie co 4 godziny</span> przez 21 dni (podawać przez zgłębnik w razie zaburzeń połykania).\n• Kontrola ciśnienia tętniczego przed zaopatrzeniem tętniaka (cel SBP <160 mmHg): <span class=\"dose-pill\">Labetalol: bolus 10–20 mg i.v.</span> lub <span class=\"dose-pill\">Urapidyl: 10–25 mg i.v.</span> powoli.\n• Analgezja: <span class=\"dose-pill\">Paracetamol: 1000 mg i.v.</span> co 6h, w razie potrzeby opioidy: <span class=\"dose-pill\">Morfina: 2–5 mg i.v.</span> (unikać NLPZ ze względu na ryzyko krwawienia!).\n• Profilaktyka zaparć: leki zmiękczające stolec (laktuloza), aby zapobiec wzrostowi ciśnienia w klatce i jamie brzusznej (próba Valsalvy).",
      procedures: "Pilna embolizacja wewnątrznaczyniowa (coiling) lub klipsowanie mikrochirurgiczne tętniaka w ciągu pierwszych 24–72 godzin; w razie ostrego wodogłowia pilny drenaż komorowy zewnętrzny (EVD).",
      monitoring: "Nadzór na OIT neurologiczno-neurochirurgicznym: monitorowanie GCS, parametrów życiowych, bilansu płynów (utrzymanie euwolemii), codzienny przezczaszkowy Doppler (TCD) w celu wczesnego wykrywania skurczu naczyniowego (prędkość w MCA >120–200 cm/s)."
    },
    diffTable: {
      title: "⚔️ Tabela Różnicowa: Krwawienie Podpajęczynówkowe (SAH) vs Krwotok Śródmózgowy (ICH) vs Zapalenie Opon Mózgowo-Rdzeniowych vs Piorunująca Migrena",
      headers: ["Cecha kliniczna", "Krwawienie Podpajęczynówkowe (SAH)", "Krwotok Śródmózgowy (ICH)", "Zapalenie Opon (ZOMR)", "Migrena Piorunująca"],
      rows: [
        ["Początek i tempo narastania", "Błyskawiczny, piorunujący (szczyt w sekundy)", "Ostry, w ciągu minut z narastającym ubytkiem", "Podostry, narasta w ciągu kilkunastu godzin/dni", "Narasta w ciągu kilku minut lub godzin"],
        ["Zespoły ogniskowe (niedowład)", "Początkowo rzadkie (chyba że krwiak śródmózgowy)", "Wybitne (niedowład połowiczy, afazja)", "Rzadkie we wczesnej fazie", "Brak niedowładów (chyba że migrena połowiczouderzeniowa)"],
        ["Sztywność karku / objawy oponowe", "Wybitne (mogą pojawić się po kilku godzinach)", "Zmienne (zależne od przebicia do komór)", "Wybitne, zawsze obecne z wysoką gorączką", "Brak sztywności karku"],
        ["Obraz w TK głowy", "Krew w przestrzeni podpajęczynówkowej i bruzdach", "Ognisko hiperdensyjne w miąższu mózgu", "Obraz zazwyczaj prawidłowy", "Prawidłowy obraz mózgowia"],
        ["Płyn mózgowo-rdzeniowy (LP)", "Ksantochromia w spektrofotometrii, erytrocytoza", "Możliwa domieszka krwi przy przebiciu", "Cytoza pleocytozowa, spadek glukozy, wysokie białko", "Płyn przejrzysty, bez komórek i ksantochromii"],
        ["Główne powikłanie późne", "Skurcz naczyniowy i opóźnione niedokrwienie (DCI)", "Obrzęk mózgu i wklinowanie", "Powikłania septyczne, ropień mózgu", "Nawrót napadu migrenowego"]
      ]
    },
    lekQuestions: [
      {
        q: "Co jest najważniejszym i najbardziej charakterystycznym objawem krwawienia podpajęczynówkowego (SAH) w wywiadzie chorobowym?",
        question: "Co jest najważniejszym i najbardziej charakterystycznym objawem krwawienia podpajęczynówkowego (SAH) w wywiadzie chorobowym?",
        opts: [
          "A) Nagły, niezwykle silny ból głowy osiągający natychmiast maksymalne nasilenie ('ból piorunujący' / thunderclap headache)",
          "B) Tępy, narastający od kilku tygodni poranny ból głowy z wymiotami na czczo",
          "C) Połowiczy ból głowy poprzedzony 30-minutowym mroczkiem migocącym w polu widzenia",
          "D) Pulsujący ból w okolicy skroniowej z bolesnością dotykową tętnicy skroniowej",
          "E) Kłujący ból twarzy w strefie unerwienia nerwu trójdzielnego wyzwalany dotykiem"
        ],
        options: [
          "A) Nagły, niezwykle silny ból głowy osiągający natychmiast maksymalne nasilenie ('ból piorunujący' / thunderclap headache)",
          "B) Tępy, narastający od kilku tygodni poranny ból głowy z wymiotami na czczo",
          "C) Połowiczy ból głowy poprzedzony 30-minutowym mroczkiem migocącym w polu widzenia",
          "D) Pulsujący ból w okolicy skroniowej z bolesnością dotykową tętnicy skroniowej",
          "E) Kłujący ból twarzy w strefie unerwienia nerwu trójdzielnego wyzwalany dotykiem"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Ból głowy o charakterze 'piorunującym' (thunderclap headache) – opisany przez pacjenta jako najsilniejszy ból w życiu, który osiąga szczytowe natężenie (10/10) w ułamku sekundy lub w ciągu kilkunastu sekund – jest kardynalnym objawem pęknięcia tętniaka w SAH.",
        expl: "Prawidłowo! Ból głowy o charakterze 'piorunującym' (thunderclap headache) – opisany przez pacjenta jako najsilniejszy ból w życiu, który osiąga szczytowe natężenie (10/10) w ułamku sekundy lub w ciągu kilkunastu sekund – jest kardynalnym objawem pęknięcia tętniaka w SAH.",
        explanation: "Prawidłowo! Ból głowy o charakterze 'piorunującym' (thunderclap headache) – opisany przez pacjenta jako najsilniejszy ból w życiu, który osiąga szczytowe natężenie (10/10) w ułamku sekundy lub w ciągu kilkunastu sekund – jest kardynalnym objawem pęknięcia tętniaka w SAH."
      },
      {
        q: "Do którego stopnia w skali Hunta-Hessa zalicza się pacjenta z krwawieniem podpajęczynówkowym, który jest w pełni przytomny, zorientowany (GCS 15), lecz zgłasza silny ból głowy i ma wyraźną sztywność karku bez niedowładów?",
        question: "Do którego stopnia w skali Hunta-Hessa zalicza się pacjenta z krwawieniem podpajęczynówkowym, który jest w pełni przytomny, zorientowany (GCS 15), lecz zgłasza silny ból głowy i ma wyraźną sztywność karku bez niedowładów?",
        opts: [
          "A) Stopień II",
          "B) Stopień I",
          "C) Stopień III",
          "D) Stopień IV",
          "E) Stopień V"
        ],
        options: [
          "A) Stopień II",
          "B) Stopień I",
          "C) Stopień III",
          "D) Stopień IV",
          "E) Stopień V"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Skala Hunta-Hessa: I – bezobjawowy lub minimalny ból i lekka sztywność karku; II – umiarkowany do ciężkiego ból głowy, sztywność karku, brak ubytków neurologicznych (poza możliwym porażeniem nerwów czaszkowych); III – senność, splątanie, łagodne objawy ogniskowe; IV – stupor, porażenie połowicze; V – głęboka śpiączka, odmóżdżenie.",
        expl: "Prawidłowo! Skala Hunta-Hessa: I – bezobjawowy lub minimalny ból i lekka sztywność karku; II – umiarkowany do ciężkiego ból głowy, sztywność karku, brak ubytków neurologicznych (poza możliwym porażeniem nerwów czaszkowych); III – senność, splątanie, łagodne objawy ogniskowe; IV – stupor, porażenie połowicze; V – głęboka śpiączka, odmóżdżenie.",
        explanation: "Prawidłowo! Skala Hunta-Hessa: I – bezobjawowy lub minimalny ból i lekka sztywność karku; II – umiarkowany do ciężkiego ból głowy, sztywność karku, brak ubytków neurologicznych (poza możliwym porażeniem nerwów czaszkowych); III – senność, splątanie, łagodne objawy ogniskowe; IV – stupor, porażenie połowicze; V – głęboka śpiączka, odmóżdżenie."
      },
      {
        q: "Jaki jest JEDYNY lek farmakologiczny o udowodnionym w badaniach klinicznych wpływie na poprawę rokowania neurologicznego i zmniejszenie ryzyka opóźnionego niedokrwienia mózgu (DCI) u chorych z SAH?",
        question: "Jaki jest JEDYNY lek farmakologiczny o udowodnionym w badaniach klinicznych wpływie na poprawę rokowania neurologicznego i zmniejszenie ryzyka opóźnionego niedokrwienia mózgu (DCI) u chorych z SAH?",
        opts: [
          "A) Nimodypina podawana doustnie w dawce 60 mg co 4 godziny przez 21 dni",
          "B) Amlodypina podawana dożylnie w stałym wlewie 5 mg na dobę",
          "C) Kwas acetylosalicylowy podawany doodbytniczo w dawce nasycającej 300 mg",
          "D) Metyloprednizolon w pulsach 1000 mg przez kolejne 5 dni",
          "E) Fenytoina stosowana profilaktycznie u każdego pacjenta przez 6 miesięcy"
        ],
        options: [
          "A) Nimodypina podawana doustnie w dawce 60 mg co 4 godziny przez 21 dni",
          "B) Amlodypina podawana dożylnie w stałym wlewie 5 mg na dobę",
          "C) Kwas acetylosalicylowy podawany doodbytniczo w dawce nasycającej 300 mg",
          "D) Metyloprednizolon w pulsach 1000 mg przez kolejne 5 dni",
          "E) Fenytoina stosowana profilaktycznie u każdego pacjenta przez 6 miesięcy"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Doustna nimodypina (60 mg co 4h przez 21 dni) jest lekiem o najwyższej klasie zaleceń (Klasa I, Poziom A) w międzynarodowych wytycznych leczenia SAH. Zmniejsza częstość występowania opóźnionego niedokrwienia mózgu (DCI) oraz poprawia przeżywalność i stan funkcjonalny chorych.",
        expl: "Prawidłowo! Doustna nimodypina (60 mg co 4h przez 21 dni) jest lekiem o najwyższej klasie zaleceń (Klasa I, Poziom A) w międzynarodowych wytycznych leczenia SAH. Zmniejsza częstość występowania opóźnionego niedokrwienia mózgu (DCI) oraz poprawia przeżywalność i stan funkcjonalny chorych.",
        explanation: "Prawidłowo! Doustna nimodypina (60 mg co 4h przez 21 dni) jest lekiem o najwyższej klasie zaleceń (Klasa I, Poziom A) w międzynarodowych wytycznych leczenia SAH. Zmniejsza częstość występowania opóźnionego niedokrwienia mózgu (DCI) oraz poprawia przeżywalność i stan funkcjonalny chorych."
      },
      {
        q: "Wskaż zestaw twierdzeń PRAWDZIWYCH dotyczących krwawienia podpajęczynówkowego (SAH):\n1. Najczęstszą lokalizacją pękniętych tętniaków mózgu jest tętnica łącząca przednia (AComA).\n2. Czułość tomografii komputerowej bez kontrastu w wykrywaniu SAH w pierwszych 6h wynosi niemal 100%.\n3. Nakłucie lędźwiowe w celu oceny ksantochromii powinno być wykonane po co najmniej 12h od początku bólu.\n4. Rutynowa profilaktyka przeciwdrgawkowa fenytoiną jest bezwzględnie zalecana u każdego chorego na okres 1 roku.\n5. Szczyt występowania skurczu naczyniowego (vasospasmu) przypada między 4. a 14. dniem po krwotoku.",
        question: "Wskaż zestaw twierdzeń PRAWDZIWYCH dotyczących krwawienia podpajęczynówkowego (SAH):\n1. Najczęstszą lokalizacją pękniętych tętniaków mózgu jest tętnica łącząca przednia (AComA).\n2. Czułość tomografii komputerowej bez kontrastu w wykrywaniu SAH w pierwszych 6h wynosi niemal 100%.\n3. Nakłucie lędźwiowe w celu oceny ksantochromii powinno być wykonane po co najmniej 12h od początku bólu.\n4. Rutynowa profilaktyka przeciwdrgawkowa fenytoiną jest bezwzględnie zalecana u każdego chorego na okres 1 roku.\n5. Szczyt występowania skurczu naczyniowego (vasospasmu) przypada między 4. a 14. dniem po krwotoku.",
        opts: [
          "A) 1, 2, 3, 5",
          "B) 1, 2, 4",
          "C) 2, 3, 4, 5",
          "D) 1, 3, 4",
          "E) Tylko 1 i 5"
        ],
        options: [
          "A) 1, 2, 3, 5",
          "B) 1, 2, 4",
          "C) 2, 3, 4, 5",
          "D) 1, 3, 4",
          "E) Tylko 1 i 5"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Zdania 1, 2, 3 i 5 są prawdziwe. Zdanie 4 jest fałszywe: rutynowa długoterminowa profilaktyka przeciwpadaczkowa nie jest zalecana i może pogarszać rokowanie poznawcze (stosuje się ją jedynie krótkoterminowo w fazie ostrej lub po wystąpieniu napadu drgawkowego).",
        expl: "Prawidłowo! Zdania 1, 2, 3 i 5 są prawdziwe. Zdanie 4 jest fałszywe: rutynowa długoterminowa profilaktyka przeciwpadaczkowa nie jest zalecana i może pogarszać rokowanie poznawcze (stosuje się ją jedynie krótkoterminowo w fazie ostrej lub po wystąpieniu napadu drgawkowego).",
        explanation: "Prawidłowo! Zdania 1, 2, 3 i 5 są prawdziwe. Zdanie 4 jest fałszywe: rutynowa długoterminowa profilaktyka przeciwpadaczkowa nie jest zalecana i może pogarszać rokowanie poznawcze (stosuje się ją jedynie krótkoterminowo w fazie ostrej lub po wystąpieniu napadu drgawkowego)."
      },
      {
        q: "Wskaż zdanie FAŁSZYWE dotyczące postępowania z chorym z krwawieniem podpajęczynówkowym (SAH):",
        question: "Wskaż zdanie FAŁSZYWE dotyczące postępowania z chorym z krwawieniem podpajęczynówkowym (SAH):",
        opts: [
          "A) Ujemny wynik badania tomografii komputerowej głowy wykonanej po 24 godzinach od początku bólu całkowicie wyklucza SAH",
          "B) Przed chirurgicznym lub wewnątrznaczyniowym zabezpieczeniem tętniaka zaleca się utrzymywanie ciśnienia skurczowego <160 mmHg",
          "C) Ponowne krwawienie z tętniaka (rebleeding) występuje najczęściej w ciągu pierwszych 24 godzin i wiąże się z bardzo wysoką śmiertelnością",
          "D) Porażenie nerwu okoruchowego (III nerwu czaszkowego) z rozszerzeniem źrenicy może zwiastować tętniaka tętnicy łączącej tylnej (PComA)",
          "E) Ostre wodogłowie komunikujące lub niekomunikujące jest częstym powikłaniem wczesnym wymagającym założenia drenażu komorowego (EVD)"
        ],
        options: [
          "A) Ujemny wynik badania tomografii komputerowej głowy wykonanej po 24 godzinach od początku bólu całkowicie wyklucza SAH",
          "B) Przed chirurgicznym lub wewnątrznaczyniowym zabezpieczeniem tętniaka zaleca się utrzymywanie ciśnienia skurczowego <160 mmHg",
          "C) Ponowne krwawienie z tętniaka (rebleeding) występuje najczęściej w ciągu pierwszych 24 godzin i wiąże się z bardzo wysoką śmiertelnością",
          "D) Porażenie nerwu okoruchowego (III nerwu czaszkowego) z rozszerzeniem źrenicy może zwiastować tętniaka tętnicy łączącej tylnej (PComA)",
          "E) Ostre wodogłowie komunikujące lub niekomunikujące jest częstym powikłaniem wczesnym wymagającym założenia drenażu komorowego (EVD)"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Zdanie A jest fałszywe. Czułość TK głowy spada z upływem czasu (po 24h wynosi ok. 90%, po 3 dniach ok. 80%, a po tygodniu <50% z powodu lizy krwinek i przepływu płynu mózgowo-rdzeniowego). Ujemny wynik TK wykonanej po 6h NIGDY nie wyklucza SAH i bezwzględnie wymaga wykonania nakłucia lędźwiowego (LP).",
        expl: "Prawidłowo! Zdanie A jest fałszywe. Czułość TK głowy spada z upływem czasu (po 24h wynosi ok. 90%, po 3 dniach ok. 80%, a po tygodniu <50% z powodu lizy krwinek i przepływu płynu mózgowo-rdzeniowego). Ujemny wynik TK wykonanej po 6h NIGDY nie wyklucza SAH i bezwzględnie wymaga wykonania nakłucia lędźwiowego (LP).",
        explanation: "Prawidłowo! Zdanie A jest fałszywe. Czułość TK głowy spada z upływem czasu (po 24h wynosi ok. 90%, po 3 dniach ok. 80%, a po tygodniu <50% z powodu lizy krwinek i przepływu płynu mózgowo-rdzeniowego). Ujemny wynik TK wykonanej po 6h NIGDY nie wyklucza SAH i bezwzględnie wymaga wykonania nakłucia lędźwiowego (LP)."
      },
      {
        q: "Przytomny pacjent na SOR z piorunującym bólem głowy i ujemną tomografią komputerową wykonaną po 10 godzinach odmawia wykonania nakłucia lędźwiowego. Jakie są prawne i etyczne obowiązki lekarza?",
        question: "Przytomny pacjent na SOR z piorunującym bólem głowy i ujemną tomografią komputerową wykonaną po 10 godzinach odmawia wykonania nakłucia lędźwiowego. Jakie są prawne i etyczne obowiązki lekarza?",
        opts: [
          "A) Wyczerpująco poinformować pacjenta o ryzyku przeoczenia tętniaka i zgonu w wyniku ponownego krwotoku oraz udokumentować świadomą odmowę na piśmie",
          "B) Zastosować przymus bezpośredni i wykonać punkcję lędźwiową w asyście policji",
          "C) Podać pacjentowi dożylnie propofol i wykonać procedurę bez jego wiedzy",
          "D) Natychmiast wezwać prokuratora dyżurnego w celu wydania nakazu aresztowania chorego",
          "E) Skreślić pacjenta z listy ubezpieczonych w Narodowym Funduszu Zdrowia"
        ],
        options: [
          "A) Wyczerpująco poinformować pacjenta o ryzyku przeoczenia tętniaka i zgonu w wyniku ponownego krwotoku oraz udokumentować świadomą odmowę na piśmie",
          "B) Zastosować przymus bezpośredni i wykonać punkcję lędźwiową w asyście policji",
          "C) Podać pacjentowi dożylnie propofol i wykonać procedurę bez jego wiedzy",
          "D) Natychmiast wezwać prokuratora dyżurnego w celu wydania nakazu aresztowania chorego",
          "E) Skreślić pacjenta z listy ubezpieczonych w Narodowym Funduszu Zdrowia"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Każdy dorosły i w pełni zdolny do podejmowania decyzji pacjent ma prawo odmówić procedury diagnostycznej. Obowiązkiem lekarza jest rzetelne wyjaśnienie konsekwencji zaniechania (ryzyko nierozpoznania tętniaka, ponownego krwawienia ze śmiertelnością 70%), zaproponowanie alternatywy (np. pilne angio-TK / angio-MRI) oraz sporządzenie pisemnej odmowy podpisanej przez chorego.",
        expl: "Prawidłowo! Każdy dorosły i w pełni zdolny do podejmowania decyzji pacjent ma prawo odmówić procedury diagnostycznej. Obowiązkiem lekarza jest rzetelne wyjaśnienie konsekwencji zaniechania (ryzyko nierozpoznania tętniaka, ponownego krwawienia ze śmiertelnością 70%), zaproponowanie alternatywy (np. pilne angio-TK / angio-MRI) oraz sporządzenie pisemnej odmowy podpisanej przez chorego.",
        explanation: "Prawidłowo! Każdy dorosły i w pełni zdolny do podejmowania decyzji pacjent ma prawo odmówić procedury diagnostycznej. Obowiązkiem lekarza jest rzetelne wyjaśnienie konsekwencji zaniechania (ryzyko nierozpoznania tętniaka, ponownego krwawienia ze śmiertelnością 70%), zaproponowanie alternatywy (np. pilne angio-TK / angio-MRI) oraz sporządzenie pisemnej odmowy podpisanej przez chorego."
      },
      {
        q: "Co to jest wylew Tersona (zespół Tersona) występujący w przebiegu krwawienia podpajęczynówkowego?",
        question: "Co to jest wylew Tersona (zespół Tersona) występujący w przebiegu krwawienia podpajęczynówkowego?",
        opts: [
          "A) Krwotok przedsiatkówkowy, podsiatkówkowy lub do ciała szklistego oka wywołany gwałtownym wzrostem ciśnienia śródczaszkowego",
          "B) Wybroczyny krwawe w błonie śluzowej żołądka z następową perforacją",
          "C) Krwawienie podtorebkowe śledziony połączone z zawałem dolnego bieguna narządu",
          "D) Wynaczynienie krwi do przestrzeni zaotrzewnowej wzdłuż mięśnia biodrowego",
          "E) Pęknięcie pęcherzyka płucnego z powstaniem odmy opłucnowej"
        ],
        options: [
          "A) Krwotok przedsiatkówkowy, podsiatkówkowy lub do ciała szklistego oka wywołany gwałtownym wzrostem ciśnienia śródczaszkowego",
          "B) Wybroczyny krwawe w błonie śluzowej żołądka z następową perforacją",
          "C) Krwawienie podtorebkowe śledziony połączone z zawałem dolnego bieguna narządu",
          "D) Wynaczynienie krwi do przestrzeni zaotrzewnowej wzdłuż mięśnia biodrowego",
          "E) Pęknięcie pęcherzyka płucnego z powstaniem odmy opłucnowej"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Zespół Tersona to wylewy krwi do ciała szklistego, podsiatkówkowe lub przedsiatkówkowe u chorych z SAH (występuje u ok. 10–20% pacjentów). Wynika z nagłego wzrostu ciśnienia śródczaszkowego (ICP), co hamuje powrót żylny z siatkówki i powoduje pękanie naczyń włosowatych oka. Wiąże się z gorszym rokowaniem klinicznym.",
        expl: "Prawidłowo! Zespół Tersona to wylewy krwi do ciała szklistego, podsiatkówkowe lub przedsiatkówkowe u chorych z SAH (występuje u ok. 10–20% pacjentów). Wynika z nagłego wzrostu ciśnienia śródczaszkowego (ICP), co hamuje powrót żylny z siatkówki i powoduje pękanie naczyń włosowatych oka. Wiąże się z gorszym rokowaniem klinicznym.",
        explanation: "Prawidłowo! Zespół Tersona to wylewy krwi do ciała szklistego, podsiatkówkowe lub przedsiatkówkowe u chorych z SAH (występuje u ok. 10–20% pacjentów). Wynika z nagłego wzrostu ciśnienia śródczaszkowego (ICP), co hamuje powrót żylny z siatkówki i powoduje pękanie naczyń włosowatych oka. Wiąże się z gorszym rokowaniem klinicznym."
      },
      {
        q: "Które zaburzenie elektrolitowe jest NAJCZĘSTSZE u chorych w ostrej fazie krwawienia podpajęczynówkowego i jaki mechanizm odpowiada za jego powstanie?",
        question: "Które zaburzenie elektrolitowe jest NAJCZĘSTSZE u chorych w ostrej fazie krwawienia podpajęczynówkowego i jaki mechanizm odpowiada za jego powstanie?",
        opts: [
          "A) Hiponatremia wywołana zespołem mózgowej utraty soli (CSW) lub zespołem SIADH",
          "B) Ciężka hiperkaliemia wywołana rozpadem mięśni prążkowanych (rabdomiolizą)",
          "C) Pierwotna hiperkalcemia z kamicą moczowodową i hiperfosfatemią",
          "D) Czysta hiperchloremia z zasadowicą oddechową",
          "E) Izolowany spadek stężenia żelaza w surowicy krwi"
        ],
        options: [
          "A) Hiponatremia wywołana zespołem mózgowej utraty soli (CSW) lub zespołem SIADH",
          "B) Ciężka hiperkaliemia wywołana rozpadem mięśni prążkowanych (rabdomiolizą)",
          "C) Pierwotna hiperkalcemia z kamicą moczowodową i hiperfosfatemią",
          "D) Czysta hiperchloremia z zasadowicą oddechową",
          "E) Izolowany spadek stężenia żelaza w surowicy krwi"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Hiponatremia występuje u ok. 30–50% chorych z SAH. Może wynikać z zespołu mózgowej utraty soli (Cerebral Salt Wasting – CSW, przebiegającego z hipowolemią) lub nieadekwatnego wydzielania wazopresyny (SIADH, przebiegającego z euwolemią/hiperwolemią). Kluczowe jest różnicowanie, gdyż w CSW podaje się roztwory NaCl i uzupełnia wolemię, a restrykcja płynowa w SAH grozi zawałem mózgu!",
        expl: "Prawidłowo! Hiponatremia występuje u ok. 30–50% chorych z SAH. Może wynikać z zespołu mózgowej utraty soli (Cerebral Salt Wasting – CSW, przebiegającego z hipowolemią) lub nieadekwatnego wydzielania wazopresyny (SIADH, przebiegającego z euwolemią/hiperwolemią). Kluczowe jest różnicowanie, gdyż w CSW podaje się roztwory NaCl i uzupełnia wolemię, a restrykcja płynowa w SAH grozi zawałem mózgu!",
        explanation: "Prawidłowo! Hiponatremia występuje u ok. 30–50% chorych z SAH. Może wynikać z zespołu mózgowej utraty soli (Cerebral Salt Wasting – CSW, przebiegającego z hipowolemią) lub nieadekwatnego wydzielania wazopresyny (SIADH, przebiegającego z euwolemią/hiperwolemią). Kluczowe jest różnicowanie, gdyż w CSW podaje się roztwory NaCl i uzupełnia wolemię, a restrykcja płynowa w SAH grozi zawałem mózgu!"
      },
      {
        q: "Jakie badanie nieinwazyjne przyłóżkowe pozwala na codzienne monitorowanie rozwoju skurczu naczyniowego (vasospasmu) u pacjenta na oddziale intensywnej terapii po SAH?",
        question: "Jakie badanie nieinwazyjne przyłóżkowe pozwala na codzienne monitorowanie rozwoju skurczu naczyniowego (vasospasmu) u pacjenta na oddziale intensywnej terapii po SAH?",
        opts: [
          "A) Ultrasonografia przezczaszkowa Doppler (TCD) z oceną średniej prędkości przepływu krwi w tętnicy środkowej mózgu (MCA)",
          "B) Rutynowa spirometria z oceną wskaźnika Tiffeneau i FVC",
          "C) Elektrokardiograficzny test wysiłkowy na bieżni ruchomej",
          "D) Przeglądowe USG tarczycy z oceną objętości obu płatów",
          "E) Badanie potencjałów wywołanych wzrokowych (VEP)"
        ],
        options: [
          "A) Ultrasonografia przezczaszkowa Doppler (TCD) z oceną średniej prędkości przepływu krwi w tętnicy środkowej mózgu (MCA)",
          "B) Rutynowa spirometria z oceną wskaźnika Tiffeneau i FVC",
          "C) Elektrokardiograficzny test wysiłkowy na bieżni ruchomej",
          "D) Przeglądowe USG tarczycy z oceną objętości obu płatów",
          "E) Badanie potencjałów wywołanych wzrokowych (VEP)"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Przezczaszkowa ultrasonografia Dopplerowska (TCD) to standard nieinwazyjnego monitorowania skurczu naczyń. Zwężenie światła tętnicy środkowej mózgu (MCA) skutkuje przyspieszeniem średniej prędkości przepływu (mean flow velocity – MFV >120 cm/s oznacza łagodny skurcz, a >200 cm/s ciężki skurcz naczyniowy). Stosuje się również wskaźnik Lindegaarda (stosunek MFV w MCA do MFV w zewnątrzczaszkowej tętnicy szyjnej wewnętrznej >3–6).",
        expl: "Prawidłowo! Przezczaszkowa ultrasonografia Dopplerowska (TCD) to standard nieinwazyjnego monitorowania skurczu naczyń. Zwężenie światła tętnicy środkowej mózgu (MCA) skutkuje przyspieszeniem średniej prędkości przepływu (mean flow velocity – MFV >120 cm/s oznacza łagodny skurcz, a >200 cm/s ciężki skurcz naczyniowy). Stosuje się również wskaźnik Lindegaarda (stosunek MFV w MCA do MFV w zewnątrzczaszkowej tętnicy szyjnej wewnętrznej >3–6).",
        explanation: "Prawidłowo! Przezczaszkowa ultrasonografia Dopplerowska (TCD) to standard nieinwazyjnego monitorowania skurczu naczyń. Zwężenie światła tętnicy środkowej mózgu (MCA) skutkuje przyspieszeniem średniej prędkości przepływu (mean flow velocity – MFV >120 cm/s oznacza łagodny skurcz, a >200 cm/s ciężki skurcz naczyniowy). Stosuje się również wskaźnik Lindegaarda (stosunek MFV w MCA do MFV w zewnątrzczaszkowej tętnicy szyjnej wewnętrznej >3–6)."
      },
      {
        q: "Co oznacza stopień 3 w radiologicznej skali Fishera oceniającej obraz krwawienia podpajęczynówkowego w tomografii komputerowej?",
        question: "Co oznacza stopień 3 w radiologicznej skali Fishera oceniającej obraz krwawienia podpajęczynówkowego w tomografii komputerowej?",
        opts: [
          "A) Obecność zwartego krwiaka podpajęczynówkowego o grubości powyżej 1 mm w bruzdach lub zbiornikach podstawy mózgu (wysokie ryzyko skurczu naczyniowego)",
          "B) Całkowity brak jakiejkolwiek krwi w przestrzeni wewnątrzczaszkowej",
          "C) Izolowane krwawienie śródkomorowe bez krwi w bruzdach mózgu",
          "D) Pęknięcie kości potylicznej z krwiakiem podczepcowym",
          "E) Obecność mnogich ognisk stwardnienia rozsianego w istocie białej"
        ],
        options: [
          "A) Obecność zwartego krwiaka podpajęczynówkowego o grubości powyżej 1 mm w bruzdach lub zbiornikach podstawy mózgu (wysokie ryzyko skurczu naczyniowego)",
          "B) Całkowity brak jakiejkolwiek krwi w przestrzeni wewnątrzczaszkowej",
          "C) Izolowane krwawienie śródkomorowe bez krwi w bruzdach mózgu",
          "D) Pęknięcie kości potylicznej z krwiakiem podczepcowym",
          "E) Obecność mnogich ognisk stwardnienia rozsianego w istocie białej"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Skala Fishera ocenia ryzyko skurczu naczyniowego na podstawie ilości krwi w TK: Stopień 1 – brak widocznej krwi; Stopień 2 – krew rozproszona, warstwa <1 mm; Stopień 3 – zwarty skrzep podpajęczynówkowy >1 mm grubości (najwyższe ryzyko objawowego vasospasmu!); Stopień 4 – krwiak śródmózgowy lub śródkomorowy przy braku gęstego krwiaka w zbiornikach.",
        expl: "Prawidłowo! Skala Fishera ocenia ryzyko skurczu naczyniowego na podstawie ilości krwi w TK: Stopień 1 – brak widocznej krwi; Stopień 2 – krew rozproszona, warstwa <1 mm; Stopień 3 – zwarty skrzep podpajęczynówkowy >1 mm grubości (najwyższe ryzyko objawowego vasospasmu!); Stopień 4 – krwiak śródmózgowy lub śródkomorowy przy braku gęstego krwiaka w zbiornikach.",
        explanation: "Prawidłowo! Skala Fishera ocenia ryzyko skurczu naczyniowego na podstawie ilości krwi w TK: Stopień 1 – brak widocznej krwi; Stopień 2 – krew rozproszona, warstwa <1 mm; Stopień 3 – zwarty skrzep podpajęczynówkowy >1 mm grubości (najwyższe ryzyko objawowego vasospasmu!); Stopień 4 – krwiak śródmózgowy lub śródkomorowy przy braku gęstego krwiaka w zbiornikach."
      },
      {
        q: "Jakie zmiany w zapisie elektrokardiograficznym (EKG) mogą imitować ostry zespół wieńcowy u chorych z krwawieniem podpajęczynówkowym w wyniku tzw. 'burzy katecholaminowej'?",
        question: "Jakie zmiany w zapisie elektrokardiograficznym (EKG) mogą imitować ostry zespół wieńcowy u chorych z krwawieniem podpajęczynówkowym w wyniku tzw. 'burzy katecholaminowej'?",
        opts: [
          "A) Głębokie, ujemne i szerokie załamki T ('cerebral T waves'), wydłużenie odstępu QTc oraz uniesienia lub obniżenia odcinka ST",
          "B) Prawidłowy rytm zatokowy bez jakichkolwiek odchyleń od normy",
          "C) Zespół preekscytacji Wolffa-Parkinsona-White'a z falą delta",
          "D) Izolowane skrócenie odstępu PQ poniżej 80 milisekund",
          "E) Wystąpienie bloku prawej odnogi pęczka Hisa z prawogramem"
        ],
        options: [
          "A) Głębokie, ujemne i szerokie załamki T ('cerebral T waves'), wydłużenie odstępu QTc oraz uniesienia lub obniżenia odcinka ST",
          "B) Prawidłowy rytm zatokowy bez jakichkolwiek odchyleń od normy",
          "C) Zespół preekscytacji Wolffa-Parkinsona-White'a z falą delta",
          "D) Izolowane skrócenie odstępu PQ poniżej 80 milisekund",
          "E) Wystąpienie bloku prawej odnogi pęczka Hisa z prawogramem"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Masywny wyrzut katecholamin ze współczulnego układu nerwowego w SAH wywołuje uszkodzenie miocytów serca (neurogenne ogłuszenie mięśnia sercowego, zespół takotsubo). W EKG obserwuje się głębokie, odwrócone załamki T (tzw. załamki mózgowe – cerebral T waves), wydłużenie QTc, uniesienia lub obniżenia ST oraz uniesienie troponin, co często błędnie sugeruje zawał STEMI/NSTEMI.",
        expl: "Prawidłowo! Masywny wyrzut katecholamin ze współczulnego układu nerwowego w SAH wywołuje uszkodzenie miocytów serca (neurogenne ogłuszenie mięśnia sercowego, zespół takotsubo). W EKG obserwuje się głębokie, odwrócone załamki T (tzw. załamki mózgowe – cerebral T waves), wydłużenie QTc, uniesienia lub obniżenia ST oraz uniesienie troponin, co często błędnie sugeruje zawał STEMI/NSTEMI.",
        explanation: "Prawidłowo! Masywny wyrzut katecholamin ze współczulnego układu nerwowego w SAH wywołuje uszkodzenie miocytów serca (neurogenne ogłuszenie mięśnia sercowego, zespół takotsubo). W EKG obserwuje się głębokie, odwrócone załamki T (tzw. załamki mózgowe – cerebral T waves), wydłużenie QTc, uniesienia lub obniżenia ST oraz uniesienie troponin, co często błędnie sugeruje zawał STEMI/NSTEMI."
      }
    ],
    flashcards: [
      { q: "Jaki jest klasyczny wywiad bólowy w krwawieniu podpajęczynówkowym (SAH)?", a: "Nagły 'ból piorunujący' (thunderclap headache) osiągający maksymalne natężenie w ułamku sekundy, często opisywany jako 'najgorszy ból w życiu'." },
      { q: "Co należy zrobić, gdy TK głowy u pacjenta z bólem piorunującym po 8h jest ujemna?", a: "Wykonać nakłucie lędźwiowe (LP) po 12h od początku bólu w celu oceny ksantochromii płynu mózgowo-rdzeniowego." },
      { q: "W jakim oknie czasowym należy zabezpieczyć pęknięty tętniak mózgu?", a: "Pilnie w ciągu pierwszych 24–72 godzin od początku krwawienia (coiling lub klipsowanie)." },
      { q: "Jaki lek doustny poprawia rokowanie neurologiczne w SAH?", a: "Nimodypina w dawce 60 mg doustnie co 4 godziny przez 21 dni." },
      { q: "Kiedy przypada szczyt skurczu naczyniowego (vasospasmu) w SAH?", a: "Między 4. a 14. dniem od początku krwawienia podpajęczynówkowego." },
      { q: "Co oznacza objaw Tersona?", a: "Krwawienie podsiatkówkowe lub do ciała szklistego oka towarzyszące ostremu SAH." }
    ]
  }
];

async function run() {
  console.log('Writing and encrypting Cases 157 and 158...');
  for (const c of casesData) {
    const enc = await encryptStringAes(JSON.stringify(c, null, 2), MASTER_KEY);
    fs.writeFileSync(path.join('cases', c.file), JSON.stringify(enc, null, 2), 'utf8');
    console.log(`✓ Case #${c.id} (${c.file}) saved and encrypted.`);
  }
}

run().catch(console.error);

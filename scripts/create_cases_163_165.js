const fs = require('fs');
const path = require('path');
const { encryptStringAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

const casesData = [
  // =========================================================================
  // CASE 163: Ostre Zamknięcie Kąta Przesączania (Jaskra Ostra)
  // =========================================================================
  {
    id: 163,
    file: "163_ostre_zamkniecie_kata_jaskra.json",
    shortTitle: "Ostre Zamknięcie Kąta (Jaskra)",
    title: "Okulistyczny Stan Nagły: Ostre Zamknięcie Kąta Przesączania (Ostra Jaskra)",
    dept: "Okulistyka",
    diagnosisTitle: "Ostre Zamknięcie Kąta Przesączania z Krytycznym Nadciśnieniem Śródgałkowym (Jaskra Ostra)",
    vitals: [
      { label: "Ciśnienie tętnicze (RR)", val: "155/90", unit: "mmHg", status: "vital-warn" },
      { label: "Częstość akcji serca (HR)", val: "86", unit: "/min", status: "vital-ok" },
      { label: "Częstość oddechów (RR)", val: "16", unit: "/min", status: "vital-ok" },
      { label: "Saturacja (SpO2)", val: "99", unit: "%", status: "vital-ok" },
      { label: "Temperatura ciała", val: "36.8", unit: "°C", status: "vital-ok" }
    ],
    story: "<p><strong>Pacjent:</strong> 64-letnia kobieta zgłasza się na SOR z powodu nagłego, rozdzierającego bólu prawego oka i prawej połowy głowy.</p><p><strong>Wywiad chorobowy:</strong> Dolegliwości wystąpiły nagle 3 godziny temu podczas seansu w ciemnej sali kinowej. Pacjentka poczuła gwałtowny, potężny ból w prawym oku promieniujący do skroni, oczodołu i potylicy. Równolegle wystąpił gwałtowny spadek ostrości wzroku (widzenie za mgłą), widzenie tęczowych kół (efekt halo) wokół źródeł światła oraz silne nudności i trzykrotne wymioty treścią żołądkową. W wywiadzie okulistycznym: nadwzroczność (+3,5 Dpt w obu oczach), dotychczas nie badała kąta przesączania.</p><p><strong>Badanie przedmiotowe:</strong> Pacjentka zwija się z bólu, trzyma rękę na prawym oku. W badaniu okulistycznym prawego oka: powieki obrzęknięte, silne przekrwienie okołorąbkowe (rzęskowe), rogówka matowa, obrzęknięta, tracąca połysk (\"obraz zamglonej szyby\"), komora przednia skrajnie spłycona. Źrenica prawa średnio szeroka (ok. 5–6 mm), owalna, pionowo wydłużona, całkowicie sztywna na światło. W badaniu palpacyjnym przez zamknięte powieki: prawe oko twarde jak kamień w porównaniu z okiem lewym. Ciśnienie wewnątrzgałkowe (IOP) w tonometrii aplanacyjnej w oku prawym wynosi 68 mmHg (norma 10–21 mmHg), w oku lewym 18 mmHg.</p>",
    steps: [
      {
        title: "Krok 1: Natychmiastowa farmakoterapia obniżająca ciśnienie śródgałkowe (IOP)",
        scenario: "Ciśnienie w chorym oku wynosi 68 mmHg, a rogówka jest obrzęknięta. Utrzymywanie się tak wysokiego ciśnienia grozi nieodwracalnym zanikiem nerwu wzrokowego w ciągu kilku godzin. Jaki zestaw leków hipotensyjnych o działaniu ogólnym i miejscowym należy podać natychmiast?",
        options: [
          {
            text: "Acetazolamid 500 mg i.v. (inhibitor anhydrazy węglanowej), 20% mannitol i.v. we wlewie oraz miejscowe krople hipotensyjne (beta-bloker: tymolol 0,5% + alfa-2-agonista: brymonidyna)",
            correct: true,
            isCorrect: true,
            feedback: "✅ PRAWIDŁOWO! Natychmiastowe leczenie ostrego ataku jaskry wymaga równoczesnego zahamowania produkcji cieczy wodnistej (acetazolamid dożylnie, krople z tymololem i brymonidyną) oraz osmotycznego odwodnienia ciała szklistego (mannitol 20% i.v. 1–2 g/kg w ciągu 30–45 min). Pozwala to szybko obniżyć krytyczne ciśnienie śródgałkowe."
          },
          {
            text: "Miejscowe podanie kropli z atropiny 1% co 15 minut w celu zniesienia skurczu ciała rzęskowego",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Atropina i inne leki rozszerzające źrenicę (mydriatyki) są BEZWZGLĘDNIE ZAKAZANE – rozszerzenie źrenicy całkowicie blokuje kąt przesączania i powoduje trwałą ślepotę!"
          },
          {
            text: "Doustne podanie 1000 mg paracetamolu i odesłanie pacjentki do poradni rejonowej w kolejnym tygodniu",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Ostre zamknięcie kąta to stan nagły; brak natychmiastowego obniżenia IOP doprowadzi do nieodwracalnej utraty wzroku."
          },
          {
            text: "Podanie dożylne wlewu z furosemidu w skojarzeniu z witaminą A w maści do worka spojówkowego",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Furosemid nie obniża skutecznie ciśnienia wewnątrzgałkowego i opóźnia podanie leków celowanych."
          }
        ]
      },
      {
        title: "Krok 2: Właściwy moment podania pilokarpiny (miotyku)",
        scenario: "Lekarz rezydent chce natychmiast podać krople z pilokarpiny 2% w celu zwężenia źrenicy. Dlaczego pilokarpina podana przy wyjściowym ciśnieniu śródgałkowym >50–60 mmHg jest całkowicie nieskuteczna?",
        options: [
          {
            text: "Ponieważ przy ciśnieniu śródgałkowym >50–60 mmHg dochodzi do niedokrwienia i porażenia zwieracza źrenicy; pilokarpinę podaje się dopiero po wstępnym obniżeniu IOP <40–50 mmHg",
            correct: true,
            isCorrect: true,
            feedback: "✅ PRAWIDŁOWO! Skrajne nadciśnienie śródgałkowe (>50 mmHg) uciska naczynia tęczówki, wywołując niedokrwienną martwicę i porażenie mięśnia zwieracza źrenicy. Pilokarpina nie zadziała na porażony zwieracz, a częste jej zakraplanie w ostrej fazie może wywołać ogólnoustrojowe objawy toksyczności cholinergicznej. Pilokarpinę 1–2% włącza się dopiero po obniżeniu IOP lekami ogólnymi."
          },
          {
            text: "Ponieważ pilokarpina rozszerza źrenicę i pogłębia blokadę kąta",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Pilokarpina jest miotykiem (zwęża źrenicę), a nie mydriatykiem."
          },
          {
            text: "Ponieważ pilokarpina wchodzi w reakcję chemiczną z mannitolem, tworząc toksyczne sole w rogówce",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Pomiędzy pilokarpiną a mannitolem nie zachodzi żadna toksyczna reakcja chemiczna."
          },
          {
            text: "Ponieważ lek ten wolno podawać wyłącznie dzieciom poniżej 10. roku życia",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Pilokarpina jest standardowym lekiem u dorosłych w jaskrze."
          }
        ]
      },
      {
        title: "Krok 3: Identyfikacja bezwzględnych przeciwwskazań lekowych",
        scenario: "Pacjentka zgłasza silne nudności i wymioty. Jaka grupa leków przeciwwymiotnych lub rozkurczowych jest BEZWZGLĘDNIE PRZECIWWSKAZANA u pacjentów z podejrzeniem wąskiego kąta lub ostrym atakiem jaskry?",
        options: [
          {
            text: "Leki o działaniu cholinolitycznym / parasympatykolitycznym (np. hioscyna, atropina) oraz leki rozszerzające źrenicę",
            correct: true,
            isCorrect: true,
            feedback: "✅ PRAWIDŁOWO! Leki cholinolityczne (antagoniści receptorów muskarynowych, np. atropina, hioscyna) oraz leki sympatykomimetyczne rozszerzają źrenicę. Zwiotczała nasada tęczówki fałduje się i zostaje wepchnięta w kąt przesączania, całkowicie blokując utkanie beleczkowe i zamykając odpływ cieczy wodnistej."
          },
          {
            text: "Ondansetron podawany dożylnie w dawce 4 mg",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Ondansetron jest bezpiecznym lekiem przeciwwymiotnym w jaskrze (nie ma wpływu na źrenicę)."
          },
          {
            text: "Inhibitory pompy protonowej (pantoprazol) podawane doustnie",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! IPP nie wpływają na ciśnienie wewnątrzgałkowe."
          },
          {
            text: "Paracetamol podawany dożylnie w dawce 1000 mg",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Paracetamol jest w pełni bezpiecznym lekiem przeciwbólowym w jaskrze."
          }
        ]
      },
      {
        title: "Krok 4: Definitywne leczenie zabiegowe obojga oczu",
        scenario: "Po podaniu acetazolamidu i mannitolu ciśnienie w chorym oku spadło do 22 mmHg, rogówka odzyskała przejrzystość, a ból ustąpił. Jaka procedura zabiegowa jest definitywnym leczeniem przyczynowym i dlaczego musi obejmować RÓWNIEŻ DRUGIE OKO?",
        options: [
          {
            text: "Laserowa irydotomia YAG (Nd:YAG iridotomy) wykonana w chorym oku oraz PROFILAKTYCZNIE w drugim, zdrowym oku z powodu anatomicznej predyspozycji (wąskiego kąta)",
            correct: true,
            isCorrect: true,
            feedback: "✅ PRAWIDŁOWO! Złotym standardem po ustąpieniu obrzęku rogówki jest laserowa irydotomia Nd:YAG (wytworzenie otworu w obwodowej części tęczówki), co przywraca bezpośrednie połączenie między komorą tylną a przednią i likwiduje blok źreniczny. Ponieważ drugie oko ma identyczną predyspozycję anatomiczną (płytka komora, wąski kąt), ryzyko ostrego ataku w drugim oku wynosi >50% w ciągu 5 lat – profilaktyczna irydotomia drugiego oka jest obligatoryjna!"
          },
          {
            text: "Enukleacja (usunięcie) chorej gałki ocznej w celu ochrony oka zdrowego przed współczulnym zapaleniem oka",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Usunięcie oka w jaskrze jest błędem w sztuce; irydotomia laserowa pozwala w pełni zachować wzrok."
          },
          {
            text: "Wykonanie witrektomii przez część płaską ciała rzęskowego z podaniem oleju silikonowego do komory przedniej",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Witrektomia nie jest leczeniem pierwszego wyboru w ostrym bloku źrenicznym."
          },
          {
            text: "Zalecenie noszenia okularów przeciwsłonecznych przez całą dobę bez żadnych procedur zabiegowych",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Ciemność wywołuje rozszerzenie źrenicy i sprowokuje natychmiastowy nawrót ostrego ataku jaskry."
          }
        ]
      }
    ],
    pathoNodes: [
      {
        title: "Anatomiczna predyspozycja i blok źreniczny",
        desc: "Krótka gałka oczna (nadwzroczność), gruba soczewka (wiek podeszły, zaćma) i płytka komora przednia predysponują do bloku.",
        detail: "Brzeg źreniczny tęczówki ściśle przylega do przedniej torebki powiększonej soczewki, utrudniając przepływ cieczy wodnistej z komory tylnej do komory przedniej (względny blok źreniczny).",
        target: "Punkt uchwytu diagnostyki i leczenia: Gonioskopia (ocena kąta wg Shaffera) oraz irydotomia laserowa YAG (obejście bloku źrenicznego)."
      },
      {
        title: "Wygięcie tęczówki ku przodowi (iris bombé) i zamknięcie kąta",
        desc: "Gromadząca się w komorze tylnej ciecz wodnista spycha obwodową część tęczówki do przodu w stronę rogówki.",
        detail: "Pod wpływem miernego rozszerzenia źrenicy (np. w ciemności, kinie, pod wpływem stresu lub leków parasympatykolitycznych) zwiotczała nasada tęczówki zamyka beleczkowanie kąta przesączania (trabecular meshwork).",
        target: "Punkt uchwytu leczenia: Pilokarpina (zwęża źrenicę, napina nasadę tęczówki i odciąga ją od beleczkowania po zbiciu IOP <40 mmHg)."
      },
      {
        title: "Krytyczny wzrost ciśnienia wewnątrzgałkowego (IOP) i niedokrwienie",
        desc: "Całkowite zablokowanie odpływu cieczy wodnistej przy jej stałej produkcji wywołuje gwałtowny skok ciśnienia (IOP >50–80 mmHg).",
        detail: "Ciśnienie śródgałkowe przekracza ciśnienie perfuzji naczyń siatkówki i nerwu wzrokowego. Dochodzi do obrzęku nabłonka rogówki (halo, spadek ostrości), niedokrwienia zwieracza tęczówki (sztywna źrenica) oraz obumarcia aksonów nerwu wzrokowego (zanik jaskrowy).",
        target: "Punkt uchwytu leczenia: Osmoterapia mannitolem 20% i.v., acetazolamid i.v. i miejscowe krople hamujące produkcję cieczy (tymolol, brymonidyna)."
      }
    ],
    dutySummary: {
      overview: "Ostre zamknięcie kąta przesączania (jaskra ostra) to okulistyczny stan nagły zagrażający nieodwracalną ślepotą, wywołany nagłym zablokowaniem odpływu cieczy wodnistej przez nasadę tęczówki. Charakteryzuje się triadą: potężny ból oka i głowy, spadek ostrości widzenia z efektem 'halo' oraz nudności/wymioty przy twardej jak kamień gałce ocznej (IOP >50–70 mmHg).",
      diagnostics: "1. Pomiar ciśnienia wewnątrzgałkowego (tonometria aplanacyjna Goldmanna lub bezkontaktowa) – krytyczny wzrost IOP >40–70 mmHg.\n\n2. Badanie w lampie szczelinowej: przekrwienie rzęskowe, obrzęk rogówki (zamglenie), spłycona komora przednia, owalna średnio szeroka źrenica sztywna na światło.\n\n3. Badanie palpacyjne gałek ocznych przez powieki: twardość gałki ocznej jak kamień w porównaniu ze zdrowym okiem.\n\n4. Gonioskopia (po opanowaniu ostrego ataku): ocena stopnia zamknięcia kąta przesączania w obu oczach.",
      drugsAndDoses: "• Leczenie ogólne natychmiastowe: <span class=\"dose-pill\">Acetazolamid: 500 mg i.v.</span> (lub doustnie), następnie 250 mg co 6–8h.\n• Osmoterapia: <span class=\"dose-pill\">Mannitol 20%: 1,0–2,0 g/kg i.v.</span> (ok. 250–500 ml) we wlewie w ciągu 30–45 minut.\n• Krople miejscowe (po 1 kropli co 10–15 min w pierwszej godzinie):\n  - Beta-bloker: <span class=\"dose-pill\">Tymolol 0,5% krople</span> (zmniejsza syntezę cieczy)\n  - Alfa-2-agonista: <span class=\"dose-pill\">Brymonidyna 0,2% krople</span>\n  - Miotyk (PO ZBICIU IOP <40–50 mmHg!): <span class=\"dose-pill\">Pilokarpina 1–2% krople</span> co 15 min przez 1h, potem 4x/dobę.\n  - Krople sterydowe: deksametazon w celu redukcji odczynu zapalnego tęczówki.\n• BEZWZGLĘDNY ZAKAZ podawania mydriatyków (atropina, tropikamid, fenylefryna)!",
      procedures: "Definitywne leczenie zabiegowe: laserowa irydotomia Nd:YAG (obustronna!) po ustąpieniu obrzęku rogówki; w razie braku efektu operacja przetokowa (trabekulektomia) lub fakoemulsyfikacja soczewki.",
      monitoring: "Kontrola IOP co 1–2 godziny do momentu normalizacji ciśnienia (<21 mmHg), monitorowanie stanu rogówki i reakcji źrenicy."
    },
    diffTable: {
      title: "⚔️ Tabela Różnicowa: Ostre Zamknięcie Kąta vs Zapalenie Tęczówki i Ciała Rzęskowego vs Ostre Zapalenie Spojówek vs Zapalenie Rogówki",
      headers: ["Cecha kliniczna", "Jaskra Ostra (Zamknięcie Kąta)", "Zapalenie Tęczówki (Uveitis anterior)", "Zapalenie Spojówek", "Zapalenie / Owrzodzenie Rogówki"],
      rows: [
        ["Ból oka i głowy", "Potężny, rozdzierający, nudności, wymioty", "Umiarkowany ból, silny światłowstręt", "Brak bólu (uczucie piasku, pieczenie)", "Ostry ból, silne kłucie, światłowstręt"],
        ["Ostrość wzroku", "Gwałtowny spadek, zamglenie, koła tęczowe (halo)", "Miernie osłabiona lub prawidłowa", "Prawidłowa (śluz na rogówce przejściowo)", "Istotnie osłabiona"],
        ["Ciśnienie śródgałkowe (IOP)", "KRYTYCZNIE WYSOKIE (50–80 mmHg), twarde", "Prawidłowe lub obniżone (rzadko wysokie)", "Całkowicie prawidłowe (10–21 mmHg)", "Prawidłowe"],
        ["Wygląd źrenicy", "Średnio szeroka, pionowo owalna, SZTYWNA", "WĄSKA, nieregularna (zrosty tylne), leniwa", "Prawidłowa, symetryczna, żywa reakcja", "Prawidłowa lub wąska z powodu bólu"],
        ["Przekrwienie oka", "Głębokie okołorąbkowe (rzęskowe/mieszane)", "Głębokie rzęskowe (fioletowo-czerwone)", "Powierzchowne spojówkowe (ceglaste, ruchome)", "Rzęskowe lub mieszane"],
        ["Rogówka", "Matowa, obrzęknięta ('zamglona szyba')", "Przejrzysta (obecne osady na śródbłonku)", "Przejrzysta, gładka, lśniąca", "Nacieki zapalne, ubytek nabłonka (fluoresceina)"],
        ["Pilokarpina (miotyk)", "Wskazana (po wstępnym obniżeniu IOP)", "BEZWZGLĘDNIE PRZECIWWSKAZANA!", "Bezużyteczna", "Bezużyteczna"]
      ]
    },
    lekQuestions: [
      {
        q: "Który lek okulistyczny jest BEZWZGLĘDNIE PRZECIWWSKAZANY u pacjenta z ostrym zamknięciem kąta przesączania lub predyspozycją anatomiczną w postaci wąskiego kąta?",
        question: "Który lek okulistyczny jest BEZWZGLĘDNIE PRZECIWWSKAZANY u pacjenta z ostrym zamknięciem kąta przesączania lub predyspozycją anatomiczną w postaci wąskiego kąta?",
        opts: [
          "A) Tropikamid (lub atropina – leki rozszerzające źrenicę / mydriatyki)",
          "B) Tymolol 0,5% w kroplach do worka spojówkowego",
          "C) Brymonidyna 0,2% w kroplach okulistycznych",
          "D) Acetazolamid podawany dożylnie w dawce 500 mg",
          "E) Pilokarpina w kroplach po obniżeniu ciśnienia"
        ],
        options: [
          "A) Tropikamid (lub atropina – leki rozszerzające źrenicę / mydriatyki)",
          "B) Tymolol 0,5% w kroplach do worka spojówkowego",
          "C) Brymonidyna 0,2% w kroplach okulistycznych",
          "D) Acetazolamid podawany dożylnie w dawce 500 mg",
          "E) Pilokarpina w kroplach po obniżeniu ciśnienia"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Leki rozszerzające źrenicę (parasympatykolityki: tropikamid, atropina, cyklopentolat oraz sympatykomimetyki: fenylefryna) powodują zwiotczenie i pogrubienie nasady tęczówki, co prowadzi do mechanicznego zaciśnięcia i całkowitej blokady kąta przesączania. Ich podanie w wąskim kącie wywołuje lub dramatycznie pogłębia ostry atak jaskry.",
        expl: "Prawidłowo! Leki rozszerzające źrenicę (parasympatykolityki: tropikamid, atropina, cyklopentolat oraz sympatykomimetyki: fenylefryna) powodują zwiotczenie i pogrubienie nasady tęczówki, co prowadzi do mechanicznego zaciśnięcia i całkowitej blokady kąta przesączania. Ich podanie w wąskim kącie wywołuje lub dramatycznie pogłębia ostry atak jaskry.",
        explanation: "Prawidłowo! Leki rozszerzające źrenicę (parasympatykolityki: tropikamid, atropina, cyklopentolat oraz sympatykomimetyki: fenylefryna) powodują zwiotczenie i pogrubienie nasady tęczówki, co prowadzi do mechanicznego zaciśnięcia i całkowitej blokady kąta przesączania. Ich podanie w wąskim kącie wywołuje lub dramatycznie pogłębia ostry atak jaskry."
      },
      {
        q: "Dlaczego laserowa irydotomia Nd:YAG po opanowaniu ostrego zamknięcia kąta przesączania musi zostać wykonana RÓWNIEŻ W DRUGIM, całkowicie bezobjawowym oku pacjenta?",
        question: "Dlaczego laserowa irydotomia Nd:YAG po opanowaniu ostrego zamknięcia kąta przesączania musi zostać wykonana RÓWNIEŻ W DRUGIM, całkowicie bezobjawowym oku pacjenta?",
        opts: [
          "A) Ponieważ drugie oko cechuje się identyczną predyspozycją anatomiczną (płytka komora, wąski kąt), a ryzyko ostrego ataku w oku towarzyszącym wynosi ponad 50% w ciągu kilku lat",
          "B) Aby zapobiec rozwojowi nowotworu złośliwego w naczyniówce drugiego oka",
          "C) Z powodu bezwzględnego wymogu prawnego narzuconego przez NFZ",
          "D) Ponieważ laser Nd:YAG działa wyłącznie falami rezonującymi między dwojgiem oczu",
          "E) W drugim oku procedura jest w rzeczywistości całkowicie przeciwwskazana"
        ],
        options: [
          "A) Ponieważ drugie oko cechuje się identyczną predyspozycją anatomiczną (płytka komora, wąski kąt), a ryzyko ostrego ataku w oku towarzyszącym wynosi ponad 50% w ciągu kilku lat",
          "B) Aby zapobiec rozwojowi nowotworu złośliwego w naczyniówce drugiego oka",
          "C) Z powodu bezwzględnego wymogu prawnego narzuconego przez NFZ",
          "D) Ponieważ laser Nd:YAG działa wyłącznie falami rezonującymi między dwojgiem oczu",
          "E) W drugim oku procedura jest w rzeczywistości całkowicie przeciwwskazana"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Budowa anatomiczna przedniego odcinka oka jest symetryczna. Pacjent z ostrym zamknięciem kąta w jednym oku ma w oku towarzyszącym płytką komorę i wąski kąt przesączania. Bez profilaktycznej irydotomii laserowej ryzyko wystąpienia ostrego ataku jaskry w drugim oku przekracza 50% w ciągu 5 lat. Profilaktyczna irydotomia Nd:YAG w oku towarzyszącym jest standardem postępowania.",
        expl: "Prawidłowo! Budowa anatomiczna przedniego odcinka oka jest symetryczna. Pacjent z ostrym zamknięciem kąta w jednym oku ma w oku towarzyszącym płytką komorę i wąski kąt przesączania. Bez profilaktycznej irydotomii laserowej ryzyko wystąpienia ostrego ataku jaskry w drugim oku przekracza 50% w ciągu 5 lat. Profilaktyczna irydotomia Nd:YAG w oku towarzyszącym jest standardem postępowania.",
        explanation: "Prawidłowo! Budowa anatomiczna przedniego odcinka oka jest symetryczna. Pacjent z ostrym zamknięciem kąta w jednym oku ma w oku towarzyszącym płytką komorę i wąski kąt przesączania. Bez profilaktycznej irydotomii laserowej ryzyko wystąpienia ostrego ataku jaskry w drugim oku przekracza 50% w ciągu 5 lat. Profilaktyczna irydotomia Nd:YAG w oku towarzyszącym jest standardem postępowania."
      },
      {
        q: "Jaki jest mechanizm powstawania zjawiska widzenia 'kół tęczowych' (efektu halo wokół źródeł światła) w ostrym ataku jaskry?",
        question: "Jaki jest mechanizm powstawania zjawiska widzenia 'kół tęczowych' (efektu halo wokół źródeł światła) w ostrym ataku jaskry?",
        opts: [
          "A) Obrzęk nabłonka rogówki i powstawanie mikropęcherzyków płynu działających jak pryzmaty rozszczepiające światło",
          "B) Pęknięcie torebki soczewki z wniknięciem białek do ciała szklistego",
          "C) Zmiana stężenia rodopsyny w komórkach pręcikowych siatkówki",
          "D) Skurcz naczyń tętniczych w płacie potylicznym kory mózgowej",
          "E) Odwarstwienie nabłonka barwnikowego siatkówki (RPE) w plamce żółtej"
        ],
        options: [
          "A) Obrzęk nabłonka rogówki i powstawanie mikropęcherzyków płynu działających jak pryzmaty rozszczepiające światło",
          "B) Pęknięcie torebki soczewki z wniknięciem białek do ciała szklistego",
          "C) Zmiana stężenia rodopsyny w komórkach pręcikowych siatkówki",
          "D) Skurcz naczyń tętniczych w płacie potylicznym kory mózgowej",
          "E) Odwarstwienie nabłonka barwnikowego siatkówki (RPE) w plamce żółtej"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Pod wpływem skrajnego ciśnienia wewnątrzgałkowego komórki śródbłonka rogówki nie są w stanie wypompowywać płynu ze zrębu rogówki. Dochodzi do obrzęku zrębu i nabłonka rogówki (corneal edema), a nagromadzony płyn tworzy mikroskopijne pęcherzyki, które rozszczepiają promienie świetlne na składowe barwne, wywołując widzenie tęczowych kół (halo).",
        expl: "Prawidłowo! Pod wpływem skrajnego ciśnienia wewnątrzgałkowego komórki śródbłonka rogówki nie są w stanie wypompowywać płynu ze zrębu rogówki. Dochodzi do obrzęku zrębu i nabłonka rogówki (corneal edema), a nagromadzony płyn tworzy mikroskopijne pęcherzyki, które rozszczepiają promienie świetlne na składowe barwne, wywołując widzenie tęczowych kół (halo).",
        explanation: "Prawidłowo! Pod wpływem skrajnego ciśnienia wewnątrzgałkowego komórki śródbłonka rogówki nie są w stanie wypompowywać płynu ze zrębu rogówki. Dochodzi do obrzęku zrębu i nabłonka rogówki (corneal edema), a nagromadzony płyn tworzy mikroskopijne pęcherzyki, które rozszczepiają promienie świetlne na składowe barwne, wywołując widzenie tęczowych kół (halo)."
      },
      {
        q: "Wskaż zestaw twierdzeń PRAWDZIWYCH dotyczących ostrego zamknięcia kąta przesączania:\n1. Wada wzroku predysponująca do ostrego zamknięcia kąta to nadwzroczność (hypermetropia).\n2. Typowa źrenica w ostrym ataku jest średnio szeroka, owalna i sztywna na światło.\n3. Ciśnienie wewnątrzgałkowe często przekracza 50–70 mmHg.\n4. Złotym standardem po ustąpieniu obrzęku rogówki jest obustronna irydotomia laserowa Nd:YAG.\n5. W ostrej fazie zaleca się rutynowe zakraplanie atropiny 1% co 30 minut.",
        question: "Wskaż zestaw twierdzeń PRAWDZIWYCH dotyczących ostrego zamknięcia kąta przesączania:\n1. Wada wzroku predysponująca do ostrego zamknięcia kąta to nadwzroczność (hypermetropia).\n2. Typowa źrenica w ostrym ataku jest średnio szeroka, owalna i sztywna na światło.\n3. Ciśnienie wewnątrzgałkowe często przekracza 50–70 mmHg.\n4. Złotym standardem po ustąpieniu obrzęku rogówki jest obustronna irydotomia laserowa Nd:YAG.\n5. W ostrej fazie zaleca się rutynowe zakraplanie atropiny 1% co 30 minut.",
        opts: [
          "A) 1, 2, 3, 4",
          "B) 1, 2, 5",
          "C) 2, 3, 4, 5",
          "D) 1, 3, 5",
          "E) Tylko 1 i 3"
        ],
        options: [
          "A) 1, 2, 3, 4",
          "B) 1, 2, 5",
          "C) 2, 3, 4, 5",
          "D) 1, 3, 5",
          "E) Tylko 1 i 3"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Zdania 1, 2, 3 i 4 są prawdziwe. Nadwzroczność (krótka gałka oczna) sprzyja płytkiej komorze przedniej. Źrenica jest średnio szeroka i sztywna z powodu niedokrwienia zwieracza tęczówki. Zdanie 5 jest rażąco fałszywe – atropina jest bezwzględnie przeciwwskazana.",
        expl: "Prawidłowo! Zdania 1, 2, 3 i 4 są prawdziwe. Nadwzroczność (krótka gałka oczna) sprzyja płytkiej komorze przedniej. Źrenica jest średnio szeroka i sztywna z powodu niedokrwienia zwieracza tęczówki. Zdanie 5 jest rażąco fałszywe – atropina jest bezwzględnie przeciwwskazana.",
        explanation: "Prawidłowo! Zdania 1, 2, 3 i 4 są prawdziwe. Nadwzroczność (krótka gałka oczna) sprzyja płytkiej komorze przedniej. Źrenica jest średnio szeroka i sztywna z powodu niedokrwienia zwieracza tęczówki. Zdanie 5 jest rażąco fałszywe – atropina jest bezwzględnie przeciwwskazana."
      },
      {
        q: "Wskaż zdanie FAŁSZYWE dotyczące ostrego zamknięcia kąta przesączania (jaskry ostrej):",
        question: "Wskaż zdanie FAŁSZYWE dotyczące ostrego zamknięcia kąta przesączania (jaskry ostrej):",
        opts: [
          "A) W ostrym ataku jaskry źrenica chorego oka jest wąska jak szpilka i wykazuje nadreaktywność na światło",
          "B) Silne nudności i wymioty mogą imitować ostry brzuch chirurgiczny lub nieżyt żołądkowo-jelitowy",
          "C) Dożylny wlew 20% mannitolu odwadnia ciało szkliste i szybko redukuje ciśnienie wewnątrzgałkowe",
          "D) Acetazolamid zmniejsza wydzielanie cieczy wodnistej przez nabłonek wyrostków ciała rzęskowego",
          "E) Pozostawienie nieleczonego ostrego ataku jaskry prowadzi do nieodwracalnej ślepoty w ciągu kilkunastu-kilkudziesięciu godzin"
        ],
        options: [
          "A) W ostrym ataku jaskry źrenica chorego oka jest wąska jak szpilka i wykazuje nadreaktywność na światło",
          "B) Silne nudności i wymioty mogą imitować ostry brzuch chirurgiczny lub nieżyt żołądkowo-jelitowy",
          "C) Dożylny wlew 20% mannitolu odwadnia ciało szkliste i szybko redukuje ciśnienie wewnątrzgałkowe",
          "D) Acetazolamid zmniejsza wydzielanie cieczy wodnistej przez nabłonek wyrostków ciała rzęskowego",
          "E) Pozostawienie nieleczonego ostrego ataku jaskry prowadzi do nieodwracalnej ślepoty w ciągu kilkunastu-kilkudziesięciu godzin"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Zdanie A jest fałszywe. W ostrym zamknięciu kąta źrenica NIE jest wąska – jest ŚREDNIO SZEROKA (mid-dilated, 5–6 mm), pionowo owalna i całkowicie SZTYWNA (brak reakcji na światło bezpośredniej i konsensualnej) w wyniku niedokrwienia zwieracza tęczówki. Wąska źrenica występuje w zapaleniu tęczówki (iritis/uveitis).",
        expl: "Prawidłowo! Zdanie A jest fałszywe. W ostrym zamknięciu kąta źrenica NIE jest wąska – jest ŚREDNIO SZEROKA (mid-dilated, 5–6 mm), pionowo owalna i całkowicie SZTYWNA (brak reakcji na światło bezpośredniej i konsensualnej) w wyniku niedokrwienia zwieracza tęczówki. Wąska źrenica występuje w zapaleniu tęczówki (iritis/uveitis).",
        explanation: "Prawidłowo! Zdanie A jest fałszywe. W ostrym zamknięciu kąta źrenica NIE jest wąska – jest ŚREDNIO SZEROKA (mid-dilated, 5–6 mm), pionowo owalna i całkowicie SZTYWNA (brak reakcji na światło bezpośredniej i konsensualnej) w wyniku niedokrwienia zwieracza tęczówki. Wąska źrenica występuje w zapaleniu tęczówki (iritis/uveitis)."
      },
      {
        q: "Dlaczego pacjent z ostrym atakiem jaskry bywa początkowo błędnie kierowany na oddział chorób wewnętrznych lub chirurgii zamiast do okulisty?",
        question: "Dlaczego pacjent z ostrym atakiem jaskry bywa początkowo błędnie kierowany na oddział chorób wewnętrznych lub chirurgii zamiast do okulisty?",
        opts: [
          "A) Z powodu dominujących w obrazie silnych nudności, wymiotów i bólów brzucha wywołanych odruchem z nerwu błędnego (odruch oczno-trzewny)",
          "B) Ponieważ ciśnienie w oku wywołuje natychmiastowe zapalenie wyrostka robaczkowego",
          "C) Ze względu na obecność obfitego krwawienia z dolnego odcinka przewodu pokarmowego",
          "D) Ponieważ jaskra ostra przebiega zawsze z bezbolesnym powiększeniem śledziony",
          "E) Z powodu braku jakichkolwiek dolegliwości ze strony głowy i gałki ocznej"
        ],
        options: [
          "A) Z powodu dominujących w obrazie silnych nudności, wymiotów i bólów brzucha wywołanych odruchem z nerwu błędnego (odruch oczno-trzewny)",
          "B) Ponieważ ciśnienie w oku wywołuje natychmiastowe zapalenie wyrostka robaczkowego",
          "C) Ze względu na obecność obfitego krwawienia z dolnego odcinka przewodu pokarmowego",
          "D) Ponieważ jaskra ostra przebiega zawsze z bezbolesnym powiększeniem śledziony",
          "E) Z powodu braku jakichkolwiek dolegliwości ze strony głowy i gałki ocznej"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Silne podrażnienie gałęzi ocznej nerwu trójdzielnego (V1) poprzez powiązania pniowe wyzwala odruch oczno-błędny (oculovagal reflex), manifestujący się bradykardią, uporczywymi nudnościami, gwałtownymi wymiotami i bólami brzucha. Jeśli lekarz nie zbada gałek ocznych i nie oceni twardości gałki, pacjent może być błędnie diagnozowany jako ostry nieżyt żołądkowo-jelitowy lub ostry brzuch.",
        expl: "Prawidłowo! Silne podrażnienie gałęzi ocznej nerwu trójdzielnego (V1) poprzez powiązania pniowe wyzwala odruch oczno-błędny (oculovagal reflex), manifestujący się bradykardią, uporczywymi nudnościami, gwałtownymi wymiotami i bólami brzucha. Jeśli lekarz nie zbada gałek ocznych i nie oceni twardości gałki, pacjent może być błędnie diagnozowany jako ostry nieżyt żołądkowo-jelitowy lub ostry brzuch.",
        explanation: "Prawidłowo! Silne podrażnienie gałęzi ocznej nerwu trójdzielnego (V1) poprzez powiązania pniowe wyzwala odruch oczno-błędny (oculovagal reflex), manifestujący się bradykardią, uporczywymi nudnościami, gwałtownymi wymiotami i bólami brzucha. Jeśli lekarz nie zbada gałek ocznych i nie oceni twardości gałki, pacjent może być błędnie diagnozowany jako ostry nieżyt żołądkowo-jelitowy lub ostry brzuch."
      },
      {
        q: "Który lek miejscowy w postaci kropli okulistycznych zmniejsza ciśnienie śródgałkowe poprzez ZWIĘKSZENIE odpływu cieczy wodnistej drogą naczyniówkowo-twardówkową (niekonwencjonalną)?",
        question: "Który lek miejscowy w postaci kropli okulistycznych zmniejsza ciśnienie śródgałkowe poprzez ZWIĘKSZENIE odpływu cieczy wodnistej drogą naczyniówkowo-twardówkową (niekonwencjonalną)?",
        opts: [
          "A) Analogi prostaglandyn (np. latanoprost, trawoprost)",
          "B) Beta-adrenolityki (np. tymolol, betaksolol)",
          "C) Inhibitory anhydrazy węglanowej (np. dorzolamid)",
          "D) Parasympatykomimetyki (np. pilokarpina)",
          "E) Antybiotyki aminoglikozydowe (np. tobramycyna)"
        ],
        options: [
          "A) Analogi prostaglandyn (np. latanoprost, trawoprost)",
          "B) Beta-adrenolityki (np. tymolol, betaksolol)",
          "C) Inhibitory anhydrazy węglanowej (np. dorzolamid)",
          "D) Parasympatykomimetyki (np. pilokarpina)",
          "E) Antybiotyki aminoglikozydowe (np. tobramycyna)"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Analogi prostaglandyn F2alfa (latanoprost, bimatoprost, trawoprost) zwiększają odpływ cieczy wodnistej drogą naczyniówkowo-twardówkową (uveoscleral outflow) poprzez rozluźnienie mięśnia rzęskowego i przebudowę macierzy zewnątrzkomórkowej. (Tymolol i dorzolamid zmniejszają produkcję cieczy, a pilokarpina ułatwia odpływ konwencjonalny przez utkanie beleczkowe).",
        expl: "Prawidłowo! Analogi prostaglandyn F2alfa (latanoprost, bimatoprost, trawoprost) zwiększają odpływ cieczy wodnistej drogą naczyniówkowo-twardówkową (uveoscleral outflow) poprzez rozluźnienie mięśnia rzęskowego i przebudowę macierzy zewnątrzkomórkowej. (Tymolol i dorzolamid zmniejszają produkcję cieczy, a pilokarpina ułatwia odpływ konwencjonalny przez utkanie beleczkowe).",
        explanation: "Prawidłowo! Analogi prostaglandyn F2alfa (latanoprost, bimatoprost, trawoprost) zwiększają odpływ cieczy wodnistej drogą naczyniówkowo-twardówkową (uveoscleral outflow) poprzez rozluźnienie mięśnia rzęskowego i przebudowę macierzy zewnątrzkomórkowej. (Tymolol i dorzolamid zmniejszają produkcję cieczy, a pilokarpina ułatwia odpływ konwencjonalny przez utkanie beleczkowe)."
      },
      {
        q: "Jakie działanie niepożądane acetazolamidu stosowanego ogólnie w jaskrze wymaga szczególnej ostrożności u chorych z niewydolnością nerek?",
        question: "Jakie działanie niepożądane acetazolamidu stosowanego ogólnie w jaskrze wymaga szczególnej ostrożności u chorych z niewydolnością nerek?",
        opts: [
          "A) Kwasica metaboliczna, hipokaliemia oraz ryzyko powstawania kamicy nerkowej",
          "B) Piorunujące nadciśnienie wrotne z żylakami przełyku",
          "C) Przerost dziąseł i hirsutyzm",
          "D) Zespół Guillaina-Barrégo z porażeniem wstępującym",
          "E) Izolowany wzrost hematokrytu powyżej 65%"
        ],
        options: [
          "A) Kwasica metaboliczna, hipokaliemia oraz ryzyko powstawania kamicy nerkowej",
          "B) Piorunujące nadciśnienie wrotne z żylakami przełyku",
          "C) Przerost dziąseł i hirsutyzm",
          "D) Zespół Guillaina-Barrégo z porażeniem wstępującym",
          "E) Izolowany wzrost hematokrytu powyżej 65%"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Acetazolamid jako inhibitor anhydrazy węglanowej blokuje reabsorpcję wodorowęglanów w cewkach nerkowych, prowadząc do kwasicy metabolicznej, utraty potasu (hipokaliemia), alkalizacji moczu i wytrącania złogów fosforanowo-wapniowych (kamica nerkowa). Jest przeciwwskazany w ciężkiej niewydolności nerek i wątroby.",
        expl: "Prawidłowo! Acetazolamid jako inhibitor anhydrazy węglanowej blokuje reabsorpcję wodorowęglanów w cewkach nerkowych, prowadząc do kwasicy metabolicznej, utraty potasu (hipokaliemia), alkalizacji moczu i wytrącania złogów fosforanowo-wapniowych (kamica nerkowa). Jest przeciwwskazany w ciężkiej niewydolności nerek i wątroby.",
        explanation: "Prawidłowo! Acetazolamid jako inhibitor anhydrazy węglanowej blokuje reabsorpcję wodorowęglanów w cewkach nerkowych, prowadząc do kwasicy metabolicznej, utraty potasu (hipokaliemia), alkalizacji moczu i wytrącania złogów fosforanowo-wapniowych (kamica nerkowa). Jest przeciwwskazany w ciężkiej niewydolności nerek i wątroby."
      },
      {
        q: "Co to są tzw. plamy Vogta (Glaukomflecken) widoczne w badaniu w lampie szczelinowej po przebytym ostrym ataku jaskry?",
        question: "Co to są tzw. plamy Vogta (Glaukomflecken) widoczne w badaniu w lampie szczelinowej po przebytym ostrym ataku jaskry?",
        opts: [
          "A) Szarobiałe plamki martwicy nabłonka podtorebkowego w przedniej części soczewki oka",
          "B) Zwapnienia w twardówce tylnego bieguna gałki ocznej",
          "C) Barwnikowe ogniska w dołku środkowym siatkówki",
          "D) Przetoki naczyniowe w ciele rzęskowym",
          "E) Pęcherzyki powietrza w komorze przedniej oka"
        ],
        options: [
          "A) Szarobiałe plamki martwicy nabłonka podtorebkowego w przedniej części soczewki oka",
          "B) Zwapnienia w twardówce tylnego bieguna gałki ocznej",
          "C) Barwnikowe ogniska w dołku środkowym siatkówki",
          "D) Przetoki naczyniowe w ciele rzęskowym",
          "E) Pęcherzyki powietrza w komorze przedniej oka"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Glaukomflecken (plamy Vogta) to drobne, szarobiałe zmętnienia pod przednią torebką soczewki, stanowiące obszary ogniskowej martwicy komórek nabłonka soczewki wywołanej skrajnym niedokrwieniem podczas ostrego ataku jaskry. Są trwałym dowodem przebytego w przeszłości epizodu ostrego zamknięcia kąta.",
        expl: "Prawidłowo! Glaukomflecken (plamy Vogta) to drobne, szarobiałe zmętnienia pod przednią torebką soczewki, stanowiące obszary ogniskowej martwicy komórek nabłonka soczewki wywołanej skrajnym niedokrwieniem podczas ostrego ataku jaskry. Są trwałym dowodem przebytego w przeszłości epizodu ostrego zamknięcia kąta.",
        explanation: "Prawidłowo! Glaukomflecken (plamy Vogta) to drobne, szarobiałe zmętnienia pod przednią torebką soczewki, stanowiące obszary ogniskowej martwicy komórek nabłonka soczewki wywołanej skrajnym niedokrwieniem podczas ostrego ataku jaskry. Są trwałym dowodem przebytego w przeszłości epizodu ostrego zamknięcia kąta."
      },
      {
        q: "Który lek przeciwnadciśnieniowy w kroplach okulistycznych jest BEZWZGLĘDNIE PRZECIWWSKAZANY u pacjenta z jaskrą i ciężką astmą oskrzelową lub blokiem przedsionkowo-komorowym II/III stopnia?",
        question: "Który lek przeciwnadciśnieniowy w kroplach okulistycznych jest BEZWZGLĘDNIE PRZECIWWSKAZANY u pacjenta z jaskrą i ciężką astmą oskrzelową lub blokiem przedsionkowo-komorowym II/III stopnia?",
        opts: [
          "A) Tymolol (nieselektywny beta-adrenolityk)",
          "B) Latanoprost (analog prostaglandyn)",
          "C) Dorzolamid (inhibitor anhydrazy)",
          "D) Pilokarpina w niskim stężeniu",
          "E) Sztuczne łzy z kwasem hialuronowym"
        ],
        options: [
          "A) Tymolol (nieselektywny beta-adrenolityk)",
          "B) Latanoprost (analog prostaglandyn)",
          "C) Dorzolamid (inhibitor anhydrazy)",
          "D) Pilokarpina w niskim stężeniu",
          "E) Sztuczne łzy z kwasem hialuronowym"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Tymolol podawany w kroplach wchłania się przez błonę śluzową nosogardła (omijając efekt pierwszego przejścia w wątrobie) i wywiera silne działanie ogólnoustrojowe. U pacjentów z astmą oskrzelową lub POChP może wywołać śmiertelny skurcz oskrzeli, a u chorych z zaburzeniami przewodzenia – bradykardię i blok AV.",
        expl: "Prawidłowo! Tymolol podawany w kroplach wchłania się przez błonę śluzową nosogardła (omijając efekt pierwszego przejścia w wątrobie) i wywiera silne działanie ogólnoustrojowe. U pacjentów z astmą oskrzelową lub POChP może wywołać śmiertelny skurcz oskrzeli, a u chorych z zaburzeniami przewodzenia – bradykardię i blok AV.",
        explanation: "Prawidłowo! Tymolol podawany w kroplach wchłania się przez błonę śluzową nosogardła (omijając efekt pierwszego przejścia w wątrobie) i wywiera silne działanie ogólnoustrojowe. U pacjentów z astmą oskrzelową lub POChP może wywołać śmiertelny skurcz oskrzeli, a u chorych z zaburzeniami przewodzenia – bradykardię i blok AV."
      },
      {
        q: "Co to jest zespół złośliwej jaskry (glaucoma maligna / ciliary block glaucoma)?",
        question: "Co to jest zespół złośliwej jaskry (glaucoma maligna / ciliary block glaucoma)?",
        opts: [
          "A) Odwrócenie kierunku przepływu cieczy wodnistej do wnętrza ciała szklistego (blok rzęskowy) ze spłyceniem całej komory przedniej po operacji",
          "B) Przerzut raka drobnokomórkowego płuca do siatkówki oka",
          "C) Całkowite stopienie rogówki pod wpływem kwasu siarkowego",
          "D) Wrodzony brak tęczówki i soczewki w obu oczach",
          "E) Zatkanie przewodu nosowo-łzowego przez ciało obce"
        ],
        options: [
          "A) Odwrócenie kierunku przepływu cieczy wodnistej do wnętrza ciała szklistego (blok rzęskowy) ze spłyceniem całej komory przedniej po operacji",
          "B) Przerzut raka drobnokomórkowego płuca do siatkówki oka",
          "C) Całkowite stopienie rogówki pod wpływem kwasu siarkowego",
          "D) Wrodzony brak tęczówki i soczewki w obu oczach",
          "E) Zatkanie przewodu nosowo-łzowego przez ciało obce"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Jaskra złośliwa (blok rzęskowy) to rzadkie powikłanie po zabiegach wewnątrzgałkowych, w którym ciecz wodnista zamiast do komory przedniej jest tłoczona do tylnej części gałki – do ciała szklistego i za nie, spychając całą przeponę tęczówkowo-soczewkową do przodu i całkowicie znosząc komorę przednią.",
        expl: "Prawidłowo! Jaskra złośliwa (blok rzęskowy) to rzadkie powikłanie po zabiegach wewnątrzgałkowych, w którym ciecz wodnista zamiast do komory przedniej jest tłoczona do tylnej części gałki – do ciała szklistego i za nie, spychając całą przeponę tęczówkowo-soczewkową do przodu i całkowicie znosząc komorę przednią.",
        explanation: "Prawidłowo! Jaskra złośliwa (blok rzęskowy) to rzadkie powikłanie po zabiegach wewnątrzgałkowych, w którym ciecz wodnista zamiast do komory przedniej jest tłoczona do tylnej części gałki – do ciała szklistego i za nie, spychając całą przeponę tęczówkowo-soczewkową do przodu i całkowicie znosząc komorę przednią."
      }
    ],
    flashcards: [
      { q: "Jaka jest klasyczna triada objawów ostrego zamknięcia kąta przesączania?", a: "Potężny ból oka i głowy, spadek ostrości wzroku z widzeniem tęczowych kół (halo) oraz nudności i wymioty przy skrajnie twardej gałce ocznej." },
      { q: "Jak wygląda źrenica w ostrym ataku jaskry?", a: "Jest średnio szeroka (5–6 mm), pionowo owalna i całkowicie sztywna na światło (w przeciwieństwie do wąskiej źrenicy w zapaleniu tęczówki)." },
      { q: "Jakie leki są bezwzględnie zakazane w wąskim kącie przesączania?", a: "Mydriatyki (atropina, tropikamid, leki cholinolityczne) – rozszerzenie źrenicy zamyka kąt i wywołuje ślepotę." },
      { q: "Kiedy można podać pilokarpinę w ostrym ataku jaskry?", a: "Dopiero po wstępnym obniżeniu ciśnienia śródgałkowego <40–50 mmHg (przy wyższym ciśnieniu zwieracz źrenicy jest niedokrwiony i nie reaguje)." },
      { q: "Jakie jest definitywne leczenie przyczynowe ostrego zamknięcia kąta?", a: "Laserowa irydotomia Nd:YAG – bezwzględnie wykonana w OBOJGU OCZACH (profilaktyka oka drugiego)." },
      { q: "Jaka wada wzroku predysponuje do ostrego zamknięcia kąta?", a: "Nadwzroczność (hypermetropia) – krótka gałka oczna z płytką komorą przednią." }
    ]
  },

  // =========================================================================
  // CASE 164: Zator Tętnicy Środkowej Siatkówki (CRAO)
  // =========================================================================
  {
    id: 164,
    file: "164_zator_tetnicy_siatkowki_crao.json",
    shortTitle: "Zator Tętnicy Siatkówki (CRAO)",
    title: "Udar Niedokrwienny Narządu Wzroku: Zator Tętnicy Środkowej Siatkówki (CRAO)",
    dept: "Okulistyka i Neurologia",
    diagnosisTitle: "Ostre Niedokrwienie Siatkówki w przebiegu Zatoru Tętnicy Środkowej Siatkówki Oka Lewego (CRAO)",
    vitals: [
      { label: "Ciśnienie tętnicze (RR)", val: "160/95", unit: "mmHg", status: "vital-warn" },
      { label: "Częstość akcji serca (HR)", val: "76", unit: "/min", status: "vital-ok" },
      { label: "Częstość oddechów (RR)", val: "14", unit: "/min", status: "vital-ok" },
      { label: "Saturacja (SpO2)", val: "98", unit: "%", status: "vital-ok" },
      { label: "Temperatura ciała", val: "36.6", unit: "°C", status: "vital-ok" }
    ],
    story: "<p><strong>Pacjent:</strong> 71-letni mężczyzna zgłasza się na SOR z powodu nagłej, całkowitej utraty widzenia w lewym oku.</p><p><strong>Wywiad chorobowy:</strong> Objaw pojawił się nagle 40 minut temu podczas jedzenia śniadania – pacjent zauważył, że nagle 'zgasło światło' w lewym oku. Utracie widzenia nie towarzyszył żaden ból głowy ani oka (całkowicie bezbolesne zaniewidzenie). W przeszłości miewał dwa krótkie, kilkuminutowe epizody przejściowego zaciemnienia tego oka (amaurosis fugax), które bagatelizował. W wywiadzie: wieloletnia miażdżyca, palenie tytoniu, nadciśnienie tętnicze.</p><p><strong>Badanie przedmiotowe:</strong> Ostrość wzroku w oku lewym dramatycznie obniżona: brak poczucia światła / poczucie światła z błędną lokalizacją. Oko blade, niebolesne, gałka oczna miękka. W badaniu reakcji źrenic: względny aferentny defekt źrenicowy (RAPD – źrenica Marcusa Gunna w lewym oku: brak zwężenia przy oświetleniu lewego oka i paradoksalne rozszerzenie przy naprzemiennym teście latarkowym). W oftalmoskopii dna oka lewego: siatkówka mlecznobiała, obrzęknięta, naczynia tętnicze nitkowate, w dołeczku środkowym plamki obecny patognomoniczny objaw 'wiśniowej plamki' (cherry-red spot). Dno oka prawego z cechami angiopatii miażdżycowej.</p>",
    steps: [
      {
        title: "Krok 1: Rozpoznanie okulistycznego udaru niedokrwiennego i okno czasowe",
        scenario: "Pacjent ma klasyczny obraz zatoru tętnicy środkowej siatkówki (CRAO) z objawem 'wiśniowej plamki'. Komórki zwojowe siatkówki są tkanką nerwową skrajnie wrażliwą na niedotlenienie. Jakie jest krytyczne okno czasowe, po którym dochodzi do nieodwracalnej martwicy siatkówki?",
        options: [
          {
            text: "Około 90–240 minut (do 4 godzin) od początku niedokrwienia; procedury ratunkowe należy wdrożyć natychmiast",
            correct: true,
            isCorrect: true,
            feedback: "✅ PRAWIDŁOWO! Zator tętnicy środkowej siatkówki (CRAO) jest okulistycznym odpowiednikiem udaru niedokrwiennego mózgu. Badania na modelach naczelnych wykazały, że całkowite zamknięcie tętnicy trwające >90–100 minut powoduje masywną, nieodwracalną martwicę komórek zwojowych siatkówki i trwałą ślepotę. Szansa na uratowanie widzenia istnieje wyłącznie przy natychmiastowym działaniu w pierwszych godzinach."
          },
          {
            text: "Około 14–21 dni, dlatego chory może bezpiecznie poczekać na planową wizytę w poradni",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Siatkówka jest częścią mózgowia; po kilkunastu dniach dochodzi do całkowitego zaniku nerwu wzrokowego."
          },
          {
            text: "Dokładnie 48 godzin, a procedury wolno rozpocząć dopiero po uzyskaniu wyniku biopsji wątroby",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Czas do nieodwracalnej martwicy to zaledwie kilkadziesiąt do kilkuset minut."
          },
          {
            text: "Siatkówka jest całkowicie odporna na niedotlenienie i nie ulega martwicy",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Siatkówka ma jeden z najwyższych współczynników zużycia tlenu w całym ludzkim ciele."
          }
        ]
      },
      {
        title: "Krok 2: Doraźne procedury ratunkowe obniżające ciśnienie śródgałkowe",
        scenario: "Pacjent trafił w 45. minucie od początku objawów. Jakie natychmiastowe zabiegi fizykalne i farmakologiczne należy wdrożyć przy łóżku w celu próby przemieszczenia materiału zatorowego z pnia głównego do mniejszych gałązek obwodowych?",
        options: [
          {
            text: "Masaż gałki ocznej (rytmiczny ucisk przez 10–15 s i nagłe zwolnienie), leki obniżające IOP (acetazolamid 500 mg i.v., krople z tymololem) oraz ewentualna paracenteza przedniej komory",
            correct: true,
            isCorrect: true,
            feedback: "✅ PRAWIDŁOWO! Masaż gałki ocznej wywołuje wahania ciśnienia śródgałkowego, co wraz z podaniem acetazolamidu i paracentezą (upuszczeniem 0,1–0,2 ml płynu z komory przedniej) gwałtownie obniża IOP, zwiększa gradient perfuzji tętniczej i może przepchnąć zator do obwodowej gałązki, ratując plamkę żółtą i widzenie centralne."
          },
          {
            text: "Zastosowanie stałego ucisku mechanicznego gałki ocznej ciężarkiem 5 kg przez 2 godziny",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Ciągły ucisk zmiażdży gałkę oczną i całkowicie zatrzyma jakiekolwiek resztkowe krążenie."
          },
          {
            text: "Wstrzyknięcie czystej parafiny do komory ciała szklistego pod kontrolą wzroku",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Parafina zniszczy narząd wzroku."
          },
          {
            text: "Podanie dożylne wlewu z glukonianu wapnia bez obniżania ciśnienia wewnątrzgałkowego",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Wapń nie wpływa na hemostazę ani ciśnienie śródgałkowe w CRAO."
          }
        ]
      },
      {
        title: "Krok 3: Różnicowanie z olbrzymiokomórkowym zapaleniem tętnic (GCA)",
        scenario: "U każdego pacjenta w wieku podeszłym (>50–60 lat) z CRAO bezwzględnie należy wykluczyć zapalną postać zatoru (arteritic CRAO) w przebiegu olbrzymiokomórkowego zapalenia tętnic (GCA / choroba Hortona). Jaki zestaw badań laboratoryjnych należy pobrać w trybie cito i jakie leczenie wdrożyć przy podejrzeniu GCA?",
        options: [
          {
            text: "Oznaczenie OB i CRP w trybie pilnym; przy wysokich wskaźnikach natychmiastowe wdrożenie wysokich dawek sterydów (metyloprednizolon 1000 mg i.v.) w celu ochrony drugiego oka przed ślepotą",
            correct: true,
            isCorrect: true,
            feedback: "✅ PRAWIDŁOWO! GCA (choroba Hortona) odpowiada za ok. 5–10% przypadków CRAO i przedniej niedokrwiennej neuropatii (AION). Cechuje się bardzo wysokim OB (>50–100 mm/h) i CRP. Niewdrożenie natychmiastowej sterydoterapii dożylnej (pulsy metyloprednizolonu) grozi utratą widzenia w drugim oku w ciągu kilku godzin lub dni!"
          },
          {
            text: "Wykonanie testu potowego w kierunku mukowiscydozy i odstawienie glikokortykosteroidów",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Test potowy nie ma związku z zapaleniem naczyń u osób starszych."
          },
          {
            text: "Pobranie wymazu z worka spojówkowego na posiew mykologiczny w kierunku kropidlaka",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! GCA to autoimmunologiczne zapalenie dużych i średnich naczyń, a nie grzybica."
          },
          {
            text: "Wstrzymanie jakiegokolwiek leczenia do czasu uzyskania wyniku biopsji kości udowej po 14 dniach",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Zwłoka w leczeniu GCA prowadzi do obustronnej, nieodwracalnej ślepoty."
          }
        ]
      },
      {
        title: "Krok 4: Diagnostyka źródła zatorowości i prewencja udaru mózgu",
        scenario: "Badania zapalne są w normie (OB 12 mm/h, CRP 2 mg/l) – potwierdzono postać miażdżycowo-zatorową (non-arteritic CRAO). Jaki panel badań naczyniowo-kardiologicznych pacjent musi przejść w trybie pilnym na oddziale udarowym?",
        options: [
          {
            text: "USG Doppler tętnic szyjnych (poszukiwanie zwężenia tożstronnej tętnicy ICA), EKG, telemetria/Holter EKG (wykluczenie AF) oraz echokardiografia serca (skrzeplina, wady zastawek)",
            correct: true,
            isCorrect: true,
            feedback: "✅ PRAWIDŁOWO! Pacjent z CRAO ma takie samo ryzyko wystąpienia dokonanego udaru półkulowego mózgu jak po napadzie TIA. Zator najczęściej pochodzi z blaszki miażdżycowej tożstronnej tętnicy szyjnej wewnętrznej (zator cholesterolowy – płytka Hollenhorsta) lub z serca (zator kardiogenny w przebiegu migotania przedsionków). Wymaga pełnej diagnostyki udarowej."
          },
          {
            text: "Gastroskopia i kolonoskopia w celu poszukiwania polipów jelita grubego",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Badania endoskopowe przewodu pokarmowego nie wyjaśniają źródła zatoru siatkówkowego."
          },
          {
            text: "Biopsja aspiracyjna szpiku kostnego w celu wykluczenia białaczki limfoblastycznej",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! CRAO u 71-latka ma podłoże atero-zatorowe."
          },
          {
            text: "Wypisanie do domu bez badań z zaleceniem zakraplania soli fizjologicznej",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Brak diagnostyki i leczenia przeciwpłytkowego/antykoagulacyjnego doprowadzi do udaru mózgu lub zawału serca."
          }
        ]
      }
    ],
    pathoNodes: [
      {
        title: "Zamknięcie światła tętnicy środkowej siatkówki przez materiał zatorowy",
        desc: "Tętnica środkowa siatkówki (CRA) jest naczyniem końcowym odchodzącym od tętnicy ocznej (gałęzi ICA).",
        detail: "Materiałem zatorowym jest najczęściej: płytka cholesterolowa (Hollenhorsta) z tętnicy szyjnej, zator włóknikowo-płytkowy lub zator wapniowy/skrzeplinowy z zastawek serca. Zamknięcie naczynia całkowicie odcina dopływ krwi do wewnętrznych warstw siatkówki.",
        target: "Punkt uchwytu leczenia: Masaż gałki ocznej, obniżenie IOP (acetazolamid, paracenteza) w oknie do 90–240 min w celu dystalnego przemieszczenia zatoru."
      },
      {
        title: "Obrzęk wewnątrzkomórkowy i patognomoniczny objaw 'wiśniowej plamki'",
        desc: "Niedokrwienie komórek zwojowych siatkówki powoduje zapaść pomp jonowych ATP i masywny obrzęk cytotoksyczny.",
        detail: "Obrzęknięta siatkówka traci przezierność i staje się mlecznobiała. W dołeczku środkowym (fovea centralis) nie ma komórek zwojowych – siatkówka jest tam skrajnie cienka, co pozwala przeświecać prawidłowo unaczynionej przez naczyniówkę warstwie barwnikowej, tworząc kontrastujący obraz 'wiśniowej plamki' (cherry-red spot).",
        target: "Punkt uchwytu diagnostyki: Oftalmoskopia bezpośrednia dna oka – natychmiastowe potwierdzenie CRAO."
      },
      {
        title: "Systemowe podłoże atero-zatorowe i ryzyko udaru mózgu",
        desc: "CRAO jest manifestacją uogólnionej niestabilności naczyniowej w układzie krążenia mózgowego.",
        detail: "U pacjentów z CRAO ryzyko wystąpienia dokonanego udaru mózgu w ciągu pierwszych tygodni jest drastycznie podwyższone. Wymagają oni takiego samego agresywnego postępowania profilaktycznego jak po udarze mózgu.",
        target: "Punkt uchwytu leczenia: Podwójne/pojedyncze leczenie przeciwpłytkowe (ASA), statyna w wysokiej dawce (atorwastatyna 80 mg), diagnostyka tętnic szyjnych (CEA)."
      }
    ],
    dutySummary: {
      overview: "Zator tętnicy środkowej siatkówki (CRAO) to okulistyczny stan nagły odpowiadający udarowi niedokrwiennemu mózgu, objawiający się nagłą, całkowicie bezbolesną, ciężką utratą widzenia w jednym oku. W badaniu dna oka stwierdza się mlecznobiałą siatkówkę z objawem 'wiśniowej plamki' w plamce żółtej oraz źrenicę Marcusa Gunna (RAPD). Okno czasowe na ratowanie widzenia to zaledwie 90–240 minut.",
      diagnostics: "1. Oftalmoskopia dna oka: blada, mlecznobiała siatkówka, wąskie tętnice, objaw 'wiśniowej plamki' (cherry-red spot), widoczne zatory w rozwidleniach naczyń (płytki Hollenhorsta).\n\n2. Ocena odruchów źrenicznych: względny aferentny defekt źrenicowy (RAPD / źrenica Marcusa Gunna).\n\n3. Badania pilne w celu wykluczenia GCA (choroby Hortona): OB, CRP, fibrynogen.\n\n4. Diagnostyka naczyniowa: USG Doppler tętnic szyjnych i kręgowych.\n\n5. Diagnostyka kardiologiczna: EKG, Holter EKG, echokardiografia (TTE/TEE).",
      drugsAndDoses: "• Doraźne obniżenie ciśnienia śródgałkowego: <span class=\"dose-pill\">Acetazolamid: 500 mg i.v.</span> lub doustnie + krople miejscowe: <span class=\"dose-pill\">Tymolol 0,5% 1 kropla</span>.\n• W razie podejrzenia olbrzymiokomórkowego zapalenia tętnic (GCA): <span class=\"dose-pill\">Metyloprednizolon: 1000 mg i.v. raz na dobę przez 3 dni</span> w celu ochrony drugiego oka!\n• W postaci atero-zatorowej (prewencja wtórna): <span class=\"dose-pill\">Kwas acetylosalicylowy (ASA): 100–300 mg doustnie</span> + <span class=\"dose-pill\">Atorwastatyna: 80 mg raz na dobę</span>.\n• W wyspecjalizowanych ośrodkach w oknie <4,5h: rozważenie dożylnej trombolizy <span class=\"dose-pill\">Alteplaza (rt-PA): 0,9 mg/kg i.v.</span>",
      procedures: "Masaż gałki ocznej (ucisk przez zamknięte powieki przez 10–15 s, następnie nagłe zwolnienie przez 5 s, powtarzane przez 15 minut), paracenteza komory przedniej oka (upuszczenie 0,1–0,2 ml cieczy wodnistej przez nakłucie rogówki igłą 30G), pilna hospitalizacja na oddziale udarowym.",
      monitoring: "Monitorowanie ostrości wzroku, parametrów życiowych, rytmu serca (wykrywanie AF), ocena drugiego oka pod kątem objawów zagrożenia."
    },
    diffTable: {
      title: "⚔️ Tabela Różnicowa: Zator Tętnicy Siatkówki (CRAO) vs Zakrzep Żyły Siatkówki (CRVO) vs AION vs Odwarstwienie Siatkówki",
      headers: ["Cecha kliniczna", "Zator Tętnicy (CRAO)", "Zakrzep Żyły (CRVO)", "Przednia Neuropatia (AION)", "Odwarstwienie Siatkówki"],
      rows: [
        ["Dynamika utraty wzroku", "Błyskawiczna (sekundy), głęboka (do poczucia światła)", "Podostra/ostra w ciągu godzin, umiarkowana", "Nagła po przebudzeniu, ubytek w polu widzenia", "Narastający ubytek pola ('zasłona/kurtyna')"],
        ["Dolegliwości bólowe", "CAŁKOWICIE BEZBOLESNA", "Bezbolesna", "Często bolesność skroni w GCA, ból oka rzadki", "Bezbolesne, poprzedzone błyskami i mętami"],
        ["Dno oka", "Blada, mleczna siatkówka + 'wiśniowa plamka'", "Obraz 'krwią zaciapanego dna oka' (płomykowate wybroczyny)", "Blady obrzęk tarczy nerwu wzrokowego", "Pęcherz uniesionej, pofałdowanej siatkówki"],
        ["Stan naczyń siatkówki", "Nitkowate, puste tętniczki, przerwany słup krwi", "Masywnie poszerzone, kręte, ciemne żyły", "Prawidłowe naczynia siatkówkowe", "Naczynia unoszą się na fałdach siatkówki"],
        ["RAPD (Marcus Gunn)", "Obecny, wybitny w chorym oku", "Obecny w postaci niedokrwiennej", "Obecny, wybitny", "Może być obecny przy rozległym odwarstwieniu"],
        ["Leczenie pierwszego rzutu", "Masaż, acetazolamid, paracenteza, ew. rt-PA", "Iniekcje anty-VEGF, deksametazon, laser", "Sterydoterapia i.v. (GCA) lub obserwacja", "Pilna operacja chirurgiczna (witrektomia)"]
      ]
    },
    lekQuestions: [
      {
        q: "Co jest patognomonicznym objawem zatoru tętnicy środkowej siatkówki (CRAO) w badaniu oftalmoskopowym dna oka?",
        question: "Co jest patognomonicznym objawem zatoru tętnicy środkowej siatkówki (CRAO) w badaniu oftalmoskopowym dna oka?",
        opts: [
          "A) Mlecznobiały obrzęk siatkówki z obecnością 'wiśniowej plamki' (cherry-red spot) w dołeczku środkowym",
          "B) Płomykowate wylewy krwi rozlane na całym dnie oka ('obraz krwi rozlanej na śniegu')",
          "C) Uniesienie tarczy nerwu wzrokowego o 5 dioptrii z wybroczynami okołotarczowymi",
          "D) Obecność licznych druzów twardych w plamce żółtej bez obrzęku",
          "E) Całkowity brak jakichkolwiek naczyń w obrębie twardówki oka"
        ],
        options: [
          "A) Mlecznobiały obrzęk siatkówki z obecnością 'wiśniowej plamki' (cherry-red spot) w dołeczku środkowym",
          "B) Płomykowate wylewy krwi rozlane na całym dnie oka ('obraz krwi rozlanej na śniegu')",
          "C) Uniesienie tarczy nerwu wzrokowego o 5 dioptrii z wybroczynami okołotarczowymi",
          "D) Obecność licznych druzów twardych w plamce żółtej bez obrzęku",
          "E) Całkowity brak jakichkolwiek naczyń w obrębie twardówki oka"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! W CRAO niedokrwione warstwy siatkówki ulegają obrzękowi cytotoksycznemu i tracą przezierność, stając się mlecznobiałe. W dołeczku środkowym plamki siatkówka składa się tylko z cienkich warstw, przez co prześwituje prawidłowo unaczyniona naczyniówka, tworząc jaskrawoczerwony kontrastujący punkt – 'objaw wisienki na torcie' (cherry-red spot).",
        expl: "Prawidłowo! W CRAO niedokrwione warstwy siatkówki ulegają obrzękowi cytotoksycznemu i tracą przezierność, stając się mlecznobiałe. W dołeczku środkowym plamki siatkówka składa się tylko z cienkich warstw, przez co prześwituje prawidłowo unaczyniona naczyniówka, tworząc jaskrawoczerwony kontrastujący punkt – 'objaw wisienki na torcie' (cherry-red spot).",
        explanation: "Prawidłowo! W CRAO niedokrwione warstwy siatkówki ulegają obrzękowi cytotoksycznemu i tracą przezierność, stając się mlecznobiałe. W dołeczku środkowym plamki siatkówka składa się tylko z cienkich warstw, przez co prześwituje prawidłowo unaczyniona naczyniówka, tworząc jaskrawoczerwony kontrastujący punkt – 'objaw wisienki na torcie' (cherry-red spot)."
      },
      {
        q: "Co oznacza stwierdzenie względnego aferentnego defektu źrenicowego (RAPD – źrenica Marcusa Gunna) w oku z zatorem tętnicy siatkówki?",
        question: "Co oznacza stwierdzenie względnego aferentnego defektu źrenicowego (RAPD – źrenica Marcusa Gunna) w oku z zatorem tętnicy siatkówki?",
        opts: [
          "A) Przy naprzemiennym oświetlaniu oczu latarką, skierowanie światła na chore oko wywołuje paradoksalne rozszerzenie obu źrenic z powodu uszkodzenia drogi dośrodkowej",
          "B) Źrenica chorego oka jest stale zwężona i nie reaguje na leki mydriatyczne",
          "C) Źrenica chorego oka wykazuje całkowity brak reakcji na zbieżność i akomodację",
          "D) Obie źrenice są trwale poszerzone do 9 mm i sztywne na bodźce",
          "E) Objaw ten świadczy o uszkodzeniu drogi odśrodkowej w nerwie okoruchowym"
        ],
        options: [
          "A) Przy naprzemiennym oświetlaniu oczu latarką, skierowanie światła na chore oko wywołuje paradoksalne rozszerzenie obu źrenic z powodu uszkodzenia drogi dośrodkowej",
          "B) Źrenica chorego oka jest stale zwężona i nie reaguje na leki mydriatyczne",
          "C) Źrenica chorego oka wykazuje całkowity brak reakcji na zbieżność i akomodację",
          "D) Obie źrenice są trwale poszerzone do 9 mm i sztywne na bodźce",
          "E) Objaw ten świadczy o uszkodzeniu drogi odśrodkowej w nerwie okoruchowym"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Źrenica Marcusa Gunna (RAPD) występuje przy jednostronnym uszkodzeniu drogi aferentnej (siatkówki lub nerwu wzrokowego). Podczas testu naprzemiennego oświetlania latarką (swinging flashlight test), oświetlenie zdrowego oka powoduje prawidłowe zwężenie obu źrenic, natomiast przeniesienie światła na chore oko wywołuje paradoksalne rozszerzenie obu źrenic, ponieważ mózg odbiera mniejszy impuls świetlny.",
        expl: "Prawidłowo! Źrenica Marcusa Gunna (RAPD) występuje przy jednostronnym uszkodzeniu drogi aferentnej (siatkówki lub nerwu wzrokowego). Podczas testu naprzemiennego oświetlania latarką (swinging flashlight test), oświetlenie zdrowego oka powoduje prawidłowe zwężenie obu źrenic, natomiast przeniesienie światła na chore oko wywołuje paradoksalne rozszerzenie obu źrenic, ponieważ mózg odbiera mniejszy impuls świetlny.",
        explanation: "Prawidłowo! Źrenica Marcusa Gunna (RAPD) występuje przy jednostronnym uszkodzeniu drogi aferentnej (siatkówki lub nerwu wzrokowego). Podczas testu naprzemiennego oświetlania latarką (swinging flashlight test), oświetlenie zdrowego oka powoduje prawidłowe zwężenie obu źrenic, natomiast przeniesienie światła na chore oko wywołuje paradoksalne rozszerzenie obu źrenic, ponieważ mózg odbiera mniejszy impuls świetlny."
      },
      {
        q: "Czym są tzw. płytki Hollenhorsta (Hollenhorst plaques) widoczne niekiedy w naczyniach dna oka u chorych z CRAO?",
        question: "Czym są tzw. płytki Hollenhorsta (Hollenhorst plaques) widoczne niekiedy w naczyniach dna oka u chorych z CRAO?",
        opts: [
          "A) Błyszczącymi, żółtopomarańczowymi zatorami cholesterolowymi tkwiącymi w rozwidleniach tętnic siatkówki, pochodzącymi z blaszki miażdżycowej tętnicy szyjnej",
          "B) Złogami wapnia w plamce żółtej u pacjentów z nadczynnością przytarczyc",
          "C) Zakaźnymi ogniskami bakteryjnymi w przebiegu infekcyjnego zapalenia wsierdzia",
          "D) Przetokami tętniczo-żylnymi w naczyniówce wywołanymi urazem",
          "E) Pasemkami barwnikowymi w błonie Brucha w pseudoxanthoma elasticum"
        ],
        options: [
          "A) Błyszczącymi, żółtopomarańczowymi zatorami cholesterolowymi tkwiącymi w rozwidleniach tętnic siatkówki, pochodzącymi z blaszki miażdżycowej tętnicy szyjnej",
          "B) Złogami wapnia w plamce żółtej u pacjentów z nadczynnością przytarczyc",
          "C) Zakaźnymi ogniskami bakteryjnymi w przebiegu infekcyjnego zapalenia wsierdzia",
          "D) Przetokami tętniczo-żylnymi w naczyniówce wywołanymi urazem",
          "E) Pasemkami barwnikowymi w błonie Brucha w pseudoxanthoma elasticum"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Płytki Hollenhorsta to mikroskopijne, wysoce refrakcyjne (błyszczące jak złoto) kryształy cholesterolu, które uległy uwolnieniu z owrzodziałej blaszki miażdżycowej (najczęściej w rozwidleniu tętnicy szyjnej wspólnej lub z syfonu ICA) i uwięzły w rozwidleniu tętniczek siatkówki.",
        expl: "Prawidłowo! Płytki Hollenhorsta to mikroskopijne, wysoce refrakcyjne (błyszczące jak złoto) kryształy cholesterolu, które uległy uwolnieniu z owrzodziałej blaszki miażdżycowej (najczęściej w rozwidleniu tętnicy szyjnej wspólnej lub z syfonu ICA) i uwięzły w rozwidleniu tętniczek siatkówki.",
        explanation: "Prawidłowo! Płytki Hollenhorsta to mikroskopijne, wysoce refrakcyjne (błyszczące jak złoto) kryształy cholesterolu, które uległy uwolnieniu z owrzodziałej blaszki miażdżycowej (najczęściej w rozwidleniu tętnicy szyjnej wspólnej lub z syfonu ICA) i uwięzły w rozwidleniu tętniczek siatkówki."
      },
      {
        q: "Wskaż zestaw twierdzeń PRAWDZIWYCH dotyczących zatoru tętnicy środkowej siatkówki (CRAO):\n1. Utrata widzenia w CRAO ma charakter nagły i całkowicie bezbolesny.\n2. W plamce żółtej stwierdza się patognomoniczną 'wiśniową plamkę'.\n3. U każdego chorego >50. r.ż. należy natychmiast oznaczyć OB i CRP w celu wykluczenia GCA.\n4. Okno czasowe na skuteczną interwencję ratującą siatkówkę wynosi do 2–4 godzin.\n5. Standardowym leczeniem przyczynowym o udowodnionej 100% skuteczności jest rutynowe zakraplanie pilokarpiny.",
        question: "Wskaż zestaw twierdzeń PRAWDZIWYCH dotyczących zatoru tętnicy środkowej siatkówki (CRAO):\n1. Utrata widzenia w CRAO ma charakter nagły i całkowicie bezbolesny.\n2. W plamce żółtej stwierdza się patognomoniczną 'wiśniową plamkę'.\n3. U każdego chorego >50. r.ż. należy natychmiast oznaczyć OB i CRP w celu wykluczenia GCA.\n4. Okno czasowe na skuteczną interwencję ratującą siatkówkę wynosi do 2–4 godzin.\n5. Standardowym leczeniem przyczynowym o udowodnionej 100% skuteczności jest rutynowe zakraplanie pilokarpiny.",
        opts: [
          "A) 1, 2, 3, 4",
          "B) 1, 2, 5",
          "C) 2, 3, 4, 5",
          "D) 1, 3, 5",
          "E) Tylko 1 i 2"
        ],
        options: [
          "A) 1, 2, 3, 4",
          "B) 1, 2, 5",
          "C) 2, 3, 4, 5",
          "D) 1, 3, 5",
          "E) Tylko 1 i 2"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Zdania 1, 2, 3 i 4 są prawdziwe. Zdanie 5 jest fałszywe: pilokarpina nie odgrywa żadnej roli w leczeniu CRAO (jest lekiem stosowanym w jaskrze).",
        expl: "Prawidłowo! Zdania 1, 2, 3 i 4 są prawdziwe. Zdanie 5 jest fałszywe: pilokarpina nie odgrywa żadnej roli w leczeniu CRAO (jest lekiem stosowanym w jaskrze).",
        explanation: "Prawidłowo! Zdania 1, 2, 3 i 4 są prawdziwe. Zdanie 5 jest fałszywe: pilokarpina nie odgrywa żadnej roli w leczeniu CRAO (jest lekiem stosowanym w jaskrze)."
      },
      {
        q: "Wskaż zdanie FAŁSZYWE dotyczące zatoru tętnicy środkowej siatkówki (CRAO):",
        question: "Wskaż zdanie FAŁSZYWE dotyczące zatoru tętnicy środkowej siatkówki (CRAO):",
        opts: [
          "A) Pacjent z CRAO skarży się typowo na potężny ból gałki ocznej i silne przekrwienie spojówek",
          "B) Obecność tętnicy rzęskowo-siatkówkowej (cilioretinal artery) u ok. 15–20% populacji pozwala na zachowanie widzenia centralnego mimo zatoru CRA",
          "C) Masaż gałki ocznej ma na celu wywołanie wahań ciśnienia śródgałkowego i przemieszczenie zatoru do dystalnych gałązek",
          "D) Pacjent po CRAO wymaga pilnej hospitalizacji i diagnostyki naczyniowej analogicznie jak po udarze mózgu",
          "E) W przypadku podejrzenia olbrzymiokomórkowego zapalenia tętnic należy natychmiast wdrożyć dożylną sterydoterapię przed wynikiem biopsji"
        ],
        options: [
          "A) Pacjent z CRAO skarży się typowo na potężny ból gałki ocznej i silne przekrwienie spojówek",
          "B) Obecność tętnicy rzęskowo-siatkówkowej (cilioretinal artery) u ok. 15–20% populacji pozwala na zachowanie widzenia centralnego mimo zatoru CRA",
          "C) Masaż gałki ocznej ma na celu wywołanie wahań ciśnienia śródgałkowego i przemieszczenie zatoru do dystalnych gałązek",
          "D) Pacjent po CRAO wymaga pilnej hospitalizacji i diagnostyki naczyniowej analogicznie jak po udarze mózgu",
          "E) W przypadku podejrzenia olbrzymiokomórkowego zapalenia tętnic należy natychmiast wdrożyć dożylną sterydoterapię przed wynikiem biopsji"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Zdanie A jest fałszywe. CRAO przebiega CAŁKOWICIE BEZBOLEŚNIE, a oko jest blade i spokojne (brak przekrwienia!). Wystąpienie silnego bólu oka i przekrwienia sugeruje ostre zamknięcie kąta przesączania, zapalenie tęczówki lub zapalenie rogówki.",
        expl: "Prawidłowo! Zdanie A jest fałszywe. CRAO przebiega CAŁKOWICIE BEZBOLEŚNIE, a oko jest blade i spokojne (brak przekrwienia!). Wystąpienie silnego bólu oka i przekrwienia sugeruje ostre zamknięcie kąta przesączania, zapalenie tęczówki lub zapalenie rogówki.",
        explanation: "Prawidłowo! Zdanie A jest fałszywe. CRAO przebiega CAŁKOWICIE BEZBOLEŚNIE, a oko jest blade i spokojne (brak przekrwienia!). Wystąpienie silnego bólu oka i przekrwienia sugeruje ostre zamknięcie kąta przesączania, zapalenie tęczówki lub zapalenie rogówki."
      },
      {
        q: "Dlaczego u około 15–20% pacjentów z całkowitym zatorem tętnicy środkowej siatkówki (CRAO) dochodzi do paradoksalnego zachowania prawidłowej ostrości wzroku centralnego (np. widzenie 1,0)?",
        question: "Dlaczego u około 15–20% pacjentów z całkowitym zatorem tętnicy środkowej siatkówki (CRAO) dochodzi do paradoksalnego zachowania prawidłowej ostrości wzroku centralnego (np. widzenie 1,0)?",
        opts: [
          "A) Dzięki obecności tętnicy rzęskowo-siatkówkowej (arteria cilioretinalis) odchodzącej od naczyń rzęskowych tylnych krótkich, zaopatrującej plamkę",
          "B) Ponieważ plamka żółta otrzymuje tlen bezpośrednio z powietrza atmosferycznego przez rogówkę",
          "C) Z powodu natychmiastowego wytworzenia zespoleń naczyniowych ze splotem skrzydłowym",
          "D) Ze względu na obecność rezerwowych komórek macierzystych w ciele szklistym",
          "E) W zatorze tętnicy siatkówki widzenie centralne ulega utracie ZAWSZE bez żadnych wyjątków"
        ],
        options: [
          "A) Dzięki obecności tętnicy rzęskowo-siatkówkowej (arteria cilioretinalis) odchodzącej od naczyń rzęskowych tylnych krótkich, zaopatrującej plamkę",
          "B) Ponieważ plamka żółta otrzymuje tlen bezpośrednio z powietrza atmosferycznego przez rogówkę",
          "C) Z powodu natychmiastowego wytworzenia zespoleń naczyniowych ze splotem skrzydłowym",
          "D) Ze względu na obecność rezerwowych komórek macierzystych w ciele szklistym",
          "E) W zatorze tętnicy siatkówki widzenie centralne ulega utracie ZAWSZE bez żadnych wyjątków"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! U ok. 15–20% ludzi występuje anatomiczny wariant w postaci tętnicy rzęskowo-siatkówkowej (cilioretinal artery), która odchodzi od krążenia naczyniówkowego (tętnic rzęskowych tylnych krótkich), a nie od CRA. Zaopatruje ona dołeczek plamki. W razie zamknięcia CRA cała obwodowa siatkówka obumiera, lecz wyspa widzenia centralnego w plamce żółtej pozostaje w pełni zachowana.",
        expl: "Prawidłowo! U ok. 15–20% ludzi występuje anatomiczny wariant w postaci tętnicy rzęskowo-siatkówkowej (cilioretinal artery), która odchodzi od krążenia naczyniówkowego (tętnic rzęskowych tylnych krótkich), a nie od CRA. Zaopatruje ona dołeczek plamki. W razie zamknięcia CRA cała obwodowa siatkówka obumiera, lecz wyspa widzenia centralnego w plamce żółtej pozostaje w pełni zachowana.",
        explanation: "Prawidłowo! U ok. 15–20% ludzi występuje anatomiczny wariant w postaci tętnicy rzęskowo-siatkówkowej (cilioretinal artery), która odchodzi od krążenia naczyniówkowego (tętnic rzęskowych tylnych krótkich), a nie od CRA. Zaopatruje ona dołeczek plamki. W razie zamknięcia CRA cała obwodowa siatkówka obumiera, lecz wyspa widzenia centralnego w plamce żółtej pozostaje w pełni zachowana."
      },
      {
        q: "Na czym polega zabieg paracentezy przedniej komory oka w ostrym zatorze tętnicy siatkówki?",
        question: "Na czym polega zabieg paracentezy przedniej komory oka w ostrym zatorze tętnicy siatkówki?",
        opts: [
          "A) Nakłuciu rogówki cienką igłą (30G) przy rąbku i aspiracji 0,1–0,2 ml cieczy wodnistej w celu nagłego obniżenia ciśnienia wewnątrzgałkowego",
          "B) Nacięciu twardówki w okolicy plamki żółtej z ewakuacją ciała szklistego",
          "C) Zeszyciu powiek szwem niewchłanialnym na okres 14 dni",
          "D) Podaniu do komory przedniej 10 ml stężonego roztworu heparyny",
          "E) Wypłukaniu rogówki 5 litrami sterylnego roztworu Ringera"
        ],
        options: [
          "A) Nakłuciu rogówki cienką igłą (30G) przy rąbku i aspiracji 0,1–0,2 ml cieczy wodnistej w celu nagłego obniżenia ciśnienia wewnątrzgałkowego",
          "B) Nacięciu twardówki w okolicy plamki żółtej z ewakuacją ciała szklistego",
          "C) Zeszyciu powiek szwem niewchłanialnym na okres 14 dni",
          "D) Podaniu do komory przedniej 10 ml stężonego roztworu heparyny",
          "E) Wypłukaniu rogówki 5 litrami sterylnego roztworu Ringera"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Paracenteza (nakłucie) przedniej komory oka polega na wprowadzeniu cienkiej igły przez rąbek rogówki w znieczuleniu miejscowym i upuszczeniu 0,1–0,2 ml cieczy wodnistej. Powoduje to natychmiastowy spadek ciśnienia w gałce ocznej do kilku mmHg, co wywołuje gwałtowny napływ krwi i może mechanicznie przepchnąć zator z pnia CRA do jej mniejszych gałęzi obwodowych.",
        expl: "Prawidłowo! Paracenteza (nakłucie) przedniej komory oka polega na wprowadzeniu cienkiej igły przez rąbek rogówki w znieczuleniu miejscowym i upuszczeniu 0,1–0,2 ml cieczy wodnistej. Powoduje to natychmiastowy spadek ciśnienia w gałce ocznej do kilku mmHg, co wywołuje gwałtowny napływ krwi i może mechanicznie przepchnąć zator z pnia CRA do jej mniejszych gałęzi obwodowych.",
        explanation: "Prawidłowo! Paracenteza (nakłucie) przedniej komory oka polega na wprowadzeniu cienkiej igły przez rąbek rogówki w znieczuleniu miejscowym i upuszczeniu 0,1–0,2 ml cieczy wodnistej. Powoduje to natychmiastowy spadek ciśnienia w gałce ocznej do kilku mmHg, co wywołuje gwałtowny napływ krwi i może mechanicznie przepchnąć zator z pnia CRA do jej mniejszych gałęzi obwodowych."
      },
      {
        q: "Który objaw w badaniu naczyń siatkówki świadczy o skrajnym spowolnieniu przepływu krwi w tętnicach siatkówki po zatorze?",
        question: "Który objaw w badaniu naczyń siatkówki świadczy o skrajnym spowolnieniu przepływu krwi w tętnicach siatkówki po zatorze?",
        opts: [
          "A) Objaw 'wagoników kolejowych' (boxcarring / segmentacja słupa krwi w naczyniach)",
          "B) Tętnienie skurczowe żyły środkowej siatkówki na tarczy",
          "C) Wzrost liczby naczyń krwionośnych o 50% w strefie równikowej",
          "D) Zmiana zabarwienia krwi tętniczej na jasnozieloną",
          "E) Całkowite zrośnięcie tętnicy z żyłą w splot naczyniówkowy"
        ],
        options: [
          "A) Objaw 'wagoników kolejowych' (boxcarring / segmentacja słupa krwi w naczyniach)",
          "B) Tętnienie skurczowe żyły środkowej siatkówki na tarczy",
          "C) Wzrost liczby naczyń krwionośnych o 50% w strefie równikowej",
          "D) Zmiana zabarwienia krwi tętniczej na jasnozieloną",
          "E) Całkowite zrośnięcie tętnicy z żyłą w splot naczyniówkowy"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Objaw wagoników kolejowych (boxcarring / cattle-trucking) to segmentacja słupa krwinek w zwężonych naczyniach siatkówki. Erytrocyty zbijają się w pakiety pooddzielane pasmami osocza, które wolno przesuwają się w świetle naczynia, co świadczy o skrajnym załamaniu ciśnienia perfuzji.",
        expl: "Prawidłowo! Objaw wagoników kolejowych (boxcarring / cattle-trucking) to segmentacja słupa krwinek w zwężonych naczyniach siatkówki. Erytrocyty zbijają się w pakiety pooddzielane pasmami osocza, które wolno przesuwają się w świetle naczynia, co świadczy o skrajnym załamaniu ciśnienia perfuzji.",
        explanation: "Prawidłowo! Objaw wagoników kolejowych (boxcarring / cattle-trucking) to segmentacja słupa krwinek w zwężonych naczyniach siatkówki. Erytrocyty zbijają się w pakiety pooddzielane pasmami osocza, które wolno przesuwają się w świetle naczynia, co świadczy o skrajnym załamaniu ciśnienia perfuzji."
      },
      {
        q: "Jakie jest najczęstsze źródło zatorów w CRAO u pacjentów poniżej 40. roku życia?",
        question: "Jakie jest najczęstsze źródło zatorów w CRAO u pacjentów poniżej 40. roku życia?",
        opts: [
          "A) Zatorowość sercopochodna (wypadanie płatka zastawki mitralnej, przetrwały otwór owalny PFO, wrodzone wady serca) lub trombofilia",
          "B) Masywna blaszka miażdżycowa aorty wstępującej",
          "C) Zaawansowane zwapnienie łuku aorty typu starczego",
          "D) Przewlekła niewydolność żylna podudzi z żylakami",
          "E) Martwica jałowa głowy kości udowej"
        ],
        options: [
          "A) Zatorowość sercopochodna (wypadanie płatka zastawki mitralnej, przetrwały otwór owalny PFO, wrodzone wady serca) lub trombofilia",
          "B) Masywna blaszka miażdżycowa aorty wstępującej",
          "C) Zaawansowane zwapnienie łuku aorty typu starczego",
          "D) Przewlekła niewydolność żylna podudzi z żylakami",
          "E) Martwica jałowa głowy kości udowej"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! U młodych dorosłych (<40 lat) miażdżyca tętnic szyjnych jest rzadka. Zatorowość w tej grupie wynika głównie ze źródeł sercowych (PFO z zatorem paradoksalnym, miksakserce, wady zastawkowe) lub wrodzonych/nabytych trombofilii (zespół antyfosfolipidowy, mutacja Leiden).",
        expl: "Prawidłowo! U młodych dorosłych (<40 lat) miażdżyca tętnic szyjnych jest rzadka. Zatorowość w tej grupie wynika głównie ze źródeł sercowych (PFO z zatorem paradoksalnym, miksakserce, wady zastawkowe) lub wrodzonych/nabytych trombofilii (zespół antyfosfolipidowy, mutacja Leiden).",
        explanation: "Prawidłowo! U młodych dorosłych (<40 lat) miażdżyca tętnic szyjnych jest rzadka. Zatorowość w tej grupie wynika głównie ze źródeł sercowych (PFO z zatorem paradoksalnym, miksakserce, wady zastawkowe) lub wrodzonych/nabytych trombofilii (zespół antyfosfolipidowy, mutacja Leiden)."
      },
      {
        q: "W jaki sposób wykonuje się prawidłowy masaż gałki ocznej w ostrej fazie CRAO?",
        question: "W jaki sposób wykonuje się prawidłowy masaż gałki ocznej w ostrej fazie CRAO?",
        opts: [
          "A) Rytmiczny ucisk palcami przez zamknięte powieki przez 10–15 sekund, po czym następuje gwałtowne zwolnienie ucisku na 5 sekund, powtarzane cyklicznie",
          "B) Stały, niezmienny nacisk pięścią przez co najmniej 45 minut bez przerw",
          "C) Opukiwanie gałki ocznej młoteczkiem neurologicznym",
          "D) Masowanie skóry czoła kostkami lodu z ominięciem gałek ocznych",
          "E) Ucisk wyłącznie na drugie, zdrowe oko w celu wywołania odruchu naczyniowego"
        ],
        options: [
          "A) Rytmiczny ucisk palcami przez zamknięte powieki przez 10–15 sekund, po czym następuje gwałtowne zwolnienie ucisku na 5 sekund, powtarzane cyklicznie",
          "B) Stały, niezmienny nacisk pięścią przez co najmniej 45 minut bez przerw",
          "C) Opukiwanie gałki ocznej młoteczkiem neurologicznym",
          "D) Masowanie skóry czoła kostkami lodu z ominięciem gałek ocznych",
          "E) Ucisk wyłącznie na drugie, zdrowe oko w celu wywołania odruchu naczyniowego"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Prawidłowa technika masażu gałki ocznej w CRAO polega na rytmicznym ucisku przez zamknięte powieki (lub trójlustrem Goldmanna) przez 10–15 sekund, a następnie nagłym zwolnieniu nacisku. Nagły spadek ciśnienia wywołuje falę uderzeniową w naczyniach i poszerzenie światła tętnicy, co sprzyja dyslokacji zatoru.",
        expl: "Prawidłowo! Prawidłowa technika masażu gałki ocznej w CRAO polega na rytmicznym ucisku przez zamknięte powieki (lub trójlustrem Goldmanna) przez 10–15 sekund, a następnie nagłym zwolnieniu nacisku. Nagły spadek ciśnienia wywołuje falę uderzeniową w naczyniach i poszerzenie światła tętnicy, co sprzyja dyslokacji zatoru.",
        explanation: "Prawidłowo! Prawidłowa technika masażu gałki ocznej w CRAO polega na rytmicznym ucisku przez zamknięte powieki (lub trójlustrem Goldmanna) przez 10–15 sekund, a następnie nagłym zwolnieniu nacisku. Nagły spadek ciśnienia wywołuje falę uderzeniową w naczyniach i poszerzenie światła tętnicy, co sprzyja dyslokacji zatoru."
      },
      {
        q: "Dlaczego zakrzep żyły środkowej siatkówki (CRVO) daje w badaniu dna oka zupełnie odmienny obraz niż zator tętnicy (CRAO)?",
        question: "Dlaczego zakrzep żyły środkowej siatkówki (CRVO) daje w badaniu dna oka zupełnie odmienny obraz niż zator tętnicy (CRAO)?",
        opts: [
          "A) W CRVO zablokowany jest odpływ krwi przy zachowanym dopływie tętniczym, co prowadzi do potężnego zastoju i pękania naczyń z licznymi płomykowatymi krwotokami",
          "B) Ponieważ żyła środkowa siatkówki nie ma połączenia z siatkówką",
          "C) Z powodu natychmiastowego obumarcia soczewki oka w CRVO",
          "D) W CRVO dno oka jest krystalicznie przejrzyste bez żadnych zmian naczyniowych",
          "E) CRVO występuje wyłącznie u pacjentów z wrodzoną ślepotą barw"
        ],
        options: [
          "A) W CRVO zablokowany jest odpływ krwi przy zachowanym dopływie tętniczym, co prowadzi do potężnego zastoju i pękania naczyń z licznymi płomykowatymi krwotokami",
          "B) Ponieważ żyła środkowa siatkówki nie ma połączenia z siatkówką",
          "C) Z powodu natychmiastowego obumarcia soczewki oka w CRVO",
          "D) W CRVO dno oka jest krystalicznie przejrzyste bez żadnych zmian naczyniowych",
          "E) CRVO występuje wyłącznie u pacjentów z wrodzoną ślepotą barw"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! W zakrzepie żyły (CRVO) dopływ krwi pod ciśnieniem tętniczym trwa nadal, ale odpływ jest zablokowany. Prowadzi to do gwałtownego przekrwienia żylnego, pękania włośniczek i powstania licznych, płomykowatych wylewów krwi na całym dnie oka (obraz 'krwią zbryzganego dna oka'). W zatorze tętnicy (CRAO) krew w ogóle nie dopływa, stąd siatkówka jest blada i bezkrwawa.",
        expl: "Prawidłowo! W zakrzepie żyły (CRVO) dopływ krwi pod ciśnieniem tętniczym trwa nadal, ale odpływ jest zablokowany. Prowadzi to do gwałtownego przekrwienia żylnego, pękania włośniczek i powstania licznych, płomykowatych wylewów krwi na całym dnie oka (obraz 'krwią zbryzganego dna oka'). W zatorze tętnicy (CRAO) krew w ogóle nie dopływa, stąd siatkówka jest blada i bezkrwawa.",
        explanation: "Prawidłowo! W zakrzepie żyły (CRVO) dopływ krwi pod ciśnieniem tętniczym trwa nadal, ale odpływ jest zablokowany. Prowadzi to do gwałtownego przekrwienia żylnego, pękania włośniczek i powstania licznych, płomykowatych wylewów krwi na całym dnie oka (obraz 'krwią zbryzganego dna oka'). W zatorze tętnicy (CRAO) krew w ogóle nie dopływa, stąd siatkówka jest blada i bezkrwawa."
      }
    ],
    flashcards: [
      { q: "Jaki jest klasyczny obraz kliniczny zatoru tętnicy środkowej siatkówki (CRAO)?", a: "Nagła, całkowicie bezbolesna, głęboka utrata widzenia w jednym oku, oko blade i spokojne." },
      { q: "Co widać w badaniu dna oka w CRAO?", a: "Bladą, mlecznobiałą siatkówkę z patognomoniczną 'wiśniową plamką' (cherry-red spot) w dołeczku środkowym." },
      { q: "Jakie jest krytyczne okno czasowe w CRAO?", a: "Do 90–240 minut (do 4 godzin) – po tym czasie komórki zwojowe siatkówki ulegają nieodwracalnej martwicy." },
      { q: "Jakie doraźne zabiegi można podjąć przy łóżku w ostrej fazie CRAO?", a: "Rytmiczny masaż gałki ocznej, podanie acetazolamidu 500 mg i.v. oraz paracentezę przedniej komory oka." },
      { q: "Czym jest źrenica Marcusa Gunna (RAPD)?", a: "Względnym aferentnym defektem źrenicowym – paradoksalnym rozszerzeniem źrenicy przy oświetleniu chorego oka." },
      { q: "Jaką chorobę autoimmunologiczną należy bezwzględnie wykluczyć u starszego chorego z CRAO?", a: "Olbrzymiokomórkowe zapalenie tętnic (GCA / chorobę Hortona) – ryzyko utraty wzroku w drugim oku!" }
    ]
  },

  // =========================================================================
  // CASE 165: Ropień Okołomigdałkowy (Peritonsillar Abscess)
  // =========================================================================
  {
    id: 165,
    file: "165_ropien_okolomigdalkowy.json",
    shortTitle: "Ropień Okołomigdałkowy",
    title: "Otolaryngologiczny Stan Nagły: Ropień Okołomigdałkowy (Peritonsillar Abscess)",
    dept: "Otolaryngologia",
    diagnosisTitle: "Ostry Jednostronny Ropień Okołomigdałkowy Prawy (Abscessus peritonsillaris dexter)",
    vitals: [
      { label: "Ciśnienie tętnicze (RR)", val: "125/80", unit: "mmHg", status: "vital-ok" },
      { label: "Częstość akcji serca (HR)", val: "105", unit: "/min", status: "vital-warn" },
      { label: "Częstość oddechów (RR)", val: "18", unit: "/min", status: "vital-ok" },
      { label: "Saturacja (SpO2)", val: "98", unit: "%", status: "vital-ok" },
      { label: "Temperatura ciała", val: "39.2", unit: "°C", status: "vital-crit" }
    ],
    story: "<p><strong>Pacjent:</strong> 28-letni mężczyzna zgłasza się na Ostry Dyżur Laryngologiczny z powodu dramatycznie nasilającego się bólu gardła i niemożności otwarcia ust.</p><p><strong>Wywiad chorobowy:</strong> Od 5 dni pacjent był leczony doustną amoksycyliną przez lekarza POZ z powodu anginy migdałków podniebiennych. Od wczoraj nastąpiło gwałtowne załamanie: ból gardła stał się skrajnie silny, jednostronny po stronie prawej, promieniuje do prawego ucha (otalgia odruchowa). Pacjent ma wysoką gorączkę do 39,2°C z dreszczami, nie jest w stanie przełknąć własnej śliny (obfity ślinotok) i ma trudności z mówieniem – mówi niewyraźnie, z 'kluskowatym' zabarwieniem głosu ('hot potato voice'). Występuje znaczny szczękościsk.</p><p><strong>Badanie przedmiotowe:</strong> Pacjent cierpiący, trzyma chusteczkę przy ustach z powodu wycieku śliny, głowa przechylona w stronę chorą. Z powodu szczękościsku (trismus) rozwarcie szczęk ograniczone do zaledwie 1,5 cm. W badaniu jamy ustnej i gardła: asymetria łuków podniebiennych – prawy łuk podniebienno-gardłowy masywnie uwypuklony, napięty, żywoczerwony; prawy migdałek podniebienny zepchnięty przyśrodkowo i ku dołowi, pokryty nalotem włóknikowym; języczek podniebienny obrzęknięty i zepchnięty na stronę PRZECIWLEGŁĄ (lewą). Węzły chłonne szyjne kątowo-żuchwowe po stronie prawej powiększone, zbite w bolesny pakiet.</p>",
    steps: [
      {
        title: "Krok 1: Wstępna ocena drożności dróg oddechowych i rozpoznanie kliniczne",
        scenario: "Pacjent ma szczękościsk, ślinotok, 'mowę kluskowatą' oraz zepchnięcie języczka na stronę przeciwną. Jaka jest najważniejsza natychmiastowa ocena bezpieczeństwa i postępowanie wstępne?",
        options: [
          {
            text: "Ocena drożności górnych dróg oddechowych (wykluczenie duszności wdechowej i stridoru), analgezja dożylna oraz przygotowanie do procedury zabiegowej w znieczuleniu miejscowym",
            correct: true,
            isCorrect: true,
            feedback: "✅ PRAWIDŁOWO! Ropień okołomigdałkowy może rozprzestrzenić się do przestrzeni przygardłowej lub wywołać obrzęk krtani z ostrym zagrożeniem uduszenia. Ocena toru oddechowego i saturacji jest priorytetem. Rozpoznanie stawia się na podstawie badania klinicznego (asymetria, zepchnięcie języczka, szczękościsk wynikający z nacieku mięśni skrzydłowych)."
          },
          {
            text: "Zalecenie picia gorącego mleka z miodem i podwojenie dawki doustnej amoksycyliny w domu",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Pacjent nie jest w stanie połykać; uformowany ropień wymaga natychmiastowego drenażu chirurgicznego, a leczenie zachowawcze w domu grozi sepsą i uduszeniem."
          },
          {
            text: "Zlecenie tomografii emisyjnej pozytonowej (PET) w celu wykluczenia chłoniaka migdałka",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Ostre zakażenie z ropniem to stan nagły, a nie wskazanie do planowej diagnostyki PET."
          },
          {
            text: "Wykonanie głębokiej bronchoskopii sztywnej na sali przyjęć bez znieczulenia",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Bronchoskopia sztywna jest procedurą inwazyjną pod narkozą w ciałach obcych i jest przeciwwskazana w ropniu gardła."
          }
        ]
      },
      {
        title: "Krok 2: Zabiegowe odbarczenie ropnia (złoty standard)",
        scenario: "Pacjent ma uformowany ropień w przestrzeni okołomigdałkowej prawej. Jaka procedura zabiegowa przyłóżkowa jest metodą z wyboru w celu natychmiastowego odbarczenia ropy i przyniesienia natychmiastowej ulgi choremu?",
        options: [
          {
            text: "Nakłucie aspiracyjne igłą w miejscu największego uwypuklenia w znieczuleniu miejscowym, a następnie nacięcie skalpelem i rozszerzenie kleszczykami (drenaż ropnia)",
            correct: true,
            isCorrect: true,
            feedback: "✅ PRAWIDŁOWO! Złotym standardem jest znieczulenie miejscowe lignokainą w aerozolu lub nasiękowo, nakłucie aspiracyjne igłą w celu potwierdzenia obecności ropy (i pobrania na posiew), po czym nacięcie łuku podniebiennego skalpelem (z zabezpieczeniem ostrza, nacięcie w osi strzałkowej z dala od tętnicy szyjnej wewnętrznej!) i rozszerzenie tkanek kleszczykami Hartmanna. Ewakuacja ropy przynosi natychmiastowe ustąpienie bólu i szczękościsku."
          },
          {
            text: "Podanie dożylne wlewu z furosemidu w celu wchłonięcia ropnia drogą naczyń chłonnych",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Ropień to zbiornik zamknięty; diuretyki nie mają żadnego wpływu na drenaż ropy."
          },
          {
            text: "Zastosowanie zewnętrznych okładów rozgrzewających na szyję bez drenażu chirurgicznego",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Rozgrzewanie szyi przy uformowanym ropniu przyspiesza szerzenie się zakażenia do przestrzeni przygardłowej i śródpiersia."
          },
          {
            text: "Energiczny masaż migdałka palcem badającego przez jamę ustną w celu pęknięcia torebki",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Masaż migdałka może wywołać aspirację ropy do płuc lub rozerwanie naczyń szyjnych."
          }
        ]
      },
      {
        title: "Krok 3: Dożylna antybiotykoterapia celowana w florę mieszaną",
        scenario: "Ewakuowano 8 ml gęstej, cuchnącej ropy. Jakie leczenie przeciwbakteryjne drogą parenteralną należy wdrożyć, uwzględniając florę tlenową i beztlenową jamy ustnej?",
        options: [
          {
            text: "Amoksycylina z kwasem klawulanowym i.v. (1,2 g co 8h) LUB Ceftriakson i.v. w skojarzeniu z Klindamycyną i.v. (600 mg co 8h)",
            correct: true,
            isCorrect: true,
            feedback: "✅ PRAWIDŁOWO! Ropień okołomigdałkowy ma etiologię polimikrobową: paciorkowce grupy A (Streptococcus pyogenes), Streptococcus anginosus oraz beztlenowce jamy ustnej (Fusobacterium necrophorum, Prevotella, Peptostreptococcus). Schematem z wyboru jest amoksycylina z kwasem klawulanowym i.v. lub ceftriakson z klindamycyną (pokrywającą florę beztlenową)."
          },
          {
            text: "Monoterapia gentamycyną w maści stosowanej na skórę policzka",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Maści na skórę nie penetrują do przestrzeni okołomigdałkowej, a gentamycyna nie działa na beztlenowce."
          },
          {
            text: "Kotrimoksazol podawany doustnie w dawce 480 mg raz na dobę",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Kotrimoksazol nie jest lekiem pierwszego rzutu w zakażeniach gardła i nie pokrywa skutecznie beztlenowców."
          },
          {
            text: "Podanie dożylne wlewu z glukozy 20% bez antybiotykoterapii",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Brak antybiotykoterapii w drenażu ropnia grozi nawrotem i ropowicą szyi."
          }
        ]
      },
      {
        title: "Krok 4: Kwalifikacja do wycięcia migdałków (tonsillektomii)",
        scenario: "Pacjent pyta, czy w przyszłości powinien mieć wycięte migdałki. Jakie są aktualne wskazania otolaryngologiczne do tonsillektomii po przebytym ropniu okołomigdałkowym?",
        options: [
          {
            text: "Przebycie drugiego epizodu ropnia okołomigdałkowego w wywiadzie LUB nawracające nawroty angin (kryteria Paradise'a) – planowa tonsillektomia po 6–8 tygodniach od wyleczenia",
            correct: true,
            isCorrect: true,
            feedback: "✅ PRAWIDŁOWO! Po pierwszym, skutecznie zdrenowanym epizodzie ropnia u pacjenta bez wywiadu częstych angin rutynowa tonsillektomia nie jest konieczna (ryzyko nawrotu wynosi ok. 10–15%). Wskazaniem do planowej tonsillektomii (tonsillectomie à froid po 6–8 tyg.) jest powtórny epizod ropnia lub wywiad nawracających angin (kryteria Paradise'a: ≥7 w roku, ≥5/rok przez 2 lata lub ≥3/rok przez 3 lata)."
          },
          {
            text: "Każdy pacjent po pierwszym ropniu musi mieć natychmiast usunięte migdałki w ciągu 24 godzin pod rygorem odpowiedzialności karnej",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Pierwszy epizod ropnia nie jest bezwzględnym wskazaniem do resekcji migdałków."
          },
          {
            text: "Wycięcie migdałków jest bezwzględnie zakazane u osób dorosłych ze względu na ryzyko utraty głosu",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Tonsillektomia jest standardową i bezpieczną procedurą u dorosłych przy odpowiednich wskazaniach."
          },
          {
            text: "Zalecenie profilaktycznego wycięcia migdałka gardłowego (trzeciego migdałka) u 28-letniego pacjenta",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Trzeci migdałek zanika fizjologicznie w okresie pokwitania i nie ma związku z ropniem okołomigdałkowym."
          }
        ]
      }
    ],
    pathoNodes: [
      {
        title: "Penetracja zakażenia przez torebkę migdałka",
        desc: "Ostre zapalenie migdałków (angina) obejmuje krypty migdałkowe, skąd proces ropny penetruje przez torebkę łącznotkankową.",
        detail: "Zakażenie szerzy się do przestrzeni luźnej tkanki łącznej między torebką migdałka podniebiennego a mięśniem zwieraczem górnym gardła (przestrzeń okołomigdałkowa). W miejscu tym gromadzi się wysięk ropny.",
        target: "Punkt uchwytu leczenia: Wczesna antybiotykoterapia anginy paciorkowcowej (fenoksymetylopenicylina) zapobiegająca powikłaniom ropnym."
      },
      {
        title: "Naciekanie mięśni żwaczowych i szczękościsk (trismus)",
        desc: "Proces zapalny nacieka leżący w bezpośrednim sąsiedztwie mięsień skrzydłowy przyśrodkowy.",
        detail: "Podrażnienie i odruchowy skurcz mięśni skrzydłowych uniemożliwia rozwarcie szczęk (szczękościsk / trismus). Towarzyszy mu obrzęk podniebienia, spychający języczek w stronę przeciwną i wywołujący 'mowę kluskowatą'.",
        target: "Punkt uchwytu diagnostyki: Rozpoznanie triady: jednostronny ból gardła z otalgią + szczękościsk + asymetria podniebienia."
      },
      {
        title: "Ryzyko powikłań głębokich szyi i zespołu Lemierre'a",
        desc: "Nieleczony ropień może przebić mięsień zwieracz gardła do przestrzeni przygardłowej i śródpiersia.",
        detail: "Zakażenie beztlenowcem Fusobacterium necrophorum może prowadzić do zakrzepowego zapalenia żyły szyjnej wewnętrznej z septycznymi zatorami do płuc (zespół Lemierre'a) lub zstępującego zapalenia śródpiersia o 40% śmiertelności.",
        target: "Punkt uchwytu leczenia: Pilne nacięcie i drenaż chirurgiczny ropnia oraz dożylna antybiotykoterapia o szerokim spektrum."
      }
    ],
    dutySummary: {
      overview: "Ropień okołomigdałkowy (peritonsillar abscess) to najczęstsze ropne powikłanie ostrego zapalenia migdałków podniebiennych, polegające na nagromadzeniu ropy między torebką migdałka a zwieraczem górnym gardła. Objawia się silnym jednostronnym bólem gardła promieniującym do ucha (otalgia), szczękościskiem, 'mową kluskowatą' i ślinotokiem. Wymaga pilnego drenażu chirurgicznego i antybiotykoterapii.",
      diagnostics: "1. Badanie jamy ustnej i gardła (faryngoskopia): jednostronne uwypuklenie łuku podniebiennego, migdałek zepchnięty przyśrodkowo i w dół, języczek przemieszczony na stronę ZDROWĄ.\n\n2. Ocena szczękościsku (trismus) i drożności dróg oddechowych (stridor, duszność).\n\n3. Nakłucie próbne igłą w miejscu największego chełbotania (potwierdzenie obecności ropy i posiew z antybiogramem).\n\n4. Badania laboratoryjne: morfologia (wysoka leukocytoza z przesunięciem w lewo), CRP, elektrolity.\n\n5. Badania obrazowe (USG szyi / TK szyi z kontrastem): wskazane przy podejrzeniu ropowicy przestrzeni przygardłowej lub zespołu Lemierre'a.",
      drugsAndDoses: "• Antybiotykoterapia dożylna pierwszego rzutu: <span class=\"dose-pill\">Amoksycylina z kwasem klawulanowym: 1,2 g i.v. co 8 godzin</span>.\n• Schemat alternatywny (alergia na penicyliny): <span class=\"dose-pill\">Ceftriakson: 1,0–2,0 g i.v. 1x/d</span> + <span class=\"dose-pill\">Klindamycyna: 600 mg i.v. co 8 godzin</span>.\n• Znieczulenie miejscowe przed drenażem: <span class=\"dose-pill\">Lignokaina 10% aerozol</span> na błonę śluzową lub nasiękowo 1% lignokaina z adrenaliną.\n• Analgezja i leczenie przeciwobrzękowe: <span class=\"dose-pill\">Ketoprofen: 100 mg i.v.</span> lub paracetamol 1000 mg i.v., w razie masywnego obrzęku pojedyncza dawka <span class=\"dose-pill\">Deksametazon: 4–8 mg i.v.</span>",
      procedures: "Pilne nakłucie i nacięcie łuku podniebienno-gardłowego skalpelem (zabezpieczonym przylepcem do 1 cm od czubka, cięcie strzałkowe!), tępe rozszerzenie kleszczykami Hartmanna i ewakuacja ropy ssakiem; płukanie jamy ustnej roztworami antyseptycznymi (chlorheksydyna).",
      monitoring: "Nadzór nad drożnością dróg oddechowych, kontrola krwawienia po nacięciu, codzienna kontrola rozwierania jamy ropnia przez kolejne 1–2 dni do ustąpienia treści ropnej."
    },
    diffTable: {
      title: "⚔️ Tabela Różnicowa: Ropień Okołomigdałkowy vs Mononukleoza Zakaźna vs Ropień Zagardłowy vs Angina Plauta-Vincenta",
      headers: ["Cecha kliniczna", "Ropień Okołomigdałkowy", "Mononukleoza (EBV)", "Ropień Zagardłowy", "Angina Plauta-Vincenta"],
      rows: [
        ["Symetria zmian w gardle", "WYBITNIE JEDNOSTRONNA (asymetria, języczek w bok)", "Obustronne, symetryczne masywne powiększenie", "Symetryczne lub uwypuklenie tylnej ściany gardła", "Jednostronne owrzodzenie migdałka z szarym nalotem"],
        ["Szczękościsk (trismus)", "Bardzo nasilony (naciekanie mm. skrzydłowych)", "Brak szczękościsku", "Umiarkowany lub brak, sztywność karku", "Brak szczękościsku"],
        ["Wiek pacjentów", "Młodzi dorośli (20–40 lat)", "Nastolatki i młodzi dorośli (15–25 lat)", "Głównie małe dzieci (<4–5 lat)", "Młodzi dorośli z zaniedbaną higieną jamy ustnej"],
        ["Wątroba i śledziona", "Prawidłowe", "Hepatosplenomegalia w USG", "Prawidłowe", "Prawidłowe"],
        ["Morfologia krwi", "Wysoka leukocytoza neutrofilowa", "Limfocytoza z obecnością atypowych limfocytów", "Wysoka leukocytoza", "Mierny odczyn zapalny"],
        ["Leczenie pierwszego wyboru", "Nacięcie i drenaż + antybiotyk i.v.", "Leczenie objawowe (przeciwbólowe, nawodnienie)", "Pilny drenaż chirurgiczny + antybiotyk i.v.", "Penicylina lub metronidazol doustnie"]
      ]
    },
    lekQuestions: [
      {
        q: "Który objaw kliniczny NAJSILNIEJ różnicuje ropień okołomigdałkowy od niepowikłanego ostrego zapalenia migdałków podniebiennych (anginy)?",
        question: "Który objaw kliniczny NAJSILNIEJ różnicuje ropień okołomigdałkowy od niepowikłanego ostrego zapalenia migdałków podniebiennych (anginy)?",
        opts: [
          "A) Jednostronna asymetria podniebienia z przemieszczeniem języczka w stronę przeciwną oraz szczękościsk (trismus)",
          "B) Obecność białego nalotu włóknikowego na obu migdałkach podniebiennych",
          "C) Wzrost temperatury ciała powyżej 38,0°C z dreszczami",
          "D) Przekrwienie błony śluzowej tylnej ściany gardła",
          "E) Powiększenie węzłów chłonnych podżuchwowych"
        ],
        options: [
          "A) Jednostronna asymetria podniebienia z przemieszczeniem języczka w stronę przeciwną oraz szczękościsk (trismus)",
          "B) Obecność białego nalotu włóknikowego na obu migdałkach podniebiennych",
          "C) Wzrost temperatury ciała powyżej 38,0°C z dreszczami",
          "D) Przekrwienie błony śluzowej tylnej ściany gardła",
          "E) Powiększenie węzłów chłonnych podżuchwowych"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! W niepowikłanej anginie zmiany są zazwyczaj obustronne i symetryczne, a szczękościsk nie występuje. Cechami patognomonicznymi dla ropnia okołomigdałkowego są: wybitna jednostronna asymetria gardła z wypchnięciem migdałka i zepchnięciem języczka na stronę zdrową oraz szczękościsk (trismus) wywołany naciekiem mięśnia skrzydłowego przyśrodkowego.",
        expl: "Prawidłowo! W niepowikłanej anginie zmiany są zazwyczaj obustronne i symetryczne, a szczękościsk nie występuje. Cechami patognomonicznymi dla ropnia okołomigdałkowego są: wybitna jednostronna asymetria gardła z wypchnięciem migdałka i zepchnięciem języczka na stronę zdrową oraz szczękościsk (trismus) wywołany naciekiem mięśnia skrzydłowego przyśrodkowego.",
        explanation: "Prawidłowo! W niepowikłanej anginie zmiany są zazwyczaj obustronne i symetryczne, a szczękościsk nie występuje. Cechami patognomonicznymi dla ropnia okołomigdałkowego są: wybitna jednostronna asymetria gardła z wypchnięciem migdałka i zepchnięciem języczka na stronę zdrową oraz szczękościsk (trismus) wywołany naciekiem mięśnia skrzydłowego przyśrodkowego."
      },
      {
        q: "W jaką stronę zostaje przemieszczony języczek podniebienny w badaniu gardła u pacjenta z prawostronnym ropniem okołomigdałkowym?",
        question: "W jaką stronę zostaje przemieszczony języczek podniebienny w badaniu gardła u pacjenta z prawostronnym ropniem okołomigdałkowym?",
        opts: [
          "A) W stronę przeciwną do ropnia (w stronę lewą / stronę zdrową)",
          "B) W stronę tożstronną do ropnia (w stronę prawą / stronę chorą)",
          "C) Pozostaje idealnie w linii pośrodkowej bez żadnego przemieszczenia",
          "D) Ulega przemieszczeniu do wnętrza jamy nosowej",
          "E) Języczek ulega natychmiastowemu samoistnemu stopieniu"
        ],
        options: [
          "A) W stronę przeciwną do ropnia (w stronę lewą / stronę zdrową)",
          "B) W stronę tożstronną do ropnia (w stronę prawą / stronę chorą)",
          "C) Pozostaje idealnie w linii pośrodkowej bez żadnego przemieszczenia",
          "D) Ulega przemieszczeniu do wnętrza jamy nosowej",
          "E) Języczek ulega natychmiastowemu samoistnemu stopieniu"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Masa ropna gromadząca się w przestrzeni okołomigdałkowej po stronie prawej rozpycha łuk podniebienno-gardłowy i spycha cały aparat podniebienia miękkiego wraz z języczkiem podniebiennym w stronę przeciwną (w stronę lewą, czyli w stronę zdrową).",
        expl: "Prawidłowo! Masa ropna gromadząca się w przestrzeni okołomigdałkowej po stronie prawej rozpycha łuk podniebienno-gardłowy i spycha cały aparat podniebienia miękkiego wraz z języczkiem podniebiennym w stronę przeciwną (w stronę lewą, czyli w stronę zdrową).",
        explanation: "Prawidłowo! Masa ropna gromadząca się w przestrzeni okołomigdałkowej po stronie prawej rozpycha łuk podniebienno-gardłowy i spycha cały aparat podniebienia miękkiego wraz z języczkiem podniebiennym w stronę przeciwną (w stronę lewą, czyli w stronę zdrową)."
      },
      {
        q: "Jakie duże naczynie tętnicze szyi znajduje się w bezpośrednim sąsiedztwie przestrzeni okołomigdałkowej i wymaga szczególnej ostrożności podczas nacinania ropnia skalpelem?",
        question: "Jakie duże naczynie tętnicze szyi znajduje się w bezpośrednim sąsiedztwie przestrzeni okołomigdałkowej i wymaga szczególnej ostrożności podczas nacinania ropnia skalpelem?",
        opts: [
          "A) Tętnica szyjna wewnętrzna (arteria carotis interna)",
          "B) Tętnica podobojczykowa",
          "C) Pień ramienno-głowowy",
          "D) Tętnica piersiowa wewnętrzna",
          "E) Tętnica skroniowa powierzchowna"
        ],
        options: [
          "A) Tętnica szyjna wewnętrzna (arteria carotis interna)",
          "B) Tętnica podobojczykowa",
          "C) Pień ramienno-głowowy",
          "D) Tętnica piersiowa wewnętrzna",
          "E) Tętnica skroniowa powierzchowna"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Tętnica szyjna wewnętrzna przebiega w przestrzeni przygardłowej zaledwie ok. 2–2,5 cm bocznie i ku tyłowi od torebki migdałka podniebiennego (niekiedy wykazuje pętlowaty przebieg zbliżający ją do ściany gardła). Nacięcie musi być wykonywane ściśle w osi strzałkowej z zabezpieczeniem głębokości ostrza skalpela (oklejenie przylepcem do 0,5–1 cm), aby uniknąć śmiertelnego uszkodzenia tętnicy szyjnej.",
        expl: "Prawidłowo! Tętnica szyjna wewnętrzna przebiega w przestrzeni przygardłowej zaledwie ok. 2–2,5 cm bocznie i ku tyłowi od torebki migdałka podniebiennego (niekiedy wykazuje pętlowaty przebieg zbliżający ją do ściany gardła). Nacięcie musi być wykonywane ściśle w osi strzałkowej z zabezpieczeniem głębokości ostrza skalpela (oklejenie przylepcem do 0,5–1 cm), aby uniknąć śmiertelnego uszkodzenia tętnicy szyjnej.",
        explanation: "Prawidłowo! Tętnica szyjna wewnętrzna przebiega w przestrzeni przygardłowej zaledwie ok. 2–2,5 cm bocznie i ku tyłowi od torebki migdałka podniebiennego (niekiedy wykazuje pętlowaty przebieg zbliżający ją do ściany gardła). Nacięcie musi być wykonywane ściśle w osi strzałkowej z zabezpieczeniem głębokości ostrza skalpela (oklejenie przylepcem do 0,5–1 cm), aby uniknąć śmiertelnego uszkodzenia tętnicy szyjnej."
      },
      {
        q: "Wskaż zestaw twierdzeń PRAWDZIWYCH dotyczących ropnia okołomigdałkowego:\n1. Podstawową metodą leczenia jest nakłucie, nacięcie i drenaż chirurgiczny ropnia.\n2. W etiologii dominują paciorkowce grupy A oraz bakterie beztlenowe jamy ustnej.\n3. Zespół Lemierre'a jest groźnym powikłaniem polegającym na zakrzepowym zapaleniu żyły szyjnej wewnętrznej.\n4. Ból w ropniu okołomigdałkowym typowo promieniuje odruchowo do ucha po stronie chorej (otalgia).\n5. Każdy pacjent z ropniem okołomigdałkowym wymaga bezwzględnej intubacji dotchawiczej w znieczuleniu ogólnym przed nakłuciem.",
        question: "Wskaż zestaw twierdzeń PRAWDZIWYCH dotyczących ropnia okołomigdałkowego:\n1. Podstawową metodą leczenia jest nakłucie, nacięcie i drenaż chirurgiczny ropnia.\n2. W etiologii dominują paciorkowce grupy A oraz bakterie beztlenowe jamy ustnej.\n3. Zespół Lemierre'a jest groźnym powikłaniem polegającym na zakrzepowym zapaleniu żyły szyjnej wewnętrznej.\n4. Ból w ropniu okołomigdałkowym typowo promieniuje odruchowo do ucha po stronie chorej (otalgia).\n5. Każdy pacjent z ropniem okołomigdałkowym wymaga bezwzględnej intubacji dotchawiczej w znieczuleniu ogólnym przed nakłuciem.",
        opts: [
          "A) 1, 2, 3, 4",
          "B) 1, 2, 5",
          "C) 2, 3, 4, 5",
          "D) 1, 3, 5",
          "E) Tylko 1 i 2"
        ],
        options: [
          "A) 1, 2, 3, 4",
          "B) 1, 2, 5",
          "C) 2, 3, 4, 5",
          "D) 1, 3, 5",
          "E) Tylko 1 i 2"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Zdania 1, 2, 3 i 4 są prawdziwe. Zdanie 5 jest fałszywe: nacięcie i drenaż ropnia okołomigdałkowego wykonuje się rutynowo u dorosłych w pozycji siedzącej w znieczuleniu miejscowym (aerozol i nasiękowe znieczulenie lignokainą). Znieczulenie ogólne stosuje się wyjątkowo u małych dzieci lub przy braku współpracy.",
        expl: "Prawidłowo! Zdania 1, 2, 3 i 4 są prawdziwe. Zdanie 5 jest fałszywe: nacięcie i drenaż ropnia okołomigdałkowego wykonuje się rutynowo u dorosłych w pozycji siedzącej w znieczuleniu miejscowym (aerozol i nasiękowe znieczulenie lignokainą). Znieczulenie ogólne stosuje się wyjątkowo u małych dzieci lub przy braku współpracy.",
        explanation: "Prawidłowo! Zdania 1, 2, 3 i 4 są prawdziwe. Zdanie 5 jest fałszywe: nacięcie i drenaż ropnia okołomigdałkowego wykonuje się rutynowo u dorosłych w pozycji siedzącej w znieczuleniu miejscowym (aerozol i nasiękowe znieczulenie lignokainą). Znieczulenie ogólne stosuje się wyjątkowo u małych dzieci lub przy braku współpracy."
      },
      {
        q: "Wskaż zdanie FAŁSZYWE dotyczące ropnia okołomigdałkowego:",
        question: "Wskaż zdanie FAŁSZYWE dotyczące ropnia okołomigdałkowego:",
        opts: [
          "A) Szczękościsk w ropniu okołomigdałkowym wynika z porażenia nerwu twarzowego (VII nerwu czaszkowego)",
          "B) 'Mowa kluskowata' ('hot potato voice') jest spowodowana unieruchomieniem obrzękniętego podniebienia miękkiego",
          "C) Otalgia odruchowa (ból ucha) wynika z podrażnienia gałęzi nerwu językowo-gardłowego (nerwu Jacobsona)",
          "D) Wskazaniem do pilnej tomografii komputerowej szyi z kontrastem jest podejrzenie ropowicy przestrzeni przygardłowej",
          "E) Brak ewakuacji ropnia grozi zstępującym martwiczym zapaleniem śródpiersia (descending necrotizing mediastinitis)"
        ],
        options: [
          "A) Szczękościsk w ropniu okołomigdałkowym wynika z porażenia nerwu twarzowego (VII nerwu czaszkowego)",
          "B) 'Mowa kluskowata' ('hot potato voice') jest spowodowana unieruchomieniem obrzękniętego podniebienia miękkiego",
          "C) Otalgia odruchowa (ból ucha) wynika z podrażnienia gałęzi nerwu językowo-gardłowego (nerwu Jacobsona)",
          "D) Wskazaniem do pilnej tomografii komputerowej szyi z kontrastem jest podejrzenie ropowicy przestrzeni przygardłowej",
          "E) Brak ewakuacji ropnia grozi zstępującym martwiczym zapaleniem śródpiersia (descending necrotizing mediastinitis)"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Zdanie A jest fałszywe. Szczękościsk (trismus) w ropniu okołomigdałkowym NIE wynika z uszkodzenia nerwu twarzowego, lecz z bezpośredniego nacieczenia zapalnego i skurczu mięśni żwaczowych – przede wszystkim mięśnia skrzydłowego przyśrodkowego (musculus pterygoideus medialis), który leży w bezpośrednim sąsiedztwie torebki migdałka.",
        expl: "Prawidłowo! Zdanie A jest fałszywe. Szczękościsk (trismus) w ropniu okołomigdałkowym NIE wynika z uszkodzenia nerwu twarzowego, lecz z bezpośredniego nacieczenia zapalnego i skurczu mięśni żwaczowych – przede wszystkim mięśnia skrzydłowego przyśrodkowego (musculus pterygoideus medialis), który leży w bezpośrednim sąsiedztwie torebki migdałka.",
        explanation: "Prawidłowo! Zdanie A jest fałszywe. Szczękościsk (trismus) w ropniu okołomigdałkowym NIE wynika z uszkodzenia nerwu twarzowego, lecz z bezpośredniego nacieczenia zapalnego i skurczu mięśni żwaczowych – przede wszystkim mięśnia skrzydłowego przyśrodkowego (musculus pterygoideus medialis), który leży w bezpośrednim sąsiedztwie torebki migdałka."
      },
      {
        q: "Co to jest zespół Lemierre'a (Lemierre's syndrome) będący rzadkim, lecz śmiertelnie groźnym powikłaniem zakażeń gardła?",
        question: "Co to jest zespół Lemierre'a (Lemierre's syndrome) będący rzadkim, lecz śmiertelnie groźnym powikłaniem zakażeń gardła?",
        opts: [
          "A) Zakrzepowe zapalenie żyły szyjnej wewnętrznej z posocznicą i przerzutowymi ropniami w płucach wywołane przez beztlenowca Fusobacterium necrophorum",
          "B) Pęknięcie aorty wstępującej w wyniku zapalenia migdałków",
          "C) Obrzęk naczynioruchowy Quinckego wywołany wrodzonym niedoborem inhibitora C1",
          "D) Przewlekłe zapalenie ucha środkowego z perlakiem piramidy kości skroniowej",
          "E) Ziarniniakowatość z zapaleniem naczyń (Wegenera) z zajęciem zatok przynosowych"
        ],
        options: [
          "A) Zakrzepowe zapalenie żyły szyjnej wewnętrznej z posocznicą i przerzutowymi ropniami w płucach wywołane przez beztlenowca Fusobacterium necrophorum",
          "B) Pęknięcie aorty wstępującej w wyniku zapalenia migdałków",
          "C) Obrzęk naczynioruchowy Quinckego wywołany wrodzonym niedoborem inhibitora C1",
          "D) Przewlekłe zapalenie ucha środkowego z perlakiem piramidy kości skroniowej",
          "E) Ziarniniakowatość z zapaleniem naczyń (Wegenera) z zajęciem zatok przynosowych"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Zespół Lemierre'a (tzw. posocznica pomenstruacyjna/pogardłowa) to powikłanie anginy lub ropnia gardła wywołane przez Fusobacterium necrophorum. Zakażenie penetruje do przestrzeni przygardłowej, wywołując zakrzepowe zapalenie żyły szyjnej wewnętrznej (IJV thrombophlebitis), z której odrywają się septyczne zatory, tworząc mnogie ropnie w płucach i stawach.",
        expl: "Prawidłowo! Zespół Lemierre'a (tzw. posocznica pomenstruacyjna/pogardłowa) to powikłanie anginy lub ropnia gardła wywołane przez Fusobacterium necrophorum. Zakażenie penetruje do przestrzeni przygardłowej, wywołując zakrzepowe zapalenie żyły szyjnej wewnętrznej (IJV thrombophlebitis), z której odrywają się septyczne zatory, tworząc mnogie ropnie w płucach i stawach.",
        explanation: "Prawidłowo! Zespół Lemierre'a (tzw. posocznica pomenstruacyjna/pogardłowa) to powikłanie anginy lub ropnia gardła wywołane przez Fusobacterium necrophorum. Zakażenie penetruje do przestrzeni przygardłowej, wywołując zakrzepowe zapalenie żyły szyjnej wewnętrznej (IJV thrombophlebitis), z której odrywają się septyczne zatory, tworząc mnogie ropnie w płucach i stawach."
      },
      {
        q: "Dlaczego po wykonaniu nacięcia ropnia okołomigdałkowego zaleca się pacjentowi natychmiastowe pochylenie głowy do przodu?",
        question: "Dlaczego po wykonaniu nacięcia ropnia okołomigdałkowego zaleca się pacjentowi natychmiastowe pochylenie głowy do przodu?",
        opts: [
          "A) Aby wypływająca pod ciśnieniem treść ropna i krew wypłynęły do nerki, zapobiegając aspiracji ropy do dróg oddechowych",
          "B) W celu szybkiego obniżenia ciśnienia w tętnicach szyjnych",
          "C) Aby ułatwić zamknięcie nacięcia przez mięśnie języka",
          "D) W celu zapobieżenia odwarstwieniu siatkówki oka",
          "E) Pozycja głowy nie ma żadnego znaczenia dla bezpieczeństwa pacjenta"
        ],
        options: [
          "A) Aby wypływająca pod ciśnieniem treść ropna i krew wypłynęły do nerki, zapobiegając aspiracji ropy do dróg oddechowych",
          "B) W celu szybkiego obniżenia ciśnienia w tętnicach szyjnych",
          "C) Aby ułatwić zamknięcie nacięcia przez mięśnie języka",
          "D) W celu zapobieżenia odwarstwieniu siatkówki oka",
          "E) Pozycja głowy nie ma żadnego znaczenia dla bezpieczeństwa pacjenta"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Podczas nacięcia ropnia pod ciśnieniem wypływa obfita treść ropna z krwią. Odgięcie głowy do tyłu grozi zachłyśnięciem ropą do krtani i tchawicy, co może wywołać skurcz krtani, ostre uduszenie lub zachłystowe zapalenie płuc. Pacjent musi natychmiast pochylić się do przodu i wypluwać ropę do miski nerkowatej przy równoległym odsysaniu ssakiem.",
        expl: "Prawidłowo! Podczas nacięcia ropnia pod ciśnieniem wypływa obfita treść ropna z krwią. Odgięcie głowy do tyłu grozi zachłyśnięciem ropą do krtani i tchawicy, co może wywołać skurcz krtani, ostre uduszenie lub zachłystowe zapalenie płuc. Pacjent musi natychmiast pochylić się do przodu i wypluwać ropę do miski nerkowatej przy równoległym odsysaniu ssakiem.",
        explanation: "Prawidłowo! Podczas nacięcia ropnia pod ciśnieniem wypływa obfita treść ropna z krwią. Odgięcie głowy do tyłu grozi zachłyśnięciem ropą do krtani i tchawicy, co może wywołać skurcz krtani, ostre uduszenie lub zachłystowe zapalenie płuc. Pacjent musi natychmiast pochylić się do przodu i wypluwać ropę do miski nerkowatej przy równoległym odsysaniu ssakiem."
      },
      {
        q: "Co to jest tzw. tonsillectomie à chaud (tonsillektomia 'na gorąco')?",
        question: "Co to jest tzw. tonsillectomie à chaud (tonsillektomia 'na gorąco')?",
        opts: [
          "A) Wycięcie migdałków podniebiennych wykonywane w ostrej fazie ropnia okołomigdałkowego w znieczuleniu ogólnym",
          "B) Przyżeganie migdałków gorącym żagwią lub prądem diatermicznym w POZ",
          "C) Płukanie gardła wrzącym naparem z szałwii lekarskiej",
          "D) Naświetlanie promieniami podczerwonymi skóry szyi",
          "E) Usunięcie migdałków po 6 miesiącach od całkowitego wygojenia"
        ],
        options: [
          "A) Wycięcie migdałków podniebiennych wykonywane w ostrej fazie ropnia okołomigdałkowego w znieczuleniu ogólnym",
          "B) Przyżeganie migdałków gorącym żagwią lub prądem diatermicznym w POZ",
          "C) Płukanie gardła wrzącym naparem z szałwii lekarskiej",
          "D) Naświetlanie promieniami podczerwonymi skóry szyi",
          "E) Usunięcie migdałków po 6 miesiącach od całkowitego wygojenia"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Tonsillectomie à chaud ('na gorąco') to usunięcie migdałków podniebiennych (jednostronne lub obustronne) przeprowadzane w trakcie trwania ostrego stanu zapalnego z ropniem. Jest wskazana przy: braku możliwości drenażu w znieczuleniu miejscowym (np. u dzieci), powikłaniach zstępujących do szyi i śródpiersia, krwawieniu z ropnia lub nawrotowym ropniu.",
        expl: "Prawidłowo! Tonsillectomie à chaud ('na gorąco') to usunięcie migdałków podniebiennych (jednostronne lub obustronne) przeprowadzane w trakcie trwania ostrego stanu zapalnego z ropniem. Jest wskazana przy: braku możliwości drenażu w znieczuleniu miejscowym (np. u dzieci), powikłaniach zstępujących do szyi i śródpiersia, krwawieniu z ropnia lub nawrotowym ropniu.",
        explanation: "Prawidłowo! Tonsillectomie à chaud ('na gorąco') to usunięcie migdałków podniebiennych (jednostronne lub obustronne) przeprowadzane w trakcie trwania ostrego stanu zapalnego z ropniem. Jest wskazana przy: braku możliwości drenażu w znieczuleniu miejscowym (np. u dzieci), powikłaniach zstępujących do szyi i śródpiersia, krwawieniu z ropnia lub nawrotowym ropniu."
      },
      {
        q: "Który nerw czaszkowy odpowiada za zjawisko odruchowej otalgii (promieniowania bólu do ucha) u chorych z zapaleniem i ropniem migdałka podniebiennego?",
        question: "Który nerw czaszkowy odpowiada za zjawisko odruchowej otalgii (promieniowania bólu do ucha) u chorych z zapaleniem i ropniem migdałka podniebiennego?",
        opts: [
          "A) Nerw językowo-gardłowy (IX nerw czaszkowy przez gałąź bębenkową – nerw Jacobsona)",
          "B) Nerw odwodzący (VI nerw czaszkowy)",
          "C) Nerw węchowy (I nerw czaszkowy)",
          "D) Nerw dodatkowy (XI nerw czaszkowy)",
          "E) Nerw bloczkowy (IV nerw czaszkowy)"
        ],
        options: [
          "A) Nerw językowo-gardłowy (IX nerw czaszkowy przez gałąź bębenkową – nerw Jacobsona)",
          "B) Nerw odwodzący (VI nerw czaszkowy)",
          "C) Nerw węchowy (I nerw czaszkowy)",
          "D) Nerw dodatkowy (XI nerw czaszkowy)",
          "E) Nerw bloczkowy (IV nerw czaszkowy)"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Migdałek podniebienny jest czuciowo unerwiony przez gałęzie nerwu językowo-gardłowego (IX). Nerw ten oddaje gałąź bębenkową (nerw Jacobsona) zaopatrującą czuciowo jamę bębenkową ucha środkowego. Podrażnienie zakończeń nerwowych w gardle wywołuje ból rzutowany w uchu (otalgia odruchowa) przy całkowicie prawidłowym obrazie otoskopowym błony bębenkowej.",
        expl: "Prawidłowo! Migdałek podniebienny jest czuciowo unerwiony przez gałęzie nerwu językowo-gardłowego (IX). Nerw ten oddaje gałąź bębenkową (nerw Jacobsona) zaopatrującą czuciowo jamę bębenkową ucha środkowego. Podrażnienie zakończeń nerwowych w gardle wywołuje ból rzutowany w uchu (otalgia odruchowa) przy całkowicie prawidłowym obrazie otoskopowym błony bębenkowej.",
        explanation: "Prawidłowo! Migdałek podniebienny jest czuciowo unerwiony przez gałęzie nerwu językowo-gardłowego (IX). Nerw ten oddaje gałąź bębenkową (nerw Jacobsona) zaopatrującą czuciowo jamę bębenkową ucha środkowego. Podrażnienie zakończeń nerwowych w gardle wywołuje ból rzutowany w uchu (otalgia odruchowa) przy całkowicie prawidłowym obrazie otoskopowym błony bębenkowej."
      },
      {
        q: "W jakiej przestrzeni anatomicznej szyi gromadzi się ropa w ropniu okołomigdałkowym?",
        question: "W jakiej przestrzeni anatomicznej szyi gromadzi się ropa w ropniu okołomigdałkowym?",
        opts: [
          "A) Między torebką migdałka podniebiennego a mięśniem zwieraczem górnym gardła",
          "B) Wewnątrz ślinianki przyusznej pod powięzią przyuszniczą",
          "C) W komorze przedniej krtani nad fałdami głosowymi",
          "D) W dole skrzydłowo-podniebiennym za guzem szczęki",
          "E) W jamie opłucnej między opłucną ścienną a trzewną"
        ],
        options: [
          "A) Między torebką migdałka podniebiennego a mięśniem zwieraczem górnym gardła",
          "B) Wewnątrz ślinianki przyusznej pod powięzią przyuszniczą",
          "C) W komorze przedniej krtani nad fałdami głosowymi",
          "D) W dole skrzydłowo-podniebiennym za guzem szczęki",
          "E) W jamie opłucnej między opłucną ścienną a trzewną"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Przestrzeń okołomigdałkowa to potencjalna przestrzeń anatomiczna wypełniona luźną tkanką łączną, ograniczona od strony przyśrodkowej przez torebkę migdałka podniebiennego, a od strony bocznej przez mięsień zwieracz górny gardła (musculus constrictor pharyngis superior).",
        expl: "Prawidłowo! Przestrzeń okołomigdałkowa to potencjalna przestrzeń anatomiczna wypełniona luźną tkanką łączną, ograniczona od strony przyśrodkowej przez torebkę migdałka podniebiennego, a od strony bocznej przez mięsień zwieracz górny gardła (musculus constrictor pharyngis superior).",
        explanation: "Prawidłowo! Przestrzeń okołomigdałkowa to potencjalna przestrzeń anatomiczna wypełniona luźną tkanką łączną, ograniczona od strony przyśrodkowej przez torebkę migdałka podniebiennego, a od strony bocznej przez mięsień zwieracz górny gardła (musculus constrictor pharyngis superior)."
      },
      {
        q: "Co należy zrobić w kolejnych 1–2 dobach po nacięciu ropnia okołomigdałkowego, aby zapobiec przedwczesnemu zrostowi brzegów rany i retencji ropy?",
        question: "Co należy zrobić w kolejnych 1–2 dobach po nacięciu ropnia okołomigdałkowego, aby zapobiec przedwczesnemu zrostowi brzegów rany i retencji ropy?",
        opts: [
          "A) Wykonać mechaniczne rozszerzenie brzegów nacięcia kleszczykami (rozwarcie rany) pod kontrolą wzroku",
          "B) Założyć szwy niewchłanialne materacowe na łuk podniebienny",
          "C) Podać pacjentowi klej tkankowy w celu natychmiastowego zasklepienia otworu",
          "D) Zastosować elektrokoagulację brzegów rany w celu wywołania blizny",
          "E) Zakazać pacjentowi otwierania ust przez 7 dni"
        ],
        options: [
          "A) Wykonać mechaniczne rozszerzenie brzegów nacięcia kleszczykami (rozwarcie rany) pod kontrolą wzroku",
          "B) Założyć szwy niewchłanialne materacowe na łuk podniebienny",
          "C) Podać pacjentowi klej tkankowy w celu natychmiastowego zasklepienia otworu",
          "D) Zastosować elektrokoagulację brzegów rany w celu wywołania blizny",
          "E) Zakazać pacjentowi otwierania ust przez 7 dni"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Błona śluzowa jamy ustnej goi się bardzo szybko. Brzegi nacięcia mogą skleić się w ciągu 24 godzin, co doprowadzi do ponownego zamknięcia zbiornika ropy. Standardem jest codzienne kontrolowanie i delikatne tępe rozwieranie rany kleszczykami Hartmanna przez 1–2 dni po zabiegu, aż do całkowitego ustąpienia drenażu ropnego.",
        expl: "Prawidłowo! Błona śluzowa jamy ustnej goi się bardzo szybko. Brzegi nacięcia mogą skleić się w ciągu 24 godzin, co doprowadzi do ponownego zamknięcia zbiornika ropy. Standardem jest codzienne kontrolowanie i delikatne tępe rozwieranie rany kleszczykami Hartmanna przez 1–2 dni po zabiegu, aż do całkowitego ustąpienia drenażu ropnego.",
        explanation: "Prawidłowo! Błona śluzowa jamy ustnej goi się bardzo szybko. Brzegi nacięcia mogą skleić się w ciągu 24 godzin, co doprowadzi do ponownego zamknięcia zbiornika ropy. Standardem jest codzienne kontrolowanie i delikatne tępe rozwieranie rany kleszczykami Hartmanna przez 1–2 dni po zabiegu, aż do całkowitego ustąpienia drenażu ropnego."
      }
    ],
    flashcards: [
      { q: "Jaka jest klasyczna triada objawów ropnia okołomigdałkowego?", a: "Silny jednostronny ból gardła promieniujący do ucha (otalgia), szczękościsk (trismus) oraz 'mowa kluskowata' ('hot potato voice')." },
      { q: "Co widać w faryngoskopii w ropniu okołomigdałkowym?", a: "Uwypuklenie łuku podniebiennego, zepchnięcie migdałka ku dołowi i przyśrodkowo oraz przemieszczenie języczka na stronę ZDROWĄ." },
      { q: "Jaka jest procedura pierwszego rzutu w uformowanym ropniu?", a: "Nakłucie próbne igłą, nacięcie i rozszerzenie kleszczykami (drenaż ropnia) w znieczuleniu miejscowym." },
      { q: "Jaki jest mechanizm szczękościsku (trismus) w ropniu okołomigdałkowym?", a: "Nacieczenie zapalne i odruchowy skurcz mięśnia skrzydłowego przyśrodkowego." },
      { q: "Czym jest zespół Lemierre'a?", a: "Zakrzepowym zapaleniem żyły szyjnej wewnętrznej z septycznymi zatorami w płucach wywołanym przez Fusobacterium necrophorum." },
      { q: "Jaka antybiotykoterapia dożylna jest zalecana w ropniu okołomigdałkowym?", a: "Amoksycylina z kwasem klawulanowym i.v. lub ceftriakson z klindamycyną (pokrycie paciorkowców i beztlenowców)." }
    ]
  }
];

async function run() {
  console.log('Writing and encrypting Cases 163, 164, 165...');
  for (const c of casesData) {
    const enc = await encryptStringAes(JSON.stringify(c, null, 2), MASTER_KEY);
    fs.writeFileSync(path.join('cases', c.file), JSON.stringify(enc, null, 2), 'utf8');
    console.log(`✓ Case #${c.id} (${c.file}) saved and encrypted.`);
  }
}

run().catch(console.error);

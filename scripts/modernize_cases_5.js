const fs = require('fs');
const { decryptObjectAes, encryptStringAes } = require('./encrypt_case.js');
const PASSWORD = '@LEKSzymon28111999';

async function modernize() {
  console.log("Modernizing cases: 21, 30, 34, 38, 68 with 2024/2025 guidelines...");

  // --- CASE 21: POChP (GOLD 2024 / 2025) ---
  {
    const raw = JSON.parse(fs.readFileSync('cases/21_pochp.json', 'utf8'));
    const c = await decryptObjectAes(raw, PASSWORD);
    
    // Add GOLD 2024 Rome Proposal and Triple Therapy eosinophil threshold (>=300/ul) to Step 8
    c.steps[7] = {
      stepNum: 8,
      title: "Krok 8: Prewencja wtórna, wytyczne GOLD 2024/2025, progi eozynofilii i potrójna terapia wziewna",
      desc: "Dzięki 24-godzinnej terapii NIV, wziewnym bronchodilatatorom i sterydoterapii stan pacjenta uległ radykalnej poprawie: pH 7.39, PaCO2 49 mmHg, duszność ustąpiła. W kontrolnej morfologii krwi przed wypisem stwierdzasz bezwzględną liczbę eozynofilów wynoszącą 340 komórek/µl. Jakie długofalowe leczenie wziewne oraz prewencję zaostrzeń zalecisz pacjentowi zgodnie z wytycznymi GOLD 2024/2025?",
      scenario: "Dzięki 24-godzinnej terapii NIV, wziewnym bronchodilatatorom i sterydoterapii stan pacjenta uległ radykalnej poprawie: pH 7.39, PaCO2 49 mmHg, duszność ustąpiła. W kontrolnej morfologii krwi przed wypisem stwierdzasz bezwzględną liczbę eozynofilów wynoszącą 340 komórek/µl. Jakie długofalowe leczenie wziewne oraz prewencję zaostrzeń zalecisz pacjentowi zgodnie z wytycznymi GOLD 2024/2025?",
      options: [
        {
          text: "Wdrożenie potrójnej terapii wziewnej w jednym inhalatorze (LABA + LAMA + wGKS, np. formoterol/glikopironium/budezonid) z uwagi na eozynofilię krwi >=300/µl i przebyte ciężkie zaostrzenie; bezwzględne zaprzestanie palenia oraz szczepienia (grypa, pneumokoki PCV20, RSV, krztusiec Tdap, COVID-19).",
          correct: true,
          feedback: "Znakomicie! Zgodnie z wytycznymi GOLD 2024/2025: 1) Eozynofilia krwi >=300 komórek/µl u chorego z częstymi lub ciężkimi zaostrzeniami wymagającymi hospitalizacji stanowi silne wskazanie klasy I do włączenia wziewnego glikokortykosteroidu w ramach potrójnej terapii (LABA + LAMA + wGKS); 2) Zaprzestanie palenia tytoniu to jedyna interwencja niefarmakologiczna hamująca spadek FEV1; 3) Szczepienia ochronne (w tym nowo rekomendowane szczepienie przeciw RSV u dorosłych >=60 r.ż. z chorobami przewlekłymi) drastycznie redukują ryzyko kolejnych hospitalizacji."
        },
        {
          text: "Wypisanie chorego wyłącznie na monoterapii SABA doraźnie i zakaz stosowania jakichkolwiek leków długodziałających.",
          correct: false,
          feedback: "Kardynalny błąd! Monoterapia krótko działającymi bronchodilatatorami nie zapewnia kontroli POChP i prowadzi do szybkiego nawrotu ciężkiej niewydolności oddechowej."
        },
        {
          text: "Podawanie doustnego prednizonu w dawce 40 mg codziennie przez 5 lat bez leków wziewnych.",
          correct: false,
          feedback: "Błąd! Przewlekła doustna glikokortykosteroidoterapia w POChP jest przeciwwskazana z powodu ciężkich powikłań (miopatia posteroidowa, osteoporoza, cukrzyca, oportunistyczne zakażenia) i braku poprawy przeżycia."
        },
        {
          text: "Zalecenie całkowitego unikania szczepień ochronnych z uwagi na 'przemęczenie układu immunologicznego'.",
          correct: false,
          feedback: "Niedopuszczalne zalecenie. Infekcje wirusowe i bakteryjne odpowiadają za >70% zaostrzeń POChP."
        }
      ]
    };
    
    const reEnc = await encryptStringAes(JSON.stringify(c, null, 2), PASSWORD);
    fs.writeFileSync('cases/21_pochp.json', JSON.stringify(reEnc, null, 2), 'utf8');
    console.log("Updated case 21 (GOLD 2024/2025)");
  }

  // --- CASE 30: STAN ASTMATYCZNY (GINA 2024) ---
  {
    const raw = JSON.parse(fs.readFileSync('cases/30_stan_astmatyczny.json', 'utf8'));
    const c = await decryptObjectAes(raw, PASSWORD);
    
    // Strengthen Step 8 with GINA 2024 Track 1 (SMART/MART) vs Track 2 and avoidance of SABA monotherapy
    c.steps[7] = {
      stepNum: 8,
      title: "Krok 8: Wytyczne GINA 2024 – Ścieżka preferowana (Track 1 / SMART), prewencja zgonu i zakaz monoterapii SABA",
      desc: "Po 36 godzinach intensywnej terapii na OIT (sterydy systemowe, siarczan magnezu, nebulizacje) doszło do pełnego przełamania skurczu oskrzeli, a pacjent został pomyślnie ekstubowany i przeniesiony na oddział pulmonologii. Przed wypisem do domu analizujesz dotychczasowe leczenie. Pacjent przyznaje, że przez ostatni rok stosował wyłącznie salbutamol (SABA) z dozownika, zużywając 2-3 pojemniki na miesiąc, a sterydu wziewnego nie brał 'bo bał się hormonów'. Jaki schemat leczenia podtrzymującego i doraźnego wdrażasz zgodnie z wytycznymi GINA 2024?",
      scenario: "Po 36 godzinach intensywnej terapii na OIT (sterydy systemowe, siarczan magnezu, nebulizacje) doszło do pełnego przełamania skurczu oskrzeli, a pacjent został pomyślnie ekstubowany i przeniesiony na oddział pulmonologii. Przed wypisem do domu analizujesz dotychczasowe leczenie. Pacjent przyznaje, że przez ostatni rok stosował wyłącznie salbutamol (SABA) z dozownika, zużywając 2-3 pojemniki na miesiąc, a sterydu wziewnego nie brał 'bo bał się hormonów'. Jaki schemat leczenia podtrzymującego i doraźnego wdrażasz zgodnie z wytycznymi GINA 2024?",
      options: [
        {
          text: "Wdrożenie ścieżki preferowanej GINA 2024 (Track 1 / SMART): preparat złożony z małej dawki wGKS i formoterolu (np. budezonid/formoterol) stosowany regularnie codziennie ORAZ DORAŹNIE w razie każdego epizodu duszności; całkowite wycofanie salbutamolu (SABA) w monoterapii oraz pisemny plan postępowania (Asthma Action Plan).",
          correct: true,
          feedback: "Doskonale! Rewolucja GINA (aktualizacja 2024): 1) Bezwzględny zakaz monoterapii SABA – stosowanie samego salbutamolu bez wGKS maskuje postępujące zapalenie, zwiększa nadreaktywność oskrzeli i drastycznie podnosi ryzyko zgonu w astmie; zużycie >=3 pojemników SABA/rok to uznany czynnik ryzyka zgonu! 2) Ścieżka 1 (preferowana) to strategia SMART/MART: preparat wGKS + formoterol jako lek kontrolujący codziennie ORAZ lek ratunkowy doraźnie. Każda dawka doraźna gasi tlący się pożar zapalny w drogach oddechowych."
        },
        {
          text: "Wypisanie z zaleceniem zwiększenia dawek salbutamolu do 10 wziewów dziennie bez sterydów.",
          correct: false,
          feedback: "Śmiertelny błąd! Taka praktyka doprowadziła pacjenta na OIT i skończyłaby się kolejnym zatrzymaniem krążenia w mechanizmie asfiksji."
        },
        {
          text: "Stosowanie teofiliny w czopkach doodbytniczych jako jedynego leczenia.",
          correct: false,
          feedback: "Teofilina ma wąski indeks terapeutyczny i nie jest zalecana w nowoczesnej terapii astmy."
        },
        {
          text: "Zakaz stosowania jakichkolwiek leków wziewnych na rzecz akupunktury.",
          correct: false,
          feedback: "Brak dowodów EBM, narażenie pacjenta na bezpośrednie zagrożenie życia."
        }
      ]
    };
    
    const reEnc = await encryptStringAes(JSON.stringify(c, null, 2), PASSWORD);
    fs.writeFileSync('cases/30_stan_astmatyczny.json', JSON.stringify(reEnc, null, 2), 'utf8');
    console.log("Updated case 30 (GINA 2024)");
  }

  // --- CASE 34: HFrEF (ESC 2023 / 2024 Update) ---
  {
    const raw = JSON.parse(fs.readFileSync('cases/34_hfref_dekompensacja.json', 'utf8'));
    const c = await decryptObjectAes(raw, PASSWORD);
    
    c.steps[7] = {
      stepNum: 8,
      title: "Krok 8: Wytyczne ESC 2023/2024 – 'Fantastyczna Czwórka' HFrEF, diagnostyka niedoboru żelaza i leczenie przed wypisem",
      desc: "Po 48 godzinach wspomagania inotropowego, odbarczeniu diuretycznym i wyjściu z profilu 'mokry i zimny' pacjent jest wydolny hemodynamicznie (BP 112/72 mmHg, diureza prawidłowa, kreatynina stabilna 1.2 mg/dl). W badaniach krwi oznaczono parametry gospodarki żelazem: ferrytyna 68 µg/l, wysycenie transferyny (TSAT) 14%. Jakie leczenie farmakologiczne modyfikujące rokowanie wg ESC 2023/2024 wdrażasz przed wypisem chorego?",
      scenario: "Po 48 godzinach wspomagania inotropowego, odbarczeniu diuretycznym i wyjściu z profilu 'mokry i zimny' pacjent jest wydolny hemodynamicznie (BP 112/72 mmHg, diureza prawidłowa, kreatynina stabilna 1.2 mg/dl). W badaniach krwi oznaczono parametry gospodarki żelazem: ferrytyna 68 µg/l, wysycenie transferyny (TSAT) 14%. Jakie leczenie farmakologiczne modyfikujące rokowanie wg ESC 2023/2024 wdrażasz przed wypisem chorego?",
      options: [
        {
          text: "Wdrożenie pełnej 'Fantastycznej Czwórki' (ARNI/sakubitryl-walsartan, zoptymalizowany beta-bloker, antagonista aldosteronu MRA oraz inhibitor SGLT2: dapagliflozyna lub empagliflozyna) oraz dożylna suplementacja karboksymaltozy żelazowej z powodu bezwzględnego niedoboru żelaza (ferrytyna <100 µg/l).",
          correct: true,
          feedback: "Znakomicie! Zgodnie z wytycznymi ESC 2023/2024: 1) Każdy chory z HFrEF (LVEF <=40%) musi otrzymać jednoczasowo lub w szybkiej sekwencji 4 klasy leków o udowodnionej redukcji śmiertelności ('Fantastyczna Czwórka': ARNI/ACEi + BB + MRA + SGLT2i flozyna); 2) Flozyny (dapagliflozyna 10 mg lub empagliflozyna 10 mg) podaje się niezależnie od obecności cukrzycy od pierwszego dnia stabilizacji; 3) Niedobór żelaza (ferrytyna <100 µg/l lub ferrytyna 100-299 µg/l przy TSAT <20%) występuje u >50% chorych z HFrEF i wymaga dożylnego podania preparatu żelaza (np. karboksymaltozy żelazowej), co zmniejsza ryzyko ponownych hospitalizacji i poprawia tolerancję wysiłku."
        },
        {
          text: "Podanie doustnych tabletek z żelazem i odstawienie wszystkich leków kardiologicznych poza furosemidem.",
          correct: false,
          feedback: "Błąd! Doustne żelazo nie wchłania się w niewydolności serca z powodu obrzęku kosmków jelitowych i stanu zapalnego (hepcydyna); zaleca się wyłącznie formę dożylną."
        },
        {
          text: "Wypisanie wyłącznie z receptą na digoksynę i zakaz stosowania flozyn.",
          correct: false,
          feedback: "Błąd w sztuce! Flozyny (SGLT2i) to fundament leczenia HFrEF (zalecenie klasy I, poziom A)."
        },
        {
          text: "Wdrożenie wysokich dawek niesteroidowych leków przeciwzapalnych w celu redukcji obrzęków.",
          correct: false,
          feedback: "Kardynalny błąd! NLPZ zatrzymują sód i wodę, pogarszają funkcję nerek i są bezwzględnie przeciwwskazane w niewydolności serca."
        }
      ]
    };
    
    const reEnc = await encryptStringAes(JSON.stringify(c, null, 2), PASSWORD);
    fs.writeFileSync('cases/34_hfref_dekompensacja.json', JSON.stringify(reEnc, null, 2), 'utf8');
    console.log("Updated case 34 (ESC 2023/2024)");
  }

  // --- CASE 38: PRZEŁOM NADCIŚNIENIOWY (ESH / PTNT 2023/2024) ---
  {
    const raw = JSON.parse(fs.readFileSync('cases/38_przelom_nadcisnieniowy.json', 'utf8'));
    const c = await decryptObjectAes(raw, PASSWORD);
    
    c.steps[0] = {
      stepNum: 1,
      title: "Krok 1: Wytyczne ESH/PTNT 2023/2024 – Stan nagły (Emergency) vs Stan pilny (Urgency) i bezwzględny zakaz podjęzykowej nifedypiny",
      desc: "Na SOR trafia 56-letni mężczyzna z ciśnieniem tętniczym 230/135 mmHg, silnym rozlanym bólem głowy, nudnościami, zaburzeniami widzenia i splątaniem (GCS 13). W badaniu dna oka stwierdzasz obrzęk tarczy nerwu wzrokowego (IV stopień wg Keitha-Wagenera-Barkera). Jak klasyfikujesz ten epizod wg najnowszych wytycznych ESH/PTNT 2023/2024 i jakie leczenie wstępne jest ZAKAZANE?",
      scenario: "Na SOR trafia 56-letni mężczyzna z ciśnieniem tętniczym 230/135 mmHg, silnym rozlanym bólem głowy, nudnościami, zaburzeniami widzenia i splątaniem (GCS 13). W badaniu dna oka stwierdzasz obrzęk tarczy nerwu wzrokowego (IV stopień wg Keitha-Wagenera-Barkera). Jak klasyfikujesz ten epizod wg najnowszych wytycznych ESH/PTNT 2023/2024 i jakie leczenie wstępne jest ZAKAZANE?",
      options: [
        {
          text: "Jest to stan nagły w nadciśnieniu tętniczym (Hypertensive Emergency) z ostrym uszkodzeniem narządowym HMOD (encefalopatia nadciśnieniowa, obrzęk tarczy n. II), wymagający hospitalizacji na OIT i dożylnych leków przeciwnadciśnieniowych (labetalol, urapidyl); bezwzględnie ZAKAZANA jest podjęzykowa nifedypina w kroplach z powodu ryzyka niekontrolowanego załamania ciśnienia i udaru mózgu.",
          correct: true,
          feedback: "Doskonale! Zgodnie z wytycznymi ESH/PTNT 2023/2024: 1) Stan nagły (Emergency) definiuje obecność ostrego, postępującego uszkodzenia narządów (HMOD: encefalopatia, obrzęk płuc, ostre rozwarstwienie aorty, udar, zawał, AKI), a nie sama bezwzględna wartość liczbowa ciśnienia; 2) Wymaga natychmiastowego leczenia dożylnego z ciągłym monitorowaniem ciśnienia; 3) Stosowanie szybko działającej nifedypiny podjęzykowo w kroplach jest historycznym błędem w sztuce (wywołuje gwałtowny spadek ciśnienia poza dolną granicę autoregulacji i zawał/udar niedokrwienny mózgu)."
        },
        {
          text: "Jest to nieistotny stan pilny (Urgency), który można odesłać do POZ z zaleceniem picia melisy.",
          correct: false,
          feedback: "Śmiertelny błąd! Pacjent ma encefalopatię i obrzęk mózgu; nieleczony zmarłby w ciągu kilku godzin z powodu wklinowania pnia mózgu."
        },
        {
          text: "Podanie podjęzykowo 30 kropli nifedypiny i wypisanie do domu.",
          correct: false,
          feedback: "Błąd kardynalny! Nifedypina w kroplach podjęzykowo jest bezwzględnie zakazana przez ESH i PTNT."
        },
        {
          text: "Podanie dożylnie adrenaliny w celu podniesienia rzutu serca.",
          correct: false,
          feedback: "Adrenalina podana przy BP 230/135 mmHg spowodowałaby natychmiastowe rozerwanie naczyń mózgowych i krwotok śródmózgowy."
        }
      ]
    };
    
    const reEnc = await encryptStringAes(JSON.stringify(c, null, 2), PASSWORD);
    fs.writeFileSync('cases/38_przelom_nadcisnieniowy.json', JSON.stringify(reEnc, null, 2), 'utf8');
    console.log("Updated case 38 (ESH/PTNT 2023/2024)");
  }

  // --- CASE 68: AKI (KDIGO 2024) ---
  {
    const raw = JSON.parse(fs.readFileSync('cases/68_aki_kdigo.json', 'utf8'));
    const c = await decryptObjectAes(raw, PASSWORD);
    
    c.steps[5] = {
      stepNum: 6,
      title: "Krok 6: Wytyczne KDIGO 2024 – Kryteria pilnej dializoterapii ratunkowej (Mnemotechnika AEIOU) i unikanie roztworów skrobi HES",
      desc: "U pacjenta z pooperacyjnym AKI stadium 3 po 12 godzinach leczenia zachowawczego dochodzi do narastania bezmoczu (diureza <10 ml/h przez ostatnie 6 godzin). W kontrolnych badaniach CITO: potas 6.8 mmol/l z poszerzeniem zespołów QRS i wysokimi, spiczastymi załamkami T w EKG, pH tętnicze 7.12, HCO3- 11 mmol/l, mocznik 210 mg/dl. Pojawiły się cechy osłuchowe obrzęku płuc (rzężenia u podstaw obu płuc, SpO2 89% na tlenie). Jak kwalifikujesz pacjenta wg wytycznych KDIGO 2024?",
      scenario: "U pacjenta z pooperacyjnym AKI stadium 3 po 12 godzinach leczenia zachowawczego dochodzi do narastania bezmoczu (diureza <10 ml/h przez ostatnie 6 godzin). W kontrolnych badaniach CITO: potas 6.8 mmol/l z poszerzeniem zespołów QRS i wysokimi, spiczastymi załamkami T w EKG, pH tętnicze 7.12, HCO3- 11 mmol/l, mocznik 210 mg/dl. Pojawiły się cechy osłuchowe obrzęku płuc (rzężenia u podstaw obu płuc, SpO2 89% na tlenie). Jak kwalifikujesz pacjenta wg wytycznych KDIGO 2024?",
      options: [
        {
          text: "Natychmiastowe wdrożenie leczenia nerkozastępczego CITO (hemodializa / ciągła hemofiltracja CVVH) ze względu na bezwzględne wskazania ratunkowe (mnemotechnika AEIOU: kwasica pH <7.15 oporna na leczenie, zagrażająca życiu hiperkaliemia >6.5 mmol/l ze zmianami w EKG oraz oporne przewodnienie z obrzękiem płuc); unikanie nefrotoksycznych roztworów skrobi HES.",
          correct: true,
          feedback: "Znakomicie! Zgodnie z wytycznymi KDIGO 2024: Wskazania do PILNEJ dializoterapii ratunkowej (mnemotechnika AEIOU): 1) A (Acidosis) – ciężka kwasica metaboliczna pH <7.15 oporna na wodorowęglany; 2) E (Electrolytes) – hiperkaliemia >6.5 mmol/l z objawami elektrokardiograficznymi lub oporna na farmakoterapię; 3) I (Ingestion) – zatrucia toksynami dializacyjnymi (metanol, glikol, lit, salicylany); 4) O (Overload) – przewodnienie z obrzękiem płuc oporne na diuretyki pętlowe; 5) U (Uremia) – powikłania mocznicowe (encefalopatia, mocznicowe zapalenie osierdzia, skaza krwotoczna). Roztwory hydroksyetyloskrobi (HES) są bezwzględnie zakazane z powodu nefrotoksyczności i indukcji AKI."
        },
        {
          text: "Podanie kolejnych 3 litrów roztworu skrobi hydroksyetylowej (HES) w celu 'przepłukania' nerek.",
          correct: false,
          feedback: "Śmiertelny błąd! HES akumuluje się w komórkach cewek nerkowych, powoduje pęcznienie i martwicę nerek, a u pacjenta z obrzękiem płuc wywoła asfiksję!"
        },
        {
          text: "Wyłącznie obserwacja do rana bez żadnych interwencji.",
          correct: false,
          feedback: "Kardynalny błąd. Przy potasie 6.8 mmol/l i zmianach w EKG zatrzymanie krążenia w asystolii lub PEA nastąpi w ciągu kilkunastu minut."
        },
        {
          text: "Wstrzyknięcie glukozy podskórnie bez insuliny.",
          correct: false,
          feedback: "Brak wpływu na stężenie potasu i kwasicę."
        }
      ]
    };
    
    const reEnc = await encryptStringAes(JSON.stringify(c, null, 2), PASSWORD);
    fs.writeFileSync('cases/68_aki_kdigo.json', JSON.stringify(reEnc, null, 2), 'utf8');
    console.log("Updated case 68 (KDIGO 2024)");
  }

  console.log("Modernization of cases 21, 30, 34, 38, 68 completed successfully!");
}

modernize().catch(console.error);

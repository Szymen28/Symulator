const fs = require('fs');
const path = require('path');
const { encryptStringAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

// We import case 151 from create_cases_151_155.js if possible, or redefine all 5 cases cleanly
const casesData = [
  // =========================================================================
  // CASE 151: Rzucawka i Stan Przedrzucawkowy (Preeclampsia / Eclampsia)
  // =========================================================================
  {
    id: 151,
    file: "151_rzucawka_preeclampsia.json",
    shortTitle: "Stan Przedrzucawkowy i Rzucawka",
    title: "Ciężki Stan Przedrzucawkowy powikłany Rzucawką (Preeclampsia / Eclampsia)",
    dept: "Ginekologia i Położnictwo",
    diagnosisTitle: "Rzucawka w przebiegu Ciężkiego Stanu Przedrzucawkowego (Eclampsia)",
    vitals: [
      { label: "Ciśnienie tętnicze (RR)", val: "185/115", unit: "mmHg", status: "vital-crit" },
      { label: "Częstość akcji serca (HR)", val: "118", unit: "/min", status: "vital-warn" },
      { label: "Częstość oddechów (RR)", val: "22", unit: "/min", status: "vital-warn" },
      { label: "Saturacja (SpO2)", val: "93", unit: "%", status: "vital-warn" },
      { label: "Temperatura ciała", val: "37.2", unit: "°C", status: "vital-ok" }
    ],
    story: "<p><strong>Pacjent:</strong> 31-letnia pierwiastka w 34. tygodniu ciąży pojedynczej przywieziona na SOR przez ZRM z powodu nagłego napadu drgawek toniczno-klonicznych w domu.</p><p><strong>Wywiad chorobowy:</strong> Od 3 dni narastające, oporne na paracetamol bóle głowy w okolicy czołowej, zaburzenia widzenia (mroczki przed oczami, fotofobia) oraz silny ból w nadbrzuszu i prawym podżebrzu z nudnościami. Ciąża dotychczas przebiegała bez powikłań, pacjentka nie chorowała na padaczkę.</p><p><strong>Badanie przedmiotowe:</strong> Pacjentka podsypiająca, splątana w fazie ponapadowej (GCS 12). Masywne ciastowate obrzęki podudzi, dłoni oraz twarzy. Ciśnienie tętnicze 185/115 mmHg. Odruchy ścięgniste wygórowane z klonusami stóp. W badaniu położniczym: macica o prawidłowym napięciu, brak krwawienia z dróg rodnych, FHR płodu około 110/min (bradykardia ponapadowa). W badaniu moczu paskowym: białkomocz +++ (stężenie >3,0 g/l).</p>",
    steps: [
      {
        title: "Krok 1: Natychmiastowe zabezpieczenie pacjentki i przerwanie drgawek",
        scenario: "Pacjentka trafia na salę reanimacyjną SOR. Zabezpieczono drożność dróg oddechowych i podano tlen przez maskę z rezerwuarem. Jakie jest leczenie farmakologiczne pierwszego rzutu z wyboru w celu zapobiegania kolejnym napadom drgawek rzucawkowych wg wytycznych PTGiP?",
        options: [
          {
            text: "Siarczan magnezu (MgSO4) dożylnie: dawka nasycająca 4,0–6,0 g i.v. w ciągu 15–20 minut, a następnie wlew ciągły 1,0–2,0 g/h",
            correct: true,
            isCorrect: true,
            feedback: "✅ PRAWIDŁOWO! Siarczan magnezu (MgSO4) jest lekiem z wyboru o udowodnionej w badaniu Magpie najwyższej skuteczności w zapobieganiu i leczeniu drgawek rzucawkowych. Działa neuroprotekcyjnie, naczyniorozszerzająco na naczynia mózgowe oraz blokuje receptory NMDA."
          },
          {
            text: "Diazepam w szybkim bolusie dożylnym 10 mg z następowym wlewem fenytoiny w dawce nasycającej 15 mg/kg masy ciała",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Benzodiazepiny i fenytoina są znacznie mniej skuteczne w rzucawce niż siarczan magnezu, a dodatkowo wywołują głęboką depresję oddechową u noworodka."
          },
          {
            text: "Kwas walproinowy 1000 mg we wlewie dożylnym pod osłoną dożylnego lewetyracetamu w stałej dawce dobowej",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Kwas walproinowy jest bezwzględnie teratogenny i nie znajduje zastosowania w leczeniu ostrych drgawek rzucawkowych."
          },
          {
            text: "Propofol w dawce anestetycznej 2 mg/kg m.c. z natychmiastową intubacją dotchawiczą bez wdrożenia magnezoterapii",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Wprowadzenie w znieczulenie ogólne bez uprzedniego podania siarczanu magnezu nie eliminuje naczynioskurczowego podłoża rzucawki."
          }
        ]
      },
      {
        title: "Krok 2: Pilna farmakoterapia hipotensyjna",
        scenario: "Ciśnienie tętnicze utrzymuje się na poziomie 185/115 mmHg. Utrzymywanie się ciśnienia skurczowego ≥160 mmHg lub rozkurczowego ≥110 mmHg stwarza bezpośrednie zagrożenie krwotokiem śródmózgowym. Jaki lek hipotensyjny należy wdrożyć w pierwszej kolejności?",
        options: [
          {
            text: "Labetalol dożylnie (bolus 20 mg w ciągu 2 min, powtarzany w razie potrzeby dawkami 40–80 mg) LUB hydralazyna i.v. LUB dihydropirydyna p.o.",
            correct: true,
            isCorrect: true,
            feedback: "✅ PRAWIDŁOWO! Labetalol i.v., hydralazyna i.v. oraz nifedypina p.o. (o zmodyfikowanym uwalnianiu) to leki pierwszego rzutu w przełomie nadciśnieniowym w ciąży. Celem jest obniżenie ciśnienia do wartości bezpiecznych (140–150/90–100 mmHg) bez wywoływania gwałtownej hipotensji zagrażającej perfuzji łożyskowej."
          },
          {
            text: "Nitroprusydek sodu we wlewie ciągłym dożylnym miareczkowany do osiągnięcia ciśnienia skurczowego poniżej 110 mmHg",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Nitroprusydek sodu w ciąży grozi zatruciem płodu cyjankami i jest lekiem ostatniej szansy, a docelowe ciśnienie nie powinno spadać poniżej 130–140 mmHg."
          },
          {
            text: "Inhibitor konwertazy angiotensyny (np. enalapryl 20 mg i.v.) w skojarzeniu z antagonistą receptora AT1 sartanem",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Inhibitory ACE oraz sartany (ARB) są bezwzględnie przeciwwskazane w ciąży ze względu na fetotoksyczność (oligarhion, uszkodzenie nerek płodu, wady czaszki)."
          },
          {
            text: "Dożylny bolus furosemidu 80 mg w celu wymuszenia szybkiej diurezy i redukcji obrzęków obwodowych u ciężarnej",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Diuretyki w stanie przedrzucawkowym są przeciwwskazane (poza obrzękiem płuc), ponieważ stan ten przebiega z hipowolemią wewnątrznaczyniową i skurczem naczyń."
          }
        ]
      },
      {
        title: "Krok 3: Monitorowanie bezpieczeństwa magnezoterapii",
        scenario: "Pacjentka otrzymuje ciągły wlew MgSO4 1,5 g/h. Jakie parametry kliniczne należy ściśle kontrolować przy łóżku pacjentki i jakie antidotum musi być natychmiast dostępne?",
        options: [
          {
            text: "Obecność odruchów rzepkowych, częstość oddechów (≥12/min) oraz diurezę godzinową (≥30 ml/h); antidotum: glukonian wapnia 10% 10 ml i.v.",
            correct: true,
            isCorrect: true,
            feedback: "✅ PRAWIDŁOWO! Wczesnym objawem toksyczności magnezu jest zanik odruchów głębokich (przy stężeniu ~3,5–5 mmol/l), a następnie depresja oddechowa. Ponieważ magnez jest wydalany wyłącznie przez nerki, spadek diurezy prowadzi do kumulacji leku. Antidotum jest 10% glukonian wapnia (1 g i.v. w ciągu 10 min)."
          },
          {
            text: "Szerokość źrenic, poziom glikemii oraz stężenie sodu w surowicy krwi; antidotum: siarczan protaminy 50 mg w powolnym bolusie",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Siarczan protaminy jest odtrutką dla heparyny, a nie dla siarczanu magnezu."
          },
          {
            text: "Kwasicę metaboliczną i gazometrię tętniczą co 15 minut; antidotum: wodorowęglan sodu 8,4% we wlewie ciągłym",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Odtrutką z wyboru w hipermagnezemii są jony wapnia antagonizujące działanie magnezu na płytkę nerwowo-mięśniową."
          },
          {
            text: "Aktywność aminotransferaz wątrobowych co godzinę; antidotum: N-acetylocysteina w dawce nasycającej 150 mg/kg",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! N-acetylocysteina jest odtrutką w zatruciu paracetamolem."
          }
        ]
      },
      {
        title: "Krok 4: Postępowanie położnicze definitywne",
        scenario: "Stan pacjentki ustabilizowano, ciśnienie wynosi 145/95 mmHg, napady drgawek nie powtórzyły się. W KTG utrzymuje się zapis wątpliwy z epizodami deceleracji późnych u płodu w 34. tygodniu ciąży. Jaka jest jedyna definitywna metoda leczenia stanu przedrzucawkowego i rzucawki?",
        options: [
          {
            text: "Zakończenie ciąży (rozwiązanie) w trybie pilnym po wstępnej stabilizacji krążeniowo-oddechowej matki, najczęściej drogą cięcia cesarskiego",
            correct: true,
            isCorrect: true,
            feedback: "✅ PRAWIDŁOWO! Jedyną przyczynową metodą leczenia stanu przedrzucawkowego i rzucawki jest usunięcie łożyska, czyli ukończenie ciąży. Rzucawka stanowi bezwzględne wskazanie do pilnego rozwiązania po uprzedniej stabilizacji stanu ogólnego pacjentki."
          },
          {
            text: "Próba przedłużenia ciąży o kolejne 4-6 tygodni w celu osiągnięcia pełnej dojrzałości donoszonego płodu pod osłoną leków hipotensyjnych",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Wystąpienie rzucawki jest stanem bezpośredniego zagrożenia życia matki i płodu; oczekiwanie na poród o czasie jest błędem w sztuce."
          },
          {
            text: "Pilna plazmafereza lecznicza z wymianą osocza z jednoczesnym powstrzymaniem akcji porodowej tokolitykami",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Tokoliza jest przeciwwskazana w rzucawce, a plazmafereza nie rozwiązuje patomechanizmu dysfunkcji łożyska."
          },
          {
            text: "Wypisanie pacjentki do domu z zaleceniem spoczynku w łóżku i kontroli ciśnienia 3 razy dziennie w poradni POZ",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Rzucawka wymaga natychmiastowego leczenia na sali intensywnego nadzoru położniczego."
          }
        ]
      }
    ],
    pathoNodes: [
      {
        title: "Nieprawidłowa przebudowa tętnic spiralnych łożyska",
        desc: "Upośledzenie inwazji trofoblastu do tętnic spiralnych doczesnej prowadzi do zachowania ich wąskiego światła i wysokiego oporu naczyniowego.",
        detail: "Fizjologicznie trofoblast przekształca naczynia w niskooporowe przewody. W stanie przedrzucawkowym hipoksja łożyska wyzwala uwalnianie czynników antyangiogennych (sFlt-1, rozpuszczalna endoglina) neutralizujących naczyniowy czynnik wzrostu VEGF.",
        target: "Punkt uchwytu leczenia: Profilaktyka kwasem acetylosalicylowym (ASA 100–150 mg/dobę przed snem od 12. do 36. tygodnia ciąży) u pacjentek z grupy wysokiego ryzyka."
      },
      {
        title: "Uogólniona dysfunkcja śródbłonka naczyniowego",
        desc: "Krążące czynniki antyangiogenne uszkadzają komórki śródbłonka matki w łożysku nerkowym, mózgowym i wątrobowym.",
        detail: "Prowadzi to do obkurczenia naczyń (skurcz tętniczek), wzmożonej przepuszczalności naczyń (obrzęki, białkomocz nerkowy), aktywacji kaskady krzepnięcia i agregacji płytek krwi (trombocytopenia w zespole HELLP).",
        target: "Punkt uchwytu diagnostyki i leczenia: Oznaczenie białkomoczu (wskaźnik białko/kreatynina ≥0,3) oraz wskaźnika sFlt-1/PlGF; leczenie hipotensyjne labetalolem i.v. lub hydralazyną."
      },
      {
        title: "Naczyniopochodny obrzęk mózgu i zespół PRES",
        desc: "Przełamanie autoregulacji mózgowej w warunkach ciężkiego nadciśnienia tętniczego wywołuje obrzęk naczyniopochodny kory mózgowej.",
        detail: "Hiperperfuzja i obrzęk płatów potylicznych i ciemieniowych (zespół odwracalnej tylnej encefalopatii – PRES) obniżają próg drgawkowy, wyzwalając uogólnione napady rzucawkowe toniczno-kloniczne.",
        target: "Punkt uchwytu leczenia: Siarczan magnezu (MgSO4) 4–6 g i.v. w bolusie, następnie 1–2 g/h we wlewie ciągłym – stabilizuje barierę krew-mózg i blokuje pobudzenie glutaminergiczne."
      }
    ],
    dutySummary: {
      overview: "Ciężki stan przedrzucawkowy i rzucawka to stany bezpośredniego zagrożenia życia matki i płodu wywołane układową dysfunkcją śródbłonka na tle patologii naczyniowej łożyska. Kluczowe jest jednoczesne opanowanie drgawek, obniżenie skrajnego nadciśnienia tętniczego oraz bezpieczne ukończenie ciąży.",
      diagnostics: "1. Monitorowanie ciśnienia tętniczego co 5–15 minut w ostrej fazie przełomu.\n\n2. Dobowa zbiórka moczu lub wskaźnik białko/kreatynina (UPCR ≥0,3 mg/mg) potwierdzający białkomocz.\n\n3. Morfologia krwi (ocena płytek pod kątem HELLP), próby wątrobowe (AST, ALT, LDH), kreatynina, kwas moczowy.\n\n4. Ciągłe monitorowanie KTG dobrostanu płodu.",
      drugsAndDoses: "• <span class=\"dose-pill\">Siarczan magnezu (MgSO4): 4,0–6,0 g i.v. w ciągu 15–20 min</span> (dawka nasycająca), następnie wlew ciągły <span class=\"dose-pill\">1,0–2,0 g/h i.v.</span> przez 24 godziny po porodzie.\n• <span class=\"dose-pill\">Labetalol: 20 mg i.v. w powolnym wstrzyknięciu</span>, w razie braku efektu po 10 min 40 mg, następnie do 80 mg (maks. 220 mg).\n• Alternatywnie: <span class=\"dose-pill\">Hydralazyna: 5–10 mg i.v. powoli</span> co 20 minut lub <span class=\"dose-pill\">Nifedypina: 10–20 mg doustnie</span> (postać o przedłużonym uwalnianiu).\n• Odtrutka na hipermagnezemię: <span class=\"dose-pill\">Glukonian wapnia 10%: 10 ml (1 g) i.v. w ciągu 10 minut</span>.",
      procedures: "Zabezpieczenie drożności dróg oddechowych (ułożenie w pozycji bezpiecznej na lewym boku, tlenoterapia bierną maską z rezerwuarem), cewnik Foleya z godzinową zbiórką diurezy, pilne cięcie cesarskie po ustabilizowaniu ciśnienia i drgawek.",
      monitoring: "Nadzór nad odruchami kolanowymi, częstością oddechów (stop wlewu MgSO4 przy <12/min) oraz diurezą (stop przy <30 ml/h). Ciągły zapis kardiotokograficzny FHR."
    },
    diffTable: {
      title: "⚔️ Tabela Różnicowa: Stan Przedrzucawkowy vs Padaczka vs Zespół HELLP vs TTP w Ciąży",
      headers: ["Cecha kliniczna / parametr", "Stan przedrzucawkowy / Rzucawka", "Napad Padaczkowy Idiopatyczny", "Zespół HELLP", "Zakrzepowa plamica małopłytkowa (TTP)"],
      rows: [
        ["Nadciśnienie tętnicze", "Wybitne (często >160/110 mmHg)", "Prawidłowe lub umiarkowany stres", "Obecne w 85% przypadków", "Zmienne, zwykle nieznaczne"],
        ["Białkomocz", "Obecny (>300 mg/dobę lub UPCR ≥0,3)", "Nieobecny", "Obecny w różnym nasileniu", "Obecny mierny / krwiomocz"],
        ["Liczba płytek krwi", "Prawidłowa lub mierna małopłytkowość", "Prawidłowa", "Ciężka małopłytkowość (<100 G/l)", "Skrajna małopłytkowość (<30 G/l)"],
        ["Enzymy wątrobowe i hemoliza", "Prawidłowe lub lekko podwyższone", "Prawidłowe", "Wysokie AST/ALT, LDH >600, schistocyty", "Masywna hemoliza MAHA ze schistocytami"],
        ["Aktywność ADAMTS13", "Prawidłowa (>50%)", "Prawidłowa", "Prawidłowa (>50%)", "Krytycznie obniżona (<10%)"],
        ["Lek z wyboru w drgawkach", "Siarczan magnezu (MgSO4 i.v.)", "Benzodiazepiny / leki p-padaczkowe", "Siarczan magnezu + cięcie", "Plazmafereza lecznicza (TPE)"]
      ]
    },
    lekQuestions: [
      {
        q: "Które z poniższych kryteriów pozwala na rozpoznanie stanu przedrzucawkowego (preeclampsia) u kobiety po 20. tygodniu ciąży z nowo powstałym nadciśnieniem tętniczym (RR ≥140/90 mmHg), nawet przy CAŁKOWITYM BRAKU białkomoczu?",
        question: "Które z poniższych kryteriów pozwala na rozpoznanie stanu przedrzucawkowego (preeclampsia) u kobiety po 20. tygodniu ciąży z nowo powstałym nadciśnieniem tętniczym (RR ≥140/90 mmHg), nawet przy CAŁKOWITYM BRAKU białkomoczu?",
        opts: [
          "A) Stwierdzenie małopłytkowości (<100 G/l), niewydolności nerek (kreatynina >1,1 mg/dl) lub uszkodzenia wątroby",
          "B) Izolowany wzrost stężenia glukozy na czczo w osoczu krwi żylnej powyżej 100 mg/dl w dwóch pomiarach",
          "C) Obecność ciastowatych obrzęków okolicy kostek ustępujących całkowicie po nocnym wypoczynku w łóżku",
          "D) Przyspieszenie tętna spoczynkowego matki powyżej 100 uderzeń na minutę przy prawidłowym zapisie KTG",
          "E) Zwiększenie stężenia białka C-reaktywnego (CRP) w surowicy powyżej 10 mg/l bez cech infekcji bakteryjnej"
        ],
        options: [
          "A) Stwierdzenie małopłytkowości (<100 G/l), niewydolności nerek (kreatynina >1,1 mg/dl) lub uszkodzenia wątroby",
          "B) Izolowany wzrost stężenia glukozy na czczo w osoczu krwi żylnej powyżej 100 mg/dl w dwóch pomiarach",
          "C) Obecność ciastowatych obrzęków okolicy kostek ustępujących całkowicie po nocnym wypoczynku w łóżku",
          "D) Przyspieszenie tętna spoczynkowego matki powyżej 100 uderzeń na minutę przy prawidłowym zapisie KTG",
          "E) Zwiększenie stężenia białka C-reaktywnego (CRP) w surowicy powyżej 10 mg/l bez cech infekcji bakteryjnej"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Zgodnie z aktualnymi wytycznymi ISSHP, ACOG i PTGiP, białkomocz nie jest już bezwzględnie wymagany do rozpoznania stanu przedrzucawkowego. Wystarcza nowo powstałe nadciśnienie tętnicze po 20. hbd oraz cechy uszkodzenia narządowego: trombocytopenia (<100 G/l), niewydolność nerek, uszkodzenie wątroby (2x wzrost transaminaz), obrzęk płuc lub objawy neurologiczne/zaburzenia widzenia.",
        expl: "Prawidłowo! Zgodnie z aktualnymi wytycznymi ISSHP, ACOG i PTGiP, białkomocz nie jest już bezwzględnie wymagany do rozpoznania stanu przedrzucawkowego. Wystarcza nowo powstałe nadciśnienie tętnicze po 20. hbd oraz cechy uszkodzenia narządowego: trombocytopenia (<100 G/l), niewydolność nerek, uszkodzenie wątroby (2x wzrost transaminaz), obrzęk płuc lub objawy neurologiczne/zaburzenia widzenia.",
        explanation: "Prawidłowo! Zgodnie z aktualnymi wytycznymi ISSHP, ACOG i PTGiP, białkomocz nie jest już bezwzględnie wymagany do rozpoznania stanu przedrzucawkowego. Wystarcza nowo powstałe nadciśnienie tętnicze po 20. hbd oraz cechy uszkodzenia narządowego: trombocytopenia (<100 G/l), niewydolność nerek, uszkodzenie wątroby (2x wzrost transaminaz), obrzęk płuc lub objawy neurologiczne/zaburzenia widzenia."
      },
      {
        q: "Jaki jest patomechanizm powstawania silnego bólu w nadbrzuszu i prawym podżebrzu u ciężarnej z ciężkim stanem przedrzucawkowym?",
        question: "Jaki jest patomechanizm powstawania silnego bólu w nadbrzuszu i prawym podżebrzu u ciężarnej z ciężkim stanem przedrzucawkowym?",
        opts: [
          "A) Zatkanie przewodu pęcherzykowego przez złogi cholesterolowe z ostrym zapaleniem pęcherzyka żółciowego",
          "B) Rozciągnięcie torebki Glissona wątroby w wyniku niedokrwienia miąższu, obrzęku i mikrowylewów krwawych",
          "C) Przedziurawienie ściany odźwiernika żołądka w przebiegu ostrego wrzodu stresowego wywołanego ciążą",
          "D) Skurcz mięśniówki gładkiej moczowodu wywołany uciskiem powiększonej macicy na prawe naczynia biodrowe",
          "E) Ostre zakrzepowe zapalenie żyły krezkowej górnej z niedokrwieniem początkowego odcinka jelita czczego"
        ],
        options: [
          "A) Zatkanie przewodu pęcherzykowego przez złogi cholesterolowe z ostrym zapaleniem pęcherzyka żółciowego",
          "B) Rozciągnięcie torebki Glissona wątroby w wyniku niedokrwienia miąższu, obrzęku i mikrowylewów krwawych",
          "C) Przedziurawienie ściany odźwiernika żołądka w przebiegu ostrego wrzodu stresowego wywołanego ciążą",
          "D) Skurcz mięśniówki gładkiej moczowodu wywołany uciskiem powiększonej macicy na prawe naczynia biodrowe",
          "E) Ostre zakrzepowe zapalenie żyły krezkowej górnej z niedokrwieniem początkowego odcinka jelita czczego"
        ],
        correct: 1,
        correctIdx: 1,
        exp: "Prawidłowo! Ból w nadbrzuszu i prawym podżebrzu wynika z ogniskowego niedokrwienia miąższu wątroby, obrzęku hepatocytów oraz podtorebkowych mikrowylewów krwawych, co powoduje bolesne rozciągnięcie torebki wątroby (torebki Glissona). Jest to objaw zwiastunowy pęknięcia wątroby lub rozwoju zespołu HELLP.",
        expl: "Prawidłowo! Ból w nadbrzuszu i prawym podżebrzu wynika z ogniskowego niedokrwienia miąższu wątroby, obrzęku hepatocytów oraz podtorebkowych mikrowylewów krwawych, co powoduje bolesne rozciągnięcie torebki wątroby (torebki Glissona). Jest to objaw zwiastunowy pęknięcia wątroby lub rozwoju zespołu HELLP.",
        explanation: "Prawidłowo! Ból w nadbrzuszu i prawym podżebrzu wynika z ogniskowego niedokrwienia miąższu wątroby, obrzęku hepatocytów oraz podtorebkowych mikrowylewów krwawych, co powoduje bolesne rozciągnięcie torebki wątroby (torebki Glissona). Jest to objaw zwiastunowy pęknięcia wątroby lub rozwoju zespołu HELLP."
      },
      {
        q: "Który z poniższych objawów klinicznych jest NAJWCZEŚNIEJSZYM zwiastunem rozwijającej się hipermagnezemii podczas dożylnego wlewu siarczanu magnezu?",
        question: "Który z poniższych objawów klinicznych jest NAJWCZEŚNIEJSZYM zwiastunem rozwijającej się hipermagnezemii podczas dożylnego wlewu siarczanu magnezu?",
        opts: [
          "A) Nagłe zatrzymanie akcji serca w mechanizmie asystolii",
          "B) Spowolnienie częstości oddechów poniżej 8 na minutę",
          "C) Zniesienie (osłabienie lub brak) odruchów głębokich kolanowych",
          "D) Pojawienie się szerokich fal U w zapisie elektrokardiograficznym",
          "E) Wystąpienie obfitego ślinotoku i zwężenia szpar powiekowych"
        ],
        options: [
          "A) Nagłe zatrzymanie akcji serca w mechanizmie asystolii",
          "B) Spowolnienie częstości oddechów poniżej 8 na minutę",
          "C) Zniesienie (osłabienie lub brak) odruchów głębokich kolanowych",
          "D) Pojawienie się szerokich fal U w zapisie elektrokardiograficznym",
          "E) Wystąpienie obfitego ślinotoku i zwężenia szpar powiekowych"
        ],
        correct: 2,
        correctIdx: 2,
        exp: "Prawidłowo! Pierwszym objawem przedawkowania magnezu (stężenie >3,5–4,0 mmol/l) jest osłabienie i zanik głębokich odruchów ścięgnistych (odruchu rzepkowego). Depresja oddechowa pojawia się przy stężeniach >5,0 mmol/l, a zatrzymanie krążenia przy >6,0–7,0 mmol/l.",
        expl: "Prawidłowo! Pierwszym objawem przedawkowania magnezu (stężenie >3,5–4,0 mmol/l) jest osłabienie i zanik głębokich odruchów ścięgnistych (odruchu rzepkowego). Depresja oddechowa pojawia się przy stężeniach >5,0 mmol/l, a zatrzymanie krążenia przy >6,0–7,0 mmol/l.",
        explanation: "Prawidłowo! Pierwszym objawem przedawkowania magnezu (stężenie >3,5–4,0 mmol/l) jest osłabienie i zanik głębokich odruchów ścięgnistych (odruchu rzepkowego). Depresja oddechowa pojawia się przy stężeniach >5,0 mmol/l, a zatrzymanie krążenia przy >6,0–7,0 mmol/l."
      },
      {
        q: "Wskaż zestaw twierdzeń PRAWDZIWYCH dotyczących profilaktyki stanu przedrzucawkowego kwasem acetylosalicylowym (ASA):\n1. ASA należy wdrożyć u kobiet z grupy wysokiego ryzyka przed 16. tygodniem ciąży.\n2. Zalecana dobowa dawka wynosi 100–150 mg podawana wieczorem przed snem.\n3. Lek należy kontynuować bezwzględnie do momentu wystąpienia regularnych skurczów porodowych.\n4. Do czynników wysokiego ryzyka należy przebyty stan przedrzucawkowy w poprzedniej ciąży.\n5. Cukrzyca przedciążowa i przewlekłe nadciśnienie tętnicze stanowią wskazanie do profilaktyki.",
        question: "Wskaż zestaw twierdzeń PRAWDZIWYCH dotyczących profilaktyki stanu przedrzucawkowego kwasem acetylosalicylowym (ASA):\n1. ASA należy wdrożyć u kobiet z grupy wysokiego ryzyka przed 16. tygodniem ciąży.\n2. Zalecana dobowa dawka wynosi 100–150 mg podawana wieczorem przed snem.\n3. Lek należy kontynuować bezwzględnie do momentu wystąpienia regularnych skurczów porodowych.\n4. Do czynników wysokiego ryzyka należy przebyty stan przedrzucawkowy w poprzedniej ciąży.\n5. Cukrzyca przedciążowa i przewlekłe nadciśnienie tętnicze stanowią wskazanie do profilaktyki.",
        opts: [
          "A) 1, 2, 4, 5",
          "B) 1, 3, 5",
          "C) 2, 3, 4",
          "D) 1, 2, 3, 4, 5",
          "E) Tylko 4 i 5"
        ],
        options: [
          "A) 1, 2, 4, 5",
          "B) 1, 3, 5",
          "C) 2, 3, 4",
          "D) 1, 2, 3, 4, 5",
          "E) Tylko 4 i 5"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Zdania 1, 2, 4 i 5 są prawdziwe. Zdanie 3 jest fałszywe: profilaktykę ASA zaleca się odstawić w 36. tygodniu ciąży (lub na kilka dni przed planowanym porodem), aby ograniczyć ryzyko krwawień okołoporodowych i powikłań znieczulenia przewodowego.",
        expl: "Prawidłowo! Zdania 1, 2, 4 i 5 są prawdziwe. Zdanie 3 jest fałszywe: profilaktykę ASA zaleca się odstawić w 36. tygodniu ciąży (lub na kilka dni przed planowanym porodem), aby ograniczyć ryzyko krwawień okołoporodowych i powikłań znieczulenia przewodowego.",
        explanation: "Prawidłowo! Zdania 1, 2, 4 i 5 są prawdziwe. Zdanie 3 jest fałszywe: profilaktykę ASA zaleca się odstawić w 36. tygodniu ciąży (lub na kilka dni przed planowanym porodem), aby ograniczyć ryzyko krwawień okołoporodowych i powikłań znieczulenia przewodowego."
      },
      {
        q: "Wskaż zdanie FAŁSZYWE dotyczące postępowania z ciężarną w rzucawce:",
        question: "Wskaż zdanie FAŁSZYWE dotyczące postępowania z ciężarną w rzucawce:",
        opts: [
          "A) Po ustąpieniu napadu drgawek należy natychmiast wykonać cięcie cesarskie w trakcie trwania ponapadowej bradykardii płodu",
          "B) Wlew siarczanu magnezu należy kontynuować przez co najmniej 24 godziny po porodzie lub po ostatnim napadzie drgawek",
          "C) Przed podaniem leków hipotensyjnych pacjentkę należy ułożyć w pozycji na lewym boku dla odbarczenia żyły głównej dolnej",
          "D) W razie wystąpienia ponownego napadu drgawek w trakcie wlewu MgSO4 można podać dodatkowy bolus 2 g siarczanu magnezu",
          "E) Labetalol jest przeciwwskazany u pacjentek ze współistniejącą ciężką astmą oskrzelową lub blokiem przedsionkowo-komorowym"
        ],
        options: [
          "A) Po ustąpieniu napadu drgawek należy natychmiast wykonać cięcie cesarskie w trakcie trwania ponapadowej bradykardii płodu",
          "B) Wlew siarczanu magnezu należy kontynuować przez co najmniej 24 godziny po porodzie lub po ostatnim napadzie drgawek",
          "C) Przed podaniem leków hipotensyjnych pacjentkę należy ułożyć w pozycji na lewym boku dla odbarczenia żyły głównej dolnej",
          "D) W razie wystąpienia ponownego napadu drgawek w trakcie wlewu MgSO4 można podać dodatkowy bolus 2 g siarczanu magnezu",
          "E) Labetalol jest przeciwwskazany u pacjentek ze współistniejącą ciężką astmą oskrzelową lub blokiem przedsionkowo-komorowym"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Zdanie A jest fałszywe. Po napadzie drgawek u płodu często występuje przejściowa bradykardia kompensacyjna (trwająca 3–5 minut), wynikająca z niedotlenienia matki i hipertonii macicy. Nie wolno wykonywać natychmiastowego cięcia cesarskiego w trakcie niestabilności matki – najpierw należy dotlenić i ustabilizować krążeniowo pacjentkę, po czym zapis tętna płodu zazwyczaj samoistnie się poprawia.",
        expl: "Prawidłowo! Zdanie A jest fałszywe. Po napadzie drgawek u płodu często występuje przejściowa bradykardia kompensacyjna (trwająca 3–5 minut), wynikająca z niedotlenienia matki i hipertonii macicy. Nie wolno wykonywać natychmiastowego cięcia cesarskiego w trakcie niestabilności matki – najpierw należy dotlenić i ustabilizować krążeniowo pacjentkę, po czym zapis tętna płodu zazwyczaj samoistnie się poprawia.",
        explanation: "Prawidłowo! Zdanie A jest fałszywe. Po napadzie drgawek u płodu często występuje przejściowa bradykardia kompensacyjna (trwająca 3–5 minut), wynikająca z niedotlenienia matki i hipertonii macicy. Nie wolno wykonywać natychmiastowego cięcia cesarskiego w trakcie niestabilności matki – najpierw należy dotlenić i ustabilizować krążeniowo pacjentkę, po czym zapis tętna płodu zazwyczaj samoistnie się poprawia."
      },
      {
        q: "Zgodnie z polskim prawem medycznym i zasadami bioetyki, jeżeli przytomna ciężarna w stanie przedrzucawkowym odmawia pilnego cięcia cesarskiego ratującego życie płodu:",
        question: "Zgodnie z polskim prawem medycznym i zasadami bioetyki, jeżeli przytomna ciężarna w stanie przedrzucawkowym odmawia pilnego cięcia cesarskiego ratującego życie płodu:",
        opts: [
          "A) Lekarz ma prawo zoperować pacjentkę pod przymusem na mocy decyzji konsylium dwóch ordynatorów oddziału",
          "B) Pacjentka ma autonomiczne prawo odmowy zabiegu operacyjnego, a lekarz nie może przeprowadzić operacji bez jej zgody",
          "C) Zgoda pacjentki zostaje automatycznie zastąpiona oświadczeniem woli jej męża lub najbliższego krewnego",
          "D) Lekarz zawiadamia prokuraturę, która natychmiast wydaje nakaz przymusowej sedacji i operacji chirurgicznej",
          "E) Odmowa pacjentki skutkuje natychmiastowym pozbawieniem jej ubezpieczenia zdrowotnego i wypisem dyscyplinarnym"
        ],
        options: [
          "A) Lekarz ma prawo zoperować pacjentkę pod przymusem na mocy decyzji konsylium dwóch ordynatorów oddziału",
          "B) Pacjentka ma autonomiczne prawo odmowy zabiegu operacyjnego, a lekarz nie może przeprowadzić operacji bez jej zgody",
          "C) Zgoda pacjentki zostaje automatycznie zastąpiona oświadczeniem woli jej męża lub najbliższego krewnego",
          "D) Lekarz zawiadamia prokuraturę, która natychmiast wydaje nakaz przymusowej sedacji i operacji chirurgicznej",
          "E) Odmowa pacjentki skutkuje natychmiastowym pozbawieniem jej ubezpieczenia zdrowotnego i wypisem dyscyplinarnym"
        ],
        correct: 1,
        correctIdx: 1,
        exp: "Prawidłowo! Zgodnie z ustawą o zawodach lekarza i lekarza dentysty oraz zasadą autonomii pacjenta, każda dorosła, w pełni przytomna i zdolna do podejmowania decyzji pacjentka ma prawo odmówić procedury medycznej, w tym cięcia cesarskiego. W polskim prawie płód nie ma odrębnej podmiotowości prawnej znoszącej autonomię matki. Obowiązkiem lekarza jest wyczerpujące poinformowanie o ryzyku zgonu płodu i matki oraz udokumentowanie odmowy na piśmie.",
        expl: "Prawidłowo! Zgodnie z ustawą o zawodach lekarza i lekarza dentysty oraz zasadą autonomii pacjenta, każda dorosła, w pełni przytomna i zdolna do podejmowania decyzji pacjentka ma prawo odmówić procedury medycznej, w tym cięcia cesarskiego. W polskim prawie płód nie ma odrębnej podmiotowości prawnej znoszącej autonomię matki. Obowiązkiem lekarza jest wyczerpujące poinformowanie o ryzyku zgonu płodu i matki oraz udokumentowanie odmowy na piśmie.",
        explanation: "Prawidłowo! Zgodnie z ustawą o zawodach lekarza i lekarza dentysty oraz zasadą autonomii pacjenta, każda dorosła, w pełni przytomna i zdolna do podejmowania decyzji pacjentka ma prawo odmówić procedury medycznej, w tym cięcia cesarskiego. W polskim prawie płód nie ma odrębnej podmiotowości prawnej znoszącej autonomię matki. Obowiązkiem lekarza jest wyczerpujące poinformowanie o ryzyku zgonu płodu i matki oraz udokumentowanie odmowy na piśmie."
      },
      {
        q: "Który wskaźnik laboratoryjny cechuje się najwyższą wartością predykcyjną ujemną (NPV >99%) w wykluczaniu rozwoju stanu przedrzucawkowego w ciągu najbliższego tygodnia u kobiet z podejrzeniem preeklampsji?",
        question: "Który wskaźnik laboratoryjny cechuje się najwyższą wartością predykcyjną ujemną (NPV >99%) w wykluczaniu rozwoju stanu przedrzucawkowego w ciągu najbliższego tygodnia u kobiet z podejrzeniem preeklampsji?",
        opts: [
          "A) Wskaźnik stężeń sFlt-1 do PlGF w surowicy krwi poniżej wartości 38",
          "B) Stężenie kwasu moczowego w surowicy poniżej 4,5 mg/dl w pomiarze porannym",
          "C) Prawidłowy odsetek retikulocytów we krwi obwodowej powyżej 2,5%",
          "D) Wskaźnik aldosteronowo-reninowy (ARR) w surowicy krwi pacjentki",
          "E) Dobowe wydalanie jonów sodu w moczu przekraczające 150 mmol/dobę"
        ],
        options: [
          "A) Wskaźnik stężeń sFlt-1 do PlGF w surowicy krwi poniżej wartości 38",
          "B) Stężenie kwasu moczowego w surowicy poniżej 4,5 mg/dl w pomiarze porannym",
          "C) Prawidłowy odsetek retikulocytów we krwi obwodowej powyżej 2,5%",
          "D) Wskaźnik aldosteronowo-reninowy (ARR) w surowicy krwi pacjentki",
          "E) Dobowe wydalanie jonów sodu w moczu przekraczające 150 mmol/dobę"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Wskaźnik sFlt-1/PlGF (rozpuszczalna fms-podobna kinaza tyrozynowa 1 do łożyskowego czynnika wzrostu) poniżej 38 z czułością i wartością predykcyjną ujemną >99% wyklucza wystąpienie stanu przedrzucawkowego w ciągu najbliższych 7 dni (badanie PROGNOSIS), pozwalając uniknąć niepotrzebnej hospitalizacji.",
        expl: "Prawidłowo! Wskaźnik sFlt-1/PlGF (rozpuszczalna fms-podobna kinaza tyrozynowa 1 do łożyskowego czynktnika wzrostu) poniżej 38 z czułością i wartością predykcyjną ujemną >99% wyklucza wystąpienie stanu przedrzucawkowego w ciągu najbliższych 7 dni (badanie PROGNOSIS), pozwalając uniknąć niepotrzebnej hospitalizacji.",
        explanation: "Prawidłowo! Wskaźnik sFlt-1/PlGF (rozpuszczalna fms-podobna kinaza tyrozynowa 1 do łożyskowego czynnika wzrostu) poniżej 38 z czułością i wartością predykcyjną ujemną >99% wyklucza wystąpienie stanu przedrzucawkowego w ciągu najbliższych 7 dni (badanie PROGNOSIS), pozwalając uniknąć niepotrzebnej hospitalizacji."
      },
      {
        q: "Dlaczego u ciężarnej ze stanem przedrzucawkowym bezwzględnie unika się gwałtownego obniżania ciśnienia tętniczego do wartości <130/80 mmHg?",
        question: "Dlaczego u ciężarnej ze stanem przedrzucawkowym bezwzględnie unika się gwałtownego obniżania ciśnienia tętniczego do wartości <130/80 mmHg?",
        opts: [
          "A) Ponieważ powoduje to odruchowe zwężenie dróg oddechowych i ostry napad astmy",
          "B) Z powodu ryzyka upośledzenia przepływu maciczno-łożyskowego i ostrego niedotlenienia płodu",
          "C) Ze względu na bezpośrednie ryzyko wytrącenia kryształów kwasu moczowego w kłębuszkach",
          "D) Ponieważ wywołuje to natychmiastowe stwardnienie tętnic spiralnych łożyska",
          "E) Z powodu niebezpieczeństwa trwałej inaktywacji enzymów wątrobowych matki"
        ],
        options: [
          "A) Ponieważ powoduje to odruchowe zwężenie dróg oddechowych i ostry napad astmy",
          "B) Z powodu ryzyka upośledzenia przepływu maciczno-łożyskowego i ostrego niedotlenienia płodu",
          "C) Ze względu na bezpośrednie ryzyko wytrącenia kryształów kwasu moczowego w kłębuszkach",
          "D) Ponieważ wywołuje to natychmiastowe stwardnienie tętnic spiralnych łożyska",
          "E) Z powodu niebezpieczeństwa trwałej inaktywacji enzymów wątrobowych matki"
        ],
        correct: 1,
        correctIdx: 1,
        exp: "Prawidłowo! Łożysko nie posiada zdolności autoregulacji przepływu krwi – perfuzja maciczno-łożyskowa zależy wprost proporcjonalnie od średniego ciśnienia tętniczego matki (MAP). Gwałtowny spadek ciśnienia prowadzi do hipoperfuzji łożyska, ostrego niedotlenienia płodu, bradykardii i wewnątrzmacicznego zgonu płodu.",
        expl: "Prawidłowo! Łożysko nie posiada zdolności autoregulacji przepływu krwi – perfuzja maciczno-łożyskowa zależy wprost proporcjonalnie od średniego ciśnienia tętniczego matki (MAP). Gwałtowny spadek ciśnienia prowadzi do hipoperfuzji łożyska, ostrego niedotlenienia płodu, bradykardii i wewnątrzmacicznego zgonu płodu.",
        explanation: "Prawidłowo! Łożysko nie posiada zdolności autoregulacji przepływu krwi – perfuzja maciczno-łożyskowa zależy wprost proporcjonalnie od średniego ciśnienia tętniczego matki (MAP). Gwałtowny spadek ciśnienia prowadzi do hipoperfuzji łożyska, ostrego niedotlenienia płodu, bradykardii i wewnątrzmacicznego zgonu płodu."
      },
      {
        q: "Co oznacza wystąpienie zespołu PRES (Posterior Reversible Encephalopathy Syndrome) u chorej z rzucawką?",
        question: "Co oznacza wystąpienie zespołu PRES (Posterior Reversible Encephalopathy Syndrome) u chorej z rzucawką?",
        opts: [
          "A) Nieodwracalne zniszczenie neuronów kory potylicznej w wyniku zatoru tłuszczowego",
          "B) Odwracalny naczyniopochodny obrzęk istoty białej płatów potylicznych i ciemieniowych mózgu",
          "C) Zakażenie bakteryjne przestrzeni podpajęczynówkowej wywołane przez Listeria monocytogenes",
          "D) Zakrzepicę zatoki strzałkowej górnej z towarzyszącym udarem żylnym krwotocznym",
          "E) Pęknięcie naczyniaka jamistego pnia mózgu z porażeniem nerwów czaszkowych"
        ],
        options: [
          "A) Nieodwracalne zniszczenie neuronów kory potylicznej w wyniku zatoru tłuszczowego",
          "B) Odwracalny naczyniopochodny obrzęk istoty białej płatów potylicznych i ciemieniowych mózgu",
          "C) Zakażenie bakteryjne przestrzeni podpajęczynówkowej wywołane przez Listeria monocytogenes",
          "D) Zakrzepicę zatoki strzałkowej górnej z towarzyszącym udarem żylnym krwotocznym",
          "E) Pęknięcie naczyniaka jamistego pnia mózgu z porażeniem nerwów czaszkowych"
        ],
        correct: 1,
        correctIdx: 1,
        exp: "Prawidłowo! Zespół PRES to zespół kliniczno-radiologiczny charakteryzujący się bólem głowy, zaburzeniami widzenia, drgawkami i obrzękiem naczyniopochodnym (widocznym w MRI jako hiperintensywne obszary w sekwencji T2/FLAIR), typowo w tylnych rejonach mózgu (płaty potyliczne i ciemieniowe). Prawidłowe leczenie hipotensyjne i przeciwdrgawkowe prowadzi do całkowitego ustąpienia zmian.",
        expl: "Prawidłowo! Zespół PRES to zespół kliniczno-radiologiczny charakteryzujący się bólem głowy, zaburzeniami widzenia, drgawkami i obrzękiem naczyniopochodnym (widocznym w MRI jako hiperintensywne obszary w sekwencji T2/FLAIR), typowo w tylnych rejonach mózgu (płaty potyliczne i ciemieniowe). Prawidłowe leczenie hipotensyjne i przeciwdrgawkowe prowadzi do całkowitego ustąpienia zmian.",
        explanation: "Prawidłowo! Zespół PRES to zespół kliniczno-radiologiczny charakteryzujący się bólem głowy, zaburzeniami widzenia, drgawkami i obrzękiem naczyniopochodnym (widocznym w MRI jako hiperintensywne obszary w sekwencji T2/FLAIR), typowo w tylnych rejonach mózgu (płaty potyliczne i ciemieniowe). Prawidłowe leczenie hipotensyjne i przeciwdrgawkowe prowadzi do całkowitego ustąpienia zmian."
      },
      {
        q: "Kiedy najczęściej dochodzi do wystąpienia napadów rzucawki w relacji czasowej do porodu?",
        question: "Kiedy najczęściej dochodzi do wystąpienia napadów rzucawki w relacji czasowej do porodu?",
        opts: [
          "A) Wyłącznie w pierwszym trymestrze ciąży przed 12. tygodniem",
          "B) Przed porodem (ante partum), w trakcie porodu (intra partum) lub do 48h po porodzie",
          "C) Dokładnie po 6 miesiącach od zakończenia okresu karmienia piersią",
          "D) Wyłącznie u kobiet rodzących po raz kolejny drogą pochwową",
          "E) Jedynie w przypadku jednoczesnego zakażenia wirusem różyczki"
        ],
        options: [
          "A) Wyłącznie w pierwszym trymestrze ciąży przed 12. tygodniem",
          "B) Przed porodem (ante partum), w trakcie porodu (intra partum) lub do 48h po porodzie",
          "C) Dokładnie po 6 miesiącach od zakończenia okresu karmienia piersią",
          "D) Wyłącznie u kobiet rodzących po raz kolejny drogą pochwową",
          "E) Jedynie w przypadku jednoczesnego zakażenia wirusem różyczki"
        ],
        correct: 1,
        correctIdx: 1,
        exp: "Prawidłowo! Rzucawka może wystąpić przed porodem (ok. 50%), w trakcie porodu (ok. 25%) oraz we wczesnym połogu, najczęściej w ciągu pierwszych 48 godzin po porodzie (ok. 25%). Rzadko rzucawka późna rozwija się do kilku tygodni po porodzie.",
        expl: "Prawidłowo! Rzucawka może wystąpić przed porodem (ok. 50%), w trakcie porodu (ok. 25%) oraz we wczesnym połogu, najczęściej w ciągu pierwszych 48 godzin po porodzie (ok. 25%). Rzadko rzucawka późna rozwija się do kilku tygodni po porodzie.",
        explanation: "Prawidłowo! Rzucawka może wystąpić przed porodem (ok. 50%), w trakcie porodu (ok. 25%) oraz we wczesnym połogu, najczęściej w ciągu pierwszych 48 godzin po porodzie (ok. 25%). Rzadko rzucawka późna rozwija się do kilku tygodni po porodzie."
      },
      {
        q: "Który lek hipotensyjny jest BEZWZGLĘDNIE PRZECIWWSKAZANY w farmakoterapii nadciśnienia tętniczego u kobiet w ciąży?",
        question: "Który lek hipotensyjny jest BEZWZGLĘDNIE PRZECIWWSKAZANY w farmakoterapii nadciśnienia tętniczego u kobiet w ciąży?",
        opts: [
          "A) Ramipryl (inhibitor konwertazy angiotensyny – ACEI)",
          "B) Metyldopa (ośrodkowy agonista receptorów alfa-2)",
          "C) Labetalol (alfa- i beta-adrenolityk naczyniorozszerzający)",
          "D) Nifedypina (antagonista wapnia z grupy dihydropirydyn)",
          "E) Hydralazyna (bezpośredni lek rozszerzający tętniczki)"
        ],
        options: [
          "A) Ramipryl (inhibitor konwertazy angiotensyny – ACEI)",
          "B) Metyldopa (ośrodkowy agonista receptorów alfa-2)",
          "C) Labetalol (alfa- i beta-adrenolityk naczyniorozszerzający)",
          "D) Nifedypina (antagonista wapnia z grupy dihydropirydyn)",
          "E) Hydralazyna (bezpośredni lek rozszerzający tętniczki)"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Leki blokujące układ renina-angiotensyna-aldosteron (inhibitory ACE, np. ramipryl, enalapryl oraz sartany/ARB) są bezwzględnie teratogenne i fetotoksyczne – powodują agenezję/dysgenezję nerek płodu, małowodzie (oligoamnios), hipoplazję płuc, opóźnienie kostnienia czaszki oraz zgon wewnątrzmaciczny.",
        expl: "Prawidłowo! Leki blokujące układ renina-angiotensyna-aldosteron (inhibitory ACE, np. ramipryl, enalapryl oraz sartany/ARB) są bezwzględnie teratogenne i fetotoksyczne – powodują agenezję/dysgenezję nerek płodu, małowodzie (oligoamnios), hipoplazję płuc, opóźnienie kostnienia czaszki oraz zgon wewnątrzmaciczny.",
        explanation: "Prawidłowo! Leki blokujące układ renina-angiotensyna-aldosteron (inhibitory ACE, np. ramipryl, enalapryl oraz sartany/ARB) są bezwzględnie teratogenne i fetotoksyczne – powodują agenezję/dysgenezję nerek płodu, małowodzie (oligoamnios), hipoplazję płuc, opóźnienie kostnienia czaszki oraz zgon wewnątrzmaciczny."
      }
    ],
    flashcards: [
      { q: "Jaki jest lek pierwszego rzutu w zapobieganiu i leczeniu drgawek rzucawkowych?", a: "Siarczan magnezu (MgSO4 i.v. dawka nasycająca 4-6 g w 15-20 min, potem wlew 1-2 g/h)." },
      { q: "Jakie jest antidotum na zatrucie siarczanem magnezu (hipermagnezemię)?", a: "Glukonian wapnia 10% (10 ml i.v. w ciągu 10 minut)." },
      { q: "Jakie są 3 leki pierwszego rzutu w ciężkim nadciśnieniu w ciąży?", a: "Labetalol i.v., hydralazyna i.v. oraz nifedypina doustnie (o zmodyfikowanym uwalnianiu)." },
      { q: "Jakie leki hipotensyjne są bezwzględnie zakazane w ciąży?", a: "Inhibitory ACE (ACEI) oraz antagoniści receptora angiotensyny II (sartany / ARB) – ryzyko fetotoksyczności i bezmoczu płodu." },
      { q: "Jaki jest najwcześniejszy kliniczny objaw przedawkowania magnezu?", a: "Zniesienie (osłabienie lub brak) głębokich odruchów ścięgnistych (odruchu rzepkowego)." },
      { q: "Co jest jedynym definitywnym leczeniem przyczynowym stanu przedrzucawkowego i rzucawki?", a: "Ukończenie ciąży (poród / cięcie cesarskie) po uprzedniej stabilizacji stanu matki." }
    ]
  },

  // =========================================================================
  // CASE 152: Przedwczesne Odklejenie Łożyska (Ablatio placentae)
  // =========================================================================
  {
    id: 152,
    file: "152_odklejenie_lozyska.json",
    shortTitle: "Przedwczesne Odklejenie Łożyska",
    title: "Ostre Przedwczesne Odklejenie Łożyska Prawidłowo Usadowionego (Ablatio placentae)",
    dept: "Ginekologia i Położnictwo",
    diagnosisTitle: "Przedwczesne Odklejenie Łożyska (Ablatio placentae / Abruptio placentae)",
    vitals: [
      { label: "Ciśnienie tętnicze (RR)", val: "85/50", unit: "mmHg", status: "vital-crit" },
      { label: "Częstość akcji serca (HR)", val: "128", unit: "/min", status: "vital-crit" },
      { label: "Częstość oddechów (RR)", val: "24", unit: "/min", status: "vital-warn" },
      { label: "Saturacja (SpO2)", val: "94", unit: "%", status: "vital-warn" },
      { label: "Temperatura ciała", val: "36.6", unit: "°C", status: "vital-ok" }
    ],
    story: "<p><strong>Pacjent:</strong> 34-letnia wieloródka w 35. tygodniu ciąży przywieziona na SOR z powodu nagłego, ostrego bólu brzucha i krwawienia z dróg rodnych.</p><p><strong>Wywiad chorobowy:</strong> Pół godziny temu podczas odpoczynku wystąpił nagły, niezwykle silny, stały ból w podbrzuszu. Pacjentka zauważyła ciemnoczerwone krwawienie ze skrzepami z dróg rodnych. W wywiadzie: palenie tytoniu oraz nieleczone nadciśnienie tętnicze indukowane ciążą. Nie było urazu mechanicznego.</p><p><strong>Badanie przedmiotowe:</strong> Pacjentka blada, spocona, z cechami wstrząsu hipowolemicznego (RR 85/50 mmHg, HR 128/min). W badaniu palpacyjnym brzucha: macica twarda jak deska (\"brzuch deskowaty\"), bolesna przy najlżejszym dotyku, brak faz rozkurczu (stałe wzmożone napięcie). W badaniu we wziernikach obecna krew ciemna wypływająca z ujścia szyjki. W KTG: bradykardia płodu 90–100/min z głębokimi deceleracjami późnymi.</p>",
    steps: [
      {
        title: "Krok 1: Rozpoznanie stanu bezpośredniego zagrożenia życia i natychmiastowa reanimacja płynowa",
        scenario: "Pacjentka prezentuje objawy wstrząsu hipowolemicznego, twardą jak deska bolesną macicę oraz zagrażającą zamartwicę płodu. Jakie są natychmiastowe priorytety resuscytacyjne na sali porodowej/SOR?",
        options: [
          {
            text: "Kaniulacja 2 dużych żył (14–16G), szybki wlew krystaloidów, pobranie krwi na grupę i próbę krzyżową (próba pilna) oraz natychmiastowe wezwanie zespołu operacyjnego",
            correct: true,
            isCorrect: true,
            feedback: "✅ PRAWIDŁOWO! Przedwczesne odklejenie łożyska grozi natychmiastowym zgonem wewnątrzmacicznym płodu oraz wykrwawieniem matki z rozwojem DIC (udar maciczno-łożyskowy Couvelaire'a). Zabezpieczenie dostępu naczyniowego, płynoterapia i przygotowanie sali cięć są bezwzględnym priorytetem."
          },
          {
            text: "Podanie dożylne tokolityku (fenoterol lub atozyban) w celu natychmiastowego zniesienia hipertonii mięśnia macicy",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Tokoliza w przedwczesnym odklejeniu łożyska z objawami zagrożenia życia płodu i wstrząsem matki jest bezwzględnie przeciwwskazana."
          },
          {
            text: "Zlecenie badania tomografii komputerowej jamy brzusznej z kontrastem w celu dokładnego zlokalizowania krwiaka",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Odklejenie łożyska to diagnoza kliniczna; wysyłanie niestabilnej ciężarnej z bradykardią płodu na TK opóźnia ratujące życie cięcie cesarskie."
          },
          {
            text: "Wykonanie głębokiego badania palpacyjnego przez pochwę z próbą manualnego oddzielenia pęcherza płodowego",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Badanie wewnętrzne w krwawieniach III trymestru musi być wykonywane ze szczególną ostrożnością po wykluczeniu łożyska przodującego."
          }
        ]
      },
      {
        title: "Krok 2: Pilna decyzja położnicza",
        scenario: "Mimo podaży 1000 ml płynów wieloelektrolitowych i tlenoterapii biernej, KTG płodu wykazuje przedłużającą się bradykardię 85/min, a macica pozostaje skrajnie twarda i bolesna. Jaka jest jedyna właściwa decyzja terapeutyczna?",
        options: [
          {
            text: "Natychmiastowe ukończenie ciąży drogą cięcia cesarskiego w trybie nagłym (kod czerwony) w znieczuleniu ogólnym",
            correct: true,
            isCorrect: true,
            feedback: "✅ PRAWIDŁOWO! Wskazaniem do natychmiastowego cięcia cesarskiego w trybie nagłym (od decyzji do wydobycia <15–30 min) jest ostre odklejenie łożyska z objawami zagrożenia życia płodu (bradykardia) lub dekompensacją krążeniową matki."
          },
          {
            text: "Podanie dożylne siarczanu magnezu i wyczekiwanie 12 godzin na samoistny początek regularnej akcji porodowej",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Zwłoka w odklejeniu łożyska prowadzi w ciągu kilkunastu minut do wewnątrzmacicznej śmierci płodu i zespołu rozsianego wykrzepiania wewnątrznaczyniowego (DIC) u matki."
          },
          {
            text: "Podanie dożylne oksytocyny w wysokim stężeniu w celu natychmiastowej indukcji porodu drogami natury",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Indukcja porodu drogami natury przy ostrej hipoksji płodu i zamkniętej szyjce macicy jest błędem sztuki lekarskiej."
          },
          {
            text: "Wykonanie kordocentezy diagnostycznej pod kontrolą USG w celu oceny utlenowania krwi pępowinowej płodu",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Kordocenteza jest procedurą inwazyjną planową i jest całkowicie przeciwwskazana w ostrym stanie zagrożenia życia."
          }
        ]
      },
      {
        title: "Krok 3: Zapobieganie i leczenie koagulopatii ze zużycia (DIC)",
        scenario: "W trakcie zabiegu operacyjnego po nacięciu powłok widoczna jest sinofioletowa macica nacieczona wynaczynioną krwią (macica Couvelaire'a). Krwawienie z brzegów rany nie krzepnie, krew jest płynna. Fibrynogen w surowicy wynosi 1,2 g/l (norma w ciąży 4–6 g/l), PLT 75 G/l. Jakie leczenie hemostatyczne należy wdrożyć natychmiast?",
        options: [
          {
            text: "Podanie kwasu traneksamowego (1 g i.v. w ciągu 10 minut), koncentratu fibrynogenu (lub krioprecypitatu) oraz KKCz i FFP w protokole masywnej transfuzji",
            correct: true,
            isCorrect: true,
            feedback: "✅ PRAWIDŁOWO! W odklejeniu łożyska uwalnianie tromboplastyny tkankowej z doczesnej wyzwala kaskadę DIC z gwałtowną konsumpcją fibrynogenu (hipofibrynogenemia <2 g/l jest silnym predyktorem ciężkiego krwotoku). Kwas traneksamowy oraz substytucja fibrynogenu i płytek są kluczem do ratowania życia."
          },
          {
            text: "Podanie dożylnego bolusu heparyny niefrakcjonowanej 5000 j.m. w celu zahamowania mikrozakrzepicy naczyniowej",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Heparyna w krwotocznym DIC w położnictwie nasiliłaby śmiertelne krwawienie chirurgiczne."
          },
          {
            text: "Podanie wyłącznie soli fizjologicznej 0,9% NaCl w ilości 4000 ml bez przetaczania preparatów krwiopochodnych",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Masywna podaż krystaloidów wywoła zabójczą koagulopatię z rozcieńczenia (dilution coagulopathy) oraz hipotermię."
          },
          {
            text: "Wstrzyknięcie domięśniowe witaminy K 10 mg jako jedynego leku hemostatycznego w ostrym krwotoku",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Witamina K działa dopiero po kilkunastu godzinach poprzez syntezę czynników w wątrobie i jest nieskuteczna w ostrym DIC ze zużycia."
          }
        ]
      },
      {
        title: "Krok 4: Postępowanie w atonii na podłożu udaru maciczno-łożyskowego (Couvelaire)",
        scenario: "Wydobyto żywego wcześniaka (przekazany neonatologom). Po usunięciu łożyska z dużym krwiakiem retroplacentarnym (ok. 800 ml) macica nie obkurcza się mimo masażu. Jakie postępowanie zabiegowe i farmakologiczne należy podjąć?",
        options: [
          {
            text: "Uterotoniki (oksytocyna we wlewie, karboprost i.m., mizoprostol p.r.), szwy hemostatyczne B-Lyncha lub tamponada balonowa, a w razie braku hemostazy histerektomia ratunkowa",
            correct: true,
            isCorrect: true,
            feedback: "✅ PRAWIDŁOWO! Udary maciczno-łożyskowe (Couvelaire uterus) cechują się upośledzoną kurczliwością miocytów z powodu wylewów krwi między pęczki mięśniowe. Wdrożenie leków obkurczających, szwów uciskowych (B-Lynch) i ewentualne wycięcie macicy ratuje życie pacjentki przed wykrwawieniem."
          },
          {
            text: "Zaszycie powłok brzusznych bez próby uzyskania obkurczenia macicy i obserwacja drenażu jamy otrzewnej",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Pozostawienie atonicznej macicy doprowadzi do niekontrolowanego zgonu we wstrząsie krwotocznym w ciągu 30 minut."
          },
          {
            text: "Podanie wlewu z siarczanu magnezu w celu rozluźnienia dolnego odcinka macicy i odpływu zalegającej krwi",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Siarczan magnezu ma działanie tokolityczne i pogłębi atonię macicy."
          },
          {
            text: "Wykonanie natychmiastowej nefrektomii jednostronnej w celu zmniejszenia obciążenia krążenia matki",
            correct: false,
            isCorrect: false,
            feedback: "❌ BŁĄD! Nefrektomia jest absurdalna klinicznie i nie ma żadnego związku z leczeniem atonii macicy."
          }
        ]
      }
    ],
    pathoNodes: [
      {
        title: "Pęknięcie patologicznych naczyń doczesnej podstawnej",
        desc: "Nadciśnienie tętnicze lub zmiany zwyrodnieniowe tętniczek spiralnych prowadzą do ich pęknięcia w warstwie doczesnej.",
        detail: "Krew pod wysokim ciśnieniem rozwarstwia połączenie doczesnowo-łożyskowe, odrywając kosmówkę od ściany macicy. Powstaje krwiak pozałożyskowy (retroplacentaris), który może pozostać zamknięty (krwawienie ukryte) lub ujść przez szyjkę na zewnątrz.",
        target: "Punkt uchwytu diagnostyki i leczenia: Ocena kliniczna (bolesna deska), USG przezbrzuszne (krwiak retroplacentarny widoczny u 25–50%) i pilna operacja."
      },
      {
        title: "Uwolnienie tromboplastyny tkankowej i kaskada DIC",
        desc: "Masywne uszkodzenie doczesnej i łożyska uwalnia do krążenia matki ogromne ilości czynnika tkankowego (tromboplastyny).",
        detail: "Wyzwala to układowe wewnątrznaczyniowe krzepnięcie, prowadząc do tworzenia mikrozakrzepów w mikrokrążeniu oraz błyskawicznego zużycia fibrynogenu, płytek krwi i czynników krzepnięcia (koagulopatia ze zużycia).",
        target: "Punkt uchwytu leczenia: Podanie kwasu traneksamowego (1 g i.v.) oraz wczesna substytucja fibrynogenu (koncentrat fibrynogenu lub krioprecypitat) i osocza FFP."
      },
      {
        title: "Udar maciczno-łożyskowy Couvelaire'a i atonia",
        desc: "Krew pod ciśnieniem z krwiaka penetruje w głąb błony mięśniowej macicy oraz pod otrzewną trzewną.",
        detail: "Wylewy krwi rozdzielają pęczki mięśniowe miometrium, uszkadzając aparat kurczliwy komórek mięśniowych. Prowadzi to do całkowitej atonii poporodowej i nasilenia krwotoku.",
        target: "Punkt uchwytu leczenia: Skojarzona farmakoterapia uterotoniczna (oksytocyna, karboprost, mizoprostol), hemostatyczne szwy uciskowe B-Lyncha lub histerektomia ratunkowa."
      }
    ],
    dutySummary: {
      overview: "Przedwczesne odklejenie łożyska to stan nagły w położnictwie, charakteryzujący się triadą objawów: nagły silny ból brzucha, wzmożone napięcie macicy (\"brzuch deskowaty\") oraz krwawienie z dróg rodnych (często ciemne, może być ukryte). Towarzyszy mu hipoksja płodu oraz wysokie ryzyko matczynego DIC.",
      diagnostics: "1. Badanie kliniczne palpacyjne: ocena stałego napięcia macicy (brak fazy relaksacji).\n\n2. Kardiotokografia (KTG): wczesna detekcja deceleracji późnych i bradykardii płodu.\n\n3. Badania laboratoryjne pilne: morfologia, grupa krwi i próba krzyżowa, układ krzepnięcia ze szczególnym uwzględnieniem stężenia fibrynogenu, D-dimery, gazometria.\n\n4. USG położnicze: ocena obecności krwiaka pozałożyskowego (uwaga: prawidłowy obraz USG nie wyklucza odklejenia!).",
      drugsAndDoses: "• <span class=\"dose-pill\">Kwas traneksamowy: 1,0 g i.v. w ciągu 10 minut</span>, powtórzone po 30–60 min w razie trwającego krwawienia.\n• <span class=\"dose-pill\">Koncentrat fibrynogenu: 2,0–4,0 g i.v.</span> przy stężeniu fibrynogenu <2,0 g/l lub krioprecypitat 10–15 j.\n• <span class=\"dose-pill\">Oksytocyna: 5–10 j.m. powoli i.v.</span>, następnie wlew <span class=\"dose-pill\">20–40 j.m. w 500 ml 0,9% NaCl</span>.\n• <span class=\"dose-pill\">Karboprost (PGF2alfa): 0,25 mg domięśniowo</span> (uwaga na astmę oskrzelową).\n• <span class=\"dose-pill\">Mizoprostol: 800–1000 mcg doodbytniczo lub podjęzykowo</span>.",
      procedures: "Pilne cięcie cesarskie w trybie natychmiastowym (kod czerwony), aktywacja protokołu masywnej transfuzji (MTP 1:1:1), szwy B-Lyncha, tamponada macicy lub histerektomia.",
      monitoring: "Ścisłe monitorowanie parametrów hemodynamicznych (tętno, RR, saturacja), diurezy godzinowej (cewnik moczowy z moczomierzem), parametrów krzepnięcia (INR, APTT, fibrynogen)."
    },
    diffTable: {
      title: "⚔️ Tabela Różnicowa: Przedwczesne Odklejenie Łożyska vs Łożysko Przodujące vs Pęknięcie Macicy vs Pęknięcie Naczynia Błoniastego (Vasa Praevia)",
      headers: ["Cecha kliniczna", "Odklejenie Łożyska (Ablatio)", "Łożysko Przodujące (Praevia)", "Pęknięcie Macicy (Ruptura)", "Naczynia Przodujące (Vasa Praevia)"],
      rows: [
        ["Ból brzucha", "Nagły, niezwykle silny, stały", "Całkowity brak bólu (niebolesne)", "Nagły, rozdzierający, po czym ustaje", "Brak bólu brzucha matki"],
        ["Charakter krwawienia", "Ciemnoczerwone ze skrzepami (lub ukryte)", "Żywoczerwone, jasne, epizodyczne", "Zmienne, od miernego po krwotok", "Niewielkie krwawienie po pęknięciu pęcherza"],
        ["Napięcie mięśnia macicy", "Deskowate, skrajnie twarda, brak rozkurczu", "Prawidłowe, miękka, wiotka", "Brak napięcia, części płodu pod powłokami", "Prawidłowe, macica miękka"],
        ["Stan płodu (KTG)", "Wczesna bradykardia / zgon płodu", "Początkowo prawidłowy (dobre KTG)", "Nagła zapaść tętna płodu / bradykardia", "Błyskawiczna agonia płodu (krwawi płód)"],
        ["Czynniki ryzyka", "Nadciśnienie, preeklampsja, uraz, kokaina", "Przebyte cięcia cesarskie, wielorodztwo", "Blizna po cięciu, poród zabiegowy", "Łożysko dwupłatowe, zapłodnienie IVF"],
        ["Koagulopatia (DIC)", "Bardzo częsta (do 30% ciężkich postaci)", "Rzadka (tylko w krańcowym wstrząsie)", "Możliwa w zaawansowanym krwotoku", "Nie występuje u matki"]
      ]
    },
    lekQuestions: [
      {
        q: "Który objaw kliniczny NAJSILNIEJ różnicuje przedwczesne odklejenie łożyska od łożyska przodującego w III trymestrze ciąży?",
        question: "Który objaw kliniczny NAJSILNIEJ różnicuje przedwczesne odklejenie łożyska od łożyska przodującego w III trymestrze ciąży?",
        opts: [
          "A) Stałe, bolesne wzmożenie napięcia mięśnia macicy (\"brzuch deskowaty\") w odklejeniu łożyska",
          "B) Występowanie obfitego białkomoczu w badaniu ogólnym moczu matki w łożysku przodującym",
          "C) Zwiększenie stężenia gonadotropiny kosmówkowej (beta-hCG) powyżej normy laboratoryjnej",
          "D) Przyspieszenie akcji serca płodu powyżej 180 uderzeń na minutę w odklejeniu łożyska",
          "E) Obecność wygórowanych odruchów ścięgnistych ze sznurem klonusów stóp w łożysku przodującym"
        ],
        options: [
          "A) Stałe, bolesne wzmożenie napięcia mięśnia macicy (\"brzuch deskowaty\") w odklejeniu łożyska",
          "B) Występowanie obfitego białkomoczu w badaniu ogólnym moczu matki w łożysku przodującym",
          "C) Zwiększenie stężenia gonadotropiny kosmówkowej (beta-hCG) powyżej normy laboratoryjnej",
          "D) Przyspieszenie akcji serca płodu powyżej 180 uderzeń na minutę w odklejeniu łożyska",
          "E) Obecność wygórowanych odruchów ścięgnistych ze sznurem klonusów stóp w łożysku przodującym"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Wzmożone, stałe napięcie macicy (hipertonia mięśnia macicy bez okresów relaksacji) oraz silny ból brzucha to kardynalne cechy odklejenia łożyska. W łożysku przodującym krwawienie jest całkowicie niebolesne, a macica pozostaje miękka i niebolesna.",
        expl: "Prawidłowo! Wzmożone, stałe napięcie macicy (hipertonia mięśnia macicy bez okresów relaksacji) oraz silny ból brzucha to kardynalne cechy odklejenia łożyska. W łożysku przodującym krwawienie jest całkowicie niebolesne, a macica pozostaje miękka i niebolesna.",
        explanation: "Prawidłowo! Wzmożone, stałe napięcie macicy (hipertonia mięśnia macicy bez okresów relaksacji) oraz silny ból brzucha to kardynalne cechy odklejenia łożyska. W łożysku przodującym krwawienie jest całkowicie niebolesne, a macica pozostaje miękka i niebolesna."
      },
      {
        q: "Co to jest tzw. udar maciczno-łożyskowy Couvelaire'a (Couvelaire uterus)?",
        question: "Co to jest tzw. udar maciczno-łożyskowy Couvelaire'a (Couvelaire uterus)?",
        opts: [
          "A) Zakrzepowe zamknięcie tętnicy krezkowej górnej współistniejące z martwicą zstępnicy",
          "B) Wynaczynienie krwi do ściany mięśniowej macicy i pod otrzewną w ciężkim odklejeniu łożyska",
          "C) Pęknięcie ściany pęcherzyka żółciowego w wyniku ostrego nadciśnienia w ciąży",
          "D) Zator powietrzny w tętnicy płucnej matki powstały w trakcie obkurczania łożyska",
          "E) Wypadnięcie pętli pępowinowej przez pęknięty mięsień dna macicy do jamy otrzewnej"
        ],
        options: [
          "A) Zakrzepowe zamknięcie tętnicy krezkowej górnej współistniejące z martwicą zstępnicy",
          "B) Wynaczynienie krwi do ściany mięśniowej macicy i pod otrzewną w ciężkim odklejeniu łożyska",
          "C) Pęknięcie ściany pęcherzyka żółciowego w wyniku ostrego nadciśnienia w ciąży",
          "D) Zator powietrzny w tętnicy płucnej matki powstały w trakcie obkurczania łożyska",
          "E) Wypadnięcie pętli pępowinowej przez pęknięty mięsień dna macicy do jamy otrzewnej"
        ],
        correct: 1,
        correctIdx: 1,
        exp: "Prawidłowo! Macica Couvelaire'a to powikłanie ciężkiego odklejenia łożyska, w którym wynaczyniona krew penetruje między włókna mięśniowe miometrium aż pod surowicówkę (otrzewną trzewną), nadając macicy sinoczarne lub marmurkowate zabarwienie i prowadząc do ciężkiej atonii.",
        expl: "Prawidłowo! Macica Couvelaire'a to powikłanie ciężkiego odklejenia łożyska, w którym wynaczyniona krew penetruje między włókna mięśniowe miometrium aż pod surowicówkę (otrzewną trzewną), nadając macicy sinoczarne lub marmurkowate zabarwienie i prowadząc do ciężkiej atonii.",
        explanation: "Prawidłowo! Macica Couvelaire'a to powikłanie ciężkiego odklejenia łożyska, w którym wynaczyniona krew penetruje między włókna mięśniowe miometrium aż pod surowicówkę (otrzewną trzewną), nadając macicy sinoczarne lub marmurkowate zabarwienie i prowadząc do ciężkiej atonii."
      },
      {
        q: "Które zaburzenie hemostazy jest NAJCZĘSTSZYM i najgroźniejszym powikłaniem ciężkiego przedwczesnego odklejenia łożyska?",
        question: "Które zaburzenie hemostazy jest NAJCZĘSTSZYM i najgroźniejszym powikłaniem ciężkiego przedwczesnego odklejenia łożyska?",
        opts: [
          "A) Nabyta hemofilia A z przeciwciałami przeciwko czynnikowi VIII",
          "B) Rozsiane krzepnięcie wewnątrznaczyniowe (DIC) z hipofibrynogenemią",
          "C) Izolowany niedobór czynnika krzepnięcia XIII ze skazą osoczową",
          "D) Nadpłytkowość samoistna z zakrzepicą dużych pni żylnych miednicy",
          "E) Pierwotna hiperfibrynoliza bez aktywacji kaskady trombinowej"
        ],
        options: [
          "A) Nabyta hemofilia A z przeciwciałami przeciwko czynnikowi VIII",
          "B) Rozsiane krzepnięcie wewnątrznaczyniowe (DIC) z hipofibrynogenemią",
          "C) Izolowany niedobór czynnika krzepnięcia XIII ze skazą osoczową",
          "D) Nadpłytkowość samoistna z zakrzepicą dużych pni żylnych miednicy",
          "E) Pierwotna hiperfibrynoliza bez aktywacji kaskady trombinowej"
        ],
        correct: 1,
        correctIdx: 1,
        exp: "Prawidłowo! Przedwczesne odklejenie łożyska jest najczęstszą przyczyną ostrego DIC w położnictwie. Uwolnienie tromboplastyny z doczesnej i łożyska do krążenia matki wyzwala kaskadę krzepnięcia ze zużyciem fibrynogenu (spadek poniżej 2 g/l) i płytek krwi.",
        expl: "Prawidłowo! Przedwczesne odklejenie łożyska jest najczęstszą przyczyną ostrego DIC w położnictwie. Uwolnienie tromboplastyny z doczesnej i łożyska do krążenia matki wyzwala kaskadę krzepnięcia ze zużyciem fibrynogenu (spadek poniżej 2 g/l) i płytek krwi.",
        explanation: "Prawidłowo! Przedwczesne odklejenie łożyska jest najczęstszą przyczyną ostrego DIC w położnictwie. Uwolnienie tromboplastyny z doczesnej i łożyska do krążenia matki wyzwala kaskadę krzepnięcia ze zużyciem fibrynogenu (spadek poniżej 2 g/l) i płytek krwi."
      },
      {
        q: "Wskaż zestaw czynników zwiększających ryzyko przedwczesnego odklejenia łożyska:\n1. Nadciśnienie tętnicze przewlekłe lub stan przedrzucawkowy.\n2. Palenie tytoniu i zażywanie kokainy przez matkę.\n3. Nagłe odbarczenie wielowodzia lub poród pierwszego bliźniaka.\n4. Tępy uraz brzucha (np. wypadek komunikacyjny).\n5. Przebyte przedwczesne odklejenie łożyska w poprzedniej ciąży.",
        question: "Wskaż zestaw czynników zwiększających ryzyko przedwczesnego odklejenia łożyska:\n1. Nadciśnienie tętnicze przewlekłe lub stan przedrzucawkowy.\n2. Palenie tytoniu i zażywanie kokainy przez matkę.\n3. Nagłe odbarczenie wielowodzia lub poród pierwszego bliźniaka.\n4. Tępy uraz brzucha (np. wypadek komunikacyjny).\n5. Przebyte przedwczesne odklejenie łożyska w poprzedniej ciąży.",
        opts: [
          "A) 1, 2, 3, 4, 5",
          "B) 1, 2, 4",
          "C) 2, 3, 5",
          "D) 1, 4, 5",
          "E) Tylko 1 i 5"
        ],
        options: [
          "A) 1, 2, 3, 4, 5",
          "B) 1, 2, 4",
          "C) 2, 3, 5",
          "D) 1, 4, 5",
          "E) Tylko 1 i 5"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Wszystkie wymienione czynniki istotnie zwiększają ryzyko odklejenia łożyska: nadciśnienie (najczęstsza przyczyna), używki naczyniozwężające (tytoń, kokaina), nagła dekompresja macicy (odbarczenie wielowodzia), bezpośredni uraz oraz wywiad ablatio w przeszłości (10-krotny wzrost ryzyka).",
        expl: "Prawidłowo! Wszystkie wymienione czynniki istotnie zwiększają ryzyko odklejenia łożyska: nadciśnienie (najczęstsza przyczyna), używki naczyniozwężające (tytoń, kokaina), nagła dekompresja macicy (odbarczenie wielowodzia), bezpośredni uraz oraz wywiad ablatio w przeszłości (10-krotny wzrost ryzyka).",
        explanation: "Prawidłowo! Wszystkie wymienione czynniki istotnie zwiększają ryzyko odklejenia łożyska: nadciśnienie (najczęstsza przyczyna), używki naczyniozwężające (tytoń, kokaina), nagła dekompresja macicy (odbarczenie wielowodzia), bezpośredni uraz oraz wywiad ablatio w przeszłości (10-krotny wzrost ryzyka)."
      },
      {
        q: "Wskaż zdanie PRAWDZIWE dotyczące diagnostyki ultrasonograficznej przedwczesnego odklejenia łożyska:",
        question: "Wskaż zdanie PRAWDZIWE dotyczące diagnostyki ultrasonograficznej przedwczesnego odklejenia łożyska:",
        opts: [
          "A) Prawidłowy obraz USG wyklucza odklejenie łożyska z czułością przekraczającą 99%",
          "B) USG cechuje się niską czułością (ok. 25–50%), dlatego ujemny wynik nie wyklucza rozpoznania",
          "C) Badanie USG jest bezwzględnie przeciwwskazane z powodu ryzyka pogłębienia krwawienia",
          "D) USG z kolorowym Dopplerem pozwala zawsze uwidocznić rozerwanie tętnicy pępowinowej",
          "E) Wykrycie krwiaka w USG wymaga bezwzględnego odroczenia operacji o co najmniej 48 godzin"
        ],
        options: [
          "A) Prawidłowy obraz USG wyklucza odklejenie łożyska z czułością przekraczającą 99%",
          "B) USG cechuje się niską czułością (ok. 25–50%), dlatego ujemny wynik nie wyklucza rozpoznania",
          "C) Badanie USG jest bezwzględnie przeciwwskazane z powodu ryzyka pogłębienia krwawienia",
          "D) USG z kolorowym Dopplerem pozwala zawsze uwidocznić rozerwanie tętnicy pępowinowej",
          "E) Wykrycie krwiaka w USG wymaga bezwzględnego odroczenia operacji o co najmniej 48 godzin"
        ],
        correct: 1,
        correctIdx: 1,
        exp: "Prawidłowo! Odklejenie łożyska jest przede wszystkim rozpoznaniem klinicznym. Czułość USG w wykrywaniu krwiaka pozałożyskowego wynosi zaledwie 25–50% (świeża krew ma echogeniczność zbliżoną do łożyska). Prawidłowy obraz w USG NIGDY nie wyklucza ablatio placentae przy obecności klinicznych objawów.",
        expl: "Prawidłowo! Odklejenie łożyska jest przede wszystkim rozpoznaniem klinicznym. Czułość USG w wykrywaniu krwiaka pozałożyskowego wynosi zaledwie 25–50% (świeża krew ma echogeniczność zbliżoną do łożyska). Prawidłowy obraz w USG NIGDY nie wyklucza ablatio placentae przy obecności klinicznych objawów.",
        explanation: "Prawidłowo! Odklejenie łożyska jest przede wszystkim rozpoznaniem klinicznym. Czułość USG w wykrywaniu krwiaka pozałożyskowego wynosi zaledwie 25–50% (świeża krew ma echogeniczność zbliżoną do łożyska). Prawidłowy obraz w USG NIGDY nie wyklucza ablatio placentae przy obecności klinicznych objawów."
      },
      {
        q: "Zgodnie z przepisami prawa medycznego, jeżeli nieprzytomna ciężarna w stanie wstrząsu krwotocznego z powodu odklejenia łożyska wymaga natychmiastowej operacji ratującej życie:",
        question: "Zgodnie z przepisami prawa medycznego, jeżeli nieprzytomna ciężarna w stanie wstrząsu krwotocznego z powodu odklejenia łożyska wymaga natychmiastowej operacji ratującej życie:",
        opts: [
          "A) Lekarz ma obowiązek operować bez zgody pacjentki i bez uprzedniej zgody sądu opiekuńczego",
          "B) Lekarz musi wstrzymać zabieg do czasu uzyskania telefonicznej zgody sędziego dyżurnego",
          "C) Wymagana jest pisemna zgoda co najmniej dwóch pełnoletnich krewnych pacjentki",
          "D) Lekarz nie może podjąć operacji, dopóki pacjentka nie odzyska pełnej przytomności",
          "E) Konieczne jest zwołanie konsylium z udziałem konsultanta wojewódzkiego w ciągu 2 godzin"
        ],
        options: [
          "A) Lekarz ma obowiązek operować bez zgody pacjentki i bez uprzedniej zgody sądu opiekuńczego",
          "B) Lekarz musi wstrzymać zabieg do czasu uzyskania telefonicznej zgody sędziego dyżurnego",
          "C) Wymagana jest pisemna zgoda co najmniej dwóch pełnoletnich krewnych pacjentki",
          "D) Lekarz nie może podjąć operacji, dopóki pacjentka nie odzyska pełnej przytomności",
          "E) Konieczne jest zwołanie konsylium z udziałem konsultanta wojewódzkiego w ciągu 2 godzin"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Zgodnie z art. 33 i 34 Ustawy o zawodach lekarza i lekarza dentysty, w sytuacji nagłej, gdy zwłoka groziłaby bezpośrednim niebezpieczeństwem utraty życia lub ciężkiego uszkodzenia zdrowia, a pacjent jest nieprzytomny, lekarz ma prawo i obowiązek podjąć czynności bez zgody pacjenta i bez zgody sądu opiekuńczego, odnotowując to w dokumentacji i w miarę możliwości zasięgając opinii drugiego lekarza.",
        expl: "Prawidłowo! Zgodnie z art. 33 i 34 Ustawy o zawodach lekarza i lekarza dentysty, w sytuacji nagłej, gdy zwłoka groziłaby bezpośrednim niebezpieczeństwem utraty życia lub ciężkiego uszkodzenia zdrowia, a pacjent jest nieprzytomny, lekarz ma prawo i obowiązek podjąć czynności bez zgody pacjenta i bez zgody sądu opiekuńczego, odnotowując to w dokumentacji i w miarę możliwości zasięgając opinii drugiego lekarza.",
        explanation: "Prawidłowo! Zgodnie z art. 33 i 34 Ustawy o zawodach lekarza i lekarza dentysty, w sytuacji nagłej, gdy zwłoka groziłaby bezpośrednim niebezpieczeństwem utraty życia lub ciężkiego uszkodzenia zdrowia, a pacjent jest nieprzytomny, lekarz ma prawo i obowiązek podjąć czynności bez zgody pacjenta i bez zgody sądu opiekuńczego, odnotowując to w dokumentacji i w miarę możliwości zasięgając opinii drugiego lekarza."
      },
      {
        q: "Dlaczego w przypadku ciężkiego odklejenia łożyska krwawienie zewnętrzne z dróg rodnych może być nieproporcjonalnie małe w stosunku do stopnia wstrząsu matki?",
        question: "Dlaczego w przypadku ciężkiego odklejenia łożyska krwawienie zewnętrzne z dróg rodnych może być nieproporcjonalnie małe w stosunku do stopnia wstrząsu matki?",
        opts: [
          "A) Ponieważ cała wynaczyniona krew ulega natychmiastowej resorpcji przez naczynia limfatyczne",
          "B) Ponieważ dochodzi do uwięźnięcia krwi w przestrzeni pozałożyskowej (krwawienie ukryte/zamknięte)",
          "C) Z powodu natychmiastowego obkurczenia aorty brzusznej przez odruch rdzeniowy",
          "D) Ze względu na całkowite zablokowanie ujścia pochwy przez wypadniętą pętlę jelitową",
          "E) Ponieważ krwawienie w odklejeniu łożyska pochodzi wyłącznie z naczyń włosowatych sromu"
        ],
        options: [
          "A) Ponieważ cała wynaczyniona krew ulega natychmiastowej resorpcji przez naczynia limfatyczne",
          "B) Ponieważ dochodzi do uwięźnięcia krwi w przestrzeni pozałożyskowej (krwawienie ukryte/zamknięte)",
          "C) Z powodu natychmiastowego obkurczenia aorty brzusznej przez odruch rdzeniowy",
          "D) Ze względu na całkowite zablokowanie ujścia pochwy przez wypadniętą pętlę jelitową",
          "E) Ponieważ krwawienie w odklejeniu łożyska pochodzi wyłącznie z naczyń włosowatych sromu"
        ],
        correct: 1,
        correctIdx: 1,
        exp: "Prawidłowo! W ok. 20% przypadków odklejenia łożyska krew nie wydostaje się na zewnątrz, lecz tworzy krwiak retroplacentarny, który może pomieścić nawet 1,5–2 litry krwi (krwawienie ukryte). Główka płodu ściśle przylegająca do dolnego odcinka macicy może dodatkowo tamponować odpływ krwi do pochwy.",
        expl: "Prawidłowo! W ok. 20% przypadków odklejenia łożyska krew nie wydostaje się na zewnątrz, lecz tworzy krwiak retroplacentarny, który może pomieścić nawet 1,5–2 litry krwi (krwawienie ukryte). Główka płodu ściśle przylegająca do dolnego odcinka macicy może dodatkowo tamponować odpływ krwi do pochwy.",
        explanation: "Prawidłowo! W ok. 20% przypadków odklejenia łożyska krew nie wydostaje się na zewnątrz, lecz tworzy krwiak retroplacentarny, który może pomieścić nawet 1,5–2 litry krwi (krwawienie ukryte). Główka płodu ściśle przylegająca do dolnego odcinka macicy może dodatkowo tamponować odpływ krwi do pochwy."
      },
      {
        q: "Jaki poziom stężenia fibrynogenu w osoczu krwi ciężarnej stanowi krytyczny punkt odcięcia wskazujący na wysokie ryzyko masywnego krwotoku i konieczność natychmiastowej substytucji?",
        question: "Jaki poziom stężenia fibrynogenu w osoczu krwi ciężarnej stanowi krytyczny punkt odcięcia wskazujący na wysokie ryzyko masywnego krwotoku i konieczność natychmiastowej substytucji?",
        opts: [
          "A) Stężenie fibrynogenu poniżej 2,0 g/l (200 mg/dl)",
          "B) Stężenie fibrynogenu poniżej 5,5 g/l (550 mg/dl)",
          "C) Stężenie fibrynogenu poniżej 8,0 g/l (800 mg/dl)",
          "D) Izolowane stężenie fibrynogenu równe 4,5 g/l",
          "E) Wzrost stężenia fibrynogenu powyżej 6,0 g/l"
        ],
        options: [
          "A) Stężenie fibrynogenu poniżej 2,0 g/l (200 mg/dl)",
          "B) Stężenie fibrynogenu poniżej 5,5 g/l (550 mg/dl)",
          "C) Stężenie fibrynogenu poniżej 8,0 g/l (800 mg/dl)",
          "D) Izolowane stężenie fibrynogenu równe 4,5 g/l",
          "E) Wzrost stężenia fibrynogenu powyżej 6,0 g/l"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Fizjologicznie w ciąży stężenie fibrynogenu wzrasta do 4,0–6,0 g/l. Dlatego spadek stężenia fibrynogenu <2,0 g/l jest silnym wskaźnikiem koagulopatii ze zużycia (DIC) i wiąże się ze 100% wartością predykcyjną wystąpienia ciężkiego krwotoku poporodowego wymagającego natychmiastowej substytucji.",
        expl: "Prawidłowo! Fizjologicznie w ciąży stężenie fibrynogenu wzrasta do 4,0–6,0 g/l. Dlatego spadek stężenia fibrynogenu <2,0 g/l jest silnym wskaźnikiem koagulopatii ze zużycia (DIC) i wiąże się ze 100% wartością predykcyjną wystąpienia ciężkiego krwotoku poporodowego wymagającego natychmiastowej substytucji.",
        explanation: "Prawidłowo! Fizjologicznie w ciąży stężenie fibrynogenu wzrasta do 4,0–6,0 g/l. Dlatego spadek stężenia fibrynogenu <2,0 g/l jest silnym wskaźnikiem koagulopatii ze zużycia (DIC) i wiąże się ze 100% wartością predykcyjną wystąpienia ciężkiego krwotoku poporodowego wymagającego natychmiastowej substytucji."
      },
      {
        q: "Jakie postępowanie chirurgiczne należy rozważyć w przypadku opornej na farmakoterapię atonii macicy w przebiegu macicy Couvelaire'a, gdy szwy uciskowe okazują się nieskuteczne?",
        question: "Jakie postępowanie chirurgiczne należy rozważyć w przypadku opornej na farmakoterapię atonii macicy w przebiegu macicy Couvelaire'a, gdy szwy uciskowe okazują się nieskuteczne?",
        opts: [
          "A) Obustronne wycięcie nadnerczy w celu zablokowania wyrzutu amin katecholowych",
          "B) Podwiązanie tętnic macicznych / biodrowych wewnętrznych lub histerektomię ratunkową",
          "C) Wytworzenie omijającego zespolenia jelitowo-żołądkowego sposobem Roux-en-Y",
          "D) Przeszczepienie allogeniczne komórek mięśniówki macicy ze zwłok dawcy",
          "E) Wyłuszczenie obustronne jajników z zachowaniem trzonu atonicznej macicy"
        ],
        options: [
          "A) Obustronne wycięcie nadnerczy w celu zablokowania wyrzutu amin katecholowych",
          "B) Podwiązanie tętnic macicznych / biodrowych wewnętrznych lub histerektomię ratunkową",
          "C) Wytworzenie omijającego zespolenia jelitowo-żołądkowego sposobem Roux-en-Y",
          "D) Przeszczepienie allogeniczne komórek mięśniówki macicy ze zwłok dawcy",
          "E) Wyłuszczenie obustronne jajników z zachowaniem trzonu atonicznej macicy"
        ],
        correct: 1,
        correctIdx: 1,
        exp: "Prawidłowo! W przypadku nieskuteczności leków obkurczających (oksytocyna, prostaglandyny) i szwów kompresyjnych B-Lyncha, metodami ratującymi życie przed wykrwawieniem są: podwiązanie tętnic macicznych (sposobem O'Leary), podwiązanie tętnic biodrowych wewnętrznych lub ostatecznie ratunkowe wycięcie macicy (histerektomia połogowa).",
        expl: "Prawidłowo! W przypadku nieskuteczności leków obkurczających (oksytocyna, prostaglandyny) i szwów kompresyjnych B-Lyncha, metodami ratującymi życie przed wykrwawieniem są: podwiązanie tętnic macicznych (sposobem O'Leary), podwiązanie tętnic biodrowych wewnętrznych lub ostatecznie ratunkowe wycięcie macicy (histerektomia połogowa).",
        explanation: "Prawidłowo! W przypadku nieskuteczności leków obkurczających (oksytocyna, prostaglandyny) i szwów kompresyjnych B-Lyncha, metodami ratującymi życie przed wykrwawieniem są: podwiązanie tętnic macicznych (sposobem O'Leary), podwiązanie tętnic biodrowych wewnętrznych lub ostatecznie ratunkowe wycięcie macicy (histerektomia połogowa)."
      },
      {
        q: "W jakich rzadkich i ściśle wyselekcjonowanych sytuacjach klinicznych dopuszcza się postępowanie wyczekujące w przedwczesnym odklejeniu łożyska?",
        question: "W jakich rzadkich i ściśle wyselekcjonowanych sytuacjach klinicznych dopuszcza się postępowanie wyczekujące w przedwczesnym odklejeniu łożyska?",
        opts: [
          "A) Wyłącznie przy masywnym krwotoku z dróg rodnych u wieloródki w terminie porodu",
          "B) Przy częściowym odklejeniu brzeżnym, stabilności matki, prawidłowym KTG i głębokim wcześniactwie (<34 hbd)",
          "C) Zawsze, gdy stężenie fibrynogenu spadnie poniżej wartości 1,0 g/l w dwóch pomiarach",
          "D) W każdym przypadku stwierdzenia twardej jak deska bolesnej macicy z bradykardią płodu",
          "E) Wyłącznie u pacjentek z rozpoznanym zespołem rozsianego wykrzepiania wewnątrznaczyniowego"
        ],
        options: [
          "A) Wyłącznie przy masywnym krwotoku z dróg rodnych u wieloródki w terminie porodu",
          "B) Przy częściowym odklejeniu brzeżnym, stabilności matki, prawidłowym KTG i głębokim wcześniactwie (<34 hbd)",
          "C) Zawsze, gdy stężenie fibrynogenu spadnie poniżej wartości 1,0 g/l w dwóch pomiarach",
          "D) W każdym przypadku stwierdzenia twardej jak deska bolesnej macicy z bradykardią płodu",
          "E) Wyłącznie u pacjentek z rozpoznanym zespołem rozsianego wykrzepiania wewnątrznaczyniowego"
        ],
        correct: 1,
        correctIdx: 1,
        exp: "Prawidłowo! Postępowanie zachowawcze z podaniem sterydoterapii prenatalnej i ścisłym nadzorem na OIT położniczym jest dopuszczalne WYŁĄCZNIE przy stabilnym stanie matki, braku cech koagulopatii, prawidłowym dobrostanie płodu (zapis KTG) i niewielkim, brzeżnym odklejeniu u płodów niedojrzałych (<34. hbd). Wszelkie pogorszenie parametrów nakazuje natychmiastowe cięcie.",
        expl: "Prawidłowo! Postępowanie zachowawcze z podaniem sterydoterapii prenatalnej i ścisłym nadzorem na OIT położniczym jest dopuszczalne WYŁĄCZNIE przy stabilnym stanie matki, braku cech koagulopatii, prawidłowym dobrostanie płodu (zapis KTG) i niewielkim, brzeżnym odklejeniu u płodów niedojrzałych (<34. hbd). Wszelkie pogorszenie parametrów nakazuje natychmiastowe cięcie.",
        explanation: "Prawidłowo! Postępowanie zachowawcze z podaniem sterydoterapii prenatalnej i ścisłym nadzorem na OIT położniczym jest dopuszczalne WYŁĄCZNIE przy stabilnym stanie matki, braku cech koagulopatii, prawidłowym dobrostanie płodu (zapis KTG) i niewielkim, brzeżnym odklejeniu u płodów niedojrzałych (<34. hbd). Wszelkie pogorszenie parametrów nakazuje natychmiastowe cięcie."
      },
      {
        q: "Jaki jest zalecany stosunek przetaczania Koncentratu Krwinek Czerwonych (KKCz) do Świeżo Mrożonego Osocza (FFP) i Koncentratu Krwinek Płytkowych (KKP) w protokole masywnej transfuzji (MTP) w ciężkim krwotoku położniczym?",
        question: "Jaki jest zalecany stosunek przetaczania Koncentratu Krwinek Czerwonych (KKCz) do Świeżo Mrożonego Osocza (FFP) i Koncentratu Krwinek Płytkowych (KKP) w protokole masywnej transfuzji (MTP) w ciężkim krwotoku położniczym?",
        opts: [
          "A) Stosunek zbalansowany 1:1:1 (1 jednostka KKCz na 1 FFP i 1 KKP)",
          "B) Stosunek 10:1:0 z podażą wyłącznie krystaloidów hipotonicznych",
          "C) Przetoczenie 20 jednostek albumin bez preparatów morfotycznych",
          "D) Stosunek 5:1:0 z bezwzględnym unikaniem przetaczania osocza FFP",
          "E) Wyłącznie autotransfuzja z odzysku śródoperacyjnego bez badań serologicznych"
        ],
        options: [
          "A) Stosunek zbalansowany 1:1:1 (1 jednostka KKCz na 1 FFP i 1 KKP)",
          "B) Stosunek 10:1:0 z podażą wyłącznie krystaloidów hipotonicznych",
          "C) Przetoczenie 20 jednostek albumin bez preparatów morfotycznych",
          "D) Stosunek 5:1:0 z bezwzględnym unikaniem przetaczania osocza FFP",
          "E) Wyłącznie autotransfuzja z odzysku śródoperacyjnego bez badań serologicznych"
        ],
        correct: 0,
        correctIdx: 0,
        exp: "Prawidłowo! Współczesny protokół masywnej transfuzji (MTP) zakłada zrównoważoną hemostatyczną reanimację w proporcji 1:1:1 (KKCz : FFP : KKP), co pozwala zapobiec koagulopatii ze zużycia i rozcieńczenia oraz hipotermii i kwasicy (tzw. triada śmierci).",
        expl: "Prawidłowo! Współczesny protokół masywnej transfuzji (MTP) zakłada zrównoważoną hemostatyczną reanimację w proporcji 1:1:1 (KKCz : FFP : KKP), co pozwala zapobiec koagulopatii ze zużycia i rozcieńczenia oraz hipotermii i kwasicy (tzw. triada śmierci).",
        explanation: "Prawidłowo! Współczesny protokół masywnej transfuzji (MTP) zakłada zrównoważoną hemostatyczną reanimację w proporcji 1:1:1 (KKCz : FFP : KKP), co pozwala zapobiec koagulopatii ze zużycia i rozcieńczenia oraz hipotermii i kwasicy (tzw. triada śmierci)."
      }
    ],
    flashcards: [
      { q: "Jaka jest klasyczna triada objawów przedwczesnego odklejenia łożyska?", a: "Nagły, silny ból brzucha, wzmożone deskowate napięcie macicy (hipertonia) oraz ciemne krwawienie z dróg rodnych (lub krwawienie ukryte)." },
      { q: "Dlaczego ujemny wynik badania USG nie wyklucza odklejenia łożyska?", a: "Czułość USG wynosi zaledwie 25–50%, ponieważ świeża krew ma echogeniczność zbliżoną do miąższu łożyska; rozpoznanie opiera się na obrazie klinicznym." },
      { q: "Czym jest macica Couvelaire'a (udar maciczno-łożyskowy)?", a: "Naciekiem wynaczynionej krwi w głąb błony mięśniowej macicy i pod surowicówkę, prowadzącym do ciężkiej atonii poporodowej." },
      { q: "Jaki poziom fibrynogenu wskazuje na rozwój ostrego DIC w ciąży?", a: "Stężenie fibrynogenu <2,0 g/l (norma w ciąży to 4,0–6,0 g/l) – silny wskaźnik ciężkiego krwotoku wymagający substytucji." },
      { q: "Jakie jest postępowanie z wyboru przy odklejeniu łożyska z objawami zagrożenia płodu?", a: "Natychmiastowe cięcie cesarskie w trybie nagłym (kod czerwony) z równoległą agresywną resuscytacją płynową matki." },
      { q: "Jaki lek hemostatyczny podaje się w pierwszej kolejności przy podejrzeniu DIC w ablatio placentae?", a: "Kwas traneksamowy 1 g i.v. w ciągu 10 minut oraz koncentrat fibrynogenu (lub krioprecypitat)." }
    ]
  }
];

async function run() {
  console.log('Generating Cases 151 and 152...');
  for (const c of casesData) {
    const encrypted = await encryptStringAes(JSON.stringify(c, null, 2), MASTER_KEY);
    fs.writeFileSync(path.join('cases', c.file), JSON.stringify(encrypted, null, 2), 'utf8');
    console.log(`✓ Case #${c.id} (${c.file}) saved and encrypted.`);
  }
}

run().catch(console.error);

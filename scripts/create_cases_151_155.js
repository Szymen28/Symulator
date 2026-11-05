const fs = require('fs');
const path = require('path');
const { encryptStringAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

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
        expl: "Prawidłowo! Wskaźnik sFlt-1/PlGF (rozpuszczalna fms-podobna kinaza tyrozynowa 1 do łożyskowego czynnika wzrostu) poniżej 38 z czułością i wartością predykcyjną ujemną >99% wyklucza wystąpienie stanu przedrzucawkowego w ciągu najbliższych 7 dni (badanie PROGNOSIS), pozwalając uniknąć niepotrzebnej hospitalizacji.",
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
  }
];

async function run() {
  console.log('Generating Case 151...');
  for (const c of casesData) {
    const encrypted = await encryptStringAes(JSON.stringify(c, null, 2), MASTER_KEY);
    fs.writeFileSync(path.join('cases', c.file), JSON.stringify(encrypted, null, 2), 'utf8');
    console.log(`✓ Case #${c.id} (${c.file}) saved and encrypted.`);
  }
}

run().catch(console.error);

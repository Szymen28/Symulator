const fs = require('fs');
const { encryptStringAes } = require('./encrypt_case.js');
const PASSWORD = '@LEKSzymon28111999';

const cases = [
  // 122: Ostra białaczka limfoblastyczna (ALL)
  {
    id: 122,
    filename: "122_ostra_bialaczka_limfoblastyczna_all.json",
    dept: "Pediatria",
    shortTitle: "4-letni chłopiec – Bóle nóg, bladość, wybroczyny na skórze i powiększenie wątroby (Białaczka ALL)",
    diagnosisTitle: "Ostra białaczka limfoblastyczna z komórek B (B-cell Acute Lymphoblastic Leukemia - B-ALL)",
    vitals: [
      { label: "HR", val: "132/min", sub: "Tachykardia kompensacyjna (anemia)", status: "warn" },
      { label: "BP", val: "94/58 mmHg", sub: "Prawidłowe", status: "ok" },
      { label: "SpO2", val: "98%", sub: "Prawidłowa", status: "ok" },
      { label: "RR", val: "24/min", sub: "Prawidłowa", status: "ok" },
      { label: "Temp", val: "38.2°C", sub: "Gorączka nowotworowa / infekcyjna", status: "warn" }
    ],
    vitalsObj: { hr: 132, bp: "94/58", spo2: 98, rr: 24, temp: 38.2 },
    story: "4-letni chłopiec został skierowany na oddział onkohematologii dziecięcej z powodu utrzymującego się od miesiąca narastającego osłabienia, nawracających stanów podgorączkowych i utykania na prawą nóżkę. Rodzice zgłaszali, że dziecko budzi się w nocy z płaczem z powodu bólów podudzi i kolan (początkowo uznawanych przez lekarza POZ za 'bóle wzrostowe') oraz nie chce biegać. W ostatnim tygodniu na skórze podudzi i klatki piersiowej pojawiły się samoistne siniaki i drobne wybroczyny, a przy myciu zębów wystąpiło krwawienie z dziąseł. W badaniu fizykalnym: dziecko woskowo blade, apatyczne. Na skórze liczne petocje i wybroczyny o różnym czasie powstania. Uogólnione powiększenie węzłów chłonnych (pakiety węzłów szyjnych, pachowych i pachwinowych – twarde, niebolesne, nieprzesuwalne). W badaniu jamy brzusznej: wątroba wyczuwalna 3.5 cm, a śledziona 4 cm poniżej łuków żebrowych (hepatosplenomegalia). Bolesność przy ucisku przedniej powierzchni kości piszczelowych.",
    labs: [
      {
        category: "Morfologia krwi obwodowej i rozmaz",
        items: [
          { name: "Hemoglobina (Hb)", val: "7.1 g/dL (ciężka niedokrwistość)", norm: "11.5–14.5 g/dL", flag: "L" },
          { name: "Płytki krwi (PLT)", val: "22 G/L (ciężka małopłytkowość)", norm: "150–450 G/L", flag: "L" },
          { name: "Leukocyty (WBC)", val: "42.0 G/L (hiperleukocytoza)", norm: "5.5–15.5 G/L", flag: "H" },
          { name: "Rozmaz mikroskopowy krwi obwodowej", val: "78% limfoblastów (komórki blastyczne o skąpej cytoplazmie i delikatnej chromatynie)", norm: "Blasty 0%", flag: "H" },
          { name: "Granulocyty obojętnochłonne (ANC)", val: "0.45 G/L (neutropenia)", norm: "1.5–8.0 G/L", flag: "L" }
        ]
      },
      {
        category: "Biochemia, kwas moczowy i zespół lizy guza",
        items: [
          { name: "Kwas moczowy", val: "7.8 mg/dL (podwyższony obrót komórkowy)", norm: "2.0–5.5 mg/dL", flag: "H" },
          { name: "LDH (dehydrogenaza mleczanowa)", val: "1450 IU/L (znaczny wzrost)", norm: "120–300 IU/L", flag: "H" },
          { name: "Potas (K+) / Fosfor", val: "4.4 mmol/L / 1.4 mmol/L", norm: "3.5–5.0 / 1.0–1.8", flag: "N" },
          { name: "Kreatynina surowicy", val: "0.38 mg/dL", norm: "0.25–0.50 mg/dL", flag: "N" }
        ]
      },
      {
        category: "Mielogram (biopsja aspiracyjna szpiku) i immunofenotyp",
        items: [
          { name: "Biopsja aspiracyjna szpiku (mielogram)", val: "Szpik bogatokomórkowy całkowicie wyparty przez naciek komórek blastycznych (86% blastów)", norm: "Blasty < 5%", flag: "H" },
          { name: "Immunofenotypowanie (cytometria przepływowa)", val: "B-komórkowa ostra białaczka limfoblastyczna (B-ALL: CD19+, CD10+, CD22+, TdT+)", norm: "Prawidłowy szpik", flag: "H" },
          { name: "Badanie płynu mózgowo-rdzeniowego (PMR)", val: "Brak komórek blastycznych (CNS-1: brak zajęcia OUN)", norm: "Brak blastów", flag: "N" }
        ]
      }
    ],
    steps: [
      {
        num: 1,
        title: "Podejrzenie ostrej białaczki u dziecka (triada objawów szpikowych)",
        task: "Bóle kostno-stawowe wybudzające ze snu, bladość powłok (anemia), wybroczyny na skórze (trombocytopenia) oraz hepatosplenomegalia i limfadenopatia u 4-latka to obraz:",
        options: [
          { text: "Nacieku szpiku kostnego i wyparcia prawidłowej hematopoezy w przebiegu ostrej białaczki limfoblastycznej (ALL)", correct: true, feedback: "Prawidłowo! ALL to najczęstszy nowotwór złośliwy wieku dziecięcego (szczyt 2–5 r.ż.). Wyparcie szpiku przez blasty powoduje triadę: niedokrwistość (bladość, męczliwość), małopłytkowość (wybroczyny, krwawienia) i neutropenię (gorączki, zakażenia). Naciekanie okostnej daje nocne bóle kości, a układu siateczkowo-śródbłonkowego – powiększenie węzłów, wątroby i śledziony." },
          { text: "Fizjologicznych bólów wzrostowych", correct: false, feedback: "Błąd kardynalny! Bóle wzrostowe występują wieczorem po wysiłku, nigdy nie dają anemii, małopłytkowości ani powiększenia narządów!" },
          { text: "Młodzieńczego idiopatycznego zapalenia stawów (MIZS)", correct: false, feedback: "W MIZS nie występuje wyparcie szpiku z małopłytkowością 22 G/L ani blasty w rozmazie." },
          { text: "Zespołu hemofagocytowego bez nowotworu", correct: false, feedback: "Obecność blastów w krwi i szpiku wskazuje bezpośrednio na białaczkę." }
        ]
      },
      {
        num: 2,
        title: "Badanie rozstrzygające o rozpoznaniu białaczki",
        task: "Jakie badanie jest ZŁOTYM STANDARDEM rozstrzygającym i bezwzględnie wymaganym do postawienia ostatecznego rozpoznania ostrej białaczki?",
        options: [
          { text: "Biopsja aspiracyjna szpiku kostnego (mielogram) wykazująca >= 20% blastów w szpiku", correct: true, feedback: "Dokładnie tak! Zgodnie z kryteriami WHO rozpoznanie ostrej białaczki wymaga wykonania biopsji szpiku (najczęściej z talerza kości biodrowej) i stwierdzenia >= 20% komórek blastycznych. Pobrany materiał podlega badaniu cytologicznemu, cytometrii przepływowej (immunofenotyp), badaniom cytogenetycznym i molekularnym." },
          { text: "USG jamy brzusznej z oceną śledziony", correct: false, feedback: "USG ocenia powiększenie narządów, ale nie stawia rozpoznania histologicznego białaczki." },
          { text: "Rentgenogram kości długich", correct: false, feedback: "RTG może wykazać linie poprzeczne lub odczyny okostnowe, ale nie diagnozuje białaczki." },
          { text: "Poziom ferrytyny w surowicy", correct: false, feedback: "Ferrytyna jest nieswoistym białkiem ostrej fazy." }
        ]
      },
      {
        num: 3,
        title: "Profilaktyka zespołu lizy guza (TLS)",
        task: "Przed rozpoczęciem intensywnej chemioterapii indukcyjnej u dziecka z hiperleukocytozą (WBC 42 G/L) i wysokim LDH istnieje wysokie ryzyko zespołu rozpadu nowotworu (TLS). Jakie leczenie profilaktyczne należy wdrożyć?",
        options: [
          { text: "Intensywne nawadnianie dożylne (bez potasu w płynach!) oraz lek hipourikemiczny (allopurynol lub rasburykaza)", correct: true, feedback: "Znakomicie! Szybki rozpad komórek nowotworowych po lekach uwalnia do krwi kwas moczowy, potas i fosforany. Profilaktyka TLS obejmuje hiperhydratację (2500–3000 mL/m2/d bez dodatku potasu!) oraz rasburykazę (rekombinowaną oksydazę moczanową rozkładającą kwas moczowy do rozpuszczalnej alantoiny) lub allopurynol." },
          { text: "Płynoterapia z dodatkiem 60 mmol KCl na litr", correct: false, feedback: "Śmiertelny błąd! Dodanie potasu w obliczu ryzyka hiperkaliemii z rozpadu komórek wywoła nagłe zatrzymanie krążenia!" },
          { text: "Ograniczenie podaży płynów do 500 mL na dobę", correct: false, feedback: "Doprowadzi do ostrej nefropatii moczanowej i bezmoczu!" },
          { text: "Natychmiastowa radioterapia całego ciała", correct: false, feedback: "Błąd – nie stosuje się w profilaktyce TLS." }
        ]
      },
      {
        num: 4,
        title: "Ocena zajęcia ośrodkowego układu nerwowego (OUN)",
        task: "Dlaczego u każdego dziecka z nowo rozpoznaną ALL wykonuje się nakłucie lędźwiowe z podaniem dokanałowym chemioterapeutyku?",
        options: [
          { text: "OUN jest naturalnym rezerwuarem dla komórek białaczkowych (bariera krew-mózg chroni je przed chemioterapią systemową) – nakłucie służy ocenie obecności blastów w PMR oraz profilaktycznemu podaniu leków (np. metotreksatu dokanałowo)", correct: true, feedback: "Doskonale! OUN i jądra u chłopców to tzw. 'sanktuaria' białaczkowe. Standardem w ALL jest profilaktyka neurobiałaczki za pomocą powtarzanych punkcji lędźwiowych z dokanałową podażą cytostatyków (metotreksat, cytarabina, steryd)." },
          { text: "Tylko w celu zmierzenia ciśnienia płynu", correct: false, feedback: "Głównym celem jest profilaktyka i ocena cytologiczna blastów." },
          { text: "Nakłucie wykonuje się wyłącznie, gdy dziecko ma drgawki", correct: false, feedback: "Błąd – nakłucie z dokanałową chemioterapią jest obowiązkowe u każdego dziecka z ALL bez względu na objawy neurologiczne!" },
          { text: "Badanie to służy do wykluczenia stwardnienia rozsianego", correct: false, feedback: "Brak związku." }
        ]
      },
      {
        num: 5,
        title: "Postępowanie z gorączką u dziecka z neutropenią",
        task: "Dziecko z ANC 0.45 G/L gorączkuje do 38.5°C. Jak definiujemy ten stan i jakie leczenie należy wdrożyć w ciągu pierwszych 60 minut ('złota godzina')?",
        options: [
          { text: "Gorączka neutropeniczna – stan bezpośredniego zagrożenia życia wymagający pobrania posiewów krwi i NATYCHMIASTOWEGO wdrożenia empirycznej dożylnej antybiotykoterapii o szerokim spektrum przeciwko Pseudomonas aeruginosa (np. piperacylina z tazobaktamem lub meropenem / cefepim)", correct: true, feedback: "Znakomicie! Gorączka neutropeniczna (temperatura >=38.3°C lub >=38.0°C przez >1h przy ANC <0.5 G/L) u pacjenta onkologicznego to stan naglący. W ciągu maksymalnie 60 minut od zgłoszenia należy podać bakteriobójczy antybiotyk przeciwpseudomonasowy i.v., aby zapobiec śmiertelnemu wstrząsowi septycznemu." },
          { text: "Podać sam paracetamol i odesłać do domu na 48 godzin", correct: false, feedback: "Śmiertelny błąd! Chory z neutropenią nie tworzy ropy i sepsa rozwija się piorunująco." },
          { text: "Podać doustną nystatynę i poczekać na wynik posiewu za 5 dni", correct: false, feedback: "Karygodna zwłoka prowadząca do zgonu septycznego." },
          { text: "Zalecić ciepłe okłady na brzuch", correct: false, feedback: "Bzdura medyczna." }
        ]
      },
      {
        num: 6,
        title: "Czynniki prognostyczne w ALL u dzieci",
        task: "Które z poniższych cech klinicznych i molekularnych są uznawane za czynniki DOBREGO rokowania w dziecięcej ALL?",
        options: [
          { text: "Wiek 1–9 lat, wyjściowa leukocytoza WBC < 50 G/L, hiperdiploidia (>50 chromosomów) lub obecność fuzji ETV6-RUNX1 (t(12;21)) oraz dobra wczesna odpowiedź na sterydoterapię", correct: true, feedback: "Świetnie! Klasyczna grupa standardowego (dobrego) ryzyka: wiek 1–9 lat, WBC <50 G/L, fuzja ETV6-RUNX1 (TEL-AML1), hiperdiploidia oraz ujemna minimalna choroba resztkowa (MRD) po indukcji. W tej grupie wyleczalność sięga >90%!" },
          { text: "Wiek < 1. roku życia (niemowlęca ALL z rearanżacją KMT2A/MLL)", correct: false, feedback: "ALL niemowląt ma skrajnie ZŁE rokowanie." },
          { text: "Wyjściowa leukocytoza WBC > 200 G/L", correct: false, feedback: "To cecha wysokiego ryzyka." },
          { text: "Obecność chromosomu Philadelphia t(9;22) bez leczenia inhibitorami kinaz", correct: false, feedback: "Tradycyjnie cecha bardzo złego rokowania." }
        ]
      },
      {
        num: 7,
        title: "Podstawowy schemat leczenia indukcyjnego",
        task: "Jakie leki stanowią trzon fazy indukcji remisji według protokołów leczenia ALL (np. ALL-IC BFM)?",
        options: [
          { text: "Glikokortykosteroid (prednizon lub deksametazon), winkrystyna, L-asparaginaza oraz antracyklina (daunorubicyna)", correct: true, feedback: "Bardzo dobrze! Klasyczny protokół indukcyjny (protokół I / faza A) obejmuje steryd (pro-faza sterydowa), winkrystynę, L-asparaginazę (wyczerpującą komórki białaczkowe z asparaginy) oraz daunorubicynę, co pozwala osiągnąć całkowitą remisję morfologiczną u >98% dzieci." },
          { text: "Imatinib w monoterapii doustnej", correct: false, feedback: "Inhibitor kinazy tyrozynowej stosowany w Ph+ ALL, ale zawsze w skojarzeniu z chemioterapią." },
          { text: "Tylko przetaczanie koncentratu krwinek czerwonych", correct: false, feedback: "Leczenie wspomagające nie leczy samej białaczki." },
          { text: "Wycięcie śledziony i węzłów chłonnych", correct: false, feedback: "Białaczka jest uogólnioną chorobą szpiku i krwi; chirurgia nie ma zastosowania!" }
        ]
      },
      {
        num: 8,
        title: "Odległe rokowanie i wyleczalność dziecięcej ALL",
        task: "Jakie jest współczesne odsetkowe przeżycie całkowite (wyleczalność) dzieci z ostrą białaczką limfoblastyczną leczonych nowoczesnymi protokołami chemioterapii wielolekowej?",
        options: [
          { text: "Powyżej 85–90% pacjentów zostaje trwale wyleczonych z choroby", correct: true, feedback: "Znakomicie! Pediatryczna ALL jest jednym z największych sukcesów współczesnej onkologii – dzięki protokołom wielolekowym dostosowanym do grup ryzyka (stratyfikacja oparta na MRD) trwała wyleczalność wynosi obecnie około 90%." },
          { text: "Poniżej 5% – choroba jest nieuleczalna", correct: false, feedback: "Całkowicie nieprawdziwe i przestarzałe o 60 lat." },
          { text: "Dokładnie 50% u każdego pacjenta", correct: false, feedback: "Niewłaściwa statystyka." },
          { text: "Wyleczenie jest możliwe wyłącznie po przeszczepieniu szpiku u każdego dziecka", correct: false, feedback: "Błąd! >80-85% dzieci zostaje wyleczonych samą chemioterapią; alogeniczny przeszczep szpiku (allo-HSCT) rezerwuje się dla grupy bardzo wysokiego ryzyka i wczesnych wznowień." }
        ]
      }
    ],
    pathoNodes: [
      {
        title: "1. Transformacja nowotworowa prekursora limfoidalnego",
        desc: "Mutacje genetyczne (np. fuzje ETV6-RUNX1, BCR-ABL1, hiperdiploidia) blokują różnicowanie i wyzwalają klonalną, autonomiczną proliferację limfoblastów w szpiku.",
        drugTarget: "Chemioterapia wielolekowa indukująca remisję (sterydy, winkrystyna, L-asparaginaza, antracyklina)"
      },
      {
        title: "2. Niewydolność szpiku kostnego i wyparcie hematopoezy",
        desc: "Zajęcie przestrzeni szpikowej przez blasty tłumi komórki macierzyste erytropoezy, megakariopoezy i granulopoezy, wywołując ciężką anemię, trombocytopenię i neutropenię.",
        drugTarget: "Leczenie wspomagające: KKCz przy Hb <7 g/dL, KKP przy trombocytopenii z krwawieniem, antybiotyki w neutropenii"
      },
      {
        title: "3. Naciekanie narządów pozaszpikowych i sanktuariów",
        desc: "Limfoblasty wnikają do węzłów chłonnych, wątroby, śledziony, okostnej oraz przenikają do OUN i jąder, wymagając ogólnoustrojowej i dokanałowej chemioterapii.",
        drugTarget: "Profilaktyka neurobiałaczki: dokanałowe podawanie metotreksatu w powtarzanych punkcjach lędźwiowych"
      }
    ],
    dutySummary: "ALL to najczęstszy nowotwór u dzieci (szczyt 2–5 r.ż.). Objawy: nocne bóle nóg wybudzające ze snu, bladość, wybroczyny na skórze, powiększenie węzłów chłonnych i hepatosplenomegalia. Złoty standard rozpoznania: biopsja szpiku (mielogram: >= 20% blastów). W hiperleukocytozie zapobiegaj TLS (nawadnianie bez potasu + rasburykaza). Gorączka neutropeniczna wymaga antybiotyku przeciwpseudomonasowego w <60 min! Wyleczalność wynosi obecnie >85–90%.",
    diffTable: [
      { disease: "Fizjologiczne bóle wzrostowe", diff: "Występują wieczorem po intensywnej zabawie, nigdy nie budzą dziecka nad ranem, brak bladości, brak siniaków, morfologia krwi w 100% prawidłowa.", test: "Morfologia krwi obwodowej z rozmazem manualnym." },
      { disease: "Młodzieńcze idiopatyczne zapalenie stawów (MIZS)", diff: "Obrzęk i ograniczenie ruchomości stawów, sztywność poranna, brak wyparcia szpiku z małopłytkowością; w mielogramie brak blastów.", test: "Biopsja szpiku, badanie reumatologiczne stawów." },
      { disease: "Mononukleoza zakaźna (EBV)", diff: "Powiększenie węzłów chłonnych i splenomegalia z limfocytozą, ale limfocyty w rozmazie to pobudzone komórki T (komórki Downeya), brak blastów i brak głębokiej anemii/trombocytopenii.", test: "Serologia EBV, mielogram (brak blastów białaczkowych)." },
      { disease: "Idiopatyczna plamica małopłytkowa (ITP)", diff: "Izolowana małopłytkowość z wybroczynami, ale stężenie hemoglobiny i liczba leukocytów są w normie, brak hepatosplenomegalii i bólów kości.", test: "Morfologia krwi (brak innych cytopenii), brak organomegalii." }
    ],
    lekQuestions: [
      {
        question: "4-letni chłopiec zgłosił się z powodu osłabienia, bólów kończyn dolnych wybudzających w nocy oraz wybroczyn na podudziach. W morfologii krwi stwierdzono: Hb 7.2 g/dL, PLT 25 G/L, WBC 38.0 G/L, a w rozmazie obecność komórek blastycznych. Wskaż badanie rozstrzygające o rozpoznaniu ostrej białaczki:",
        options: [
          "Trepanobiopsja kości czaszki.",
          "Biopsja aspiracyjna szpiku kostnego (mielogram).",
          "Tomografia komputerowa klatki piersiowej i brzucha.",
          "Oznaczenie miana przeciwciał przeciwjądrowych (ANA).",
          "Biopsja wycinająca węzła chłonnego szyjnego."
        ],
        correct: 1,
        explanation: "Złotym standardem w diagnostyce ostrej białaczki (ALL/AML) jest biopsja aspiracyjna szpiku kostnego (mielogram). Wykazanie obecności co najmniej 20% komórek blastycznych w szpiku stanowi podstawę definitywnego rozpoznania ostrej białaczki wg kryteriów WHO. Pobrany szpik podlega również badaniom cytometrycznym (immunofenotypowanie), cytogenetycznym i molekularnym."
      },
      {
        question: "U dziecka z nowo rozpoznaną ostrą białaczką limfoblastyczną z wysoką leukocytozą (WBC 85 G/L) w celu zapobiegania zespołowi lizy guza (TLS) przed włączeniem chemioterapii należy:",
        options: [
          "Wdrożyć forsowne nawadnianie dożylne bez dodatku potasu w płynach oraz podać lek obniżający stężenie kwasu moczowego (rasburykazę lub allopurynol).",
          "Podać dożylnie koncentrat potasu w dawce 40 mmol/L w celu zabezpieczenia przed hipokaliemią.",
          "Wdrożyć ścisłą restrykcję płynową poniżej 500 mL na dobę.",
          "Wykonać pilną splenektomię.",
          "Podać heparynę w dawce terapeutycznej."
        ],
        correct: 0,
        explanation: "Zespół rozpadu nowotworu (TLS) charakteryzuje się hiperurykemią, hiperkaliemią, hiperfosfatemią i wtórną hipokalcemią. Profilaktyka polega na intensywnym nawadnianiu (2.5–3 litry/m2 pc./d) BEZ DODATKU POTASU w płynach (ze względu na ryzyko uwolnienia potasu z rozpadających się blastów) oraz podaniu rasburykazy (lub allopurynolu) w celu eliminacji kwasu moczowego."
      },
      {
        question: "U 5-letniego dziecka z ostrą białaczką limfoblastyczną w trakcie chemioterapii wystąpiła gorączka 38.6°C. W morfologii krwi stwierdzono bezwzględną liczbę neutrofilów (ANC) 0.35 G/L. Jakie jest prawidłowe postępowanie?",
        options: [
          "Podanie paracetamolu doustnie i kontrola morfologii za 48 godzin w poradni.",
          "Pobranie posiewów krwi i natychmiastowe wdrożenie empirycznej dożylnej antybiotykoterapii o szerokim spektrum działania (obejmującej Pseudomonas aeruginosa) w ciągu 60 minut.",
          "Natychmiastowe przetoczenie koncentratu granulocytarnego bez antybiotyków.",
          "Zastosowanie doustnej amoksycyliny przez 7 dni w domu.",
          "Wykonanie pilnego zabiegu operacyjnego jamy brzusznej."
        ],
        correct: 1,
        explanation: "Gorączka neutropeniczna (temperatura >=38.3°C lub >=38.0°C przez >1h przy ANC <0.5 G/L) u pacjenta leczonego onkologicznie jest bezpośrednim stanem zagrożenia życia z uwagi na ryzyko piorunującej sepsy bakteryjnej. Zgodnie z zasadą 'złotej godziny', po pobraniu posiewów krwi (z wkłucia centralnego i obwodowego) należy natychmiast podać dożylny antybiotyk o szerokim spektrum aktywny wobec Pseudomonas aeruginosa (np. piperacylinę z tazobaktamem, cefepim lub meropenem)."
      }
    ],
    flashcards: [
      { q: "Jaki jest najczęstszy nowotwór złośliwy wieku dziecięcego?", a: "Ostra białaczka limfoblastyczna (ALL), ze szczytem zachorowań w wieku 2–5 lat.", cat: "Pediatria" },
      { q: "Jakie badanie jest złotym standardem rozpoznania ostrej białaczki?", a: "Biopsja aspiracyjna szpiku kostnego (mielogram) wykazująca >= 20% blastów w szpiku.", cat: "Pediatria" },
      { q: "Jakie objawy kliniczne wynikają z wyparcia prawidłowej hematopoezy w szpiku przez blasty?", a: "Niedokrwistość (bladość, osłabienie), małopłytkowość (wybroczyny, siniaki) i neutropenia (gorączki, zakażenia).", cat: "Pediatria" },
      { q: "Jakie są zasady profilaktyki zespołu lizy guza (TLS) w ALL?", a: "Intensywne nawadnianie dożylne (2500–3000 mL/m2/d) BEZ POTASU w płynach oraz lek hipourikemiczny (rasburykaza lub allopurynol).", cat: "Pediatria" },
      { q: "W jakim czasie należy podać antybiotyk w gorączce neutropenicznej u dziecka onkologicznego?", a: "W ciągu pierwszych 60 minut ('złota godzina') od wystąpienia gorączki (antybiotyk i.v. aktywny wobec P. aeruginosa).", cat: "Pediatria" }
    ]
  },

  // 123: Plamica Henocha-Schönleina (IgAV)
  {
    id: 123,
    filename: "123_plamica_henocha_schonleina_igav.json",
    dept: "Pediatria",
    shortTitle: "6-letni chłopiec – Uniesiona plamica na pośladkach, bóle brzucha i obrzęki stawów (Plamica Henocha-Schönleina / IgAV)",
    diagnosisTitle: "Zapalenie naczyń związane z IgA (IgA Vasculitis - IgAV / Plamica Henocha-Schönleina) z zajęciem nerek i przewodu pokarmowego",
    vitals: [
      { label: "HR", val: "106/min", sub: "Prawidłowa / ból", status: "ok" },
      { label: "BP", val: "118/76 mmHg", sub: "Górna granica normy dla wieku", status: "warn" },
      { label: "SpO2", val: "99%", sub: "Prawidłowa", status: "ok" },
      { label: "RR", val: "20/min", sub: "Prawidłowa", status: "ok" },
      { label: "Temp", val: "37.4°C", sub: "Stan podgorączkowy", status: "ok" }
    ],
    vitalsObj: { hr: 106, bp: "118/76", spo2: 99, rr: 20, temp: 37.4 },
    story: "6-letni chłopiec został przyprowadzony na izbę przyjęć przez rodziców z powodu nagłego pojawienia się ciemnoczerwonych wykwitów na skórze pośladków i kończyn dolnych oraz silnego bólu brzucha. W wywiadzie: 10 dni temu przebył łagodne zapalenie gardła. Dwa dni temu zaczęły go boleć stawy skokowe i kolanowe (chłopiec miał trudności z chodzeniem, stawy skokowe były obrzęknięte i tkliwe). Wczoraj pojawiły się wykwity skórne na pośladkach, podudziach i stopach, a od dziś rano skarży się na kurczowe bóle brzucha wokół pępka i zwymiotował treść pokarmową. W badaniu fizykalnym: na wyprostnych powierzchniach kończyn dolnych i na pośladkach obecna jest symetryczna, uniesiona plamica wyczuwalna palpacyjnie (palpable purpura) wielkości od 2 do 10 mm, nieblednąca pod uciskiem. Tułów i twarz są wolne od wykwitów. Stawy skokowe obustronnie obrzęknięte. Brzuch tkliwy w okolicy śródbrzusza, bez obrony mięśniowej i bez objawów otrzewnowych.",
    labs: [
      {
        category: "Badania hematologiczne i układ krzepnięcia",
        items: [
          { name: "Płytki krwi (PLT)", val: "340 G/L (PRAWIDŁOWA liczba płytek - kluczowy element!)", norm: "150–450 G/L", flag: "N" },
          { name: "Hemoglobina (Hb)", val: "12.8 g/dL", norm: "11.5–14.5 g/dL", flag: "N" },
          { name: "Leukocyty (WBC)", val: "12.2 G/L", norm: "5.5–15.5 G/L", flag: "N" },
          { name: "Czas protrombinowy (PT / INR) / APTT", val: "1.0 / 28 s (krzepnięcie prawidłowe)", norm: "0.9–1.2 / 26–36 s", flag: "N" }
        ]
      },
      {
        category: "Badanie moczu i wskaźniki nerkowe (ocena nefropatii IgAV)",
        items: [
          { name: "Erytrocyty w osadzie moczu", val: "15–20 wpw (krwinkomocz)", norm: "0–3 wpw", flag: "H" },
          { name: "Białko w moczu", val: "0.45 g/L (białkomocz subnerczycowy)", norm: "Nieobecne", flag: "H" },
          { name: "Wskaźnik białko/kreatynina (UPCR)", val: "0.42 mg/mg", norm: "< 0.20 mg/mg", flag: "H" },
          { name: "Kreatynina surowicy / Mocznik", val: "0.42 / 28 mg/dL", norm: "0.30–0.60 / 15–38", flag: "N" }
        ]
      },
      {
        category: "Immunologia i stolce",
        items: [
          { name: "Stężenie IgA w surowicy", val: "320 mg/dL (podwyższone u ~50% chorych)", norm: "70–200 mg/dL", flag: "H" },
          { name: "Krew utajona w kale (FOBT)", val: "Dodatnia (+)", norm: "Ujemna", flag: "H" },
          { name: "USG jamy brzusznej", val: "Pogrubienie ściany pętli jelita czczego i krętego (obrzęk naczyniowy), brak cech wgłobienia jelita", norm: "Prawidłowe", flag: "H" }
        ]
      }
    ],
    steps: [
      {
        num: 1,
        title: "Kryteria rozpoznania zapalenia naczyń związanego z IgA (kryteria EULAR/PRINTO/PRES)",
        task: "Jakie jest OBOWIĄZKOWE kryterium rozpoznania plamicy Henocha-Schönleina (IgAV)?",
        options: [
          { text: "Wykwity plamicze wyczuwalne dotykiem (palpable purpura) lub wybroczyny z dominacją na kończynach dolnych i pośladkach, NIEMOGĄCE wynikać z małopłytkowości (prawidłowa liczba płytek krwi!)", correct: true, feedback: "Prawidłowo! Kryterium bezwzględnym (obowiązkowym) IgAV jest wyczuwalna palpacyjnie uniesiona plamica (palpable purpura) lub wybroczyny na kończynach dolnych i pośladkach przy PRAWIDŁOWEJ liczbie płytek krwi (wykluczenie skazy płytkowej!). Dodatkowo wymagane jest >= 1 z 4 kryteriów: 1. Bóle brzucha, 2. Zapalenie/bóle stawów, 3. Zajęcie nerek (krwiomocz/białkomocz), 4. Złogi IgA w biopsji skóry/nerki." },
          { text: "Ciężka małopłytkowość poniżej 20 G/L", correct: false, feedback: "Błąd kardynalny! W IgAV płytki krwi są ZAWSZE w normie lub podwyższone. Małopłytkowość wyklucza rozpoznanie IgAV!" },
          { text: "Obecność kamicy pęcherzyka żółciowego", correct: false, feedback: "Brak związku." },
          { text: "Dodatni odczyn Wassermanna", correct: false, feedback: "To test na kiłę." }
        ]
      },
      {
        num: 2,
        title: "Różnicowanie: Dlaczego palpacyjna plamica nie jest skazą płytkową?",
        task: "Dlaczego wykwity w IgAV są wyczuwalne dotykiem (uniesione ponad poziom skóry), w przeciwieństwie do wybroczyn w małopłytkowości?",
        options: [
          { text: "Ponieważ w IgAV toczy się leukocytoklastyczne zapalenie drobnych naczyń krwionośnych (vasculitis) z odczynem zapalnym i obrzękiem ściany naczynia, podczas gdy w małopłytkowości występuje jedynie bierne wynaczynienie krwi bez zapalenia", correct: true, feedback: "Dokładnie tak! Zapalenie ściany naczyń (leukocytoclastic vasculitis) wywołane odkładaniem kompleksów IgA powoduje miejscowy naciek neutrofilowy i obrzęk, co sprawia, że plamica jest wyraźnie uniesiona i wyczuwalna opuszką palca." },
          { text: "Ponieważ wykwity są wypełnione płynem mózgowo-rdzeniowym", correct: false, feedback: "Absurd medyczny." },
          { text: "Wynika to ze skrętu naczyń chłonnych", correct: false, feedback: "Nieprawda." },
          { text: "Wykwity są wyczuwalne tylko u dzieci z gorączką", correct: false, feedback: "Błędne stwierdzenie." }
        ]
      },
      {
        num: 3,
        title: "Najgroźniejsze ostre powikłanie brzuszne",
        task: "U dziecka z IgAV pojawia się nagłe zaostrzenie kurczowego bólu brzucha, chlustające wymioty treścią żółciową oraz stolec o wyglądzie 'galaretki porzeczkowej'. Jakie ostre chirurgiczne powikłanie należy natychmiast wykluczyć w USG?",
        options: [
          { text: "Wgłobienie jelita (intussusceptio – najczęściej krętniczo-kątnicze lub krętniczo-krętnicze)", correct: true, feedback: "Znakomicie! Wybroczyny i obrzęk podśluzówkowy ściany jelita cienkiego w IgAV tworzą tzw. 'punkt czołowy' (lead point), który zostaje zepchnięty perystaltyką, wywołując wgłobienie jelita. Występuje u 3–5% chorych i jest najczęstszym ostrym powikłaniem chirurgicznym IgAV." },
          { text: "Pęknięcie tętniaka aorty", correct: false, feedback: "Kazuistyka u 6-latka." },
          { text: "Ostre zapalenie trzustki z martwicą", correct: false, feedback: "Rzadkie powikłanie, objawia się silnym bólem opasującym i amylazemią, a nie stolcem porzeczkowym." },
          { text: "Ostra perforacja pęcherzyka żółciowego", correct: false, feedback: "Brak związku." }
        ]
      },
      {
        num: 4,
        title: "Długoterminowy czynnik decydujący o rokowaniu",
        task: "Który narząd i jego powikłanie determinuje ODLEGŁE rokowanie u dzieci z plamicą Henocha-Schönleina?",
        options: [
          { text: "Nerki – nefropatia IgA (krwiomocz, białkomocz, ryzyko rozwoju nadciśnienia tętniczego i przewlekłej choroby nerek)", correct: true, feedback: "Kluczowy punkt LEK! Zmiany skórne, stawowe i brzuszne ustępują samoistnie w ciągu kilku tygodni bez trwałych następstw. Jedynym narządem decydującym o odległym losie pacjenta są nerki. U ok. 30–50% dzieci rozwija się nefropatia IgAV, z czego u części może dojść do postępującej PChN." },
          { text: "Stawy – ryzyko trwałej ankylozy i zesztywnienia stawów kolanowych", correct: false, feedback: "Błąd! Zapalenie stawów w IgAV jest łagodne, niepowodujące zniszczenia chrząstki ani deformacji, ustępuje w 100% bez śladu!" },
          { text: "Płuca – zarastające zapalenie oskrzelików", correct: false, feedback: "Płuca są niezwykle rzadko zajęte w IgAV." },
          { text: "Oczy – zaćma wrodzona", correct: false, feedback: "Brak związku." }
        ]
      },
      {
        num: 5,
        title: "Harmonogram monitorowania nefrologicznego",
        task: "Jak długo po ustąpieniu objawów skórnych dziecko z plamicą Henocha-Schönleina wymaga okresowej kontroli badania ogólnego moczu i ciśnienia tętniczego?",
        options: [
          { text: "Przez minimum 6 miesięcy od początku choroby (początkowo co 1–2 tygodnie, potem co miesiąc)", correct: true, feedback: "Doskonale! Zgodnie z wytycznymi nefrologii dziecięcej (np. EULAR/ERA-EDTA), zajęcie nerek może ujawnić się z opóźnieniem (nawet do 2–6 miesięcy od początku plamicy). Dlatego każdy pacjent z IgAV wymaga regularnego badania ogólnego moczu (pod kątem erytrocyturii i białkomoczu) oraz pomiarów ciśnienia krwi przez min. 6 miesięcy." },
          { text: "Wystarczy jedno badanie w 1. dobie choroby", correct: false, feedback: "Błąd – nefropatia może rozwinąć się po kilku tygodniach od ustąpienia plamicy." },
          { text: "Przez całe życie co 3 dni", correct: false, feedback: "Nierealistyczne i nieuzasadnione." },
          { text: "Kontrola moczu nie jest potrzebna, jeśli nie ma bólu nerek", correct: false, feedback: "Błąd – kłębuszkowe zapalenie nerek przebiega bezbólowo!" }
        ]
      },
      {
        num: 6,
        title: "Wskazania do glikokortykosteroidoterapii w IgAV",
        task: "Czy w niepowikłanej plamicy Henocha-Schönleina (wykwity skórne i łagodne bóle stawów) zaleca się rutynowe stosowanie prednizonu w celu zapobiegania zajęciu nerek?",
        options: [
          { text: "NIE – wykazano, że glikokortykosteroidy NIE ZAPOBIEGAJĄ rozwojowi nefropatii; wskazaniem do sterydoterapii są silne bóle brzucha (grożące wgłobieniem/krwawieniem) oraz ciężkie zajęcie nerek (białkomocz nerczycowy / RPGN)", correct: true, feedback: "Znakomicie! Badania kliniczne z randomizacją dowiodły, że wczesne podanie sterydów nie chroni przed zajęciem nerek. GKS (np. prednizon 1–2 mg/kg mc./d) są wysoce skuteczne w łagodzeniu silnych bólów brzucha i obrzęku jelit oraz w ciężkim kłębuszkowym zapaleniu nerek, ale nie stosuje się ich rutynowo w łagodnych zmianach skórno-stawowych." },
          { text: "Tak – sterydy podaje się każdemu dziecku z plamicą w celu ochrony nerek", correct: false, feedback: "Obalony mit medyczny." },
          { text: "Sterydy są bezwzględnie zakazane w chorobach naczyń", correct: false, feedback: "Nieprawda – są kluczowe w powikłaniach brzusznych i nerkowych." },
          { text: "Zamiast sterydów stosuje się wyłącznie heparynę niefrakcjonowaną", correct: false, feedback: "Błąd – heparyna zwiększyłaby ryzyko krwawienia z przewodu pokarmowego." }
        ]
      },
      {
        num: 7,
        title: "Leczenie bólów stawowych",
        task: "Jaki lek przeciwbólowy można zastosować u dziecka z IgAV z bolesnymi obrzękami stawów skokowych, przy braku krwawienia z przewodu pokarmowego i prawidłowej funkcji nerek?",
        options: [
          { text: "Paracetamol lub ostrożnie niesteroidowy lek przeciwzapalny (np. ibuprofen)", correct: true, feedback: "Świetnie! Paracetamol jest lekiem bezpiecznym. NLPZ (np. ibuprofen) skutecznie łagodzą ból i zapalenie stawów, pod warunkiem wykluczenia czynnego krwawienia z przewodu pokarmowego, odwodnienia oraz ostrego uszkodzenia nerek." },
          { text: "Kwas acetylosalicylowy w dawce 100 mg/kg mc.", correct: false, feedback: "Przeciwwskazany u dzieci ze względu na zespół Reye'a i hamowanie płytek." },
          { text: "Morfina we wlewie ciągłym do pompy PCA", correct: false, feedback: "Nieuzasadniony silny opioid w łagodnym zapaleniu stawów." },
          { text: "Cyklofosfamid dożylnie", correct: false, feedback: "Cytostatyk stosowany jedynie w ciężkim kłębuszkowym zapaleniu nerek z półksiężycami (RPGN), nie w bólach stawowych." }
        ]
      },
      {
        num: 8,
        title: "Rokowanie i nawroty choroby",
        task: "Co przekażesz rodzicom na temat rokowania i ryzyka nawrotu plamicy Henocha-Schönleina?",
        options: [
          { text: "Rokowanie jest ogólnie bardzo dobre (samoistne ustąpienie u >95% dzieci), jednak u około 30% pacjentów mogą wystąpić rzuty nawrotowe plamicy (zwykle łagodniejsze) w ciągu pierwszych kilku miesięcy, najczęściej po kolejnych infekcjach wirusowych", correct: true, feedback: "Bardzo dobrze! Choroba ma charakter samoograniczający. U 1/3 dzieci dochodzi do 1–2 nawrotów wykwitów skórnych (zwykle po kolejnych infekcjach górnych dróg oddechowych), które zazwyczaj mają łagodniejszy i krótszy przebieg niż rzut pierwotny." },
          { text: "Choroba jest w 100% śmiertelna w ciągu roku", correct: false, feedback: "Absurdalne stwierdzenie niezgodne z prawdą." },
          { text: "Plamica nigdy w życiu nie może nawrócić", correct: false, feedback: "Nieprawda – nawroty występują u ok. 30% chorych." },
          { text: "Dziecko musi spędzić 5 lat w sanatorium", correct: false, feedback: "Brak wskazań." }
        ]
      }
    ],
    pathoNodes: [
      {
        title: "1. Nadprodukcja polimerycznej immunoglobuliny IgA1",
        desc: "Przebyta infekcja dróg oddechowych lub pokarmowych stymuluje wytwarzanie nieprawidłowo glikozylowanej IgA1 (galactose-deficient IgA1), która tworzy wielkocząsteczkowe krążące kompleksy immunologiczne z przeciwciałami IgG.",
        drugTarget: "Spontaniczne wygasanie odpowiedzi immunologicznej po eliminacji patogenu wyzwalającego"
      },
      {
        title: "2. Odkładanie kompleksów IgA w ścianie drobnych naczyń",
        desc: "Kompleksy odkładają się w postkapilarnych naczyniach żylnych skóry, krezki jelitowej i mezangium kłębuszków nerkowych, aktywując dopełniacz drogą alternatywną i rekrutując neutrofile (zapalenie leukocytoklastyczne).",
        drugTarget: "Glikokortykosteroidy (prednizon) w ciężkich bólach brzucha redukujące obrzęk ściany jelita"
      },
      {
        title: "3. Uszkodzenie ściany naczynia i wynaczynienie erytrocytów",
        desc: "Martwica włóknikowata i rozpad granulocytów prowadzą do wynaczynienia krwinek bez trombocytopenii, dając wyczuwalną plamicę, obrzęki stawów oraz krwinkomocz nerkowy.",
        drugTarget: "Okresowe monitorowanie badania ogólnego moczu i ciśnienia tętniczego przez min. 6 miesięcy"
      }
    ],
    dutySummary: "Zapalenie naczyń związane z IgA (plamica Henocha-Schönleina) to zapalenie drobnych naczyń z triadą: wyczuwalna uniesiona plamica (palpable purpura) na pośladkach i nogach przy PRAWIDŁOWEJ LICZBIE PŁYTEK, bóle brzucha oraz zapalenie stawów. Najgroźniejsze powikłanie ostre: wgłobienie jelita. O rokowaniu odległym decydują nerki (nefropatia IgA) – kontroluj mocz i ciśnienie przez min. 6 miesięcy! Sterydy NIE zapobiegają zajęciu nerek, ale leczą silne bóle brzucha.",
    diffTable: [
      { disease: "Idiopatyczna plamica małopłytkowa (ITP)", diff: "Wybroczyny i podbiegnięcia krwawe płaskie, niewyczuwalne dotykiem; liczba płytek krwi DRastycznie obniżona (<20–30 G/L); brak bólów brzucha i zapalenia stawów.", test: "Morfologia krwi obwodowej (liczba płytek krwi)." },
      { disease: "Posocznica meningokokowa (plamica piorunująca)", diff: "Dziecko w stanie ciężkim, wstrząs septyczny, gorączka 40°C, wykwity mają charakter martwiczy i szybko się powiększają; cechy DIC.", test: "Stan ogólny, prokalcytonina, układ krzepnięcia (DIC w meningokokach)." },
      { disease: "Ostre zapalenie wyrostka robaczkowego", diff: "Ostry ból w prawym dole biodrowym, ale brak wykwitów plamiczych na pośladkach i brak bólów stawów.", test: "Badanie fizykalne skóry (brak plamicy), USG jamy brzusznej." },
      { disease: "Obrzęk krwotoczny niemowląt (Finkelsteina)", diff: "Występuje u niemowląt <2 r.ż.; duże medalionowate wykwity tarczowate na twarzy i kończynach z obrzękiem rąk/stóp, brak zajęcia nerek.", test: "Wiek dziecka (<2 r.ż.), medalionowaty wygląd wykwitów na twarzy." }
    ],
    lekQuestions: [
      {
        question: "Wskaż cechę laboratoryjną, która pozwala na bezwzględne odróżnienie wykwitów w przebiegu plamicy Henocha-Schönleina (zapalenia naczyń związanego z IgA) od wybroczyn w przebiegu idiopatycznej plamicy małopłytkowej (ITP):",
        options: [
          "Prawidłowa liczba płytek krwi w plamicy Henocha-Schönleina wobec trombocytopenii w ITP.",
          "Głęboka niedokrwistość megaloblastyczna w plamicy Henocha-Schönleina.",
          "Wzrost stężenia fibrynogenu powyżej 10 g/L w ITP.",
          "Obecność przeciwciał anty-CCP w ITP.",
          "Wyraźne obniżenie stężenia białka C w plamicy Henocha-Schönleina."
        ],
        correct: 0,
        explanation: "Kluczowym elementem definicji i diagnostyki różnicowej zapalenia naczyń związanego z IgA (plamicy Henocha-Schönleina) jest PRAWIDŁOWA liczba płytek krwi (lub nadpłytkowość reaktywna). Wykwity plamicze są wyczuwalne palpacyjnie i wynikają z zapalenia ściany drobnych naczyń krwionośnych (leukocytoclastic vasculitis), a nie ze skazy płytkowej. W ITP występuje natomiast izolowana, często głęboka małopłytkowość."
      },
      {
        question: "Który narząd i jego powikłanie decyduje o ODLEGŁYM rokowaniu u dzieci z plamicą Henocha-Schönleina (IgAV)?",
        options: [
          "Stawy (ryzyko trwałego zesztywnienia).",
          "Nerki (ryzyko nefropatii z postępującą przewlekłą chorobą nerek).",
          "Śledziona (ryzyko hiposplenizmu).",
          "Wątroba (ryzyko marskości wątroby).",
          "Płuca (ryzyko zwłóknienia płuc)."
        ],
        correct: 1,
        explanation: "Zmiany skórne, stawowe i żołądkowo-jelitowe w przebiegu IgAV ustępują samoistnie i nie pozostawiają trwałych następstw (zapalenie stawów nie niszczy chrząstki). Jedynym narządem determinującym odległe rokowanie i przeżycie są nerki – u 30–50% dzieci rozwija się nefropatia IgA, która u części chorych może prowadzić do nadciśnienia tętniczego i przewlekłej niewydolności nerek."
      },
      {
        question: "Jakie jest najczęstsze ostre powikłanie chirurgiczne w obrębie jamy brzusznej występujące u dzieci z zapaleniem naczyń związanym z IgA (plamicą Henocha-Schönleina)?",
        options: [
          "Wgłobienie jelita (intussusceptio).",
          "Ostre zapalenie pęcherzyka żółciowego.",
          "Skręt żołądka.",
          "Pęknięcie śledziony.",
          "Martwica wątroby."
        ],
        correct: 0,
        explanation: "Obrzęk naczyniowy i krwawe wybroczyny w ścianie jelita cienkiego (szczególnie w jelicie krętym) stanowią punkt wyjścia (lead point) dla wgłobienia jelita (najczęściej krętniczo-krętniczego lub krętniczo-kątniczego). Jest to najczęstsze i najgroźniejsze powikłanie ostrej fazy brzusznej IgAV, wymagające pilnej diagnostyki USG."
      }
    ],
    flashcards: [
      { q: "Jakie jest obowiązkowe kryterium rozpoznania plamicy Henocha-Schönleina (IgAV)?", a: "Wyczuwalna dotykiem, uniesiona plamica (palpable purpura) na pośladkach i nogach przy PRAWIDŁOWEJ liczbie płytek krwi.", cat: "Pediatria" },
      { q: "Czym różni się plamica w IgAV od wybroczyn w ITP?", a: "W IgAV płytki krwi są w normie, a wykwity są uniesione z powodu zapalenia naczyń; w ITP płytki są skrajnie obniżone.", cat: "Pediatria" },
      { q: "Jakie jest najczęstsze ostre powikłanie brzuszne IgAV?", a: "Wgłobienie jelita (intussusceptio) wywołane obrzękiem i krwiakiem w ścianie jelita.", cat: "Pediatria" },
      { q: "Który narząd decyduje o odległym rokowaniu w IgAV?", a: "Nerki (nefropatia IgA – wymaga kontroli moczu i ciśnienia tętniczego przez min. 6 miesięcy).", cat: "Pediatria" },
      { q: "Czy glikokortykosteroidy zapobiegają zajęciu nerek w IgAV?", a: "NIE – sterydy łagodzą silne bóle brzucha i stawów, ale nie zapobiegają rozwojowi nefropatii.", cat: "Pediatria" }
    ]
  },

  // 124: Guz tylnego dołu czaszki (rdzeniak / gwiaździak)
  {
    id: 124,
    filename: "124_guz_tylnego_dolu_czaszki.json",
    dept: "Pediatria",
    shortTitle: "5-letnia dziewczynka – Poranne bóle głowy, chlustające wymioty i zaburzenia chodu (Guz tylnego dołu czaszki)",
    diagnosisTitle: "Guz tylnego dołu czaszki (Gwiaździak włosowatokomórkowy / Rdzeniak zarodkowy - Medulloblastoma) z ciasnotą wewnątrzczaszkową",
    vitals: [
      { label: "HR", val: "62/min", sub: "Względna bradykardia (wzrost ciśnienia śródczaszkowego)", status: "warn" },
      { label: "BP", val: "116/74 mmHg", sub: "Podwyższone ciśnienie dla wieku", status: "warn" },
      { label: "SpO2", val: "99%", sub: "Prawidłowa", status: "ok" },
      { label: "RR", val: "18/min", sub: "Prawidłowa", status: "ok" },
      { label: "Temp", val: "36.6°C", sub: "Prawidłowa", status: "ok" }
    ],
    vitalsObj: { hr: 62, bp: "116/74", spo2: 99, rr: 18, temp: 36.6 },
    story: "5-letnia dziewczynka została skierowana w trybie pilnym na oddział neurologii dziecięcej z powodu narastających od 6 tygodni bólów głowy. Matka podaje, że dziecko budzi się rano z płaczem skarżąc się na ból okolicy potylicznej i czołowej, po czym występują nagłe, chlustające wymioty przynoszące przejściową ulgę w bólu (początkowo podejrzewano 'nieżyt żołądkowy' lub 'alergię'). Od 2 tygodni rodzice zaobserwowali pogorszenie chodu: dziewczynka chodzi na szerokiej podstawie, potyka się, zatacza w lewą stronę i ma trudności ze schodzeniem po schodach. Zmienił się też charakter pisania i rysowania (drżenie rąk). W badaniu fizykalnym: dziecko blade, z tendencją do bradykardii (HR 62/min) i podwyższonym ciśnieniem tętniczym. W badaniu neurologicznym: ataksja móżdżkowa, chód na szerokiej podstawie (chód marynarski), dodatnia próba Romberga, dysmetria i intencyjne drżenie w próbie palec-nos po stronie lewej, poziomy oczopląs przy spojrzeniu w bok. W badaniu dna oka: obustronny obrzęk tarcz nerwów wzrokowych (tarcza zastoinowa / papilledema).",
    labs: [
      {
        category: "Badanie okulistyczne i objawy ciasnoty wewnątrzczaszkowej",
        items: [
          { name: "Badanie dna oka (oftalmoskopia)", val: "Obustronny zastój na dnie oka (tarcza zastoinowa / papilledema) z zatarciem granic tarcz n. II i wylewami krwawymi", norm: "Tarcze różowe, granice wyraźne", flag: "H" },
          { name: "Objawy zespołu Cushinga (wzrost ICP)", val: "Bradykardia (HR 62), nadciśnienie tętnicze, poranne chlustające wymioty", norm: "Brak", flag: "H" },
          { name: "Kwalifikacja do nakłucia lędźwiowego", val: "BEZWZGLĘDNIE PRZECIWWSKAZANE (ryzyko wgłobienia migdałków móżdżku do otworu wielkiego!)", norm: "Przeciwwskazane", flag: "H" }
        ]
      },
      {
        category: "Neuroobrazowanie CITO (Rezonans magnetyczny)",
        items: [
          { name: "Rezonans magnetyczny mózgowia (MR z kontrastem)", val: "Lito-torbielowaty guz lewej półkuli móżdżku i robaka (wymiary 4.2 x 3.8 cm) modelujący komorę IV i powodujący wodogłowie obturacyjne", norm: "Struktury mózgowia prawidłowe", flag: "H" },
          { name: "Układ komorowy", val: "Poszerzenie komór bocznych i komory III (wodogłowie trójkomorowe / hydrocephalus)", norm: "Układ komorowy symetryczny, nieposzerzony", flag: "H" },
          { name: "MR całego kanału kręgowego", val: "Wskazany w celu wykluczenia przerzutów 'kropelkowych' (drop metastases w rdzeniaku)", norm: "Kanał kręgowy wolny", flag: "N" }
        ]
      },
      {
        category: "Badania laboratoryjne ogólne",
        items: [
          { name: "Morfologia krwi / CRP", val: "Prawidłowe, brak cech ostrej infekcji", norm: "Prawidłowe", flag: "N" },
          { name: "Elektrolity (Sód / Potas)", val: "138 / 4.1 mmol/L", norm: "135–145 / 3.5–5.0", flag: "N" },
          { name: "Osmolarność osocza", val: "290 mOsm/kg H2O", norm: "275–295", flag: "N" }
        ]
      }
    ],
    steps: [
      {
        num: 1,
        title: "Identyfikacja objawów alarmowych guza mózgu u dziecka",
        task: "Triada objawów: poranne bóle głowy, poranne chlustające wymioty przynoszące ulgę oraz postępująca ataksja (zaburzenia chodu i równowagi) to klasyczny obraz:",
        options: [
          { text: "Wzrostu ciśnienia wewnątrzczaszkowego (ICP) w przebiegu guza tylnego dołu czaszki (infratentorial brain tumor)", correct: true, feedback: "Prawidłowo! U dzieci ponad 50–60% guzów OUN lokalizuje się w tylnym dole czaszki (podnamiotowo – móżdżek, komora IV, pień mózgu). Powodują one wczesną obturację przepływu PMR w komorze IV (wodogłowie obturacyjne), skutkując zespołem ciasnoty wewnątrzczaszkowej oraz objawami móżdżkowymi (ataksja, dysmetria)." },
          { text: "Nawracającego zapalenia ucha środkowego", correct: false, feedback: "Błąd! W zapaleniu ucha dominuje ból ucha (otalgia), gorączka i zmiany na błonie bębenkowej, brak tarczy zastoinowej na dnie oka." },
          { text: "Migreny dziecięcej bez aury", correct: false, feedback: "Błąd! Nowo powstały ból głowy budzący rano, chlustające wymioty i narastające deficyty neurologiczne (ataksja, obrzęk tarczy n. II) to bezwzględne objawy alarmowe ('czerwone flagi') guza OUN!" },
          { text: "Zespołu jelita drażliwego z nudnościami", correct: false, feedback: "Nonsens – nie tłumaczy objawów móżdżkowych i tarczy zastoinowej." }
        ]
      },
      {
        num: 2,
        title: "Badanie obrazowe z wyboru w diagnostyce guzów mózgu",
        task: "Które badanie neuroobrazowe jest ZŁOTYM STANDARDEM w diagnostyce guzów tylnego dołu czaszki u dzieci?",
        options: [
          { text: "Rezonans magnetyczny (MR) mózgowia z dożylnym środkiem cieniującym (oraz oceną rdzenia kręgowego)", correct: true, feedback: "Znakomicie! MR mózgowia z kontrastem jest metodą z wyboru ze względu na doskonałą rozdzielczość anatomiczną tylnego dołu czaszki (w TK kości podstawy czaszki dają artefakty utrudniające ocenę pnia i móżdżku). W przypadku podejrzenia rdzeniaka zarodkowego (medulloblastoma) konieczne jest badanie MR całego rdzenia kręgowego!" },
          { text: "RTG przeglądowe czaszki w projekcji AP i bocznej", correct: false, feedback: "RTG nie uwidacznia tkanki mózgowej ani guzów wewnątrzczaszkowych." },
          { text: "Badanie USG przezciemiączkowe u 5-letniego dziecka", correct: false, feedback: "U 5-latka ciemiączko przednie jest zarośnięte od ponad 3 lat!" },
          { text: "Pozytonowa tomografia emisyjna (PET) bez wcześniejszego MR", correct: false, feedback: "Badanie rezonansu magnetycznego jest badaniem pierwszorzędowym." }
        ]
      },
      {
        num: 3,
        title: "Kardynalny zakaz diagnostyczny: punkcja lędźwiowa",
        task: "Dlaczego u dziecka z podejrzeniem guza tylnego dołu czaszki i obrzękiem tarcz nerwów wzrokowych bezwzględnie PRZECIWWSKAZANE jest wykonywanie punkcji lędźwiowej?",
        options: [
          { text: "Gwałtowne obniżenie ciśnienia płynu mózgowo-rdzeniowego w kanale kręgowym wywoła natychmiastowe wklinowanie (wgłobienie) migdałków móżdżku do otworu wielkiego czaszki, ucisk na ośrodek oddechowy w pniu mózgu i natychmiastowy zgon!", correct: true, feedback: "Kluczowy zakaz na LEK i w praktyce klinicznej! Obecność ciasnoty podnamiotowej i tarczy zastoinowej jest bezwzględnym przeciwwskazaniem do nakłucia lędźwiowego. Usunięcie płynu z dołu tworzy gradient ciśnień, wpychający migdałki móżdżku w otwór wielki (tonsillar herniation) z natychmiastowym paraliżem pnia mózgu!" },
          { text: "Ponieważ igła punkcyjna może bezpośrednio przebić guz w móżdżku", correct: false, feedback: "Igłę wprowadza się w przestrzeni L3–L4/L4–L5, setki milimetrów od móżdżku." },
          { text: "Punkcja lędźwiowa u dzieci wywołuje natychmiastową ślepotę", correct: false, feedback: "Bzdura medyczna." },
          { text: "Płyn mózgowo-rdzeniowy w guzach zawsze niszczy igłę", correct: false, feedback: "Niedorzeczne." }
        ]
      },
      {
        num: 4,
        title: "Najczęstsze typy histopatologiczne guzów tylnego dołu czaszki",
        task: "Jakie są dwa najczęstsze nowotwory tylnego dołu czaszki u dzieci i czym różnią się pod względem złośliwości?",
        options: [
          { text: "1. Gwiaździak włosowatokomórkowy (Pilocytic astrocytoma, WHO G1 – łagodny, często torbielowaty z guzkiem przyściennym) oraz 2. Rdzeniak zarodkowy (Medulloblastoma, WHO G4 – wysoce złośliwy, lity, komórki drobnookrągłoniebieskie)", correct: true, feedback: "Dokładnie tak! Gwiaździak włosowatokomórkowy (Pilocytic astrocytoma) to łagodny glejak (I stopień WHO) dający >90% wyleczeń po całkowitej resekcji. Z kolei rdzeniak (Medulloblastoma) to złośliwy guz embrionalny (IV stopień WHO) wywodzący się z robaka móżdżku, wymagający resekcji, chemio- i radioterapii oraz monitorowania pod kątem przerzutów płynowych." },
          { text: "Oponiak i nerwiak nerwu słuchowego", correct: false, feedback: "To guzy typowe dla dorosłych (i NF2), nie najczęstsze u małych dzieci." },
          { text: "Glejak wielopostaciowy (Glioblastoma) i chłoniak pierwotny mózgu", correct: false, feedback: "Glioblastoma i PCNSL to guzy osób dorosłych i starszych." },
          { text: "Czaszkogardlak i gruczolak przysadki", correct: false, feedback: "Czaszkogardlak lokalizuje się nadsiodłowo (okolica skrzyżowania wzrokowego), nie w tylnym dole czaszki." }
        ]
      },
      {
        num: 5,
        title: "Pilne postępowanie farmakologiczne w ciasnocie wewnątrzczaszkowej",
        task: "Jakie leczenie farmakologiczne należy natychmiast wdrożyć w celu redukcji obrzęku naczyniopochodnego mózgu wokół guza w oczekiwaniu na zabieg neurochirurgiczny?",
        options: [
          { text: "Deksametazon dożylnie w wysokiej dawce oraz leczenie przeciwobrzękowe (np. 20% mannitol lub 3% NaCl przy objawach wgłobienia) z uniesieniem wezgłowia o 30°", correct: true, feedback: "Znakomicie! Deksametazon jest lekiem z wyboru w obrzęku naczyniopochodnym (vasogenic edema) towarzyszącym guzom OUN – uszczelnia barierę krew-mózg, przynosząc spektakularną poprawę kliniczną w ciągu kilku godzin. Przy ostrym wzroście ICP stosuje się leki hiperosmolarne." },
          { text: "Morfina w bolusie w celu sedacji", correct: false, feedback: "Opioidy mogą wywołać depresję oddechową, wzrost pCO2 i gwałtowne rozszerzenie naczyń mózgowych, co katastrofalnie podnosi ICP!" },
          { text: "Płyny hipotoniczne (np. 5% glukoza w czystej wodzie) w szybkim wlewie", correct: false, feedback: "Śmiertelny błąd! Płyny hipotoniczne gwałtownie nasilają obrzęk mózgu!" },
          { text: "Kwas acetylosalicylowy w dużych dawkach", correct: false, feedback: "Ryzyko krwawienia do guza i zespołu Reye'a." }
        ]
      },
      {
        num: 6,
        title: "Doraźne i definitywne leczenie neurochirurgiczne",
        task: "Dziewczynka ma ostre wodogłowie obturacyjne z poszerzeniem komór bocznych i komory III z powodu zablokowania wodociągu mózgu/komory IV. Jaki jest pierwszy etap interwencji chirurgicznej?",
        options: [
          { text: "Doraźny drenaż zewnętrzny komór mózgu (EVD) lub endoskopowa wentrykulostomia komory III (ETV) w celu odbarczenia wodogłowia, a następnie planowa operacja usunięcia guza", correct: true, feedback: "Bardzo dobrze! Odbarczenie ostrego wodogłowia (drenaż komorowy zewnętrzny EVD lub endoskopowa wentrykulostomia ETV) natychmiast ratuje życie przed wklinowaniem, po czym wykonuje się kraniotomię podpotyliczną i maksymalnie radykalną mikrochirurgiczną resekcję guza." },
          { text: "Natychmiastowa chemioterapia dożylna bez operacji", correct: false, feedback: "Wodogłowie obturacyjne wymaga pilnego odbarczenia mechanicznego." },
          { text: "Tylko założenie gipsu na kończyny dolne", correct: false, feedback: "Niedorzeczne." },
          { text: "Amputacja lewej półkuli móżdżku", correct: false, feedback: "Usuwa się sam guz z marginesem, nie wykonuje amputacji narządowej." }
        ]
      },
      {
        num: 7,
        title: "Siew płynowy (drop metastases) w rdzeniaku (Medulloblastoma)",
        task: "W badaniu histopatologicznym potwierdzono rdzeniaka zarodkowego (Medulloblastoma, WHO G4). Dlaczego guz ten wymaga badania MR całego kanału kręgowego i badania cytologicznego PMR po zabiegu?",
        options: [
          { text: "Medulloblastoma ma unikalną skłonność do rozsiewu drogą płynu mózgowo-rdzeniowego (tzw. przerzuty 'kropelkowe' w kanale kręgowym i komorach)", correct: true, feedback: "Świetnie! Rdzeniak (medulloblastoma) bardzo często rozsiewa się drogą krążenia PMR wzdłuż całego rdzenia kręgowego (tzw. drop metastases). Ocena stopnia rozsiewu (stadiowanie wg Changa: M0 do M4) decyduje o kwalifikacji do grupy standardowego lub wysokiego ryzyka i dawce radioterapii kranio-spinalnej (CSI)." },
          { text: "Rdzeniak zawsze daje przerzuty do kości piętowej", correct: false, feedback: "Przerzuty pozaneuronalne w rdzeniaku są rzadkością, typowy jest siew płynowy w OUN." },
          { text: "W celu wykluczenia gruźlicy kręgosłupa", correct: false, feedback: "Brak związku." },
          { text: "PMR w rdzeniaku służy do pomiaru stężenia glukozy", correct: false, feedback: "Ocenia się obecność komórek nowotworowych (cytologia PMR)." }
        ]
      },
      {
        num: 8,
        title: "Ograniczenia wiekowe w radioterapii OUN",
        task: "Dlaczego u dzieci poniżej 3. roku życia z rozpoznaniem guza mózgu unika się radioterapii całego OUN?",
        options: [
          { text: "Radioterapia u dzieci <3. r.ż. wywołuje katastrofalne, nieodwracalne uszkodzenie rozwijającego się mózgu (głębokie upośledzenie umysłowe, zaburzenia endokrynologiczne i naczyniowe); stosuje się chemioterapię wysokodawkową", correct: true, feedback: "Znakomicie! Rozwijający się mózg małego dziecka (<3 r.ż.) jest wybitnie wrażliwy na popromienne uszkodzenie mieliny i mikrokrążenia. U najmłodszych dzieci napromienianie OUN odracza się za pomocą intensywnej chemioterapii, aby chronić funkcje poznawcze." },
          { text: "Ponieważ promieniowanie nie przenika przez kości czaszki u małych dzieci", correct: false, feedback: "Nieprawda – kości niemowląt są cieńsze i promieniowanie przenika łatwiej." },
          { text: "Dzieci <3 r.ż. nie chorują na guzy mózgu", correct: false, feedback: "Błąd – guzy OUN występują również u niemowląt." },
          { text: "Radioterapia jest przeciwwskazana tylko u dziewczynek", correct: false, feedback: "Brak zróżnicowania płciowego w toksyczności radioterapii." }
        ]
      }
    ],
    pathoNodes: [
      {
        title: "1. Rozrost guza w ciasnej przestrzeni tylnego dołu czaszki",
        desc: "Móżdżek i pień mózgu ograniczone są sztywnym namiotem móżdżku i kośćmi potylicy. Wzrost guza uciska jądra móżdżku (ataksja, dysmetria) oraz jądra nerwów czaszkowych.",
        drugTarget: "Zabieg operacyjny: mikrochirurgiczna resekcja guza pod kontrolą neuronawigacji i neuromonitoringu"
      },
      {
        title: "2. Obturacja komory IV i wodogłowie zaporowe",
        desc: "Ucisk na komorę IV blokuje odpływ PMR do przestrzeni podtwardówkowej, powodując poszerzenie komór bocznych i gwałtowny wzrost ciśnienia wewnątrzczaszkowego (poranne bóle, wymioty, bradykardia).",
        drugTarget: "Zewnętrzny drenaż komorowy (EVD) lub wentrykulostomia komory III (ETV) oraz deksametazon i.v."
      },
      {
        title: "3. Zagrożenie wgłobieniem migdałków móżdżku",
        desc: "Wysoki gradient ciśnień spycha migdałki móżdżku do otworu wielkiego (foramen magnum), uciskając rdzeń przedłużony (ośrodek krążenia i oddychania – triada Cushinga i nagły zgon).",
        drugTarget: "BEZWZGLĘDNY ZAKAZ PUNKCJI LĘDŹWIOWEJ! Leki osmotyczne (mannitol, 3% NaCl) w fazie ostrej"
      }
    ],
    dutySummary: "Guzy tylnego dołu czaszki u dzieci (Gwiaździak włosowatokomórkowy WHO G1, Rdzeniak WHO G4) objawiają się porannymi bólami głowy, porannymi chlustającymi wymiotami, ataksją i tarczą zastoinową na dnie oka. Badaniem z wyboru jest MR mózgowia z kontrastem. PAMIĘTAJ: PUNKCJA LĘDŹWIOWA JEST BEZWZGLĘDNIE PRZECIWWSKAZANA (ryzyko śmiertelnego wklinowania migdałków móżdżku!). Doraźnie: deksametazon i odbarczenie wodogłowia (EVD/ETV).",
    diffTable: [
      { disease: "Migrena dziecięca", diff: "Ból napadowy, pulsujący, światłowstręt, nudności; dno oka w 100% prawidłowe, brak ataksji móżdżkowej, brak progresji objawów między napadami.", test: "Badanie dna oka (brak obrzęku tarczy n. II), badanie MR głowy." },
      { disease: "Ostre poinfekcyjne zapalenie móżdżku (cerebellitis)", diff: "Nagła ataksja u małego dziecka w trakcie lub po ospie wietrznej; brak ciasnoty wewnątrzczaszkowej, dno oka prawidłowe, samoistne ustąpienie w 2-4 tyg.", test: "Wywiad (przebyta ospa), brak guza i wodogłowia w MR." },
      { disease: "Guz nadnamiotowy (np. wyściółczak, glejak wielopostaciowy)", diff: "Częściej objawia się napadami padaczkowymi ogniskowymi, niedowładem połowiczym lub zaburzeniami zachowania, rzadziej wczesnym wodogłowiem.", test: "Lokalizacja w badaniu MR mózgu (nad- vs podnamiotowa)." },
      { disease: "Wodogłowie wrodzone (zwężenie wodociągu Sylwiusza)", diff: "Ujawnia się u niemowląt powiększeniem obwodu głowy, objawem zachodzącego słońca i tętnieniem ciemiączka, bez guza w tkance móżdżku.", test: "MR mózgu (brak masy guzowej)." }
    ],
    lekQuestions: [
      {
        question: "U 5-letniego dziecka występują poranne bóle głowy, chlustające wymioty oraz postępujące zaburzenia równowagi i chód na szerokiej podstawie. W badaniu dna oka stwierdzono obustronną tarczę zastoinową. Które z poniższych badań jest BEZWZGLĘDNIE PRZECIWWSKAZANE?",
        options: [
          "Rezonans magnetyczny mózgowia z kontrastem.",
          "Punkcja lędźwiowa z pobraniem płynu mózgowo-rdzeniowego.",
          "Badanie pola widzenia.",
          "Tomografia komputerowa głowy bez kontrastu.",
          "Oznaczenie stężenia elektrolitów w surowicy krwi."
        ],
        correct: 1,
        explanation: "U pacjenta z objawami guza tylnego dołu czaszki, ciasnotą wewnątrzczaszkową i obecnością tarczy zastoinowej na dnie oka (obrzękiem tarczy nerwu wzrokowego) wykonanie punkcji lędźwiowej jest BEZWZGLĘDNIE PRZECIWWSKAZANE. Pobranie płynu mózgowo-rdzeniowego z przestrzeni lędźwiowej wytwarza gradient ciśnień i grozi natychmiastowym wklinowaniem (wgłobieniem) migdałków móżdżku do otworu wielkiego czaszki, uciskiem na pień mózgu i zgonem."
      },
      {
        question: "Wskaż najczęstszy nowotwór złośliwy (WHO G4) tylnego dołu czaszki u dzieci, charakteryzujący się skłonnością do rozsiewu drogą płynu mózgowo-rdzeniowego wzdłuż całego kanału kręgowego:",
        options: [
          "Rdzeniak zarodkowy (Medulloblastoma).",
          "Oponiak meningotelialny.",
          "Czaszkogardlak (Craniopharyngioma).",
          "Nerwiak osłonkowy (Schwannoma).",
          "Gruczolak prolaktynowy przysadki."
        ],
        correct: 0,
        explanation: "Rdzeniak zarodkowy (Medulloblastoma) to złośliwy nowotwór embrionalny (stopień IV wg WHO), stanowiący najczęstszy złośliwy guz mózgu u dzieci. Wywodzi się z robaka móżdżku i charakteryzuje się unikalną skłonnością do tzw. przerzutów kropelkowych drogą krążenia płynu mózgowo-rdzeniowego wzdłuż kanału kręgowego i komór mózgu."
      },
      {
        question: "Który lek jest lekiem z wyboru w celu szybkiej redukcji obrzęku naczyniopochodnego mózgu wokół guza wewnątrzczaszkowego u dziecka w oczekiwaniu na zabieg neurochirurgiczny?",
        options: [
          "Deksametazon.",
          "Fenytoina.",
          "Kwas acetylosalicylowy.",
          "Hydrochlorotiazyd.",
          "Cyklosporyna A."
        ],
        correct: 0,
        explanation: "Deksametazon (glikokortykosteroid o silnym działaniu przeciwzapalnym i zerowym działaniu mineralokortykoidowym) jest lekiem z wyboru w leczeniu obrzęku naczyniopochodnego mózgu w przebiegu guzów OUN. Poprzez stabilizację bariery krew-mózg i redukcję przepuszczalności naczyń skutecznie obniża ciśnienie wewnątrzczaszkowe i łagodzi objawy ciasnoty."
      }
    ],
    flashcards: [
      { q: "Jaka triada objawów wskazuje na guza tylnego dołu czaszki u dziecka?", a: "Poranne bóle głowy, poranne chlustające wymioty przynoszące ulgę oraz ataksja móżdżkowa (chód na szerokiej podstawie).", cat: "Pediatria" },
      { q: "Dlaczego punkcja lędźwiowa jest przeciwwskazana przy tarczy zastoinowej w guzie mózgu?", a: "Grozi natychmiastowym wgłobieniem (wklinowaniem) migdałków móżdżku do otworu wielkiego czaszki i zgonem.", cat: "Pediatria" },
      { q: "Jakie jest badanie obrazowe z wyboru w guzach tylnego dołu czaszki u dzieci?", a: "Rezonans magnetyczny (MR) mózgowia z kontrastem (oraz oceną rdzenia kręgowego).", cat: "Pediatria" },
      { q: "Jaki jest najczęstszy łagodny i najczęstszy złośliwy guz móżdżku u dzieci?", a: "Łagodny: Gwiaździak włosowatokomórkowy (WHO G1); Złośliwy: Rdzeniak zarodkowy (Medulloblastoma, WHO G4).", cat: "Pediatria" },
      { q: "Jaki lek redukuje obrzęk naczyniopochodny mózgu wokół guza?", a: "Deksametazon dożylnie w wysokiej dawce.", cat: "Pediatria" }
    ]
  },

  // 125: Choroba Kawasakiego
  {
    id: 125,
    filename: "125_choroba_kawasakiego.json",
    dept: "Pediatria",
    shortTitle: "3-letni chłopiec – Gorączka trwająca 6 dni, przekrwione spojówki, malinowy język i obrzęki rąk (Choroba Kawasakiego)",
    diagnosisTitle: "Choroba Kawasakiego (Kawasaki Disease / Zespół węzłowo-śluzówkowo-skórny) z ryzykiem tętniaków tętnic wieńcowych",
    vitals: [
      { label: "HR", val: "148/min", sub: "Tachykardia nieproporcjonalna do gorączki", status: "warn" },
      { label: "BP", val: "94/56 mmHg", sub: "Prawidłowe", status: "ok" },
      { label: "SpO2", val: "98%", sub: "Prawidłowa", status: "ok" },
      { label: "RR", val: "28/min", sub: "Przyspieszony", status: "warn" },
      { label: "Temp", val: "39.6°C", sub: "Wysoka gorączka trwająca 6. dobę", status: "bad" }
    ],
    vitalsObj: { hr: 148, bp: "94/56", spo2: 98, rr: 28, temp: 39.6 },
    story: "3-letni chłopiec został przyjęty do oddziału pediatrycznego z powodu wysokiej gorączki do 39.8°C utrzymującej się nieprzerwanie od 6 dni, całkowicie opornej na antybiotykoterapię doustną (amoksycylina z kwasem klawulanowym zlecona przed 4 dniami przez lekarza POZ) oraz na leki przeciwgorączkowe. Dziecko jest skrajnie rozdrażnione i płaczliwe. W badaniu fizykalnym: obustronne, bezwysiękowe przekrwienie spojówek z oszczędzeniem rąbka rogówki. Wargi suche, spierzchnięte, popękane i krwawiące; błona śluzowa jamy ustnej żywoczerwona, język malinowy z wybitnie przerośniętymi brodawkami. Na tułowiu i w okolicy krocza obecna polimorficzna osutka rumieniowa. Dłonie i stopy są obrzęknięte, ciastowate, z rumieniem powierzchni dłoniowej i podeszwowej. W okolicy podżuchwowej lewej wyczuwalny pojedynczy, bolesny węzeł chłonny o średnicy 2.2 cm. Skrajna drażliwość dziecka przy próbie badania.",
    labs: [
      {
        category: "Wskaźniki ostrej fazy i morfologia krwi",
        items: [
          { name: "Płytki krwi (PLT)", val: "580 G/L (trombocytoza reaktywna w 2. tyg. choroby)", norm: "150–450 G/L", flag: "H" },
          { name: "Leukocyty (WBC)", val: "18.8 G/L z neutrofilią (76%)", norm: "5.5–15.5 G/L", flag: "H" },
          { name: "CRP", val: "142 mg/L (bardzo wysokie)", norm: "< 5.0 mg/L", flag: "H" },
          { name: "Odczyn Biernackiego (OB)", val: "88 mm/h", norm: "< 15 mm/h", flag: "H" },
          { name: "Hemoglobina (Hb)", val: "10.2 g/dL (niedokrwistość normocytarna)", norm: "11.5–14.5 g/dL", flag: "L" }
        ]
      },
      {
        category: "Badanie moczu i enzymy wątrobowe",
        items: [
          { name: "Badanie ogólne moczu", val: "Leukocyturia jałowa (15–20 leukocytów wpw, posiew jałowy)", norm: "0–5 wpw, posiew jałowy", flag: "H" },
          { name: "AlAT / AspAT", val: "94 / 82 IU/L (umiarkowane zapalenie wątroby)", norm: "< 40 / < 35 IU/L", flag: "H" },
          { name: "Albumina surowicy", val: "29 g/L (hipoalbuminemia ostrej fazy)", norm: "38–54 g/L", flag: "L" }
        ]
      },
      {
        category: "Echokardiografia przezklatkowa (ECHO serca CITO)",
        items: [
          { name: "Echo serca - tętnice wieńcowe", val: "Ektazja (poszerzenie) pnia lewej tętnicy wieńcowej (LCA Z-score +2.8) oraz prawej tętnicy wieńcowej (RCA Z-score +2.6), bez uformowanych tętniaków olbrzymich", norm: "Z-score < +2.0", flag: "H" },
          { name: "Płyn w osierdziu", val: "Śladowa ilość płynu w worku osierdziowym (2 mm)", norm: "Brak", flag: "H" },
          { name: "Frakcja wyrzutowa lewej komory (EF)", val: "62% (prawidłowa kurczliwość)", norm: "> 60%", flag: "N" }
        ]
      }
    ],
    steps: [
      {
        num: 1,
        title: "Kryteria diagnostyczne klasycznej choroby Kawasakiego",
        task: "Gorączka trwająca >= 5 dni oporna na antybiotyki oraz spełnienie ilu z 5 głównych kryteriów klinicznych jest wymagane do rozpoznania klasycznej choroby Kawasakiego?",
        options: [
          { text: "Co najmniej 4 z 5 kryteriów klinicznych (spojówki, usta/język, dłonie/stopy, wysypka, węzeł szyjny >1.5 cm)", correct: true, feedback: "Prawidłowo! Kryteria AHA/PTK: Gorączka trwająca >= 5 dni PLUS co najmniej 4 z 5 cech: 1. Obustronne bezwysiękowe przekrwienie spojówek, 2. Zmiany na wargach i w jamie ustnej (malinowy język, spierzchnięte wargi), 3. Zmiany obwodowe na kończynach (rumień/obrzęk dłoni i stóp, późniejsze łuszczenie), 4. Polimorficzna wysypka, 5. Ostra niekrwiotoczna limfadenopatia szyjna (zwykle jednostronna, >= 1.5 cm)." },
          { text: "Wystarczy sama obecność kataru i kaszlu", correct: false, feedback: "Błąd! Katar i kaszel przemawiają przeciwko chorobie Kawasakiego." },
          { text: "Wymagana jest obecność tętniaka aorty w TK", correct: false, feedback: "Błąd – tętniaki wieńcowe są powikłaniem, a nie kryterium wstępnym rozpoznania." },
          { text: "Wymagane jest potwierdzenie dodatnim posiewem krwi", correct: false, feedback: "Choroba Kawasakiego nie ma uchwytnego patogenu bakteryjnego w posiewach krwi." }
        ]
      },
      {
        num: 2,
        title: "Najgroźniejsze powikłanie choroby Kawasakiego",
        task: "Co jest najgroźniejszym powikłaniem nieleczonej choroby Kawasakiego, odpowiadającym za odległą zachorowalność i zgon u dzieci?",
        options: [
          { text: "Tętniaki tętnic wieńcowych (Coronary Artery Aneurysms - CAA) grożące zakrzepicą, zawałem mięśnia sercowego i nagłym zgonem sercowym", correct: true, feedback: "Kluczowy punkt LEK! U 20–25% nieleczonych dzieci dochodzi do zapalenia tętnic wieńcowych i wytworzenia tętniaków (w tym tętniaków olbrzymich >8 mm). Wczesne podanie immunoglobulin obniża to ryzyko poniżej 3–5%!" },
          { text: "Marskość wątroby z nadciśnieniem wrotnym", correct: false, feedback: "Choroba Kawasakiego nie prowadzi do marskości wątroby." },
          { text: "Ostra niewydolność nerek wymagająca dializ", correct: false, feedback: "Rzadkie powikłanie, nerkowe zmiany ograniczają się zwykle do jałowej leukocyturii." },
          { text: "Wiotkie porażenie kończyn dolnych", correct: false, feedback: "Brak związku." }
        ]
      },
      {
        num: 3,
        title: "Leczenie pierwszego rzutu i optymalne 'okno terapeutyczne'",
        task: "Jakie jest leczenie z wyboru w ostrej fazie choroby Kawasakiego i w jakim czasie od początku gorączki należy je podać?",
        options: [
          { text: "Dożylne immunoglobuliny (IVIG) w pojedynczym wlewie w dawce 2 g/kg mc. ORAZ kwas acetylosalicylowy (ASA), najlepiej wdrożone PRZED 10. DNIEM choroby", correct: true, feedback: "Dokładnie tak! Standard AHA/PTK: IVIG w pojedynczym wlewie 2 g/kg mc. (przez 10–12 h) w skojarzeniu z kwasem acetylosalicylowym (ASA). Podanie IVIG przed 10. dobą choroby maksymalnie chroni tętnice wieńcowe przed rozwojem tętniaków!" },
          { text: "Amoksycylina z kwasem klawulanowym dożylnie przez 21 dni", correct: false, feedback: "Antybiotyki są całkowicie nieskuteczne w chorobie Kawasakiego." },
          { text: "Cyklofosfamid z metotreksatem", correct: false, feedback: "To nie są leki pierwszego rzutu." },
          { text: "Wyłącznie paracetamol doustnie", correct: false, feedback: "Paracetamol nie chroni naczyń wieńcowych przed tętniakami!" }
        ]
      },
      {
        num: 4,
        title: "Kwas acetylosalicylowy (ASA) – unikalny wyjątek pediatryczny",
        task: "Choroba Kawasakiego jest jednym z nielicznych wskazań w pediatrii do stosowania kwasu acetylosalicylowego (aspiryny). Jakie jest dawkowanie ASA w fazie ostrej vs fazie podostrej?",
        options: [
          { text: "W fazie ostrej dawka przeciwzapalna (30–50 mg/kg mc./dobę, w USA do 80–100 mg/kg/d), a po ustąpieniu gorączki mała dawka przeciwpłytkowa (3–5 mg/kg mc./dobę raz dziennie przez 6–8 tygodni)", correct: true, feedback: "Znakomicie! W fazie ostrej ASA działa silnie przeciwzapalnie. Po ustąpieniu gorączki (od 48h bez gorączki) przechodzi się na małą dawkę antyagregacyjną (3–5 mg/kg mc./d), którą utrzymuje się przez 6–8 tygodni do czasu kontrolnego echa serca (lub dożywotnio, jeśli powstały tętniaki wieńcowe)." },
          { text: "ASA stosuje się wyłącznie w bolusie dożylnym 5 gramów", correct: false, feedback: "Błąd śmiertelny." },
          { text: "ASA odstawia się natychmiast po 2 godzinach", correct: false, feedback: "Zbyt wczesne odstawienie grozi zakrzepicą wieńcową w okresie trombocytozy." },
          { text: "Aspirynę podaje się wziewnie przez nebulizator", correct: false, feedback: "Brak takiego preparatu." }
        ]
      },
      {
        num: 5,
        title: "Postępowanie w oporności na IVIG (Kawasaki oporny)",
        task: "U 10–15% dzieci gorączka utrzymuje się lub nawraca po 36 godzinach od zakończenia wlewu 2 g/kg IVIG. Jakie jest postępowanie w chorobie Kawasakiego opornej na IVIG?",
        options: [
          { text: "Podanie drugiego wlewu IVIG (2 g/kg mc.) lub włączenie pulsów metyloprednizolonu dożylnie (ewentualnie infliksymabu – anty-TNF)", correct: true, feedback: "Doskonale! Przy braku odpowiedzi na pierwszy wlew IVIG zaleca się powtórzenie wlewu IVIG 2 g/kg mc. lub dołączenie glikokortykosteroidów (metyloprednizolon w pulsach 30 mg/kg/d przez 3 dni) albo przeciwciała anty-TNF-alfa (infliksymab)." },
          { text: "Zaniechanie leczenia i wypisanie do domu", correct: false, feedback: "Kardynalne zagrożenie pęknięciem tętniaka wieńcowego!" },
          { text: "Podanie dożylne wankomycyny w monoterapii", correct: false, feedback: "Antybiotyki nie leczą zapalenia naczyń." },
          { text: "Pilna transplantacja serca u każdego opornego pacjenta", correct: false, feedback: "Absurdalnie inwazyjne podejście na tym etapie." }
        ]
      },
      {
        num: 6,
        title: "Charakterystyczne łuszczenie naskórka w fazie podostrej",
        task: "W 2.–3. tygodniu choroby, gdy gorączka już ustąpiła, pojawia się charakterystyczny objaw skórny. Czym się charakteryzuje?",
        options: [
          { text: "Grubopłatowe, okołopaznokciowe łuszczenie się naskórka rozpoczynające się wokół płytek paznokciowych palców rąk i stóp, przechodzące na dłonie i podeszwy", correct: true, feedback: "Świetnie! Okołopaznokciowe łuszczenie naskórka (periungual desquamation) rozpoczynające się pod wolnym brzegiem paznokci w 2.–3. tygodniu choroby jest wysoce swoistą cechą fazy rekonwalescencji choroby Kawasakiego." },
          { text: "Pęcherze z miodowożółtymi strupami na twarzy", correct: false, feedback: "To objaw liszajca zakaźnego." },
          { text: "Martwica czerniakowa opuszek palców", correct: false, feedback: "Bzdura medyczna." },
          { text: "Całkowity brak jakichkolwiek zmian na skórze", correct: false, feedback: "Nieprawda – łuszczenie okołopaznokciowe występuje u niemal wszystkich chorych." }
        ]
      },
      {
        num: 7,
        title: "Wyjątkowa cecha w badaniu moczu: leukocyturia jałowa",
        task: "W badaniu moczu u dziecka stwierdzono 20 leukocytów wpw, jednak posiew moczu jest całkowicie jałowy. Z czego wynika ten objaw?",
        options: [
          { text: "Z jałowego zapalenia cewki moczowej (sterile urethritis) w przebiegu uogólnionego zapalenia naczyń", correct: true, feedback: "Bardzo dobrze! Leukocyturia jałowa jest częstym, charakterystycznym objawem dodatkowym choroby Kawasakiego, wynikającym z odczynu zapalnego w dystalnej cewce moczowej. Nie świadczy o bakteryjnym ZUM." },
          { text: "Z zakażenia prątkiem gruźlicy nerek", correct: false, feedback: "Gruźlica dróg moczowych jest kazuistyką u 3-latka z ostrym zapaleniem naczyń." },
          { text: "Z błędu pobrania moczu", correct: false, feedback: "To stały element zespołu Kawasakiego." },
          { text: "Z obecności kamicy moczowodowej", correct: false, feedback: "Brak związku." }
        ]
      },
      {
        num: 8,
        title: "Dalszy nadzór kardiologiczny i szczepienia",
        task: "Jakie zalecenia dotyczące szczepień ochronnych należy przekazać po podaniu wysokiej dawki immunoglobulin (IVIG 2 g/kg mc.)?",
        options: [
          { text: "Szczepienia żywymi wirusami (MMR, ospa wietrzna) należy ODROCZYĆ o minimum 11 miesięcy z powodu neutralizacji wirusów szczepionkowych przez podane przeciwciała", correct: true, feedback: "Znakomicie! Podanie wysokich dawek IVIG dostarcza ogromną ilość obcych przeciwciał neutralizujących, które blokują namnażanie się żywych atenuowanych szczepionek (MMR, ospa wietrzna), czyniąc szczepienie nieskutecznym. Należy odczekać 11 miesięcy przed podaniem MMR!" },
          { text: "Dziecko należy zaszczepić MMR w dniu wypisu", correct: false, feedback: "Szczepionka zostanie natychmiast zneutralizowana przez IVIG i nie wytworzy się odporność." },
          { text: "Obowiązuje całkowity dożywotni zakaz szczepień", correct: false, feedback: "Nieprawda – odroczenie dotyczy szczepionek żywych na 11 miesięcy." },
          { text: "Szczepionki inaktywowane są zakazane przez 5 lat", correct: false, feedback: "Szczepionki inaktywowane (zabite, np. przeciw grypie) można podawać normalnie." }
        ]
      }
    ],
    pathoNodes: [
      {
        title: "1. Niekontrolowana aktywacja immunologiczna i cytokiny",
        desc: "Nieznany antygen (prawdopodobnie wnikający przez drogi oddechowe) wyzwala u predysponowanych genetycznie dzieci masywną aktywację limfocytów T i makrofagów, prowadząc do burzy cytokinowej (TNF-alfa, IL-1, IL-6).",
        drugTarget: "Dożylne immunoglobuliny (IVIG 2 g/kg mc.) neutralizujące antygeny i hamujące receptory Fc makrofagów"
      },
      {
        title: "2. Zapalenie ścian tętnic średniego kalibru (zapalenie naczyń)",
        desc: "Naciek limfocytarno-monocytarny niszczy błonę sprężystą wewnętrzną i środkową tętnic mięśniowych (szczególnie tętnic wieńcowych), powodując osłabienie ściany i tętniakowate poszerzenie naczyń.",
        drugTarget: "Kwas acetylosalicylowy (ASA) – dawka przeciwzapalna w ostrej fazie, przeciwpłytkowa w podostrej"
      },
      {
        title: "3. Trombocytoza reaktywna i ryzyko zakrzepicy wieńcowej",
        desc: "W 2.–3. tygodniu dochodzi do gwałtownego wyrzutu trombopoetyny i skoku płytek krwi (>500–1000 G/L). Zwolniony, turbulentny przepływ w tętniakach w połączeniu z nadpłytkowością stwarza ryzyko zakrzepicy i zawału serca.",
        drugTarget: "Małe dawki ASA (3–5 mg/kg/d) przez min. 6–8 tygodni oraz stały nadzór echokardiograficzny"
      }
    ],
    dutySummary: "Choroba Kawasakiego to zapalenie tętnic średniego kalibru (zwłaszcza wieńcowych). Rozpoznanie: gorączka >= 5 dni + min. 4 z 5 cech (spojówki bez ropy, malinowy język/spierzchnięte wargi, obrzęk/rumień dłoni i stóp, polimorficzna wysypka, węzeł szyjny >1.5 cm). Złoty standard leczenia: IVIG 2 g/kg mc. w jednym wlewie + kwas acetylosalicylowy PRZED 10. DNIEM CHOROBY (redukcja tętniaków wieńcowych z 25% do <3%). Po IVIG odrocz szczepienia żywe (MMR) o 11 miesięcy!",
    diffTable: [
      { disease: "Płonica (szkarlatyna)", diff: "Etiologia paciorkowcowa (GAS); wysięk ropny na migdałkach, brak zapalenia spojówek, szybka reakcja na penicylinę w 24h, dodatni szybki test Strep-A.", test: "Szybki test Strep-A, brak zapalenia spojówek, ustąpienie gorączki po penicylinie." },
      { disease: "Odra (morbilli)", diff: "Wysiękowe zapalenie spojówek z silnym światłowstrętem, kaszel, katar, plamki Koplika na policzkach, wysypka zstępująca od twarzy.", test: "Plamki Koplika w jamie ustnej, kaszel i katar w wywiadzie." },
      { disease: "Młodzieńcze idiopatyczne zapalenie stawów (postać uogólniona - sJIA)", diff: "Gorączka hektyczna (1–2 skoki dziennie), ulotna wysypka łososiowa w trakcie gorączki, zapalenie wielu stawów trwające >6 tygodni.", test: "Charakter gorączki (hektyczna), czas trwania >6 tyg." },
      { disease: "PIMS-TS / MIS-C (zespół pocovidowy)", diff: "Występuje 2–6 tyg. po zakażeniu SARS-CoV-2; wstrząs kardiogenny z głęboką dysfunkcją lewej komory (spadek EF), ból brzucha, skrajnie wysoka troponina i NT-proBNP.", test: "Przeciwciała anty-SARS-CoV-2, troponina, NT-proBNP, obniżona frakcja wyrzutowa EF." }
    ],
    lekQuestions: [
      {
        question: "3-letni chłopiec gorączkuje od 6 dni do 39.5°C. W badaniu fizykalnym stwierdzono: obustronne bezwysiękowe przekrwienie spojówek, popękane krwawiące wargi, malinowy język, obrzęk i rumień dłoni i stóp, polimorficzną wysypkę na tułowiu oraz powiększony pojedynczy węzeł chłonny szyjny o średnicy 2 cm. Wskaż leczenie z wyboru w celu zapobieżenia tętniakom tętnic wieńcowych:",
        options: [
          "Dożylne immunoglobuliny (IVIG) w pojedynczym wlewie w dawce 2 g/kg mc. w skojarzeniu z kwasem acetylosalicylowym.",
          "Ceftriakson dożylnie przez 14 dni.",
          "Gancyklowir w powolnym wlewie dożylnym.",
          "Prednizon doustnie w monoterapii przez 5 dni.",
          "Plazmafereza z wymianą osocza."
        ],
        correct: 0,
        explanation: "Opisany obraz kliniczny spełnia pełne kryteria klasycznej choroby Kawasakiego (gorączka >= 5 dni oraz 5 z 5 kryteriów klinicznych). Leczeniem z wyboru w ostrej fazie, które zmniejsza ryzyko rozwoju tętniaków tętnic wieńcowych z 20–25% do poniżej 3–5%, jest podanie dożylnych immunoglobulin (IVIG) w pojedynczym wlewie w dawce 2 g/kg mc. w skojarzeniu z doustnym kwasem acetylosalicylowym (ASA), optymalnie przed ukończeniem 10. doby choroby."
      },
      {
        question: "Wskaż najgroźniejsze powikłanie nieleczonej choroby Kawasakiego:",
        options: [
          "Tętniaki tętnic wieńcowych.",
          "Ostra niewydolność wątroby.",
          "Pęknięcie śledziony.",
          "Wrzodziejące zapalenie jelita grubego.",
          "Zapalenie opon mózgowo-rdzeniowych o etiologii pneumokokowej."
        ],
        correct: 0,
        explanation: "Najgroźniejszym powikłaniem choroby Kawasakiego jest zapalenie naczyń wieńcowych prowadzące do powstawania tętniaków tętnic wieńcowych (u ok. 20–25% nieleczonych dzieci). Tętniaki mogą ulec zakrzepicy, powodując zawał mięśnia sercowego lub nagły zgon sercowy u małych dzieci."
      },
      {
        question: "U dziecka z chorobą Kawasakiego zastosowano leczenie dożylnymi immunoglobulinami w dawce 2 g/kg mc. Zgodnie z wytycznymi, planowe szczepienie przeciwko odrze, śwince i różyczce (MMR) należy odroczyć o:",
        options: [
          "2 tygodnie.",
          "6 tygodni.",
          "3 miesiące.",
          "11 miesięcy.",
          "Szczepienie nie wymaga odroczenia."
        ],
        correct: 3,
        explanation: "Podanie wysokiej dawki dożylnych immunoglobulin (IVIG 2 g/kg mc.) wprowadza do ustroju wysokie stężenia przeciwciał neutralizujących przeciwko wirusom odry, świnki i różyczki. Przeciwciała te hamują replikację żywego wirusa szczepionkowego, uniemożliwiając wykształcenie odporności poszczepiennej. Zgodnie z zaleceniami ACIP/AAP, szczepienia żywymi wirusami (MMR, ospa wietrzna) należy odroczyć o 11 miesięcy od podania dawki 2 g/kg IVIG."
      }
    ],
    flashcards: [
      { q: "Jakie są kryteria diagnostyczne choroby Kawasakiego?", a: "Gorączka trwająca >= 5 dni oraz co najmniej 4 z 5 cech: przekrwienie spojówek bez ropy, malinowy język/wargi, obrzęki/rumień dłoni i stóp, polimorficzna wysypka, węzeł szyjny >1.5 cm.", cat: "Pediatria" },
      { q: "Jakie jest leczenie pierwszego rzutu w chorobie Kawasakiego?", a: "Dożylne immunoglobuliny (IVIG 2 g/kg mc. w pojedynczym wlewie) ORAZ kwas acetylosalicylowy (ASA) przed 10. dniem choroby.", cat: "Pediatria" },
      { q: "Dlaczego wczesne podanie IVIG w chorobie Kawasakiego jest kluczowe?", a: "Zmniejsza ryzyko rozwoju tętniaków tętnic wieńcowych z 20–25% do poniżej 3–5%.", cat: "Pediatria" },
      { q: "Jaki jest unikalny objaw w badaniu moczu w chorobie Kawasakiego?", a: "Jałowa leukocyturia (wynikająca z zapalenia dystalnej cewki moczowej).", cat: "Pediatria" },
      { q: "Dlaczego po podaniu IVIG w chorobie Kawasakiego odracza się szczepienie MMR o 11 miesięcy?", a: "Podane przeciwciała z IVIG neutralizują żywy wirus szczepionkowy, uniemożliwiając wytworzenie trwałej odporności.", cat: "Pediatria" }
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
  console.log('Batch 122-125 finished successfully.');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});

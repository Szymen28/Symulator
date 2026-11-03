const fs = require('fs');
const { encryptStringAes } = require('./encrypt_case.js');
const PASSWORD = '@LEKSzymon28111999';

const cases = [
  // 113: Mononukleoza zakaźna (EBV)
  {
    id: 113,
    filename: "113_mononukleoza_ebv.json",
    dept: "Pediatria",
    shortTitle: "15-letni nastolatek – Wysoka gorączka, zapalenie migdałków, powiększenie śledziony i wysypka po amoksycylinie (Mononukleoza / EBV)",
    diagnosisTitle: "Mononukleoza zakaźna (Infectious Mononucleosis) wywołana przez wirus Epsteina-Barr (EBV) z osutką polekową po aminopenicylinie",
    vitals: [
      { label: "HR", val: "102/min", sub: "Tachykardia gorączkowa", status: "warn" },
      { label: "BP", val: "114/72 mmHg", sub: "Prawidłowe", status: "ok" },
      { label: "SpO2", val: "97%", sub: "Prawidłowa", status: "ok" },
      { label: "RR", val: "18/min", sub: "Prawidłowa", status: "ok" },
      { label: "Temp", val: "38.9°C", sub: "Wysoka gorączka", status: "bad" }
    ],
    vitalsObj: { hr: 102, bp: "114/72", spo2: 97, rr: 18, temp: 38.9 },
    story: "15-letni uczeń zgłosił się do szpitalnego oddziału ratunkowego z powodu utrzymującej się od 7 dni gorączki do 39.2°C, silnego bólu gardła z trudnościami w połykaniu, obrzęku szyi i znacznego osłabienia. Trzy dni temu lekarz POZ rozpoznał anginę i przepisał amoksycylinę p.o. Wczoraj wieczorem, po 4 dawkach amoksycyliny, na całym ciele chłopca (twarz, tułów, kończyny) pojawiła się swędząca, zlewająca się osutka plamisto-grudkowa o miedzianoczerwonym odcieniu. W badaniu fizykalnym: obustronnie powiększone, rozpulchnione migdałki niemal stykające się w linii środkowej ('całujące się migdałki'), pokryte grubymi, szarobiałymi nalotami włóknikowymi. Wyraźny obrzęk nasady nosa i powiek (objaw Glanzmana), wybroczyny na granicy podniebienia twardego i miękkiego. Uogólnione bolesne powiększenie węzłów chłonnych (zwłaszcza wzdłuż tylnej krawędzi mięśnia MOS i podżuchwowych). W badaniu palpacyjnym brzucha: wątroba wystaje na 2 cm, a śledziona jest miękka, bolesna i wyczuwalna 3 cm poniżej lewego łuku żebrowego.",
    labs: [
      {
        category: "Morfologia krwi i rozmaz mikroskopowy",
        items: [
          { name: "Leukocyty (WBC)", val: "14.8 G/L", norm: "4.5–13.5 G/L", flag: "H" },
          { name: "Limfocyty ogółem", val: "68% (bezwzględnie 10.0 G/L)", norm: "20–45%", flag: "H" },
          { name: "Limfocyty atypowe (komórki Downeya)", val: "22% wszystkich krwinek białych", norm: "< 10%", flag: "H" },
          { name: "Płytki krwi (PLT)", val: "128 G/L (łagodna trombocytopenia)", norm: "150–450 G/L", flag: "L" },
          { name: "Hemoglobina (Hb)", val: "13.8 g/dL", norm: "13.0–16.0 g/dL", flag: "N" }
        ]
      },
      {
        category: "Badania serologiczne i wirusologiczne",
        items: [
          { name: "Szybki test na przeciwciała heterofilne (Monospot test)", val: "Dodatni (+)", norm: "Ujemny", flag: "H" },
          { name: "Przeciwciała anty-EBV VCA IgM (kapsyd wirusowy)", val: "Dodatnie (wysokie miano)", norm: "Ujemne", flag: "H" },
          { name: "Przeciwciała anty-EBV EBNA IgG (antygen jądrowy)", val: "Ujemne (wyklucza dawne zakażenie)", norm: "Ujemne", flag: "N" },
          { name: "Szybki test antygenowy w gardle (Strep-A)", val: "Ujemny (-)", norm: "Ujemny", flag: "N" }
        ]
      },
      {
        category: "Enzymy wątrobowe i wskaźniki zapalne",
        items: [
          { name: "AlAT (aminotransferaza alaninowa)", val: "185 IU/L", norm: "< 45 IU/L", flag: "H" },
          { name: "AspAT (aminotransferaza asparaginianowa)", val: "162 IU/L", norm: "< 40 IU/L", flag: "H" },
          { name: "Bilirubina całkowita", val: "1.4 mg/dL", norm: "0.2–1.2 mg/dL", flag: "H" },
          { name: "CRP", val: "22 mg/L", norm: "< 5.0 mg/L", flag: "H" }
        ]
      }
    ],
    steps: [
      {
        num: 1,
        title: "Identyfikacja triady mononukleozy zakaźnej",
        task: "Klasyczna triada objawów mononukleozy zakaźnej (EBV) obejmuje:",
        options: [
          { text: "Gorączkę, zapalenie gardła z nalotami na migdałkach oraz uogólnioną limfadenopatię (z częstą hepatosplenomegalią)", correct: true, feedback: "Prawidłowo! Triada objawów EBV to: wysoka gorączka, zapalenie gardła i migdałków z grubymi nalotami oraz uogólnione powiększenie węzłów chłonnych (zwłaszcza szyjnych tylnych). Splenomegalia występuje u >50% chorych." },
          { text: "Kaszel, katar i zapalenie spojówek", correct: false, feedback: "To triada zwiastunowa odry." },
          { text: "Drgawki, zaburzenia świadomości i porażenie nerwu twarzowego", correct: false, feedback: "To objawy zapalenia mózgu lub powikłań neurologicznych, nie triada mononukleozy." },
          { text: "Biegunka, wymioty i odwodnienie", correct: false, feedback: "To objawy nieżytu żołądkowo-jelitowego." }
        ]
      },
      {
        num: 2,
        title: "Mechanizm wysypki po amoksycylinie",
        task: "Dlaczego u pacjenta z mononukleozą zakaźną po podaniu amoksycyliny rozwinęła się uogólniona osutka plamisto-grudkowa?",
        options: [
          { text: "Jest to niealergiczna reakcja immunologiczna wywołana interakcją wirusa EBV pobudzającego limfocyty B z aminopenicyliną (występuje u >80–90% chorych z mononukleozą leczonych ampicyliną/amoksycyliną) i NIE oznacza trwałej alergii na penicyliny", correct: true, feedback: "Kluczowy punkt LEK! Wirus EBV poliklonalnie aktywuje limfocyty B i układ odpornościowy. Podanie amoksycyliny lub ampicyliny w tej fazie niemal u każdego pacjenta wyzwala intensywną, swędzącą osutkę plamisto-grudkową. Nie jest to klasyczna alergia IgE-zależna i po wyzdrowieniu chory zazwyczaj może bezpiecznie przyjmować penicyliny!" },
          { text: "To wstrząs anafilaktyczny wymagający natychmiastowej intubacji", correct: false, feedback: "Błąd! To nie anafilaksja – pacjent jest stabilny hemodynamicznie, nie ma skurczu oskrzeli ani obrzęku krtani." },
          { text: "Wysypka jest wynikiem bezpośredniej toksyczności paracetamolu na szpik", correct: false, feedback: "Brak związku." },
          { text: "Jest to zakażenie wirusem ospy wietrznej nałożone na anginę", correct: false, feedback: "Błąd – wysypka nie ma pęcherzyków 'kropli rosy'." }
        ]
      },
      {
        num: 3,
        title: "Kluczowa cecha w rozmazie mikroskopowym krwi",
        task: "Obecność jakich komórek w rozmazie krwi obwodowej potwierdza rozpoznanie mononukleozy zakaźnej?",
        options: [
          { text: "Atypowych limfocytów (komórek Downeya) stanowiących >= 10% krwinek białych (są to pobudzone limfocyty T CD8+ walczące z zakażonymi limfocytami B)", correct: true, feedback: "Znakomicie! Patognomonicznym zjawiskiem w morfologii jest leukocytoza z bezwzględną limfocytozą (>50% limfocytów) oraz obecność >= 10% atypowych limfocytów (pleomorficznych, dużych limfocytów T cytotoksycznych CD8+)." },
          { text: "Komórek Reed-Sternberga", correct: false, feedback: "Komórki te stwierdza się w histopatologii chłoniaka Hodgkina, nie w rozmazie krwi." },
          { text: "Mieloblastów z pałeczkami Auera", correct: false, feedback: "To cecha ostrej białaczki szpikowej (AML)." },
          { text: "Komórek LE (toczniowych)", correct: false, feedback: "Historyczny test w toczniu rumieniowatym." }
        ]
      },
      {
        num: 4,
        title: "Interpretacja profilu serologicznego EBV",
        task: "Wynik: anty-VCA IgM (+), anty-VCA IgG (+), anty-EBNA IgG (-). Jak interpretujesz ten profil serologiczny?",
        options: [
          { text: "Świeże, ostre pierwotne zakażenie EBV", correct: true, feedback: "Dokładnie tak! Przeciwciała anty-VCA IgM pojawiają się na początku i zanikają po 2–3 miesiącach. Przeciwciała anty-EBNA IgG pojawiają się późno, dopiero po 6–12 tygodniach od zakażenia i utrzymują się do końca życia. Obecność VCA IgM przy ujemnym EBNA IgG dowodzi ostrej pierwotnej infekcji." },
          { text: "Przebyte zakażenie wiele lat temu (stan uodpornienia)", correct: false, feedback: "W przebytym zakażeniu obecne są przeciwciała anty-EBNA IgG, a VCA IgM są ujemne." },
          { text: "Całkowity brak kontaktu z wirusem EBV", correct: false, feedback: "Wtedy wszystkie przeciwciała byłyby ujemne." },
          { text: "Błąd laboratoryjny", correct: false, feedback: "To klasyczny profil ostrej infekcji." }
        ]
      },
      {
        num: 5,
        title: "Najgroźniejsze powikłanie narządowe w jamie brzusznej",
        task: "Z jakiego powodu u nastolatków z mononukleozą i powiększoną śledzioną obowiązuje bezwzględny zakaz uprawiania sportów kontaktowych i dźwigania ciężarów przez minimum 3–4 tygodnie?",
        options: [
          { text: "Ryzyko pęknięcia śledziony (spontanicznego lub po nawet niewielkim urazie brzusznym), które stanowi stan bezpośredniego zagrożenia życia z krwotokiem wewnętrznym", correct: true, feedback: "Prawidłowo! W mononukleozie dochodzi do masywnego nacieku limfocytarnego miazgi śledziony i jej przekrwienia, co osłabia torebkę narządu. Pęknięcie śledziony (zwykle w 2.–3. tygodniu) jest rzadkim (0.1–0.5%), ale najczęstszym śmiertelnym powikłaniem mononukleozy u młodzieży!" },
          { text: "Ryzyko zwichnięcia stawu biodrowego", correct: false, feedback: "Brak związku." },
          { text: "Ryzyko ostrej perforacji wyrostka robaczkowego", correct: false, feedback: "Nie jest to typowe powikłanie EBV." },
          { text: "Ryzyko wytworzenia kamicy pęcherzyka żółciowego", correct: false, feedback: "Brak bezpośredniego związku." }
        ]
      },
      {
        num: 6,
        title: "Wskazania do glikokortykosteroidoterapii w mononukleozie",
        task: "Leczenie mononukleozy jest objawowe. W jakiej wyjątkowej sytuacji klinicznej u pacjenta z mononukleozą zakaźną wskazane jest włączenie krótkiego kursu glikokortykosteroidów (np. deksametazonu lub prednizonu)?",
        options: [
          { text: "Obturacja dróg oddechowych przez masywnie powiększone migdałki ('całujące się migdałki'), ciężka niedokrwistość hemolityczna lub małopłytkowość z krwawieniami oraz powikłania neurologiczne", correct: true, feedback: "Znakomicie! Rutynowe stosowanie GKS w mononukleozie jest niewskazane (może opóźniać eradykację wirusa). Ścisłe wskazania to: duszność i zagrożenie obturacją gardła przez olbrzymie migdałki, powikłania hematologiczne (autoimmunologiczna niedokrwistość hemolityczna AIHA, ciężka ITP) oraz ciężkie zapalenie mięśnia sercowego/mózgu." },
          { text: "U każdego pacjenta z gorączką powyżej 38°C", correct: false, feedback: "Błąd! Gorączkę leczy się paracetamolem lub ibuprofenem, nie sterydami." },
          { text: "Tylko wtedy, gdy próby wątrobowe są lekko podwyższone", correct: false, feedback: "Przejściowy wzrost aminotransferaz występuje u >80% chorych i nie wymaga sterydoterapii." },
          { text: "W celu przyspieszenia zaniku wysypki skórnej", correct: false, feedback: "Wysypka ustępuje samoistnie po odstawieniu amoksycyliny." }
        ]
      },
      {
        num: 7,
        title: "Różnicowanie: zakażenie pierwotne CMV",
        task: "U pacjenta z obrazem mononukleozopodobnym (gorączka, hepatosplenomegalia, limfocyty atypowe), ale bez zapalenia gardła i migdałków oraz z ujemnym testem na przeciwciała heterofilne (mononukleoza heterofilno-ujemna), najczęstszą etiologią jest:",
        options: [
          { text: "Wirus cytomegalii (CMV)", correct: true, feedback: "Bardzo dobrze! Cytomegalia (CMV) jest najczęstszą przyczyną zespołu mononukleozopodobnego z ujemnym odczynem na przeciwciała heterofilne (tzw. mononukleoza heterofilno-ujemna). W CMV rzadziej występuje ciężkie zapalenie gardła i powiększenie migdałków." },
          { text: "Wirus wścieklizny", correct: false, feedback: "Daje wodowstręt, skurcze mięśni i zgon." },
          { text: "Paciorkowiec grupy B (GBS)", correct: false, feedback: "GBS wywołuje sepsę noworodkową, nie zespół mononukleozy u nastolatka." },
          { text: "Bakteria Clostridioides difficile", correct: false, feedback: "Wywołuje rzekomobłoniaste zapalenie jelit po antybiotykoterapii." }
        ]
      },
      {
        num: 8,
        title: "Zalecenia przy wypisie i rekonwalescencja",
        task: "Jakie zalecenia dotyczące aktywności fizycznej i powrotu do szkoły przekażesz wypisywanemu ze szpitala 15-latkowi?",
        options: [
          { text: "Odpoczynek, zakaz uprawiania sportów kontaktowych i intensywnego wysiłku przez minimum 3–4 tygodnie (do ustąpienia splenomegalii w USG), unikanie alkoholu z uwagi na przebyte zapalenie wątroby", correct: true, feedback: "Świetnie! Zakaz sportów kontaktowych i podnoszenia ciężarów przez minimum miesiąc chroni przed pęknięciem śledziony. Zmęczenie poinfekcyjne (chronic fatigue) może utrzymywać się przez kilka tygodni/miesięcy." },
          { text: "Natychmiastowy udział w meczu rugby jutro rano", correct: false, feedback: "Kardynalne zagrożenie pęknięciem śledziony i krwotokiem wewnętrznym!" },
          { text: "Konieczność leczenia acyklowirem przez kolejne 6 miesięcy", correct: false, feedback: "Acyklowir nie ma udowodnionej skuteczności w mononukleozie i nie zapobiega latencji EBV." },
          { text: "Dożywotnia izolacja w domu ze względu na zakaźność", correct: false, feedback: "Wirus EBV po przechorowaniu pozostaje w ślinie okresowo u większości zdrowych ludzi (choroba pocałunków)." }
        ]
      }
    ],
    pathoNodes: [
      {
        title: "1. Transmisja przez ślinę i zakażenie limfocytów B",
        desc: "EBV wnika przez ślinę ('choroba pocałunków') i wiąże się z receptorem CD21 (CR2) na powierzchni limfocytów B, stymulując ich niekontrolowaną, poliklonalną proliferację i produkcję przeciwciał heterofilnych.",
        drugTarget: "Podstawowe leczenie wspomagające, odpowiednie nawodnienie, paracetamol/ibuprofen (unikanie amoksycyliny!)"
      },
      {
        title: "2. Masywna odpowiedź cytotoksyczna limfocytów T CD8+",
        desc: "W odpowiedzi na zakażone komórki B układ odpornościowy uruchamia armię cytotoksycznych limfocytów T (widocznych w rozmazie jako atypowe komórki Downeya), które naciekają węzły chłonne, wątrobę i śledzionę.",
        drugTarget: "Krótkotrwała sterydoterapia (deksametazon) wyłącznie przy obturacji dróg oddechowych lub głębokiej małopłytkowości"
      },
      {
        title: "3. Splenomegalia i przekrwienie miazgi śledziony",
        desc: "Gwałtowny naciek limfocytarny rozciąga torebkę śledziony i czyni miąższ kruchym, stwarzając ryzyko pęknięcia narządu nawet przy mikrourazie lub gwałtownym wzroście ciśnienia tłoczni brzusznej.",
        drugTarget: "Bezwzględny zakaz sportów kontaktowych i ciężkiego wysiłku fizycznego przez min. 3–4 tygodnie"
      }
    ],
    dutySummary: "Mononukleoza zakaźna (EBV) charakteryzuje się triadą: gorączka, zapalenie migdałków z nalotami i limfadenopatia, z częstą splenomegalią. Pamiętaj: podanie amoksycyliny wywołuje u >80% chorych swędzącą osutkę plamisto-grudkową (nie jest to trwała alergia!). W rozmazie krwi: bezwzględna limfocytoza i >= 10% limfocytów atypowych. Ze względu na ryzyko pęknięcia śledziony obowiązuje zakaz sportów kontaktowych przez 3-4 tygodnie.",
    diffTable: [
      { disease: "Angina paciorkowcowa (GAS)", diff: "Brak splenomegalii, brak uogólnionej limfadenopatii (powiększone tylko węzły podżuchwowe), brak limfocytów atypowych, szybka reakcja na penicylinę.", test: "Szybki test Strep-A (dodatni w GAS, ujemny w EBV), rozmaz krwi." },
      { disease: "Cytomegalia pierwotna (CMV)", diff: "Obraz mononukleozopodobny z powiększeniem wątroby i śledziony, ale zazwyczaj bez ciężkiego zapalenia migdałków; ujemne przeciwciała heterofilne.", test: "Serologia CMV IgM/IgG, ujemny test Monospot." },
      { disease: "Ostra choroba retrowirusowa (HIV)", diff: "Wywiad ryzykownych kontaktów seksualnych, owrzodzenia błon śluzowych jamy ustnej i narządów płciowych, wysypka bez związku z antybiotykiem.", test: "Test combo antygen p24 / przeciwciała HIV-1/2, HIV RNA." },
      { disease: "Ostra białaczka limfoblastyczna (ALL)", diff: "Bóle kostne, bladość (niedokrwistość), skaza krwotoczna (głęboka małopłytkowość), obecność blastów w szpiku, brak przeciwciał anty-EBV.", test: "Rozmaz krwi obwodowej, mielogram (biopsja aspiracyjna szpiku)." }
    ],
    lekQuestions: [
      {
        question: "U 16-letniego pacjenta z podejrzeniem anginy zastosowano doustną amoksycylinę. W 4. dobie terapii na tułowiu i kończynach pojawiła się swędząca, zlewająca się osutka plamisto-grudkowa. W badaniu fizykalnym stwierdzono powiększenie śledziony i uogólnioną limfadenopatię. Najbardziej prawdopodobnym rozpoznaniem jest:",
        options: [
          "Wstrząs anafilaktyczny po penicylinie.",
          "Mononukleoza zakaźna wywołana przez wirus Epsteina-Barr (EBV) z osutką po aminopenicylinie.",
          "Płonica (szkarlatyna).",
          "Toksyczna nekroliza naskórka (zespół Lyella).",
          "Zakażenie parwowirusem B19 z rumieniem wędrującym."
        ],
        correct: 1,
        explanation: "Podanie aminopenicylin (amoksycyliny lub ampicyliny) u pacjentów ze świeżym zakażeniem EBV (mononukleozą zakaźną) powoduje wystąpienie uogólnionej, swędzącej osutki plamisto-grudkowej u >80–90% chorych. Wynika to ze swoistej nadreaktywności immunologicznej stymulowanych przez wirus limfocytów B i nie świadczy o prawdziwej alergii IgE-zależnej na penicyliny."
      },
      {
        question: "Który z poniższych parametrów w morfologii krwi obwodowej z rozmazem jest najbardziej charakterystyczny dla mononukleozy zakaźnej?",
        options: [
          "Izolowana granulocytoza obojętnochłonna z przesunięciem w lewo.",
          "Bezwzględna limfocytoza z obecnością atypowych limfocytów (komórek Downeya) przekraczających 10% krwinek białych.",
          "Ciężka niedokrwistość mikrocytarna z leukopenią.",
          "Masywna trombocytoza powyżej 1000 G/L.",
          "Eozynofilia powyżej 30%."
        ],
        correct: 1,
        explanation: "Charakterystyczną cechą mononukleozy zakaźnej w morfologii krwi jest obecność leukocytozy z limfocytozą (limfocyty stanowią >50% leukocytów) oraz obecnością >= 10% atypowych limfocytów (pobudzonych cytotoksycznych limfocytów T CD8+ skierowanych przeciwko zakażonym limfocytom B)."
      },
      {
        question: "Jakie jest bezwzględne zalecenie u nastolatka w fazie ostrej i rekonwalescencji mononukleozy zakaźnej ze stwierdzoną splenomegalią?",
        options: [
          "Zakaz uprawiania sportów kontaktowych i intensywnego wysiłku fizycznego przez minimum 3–4 tygodnie ze względu na ryzyko pęknięcia śledziony.",
          "Konieczność leczenia profilaktycznego heparyną drobnocząsteczkową przez 6 miesięcy.",
          "Zalecenie natychmiastowej planowej splenektomii.",
          "Ścisła dieta bezbiałkowa przez 12 miesięcy.",
          "Stosowanie acyklowiru dożylnie przez 21 dni."
        ],
        correct: 0,
        explanation: "Pęknięcie śledziony jest najgroźniejszym powikłaniem mononukleozy zakaźnej, wynikającym z nacieku limfocytarnego i osłabienia torebki śledziony. Z tego powodu u wszystkich pacjentów obowiązuje bezwzględny zakaz uprawiania sportów kontaktowych, podnoszenia ciężarów i intensywnych ćwiczeń fizycznych przez minimum 3–4 tygodnie od początku choroby lub do czasu całkowitej normalizacji wielkości śledziony."
      }
    ],
    flashcards: [
      { q: "Jaka jest klasyczna triada objawów mononukleozy zakaźnej (EBV)?", a: "Gorączka, zapalenie gardła i migdałków z grubymi nalotami oraz uogólnione powiększenie węzłów chłonnych (często ze splenomegalią).", cat: "Pediatria" },
      { q: "Co dzieje się po podaniu amoksycyliny pacjentowi z mononukleozą EBV?", a: "U >80-90% pacjentów pojawia się intensywna, swędząca osutka plamisto-grudkowa (reakcja immunologiczna niezwiązana z alergią IgE).", cat: "Pediatria" },
      { q: "Czym są komórki Downeya widoczne w rozmazie krwi w mononukleozie?", a: "To atypowe, pobudzone limfocyty T (CD8+) walczące z zakażonymi przez EBV limfocytami B.", cat: "Pediatria" },
      { q: "Jakie jest najgroźniejsze powikłanie narządowe mononukleozy u sportowców?", a: "Pęknięcie śledziony prowadzące do krwotoku wewnętrznego (obowiązuje zakaz sportów kontaktowych przez min. 3-4 tyg.).", cat: "Pediatria" },
      { q: "Kiedy w mononukleozie stosuje się glikokortykosteroidy?", a: "W stanach zagrożenia życia: obturacja dróg oddechowych przez 'całujące się migdałki', ciężka małopłytkowość z krwawieniem, niedokrwistość hemolityczna.", cat: "Pediatria" }
    ]
  },

  // 114: Krztusiec (Bordetella pertussis)
  {
    id: 114,
    filename: "114_krztusiec_pertussis.json",
    dept: "Pediatria",
    shortTitle: "2-miesięczne nieszczepione niemowlę – Napady dławiącego kaszlu z bezdechem i 'pianiem' (Krztusiec / Pertussis)",
    diagnosisTitle: "Krztusiec (Pertussis / Whooping Cough) wywołany przez pałeczkę krztuśca (Bordetella pertussis) z zespołem bezdechów",
    vitals: [
      { label: "HR", val: "168/min", sub: "Tachykardia w trakcie napadu", status: "warn" },
      { label: "BP", val: "84/50 mmHg", sub: "Prawidłowe", status: "ok" },
      { label: "SpO2", val: "86% (w napadzie) / 98% (poza napadem)", sub: "Głębokie desaturacje w napadach kaszlu", status: "bad" },
      { label: "RR", val: "44/min", sub: "Przyspieszony", status: "warn" },
      { label: "Temp", val: "37.2°C", sub: "Bezgorączkowy lub stan podgorączkowy", status: "ok" }
    ],
    vitalsObj: { hr: 168, bp: "84/50", spo2: 86, rr: 44, temp: 37.2 },
    story: "2-miesięczne niemowlę, które nie otrzymało jeszcze pierwszej dawki szczepień DTP (odroczone przez rodziców), zostało przywiezione przez ZRM na oddział pediatryczny z powodu narastających od 2 tygodni napadów kaszlu. Choroba zaczęła się od łagodnego kataru i sporadycznego pok kasływania bez gorączki (okres nieżytowy). Od 5 dni kaszel przybrał charakter paroksyzmalny – seria 10–15 gwałtownych wykrztuszeń na jednym wydechu z wysuniętym językiem, po której następuje głośny, świszczący wdech przypominający pianie koguta (reprise). Na szczycie napadu dziecko sinieje na twarzy, ma bezdech trwający 15–20 sekund ze spadkiem SpO2 do 84%, a napad kończy się odkrztuszeniem gęstego, lepkiego śluzu i wymiotami. Pomiędzy napadami niemowlę jest spokojne, bez cech duszności. Osłuchowo nad płucami poza napadem szmer pęcherzykowy prawidłowy, brak rzężeń i świstów.",
    labs: [
      {
        category: "Morfologia krwi i wskaźniki zapalne",
        items: [
          { name: "Leukocyty (WBC)", val: "38.5 G/L (masywna leukocytoza krztuścowa)", norm: "6.0–17.5 G/L", flag: "H" },
          { name: "Limfocyty bezwzględnie", val: "28.0 G/L (72% limfocytów)", norm: "3.0–9.5 G/L", flag: "H" },
          { name: "Hemoglobina (Hb)", val: "11.2 g/dL", norm: "10.0–13.5 g/dL", flag: "N" },
          { name: "Płytki krwi (PLT)", val: "490 G/L", norm: "150–450 G/L", flag: "H" },
          { name: "CRP", val: "3.2 mg/L (zazwyczaj prawidłowe lub niskie)", norm: "< 5.0 mg/L", flag: "N" }
        ]
      },
      {
        category: "Diagnostyka molekularna i serologiczna krztuśca",
        items: [
          { name: "RT-PCR w kierunku Bordetella pertussis (wymaz z nosogardła)", val: "Dodatni (obecny DNA B. pertussis)", norm: "Ujemny", flag: "H" },
          { name: "Posiew na podłoże Regan-Lowe / Bordet-Gengou", val: "W toku (trudna i długa hodowla)", norm: "Ujemny", flag: "N" },
          { name: "Przeciwciała anty-PT IgG (toksyna krztuścowa)", val: "Niemiarodajne u 2-miesięcznego niemowlęcia (przeciwciała matczyne)", norm: "Ujemne", flag: "N" }
        ]
      },
      {
        category: "Gazometria krwi włośniczkowej i RTG",
        items: [
          { name: "pH krwi", val: "7.38", norm: "7.35–7.45", flag: "N" },
          { name: "pCO2", val: "42 mmHg", norm: "35–45 mmHg", flag: "N" },
          { name: "RTG klatki piersiowej", val: "Rozlane zagęszczenia siateczkowe okołownękowe ('serce kosmate' / rozmycie zarysu sylwetki serca)", norm: "Prawidłowy", flag: "H" }
        ]
      }
    ],
    steps: [
      {
        num: 1,
        title: "Identyfikacja fazy klinicznej krztuśca",
        task: "Przebieg krztuśca dzieli się na trzy fazy. W której fazie znajduje się dziecko prezentujące paroksyzmy kaszlu z 'pianiem', bezdechem i wymiotami?",
        options: [
          { text: "W fazie napadowego kaszlu (faza paroksyzmalna, trwająca 2–4 tygodnie)", correct: true, feedback: "Prawidłowo! Fazy krztuśca to: 1. Faza nieżytowa (kataralna, 1–2 tyg. – najbardziej zakaźna!), 2. Faza kaszlu napadowego (paroksyzmalna, 2–4 tyg. – pianie, wymioty, bezdechy), 3. Faza rekonwalescencji (nawet do kilku miesięcy – 'kaszel 100 dni')." },
          { text: "W fazie nieżytowej (kataralnej)", correct: false, feedback: "Błąd! Faza nieżytowa to początkowy okres przypominający zwykłe przeziębienie z katarem." },
          { text: "W fazie rekonwalescencji", correct: false, feedback: "Błąd! Faza rekonwalescencji charakteryzuje się wygasaniem napadów kaszlu." },
          { text: "W fazie zwiastunowej sepsy", correct: false, feedback: "Krztusiec nie jest posocznicą, bakterie kolonizują rzęski nabłonka oddechowego i nie wnikają do krwi." }
        ]
      },
      {
        num: 2,
        title: "Kluczowa cecha laboratoryjna w morfologii krwi",
        task: "Jaki jest patognomoniczny obraz w morfologii krwi u małego dziecka z krztuścem?",
        options: [
          { text: "Masywna leukocytoza (często >20–50 G/L) z bezwzględną limfocytozą wywołana działaniem toksyny krztuścowej (PT)", correct: true, feedback: "Dokładnie tak! Toksyna krztuścowa (PT) hamuje migrację limfocytów z krwi do węzłów chłonnych, wywołując spektakularną leukocytozę z przewagą limfocytów (limfocytoza krztuścowa), często imitującą białaczkę (odczyn białaczkowy)." },
          { text: "Ciężka neutropenia z agranulocytozą", correct: false, feedback: "Błąd! W krztuścu liczba neutrofilów jest w normie lub nieznacznie podwyższona, dominują limfocyty." },
          { text: "Głęboka niedokrwistość hemolityczna ze schizocytami", correct: false, feedback: "To cecha HUS, nie krztuśca." },
          { text: "Masywna trombocytopenia < 10 G/L", correct: false, feedback: "W krztuścu płytki krwi są w normie lub występuje nadpłytkowość reaktywna." }
        ]
      },
      {
        num: 3,
        title: "Metoda z wyboru w potwierdzeniu mikrobiologicznym",
        task: "Które badanie jest współcześnie metodą z wyboru w szybkim i czułym potwierdzeniu zakażenia Bordetella pertussis u niemowlęcia?",
        options: [
          { text: "Badanie PCR wymazu z tylnej ściany nosogardła (wymazówka dakronowa lub nylonowa)", correct: true, feedback: "Znakomicie! Złotym standardem szybkiej diagnostyki krztuśca w pierwszych 3-4 tygodniach choroby jest test PCR z głębokiego wymazu z nosogardła. Hodowla na podłożu Bordet-Gengou/Regan-Lowe jest trudna i ma niską czułość, a serologia jest niemiarodajna u niemowląt <1 r.ż." },
          { text: "Posiew moczu na podłożu MacConkeya", correct: false, feedback: "Bordetella pertussis nie występuje w moczu." },
          { text: "Badanie ogólne stolca", correct: false, feedback: "Brak związku." },
          { text: "Szybki test kasetowy z kropli krwi włośniczkowej", correct: false, feedback: "Nie ma zastosowania diagnostycznego w ostrej fazie." }
        ]
      },
      {
        num: 4,
        title: "Leczenie przeciwbakteryjne pierwszego rzutu",
        task: "Jaki antybiotyk i w jakim schemacie jest lekiem pierwszego rzutu w leczeniu krztuśca u 2-miesięcznego niemowlęcia?",
        options: [
          { text: "Azytromycyna doustnie (10 mg/kg mc./dobę raz dziennie przez 5 dni)", correct: true, feedback: "Doskonale! Makrolidy są lekami z wyboru w eradykacji B. pertussis. U niemowląt lekiem z wyboru jest azytromycyna (5 dni) lub klarytromycyna (7 dni). Klarytromycyna i erytromycyna u noworodków <1 m.ż. wiązały się z ryzykiem przerostowego zwężenia odźwiernika, stąd u najmłodszych preferuje się azytromycynę." },
          { text: "Amoksycylina doustnie przez 10 dni", correct: false, feedback: "Błąd! Aminopenicyliny nie są skuteczne w eliminacji B. pertussis z dróg oddechowych!" },
          { text: "Ciprofloksacyna w zastrzykach", correct: false, feedback: "Fluorochinolony nie są zalecane w krztuścu u niemowląt." },
          { text: "Gentamycyna domięśniowo", correct: false, feedback: "Aminoglikozydy nie penetrują do wydzieliny drzewa oskrzelowego i nie eradykują krztuśca." }
        ]
      },
      {
        num: 5,
        title: "Wpływ antybiotykoterapii na objawy w fazie napadowej",
        task: "Rodzice pytają, czy podanie azytromycyny natychmiast zatrzyma napady duszności i kaszlu u niemowlęcia. Co wyjaśnisz rodzicom?",
        options: [
          { text: "Antybiotyk wdrożony w fazie napadowej nie skróci istotnie czasu trwania kaszlu (ponieważ rzęski i nabłonek zostały już zniszczone przez toksyny), ale eliminuje bakterie i zakaźność po 5 dniach", correct: true, feedback: "Bardzo ważny punkt kliniczny! Wdrożenie makrolidu w fazie kataralnej może złagodzić lub zatrzymać objawy. W fazie napadowej antybiotyk NIE cofa kaszlu (toksyny już wywołały martwicę nabłonka rzęskowego), ale jest bezwzględnie konieczny w celu eradykacji nosicielstwa i przerwania łańcucha zakażeń w otoczeniu (zakaźność ustępuje po 5 dniach azytromycyny)." },
          { text: "Tak – kaszel ustąpi w ciągu 15 minut od pierwszej dawki", correct: false, feedback: "Nieprawda – kaszel napadowy może utrzymywać się przez wiele tygodni." },
          { text: "Antybiotyk jest całkowicie zbędny w fazie napadowej", correct: false, feedback: "Błąd – nieleczony pacjent prątkuje przez 3-4 tygodnie, zarażając kolejne dzieci." },
          { text: "Kaszel natychmiast zamieni się w bezdech centralny", correct: false, feedback: "Nonsens." }
        ]
      },
      {
        num: 6,
        title: "Wskazania do hospitalizacji i monitorowania",
        task: "Dlaczego 2-miesięczne niemowlę z krztuścem wymaga bezwzględnej hospitalizacji na oddziale z możliwością ciągłego monitorowania kardiomonitorem i pulsoksymetrią?",
        options: [
          { text: "U niemowląt poniżej 6. miesiąca życia krztusiec wiąże się z wysokim ryzykiem zgonu z powodu nagłych bezdechów, sinicy, encefalopatii niedotlenieniowej i nadciśnienia płucnego", correct: true, feedback: "Znakomicie! Niemowlęta <6 m.ż. to grupa najwyższego ryzyka zgonu w krztuścu. U najmłodszych dzieci napad krztuścowy może nie mieć klasycznego 'piania', lecz manifestować się izolowanym bezdechem (apnea), drgawkami hipoksyjnymi oraz złośliwym krztuścem (nadciśnienie płucne, leukocytoza >50-100 G/L, wstrząs kardiogenny)." },
          { text: "Tylko w celu wykonania bronchoskopii sztywnej", correct: false, feedback: "Bronchoskopia nie jest wskazana w krztuścu." },
          { text: "Wyłącznie ze względów socjalnych", correct: false, feedback: "Wskazania są czysto medyczne i życiowe." },
          { text: "Niemowlęta nie wymagają hospitalizacji", correct: false, feedback: "Kardynalny błąd zagrażający zgonem dziecka w domu." }
        ]
      },
      {
        num: 7,
        title: "Profilaktyka poekspozycyjna (PEP) w rodzinie",
        task: "W domu z chorym niemowlęciem mieszka 4-letnia siostra (zaszczepiona 3 dawkami DTP) oraz oboje rodzice. Jakie jest postępowanie w ramach profilaktyki poekspozycyjnej?",
        options: [
          { text: "Zastosowanie profilaktyki poekspozycyjnej makrolidem (chemioprofilaktyka) u WSZYSTKICH domowników bez względu na ich status szczepień ochronnych", correct: true, feedback: "Dokładnie tak! Zgodnie z wytycznymi CDC i GIS, chemioprofilaktykę poekspozycyjną makrolidem (azytromycyna p.o.) zaleca się u wszystkich osób z bliskiego kontaktu domowego, niezależnie od wieku i wcześniejszych szczepień, ponieważ odporność poszczepienna zanika po 4–6 latach, a zaszczepieni dorośli mogą być bezobjawowymi nosicielami prątkującymi dla nieszczepionych niemowląt." },
          { text: "Podanie antybiotyku tylko siostrze, rodzicom nie", correct: false, feedback: "Błąd – dorośli są najczęstszym źródłem zakażenia niemowląt!" },
          { text: "Zaniechanie profilaktyki, jeśli domownicy nie kaszlą", correct: false, feedback: "Błąd – profilaktyka ma zapobiec transmisji i rozwojowi objawów." },
          { text: "Natychmiastowe zaszczepienie wszystkich domowników 5 dawkami szczepionki w ciągu 1 dnia", correct: false, feedback: "Niewykonalne i nielogiczne." }
        ]
      },
      {
        num: 8,
        title: "Zapobieganie: szczepienia kobiet w ciąży (kokonowa strategia)",
        task: "Jakie działanie profilaktyczne u kobiet w ciąży jest najskuteczniejszą metodą ochrony noworodków przed krztuścem w pierwszych 2 miesiącach życia przed ich własnym szczepieniem?",
        options: [
          { text: "Szczepienie ciężarnej szczepionką dTap (z bezkomórkowym komponentem krztuśca) w każdym trymestrze III (optymalnie między 27. a 36. tygodniem ciąży)", correct: true, feedback: "Bardzo dobrze! Szczepienie matki w III trymestrze ciąży indukuje wysokie miano przeciwciał IgG przeciw toksynie krztuścowej, które przez łożysko docierają do płodu, zapewniając noworodkowi bierną ochronę w najbardziej krytycznych pierwszych 2 miesiącach życia (strategia kokonowa)." },
          { text: "Podawanie ciężarnej azytromycyny codziennie przez całą ciążę", correct: false, feedback: "Niedopuszczalne i szkodliwe." },
          { text: "Szczepienie żywą szczepionką przeciw krztuścowi w I trymestrze", correct: false, feedback: "Nie ma żywej szczepionki przeciw krztuścowi; stosuje się preparaty bezkomórkowe (aP) zabite." },
          { text: "Izolacja noworodka od matki na 6 miesięcy", correct: false, feedback: "Absurdalne i okrutne." }
        ]
      }
    ],
    pathoNodes: [
      {
        title: "1. Adhezja pałeczek do rzęsek nabłonka oddechowego",
        desc: "Bordetella pertussis wiąże się przez hemaglutyninę włókienkową (FHA) i pertaktynę z rzęskami nabłonka oskrzeli, unieruchamiając aparat śluzowo-rzęskowy.",
        drugTarget: "Azytromycyna (5 dni) – eradykacja bakterii ze śluzówki i przerwanie transmisji"
      },
      {
        title: "2. Działanie toksyny krztuścowej (PT) i cytotoksyny tchawiczej (TCT)",
        desc: "TCT wywołuje paraliż i złuszczanie komórek urzęsionych. Toksyna krztuścowa (PT) rybozyluje białko Gi, blokując hamowanie cyklazy adenylanowej, zwiększając cAMP i blokując migrację limfocytów z krwi (limfocytoza).",
        drugTarget: "Tlenoterapia bierna, toaleta dróg oddechowych, nawilżanie powietrza, unikanie bodźców wyzwalających paroksyzmy"
      },
      {
        title: "3. Akumulacja lepkiego śluzu i paroksyzmy kaszlu",
        desc: "Brak oczyszczania rzęskowego powoduje zaleganie gęstego czopa śluzowego, co drażni receptory kaszlowe i wyzwala odruchowe serie wykrztuszeń na jednym wydechu, hipoksję i bezdechy.",
        drugTarget: "Ciągły monitoring kardiologiczny i saturacji u niemowląt <6 m.ż. (ryzyko nagłego zgonu)"
      }
    ],
    dutySummary: "Krztusiec u niemowlęcia to śmiertelne zagrożenie bezdechem, sinicą i hipoksją. Charakterystyczna jest triada: paroksyzmy kaszlu, pianie (reprise) i wymioty, a w badaniach: masywna leukocytoza z przewagą limfocytów. Metodą z wyboru jest PCR z wymazu z nosogardła. Leczenie: azytromycyna przez 5 dni. Pamiętaj: chemioprofilaktyka makrolidem obejmuje WSZYSTKICH domowników bez względu na szczepienia!",
    diffTable: [
      { disease: "Zakażenie RSV (bronchiolitis)", diff: "Duszność wydechowa, świsty i furczenia, rzężenia drobnobańkowe nad płucami, brak charakterystycznego 'piania' i brak masywnej limfocytozy.", test: "Szybki test antygenowy / PCR RSV z nosogardła, osłuchiwanie klatki piersiowej." },
      { disease: "Aspiracja ciała obcego", diff: "Nagły początek u wcześniej całkowicie zdrowego dziecka (często podczas zabawy/jedzenia), jednostronne świsty lub asymetria szmerów oddechowych.", test: "Bronchoskopia sztywna, RTG klatki piersiowej wdech/wydech." },
      { disease: "Podgłośniowe zapalenie krtani (krup)", diff: "Szczekający kaszel, stridor wdechowy, chrypka, poprawa po nebulizacji ze sterydu lub L-adrenaliny, brak 'piania' na wydechu i wymiotów.", test: "Ocena kliniczna (skala Westleya), brak limfocytozy >30 G/L." },
      { disease: "Ostra białaczka limfoblastyczna (ALL)", diff: "Leukocytoza z limfocytozą, ale z towarzyszącą niedokrwistością, trombocytopenią, hepatosplenomegalią i obecnością blastów w szpiku.", test: "Morfologia (blasty w rozmazie), biopsja szpiku." }
    ],
    lekQuestions: [
      {
        question: "U 2-miesięcznego nieszczepionego niemowlęcia występują napady męczącego kaszlu z sinicą twarzy, bezdechem i wymiotami po napadzie. W morfologii krwi stwierdzono: WBC 42.0 G/L, w tym 78% limfocytów, CRP 2.0 mg/L. Najbardziej prawdopodobnym rozpoznaniem jest:",
        options: [
          "Ostra białaczka limfoblastyczna.",
          "Krztusiec (zakażenie Bordetella pertussis).",
          "Wrodzone zapalenie płuc o etiologii Chlamydia trachomatis.",
          "Mukowiscydoza.",
          "Zatorowość płucna."
        ],
        correct: 1,
        explanation: "Obraz kliniczny napadowego kaszlu z bezdechami i wymiotami u nieszczepionego niemowlęcia połączony z charakterystyczną masywną leukocytozą z bezwzględną limfocytozą (tzw. limfocytoza krztuścowa, wywołana działaniem toksyny krztuścowej) i prawidłowym CRP jest patognomoniczny dla krztuśca (zakażenia Bordetella pertussis)."
      },
      {
        question: "Wskaż lek pierwszego rzutu w leczeniu krztuśca u niemowlęcia poniżej 6. miesiąca życia:",
        options: [
          "Amoksycylina doustnie.",
          "Azytromycyna doustnie.",
          "Ciprofloksacyna dożylnie.",
          "Kotrimoksazol doustnie.",
          "Doksycyklina doustnie."
        ],
        correct: 1,
        explanation: "Antybiotykami z wyboru w leczeniu i chemioprofilaktyce krztuśca są makrolidy. U niemowląt lekiem pierwszego wyboru jest azytromycyna podawana doustnie przez 5 dni (10 mg/kg mc. w 1. dobie, następnie 5 mg/kg mc. w dobach 2–5 lub 10 mg/kg mc./d przez 5 dni). Azytromycyna ma najniższe ryzyko wywołania przerostowego zwężenia odźwiernika u najmłodszych w porównaniu z erytromycyną."
      },
      {
        question: "Wskaż prawidłowe zalecenie dotyczące chemioprofilaktyki poekspozycyjnej krztuśca u osób z bliskiego kontaktu domowego z chorym:",
        options: [
          "Profilaktykę makrolidem podaje się wyłącznie osobom nieszczepionym, które nie ukończyły 1. roku życia.",
          "Profilaktykę makrolidem należy wdrożyć u wszystkich osób z bliskiego kontaktu domowego, niezależnie od ich wieku i przebytych szczepień ochronnych.",
          "Profilaktyka poekspozycyjna w krztuścu nie jest skuteczna i nie jest zalecana.",
          "Podaje się amoksycylinę przez 14 dni u każdego domownika.",
          "Jedynym zalecanym postępowaniem jest izolacja bez podawania leków."
        ],
        correct: 1,
        explanation: "Zgodnie z międzynarodowymi i polskimi wytycznymi sanitarno-epidemiologicznymi, chemioprofilaktykę poekspozycyjną makrolidem (najczęściej azytromycyną) zaleca się u wszystkich osób z bliskiego kontaktu domowego z chorym na krztusiec, bez względu na status uodpornienia (ponieważ odporność poszczepienna zanika z czasem, a zaszczepieni mogą bezobjawowo transmitować bakterie do nieuodpornionych niemowląt)."
      }
    ],
    flashcards: [
      { q: "Jakie są 3 fazy kliniczne krztuśca?", a: "1. Faza nieżytowa (kataralna, 1-2 tyg. – najbardziej zakaźna), 2. Faza napadowego kaszlu (paroksyzmalna, 2-4 tyg.), 3. Faza rekonwalescencji (tygodnie/miesiące).", cat: "Pediatria" },
      { q: "Jaka jest charakterystyczna zmiana w morfologii krwi w krztuścu?", a: "Masywna leukocytoza (często 20-50 G/L) z wyraźną przewagą limfocytów (limfocytoza krztuścowa indukowana toksyną PT).", cat: "Pediatria" },
      { q: "Jaki jest antybiotyk pierwszego rzutu w krztuścu u niemowląt?", a: "Azytromycyna doustnie przez 5 dni (makrolid).", cat: "Pediatria" },
      { q: "Dlaczego antybiotyk podany w fazie napadowej nie hamuje natychmiast kaszlu?", a: "Ponieważ nabłonek urzęsiony oskrzeli został już zniszczony przez toksyny; antybiotyk eliminuje jednak bakterie i zakaźność.", cat: "Pediatria" },
      { q: "Kto podlega chemioprofilaktyce poekspozycyjnej po kontakcie z krztuścem w domu?", a: "Wszyscy domownicy z bliskiego kontaktu, bez względu na wiek i przebyte szczepienia.", cat: "Pediatria" }
    ]
  },

  // 115: Rumień zakaźny (Parvovirus B19)
  {
    id: 115,
    filename: "115_rumien_zakazny_parwowirus_b19.json",
    dept: "Pediatria",
    shortTitle: "6-letnie dziecko – 'Spoliczkowane policzki', girlandowata wysypka na kończynach (Rumień zakaźny / Parvovirus B19)",
    diagnosisTitle: "Rumień zakaźny (Erythema infectiosum / Piąta choroba) wywołany przez Parwowirus B19",
    vitals: [
      { label: "HR", val: "88/min", sub: "Prawidłowa", status: "ok" },
      { label: "BP", val: "95/62 mmHg", sub: "Prawidłowe", status: "ok" },
      { label: "SpO2", val: "99%", sub: "Prawidłowa", status: "ok" },
      { label: "RR", val: "20/min", sub: "Prawidłowa", status: "ok" },
      { label: "Temp", val: "36.8°C", sub: "Prawidłowa (bezgorączkowy)", status: "ok" }
    ],
    vitalsObj: { hr: 88, bp: "95/62", spo2: 99, rr: 20, temp: 36.8 },
    story: "6-letnia dziewczynka została przyprowadzona do poradni POZ przez matkę z powodu nagłego pojawienia się intensywnego rumienia na twarzy. Matka przestraszyła się, że dziecko zostało uderzone w przedszkolu, ponieważ policzki wyglądają jak 'spoliczkowane' (żywoczerwony, lśniący, obrzęknięty rumień obu policzków z wyraźną bladością skóry wokół ust i nosa). Dziecko czuje się dobrze, nie gorączkuje, tydzień temu miało łagodny katar. Dziś rano na wyprostnych powierzchniach ramion, ud i pośladków pojawiła się plamisto-grudkowa wysypka, która w części centralnej blednie, tworząc charakterystyczny układ siateczkowaty, koronkowy i girlandowaty. Wysypka nasila się po ciepłej kąpieli i ekspozycji na słońce. W badaniu fizykalnym dziecko w stanie ogólnym bardzo dobrym, gardło blade, brak powiększenia węzłów chłonnych, wątroby i śledziony.",
    labs: [
      {
        category: "Badania serologiczne w kierunku Parvovirus B19",
        items: [
          { name: "Przeciwciała anty-Parvovirus B19 IgM", val: "Dodatnie (+)", norm: "Ujemne", flag: "H" },
          { name: "Przeciwciała anty-Parvovirus B19 IgG", val: "Ujemne (-)", norm: "Ujemne / Dodatnie po kontakcie", flag: "N" },
          { name: "Rozpoznanie kliniczne", val: "Typowy obraz rumienia zakaźnego (badania serologiczne nie są rutynowo konieczne u dzieci bez obciążeń)", norm: "Prawidłowe", flag: "N" }
        ]
      },
      {
        category: "Morfologia krwi i retikulocyty",
        items: [
          { name: "Hemoglobina (Hb)", val: "12.4 g/dL", norm: "11.5–14.5 g/dL", flag: "N" },
          { name: "Hematokryt (Hct)", val: "37%", norm: "34–42%", flag: "N" },
          { name: "Retikulocyty", val: "0.8% (przejściowo nieznacznie obniżone)", norm: "0.5–1.5%", flag: "N" },
          { name: "Płytki krwi (PLT)", val: "245 G/L", norm: "150–450 G/L", flag: "N" },
          { name: "Leukocyty (WBC)", val: "6.2 G/L", norm: "5.0–14.5 G/L", flag: "N" }
        ]
      },
      {
        category: "Wskaźniki zapalne i biochemia",
        items: [
          { name: "CRP", val: "1.8 mg/L", norm: "< 5.0 mg/L", flag: "N" },
          { name: "Bilirubina całkowita", val: "0.5 mg/dL", norm: "0.2–1.0 mg/dL", flag: "N" },
          { name: "Badanie ogólne moczu", val: "Prawidłowe", norm: "Prawidłowe", flag: "N" }
        ]
      }
    ],
    steps: [
      {
        num: 1,
        title: "Rozpoznanie zespołu klinicznego na podstawie wyglądu wysypki",
        task: "Intensywny rumień policzków ('spoliczkowane dziecko') z bladością wokół ust oraz girlandowata/koronkowa wysypka na kończynach u bezgorączkowego dziecka w dobrym stanie to:",
        options: [
          { text: "Rumień zakaźny (piąta choroba / Erythema infectiosum wywołany przez Parwowirus B19)", correct: true, feedback: "Prawidłowo! To klasyczny obraz rumienia zakaźnego wywołanego przez parwowirus B19. Objaw spoliczkowanego dziecka (slapped cheek) oraz koronkowa/siateczkowata wysypka na kończynach są patognomoniczne." },
          { text: "Płonica (szkarlatyna)", correct: false, feedback: "Błąd! W płonicy występuje wysoka gorączka, ostre zapalenie gardła, malinowy język i wysypka 'papier ścierny'." },
          { text: "Odra", correct: false, feedback: "Błąd! W odrze pacjent jest ciężko chory, ma 40°C gorączki, zapalenie spojówek i plamki Koplika." },
          { text: "Toczeń rumieniowaty układowy (SLE)", correct: false, feedback: "Rumień w SLE ma kształt motyla (obejmuje grzbiet nosa i policzki), utrzymuje się tygodniami/miesiącami i towarzyszą mu objawy układowe." }
        ]
      },
      {
        num: 2,
        title: "Zakaźność pacjenta w momencie pojawienia się wysypki",
        task: "Matka pyta, czy dziecko w momencie pojawienia się wysypki na policzkach i kończynach może zarażać inne dzieci w przedszkolu.",
        options: [
          { text: "Dziecko w momencie wystąpienia wysypki NIE JEST JUŻ ZAKAŹNE dla otoczenia i może bezpiecznie uczęszczać do przedszkola", correct: true, feedback: "Kluczowy punkt LEK! Zakaźność parwowirusem B19 występuje w fazie wiremii w okresie zwiastunowym (łagodny katar, ból głowy na 7 dni przed wysypką). W momencie pojawienia się wysypki, która jest zjawiskiem immunologicznym (kompleksy antygen-przeciwciało), wiremia ustępuje i dziecko nie transmituje już wirusa!" },
          { text: "Dziecko jest skrajnie zakaźne przez kolejne 4 tygodnie i wymaga ścisłej kwarantanny", correct: false, feedback: "Błąd! Izolacja w fazie wysypkowej nie ma uzasadnienia epidemiologicznego." },
          { text: "Dziecko zaraża wyłącznie przez dotyk łuszczącej się skóry", correct: false, feedback: "W rumieniu zakaźnym naskórek nie łuszczy się zakaźnie." },
          { text: "Dziecko prątkuje wirusem przez mocz", correct: false, feedback: "Nieprawda – wirus szerzy się drogą kropelkową w fazie wczesnej." }
        ]
      },
      {
        num: 3,
        title: "Zmienność wysypki pod wpływem czynników fizycznych",
        task: "Dlaczego koronkowa wysypka w rumieniu zakaźnym może nawracać i nasilać się przez kilka kolejnych tygodni?",
        options: [
          { text: "Wysypka wykazuje dużą zmienność i nasila się pod wpływem ciepła, gorącej kąpieli, ekspozycji na słońce, wysiłku fizycznego lub stresu emocjonalnego", correct: true, feedback: "Dokładnie tak! Zjawisko to wynika z reaktywności naczyniowej skóry pod wpływem temperatury i bodźców naczynioruchowych. Może nawracać falami przez 1–3 tygodnie, nie świadcząc o nawrocie infekcji." },
          { text: "Oznacza to namnażanie się bakterii w naczyniach chłonnych", correct: false, feedback: "Błąd – to infekcja wirusowa o podłożu immunologicznym." },
          { text: "Świadczy o rozwoju ostrej niewydolności nerek", correct: false, feedback: "Brak związku." },
          { text: "Jest to objaw uczulenia na mydło", correct: false, feedback: "Nie – to typowa cecha wysypki parwowirusowej." }
        ]
      },
      {
        num: 4,
        title: "Powinowactwo wirusa: komórki prekursorowe erytropoezy",
        task: "Jaki jest główny cel komórkowy wirusa Parvovirus B19 w organizmie człowieka?",
        options: [
          { text: "Komórki prekursorowe linii czerwonokrwinkowej w szpiku kostnym posiadające receptor antygenu grupowego P (erytroblasty), co prowadzi do ich lizy i przejściowego zatrzymania erytropoezy", correct: true, feedback: "Doskonale! Parwowirus B19 wiąże się przez antygen P (globotriaosylceramid) z komórkami progenitorowymi erytropoezy w szpiku, wywołując przejściową aplazję linii czerwonokrwinkowej trwającą 7–10 dni (u zdrowych osób bezobjawową z powodu długiego czasu przeżycia erytrocytów 120 dni)." },
          { text: "Trombocyty w śledzionie", correct: false, feedback: "Błąd – parwowirus atakuje prekursory erytrocytów." },
          { text: "Komórki beta wysepek trzustkowych", correct: false, feedback: "Brak związku." },
          { text: "Osteoklasty tkanki kostnej", correct: false, feedback: "Błąd merytoryczny." }
        ]
      },
      {
        num: 5,
        title: "Zagrożenie przełomem aplastycznym u pacjentów z hemolizą",
        task: "U jakiej grupy pacjentów zakażenie Parwowirusem B19 może wywołać zagrażający życiu ostry przełom aplastyczny (aplastyczny kryzys)?",
        options: [
          { text: "U osób z wrodzonymi lub nabytymi niedokrwistościami hemolitycznymi (np. sferocytoza wrodzona, anemia sierpowatokrwista, talasemia), u których czas przeżycia erytrocytów jest skrócony", correct: true, feedback: "Znakomicie! U pacjentów z przewlekłą hemolizą erytrocyty żyją zaledwie 10-20 dni. Zatrzymanie produkcji erytrocytów przez parwowirus na 7-10 dni wywołuje katastrofalny spadek hemoglobiny (nawet do 2-3 g/dL) z retikulocytopenią bliską zeru (przełom aplastyczny wymagający pilnych transfuzji KKCz!)." },
          { text: "U pacjentów z nadciśnieniem tętniczym", correct: false, feedback: "Brak związku." },
          { text: "Tylko u osób ze złamaniami kości", correct: false, feedback: "Bzdura medyczna." },
          { text: "U dzieci z mukowiscydozą", correct: false, feedback: "Mukowiscydoza nie skraca czasu przeżycia erytrocytów." }
        ]
      },
      {
        num: 6,
        title: "Zagrożenie dla kobiet w ciąży: obrzęk uogólniony płodu",
        task: "Nauczycielka dziewczynki jest w 18. tygodniu ciąży i nie chorowała na rumień zakaźny. Jakie jest najgroźniejsze powikłanie zakażenia Parwowirusem B19 u ciężarnej?",
        options: [
          { text: "Ciężka niedokrwistość płodu, uogólniony obrzęk płodu (hydrops foetalis) i wewnątrzmaciczne obumarcie płodu", correct: true, feedback: "Bardzo dobrze! Wirus przenika przez łożysko i niszczy komórki erytropoetyczne płodu (zwłaszcza między 13. a 28. hbd, gdy wątrobowa erytropoeza płodu jest bardzo intensywna). Głęboka niedokrwistość prowadzi do niewydolności krążenia płodu, obrzęku uogólnionego (hydrops fetalis) i poronienia/zgonu wewnątrzmacicznego (leczenie: kordocenteza i dopłodowe przetoczenie krwi)." },
          { text: "Wady wrodzone serca o typie koarktacji aorty", correct: false, feedback: "Parwowirus B19 nie jest typowym teratogenem anatomicznym (nie powoduje wad serca czy rozszczepów), lecz wywołuje aplazję erytropoezy i niewydolność krążenia płodu." },
          { text: "Przedwczesne zarośnięcie ciemiączka", correct: false, feedback: "Brak związku." },
          { text: "Zaćma wrodzona i głuchota", correct: false, feedback: "To zespół różyczki wrodzonej (triada Gregga)." }
        ]
      },
      {
        num: 7,
        title: "Manifestacja zakażenia u dorosłych: artropatia",
        task: "Matka dziecka skarży się na ból i poranną sztywność drobnych stawów dłoni, nadgarstków i kolan bez wysypki. Jaka jest typowa manifestacja zakażenia B19 u dorosłych kobiet?",
        options: [
          { text: "Ostre, symetryczne zapalenie wielostawowe (artropatia parwowirusowa), ustępujące samoistnie w ciągu kilku tygodni bez niszczenia stawów", correct: true, feedback: "Świetnie! U około 50-70% dorosłych kobiet zakażenie B19 przebiega bez klasycznej wysypki na twarzy, lecz manifestuje się symetrycznym zapaleniem drobnych stawów dłoni i kolan, doskonale imitującym rzut reumatoidalnego zapalenia stawów (RZS). Ma charakter samoograniczający." },
          { text: "Zesztywniające zapalenie stawów kręgosłupa", correct: false, feedback: "To przewlekła choroba zapalna uwarunkowana HLA-B27." },
          { text: "Dna moczanowa", correct: false, feedback: "Dna wynika z odkładania kryształów kwasu moczowego, a nie zakażenia wirusowego." },
          { text: "Zwyrodnienie stawów biodrowych", correct: false, feedback: "To choroba degeneracyjna chrząstki." }
        ]
      },
      {
        num: 8,
        title: "Leczenie i profilaktyka",
        task: "Jakie leczenie przyczynowe i profilaktyka szczepionkowa są stosowane w niepowikłanym rumieniu zakaźnym u dzieci?",
        options: [
          { text: "Leczenie jest wyłącznie objawowe (brak leków przeciwwirusowych); nie ma dostępnej szczepionki przeciw Parvovirus B19", correct: true, feedback: "Znakomicie! W niepowikłanym rumieniu zakaźnym u dzieci rokowanie jest doskonałe, nie stosuje się leków, a dziecko nie wymaga izolacji po wystąpieniu wysypki. W ciężkich zakażeniach przewlekłych u osób z niedoborami odporności stosuje się preparaty immunoglobulin (IVIG)." },
          { text: "Gancyklowir dożylnie przez 21 dni", correct: false, feedback: "Błąd! Gancyklowir działa na CMV, nie działa na parwowirusy." },
          { text: "Obowiązkowe szczepienie w 6. roku życia", correct: false, feedback: "Nie istnieje komercyjna szczepionka przeciwko Parvovirus B19." },
          { text: "Wlewy koncentratu płytek krwi", correct: false, feedback: "Brak wskazań – płytki są prawidłowe." }
        ]
      }
    ],
    pathoNodes: [
      {
        title: "1. Transmisja oddechowa i tropizm do antygenu P",
        desc: "Parwowirus B19 zakaża drogą kropelkową i łączy się z receptorem P (globotriaosylceramid) na prekursorach erytropoezy w szpiku kostnym, powodując ich śmierć apoptotyczną i przejściowy spadek retikulocytów.",
        drugTarget: "U pacjentów ze sferocytozą/niedokrwistością hemolityczną: pilne przetoczenie KKCz w przełomie aplastycznym"
      },
      {
        title: "2. Okres wiremii zwiastunowej (okres zakaźności)",
        desc: "W 7.–10. dobie po zakażeniu pojawia się wysoka wiremia, łagodne objawy grypopodobne i wydalanie wirusa. Jest to jedyny moment, w którym chory jest zakaźny dla otoczenia.",
        drugTarget: "Edukacja personelu: unikanie kontaktu kobiet w ciąży z chorymi w fazie wiremicznej"
      },
      {
        title: "3. Odpowiedź immunologiczna i powstawanie wysypki",
        desc: "W 14.–18. dobie pojawiają się swoiste przeciwciała IgM i IgG. Tworzenie kompleksów immunologicznych i ich odkładanie w naczyniach skóry wywołuje 'spoliczkowane policzki' i girlandowatą wysypkę (pacjent przestaje być zakaźny).",
        drugTarget: "Postępowanie objawowe (chłodne kąpiele, unikanie ekspozycji na słońce nasilającej rumień)"
      }
    ],
    dutySummary: "Rumień zakaźny (Parvovirus B19, piąta choroba) cechuje się objawem 'spoliczkowanego dziecka' na twarzy oraz girlandowatą/koronkową wysypką na kończynach u dziecka w dobrym stanie ogólnym. W momencie pojawienia się wysypki pacjent NIE JEST JUŻ ZAKAŹNY! Najgroźniejsze powikłania: przełom aplastyczny u chorych z hemolizą (sferocytoza) oraz nieimmunologiczny obrzęk płodu (hydrops fetalis) u ciężarnych.",
    diffTable: [
      { disease: "Różyczka", diff: "Wysypka różowa drobnoplamista, powiększenie węzłów podpotylicznych i karkowych, brak girlandowatego układu i brak rumienia spoliczkowanego.", test: "Serologia różyczki, powiększenie węzłów chłonnych." },
      { disease: "Odra (morbilli)", diff: "Ciężki stan ogólny, wysoka gorączka, kaszel, katar, zapalenie spojówek, plamki Koplika, zstępująca wysypka gruboplamista zlewająca się.", test: "Ocena kliniczna (stan ogólny), brak plamiek Koplika w rumieniu zakaźnym." },
      { disease: "Toczeń rumieniowaty układowy (SLE)", diff: "Rumień w kształcie motyla (zajmuje grzbiet nosa i policzki, nie omija nosa), obecność przeciwciał ANA, objawy nerkowe/stawowe.", test: "Przeciwciała ANA, anty-dsDNA, brak samoistnego ustąpienia w 2 tyg." },
      { disease: "Reakcja fototoksyczna / oparzenie słoneczne", diff: "Wyraźny wywiad intensywnej ekspozycji na UV, pieczenie i bolesność skóry, brak girlandowatego układu na kończynach.", test: "Wywiad narażenia słonecznego, brak przeciwciał anty-B19 IgM." }
    ],
    lekQuestions: [
      {
        question: "U 6-letniego dziecka z nagłym pojawieniem się żywoczerwonego rumienia na obu policzkach przypominającego ślad po uderzeniu ('spoliczkowane dziecko') oraz siateczkowatej, koronkowej wysypki na ramionach i udach matka pyta o zakaźność dziecka dla innych dzieci w przedszkolu. Wskaż prawidłową odpowiedź:",
        options: [
          "Dziecko jest wysoce zakaźne i musi pozostać w izolacji przez 21 dni.",
          "Dziecko w momencie wystąpienia wysypki nie jest już zakaźne dla otoczenia i może uczęszczać do przedszkola.",
          "Zakaźność pojawia się dopiero po złuszczeniu naskórka na stopach.",
          "Dziecko zaraża wyłącznie drogą pokarmową przez 6 miesięcy.",
          "Należy podać dziecku dawkę azytromycyny, po której po 24 godzinach przestanie zarażać."
        ],
        correct: 1,
        explanation: "W rumieniu zakaźnym (zakażeniu parwowirusem B19) chory jest zakaźny w okresie wiremii poprzedzającej wystąpienie objawów skórnych (faza objawów prodromalnych). W momencie pojawienia się klasycznej wysypki (która jest wynikiem odkładania kompleksów immunologicznych) wiremia ustępuje i dziecko przestaje być zakaźne dla otoczenia, w związku z czym nie ma wskazań do izolacji."
      },
      {
        question: "Zakażenie parwowirusem B19 u pacjenta z wrodzoną sferocytozą lub niedokrwistością sierpowatokrwinkową stwarza bezpośrednie zagrożenie:",
        options: [
          "Ostrą kwasicą ketonową.",
          "Przełomem aplastycznym ze skrajną retikulocytopenią i zagrażającym życiu spadkiem stężenia hemoglobiny.",
          "Zawałem krwotocznym nadnerczy (zespołem Waterhouse'a-Friderichsena).",
          "Masywnym krwawieniem z żylaków przełyku.",
          "Pęknięciem tętniaka aorty brzusznej."
        ],
        correct: 1,
        explanation: "Parwowirus B19 wykazuje selektywny tropizm do komórek prekursorowych erytropoezy w szpiku kostnym (komórek progenitorowych z receptorem P), prowadząc do ich apoptozy i przejściowego zahamowania erytropoezy na 7–10 dni. U osób z przewlekłą hemolizą (skróconym czasem przeżycia erytrocytów) nagłe zatrzymanie produkcji krwinek wywołuje gwałtowny, zagrażający życiu przełom aplastyczny z brakiem retikulocytów."
      },
      {
        question: "U nieszczepionej seroujemnej kobiety w II trymestrze ciąży zakażenie parwowirusem B19 może doprowadzić do:",
        options: [
          "Wrodzonego zwężenia odźwiernika u noworodka.",
          "Ciężkiej niedokrwistości płodu, uogólnionego obrzęku płodu (hydrops foetalis) i wewnątrzmacicznego obumarcia płodu.",
          "Triady Sabina-Feldmana.",
          "Zarośnięcia przełyku z przetoką tchawiczą.",
          "Wrodzonego wodonercza."
        ],
        correct: 1,
        explanation: "Wirus B19 przenika przez barierę łożyskową i zakaża komórki prekursorowe erytrocytów w wątrobie płodu. Głęboka niedokrwistość prowadzi do niewydolności krążenia o wysokim rzucie, obrzęku uogólnionego płodu (hydrops fetalis) oraz zgonu wewnątrzmacicznego (zwłaszcza przy zakażeniu przed 20.–28. tygodniem ciąży)."
      }
    ],
    flashcards: [
      { q: "Jaki patogen wywołuje rumień zakaźny (piątą chorobę)?", a: "Parwowirus B19 (parvovirus B19).", cat: "Pediatria" },
      { q: "Jak wygląda charakterystyczna wysypka w rumieniu zakaźnym?", a: "Żywoczerwony rumień na policzkach ('spoliczkowane dziecko') oraz girlandowata, koronkowa lub siateczkowata wysypka na kończynach.", cat: "Pediatria" },
      { q: "Kiedy chory na rumień zakaźny przestaje być zakaźny dla otoczenia?", a: "W momencie pojawienia się wysypki na skórze (wysypka ma podłoże immunologiczne, wiremia już minęła).", cat: "Pediatria" },
      { q: "Dlaczego Parvovirus B19 jest groźny dla pacjentów ze sferocytozą?", a: "Niszczy prekursory erytrocytów w szpiku, wywołując u osób ze skróconym czasem przeżycia krwinek ostry przełom aplastyczny.", cat: "Pediatria" },
      { q: "Jakie jest najgroźniejsze powikłanie zakażenia Parwowirusem B19 w ciąży?", a: "Ciężka niedokrwistość płodu, uogólniony obrzęk płodu (hydrops fetalis) i zgon wewnątrzmaciczny.", cat: "Pediatria" }
    ]
  },

  // 116: Gorączka trzydniowa (HHV-6)
  {
    id: 116,
    filename: "116_goraczka_trzydniowa_hhv6.json",
    dept: "Pediatria",
    shortTitle: "10-miesięczne niemowlę – Wysoka gorączka przez 3 dni i nagła wysypka po jej spadku (Gorączka trzydniowa / Rumień nagły)",
    diagnosisTitle: "Rumień nagły / Gorączka trzydniowa (Exanthema subitum / Szósta choroba) wywołana przez ludzki herpeswirus typ 6 (HHV-6)",
    vitals: [
      { label: "HR", val: "118/min", sub: "Prawidłowa po normalizacji temp.", status: "ok" },
      { label: "BP", val: "88/52 mmHg", sub: "Prawidłowe", status: "ok" },
      { label: "SpO2", val: "99%", sub: "Prawidłowa", status: "ok" },
      { label: "RR", val: "26/min", sub: "Prawidłowa", status: "ok" },
      { label: "Temp", val: "36.7°C (wcześniej do 39.8°C)", sub: "Normalizacja temperatury", status: "ok" }
    ],
    vitalsObj: { hr: 118, bp: "88/52", spo2: 99, rr: 26, temp: 36.7 },
    story: "10-miesięczny chłopiec został przyniesiony do lekarza POZ przez rodziców w 4. dobie choroby. Przez ostatnie 3 dni dziecko miało nagle występującą, wysoką gorączkę do 39.8°C, która słabo reagowała na paracetamol, jednak pomimo wysokiej gorączki stan ogólny dziecka był zaskakująco dobry (chętnie piło, bawiło się w okresach działania leków). Wcześniej wykonane badanie ogólne moczu i CRP były prawidłowe. Dziś rano gorączka nagle i całkowicie ustąpiła (temperatura 36.7°C), a na tułowiu i szyi pojawiła się bladoróżowa, drobnoplamista i plamisto-grudkowa wysypka, która nie zlewa się ze sobą i blednie pod uciskiem. W badaniu fizykalnym: dziecko wesołe, skóra tułowia pokryta licznymi bladoróżowymi plamkami wielkości 2–4 mm, pojedyncze wykwity na ramionach i udach, twarz i podudzia wolne od zmian. Gardło z niewielkim przekrwieniem, błony bębenkowe prawidłowe, węzły chłonne potyliczne i zauszne drobne, niebolesne.",
    labs: [
      {
        category: "Morfologia krwi i wskaźniki zapalne",
        items: [
          { name: "Leukocyty (WBC)", val: "4.8 G/L (początkowo prawidłowe/leukopenia z neutropenią)", norm: "6.0–17.5 G/L", flag: "L" },
          { name: "Limfocyty", val: "66%", norm: "45–70%", flag: "N" },
          { name: "Neutrofile", val: "24%", norm: "25–50%", flag: "L" },
          { name: "Płytki krwi (PLT)", val: "220 G/L", norm: "150–450 G/L", flag: "N" },
          { name: "CRP", val: "4.2 mg/L", norm: "< 5.0 mg/L", flag: "N" }
        ]
      },
      {
        category: "Badania wykluczające inne ogniska infekcji",
        items: [
          { name: "Badanie ogólne moczu", val: "Białko nieobecne, leukocyty 1–2 wpw, azotyny ujemne", norm: "Prawidłowe", flag: "N" },
          { name: "Posiew moczu", val: "Jałowy", norm: "Jałowy", flag: "N" },
          { name: "Otroskopia obu uszu", val: "Błony bębenkowe perłowe, refleks świetlny zachowany", norm: "Prawidłowe", flag: "N" }
        ]
      },
      {
        category: "Etiologia wirusowa",
        items: [
          { name: "Czynnik etiologiczny", val: "Ludzki herpeswirus typ 6 (HHV-6) / rzadziej HHV-7", norm: "Flora fizjologiczna", flag: "N" },
          { name: "Rozpoznanie", val: "Kliniczne na podstawie charakterystycznej dynamiki objawów", norm: "Kliniczne", flag: "N" }
        ]
      }
    ],
    steps: [
      {
        num: 1,
        title: "Kluczowa sekwencja objawów w gorączce trzydniowej",
        task: "Wysoka gorączka trwająca dokładnie 3–4 dni u niemowlęcia przy dobrym stanie ogólnym, po której następuje gwałtowny spadek temperatury i NATYCHMIASTOWE pojawienie się drobnoplamistej wysypki na tułowiu, jest patognomoniczna dla:",
        options: [
          { text: "Rumienia nagłego (gorączki trzydniowej / szóstej choroby wywołanej przez HHV-6)", correct: true, feedback: "Prawidłowo! Sekwencja: 3–4 dni wysokiej gorączki bez uchwytnego źródła, po czym gwałtowny spadek temperatury i równoległe pojawienie się bladoróżowej wysypki na tułowiu jest unikalną i patognomoniczną cechą rumienia nagłego (exanthema subitum)." },
          { text: "Odry", correct: false, feedback: "Błąd! W odrze wysypka pojawia się na szczycie gorączki (nie po jej ustąpieniu!), ma charakter zstępujący od twarzy i towarzyszy jej zapalenie spojówek i katar." },
          { text: "Ospy wietrznej", correct: false, feedback: "Błąd! W ospie występują swędzące pęcherzyki na owłosionej skórze głowy i tułowiu." },
          { text: "Gorączki reumatycznej", correct: false, feedback: "Brak związku klinicznego u niemowlęcia." }
        ]
      },
      {
        num: 2,
        title: "Najczęstsze powikłanie w fazie gorączkowej",
        task: "Z powodu gwałtownego skoku temperatury do blisko 40°C w pierwszych 48 godzinach życia wirus HHV-6 jest jedną z najczęstszych przyczyn jakiego powikłania neurologicznego u niemowląt?",
        options: [
          { text: "Drgawek gorączkowych (związanych z gwałtownym tempem narastania temperatury i neurotropizmem HHV-6)", correct: true, feedback: "Dokładnie tak! Zakażenie pierwotne HHV-6 odpowiada za około 20-30% wszystkich pierwszych epizodów drgawek gorączkowych u niemowląt i małych dzieci (między 6. a 18. miesiącem życia)." },
          { text: "Porażenia poprzecznego rdzenia kręgowego", correct: false, feedback: "Błąd merytoryczny." },
          { text: "Wodogłowia normotensyjnego", correct: false, feedback: "Choroba osób starszych." },
          { text: "Zespołu Guillaina-Barrégo", correct: false, feedback: "Rzadkie powikłanie innych infekcji (Campylobacter, CMV)." }
        ]
      },
      {
        num: 3,
        title: "Lokalizacja i cechy morfologiczne wysypki",
        task: "Jakie cechy charakteryzują wykwity skórne w rumieniu nagłym?",
        options: [
          { text: "Bladoróżowe, drobne plamki i grudki o średnicy 2–5 mm, zlokalizowane głównie na tułowiu i szyi, rzadziej na ramionach, blednące pod uciskiem, niepozostawiające przebarwień ani łuszczenia", correct: true, feedback: "Znakomicie! Wysypka w rumieniu nagłym dominuje na tułowiu i szyi (rzadko zajmuje twarz i podudzia), jest drobnoplamisto-grudkowa, bladoróżowa, nie swędzi i ustępuje samoistnie w ciągu 24–48 godzin bez śladu." },
          { text: "Grube, zlewające się wykwity ciemnoczerwone na twarzy z łuszczeniem", correct: false, feedback: "To opis wysypki odrowej." },
          { text: "Wybroczyny krwotoczne niemające tendencji do blednięcia pod uciskiem", correct: false, feedback: "To wybroczyny w sepsie meningokokowej – wymagają natychmiastowej antybiotykoterapii!" },
          { text: "Pęcherze wypełnione treścią ropną", correct: false, feedback: "To wykwity liszajca lub ospy." }
        ]
      },
      {
        num: 4,
        title: "Czynnik etiologiczny",
        task: "Jaki patogen odpowiada za ponad 90% przypadków gorączki trzydniowej?",
        options: [
          { text: "Ludzki herpeswirus typ 6 (HHV-6, podtyp B), rzadziej ludzki herpeswirus typ 7 (HHV-7)", correct: true, feedback: "Doskonale! HHV-6B jest głównym sprawcą rumienia nagłego (szóstej choroby). Prawie 100% populacji przechodzi to zakażenie w pierwszych 2 latach życia." },
          { text: "Parwowirus B19", correct: false, feedback: "Wywołuje piątą chorobę (rumień zakaźny)." },
          { text: "Wirus odry (Morbillivirus)", correct: false, feedback: "Wywołuje odrę." },
          { text: "Wirus Coxsackie A16", correct: false, feedback: "Wywołuje HFMD." }
        ]
      },
      {
        num: 5,
        title: "Postępowanie farmakologiczne i błędy jatrogenne",
        task: "Częstym błędem w pierwszych 3 dobach wysokiej gorączki bez innych objawów jest nieuzasadnione włączenie antybiotyku. Co dzieje się, gdy lekarz w 3. dobie poda dziecku amoksycylinę?",
        options: [
          { text: "Pojawienie się wysypki w 4. dobie (która jest naturalnym etapem choroby wirusowej) zostaje błędnie zinterpretowane jako 'alergia na penicylinę', co prowadzi do nieuzasadnionego przypięcia dziecku fałszywej łaty alergika na całe życie", correct: true, feedback: "Kluczowy błąd jatrogenny! Jeśli w fazie gorączkowej niepotrzebnie włączy się amoksycylinę, naturalny wysiew plamek w 4. dobie zostaje wzięty za alergię na antybiotyk. Dziecko ma niepotrzebnie zakazaną całą grupę bezpiecznych beta-laktamów!" },
          { text: "Antybiotyk natychmiast cofa wysypkę", correct: false, feedback: "Nieprawda – wysypka i tak się pojawi." },
          { text: "Dojdzie do perforacji żołądka", correct: false, feedback: "Brak związku." },
          { text: "Antybiotyk zapobiega drgawkom gorączkowym", correct: false, feedback: "Błąd – antybiotyk nie obniża temperatury ani nie działa przeciwdrgawkowo." }
        ]
      },
      {
        num: 6,
        title: "Plamki Nagayamy w jamie ustnej",
        task: "U części dzieci z rumieniem nagłym na granicy podniebienia miękkiego i języczka stwierdza się rumieniowe grudki. Jak nazywa się ten objaw?",
        options: [
          { text: "Plamki Nagayamy", correct: true, feedback: "Świetnie! Plamki Nagayamy (Nagayama spots) to rumieniowe grudki na błonie śluzowej podniebienia miękkiego i języczka, opisywane u części pacjentów z zakażeniem HHV-6 w fazie gorączkowej." },
          { text: "Plamki Koplika", correct: false, feedback: "Plamki Koplika występują na policzkach w odrze." },
          { text: "Objaw Pastii", correct: false, feedback: "To linijne wybroczyny w fałdach w płonicy." },
          { text: "Afty Bednara", correct: false, feedback: "To ubytki na podniebieniu twardym u niemowląt wywołane urazem mechanicznym." }
        ]
      },
      {
        num: 7,
        title: "Leczenie z wyboru",
        task: "Jakie leczenie jest zalecane w niepowikłanym przebiegu gorączki trzydniowej u niemowlęcia?",
        options: [
          { text: "Wyłącznie leczenie objawowe: leki przeciwgorączkowe (paracetamol, ibuprofen) w odpowiednich dawkach przeliczonych na masę ciała oraz dbałość o nawodnienie doustne", correct: true, feedback: "Bardzo dobrze! Choroba ma charakter całkowicie łagodny i samoograniczający. Nie wymaga leków przeciwwirusowych ani antybiotyków. Kluczowe jest skuteczne zbijanie gorączki w pierwszych 3 dobach i uspokojenie zaniepokojonych rodziców." },
          { text: "Gancyklowir w monoterapii dożylnej", correct: false, feedback: "Gancyklowir stosuje się w ciężkich infekcjach HHV-6 u pacjentów po przeszczepieniu szpiku, nie u zdrowych niemowląt." },
          { text: "Glikokortykosteroidy w wysokiej dawce", correct: false, feedback: "Błąd – brak jakichkolwiek wskazań." },
          { text: "Kwas acetylosalicylowy co 4 godziny", correct: false, feedback: "Śmiertelny błąd! Salicylany u niemowląt są bezwzględnie zakazane z uwagi na zespół Reye'a!" }
        ]
      },
      {
        num: 8,
        title: "Rokowanie i stan uodpornienia",
        task: "Jakie jest rokowanie po przebyciu gorączki trzydniowej i czy choroba może nawracać?",
        options: [
          { text: "Rokowanie jest doskonałe; przebycie zakażenia pozostawia trwałą odporność na HHV-6 (choć rzadko możliwy jest drugi epizod wywołany przez HHV-7)", correct: true, feedback: "Znakomicie! Rokowanie jest pełne. Podobnie jak inne herpeswirusy, HHV-6 przechodzi w stan latencji w komórkach jednojądrzastych krwi, ale u osób immunokompetentnych nie daje nawrotów objawowych." },
          { text: "Choroba nawraca co miesiąc przez całe dzieciństwo", correct: false, feedback: "Nieprawda – nawroty u osób zdrowych nie występują." },
          { text: "Pozostawia trwałe porażenie czterokończynowe", correct: false, feedback: "Bzdura medyczna." },
          { text: "Wymaga usunięcia migdałków podniebiennych w wieku 2 lat", correct: false, feedback: "Brak jakichkolwiek wskazań." }
        ]
      }
    ],
    pathoNodes: [
      {
        title: "1. Wniknięcie HHV-6 przez ślinę i zakażenie limfocytów CD4+",
        desc: "HHV-6 wnika przez jamę ustną i wiąże się przez receptor CD46 z limfocytami T CD4+, monocytami i komórkami nabłonka, namnażając się w śliniankach i tkance limfatycznej.",
        drugTarget: "Leczenie przeciwgorączkowe (paracetamol, ibuprofen przeliczane na masę ciała w fazie ostrej)"
      },
      {
        title: "2. Masywny wyrzut pirogennych cytokin (IL-1, TNF, IFN-gamma)",
        desc: "Wiremia pierwotna indukuje gwałtowną syntezę endogennych pirogenów, co wywołuje nagłą gorączkę do 40°C przy ubogich objawach narządowych, stwarzając ryzyko drgawek gorączkowych.",
        drugTarget: "Odpowiednie nawadnianie doustne zapobiegające odwodnieniu w wysokiej gorączce"
      },
      {
        title: "3. Spadek gorączki i wysypka wywołana kompleksem immunologicznym",
        desc: "Wraz z pojawieniem się swoistych przeciwciał i wygaszeniem wiremii dochodzi do gwałtownego spadku temperatury. Rozszerzenie naczyń skóry w odpowiedzi na cytokiny skutkuje pojawieniem się bladoróżowych plamek na tułowiu.",
        drugTarget: "Edukacja rodziców i zaniechanie zbędnej antybiotykoterapii"
      }
    ],
    dutySummary: "Gorączka trzydniowa (rumień nagły, HHV-6, szósta choroba) to wysoka gorączka do 40°C trwająca 3 dni u niemowlęcia w dobrym stanie ogólnym, która nagle ustępuje, a równolegle na tułowiu pojawia się bladoróżowa drobnoplamista wysypka. Główne ryzyko fazy ostrej to drgawki gorączkowe. ZAKAZ niepotrzebnej antybiotykoterapii (unikaj błędnego rozpoznania alergii na amoksycylinę!). Leczenie jest czysto objawowe.",
    diffTable: [
      { disease: "Zakażenie układu moczowego (ZUM)", diff: "Gorączka bez innych objawów, ale w badaniu moczu obecna leukocyturia i azotyny, podwyższone CRP/PCT, brak wysypki po spadku gorączki.", test: "Badanie ogólne i posiew moczu z cewnika/nakłucia." },
      { disease: "Odra (morbilli)", diff: "Wysypka pojawia się na szczycie gorączki (nie po jej spadku), obecne plamki Koplika, suchy kaszel, katar i zapalenie spojówek.", test: "Czas pojawienia się wysypki, stan ogólny pacjenta, plamki Koplika." },
      { disease: "Płonica (szkarlatyna)", diff: "Zapalenie gardła, malinowy język, szorstka wysypka (papier ścierny), linie Pastii, gorączka nie spada przed wysypką.", test: "Szybki test Strep-A, obraz gardła i języka." },
      { disease: "Alergia na antybiotyk", diff: "Występuje po podaniu leku, często ze świądem, pokrzywką lub obrzękiem naczynioruchowym; nie poprzedza jej typowy 3-dniowy cykl gorączkowy z nagłym kryzysem.", test: "Wywiad farmakologiczny, charakter zmian (pokrzywka vs plamki)." }
    ],
    lekQuestions: [
      {
        question: "10-miesięczne niemowlę gorączkowało od 3 dni do 39.5°C bez żadnych innych objawów w badaniu fizykalnym. W 4. dobie temperatura ciała gwałtownie spadła do normy, a na tułowiu pojawiła się bladoróżowa drobnoplamista wysypka. Najbardziej prawdopodobnym rozpoznaniem jest:",
        options: [
          "Odra.",
          "Rumień nagły (gorączka trzydniowa wywołana przez HHV-6).",
          "Płonica.",
          "Ospa wietrzna.",
          "Zakażenie rotawirusowe."
        ],
        correct: 1,
        explanation: "Charakterystyczny przebieg z 3-dniową wysoką gorączką u niemowlęcia przy dobrym stanie ogólnym, po której następuje nagły spadek temperatury połączony z jednoczesnym pojawieniem się bladoróżowej wysypki plamisto-grudkowej na tułowiu (z oszczędzeniem twarzy i kończyn) jest obrazem patognomonicznym dla rumienia nagłego (gorączki trzydniowej / szóstej choroby, wywołanej przez ludzki herpeswirus typ 6 - HHV-6)."
      },
      {
        question: "Który z poniższych wirusów jest najczęstszym czynnikiem etiologicznym gorączki trzydniowej (rumienia nagłego)?",
        options: [
          "Wirus Epsteina-Barr (EBV).",
          "Ludzki herpeswirus typ 6 (HHV-6).",
          "Parwowirus B19.",
          "Wirus Coxsackie A16.",
          "Wirus mięczaka zakaźnego."
        ],
        correct: 1,
        explanation: "Czynnikiem etiologicznym rumienia nagłego (exanthema subitum) w zdecydowanej większości przypadków (>90%) jest ludzki wirus opryszczki typu 6 (HHV-6, podtyp B). Znacznie rzadziej chorobę może wywołać pokrewny wirus HHV-7."
      },
      {
        question: "Jakie jest najczęstsze powikłanie występujące w fazie wysokiej gorączki w przebiegu rumienia nagłego u niemowląt?",
        options: [
          "Drgawki gorączkowe.",
          "Przełom aplastyczny szpiku.",
          "Ostre kłębuszkowe zapalenie nerek.",
          "Wiotka klatka piersiowa.",
          "Zatorowość tętnicy płucnej."
        ],
        correct: 0,
        explanation: "Wysoka gorączka o nagłym początku w przebiegu pierwotnej infekcji HHV-6 jest jedną z najczęstszych przyczyn wystąpienia drgawek gorączkowych u niemowląt i małych dzieci (odpowiada za ok. 20–30% pierwszych epizodów drgawek gorączkowych w tej grupie wiekowej)."
      }
    ],
    flashcards: [
      { q: "Jaka jest charakterystyczna dynamika objawów w gorączce trzydniowej?", a: "Wysoka gorączka przez 3 dni u niemowlęcia w dobrym stanie, po czym nagły spadek temperatury i NATYCHMIASTOWE pojawienie się bladoróżowej wysypki na tułowiu.", cat: "Pediatria" },
      { q: "Jaki wirus wywołuje rumień nagły (szóstą chorobę)?", a: "Ludzki herpeswirus typ 6 (HHV-6), rzadziej HHV-7.", cat: "Pediatria" },
      { q: "Gdzie lokalizuje się wysypka w rumieniu nagłym?", a: "Głównie na tułowiu i szyi, w niewielkim stopniu na ramionach/udach, oszczędza twarz.", cat: "Pediatria" },
      { q: "Jakie jest najczęstsze powikłanie ostrej fazy gorączkowej HHV-6?", a: "Drgawki gorączkowe (wynikające z gwałtownego wzrostu temperatury).", cat: "Pediatria" },
      { q: "Jaki jest najczęstszy błąd jatrogenny w gorączce trzydniowej?", a: "Niepotrzebne podanie antybiotyku w fazie gorączkowej i uznanie późniejszej wysypki za 'alergię na penicylinę'.", cat: "Pediatria" }
    ]
  },

  // 117: Choroba bostońska (HFMD)
  {
    id: 117,
    filename: "117_choroba_bostonska_hfmd.json",
    dept: "Pediatria",
    shortTitle: "3-letnie dziecko – Pęcherzyki na dłoniach, podeszwach stóp i afty w jamie ustnej (Choroba dłoni, stóp i ust / HFMD)",
    diagnosisTitle: "Choroba dłoni, stóp i jamy ustnej (Hand, Foot, and Mouth Disease - HFMD / 'Choroba bostońska') wywołana przez enterowirusy (Coxsackie A16 / EV71)",
    vitals: [
      { label: "HR", val: "116/min", sub: "Prawidłowa dla wieku", status: "ok" },
      { label: "BP", val: "92/56 mmHg", sub: "Prawidłowe", status: "ok" },
      { label: "SpO2", val: "98%", sub: "Prawidłowa", status: "ok" },
      { label: "RR", val: "22/min", sub: "Prawidłowa", status: "ok" },
      { label: "Temp", val: "38.2°C", sub: "Stan podgorączkowy / gorączka", status: "warn" }
    ],
    vitalsObj: { hr: 116, bp: "92/56", spo2: 98, rr: 22, temp: 38.2 },
    story: "3-letnia dziewczynka uczęszczająca do żłobka została przyprowadzona do lekarza z powodu niechęci do jedzenia i picia, ślinotoku, płaczliwości oraz wykwitów na skórze rąk i stóp. Choroba rozpoczęła się 2 dni temu stanem podgorączkowym do 38.4°C i bólem gardła. W badaniu jamy ustnej: na błonie śluzowej policzków, podniebieniu miękkim, języku i dziąsłach widoczne są liczne drobne, bolesne nadżerki i pęcherzyki otoczone czerwoną obwódką (herpangina). W badaniu dermatologicznym: na dłoniowej powierzchni rąk, podeszwach stóp oraz na pośladkach obecne są charakterystyczne, podłużne, szarawe pęcherzyki o owalnym kształcie ('ziarna ryżu') na podłożu rumieniowym, niepowodujące nasilonego świądu. Na skórze owłosionej głowy i tułowia brak zmian.",
    labs: [
      {
        category: "Badania wirusologiczne i mikrobiologiczne",
        items: [
          { name: "Czynnik etiologiczny", val: "Enterowirusy z rodziny Picornaviridae (najczęściej Coxsackie A16, rzadziej Enterowirus 71 - EV71, Coxsackie A6)", norm: "Flora fizjologiczna", flag: "N" },
          { name: "RT-PCR enterowirusów (wymaz z gardła / płyn z pęcherzyka)", val: "Dodatni dla Coxsackie A16 (wskazany tylko w przypadkach powikłanych)", norm: "Ujemny", flag: "H" },
          { name: "Posiew z gardła w kierunku GAS", val: "Flora fizjologiczna, brak S. pyogenes", norm: "Flora fizjologiczna", flag: "N" }
        ]
      },
      {
        category: "Morfologia krwi i wskaźniki zapalne",
        items: [
          { name: "Leukocyty (WBC)", val: "8.4 G/L", norm: "5.5–15.5 G/L", flag: "N" },
          { name: "Limfocyty / Neutrofile", val: "52% / 40%", norm: "45–65% / 30–50%", flag: "N" },
          { name: "Płytki krwi (PLT)", val: "280 G/L", norm: "150–450 G/L", flag: "N" },
          { name: "CRP", val: "6.8 mg/L (niewielki odczyn)", norm: "< 5.0 mg/L", flag: "H" }
        ]
      },
      {
        category: "Stan nawodnienia i elektrolity",
        items: [
          { name: "Ciężar właściwy moczu", val: "1.022 (zagęszczony z powodu słabszego pojenia)", norm: "1.010–1.025", flag: "N" },
          { name: "Sód / Potas", val: "139 / 4.2 mmol/L", norm: "135–145 / 3.5–5.0", flag: "N" },
          { name: "Kreatynina surowicy", val: "0.32 mg/dL", norm: "0.20–0.45 mg/dL", flag: "N" }
        ]
      }
    ],
    steps: [
      {
        num: 1,
        title: "Identyfikacja jednostki chorobowej na podstawie lokalizacji zmian",
        task: "Bolesne owrzodzenia w jamie ustnej oraz charakterystyczne podłużne pęcherzyki na dłoniach, podeszwach stóp i pośladkach u małego dziecka to:",
        options: [
          { text: "Choroba dłoni, stóp i jamy ustnej (HFMD / 'choroba bostońska')", correct: true, feedback: "Prawidłowo! To klasyczny obraz Hand, Foot, and Mouth Disease (HFMD) wywołanej przez enterowirusy (najczęściej Coxsackie A16). Zmiany pęcherzykowe mają układ podłużny ('ziarna ryżu') i dominują na dłoniach, podeszwach i pośladkach." },
          { text: "Ospa wietrzna", correct: false, feedback: "Błąd! W ospie wietrznej pęcherzyki dominują na tułowiu i owłosionej skórze głowy, silnie swędzą i wykazują polimorfizm (krople rosy, strupy)." },
          { text: "Opryszczkowe zapalenie jamy ustnej i dziąseł (HSV)", correct: false, feedback: "Błąd! W pierwotnym zakażeniu HSV-1 dochodzi do masywnego obrzęku i krwawienia dziąseł, ale brak jest wykwitów na dłoniach i stopach." },
          { text: "Aftoza nawrotowa Mikulicza", correct: false, feedback: "Afty nawrotowe nie powodują pęcherzyków na dłoniach ani podeszwach stóp." }
        ]
      },
      {
        num: 2,
        title: "Czynniki etiologiczne i ryzyko powikłań neurologicznych",
        task: "Jaki enterowirus odpowiedzialny za ogniska HFMD w Azji wiąże się ze zwiększonym ryzykiem ciężkich powikłań neurologicznych (aseptyczne ZOMR, zapalenie pnia mózgu, obrzęk płuc)?",
        options: [
          { text: "Enterowirus 71 (EV71)", correct: true, feedback: "Dokładnie tak! Choć większość łagodnych przypadków HFMD w Europie wywołuje Coxsackie A16 i A6, zakażenia Enterowirusem 71 (EV71) mają charakter neurotropowy i mogą prowadzić do ciężkiego zapalenia mózgu, ostrego wiotkiego porażenia i zgonu." },
          { text: "Rotawirus grupy A", correct: false, feedback: "Rotawirus wywołuje biegunkę odwadniającą." },
          { text: "Wirus grypy typu A", correct: false, feedback: "Brak związku." },
          { text: "Wirus zapalenia wątroby typu A (HAV)", correct: false, feedback: "HAV wywołuje ostre WZW, nie HFMD." }
        ]
      },
      {
        num: 3,
        title: "Główne zagrożenie kliniczne u małych dzieci",
        task: "Co jest najczęstszą przyczyną konieczności hospitalizacji małych dzieci z HFMD w polskich szpitalach?",
        options: [
          { text: "Odwodnienie spowodowane silnym bólem jamy ustnej (odynofagia) i odmową przyjmowania płynów", correct: true, feedback: "Znakomicie! Bolesne nadżerki na języku i podniebieniu sprawiają, że małe dzieci kategorycznie odmawiają picia i jedzenia. Odwodnienie jest najczęstszym powikłaniem wymagającym dożylnej płynoterapii." },
          { text: "Niewydolność nerek wymagająca hemodializ", correct: false, feedback: "HFMD nie uszkadza kłębuszków nerkowych." },
          { text: "Pęknięcie śledziony", correct: false, feedback: "To powikłanie mononukleozy EBV." },
          { text: "Masywne krwawienie z dróg rodnych", correct: false, feedback: "Niedorzeczne." }
        ]
      },
      {
        num: 4,
        title: "Leczenie objawowe i nawadnianie",
        task: "Jakie postępowanie lecznicze i dietetyczne zalecisz rodzicom 3-letniego dziecka z bolesnymi nadżerkami w jamie ustnej?",
        options: [
          { text: "Podawanie leków przeciwbólowych (paracetamol, ibuprofen), chłodnych, obojętnych płynów (woda, mleko, lody), unikanie potraw kwaśnych, słonych i gorących oraz miejscowe preparaty znieczulające/powlekające", correct: true, feedback: "Prawidłowo! Leczenie HFMD jest czysto objawowe. Skuteczna analgezja umożliwia pojenie. Chłodne pokarmy (np. lody, jogurty) łagodzą ból, podczas gdy soki cytrusowe i słone potrawy wywołują silne pieczenie." },
          { text: "Antybiotykoterapia amoksycyliną w zawiesinie doustnie", correct: false, feedback: "Błąd kardynalny! HFMD to choroba wirusowa, antybiotyk jest całkowicie nieskuteczny." },
          { text: "Pędzlowanie jamy ustnej stężonym spirytusem salicylowym", correct: false, feedback: "Okrutny błąd powodujący poparzenie chemiczne śluzówki!" },
          { text: "Dieta bogata w pikantne przyprawy i ocet", correct: false, feedback: "Zwiększy ból i odmowę picia." }
        ]
      },
      {
        num: 5,
        title: "Późne powikłanie dermatologiczne: onychomadesis",
        task: "Po 4–8 tygodniach od przebycia HFMD matka zauważa bezbolesne odwarstwianie i odpadanie płytek paznokciowych u nasady u dziecka (onychomadesis). Co należy przekazać matce?",
        options: [
          { text: "Jest to łagodne, późne powikłanie HFMD (onychomadesis), wynikające z przejściowego zahamowania podziałów macierzy paznokcia przez wirus; paznokcie odrosną w pełni bez leczenia", correct: true, feedback: "Doskonale! Onychomadesis (złuszczanie płytek paznokciowych od macierzy) oraz linie Beau to typowe, łagodne powikłanie późne enterowirusowego HFMD (zwłaszcza Coxsackie A6). Płytki paznokciowe samoistnie odrastają w ciągu kilku miesięcy." },
          { text: "Konieczne jest natychmiastowe chirurgiczne zerwanie wszystkich paznokci", correct: false, feedback: "Karygodny błąd – paznokcie odrosną samoistnie!" },
          { text: "Świadczy to o ciężkiej uogólnionej grzybicy paznokci wymagającej leczenia terbinafiną", correct: false, feedback: "Błąd – to powikłanie wirusowe, nie grzybica." },
          { text: "Jest to objaw wrodzonej łamliwości kości", correct: false, feedback: "Brak związku." }
        ]
      },
      {
        num: 6,
        title: "Drogi transmisji enterowirusów",
        task: "Jakimi drogami przenoszą się enterowirusy wywołujące chorobę dłoni, stóp i jamy ustnej?",
        options: [
          { text: "Drogą kropelkową (wydzielina z nosogardła) oraz drogą fekalno-oralną (stolec, brudne ręce), a także przez bezpośredni kontakt z płynem z pęcherzyków", correct: true, feedback: "Świetnie! Enterowirusy szerzą się zarówno przez aerozol oddechowy, jak i drogą pokarmową. Co istotne, wirus może być wydalany ze stolcem przez wiele tygodni (nawet 4–8 tyg.) po ustąpieniu objawów klinicznych, co sprzyja epidemiozm w żłobkach i przedszkolach." },
          { text: "Wyłącznie przez ukąszenie kleszcza Ixodes ricinus", correct: false, feedback: "Błąd – enterowirusy nie są odkleszczowe." },
          { text: "Tylko przez krew transfuzjogenną", correct: false, feedback: "Nie jest to główna droga szerzenia enterowirusów." },
          { text: "Poprzez wdychanie kurzu z sierści psa", correct: false, feedback: "Brak związku." }
        ]
      },
      {
        num: 7,
        title: "Różnicowanie z herpanginą",
        task: "Czym różni się izolowana herpangina od pełnoobjawowej choroby dłoni, stóp i jamy ustnej (HFMD)?",
        options: [
          { text: "W herpanginie bolesne pęcherzyki i owrzodzenia ograniczają się wyłącznie do tylnej ściany gardła, łuków podniebiennych i migdałków, a na skórze dłoni i stóp NIE MA żadnych wykwitów", correct: true, feedback: "Bardzo dobrze! Herpangina (również wywoływana przez wirusy Coxsackie A) to zapalenie gardła z wykwitami pęcherzykowymi ograniczonymi do przednich łuków podniebiennych i podniebienia miękkiego, bez jakichkolwiek zmian na skórze rąk i stóp." },
          { text: "Herpanginę wywołuje wyłącznie wirus opryszczki HSV-1", correct: false, feedback: "Błąd! Herpanginę wywołują enterowirusy Coxsackie A, a nie HSV." },
          { text: "W herpanginie zawsze występuje ropień okołomigdałkowy", correct: false, feedback: "Błąd merytoryczny." },
          { text: "Herpangina występuje wyłącznie u dorosłych", correct: false, feedback: "Występuje głównie u dzieci." }
        ]
      },
      {
        num: 8,
        title: "Zapobieganie i higiena w placówkach opiekuńczych",
        task: "Jaki jest najskuteczniejszy sposób ograniczania rozprzestrzeniania się HFMD w żłobkach i przedszkolach?",
        options: [
          { text: "Rygorystyczne mycie rąk wodą z mydłem po zmianie pieluszek i skorzystaniu z toalety, dezynfekcja zabawek i powierzchni oraz czasowa izolacja chorych dzieci w fazie ostrej", correct: true, feedback: "Znakomicie! Ponieważ enterowirusy są wirusami bezosłonkowymi, są stosunkowo oporne na standardowe środki dezynfekcyjne na bazie alkoholu. Dokładne mycie rąk mydłem i wodą oraz dezynfekcja powierzchni są kluczowe w opanowaniu ognisk w żłobkach." },
          { text: "Profilaktyczne podawanie acyklowiru wszystkim dzieciom w żłobku", correct: false, feedback: "Acyklowir nie działa na enterowirusy." },
          { text: "Całkowite zaniechanie wietrzenia sal", correct: false, feedback: "Zwiększa stężenie wirusa w powietrzu." },
          { text: "Szczepienie szczepionką przeciw odrze", correct: false, feedback: "Szczepionka MMR nie chroni przed enterowirusami." }
        ]
      }
    ],
    pathoNodes: [
      {
        title: "1. Wniknięcie enterowirusów drogą oddechową lub pokarmową",
        desc: "Wirusy Coxsackie replikują w tkance limfatycznej gardła (migdałki) oraz w kępkach Peyera jelita cienkiego, wywołując przejściową wiremię.",
        drugTarget: "Podstawowe leczenie przeciwbólowe (paracetamol, ibuprofen) umożliwiające nawadnianie"
      },
      {
        title: "2. Tropizm do nabłonka jamy ustnej i skóry kończyn",
        desc: "Wirusy namnażają się w keratynocytach naskórka i błony śluzowej jamy ustnej, indukując martwicę komórek i powstawanie śródnaskórkowych pęcherzyków na dłoniach, podeszwach i podniebieniu.",
        drugTarget: "Chłodne płyny i pokarmy powlekające, unikanie kwaśnych potraw drażniących nadżerki"
      },
      {
        title: "3. Długotrwałe wydalanie i powikłania troficzne macierzy paznokcia",
        desc: "Okresowe zaburzenie mikrokrążenia i replikacja wirusa w łożysku paznokcia hamuje przejściowo podziały macierzy, skutkując poprzecznymi bruzdami Beau i bezbolesnym odpadaniem paznokci (onychomadesis) po kilku tygodniach.",
        drugTarget: "Higiena rąk (woda z mydłem) zapobiegająca transmisji fekalno-oralnej (wirus w kale do 8 tyg.)"
      }
    ],
    dutySummary: "HFMD ('choroba bostońska') to łagodne zakażenie enterowirusowe (Coxsackie A16) z bolesnymi nadżerkami w jamie ustnej oraz podłużnymi pęcherzykami na dłoniach, podeszwach stóp i pośladkach. Główne zagrożenie to odwodnienie z powodu bólu przy połykaniu. Leczenie: przeciwbólowe, chłodne płyny. Typowe późne powikłanie po 1-2 miesiącach: bezbolesne odwarstwianie płytek paznokciowych (onychomadesis).",
    diffTable: [
      { disease: "Ospa wietrzna (VZV)", diff: "Pęcherzyki na owłosionej skórze głowy i tułowiu, polimorfizm (krople rosy, krosty, strupy), nasilony świąd; brak dominacji na dłoniach i stopach.", test: "Lokalizacja zmian skórnych, obecność zmian na owłosionej skórze głowy." },
      { disease: "Opryszczkowe zapalenie jamy ustnej (HSV-1)", diff: "Masywne przekrwienie, obrzęk i krwawienie dziąseł (gingivostomatitis), brak jakichkolwiek pęcherzyków na dłoniach i podeszwach stóp.", test: "Obraz dziąseł, brak wykwitów na dłoniach i stopach." },
      { disease: "Płonica (szkarlatyna)", diff: "Etiologia bakteryjna (GAS), wysypka drobnoplamista 'papier ścierny', malinowy język, brak pęcherzyków na dłoniach i stopach.", test: "Szybki test Strep-A, brak pęcherzyków." },
      { disease: "Afty nawrotowe", diff: "Pojedyncze, większe owrzodzenia jamy ustnej bez gorączki i bez żadnych zmian na skórze obwodowej.", test: "Brak zmian na skórze kończyn, brak cech ostrej infekcji wirusowej." }
    ],
    lekQuestions: [
      {
        question: "U 3-letniego dziecka uczęszczającego do żłobka stwierdzono stan podgorączkowy, bolesne nadżerki na błonie śluzowej jamy ustnej oraz owalne, szarawe pęcherzyki na dłoniowej powierzchni rąk, podeszwach stóp i pośladkach. Najbardziej prawdopodobnym czynnikiem etiologicznym jest:",
        options: [
          "Wirus ospy wietrznej i półpaśca (VZV).",
          "Wirus Coxsackie A16 (lub inne enterowirusy).",
          "Streptococcus pyogenes.",
          "Parwowirus B19.",
          "Wirus opryszczki pospolitej typ 2 (HSV-2)."
        ],
        correct: 1,
        explanation: "Choroba dłoni, stóp i jamy ustnej (HFMD – Hand, Foot, and Mouth Disease, popularnie nazywana 'chorobą bostońską') jest wywoływana przez enterowirusy z rodziny Picornaviridae, najczęściej przez wirusy Coxsackie A16, Coxsackie A6 oraz Enterowirus 71 (EV71)."
      },
      {
        question: "Jakie jest najczęstsze powikłanie ostrej fazy choroby dłoni, stóp i jamy ustnej (HFMD) u małych dzieci wymagające hospitalizacji?",
        options: [
          "Odwodnienie z powodu bolesności nadżerek w jamie ustnej i odmowy przyjmowania płynów.",
          "Ostre zapalenie wyrostka robaczkowego.",
          "Przełom tarczycowy.",
          "Obrzęk mózgu w przebiegu kwasicy ketonowej.",
          "Zatorowość płucna."
        ],
        correct: 0,
        explanation: "Ze względu na bolesne nadżerki na błonie śluzowej jamy ustnej, języku i gardle (herpangina/odynofagia) małe dzieci często całkowicie odmawiają picia i jedzenia, co prowadzi do odwodnienia – najczęstszego wskazania do hospitalizacji w przebiegu HFMD."
      },
      {
        question: "U 4-letniego dziecka po 6 tygodniach od przebycia choroby dłoni, stóp i jamy ustnej (HFMD) matka zaobserwowała bezbolesne oddzielanie się i odpadanie płytek paznokciowych u rąk (onychomadesis). Wskaż prawidłowe postępowanie:",
        options: [
          "Wdrożenie doustnego leczenia przeciwgrzybiczego itrakonazolem przez 3 miesiące.",
          "Poinformowanie matki, że jest to typowe, samoistnie ustępujące późne powikłanie HFMD i paznokcie odrosną prawidłowo bez leczenia.",
          "Pilne chirurgiczne usunięcie wszystkich płytek paznokciowych.",
          "Wdrożenie dożylnej antybiotykoterapii wankomycyną.",
          "Wykonanie pilnego rezonansu magnetycznego mózgowia."
        ],
        correct: 1,
        explanation: "Onychomadesis (oddzielanie się i odpadanie płytki paznokciowej od łożyska od strony macierzy) oraz linie Beau są dobrze znanym, łagodnym i późnym następstwem przebycia HFMD (szczególnie po zakażeniu szczepem Coxsackie A6). Wynika z przejściowego zahamowania czynności mitotycznej macierzy paznokcia w ostrej fazie choroby. Nie wymaga leczenia – paznokcie odrastają samoistnie w ciągu kilku miesięcy."
      }
    ],
    flashcards: [
      { q: "Jaki patogen najczęściej wywołuje chorobę dłoni, stóp i jamy ustnej (HFMD)?", a: "Wirusy Coxsackie A (najczęściej A16 i A6) oraz Enterowirus 71 (EV71).", cat: "Pediatria" },
      { q: "Gdzie lokalizują się wykwity w HFMD?", a: "Bolesne owrzodzenia/afty w jamie ustnej oraz podłużne pęcherzyki na dłoniach, podeszwach stóp i pośladkach.", cat: "Pediatria" },
      { q: "Co jest najczęstszym powikłaniem wymagającym hospitalizacji w HFMD?", a: "Odwodnienie z powodu silnego bólu przy przełykaniu (odynofagia) i odmowy pojenia.", cat: "Pediatria" },
      { q: "Czym jest onychomadesis po przebyciu HFMD?", a: "To bezbolesne oddzielanie się i odpadanie płytek paznokciowych występujące po 4–8 tygodniach od infekcji (paznokcie odrastają samoistnie).", cat: "Pediatria" },
      { q: "Czym różni się herpangina od HFMD?", a: "W herpanginie pęcherzyki występują tylko na łukach podniebiennych i gardle, bez wykwitów na dłoniach i stopach.", cat: "Pediatria" }
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
  console.log('Batch 113-117 finished successfully.');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});

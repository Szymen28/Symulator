const fs = require('fs');
const path = require('path');
const { encryptStringAes } = require('./encrypt_case.js');

const MASTER_KEY = '@LEKSzymon28111999';
const CASES_DIR = path.join(__dirname, '..', 'cases');

console.log("Saving Case 115: Rumień zakaźny / Parwowirus B19 (Erythema infectiosum)...");

async function saveCase(caseData) {
  const filePath = path.join(CASES_DIR, caseData.filename);
  const jsonStr = JSON.stringify(caseData, null, 2);
  const encrypted = await encryptStringAes(jsonStr, MASTER_KEY);
  fs.writeFileSync(filePath, JSON.stringify(encrypted, null, 2), 'utf8');
  console.log(`[SAVED] Case #${caseData.id}: ${caseData.filename} (LEK Qs: ${caseData.lekQuestions.length}, Steps: ${caseData.steps.length}, Flashcards: ${caseData.flashcards.length})`);
}

const case115 = {
  id: 115,
  filename: "115_rumien_zakazny_parwowirus_b19.json",
  dept: "Pediatria",
  shortTitle: "6-letni Bartek – 'Spoliczkowane dziecko', koronkowata wysypka i brak zakaźności (Rumień zakaźny)",
  diagnosisTitle: "Rumień zakaźny (Erythema infectiosum / Piąta choroba) wywołany przez Parwowirus B19 (Parvovirus B19) o klasycznym dwufazowym przebiegu",
  vitals: [
    { label: "Temperatura ciała", val: "36,8°C", sub: "Normotermia w fazie wysypkowej", status: "vital-ok" },
    { label: "Akcja serca (HR)", val: "88/min", sub: "Prawidłowy miarowy rytm serca", status: "vital-ok" },
    { label: "Częstość oddechów (RR)", val: "20/min", sub: "Oddech spokojny, bez duszności", status: "vital-ok" },
    { label: "Ciśnienie tętnicze / SpO2", val: "105/65 mmHg | 99%", sub: "Stan ogólny bardzo dobry", status: "vital-ok" }
  ],
  vitalsObj: { hr: 88, bp: "105/65", spo2: 99, rr: 20, temp: 36.8, gcs: 15 },
  story: `<p><strong>Pacjent:</strong> 6-letni Bartek został przyprowadzony do poradni pediatrycznej przez zaniepokojoną mamę z powodu jaskrawoczerwonego rumienia na obu policzkach o wyglądzie 'spoliczkowanego dziecka' oraz nowo powstałej, siateczkowatej, girlandowatej wysypki na ramionach i udach.</p><p><strong>Wywiad chorobowy:</strong> Około 7-10 dni temu chłopiec miał łagodne objawy zwiastunowe: stan podgorączkowy do 37,5°C, lekki ból głowy i przejściowy katar, które ustąpiły samoistnie po 2 dniach. Wczoraj rano mama zauważyła intensywne zaczerwienienie obu policzków z wyraźnym zblednięciem skóry wokół ust i brody – wyglądało to tak, jakby dziecko zostało uderzone w obie strony twarzy. Dziś po porannej kąpieli na ramionach, przedramionach, udach i pośladkach pojawiła się czerwona osutka plamista, która w części centralnej blednie, tworząc charakterystyczny wzór 'koronki' lub 'girlandy'. Zmiany nie swędzą, a chłopiec czuje się zupełnie zdrowy i ma doskonały apetyt. W przedszkolu kilkoro dzieci miało w ostatnich dwóch tygodniach podobne 'czerwone policzki'. Mama jest w 18. tygodniu ciąży i pyta, czy zakażenie zagraża nienarodzonemu rodzeństwu.</p><p><strong>Badanie przedmiotowe na SOR:</strong> Dziecko w stanie ogólnym bardzo dobrym, pogodne, wesołe, bez cech toksemii. Na twarzy: intensywny, żywoczerwony, lity rumień obu policzków ('objaw spoliczkowanego dziecka'), ciepły w dotyku, ostro odgraniczony od bladej skóry wokół ust, nosa i na brodzie. Na powierzchniach wyprostnych kończyn górnych i dolnych oraz na pośladkach obecna rumieniowa, drobnoplamista wysypka tworząca figury obrączkowate, siateczkowate i koronkowate z przejaśnieniem w środku wykwitu. Brak wykwitów na dłoniach i stopach. Śluzówka jamy ustnej czysta, różowa, migdałki niepowiększone, bez nalotów. Węzły chłonne obwodowe niepowiększone. W badaniu klatki piersiowej i brzucha brak jakichkolwiek odchyleń od stanu prawidłowego (wątroba i śledziona niewyczuwalne). Stawy obwodowe bez obrzęków i bez ograniczenia ruchomości.</p>`,
  labs: {
    "Morfologia krwi obwodowej i retikulocyty": [
      { name: "Leukocyty (WBC)", val: "6,2 G/L", norm: "5,0 - 14,5 G/L", flag: "NORMAL" },
      { name: "Hemoglobina (Hb)", val: "13,2 g/dl", norm: "11,5 - 14,5 g/dl", flag: "NORMAL" },
      { name: "Płytki krwi (PLT)", val: "245 G/L", norm: "150 - 450 G/L", flag: "NORMAL" },
      { name: "Retikulocyty", val: "12 ‰ (promili)", norm: "5 - 15 ‰", flag: "NORMAL" },
      { name: "CRP", val: "1,8 mg/l", norm: "< 5,0 mg/l", flag: "NORMAL" }
    ],
    "Diagnostyka serologiczna i molekularna Parwowirusa B19": [
      { name: "Przeciwciała swoiste anty-B19 IgM", val: "DODATNI (+) [miano wysokie]", norm: "Ujemny", flag: "CRIT_HIGH" },
      { name: "Przeciwciała swoiste anty-B19 IgG", val: "Wątpliwy (+/-) / w trakcie serokonwersji", norm: "Ujemny", flag: "NORMAL" },
      { name: "DNA Parwowirusa B19 metodą PCR (krew)", val: "DODATNI (+) [niska wiremia resztkowa]", norm: "Ujemny", flag: "HIGH" }
    ]
  },
  steps: [
    {
      stepNum: 1,
      title: "Krok 1: Identyfikacja objawu 'spoliczkowanego dziecka' i osutki koronkowatej",
      desc: "Oglądasz 6-letniego Bartka w doskonałym stanie ogólnym. Na twarzy widoczny jest jaskrawy rumień policzków z bladością wokół ust, a na kończynach girlandowata, koronkowata osutka plamista blednąca pośrodku. Jaka jest Twoja natychmiastowa diagnoza kliniczna?",
      scenario: "Oglądasz 6-letniego Bartka w doskonałym stanie ogólnym. Na twarzy widoczny jest jaskrawy rumień policzków z bladością wokół ust, a na kończynach girlandowata, koronkowata osutka plamista blednąca pośrodku. Jaka jest Twoja natychmiastowa diagnoza kliniczna?",
      options: [
        {
          text: "Rumień zakaźny (Erythema infectiosum / tzw. piąta choroba) wywołany zakażeniem Parwowirusem B19",
          correct: true,
          isCorrect: true,
          feedback: "✅ PRAWIDŁOWO! <strong>Klasyczny i patognomoniczny obraz rumienia zakaźnego!</strong> Połączenie intensywnego rumienia na policzkach (objaw 'spoliczkowanego dziecka' / slapped-cheek appearance) z następowym wysiewem siateczkowatej, koronkowatej lub girlandowatej osutki na kończynach u dziecka w świetnym stanie ogólnym jest jednoznacznym obrazem zakażenia Parwowirusem B19 (jednoniciowym wirusem DNA z rodziny Parvoviridae)."
        },
        {
          text: "Toczeń rumieniowaty układowy (SLE) z ostrym rzutem toczniowego zapalenia nerek",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>W toczniu rumień 'motyla' obejmuje grzbiet nosa i policzki</strong>, oszczędza fałdy nosowo-wargowe, ale nie daje nagłej koronkowatej osutki na kończynach, a dziecko jest w stanie ciężkim z zajęciem narządów wewnętrznych."
        },
        {
          text: "Płonica z trójkątem Fiłatowa",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>W płonicy występuje wysoka gorączka, silna angina paciorkowcowa z nalotami i szorstka drobnoplamista wysypka na tułowiu!</strong> U Bartka gardło jest blade, a wysypka ma charakter koronkowaty na kończynach."
        },
        {
          text: "Oparzenie słoneczne II stopnia",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Oparzenie słoneczne nie daje siateczkowatej osutki pod ubraniem na pośladkach i udach.</strong>"
        }
      ]
    },
    {
      stepNum: 2,
      title: "Krok 2: Paradoks epidemiologiczny – zakaźność w momencie wystąpienia wysypki",
      desc: "Mama pyta ze strachem: 'Panie doktorze, czy Bartek teraz zaraża dzieci w przedszkolu i jak długo musi siedzieć w domu w kwarantannie?'. Jaka jest unikalna cecha epidemiologiczna zakażenia Parwowirusem B19?",
      scenario: "Mama pyta ze strachem: 'Panie doktorze, czy Bartek teraz zaraża dzieci w przedszkolu i jak długo musi siedzieć w domu w kwarantannie?'. Jaka jest unikalna cecha epidemiologiczna zakażenia Parwowirusem B19?",
      options: [
        {
          text: "W momencie wystąpienia charakterystycznej wysypki pacjent NIE jest już zakaźny dla otoczenia, ponieważ wysypka ma podłoże immunologiczne (odkładanie kompleksów immunologicznych antygen-przeciwciało po wygaśnięciu wiremii); dziecko może bez przeszkód iść do przedszkola/szkoły!",
          correct: true,
          isCorrect: true,
          feedback: "✅ PRAWIDŁOWO! <strong>Fundamentalny fakt epidemiologiczny i stałe pytanie LEK!</strong> W rumieniu zakaźnym okres maksymalnej wiremii i wydalania wirusa przypada na fazę prodromalną (katar, stan podgorączkowy na 7-10 dni przed wysypką). Gdy pojawia się osutka na policzkach i kończynach, poziom wiremii spada niemal do zera, a we krwi krążą swoiste przeciwciała neutralizujące. Sama wysypka jest wynikiem odkładania się kompleksów immunologicznych w naczyniach skóry. Dlatego dziecko z typową osutką NIE wymaga izolacji i może uczestniczyć w zajęciach przedszkolnych!"
        },
        {
          text: "Dziecko zakaża najsilniej właśnie w fazie wysypkowej i musi być izolowane w izolatce przez 40 dni",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Częsty błąd lekarzy!</strong> W fazie wysypki dziecko nie zakaża."
        },
        {
          text: "Zakaźność trwa do końca życia w ślinie i pocie",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Parwowirus B19 nie powoduje przewlekłego nosicielstwa u osób immunokompetentnych.</strong>"
        },
        {
          text: "Dziecko nie zakażało nigdy, bo choroba przenosi się wyłącznie przez kleszcze",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Wirus przenosi się drogą kropelkową i przez łożysko.</strong>"
        }
      ]
    },
    {
      stepNum: 3,
      title: "Krok 3: Zmienność wysypki pod wpływem czynników fizycznych",
      desc: "Mama zauważyła, że po ciepłej kąpieli lub gdy Bartek biega po podwórku, wysypka staje się jaskrawoczerwona, a w chłodnym pokoju niemal całkowicie zanika. O czym świadczy to zjawisko?",
      scenario: "Mama zauważyła, że po ciepłej kąpieli lub gdy Bartek biega po podwórku, wysypka staje się jaskrawoczerwona, a w chłodnym pokoju niemal całkowicie zanika. O czym świadczy to zjawisko?",
      options: [
        {
          text: "Jest to całkowicie typowa, naturalna cecha osutki w rumieniu zakaźnym – może nawracać i nasilać się przez 1-3 tygodnie pod wpływem ciepła, kąpieli, ekspozycji na słońce, wysiłku fizycznego lub emocji, co nie oznacza zaostrzenia infekcji ani powikłań",
          correct: true,
          isCorrect: true,
          feedback: "✅ PRAWIDŁOWO! <strong>Charakterystyczna dynamika wykwitów!</strong> Osutka w przebiegu rumienia zakaźnego jest labilna naczyniowo. Wszelkie bodźce rozszerzające naczynia krwionośne skóry (gorąca woda, promieniowanie słoneczne, stres, płacz, bieganie) powodują jej ponowne uwidocznienie i zaostrzenie barwy. Może to trwać falami od 1 do nawet 3-4 tygodni i nie wymaga żadnego leczenia."
        },
        {
          text: "Świadczy o natychmiastowym przejściu parwowirusa w postać zgorzelinową",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>To łagodny, naczynioruchowy odczyn skóry.</strong>"
        },
        {
          text: "Wskazuje na konieczność zakazu mycia dziecka przez najbliższy rok",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Brak higieny sprzyja zakażeniom bakteryjnym!</strong> Należy jedynie unikać bardzo gorącej wody."
        },
        {
          text: "Oznacza rozwój wstrząsu anafilaktycznego na wodę z kranu",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Wstrząs anafilaktyczny przebiega z zapaścią krążeniową, a nie nawracającą koronkowatą wysypką.</strong>"
        }
      ]
    },
    {
      stepNum: 4,
      title: "Krok 4: Ciąża u matki – KRYTYCZNE zagrożenie dla płodu",
      desc: "Mama Bartka jest w 18. tygodniu ciąży (II trymestr). Pyta z przerażeniem, jakie ryzyko niesie kontakt z parwowirusem dla jej nienarodzonego dziecka i jakie jest najgroźniejsze powikłanie płodowe zakażenia B19?",
      scenario: "Mama Bartka jest w 18. tygodniu ciąży (II trymestr). Pyta z przerażeniem, jakie ryzyko niesie kontakt z parwowirusem dla jej nienarodzonego dziecka i jakie jest najgroźniejsze powikłanie płodowe zakażenia B19?",
      options: [
        {
          text: "Parwowirus B19 przenika przez łożysko i niszczy komórki prekursorowe erytropoezy płodu w wątrobie i szpiku, wywołując ciężką niedokrwistość wewnątrzmaciczną, niewydolność krążenia o wysokim rzucie, nieimmunologiczny obrzęk płodu (hydrops fetalis) oraz obumarcie wewnątrzmaciczne; wirus NIE jest teratogenny (nie powoduje wad narządowych)",
          correct: true,
          isCorrect: true,
          feedback: "✅ PRAWIDŁOWO! <strong>Najważniejsze zagadnienie położniczo-pediatryczne Parwowirusa B19 na LEK!</strong> Wirus wykazuje tropizm do antygenu P erytroblastów. U płodu (zwłaszcza w II trymestrze, kiedy erytropoeza rozwija się w wątrobie płodowej) zakażenie prowadzi do aplazji układu czerwonokrwinkowego, skrajnej niedokrwistości, niewydolności serca i uogólnionego obrzęku płodu (hydrops fetalis – płyn w otrzewnej, opłucnej, osierdziu i tkance podskórnej). Ryzyko obrzęku/zgonu płodu u seroujemnej matki wynosi ok. 5-10%. Ważne: B19 nie wywołuje wad wrodzonych (nie jest teratogenem jak różyczka)!"
        },
        {
          text: "Wirus wywołuje typowy zespół wad wrodzonych: zaćmę, głuchotę i wady serca (zespół Gregga)",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>To klasyczna triada różyczki wrodzonej (zespół Gregga)!</strong> Parwowirus B19 nie wywołuje embriopatii."
        },
        {
          text: "Parwowirus B19 jest całkowicie bezpieczny w ciąży i nie przenika przez barierę łożyskową",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD KRYTYCZNY! <strong>Przenika przez łożysko i jest najczęstszą zakaźną przyczyną nieimmunologicznego obrzęku płodu!</strong>"
        },
        {
          text: "Wirus powoduje u matki natychmiastowe pęknięcie macicy",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Brak takiego mechanizmu.</strong>"
        }
      ]
    },
    {
      stepNum: 5,
      title: "Krok 5: Postępowanie diagnostyczne i monitorowanie u ciężarnej po ekspozycji",
      desc: "Jakie postępowanie diagnostyczne i monitorujące należy natychmiast wdrożyć u matki Bartka w 18. tygodniu ciąży po kontakcie z synem?",
      scenario: "Jakie postępowanie diagnostyczne i monitorujące należy natychmiast wdrożyć u matki Bartka w 18. tygodniu ciąży po kontakcie z synem?",
      options: [
        {
          text: "Pilne oznaczenie przeciwciał anty-B19 IgG i IgM u ciężarnej; jeśli jest IgG(+) = odporna (brak ryzyka); jeśli jest seroujemna IgG(-) IgM(-) = seryjne USG płodu co 1-2 tygodnie przez 8-12 tygodni z oceną maksymalnej prędkości skurczowej w tętnicy środkowej mózgu (MCA-PSV) w celu wczesnego wykrycia anemii płodu",
          correct: true,
          isCorrect: true,
          feedback: "✅ PRAWIDŁOWO! <strong>Współczesny algorytm perinatologiczny!</strong> Około 50-60% dorosłych kobiet przebyło B19 w przeszłości i posiada ochronne przeciwciała IgG – wówczas płód jest całkowicie bezpieczny. Jeśli matka jest seroujemna (podatna) i ulegnie serokonwersji (IgM+), standardem jest seryjne monitorowanie ultrasonograficzne z badaniem doplerowskim przepływu w tętnicy środkowej mózgu (MCA-PSV). Wzrost prędkości skurczowej w MCA powyżej 1,5 MoM świadczy o ciężkiej anemii płodu i stanowi wskazanie do kordocentezy i dopłodowej transfuzji dopępowych krwinek czerwonych (wewnątrzmaciczne przetoczenie ratujące życie płodu)!"
        },
        {
          text: "Natychmiastowe rozwiązanie ciąży cięciem cesarskim w 18. tygodniu",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD KRYTYCZNY! <strong>W 18. tygodniu płód jest skrajnie niedojrzały i niezdolny do życia poza łonem matki!</strong>"
        },
        {
          text: "Podanie matce Acyklowiru w maksymalnej dawce dożylnej",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Acyklowir nie działa na Parwowirusa B19!</strong> (B19 nie koduje własnej kinazy tymidynowej)."
        },
        {
          text: "Całkowity brak kontroli, ponieważ medycyna nie dysponuje metodami leczenia anemii płodu",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Wewnątrzmaciczne transfuzje krwi (kordocenteza) mają >90% skuteczności</strong> w ratowaniu płodu z hydrops fetalis!"
        }
      ]
    },
    {
      stepNum: 6,
      title: "Krok 6: Przełom aplastyczny u pacjentów z przewlekłą hemolizą",
      desc: "U jakiej grupy chorych zakażenie Parwowirusem B19 wywołuje ostry, zagrażający życiu stan zwany przełomem aplastycznym (aplastic crisis) i czym charakteryzuje się w badaniach laboratoryjnych?",
      scenario: "U jakiej grupy chorych zakażenie Parwowirusem B19 wywołuje ostry, zagrażający życiu stan zwany przełomem aplastycznym (aplastic crisis) i czym charakteryzuje się w badaniach laboratoryjnych?",
      options: [
        {
          text: "U osób z przewlekłą niedokrwistością hemolityczną (np. sferocytoza wrodzona, anemia sierpowatokrwista, talasemie, autoimmunologiczna anemia hemolityczna); charakteryzuje się gwałtownym spadkiem hemoglobiny oraz krytycznym spadkiem liczby retikulocytów do niemal zera (0-1 promila) wskutek zahamowania erytropoezy",
          correct: true,
          isCorrect: true,
          feedback: "✅ PRAWIDŁOWO! <strong>Żelazny pewniak hematologiczny LEK!</strong> U osób z przewlekłą hemolizą przeżywalność erytrocytów jest skrócona (np. do 15-20 dni zamiast 120 dni), więc utrzymanie hemoglobiny wymaga maksymalnej kompensacyjnej nadprodukcji krwinek w szpiku. Parwowirus B19 zakaża komórki progenitorowe układu czerwonokrwinkowego (CFU-E i BFU-E), wywołując ich śmierć apoptotyczną. Przejściowe zatrzymanie erytropoezy na 7-10 dni u zdrowego człowieka wywołuje ledwie zauważalny spadek Hb, ale u pacjenta z hemolizą prowadzi do katastrofalnego załamania parametrów czerwienio-krwinkowych: Hb spada do 2-4 g/dl, a retikulocyty znikają z krwi obwodowej (retikulocytopenia 0 ‰)!"
        },
        {
          text: "U chorych na hemofilię typu A, gdzie dochodzi do natychmiastowego obumarcia płytek krwi",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Hemofilia to skaza osoczowa</strong>, a wirus atakuje prekursory erytropoezy."
        },
        {
          text: "U pacjentów z nadciśnieniem tętniczym, powodując pęknięcie aorty",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Brak takiego związku.</strong>"
        },
        {
          text: "U każdego pacjenta bez wyjątku, zawsze powodując trwałe zniszczenie szpiku kostnego",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>U osób zdrowych supresja szpiku jest bezobjawowa i całkowicie przejściowa.</strong>"
        }
      ]
    },
    {
      stepNum: 7,
      title: "Krok 7: Zespół 'rękawiczek i skarpetek' (PPGSS) u młodzieży",
      desc: "U 16-letniego brata ciotecznego Bartka dochodzi do zakażenia B19 manifestującego się bolesnym rumieniem i wybroczynami ściśle ograniczonymi do rąk i stóp z wyraźną granicą na nadgarstkach i kostkach. Jak nazywa się ten zespół kliniczny?",
      scenario: "U 16-letniego brata ciotecznego Bartka dochodzi do zakażenia B19 manifestującego się bolesnym rumieniem i wybroczynami ściśle ograniczonymi do rąk i stóp z wyraźną granicą na nadgarstkach i kostkach. Jak nazywa się ten zespół kliniczny?",
      options: [
        {
          text: "Zespół grudkowo-plamiczy rękawiczek i skarpetek (PPGSS – Papular Purpuric Gloves and Socks Syndrome)",
          correct: true,
          isCorrect: true,
          feedback: "✅ PRAWIDŁOWO! <strong>Ciekawy i ważny wariant kliniczny!</strong> PPGSS występuje u nastolatków i młodych dorosłych. Cechuje się bolesnym obrzękiem, pieczeniem, rumieniem i plamicą o ostrym odcięciu na linii nadgarstków i kostek ('rękawiczki i skarpetki'), z towarzyszącą gorączką i owrzodzeniami w jamie ustnej. Co istotne: w przeciwieństwie do klasycznego rumienia zakaźnego, w PPGSS pacjenci SĄ ZAKAŹNI w fazie obecności wykwitów skórnych!"
        },
        {
          text: "Zespół cieśni nadgarstka o ostrym początku bakteryjnym",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>To neuropatia z ucisku nerwu pośrodkowego</strong>, a nie zespół wybroczynowo-skórny."
        },
        {
          text: "Odmrożenie dystalnych części kończyn IV stopnia",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Odmrożenie wymaga ekspozycji na ujemne temperatury.</strong>"
        },
        {
          text: "Stopa cukrzycowa obustronna u nastolatka",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Stopa cukrzycowa rozwija się w wieloletniej, źle kontrolowanej cukrzycy.</strong>"
        }
      ]
    },
    {
      stepNum: 8,
      title: "Krok 8: Powikłania stawowe u dorosłych (artropatia parwowirusowa)",
      desc: "Nauczycielka z przedszkola Bartka (kobieta, 34 lata) zachorowała 2 tygodnie po wybuchu ogniska rumienia. Zgłasza silny, symetryczny ból i sztywność poranną drobnych stawów rąk i kolan. Podejrzewa u siebie reumatoidalne zapalenie stawów (RZS). Jakie jest prawidłowe wyjaśnienie tego stanu?",
      scenario: "Nauczycielka z przedszkola Bartka (kobieta, 34 lata) zachorowała 2 tygodnie po wybuchu ogniska rumienia. Zgłasza silny, symetryczny ból i sztywność poranną drobnych stawów rąk i kolan. Podejrzewa u siebie reumatoidalne zapalenie stawów (RZS). Jakie jest prawidłowe wyjaśnienie tego stanu?",
      options: [
        {
          text: "Jest to ostra artropatia parwowirusowa (zapalenie stawów wywołane przez Parwowirus B19), występująca u nawet 60-80% dorosłych kobiet; cechuje się symetrycznym zajęciem drobnych stawów rąk i kolan, może imitować RZS, ale ustępuje samoistnie w ciągu kilku tygodni bez pozostawiania nadżerek i zniekształceń stawowych",
          correct: true,
          isCorrect: true,
          feedback: "✅ PRAWIDŁOWO! <strong>Powszechny problem w reumatologii i medycynie rodzinnej!</strong> U dorosłych (zwłaszcza kobiet) parwowirus B19 rzadko daje typowy rumień na policzkach, a najczęstszą manifestacją jest symetryczne zapalenie wielostawowe (drobne stawy dłoni, nadgarstki, kolana, stawy skokowe). Może towarzyszyć mu przejściowa obecność czynnika reumatoidalnego (RF) i przeciwciał ANA. Kluczowa różnica z RZS: artropatia B19 jest całkowicie samoograniczająca się (ustępuje w 2-4 tygodnie, rzadko do kilku miesięcy) i NIE powoduje destrukcji chrząstki ani nadżerek kostnych w RTG."
        },
        {
          text: "Zakażenie B19 zawsze prowadzi do konieczności wszczepienia endoprotez wszystkich stawów",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Choroba ma charakter łagodny i nie niszczy stawów.</strong>"
        },
        {
          text: "Wirus wywołuje ostre bakteryjne ropne zapalenie stawów wymagające natychmiastowej artrotomii",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>To zapalenie o podłożu immunologicznym</strong>, płyn stawowy jest jałowy."
        },
        {
          text: "Bóle stawowe po parwowirusie nie istnieją i są objawem nerwicy lękowej",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Artropatia B19 jest doskonale udokumentowanym zespołem klinicznym.</strong>"
        }
      ]
    }
  ],
  pathoNodes: [
    {
      badge: "OGNIWO 1 • Wrota zakażenia i tropizm do antygenu P",
      title: "Inhalacja dróg oddechowych, wnikanie do prekursorów erytropoezy przez globazyd",
      short: "Wirus B19 zakaża komórki prekursorowe erytrocytów, wykorzystując antygen P jako receptor.",
      detail: "Parwowirus B19 (jednoniciowy wirus DNA o budowie bezotoczkowej z rodziny Parvoviridae) wnika do ustroju drogą kropelkową lub krwiopochodną. Posiada wysoce selektywny tropizm do komórek progenitorowych linii czerwonokrwinkowej szpiku kostnego i wątroby płodu (komórki CFU-E i BFU-E). Wirus wykorzystuje jako swoisty receptor błonowy globazyd (antygen P grupy krwi). Osoby z rzadkim fenotypem p (pozbawione antygenu P) wykazują wrodzoną, całkowitą niewrażliwość na zakażenie Parwowirusem B19.",
      target: "Brak leczenia przyczynowego celowanego; profilaktyka u osób podatnych: higiena rąk, unikanie ekspozycji.",
      desc: "Inhalacja dróg oddechowych, wnikanie do prekursorów erytropoezy przez globazyd.",
      drugTarget: "Brak leczenia przyczynowego celowanego; profilaktyka u osób podatnych: higiena rąk, unikanie ekspozycji."
    },
    {
      badge: "OGNIWO 2 • Cytotoksyczność wobec erytroblastów i supresja szpiku",
      title: "Replikacja wirusa, apoptoza prekursorów i zahamowanie retikulocytozy",
      short: "Niekontrolowana replikacja prowadzi do śmierci komórek układu czerwonokrwinkowego.",
      detail: "Białko niestrukturalne NS1 wirusa indukuje zatrzymanie cyklu komórkowego erytroblastów w fazie G1/G2 oraz uruchamia szlak apoptozy komórkowej. Prowadzi to do ostrego, przejściowego zatrzymania wytwarzania krwinek czerwonych na okres 7-10 dni. U osób z prawidłowym czasem przeżycia erytrocytów (120 dni) wywołuje to jedynie minimalny, subkliniczny spadek stężenia hemoglobiny o ok. 1 g/dl. Natomiast u pacjentów z przewlekłą hemolizą (skrócony czas życia erytrocytów) dochodzi do katastrofalnego przełomu aplastycznego ze spadkiem retikulocytów do zera.",
      target: "Leczenie przełomu aplastycznego: <span class='dose-pill'>przetoczenie Koncentratu Krwinek Czerwonych (KKCz) 10-15 ml/kg m.c.</span>; w zakażeniach przewlekłych u osób z immunosupresją: <span class='dose-pill'>Dożylne immunoglobuliny (IVIG) 0,4 g/kg m.c./dobę przez 5 dni</span>.",
      desc: "Replikacja wirusa, apoptoza prekursorów i zahamowanie retikulocytozy.",
      drugTarget: "Leczenie przełomu aplastycznego: <span class='dose-pill'>przetoczenie Koncentratu Krwinek Czerwonych (KKCz) 10-15 ml/kg m.c.</span>; w zakażeniach przewlekłych u osób z immunosupresją: <span class='dose-pill'>Dożylne immunoglobuliny (IVIG) 0,4 g/kg m.c./dobę przez 5 dni</span>."
    },
    {
      badge: "OGNIWO 3 • Immunologiczny mechanizm wysypki i brak zakaźności",
      title: "Syntetyzowane przeciwciała neutralizujące tworzą kompleksy odkładające się w skórze",
      short: "Wysypka powstaje wskutek odkładania kompleksów immunologicznych po eliminacji wiremii.",
      detail: "Około 10.-14. dnia od zakażenia w organizmie pojawia się wysokie miano swoistych przeciwciał klasy IgM i IgG neutralizujących wirusa B19. Dochodzi do gwałtownego spadku wiremii i eliminacji cząstek wirusa z krwi. Jednak tworzące się w krążeniu kompleksy immunologiczne (antygen wirusowy - przeciwciało) odkładają się w ścianach drobnych naczyń krwionośnych skóry i maziówce stawów, aktywując kaskadę dopełniacza. Wywołuje to poszerzenie naczyń, rumień policzków oraz koronkowatą osutkę na kończynach. Z tego powodu w momencie pojawienia się osutki pacjent nie jest już źródłem zakażenia.",
      target: "Leczenie objawowe zmian skórnych: emolienty nawilżające, ochrona przed przegrzaniem i słońcem, <span class='dose-pill'>brak konieczności kwarantanny</span>.",
      desc: "Syntetyzowane przeciwciała neutralizujące tworzą kompleksy odkładające się w skórze.",
      drugTarget: "Leczenie objawowe zmian skórnych: emolienty nawilżające, ochrona przed przegrzaniem i słońcem, <span class='dose-pill'>brak konieczności kwarantanny</span>."
    },
    {
      badge: "OGNIWO 4 • Zakażenie przezłożyskowe i uogólniony obrzęk płodu",
      title: "Aerozol wirusowy u ciężarnej, zakażenie trofoblastu, anemia płodu i hydrops fetalis",
      short: "Wirus przekracza łożysko, niszcząc erytropoezę płodu i wywołując obrzęk z niewydolności krążenia.",
      detail: "Wirus B19 z krwią matki pokonuje barierę łożyskową (dzięki ekspresji antygenu P na trofoblaście) i zakaża komórki wątroby płodu, która w II trymestrze jest głównym narządem hematopoezy. Gwałtowny rozpad prekursorów krwinek wywołuje u płodu ciężką niedokrwistość (Hb <2-4 g/dl). Rozwija się hipoksja tkanek, niewydolność mięśnia sercowego o wysokim rzucie, wzrost ciśnienia żylnego oraz spadek syntezy albumin przez uszkodzoną wątrobę (hipoalbuminemia). Płyn przesięka do jam ciała (wodobrzusze, płyn w opłucnej i worku osierdziowym) oraz tkanki podskórnej płodu (nieimmunologiczny obrzęk płodu – hydrops fetalis).",
      target: "Terapia płodowa w wyspecjalizowanym ośrodku perinatologicznym: <span class='dose-pill'>kordocenteza z dopłodową transfuzją dopępową dopasowanego KKCz</span> pod kontrolą USG.",
      desc: "Aerozol wirusowy u ciężarnej, zakażenie trofoblastu, anemia płodu i hydrops fetalis.",
      drugTarget: "Terapia płodowa w wyspecjalizowanym ośrodku perinatologicznym: <span class='dose-pill'>kordocenteza z dopłodową transfuzją dopępową dopasowanego KKCz</span> pod kontrolą USG."
    }
  ],
  diffTable: {
    title: "⚔️ Tabela Różnicowa: Rumień zakaźny vs Gorączka trzydniowa (Rumień nagły) vs Odra vs Różyczka",
    headers: ["Cecha kliniczna", "Rumień zakaźny (B19)", "Gorączka trzydniowa (HHV-6)", "Odra (Morbilli)", "Różyczka (Rubella)"],
    rows: [
      ["Etiologia", "Parwowirus B19 (Parvoviridae)", "Ludzki herpeswirus 6 (HHV-6)", "Wirus odry (Paramyxoviridae)", "Wirus różyczki (Matonaviridae)"],
      ["Przebieg gorączki", "Brak gorączki lub łagodny stan podgorączkowy", "Wysoka gorączka (39-40°C) przez 3-5 dni, nagle ustępuje", "Bardzo wysoka gorączka dwugarbna, narastająca z wysypką", "Stan podgorączkowy lub niska gorączka"],
      ["Moment pojawienia się wysypki", "Po 7-14 dniach od łagodnych objawów zwiastunowych", "PO NAGŁYM SPADKU GORĄCZKI (kryzysie termicznym)", "W szczycie gorączki i objawów kataralnych", "W 1.-2. dobie łagodnych objawów"],
      ["Charakter wysypki", "'Spoliczkowane dziecko' na twarzy, koronkowata/girlandowata na kończynach", "Drobnoplamista, różowa, głównie na tułowiu i szyi", "Gruboplamisto-grudkowa, zlewająca się, ciemnoczerwona", "Drobnoplamisto-grudkowa, bladoróżowa, niezlewająca się"],
      ["Objawy w jamie ustnej", "Brak zmian (błona śluzowa czysta)", "Plamki Nagayamy (owrzodzenia na języczku i podniebieniu)", "Plamki Koplika na błonie śluzowej policzków", "Plamki Forchheimera na podniebieniu miękkim"],
      ["Zakaźność w fazie wysypki", "BRAK ZAKAŹNOŚCI (podłoże immunologiczne!)", "Minimalna / znikoma", "BARDZO WYSOKA (chory silnie zakaża!)", "Wysoka (chory zakaża do 7 dni po wysypce)"],
      ["Powikłania specyficzne", "Przełom aplastyczny (w hemolizie), obrzęk płodu w ciąży", "Drgawki gorączkowe (w czasie skoku temperatury)", "Podostre stwardniające zapalenie mózgu (SSPE), zapalenie płuc", "Zespół różyczki wrodzonej (wady słuchu, serca, oka)"],
      ["Leczenie", "Objawowe (emolienty, unikanie ciepła)", "Objawowe (paracetamol, nawodnienie)", "Objawowe + wysokie dawki Witaminy A", "Wyłącznie leczenie objawowe"]
    ]
  },
  dutySummary: {
    overview: "Rumień zakaźny (piąta choroba) jest łagodną, samoograniczającą się chorobą wirusową wywołaną przez Parwowirus B19. Charakteryzuje się typowym dwufazowym przebiegiem: po łagodnych objawach zwiastunowych pojawia się patognomoniczny rumień policzków ('objaw spoliczkowanego dziecka') z następową siateczkowatą, girlandowatą osutką na kończynach. W fazie wysypkowej pacjent NIE jest zakaźny. Ciężkie powikłania dotyczą chorych z przewlekłą hemolizą (przełom aplastyczny) oraz kobiet w ciąży (anemia i obrzęk płodu – hydrops fetalis).",
    diagnostics: "1. Rozpoznanie kliniczne na podstawie charakterystycznej morfologii wykwitów (spoliczkowane dziecko + girlandy na kończynach).<br>2. U kobiet w ciąży po kontakcie: badanie serologiczne swoistych przeciwciał anty-B19 IgG i IgM w celu oceny odporności i świeżej infekcji.<br>3. W razie serokonwersji u ciężarnej: seryjne USG płodu z badaniem doplerowskim MCA-PSV (prędkość skurczowa w tętnicy środkowej mózgu) w kierunku anemii płodu.<br>4. U pacjentów z przewlekłą hemolizą: morfologia krwi z oceną bezwzględnej liczby retikulocytów w celu wykluczenia przełomu aplastycznego.",
    drugsAndDoses: "1. U dzieci zdrowych z typowym przebiegiem: <span class='dose-pill'>brak konieczności stosowania leków farmakologicznych</span>; zaleca się pielęgnację skóry obojętnymi emolientami.<br>2. W razie świądu (rzadko): <span class='dose-pill'>Cetyryzyna 5-10 mg p.o.</span> raz na dobę.<br>3. W bólu stawów u dorosłych: <span class='dose-pill'>Ibuprofen 400 mg p.o.</span> co 8 h lub <span class='dose-pill'>Paracetamol 1000 mg p.o.</span> co 6-8 h.<br>4. W przełomie aplastycznym w hematologii: <span class='dose-pill'>przetoczenie KKCz 10-15 ml/kg m.c.</span>.<br>5. W przewlekłej aplazji czerwonokrwinkowej u chorych z immunosupresją: <span class='dose-pill'>Dożylne immunoglobuliny (IVIG) 0,4 g/kg m.c./dobę przez 5 dni</span>.",
    procedures: "1. Edukacja rodziców o braku zakaźności w fazie wysypki (brak wskazań do izolacji domowej, dziecko może chodzić do szkoły/przedszkola).<br>2. Unikanie gorących kąpieli, ekspozycji na słońce i intensywnego przegrzewania, które nasilają wykwity rumieniowe.<br>3. Kwalifikacja do wewnątrzmacicznej transfuzji dopępowych krwinek czerwonych u płodów z ciężką anemią i cechami hydrops fetalis.<br>4. Zapewnienie właściwego nawodnienia doustnego.",
    monitoring: "1. Monitorowanie ginekologiczno-położnicze: cotygodniowe USG płodu z oceną MCA-PSV oraz poszukiwaniem płynu w jamach ciała płodu przez 8-12 tygodni od ekspozycji seroujemnej matki.<br>2. Kontrola morfologii krwi i retikulocytów u pacjentów ze sferocytozą lub anemią sierpowatokrwistą.<br>3. Obserwacja ewolucji wysypki skórnej (może nawracać i blednąć falami przez 2-4 tygodnie).<br>4. Ocena funkcji stawów u dorosłych kobiet (wykluczenie utrwalonych zmian zapalnych)."
  },
  lekQuestions: [
    {
      id: 1,
      q: "Który z poniższych objawów klinicznych jest patognomoniczny dla rumienia zakaźnego (piątej choroby) wywołanego przez Parwowirus B19?",
      opts: [
        "A. Jaskrawoczerwony rumień na obu policzkach z bladością wokół ust (tzw. objaw spoliczkowanego dziecka) oraz siateczkowata, koronkowata osutka na kończynach",
        "B. Pęcherzyki wypełnione mętnym płynem na owłosionej skórze głowy",
        "C. Drobnoplamista szorstka wysypka przypominająca papier ścierny z liniami Pastii",
        "D. Płomienne gardło z truskawkowym językiem i ropnymi czopami na migdałkach",
        "E. Uogólnione pęcherze z dodatnim objawem Nikolskiego"
      ],
      options: [
        "A. Jaskrawoczerwony rumień na obu policzkach z bladością wokół ust (tzw. objaw spoliczkowanego dziecka) oraz siateczkowata, koronkowata osutka na kończynach",
        "B. Pęcherzyki wypełnione mętnym płynem na owłosionej skórze głowy",
        "C. Drobnoplamista szorstka wysypka przypominająca papier ścierny z liniami Pastii",
        "D. Płomienne gardło z truskawkowym językiem i ropnymi czopami na migdałkach",
        "E. Uogólnione pęcherze z dodatnim objawem Nikolskiego"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Prawidłowa odpowiedź: A. Klasycznym i patognomonicznym objawem rumienia zakaźnego jest izolowany, intensywny rumień policzków (slapped-cheek appearance) z następowym pojawieniem się siateczkowatej, girlandowatej lub koronkowatej osutki na wyprostnych częściach kończyn.",
      expl: "Prawidłowa odpowiedź: A. Klasycznym i patognomonicznym objawem rumienia zakaźnego jest izolowany, intensywny rumień policzków (slapped-cheek appearance) z następowym pojawieniem się siateczkowatej, girlandowatej lub koronkowatej osutki na wyprostnych częściach kończyn."
    },
    {
      id: 2,
      q: "Czy dziecko z typową koronkowatą wysypką na policzkach i kończynach w przebiegu rumienia zakaźnego powinno być izolowane od rówieśników w szkole/przedszkolu?",
      opts: [
        "A. Tak, wymaga bezwzględnej izolacji szpitalnej przez 30 dni",
        "B. Nie, ponieważ w momencie pojawienia się charakterystycznej osutki dziecko nie jest już zakaźne dla otoczenia (wysypka ma charakter immunologiczny)",
        "C. Tak, dziecko zakaża przez kolejne 6 miesięcy w moczu",
        "D. Wymaga izolacji tylko wtedy, gdy temperatura otoczenia przekracza 25°C",
        "E. Izolacja zależy wyłącznie od stężenia dehydrogenazy mleczanowej (LDH)"
      ],
      options: [
        "A. Tak, wymaga bezwzględnej izolacji szpitalnej przez 30 dni",
        "B. Nie, ponieważ w momencie pojawienia się charakterystycznej osutki dziecko nie jest już zakaźne dla otoczenia (wysypka ma charakter immunologiczny)",
        "C. Tak, dziecko zakaża przez kolejne 6 miesięcy w moczu",
        "D. Wymaga izolacji tylko wtedy, gdy temperatura otoczenia przekracza 25°C",
        "E. Izolacja zależy wyłącznie od stężenia dehydrogenazy mleczanowej (LDH)"
      ],
      correctIdx: 1,
      correct: 1,
      exp: "Prawidłowa odpowiedź: B. Kluczowa zasada epidemiologiczna: chory na rumień zakaźny zakaża w fazie prodromalnej (przed wystąpieniem wysypki). Pojawienie się osutki zbiega się z obecnością przeciwciał neutralizujących i ustąpieniem wiremii – dziecko nie jest już zakaźne i nie wymaga izolacji.",
      expl: "Prawidłowa odpowiedź: B. Kluczowa zasada epidemiologiczna: chory na rumień zakaźny zakaża w fazie prodromalnej (przed wystąpieniem wysypki). Pojawienie się osutki zbiega się z obecnością przeciwciał neutralizujących i ustąpieniem wiremii – dziecko nie jest już zakaźne i nie wymaga izolacji."
    },
    {
      id: 3,
      q: "Najgroźniejszym powikłaniem pierwotnego zakażenia Parwowirusem B19 u kobiety w II trymestrze ciąży jest:",
      opts: [
        "A. Zespół różyczki wrodzonej",
        "B. Ciężka niedokrwistość płodu, uogólniony nieimmunologiczny obrzęk płodu (hydrops fetalis) i wewnątrzmaciczny zgon płodu",
        "C. Przetrwały przewód tętniczy Botalla u matki",
        "D. Przedwczesne skostnienie szwów czaszkowych płodu (kraniosynostoza)",
        "E. Zaćma wrodzona i mikrocefalia"
      ],
      options: [
        "A. Zespół różyczki wrodzonej",
        "B. Ciężka niedokrwistość płodu, uogólniony nieimmunologiczny obrzęk płodu (hydrops fetalis) i wewnątrzmaciczny zgon płodu",
        "C. Przetrwały przewód tętniczy Botalla u matki",
        "D. Przedwczesne skostnienie szwów czaszkowych płodu (kraniosynostoza)",
        "E. Zaćma wrodzona i mikrocefalia"
      ],
      correctIdx: 1,
      correct: 1,
      exp: "Prawidłowa odpowiedź: B. Parwowirus B19 niszczy komórki macierzyste układu czerwonokrwinkowego płodu w wątrobie, wywołując skrajną anemię, niewydolność serca, uogólniony obrzęk płodu (hydrops fetalis) i obumarcie wewnątrzmaciczne. Wirus nie jest czynnikiem teratogennym (nie powoduje wad narządowych).",
      expl: "Prawidłowa odpowiedź: B. Parwowirus B19 niszczy komórki macierzyste układu czerwonokrwinkowego płodu w wątrobie, wywołując skrajną anemię, niewydolność serca, uogólniony obrzęk płodu (hydrops fetalis) i obumarcie wewnątrzmaciczne. Wirus nie jest czynnikiem teratogennym (nie powoduje wad narządowych)."
    },
    {
      id: 4,
      q: "Przełom aplastyczny (transient aplastic crisis) wywołany przez Parwowirus B19 u pacjentów ze sferocytozą wrodzoną lub anemią sierpowatokrwistą manifestuje się w badaniach laboratoryjnych:",
      opts: [
        "A. Masywną retikulocytozą sięgającą 200 promili",
        "B. Prawidłowym poziomem hemoglobiny i izolowaną leukopenią",
        "C. Gwałtownym spadkiem stężenia hemoglobiny przy skrajnej retikulocytopenii (retikulocyty bliskie 0 promili)",
        "D. Masywnym podwyższeniem haptoglobiny w surowicy",
        "E. Izolowaną policytemią z hematokrytem >70%"
      ],
      options: [
        "A. Masywną retikulocytozą sięgającą 200 promili",
        "B. Prawidłowym poziomem hemoglobiny i izolowaną leukopenią",
        "C. Gwałtownym spadkiem stężenia hemoglobiny przy skrajnej retikulocytopenii (retikulocyty bliskie 0 promili)",
        "D. Masywnym podwyższeniem haptoglobiny w surowicy",
        "E. Izolowaną policytemią z hematokrytem >70%"
      ],
      correctIdx: 2,
      correct: 2,
      exp: "Prawidłowa odpowiedź: C. W przełomie aplastycznym dochodzi do zatrzymania erytropoezy w szpiku. Ponieważ erytrocyty w sferocytozie żyją bardzo krótko, brak dopływu nowych krwinek powoduje załamanie hematokrytu i hemoglobiny oraz całkowite zniknięcie retikulocytów z krwi obwodowej (retikulocyty 0 ‰).",
      expl: "Prawidłowa odpowiedź: C. W przełomie aplastycznym dochodzi do zatrzymania erytropoezy w szpiku. Ponieważ erytrocyty w sferocytozie żyją bardzo krótko, brak dopływu nowych krwinek powoduje załamanie hematokrytu i hemoglobiny oraz całkowite zniknięcie retikulocytów z krwi obwodowej (retikulocyty 0 ‰)."
    },
    {
      id: 5,
      q: "U dorosłych kobiet zakażenie Parwowirusem B19 najczęściej przebiega pod postacią:",
      opts: [
        "A. Ostrej, symetrycznej artropatii (bólu i zapalenia drobnych stawów rąk i kolan) imitującej reumatoidalne zapalenie stawów",
        "B. Zapalenia trzustki ze wstrząsem",
        "C. Ostrej niedrożności jelit",
        "D. Jednostronnego zapalenia nerwu wzrokowego",
        "E. Pęcherzowego oddzielania się naskórka"
      ],
      options: [
        "A. Ostrej, symetrycznej artropatii (bólu i zapalenia drobnych stawów rąk i kolan) imitującej reumatoidalne zapalenie stawów",
        "B. Zapalenia trzustki ze wstrząsem",
        "C. Ostrej niedrożności jelit",
        "D. Jednostronnego zapalenia nerwu wzrokowego",
        "E. Pęcherzowego oddzielania się naskórka"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Prawidłowa odpowiedź: A. U osób dorosłych (zwłaszcza kobiet) typowa osutka na twarzy występuje rzadko; dominuje ostra artropatia symetryczna (drobne stawy dłoni, nadgarstki, kolana), która ustępuje samoistnie po 2-4 tygodniach bez destrukcji stawów.",
      expl: "Prawidłowa odpowiedź: A. U osób dorosłych (zwłaszcza kobiet) typowa osutka na twarzy występuje rzadko; dominuje ostra artropatia symetryczna (drobne stawy dłoni, nadgarstki, kolana), która ustępuje samoistnie po 2-4 tygodniach bez destrukcji stawów."
    },
    {
      id: 6,
      q: "Jaki jest receptor komórkowy dla Parwowirusa B19 na komórkach układu czerwonokrwinkowego?",
      opts: [
        "A. Globazyd (antygen P grupy krwi)",
        "B. Cząsteczka CD4",
        "C. Receptor transferyny CD71",
        "D. Cząsteczka CCR5",
        "E. Glikoproteina Ib/IX"
      ],
      options: [
        "A. Globazyd (antygen P grupy krwi)",
        "B. Cząsteczka CD4",
        "C. Receptor transferyny CD71",
        "D. Cząsteczka CCR5",
        "E. Glikoproteina Ib/IX"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Prawidłowa odpowiedź: A. Parwowirus B19 wiąże się ze swoistym receptorem komórkowym – globazydem (antygenem P grupy krwi), obecnym na komórkach progenitorowych erytropoezy, megakariocytach oraz komórkach trofoblastu łożyska.",
      expl: "Prawidłowa odpowiedź: A. Parwowirus B19 wiąże się ze swoistym receptorem komórkowym – globazydem (antygenem P grupy krwi), obecnym na komórkach progenitorowych erytropoezy, megakariocytach oraz komórkach trofoblastu łożyska."
    },
    {
      id: 7,
      q: "Które z poniższych niefarmakologicznych zjawisk typowo nasila lub wyzwala nawrót wysypki w rumieniu zakaźnym?",
      opts: [
        "A. Gorąca kąpiel, wysiłek fizyczny, nasłonecznienie oraz silne emocje",
        "B. Przebywanie w ciemnym, chłodnym pokoju",
        "C. Picie zimnej wody niegazowanej",
        "D. Spożycie jabłka lub gruszki",
        "E. Długi, spokojny sen w nocy"
      ],
      options: [
        "A. Gorąca kąpiel, wysiłek fizyczny, nasłonecznienie oraz silne emocje",
        "B. Przebywanie w ciemnym, chłodnym pokoju",
        "C. Picie zimnej wody niegazowanej",
        "D. Spożycie jabłka lub gruszki",
        "E. Długi, spokojny sen w nocy"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Prawidłowa odpowiedź: A. Osutka w rumieniu zakaźnym wykazuje labilność pod wpływem czynników powodujących rozszerzenie naczyń skóry: gorącej wody, promieni UV, emocji, płaczu i wysiłku fizycznego.",
      expl: "Prawidłowa odpowiedź: A. Osutka w rumieniu zakaźnym wykazuje labilność pod wpływem czynników powodujących rozszerzenie naczyń skóry: gorącej wody, promieni UV, emocji, płaczu i wysiłku fizycznego."
    },
    {
      id: 8,
      q: "Czym jest zespół PPGSS (Papular Purpuric Gloves and Socks Syndrome)?",
      opts: [
        "A. Rzadką postacią zakażenia Parwowirusem B19 charakteryzującą się bolesnym obrzękiem i plamicą o ostrym odgraniczeniu na nadgarstkach i kostkach u nastolatków",
        "B. Zespołem metabolicznym wywołanym zatruciem rtęcią",
        "C. Zmianami skórnymi po ukąszeniu skorpiona",
        "D. Odmianą liszajca zakaźnego stóp",
        "E. Postacią łuszczycy krostkowej dłoni"
      ],
      options: [
        "A. Rzadką postacią zakażenia Parwowirusem B19 charakteryzującą się bolesnym obrzękiem i plamicą o ostrym odgraniczeniu na nadgarstkach i kostkach u nastolatków",
        "B. Zespołem metabolicznym wywołanym zatruciem rtęcią",
        "C. Zmianami skórnymi po ukąszeniu skorpiona",
        "D. Odmianą liszajca zakaźnego stóp",
        "E. Postacią łuszczycy krostkowej dłoni"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Prawidłowa odpowiedź: A. PPGSS to zespół grudkowo-plamiczy rękawiczek i skarpetek wywoływany przez B19 u młodzieży i młodych dorosłych, z ostro odgraniczonymi wykwitami na dystalnych częściach kończyn. W tej postaci pacjent zakaża w fazie wykwitów.",
      expl: "Prawidłowa odpowiedź: A. PPGSS to zespół grudkowo-plamiczy rękawiczek i skarpetek wywoływany przez B19 u młodzieży i młodych dorosłych, z ostro odgraniczonymi wykwitami na dystalnych częściach kończyn. W tej postaci pacjent zakaża w fazie wykwitów."
    },
    {
      id: 9,
      q: "W ultrasonograficznym monitorowaniu płodu matki ze świeżym zakażeniem Parwowirusem B19 parametrem służącym do wczesnego wykrywania niedokrwistości płodu jest:",
      opts: [
        "A. Maksymalna prędkość skurczowa przepływu w tętnicy środkowej mózgu (MCA-PSV)",
        "B. Średnica dwuciemieniowa główki płodu (BPD)",
        "C. Liczba ruchów oddechowych płodu w profilu biofizycznym",
        "D. Grubość tkanki tłuszczowej uda płodu",
        "E. Długość kości piszczelowej płodu"
      ],
      options: [
        "A. Maksymalna prędkość skurczowa przepływu w tętnicy środkowej mózgu (MCA-PSV)",
        "B. Średnica dwuciemieniowa główki płodu (BPD)",
        "C. Liczba ruchów oddechowych płodu w profilu biofizycznym",
        "D. Grubość tkanki tłuszczowej uda płodu",
        "E. Długość kości piszczelowej płodu"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Prawidłowa odpowiedź: A. W anemii płodu zmniejsza się lepkość krwi i wzrasta rzut serca, co powoduje wzrost prędkości skurczowej w tętnicy środkowej mózgu (MCA-PSV >1,5 MoM). Jest to bezinwazyjny marker ciężkiej niedokrwistości kwalifikujący płód do transfuzji dopłodowej.",
      expl: "Prawidłowa odpowiedź: A. W anemii płodu zmniejsza się lepkość krwi i wzrasta rzut serca, co powoduje wzrost prędkości skurczowej w tętnicy środkowej mózgu (MCA-PSV >1,5 MoM). Jest to bezinwazyjny marker ciężkiej niedokrwistości kwalifikujący płód do transfuzji dopłodowej."
    },
    {
      id: 10,
      q: "Czy Parwowirus B19 wywołuje teratogenne wady wrodzone u płodu (np. wady serca, zaćmę, rozszczepy)?",
      opts: [
        "A. Tak, u ponad 90% zakażonych płodów",
        "B. Nie, wirus nie wykazuje działania teratogennego; uszkodzenie płodu wynika z anemii, obrzęku i niedotlenienia tkanek",
        "C. Tak, wywołuje agenezję nerek",
        "D. Wywołuje wyłącznie zrośnięcie palców (syndaktylię)",
        "E. Wywołuje dysplazję wielotorbielowatą kości długich"
      ],
      options: [
        "A. Tak, u ponad 90% zakażonych płodów",
        "B. Nie, wirus nie wykazuje działania teratogennego; uszkodzenie płodu wynika z anemii, obrzęku i niedotlenienia tkanek",
        "C. Tak, wywołuje agenezję nerek",
        "D. Wywołuje wyłącznie zrośnięcie palców (syndaktylię)",
        "E. Wywołuje dysplazję wielotorbielowatą kości długich"
      ],
      correctIdx: 1,
      correct: 1,
      exp: "Prawidłowa odpowiedź: B. Parwowirus B19 nie jest wirusem teratogennym – nie powoduje embriopatii ani wad anatomicznych narządów płodu. Cała patologia wynika z niszczenia linii erytroidalnej, skrajnej anemii i obrzęku płodu (hydrops fetalis).",
      expl: "Prawidłowa odpowiedź: B. Parwowirus B19 nie jest wirusem teratogennym – nie powoduje embriopatii ani wad anatomicznych narządów płodu. Cała patologia wynika z niszczenia linii erytroidalnej, skrajnej anemii i obrzęku płodu (hydrops fetalis)."
    },
    {
      id: 11,
      q: "Jakie leczenie przyczynowe stosuje się w niepowikłanym rumieniu zakaźnym u 6-letniego dziecka?",
      opts: [
        "A. Acyklowir doustnie przez 10 dni",
        "B. Nie stosuje się żadnego leczenia przyczynowego ani przeciwwirusowego; choroba jest samoograniczająca się, a leczenie wyłącznie objawowe",
        "C. Amoksycylinę przez 14 dni",
        "D. Rybawirynę wziewnie",
        "E. Gancyklowir w pompie infuzyjnej"
      ],
      options: [
        "A. Acyklowir doustnie przez 10 dni",
        "B. Nie stosuje się żadnego leczenia przyczynowego ani przeciwwirusowego; choroba jest samoograniczająca się, a leczenie wyłącznie objawowe",
        "C. Amoksycylinę przez 14 dni",
        "D. Rybawirynę wziewnie",
        "E. Gancyklowir w pompie infuzyjnej"
      ],
      correctIdx: 1,
      correct: 1,
      exp: "Prawidłowa odpowiedź: B. W rumieniu zakaźnym u dzieci zdrowych nie stosuje się leczenia farmakologicznego (leki przeciwwirusowe nie są skuteczne i nie są wskazane). Choroba ustępuje samoistnie bez powikłań.",
      expl: "Prawidłowa odpowiedź: B. W rumieniu zakaźnym u dzieci zdrowych nie stosuje się leczenia farmakologicznego (leki przeciwwirusowe nie są skuteczne i nie są wskazane). Choroba ustępuje samoistnie bez powikłań."
    }
  ],
  flashcards: [
    {
      front: "Co charakteryzuje wysypkę w rumieniu zakaźnym (Parwowirus B19)?",
      back: "• Faza 1: Jaskrawy, lity rumień na policzkach z bladością wokół ust ('spoliczkowane dziecko').<br>• Faza 2: Siateczkowata, koronkowata, girlandowata osutka plamista na wyprostnych częściach kończyn.<br>• Wykwity bledną w środku i nasilają się pod wpływem ciepła/kąpieli/wysiłku."
    },
    {
      front: "Czy dziecko z wysypką w rumieniu zakaźnym zakaża rówieśników?",
      back: "• NIE! W momencie pojawienia się wysypki pacjent NIE JEST JUŻ ZAKAŹNY.<br>• Wysypka ma charakter immunologiczny (odkładanie kompleksów immunologicznych po eliminacji wiremii).<br>• Dziecko może chodzić do szkoły i przedszkola."
    },
    {
      front: "Jakie jest największe zagrożenie zakażenia Parwowirusem B19 w ciąży?",
      back: "• Niszczenie erytropoezy płodu -> skrajna niedokrwistość wewnątrzmaciczna.<br>• Niewydolność krążenia i nieimmunologiczny obrzęk płodu (hydrops fetalis).<br>• Wirus NIE wywołuje wad wrodzonych (brak teratogenności)!"
    },
    {
      front: "Czym jest przełom aplastyczny wywołany przez Parwowirus B19?",
      back: "• Występuje u pacjentów z przewlekłą hemolizą (sferocytoza, anemia sierpowatokrwista, talasemia).<br>• Zatrzymanie erytropoezy przez B19 prowadzi do zapaści hemoglobiny.<br>• W morfologii: skrajna retikulocytopenia (retikulocyty bliskie 0 ‰)!"
    },
    {
      front: "Jak manifestuje się zakażenie B19 u dorosłych kobiet?",
      back: "• Ostra, symetryczna artropatia (ból i zapalenie drobnych stawów rąk, nadgarstków i kolan).<br>• Może imitować rzut RZS.<br>• Ustępuje samoistnie po 2-4 tygodniach bez niszczenia stawów."
    },
    {
      front: "Jak monitorować ciężarną seroujemną po kontakcie z Parwowirusem B19?",
      back: "• Seryjne USG płodu co 1-2 tyg. przez 8-12 tygodni.<br>• Ocena prędkości skurczowej w tętnicy środkowej mózgu (MCA-PSV) pod kątem anemii.<br>• W razie ciężkiej anemii (>1,5 MoM) i hydrops fetalis: dopłodowa transfuzja dopępowa KKCz."
    }
  ]
};

async function main() {
  await saveCase(case115);
}
main();

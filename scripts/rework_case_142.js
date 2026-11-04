const fs = require('fs');
const path = require('path');
const { encryptStringAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

const case142 = {
  id: 142,
  dept: "Chirurgia naczyniowa",
  title: "Przewlekłe zagrażające kończynie niedokrwienie (CLTI / d. Krytyczne niedokrwienie)",
  shortTitle: "65-letni Janusz – Nocny ból stopy łagodzony spuszczaniem nogi z łóżka oraz martwica palucha (CLTI / Fontaine IV)",
  diagnosisTitle: "Przewlekłe zagrażające kończynie niedokrwienie (CLTI) prawej kończyny dolnej – Fontaine IV / Rutherford 5, skala WIfI, wskaźnik ABI <0,4, pilna rewaskularyzacja naczyniowa (PTA vs bypass żylny)",
  vitals: [
    { name: "Częstość akcji serca", val: "78/min", status: "vital-ok" },
    { name: "Ciśnienie tętnicze", val: "142/86 mmHg", status: "vital-warn" },
    { name: "Temperatura ciała", val: "36.8 °C", status: "vital-ok" },
    { name: "Saturacja SpO2", val: "97%", status: "vital-ok" }
  ],
  vitalsObj: {
    hr: 78,
    bp: "142/86",
    spo2: 97,
    rr: 16,
    temp: 36.8,
    gcs: 15
  },
  story: "<p><strong>Pacjent:</strong> 65-letni mężczyzna, rencista, zgłosił się do poradni naczyniowej z powodu nasilającego się od 4 tygodni, dokuczliwego, piekącego bólu prawej stopy, który występuje głównie w nocy w pozycji leżącej, wybudza go ze snu i zmusza do opuszczania nogi z łóżka lub spania na siedząco w fotelu.</p><p><strong>Wywiad chorobowy:</strong> Od około 2 lat pacjent odczuwał ból kurczowy prawej łydki podczas marszu (początkowo po przejściu 300 m, a od 3 miesięcy już po zaledwie 30-50 m). Od 2 tygodni na opuszce palucha prawej stopy pojawiło się niebolesne początkowo, czarne ognisko martwicze z owrzodzeniem, które nie goi się po maściach z apteki. W wywiadzie: wieloletnia cukrzyca typu 2 (słabo kontrolowana, HbA1c 8,4%), nikotynizm (40 paczkolat), nadciśnienie tętnicze oraz przewlekła choroba nerek (eGFR 52 ml/min). Przyjmuje metforminę, amlodypinę i aspirynę 75 mg.</p><p><strong>Badanie przedmiotowe na SOR:</strong> Prawa stopa chłodna, skóra lśniąca, z zanikiem owłosienia i zgrubiałymi, łamliwymi paznokciami. W próbie uniesienia kończyny (test Ratschowa) prawa stopa staje się woskowo blada w ciągu 20 sekund, natomiast po opuszczeniu występuje silne, sinoczerwone przekrwienie grawitacyjne (tzw. rubor dependent). Na opuszce palucha prawego obecne owrzodzenie o średnicy 1,5 cm pokryte suchym czarnym strupem martwiczym (sucha zgorzel), bez cech zapalenia kości i bez chełbotania. Tętno na prawej tętnicy udowej we wspólnym pniu jest dobrze wyczuwalne, natomiast brak tętna na tętnicy podkolanowej, grzbietowej stopy i piszczelowej tylnej prawej. Na lewej kończynie tętno na stopie jest słabo wyczuwalne.</p>",
  labs: [
    {
      name: "Morfologia krwi i parametry zapalne",
      items: [
        { name: "Hemoglobina (Hb)", val: "12.2 g/dl", norm: "13.5 - 17.5 g/dl", flag: "LOW" },
        { name: "Hematokryt (Hct)", val: "37.0 %", norm: "40.0 - 52.0 %", flag: "LOW" },
        { name: "Leukocyty (WBC)", val: "9.8 G/l", norm: "4.0 - 10.0 G/l", flag: "NORMAL" },
        { name: "Płytki krwi (PLT)", val: "290 G/l", norm: "150 - 400 G/l", flag: "NORMAL" },
        { name: "CRP", val: "22 mg/l", norm: "< 5.0 mg/l", flag: "HIGH" }
      ]
    },
    {
      name: "Biochemia, gospodarka węglowodanowa i nerkowa",
      items: [
        { name: "Glukoza na czczo", val: "164 mg/dl", norm: "70 - 99 mg/dl", flag: "HIGH" },
        { name: "Hemoglobina glikowana (HbA1c)", val: "8.4 %", norm: "< 7.0 %", flag: "HIGH" },
        { name: "Kreatynina", val: "1.38 mg/dl", norm: "0.7 - 1.2 mg/dl", flag: "HIGH" },
        { name: "eGFR", val: "52 ml/min/1.73m2", norm: "> 90 ml/min", flag: "LOW" },
        { name: "Mocznik", val: "48 mg/dl", norm: "15 - 45 mg/dl", flag: "HIGH" },
        { name: "Cholesterol całkowity", val: "220 mg/dl", norm: "< 190 mg/dl", flag: "HIGH" },
        { name: "Cholesterol LDL", val: "142 mg/dl", norm: "< 55 mg/dl (b. wysokie ryzyko)", flag: "HIGH" }
      ]
    },
    {
      name: "Badania hemostazy",
      items: [
        { name: "INR", val: "1.02", norm: "0.8 - 1.2", flag: "NORMAL" },
        { name: "APTT", val: "30 s", norm: "26 - 36 s", flag: "NORMAL" },
        { name: "Fibrynogen", val: "4.2 g/l", norm: "2.0 - 4.0 g/l", flag: "HIGH" }
      ]
    }
  ],
  steps: [
    {
      title: "Krok 1: Wstępna ocena kliniczna i wywiad",
      text: "Lekarz naczyniowy analizuje objawy: nocny ból spoczynkowy stopy ustępujący po opuszczeniu nogi oraz martwicze owrzodzenie palucha. Dlaczego pacjenci z zaawansowanym niedokrwieniem kończyn dolnych opuszczają nogę poza brzeg łóżka lub śpią w fotelu?",
      options: [
        "Opuszczenie kończyny zwiększa ciśnienie hydrostatyczne słupa krwi w mikrokrążeniu stopy, co przejściowo poprawia perfuzję włośniczkową i łagodzi dokuczliwy ból niedokrwienny",
        "Opuszczenie kończyny powoduje odruchowe pobudzenie nerwu kulszowego przez receptory termiczne",
        "W pozycji opuszczonej krew tętnicza całkowicie cofa się do aorty",
        "Jest to natręctwo psychoruchowe niemające podłoża hemodynamicznego"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>To patognomoniczny objaw spoczynkowego bólu niedokrwiennego (rest pain):</strong> w pozycji leżącej ciśnienie perfuzyjne w tętnicach stopy u pacjentów ze zwężeniami tętnic drastycznie spada, co wywołuje dotkliwy ból spowodowany niedotlenieniem nocyceptorów. <strong>Opuszczenie kończyny w dół dodaje do ciśnienia perfuzyjnego ciśnienie hydrostatyczne słupa krwi (ok. 60-80 mmHg)</strong>, co nieznacznie poprawia przepływ włośniczkowy i przynosi chwilową ulgę w bólu. Pacjenci często miesiącami śpią w fotelach, co wtórnie prowadzi do masywnego obrzęku grawitacyjnego stóp.",
        "❌ BŁĄD! <strong>Mechanizm jest czysto hemodynamiczny (ciśnienie hydrostatyczne włośniczek), a nie odruchowy.</strong>",
        "❌ BŁĄD! <strong>Krew tętnicza płynie zgodnie z gradientem ciśnień ku stopie.</strong>",
        "❌ BŁĄD! <strong>To fizyczny, obiektywny objaw krytycznego niedokrwienia tkanek.</strong>"
      ]
    },
    {
      title: "Krok 2: Klasyfikacja Fontaine'a i Rutherforda",
      text: "W celu ujednolicenia oceny stopnia zaawansowania przewlekłego niedokrwienia kończyn dolnych (PAD/LEAD) stosuje się klasyfikację Fontaine'a i Rutherforda. Do jakiego stopnia wg Fontaine'a oraz kategorii wg Rutherforda kwalifikuje się opisywany pacjent?",
      options: [
        "Stopień IV wg Fontaine'a / Kategoria 5 wg Rutherforda (obecność martwicy/owrzodzenia troficznego i bólu spoczynkowego – CLTI)",
        "Stopień I wg Fontaine'a / Kategoria 0 wg Rutherforda (bezobjawowe zwężenie tętnic)",
        "Stopień IIb wg Fontaine'a / Kategoria 2 wg Rutherforda (chromanie przestankowe na dystansie <200 m)",
        "Stopień III wg Fontaine'a / Kategoria 4 wg Rutherforda (izolowany ból spoczynkowy bez ubytków tkankowych)"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Klasyfikacja Fontaine'a vs Rutherforda:</strong><br>- <strong>Fontaine I:</strong> bezobjawowe zwężenie (Rutherford 0).<br>- <strong>Fontaine IIa:</strong> chromanie przestankowe nieupośledzające (>200 m, Rutherford 1).<br>- <strong>Fontaine IIb:</strong> chromanie przestankowe ciężkie (<200 m, Rutherford 2-3).<br>- <strong>Fontaine III:</strong> spoczynkowy ból niedokrwienny bez martwicy (Rutherford 4).<br>- <strong>Fontaine IV:</strong> <strong>ubytki tkankowe – owrzodzenie niedokrwienne lub martwica/zgorzel (gangrena)</strong> (Rutherford 5: drobne ubytki tkanek na palcach; Rutherford 6: rozległa martwica stopy powyżej poziomu stawów śródstopia). U naszego chorego obecność owrzodzenia i martwicy na paluchu definiuje <strong>Fontaine IV / Rutherford 5 (CLTI)</strong>.",
        "❌ BŁĄD! <strong>Stopień I to postać bezobjawowa.</strong>",
        "❌ BŁĄD! <strong>Stopień II to samo chromanie, a pacjent ma już ból spoczynkowy i martwicę.</strong>",
        "❌ BŁĄD! <strong>Stopień III obejmuje wyłącznie ból spoczynkowy bez martwicy i owrzodzeń.</strong>"
      ]
    },
    {
      title: "Krok 3: Pomiary ciśnień i wskaźnik kostka-ramię (ABI) – Pułapka mediasklerozy",
      text: "Lekarz wykonuje pomiar wskaźnika kostka-ramię (ABI – Ankle-Brachial Index). U pacjenta z długoletnią cukrzycą zmierzono ABI i uzyskano wynik 1,48. Jak należy zinterpretować ten wynik i jakie badanie hemodynamiczne należy wykonać?",
      options: [
        "Wynik ABI >1,40 jest fałszywie zawyżony z powodu niepodatności i zwapnienia tętnic (mediaskleroza Mönckeberga typowa dla cukrzycy i PChN); nie wyklucza niedokrwienia! Należy wykonać pomiar wskaźnika paluch-ramię (TBI) lub przezskórnego ciśnienia parcjalnego tlenu (tcPO2)",
        "Wynik ABI >1,40 oznacza idealnie zdrowe, nadzwyczaj elastyczne naczynia tętnicze",
        "Wynik ten świadczy o ostrej zakrzepicy żyły wrotnej",
        "Należy natychmiast rozpoznać żylaki przymacicza"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>To jedna z najważniejszych pułapek diagnostycznych na egzaminie LEK!</strong><br>- <strong>Norma ABI:</strong> 0,90 - 1,40.<br>- <strong>Niedokrwienie kończyn:</strong> ABI <0,90 (w CLTI typowo <strong><0,40</strong> lub ciśnienie skurczowe na kostce <50 mmHg).<br>- <strong>Wapnienie błony środkowej (stwardnienie tętnic Mönckeberga):</strong> występuje u chorych z <strong>cukrzycą</strong> i <strong>przewlekłą chorobą nerek (PChN)</strong>. Tętnice piszczelowe stają się sztywne jak 'rury ołowiane' i nie dają się ucisnąć mankietem ciśnieniomierza, co daje <strong>fałszywie zawyżony ABI (>1,40)</strong>!<br>W tej sytuacji naczyniem z wyboru są małe tętnice palucha, które rzadko ulegają mediasklerozie – mierzy się <strong>wskaźnik paluch-ramię (TBI – Toe-Brachial Index)</strong> (wartość <0,70, a w CLTI ciśnienie na paluchu <30 mmHg) lub <strong>tcPO2 (<30 mmHg)</strong>.",
        "❌ BŁĄD! <strong>Wartości >1,40 to patologia zwapnienia ściany, a nie cecha zdrowych naczyń!</strong>",
        "❌ BŁĄD! <strong>ABI ocenia tętnice kończyn dolnych, nie ma związku z żyłą wrotną.</strong>",
        "❌ BŁĄD! <strong>Żylaki to domena flebologii.</strong>"
      ]
    },
    {
      title: "Krok 4: Nowoczesna klasyfikacja WIfI w ocenie ryzyka amputacji",
      text: "Współczesne wytyczne naczyniowe (Global Vascular Guidelines) zalecają ocenę chorych z CLTI za pomocą klasyfikacji WIfI. Jakie trzy składowe wchodzą w skład akronimu WIfI?",
      options: [
        "Wound (stopień owrzodzenia/martwicy), Ischemia (stopień niedokrwienia na podstawie TBI/tcPO2/ABI) oraz foot Infection (nasilenie infekcji stopy)",
        "Weight (masa ciała), Inflammation (stan zapalny), Fracture (złamanie kości)",
        "Walking distance (dystans chromania), Infarction (zawał), Insomnia (bezsenność)",
        "Water (nawodnienie), Ions (elektrolity), Fasting (glikemia na czczo)"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Klasyfikacja WIfI (Society for Vascular Surgery) ocenia 3 kluczowe filary decydujące o rokowaniu kończyny:</strong><br>1. <strong>W (Wound) – Rana:</strong> stopień 0 (brak rany, sam ból) do stopnia 3 (rozległe owrzodzenie z głęboką martwicą śródstopia/pięty).<br>2. <strong>I (Ischemia) – Niedokrwienie:</strong> stopień 0 (brak niedokrwienia, ABI >0,8, TBI >0,6) do stopnia 3 (ciężkie niedokrwienie, ABI <0,4, TBI <30 mmHg, tcPO2 <30 mmHg).<br>3. <strong>fI (foot Infection) – Infekcja stopy:</strong> stopień 0 (brak zakażenia) do stopnia 3 (ciężka infekcja z sepsą / SIRS).<br>Połączenie tych trzech cech określa 1-roczne ryzyko amputacji kończyny oraz stopień korzyści z planowanej rewaskularyzacji.",
        "❌ BŁĄD! <strong>WIfI to Wound, Ischemia, foot Infection.</strong>",
        "❌ BŁĄD! <strong>Dystans chromania to skala Fontaine/Rutherford, nie WIfI.</strong>",
        "❌ BŁĄD! <strong>WIfI nie ocenia bilansu płynów ustrojowych.</strong>"
      ]
    },
    {
      title: "Krok 5: Diagnostyka obrazowa układu tętniczego przed rewaskularyzacją",
      text: "Pacjent ma eGFR = 52 ml/min. Zespół kwalifikuje go do precyzyjnego mapowania tętnic przed zabiegiem naczyniowym. Jakie badania obrazowe są rekomendowane w planowaniu rewaskularyzacji w CLTI?",
      options: [
        "USG Duplex Doppler tętnic kończyn dolnych jako badanie pierwszego rzutu, uzupełnione o Angio-TK z ochroną nerek (lub Angio-MRI bez kontrastu gadolinowego lub bezpośrednią cyfrową angiografię subtrakcyjną DSA na sali hybrydowej)",
        "Przeglądowe zdjęcie RTG miednicy na leżąco jako jedyne badanie",
        "Wyłącznie tomografia komputerowa głowy",
        "Scyntygrafia kości z użyciem radioizotopów"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Planowanie anatomiczne w CLTI wymaga precyzyjnego zobrazowania trzech pięter naczyniowych:</strong> biodrowego (napływ – inflow), udowo-podkolanowego oraz tętnic podudzia i stopy (odpływ – outflow / runoff).<br>1. <strong>USG Duplex Doppler:</strong> nieinwazyjne badanie pierwszego rzutu, całkowicie bezpieczne dla nerek.<br>2. <strong>Angio-TK (CTA):</strong> doskonała rozdzielczość przestrzenna; u chorych z PChN wymaga odpowiedniego nawodnienia krystaloidami przed i po badaniu celem ochrony przed nefropatią kontrastową (CIN).<br>3. <strong>Angio-MRI (MRA):</strong> alternatywa u chorych z alergią na jod.<br>4. <strong>DSA (Digital Subtraction Angiography):</strong> złoty standard wykonywany bezpośrednio podczas procedury zabiegowej w sali hybrydowej.",
        "❌ BŁĄD! <strong>Zwykłe RTG nie uwidocznia światła naczyń tętniczych.</strong>",
        "❌ BŁĄD! <strong>TK głowy nie ocenia tętnic kończyn dolnych.</strong>",
        "❌ BŁĄD! <strong>Scyntygrafia nie służy do mapowania naczyniowego przed pomostowaniem/PTA.</strong>"
      ]
    },
    {
      title: "Krok 6: Strategia rewaskularyzacji: Endowaskularna vs Pomost omijający (Bypass)",
      text: "Badanie naczyniowe wykazało długie zwężenie tętnicy udowej powierzchownej (SFA) oraz niedrożność tętnicy piszczelowej przedniej. Jakie są opcje definitywnej rewaskularyzacji i co jest materiałem z wyboru w przypadku chirurgicznego pomostowania poniżej kolana?",
      options: [
        "Rewaskularyzacja endowaskularna (przezskórna angioplastyka balonowa PTA ze stentem powlekanym lekiem DES/DCB) LUB operacja otwarta: pomost omijający (bypass), w którym materiałem z wyboru o najwyższej drożności odległej jest własna, autologiczna żyła odpiszczelowa (GSV)",
        "Wyłącznie protezy ze sztucznego tworzywa (Dacron) – żyła własna chorego jest przeciwwskazana",
        "Usunięcie wszystkich mięśni łydki w celu zmniejszenia zapotrzebowania na tlen",
        "Wstrzyknięcie komórek macierzystych do rany bez ingerencji w naczynia"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Współczesna chirurgia naczyniowa stosuje strategię hybrydową opartą na kryteriach anatomicznych i ogólnym stanie chorego (zgodnie z badaniami BEST-CLI i BASIL-2):</strong><br>1. <strong>Techniki endowaskularne (PTA / stenty DES / balony powlekane lekiem DCB):</strong> metoda mniej inwazyjna, preferowana u chorych obciążonych internistycznie i przy krótszych zmianach naczyniowych.<br>2. <strong>Chirurgia otwarta (Bypass):</strong> w pomostach poniżej więzadła pachwinowego (zwłaszcza na tętnice podkolanowe i podudzia) <strong>złotym standardem i materiałem z wyboru jest własna, odwrócona lub in situ żyła odpiszczelowa (Great Saphenous Vein – GSV)!</strong> Protezy syntetyczne (PTFE/Dacron) poniżej kolana cechują się znacznie gorszą drożnością odległą i wysokim odsetkiem zakrzepicy.",
        "❌ BŁĄD! <strong>Własna żyła odpiszczelowa jest niekwestionowanym złotym standardem materiału pomostu; protezy sztuczne stosuje się tylko w razie braku żyły.</strong>",
        "❌ BŁĄD! <strong>Wycięcie mięśni to okaleczenie prowadzące do utraty funkcji kończyny.</strong>",
        "❌ BŁĄD! <strong>Terapia komórkowa nie ma udowodnionej skuteczności i nie zastępuje mechanicznego przywrócenia przepływu.</strong>"
      ]
    },
    {
      title: "Krok 7: Kompleksowa farmakoterapia w CLTI i redukcja ryzyka sercowo-naczyniowego",
      text: "Pacjenci z CLTI mają skrajnie wysokie roczne ryzyko zawału serca, udaru mózgu i zgonu sercowo-naczyniowego (sięgające 20-25%). Jaka intensywna farmakoterapia farmakologiczna jest bezwzględnie wskazana u każdego chorego z CLTI?",
      options: [
        "Wysoka dawka statyny (np. atorwastatyna 80 mg), leczenie przeciwpłytkowe/przeciwkrzepliwe (ASA 100 mg + rywaroksaban 2,5 mg 2x/d wg badania COMPASS lub klopidogrel 75 mg), ścisła kontrola ciśnienia tętniczego (ACEI/ARB) oraz wyrównanie glikemii (SGLT2/GLP-1)",
        "Stosowanie wyłącznie preparatów witaminy C i magnezu",
        "Podawanie doustnych leków przeciwzakrzepowych z całkowitym zakazem stosowania statyn",
        "Leczenie wyłącznie antybiotykami przez 12 miesięcy"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Chory z CLTI to pacjent o ekstremalnym ryzyku incydentów sercowo-naczyniowych (MACE) i utraty kończyny (MALE). Standard 'Best Medical Therapy' obejmuje:</strong><br>1. <strong>Intensywna terapia hipolipemizująca:</strong> wysoka dawka silnej statyny (<span class='dose-pill'>Atorwastatyna 80 mg/d</span> lub <span class='dose-pill'>Rosuwastatyna 40 mg/d</span>) z celem LDL <55 mg/dl.<br>2. <strong>Terapia naczyniowa:</strong> strategia z badania COMPASS: <span class='dose-pill'>Kwas acetylosalicylowy 100 mg raz/d</span> + <span class='dose-pill'>Rywaroksaban 2,5 mg 2x/d</span> (redukuje amputacje i zgon) LUB <span class='dose-pill'>Klopidogrel 75 mg raz/d</span>.<br>3. <strong>Kontrola ciśnienia tętniczego:</strong> leki blokujące układ RAA (<span class='dose-pill'>Ramipryl 5-10 mg/d</span>).<br>4. <strong>Wyrównanie cukrzycy:</strong> inhibitory SGLT2 lub agoniści GLP-1 (HbA1c <7%).<br>5. <strong>Bezwzględne zaprzestanie palenia tytoniu!</strong>",
        "❌ BŁĄD! <strong>Witaminy nie zmniejszają śmiertelności naczyniowej.</strong>",
        "❌ BŁĄD! <strong>Statyny są bezwzględnym fundamentem stabilizacji blaszki miażdżycowej.</strong>",
        "❌ BŁĄD! <strong>Antybiotyki stosuje się tylko w przypadku czynnego zakażenia rany, nie jako terapię podstawową miażdżycy.</strong>"
      ]
    },
    {
      title: "Krok 8: Miejscowe zaopatrzenie martwicy i zasady pielęgnacji rany w CLTI",
      text: "Na opuszce palucha obecny jest suchy, czarny strup martwiczy bez cech zakażenia, wysięku i bez zapalenia kości. Jakie jest prawidłowe postępowanie miejscowe z tą zmianą PRZED wykonaniem rewaskularyzacji naczyniowej?",
      options: [
        "Pozostawienie suchej martwicy w spokoju (nie debridować, nie moczyć w wodzie!), dezynfekcja preparatem antyseptycznym na bazie alkoholu (np. jodopowidon/octenidyna), suchy jałowy opatrunek i odciążenie; chirurgiczne opracowanie martwicy lub amputację palucha wykonuje się dopiero PO udanej rewaskularyzacji tętniczej!",
        "Agresywne wycięcie całej martwicy łyżeczką kostną w gabinecie zabiegowym bez znieczulenia i przed udrożnieniem naczyń",
        "Zalecenie codziennych 2-godzinnych ciepłych kąpieli stóp w mydlinach",
        "Nałożenie ciasnego gipsu stopowo-goleniowego na 6 miesięcy"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>To kardynalna zasada chirurgii naczyniowej: 'Nigdy nie debriduj i nie wycinaj suchej martwicy w niedokrwionej stopie PRZED przywróceniem krążenia tętniczego!'</strong> Usunięcie suchego strupa przy braku ukrwienia obnaża tkanki, które nie mają szans się zagoić, otwiera wrota dla infekcji bakteryjnej i przekształca suchą, stabilną zgorzel w wilgotną, zagrażającą sepsą zgorzel gazową wymagającą amputacji goleni! Suchą martwicę utrzymuje się w suchości (antyseptyki, suchy opatrunek). Dopiero <strong>po skutecznej rewaskularyzacji</strong> (gdy stopa stanie się ciepła i różowa) wykonuje się nekrektomię lub amputację brzeżną palucha, co gwarantuje prawidłowe wygojenie rany.",
        "❌ BŁĄD! <strong>Agresywne wycinanie suchej martwicy przed udrożnieniem tętnicy prowadzi do gwałtownego rozpadu i zgorzeli całej stopy!</strong>",
        "❌ BŁĄD! <strong>Moczenie stóp z martwicą wywołuje macerację tkanek i przekształcenie w septyczną zgorzel wilgotną.</strong>",
        "❌ BŁĄD! <strong>Gips wywoła odleżyny i zniszczenie niedokrwionej stopy.</strong>"
      ]
    }
  ],
  pathoNodes: [
    {
      badge: "Miażdżyca zarostowa",
      title: "Okluzja łożyska podkolanowo-stopowego",
      short: "Zwężenia miażdżycowe tętnicy udowej powierzchownej i podudzia",
      detail: "Wieloletnia cukrzyca i nikotynizm indukują dysfunkcję śródbłonka, odkładanie lipidów i masywne zwapnienia tętnic dystalnych. Dochodzi do krytycznego spadku ciśnienia perfuzyjnego poniżej progu autoregulacji.",
      target: "Tętnice udowe, podkolanowe i tętnice goleni",
      drugTarget: "<span class='dose-pill'>Atorwastatyna 80 mg/d</span> intensywna redukcja LDL <55 mg/dl"
    },
    {
      badge: "Ból spoczynkowy",
      title: "Niedotlenienie włókien C i kwasica tkankowa",
      short: "Spadek perfuzji w poziomie; ból wybudzający ze snu",
      detail: "W pozycji leżącej utrata grawitacyjnego ciśnienia hydrostatycznego obniża prężność tlenu w mikrokrążeniu stopy poniżej 10-20 mmHg. Kwasica i mediatorzy zapalni stale drażnią nocyceptywne włókna nerwowe C.",
      target: "Zakończenia nerwów czuciowych stopy",
      drugTarget: "<span class='dose-pill'>Rewaskularyzacja PTA / Bypass</span> przywrócenie ciśnienia perfuzyjnego"
    },
    {
      badge: "Mediaskleroza",
      title: "Wapnienie błony środkowej Mönckeberga",
      short: "Sztywność tętnic dająca fałszywie wysoki wskaźnik ABI >1,4",
      detail: "Zwapnienie warstwy mięśniowej tętnic u cukrzyków uniemożliwia ich ściśnięcie mankietem ciśnieniomierza, maskując głębokie niedokrwienie. Niezbędny jest pomiar ciśnień na paluchu (TBI).",
      target: "Błona środkowa tętnic piszczelowych",
      drugTarget: "<span class='dose-pill'>Pomiar TBI / tcPO2</span> wiarygodna ocena hemofizykalna"
    },
    {
      badge: "Martwica niedokrwienna",
      title: "Ubytek tkankowy i ryzyko utraty kończyny",
      short: "Zawał skóry i tkanki podskórnej palucha; sucha zgorzel",
      detail: "Zaciśnięcie mikrokrążenia i mikrozakrzepy prowadzą do koagulacyjnej martwicy naskórka i skóry właściwej. Brak ochrony przed urazem mechanicznym skutkuje powstaniem przewlekłego owrzodzenia.",
      target: "Skóra i opuszka palucha stopy",
      drugTarget: "<span class='dose-pill'>Suchy opatrunek jałowy</span> i zakaz wczesnego debridementu"
    }
  ],
  diffTable: {
    title: "⚔️ Tabela Różnicowa: CLTI vs Owrzodzenie żylne vs Stopa cukrzycowa neuropatyczna",
    headers: ["Cecha kliniczna", "CLTI (Owrzodzenie tętnicze)", "Owrzodzenie żylne goleni (CVI)", "Stopa cukrzycowa (Neuropatyczna)", "Ostre niedokrwienie kończyny (ALI)", "Zwyrodnienie stawów kręgosłupa (Chromanie rzekome)"],
    rows: [
      ["Lokalizacja owrzodzenia / bólu", "Dystalne części palców stóp, opuszki, brzegi stopy, pięta ('punkty ucisku obuwia')", "Typowo nad kostką przyśrodkową (gaiter zone); rzadko na stopie", "Podeszwowa strona stopy, pod głowami kości śródstopia (miejsca wzmożonego nacisku)", "Nagły, rozdzierający ból całego podudzia i stopy; brak owrzodzenia we wczesnej fazie", "Ból w pośladkach i udach obustronnie podczas stania i chodzenia, ustępuje przy pochyleniu w przód"],
      ["Ból spoczynkowy", "Bardzo silny ból spoczynkowy w nocy, nasila się przy uniesieniu, łagodnieje przy opuszczeniu", "Ból tępy, uczucie ciężkości nóg pod koniec dnia, ustępuje po uniesieniu kończyny w górę!", "Brak bólu (z powodu polineuropatii czuciowej), bezbolesne 'malum perforans pedis'", "Skrajny, ciągły ból spoczynkowy o nagłym początku", "Brak bólu spoczynkowego w łóżku; ból związany ze zmianą pozycji kręgosłupa"],
      ["Tętno obwodowe na stopie", "Brak tętna (na t. grzbietowej stopy i piszczelowej tylnej); ABI <0,4 lub TBI <0,7", "Tętno w pełni zachowane (choć trudne do zbadania przy masywnym obrzęku)", "Tętno w pełni zachowane, naczynia obwodowe tętnią prawidłowo", "Gwałtowny, całkowity brak tętna poniżej miejsca zatoru", "Tętno całkowicie prawidłowe na obu kończynach dolnych"],
      ["Brzegi i wygląd owrzodzenia", "Głębokie, 'wycięte sztancą' brzegi, blade lub czarne dno z suchą martwicą, brak wysięku", "Płytkie, nieregularne brzegi, dno ziarninujące z obfitym wysiękiem surowiczym", "Głębokie, modzelowate, hiperkeratotyczne brzegi z obfitą ziarniną w dnie", "Brak owrzodzenia w fazie ostrej; kategoryczna bladość skóry", "Brak owrzodzeń troficznych"],
      ["Cechy skóry otaczającej", "Cienka, lśniąca, chłodna, bez owłosienia, sinoczerwona przy opuszczeniu (rubor)", "Obrzęk, przebarwienia hemosyderynowe (brązowa skóra), lipodermatoskleroza, wyprysk zastoinowy", "Ciepła, sucha (anhidrosis przez neuropatię autonomiczną), modzele, zniekształcenia Charcota", "Trupio blada, marmurkowata, w dotyku lodowato zimna", "Prawidłowe ucieplenie i trofika skóry"],
      ["Leczenie pierwszego rzutu", "Pilna rewaskularyzacja naczyniowa (PTA/stent lub bypass żylny) + Best Medical Therapy", "Terapia kompresyjna (pończochy uciskowe, bandaże wielowarstwowe) + uniesienie kończyny", "Odciążenie stopy (Total Contact Cast, ortezy), usunięcie modzeli, edukacja", "Pilna embolektomia Fogarty'ego + UFH i.v. w ciągu <6 godzin", "Rehabilitacja, fizjoterapia, operacja odbarczenia stenozy kanału kręgowego"]
    ]
  },
  dutySummary: {
    overview: "Przewlekłe zagrażające kończynie niedokrwienie (CLTI – Chronic Limb-Threatening Ischemia, dawniej krytyczne niedokrwienie kończyn CLI) jest skrajną postacią miażdżycy tętnic obwodowych (PAD), charakteryzującą się przewlekłym (>2 tyg.) spoczynkowym bólem niedokrwiennym, owrzodzeniem lub martwicą tkanek. Nieleczone prowadzi do amputacji kończyny u >25% chorych w ciągu roku oraz wiąże się z 20-25% śmiertelnością roczną.",
    diagnostics: "1. Ocena kliniczna: ból spoczynkowy wybudzający ze snu, bladość przy uniesieniu (Ratschow), przekrwienie po opuszczeniu (rubor), brak tętna obwodowego.<br>2. Pomiary ciśnień naczyniowych: wskaźnik kostka-ramię (ABI; w CLTI <0,40 lub ciśnienie na kostce <50 mmHg).<br>3. Wskaźnik paluch-ramię (TBI; norma >0,7; w CLTI ciśnienie na paluchu <30 mmHg) lub tcPO2 (<30 mmHg) – badanie obowiązkowe u chorych z cukrzycą i PChN z fałszywie zawyżonym ABI >1,40 z powodu mediasklerozy.<br>4. Klasyfikacja WIfI (Wound, Ischemia, foot Infection) celem stratyfikacji ryzyka utraty kończyny.<br>5. Badania obrazowe: USG Duplex Doppler, Angio-TK z uwzględnieniem eGFR, Angio-MRI lub bezpośrednia angiografia subtrakcyjna (DSA) na sali hybrydowej.",
    drugsAndDoses: "1. Intensywna terapia statynowa: <span class='dose-pill'>Atorwastatyna 80 mg raz/dobę p.o.</span> (cel LDL <55 mg/dl i redukcja o >=50%).<br>2. Terapia przeciwkrzepliwo-przeciwpłytkowa (schemat COMPASS):<br>   - <span class='dose-pill'>Kwas acetylosalicylowy 100 mg raz/d</span> + <span class='dose-pill'>Rywaroksaban 2,5 mg 2x/d p.o.</span> LUB<br>   - <span class='dose-pill'>Klopidogrel 75 mg raz/d p.o.</span> w monoterapii.<br>3. Analgezja wieloskładnikowa w bólu spoczynkowym:<br>   - <span class='dose-pill'>Tramadol 50-100 mg p.o. co 6-8 h</span> + <span class='dose-pill'>Paracetamol 1000 mg p.o. co 6 h</span> LUB opioidy (morfina/oksykodon).<br>4. Prostanoidy dożylne w przypadku braku możliwości rewaskularyzacji naczyniowej:<br>   - <span class='dose-pill'>Alprostadyl 60 µg we wlewie i.v. przez 2-3 h raz/d</span> przez 2-4 tygodnie.<br>5. Optymalizacja leczenia cukrzycy: <span class='dose-pill'>Empagliflozyna 10 mg/d</span> lub <span class='dose-pill'>Semaglutyd s.c.</span> (cel HbA1c <7,0%).",
    procedures: "1. Rewaskularyzacja endowaskularna (metoda pierwszego rzutu u większości chorych obciążonych): przezskórna angioplastyka balonowa (PTA), balony powlekane lekiem (DCB), implantacja stentów samorozprężalnych lub powlekanych lekiem (DES).<br>2. Chirurgiczne pomostowanie omijające (Bypass): wszczepienie odwróconego lub in situ pomostu z autologicznej żyły odpiszczelowej (GSV) – złoty standard w pomostach poniżej kolana.<br>3. Zabiegi hybrydowe (jednoczasowa endarterektomia tętnicy udowej z plastyką łatą i balonowanie tętnic obwodowych).<br>4. Miejscowe zaopatrzenie rany: ochrona suchej martwicy (jodopowidon/octenidyna, suchy jałowy opatrunek); nekrektomia lub amputacja palucha/przodostopia wyłącznie PO skutecznej rewaskularyzacji tętniczej.",
    monitoring: "1. Monitorowanie gojenia owrzodzenia i ustąpienia bólu spoczynkowego po zabiegu.<br>2. Okresowe kontrole USG Duplex Doppler drożności stentu lub pomostu żylnego po 1, 3, 6 i 12 miesiącach.<br>3. Pomiary TBI lub ciśnienia na kostce w celu obiektywnego potwierdzenia skuteczności hemodynamicznej rewaskularyzacji.<br>4. Stała kontrola glikemii, ciśnienia tętniczego i stężenia cholesterolu LDL w poradni kardiologiczno-diabetologicznej.<br>5. Bezwzględna edukacja w zakresie pielęgnacji stóp, noszenia specjalistycznego obuwia odciążającego i zakazu chodzenia boso."
  },
  lekQuestions: [
    {
      question: "Przewlekłe zagrażające kończynie niedokrwienie (CLTI – Chronic Limb-Threatening Ischemia) definiuje się klinicznie jako:",
      options: [
        "Przewlekły (trwający >2 tygodnie) spoczynkowy ból niedokrwienny stopy, obecność owrzodzenia troficznego lub martwicy tkanek spowodowane miażdżycą tętnic",
        "Nagły brak tętna na kończynie trwający krócej niż 6 godzin",
        "Obrzęk goleni z obecnością brązowych przebarwień i owrzodzenia żylnego nad kostką przyśrodkową",
        "Chromanie przestankowe po przejściu dystansu powyżej 500 metrów bez bólu spoczynkowego",
        "Ból mięśni uda występujący wyłącznie w trakcie szybkiego biegu"
      ],
      correct: 0,
      expl: "Zgodnie z wytycznymi Global Vascular Guidelines, CLTI (Chronic Limb-Threatening Ischemia) definiuje się jako udowodnione obiektywnie niedokrwienie tętnicze kończyny dolnej manifestujące się przewlekłym (trwającym co najmniej 2 tygodnie) spoczynkowym bólem niedokrwiennym, owrzodzeniem niedokrwiennym lub zgorzelą/martwicą tkanek."
    },
    {
      question: "Dlaczego u pacjenta z wieloletnią cukrzycą i niewydolnością nerek pomiar wskaźnika kostka-ramię (ABI) może dać wynik fałszywie wysoki (> 1,40)?",
      options: [
        "Z powodu stwardnienia i zwapnienia błony środkowej tętnic piszczelowych (mediaskleroza Mönckeberga), co uniemożliwia ich ściśnięcie mankietem ciśnieniomierza",
        "Z powodu wrodzonego braku zastawek w żyłach głębokich kończyny dolnej",
        "Wskutek nadmiernego gromadzenia się kwasu moczowego w stawach stóp",
        "Z powodu przyspieszonego przepływu krwi włośniczkowej przez przetoki tętniczo-żylne",
        "Jest to błąd laboratoryjny wynikający z obecności przeciwciał przeciwjądrowych"
      ],
      correct: 0,
      expl: "Zwapnienie błony środkowej tętnic (mediaskleroza Mönckeberga) występuje powszechnie u chorych na cukrzycę i przewlekłą chorobę nerek. Prowadzi do usztywnienia ściany tętnic goleni, które nie zapadają się pod naciskiem mankietu pneumatycznego, dając fałszywie zawyżone ciśnienia skurczowe na kostce i wskaźnik ABI >1,40."
    },
    {
      question: "W przypadku stwierdzenia fałszywie zawyżonego wskaźnika ABI (>1,40) u chorego na cukrzycę z podejrzeniem CLTI, badaniem hemodynamicznym z wyboru do wiarygodnej oceny perfuzji stopy jest:",
      options: [
        "Pomiar wskaźnika paluch-ramię (TBI) lub przezskórnego ciśnienia parcjalnego tlenu (tcPO2)",
        "Wykonanie próby wysiłkowej na bieżni ruchomej",
        "Oznaczenie stężenia mioglobiny w dobowej zbiórce moczu",
        "Pletyzmografia impedancyjna klatki piersiowej",
        "Kapilaroskopia wałów okołopaznokciowych rąk"
      ],
      correct: 0,
      expl: "Małe tętnice palucha stopy rzadko ulegają mediasklerozie. Z tego powodu u pacjentów ze zwapnieniem tętnic goleni i ABI >1,40 złotym standardem oceny ukrwienia obwodowego jest pomiar ciśnienia skurczowego na paluchu i wyliczenie wskaźnika paluch-ramię (TBI – Toe-Brachial Index, norma >0,7; wartość <0,7 świadczy o niedokrwieniu, a ciśnienie na paluchu <30 mmHg o CLTI) lub pomiar tcPO2 (<30 mmHg)."
    },
    {
      question: "Do którego stopnia wg klasyfikacji Fontaine'a zalicza się pacjenta z martwiczym owrzodzeniem opuszki palucha stopy na podłożu niedokrwiennym?",
      options: [
        "Stopień IV",
        "Stopień I",
        "Stopień IIa",
        "Stopień IIb",
        "Stopień III"
      ],
      correct: 0,
      expl: "Klasyfikacja Fontaine'a: Stopień I – bezobjawowe zwężenie tętnic; Stopień IIa – chromanie przestankowe >200 m; Stopień IIb – chromanie przestankowe <200 m; Stopień III – spoczynkowy ból niedokrwienny; Stopień IV – obecność ubytków troficznych: owrzodzeń niedokrwiennych lub martwicy (zgorzeli)."
    },
    {
      question: "Jaki materiał naczyniowy charakteryzuje się najwyższą odległą drożnością i jest złotym standardem w chirurgicznym pomostowaniu omijającym (bypass) poniżej kolana w CLTI?",
      options: [
        "Własna, autologiczna żyła odpiszczelowa (GSV)",
        "Sztuczna proteza z politetrafluoroetylenu (PTFE)",
        "Proteza poliestrowa z Dacronu uszczelniana kolagenem",
        "Żyła odzwierzęca pobrana od świni (ksenograft)",
        "Tętnica promieniowa pobrana od dawcy spokrewnionego"
      ],
      correct: 0,
      expl: "W chirurgii naczyniowej kończyn dolnych poniżej więzadła pachwinowego (zwłaszcza w pomostach udowo-podkolanowych dystalnych i udowo-piszczelowych) materiałem z wyboru o bezkonkurencyjnej drożności odległej (5-letnia drożność >70-80%) jest własna żyła odpiszczelowa pacjenta (autologous great saphenous vein – GSV)."
    },
    {
      question: "W badaniu klinicznym COMPASS wykazano, że u pacjentów z przewlekłą chorobą tętnic obwodowych (PAD) istotną redukcję poważnych incydentów sercowo-naczyniowych (MACE) i amputacji kończyn (MALE) zapewnia terapia skojarzona:",
      options: [
        "Kwasem acetylosalicylowym w dawce 100 mg raz/d + rywaroksabanem w dawce naczyniowej 2,5 mg 2x/d",
        "Warfaryną w dawce utrzymującej INR >4,0",
        "Klopidogrelem w dawce 300 mg 3x na dobę",
        "Heparyną drobnocząsteczkową podawaną przez 5 lat",
        "Aspiryną 500 mg w skojarzeniu z ibuprofenem 800 mg"
      ],
      correct: 0,
      expl: "Przełomowe badanie COMPASS udowodniło, że podwójne hamowanie szlaków zakrzepowych za pomocą kwasu acetylosalicylowego (ASA 100 mg raz/d) w połączeniu z bardzo małą 'naczyniową' dawką bezpośredniego inhibitora czynnika Xa (rywaroksaban 2,5 mg 2 razy na dobę) przynosi znamienną redukcję zgonów sercowo-naczyniowych, udarów mózgu oraz ciężkich incydentów niedokrwienia i amputacji kończyn u chorych z PAD."
    },
    {
      question: "Jakie jest prawidłowe postępowanie miejscowe w przypadku obecności suchej, czarnej martwicy na paluchu stopy u chorego z CLTI PRZED wykonaniem rewaskularyzacji naczyniowej?",
      options: [
        "Utrzymanie martwicy w stanie suchym (dezynfekcja spirytusowa/jodowa, suchy jałowy opatrunek) i odroczenie debridementu do czasu po udrożnieniu naczyń",
        "Natychmiastowe mechaniczne wycięcie martwicy skalpelem do kości w gabinecie zabiegowym",
        "Zalecenie codziennego moczenia stopy w misce z gorącą wodą z szarym mydłem",
        "Nałożenie wilgotnych okładów z maści ichtiolowej pod folią okluzyjną",
        "Wprowadzenie pijawek lekarskich na brzeg martwicy"
      ],
      correct: 0,
      expl: "Podstawową zasadą postępowania w stopie niedokrwionej z suchą martwicą jest zakaz agresywnego opracowywania rany przed przywróceniem perfuzji. Wycięcie martwicy przy braku krążenia prowadzi do obnażenia beznaczyniowych tkanek, maceracji i rozwoju zgorzeli wilgotnej. Suchy strup chroni przed infekcją; opracowanie chirurgiczne wykonuje się dopiero po skutecznej rewaskularyzacji."
    },
    {
      question: "Docelowe stężenie cholesterolu frakcji LDL w surowicy u chorego z rozpoznaniem CLTI (kategoria ekstremalnego ryzyka sercowo-naczyniowego) zgodnie z wytycznymi ESC/PTK wynosi:",
      options: [
        "< 55 mg/dl (< 1,4 mmol/l) oraz redukcja o co najmniej 50% w stosunku do wartości wyjściowej",
        "< 115 mg/dl (< 3,0 mmol/l)",
        "< 190 mg/dl (< 5,0 mmol/l)",
        "Stężenie LDL nie ma znaczenia w chorobach tętnic obwodowych",
        "Pomiędzy 150 a 200 mg/dl"
      ],
      correct: 0,
      expl: "Pacjenci z miażdżycą tętnic obwodowych manifestującą się klinicznie (w tym CLTI) należą do kategorii ekstremalnego/bardzo wysokiego ryzyka sercowo-naczyniowego. Docelowe stężenie cholesterolu LDL wynosi <55 mg/dl (<1,4 mmol/l) wraz z redukcją stężenia wyjściowego o co najmniej 50%, co wymaga intensywnego leczenia statynami w wysokich dawkach (atorwastatyna 80 mg lub rosuwastatyna 40 mg), ewentualnie w skojarzeniu z ezetymibem."
    },
    {
      question: "Próba Ratschowa służy do klinicznej oceny przewlekłego niedokrwienia kończyn dolnych i polega na:",
      options: [
        "Uniesieniu obu kończyn dolnych pod kątem 60° w pozycji leżącej na plecach z jednoczesnym wykonywaniem ruchów zginania i prostowania stóp przez 2 minuty i ocenie bladości",
        "Szybkim opuszczeniu kończyn z wysokości 2 metrów na materac",
        "Pomiarze temperatury skóry po zanurzeniu stopy w lodzie na 30 minut",
        "Zginaniu grzbietowym stopy przy wyprostowanym kolanie celem wywołania bólu łydki",
        "Uciskaniu żyły odpiszczelowej mankietem ciśnieniomierza"
      ],
      correct: 0,
      expl: "Próba Ratschowa polega na uniesieniu kończyn dolnych pod kątem 60° przez pacjenta leżącego na plecach i wykonywaniu zgięć grzbietowych i podeszwowych stóp przez 2 minuty. W kończynie niedokrwionej dochodzi do szybkiego zblednięcia podeszwy (w <20-30 s), a po opuszczeniu nóg w dół – do opóźnionego nawrotu kapilarnego (>10-15 s) i intensywnego przekrwienia grawitacyjnego (rubor)."
    },
    {
      question: "U chorych z CLTI, którzy nie kwalifikują się do rewaskularyzacji chirurgicznej ani wewnątrznaczyniowej (tzw. 'no-option patients'), lekiem wspomagającym mogącym przynieść ulgę w bólu spoczynkowym i poprawić gojenie owrzodzeń są:",
      options: [
        "Dożylne analogi prostaglandyn (np. alprostadyl, iloprost)",
        "Glikokortykosteroidy doustne w dawce immunosupresyjnej",
        "Leki przeciwhistaminowe I generacji",
        "Blokery receptora angiotensyny w dawkach toksycznych",
        "Doustne preparaty potasu i żelaza"
      ],
      correct: 0,
      expl: "U chorych z CLTI zdyskwalifikowanych z leczenia zabiegowego (no-option CLI) wytyczne dopuszczają zastosowanie dożylnych wlewów analogów prostacykliny/prostaglandyny E1 (np. alprostadyl, iloprost) przez okres 2-4 tygodni. Leki te wykazują silne działanie wazodylatacyjne w mikrokrążeniu, hamują agregację płytek krwi i aktywację leukocytów."
    },
    {
      question: "Klasyfikacja WIfI została wprowadzona przez Society for Vascular Surgery przede wszystkim w celu:",
      options: [
        "Precyzyjnej stratyfikacji ryzyka 1-rocznej amputacji kończyny oraz przewidywania korzyści z rewaskularyzacji naczyniowej",
        "Oceny stopnia zaawansowania raka żołądka",
        "Kwalifikacji chorych do przeszczepu serca",
        "Diagnostyki różnicowej chorób demielinizacyjnych mózgu",
        "Określenia wskazań do usunięcia wyrostka robaczkowego"
      ],
      feedback: "",
      correct: 0,
      expl: "Klasyfikacja WIfI (Wound, Ischemia, foot Infection) zastąpiła starsze podziały w nowoczesnej diabetologii i chirurgii naczyniowej. Integruje stopień ubytku tkankowego (Wound), stopień niedokrwienia (Ischemia) oraz obecność i nasilenie zakażenia (foot Infection), pozwalając precyzyjnie oszacować ryzyko dużej amputacji kończyny oraz określić, czy chory odniesie korzyść z zabiegu rewaskularyzacji."
    }
  ],
  flashcards: [
    {
      front: "Co to jest CLTI i jakie są jego składowe?",
      back: "Chronic Limb-Threatening Ischemia: przewlekłe (>2 tyg.) niedokrwienie kończyny objawiające się spoczynkowym bólem niedokrwiennym (Fontaine III) lub owrzodzeniem/martwicą tkanek (Fontaine IV)."
    },
    {
      front: "Dlaczego w CLTI u chorego na cukrzycę wskaźnik ABI może wynosić >1,40?",
      back: "Wskutek stwardnienia i zwapnienia błony środkowej tętnic piszczelowych (mediaskleroza Mönckeberga), która uniemożliwia ściśnięcie tętnicy. Należy wtedy zbadać TBI (<0,7) lub tcPO2 (<30 mmHg)."
    },
    {
      front: "Co wchodzi w skład akronimu klasyfikacji WIfI?",
      back: "W = Wound (rana/martwica, 0-3),\nI = Ischemia (niedokrwienie na podst. TBI/ABI, 0-3),\nfI = foot Infection (zakażenie stopy, 0-3).\nOcenia roczne ryzyko amputacji."
    },
    {
      front: "Jaki jest materiał z wyboru do chirurgicznego bypassu poniżej kolana?",
      back: "Własna, autologiczna żyła odpiszczelowa (GSV) – cechuje się najwyższą odległą drożnością (znacznie lepszą niż sztuczne protezy PTFE/Dacron)."
    },
    {
      front: "Jak postępować z suchą, czarną martwicą na paluchu przed rewaskularyzacją?",
      back: "Utrzymywać w suchości (antyseptyki, suchy jałowy opatrunek) i NIE debridować! Opracowanie chirurgiczne lub amputację palucha wykonuje się dopiero PO udrożnieniu naczyń."
    },
    {
      front: "Jaka jest optymalna farmakoterapia naczyniowa w CLTI (badanie COMPASS)?",
      back: "Wysoka dawka statyny (atorwastatyna 80 mg) + ASA 100 mg raz/d + rywaroksaban 2,5 mg 2x/d (lub klopidogrel 75 mg) + kontrola RR (ACEI) i cukrzycy (SGLT2/GLP-1)."
    }
  ]
};

async function run() {
  console.log("Generating Case 142: Przewlekłe zagrażające niedokrwienie (CLTI)...");
  
  // Mirroring
  case142.steps.forEach(s => {
    s.question = s.title;
    s.explanation = s.feedback ? s.feedback[0] : "";
  });
  
  case142.lekQuestions.forEach(q => {
    q.opts = q.options;
    q.correctIdx = q.correct;
    q.exp = q.expl;
  });
  
  const enc = await encryptStringAes(JSON.stringify(case142, null, 2), MASTER_KEY);
  fs.writeFileSync(path.join('cases', '142_przewlekle_krytyczne_niedokrwienie_clti.json'), JSON.stringify(enc, null, 2), 'utf8');
  console.log("[SAVED] Case #142: 142_przewlekle_krytyczne_niedokrwienie_clti.json (LEK Qs: " + case142.lekQuestions.length + ", Steps: " + case142.steps.length + ", Flashcards: " + case142.flashcards.length + ")");
}

run();

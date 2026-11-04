const fs = require('fs');
const path = require('path');
const { encryptStringAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

const case147 = {
  id: 147,
  dept: "Chirurgia naczyniowa",
  title: "Zespół podkradania tętnicy podobojczykowej (Subclavian Steal Syndrome – SSS)",
  shortTitle: "58-letni Roman – Zawroty głowy, ataksja i zaburzenia widzenia podczas pracy lewą ręką (Zespół podkradania tętnicy podobojczykowej / SSS)",
  diagnosisTitle: "Zespół podkradania tętnicy podobojczykowej lewej (Subclavian Steal Syndrome) – zwężenie odejścia t. podobojczykowej, odwrócenie przepływu w t. kręgowej, asymetria ciśnień >30 mmHg, PTA ze stentem",
  vitals: [
    { name: "Częstość akcji serca", val: "72/min", status: "vital-ok" },
    { name: "Ciśnienie tętnicze (P)", val: "155/85 mmHg", status: "vital-warn" },
    { name: "Ciśnienie tętnicze (L)", val: "115/70 mmHg (różnica 40 mmHg)", status: "vital-crit" },
    { name: "Saturacja SpO2", val: "98%", status: "vital-ok" }
  ],
  vitalsObj: {
    hr: 72,
    bp: "155/85 (P) / 115/70 (L)",
    spo2: 98,
    rr: 15,
    temp: 36.6,
    gcs: 15
  },
  story: "<p><strong>Pacjent:</strong> 58-letni mężczyzna, mechanik samochodowy, zgłosił się do neurologa i chirurga naczyniowego z powodu nawracających od 3 miesięcy, niepokojących napadów zawrotów głowy o typie wirowania otoczenia, zaburzeń równowagi (chwiejnego chodu) oraz przejściowego zamazania i podwójnego widzenia, które występują niemal wyłącznie podczas pracy z uniesioną lewą ręką (np. podczas naprawy podwozia samochodu na podnośniku lub wkręcania śrub).</p><p><strong>Wywiad chorobowy:</strong> Pacjent zauważył, że po kilkunastu sekundach intensywnej pracy lewą ręką dochodzi do jej szybkiego zmęczenia, drętwienia palców i uczucia 'ciężkości ramienia', a zaraz potem pojawiają się silne zawroty głowy i mroczki przed oczami, które dwukrotnie doprowadziły do nagłego upadku na kolana bez utraty przytomności (tzw. drop attacks). Po opuszczeniu ręki i odpoczynku objawy całkowicie ustępują w ciągu 2 minut. W wywiadzie: 35 lat palenia papierosów (40 paczkolat), nieleczone nadciśnienie tętnicze, hipercholesterolemia. Neguje przebyty zawał serca i udar mózgu.</p><p><strong>Badanie przedmiotowe na SOR:</strong> Pacjent w stanie ogólnym dobrym. W spoczynkowym badaniu neurologicznym brak objawów ogniskowych. Osłuchowo: w lewym dole nadobojczykowym słyszalny szorstki, głośny szmer skurczowy promieniujący ku ramieniu; nad tętnicami szyjnymi szmery niesłyszalne. Tętno na lewej tętnicy promieniowej jest wyraźnie opóźnione i słabiej napięte w porównaniu z prawą ręką. Dokonano obustronnego pomiaru ciśnienia tętniczego na ramionach: na ramieniu prawym RR wynosi 155/85 mmHg, natomiast na ramieniu lewym 115/70 mmHg (stwierdzono patognomoniczną asymetrię ciśnienia skurczowego wynoszącą aż 40 mmHg!). Próba prowokacyjna (zaciśnięcie mankietu ciśnieniomierza na lewym ramieniu powyżej ciśnienia skurczowego na 3 minuty i gwałtowne spuszczenie powietrza – test reaktywnego przekrwienia) wywołała u pacjenta zawroty głowy i oczopląs poziomy.</p>",
  labs: [
    {
      name: "Morfologia krwi i koagulologia",
      items: [
        { name: "Hemoglobina (Hb)", val: "15.2 g/dl", norm: "13.5 - 17.5 g/dl", flag: "NORMAL" },
        { name: "Hematokryt (Hct)", val: "44.5 %", norm: "40.0 - 52.0 %", flag: "NORMAL" },
        { name: "Leukocyty (WBC)", val: "7.4 G/l", norm: "4.0 - 10.0 G/l", flag: "NORMAL" },
        { name: "Płytki krwi (PLT)", val: "235 G/l", norm: "150 - 400 G/l", flag: "NORMAL" },
        { name: "INR", val: "1.01", norm: "0.8 - 1.2", flag: "NORMAL" },
        { name: "APTT", val: "29 s", norm: "26 - 36 s", flag: "NORMAL" }
      ]
    },
    {
      name: "Profil lipidowy i biochemia",
      items: [
        { name: "Cholesterol całkowity", val: "235 mg/dl", norm: "< 190 mg/dl", flag: "HIGH" },
        { name: "Cholesterol LDL", val: "152 mg/dl", norm: "< 55 mg/dl (b. wysokie ryzyko)", flag: "HIGH" },
        { name: "Trójglicerydy", val: "190 mg/dl", norm: "< 150 mg/dl", flag: "HIGH" },
        { name: "Glukoza na czczo", val: "98 mg/dl", norm: "70 - 99 mg/dl", flag: "NORMAL" },
        { name: "Kreatynina", val: "0.92 mg/dl", norm: "0.7 - 1.2 mg/dl", flag: "NORMAL" },
        { name: "eGFR", val: "> 90 ml/min/1.73m2", norm: "> 90 ml/min", flag: "NORMAL" }
      ]
    }
  ],
  steps: [
    {
      title: "Krok 1: Wstępna ocena kliniczna i mechanizm objawów kręgowo-podstawnych",
      text: "Lekarz analizuje występowanie zawrotów głowy, ataksji i zaburzeń widzenia pojawiających się wyłącznie podczas wysiłku lewej kończyny górnej. Jaki mechanizm hemodynamiczny odpowiada za zespół objawów u tego chorego?",
      options: [
        "Zwężenie lub niedrożność tętnicy podobojczykowej proksymalnie od odejścia tętnicy kręgowej; wysiłek mięśniowy ręki obniża opór obwodowy i wywołuje odwrócenie przepływu krwi w tożstronnej tętnicy kręgowej, co 'podkrada' krew z koła Willisa i pnia mózgu do pracującej kończyny",
        "Wypadanie płatka zastawki aortalnej z cofaniem krwi do płuc",
        "Zapalenie błędnika wywołane przez wirus półpaśca usznego",
        "Ucisk korzeni nerwowych C5-C6 przez osteofit szyjny"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Zespół podkradania tętnicy podobojczykowej (Subclavian Steal Syndrome – SSS) polega na hemodynamicznym 'okradaniu' krążenia mózgowego na rzecz kończyny górnej:</strong><br>1. W proksymalnym odcinku tętnicy podobojczykowej (przed odejściem tętnicy kręgowej) znajduje się ciasne zwężenie miażdżycowe.<br>2. Podczas pracy mięśniowej lewej ręki naczynia przedramienia i ramienia gwałtownie rozszerzają się (spadek oporu obwodowego), co drastycznie obniża ciśnienie za zwężeniem.<br>3. Ponieważ ciśnienie w dorzeczu podobojczykowym staje się niższe niż ciśnienie w tętnicy podstawnej mózgu, <strong>krew w lewej tętnicy kręgowej zaczyna płynąć wstecz (retrograde flow) – z mózgu ku ramieniu!</strong><br>4. Dochodzi do ostrego niedokrwienia pnia mózgu i móżdżku (niedokrwienie kręgowo-podstawne: zawroty głowy, ataksja, diplopia, dysfazja, upadki atoniczne / drop attacks).",
        "❌ BŁĄD! <strong>Wada zastawki aortalnej nie wywołuje jednostronnych objawów prowokowanych pracą jednej ręki.</strong>",
        "❌ BŁĄD! <strong>Zapalenie błędnika trwa stale przez kilka dni i nie zależy od ruchów ramienia.</strong>",
        "❌ BŁĄD! <strong>Radikulopatia szyjna daje ból korzeniowy, nie powoduje zawrotów głowy i ataksji.</strong>"
      ]
    },
    {
      title: "Krok 2: Badanie fizykalne i kardynalny objaw różnicy ciśnień tętniczych",
      text: "Podczas badania fizykalnego kluczowe znaczenie ma obustronny pomiar ciśnienia tętniczego. Jaka różnica ciśnienia skurczowego (SBP) między ramionami jest patognomoniczna dla istotnego hemodynamicznie zwężenia tętnicy podobojczykowej?",
      options: [
        "Różnica ciśnienia skurczowego (SBP) między ramionami przekraczająca 20-30 mmHg (z niższym ciśnieniem po stronie zwężenia tętnicy podobojczykowej)",
        "Różnica ciśnienia skurczowego wynosząca dokładnie 2-3 mmHg",
        "Różnica ciśnienia rozkurczowego wynosząca 100 mmHg przy identycznym ciśnieniu skurczowym",
        "Brak jakiejkolwiek różnicy ciśnień u chorych z objawami naczyniowymi"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Pomiar ciśnienia tętniczego na OBU ramionach jest obowiązkowym elementem badania naczyniowego!</strong> Różnica skurczowego ciśnienia tętniczego <strong>> 20 mmHg</strong> (a zwłaszcza >30-40 mmHg, jak u naszego pacjenta) ma czułość i swoistość przekraczającą 90% w wykrywaniu istotnego hemodynamicznie (>70%) zwężenia lub niedrożności tętnicy podobojczykowej. Towarzyszy jej opóźnione i słabiej napięte tętno na tętnicy promieniowej po stronie chorej (pulsus parvus et tardus) oraz szmer skurczowy nad dołkiem nadobojczykowym.",
        "❌ BŁĄD! <strong>Różnica do 10 mmHg jest wariantem fizjologicznym w populacji ogólnej.</strong>",
        "❌ BŁĄD! <strong>Zwężenie tętnicy redukuje przede wszystkim ciśnienie skurczowe za przeszkodą.</strong>",
        "❌ BŁĄD! <strong>Asymetria ciśnień jest kardynalnym, podstawowym objawem SSS.</strong>"
      ]
    },
    {
      title: "Krok 3: Różnica między 'zjawiskiem' a 'zespołem' podkradania",
      text: "W literaturze medycznej rozróżnia się 'zjawisko podkradania' od 'zespołu podkradania'. Jaka jest fundamentalna różnica między Subclavian Steal Phenomenon a Subclavian Steal Syndrome?",
      options: [
        "Zjawisko podkradania (Phenomenon) to bezobjawowy wsteczny przepływ w tętnicy kręgowej widoczny w badaniu USG; zespół podkradania (Syndrome) występuje wtedy, gdy odwrócenie przepływu wywołuje kliniczne objawy niedokrwienia mózgu (neurologiczne) lub kończyny górnej",
        "Zjawisko podkradania dotyczy wyłącznie prawej tętnicy, a zespół lewej",
        "Zjawisko dotyczy dzieci, a zespół wyłącznie osób po 90. roku życia",
        "To pojęcia tożsame oznaczające to samo zjawisko psychiatryczne"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>To ważne rozróżnienie kliniczne:</strong><br>- <strong>Subclavian Steal Phenomenon (Zjawisko podkradania):</strong> stwierdzenie w badaniu USG Doppler wstecznego (odwróconego) przepływu krwi w tętnicy kręgowej u pacjenta, który jest <strong>całkowicie bezobjawowy</strong> (dzięki dobremu krążeniu obocznemu w kole Willisa). Zjawisko bezobjawowe nie wymaga leczenia inwazyjnego!<br>- <strong>Subclavian Steal Syndrome (Zespół podkradania – SSS):</strong> obecność odwróconego przepływu w tętnicy kręgowej skojarzona z <strong>jawnymi klinicznie objawami niedokrwienia kręgowo-podstawnego (zawroty głowy, ataksja, upadki) lub niedokrwienia ramienia (chromanie kończyny górnej)</strong>. Tylko zespół objawowy (Syndrome) stanowi wskazanie do leczenia zabiegowego!",
        "❌ BŁĄD! <strong>Zjawisko i zespół mogą dotyczyć obu stron (choć lewa strona odpowiada za >80% przypadków z powodu bezpośredniego odejścia z łuku aorty).</strong>",
        "❌ BŁĄD! <strong>Podział opiera się na obecności objawów klinicznych, a nie wieku.</strong>",
        "❌ BŁĄD! <strong>To pojęcia ściśle hemodynamiczno-naczyniowe.</strong>"
      ]
    },
    {
      title: "Krok 4: Diagnostyka ultrasonograficzna – USG Duplex Doppler tętnic kręgowych",
      text: "Lekarz wykonuje badanie USG naczyń dogłowowych. Jaki charakterystyczny obraz przepływu w lewej tętnicy kręgowej w badaniu dopplerowskim potwierdza rozpoznanie podkradania?",
      options: [
        "Całkowity wsteczny (retrograde) przepływ krwi w tętnicy kręgowej (skierowany od głowy ku klatce piersiowej) w spoczynku lub przepływ dwukierunkowy naprzemienny (biphasic / to-and-fro) pogłębiający się po teście reaktywnego przekrwienia mankietem",
        "Przepływ o prędkości zero w obu tętnicach szyjnych",
        "Całkowity brak sygnału przepływu w aorcie wstępującej",
        "Zwiększenie przepływu do przodu (ortodromowego) powyżej 500 cm/s"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Badanie USG Duplex Doppler tętnic kręgowych wykazuje charakterystyczną dynamikę przepływu w zależności od stopnia stenozy:</strong><br>1. <strong>Stopień łagodny (częściowe podkradanie / pre-steal):</strong> spadek prędkości skurczowej lub wcięcie skurczowe (bunny sign) w zapisie spektralnym.<br>2. <strong>Stopień umiarkowany (podkradanie niecałkowite):</strong> przepływ naprzemienny (to-and-fro) – wsteczny w skurczu, a prawidłowy w rozkurczu.<br>3. <strong>Stopień zaawansowany (pełne podkradanie – full steal):</strong> <strong>stały, całkowity przepływ wsteczny (retrograde flow)</strong> w fazie skurczu i rozkurczu.<br>Jeśli przepływ w spoczynku jest niepewny, wykonuje się <strong>test reaktywnego przekrwienia (cuff hyperaemia test)</strong> – pompowanie mankietu na ramieniu powyżej SBP przez 3 minuty i nagłe spuszczenie wyzwala pełne odwrócenie przepływu.",
        "❌ BŁĄD! <strong>Tętnice szyjne mają przepływ prawidłowy, patologia dotyczy tętnicy kręgowej.</strong>",
        "❌ BŁĄD! <strong>Aorta zachowuje prawidłowy przepływ.</strong>",
        "❌ BŁĄD! <strong>Cechą patognomoniczną jest odwrócenie KIERUNKU przepływu na wsteczny, a nie przyspieszenie do przodu.</strong>"
      ]
    },
    {
      title: "Krok 5: Diagnostyka angiograficzna – Angio-TK łuku aorty",
      text: "Przed planowanym leczeniem zabiegowym konieczne jest dokładne uwidocznienie morfologii naczynia. Jakie badanie jest standardem w planowaniu rewaskularyzacji tętnicy podobojczykowej?",
      options: [
        "Angio-TK (CTA) lub Angio-MRI (MRA) łuku aorty i tętnic dogłowowych – precyzyjnie uwidacznia miejsce, długość, stopień zwężenia oraz zwapnienia odejścia tętnicy podobojczykowej z łuku aorty oraz relację do odejścia tętnicy kręgowej",
        "Zdjęcie przeglądowe RTG klatki piersiowej w projekcji bocznej",
        "Scyntygrafia wentylacyjno-perfuzyjna płuc",
        "Gastroskopia diagnostyczna z testem ureazowym"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Wielorzędowa Angio-TK (CTA) łuku aorty i naczyń dogłowowych jest złotym standardem przedoperacyjnym.</strong> Uwidacznia:<br>1. Odejście lewej tętnicy podobojczykowej bezpośrednio z łuku aorty (najczęstsza lokalizacja zmian miażdżycowych).<br>2. Długość zmiany miażdżycowej i obecność masywnych zwapnień (kluczowe dla doboru stentu).<br>3. Dokładną odległość zwężenia od ujścia tętnicy kręgowej (aby nie zasłonić stentu ujścia kręgówki!).<br>4. Stan pozostałych naczyń koła Willisa i tętnic szyjnych.",
        "❌ BŁĄD! <strong>Zwykłe RTG nie obrazuje światła naczyń tętniczych łuku aorty.</strong>",
        "❌ BŁĄD! <strong>Scyntygrafia płuc ocenia zatorowość płucną.</strong>",
        "❌ BŁĄD! <strong>Gastroskopia ocenia żołądek, nie naczynia krwionośne.</strong>"
      ]
    },
    {
      title: "Krok 6: Szczególna postać kliniczna – Zespół podkradania wieńcowo-podobojczykowego (CSSS)",
      text: "Lekarz naczyniowy zwraca uwagę na niebezpieczne powikłanie u pacjentów po operacjach kardiochirurgicznych pomostowania aortalno-wieńcowego (CABG). Na czym polega zespół podkradania wieńcowo-podobojczykowego (Coronary-Subclavian Steal Syndrome – CSSS)?",
      options: [
        "U pacjentów z pomostem z lewej tętnicy piersiowej wewnętrznej (LIMA) do gałęzi przedniej zstępującej (LAD), zwężenie odejścia tętnicy podobojczykowej powoduje odwrócenie przepływu w pomoście LIMA podczas pracy lewą ręką i 'podkradanie' krwi z mięśnia sercowego, wywołując dławicę piersiową lub zawał serca!",
        "Polega na pęknięciu mostka po kichnięciu u pacjenta po operacji serca",
        "Jest to zakażenie rany pooperacyjnej gronkowcem złocistym",
        "Polega na ucisku tętnicy wieńcowej przez mięsień dwugłowy ramienia"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Zespół podkradania wieńcowo-podobojczykowego (Coronary-Subclavian Steal Syndrome – CSSS) jest dramatycznym powikłaniem u chorych po CABG:</strong><br>Lewa tętnica piersiowa wewnętrzna (LIMA) jest gałęzią lewej tętnicy podobojczykowej i stanowi złoty standard pomostowania tętnicy wieńcowej LAD. Jeśli u chorego rozwinie się zwężenie odejścia tętnicy podobojczykowej (przed odejściem LIMA), wówczas podczas wysiłku lewego ramienia dochodzi do <strong>odwrócenia przepływu w pomoście LIMA – krew odpływa z tętnicy wieńcowej (LAD) ku ramieniu!</strong> Skutkuje to <strong>ostrym niedokrwieniem mięśnia sercowego (dusznica bolesna, zawał serca NSTEMI/STEMI, wstrząs kardiogenny) wywoływanym pracą lewej ręki!</strong>",
        "❌ BŁĄD! <strong>To zespół naczyniowy o podłożu hemodynamicznym, nie mechaniczne pęknięcie mostka.</strong>",
        "❌ BŁĄD! <strong>To zaburzenie przepływu krwi w pomoście tętniczym, a nie infekcja rany.</strong>",
        "❌ BŁĄD! <strong>Mięsień ramienia nie ma kontaktu z tętnicami wieńcowymi.</strong>"
      ]
    },
    {
      title: "Krok 7: Nowoczesne leczenie inwazyjne – Przezskórna angioplastyka ze stentem (PTA/stent)",
      text: "Pacjent ma objawowy zespół SSS ze zwężeniem odejścia lewej tętnicy podobojczykowej wynoszącym 85%. Jaka metoda zabiegowa jest obecnie metodą pierwszego rzutu w leczeniu objawowego zwężenia tętnicy podobojczykowej?",
      options: [
        "Przezskórna angioplastyka wewnątrznaczyniowa ze stentem (PTA / Stenting) z dostępu przez tętnicę udową lub promieniową – małoinwazyjna procedura o >95% skuteczności technicznej",
        "Torakotomia otwarta z wycięciem lewego płuca",
        "Podwiązanie tętnicy kręgowej na szyi celem zablokowania przepływu wstecznego",
        "Stosowanie wyłącznie maści rozgrzewających na lewe ramię"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Endowaskularna angioplastyka przezskórna z implantacją stentu (PTA/Stenting tętnicy podobojczykowej) jest współcześnie metodą pierwszego wyboru o klasie zaleceń I A!</strong> Zabieg wykonuje się w znieczuleniu miejscowym z nakłucia tętnicy udowej wspólnej lub tętnicy promieniowej/ramiennej. Przez zwężenie wprowadza się prowadnik i rozpręża <strong>stent balonowy (balloon-expandable stent)</strong>, który cechuje się wysoką siłą radialną niezbędną przy zwapnieniach ujścia tętnicy w aorcie. Skuteczność pierwotna wynosi >95%, a powikłania są rzadkie (<2%). Chirurgiczne pomostowanie otwarte (bypass szyjno-podobojczykowy – carotid-subclavian bypass) rezerwuje się dla niepowodzeń procedur wewnątrznaczyniowych.",
        "❌ BŁĄD! <strong>Wycięcie płuca nie leczy zwężenia tętnicy.</strong>",
        "❌ BŁĄD! <strong>Podwiązanie tętnicy kręgowej trwale odcięłoby dopływ krwi do pnia mózgu!</strong>",
        "❌ BŁĄD! <strong>Maści nie rozszerzą miażdżycowo zwężonej dużej tętnicy w klatce piersiowej.</strong>"
      ]
    },
    {
      title: "Krok 8: Kompleksowa farmakoterapia naczyniowa i rokowanie",
      text: "U pacjenta wykonano udany zabieg implantacji stentu do lewej tętnicy podobojczykowej. Różnica ciśnień między ramionami spadła do 4 mmHg, a zawroty głowy ustąpiły. Jaka farmakoterapia wtórnej prewencji sercowo-naczyniowej jest bezwzględnie wskazana?",
      options: [
        "Podwójna terapia przeciwpłytkowa (DAPT: kwas acetylosalicylowy 100 mg + klopidogrel 75 mg) przez minimum 1-3 miesiące, a następnie monoterapia przeciwpłytkowa do końca życia + wysoka dawka statyny (atorwastatyna 80 mg) + normalizacja ciśnienia krwi i rzucenie palenia",
        "Odstawienie wszelkich leków, ponieważ stent całkowicie wyleczył miażdżycę",
        "Stosowanie wyłącznie witaminy B-complex i kwasu foliowego",
        "Podawanie heparyny dożylnie przez 5 lat w warunkach domowych"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Obecność stentu i uogólniona miażdżyca wymagają intensywnej prewencji wtórnej:</strong><br>1. <strong>Terapia przeciwpłytkowa:</strong> po implantacji stentu stosuje się <strong>DAPT (<span class='dose-pill'>ASA 100 mg/d</span> + <span class='dose-pill'>Klopidogrel 75 mg/d</span>) przez 1-3 miesiące</strong> celem zapobiegania wczesnej zakrzepicy stentu do czasu jego pełnej endotelizacji, a następnie monoterapię (<span class='dose-pill'>ASA 100 mg/d</span>) bezterminowo.<br>2. <strong>Intensywna terapia statynowa:</strong> <span class='dose-pill'>Atorwastatyna 80 mg/d</span> z celem LDL <55 mg/dl.<br>3. <strong>Leczenie hipotensyjne:</strong> kontrola ciśnienia tętniczego (inhibitory ACEI, np. <span class='dose-pill'>Ramipryl 5-10 mg/d</span>).<br>4. <strong>Bezwzględne rzucenie palenia tytoniu!</strong>",
        "❌ BŁĄD! <strong>Stent leczy jedynie lokalne zwężenie, ale nie likwiduje ogólnoustrojowej miażdżycy!</strong>",
        "❌ BŁĄD! <strong>Witaminy nie zapobiegają zakrzepicy w stencie.</strong>",
        "❌ BŁĄD! <strong>Heparyna dożylna nie jest lekiem do przewlekłej terapii domowej.</strong>"
      ]
    }
  ],
  pathoNodes: [
    {
      badge: "Zwężenie ujścia",
      title: "Blaszka miażdżycowa tętnicy podobojczykowej",
      short: "Stenoza proksymalna przed odejściem tętnicy kręgowej",
      detail: "Miażdżyca lokuje się najczęściej w początkowym odcinku lewej tętnicy podobojczykowej odchodzącej pod ostrym kątem z łuku aorty. Powstaje istotny gradient ciśnień pomiędzy aortą a naczyniami dystalnymi.",
      target: "Ujście lewej tętnicy podobojczykowej (LSA)",
      drugTarget: "<span class='dose-pill'>Atorwastatyna 80 mg/d</span> stabilizacja blaszki miażdżycowej"
    },
    {
      badge: "Wazodylatacja wysiłkowa",
      title: "Spadek oporu naczyniowego pracującego ramienia",
      short: "Otwarcie łożyska włośniczkowego pod wpływem metabolitów",
      detail: "Praca mięśniowa lewej ręki uwalnia adenozynę, tlenek azotu i mleczany, drastycznie rozszerzając naczynia obwodowe. Ciśnienie w tętnicy pachowej i podobojczykowej za zwężeniem gwałtownie spada poniżej ciśnienia mózgowego.",
      target: "Łożysko naczyniowe lewej kończyny górnej",
      drugTarget: "<span class='dose-pill'>Pomiar RR na obu ramionach</span> asymetria ciśnień >20-30 mmHg"
    },
    {
      badge: "Odwrócenie przepływu",
      title: "Podkradanie krwi z pnia mózgu (Retrograde flow)",
      short: "Odpływ krwi z koła Willisa i t. kręgowej do ramienia",
      detail: "Gradient ciśnień odwraca kierunek przepływu w tożstronnej tętnicy kręgowej. Krew zamiast płynąć do mózgu, cofa się z tętnicy podstawnej i koła Willisa w dół do tętnicy podobojczykowej, wywołując niedokrwienie pnia mózgu i móżdżku.",
      target: "Lewa tętnica kręgowa (arteria vertebralis) i pień mózgu",
      drugTarget: "<span class='dose-pill'>USG Doppler z testem mankietowym</span> wykazanie przepływu wstecznego"
    },
    {
      badge: "Przywrócenie gradientu",
      title: "Implantacja stentu naczyniowego (PTA/stent)",
      short: "Zniesienie stenozy i przywrócenie fizjologicznego przepływu",
      detail: "Rozprężenie stentu balonowego likwiduje gradient ciśnień w tętnicy podobojczykowej. Ciśnienie za przeszkodą wzrasta, natychmiast przywracając prawidłowy, dogłowowy kierunek przepływu krwi w tętnicy kręgowej.",
      target: "Światło zwężonej tętnicy podobojczykowej",
      drugTarget: "<span class='dose-pill'>Stent naczyniowy rozprężany na balonie</span> + <span class='dose-pill'>DAPT (ASA + Klopidogrel)</span>"
    }
  ],
  diffTable: {
    title: "⚔️ Tabela Różnicowa: Zespół podkradania (SSS) vs Zespół cieśni klatki piersiowej (TOS) vs TIA w dorzeczu ICA vs Zespół Meniera",
    headers: ["Cecha kliniczna", "Zespół podkradania (SSS)", "Zespół cieśni klatki piersiowej (TOS)", "TIA w dorzeczu szyjnym (ICA)", "Zespół Meniere'a (Wodniak błędnika)", "Choroba zwyrodnieniowa kręgosłupa szyjnego"],
    rows: [
      ["Czynnik wyzwalający objawy", "Praca / wysiłek mięśniowy kończyny górnej (uniesienie ręki, praca narzędziami)", "Określona pozycja ramienia (odwiedzenie i rotacja zewnętrzna – test Roosa), noszenie plecaka", "Spontaniczny, bez związku z ruchami rąk; często rano po wstaniu", "Spontaniczne, napadowe zawroty głowy trwające 20 min do kilku godzin; brak związku z ręką", "Nagłe ruchy obrotowe lub odgięciowe głowy i szyi; brak związku z pracą ramienia"],
      ["Objawy neurologiczne", "Zawroty głowy (vertigo), ataksja, podwójne widzenie (diplopia), nagłe upadki (drop attacks)", "Ból, drętwienie i parestezje wzdłuż przyśrodkowego brzegu ręki i palców IV-V (ucisk splotu C8-Th1)", "Jednostronny niedowład ręki/twarzy, afazja, przemijająca ślepota jednooczna (amaurosis fugax)", "Fluktuacyjny niedosłuch odbiorczy, szum uszny (tinnitus), uczucie pełności w uchu", "Ból potylicy, sztywność karku, ból karku promieniujący do łopatek; rzadko zawroty"],
      ["Różnica ciśnień na ramionach", "Patognomoniczna asymetria ciśnienia skurczowego (SBP) >20-40 mmHg", "Brak stałej różnicy w spoczynku; spadek tętna tylko w pozycjach prowokacyjnych", "Brak różnicy ciśnień między ramionami (ciśnienie symetryczne)", "Brak różnicy ciśnień między ramionami", "Brak różnicy ciśnień między ramionami"],
      ["Kierunek przepływu w t. kręgowej", "Odwrócony wsteczny (retrograde) przepływ krwi z mózgu ku ramieniu!", "Prawidłowy przepływ dogłowowy w tętnicach kręgowych", "Prawidłowy przepływ w układzie kręgowo-podstawnym", "Prawidłowy przepływ w naczyniach dogłowowych", "Prawidłowy przepływ (chyba że ucisk osteofitu na t. kręgową)"],
      ["Złoty standard diagnostyczny", "USG Duplex Doppler tętnic kręgowych + Angio-TK łuku aorty", "RTG klatki/szyi (żebro szyjne) + Angio-TK/MRI w pozycjach odwiedzenia", "USG Duplex tętnic szyjnych + MRI mózgu z DWI + Angio-TK", "Audiometria tonalna, próby kaloryczne błędnika, MRI kąta mostowo-móżdżkowego", "RTG / MRI odcinka szyjnego kręgosłupa"],
      ["Leczenie pierwszego rzutu", "Przezskórna angioplastyka ze stentem (PTA/stent) tętnicy podobojczykowej", "Fizjoterapia; w razie braku poprawy resekcja I żebra lub żebra szyjnego", "Pilna endarterektomia szyjna (CEA) w ciągu 14 dni + ASA + statyna", "Leczenie zachowawcze (dieta ubogosolna, betahistyna, diuretyki)", "Fizjoterapia, kołnierz ortopedyczny doraźnie, NLPZ, miorelaksanty"]
    ]
  },
  dutySummary: {
    overview: "Zespół podkradania tętnicy podobojczykowej (Subclavian Steal Syndrome – SSS) jest zespołem naczyniowo-neurologicznym wywołanym hemodynamicznie istotnym zwężeniem lub niedrożnością tętnicy podobojczykowej proksymalnie od odejścia tętnicy kręgowej. Podczas wysiłku kończyny górnej dochodzi do odwrócenia przepływu w tożstronnej tętnicy kręgowej i 'podkradania' krwi z koła Willisa, co skutkuje objawami przemijającego niedokrwienia pnia mózgu i móżdżku.",
    diagnostics: "1. Ocena kliniczna: napady zawrotów głowy, ataksji, zaburzeń widzenia i chromania ramienia prowokowane pracą kończyny górnej.<br>2. Obustronny pomiar ciśnienia tętniczego na ramionach: patognomoniczna asymetria ciśnienia skurczowego >20-30 mmHg (z niższym ciśnieniem po stronie chorej).<br>3. Badanie tętna na tętnicach promieniowych (osłabienie i opóźnienie tętna po stronie zwężenia) oraz osłuchiwanie dołka nadobojczykowego (szmer naczyniowy).<br>4. USG Duplex Doppler naczyń dogłowowych: wykazanie odwróconego (wstecznego) przepływu krwi w tętnicy kręgowej w spoczynku lub po próbie mankietowej.<br>5. Angio-TK (CTA) lub Angio-MRI (MRA) łuku aorty i tętnic dogłowowych: złoty standard oceny morfologii zwężenia odejścia tętnicy podobojczykowej przed zabiegiem.",
    drugsAndDoses: "1. Podwójna terapia przeciwpłytkowa (DAPT) przed i po implantacji stentu:<br>   - <span class='dose-pill'>Kwas acetylosalicylowy 100 mg raz/dobę p.o.</span> +<br>   - <span class='dose-pill'>Klopidogrel 75 mg raz/dobę p.o.</span> (dawka nasycająca 300 mg) przez 1-3 miesiące, a następnie monoterapia ASA do końca życia.<br>2. Intensywna terapia statynowa:<br>   - <span class='dose-pill'>Atorwastatyna 80 mg raz/dobę p.o.</span> (cel LDL <55 mg/dl).<br>3. Kontrola ciśnienia tętniczego:<br>   - <span class='dose-pill'>Ramipryl 5-10 mg raz/dobę p.o.</span> (z uwzględnieniem, że pomiary kontrolne ciśnienia muszą być wykonywane na ZDROWYM ramieniu o wyższym ciśnieniu!).<br>4. <span class='dose-pill'>Bezwzględny zakaz palenia tytoniu</span>.",
    procedures: "1. Przezskórna angioplastyka wewnątrznaczyniowa ze stentem (PTA/stent): współczesna metoda z wyboru; wprowadzenie stentu rozprężanego na balonie przez nakłucie tętnicy udowej lub promieniowej.<br>2. Chirurgiczne pomostowanie omijające (Carotid-Subclavian Bypass) lub transpozycja tętnicy podobojczykowej: zabieg operacyjny z dostępu nadobojczykowego, stosowany w przypadku niepowodzenia lub niemożności wykonania procedury endowaskularnej.<br>3. Próba mankietowa przekrwienia reaktywnego (Cuff test): przyłóżkowa procedura diagnostyczna wyzwalająca odwrócenie przepływu w USG Doppler.",
    monitoring: "1. Kontrola symetrii ciśnienia tętniczego na obu ramionach bezpośrednio po zabiegu (prawidłowo różnica powinna spaść poniżej 10 mmHg).<br>2. Badanie tętna na tętnicy promieniowej operowanej kończyny.<br>3. Kontrolne USG Duplex Doppler tętnicy kręgowej po 1, 3, 6 i 12 miesiącach celem potwierdzenia trwałego, ortodromowego (prawidłowego) kierunku przepływu krwi ku mózgowi.<br>4. Monitorowanie neurologiczne (całkowite ustąpienie zawrotów głowy i ataksji podczas pracy ręką)."
  },
  lekQuestions: [
    {
      question: "W zespole podkradania tętnicy podobojczykowej (Subclavian Steal Syndrome), naczyniem, w którym dochodzi do odwrócenia kierunku przepływu krwi (przepływu wstecznego z mózgu ku kończynie górnej), jest:",
      options: [
        "Tętnica kręgowa (arteria vertebralis) po stronie zwężenia",
        "Tętnica szyjna wewnętrzna (ICA)",
        "Tętnica podstawna mózgu (arteria basilaris)",
        "Tętnica piersiowa wewnętrzna lewa",
        "Tętnica środkowa mózgu (MCA)"
      ],
      correct: 0,
      expl: "W zespole SSS zwężenie tętnicy podobojczykowej proksymalnie od odejścia tętnicy kręgowej powoduje, że spadek ciśnienia obwodowego odwraca gradient ciśnień. Krew z koła Willisa i tętnicy podstawnej cofa się tożstronną tętnicą kręgową (arteria vertebralis) w dół, zaopatrując niedokrwioną kończynę górną kosztem pnia mózgu."
    },
    {
      question: "Podstawowym badaniem fizykalnym pozwalającym na wysunięcie podejrzenia istotnego zwężenia tętnicy podobojczykowej u pacjenta z zawrotami głowy jest:",
      options: [
        "Obustronny pomiar ciśnienia tętniczego na obu ramionach i stwierdzenie asymetrii ciśnienia skurczowego > 20-30 mmHg",
        "Pomiar obwodu klatki piersiowej na wdechu i wydechu",
        "Ostukiwanie kręgosłupa piersiowego młotkiem neurologicznym",
        "Badanie czucia wibracji stroikiem na rzepce",
        "Pomiar ciśnienia śródgałkowego metodą aplanacyjną"
      ],
      correct: 0,
      expl: "Prostym, a zarazem kluczowym badaniem fizykalnym jest jednoczesny pomiar ciśnienia tętniczego na obu kończynach górnych. Różnica skurczowego ciśnienia tętniczego >20-30 mmHg (z niższym ciśnieniem na ramieniu po stronie zwężenia) jest wysoce swoistym wskaźnikiem stenozy tętnicy podobojczykowej."
    },
    {
      question: "Objawy neurologiczne w zespole podkradania tętnicy podobojczykowej wynikają z niedokrwienia struktur zaopatrywanych przez krążenie kręgowo-podstawne i obejmują:",
      options: [
        "Zawroty głowy, ataksję, zaburzenia widzenia (podwójne widzenie) oraz nagłe upadki atoniczne (drop attacks) prowokowane wysiłkiem kończyny górnej",
        "Masywne zaburzenia czucia na przeciwstronnej połowie twarzy",
        "Afazję ruchową Broca bez zaburzeń równowagi",
        "Wyłącznie drżenie spoczynkowe palców rąk o typie 'kręcenia pigułek'",
        "Utratę pamięci świeżej o charakterze amnezji całkowitej"
      ],
      correct: 0,
      expl: "Krążenie kręgowo-podstawne zaopatruje pień mózgu, móżdżek i płaty potyliczne. Podkradanie krwi do pracującej ręki powoduje hipoperfuzję tych struktur, manifestującą się zawrotami głowy (vertigo), ataksją móżdżkową, zaburzeniami widzenia (diplopia, mroczki) oraz nagłą utratą napięcia mięśniowego i upadkiem bez utraty przytomności (drop attacks)."
    },
    {
      question: "Metodą zabiegową z wyboru o najwyższej skuteczności technicznej w leczeniu objawowego zwężenia tętnicy podobojczykowej jest:",
      options: [
        "Przezskórna angioplastyka wewnątrznaczyniowa z implantacją stentu (PTA/stent)",
        "Otwarta torakotomia przednio-boczna z wycięciem łuku aorty",
        "Podwiązanie tętnicy ramiennej na poziomie łokcia",
        "Całkowite usunięcie obojczyka po stronie chorej",
        "Przeszczepienie płuca lewego"
      ],
      correct: 0,
      expl: "Współczesnym złotym standardem leczenia SSS jest zabieg wewnątrznaczyniowy – przezskórna angioplastyka balonowa ze stentem (PTA/stenting), wykonywana w znieczuleniu miejscowym z dostępu udowego lub promieniowego. Cechuje się ponad 95% skutecznością pierwotną i niskim odsetkiem powikłań."
    },
    {
      question: "Na czym polega zespół podkradania wieńcowo-podobojczykowego (Coronary-Subclavian Steal Syndrome)?",
      options: [
        "U pacjenta po CABG z użyciem LIMA, zwężenie tętnicy podobojczykowej powoduje odwrócenie przepływu w pomoście wieńcowym i niedokrwienie serca podczas wysiłku lewej ręki",
        "Polega na zakrzepicy żyły podobojczykowej wywołanej zawałem serca",
        "Jest to zakażenie elektrod stymulatora serca przez bakterie z jamy ustnej",
        "Oznacza wrodzone odejście tętnicy wieńcowej od tętnicy promieniowej",
        "Jest to pęknięcie tętniaka aorty wstępującej do tętnicy podobojczykowej"
      ],
      correct: 0,
      expl: "U chorych po pomostowaniu aortalno-wieńcowym (CABG) z wykorzystaniem lewej tętnicy piersiowej wewnętrznej (LIMA) do LAD, rozwój zwężenia lewej tętnicy podobojczykowej proksymalnie od LIMA powoduje, że wysiłek lewej ręki wywołuje odwrócenie przepływu w pomoście LIMA (odpływ krwi z mięśnia sercowego do ramienia), co skutkuje dławicą piersiową lub zawałem serca."
    },
    {
      question: "W badaniu USG Duplex Doppler tętnic kręgowych, próba przekrwienia reaktywnego (cuff hyperaemia test) polega na:",
      options: [
        "Zaciśnięciu mankietu ciśnieniomierza na ramieniu powyżej ciśnienia skurczowego na 3 minuty, po czym nagłym spuszczeniu powietrza celem wyzwolenia wstecznego przepływu w tętnicy kręgowej",
        "Ogrzewaniu kończyny w gorącej wodzie przez 2 godziny",
        "Zanurzeniu dłoni w lodowatej wodzie z lodem",
        "Podaniu dożylnym atropiny w dawce 2 mg",
        "Wykonywaniu przysiadów na bieżni mechanicznej"
      ],
      correct: 0,
      expl: "Próba przekrwienia reaktywnego (cuff test) polega na kilkuminutowym uciśnięciu mankietem naczynia ramiennego powyżej ciśnienia skurczowego (indukcja niedotlenienia tkanek i maksymalnej wazodylatacji), a następnie nagłym spuszczeniu powietrza. Gwałtowny napływ krwi do przedramienia u chorego z granicznym zwężeniem t. podobojczykowej wyzwala lub nasila odwrócenie przepływu w tętnicy kręgowej."
    },
    {
      question: "Która tętnica podobojczykowa ulega zwężeniu w zespole podkradania znacznie częściej (stanowiąc ponad 80-85% przypadków)?",
      options: [
        "Lewa tętnica podobojczykowa",
        "Prawa tętnica podobojczykowa",
        "Obie tętnice ulegają zwężeniu z identyczną częstością",
        "Zwężenie dotyczy wyłącznie pnia ramienno-głowowego u kobiet",
        "Tętnica podobojczykowa nigdy nie ulega miażdżycy"
      ],
      correct: 0,
      expl: "Lewa tętnica podobojczykowa odpowiada za ponad 80-85% przypadków SSS. Wynika to z faktu, że odchodzi ona bezpośrednio z łuku aorty pod ostrym kątem, gdzie turbulentny przepływ krwi predysponuje do powstawania nasilonych zmian miażdżycowych u jej ujścia. Prawa tętnica podobojczykowa odchodzi od pnia ramienno-głowowego."
    },
    {
      question: "U bezobjawowego pacjenta, u którego przypadkowo w badaniu USG Doppler stwierdzono wsteczny przepływ krwi w tętnicy kręgowej (Subclavian Steal Phenomenon) bez dolegliwości neurologicznych:",
      options: [
        "Nie ma wskazań do inwazyjnego leczenia zabiegowego (PTA/stent); zaleca się jedynie optymalną farmakoterapię miażdżycy (statyna, lek przeciwpłytkowy)",
        "Należy natychmiast wykonać pilną torakotomię ratunkową",
        "Bezwzględnie zakazuje się pacjentowi poruszania lewą ręką",
        "Wdraża się dożywotnią terapię fibrynolityczną w szpitalu",
        "Zaleca się obustronne usunięcie tętnic kręgowych"
      ],
      correct: 0,
      expl: "Samo zjawisko podkradania (Subclavian Steal Phenomenon) bez towarzyszących objawów klinicznych niedokrwienia mózgu lub ramienia NIE stanowi wskazania do zabiegów inwazyjnych (angioplastyki/stentowania). Pacjent wymaga jedynie modyfikacji czynników ryzyka sercowo-naczyniowego i leczenia zachowawczego (statyna, aspiryna, kontrola ciśnienia)."
    },
    {
      question: "Operacją chirurgiczną otwartą wykonywaną z wyboru w przypadku niemożności wykonania zabiegu wewnątrznaczyniowego (PTA/stent) w zespole SSS jest:",
      options: [
        "Pomost omijający szyjno-podobojczykowy (Carotid-Subclavian Bypass) z dostępu nadobojczykowego",
        "Wycięcie całego łuku aorty z hipotermią głęboką",
        "Zespolenie tętnicy podobojczykowej z pęcherzem moczowym",
        "Wycięcie mięśni pochyłych szyi bez rekonstrukcji naczyniowej",
        "Podwiązanie tętnicy podobojczykowej na poziomie obojczyka"
      ],
      correct: 0,
      expl: "Chirurgicznym zabiegiem otwartym z wyboru jest wykonanie pozaanatomicznego pomostu omijającego szyjno-podobojczykowego (Carotid-Subclavian Bypass) z użyciem sztucznej protezy (PTFE/Dacron) z niewielkiego cięcia nadobojczykowego. Alternatywą jest bezpośrednia transpozycja tętnicy podobojczykowej do ściany tętnicy szyjnej wspólnej."
    },
    {
      question: "Główną przyczyną etiologiczną zespołu podkradania tętnicy podobojczykowej u osób dorosłych w podeszłym wieku (>90% przypadków) jest:",
      options: [
        "Miażdżyca tętnic (Atherosclerosis)",
        "Choroba Takayasu (Aortitis)",
        "Wrodzone zwężenie cieśni aorty (Koarktacja)",
        "Zwichnięcie stawu barkowo-obojczykowego",
        "Niedobór witaminy B12"
      ],
      correct: 0,
      expl: "Miażdżyca zarostowa odpowiada za ponad 90-95% wszystkich przypadków zespołu podkradania tętnicy podobojczykowej u osób dorosłych. Rzadszymi przyczynami (głównie u młodych kobiet) są choroby zapalne dużych naczyń, przede wszystkim choroba Takayasu lub olbrzymiokomórkowe zapalenie tętnic."
    },
    {
      question: "Wskaż, na którym ramieniu należy dokonywać kontrolnych pomiarów ciśnienia tętniczego u pacjenta ze zdiagnozowanym zespołem podkradania tętnicy podobojczykowej lewej:",
      options: [
        "Na ramieniu prawym (zdrowym), ponieważ pomiar na ramieniu lewym da fałszywie zaniżone wartości maskujące nadciśnienie tętnicze",
        "Wyłącznie na ramieniu lewym (chorym)",
        "Na obu udach w pozycji stojącej",
        "Ciśnienie należy mierzyć wyłącznie na tętnicy skroniowej",
        "U chorych z SSS pomiar ciśnienia tętniczego jest całkowicie zakazany"
      ],
      feedback: "",
      correct: 0,
      expl: "U chorego ze zwężeniem tętnicy zaopatrującej kończynę górną ciśnienie mierzone na chorym ramieniu jest znacznie zaniżone z powodu obecności stenozy. Ocena ciśnienia ogólnoustrojowego i skuteczności leczenia hipotensyjnego musi być dokonywana na ramieniu zdrowym (o wyższym ciśnieniu), aby uniknąć niedoszacowania nadciśnienia tętniczego."
    }
  ],
  flashcards: [
    {
      front: "Co to jest zespół podkradania tętnicy podobojczykowej (SSS)?",
      back: "Zwężenie t. podobojczykowej przed odejściem t. kręgowej. Praca kończyny górnej obniża opór i odwraca przepływ w t. kręgowej (krew odpływa z mózgu do ręki!), wywołując niedokrwienie pnia mózgu."
    },
    {
      front: "Jaki jest patognomoniczny objaw w badaniu fizykalnym w SSS?",
      back: "Asymetria skurczowego ciśnienia tętniczego (SBP) między ramionami > 20-30 mmHg (ciśnienie po stronie zwężenia jest istotnie niższe) oraz osłabienie tętna na t. promieniowej."
    },
    {
      front: "Czym różni się 'zjawisko' od 'zespołu' podkradania?",
      back: "Zjawisko (Phenomenon): bezobjawowy wsteczny przepływ w t. kręgowej w USG (nie wymaga operacji).\nZespół (Syndrome): odwrócenie przepływu z objawami neurologicznymi (vertigo, diplopia) lub niedokrwieniem ręki."
    },
    {
      front: "Co to jest zespół podkradania wieńcowo-podobojczykowego (CSSS)?",
      back: "U chorych po CABG z użyciem LIMA: zwężenie t. podobojczykowej odwraca przepływ w LIMA podczas pracy lewą ręką, podkradając krew z serca (LAD) i wywołując dusznicę lub zawał serca!"
    },
    {
      front: "Jakie jest leczenie zabiegowe z wyboru w objawowym SSS?",
      back: "Przezskórna angioplastyka wewnątrznaczyniowa z implantacją stentu (PTA/stent t. podobojczykowej) – skuteczność >95%. W razie niepowodzenia: bypass szyjno-podobojczykowy."
    },
    {
      front: "Na którym ramieniu należy kontrolować ciśnienie u chorego z lewostronnym SSS?",
      back: "Na ramieniu PRAWYM (zdrowym), ponieważ na ramieniu lewym ciśnienie jest fałszywie zaniżone przez zwężenie naczynia."
    }
  ]
};

async function run() {
  console.log("Generating Case 147: Zespół podkradania tętnicy podobojczykowej (SSS)...");
  
  // Mirroring
  case147.steps.forEach(s => {
    s.correct = 0;
    s.correctIdx = 0;
    s.question = s.title;
    s.explanation = s.feedback ? s.feedback[0] : "";
  });
  
  case147.lekQuestions.forEach(q => {
    q.opts = q.options;
    q.correctIdx = q.correct;
    q.exp = q.expl;
  });
  
  const enc = await encryptStringAes(JSON.stringify(case147, null, 2), MASTER_KEY);
  fs.writeFileSync(path.join('cases', '147_zespol_podkradania_tetnicy_podobojczykowej.json'), JSON.stringify(enc, null, 2), 'utf8');
  console.log("[SAVED] Case #147: 147_zespol_podkradania_tetnicy_podobojczykowej.json (LEK Qs: " + case147.lekQuestions.length + ", Steps: " + case147.steps.length + ", Flashcards: " + case147.flashcards.length + ")");
}

run();

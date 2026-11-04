const fs = require('fs');
const path = require('path');
const { encryptStringAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

const case143 = {
  id: 143,
  dept: "Chirurgia naczyniowa",
  title: "Objawowe zwężenie tętnicy szyjnej wewnętrznej (Symptomatic ICA Stenosis)",
  shortTitle: "63-letni Mirosław – Nagłe przemijające zaciemnienie lewego oka (amaurosis fugax) i niedowład prawej ręki (Objawowe zwężenie tętnicy szyjnej)",
  diagnosisTitle: "Objawowe ciasne zwężenie lewej tętnicy szyjnej wewnętrznej (ICA 80% wg NASCET) po TIA – amaurosis fugax, pilna endarterektomia szyjna (CEA) w ciągu 14 dni vs CAS",
  vitals: [
    { name: "Częstość akcji serca", val: "74/min", status: "vital-ok" },
    { name: "Ciśnienie tętnicze", val: "165/95 mmHg", status: "vital-warn" },
    { name: "Temperatura ciała", val: "36.7 °C", status: "vital-ok" },
    { name: "Saturacja SpO2", val: "98%", status: "vital-ok" }
  ],
  vitalsObj: {
    hr: 74,
    bp: "165/95",
    spo2: 98,
    rr: 16,
    temp: 36.7,
    gcs: 15
  },
  story: "<p><strong>Pacjent:</strong> 63-letni mężczyzna, księgowy, zgłosił się w trybie pilnym na SOR z powodu nagłego epizodu całkowitej, bezbolesnej utraty widzenia w lewym oku ('jakby ktoś zaciągnął czarną zasłonę od góry do dołu'), który wystąpił 4 godziny temu i trwał około 8 minut, po czym ustąpił samoistnie.</p><p><strong>Wywiad chorobowy:</strong> Podczas ustępowania zaburzeń widzenia pacjent zauważył nagłe osłabienie siły mięśniowej prawej ręki (wypadł mu trzymany długopis) oraz przejściowe trudności z wypowiadaniem słów trwające około 15 minut. W chwili badania objawy neurologiczne całkowicie ustąpiły. W wywiadzie wieloletnie nadciśnienie tętnicze, hipercholesterolemia, nikotynizm (30 paczkolat). Przyjmuje nieregularnie ramipryl 5 mg. Neguje wcześniejsze epizody neurologiczne.</p><p><strong>Badanie przedmiotowe na SOR:</strong> Pacjent w stanie ogólnym dobrym, przytomny, w pełnym kontakcie logicznym. W badaniu neurologicznym brak ubytków ogniskowych (NIHSS = 0 pkt). Osłuchowo: nad lewą tętnicą szyjną na wysokości kąta żuchwy słyszalny głośny, szorstki szmer skurczowy promieniujący ku górze (nad prawą tętnicą szyjną szmer niesłyszalny). Tony serca czyste, miarowe 74/min. Ciśnienie tętnicze 165/95 mmHg. W oftalmoskopii pośredniej dna oka po stronie lewej: w rozwidleniu tętnicy siatkówkowej widoczny drobny, lśniący, żółtawy zator cholesterolowy (ciałko Hollenhorsta).</p>",
  labs: [
    {
      name: "Morfologia krwi i koagulologia",
      items: [
        { name: "Hemoglobina (Hb)", val: "14.8 g/dl", norm: "13.5 - 17.5 g/dl", flag: "NORMAL" },
        { name: "Hematokryt (Hct)", val: "43.5 %", norm: "40.0 - 52.0 %", flag: "NORMAL" },
        { name: "Leukocyty (WBC)", val: "7.2 G/l", norm: "4.0 - 10.0 G/l", flag: "NORMAL" },
        { name: "Płytki krwi (PLT)", val: "240 G/l", norm: "150 - 400 G/l", flag: "NORMAL" },
        { name: "INR", val: "1.02", norm: "0.8 - 1.2", flag: "NORMAL" },
        { name: "APTT", val: "29 s", norm: "26 - 36 s", flag: "NORMAL" }
      ]
    },
    {
      name: "Biochemia i profil lipidowy",
      items: [
        { name: "Cholesterol całkowity", val: "240 mg/dl", norm: "< 190 mg/dl", flag: "HIGH" },
        { name: "Cholesterol LDL", val: "158 mg/dl", norm: "< 55 mg/dl (ekstremalne ryzyko)", flag: "HIGH" },
        { name: "Cholesterol HDL", val: "42 mg/dl", norm: "> 40 mg/dl", flag: "NORMAL" },
        { name: "Trójglicerydy", val: "200 mg/dl", norm: "< 150 mg/dl", flag: "HIGH" },
        { name: "Glukoza na czczo", val: "106 mg/dl", norm: "70 - 99 mg/dl", flag: "HIGH" },
        { name: "Kreatynina", val: "0.95 mg/dl", norm: "0.7 - 1.2 mg/dl", flag: "NORMAL" },
        { name: "CRP", val: "3.2 mg/l", norm: "< 5.0 mg/l", flag: "NORMAL" }
      ]
    }
  ],
  steps: [
    {
      title: "Krok 1: Wstępna ocena kliniczna i patomechanizm amaurosis fugax",
      text: "Lekarz analizuje incydent przemijającego zaciemnienia lewego oka z następowym niedowładem prawej ręki. Czym jest amaurosis fugax i jaki mechanizm naczyniowy odpowiada za współwystępowanie objawów ocznych po stronie lewej i ruchowych po stronie prawej?",
      options: [
        "Amaurosis fugax to przemijająca ślepota jednooczna wywołana mikrozatorem tętnicy środkowej siatkówki (odgałęzienie tętnicy ocznej z lewej ICA); przeciwstronny niedowład wynika ze skrzyżowania dróg korowo-rdzeniowych zaopatrywanych przez lewą półkulę mózgu",
        "Jest to objaw ostrego odwarstwienia siatkówki wywołany kichaniem",
        "Jest to zator tętnicy kręgowej prawej wywołujący ataksję móżdżkową",
        "Objaw ten wynika z zapalenia nerwu wzrokowego w przebiegu stwardnienia rozsianego"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Amaurosis fugax (przemijająca ślepota jednooczna) jest klasycznym objawem TIA w dorzeczu tętnicy szyjnej wewnętrznej (ICA):</strong><br>1. <strong>Strona lewa (objaw oczny):</strong> z niestabilnej, owrzodziałej blaszki miażdżycowej w lewej tętnicy szyjnej wewnętrznej oderwał się mikrozator cholesterolowy (ciałko Hollenhorsta) i popłynął przez tętnicę oczną do tętnicy środkowej siatkówki (CRA), powodując przejściowe niedokrwienie lewej siatkówki.<br>2. <strong>Strona prawa (objaw ruchowy):</strong> kolejne mikrozatory popłynęły do lewej tętnicy środkowej mózgu (MCA), powodując przejściowe niedokrwienie kory ruchowej lewej półkuli, co wywołało niedowład <strong>przeciwstronnej (prawej) kończyny górnej</strong> ze względu na skrzyżowanie dróg piramidowych w rdzeniu przedłużonym.",
        "❌ BŁĄD! <strong>Odwarstwienie siatkówki nie ustępuje samoistnie w 8 minut i nie daje niedowładu ręki.</strong>",
        "❌ BŁĄD! <strong>Dorzecze kręgowo-podstawne daje objawy z pnia i móżdżku (zawroty głowy, podwójne widzenie, ataksję), a nie izolowane amaurosis fugax.</strong>",
        "❌ BŁĄD! <strong>Pozagałkowe zapalenie nerwu wzrokowego w SM trwa tygodniami i dotyczy młodych kobiet.</strong>"
      ]
    },
    {
      title: "Krok 2: Stratyfikacja ryzyka wczesnego udaru mózgu – Skala ABCD2",
      text: "Pacjent przebył TIA, a obecnie nie ma objawów. Lekarz oblicza wskaźnik w skali ABCD2. Z jakich kryteriów składa się skala ABCD2 i co oznacza wynik 6 punktów uzyskany u tego chorego?",
      options: [
        "Wiek >=60 lat (1 pkt), Ciśnienie >=140/90 mmHg (1 pkt), Objawy kliniczne: jednostronny niedowład (2 pkt), Czas trwania >=60 min (2 pkt, tu 15-60 min = 1 pkt), Cukrzyca (1 pkt); wynik 5-6 pkt oznacza bardzo wysokie ryzyko udaru mózgu (sięgające 10-18% w ciągu 48-7 dni) i bezwzględne wskazanie do pilnej hospitalizacji",
        "Skala ABCD2 ocenia stopień oparzenia termicznego skóry i ryzyko bliznowców",
        "Skala ta dotyczy wyłącznie chorych na astmę oskrzelową w zaostrzeniu",
        "Wynik 6 punktów oznacza brak jakiegokolwiek zagrożenia i możliwość powrotu do pracy"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Skala ABCD2 służy do prognozowania wczesnego ryzyka udaru mózgu w ciągu pierwszych 2-7 dni po przemijającym ataku niedokrwiennym (TIA):</strong><br>- <strong>A (Age):</strong> wiek >=60 lat -> 1 pkt.<br>- <strong>B (Blood pressure):</strong> ciśnienie >=140/90 mmHg -> 1 pkt.<br>- <strong>C (Clinical features):</strong> jednostronny niedowład -> 2 pkt (zaburzenia mowy bez niedowładu -> 1 pkt).<br>- <strong>D (Duration):</strong> czas trwania objawów: >=60 min -> 2 pkt; 10-59 min -> 1 pkt.<br>- <strong>D (Diabetes):</strong> cukrzyca -> 1 pkt.<br>Pacjent ma 63 lata (1), BP 165/95 (1), niedowład ręki (2), czas 15 min (1), glikemia graniczna/cukrzyca (1) = <strong>5-6 punktów (grupa bardzo wysokiego ryzyka udaru)</strong>. Wymaga natychmiastowej diagnostyki naczyniowej w warunkach szpitalnych!",
        "❌ BŁĄD! <strong>Skala ABCD2 to neurologiczna skala ryzyka udaru mózgu.</strong>",
        "❌ BŁĄD! <strong>Nie ma związku z pulmonologią.</strong>",
        "❌ BŁĄD! <strong>Wynik 6 pkt to alarmujące ryzyko udaru zagrażające trwałym inwalidztwem w ciągu kilkudziesięciu godzin.</strong>"
      ]
    },
    {
      title: "Krok 3: Pilna diagnostyka mózgowia – Wykluczenie krwawienia i zawału",
      text: "Jakie badanie neuroobrazowe głowy należy wykonać w pierwszej kolejności na SOR u pacjenta po przebytym TIA?",
      options: [
        "Pilną tomografię komputerową (TK) głowy bez kontrastu lub MRI głowy z sekwencją dyfuzji (DWI) w celu wykluczenia krwawienia śródmózgowego oraz oceny świeżych ognisk niedokrwienia",
        "Zdjęcie rentgenowskie czaszki w 2 projekcjach",
        "Punkcję lędźwiową z pobraniem płynu mózgowo-rdzeniowego",
        "Elektroencefalografię (EEG) we śnie"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Pilne badanie neuroobrazowe (TK głowy bez kontrastu lub MRI z dyfuzją DWI) jest bezwzględnym standardem u każdego pacjenta z podejrzeniem TIA/udaru.</strong> Pozwala wykluczyć krwawienie śródmózgowe, guzy mózgu, krwiaki podtwardówkowe oraz ocenić obecność niemych ognisk niedokrwiennych. Sekwencja MRI DWI jest najczulsza i pozwala wykryć mikrozawały nawet przy całkowitym wycofaniu objawów klinicznych.",
        "❌ BŁĄD! <strong>Zwykłe RTG czaszki nie obrazuje tkanki mózgowej ani ognisk niedokrwiennych.</strong>",
        "❌ BŁĄD! <strong>Punkcja lędźwiowa jest przeciwwskazana w rutynowej diagnostyce TIA naczyniowego.</strong>",
        "❌ BŁĄD! <strong>EEG służy do diagnostyki padaczki, nie udaru niedokrwiennego.</strong>"
      ]
    },
    {
      title: "Krok 4: Diagnostyka zwężenia tętnic szyjnych – Kryteria NASCET",
      text: "W USG Duplex Doppler i Angio-TK stwierdzono ciasne zwężenie lewej tętnicy szyjnej wewnętrznej. Jak definiuje się stopień zwężenia tętnicy szyjnej wewnętrznej zgodnie z międzynarodowymi kryteriami NASCET?",
      options: [
        "Jako procentowy stosunek średnicy światła w miejscu maksymalnego zwężenia (A) do średnicy prawidłowego, dystalnego odcinka tętnicy szyjnej wewnętrznej poza poszerzeniem opuszkowym (B): % zwężenia = [1 - (A/B)] × 100%",
        "Jako stosunek średnicy zwężenia do średnicy aorty brzusznej",
        "Jako grubość kości żuchwy w centymetrach",
        "Kryteria NASCET opierają się wyłącznie na głośności szmeru naczyniowego w stetoskopie"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Kryteria NASCET (North American Symptomatic Carotid Endarterectomy Trial) są złotym standardem oceny stopnia stenozy tętnicy szyjnej wewnętrznej (ICA):</strong><br>Stopień zwężenia oblicza się jako: <strong>[1 - (średnica w miejscu najwęższym / średnica prawidłowej dystalnej ICA za opuszką)] × 100%</strong>.<br>W badaniu NASCET udowodniono, że u pacjentów ze zwężeniem objawowym <strong>70-99%</strong> korzyść z pilnej operacji (CEA) jest spektakularna (bezwzględna redukcja ryzyka udaru/zgonu o 17% w ciągu 2 lat!). W kryteriach europejskich (ECST) mianownikiem była szacowana pierwotna średnica opuszki, stąd zwężenie 70% wg NASCET odpowiada ok. 80-85% wg ECST.",
        "❌ BŁĄD! <strong>NASCET ocenia naczynia szyjne, a nie aortę brzuszną.</strong>",
        "❌ BŁĄD! <strong>Grubość kości nie ma związku ze stenozą naczynia.</strong>",
        "❌ BŁĄD! <strong>Szmer osłuchowy bywa cichy lub zanika przy zwężeniach krytycznych >90% (tzw. trickling flow).</strong>"
      ]
    },
    {
      title: "Krok 5: Wskazania do zabiegu i 'złote okno czasowe'",
      text: "U pacjenta potwierdzono objawowe zwężenie lewej ICA wynoszące 80% wg NASCET. Jaki jest optymalny czas wykonania zabiegu rewaskularyzacji tętnicy szyjnej (CEA) zgodnie z wytycznymi ESVS?",
      options: [
        "Pilnie, w ciągu maksymalnie 14 dni od wystąpienia incydentu neurologicznego (optymalnie w ciągu pierwszych 48 godzin do 7 dni u chorych stabilnych bez rozległego dokonanego udaru)",
        "Planowo po 6-12 miesiącach od epizodu, po ustabilizowaniu ciśnienia",
        "Zabieg wykonuje się dopiero po wystąpieniu co najmniej 5 kolejnych udarów",
        "Zabiegi na tętnicach szyjnych są całkowicie przeciwwskazane u osób po 60. roku życia"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Zasada 'złotego okna czasowego' w chirurgii tętnic szyjnych:</strong> ryzyko kolejnego, często zwiastującego inwalidztwo lub śmierć udaru mózgu jest najwyższe w pierwszych kilkunastu dniach po TIA! Wytyczne ESVS (European Society for Vascular Surgery) bezwzględnie zalecają wykonanie rewaskularyzacji (CEA) <strong>w ciągu 14 dni od incydentu</strong>, a w wyspecjalizowanych ośrodkach u stabilnych chorych najlepiej <strong>w ciągu 48-72 godzin do 7 dni</strong>. Odroczenie operacji poza 14 dni drastycznie obniża protekcyjną wartość zabiegu.",
        "❌ BŁĄD! <strong>Oczekiwanie 6-12 miesięcy to kardynalny błąd –</strong> ponad 20% chorych dozna w tym czasie ciężkiego udaru mózgu!",
        "❌ BŁĄD! <strong>Operację wykonuje się po pierwszym epizodzie TIA, aby ZAPOBIEC udarowi dokonanemu.</strong>",
        "❌ BŁĄD! <strong>Wiek 63 lata to wiek typowy, pacjent odnosi maksymalną korzyść z operacji.</strong>"
      ]
    },
    {
      title: "Krok 6: Wybór metody zabiegowej: Endarterektomia szyjna (CEA) vs Stentowanie (CAS)",
      text: "Lekarz naczyniowy omawia z pacjentem wybór metody zabiegowej. Jaka operacja jest złotym standardem leczenia objawowego zwężenia tętnicy szyjnej i jakie są wskazania do metody wewnątrznaczyniowej (CAS)?",
      options: [
        "Endarterektomia szyjna (CEA – Carotid Endarterectomy) z usunięciem blaszki miażdżycowej i plastyką łatą naczyniową (patch) jest metodą pierwszego rzutu o najniższym ryzyku udaru okołozabiegowego; stentowanie tętnicy szyjnej (CAS z filtrem protekcji mózgowej) jest alternatywą w przypadku 'wrogiej szyi' (po radioterapii, reoperacji), wysokiego anatomicznie zwężenia lub ciężkich obciążeń kardiochirurgicznych",
        "Stentowanie CAS jest zawsze lepsze u chorych po 75. roku życia",
        "Jedynym leczeniem jest wycięcie całej głowy i przeszczep mózgu",
        "Zabiegi operacyjne zastępuje się w 100% masażem zatoki szyjnej"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Endarterektomia szyjna (CEA) pozostaje złotym standardem leczenia objawowego ciasnego zwężenia ICA:</strong><br>1. <strong>CEA (metoda z wyboru):</strong> polega na nacięciu tętnicy szyjnej, wyłuszczeniu blaszki miażdżycowej wraz z błoną wewnętrzną i fragmentem środkowej oraz zamknięciu naczynia za pomocą łaty (patchangioplasty z tworzywa Dacron/PTFE lub żyły odpiszczelowej). Wiąże się z <strong>niższym ryzykiem okołozabiegowego udaru mózgu</strong> niż CAS, zwłaszcza u osób starszych (>70 lat).<br>2. <strong>CAS (Carotid Artery Stenting):</strong> zarezerwowana dla chorych z anatomicznymi przeciwwskazaniami do operacji otwartej ('wroga szyja' po przebytej radioterapii szyi, restenoza po wcześniejszej CEA, wysokie rozwidlenie na poziomie C2, porażenie przeciwstronnego nerwu krtaniowego wstecznego) – zawsze wymaga zastosowania systemu protekcji przeciwzatorowej (filtr mózgowy / EPD).",
        "❌ BŁĄD! <strong>U chorych po 70-75. roku życia stentowanie CAS wiąże się ze znacząco wyższym ryzykiem zatorowości mózgowej niż CEA ze względu na krętość i zwapnienia łuku aorty.</strong>",
        "❌ BŁĄD! <strong>Absurd medyczny.</strong>",
        "❌ BŁĄD! <strong>Masaż zatoki szyjnej w ciasnym zwężeniu grozi oderwaniem blaszki i udarem mózgu!</strong>"
      ]
    },
    {
      title: "Krok 7: Zabezpieczenie farmakologiczne przed i po zabiegu",
      text: "Jakie leczenie farmakologiczne należy wdrożyć natychmiast u pacjenta zakwalifikowanego do pilnej endarterektomii szyjnej?",
      options: [
        "Monoterapia przeciwpłytkowa (kwas acetylosalicylowy 75-100 mg/d lub klopidogrel 75 mg/d) w przypadku CEA (lub podwójna terapia DAPT przed CAS) oraz natychmiastowe włączenie statyny w wysokiej dawce (atorwastatyna 80 mg/d)",
        "Całkowite odstawienie leków przeciwpłytkowych na 3 tygodnie przed zabiegiem",
        "Podanie leków fibrynolitycznych w powolnym wlewie dożylnym przez 7 dni",
        "Stosowanie wyłącznie preparatów ziołowych z miłorzębu japońskiego"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Wytyczne naczyniowe ESVS podkreślają:</strong><br>1. <strong>Terapia przeciwpłytkowa:</strong> leczenie przeciwpłytkowe (<span class='dose-pill'>Kwas acetylosalicylowy 100 mg/d</span> lub <span class='dose-pill'>Klopidogrel 75 mg/d</span>) powinno być rozpoczęte natychmiast i <strong>kontynuowane przez okres okołooperacyjny bez przerw!</strong> Odstawienie aspiryny przed CEA zwiększa ryzyko zakrzepicy i udaru. W przypadku stentowania (CAS) obowiązkowa jest <strong>podwójna terapia przeciwpłytkowa (DAPT: ASA + klopidogrel)</strong> przez minimum 4 tygodnie.<br>2. <strong>Intensywna terapia statynowa:</strong> <span class='dose-pill'>Atorwastatyna 80 mg/d</span> (lub <span class='dose-pill'>Rosuwastatyna 40 mg/d</span>) działa plejotropowo, stabilizuje blaszkę miażdżycową i zmniejsza ryzyko zgonu i udaru mózgu.",
        "❌ BŁĄD! <strong>Odstawienie leków przeciwpłytkowych u pacjenta po TIA z ciasnym zwężeniem to błąd w sztuce –</strong> grozi zawałem mózgu w oczekiwaniu na zabieg!",
        "❌ BŁĄD! <strong>Fibrynoliza w przewlekłej blaszce miażdżycowej jest bezwzględnie zakazana.</strong>",
        "❌ BŁĄD! <strong>Zioła nie mają żadnego wpływu na stabilizację blaszki miażdżycowej.</strong>"
      ]
    },
    {
      title: "Krok 8: Groźne powikłanie pooperacyjne – Zespół hiperperfuzji mózgowej (CHS)",
      text: "W 2. dobie po udanej endarterektomii lewej tętnicy szyjnej pacjent zgłasza silny ból lewej połowy głowy, pojawiają się nudności, splątanie, a ciśnienie tętnicze wzrasta do 190/110 mmHg. Wkrótce dochodzi do napadu drgawek uogólnionych. Jakie powikłanie wystąpiło i jak należy je natychmiast leczyć?",
      options: [
        "Zespół hiperperfuzji mózgowej (Cerebral Hyperperfusion Syndrome – CHS); wymaga natychmiastowego, agresywnego obniżenia ciśnienia tętniczego (SBP <140 mmHg) lekami dożylnymi (labetalol / urapidyl), leczenia przeciwdrgawkowego i pilnej TK głowy celem wykluczenia krwotoku śródmózgowego",
        "Ostre zapalenie ucha środkowego leczone kroplami do uszu",
        "Wstrząs anafilaktyczny leczony adrenaliną domięśniowo",
        "Fizjologiczny stan euforii mózgowej niewymagający leczenia"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Zespół hiperperfuzji mózgowej (CHS – Cerebral Hyperperfusion Syndrome) rozwija się u 1-3% chorych po udrożnieniu ciasnego zwężenia tętnicy szyjnej.</strong> Wskutek wieloletniego niedokrwienia naczynia mózgowe po stronie operowanej utraciły zdolność autoregulacji i są trwale maksymalnie rozszerzone. Po przywróceniu pełnego przepływu tętniczego krew pod wysokim ciśnieniem 'zalewa' bezbronne łożysko naczyniowe, powodując masywny obrzęk mózgu, bóle głowy, drgawki, a w skrajnych przypadkach <strong>masywne krwawienie śródmózgowe o śmiertelności >50%!</strong> Postępowanie ratunkowe: natychmiastowe obniżenie SBP <140 mmHg (<span class='dose-pill'>Urapidyl 10-50 mg i.v.</span> lub <span class='dose-pill'>Labetalol i.v.</span>) oraz podanie leków przeciwpadaczkowych (<span class='dose-pill'>Lewetyracetam 1000 mg i.v.</span>).",
        "❌ BŁĄD! <strong>Drgawki i ból głowy po CEA to alarmujący objaw naczyniowo-mózgowy, a nie zapalenie ucha.</strong>",
        "❌ BŁĄD! <strong>Podanie adrenaliny w zespole hiperperfuzji wywołałoby natychmiastowy krwotok mózgowy i zgon!</strong>",
        "❌ BŁĄD! <strong>CHS to stan zagrożenia życia wymagający natychmiastowej interwencji na OIT/udarówce.</strong>"
      ]
    }
  ],
  pathoNodes: [
    {
      badge: "Niestabilna blaszka",
      title: "Owrzodzenie ateromy w opuszce tętnicy szyjnej",
      short: "Pęknięcie włóknistej czapeczki i uwalnianie mikrozatorów",
      detail: "Turbulentny przepływ w rozwidleniu tętnicy szyjnej wspólnej niszczy śródbłonek nad bogatordzeniową blaszką miażdżycową. Odsłonięcie rdzenia lipidowego aktywuje płytki krwi i generuje mikrozatory cholesterolowo-płytkowe.",
      target: "Opuszka lewej tętnicy szyjnej wewnętrznej (bifurcatio carotidis)",
      drugTarget: "<span class='dose-pill'>Atorwastatyna 80 mg/d</span> stabilizacja blaszki miażdżycowej"
    },
    {
      badge: "Zatorowość siatkówkowa",
      title: "Mikrozatory tętnicy ocznej (Ciałka Hollenhorsta)",
      short: "Zaczopowanie tętnicy środkowej siatkówki; amaurosis fugax",
      detail: "Mikrozator płynie z prądem krwi do tętnicy ocznej i zamyka naczynia siatkówkowe, wywołując przejściową bezbolesną ślepotę jednooczną (amaurosis fugax). Ciałko Hollenhorsta świeci w badaniu dna oka.",
      target: "Tętnica środkowa siatkówki lewej",
      drugTarget: "<span class='dose-pill'>Kwas acetylosalicylowy 100 mg/d</span> hamowanie agregacji płytek"
    },
    {
      badge: "Udrażnianie naczynia",
      title: "Endarterektomia z plastyką łatą naczyniową",
      short: "Wyłuszczenie blaszki miażdżycowej i poszerzenie światła ICA",
      detail: "Chirurgiczne usunięcie zmienionej błony wewnętrznej likwiduje źródło zatorowości oraz znosi gradient ciśnień, chroniąc przed rozległym udarem niedokrwiennym półkuli mózgu.",
      target: "Światło i ściana lewej ICA",
      drugTarget: "<span class='dose-pill'>Endarterektomia szyjna (CEA)</span> zabieg z wyboru w ciągu 14 dni"
    },
    {
      badge: "Załamanie autoregulacji",
      title: "Zaburzenie wazoreaktywności i zespół hiperperfuzji (CHS)",
      short: "Gwałtowny napływ krwi do zwiotczałych naczyń mózgowych",
      detail: "Przewlekle rozszerzone naczynia mikrokrążenia mózgowego po stronie zwężenia nie potrafią się obkurczyć po przywróceniu wysokiego ciśnienia perfuzyjnego, co grozi obrzękiem mózgu i krwotokiem.",
      target: "Mikrokrążenie lewej półkuli mózgu",
      drugTarget: "<span class='dose-pill'>Urapidyl 10-25 mg i.v.</span> kontrola SBP <140 mmHg po zabiegu"
    }
  ],
  diffTable: {
    title: "⚔️ Tabela Różnicowa: TIA w zwężeniu ICA vs Inne przyczyny przejściowych deficytów neurologicznych",
    headers: ["Cecha kliniczna", "Objawowe zwężenie ICA (TIA)", "Zatorowość kardiopochodna (np. w AF)", "Migrena z aurą (Aura migrenowa)", "Ogniskowy napad padaczkowy (Paraliż Todda)", "Zapalenie tętnicy skroniowej (Horton)"],
    rows: [
      ["Charakterystyka objawów ocznych", "Amaurosis fugax: nagła, bezbolesna utrata widzenia w jednym oku ('zasłona'), trwa 5-15 min", "Nagły, trwały ubytek widzenia (zawał siatkówki) lub niedowidzenie połowicze jednoimienne", "Mroczek iskrzący (scintillating scotoma), zygzaki, widzenie tunelowe; trwa 20-30 min, po czym ból głowy", "Omamy wzrokowe, błyski światła; rzadko izolowany ubytek widzenia", "Bolesna utrata widzenia (AION), chromanie żuchwy, bolesność palpacyjna tętnicy skroniowej"],
      ["Deficyt neurologiczny", "Przeciwstronny niedowład ręki/twarzy, afazja (w lewej ICA); pełne ustąpienie w ciągu <1 h", "Często trwały, ciężki udar z masywnym deficytem neurologicznym (wysoki NIHSS)", "Brak trwałego niedowładu; możliwe przejściowe mrowienie ręki lub języka", "Ruchy kloniczne kończyny, po których następuje przejściowy niedowład wiotki (paraliż Todda)", "Brak ogniskowych objawów neurologicznych (chyba że powikłanie udarowe)"],
      ["Badanie osłuchowe szyi", "Głośny, szorstki szmer skurczowy nad tętnicą szyjną (kąt żuchwy)", "Szmery nad tętnicami szyjnymi nieobecne; arytmia w badaniu serca (AF)", "Brak szmerów nad naczyniami szyjnymi", "Brak szmerów nad naczyniami szyjnymi", "Osłabienie lub brak tętna na tętnicy skroniowej powierzchownej, jej bolesność"],
      ["Obraz w USG / Angio-TK", "Ciasne zwężenie (70-99% wg NASCET) w opuszce tętnicy szyjnej wewnętrznej", "Tętnice szyjne drożne bez istotnych zwężeń; skrzeplina w uszku lewego przedsionka", "Prawidłowy obraz tętnic dogłowowych i mózgowych", "Prawidłowy obraz naczyniowy mózgowia", "Objaw 'halo' (obrzęk ściany) w USG tętnicy skroniowej; tętnice szyjne drożne"],
      ["Markery laboratoryjne", "Podwyższony cholesterol LDL; CRP prawidłowe lub nieznacznie podwyższone", "Podwyższone D-dimery; koagulogram prawidłowy lub zmieniony lekami", "Prawidłowe parametry zapalne i laboratoryjne", "Możliwy przejściowy wzrost stężenia prolaktyny po napadzie", "Ekstremalnie wysokie OB (>70-100 mm/h) i wysokie CRP"],
      ["Leczenie pierwszego rzutu", "Pilna endarterektomia szyjna (CEA) w ciągu 14 dni + ASA + statyna", "Doustna antykoagulacja (DOAC: apiksaban / rywaroksaban)", "Tryptany, NLPZ, leki przeciwwymiotne", "Leki przeciwpadaczkowe (np. lewetyracetam, walproinian)", "Natychmiastowe wysokie dawki glikokortykosteroidów (metyloprednizolon i.v.)"]
    ]
  },
  dutySummary: {
    overview: "Objawowe zwężenie tętnicy szyjnej wewnętrznej (Symptomatic Carotid Stenosis) jest bezpośrednią przyczyną około 15-20% wszystkich udarów niedokrwiennych mózgu. Wystąpienie TIA (w tym amaurosis fugax) jest stanem alarmowym – ryzyko pełnego udaru mózgu wynosi aż 10-20% w ciągu pierwszych kilkunastu dni. Pilne wykonanie endarterektomii szyjnej (CEA) w ciągu 14 dni redukuje to ryzyko o ponad 80%.",
    diagnostics: "1. Ocena w skali ABCD2 bezpośrednio po przyjęciu celem stratyfikacji ryzyka udaru mózgu.<br>2. Pilna tomografia komputerowa (TK) głowy bez kontrastu lub MRI głowy z dyfuzją (DWI) celem wykluczenia krwotoku i oceny mikrozawałów.<br>3. USG Duplex Doppler tętnic dogłowowych: ocena prędkości skurczowej PSV (>230 cm/s odpowiada zwężeniu >=70%) i prędkości rozkurczowej EDV (>100 cm/s).<br>4. Angio-TK (CTA) lub Angio-MRI (MRA) łuku aorty i tętnic szyjnych z oceną stopnia zwężenia wg kryteriów NASCET.<br>5. Badanie dna oka przez okulistę (poszukiwanie zatorów cholesterolowych Hollenhorsta).",
    drugsAndDoses: "1. Natychmiastowa monoterapia przeciwpłytkowa przed CEA (kontynuowana bez przerw w okresie okołooperacyjnym):<br>   - <span class='dose-pill'>Kwas acetylosalicylowy 100 mg raz/dobę p.o.</span> LUB<br>   - <span class='dose-pill'>Klopidogrel 75 mg raz/dobę p.o.</span><br>2. W przypadku kwalifikacji do stentowania (CAS) – podwójna terapia DAPT przez min. 4 tygodnie:<br>   - <span class='dose-pill'>Kwas acetylosalicylowy 100 mg/d</span> + <span class='dose-pill'>Klopidogrel 75 mg/d (dawka nasycająca 300 mg)</span>.<br>3. Intensywna terapia statynowa: <span class='dose-pill'>Atorwastatyna 80 mg raz/dobę p.o.</span> (cel LDL <55 mg/dl).<br>4. Ścisła kontrola ciśnienia tętniczego przed i po zabiegu:<br>   - <span class='dose-pill'>Urapidyl 10-50 mg i.v.</span> w bolusach lub we wlewie ciągłym (utrzymanie SBP <140 mmHg celem zapobiegania zespołowi hiperperfuzji CHS).",
    procedures: "1. Endarterektomia szyjna (CEA – Carotid Endarterectomy): metoda z wyboru; wyłuszczenie blaszki miażdżycowej z plastyką łatą naczyniową (patch) lub techniką ewersyjną.<br>2. Stentowanie tętnicy szyjnej (CAS – Carotid Artery Stenting) z filtrem protekcji mózgowej (EPD) w przypadku trudnych warunków anatomicznych (wysokie rozwidlenie, wroga szyja po radioterapii, restenoza po CEA).<br>3. Złote okno czasowe: zabieg rewaskularyzacyjny powinien zostać przeprowadzony w ciągu 14 dni od epizodu TIA (optymalnie w ciągu 48 h do 7 dni).",
    monitoring: "1. Ścisły monitoring neurologiczny co 1 godzinę przez pierwsze 24 h po operacji (ocena mowy, siły mięśniowej, symetrii twarzy).<br>2. Ciągły pomiar ciśnienia tętniczego (linia tętnicza IBP; bezwzględne unikanie skoków SBP >140 mmHg).<br>3. Obserwacja rany pooperacyjnej na szyi pod kątem krwiaka uciskającego drogi oddechowe (krwiak po CEA wymaga natychmiastowego otwarcia powłok na łóżku chorego!).<br>4. Monitorowanie czynności nerwów czaszkowych po CEA: nerwu krtaniowego wstecznego / błędnego (chrypka), nerwu podjęzykowego (zbaczanie języka) i gałęzi brzeżnej żuchwy nerwu twarzowego (asymetria kącika ust)."
  },
  lekQuestions: [
    {
      question: "Zgodnie z wytycznymi Europejskiego Towarzystwa Chirurgii Naczyniowej (ESVS), u pacjenta po przebytym TIA ze zwężeniem tętnicy szyjnej wewnętrznej wynoszącym 70-99% wg NASCET, optymalny czas wykonania endarterektomii szyjnej (CEA) wynosi:",
      options: [
        "W ciągu 14 dni od wystąpienia incydentu neurologicznego (optymalnie w ciągu pierwszych 48 godzin do 7 dni)",
        "Dopiero po 6 miesiącach od epizodu, po pełnym wygojeniu naczyń",
        "W ciągu pierwszych 15 minut od zachorowania w karetce pogotowia",
        "Planowo po ukończeniu 75. roku życia",
        "Operacja tętnic szyjnych jest przeciwwskazana w fazie ostrej i nigdy się jej nie wykonuje"
      ],
      correct: 0,
      expl: "Zgodnie z wytycznymi ESVS, u pacjentów z objawowym zwężeniem tętnicy szyjnej wewnętrznej (70-99% wg NASCET) rewaskularyzacja (CEA) powinna być wykonana tak szybko, jak to możliwe – w ciągu 14 dni od wystąpienia TIA lub udaru, a najlepiej w ciągu pierwszych 48 godzin do 7 dni u chorych stabilnych. Opóźnienie zabiegu poza 14 dni drastycznie zmniejsza jego skuteczność w zapobieganiu udarom."
    },
    {
      question: "Objaw Amaurosis fugax (przemijająca ślepota jednooczna) jest patognomonicznym zwiastunem niedokrwienia mózgu w dorzeczu:",
      options: [
        "Tętnicy szyjnej wewnętrznej po tej samej stronie co zaburzenia widzenia",
        "Tętnicy szyjnej wewnętrznej po stronie przeciwnej",
        "Tętnicy kręgowej i tętnicy podstawnej",
        "Tętnicy rdzeniowej przedniej",
        "Żyły głównej górnej"
      ],
      correct: 0,
      expl: "Amaurosis fugax jest spowodowana zatorowością tętnicy środkowej siatkówki materiałem z blaszki miażdżycowej w opuszce tętnicy szyjnej wewnętrznej (ICA). Ponieważ tętnica oczna odchodzi od tożstronnej (ipsilateralnej) ICA, zaciemnienie oka występuje po tej samej stronie co zwężenie tętnicy szyjnej."
    },
    {
      question: "Drobne, lśniące, żółtawe kryształki cholesterolu widoczne na dnie oka w rozwidleniach tętnic siatkówki u chorych ze zwężeniem tętnicy szyjnej to:",
      options: [
        "Ciałka Hollenhorsta",
        "Guzki Rotha",
        "Ciałka Aschoffa",
        "Ciałka Lewy'ego",
        "Ciałka Heinza"
      ],
      correct: 0,
      expl: "Ciałka Hollenhorsta to mikroskopijne zatory cholesterolowe pochodzące z rozpadających się, owrzodziałych blaszek miażdżycowych tętnicy szyjnej lub łuku aorty, które więzną w rozgałęzieniach tętniczek siatkówki. Są wysoce swoistym wskaźnikiem zaawansowanej aterotrombozy dogłowowej."
    },
    {
      question: "Wskaż, który parametr NIE wchodzi w skład neurologicznej skali ABCD2 służącej do oceny ryzyka udaru mózgu po TIA:",
      options: [
        "Stężenie hemoglobiny w morfologii krwi (Hb)",
        "Wiek pacjenta (Age >=60 lat)",
        "Wartość ciśnienia tętniczego (Blood pressure >=140/90 mmHg)",
        "Cechy kliniczne (Clinical features: jednostronny niedowład lub zaburzenia mowy)",
        "Czas trwania objawów (Duration of symptoms) oraz obecność cukrzycy (Diabetes)"
      ],
      correct: 0,
      expl: "Skala ABCD2 obejmuje: A (Age >=60 l. - 1 pkt), B (Blood pressure >=140/90 - 1 pkt), C (Clinical features: niedowład - 2 pkt, zaburzenia mowy bez niedowładu - 1 pkt), D (Duration: >=60 min - 2 pkt, 10-59 min - 1 pkt) oraz D (Diabetes - 1 pkt). Stężenie hemoglobiny nie jest elementem tej skali."
    },
    {
      question: "Wskaż prawidłowy sposób obliczania stopnia stenozy tętnicy szyjnej wewnętrznej zgodnie z metodą NASCET:",
      options: [
        "Porównanie średnicy światła w miejscu zwężenia do średnicy prawidłowego, dystalnego odcinka tętnicy szyjnej wewnętrznej poza opuszką",
        "Porównanie średnicy zwężenia do średnicy tętnicy szyjnej wspólnej",
        "Porównanie średnicy zwężenia do szacowanej pierwotnej średnicy opuszki",
        "Ocena wyłącznie pola powierzchni przekroju żyły szyjnej wewnętrznej",
        "Stosunek długości blaszki miażdżycowej do wzrostu pacjenta"
      ],
      correct: 0,
      expl: "Kryteria NASCET opierają się na porównaniu najwęższego światła tętnicy szyjnej wewnętrznej (ICA) do średnicy prawidłowego, niezmienionego odcinka tej samej ICA położonego dystalnie od zwężenia (poza poszerzeniem opuszkowym). Wzór to: [1 - (D_min / D_dist)] × 100%."
    },
    {
      question: "Złotym standardem leczenia operacyjnego u pacjentów w podeszłym wieku (>70 lat) z objawowym ciasnym zwężeniem tętnicy szyjnej wewnętrznej (70-99% wg NASCET) jest:",
      options: [
        "Chirurgiczna endarterektomia szyjna (CEA – Carotid Endarterectomy)",
        "Stentowanie tętnicy szyjnej (CAS) bez użycia filtrów naczyniowych",
        "Wycięcie mięśnia mostkowo-obojczykowo-sutkowego",
        "Podwiązanie tętnicy szyjnej wspólnej na głuche",
        "Wstrzyknięcie toksyny botulinowej do tętnicy szyjnej"
      ],
      correct: 0,
      expl: "U chorych z objawowym zwężeniem tętnicy szyjnej (zwłaszcza w wieku >70 lat) endarterektomia szyjna (CEA) jest złotym standardem i metodą preferowaną nad stentowaniem (CAS). Badania kliniczne (m.in. CREST, ICSS) wykazały, że CEA wiąże się ze znamiennie niższym ryzykiem okołozabiegowego udaru mózgu i zgonu niż CAS u osób starszych."
    },
    {
      question: "Stentowanie tętnicy szyjnej (CAS) jest preferowaną alternatywą dla endarterektomii chirurgicznej (CEA) w przypadku:",
      options: [
        "Trudnych warunków anatomicznych do operacji otwartej: szyi po radioterapii, restenozy po przebytej CEA lub bardzo wysokiego odejścia zwężenia (powyżej kąta żuchwy C2)",
        "Obecności masywnych, okrężnych zwapnień łuku aorty u pacjenta w wieku 85 lat",
        "Uczulenia pacjenta na znieczulenie miejscowe",
        "Tętniaka rozwarstwiającego aorty wstępującej typu Stanford A",
        "Zwężenia tętnicy szyjnej o stopniu poniżej 20%"
      ],
      correct: 0,
      expl: "CAS jest preferowaną metodą w sytuacjach, gdy dostęp chirurgiczny do tętnicy szyjnej jest skrajnie utrudniony lub niebezpieczny (tzw. 'wroga szyja' – hostile neck): po przebytej radioterapii szyi, przy restenozie po wcześniejszej operacji CEA, przy zwężeniach położonych bardzo wysoko (na wysokości C2 i wyżej) lub u chorych z porażeniem nerwu krtaniowego po stronie przeciwnej."
    },
    {
      question: "Zespół hiperperfuzji mózgowej (CHS – Cerebral Hyperperfusion Syndrome) po operacji tętnicy szyjnej objawia się silnym bólem głowy, drgawkami i obrzękiem mózgu. Podstawą leczenia tego powikłania jest:",
      options: [
        "Natychmiastowe, agresywne obniżenie ciśnienia tętniczego (SBP <140 mmHg) za pomocą leków dożylnych (np. urapidyl, labetalol)",
        "Podanie wlewu noradrenaliny celem podniesienia ciśnienia skurczowego >180 mmHg",
        "Natychmiastowe przetoczenie 4 jednostek koncentratu krwinek czerwonych",
        "Pionizacja pacjenta i podanie kofeiny w dawce 500 mg",
        "Podanie leków rozszerzających naczynia mózgowe (nitrogliceryna)"
      ],
      correct: 0,
      expl: "Zespół hiperperfuzji mózgowej (CHS) wynika z zalania zwiotczałego, pozbawionego autoregulacji mikrokrążenia mózgowego krwią pod wysokim ciśnieniem. Jedynym skutecznym, ratującym życie leczeniem jest agresywne obniżenie skurczowego ciśnienia tętniczego do wartości <140 mmHg (a niekiedy <120 mmHg) za pomocą dożylnych leków hipotensyjnych (urapidyl, labetalol) oraz leczenie przeciwdrgawkowe."
    },
    {
      question: "Podczas zabiegu endarterektomii szyjnej (CEA) uszkodzenie którego nerwu czaszkowego manifestuje się pooperacyjną chrypką i osłabieniem głosu?",
      options: [
        "Nerwu krtaniowego wstecznego (odgałęzienie nerwu błędnego – n. X)",
        "Nerwu podjęzykowego (n. XII)",
        "Nerwu twarzowego (n. VII)",
        "Nerwu dodatkowego (n. XI)",
        "Nerwu trójdzielnego (n. V)"
      ],
      correct: 0,
      expl: "Nerw błędny (n. X) biegnie w pochewce naczyniowej szyi bezpośrednio za tętnicą szyjną wspólną i wewnętrzną. Jego naciągnięcie lub podwiązanie gałęzi – nerwu krtaniowego górnego lub wstecznego – skutkuje porażeniem struny głosowej, co manifestuje się chrypką i osłabieniem siły głosu."
    },
    {
      question: "Pojawienie się szybko narastającego, napiętego krwiaka w loży operacyjnej na szyi w pierwszych godzinach po endarterektomii szyjnej z towarzyszącym świstem krtaniowym (stridor) i dusznością wymaga:",
      options: [
        "Natychmiastowego otwarcia rany i ewakuacji krwiaka przy łóżku chorego celem ratowania przed uduszeniem, a następnie rewizji na bloku operacyjnym",
        "Zastosowania zimnych okładów z lodu i podania leków uspokajających",
        "Zlecenia badania USG szyi w trybie planowym na dzień kolejny",
        "Założenia ciasnego opatrunku uciskowego wokół całej szyi",
        "Wykonania pilnego nakłucia lędźwiowego"
      ],
      correct: 0,
      expl: "Krwiak pooperacyjny na szyi jest bezpośrednim stanem zagrożenia życia – krew w zamkniętej przestrzeni powięziowej uciska tchawicę, wywołując gwałtowne uduszenie. W przypadku stridoru i duszności lekarz musi natychmiast rozciąć szwy powłok i rozewrzeć ranę przy łóżku pacjenta celem dekompresji tchawicy, a dopiero potem przetransportować chorego na blok operacyjny do hemostazy."
    },
    {
      question: "Jakie leczenie statynowe jest zalecane u chorego z rozpoznaniem objawowego zwężenia tętnicy szyjnej wewnętrznej?",
      options: [
        "Intensywne leczenie wysokimi dawkami silnych statyn (np. atorwastatyna 80 mg lub rosuwastatyna 40 mg) niezależnie od wyjściowego stężenia cholesterolu",
        "Niskie dawki simwastatyny podawane wyłącznie w weekendy",
        "Statyny są bezwzględnie przeciwwskazane w chorobach tętnic dogłowowych",
        "Stosowanie wyłącznie diety niskotłuszczowej bez farmakoterapii",
        "Podawanie kwasów omega-3 w zastępstwie statyn"
      ],
      feedback: "",
      correct: 0,
      expl: "Objawowa miażdżyca tętnic szyjnych kwalifikuje pacjenta do kategorii ekstremalnego/bardzo wysokiego ryzyka sercowo-naczyniowego. Wskazane jest natychmiastowe wdrożenie maksymalnych tolerowanych dawek statyn (atorwastatyna 80 mg lub rosuwastatyna 40 mg) celem stabilizacji blaszki miażdżycowej i redukcji stężenia LDL <55 mg/dl."
    }
  ],
  flashcards: [
    {
      front: "Co to jest Amaurosis fugax i jaki jest jej mechanizm?",
      back: "Przemijająca, bezbolesna ślepota jednooczna ('zasłona zaciągana od góry') trwająca kilka minut. Wynika z mikrozatorowości tętnicy środkowej siatkówki (ciałka Hollenhorsta) z tożstronnej tętnicy szyjnej wewnętrznej (ICA)."
    },
    {
      front: "Co oznacza wynik 5-6 punktów w skali ABCD2 po TIA?",
      back: "Bardzo wysokie ryzyko udaru mózgu (sięgające 10-18% w ciągu pierwszych 2-7 dni!). Wskazanie do natychmiastowej hospitalizacji i diagnostyki naczyniowej."
    },
    {
      front: "Jak oblicza się stopień zwężenia tętnicy szyjnej wg kryteriów NASCET?",
      back: "Stosunek średnicy najwęższego miejsca do średnicy prawidłowego naczynia dystalnego ICA (za poszerzeniem opuszkowym): % = [1 - (D_min / D_dist)] × 100%."
    },
    {
      front: "Jaki jest optymalny czas wykonania operacji (CEA) w objawowym zwężeniu ICA 70-99%?",
      back: "Pilnie w ciągu 14 dni od epizodu neurologicznego (a optymalnie w ciągu pierwszych 48 h do 7 dni). Opóźnienie drastycznie zmniejsza korzyść protekcyjną zabiegu."
    },
    {
      front: "CEA vs CAS – która metoda jest złotym standardem?",
      back: "CEA (endarterektomia chirurgiczna z łatą) jest złotym standardem (mniejsze ryzyko udaru okołooperacyjnego, zwłaszcza u osób >70 l.). CAS stosuje się przy 'wrogiej szyi', po radioterapii i wysokim zwężeniu."
    },
    {
      front: "Czym jest zespół hiperperfuzji mózgowej (CHS) po operacji tętnicy szyjnej?",
      back: "Obrzęk mózgu, silny ból głowy, drgawki i ryzyko krwotoku śródmózgowego wskutek utraty autoregulacji i nagłego napływu krwi. Wymaga natychmiastowego obniżenia ciśnienia (SBP <140 mmHg, urapidyl/labetalol)."
    }
  ]
};

async function run() {
  console.log("Generating Case 143: Objawowe zwężenie tętnicy szyjnej...");
  
  // Mirroring
  case143.steps.forEach(s => {
    s.question = s.title;
    s.explanation = s.feedback ? s.feedback[0] : "";
  });
  
  case143.lekQuestions.forEach(q => {
    q.opts = q.options;
    q.correctIdx = q.correct;
    q.exp = q.expl;
  });
  
  const enc = await encryptStringAes(JSON.stringify(case143, null, 2), MASTER_KEY);
  fs.writeFileSync(path.join('cases', '143_objawowe_zwezenie_tetnicy_szyjnej.json'), JSON.stringify(enc, null, 2), 'utf8');
  console.log("[SAVED] Case #143: 143_objawowe_zwezenie_tetnicy_szyjnej.json (LEK Qs: " + case143.lekQuestions.length + ", Steps: " + case143.steps.length + ", Flashcards: " + case143.flashcards.length + ")");
}

run();

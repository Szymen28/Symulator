const fs = require('fs');
const path = require('path');
const { encryptStringAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

const case145 = {
  id: 145,
  dept: "Chirurgia naczyniowa",
  title: "Zakrzepowe zapalenie żył powierzchownych (Superficial Vein Thrombosis – SVT)",
  shortTitle: "49-letnia Grażyna – Bolesny, stwardniały, zaczerwieniony powrózek naczyniowy wzdłuż uda (Zakrzepowe zapalenie żyły odpiszczelowej / SVT)",
  diagnosisTitle: "Zakrzepowe zapalenie żyły odpiszczelowej (SVT) prawej kończyny dolnej dochodzące na odległość <3 cm od ujścia odpiszczelowo-udowego (SFJ) – pełna antykoagulacja (DOAC/LMWH) vs fondaparynuks, profilaktyka PE",
  vitals: [
    { name: "Częstość akcji serca", val: "82/min", status: "vital-ok" },
    { name: "Ciśnienie tętnicze", val: "128/82 mmHg", status: "vital-ok" },
    { name: "Temperatura ciała", val: "37.3 °C", status: "vital-warn" },
    { name: "Saturacja SpO2", val: "98%", status: "vital-ok" }
  ],
  vitalsObj: {
    hr: 82,
    bp: "128/82",
    spo2: 98,
    rr: 16,
    temp: 37.3,
    gcs: 15
  },
  story: "<p><strong>Pacjentka:</strong> 49-letnia fryzjerka zgłosiła się do poradni chirurgii naczyniowej z powodu ostrego, piekącego bólu, obrzęku i pasmowatego zaczerwienienia skóry wzdłuż przyśrodkowej powierzchni prawego uda, narastającego od 4 dni.</p><p><strong>Wywiad chorobowy:</strong> Pacjentka od kilkunastu lat ma widoczne żylaki pnia żyły odpiszczelowej, wykonuje pracę stojącą po 8-10 godzin na dobę. Przed tygodniem doznała drobnego stłuczenia okolicy kolana, po czym pojawiło się stwardnienie naczynia, które w ostatnich 48 godzinach gwałtownie 'wspięło się' ku pachwinie. Od 3 lat przyjmuje doustną antykoncepcję dwuskładnikową. Neguje duszność, ból w klatce piersiowej, kaszel oraz wywiad przebytej zakrzepicy żył głębokich. Nie przyjmuje leków przeciwkrzepliwych.</p><p><strong>Badanie przedmiotowe na SOR:</strong> Na przyśrodkowej powierzchni prawego uda, dokładnie w rzucie pnia żyły odpiszczelowej (GSV), widoczne pasmowate, żywoczerwone zaczerwienienie skóry o długości ok. 18 cm, dochodzące w okolice pachwiny (ok. 3-4 cm poniżej więzadła pachwinowego). W badaniu palpacyjnym wyczuwalny twardy, niepodatny na ucisk, ucieplony i skrajnie bolesny 'powrózek' naczyniowy z widocznym obrzękiem tkanek miękkich wokół naczynia. Podudzie prawe bez cech obrzęku ciastowatego – asymetria obwodów goleni wynosi zaledwie 0,5 cm. Objaw Homansa ujemny. Tętno na tętnicach grzbietowych stóp i piszczelowych tylnych jest w pełni wyczuwalne i symetryczne.</p>",
  labs: [
    {
      name: "Morfologia krwi i parametry zapalne",
      items: [
        { name: "Hemoglobina (Hb)", val: "13.4 g/dl", norm: "12.0 - 16.0 g/dl", flag: "NORMAL" },
        { name: "Hematokryt (Hct)", val: "39.8 %", norm: "37.0 - 47.0 %", flag: "NORMAL" },
        { name: "Leukocyty (WBC)", val: "8.2 G/l", norm: "4.0 - 10.0 G/l", flag: "NORMAL" },
        { name: "Płytki krwi (PLT)", val: "245 G/l", norm: "150 - 400 G/l", flag: "NORMAL" },
        { name: "CRP", val: "16.8 mg/l", norm: "< 5.0 mg/l", flag: "HIGH" }
      ]
    },
    {
      name: "Koagulologia i marker zakrzepicy",
      items: [
        { name: "D-dimery", val: "1640 ng/ml", norm: "< 500 ng/ml", flag: "HIGH" },
        { name: "INR", val: "1.01", norm: "0.8 - 1.2", flag: "NORMAL" },
        { name: "APTT", val: "30 s", norm: "26 - 36 s", flag: "NORMAL" },
        { name: "Fibrynogen", val: "3.8 g/l", norm: "2.0 - 4.0 g/l", flag: "NORMAL" }
      ]
    },
    {
      name: "Biochemia i funkcja nerek",
      items: [
        { name: "Kreatynina", val: "0.78 mg/dl", norm: "0.5 - 1.0 mg/dl", flag: "NORMAL" },
        { name: "eGFR", val: "> 90 ml/min/1.73m2", norm: "> 90 ml/min", flag: "NORMAL" },
        { name: "Mocznik", val: "26 mg/dl", norm: "15 - 45 mg/dl", flag: "NORMAL" }
      ]
    }
  ],
  steps: [
    {
      title: "Krok 1: Wstępna ocena kliniczna i mechanizm zakrzepicy powierzchownej (SVT)",
      text: "Lekarz ocenia pacjentkę ze stwardniałym, bolesnym, zaczerwienionym powrózkiem wzdłuż żyły odpiszczelowej uda. Czym różni się zakrzepowe zapalenie żył powierzchownych (SVT) od zapalenia żył głębokich (DVT) i jakie są główne czynniki ryzyka?",
      options: [
        "SVT dotyczy żył położonych powyżej powięzi głębokiej kończyny (najczęściej żyły odpiszczelowej GSV w obrębie istniejących żylaków); charakteryzuje się wyraźnymi objawami miejscowego odczynu zapalnego skóry (rumień, ucieplenie, bolesny stwardniały powrózek), a czynnikami ryzyka są przewlekła niewydolność żylna, praca stojąca, doustna antykoncepcja i mikrourazy",
        "SVT występuje wyłącznie w tętnicach wieńcowych serca",
        "SVT nigdy nie daje objawów miejscowych i przebiega bezboleśnie",
        "SVT jest zakażeniem bakteryjnym wywołanym przez gronkowca złocistego leczonym wyłącznie maścią z antybiotykiem"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Zakrzepowe zapalenie żył powierzchownych (SVT – Superficial Vein Thrombosis) rozwija się w ponad 70-80% przypadków w żylakowato zmienionej żyle odpiszczelowej (GSV) lub odstrzałkowej (SSV).</strong> Charakteryzuje się intensywną reakcją zapalną ściany naczynia i otaczających tkanek: skóra nad naczyniem jest zaczerwieniona, ucieplona i bolesna, a sama żyła staje się twardym, wyczuwalnym powrózkiem. Dawniej uważane za chorobę całkowicie łagodną, dziś SVT traktuje się jako <strong>integralną część żylnej choroby zakrzepowo-zatorowej (ŻChZZ)</strong> ze względu na wysokie ryzyko współistnienia niemego DVT lub zatorowości płucnej!",
        "❌ BŁĄD! <strong>SVT to schorzenie żył powierzchownych kończyn, nie naczyń wieńcowych.</strong>",
        "❌ BŁĄD! <strong>SVT daje bardzo wyraźne, bolesne objawy zapalno-zakrzepowe.</strong>",
        "❌ BŁĄD! <strong>SVT to proces pierwotnie jałowy (zakrzepowo-zapalny), nie infekcja bakteryjna; antybiotyki nie są wskazane!</strong>"
      ]
    },
    {
      title: "Krok 2: Badanie ultrasonograficzne Duplex Doppler i ocena zasięgu skrzepliny",
      text: "Lekarz naczyniowy niezwłocznie wykonuje badanie USG Duplex Doppler obu kończyn dolnych. Dlaczego pełne badanie USG układu żył głębokich i powierzchownych jest bezwzględnie obowiązkowe u KAŻDEGO pacjenta z klinicznym podejrzeniem SVT?",
      options: [
        "Ponieważ aż u 20-25% pacjentów z klinicznym SVT współistnieje niema klinicznie zakrzepica żył głębokich (DVT), a badanie USG pozwala precyzyjnie ocenić odległość czoła skrzepliny od ujścia odpiszczelowo-udowego (SFJ), co decyduje o strategii leczenia",
        "USG wykonuje się wyłącznie w celu pomiaru grubości tkanki tłuszczowej uda",
        "Badanie USG jest zbędne, ponieważ rozpoznanie stawia się wyłącznie na podstawie oglądania",
        "USG ma na celu wykluczenie ciąży u pacjentki"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Współczesne wytyczne ESVS kategorycznie nakazują wykonanie pełnego USG Duplex Doppler u każdego chorego z SVT!</strong> Wynika to z dwóch kluczowych faktów:<br>1. <strong>Współistnienie DVT:</strong> u ok. <strong>20-25% chorych</strong> z pozoru izolowanym zapaleniem żyły powierzchownej w badaniu USG stwierdza się współistniejącą, bezobjawową zakrzepicę żył głębokich!<br>2. <strong>Zasięg skrzepliny w badaniu fizykalnym jest rażąco niedoszacowany:</strong> skrzeplina w świetle naczynia sięga w USG średnio o <strong>5-10 cm wyżej</strong>, niż wskazuje na to widoczny rumień skóry!<br>3. <strong>Odległość od ujścia SFJ:</strong> kluczowy parametr decydujący o dawkowaniu antykoagulacji.",
        "❌ BŁĄD! <strong>Samo oglądanie nie pozwala ocenić wnętrza naczynia ani wykluczyć DVT.</strong>",
        "❌ BŁĄD! <strong>USG jest fundamentem współczesnej flebologii naczyniowej.</strong>",
        "❌ BŁĄD! <strong>Badanie dotyczy naczyń krwionośnych kończyny dolnej.</strong>"
      ]
    },
    {
      title: "Krok 3: Krytyczna granica naczyniowa – 'Złota zasada 3 cm' od ujścia SFJ",
      text: "W badaniu USG stwierdzono, że czoło skrzepliny w pniu żyły odpiszczelowej (GSV) znajduje się w odległości zaledwie 2,2 cm od ujścia odpiszczelowo-udowego (Sapheno-Femoral Junction – SFJ). Jak brzmi kluczowa reguła postępowania terapeutycznego w takiej sytuacji?",
      options: [
        "Jeśli skrzeplina podchodzi na odległość <3 cm od ujścia odpiszczelowo-udowego (SFJ) lub odpiszczelowo-podkolanowego (SPJ), stan ten traktuje się i leczy dokładnie tak samo jak proksymalną zakrzepicę żył głębokich (DVT) – pełnymi dawkami terapeutycznymi antykoagulacji!",
        "Skrzeplinę w odległości <3 cm leczy się wyłącznie maścią z heparyną",
        "Należy natychmiast wykonać amputację uda w jednej trzeciej dolnej",
        "W odległości <3 cm leczenie jest zbędne, ponieważ zastawka ostialna chroni przed zatorowością"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>To jedna z najczęściej sprawdzanych reguł flebologicznych na egzaminie LEK!</strong><br>Jeśli czoło skrzepliny w żyle odpiszczelowej (GSV) lub odstrzałkowej (SSV) znajduje się w odległości <strong>< 3 cm od ujścia do układu głębokiego (spływ SFJ do żyły udowej wspólnej lub SPJ do podkolanowej)</strong>, ryzyko 'wypłynięcia' skrzepliny do układu głębokiego i wywołania śmiertelnego zatoru tętnicy płucnej (PE) jest identyczne jak w proksymalnej DVT! <strong>Stan ten wymaga natychmiastowego wdrożenia PEŁNEJ TERAPEUTYCZNEJ DAWKI LEKÓW PRZECIWKRZEPLIWYCH (np. DOAC w pełnej dawce lub LMWH w dawce 1 mg/kg 2x/d) przez co najmniej 3 miesiące!</strong>",
        "❌ BŁĄD! <strong>Sama maść nie zapobiega zatorowości płucnej.</strong>",
        "❌ BŁĄD! <strong>To zakrzepica żylna, leczy się ją farmakologicznie, a nie amputacją.</strong>",
        "❌ BŁĄD! <strong>Zastawka ostialna nie stanowi bariery dla narastającej skrzepliny.</strong>"
      ]
    },
    {
      title: "Krok 4: Postępowanie w izolowanym SVT oddalonym od ujścia (Badanie CALISTO)",
      text: "Gdyby u pacjentki skrzeplina miała długość >=5 cm, ale jej czoło znajdowało się w bezpiecznej odległości (>3 cm) od ujścia SFJ, jaka terapia przeciwkrzepliwa jest złotym standardem wg przełomowego badania CALISTO?",
      options: [
        "Fondaparynuks w stałej podskórnej dawce profilaktyczno-leczniczej 2,5 mg raz na dobę przez 45 dni",
        "Aspiryna w dawce 500 mg 3 razy na dobę przez 1 rok",
        "Dożylna infuzja streptokinazy przez 72 godziny na OIT",
        "Warfaryna z docelowym INR 3,5-4,5 przez 10 lat"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Badanie CALISTO (3000 chorych) zrewolucjonizowało leczenie zakrzepowego zapalenia żył powierzchownych!</strong> U chorych z ostrym, objawowym SVT o długości odcinka <strong>>= 5 cm</strong> i położonym w odległości <strong>> 3 cm od ujścia SFJ/SPJ</strong> lekiem z wyboru o najwyższym poziomie dowodów (klasa I, poziom A wg wytycznych ESC i CHEST) jest: <strong><span class='dose-pill'>Fondaparynuks 2,5 mg s.c. raz/dobę przez 45 dni</span></strong>. Schemat ten w porównaniu do placebo zredukował ryzyko zgonu, zatorowości płucnej, zakrzepicy żył głębokich i progresji zakrzepicy o <strong>85%</strong> bez zwiększenia ryzyka poważnych krwawień!",
        "❌ BŁĄD! <strong>Aspiryna nie zapobiega progresji zakrzepicy żylnej i powikłaniom zatorowym.</strong>",
        "❌ BŁĄD! <strong>Tromboliza ogólnoustrojowa w SVT jest bezwzględnie przeciwwskazana.</strong>",
        "❌ BŁĄD! <strong>Warfaryna nie jest lekiem pierwszego wyboru w izolowanym SVT.</strong>"
      ]
    },
    {
      title: "Krok 5: Rola doustnych antykoagulantów (DOAC) w SVT – Badanie SURPRISE",
      text: "Pacjentka pyta o możliwość uniknięcia codziennych bolesnych zastrzyków podskórnych. Jaki bezpośredni doustny antykoagulant (DOAC) został przebadany i uznany za równoważną doustną alternatywę dla fondaparynuksu w leczeniu SVT (badanie SURPRISE)?",
      options: [
        "Rywaroksaban w małej dawce 10 mg doustnie raz na dobę przez 45 dni",
        "Klopidogrel w dawce 75 mg raz na dobę",
        "Dabigatran w dawce 300 mg co 4 godziny",
        "Heparyna niefrakcjonowana doustnie w tabletkach"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>W badaniu klinicznym SURPRISE wykazano, że doustny bezpośredni inhibitor czynnika Xa – <span class='dose-pill'>Rywaroksaban w dawce 10 mg raz na dobę przez 45 dni</span> jest równie skuteczny i bezpieczny (non-inferior) jak podskórny fondaparynuks 2,5 mg/d w zapobieganiu powikłaniom zatorowo-zakrzepowym w SVT.</strong> Stanowi to doskonałą, komfortową opcję terapeutyczną dla chorych preferujących leczenie doustne lub mających awersję do codziennych iniekcji podskórnych.",
        "❌ BŁĄD! <strong>Klopidogrel to lek przeciwpłytkowy bez rejestracji w zakrzepicy żylnej.</strong>",
        "❌ BŁĄD! <strong>Dabigatran w takiej dawce spowodowałby śmiertelne krwotoki.</strong>",
        "❌ BŁĄD! <strong>Heparyna niefrakcjonowana nie wchłania się z przewodu pokarmowego.</strong>"
      ]
    },
    {
      title: "Krok 6: Leczenie objawowe i kompresjoterapia w ostrej fazie",
      text: "Oprócz celowanej farmakoterapii przeciwkrzepliwej, jakie postępowanie niefarmakologiczne i objawowe należy wdrożyć u pacjentki z SVT?",
      options: [
        "Wczesna mobilizacja (chodzenie), natychmiastowe wdrożenie kompresjoterapii (pończochy lub podkolanówki uciskowe II klasy 23-32 mmHg), miejscowe chłodne okłady oraz miejscowe żele z NLPZ lub heparyną w celu złagodzenia bólu i odczynu zapalnego",
        "Bezwzględny reżim łóżkowy przez 30 dni z uniesieniem nóg na wyciągu",
        "Gorące okłady z parafiny i intensywne rozmasowywanie bolącego powrózka",
        "Zastosowanie pijawek lekarskich bezpośrednio na skórę nad zakrzepem"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Kompleksowe leczenie wspomagające SVT opiera się na 4 filarach:</strong><br>1. <strong>Kompresjoterapia:</strong> pończochy lub podkolanówki uciskowe (II klasa ucisku: 23-32 mmHg) przyspieszają przepływ w żyłach głębokich, redukują refluks i zmniejszają bolesność.<br>2. <strong>Aktywność fizyczna:</strong> pacjentka powinna normalnie chodzić i funkcjonować (zakaz leżenia w łóżku!).<br>3. <strong>Łagodzenie odczynu zapalnego:</strong> zimne okłady (cold packs) oraz miejscowe preparaty z NLPZ (diklofenak żel) lub maści z heparyną redukują lokalny ból i rumień.<br><em>Uwaga:</em> Gorące kąpiele i masaże są bezwzględnie zakazane z powodu ryzyka oderwania skrzepliny!",
        "❌ BŁĄD! <strong>Leżenie w łóżku zwiększa zastój żylny i ryzyko zatorowości płucnej.</strong>",
        "❌ BŁĄD! <strong>Gorąco i masaż to prosta droga do oderwania skrzepliny do krążenia płucnego!</strong>",
        "❌ BŁĄD! <strong>Pijawki niosą ryzyko zakażeń bakteryjnych i krwawień.</strong>"
      ]
    },
    {
      title: "Krok 7: Zespół Trousseau – Wędrujące zapalenie żył (Thrombophlebitis migrans)",
      text: "Lekarz naczyniowy przypomina rezydentom o onkologicznej czujności przy zakrzepicy powierzchownej. Czym jest wędrujące zapalenie żył powierzchownych (Thrombophlebitis migrans / objaw Trousseau) i na jaki proces nowotworowy może wskazywać?",
      options: [
        "Nawracające, 'wędrujące' epizody zakrzepowego zapalenia żył powierzchownych w różnych, nietypowych lokalizacjach (np. kończyny górne, tułów) bez żylaków; jest klasycznym zespołem paraneoplastycznym zwiastującym raka trzustki, żołądka lub płuca (zespół Trousseau)",
        "Jest to łagodne powikłanie po ukąszeniu komara",
        "Oznacza wrodzony brak zastawek w żyłach powierzchownych",
        "Jest to objaw ostrej niedoczynności przytarczyc"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Objaw Trousseau (Thrombophlebitis migrans) to klasyczny zespół paraneoplastyczny opisany przez Armanda Trousseau (który sam u siebie zdiagnozował w ten sposób raka trzustki).</strong> Charakteryzuje się pojawianiem się ognisk zakrzepicy żył powierzchownych w nietypowych miejscach (kończyny górne, klatka piersiowa, brzuch) u pacjentów bez wcześniejszych żylaków, które ustępują w jednym miejscu i pojawiają się w innym. Wynika z produkcji przez komórki nowotworowe mucyn i czynnika tkankowego aktywującego krzepnięcie. Najczęściej towarzyszy <strong>rakowi trzustki, rakowi żołądka i gruczolakorakowi płuca</strong>. Drugą rzadką przyczyną wędrującego zapalenia żył jest choroba Buergera (zakrzepowo-zarostowe zapalenie naczyń u młodych palaczy).",
        "❌ BŁĄD! <strong>To stan alarmowy w onkologii, a nie ukąszenie owada.</strong>",
        "❌ BŁĄD! <strong>To zespół paranowotworowy z nabytej nadkrzepliwości.</strong>",
        "❌ BŁĄD! <strong>Objaw Trousseau tężyczkowy (ręka położnika) dotyczy hipokalcemii, natomiast zespół Trousseau naczyniowy dotyczy zakrzepicy w raku trzustki.</strong>"
      ]
    },
    {
      title: "Krok 8: Długofalowe postępowanie flebologiczne i profilaktyka wtórna",
      text: "U pacjentki wykluczono proces nowotworowy i zakończono ostry epizod zakrzepicy. Jakie definitywne postępowanie lecznicze należy zaplanować po ustąpieniu ostrego stanu zapalnego, aby trwale zapobiec nawrotom SVT?",
      options: [
        "Trwałe odstawienie doustnej antykoncepcji hormonalnej oraz planowa likwidacja niewydolnego pnia żyły odpiszczelowej (termoablacja wewnątrznaczyniowa EVLT/RFA lub klasyczny stripping metodą Babcocka z miniflebektomią żylaków)",
        "Codzienne picie 5 litrów soku z buraków bez ingerencji zabiegowej",
        "Dożywotnie unieruchomienie kończyny w ortezie sztywnej",
        "Zalecenie rezygnacji z zawodu fryzjerki i leżenie w łóżku"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Kompleksowe, definitywne postępowanie po wygaszeniu ostrej zakrzepicy żyły odpiszczelowej (zwykle po 6-12 tygodniach od epizodu):</strong><br>1. <strong>Trwała eliminacja czynników prozakrzepowych:</strong> natychmiastowe odstawienie doustnej antykoncepcji hormonalnej (zamiana na metody niehormonalne lub wkładkę wewnątrzmaciczną levonorgestrel).<br>2. <strong>Zabiegowe usunięcie przyczyny (niewydolności pnia żylnego):</strong> żylakowato zmieniony, niewydolny pień żyły odpiszczelowej stwarza stałe ryzyko nawrotu zakrzepicy. Standardem jest <strong>małoinwazyjna termoablacja wewnątrznaczyniowa (laserowa EVLT lub falami radiowymi RFA)</strong> LUB klasyczna operacja podwiązania ujścia i usunięcia pnia (crossektomia i stripping metodą Babcocka) w połączeniu z miniflebektomią żylaków siatkowatych.",
        "❌ BŁĄD! <strong>Dieta nie usuwa anatomicznej niewydolności zastawek żylnych.</strong>",
        "❌ BŁĄD! <strong>Unieruchomienie w ortezie nasila zastój żylny.</strong>",
        "❌ BŁĄD! <strong>Współczesna medycyna naczyniowa leczy żylaki zabiegowo, pozwalając pacjentom normalnie pracować w pończochach uciskowych.</strong>"
      ]
    }
  ],
  pathoNodes: [
    {
      badge: "Zastój w żylaku",
      title: "Niewydolność zastawek i mikrouraz śródbłonka",
      short: "Zaleganie krwi w poszerzonym pniu żyły odpiszczelowej (GSV)",
      detail: "Praca stojąca i refluks żylny generują wysokie ciśnienie hydrostatyczne. Poszerzenie światła żyły uszkadza glikokaliks śródbłonka, co przy mikrourazie i działaniu estrogenów uruchamia kaskadę hemostazy.",
      target: "Ściana i światło pnia żyły odpiszczelowej",
      drugTarget: "<span class='dose-pill'>Pończochy uciskowe II klasy</span> redukcja zastoju żylnego"
    },
    {
      badge: "Zapalenie okołonaczyniowe",
      title: "Aseptyczny naciek zapalny i bolesny powrózek",
      short: "Naciek leukocytarny ściany żyły i tkanki podskórnej",
      detail: "Proces zakrzepowy wyzwala silną reakcję zapalną z udziałem cytokin (IL-1, TNF-alpha), która penetruje przydankę i obejmuje tkankę tłuszczową podskórną, dając bolesny rumień i stwardnienie wzdłuż naczynia.",
      target: "Przydanka żyły i tkanka podskórna uda",
      drugTarget: "<span class='dose-pill'>Diklofenak żel miejscowo</span> lub <span class='dose-pill'>okłady chłodzące</span>"
    },
    {
      badge: "Bliskość ujścia SFJ",
      title: "Ryzyko propagacji do układu głębokiego (<3 cm)",
      short: "Groźba wypłynięcia skrzepliny do żyły udowej wspólnej (CFV)",
      detail: "Gdy czoło skrzepliny przekroczy granicę 3 cm od spływu odpiszczelowo-udowego, dochodzi do bezpośredniego kontaktu z szybkim prądem krwi w żyle udowej, co stwarza skrajne ryzyko urwania zatoru płucnego.",
      target: "Ujście odpiszczelowo-udowe (Sapheno-Femoral Junction)",
      drugTarget: "<span class='dose-pill'>Pełna dawka terapeutyczna DOAC / LMWH</span> przy odległości <3 cm"
    },
    {
      badge: "Celowana antykoagulacja",
      title: "Selektywna inhibicja czynnika Xa (CALISTO / SURPRISE)",
      short: "Hamowanie generacji trombiny i progresji zakrzepu",
      detail: "Fondaparynuks w dawce 2,5 mg/d lub rywaroksaban 10 mg/d przez 45 dni bezpiecznie wygaszają aktywność trombiny, zapobiegając zatorowości płucnej i nawrotom przy minimalnym ryzyku krwawień.",
      target: "Czynnik krzepnięcia Xa",
      drugTarget: "<span class='dose-pill'>Fondaparynuks 2,5 mg s.c. raz/d</span> lub <span class='dose-pill'>Rywaroksaban 10 mg p.o. raz/d</span> przez 45 dni"
    }
  ],
  diffTable: {
    title: "⚔️ Tabela Różnicowa: SVT vs DVT vs Róża vs Zapalenie naczyń chłonnych",
    headers: ["Cecha kliniczna", "Zakrzepica żył powierzchownych (SVT)", "Zakrzepica żył głębokich (DVT)", "Róża (Erysipelas)", "Zapalenie naczyń chłonnych (Lymphangitis)", "Rumień guzowaty (Erythema nodosum)"],
    rows: [
      ["Lokalizacja i charakter zmian", "Bolesny, twardy, obrzęknięty 'powrózek' dokładnie w rzucie żyły powierzchownej (GSV/SSV)", "Rozlany, ciastowaty obrzęk całego podudzia/uda; brak widocznego powrózka na skórze", "Płytowy, lśniący, żywoczerwony rumień z ostrymi brzegami i wypustkami ('języki ognia')", "Czerwone, wąskie, nieregularne pręgi biegnące ku regionalnym węzłom chłonnym", "Bolesne, żywoczerwone lub sine, płasko-wyniosłe guzy na przedniej powierzchni goleni"],
      ["Obraz w badaniu USG", "Brak kompresji żyły odpiszczelowej/odstrzałkowej; żyły głębokie drożne (w 75-80%)", "Brak kompresji żył głębokich (udowej, podkolanowej); poszerzenie światła żyły głębokiej", "Układ żylny głęboki i powierzchowny w pełni drożny; obrzęk skóry właściwej", "Układ żylny w pełni drożny; powiększenie i obrzęk węzłów chłonnych pachwinowych", "Naczynia żylne w pełni drożne; zapalenie tkanki tłuszczowej podskórnej (panniculitis)"],
      ["Gorączka i objawy ogólne", "Brak gorączki lub stan podgorączkowy (do 37,5°C); stan ogólny dobry", "Stany podgorączkowe; rzadko wysoka gorączka (chyba że zawał płuca)", "Gwałtowny początek z dreszczami, wysoka gorączka (>38,5-40°C), ciężka toksemia", "Gorączka, dreszcze, złe samopoczucie; powiększone bolesne węzły pachwinowe", "Stany podgorączkowe, bóle stawów, często objawy infekcji paciorkowcowej lub sarkoidozy"],
      ["Parametry zapalne (CRP/WBC)", "CRP nieznacznie podwyższone (10-30 mg/l); leukocytoza prawidłowa lub graniczna", "CRP umiarkowanie podwyższone; leukocytoza prawidłowa", "Potężna leukocytoza z neutrofilią (>15-20 G/l), CRP masywnie podwyższone (>100-200 mg/l)", "Wyraźna leukocytoza i wysokie stężenie CRP", "Umiarkowanie podwyższone OB i CRP"],
      ["Wrota zakażenia bakteryjnego", "Brak wrót zakażenia; proces pierwotnie jałowy naczyniowy", "Brak wrót bakteryjnych", "Obecne wrota: pęknięcia naskórka, grzybica międzypalcowa stóp, owrzodzenie", "Obecne ognisko pierwotne (np. zakażona rana stopy, zanokcica)", "Brak miejscowych wrót; choroba immunologiczna"],
      ["Leczenie pierwszego rzutu", "Fondaparynuks 2,5 mg s.c. (lub rywaroksaban 10 mg p.o.) przez 45 dni + kompresja", "Pełna terapeutyczna antykoagulacja (DOAC: apiksaban / rywaroksaban)", "Antybiotykoterapia systemowa celowana w paciorkowce (Penicylina krystaliczna / Amoksycylina)", "Antybiotykoterapia systemowa i zaopatrzenie ogniska pierwotnego", "Leczenie choroby podstawowej (NLPZ, jodek potasu; GKS w sarkoidozie)"]
    ]
  },
  dutySummary: {
    overview: "Zakrzepowe zapalenie żył powierzchownych (SVT – Superficial Vein Thrombosis) jest powszechną chorobą naczyń żylnych, występującą najczęściej w obrębie żylaków żyły odpiszczelowej (GSV). Dawniej traktowane jako choroba łagodna, obecnie jest uznawane za postać żylnej choroby zakrzepowo-zatorowej (ŻChZZ) ze względu na 20-25% ryzyko współistnienia DVT oraz groźbę zatorowości płucnej w przypadku propagacji skrzepliny w kierunku ujścia odpiszczelowo-udowego (SFJ).",
    diagnostics: "1. Ocena kliniczna: obecność bolesnego, stwardniałego powrózka naczyniowego z rumieniem skóry w rzucie żyły powierzchownej.<br>2. Obowiązkowe USG Duplex Doppler obu kończyn dolnych u każdego chorego z SVT (wykluczenie współistniejącej niemej DVT oraz ocena dokładnej odległości czoła skrzepliny od ujścia SFJ/SPJ).<br>3. Zastosowanie 'Zasady 3 cm': skrzeplina dochodząca na odległość <3 cm od ujścia żyły udowej traktowana jest jak proksymalna DVT.<br>4. Oznaczenie parametrów nerkowych i koagulogramu przed wdrożeniem antykoagulacji.<br>5. Wykluczenie zespołu paraneoplastycznego (objaw Trousseau / thrombophlebitis migrans) w przypadku zakrzepic wędrujących lub w naczyniach niezmienionych żylakowato.",
    drugsAndDoses: "1. W przypadku odległości skrzepliny <3 cm od ujścia SFJ/SPJ – pełna dawka terapeutyczna przez min. 3 miesiące:<br>   - <span class='dose-pill'>Apiksaban 10 mg p.o. 2x/d przez 7 dni</span>, następnie <span class='dose-pill'>5 mg p.o. 2x/d</span> LUB<br>   - <span class='dose-pill'>Enoksaparyna 1 mg/kg s.c. co 12 h</span>.<br>2. W przypadku izolowanego SVT o długości >=5 cm i odległości >3 cm od ujścia SFJ (badanie CALISTO / SURPRISE):<br>   - <span class='dose-pill'>Fondaparynuks 2,5 mg s.c. raz/dobę przez 45 dni</span> (lek z wyboru, klasa I A) LUB<br>   - <span class='dose-pill'>Rywaroksaban 10 mg p.o. raz/dobę przez 45 dni</span>.<br>3. Miejscowe leczenie przeciwzapalne i przeciwbólowe:<br>   - <span class='dose-pill'>Diklofenak żel miejscowo 3-4x/dobę</span> lub <span class='dose-pill'>Heparyna żel 1000 j.m./g</span>.<br>   - Analgezja doustna: <span class='dose-pill'>Paracetamol 1000 mg p.o. co 6-8 h</span>.<br>4. <span class='dose-pill'>Bezwzględne odstawienie doustnej antykoncepcji hormonalnej</span> lub HTZ.",
    procedures: "1. Natychmiastowa kompresjoterapia: zastosowanie podkolanówek lub pończoch uciskowych II klasy kompresji (23-32 mmHg) – zmniejsza ból i wspomaga przepływ żylny.<br>2. Wczesna i pełna mobilizacja: bezwzględne zalecenie chodzenia (unikanie bezruchu i leżenia w łóżku).<br>3. Chłodne okłady miejscowe na obszar zapalenia (zakaz gorących kąpieli i masażu!).<br>4. Crossektomia w trybie pilnym (chirurgiczne podwiązanie ujścia żyły odpiszczelowej w pachwinie): zarezerwowana wyłącznie dla sytuacji, gdy skrzeplina penetruje do SFJ, a pacjent ma bezwzględne przeciwwskazania do leczenia przeciwkrzepliwego.<br>5. Planowa operacja żylaków (termoablacja laserowa EVLT lub stripping Babcocka) po wygaszeniu ostrego epizodu zakrzepicy (po 6-12 tygodniach).",
    monitoring: "1. Kontrolne badanie USG Duplex Doppler po 5-7 dniach od wdrożenia leczenia celem oceny stabilności czoła skrzepliny i wykluczenia propagacji do żył głębokich.<br>2. Obserwacja pod kątem objawów zatorowości płucnej (duszność, kaszel, ból klatki piersiowej).<br>3. Monitorowanie tolerancji leczenia przeciwkrzepliwego (brak powikłań krwotocznych).<br>4. Planowanie kompleksowej diagnostyki onkologicznej w razie atypowego przebiegu zakrzepicy."
  },
  lekQuestions: [
    {
      question: "Zgodnie z wytycznymi Europejskiego Towarzystwa Chirurgii Naczyniowej (ESVS), jeśli skrzeplina w zakrzepowym zapaleniu żyły odpiszczelowej (SVT) zbliża się do ujścia odpiszczelowo-udowego (SFJ) na odległość mniejszą niż 3 cm, właściwym postępowaniem jest:",
      options: [
        "Wdrożenie pełnej terapeutycznej dawki antykoagulacji (tak jak w zakrzepicy żył głębokich – DVT) przez okres co najmniej 3 miesięcy",
        "Stosowanie wyłącznie maści z wyciągiem z kasztanowca i okładów z kwasu bornego",
        "Zalecenie całkowitego bezruchu w łóżku przez 30 dni bez podawania leków",
        "Podanie profilaktycznej dawki aspiryny (75 mg raz na dobę) przez 7 dni",
        "Wykonanie pilnego nakłucia lędźwiowego"
      ],
      correct: 0,
      expl: "Zgodnie z wytycznymi ESVS i CHEST, zakrzepica żyły powierzchownej (GSV lub SSV) dochodząca na odległość <3 cm od połączenia z układem głębokim (SFJ lub SPJ) stwarza skrajne ryzyko zatorowości płucnej i jest traktowana oraz leczona dokładnie tak samo jak proksymalna zakrzepica żył głębokich (DVT) – czyli pełną dawką terapeutyczną leków przeciwkrzepliwych przez co najmniej 3 miesiące."
    },
    {
      question: "U pacjenta z ostrym zakrzepowym zapaleniem żyły odpiszczelowej o długości odcinka >= 5 cm, położonym w bezpiecznej odległości (> 3 cm) od ujścia odpiszczelowo-udowego, lekiem z wyboru o udowodnionej najwyższej skuteczności (badanie CALISTO) jest:",
      options: [
        "Fondaparynuks w dawce 2,5 mg podskórnie raz na dobę przez 45 dni",
        "Warfaryna w dawce nasycającej 20 mg przez 2 dni",
        "Enoksaparyna w dawce 1 mg/kg dwa razy na dobę przez 6 miesięcy",
        "Kwas acetylosalicylowy w dawce 300 mg na dobę przez 14 dni",
        "Cyprofloksacyna w dawce 500 mg doustnie przez 10 dni"
      ],
      correct: 0,
      expl: "W badaniu CALISTO udowodniono, że fondaparynuks podawany podskórnie w stałej dawce 2,5 mg raz na dobę przez 45 dni redukuje ryzyko zatorowości płucnej, DVT i progresji zakrzepicy o 85% w porównaniu z placebo u chorych z izolowanym SVT o długości >=5 cm oddalonym o >3 cm od SFJ. Jest to terapia rekomendowana z najwyższą klasą zaleceń (I A)."
    },
    {
      question: "Dlaczego u każdego pacjenta z klinicznym podejrzeniem zakrzepowego zapalenia żył powierzchownych (SVT) konieczne jest wykonanie badania ultrasonograficznego Duplex Doppler obu kończyn dolnych?",
      options: [
        "Ponieważ u około 20-25% chorych z klinicznym SVT współistnieje niema klinicznie zakrzepica żył głębokich (DVT), a granica skrzepliny w naczyniu sięga zwykle wyżej niż widoczny rumień skóry",
        "W celu pomiaru długości kości udowej",
        "Badanie USG wykonuje się wyłącznie w celu kwalifikacji do amputacji",
        "USG jest wymagane tylko u pacjentów z temperaturą ciała powyżej 40°C",
        "Jest to wymóg wyłącznie statystyczny niemający wpływu na postępowanie lecznicze"
      ],
      correct: 0,
      expl: "Kliniczne badanie fizykalne rażąco nie doszacowuje zasięgu zakrzepicy – w USG skrzeplina sięga średnio o 5-10 cm wyżej niż rumień na skórze. Co więcej, u 20-25% pacjentów z SVT współistnieje nierozpoznana, niema zakrzepica żył głębokich (DVT), co całkowicie zmienia postępowanie terapeutyczne."
    },
    {
      question: "Objaw Trousseau (Thrombophlebitis migrans – wędrujące zakrzepowe zapalenie żył powierzchownych) jest klasycznym zespołem paraneoplastycznym najczęściej towarzyszącym:",
      options: [
        "Rakowi trzustki, rakowi żołądka lub gruczolakorakowi płuca",
        "Białaczce limfoblastycznej u dzieci",
        "Łagodnemu gruczolakowi kory nadnerczy",
        "Chorobie Hashimoto",
        "Torbieli prostej nerki"
      ],
      correct: 0,
      expl: "Zespół Trousseau (thrombophlebitis migrans) to wędrujące zakrzepowe zapalenie żył powierzchownych, pojawiające się w nietypowych lokalizacjach (kończyny górne, tułów) i nawracające w różnych miejscach. Jest klasycznym objawem paranowotworowym nabytej nadkrzepliwości, związanym najczęściej z rakiem trzustki (zwłaszcza trzonu i ogona), rakiem żołądka i innymi gruczolakorakami przewodu pokarmowego."
    },
    {
      question: "Który doustny bezpośredni antykoagulant (DOAC) został przebadany w badaniu klinicznym SURPRISE i uznany za bezpieczną, skuteczną alternatywę dla podskórnego fondaparynuksu w leczeniu izolowanego SVT?",
      options: [
        "Rywaroksaban w dawce 10 mg doustnie raz na dobę przez 45 dni",
        "Apiksaban w dawce 20 mg 4 razy na dobę",
        "Dabigatran w dawce 75 mg raz na tydzień",
        "Edoksaban w dawce 120 mg dwa razy na dobę",
        "Żaden lek doustny nie może być stosowany w zakrzepicy powierzchownej"
      ],
      correct: 0,
      expl: "Badanie kliniczne SURPRISE wykazało równoważność (non-inferiority) doustnego rywaroksabanu w małej dawce 10 mg raz na dobę przez 45 dni w porównaniu z podskórnym fondaparynuksem 2,5 mg/d w zapobieganiu powikłaniom zakrzepowo-zatorowym u chorych z izolowanym SVT wysokiego ryzyka."
    },
    {
      question: "Wskaż prawidłowe zalecenie dotyczące aktywności fizycznej i kompresjoterapii u chorego z ostrym zakrzepowym zapaleniem żyły odpiszczelowej:",
      options: [
        "Stosowanie pończoch uciskowych (II klasa kompresji) oraz wczesna mobilizacja i regularne chodzenie (brak wskazań do leżenia w łóżku)",
        "Ścisłe leżenie w łóżku plackiem przez 14 dni",
        "Gorące kąpiele w wannie połączone z energicznym masażem bolącej żyły",
        "Bezwzględny zakaz noszenia jakichkolwiek wyrobów uciskowych",
        "Unieruchomienie kończyny w gipsie syntetycznym"
      ],
      correct: 0,
      expl: "W zakrzepicy żył powierzchownych kluczowe znaczenie ma wczesna mobilizacja – chodzenie aktywuje pompę mięśniową i przyspiesza przepływ krwi. Stopniowana kompresjoterapia (pończochy lub podkolanówki II klasy ucisku) redukuje ból, przyspiesza wchłanianie stanu zapalnego i wspomaga drenaż żylny. Leżenie w łóżku jest błędem."
    },
    {
      question: "Zastosowanie antybiotykoterapii ogólnej w niepowikłanym zakrzepowym zapaleniu żył powierzchownych (SVT):",
      options: [
        "Jest nieuzasadnione i niewskazane, ponieważ proces zapalny ma charakter pierwotnie jałowy (zakrzepowo-naczyniowy)",
        "Jest bezwzględnym standardem u każdego pacjenta przez minimum 3 tygodnie",
        "Wymaga dożylnego podania wankomycyny w warunkach OIT",
        "Zastępuje konieczność stosowania leków przeciwkrzepliwych",
        "Musi być skojarzone ze szczepieniem przeciw tężcowi"
      ],
      correct: 0,
      expl: "SVT jest pierwotnie jałowym procesem zakrzepowo-zapalnym ściany naczynia i tkanek okołonaczyniowych. Mimo obecności zaczerwienienia, obrzęku i wzmożonego ucieplenia skóry, w naczyniu nie ma bakterii. Rutynowe stosowanie antybiotyków jest błędem w sztuce; antybiotykoterapię wdraża się jedynie w przypadku rzadkiego septycznego (ropnego) zapalenia żyły (np. powikłanie cewnika naczyniowego)."
    },
    {
      question: "Kiedy w ostrym zakrzepowym zapaleniu żyły odpiszczelowej może być rozważana pilna interwencja chirurgiczna (crossektomia – podwiązanie ujścia SFJ)?",
      options: [
        "Gdy skrzeplina penetruje do żyły udowej wspólnej (SFJ), a u pacjenta występują bezwzględne przeciwwskazania do leczenia przeciwkrzepliwego",
        "U każdego chorego z żylakami niezależnie od stopnia zaawansowania",
        "Wyłącznie u kobiet w pierwszym trymestrze ciąży",
        "W przypadku współistnienia cukrzycy typu 2",
        "Crossektomia jest zabiegiem historycznym i nie wolno jej wykonywać"
      ],
      correct: 0,
      expl: "Pilna crossektomia (podwiązanie i przecięcie żyły odpiszczelowej w miejscu jej ujścia do żyły udowej wspólnej w pachwinie) jest procedurą ratunkową zarezerwowaną wyłącznie dla sytuacji, gdy skrzeplina propaguje ku ujściu SFJ, a pacjent ma bezwzględne przeciwwskazania do antykoagulacji (np. aktywny krwotok śródczaszkowy) lub gdy zakrzepica postępuje mimo prawidłowego leczenia przeciwkrzepliwego."
    },
    {
      question: "Który z poniższych czynników jest najczęstszą przyczyną wyzwalającą zakrzepowe zapalenie żył powierzchownych kończyn dolnych?",
      options: [
        "Obecność przewlekłej niewydolności żylnej i żylaków kończyn dolnych (>70-80% przypadków)",
        "Niedokrwistość z niedoboru żelaza",
        "Wrzodziejące zapalenie jelita grubego w remisji",
        "Spożywanie nadmiernej ilości kawy",
        "Zwyrodnienie plamki żółtej (AMD)"
      ],
      correct: 0,
      expl: "Ponad 70-80% wszystkich przypadków SVT rozwija się na podłożu żylakowato zmienionych żył powierzchownych (głównie pnia i dopływów żyły odpiszczelowej). Zastój krwi w poszerzonych, krętych naczyniach żylakowych w połączeniu z mikrourazami i dysfunkcją śródbłonka jest najczęstszą przyczyną tej choroby."
    },
    {
      question: "Co należy zalecić kobiecie przyjmującej złożoną antykoncepcję hormonalną, u której wystąpił incydent zakrzepowego zapalenia żył powierzchownych?",
      options: [
        "Natychmiastowe i trwałe odstawienie antykoncepcji hormonalnej i zamianę na metody niehormonalne",
        "Kontynuację antykoncepcji bez zmian",
        "Zwiększenie dawki estrogenów celem ochrony naczyń",
        "Zamianę tabletek na zastrzyki domięśniowe z progesteronu w podwójnej dawce",
        "Stosowanie antykoncepcji co drugi dzień"
      ],
      correct: 0,
      expl: "Epizod żylnej choroby zakrzepowo-zatorowej (w tym potwierdzone zakrzepowe zapalenie żył powierzchownych) stanowi bezwzględne przeciwwskazanie (kategoria 4 wg kryteriów WHO) do stosowania złożonych hormonalnych środków antykoncepcyjnych. Preparat należy natychmiast odstawić i zastosować metody niehormonalne."
    },
    {
      question: "Zapalenie żył powierzchownych u młodego mężczyzny, nałogowego palacza tytoniu, z towarzyszącym sinieniem palców rąk i stóp (objaw Raynauda) i chromaniem stopy, powinno nasunąć podejrzenie:",
      options: [
        "Choroby Buergera (zakrzepowo-zarostowego zapalenia naczyń)",
        "Stwardnienia zanikowego bocznego (SLA)",
        "Choroby Wilsona",
        "Zespołu jelita drażliwego",
        "Rzeżączkowego zapalenia stawów"
      ],
      feedback: "",
      correct: 0,
      expl: "Choroba Buergera (thromboangiitis obliterans) to zapalna, niezwiązana z miażdżycą choroba małych i średnich tętnic oraz żył kończyn, występująca niemal wyłącznie u młodych palaczy tytoniu (<45 r.ż.). Nawracające zakrzepowe zapalenie żył powierzchownych (SVT) w połączeniu z objawem Raynauda i niedokrwieniem palców jest jej klasyczną manifestacją kliniczną."
    }
  ],
  flashcards: [
    {
      front: "Co to jest SVT i jakie jest jego najczęstsze podłoże?",
      back: "Zakrzepowe zapalenie żył powierzchownych. W >70-80% dotyczy żylakowato zmienionej żyły odpiszczelowej (GSV). Objawia się bolesnym, stwardniałym powrózkiem naczyniowym z rumieniem skóry."
    },
    {
      front: "Dlaczego USG Duplex Doppler jest obowiązkowe u każdego chorego z SVT?",
      back: "U 20-25% chorych z klinicznym SVT współistnieje niema zakrzepica żył głębokich (DVT), a czoło skrzepliny w USG sięga średnio o 5-10 cm wyżej niż widoczny rumień skóry."
    },
    {
      front: "Jak brzmi 'Zasada 3 cm' od ujścia SFJ/SPJ w SVT?",
      back: "Jeśli skrzeplina sięga na odległość <3 cm od ujścia do układu głębokiego (SFJ/SPJ), stan ten leczy się jak proksymalną DVT – pełną terapeutyczną dawką antykoagulacji przez min. 3 miesiące."
    },
    {
      front: "Jak leczy się izolowane SVT o dł. >=5 cm i odległości >3 cm od ujścia (badanie CALISTO)?",
      back: "Fondaparynuks w dawce 2,5 mg s.c. raz/dobę przez 45 dni (standard z wyboru, klasa I A) LUB doustny rywaroksaban 10 mg p.o. raz/dobę przez 45 dni (badanie SURPRISE)."
    },
    {
      front: "Czy w niepowikłanym SVT stosuje się antybiotyki?",
      back: "Nie! SVT to jałowy proces zakrzepowo-zapalny naczynia, a nie infekcja bakteryjna. Antybiotyki są nieskuteczne i niewskazane (wyjątek: ropne zapalenie powikłane wenflonem)."
    },
    {
      front: "Czym jest objaw Trousseau (Thrombophlebitis migrans)?",
      back: "Wędrujące zakrzepowe zapalenie żył powierzchownych w nietypowych miejscach bez żylaków. Jest zespołem paraneoplastycznym zwiastującym raka trzustki, żołądka lub płuca."
    }
  ]
};

async function run() {
  console.log("Generating Case 145: Zakrzepowe zapalenie żył powierzchownych (SVT)...");
  
  // Mirroring
  case145.steps.forEach(s => {
    s.question = s.title;
    s.explanation = s.feedback ? s.feedback[0] : "";
  });
  
  case145.lekQuestions.forEach(q => {
    q.opts = q.options;
    q.correctIdx = q.correct;
    q.exp = q.expl;
  });
  
  const enc = await encryptStringAes(JSON.stringify(case145, null, 2), MASTER_KEY);
  fs.writeFileSync(path.join('cases', '145_zakrzepowe_zapalenie_zyl_powierzchownych_svt.json'), JSON.stringify(enc, null, 2), 'utf8');
  console.log("[SAVED] Case #145: 145_zakrzepowe_zapalenie_zyl_powierzchownych_svt.json (LEK Qs: " + case145.lekQuestions.length + ", Steps: " + case145.steps.length + ", Flashcards: " + case145.flashcards.length + ")");
}

run();

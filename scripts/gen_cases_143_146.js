const fs = require('fs');
const { encryptStringAes } = require('./encrypt_case.js');
const PASSWORD = '@LEKSzymon28111999';

const cases = [
  // 143: Objawowe zwężenie tętnicy szyjnej
  {
    id: 143,
    filename: "143_objawowe_zwezenie_tetnicy_szyjnej.json",
    dept: "Chirurgia",
    shortTitle: "68-letni palacz po przemijającym niedowładzie i ślepocie jednoocznej (Amaurosis fugax) – Szmer nad tętnicą szyjną i krytyczne zwężenie 85% ICA (NASCET)",
    diagnosisTitle: "Objawowe ciasne zwężenie prawej tętnicy szyjnej wewnętrznej (Stenosis arteriae carotis internae dextrae 85% wg NASCET) po przebytym TIA",
    vitals: [
      { label: "HR", val: "76/min", sub: "Miarowy", status: "ok" },
      { label: "BP", val: "158/90 mmHg", sub: "Podwyższone ciśnienie skurczowe", status: "warn" },
      { label: "SpO2", val: "98%", sub: "Prawidłowa", status: "ok" },
      { label: "RR", val: "15/min", sub: "Prawidłowy", status: "ok" },
      { label: "Temp", val: "36.6°C", sub: "Prawidłowa", status: "ok" }
    ],
    vitalsObj: { hr: 76, bp: "158/90", spo2: 98, rr: 15, temp: 36.6 },
    story: "68-letni mężczyzna z wieloletnim wywiadem nadciśnienia tętniczego, palenia tytoniu i hipercholesterolemii zgłasza się na SOR z powodu dwóch niepokojących incydentów neurologicznych. Trzy dni temu doznał nagłej, bezbolesnej utraty widzenia w prawym oku przypominającej 'zaciągnięcie czarnej kurtyny' (amaurosis fugax), która ustąpiła samoistnie po 8 minutach. Dzisiaj rano wystąpiło przemijające drętwienie i osłabienie siły mięśniowej lewej ręki oraz asymetria kącika ust trwające 20 minut, po czym objawy całkowicie ustąpiły (TIA). W badaniu neurologicznym przy przyjęciu: brak ogniskowych ubytków neurologicznych, NIHSS 0. W badaniu przedmiotowym: osłuchowo obecny głośny, szorstki szmer skurczowy nad prawym trójkątem tętnicy szyjnej na szyi. Tętna obwodowe symetryczne.",
    labs: [
      {
        category: "Badania neuroobrazowe CITO (Głowa)",
        items: [
          { name: "TK głowy bez kontrastu CITO", val: "Brak cech świeżego krwawienia wewnątrzczaszkowego i brak rozległych ognisk niedokrwiennych; drobne naczyniopochodne zmiany leukoencefalopatyczne", norm: "Mózgowie bez zmian ogniskowych", flag: "N" },
          { name: "Angio-TK tętnic łuku aorty i domózgowych", val: "Wysokiego stopnia zwężenie (85% wg kryteriów NASCET) prawej tętnicy szyjnej wewnętrznej (ICA) u jej odejścia z cechami owrzodzenia blaszki miażdżycowej i skrzepliną przyścienną. Lewa ICA zwężona w 40%", norm: "Naczynia drożne, bez istotnych zwężeń", flag: "H" }
        ]
      },
      {
        category: "USG Doppler tętnic szyjnych i kręgowych",
        items: [
          { name: "Szczytowa prędkość skurczowa (PSV) prawa ICA", val: "340 cm/s (norma <125 cm/s; kryterium zwężenia >=70%)", norm: "< 125 cm/s", flag: "H" },
          { name: "Prędkość końcoworozkurczowa (EDV) prawa ICA", val: "135 cm/s (kryterium zwężenia >=70%)", norm: "< 40 cm/s", flag: "H" },
          { name: "Wskaźnik PSV ICA / PSV CCA", val: "4.8 (kryterium zwężenia >=70% to wskaźnik >4.0)", norm: "< 2.0", flag: "H" }
        ]
      },
      {
        category: "Profil lipidowy i parametry biochemiczne",
        items: [
          { name: "Cholesterol LDL", val: "155 mg/dL (bardzo wysokie ryzyko naczyniowe)", norm: "< 55 mg/dL", flag: "H" },
          { name: "Glikemia na czczo", val: "108 mg/dL", norm: "70–99 mg/dL", flag: "warn" },
          { name: "Kreatynina / eGFR", val: "0.95 mg/dL / 78 ml/min", norm: "0.7–1.2 / >60", flag: "N" }
        ]
      }
    ],
    steps: [
      {
        num: 1,
        title: "Definicja i objawy: Amaurosis fugax oraz TIA",
        task: "Co to jest amaurosis fugax (przemijająca ślepota jednooczna) i jaki mechanizm ją wywołuje w zwężeniu tętnicy szyjnej?",
        options: [
          { text: "Przejściowe, bezbolesne niedowidzenie jednooczne wywołane mikrozatorem (skrzeplina lub cholesterol – płytki Hollenhorsta) pochodzącym z blaszki miażdżycowej w tętnicy szyjnej wewnętrznej, blokującym tętnicę środkową siatkówki lub jej gałęzie po tej samej stronie", correct: true, feedback: "Prawidłowo! Tętnica oczna jest pierwszą gałęzią tętnicy szyjnej wewnętrznej (ICA). Mikrozatory z owrzodziałej blaszki miażdżycowej zamykają naczynia siatkówki, powodując nagłe 'zaciągnięcie kurtyny' w oku ipsilateralnym (po tej samej stronie co zwężenie)." },
          { text: "Skurcz mięśni gałki ocznej wywołany niedoborem magnezu", correct: false, feedback: "Brak związku z patofizjologią naczyniową." },
          { text: "Wzrost ciśnienia śródgałkowego w jaskrze zamkniętego kąta", correct: false, feedback: "Jaskra ostra daje silny ból oka, zamglenie, 'tęczowe koła' i twardą gałkę, a nie bezbolesny zator." },
          { text: "Porażenie nerwu bloczkowego", correct: false, feedback: "Nerw bloczkowy odpowiada za ruchy gałki (dwojenie), nie za ślepotę." }
        ]
      },
      {
        num: 2,
        title: "Kwalifikacja do leczenia inwazyjnego wg wytycznych ESVS",
        task: "Jakie jest wskazanie do pilnej operacji chirurgicznej tętnicy szyjnej u pacjenta po niedawnym TIA/amaurosis fugax ze zwężeniem 85% wg NASCET?",
        options: [
          { text: "Pilna endarterektomia szyjna (CEA - Carotid Endarterectomy) zalecana w ciągu pierwszych 14 dni (najlepiej w pierwszych dniach) od wystąpienia objawów neurologicznych", correct: true, feedback: "Prawidłowo! Wytyczne ESVS (European Society for Vascular Surgery) i AHA jednoznacznie wskazują, że u pacjentów objawowych ze zwężeniem 70–99% ryzyko dokonanego, ciężkiego udaru mózgu jest najwyższe w pierwszych 14 dniach. Operacja w tym oknie czasowym ('hot carotid') drastycznie redukuje ryzyko udaru." },
          { text: "Odroczenie zabiegu o minimum 6 miesięcy w celu obserwacji", correct: false, feedback: "Większość udarów dokona się w pierwszych 2-4 tygodniach; zwłoka jest błędem sztuki." },
          { text: "Wyłącznie leczenie pijawkami", correct: false, feedback: "Niedorzeczne." },
          { text: "Natychmiastowe obustronne podwiązanie obu tętnic szyjnych", correct: false, feedback: "Doprowadziłoby do natychmiastowej śmierci mózgowej." }
        ]
      },
      {
        num: 3,
        title: "Wybór metody: CEA (operacja otwarta) vs CAS (stentowanie)",
        task: "Na czym polega endarterektomia szyjna (CEA) i kiedy preferuje się ją w stosunku do stentowania tętnicy szyjnej (CAS)?",
        options: [
          { text: "CEA polega na nacięciu tętnicy szyjnej i chirurgicznym wyłuszczeniu blaszki miażdżycowej wraz ze zmienioną błoną wewnętrzną; jest metodą referencyjną z wyboru u większości chorych, zwłaszcza w wieku >=70 lat, z uwagi na niższe ryzyko okołooperacyjnego udaru niż przy CAS", correct: true, feedback: "Prawidłowo! CEA (Carotid Endarterectomy) pozostaje złotym standardem. CAS (Carotid Artery Stenting) wiąże się u osób starszych i z uwapnionym łukiem aorty z wyższym ryzykiem mikrozatorowości mózgowej podczas manewrowania cewnikami; CAS rezerwuje się dla chorych z 'szyją wrogą' (po naświetlaniach, reoperacji, wysokim podziale tętnicy)." },
          { text: "CEA to wprowadzenie sprężynki bez otwierania szyi", correct: false, feedback: "To opis CAS (stentowania)." },
          { text: "CEA polega na wycięciu całej szyi pacjenta", correct: false, feedback: "Absurd." },
          { text: "CAS jest zawsze jedyną dozwoloną metodą wg prawa unijnego", correct: false, feedback: "Brak takiego przepisu; standardem jest CEA." }
        ]
      },
      {
        num: 4,
        title: "Kryteria NASCET vs ECST",
        task: "Czym różni się metoda pomiaru stopnia zwężenia tętnicy szyjnej wg NASCET od metody ECST?",
        options: [
          { text: "W NASCET średnicę najwęższego miejsca porównuje się ze średnicą prawidłowego naczynia dystalnie do zwężenia; w ECST ze szacowaną pierwotną średnicą naczynia w miejscu opuszki (70% w NASCET odpowiada około 80–85% w ECST)", correct: true, feedback: "Prawidłowo! NASCET (North American Symptomatic Carotid Endarterectomy Trial) mierzy stosunek zwężenia do zdrowego odcinka dystalnego ICA. Jest to standard przyjęty w aktualnych wytycznych naczyniowych na świecie i w pytaniach LEK." },
          { text: "W NASCET mierzy się tylko długość blaszki w milimetrach", correct: false, feedback: "Mierzy się stopień zwężenia światła w procentach." },
          { text: "Metody te są w 100% tożsame matematycznie", correct: false, feedback: "ECST daje wyższe wartości procentowe dla tego samego zwężenia." },
          { text: "NASCET stosuje się wyłącznie u dzieci", correct: false, feedback: "Dotyczy miażdżycy u dorosłych." }
        ]
      },
      {
        num: 5,
        title: "Ryzyko powikłań neurologicznych podczas operacji CEA",
        task: "Jakie nerwy czaszkowe są szczególnie narażone na uszkodzenie jatrogenne podczas operacji endarterektomii tętnicy szyjnej?",
        options: [
          { text: "Nerw podjęzykowy (XII – zbaczanie języka na stronę operowaną), nerw krtaniowy wsteczny/błędny (X – chrypka), gałąź brzeżna żuchwy nerwu twarzowego (VII – asymetria kącika ust)", correct: true, feedback: "Prawidłowo! Nerwy przebiegające w loży naczyniowej szyi: n. podjęzykowy (XII - zbaczanie języka w stronę uszkodzenia), n. błędny/krtaniowy (chrypka) oraz gałąź brzeżna n. VII (opadanie kącika wargi). Zgłaszanie tych objawów po zabiegu wymaga dokładnej kontroli laryngologicznej/neurologicznej." },
          { text: "Nerw węchowy (I) i wzrokowy (II)", correct: false, feedback: "Leżą wewnątrzczaszkowo, poza polem operacyjnym szyi." },
          { text: "Nerw kulszowy i udowy", correct: false, feedback: "To nerwy kończyny dolnej." },
          { text: "Nerw okoruchowy (III)", correct: false, feedback: "Leży w jamie czaszki." }
        ]
      },
      {
        num: 6,
        title: "Intensywne leczenie farmakologiczne 'Best Medical Therapy'",
        task: "Jakie leczenie farmakologiczne należy wdrożyć natychmiast u pacjenta ze zwężeniem tętnicy szyjnej po TIA w oczekiwaniu na zabieg CEA?",
        options: [
          { text: "Podwójna terapia przeciwpłytkowa (DAPT: ASA + klopidogrel przez pierwsze 21 dni) oraz silna statyna (np. atorwastatyna 80 mg) z celem LDL <55 mg/dL i optymalizacja ciśnienia tętniczego", correct: true, feedback: "Prawidłowo! Po TIA/drobnym udarze naczyniopochodnym DAPT (kwas acetylosalicylowy z klopidogrelem wg badań CHANCE/POINT) przez 21 dni istotnie zmniejsza ryzyko wczesnego nawrotu udaru. Statyna dodatkowo stabilizuje blaszkę miażdżycową." },
          { text: "Doustna antykoagulacja warfaryną z INR >4.0", correct: false, feedback: "Warfaryna nie ma wskazań w czystym zwężeniu miażdżycowym bez AF i grozi krwawieniem." },
          { text: "Odstawienie wszelkich leków kardiologicznych", correct: false, feedback: "Zwiększa ryzyko zawału i udaru." },
          { text: "Leki uspokajające jako jedyna terapia", correct: false, feedback: "Niewystarczające." }
        ]
      },
      {
        num: 7,
        title: "Groźne powikłanie porewaskularyzacyjne – zespół hiperperfuzji",
        task: "Co to jest zespół hiperperfuzji mózgowej (CHS - Cerebral Hyperperfusion Syndrome) po udrożnieniu tętnicy szyjnej?",
        options: [
          { text: "Gwałtowny wzrost przepływu mózgowego w naczyniach z upośledzoną autoregulacją, objawiający się silnym bólem głowy, wymiotami, napadami padaczkowymi i ryzykiem krwotoku śródmózgowego, wymagający ścisłej kontroli ciśnienia tętniczego", correct: true, feedback: "Prawidłowo! Przewlekle niedokrwione naczynia mózgowe mają maksymalnie rozszerzone łożysko kapilarne i utraconą autoregulację. Po nagłym udrożnieniu i napływie krwi pod wysokim ciśnieniem dochodzi do obrzęku i krwotoku mózgowego. Kluczem jest rygorystyczna kontrola ciśnienia tętniczego po zabiegu (SBP <140 mmHg)." },
          { text: "Nagła utrata włosów na głowie", correct: false, feedback: "Brak związku." },
          { text: "Brak tętna na tętnicach stóp", correct: false, feedback: "Nie dotyczy głowy." },
          { text: "Wytworzenie wola tarczycowego", correct: false, feedback: "To schorzenie endokrynologiczne." }
        ]
      },
      {
        num: 8,
        title: "Postępowanie w bezobjawowym zwężeniu tętnicy szyjnej",
        task: "Jakie jest aktualne podejście do chorych z BEZOBJAWOWYM zwężeniem tętnicy szyjnej wewnętrznej (np. 70–80%)?",
        options: [
          { text: "Podstawą jest nowoczesne, agresywne leczenie zachowawcze (BMT); kwalifikacja do CEA jest rozważana tylko u wybranych pacjentów o przewidywanym przeżyciu >5 lat z cechami blaszki wysokiego ryzyka (np. hipoechogeniczna, owrzodziała, mikrozatory w TCD)", correct: true, feedback: "Prawidłowo! Nowoczesna farmakoterapia (statyny, leki przeciwpłytkowe) obniżyła roczne ryzyko udaru w bezobjawowym zwężeniu do <1%/rok. Dlatego operuje się tylko wyselekcjonowane przypadki o bardzo wysokim ryzyku powikłań zatorowych przy okołooperacyjnym ryzyku powikłań ośrodka <3%." },
          { text: "Każdy pacjent bezobjawowy z jakimkolwiek zwężeniem (np. 30%) musi być natychmiast zoperowany", correct: false, feedback: "Zwężenia <50% nigdy nie wymagają operacji." },
          { text: "Zabieg operacyjny jest w Europie prawnie zakazany", correct: false, feedback: "Nieprawda." },
          { text: "Leczenie zachowawcze jest całkowicie nieskuteczne", correct: false, feedback: "BMT jest fundamentem terapii." }
        ]
      }
    ],
    pathoNodes: [
      { id: "p1", label: "Blaszka miażdżycowa w opuszce ICA", desc: "Turbulentny przepływ w podziale tętnicy szyjnej sprzyja powstawaniu i owrzodzeniu blaszki." },
      { id: "p2", label: "Mikrozatorowość tętniczo-tętnicza", desc: "Fragmenty skrzeplin i kryształy cholesterolu zamykają naczynia siatkówki (amaurosis fugax) lub kory mózgu (TIA)." },
      { id: "p3", label: "Ciasne zwężenie i spadek rezerwy mózgowej", desc: "Zmniejszenie perfuzji półkuli mózgowej i ryzyko udaru hemodynamicznego lub zatorowego." }
    ],
    diffTable: [
      { disease: "Objawowe zwężenie ICA (TIA / Amaurosis fugax)", feature: "Przemijająca ślepota jednooczna ipsilateralna, niedowład kontralateralny, szmer nad tętnicą szyjną, zwężenie >70% w Dopplerze/TK" },
      { disease: "Jaskra z zamkniętym kątem", feature: "Ostry silny ból oka, zamglenie, obrzęk rogówki, twarda gałka oczna, brak szmeru na szyi" },
      { disease: "Napad padaczkowy częściowy", feature: "Objawy ruchowe 'dodatnie' (drgawki, mioklonie), zaburzenia świadomości, zapis EEG" },
      { disease: "Migrena z aurą", feature: "Stopniowe narastanie mroczków migoczących (scintillating scotoma) w ciągu 20-30 min, po czym pulsujący ból głowy" }
    ],
    dutySummary: "Pacjent 68-letni po incydentach TIA i amaurosis fugax w przebiegu 85% objawowego zwężenia prawej tętnicy szyjnej wewnętrznej (NASCET). Zastosowano DAPT (ASA + klopidogrel), atorwastatynę 80 mg i zakwalifikowano pacjenta w trybie pilnym (w oknie <14 dni) do endarterektomii szyjnej (CEA) celem trwałej prewencji dokonanego udaru mózgu.",
    lekQuestions: [
      {
        question: "Przemijająca bezbolesna ślepota jednooczna (amaurosis fugax) występująca u pacjenta z miażdżycą naczyń jest typowym objawem zatorowości pochodzącej z:",
        options: [
          "Tożstronnej tętnicy szyjnej wewnętrznej (ICA)",
          "Przeciwstronnej tętnicy kręgowej",
          "Tętnicy szyjnej zewnętrznej",
          "Tętnicy podstawnej",
          "Żyły szyjnej wewnętrznej"
        ],
        answer: "Tożstronnej tętnicy szyjnej wewnętrznej (ICA)",
        explanation: "Tętnica oczna jest gałęzią tożstronnej tętnicy szyjnej wewnętrznej. Mikrozatory z blaszki miażdżycowej w ICA wędrują bezpośrednio do krążenia siatkówkowego oka po tej samej stronie."
      },
      {
        question: "Zgodnie z wytycznymi naczyniowymi (ESVS), u pacjenta ze świeżym objawowym zwężeniem tętnicy szyjnej wewnętrznej (70–99% NASCET) endarterektomię szyjną (CEA) należy wykonać:",
        options: [
          "Pilnie, optymalnie w ciągu pierwszych 14 dni od wystąpienia objawów",
          "Dopiero po 6 miesiącach rehabilitacji neurologicznej",
          "Tylko w przypadku nawrotu udaru dokonanego",
          "Wyłącznie po ukończeniu 85. roku życia",
          "Nigdy, leczenie zabiegowe jest przeciwwskazane u objawowych chorych"
        ],
        answer: "Pilnie, optymalnie w ciągu pierwszych 14 dni od wystąpienia objawów",
        explanation: "Ryzyko dokonanego udaru mózgu po TIA jest najwyższe w pierwszych dobach i tygodniach. Wykonanie CEA w ciągu 14 dni przynosi największą korzyść kliniczną."
      },
      {
        question: "Uszkodzenie nerwu podjęzykowego (XII) jako powikłanie endarterektomii szyjnej objawia się:",
        options: [
          "Zbaczaniem wysuniętego języka w stronę operowaną",
          "Całkowitym opadaniem powieki (ptoza)",
          "Utratą czucia smaku na tylnej 1/3 języka",
          "Niemożnością zaciśnięcia powiek",
          "Afazją ruchową Broca"
        ],
        answer: "Zbaczaniem wysuniętego języka w stronę operowaną",
        explanation: "Nerw podjęzykowy unerwia mięśnie języka. W przypadku jednostronnego uszkodzenia, język przy wysuwaniu zbacza w stronę uszkodzonego nerwu."
      }
    ],
    flashcards: [
      { front: "Co to jest amaurosis fugax?", back: "Przemijająca, bezbolesna ślepota jednooczna spowodowana mikrozatorem w tętnicy środkowej siatkówki, najczęściej z tożstronnej tętnicy szyjnej wewnętrznej." },
      { front: "Jaki jest optymalny czas wykonania CEA po TIA/udarze?", back: "W ciągu pierwszych 14 dni od wystąpienia objawów neurologicznych (tzw. hot carotid)." },
      { front: "Jakie jest kryterium stopnia zwężenia kwalifikujące objawowego pacjenta do CEA?", back: "Zwężenie 70–99% (wg kryteriów NASCET) daje najwyższą korzyść; przy zwężeniu 50–69% korzyść jest umiarkowana (zwłaszcza u mężczyzn)." },
      { front: "Czym grozi uszkodzenie nerwu podjęzykowego w trakcie CEA?", back: "Zbaczaniem języka na stronę operowaną i trudnościami w artykulacji/połykaniu." },
      { front: "Co to jest zespół hiperperfuzji mózgowej (CHS)?", back: "Gwałtowny wzrost przepływu w naczyniach mózgowych po udrożnieniu ICA, grożący obrzękiem i krwotokiem mózgowym z powodu upośledzonej autoregulacji." }
    ]
  },

  // 144: Proksymalna zakrzepica żył głębokich (DVT)
  {
    id: 144,
    filename: "144_zakrzepica_zyl_glebokich_dvt.json",
    dept: "Chirurgia",
    shortTitle: "42-letnia kobieta po długim locie transatlantyckim i na antykoncepcji – Asymetryczny bolesny obrzęk podudzia i uda, objaw Homansa i wysokie D-dimery",
    diagnosisTitle: "Ostra proksymalna zakrzepica żył głębokich lewej kończyny dolnej (Thrombosis venosa profunda - DVT żyły udowej i podkolanowej)",
    vitals: [
      { label: "HR", val: "84/min", sub: "Miarowy", status: "ok" },
      { label: "BP", val: "125/75 mmHg", sub: "Prawidłowe", status: "ok" },
      { label: "SpO2", val: "99%", sub: "Prawidłowa (brak duszności)", status: "ok" },
      { label: "RR", val: "16/min", sub: "Prawidłowy", status: "ok" },
      { label: "Temp", val: "37.3°C", sub: "Stan podgorączkowy", status: "ok" }
    ],
    vitalsObj: { hr: 84, bp: "125/75", spo2: 99, rr: 16, temp: 37.3 },
    story: "42-letnia kobieta przyjmująca od 4 lat złożoną antykoncepcję hormonalną (estrogenowo-progestagenową), która 3 dni temu wróciła z 11-godzinnego lotu samolotem ze Stanów Zjednoczonych, zgłasza się na SOR z powodu narastającego od wczoraj obrzęku i rozpierającego bólu lewej kończyny dolnej. W badaniu fizykalnym: obwód lewego podudzia mierzony 10 cm poniżej guzowatości kości piszczelowej jest o 3.8 cm większy niż prawego. Kończyna lewa jest ucieplona, ze wzmożonym rysunkiem żył powierzchownych (objaw Pratta). Wyraźna bolesność uciskowa w dole podkolanowym i wzdłuż kanału przywodzicieli. Zgięcie grzbietowe lewej stopy przy wyprostowanym kolanie wywołuje silny ból łydki (objaw Homansa). Nie stwierdza się duszności, bólu w klatce piersiowej ani krwioplucia.",
    labs: [
      {
        category: "Badania biochemiczne i koagulologiczne",
        items: [
          { name: "D-dimer w surowicy (metoda ilościowa)", val: "3850 ug/L (znacznie podwyższony)", norm: "< 500 ug/L", flag: "H" },
          { name: "Morfologia krwi", val: "Hb 13.8 g/dL, PLT 240 G/L, WBC 7.8 G/L", norm: "12.0–16.0 / 150–400 / 4–10", flag: "N" },
          { name: "eGFR / Kreatynina", val: ">90 ml/min / 0.72 mg/dL", norm: ">60 / 0.5–1.1", flag: "N" },
          { name: "Bilirubina / ALT", val: "0.8 mg/dL / 22 IU/L", norm: "< 1.2 / < 35", flag: "N" }
        ]
      },
      {
        category: "Ultrasonograficzny test uciskowy (CUS Doppler)",
        items: [
          { name: "Test kompresyjny żył (Compression Ultrasound - CUS)", val: "Brak podatności na ucisk głowicą (brak zapadania się) żyły udowej powierzchownej i żyły podkolanowej lewej; obecność echogenicznej skrzepliny w świetle naczynia", norm: "Żyły całkowicie podatne na ucisk", flag: "H" },
          { name: "Spektrum przepływu dopplerowskiego", val: "Brak spontanicznego przepływu i brak modulacji oddechowej w żyle udowej wspólnej lewej", norm: "Prawidłowa modulacja oddechowa", flag: "H" },
          { name: "Kończyna prawa (kontrola)", val: "Układ żył głębokich całkowicie drożny i ściśliwy", norm: "Ściśliwe żyły", flag: "N" }
        ]
      },
      {
        category: "Skala Wellsa dla zakrzepicy żył głębokich",
        items: [
          { name: "Punkty wg skali Wellsa", val: "3 punkty (aktywna antykoncepcja + unieruchomienie w locie, asymetria obwodu łydki >3 cm, obrzęk całego podudzia)", norm: "Kategoria: wysokie prawdopodobieństwo DVT (>=2 pkt)", flag: "H" }
        ]
      }
    ],
    steps: [
      {
        num: 1,
        title: "Triada Virchowa i czynniki ryzyka",
        task: "Jakie trzy elementy tworzą triadę Virchowa predysponującą do rozwoju zakrzepicy żylnej?",
        options: [
          { text: "Zastój krwi w naczyniach, uszkodzenie ściany naczynia (śródbłonka) oraz nadkrzepliwość krwi (hiperkoagulacja)", correct: true, feedback: "Prawidłowo! Triada Virchowa: 1) staza żylna (długi lot, bezruch), 2) uszkodzenie śródbłonka (uraz, operacja, zapalenie), 3) nadkrzepliwość (antykoncepcja estrogenowa, trombofilia, nowotwory, ciąża)." },
          { text: "Ból, zaczerwienienie, obrzęk", correct: false, feedback: "To cechy stanu zapalnego (Celsus), nie triada Virchowa." },
          { text: "Hipotonia, tachykardia, bladość", correct: false, feedback: "To objawy wstrząsu." },
          { text: "Trombocytopenia, leukopenia, anemia", correct: false, feedback: "To pancytopenia." }
        ]
      },
      {
        num: 2,
        title: "Ocena prawdopodobieństwa klinicznego – Skala Wellsa",
        task: "Dlaczego u pacjenta z WYSOKIM prawdopodobieństwem klinicznym DVT (skala Wellsa >=2) nie należy opierać wykluczenia zakrzepicy na ujemnym wyniku D-dimerów?",
        options: [
          { text: "Przy wysokim prawdopodobieństwie klinicznym należy od razu wykonać USG test uciskowy (CUS); ujemny D-dimer bezpiecznie wyklucza DVT tylko przy niskim lub pośrednim prawdopodobieństwie", correct: true, feedback: "Prawidłowo! Zgodnie z wytycznymi ESC i PTChir, algorytm diagnostyczny DVT: ujemny D-dimer ma doskonałą wartość predykcyjną ujemną (NPV) TYLKO w grupie niskiego prawdopodobieństwa klinicznego. W grupie wysokiego ryzyka złotym standardem pierwszego rzutu jest USG kompresyjne (CUS)." },
          { text: "D-dimer rośnie tylko po zjedzeniu tłustego posiłku", correct: false, feedback: "Brak związku." },
          { text: "D-dimer jest badaniem inwazyjnym", correct: false, feedback: "To zwykłe pobranie krwi." },
          { text: "Skala Wellsa została wycofana z medycyny", correct: false, feedback: "Skala Wellsa jest powszechnie obowiązującym standardem." }
        ]
      },
      {
        num: 3,
        title: "Złoty standard obrazowania – Test kompresyjny (CUS)",
        task: "Jaki jest podstawowy, rozstrzygający objaw ultrasonograficzny potwierdzający zakrzepicę żył głębokich w teście CUS (Compression Ultrasound)?",
        options: [
          { text: "Brak pełnego zapadania się (ściśliwości) światła żyły pod uciskiem głowicy ultrasonograficznej", correct: true, feedback: "Prawidłowo! Prawidłowa żyła jest cienkościenna i pod lekkim uciskiem głowicy ulega całkowitemu zaciśnięciu (zapadnięciu światła). Obecność skrzepliny w świetle uniemożliwia zapadnięcie się ściany naczynia. Jest to najczulszy i najbardziej swoisty objaw DVT." },
          { text: "Obecność zwapnień w ścianie żyły", correct: false, feedback: "Zwapnienia dotyczą tętnic, nie żył w ostrym DVT." },
          { text: "Pulsowanie ściany żyły w rytm tętna", correct: false, feedback: "Żyły fizjologicznie nie tętnią tętniczo." },
          { text: "Zanik kości piszczelowej w obrazie USG", correct: false, feedback: "Niedorzeczne." }
        ]
      },
      {
        num: 4,
        title: "Wybór leczenia przeciwkrzepliwego pierwszej linii",
        task: "Jaka grupa leków przeciwkrzepliwych jest obecnie lekiem z wyboru (pierwszej linii) w leczeniu zakrzepicy żył głębokich u chorego bez aktywnej choroby nowotworowej i bez niewydolności nerek?",
        options: [
          { text: "Doustne antykoagulanty niebędące antagonistami witaminy K (NOAC / DOAC: rywaroksaban, apiksaban, edoksaban, dabigatran)", correct: true, feedback: "Prawidłowo! Zgodnie z wytycznymi CHEST, ESC i wytycznymi polskimi, NOAC/DOAC są lekami pierwszego rzutu w leczeniu DVT ze względu na jednakową skuteczność co VKA, znacznie mniejsze ryzyko śmiertelnych krwawień wewnątrzczaszkowych, brak konieczności rutynowego monitorowania INR oraz natychmiastowy początek działania." },
          { text: "Aspiryna w małej dawce 75 mg", correct: false, feedback: "Kwas acetylosalicylowy jest nieskuteczny w leczeniu ostrego DVT." },
          { text: "Rutynowa fibrynoliza ogólnoustrojowa streptokinazą u każdego chorego", correct: false, feedback: "Fibrynoliza ogólnoustrojowa wiąże się ze zbyt dużym ryzykiem krwawień i jest zarezerwowana tylko dla zagrażającej utratą kończyny phlegmasia cerulea dolens." },
          { text: "Wyłącznie leki moczopędne", correct: false, feedback: "Leki moczopędne odwadniają i nasilają zakrzepicę." }
        ]
      },
      {
        num: 5,
        title: "Czas trwania leczenia przeciwkrzepliwego",
        task: "Ile powinien trwać minimalny standardowy okres antykoagulacji u tej pacjentki, u której DVT wystąpiła w związku z przemijającym czynnikiem ryzyka (lot + antykoncepcja po jej odstawieniu)?",
        options: [
          { text: "3 miesiące", correct: true, feedback: "Prawidłowo! W przypadku zakrzepicy żył głębokich sprowokowanej przemijającym, odwracalnym czynnikiem ryzyka (major transient risk factor: lot, unieruchomienie, odstawiona antykoncepcja), minimalny zalecany czas leczenia przeciwkrzepliwego wynosi dokładnie 3 miesiące." },
          { text: "5 dni", correct: false, feedback: "5 dni to za krótko – ryzyko nawrotu i zatorowości płucnej byłoby ogromne." },
          { text: "Do końca życia u każdego chorego", correct: false, feedback: "Leczenie bezterminowe rezerwuje się dla niesprowokowanego nawrotowego DVT lub trwałego czynnika ryzyka (np. zespół antyfosfolipidowy, aktywny rak)." },
          { text: "12 lat", correct: false, feedback: "Brak takiego standardu." }
        ]
      },
      {
        num: 6,
        title: "Mobilizacja pacjenta i kompresjoterapia",
        task: "Jakie jest aktualne zalecenie dotyczące aktywności fizycznej chorego z ostrym DVT po wdrożeniu skutecznej antykoagulacji?",
        options: [
          { text: "Wczesne uruchomienie chorego i chodzenie (brak konieczności leżenia w łóżku) w połączeniu z kompresjoterapią (pończochy lub podkolanówki o stopniowanym ucisku II klasy)", correct: true, feedback: "Prawidłowo! Dawny mit o konieczności wielodniowego leżenia w obawie przed 'urwaniem skrzepliny' został obalony. Wczesne uruchomienie po wdrożeniu leków przeciwkrzepliwych aktywuje pompę mięśniową łydki, przyspiesza ustępowanie obrzęku i zmniejsza ryzyko zespołu pozakrzepowego (PTS)." },
          { text: "Ścisłe leżenie plackiem w łóżku przez 4 tygodnie bez ruchu stopą", correct: false, feedback: "Przestarzałe i szkodliwe zalecenie sprzyjające zastojowi krwi." },
          { text: "Gipsowe unieruchomienie całej kończyny", correct: false, feedback: "Absolutnie przeciwwskazane." },
          { text: "Skakanie na jednej chorej nodze bez leków", correct: false, feedback: "Niedorzeczne." }
        ]
      },
      {
        num: 7,
        title: "Odległe powikłanie – Zespół pozakrzepowy (PTS)",
        task: "Co to jest zespół pozakrzepowy (Post-Thrombotic Syndrome - PTS) i jak się objawia?",
        options: [
          { text: "Przewlekłe powikłanie DVT wywołane zniszczeniem zastawek żylnych i nadciśnieniem żylnym, objawiające się przewlekłym bólem, uczuciem ciężkości, obrzękiem, przebarwieniami hemosyderynowymi skóry i owrzodzeniami żylnymi goleni", correct: true, feedback: "Prawidłowo! Zespół pozakrzepowy rozwija się u 20–50% pacjentów po DVT z powodu uszkodzenia aparatu zastawkowego i utrzymującej się niedrożności żył. Skuteczna kompresjoterapia i prawidłowe leczenie przeciwkrzepliwe w fazie ostrej zmniejszają ryzyko PTS." },
          { text: "Ostre zapalenie płuc po leczeniu przeciwkrzepliwym", correct: false, feedback: "Brak związku." },
          { text: "Zanik tkanki tłuszczowej twarzy", correct: false, feedback: "Nie dotyczy kończyn." },
          { text: "Wrodzona wada serca", correct: false, feedback: "To powikłanie nabyte." }
        ]
      },
      {
        num: 8,
        title: "Bolesny obrzęk siniczy (Phlegmasia cerulea dolens)",
        task: "Czym charakteryzuje się najcięższa, zagrażająca utratą kończyny postać masywnej zakrzepicy żylnej zwana phlegmasia cerulea dolens?",
        options: [
          { text: "Masywną zakrzepicą wszystkich pni żylnych kończyny z całkowitym zablokowaniem odpływu żylnego, prowadzącą do wzrostu ciśnienia w łożysku włośniczkowym, zatrzymania dopływu tętniczego, sinicy, obrzęku i zgorzeli żylnej", correct: true, feedback: "Prawidłowo! Phlegmasia cerulea dolens to stan zagrożenia życia i kończyny: masywny zastój żylny blokuje mikrokrążenie tętnicze, prowadząc do niedokrwienia tkanek (gangrena żylna). Wymaga natychmiastowej trombolizy celowanej cewnikiem lub trombektomii żylnej." },
          { text: "Łagodnym zaczerwienieniem skóry palców", correct: false, feedback: "To śmiertelnie groźny stan, nie łagodny." },
          { text: "Zanikem tętna w kończynie górnej", correct: false, feedback: "Dotyczy najczęściej kończyny dolnej." },
          { text: "Wypadaniem zębów", correct: false, feedback: "Brak związku." }
        ]
      }
    ],
    pathoNodes: [
      { id: "p1", label: "Zastój i hiperkoagulacja (Virchow)", desc: "Estrogeny zwiększają czynniki krzepnięcia; bezruch w samolocie spowalnia spływ w żyłach głębokich." },
      { id: "p2", label: "Tworzenie skrzepliny w zatokach zastawkowych", desc: "Formowanie zakrzepu bogatego we włóknik i erytrocyty, blokującego naczynia proksymalne." },
      { id: "p3", label: "Ryzyko zatorowości płucnej (PE) i PTS", desc: "Fragmentacja skrzepliny grozi śmiertelnym zatorem płucnym; uszkodzenie zastawek prowadzi do zespołu pozakrzepowego." }
    ],
    diffTable: [
      { disease: "Zakrzepica żył głębokich (DVT)", feature: "Asymetria obwodu podudzia >3 cm, ból łydki, brak podatności żyły w teście kompresyjnym CUS, wysoki D-dimer" },
      { disease: "Pęknięta torbiel Bakera", feature: "Płyn w tkankach podskórnych łydki w USG, 'objaw półksiężyca' krwiaka pod kostką, ściśliwe żyły głębokie" },
      { disease: "Róża (erysipelas)", feature: "Wyraźnie odgraniczony rumień skóry z uniesionym brzegiem, wysoka gorączka z dreszczami, prawidłowy test CUS" },
      { disease: "Uraz mięśnia brzuchatego łydki", feature: "Nagły ostry ból podczas wysiłku (objaw 'uderzenia kamieniem'), krwiak śródmięśniowy w USG" }
    ],
    dutySummary: "Pacjentka 42-letnia z ostrą proksymalną zakrzepicą żył głębokich lewej kończyny dolnej po długim locie lotniczym w trakcie stosowania antykoncepcji hormonalnej (Wells 3 pkt, CUS dodatni w żyle udowej i podkolanowej). Zalecono natychmiastowe odstawienie antykoncepcji, włączono doustny antykoagulant NOAC (rywaroksaban/apiksaban w schemacie nasycającym) na okres 3 miesięcy oraz zalecono wczesne uruchomienie z kompresjoterapią II klasy.",
    lekQuestions: [
      {
        question: "Złotym standardem nieinwazyjnej diagnostyki ultrasonograficznej zakrzepicy żył głębokich kończyn dolnych jest:",
        options: [
          "Ultrasonograficzny test uciskowy (CUS - Compression Ultrasound)",
          "Angiografia izotopowa",
          "Termografia skóry kończyn",
          "Pletyzmografia impedancyjna",
          "Flebografia wstępująca rentgenowska"
        ],
        answer: "Ultrasonograficzny test uciskowy (CUS - Compression Ultrasound)",
        explanation: "Test uciskowy CUS polegający na ocenie ściśliwości żył pod uciskiem głowicy liniowej jest podstawowym, najdokładniejszym i bezpiecznym badaniem potwierdzającym DVT."
      },
      {
        question: "U chorego z pierwszym epizodem zakrzepicy żył głębokich sprowokowanej przemijającym dużym czynnikiem ryzyka (np. duża operacja, unieruchomienie gipsowe) standardowy czas leczenia przeciwkrzepliwego wynosi:",
        options: ["3 miesiące", "1 miesiąc", "12 miesięcy", "Bezterminowo do końca życia", "6 tygodni"],
        answer: "3 miesiące",
        explanation: "Wytyczne ESC i CHEST zalecają stosowanie leczenia przeciwkrzepliwego przez 3 miesiące w przypadku pierwszego epizodu zakrzepicy żył głębokich wywołanej przemijającym czynnikiem ryzyka."
      },
      {
        question: "Lekami pierwszego wyboru w leczeniu ostrej zakrzepicy żył głębokich u chorego bez aktywnej choroby nowotworowej i bez ciężkiej niewydolności nerek są:",
        options: [
          "Doustne antykoagulanty niebędące antagonistami witaminy K (NOAC/DOAC)",
          "Antagoniści witaminy K (acenokumarol, warfaryna) od 1. doby jako monoterapia",
          "Kwas acetylosalicylowy w dawce 300 mg/dobę",
          "Klopidogrel w skojarzeniu z tikagrelorem",
          "Streptokinaza we wlewie ogólnoustrojowym"
        ],
        answer: "Doustne antykoagulanty niebędące antagonistami witaminy K (NOAC/DOAC)",
        explanation: "NOAC (apiksaban, rywaroksaban, dabigatran, edoksaban) są preferowane ze względu na korzystny profil bezpieczeństwa, szybkie działanie i brak konieczności kontroli wskaźnika INR."
      }
    ],
    flashcards: [
      { front: "Co wchodzi w skład triady Virchowa?", back: "1. Staza żylna (zwolnienie przepływu), 2. Uszkodzenie śródbłonka naczyniowego, 3. Nadkrzepliwość krwi (hiperkoagulacja)." },
      { front: "Jaki jest główny objaw zakrzepicy w ultrasonograficznym teście CUS?", back: "Brak podatności żyły na ucisk głowicą (żyła ze skrzepliną nie zapada się całkowicie pod uciskiem)." },
      { front: "Kiedy ujemny wynik D-dimerów pozwala wykluczyć DVT?", back: "Tylko w przypadku niskiego lub pośredniego prawdopodobieństwa klinicznego (np. Wells <2); przy wysokim ryzyku należy wykonać CUS." },
      { front: "Jak długo leczy się DVT sprowokowane przemijającym czynnikiem ryzyka?", back: "Przez 3 miesiące (NOAC jako leki pierwszego wyboru)." },
      { front: "Co to jest phlegmasia cerulea dolens?", back: "Bolesny obrzęk siniczy – masywna zakrzepica blokująca cały odpływ żylny, grożąca wtórnym niedokrwieniem tętniczym, zgorzelą i amputacją." }
    ]
  },

  // 145: Zakrzepowe zapalenie żył powierzchownych (SVT)
  {
    id: 145,
    filename: "145_zakrzepowe_zapalenie_zyl_powierzchownych_svt.json",
    dept: "Chirurgia",
    shortTitle: "54-letni mężczyzna z żylakami kończyn – Bolesny, stwardniały, zaczerwieniony powrózek na przyśrodkowej stronie uda sięgający 2.5 cm od pachwiny (SVT blisko ujścia SFJ)",
    diagnosisTitle: "Zakrzepowe zapalenie pnia żyły odpiszczelowej wielkiej (Superficial Vein Thrombosis - SVT / Thrombophlebitis) zagrażające przejściem do układu głębokiego (odległość <3 cm od ujścia SFJ)",
    vitals: [
      { label: "HR", val: "78/min", sub: "Miarowy", status: "ok" },
      { label: "BP", val: "130/80 mmHg", sub: "Prawidłowe", status: "ok" },
      { label: "SpO2", val: "98%", sub: "Prawidłowa", status: "ok" },
      { label: "RR", val: "16/min", sub: "Prawidłowy", status: "ok" },
      { label: "Temp", val: "37.4°C", sub: "Stan podgorączkowy", status: "ok" }
    ],
    vitalsObj: { hr: 78, bp: "130/80", spo2: 98, rr: 16, temp: 37.4 },
    story: "54-letni mężczyzna z wieloletnimi żylakami prawej kończyny dolnej zgłasza się z powodu narastającego od 3 dni silnego bólu, zaczerwienienia i stwardnienia wzdłuż przyśrodkowej powierzchni prawego podudzia i uda. Zmiana zaczęła się w okolicy podudzia i 'wspina się' ku górze w kierunku pachwiny. W badaniu fizykalnym: na przyśrodkowej powierzchni uda wyczuwalny bolesny, twardy powrózek odpowiadający pniowi żyły odpiszczelowej (VSM), otoczony pasmem rumienia o szerokości 3–4 cm i wzmożoną ciepłotą skóry. Górny biegun nacieku zapalnego sięga około 2–3 cm poniżej fałdu pachwinowego (okolica ujścia odpiszczelowo-udowego - saphenofemoral junction, SFJ). Cała kończyna nie jest obrzęknięta, tętna tętnicze obwodowe prawidłowo wyczuwalne.",
    labs: [
      {
        category: "Badania biochemiczne i wskaźniki zapalne",
        items: [
          { name: "CRP w surowicy", val: "24 mg/L (umiarkowany stan zapalny)", norm: "< 5 mg/L", flag: "H" },
          { name: "Leukocyty (WBC)", val: "9.2 G/L", norm: "4.0–10.0 G/L", flag: "N" },
          { name: "D-dimer", val: "1250 ug/L (podwyższony w zakrzepicy)", norm: "< 500 ug/L", flag: "H" }
        ]
      },
      {
        category: "Ultrasonografia Doppler układu żylnego CITO",
        items: [
          { name: "Pień żyły odpiszczelowej wielkiej (VSM) prawej", val: "Nieściśliwy, wypełniony hipoechogenną skrzepliną pień VSM od goleni do wysokości 2.5 cm od ujścia do żyły udowej wspólnej (SFJ)", norm: "Żyła drożna i ściśliwa", flag: "H" },
          { name: "Odległość czoła skrzepliny od żyły udowej wspólnej (CFV)", val: "Dokładnie 25 mm (2.5 cm) – strefa krytyczna (<3 cm / <5 cm)", norm: "> 5 cm", flag: "H" },
          { name: "Układ żył głębokich (CFV, FV, POPV)", val: "Żyła udowa wspólna i układ głęboki całkowicie drożne i w pełni ściśliwe w teście CUS (brak DVT)", norm: "Układ głęboki drożny", flag: "N" }
        ]
      },
      {
        category: "Ocena kliniczna ryzyka proksymalizacji",
        items: [
          { name: "Długość zakrzepniętego odcinka żyły powierzchownej", val: "> 5 cm (długi odcinek obejmujący podudzie i udo)", norm: "< 5 cm", flag: "H" },
          { name: "Zaangażowanie ujścia SFJ", val: "Wysokie ryzyko przejścia skrzepliny do żyły udowej wspólnej", norm: "Brak", flag: "H" }
        ]
      }
    ],
    steps: [
      {
        num: 1,
        title: "Kliniczny obraz zakrzepowego zapalenia żył powierzchownych",
        task: "Jakie są charakterystyczne cechy przedmiotowe ostrego zakrzepowego zapalenia żyły powierzchownej (SVT)?",
        options: [
          { text: "Wyraźnie wyczuwalny bolesny, twardy powrózek żylny z towarzyszącym pasmowatym rumieniem skóry, obrzękiem i wzmożonym uciepleniem wzdłuż przebiegu naczynia", correct: true, feedback: "Prawidłowo! W przeciwieństwie do DVT (które toczy się w głębi mięśni i daje uogólniony obrzęk kończyny), SVT jest zmianą powierzchowną: skrzeplina i odczyn zapalny tworzą palpacyjnie twardy, bolesny 'sznur' lub 'powrózek' z zaczerwienieniem skóry nad nim." },
          { text: "Brak jakichkolwiek objawów miejscowych", correct: false, feedback: "SVT daje bardzo wyraźny miejscowy stan zapalny." },
          { text: "Zblednięcie i oziębienie całej stopy", correct: false, feedback: "To cecha ostrego niedokrwienia tętniczego, nie SVT." },
          { text: "Trzeszczenia podskórne i martwica mięśni", correct: false, feedback: "To objaw zgorzeli gazowej." }
        ]
      },
      {
        num: 2,
        title: "Konieczność badania USG w każdym przypadku SVT",
        task: "Dlaczego u KAŻDEGO pacjenta z klinicznym podejrzeniem SVT należy bezwzględnie wykonać badanie USG Doppler obu układów (powierzchownego i głębokiego)?",
        options: [
          { text: "U około 25% chorych z pozornie izolowanym SVT współistnieje nierozpoznana klinicznie zakrzepica żył głębokich (DVT) lub zatorowość płucna, a badanie fizykalne nie doszacowuje zasięgu proksymalnego skrzepliny nawet o kilkanaście centymetrów", correct: true, feedback: "Prawidłowo! Wytyczne ESVS jednoznacznie nakazują wykonanie USG u każdego chorego z podejrzeniem SVT: czoło skrzepliny w żyle powierzchownej sięga w USG średnio o 5–10 cm wyżej niż granica widocznego na skórze rumienia! Ponadto co czwarty chory ma już skrzeplinę w żyłach głębokich." },
          { text: "Aby ocenić obecność kamieni w pęcherzyku żółciowym", correct: false, feedback: "Brak związku." },
          { text: "Ponieważ SVT zawsze wymaga wycięcia kości piszczelowej", correct: false, feedback: "Absurd." },
          { text: "USG nie ma żadnego znaczenia w diagnostyce żył", correct: false, feedback: "USG jest podstawową metodą diagnostyczną." }
        ]
      },
      {
        num: 3,
        title: "Krytyczna odległość od ujścia SFJ – kryterium 3 cm",
        task: "Jakie znaczenie ma stwierdzenie, że czoło skrzepliny w pniu VSM znajduje się w odległości <3 cm od ujścia do żyły udowej wspólnej (SFJ)?",
        options: [
          { text: "Jest traktowane i leczone tak samo jak proksymalna zakrzepica żył głębokich (DVT) w pełnych dawkach terapeutycznych antykoagulacji lub wymaga podwiązania ujścia (krosektomii), z uwagi na bezpośrednie zagrożenie zatorowością płucną", correct: true, feedback: "Prawidłowo! Zgodnie z wytycznymi ESVS i CHEST, skrzeplina sięgająca <3 cm od połączenia odpiszczelowo-udowego (SFJ) lub odstrzałkowo-podkolanowego (SPJ) stwarza bezpośrednie ryzyko wpłynięcia do układu głębokiego i urwania się jako zator tętnicy płucnej. Wymaga pełnej antykoagulacji terapeutycznej (jak w DVT)!" },
          { text: "Oznacza, że pacjent jest całkowicie zdrowy i nie wymaga leczenia", correct: false, feedback: "To stan bezpośredniego zagrożenia DVT i PE." },
          { text: "Wskazuje na konieczność amputacji uda", correct: false, feedback: "Brak takich wskazań." },
          { text: "Wymaga leczenia wyłącznie maścią z nagietka", correct: false, feedback: "Nieskuteczne i skrajnie niebezpieczne." }
        ]
      },
      {
        num: 4,
        title: "Leczenie farmakologiczne SVT niepowikłanego (>3 cm od ujścia, długość >=5 cm)",
        task: "Jaki lek przeciwkrzepliwy jest lekiem pierwszego wyboru o udowodnionej najwyższej skuteczności (badanie CALISTO) w izolowanym SVT o długości >=5 cm i odległości >3 cm od ujścia?",
        options: [
          { text: "Fondaparynuks w dawce profilaktycznej 2.5 mg s.c. raz na dobę przez 45 dni (lub alternatywnie rywaroksaban 10 mg/d)", correct: true, feedback: "Prawidłowo! W wielkim badaniu CALISTO wykazano, że fondaparynuks (2.5 mg/d przez 45 dni) zmniejsza ryzyko zgonu, PE i progresji do DVT o 85% w porównaniu z placebo, nie zwiększając istotnie ryzyka krwawień. Stanowi standard leczenia SVT." },
          { text: "Warfaryna z docelowym INR 3.5–4.5", correct: false, feedback: "Zbyt duże ryzyko krwawień w izolowanym SVT." },
          { text: "Antybiotykoterapia ciprofloksacyną doustnie", correct: false, feedback: "SVT to proces zapalno-zakrzepowy jałowy, a nie infekcja bakteryjna!" },
          { text: "Glikokortykosteroidy w megadawkach dożylnie", correct: false, feedback: "GKS mogą nasilać stan prozakrzepowy." }
        ]
      },
      {
        num: 5,
        title: "Błąd w sztuce – nadużywanie antybiotyków w SVT",
        task: "Dlaczego rutynowe podawanie antybiotyków w niepowikłanym zakrzepowym zapaleniu żył powierzchownych jest błędem sztuki lekarskiej?",
        options: [
          { text: "SVT jest procesem aseptycznym (jałowym stanem zapalnym ściany żyły wywołanym przez skrzeplinę), a nie zakażeniem bakteryjnym; antybiotyki są wskazane wyłącznie w rzadkiej postaci septycznej (np. po wkłuciu obwodowym z ropieniem)", correct: true, feedback: "Prawidłowo! Zaczerwienienie i ocieplenie skóry w SVT wynika z uwalniania mediatorów zapalnych przez płytki i leukocyty wokół skrzepliny. Antybiotyki nie działają na skrzeplinę i są błędem, chyba że mamy do czynienia z ropnym zapaleniem po kaniulacji żyły (suppurative thrombophlebitis)." },
          { text: "Antybiotyki natychmiast rozpuszczają naczynia krwionośne", correct: false, feedback: "Absurd." },
          { text: "Bakterie są odporne na wszystkie antybiotyki na świecie", correct: false, feedback: "Nieprawda." },
          { text: "Antybiotyki można podawać tylko dzieciom", correct: false, feedback: "Nieprawda." }
        ]
      },
      {
        num: 6,
        title: "Wędrujące zakrzepowe zapalenie żył – Objaw Trousseau",
        task: "O czym może świadczyć nawracające, wieloogniskowe wędrujące zapalenie żył powierzchownych (thrombophlebitis migrans / objaw Trousseau)?",
        options: [
          { text: "O zespole paranowotworowym w przebiegu utajonego raka narządów wewnętrznych (najczęściej raka trzustki, żołądka lub płuca)", correct: true, feedback: "Prawidłowo! Objaw Trousseau (zespół Trousseau) to klasyczny zespół paraneoplastyczny: zakrzepy pojawiają się w różnych, nietypowych żyłach powierzchownych (np. na ramionach, klatce piersiowej), ustępują w jednym miejscu i pojawiają się w innym. Sam Armand Trousseau zdiagnozował u siebie ten objaw, rozpoznając u siebie śmiertelnego raka trzustki." },
          { text: "O wrodzonej łamliwości kości", correct: false, feedback: "Brak związku." },
          { text: "O przedawkowaniu witaminy D", correct: false, feedback: "Nie daje takich objawów." },
          { text: "O łagodnym uczuleniu na proszek do prania", correct: false, feedback: "Niedorzeczne." }
        ]
      },
      {
        num: 7,
        title: "Leczenie miejscowe i kompresjoterapia w SVT",
        task: "Jakie metody niefarmakologiczne i miejscowe przynoszą ulgę objawową w SVT?",
        options: [
          { text: "Miejscowe preparaty heparyny lub niesteroidowych leków przeciwzapalnych (NLPZ w żelu), zimne okłady oraz kompresjoterapia o stopniowanym ucisku w połączeniu z normalną aktywnością ruchową", correct: true, feedback: "Prawidłowo! NLPZ miejscowo i zimne okłady skutecznie łagodzą ból i stan zapalny. Kompresjoterapia zmniejsza zastój żylny i przyspiesza ustępowanie zmian. Podobnie jak w DVT, zaleca się chodzenie, a nie leżenie." },
          { text: "Gorące kąpiele i rozgrzewanie kończyny termoforem", correct: false, feedback: "Ciepło nasila rozszerzenie naczyń, ból i obrzęk zapalny." },
          { text: "Głęboki masaż uciskowy wzdłuż zmienionej żyły", correct: false, feedback: "Masaż grozi oderwaniem fragmentu skrzepliny i zatorowością płucną!" },
          { text: "Sztywne unieruchomienie kończyny szyną gipsową", correct: false, feedback: "Unieruchomienie sprzyja zakrzepicy żył głębokich." }
        ]
      },
      {
        num: 8,
        title: "Podsumowanie postępowania u tego pacjenta",
        task: "Z uwagi na odległość czoła skrzepliny wynoszącą 2.5 cm od ujścia do żyły udowej wspólnej (SFJ <3 cm), jakie jest docelowe postępowanie u opisywanego pacjenta?",
        options: [
          { text: "Wdrożenie pełnej terapeutycznej dawki antykoagulacji (np. NOAC lub HDCz w dawce leczniczej jak w DVT) przez minimum 3 miesiące LUB pilne podwiązanie żyły odpiszczelowej w ujściu (krosektomia)", correct: true, feedback: "Prawidłowo! Skrzeplina w odległości <3 cm od układu głębokiego wymaga traktowania identycznego jak DVT (pełna dawka terapeutyczna NOAC lub HDCz) lub zabiegu krosektomii (odcięcia i podwiązania ujścia VSM pod kontrolą znieczulenia miejscowego), by zablokować drogę do zatorowości płucnej." },
          { text: "Wypisanie do domu z zaleceniem picia rumianku", correct: false, feedback: "Błąd zagrażający życiu z powodu zatorowości płucnej." },
          { text: "Podanie dożylne 10 litrów płynu fizjologicznego", correct: false, feedback: "Grozi obrzękiem płuc." },
          { text: "Planowa kontrola za rok", correct: false, feedback: "Niedopuszczalna zwłoka." }
        ]
      }
    ],
    pathoNodes: [
      { id: "p1", label: "Zastój w poszerzonym pniu VSM", desc: "Niewydolność zastawek i żylaki sprzyjają uszkodzeniu śródbłonka i powstawaniu skrzepliny." },
      { id: "p2", label: "Aseptyczny naciek zapalny ściany", desc: "Zapalenie tkanki podskórnej i ściany żyły (bolesny powrózek, rumień, ucieplenie)." },
      { id: "p3", label: "Progresja ku ujściu SFJ", desc: "Przejście skrzepliny przez ujście odpiszczelowo-udowe bezpośrednio zagraża DVT i zatorowością płucną." }
    ],
    diffTable: [
      { disease: "Zakrzepowe zapalenie żył powierzchownych (SVT)", feature: "Twardy bolesny sznur wzdłuż żyły, pasmowaty rumień, pień VSM/VSP w USG nieściśliwy" },
      { disease: "Róża (erysipelas)", feature: "Jednolity, płaszczyznowy rumień o uniesionym brzegu, wrota zakażenia, dreszcze, brak powrózka żylnego" },
      { disease: "Zapalenie naczyń chłonnych (lymphangitis)", feature: "Cienkie czerwone smugi biegnące wzdłuż naczyń chłonnych ku bolesnym węzłom pachwinowym" },
      { disease: "Rumień guzowaty (erythema nodosum)", feature: "Bolesne podskórne czerwono-sine guzy na przedniej powierzchni obu podudzi, tło autoimmunologiczne" }
    ],
    dutySummary: "Pacjent 54-letni z zakrzepowym zapaleniem pnia żyły odpiszczelowej wielkiej (SVT) o długości >5 cm, z czołem skrzepliny w odległości 2.5 cm od ujścia odpiszczelowo-udowego (SFJ). Z uwagi na kryterium <3 cm wdrożono pełną dawkę terapeutyczną przeciwkrzepliwą (NOAC w dawce jak w DVT), kompresjoterapię oraz zalecono chodzenie. Uniknięto nieuzasadnionej antybiotykoterapii.",
    lekQuestions: [
      {
        question: "Czoło skrzepliny w pniu żyły odpiszczelowej wielkiej (VSM) znajdujące się w odległości poniżej 3 cm od ujścia odpiszczelowo-udowego (SFJ) kwalifikuje pacjenta do:",
        options: [
          "Leczenia przeciwkrzepliwego w pełnych dawkach terapeutycznych (jak w proksymalnej DVT) lub krosektomii",
          "Wyłącznie obserwacji bez podawania leków",
          "Leczenia antybiotykiem z grupy makrolidów",
          "Miejscowego stosowania wyłącznie maści rozgrzewających",
          "Natychmiastowej amputacji kończyny dolnej"
        ],
        answer: "Leczenia przeciwkrzepliwego w pełnych dawkach terapeutycznych (jak w proksymalnej DVT) lub krosektomii",
        explanation: "Zgodnie z wytycznymi ESVS skrzeplina powierzchowna w odległości <3 cm od połączenia z żyłą udową wspólną niesie wysokie ryzyko zatorowości płucnej i wymaga pełnej antykoagulacji terapeutycznej lub zabiegu krosektomii."
      },
      {
        question: "Objaw Trousseau (thrombophlebitis migrans) to wędrujące zakrzepowe zapalenie żył powierzchownych, które stanowi zespół paranowotworowy najczęściej związany z:",
        options: ["Rakiem trzustki", "Rakiem tarczycy", "Kostniakomięsakiem (osteosarcoma)", "Czerniakiem oka", "Gruczolakiem przysadki"],
        answer: "Rakiem trzustki",
        explanation: "Objaw Trousseau to klasyczny zespół paraneoplastyczny występujący w przebiegu raka trzustki, a także raka płuca i żołądka, związany z wydzielaniem czynników prozakrzepowych przez guz."
      },
      {
        question: "Lekiem o najlepiej udokumentowanej skuteczności w leczeniu izolowanego niepowikłanego SVT o długości >=5 cm i odległości >3 cm od ujścia (badanie CALISTO) jest:",
        options: ["Fondaparynuks w dawce 2.5 mg s.c./dobę przez 45 dni", "Amoksycylina z kwasem klawulanowym", "Kwas acetylosalicylowy 1000 mg/dobę", "Alteplaza dożylnie", "Ciprofloksacyna"],
        answer: "Fondaparynuks w dawce 2.5 mg s.c./dobę przez 45 dni",
        explanation: "W badaniu CALISTO fondaparynuks w dawce profilaktycznej podawany przez 45 dni zredukował powikłania zakrzepowo-zatorowe i progresję SVT o 85%."
      }
    ],
    flashcards: [
      { front: "Jak objawia się zakrzepowe zapalenie żył powierzchownych (SVT)?", back: "Bolesny, twardy powrózek w rzucie żyły z pasmowatym rumieniem skóry i uciepleniem." },
      { front: "Dlaczego USG jest konieczne w każdym przypadku SVT?", back: "U ~25% współistnieje nierozpoznane DVT, a skrzeplina w USG sięga 5–10 cm wyżej niż widoczny rumień." },
      { front: "Jakie postępowanie obowiązuje przy SVT <3 cm od ujścia SFJ?", back: "Pełna dawka terapeutyczna antykoagulacji (jak w DVT) przez min. 3 miesiące lub podwiązanie ujścia (krosektomia)." },
      { front: "Jaki jest udowodniony standard leczenia izolowanego SVT >=5 cm i >3 cm od ujścia?", back: "Fondaparynuks 2.5 mg s.c./dobę przez 45 dni (badanie CALISTO) lub rywaroksaban 10 mg/d." },
      { front: "O czym świadczy objaw Trousseau (thrombophlebitis migrans)?", back: "Wskazuje na podejrzenie utajonego nowotworu złośliwego (najczęściej raka trzustki, żołądka lub płuca)." }
    ]
  },

  // 146: Zespół usidlenia tętnicy podkolanowej (PAES)
  {
    id: 146,
    filename: "146_zespol_usidlenia_tetnicy_podkolanowej_paes.json",
    dept: "Chirurgia",
    shortTitle: "22-letni biegacz bez czynników ryzyka miażdżycy – Chromanie łydki podczas intensywnego biegu, zanik tętna na stopie przy zgięciu podeszwowym (PAES)",
    diagnosisTitle: "Zespół usidlenia tętnicy podkolanowej (Popliteal Artery Entrapment Syndrome - PAES typ I/II) z czynnościowym niedokrwieniem podudzia",
    vitals: [
      { label: "HR", val: "64/min", sub: "Prawidłowe (bradykardia sportowca)", status: "ok" },
      { label: "BP", val: "120/75 mmHg", sub: "Prawidłowe", status: "ok" },
      { label: "SpO2", val: "99%", sub: "Prawidłowa", status: "ok" },
      { label: "RR", val: "14/min", sub: "Prawidłowy", status: "ok" },
      { label: "Temp", val: "36.5°C", sub: "Prawidłowa", status: "ok" }
    ],
    vitalsObj: { hr: 64, bp: "120/75", spo2: 99, rr: 14, temp: 36.5 },
    story: "22-letni lekkoatleta (biegacz średniodystansowy), niepalący, bez chorób przewlekłych i bez obciążeń rodzinnych w wywiadzie, zgłasza się z powodu nawracającego, kurczowego bólu i uczucia drętwienia prawej łydki pojawiającego się wyłącznie podczas intensywnego biegu (po przebiegnięciu ok. 300–400 metrów). Dolegliwości ustępują całkowicie po kilku minutach odpoczynku. W spoczynku: kończyny dolne prawidłowo ucieplone, tętna na tętnicy udowej, podkolanowej, grzbietowej stopy i piszczelowej tylnej doskonale wyczuwalne, symetryczne. Jednak podczas manewru czynnego zgięcia podeszwowego stopy z oporem lub biernego maksymalnego wyprostu w stawie kolanowym – tętno na tętnicy grzbietowej prawej stopy i piszczelowej tylnej CAŁKOWICIE ZANIKA, a sygnał dopplerowski staje się niesłyszalny.",
    labs: [
      {
        category: "Badania laboratoryjne i wskaźniki metaboliczne",
        items: [
          { name: "Lipidogram (Cholesterol całkowity / LDL)", val: "160 mg/dL / 85 mg/dL (prawidłowy)", norm: "< 190 / < 115 mg/dL", flag: "N" },
          { name: "Glikemia / HbA1c", val: "88 mg/dL / 5.2% (brak cech cukrzycy)", norm: "< 100 mg/dL / < 5.7%", flag: "N" },
          { name: "Homocysteina / Trombofilia wrodzona", val: "W normie (brak czynników prozakrzepowych)", norm: "Norma", flag: "N" }
        ]
      },
      {
        category: "Przyłóżkowe badanie dopplerowskie z próbami prowokacyjnymi",
        items: [
          { name: "Przepływ dopplerowski w spoczynku", val: "Prawidłowy, trójfazowy w obu tętnicach stopy", norm: "Trójfazowy", flag: "N" },
          { name: "Przepływ dopplerowski podczas czynnego zgięcia podeszwowego stopy", val: "Zanik sygnału tętniczego na tętnicy grzbietowej stopy i piszczelowej tylnej po stronie prawej; powrót natychmiast po relaksacji mięśni", norm: "Przepływ zachowany", flag: "H" }
        ]
      },
      {
        category: "Rezonans magnetyczny (Angio-MR) i Angio-TK z prowokacją",
        items: [
          { name: "Angio-MR / Angio-TK dołu podkolanowego", val: "Nieprawidłowy przebieg głowy przyśrodkowej mięśnia brzuchatego łydki (m. gastrocnemius caput mediale), która obejmuje i uciska tętnicę podkolanową od strony przyśrodkowej. Podczas zgięcia podeszwowego całkowity ucisk światła tętnicy. Brak zmian miażdżycowych i brak tętniaka pozaprzeszkodowego", norm: "Prawidłowe relacje anatomiczne dołu podkolanowego", flag: "H" }
        ]
      }
    ],
    steps: [
      {
        num: 1,
        title: "Podejrzenie chromania u młodego sportowca",
        task: "O jakich rzadkich naczyniowych przyczynach chromania przestankowego należy myśleć u młodego pacjenta (<30 r.ż.) bez jakichkolwiek czynników ryzyka miażdżycy?",
        options: [
          { text: "Zespół usidlenia tętnicy podkolanowej (PAES), torbielowate zwyrodnienie przydanki tętnicy podkolanowej (CAD), dysplazja włóknisto-mięśniowa (FMD) oraz choroba Buergera (zakrzepowo-zarostowe zapalenie naczyń u palaczy)", correct: true, feedback: "Prawidłowo! U osób młodych chromanie przestankowe nigdy nie jest wynikiem klasycznej miażdżycy. Należy szukać wad anatomicznych dołu podkolanowego (PAES), torbieli przydanki uciskających światło naczynia lub zapaleń naczyń." },
          { text: "Choroba wieńcowa z zawałem ściany dolnej", correct: false, feedback: "Nie daje izolowanego chromania łydki." },
          { text: "Przerost prostaty", correct: false, feedback: "Schorzenie urologiczne u starszych mężczyzn." },
          { text: "Wypadanie płatka zastawki mitralnej", correct: false, feedback: "Nie powoduje zaniku tętna na stopie." }
        ]
      },
      {
        num: 2,
        title: "Podłoże embriologiczne i anatomiczne PAES",
        task: "Jaki jest mechanizm anatomiczny usidlenia tętnicy podkolanowej w klasycznym zespole PAES?",
        options: [
          { text: "Wrodzona anomalia rozwojowa, w której głowa przyśrodkowa mięśnia brzuchatego łydki (lub pasmo ścięgniste) ma nieprawidłowy przyczep i przebiega między tętnicą podkolanową a żyłą, powodując mechaniczne zaciskanie tętnicy przy skurczu mięśnia", correct: true, feedback: "Prawidłowo! W rozwoju embrionalnym migrująca głowa przyśrodkowa m. brzuchatego łydki wciąga lub przemieszcza tętnicę podkolanową przyśrodkowo (lub sama ma atypowy przyczep boczny). Skurcz mięśnia (zgięcie podeszwowe stopy) powoduje uwięźnięcie i okluzję naczynia." },
          { text: "Pęknięcie kości udowej z przemieszczeniem odłamów", correct: false, feedback: "U pacjenta nie było żadnego urazu." },
          { text: "Odkładanie blaszek amyloidowych w nerwie kulszowym", correct: false, feedback: "Amyloidoza to rzadka choroba układowa." },
          { text: "Zakażenie tasiemcem bąblowcowym", correct: false, feedback: "Bąblowica tworzy torbiele w wątrobie i płucach." }
        ]
      },
      {
        num: 3,
        title: "Kluczowy test prowokacyjny w badaniu fizykalnym",
        task: "Jaki manewr prowokacyjny w badaniu fizykalnym wywołuje zanik tętna na stopie u chorego z PAES?",
        options: [
          { text: "Czynne zgięcie podeszwowe stopy z oporem (skurcz mięśnia brzuchatego) lub bierne maksymalne zgięcie grzbietowe/przeprost kolana (rozciągnięcie mięśnia)", correct: true, feedback: "Prawidłowo! To patognomoniczny test kliniczny: w spoczynku tętno jest obecne, ale naprężenie mięśnia brzuchatego łydki (poprzez skurcz w zgięciu podeszwowym lub rozciągnięcie) dociska tętnicę do kłykcia kości udowej i całkowicie znosi przepływ obwodowy." },
          { text: "Głęboki wdech z zatrzymaniem powietrza (próba Valsalvy)", correct: false, feedback: "To manewr hemodynamiczny w kardiologii." },
          { text: "Zaciśnięcie pięści", correct: false, feedback: "Dotyczy kończyny górnej." },
          { text: "Położenie pacjenta na brzuchu na 5 sekund", correct: false, feedback: "Brak specyfiki diagnostycznej." }
        ]
      },
      {
        num: 4,
        title: "Groźne powikłanie nieleczonego PAES – Tętniak i zakrzepica",
        task: "Do jakiego trwałego i groźnego powikłania naczyniowego dochodzi w nieleczonym PAES w wyniku przewlekłego urazu ściany tętnicy?",
        options: [
          { text: "Do zwłóknienia ściany, powstania tętniaka pozaprzeszkodowego (post-stenotic aneurysm), zakrzepicy miejscowej lub zatorowości obwodowej prowadzącej do ostrego niedokrwienia kończyny", correct: true, feedback: "Prawidłowo! Przewlekły mechaniczny ucisk tętnicy przy każdym kroku niszczy błonę sprężystą i wewnętrzną naczynia. Prowadzi to do poszerzenia tętniakowatego za przeszkodą (zgodnie z prawem Bernoulliego i turbulencją), powstania skrzeplin przyściennych i nagłego zatoru obwodowego." },
          { text: "Do zaniku kości podudzia i stopy", correct: false, feedback: "Brak takiego powikłania." },
          { text: "Do samoistnego wyleczenia i poszerzenia tętnic sportowca", correct: false, feedback: "Nieleczony PAES postępuje i niszczy ścianę naczynia." },
          { text: "Do zapalenia opon mózgowo-rdzeniowych", correct: false, feedback: "Brak związku." }
        ]
      },
      {
        num: 5,
        title: "Metoda obrazowania z wyboru",
        task: "Jakie badanie obrazowe jest obecnie standardem w potwierdzeniu PAES i ocenie relacji mięśniowo-naczyniowych?",
        options: [
          { text: "Rezonans magnetyczny (Angio-MR) lub Angio-TK z manewrami prowokacyjnymi (w zgięciu podeszwowym i spoczynku)", correct: true, feedback: "Prawidłowo! MRI doskonale obrazuje tkanki miękkie – atypowy przebieg brzuśca lub ścięgna mięśnia brzuchatego, uciskaną tętnicę oraz ewentualne uszkodzenie ściany naczynia. Wykonanie badania w spoczynku i przy zgięciu podeszwowym dokumentuje dynamiczną okluzję." },
          { text: "Przeglądowe zdjęcie RTG klatki piersiowej", correct: false, feedback: "Nie uwidacznia dołu podkolanowego." },
          { text: "Kolonoskopia wirtualna", correct: false, feedback: "Brak związku." },
          { text: "Scyntygrafia kości", correct: false, feedback: "Nie ocenia anatomii naczyniowej." }
        ]
      },
      {
        num: 6,
        title: "Leczenie chirurgiczne z wyboru",
        task: "Jakie jest definitywne leczenie chirurgiczne zespołu usidlenia tętnicy podkolanowej przed wystąpieniem nieodwracalnego uszkodzenia naczynia?",
        options: [
          { text: "Operacja odbarczająca z dostępu tylnego: uwolnienie tętnicy podkolanowej i mieotomia / repozycja nieprawidłowego przyczepu głowy przyśrodkowej mięśnia brzuchatego łydki", correct: true, feedback: "Prawidłowo! Złotym standardem w fazie bez trwałego uszkodzenia ściany tętnicy jest chirurgiczne odbarczenie uciskanej tętnicy poprzez przecięcie (mieotomię) lub plastykę ektopowego pasma mięśniowego. Jeśli ściana tętnicy uległa zniszczeniu lub zakrzepicy, konieczna jest rekonstrukcja z użyciem wstawki żylnej (by-pass z żyły odpiszczelowej)." },
          { text: "Przezskórne założenie stentu metalowego do tętnicy podkolanowej", correct: false, feedback: "Założenie stentu w strefie ucisku mięśniowego jest błędem sztuki – zginany stent natychmiast ulegnie złamaniu i zakrzepicy!" },
          { text: "Amputacja stopy", correct: false, feedback: "Niedopuszczalne okaleczenie u młodego sportowca." },
          { text: "Stosowanie wyłącznie leków rozszerzających naczynia", correct: false, feedback: "Leki nie usuną wady anatomicznej." }
        ]
      },
      {
        num: 7,
        title: "Czynnościowy zespół usidlenia (Typ VI PAES)",
        task: "Co to jest czynnościowe usidlenie tętnicy podkolanowej (tzw. Functional PAES)?",
        options: [
          { text: "Ucisk tętnicy wywołany wyłącznie masywnym przerostem (hipertrofią) prawidłowo anatomicznie położonych mięśni łydki u wyczynowych sportowców (kulturystów, biegaczy)", correct: true, feedback: "Prawidłowo! W czynnościowym PAES (typ VI) nie ma wrodzonej anomalii ścięgna, ale olbrzymia masa przerośniętych mięśni w ograniczonej przestrzeni dołu podkolanowego zaciska naczynie przy maksymalnym wysiłku. Często leczy się go zachowawczo (modyfikacja treningu, fizjoterapia) lub wybiórczym odbarczeniem powięziowym." },
          { text: "Udawanie objawów przez pacjenta", correct: false, feedback: "To nie symulacja, lecz realna ciasnota anatomiczno-czynnościowa." },
          { text: "Niedrożność tętnicy spowodowana zapaleniem wyrostka robaczkowego", correct: false, feedback: "Brak związku." },
          { text: "Wada zastawek żylnych", correct: false, feedback: "Dotyczy układu tętniczego, nie żylnego." }
        ]
      },
      {
        num: 8,
        title: "Podsumowanie postępowania i powrót do sportu",
        task: "Jakie jest rokowanie po wczesnym chirurgicznym odbarczeniu anatomicznego PAES u młodego sportowca?",
        options: [
          { text: "Bardzo dobre – po wczesnej operacji przed uszkodzeniem tętnicy dolegliwości ustępują całkowicie u >90% chorych, a pacjent może powrócić do pełnej aktywności sportowej po rehabilitacji", correct: true, feedback: "Prawidłowo! Kluczem do sukcesu jest wczesne rozpoznanie przed zniszczeniem ściany naczynia i przed zakrzepicą. Wczesna mieotomia w pełni przywraca prawidłową biomechanikę i perfuzję łydki." },
          { text: "Całkowity zakaz chodzenia do końca życia", correct: false, feedback: "Pacjent wraca do normalnego funkcjonowania i sportu." },
          { text: "Konieczność amputacji obu kończyn w ciągu miesiąca", correct: false, feedback: "Absurd." },
          { text: "Śmiertelność w ciągu tygodnia wynosi 100%", correct: false, feedback: "PAES jest schorzeniem łagodnym anatomicznie, o ile nie dopuści się do zatorowości." }
        ]
      }
    ],
    pathoNodes: [
      { id: "p1", label: "Atypowa relacja mięśniowo-naczyniowa", desc: "Ektopowy przyczep głowy przyśrodkowej m. brzuchatego łydki obejmuje pień tętnicy podkolanowej." },
      { id: "p2", label: "Dynamiczny ucisk naczynia w wysiłku", desc: "Zgięcie podeszwowe stopy powoduje zaciśnięcie światła tętnicy i ostre chromanie łydki." },
      { id: "p3", label: "Mikrourazy ściany i ryzyko tętniaka", desc: "Powtarzany uraz mechaniczny prowadzi do zwyrodnienia przydanki, tętniaka pozaprzeszkodowego i zakrzepicy." }
    ],
    diffTable: [
      { disease: "Zespół usidlenia tętnicy podkolanowej (PAES)", feature: "Młody sportowiec, brak czynników miażdżycy, zanik tętna przy zgięciu podeszwowym, ucisk w MRI" },
      { disease: "Miażdżycowe chromanie przestankowe", feature: "Wiek >60 lat, palacz, cukrzyca, stały dystans chromania, trwały brak tętna w spoczynku" },
      { disease: "Przewlekły zespół ciasnoty przedziałów powięziowych (CECS)", feature: "Młody biegacz, ból i twardość mięśni goleni w wysiłku, tętna ZACHOWANE, wzrost ciśnienia w lożach mięśniowych" },
      { disease: "Torbielowate zwyrodnienie przydanki (CAD)", feature: "Śluzowa torbiel uciskająca tętnicę podkolanową w USG/MRI, brak anomalii mięśniowej" }
    ],
    dutySummary: "Pacjent 22-letni, lekkoatleta, z zespołem usidlenia tętnicy podkolanowej prawej (PAES). W badaniu fizykalnym wykazano zanik tętna obwodowego podczas prowokacyjnego zgięcia podeszwowego stopy. W badaniu Angio-MR uwidoczniono nieprawidłowy przebieg głowy przyśrodkowej m. brzuchatego łydki uciskającej naczynie. Zakwalifikowany do planowego chirurgicznego odbarczenia (mieotomii) z doskonałym rokowaniem.",
    lekQuestions: [
      {
        question: "U młodego sportowca bez czynników ryzyka sercowo-naczyniowego, zgłaszającego chromanie łydki z zanikiem tętna na stopie podczas czynnego zgięcia podeszwowego z oporem, najbardziej prawdopodobnym rozpoznaniem jest:",
        options: [
          "Zespół usidlenia tętnicy podkolanowej (PAES)",
          "Miażdżyca zarostowa tętnic kończyn dolnych",
          "Zator tętnicy udowej sercopochodny",
          "Choroba Raynauda",
          "Zakrzepica żyły odpiszczelowej"
        ],
        answer: "Zespół usidlenia tętnicy podkolanowej (PAES)",
        explanation: "PAES charakteryzuje się występowaniem objawów niedokrwiennych u młodych aktywnych osób oraz dynamicznym uciskiem tętnicy podkolanowej przez anomalnie położoną głowę przyśrodkową mięśnia brzuchatego łydki przy zgięciu podeszwowym."
      },
      {
        question: "Jakie powikłanie tętnicze może rozwinąć się w nieleczonym zespole usidlenia tętnicy podkolanowej w wyniku przewlekłego urazu ściany naczynia?",
        options: [
          "Tętniak pozaprzeszkodowy z zakrzepicą i zatorowością obwodową",
          "Rozwarstwienie aorty wstępującej typu A",
          "Przetoka tętniczo-żylna wrotno-wątrobowa",
          "Zwężenie zastawki aortalnej",
          "Obrzęk naczynioruchowy Quinckego"
        ],
        answer: "Tętniak pozaprzeszkodowy z zakrzepicą i zatorowością obwodową",
        explanation: "Przewlekły ucisk i turbulencja przepływu prowadzą do uszkodzenia ściany tętnicy za miejscem ucisku (post-stenotic dilation/aneurysm), co grozi wytworzeniem skrzeplin i ostrym zatorem."
      },
      {
        question: "Leczeniem z wyboru w niepowikłanym zespole usidlenia tętnicy podkolanowej o typie anatomicznym jest:",
        options: [
          "Chirurgiczne odbarczenie tętnicy z przecięciem anomalnego pasma mięśniowego (mieotomia)",
          "Wszczepienie stentu samorozprężalnego do tętnicy podkolanowej",
          "Dożywotnie stosowanie acenokumarolu w monoterapii",
          "Skleroterapia pianowa",
          "Amputacja kończyny na poziomie podudzia"
        ],
        answer: "Chirurgiczne odbarczenie tętnicy z przecięciem anomalnego pasma mięśniowego (mieotomia)",
        explanation: "Leczeniem przyczynowym jest chirurgiczne uwolnienie uciskanego naczynia. Wszczepienie stentu jest błędem, gdyż uległby on zmiażdżeniu i zakrzepicy pod wpływem sił mięśniowych."
      }
    ],
    flashcards: [
      { front: "Co to jest PAES?", back: "Popliteal Artery Entrapment Syndrome – zespół usidlenia tętnicy podkolanowej przez nieprawidłowy przyczep głowy przyśrodkowej mięśnia brzuchatego łydki." },
      { front: "Jaki jest klasyczny pacjent z PAES?", back: "Młody sportowiec (<30 r.ż.), bez czynników ryzyka miażdżycy, zgłaszający chromanie łydki podczas biegu." },
      { front: "Jaki manewr powoduje zanik tętna na stopie w PAES?", back: "Czynne zgięcie podeszwowe stopy z oporem lub bierny maksymalny wyprost/zgięcie grzbietowe kolana i stopy." },
      { front: "Dlaczego nie należy zakładać stentu naczyniowego w PAES?", back: "Stent w miejscu ucisku mięśniowego uległby deformacji, złamaniu i natychmiastowej zakrzepicy." },
      { front: "Jakie jest postępowanie operacyjne z wyboru w PAES?", back: "Chirurgiczne uwolnienie naczynia i mieotomia anomalnego pasma mięśnia brzuchatego (z ew. rekonstrukcją żylną przy uszkodzeniu ściany)." }
    ]
  }
];

async function run() {
  console.log("Processing cases: " + cases.map(c => c.id).join(", ") + "...");
  for (const caseData of cases) {
    const jsonString = JSON.stringify(caseData, null, 2);
    const encrypted = await encryptStringAes(jsonString, PASSWORD);
    const outPath = `cases/${caseData.filename}`;
    fs.writeFileSync(outPath, JSON.stringify(encrypted, null, 2), 'utf8');
    console.log(`Encrypted & saved ${outPath}`);
  }
  console.log("Batch 143-146 finished successfully.");
}
run().catch(console.error);

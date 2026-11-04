const fs = require('fs');
const path = require('path');
const { encryptStringAes } = require('./encrypt_case.js');

const MASTER_KEY = '@LEKSzymon28111999';
const CASES_DIR = path.join(__dirname, '..', 'cases');

console.log("Generating Case 124: Guz tylnego dołu czaszki (Medulloblastoma)...");

async function saveCase(caseData) {
  const filePath = path.join(CASES_DIR, caseData.filename);
  const jsonStr = JSON.stringify(caseData, null, 2);
  const encrypted = await encryptStringAes(jsonStr, MASTER_KEY);
  fs.writeFileSync(filePath, JSON.stringify(encrypted, null, 2), 'utf8');
  console.log(`[SAVED] Case #${caseData.id}: ${caseData.filename} (LEK Qs: ${caseData.lekQuestions.length}, Steps: ${caseData.steps.length}, Flashcards: ${caseData.flashcards.length})`);
}

const case124 = {
  id: 124,
  filename: "124_guz_tylnego_dolu_czaszki.json",
  dept: "Pediatria",
  shortTitle: "5-letni Olek – Poranne chlustające wymioty na czczo, bóle głowy i zaburzenia chodu (Guz tylnego dołu czaszki / Rdzeniak)",
  diagnosisTitle: "Guz tylnego dołu czaszki (podejrzenie Medulloblastoma / Rdzeniaka zarodkowego) z ciasnotą wewnątrzczaszkową, wodogłowiem obturacyjnym i ataksją móżdżkową",
  vitals: [
    { label: "Częstość akcji serca (HR)", val: "62/min", sub: "Wyraźna bradykardia jak na 5-latka (składowa triady Cushinga)", status: "vital-crit" },
    { label: "Ciśnienie tętnicze (RR)", val: "128/82 mmHg", sub: "Nadciśnienie tętnicze z poszerzeniem amplitudy", status: "vital-crit" },
    { label: "Częstość oddechów (RR)", val: "14/min", sub: "Nieregularny, spowolniony oddech (zagrożenie wgłobieniem)", status: "vital-crit" },
    { label: "Ocena dna oka", val: "Obustronny obrzęk tarczy n. II", sub: "Tarcza zastoinowa (papilledema) – wysokie ICP", status: "vital-crit" }
  ],
  vitalsObj: { hr: 62, bp: "128/82", spo2: 98, rr: 14, temp: 36.6, gcs: 14 },
  story: `<p><strong>Pacjent:</strong> 5-letni Olek (masa ciała 19 kg) został przywieziony na szpitalny oddział ratunkowy przez rodziców z powodu nawracających od 3-4 tygodni porannych wymiotów na czczo, narastających bólów głowy w okolicy potylicznej oraz zauważalnego od kilkunastu dni potykania się, utraty równowagi i chwiejnego chodu.</p><p><strong>Wywiad chorobowy:</strong> Początkowo wymioty pojawiały się 1-2 razy w tygodniu, wyłącznie rano, tuż po obudzeniu dziecka ze snu, miały charakter gwałtowny i chlustający bez wcześniejszych nudności. Po zwymiotowaniu chłopiec czuł się lepiej, zjadał śniadanie i szedł do przedszkola. Lekarz POZ podejrzewał refluks żołądkowo-przełykowy lub robaczycę przewodu pokarmowego. Od dwóch tygodni wymioty występują codziennie rano, a Olek budzi się z płaczem, trzymając się za kark i tył głowy (ból potyliczny nasilający się w pozycji leżącej i podczas kaszlu). Wychowawczyni w przedszkolu zauważyła, że chłopiec przestał biegać, podczas marszu chwieje się jak 'pijany marynarz', ma szeroko rozstawione nóżki i często przewraca się na równej podłodze. Dodatkowo matka zauważyła, że syn stał się apatyczny, podsypia w ciągu dnia, a przy rysowaniu ma problem z trafieniem kredką w wyznaczony punkt.</p><p><strong>Badanie przedmiotowe na SOR:</strong> Chłopiec podsypiający, zdezorientowany, powolny w odpowiedziach słownych (GCS 14). Twarz blada, cechy wyczerpania. Układ krążenia i oddechowy: uderzająca bradykardia 62/min (norma dla 5-latka: 80-120/min), podwyższone ciśnienie tętnicze 128/82 mmHg (powyżej 99 centyla) oraz zwolniony, nieregularny tor oddechowy (RR 14/min) – obecna klasyczna <em>triada Cushinga</em> zwiastująca krytyczny wzrost ciśnienia śródczaszkowego! W badaniu okulistycznym dna oka: obecny obustronny, wyraźny obrzęk tarczy nerwu wzrokowego z zatarciem jej granic i uniesieniem nad poziom siatkówki (tarcza zastoinowa / papilledema). W badaniu neurologicznym: symetryczny oczopląs poziomy przy patrzeniu w boki; chód na szerokiej podstawie z tendencją do padania do tyłu i na boki (ataksja tułowia); próba Romberga dodatnia niezależnie od otwarcia lub zamknięcia oczu; wyraźna dysmetria w próbie palec-nos i drżenie zamiarowe rąk; napięcie mięśniowe obniżone w kończynach dolnych; odruchy ścięgniste wygórowane, obustronny objaw Babińskiego dodatni. Sztywność karku na 2 palce (podrażnienie migdałków móżdżku w otworze wielkim).</p>`,
  labs: {
    "Parametry laboratoryjne na SOR": [
      { name: "Glukoza przyłóżkowa", val: "94 mg/dl", norm: "70 - 105 mg/dl", flag: "NORMAL" },
      { name: "Sód (Na+)", val: "135 mmol/l", norm: "135 - 145 mmol/l", flag: "NORMAL" },
      { name: "Potas (K+)", val: "4,1 mmol/l", norm: "3,5 - 5,1 mmol/l", flag: "NORMAL" },
      { name: "Mocznik", val: "22 mg/dl", norm: "15 - 36 mg/dl", flag: "NORMAL" },
      { name: "Kreatynina", val: "0,38 mg/dl", norm: "0,30 - 0,55 mg/dl", flag: "NORMAL" },
      { name: "Leukocyty (WBC)", val: "7,8 tys./µl", norm: "5,0 - 12,0 tys./µl", flag: "NORMAL" },
      { name: "CRP", val: "1,2 mg/l", norm: "< 5,0 mg/l", flag: "NORMAL" },
      { name: "Gazometria włośniczkowa pH", val: "7,38", norm: "7,35 - 7,45", flag: "NORMAL" },
      { name: "pCO2", val: "43 mmHg", norm: "35 - 45 mmHg", flag: "NORMAL" }
    ],
    "Pilna tomografia komputerowa (TK) głowy bez kontrastu": [
      { name: "Tylny dół czaszki", val: "Masa guzowata o wymiarach 42 x 38 x 35 mm zlokalizowana w robaku móżdżku i świetle komory IV", norm: "Prawidłowa anatomia móżdżku", flag: "CRIT_HIGH" },
      { name: "Komora IV mózgowia", val: "Całkowicie uciśnięta i zaciśnięta przez masę nowotworową", norm: "Drożna, symetryczna", flag: "CRIT_HIGH" },
      { name: "Układ komorowy nadnamiotowy", val: "Masywne poszerzenie komór bocznych i komory III (wodogłowie obturacyjne / trójkomorowe)", norm: "Układ komorowy nieposzerzony", flag: "CRIT_HIGH" },
      { name: "Przesięk okołokomorowy", val: "Widoczny obrzęk śródmiąższowy wokół rogów czołowych komór bocznych (transudacja PMR)", norm: "Brak obrzęku", flag: "CRIT_HIGH" },
      { name: "Migdałki móżdżku", val: "Obniżone 6 mm poniżej płaszczyzny otworu wielkiego (początkowe wgłobienie migdałkowe)", norm: "Powyżej otworu wielkiego", flag: "CRIT_HIGH" }
    ]
  },
  steps: [
    {
      title: "Krok 1: Rozpoznanie triady wzmożonego ciśnienia śródczaszkowego i triady Cushinga",
      text: "U 5-letniego Olka występują poranne chlustające wymioty na czczo, potyliczne bóle głowy, obustronna tarcza zastoinowa oraz bradykardia 62/min z nadciśnieniem 128/82 mmHg i nieregularnym oddechem. Jak należy zinterpretować te objawy?",
      options: [
        "Zespół ciasnoty wewnątrzczaszkowej z wodogłowiem; obecność triady Cushinga (bradykardia, nadciśnienie, zaburzenia oddychania) wskazuje na bezpośrednie zagrożenie wgłobieniem migdałków móżdżku do otworu wielkiego",
        "Zatrucie pokarmowe toksynami gronkowcowymi z odwodnieniem hipotonicznym",
        "Wirusowe zapalenie żołądka i jelit z drgawkami bezgorączkowymi",
        "Padaczka rolandyczna z napadami wegetatywnymi i łagodnym nadciśnieniem"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Poranne chlustające wymioty na czczo, ból głowy i tarcza zastoinowa to klasyczna triada wzmożonego ciśnienia śródczaszkowego (ICP).</strong> Dołączenie <em>triady Cushinga</em> (nadciśnienie tętnicze, bradykardia, nieregularny oddech) to odruch pniowy świadczący o krytycznym niedokrwieniu pnia mózgu i bezpośrednim zagrożeniu wklinowaniem migdałków móżdżku w otwór wielki (stan bezpośredniego zagrożenia życia!).",
        "❌ BŁĄD! <strong>Zatrucie pokarmowe powoduje biegunkę, gorączkę i tachykardię,</strong> a nie bradykardię, nadciśnienie, tarczę zastoinową i ataksję chodu.",
        "❌ BŁĄD! <strong>Wymioty występujące od 4 tygodni wyłącznie rano na czczo nigdy nie są 'zwykłą jelitówką'.</strong>",
        "❌ BŁĄD! <strong>Padaczka nie tłumaczy tarczy zastoinowej na dnie oka ani postępującej ataksji móżdżkowej.</strong>"
      ]
    },
    {
      title: "Krok 2: Badanie neuroobrazowe z wyboru i BEZWZGLĘDNE przeciwwskazanie",
      text: "Jaki jest plan postępowania diagnostycznego obrazowego i jaka procedura medyczna jest w tym momencie BEZWZGLĘDNIE PRZECIWWSKAZANA z powodu ryzyka natychmiastowego zgonu dziecka?",
      options: [
        "Pilne wykonanie neuroobrazowania (TK/MRI mózgowia); PUNKCJA LĘDŹWIOWA jest bezwzględnie przeciwwskazana z powodu ryzyka wklinowania móżdżku do otworu wielkiego",
        "Natychmiastowe wykonanie punkcji lędźwiowej celem pobrania płynu m-r i odbarczenia ciśnienia przed badaniem TK",
        "Wykonanie EEG w czuwaniu i we śnie; badania obrazowe są zbędne",
        "Zlecenie gastroskopii w znieczuleniu ogólnym celem oceny refluksu"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Badaniem pierwszego rzutu w trybie pilnym jest tomografia komputerowa (TK) lub rezonans magnetyczny (MRI) głowy.</strong> Wykonanie nakłucia lędźwiowego (LP) przy obecności guza tylnego dołu czaszki, obrzęku mózgu i tarczy zastoinowej gwałtownie obniża ciśnienie w kanale kręgowym, powodując wytworzenie śmiertelnego gradientu ciśnień i natychmiastowe wklinowanie migdałków móżdżku do otworu wielkiego z uciskiem na pień mózgu i zatrzymaniem krążenia!",
        "❌ BŁĄD! <strong>Wykonanie punkcji lędźwiowej w tej sytuacji to bezpośrednia przyczyna śmierci dziecka na stole zabiegowym (wklinowanie migdałków móżdżku!).</strong>",
        "❌ BŁĄD! <strong>EEG nie ma żadnego zastosowania w diagnostyce ciasnoty śródczaszkowej.</strong>",
        "❌ BŁĄD! <strong>Gastroskopia u dziecka z obrzękiem mózgu i wklinowaniem jest skrajnie niebezpieczna i nieuzasadniona.</strong>"
      ]
    },
    {
      title: "Krok 3: Natychmiastowe leczenie przeciwobrzękowe i protekcja mózgowia",
      text: "TK potwierdziła obecność guza robaka móżdżku o wymiarach 4 cm zamykającego komorę IV, wodogłowie trójkomorowe i wklinowanie migdałków 6 mm. Neurochirurg jest w drodze na blok. Jakie leczenie farmakologiczne i ułożeniowe należy wdrożyć natychmiast na SOR?",
      options: [
        "Uniesienie wezgłowia łóżka o 30 stopni, podanie dożylne deksametazonu (0,5-1 mg/kg/d) oraz wlew mannitolu 20% (0,5-1,0 g/kg) celem osmotycznej i przeciwwazogennej redukcji obrzęku mózgu",
        "Ułożenie dziecka w pozycji Trendelenburga (głową w dół) i podanie 1000 ml 0,45% NaCl",
        "Podanie wlewu furosemidu z dożylną podażą hipotonicznej 5% glukozy",
        "Podanie dożylne morfiny w dużej dawce celem wygaszenia odruchów oddechowych"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Postępowanie w ostrym zespole ciasnoty wewnątrzczaszkowej obejmuje:</strong> uniesienie głowy i tułowia pod kątem 30° (ułatwienie odpływu krwi żylnej przez żyły szyjne), <span class='dose-pill'>Deksametazon 0,5-1 mg/kg/dobę i.v.</span> (zmniejsza przepuszczalność bariery krew-mózg i redukuje obrzęk okołoguzowy) oraz <span class='dose-pill'>Mannitol 20% 0,5-1,0 g/kg i.v. we wlewie 20-30 min</span> (odciąga wolną wodę z mózgowia do łożyska naczyniowego). Unika się płynów hipotonicznych!",
        "❌ BŁĄD! <strong>Pozycja Trendelenburga drastycznie zwiększa ciśnienie żylne w głowie i przyspieszy zgon przez wklinowanie!</strong> Płyny hipotoniczne nasilają obrzęk mózgu.",
        "❌ BŁĄD! <strong>Glukoza 5% to płyn hipotoniczny – woda natychmiast przemieści się do komórek mózgowia, powodując śmiertelny obrzęk.</strong>",
        "❌ BŁĄD! <strong>Morfina w dużej dawce doprowadzi do hipowentylacji i hiperkapnii (wzrost pCO2), co wywoła gwałtowne rozszerzenie naczyń mózgowych i skok ICP.</strong>"
      ]
    },
    {
      title: "Krok 4: Postępowanie neurochirurgiczne w ostrym wodogłowiu obturacyjnym",
      text: "Guz zamyka całkowicie przepływ płynu m-r przez komorę IV (wodogłowie obturacyjne), a komory boczne są krytycznie poszerzone. Jaki zabieg neurochirurgiczny ratuje życie przed planową resekcją guza?",
      options: [
        "Założenie zewnętrznego drenażu komorowego (EVD) do komory bocznej lub wykonanie endoskopowej wentrikulostomii komory III (ETV) celem natychmiastowego odbarczenia ciśnienia płynu m-r",
        "Natychmiastowe założenie zastawki lędźwiowo-otrzewnowej (LP shunt)",
        "Trepanacja czaszki nad dołem przednim bez drenażu komór",
        "Kraniotomia dekompresyjna z usunięciem płata czołowego"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>W ostrym wodogłowiu obturacyjnym z zagrożeniem życia konieczne jest pilne odbarczenie płynowe.</strong> Metodą z wyboru jest założenie zewnętrznego drenażu komorowego (EVD – External Ventricular Drain) do rogu czołowego komory bocznej lub endoskopowa wentrikulostomia dna komory III (ETV), co pozwala na kontrolowany spadek ICP i ustabilizowanie stanu dziecka przed craniotomią.",
        "❌ BŁĄD! <strong>Drenaż lędźwiowy (LP shunt) w obecności guza podnamiotowego wywoła śmiertelne wklinowanie migdałków!</strong>",
        "❌ BŁĄD! <strong>Trepanacja bez drenażu nie rozwiąże problemu zablokowanego krążenia PMR.</strong>",
        "❌ BŁĄD! <strong>Guz znajduje się w dole tylnym (podnamiotowo),</strong> usuwanie płata czołowego to absurd medyczny."
      ]
    },
    {
      title: "Krok 5: Epidemiologia guzów mózgu u dzieci i typy histologiczne w dole tylnym",
      text: "Jakie guzy najczęściej lokalizują się w tylnym dole czaszki (podnamiotowo) u dzieci i który z nich jest najczęstszym złośliwym guzem mózgu w populacji pediatrycznej?",
      options: [
        "Najczęstszym złośliwym guzem jest Rdzeniak (Medulloblastoma, WHO G4); drugim częstym guzem jest łagodny Gwiaździak włosowatokomórkowy (Pilocytic astrocytoma, WHO G1), a trzecim Wyściółczak (Ependymoma)",
        "Glioblastoma multiforme (WHO G4) stanowiący 95% guzów mózgu u niemowląt",
        "Oponiaki i gruczolaki przysadki mózgowej",
        "Przerzuty raka płuca i raka piersi zlokalizowane w móżdżku"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>U dzieci ponad 55-60% guzów OUN rozwija się podnamiotowo (w dole tylnym).</strong> Najczęstszym nowotworem łagodnym móżdżku jest gwiaździak włosowatokomórkowy (Pilocytic astrocytoma, WHO G1 – półkule móżdżku, torbiel z guzkiem). Najczęstszym nowotworem ZŁOŚLIWYM mózgu u dzieci jest Rdzeniak (Medulloblastoma, WHO G4 – robak móżdżku, dach komory IV). Trzecim co do częstości jest wyściółczak (Ependymoma, dno komory IV).",
        "❌ BŁĄD! <strong>Glioblastoma (GBM) to typowy guz osób starszych,</strong> u małych dzieci występuje rzadko.",
        "❌ BŁĄD! <strong>Oponiaki i gruczolaki przysadki to domena dorosłych,</strong> u 5-latków są skrajną rzadkością.",
        "❌ BŁĄD! <strong>Przerzuty do OUN stanowią większość guzów mózgu u dorosłych, natomiast u dzieci guzy mózgu są niemal wyłącznie nowotworami PIERWOTNYMI!</strong>"
      ]
    },
    {
      title: "Krok 6: Pełna ocena zaawansowania (Staging) w Rdzeniaku – ocena osi mózgowo-rdzeniowej",
      text: "W badaniu histopatologicznym potwierdzono Rdzeniaka (Medulloblastoma, WHO G4). Jakie dodatkowe badanie obrazowe jest bezwzględnie wymagane u każdego dziecka z rdzeniakiem w celu oceny stopnia zaawansowania (stagingu)?",
      options: [
        "Rezonans magnetyczny (MRI) całego kręgosłupa i kanału kręgowego z kontrastem, ponieważ rdzeniak ma tendencję do rozsiewu drogą płynu m-r (tzw. przerzuty kropelkowe / drop metastases)",
        "Scyntygrafia kośćca całego ciała z użyciem technetu Tc-99m",
        "RTG przeglądowe klatki piersiowej i kości długich",
        "Kolonoskopia w celu poszukiwania zespołu Lyncha"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Medulloblastoma cechuje się wysokim powinowactwem do płynu mózgowo-rdzeniowego i rozsiewa się wzdłuż całej osi mózgowo-rdzeniowej.</strong> U każdego dziecka bezwzględnie konieczne jest wykonanie rezonansu magnetycznego całego kanału kręgowego (Spine MRI) z kontrastem w celu wykrycia tzw. 'przerzutów kropelkowych' (drop metastases) w kanale kręgowym oraz badanie cytologiczne PMR (po ustabilizowaniu ICP).",
        "❌ BŁĄD! <strong>Scyntygrafia kośćca nie ocenia kanału kręgowego i opon,</strong> rdzeniak rozsiewa się oponowo w PMR, a nie do kośćca obwodowego.",
        "❌ BŁĄD! <strong>RTG nie pozwala na uwidocznienie oponowych ognisk rozsiewu w kanale rdzeniowym.</strong>",
        "❌ BŁĄD! <strong>Kolonoskopia nie ma związku ze stagingiem medulloblastoma u 5-latka.</strong>"
      ]
    },
    {
      title: "Krok 7: Kompleksowe leczenie onkologiczne rdzeniaka (chirurgia, radioterapia, chemioterapia)",
      text: "Po maksymalnej resekcji guza Olek trafia na konsylium onkologiczne. Z jakich filarów składa się współczesne leczenie skojarzone Medulloblastoma u 5-letniego dziecka?",
      options: [
        "Maksymalna chirurgiczna resekcja guza + radioterapia na całą oś mózgowo-rdzeniową (Craniospinal Irradiation - CSI) z 'boostem' na lożę guza + wielolekowa chemioterapia uzupełniająca (cisplatyna, etopozyd, cyklofosfamid, winkrystyna)",
        "Wyłącznie leczenie operacyjne; rdzeniak nie odpowiada na naświetlania ani leki",
        "Sama chemioterapia doustna bez operacji i bez radioterapii",
        "Przeszczepienie allogenicznego szpiku bez usuwania guza"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Złotym standardem leczenia Medulloblastoma u dzieci powyżej 3. roku życia jest leczenie trójmodalne:</strong> 1. Radykalna neurochirurgiczna resekcja guza, 2. Radioterapia osi mózgowo-rdzeniowej (CSI: mózgowie + cały rdzeń kręgowy) z podwyższeniem dawki na lożę tylnego dołu czaszki, 3. Adiuwantowa chemioterapia wielolekowa (<span class='dose-pill'>Cisplatyna + Etopozyd + Cyklofosfamid + Winkrystyna</span>). U dzieci <3 r.ż. unika się radioterapii ze względu na toksyczność dla rozwijającego się mózgu.",
        "❌ BŁĄD! <strong>Sama operacja prowadzi do nawrotu u niemal 100% chorych</strong> z powodu komórek krążących w płynie m-r.",
        "❌ BŁĄD! <strong>Chemioterapia bez resekcji masy guza nie daje szans na wyleczenie.</strong>",
        "❌ BŁĄD! <strong>Allo-HSCT nie jest standardem leczenia pierwotnego rdzeniaka.</strong>"
      ]
    },
    {
      title: "Krok 8: Powikłanie pooperacyjne – Zespół móżdżkowy i mutyzm móżdżkowy",
      text: "W 2. dobie po udanej resekcji guza robaka móżdżku Olek przestaje mówić, staje się skrajnie płaczliwy, labilny emocjonalnie, pojawia się wiotkość i ciężka dysfagia. Jakie specyficzne powikłanie neurochirurgiczne wystąpiło?",
      options: [
        "Zespół mutyzmu móżdżkowego (Cerebellar Mutism Syndrome / zespół dołu tylnego), rozwijający się typowo po 24-48 h od operacji robaka móżdżku",
        "Ostry zawał kory potylicznej z powodu niedokrwienia t. mózgu tylnej",
        "Późne powikłanie narkozy gazowej ustępujące po podaniu flumazenilu",
        "Całkowite uszkodzenie nerwu twarzowego i krtaniowego wstecznego"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Zespół mutyzmu móżdżkowego (Cerebellar Mutism Syndrome - CMS) występuje u ok. 25% dzieci operowanych z powodu guza robaka móżdżku (uszkodzenie dróg zębatkowo-czerwienno-wzgórzowo-korowych).</strong> Objawia się po okresie utajenia (24-48 h po zabiegu) całkowitą utratą mowy (mutyzm), labilnością afektywną, ciężką ataksją i zaburzeniami połykania. Zespół ma charakter przemijający, ale powrót mowy zajmuje od kilku tygodni do miesięcy i wymaga intensywnej neurorehabilitacji.",
        "❌ BŁĄD! <strong>Zawał kory potylicznej wywołałby niedowidzenie połowicze jednoimienne lub ślepotę korową,</strong> a nie mutyzm móżdżkowy.",
        "❌ BŁĄD! <strong>Powikłania po narkozie ujawniają się od razu po wybudzeniu,</strong> a nie w 2. dobie po zabiegu.",
        "❌ BŁĄD! <strong>Mutyzm móżdżkowy jest uszkodzeniem ośrodkowym szlaków móżdżkowo-korowych,</strong> a nie obwodowym porażeniem nerwów czaszkowych."
      ]
    }
  ],
  pathoNodes: [
    {
      badge: "Onkogeneza",
      title: "Prymitywny nowotwór neuroektodermalny (PNet)",
      short: "Transformacja komórek prekursorowych ziarnistych móżdżku",
      detail: "Medulloblastoma wywodzi się z niedojrzałych prekursorów neuronalnych robaka móżdżku w dachu komory IV (podtypy molekularne: WNT, SHH, Grupa 3, Grupa 4). Charakteryzuje się drobnymi, okrągłymi niebieskimi komórkami i rozetami Homera-Wrighta.",
      target: "Szlak WNT / Sonic Hedgehog (SHH)",
      drugTarget: "<span class='dose-pill'>Maksymalna chirurgiczna resekcja</span> makroskopowe usunięcie masy guza"
    },
    {
      badge: "Blokada krążenia PMR",
      title: "Wodogłowie obturacyjne trójkomorowe",
      short: "Zaciśnięcie komory IV i wodociągu Sylwiusza",
      detail: "Masa guza zamyka ujście płynu mózgowo-rdzeniowego z komory IV do przestrzeni podpajęczynkowej. Blokuje to drenaż PMR z komór bocznych i III, wywołując gwałtowny wzrost ciśnienia wewnątrzczaszkowego i obrzęk okołokomorowy.",
      target: "Układ komorowy i drenaż PMR",
      drugTarget: "<span class='dose-pill'>Zewnętrzny drenaż komorowy (EVD)</span> ratunkowe odbarczenie ciśnienia PMR"
    },
    {
      badge: "Ciasnota wewnątrzczaszkowa",
      title: "Obrzęk naczyniopochodny i triada Cushinga",
      short: "Spadek mózgowego przepływu krwi (CBF = CPP/CVR)",
      detail: "Wzrost objętości guza i PMR wyczerpuje rezerwę objętościową czaszki (doktryna Monro-Kellie). Dochodzi do obrzęku tarczy nerwu wzrokowego, ucisku na pień mózgu i odruchu Cushinga (nadciśnienie, bradykardia, nieregularny oddech).",
      target: "Ciśnienie perfuzji mózgowej (CPP)",
      drugTarget: "<span class='dose-pill'>Deksametazon 0,5-1 mg/kg/d i.v.</span> + <span class='dose-pill'>Mannitol 20% 0,5-1 g/kg i.v.</span>"
    },
    {
      badge: "Rozsiew w osi",
      title: "Oponowe przerzuty kropelkowe (Drop Metastases)",
      short: "Złuszczanie komórek do płynu mózgowo-rdzeniowego",
      detail: "Komórki rdzeniaka łatwo odrywają się od guza pierwotnego i krążą z prądem PMR, osadzając się na powierzchni opony miękkiej mózgowia i w kanale kręgowym wzdłuż nici rdzenia (ogona końskiego).",
      target: "Przestrzeń podpajęczynkowa i kanał rdzeniowy",
      drugTarget: "<span class='dose-pill'>Radioterapia Craniospinalna (CSI) 23,4-36 Gy</span> eradykacja komórek w osi OUN"
    }
  ],
  diffTable: {
    title: "⚔️ Tabela Różnicowa: Guzy tylnego dołu czaszki vs Inne jednostki neurologiczne u dzieci",
    headers: ["Cecha kliniczna", "Rdzeniak zarodkowy (Medulloblastoma)", "Gwiaździak włosowatokomórkowy (Pilocytic astrocytoma)", "Wyściółczak komory IV (Ependymoma)", "Guz pnia mózgu (DIPG)", "Ostre zapalenie móżdżku (Cerebellitis)"],
    rows: [
      ["Stopień złośliwości WHO", "WHO G4 – wysoce złośliwy nowotwór embrionalny", "WHO G1 – nowotwór łagodny o powolnym wzroście", "WHO G2 lub G3 – zróżnicowana złośliwość", "WHO G4 – rozlany naciekający glejak pnia (DIPG)", "Brak nowotworu – proces zapalny/autoimmunologiczny"],
      ["Punkt wyjścia / lokalizacja", "Robak móżdżku (dach komory IV), wrasta do światła", "Półkula móżdżku (charakterystyczna torbiel z guzkiem)", "Dno komory IV (z komórek wyściółki), 'plastyczny'", "Most (pień mózgu), rozlane powiększenie mostu", "Rozlane, symetryczne obrzęknięcie obu półkul móżdżku"],
      ["Przebieg czasowy objawów", "Podostry (tygodnie): poranne wymioty, ataksja tułowia", "Przewlekły (miesiące/lata): powolne potykanie się, chwiejność", "Podostry: ciasnota śródczaszkowa, porażenia nn. czaszkowych", "Szybko postępujący (tygodnie): mnogie porażenia nn. czaszkowych", "Ostry (dni): nagła ataksja 1-3 tyg. po ospie wietrznej"],
      ["Rozsiew w osi mózgowo-rdzeniowej", "Bardzo częsty (ok. 30% w chwili diagnozy – 'drop metastases')", "Wyjątkowo rzadki (rak rośnie lokalnie)", "Możliwy (ok. 10-15%), zwłaszcza w anaplastycznym", "Brak odległego rozsiewu (śmiertelny naciek lokalny)", "Brak nowotworu; w PMR pleocytoza limfocytowa"],
      ["Obraz w rezonansie (MRI)", "Lity, hiperdensyjny guz wzmacniający się po kontraście", "Duża torbiel z silnie wzmacniającym się guzkiem przyściennym", "Guz wypełniający komorę IV i wychodzący przez otwory Luschki/Magendiego", "Rozlane powiększenie mostu z zaciśnięciem komory IV, bez wyraźnej masy", "Wzmożenie sygnału T2/FLAIR w korze móżdżku"],
      ["Leczenie pierwszego rzutu", "Radykalna resekcja + CSI (radioterapia osi) + chemioterapia", "Całkowita resekcja chirurgiczna (często w 100% wyleczalna bez RT/CHT)", "Maksymalna bezpieczna resekcja + radioterapia loży", "Brak możliwości operacji; paliatywna radioterapia wiązką", "Leczenie objawowe, GKS w ciężkich postaciach, ustępuje samoistnie"]
    ]
  },
  dutySummary: {
    overview: "Guzy OUN są najczęstszymi nowotworami litymi u dzieci. Ponad 55-60% guzów u dzieci rozwija się w tylnym dole czaszki (podnamiotowo). Najczęstszym złośliwym guzem mózgu wieku dziecięcego jest Rdzeniak (Medulloblastoma, WHO G4 – szczyt 3-7 lat). Guz wywodzi się z robaka móżdżku, zamyka komorę IV wywołując wodogłowie obturacyjne, oraz ma tendencję do wczesnego rozsiewu drogą PMR (drop metastases).",
    diagnostics: "1. Pilne badanie neuroobrazowe (TK głowy w trybie ostrodyżurowym lub MRI mózgowia z kontrastem jako złoty standard).<br>2. Pełny MRI całego kanału kręgowego (Spine MRI) z kontrastem – obligatoryjny staging w poszukiwaniu przerzutów kropelkowych wzdłuż nici rdzenia.<br>3. Badanie okulistyczne dna oka – ocena obecności tarczy zastoinowej (papilledema).<br>4. Badanie cytologiczne płynu mózgowo-rdzeniowego (pobrany podczas operacji lub drogą LP po odbarczeniu ciasnoty).<br>5. PUNKCJA LĘDŹWIOWA PRZED BADANIEM OBRAZOWYM JEST BEZWZGLĘDNIE PRZECIWWSKAZANA z powodu ryzyka śmiertelnego wklinowania móżdżku!",
    drugsAndDoses: "1. Leczenie przeciwobrzękowe w ciasnocie wewnątrzczaszkowej:<br>   - <span class='dose-pill'>Deksametazon 0,5-1,0 mg/kg m.c./dobę i.v. w 4 dawkach podzielonych</span> (redukuje obrzęk naczyniopochodny mózgu).<br>   - <span class='dose-pill'>Mannitol 20% 0,5-1,0 g/kg m.c. i.v. we wlewie 20-30 min</span> w ostrym wzroście ICP.<br>2. Neuroprotekcja ułożeniowa: elewacja wezgłowia łóżka o 30° w linii pośrodkowej.<br>3. Chemioterapia adiuwantowa w Medulloblastoma (protokoły HIT/SIOP):<br>   - <span class='dose-pill'>Cisplatyna 70 mg/m² i.v.</span> + <span class='dose-pill'>Etopozyd</span> + <span class='dose-pill'>Cyklofosfamid</span> + <span class='dose-pill'>Winkrystyna 1,5 mg/m² i.v.</span>.<br>4. Leki przeciwwymiotne w chemioterapii: <span class='dose-pill'>Ondansetron 0,15 mg/kg i.v.</span>.",
    procedures: "1. Zewnętrzny drenaż komorowy (EVD) lub wentrikulostomia endoskopowa komory III (ETV) w celu natychmiastowego odbarczenia ostrego wodogłowia.<br>2. Kraniotomia podpotyliczna i maksymalna bezpieczna resekcja mikrochirurgiczna masy nowotworowej pod kontrolą neuromonitoringu.<br>3. Radioterapia osi mózgowo-rdzeniowej (Craniospinal Irradiation - CSI) dawką 23,4-36 Gy z podwyższeniem dawki na lożę guza do 54-55,8 Gy (u dzieci >3. roku życia).<br>4. Intensywna rehabilitacja neurologiczna i logopedyczna w przypadku wystąpienia zespołu mutyzmu móżdżkowego.",
    monitoring: "1. Ciągłe monitorowanie parametrów życiowych (HR, BP, RR) w poszukiwaniu cech odruchu Cushinga (bradykardia + nadciśnienie).<br>2. Ocena stanu świadomości i funkcji pnia mózgu w skali Glasgow (GCS) lub pediatrycznej skali śpiączki co 1-2 godziny.<br>3. Okresowe kontrolne badania MRI mózgowia i kanału kręgowego co 3 miesiące przez pierwsze 2 lata po zakończeniu leczenia onkologicznego.<br>4. Monitorowanie endokrynologiczne (niedoczynność przysadki po radioterapii OUN – hormon wzrostu, TSH, ACTH, gonadotropiny) oraz audiologiczne (ototoksyczność cisplatyny)."
  },
  lekQuestions: [
    {
      question: "U 5-letniego chłopca od 3 tygodni występują codzienne, poranne chlustające wymioty na czczo przynoszące przejściową ulgę w bólu głowy, a w badaniu stwierdza się ataksję chodu i tarczę zastoinową. Najbardziej prawdopodobnym rozpoznaniem jest:",
      options: [
        "Guz tylnego dołu czaszki (np. medulloblastoma lub astrocytoma móżdżku)",
        "Refluks żołądkowo-przełykowy (GERD)",
        "Glistnica przewodu pokarmowego",
        "Wirusowe zapalenie błony naczyniowej oka",
        "Migrena brzuszna"
      ],
      correct: 0,
      expl: "Poranne, chlustające wymioty na czczo bez uprzednich nudności, przynoszące chwilową ulgę w bólu głowy, w połączeniu z tarczą zastoinową na dnie oka oraz zaburzeniami chodu (ataksją) to podręcznikowy obraz guza tylnego dołu czaszki ze wzmożonym ciśnieniem śródczaszkowym i ciasnotą móżdżkową."
    },
    {
      question: "Wykonanie nakłucia lędźwiowego (LP) u dziecka z podejrzeniem guza tylnego dołu czaszki i tarczą zastoinową na dnie oka PRZED badaniem neuroobrazowym jest:",
      options: [
        "Bezwzględnie przeciwwskazane z powodu ryzyka śmiertelnego wklinowania migdałków móżdżku do otworu wielkiego",
        "Wskazane natychmiast w celu odbarczenia podwyższonego ciśnienia śródczaszkowego",
        "Dozwolone wyłącznie po podaniu dożylnym 500 ml 5% glukozy",
        "Wskazane tylko w przypadku braku gorączki",
        "Obojętne dla rokowania pacjenta"
      ],
      correct: 0,
      expl: "Przy ciasnocie wewnątrzczaszkowej w dole tylnym nagłe obniżenie ciśnienia w kanale kręgowym przez punkcję lędźwiową wytwarza potężny gradient ciśnień. Skutkuje to natychmiastowym przemieszczeniem (wklinowaniem) migdałków móżdżku do otworu wielkiego czaszki, uciskiem na ośrodek oddechowy i krążenia w pniu mózgu oraz nagłym zgonem."
    },
    {
      question: "Klasyczna triada Cushinga świadcząca o krytycznie podwyższonym ciśnieniu śródczaszkowym (ICP) i zagrożeniu wgłobieniem pnia mózgu obejmuje:",
      options: [
        "Nadciśnienie tętnicze, bradykardię oraz nieregularny tor oddechowy",
        "Hipotensję, tachykardię oraz przyspieszony oddech Kussmaula",
        "Gorączkę, sztywność karku oraz światłowstręt",
        "Obrzęki obwodowe, białkomocz oraz hipercholesterolemię",
        "Wytrzeszcz oczu, wole tarczycowe oraz tachykardię"
      ],
      correct: 0,
      expl: "Triada Cushinga jest fizjologiczną odpowiedzią pnia mózgu na jego niedokrwienie w wyniku skrajnego wzrostu ciśnienia śródczaszkowego. Składa się z: 1. Nadciśnienia tętniczego (z poszerzeniem ciśnienia tętna), 2. Bradykardii, 3. Nieregularnych, spowolnionych oddechów (np. oddech Cheyne'a-Stokesa lub Biota)."
    },
    {
      question: "Najczęstszym nowotworem ZŁOŚLIWYM ośrodkowego układu nerwowego u dzieci jest:",
      options: [
        "Rdzeniak zarodkowy (Medulloblastoma)",
        "Gwiaździak włosowatokomórkowy (Pilocytic astrocytoma)",
        "Czaszkogardlak (Craniopharyngioma)",
        "Glejak wielopostaciowy (Glioblastoma multiforme)",
        "Oponiak (Meningioma)"
      ],
      correct: 0,
      expl: "Rdzeniak zarodkowy (Medulloblastoma, WHO G4) jest najczęstszym złośliwym guzem mózgu u dzieci, stanowiąc około 20% wszystkich guzów OUN u dzieci i blisko 40% guzów tylnego dołu czaszki. (Najczęstszym guzem mózgu w ogóle jest łagodny gwiaździak włosowatokomórkowy, WHO G1)."
    },
    {
      question: "U dziecka z nowo rozpoznanym Medulloblastoma bezwzględnie konieczne jest wykonanie rezonansu magnetycznego całego kanału kręgowego, ponieważ guz ten:",
      options: [
        "Często rozsiewa się drogą płynu mózgowo-rdzeniowego wzdłuż całej osi mózgowo-rdzeniowej (tzw. przerzuty kropelkowe)",
        "Zawsze wywodzi się pierwotnie z rdzenia kręgowego",
        "Niszczy trzony kręgowe drogą krążenia żylnego splotów Batsona",
        "Wywołuje wrodzoną przetokę oponowo-rdzeniową",
        "Wymaga profilaktycznego założenia gorsetu ortopedycznego"
      ],
      correct: 0,
      expl: "Medulloblastoma ma wyjątkową zdolność do złuszczania komórek do płynu mózgowo-rdzeniowego i tworzenia przerzutów oponowych wzdłuż całej osi OUN (drop metastases w kanale kręgowym obecne są u ok. 30% chorych już w chwili rozpoznania). Dlatego MRI całego kręgosłupa z kontrastem jest obligatoryjnym elementem stagingu."
    },
    {
      question: "Lekiem z grupy glikokortykosteroidów stosowanym z wyboru w celu zmniejszenia naczyniopochodnego obrzęku mózgu w przebiegu guza OUN u dziecka jest:",
      options: [
        "Deksametazon",
        "Hydrokortyzon",
        "Prednizon",
        "Budezonid",
        "Fludrokortyzon"
      ],
      correct: 0,
      expl: "Deksametazon jest lekiem z wyboru w leczeniu obrzęku mózgu wywołanego guzami OUN. Cechuje się silnym działaniem przeciwzapalnym, brakiem działania mineralokortykoidowego (nie zatrzymuje sodu i wody w ustroju) oraz doskonałą penetracją do tkanki mózgowej, co szybko uszczelnia barierę krew-mózg."
    },
    {
      question: "Gwiaździak włosowatokomórkowy (Pilocytic astrocytoma) w rezonansie magnetycznym móżdżku prezentuje się typowo jako:",
      options: [
        "Duża torbiel z silnie wzmacniającym się po podaniu kontrastu guzkiem przyściennym",
        "Lity guz w pniu mózgu bez torebki",
        "Mnogie zwapnienia w okolicy nadsiodłowej",
        "Rozlane zgrubienie opony twardej z objawem 'ogonka oponowego'",
        "Drobne ogniska demielinizacji w ciele modzelowatym"
      ],
      correct: 0,
      expl: "Pilocytic astrocytoma (WHO G1) w badaniu MRI mózgowia ma bardzo charakterystyczny obraz: jest to torbielowata zmiana w półkuli móżdżku zawierająca płyn, z intensywnie wzmacniającym się po podaniu gadolinu guzkiem przyściennym (mural nodule)."
    },
    {
      question: "Zespół mutyzmu móżdżkowego (Cerebellar Mutism Syndrome) po resekcji guza tylnego dołu czaszki u dziecka charakteryzuje się:",
      options: [
        "Opóźnioną o 24-48 h utratą zdolności mowy z towarzyszącą labilnością emocjonalną, ataksją i dysfagią",
        "Natychmiastową, całkowitą i nieodwracalną głuchotą odbiorczą",
        "Utratą wzroku w wyniku uszkodzenia promienistości wzrokowej",
        "Wiotkim porażeniem czterokończynowym z bezdechem",
        "Przemijającym napadem szału padaczkowego"
      ],
      correct: 0,
      expl: "Cerebellar Mutism Syndrome (CMS) rozwija się typowo po 1-2 dobach od operacji robaka móżdżku (uszkodzenie szlaków zębatkowo-wzgórzowo-korowych). Objawia się utratą mowy, skrajną chwiejnością emocjonalną (płaczliwość, apatia), ataksją i trudnościami w połykaniu. Choć mowa powraca po tygodniach/miesiącach, u części dzieci pozostają dyskretne deficyty."
    },
    {
      question: "Wodogłowie rozwijające się u dzieci z guzami dachu komory IV (jak rdzeniak) ma charakter:",
      options: [
        "Obturacyjny (niekomunikujący), wynikający z mechanicznego zablokowania przepływu PMR przez komorę IV",
        "Komunikujący, wynikający z nadprodukcji PMR przez sploty naczyniówkowe",
        "Resorpcyjny, wynikający z niedrożności ziarnistości pajęczynówki",
        "Normotensyjny (zespół Hakima)",
        "Ex vacuo, wynikający z zaniku kory mózgowej"
      ],
      correct: 0,
      expl: "Guz dachu komory IV fizycznie uciska i zatyka światło komory IV oraz odpływ przez otwory Luschki i Magendiego. Blokuje to drenaż PMR z komór bocznych i komory III do przestrzeni podpajęczynkowej, co definiuje klasyczne wodogłowie obturacyjne (niekomunikujące) z poszerzeniem układu trójkomorowego."
    },
    {
      question: "Z jakiego powodu u dzieci poniżej 3. roku życia z rozpoznaniem Medulloblastoma dąży się do uniknięcia radioterapii osi mózgowo-rdzeniowej (CSI)?",
      options: [
        "Z powodu druzgocącej neurotoksyczności dla rozwijającego się mózgowia, prowadzącej do głębokiej niepełnosprawności intelektualnej i zaburzeń endokrynnych",
        "Ponieważ rdzeniak u dzieci <3 r.ż. jest nowotworem całkowicie promienioopornym",
        "Z powodu 100% ryzyka natychmiastowej perforacji kości czaszki",
        "U dzieci <3 r.ż. nie ma technicznej możliwości ułożenia w aparacie terapeutycznym",
        "Radioterapia u małych dzieci wywołuje natychmiastową białaczkę szpikową"
      ],
      correct: 0,
      expl: "U dzieci poniżej 3 lat OUN podlega intensywnej mielinizacji i synaptogenezie. Napromienienie mózgowia i rdzenia w tym wieku powoduje katastrofalne, nieodwracalne uszkodzenia poznawcze (spadek IQ o kilkadziesiąt punktów), karłowatość popromienną i niewydolność wielohormonalną. Dlatego stosuje się u nich intensywną chemioterapię, odraczając lub eliminując CSI."
    },
    {
      question: "Który z poniższych objawów neurologicznych wskazuje na uszkodzenie półkuli móżdżku, a NIE robaka móżdżku?",
      options: [
        "Dysmetria (próba palec-nos) i drżenie zamiarowe po stronie uszkodzonej półkuli",
        "Ataksja tułowia z niemożnością utrzymania pozycji siedzącej",
        "Chód na szerokiej podstawie z padaniem w tył",
        "Oczopląs pionowy 'downbeat'",
        "Trudności w utrzymaniu pionowej pozycji głowy"
      ],
      correct: 0,
      expl: "Uszkodzenie robaka móżdżku (linia pośrodkowa) odpowiada za zespół osiowy: ataksję tułowia, chwiejność pozycji siedzącej i chód marynarski z padaniem do tyłu. Z kolei uszkodzenie półkuli móżdżku odpowiada za objawy jednostronne, tożstronne (ipsilateralne) w kończynach: dysmetrię, dysdiadochokinezę i drżenie zamiarowe."
    }
  ],
  flashcards: [
    {
      front: "Wymień triadę objawów wzmożonego ciśnienia śródczaszkowego (ICP) u dzieci z guzami mózgu.",
      back: "1. Poranne bóle głowy (nasilające się w pozycji leżącej i przy kaszlu)\n2. Poranne chlustające wymioty na czczo (przynoszące chwilową ulgę w bólu)\n3. Tarcza zastoinowa (obrzęk tarczy nerwu wzrokowego na dnie oka)."
    },
    {
      front: "Co wchodzi w skład triady Cushinga i o czym świadczy jej obecność?",
      back: "1. Nadciśnienie tętnicze (z poszerzeniem amplitudy)\n2. Bradykardia\n3. Nieregularny, spowolniony oddech.\nŚwiadczy o krytycznym ucisku/niedokrwieniu pnia mózgu i bezpośrednim zagrożeniu śmiertelnym wklinowaniem."
    },
    {
      front: "Dlaczego u dziecka z podejrzeniem guza móżdżku PUNKCJA LĘDŹWIOWA jest bezwzględnie przeciwwskazana?",
      back: "Wytwarza gwałtowny gradient ciśnień między jamą czaszki a kanałem kręgowym, prowadząc do natychmiastowego wklinowania migdałków móżdżku do otworu wielkiego i zatrzymania krążenia/oddechu."
    },
    {
      front: "Jaki jest najczęstszy złośliwy guz mózgu u dzieci i skąd się wywodzi?",
      back: "Rdzeniak zarodkowy (Medulloblastoma, WHO G4) – wywodzi się z niedojrzałych komórek embrionalnych robaka móżdżku w dachu komory IV."
    },
    {
      front: "Dlaczego w stagingu Medulloblastoma obowiązkowy jest rezonans magnetyczny CAŁEGO kręgosłupa?",
      back: "Guz złuszcza komórki do płynu mózgowo-rdzeniowego, dając tzw. przerzuty kropelkowe (drop metastases) wzdłuż opon rdzenia kręgowego i ogona końskiego."
    },
    {
      front: "Jakie leczenie przeciwobrzękowe należy wdrożyć w zespole ciasnoty wewnątrzczaszkowej wywołanej guzem mózgu?",
      back: "Uniesienie wezgłowia o 30 stopni + Deksametazon dożylnie (0,5-1 mg/kg/d) + w ostrym wzroście ICP wlew 20% Mannitolu (0,5-1 g/kg)."
    }
  ]
};

// Mirror fields for schema compatibility
case124.steps.forEach(step => {
  step.question = step.title;
  step.explanation = step.feedback;
});
case124.lekQuestions.forEach(q => {
  q.opts = q.options;
  q.correctIdx = q.correct;
  q.exp = q.expl;
});

saveCase(case124);

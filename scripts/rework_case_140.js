const fs = require('fs');
const path = require('path');
const { encryptStringAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

const case140 = {
  id: 140,
  dept: "Chirurgia ogólna",
  title: "Pęknięty tętniak aorty brzusznej (rAAA – Ruptured Abdominal Aortic Aneurysm)",
  shortTitle: "71-letni Henryk – Nagły, rozdzierający ból lędźwiowo-brzuszny, hipotensja i tętniący guz w brzuchu (Pęknięty tętniak aorty brzusznej / rAAA)",
  diagnosisTitle: "Pęknięty tętniak aorty brzusznej (rAAA) do przestrzeni zaotrzewnowej – wstrząs krwotoczny, triada objawów, hipotensja kontrolowana, pilny EVAR vs operacja otwarta",
  vitals: [
    { name: "Częstość akcji serca", val: "122/min", status: "vital-crit" },
    { name: "Ciśnienie tętnicze", val: "82/50 mmHg", status: "vital-crit" },
    { name: "Temperatura ciała", val: "35.8 °C", status: "vital-warn" },
    { name: "Saturacja SpO2", val: "94%", status: "vital-warn" }
  ],
  vitalsObj: {
    hr: 122,
    bp: "82/50",
    spo2: 94,
    rr: 24,
    temp: 35.8,
    gcs: 14
  },
  story: "<p><strong>Pacjent:</strong> 71-letni mężczyzna, wieloletni palacz tytoniu, został przywieziony w trybie natychmiastowym przez ZRM na SOR z powodu nagłego, potężnego, rozdzierającego bólu w okolicy lędźwiowo-krzyżowej i lewym boku brzucha, który wystąpił nagle ok. 60 minut temu podczas prac przydomowych i doprowadził do krótkotrwałej utraty przytomności.</p><p><strong>Wywiad chorobowy:</strong> W wywiadzie ponad 45 lat palenia papierosów (50 paczkolat), źle kontrolowane nadciśnienie tętnicze, uogólniona miażdżyca oraz przebyty zawał serca (NSTEMI) przed 4 laty. Pacjent nigdy nie miał wykonywanego USG jamy brzusznej ani badań przesiewowych. Przytomny, skrajnie osłabiony, odczuwa silne parcenie na stolec, duszność oraz suchość w ustach. Neguje uraz mechaniczny.</p><p><strong>Badanie przedmiotowe na SOR:</strong> Pacjent blady, wlany zimnym potem, podsypiający. Obwodowe części kończyn blade i sine, nawrót kapilarny wydłużony do 4 sekund. W badaniu jamy brzusznej: brzuch nieco wzdęty, w śródbrzuszu i po stronie lewej głęboko wyczuwalny potężny, twardy, tętniący synchronicznie z sercem bolesny opór (guz) o średnicy szacowanej na >8 cm; silna bolesność uciskowa i obrona mięśniowa w lewym boku. Odgłos opukowy stłumiony w lewym boku (objaw krwiaka zaotrzewnowego). Tętno na obu tętnicach udowych i obwodowych stóp nitkowate, trudne do zbadania. HR 122/min miarowe, BP 82/50 mmHg, RR 24/min, SpO2 94%.</p>",
  labs: [
    {
      name: "Morfologia krwi i hemostaza",
      items: [
        { name: "Hemoglobina (Hb)", val: "8.4 g/dl", norm: "13.5 - 17.5 g/dl", flag: "CRIT_LOW" },
        { name: "Hematokryt (Hct)", val: "26.2 %", norm: "40.0 - 52.0 %", flag: "CRIT_LOW" },
        { name: "Erytrocyty (RBC)", val: "2.8 T/l", norm: "4.3 - 5.9 T/l", flag: "LOW" },
        { name: "Leukocyty (WBC)", val: "15.8 G/l", norm: "4.0 - 10.0 G/l", flag: "HIGH" },
        { name: "Płytki krwi (PLT)", val: "142 G/l", norm: "150 - 400 G/l", flag: "LOW" },
        { name: "Fibrynogen", val: "1.6 g/l", norm: "2.0 - 4.0 g/l", flag: "LOW" },
        { name: "INR", val: "1.38", norm: "0.8 - 1.2", flag: "HIGH" }
      ]
    },
    {
      name: "Gazometria krwi tętniczej (wstrząs krwotoczny)",
      items: [
        { name: "pH", val: "7.26", norm: "7.35 - 7.45", flag: "CRIT_LOW" },
        { name: "pCO2", val: "30 mmHg", norm: "35 - 45 mmHg", flag: "LOW" },
        { name: "HCO3-", val: "14.2 mmol/l", norm: "22.0 - 26.0 mmol/l", flag: "CRIT_LOW" },
        { name: "Base Excess (BE)", val: "-10.8 mmol/l", norm: "-2.5 - +2.5 mmol/l", flag: "CRIT_LOW" },
        { name: "Mleczany (Lactate)", val: "4.8 mmol/l", norm: "0.5 - 1.6 mmol/l", flag: "CRIT_HIGH" }
      ]
    },
    {
      name: "Biochemia i próba zgodności",
      items: [
        { name: "Kreatynina", val: "1.65 mg/dl", norm: "0.7 - 1.2 mg/dl", flag: "HIGH" },
        { name: "Mocznik", val: "54 mg/dl", norm: "15 - 45 mg/dl", flag: "HIGH" },
        { name: "Sód", val: "138 mmol/l", norm: "135 - 145 mmol/l", flag: "NORMAL" },
        { name: "Potas", val: "4.7 mmol/l", norm: "3.5 - 5.0 mmol/l", flag: "NORMAL" },
        { name: "Grupa krwi", val: "0 RhD-ujemny (zamówiono MTP na cito)", norm: "-", flag: "NORMAL" }
      ]
    }
  ],
  steps: [
    {
      title: "Krok 1: Wstępna ocena kliniczna i klasyczna triada pękniętego tętniaka",
      text: "Lekarz natychmiast rozpoznaje stan zagrożenia życia. Jakie objawy tworzą klasyczną triadę objawów pękniętego tętniaka aorty brzusznej (rAAA) i jaki odsetek chorych prezentuje pełną triadę w chwili przyjęcia?",
      options: [
        "Nagły, silny ból brzucha lub okolicy lędźwiowej, wstrząs hipowolemiczny (hipotensja, tachykardia) oraz wyczuwalny tętniący guz w jamie brzusznej; pełna triada występuje u ok. 30-50% pacjentów",
        "Wysoka gorączka, żółtaczka i ból w prawym podżebrzu (triada Charcota) u 100% chorych",
        "Wole naczyniowe, wytrzeszcz oczu i tachykardia u 80% chorych",
        "Triada Becka: wyciszenie tonów serca, hipotensja i poszerzenie żył szyjnych u 95% chorych"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Klasyczna triada pękniętego tętniaka aorty brzusznej (rAAA) obejmuje:</strong><br>1. <strong>Nagły, silny ból brzucha, pleców lub okolicy lędźwiowo-krzyżowej</strong> (często promieniujący do pachwin lub jąder, imitujący kolkę nerkową!).<br>2. <strong>Hipotensję / wstrząs krwotoczny</strong> (omdlenie, tachykardia, bladość, poty).<br>3. <strong>Wyczuwalny palpacyjnie tętniący guz w jamie brzusznej</strong>.<br><em>Bardzo ważne:</em> Pełna triada występuje jedynie u <strong>30-50% pacjentów</strong>! U pozostałych chorych pęknięty tętniak bywa tragicznie mylony z kolką nerkową, ostrym zapaleniem uchyłków, zawałem serca lub rwą kulszową.",
        "❌ BŁĄD! <strong>Triada Charcota dotyczy ostrego zapalenia dróg żółciowych.</strong>",
        "❌ BŁĄD! <strong>To triada Merseburska w chorobie Gravesa-Basedowa.</strong>",
        "❌ BŁĄD! <strong>Triada Becka charakteryzuje tamponadę serca.</strong>"
      ]
    },
    {
      title: "Krok 2: Strategia resuscytacji płynowej – Hipotensja kontrolowana (Permissive Hypotension)",
      text: "Pacjent ma ciśnienie 82/50 mmHg, jest przytomny i logiczny. Pielęgniarka pyta, czy podłączyć 3 litry płynów pod ciśnieniem, aby podnieść ciśnienie do 130/80 mmHg. Jaka jest współczesna, ratująca życie doktryna płynoterapii w pękniętym tętniaku aorty?",
      options: [
        "Stosowanie hipotensji kontrolowanej (permissive hypotension) – utrzymywanie skurczowego ciśnienia tętniczego (SBP) na poziomie 70-90 mmHg (MAP ok. 50-65 mmHg) u przytomnego chorego; agresywne podnoszenie ciśnienia i podawanie dużych objętości krystaloidów jest bezwzględnie zakazane!",
        "Natychmiastowe przetoczenie 4000 ml zimnej soli fizjologicznej i włączenie noradrenaliny celem osiągnięcia SBP >150 mmHg",
        "Podanie leków moczopędnych w celu obniżenia ciśnienia krwi do zera",
        "Całkowity brak dostępu naczyniowego aż do otwarcia powłok na bloku"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Hipotensja kontrolowana (przyzwalająca – permissive hypotension) jest fundamentalną zasadą w zaopatrywaniu pękniętego tętniaka aorty brzusznej!</strong> Pęknięcie aorty początkowo jest często ograniczone i zatamowane przez krwiak w przestrzeni zaotrzewnowej (retroperitoneal tamponade). <strong>Gwałtowne podniesienie ciśnienia tętniczego (SBP >90-100 mmHg) lub agresywne wlewy krystaloidów 'wypłukują' wytworzony skrzep hemostatyczny (tzw. 'pop the clot'), rozcieńczają czynniki krzepnięcia (koagulopatia z rozcieńczenia) i wywołują katastrofalne, niekontrolowane pęknięcie do wolnej jamy otrzewnej ze zgonem na korytarzu!</strong> Dopóki chory jest przytomny i zachowuje kontakt (perfuzja mózgu i serca jest zachowana), toleruje się SBP 70-90 mmHg.",
        "❌ BŁĄD! <strong>Agresywne przetaczanie płynów pod ciśnieniem 'wypłukuje' skrzep w zaotrzewnej i powoduje natychmiastowe wykrwawienie!</strong>",
        "❌ BŁĄD! <strong>Leki moczopędne pogłębiłyby śmiertelny wstrząs hipowolemiczny.</strong>",
        "❌ BŁĄD! <strong>Dostęp naczyniowy o dużym świetle jest bezwzględnie konieczny do podania krwi i leków.</strong>"
      ]
    },
    {
      title: "Krok 3: Szybka diagnostyka: USG przyłóżkowe vs Pilna Angio-TK",
      text: "Lekarz dyżurny decyduje o badaniach obrazowych. Jak wygląda prawidłowy algorytm kwalifikacji do badań obrazowych w podejrzeniu pękniętego tętniaka aorty brzusznej?",
      options: [
        "Natychmiastowe przyłóżkowe USG (POCUS) na sali reanimacyjnej potwierdzające obecność poszerzenia aorty (>30-50 mm); u pacjenta stabilnego/respondera wykonuje się natychmiastową pilną Angio-TK celem oceny anatomii pod kątem zabiegu EVAR; u pacjenta w skrajnym wstrząsie bez odpowiedzi na krew – natychmiastowy transport na blok operacyjny",
        "Zlecenie badania RTG przeglądowego na stojąco i oczekiwanie na opis radiologa",
        "Skierowanie na planowy rezonans magnetyczny miednicy w terminie 14 dni",
        "Wykonanie biopsji cienkoigłowej ściany tętniaka pod kontrolą USG"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Algorytm postępowania diagnostycznego:</strong><br>1. <strong>USG przyłóżkowe (POCUS) na SOR:</strong> w ciągu 60 sekund potwierdza obecność tętniaka aorty brzusznej (średnica >3,0 cm, często >5,5-8 cm). USG nie wyklucza pęknięcia, ale w połączeniu z hipotensją i bólem daje niemal 100% pewność rozpoznania klinicznego.<br>2. <strong>Pacjent hemodynamicznie stabilny lub 'responder' (SBP 70-90 mmHg):</strong> transport na pilną Angio-TK aorty (angio-CT) – jest to kluczowe badanie do oceny tzw. szyi tętniaka i kwalifikacji do małoinwazyjnego stentgraftu (EVAR).<br>3. <strong>Pacjent w stanie skrajnej niestabilności (zatrzymanie krążenia, brak odpowiedzi na preparaty krwi):</strong> natychmiastowy transfer na salę operacyjną bez tracenia czasu na tomografię!",
        "❌ BŁĄD! <strong>Przeglądowe RTG nie pozwala na ocenę aorty ani pęknięcia.</strong>",
        "❌ BŁĄD! <strong>MRI trwa zbyt długo (>45 min) i jest bezwzględnie przeciwwskazane w ostrym krwotoku naczyniowym.</strong>",
        "❌ BŁĄD! <strong>Nakłucie tętniaka to błąd w sztuce i natychmiastowe uśmiercenie pacjenta.</strong>"
      ]
    },
    {
      title: "Krok 4: Anatomia pęknięcia i przetoki naczyniowe",
      text: "Pęknięcie tętniaka może nastąpić w różnych kierunkach anatomicznych. Gdzie najczęściej dochodzi do pęknięcia tętniaka aorty brzusznej i jakie nietypowe powikłania przetokowe mogą wystąpić?",
      options: [
        "Najczęściej (ok. 80%) dochodzi do pęknięcia lewostronnego do przestrzeni zaotrzewnowej (co stwarza szansę na czasową tamponadę i przeżycie transportu); rzadziej dochodzi do wolnego pęknięcia do jamy otrzewnej (zgon w kilka minut) lub wytworzenia przetoki aortalno-dwunastniczej (masywne UGIB) bądź aortalno-czczej (niewydolność krążenia z wysokim rzutem i sinica nóg)",
        "Pęknięcie tętniaka zawsze następuje do pęcherza moczowego",
        "Tętniak pęka wyłącznie do kanału kręgowego odcinka szyjnego",
        "Aorta brzuszna pęka bezpośrednio do lewej komory serca"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>W ok. 80% przypadków pęknięcie następuje przez tylno-boczną lewą ścianę aorty do przestrzeni zaotrzewnowej (retroperitoneum).</strong> Ciśnienie otaczających tkanek zaotrzewnowych może czasowo zahamować krwotok (tamponada krwiaka), dając chirurgom cenny czas na dowiezienie chorego na blok operacyjny. W 20% pęknięcie następuje do jamy otrzewnej (brak oporu tkanek -> natychmiastowe wykrwawienie i zgon na miejscu zdarzenia). Nietypowe formy to: <strong>przetoka aortalno-dwunastnicza (Aorto-Enteric Fistula)</strong> z masywnym krwawieniem z górnego odcinka przewodu pokarmowego oraz <strong>przetoka aortalno-czcza (Aorto-Caval Fistula do IVC)</strong> z objawami ostrej niewydolności prawokomorowej i obrzękiem siniczym nóg.",
        "❌ BŁĄD! <strong>Pęknięcie do pęcherza moczowego to skrajny ewenement, a nie reguła.</strong>",
        "❌ BŁĄD! <strong>Kanał szyjny leży poza zasięgiem aorty brzusznej.</strong>",
        "❌ BŁĄD! <strong>Aorta brzuszna leży poniżej przepony i nie ma kontaktu z jamami serca.</strong>"
      ]
    },
    {
      title: "Krok 5: Resuscytacja hemostatyczna i zwalczanie letalnej triady",
      text: "Na SOR wdrożono protokół masywnej transfuzji (MTP). Na czym polega hemostatyczna resuscytacja we wstrząsie krwotocznym i jak przeciwdziałać tzw. 'śmiertelnej triadzie' urazowo-krwotocznej?",
      options: [
        "Zrównoważone przetaczanie preparatów krwi w stosunku 1:1:1 (KKCz : FFP : KKP), wczesne podanie kwasu traneksamowego (TXA), aktywny montaż ogrzewaczy płynów i pacjenta (walka z hipotermią) oraz suplementacja wapnia (celem zwalczania kwasicy, hipotermii i koagulopatii)",
        "Podawanie wyłącznie 5% glukozy w dawce 500 ml/h",
        "Przetaczanie wyłącznie koncentratu krwinek czerwonych bez osocza i płytek",
        "Schładzanie pacjenta workami z lodem do temperatury 32°C celem obniżenia metabolizmu"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>'Śmiertelna triada' (Lethal Triad: hipotermia, kwasica, koagulopatia) odpowiada za większość zgonów we wstrząsie krwotocznym.</strong> Każdy spadek temperatury ciała o 1°C obniża aktywność kaskady krzepnięcia o 10%. Z tego powodu hemostatyczna resuscytacja obejmuje:<br>1. <strong>Protokół MTP 1:1:1:</strong> 1 j. KKCz : 1 j. świeżo mrożonego osocza (FFP) : 1 j. koncentratu krwinek płytkowych (KKP).<br>2. <strong>Kwas traneksamowy:</strong> <span class='dose-pill'>TXA 1 g i.v. bolus</span> w ciągu pierwszych minut, następnie wlew 1 g przez 8 h.<br>3. <strong>Ogrzewanie:</strong> koce grzewcze, podgrzewacze płynów infuzyjnych (cel temp. >36°C).<br>4. <strong>Wapń:</strong> <span class='dose-pill'>Chlorek lub glukonian wapnia 1-2 g i.v.</span> (cytrynian w preparatach krwi chelatuje wapń, pogłębiając atonię serca i koagulopatię).",
        "❌ BŁĄD! <strong>Glukoza 5% nie ma żadnej wartości wolumetrycznej i wywoła obrzęk mózgu.</strong>",
        "❌ BŁĄD! <strong>Samo KKCz bez osocza i płytek doprowadzi do śmiertelnej koagulopatii z rozcieńczenia!</strong>",
        "❌ BŁĄD! <strong>Hipotermia blokuje enzymy krzepnięcia i jest jednym z elementów letalnej triady.</strong>"
      ]
    },
    {
      title: "Krok 6: Wybór techniki operacyjnej: EVAR vs Operacja otwarta",
      text: "Angio-TK wykazała pęknięcie tętniaka podnerkowego o średnicy 8,2 cm z obecnością szyi tętniaka o długości 18 mm. Jakie są obecnie rekomendacje europejskich towarzystw naczyniowych (ESVS) dotyczące wyboru metody operacyjnej w rAAA?",
      options: [
        "Zaopatrzenie wewnątrznaczyniowe (rEVAR – Ruptured Endovascular Aneurysm Repair) jest preferowaną metodą pierwszego rzutu, o ile warunki anatomiczne są odpowiednie i ośrodek dysponuje doświadczonym zespołem i zapleczem sprzętowym; operacja otwarta z wszczepieniem protezy naczyniowej pozostaje standardem w razie braku warunków anatomicznych",
        "Zabiegi wewnątrznaczyniowe są bezwzględnie zakazane w pękniętych tętniakach",
        "Standardem jest wyłącznie wycięcie aorty bez wszywania jakiejkolwiek protezy",
        "Operacja otwarta jest zabiegiem o 0% śmiertelności i powinna być wykonywana u każdego chorego"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Wytyczne ESVS (European Society for Vascular Surgery) jednoznacznie rekomendują rEVAR (Endovascular Aneurysm Repair) jako metodę pierwszego rzutu w zaopatrywaniu pękniętych tętniaków aorty brzusznej, jeśli anatomia naczynia na to pozwala i szpital posiada odpowiedni sprzęt oraz wykwalifikowany zespół.</strong> rEVAR wykonuje się przez nakłucie tętnic udowych, często w znieczuleniu miejscowym/sedacji, z możliwością natychmiastowego zamknięcia aorty balonem okluzyjnym (REBOA) od wewnątrz w razie załamania ciśnienia. Wiąże się to ze znacząco niższą śmiertelnością okołooperacyjną (ok. 15-25% vs 35-50% w operacji otwartej). W razie niesprzyjającej anatomii (np. brak szyi podnerkowej) wykonuje się klasyczną operację otwartą z zaklemowaniem aorty i wszyciem protezy prostej lub rozwidlonej (bifurkacyjnej).",
        "❌ BŁĄD! <strong>rEVAR jest obecnie metodą preferowaną w pękniętych tętniakach w większości wiodących ośrodków.</strong>",
        "❌ BŁĄD! <strong>Wycięcie aorty bez odtworzenia ciągłości naczyniowej odcina dopływ krwi do kończyn i miednicy, powodując zgon.</strong>",
        "❌ BŁĄD! <strong>Operacja otwarta w rAAA niesie bardzo wysoką śmiertelność okołooperacyjną sięgającą 35-50%.</strong>"
      ]
    },
    {
      title: "Krok 7: Śmiertelne powikłanie pooperacyjne – Zespół ciasnoty wewnątrzbrzusznej (ACS)",
      text: "Po udanym zaopatrzeniu pękniętego tętniaka pacjent trafia na OIT. W 6. godzinie po zabiegu dochodzi do gwałtownego spadku diurezy (<10 ml/h), wzrostu ciśnienia szczytowego w drogach oddechowych i hipotonii. Ciśnienie w pęcherzu moczowym (IAP) wynosi 24 mmHg. Jakie powikłanie wystąpiło i jak należy je natychmiast leczyć?",
      options: [
        "Zespół ciasnoty wewnątrzbrzusznej (Abdominal Compartment Syndrome – ACS); wymaga natychmiastowej dekompresyjnej laparotomii ratunkowej z pozostawieniem 'brzucha otwartego' (laparostomia z opatrunkiem podciśnieniowym VAC)",
        "Odmę opłucnową prężną leczoną drenażem opłucnej w II przestrzeni międzyżebrowej",
        "Zator tętnicy płucnej leczony natychmiastową trombolizą dożylną",
        "Fizjologiczny stan pooperacyjny niewymagający żadnych działań"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Zespół ciasnoty wewnątrzbrzusznej (Abdominal Compartment Syndrome – ACS) jest groźnym powikłaniem po operacjach rAAA (zwłaszcza po przetoczeniu dużych objętości płynów i krwi oraz obecności masywnego krwiaka zaotrzewnowego).</strong> Definiuje się go jako <strong>utrzymujące się ciśnienie śródbrzuszne (IAP) >20 mmHg mierzone w pęcherzu moczowym, ze współistnieniem nowo powstałej niewydolności narządowej</strong> (skąpomocz, trudności z wentylacją, spadek rzutu serca przez ucisk na IVC). Jedynym ratującym życie leczeniem w rozwiniętym ACS jest <strong>natychmiastowa laparotomia odbarczająca (surgical decompression)</strong> i prowadzenie chorego metodą 'brzucha otwartego' (laparostomia) z czasowym zamknięciem powłok za pomocą terapii podciśnieniowej (VAC / ABThera).",
        "❌ BŁĄD! <strong>Wzrost IAP >20 mmHg i niewydolność nerek to klasyczny ACS, a nie odma opłucnowa.</strong>",
        "❌ BŁĄD! <strong>Tromboliza u chorego po operacji naczyniowej wywołałaby natychmiastowe śmiertelne wykrwawienie!</strong>",
        "❌ BŁĄD! <strong>ACS bez dekompresji chirurgicznej prowadzi do 100% zgonu w wyniku wielonarządowej niewydolności (MODS).</strong>"
      ]
    },
    {
      title: "Krok 8: Badania przesiewowe i wskazania do planowej operacji tętniaków aorty",
      text: "Lekarz omawia z zespołem profilaktykę tętniaków aorty. Jakie są obecnie wytyczne dotyczące badań przesiewowych (screening) oraz jakie są standardowe wymiary kwalifikujące do PLANOWEGO leczenia operacyjnego bezobjawowego tętniaka aorty brzusznej (AAA)?",
      options: [
        "Jednorazowe badanie USG aorty u wszystkich mężczyzn w wieku 65-74 lat palących tytoń; wskazaniem do planowej operacji jest średnica tętniaka >=55 mm u mężczyzn oraz >=50 mm u kobiet (lub szybki wzrost >10 mm/rok bądź tętniak objawowy)",
        "Planowe operacje wykonuje się dopiero wtedy, gdy tętniak osiągnie średnicę 12 cm",
        "Wszyscy ludzie po 40. roku życia powinni mieć profilaktycznie wszczepiany stentgraft aortalny",
        "Badania przesiewowe nie mają żadnego sensu i nie zmniejszają umieralności"
      ],
      feedback: [
        "✅ PRAWIDŁOWO! <strong>Zasady screeningu i kwalifikacji do planowej operacji AAA (wg wytycznych ESVS / polskich zaleceń):</strong><br>1. <strong>Screening:</strong> jednorazowe przesiewowe USG jamy brzusznej zaleca się u wszystkich <strong>mężczyzn w wieku 65-74 lat</strong>, którzy kiedykolwiek palili tytoń (oraz u osób z wywiadem rodzinnym tętniaków).<br>2. <strong>Próg operacyjny planowy:</strong><br>   - Mężczyźni: średnica tętniaka <strong>>= 55 mm (5,5 cm)</strong>.<br>   - Kobiety: średnica tętniaka <strong>>= 50 mm (5,0 cm)</strong> (u kobiet ściana aorty jest cieńsza i pęka przy mniejszych średnicach!).<br>   - Niezależnie od średnicy: szybki wzrost tętniaka (<strong>>10 mm na rok</strong> lub <strong>>5 mm w ciągu 6 miesięcy</strong>) oraz każdy tętniak dający objawy bólowe!",
        "❌ BŁĄD! <strong>Przy średnicy 12 cm ryzyko pęknięcia wynosi >50-80% rocznie; operuje się znacznie wcześniej (od 50-55 mm).</strong>",
        "❌ BŁĄD! <strong>Nie wszczepia się stentgraftów profilaktycznie przy prawidłowej aorcie (<30 mm).</strong>",
        "❌ BŁĄD! <strong>Screening USG u palaczy redukuje umieralność z powodu pęknięcia tętniaka o ponad 40-50%!</strong>"
      ]
    }
  ],
  pathoNodes: [
    {
      badge: "Destrukcja elastyny",
      title: "Proteoliza ściany i formowanie tętniaka",
      short: "Nadekspresja metaloproteinaz (MMP-2, MMP-9) i degradacja ECM",
      detail: "Przewlekły proces zapalny wywołany dymem tytoniowym i nadciśnieniem aktywuje makrofagi do produkcji enzymów proteolitycznych niszczących włókna sprężyste w błonie środkowej (tunica media). Aorta traci sprężystość i ulega wrzecionowatemu rozszerzeniu.",
      target: "Błona środkowa aorty brzusznej",
      drugTarget: "<span class='dose-pill'>Rzucenie palenia</span> i ścisła kontrola ciśnienia tętniczego"
    },
    {
      badge: "Pęknięcie torebki",
      title: "Przerwanie ciągłości ściany i krwotok",
      short: "Przekroczenie wytrzymałości na rozciąganie w strefie szczytowej",
      detail: "Gdy naprężenie ściany (zgodnie z prawem Laplace'a) przekroczy mechaniczną wytrzymałość zdegenerowanej tkanki łącznej, dochodzi do pęknięcia. Najczęściej krew wylewa się do lewej przestrzeni zaotrzewnowej.",
      target: "Ściana tylno-boczna aorty podnerkowej",
      drugTarget: "<span class='dose-pill'>Hipotensja kontrolowana SBP 70-90 mmHg</span> ochrona skrzepu zaotrzewnowego"
    },
    {
      badge: "Koagulopatia wstrząsu",
      title: "Śmiertelna triada urazowo-krwotoczna",
      short: "Interakcja kwasicy mleczanowej, hipotermii i utraty czynników",
      detail: "Masywna utrata krwi i niedotlenienie tkanek prowadzą do kwasicy i hipotermii. Czynniki te paraliżują enzymy kaskady krzepnięcia krwi, wywołując ciężką koagulopatię ze zużycia i rozcieńczenia.",
      target: "Układ hemostazy i perfuzja tkankowa",
      drugTarget: "<span class='dose-pill'>MTP 1:1:1 (KKCz:FFP:KKP)</span> + <span class='dose-pill'>TXA 1 g i.v.</span> + <span class='dose-pill'>Ogrzewanie chorego >36°C</span>"
    },
    {
      badge: "Wewnątrznaczyniowe zamknięcie",
      title: "Balonowanie aorty i implantacja stentgraftu",
      short: "Wewnątrznaczyniowa hemostaza metodą rEVAR lub REBOA",
      detail: "Wprowadzenie balonu okluzyjnego REBOA do strefy I aorty pozwala na natychmiastowe zatrzymanie krwotoku od wewnątrz, umożliwiając bezpieczne rozprężenie bifurkacyjnego stentgraftu aortalnego.",
      target: "Światło aorty brzusznej i tętnic biodrowych",
      drugTarget: "<span class='dose-pill'>Stentgraft aortalny (rEVAR)</span> pilne wyłączenie tętniaka z krążenia"
    }
  ],
  diffTable: {
    title: "⚔️ Tabela Różnicowa: Pęknięty tętniak aorty brzusznej vs Inne ostre stany bólowe brzucha i wstrząsu",
    headers: ["Cecha kliniczna", "Pęknięty tętniak aorty brzusznej (rAAA)", "Ostre rozwarstwienie aorty (Stanford A / B)", "Kolka nerkowa (kamica moczowodowa)", "Perforacja wrzodu trawiennego", "Ostre niedokrwienie krezki (AMI)"],
    rows: [
      ["Charakterystyka bólu", "Nagły, rozdzierający ból lędźwiowy, brzuszny lub pachwinowy z nagłą zapaścią krążeniową", "Nagły, przeszywający ból w klatce piersiowej promieniujący między łopatki lub do pleców", "Ostry, falowy, kolkowy ból w okolicy lędźwiowej promieniujący do warg sromowych/jądra", "Nagły, potężny ból 'jak uderzenie sztyletem' w nadbrzuszu, szybko uogólniony", "Ekstremalny, stały ból w śródbrzuszu nieproporcjonalny do badania brzucha"],
      ["Ciśnienie tętnicze i wstrząs", "Ciężka hipotensja, wstrząs krwotoczny (SBP <80-90 mmHg), tachykardia", "Często ciężkie nadciśnienie (w Stanford B) lub asymetria ciśnień na ramionach (>20 mmHg)", "Prawidłowe ciśnienie lub nadciśnienie z bólu; brak wstrząsu", "Początkowo stabilne; wstrząs septyczny rozwija się po kilkunastu godzinach", "Początkowo stabilne z tachykardią; wstrząs septyczno-hipowolemiczny w zgorzeli"],
      ["Badanie palpacyjne brzucha", "Bolesny, pulsujący guz tętniący synchronicznie z sercem; opór w lewym boku", "Brzuch miękki, niebolesny (chyba że rozwarstwienie zamyka odgałęzienia trzewne)", "Objaw Goldflama dodatni; brzuch miękki, brak oporów patologicznych", "Brzuch 'deskowaty' (obrona mięśniowa), zanik stłumienia wątrobowego, objaw Blumberga", "Brzuch miękki, nieznacznie tkliwy przy krzykach pacjenta z bólu"],
      ["Obraz w USG / POCUS", "Poszerzenie aorty brzusznej (>50-80 mm) z widocznym krwiakiem zaotrzewnowym", "Poszerzenie aorty wstępującej lub obecność płynu w worku osierdziowym (tamponada)", "Zastój moczu (wodonercze) w UKM nerki; aorta o prawidłowej średnicy (<20-25 mm)", "Wolny płyn w przestrzeni podwątrobowej, objaw 'kurtyny powietrznej'", "Często brak specyficznych zmian w USG; drożność aorty brzusznej"],
      ["Morfologia i kwasica", "Gwałtowny spadek Hb/Hct, kwasica metaboliczna, mleczany >4-6 mmol/l", "Morfologia początkowo prawidłowa; możliwy wzrost D-dimerów", "Morfologia prawidłowa; w badaniu moczu krwinkomocz/erytrocyturia", "Wczesna leukocytoza; w RTG wolny gaz pod kopułami przepony (pneumoperitoneum)", "Wczesna i skrajna hiperlaktatemia (>5-10 mmol/l) z głęboką kwasicą metaboliczną"],
      ["Postępowanie pierwszego rzutu", "Hipotensja kontrolowana (SBP 70-90), MTP 1:1:1, pilny rEVAR lub laparotomia ratunkowa", "Labetalol i.v. celem obniżenia SBP do 100-120 mmHg; pilna kardiochirurgia w Stanford A", "Leki rozkurczowe (drotaweryna) i NLPZ i.v. (ketoprofen); brak zagrożenia życia", "Pilna laparotomia / laparoskopia z zaopatrzeniem perforacji (łata Grahama)", "Pilna embolektomia cewnikiem Fogarty'ego lub rewaskularyzacja endowaskularna"]
    ]
  },
  dutySummary: {
    overview: "Pęknięty tętniak aorty brzusznej (rAAA) jest stanem bezpośredniego zagrożenia życia o całkowitej śmiertelności sięgającej 80-90% (ponad 50% chorych umiera przed dotarciem do szpitala). Kluczem do przeżycia jest szybkie rozpoznanie, wdrożenie koncepcji hipotensji kontrolowanej (permissive hypotension cel SBP 70-90 mmHg) oraz natychmiastowe zaopatrzenie naczyniowe (rEVAR lub operacja otwarta).",
    diagnostics: "1. Ocena w protokole cABCDE: natychmiastowe wykluczenie wstrząsu krwotocznego i triady objawów (ból pleców, hipotensja, tętniący guz).<br>2. Przyłóżkowe USG (POCUS) na sali reanimacyjnej: potwierdzenie poszerzenia aorty brzusznej (>30-50 mm) w ciągu 60 sekund.<br>3. Pilna Angio-TK aorty brzusznej i tętnic biodrowych: wykonywana WYŁĄCZNIE u pacjentów stabilnych lub responderów (SBP 70-90 mmHg) celem oceny szyi tętniaka i kwalifikacji do rEVAR.<br>4. Monitorowanie laboratoryjne: natychmiastowa próba zgodności (zamówienie 6-10 j. KKCz grupy 0 Rh-ujemnej), gazometria (mleczany, pH, BE) oraz koagulologia (INR, fibrynogen).",
    drugsAndDoses: "1. Kwas traneksamowy: <span class='dose-pill'>TXA 1 g i.v. bolus w ciągu 10 min</span>, następnie wlew <span class='dose-pill'>1 g i.v. przez 8 godzin</span>.<br>2. Protokół MTP 1:1:1: jednoczesne przetaczanie <span class='dose-pill'>KKCz + FFP + KKP</span> w proporcji 1:1:1 z podgrzewacza krwi.<br>3. Suplementacja wapnia: <span class='dose-pill'>Chlorek wapnia (CaCl2) 1 g i.v.</span> po każdych 4 jednostkach preparatów krwi celem utrzymania Ca2+ zjonizowanego >1,1 mmol/l.<br>4. <span class='dose-pill'>Bezwzględny zakaz agresywnej płynoterapii krystaloidowej</span> i utrzymywanie hipotensji kontrolowanej SBP 70-90 mmHg do momentu założenia zacisku/stentgraftu!",
    procedures: "1. Natychmiastowe założenie 2 kaniul obwodowych o dużym świetle (14-16G) lub cewnika naczyniowego o wysokim przepływie (np. wkłucie dializacyjne / cewnik Sheatha).<br>2. Założenie balonu okluzyjnego REBOA do strefy I aorty piersiowej u niestabilnych chorych celem czasowego zatrzymania krwotoku od wewnątrz.<br>3. Pilne zaopatrzenie wewnątrznaczyniowe (rEVAR) – metoda z wyboru przy sprzyjających warunkach anatomicznych w ośrodkach naczyniowych.<br>4. Ratunkowa laparotomia z cięcia pośrodkowego z zaklemowaniem aorty podprzeponowo lub podnerkowo i wszyciem protezy naczyniowej (prostej lub rozwidlonej Dacron/PTFE).<br>5. Odbarczająca laparotomia ratunkowa (laparostomia) w przypadku wystąpienia pooperacyjnego zespołu ciasnoty wewnątrzbrzusznej (ACS).",
    monitoring: "1. Inwazyjny ciągły pomiar ciśnienia tętniczego (linia tętnicza IBP w tętnicy promieniowej).<br>2. Ścisłe monitorowanie temperatury głębokiej ciała (cel >36,0°C, aktywne ogrzewacze powietrzne i płynowe).<br>3. Seryjny pomiar ciśnienia w pęcherzu moczowym (IAP) na OIT co 2-4 godziny w celu wczesnego wykrycia ciasnoty wewnątrzbrzusznej (ACS przy IAP >20 mmHg).<br>4. Kontrola diurezy godzinowej przez cewnik moczowy oraz monitorowanie tętna obwodowego na stopach po zabiegu."
  },
  lekQuestions: [
    {
      question: "Klasyczna triada objawów pękniętego tętniaka aorty brzusznej (rAAA) obejmuje:",
      options: [
        "Nagły ból brzucha lub okolicy lędźwiowej, hipotensję/wstrząs oraz palpacyjnie wyczuwalny tętniący guz w jamie brzusznej",
        "Gorączkę z dreszczami, żółtaczkę mechaniczną i ból w prawym podżebrzu",
        "Wyciszenie tonów serca, poszerzenie żył szyjnych i hipotensję",
        "Ból głowy, wymioty chlustające i obrzęk tarczy nerwu wzrokowego",
        "Duszność wdechową, sinicę twarzy i krwioplucie"
      ],
      correct: 0,
      expl: "Klasyczna triada objawów pękniętego tętniaka aorty brzusznej (rAAA) to: nagły silny ból brzucha/pleców, hipotensja/wstrząs krwotoczny oraz wyczuwalny palpacyjnie bolesny, tętniący opór (guz) w jamie brzusznej. Należy pamiętać, że pełna triada występuje jedynie u 30-50% chorych."
    },
    {
      question: "Zgodnie z koncepcją hipotensji kontrolowanej (permissive hypotension) u przytomnego pacjenta z pękniętym tętniakiem aorty brzusznej, docelowe ciśnienie skurczowe (SBP) przed zamknięciem naczynia powinno wynosić:",
      options: [
        "70 - 90 mmHg",
        "130 - 150 mmHg",
        "160 - 180 mmHg",
        "Poniżej 40 mmHg",
        "Dokładnie 120/80 mmHg"
      ],
      correct: 0,
      expl: "Hipotensja kontrolowana (przyzwalająca) polega na utrzymywaniu skurczowego ciśnienia tętniczego w granicach 70-90 mmHg (lub średniego ciśnienia tętniczego MAP ok. 50-65 mmHg) u chorych zachowujących kontakt logiczny. Pozwala to na zachowanie perfuzji mózgu i serca bez ryzyka 'wypłukania' skrzepu zaotrzewnowego i zaostrzenia krwotoku."
    },
    {
      question: "Dlaczego agresywna płynoterapia i dążenie do normalizacji ciśnienia tętniczego (SBP >120-130 mmHg) przed chirurgicznym zaopatrzeniem rAAA jest błędem sztuki?",
      options: [
        "Wzrost ciśnienia krwi wypłukuje wytworzoną skrzeplinę w przestrzeni zaotrzewnowej, a duże objętości płynów nasilają koagulopatię z rozcieńczenia i hipotermię",
        "Powoduje natychmiastowe zrośnięcie zastawek aortalnych",
        "Prowadzi do ostrej martwicy kości długich kończyn dolnych",
        "Wywołuje zakażenie krwi bakteriami beztlenowymi",
        "Zmniejsza filtrację kłębuszkową w nerkach"
      ],
      correct: 0,
      expl: "Większość pęknięć rAAA jest początkowo czasowo hamowana przez krwiak w przestrzeni zaotrzewnowej. Gwałtowne podanie płynów pod ciśnieniem niszczy ten kruchy mechanizm tamponady ('pop the clot'), powodując wolne pęknięcie do jamy otrzewnej, a krystaloidy rozcieńczają płytki i osoczowe czynniki krzepnięcia."
    },
    {
      question: "Zgodnie z wytycznymi Europejskiego Towarzystwa Chirurgii Naczyniowej (ESVS), preferowaną metodą zaopatrzenia pękniętego tętniaka aorty brzusznej (rAAA) w ośrodkach z odpowiednim zapleczem i przy sprzyjających warunkach anatomicznych jest:",
      options: [
        "Pilne leczenie wewnątrznaczyniowe (rEVAR – Ruptured Endovascular Aneurysm Repair)",
        "Planowa operacja otwarta po 6 miesiącach rehabilitacji",
        "Terapia pijawkami lekarskimi i leczenie ułożeniowe",
        "Podanie dożylne leków trombolitycznych (streptokinaza)",
        "Wykonanie przeszczepu wątroby"
      ],
      correct: 0,
      expl: "Zgodnie z wytycznymi ESVS, endowaskularne zaopatrzenie tętniaka (rEVAR) jest rekomendowaną metodą pierwszego rzutu u chorych z rAAA, jeśli anatomia naczyniowa jest odpowiednia (przede wszystkim odpowiednia szyja podnerkowa i dostęp przez tętnice biodrowe) oraz gdy ośrodek dysponuje doświadczonym zespołem i sprzętem."
    },
    {
      question: "Wskaż standardowe wskazanie wymiarowe do PLANOWEGO leczenia operacyjnego bezobjawowego tętniaka aorty brzusznej u mężczyzn:",
      options: [
        "Średnica tętniaka >= 55 mm (5,5 cm)",
        "Średnica tętniaka >= 30 mm (3,0 cm)",
        "Średnica tętniaka >= 90 mm (9,0 cm)",
        "Średnica tętniaka >= 120 mm (12,0 cm)",
        "Każdy tętniak niezależnie od wymiaru powinien być operowany tego samego dnia"
      ],
      correct: 0,
      expl: "Standardowym wskazaniem do planowej interwencji operacyjnej (EVAR lub operacja otwarta) w bezobjawowym tętniaku aorty brzusznej jest średnica >= 55 mm u mężczyzn oraz >= 50 mm u kobiet (u kobiet ryzyko pęknięcia przy danej średnicy jest istotnie wyższe niż u mężczyzn)."
    },
    {
      question: "Wskaż populację, w której zaleca się wykonanie jednorazowego przesiewowego badania ultrasonograficznego (USG) jamy brzusznej w kierunku tętniaka aorty brzusznej:",
      options: [
        "Wszyscy mężczyźni w wieku 65-74 lat, którzy kiedykolwiek palili tytoń",
        "Wszystkie kobiety w wieku 18-25 lat uprawiające sport wyczynowy",
        "Dzieci w wieku szkolnym przed szczepieniami obowiązkowymi",
        "Wszyscy pacjenci z rozpoznaniem astmy oskrzelowej",
        "Osoby z grupą krwi AB RhD-dodatni"
      ],
      correct: 0,
      expl: "Populacyjne badania przesiewowe w kierunku AAA (screening) są rekomendowane u wszystkich mężczyzn w wieku 65-74 lat z wywiadem palenia tytoniu w dowolnym okresie życia oraz u osób pierwszego stopnia pokrewieństwa z chorymi na tętniaka aorty. Wykazano, że redukuje to śmiertelność z powodu pęknięcia tętniaka o blisko 50%."
    },
    {
      question: "Zespół ciasnoty wewnątrzbrzusznej (Abdominal Compartment Syndrome – ACS) po operacji pękniętego tętniaka aorty rozpoznaje się, gdy:",
      options: [
        "Utrzymujące się ciśnienie śródbrzuszne (IAP) przekracza 20 mmHg i towarzyszy mu nowo powstała niewydolność narządowa",
        "Ciśnienie śródbrzuszne wynosi 5 mmHg, a chory oddaje prawidłowe ilości moczu",
        "Występuje podwyższenie ciśnienia tętniczego powyżej 140/90 mmHg",
        "Stężenie glukozy we krwi wzrasta powyżej 180 mg/dl",
        "Chory zgłasza uczucie głodu po wybudzeniu ze znieczulenia"
      ],
      correct: 0,
      expl: "Zespół ciasnoty wewnątrzbrzusznej (ACS) definiuje się jako utrzymujące się ciśnienie wewnątrzbrzuszne (IAP) powyżej 20 mmHg (mierzone najczęściej przez cewnik w pęcherzu moczowym), któremu towarzyszy nowo powstała niewydolność narządowa (np. oliguria, spadek rzutu serca, kwasica, wysokie ciśnienia w drogach oddechowych)."
    },
    {
      question: "Leczeniem z wyboru w rozwiniętym zespole ciasnoty wewnątrzbrzusznej (ACS) zagrażającym życiu pacjenta jest:",
      options: [
        "Natychmiastowa dekompresyjna laparotomia ratunkowa i pozostawienie jamy brzusznej otwartej (laparostomia)",
        "Podanie leków obkurczających naczynia we wlewie ciągłym",
        "Zastosowanie ciasnego bandażowania powłok brzusznych pasem elastycznym",
        "Wykonanie pilnej resekcji żołądka",
        "Podanie 5 litrów roztworu Ringera w ciągu 1 godziny"
      ],
      correct: 0,
      expl: "W pełnoobjawowym zespole ciasnoty wewnątrzbrzusznej (IAP >20 mmHg z niewydolnością narządową) jedynym skutecznym, ratującym życie postępowaniem jest natychmiastowe odbarczenie chirurgiczne – otwarcie powłok brzusznych (laparotomia odbarczająca) i prowadzenie metodą otwartego brzucha (laparostomia) z opatrunkiem podciśnieniowym."
    },
    {
      question: "Podczas przygotowania do pilnej operacji pękniętego tętniaka aorty brzusznej, w celu zapobiegania zaburzeniom krzepnięcia krwi zaleca się podanie kwasu traneksamowego (TXA) w dawce:",
      options: [
        "1 g dożylnie w bolusie w ciągu 10 minut, a następnie 1 g we wlewie przez 8 godzin",
        "10 mg doustnie raz na tydzień",
        "100 g we wlewie ciągłym przez 24 godziny",
        "Kwas traneksamowy jest bezwzględnie zakazany w krwotokach naczyniowych",
        "500 mg domięśniowo bezpośrednio w miejsce tętniaka"
      ],
      correct: 0,
      expl: "Zgodnie z wytycznymi postępowania w masywnych krwotokach urazowych i naczyniowych (m.in. badanie CRASH-2), kwas traneksamowy (TXA) podaje się dożylnie w dawce nasycającej 1 g w ciągu 10 minut, a następnie w dawce podtrzymującej 1 g we wlewie przez kolejne 8 godzin."
    },
    {
      question: "Pęknięcie tętniaka aorty brzusznej do światła dwunastnicy (wtórna przetoka aortalno-dwunastnicza) manifestuje się klinicznie przede wszystkim jako:",
      options: [
        "Masywne, zagrażające życiu krwawienie z górnego odcinka przewodu pokarmowego (krwawe wymioty i melena)",
        "Ostre zapalenie spojówek i światłowstręt",
        "Niekontrolowany wyciek żółci przez pępek",
        "Odcinkowe wypadanie włosów na skórze głowy",
        "Przewlekły suchy kaszel o charakterze szczekającym"
      ],
      correct: 0,
      expl: "Przetoka aortalno-jelitowa (najczęściej aortalno-dwunastnicza, ze względu na bliskie przyleganie części wstępującej lub poziomej dwunastnicy do ściany aorty) objawia się dramatycznym, masywnym krwawieniem z górnego odcinka przewodu pokarmowego: krwawymi wymiotami (haematemesis) i smolistymi stolcami (melena) ze wstrząsem krwotocznym."
    },
    {
      question: "Wskaż tempo wzrostu średnicy bezobjawowego tętniaka aorty brzusznej, które niezależnie od jego bezwzględnego wymiaru stanowi bezwzględne wskazanie do planowej operacji:",
      options: [
        "Wzrost o > 10 mm w ciągu 12 miesięcy (lub > 5 mm w ciągu 6 miesięcy)",
        "Wzrost o 1 mm w ciągu 5 lat",
        "Wzrost o 0,5 mm w ciągu 10 lat",
        "Zmniejszenie średnicy tętniaka o 5 mm",
        "Brak jakiegokolwiek powiększania się tętniaka przez 3 lata"
      ],
      feedback: "",
      correct: 0,
      expl: "Szybki wzrost tętniaka wskazuje na niestabilność biomechaniczną jego ściany i gwałtownie zwiększa ryzyko pęknięcia. Wskazaniem do operacji jest powiększenie się średnicy tętniaka o ponad 10 mm w ciągu roku (>1 cm/rok) lub o ponad 5 mm w ciągu 6 miesięcy obserwacji ultrasonograficznej."
    }
  ],
  flashcards: [
    {
      front: "Jakie objawy tworzą klasyczną triadę pękniętego tętniaka aorty brzusznej (rAAA)?",
      back: "1. Nagły silny ból brzucha / okolicy lędźwiowej,\n2. Hipotensja / wstrząs krwotoczny,\n3. Tętniący, bolesny guz w jamie brzusznej (pełna triada u 30-50% chorych)."
    },
    {
      front: "Na czym polega hipotensja kontrolowana (permissive hypotension) w rAAA?",
      back: "Utrzymywanie SBP na poziomie 70-90 mmHg u przytomnego chorego. Zapobiega to 'wypłukaniu' skrzepu zaotrzewnowego (tzw. pop the clot) i nasileniu krwotoku."
    },
    {
      front: "Jaka jest preferowana metoda zaopatrzenia rAAA wg wytycznych ESVS?",
      back: "rEVAR (wewnątrznaczyniowy stentgraft aortalny), jeśli warunki anatomiczne na to pozwalają i ośrodek ma odpowiednie zaplecze. W przeciwnym razie: natychmiastowa operacja otwarta."
    },
    {
      front: "Kiedy kwalifikujemy mężczyznę i kobietę do PLANOWEJ operacji bezobjawowego AAA?",
      back: "Mężczyźni: średnica >= 55 mm (5,5 cm).\nKobiety: średnica >= 50 mm (5,0 cm).\nNiezależnie od płci: szybki wzrost (>10 mm/rok lub >5 mm/6 mies.) oraz każdy tętniak objawowy."
    },
    {
      front: "Czym jest zespół ciasnoty wewnątrzbrzusznej (ACS) po operacji rAAA?",
      back: "IAP > 20 mmHg mierzone w pęcherzu moczowym z nowo powstałą niewydolnością narządową (skąpomocz, kwasica, zaburzenia wentylacji). Wymaga pilnej laparotomii odbarczającej (laparostomii)."
    },
    {
      front: "Dla kogo zalecany jest jednorazowy screening USG w kierunku AAA?",
      back: "Wszyscy mężczyźni w wieku 65-74 lat, którzy kiedykolwiek palili tytoń (oraz krewni I stopnia chorych na tętniaka). Redukuje śmiertelność z powodu pęknięcia o ~50%."
    }
  ]
};

async function run() {
  console.log("Generating Case 140: Pęknięty tętniak aorty brzusznej (rAAA)...");
  
  // Mirroring
  case140.steps.forEach(s => {
    s.question = s.title;
    s.explanation = s.feedback ? s.feedback[0] : "";
  });
  
  case140.lekQuestions.forEach(q => {
    q.opts = q.options;
    q.correctIdx = q.correct;
    q.exp = q.expl;
  });
  
  const enc = await encryptStringAes(JSON.stringify(case140, null, 2), MASTER_KEY);
  fs.writeFileSync(path.join('cases', '140_pekniety_tetniak_aorty_brzusznej_raaa.json'), JSON.stringify(enc, null, 2), 'utf8');
  console.log("[SAVED] Case #140: 140_pekniety_tetniak_aorty_brzusznej_raaa.json (LEK Qs: " + case140.lekQuestions.length + ", Steps: " + case140.steps.length + ", Flashcards: " + case140.flashcards.length + ")");
}

run();

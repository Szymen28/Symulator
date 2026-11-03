const fs = require('fs');
const path = require('path');
const { decryptObjectAes, encryptStringAes } = require('./encrypt_case');

const CASES_DIR = path.join(__dirname, '..', 'cases');
const MASTER_KEY = '@LEKSzymon28111999';

console.log("Reworking Cases 107 and 108 to Gold Standard...");

// ==========================================
// CASE 107: VUR IV stopnia u 2-latki
// ==========================================
const case107Data = {
  id: 107,
  filename: "107_odplyw_pecherzowo_moczowodowy_vur.json",
  dept: "Pediatria",
  shortTitle: "2-letnia Hania – Drugi epizod gorączkowego ZUM, poszerzenie UKM i nawracające infekcje (VUR stopnia IV)",
  diagnosisTitle: "Odpływ pęcherzowo-moczowodowy (VUR – Vesicoureteral Reflux) stopnia IV prawostronny z nefropatią refluksową",
  vitals: [
    { label: "Akcja serca (HR)", val: "125/min", sub: "Tachykardia kompensacyjna (stan podgorączkowy)", status: "warn" },
    { label: "Ciśnienie tętnicze", val: "98/60 mmHg", sub: "Prawidłowe dla wieku", status: "ok" },
    { label: "Saturacja SpO2", val: "99%", sub: "W normie", status: "ok" },
    { label: "Częstość oddechów", val: "24/min", sub: "W normie", status: "ok" },
    { label: "Temperatura ciała", val: "37.4°C", sub: "Po podaniu leku przeciwgorączkowego", status: "ok" }
  ],
  vitalsObj: { hr: 125, bp: "98/60", spo2: 99, rr: 24, temp: 37.4, gcs: 15 },
  story: "2-letnia Hania została przyjęta na Oddział Pediatrii i Nefrologii Dziecięcej po przebyciu drugiego w ciągu 4 miesięcy epizodu ostrego odmiedniczkowego zapalenia nerek (OZZN). Epizody przebiegały z wysoką gorączką do 39.5°C, dreszczami, apatią, wymiotami i tkliwością okolicy lędźwiowej prawej. W posiewie moczu z pobrania ze środkowego strumienia wyhodowano wówczas Escherichia coli >10⁵ CFU/ml. W wykonanym po wyleczeniu ostrej infekcji USG jamy brzusznej uwidoczniono poszerzenie miedniczki nerkowej prawej do 16 mm, poszerzenie kielichów oraz widoczny na całym przebiegu, poskręcany moczowód prawy o szerokości do 9 mm (ureterohydronephrosis). Nerka lewa bez cech zastoju. W wywiadzie rodzice zgłaszają przewlekłe zaparcia stolca u dziewczynki (wypróżnienia co 3-4 dni, zbite, bolesne).",
  labs: {
    "Mocz i krew po wyleczeniu ostrej infekcji": [
      { name: "Mocz badanie ogólne - leukocyty", val: "1-3 w polu widzenia", norm: "0-5 wpw", flag: "NORMAL" },
      { name: "Mocz badanie ogólne - erytrocyty", val: "0-1 w polu widzenia", norm: "0-3 wpw", flag: "NORMAL" },
      { name: "Białko w moczu", val: "Nieobecne", norm: "Nieobecne", flag: "NORMAL" },
      { name: "Posiew moczu kontrolny", val: "Jałowy (<10³ CFU/ml)", norm: "Jałowy", flag: "NORMAL" },
      { name: "Kreatynina w surowicy", val: "0.34 mg/dl", norm: "0.20 - 0.42 mg/dl", flag: "NORMAL" },
      { name: "Mocznik", val: "22 mg/dl", norm: "15 - 36 mg/dl", flag: "NORMAL" },
      { name: "eGFR wg Schwartza", val: "110 ml/min/1.73m²", norm: ">90 ml/min", flag: "NORMAL" },
      { name: "CRP (białko C-reaktywne)", val: "2.1 mg/l", norm: "<5.0 mg/l (w ostrej fazie 88)", flag: "NORMAL" },
      { name: "Prokalcytonina", val: "0.04 ng/ml", norm: "<0.5 ng/ml", flag: "NORMAL" }
    ],
    "Badania obrazowe i radioizotopowe": [
      { name: "USG układu moczowego", val: "Prawa miedniczka 16 mm, kielichy zaokrąglone, moczowód prawy poszerzony do 9 mm na całej długości. Nerka lewa 68 mm, prawidłowa.", norm: "Miedniczka <7-10 mm, moczowód niewidoczny", flag: "CRIT_HIGH" },
      { name: "Cystouretrografia mikcyjna (CUM)", val: "Masywny odpływ wsteczny kontrastu do prawego moczowodu, znaczne poszerzenie i poskręcanie moczowodu, poszerzenie kielichów ze spłaszczeniem sklepień – VUR stopnia IV. Po stronie lewej odpływu brak.", norm: "Brak odpływu wstecznego", flag: "CRIT_HIGH" },
      { name: "Scyntygrafia nerek 99mTc-DMSA", val: "Nerka lewa prawidłowa, udział w funkcji 64%. Nerka prawa wykazuje ubytki gromadzenia znacznika w biegunie górnym i dolnym (blizny pozapalne), udział w funkcji 36%.", norm: "Równomierny rozkład znacznika (45-55% na nerkę)", flag: "CRIT_LOW" }
    ]
  },
  steps: [
    {
      stepNum: 1,
      title: "Krok 1: Wstępna ocena wskazań do pogłębionej diagnostyki po nawrotowym ZUM",
      desc: "Do Twojego gabinetu trafia 2-letnia dziewczynka po przebyciu drugiego gorączkowego zakażenia układu moczowego (OZZN) z temperaturą do 39.5°C i wysokim CRP. Właśnie zakończyła antybiotykoterapię celowaną. W USG widoczne jest poszerzenie miedniczki i moczowodu po stronie prawej. Jakie są aktualne rekomendacje Polskiego Towarzystwa Nefrologii Dziecięcej (PTNFD) oraz EAU/ESPU dotyczące dalszego postępowania diagnostycznego?",
      scenario: "Do Twojego gabinetu trafia 2-letnia dziewczynka po przebyciu drugiego gorączkowego zakażenia układu moczowego (OZZN) z temperaturą do 39.5°C i wysokim CRP. Właśnie zakończyła antybiotykoterapię celowaną. W USG widoczne jest poszerzenie miedniczki i moczowodu po stronie prawej. Jakie są aktualne rekomendacje Polskiego Towarzystwa Nefrologii Dziecięcej (PTNFD) oraz EAU/ESPU dotyczące dalszego postępowania diagnostycznego?",
      options: [
        {
          text: "Wskazana jest pilna planowa cystouretrografia mikcyjna (CUM / VCUG) pod osłoną przeciwbakteryjną w celu wykluczenia/oceny stopnia odpływu pęcherzowo-moczowodowego (VUR)",
          feedback: "✅ PRAWIDŁOWO! Zgodnie z wytycznymi PTNFD i EAU/ESPU, bezwzględnymi wskazaniami do wykonania cystouretrografii mikcyjnej (CUM) u małego dziecka są: 1) nawrót gorączkowego ZUM (drugi epizod OZZN), 2) nieprawidłowości w USG układu moczowego (poszerzenie miedniczki, kielichów, widoczny moczowód), 3) zakażenie bakterią inną niż E. coli, 4) posocznica moczowa lub upośledzenie funkcji nerek."
        },
        {
          text: "Zakończenie diagnostyki – nawrót ZUM u dziewczynki jest zjawiskiem fizjologicznym i nie wymaga żadnych badań",
          feedback: "❌ BŁĄD! Nawracające gorączkowe ZUM z nieprawidłowym obrazem USG nerek grozi nieodwracalnym zbliznowaceniem miąższu nerkowego (nefropatią refluksową) i wymaga pilnego wyjaśnienia anatomicznego."
        },
        {
          text: "Natychmiastowe wykonanie tomografii komputerowej miednicy mniejszej z kontrastem",
          feedback: "❌ BŁĄD! TK miednicy wiąże się z wysoką dawką promieniowania jonizującego i nie jest badaniem pierwszego wyboru w diagnostyce VUR u 2-letniego dziecka."
        },
        {
          text: "Zlecenie dobowej zbiórki moczu na klirens inuliny i białko Bence-Jonesa",
          feedback: "❌ BŁĄD! Badania te nie mają żadnego uzasadnienia w diagnostyce wad anatomicznych układu moczowego u dzieci."
        }
      ]
    },
    {
      stepNum: 2,
      title: "Krok 2: Przygotowanie i optymalny czas wykonania cystouretrografii mikcyjnej (CUM)",
      desc: "Kwalifikujesz Hanię do badania CUM. Kiedy i w jakich warunkach należy przeprowadzić to inwazyjne badanie radiologiczne, aby uniknąć urosepsy oraz wyników fałszywie dodatnich?",
      scenario: "Kwalifikujesz Hanię do badania CUM. Kiedy i w jakich warunkach należy przeprowadzić to inwazyjne badanie radiologiczne, aby uniknąć urosepsy oraz wyników fałszywie dodatnich?",
      options: [
        {
          text: "CUM należy wykonać po upływie co najmniej 4–6 tygodni od ostrej fazy ZUM, po potwierdzeniu ujemnego posiewu moczu, stosując profilaktykę przeciwbakteryjną w dniu badania i przez 2-3 dni po nim",
          feedback: "✅ PRAWIDŁOWO! CUM w trakcie ostrego stanu zapalnego może dać wynik fałszywie dodatni (przejściowy refluks na skutek obrzęku i wiotkości ujść moczowodowych pod wpływem endotoksyn) oraz grozi wywołaniem ciężkiej posocznicy urologicznej. Standardem jest odczekanie 4–6 tygodni od wyleczenia zakażenia, potwierdzenie jałowego moczu oraz podanie osłony antybiotykowej (np. Furazydyna lub Amoksycylina/Klawulanian) w dniu cewnikowania i przez 2-3 dni po nim."
        },
        {
          text: "Badanie CUM należy wykonać natychmiast na szczycie gorączki w trakcie ostrej infekcji",
          feedback: "❌ BŁĄD! KARDYNALNA PUŁAPKA! Wstrzyknięcie kontrastu do pęcherza w ostrej fazie infekcji pod ciśnieniem może spowodować sepsę moczową i zgon pacjenta!"
        },
        {
          text: "CUM wykonuje się bez cewnikowania pęcherza, podając kontrast doustnie",
          feedback: "❌ BŁĄD! CUM wymaga wprowadzenia cewnika do pęcherza moczowego i podania rozpuszczalnego kontrastu bezpośrednio do pęcherza pod kontrolą fluoroskopii."
        },
        {
          text: "Przed badaniem CUM konieczne jest znieczulenie ogólne z intubacją dotchawiczą u każdego dziecka",
          feedback: "❌ BŁĄD! Badanie wykonuje się bez znieczulenia ogólnego, ponieważ kluczowe jest zarejestrowanie fazy fizjologicznej mikcji, co w narkozie jest utrudnione."
        }
      ]
    },
    {
      stepNum: 3,
      title: "Krok 3: Ocena stopnia zaawansowania odpływu wg klasyfikacji międzynarodowej",
      desc: "Wykonano CUM: widoczny jest masywny odpływ kontrastu do prawego moczowodu, z jego wyraźnym poszerzeniem i poskręcaniem, poszerzeniem miedniczki nerkowej oraz kielichów nerkowych ze spłaszczeniem sklepień kielichowych. Po stronie lewej kontrast nie cofa się do moczowodu. Do którego stopnia w 5-stopniowej klasyfikacji międzynarodowej (International Reflux Study Committee) kwalifikuje się ten obraz?",
      scenario: "Wykonano CUM: widoczny jest masywny odpływ kontrastu do prawego moczowodu, z jego wyraźnym poszerzeniem i poskręcaniem, poszerzeniem miedniczki nerkowej oraz kielichów nerkowych ze spłaszczeniem sklepień kielichowych. Po stronie lewej kontrast nie cofa się do moczowodu. Do którego stopnia w 5-stopniowej klasyfikacji międzynarodowej (International Reflux Study Committee) kwalifikuje się ten obraz?",
      options: [
        {
          text: "Stopień IV (refluks sięga do UKM z wyraźnym poszerzeniem i poskręcaniem moczowodu oraz poszerzeniem miedniczki i zatarciem sklepień kielichów)",
          feedback: "✅ PRAWIDŁOWO! Zgodnie z 5-stopniową klasyfikacją VUR: Stopień I: refluks tylko do moczowodu; Stopień II: refluks do UKM bez poszerzenia; Stopień III: mierne poszerzenie moczowodu i UKM z zachowanymi sklepieniami; Stopień IV: znaczne poszerzenie i poskręcanie moczowodu z poszerzeniem miedniczki i zatarciem kątów kielichowych; Stopień V: skrajne poszerzenie ('megamoczowód'), całkowita utrata zarysu kielichów i zanik brodawek nerkowych."
        },
        {
          text: "Stopień I (refluks nieprzekraczający połowy wysokości moczowodu)",
          feedback: "❌ BŁĄD! W stopniu I kontrast nie dociera w ogóle do miedniczki nerkowej."
        },
        {
          text: "Stopień II (refluks do UKM bez żadnego poszerzenia dróg moczowych)",
          feedback: "❌ BŁĄD! W stopniu II moczowód i miedniczka mają prawidłową szerokość."
        },
        {
          text: "Stopień V (refluks obustronny z obecnością przetoki pęcherzowo-odbytniczej)",
          feedback: "❌ BŁĄD! Stopień V to skrajne poszerzenie z całkowitym zniekształceniem nerek i zanikiem brodawek, u Hani kąty kielichów są zatarte, co odpowiada klasycznemu IV stopniowi."
        }
      ]
    },
    {
      stepNum: 4,
      title: "Krok 4: Scyntygrafia statyczna 99mTc-DMSA – ocena miąższu i nefropatii refluksowej",
      desc: "Z uwagi na VUR IV stopnia i przebyte gorączkowe ZUM, kierujesz Hanię na statyczną scyntygrafię nerek z kwasem dimerkaptobursztynowym (99mTc-DMSA). Badanie wykazuje ubytki gromadzenia znacznika w biegunie górnym i dolnym nerki prawej oraz podział funkcji nerek: 64% nerka lewa vs 36% nerka prawa. Jak interpretujesz ten wynik?",
      scenario: "Z uwagi na VUR IV stopnia i przebyte gorączkowe ZUM, kierujesz Hanię na statyczną scyntygrafię nerek z kwasem dimerkaptobursztynowym (99mTc-DMSA). Badanie wykazuje ubytki gromadzenia znacznika w biegunie górnym i dolnym nerki prawej oraz podział funkcji nerek: 64% nerka lewa vs 36% nerka prawa. Jak interpretujesz ten wynik?",
      options: [
        {
          text: "Potwierdzenie nefropatii refluksowej (bliznowacenia pozapalnego miąższu nerkowego) ze spadkiem funkcji nerki prawej poniżej normy (<40%)",
          feedback: "✅ PRAWIDŁOWO! Scyntygrafia DMSA jest złotym standardem oceny uszkodzenia kory nerek. Ubytki wychwytu radioznacznika (tzw. 'cold spots') w biegunach nerek odpowiadają ogniskom zwłóknienia i zbliznowacenia pozapalnego. Fizjologiczny udział każdej z nerek wynosi 45–55%. Wartość 36% wskazuje na istotny ubytek czynnego miąższu nerki prawej na skutek nawracających zakażeń w przebiegu refluksu."
        },
        {
          text: "Obraz odpowiada złośliwemu guzowi Wilmsa (nephroblastoma) wymagającemu pilnej nefrektomii",
          feedback: "❌ BŁĄD! Ubytki gromadzenia DMSA po przebytych epizodach OZZN u dziecka z VUR to typowe blizny pozapalne, a nie guz."
        },
        {
          text: "Wynik jest całkowicie prawidłowy, asymetria do 70:30 mieści się w granicach fizjologii",
          feedback: "❌ BŁĄD! Norma udziału pojedynczej nerki to 45-55%. Wynik 36% jest patologiczny i świadczy o trwałym uszkodzeniu narządu."
        },
        {
          text: "Ubytki DMSA wynikają z ostrej kamicy moczowodowej i obecności złogu w pęcherzu",
          feedback: "❌ BŁĄD! DMSA ocenia miąższ kory nerkowej, ubytki to blizny korowe."
        }
      ]
    },
    {
      stepNum: 5,
      title: "Krok 5: Rola zaburzeń mikcji i defekacji (BBD) w patogenezie i leczeniu refluksu",
      desc: "W wywiadzie matka Hani zwraca uwagę na uporczywe zaparcia stolca u córki (wypróżnienia co 3-4 dni, twarde 'bobki', płacz przy defekacji). Dlaczego w nefrologii dziecięcej leczenie zaparć jest uznawane za bezwzględny warunek skuteczności leczenia VUR?",
      scenario: "W wywiadzie matka Hani zwraca uwagę na uporczywe zaparcia stolca u córki (wypróżnienia co 3-4 dni, twarde 'bobki', płacz przy defekacji). Dlaczego w nefrologii dziecięcej leczenie zaparć jest uznawane za bezwzględny warunek skuteczności leczenia VUR?",
      options: [
        {
          text: "Zaparcia stolca w zespole BBD (Bladder and Bowel Dysfunction) powodują mechaniczny ucisk odbytnicy na pęcherz, zwiększają ciśnienie śródpęcherzowe, zaburzają opróżnianie pęcherza i dramatycznie nasilają VUR oraz ryzyko ZUM",
          feedback: "✅ PRAWIDŁOWO! Zespół dysfunkcji pęcherza i jelit (BBD – Bladder and Bowel Dysfunction): zalegające twarde masy kałowe uciskają szyję pęcherza i cewkę moczową, powodując zaleganie moczu po mikcji, wysokie ciśnienie śródpęcherzowe oraz kolonizację krocza bakteriami uropatogennymi. U dzieci z BBD leczenie zaparć (makrogole/polietylenoglikol, dieta bogatoresztkowa) jest podstawowym warunkiem zapobiegania nawrotom ZUM i umożliwia samoistne ustąpienie lub powodzenie leczenia zabiegowego VUR!"
        },
        {
          text: "Zaparcia nie mają żadnego związku z układem moczowym, pęcherz i jelita są całkowicie niezależnymi narządami",
          feedback: "❌ BŁĄD! Układ moczowy i pokarmowy mają wspólne unerwienie oraz bliskie sąsiedztwo anatomiczne w miednicy mniejszej; BBD to udowodniony klinicznie zespół."
        },
        {
          text: "Należy wdrożyć antybiotykoterapię doustną w celu zniszczenia flory bakteryjnej jelit",
          feedback: "❌ BŁĄD! Eradykacja flory jelitowej antybiotykami sprzyja kolonizacji szczepami opornymi i jest błędem."
        },
        {
          text: "Zaparcia u 2-latka należy leczyć wyłącznie wlewkami z soli kuchennej co 12 godzin",
          feedback: "❌ BŁĄD! Wlewki fosforanowe lub solne mogą wywołać ciężkie zaburzenia elektrolitowe u małych dzieci."
        }
      ]
    },
    {
      stepNum: 6,
      title: "Krok 6: Profilaktyka przeciwbakteryjna (CAP – Continuous Antibiotic Prophylaxis)",
      desc: "Do czasu definitywnego zaopatrzenia urologicznego decydujesz o wdrożeniu przewlekłej profilaktyki przeciwbakteryjnej (CAP), aby uchronić Hanię przed kolejnym epizodem OZZN i dalszym niszczeniem nerki. Jaki lek i w jakim schemacie dawkowania jest lekiem I wyboru w CAP wg PTNFD?",
      scenario: "Do czasu definitywnego zaopatrzenia urologicznego decydujesz o wdrożeniu przewlekłej profilaktyki przeciwbakteryjnej (CAP), aby uchronić Hanię przed kolejnym epizodem OZZN i dalszym niszczeniem nerki. Jaki lek i w jakim schemacie dawkowania jest lekiem I wyboru w CAP wg PTNFD?",
      options: [
        {
          text: "Furazydyna (lub nitrofurantoina) w dawce 1–2 mg/kg mc. podawana raz na dobę na noc (1/3 do 1/4 dawki terapeutycznej)",
          feedback: "✅ PRAWIDŁOWO! Standardem przewlekłej profilaktyki przeciwbakteryjnej (CAP) u dzieci powyżej 3. miesiąca życia jest pochodna nitrofuranu (Furazydyna 1-2 mg/kg/d) lub Trimetoprim (1-2 mg/kg/d) podawany raz na dobę wieczorem przed snem (gdy mocz najdłużej zalega w pęcherzu). Zapewnia to wysokie stężenie antyseptyczne w pęcherzu bez generowania ogólnoustrojowej oporności bakteryjnej."
        },
        {
          text: "Cyprofloksacyna doustnie w pełnej dawce terapeutycznej 30 mg/kg mc./d przez 6 miesięcy",
          feedback: "❌ BŁĄD! Fluorochinolony są przeciwwskazane w profilaktyce u małych dzieci z powodu artropatii chrząstek stawowych i szybkiej indukcji wielolekooporności."
        },
        {
          text: "Gentamycyna domięśniowo codziennie przez 3 miesiące",
          feedback: "❌ BŁĄD! Aminoglikozydy są nefrotoksyczne i ototoksyczne, ich przewlekłe stosowanie w profilaktyce jest błędem sztuki."
        },
        {
          text: "Wyciąg z żurawiny w kroplach jako jedyna i wystarczająca metoda ochrony nerki przy VUR IV stopnia",
          feedback: "❌ BŁĄD! Preparaty żurawiny nie mają udowodnionej skuteczności w zapobieganiu OZZN i niszczeniu miąższu nerkowego u pacjentów z wysokim refluksem VUR IV stopnia."
        }
      ]
    },
    {
      stepNum: 7,
      title: "Krok 7: Kwalifikacja do leczenia zabiegowego – wybór metody",
      desc: "Hania ma VUR IV stopnia z obecnością blizn w scyntygrafii DMSA i asymetrią funkcji nerki. Konsultujący urolog dziecięcy omawia z rodzicami opcje leczenia zabiegowego. Jaka metoda jest obecnie metodą pierwszego wyboru w małoinwazyjnym leczeniu VUR?",
      scenario: "Hania ma VUR IV stopnia z obecnością blizn w scyntygrafii DMSA i asymetrią funkcji nerki. Konsultujący urolog dziecięcy omawia z rodzicami opcje leczenia zabiegowego. Jaka metoda jest obecnie metodą pierwszego wyboru w małoinwazyjnym leczeniu VUR?",
      options: [
        {
          text: "Endoskopowe wstrzyknięcie substancji wypełniającej pod ujście moczowodu (metoda STING z użyciem kopolimeru dekstranomeru i kwasu hialuronowego – preparat Deflux)",
          feedback: "✅ PRAWIDŁOWO! Małoinwazyjną metodą z wyboru w leczeniu VUR jest zabieg endoskopowy metodą STING (Subureteric Transurethral Injection). Polega na wprowadzeniu cystoskopu i podśluzówkowym wstrzyknięciu pasty biodegradowalnej (Deflux) tuż pod ujście moczowodu, co unosi ujście, wydłuża odcinek podśluzówkowy i odtwarza mechanizm zastawkowy. Skuteczność wynosi 75–85%, zabieg trwa kilkanaście minut, nie wymaga nacięcia powłok i pozwala na wypisanie dziecka do domu w tym samym dniu."
        },
        {
          text: "Natychmiastowe usunięcie prawej nerki (nefrektomia) w celu zapobieżenia zakażeniom",
          feedback: "❌ BŁĄD! Nerka prawa zachowuje 36% funkcji filtracyjnej. Usunięcie nerki przy VUR IV stopnia jest niedopuszczalne!"
        },
        {
          text: "Klasyczna otwarta operacja reimplantacji moczowodu sposobem Cohena jako jedyna dopuszczalna metoda",
          feedback: "❌ BŁĄD! Operacja Cohena (przeszczepienie moczowodów) jest bardzo skuteczna (>95%), lecz jest zabiegiem inwazyjnym i obecnie stanowi leczenie drugiego rzutu w razie niepowodzenia metody endoskopowej lub w skrajnych postaciach (VUR V stopnia z megamoczowodem)."
        },
        {
          text: "Zabieg uretrotomii wewnętrznej z nacięciem zwieracza cewki moczowej",
          feedback: "❌ BŁĄD! Nacięcie zwieracza u dziewczynki spowodowałoby trwałe nietrzymanie moczu i nie leczy refluksu."
        }
      ]
    },
    {
      stepNum: 8,
      title: "Krok 8: Długoterminowe rokowanie i prewencja powikłań nefropatii refluksowej",
      desc: "Zabieg STING z użyciem preparatu Deflux przebiegł pomyślnie. Kontrolna cystografia izotopowa potwierdziła całkowite ustąpienie refluksu. Jakie długoterminowe zalecenia nefrologiczne musi otrzymać pacjentka z rozpoznaną nefropatią refluksową (bliznami w DMSA)?",
      scenario: "Zabieg STING z użyciem preparatu Deflux przebiegł pomyślnie. Kontrolna cystografia izotopowa potwierdziła całkowite ustąpienie refluksu. Jakie długoterminowe zalecenia nefrologiczne musi otrzymać pacjentka z rozpoznaną nefropatią refluksową (bliznami w DMSA)?",
      options: [
        {
          text: "Regularna kontrola ciśnienia tętniczego (co 6-12 mies.), okresowe oznaczanie białkomoczu (UPCR), monitorowanie eGFR oraz leczenie zaburzeń wypróżnień – ze względu na odległe ryzyko nadciśnienia nerkopochodnego i PChN",
          feedback: "✅ PRAWIDŁOWO! Dzieci z potwierdzoną nefropatią refluksową (bliznami nerkowymi) wymagają wieloletniej opieki nefrologicznej aż do wieku dorosłego. Do najczęstszych odległych powikłań należą: 1) nadciśnienie tętnicze renino-zależne (rozwijające się u 10–20% pacjentów), 2) białkomocz z hiperfiltracji w ocalałych nefronach, 3) przewlekła choroba nerek (PChN), 4) powikłania w ciąży (stan przedrzucawkowy). Kluczowe jest też zapobieganie zaparciom i infekcjom."
        },
        {
          text: "Brak konieczności jakichkolwiek wizyt kontrolnych po udanym zabiegu urologicznym",
          feedback: "❌ BŁĄD! Blizny nerkowe nie znikają po zabiegu i niosą ryzyko nadciśnienia tętniczego i PChN w wieku nastoletnim i dorosłym."
        },
        {
          text: "Zakaz uprawiania jakiejkolwiek aktywności fizycznej i sportu do końca życia",
          feedback: "❌ BŁĄD! Dziecko z jedną częściowo uszkodzoną nerką może prowadzić w pełni normalną aktywność fizyczną; unikać należy jedynie sportów walki o wysokim ryzyku urazu nerek."
        },
        {
          text: "Utrzymywanie stałego cewnika Foleya w pęcherzu moczowym przez 5 lat",
          feedback: "❌ BŁĄD! Utrzymanie cewnika Foleya jest źródłem ciężkich, wielolekoopornych zakażeń pęcherza."
        }
      ]
    }
  ],
  pathoNodes: [
    {
      badge: "KROK 1: WADA POŁĄCZENIA PĘCHERZOWO-MOCZOWODOWEGO",
      title: "Niewydolność mechanizmu zastawkowego",
      short: "Zbyt krótki odcinek śródścienny moczowodu",
      detail: "W warunkach prawidłowych moczowód przebiega skośnie w ścianie pęcherza moczowego (odcinek śródścienny i podśluzówkowy), a stosunek jego długości do średnicy wynosi co najmniej 5:1. Podczas napełniania pęcherza i mikcji wzrost ciśnienia śródpęcherzowego zaciska światło moczowodu, zapobiegając cofaniu się moczu. W pierwotnym VUR odcinek śródścienny jest zbyt krótki lub przebiega pod kątem prostym, co uniemożliwia fizjologiczne zamykanie ujścia.",
      target: "Ujście pęcherzowo-moczowodowe",
      desc: "Wada wrodzona aparatu zastawkowego ujścia moczowodu."
    },
    {
      badge: "KROK 2: FALA WSTECZNA I REFLUKS WEWNĄTRZNERKOWY",
      title: "Wsteczny przepływ moczu i refluks cewkowy",
      short: "Penetracja zakażonego moczu do kielichów i cewek",
      detail: "Zakażony mocz z pęcherza cofa się pod wysokim ciśnieniem mikcyjnym do górnych dróg moczowych. W nerkach mocz penetruje przez tzw. brodawki złożone (obecne głównie w biegunie górnym i dolnym nerki), które mają otwarte, ziejące ujścia cewek zbiorczych (refluks wewnątrznerkowy – intrarenal reflux). Pozwala to bakteriom uropatogennym na bezpośrednią inwazję miąższu nerkowego.",
      target: "Układ kielichowo-miedniczkowy i brodawki nerkowe",
      desc: "Anatomiczna predylekcja biegunów nerek do zakażeń wstecznych."
    },
    {
      badge: "KROK 3: OSTE ODDZIAŁYWANIE ZAPALNE I APOPTOZA CEWEK",
      title: "Odmiedniczkowe zapalenie i wyrzut cytokin",
      short: "Niszczenie nefronów przez elastazę i wolne rodniki",
      detail: "Obecność bakterii (E. coli z fimbriami typu P) w tkance śródmiąższowej kory nerek wyzwala gwałtowną odpowiedź zapalną z napływem neutrofilów, uwalnianiem enzymów lizosomalnych, wolnych rodników tlenowych i cytokin (TNF-alfa, IL-1, IL-6). Dochodzi do martwicy nabłonka cewek nerkowych oraz niedokrwienia mikronaczyń okołocewkowych.",
      target: "Tkanka śródmiąższowa i cewki kory nerek",
      desc: "Ostre zapalenie niszczące architekturę kory nerkowej."
    },
    {
      badge: "KROK 4: ZBLIZNOWACENIE I NEFROPATIA REFLUKSOWA",
      title: "Blizny korowe i nadciśnienie nerkopochodne",
      short: "Tworzenie blizn nerkowych i hiperfiltracja",
      detail: "Zniszczony miąższ nerkowy goi się przez włóknienie i tworzenie trwałych blizn łącznotkankowych (nefropatia refluksowa). Skurczenie tkanki bliznowatej i niedokrwienie sąsiadujących nefronów aktywuje komórki aparatu przykłębuszkowego do nadprodukcji reniny (nadciśnienie naczyniowo-nerkowe). Ocalałe nefrony ulegają hiperfiltracji, co po latach prowadzi do wtórnego FSGS, białkomoczu i schyłkowej PChN.",
      target: "Kora nerki i aparat przykłębuszkowy",
      desc: "Trwałe inwalidztwo nefrologiczne wymagające stałego nadzoru ciśnienia i białkomoczu."
    }
  ],
  diffTable: {
    title: "Diagnostyka różnicowa poszerzenia układu kielichowo-miedniczkowego u dzieci",
    headers: ["Cecha", "VUR (Odpływ pęcherzowo-moczowodowy)", "Zwężenie UPJO (miedniczkowe)", "Zastawka cewki tylnej (PUV)", "Pęcherz neurogenny"],
    rows: [
      ["Płeć / Predyspozycja", "Częściej dziewczynki (starsze) lub chłopcy <1 r.ż.", "Częściej chłopcy, lewa nerka", "WYŁĄCZNIE chłopcy", "Obie płcie (przepuklina oponowo-rdzeniowa)"],
      ["Obraz USG", "Poszerzenie UKM i poszerzony kręty moczowód", "Izolowane poszerzenie miedniczki/kielichów; moczowód niewidoczny", "Obustronne wodonercze, grubościenny pęcherz, poszerzona cewka sterczowa", "Pogrubiała, beleczkowata ściana pęcherza, zaleganie moczu"],
      ["CUM (VCUG)", "Odpływ kontrastu do moczowodów (st. I-V)", "Brak odpływu wstecznego z pęcherza", "Refluks wtórny u 50%, poszerzona tylna cewka moczowa", "Pęcherz 'choinkowaty' z uchyłkami, refluks"],
      ["Scyntygrafia z wyboru", "99mTc-DMSA (wykrywanie blizn korowych)", "99mTc-MAG3 z testem furosemidowym F+20 (krzywa zaporowa)", "MAG3 i DMSA", "DMSA i badania urodynamiczne"],
      ["Leczenie I wyboru", "Leczenie zachowawcze (CAP), ostrzyknięcie endoskopowe (STING/Deflux)", "Pieloplastyka sposobem Hynesa-Andersona", "Pilna endoskopowa ablacja zastawki cewki tylnej", "Czyste przerywane cewnikowanie (CIC) + oksybutynina"],
      ["Związek z mikcją", "Objawy nasilone w trakcie mikcji", "Niezależne od mikcji", "Trudności w mikcji od urodzenia (słaby mikcyjny strumień)", "Nietrzymanie moczu z przepełnienia"]
    ]
  },
  dutySummary: {
    overview: "2-letnia Hania z nawrotowym gorączkowym zakażeniem układu moczowego (drugi epizod OZZN), u której rozpoznano odpływ pęcherzowo-moczowodowy (VUR) IV stopnia po stronie prawej z obecnością blizn korowych w scyntygrafii DMSA (udział w funkcji 36%). Współistniejący zespół zaburzeń pęcherzowo-jelitowych (BBD – przewlekłe zaparcia). Skutecznie wyleczona małoinwazyjnym zabiegiem endoskopowym STING (ostrzyknięcie ujścia preparatem Deflux) pod osłoną profilaktyki nitrofurantoiną i uregulowaniu defekacji makrogolami.",
    diagnostics: "Cystouretrografia mikcyjna (CUM) wykonana 6 tyg. po infekcji, scyntygrafia nerek 99mTc-DMSA (złoty standard oceny blizn), USG układu moczowego, posiew moczu kontrolny, biochemia nerkowa, ocena rytmu wypróżnień (skala Bristol).",
    drugsAndDoses: "1. Profilaktyka przeciwbakteryjna (CAP): <span class='dose-pill'>Furazydyna p.o. 1–2 mg/kg mc.</span> raz na dobę na noc.<br>2. Leczenie zaparć (BBD): <span class='dose-pill'>Makrogole (PEG 4000) 0.5–1.0 g/kg mc./dobę</span> w dawce dobranej do 1-2 miękkich stolców dziennie.<br>3. Zabieg: podśluzówkowe wstrzyknięcie <span class='dose-pill'>Deflux (kopolimer dekstranomeru z kwasem hialuronowym) 0.5–1.0 ml</span> pod ujście moczowodu.",
    procedures: "Cystoskopia z zabiegiem endoskopowym STING, CUM, cewnikowanie pęcherza pod rygorem aseptyki, monitorowanie ciśnienia tętniczego.",
    monitoring: "Pomiary ciśnienia tętniczego co 6 miesięcy, badanie moczu z testem paskowym przy każdej gorączce bez uchwytnego źródła, kontrolne USG układu moczowego po 3 i 6 miesiącach, okresowa kontrola białkomoczu (UPCR)."
  },
  lekQuestions: [
    {
      tag: "Klasyfikacja radiologiczna / Klasyfikacja VUR",
      q: "Zgodnie z międzynarodową klasyfikacją odpływów pęcherzowo-moczowodowych (International Reflux Study), odpływ sięgający miedniczki i kielichów nerkowych ze znacznym poszerzeniem i poskręcaniem moczowodu oraz poszerzeniem miedniczki i zatarciem sklepień kielichów odpowiada:",
      opts: [
        "A. IV stopniowi VUR",
        "B. I stopniowi VUR",
        "C. II stopniowi VUR",
        "D. III stopniowi VUR",
        "E. V stopniowi VUR"
      ],
      options: [
        "A. IV stopniowi VUR",
        "B. I stopniowi VUR",
        "C. II stopniowi VUR",
        "D. III stopniowi VUR",
        "E. V stopniowi VUR"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Zgodnie z klasyfikacją IRS: Stopień I: refluks tylko do moczowodu; Stopień II: refluks do UKM bez poszerzenia; Stopień III: mierne poszerzenie moczowodu i miedniczki z zachowanymi sklepieniami; Stopień IV: znaczne poszerzenie i poskręcanie moczowodu z poszerzeniem miedniczki i zatarciem kątów sklepień kielichów; Stopień V: masywny megamoczowód z całkowitym zatarciem kielichów i odwróceniem brodawek.",
      expl: "Zgodnie z klasyfikacją IRS: Stopień I: refluks tylko do moczowodu; Stopień II: refluks do UKM bez poszerzenia; Stopień III: mierne poszerzenie moczowodu i miedniczki z zachowanymi sklepieniami; Stopień IV: znaczne poszerzenie i poskręcanie moczowodu z poszerzeniem miedniczki i zatarciem kątów sklepień kielichów; Stopień V: masywny megamoczowód z całkowitym zatarciem kielichów i odwróceniem brodawek."
    },
    {
      tag: "Diagnostyka obrazowa / Złoty standard",
      q: "Złotym standardem w rozpoznawaniu i określaniu stopnia zaawansowania odpływu pęcherzowo-moczowodowego (VUR) u dzieci jest:",
      opts: [
        "A. Cystouretrografia mikcyjna (CUM / VCUG)",
        "B. Przezbrzuszne USG układu moczowego",
        "C. Urografia dożylna",
        "D. Tomografia komputerowa jamy brzusznej z fazą naczyniową",
        "E. Scyntygrafia dynamiczna 99mTc-DTPA"
      ],
      options: [
        "A. Cystouretrografia mikcyjna (CUM / VCUG)",
        "B. Przezbrzuszne USG układu moczowego",
        "C. Urografia dożylna",
        "D. Tomografia komputerowa jamy brzusznej z fazą naczyniową",
        "E. Scyntygrafia dynamiczna 99mTc-DTPA"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Złotym standardem diagnostyki VUR pozostaje cystouretrografia mikcyjna (CUM / mikcyjna cystografia rentgenowska – VCUG). Umożliwia ona dynamiczną ocenę cofania się kontrastu w fazie wypełniania pęcherza oraz podczas mikcji, precyzyjne ustalenie stopnia VUR (I-V) oraz ocenę cewki moczowej (wykluczenie zastawki cewki tylnej u chłopców).",
      expl: "Złotym standardem diagnostyki VUR pozostaje cystouretrografia mikcyjna (CUM / mikcyjna cystografia rentgenowska – VCUG). Umożliwia ona dynamiczną ocenę cofania się kontrastu w fazie wypełniania pęcherza oraz podczas mikcji, precyzyjne ustalenie stopnia VUR (I-V) oraz ocenę cewki moczowej (wykluczenie zastawki cewki tylnej u chłopców)."
    },
    {
      tag: "Scyntygrafia nerek / Ocena blizn",
      q: "Najczulszym badaniem radioizotopowym służącym do wykrywania blizn w korze nerek (nefropatii refluksowej) po przebytych epizodach ostrego odmiedniczkowego zapalenia nerek jest:",
      opts: [
        "A. Scyntygrafia statyczna z kwasem dimerkaptobursztynowym (99mTc-DMSA)",
        "B. Scyntygrafia dynamiczna z kwasem dietylenotriaminopentaoctowym (99mTc-DTPA)",
        "C. Renografia z merkaptoacetylo-triglicyną (99mTc-MAG3)",
        "D. Pozytonowa tomografia emisyjna (PET) z fluorodeoksyglukozą",
        "E. Scyntygrafia z użyciem koloidu siarkowego"
      ],
      options: [
        "A. Scyntygrafia statyczna z kwasem dimerkaptobursztynowym (99mTc-DMSA)",
        "B. Scyntygrafia dynamiczna z kwasem dietylenotriaminopentaoctowym (99mTc-DTPA)",
        "C. Renografia z merkaptoacetylo-triglicyną (99mTc-MAG3)",
        "D. Pozytonowa tomografia emisyjna (PET) z fluorodeoksyglukozą",
        "E. Scyntygrafia z użyciem koloidu siarkowego"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Scyntygrafia statyczna 99mTc-DMSA jest złotym standardem oceny miąższu nerkowego. Radioznacznik DMSA wiąże się wybiórczo z komórkami cewek bliższych kory nerki. Ogniska zapalne lub zbliznowaciałe widoczne są jako ubytki gromadzenia znacznika ('cold spots'). Pozwala ona również precyzyjnie ocenić względny udział czynnościowy każdej z nerek (norma 45-55%).",
      expl: "Scyntygrafia statyczna 99mTc-DMSA jest złotym standardem oceny miąższu nerkowego. Radioznacznik DMSA wiąże się wybiórczo z komórkami cewek bliższych kory nerki. Ogniska zapalne lub zbliznowaciałe widoczne są jako ubytki gromadzenia znacznika ('cold spots'). Pozwala ona również precyzyjnie ocenić względny udział czynnościowy każdej z nerek (norma 45-55%)."
    },
    {
      tag: "Bezpieczeństwo badań obrazowych / Terminy",
      q: "Cystouretrografię mikcyjną (CUM) u dziecka po przebytym epizodzie gorączkowego ZUM należy wykonać:",
      opts: [
        "A. Po upływie co najmniej 4–6 tygodni od ustąpienia objawów ostrej infekcji, przy potwierdzonym jałowym posiewie moczu",
        "B. W pierwszej dobie od przyjęcia do szpitala, na szczycie gorączki",
        "C. Natychmiast po stwierdzeniu bakteriurii w badaniu ogólnym moczu",
        "D. Po 12 miesiącach od zakończenia antybiotykoterapii",
        "E. Wyłącznie w trakcie trwania mikcji pod znieczuleniem ogólnym"
      ],
      options: [
        "A. Po upływie co najmniej 4–6 tygodni od ustąpienia objawów ostrej infekcji, przy potwierdzonym jałowym posiewie moczu",
        "B. W pierwszej dobie od przyjęcia do szpitala, na szczycie gorączki",
        "C. Natychmiast po stwierdzeniu bakteriurii w badaniu ogólnym moczu",
        "D. Po 12 miesiącach od zakończenia antybiotykoterapii",
        "E. Wyłącznie w trakcie trwania mikcji pod znieczuleniem ogólnym"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Wykonywanie CUM w ostrej fazie ZUM stwarza wysokie ryzyko wywołania posocznicy moczowej oraz daje wyniki fałszywie dodatnie (obrzęk błony śluzowej i działanie neurotoksyn bakteryjnych porażające perystaltykę moczowodu). Badanie planuje się po 4-6 tygodniach od wyleczenia zakażenia, po upewnieniu się, że posiew moczu jest jałowy, i pod osłoną antybakteryjną.",
      expl: "Wykonywanie CUM w ostrej fazie ZUM stwarza wysokie ryzyko wywołania posocznicy moczowej oraz daje wyniki fałszywie dodatnie (obrzęk błony śluzowej i działanie neurotoksyn bakteryjnych porażające perystaltykę moczowodu). Badanie planuje się po 4-6 tygodniach od wyleczenia zakażenia, po upewnieniu się, że posiew moczu jest jałowy, i pod osłoną antybakteryjną."
    },
    {
      tag: "Leczenie zabiegowe / Metoda endoskopowa",
      q: "Małoinwazyjna metoda endoskopowego leczenia odpływu pęcherzowo-moczowodowego (metoda STING) polega na:",
      opts: [
        "A. Podśluzówkowym wstrzyknięciu substancji wypełniającej (np. kopolimeru dekstranomeru i kwasu hialuronowego – Deflux) pod ujście moczowodu za pomocą cystoskopu",
        "B. Laserowym nacięciu ujścia moczowodowego w celu poszerzenia światła",
        "C. Założeniu zewnętrznego stentu moczowodowego na okres 2 lat",
        "D. Koagulacji prądem elektrycznym trójkąta pęcherza moczowego",
        "E. Otwartym przeszczepieniu moczowodu do szczytu pęcherza"
      ],
      options: [
        "A. Podśluzówkowym wstrzyknięciu substancji wypełniającej (np. kopolimeru dekstranomeru i kwasu hialuronowego – Deflux) pod ujście moczowodu za pomocą cystoskopu",
        "B. Laserowym nacięciu ujścia moczowodowego w celu poszerzenia światła",
        "C. Założeniu zewnętrznego stentu moczowodowego na okres 2 lat",
        "D. Koagulacji prądem elektrycznym trójkąta pęcherza moczowego",
        "E. Otwartym przeszczepieniu moczowodu do szczytu pęcherza"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Metoda STING (Subureteric Transurethral Injection) polega na endoskopowym wprowadzeniu igły przez cystoskop i wstrzyknięciu biozgodnej substancji wypełniającej (Deflux) pod ujście moczowodu na godzinie 6. Wypiętrzenie tkanki unosi ujście, zwęża je i wydłuża odcinek podśluzówkowy moczowodu, odtwarzając mechanizm zastawkowy zapobiegający cofaniu moczu.",
      expl: "Metoda STING (Subureteric Transurethral Injection) polega na endoskopowym wprowadzeniu igły przez cystoskop i wstrzyknięciu biozgodnej substancji wypełniającej (Deflux) pod ujście moczowodu na godzinie 6. Wypiętrzenie tkanki unosi ujście, zwęża je i wydłuża odcinek podśluzówkowy moczowodu, odtwarzając mechanizm zastawkowy zapobiegający cofaniu moczu."
    },
    {
      tag: "Zaburzenia mikcji i defekacji / Zespół BBD",
      q: "Które z poniższych stwierdzeń dotyczących zespołu zaburzeń pęcherzowo-jelitowych (BBD – Bladder and Bowel Dysfunction) u dzieci z VUR jest PRAWDZIWE?",
      opts: [
        "A. Przewlekłe zaparcia stolca nasilają dysfunkcję mikcji, zwiększają ciśnienie śródpęcherzowe i sprzyjają nawrotom ZUM, a ich skuteczne leczenie jest warunkiem ustąpienia VUR",
        "B. Zaparcia chronią przed zakażeniami układu moczowego poprzez mechaniczną kompresję dróg moczowych",
        "C. BBD występuje wyłącznie u dzieci z wadami cewy nerwowej",
        "D. Leczenie BBD polega na ograniczeniu podaży płynów do minimum",
        "E. Zaparcia nie mają żadnego wpływu na wskaźnik powodzenia zabiegów antyrefluksowych"
      ],
      options: [
        "A. Przewlekłe zaparcia stolca nasilają dysfunkcję mikcji, zwiększają ciśnienie śródpęcherzowe i sprzyjają nawrotom ZUM, a ich skuteczne leczenie jest warunkiem ustąpienia VUR",
        "B. Zaparcia chronią przed zakażeniami układu moczowego poprzez mechaniczną kompresję dróg moczowych",
        "C. BBD występuje wyłącznie u dzieci z wadami cewy nerwowej",
        "D. Leczenie BBD polega na ograniczeniu podaży płynów do minimum",
        "E. Zaparcia nie mają żadnego wpływu na wskaźnik powodzenia zabiegów antyrefluksowych"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Zaburzenia defekacji (zaparcia) i mikcji (częstomocz, parcia naglące, zaleganie moczu) tworzą zespół BBD. Przepełniona odbytnica uciska pęcherz i cewkę moczową, powodując nieskoordynowane skurcze wypieracza i wysokie ciśnienia śródpęcherzowe. Leczenie zaparć (makrogole, trening mikcyjny) jest kluczowym filarem leczenia zachowawczego VUR.",
      expl: "Zaburzenia defekacji (zaparcia) i mikcji (częstomocz, parcia naglące, zaleganie moczu) tworzą zespół BBD. Przepełniona odbytnica uciska pęcherz i cewkę moczową, powodując nieskoordynowane skurcze wypieracza i wysokie ciśnienia śródpęcherzowe. Leczenie zaparć (makrogole, trening mikcyjny) jest kluczowym filarem leczenia zachowawczego VUR."
    },
    {
      tag: "Wskaż zdanie fałszywe / Postępowanie w VUR",
      q: "Wskaż zdanie FAŁSZYWE dotyczące odpływu pęcherzowo-moczowodowego (VUR) u dzieci:",
      opts: [
        "A. Odpływy niskiego stopnia (I i II stopień) wykazują wysoką tendencję do samoistnego ustępowania wraz ze wzrostem dziecka (nawet >80%)",
        "B. Każde dziecko z VUR I stopnia wymaga natychmiastowej obustronnej operacji otwartej przeszczepienia moczowodów",
        "C. Refluks wewnątrznerkowy dotyczy najczęściej biegunów nerek ze względu na budowę brodawek złożonych",
        "D. Profilaktyka przeciwbakteryjna (CAP) polega na podawaniu pojedynczej dawki leku wieczorem",
        "E. Nefropatia refluksowa może prowadzić do rozwoju nadciśnienia tętniczego zależnego od reniny"
      ],
      options: [
        "A. Odpływy niskiego stopnia (I i II stopień) wykazują wysoką tendencję do samoistnego ustępowania wraz ze wzrostem dziecka (nawet >80%)",
        "B. Każde dziecko z VUR I stopnia wymaga natychmiastowej obustronnej operacji otwartej przeszczepienia moczowodów",
        "C. Refluks wewnątrznerkowy dotyczy najczęściej biegunów nerek ze względu na budowę brodawek złożonych",
        "D. Profilaktyka przeciwbakteryjna (CAP) polega na podawaniu pojedynczej dawki leku wieczorem",
        "E. Nefropatia refluksowa może prowadzić do rozwoju nadciśnienia tętniczego zależnego od reniny"
      ],
      correctIdx: 1,
      correct: 1,
      exp: "Zdanie B jest FAŁSZYWE (i stanowi poprawną odpowiedź). VUR stopnia I i II u małych dzieci traktuje się zachowawczo – wskaźnik samoistnego ustąpienia (dzięki wydłużaniu się odcinka śródściennego moczowodu wraz ze wzrostem pęcherza) sięga 80-90%. Wskazaniem do operacji są odpływy wysokiego stopnia (IV-V), nawroty OZZN pomimo profilaktyki oraz powstawanie nowych blizn w DMSA.",
      expl: "Zdanie B jest FAŁSZYWE (i stanowi poprawną odpowiedź). VUR stopnia I i II u małych dzieci traktuje się zachowawczo – wskaźnik samoistnego ustąpienia (dzięki wydłużaniu się odcinka śródściennego moczowodu wraz ze wzrostem pęcherza) sięga 80-90%. Wskazaniem do operacji są odpływy wysokiego stopnia (IV-V), nawroty OZZN pomimo profilaktyki oraz powstawanie nowych blizn w DMSA."
    },
    {
      tag: "Profilaktyka przeciwbakteryjna (CAP)",
      q: "Jaki lek jest najczęściej stosowany w przewlekłej profilaktyce przeciwbakteryjnej (CAP) u dzieci z odpływem pęcherzowo-moczowodowym powyżej 3. miesiąca życia?",
      opts: [
        "A. Furazydyna (lub nitrofurantoina) w dawce 1–2 mg/kg mc. raz na dobę na noc",
        "B. Cyprofloksacyna w dawce 20 mg/kg mc. dwa razy na dobę",
        "C. Azytromycyna w dawce 10 mg/kg mc. codziennie rano",
        "D. Wankomycyna doustnie co 6 godzin",
        "E. Doksycyklina w dawce 100 mg na dobę"
      ],
      options: [
        "A. Furazydyna (lub nitrofurantoina) w dawce 1–2 mg/kg mc. raz na dobę na noc",
        "B. Cyprofloksacyna w dawce 20 mg/kg mc. dwa razy na dobę",
        "C. Azytromycyna w dawce 10 mg/kg mc. codziennie rano",
        "D. Wankomycyna doustnie co 6 godzin",
        "E. Doksycyklina w dawce 100 mg na dobę"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Lekiem I rzutu w CAP u dzieci powyżej 3 m.ż. jest furazydyna lub nitrofurantoina podawana w dawce 1-2 mg/kg mc. raz na dobę wieczorem przed snem (ewentualnie trimetoprim 1-2 mg/kg mc.). Leki te osiągają wysokie stężenia w moczu, działają w pęcherzu podczas nocnego zalegania moczu i nie indukują oporności ogólnoustrojowej ani dysbakteriozy jelitowej.",
      expl: "Lekiem I rzutu w CAP u dzieci powyżej 3 m.ż. jest furazydyna lub nitrofurantoina podawana w dawce 1-2 mg/kg mc. raz na dobę wieczorem przed snem (ewentualnie trimetoprim 1-2 mg/kg mc.). Leki te osiągają wysokie stężenia w moczu, działają w pęcherzu podczas nocnego zalegania moczu i nie indukują oporności ogólnoustrojowej ani dysbakteriozy jelitowej."
    },
    {
      tag: "Odległe powikłania / Nefropatia refluksowa",
      q: "Najczęstszym odległym powikłaniem sercowo-naczyniowym nefropatii refluksowej u młodych dorosłych jest:",
      opts: [
        "A. Nadciśnienie tętnicze zależne od aktywacji układu renina-angiotensyna-aldosteron (RAA)",
        "B. Kardiomiopatia przerostowa z zawężeniem drogi odpływu",
        "C. Niedomykalność zastawki aortalnej",
        "D. Izolowane niedociśnienie ortostatyczne",
        "E. Tętniak aorty wstępującej"
      ],
      options: [
        "A. Nadciśnienie tętnicze zależne od aktywacji układu renina-angiotensyna-aldosteron (RAA)",
        "B. Kardiomiopatia przerostowa z zawężeniem drogi odpływu",
        "C. Niedomykalność zastawki aortalnej",
        "D. Izolowane niedociśnienie ortostatyczne",
        "E. Tętniak aorty wstępującej"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Blizny pozapalne kory nerkowej wywołują lokalne niedokrwienie miąższu nerkowego, co stymuluje komórki aparatu przykłębuszkowego do nadmiernego wydzielania reniny. Nadciśnienie tętnicze rozwija się u 10-20% pacjentów z nefropatią refluksową, nierzadko w okresie dojrzewania lub wczesnej dorosłości, stanowiąc istotny czynnik ryzyka sercowo-naczyniowego i progresji PChN.",
      expl: "Blizny pozapalne kory nerkowej wywołują lokalne niedokrwienie miąższu nerkowego, co stymuluje komórki aparatu przykłębuszkowego do nadmiernego wydzielania reniny. Nadciśnienie tętnicze rozwija się u 10-20% pacjentów z nefropatią refluksową, nierzadko w okresie dojrzewania lub wczesnej dorosłości, stanowiąc istotny czynnik ryzyka sercowo-naczyniowego i progresji PChN."
    },
    {
      tag: "Wady skojarzone / Zastawka cewki tylnej",
      q: "U noworodka płci męskiej z obustronnym wodonerczem i odpływem pęcherzowo-moczowodowym V stopnia w badaniu CUM uwidoczniono poszerzenie cewki sterczowej i zarys fałdu błony śluzowej. Rozpoznaniem z wyboru jest:",
      opts: [
        "A. Zastawka cewki tylnej (PUV – Posterior Urethral Valves)",
        "B. Spodziectwo żołędziowe",
        "C. Skrajne stulejka wrodzona",
        "D. Pęcherz neurogenny wiotki",
        "E. Zespół nerczycowy wrodzony"
      ],
      options: [
        "A. Zastawka cewki tylnej (PUV – Posterior Urethral Valves)",
        "B. Spodziectwo żołędziowe",
        "C. Skrajne stulejka wrodzona",
        "D. Pęcherz neurogenny wiotki",
        "E. Zespół nerczycowy wrodzony"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Zastawka cewki tylnej (PUV) występuje wyłącznie u chłopców i jest najczęstszą przyczyną podpęcherzowej przeszkody podpęcherzowej u noworodków. Powoduje masywne obustronne wodonercze, przerost ściany pęcherza oraz wtórny obustronny VUR (u ok. 50% chorych). Wymaga pilnej endoskopowej ablacji zastawki.",
      expl: "Zastawka cewki tylnej (PUV) występuje wyłącznie u chłopców i jest najczęstszą przyczyną podpęcherzowej przeszkody podpęcherzowej u noworodków. Powoduje masywne obustronne wodonercze, przerost ściany pęcherza oraz wtórny obustronny VUR (u ok. 50% chorych). Wymaga pilnej endoskopowej ablacji zastawki."
    },
    {
      tag: "Genetyka i screening rodzinny",
      q: "Jakie zalecenie dotyczące rodzeństwa dziecka z wysokim odpływem pęcherzowo-moczowodowym (VUR) jest rekomendowane przez wytyczne urologii dziecięcej?",
      opts: [
        "A. Wykonanie przesiewowego USG układu moczowego u nowonarodzonego rodzeństwa z uwagi na rodzinną predyspozycję do VUR (ryzyko 30-50%)",
        "B. Bezwzględne wykonanie badania CUM u wszystkich członków rodziny do 2. stopnia pokrewieństwa",
        "C. Rutynowe włączenie profilaktyki antybiotykowej u rodzeństwa bez żadnych badań",
        "D. Pobranie biopsji nerek u obojga rodziców",
        "E. Brak jakichkolwiek zaleceń, gdyż VUR nie wykazuje tła genetycznego"
      ],
      options: [
        "A. Wykonanie przesiewowego USG układu moczowego u nowonarodzonego rodzeństwa z uwagi na rodzinną predyspozycję do VUR (ryzyko 30-50%)",
        "B. Bezwzględne wykonanie badania CUM u wszystkich członków rodziny do 2. stopnia pokrewieństwa",
        "C. Rutynowe włączenie profilaktyki antybiotykowej u rodzeństwa bez żadnych badań",
        "D. Pobranie biopsji nerek u obojga rodziców",
        "E. Brak jakichkolwiek zaleceń, gdyż VUR nie wykazuje tła genetycznego"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Odpływ pęcherzowo-moczowodowy wykazuje wyraźną tendencję do występowania rodzinnego (dziedziczenie wielogenowe lub autosomalne dominujące o zmiennej penetracji). Częstość VUR u rodzeństwa pacjenta z refluksem wynosi 30-50%, a u potomstwa rodzica z VUR aż 60%. Zaleca się wykonanie nieinwazyjnego badania przesiewowego USG układu moczowego u noworodków i niemowląt w tej grupie.",
      expl: "Odpływ pęcherzowo-moczowodowy wykazuje wyraźną tendencję do występowania rodzinnego (dziedziczenie wielogenowe lub autosomalne dominujące o zmiennej penetracji). Częstość VUR u rodzeństwa pacjenta z refluksem wynosi 30-50%, a u potomstwa rodzica z VUR aż 60%. Zaleca się wykonanie nieinwazyjnego badania przesiewowego USG układu moczowego u noworodków i niemowląt w tej grupie."
    }
  ],
  flashcards: [
    {
      q: "Jak definiuje się IV stopień odpływu pęcherzowo-moczowodowego (VUR)?",
      a: "Refluks do miedniczki i kielichów z wyraźnym poszerzeniem i poskręcaniem moczowodu, poszerzeniem miedniczki oraz zatarciem kątów sklepień kielichów nerkowych."
    },
    {
      q: "Jakie badanie jest złotym standardem rozpoznawania VUR i kiedy należy je wykonać?",
      a: "Cystouretrografia mikcyjna (CUM / VCUG). Wykonuje się ją po 4–6 tygodniach od ostrego epizodu ZUM, po potwierdzeniu ujemnego posiewu moczu i pod osłoną antybiotyków."
    },
    {
      q: "Jakie badanie jest złotym standardem wykrywania blizn w nefropatii refluksowej?",
      a: "Scyntygrafia statyczna 99mTc-DMSA (ubytki gromadzenia znacznika w korze nerek i ocena procentowego udziału czynnościowego nerek)."
    },
    {
      q: "Na czym polega małoinwazyjny zabieg STING w leczeniu VUR?",
      a: "Na podśluzówkowym wstrzyknięciu pasty biodegradowalnej (Deflux) pod ujście moczowodu za pomocą cystoskopu, co odtwarza mechanizm zastawkowy."
    },
    {
      q: "Dlaczego leczenie zaparć (zespół BBD) jest kluczowe u dziecka z VUR?",
      a: "Masy kałowe uciskają pęcherz i cewkę, powodując wysokie ciśnienia śródpęcherzowe, zaleganie moczu i nasilanie refluksu oraz zakażeń ZUM."
    },
    {
      q: "Jakie jest główne odległe powikłanie sercowo-naczyniowe nefropatii refluksowej?",
      a: "Nadciśnienie tętnicze nerkopochodne zależne od reniny (rozwijające się u 10–20% pacjentów z bliznami korowymi)."
    }
  ]
};

// ==========================================
// CASE 108: APSGN u 7-letniego Bartka
// ==========================================
const case108Data = {
  id: 108,
  filename: "108_popaciorkowcowe_kzn_apsgn.json",
  dept: "Pediatria",
  shortTitle: "7-letni Bartek – Mocz o barwie popłuczyn mięsnych (coca-coli), obrzęki powiek i nadciśnienie po anginie (APSGN)",
  diagnosisTitle: "Ostre popaciorkowcowe kłębuszkowe zapalenie nerek (APSGN – Acute Poststreptococcal Glomerulonephritis)",
  vitals: [
    { label: "Akcja serca (HR)", val: "84/min", sub: "Prawidłowa miarowa", status: "ok" },
    { label: "Ciśnienie tętnicze", val: "138/90 mmHg", sub: "Nadciśnienie tętnicze (>99 centyla dla wieku)", status: "crit" },
    { label: "Saturacja SpO2", val: "99%", sub: "W normie", status: "ok" },
    { label: "Częstość oddechów", val: "20/min", sub: "W normie", status: "ok" },
    { label: "Temperatura ciała", val: "36.8°C", sub: "Prawidłowa", status: "ok" }
  ],
  vitalsObj: { hr: 84, bp: "138/90", spo2: 99, rr: 20, temp: 36.8, gcs: 15 },
  story: "7-letni Bartek został przyprowadzony do szpitalnej izby przyjęć przez zaniepokojonych rodziców z powodu nagłego pojawienia się ciemnobrunatnego moczu o wyglądzie 'popłuczyn mięsnych', mocnej herbaty lub coca-coli. Ponadto od 2 dni rodzice zaobserwowali wyraźne obrzęki powiek i twarzy (szczególnie rano) oraz podudzi, a chłopiec oddaje zdecydowanie mniejsze ilości moczu (skąpomocz / oliguria). Dziecko skarży się na ból głowy w okolicy potylicznej i osłabienie. W badaniu przedmiotowym: ciśnienie tętnicze wynosi 138/90 mmHg (znacznie powyżej 99. centyla dla wieku i wzrostu!), ciastowate obrzęki wokół oczu i na podudziach. W wywiadzie: dokładnie 2 tygodnie (14 dni) wcześniej Bartek przebył ostre zapalenie gardła i migdałków z gorączką 39°C (angina ropna), leczone amoksycyliną, którą rodzice samowolnie odstawili po 3 dniach z powodu poprawy samopoczucia dziecka.",
  labs: {
    "Mocz badanie ogólne i osad": [
      { name: "Barwa i wygląd", val: "Ciemnobrunatna, mętna (popłuczyny mięsne)", norm: "Słomkowa, przejrzysta", flag: "CRIT_HIGH" },
      { name: "Ciężar właściwy", val: "1.026", norm: "1.015 - 1.025", flag: "H" },
      { name: "Białko w moczu", val: "++ (85 mg/dl, podnerczycowy)", norm: "Nieobecne", flag: "H" },
      { name: "Wskaźnik UPCR", val: "0.85 mg/mg", norm: "<0.2 mg/mg (nerczycowy >2.0)", flag: "H" },
      { name: "Erytrocyty w osadzie", val: "Gęsto pokrywają całe pole widzenia", norm: "0-3 wpw", flag: "CRIT_HIGH" },
      { name: "Erytrocyty dysmorficzne", val: "88% (w tym akantocyty)", norm: "<20%", flag: "CRIT_HIGH" },
      { name: "Wałeczki erytrocytarne", val: "Obecne liczne", norm: "Nieobecne", flag: "CRIT_HIGH" },
      { name: "Wałeczki ziarniste", val: "Obecne", norm: "Nieobecne", flag: "H" }
    ],
    "Biochemia krwi i parametry nerkowe": [
      { name: "Kreatynina w surowicy", val: "0.94 mg/dl", norm: "0.30 - 0.55 mg/dl", flag: "CRIT_HIGH" },
      { name: "Mocznik", val: "62 mg/dl", norm: "15 - 36 mg/dl", flag: "CRIT_HIGH" },
      { name: "eGFR wg Schwartza", val: "52 ml/min/1.73m²", norm: ">90 ml/min", flag: "CRIT_LOW" },
      { name: "Białko całkowite", val: "65 g/l", norm: "60 - 80 g/l", flag: "NORMAL" },
      { name: "Albumina", val: "34 g/l", norm: "35 - 50 g/l", flag: "L" },
      { name: "Sód (Na+)", val: "138 mmol/l", norm: "135 - 145 mmol/l", flag: "NORMAL" },
      { name: "Potas (K+)", val: "4.9 mmol/l", norm: "3.5 - 5.0 mmol/l", flag: "NORMAL" }
    ],
    "Immunologia i serologia paciorkowcowa": [
      { name: "Miano antystreptolizyny O (ASO)", val: "1450 IU/ml", norm: "<200 IU/ml", flag: "CRIT_HIGH" },
      { name: "Przeciwciała anty-DNAza B", val: "Wybitnie podwyższone", norm: "Ujemne", flag: "CRIT_HIGH" },
      { name: "Dopełniacz C3", val: "22 mg/dl", norm: "90 - 180 mg/dl", flag: "CRIT_LOW" },
      { name: "Dopełniacz C4", val: "26 mg/dl", norm: "15 - 45 mg/dl (PRAWIDŁOWY)", flag: "NORMAL" },
      { name: "Przeciwciała ANA i ANCA", val: "Ujemne", norm: "Ujemne", flag: "NORMAL" },
      { name: "Przeciwciała anty-GBM", val: "Ujemne", norm: "Ujemne", flag: "NORMAL" }
    ]
  },
  steps: [
    {
      stepNum: 1,
      title: "Krok 1: Wstępna ocena triady Addisa w zespole nefrytycznym",
      desc: "Do oddziału trafia 7-letni chłopiec z ciastowatymi obrzękami powiek, ciśnieniem tętniczym 138/90 mmHg oraz moczem o wyglądzie popłuczyn mięsnych (coca-coli) z oligurią. Dokładnie 14 dni wcześniej przebył ropne zapalenie gardła. Jaki klasyczny zespół kliniczny reprezentują te objawy?",
      scenario: "Do oddziału trafia 7-letni chłopiec z ciastowatymi obrzękami powiek, ciśnieniem tętniczym 138/90 mmHg oraz moczem o wyglądzie popłuczyn mięsnych (coca-coli) z oligurią. Dokładnie 14 dni wcześniej przebył ropne zapalenie gardła. Jaki klasyczny zespół kliniczny reprezentują te objawy?",
      options: [
        {
          text: "Ostry zespół nefrytyczny (triada Addisa: krwiomocz kłębuszkowy + nadciśnienie tętnicze + obrzęki z oligurią)",
          feedback: "✅ PRAWIDŁOWO! Podręcznikowy obraz ostrego zespołu nefrytycznego (tzw. triada Addisa): 1) krwiomocz o barwie popłuczyn mięsnych/coca-coli, 2) nadciśnienie tętnicze (spowodowane hiperwolemią z retencji sodu i wody), 3) obrzęki powiek i twarzy ze skąpomoczem (oligurią). Wywiad anginy ropnej przebytej 2 tygodnie wcześniej natychmiast nasuwa podejrzenie ostrego popaciorkowcowego kłębuszkowego zapalenia nerek (APSGN)."
        },
        {
          text: "Idiopatyczny zespół nerczycowy o zmianach minimalnych (MCD)",
          feedback: "❌ BŁĄD! W zespole nerczycowym dominuje masywny białkomocz (>50 mg/kg/d) i głęboka hipoalbuminemia (<25 g/l), ciśnienie jest zwykle niskie lub prawidłowe, a makrokrwiomocz jest nieobecny."
        },
        {
          text: "Zespół hemolityczno-mocznicowy (HUS)",
          feedback: "❌ BŁĄD! Brak ciężkiej anemii hemolitycznej, brak małopłytkowości, a w wywiadzie była angina paciorkowcowa, a nie krwawa biegunka."
        },
        {
          text: "Ostra kamica nerkowa powikłana wodonerczem",
          feedback: "❌ BŁĄD! Kamica powoduje silną kolkę nerkową z promieniowaniem do pachwiny, a nie uogólnione obrzęki powiek i popłuczyny mięsne z obniżeniem GFR."
        }
      ]
    },
    {
      stepNum: 2,
      title: "Krok 2: Badanie moczu – różnicowanie krwiomoczu kłębuszkowego z urologicznym",
      desc: "Badanie ogólne moczu wykazuje białko ++ (85 mg/dl), a pod mikroskopem całe pole widzenia pokrywają erytrocyty. Jaki parametr w badaniu mikroskopowym osadu moczu rozstrzyga o kłębuszkowym (nefrologicznym) pochodzeniu krwiomoczu?",
      scenario: "Badanie ogólne moczu wykazuje białko ++ (85 mg/dl), a pod mikroskopem całe pole widzenia pokrywają erytrocyty. Jaki parametr w badaniu mikroskopowym osadu moczu rozstrzyga o kłębuszkowym (nefrologicznym) pochodzeniu krwiomoczu?",
      options: [
        {
          text: "Obecność wałeczków erytrocytarnych oraz przewaga erytrocytów dysmorficznych (>80%, w tym akantocytów)",
          feedback: "✅ PRAWIDŁOWO! Znak rozpoznawczy kłębuszkowego zapalenia nerek: obecność wałeczków erytrocytarnych (tworzących się w cewkach nerkowych w obecności białka Tamma-Horsfalla) oraz erytrocytów dysmorficznych (>80%) i akantocytów (krwinek z wypustkami przypominającymi uszy Myszki Miki), które uległy zniekształceniu podczas przeciskania się przez uszkodzoną błonę podstawną kłębuszka. W krwiomoczu urologicznym (kamica, guz, zapalenie pęcherza) dominują erytrocyty izomorficzne (świeże) bez wałeczków."
        },
        {
          text: "Obecność erytrocytów świeżych (izomorficznych) w 100% pola widzenia",
          feedback: "❌ BŁĄD! Erytrocyty świeże (izomorficzne) świadczą o krwawieniu z dolnych dróg moczowych (krwiomocz urologiczny)."
        },
        {
          text: "Obecność kryształów kwasu moczowego i szczawianu wapnia",
          feedback: "❌ BŁĄD! Krystaluria nie dowodzi kłębuszkowego uszkodzenia nerek."
        },
        {
          text: "Wysoki ciężar właściwy moczu (>1.030) bez obecności komórek",
          feedback: "❌ BŁĄD! Ciężar właściwy zależy od zagęszczania moczu, a nie lokalizacji krwawienia."
        }
      ]
    },
    {
      stepNum: 3,
      title: "Krok 3: Analiza serologiczna i czas latencji – pułapki diagnostyczne",
      desc: "Laboratorium podaje: miano ASO 1450 IU/ml, obecne przeciwciała anty-DNAza B. Czas od początku anginy do krwiomoczu wyniósł 14 dni. Jak interpretujesz czas latencji w APSGN w zależności od wrót zakażenia i jak odróżnić go od nefropatii IgA?",
      scenario: "Laboratorium podaje: miano ASO 1450 IU/ml, obecne przeciwciała anty-DNAza B. Czas od początku anginy do krwiomoczu wyniósł 14 dni. Jak interpretujesz czas latencji w APSGN w zależności od wrót zakażenia i jak odróżnić go od nefropatii IgA?",
      options: [
        {
          text: "Czas latencji 1–3 tygodnie po anginie (oraz 3–6 tygodni po liszajcu skóry) jest typowy dla APSGN; w nefropatii IgA krwiomocz pojawia się synfaryngitycznie (w ciągu 24–48 godzin od początku infekcji)",
          feedback: "✅ PRAWIDŁOWO! KARDYNALNE PYTANIE LEK! W APSGN występuje wyraźny bezobjawowy okres utajenia (latencji) niezbędny do wytworzenia przeciwciał i kompleksów immunologicznych: 1–3 tygodnie po zapaleniu gardła oraz 3–6 tygodni po zakażeniach skóry (liszajec zakaźny). Odwrotnie jest w nefropatii IgA (chorobie Bergera), gdzie makrokrwiomocz pojawia się jednocześnie z infekcją gardła ('synfaryngitycznie') w ciągu pierwszych 24–48 godzin."
        },
        {
          text: "Czas latencji 14 dni wyklucza etiologię paciorkowcową, gdyż APSGN występuje zawsze w 1. dobie gorączki",
          feedback: "❌ BŁĄD! Wystąpienie krwiomoczu w 1. dobie wyklucza APSGN i wskazuje na nefropatię IgA!"
        },
        {
          text: "Miano ASO jest podwyższone wyłącznie po zakażeniach skóry, a po anginie nie ma znaczenia",
          feedback: "❌ BŁĄD! Dokładnie na odwrót: ASO rośnie po anginie gardłowej (u >80% chorych), natomiast po zakażeniach skóry (liszajec) stężenie ASO często nie rośnie (lipidy skóry inaktywują streptolizynę O) – wtedy markerem z wyboru są przeciwciała anty-DNAza B!"
        },
        {
          text: "Wynik ASO 1450 IU/ml wymaga natychmiastowego wycięcia migdałków podniebiennych ze wskazań życiowych",
          feedback: "❌ BŁĄD! Tonsillektomia w ostrej fazie APSGN jest przeciwwskazana."
        }
      ]
    },
    {
      stepNum: 4,
      title: "Krok 4: Dynamika układu dopełniacza – klucz do rozpoznania i rokowania",
      desc: "Badania immunologiczne wykazały: stężenie składowej C3 dopełniacza wynosi 22 mg/dl (norma 90-180 mg/dl, głęboki spadek), podczas gdy składowa C4 wynosi 26 mg/dl (w normie). Jaka jest patofizjologia tej selektywnej hipokomplementemii i jaka jest złota reguła kontroli C3 w APSGN?",
      scenario: "Badania immunologiczne wykazały: stężenie składowej C3 dopełniacza wynosi 22 mg/dl (norma 90-180 mg/dl, głęboki spadek), podczas gdy składowa C4 wynosi 26 mg/dl (w normie). Jaka jest patofizjologia tej selektywnej hipokomplementemii i jaka jest złota reguła kontroli C3 w APSGN?",
      options: [
        {
          text: "Wskazuje na aktywację drogi alternatywnej układu dopełniacza; stężenie C3 MUSI znormalizować się w ciągu 6–8 tygodni – brak normalizacji C3 po tym czasie jest bezwzględnym wskazaniem do biopsji nerki!",
          feedback: "✅ PRAWIDŁOWO! KLUCZOWA ZASADA NEFROLOGII DZIECIĘCEJ I LEK! W APSGN dochodzi do wybiórczej aktywacji drogi alternatywnej dopełniacza (antigen SpeB, enzymy paciorkowcowe), co powoduje zużycie składowej C3 przy prawidłowym C4. Obniżenie C3 występuje u >90% chorych w ostrej fazie. Złotą zasadą jest, że stężenie C3 wraca do normy w ciągu 6–8 tygodni. Jeśli po 8 tygodniach C3 nadal pozostaje obniżone, należy podejrzewać błoniaszkorozplemowe KZN (MPGN), kłębuszkopatię C3 lub toczeń rumieniowaty układowy (SLE) i natychmiast wykonać biopsję nerki!"
        },
        {
          text: "Spadek C3 dowodzi wrodzonego niedoboru immunologicznego wymagającego comiesięcznych wlewów immunoglobulin",
          feedback: "❌ BŁĄD! Jest to wtórne zużycie składowej C3 w procesie immunologicznym w kłębuszkach."
        },
        {
          text: "Prawidłowy poziom C4 oznacza, że wynik C3 jest błędem laboratoryjnym i należy go zignorować",
          feedback: "❌ BŁĄD! Prawidłowe C4 przy niskim C3 to klasyczny dowód aktywacji drogi alternatywnej (w drodze klasycznej spadałyby obie składowe)."
        },
        {
          text: "Stężenie C3 pozostaje obniżone do końca życia i nie wymaga żadnej kontroli",
          feedback: "❌ BŁĄD! Utrzymywanie się niskiego C3 powyżej 8 tygodni to alarmujący objaw wskazujący na MPGN lub kłębuszkopatię C3."
        }
      ]
    },
    {
      stepNum: 5,
      title: "Krok 5: Wskazania do biopsji nerki – decyzja u Bartka",
      desc: "Młodszy asystent pyta, czy w związku ze spadkiem eGFR do 52 ml/min i krwiomoczem należy natychmiast wykonać biopsję nerki. Jak brzmi prawidłowa odpowiedź klinicysty?",
      scenario: "Młodszy asystent pyta, czy w związku ze spadkiem eGFR do 52 ml/min i krwiomoczem należy natychmiast wykonać biopsję nerki. Jak brzmi prawidłowa odpowiedź klinicysty?",
      options: [
        {
          text: "W typowym ostrym przebiegu APSGN biopsja nerki NIE JEST WSKAZANA; wskazaniami są: bezmocz trwający >48h, gwałtownie postępujące KZN (RPGN), brak poprawy GFR po 2 tyg., utrzymywanie się hipokomplementemii C3 >8 tyg. lub białkomocz nerczycowy",
          feedback: "✅ PRAWIDŁOWO! W typowym APSGN rozpoznanie stawia się klinicznie i serologicznie (triada Addisa, przebyta angina, wysokie ASO, spadek C3). Umiarkowany przejściowy spadek GFR jest naturalnym elementem ostrej fazy. Wskazaniami do wykonania biopsji nerki są sytuacje nietypowe: 1) ostre gwałtownie postępujące zapalenie kłębuszków (RPGN) z szybką utratą czynności nerek, 2) anuria >48h, 3) brak cech zakażenia paciorkowcowego i prawidłowy poziom C3 na początku, 4) utrzymywanie się niskiego C3 po 6-8 tygodniach, 5) utrzymywanie się białkomoczu nerczycowego >4 tyg., 6) utrzymywanie się makrokrwiomoczu >4 tyg."
        },
        {
          text: "Biopsja nerki jest bezwzględnie konieczna u każdego dziecka z krwiomoczem w ciągu 24 godzin",
          feedback: "❌ BŁĄD! Rutynowa biopsja nerki w typowym APSGN u dziecka jest niepotrzebną procedurą inwazyjną obarczoną ryzykiem powikłań krwotocznych."
        },
        {
          text: "Biopsję należy wykonać wyłącznie wtedy, gdy ciśnienie tętnicze przekracza 120 mmHg",
          feedback: "❌ BŁĄD! Nadciśnienie jest typowym objawem zespołu nefrytycznego i samo w sobie nie stanowi wskazania do biopsji."
        },
        {
          text: "Biopsja jest przeciwwskazana u dzieci poniżej 18. roku życia ze względów prawnych",
          feedback: "❌ BŁĄD! Biopsja nerki jest wykonywana u dzieci w każdym wieku, pod warunkiem istnienia ścisłych wskazań klinicznych."
        }
      ]
    },
    {
      stepNum: 6,
      title: "Krok 6: Postępowanie terapeutyczne w ostrym zespole nefrytycznym",
      desc: "Bartek ma ciśnienie tętnicze 138/90 mmHg, obrzęki, skąpomocz (diureza 0.6 ml/kg/h) oraz eGFR 52 ml/min/1.73m². Jaka jest prawidłowa strategia leczenia typowego APSGN poparta wytycznymi nefrologicznymi?",
      scenario: "Bartek ma ciśnienie tętnicze 138/90 mmHg, obrzęki, skąpomocz (diureza 0.6 ml/kg/h) oraz eGFR 52 ml/min/1.73m². Jaka jest prawidłowa strategia leczenia typowego APSGN poparta wytycznymi nefrologicznymi?",
      options: [
        {
          text: "Leczenie objawowe: ścisła restrykcja podaży sodu i płynów, Furosemid pętlowy (1–2 mg/kg mc. i.v./p.o.) w celu usunięcia przewodnienia oraz lek hipotensyjny (np. amlodypina/labetalol); sterydoterapia NIE jest wskazana",
          feedback: "✅ PRAWIDŁOWO! W typowym APSGN nie ma swoistego leczenia przyczynowego! Glikokortykosteroidy ani leki immunosupresyjne NIE są skuteczne i NIE są zalecane. Leczenie polega na zwalczaniu hiperwolemii: 1) ograniczenie soli w diecie (<1-2 g/d) i restrykcja płynów (straty niewidoczne + bieżąca diureza), 2) diuretyk pętlowy (Furosemid 1-2 mg/kg), który odbarcza przewodnienie, obniża ciśnienie tętnicze i pobudza diurezę, 3) w razie utrzymywania się nadciśnienia – bloker kanału wapniowego (amlodypina) lub wazodylatator."
        },
        {
          text: "Puls metyloprednizolonu dożylnie 1 g przez 3 dni, a następnie prednizon 2 mg/kg mc./d przez 6 miesięcy",
          feedback: "❌ BŁĄD! W typowym popaciorkowcowym KZN sterydy są nieskuteczne i mogą nasilić nadciśnienie tętnicze oraz wywołać powikłania sercowo-naczyniowe!"
        },
        {
          text: "Dożylny wlew 1000 ml 0.9% NaCl w celu szybkiego nawodnienia i 'przepłukania kłębuszków'",
          feedback: "❌ BŁĄD! KARDYNALNY BŁĄD! Pacjent jest przewodniony z oligurią i nadciśnieniem 138/90 mmHg. Wlew soli natychmiast doprowadzi do ostrego obrzęku płuc i obrzęku mózgu z drgawkami!"
        },
        {
          text: "Podanie dożylne heparyny drobnocząsteczkowej w dawkach terapeutycznych",
          feedback: "❌ BŁĄD! Heparyna nie ma wskazań w APSGN i nasili krwawienie kłębuszkowe."
        }
      ]
    },
    {
      stepNum: 7,
      title: "Krok 7: Zapobieganie i postępowanie w powikłaniach zagrażających życiu",
      desc: "W trakcie hospitalizacji u Bartka narasta ból głowy, pojawiają się nudności, a ciśnienie tętnicze wzrasta do 152/98 mmHg. Osłuchowo nad polami płucnymi słyszalne są nieliczne rzężenia drobnobańkowe u podstawy płuc. O czym świadczą te objawy i jak należy zareagować?",
      scenario: "W trakcie hospitalizacji u Bartka narasta ból głowy, pojawiają się nudności, a ciśnienie tętnicze wzrasta do 152/98 mmHg. Osłuchowo nad polami płucnymi słyszalne są nieliczne rzężenia drobnobańkowe u podstawy płuc. O czym świadczą te objawy i jak należy zareagować?",
      options: [
        {
          text: "Zagrażający przełom nadciśnieniowy (encefalopatia nadciśnieniowa) oraz wczesny obrzęk płuc z przewodnienia – wymaga natychmiastowego podania Furosemidu i.v. oraz leku obniżającego ciśnienie tętnicze (np. urapidyl, labetalol lub nikardypina i.v.)",
          feedback: "✅ PRAWIDŁOWO! Najgroźniejszymi powikłaniami ostrej fazy zespołu nefrytycznego są: 1) ostra encefalopatia nadciśnieniowa (ból głowy, zaburzenia widzenia, drgawki, obrzęk mózgu), 2) ostra niewydolność lewokomorowa serca z obrzękiem płuc w wyniku masywnego przewodnienia. Wymaga to natychmiastowej redukcji obciążenia wstępnego (furosemid i.v.) oraz kontrolowanego obniżenia ciśnienia krwi lekami dożylnymi."
        },
        {
          text: "Jest to zapalenie płuc o etiologii pneumokokowej wymagające włączenia wankomycyny w ciągłym wlewie",
          feedback: "❌ BŁĄD! Zastój w płucach i rzężenia wynikają z przewodnienia (niewydolności krążenia lewokomorowej), a nie infekcji bakteryjnej."
        },
        {
          text: "Objawy wynikają z migreny dziecięcej i wymagają podania sumatryptanu",
          feedback: "❌ BŁĄD! Bóle głowy przy ciśnieniu 152/98 mmHg to encefalopatia nadciśnieniowa, podanie tryptanów (zwężających naczynia) mogłoby doprowadzić do udaru mózgu!"
        },
        {
          text: "Wskazana jest natychmiastowa intubacja i płynoterapia z użyciem 20% mannitolu",
          feedback: "❌ BŁĄD! Mannitol u pacjenta ze skąpomoczem i obrzękiem płuc dramatycznie zwiększy objętość krwi krążącej i pogłębi obrzęk płuc."
        }
      ]
    },
    {
      stepNum: 8,
      title: "Krok 8: Rekonwalescencja, rokowanie długoterminowe i eradykacja paciorkowca",
      desc: "Po 7 dniach leczenia furosemidem i amlodypiną diureza powróciła do normy, obrzęki ustąpiły, a ciśnienie tętnicze wynosi 105/65 mmHg. Bartek wypisywany jest do domu. Jakie informacje dotyczące rokowania i czasu ustępowania poszczególnych nieprawidłowości przekazujesz rodzicom?",
      scenario: "Po 7 dniach leczenia furosemidem i amlodypiną diureza powróciła do normy, obrzęki ustąpiły, a ciśnienie tętnicze wynosi 105/65 mmHg. Bartek wypisywany jest do domu. Jakie informacje dotyczące rokowania i czasu ustępowania poszczególnych nieprawidłowości przekazujesz rodzicom?",
      options: [
        {
          text: "Rokowanie u dzieci jest znakomite (>95% pełnego wyleczenia); obrzęki i nadciśnienie ustępują w 1–3 tyg., dopełniacz C3 normalizuje się w 6–8 tyg., białkomocz w 3–6 mies., a mikroskopowy krwinkomocz może utrzymywać się nawet do 1–2 lat bez pogorszenia rokowania",
          feedback: "✅ PRAWIDŁOWO! Znakomite podsumowanie dynamiki zdrowienia w APSGN (bardzo częste pytanie egzaminacyjne!): Rokowanie u dzieci jest wybitnie dobre (>95% nie ma żadnych odległych następstw). Kolejność ustępowania objawów: 1) diureza, obrzęki i nadciśnienie ustępują najszybciej (1-3 tygodnie), 2) stężenie dopełniacza C3 normalizuje się w ciągu 6-8 tygodni (bezwzględna kontrola!), 3) makrokrwiomocz ustępuje w 2-4 tygodnie, 4) białkomocz zanika w 3-6 miesięcy, 5) mikroskopowy krwinkomocz (erytrocyturia w badaniu ogólnym) może przetrwać do 12-24 miesięcy i nie wymaga ograniczania aktywności ani leczenia, o ile inne parametry są prawidłowe. Wskazane jest podanie antybiotyku (penicylina/amoksycylina przez 10 dni) w celu eradykacji ewentualnego przetrwałego nosicielstwa paciorkowca."
        },
        {
          text: "Dziecko ma 90% ryzyko rozwoju schyłkowej niewydolności nerek w ciągu 5 lat i wymaga stałej diety bezbiałkowej",
          feedback: "❌ BŁĄD! U dzieci rokowanie w APSGN jest znakomite (w przeciwieństwie do dorosłych, u których częściej dochodzi do przewlekłej choroby nerek)."
        },
        {
          text: "Wszystkie odchylenia w moczu, łącznie z mikroskopowym krwinkomoczem, muszą zniknąć w ciągu 7 dni",
          feedback: "❌ BŁĄD! Mikroskopowy krwinkomocz może utrzymywać się nawet przez 1-2 lata."
        },
        {
          text: "Należy wdrożyć przewlekłą profilaktykę penicyliną benzatynową domięśniowo co miesiąc do 21. roku życia",
          feedback: "❌ BŁĄD! Przewlekła profilaktyka penicyliną jest wskazana w gorączce reumatycznej, a NIE w popaciorkowcowym kłębuszkowym zapaleniu nerek (APSGN nie ma tendencji do nawrotów z uwagi na swoistą odporność na dany szczep nefrytogenny)."
        }
      ]
    }
  ],
  pathoNodes: [
    {
      badge: "KROK 1: INFEKCJA NEFRYTOGENNYM SZCZEPEM PACIORKOWCA",
      title: "Szczepy nefrytogenne GAS i antygeny SpeB",
      short: "Streptococcus pyogenes grupy A (serotypy M1, M4, M12, M49)",
      detail: "Zakażenie gardła lub skóry wywołane przez specyficzne nefrytogenne szczepy paciorkowca beta-hemolizującego grupy A (GAS). Szczepy te wydzielają swoiste antygeny o powinowactwie do struktur kłębuszka: SpeB (paciorkowcowa egzotoksyna pirogenna B) oraz NAPlr (receptor plazminy związany z zapaleniem nerek). Antygeny te przedostają się do krwioobiegu.",
      target: "Błona śluzowa gardła / skóra i krwioobieg",
      desc: "Okres latencji 1-3 tyg. (gardło) lub 3-6 tyg. (skóra) na syntezę przeciwciał IgG."
    },
    {
      badge: "KROK 2: DEPOZYCJA KOMPLEKSÓW I BŁONA PODSTAWNA",
      title: "Odkładanie kompleksów immunologicznych in situ",
      short: "Tworzenie podnabłonkowych 'garbików' (subepithelial humps)",
      detail: "Kationowe antygeny paciorkowcowe (SpeB) osadzają się w błonie podstawnej kłębuszka, gdzie wiążą krążące przeciwciała IgG pacjenta, tworząc kompleksy immunologiczne in situ (oraz odkładanie krążących kompleksów). W mikroskopie elektronowym widoczne są charakterystyczne olbrzymie, podnabłonkowe depozyty w kształcie garbów (tzw. humps).",
      target: "Podnabłonkowa przestrzeń błony podstawnej kłębuszka",
      desc: "Kluczowy obraz patomorfologiczny: garby podnabłonkowe w mikroskopii elektronowej."
    },
    {
      badge: "KROK 3: AKTYWACJA DROGI ALTERNATYWNEJ DOPEŁNIACZA",
      title: "Zużycie składowej C3 i napływ neutrofilów",
      short: "Selektywna hipokomplementemia C3 (prawidłowe C4)",
      detail: "Zdeponowane kompleksy aktywują kaskadę dopełniacza niemal wyłącznie drogą alternatywną (bez udziału C1q i C4), co prowadzi do masywnego zużycia składowej C3 w surowicy. Uwalniane anafilatoksyny (C3a, C5a) przyciągają neutrofile i makrofagi. Dochodzi do proliferacji komórek śródbłonka i mezangium (rozplemowe wewnątrzwłośniczkowe KZN) oraz ucisku światła włośniczek.",
      target: "Układ dopełniacza i naczynia włosowate kłębuszka",
      desc: "Nacieki leukocytarne i obrzęk śródbłonka zamykające światło włośniczek kłębuszkowych."
    },
    {
      badge: "KROK 4: SPADEK GFR I RETENCJA SODU I WODY",
      title: "Triada Addisa: nadciśnienie, obrzęki i krwinkomocz",
      short: "Przewodnienie hiperwolemiczne i uszkodzenie bariery filtracyjnej",
      detail: "Zamknięcie światła włośniczek kłębuszkowych powoduje gwałtowny spadek filtracji kłębuszkowej (GFR). Cewki nerkowe zachowują zdolność wchłaniania zwrotnego sodu i wody, co prowadzi do masywnej retencji płynów, hiperwolemii, rozlanego obrzęku podścieliska i nadciśnienia tętniczego. Erytrocyty przeciskające się przez szczeliny w uszkodzonej błonie ulegają deformacji (akantocyty) i tworzą wałeczki w cewkach.",
      target: "Kłębuszek, cewki nerkowe i łożysko naczyniowe",
      desc: "Objawy kliniczne: oliguria, mocz o wyglądzie coca-coli, obrzęki powiek i nadciśnienie tętnicze."
    }
  ],
  diffTable: {
    title: "Diagnostyka różnicowa ostrych zespołów nefrytycznych i krwiomoczu u dzieci",
    headers: ["Cecha", "APSGN (Popaciorkowcowe)", "Nefropatia IgA (Berger)", "Plamica Henocha-Schönleina (IgAV)", "Toczeń układowy (LN w SLE)"],
    rows: [
      ["Czas od infekcji", "Długi okres latencji: 1-3 tyg. (gardło), 3-6 tyg. (skóra)", "Synfaryngityczny: 24–48 h (w trakcie infekcji)", "Równocześnie lub kilkanaście dni po infekcji", "Przewlekły, zaostrzenia niezależne od infekcji"],
      ["Dopełniacz C3", "Głęboko obniżony (<8 tyg.), normalizacja w 6-8 tyg.", "PRAWIDŁOWY", "PRAWIDŁOWY", "Obniżone C3 oraz obniżone C4"],
      ["Objawy pozanerkowe", "Obrzęki powiek, nadciśnienie tętnicze", "Zazwyczaj brak (izolowany krwiomocz)", "Plamica uniesiona, bóle brzucha, zapalenie stawów", "Rumień na twarzy (motyl), zapalenie stawów, gorączka"],
      ["Marker serologiczny", "ASO podwyższone, anty-DNAza B", "Często podwyższone stężenie IgA w surowicy (u 50%)", "Podwyższone stężenie IgA w surowicy", "Przeciwciała anty-dsDNA, ANA, anty-Sm"],
      ["Biopsja nerki", "Rozplem wewnątrzwłośniczkowy, 'garbiki' podnabłonkowe", "Złogi mezangialne IgA", "Złogi mezangialne IgA w kłębuszkach", "'Full house' (depozyty IgG, IgA, IgM, C3, C1q)"],
      ["Leczenie I rzutu", "Objawowe (diuretyki pętlowe, restrykcja sodu); BRAK sterydów", "Obserwacja, ACEI/ARB przy białkomoczu >0.5-1 g/d", "GKS przy ciężkich objawach brzusznych/nerkowych", "Glikokortykosteroidy + MMF / cyklofosfamid"],
      ["Rokowanie u dzieci", "Wybitnie dobre (>95% pełne wyleczenie)", "Powolna progresja u 20-30% po kilkunastu latach", "Dobre, rzadko postępuje do PChN", "Poważne, wymaga przewlekłej immunosupresji"]
    ]
  },
  dutySummary: {
    overview: "7-letni Bartek z klasycznym ostrym popaciorkowcowym kłębuszkowym zapaleniem nerek (APSGN) po niedoleczonej anginie ropnej przebytej 14 dni wcześniej. Pełna triada Addisa: krwiomocz kłębuszkowy o barwie coca-coli (erytrocyty dysmorficzne 88%, wałeczki erytrocytarne), obrzęki powiek oraz nadciśnienie tętnicze (138/90 mmHg) z oligurią i przejściowym obniżeniem GFR (52 ml/min). W serologii: wybitnie podwyższone ASO (1450 IU/ml) oraz selektywny spadek dopełniacza C3 (22 mg/dl) przy prawidłowym C4. Wdrożono skuteczne leczenie objawowe furosemidem i restrykcją sodu, uzyskując pełną normalizację ciśnienia i ustąpienie obrzęków.",
    diagnostics: "Badanie ogólne moczu z oceną mikroskopową osadu (erytrocyty dysmorficzne i wałeczki), miano ASO, przeciwciała anty-DNAza B, składowe dopełniacza C3 i C4 (kontrola normalizacji za 6-8 tygodni!), kreatynina, mocznik, elektrolity, USG nerek. Biopsja nerki w typowym APSGN nie jest wskazana.",
    drugsAndDoses: "1. Diuretyk pętlowy: <span class='dose-pill'>Furosemid i.v./p.o. 1–2 mg/kg mc./dobę</span> w 1–2 dawkach do ustąpienia obrzęków i normalizacji ciśnienia.<br>2. W razie utrzymywania się nadciśnienia: <span class='dose-pill'>Amlodypina p.o. 0.1–0.2 mg/kg mc./dobę</span>.<br>3. Eradykacja paciorkowca: <span class='dose-pill'>Fenoksymetylopenicylina p.o. 100 000 j.m./kg mc./dobę</span> (lub Amoksycylina) przez 10 dni.<br>4. KARDYNALNY ZAKAZ: glikokortykosteroidy NIE SĄ WSKAZANE w typowym APSGN!",
    procedures: "Dwa obwodowe wkłucia naczyniowe, pomiar ciśnienia tętniczego co 4-6 godzin, codzienne ważenie na czczo, ścisły bilans płynów (diureza dobowa), ograniczenie podaży sodu w diecie (<1-2 g/d) i płynów.",
    monitoring: "Kontrola stężenia składowej C3 dopełniacza za 6-8 tygodni (bezwzględne wskazanie do biopsji przy braku normalizacji), okresowe badanie moczu pod kątem białkomoczu i krwinkomoczu, kontrola ciśnienia tętniczego."
  },
  lekQuestions: [
    {
      tag: "Objawy kliniczne / Triada Addisa",
      q: "Klasyczna triada Addisa w ostrym zespole nefrytycznym (np. w przebiegu APSGN) obejmuje:",
      opts: [
        "A. Krwiomocz (często o barwie popłuczyn mięsnych), obrzęki (zwłaszcza twarzy i powiek) oraz nadciśnienie tętnicze",
        "B. Masywny białkomocz nerczycowy, głęboką hipoalbuminemię oraz hipercholesterolemię",
        "C. Gorączkę hektyczną, powiększenie śledziony oraz wybroczyny na kończynach dolnych",
        "D. Ból kolkowy w okolicy lędźwiowej, wymioty oraz bezmocz zaporowy",
        "E. Żółtaczkę mechaniczną, świąd skóry oraz stolce odbarwione"
      ],
      options: [
        "A. Krwiomocz (często o barwie popłuczyn mięsnych), obrzęki (zwłaszcza twarzy i powiek) oraz nadciśnienie tętnicze",
        "B. Masywny białkomocz nerczycowy, głęboką hipoalbuminemię oraz hipercholesterolemię",
        "C. Gorączkę hektyczną, powiększenie śledziony oraz wybroczyny na kończynach dolnych",
        "D. Ból kolkowy w okolicy lędźwiowej, wymioty oraz bezmocz zaporowy",
        "E. Żółtaczkę mechaniczną, świąd skóry oraz stolce odbarwione"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Triada Addisa to klasyczny zespół objawów ostrego zespołu nefrytycznego, na który składają się: 1) krwiomocz kłębuszkowy (mocz ciemny, koloru popłuczyn mięsnych, coli lub herbaty), 2) obrzęki (zlokalizowane głównie w okolicy oczodołów i na twarzy rano), 3) nadciśnienie tętnicze (będące wynikiem hiperwolemii w następstwie retencji sodu i wody).",
      expl: "Triada Addisa to klasyczny zespół objawów ostrego zespołu nefrytycznego, na który składają się: 1) krwiomocz kłębuszkowy (mocz ciemny, koloru popłuczyn mięsnych, coli lub herbaty), 2) obrzęki (zwłaszcza twarzy i powiek) oraz nadciśnienie tętnicze (będące wynikiem hiperwolemii w następstwie retencji sodu i wody)."
    },
    {
      tag: "Okres latencji / Różnicowanie z chorobą Bergera",
      q: "U 8-letniego chłopca wystąpił makrokrwiomocz o barwie popłuczyn mięsnych. W wywiadzie stwierdzono przebycie ostrej infekcji. Który z poniższych obrazów klinicznych najbardziej przemawia za ostrym popaciorkowcowym KZN (APSGN), a NIE za nefropatią IgA?",
      opts: [
        "A. Wystąpienie krwiomoczu po 14 dniach od przebytego ropnego zapalenia gardła i migdałków",
        "B. Wystąpienie krwiomoczu w 1. dobie gorączkowego zapalenia gardła (synfaryngitycznie)",
        "C. Całkowicie prawidłowe stężenie składowej C3 dopełniacza w ostrej fazie",
        "D. Brak jakichkolwiek obrzęków i prawidłowe ciśnienie tętnicze",
        "E. Izolowany krwinkomocz bez cech upośledzenia filtracji kłębuszkowej"
      ],
      options: [
        "A. Wystąpienie krwiomoczu po 14 dniach od przebytego ropnego zapalenia gardła i migdałków",
        "B. Wystąpienie krwiomoczu w 1. dobie gorączkowego zapalenia gardła (synfaryngitycznie)",
        "C. Całkowicie prawidłowe stężenie składowej C3 dopełniacza w ostrej fazie",
        "D. Brak jakichkolwiek obrzęków i prawidłowe ciśnienie tętnicze",
        "E. Izolowany krwinkomocz bez cech upośledzenia filtracji kłębuszkowej"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Kluczowym elementem różnicowania APSGN i nefropatii IgA (choroby Bergera) jest czas latencji. W APSGN objawy nerkowe pojawiają się po bezobjawowym okresie utajenia wynoszącym 1-3 tygodnie po anginie (lub 3-6 tygodni po zakażeniu skóry). W nefropatii IgA krwawienie pojawia się synfaryngitycznie (równolegle z infekcją gardła, po 24-48 godzinach), a stężenie dopełniacza C3 jest w niej ZAWSZE prawidłowe.",
      expl: "Kluczowym elementem różnicowania APSGN i nefropatii IgA (choroby Bergera) jest czas latencji. W APSGN objawy nerkowe pojawiają się po bezobjawowym okresie utajenia wynoszącym 1-3 tygodnie po anginie (lub 3-6 tygodni po zakażeniu skóry). W nefropatii IgA krwawienie pojawia się synfaryngitycznie (równolegle z infekcją gardła, po 24-48 godzinach), a stężenie dopełniacza C3 jest w niej ZAWSZE prawidłowe."
    },
    {
      tag: "Układ dopełniacza / Dynamika C3",
      q: "U pacjenta z podejrzeniem ostrego popaciorkowcowego KZN stężenie składowej C3 dopełniacza w ostrej fazie jest głęboko obniżone. Zgodnie z wytycznymi nefrologicznymi stężenie C3 powinno znormalizować się w ciągu:",
      opts: [
        "A. 6 do 8 tygodni",
        "B. 24 do 48 godzin",
        "C. 7 dni",
        "D. 12 do 18 miesięcy",
        "E. Nie ulega normalizacji i pozostaje obniżone przez całe życie"
      ],
      options: [
        "A. 6 do 8 tygodni",
        "B. 24 do 48 godzin",
        "C. 7 dni",
        "D. 12 do 18 miesięcy",
        "E. Nie ulega normalizacji i pozostaje obniżone przez całe życie"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Spadek stężenia składowej C3 dopełniacza (z prawidłowym C4) występuje u >90% pacjentów z APSGN w fazie ostrej na skutek aktywacji drogi alternatywnej. Prawidłowością jest powrót stężenia C3 do wartości referencyjnych w ciągu 6 do 8 tygodni od zachorowania. Brak normalizacji C3 po 8 tygodniach jest bezwzględnym wskazaniem do wykonania biopsji nerki w kierunku błoniaszkorozplemowego KZN (MPGN) lub kłębuszkopatii C3.",
      expl: "Spadek stężenia składowej C3 dopełniacza (z prawidłowym C4) występuje u >90% pacjentów z APSGN w fazie ostrej na skutek aktywacji drogi alternatywnej. Prawidłowością jest powrót stężenia C3 do wartości referencyjnych w ciągu 6 do 8 tygodni od zachorowania. Brak normalizacji C3 po 8 tygodniach jest bezwzględnym wskazaniem do wykonania biopsji nerki w kierunku błoniaszkorozplemowego KZN (MPGN) lub kłębuszkopatii C3."
    },
    {
      tag: "Wskazania do biopsji nerki",
      q: "Która z poniższych sytuacji klinicznych u dziecka z podejrzewanym popaciorkowcowym KZN stanowi bezwzględne wskazanie do wykonania przezskórnej biopsji nerki?",
      opts: [
        "A. Utrzymywanie się obniżonego stężenia składowej C3 dopełniacza powyżej 8 tygodni od początku choroby",
        "B. Obecność mikroskopowego krwinkomoczu w 4. tygodniu choroby",
        "C. Stężenie ASO w surowicy przekraczające 1000 IU/ml",
        "D. Mocz o barwie popłuczyn mięsnych w pierwszych 3 dobach hospitalizacji",
        "E. Ciśnienie tętnicze 130/85 mmHg w 1. dobie hospitalizacji"
      ],
      options: [
        "A. Utrzymywanie się obniżonego stężenia składowej C3 dopełniacza powyżej 8 tygodni od początku choroby",
        "B. Obecność mikroskopowego krwinkomoczu w 4. tygodniu choroby",
        "C. Stężenie ASO w surowicy przekraczające 1000 IU/ml",
        "D. Mocz o barwie popłuczyn mięsnych w pierwszych 3 dobach hospitalizacji",
        "E. Ciśnienie tętnicze 130/85 mmHg w 1. dobie hospitalizacji"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Wskazaniami do wykonania biopsji nerki w przebiegu ostrego zespołu nefrytycznego u dzieci są: 1) utrzymywanie się hipokomplementemii C3 powyżej 6-8 tygodni (podejrzenie MPGN/C3G/SLE), 2) gwałtownie postępujące KZN (RPGN) z szybkim narastaniem mocznicy i bezmoczem, 3) brak cech zakażenia paciorkowcowego przy prawidłowym C3 na początku, 4) utrzymywanie się białkomoczu nerczycowego >4 tyg., 5) makrokrwiomocz trwający >4 tyg.",
      expl: "Wskazaniami do wykonania biopsji nerki w przebiegu ostrego zespołu nefrytycznego u dzieci są: 1) utrzymywanie się hipokomplementemii C3 powyżej 6-8 tygodni (podejrzenie MPGN/C3G/SLE), 2) gwałtownie postępujące KZN (RPGN) z szybkim narastaniem mocznicy i bezmoczem, 3) brak cech zakażenia paciorkowcowego przy prawidłowym C3 na początku, 4) utrzymywanie się białkomoczu nerczycowego >4 tyg., 5) makrokrwiomocz trwający >4 tyg."
    },
    {
      tag: "Badanie ogólne moczu / Kłębuszkowy krwiomocz",
      q: "Pojawienie się jakich elementów w badaniu mikroskopowym osadu moczu jednoznacznie potwierdza kłębuszkowe pochodzenie krwawienia?",
      opts: [
        "A. Wałeczków erytrocytarnych oraz erytrocytów dysmorficznych (akantocytów >5%)",
        "B. Wałeczków leukocytarnych i bakterii",
        "C. Wałeczków szklistych i kryształów kwasu moczowego",
        "D. Erytrocytów wyługowanych i kryształów szczawianu wapnia",
        "E. Komórek nabłonka płaskiego w dużych skupiskach"
      ],
      options: [
        "A. Wałeczków erytrocytarnych oraz erytrocytów dysmorficznych (akantocytów >5%)",
        "B. Wałeczków leukocytarnych i bakterii",
        "C. Wałeczków szklistych i kryształów kwasu moczowego",
        "D. Erytrocytów wyługowanych i kryształów szczawianu wapnia",
        "E. Komórek nabłonka płaskiego w dużych skupiskach"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Obecność wałeczków erytrocytarnych (krwinkowych) jest patognomoniczna dla kłębuszkowego uszkodzenia nerek (erytrocyty uwięzione w macierzy białka Tamma-Horsfalla w świetle cewek nerkowych). Towarzyszy im obecność erytrocytów dysmorficznych (>80%), a zwłaszcza akantocytów (krwinek pierścieniowatych z pęcherzykowatymi wypustkami >5%), powstających wskutek uszkodzenia mechanicznego i osmotycznego w kłębuszku.",
      expl: "Obecność wałeczków erytrocytarnych (krwinkowych) jest patognomoniczna dla kłębuszkowego uszkodzenia nerek (erytrocyty uwięzione w macierzy białka Tamma-Horsfalla w świetle cewek nerkowych). Towarzyszy im obecność erytrocytów dysmorficznych (>80%), a zwłaszcza akantocytów (krwinek pierścieniowatych z pęcherzykowatymi wypustkami >5%), powstających wskutek uszkodzenia mechanicznego i osmotycznego w kłębuszku."
    },
    {
      tag: "Farmakoterapia w APSGN",
      q: "Podstawą postępowania farmakologicznego w ostrym popaciorkowcowym KZN z nadciśnieniem i obrzękami jest:",
      opts: [
        "A. Stosowanie diuretyków pętlowych (np. furosemidu) oraz restrykcja sodu i wody; sterydoterapia nie jest wskazana",
        "B. Natychmiastowe wdrożenie wysokich dawek prednizonu doustnie przez 12 tygodni",
        "C. Wlewy dożylne cyklofosfamidu w pulsach",
        "D. Płynoterapia krystaloidowa 0.9% NaCl w dawce 30 ml/kg mc./dobę",
        "E. Plazmafereza całkowita z wymianą osocza"
      ],
      options: [
        "A. Stosowanie diuretyków pętlowych (np. furosemidu) oraz restrykcja sodu i wody; sterydoterapia nie jest wskazana",
        "B. Natychmiastowe wdrożenie wysokich dawek prednizonu doustnie przez 12 tygodni",
        "C. Wlewy dożylne cyklofosfamidu w pulsach",
        "D. Płynoterapia krystaloidowa 0.9% NaCl w dawce 30 ml/kg mc./dobę",
        "E. Plazmafereza całkowita z wymianą osocza"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Typowe APSGN leczy się wyłącznie objawowo: ograniczenie sodu w diecie, restrykcja podaży płynów oraz diuretyki pętlowe (furosemid 1-2 mg/kg mc.), które usuwają przewodnienie i obniżają ciśnienie tętnicze. Glikokortykosteroidy ani leczenie immunosupresyjne NIE mają zastosowania w niepowikłanym APSGN (brak dowodów na skuteczność, ryzyko powikłań hiperwolemicznych).",
      expl: "Typowe APSGN leczy się wyłącznie objawowo: ograniczenie sodu w diecie, restrykcja podaży płynów oraz diuretyki pętlowe (furosemid 1-2 mg/kg mc.), które usuwają przewodnienie i obniżają ciśnienie tętnicze. Glikokortykosteroidy ani leczenie immunosupresyjne NIE mają zastosowania w niepowikłanym APSGN (brak dowodów na skuteczność, ryzyko powikłań hiperwolemicznych)."
    },
    {
      tag: "Patomorfologia / Mikroskopia elektronowa",
      q: "Charakterystycznym znaleziskiem w badaniu bioptatu nerki w mikroskopie elektronowym u chorego na ostre popaciorkowcowe KZN są:",
      opts: [
        "A. Duże podnabłonkowe depozyty kompleksów immunologicznych w kształcie garbów (tzw. subepithelial humps)",
        "B. Zlanie (fuzja) wyrostków stopowatych podocytów bez żadnych depozytów",
        "C. Podśródbłonkowe linijne depozyty przeciwciał anty-GBM",
        "D. Rozwarstwienie blaszki gęstej błony podstawnej w typie 'skórki koszyka'",
        "E. Całkowity brak jakichkolwiek depozytów i prawidłowa ultrastruktura"
      ],
      options: [
        "A. Duże podnabłonkowe depozyty kompleksów immunologicznych w kształcie garbów (tzw. subepithelial humps)",
        "B. Zlanie (fuzja) wyrostków stopowatych podocytów bez żadnych depozytów",
        "C. Podśródbłonkowe linijne depozyty przeciwciał anty-GBM",
        "D. Rozwarstwienie blaszki gęstej błony podstawnej w typie 'skórki koszyka'",
        "E. Całkowity brak jakichkolwiek depozytów i prawidłowa ultrastruktura"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "W mikroskopie elektronowym patognomoniczną cechą APSGN są olbrzymie, kopulaste depozyty podnabłonkowe (tzw. humps / garbiki), zlokalizowane po zewnętrznej stronie błony podstawnej kłębuszka pod podocytami. W mikroskopie immunofluorescencyjnym widoczne są ziarniste świecenia IgG i C3 (obraz 'gwieździstego nieba').",
      expl: "W mikroskopie elektronowym patognomoniczną cechą APSGN są olbrzymie, kopulaste depozyty podnabłonkowe (tzw. humps / garbiki), zlokalizowane po zewnętrznej stronie błony podstawnej kłębuszka pod podocytami. W mikroskopie immunofluorescencyjnym widoczne są ziarniste świecenia IgG i C3 (obraz 'gwieździstego nieba')."
    },
    {
      tag: "Diagnostyka serologiczna / Zakażenia skóry",
      q: "U dziecka z ostrym kłębuszkowym zapaleniem nerek, u którego wrotami zakażenia paciorkowcowego był liszajec zakaźny skóry, najczulszym wskaźnikiem serologicznym potwierdzającym etiologię paciorkowcową jest oznaczenie:",
      opts: [
        "A. Przeciwciał przeciwko deoksyrybonukleazie B (anty-DNAza B)",
        "B. Miana antystreptolizyny O (ASO)",
        "C. Przeciwciał przeciwjądrowych (ANA)",
        "D. Czynnika reumatoidalnego (RF)",
        "E. Przeciwciał przeciwko peroksydazie tarczycowej (anty-TPO)"
      ],
      options: [
        "A. Przeciwciał przeciwko deoksyrybonukleazie B (anty-DNAza B)",
        "B. Miana antystreptolizyny O (ASO)",
        "C. Przeciwciał przeciwjądrowych (ANA)",
        "D. Czynnika reumatoidalnego (RF)",
        "E. Przeciwciał przeciwko peroksydazie tarczycowej (anty-TPO)"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Podczas zakażeń skóry (liszajec paciorkowcowy) streptolizyna O ulega inaktywacji przez lipidy obecne w naskórku, przez co miano ASO rośnie jedynie u około 50% chorych. Złotym standardem serologicznym w przypadku skórnych wrót zakażenia jest oznaczenie przeciwciał przeciwko deoksyrybonukleazie B (anty-DNAza B) oraz anty-hialuronidazy, których miano rośnie u >90% pacjentów.",
      expl: "Podczas zakażeń skóry (liszajec paciorkowcowy) streptolizyna O ulega inaktywacji przez lipidy obecne w naskórku, przez co miano ASO rośnie jedynie u około 50% chorych. Złotym standardem serologicznym w przypadku skórnych wrót zakażenia jest oznaczenie przeciwciał przeciwko deoksyrybonukleazie B (anty-DNAza B) oraz anty-hialuronidazy, których miano rośnie u >90% pacjentów."
    },
    {
      tag: "Wskaż zdanie fałszywe / Rokowanie w APSGN",
      q: "Wskaż zdanie FAŁSZYWE dotyczące ostrego popaciorkowcowego KZN (APSGN) u dzieci:",
      opts: [
        "A. Ponad 95% dzieci powraca do całkowitego zdrowia bez ubytku funkcji nerek",
        "B. Mikroskopowy krwinkomocz może utrzymywać się nawet przez 1–2 lata od początku choroby i sam w sobie nie pogarsza rokowania",
        "C. U każdego dziecka po przebyciu APSGN konieczna jest comiesięczna profilaktyka penicyliną benzatynową przez 10 lat",
        "D. Makrokrwiomocz ustępuje zazwyczaj w ciągu 2 do 4 tygodni",
        "E. Nadciśnienie tętnicze i obrzęki ustępują zazwyczaj w ciągu pierwszych 1–3 tygodni"
      ],
      options: [
        "A. Ponad 95% dzieci powraca do całkowitego zdrowia bez ubytku funkcji nerek",
        "B. Mikroskopowy krwinkomocz może utrzymywać się nawet przez 1–2 lata od początku choroby i sam w sobie nie pogarsza rokowania",
        "C. U każdego dziecka po przebyciu APSGN konieczna jest comiesięczna profilaktyka penicyliną benzatynową przez 10 lat",
        "D. Makrokrwiomocz ustępuje zazwyczaj w ciągu 2 do 4 tygodni",
        "E. Nadciśnienie tętnicze i obrzęki ustępują zazwyczaj w ciągu pierwszych 1–3 tygodni"
      ],
      correctIdx: 2,
      correct: 2,
      exp: "Zdanie C jest FAŁSZYWE (i stanowi poprawną odpowiedź). Przewlekła profilaktyka penicyliną (np. penicylina benzatynowa co 3-4 tyg.) jest bezwzględnie wskazana w GORĄCZCE REUMATYCZNEJ, aby zapobiec nawrotom zapalenia serca. W popaciorkowcowym KZN (APSGN) taka profilaktyka NIE JEST ZALECANA, ponieważ nawroty APSGN są wyjątkowo rzadkie (rozwija się swoista odporność na dany serotyp nefrytogenny).",
      expl: "Zdanie C jest FAŁSZYWE (i stanowi poprawną odpowiedź). Przewlekła profilaktyka penicyliną (np. penicylina benzatynowa co 3-4 tyg.) jest bezwzględnie wskazana w GORĄCZCE REUMATYCZNEJ, aby zapobiec nawrotom zapalenia serca. W popaciorkowcowym KZN (APSGN) taka profilaktyka NIE JEST ZALECANA, ponieważ nawroty APSGN są wyjątkowo rzadkie (rozwija się swoista odporność na dany serotyp nefrytogenny)."
    },
    {
      tag: "Powikłania ostrej fazy / Przewodnienie",
      q: "Główną przyczyną obrzęków i nadciśnienia tętniczego w ostrej fazie popaciorkowcowego KZN jest:",
      opts: [
        "A. Spadek filtracji kłębuszkowej (GFR) z zachowaną cewkową reabsorpcją sodu i wody, prowadzący do przewodnienia hiperwolemicznego",
        "B. Głęboka hipoalbuminemia poniżej 15 g/l i ucieczka płynu do przestrzeni pozanaczyniowej",
        "C. Masywny skurcz naczyń wywołany guzem chromochłonnym nadnerczy",
        "D. Niedomykalność zastawek żylnych kończyn dolnych",
        "E. Pierwotna nadprodukcja wazopresyny (zespół SIADH)"
      ],
      options: [
        "A. Spadek filtracji kłębuszkowej (GFR) z zachowaną cewkową reabsorpcją sodu i wody, prowadzący do przewodnienia hiperwolemicznego",
        "B. Głęboka hipoalbuminemia poniżej 15 g/l i ucieczka płynu do przestrzeni pozanaczyniowej",
        "C. Masywny skurcz naczyń wywołany guzem chromochłonnym nadnerczy",
        "D. Niedomykalność zastawek żylnych kończyn dolnych",
        "E. Pierwotna nadprodukcja wazopresyny (zespół SIADH)"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "W ostrym zespole nefrytycznym (APSGN) dochodzi do zamknięcia włośniczek kłębuszkowych przez nacieki zapalne i spadek GFR, podczas gdy cewki nerkowe nadal sprawnie resorbują sód i wodę. Prowadzi to do hiperwolemii wewnątrznaczyniowej, która jest bezpośrednią przyczyną nadciśnienia tętniczego i obrzęków (w odróżnieniu od zespołu nerczycowego, gdzie obrzęki wynikają ze spadku ciśnienia onkotycznego w hipoalbuminemii).",
      expl: "W ostrym zespole nefrytycznym (APSGN) dochodzi do zamknięcia włośniczek kłębuszkowych przez nacieki zapalne i spadek GFR, podczas gdy cewki nerkowe nadal sprawnie resorbują sód i wodę. Prowadzi to do hiperwolemii wewnątrznaczyniowej, która jest bezpośrednią przyczyną nadciśnienia tętniczego i obrzęków (w odróżnieniu od zespołu nerczycowego, gdzie obrzęki wynikają ze spadku ciśnienia onkotycznego w hipoalbuminemii)."
    },
    {
      tag: "Paciorkowcowe szczepy nefrytogenne",
      q: "Które serotypy białka M Streptococcus pyogenes są najczęściej związane z rozwojem kłębuszkowego zapalenia nerek po zapaleniu gardła?",
      opts: [
        "A. Serotypy M1, M4, M12",
        "B. Serotypy M49, M55, M57",
        "C. Wszystkie serotypy paciorkowca wywołują KZN z jednakową częstością",
        "D. Wyłącznie serotypy bezotoczkowe",
        "E. Serotypy M2, M3 i M5 wywołujące wyłącznie gorączkę reumatyczną"
      ],
      options: [
        "A. Serotypy M1, M4, M12",
        "B. Serotypy M49, M55, M57",
        "C. Wszystkie serotypy paciorkowca wywołują KZN z jednakową częstością",
        "D. Wyłącznie serotypy bezotoczkowe",
        "E. Serotypy M2, M3 i M5 wywołujące wyłącznie gorączkę reumatyczną"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Nie każdy szczep Streptococcus pyogenes wywołuje KZN – zdolność tę posiadają tzw. szczepy nefrytogenne. W przypadku zakażeń gardła są to najczęściej serotypy M1, M4, M12 (oraz M25). Z kolei zakażenia skóry (liszajec) i wtórne APSGN wywoływane są głównie przez serotypy M49, M55, M57 i M60.",
      expl: "Nie każdy szczep Streptococcus pyogenes wywołuje KZN – zdolność tę posiadają tzw. szczepy nefrytogenne. W przypadku zakażeń gardła są to najczęściej serotypy M1, M4, M12 (oraz M25). Z kolei zakażenia skóry (liszajec) i wtórne APSGN wywoływane są głównie przez serotypy M49, M55, M57 i M60."
    }
  ],
  flashcards: [
    {
      q: "Co składa się na triadę Addisa w ostrym zespole nefrytycznym?",
      a: "1. Krwiomocz kłębuszkowy (barwa popłuczyn mięsnych/coli)\n2. Obrzęki (głównie powiek i twarzy)\n3. Nadciśnienie tętnicze (spowodowane hiperwolemią z retencji sodu)."
    },
    {
      q: "Jaki jest czas latencji w APSGN po zapaleniu gardła vs po zakażeniu skóry?",
      a: "Po zapaleniu gardła (anginie): 1–3 tygodnie (10–21 dni).\nPo liszajcu skóry: 3–6 tygodni (21–40 dni)."
    },
    {
      q: "Jaka jest dynamika stężenia składowej C3 dopełniacza w APSGN?",
      a: "C3 ulega głębokiemu obniżeniu w ostrej fazie (droga alternatywna, C4 w normie). MUSI powrócić do normy w ciągu 6–8 tygodni. Brak normalizacji po 8 tyg. jest bezwzględnym wskazaniem do biopsji nerki!"
    },
    {
      q: "Jakie elementy w osadzie moczu potwierdzają kłębuszkowe pochodzenie krwiomoczu?",
      a: "Wałeczki erytrocytarne (krwinkowe) oraz erytrocyty dysmorficzne (>80%), zwłaszcza akantocyty (>5%)."
    },
    {
      q: "Jak leczy się typowe ostre popaciorkowcowe KZN u dziecka?",
      a: "Objawowo: restrykcja sodu i płynów + diuretyk pętlowy (Furosemid 1–2 mg/kg) + leki hipotensyjne (amlodypina). Sterydy NIE SĄ WSKAZANE!"
    },
    {
      q: "Jakie jest rokowanie w APSGN u dzieci?",
      a: "Wybitnie dobre – ponad 95% dzieci powraca do całkowitego zdrowia. Mikroskopowy krwinkomocz może utrzymywać się bezpiecznie do 1–2 lat."
    }
  ]
};

async function saveAndEncryptCase(caseData, filename) {
  const filePath = path.join(CASES_DIR, filename);
  const jsonStr = JSON.stringify(caseData, null, 2);
  const encryptedObj = await encryptStringAes(jsonStr, MASTER_KEY);
  fs.writeFileSync(filePath, JSON.stringify(encryptedObj, null, 2), 'utf8');
  console.log(`Successfully reworked: ${filename} (LEK Q count: ${caseData.lekQuestions.length}, steps: ${caseData.steps.length})`);
}

(async () => {
  await saveAndEncryptCase(case107Data, '107_odplyw_pecherzowo_moczowodowy_vur.json');
  await saveAndEncryptCase(case108Data, '108_popaciorkowcowe_kzn_apsgn.json');
  console.log("Cases 107 and 108 rework completed successfully!");
})();

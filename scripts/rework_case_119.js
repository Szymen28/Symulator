const fs = require('fs');
const path = require('path');
const { encryptStringAes } = require('./encrypt_case.js');

const MASTER_KEY = '@LEKSzymon28111999';
const CASES_DIR = path.join(__dirname, '..', 'cases');

console.log("Saving Case 119: Wrodzony przerost nadnerczy / WPN (21-OHD)...");

async function saveCase(caseData) {
  const filePath = path.join(CASES_DIR, caseData.filename);
  const jsonStr = JSON.stringify(caseData, null, 2);
  const encrypted = await encryptStringAes(jsonStr, MASTER_KEY);
  fs.writeFileSync(filePath, JSON.stringify(encrypted, null, 2), 'utf8');
  console.log(`[SAVED] Case #${caseData.id}: ${caseData.filename} (LEK Qs: ${caseData.lekQuestions.length}, Steps: ${caseData.steps.length}, Flashcards: ${caseData.flashcards.length})`);
}

const case119 = {
  id: 119,
  filename: "119_wpn_przerost_nadnerczy_21ohd.json",
  dept: "Pediatria",
  shortTitle: "14-dobowy Filip – Ubytek masy ciała, chlustające wymioty i przełom solny (WPN)",
  diagnosisTitle: "Wrodzony przerost nadnerczy (WPN / CAH – Congenital Adrenal Hyperplasia) w postaci klasycznej z utratą soli (salt-wasting) spowodowany niedoborem 21-hydroksylazy (21-OHD)",
  vitals: [
    { label: "Elektrolity (Na / K)", val: "Na+ 118 | K+ 7,6 mmol/l", sub: "Ciężka hiponatremia i zagrażająca hiperkaliemia", status: "vital-crit" },
    { label: "Ciśnienie tętnicze", val: "54/30 mmHg", sub: "Ciężka hipotensja (wstrząs hipowolemiczny)", status: "vital-crit" },
    { label: "Akcja serca (HR)", val: "178/min", sub: "Nitkowate tętno, wysokie załamki T w EKG", status: "vital-crit" },
    { label: "Glukoza / Temp", val: "46 mg/dl | 35,9°C", sub: "Hipoglikemia i hipotermia noworodkowa", status: "vital-warn" }
  ],
  vitalsObj: { hr: 178, bp: "54/30", spo2: 95, rr: 48, temp: 35.9, gcs: 11 },
  story: `<p><strong>Pacjent:</strong> 14-dobowy noworodek płci męskiej Filip (masa urodzeniowa 3450 g, obecnie 2880 g – spadek o >16%) został przyjęty w trybie pilnym na oddział patologii noworodka z powodu postępującego wyniszczenia, apatii, chlustających wymiotów treścią mleczną po każdym karmieniu oraz narastającej wiotkości mięśniowej.</p><p><strong>Wywiad chorobowy:</strong> Ciąża I, poród o czasie siłami natury (Apgar 10). Dziecko zostało wypisane ze szpitala położniczego w 3. dobie życia w stanie dobrym. Od 8. doby matka zauważyła spadek łaknienia, ospałość i ulewania, które w ostatnich 3 dobach przeszły w gwałtowne, chlustające wymioty po każdym przystawieniu do piersi. Chłopiec nie przybiera na wadze, moczy zaledwie 1-2 pieluszki na dobę. Lekarz POZ podejrzewał przerostowe zwężenie odźwiernika (IHPS) i skierował dziecko na ostry dyżur chirurgii dziecięcej.</p><p><strong>Badanie przedmiotowe na SOR:</strong> Noworodek w stanie ogólnym ciężkim, podsypiający, reakcja na bodźce bólowe leniwa (cichy, słaby jęk). Cechy ciężkiego odwodnienia i wstrząsu hipowolemicznego: ciemiączko przednie głęboko zapadnięte, gałki oczne zapadnięte, podsychające i popękane wargi, fałd skórny na brzuchu rozprostowuje się powyżej 3 sekund. Skóra blada, chłodna, marmurkowata na kończynach, nawrót kapilarny CRT 4,5 sekundy. Tętno obwodowe nitkowate. Brzuch miękki, zapadnięty, perystaltyka leniwa, objaw 'oliwki' w nadbrzuszu ujemny. W badaniu narządów płciowych zewnętrznych: fenotyp męski, prącie prawidłowej długości, jądra obustronnie obecne w worku mosznowym, jednak widoczna jest wybitna, ciemnobrązowa hiperpigmentacja skóry moszny oraz otoczek brodawek sutkowych (objaw wzmożonego wydzielania ACTH/MSH). W badaniu EKG: wysokie, spiczaste, symetryczne załamki T oraz poszerzenie zespołów QRS (cechy kardiotoksyczności ciężkiej hiperkaliemii!).</p>`,
  labs: {
    "Elektrolity, gazometria i glikemia (obraz krytyczny)": [
      { name: "Sód w surowicy (Na+)", val: "118 mmol/l", norm: "135 - 145 mmol/l", flag: "CRIT_LOW" },
      { name: "Potas w surowicy (K+)", val: "7,6 mmol/l", norm: "3,5 - 5,5 mmol/l", flag: "CRIT_HIGH" },
      { name: "Chlorki (Cl-)", val: "86 mmol/l", norm: "98 - 107 mmol/l", flag: "CRIT_LOW" },
      { name: "Glukoza z krwi", val: "46 mg/dl", norm: "60 - 100 mg/dl", flag: "CRIT_LOW" },
      { name: "Gazometria (krew włośniczkowa) - pH", val: "7,22", norm: "7,35 - 7,45", flag: "CRIT_LOW" },
      { name: "Gazometria - HCO3-", val: "12,8 mmol/l", norm: "22 - 26 mmol/l", flag: "CRIT_LOW" },
      { name: "Mocznik", val: "68 mg/dl", norm: "15 - 36 mg/dl", flag: "HIGH" },
      { name: "Kreatynina", val: "1,1 mg/dl", norm: "0,2 - 0,4 mg/dl", flag: "HIGH" }
    ],
    "Profil hormonalny nadnerczowy (rozstrzygający)": [
      { name: "17-hydroksyprogesteron (17-OHP)", val: "> 160 nmol/l", norm: "< 10 nmol/l", flag: "CRIT_HIGH" },
      { name: "Kortyzol w surowicy", val: "2,1 ug/dl", norm: "5 - 25 ug/dl", flag: "CRIT_LOW" },
      { name: "ACTH (hormon adrenokortykotropowy)", val: "1240 pg/ml", norm: "10 - 60 pg/ml", flag: "CRIT_HIGH" },
      { name: "Aktywność reninowa osocza (PRA)", val: "Wybitnie podwyższona (>35 ng/ml/h)", norm: "2 - 10 ng/ml/h", flag: "CRIT_HIGH" },
      { name: "Kariotyp cytogenetyczny", val: "46,XY (męski)", norm: "Prawidłowy", flag: "NORMAL" }
    ]
  },
  steps: [
    {
      stepNum: 1,
      title: "Krok 1: Rozpoznanie zagrażającego życiu przełomu z utratą soli",
      desc: "14-dobowy Filip trafia na SOR z ciężkim odwodnieniem, wstrząsem, chlustającymi wymiotami i hiperpigmentacją moszny. W badaniach laboratoryjnych stwierdzasz Na+ 118 mmol/l, K+ 7,6 mmol/l, glukozę 46 mg/dl i kwasicę metaboliczną (pH 7,22). Jaka jest Twoja natychmiastowa diagnoza ratunkowa?",
      scenario: "14-dobowy Filip trafia na SOR z ciężkim odwodnieniem, wstrząsem, chlustającymi wymiotami i hiperpigmentacją moszny. W badaniach laboratoryjnych stwierdzasz Na+ 118 mmol/l, K+ 7,6 mmol/l, glukozę 46 mg/dl i kwasicę metaboliczną (pH 7,22). Jaka jest Twoja natychmiastowa diagnoza ratunkowa?",
      options: [
        {
          text: "Wrodzony przerost nadnerczy (WPN / CAH) – ostra niewydolność kory nadnerczy w przebiegu przełomu solnego (salt-wasting crisis) z ciężką hiponatremią, hiperkaliemią, hipoglikemią i wstrząsem hipowolemicznym",
          correct: true,
          isCorrect: true,
          feedback: "✅ PRAWIDŁOWO! <strong>Klasyczny stan zagrożenia życia w neonatologii i stały pewniak LEK!</strong> Zestawienie: noworodek w 2. tygodniu życia z wymiotami, ciężką hiponatremią (<120 mmol/l), hiperkaliemią (>7 mmol/l), hipoglikemią, kwasicą i hiperpigmentacją krocza to patognomoniczny obraz przełomu z utratą soli (salt-wasting) w przebiegu klasycznego niedoboru 21-hydroksylazy (WPN). Brak aldosteronu uniemożliwia zatrzymywanie sodu w nerkach, powodując masywną ucieczkę soli i wody oraz retencję potasu i jonów H+."
        },
        {
          text: "Przerostowe zwężenie odźwiernika (IHPS)",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD KRYTYCZNY! <strong>Częsta i śmiertelna pułapka diagnostyczna!</strong> W przerostowym zwężeniu odźwiernika wymioty kwasem solnym prowadzą do ZASADOWICY hipochloremicznej z HIPOKALIEMIĄ (niski potas)! W WPN występuje KWASICA metaboliczna z ciężką HIPERKALIEMIĄ (wysoki potas). Pomyłka i operacja dziecka z WPN w hiperkaliemii kończy się zgonem na stole operacyjnym!"
        },
        {
          text: "Sepsa noworodkowa o etiologii paciorkowcowej z hipokaliemią",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>W sepsie nie występuje izolowany zespół utraty soli z K+ 7,6 mmol/l</strong> i hiperpigmentacją moszny."
        },
        {
          text: "Moczówka prosta centralna",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>W moczówce prostej ucieka czysta woda</strong>, co daje ciężką HIPERNATREMIĘ (>160 mmol/l), a nie hiponatremię!"
        }
      ]
    },
    {
      stepNum: 2,
      title: "Krok 2: Natychmiastowe postępowanie resuscytacyjne w przełomie solnym",
      desc: "Dziecko jest we wstrząsie (RR 54/30 mmHg, CRT >4 s), a w EKG widoczne są wysokie, spiczaste załamki T z poszerzeniem QRS (ryzyko nagłego zatrzymania krążenia w asystolii/migotaniu komór!). Jakie postępowanie płynowe i farmakologiczne wdrażasz NATYCHMIAST w pierwszych minutach?",
      scenario: "Dziecko jest we wstrząsie (RR 54/30 mmHg, CRT >4 s), a w EKG widoczne są wysokie, spiczaste załamki T z poszerzeniem QRS (ryzyko nagłego zatrzymania krążenia w asystolii/migotaniu komór!). Jakie postępowanie płynowe i farmakologiczne wdrażasz NATYCHMIAST w pierwszych minutach?",
      options: [
        {
          text: "1. Kardiomonitoring + zabezpieczenie wkłucia dożylnego/doszpikowego, 2. Bolus płynowy 0,9% NaCl 20 ml/kg m.c. w ciągu 30 minut (bez dodatku potasu!), 3. Wyrównanie hipoglikemii (10% Glukoza 2-4 ml/kg bolus), 4. Natychmiastowe dożylne podanie Hydrokortyzonu w dawce ratunkowej 50-100 mg/m² (ok. 25-50 mg i.v.), 5. Kardioprotekcja: 10% Glukonian wapnia 0,5-1 ml/kg i.v. pod kontrolą EKG",
          correct: true,
          isCorrect: true,
          feedback: "✅ PRAWIDŁOWO! <strong>Życiowo ważny protokół leczenia przełomu nadnerczowego!</strong> Wstrząs hipowolemiczny wymaga natychmiastowej ekspansji łożyska naczyniowego 0,9% NaCl (chlorek sodu uzupełnia sód i chlor, bezwzględny zakaz podawania płynów z potasem!). Hipoglikemię wyrównuje się 10% glukozą. Hydrokortyzon i.v. w dawce stresowej (25-50 mg i.v. w bolusie) ma kluczowe działanie substytucyjne (odbudowuje napięcie naczyniowe i hamuje wyrzut ACTH). Przy K+ 7,6 mmol/l i zmianach w EKG glukonian wapnia stabilizuje błonę komórkową kardiomiocytów, chroniąc przed zatrzymaniem krążenia."
        },
        {
          text: "Wlew płynu wieloelektrolitowego z dodatkiem 40 mmol/l chlorku potasu",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD KRYTYCZNY! <strong>Podanie potasu noworodkowi z potasem 7,6 mmol/l doprowadzi do natychmiastowego zgonu w asystolii!</strong>"
        },
        {
          text: "Podanie furosemidu i spironolaktonu w wysokich dawkach",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD KRYTYCZNY! <strong>Spironolakton to bloker aldosteronu oszczędzający potas</strong> – jeszcze bardziej nasili hiperkaliemię i hipowolemię!"
        },
        {
          text: "Pilna laparotomia zwiadowcza w celu nacięcia odźwiernika",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD KRYTYCZNY! <strong>Chłopiec nie ma zwężenia odźwiernika, znieczulenie ogólne we wstrząsie i hiperkaliemii spowoduje zgon!</strong>"
        }
      ]
    },
    {
      stepNum: 3,
      title: "Krok 3: Wyjaśnienie przyczyny hiperpigmentacji skóry moszny",
      desc: "Zauważasz bardzo ciemną, hiperpigmentowaną skórę moszny i otoczek brodawek sutkowych. Jaki mechanizm neuroendokrynny odpowiada za ciemne zabarwienie skóry w WPN?",
      scenario: "Zauważasz bardzo ciemną, hiperpigmentowaną skórę moszny i otoczek brodawek sutkowych. Jaki mechanizm neuroendokrynny odpowiada za ciemne zabarwienie skóry w WPN?",
      options: [
        {
          text: "Brak kortyzolu znosi ujemne sprzężenie zwrotne na przysadkę mózgową, co wywołuje masywne wydzielanie POMC (proopiomelanokortyny), która ulega cięciu do ACTH oraz MSH (melanotropiny stymulującej melanocyty do produkcji melaniny)",
          correct: true,
          isCorrect: true,
          feedback: "✅ PRAWIDŁOWO! <strong>Fizjologia osi podwzgórze-przysadka-nadnercza!</strong> Niedobór 21-hydroksylazy uniemożliwia syntezę kortyzolu. Przysadka 'widząc' brak kortyzolu, rozpaczliwie zwiększa syntezę swojego prekursora – proopiomelanokortyny (POMC). Z POMC powstaje zarówno hormon adrenokortykotropowy (ACTH), jak i melanotropina (alfa-MSH). Ponadto sam ACTH w wysokich stężeniach pobudza receptory melanokortynowe MC1R w skórze, wywołując uogólnione ciemnienie skóry, szczególnie w miejscach fizjologicznie predysponowanych (moszna, krocze, otoczki brodawek, bruzdy dłoniowe)."
        },
        {
          text: "Jest to wylew krwi do worka mosznowego powstały w trakcie porodu",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Krwiak moszny jest asymetryczny i bolesny</strong>, a nie uogólniony z zajęciem brodawek sutkowych."
        },
        {
          text: "Wynika z odkładania się barwników żółciowych w przebiegu atrezji dróg żółciowych",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Żółtaczka daje zabarwienie żółto-zielonkawe</strong>, a nie ciemnobrunatną hiperpigmentację melanocytową."
        },
        {
          text: "Dziecko zostało poparzone przez promienie ultrafioletowe na sali porodowej",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Brak takiego mechanizmu.</strong>"
        }
      ]
    },
    {
      stepNum: 4,
      title: "Krok 4: Złoty standard biochemiczny potwierdzający rozpoznanie",
      desc: "Jakie badanie hormonalne jest kluczowym, rozstrzygającym parametrem laboratoryjnym w diagnostyce najczęstszej postaci WPN (niedoboru 21-hydroksylazy)?",
      scenario: "Jakie badanie hormonalne jest kluczowym, rozstrzygającym parametrem laboratoryjnym w diagnostyce najczęstszej postaci WPN (niedoboru 21-hydroksylazy)?",
      options: [
        {
          text: "Oznaczenie stężenia 17-hydroksyprogesteronu (17-OHP) w surowicy krwi lub na bibule filtracyjnej (spektakularny wzrost stężenia powyżej normy)",
          correct: true,
          isCorrect: true,
          feedback: "✅ PRAWIDŁOWO! <strong>Złoty standard biochemiczny WPN!</strong> 21-hydroksylaza przekształca 17-hydroksyprogesteron w 11-deoksykortyzol. Przy braku tego enzymu substrat (17-OHP) gromadzi się w olbrzymich ilościach i 'przelewa' do szlaku androgenów. Stężenie 17-OHP w surowicy wzrasta wielokrotnie (często >100-300 nmol/l). W Polsce badanie 17-OHP z suchej kropli krwi na bibule (pobranej w 3. dobie życia) wchodzi w skład obowiązkowego powszechnego skriningu noworodkowego!"
        },
        {
          text: "Oznaczenie stężenia hormonu wzrostu (GH) po teście z klonidyną",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Hormon wzrostu bada się w diagnostyce niskorosłości u starszych dzieci.</strong>"
        },
        {
          text: "Oznaczenie parathormonu (PTH) w moczu",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>PTH odpowiada za gospodarkę wapniowo-fosforanową.</strong>"
        },
        {
          text: "Poziom PSA w surowicy",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>PSA to marker raka prostaty u dorosłych mężczyzn.</strong>"
        }
      ]
    },
    {
      stepNum: 5,
      title: "Krok 5: Manifestacja u noworodków płci żeńskiej (46,XX) – wirylizacja",
      desc: "Mama pyta, co by się stało, gdyby urodziła dziewczynkę z tym samym defektem genetycznym. Jak manifestuje się klasyczna postać WPN u noworodków o kariotypie 46,XX (dziewczynek)?",
      scenario: "Mama pyta, co by się stało, gdyby urodziła dziewczynkę z tym samym defektem genetycznym. Jak manifestuje się klasyczna postać WPN u noworodków o kariotypie 46,XX (dziewczynek)?",
      options: [
        {
          text: "Występuje wirylizacja narządów płciowych zewnętrznych (obojnacze narządy płciowe / DSD) – przerost łechtaczki przypominający prącie, zrośnięcie warg sromowych przypominające mosznę oraz wspólne ujście cewki moczowej i pochwy (zatoka moczowo-płciowa) wg skali Pradera (I-V), przy prawidłowej obecności macicy i jajników w USG",
          correct: true,
          isCorrect: true,
          feedback: "✅ PRAWIDŁOWO! <strong>Kluczowe zagadnienie endokrynologii dziecięcej i genetyki!</strong> Nadmiar 17-OHP i progesteronu jest przekierowywany do szlaku syntezy androgenów nadnerczowych (androstenedionu i testosteronu). U płodu żeńskiego (46,XX) wysoki poziom androgenów w życiu wewnątrzmacicznym wywołuje wirylizację narządów zewnętrznych (ocenianą w skali Pradera od st. I – przerost łechtaczki do st. V – całkowity fenotyp męski z 'prąciem' i pustą 'moszną'). Wewnętrzne narządy płciowe (macica, jajowody, jajniki) rozwijają się prawidłowo, ponieważ nie ma jądrowego hormonu antymüllerowskiego (AMH)."
        },
        {
          text: "Dziewczynki rodzą się bez nerek i pęcherza moczowego",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Agenezja nerek to zespół Pottera</strong>, a nie WPN."
        },
        {
          text: "U dziewczynek nie występują żadne objawy, są całkowicie zdrowe",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD KRYTYCZNY! <strong>Wirylizacja u dziewczynek pozwala na natychmiastowe rozpoznanie WPN tuż po porodzie</strong>, co chroni je przed przełomem solnym!"
        },
        {
          text: "Następuje odwrócenie trzewi (situs inversus)",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Situs inversus występuje np. w zespole Kartagenera.</strong>"
        }
      ]
    },
    {
      stepNum: 6,
      title: "Krok 6: Przewlekłe leczenie substytucyjne WPN",
      desc: "Po ustabilizowaniu stanu hemodynamicznego i wyrównaniu elektrolitów u Filipa, jakie przewlekłe leczenie substytucyjne należy wdrożyć i kontynuować do końca życia?",
      scenario: "Po ustabilizowaniu stanu hemodynamicznego i wyrównaniu elektrolitów u Filipa, jakie przewlekłe leczenie substytucyjne należy wdrożyć i kontynuować do końca życia?",
      options: [
        {
          text: "Trójskładnikowa terapia substytucyjna: 1. Glikokortykosteroid: Hydrokortyzon doustnie (10-15 mg/m²/d w 3 dawkach), 2. Mineralokortykosteroid: Fludrokortyzon doustnie (0,05-0,2 mg/d), 3. Suplementacja soli: Chlorek sodu (NaCl 1-2 g/d dodawany do pokarmu w 1. roku życia)",
          correct: true,
          isCorrect: true,
          feedback: "✅ PRAWIDŁOWO! <strong>Złoty standard przewlekłego leczenia WPN z utratą soli!</strong> Terapia opiera się na 3 filarach: 1. Hydrokortyzon zastępuje brakujący kortyzol i hamuje nadmierny wyrzut ACTH, co zatrzymuje nadprodukcję androgenów, 2. Fludrokortyzon (Cortineff) zastępuje aldosteron, umożliwiając wchłanianie sodu i wydalanie potasu w cewkach nerkowych, 3. Chlorek sodu (NaCl) jest niezbędny u niemowląt, ponieważ mleko matki i modyfikowane zawiera zbyt mało sodu dla niedojrzałych cewek nerkowych."
        },
        {
          text: "Podawanie testosteronu domięśniowo raz w tygodniu",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD KRYTYCZNY! <strong>W WPN występuje nadmiar androgenów!</strong> Dodanie testosteronu nasiliłoby wirylizację i przedwczesne zarastanie nasad kości."
        },
        {
          text: "Wyłącznie dieta bezglutenowa bez żadnych leków",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD KRYTYCZNY! <strong>Brak sterydów doprowadzi do ponownego, śmiertelnego przełomu nadnerczowego!</strong>"
        },
        {
          text: "Usunięcie obu nerek i dializoterapia",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Nerki są zdrowe, defekt dotyczy kory nadnerczy!</strong>"
        }
      ]
    },
    {
      stepNum: 7,
      title: "Krok 7: Postępowanie w sytuacjach stresowych (zasada 'stress dose')",
      desc: "Edukujesz rodziców przed wypisem do domu. Co bezwzględnie muszą zrobić z dawką hydrokortyzonu, gdy u Filipa pojawi się gorączka >38,5°C, wymioty, uraz lub infekcja?",
      scenario: "Edukujesz rodziców przed wypisem do domu. Co bezwzględnie muszą zrobić z dawką hydrokortyzonu, gdy u Filipa pojawi się gorączka >38,5°C, wymioty, uraz lub infekcja?",
      options: [
        {
          text: "W warunkach stresu (gorączka, infekcja, ząbkowanie, zabieg chirurgiczny) należy NATYCHMIAST podwoić lub potroić dawkę doustnego hydrokortyzonu (tzw. stress dose); w razie wymiotów lub biegunki uniemożliwiającej wchłonięcie leku podać hydrokortyzon domięśniowo/doodbytniczo i natychmiast zgłosić się do szpitala!",
          correct: true,
          isCorrect: true,
          feedback: "✅ PRAWIDŁOWO! <strong>Życiowo najważniejsza zasada bezpieczeństwa pacjenta z niewydolnością nadnerczy!</strong> U zdrowego człowieka w warunkach stresu (gorączka, ból, infekcja) nadnercza zwiększają wydzielanie kortyzolu 3- do 5-krotnie. Pacjent z WPN nie jest w stanie wyprodukować dodatkowego kortyzolu – brak zwiększenia dawki zewnętrznej ('stress dose') prowadzi do ostrego, śmiertelnego przełomu nadnerczowego. Jeśli dziecko wymiotuje, lek musi być podany parenteralnie (Hydrocortisonum i.m./i.v.)!"
        },
        {
          text: "Całkowicie odstawić hydrokortyzon, aby nie obciążać żołądka",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD KRYTYCZNY! <strong>Odstawienie sterydów w infekcji wywoła natychmiastowy zgon we wstrząsie!</strong>"
        },
        {
          text: "Zmniejszyć dawkę hydrokortyzonu o połowę i podać zimne mleko",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD KRYTYCZNY! <strong>Zmniejszenie dawki w stresie doprowadzi do przełomu solnego!</strong>"
        },
        {
          text: "Podać podwójną dawkę fludrokortyzonu, nie zmieniając hydrokortyzonu",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>W stresie zwiększa się dawkę glikokortykosteroidu (hydrokortyzonu)</strong>, dawka fludrokortyzonu zazwyczaj pozostaje bez zmian."
        }
      ]
    },
    {
      stepNum: 8,
      title: "Krok 8: Badania przesiewowe noworodków w Polsce (screening WPN)",
      desc: "Mama pyta, dlaczego o chorobie nie dowiedziała się wcześniej, skoro w szpitalu pobierano krew z piętki Filipa. Jak funkcjonuje powszechny screening noworodkowy w kierunku WPN w Polsce?",
      scenario: "Mama pyta, dlaczego o chorobie nie dowiedziała się wcześniej, skoro w szpitalu pobierano krew z piętki Filipa. Jak funkcjonuje powszechny screening noworodkowy w kierunku WPN w Polsce?",
      options: [
        {
          text: "W Polsce od 2016 r. badanie przesiewowe w kierunku WPN (oznaczenie 17-OHP z bibuły w 3. dobie życia) obejmuje 100% noworodków; u chłopców objawy przełomu solnego rozwijają się typowo między 7. a 14. dobą, zanim nadejdzie wynik potwierdzający z laboratorium centralnego (dlatego czujność kliniczna lekarza POZ i SOR ratuje życie!)",
          correct: true,
          isCorrect: true,
          feedback: "✅ PRAWIDŁOWO! <strong>Epidemiologia i organizacja opieki neonatologicznej!</strong> Badanie przesiewowe z suchej kropli krwi (bibuła pobierana w 3.-5. dobie życia) ma na celu wczesne wykrycie WPN, szczególnie u chłopców, którzy rodzą się z prawidłowymi zewnętrznymi narządami płciowymi (brak wirylizacji maskuje chorobę!). Niestety, przełom solny rozwija się gwałtownie w 2. tygodniu życia – zanim wynik dotrze do poradni, dziecko może trafić w stanie wstrząsu. Lekarz dyżurny musi rozpoznać przełom klinicznie na podstawie hiponatremii i hiperkaliemii!"
        },
        {
          text: "W Polsce nie wykonuje się żadnych badań przesiewowych noworodków",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Polska ma jeden z najlepszych systemów badań przesiewowych na świecie</strong> (obejmuje m.in. WPN, hipotyreozę, fenyloketonurię, mukowiscydozę i SMA)."
        },
        {
          text: "Screening polega na USG mózgu każdego płodu",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Screening noworodkowy wykonuje się z krwi z piętki na bibułę.</strong>"
        },
        {
          text: "Badanie wykonuje się wyłącznie u dzieci ważących powyżej 5 kg",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! <strong>Obejmuje każdego żywo urodzonego noworodka.</strong>"
        }
      ]
    }
  ],
  pathoNodes: [
    {
      badge: "OGNIWO 1 • Blok enzymatyczny 21-hydroksylazy (CYP21A2)",
      title: "Mutacja genu CYP21A2, deficyt enzymu i załamanie syntezy kortyzolu i aldosteronu",
      short: "Brak 21-hydroksylazy blokuje powstawanie kortyzolu i aldosteronu w korze nadnerczy.",
      detail: "Wrodzony przerost nadnerczy jest chorobą dziedziczoną autosomalnie recesywnie, wywołaną w >95% mutacjami genu CYP21A2 na ramieniu krótkim chromosomu 6 (6p21.3 w rejonie HLA). Enzym 21-hydroksylaza (P450c21) katalizuje kluczową hydroksylację progesteronu do 11-deoksykortykosteronu (szlak aldosteronu) oraz 17-hydroksyprogesteronu (17-OHP) do 11-deoksykortyzolu (szlak kortyzolu). Całkowity brak aktywności enzymatycznej prowadzi do ciężkiego niedoboru obu hormonów steroidowych.",
      target: "Substytucja glikokortykosteroidowa: <span class='dose-pill'>Hydrokortyzon 10-15 mg/m² m.c./dobę p.o.</span> w 3 dawkach podzielonych (zwiększana w stresie).",
      desc: "Mutacja genu CYP21A2, deficyt enzymu i załamanie syntezy kortyzolu i aldosteronu.",
      drugTarget: "Substytucja glikokortykosteroidowa: <span class='dose-pill'>Hydrokortyzon 10-15 mg/m² m.c./dobę p.o.</span> w 3 dawkach podzielonych (zwiększana w stresie)."
    },
    {
      badge: "OGNIWO 2 • Brak ujemnego sprzężenia, wyrzut ACTH i hiperplazja",
      title: "Utrata hamowania przysadki, gigantyczny wyrzut ACTH/MSH i hiperpigmentacja",
      short: "Niski poziom kortyzolu zdejmuje hamulec z przysadki, wywołując potężny wyrzut ACTH i MSH.",
      detail: "Fizjologicznie kortyzol na zasadzie ujemnego sprzężenia zwrotnego hamuje wydzielanie CRH w podwzgórzu oraz POMC/ACTH w przednim płacie przysadki. Skrajny niedobór kortyzolu wyzwala maksymalną stymulację transkrypcji POMC. Masywne ilości ACTH nieustannie pobudzają receptory MC2R w korze nadnerczy, indukując jej obustronny rozrost (hiperplazję), który jednak nie jest w stanie pokonać bloku enzymatycznego. Równocześnie podwyższone stężenia ACTH i alfa-MSH stymulują melanocyty skóry poprzez receptor MC1R, powodując uogólnioną hiperpigmentację moszny i brodawek sutkowych.",
      target: "Hamowanie osi przysadkowej: adekwatna dawka <span class='dose-pill'>Hydrokortyzonu</span> obniża stężenie ACTH i normalizuje pigmentację powłok.",
      desc: "Utrata hamowania przysadki, gigantyczny wyrzut ACTH/MSH i hiperpigmentacja.",
      drugTarget: "Hamowanie osi przysadkowej: adekwatna dawka <span class='dose-pill'>Hydrokortyzonu</span> obniża stężenie ACTH i normalizuje pigmentację powłok."
    },
    {
      badge: "OGNIWO 3 • Przełom z utratą soli (salt-wasting crisis)",
      title: "Brak aldosteronu, ucieczka sodu z moczem, hiperkaliemia, kwasica i wstrząs",
      short: "Brak aldosteronu w nerkach uniemożliwia zatrzymywanie sodu, powodując ucieczkę wody i zapaść.",
      detail: "W cewkach dalszych i zbiorczych nerek aldosteron stymuluje kanały sodowe ENaC oraz pompę Na+/K+-ATPazę, zatrzymując sód w zamian za wydalanie jonów potasu (K+) i wodoru (H+). W postaci z utratą soli brak aldosteronu prowadzi do masywnej, niekontrolowanej ucieczki sodu i wody z moczem (natriurezy) oraz retencji potasu i kwasicy metabolicznej. Spadek objętości wewnątrznaczyniowej wywołuje ciężkie odwodnienie, zagęszczenie krwi, obniżenie rzutu serca i wstrząs hipowolemiczny ze skrajną hiponatremią (<120 mmol/l) i letalną hiperkaliemią (>7-8 mmol/l).",
      target: "Resuscytacja płynowa i mineralokortykosteroidy: <span class='dose-pill'>0,9% NaCl 20 ml/kg m.c. i.v.</span> w bolusie, następnie <span class='dose-pill'>Fludrokortyzon 0,05-0,2 mg/dobę p.o.</span> + <span class='dose-pill'>NaCl 1-2 g/dobę</span> do pokarmu.",
      desc: "Brak aldosteronu, ucieczka sodu z moczem, hiperkaliemia, kwasica i wstrząs.",
      drugTarget: "Resuscytacja płynowa i mineralokortykosteroidy: <span class='dose-pill'>0,9% NaCl 20 ml/kg m.c. i.v.</span> w bolusie, następnie <span class='dose-pill'>Fludrokortyzon 0,05-0,2 mg/dobę p.o.</span> + <span class='dose-pill'>NaCl 1-2 g/dobę</span> do pokarmu."
    },
    {
      badge: "OGNIWO 4 • Przekierowanie substratów i hiperandrogenizm",
      title: "Nagromadzenie 17-OHP, synteza DHEA i androstenedionu oraz wirylizacja płodu 46,XX",
      short: "Zablokowany 17-OHP ucieka do szlaku androgenów, powodując maskulinizację dziewczynek.",
      detail: "Substraty nagromadzone przed blokiem enzymatycznym (głównie 17-OH-progesteron) są w nadmiarze metabolizowane przez 17,20-liazę (CYP17A1) do dehydroepiandrosteronu (DHEA), androstenedionu i testosteronu. U płodów męskich nadmiar androgenów nie zaburza anatomii narządów zewnętrznych poza hiperpigmentacją. U płodów żeńskich (46,XX) w krytycznym okresie różnicowania narządów płciowych (8.-14. tydzień ciąży) wysokie stężenia testosteronu powodują maskulinizację zewnętrznych narządów płciowych (przerost łechtaczki, zrośnięcie warg sromowych, powstanie zatoki moczowo-płciowej), maskując płeć genetyczną noworodka.",
      target: "Leczenie chirurgiczne i rekonstrukcyjne u dziewczynek: feminizująca genitoplastyka w wyspecjalizowanym ośrodku referencyjnym DSD; diagnostyka kariotypu <span class='dose-pill'>46,XX</span>.",
      desc: "Nagromadzenie 17-OHP, synteza DHEA i androstenedionu oraz wirylizacja płodu 46,XX.",
      drugTarget: "Leczenie chirurgiczne i rekonstrukcyjne u dziewczynek: feminizująca genitoplastyka w wyspecjalizowanym ośrodku referencyjnym DSD; diagnostyka kariotypu <span class='dose-pill'>46,XX</span>."
    }
  ],
  diffTable: {
    title: "⚔️ Tabela Różnicowa: Przełom solny w WPN vs Przerostowe zwężenie odźwiernika (IHPS) vs Sepsa noworodkowa vs Zespół nerczycowy",
    headers: ["Cecha kliniczna", "Przełom solny w WPN", "Zwężenie odźwiernika (IHPS)", "Sepsa noworodkowa", "Zespół nerczycowy wrodzony"],
    rows: [
      ["Etiologia", "Niedobór 21-hydroksylazy (mutacja CYP21A2)", "Przerost mięśniówki odźwiernika żołądka", "Zakażenie bakteryjne (GBS, E. coli, Listeria)", "Mutacja nefryny / podocyny (NPHS1/2)"],
      ["Gospodarka sodowa (Na+)", "Ciężka HIPONATREMIA (<120-125 mmol/l)", "Normonatremia lub łagodna hiponatremia", "Normonatremia lub hiponatremia z rozcieńczenia", "Ciężka hiponatremia z przewodnienia"],
      ["Gospodarka potasowa (K+)", "Groźna HIPERKALIEMIA (>6,5-8,0 mmol/l!)", "Ciężka HIPOKALIEMIA (<3,0 mmol/l!)", "Prawidłowy lub zmienny", "Prawidłowy potas"],
      ["Równowaga kwasowo-zasadowa", "KWASICA METABOLICZNA z anion gap", "ZASADOWICA METABOLICZNA hipochloremiczna", "Kwasica mleczanowa (hipoperfuzja)", "Prawidłowa równowaga k-z"],
      ["Wymioty", "Chlustające, treść mleczna (odwodnienie)", "Chlustające, bez żółci, zaraz po karmieniu", "Ulewania, brak apetytu, nietolerancja", "Brak wymiotów"],
      ["Cechy zewnętrzne", "Hiperpigmentacja moszny/krocza; wirylizacja 46,XX", "Objaw 'oliwki' w nadbrzuszu, fale perystaltyczne", "Szare zabarwienie powłok, wybroczyny, wiotkość", "Masywne uogólnione obrzęki (anasarca)"],
      ["Badanie rozstrzygające", "Skrajnie wysoki 17-OHP (>100 nmol/l), ACTH", "USG odźwiernika (grubość mięśniówki >3 mm)", "Posiewy krwi, płynu M-R, CRP, prokalcytonina", "Masywny białkomocz (>50 mg/kg/d), hipoalbuminemia"],
      ["Leczenie I rzutu", "0,9% NaCl + Glukoza + Hydrokortyzon i.v.", "Wyrównanie zasadowicy + Pyloromiotomia Webera-Ramstedta", "Antybiotykoterapia empiryczna (Ampicylina + Gentamycyna)", "Wlewy 20% albuminy + Furosemid, ACEI"]
    ]
  },
  dutySummary: {
    overview: "Wrodzony przerost nadnerczy (WPN / CAH) wywołany blokiem 21-hydroksylazy w postaci z utratą soli jest stanem bezpośredniego zagrożenia życia noworodka. Brak aldosteronu i kortyzolu prowadzi w 2. tygodniu życia do ostrego przełomu solnego z chlustającymi wymiotami, wstrząsem hipowolemicznym, skrajną hiponatremią (<120 mmol/l), zagrażającą zatrzymaniem krążenia hiperkaliemią (>7 mmol/l), hipoglikemią i kwasicą. Wymaga natychmiastowej resuscytacji płynowej 0,9% NaCl, glukozy oraz dożylnej substytucji hydrokortyzonu.",
    diagnostics: "1. Natychmiastowe oznaczenie jonogramu (Na+, K+, Cl-), gazometrii i glikemii przyłóżkowej.<br>2. Monitorowanie EKG w kierunku kardiotoksycznych objawów hiperkaliemii (spiczaste załamki T, poszerzenie QRS, bradykardia).<br>3. Oznaczenie 17-hydroksyprogesteronu (17-OHP) w surowicy krwi oraz weryfikacja wyniku badań przesiewowych noworodków (screening z bibuły).<br>4. Oznaczenie stężenia ACTH, kortyzolu oraz aktywności reninowej osocza (PRA).<br>5. Badanie cytogenetyczne kariotypu (46,XX vs 46,XY) i USG miednicy mniejszej u noworodków z niejednoznacznymi narządami płciowymi (DSD).",
    drugsAndDoses: "1. Wstrząs i rehydratacja: <span class='dose-pill'>0,9% NaCl 20 ml/kg m.c. i.v. w ciągu 30-60 minut</span>; BEZWZGLĘDNY ZAKAZ PŁYNÓW Z POTASEM!<br>2. Wyrównanie hipoglikemii: <span class='dose-pill'>10% Glukoza 2-4 ml/kg m.c. i.v. w bolusie</span>, następnie wlew ciągły.<br>3. Substytucja glikokortykosteroidowa ratunkowa: <span class='dose-pill'>Hydrokortyzon 50-100 mg/m² i.v. bolus</span> (ok. 25-50 mg i.v.), następnie 50-100 mg/m²/d w 4 dawkach podzielonych.<br>4. Kardioprotekcja w ciężkiej hiperkaliemii (>7,5 mmol/l lub zmiany w EKG): <span class='dose-pill'>10% Glukonian wapnia 0,5-1,0 ml/kg m.c. i.v.</span> powoli pod kontrolą EKG.<br>5. Przewlekła terapia substytucyjna: <span class='dose-pill'>Hydrokortyzon 10-15 mg/m²/d p.o.</span> w 3 dawkach + <span class='dose-pill'>Fludrokortyzon 0,05-0,2 mg/d p.o.</span> raz na dobę + <span class='dose-pill'>NaCl 1-2 g/d</span> dodawany do pokarmu w 1. r.ż.",
    procedures: "1. Zabezpieczenie pewnego dostępu naczyniowego (kaniula obwodowa lub wkłucie doszpikowe w razie trudności).<br>2. Założenie cewnika do pęcherza moczowego w celu ścisłego monitorowania diurezy godzinowej.<br>3. Zgłębnik żołądkowy odbarczający zalegającą treść w wymiotach.<br>4. Ciepłe otoczenie noworodka (inkubator zamknięty lub promiennik ciepła w celu walki z hipotermią).<br>5. Edukacja rodziców w zakresie zasady 'stress dose' (podwajanie/potrajanie hydrokortyzonu w infekcjach).",
    monitoring: "1. Ciągły kardiomonitoring rytmu serca i morfologii załamków T w EKG.<br>2. Kontrola elektrolitów (Na+, K+) co 2-4 godziny do czasu stabilizacji powyżej 130 mmol/l sodu i poniżej 5,5 mmol/l potasu.<br>3. Monitorowanie ciśnienia tętniczego metodą nieinwazyjną (NIBP) i czasu nawrotu kapilarnego CRT.<br>4. Ścisła kontrola masy ciała noworodka (ocena tempa nawadniania i przyrostów).<br>5. Okresowa kontrola stężenia 17-OHP, androstenedionu i reniny w poradni endokrynologicznej."
  },
  lekQuestions: [
    {
      id: 1,
      q: "Który z poniższych zestawów zaburzeń biochemicznych w surowicy krwi jest charakterystyczny dla przełomu z utratą soli w przebiegu klasycznej postaci wrodzonego przerostu nadnerczy (WPN)?",
      opts: [
        "A. Ciężka hiponatremia, hiperkaliemia, hipoglikemia oraz kwasica metaboliczna",
        "B. Hipernatremia, hipokaliemia, hiperglikemia oraz zasadowica metaboliczna",
        "C. Prawidłowy sód i potas z izolowaną hiperkalcemią",
        "D. Hiponatremia z hipokaliemią i ciężką hiperurykemią",
        "E. Hipernatremia z hiperkaliemią bez zaburzeń kwasowo-zasadowych"
      ],
      options: [
        "A. Ciężka hiponatremia, hiperkaliemia, hipoglikemia oraz kwasica metaboliczna",
        "B. Hipernatremia, hipokaliemia, hiperglikemia oraz zasadowica metaboliczna",
        "C. Prawidłowy sód i potas z izolowaną hiperkalcemią",
        "D. Hiponatremia z hipokaliemią i ciężką hiperurykemią",
        "E. Hipernatremia z hiperkaliemią bez zaburzeń kwasowo-zasadowych"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Prawidłowa odpowiedź: A. Klasyczny przełom solny w niedoborze 21-hydroksylazy wynika z braku aldosteronu (utrata sodu przez nerki -> hiponatremia; zatrzymanie potasu i protonów -> hiperkaliemia i kwasica) oraz braku kortyzolu (upośledzenie glukoneogenezy -> hipoglikemia).",
      expl: "Prawidłowa odpowiedź: A. Ciężka hiponatremia, hiperkaliemia, hipoglikemia oraz kwasica metaboliczna",
      expl: "Prawidłowa odpowiedź: A. Klasyczny przełom solny w niedoborze 21-hydroksylazy wynika z braku aldosteronu (utrata sodu przez nerki -> hiponatremia; zatrzymanie potasu i protonów -> hiperkaliemia i kwasica) oraz braku kortyzolu (upośledzenie glukoneogenezy -> hipoglikemia)."
    },
    {
      id: 2,
      q: "Jaki parametr biochemiczny oznacza się w Polsce w ramach powszechnego badania przesiewowego noworodków (screening z bibuły) w kierunku wrodzonego przerostu nadnerczy?",
      opts: [
        "A. 17-hydroksyprogesteron (17-OHP)",
        "B. Aldosteron",
        "C. DHEA-SO4",
        "D. Tyreotropinę (TSH)",
        "E. Kortyzol wolny w moczu"
      ],
      options: [
        "A. 17-hydroksyprogesteron (17-OHP)",
        "B. Aldosteron",
        "C. DHEA-SO4",
        "D. Tyreotropinę (TSH)",
        "E. Kortyzol wolny w moczu"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Prawidłowa odpowiedź: A. Markerem przesiewowym WPN z suchej kropli krwi na bibule jest 17-hydroksyprogesteron (17-OHP), którego stężenie w najczęstszej postaci WPN (niedoborze 21-hydroksylazy) wzrasta dramatycznie.",
      expl: "Prawidłowa odpowiedź: A. 17-hydroksyprogesteron (17-OHP)",
      expl: "Prawidłowa odpowiedź: A. Markerem przesiewowym WPN z suchej kropli krwi na bibule jest 17-hydroksyprogesteron (17-OHP), którego stężenie w najczęstszej postaci WPN (niedoborze 21-hydroksylazy) wzrasta dramatycznie."
    },
    {
      id: 3,
      q: "W jaki sposób wrodzony przerost nadnerczy spowodowany niedoborem 21-hydroksylazy manifestuje się u noworodków o kariotypie żeńskim (46,XX)?",
      opts: [
        "A. Obojnactwem narządów płciowych zewnętrznych (wirylizacją: przerostem łechtaczki, zrośnięciem warg sromowych) przy obecności prawidłowej macicy i jajników",
        "B. Brakiem macicy i pochwy przy prawidłowych zewnętrznych narządach żeńskich",
        "C. Wykształceniem jąder w jamie brzusznej",
        "D. Niedorozwojem gruczołów piersiowych u matki",
        "E. Całkowitym brakiem jakichkolwiek objawów przez całe życie"
      ],
      options: [
        "A. Obojnactwem narządów płciowych zewnętrznych (wirylizacją: przerostem łechtaczki, zrośnięciem warg sromowych) przy obecności prawidłowej macicy i jajników",
        "B. Brakiem macicy i pochwy przy prawidłowych zewnętrznych narządach żeńskich",
        "C. Wykształceniem jąder w jamie brzusznej",
        "D. Niedorozwojem gruczołów piersiowych u matki",
        "E. Całkowitym brakiem jakichkolwiek objawów przez całe życie"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Prawidłowa odpowiedź: A. Nadmiar androgenów w życiu płodowym powoduje maskulinizację zewnętrznych narządów płciowych u dziewczynek (skala Pradera I-V). Wewnętrzne narządy rozwijają się prawidłowo (obecna macica i jajniki), ponieważ brak jąder oznacza brak hormonu antymüllerowskiego (AMH).",
      expl: "Prawidłowa odpowiedź: A. Obojnactwem narządów płciowych zewnętrznych (wirylizacją: przerostem łechtaczki, zrośnięciem warg sromowych) przy obecności prawidłowej macicy i jajników",
      expl: "Prawidłowa odpowiedź: A. Nadmiar androgenów w życiu płodowym powoduje maskulinizację zewnętrznych narządów płciowych u dziewczynek (skala Pradera I-V). Wewnętrzne narządy rozwijają się prawidłowo (obecna macica i jajniki), ponieważ brak jąder oznacza brak hormonu antymüllerowskiego (AMH)."
    },
    {
      id: 4,
      q: "Jakie zaburzenie elektrolitowe i równowagi kwasowo-zasadowej pozwala odróżnić przełom solny w WPN od przerostowego zwężenia odźwiernika (IHPS) u wymiotującego noworodka?",
      opts: [
        "A. W WPN występuje hiponatremia, HIPERKALIEMIA i KWASICA, podczas gdy w zwężeniu odźwiernika występuje HIPOKALIEMIA i ZASADOWICA hipochloremiczna",
        "B. W obu chorobach występuje identyczna zasadowica z hiperkaliemią",
        "C. W zwężeniu odźwiernika potas zawsze przekracza 9,0 mmol/l",
        "D. W WPN nie ma zaburzeń elektrolitowych",
        "E. W zwężeniu odźwiernika występuje kwasica ketonowa z glikemią 500 mg/dl"
      ],
      options: [
        "A. W WPN występuje hiponatremia, HIPERKALIEMIA i KWASICA, podczas gdy w zwężeniu odźwiernika występuje HIPOKALIEMIA i ZASADOWICA hipochloremiczna",
        "B. W obu chorobach występuje identyczna zasadowica z hiperkaliemią",
        "C. W zwężeniu odźwiernika potas zawsze przekracza 9,0 mmol/l",
        "D. W WPN nie ma zaburzeń elektrolitowych",
        "E. W zwężeniu odźwiernika występuje kwasica ketonowa z glikemią 500 mg/dl"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Prawidłowa odpowiedź: A. Kluczowa różnica na LEK: zwężenie odźwiernika to utrata kwasu żołądkowego (HCl) -> zasadowica metaboliczna hipochloremiczna z hipokaliemią. WPN to brak aldosteronu -> kwasica metaboliczna z hiperkaliemią.",
      expl: "Prawidłowa odpowiedź: A. W WPN występuje hiponatremia, HIPERKALIEMIA i KWASICA, podczas gdy w zwężeniu odźwiernika występuje HIPOKALIEMIA i ZASADOWICA hipochloremiczna",
      expl: "Prawidłowa odpowiedź: A. Kluczowa różnica na LEK: zwężenie odźwiernika to utrata kwasu żołądkowego (HCl) -> zasadowica metaboliczna hipochloremiczna z hipokaliemią. WPN to brak aldosteronu -> kwasica metaboliczna z hiperkaliemią."
    },
    {
      id: 5,
      q: "Jakie jest postępowanie farmakologiczne I wyboru w ostrym przełomie nadnerczowym u noworodka?",
      opts: [
        "A. Wlew 0,9% NaCl z 10% glukozą oraz dożylne podanie Hydrokortyzonu w dawce stresowej (50-100 mg/m²)",
        "B. Podanie dożylne chlorku potasu i spironolaktonu",
        "C. Dożylny wlew z furosemidu i mannitolu",
        "D. Wstrzyknięcie czystej insuliny w bolusie",
        "E. Podanie deksametazonu doustnie w tabletkach"
      ],
      options: [
        "A. Wlew 0,9% NaCl z 10% glukozą oraz dożylne podanie Hydrokortyzonu w dawce stresowej (50-100 mg/m²)",
        "B. Podanie dożylne chlorku potasu i spironolaktonu",
        "C. Dożylny wlew z furosemidu i mannitolu",
        "D. Wstrzyknięcie czystej insuliny w bolusie",
        "E. Podanie deksametazonu doustnie w tabletkach"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Prawidłowa odpowiedź: A. Leczeniem z wyboru przełomu nadnerczowego jest natychmiastowa rehydratacja 0,9% NaCl (bez potasu!), wyrównanie hipoglikemii 10% glukozą oraz podanie hydrokortyzonu i.v. w dawce ratunkowej.",
      expl: "Prawidłowa odpowiedź: A. Wlew 0,9% NaCl z 10% glukozą oraz dożylne podanie Hydrokortyzonu w dawce stresowej (50-100 mg/m²)",
      expl: "Prawidłowa odpowiedź: A. Leczeniem z wyboru przełomu nadnerczowego jest natychmiastowa rehydratacja 0,9% NaCl (bez potasu!), wyrównanie hipoglikemii 10% glukozą oraz podanie hydrokortyzonu i.v. w dawce ratunkowej."
    },
    {
      id: 6,
      q: "Dlaczego u noworodka z klasyczną postacią WPN obserwuje się hiperpigmentację skóry moszny i otoczek brodawek?",
      opts: [
        "A. Brak kortyzolu znosi ujemne sprzężenie zwrotne, powodując masywne wydzielanie ACTH i MSH (melanotropiny) przez przysadkę",
        "B. Wirusowe zapalenie skóry wywołane przez wirus cytomegalii",
        "C. Złogi hemosyderyny po krwotoku dokomorowym",
        "D. Zwiększone stężenie witaminy B12 we krwi",
        "E. Działanie leków przeciwgorączkowych podawanych matce w ciąży"
      ],
      options: [
        "A. Brak kortyzolu znosi ujemne sprzężenie zwrotne, powodując masywne wydzielanie ACTH i MSH (melanotropiny) przez przysadkę",
        "B. Wirusowe zapalenie skóry wywołane przez wirus cytomegalii",
        "C. Złogi hemosyderyny po krwotoku dokomorowym",
        "D. Zwiększone stężenie witaminy B12 we krwi",
        "E. Działanie leków przeciwgorączkowych podawanych matce w ciąży"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Prawidłowa odpowiedź: A. Skrajny niedobór kortyzolu prowadzi do zniesienia ujemnego sprzężenia zwrotnego na przysadkę i gigantycznego wydzielania proopiomelanokortyny (POMC), prekursora ACTH i MSH, co stymuluje melanocyty.",
      expl: "Prawidłowa odpowiedź: A. Brak kortyzolu znosi ujemne sprzężenie zwrotne, powodując masywne wydzielanie ACTH i MSH (melanotropiny) przez przysadkę",
      expl: "Prawidłowa odpowiedź: A. Skrajny niedobór kortyzolu prowadzi do zniesienia ujemnego sprzężenia zwrotnego na przysadkę i gigantycznego wydzielania proopiomelanokortyny (POMC), prekursora ACTH i MSH, co stymuluje melanocyty."
    },
    {
      id: 7,
      q: "Który lek stanowi podstawę przewlekłego leczenia substytucyjnego niedoboru mineralokortykosteroidów w WPN?",
      opts: [
        "A. Fludrokortyzon",
        "B. Deksametazon",
        "C. Spironolakton",
        "D. Eplerenon",
        "E. Kaptopryl"
      ],
      options: [
        "A. Fludrokortyzon",
        "B. Deksametazon",
        "C. Spironolakton",
        "D. Eplerenon",
        "E. Kaptopryl"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Prawidłowa odpowiedź: A. Fludrokortyzon (Cortineff) jest silnym syntetycznym mineralokortykosteroidem zastępującym brakujący aldosteron w kanalikach nerkowych.",
      expl: "Prawidłowa odpowiedź: A. Fludrokortyzon",
      expl: "Prawidłowa odpowiedź: A. Fludrokortyzon (Cortineff) jest silnym syntetycznym mineralokortykosteroidem zastępującym brakujący aldosteron w kanalikach nerkowych."
    },
    {
      id: 8,
      q: "Na czym polega zasada 'stress dose' u dziecka z przewlekle leczonym wrodzonym przerostem nadnerczy?",
      opts: [
        "A. Na 2- do 3-krotnym zwiększeniu dawki doustnego hydrokortyzonu w sytuacjach stresu metabolicznego (gorączka >38,5°C, zakażenie, uraz, operacja)",
        "B. Na natychmiastowym odstawieniu wszystkich sterydów w czasie infekcji",
        "C. Na podaniu potasu w czopku przy gorączce",
        "D. Na ograniczeniu podaży płynów do zera",
        "E. Na zastosowaniu podwójnej dawki fludrokortyzonu bez zmiany hydrokortyzonu"
      ],
      options: [
        "A. Na 2- do 3-krotnym zwiększeniu dawki doustnego hydrokortyzonu w sytuacjach stresu metabolicznego (gorączka >38,5°C, zakażenie, uraz, operacja)",
        "B. Na natychmiastowym odstawieniu wszystkich sterydów w czasie infekcji",
        "C. Na podaniu potasu w czopku przy gorączce",
        "D. Na ograniczeniu podaży płynów do zera",
        "E. Na zastosowaniu podwójnej dawki fludrokortyzonu bez zmiany hydrokortyzonu"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Prawidłowa odpowiedź: A. W stresie zapotrzebowanie na glikokortykosteroidy gwałtownie rośnie. Brak zwiększenia dawki hydrokortyzonu ('stress dose') grozi natychmiastowym rozwinięciem zagrażającego życiu przełomu nadnerczowego.",
      expl: "Prawidłowa odpowiedź: A. Na 2- do 3-krotnym zwiększeniu dawki doustnego hydrokortyzonu w sytuacjach stresu metabolicznego (gorączka >38,5°C, zakażenie, uraz, operacja)",
      expl: "Prawidłowa odpowiedź: A. W stresie zapotrzebowanie na glikokortykosteroidy gwałtownie rośnie. Brak zwiększenia dawki hydrokortyzonu ('stress dose') grozi natychmiastowym rozwinięciem zagrażającego życiu przełomu nadnerczowego."
    },
    {
      id: 9,
      q: "Jaki jest wzorzec dziedziczenia wrodzonego przerostu nadnerczy wywołanego niedoborem 21-hydroksylazy?",
      opts: [
        "A. Autosomalny recesywny",
        "B. Autosomalny dominujący",
        "C. Sprzężony z chromosomem X recesywny",
        "D. Mitochondrialny",
        "E. Sprzężony z chromosomem Y"
      ],
      options: [
        "A. Autosomalny recesywny",
        "B. Autosomalny dominujący",
        "C. Sprzężony z chromosomem X recesywny",
        "D. Mitochondrialny",
        "E. Sprzężony z chromosomem Y"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Prawidłowa odpowiedź: A. WPN dziedziczy się w sposób autosomalny recesywny (mutacja w obu kopiach genu CYP21A2). Ryzyko urodzenia chorego dziecka przez dwoje bezobjawowych nosicieli wynosi 25%.",
      expl: "Prawidłowa odpowiedź: A. Autosomalny recesywny",
      expl: "Prawidłowa odpowiedź: A. WPN dziedziczy się w sposób autosomalny recesywny (mutacja w obu kopiach genu CYP21A2). Ryzyko urodzenia chorego dziecka przez dwoje bezobjawowych nosicieli wynosi 25%."
    },
    {
      id: 10,
      q: "Dlaczego u noworodka z hiperkaliemią 7,6 mmol/l i spiczastymi załamkami T w EKG podaje się dożylnie glukonian wapnia?",
      opts: [
        "A. W celu stabilizacji błony komórkowej kardiomiocytów (działanie kardioprotekcyjne zapobiegające groźnym arytmiom i zatrzymaniu krążenia)",
        "B. Aby obniżyć stężenie potasu w surowicy poprzez zwiększenie jego wydalania z moczem",
        "C. W celu zakwaszenia krwi",
        "D. Aby podwyższyć ciśnienie skurczowe o 100 mmHg",
        "E. Wapń neutralizuje działanie hydrokortyzonu"
      ],
      options: [
        "A. W celu stabilizacji błony komórkowej kardiomiocytów (działanie kardioprotekcyjne zapobiegające groźnym arytmiom i zatrzymaniu krążenia)",
        "B. Aby obniżyć stężenie potasu w surowicy poprzez zwiększenie jego wydalania z moczem",
        "C. W celu zakwaszenia krwi",
        "D. Aby podwyższyć ciśnienie skurczowe o 100 mmHg",
        "E. Wapń neutralizuje działanie hydrokortyzonu"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Prawidłowa odpowiedź: A. Wapń nie obniża poziomu potasu, ale natychmiastowo stabilizuje potencjał progowy błony kardiomiocytów, chroniąc serce przed migotaniem komór i asystolią.",
      expl: "Prawidłowa odpowiedź: A. W celu stabilizacji błony komórkowej kardiomiocytów (działanie kardioprotekcyjne zapobiegające groźnym arytmiom i zatrzymaniu krążenia)",
      expl: "Prawidłowa odpowiedź: A. Wapń nie obniża poziomu potasu, ale natychmiastowo stabilizuje potencjał progowy błony kardiomiocytów, chroniąc serce przed migotaniem komór i asystolią."
    },
    {
      id: 11,
      q: "Dlaczego u niemowląt w 1. roku życia leczonych z powodu postaci WPN z utratą soli konieczna jest stała suplementacja chlorku sodu (NaCl)?",
      opts: [
        "A. Ponieważ pokarm naturalny (mleko kobiece) i mieszanki modyfikowane zawierają małe stężenie sodu, a niedojrzałe cewki nerkowe niemowląt wykazują fizjologiczną oporność na mineralokortykosteroidy",
        "B. Aby dziecko szybciej nauczyło się mówić",
        "C. Sól hamuje wydzielanie śliny",
        "D. W celu zakwaszenia moczu i zapobiegania kamicy",
        "E. Chlorek sodu zastępuje całkowicie hydrokortyzon"
      ],
      options: [
        "A. Ponieważ pokarm naturalny (mleko kobiece) i mieszanki modyfikowane zawierają małe stężenie sodu, a niedojrzałe cewki nerkowe niemowląt wykazują fizjologiczną oporność na mineralokortykosteroidy",
        "B. Aby dziecko szybciej nauczyło się mówić",
        "C. Sól hamuje wydzielanie śliny",
        "D. W celu zakwaszenia moczu i zapobiegania kamicy",
        "E. Chlorek sodu zastępuje całkowicie hydrokortyzon"
      ],
      correctIdx: 0,
      correct: 0,
      exp: "Prawidłowa odpowiedź: A. W 1. roku życia dieta niemowlęcia jest niskosodowa, a cewki nerkowe nie reagują w pełni na fludrokortyzon, dlatego dodatek 1-2 g NaCl/dobę jest kluczowy dla utrzymania prawidłowej wolemii.",
      expl: "Prawidłowa odpowiedź: A. Ponieważ pokarm naturalny (mleko kobiece) i mieszanki modyfikowane zawierają małe stężenie sodu, a niedojrzałe cewki nerkowe niemowląt wykazują fizjologiczną oporność na mineralokortykosteroidy",
      expl: "Prawidłowa odpowiedź: A. W 1. roku życia dieta niemowlęcia jest niskosodowa, a cewki nerkowe nie reagują w pełni na fludrokortyzon, dlatego dodatek 1-2 g NaCl/dobę jest kluczowy dla utrzymania prawidłowej wolemii."
    }
  ],
  flashcards: [
    {
      front: "Jakie zaburzenia laboratoryjne tworzą triadę przełomu solnego w WPN?",
      back: "• Ciężka HIPONATREMIA (Na+ <120-125 mmol/l).<br>• Zagrażająca HIPERKALIEMIA (K+ >6,5-8,0 mmol/l).<br>• HIPOGLIKEMIA i kwasica metaboliczna.<br>• Wynikają z braku aldosteronu i kortyzolu."
    },
    {
      front: "Jak odróżnić przełom w WPN od zwężenia odźwiernika (IHPS)?",
      back: "• WPN: KWASICA metaboliczna + HIPERKALIEMIA (wysoki potas!).<br>• Zwężenie odźwiernika: ZASADOWICA hipochloremiczna + HIPOKALIEMIA (niski potas!).<br>• Pomylenie WPN ze zwężeniem odźwiernika i operacja w hiperkaliemii grozi zgonem!"
    },
    {
      front: "Jakie jest postępowanie ratunkowe w przełomie solnym u noworodka?",
      back: "• Bolus 0,9% NaCl 20 ml/kg i.v. w 30 min (BEZ POTASU!).<br>• 10% Glukoza w bolusie na hipoglikemię.<br>• Hydrokortyzon i.v. w dawce ratunkowej 50-100 mg/m².<br>• 10% Glukonian wapnia przy zmianach w EKG (kardioprotekcja)."
    },
    {
      front: "Co jest markerem przesiewowym WPN w badaniu noworodków z bibuły?",
      back: "• 17-hydroksyprogesteron (17-OHP).<br>• Oznaczany w Polsce obowiązkowo u wszystkich noworodków w 3. dobie życia.<br>• W WPN wzrasta drastycznie (>100-300 nmol/l)."
    },
    {
      front: "Jak manifestuje się klasyczny WPN u noworodków żeńskich (46,XX)?",
      back: "• Wirylizacja narządów zewnętrznych (przerost łechtaczki, zrośnięcie warg sromowych, zatoka moczowo-płciowa wg skali Pradera).<br>• Wewnętrzne narządy żeńskie (macica, jajniki) są PRAWIDŁOWE."
    },
    {
      front: "Na czym polega zasada 'stress dose' u chorych na WPN?",
      back: "• 2-3 krotne zwiększenie dawki doustnego hydrokortyzonu w stresie (gorączka >38,5°C, uraz, zabieg, infekcja).<br>• W razie wymiotów podanie hydrokortyzonu domięśniowo/dożylnie.<br>• Zapobiega zgonowi w przełomie nadnerczowym."
    }
  ]
};

async function main() {
  await saveCase(case119);
}
main();

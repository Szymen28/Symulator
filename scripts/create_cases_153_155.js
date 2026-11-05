const fs = require('fs');
const path = require('path');
const { encryptStringAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

const case153 = JSON.parse(fs.readFileSync('scripts/temp_case_153.json', 'utf8'));

const case154 = {
  id: 154,
  file: "154_krwotok_poporodowy_pph.json",
  shortTitle: "Krwotok Poporodowy (PPH)",
  title: "Masywny Wczesny Krwotok Poporodowy na tle Atonii Macicy (PPH)",
  dept: "Ginekologia i Położnictwo",
  diagnosisTitle: "Masywny Krwotok Poporodowy w przebiegu Atonii Macicy (Postpartum Haemorrhage)",
  vitals: [
    { label: "Ciśnienie tętnicze (RR)", val: "75/40", unit: "mmHg", status: "vital-crit" },
    { label: "Częstość akcji serca (HR)", val: "135", unit: "/min", status: "vital-crit" },
    { label: "Częstość oddechów (RR)", val: "26", unit: "/min", status: "vital-warn" },
    { label: "Saturacja (SpO2)", val: "91", unit: "%", status: "vital-crit" },
    { label: "Temperatura ciała", val: "36.0", unit: "°C", status: "vital-warn" }
  ],
  story: "<p><strong>Pacjent:</strong> 29-letnia wieloródka (para 3) 25 minut po samoistnym porodzie drogami natury noworodka o masie ciała 4450 g.</p><p><strong>Wywiad chorobowy:</strong> Trzeci okres porodu trwał 12 minut, łożysko wydalono w całości bez powikłań. Po 20 minutach od porodu położna alarmuje o nagłym, gwałtownym wypływie ciemnej i jasnej krwi ze skrzepami z dróg rodnych. Szacowana utrata krwi w ciągu kilkunastu minut przekracza 1200 ml. W wywiadzie: przedłużający się II okres porodu (2,5 godziny), wielowodzie oraz znieczulenie zewnątrzoponowe.</p><p><strong>Badanie przedmiotowe:</strong> Pacjentka blada, podsypiająca, zlana zimnym potem, kontakt słowny utrudniony. Akcja serca 135/min, nitkowata, ciśnienie tętnicze 75/40 mmHg. W badaniu palpacyjnym brzucha: dno macicy sięga 3 palce powyżej pępka, macica jest miękka, wiotka, ciastowata, bez cech obkurczenia (atonia macicy). Z dróg rodnych ciągły wypływ krwi ze skrzepami wielkości pięści.</p>",
  steps: [
    {
      title: "Krok 1: Natychmiastowe ręczne opanowanie krwotoku i kaniulacja żył",
      scenario: "Pacjentka ma cechy dekompensacji krążeniowej z utratą ponad 1 litra krwi i wiotką macicą powyżej pępka. Jaka jest natychmiastowa procedura mechaniczna i resuscytacyjna przy łóżku pacjentki?",
      options: [
        {
          text: "Masaż dwuręczny macicy (zewnętrzno-wewnętrzny bimanualny ucisk Hamiltona) wraz z kaniulacją 2 dużych żył (14–16G) i agresywną płynoterapią",
          correct: true,
          isCorrect: true,
          feedback: "✅ PRAWIDŁOWO! Ręczny masaż bimanualny (jedna ręka w pochwie zaciśnięta w pięść w przednim sklepieniu, druga na powłokach uciskająca trzon macicy) natychmiastowo kompresuje otwarte zatoki łożyskowe. Równolegle niezbędne jest wkłucie 2 grubych kaniul, szybki wlew krystaloidów i podanie tlenu."
        },
        {
          text: "Podanie dożylne wlewu z nitrogliceryny w celu rozszerzenia łożyska naczyniowego i obniżenia oporu obwodowego",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! Nitrogliceryna w ciężkiej hipowolemii wywoła natychmiastowe zatrzymanie krążenia we wstrząsie."
        },
        {
          text: "Zlecenie pilnego badania rezonansu magnetycznego miednicy w celu oceny grubości ściany miometrium",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! Transport niestabilnej krwotocznie położnicy do pracowni MRI to błąd śmiertelny."
        },
        {
          text: "Zastosowanie zimnych okładów z lodu na okolicę czołową i oczekiwanie na samoistne zadziałanie endogennej oksytocyny",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! Atonia macicy nie ustąpi samoistnie; brak aktywnego działania doprowadzi do wykrwawienia w ciągu kilku minut."
        }
      ]
    },
    {
      title: "Krok 2: Pilna farmakoterapia uterotoniczna",
      scenario: "Ręczny masaż macicy częściowo ogranicza krwawienie, lecz po zwolnieniu ucisku macica ponownie wiotczeje. Jaki zestaw leków obkurczających mięsień macicy (uterotoników) należy podać w pierwszej kolejności?",
      options: [
        {
          text: "Oksytocyna i.v. (powolny bolus 5–10 j.m. oraz wlew ciągły 20–40 j.m. w 500 ml płynu) w połączeniu z alkaloidami sporyszu (metylergometryna) lub karboprostem i mizoprostolem",
          correct: true,
          isCorrect: true,
          feedback: "✅ PRAWIDŁOWO! Oksytocyna jest lekiem pierwszego rzutu. W przypadku atonii opornej natychmiast dołącza się metylergometrynę (0,2 mg i.m. – o ile brak nadciśnienia!), prostaglandynę F2alfa karboprost (0,25 mg i.m. – o ile brak astmy!) oraz mizoprostol (800–1000 mcg doodbytniczo lub podjęzykowo)."
        },
        {
          text: "Siarczan magnezu we wlewie ciągłym dożylnym z następowym wstrzyknięciem dożylnym fenoterolu",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! Zarówno magnez jak i fenoterol są tokolitykami, które znoszą skurcze macicy i pogłębią śmiertelną atonię."
        },
        {
          text: "Doustne podanie kwasu acetylosalicylowego w dawce 500 mg w celu zablokowania agregacji płytek krwi",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! ASA jest lekiem przeciwpłytkowym i nasili krwawienie poporodowe."
        },
        {
          text: "Wstrzyknięcie domięśniowe papaweryny i drotaweryny w celu rozkurczenia mięśniówki gładkiej miednicy",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! Leki spazmolityczne rozluźniają mięśniówkę macicy, uniemożliwiając hemostazę."
        }
      ]
    },
    {
      title: "Krok 3: Farmakoterapia hemostatyczna (kwas traneksamowy)",
      scenario: "Zgodnie z wytycznymi WHO i badaniem WOMAN, u każdej pacjentki z krwotokiem poporodowym (PPH) kluczowe znaczenie ma wczesne podanie leku antyfibrynolitycznego. Jaki lek i w jakim schemacie należy wdrożyć?",
      options: [
        {
          text: "Kwas traneksamowy (TXA) dożylnie w dawce 1,0 g w ciągu 10 minut, podany w ciągu pierwszych 3 godzin od początku krwawienia",
          correct: true,
          isCorrect: true,
          feedback: "✅ PRAWIDŁOWO! Badanie WOMAN (ponad 20 000 kobiet) udowodniło, że podanie 1 g TXA i.v. w ciągu pierwszych 3 godzin od porodu zmniejsza śmiertelność z powodu wykrwawienia o niemal 30%. Dawkę można powtórzyć po 30–60 minutach, jeśli krwawienie trwa nadal."
        },
        {
          text: "Heparyna drobnocząsteczkowa w dawce terapeutycznej 1 mg/kg m.c. w celu profilaktyki zakrzepicy żył głębokich",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! Heparyna w trakcie czynnego, masywnego krwotoku nasili utratę krwi i wywoła zgon."
        },
        {
          text: "Rekombinowany aktywator plazminogenu (rt-PA) w bolusie 50 mg w celu udrożnienia naczyń żylnych",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! rt-PA to lek trombolityczny; jego podanie w krwotoku położniczym spowodowałoby katastrofalne, nieodwracalne wykrwawienie."
        },
        {
          text: "Desmopresyna podskórnie w skojarzeniu z doustną witaminą C w wysokiej dawce nasycającej",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! Lekiem hemostatycznym o udowodnionej skuteczności w PPH o statusie klasy I wg WHO jest kwas traneksamowy."
        }
      ]
    },
    {
      title: "Krok 4: Postępowanie zabiegowe w opornej atonii macicy",
      scenario: "Mimo podania oksytocyny, metylergometryny, mizoprostolu i kwasu traneksamowego oraz masażu macica pozostaje częściowo wiotka, a krwawienie trwa. Zespół jest na sali operacyjnej. Jaka jest sekwencja mechaniczno-chirurgicznego leczenia ratunkowego?",
      options: [
        {
          text: "Tamponada balonowa jamy macicy (balon Bakriego), a w razie niepowodzenia laparotomia: szwy kompresyjne B-Lyncha, podwiązanie tętnic macicznych lub histerektomia",
          correct: true,
          isCorrect: true,
          feedback: "✅ PRAWIDŁOWO! Założenie balonu hemostatycznego Bakriego (wypełnianego 300–500 ml soli) pozwala uniknąć laparotomii u ponad 80% kobiet. W razie niepowodzenia wykonuje się laparotomię ze szwami kompresyjnymi B-Lyncha lub Haymana, podwiązaniem naczyń, a w ostateczności ratunkowe wycięcie macicy (histerektomię)."
        },
        {
          text: "Założenie szwu okrężnego McDonalda na szyjkę macicy z uciśnięciem pęcherza moczowego",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! Szew okrężny służy do leczenia niewydolności cieśniowo-szyjkowej w II trymestrze i jest bezużyteczny w krwotoku połogowym."
        },
        {
          text: "Wprowadzenie rurki Sengstakena-Blakemore'a do przełyku pacjentki w celu ucisku splotów żylnych",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! Sonda Sengstakena służy do tamponady żylaków przełyku, a nie jamy macicy."
        },
        {
          text: "Wypisanie do oddziału położniczego z zaleceniem zwiększonej podaży płynów doustnych i żelaza",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! Nieleczony krwotok atoniczny kończy się zgonem w mechanizmie wstrząsu hipowolemicznego."
        }
      ]
    }
  ],
  pathoNodes: [
    {
      title: "Załamanie mechanizmu 'żywych podwiązek' (living ligatures)",
      desc: "Fizjologiczna hemostaza po trzecim okresie porodu zależy od skurczu skośnych włókien miometrium zaciskających naczynia doczesnej.",
      detail: "W atonii macicy włókna mięśniowe nie kurczą się, pozostawiając otwarte światło ponad 100 tętnic spiralnych w miejscu łożyskowym. Przepływ przez macicę w terminie porodu wynosi 600–800 ml/min, co może doprowadzić do wykrwawienia w 10–15 minut.",
      target: "Punkt uchwytu leczenia: Dwuręczny masaż bimanualny macicy oraz dożylna podaż uterotoników (oksytocyna 5–10 j.m. bolus + wlew 20–40 j.m.)."
    },
    {
      title: "Uogólniona hiperfibrynoliza i koagulopatia konsumpcyjna",
      desc: "Gwałtowna utrata krwi wraz z wynaczynieniem osocza i aktywacją plazminogenu prowadzi do degradacji fibryny.",
      detail: "Skrzepy ulegają przedwczesnej lizie pod wpływem tkankowego aktywatora plazminogenu (t-PA), co przyspiesza spadek stężenia fibrynogenu poniżej krytycznego progu 2,0 g/l i napędza wstrząs.",
      target: "Punkt uchwytu leczenia: Wczesne podanie kwasu traneksamowego (1 g i.v. w ciągu 10 min w pierwszych 3h) oraz koncentratu fibrynogenu / krioprecypitatu."
    },
    {
      title: "Letalna triada wstrząsu krwotocznego",
      desc: "Masywny krwotok połączony z agresywną podażą zimnych krystaloidów wywołuje kwasicę, hipotermię i koagulopatię.",
      detail: "Spadek temperatury ciała poniżej 35°C upośledza funkcję płytek krwi i enzymów kaskady krzepnięcia, zamykając błędne koło niekontrolowanego krwawienia kapilarnego.",
      target: "Punkt uchwytu leczenia: Protokół MTP (1:1:1 KKCz:FFP:KKP), aktywne ogrzewanie pacjentki i płynów, wyrównanie hipokalcemii (wapń i.v.)."
    }
  ],
  dutySummary: {
    overview: "Krwotok poporodowy (PPH) to utrata >500 ml krwi po porodzie drogami natury lub >1000 ml po cięciu cesarskim (lub utrata z objawami niestabilności hemodynamicznej). Najczęstszą przyczyną (ok. 70–80%) jest atonia macicy (zasada 4T: Tone). Wymaga natychmiastowego, skoordynowanego działania zespołowego.",
    diagnostics: "1. Ocena według zasady 4T:\n   - Tone (tonus mięśnia macicy – atonia w 70%)\n   - Tissue (resztki łożyska / błon płodowych)\n   - Trauma (pęknięcie krocza, pochwy, szyjki macicy lub trzonu)\n   - Thrombin (koagulopatia pierwotna lub nabyta)\n\n2. Szacowanie utraty krwi (metryka wagowa lub skalowane pojemniki – unikać oceny 'na oko').\n\n3. Badania pilne: próba krzyżowa, morfologia, stężenie fibrynogenu, INR, APTT, gazometria krwi żylnej/tętniczej.",
    drugsAndDoses: "• <span class=\"dose-pill\">Oksytocyna: 5–10 j.m. powolny bolus i.v.</span>, następnie wlew <span class=\"dose-pill\">20–40 j.m. w 500 ml płynu wieloelektrolitowego</span> (z prędkością 250 ml/h).\n• <span class=\"dose-pill\">Metylergometryna: 0,2 mg domięśniowo</span> (przeciwwskazana w nadciśnieniu i stanie przedrzucawkowym!).\n• <span class=\"dose-pill\">Karboprost (PGF2alfa): 0,25 mg domięśniowo</span> co 15–90 min (maks. 8 dawek; przeciwwskazany w astmie!).\n• <span class=\"dose-pill\">Mizoprostol: 800–1000 mcg doodbytniczo lub podjęzykowo</span>.\n• <span class=\"dose-pill\">Kwas traneksamowy: 1,0 g i.v. w ciągu 10 minut</span> (powtórzyć po 30 min w razie potrzeby).\n• <span class=\"dose-pill\">Koncentrat fibrynogenu: 2,0–4,0 g i.v.</span> przy stężeniu <2,0 g/l.",
    procedures: "Dwuręczny masaż bimanualny macicy (ucisk Hamiltona), kompresja aorty brzusznej przez powłoki, cewnik Foleya (odbarczenie pęcherza ułatwia obkurczenie), tamponada balonowa Bakriego, szwy kompresyjne B-Lyncha, histerektomia ratunkowa.",
    monitoring: "Ścisłe monitorowanie parametrów życiowych co 5 minut, diurezy godzinowej (cel >30 ml/h), stężenia fibrynogenu i gazometrii."
  },
  diffTable: {
    title: "⚔️ Tabela Różnicowa: Przyczyny Krwotoku Poporodowego wg Reguły 4T (Tone vs Trauma vs Tissue vs Thrombin)",
    headers: ["Cecha / Etiologia", "Tone (Atonia macicy)", "Trauma (Uraz kanału rodnego)", "Tissue (Resztki łożyskowe)", "Thrombin (Koagulopatie)"],
    rows: [
      ["Stan dna macicy", "Wiotka, miękka, rozlana powyżej pępka", "Twarda, dobrze obkurczona pod pępkiem", "Często uniesiona, miernie obkurczona", "Zmienna, zazwyczaj prawidłowo obkurczona"],
      ["Charakter krwawienia", "Obfite, ciągłe ze skrzepami z ujścia", "Strumieniowe lub sączące, jasnoczerwone", "Nawracające, nasilające się po masażu", "Uogólnione krwawienie z ran i wkłuć (brak skrzepów)"],
      ["Typowe czynniki ryzyka", "Makrosomia, ciąża wielopłodowa, indukcja", "Poród zabiegowy (kleszcze, próżniociąg)", "Łożysko przyrośnięte, pociąganie za sznur", "Przedwczesne odklejenie, DIC, hemofilia"],
      ["Badanie we wziernikach", "Krew wypływa z rozwartej jamy macicy", "Widoczne pęknięcie krocza, pochwy, szyjki", "Tkanka łożyskowa widoczna w ujściu", "Brak pojedynczego źródła chirurgicznego"],
      ["Postępowanie z wyboru", "Masaż + Uterotoniki + Balon Bakriego", "Zeszycie chirurgiczne pęknięć w znieczuleniu", "Manualne/instrumentalne wydobycie resztek", "Substytucja fibrynogenu, osocza FFP, kwas TXA"]
    ]
  },
  lekQuestions: [
    {
      q: "Jaka jest NAJCZĘSTSZA przyczyna wczesnego krwotoku poporodowego (PPH), odpowiadająca za ponad 70% wszystkich przypadków?",
      question: "Jaka jest NAJCZĘSTSZA przyczyna wczesnego krwotoku poporodowego (PPH), odpowiadająca za ponad 70% wszystkich przypadków?",
      opts: [
        "A) Atonia mięśnia macicy (brak prawidłowego skurczu miometrium)",
        "B) Niewykryta wcześniej hemofilia A u matki",
        "C) Pęknięcie ściany pęcherzyka żółciowego w II okresie porodu",
        "D) Wrodzone zwężenie cieśni aorty u rodzącej",
        "E) Izolowane pęknięcie wędzidełka warg sromowych mniejszych"
      ],
      options: [
        "A) Atonia mięśnia macicy (brak prawidłowego skurczu miometrium)",
        "B) Niewykryta wcześniej hemofilia A u matki",
        "C) Pęknięcie ściany pęcherzyka żółciowego w II okresie porodu",
        "D) Wrodzone zwężenie cieśni aorty u rodzącej",
        "E) Izolowane pęknięcie wędzidełka warg sromowych mniejszych"
      ],
      correct: 0,
      correctIdx: 0,
      exp: "Prawidłowo! Atonia macicy odpowiada za ok. 70–80% wszystkich wczesnych krwotoków poporodowych. Klasyfikuje się ją w mnemotechnice '4T' jako 'Tone' (napięcie). Pozostałe to Trauma (uraz kanału rodnego ok. 20%), Tissue (resztki łożyska ok. 10%) i Thrombin (zaburzenia krzepnięcia <1%).",
      expl: "Prawidłowo! Atonia macicy odpowiada za ok. 70–80% wszystkich wczesnych krwotoków poporodowych. Klasyfikuje się ją w mnemotechnice '4T' jako 'Tone' (napięcie). Pozostałe to Trauma (uraz kanału rodnego ok. 20%), Tissue (resztki łożyska ok. 10%) i Thrombin (zaburzenia krzepnięcia <1%).",
      explanation: "Prawidłowo! Atonia macicy odpowiada za ok. 70–80% wszystkich wczesnych krwotoków poporodowych. Klasyfikuje się ją w mnemotechnice '4T' jako 'Tone' (napięcie). Pozostałe to Trauma (uraz kanału rodnego ok. 20%), Tissue (resztki łożyska ok. 10%) i Thrombin (zaburzenia krzepnięcia <1%)."
    },
    {
      q: "Który lek obkurczający macicę (uterotonik) jest BEZWZGLĘDNIE PRZECIWWSKAZANY u pacjentki z krwotokiem poporodowym powikłanym nadciśnieniem tętniczym lub stanem przedrzucawkowym?",
      question: "Który lek obkurczający macicę (uterotonik) jest BEZWZGLĘDNIE PRZECIWWSKAZANY u pacjentki z krwotokiem poporodowym powikłanym nadciśnieniem tętniczym lub stanem przedrzucawkowym?",
      opts: [
        "A) Metylergometryna (alkaloid sporyszu)",
        "B) Oksytocyna we wlewie ciągłym dożylnym",
        "C) Mizoprostol podawany doodbytniczo",
        "D) Kwas traneksamowy we wlewie 10-minutowym",
        "E) Karboprost (analog prostaglandyny F2alfa)"
      ],
      options: [
        "A) Metylergometryna (alkaloid sporyszu)",
        "B) Oksytocyna we wlewie ciągłym dożylnym",
        "C) Mizoprostol podawany doodbytniczo",
        "D) Kwas traneksamowy we wlewie 10-minutowym",
        "E) Karboprost (analog prostaglandyny F2alfa)"
      ],
      correct: 0,
      correctIdx: 0,
      exp: "Prawidłowo! Metylergometryna (Methergin) wywołuje silny, uogólniony skurcz naczyń krwionośnych i może spowodować zagrażający życiu przełom nadciśnieniowy, krwotok śródmózgowy lub zawał serca. Jest bezwzględnie przeciwwskazana w nadciśnieniu tętniczym, stanie przedrzucawkowym i chorobie wieńcowej. (Z kolei karboprost jest przeciwwskazany w ciężkiej astmie oskrzelowej).",
      expl: "Prawidłowo! Metylergometryna (Methergin) wywołuje silny, uogólniony skurcz naczyń krwionośnych i może spowodować zagrażający życiu przełom nadciśnieniowy, krwotok śródmózgowy lub zawał serca. Jest bezwzględnie przeciwwskazana w nadciśnieniu tętniczym, stanie przedrzucawkowym i chorobie wieńcowej. (Z kolei karboprost jest przeciwwskazany w ciężkiej astmie oskrzelowej).",
      explanation: "Prawidłowo! Metylergometryna (Methergin) wywołuje silny, uogólniony skurcz naczyń krwionośnych i może spowodować zagrażający życiu przełom nadciśnieniowy, krwotok śródmózgowy lub zawał serca. Jest bezwzględnie przeciwwskazana w nadciśnieniu tętniczym, stanie przedrzucawkowym i chorobie wieńcowej. (Z kolei karboprost jest przeciwwskazany w ciężkiej astmie oskrzelowej)."
    },
    {
      q: "Jakie jest okno czasowe dla podania kwasu traneksamowego (TXA) w krwotoku poporodowym, w którym wykazano istotne zmniejszenie śmiertelności z powodu wykrwawienia w badaniu WOMAN?",
      question: "Jakie jest okno czasowe dla podania kwasu traneksamowego (TXA) w krwotoku poporodowym, w którym wykazano istotne zmniejszenie śmiertelności z powodu wykrwawienia w badaniu WOMAN?",
      opts: [
        "A) W ciągu pierwszych 3 godzin od wystąpienia krwotoku",
        "B) Pomiędzy 12. a 24. godziną od zakończenia porodu",
        "C) Dopiero po upływie 48 godzin od usunięcia łożyska",
        "D) Wyłącznie w pierwszym tygodniu połogu w POZ",
        "E) Okno czasowe nie ma żadnego znaczenia klinicznego"
      ],
      options: [
        "A) W ciągu pierwszych 3 godzin od wystąpienia krwotoku",
        "B) Pomiędzy 12. a 24. godziną od zakończenia porodu",
        "C) Dopiero po upływie 48 godzin od usunięcia łożyska",
        "D) Wyłącznie w pierwszym tygodniu połogu w POZ",
        "E) Okno czasowe nie ma żadnego znaczenia klinicznego"
      ],
      correct: 0,
      correctIdx: 0,
      exp: "Prawidłowo! Wyniki badania WOMAN wykazały, że kwas traneksamowy (1 g i.v.) podany w ciągu pierwszych 3 godzin od porodu zmniejsza śmiertelność z powodu krwotoku o blisko 30%. Podanie leku po upływie 3 godzin nie przynosiło już korzyści w zakresie przeżywalności.",
      expl: "Prawidłowo! Wyniki badania WOMAN wykazały, że kwas traneksamowy (1 g i.v.) podany w ciągu pierwszych 3 godzin od porodu zmniejsza śmiertelność z powodu krwotoku o blisko 30%. Podanie leku po upływie 3 godzin nie przynosiło już korzyści w zakresie przeżywalności.",
      explanation: "Prawidłowo! Wyniki badania WOMAN wykazały, że kwas traneksamowy (1 g i.v.) podany w ciągu pierwszych 3 godzin od porodu zmniejsza śmiertelność z powodu krwotoku o blisko 30%. Podanie leku po upływie 3 godzin nie przynosiło już korzyści w zakresie przeżywalności."
    },
    {
      q: "Wskaż zestaw czynników zwiększających ryzyko wystąpienia atonii macicy:\n1. Nadmierne rozciągnięcie mięśnia macicy (makrosomia, ciąża wielopłodowa, wielowodzie).\n2. Przedłużający się poród lub wyczerpanie mięśnia macicy szybką indukcją oksytocyną.\n3. Zakażenie wewnątrzowodniowe (chorioamnionitis).\n4. Zastosowanie wziewnych anestetyków halogenowych o działaniu tokolitycznym.\n5. Wielorodztwo (np. 4. lub kolejny poród).",
      question: "Wskaż zestaw czynników zwiększających ryzyko wystąpienia atonii macicy:\n1. Nadmierne rozciągnięcie mięśnia macicy (makrosomia, ciąża wielopłodowa, wielowodzie).\n2. Przedłużający się poród lub wyczerpanie mięśnia macicy szybką indukcją oksytocyną.\n3. Zakażenie wewnątrzowodniowe (chorioamnionitis).\n4. Zastosowanie wziewnych anestetyków halogenowych o działaniu tokolitycznym.\n5. Wielorodztwo (np. 4. lub kolejny poród).",
      opts: [
        "A) 1, 2, 3, 4, 5",
        "B) 1, 2, 3",
        "C) 2, 4, 5",
        "D) 1, 3, 5",
        "E) Tylko 1 i 5"
      ],
      options: [
        "A) 1, 2, 3, 4, 5",
        "B) 1, 2, 3",
        "C) 2, 4, 5",
        "D) 1, 3, 5",
        "E) Tylko 1 i 5"
      ],
      correct: 0,
      correctIdx: 0,
      exp: "Prawidłowo! Wszystkie wymienione czynniki osłabiają kurczliwość miometrium: nadmierne rozciągnięcie włókien, wyczerpanie receptorów oksytocynowych, infekcja i stan zapalny niszczący funkcję miocytów, anestetyki halogenowe (np. sewofluran) oraz wielorodztwo z włóknieniem miometrium.",
      expl: "Prawidłowo! Wszystkie wymienione czynniki osłabiają kurczliwość miometrium: nadmierne rozciągnięcie włókien, wyczerpanie receptorów oksytocynowych, infekcja i stan zapalny niszczący funkcję miocytów, anestetyki halogenowe (np. sewofluran) oraz wielorodztwo z włóknieniem miometrium.",
      explanation: "Prawidłowo! Wszystkie wymienione czynniki osłabiają kurczliwość miometrium: nadmierne rozciągnięcie włókien, wyczerpanie receptorów oksytocynowych, infekcja i stan zapalny niszczący funkcję miocytów, anestetyki halogenowe (np. sewofluran) oraz wielorodztwo z włóknieniem miometrium."
    },
    {
      q: "Wskaż zdanie FAŁSZYWE dotyczące tamponady balonowej jamy macicy (balon Bakriego):",
      question: "Wskaż zdanie FAŁSZYWE dotyczące tamponady balonowej jamy macicy (balon Bakriego):",
      opts: [
        "A) Balon Bakriego należy zawsze napełniać powietrzem atmosferycznym w objętości 1000 ml",
        "B) Balon wypełnia się zazwyczaj jałową solą fizjologiczną w ilości od 300 do 500 ml",
        "C) Skuteczność tamponady balonowej w uniknięciu histerektomii wynosi ponad 80%",
        "D) Po założeniu balonu zaleca się luźne założenie setonu do pochwy, aby zapobiec wypadnięciu balonu",
        "E) Płyn z balonu usuwa się stopniowo po upływie zazwyczaj 12–24 godzin od opanowania krwotoku"
      ],
      options: [
        "A) Balon Bakriego należy zawsze napełniać powietrzem atmosferycznym w objętości 1000 ml",
        "B) Balon wypełnia się zazwyczaj jałową solą fizjologiczną w ilości od 300 do 500 ml",
        "C) Skuteczność tamponady balonowej w uniknięciu histerektomii wynosi ponad 80%",
        "D) Po założeniu balonu zaleca się luźne założenie setonu do pochwy, aby zapobiec wypadnięciu balonu",
        "E) Płyn z balonu usuwa się stopniowo po upływie zazwyczaj 12–24 godzin od opanowania krwotoku"
      ],
      correct: 0,
      correctIdx: 0,
      exp: "Prawidłowo! Zdanie A jest fałszywe. Balonu Bakriego NIGDY nie napełnia się powietrzem (ryzyko pęknięcia balonu i śmiertelnego zatoru powietrznego!). Balon wypełnia się wyłącznie podgrzanym roztworem 0,9% NaCl (soli fizjologicznej) w objętości 300–500 ml.",
      expl: "Prawidłowo! Zdanie A jest fałszywe. Balonu Bakriego NIGDY nie napełnia się powietrzem (ryzyko pęknięcia balonu i śmiertelnego zatoru powietrznego!). Balon wypełnia się wyłącznie podgrzanym roztworem 0,9% NaCl (soli fizjologicznej) w objętości 300–500 ml.",
      explanation: "Prawidłowo! Zdanie A jest fałszywe. Balonu Bakriego NIGDY nie napełnia się powietrzem (ryzyko pęknięcia balonu i śmiertelnego zatoru powietrznego!). Balon wypełnia się wyłącznie podgrzanym roztworem 0,9% NaCl (soli fizjologicznej) w objętości 300–500 ml."
    },
    {
      q: "Podczas operacji ratunkowej z powodu krwotoku poporodowego lekarz decyduje o wykonaniu histerektomii ratującej życie u nieprzytomnej pacjentki w stanie wstrząsu. Jakie wymagania formalno-prawne nakłada polskie prawo w tej sytuacji?",
      question: "Podczas operacji ratunkowej z powodu krwotoku poporodowego lekarz decyduje o wykonaniu histerektomii ratującej życie u nieprzytomnej pacjentki w stanie wstrząsu. Jakie wymagania formalno-prawne nakłada polskie prawo w tej sytuacji?",
      opts: [
        "A) Lekarz może rozszerzyć zabieg bez uprzedniej zgody pacjentki w stanie wyższej konieczności, po zasięgnięciu w miarę możliwości opinii drugiego lekarza i sporządzeniu wpisu w dokumentacji",
        "B) Lekarz musi wybudzić pacjentkę na stole operacyjnym i odebrać od niej podpisany formularz zgody",
        "C) Lekarz ma bezwzględny zakaz wycięcia macicy, jeśli pacjentka nie ukończyła 40. roku życia",
        "D) Wymagane jest uzyskanie pisemnej zgody proboszcza właściwej terytorialnie parafii",
        "E) Lekarz musi przerwać operację i odczekać 24 godziny na pisemną decyzję sądu rejonowego"
      ],
      options: [
        "A) Lekarz może rozszerzyć zabieg bez uprzedniej zgody pacjentki w stanie wyższej konieczności, po zasięgnięciu w miarę możliwości opinii drugiego lekarza i sporządzeniu wpisu w dokumentacji",
        "B) Lekarz musi wybudzić pacjentkę na stole operacyjnym i odebrać od niej podpisany formularz zgody",
        "C) Lekarz ma bezwzględny zakaz wycięcia macicy, jeśli pacjentka nie ukończyła 40. roku życia",
        "D) Wymagane jest uzyskanie pisemnej zgody proboszcza właściwej terytorialnie parafii",
        "E) Lekarz musi przerwać operację i odczekać 24 godziny na pisemną decyzję sądu rejonowego"
      ],
      correct: 0,
      correctIdx: 0,
      exp: "Prawidłowo! Zgodnie z art. 35 Ustawy o zawodach lekarza i lekarza dentysty, jeżeli w trakcie operacji wystąpią okoliczności, których pominięcie groziłoby pacjentowi bezpośrednim niebezpieczeństwem utraty życia lub ciężkim uszczerbkiem na zdrowiu, a pacjent jest nieprzytomny, lekarz ma prawo rozszerzyć zabieg, zasięgając w miarę możliwości opinii drugiego lekarza oraz sporządzając uzasadnienie w dokumentacji medycznej.",
      expl: "Prawidłowo! Zgodnie z art. 35 Ustawy o zawodach lekarza i lekarza dentysty, jeżeli w trakcie operacji wystąpią okoliczności, których pominięcie groziłoby pacjentowi bezpośrednim niebezpieczeństwem utraty życia lub ciężkim uszczerbkiem na zdrowiu, a pacjent jest nieprzytomny, lekarz ma prawo rozszerzyć zabieg, zasięgając w miarę możliwości opinii drugiego lekarza oraz sporządzając uzasadnienie w dokumentacji medycznej.",
      explanation: "Prawidłowo! Zgodnie z art. 35 Ustawy o zawodach lekarza i lekarza dentysty, jeżeli w trakcie operacji wystąpią okoliczności, których pominięcie groziłoby pacjentowi bezpośrednim niebezpieczeństwem utraty życia lub ciężkim uszczerbkiem na zdrowiu, a pacjent jest nieprzytomny, lekarz ma prawo rozszerzyć zabieg, zasięgając w miarę możliwości opinii drugiego lekarza oraz sporządzając uzasadnienie w dokumentacji medycznej."
    },
    {
      q: "Czym są hemostatyczne szwy kompresyjne B-Lyncha (B-Lynch suture) stosowane w krwotoku poporodowym?",
      question: "Czym są hemostatyczne szwy kompresyjne B-Lyncha (B-Lynch suture) stosowane w krwotoku poporodowym?",
      opts: [
        "A) Szwami pionowymi obejmującymi trzon macicy na wzór 'szelek', które mechanicznie ściskają przednią i tylną ścianę macicy",
        "B) Szwami naczyniowymi zakładanymi bezpośrednio na pień aorty brzusznej w celu jej trwałego zamknięcia",
        "C) Szwami okrężnymi zakładanymi na szyjkę pęcherza moczowego w celu powstrzymania krwiomoczu",
        "D) Szwami skórnymi materacowymi zakładanymi na powłoki brzuszne w celu wywołania odmy",
        "E) Szwami wchłanialnymi mocującymi dno macicy do dolnej powierzchni wątroby"
      ],
      options: [
        "A) Szwami pionowymi obejmującymi trzon macicy na wzór 'szelek', które mechanicznie ściskają przednią i tylną ścianę macicy",
        "B) Szwami naczyniowymi zakładanymi bezpośrednio na pień aorty brzusznej w celu jej trwałego zamknięcia",
        "C) Szwami okrężnymi zakładanymi na szyjkę pęcherza moczowego w celu powstrzymania krwiomoczu",
        "D) Szwami skórnymi materacowymi zakładanymi na powłoki brzuszne w celu wywołania odmy",
        "E) Szwami wchłanialnymi mocującymi dno macicy do dolnej powierzchni wątroby"
      ],
      correct: 0,
      correctIdx: 0,
      exp: "Prawidłowo! Szew B-Lyncha to technika kompresji macicy polegająca na przeprowadzeniu grubego, wchłanialnego szwu od dolnego odcinka przez dno macicy na stronę tylną i z powrotem (układ przypominający szelki). Zaciśnięcie szwu powoduje mechaniczne spłaszczenie ścian macicy i zaciśnięcie naczyń łożyskowych, chroniąc przed histerektomią.",
      expl: "Prawidłowo! Szew B-Lyncha to technika kompresji macicy polegająca na przeprowadzeniu grubego, wchłanialnego szwu od dolnego odcinka przez dno macicy na stronę tylną i z powrotem (układ przypominający szelki). Zaciśnięcie szwu powoduje mechaniczne spłaszczenie ścian macicy i zaciśnięcie naczyń łożyskowych, chroniąc przed histerektomią.",
      explanation: "Prawidłowo! Szew B-Lyncha to technika kompresji macicy polegająca na przeprowadzeniu grubego, wchłanialnego szwu od dolnego odcinka przez dno macicy na stronę tylną i z powrotem (układ przypominający szelki). Zaciśnięcie szwu powoduje mechaniczne spłaszczenie ścian macicy i zaciśnięcie naczyń łożyskowych, chroniąc przed histerektomią."
    },
    {
      q: "Jaki jest pierwszy krok zalecany w ramach aktywnego prowadzenia III okresu porodu (AMTSL) wg wytycznych WHO w celu zapobiegania PPH?",
      question: "Jaki jest pierwszy krok zalecany w ramach aktywnego prowadzenia III okresu porodu (AMTSL) wg wytycznych WHO w celu zapobiegania PPH?",
      opts: [
        "A) Profilaktyczne podanie uterotoniku (najczęściej oksytocyny 10 j.m. i.m./i.v.) zaraz po urodzeniu dziecka",
        "B) Natychmiastowe energiczne pociąganie za sznur pępowinowy bez skurczu macicy",
        "C) Manualne odklejenie łożyska ręką w jałowej rękawicy w 1. minucie po porodzie",
        "D) Wstrzyknięcie 100 ml soli fizjologicznej bezpośrednio do mięśnia macicy",
        "E) Założenie opaski uciskowej na podudzia matki przed urodzeniem łożyska"
      ],
      options: [
        "A) Profilaktyczne podanie uterotoniku (najczęściej oksytocyny 10 j.m. i.m./i.v.) zaraz po urodzeniu dziecka",
        "B) Natychmiastowe energiczne pociąganie za sznur pępowinowy bez skurczu macicy",
        "C) Manualne odklejenie łożyska ręką w jałowej rękawicy w 1. minucie po porodzie",
        "D) Wstrzyknięcie 100 ml soli fizjologicznej bezpośrednio do mięśnia macicy",
        "E) Założenie opaski uciskowej na podudzia matki przed urodzeniem łożyska"
      ],
      correct: 0,
      correctIdx: 0,
      exp: "Prawidłowo! Aktywne prowadzenie III okresu porodu (AMTSL) zmniejsza ryzyko PPH o ponad 50%. Kluczowym elementem jest profilaktyczne podanie leku obkurczającego (oksytocyna 10 j.m. i.m. lub i.v.) w ciągu 1 minuty od urodzenia noworodka, opóźnione zaciśnięcie pępowiny oraz kontrolowane pociąganie za sznur z uciskiem nadłonowym.",
      expl: "Prawidłowo! Aktywne prowadzenie III okresu porodu (AMTSL) zmniejsza ryzyko PPH o ponad 50%. Kluczowym elementem jest profilaktyczne podanie leku obkurczającego (oksytocyna 10 j.m. i.m. lub i.v.) w ciągu 1 minuty od urodzenia noworodka, opóźnione zaciśnięcie pępowiny oraz kontrolowane pociąganie za sznur z uciskiem nadłonowym.",
      explanation: "Prawidłowo! Aktywne prowadzenie III okresu porodu (AMTSL) zmniejsza ryzyko PPH o ponad 50%. Kluczowym elementem jest profilaktyczne podanie leku obkurczającego (oksytocyna 10 j.m. i.m. lub i.v.) w ciągu 1 minuty od urodzenia noworodka, opóźnione zaciśnięcie pępowiny oraz kontrolowane pociąganie za sznur z uciskiem nadłonowym."
    },
    {
      q: "Co charakteryzuje krwawienie z pęknięcia szyjki macicy lub pochwy (Trauma) w odróżnieniu od krwawienia atonicznego?",
      question: "Co charakteryzuje krwawienie z pęknięcia szyjki macicy lub pochwy (Trauma) w odróżnieniu od krwawienia atonicznego?",
      opts: [
        "A) Krew wypływa wartkim strumieniem, podczas gdy trzon macicy jest twardy, mały i prawidłowo obkurczony",
        "B) Macica jest olbrzymia, wiotka i sięga do wyrostka mieczykowatego mostka",
        "C) Krew w pęknięciu szyjki nigdy nie wypływa na zewnątrz i tworzy wyłącznie krwiak opłucnej",
        "D) W pęknięciu szyjki macicy natychmiast dochodzi do zaniku odruchów rzepkowych u pacjentki",
        "E) Krwawienie ustępuje natychmiast po doustnym podaniu węgla aktywowanego"
      ],
      options: [
        "A) Krew wypływa wartkim strumieniem, podczas gdy trzon macicy jest twardy, mały i prawidłowo obkurczony",
        "B) Macica jest olbrzymia, wiotka i sięga do wyrostka mieczykowatego mostka",
        "C) Krew w pęknięciu szyjki nigdy nie wypływa na zewnątrz i tworzy wyłącznie krwiak opłucnej",
        "D) W pęknięciu szyjki macicy natychmiast dochodzi do zaniku odruchów rzepkowych u pacjentki",
        "E) Krwawienie ustępuje natychmiast po doustnym podaniu węgla aktywowanego"
      ],
      correct: 0,
      correctIdx: 0,
      exp: "Prawidłowo! W przypadku urazu kanału rodnego (pęknięcie krocza, pochwy lub szyjki macicy) krwawienie trwa pomimo twardej, prawidłowo zwiniętej macicy. Wymaga to dokładnej inspekcji kanału rodnego we wziernikach i zaopatrzenia chirurgicznego ran.",
      expl: "Prawidłowo! W przypadku urazu kanału rodnego (pęknięcie krocza, pochwy lub szyjki macicy) krwawienie trwa pomimo twardej, prawidłowo zwiniętej macicy. Wymaga to dokładnej inspekcji kanału rodnego we wziernikach i zaopatrzenia chirurgicznego ran.",
      explanation: "Prawidłowo! W przypadku urazu kanału rodnego (pęknięcie krocza, pochwy lub szyjki macicy) krwawienie trwa pomimo twardej, prawidłowo zwiniętej macicy. Wymaga to dokładnej inspekcji kanału rodnego we wziernikach i zaopatrzenia chirurgicznego ran."
    },
    {
      q: "Jakie jest potencjalne późne powikłanie endokrynologiczne nieleczonego, ciężkiego wstrząsu krwotocznego w trakcie porodu z niedokrwieniem przedniego płata przysadki?",
      question: "Jakie jest potencjalne późne powikłanie endokrynologiczne nieleczonego, ciężkiego wstrząsu krwotocznego w trakcie porodu z niedokrwieniem przedniego płata przysadki?",
      opts: [
        "A) Zespół Sheehana (poporodowa martwica niedokrwienna przedniego płata przysadki mózgowej)",
        "B) Zespół Conna (pierwotny hiperaldosteronizm z gruczolaka kory nadnerczy)",
        "C) Zespół Cushinga wywołany autonomicznym guzem ektopowym wydzielającym ACTH",
        "D) Cukrzyca typu MODY 2 ze stałą mutacją w genie glukokinazy",
        "E) Zespół MEN 2B z nerwiakowłókniakowatością błon śluzowych i rakiem rdzeniastym"
      ],
      options: [
        "A) Zespół Sheehana (poporodowa martwica niedokrwienna przedniego płata przysadki mózgowej)",
        "B) Zespół Conna (pierwotny hiperaldosteronizm z gruczolaka kory nadnerczy)",
        "C) Zespół Cushinga wywołany autonomicznym guzem ektopowym wydzielającym ACTH",
        "D) Zespół Cushinga wywołany autonomicznym guzem ektopowym wydzielającym ACTH",
        "E) Zespół MEN 2B z nerwiakowłókniakowatością błon śluzowych i rakiem rdzeniastym"
      ],
      correct: 0,
      correctIdx: 0,
      exp: "Prawidłowo! Zespół Sheehana to martwica niedokrwienna powiększonej fizjologicznie w ciąży przysadki mózgowej, spowodowana ciężką hipotensją w przebiegu krwotoku poporodowego. Objawia się brakiem laktacji po porodzie, wtórnym brakiem miesiączki, niedoczynnością tarczycy i kory nadnerczy.",
      expl: "Prawidłowo! Zespół Sheehana to martwica niedokrwienna powiększonej fizjologicznie w ciąży przysadki mózgowej, spowodowana ciężką hipotensją w przebiegu krwotoku poporodowego. Objawia się brakiem laktacji po porodzie, wtórnym brakiem miesiączki, niedoczynnością tarczycy i kory nadnerczy.",
      explanation: "Prawidłowo! Zespół Sheehana to martwica niedokrwienna powiększonej fizjologicznie w ciąży przysadki mózgowej, spowodowana ciężką hipotensją w przebiegu krwotoku poporodowego. Objawia się brakiem laktacji po porodzie, wtórnym brakiem miesiączki, niedoczynnością tarczycy i kory nadnerczy."
    },
    {
      q: "Który z poniższych parametrów laboratoryjnych najlepiej koreluje z głębokością wstrząsu hipowolemicznego i jest wskaźnikiem powodzenia resuscytacji płynowo-krwiowej w PPH?",
      question: "Który z poniższych parametrów laboratoryjnych najlepiej koreluje z głębokością wstrząsu hipowolemicznego i jest wskaźnikiem powodzenia resuscytacji płynowo-krwiowej w PPH?",
      opts: [
        "A) Stężenie mleczanów oraz niedobór zasad (base deficit - BD) w gazometrii",
        "B) Izolowane stężenie bilirubiny całkowitej w surowicy krwi pacjentki",
        "C) Poziom tyreotropiny (TSH) oznaczany w surowicy metodą ELISA",
        "D) Wskaźnik sedymentacji erytrocytów (odczyn OB) po dwóch godzinach",
        "E) Aktywność fosfatazy alkalicznej (ALP) pochodzenia kostnego"
      ],
      options: [
        "A) Stężenie mleczanów oraz niedobór zasad (base deficit - BD) w gazometrii",
        "B) Izolowane stężenie bilirubiny całkowitej w surowicy krwi pacjentki",
        "C) Poziom tyreotropiny (TSH) oznaczany w surowicy metodą ELISA",
        "D) Wskaźnik sedymentacji erytrocytów (odczyn OB) po dwóch godzinach",
        "E) Aktywność fosfatazy alkalicznej (ALP) pochodzenia kostnego"
      ],
      correct: 0,
      correctIdx: 0,
      exp: "Prawidłowo! Stężenie mleczanów (>2 mmol/l) oraz deficyt zasad (BD > -6 mmol/l) w gazometrii krwi są bezpośrednimi wykładnikami hipoperfuzji tkankowej i kwasicy metabolicznej. Spadek mleczanów i normalizacja BD potwierdzają przywrócenie prawidłowego dotlenienia tkanek.",
      expl: "Prawidłowo! Stężenie mleczanów (>2 mmol/l) oraz deficyt zasad (BD > -6 mmol/l) w gazometrii krwi są bezpośrednimi wykładnikami hipoperfuzji tkankowej i kwasicy metabolicznej. Spadek mleczanów i normalizacja BD potwierdzają przywrócenie prawidłowego dotlenienia tkanek.",
      explanation: "Prawidłowo! Stężenie mleczanów (>2 mmol/l) oraz deficyt zasad (BD > -6 mmol/l) w gazometrii krwi są bezpośrednimi wykładnikami hipoperfuzji tkankowej i kwasicy metabolicznej. Spadek mleczanów i normalizacja BD potwierdzają przywrócenie prawidłowego dotlenienia tkanek."
    }
  ],
  flashcards: [
    { q: "Jaka jest definicja krwotoku poporodowego (PPH)?", a: "Utrata krwi >500 ml po porodzie drogami natury, >1000 ml po cięciu cesarskim lub jakakolwiek utrata krwi wywołująca niestabilność hemodynamiczną." },
    { q: "Co oznacza reguła 4T w diagnostyce przyczyn PPH?", a: "Tone (atonia macicy 70%), Trauma (uraz dróg rodnych 20%), Tissue (resztki łożyska 10%), Thrombin (zaburzenia krzepnięcia 1%)." },
    { q: "Jaki jest lek pierwszego rzutu w farmakoterapii atonii macicy?", a: "Oksytocyna: 5–10 j.m. powolny bolus i.v. oraz wlew ciągły 20–40 j.m. w 500 ml płynu." },
    { q: "Dlaczego metylergometryna jest zakazana w stanie przedrzucawkowym?", a: "Powoduje uogólniony skurcz naczyń i grozi gwałtownym przełomem nadciśnieniowym oraz udarem krwotocznym mózgu." },
    { q: "Jakie jest okno czasowe dla podania kwasu traneksamowego w PPH?", a: "Do 3 godzin od porodu (dawka 1 g i.v. w ciągu 10 minut)." },
    { q: "Co to jest zespół Sheehana?", a: "Poporodowa martwica niedokrwienna przedniego płata przysadki mózgowej w wyniku wstrząsu krwotocznego podczas porodu." }
  ]
};

const case155 = {
  id: 155,
  file: "155_skret_przydatkow.json",
  shortTitle: "Skręt Przydatków",
  title: "Ostry Brzuch Ginekologiczny: Skręt Jajnika i Przydatków (Torsio adnexorum)",
  dept: "Ginekologia i Położnictwo",
  diagnosisTitle: "Ostre Niedokrwienie Przydatków w przebiegu Skrętu Szypuły Naczyniowej (Torsio adnexorum)",
  vitals: [
    { label: "Ciśnienie tętnicze (RR)", val: "135/85", unit: "mmHg", status: "vital-ok" },
    { label: "Częstość akcji serca (HR)", val: "112", unit: "/min", status: "vital-warn" },
    { label: "Częstość oddechów (RR)", val: "18", unit: "/min", status: "vital-ok" },
    { label: "Saturacja (SpO2)", val: "99", unit: "%", status: "vital-ok" },
    { label: "Temperatura ciała", val: "37.5", unit: "°C", status: "vital-warn" }
  ],
  story: "<p><strong>Pacjent:</strong> 23-letnia nieródka zgłasza się na SOR z powodu nagłego, niezwykle ostrego bólu w prawym dole biodrowym.</p><p><strong>Wywiad chorobowy:</strong> Ból rozpoczął się nagle 4 godziny temu podczas intensywnych ćwiczeń na siłowni. Ma charakter skurczowy, kłujący, promieniuje do prawej pachwiny i okolicy lędźwiowej. Bólowi towarzyszą silne nudności oraz trzykrotne wymioty treścią żołądkową. W wywiadzie ginekologicznym: 2 miesiące temu w badaniu profilaktycznym USG stwierdzono obecność bezobjawowej torbieli dermoidalnej jajnika prawego o średnicy 6,5 cm. Ostatnia miesiączka 14 dni temu, cykle regularne.</p><p><strong>Badanie przedmiotowe:</strong> Pacjentka zwija się z bólu, ułożona na prawym boku z podkurczonymi nogami. Brzuch z wyraźną bolesnością palpacyjną i obroną mięśniową w prawym dole biodrowym; objaw Blumberga wątpliwy/dodatni miejscowo. W badaniu ginekologicznym dwuręcznym: trzon macicy prawidłowej wielkości, w prawym rzucie przydatków wyczuwalny skrajnie bolesny, napięty opór wielkości pomarańczy. Ujście szyjki zamknięte, brak krwawienia.</p>",
  steps: [
    {
      title: "Krok 1: Wstępna ocena ostrego brzucha i wykluczenie ciąży pozamacicznej",
      scenario: "Młoda kobieta zgłasza się z ostrym bólem w prawym dole biodrowym, obroną mięśniową i wymiotami. Jakie natychmiastowe badanie laboratoryjne i procedurę diagnostyczną należy wykonać w pierwszej kolejności?",
      options: [
        {
          text: "Przyłóżkowy test ciążowy z moczu (lub pilne oznaczenie beta-hCG w surowicy) oraz zabezpieczenie dostępu naczyniowego z pobraniem krwi na morfologię i CRP",
          correct: true,
          isCorrect: true,
          feedback: "✅ PRAWIDŁOWO! U każdej kobiety w wieku rozrodczym z ostrym bólem brzucha pierwszym i bezwzględnym krokiem jest wykluczenie pękniętej ciąży ektopowej (test beta-hCG). Równolegle ocenia się parametry zapalne i morfologię."
        },
        {
          text: "Podanie domięśniowe morfiny i odesłanie pacjentki do poradni ginekologicznej za 3 dni",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! Odesłanie pacjentki z ostrym brzuchem doprowadzi do nieodwracalnej martwicy jajnika i zapalenia otrzewnej."
        },
        {
          text: "Zlecenie kolonoskopii w znieczuleniu miejscowym w celu wykluczenia wrzodziejącego zapalenia jelita",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! Kolonoskopia w ostrym brzuchu grozi jatrogenną perforacją jelita i jest przeciwwskazana."
        },
        {
          text: "Wdrożenie dożylnej trombolizy streptokinazą z podejrzeniem zawału mięśnia lędźwiowego",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! Tromboliza w ostrym brzuchu chirurgicznym wywoła śmiertelny krwotok dootrzewnowy."
        }
      ]
    },
    {
      title: "Krok 2: Badanie obrazowe z wyboru",
      scenario: "Test ciążowy beta-hCG jest ujemny (<1 mIU/ml). Leukocytoza 13,8 G/l, CRP 18 mg/l. Jakie badanie obrazowe jest procedurą pierwszego wyboru w diagnostyce podejrzenia skrętu przydatków?",
      options: [
        {
          text: "Ultrasonografia przezpochwowa (TVS) z badaniem naczyniowym Color Doppler i Power Doppler",
          correct: true,
          isCorrect: true,
          feedback: "✅ PRAWIDŁOWO! TVS z Dopplerem jest badaniem z wyboru. Uwidacznia: powiększony jajnik z obrzękiem zrębu, pęcherzyki przesunięte obwodowo ('objaw sznura pereł'), wolny płyn w zatoce Douglasa oraz patognomoniczny objaw wiru ('whirlpool sign') odpowiadający skręconej szypule naczyniowej. Brak przepływu żylnego/tętniczego potwierdza niedokrwienie."
        },
        {
          text: "Scyntygrafia dynamiczna jajników z użyciem technetu-99m podawanego dożylnie",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! Scyntygrafia jest niedostępna w ostrym dyżurze i nie znajduje zastosowania w ginekologii ratunkowej."
        },
        {
          text: "Przeglądowe zdjęcie RTG jamy brzusznej na stojąco w celu oceny poziomu płynów w macicy",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! RTG nie uwidacznia jajników ani przepływów naczyniowych."
        },
        {
          text: "Biopsja aspiracyjna cienkoigłowa przez ścianę pochwy pod kontrolą tomografii komputerowej",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! Nakłucie skręconej torbieli dermoidalnej grozi rozlaniem jej zawartości i chemicznym zapaleniem otrzewnej."
        }
      ]
    },
    {
      title: "Krok 3: Decyzja o leczeniu operacyjnym i okno czasowe",
      scenario: "W TVS potwierdzono powiększony do 7,5 cm prawy jajnik z torbielą, objaw wiru skręconej szypuły oraz całkowity brak widocznego przepływu żylnego w badaniu Dopplerowskim. Ból trwa od 4,5 godziny. Jaka jest decyzja terapeutyczna?",
      options: [
        {
          text: "Pilna laparoskopia zwiadowcza w trybie natychmiastowym w celu ratowania narządu przed nieodwracalną martwicą",
          correct: true,
          isCorrect: true,
          feedback: "✅ PRAWIDŁOWO! Skręt przydatków to stan bezpośredniego zagrożenia utraty narządu. Krytyczne okno czasowe wynosi do 6–8 godzin od początku objawów. Laparoskopia w trybie pilnym jest złotym standardem diagnostyczno-leczniczym."
        },
        {
          text: "Włączenie doustnej antybiotykoterapii cyprofloksacyną i kontrolne USG po 14 dniach",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! Skręt to problem naczyniowy o charakterze mechanicznym; antybiotyki nie przywrócą ukrwienia, a jajnik ulegnie martwicy zgorzelinowej."
        },
        {
          text: "Ginekolgiczny masaż zewnętrzny brzucha z próbą mechanicznego rozmasowania skręconej szypuły",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! Ręczne próby manipulacji mogą doprowadzić do pęknięcia torbieli, rozerwania naczyń i krwotoku."
        },
        {
          text: "Zalecenie intensywnej gimnastyki rozciągającej na macie w celu samoistnego odkręcenia przydatków",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! Ruch fizyczny może jedynie pogłębić skręt szypuły o kolejne obroty."
        }
      ]
    },
    {
      title: "Krok 4: Nowoczesna taktyka chirurgiczna zachowująca płodność",
      scenario: "Śródoperacyjnie uwidoczniono trzykrotny skręt prawej szypuły przydatków. Jajnik jest sinoczarny, powiększony, obrzęknięty. Pacjentka ma 23 lata i nie rodziła. Jaka jest właściwa, współczesna technika operacyjna?",
      options: [
        {
          text: "Odkręcenie szypuły (detorsio), obserwacja powrotu perfuzji tkankowej przez 10–15 minut i zachowanie jajnika (wyłuszczenie torbieli doraźnie lub w drugim etapie)",
          correct: true,
          isCorrect: true,
          feedback: "✅ PRAWIDŁOWO! Dawny dogmat o konieczności natychmiastowego wycięcia sinego jajnika z obawy przed zatorowością został obalony. Badania wykazały, że nawet sinoczarne przydatki po odkręceniu (detorsio) w ponad 90% przypadków odzyskują funkcję endokrynną i owulacyjną, a ryzyko powikłań zatorowo-zakrzepowych jest znikome (<0,2%). U młodych kobiet priorytetem jest zachowanie jajnika."
        },
        {
          text: "Natychmiastowe obustronne wycięcie przydatków i macicy z następową chemioterapią",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! Kastracja młodej nieródki przy łagodnej torbieli dermoidalnej jest okaleczeniem i rażącym błędem w sztuce."
        },
        {
          text: "Podwiązanie tętnicy jajnikowej bez odkręcania szypuły i pozostawienie martwego jajnika w jamie otrzewnej",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! Pozostawienie nieodkręconego, niedokrwionego jajnika grozi rozwojem ropnia i ciężkiego zapalenia otrzewnej."
        },
        {
          text: "Nacięcie torebki jajnika i wypłukanie jamy brzusznej 10 litrami lodowatej wody destylowanej",
          correct: false,
          isCorrect: false,
          feedback: "❌ BŁĄD! Woda destylowana wywołuje hemolizę i zaburzenia elektrolitowe, a hipotermia pogłębia skurcz naczyń."
        }
      ]
    }
  ],
  pathoNodes: [
    {
      title: "Rotacja szypuły naczyniowo-więzadłowej wokół własnej osi",
      desc: "Obecność guza lub torbieli jajnika o średnicy 5–10 cm (np. potworniak dojrzały, torbiel surowicza) zmienia środek ciężkości przydatków.",
      detail: "Zwiększona ruchomość więzadła lejkowo-miednicowego i więzadła właściwego jajnika pod wpływem nagłego ruchu lub wysiłku sprzyja rotacji przydatków wokół osi naczyniowej.",
      target: "Punkt uchwytu diagnostyki i leczenia: Planowe wyłuszczanie łagodnych torbieli jajnika >5 cm u młodych kobiet w celu prewencji skrętu."
    },
    {
      title: "Zamknięcie odpływu żylnego i limfatycznego z następowym obrzękiem",
      desc: "Szypuła ulega częściowemu skręceniu, co w pierwszej kolejności zaciska cienkościenne naczynia żylne o niskim ciśnieniu.",
      detail: "Dopływ krwi tętniczej pod wyższym ciśnieniem jest początkowo zachowany. Prowadzi to do potężnego przekrwienia biernego, wynaczynień krwotocznych do zrębu i masywnego powiększenia jajnika.",
      target: "Punkt uchwytu diagnostyki: Detekcja braku przepływu żylnego w USG Doppler (nawet przy zachowanym jeszcze przepływie tętniczym – zachowany przepływ tętniczy nie wyklucza skrętu!)."
    },
    {
      title: "Niedokrwienie tętnicze, zakrzepica i martwica krwotoczna",
      desc: "Dalszy wzrost ciśnienia śródtkankowego w obrzękniętym jajniku oraz pogłębiający się skręt szypuły zamykają światło tętnicy jajnikowej.",
      detail: "Dochodzi do całkowitego niedokrwienia, martwicy krwotocznej (infarctus haemorrhagicus) tkanki jajnika i jajowodu oraz ryzyka chemicznego i bakteryjnego zapalenia otrzewnej.",
      target: "Punkt uchwytu leczenia: Pilne operacyjne odkręcenie szypuły (detorsio laparoscopica) w oknie czasowym do 6–8 godzin, ratujące czynność rozrodczą."
    }
  ],
  dutySummary: {
    overview: "Skręt przydatków (torsio adnexorum) to stan nagły w ginekologii, polegający na skręceniu jajnika i/lub jajowodu na szypule naczyniowej. Występuje najczęściej u młodych kobiet z obecnością łagodnych zmian guzowatych jajnika (zwłaszcza potworniaków dojrzałych). Wymaga natychmiastowej interwencji operacyjnej w celu ocalenia narządu.",
    diagnostics: "1. Wykluczenie ciąży ektopowej: test ciążowy z moczu lub oznaczenie stężenia beta-hCG w surowicy.\n\n2. Ultrasonografia przezpochwowa (TVS) z badaniem naczyniowym Doppler:\n   - powiększenie jajnika (>4 cm lub objętość >20 ml)\n   - obrzęk zrębu z obwodowo ułożonymi pęcherzykami ('sznur pereł')\n   - objaw wiru ('whirlpool sign') w rzucie naczyń lejkowo-miednicowych\n   - osłabienie lub brak przepływu żylnego i tętniczego.\n\n3. Badania laboratoryjne: morfologia krwi (leukocytoza), CRP, elektrolity, układ krzepnięcia.",
    drugsAndDoses: "• <span class=\"dose-pill\">Paracetamol: 1000 mg i.v.</span> w powolnym wlewie w ramach analgezji wstępnej.\n• <span class=\"dose-pill\">Ketoprofen: 100 mg i.v.</span> w 100 ml 0,9% NaCl lub NLPZ alternatywny.\n• W razie silnego bólu: <span class=\"dose-pill\">Morfina: 2–5 mg i.v.</span> miareczkowana do ustąpienia bólu.\n• Leki przeciwwymiotne: <span class=\"dose-pill\">Ondansetron: 4–8 mg i.v.</span> lub metoklopramid 10 mg i.v.",
    procedures: "Pilna laparoskopia zwiadowcza w trybie natychmiastowym (złoty standard), ostrożne odkręcenie szypuły naczyniowej (detorsio), ocena reperfuzji tkanek (zmiana zabarwienia z sinoczarnego na różowe), wyłuszczenie torbieli (cystectomia) lub ooforopeksja.",
    monitoring: "Ścisłe monitorowanie parametrów życiowych, nasilenia bólu po zabiegu, kontrola USG po 4–6 tygodniach w celu potwierdzenia zachowania pęcherzyków jajnikowych i przepływu naczyniowego."
  },
  diffTable: {
    title: "⚔️ Tabela Różnicowa: Skręt Przydatków vs Pęknięcie Ciąży Pozamacicznej vs Zapalenie Wyrostka Robaczkowego vs Pęknięcie Torbieli Jajnika",
    headers: ["Cecha kliniczna", "Skręt Przydatków (Torsio)", "Ciąża Pozamaciczna (GEU)", "Zapalenie Wyrostka", "Pęknięcie Torbieli (Ruptura)"],
    rows: [
      ["Początek i charakter bólu", "Nagły, niezwykle ostry, kurczowy z wymiotami", "Nagły, jednostronny ból z omdleniem", "Narastający, początkowo w nadbrzuszu, potem dół prawy", "Nagły ból po stosunku lub wysiłku, stały"],
      ["Test ciążowy (beta-hCG)", "Ujemny (<1 mIU/ml)", "DODATNI (obecna beta-hCG)", "Ujemny", "Ujemny (chyba że ciąża)"],
      ["Obraz w badaniu USG", "Powiększony obrzęknięty jajnik, objaw wiru, brak Doppler", "Pusta jama macicy, zmiana w przydatkach, wolny płyn", "Niekontraktilny wyrostek >6 mm, objaw tarczy", "Cienkościenna torbiel z zapadnięciem, płyn w miednicy"],
      ["Przepływy naczyniowe", "Zniesione żylne/tętnicze w przydatkach", "Objaw 'ring of fire' w trofoblaście", "Przekrwienie ściany wyrostka", "Prawidłowy przepływ w zrębie jajnika"],
      ["Gorączka i leukocytoza", "Mierny stan podgorączkowy, umiarkowana leukocytoza", "Brak gorączki, niedokrwistość w morfologii", "Wyraźna gorączka, wysoka leukocytoza i CRP", "Brak gorączki, parametry zapalne w normie"],
      ["Leczenie z wyboru", "Pilna laparoskopia z detorsją przydatków", "Laparoskopowa salpingostomia / salpingektomia", "Laparoskopowa appendektomia", "Głównie leczenie zachowawcze (chyba że krwotok)"]
    ]
  },
  lekQuestions: [
    {
      q: "Który objaw w badaniu ultrasonograficznym z użyciem kolorowego Dopplera jest PATOGNOMONICZNY dla skrętu szypuły naczyniowej przydatków?",
      question: "Który objaw w badaniu ultrasonograficznym z użyciem kolorowego Dopplera jest PATOGNOMONICZNY dla skrętu szypuły naczyniowej przydatków?",
      opts: [
        "A) Objaw wiru ('whirlpool sign') reprezentujący skręcone spiralnie naczynia krwionośne w szypule",
        "B) Objaw tarczy strzelniczej w poprzecznym przekroju przez wstępnicę",
        "C) Obecność pęcherzyków gazu w świetle żyły wrotnej wątroby",
        "D) Objaw podwójnego zarysu błony śluzowej pęcherza moczowego",
        "E) Zanik strefy korowo-rdzeniowej w obu nerkach pacjentki"
      ],
      options: [
        "A) Objaw wiru ('whirlpool sign') reprezentujący skręcone spiralnie naczynia krwionośne w szypule",
        "B) Objaw tarczy strzelniczej w poprzecznym przekroju przez wstępnicę",
        "C) Obecność pęcherzyków gazu w świetle żyły wrotnej wątroby",
        "D) Objaw podwójnego zarysu błony śluzowej pęcherza moczowego",
        "E) Zanik strefy korowo-rdzeniowej w obu nerkach pacjentki"
      ],
      correct: 0,
      correctIdx: 0,
      exp: "Prawidłowo! Objaw wiru ('whirlpool sign') to spiralne, koncentryczne skręcenie naczyń szypuły naczyniowej jajnika (naczyń lejkowo-miednicowych) widoczne w przekroju poprzecznym w kolorowym Dopplerze. Jest to wysoce swoisty objaw skrętu przydatków.",
      expl: "Prawidłowo! Objaw wiru ('whirlpool sign') to spiralne, koncentryczne skręcenie naczyń szypuły naczyniowej jajnika (naczyń lejkowo-miednicowych) widoczne w przekroju poprzecznym w kolorowym Dopplerze. Jest to wysoce swoisty objaw skrętu przydatków.",
      explanation: "Prawidłowo! Objaw wiru ('whirlpool sign') to spiralne, koncentryczne skręcenie naczyń szypuły naczyniowej jajnika (naczyń lejkowo-miednicowych) widoczne w przekroju poprzecznym w kolorowym Dopplerze. Jest to wysoce swoisty objaw skrętu przydatków."
    },
    {
      q: "Jaki jest najczęstszy łagodny guz jajnika, który ze względu na swoją budowę i masę predysponuje do wystąpienia skrętu przydatków u młodych kobiet?",
      question: "Jaki jest najczęstszy łagodny guz jajnika, który ze względu na swoją budowę i masę predysponuje do wystąpienia skrętu przydatków u młodych kobiet?",
      opts: [
        "A) Potworniak dojrzały (torbiel skórzasta / dermoid)",
        "B) Guz Brennera o litej strukturze nabłonkowej",
        "C) Ziarniszczak z komórek ziarnistych typu dorosłych",
        "D) Gruczolakorak jasnokomórkowy złośliwy jajnika",
        "E) Włókniakootoczkowiak z zespołem Meigsa"
      ],
      options: [
        "A) Potworniak dojrzały (torbiel skórzasta / dermoid)",
        "B) Guz Brennera o litej strukturze nabłonkowej",
        "C) Ziarniszczak z komórek ziarnistych typu dorosłych",
        "D) Gruczolakorak jasnokomórkowy złośliwy jajnika",
        "E) Włókniakootoczkowiak z zespołem Meigsa"
      ],
      correct: 0,
      correctIdx: 0,
      exp: "Prawidłowo! Potworniak dojrzały (teratoma adultum / cystis dermoidalis) to najczęstszy guz germinalny u młodych kobiet (stanowi ok. 30–50% wszystkich guzów skręcających się). Zawiera tkankę tłuszczową, włosy i masy łojowe, co przesuwa środek ciężkości jajnika i ułatwia rotację na szypule.",
      expl: "Prawidłowo! Potworniak dojrzały (teratoma adultum / cystis dermoidalis) to najczęstszy guz germinalny u młodych kobiet (stanowi ok. 30–50% wszystkich guzów skręcających się). Zawiera tkankę tłuszczową, włosy i masy łojowe, co przesuwa środek ciężkości jajnika i ułatwia rotację na szypule.",
      explanation: "Prawidłowo! Potworniak dojrzały (teratoma adultum / cystis dermoidalis) to najczęstszy guz germinalny u młodych kobiet (stanowi ok. 30–50% wszystkich guzów skręcających się). Zawiera tkankę tłuszczową, włosy i masy łojowe, co przesuwa środek ciężkości jajnika i ułatwia rotację na szypule."
    },
    {
      q: "Jaka jest współczesna strategia postępowania chirurgicznego u młodej pacjentki w wieku rozrodczym, u której śródoperacyjnie stwierdza się sinoczarny, powiększony jajnik w przebiegu skrętu przydatków?",
      question: "Jaka jest współczesna strategia postępowania chirurgicznego u młodej pacjentki w wieku rozrodczym, u której śródoperacyjnie stwierdza się sinoczarny, powiększony jajnik w przebiegu skrętu przydatków?",
      opts: [
        "A) Odkręcenie szypuły (detorsio) i pozostawienie jajnika in situ niezależnie od jego początkowego sinoczarnego zabarwienia",
        "B) Natychmiastowe usunięcie jajnika bez odkręcania szypuły z obawy przed zatorem tętnicy płucnej",
        "C) Obustronna owariektomia z usunięciem sieci większej i wyrostka robaczkowego",
        "D) Założenie drenu do torbieli bez odkręcania przydatków i zamknięcie powłok",
        "E) Wstrzyknięcie 100 mg heparyny bezpośrednio do miąższu niedokrwionego jajnika"
      ],
      options: [
        "A) Odkręcenie szypuły (detorsio) i pozostawienie jajnika in situ niezależnie od jego początkowego sinoczarnego zabarwienia",
        "B) Natychmiastowe usunięcie jajnika bez odkręcania szypuły z obawy przed zatorem tętnicy płucnej",
        "C) Obustronna owariektomia z usunięciem sieci większej i wyrostka robaczkowego",
        "D) Założenie drenu do torbieli bez odkręcania przydatków i zamknięcie powłok",
        "E) Wstrzyknięcie 100 mg heparyny bezpośrednio do miąższu niedokrwionego jajnika"
      ],
      correct: 0,
      correctIdx: 0,
      exp: "Prawidłowo! Współczesny złoty standard nakazuje odkręcenie szypuły (detorsio) z zachowaniem jajnika, nawet jeśli wydaje się on makroskopowo sinoczarny lub nekrotyczny. Liczne badania wykazały, że tkanka jajnikowa cechuje się wybitną odpornością na niedokrwienie i w ponad 90% podejmuje czynność hormonalną i owulacyjną, a ryzyko zatorowości jest pomijalnie niskie.",
      expl: "Prawidłowo! Współczesny złoty standard nakazuje odkręcenie szypuły (detorsio) z zachowaniem jajnika, nawet jeśli wydaje się on makroskopowo sinoczarny lub nekrotyczny. Liczne badania wykazały, że tkanka jajnikowa cechuje się wybitną odpornością na niedokrwienie i w ponad 90% podejmuje czynność hormonalną i owulacyjną, a ryzyko zatorowości jest pomijalnie niskie.",
      explanation: "Prawidłowo! Współczesny złoty standard nakazuje odkręcenie szypuły (detorsio) z zachowaniem jajnika, nawet jeśli wydaje się on makroskopowo sinoczarny lub nekrotyczny. Liczne badania wykazały, że tkanka jajnikowa cechuje się wybitną odpornością na niedokrwienie i w ponad 90% podejmuje czynność hormonalną i owulacyjną, a ryzyko zatorowości jest pomijalnie niskie."
    },
    {
      q: "Wskaż zestaw twierdzeń PRAWDZIWYCH dotyczących skrętu przydatków:\n1. Nudności i wymioty występują u ponad 70–85% pacjentek ze skrętem przydatków.\n2. Zachowany przepływ tętniczy w badaniu Dopplerowskim NIE wyklucza rozpoznania skrętu.\n3. Skręt częściej dotyczy przydatków prawych z powodu dłuższej szypuły i obecności esicy po lewej stronie.\n4. Złotym standardem leczenia jest laparoskopia zwiadowcza w trybie pilnym.\n5. Każdy skręt przydatków wymaga bezwzględnego wycięcia jajnika i jajowodu u kobiet poniżej 30. roku życia.",
      question: "Wskaż zestaw twierdzeń PRAWDZIWYCH dotyczących skrętu przydatków:\n1. Nudności i wymioty występują u ponad 70–85% pacjentek ze skrętem przydatków.\n2. Zachowany przepływ tętniczy w badaniu Dopplerowskim NIE wyklucza rozpoznania skrętu.\n3. Skręt częściej dotyczy przydatków prawych z powodu dłuższej szypuły i obecności esicy po lewej stronie.\n4. Złotym standardem leczenia jest laparoskopia zwiadowcza w trybie pilnym.\n5. Każdy skręt przydatków wymaga bezwzględnego wycięcia jajnika i jajowodu u kobiet poniżej 30. roku życia.",
      opts: [
        "A) 1, 2, 3, 4",
        "B) 1, 2, 5",
        "C) 2, 3, 4, 5",
        "D) 1, 3, 5",
        "E) Tylko 1 i 4"
      ],
      options: [
        "A) 1, 2, 3, 4",
        "B) 1, 2, 5",
        "C) 2, 3, 4, 5",
        "D) 1, 3, 5",
        "E) Tylko 1 i 4"
      ],
      correct: 0,
      correctIdx: 0,
      exp: "Prawidłowo! Twierdzenia 1, 2, 3 i 4 są prawdziwe. Skręt częściej występuje po prawej stronie (stosunek ok. 3:2), ponieważ esica po stronie lewej stabilizuje i ogranicza przestrzeń dla lewego jajnika. Obecność przepływu tętniczego nie wyklucza skrętu (często zaciśnięte są tylko żyły). Twierdzenie 5 jest fałszywe – dąży się do oszczędzenia narządu.",
      expl: "Prawidłowo! Twierdzenia 1, 2, 3 i 4 są prawdziwe. Skręt częściej występuje po prawej stronie (stosunek ok. 3:2), ponieważ esica po stronie lewej stabilizuje i ogranicza przestrzeń dla lewego jajnika. Obecność przepływu tętniczego nie wyklucza skrętu (często zaciśnięte są tylko żyły). Twierdzenie 5 jest fałszywe – dąży się do oszczędzenia narządu.",
      explanation: "Prawidłowo! Twierdzenia 1, 2, 3 i 4 są prawdziwe. Skręt częściej występuje po prawej stronie (stosunek ok. 3:2), ponieważ esica po stronie lewej stabilizuje i ogranicza przestrzeń dla lewego jajnika. Obecność przepływu tętniczego nie wyklucza skrętu (często zaciśnięte są tylko żyły). Twierdzenie 5 jest fałszywe – dąży się do oszczędzenia narządu."
    },
    {
      q: "Wskaż zdanie FAŁSZYWE dotyczące obrazu klinicznego i diagnostyki skrętu przydatków:",
      question: "Wskaż zdanie FAŁSZYWE dotyczące obrazu klinicznego i diagnostyki skrętu przydatków:",
      opts: [
        "A) Prawidłowy przepływ w tętnicy jajnikowej w badaniu Dopplerowskim ze 100% pewnością wyklucza skręt przydatków",
        "B) U pacjentek poddawanych stymulacji owulacji w procedurach ART ryzyko skrętu jest istotnie podwyższone",
        "C) Objaw obwodowego ułożenia pęcherzyków jajnikowych ('sznur pereł') wynika z obrzęku zrębu jajnika",
        "D) Ból w skręcie przydatków może mieć charakter falowy lub nawracający w przypadku samoistnego odkręcania i dokręcania",
        "E) Laparoskopia ma jednocześnie charakter diagnostyczny oraz leczniczy"
      ],
      options: [
        "A) Prawidłowy przepływ w tętnicy jajnikowej w badaniu Dopplerowskim ze 100% pewnością wyklucza skręt przydatków",
        "B) U pacjentek poddawanych stymulacji owulacji w procedurach ART ryzyko skrętu jest istotnie podwyższone",
        "C) Objaw obwodowego ułożenia pęcherzyków jajnikowych ('sznur pereł') wynika z obrzęku zrębu jajnika",
        "D) Ból w skręcie przydatków może mieć charakter falowy lub nawracający w przypadku samoistnego odkręcania i dokręcania",
        "E) Laparoskopia ma jednocześnie charakter diagnostyczny oraz leczniczy"
      ],
      correct: 0,
      correctIdx: 0,
      exp: "Prawidłowo! Zdanie A jest bezwzględnie fałszywe. Jajnik ma podwójne unaczynienie (od tętnicy jajnikowej odchodzącej od aorty oraz gałęzi jajnikowej tętnicy macicznej). W początkowej fazie skrętu zaciśnięte są wyłącznie naczynia żylne o niskim ciśnieniu, a przepływ tętniczy może być w pełni zachowany w ponad 30–40% potwierdzonych skrętów! Wykrycie przepływu tętniczego NIGDY nie wyklucza skrętu.",
      expl: "Prawidłowo! Zdanie A jest bezwzględnie fałszywe. Jajnik ma podwójne unaczynienie (od tętnicy jajnikowej odchodzącej od aorty oraz gałęzi jajnikowej tętnicy macicznej). W początkowej fazie skrętu zaciśnięte są wyłącznie naczynia żylne o niskim ciśnieniu, a przepływ tętniczy może być w pełni zachowany w ponad 30–40% potwierdzonych skrętów! Wykrycie przepływu tętniczego NIGDY nie wyklucza skrętu.",
      explanation: "Prawidłowo! Zdanie A jest bezwzględnie fałszywe. Jajnik ma podwójne unaczynienie (od tętnicy jajnikowej odchodzącej od aorty oraz gałęzi jajnikowej tętnicy macicznej). W początkowej fazie skrętu zaciśnięte są wyłącznie naczynia żylne o niskim ciśnieniu, a przepływ tętniczy może być w pełni zachowany w ponad 30–40% potwierdzonych skrętów! Wykrycie przepływu tętniczego NIGDY nie wyklucza skrętu."
    },
    {
      q: "17-letnia pacjentka trafia na SOR z objawami skrętu przydatków wymagającego pilnej laparoskopii. Jest przytomna, jej rodzice przebywają za granicą i nie ma z nimi kontaktu telefonicznego. Zgodnie z polskim prawem:",
      question: "17-letnia pacjentka trafia na SOR z objawami skrętu przydatków wymagającego pilnej laparoskopii. Jest przytomna, jej rodzice przebywają za granicą i nie ma z nimi kontaktu telefonicznego. Zgodnie z polskim prawem:",
      opts: [
        "A) W stanie nagłym grożącym ciężkim uszkodzeniem zdrowia (utratą jajnika) lekarz może operować bez zwłoki na podstawie decyzji konsylium dwóch lekarzy, zawiadamiając równolegle sąd opiekuńczy",
        "B) Lekarz musi powstrzymać się od operacji do ukończenia przez pacjentkę 18. roku życia",
        "C) Zgodę na operację może podpisać jakikolwiek pełnoletni kolega ze szkoły pacjentki",
        "D) Wymagane jest bezwzględne oczekiwanie na pisemną depeszę z ambasady polskiej",
        "E) Lekarz ma prawo jedynie podać leki przeciwbólowe bez możliwości wykonania zabiegu"
      ],
      options: [
        "A) W stanie nagłym grożącym ciężkim uszkodzeniem zdrowia (utratą jajnika) lekarz może operować bez zwłoki na podstawie decyzji konsylium dwóch lekarzy, zawiadamiając równolegle sąd opiekuńczy",
        "B) Lekarz musi powstrzymać się od operacji do ukończenia przez pacjentkę 18. roku życia",
        "C) Zgodę na operację może podpisać jakikolwiek pełnoletni kolega ze szkoły pacjentki",
        "D) Wymagane jest bezwzględne oczekiwanie na pisemną depeszę z ambasady polskiej",
        "E) Lekarz ma prawo jedynie podać leki przeciwbólowe bez możliwości wykonania zabiegu"
      ],
      correct: 0,
      correctIdx: 0,
      exp: "Prawidłowo! Zgodnie z art. 34 ust. 7 Ustawy o zawodach lekarza i lekarza dentysty, gdy zachodzi potrzeba natychmiastowego wykonania zabiegu operacyjnego u małoletniego, a porozumienie z przedstawicielem ustawowym jest niemożliwe, lekarz może podjąć decyzję o zabiegu po zasięgnięciu w miarę możliwości opinii drugiego lekarza, niezwłocznie zawiadamiając o tym sąd opiekuńczy.",
      expl: "Prawidłowo! Zgodnie z art. 34 ust. 7 Ustawy o zawodach lekarza i lekarza dentysty, gdy zachodzi potrzeba natychmiastowego wykonania zabiegu operacyjnego u małoletniego, a porozumienie z przedstawicielem ustawowym jest niemożliwe, lekarz może podjąć decyzję o zabiegu po zasięgnięciu w miarę możliwości opinii drugiego lekarza, niezwłocznie zawiadamiając o tym sąd opiekuńczy.",
      explanation: "Prawidłowo! Zgodnie z art. 34 ust. 7 Ustawy o zawodach lekarza i lekarza dentysty, gdy zachodzi potrzeba natychmiastowego wykonania zabiegu operacyjnego u małoletniego, a porozumienie z przedstawicielem ustawowym jest niemożliwe, lekarz może podjąć decyzję o zabiegu po zasięgnięciu w miarę możliwości opinii drugiego lekarza, niezwłocznie zawiadamiając o tym sąd opiekuńczy."
    },
    {
      q: "Który z poniższych czynników anatomicznych lub jatrogennych predysponuje do wystąpienia skrętu przydatków w populacji kobiet w ciąży?",
      question: "Który z poniższych czynników anatomicznych lub jatrogennych predysponuje do wystąpienia skrętu przydatków w populacji kobiet w ciąży?",
      opts: [
        "A) Zespół hiperstymulacji jajników (OHSS) z obecnością mnogich torbieli luteinowych i powiększeniem jajników",
        "B) Fizjologiczny wzrost stężenia prolaktyny blokujący wydzielanie somatotropiny",
        "C) Prawidłowe zagnieżdżenie pęcherzyka ciążowego w dnie jamy macicy",
        "D) Izolowane poszerzenie moczowodu prawego na tle ucisku rosnącej macicy",
        "E) Wzrost stężenia ferrytyny w surowicy matki powyżej wartości wyjściowych"
      ],
      options: [
        "A) Zespół hiperstymulacji jajników (OHSS) z obecnością mnogich torbieli luteinowych i powiększeniem jajników",
        "B) Fizjologiczny wzrost stężenia prolaktyny blokujący wydzielanie somatotropiny",
        "C) Prawidłowe zagnieżdżenie pęcherzyka ciążowego w dnie jamy macicy",
        "D) Izolowane poszerzenie moczowodu prawego na tle ucisku rosnącej macicy",
        "E) Wzrost stężenia ferrytyny w surowicy matki powyżej wartości wyjściowych"
      ],
      correct: 0,
      correctIdx: 0,
      exp: "Prawidłowo! W procedurach rozrodu wspomaganego (IVF) po stymulacji gonadotropinami może dojść do zespołu hiperstymulacji jajników (OHSS). Powiększone do kilkunastu centymetrów jajniki z licznymi torbielami ciałka żółtego wykazują wybitną tendencję do skrętu, szczególnie w pierwszym trymestrze ciąży.",
      expl: "Prawidłowo! W procedurach rozrodu wspomaganego (IVF) po stymulacji gonadotropinami może dojść do zespołu hiperstymulacji jajników (OHSS). Powiększone do kilkunastu centymetrów jajniki z licznymi torbielami ciałka żółtego wykazują wybitną tendencję do skrętu, szczególnie w pierwszym trymestrze ciąży.",
      explanation: "Prawidłowo! W procedurach rozrodu wspomaganego (IVF) po stymulacji gonadotropinami może dojść do zespołu hiperstymulacji jajników (OHSS). Powiększone do kilkunastu centymetrów jajniki z licznymi torbielami ciałka żółtego wykazują wybitną tendencję do skrętu, szczególnie w pierwszym trymestrze ciąży."
    },
    {
      q: "Na czym polega zabieg ooforopeksji (oophoropexia) i kiedy jest rozważany?",
      question: "Na czym polega zabieg ooforopeksji (oophoropexia) i kiedy jest rozważany?",
      opts: [
        "A) Przyszyciu jajnika do ściany miednicy lub więzadła obłego w celu zapobiegania nawrotom skrętu",
        "B) Całkowitym usunięciu miąższu jajnika z pozostawieniem torebki łącznotkankowej",
        "C) Zespoleniu naczyń jajnikowych z tętnicą nabrzuszną dolną sposobem mikronaczyniowym",
        "D) Wytworzeniu okienka w więzadle szerokim macicy dla odpływu chłonki",
        "E) Wprowadzeniu stentu samorozprężalnego do światła jajowodu Fallopa"
      ],
      options: [
        "A) Przyszyciu jajnika do ściany miednicy lub więzadła obłego w celu zapobiegania nawrotom skrętu",
        "B) Całkowitym usunięciu miąższu jajnika z pozostawieniem torebki łącznotkankowej",
        "C) Zespoleniu naczyń jajnikowych z tętnicą nabrzuszną dolną sposobem mikronaczyniowym",
        "D) Wytworzeniu okienka w więzadle szerokim macicy dla odpływu chłonki",
        "E) Wprowadzeniu stentu samorozprężalnego do światła jajowodu Fallopa"
      ],
      correct: 0,
      correctIdx: 0,
      exp: "Prawidłowo! Ooforopeksja to chirurgiczne umocowanie jajnika szwami do bocznej ściany miednicy mniejszej, tylnej ściany macicy lub skrócenie więzadła lejkowo-miednicowego. Stosuje się ją w nawrotowych skrętach lub przy skręcie jedynego zachowanego jajnika.",
      expl: "Prawidłowo! Ooforopeksja to chirurgiczne umocowanie jajnika szwami do bocznej ściany miednicy mniejszej, tylnej ściany macicy lub skrócenie więzadła lejkowo-miednicowego. Stosuje się ją w nawrotowych skrętach lub przy skręcie jedynego zachowanego jajnika.",
      explanation: "Prawidłowo! Ooforopeksja to chirurgiczne umocowanie jajnika szwami do bocznej ściany miednicy mniejszej, tylnej ściany macicy lub skrócenie więzadła lejkowo-miednicowego. Stosuje się ją w nawrotowych skrętach lub przy skręcie jedynego zachowanego jajnika."
    },
    {
      q: "Jakie powikłanie może wystąpić w przypadku śródoperacyjnego pęknięcia torbieli dermoidalnej (potworniaka dojrzałego) i rozlania jej zawartości do jamy otrzewnej?",
      question: "Jakie powikłanie może wystąpić w przypadku śródoperacyjnego pęknięcia torbieli dermoidalnej (potworniaka dojrzałego) i rozlania jej zawartości do jamy otrzewnej?",
      opts: [
        "A) Chemiczne, ziarniniakowe zapalenie otrzewnej (chemical peritonitis) wywołane przez drażniące masy łojowe",
        "B) Piorunująca niewydolność nerek w mechanizmie ostrej martwicy cewek przez kryształy uranowe",
        "C) Natychmiastowe zrośnięcie zastawek aortalnych i mitralnych przez związki keratynowe",
        "D) Rozsiew złośliwy komórek rakowych do opłucnej i worka osierdziowego",
        "E) Wystąpienie napadu miastenicznego z obecnością przeciwciał anty-MuSK"
      ],
      options: [
        "A) Chemiczne, ziarniniakowe zapalenie otrzewnej (chemical peritonitis) wywołane przez drażniące masy łojowe",
        "B) Piorunująca niewydolność nerek w mechanizmie ostrej martwicy cewek przez kryształy uranowe",
        "C) Natychmiastowe zrośnięcie zastawek aortalnych i mitralnych przez związki keratynowe",
        "D) Rozsiew złośliwy komórek rakowych do opłucnej i worka osierdziowego",
        "E) Wystąpienie napadu miastenicznego z obecnością przeciwciał anty-MuSK"
      ],
      correct: 0,
      correctIdx: 0,
      exp: "Prawidłowo! Zawartość potworniaka dojrzałego (masy łojowe, cholesterol, keratyna, włosy) działa silnie drażniąco na otrzewną. W razie pęknięcia torbieli dochodzi do chemicznego zapalenia otrzewnej, które może skutkować powstaniem masywnych, gęstych zrostów wewnątrzotrzewnowych. Wymaga to obfitego płukania ciepłą solą fizjologiczną.",
      expl: "Prawidłowo! Zawartość potworniaka dojrzałego (masy łojowe, cholesterol, keratyna, włosy) działa silnie drażniąco na otrzewną. W razie pęknięcia torbieli dochodzi do chemicznego zapalenia otrzewnej, które może skutkować powstaniem masywnych, gęstych zrostów wewnątrzotrzewnowych. Wymaga to obfitego płukania ciepłą solą fizjologiczną.",
      explanation: "Prawidłowo! Zawartość potworniaka dojrzałego (masy łojowe, cholesterol, keratyna, włosy) działa silnie drażniąco na otrzewną. W razie pęknięcia torbieli dochodzi do chemicznego zapalenia otrzewnej, które może skutkować powstaniem masywnych, gęstych zrostów wewnątrzotrzewnowych. Wymaga to obfitego płukania ciepłą solą fizjologiczną."
    },
    {
      q: "Który z poniższych parametrów w badaniu USG przydatków najsilniej przemawia za izolowanym obrzękiem jajnika bez jego całkowitego zawału?",
      question: "Który z poniższych parametrów w badaniu USG przydatków najsilniej przemawia za izolowanym obrzękiem jajnika bez jego całkowitego zawału?",
      opts: [
        "A) Zachowanie obwodowego przepływu żylnego w naczyniach torebkowych jajnika",
        "B) Całkowity zanik echogeniczności zrębu z obecnością gęstych zwapnień w całym narządzie",
        "C) Zmniejszenie objętości jajnika poniżej 1 centymetra sześciennego",
        "D) Obecność wolnego gazu w przestrzeni okołojajnikowej",
        "E) Przekształcenie jajnika w jednolicie bezechową przestrzeń płynową bez torebki"
      ],
      options: [
        "A) Zachowanie obwodowego przepływu żylnego w naczyniach torebkowych jajnika",
        "B) Całkowity zanik echogeniczności zrębu z obecnością gęstych zwapnień w całym narządzie",
        "C) Zmniejszenie objętości jajnika poniżej 1 centymetra sześciennego",
        "D) Obecność wolnego gazu w przestrzeni okołojajnikowej",
        "E) Przekształcenie jajnika w jednolicie bezechową przestrzeń płynową bez torebki"
      ],
      correct: 0,
      correctIdx: 0,
      exp: "Prawidłowo! Zachowanie jakiegokolwiek przepływu naczyniowego (zwłaszcza żylnego) wskazuje na niepełne zaciśnięcie szypuły lub stan wczesny, co rokuje znakomicie pod kątem pełnego odzyskania funkcji po chirurgicznym odkręceniu narządu.",
      expl: "Prawidłowo! Zachowanie jakiegokolwiek przepływu naczyniowego (zwłaszcza żylnego) wskazuje na niepełne zaciśnięcie szypuły lub stan wczesny, co rokuje znakomicie pod kątem pełnego odzyskania funkcji po chirurgicznym odkręceniu narządu.",
      explanation: "Prawidłowo! Zachowanie jakiegokolwiek przepływu naczyniowego (zwłaszcza żylnego) wskazuje na niepełne zaciśnięcie szypuły lub stan wczesny, co rokuje znakomicie pod kątem pełnego odzyskania funkcji po chirurgicznym odkręceniu narządu."
    },
    {
      q: "Co należy zrobić, jeżeli w trakcie laparoskopii po odkręceniu skręconego jajnika tkanka pozostaje ciemna, a tętno w naczyniach szypuły powraca bardzo powoli?",
      question: "Co należy zrobić, jeżeli w trakcie laparoskopii po odkręceniu skręconego jajnika tkanka pozostaje ciemna, a tętno w naczyniach szypuły powraca bardzo powoli?",
      opts: [
        "A) Pozostawić jajnik, nie usuwać go i nie wyłuszczać torbieli na siłę – odroczyć ewentualną cystektomię do kontrolnego zabiegu po kilku tygodniach",
        "B) Natychmiast usunąć oba jajniki wraz z wycięciem węzłów chłonnych paraaortalnych",
        "C) Poddać jajnik elektrokoagulacji monopolarnej o wysokiej energii na całej powierzchni",
        "D) Podać do jamy macicy wlew z 40% glukozy w celu wymuszenia metabolizmu beztlenowego",
        "E) Zastosować mechaniczną kompresję jajnika kleszczami hemostatycznymi Kochera"
      ],
      options: [
        "A) Pozostawić jajnik, nie usuwać go i nie wyłuszczać torbieli na siłę – odroczyć ewentualną cystektomię do kontrolnego zabiegu po kilku tygodniach",
        "B) Natychmiast usunąć oba jajniki wraz z wycięciem węzłów chłonnych paraaortalnych",
        "C) Poddać jajnik elektrokoagulacji monopolarnej o wysokiej energii na całej powierzchni",
        "D) Podać do jamy macicy wlew z 40% glukozy w celu wymuszenia metabolizmu beztlenowego",
        "E) Zastosować mechaniczną kompresję jajnika kleszczami hemostatycznymi Kochera"
      ],
      correct: 0,
      correctIdx: 0,
      exp: "Prawidłowo! Zgodnie z rekomendacjami ginekologii małoinwazyjnej, w ostrym niedokrwieniu tkanki jajnika są kruche i obrzęknięte. Wyłuszczanie torbieli w ostrej fazie może doprowadzić do rozerwania torebki i utraty zdrowego miąższu. Rekomenduje się wykonanie samej detorsji, pozostawienie jajnika i zaplanowanie planowej cystektomii po 6–8 tygodniach od wygojenia obrzęku.",
      expl: "Prawidłowo! Zgodnie z rekomendacjami ginekologii małoinwazyjnej, w ostrym niedokrwieniu tkanki jajnika są kruche i obrzęknięte. Wyłuszczanie torbieli w ostrej fazie może doprowadzić do rozerwania torebki i utraty zdrowego miąższu. Rekomenduje się wykonanie samej detorsji, pozostawienie jajnika i zaplanowanie planowej cystektomii po 6–8 tygodniach od wygojenia obrzęku.",
      explanation: "Prawidłowo! Zgodnie z rekomendacjami ginekologii małoinwazyjnej, w ostrym niedokrwieniu tkanki jajnika są kruche i obrzęknięte. Wyłuszczanie torbieli w ostrej fazie może doprowadzić do rozerwania torebki i utraty zdrowego miąższu. Rekomenduje się wykonanie samej detorsji, pozostawienie jajnika i zaplanowanie planowej cystektomii po 6–8 tygodniach od wygojenia obrzęku."
    }
  ],
  flashcards: [
    { q: "Jaka jest najczęstsza przyczyna anatomiczna skrętu przydatków?", a: "Obecność łagodnej torbieli jajnika o średnicy 5–10 cm (najczęściej potworniaka dojrzałego – dermoidu)." },
    { q: "Jaki jest patognomoniczny objaw skrętu przydatków w USG Doppler?", a: "Objaw wiru ('whirlpool sign') odpowiadający skręconym naczyniom szypuły naczyniowej." },
    { q: "Czy zachowany przepływ tętniczy w Dopplerze wyklucza skręt przydatków?", a: "NIE! W początkowej fazie zaciśnięte są tylko żyły, a przepływ tętniczy może być obecny u ponad 30% chorych." },
    { q: "Jaka jest współczesna taktyka chirurgiczna przy sinoczarnym jajniku u młodej kobiety?", a: "Odkręcenie szypuły (detorsio) i zachowanie jajnika – w ponad 90% przypadków narząd podejmuje czynność." },
    { q: "Który jajnik częściej ulega skrętowi i dlaczego?", a: "Jajnik prawy (stosunek 3:2), ponieważ esica po stronie lewej anatomicznie ogranicza ruchomość lewych przydatków." },
    { q: "Jakie jest krytyczne okno czasowe dla odkręcenia przydatków?", a: "Do 6–8 godzin od początku wystąpienia ostrych objawów bólowych." }
  ]
};

async function run() {
  console.log('Encrypting and writing cases 153, 154, 155...');
  const cases = [case153, case154, case155];
  for (const c of cases) {
    const enc = await encryptStringAes(JSON.stringify(c, null, 2), MASTER_KEY);
    fs.writeFileSync(path.join('cases', c.file), JSON.stringify(enc, null, 2), 'utf8');
    console.log(`✓ Case #${c.id} (${c.file}) written and encrypted.`);
  }
}

run().catch(console.error);

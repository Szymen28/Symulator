const fs = require('fs');
const path = require('path');
const { decryptObjectAes, encryptStringAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

const fixes = {
  74: [
    {
      qIdx: 9,
      opts: [
        "A) W końcowym odcinku jelita krętego (ileum terminale)",
        "B) W dwunastnicy i początkowym odcinku jelita czczego",
        "C) W opuszce dwunastnicy i odźwierniku żołądka",
        "D) W jelicie czczym po uprzedniej degradacji przez enzymy trzustkowe",
        "E) W kątnicy i początkowym odcinku wstępnicy okrężnicy"
      ],
      correct: 0,
      exp: "Prawidłowo! Kompleks witamina B12-czynnik wewnętrzny (IF) wchłania się w dystalnym odcinku jelita krętego (ileum terminale) za pośrednictwem swoistych receptorów (kubilina/amnionless). Resekcja tego odcinka jelita lub procesy zapalne (np. choroba Leśniowskiego-Crohna) prowadzą do ciężkiego niedoboru witaminy B12."
    }
  ],
  75: [
    {
      qIdx: 5,
      opts: [
        "A) Wystarczy współistnienie mikroangiopatycznej anemii hemolitycznej (MAHA ze schistocytami) oraz małopłytkowości bez innej uchwytnej przyczyny",
        "B) Bezwzględnie musi wystąpić całe 5 objawów: gorączka, małopłytkowość, MAHA, ostra niewydolność nerek i głębokie zaburzenia neurologiczne",
        "C) Wymagana jest gorączka powyżej 40°C, śpiączka mózgowa oraz bezwzględny wzrost kreatyniny powyżej 5 mg/dl w surowicy",
        "D) Wymagany jest bezmocz trwający minimum 48 godzin w połączeniu z izolowanym spadkiem stężenia fibrynogenu poniżej 100 mg/dl",
        "E) Wystarcza izolowany ból głowy z łagodną leukocytozą przy całkowicie prawidłowej liczbie płytek krwi i braku hemolizy"
      ],
      correct: 0,
      exp: "Prawidłowo! Pełna klasyczna pentada Moschcowitza (trombocytopenia, MAHA, objawy neurologiczne, niewydolność nerek, gorączka) występuje obecnie u mniej niż 10% chorych. Do wdrożenia natychmiastowego leczenia ratującego życie (plazmafereza TPE) wystarcza diad: MAHA (niedokrwistość hemolityczna ze schistocytami w rozmazie) + małopłytkowość bez innej uchwytnej przyczyny."
    },
    {
      qIdx: 7,
      opts: [
        "A) Rytuksymab (przeciwciało monoklonalne skierowane przeciwko antygenowi CD20 limfocytów B)",
        "B) Metotreksat (antagonista kwasu foliowego hamujący syntezę zasad purynowych i pirymidynowych)",
        "C) Cyklosporyna A (inhibitor kalcyneuryny blokujący transkrypcję cytokin w limfocytach T)",
        "D) Hydroksymocznik (inhibitor reduktazy rybonukleotydowej stosowany w zespołach mieloproliferacyjnych)",
        "E) Cyklofosfamid (lek alkilujący DNA stosowany głównie w ciężkim toczniowym zapaleniu nerek)"
      ],
      correct: 0,
      exp: "Prawidłowo! Rytuksymab (anty-CD20) niszczy patologiczny klon limfocytów B wytwarzających autoprzeciwciała przeciwko enzymowi ADAMTS13. Włączenie rytuksymabu w ostrej fazie nabytej TTP (iTTP) znacznie zmniejsza ryzyko nawrotu choroby i skraca czas do uzyskania remisji."
    },
    {
      qIdx: 10,
      opts: [
        "A) Bezwzględnie pobrać i zabezpieczyć krew na oznaczenie aktywności enzymu ADAMTS13 oraz miana przeciwciał anty-ADAMTS13",
        "B) Podać profilaktycznie 10 mg witaminy K i.v. oraz wykonać próbę krzyżową bez zabezpieczania osocza na badania enzymatyczne",
        "C) Ograniczyć diagnostykę wyłącznie do oznaczenia grupy krwi i morfologii, odraczając badania enzymatyczne do fazy remisji",
        "D) Wstrzyknąć do probówki heparynę niefrakcjonowaną i zamrozić w temp. -80°C wyłącznie w celu oznaczenia mutacji genu CFH",
        "E) Nie pobierać krwi, ponieważ podanie osocza nie wpływa na wiarygodność późniejszego pomiaru stężenia ADAMTS13 w surowicy"
      ],
      correct: 0,
      exp: "Prawidłowo! Krew na badanie aktywności i przeciwciał anty-ADAMTS13 musi być pobrana PRZED przetoczeniem jakiegokolwiek osocza lub rozpoczęciem plazmaferezy, ponieważ przetoczone świeżo mrożone osocze zawiera prawidłowy enzym ADAMTS13, co sfałszowałoby wynik diagnostyczny (dało fałszywie wysoką aktywność enzymu)."
    }
  ],
  76: [
    {
      qIdx: 4,
      opts: [
        "A) Przynależność do grupy wysokiego ryzyka ciężkich powikłań septycznych i zgonu, co stanowi bezwzględne wskazanie do hospitalizacji i leczenia dożylnego",
        "B) Kwalifikację pacjenta do grupy niskiego ryzyka powikłań, umożliwiającą bezpieczne wdrożenie leczenia doustnego cyprofloksacyną w warunkach domowych",
        "C) Całkowity brak cech immunosupresji i możliwość natychmiastowego zakończenia izolacji ochronnej bez konieczności monitorowania parametrów zakażenia",
        "D) Izolowane wskazanie do natychmiastowego przetoczenia koncentratu granulocytarnego i chirurgicznego drenażu bez empirycznej antybiotykoterapii",
        "E) Uzyskanie pełnej remisji hematologicznej nowotworu i brak wskazań do pobierania posiewów krwi oraz wdrażania leczenia przeciwbakteryjnego"
      ],
      correct: 0,
      exp: "Prawidłowo! W skali MASCC im MNIEJ punktów, tym WYŻSZE ryzyko powikłań. Wynik < 21 punktów oznacza grupę wysokiego ryzyka ciężkich powikłań infekcyjnych i zgonu, co bezwzględnie obliguje do natychmiastowej hospitalizacji i dożylnej empirycznej antybiotykoterapii o szerokim spektrum (np. piperacylina/tazobaktam lub meropenem)."
    },
    {
      qIdx: 8,
      opts: [
        "A) Wzrost posiewu krwi pobranej z portu o co najmniej 2 godziny wcześniej niż z krwi pobranej z żyły obwodowej (DTP - differential time to positivity)",
        "B) Wzrost posiewu z krwi obwodowej o co najmniej 4 godziny wcześniej niż z portu naczyniowego przy ujemnym posiewie ze skórnego ujścia cewnika",
        "C) Wyhodowanie bakterii wyłącznie w butelce beztlenowej z żyły obwodowej przy jałowości obu butelek pobranych bezpośrednio z komory portu",
        "D) Izolowany wzrost leukocytozy powyżej 15 G/l z przesunięciem w lewo bez stwierdzenia obecności drobnoustrojów w posiewach krwi obwodowej i centralnej",
        "E) Ujemny wynik posiewu krwi z portu i żyły obwodowej po 7 dniach inkubacji w połączeniu ze spadkiem temperatury po wlewie 500 ml 0,9% NaCl"
      ],
      correct: 0,
      exp: "Prawidłowo! Kryterium różnicy czasu do dodatniości posiewu (DTP - differential time to positivity): wzrost drobnoustroju z próbki pobranej z cewnika/portu o ≥ 2 godziny wcześniej niż z próbki pobranej z żyły obwodowej (o tej samej objętości) potwierdza odcewnikowe zakażenie łożyska naczyniowego (CRBSI)."
    }
  ],
  77: [
    {
      qIdx: 4,
      opts: [
        "A) Denosumab (przeciwciało monoklonalne skierowane przeciwko ligandowi RANKL)",
        "B) Kwas zoledronowy podawany we wlewie dożylnym w standardowej pełnej dawce 4 mg",
        "C) Alendronian sodu podawany doustnie raz w tygodniu na czczo z dużą ilością wody",
        "D) Pamidronian disodowy w powolnej infuzji i.v. bez monitorowania klirensu nerkowego",
        "E) Ibandronian sodu w postaci iniekcji dożylnej bez konieczności redukcji dawkowania"
      ],
      correct: 0,
      exp: "Prawidłowo! Bisfosfoniany (zoledronian, pamidronian) podlegają eliminacji nerkowej i są nefrotoksyczne (przeciwwskazane przy eGFR < 30 ml/min). Denosumab (przeciwciało anty-RANKL) jest metabolizowany w układzie siateczkowo-śródbłonkowym i nie zależy od funkcji nerek, dzięki czemu jest lekiem pierwszego wyboru u pacjentów z niewydolnością nerek."
    },
    {
      qIdx: 5,
      opts: [
        "A) Niesteroidowe leki przeciwzapalne (NLPZ) oraz dożylne jodowe środki cieniujące (kontrast radiologiczny)",
        "B) Intensywna dożylna płynoterapia 0,9% NaCl oraz diureza forsowana pod ścisłą kontrolą bilansu płynów",
        "C) Paracetamol w dawkach terapeutycznych oraz leki opioidowe stosowane w drabince analgetycznej WHO",
        "D) Inhibitory proteasomu (np. bortezomib) skojarzone z deksametazonem w terapii przeciwszpiczakowej",
        "E) Denosumab podawany podskórnie w profilaktyce powikłań kostnych u pacjentów z obniżonym eGFR"
      ],
      correct: 0,
      exp: "Prawidłowo! NLPZ (hamujące syntezę prostaglandyn rozszerzających tętniczkę doprowadzającą kłębuszka) oraz jodowe środki kontrastowe drastycznie nasilają uszkodzenie nerek i mogą wywołać nieodwracalną bezmoczową niewydolność nerek w przebiegu nefropatii wałeczkowej (nerki szpiczakowej)."
    },
    {
      qIdx: 10,
      opts: [
        "A) Obecność wysokich stężeń monoklonalnego białka M w surowicy, które zmniejsza ujemny ładunek elektrostatyczny erytrocytów (potencjał dzeta) i nasila ich rulonizację",
        "B) Masywna degradacja płytek krwi w śledzionie z uwalnianiem serotoniny i tromboksanu, co drastycznie hamuje sedymentację krwinek czerwonych w osoczu",
        "C) Wzrost ciśnienia parcjalnego tlenu we krwi tętniczej powodujący destabilizację błony komórkowej erytrocytów i ich przedwczesny rozpad śródnaczyniowy",
        "D) Uwalnianie z niszczonych kości jonów wapnia tworzących nierozpuszczalne hydroksyapatyty, które mechanicznie obciążają i strącają leukocyty",
        "E) Izolowany spadek stężenia fibrynogenu poniżej 50 mg/dl w przebiegu przewlekłego zespołu rozsianego krzepnięcia wewnątrznaczyniowego (DIC)"
      ],
      correct: 0,
      exp: "Prawidłowo! Erytrocyty fizjologicznie odpychają się z powodu ujemnego ładunku na powierzchni (potencjał dzeta z kwasu sjalowego). Dodatnio naładowane cząsteczki immunoglobulin (białko M) neutralizują ten ładunek, umożliwiając łączenie się krwinek w stosy ('rulonizacja'), co dramatically zwiększa ich masę i prędkość opadania (trzycyfrowy OB)."
    }
  ],
  78: [
    {
      qIdx: 6,
      opts: [
        "A) Zatkanie naczyń mikrokrążenia przez sztywne, olbrzymie blasty przy skrajnej leukocytozie (>50-100 G/l), prowadzące do niedokrwienia mózgu (udar, zaburzenia świadomości) i niewydolności oddechowej",
        "B) Nagłe zatrzymanie krążenia w mechanizmie asystolii wywołane masywnym uwalnianiem potasu z lizowanych leukocytów bezpośrednio po podaniu pierwszej dawki chemioterapii indukującej",
        "C) Piorunujące zakażenie bakteryjne łożyska naczyniowego wywołane przez Pseudomonas aeruginosa przy skrajnej neutropenii, prowadzące do wstrząsu septycznego opornego na aminy katecholowe",
        "D) Ostre uszkodzenie nerek spowodowane krystalizacją kwasu moczowego i fosforanów wapnia w cewkach dystalnych w przebiegu samoistnego zespołu rozpadu guza (TLS)",
        "E) Masywne gromadzenie się dojrzałych granulocytów w miąższu wątroby i śledziony, powodujące pęknięcie torebki narządowej i krwawienie do jamy otrzewnej"
      ],
      correct: 0,
      exp: "Prawidłowo! Leukostaza to stan bezpośredniego zagrożenia życia w ostrych białaczkach ze skrajną hiperleukocytozą (blasty > 50-100 G/l). Duże, sztywne mieloblasty zatykają mikronaczynia mózgowe i płucne, powodując hipoksemię, zawały i wylewy śródmózgowe. Wymaga pilnej cytoredukcji (hydroksymocznik) i leczenia wspomagającego."
    }
  ]
};

async function run() {
  const files = fs.readdirSync('cases').filter(f => /^\d+_.*\.json$/.test(f));
  for (const f of files) {
    const cid = parseInt(f.match(/^(\d+)_/)[1], 10);
    if (!fixes[cid]) continue;
    console.log(`Fixing Case #${cid} (${f})...`);
    const raw = JSON.parse(fs.readFileSync(path.join('cases', f), 'utf8'));
    const c = await decryptObjectAes(raw, MASTER_KEY);
    const questions = c.lekQuestions || c.lek_questions || (c.quiz && c.quiz.questions) || [];
    
    fixes[cid].forEach(fix => {
      const q = questions[fix.qIdx];
      if (!q) {
        console.error(`  Error: Q idx ${fix.qIdx} not found in Case #${cid}`);
        return;
      }
      q.opts = fix.opts;
      q.options = fix.opts;
      q.correct = fix.correct;
      q.correctIdx = fix.correct;
      if (fix.exp) {
        q.exp = fix.exp;
        q.expl = fix.exp;
        q.explanation = fix.exp;
      }
      console.log(`  ✓ Updated Q${fix.qIdx + 1}`);
    });

    const encrypted = await encryptStringAes(JSON.stringify(c, null, 2), MASTER_KEY);
    fs.writeFileSync(path.join('cases', f), JSON.stringify(encrypted, null, 2), 'utf8');
    console.log(`✓ Case #${cid} successfully updated and re-encrypted.`);
  }
}

run();

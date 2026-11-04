const fs = require('fs');
const path = require('path');
const { decryptObjectAes, encryptStringAes } = require('./encrypt_case.js');
const MASTER_KEY = '@LEKSzymon28111999';

const remainingUpdates = {
  14: [
    {
      qIdx: 4, // Q5
      newOpts: [
        "A. Dożylne pulsy metyloprednizolonu w dawce 1000 mg na dobę przez 5 kolejnych dni.",
        "B. Dożylne wlewy immunoglobulin (IVIG 0.4 g/kg/d przez 5 dni) LUB plazmafereza lecznicza (PE 4–5 zabiegów)",
        "C. Doustny metotreksat w dawce tygodniowej 25 mg z suplementacją kwasu foliowego.",
        "D. Cyklofosfamid we wlewie ciągłym dożylnym przez 30 dni w warunkach oddziału OIT.",
        "E. Doksycyklina w dawce 100 mg co 12 godzin w skojarzeniu z doustną ryfampicyną."
      ]
    },
    {
      qIdx: 7, // Q8
      newOpts: [
        "A. Niedowład połowiczy, afazja ruchowa oraz skojarzone zbaczanie gałek ocznych w bok.",
        "B. Oftalmoplegia (porażenie gałkoruchowe), ataksja (niezborność) oraz arefleksja (brak odruchów).",
        "C. Wysoka gorączka septyczna, sztywność karku na 4 palce oraz silny światłowstręt.",
        "D. Drżenie spoczynkowe rąk, plastyczna sztywność pozapiramidowa oraz bradykinezja.",
        "E. Obustronna ptoza, osłabienie mięśni żwaczy oraz napadowa tachykardia zatokowa."
      ]
    },
    {
      qIdx: 9, // Q10
      newOpts: [
        "A. Przejściowa suchość w jamie ustnej wywołana zmniejszeniem wydzielania ślinianek przyusznych.",
        "B. Ciężka bradykardia i asystolia wyzwalane manewrami wagalnymi (np. odsysaniem rurki intubacyjnej).",
        "C. Uporczywe zaparcia atoniczne wymagające okresowego podawania doodbytniczych wlewek soli.",
        "D. Nadmierne łojotokowe zapalenie skóry twarzy w wyniku przejściowej stymulacji gruczołów.",
        "E. Symetryczne zwężenie źrenic w ciemności z zachowaną reakcją na zbieżność i akomodację."
      ]
    },
    {
      qIdx: 10, // Q11
      newOpts: [
        "A. Tylko cechy: 1 oraz 3 (poprzeczny poziom czucia i zwieracze).",
        "B. Tylko cechy: 1, 2 oraz 4 (poziom czucia, asymetria, pleocytoza).",
        "C. Tylko cechy: 2, 3 oraz 5 (asymetria, zwieracze, objaw Babińskiego).",
        "D. Tylko cechy: 1, 3, 4 oraz 5 (z pominięciem asymetrii niedowładu).",
        "E. Wszystkie wymienione cechy kliniczne (1, 2, 3, 4, 5)."
      ]
    }
  ],
  15: [
    {
      qIdx: 4, // Q5
      newOpts: [
        "A. Gwałtowny spadek retikulocytów do zera w 1. dobie po podaniu pierwszej dawki preparatu żelaza.",
        "B. Szczyt liczby retikulocytów występujący między 7. a 10. dniem skutecznej suplementacji żelazem.",
        "C. Ostra reakcja anafilaktyczna z dusznością występująca w trakcie dożylnego przetaczania krwi.",
        "D. Samoistne pęknięcie torebki śledziony w mechanizmie ostrej hemolizy wewnątrznaczyniowej.",
        "E. Nagły odczynowy wzrost leukocytozy powyżej 50 000/µl z obecnością komórek blastycznych."
      ]
    },
    {
      qIdx: 5, // Q6
      newOpts: [
        "A. Łagodna niedokrwistość mikrocytarna (Hb 11.5 g/dl) u pacjenta bez żadnych chorób towarzyszących.",
        "B. Ciężka anemia (Hb <7-8 g/dl), pilna operacja onkologiczna, choroba Crohna lub brak tolerancji PO.",
        "C. Wyłącznie u chorych z potwierdzoną genetycznie hemochromatozą w celu saturacji transferyny.",
        "D. U każdego pacjenta ambulatoryjnego odmawiającego pobierania próbek krwi do rutynowych badań.",
        "E. W przebiegu ostrych powikłanych zakażeń wirusem grypy i syncytialnym wirusem oddechowym RSV."
      ]
    },
    {
      qIdx: 6, // Q7
      newOpts: [
        "A. Stężenie rozpuszczalnego receptora transferyny (sTfR) lub wskaźnik sTfR/log ferrytyny.",
        "B. Całkowita liczba płytek krwi oraz objętość płytkowa MPV oznaczane w cytometrii przepływowej.",
        "C. Stężenie kwasu moczowego w dobowej zbiórce moczu w korelacji z klirensem kreatyniny.",
        "D. Średnia masa hemoglobiny w krwince (MCH) w powiązaniu ze wskaźnikiem anizocytozy RDW.",
        "E. Frakcja hematokrytu odwirowanego oceniana metodą mikrometody kapilarnej w wirówce."
      ]
    },
    {
      qIdx: 8, // Q9
      newOpts: [
        "A. Treść w prawej połowie jest płynna, a światło szerokie; guz rośnie egzofitycznie, krwawiąc utajenie.",
        "B. Guzy kątnicy wydzielają swoiste enzymy proteolityczne niszczące erytrocyty w miąższu śledziony.",
        "C. Błona śluzowa prawej połowy okrężnicy jest całkowicie pozbawiona naczyń krwionośnych i chłonnych.",
        "D. Komórki raka wstępnicy wykazują zdolność do aktywnego fagocytowania żelaza z treści pokarmowej.",
        "E. Rak prawej połowy okrężnicy rośnie wyłącznie endofitycznie i nigdy nie manifestuje się krwawieniem."
      ]
    },
    {
      qIdx: 9, // Q10
      newOpts: [
        "A. Zespół Mallory'ego-Weissa (podłużne pęknięcie błony śluzowej wpustu po intensywnych wymiotach).",
        "B. Zespół Boerhaavego (pełnościenne pęknięcie dolnego odcinka przełyku w trakcie gwałtownych nudności).",
        "C. Zespół Plummera-Vinsona (dysfagia, niedokrwistość z niedoboru żelaza, fałdy błony śluzowej przełyku).",
        "D. Achalazja przełyku (brak perystaltyki trzonu przełyku oraz upośledzony rozkurcz dolnego zwieracza LES).",
        "E. Zespół Zollingera-Ellisona (nowotwór neuroendokrynny gastrinoma z hipersekrecją kwasu solnego)."
      ]
    },
    {
      qIdx: 10, // Q11
      newOpts: [
        "A. Wykonanie pełnej kolonoskopii oraz gastroskopii w celu wykluczenia krwawienia z przewodu pokarmowego.",
        "B. Rutynowa empiryczna suplementacja żelaza bez konieczności wykonywania jakichkolwiek badań endoskopowych.",
        "C. Wykonanie scyntygrafii kośćca i tomografii komputerowej klatki piersiowej z dożylnym kontrastem.",
        "D. Oznaczenie miana przeciwciał przeciwjądrowych ANA oraz przeciwciał przeciw cytoplazmie neutrofilów ANCA.",
        "E. Zlecenie diety bogatożelazowej ze szpinakiem i czerwonym mięsem z kontrolą morfologii za 12 miesięcy."
      ]
    }
  ],
  16: [
    {
      qIdx: 3, // Q4
      newOpts: [
        "A. Adrenalina dożylnie w szybkim bolusie: 1.0 mg (1 ml roztworu 1:1000 bez wcześniejszego rozcieńczenia).",
        "B. Adrenalina i.m. w przednio-boczną powierzchnię uda: 0.5 mg (0.5 ml roztworu 1:1000 czyli 1 mg/ml).",
        "C. Adrenalina podskórnie w ramię: 0.1 mg (0.1 ml roztworu 1:10 000 po uprzednim rozcieńczeniu solą fizjologiczną).",
        "D. Adrenalina w inhalacji przez nebulizator: 5 mg w 5 ml 0.9% NaCl podawana z tlenem o przepływie 8 l/min.",
        "E. Adrenalina we wlewie doodbytniczym: 2 mg w 100 ml glukozy podawana przez zgłębnik Nelatona do bańki odbytnicy."
      ]
    },
    {
      qIdx: 4, // Q5
      newOpts: [
        "A. Pozycja stojąca z forsownym marszem w celu pobudzenia powrotu żylnego przez pompę mięśniową podudzi.",
        "B. Pozycja leżąca na wznak z uniesionymi kończynami dolnymi (chyba że dominuje duszność lub wymioty).",
        "C. Pozycja Trendelenburga z głową opuszczoną pod kątem 45 stopni przez minimum 60 minut bez zmiany pozycji.",
        "D. Pozycja siedząca z głową umieszczoną między kolanami i uciskiem na tętnice szyjne przez ratownika.",
        "E. Pozycja na brzuchu z uciskiem osiowym na klatkę piersiową celem ułatwienia odkrztuszania wydzieliny."
      ]
    },
    {
      qIdx: 5, // Q6
      newOpts: [
        "A. Oznaczenie stężenia tryptazy w surowicy krwi pobranej w ciągu 1–2 godzin od początku objawów.",
        "B. Pomiar stężenia całkowitej immunoglobuliny IgE w surowicy w pierwszych 15 minutach wstrząsu.",
        "C. Oznaczenie aktywności aminotransferazy asparaginianowej AST oraz dehydrogenazy mleczanowej LDH.",
        "D. Natychmiastowe wykonanie skórnych testów punktowych Prick-test na izbie przyjęć szpitala.",
        "E. Oznaczenie poziomu przeciwciał przeciwjądrowych ANA w klasie IgG metodą immunofluorescencji."
      ]
    },
    {
      qIdx: 6, // Q7
      newOpts: [
        "A. Leki beta-adrenolityczne hamują działanie adrenaliny; lekiem z wyboru jest glukagon 1–5 mg i.v.",
        "B. Beta-blokery potęgują działanie adrenaliny, wywołując przełom nadciśnieniowy; lekiem z wyboru jest urapidil.",
        "C. U chorych przyjmujących beta-blokery anafilaksja nie występuje; objawy wynikają z zatrucia lekiem nasercowym.",
        "D. Należy natychmiast podać dożylnie 100 mg propranololu w celu wysycenia zablokowanych receptorów w sercu.",
        "E. Jedynym skutecznym postępowaniem jest natychmiastowe wdrożenie pozaustrojowej oksygenacji ECMO na SOR."
      ]
    },
    {
      qIdx: 10, // Q11
      newOpts: [
        "A. Co najmniej 6–8 godzin (a przy ciężkim przebiegu lub czynnikach ryzyka nawet 12–24 godziny).",
        "B. Maksymalnie 30 minut od ustąpienia świądu skóry i wyblaknięcia bąbli pokrzywkowych.",
        "C. Pacjent może zostać wypisany do domu natychmiast po podaniu domięśniowym adrenaliny.",
        "D. Obowiązkowa hospitalizacja na oddziale intensywnej terapii przez minimum 14 pełnych dób.",
        "E. Czas obserwacji zależy wyłącznie od wyniku badania ogólnego moczu i wynosi 48 godzin."
      ]
    }
  ],
  17: [
    {
      qIdx: 4, // Q5
      newOpts: [
        "A) Wywołują natychmiastowe, nieodwracalne pęknięcie mięśnia macicy w mechanizmie toksycznym.",
        "B) Hamują syntezę prostaglandyn, grożąc przedwczesnym zamknięciem przewodu Botalla i małowodziem.",
        "C) Powodują zrośnięcie zastawek serca u matki i ostrą niedomykalność zastawki aortalnej.",
        "D) Prowadzą do zarośnięcia przewodu pokarmowego u ciężarnej na drodze skurczu mięśniówki.",
        "E) Blokują działanie heparyn drobnocząsteczkowych na poziomie receptorów płytkowych GP IIb/IIIa."
      ]
    },
    {
      qIdx: 7, // Q8
      newOpts: [
        "A) Ułożenie w pozycji Trendelenburga, ciśnienie odmy 20 mmHg oraz ślepe wkłucie igłą Veressa w dno macicy.",
        "B) Ułożenie na lewym boku, ciśnienie odmy 10–12 mmHg oraz otwarta technika Hassa wprowadzenia trokara.",
        "C) Ułożenie na prawym boku z uciskiem aorty brzusznej oraz insuflacja jamy brzusznej czystym tlenem 100%.",
        "D) Wykonywanie zabiegu wyłącznie w znieczuleniu miejscowym nasiękowym powłok brzusznych bez intubacji.",
        "E) Całkowite odstąpienie od odmy otrzewnowej i stosowanie wyłącznie retraktorów mechanicznych powłok."
      ]
    },
    {
      qIdx: 8, // Q9
      newOpts: [
        "A) Antagonista witaminy K (np. warfaryna doustnie w dawce 5 mg).",
        "B) Bezpośredni inhibitor czynnika Xa (np. rywaroksaban doustnie).",
        "C) Heparyna drobnocząsteczkowa (LMWH, np. enoksaparyna) podskórnie.",
        "D) Bezpośredni inhibitor trombiny (np. dabigatran doustnie).",
        "E) Kwas acetylosalicylowy (ASA) w wysokiej dawce 1000 mg dożylnie."
      ]
    },
    {
      qIdx: 10, // Q11
      newOpts: [
        "A) Jest bezwzględnie wskazany u każdej ciężarnej w celu precyzyjnego uwidocznienia unaczynienia narządów.",
        "B) Jest przeciwwskazany; przenika przez łożysko, grożąc poronieniem, zgonem płodu i powikłaniami u dziecka.",
        "C) Jest całkowicie obojętny dla płodu i zalecany w standardowych dawkach we wszystkich trzech trymestrach.",
        "D) Wymaga uprzedniego podania witaminy K dożylnie oraz leków przeciwhistaminowych w celu ochrony płodu.",
        "E) Jest dozwolony wyłącznie w połączeniu ze znieczuleniem ogólnym płodu podawanym drogą kordocentezy."
      ]
    }
  ],
  18: [
    {
      qIdx: 1, // Q2
      newOpts: [
        "A) Pod dolnym brzegiem żebra biegnie pęczek naczyniowo-nerwowy (żyła, tętnica, nerw międzyżebrowy).",
        "B) Nad górnym brzegiem żebra opłucna ścienna jest całkowicie pozbawiona receptorów czuciowych i bólowych.",
        "C) Pod dolnym brzegiem każdego żebra przebiega przewód piersiowy z chłonką i splot autonomiczny sercowy.",
        "D) Wkłucie nad górnym brzegiem żebra zapobiega bezpośredniej perforacji aorty piersiowej i przełyku.",
        "E) W tym anatomicznym punkcie ciśnienie w jamie opłucnej pozostaje zawsze fizjologicznie ujemne."
      ]
    },
    {
      qIdx: 3, // Q4
      newOpts: [
        "A) Wypłukuje azot z krwi, obniżając jego prężność w kapilarach i tworząc gradient dyfuzji z opłucnej do krwi.",
        "B) Bezpośrednio utlenia wolny azot do dwutlenku azotu w płynie opłucnowym, przyspieszając resorpcję gazu.",
        "C) Wywołuje silny odruchowy skurcz mięśniówki gładkiej pęcherzyków płucnych i uszczelnienie miąższu płuca.",
        "D) Stymuluje receptory współczulne w oskrzelach do masywnej miejscowej produkcji surfaktantu białkowego.",
        "E) Aktywuje pompę protonową w komórkach międzybłonka opłucnej ściennej i zwiększa wchłanianie wolnego gazu."
      ]
    },
    {
      qIdx: 5, // Q6
      newOpts: [
        "A) Przedni brzeg m. najszerszego grzbietu, boczny brzeg m. piersiowego większego, V m-żebrowa i dno pachy.",
        "B) Druga przestrzeń międzyżebrowa w linii przymostkowej prawej tuż poniżej dolnego brzegu prawego obojczyka.",
        "C) Dołek nadobojczykowy pomiędzy obojczykiem, mięśniem czworobocznym a mięśniem mostkowo-obojczykowym.",
        "D. Ósma przestrzeń międzyżebrowa w linii łopatkowej lewej tuż poniżej dolnego kąta lewej łopatki pacjenta.",
        "E) Linia pośrodkowa przednia tuż poniżej wcięcia szyjnego rękojeści mostka w rzucie tchawicy szyjnej."
      ]
    },
    {
      qIdx: 8, // Q9
      newOpts: [
        "A) Wysokie ciśnienie śródopłucnowe uciska żyłę główną górną i prawe serce, blokując napływ krwi żylnej.",
        "B) Wskutek odruchowego skurczu tętnic szyjnych wewnętrznych wywołanego podrażnieniem nerwu błędnego.",
        "C) W wyniku gwałtownego rozszerzenia naczyń żylnych mózgowia pod wpływem ostrej hipoksemii tętniczej.",
        "D) Wskutek wrodzonej niedomykalności zastawki trójdzielnej serca zaostrzonej przez uraz mechaniczny.",
        "E) Z powodu zatoru powietrznego pnia żyły wrotnej wywołanego przedostaniem się gazu do naczyń trzewnych."
      ]
    },
    {
      qIdx: 10, // Q11
      newOpts: [
        "A) Intubacja dotchawicza i wentylacja dodatnim ciśnieniem (PEEP 10 cmH2O) PRZED dekompresją opłucnej.",
        "B) Nakłucie igłą 14G w V przestrzeni międzyżebrowej w linii pachowej przedniej lub pachowej środkowej.",
        "C) Podanie 100% tlenu przez szczelną maskę z rezerwuarem o przepływie tlenu wynoszącym 15 litrów na minutę.",
        "D) Wykonanie szybkiego protokołu eFAST przyłóżkową głowicą celem wykluczenia tamponady osierdzia.",
        "E) Ciągłe monitorowanie nieinwazyjnego ciśnienia tętniczego krwi, zapisu EKG oraz pulsoksymetrii."
      ]
    }
  ]
};

async function run() {
  const files = fs.readdirSync('cases').filter(f => /^\d+_.*\.json$/.test(f));
  for (const f of files) {
    const m = f.match(/^(\d+)_/);
    if (!m) continue;
    const cid = parseInt(m[1], 10);
    if (!remainingUpdates[cid]) continue;

    console.log(`Applying remaining updates to Case #${cid} (${f})...`);
    const raw = JSON.parse(fs.readFileSync(path.join('cases', f), 'utf8'));
    const c = await decryptObjectAes(raw, MASTER_KEY);

    remainingUpdates[cid].forEach(up => {
      const qObj = c.lekQuestions[up.qIdx];
      if (!qObj) return;

      if (up.newOpts) {
        qObj.opts = up.newOpts;
        qObj.options = up.newOpts;
      }
      if (up.newExp) {
        qObj.exp = up.newExp;
        qObj.expl = up.newExp;
        qObj.explanation = up.newExp;
      }
      if (up.correctIdx !== undefined) {
        qObj.correct = up.correctIdx;
        qObj.correctIdx = up.correctIdx;
      }
    });

    const encrypted = await encryptStringAes(JSON.stringify(c, null, 2), MASTER_KEY);
    fs.writeFileSync(path.join('cases', f), JSON.stringify(encrypted, null, 2), 'utf8');
    console.log(`✓ Case #${cid} successfully updated and re-encrypted.`);
  }
}

run();
